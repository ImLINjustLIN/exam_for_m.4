/* ============================================================
   app.js — การทำงานทั้งหมดของเว็บ
   ============================================================ */

/* ---------------- ตัวช่วยเล็ก ๆ ---------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const uid = () => "b" + Math.random().toString(36).slice(2, 9);
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* อนุญาตเฉพาะแท็กจัดรูปแบบพื้นฐาน กันโค้ดแปลกปลอม */
function clean(html) {
  const tpl = document.createElement("div");
  tpl.innerHTML = String(html || "");
  const ok = new Set(["B","STRONG","I","EM","U","BR","MARK","SPAN","A","SUB","SUP","FONT"]);
  const STYLE_OK = ["color","background-color","font-size","font-weight","line-height","text-decoration"];
  $$("*", tpl).forEach(el => {
    if (!ok.has(el.tagName)) { el.replaceWith(...el.childNodes); return; }
    Array.from(el.attributes).forEach(a => {
      if (a.name === "style") {                       // เก็บเฉพาะรูปแบบที่ปลอดภัย
        const keepCss = STYLE_OK.map(k => {
          const v = el.style.getPropertyValue(k);
          return v ? `${k}:${v}` : "";
        }).filter(Boolean).join(";");
        if (keepCss) el.setAttribute("style", keepCss); else el.removeAttribute("style");
        return;
      }
      const keep = (el.tagName === "A" && a.name === "href") ||
                   (a.name === "class" && /^(hl)$/.test(a.value));
      if (!keep) el.removeAttribute(a.name);
    });
    if (el.tagName === "A") { el.setAttribute("target","_blank"); el.setAttribute("rel","noopener"); }
  });
  return tpl.innerHTML;
}
const plain = (html) => { const d = document.createElement("div"); d.innerHTML = html || ""; return d.textContent || ""; };

/* ---------------- สถานะ ---------------- */
const state = {
  subject: null,
  topic: null,
  doc: null,          // โน้ตปกติ { blocks: [...] }
  canvasDoc: null,    // โน้ตไดอะแกรม { items: [...] }
  noteMode: "diagram", // "diagram" | "text"  — เข้ามาเจอโน้ตไดอะแกรมก่อน
  dirty: false,
  canvasDirty: false,
  saving: false
};
const MODE_KEY = "hr:notemode";
const CANVAS_SUFFIX = "::canvas";

/* ---------------- หน้าจอ ---------------- */
function show(id) {
  if (id !== "screen-note" && state.noteMode === "diagram") {
    if (state.canvasDirty) saveCanvasNow();
    DiagramNote.destroy();
    document.body.classList.remove("diagram-open");
  }
  $$(".screen").forEach(s => s.hidden = (s.id !== id));
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---------------- หน้าแรก: ปุ่มวิชา ---------------- */
function renderHome() {
  const grid = $("#subjectGrid");
  grid.innerHTML = SUBJECTS.map((s, i) => `
    <button class="subject-card" data-subject="${s.id}" style="--c:${s.color}">
      <span class="subject-no">${i + 1}</span>
      <span class="subject-emoji">${s.emoji}</span>
      <span class="subject-name">${esc(s.name)}</span>
      <span class="subject-meta">${s.topics.length > 1 ? "หลัก / เสริม" : "เนื้อหาหลัก"}</span>
    </button>`).join("");
  grid.onclick = (e) => {
    const btn = e.target.closest("[data-subject]");
    if (btn) go("#/s/" + btn.dataset.subject);
  };
  show("screen-home");
}

/* ---------------- หน้าเลือก หลัก / เสริม ---------------- */
function renderMode(subject) {
  $("#modeTitle").innerHTML = `${subject.emoji} ${esc(subject.name)}`;
  const grid = $("#modeGrid");
  grid.style.setProperty("--c", subject.color);
  grid.innerHTML = subject.topics.map(t => `
    <button class="mode-card ${t.kind}" data-topic="${t.id}" style="--c:${subject.color}">
      <span class="mode-kind">${t.kind === "main" ? "หลัก" : "เสริม (Slot)"}</span>
      <span class="mode-name">${esc(t.name)}</span>
      <span class="mode-note">${esc(t.note || "")}</span>
      <span class="mode-go">เปิดสมุดจด →</span>
    </button>`).join("");
  grid.onclick = (e) => {
    const btn = e.target.closest("[data-topic]");
    if (btn) go("#/s/" + subject.id + "/" + btn.dataset.topic);
  };
  show("screen-mode");
}

/* ---------------- เส้นทาง (URL) ---------------- */
function go(hash) { location.hash = hash; }

function route() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] !== "s" || !parts[1]) { state.topic = null; renderHome(); return; }
  const subject = SUBJECTS.find(s => s.id === parts[1]);
  if (!subject) { go("#/"); return; }

  if (!parts[2]) {
    state.subject = subject;
    if (subject.topics.length === 1) { go("#/s/" + subject.id + "/" + subject.topics[0].id); return; }
    state.topic = null;
    renderMode(subject);
    return;
  }
  const topic = subject.topics.find(t => t.id === parts[2]);
  if (!topic) { go("#/s/" + subject.id); return; }
  state.subject = subject;
  openNote(subject, topic);
}

