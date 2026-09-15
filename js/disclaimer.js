/* ============================================================
   disclaimer.js — คำชี้แจงว่าเว็บนี้สร้างด้วย AI
   ------------------------------------------------------------
   ทำ 2 อย่าง:
   1) ป๊อปอัปตอนเปิดเว็บ — กด "รับทราบ" แล้วหายไป
      จำไว้ใน sessionStorage → เปิดเว็บใหม่อีกครั้งถึงจะเด้งอีก
      (กดไปมาในเว็บหรือรีเฟรชแท็บเดิม จะไม่เด้งซ้ำให้รำคาญ)
   2) ข้อความเล็ก ๆ มุมซ้ายบนของเนื้อหา — แสดงเฉพาะ
      หน้าแรก (#screen-home) กับหน้าเลือกหลัก/เสริม (#screen-mode)
      ไม่แสดงในหน้าสมุดจด (โน้ตปกติ / โน้ตไดอะแกรม)

   ไฟล์นี้เป็นอิสระ ไม่แตะ app.js / styles.css
   โหลดเป็นไฟล์สุดท้ายใน index.html (หลัง app.js)
   ============================================================ */
(function () {
  "use strict";

  var KEY = "hr:disclaimer:v1";
  var TEXT = "web นี้ถูกสร้างมาโดยการใช้ ai และเป็นการสรุปข้อมูลเนื้อหาที่เรียนมาจากในการเรียนการสอนในโรงเรียนและอีกส่วนนึงเป็นข้อมูลเพิ่มเติมจากคนเขียนด้วยถ้าข้อมูลผิดอย่างไรผู้จัดขออภัยใน ณ ที่นี้ด้วย";

  /* ---------- สไตล์ (ใช้ตัวแปรสีชุดเดียวกับเว็บ รองรับโหมดมืดอัตโนมัติ) ---------- */
  var css = [
    ".dc-back{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.5);",
    "display:flex;align-items:center;justify-content:center;padding:18px}",
    ".dc-modal{background:var(--card);color:var(--ink);border:1px solid var(--line);",
    "border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.3);padding:26px 24px;",
    "width:min(460px,100%);text-align:left}",
    ".dc-modal h2{margin:0 0 10px;font-size:19px;font-weight:700;display:flex;gap:8px;align-items:center}",
    ".dc-modal p{margin:0 0 20px;font-size:15px;line-height:1.8}",
    ".dc-ok{width:100%;background:var(--accent);color:#fff;border:0;border-radius:10px;",
    "padding:11px 16px;font-weight:600;font-size:15px;font-family:inherit;cursor:pointer}",
    ".dc-ok:hover{filter:brightness(1.07)}",
    ".dc-note{max-width:var(--maxw);margin:0 auto;padding:12px 18px 0;display:flex;gap:7px;",
    "align-items:flex-start;font-size:12.5px;line-height:1.65;color:var(--dim)}",
    ".dc-note p{margin:0;max-width:660px}",
    ".dc-ico{flex:0 0 auto;line-height:1.5}",
    "@media(max-width:600px){.dc-note{font-size:11.5px;padding-top:10px}}"
  ].join("");

  var st = document.createElement("style");
  st.id = "dc-style";
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- ข้อความมุมซ้ายบน ---------- */
  var note = document.createElement("div");
  note.className = "dc-note";
  note.id = "dcNote";
  note.hidden = true;
  note.innerHTML = '<span class="dc-ico">⚠️</span><p></p>';
  note.querySelector("p").textContent = TEXT;

  var main = document.getElementById("app");
  if (main) main.insertBefore(note, main.firstChild);
  else document.body.insertBefore(note, document.body.firstChild);

  /* แสดงเฉพาะหน้าแรกกับหน้าเลือกหลัก/เสริม */
  function visible(el) { return el && !el.hidden; }
  function sync() {
    var home = document.getElementById("screen-home");
    var mode = document.getElementById("screen-mode");
    note.hidden = !(visible(home) || visible(mode));
  }

  var targets = ["screen-home", "screen-mode", "screen-note"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (window.MutationObserver && targets.length) {
    var mo = new MutationObserver(sync);
    targets.forEach(function (el) {
      mo.observe(el, { attributes: true, attributeFilter: ["hidden"] });
    });
  }
  window.addEventListener("hashchange", function () { setTimeout(sync, 0); });
  sync();

  /* ---------- ป๊อปอัป ---------- */
  var seen = false;
  try { seen = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  if (seen) return;

  var back = document.createElement("div");
  back.className = "dc-back";
  back.id = "dcModal";
  back.innerHTML =
    '<div class="dc-modal" role="dialog" aria-modal="true" aria-labelledby="dcTitle">' +
      '<h2 id="dcTitle"><span>⚠️</span><span>คำชี้แจงก่อนเริ่มอ่าน</span></h2>' +
      '<p id="dcText"></p>' +
      '<button class="dc-ok" id="dcOk">รับทราบ</button>' +
    '</div>';
  document.body.appendChild(back);
  back.querySelector("#dcText").textContent = TEXT;

  function close() {
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    if (back.parentNode) back.parentNode.removeChild(back);
    document.removeEventListener("keydown", onKey, true);
  }
  function onKey(e) {
    if (e.key === "Escape" || e.key === "Enter") { e.preventDefault(); close(); }
  }

  back.querySelector("#dcOk").onclick = close;
  document.addEventListener("keydown", onKey, true);
  setTimeout(function () {
    var b = back.querySelector("#dcOk");
    if (b) b.focus();
  }, 0);
})();
