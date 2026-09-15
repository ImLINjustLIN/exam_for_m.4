/* ============================================================
   canvas.js — "โน้ตไดอะแกรม"  (รุ่น 3)
   กระดานเปล่าที่ขยายได้ไม่จำกัด เขียนด้วยปากกา วาดรูปทรง
   ลากย้ายของได้ทุกชิ้น เชื่อมเส้นระหว่างกล่อง จัดกลุ่ม ย้อนกลับได้
   ใช้ได้ทั้งเมาส์ นิ้ว และปากกาบนแท็บเล็ต
   ============================================================ */

/* ---- ใส่รูปแบบให้เฉพาะข้อความที่ลากเลือกไว้ (ใช้ทั้งสองโหมดโน้ต) ---- */
/* ---- ย่อรูปก่อนเก็บ ไม่งั้นพื้นที่ในเบราว์เซอร์เต็มเร็วมาก ---- */
function shrinkImageFile(file, maxPx, quality) {
  maxPx = maxPx || 1400; quality = quality || 0.78;
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onerror = () => rej(new Error("อ่านไฟล์ไม่สำเร็จ"));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => rej(new Error("ไฟล์นี้ไม่ใช่รูปภาพ"));
      img.onload = () => {
        let w = img.width, h = img.height;
        const sc = Math.min(1, maxPx / Math.max(w, h));
        w = Math.max(1, Math.round(w * sc)); h = Math.max(1, Math.round(h * sc));
        const cv = document.createElement("canvas");
        cv.width = w; cv.height = h;
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        const type = /png$/i.test(file.type) && w * h < 400000 ? "image/png" : "image/jpeg";
        res({ src: cv.toDataURL(type, quality), w, h });
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

function styleSelection(css) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || sel.isCollapsed) return false;
  const range = sel.getRangeAt(0);
  const host = (range.commonAncestorContainer.nodeType === 1
                ? range.commonAncestorContainer
                : range.commonAncestorContainer.parentElement);
  if (!host || !host.closest("[contenteditable='true']")) return false;
  const span = document.createElement("span");
  for (const k in css) span.style[k] = css[k];
  try {
    span.appendChild(range.extractContents());
    range.insertNode(span);
  } catch (e) { return false; }
  const r2 = document.createRange();
  r2.selectNodeContents(span);
  sel.removeAllRanges(); sel.addRange(r2);
  const ed = span.closest("[contenteditable='true']");
  if (ed) ed.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}
function clearSelectionStyle() {
  document.execCommand("removeFormat", false, null);
  const ed = document.activeElement && document.activeElement.closest
           ? document.activeElement.closest("[contenteditable='true']") : null;
  if (ed) ed.dispatchEvent(new Event("input", { bubbles: true }));
}