/* ---------------- สมุดจด ---------------- */
async function openNote(subject, topic) {
  state.topic = topic;
  $("#noteChip").textContent = subject.emoji + " " + subject.name +
      (subject.topics.length > 1 ? (topic.kind === "main" ? " · หลัก" : " · เสริม") : "");
  $("#noteChip").style.setProperty("--c", subject.color);
  $("#noteTitle").textContent = topic.name;
  $("#paper").style.setProperty("--c", subject.color);
  $("#noteBack").textContent = subject.topics.length > 1 ? "← กลับไปเลือกหลัก/เสริม" : "← กลับไปเลือกวิชา";
  $("#noteBack").onclick = () => go(subject.topics.length > 1 ? "#/s/" + subject.id : "#/");
  show("screen-note");

  $("#blocks").innerHTML = `<p class="loading">กำลังโหลด…</p>`;
  let doc = null, cdoc = null;
  try { doc = await Store.load(topic.id); } catch (e) { console.warn(e); }
  try { cdoc = await Store.load(topic.id + CANVAS_SUFFIX); } catch (e) { console.warn(e); }

  const starterText = STARTER_CONTENT[topic.id] || [];
  const starterDiag  = STARTER_DIAGRAM[topic.id] || [];

  if (!doc || !Array.isArray(doc.blocks)) {
    doc = { blocks: deepCopy(starterText).map(normalizeBlock) };
    rememberStarter(topic.id, "text", starterText);
    markSeeded(topic.id, "text");
  } else if (!doc.blocks.length && starterText.length && !wasSeeded(topic.id, "text")) {
    /* เคยเปิดหน้านี้ตอนที่ยังไม่มีเนื้อหา แล้วค้างเป็นหน้าเปล่าไว้ในเครื่อง
       พอเนื้อหามาทีหลังจึงต้องเติมให้ครั้งเดียว (ถ้าผู้ใช้ลบเองทีหลังจะไม่เติมซ้ำ) */
    doc.blocks = deepCopy(starterText).map(normalizeBlock);
    rememberStarter(topic.id, "text", starterText);
    markSeeded(topic.id, "text");
  } else {
    doc.blocks = doc.blocks.map(normalizeBlock);
    if (doc.blocks.length) markSeeded(topic.id, "text");
    /* ผู้ใช้เคยเปิดหัวข้อนี้ไว้แล้ว ถ้ารอบนี้มีเนื้อหาตั้งต้น "เพิ่มใหม่"
       ให้แทรกเฉพาะส่วนที่เขายังไม่เคยได้รับ โดยไม่แตะของที่เขาแก้หรือลบไปแล้ว */
    if (mergeNewStarter(doc.blocks, starterText, topic.id, "text")) {
      try { await Store.save(topic.id, doc); } catch (e) { console.warn(e); }
    }
  }
  state.doc = doc;
  noteUndo = []; noteRedo = []; lastSnap = 0;

  if (cdoc && Array.isArray(cdoc.items)) {
    if (!cdoc.items.length && starterDiag.length && !wasSeeded(topic.id, "diagram")) {
      cdoc.items = deepCopy(starterDiag);
      rememberStarter(topic.id, "diagram", starterDiag);
      markSeeded(topic.id, "diagram");
    } else if (cdoc.items.length) {
      markSeeded(topic.id, "diagram");
      if (mergeNewStarter(cdoc.items, starterDiag, topic.id, "diagram")) {
        try { await Store.save(topic.id + CANVAS_SUFFIX, cdoc); } catch (e) { console.warn(e); }
      }
    }
    state.canvasDoc = cdoc;
  } else {
    state.canvasDoc = { items: deepCopy(starterDiag) };
    rememberStarter(topic.id, "diagram", starterDiag);
    markSeeded(topic.id, "diagram");
  }
  renderBlocks();
  applyNoteMode(state.noteMode, true);
}

/* ---------------- สลับโน้ตปกติ / โน้ตไดอะแกรม ---------------- */
function applyNoteMode(m, force) {
  if (!force && m === state.noteMode) return;
  if (state.noteMode === "diagram" && m !== "diagram") saveCanvasNow();
  state.noteMode = m;
  try { localStorage.setItem(MODE_KEY, m); } catch (e) {}
  $$("#noteSwitch button").forEach(b => b.classList.toggle("on", b.dataset.note === m));
  const diagram = m === "diagram";
  $("#paper").hidden = diagram;
  $("#diagramHost").hidden = !diagram;
  $("#btnPrint").hidden = diagram;
  $("#btnUndo").hidden = diagram;      // กระดานมีปุ่มย้อนกลับของตัวเองอยู่แล้ว
  $("#btnRedo").hidden = diagram;
  $("#btnLayers").hidden = diagram;
  if (diagram) toggleLayerPanel(false);
  Find.close();
  document.body.classList.toggle("diagram-open", diagram);
  if (diagram) mountCanvas(); else DiagramNote.destroy();
}

function mountCanvas() {
  DiagramNote.mount($("#diagramHost"), {
    onChange: queueCanvasSave,
    onMockTest: openMock,
    onFind: () => Find.open(),
    onExit: () => applyNoteMode("text")
  });
  DiagramNote.setDoc(state.canvasDoc);
}

let canvasTimer = null;
function queueCanvasSave() {
  state.canvasDirty = true;
  setSaveState("กำลังวาด…");
  clearTimeout(canvasTimer);
  canvasTimer = setTimeout(saveCanvasNow, 800);
}
async function saveCanvasNow() {
  if (!state.topic) return;
  const d = DiagramNote.getDoc ? DiagramNote.getDoc() : null;
  if (!d) return;
  state.canvasDoc = d;
  setSaveState("กำลังบันทึก…");
  try {
    const where = await Store.save(state.topic.id + CANVAS_SUFFIX, d);
    state.canvasDirty = false;
    setSaveState(where === "cloud" ? "บันทึกแล้ว ☁" : "บันทึกในเครื่องนี้แล้ว ✓");
  } catch (e) { console.warn(e);
    setSaveState(e && e.message ? "✕ " + e.message : "บันทึกไม่สำเร็จ ✕"); }
}

/* ---------------- ทดลองทำข้อสอบ ---------------- */
function openMock() {
  if (!state.topic) return;
  Quiz.open(state.topic.id, state.topic.name);
}

/* จำว่าเคยใส่เนื้อหาตั้งต้นของหัวข้อนี้ให้ผู้ใช้คนนี้ไปแล้วหรือยัง
   ใช้กันกรณีผู้ใช้เปิดหน้าไว้ตอนยังไม่มีเนื้อหา แล้วหน้าเปล่าค้างอยู่ในเครื่อง
   พอเนื้อหามาทีหลังจะได้เติมให้ครั้งเดียว และถ้าผู้ใช้ลบทิ้งเองก็จะไม่เติมกลับ */
function seedKey(topicId, kind) {
  let sc = "guest";
  try { sc = Store.scope || "guest"; } catch (e) {}
  return "hr:v1:" + sc + ":seeded:" + kind + ":" + topicId;
}
function wasSeeded(topicId, kind) {
  try { return localStorage.getItem(seedKey(topicId, kind)) === "1"; } catch (e) { return true; }
}
function markSeeded(topicId, kind) {
  try { localStorage.setItem(seedKey(topicId, kind), "1"); } catch (e) {}
}

/* ===========================================================
   ผสานเนื้อหาตั้งต้นที่ "เพิ่มใหม่" เข้าไปในสมุดที่ผู้ใช้มีอยู่แล้ว
   -----------------------------------------------------------
   ปัญหาเดิม: พอผู้ใช้เคยเปิดหัวข้อหนึ่งแล้ว สมุดจะถูกบันทึกลงเครื่อง
   เนื้อหาตั้งต้นที่เพิ่มทีหลัง (เช่น บทใหม่ รูปใหม่) จะไม่มีวันขึ้นให้เขาเห็นเลย
   วิธีแก้: จำ "ลายนิ้วมือ" ของเนื้อหาตั้งต้นทุกชิ้นที่เคยส่งให้ผู้ใช้คนนี้
   รอบถัดไปจึงแทรกเฉพาะชิ้นที่เขายังไม่เคยได้รับ วางต่อจากชิ้นก่อนหน้าที่ยังอยู่
   ของที่ผู้ใช้แก้เองหรือลบทิ้งไปแล้วจะไม่ถูกแตะและไม่ถูกเติมกลับ
   =========================================================== */
function starterListKey(topicId, kind) {
  let sc = "guest";
  try { sc = Store.scope || "guest"; } catch (e) {}
  return "hr:v1:" + sc + ":starter:" + kind + ":" + topicId;
}
/* ลายนิ้วมือของเนื้อหาตั้งต้นหนึ่งชิ้น
   ไดอะแกรม: ใช้ id ของไอเทมได้เลยเพราะตั้งไว้คงที่ในไฟล์เนื้อหา
   โน้ตปกติ: บล็อกไม่มี id คงที่ จึงใช้ค่าแฮชจากตัวเนื้อหาแทน */
