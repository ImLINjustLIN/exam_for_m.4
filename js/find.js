/* ============================================================
   find.js — ค้นหาหัวข้อ/คำ ในทั้ง "โน้ตปกติ" และ "โน้ตไดอะแกรม"
   กดผลลัพธ์แล้วกระโดดไปยังตำแหน่งนั้นทันที
   ============================================================ */
const Find = (() => {
  let panel = null, input = null, list = null, countEl = null;
  let rows = [], active = -1;

  const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();
  const low  = (s) => norm(s).toLowerCase();
  const esc2 = (s) => String(s).replace(/[&<>"]/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

  function textOfBlock(b) {
    if (b.type === "img")     return "รูปภาพ";
    if (b.type === "divider") return "";
    if (b.type === "code")    return norm(b.text);
    if (b.type === "table")   return norm((b.rows || []).map(r => r.join(" ")).join(" "));
    const d = document.createElement("div");
    d.innerHTML = b.html || "";
    return norm(d.textContent);
  }

  const LABEL = { h1:"หัวข้อใหญ่", h2:"หัวข้อย่อย", p:"ข้อความ", bullet:"รายการ",
                  todo:"สิ่งที่ต้องทำ", callout:"กล่องเน้น", quote:"คำพูด",
                  code:"สูตร", table:"ตาราง", img:"รูปภาพ", divider:"เส้นคั่น" };

  /* ---------- รวบรวมทุกอย่างที่ค้นได้ ---------- */
  function collect() {
    const out = [];
    // 1) โน้ตปกติ
    (state.doc && state.doc.blocks || []).forEach(b => {
      const t = textOfBlock(b);
      const d = b.detail ? Detail.plain(b.detail) : "";
      if (!t && !d) return;
      out.push({ where: "text", id: b.id, kind: LABEL[b.type] || "ข้อความ",
                 title: t || "(ไม่มีข้อความ)", detail: d, hasDetail: !!b.detail });
    });
    // 2) โน้ตไดอะแกรม — อ่านจากเอกสารโดยตรง จะได้ค้นได้แม้ยังไม่เปิดกระดาน
    const items = (state.canvasDoc && state.canvasDoc.items) || [];
    const KIND = { c:"การ์ด", x:"ข้อความ", r:"กล่อง", e:"วงรี", t3:"สามเหลี่ยม",
                   img:"รูปภาพ", l:"เส้น", n:"เส้นเชื่อม", k:"ลายเส้น" };
    items.forEach(it => {
      const div = document.createElement("div");
      let t = "";
      if (it.t === "c") { div.innerHTML = (it.title || "") + " — " + (it.body || ""); t = norm(div.textContent); }
      else if (it.t === "x") { div.innerHTML = it.html || ""; t = norm(div.textContent); }
      const d = it.detail ? Detail.plain(it.detail) : "";
      if (!t && !d) return;
      out.push({ where: "diagram", id: it.id, kind: KIND[it.t] || "ชิ้นงาน",
                 title: t || "(ไม่มีข้อความ)", detail: d, hasDetail: !!it.detail });
    });
    return out;
  }

  /* ---------- ตัดข้อความรอบ ๆ คำที่เจอ ---------- */
  function snippet(text, q) {
    const t = norm(text), i = low(t).indexOf(q);
    if (i < 0) return esc2(t.slice(0, 90)) + (t.length > 90 ? "…" : "");
    const a = Math.max(0, i - 34), b = Math.min(t.length, i + q.length + 56);
    return (a > 0 ? "…" : "") + esc2(t.slice(a, i)) +
           "<mark>" + esc2(t.slice(i, i + q.length)) + "</mark>" +
           esc2(t.slice(i + q.length, b)) + (b < t.length ? "…" : "");
  }

  function build() {
    if (panel) return;
    panel = document.createElement("div");
    panel.className = "find-panel";
    panel.hidden = true;
    panel.innerHTML = `
      <div class="find-bar">
        <span class="find-ico">🔍</span>
        <input class="find-in" type="search" placeholder="ค้นหาหัวข้อหรือคำ… (ค้นทั้งสองโน้ต)"
               autocomplete="off" spellcheck="false">
        <span class="find-count"></span>
        <button class="find-x" title="ปิด (Esc)">✕</button>
      </div>
      <div class="find-list"></div>
      <div class="find-tip">↑ ↓ เลือก · Enter ไปยังตำแหน่ง · Esc ปิด</div>`;
    document.body.appendChild(panel);
    input   = panel.querySelector(".find-in");
    list    = panel.querySelector(".find-list");
    countEl = panel.querySelector(".find-count");

    panel.querySelector(".find-x").onclick = close;
    input.addEventListener("input", run);
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter")  { e.preventDefault(); if (rows[active]) jump(rows[active]); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
    });
    list.addEventListener("click", (e) => {
      const r = e.target.closest(".find-row"); if (!r) return;
      jump(rows[+r.dataset.i]);
    });
    document.addEventListener("pointerdown", (e) => {
      if (panel.hidden) return;
      if (!panel.contains(e.target) && !e.target.closest("#btnSearch") &&
          !e.target.closest('[data-act="find"]')) close();
    }, true);
  }

  function move(d) {
    if (!rows.length) return;
    active = (active + d + rows.length) % rows.length;
    paintActive();
  }
  function paintActive() {
    Array.from(list.children).forEach((c, i) => c.classList.toggle("on", i === active));
    const el = list.children[active];
    if (el) el.scrollIntoView({ block: "nearest" });
  }

  function run() {
    const q = low(input.value);
    list.innerHTML = ""; rows = []; active = -1;
    if (q.length < 1) { countEl.textContent = ""; list.innerHTML =
      `<div class="find-empty">พิมพ์คำที่ต้องการหา เช่น <b>พันธะไอออนิก</b> หรือ <b>1.2</b></div>`; return; }

    collect().forEach(r => {
      const inMain   = low(r.title).includes(q);
      const inDetail = r.detail && low(r.detail).includes(q);
      if (!inMain && !inDetail) return;
      rows.push({ ...r, hitDetail: !inMain && !!inDetail, q });
    });

    // หัวข้อใหญ่/การ์ด ขึ้นก่อน แล้วเรียงตามตำแหน่งที่เจอคำ
    rows.sort((a, b) => {
      const rank = (x) => (x.kind === "หัวข้อใหญ่" ? 0 : x.kind === "การ์ด" ? 1 :
                           x.kind === "หัวข้อย่อย" ? 2 : 3) + (x.hitDetail ? 4 : 0);
      return rank(a) - rank(b) || low(a.title).indexOf(q) - low(b.title).indexOf(q);
    });

    countEl.textContent = rows.length ? `พบ ${rows.length} จุด` : "ไม่พบ";
    if (!rows.length) {
      list.innerHTML = `<div class="find-empty">ไม่พบคำนี้ในหน้านี้ ลองพิมพ์สั้นลงดูครับ</div>`;
      return;
    }
    list.innerHTML = rows.map((r, i) => `
      <button class="find-row" data-i="${i}">
        <span class="find-tag ${r.where}">${r.where === "text" ? "📝 โน้ตปกติ" : "🧩 ไดอะแกรม"}</span>
        <span class="find-main">
          <span class="find-t">${snippet(r.hitDetail ? r.detail : r.title, r.q)}</span>
          <span class="find-meta">${esc2(r.kind)}${r.hitDetail ? " · อยู่ในข้อมูลแบบละเอียด" : ""}</span>
        </span>
      </button>`).join("");
    active = 0; paintActive();
  }

  /* ---------- กระโดดไปยังตำแหน่ง ---------- */
  function jump(r) {
    if (!r) return;
    close();
    if (r.where === "text") {
      applyNoteMode("text");
      requestAnimationFrame(() => {
        const el = document.querySelector(`#blocks .block[data-id="${r.id}"]`);
        if (el) {
          el.scrollIntoView({ block: "center", behavior: "smooth" });
          el.classList.add("hit-flash");
          setTimeout(() => el.classList.remove("hit-flash"), 1600);
        }
        if (r.hitDetail) setTimeout(() => openBlockDetail(r.id), 260);
      });
    } else {
      applyNoteMode("diagram");
      setTimeout(() => {
        if (typeof DiagramNote === "undefined" || !DiagramNote.focusItem) return;
        DiagramNote.focusItem(r.id);
        if (r.hitDetail) setTimeout(() => DiagramNote.openDetailFor(r.id), 320);
      }, 90);
    }
  }

  function open(preset) {
    build();
    panel.hidden = false;
    input.value = preset || "";
    run();
    setTimeout(() => input.focus(), 20);
  }
  function close() { if (panel) panel.hidden = true; }
  function toggle() { build(); if (panel.hidden) open(); else close(); }

  return { open, close, toggle };
})();
