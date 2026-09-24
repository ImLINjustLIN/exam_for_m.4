/* ============================================================
   quiz.js — เครื่องทำข้อสอบ (mock test)
   ------------------------------------------------------------
   กติกา
   • ให้เลือกหัวข้อที่จะสอบก่อน (เลือกกี่หัวข้อก็ได้ ค่าเริ่มต้นคือทุกหัวข้อ)
     จำนวนข้อที่ทำได้สูงสุดจะเท่ากับจำนวนข้อในหัวข้อที่เลือก แต่ไม่เกิน 50
   • ถามว่าจะทำกี่ข้อ และเลือกโหมดอธิบายคำตอบ
   • สุ่มข้อจากหัวข้อที่เลือก ไม่ซ้ำกับครั้งก่อน ๆ จนกว่าข้อในหัวข้อนั้นจะหมด
   • ถ่วงระดับความยาก ง่าย : กลาง : ยาก ให้ใกล้เคียงกัน
     และใส่ข้อโอลิมปิกไม่เกิน 2 ข้อต่อชุด (ข้ามได้)
   • ไม่บอกนักเรียนว่าคลังมีทั้งหมดกี่ข้อ
   ============================================================ */
const Quiz = (() => {
  const PREFIX = "hr:v1:";
  const MAXQ = 50;
  const DIFF_LABEL = { easy: "ง่าย", medium: "ปานกลาง", hard: "ยาก", olympiad: "โอลิมปิก" };
  const DIFF_CLASS  = { easy: "d-e", medium: "d-m", hard: "d-h", olympiad: "d-o" };
  const LETTER = ["ก", "ข", "ค", "ง"];

  let host = null;
  let S = null;          // สถานะข้อสอบชุดปัจจุบัน
  let pad = null;        // กล่องกระดานทดเลข
  let padOn = false;     // กำลังเปิดอยู่ไหม
  let padDoc = { items: [] };   // สิ่งที่เขียนไว้ในกระดานทดของชุดนี้

  /* ---------------- คลังข้อสอบ + ประวัติข้อที่เคยเจอ ---------------- */
  function bank(topicId) {
    const b = (typeof QUIZ_BANKS !== "undefined" && QUIZ_BANKS[topicId]) || [];
    return b.filter(q => q && Array.isArray(q.c) && q.c.length === 4);
  }
  function seenKey(topicId) {
    const sc = (typeof Store !== "undefined" && Store.scope) ? Store.scope : "guest";
    return PREFIX + sc + ":seen:" + topicId;
  }
  function getSeen(topicId) {
    try { const v = JSON.parse(localStorage.getItem(seenKey(topicId)) || "[]");
          return new Set(Array.isArray(v) ? v : []); } catch (e) { return new Set(); }
  }
  function addSeen(topicId, ids) {
    try {
      const s = getSeen(topicId); ids.forEach(i => s.add(i));
      localStorage.setItem(seenKey(topicId), JSON.stringify(Array.from(s)));
    } catch (e) {}
  }
  function resetSeen(topicId) {
    try { localStorage.removeItem(seenKey(topicId)); } catch (e) {}
  }

  /* ---------------- สุ่มแบบถ่วงระดับความยาก ---------------- */
  function shuffle(a) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  }

  function pickBalanced(pool, n) {
    // โอลิมปิกก่อน (1–2 ข้อ ถ้าชุดยาวพอ)
    const oly = shuffle(pool.filter(q => q.d === "olympiad"));
    const rest = { easy: [], medium: [], hard: [] };
    pool.forEach(q => { if (q.d !== "olympiad") (rest[q.d] || rest.medium).push(q); });
    Object.keys(rest).forEach(k => rest[k] = shuffle(rest[k]));

    const out = [];
    let olyWant = n >= 25 ? 2 : n >= 8 ? 1 : 0;
    while (olyWant-- > 0 && oly.length && out.length < n) out.push(oly.pop());

    const order = ["easy", "medium", "hard"];
    let guard = 0;
    while (out.length < n && guard++ < n * 12) {
      let moved = false;
      for (const k of order) {
        if (out.length >= n) break;
        if (rest[k].length) { out.push(rest[k].pop()); moved = true; }
      }
      if (!moved) break;
    }
    // ถ้ายังไม่ครบ เติมด้วยโอลิมปิกที่เหลือ
    while (out.length < n && oly.length) out.push(oly.pop());
    return shuffle(out);
  }

  /* ---------------- หัวข้อย่อยในคลัง (จากแท็ก t) ----------------
     เรียงตามลำดับหัวข้อ h2 ในไฟล์เนื้อหา แล้วจัดกลุ่มตามเลขบท
     (แท็ก "2.3 ..." อยู่บทที่ 2) ชื่อบทเอามาจาก h1 ของเนื้อหาถ้าหาได้ */
  function topicsOf(topicId) {
    const tags = [];
    bank(topicId).forEach(q => { const t = q.t || ""; if (!tags.includes(t)) tags.push(t); });

    const blocks = (typeof STARTER_CONTENT !== "undefined" && STARTER_CONTENT[topicId]) || [];
    const order = {}, h1Of = {};
    let h1 = "", k = 0;
    blocks.forEach(b => {
      if (b.type === "h1") h1 = b.text || "";
      else if (b.type === "h2" && b.text && !(b.text in order)) { order[b.text] = k++; h1Of[b.text] = h1; }
    });
    const rank = t => (t in order) ? order[t] : 1e6 + tags.indexOf(t);
    tags.sort((a, b) => rank(a) - rank(b));

    const groups = [];
    tags.forEach(t => {
      const c = chapterOf(t);
      let g = groups.find(x => x.ch === c);
      if (!g) {
        // ใช้ชื่อ h1 เฉพาะที่ขึ้นต้นด้วย "บทที่ N" ของบทนี้จริง ๆ
        // (h1 ตัวแรกของบางวิชาเป็นชื่อวิชาทั้งเรื่อง ไม่ใช่ชื่อบทที่ 1)
        const h = h1Of[t] || "";
        let label = c ? "บทที่ " + c : "รวมบท";
        if (c && new RegExp("^บทที่\\s*" + c + "(?!\\d)").test(h)) label = h;
        g = { ch: c, label, tags: [] };
        groups.push(g);
      }
      g.tags.push(t);
    });
    return { tags, groups };
  }
  function chapterOf(t) { const m = /^(\d+)\./.exec(t || ""); return m ? m[1] : ""; }

  function pool(topicId, sel) {
    return bank(topicId).filter(q => !sel || sel.has(q.t || ""));
  }

  function buildSet(topicId, n, sel) {
    const all = pool(topicId, sel);
    if (!all.length) return null;
    const seen = getSeen(topicId);
    const fresh = all.filter(q => !seen.has(q.id));
    const want = Math.min(n, all.length);

    if (fresh.length >= want) return { qs: pickBalanced(fresh, want), repeats: 0, fresh: want };

    const need = want - fresh.length;
    const old  = all.filter(q => seen.has(q.id));
    const set  = pickBalanced(fresh, fresh.length).concat(pickBalanced(old, need));
    return { qs: shuffle(set), repeats: need, fresh: fresh.length };
  }

  /* ---------------- หน้าตั้งค่าก่อนเริ่ม ---------------- */
  function ensureHost() {
    if (host) return host;
    host = document.createElement("div");
    host.className = "qz-back";
    host.hidden = true;
    document.body.appendChild(host);
    host.addEventListener("click", (e) => {
      const a = e.target.closest("[data-q]"); if (!a) return;
      onAction(a.getAttribute("data-q"), a);
    });
    document.addEventListener("keydown", (e) => {
      if (host.hidden) return;
      if (e.key === "Escape") {
        e.preventDefault();
        if (padOn) { togglePad(false); return; }   // ปิดกระดานทดก่อน ยังไม่ออกจากข้อสอบ
        confirmExit();
      }
    });
    return host;
  }
  function show(html, keepScroll) {
    ensureHost().hidden = false;
    const y = keepScroll ? host.scrollTop : 0;
    host.innerHTML = html;
    document.body.classList.add("qz-open");
    host.scrollTop = y;
    syncPadBtn();
  }
  function close() { togglePad(false); padDoc = { items: [] };
                     if (host) { host.hidden = true; host.innerHTML = ""; }
                     document.body.classList.remove("qz-open"); S = null; }

  /* ============================================================
     กระดานทดเลข — กระดานเปล่าแบบเดียวกับโน้ตไดอะแกรม ไม่มีเนื้อหาอะไรอยู่
     ใช้คำนวณระหว่างทำข้อสอบ ไม่ถูกบันทึกและไม่มีผลต่อคะแนน
     ล้างทุกครั้งที่เริ่มชุดใหม่หรือปิดหน้าข้อสอบ
     ------------------------------------------------------------
     DiagramNote เป็นตัวเดียวทั้งเว็บ ตอนเปิดกระดานทดจึงต้อง
     บันทึกกระดานหลักก่อน แล้วค่อยยืมมาใช้ พอปิดก็คืนให้กระดานหลักเหมือนเดิม
     ============================================================ */
  function padHost() {
    if (pad) return pad;
    pad = document.createElement("div");
    pad.className = "qz-pad";
    pad.hidden = true;
    pad.innerHTML = '<div class="qz-pad-head">' +
      '<span>🧮 กระดานทด — ปากกาพร้อมเขียนแล้ว · กด ✏️ เปลี่ยนสี/ขนาด · 🧽 ลบ · ↖ ย้าย · ไม่มีผลต่อคะแนนและไม่ถูกบันทึก</span>' +
      '<button class="qz-pad-x" type="button">ซ่อนกระดาน ✕</button></div>' +
      '<div class="qz-pad-body"></div>';
    document.body.appendChild(pad);
    pad.querySelector(".qz-pad-x").addEventListener("click", () => togglePad(false));
    return pad;
  }

  function togglePad(on) {
    if (!pad && on === false) return;           // ยังไม่เคยเปิด ไม่ต้องทำอะไร
    const p = padHost();
    const want = (on === undefined) ? !padOn : !!on;
    if (want === padOn) { syncPadBtn(); return; }

    if (want) {
      if (typeof DiagramNote === "undefined") return;
      try { if (typeof saveCanvasNow === "function") saveCanvasNow(); } catch (e) {}
      p.hidden = false;
      document.body.classList.add("qz-pad-open");
      DiagramNote.mount(p.querySelector(".qz-pad-body"), {
        pad: true,
        onChange: () => {},
        onMockTest: () => {},
        onFind: () => {},
        onExit: () => togglePad(false)
      });
      DiagramNote.setDoc(padDoc);
      padOn = true;
    } else {
      try {
        if (typeof DiagramNote !== "undefined") {
          if (DiagramNote.getDoc) { const d = DiagramNote.getDoc(); if (d) padDoc = d; }
          DiagramNote.destroy();
        }
      } catch (e) {}
      p.hidden = true;
      document.body.classList.remove("qz-pad-open");
      padOn = false;
      remountBoard();
    }
    syncPadBtn();
  }

  /* คืนกระดานหลักให้หน้าสมุดจดเหมือนเดิม */
  function remountBoard() {
    try {
      if (typeof mountCanvas === "function" && typeof state !== "undefined" &&
          state && state.noteMode === "diagram" && state.topic) mountCanvas();
    } catch (e) {}
  }

  function syncPadBtn() {
    if (!host) return;
    const b = host.querySelector('[data-q="pad"]');
    if (!b) return;
    b.classList.toggle("on", padOn);
    b.textContent = padOn ? "🧮 ซ่อนกระดานทด" : "🧮 กระดานทด";
  }

  function open(topicId, topicName) {
    if (!bank(topicId).length) {
      show(`<div class="qz-win qz-narrow">
        <button class="qz-x" data-q="close">✕</button>
        <h2>ทดลองทำข้อสอบ</h2>
        <p class="qz-sub">${escapeHtml(topicName || "")}</p>
        <p class="qz-none">หัวข้อนี้ยังไม่มีชุดข้อสอบครับ<br>
        เดี๋ยวจะทยอยเพิ่มให้ครบทุกหัวข้อ</p>
        <button class="qz-primary" data-q="close">เข้าใจแล้ว</button>
      </div>`);
      return;
    }
    const tp = topicsOf(topicId);
    S = { topicId, topicName: topicName || "", n: 20, mode: "after",
          topics: tp, sel: new Set(tp.tags) };
    setupScreen();
  }

  /* จำนวนข้อสูงสุดที่เลือกได้ = ข้อในหัวข้อที่เลือก แต่ไม่เกิน MAXQ */
  function maxN() { return Math.min(MAXQ, pool(S.topicId, S.sel).length); }

  function topicPicker() {
    const tp = S.topics, many = tp.tags.length > 1;
    if (!many) return "";
    const all = tp.tags.every(t => S.sel.has(t));
    return `<div class="qz-field">
      <div class="qz-lrow">
        <label class="qz-label">เลือกหัวข้อที่จะสอบ <span class="qz-dim">(เลือกได้หลายหัวข้อ)</span></label>
        <button class="qz-link" data-q="${all ? "tpnone" : "tpall"}">${all ? "ล้างทั้งหมด" : "เลือกทั้งหมด"}</button>
      </div>
      <div class="qz-topics">
        ${tp.groups.map((g, gi) => {
          const on = g.tags.filter(t => S.sel.has(t)).length;
          const showHead = tp.groups.length > 1;
          return `<div class="qz-tgroup">
            ${showHead ? `<button class="qz-tghead${on === g.tags.length ? " on" : on ? " some" : ""}" data-q="tpg:${gi}">
                <span class="qz-tick"></span><span>${escapeHtml(g.label)}</span></button>` : ""}
            <div class="qz-tlist">
              ${g.tags.map(t => {
                const i = tp.tags.indexOf(t);
                return `<button class="qz-topic${S.sel.has(t) ? " on" : ""}" data-q="tp:${i}">
                  <span class="qz-tick"></span><span>${escapeHtml(t || "อื่น ๆ")}</span></button>`;
              }).join("")}
            </div>
          </div>`;
        }).join("")}
      </div>
      <p class="qz-tpnote">${S.sel.size
        ? `เลือกไว้ ${S.sel.size} จาก ${tp.tags.length} หัวข้อ`
        : `<span class="qz-bad">ยังไม่ได้เลือกหัวข้อเลย — เลือกอย่างน้อย 1 หัวข้อ</span>`}</p>
    </div>`;
  }

  function setupScreen(keepScroll) {
    const mx = maxN();
    if (mx) S.n = Math.min(Math.max(1, S.n), mx);
    const quick = [5, 10, 20, 30, 50].filter(v => v < mx);
    if (mx) quick.push(mx);

    show(`<div class="qz-win qz-narrow">
      <button class="qz-x" data-q="close" title="ปิด">✕</button>
      <h2>ทดลองทำข้อสอบ</h2>
      <p class="qz-sub">${escapeHtml(S.topicName)}</p>

      ${topicPicker()}

      <div class="qz-field${mx ? "" : " qz-off"}">
        <label class="qz-label">จะทำกี่ข้อดี? <span class="qz-dim">(1–${mx || 1} ข้อ)</span></label>
        ${mx && mx < MAXQ ? `<p class="qz-cap">หัวข้อที่เลือกไว้มีข้อสอบให้ทำได้สูงสุด ${mx} ข้อ
            อยากทำมากกว่านี้ให้เลือกหัวข้อเพิ่ม</p>` : ""}
        <div class="qz-nrow">
          <input class="qz-num" id="qzN" type="number" min="1" max="${mx || 1}" value="${S.n}" inputmode="numeric"${mx ? "" : " disabled"}>
          <div class="qz-quick">
            ${quick.map(v => `<button class="qz-chip${v === S.n ? " on" : ""}" data-q="n:${v}">${v === mx && mx < MAXQ ? "สูงสุด " + v : v}</button>`).join("")}
          </div>
        </div>
        <input class="qz-range" id="qzR" type="range" min="1" max="${mx || 1}" value="${S.n}"${mx ? "" : " disabled"}>
      </div>

      <div class="qz-field">
        <label class="qz-label">อยากให้เฉลยตอนไหน?</label>
        <button class="qz-mode${S.mode === "after" ? " on" : ""}" data-q="mode:after">
          <b>อธิบายคำตอบหลังสอบ</b>
          <span>ทำให้ครบทุกข้อก่อน ย้อนกลับไปแก้คำตอบได้ พอส่งแล้วค่อยดูคะแนนกับคำอธิบายทีเดียว</span>
        </button>
        <button class="qz-mode${S.mode === "each" ? " on" : ""}" data-q="mode:each">
          <b>อธิบายคำตอบหลังตอบ</b>
          <span>ตอบข้อไหนรู้ผลข้อนั้นทันที พร้อมเหตุผล แล้วค่อยไปข้อถัดไป (ย้อนกลับไม่ได้)</span>
        </button>
      </div>

      <p class="qz-hint">ℹ️ ในชุดอาจมี <b>ข้อระดับโอลิมปิก</b> ปนมาบ้าง ยากกว่าปกติมาก
         ถ้าเจอแล้วไม่ไหว กด "ข้ามข้อนี้" ได้เลย ไม่ต้องเสียเวลา</p>

      <div class="qz-actions">
        <button class="qz-primary" data-q="start"${mx ? "" : " disabled"}>เริ่มทำข้อสอบ</button>
        <button class="qz-ghost" data-q="close">ยังไม่ทำ</button>
      </div>
    </div>`, keepScroll);

    const num = host.querySelector("#qzN"), rng = host.querySelector("#qzR");
    const sync = (v) => {
      S.n = clampN(v); num.value = S.n; rng.value = S.n;
      host.querySelectorAll(".qz-chip").forEach(b =>
        b.classList.toggle("on", b.getAttribute("data-q") === "n:" + S.n));
    };
    num.addEventListener("input", () => { if (num.value !== "") sync(num.value); });
    num.addEventListener("change", () => sync(num.value));
    rng.addEventListener("input", () => sync(rng.value));
  }
  function clampN(v) { v = Math.round(+v || 0); return Math.max(1, Math.min(maxN() || 1, v)); }

  /* เปิด/ปิดหัวข้อ แล้ววาดหน้าตั้งค่าใหม่โดยไม่เลื่อนหน้ากลับขึ้นบนสุด */
  function toggleTopics(tags, on) {
    tags.forEach(t => on ? S.sel.add(t) : S.sel.delete(t));
    setupScreen(true);
  }

  /* ---------------- เริ่มทำ ---------------- */
  function start() {
    if (!maxN()) return;                                   // ยังไม่ได้เลือกหัวข้อ
    S.n = clampN(S.n);
    const built = buildSet(S.topicId, S.n, S.sel);
    if (!built) { close(); return; }
    if (built.repeats > 0) {
      const n = built.repeats, m = built.fresh;
      show(`<div class="qz-win qz-narrow">
        <button class="qz-x" data-q="close">✕</button>
        <h2>เดี๋ยวก่อนนะ</h2>
        <p class="qz-warn">ข้อสอบครั้งนี้จะมีข้อที่ตัวนักเรียนเคยเจอมาแล้วจำนวน ${n} ข้อ
          และคำถามที่ตัวนักเรียนไม่เคยเจอ ${m} ข้อ
          นักเรียนจะยังทำข้อสอบครั้งนี้อยู่ไหม</p>
        <div class="qz-actions">
          <button class="qz-primary" data-q="go">ทำต่อเลย</button>
          <button class="qz-ghost" data-q="setup">กลับไปเลือกใหม่</button>
        </div>
      </div>`);
      S.pending = built;
      return;
    }
    launch(built);
  }

  function launch(built) {
    togglePad(false); padDoc = { items: [] };      // ชุดใหม่ = กระดานทดเปล่าใหม่
    S.qs = built.qs.map(q => ({ ...q, pick: null, skipped: false, revealed: false }));
    S.i = 0; S.done = false; S.started = Date.now();
    addSeen(S.topicId, S.qs.map(q => q.id));
    question();
  }

  /* ---------------- หน้าคำถาม ---------------- */
  function question() {
    const q = S.qs[S.i], total = S.qs.length, no = S.i + 1;
    const isOly = q.d === "olympiad";
    const locked = S.mode === "each" && q.revealed;

    const choices = q.c.map((c, i) => {
      let cls = "qz-choice";
      if (q.pick === i) cls += " picked";
      if (locked) {
        if (i === q.a) cls += " ok";
        else if (q.pick === i) cls += " bad";
        cls += " locked";
      }
      return `<button class="${cls}" data-q="pick:${i}">
                <span class="qz-let">${LETTER[i]}</span>
                <span class="qz-ctext">${escapeHtml(c)}</span>
              </button>`;
    }).join("");

    const feedback = locked ? feedbackHTML(q) : "";

    show(`<div class="qz-win qz-quiz">
      <div class="qz-top">
        <div class="qz-prog"><span style="width:${(no / total) * 100}%"></span></div>
        <div class="qz-topline">
          <span class="qz-no">ข้อ ${no} / ${total}</span>
          <span class="qz-tags">
            <span class="qz-tag">${escapeHtml(q.t || "")}</span>
            <span class="qz-tag ${DIFF_CLASS[q.d] || "d-m"}">${DIFF_LABEL[q.d] || "ปานกลาง"}</span>
          </span>
          <button class="qz-padbtn" data-q="pad" type="button">🧮 กระดานทด</button>
          <button class="qz-x" data-q="exit" title="ออกจากข้อสอบ">✕</button>
        </div>
      </div>

      ${isOly ? `<p class="qz-oly">⭐ ข้อนี้เป็นระดับโอลิมปิก ยากกว่าปกติมาก — ข้ามได้ถ้าไม่ไหว</p>` : ""}

      <div class="qz-q">${escapeHtml(q.q)}</div>
      <div class="qz-choices">${choices}</div>
      ${feedback}

      <div class="qz-nav">
        ${S.mode === "after" && S.i > 0 ? `<button class="qz-ghost" data-q="prev">← ข้อก่อนหน้า</button>` : `<span></span>`}
        <span class="qz-navmid">${S.mode === "after"
            ? `<span class="qz-dim">ตอบแล้ว ${S.qs.filter(x => x.pick !== null).length} / ${total} ข้อ</span>`
            : ""}</span>
        ${navRight(q, locked, no, total)}
      </div>

      ${S.mode === "after" ? `<div class="qz-dots">${S.qs.map((x, i) =>
          `<button class="qz-dot${i === S.i ? " now" : ""}${x.pick !== null ? " has" : ""}${x.skipped ? " skip" : ""}"
                   data-q="go:${i}">${i + 1}</button>`).join("")}</div>` : ""}
    </div>`);
  }

  function navRight(q, locked, no, total) {
    if (S.mode === "each") {
      if (!locked) return `<button class="qz-ghost" data-q="skip">ข้ามข้อนี้ →</button>`;
      return no < total ? `<button class="qz-primary" data-q="next">ข้อถัดไป →</button>`
                        : `<button class="qz-primary" data-q="finish">ดูคะแนน</button>`;
    }
    if (no < total) return `<button class="qz-primary" data-q="next">ข้อถัดไป →</button>`;
    return `<button class="qz-primary" data-q="submit">ส่งคำตอบ</button>`;
  }

  function feedbackHTML(q) {
    const right = q.pick === q.a;
    return `<div class="qz-fb ${q.skipped ? "skip" : right ? "right" : "wrong"}">
      <div class="qz-fb-head">${q.skipped ? "⏭ ข้ามข้อนี้" : right ? "✅ ถูกต้อง" : "❌ ยังไม่ถูก"}
        <span class="qz-fb-ans">คำตอบที่ถูกคือ ข้อ ${LETTER[q.a]}</span></div>
      <div class="qz-fb-why">${escapeHtml(q.w || "")}</div>
      <details class="qz-more">
        <summary>ดูเพิ่มเติม — ทำไมตัวเลือกอื่นถึงผิด</summary>
        <ul class="qz-each">
          ${q.c.map((c, i) => `<li class="${i === q.a ? "ok" : ""}">
            <b>${LETTER[i]}.</b> ${escapeHtml((q.e && q.e[i]) || "")}</li>`).join("")}
        </ul>
      </details>
    </div>`;
  }

  /* ---------------- สรุปคะแนน ---------------- */
  function results() {
    S.done = true;
    const total = S.qs.length;
    const right = S.qs.filter(q => q.pick === q.a).length;
    const pct = Math.round((right / total) * 100);
    const mins = Math.max(1, Math.round((Date.now() - S.started) / 60000));

    const byTopic = {};
    S.qs.forEach(q => {
      const k = q.t || "อื่น ๆ";
      byTopic[k] = byTopic[k] || { n: 0, r: 0 };
      byTopic[k].n++; if (q.pick === q.a) byTopic[k].r++;
    });
    const weak = Object.entries(byTopic).filter(([, v]) => v.r / v.n < 0.6)
                 .sort((a, b) => a[1].r / a[1].n - b[1].r / b[1].n).slice(0, 4);

    const msg = pct >= 80 ? "เก่งมาก แน่นแล้ว 💪"
              : pct >= 60 ? "ใช้ได้เลย เหลืออีกนิดเดียว 🙂"
              : pct >= 40 ? "พอไหว กลับไปอ่านหัวข้อที่พลาดอีกรอบนะ"
              : "ยังไม่เป็นไร ค่อย ๆ ไล่อ่านทีละหัวข้อแล้วลองใหม่";

    show(`<div class="qz-win qz-result">
      <button class="qz-x" data-q="close">✕</button>
      <div class="qz-score">
        <div class="qz-ring" style="--p:${pct}">
          <div class="qz-ring-in"><b>${right}</b><span>/ ${total}</span></div>
        </div>
        <div class="qz-score-txt">
          <h2>${pct}%</h2>
          <p>${escapeHtml(msg)}</p>
          <p class="qz-dim">ใช้เวลาประมาณ ${mins} นาที</p>
        </div>
      </div>

      ${weak.length ? `<div class="qz-weak">
        <b>หัวข้อที่ควรกลับไปอ่านซ้ำ</b>
        <ul>${weak.map(([k, v]) => `<li>${escapeHtml(k)} <span class="qz-dim">(ถูก ${v.r}/${v.n})</span></li>`).join("")}</ul>
      </div>` : `<div class="qz-weak good">ทุกหัวข้อผ่านหมดเลย เยี่ยม!</div>`}

      <h3 class="qz-rev-h">เฉลยรายข้อ</h3>
      <div class="qz-review">
        ${S.qs.map((q, i) => {
          const ok = q.pick === q.a;
          return `<details class="qz-rv ${q.skipped ? "skip" : ok ? "ok" : "bad"}">
            <summary><span class="qz-rv-n">${i + 1}</span>
              <span class="qz-rv-q">${escapeHtml(q.q).slice(0, 110)}</span>
              <span class="qz-rv-m">${q.skipped ? "⏭" : ok ? "✅" : "❌"}</span></summary>
            <div class="qz-rv-body">
              <div class="qz-rv-tags">
                <span class="qz-tag">${escapeHtml(q.t || "")}</span>
                <span class="qz-tag ${DIFF_CLASS[q.d] || "d-m"}">${DIFF_LABEL[q.d] || ""}</span>
              </div>
              <ul class="qz-each">
                ${q.c.map((c, j) => `<li class="${j === q.a ? "ok" : ""}${q.pick === j && j !== q.a ? " you" : ""}">
                  <b>${LETTER[j]}.</b> ${escapeHtml(c)}
                  ${q.pick === j ? `<em class="qz-you">← ที่ตอบไว้</em>` : ""}
                  <div class="qz-ex">${escapeHtml((q.e && q.e[j]) || "")}</div></li>`).join("")}
              </ul>
              <div class="qz-fb-why">${escapeHtml(q.w || "")}</div>
            </div></details>`;
        }).join("")}
      </div>

      <div class="qz-actions">
        <button class="qz-primary" data-q="again">ทำชุดใหม่</button>
        <button class="qz-ghost" data-q="close">ปิด</button>
      </div>
    </div>`);
  }

  /* ---------------- ปุ่มทั้งหมด ---------------- */
  function onAction(act) {
    const [k, v] = act.split(":");
    switch (k) {
      case "close":  close(); break;
      case "exit":   confirmExit(); break;
      case "setup":  setupScreen(); break;
      case "n":      S.n = clampN(v); setupScreen(true); break;
      case "mode":   S.mode = v; setupScreen(true); break;
      case "tp": {
        const t = S.topics.tags[+v];
        if (t !== undefined) toggleTopics([t], !S.sel.has(t));
        break;
      }
      case "tpg": {
        const g = S.topics.groups[+v];
        if (g) toggleTopics(g.tags, !g.tags.every(t => S.sel.has(t)));
        break;
      }
      case "tpall":  toggleTopics(S.topics.tags, true); break;
      case "tpnone": toggleTopics(S.topics.tags, false); break;
      case "start":  start(); break;
      case "pad":    togglePad(); break;
      case "go":
        if (v === undefined) { launch(S.pending); S.pending = null; }
        else { S.i = clampI(+v); question(); }
        break;
      case "pick": {
        const q = S.qs[S.i];
        if (S.mode === "each" && q.revealed) break;
        q.pick = +v; q.skipped = false;
        if (S.mode === "each") q.revealed = true;
        question();
        break;
      }
      case "skip": {
        const q = S.qs[S.i];
        q.skipped = true; q.pick = null; q.revealed = true;
        question(); break;
      }
      case "prev":   S.i = clampI(S.i - 1); question(); break;
      case "next":   S.i = clampI(S.i + 1); question(); break;
      case "submit": confirmSubmit(); break;
      case "finish": results(); break;
      case "force":  results(); break;
      case "again":  setupScreen(); break;
    }
  }
  function clampI(i) { return Math.max(0, Math.min(S.qs.length - 1, i)); }

  function confirmSubmit() {
    const left = S.qs.filter(q => q.pick === null && !q.skipped).length;
    if (!left) { results(); return; }
    show(`<div class="qz-win qz-narrow">
      <button class="qz-x" data-q="back">✕</button>
      <h2>ยังตอบไม่ครบนะ</h2>
      <p class="qz-warn">ยังเหลืออีก ${left} ข้อที่ยังไม่ได้ตอบ ข้อที่ไม่ตอบจะนับว่าผิดนะครับ</p>
      <div class="qz-actions">
        <button class="qz-primary" data-q="force">ส่งเลย</button>
        <button class="qz-ghost" data-q="back">กลับไปทำต่อ</button>
      </div>
    </div>`);
    host.querySelectorAll('[data-q="back"]').forEach(b => b.setAttribute("data-q", "go:" + S.i));
  }

  function confirmExit() {
    if (!S || !S.qs || S.done) { close(); return; }
    show(`<div class="qz-win qz-narrow">
      <h2>ออกจากข้อสอบ?</h2>
      <p class="qz-warn">ถ้าออกตอนนี้ คำตอบที่ทำไว้จะหายไป และข้อในชุดนี้จะนับว่าเคยเจอแล้ว</p>
      <div class="qz-actions">
        <button class="qz-primary" data-q="go:${S.i}">ทำต่อ</button>
        <button class="qz-ghost" data-q="close">ออกเลย</button>
      </div>
    </div>`);
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
      ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }

  return { open, close, resetSeen, _bank: bank, _buildSet: buildSet, _pickBalanced: pickBalanced,
           _topicsOf: topicsOf };
})();