function hash36(src) {
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  for (let i = 0; i < src.length; i++) {
    const c = src.charCodeAt(i);
    h1 = (h1 ^ c) * 16777619 >>> 0;
    h2 = (h2 + c * (i + 7)) >>> 0;
  }
  return h1.toString(36) + h2.toString(36);
}
/* บล็อกอย่างเส้นคั่นไม่มีเนื้อหาให้แยกแยะ ทุกอันจึงแฮชได้ค่าเดียวกันหมด
   ต้องผูกกับบล็อกก่อนหน้าที่มีเนื้อหา ไม่งั้นเส้นคั่นของบทใหม่จะถูกนับว่า "มีอยู่แล้ว" */
function blockHasBody(item) {
  if (!item || item.type === "divider") return false;
  if (item.type === "table") return Array.isArray(item.rows) && item.rows.length > 0;
  if (item.type === "img") return !!item.src;
  return String(item.html || item.text || "").replace(/<[^>]*>/g, "").trim().length > 0;
}
function starterSid(item, kind, ctx) {
  if (kind === "diagram") return "i:" + (item && item.id != null ? item.id : "");
  if (!blockHasBody(item)) return "h:" + hash36(item.type + "|ctx|" + (ctx || ""));
  return "h:" + hash36(JSON.stringify([item.type, item.html, item.text, item.rows, item.src, item.detail]));
}
/* คำนวณลายนิ้วมือทั้งรายการทีเดียว เพื่อให้บล็อกไร้เนื้อหาได้บริบทจากบล็อกก่อนหน้า */
function starterSidList(list, kind) {
  const out = []; let ctx = "";
  for (let i = 0; i < list.length; i++) {
    const sid = starterSid(list[i], kind, ctx);
    out.push(sid);
    if (blockHasBody(list[i]) || kind === "diagram") ctx = sid;
  }
  return out;
}
/* กุญแจแบบหลวม ใช้เฉพาะตอนย้ายระบบครั้งแรก เผื่อผู้ใช้เคยแก้ข้อความไปบ้าง
   จะได้ไม่นับบล็อกเดิมที่ถูกแก้แล้วว่าเป็นของใหม่แล้วแทรกซ้ำ */
function starterLooseKey(item, kind) {
  if (kind === "diagram") return "i:" + (item && item.id != null ? item.id : "");
  if (item.type === "divider") return "";
  const t = String(item.html || item.text || (item.rows && item.rows[0] && item.rows[0].join(" ")) || "")
              .replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 48);
  if (t.length < 8) return "";          // สั้นเกินไป เสี่ยงชนกับบล็อกอื่น ไม่ใช้กุญแจหลวม
  return "l:" + item.type + ":" + t;
}
function readStarterSeen(topicId, kind) {
  try {
    const raw = localStorage.getItem(starterListKey(topicId, kind));
    const arr = raw ? JSON.parse(raw) : null;
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) { return new Set(); }
}
function rememberStarter(topicId, kind, starter) {
  try {
    const ids = starterSidList(starter || [], kind);
    localStorage.setItem(starterListKey(topicId, kind), JSON.stringify(ids));
  } catch (e) {}
}
function mergeNewStarter(list, starter, topicId, kind) {
  if (!Array.isArray(list) || !Array.isArray(starter) || !starter.length) return 0;
  const seen = readStarterSeen(topicId, kind);
  /* ชิ้นที่อยู่ในสมุดของผู้ใช้ตอนนี้ ถือว่าเคยได้รับไปแล้วแน่นอน */
  const present = new Map();
  const listSids = starterSidList(list, kind);
  list.forEach((it, idx) => {
    present.set(listSids[idx], idx);
    seen.add(listSids[idx]);
    const lk = starterLooseKey(it, kind);
    if (lk) seen.add(lk);
  });
  const starterSids = starterSidList(starter, kind);
  let added = 0;
  for (let i = 0; i < starter.length; i++) {
    const sid = starterSids[i];
    const lkey = starterLooseKey(starter[i], kind);
    if (seen.has(sid) || (lkey && seen.has(lkey))) continue;
    /* หาตำแหน่งวาง: ต่อจากชิ้นตั้งต้นก่อนหน้าที่ยังอยู่ในสมุด ถ้าไม่มีให้ต่อท้าย */
    let at = list.length;
    for (let k = i - 1; k >= 0; k--) {
      const pos = present.get(starterSids[k]);
      if (pos != null) { at = pos + 1; break; }
    }
    const copy = deepCopy(starter[i]);
    const item = kind === "text" ? normalizeBlock(copy) : copy;
    list.splice(at, 0, item);
    /* ตำแหน่งที่จำไว้เลื่อนไปหนึ่งช่องทุกครั้งที่แทรก */
    present.forEach((v, k) => { if (v >= at) present.set(k, v + 1); });
    present.set(sid, at);
    seen.add(sid);
    added++;
  }
  rememberStarter(topicId, kind, starter);
  return added;
}

/* คัดลอกเนื้อหาตั้งต้นแบบลึก — กันไม่ให้ผู้ใช้ลาก/แก้/ลบแล้วไปแก้ตัวต้นฉบับ
   ใน STARTER_CONTENT / STARTER_DIAGRAM (ซึ่งใช้ร่วมกันทุกครั้งที่เปิดหัวข้อ) */
function deepCopy(v) {
  try { if (typeof structuredClone === "function") return structuredClone(v); } catch (e) {}
  return JSON.parse(JSON.stringify(v));
}

function normalizeBlock(b) {
  const out = Object.assign({ id: uid(), type: "p" }, b);
  if (out.detail != null) out.detail = String(out.detail);   // คำอธิบายแบบละเอียด (ถ้ามี)
  if (out.type === "img") {
    out.src = String(out.src || "");
    out.w = Math.max(60, +out.w || 420);
    return out;
  }
  if (out.type === "table") {
    if (!Array.isArray(out.rows) || !out.rows.length) out.rows = [["", ""], ["", ""]];
  } else if (out.type === "code") {
    out.text = String(out.text || "");
  } else if (out.type !== "divider") {
    out.html = clean(out.html != null ? out.html : esc(out.text || ""));
    if (out.type === "todo") out.done = !!out.done;
  }
  return out;
}

/* ------- วาดบล็อกทั้งหมด ------- */
function renderBlocks(focusId, atEnd) {
  const wrap = $("#blocks");
  wrap.innerHTML = state.doc.blocks.map(blockHTML).join("");
  $("#emptyHint").hidden = state.doc.blocks.length > 0;
  refreshFreeMenuLabel();
  growPaper();
  updateUndoButtons();
  renderLayers();
  if (focusId) focusBlock(focusId, atEnd);
}