const DiagramNote = (() => {

  /* ---------- ค่าปรับแต่ง ---------- */
  const HOLD_MS   = 420;   // ค้างปากกาไว้กี่มิลลิวินาทีแล้วเปลี่ยนเป็นรูปทรง
  const HOLD_MOVE = 4;
  const MIN_SCALE = 0.08, MAX_SCALE = 6;
  const ATTACH_PAD = 10;   // ระยะเผื่อรอบกล่องที่ถือว่า "จิ้มโดน"

  /* สี "auto" = ดำในโหมดสว่าง / ขาวในโหมดมืด */
  const PALETTE = ["auto", "#3b7ddd", "#2e9e6b", "#e05252", "#d98324", "#7c5cd6"];
  const DASHES = { 0: null, 1: "9 6", 2: "2 5" };          // ทึบ / ประ / จุด
  const AHEAD = [8, 11, 15, 21, 28, 38];   // ขนาดหัวลูกศร 6 ระดับ
  const IMG_MAX = 1400;                                     // ย่อรูปให้กว้าง/สูงไม่เกินนี้
  const IMG_Q   = 0.78;
  const FILLS   = { "auto": "none", "#3b7ddd": "#e8f1fd", "#2e9e6b": "#e6f5ee",
                    "#e05252": "#fdeaea", "#d98324": "#fdf2e3", "#7c5cd6": "#efeafb" };

  const isDark = () => document.documentElement.dataset.theme === "dark";
  const ink    = () => (isDark() ? "#ecebe7" : "#1d1c1a");
  const paint  = (c) => (c === "auto" || !c ? ink() : c);

  /* ---------- สถานะ ---------- */
  let host = null, root = null, gWorld = null, gItems = null,
      gOverlay = null, htmlLayer = null, stage = null, selBar = null, penPop = null;
  let doc = { v: 3, items: [] };
  let view = { x: 0, y: 0, scale: 1 };
  let tool = "select", color = "auto", fillColor = "none", sizeVal = 7;
  let modPanel = null, sizePanel = null, fileInput = null;
  let mode = "edit";
  let sel = new Set();
  let onChange = () => {}, onMockTest = () => {}, onExit = () => {}, onFind = () => {};
  let undoStack = [], redoStack = [];
  const pointers = new Map();
  let drag = null, pinch = null;
  let holdTimer = null, holdAnchor = null;
  let spaceDown = false;
  let outsideClose = null;
  let lastTap = { t: 0, x: 0, y: 0, id: null };
  let textBar = null;

  const widthOf = (v) => 0.6 + (v - 1) * 0.35;      // 1→0.6px, 100→35.3px
  const uid = () => "i" + Math.random().toString(36).slice(2, 9);
  const NS = "http://www.w3.org/2000/svg";
  const el = (n, a) => { const e = document.createElementNS(NS, n);
    if (a) for (const k in a) if (a[k] !== null && a[k] !== undefined) e.setAttribute(k, a[k]);
    return e; };
  const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);

  /* ============================================================
     เรขาคณิต
     ============================================================ */
  function bboxOf(it) {
    switch (it.t) {
      case "k": {
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (let i = 0; i < it.pts.length; i += 2) {
          x0 = Math.min(x0, it.pts[i]); x1 = Math.max(x1, it.pts[i]);
          y0 = Math.min(y0, it.pts[i+1]); y1 = Math.max(y1, it.pts[i+1]);
        }
        return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
      }
      case "l": return { x: Math.min(it.x1, it.x2), y: Math.min(it.y1, it.y2),
                         w: Math.abs(it.x2 - it.x1), h: Math.abs(it.y2 - it.y1) };
      case "x": case "c": {
        const node = htmlLayer && htmlLayer.querySelector('[data-id="' + it.id + '"]');
        const h = node ? node.offsetHeight : (it.t === "c" ? 110 : 40);
        return { x: it.x, y: it.y, w: it.w, h };
      }
      case "img": return { x: it.x, y: it.y, w: it.w, h: it.h };
      case "n": { const p = connPoints(it);
        return { x: Math.min(p.a.x, p.b.x), y: Math.min(p.a.y, p.b.y),
                 w: Math.abs(p.b.x - p.a.x), h: Math.abs(p.b.y - p.a.y) }; }
      default:  return { x: it.x, y: it.y, w: it.w, h: it.h };
    }
  }
  const centerOf = (it) => { const b = bboxOf(it); return { x: b.x + b.w/2, y: b.y + b.h/2 }; };

  function edgePoint(b, tx, ty) {
    const cx = b.x + b.w/2, cy = b.y + b.h/2;
    const dx = tx - cx, dy = ty - cy;
    if (!dx && !dy) return { x: cx, y: cy };
    const hw = b.w/2 + 4, hh = b.h/2 + 4;
    const s = Math.min(hw / (Math.abs(dx) || 1e-6), hh / (Math.abs(dy) || 1e-6));
    return { x: cx + dx * s, y: cy + dy * s };
  }

  const byId = (id) => doc.items.find(i => i.id === id);

  /* แปลงพิกัดจากหน้ากระดาน -> พิกัดภายในของวัตถุที่หมุนอยู่ (หมุนกลับ) */
  function toLocal(it, x, y) {
    if (!it || !it.rot) return { x, y };
    const b = { x: it.x, y: it.y, w: it.w, h: it.h };
    const cx = (b.x || 0) + (b.w || 0)/2, cy = (b.y || 0) + (b.h || 0)/2;
    const a = -it.rot * Math.PI/180, co = Math.cos(a), si = Math.sin(a);
    const dx = x - cx, dy = y - cy;
    return { x: cx + dx*co - dy*si, y: cy + dx*si + dy*co };
  }
  /* กรอบที่ "เห็นจริง" หลังหมุนแล้ว ใช้วางปุ่มลอยและคำนวณพอดีจอ */
  function visualBox(it) {
    const b = bboxOf(it); if (!b) return null;
    if (!it.rot) return b;
    const cx = b.x + b.w/2, cy = b.y + b.h/2;
    const a = it.rot * Math.PI/180, co = Math.cos(a), si = Math.sin(a);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    [[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.h],[b.x,b.y+b.h]].forEach(([px,py]) => {
      const dx = px - cx, dy = py - cy;
      const rx = cx + dx*co - dy*si, ry = cy + dx*si + dy*co;
      x0 = Math.min(x0,rx); x1 = Math.max(x1,rx); y0 = Math.min(y0,ry); y1 = Math.max(y1,ry);
    });
    return { x: x0, y: y0, w: x1-x0, h: y1-y0 };
  }

  /* ปลายเส้นเชื่อม: ผูกกับวัตถุ {id} หรือเป็นจุดลอย {x,y} */
  function endPoint(e) {
    if (e && e.id) { const it = byId(e.id); if (it) return centerOf(it); }
    return { x: (e && e.x) || 0, y: (e && e.y) || 0 };
  }
  function connPoints(it) {
    const A = it.a && it.a.id ? byId(it.a.id) : null;
    const B = it.b && it.b.id ? byId(it.b.id) : null;
    const ca = endPoint(it.a), cb = endPoint(it.b);
    return { a: A ? edgePoint(bboxOf(A), cb.x, cb.y) : ca,
             b: B ? edgePoint(bboxOf(B), ca.x, ca.y) : cb };
  }

  /* เส้นหักฉาก: เดินแนวนอน-แนวตั้ง-แนวนอน */
  function elbowPath(a, b) {
    const dx = Math.abs(b.x - a.x), dy = Math.abs(b.y - a.y);
    if (dx >= dy) { const m = (a.x + b.x) / 2;
      return `M ${a.x} ${a.y} L ${m} ${a.y} L ${m} ${b.y} L ${b.x} ${b.y}`; }
    const m = (a.y + b.y) / 2;
    return `M ${a.x} ${a.y} L ${a.x} ${m} L ${b.x} ${m} L ${b.x} ${b.y}`;
  }
  function linePath(it) {
    const p = it.t === "n" ? connPoints(it)
                           : { a: { x: it.x1, y: it.y1 }, b: { x: it.x2, y: it.y2 } };
    return it.route === "e" ? elbowPath(p.a, p.b)
                            : `M ${p.a.x} ${p.a.y} L ${p.b.x} ${p.b.y}`;
  }

  /* หา "กล่อง" ที่พิกัดนี้ (ใช้ตอนเชื่อมเส้น) — ไม่นับเส้นและลายมือ */
  function objectAtWorld(x, y) {
    for (let i = doc.items.length - 1; i >= 0; i--) {
      const it = doc.items[i];
      if (it.t === "n" || it.t === "l" || it.t === "k") continue;
      const b = bboxOf(it); if (!b) continue;
      const q = toLocal(it, x, y);
      if (q.x >= b.x - ATTACH_PAD && q.x <= b.x + b.w + ATTACH_PAD &&
          q.y >= b.y - ATTACH_PAD && q.y <= b.y + b.h + ATTACH_PAD) return it;
    }
    return null;
  }

  function selectionBox() {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, n = 0;
    sel.forEach(id => { const it = byId(id); if (!it) return;
      const b = visualBox(it); if (!b) return;
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.w); y1 = Math.max(y1, b.y + b.h); n++; });
    return n ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null;
  }

  /* ============================================================
     ประวัติการแก้ไข
     ============================================================ */
  const snapshot = () => JSON.stringify(doc.items);
  function pushHistory() {
    undoStack.push(snapshot());
    if (undoStack.length > 80) undoStack.shift();
    redoStack.length = 0; refreshHistoryButtons();
  }
  function undo() { if (!undoStack.length) return;
    redoStack.push(snapshot()); doc.items = JSON.parse(undoStack.pop());
    sel.clear(); render(); changed(); refreshHistoryButtons(); }
  function redo() { if (!redoStack.length) return;
    undoStack.push(snapshot()); doc.items = JSON.parse(redoStack.pop());
    sel.clear(); render(); changed(); refreshHistoryButtons(); }
  function refreshHistoryButtons() {
    const u = root && root.querySelector('[data-act="undo"]');
    const r = root && root.querySelector('[data-act="redo"]');
    if (u) u.disabled = !undoStack.length;
    if (r) r.disabled = !redoStack.length;
  }
  const changed = () => onChange();

  /* ============================================================
     พิกัดและมุมมอง
     ============================================================ */
  function toWorld(cx, cy) {
    const r = stage.getBoundingClientRect();
    return { x: (cx - r.left) / view.scale + view.x, y: (cy - r.top) / view.scale + view.y };
  }
  function toScreen(wx, wy) {
    const r = stage.getBoundingClientRect();
    return { x: (wx - view.x) * view.scale + r.left, y: (wy - view.y) * view.scale + r.top };
  }
  function applyView() {
    gWorld.setAttribute("transform",
      `translate(${-view.x * view.scale} ${-view.y * view.scale}) scale(${view.scale})`);
    htmlLayer.style.transform =
      `translate(${-view.x * view.scale}px, ${-view.y * view.scale}px) scale(${view.scale})`;
    const z = root.querySelector(".dn-zoom-val");
    if (z) z.textContent = Math.round(view.scale * 100) + "%";
    positionSelBar();
  }
  function zoomAt(cx, cy, f) {
    const before = toWorld(cx, cy);
    view.scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, view.scale * f));
    const after = toWorld(cx, cy);
    view.x += before.x - after.x; view.y += before.y - after.y;
    applyView(); drawOverlay();
  }
  function fitToContent() {
    const items = doc.items;
    if (!items.length) { view = { x: -40, y: -40, scale: 1 }; applyView(); return; }
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    items.forEach(i => { const b = visualBox(i); if (!b) return;
      x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.w); y1 = Math.max(y1, b.y + b.h); });
    const r = stage.getBoundingClientRect(), pad = 70;
    const s = Math.min((r.width - pad) / Math.max(x1 - x0, 1),
                       (r.height - pad) / Math.max(y1 - y0, 1), 2);
    view.scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
    view.x = x0 - (r.width / view.scale - (x1 - x0)) / 2;
    view.y = y0 - (r.height / view.scale - (y1 - y0)) / 2;
    applyView(); drawOverlay();
  }

  /* ============================================================
     รู้จำรูปทรงจากลายมือ
     ============================================================ */
  function resample(pts, n) {
    const P = [];
    for (let i = 0; i < pts.length; i += 2) P.push([pts[i], pts[i+1]]);
    if (P.length < 2) return P;
    let total = 0;
    for (let i = 1; i < P.length; i++) total += dist(P[i-1][0], P[i-1][1], P[i][0], P[i][1]);
    if (!total) return P;
    const step = total / (n - 1), out = [P[0]];
    let d = 0;
    for (let i = 1; i < P.length; i++) {
      let seg = dist(P[i-1][0], P[i-1][1], P[i][0], P[i][1]);
      if (d + seg >= step) {
        let prev = P[i-1];
        while (d + seg >= step) {
          const t = (step - d) / seg;
          const np = [prev[0] + t*(P[i][0]-prev[0]), prev[1] + t*(P[i][1]-prev[1])];
          out.push(np); seg -= (step - d); d = 0; prev = np;
        }
        d = seg;
      } else d += seg;
    }
    while (out.length < n) out.push(P[P.length-1]);
    return out.slice(0, n);
  }

  function countCorners(R) {
    const n = R.length, k = Math.max(3, Math.round(n / 14)), found = [];
    for (let i = 0; i < n; i++) {
      const A = R[(i - k + n) % n], B = R[(i + k) % n], C = R[i];
      const a = [A[0]-C[0], A[1]-C[1]], b = [B[0]-C[0], B[1]-C[1]];
      const la = Math.hypot(a[0], a[1]), lb = Math.hypot(b[0], b[1]);
      if (!la || !lb) continue;
      let cos = (a[0]*b[0] + a[1]*b[1]) / (la * lb);
      cos = Math.max(-1, Math.min(1, cos));
      const ang = Math.acos(cos) * 180 / Math.PI;
      if (ang < 122) found.push({ i, ang });
    }
    const m = [];
    for (const c of found) {
      const last = m[m.length-1];
      if (last && c.i - last.i < n * 0.11) { if (c.ang < last.ang) m[m.length-1] = c; }
      else m.push(c);
    }
    if (m.length > 1 && n - m[m.length-1].i + m[0].i < n * 0.11) m.pop();
    return m.length;
  }

  function polyArea(R) {
    let a = 0;
    for (let i = 0, n = R.length; i < n; i++) {
      const p = R[i], q = R[(i+1) % n];
      a += p[0]*q[1] - q[0]*p[1];
    }
    return Math.abs(a) / 2;
  }

  function recognize(pts) {
    if (pts.length < 12) return null;
    const R = resample(pts, 64);
    if (R.length < 12) return null;

    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, len = 0;
    R.forEach(p => { x0 = Math.min(x0,p[0]); x1 = Math.max(x1,p[0]);
                     y0 = Math.min(y0,p[1]); y1 = Math.max(y1,p[1]); });
    for (let i = 1; i < R.length; i++) len += dist(R[i-1][0],R[i-1][1],R[i][0],R[i][1]);
    const w = x1-x0, h = y1-y0, diag = Math.hypot(w,h);
    if (diag < 24) return null;

    const first = R[0], last = R[R.length-1];
    const gap = dist(first[0],first[1],last[0],last[1]);
    const closed = gap < Math.max(28, diag * 0.3);

    if (!closed && (len ? gap/len : 0) > 0.86)
      return { t: "l", x1: first[0], y1: first[1], x2: last[0], y2: last[1],
               c: color, w: widthOf(sizeVal), arrow: false, ah: 2 };
    if (!closed) return null;
    if (w < 14 || h < 14) return null;

    const ar = polyArea(R) / (w * h);
    const corners = countCorners(R);

    /* ความกลม: ยิ่งใกล้ 0 ยิ่งกลมสม่ำเสมอ */
    const cx = x0 + w/2, cy = y0 + h/2;
    const rs = R.map(p => Math.hypot((p[0]-cx)/(w/2||1), (p[1]-cy)/(h/2||1)));
    const mean = rs.reduce((a,b)=>a+b,0) / rs.length;
    const sd = Math.sqrt(rs.reduce((a,b)=>a+(b-mean)*(b-mean),0) / rs.length);
    const round = mean ? sd/mean : 1;

    const mk = (t) => ({ t, x: x0, y: y0, w, h, c: color, f: fillColor, sw: 2, dash: 0, rot: 0 });

    /* ลำดับความสำคัญ: สี่เหลี่ยมมาก่อน
       วงรีต้องกลมจริง ๆ เท่านั้น (แทบไม่มีมุม และรัศมีสม่ำเสมอมาก) */
    if (corners >= 4 && corners <= 6 && ar > 0.60) return mk("r");
    if (corners <= 2 && round < 0.115 && ar > 0.66 && ar < 0.90) return mk("e");
    if (corners === 3 && ar > 0.34 && ar < 0.66) return mk("t3");
    if (ar > 0.72) return mk("r");            // เผื่อมุมมนจนนับมุมไม่ครบ
    if (round < 0.085) return mk("e");        // กลมมากจริง ๆ
    return null;                              // เดาไม่ออก ปล่อยเป็นลายมือ
  }

  /* ============================================================
     วาดภาพ
     ============================================================ */
  function pathFromPts(p) {
    if (p.length < 4) return p.length >= 2 ? `M ${p[0]} ${p[1]} l 0.1 0.1` : "";
    let d = `M ${p[0]} ${p[1]}`;
    for (let i = 2; i < p.length - 2; i += 2) {
      const mx = (p[i]+p[i+2])/2, my = (p[i+1]+p[i+3])/2;
      d += ` Q ${p[i]} ${p[i+1]} ${mx} ${my}`;
    }
    return d + ` L ${p[p.length-2]} ${p[p.length-1]}`;
  }

  function arrowRef(it) {
    const d = isDark() ? "d" : "l";
    const i = Math.max(1, Math.min(AHEAD.length, it.ah || 2));
    const u = `url(#dn-ar-${d}-${i})`;
    return { end:  (it.arrow === "end" || it.arrow === "both") ? u : null,
             start: it.arrow === "both" ? u : null };
  }

  function svgForItem(it) {
    const g = el("g", { "data-id": it.id, class: "dn-item" });
    const C = paint(it.c);
    const dash = DASHES[it.dash || 0];
    switch (it.t) {
      case "k":
        g.append(el("path", { d: pathFromPts(it.pts), fill: "none", stroke: "transparent",
          "stroke-width": Math.max(it.w*3, 14), "stroke-linecap": "round" }));
        g.append(el("path", { d: pathFromPts(it.pts), fill: "none", stroke: C,
          "stroke-width": it.w, "stroke-linecap": "round", "stroke-linejoin": "round",
          "stroke-dasharray": dash }));
        break;
      case "r":
        g.append(el("rect", { x: it.x, y: it.y, width: it.w, height: it.h, rx: 6,
          fill: it.f || "none", stroke: C, "stroke-width": it.sw || 2, "stroke-dasharray": dash })); break;
      case "e":
        g.append(el("ellipse", { cx: it.x+it.w/2, cy: it.y+it.h/2, rx: it.w/2, ry: it.h/2,
          fill: it.f || "none", stroke: C, "stroke-width": it.sw || 2, "stroke-dasharray": dash })); break;
      case "t3":
        g.append(el("polygon", { points:
          `${it.x+it.w/2},${it.y} ${it.x},${it.y+it.h} ${it.x+it.w},${it.y+it.h}`,
          fill: it.f || "none", stroke: C, "stroke-width": it.sw || 2, "stroke-dasharray": dash })); break;
      case "img":
        g.append(el("image", { href: it.src, x: it.x, y: it.y, width: it.w, height: it.h,
          preserveAspectRatio: "none" }));
        g.append(el("rect", { x: it.x, y: it.y, width: it.w, height: it.h,
          fill: "transparent", stroke: "none" }));
        break;
      case "l": case "n": {
        const d = linePath(it);
        const ar = arrowRef(it);
        g.append(el("path", { d, fill: "none", stroke: "transparent", "stroke-width": 18 }));
        g.append(el("path", { d, fill: "none", stroke: C, "stroke-width": it.w || 2,
          "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": dash,
          "marker-end": ar.end, "marker-start": ar.start }));
        break;
      }
      default: return null;
    }
    if (it.detail && ["r","e","t3","img"].includes(it.t)) {
      const bb = bboxOf(it);
      const bx = bb.x + bb.w - 13, by = bb.y + 13;
      const bg = el("g", { class: "dn-info-badge", "data-info": it.id });
      bg.append(el("circle", { cx: bx, cy: by, r: 12, fill: C, stroke: "none", opacity: "0.92" }));
      const tx = el("text", { x: bx, y: by + 5, "text-anchor": "middle",
        "font-size": "14", "font-weight": "700", fill: "#fff" });
      tx.textContent = "i";
      bg.append(tx);
      bg.append(el("circle", { cx: bx, cy: by, r: 17, fill: "transparent" }));
      g.append(bg);
    }
    if (it.rot) { const b = bboxOf(it);
      g.setAttribute("transform", `rotate(${it.rot} ${b.x + b.w/2} ${b.y + b.h/2})`); }
    return g;
  }

  function htmlForItem(it) {
    const d = document.createElement("div");
    d.className = it.t === "c" ? "dn-card" : "dn-text";
    d.dataset.id = it.id;
    const ed = mode === "edit";
    if (it.t === "c") {
      d.style.setProperty("--cc", paint(it.c));
      d.innerHTML =
        `<div class="dn-card-title" contenteditable="${ed}" data-f="title" data-ph="หัวข้อ">${it.title||""}</div>
         <div class="dn-card-body"  contenteditable="${ed}" data-f="body"  data-ph="รายละเอียด…">${it.body||""}</div>` +
        (it.detail ? `<button class="dn-info" type="button" data-info="${it.id}">📖 ข้อมูลแบบละเอียด</button>` : "");
    } else {
      d.style.color = paint(it.c);
      d.style.fontSize = (it.size || 18) + "px";
      d.style.fontWeight = it.bold ? "700" : "400";
      d.innerHTML = `<div class="dn-text-in" contenteditable="${ed}" data-f="html" data-ph="พิมพ์ข้อความ…">${it.html||""}</div>`;
    }
    return d;
  }

  function render() {
    gItems.textContent = "";
    doc.items.forEach(it => {
      if (it.t === "x" || it.t === "c") return;
      const n = svgForItem(it); if (n) gItems.appendChild(n);
    });

    const wanted = new Map();
    doc.items.forEach(it => { if (it.t === "x" || it.t === "c") wanted.set(it.id, it); });
    Array.from(htmlLayer.children).forEach(ch => { if (!wanted.has(ch.dataset.id)) ch.remove(); });
    wanted.forEach((it, id) => {
      let node = htmlLayer.querySelector(`[data-id="${id}"]`);
      if (!node) { node = htmlForItem(it); htmlLayer.appendChild(node); }
      node.style.left = it.x + "px"; node.style.top = it.y + "px";
      node.style.width = it.w + "px";
      node.style.transform = it.rot ? `rotate(${it.rot}deg)` : "";
      node.style.transformOrigin = "center center";
      if (it.t === "x") { node.style.fontSize = (it.size || 18) + "px";
                          node.style.fontWeight = it.bold ? "700" : "400"; }
      if (it.t === "c") {
        node.style.setProperty("--cc", paint(it.c));
        const hasBtn = !!node.querySelector(".dn-info");
        if (hasBtn !== !!it.detail) {
          if (it.detail) node.insertAdjacentHTML("beforeend",
            `<button class="dn-info" type="button" data-info="${it.id}">📖 ข้อมูลแบบละเอียด</button>`);
          else node.querySelector(".dn-info").remove();
        }
      }
      else node.style.color = paint(it.c);
      node.classList.toggle("sel", sel.has(id));
      node.querySelectorAll("[contenteditable]").forEach(e => {
        const on = String(mode === "edit");
        if (e.getAttribute("contenteditable") !== on) e.setAttribute("contenteditable", on);
      });
    });
    doc.items.forEach(it => {
      const n = gItems.querySelector(`[data-id="${it.id}"]`);
      if (n) n.classList.toggle("sel", sel.has(it.id));
    });

    const hint = root.querySelector("#dnHint");
    if (hint) hint.style.display = doc.items.length ? "none" : "";
    drawOverlay();
  }

  /* ---------- ชั้นบนสุด: กรอบเลือก จุดปรับขนาด จุดต่อเส้น ---------- */
  const ANCHORS = [["t",0.5,0],["r",1,0.5],["b",0.5,1],["l",0,0.5]];

  function drawOverlay(extra) {
    gOverlay.textContent = "";
    if (extra) gOverlay.appendChild(extra);
    if (mode !== "edit") { positionSelBar(); return; }
    const s = view.scale;

    /* ระหว่างลากปลายเส้น/สร้างเส้นใหม่: โชว์จุดกลางของทุกกล่องให้เล็งง่าย */
    if (drag && (drag.k === "ep" || drag.k === "newconn")) {
      doc.items.forEach(it => {
        if (it.t === "n" || it.t === "l" || it.t === "k") return;
        const c = centerOf(it);
        gOverlay.appendChild(el("circle", { cx: c.x, cy: c.y, r: 7/s, class: "dn-anchor" }));
      });
      if (drag.k === "newconn" && drag.to) {
        gOverlay.appendChild(el("line", { x1: drag.from.x, y1: drag.from.y,
          x2: drag.to.x, y2: drag.to.y, class: "dn-draftline", "stroke-width": 2/s,
          "stroke-dasharray": `${6/s} ${4/s}` }));
      }
    }

    /* เส้นที่เลือกอยู่: วงกลมสองวงที่ปลาย ลากไปเกาะกล่องอื่นได้ */
    if (sel.size === 1) {
      const it = byId(Array.from(sel)[0]);
      if (it && (it.t === "n" || it.t === "l")) {
        const p = it.t === "n" ? connPoints(it)
                : { a: { x: it.x1, y: it.y1 }, b: { x: it.x2, y: it.y2 } };
        ["a","b"].forEach(k => {
          const q = p[k];
          const bound = it.t === "n" && it[k] && it[k].id;
          gOverlay.appendChild(el("circle", { cx: q.x, cy: q.y, r: 10/s,
            class: "dn-ep" + (bound ? " bound" : ""), "data-ep": k, "stroke-width": 2.2/s }));
        });
        positionSelBar(); return;
      }
    }

    const one = sel.size === 1 ? byId(Array.from(sel)[0]) : null;
    /* ถ้าวัตถุหมุนอยู่ ให้กรอบและที่จับหมุนตามไปด้วย จะได้ตรงกับของจริง */
    let layer = gOverlay;
    if (one && one.rot) {
      const ob = bboxOf(one);
      layer = el("g", { transform: `rotate(${one.rot} ${ob.x + ob.w/2} ${ob.y + ob.h/2})` });
      gOverlay.appendChild(layer);
    }
    const b = one ? bboxOf(one) : selectionBox();
    if (!b) { positionSelBar(); return; }
    const pad = 6/s;
    layer.appendChild(el("rect", { x: b.x-pad, y: b.y-pad, width: b.w+pad*2, height: b.h+pad*2,
      class: "dn-selbox", fill: "none", "stroke-width": 1.5/s,
      "stroke-dasharray": `${5/s} ${4/s}` }));

    if (!one) { positionSelBar(); return; }
    const it = one;

    /* จุดต่อเส้นรอบกล่อง — ลากออกมาเพื่อสร้างเส้นเชื่อมได้เลย */
    if (["r","e","t3","x","c","img"].includes(it.t)) {
      ANCHORS.forEach(([k, fx, fy]) => {
        layer.appendChild(el("circle", {
          cx: b.x + b.w*fx, cy: b.y + b.h*fy, r: 8/s,
          class: "dn-port", "data-port": k, "stroke-width": 2.2/s }));
      });
      /* มุมสี่มุมสำหรับปรับขนาด */
      const sz = 11/s;
      [["nw",0,0],["ne",1,0],["se",1,1],["sw",0,1]].forEach(([k,fx,fy]) => {
        layer.appendChild(el("rect", {
          x: b.x + b.w*fx - sz/2 + (fx ? pad : -pad), y: b.y + b.h*fy - sz/2 + (fy ? pad : -pad),
          width: sz, height: sz, class: "dn-handle", "data-handle": k }));
      });
      /* ที่จับหมุน */
      layer.appendChild(el("line", { x1: b.x+b.w/2, y1: b.y-pad, x2: b.x+b.w/2, y2: b.y-28/s,
        class: "dn-rotline", "stroke-width": 1.2/s }));
      layer.appendChild(el("circle", { cx: b.x+b.w/2, cy: b.y-30/s, r: 8/s,
        class: "dn-rot", "data-rot": "1", "stroke-width": 2/s }));
    }
    positionSelBar();
  }

  /* ---------- แถบปุ่มลอยเหนือสิ่งที่เลือก ---------- */
  function positionSelBar() {
    if (!selBar) return;
    const b = (mode === "edit") ? selectionBox() : null;
    if (!b || !sel.size) { selBar.hidden = true; hidePanels(); return; }
    const sr = stage.getBoundingClientRect();
    const p = toScreen(b.x + b.w/2, b.y);
    const x = p.x - sr.left, y = p.y - sr.top;
    if (x < -300 || x > sr.width + 300 || y < -300 || y > sr.height + 300) { selBar.hidden = true; return; }
    selBar.hidden = false;
    selBar.style.left = Math.max(10, Math.min(sr.width - 10, x)) + "px";
    selBar.style.top  = Math.max(6, y - 78/1) + "px";
    const one = sel.size === 1 ? byId(Array.from(sel)[0]) : null;
    const grouped = Array.from(sel).some(id => { const it = byId(id); return it && it.g; });
    selBar.querySelector('[data-act="group"]').hidden   = sel.size < 2 || grouped;
    selBar.querySelector('[data-act="ungroup"]').hidden = !grouped;
    selBar.querySelector('[data-act="rotate"]').hidden  = !one || !["r","e","t3","x","c","img"].includes(one.t);
    selBar.querySelector('[data-act="sizep"]').hidden   = !one || !["r","e","t3","x","c","img"].includes(one.t);
  }

  function hidePanels() {
    if (modPanel)  modPanel.hidden = true;
    if (sizePanel) sizePanel.hidden = true;
  }
  function placePanel(panel) {
    const sr = stage.getBoundingClientRect();
    panel.style.left = selBar.style.left;
    panel.style.top  = (parseFloat(selBar.style.top) + 46) + "px";
    /* ดันให้อยู่ในกรอบกระดานเสมอ ไม่ให้ตกขอบจนอ่านไม่ออก */
    requestAnimationFrame(() => {
      const w = panel.offsetWidth, h = panel.offsetHeight;
      const half = w / 2 + 8;
      let x = parseFloat(panel.style.left);
      x = Math.max(half, Math.min(sr.width - half, x));
      let y = parseFloat(panel.style.top);
      if (y + h > sr.height - 8) y = Math.max(8, sr.height - h - 8);
      if (y < 8) y = 8;
      panel.style.left = x + "px";
      panel.style.top  = y + "px";
    });
  }

  /* ---------- แผงปรับแต่งหน้าตาของวัตถุ ---------- */
  function openModify() {
    const it = sel.size === 1 ? byId(Array.from(sel)[0]) : null;
    if (!it) return;
    sizePanel.hidden = true;
    const isShape = ["r","e","t3"].includes(it.t);
    const isLine  = it.t === "l" || it.t === "n";
    const isText  = it.t === "x";
    const isCard  = it.t === "c";
    const sw = (label, field, cur, withNone) => `
      <div class="dn-mp-row"><span class="dn-mp-l">${label}</span>
        <div class="dn-mp-sw">
          ${withNone ? `<button class="dn-color none${cur === "none" ? " on" : ""}" data-set="${field}" data-val="none" title="โปร่งใส"></button>` : ""}
          ${PALETTE.map(c => `<button class="dn-color${c === "auto" ? " auto" : ""}${cur === c ? " on" : ""}"
             data-set="${field}" data-val="${c}" style="--c:${c === "auto" ? "currentColor" : c}"></button>`).join("")}
        </div></div>`;

    let h = "";
    if (!isText) h += sw("สีเส้น", "c", it.c);
    if (isShape || isCard) h += sw("สีพื้น", "f", it.f || "none", true);
    if (isText) h += sw("สีตัวอักษร", "c", it.c);
    if (isShape || isLine || it.t === "k") h += `
      <div class="dn-mp-row"><span class="dn-mp-l">แบบเส้น</span>
        <div class="dn-mp-seg">
          ${[[0,"ทึบ"],[1,"ประ"],[2,"จุด"]].map(([v,t]) =>
            `<button data-set="dash" data-val="${v}" class="${(it.dash||0)==v?"on":""}">${t}</button>`).join("")}
        </div></div>
      <div class="dn-mp-row"><span class="dn-mp-l">ความหนา</span>
        <input type="range" class="dn-mp-range" data-set="thick" min="1" max="20" step="1"
               value="${Math.round(isLine ? (it.w||2) : (it.sw||2))}">
        <span class="dn-mp-n">${Math.round(isLine ? (it.w||2) : (it.sw||2))}</span></div>`;
    if (isLine) h += `
      <div class="dn-mp-row"><span class="dn-mp-l">หัวลูกศร</span>
        <div class="dn-mp-seg">
          ${[["none","ไม่มี"],["end","ปลายเดียว"],["both","สองปลาย"]].map(([v,t]) =>
            `<button data-set="arrow" data-val="${v}" class="${(it.arrow||"none")===v?"on":""}">${t}</button>`).join("")}
        </div></div>
      <div class="dn-mp-row"><span class="dn-mp-l">รูปแบบ</span>
        <div class="dn-mp-seg">
          <button data-set="route" data-val="s" class="${it.route!=="e"?"on":""}">เส้นตรง ╲</button>
          <button data-set="route" data-val="e" class="${it.route==="e"?"on":""}">หักมุม ┐</button>
        </div></div>` +
      ((it.arrow && it.arrow !== "none") ? `
      <div class="dn-mp-row"><span class="dn-mp-l">ขนาดหัวลูกศร</span>
        <input type="range" class="dn-mp-range" data-set="ahead" min="1" max="${AHEAD.length}" step="1"
               value="${it.ah || 2}">
        <span class="dn-mp-n">${it.ah || 2}</span></div>` : "");
    if (isText) h += `
      <div class="dn-mp-row"><span class="dn-mp-l">ขนาดอักษร</span>
        <input type="range" class="dn-mp-range" data-set="fsize" min="10" max="80" step="1" value="${it.size||18}">
        <span class="dn-mp-n">${it.size||18}</span></div>
      <div class="dn-mp-row"><span class="dn-mp-l">ตัวหนา</span>
        <div class="dn-mp-seg">
          <button data-set="bold" data-val="0" class="${!it.bold?"on":""}">ปกติ</button>
          <button data-set="bold" data-val="1" class="${it.bold?"on":""}">หนา</button>
        </div></div>`;
    if (isCard || isShape || it.t === "img") h += `
      <div class="dn-mp-row"><span class="dn-mp-l">ข้อมูลละเอียด</span>
        <div class="dn-mp-seg">
          <button data-act="detail">${it.detail ? "✎ แก้คำอธิบาย" : "＋ เพิ่มคำอธิบาย"}</button>
        </div></div>`;
    modPanel.innerHTML = '<button class="dn-panel-x" data-act="closepanel">✕</button>' +
      (h || '<div class="dn-mp-row">ชิ้นนี้ยังไม่มีตัวเลือกให้ปรับ</div>');
    modPanel.dataset.for = it.id;
    modPanel.hidden = false;
    placePanel(modPanel);
  }

  function openSizePanel() {
    const it = sel.size === 1 ? byId(Array.from(sel)[0]) : null;
    if (!it) return;
    modPanel.hidden = true;
    const b = bboxOf(it);
    sizePanel.innerHTML = `
      <div class="dn-mp-row"><span class="dn-mp-l">กว้าง</span>
        <input type="number" class="dn-num" data-dim="w" value="${Math.round(b.w)}" min="10" max="6000">
        <span class="dn-mp-l">สูง</span>
        <input type="number" class="dn-num" data-dim="h" value="${Math.round(b.h)}" min="10" max="6000"
               ${it.t === "x" || it.t === "c" ? "disabled" : ""}>
      </div>
      <div class="dn-mp-row"><span class="dn-mp-l">องศา</span>
        <input type="range" class="dn-mp-range" data-dim="rot" min="-180" max="180" step="1" value="${it.rot||0}">
        <span class="dn-mp-n">${it.rot||0}°</span>
        <button class="dn-mp-reset" data-dim="reset">ตั้งตรง</button></div>`;
    sizePanel.innerHTML = '<button class="dn-panel-x" data-act="closepanel">✕</button>' + sizePanel.innerHTML;
    sizePanel.dataset.for = it.id;
    sizePanel.hidden = false;
    placePanel(sizePanel);
  }

  function applySet(field, val) {
    if (!sel.size) return;
    pushHistory();
    sel.forEach(id => {
      const it = byId(id); if (!it) return;
      switch (field) {
        case "c": it.c = val; break;
        case "f": it.f = val; break;
        case "dash": it.dash = +val; break;
        case "thick": if (it.t === "l" || it.t === "n" || it.t === "k") it.w = +val; else it.sw = +val; break;
        case "arrow": it.arrow = val; if (!it.ah) it.ah = 2; break;
        case "ahead": it.ah = +val; break;
        case "route": it.route = val; break;
        case "fsize": it.size = +val; break;
        case "bold": it.bold = val === "1"; break;
      }
    });
    render(); changed();
  }

  /* ============================================================
     เลือก / ย้าย / ลบ
     ============================================================ */
  function itemAt(cx, cy) {
    const els = document.elementsFromPoint(cx, cy);
    for (const e of els) {
      const h = e.closest ? e.closest("[data-id]") : null;
      if (h && h.dataset.id && byId(h.dataset.id)) return byId(h.dataset.id);
    }
    return null;
  }
  function selectItem(it, add) {
    if (!add) sel.clear();
    if (!it) { render(); return; }
    const ids = it.g ? doc.items.filter(i => i.g === it.g).map(i => i.id) : [it.id];
    ids.forEach(id => sel.add(id));
    render();
    /* ถ้าแผงเปิดค้างอยู่ ให้สลับไปแสดงตัวเลือกของชิ้นใหม่ทันที */
    if (modPanel && !modPanel.hidden) openModify();
    if (sizePanel && !sizePanel.hidden) openSizePanel();
  }
  function moveItem(it, dx, dy) {
    switch (it.t) {
      case "k": for (let i = 0; i < it.pts.length; i += 2) { it.pts[i] += dx; it.pts[i+1] += dy; } break;
      case "l": it.x1 += dx; it.y1 += dy; it.x2 += dx; it.y2 += dy; break;
      case "n": ["a","b"].forEach(k => { if (it[k] && !it[k].id) { it[k].x += dx; it[k].y += dy; } }); break;
      default:  it.x += dx; it.y += dy;
    }
  }
  /* ลบกล่องแล้วปล่อยปลายเส้นให้ค้างอยู่ที่เดิม ไม่ให้เส้นหายไปเฉย ๆ */
  function detachFrom(ids) {
    doc.items.forEach(it => {
      if (it.t !== "n") return;
      ["a","b"].forEach(k => {
        if (it[k] && it[k].id && ids.has(it[k].id)) {
          const old = byId(it[k].id);
          const c = old ? centerOf(old) : { x: 0, y: 0 };
          it[k] = { x: c.x, y: c.y };
        }
      });
    });
  }
  function removeIds(ids) {
    detachFrom(ids);
    doc.items = doc.items.filter(i => !ids.has(i.id));
  }
  function deleteSelection() {
    if (!sel.size) return;
    pushHistory(); removeIds(new Set(sel)); sel.clear(); render(); changed();
  }
  function groupSelection() {
    if (sel.size < 2) return;
    pushHistory();
    const gid = "g" + Math.random().toString(36).slice(2,8);
    doc.items.forEach(i => { if (sel.has(i.id)) i.g = gid; });
    render(); changed();
  }
  function ungroupSelection() {
    if (!sel.size) return;
    pushHistory();
    doc.items.forEach(i => { if (sel.has(i.id)) delete i.g; });
    render(); changed();
  }

  /* ---------- เส้นอัจฉริยะ: วาดจากกล่องไปกล่อง แล้วเกาะเอง ---------- */
  function smartLine(x1, y1, x2, y2, arrow) {
    const A = objectAtWorld(x1, y1), B = objectAtWorld(x2, y2);
    const common = { c: color, w: widthOf(sizeVal), dash: 0, rot: 0,
                     arrow: arrow ? "end" : "none", route: "s", ah: 2 };
    if (!A && !B) return Object.assign({ id: uid(), t: "l", x1, y1, x2, y2 }, common);
    return Object.assign({ id: uid(), t: "n",
             a: A ? { id: A.id } : { x: x1, y: y1 },
             b: (B && B !== A) ? { id: B.id } : { x: x2, y: y2 } }, common);
  }

  /* ============================================================
     เหตุการณ์
     ============================================================ */
  function effectiveTool(ev) {
    if (mode !== "edit") return "pan";
    if (spaceDown || ev.button === 1 || ev.button === 2) return "pan";
    if (ev.pointerType === "pen" && (tool === "select" || tool === "lasso")) return "pen";
    return tool;
  }

  function onPointerDown(ev) {
    if (!ev.target.closest) return;
    /* ปุ่มลอยและกล่องตั้งค่าอยู่เหนือกระดาน อย่าให้การกดปุ่มไปล้างสิ่งที่เลือกไว้ */
    if (ev.target.closest(".dn-selbar") || ev.target.closest(".dn-pop") ||
        ev.target.closest(".dn-panel")) return;
    if (ev.target.closest(".dn-info") ||
        (ev.target.closest && ev.target.closest("[data-info]"))) { ev.stopPropagation(); return; }
    /* คลิกในช่องพิมพ์ข้อความ = พิมพ์ (เฉพาะตอนใช้เครื่องมือเลือก)
       ถ้ากำลังถือปากกาหรือเครื่องมือเส้น ให้วาดทับได้ */
    if (ev.target.closest("[contenteditable='true']") && effectiveTool(ev) === "select") return;
    closePenPop();
    pointers.set(ev.pointerId, ev);
    if (pointers.size === 2) { startPinch(); return; }
    if (pointers.size > 2) return;
    try { stage.setPointerCapture(ev.pointerId); } catch (e) {}

    const w = toWorld(ev.clientX, ev.clientY);
    const t = effectiveTool(ev);

    /* ลากจากจุดต่อรอบกล่อง = สร้างเส้นเชื่อมใหม่ */
    const portNode = ev.target.closest("[data-port]");
    if (portNode && sel.size === 1) {
      const from = byId(Array.from(sel)[0]);
      if (from) {
        let c = { x: +portNode.getAttribute("cx"), y: +portNode.getAttribute("cy") };
        if (from.rot) {   // จุดต่อถูกวาดในกรอบที่หมุนแล้ว ต้องแปลงกลับเป็นพิกัดกระดาน
          const ob = bboxOf(from), cx = ob.x + ob.w/2, cy = ob.y + ob.h/2;
          const a = from.rot * Math.PI/180, co = Math.cos(a), si = Math.sin(a);
          const dx = c.x - cx, dy = c.y - cy;
          c = { x: cx + dx*co - dy*si, y: cy + dx*si + dy*co };
        }
        drag = { k: "newconn", fromItem: from, from: c, to: c }; drawOverlay(); return; }
    }
    /* ที่จับหมุน */
    if (ev.target.closest("[data-rot]") && sel.size === 1) {
      const it = byId(Array.from(sel)[0]);
      if (it) { pushHistory(); const b = bboxOf(it);
        drag = { k: "rotate", it, cx: b.x + b.w/2, cy: b.y + b.h/2, start: it.rot || 0,
                 a0: Math.atan2(w.y - (b.y + b.h/2), w.x - (b.x + b.w/2)) };
        return; }
    }
    /* จุดปลายเส้นเชื่อม */
    const epNode = ev.target.closest && ev.target.closest("[data-ep]");
    if (epNode && sel.size === 1) {
      const it = byId(Array.from(sel)[0]);
      if (it && (it.t === "n" || it.t === "l")) {
        pushHistory(); drag = { k: "ep", it, which: epNode.dataset.ep };
        drawOverlay(); return; }
    }

    if (t === "pan") { drag = { k: "pan", sx: ev.clientX, sy: ev.clientY, vx: view.x, vy: view.y }; return; }

    if (t === "pen") {
      pushHistory();
      const it = { id: uid(), t: "k", pts: [w.x, w.y], c: color, w: widthOf(sizeVal) };
      doc.items.push(it); drag = { k: "draw", it };
      holdAnchor = { x: ev.clientX, y: ev.clientY }; armHold();
      render(); return;
    }
    if (t === "eraser") { drag = { k: "erase" }; eraseAt(ev.clientX, ev.clientY); return; }

    if (t === "text" || t === "card") {
      pushHistory();
      const it = t === "text"
        ? { id: uid(), t: "x", x: w.x, y: w.y, w: 220, html: "", size: 18, c: color }
        : { id: uid(), t: "c", x: w.x, y: w.y, w: 240, title: "", body: "", c: color };
      doc.items.push(it); sel.clear(); sel.add(it.id);
      setTool("select"); render(); changed();
      setTimeout(() => { const n = htmlLayer.querySelector(`[data-id="${it.id}"] [contenteditable]`);
        if (n) n.focus(); }, 30);
      drag = null; return;
    }

    if (t === "rect" || t === "ellipse" || t === "line" || t === "arrow") {
      pushHistory();
      const it = (t === "line" || t === "arrow")
        ? { id: uid(), t: "l", x1: w.x, y1: w.y, x2: w.x, y2: w.y,
            c: color, w: widthOf(sizeVal), arrow: t === "arrow" ? "end" : "none",
            dash: 0, route: "s", rot: 0, ah: 2 }
        : { id: uid(), t: t === "rect" ? "r" : "e", x: w.x, y: w.y, w: 1, h: 1,
            c: color, f: fillColor, sw: 2, dash: 0, rot: 0 };
      doc.items.push(it); drag = { k: "shape", it, ox: w.x, oy: w.y };
      render(); return;
    }

    if (t === "lasso") { drag = { k: "marquee", ox: w.x, oy: w.y }; sel.clear(); render(); return; }

    /* เครื่องมือเลือก */
    const handle = ev.target.closest && ev.target.closest("[data-handle]");
    if (handle && sel.size === 1) {
      const it = byId(Array.from(sel)[0]);
      pushHistory();
      const lw = toLocal(it, w.x, w.y);
      drag = { k: "resize", it, corner: handle.dataset.handle,
               b0: Object.assign({}, bboxOf(it)), ox: lw.x, oy: lw.y };
      return;
    }
    const hit = itemAt(ev.clientX, ev.clientY);
    if (hit) {
      if (!sel.has(hit.id)) selectItem(hit, ev.shiftKey);
      pushHistory();
      drag = { k: "move", lx: w.x, ly: w.y, moved: false };
    } else {
      /* พื้นที่ว่าง = เลื่อนกระดาน (ทั้งเมาส์และนิ้ว) */
      sel.clear(); render();
      drag = { k: "pan", sx: ev.clientX, sy: ev.clientY, vx: view.x, vy: view.y };
    }
  }

  function onPointerMove(ev) {
    if (pointers.has(ev.pointerId)) pointers.set(ev.pointerId, ev);
    if (pointers.size === 2) { movePinch(); return; }
    if (!drag) return;
    const w = toWorld(ev.clientX, ev.clientY);

    switch (drag.k) {
      case "pan":
        view.x = drag.vx - (ev.clientX - drag.sx) / view.scale;
        view.y = drag.vy - (ev.clientY - drag.sy) / view.scale;
        applyView(); break;

      case "draw": {
        const p = drag.it.pts;
        if (dist(p[p.length-2], p[p.length-1], w.x, w.y) * view.scale < 1.2) break;
        p.push(w.x, w.y);
        const node = gItems.querySelector(`[data-id="${drag.it.id}"]`);
        if (node) node.querySelectorAll("path").forEach(pa => pa.setAttribute("d", pathFromPts(p)));
        if (!holdAnchor || dist(holdAnchor.x, holdAnchor.y, ev.clientX, ev.clientY) > HOLD_MOVE) {
          holdAnchor = { x: ev.clientX, y: ev.clientY }; armHold();
        }
        break;
      }
      case "erase": eraseAt(ev.clientX, ev.clientY); break;

      case "shape": {
        const it = drag.it;
        if (it.t === "l") { it.x2 = w.x; it.y2 = w.y; }
        else { it.x = Math.min(drag.ox, w.x); it.y = Math.min(drag.oy, w.y);
               it.w = Math.abs(w.x-drag.ox); it.h = Math.abs(w.y-drag.oy); }
        render(); break;
      }
      case "move": {
        const dx = w.x - drag.lx, dy = w.y - drag.ly;
        if (!dx && !dy) break;
        drag.moved = true;
        sel.forEach(id => { const it = byId(id); if (it) moveItem(it, dx, dy); });
        drag.lx = w.x; drag.ly = w.y; render(); break;
      }
      case "resize": {
        const it = drag.it, b = drag.b0, c = drag.corner || "se";
        const lw = toLocal(it, w.x, w.y);
        const dx = lw.x - drag.ox, dy = lw.y - drag.oy;
        const east = c.includes("e"), south = c.includes("s");
        let nx = b.x, ny = b.y, nw = b.w, nh = b.h;
        if (east) nw = b.w + dx; else { nw = b.w - dx; nx = b.x + dx; }
        if (south) nh = b.h + dy; else { nh = b.h - dy; ny = b.y + dy; }
        if (it.t === "x" || it.t === "c") {
          it.w = Math.max(80, nw); if (!east) it.x = nx;
        } else {
          if (nw >= 10) { it.w = nw; it.x = nx; }
          if (nh >= 10) { it.h = nh; it.y = ny; }
        }
        render(); break;
      }
      case "rotate": {
        const a = Math.atan2(w.y - drag.cy, w.x - drag.cx);
        let deg = drag.start + (a - drag.a0) * 180 / Math.PI;
        deg = Math.round(deg);
        if (Math.abs(deg % 15) < 4) deg = Math.round(deg / 15) * 15;   // สแนปทุก 15 องศา
        drag.it.rot = ((deg + 180) % 360 + 360) % 360 - 180;
        render(); break;
      }
      case "newconn": {
        drag.to = { x: w.x, y: w.y };
        drag.hover = objectAtWorld(w.x, w.y);
        render();
        if (drag.hover && drag.hover !== drag.fromItem) {
          const b = bboxOf(drag.hover);
          gOverlay.appendChild(el("rect", { x: b.x-4, y: b.y-4, width: b.w+8, height: b.h+8,
            class: "dn-target", "stroke-width": 2/view.scale }));
        }
        break;
      }
      case "ep": {
        if (drag.it.t === "l") {
          if (drag.which === "a") { drag.it.x1 = w.x; drag.it.y1 = w.y; }
          else                    { drag.it.x2 = w.x; drag.it.y2 = w.y; }
        } else {
          drag.it[drag.which] = { x: w.x, y: w.y };
        }
        drag.hover = objectAtWorld(w.x, w.y);
        render();
        if (drag.hover) {
          const b = bboxOf(drag.hover);
          gOverlay.appendChild(el("rect", { x: b.x-4, y: b.y-4, width: b.w+8, height: b.h+8,
            class: "dn-target", "stroke-width": 2/view.scale }));
        }
        break;
      }
      case "marquee": {
        drag.x = w.x; drag.y = w.y;
        drawOverlay(el("rect", { x: Math.min(drag.ox,w.x), y: Math.min(drag.oy,w.y),
          width: Math.abs(w.x-drag.ox), height: Math.abs(w.y-drag.oy),
          class: "dn-marquee", "stroke-width": 1.5/view.scale }));
        break;
      }
    }
  }

  function onPointerUp(ev) {
    pointers.delete(ev.pointerId);
    if (pinch && pointers.size < 2) pinch = null;
    if (!drag) return;
    clearHold();

    if (drag.k === "draw") {
      if (drag.it.pts.length < 4) doc.items = doc.items.filter(i => i.id !== drag.it.id);
      changed(); render();

    } else if (drag.k === "shape") {
      const it = drag.it;
      if (it.t === "l") {
        if (dist(it.x1,it.y1,it.x2,it.y2) < 8) doc.items = doc.items.filter(i => i.id !== it.id);
        else {
          const sm = smartLine(it.x1, it.y1, it.x2, it.y2, it.arrow);
          const i = doc.items.findIndex(x => x.id === it.id);
          doc.items.splice(i, 1, sm); sel.clear(); sel.add(sm.id);
        }
      } else {
        const b = bboxOf(it);
        if (b.w < 6 && b.h < 6) doc.items = doc.items.filter(i => i.id !== it.id);
        else { sel.clear(); sel.add(it.id); }
      }
      setTool("select"); render(); changed();

    } else if (drag.k === "newconn") {
      const w = toWorld(ev.clientX, ev.clientY);
      if (dist(drag.from.x, drag.from.y, w.x, w.y) > 12) {
        const target = objectAtWorld(w.x, w.y);
        pushHistory();
        const c = { id: uid(), t: "n", a: { id: drag.fromItem.id },
                    b: (target && target !== drag.fromItem) ? { id: target.id } : { x: w.x, y: w.y },
                    c: color, w: widthOf(sizeVal), arrow: "end", route: "s", ah: 2, dash: 0 };
        doc.items.push(c); sel.clear(); sel.add(c.id); changed();
      }
      render();

    } else if (drag.k === "rotate") {
      changed(); render();

    } else if (drag.k === "ep") {
      const w = toWorld(ev.clientX, ev.clientY);
      const target = objectAtWorld(w.x, w.y);
      const it = drag.it;
      if (it.t === "l") {
        /* เส้นลอย: ถ้าลากปลายไปวางบนกล่อง ให้กลายเป็นเส้นเชื่อมที่เกาะกล่องนั้น */
        if (target) {
          const other = drag.which === "a" ? { x: it.x2, y: it.y2 } : { x: it.x1, y: it.y1 };
          const otherObj = objectAtWorld(other.x, other.y);
          const conv = { id: it.id, t: "n",
            a: drag.which === "a" ? { id: target.id } : (otherObj ? { id: otherObj.id } : other),
            b: drag.which === "b" ? { id: target.id } : (otherObj ? { id: otherObj.id } : other),
            c: it.c, w: it.w, dash: it.dash || 0, arrow: it.arrow || "none",
            route: it.route || "s", ah: it.ah || 2 };
          const i = doc.items.findIndex(x => x.id === it.id);
          doc.items.splice(i, 1, conv);
          sel.clear(); sel.add(conv.id);
        }
      } else {
        it[drag.which] = target ? { id: target.id } : { x: w.x, y: w.y };
      }
      render(); changed();

    } else if (drag.k === "marquee") {
      const x0 = Math.min(drag.ox, drag.x ?? drag.ox), x1 = Math.max(drag.ox, drag.x ?? drag.ox);
      const y0 = Math.min(drag.oy, drag.y ?? drag.oy), y1 = Math.max(drag.oy, drag.y ?? drag.oy);
      sel.clear();
      doc.items.forEach(it => { const b = bboxOf(it); if (!b) return;
        if (b.x >= x0 && b.y >= y0 && b.x+b.w <= x1 && b.y+b.h <= y1) sel.add(it.id); });
      setTool("select"); render();

    } else if (drag.k === "move") {
      if (drag.moved) changed(); else undoStack.pop();
      /* แตะสองครั้งบนวัตถุ = เปิดแผงปรับแต่ง
         หน้าต่างเวลา 45–330 มิลลิวินาที และต้องกดจุดเดิม ไม่งั้นไม่นับ */
      if (!drag.moved) {
        const now = performance.now();
        const it = itemAt(ev.clientX, ev.clientY);
        const gap = now - lastTap.t;
        if (it && lastTap.id === it.id && gap > 45 && gap < 330 &&
            Math.hypot(ev.clientX - lastTap.x, ev.clientY - lastTap.y) < 11) {
          lastTap = { t: 0, x: 0, y: 0, id: null };
          selectItem(it, false); openModify();
        } else if (it) {
          lastTap = { t: now, x: ev.clientX, y: ev.clientY, id: it.id };
        }
      }
      render();
    } else if (drag.k === "resize") { changed(); render(); }
      else if (drag.k === "erase")  { render(); }
    drag = null;
  }

  function eraseAt(cx, cy) {
    const it = itemAt(cx, cy); if (!it) return;
    if (!drag.erased) { pushHistory(); drag.erased = true; }
    removeIds(new Set([it.id])); render(); changed();
  }

  /* ---------- ค้างปากกาเพื่อแปลงรูปทรง ---------- */
  function armHold() {
    clearHold();
    holdTimer = setTimeout(() => {
      if (!drag || drag.k !== "draw") return;
      const shape = recognize(drag.it.pts);
      if (!shape) return;
      let final = shape;
      if (shape.t === "l") final = smartLine(shape.x1, shape.y1, shape.x2, shape.y2, false);
      else final.id = uid();
      const i = doc.items.findIndex(x => x.id === drag.it.id);
      if (i >= 0) doc.items.splice(i, 1, final);
      drag = { k: "snapped" };
      sel.clear(); sel.add(final.id);
      render(); changed(); flash(final.id);
      if (navigator.vibrate) { try { navigator.vibrate(12); } catch (e) {} }
    }, HOLD_MS);
  }
  const clearHold = () => { if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; } };
  function flash(id) {
    const n = gItems.querySelector(`[data-id="${id}"]`); if (!n) return;
    n.classList.add("dn-snap"); setTimeout(() => n.classList.remove("dn-snap"), 400);
  }

  /* ---------- สองนิ้ว ---------- */
  function startPinch() {
    const [a, b] = Array.from(pointers.values());
    pinch = { d: dist(a.clientX,a.clientY,b.clientX,b.clientY),
              cx: (a.clientX+b.clientX)/2, cy: (a.clientY+b.clientY)/2,
              vx: view.x, vy: view.y, s: view.scale };
    drag = null; clearHold();
  }
  function movePinch() {
    if (!pinch) return;
    const [a, b] = Array.from(pointers.values());
    const d = dist(a.clientX,a.clientY,b.clientX,b.clientY);
    const cx = (a.clientX+b.clientX)/2, cy = (a.clientY+b.clientY)/2;
    const r = stage.getBoundingClientRect();
    const ns = Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinch.s * (d / (pinch.d || 1))));
    const wx = (pinch.cx - r.left)/pinch.s + pinch.vx, wy = (pinch.cy - r.top)/pinch.s + pinch.vy;
    view.scale = ns;
    view.x = wx - (cx - r.left)/ns; view.y = wy - (cy - r.top)/ns;
    applyView();
  }

  function onWheel(ev) {
    ev.preventDefault();
    if (ev.ctrlKey || ev.metaKey) { zoomAt(ev.clientX, ev.clientY, ev.deltaY < 0 ? 1.12 : 1/1.12); return; }
    if (ev.shiftKey) { view.x += (ev.deltaY || ev.deltaX) / view.scale; applyView(); return; }
    view.x += ev.deltaX / view.scale;
    view.y += ev.deltaY / view.scale;
    applyView();
  }

  /* ============================================================
     ไอคอน (วาดเอง ไม่ใช้อีโมจิ จะได้ดูออกว่าปุ่มไหนคืออะไร)
     ============================================================ */
  const I = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  const ICON = {
    select:  I('<path d="M5.5 3.2l13 7.5-5.6 1.5-2.3 5.4z" fill="currentColor" stroke="none"/>'),
    pen:     I('<path d="M4 20l1-3.6L15.4 6a1.8 1.8 0 012.5 0l.6.6a1.8 1.8 0 010 2.5L8.1 19.3 4 20z"/><path d="M14.2 7.3l2.9 2.9"/>'),
    eraser:  I('<path d="M9 20h10"/><path d="M4.6 15.6l7.7-7.7a2 2 0 012.8 0l3.4 3.4a2 2 0 010 2.8L13.8 19H8.9l-4.3-4.3z"/><path d="M10.2 9.7l5.6 5.6"/>'),
    text:    I('<path d="M5 6.5V5h14v1.5"/><path d="M12 5v14"/><path d="M9.5 19h5"/>'),
    card:    I('<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M7 10h6.5"/><path d="M7 13.5h9"/>'),
    rect:    I('<rect x="4" y="6" width="16" height="12" rx="2"/>'),
    ellipse: I('<ellipse cx="12" cy="12" rx="8" ry="7"/>'),
    line:    I('<path d="M4.5 19.5L19.5 4.5"/>'),
    arrow:   I('<path d="M4.5 19.5L19.5 4.5"/><path d="M13.5 4.5h6v6"/>'),
    image:   I('<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.6"/><path d="M4 17l4.5-4.5 3 3L15 11l5 5"/>'),
    lasso:   I('<rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke-dasharray="3.2 2.6"/><path d="M9 12h6M12 9v6"/>'),
    pan:     I('<path d="M8.5 12.5V5.6a1.6 1.6 0 013.2 0v5.4"/><path d="M11.7 11V5a1.6 1.6 0 013.2 0v6"/><path d="M14.9 11.6V7.6a1.6 1.6 0 113.2 0v7.9a5 5 0 01-5 5h-1.3a5 5 0 01-4.3-2.5l-2-3.4a1.7 1.7 0 012.8-1.9l1.4 1.9"/>')
  };

  const TOOLS = [
    { k: "select",  label: "เลือก / ย้าย / เลื่อนกระดาน" },
    { k: "pen",     label: "ปากกา (กดซ้ำอีกครั้งเพื่อเลือกสีและขนาด)" },
    { k: "eraser",  label: "ยางลบ" },
    { k: "lasso",   label: "ลากคลุมเพื่อเลือกหลายชิ้น" },
    { k: "text",    label: "ข้อความ" },
    { k: "card",    label: "การ์ด" },
    { k: "rect",    label: "สี่เหลี่ยม" },
    { k: "ellipse", label: "วงกลม" },
    { k: "arrow",   label: "เส้น/ลูกศร (ลากจากกล่องหนึ่งไปอีกกล่อง แล้วมันจะเกาะให้เอง)" },
    { k: "image",   label: "แนบรูปจากเครื่อง" },
    { k: "pan",     label: "เลื่อนกระดาน" }
  ];

  function setTool(k) {
    const same = tool === k;
    tool = k;
    root.querySelectorAll(".dn-tool").forEach(b => b.classList.toggle("on", b.dataset.tool === k));
    stage.dataset.tool = k;
    return same;
  }

  /* ---------- กล่องเลือกสีและขนาดเส้น ---------- */
  function openPenPop() {
    penPop.hidden = false;
    penPop.querySelectorAll(".dn-color").forEach(b => b.classList.toggle("on", b.dataset.color === color));
    penPop.querySelector(".dn-size").value = sizeVal;
    updateSizePreview();
  }
  const closePenPop = () => { if (penPop) penPop.hidden = true; };
  function updateSizePreview() {
    const w = widthOf(sizeVal);
    const dot = penPop.querySelector(".dn-size-dot");
    const num = penPop.querySelector(".dn-size-num");
    const d = Math.max(3, Math.min(40, w));
    dot.style.width = d + "px"; dot.style.height = d + "px";
    dot.style.background = paint(color);
    num.textContent = sizeVal;
  }
  function applyColorToSelection() {
    if (!sel.size) return;
    pushHistory();
    sel.forEach(id => { const it = byId(id); if (!it) return;
      it.c = color; if ("f" in it) it.f = FILLS[color] || "none"; });
    render(); changed();
  }

  /* ============================================================
     รูปภาพ
     ============================================================ */
  function pickImage() {
    if (!fileInput) return;
    fileInput.value = "";
    fileInput.click();
  }

  async function addImageFile(file) {
    if (!file) return;
    try {
      const { src, w, h } = await shrinkImageFile(file, IMG_MAX, IMG_Q);
      const r = stage.getBoundingClientRect();
      const c = toWorld(r.left + r.width/2, r.top + r.height/2);
      const maxW = 420;
      const k = Math.min(1, maxW / w);
      pushHistory();
      const it = { id: uid(), t: "img", src, x: c.x - w*k/2, y: c.y - h*k/2,
                   w: w*k, h: h*k, rot: 0 };
      doc.items.push(it);
      sel.clear(); sel.add(it.id);
      setTool("select"); render(); changed();
      const kb = Math.round(src.length * 0.75 / 1024);
      if (kb > 900) toast("รูปนี้ใหญ่ราว " + kb + " KB — ถ้าแนบรูปเยอะมากอาจเก็บไม่หมด");
    } catch (e) { toast("แนบรูปไม่สำเร็จ: " + e.message); }
  }

  function toast(msg) {
    let t = root.querySelector(".dn-toast");
    if (!t) { t = document.createElement("div"); t.className = "dn-toast"; stage.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(t._h); t._h = setTimeout(() => { t.hidden = true; }, 4200);
  }

  /* ============================================================
     สร้างหน้าตา
     ============================================================ */
  function buildUI() {
    root = document.createElement("div");
    root.className = "dn-root";
    root.innerHTML = `
      <div class="dn-bar">
        <button class="dn-btn dn-exit" data-act="exit" title="กลับไปโน้ตปกติ">📝 โน้ตปกติ</button>
        <div class="dn-tools">
          ${TOOLS.map(t => `<button class="dn-tool" data-tool="${t.k}" title="${t.label}">${ICON[t.k]}</button>`).join("")}
        </div>
        <button class="dn-swatch" data-act="pen-settings" title="สีและขนาดเส้น"><span></span></button>
        <div class="dn-sep"></div>
        <button class="dn-btn" data-act="undo" title="ย้อนกลับ (Ctrl+Z)">↶</button>
        <button class="dn-btn" data-act="redo" title="ไปข้างหน้า (Ctrl+Shift+Z)">↷</button>
        <div class="dn-grow"></div>
        <button class="dn-btn dn-mode" data-act="mode">โหมดดู</button>
      </div>

      <div class="dn-pop" id="dnPenPop" hidden>
        <div class="dn-pop-row">
          ${PALETTE.map(c => `<button class="dn-color${c === "auto" ? " auto" : ""}" data-color="${c}"
              style="--c:${c === "auto" ? "currentColor" : c}"></button>`).join("")}
        </div>
        <div class="dn-pop-row dn-fill-row">
          <span class="dn-size-label">สีพื้น</span>
          <button class="dn-color none on" data-fill="none" title="โปร่งใส"></button>
          ${PALETTE.filter(c => c !== "auto").map(c => `<button class="dn-color" data-fill="${c}" style="--c:${c}"></button>`).join("")}
        </div>
        <div class="dn-pop-row dn-size-row">
          <span class="dn-size-label">ขนาด</span>
          <input type="range" class="dn-size" min="1" max="100" step="1" value="7">
          <span class="dn-size-num">7</span>
          <span class="dn-size-preview"><span class="dn-size-dot"></span></span>
        </div>
      </div>

      <input type="file" id="dnFile" accept="image/*" hidden>
      <div class="dn-stage" data-tool="select">
        <svg class="dn-svg">
          <defs>
            ${[["l","#1d1c1a"],["d","#ecebe7"]].map(([k,col]) => AHEAD.map((sz,i) => `
            <marker id="dn-ar-${k}-${i+1}" viewBox="0 0 10 10" refX="8.5" refY="5"
                    markerWidth="${sz}" markerHeight="${sz}" markerUnits="userSpaceOnUse"
                    orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${col}"/></marker>`).join("")).join("")}
          </defs>
          <g class="dn-world"><g class="dn-items"></g><g class="dn-overlay"></g></g>
        </svg>
        <div class="dn-html"></div>
        <div class="dn-selbar" id="dnSelBar" hidden>
          <button data-act="modify">ปรับแต่ง</button>
          <button data-act="rotate">หมุน</button>
          <button data-act="sizep">ขนาด</button>
          <button data-act="group">จัดกลุ่ม</button>
          <button data-act="ungroup">แยกกลุ่ม</button>
          <button data-act="del" class="danger">ลบ</button>
        </div>
        <div class="dn-textbar" id="dnTextBar" hidden>
          ${PALETTE.map(c => `<button class="dn-color${c === "auto" ? " auto" : ""}" data-tcolor="${c}"
              style="--c:${c === "auto" ? "currentColor" : c}"></button>`).join("")}
          <span class="dn-tb-sep"></span>
          <button class="dn-tb" data-tsize="down" title="ตัวเล็กลง">A−</button>
          <button class="dn-tb" data-tsize="up" title="ตัวใหญ่ขึ้น">A+</button>
          <button class="dn-tb" data-tbold="1" title="ตัวหนา"><b>B</b></button>
          <button class="dn-tb" data-tmark="1" title="ปากกาเน้น">🖍</button>
          <button class="dn-tb" data-tclear="1" title="ล้างรูปแบบ">✕</button>
        </div>
        <div class="dn-panel" id="dnModPanel" hidden></div>
        <div class="dn-panel" id="dnSizePanel" hidden></div>
        <div class="dn-hint" id="dnHint">
          เขียนด้วยปากกาได้เลย · วาดรูปแล้ว<b>ค้างไว้แป๊บนึง</b>จะกลายเป็นรูปทรงสวย ๆ<br>
          ลากเส้นจากกล่องหนึ่งไปอีกกล่อง เส้นจะเกาะให้เอง
        </div>
      </div>

      <div class="dn-foot">
        <button class="dn-btn" data-act="zoomout">−</button>
        <span class="dn-zoom-val">100%</span>
        <button class="dn-btn" data-act="zoomin">+</button>
        <button class="dn-btn" data-act="fit">พอดีจอ</button>
        <button class="dn-btn" data-act="find" title="ค้นหาหัวข้อ">🔍 ค้นหา</button>
        <div class="dn-grow"></div>
        <button class="dn-btn dn-test" data-act="mock">ทดลองทำข้อสอบ</button>
      </div>`;

    host.appendChild(root);
    stage     = root.querySelector(".dn-stage");
    gWorld    = root.querySelector(".dn-world");
    gItems    = root.querySelector(".dn-items");
    gOverlay  = root.querySelector(".dn-overlay");
    htmlLayer = root.querySelector(".dn-html");
    selBar    = root.querySelector("#dnSelBar");
    penPop    = root.querySelector("#dnPenPop");
    modPanel  = root.querySelector("#dnModPanel");
    textBar   = root.querySelector("#dnTextBar");
    sizePanel = root.querySelector("#dnSizePanel");
    fileInput = root.querySelector("#dnFile");

    root.addEventListener("click", (e) => {
      const info = e.target.closest("[data-info]");
      if (info) { e.preventDefault(); e.stopPropagation();
                  openDetailFor(info.getAttribute("data-info")); return; }
      const t = e.target.closest(".dn-tool");
      if (t) {
        if (t.dataset.tool === "image") { pickImage(); return; }
        const again = setTool(t.dataset.tool);
        if (t.dataset.tool === "pen" && again) openPenPop(); else closePenPop();
        return;
      }
      const setBtn = e.target.closest("#dnModPanel button[data-set]");
      if (setBtn) { applySet(setBtn.dataset.set, setBtn.dataset.val); openModify(); return; }
      const fillBtn = e.target.closest("[data-fill]");
      if (fillBtn) { fillColor = fillBtn.dataset.fill;
        penPop.querySelectorAll("[data-fill]").forEach(b => b.classList.toggle("on", b === fillBtn));
        if (sel.size) applySet("f", fillColor);
        return; }
      const c = e.target.closest(".dn-pop .dn-color[data-color]");
      if (c) { color = c.dataset.color;
        penPop.querySelectorAll(".dn-color").forEach(b => b.classList.toggle("on", b === c));
        updateSwatch(); updateSizePreview(); applyColorToSelection(); return; }
      const a = e.target.closest("[data-act]"); if (!a) return;
      switch (a.dataset.act) {
        case "pen-settings": penPop.hidden ? openPenPop() : closePenPop(); break;
        case "undo": undo(); break;
        case "redo": redo(); break;
        case "group": groupSelection(); break;
        case "ungroup": ungroupSelection(); break;
        case "del": deleteSelection(); break;
        case "zoomin":  { const r = stage.getBoundingClientRect(); zoomAt(r.left+r.width/2, r.top+r.height/2, 1.2); break; }
        case "zoomout": { const r = stage.getBoundingClientRect(); zoomAt(r.left+r.width/2, r.top+r.height/2, 1/1.2); break; }
        case "fit": fitToContent(); break;
        case "closepanel": hidePanels(); break;
        case "modify": openModify(); break;   /* ปิดด้วยปุ่ม ✕ ในแผง */
        case "sizep":  openSizePanel(); break;
        case "rotate": {
          if (sel.size !== 1) break;
          const it = byId(Array.from(sel)[0]); if (!it) break;
          pushHistory();
          it.rot = (((it.rot || 0) + 90 + 180) % 360 + 360) % 360 - 180;
          render(); changed(); break;
        }
        case "detail": {
          if (sel.size !== 1) break;
          openDetailFor(Array.from(sel)[0], true); break;
        }
        case "find": onFind(); break;
        case "mode": setMode(mode === "edit" ? "view" : "edit"); break;
        case "mock": onMockTest(); break;
        case "exit": onExit(); break;
      }
    });
    /* แถบเลื่อนในแผงปรับแต่ง / แผงขนาด */
    root.addEventListener("input", (e) => {
      const r = e.target.closest("#dnModPanel [data-set]");
      if (r) { applySet(r.dataset.set, r.value);
        const n = r.parentElement.querySelector(".dn-mp-n"); if (n) n.textContent = r.value; return; }
      const d = e.target.closest("#dnSizePanel [data-dim]");
      if (d && sel.size === 1) {
        const it = byId(Array.from(sel)[0]); if (!it) return;
        if (d.dataset.dim === "rot") { it.rot = +d.value;
          const n = d.parentElement.querySelector(".dn-mp-n"); if (n) n.textContent = d.value + "°"; }
        else if (d.dataset.dim === "w") it.w = Math.max(10, +d.value);
        else if (d.dataset.dim === "h") it.h = Math.max(10, +d.value);
        render(); changed();
      }
    });
    sizePanel.addEventListener("click", (e) => {
      if (e.target.dataset.dim === "reset" && sel.size === 1) {
        const it = byId(Array.from(sel)[0]); if (!it) return;
        pushHistory(); it.rot = 0; render(); changed(); openSizePanel();
      }
    });
    fileInput.addEventListener("change", (e) => { addImageFile(e.target.files[0]); });

    /* แถบจัดรูปแบบข้อความบางส่วน */
    textBar.addEventListener("mousedown", (e) => e.preventDefault());
    textBar.addEventListener("pointerdown", (e) => e.stopPropagation());
    textBar.addEventListener("click", (e) => {
      const c = e.target.closest("[data-tcolor]");
      if (c) { styleSelection({ color: c.dataset.tcolor === "auto" ? ink() : c.dataset.tcolor }); return; }
      const z = e.target.closest("[data-tsize]");
      if (z) { bumpSelectionSize(z.dataset.tsize === "up" ? 1.25 : 0.8); return; }
      if (e.target.closest("[data-tbold]")) { styleSelection({ fontWeight: "700" }); return; }
      if (e.target.closest("[data-tmark]")) { styleSelection({ backgroundColor: "#ffe58a", color: "#1d1c1a" }); return; }
      if (e.target.closest("[data-tclear]")) { clearSelectionStyle(); textBar.hidden = true; return; }
    });
    document.addEventListener("selectionchange", onSelectionChange);

    root.querySelector(".dn-size").addEventListener("input", (e) => {
      sizeVal = +e.target.value; updateSizePreview();
      if (sel.size) { sel.forEach(id => { const it = byId(id);
        if (it && (it.t === "k" || it.t === "l" || it.t === "n")) it.w = widthOf(sizeVal); });
        render(); changed(); }
    });
    root.querySelector('.dn-tool[data-tool="pen"]')
        .addEventListener("dblclick", (e) => { e.preventDefault(); openPenPop(); });

    outsideClose = (e) => {
      if (!penPop || penPop.hidden) return;
      if (e.target.closest && (e.target.closest("#dnPenPop") || e.target.closest(".dn-panel") ||
          e.target.closest('.dn-tool[data-tool="pen"]') ||
          e.target.closest('[data-act="pen-settings"]'))) return;
      closePenPop();
      e.stopPropagation(); e.preventDefault();   // คลิกแรกใช้ปิดกล่อง ไม่ให้ไปวาดโดนกระดาน
    };
    document.addEventListener("pointerdown", outsideClose, true);

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("contextmenu", e => e.preventDefault());

    htmlLayer.addEventListener("input", (e) => {
      const f = e.target.dataset.f; if (!f) return;
      const it = byId(e.target.closest("[data-id]").dataset.id); if (!it) return;
      it[f] = e.target.innerHTML; changed();
    });
    htmlLayer.addEventListener("pointerdown", (e) => {
      /* ถ้ากำลังใช้เครื่องมืออื่น (ปากกา เส้น ยางลบ ฯลฯ) ให้ปล่อยผ่านไปที่กระดาน
         จะได้วาดทับการ์ดหรือลากเส้นออกจากการ์ดได้ */
      const t = effectiveTool(e);
      if (t !== "select") return;
      /* ปุ่ม "ข้อมูลแบบละเอียด" ในการ์ด ต้องปล่อยให้เกิด click ตามปกติ
         ถ้าเลือกวัตถุตรงนี้จะ render() ใหม่ ปุ่มเดิมหายไปก่อน click จะยิง */
      if (e.target.closest(".dn-info") || e.target.closest("[data-info]")) return;
      const holder = e.target.closest("[data-id]"); if (!holder) return;
      const it = byId(holder.dataset.id); if (!it || mode !== "edit") return;
      if (e.target.closest("[contenteditable='true']") && sel.has(it.id)) return;
      e.stopPropagation(); closePenPop();
      selectItem(it, e.shiftKey); pushHistory();
      const w = toWorld(e.clientX, e.clientY);
      drag = { k: "move", lx: w.x, ly: w.y, moved: false };
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    });

    setTool("select");   /* เปิดกระดานมาให้ "เลือก/ย้าย" เป็นค่าเริ่มต้น
                            จะได้ลากการ์ดและรูปทรงได้ทันทีโดยไม่เผลอวาดทับ */
    updateSwatch();
    refreshHistoryButtons();
  }

  function updateSwatch() {
    const s = root.querySelector(".dn-swatch span");
    if (s) s.style.background = paint(color);
  }

  /* ---------- แถบจัดรูปแบบข้อความที่ลากเลือก ---------- */
  function baseFontSize(node) {
    const ed = node.closest ? node.closest("[contenteditable='true']") : null;
    return ed ? parseFloat(getComputedStyle(ed).fontSize) || 18 : 18;
  }
  function bumpSelectionSize(k) {
    const s = window.getSelection();
    if (!s || !s.rangeCount || s.isCollapsed) return;
    const n = s.anchorNode && (s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentElement);
    if (!n) return;
    const cur = parseFloat(getComputedStyle(n).fontSize) || baseFontSize(n);
    const next = Math.max(9, Math.min(90, Math.round(cur * k)));
    styleSelection({ fontSize: next + "px", lineHeight: "1.5" });
  }
  function onSelectionChange() {
    if (!textBar || !root || !root.isConnected) return;
    const s = window.getSelection();
    if (!s || s.isCollapsed || !s.rangeCount) { textBar.hidden = true; return; }
    const n = s.anchorNode && (s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentElement);
    if (!n || !n.closest || !n.closest(".dn-html [contenteditable='true']")) { textBar.hidden = true; return; }
    const r = s.getRangeAt(0).getBoundingClientRect();
    if (!r.width) { textBar.hidden = true; return; }
    const sr = stage.getBoundingClientRect();
    textBar.hidden = false;
    const w = textBar.offsetWidth || 300;
    let x = r.left + r.width/2 - sr.left;
    x = Math.max(w/2 + 6, Math.min(sr.width - w/2 - 6, x));
    textBar.style.left = x + "px";
    textBar.style.top = Math.max(6, r.top - sr.top - 46) + "px";
  }

  /* ---------- แป้นพิมพ์ ---------- */
  function onKey(e) {
    if (!root || !root.isConnected) return;
    /* ถ้ากำลังพิมพ์อยู่ในช่องกรอก (เช่น แถบค้นหา) หรือในกล่องข้อความบนกระดาน
       ต้องปล่อยให้คีย์บอร์ดทำงานตามปกติ ไม่งั้น Backspace/Delete จะถูกยึดไปลบวัตถุแทน */
    const t = e.target;
    if (t && t.closest) {
      if (t.closest("[contenteditable='true']")) return;
      if (t.closest("input, textarea, select")) return;
      if (t.closest(".find-panel, .dt-back, .qz-back")) return;
    }
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || ""))) return;
    if (e.code === "Space") { spaceDown = e.type === "keydown"; return; }
    if (e.type !== "keydown") return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
      e.preventDefault(); e.shiftKey ? ungroupSelection() : groupSelection(); return; }
    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); deleteSelection(); return; }
    if (e.key === "Escape") { sel.clear(); closePenPop(); render(); return; }
    const PAN = 90 / view.scale;
    if (e.key === "ArrowLeft")  { view.x -= PAN; applyView(); e.preventDefault(); return; }
    if (e.key === "ArrowRight") { view.x += PAN; applyView(); e.preventDefault(); return; }
    if (e.key === "ArrowUp")    { view.y -= PAN; applyView(); e.preventDefault(); return; }
    if (e.key === "ArrowDown")  { view.y += PAN; applyView(); e.preventDefault(); return; }
    const map = { v:"select", p:"pen", e:"eraser", s:"lasso", t:"text", c:"card",
                  r:"rect", o:"ellipse", a:"arrow", h:"pan" };
    if (!e.ctrlKey && !e.metaKey && map[e.key.toLowerCase()]) setTool(map[e.key.toLowerCase()]);
  }

  function setMode(m) {
    mode = m;
    const b = root.querySelector(".dn-mode");
    if (b) b.textContent = m === "edit" ? "โหมดดู" : "โหมดแก้ไข";
    root.classList.toggle("viewmode", m === "view");
    if (m === "view") { sel.clear(); closePenPop(); }
    render();
  }

  /* ============================================================
     ภายนอกเรียกใช้
     ============================================================ */
  function mount(hostEl, opts) {
    destroy();
    host = hostEl;
    onChange   = (opts && opts.onChange)   || (() => {});
    onMockTest = (opts && opts.onMockTest) || (() => {});
    onExit     = (opts && opts.onExit)     || (() => {});
    onFind     = (opts && opts.onFind)     || (() => {});
    buildUI();
    document.addEventListener("keydown", onKey);
    document.addEventListener("keyup", onKey);
  }

  /* แปลงข้อมูลรุ่นเก่าให้เข้ากับรุ่นใหม่ โดยไม่ทำของเดิมหาย */
  function migrate(items) {
    return items.map(i => {
      if (!i.id) i.id = uid();
      if (i.c === "#1d1c1a") i.c = "auto";              // หมึกดำเดิม -> ตามธีม
      if (i.t === "n" && i.from) {                       // เส้นเชื่อมรุ่นเก่า
        i.a = { id: i.from }; i.b = { id: i.to };
        i.arrow = i.a !== false; delete i.from; delete i.to;
      }
      if (i.t === "l" && typeof i.a === "boolean") { i.arrow = i.a; delete i.a; }
      if (typeof i.arrow === "boolean") i.arrow = i.arrow ? "end" : "none";
      if ((i.t === "n" || i.t === "l") && i.arrow === undefined) i.arrow = "end";
      if (!i.route) i.route = "s";
      if ((i.t === "n" || i.t === "l") && !i.ah) i.ah = 2;
      if (i.dash === undefined) i.dash = 0;
      if (i.rot === undefined) i.rot = 0;
      return i;
    }).filter(i => i.t !== "n" || (i.a && i.b));
  }

  function setDoc(d) {
    doc = { v: 3, items: (d && Array.isArray(d.items)) ? migrate(d.items) : [] };
    undoStack = []; redoStack = []; sel.clear();
    view = (d && d.view) ? Object.assign({}, d.view) : { x: -40, y: -40, scale: 1 };
    applyView(); render(); refreshHistoryButtons();
    // การ์ด/ข้อความสูงเท่าไรต้องรอให้ DOM วาดเสร็จก่อน แล้วค่อยลากเส้นเชื่อมใหม่ให้ตรงขอบ
    requestAnimationFrame(() => { if (root && root.isConnected) render(); });
  }
  const getDoc = () => ({ v: 3, items: doc.items, view });
  function destroy() {
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("keyup", onKey);
    if (outsideClose) { document.removeEventListener("pointerdown", outsideClose, true); outsideClose = null; }
    document.removeEventListener("selectionchange", onSelectionChange);
    if (root && root.parentNode) root.parentNode.removeChild(root);
    root = null; sel.clear(); pointers.clear(); drag = null; clearHold();
  }
  /* ---------- ป๊อปอัป "ข้อมูลแบบละเอียด" ---------- */
  function openDetailFor(id, startEmpty) {
    const it = byId(id); if (!it) return;
    const head = it.t === "c" ? stripTags(it.title || "") : (it.label || "");
    Detail.open({
      title: head || "ข้อมูลแบบละเอียด",
      sub: it.t === "c" ? stripTags(it.body || "").slice(0, 90) : "",
      html: it.detail || (startEmpty ? "<p></p>" : ""),
      onSave: (html) => { pushHistory(); it.detail = html; render(); changed(); }
    });
  }
  function stripTags(h) {
    const d = document.createElement("div");
    /* แปลง <br> เป็นช่องว่างก่อน ไม่งั้นสองบรรทัดจะติดกันเป็นคำเดียว */
    d.innerHTML = String(h || "").replace(/<br\s*\/?>/gi, " ");
    return (d.textContent || "").replace(/\s+/g, " ").trim();
  }

  /* ---------- ค้นหา: รายการข้อความทั้งหมดบนกระดาน ---------- */
  function searchIndex() {
    const out = [];
    doc.items.forEach(it => {
      let text = "", kind = "";
      if (it.t === "c") { text = stripTags(it.title || "") + " " + stripTags(it.body || ""); kind = "การ์ด"; }
      else if (it.t === "x") { text = stripTags(it.html || ""); kind = "ข้อความ"; }
      else if (it.t === "r") kind = "กล่อง";
      else if (it.t === "e") kind = "วงรี";
      else if (it.t === "t3") kind = "สามเหลี่ยม";
      else if (it.t === "img") kind = "รูปภาพ";
      const detail = it.detail ? Detail.plain(it.detail) : "";
      if (!text.trim() && !detail) return;
      out.push({ id: it.id, kind, text: text.trim(),
                 title: it.t === "c" ? stripTags(it.title || "") : text.trim().slice(0, 60),
                 detail, hasDetail: !!it.detail });
    });
    return out;
  }

  /* ---------- เลื่อนกระดานไปหาชิ้นนี้ ---------- */
  function focusItem(id, opts) {
    const it = byId(id); if (!it || !stage) return false;
    const b = visualBox(it); if (!b) return false;
    const r = stage.getBoundingClientRect();
    const want = (opts && opts.zoom) || Math.min(1.4,
      Math.max(0.45, Math.min((r.width - 160) / Math.max(b.w, 1),
                              (r.height - 160) / Math.max(b.h, 1), 1.2)));
    view.scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, want));
    view.x = b.x + b.w / 2 - (r.width / view.scale) / 2;
    view.y = b.y + b.h / 2 - (r.height / view.scale) / 2;
    applyView();
    sel.clear(); sel.add(id);
    render();
    const node = htmlLayer.querySelector(`[data-id="${id}"]`) ||
                 gItems.querySelector(`[data-id="${id}"]`);
    if (node) {
      node.classList.add("dn-flash");
      setTimeout(() => node.classList.remove("dn-flash"), 1400);
    }
    return true;
  }

  function refreshTheme() { if (root && root.isConnected) { updateSwatch(); render(); } }

  return { mount, setDoc, getDoc, destroy, setMode, fitToContent, refreshTheme,
           searchIndex, focusItem, openDetailFor,
           isEmpty: () => !doc.items.length,
           _recognize: recognize, _resample: resample, _corners: countCorners };
})();
