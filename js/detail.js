/* ============================================================
   detail.js — ป๊อปอัป "ข้อมูลแบบละเอียด"
   ใช้ร่วมกันทั้งโน้ตปกติและโน้ตไดอะแกรม
   ------------------------------------------------------------
   วิธีเรียก:  Detail.open({ title, sub, html, onSave })
   ถ้าส่ง onSave มาด้วย จะเปิดโหมดแก้ไขได้ (มีปุ่ม ✎ แก้ไข)
   ============================================================ */
const Detail = (() => {
  let host = null, curr = null, editing = false;

  /* ---- ทำความสะอาด HTML (กันสคริปต์) แต่ยอมให้มี svg สำหรับรูปประกอบ ---- */
  const OK_TAGS = new Set(("h1,h2,h3,h4,p,div,span,br,hr,b,strong,i,em,u,s,sub,sup,small,mark,"+
    "ul,ol,li,dl,dt,dd,table,thead,tbody,tfoot,tr,th,td,caption,pre,code,kbd,blockquote,figure,figcaption,"+
    "img,a,svg,g,path,rect,circle,ellipse,line,polyline,polygon,text,tspan,defs,marker,linearGradient,stop,"+
    "radialGradient,clipPath,use,symbol,title,desc,foreignObject").split(","));
  const BAD_ATTR = /^on/i;

  function sanitize(html) {
    const t = document.createElement("div");
    t.innerHTML = String(html == null ? "" : html);
    (function walk(node) {
      Array.from(node.childNodes).forEach(ch => {
        if (ch.nodeType === 3) return;                       // ข้อความ
        if (ch.nodeType !== 1) { ch.remove(); return; }
        const tag = ch.tagName.toLowerCase();
        if (!OK_TAGS.has(tag)) { ch.replaceWith(...ch.childNodes); return; }
        Array.from(ch.attributes).forEach(a => {
          const n = a.name.toLowerCase();
          const v = String(a.value || "");
          if (BAD_ATTR.test(n)) { ch.removeAttribute(a.name); return; }
          if ((n === "href" || n === "src" || n === "xlink:href") &&
              /^\s*(javascript|vbscript|data:text\/html)/i.test(v)) ch.removeAttribute(a.name);
        });
        if (tag === "a") { ch.setAttribute("target", "_blank"); ch.setAttribute("rel", "noopener"); }
        walk(ch);
      });
    })(t);
    return t.innerHTML;
  }

  function build() {
    if (host) return host;
    host = document.createElement("div");
    host.className = "dt-back";
    host.hidden = true;
    host.innerHTML = `
      <div class="dt-win" role="dialog" aria-modal="true">
        <div class="dt-head">
          <div class="dt-titles">
            <div class="dt-title"></div>
            <div class="dt-sub"></div>
          </div>
          <div class="dt-acts">
            <button class="dt-btn dt-edit" title="แก้ไขข้อความนี้">✎ แก้ไข</button>
            <button class="dt-btn dt-save" hidden>บันทึก</button>
            <button class="dt-btn dt-cancel" hidden>ยกเลิก</button>
            <button class="dt-btn dt-print" title="พิมพ์เฉพาะหน้านี้">🖨</button>
            <button class="dt-btn dt-close" title="ปิด (Esc)">✕</button>
          </div>
        </div>
        <div class="dt-body"></div>
      </div>`;
    document.body.appendChild(host);

    host.addEventListener("click", (e) => { if (e.target === host) close(); });
    host.querySelector(".dt-close").onclick = close;
    host.querySelector(".dt-print").onclick = printOnly;
    host.querySelector(".dt-edit").onclick = () => setEditing(true);
    host.querySelector(".dt-cancel").onclick = () => { setEditing(false); paint(); };
    host.querySelector(".dt-save").onclick = () => {
      const html = sanitize(host.querySelector(".dt-body").innerHTML);
      if (curr && curr.onSave) curr.onSave(html);
      if (curr) curr.html = html;
      setEditing(false); paint();
    };
    document.addEventListener("keydown", (e) => {
      if (host.hidden) return;
      if (e.key === "Escape") { e.stopPropagation(); close(); }
    }, true);
    return host;
  }

  function paint() {
    const b = host.querySelector(".dt-body");
    b.innerHTML = sanitize(curr.html || `<p class="dt-empty">ยังไม่มีคำอธิบายแบบละเอียดของหัวข้อนี้</p>`);
    b.contentEditable = editing ? "true" : "false";
    b.classList.toggle("editing", editing);
    host.querySelector(".dt-title").textContent = curr.title || "ข้อมูลแบบละเอียด";
    host.querySelector(".dt-sub").textContent = curr.sub || "";
    host.querySelector(".dt-sub").hidden = !curr.sub;
    b.scrollTop = 0;
  }

  function setEditing(on) {
    editing = !!on;
    host.querySelector(".dt-edit").hidden = editing || !curr.onSave;
    host.querySelector(".dt-save").hidden = !editing;
    host.querySelector(".dt-cancel").hidden = !editing;
    const b = host.querySelector(".dt-body");
    b.contentEditable = editing ? "true" : "false";
    b.classList.toggle("editing", editing);
    if (editing) b.focus();
  }

  function open(opt) {
    build();
    curr = Object.assign({ title: "", sub: "", html: "", onSave: null }, opt || {});
    editing = false;
    host.hidden = false;
    document.body.classList.add("dt-open");
    paint(); setEditing(false);
    host.querySelector(".dt-win").scrollTop = 0;
  }
  function close() {
    if (!host || host.hidden) return;
    host.hidden = true; editing = false; curr = null;
    document.body.classList.remove("dt-open");
  }
  function isOpen() { return !!(host && !host.hidden); }

  function printOnly() {
    document.body.classList.add("dt-printing");
    const done = () => { document.body.classList.remove("dt-printing");
                         window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    setTimeout(() => window.print(), 30);
  }

  /* ข้อความล้วนของรายละเอียด — ใช้ตอนค้นหา */
  function plain(html) {
    const t = document.createElement("div");
    t.innerHTML = sanitize(html || "");
    t.querySelectorAll("svg").forEach(s => s.remove());
    return (t.textContent || "").replace(/\s+/g, " ").trim();
  }

  return { open, close, isOpen, sanitize, plain };
})();