function blockHTML(b) {
  const ctrl = `
    <div class="bctrl">
      <button class="bmenu" title="ตัวเลือกของบล็อกนี้">⋮</button>
      <div class="bpop" hidden>
        <button class="bc" data-act="up">↑ เลื่อนขึ้น</button>
        <button class="bc" data-act="down">↓ เลื่อนลง</button>
        <button class="bc" data-act="dup">⧉ ทำสำเนา</button>
        <button class="bc" data-act="free">✥ แยกออกจากบรรทัด</button>
        <button class="bc" data-act="detail">📖 ข้อมูลแบบละเอียด</button>
        <div class="bc-layer bc-lrow">
          <span class="bc-lrow-t">ชั้น</span>
          <button class="bc-lz" data-act="front" title="ขึ้นบนสุด">⤒</button>
          <button class="bc-lz" data-act="up"    title="ขึ้นหนึ่งชั้น">↑</button>
          <button class="bc-lz" data-act="down"  title="ลงหนึ่งชั้น">↓</button>
          <button class="bc-lz" data-act="back"  title="ลงล่างสุด">⤓</button>
        </div>
        <button class="bc bc-del" data-act="del">🗑 ลบบล็อกนี้</button>
      </div>
    </div>`;
  const freeBits = b.free
    ? `<button class="free-move" title="ลากเพื่อย้าย">✥</button><span class="free-resize"></span>`
    : "";
  let body = "";
  if (b.type === "img") {
    body = `<div class="b-img" style="width:${b.w}px">
        <img src="${b.src}" alt="" draggable="false">
        <span class="img-resize" title="ลากเพื่อปรับขนาด"></span>
      </div>`;
  } else if (b.type === "divider") {
    body = `<hr class="b-divider">`;
  } else if (b.type === "todo") {
    body = `<div class="b-todo">
        <input type="checkbox" class="todo-check" ${b.done ? "checked" : ""}>
        <div class="edit ${b.done ? "done" : ""}" contenteditable="true" data-ph="สิ่งที่ต้องทำ…">${b.html}</div>
      </div>`;
  } else if (b.type === "code") {
    body = `<pre class="b-code"><code class="edit" contenteditable="true" data-ph="พิมพ์สูตรหรือโค้ด…">${esc(b.text)}</code></pre>`;
  } else if (b.type === "table") {
    body = `<div class="b-table-wrap">
      <table class="b-table"><tbody>${
        b.rows.map((r, ri) => `<tr>${r.map((c, ci) =>
          `<${ri === 0 ? "th" : "td"} class="edit" contenteditable="true" data-r="${ri}" data-c="${ci}">${clean(c)}</${ri === 0 ? "th" : "td"}>`
        ).join("")}</tr>`).join("")
      }</tbody></table>
      <div class="table-tools">
        <button class="tt" data-act="addrow">＋ แถว</button>
        <button class="tt" data-act="addcol">＋ คอลัมน์</button>
        <button class="tt" data-act="delrow">− แถว</button>
        <button class="tt" data-act="delcol">− คอลัมน์</button>
      </div></div>`;
  } else {
    const tag = b.type === "h1" ? "h2" : b.type === "h2" ? "h3" : "div";
    const ph = { h1: "หัวข้อใหญ่", h2: "หัวข้อย่อย", p: "พิมพ์อะไรก็ได้ที่นี่…",
                 bullet: "รายการ…", callout: "ข้อสรุปสำคัญ…", quote: "คำพูด / อ้างอิง…" }[b.type] || "…";
    const inner = `<${tag} class="edit" contenteditable="true" data-ph="${ph}">${b.html}</${tag}>`;
    body = b.type === "bullet"  ? `<div class="b-bullet"><span class="dot">•</span>${inner}</div>`
         : b.type === "callout" ? `<div class="b-callout"><span class="ca-ico">💡</span>${inner}</div>`
         : b.type === "quote"   ? `<div class="b-quote">${inner}</div>`
         : `<div class="b-${b.type}">${inner}</div>`;
  }
  const st = b.free
    ? ` style="left:${b.free.x}px;top:${b.free.y}px;width:${b.free.w}px;z-index:${5 + (b.free.z || 0)}"`
    : "";
  const more = b.detail
    ? `<button class="b-detail" type="button">📖 ข้อมูลแบบละเอียด</button>` : "";
  return `<div class="block${b.free ? " free" : ""}" data-id="${b.id}" data-type="${b.type}"${st}>` +
         `${ctrl}${freeBits}${body}${more}</div>`;
}

/* ------- ป๊อปอัป "ข้อมูลแบบละเอียด" ของบล็อกในโน้ตปกติ ------- */
function openBlockDetail(id, startEmpty) {
  const b = getBlock(id); if (!b) return;
  const el = document.querySelector(`.block[data-id="${id}"]`);
  const head = el ? (el.querySelector(".edit") ? el.querySelector(".edit").textContent : "") : "";
  Detail.open({
    title: (head || "ข้อมูลแบบละเอียด").slice(0, 120),
    sub: state.topic ? state.topic.name : "",
    html: b.detail || (startEmpty ? "<p></p>" : ""),
    onSave: (html) => {
      snapNote(true);
      b.detail = html;
      renderBlocks(); queueSave(200);
    }
  });
}

function getBlock(id) { return state.doc.blocks.find(b => b.id === id); }
function idxOf(id)    { return state.doc.blocks.findIndex(b => b.id === id); }

function focusBlock(id, atEnd) {
  const el = document.querySelector(`.block[data-id="${id}"] .edit`);
  if (!el) return;
  el.focus();
  if (atEnd !== false) {
    const r = document.createRange(); r.selectNodeContents(el); r.collapse(false);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  }
  el.scrollIntoView({ block: "nearest" });
}

/* ------- เพิ่ม / ลบ / ย้าย ------- */
function addBlock(type, afterId) {
  snapNote(true);
  const b = normalizeBlock({ type, html: "", text: "" });
  const i = afterId ? idxOf(afterId) + 1 : state.doc.blocks.length;
  state.doc.blocks.splice(i, 0, b);
  renderBlocks(b.id);
  queueSave();
  return b;
}

function removeBlock(id) {
  snapNote(true);
  const i = idxOf(id); if (i < 0) return;
  state.doc.blocks.splice(i, 1);
  const prev = state.doc.blocks[i - 1] || state.doc.blocks[i];
  renderBlocks(prev && prev.id);
  queueSave();
}

