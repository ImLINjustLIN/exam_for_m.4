/* ============================================================
   content-logic.js — คณิต (หลัก) : ตรรกศาสตร์
   สรุปจากหัวข้อที่ Taco ส่งมา (สรุปจากรูปเรียน 17–30)
   ตารางค่าความจริงทุกตารางสร้างด้วยสคริปต์ Python แล้วตรวจผลจริง
   ไม่ได้พิมพ์ด้วยมือ จึงไม่มีโอกาสพิมพ์ T/F ผิดตำแหน่ง
   ============================================================ */
(function () {
  const ID = "math_main";

  const SVG_PROP = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="ประพจน์กับไม่ใช่ประพจน์">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อะไรคือประพจน์ อะไรไม่ใช่</text>
  <rect x="20" y="32" width="176" height="126" rx="10" fill="#2e9e6b" opacity="0.13"/>
  <text x="108" y="50" text-anchor="middle" font-size="11.5" font-weight="700" fill="#2e9e6b">เป็นประพจน์</text>
  <text x="108" y="64" text-anchor="middle" font-size="9.5" fill="currentColor">บอกได้ว่าจริงหรือเท็จ</text>
  <g font-size="10" fill="currentColor">
    <text x="30" y="84">• 2 + 3 = 5 &nbsp;(จริง)</text>
    <text x="30" y="102">• 7 เป็นจำนวนคู่ &nbsp;(เท็จ)</text>
    <text x="30" y="120">• กรุงเทพฯ อยู่ในไทย &nbsp;(จริง)</text>
    <text x="30" y="138">• ดวงจันทร์ใหญ่กว่าโลก &nbsp;(เท็จ)</text>
    <text x="30" y="152" font-size="9">แม้ตอบผิดก็ยังเป็นประพจน์</text>
  </g>
  <rect x="204" y="32" width="176" height="126" rx="10" fill="#e05252" opacity="0.13"/>
  <text x="292" y="50" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e05252">ไม่เป็นประพจน์</text>
  <text x="292" y="64" text-anchor="middle" font-size="9.5" fill="currentColor">ตัดสินจริงเท็จไม่ได้</text>
  <g font-size="10" fill="currentColor">
    <text x="214" y="84">• ปิดประตูด้วย &nbsp;(คำสั่ง)</text>
    <text x="214" y="102">• คุณชื่ออะไร &nbsp;(คำถาม)</text>
    <text x="214" y="120">• ขอให้โชคดี &nbsp;(อุทาน)</text>
    <text x="214" y="138">• x + 1 = 5 &nbsp;(ประโยคเปิด)</text>
    <text x="214" y="152" font-size="9">ไม่รู้ x จึงตัดสินไม่ได้</text>
  </g>
  <line x1="20" y1="176" x2="380" y2="176" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="194" font-weight="700">เกณฑ์เดียวที่ใช้ตัดสิน</text>
    <text x="20" y="212">ถามว่า “ประโยคนี้บอกได้ไหมว่าจริงหรือเท็จ” — ได้ก็เป็นประพจน์</text>
    <text x="20" y="230">ไม่ต้องรู้ว่าจริงหรือเท็จจริง ๆ ขอแค่<tspan font-weight="700">ตัดสินได้ในหลักการ</tspan>ก็พอ</text>
    <text x="20" y="246" font-size="10" fill="#e05252">ประโยคเปิดจะกลายเป็นประพจน์ทันทีเมื่อแทนค่าตัวแปร</text>
  </g>
</svg>`;

  const SVG_CONNECT = `<svg viewBox="0 0 400 280" width="400" height="280" role="img" aria-label="ตัวเชื่อมประพจน์ห้าตัว">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ตัวเชื่อม 5 ตัว กับวิธีจำค่าความจริง</text>
  <g font-size="10">
    <rect x="20" y="32" width="360" height="34" rx="8" fill="#3b7ddd" opacity="0.13"/>
    <text x="34" y="53" font-size="13" font-weight="700" fill="#3b7ddd">∧ และ</text>
    <text x="120" y="47" fill="currentColor">จริงกรณีเดียว: <tspan font-weight="700">จริงทั้งคู่</tspan></text>
    <text x="120" y="61" fill="currentColor" font-size="9.5">เข้มงวดที่สุด ขาดตัวใดตัวหนึ่งก็เท็จ</text>

    <rect x="20" y="72" width="360" height="34" rx="8" fill="#2e9e6b" opacity="0.13"/>
    <text x="34" y="93" font-size="13" font-weight="700" fill="#2e9e6b">∨ หรือ</text>
    <text x="120" y="87" fill="currentColor">เท็จกรณีเดียว: <tspan font-weight="700">เท็จทั้งคู่</tspan></text>
    <text x="120" y="101" fill="currentColor" font-size="9.5">ใจดีที่สุด มีจริงสักตัวก็จริง</text>

    <rect x="20" y="112" width="360" height="34" rx="8" fill="#d98324" opacity="0.13"/>
    <text x="34" y="133" font-size="13" font-weight="700" fill="#d98324">→ ถ้า…แล้ว</text>
    <text x="150" y="127" fill="currentColor">เท็จกรณีเดียว: <tspan font-weight="700">หน้าจริง หลังเท็จ</tspan></text>
    <text x="150" y="141" fill="currentColor" font-size="9.5">หน้าเท็จเมื่อไร ทั้งประพจน์จริงเสมอ</text>

    <rect x="20" y="152" width="360" height="34" rx="8" fill="#7c5cd6" opacity="0.13"/>
    <text x="34" y="173" font-size="13" font-weight="700" fill="#7c5cd6">↔ ก็ต่อเมื่อ</text>
    <text x="150" y="167" fill="currentColor">จริงเมื่อ <tspan font-weight="700">ค่าเหมือนกัน</tspan></text>
    <text x="150" y="181" fill="currentColor" font-size="9.5">TT หรือ FF จริง · ต่างกันเมื่อไรเท็จ</text>

    <rect x="20" y="192" width="360" height="30" rx="8" fill="#e05252" opacity="0.13"/>
    <text x="34" y="211" font-size="13" font-weight="700" fill="#e05252">~ นิเสธ</text>
    <text x="120" y="211" fill="currentColor">กลับค่าตรงข้าม T เป็น F, F เป็น T</text>
  </g>
  <line x1="20" y1="236" x2="380" y2="236" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="254" font-weight="700">ลำดับความสำคัญเมื่อไม่มีวงเล็บ</text>
    <text x="20" y="272">~ ก่อน แล้ว ∧ แล้ว ∨ แล้ว → แล้ว ↔ — แต่ในข้อสอบให้ใส่วงเล็บเองจะปลอดภัยกว่า</text>
  </g>
</svg>`;

  const SVG_TRUTHSTEPS = `<svg viewBox="0 0 400 260" width="400" height="260" role="img" aria-label="ขั้นตอนสร้างตารางค่าความจริง">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">สร้างตารางค่าความจริงให้ไม่ตกหล่น</text>
  <g font-size="10.5">
    <rect x="20" y="32" width="112" height="52" rx="9" fill="#3b7ddd" opacity="0.14"/>
    <text x="76" y="52" text-anchor="middle" font-weight="700" fill="#3b7ddd">① นับตัวแปร</text>
    <text x="76" y="68" text-anchor="middle" fill="currentColor" font-size="9.5">n ตัว → 2ⁿ แถว</text>
    <text x="76" y="80" text-anchor="middle" fill="currentColor" font-size="9">2 ตัว = 4 · 3 ตัว = 8</text>

    <rect x="144" y="32" width="112" height="52" rx="9" fill="#2e9e6b" opacity="0.14"/>
    <text x="200" y="52" text-anchor="middle" font-weight="700" fill="#2e9e6b">② ไล่ T/F</text>
    <text x="200" y="68" text-anchor="middle" fill="currentColor" font-size="9.5">คอลัมน์แรกครึ่งบน T</text>
    <text x="200" y="80" text-anchor="middle" fill="currentColor" font-size="9">ถัดไปสลับถี่ขึ้นเท่าตัว</text>

    <rect x="268" y="32" width="112" height="52" rx="9" fill="#d98324" opacity="0.14"/>
    <text x="324" y="52" text-anchor="middle" font-weight="700" fill="#d98324">③ เติมทีละชั้น</text>
    <text x="324" y="68" text-anchor="middle" fill="currentColor" font-size="9.5">จากวงเล็บในสุด</text>
    <text x="324" y="80" text-anchor="middle" fill="currentColor" font-size="9">ออกมาข้างนอก</text>
  </g>
  <g font-size="10" fill="currentColor">
    <text x="20" y="106" font-weight="700">ตัวอย่างการไล่ค่าให้ครบ ไม่ซ้ำ (3 ตัวแปร = 8 แถว)</text>
  </g>
  <g font-family="monospace" font-size="10.5" fill="currentColor">
    <text x="30" y="126">p : T T T T F F F F</text>
    <text x="30" y="144">q : T T F F T T F F</text>
    <text x="30" y="162">r : T F T F T F T F</text>
  </g>
  <text x="30" y="182" font-size="9.5" fill="#2e9e6b">สังเกต: p สลับทุก 4 แถว · q สลับทุก 2 แถว · r สลับทุกแถว</text>
  <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="218" font-weight="700">เติมคอลัมน์จากในออกนอก</text>
    <text x="20" y="236">p ∧ (q ∨ r) → ทำ q ∨ r ให้เสร็จก่อน แล้วค่อยเอาไป ∧ กับ p</text>
    <text x="20" y="252" fill="#e05252">ห้ามข้ามขั้นไปเดาคำตอบทั้งก้อน เพราะตรวจย้อนกลับไม่ได้</text>
  </g>
</svg>`;

  const SVG_TAUT = `<svg viewBox="0 0 400 240" width="400" height="240" role="img" aria-label="สัจนิรันดร์ ขัดแย้ง และขึ้นกับค่า">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ดูคอลัมน์สุดท้ายแล้วจัดประเภทได้ทันที</text>
  <g font-size="10.5">
    <rect x="20" y="32" width="112" height="76" rx="9" fill="#2e9e6b" opacity="0.14"/>
    <text x="76" y="52" text-anchor="middle" font-weight="700" fill="#2e9e6b">สัจนิรันดร์</text>
    <text x="76" y="70" text-anchor="middle" fill="currentColor" font-size="9.5">ทุกแถวเป็น T</text>
    <text x="76" y="88" text-anchor="middle" font-family="monospace" fill="#2e9e6b">T T T T</text>
    <text x="76" y="102" text-anchor="middle" font-size="9" fill="currentColor">p ∨ ~p</text>

    <rect x="144" y="32" width="112" height="76" rx="9" fill="#e05252" opacity="0.14"/>
    <text x="200" y="52" text-anchor="middle" font-weight="700" fill="#e05252">ขัดแย้ง</text>
    <text x="200" y="70" text-anchor="middle" fill="currentColor" font-size="9.5">ทุกแถวเป็น F</text>
    <text x="200" y="88" text-anchor="middle" font-family="monospace" fill="#e05252">F F F F</text>
    <text x="200" y="102" text-anchor="middle" font-size="9" fill="currentColor">p ∧ ~p</text>

    <rect x="268" y="32" width="112" height="76" rx="9" fill="#d98324" opacity="0.14"/>
    <text x="324" y="52" text-anchor="middle" font-weight="700" fill="#d98324">ขึ้นกับค่า</text>
    <text x="324" y="70" text-anchor="middle" fill="currentColor" font-size="9.5">มีทั้ง T และ F</text>
    <text x="324" y="88" text-anchor="middle" font-family="monospace" fill="#d98324">T F T F</text>
    <text x="324" y="102" text-anchor="middle" font-size="9" fill="currentColor">p → q</text>
  </g>
  <line x1="20" y1="128" x2="380" y2="128" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="146" font-weight="700">ทางลัดตรวจสัจนิรันดร์โดยไม่ต้องทำตารางทั้งตาราง</text>
    <text x="20" y="164">สมมติให้ทั้งก้อนเป็น <tspan font-weight="700">เท็จ</tspan> แล้วไล่ย้อนกลับ</text>
    <text x="20" y="182">ถ้าไล่แล้วเจอข้อขัดแย้งในตัวเอง แปลว่าเป็นเท็จไม่ได้ = สัจนิรันดร์</text>
    <text x="20" y="200">ถ้าไล่แล้วหาค่าที่ทำให้เป็นเท็จได้จริง = ไม่ใช่สัจนิรันดร์</text>
    <text x="20" y="222" font-size="10" fill="#2e9e6b">วิธีนี้เร็วกว่ามากเมื่อมี 3 ตัวแปรขึ้นไป เพราะไม่ต้องไล่ทั้ง 8 แถว</text>
  </g>
</svg>`;

  const SVG_QUANT = `<svg viewBox="0 0 400 260" width="400" height="260" role="img" aria-label="ตัวบ่งปริมาณและนิเสธ">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">∀ กับ ∃ และการกลับนิเสธ</text>
  <g font-size="10.5">
    <rect x="20" y="32" width="176" height="74" rx="9" fill="#3b7ddd" opacity="0.13"/>
    <text x="108" y="52" text-anchor="middle" font-size="15" font-weight="700" fill="#3b7ddd">∀x</text>
    <text x="108" y="70" text-anchor="middle" font-weight="700" fill="currentColor">สำหรับ x ทุกตัว</text>
    <text x="108" y="86" text-anchor="middle" font-size="9.5" fill="currentColor">จริงเมื่อ ทุกตัวในเอกภพจริง</text>
    <text x="108" y="100" text-anchor="middle" font-size="9.5" fill="#e05252">ค้านได้ด้วยตัวอย่างเดียว</text>

    <rect x="204" y="32" width="176" height="74" rx="9" fill="#2e9e6b" opacity="0.13"/>
    <text x="292" y="52" text-anchor="middle" font-size="15" font-weight="700" fill="#2e9e6b">∃x</text>
    <text x="292" y="70" text-anchor="middle" font-weight="700" fill="currentColor">มี x บางตัว</text>
    <text x="292" y="86" text-anchor="middle" font-size="9.5" fill="currentColor">จริงเมื่อ มีอย่างน้อยหนึ่งตัวจริง</text>
    <text x="292" y="100" text-anchor="middle" font-size="9.5" fill="#2e9e6b">ยืนยันได้ด้วยตัวอย่างเดียว</text>
  </g>
  <g font-size="11">
    <rect x="20" y="118" width="360" height="62" rx="9" fill="#d98324" opacity="0.12"/>
    <text x="200" y="138" text-anchor="middle" font-weight="700" fill="#d98324">กลับนิเสธ: เปลี่ยนตัวบ่งปริมาณ แล้วนิเสธข้างใน</text>
    <text x="200" y="158" text-anchor="middle" font-family="monospace" fill="currentColor">~∀x[P(x)]  ≡  ∃x[~P(x)]</text>
    <text x="200" y="174" text-anchor="middle" font-family="monospace" fill="currentColor">~∃x[P(x)]  ≡  ∀x[~P(x)]</text>
  </g>
  <line x1="20" y1="196" x2="380" y2="196" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="214" font-weight="700">แปลเป็นภาษาไทยก่อนเสมอ แล้วค่อยเขียนสัญลักษณ์</text>
    <text x="20" y="232">“ไม่ใช่ว่านักเรียนทุกคนสอบผ่าน” = “มีนักเรียนบางคนสอบไม่ผ่าน”</text>
    <text x="20" y="250">“ไม่มีใครมาสาย” = “ทุกคนไม่มาสาย” — ลองแปลย้อนกลับเพื่อตรวจ</text>
  </g>
</svg>`;

  const SVG_ARGUE = `<svg viewBox="0 0 400 260" width="400" height="260" role="img" aria-label="รูปแบบการอ้างเหตุผล">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">รูปแบบการอ้างเหตุผลที่ต้องแยกให้ออก</text>
  <g font-size="10">
    <rect x="20" y="32" width="176" height="82" rx="9" fill="#2e9e6b" opacity="0.13"/>
    <text x="108" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#2e9e6b">สมเหตุสมผล ✓</text>
    <text x="30" y="68" font-family="monospace" fill="currentColor">p → q , p  ⊢  q</text>
    <text x="30" y="82" font-size="9" fill="currentColor">ถ้าฝนตกถนนเปียก · ฝนตก → ถนนเปียก</text>
    <text x="30" y="100" font-family="monospace" fill="currentColor">p → q , ~q  ⊢  ~p</text>
    <text x="30" y="112" font-size="9" fill="currentColor">ถนนไม่เปียก → ฝนไม่ตก</text>

    <rect x="204" y="32" width="176" height="82" rx="9" fill="#e05252" opacity="0.13"/>
    <text x="292" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#e05252">ไม่สมเหตุสมผล ✗</text>
    <text x="214" y="68" font-family="monospace" fill="currentColor">p → q , q  ⊢  p</text>
    <text x="214" y="82" font-size="9" fill="currentColor">ถนนเปียก ไม่ได้แปลว่าฝนตก (รถน้ำก็ได้)</text>
    <text x="214" y="100" font-family="monospace" fill="currentColor">p → q , ~p  ⊢  ~q</text>
    <text x="214" y="112" font-size="9" fill="currentColor">ฝนไม่ตก ก็ยังเปียกได้</text>
  </g>
  <line x1="20" y1="134" x2="380" y2="134" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="152" font-weight="700">วิธีตรวจที่ใช้ได้กับทุกข้อ</text>
    <text x="20" y="170">สร้างประพจน์ (เหตุทั้งหมด ∧ กัน) → ผล แล้วดูว่าเป็นสัจนิรันดร์ไหม</text>
    <text x="20" y="188">เป็นสัจนิรันดร์ = สมเหตุสมผล · ไม่เป็น = ไม่สมเหตุสมผล</text>
    <text x="20" y="210" font-weight="700" fill="#e05252">จุดที่ต้องระวังที่สุด</text>
    <text x="20" y="228">สมเหตุสมผล ไม่ได้แปลว่าข้อสรุปเป็นความจริง — แปลว่า</text>
    <text x="20" y="246">ถ้าเหตุจริงทั้งหมด ผลต้องจริงตามเท่านั้น</text>
  </g>
</svg>`;

  STARTER_CONTENT[ID] = [
    { type: "h1", text: "ตรรกศาสตร์" },
    { type: "callout", html: "หัวข้อนี้เป็นส่วน<b>ตรรกศาสตร์</b>ของวิชาคณิตหลัก (ชื่อหัวข้อในเว็บคือ เซตและตรรกศาสตร์) · ทั้งบทเดินด้วยทักษะเดียวคือ <b>ไล่ค่าความจริงให้ครบทุกกรณีโดยไม่ตกหล่น</b> ตารางทุกตารางในโน้ตนี้คำนวณด้วยสคริปต์แล้ว เชื่อค่าในตารางได้เลย" },

    { type: "h2", text: "1.1 ประพจน์" },
    { type: "p", html: "<b>ประพจน์</b> คือประโยคที่<b>บอกได้ว่าจริงหรือเท็จอย่างใดอย่างหนึ่ง</b> · ประโยคคำสั่ง คำถาม อุทาน และประโยคเปิด ไม่ใช่ประพจน์",
      detail: `<h3>แยกประพจน์ให้ขาดใน 5 วินาที</h3>
` + SVG_PROP + `
<h4>ค่าความจริงของนิเสธ</h4>
<table><tr><th>p</th><th>~p</th></tr><tr><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td><b>T</b></td></tr></table>
<div class="box why"><b>จุดที่สับสนบ่อย</b><br>ไม่ต้องรู้ว่าประโยคนั้นจริงหรือเท็จ<b>จริง ๆ</b> ขอแค่ตัดสินได้ในหลักการก็พอ<br>เช่น "มีสิ่งมีชีวิตนอกโลก" เป็นประพจน์ เพราะมันต้องจริงหรือเท็จอย่างใดอย่างหนึ่ง แม้เรายังไม่รู้คำตอบ</div>
<h4>ประโยคเปิดคือคนละเรื่องกับประพจน์</h4>
<p>x + 1 = 5 ยังตัดสินไม่ได้เพราะไม่รู้ว่า x คืออะไร — แต่พอ<b>แทนค่า</b>ลงไป มันจะกลายเป็นประพจน์ทันที (x = 4 ให้จริง · x = 7 ให้เท็จ)</p>
<div class="box tip"><b>ใช้ตัวแปรแทนประพจน์</b> นิยมใช้ p, q, r และต้องใช้ตัวเดิมแทนประโยคเดิมตลอดทั้งข้อ ห้ามสลับกลางคัน</div>` },

    { type: "h2", text: "1.2 การเชื่อมประพจน์" },
    { type: "p", html: "ตัวเชื่อมมี 5 ตัว: <b>และ (∧) · หรือ (∨) · ถ้า…แล้ว (→) · ก็ต่อเมื่อ (↔) · นิเสธ (~)</b> — จำ<b>กรณีพิเศษ</b>ของแต่ละตัวก็พอ ไม่ต้องท่องทั้งตาราง",
      detail: `<h3>ตัวเชื่อมทั้งห้าและค่าความจริง</h3>` + SVG_CONNECT + `
<h4>ตารางค่าความจริงของตัวเชื่อมหลัก</h4>
<table><tr><th>p</th><th>q</th><th>p ∧ q</th><th>p ∨ q</th><th>p → q</th><th>p ↔ q</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>F</td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td></tr></table>
<div class="box tip"><b>วิธีจำที่เร็วที่สุด — จำแค่กรณีพิเศษ</b><br>• <b>∧</b> จริงกรณีเดียว: จริงทั้งคู่<br>• <b>∨</b> เท็จกรณีเดียว: เท็จทั้งคู่<br>• <b>→</b> เท็จกรณีเดียว: หน้าจริง หลังเท็จ<br>• <b>↔</b> จริงเมื่อค่าเหมือนกัน</div>
<h4>ทำไม “หน้าเท็จแล้วทั้งประพจน์จริง” ถึงสมเหตุสมผล</h4>
<div class="box why">ลองนึกถึงคำสัญญา: "ถ้าเธอสอบได้ที่ 1 ฉันจะเลี้ยงข้าว"<br>ถ้าเธอ<b>ไม่ได้</b>ที่ 1 ไม่ว่าฉันจะเลี้ยงหรือไม่เลี้ยง ก็ยัง<b>ไม่ถือว่าผิดสัญญา</b> — คำสัญญาจึงยังเป็นจริง<br>สัญญาจะผิด (เท็จ) ก็ต่อเมื่อเธอได้ที่ 1 แล้วฉันไม่เลี้ยงเท่านั้น ตรงกับตารางเป๊ะ</div>` },

    { type: "h2", text: "1.3 การหาค่าความจริงของประพจน์เชิงประกอบ" },
    { type: "p", html: "คิด<b>จากวงเล็บในสุดออกมาข้างนอก</b> ทีละชั้น เหมือนแกะหัวหอม อย่าข้ามขั้นไปเดาทั้งก้อน",
      detail: `<h3>ไล่ค่าทีละชั้น</h3>
<h4>ตัวอย่าง p ∧ (q ∨ r)</h4>
<table><tr><th>p</th><th>q</th><th>r</th><th>q ∨ r</th><th>p ∧ (q ∨ r)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td><b>T</b></td></tr><tr><td>T</td><td>T</td><td>F</td><td>T</td><td><b>T</b></td></tr><tr><td>T</td><td>F</td><td>T</td><td>T</td><td><b>T</b></td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td><td><b>F</b></td></tr><tr><td>F</td><td>T</td><td>T</td><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td>T</td><td>F</td><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td><b>F</b></td></tr></table>
<p>ทำคอลัมน์ q ∨ r ให้เสร็จก่อน แล้วค่อยเอาผลไป ∧ กับ p</p>
<h4>ถ้าโจทย์ให้ค่ามาแล้ว ก็แทนค่าตรง ๆ</h4>
<div class="box"><b>โจทย์</b> กำหนด p เป็นจริง, q เป็นเท็จ, r เป็นจริง หาค่าของ (p → q) ∨ (q ↔ r)<br>
① p → q = T → F = <b>F</b><br>
② q ↔ r = F ↔ T = <b>F</b> (ค่าต่างกัน)<br>
③ F ∨ F = <b>F</b> → ทั้งประพจน์เป็นเท็จ</div>
<div class="box warn"><b>ข้อผิดพลาดที่พบบ่อย</b> รีบคิด → ทั้งก้อนโดยไม่แยกวงเล็บก่อน ทำให้สลับว่าอะไรเป็นหน้าอะไรเป็นหลัง</div>` },
  ];

  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 2 · ตารางค่าความจริงและความสมมูล" },

    { type: "h2", text: "2.1 การสร้างตารางค่าความจริง" },
    { type: "p", html: "ตัวแปร n ตัว → ตารางมี <b>2ⁿ แถว</b> · ไล่ T/F ให้เป็นระบบเพื่อไม่ให้ซ้ำหรือตกหล่น",
      detail: `<h3>สร้างตารางอย่างเป็นระบบ</h3>` + SVG_TRUTHSTEPS + `
<h4>จำนวนแถว</h4>
<p class="frm">ตัวแปร 1 ตัว = 2 แถว · 2 ตัว = 4 แถว · 3 ตัว = 8 แถว · 4 ตัว = 16 แถว</p>
<h4>วิธีไล่ให้ครบ</h4>
<div class="box">คอลัมน์แรกใส่ T ครึ่งบน F ครึ่งล่าง<br>คอลัมน์ถัดไปสลับ<b>ถี่ขึ้นเท่าตัว</b> เรื่อย ๆ จนคอลัมน์สุดท้ายสลับทุกแถว<br>ทำแบบนี้แล้วได้ครบทุกกรณีโดยไม่ซ้ำแน่นอน</div>
<h4>ตัวอย่างเต็มของ p ∧ (q ∨ r)</h4>
<table><tr><th>p</th><th>q</th><th>r</th><th>q ∨ r</th><th>p ∧ (q ∨ r)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td><b>T</b></td></tr><tr><td>T</td><td>T</td><td>F</td><td>T</td><td><b>T</b></td></tr><tr><td>T</td><td>F</td><td>T</td><td>T</td><td><b>T</b></td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td><td><b>F</b></td></tr><tr><td>F</td><td>T</td><td>T</td><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td>T</td><td>F</td><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td><b>F</b></td></tr></table>` },

    { type: "h2", text: "2.2 รูปแบบประพจน์ที่สมมูลกัน" },
    { type: "p", html: "<b>สมมูลกัน</b> แปลว่าค่าความจริง<b>ตรงกันทุกแถว</b> ในตาราง เขียนแทนกันได้ทุกที่ ใช้สัญลักษณ์ ≡",
      detail: `<h3>กฎสมมูลที่ต้องใช้ได้คล่อง</h3>
<h4>① เดอมอร์แกน — นิเสธของ และ/หรือ</h4>
<p class="frm">~(p ∧ q) ≡ ~p ∨ ~q &nbsp;&nbsp;·&nbsp;&nbsp; ~(p ∨ q) ≡ ~p ∧ ~q</p>
<table><tr><th>p</th><th>q</th><th>~(p ∧ q)</th><th>~p ∨ ~q</th></tr><tr><td>T</td><td>T</td><td>F</td><td>F</td></tr><tr><td>T</td><td>F</td><td>T</td><td>T</td></tr><tr><td>F</td><td>T</td><td>T</td><td>T</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td></tr></table>
<table><tr><th>p</th><th>q</th><th>~(p ∨ q)</th><th>~p ∧ ~q</th></tr><tr><td>T</td><td>T</td><td>F</td><td>F</td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td></tr></table>
<div class="box tip"><b>วิธีจำ</b> แจกนิเสธเข้าไปข้างใน แล้ว<b>พลิกตัวเชื่อม</b> — ∧ กลายเป็น ∨ และ ∨ กลายเป็น ∧</div>
<h4>② เปลี่ยน → ให้เป็น ∨ และนิเสธของ →</h4>
<p class="frm">p → q ≡ ~p ∨ q &nbsp;&nbsp;·&nbsp;&nbsp; ~(p → q) ≡ p ∧ ~q</p>
<table><tr><th>p</th><th>q</th><th>p → q</th><th>~p ∨ q</th><th>~(p → q)</th><th>p ∧ ~q</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>F</td><td>F</td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td></tr><tr><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td></tr></table>
<div class="box warn"><b>นิเสธของ “ถ้า…แล้ว” ไม่ใช่ “ถ้า…แล้วไม่”</b><br>~(p → q) คือ <b>p ∧ ~q</b> — คือกรณีที่หน้าจริงแต่หลังเท็จเท่านั้น ข้อสอบชอบหลอกตรงนี้</div>
<h4>③ บทกลับ บทแย้ง และแย้งสลับที่</h4>
<table><tr><th>p</th><th>q</th><th>p → q</th><th>q → p (บทกลับ)</th><th>~p → ~q (บทแย้ง)</th><th>~q → ~p (แย้งสลับที่)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>T</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr></table>
<div class="box why">สังเกตว่า <b>p → q สมมูลกับ ~q → ~p</b> (แย้งสลับที่) เท่านั้น<br>ส่วน q → p (บทกลับ) และ ~p → ~q (บทแย้ง) <b>ไม่สมมูล</b>กับต้นฉบับ แต่สมมูลกันเอง</div>
<h4>④ กฎการแจกแจง</h4>
<p class="frm">p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)</p>
<table><tr><th>p</th><th>q</th><th>r</th><th>p ∧ (q ∨ r)</th><th>(p∧q) ∨ (p∧r)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td></tr></table>
<h4>กฎอื่นที่ใช้บ่อย</h4>
<table><tr><th>ชื่อกฎ</th><th>รูป</th></tr>
<tr><td>นิเสธซ้อน</td><td>~(~p) ≡ p</td></tr>
<tr><td>สลับที่</td><td>p ∧ q ≡ q ∧ p &nbsp;·&nbsp; p ∨ q ≡ q ∨ p</td></tr>
<tr><td>เปลี่ยนกลุ่ม</td><td>(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)</td></tr>
<tr><td>ก็ต่อเมื่อ</td><td>p ↔ q ≡ (p → q) ∧ (q → p)</td></tr></table>
<div class="box tip"><b>เวลาทำโจทย์แปลงรูป</b> เขียนทีละบรรทัดพร้อม<b>ระบุชื่อกฎ</b>ที่ใช้ข้าง ๆ ห้ามข้ามขั้น เพราะถ้าผิดจะย้อนหาจุดผิดไม่เจอ</div>` },

    { type: "h2", text: "2.3 สัจนิรันดร์และการอ้างเหตุผล" },
    { type: "p", html: "<b>สัจนิรันดร์</b> = จริงทุกกรณี · <b>ขัดแย้ง</b> = เท็จทุกกรณี · ที่เหลือคือ<b>ขึ้นกับค่าความจริง</b>",
      detail: `<h3>จัดประเภทประพจน์</h3>` + SVG_TAUT + `
<h4>ตัวอย่างสัจนิรันดร์</h4>
<table><tr><th>p</th><th>q</th><th>(p ∧ (p → q)) → q</th></tr><tr><td>T</td><td>T</td><td><b>T</b></td></tr><tr><td>T</td><td>F</td><td><b>T</b></td></tr><tr><td>F</td><td>T</td><td><b>T</b></td></tr><tr><td>F</td><td>F</td><td><b>T</b></td></tr></table>
<p>ประพจน์ (p ∧ (p → q)) → q เป็นจริงทุกแถว จึงเป็นสัจนิรันดร์ — และนี่คือรูปแบบการอ้างเหตุผลที่เรียกว่า modus ponens</p>
<h4>ตัวอย่างประพจน์ขัดแย้ง</h4>
<table><tr><th>p</th><th>p ∧ ~p</th></tr><tr><td>T</td><td><b>F</b></td></tr><tr><td>F</td><td><b>F</b></td></tr></table>
<h3>การอ้างเหตุผล</h3>` + SVG_ARGUE + `
<h4>วิธีตรวจ</h4>
<div class="box">① เขียนเหตุทั้งหมดมา ∧ กัน &nbsp; ② ต่อด้วย → แล้วตามด้วยข้อสรุป<br>③ ตรวจว่าประพจน์ที่ได้เป็น<b>สัจนิรันดร์</b>หรือไม่<br>เป็น = สมเหตุสมผล · ไม่เป็น = ไม่สมเหตุสมผล</div>
<h4>รูปแบบมาตรฐานที่ควรจำ</h4>
<table><tr><th>ชื่อ</th><th>เหตุ</th><th>ผล</th><th>สมเหตุสมผล</th></tr>
<tr><td>Modus ponens</td><td>p → q , p</td><td>q</td><td><b>ใช่</b></td></tr>
<tr><td>Modus tollens</td><td>p → q , ~q</td><td>~p</td><td><b>ใช่</b></td></tr>
<tr><td>ตรรกบทแบบสมมาตร</td><td>p → q , q → r</td><td>p → r</td><td><b>ใช่</b></td></tr>
<tr><td>สรุปกลับ (ผิด)</td><td>p → q , q</td><td>p</td><td><b>ไม่ใช่</b></td></tr>
<tr><td>ปฏิเสธเหตุ (ผิด)</td><td>p → q , ~p</td><td>~q</td><td><b>ไม่ใช่</b></td></tr></table>
<div class="box warn"><b>สองแบบล่างเป็นกับดักคลาสสิก</b> ตรวจด้วยสคริปต์แล้วทั้งคู่มีกรณีค้าน คือเมื่อ p เท็จ q จริง — เหตุจริงหมดแต่ผลเท็จ จึงไม่สมเหตุสมผล</div>
<div class="box tip"><b>อย่าสับสน</b> สมเหตุสมผล พูดถึง<b>รูปแบบการให้เหตุผล</b> ไม่ได้พูดว่าข้อสรุปจริงในโลกจริง</div>` },
  ]);

  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 3 · ประโยคเปิดและตัวบ่งปริมาณ" },

    { type: "h2", text: "3.1 ประโยคเปิด" },
    { type: "p", html: "<b>ประโยคเปิด</b> คือประโยคที่มีตัวแปร ยังบอกจริงเท็จไม่ได้จนกว่าจะ<b>แทนค่า</b> หรือใส่<b>ตัวบ่งปริมาณ</b>",
      detail: `<h3>ประโยคเปิดกลายเป็นประพจน์ได้ 2 ทาง</h3>
<div class="box"><b>ทางที่ 1 แทนค่าตัวแปร</b><br>P(x) : x + 1 = 5 &nbsp;→&nbsp; P(4) เป็นจริง · P(7) เป็นเท็จ</div>
<div class="box"><b>ทางที่ 2 ใส่ตัวบ่งปริมาณ</b><br>∀x[x + 1 = 5] เป็นเท็จ (ไม่ใช่ทุก x) · ∃x[x + 1 = 5] เป็นจริง (มี x = 4)</div>
<h4>เอกภพสัมพัทธ์สำคัญมาก</h4>
<p><b>เอกภพสัมพัทธ์ (U)</b> คือขอบเขตของค่าที่ตัวแปรวิ่งได้ · ประโยคเดียวกันเปลี่ยนเอกภพแล้วค่าความจริงเปลี่ยนได้ทันที</p>
<table><tr><th>ประโยค</th><th>U = จำนวนนับ</th><th>U = จำนวนจริง</th></tr>
<tr><td>∃x[x + 3 = 1]</td><td><b>เท็จ</b> (ต้องได้ −2)</td><td><b>จริง</b> (x = −2)</td></tr>
<tr><td>∀x[x² ≥ 0]</td><td><b>จริง</b></td><td><b>จริง</b></td></tr></table>
<div class="box warn">โจทย์ที่ไม่บอกเอกภพ ให้ถือว่าเป็นจำนวนจริง แต่ถ้าโจทย์บอกมา<b>ต้องอ่านให้ดี</b> เพราะเปลี่ยนคำตอบได้</div>` },

    { type: "h2", text: "3.2 ตัวบ่งปริมาณ" },
    { type: "p", html: "<b>∀</b> อ่านว่า “สำหรับ x ทุกตัว” · <b>∃</b> อ่านว่า “มี x บางตัว” — ตรวจค่าความจริงด้วยการแทนสมาชิกอย่างเป็นระบบ",
      detail: `<h3>∀ กับ ∃</h3>` + SVG_QUANT + `
<table><tr><th></th><th>∀x[P(x)]</th><th>∃x[P(x)]</th></tr>
<tr><td>จริงเมื่อ</td><td>ทุกตัวในเอกภพทำให้ P(x) จริง</td><td>มีอย่างน้อยหนึ่งตัวที่ทำให้จริง</td></tr>
<tr><td>เท็จเมื่อ</td><td>มีอย่างน้อยหนึ่งตัวที่ทำให้เท็จ</td><td>ทุกตัวทำให้เท็จ</td></tr>
<tr><td>พิสูจน์ว่าจริง</td><td>ต้องตรวจให้ครบทุกตัว</td><td>ยกตัวอย่างมาหนึ่งตัวก็พอ</td></tr>
<tr><td>พิสูจน์ว่าเท็จ</td><td>ยก<b>ตัวอย่างค้าน</b>หนึ่งตัวก็พอ</td><td>ต้องแสดงว่าไม่มีเลยสักตัว</td></tr></table>
<div class="box why"><b>ความไม่สมมาตรที่ต้องเข้าใจ</b><br>∀ พิสูจน์ว่าจริงยาก แต่ค้านง่าย &nbsp;·&nbsp; ∃ พิสูจน์ว่าจริงง่าย แต่ค้านยาก<br>เวลาทำโจทย์ ให้เลือกทางที่ง่ายกว่าเสมอ</div>
<h4>ตัวอย่างการตรวจ</h4>
<p>ให้ U = {1, 2, 3} · ตรวจ ∀x[x + 1 &gt; 2]</p>
<div class="box">x = 1 → 2 &gt; 2 <b>เท็จ</b> → เจอตัวอย่างค้านแล้ว หยุดได้ทันที ตอบว่า<b>เท็จ</b><br>ไม่ต้องตรวจ x = 2, 3 ต่อให้เสียเวลา</div>` },

    { type: "h2", text: "3.3 สมมูลและนิเสธของประโยคที่มีตัวบ่งปริมาณ" },
    { type: "p", html: "กลับนิเสธของ ∀/∃ ต้องทำ 2 อย่างพร้อมกัน: <b>เปลี่ยนตัวบ่งปริมาณ</b> และ <b>นิเสธเงื่อนไขข้างใน</b>",
      detail: `<h3>กฎกลับนิเสธ</h3>
<p class="frm">~∀x[P(x)] ≡ ∃x[~P(x)] &nbsp;&nbsp;·&nbsp;&nbsp; ~∃x[P(x)] ≡ ∀x[~P(x)]</p>
<h4>ทำไมถึงเป็นแบบนี้</h4>
<div class="box why">"ไม่ใช่ว่าทุกคนสอบผ่าน" แปลว่าอะไร → แปลว่า<b>มีอย่างน้อยหนึ่งคนที่สอบไม่ผ่าน</b><br>ไม่ได้แปลว่า "ทุกคนสอบไม่ผ่าน" ซึ่งแรงเกินไป — นี่คือเหตุผลที่ ∀ ต้องกลายเป็น ∃</div>
<h4>ฝึกแปลไปกลับ</h4>
<table><tr><th>ประโยคเดิม</th><th>นิเสธที่ถูกต้อง</th></tr>
<tr><td>นักเรียนทุกคนมาเรียน</td><td>มีนักเรียน<b>บางคน</b>ไม่มาเรียน</td></tr>
<tr><td>มีนักเรียนบางคนสอบได้เต็ม</td><td>นักเรียน<b>ทุกคน</b>สอบไม่ได้เต็ม</td></tr>
<tr><td>∀x[x &gt; 0]</td><td>∃x[x ≤ 0]</td></tr>
<tr><td>∃x[x² = 2]</td><td>∀x[x² ≠ 2]</td></tr></table>
<div class="box warn"><b>ระวังนิเสธของเงื่อนไขข้างใน</b><br>นิเสธของ &gt; คือ ≤ ไม่ใช่ &lt; &nbsp;·&nbsp; นิเสธของ = คือ ≠<br>นิเสธของ "ทุกคนมาและตั้งใจเรียน" ต้องใช้เดอมอร์แกนข้างในด้วย</div>
<div class="box tip"><b>ขั้นตอนที่ปลอดภัยที่สุด</b> เขียนเป็นภาษาไทยก่อน → กลับนิเสธเป็นภาษาไทย → ค่อยแปลงเป็นสัญลักษณ์ → แล้วแปลย้อนกลับมาตรวจอีกรอบ</div>` },
  ]);
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 4 · แบบฝึกคิดเร็ว" },
    { type: "callout", html: "คิดในใจก่อน แล้วค่อยเปิด<b>ข้อมูลแบบละเอียด</b>ดูเฉลย — ทุกข้อเฉลยตรวจด้วยสคริปต์แล้ว" },

    { type: "h2", text: "4.1 ฝึกหาค่าความจริง" },
    { type: "todo", html: "กำหนด p จริง, q เท็จ · หาค่าของ ~(p → q)",
      detail: `<h3>เฉลย: จริง</h3>
<p>p → q = T → F = <b>F</b> · นิเสธของ F คือ <b>T</b></p>
<div class="box tip">ทางลัด: ~(p → q) ≡ p ∧ ~q = T ∧ T = T — ได้คำตอบเดียวกัน</div>` },
    { type: "todo", html: "กำหนด p เท็จ · หาค่าของ p → (q ∧ ~q)",
      detail: `<h3>เฉลย: จริง</h3>
<p>ข้างหลังคือ q ∧ ~q ซึ่งเป็น<b>ประพจน์ขัดแย้ง</b> เป็นเท็จเสมอ<br>แต่ข้างหน้า p เป็นเท็จ → ทั้งประพจน์จึง<b>จริง</b> ตามกฎ "หน้าเท็จแล้วจริงเสมอ"</p>
<div class="box warn">ข้อนี้หลอกให้รีบตอบเท็จเพราะเห็นข้างหลังเป็นเท็จ — ต้องดูข้างหน้าก่อนเสมอ</div>` },
    { type: "todo", html: "ประพจน์ (p ∨ q) ↔ (q ∨ p) เป็นสัจนิรันดร์หรือไม่",
      detail: `<h3>เฉลย: เป็นสัจนิรันดร์</h3>
<p>∨ มีสมบัติสลับที่ ทั้งสองข้างจึงมีค่าเท่ากันทุกแถว เมื่อค่าเท่ากัน ↔ จะให้ค่าจริงเสมอ</p>
<div class="box tip"><b>กฎที่ใช้ได้ทั่วไป</b> ถ้า A ≡ B แล้ว A ↔ B เป็นสัจนิรันดร์เสมอ — ใช้ตรวจความสมมูลได้</div>` },

    { type: "h2", text: "4.2 ฝึกกลับนิเสธ" },
    { type: "todo", html: "เขียนนิเสธของ “ฝนตกและถนนลื่น”",
      detail: `<h3>เฉลย: ฝนไม่ตก หรือ ถนนไม่ลื่น</h3>
<p class="frm">~(p ∧ q) ≡ ~p ∨ ~q</p>
<div class="box warn">ผิดที่พบบ่อย: ตอบว่า "ฝนไม่ตกและถนนไม่ลื่น" — ลืมพลิก และ เป็น หรือ</div>` },
    { type: "todo", html: "เขียนนิเสธของ “ถ้าขยันแล้วจะสอบผ่าน”",
      detail: `<h3>เฉลย: ขยัน แต่สอบไม่ผ่าน</h3>
<p class="frm">~(p → q) ≡ p ∧ ~q</p>
<div class="box why">นิเสธของคำสัญญา คือกรณีเดียวที่ทำให้สัญญาผิด นั่นคือ<b>ทำตามเงื่อนไขแล้วแต่ผลไม่เกิด</b> — ไม่ใช่ "ถ้าไม่ขยันแล้วจะไม่ผ่าน"</div>` },
    { type: "todo", html: "เขียนนิเสธของ ∀x[x² &gt; 0] เมื่อ U เป็นจำนวนจริง แล้วบอกว่าอันไหนจริง",
      detail: `<h3>เฉลย</h3>
<p>นิเสธคือ <b>∃x[x² ≤ 0]</b></p>
<p>ประโยคเดิมเป็น<b>เท็จ</b> เพราะ x = 0 ให้ 0² = 0 ซึ่งไม่มากกว่า 0<br>นิเสธจึงเป็น<b>จริง</b> โดยมี x = 0 เป็นพยาน</p>
<div class="box tip">ประพจน์กับนิเสธของมันต้องมีค่าความจริงตรงข้ามกันเสมอ — ใช้ตรวจคำตอบตัวเองได้</div>` },

    { type: "h2", text: "4.3 ฝึกตรวจการอ้างเหตุผล" },
    { type: "todo", html: "เหตุ: ถ้าเป็นวันหยุดแล้วร้านปิด · วันนี้ร้านปิด → สรุปว่าวันนี้เป็นวันหยุด สมเหตุสมผลไหม",
      detail: `<h3>เฉลย: ไม่สมเหตุสมผล</h3>
<p>รูปแบบคือ p → q , q ⊢ p ซึ่งเป็นการ<b>สรุปกลับ</b></p>
<div class="box warn"><b>กรณีค้าน</b> p เท็จ (ไม่ใช่วันหยุด) แต่ q จริง (ร้านปิด) — เหตุทั้งสองข้อยังจริง แต่ข้อสรุปเท็จ<br>ในชีวิตจริงก็เห็นภาพ: ร้านอาจปิดเพราะเจ้าของป่วย ไม่จำเป็นต้องเป็นวันหยุด</div>` },
    { type: "todo", html: "เหตุ: ถ้าฝนตกแล้วสนามเปียก · สนามไม่เปียก → สรุปว่าฝนไม่ตก สมเหตุสมผลไหม",
      detail: `<h3>เฉลย: สมเหตุสมผล</h3>
<p>รูปแบบ p → q , ~q ⊢ ~p คือ <b>modus tollens</b> ซึ่งตรวจแล้วเป็นสัจนิรันดร์</p>
<div class="box why">คิดง่าย ๆ: ถ้าฝนตกจริง สนามต้องเปียกแน่นอน ในเมื่อสนามไม่เปียก แปลว่าฝนตกไม่ได้</div>` },
    { type: "todo", html: "เหตุ: p → q และ q → r → สรุปว่า p → r สมเหตุสมผลไหม",
      detail: `<h3>เฉลย: สมเหตุสมผล</h3>
<p>เรียกว่า<b>ตรรกบทแบบสมมาตร</b> (hypothetical syllogism) ตรวจด้วยตารางแล้วไม่มีแถวไหนที่เหตุจริงหมดแต่ผลเท็จ</p>
<div class="box tip">ต่อกันเป็นลูกโซ่ได้เรื่อย ๆ: p → q, q → r, r → s ⊢ p → s ก็ยังสมเหตุสมผล</div>` },
  ]);

  STARTER_DIAGRAM[ID] = [
    { id: "ttl", t: "x", x: 40, y: 20, w: 700, html: "ตรรกศาสตร์ — แผนที่ทั้งบท", size: 34, bold: true, c: "auto" },
    { id: "lb1", t: "x", x: 60, y: 66, w: 250, html: "บทที่ 1 · ประพจน์", size: 15, bold: true, c: "#3b7ddd" },
    { id: "lb2", t: "x", x: 400, y: 66, w: 250, html: "บทที่ 2 · ตาราง + สมมูล", size: 15, bold: true, c: "#2e9e6b" },
    { id: "lb3", t: "x", x: 740, y: 66, w: 250, html: "บทที่ 3 · ตัวบ่งปริมาณ", size: 15, bold: true, c: "#7c5cd6" },
    { id: "lb4", t: "x", x: 1080, y: 66, w: 250, html: "กับดักและแบบฝึก", size: 15, bold: true, c: "#d98324" },

    { id: "a0", t: "c", x: 60, y: 100, w: 250, c: "#3b7ddd",
      title: "1.1 ประพจน์คืออะไร",
      body: "ประโยคที่<b>บอกได้ว่าจริงหรือเท็จ</b><br>คำสั่ง คำถาม ประโยคเปิด ไม่ใช่",
      detail: `<h3>แยกประพจน์</h3>` + SVG_PROP + `
<div class="box tip">ไม่ต้องรู้ว่าจริงหรือเท็จจริง ๆ ขอแค่ตัดสินได้ในหลักการ</div>` },

    { id: "a1", t: "c", x: 60, y: 280, w: 250, c: "#3b7ddd",
      title: "1.2 ตัวเชื่อม 5 ตัว",
      body: "∧ จริงกรณีเดียว · ∨ เท็จกรณีเดียว<br>→ เท็จเมื่อหน้าจริงหลังเท็จ",
      detail: `<h3>ตัวเชื่อมและค่าความจริง</h3>` + SVG_CONNECT + `
<div class="box why">"ถ้าเธอได้ที่ 1 ฉันจะเลี้ยงข้าว" — ถ้าเธอไม่ได้ที่ 1 ยังไงก็ไม่ผิดสัญญา นี่คือเหตุผลที่หน้าเท็จแล้วจริงเสมอ</div>` },

    { id: "a2", t: "c", x: 60, y: 460, w: 250, c: "#3b7ddd",
      title: "1.3 ไล่ค่าทีละชั้น",
      body: "คิดจาก<b>วงเล็บในสุด</b>ออกมาข้างนอก",
      detail: `<h3>หาค่าประพจน์เชิงประกอบ</h3>
<div class="box">(p → q) ∨ (q ↔ r) เมื่อ p จริง q เท็จ r จริง<br>① p → q = F &nbsp;② q ↔ r = F &nbsp;③ F ∨ F = <b>F</b></div>` },

    { id: "b0", t: "c", x: 400, y: 100, w: 250, c: "#2e9e6b",
      title: "2.1 สร้างตารางค่าความจริง",
      body: "ตัวแปร n ตัว → <b>2ⁿ แถว</b><br>ไล่ T/F สลับถี่ขึ้นเท่าตัว",
      detail: `<h3>สร้างตารางให้ครบไม่ตกหล่น</h3>` + SVG_TRUTHSTEPS },

    { id: "b1", t: "c", x: 400, y: 280, w: 250, c: "#2e9e6b",
      title: "2.2 เดอมอร์แกน",
      body: "~(p ∧ q) ≡ ~p ∨ ~q<br>~(p ∨ q) ≡ ~p ∧ ~q",
      detail: `<h3>เดอมอร์แกนและกฎสมมูลอื่น</h3>
<p class="frm">แจกนิเสธเข้าไป แล้ว<b>พลิกตัวเชื่อม</b></p>
<table><tr><th>กฎ</th><th>รูป</th></tr>
<tr><td>เปลี่ยน →</td><td>p → q ≡ ~p ∨ q</td></tr>
<tr><td>นิเสธของ →</td><td>~(p → q) ≡ p ∧ ~q</td></tr>
<tr><td>แย้งสลับที่</td><td>p → q ≡ ~q → ~p</td></tr>
<tr><td>นิเสธซ้อน</td><td>~(~p) ≡ p</td></tr></table>
<div class="box warn">บทกลับ (q → p) และบทแย้ง (~p → ~q) <b>ไม่สมมูล</b>กับ p → q</div>` },

    { id: "b2", t: "c", x: 400, y: 460, w: 250, c: "#2e9e6b",
      title: "2.3 สัจนิรันดร์",
      body: "ทุกแถว T = สัจนิรันดร์<br>ทุกแถว F = ขัดแย้ง",
      detail: `<h3>จัดประเภทและทางลัด</h3>` + SVG_TAUT },

    { id: "b3", t: "c", x: 400, y: 640, w: 250, c: "#2e9e6b",
      title: "2.3 การอ้างเหตุผล",
      body: "(เหตุ ∧ กัน) → ผล เป็นสัจนิรันดร์ไหม",
      detail: `<h3>สมเหตุสมผลหรือไม่</h3>` + SVG_ARGUE },

    { id: "c0", t: "c", x: 740, y: 100, w: 250, c: "#7c5cd6",
      title: "3.1 ประโยคเปิด",
      body: "มีตัวแปร ยังตัดสินไม่ได้<br>แทนค่าหรือใส่ตัวบ่งปริมาณจึงเป็นประพจน์",
      detail: `<h3>ประโยคเปิดและเอกภพสัมพัทธ์</h3>
<div class="box">P(x): x + 1 = 5 → P(4) จริง · P(7) เท็จ</div>
<div class="box warn">เปลี่ยนเอกภพแล้วค่าความจริงเปลี่ยนได้ เช่น ∃x[x + 3 = 1] เท็จในจำนวนนับ แต่จริงในจำนวนจริง</div>` },

    { id: "c1", t: "c", x: 740, y: 280, w: 250, c: "#7c5cd6",
      title: "3.2 ∀ กับ ∃",
      body: "∀ ค้านได้ด้วยตัวอย่างเดียว<br>∃ ยืนยันได้ด้วยตัวอย่างเดียว",
      detail: `<h3>ตัวบ่งปริมาณ</h3>` + SVG_QUANT },

    { id: "c2", t: "c", x: 740, y: 460, w: 250, c: "#7c5cd6",
      title: "3.3 กลับนิเสธ",
      body: "~∀x[P(x)] ≡ ∃x[~P(x)]<br>~∃x[P(x)] ≡ ∀x[~P(x)]",
      detail: `<h3>กลับนิเสธให้ถูกทั้งสองชั้น</h3>
<p class="frm">เปลี่ยนตัวบ่งปริมาณ + นิเสธเงื่อนไขข้างใน</p>
<table><tr><th>เดิม</th><th>นิเสธ</th></tr>
<tr><td>นักเรียนทุกคนมาเรียน</td><td>มีบางคนไม่มาเรียน</td></tr>
<tr><td>∀x[x &gt; 0]</td><td>∃x[x ≤ 0]</td></tr></table>
<div class="box warn">นิเสธของ &gt; คือ ≤ ไม่ใช่ &lt;</div>` },

    { id: "d0", t: "c", x: 1080, y: 100, w: 250, c: "#d98324",
      title: "กับดักที่เสียคะแนนบ่อย",
      body: "นิเสธของ → · บทกลับไม่สมมูล · สมเหตุสมผล ≠ จริง",
      detail: `<h3>ห้าข้อที่พลาดซ้ำ</h3>
<div class="box warn">① ~(p → q) คือ p ∧ ~q ไม่ใช่ p → ~q<br>② q → p ไม่สมมูลกับ p → q<br>③ เดอมอร์แกนต้องพลิกตัวเชื่อมด้วย<br>④ กลับนิเสธ ∀/∃ ต้องเปลี่ยนทั้งสองชั้น<br>⑤ สมเหตุสมผลพูดถึงรูปแบบ ไม่ใช่ความจริงในโลกจริง</div>` },

    { id: "d1", t: "c", x: 1080, y: 280, w: 250, c: "#d98324",
      title: "ลำดับที่ควรฝึก",
      body: "ตาราง → สมมูล → สัจนิรันดร์ → ตัวบ่งปริมาณ",
      detail: `<h3>แผนอ่านก่อนสอบ</h3>
<div class="box">① ไล่ตารางค่าความจริง 3 ตัวแปรให้คล่องก่อน<br>② ท่องกฎสมมูล 6 ข้อหลักให้ได้<br>③ ฝึกกลับนิเสธจากภาษาไทยก่อนแปลงสัญลักษณ์<br>④ ปิดท้ายด้วยโจทย์อ้างเหตุผล เพราะใช้ทุกอย่างรวมกัน</div>` },

    { id: "n1", t: "n", a: { id: "a0" }, b: { id: "a1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n2", t: "n", a: { id: "a1" }, b: { id: "a2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n3", t: "n", a: { id: "b0" }, b: { id: "b1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n4", t: "n", a: { id: "b1" }, b: { id: "b2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n5", t: "n", a: { id: "b2" }, b: { id: "b3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n6", t: "n", a: { id: "c0" }, b: { id: "c1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n7", t: "n", a: { id: "c1" }, b: { id: "c2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n8", t: "n", a: { id: "d0" }, b: { id: "d1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "x1", t: "n", a: { id: "a2" }, b: { id: "b0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x2", t: "n", a: { id: "b1" }, b: { id: "c2" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x3", t: "n", a: { id: "b3" }, b: { id: "d0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 }
  ];
})();
