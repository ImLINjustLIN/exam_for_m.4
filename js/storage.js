/* ============================================================
   storage.js — ระบบบันทึกข้อมูล
   - ถ้าตั้งค่า Supabase ไว้แล้ว  -> บันทึกขึ้นฐานข้อมูล (ตามผู้ใช้ที่ล็อกอิน)
   - ถ้ายังไม่ได้ตั้งค่า / ยังไม่ล็อกอิน -> บันทึกในเบราว์เซอร์เครื่องนั้น
   ข้อมูลของผู้ใช้แต่ละคนแยกขาดจากกันเสมอ
   ============================================================ */

const Store = (() => {
  const LOCAL_PREFIX = "hr:v1:";
  let sb = null;               // supabase client
  let user = null;             // ผู้ใช้ที่ล็อกอินอยู่
  let listeners = [];
  const cloudConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

  const scope = () => (user ? "u_" + user.id : "guest");
  const localKey = (topicId, who) =>
    LOCAL_PREFIX + (who || scope()) + ":" + topicId;

  /* รหัสเอกสารทั้งหมดที่เว็บนี้เก็บ:
     "<topicId>"          = โน้ตปกติ
     "<topicId>::canvas"  = โน้ตไดอะแกรม
     แยกกันคนละเอกสาร เพื่อให้การเพิ่มของใหม่ไม่มีทางทับของเดิม */
  const CANVAS_SUFFIX = "::canvas";
  function allDocIds() {
    const out = [];
    for (const s of SUBJECTS) for (const t of s.topics) {
      out.push(t.id, t.id + CANVAS_SUFFIX);
    }
    return out;
  }

  function emit() { listeners.forEach(fn => fn(user)); }

  /* ---------- เริ่มระบบ ---------- */
  async function init() {
    if (!cloudConfigured) return { cloud: false, user: null };
    try {
      const mod = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm");
      sb = mod.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data } = await sb.auth.getSession();
      user = data?.session?.user || null;
      sb.auth.onAuthStateChange((_e, session) => {
        user = session?.user || null;
        emit();
      });
      return { cloud: true, user };
    } catch (err) {
      console.warn("เชื่อมต่อฐานข้อมูลไม่สำเร็จ ใช้โหมดบันทึกในเครื่องแทน:", err);
      sb = null;
      return { cloud: false, user: null };
    }
  }

  /* ---------- บัญชีผู้ใช้ ---------- */
  async function signUp(email, password) {
    if (!sb) throw new Error("ยังไม่ได้เชื่อมต่อฐานข้อมูล");
    const { data, error } = await sb.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }
  async function signIn(email, password) {
    if (!sb) throw new Error("ยังไม่ได้เชื่อมต่อฐานข้อมูล");
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    user = data.user;
    try { await migrateGuestWork(); } catch (e) { console.warn(e); }
    emit();
    return data;
  }
  async function signOut() {
    if (sb) await sb.auth.signOut();
    user = null; emit();
  }

  /* ---------- ย้ายงานที่เขียนไว้ตอนยังไม่ล็อกอิน ขึ้นบัญชี ----------
     เรียกอัตโนมัติทุกครั้งที่ล็อกอิน ปลอดภัยแม้เรียกซ้ำ:
     จะไม่เขียนทับของที่มีอยู่ในบัญชีแล้วเด็ดขาด                        */
  async function migrateGuestWork() {
    if (!user) return 0;
    let moved = 0;
    for (const id of allDocIds()) {
      let guestDoc = null;
      try {
        const raw = localStorage.getItem(localKey(id, "guest"));
        if (raw) guestDoc = JSON.parse(raw);
      } catch (e) { continue; }
      if (!guestDoc || isEmptyDoc(guestDoc)) continue;

      // ถ้าบัญชีนี้มีของอยู่แล้ว (ในเครื่องหรือบนคลาวด์) ไม่แตะต้อง
      if (localStorage.getItem(localKey(id))) continue;
      let cloudDoc = null;
      if (sb) {
        try {
          const { data } = await sb.from("notes").select("doc")
            .eq("user_id", user.id).eq("topic_id", id).maybeSingle();
          cloudDoc = data && data.doc;
        } catch (e) { /* ต่อไม่ติดก็ข้ามไปก่อน ไม่ลบอะไรทั้งนั้น */ }
      }
      if (cloudDoc && !isEmptyDoc(cloudDoc)) continue;

      try { await save(id, guestDoc); moved++; } catch (e) { console.warn(e); }
    }
    return moved;
  }

  function isEmptyDoc(d) {
    if (!d) return true;
    if (Array.isArray(d.blocks)) return d.blocks.length === 0;
    if (Array.isArray(d.items))  return d.items.length === 0;
    return false;
  }

  /* ---------- อ่าน / เขียน สมุดจด ---------- */
  async function load(topicId) {
    // อ่านจากเครื่องก่อนเพื่อให้ขึ้นทันที
    let localDoc = null;
    try {
      const raw = localStorage.getItem(localKey(topicId));
      if (raw) localDoc = JSON.parse(raw);
    } catch (e) { /* ไม่มีก็ไม่เป็นไร */ }

    if (sb && user) {
      try {
        const { data, error } = await sb
          .from("notes")
          .select("doc, updated_at")
          .eq("user_id", user.id)
          .eq("topic_id", topicId)
          .maybeSingle();
        if (error) throw error;
        if (data && data.doc) {
          try { localStorage.setItem(localKey(topicId), JSON.stringify(data.doc)); } catch (e) {}
          return data.doc;
        }
        // บนคลาวด์ยังว่าง แต่เครื่องนี้มีอยู่ -> ยกขึ้นคลาวด์ให้
        if (localDoc && localDoc.blocks && localDoc.blocks.length) {
          await save(topicId, localDoc);
          return localDoc;
        }
        return null;
      } catch (err) {
        console.warn("โหลดจากฐานข้อมูลไม่สำเร็จ ใช้ข้อมูลในเครื่องแทน:", err);
        return localDoc;
      }
    }
    return localDoc;
  }

  async function save(topicId, doc) {
    doc = Object.assign({}, doc, { updatedAt: new Date().toISOString() });
    try { localStorage.setItem(localKey(topicId), JSON.stringify(doc)); }
    catch (e) {
      console.warn("บันทึกลงเบราว์เซอร์ไม่สำเร็จ:", e);
      /* พื้นที่เต็ม (มักเกิดจากแนบรูปเยอะ) — ถ้าไม่มีคลาวด์รองรับ ต้องบอกผู้ใช้ตรง ๆ */
      if (!sb || !user) throw new Error("พื้นที่เก็บข้อมูลในเบราว์เซอร์เต็ม ลองลบรูปบางรูปออก แล้วกดสำรองข้อมูลไว้");
    }

    if (sb && user) {
      const { error } = await sb.from("notes").upsert({
        user_id: user.id,
        topic_id: topicId,
        doc,
        updated_at: doc.updatedAt
      }, { onConflict: "user_id,topic_id" });
      if (error) throw error;
      return "cloud";
    }
    return "local";
  }

  /* ---------- สำรอง / กู้คืน ---------- */
  function exportAll() {
    const out = { app: "สรุปปลายภาคโหดๆ", version: 2,
                  exportedAt: new Date().toISOString(), notes: {} };
    for (const id of allDocIds()) {
      try {
        const raw = localStorage.getItem(localKey(id));
        if (raw) out.notes[id] = JSON.parse(raw);
      } catch (e) {}
    }
    return out;
  }

  async function importAll(payload) {
    if (!payload || !payload.notes) throw new Error("ไฟล์ไม่ถูกต้อง");
    let n = 0;
    for (const [topicId, doc] of Object.entries(payload.notes)) {
      await save(topicId, doc); n++;
    }
    return n;
  }

  return {
    init, signUp, signIn, signOut, load, save, exportAll, importAll,
    migrateGuestWork, allDocIds, CANVAS_SUFFIX,
    onAuthChange: (fn) => listeners.push(fn),
    get user() { return user; },
    get scope() { return scope(); },
    get cloudConfigured() { return cloudConfigured; },
    get cloudReady() { return !!sb; }
  };
})();