/* ------- แยกบล็อกออกจากบรรทัด เพื่อลากย้ายได้อิสระ ------- */
function toggleFree(id) {
  snapNote(true);
  const b = getBlock(id); if (!b) return;
  const el = document.querySelector(`.block[data-id="${id}"]`);
  const paper = $("#paper");
  if (b.free) { delete b.free; }
  else {
    const pr = paper.getBoundingClientRect();
    const br = el ? el.getBoundingClientRect() : { left: pr.left + 40, top: pr.top + 40, width: 320 };
    const zs = state.doc.blocks.filter(x => x.free && typeof x.free.z === "number").map(x => x.free.z);
    b.free = { x: Math.max(8, Math.round(br.left - pr.left)),
               y: Math.max(8, Math.round(br.top - pr.top)),
               w: Math.min(460, Math.max(160, Math.round(br.width || 320))),
               z: zs.length ? Math.max.apply(null, zs) + 1 : 0 };   /* ตัวใหม่อยู่หน้าสุด */
  }
  renderBlocks(); queueSave(200);
}
/* ---- ชั้นของบล็อกอิสระ ---- */
function freeBlocks() {
  const f = state.doc ? state.doc.blocks.filter(x => x.free) : [];
  /* ข้อมูลเก่าที่ยังไม่มีเลขชั้น ให้เลขไล่กันไป จะได้ไม่ซ้ำจนสลับชั้นไม่ได้ */
  let next = f.reduce((m, x) => Math.max(m, typeof x.free.z === "number" ? x.free.z : -1), -1);
  f.forEach(x => { if (typeof x.free.z !== "number") x.free.z = ++next; });
  return f;
}
function renumberLayers(list) {              // เรียงใหม่ให้เป็น 0,1,2,… เสมอ
  list.slice().sort((p, q) => p.free.z - q.free.z).forEach((x, i) => { x.free.z = i; });
}
function setLayer(id, mode) {
  const b = getBlock(id); if (!b || !b.free) return;
  const f = freeBlocks(); if (f.length < 2) return;
  snapNote(true);
  const sorted = f.slice().sort((p, q) => p.free.z - q.free.z);
  const i = sorted.indexOf(b);
  if (mode === "front" || mode === true)      b.free.z = sorted[sorted.length-1].free.z + 1;
  else if (mode === "back" || mode === false) b.free.z = sorted[0].free.z - 1;
  else if (mode === "up"   && i < sorted.length-1) {
    const o = sorted[i+1]; const t = b.free.z; b.free.z = o.free.z; o.free.z = t;
  } else if (mode === "down" && i > 0) {
    const o = sorted[i-1]; const t = b.free.z; b.free.z = o.free.z; o.free.z = t;
  }
  renumberLayers(f);
  renderBlocks(); queueSave(200);
}

/* ---- แผงรายการชั้น (ลากสลับลำดับได้) ---- */
function renderLayers() {
  const panel = $("#layerPanel"); if (!panel || panel.hidden) return;
  const list = $("#lpList");
  const f = freeBlocks().sort((a, b) => b.free.z - a.free.z);   // หน้าสุดอยู่บน
  if (!f.length) {
    list.innerHTML = `<p class="lp-empty">ยังไม่มีบล็อกที่แยกออกจากบรรทัด<br>
      <span class="dim">กดสองครั้งที่บล็อก แล้วเลือก "แยกออกจากบรรทัด"</span></p>`;
    return;
  }
  const ICON = { img:"▣", h1:"H1", h2:"H2", p:"¶", bullet:"•", todo:"☑",
                 callout:"💡", quote:"❝", code:"∑", table:"▦", divider:"—" };
  list.innerHTML = f.map(b => {
    const name = b.type === "img" ? "รูปภาพ"
      : (plain(b.html || "").trim().slice(0, 26) || "(ว่าง)");
    const thumb = b.type === "img" ? `<img class="lp-thumb" src="${b.src}" alt="">` : "";
    return `<div class="lp-row" data-id="${b.id}">
        <span class="lp-grip" title="ลากเพื่อสลับชั้น">⠿</span>
        ${thumb || `<span class="lp-ico">${ICON[b.type] || "¶"}</span>`}
        <span class="lp-name">${esc(name)}</span>
      </div>`;
  }).join("");
}

let lpDrag = null;
document.addEventListener("pointerdown", (e) => {
  const row = e.target.closest("#lpList .lp-row"); if (!row) return;
  e.preventDefault();
  lpDrag = { row, moved: false };
  row.classList.add("dragging");
  try { row.setPointerCapture(e.pointerId); } catch (err) {}
});
document.addEventListener("pointermove", (e) => {
  if (!lpDrag) return;
  lpDrag.moved = true;
  const list = $("#lpList");
  const rows = Array.from(list.querySelectorAll(".lp-row")).filter(r => r !== lpDrag.row);
  let placed = false;
  for (const r of rows) {
    const b = r.getBoundingClientRect();
    if (e.clientY < b.top + b.height / 2) { list.insertBefore(lpDrag.row, r); placed = true; break; }
  }
  if (!placed) list.appendChild(lpDrag.row);
});
document.addEventListener("pointerup", () => {
  if (!lpDrag) return;
  const row = lpDrag.row, moved = lpDrag.moved;
  row.classList.remove("dragging");
  lpDrag = null;
  const ids = Array.from($("#lpList").querySelectorAll(".lp-row")).map(r => r.dataset.id);
  if (moved && ids.length) {
    snapNote(true);
    ids.forEach((id, i) => {                    // แถวบนสุด = ชั้นสูงสุด
      const b = getBlock(id); if (b && b.free) b.free.z = ids.length - 1 - i;
    });
    renderBlocks(); queueSave(200);
  } else {
    flashBlock(row.dataset.id);                 // แตะเฉย ๆ = ชี้ว่าอันไหน
  }
});
function flashBlock(id) {
  const el = document.querySelector(`.block[data-id="${id}"]`);
  if (!el) return;
  el.classList.add("flash");
  el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  setTimeout(() => el.classList.remove("flash"), 900);
}
function toggleLayerPanel(show) {
  const panel = $("#layerPanel");
  panel.hidden = (show === undefined) ? !panel.hidden : !show;
  $("#btnLayers").classList.toggle("on", !panel.hidden);
  renderLayers();
}

function refreshFreeMenuLabel() {
  $$("#blocks .block").forEach(el => {
    const b = getBlock(el.dataset.id); if (!b) return;
    const btn = el.querySelector('.bc[data-act="free"]');
    if (btn) btn.textContent = b.free ? "↩ กลับเข้าบรรทัด" : "✥ แยกออกจากบรรทัด";
    el.querySelectorAll(".bc-layer").forEach(x => { x.hidden = !b.free; });
  });
}

/* ------- ลากย้าย / ปรับขนาด บล็อกอิสระและรูปภาพ ------- */
let fdrag = null;
document.addEventListener("pointerdown", (e) => {
  const mv = e.target.closest("#blocks .free-move");
  const rz = e.target.closest("#blocks .free-resize");
  const ir = e.target.closest("#blocks .img-resize");
  if (!mv && !rz && !ir) return;
  const el = e.target.closest(".block");
  const b = getBlock(el.dataset.id); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  const paper = $("#paper").getBoundingClientRect();
  snapNote(true);
  if (mv && b.free) {                       // จับลาก = ยกขึ้นมาข้างหน้าให้เห็นชัด
    const frees = state.doc.blocks.filter(x => x.free);
    frees.forEach(x => { if (typeof x.free.z !== "number") x.free.z = 0; });
    const mx = Math.max.apply(null, frees.map(x => x.free.z));
    if (b.free.z !== mx) {
      b.free.z = mx + 1;
      frees.slice().sort((p, q) => p.free.z - q.free.z).forEach((x, i) => {
        x.free.z = i;
        const n = document.querySelector(`.block[data-id="${x.id}"]`);
        if (n) n.style.zIndex = 5 + i;      /* อัปเดตสไตล์ตรง ๆ ห้าม render ใหม่
                                               ไม่งั้น element ที่กำลังลากจะหายไป */
      });
    }
  }
  if (mv)      fdrag = { k: "move", b, sx: e.clientX, sy: e.clientY, ox: b.free.x, oy: b.free.y };
  else if (rz) fdrag = { k: "w", b, sx: e.clientX, ow: b.free.w };
  else         fdrag = { k: "imgw", b, sx: e.clientX, ow: b.w, el };
  try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
});
document.addEventListener("pointermove", (e) => {
  if (!fdrag) return;
  const b = fdrag.b;
  if (fdrag.k === "move") {
    const paper = $("#paper");
    const maxX = Math.max(0, paper.clientWidth - (b.free.w || 200) - 8);
    b.free.x = Math.min(maxX, Math.max(0, Math.round(fdrag.ox + e.clientX - fdrag.sx)));
    b.free.y = Math.max(0, Math.round(fdrag.oy + e.clientY - fdrag.sy));
    const el = document.querySelector(`.block[data-id="${b.id}"]`);
    if (el) { el.style.left = b.free.x + "px"; el.style.top = b.free.y + "px"; }
  } else if (fdrag.k === "w") {
    const paper = $("#paper");
    const maxW = Math.max(140, paper.clientWidth - b.free.x - 8);
    b.free.w = Math.min(maxW, Math.max(140, Math.round(fdrag.ow + e.clientX - fdrag.sx)));
    const el = document.querySelector(`.block[data-id="${b.id}"]`);
    if (el) el.style.width = b.free.w + "px";
  } else {
    b.w = Math.max(60, Math.round(fdrag.ow + e.clientX - fdrag.sx));
    const box = fdrag.el.querySelector(".b-img");
    if (box) box.style.width = b.w + "px";
  }
});
document.addEventListener("pointerup", () => {
  if (!fdrag) return;
  fdrag = null; queueSave(200); growPaper();
});

/* ให้กระดาษสูงพอครอบบล็อกอิสระที่อยู่ล่างสุด */
function growPaper() {
  const paper = $("#paper"); if (!paper) return;
  let bottom = 0;
  state.doc && state.doc.blocks.forEach(b => {
    if (b.free) {
      const el = document.querySelector(`.block[data-id="${b.id}"]`);
      bottom = Math.max(bottom, b.free.y + (el ? el.offsetHeight : 80));
    }
  });
  paper.style.minHeight = bottom ? Math.max(bottom + 80, 500) + "px" : "";
}

/* ------- ย้อนกลับ / ไปข้างหน้า ของโน้ตปกติ ------- */
let noteUndo = [], noteRedo = [], lastSnap = 0;
function snapNote(force) {
  if (!state.doc) return;
  const now = Date.now();
  if (!force && now - lastSnap < 1200) return;      // พิมพ์รัว ๆ ไม่ต้องเก็บทุกตัวอักษร
  lastSnap = now;
  noteUndo.push(JSON.stringify(state.doc.blocks));
  if (noteUndo.length > 60) noteUndo.shift();
  noteRedo.length = 0;
  updateUndoButtons();
}
function undoNote() {
  if (!noteUndo.length || !state.doc) return;
  noteRedo.push(JSON.stringify(state.doc.blocks));
  state.doc.blocks = JSON.parse(noteUndo.pop()).map(normalizeBlock);
  renderBlocks(); queueSave(200); updateUndoButtons();
}
function redoNote() {
  if (!noteRedo.length || !state.doc) return;
  noteUndo.push(JSON.stringify(state.doc.blocks));
  state.doc.blocks = JSON.parse(noteRedo.pop()).map(normalizeBlock);
  renderBlocks(); queueSave(200); updateUndoButtons();
}
function updateUndoButtons() {
  const u = $("#btnUndo"), r = $("#btnRedo");
  if (u) u.disabled = !noteUndo.length;
  if (r) r.disabled = !noteRedo.length;
}

/* ------- บันทึกอัตโนมัติ ------- */
let saveTimer = null;
function queueSave(delay = 700) {
  state.dirty = true;
  setSaveState("กำลังพิมพ์…");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(doSave, delay);
}
async function doSave() {
  if (!state.topic || !state.doc) return;
  state.saving = true; setSaveState("กำลังบันทึก…");
  try {
    const where = await Store.save(state.topic.id, state.doc);
    state.dirty = false;
    setSaveState(where === "cloud" ? "บันทึกแล้ว ☁" : "บันทึกในเครื่องนี้แล้ว ✓");
  } catch (e) {
    console.warn(e);
    setSaveState(e && e.message ? "✕ " + e.message : "บันทึกไม่สำเร็จ ✕");
  } finally { state.saving = false; }
}
function setSaveState(t) {
  const el = $("#saveState"); el.textContent = t;
  clearTimeout(el._t); el._t = setTimeout(() => { if (!state.dirty) el.textContent = ""; }, 2500);
}
window.addEventListener("beforeunload", () => {
  if (state.dirty) doSave();
  if (state.canvasDirty) saveCanvasNow();
});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) return;
  if (state.dirty) doSave();
  if (state.canvasDirty) saveCanvasNow();
});

/* ------- การพิมพ์ในบล็อก ------- */
const blocksEl = () => $("#blocks");

document.addEventListener("input", (e) => {
  const ed = e.target.closest("#blocks .edit"); if (!ed) return;
  const blockEl = ed.closest(".block"); const b = getBlock(blockEl.dataset.id); if (!b) return;
  snapNote();
  if (b.type === "code") b.text = ed.textContent;
  else if (b.type === "table") b.rows[+ed.dataset.r][+ed.dataset.c] = clean(ed.innerHTML);
  else b.html = clean(ed.innerHTML);
  queueSave();
});

document.addEventListener("change", (e) => {
  const chk = e.target.closest(".todo-check"); if (!chk) return;
  const blockEl = chk.closest(".block"); const b = getBlock(blockEl.dataset.id);
  b.done = chk.checked;
  blockEl.querySelector(".edit").classList.toggle("done", b.done);
  queueSave(200);
});

/* วางข้อความ -> วางเป็นข้อความล้วน */
document.addEventListener("paste", (e) => {
  const ed = e.target.closest("#blocks .edit"); if (!ed) return;
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData("text/plain");
  document.execCommand("insertText", false, text);
});

document.addEventListener("keydown", (e) => {
  if (state.noteMode === "text" && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
    e.preventDefault(); e.shiftKey ? redoNote() : undoNote(); return;
  }
  if (state.noteMode === "text" && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
    e.preventDefault(); redoNote(); return;
  }
  const ed = e.target.closest("#blocks .edit"); if (!ed) return;
  const blockEl = ed.closest(".block"); const b = getBlock(blockEl.dataset.id); if (!b) return;

  if (e.key === "Enter" && !e.shiftKey && b.type !== "code" && b.type !== "table") {
    const isList = (b.type === "bullet" || b.type === "todo");
    if (isList) {
      e.preventDefault();
      if (!plain(b.html).trim()) {                 // กด Enter บนรายการว่าง = ออกจากรายการ
        b.type = "p"; b.html = ""; renderBlocks(b.id); queueSave(); return;
      }
      addBlock(b.type, b.id);
      return;
    }
    /* ข้อความทั่วไป: ขึ้นบรรทัดใหม่ในก้อนเดิม ไม่แตกเป็นบล็อกใหม่
       ถ้าอยากได้ก้อนใหม่ ให้กดปุ่มเพิ่มบล็อกเอง */
    e.preventDefault();
    document.execCommand("insertLineBreak");
    ed.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }
  if (e.key === "Backspace") {
    const empty = b.type === "code" ? !ed.textContent : !plain(ed.innerHTML).trim();
    const sel = getSelection();
    if (empty && state.doc.blocks.length > 1 && sel && sel.anchorOffset === 0) {
      e.preventDefault(); removeBlock(b.id);
    }
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); doSave(); }
});

/* ------- ปุ่มควบคุมบล็อก + ตาราง ------- */
document.addEventListener("click", (e) => {
  const dbtn = e.target.closest("#blocks .b-detail");
  if (dbtn) {
    e.preventDefault();
    openBlockDetail(dbtn.closest(".block").dataset.id);
    return;
  }
  const bm = e.target.closest("#blocks .bmenu");
  $$("#blocks .bpop").forEach(p => { if (!bm || p !== bm.nextElementSibling) p.hidden = true; });
  if (bm) { const pop = bm.nextElementSibling; pop.hidden = !pop.hidden; return; }

  const lz = e.target.closest("#blocks .bc-lz");
  if (lz) { setLayer(lz.closest(".block").dataset.id, lz.dataset.act); return; }
  const bc = e.target.closest("#blocks .bc");
  if (bc) {
    const id = bc.closest(".block").dataset.id;
    const i = idxOf(id), arr = state.doc.blocks;
    const act = bc.dataset.act;
    snapNote(true);
    if (act === "up" && i > 0)            { [arr[i-1], arr[i]] = [arr[i], arr[i-1]]; renderBlocks(id, false); queueSave(); }
    else if (act === "down" && i < arr.length-1) { [arr[i+1], arr[i]] = [arr[i], arr[i+1]]; renderBlocks(id, false); queueSave(); }
    else if (act === "dup")               { const copy = normalizeBlock(JSON.parse(JSON.stringify(arr[i]))); copy.id = uid(); arr.splice(i+1, 0, copy); renderBlocks(copy.id); queueSave(); }
    else if (act === "del")               { removeBlock(id); }
    else if (act === "free")              { toggleFree(id); }
    else if (act === "detail")            { openBlockDetail(id, true); }

    return;
  }
  const tt = e.target.closest("#blocks .tt");
  if (tt) {
    const blockEl = tt.closest(".block"); const b = getBlock(blockEl.dataset.id);
    const act = tt.dataset.act;
    if (act === "addrow") b.rows.push(new Array(b.rows[0].length).fill(""));
    if (act === "delrow" && b.rows.length > 1) b.rows.pop();
    if (act === "addcol") b.rows.forEach(r => r.push(""));
    if (act === "delcol" && b.rows[0].length > 1) b.rows.forEach(r => r.pop());
    renderBlocks(); queueSave();
  }
});

/* ------- เมนูเพิ่มบล็อก ------- */
function buildAddMenu() {
  $("#addMenu").innerHTML = BLOCK_TYPES.map(t =>
    `<button class="am" data-type="${t.type}"><span class="am-ico">${t.icon}</span>${esc(t.label)}</button>`).join("");
}
$("#addBtn").onclick = (e) => {
  e.stopPropagation();
  const m = $("#addMenu");
  m.hidden = !m.hidden;
  if (!m.hidden) requestAnimationFrame(() => {
    const r = m.getBoundingClientRect();
    if (r.bottom > innerHeight - 8 || r.top < 8) m.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
};
$("#addMenu").onclick = (e) => {
  const b = e.target.closest("[data-type]"); if (!b) return;
  $("#addMenu").hidden = true;
  if (b.dataset.type === "img") { $("#noteImgFile").value = ""; $("#noteImgFile").click(); return; }
  addBlock(b.dataset.type);
};
$("#noteImgFile").onchange = async (e) => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const { src, w } = await shrinkImageFile(f, 1400, 0.78);
    snapNote(true);
    const b = normalizeBlock({ type: "img", src, w: Math.min(560, w) });
    state.doc.blocks.push(b);
    renderBlocks(); queueSave(200);
    const kb = Math.round(src.length * 0.75 / 1024);
    if (kb > 900) setSaveState("รูปนี้ใหญ่ราว " + kb + " KB");
  } catch (err) { alert("แนบรูปไม่สำเร็จ: " + err.message); }
  e.target.value = "";
};
document.addEventListener("click", (e) => {
  if (!e.target.closest(".add-row")) $("#addMenu").hidden = true;
});

/* ------- แถบจัดรูปแบบตัวอักษร (ลอยขึ้นเมื่อลากเลือกข้อความ) -------
   เปลี่ยนสี/ขนาดได้เฉพาะส่วนที่เลือก ไม่กระทบทั้งบล็อก              */
const TEXT_COLORS = ["auto", "#3b7ddd", "#2e9e6b", "#e05252", "#d98324", "#7c5cd6"];
const fmtBar = document.createElement("div");
fmtBar.className = "fmtbar"; fmtBar.hidden = true;
fmtBar.innerHTML = `
  <button data-cmd="bold"><b>B</b></button>
  <button data-cmd="italic"><i>I</i></button>
  <button data-cmd="underline"><u>U</u></button>
  <button data-size="down" title="ตัวเล็กลง">A−</button>
  <button data-size="up" title="ตัวใหญ่ขึ้น">A+</button>
  ${TEXT_COLORS.map(c => `<button class="fmt-color" data-color="${c}"
      style="background:${c === "auto" ? "currentColor" : c}" title="เปลี่ยนสีเฉพาะที่เลือก"></button>`).join("")}
  <button data-cmd="hl" title="ปากกาเน้นข้อความ">🖍</button>
  <button data-cmd="removeFormat" title="ล้างรูปแบบ">✕</button>`;
document.body.appendChild(fmtBar);
fmtBar.addEventListener("mousedown", (e) => e.preventDefault());
fmtBar.addEventListener("click", (e) => {
  const col = e.target.closest("[data-color]");
  if (col) {
    const c = col.dataset.color;
    styleSelection({ color: c === "auto" ? (document.documentElement.dataset.theme === "dark" ? "#ecebe7" : "#1d1c1a") : c });
    return;
  }
  const z = e.target.closest("[data-size]");
  if (z) {
    const s = getSelection();
    if (!s || s.isCollapsed) return;
    const n = s.anchorNode && (s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentElement);
    if (!n) return;
    const cur = parseFloat(getComputedStyle(n).fontSize) || 16;
    const next = Math.max(9, Math.min(72, Math.round(cur * (z.dataset.size === "up" ? 1.25 : 0.8))));
    styleSelection({ fontSize: next + "px", lineHeight: "1.5" });
    return;
  }
  const b = e.target.closest("[data-cmd]"); if (!b) return;
  if (b.dataset.cmd === "hl") styleSelection({ backgroundColor: "#ffe58a", color: "#1d1c1a" });
  else document.execCommand(b.dataset.cmd, false, null);
  const ed = document.activeElement && document.activeElement.closest
           ? document.activeElement.closest("#blocks .edit") : null;
  if (ed) ed.dispatchEvent(new Event("input", { bubbles: true }));
});
document.addEventListener("selectionchange", () => {
  const s = getSelection();
  if (!s || s.isCollapsed || !s.rangeCount) { fmtBar.hidden = true; return; }
  const node = s.anchorNode; const host = (node.nodeType === 1 ? node : node.parentElement);
  if (!host || !host.closest("#blocks .edit")) { fmtBar.hidden = true; return; }
  const r = s.getRangeAt(0).getBoundingClientRect();
  if (!r.width) { fmtBar.hidden = true; return; }
  fmtBar.hidden = false;
  fmtBar.style.top = (window.scrollY + r.top - 50) + "px";
  const w = fmtBar.offsetWidth || 300;
  let x = window.scrollX + r.left + r.width / 2 - w / 2;
  x = Math.max(window.scrollX + 8, Math.min(window.scrollX + document.documentElement.clientWidth - w - 8, x));
  fmtBar.style.left = x + "px";
});

/* กดสองครั้งที่บล็อก = เปิดเมนู ⋮ ของบล็อกนั้น (มีปุ่มแยกออกจากบรรทัดอยู่ในนั้น) */
document.addEventListener("dblclick", (e) => {
  const blk = e.target.closest("#blocks .block"); if (!blk) return;
  if (e.target.closest(".bpop") || e.target.closest(".bc")) return;
  $$("#blocks .bpop").forEach(p => p.hidden = true);
  const pop = blk.querySelector(".bpop");
  if (pop) { pop.hidden = false; e.preventDefault(); }
});

/* ------- ค้นหา (ค้นทั้งโน้ตปกติและโน้ตไดอะแกรม แล้วกระโดดไปยังตำแหน่ง) ------- */
$("#btnSearch").onclick = () => Find.toggle();
function clearSearch() { Find.close(); }
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === "f" || e.key === "F")) {
    if (document.getElementById("screen-note").hidden) return;
    e.preventDefault(); Find.open();
  }
});

/* ------- สำรอง / กู้คืน / พิมพ์ ------- */
$("#btnExport").onclick = () => {
  const data = Store.exportAll();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "สมุดจด-ห้องเรียนรวม-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click(); URL.revokeObjectURL(a.href);
};
$("#btnImport").onclick = () => $("#importFile").click();
$("#importFile").onchange = async (e) => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const n = await Store.importAll(JSON.parse(await f.text()));
    alert(`กู้คืนสำเร็จ ${n} หน้า — กำลังโหลดหน้านี้ใหม่`);
    route();
  } catch (err) { alert("กู้คืนไม่สำเร็จ: " + err.message); }
  e.target.value = "";
};
$("#btnPrint").onclick = () => window.print();

/* ------- ธีมสว่าง/มืด ------- */
const THEME_KEY = "hr:theme";
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  $("#themeBtn").textContent = t === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  if (typeof DiagramNote !== "undefined" && DiagramNote.refreshTheme) DiagramNote.refreshTheme();
}
$("#themeBtn").onclick = () =>
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");

/* ------- บัญชีผู้ใช้ ------- */
function refreshAccount() {
  const u = Store.user;
  $("#accountLabel").textContent = u ? (u.email || "บัญชีของฉัน").split("@")[0] : "เข้าสู่ระบบ";
  $("#authSignedIn").hidden = !u;
  $("#authForms").hidden = !!u;
  $("#authTitle").textContent = u ? "บัญชีของฉัน" : "เข้าสู่ระบบ";
  $("#authSub").textContent = u ? "สมุดจดของคุณถูกบันทึกไว้บนฐานข้อมูลแล้ว" :
    "เข้าสู่ระบบเพื่อให้สมุดจดของคุณตามไปได้ทุกเครื่อง";
  if (u) $("#authWho").textContent = u.email || "";
  $("#cloudOff").hidden = Store.cloudReady;
}
$("#accountBtn").onclick = () => { refreshAccount(); $("#authModal").hidden = false; };
$("#authClose").onclick = () => $("#authModal").hidden = true;
$("#authModal").onclick = (e) => { if (e.target.id === "authModal") $("#authModal").hidden = true; };
$("#btnGuest").onclick  = () => $("#authModal").hidden = true;

async function authTry(fn, okMsg) {
  const msg = $("#authMsg"); msg.className = "auth-msg"; msg.textContent = "กำลังดำเนินการ…";
  try {
    await fn($("#authEmail").value.trim(), $("#authPassword").value);
    msg.classList.add("ok"); msg.textContent = okMsg;
    refreshAccount(); route();
  } catch (err) {
    msg.classList.add("err");
    msg.textContent = "ไม่สำเร็จ: " + (err.message || err);
  }
}
$("#btnLogin").onclick  = () => authTry(Store.signIn, "เข้าสู่ระบบเรียบร้อย");
$("#btnSignup").onclick = () => authTry(Store.signUp, "สมัครสมาชิกแล้ว — ตรวจอีเมลเพื่อยืนยัน แล้วเข้าสู่ระบบได้เลย");
$("#btnLogout").onclick = async () => { await Store.signOut(); refreshAccount(); route(); };

/* ------- ปุ่มสลับโหมดโน้ต / ข้อสอบ ------- */
$("#noteSwitch").onclick = (e) => {
  const b = e.target.closest("[data-note]");
  if (b) applyNoteMode(b.dataset.note);
};
$("#btnMock").onclick = openMock;
$("#btnLayers").onclick = () => toggleLayerPanel();
$("#lpClose").onclick   = () => toggleLayerPanel(false);
$("#btnUndo").onclick = undoNote;
$("#btnRedo").onclick = redoNote;


/* ------- เริ่มทำงาน ------- */
$("#brandBtn").onclick = () => go("#/");
$$("[data-back='home']").forEach(b => b.onclick = () => go("#/"));
window.addEventListener("hashchange", route);

(async function start() {
  let saved = "light";
  try { saved = localStorage.getItem(THEME_KEY) ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch (e) {}
  applyTheme(saved);
  try { state.noteMode = localStorage.getItem(MODE_KEY) === "text" ? "text" : "diagram"; } catch (e) {}
  buildAddMenu();
  renderHome();
  await Store.init();
  Store.onAuthChange(() => { refreshAccount(); route(); });
  refreshAccount();
  route();
})();
