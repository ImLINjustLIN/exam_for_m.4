/* ============================================================
   content-chem.js — เคมี (เสริม) : โครงสร้างอะตอม & พันธะเคมี
   สรุปจากเอกสารประกอบการเรียน ว30221 + เติมพื้นฐานโครงสร้างอะตอม
   ============================================================ */
(function () {
  const ID = "chem_slot";

  /* ---------- รูปประกอบ (วาดเป็น SVG เอง ไม่ใช่รูปจากกระดาษ) ---------- */
  const SVG_MODELS = `<svg viewBox="0 0 400 200" width="400" height="200" role="img" aria-label="ลำดับแบบจำลองอะตอม">
  <g text-anchor="middle">
    <circle cx="50" cy="60" r="24" fill="#7c5cd6" opacity="0.8"/>
    <text x="50" y="106" font-size="10.5" fill="currentColor" font-weight="700">ดอลตัน</text>
    <text x="50" y="120" font-size="9" fill="currentColor">ทรงกลมตัน แบ่งแยกไม่ได้</text>

    <circle cx="150" cy="60" r="24" fill="#3b7ddd" opacity="0.35"/>
    <g fill="#3b7ddd"><circle cx="140" cy="52" r="4"/><circle cx="160" cy="55" r="4"/><circle cx="146" cy="70" r="4"/><circle cx="161" cy="70" r="4"/></g>
    <text x="150" y="106" font-size="10.5" fill="currentColor" font-weight="700">ทอมสัน</text>
    <text x="150" y="120" font-size="9" fill="currentColor">ขนมปังลูกเกด</text>

    <circle cx="250" cy="60" r="24" fill="none" stroke="#2e9e6b" stroke-width="1.6" stroke-dasharray="3 3"/>
    <circle cx="250" cy="60" r="6" fill="#e05252"/>
    <circle cx="268" cy="46" r="3.5" fill="#2e9e6b"/><circle cx="234" cy="72" r="3.5" fill="#2e9e6b"/>
    <text x="250" y="106" font-size="10.5" fill="currentColor" font-weight="700">รัทเทอร์ฟอร์ด</text>
    <text x="250" y="120" font-size="9" fill="currentColor">มีนิวเคลียสอยู่ตรงกลาง</text>

    <circle cx="350" cy="60" r="12" fill="none" stroke="#d98324" stroke-width="1.4"/>
    <circle cx="350" cy="60" r="24" fill="none" stroke="#d98324" stroke-width="1.4"/>
    <circle cx="350" cy="60" r="5" fill="#e05252"/>
    <circle cx="362" cy="60" r="3.5" fill="#d98324"/><circle cx="350" cy="36" r="3.5" fill="#d98324"/><circle cx="330" cy="72" r="3.5" fill="#d98324"/>
    <text x="350" y="106" font-size="10.5" fill="currentColor" font-weight="700">โบร์</text>
    <text x="350" y="120" font-size="9" fill="currentColor">อิเล็กตรอนอยู่ในระดับพลังงาน</text>
  </g>
  <g stroke="currentColor" stroke-width="1.4" opacity="0.5">
    <path d="M78 60 h44"/><path d="M178 60 h44"/><path d="M278 60 h44"/>
  </g>
  <text x="200" y="152" text-anchor="middle" font-size="11" fill="currentColor">แต่ละแบบจำลอง<tspan font-weight="700">ไม่ได้ผิดทั้งหมด</tspan> แต่ถูกแทนที่เมื่อมีหลักฐานใหม่ที่อธิบายได้มากกว่า</text>
  <text x="200" y="172" text-anchor="middle" font-size="10.5" fill="currentColor">ปัจจุบันใช้<tspan font-weight="700">แบบจำลองกลุ่มหมอก</tspan> — อิเล็กตรอนไม่ได้โคจรเป็นวงแน่นอน</text>
  <text x="200" y="190" text-anchor="middle" font-size="10.5" fill="currentColor">แต่บอกได้แค่<tspan font-weight="700">โอกาสที่จะพบ</tspan>ในแต่ละบริเวณ</text>
</svg>`;

  const SVG_SHELLS = `<svg viewBox="0 0 400 220" width="400" height="220" role="img" aria-label="การจัดเรียงอิเล็กตรอนในระดับพลังงาน">
  <g fill="none" stroke="#3b7ddd" stroke-width="1.3" opacity="0.6">
    <circle cx="120" cy="104" r="26"/><circle cx="120" cy="104" r="48"/><circle cx="120" cy="104" r="70"/>
  </g>
  <circle cx="120" cy="104" r="14" fill="#e05252"/>
  <text x="120" y="108" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Na</text>
  <g fill="#3b7ddd">
    <circle cx="120" cy="78" r="4.5"/><circle cx="120" cy="130" r="4.5"/>
    <circle cx="120" cy="56" r="4.5"/><circle cx="120" cy="152" r="4.5"/><circle cx="72" cy="104" r="4.5"/><circle cx="168" cy="104" r="4.5"/>
    <circle cx="86" cy="70" r="4.5"/><circle cx="154" cy="70" r="4.5"/><circle cx="86" cy="138" r="4.5"/><circle cx="154" cy="138" r="4.5"/>
  </g>
  <circle cx="120" cy="34" r="6" fill="#d98324"/>
  <text x="120" y="20" text-anchor="middle" font-size="10" fill="#d98324" font-weight="700">เวเลนซ์อิเล็กตรอน</text>
  <g font-size="10" fill="#3b7ddd">
    <text x="128" y="94">n=1</text><text x="128" y="72">n=2</text><text x="128" y="50">n=3</text>
  </g>
  <g font-size="11" fill="currentColor">
    <text x="214" y="46" font-weight="700">โซเดียม (Na) เลขอะตอม 11</text>
    <text x="214" y="68">จัดเรียงอิเล็กตรอน <tspan font-weight="700">2, 8, 1</tspan></text>
    <text x="214" y="90">ระดับพลังงานนอกสุดมี <tspan font-weight="700">1</tspan> ตัว</text>
    <text x="214" y="112">จึงอยู่<tspan font-weight="700">หมู่ 1A คาบ 3</tspan></text>
    <text x="214" y="140">เสีย e⁻ 1 ตัวแล้วเหลือ 2, 8</text>
    <text x="214" y="160">ซึ่งเสถียรเหมือน<tspan font-weight="700">แก๊สมีตระกูล</tspan></text>
    <text x="214" y="180">จึงเกิดเป็น <tspan font-weight="700">Na⁺</tspan> ได้ง่ายมาก</text>
  </g>
  <text x="200" y="210" text-anchor="middle" font-size="10.5" fill="currentColor">จำนวนเวเลนซ์อิเล็กตรอน = <tspan font-weight="700">เลขหมู่ A</tspan> · จำนวนระดับพลังงาน = <tspan font-weight="700">เลขคาบ</tspan></text>
</svg>`;

  const SVG_LEWIS = `<svg viewBox="0 0 400 230" width="400" height="230" role="img" aria-label="ขั้นตอนการเขียนสูตรโครงสร้างลิวอิสของแอมโมเนีย">
  <text x="200" y="16" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">เขียนลิวอิสของ NH₃ ทีละขั้น</text>
  <g font-size="10" fill="currentColor" text-anchor="middle">
    <text x="62" y="44" font-weight="700">1. นับ e⁻ ทั้งหมด</text>
    <text x="62" y="66">N มี 5</text><text x="62" y="80">H มี 1 × 3 = 3</text>
    <text x="62" y="96" font-weight="700">รวม 8 ตัว</text>
    <text x="62" y="112">= 4 คู่</text>
  </g>
  <g font-size="10" fill="currentColor" text-anchor="middle">
    <text x="176" y="44" font-weight="700">2. วางอะตอมกลาง</text>
  </g>
  <g>
    <text x="176" y="80" text-anchor="middle" font-size="16" fill="#3b7ddd" font-weight="700">N</text>
    <text x="146" y="80" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="206" y="80" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="176" y="112" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <g stroke="currentColor" stroke-width="1.6">
      <path d="M154 76 h12"/><path d="M186 76 h12"/><path d="M176 86 v14"/>
    </g>
  </g>
  <text x="176" y="132" text-anchor="middle" font-size="9" fill="currentColor">ใช้ไป 3 คู่</text>
  <g font-size="10" fill="currentColor" text-anchor="middle">
    <text x="316" y="44" font-weight="700">3. เติมคู่ที่เหลือ</text>
  </g>
  <g>
    <text x="316" y="80" text-anchor="middle" font-size="16" fill="#3b7ddd" font-weight="700">N</text>
    <text x="286" y="80" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="346" y="80" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="316" y="112" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <g stroke="currentColor" stroke-width="1.6">
      <path d="M294 76 h12"/><path d="M326 76 h12"/><path d="M316 86 v14"/>
    </g>
    <circle cx="311" cy="58" r="3" fill="#e05252"/><circle cx="321" cy="58" r="3" fill="#e05252"/>
    <ellipse cx="316" cy="58" rx="12" ry="7" fill="none" stroke="#e05252" stroke-width="1.5"/>
  </g>
  <text x="316" y="132" text-anchor="middle" font-size="9" fill="#e05252" font-weight="700">คู่โดดเดี่ยว 1 คู่</text>
  <text x="200" y="164" text-anchor="middle" font-size="11" fill="currentColor">ตรวจซ้ำ: N ล้อมด้วย e⁻ 8 ตัว (ครบออกเตต) · H ล้อมด้วย 2 ตัว (ครบดูเอต)</text>
  <text x="200" y="186" text-anchor="middle" font-size="10.5" fill="currentColor">ถ้า e⁻ ไม่พอให้ครบออกเตต ให้<tspan font-weight="700">ดึงคู่โดดเดี่ยวมาสร้างพันธะคู่หรือพันธะสาม</tspan></text>
  <text x="200" y="206" text-anchor="middle" font-size="10.5" fill="currentColor">เช่น CO₂ ต้องใช้พันธะคู่ 2 พันธะ จึงจะครบออกเตตทั้ง 3 อะตอม</text>
  <text x="200" y="224" text-anchor="middle" font-size="10" fill="#e05252">อะตอมกลางมักเป็นตัวที่ค่า EN ต่ำกว่า และ H อยู่รอบนอกเสมอ</text>
</svg>`;

  const SVG_COORD = `<svg viewBox="0 0 400 190" width="400" height="190" role="img" aria-label="การเกิดพันธะโคออร์ดิเนตโคเวเลนต์ในแอมโมเนียมไอออน">
  <text x="200" y="16" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">NH₃ + H⁺ &#8594; NH₄⁺</text>
  <g>
    <text x="70" y="72" text-anchor="middle" font-size="17" fill="#3b7ddd" font-weight="700">N</text>
    <text x="40" y="72" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="100" y="72" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="70" y="104" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <g stroke="currentColor" stroke-width="1.6"><path d="M48 68 h12"/><path d="M80 68 h12"/><path d="M70 78 v14"/></g>
    <circle cx="65" cy="50" r="3.2" fill="#e05252"/><circle cx="75" cy="50" r="3.2" fill="#e05252"/>
    <ellipse cx="70" cy="50" rx="13" ry="7.5" fill="none" stroke="#e05252" stroke-width="1.6"/>
    <text x="70" y="128" text-anchor="middle" font-size="9.5" fill="#e05252" font-weight="700">มีคู่โดดเดี่ยว</text>
  </g>
  <text x="152" y="72" text-anchor="middle" font-size="16" fill="currentColor">+</text>
  <g>
    <circle cx="196" cy="66" r="14" fill="#2e9e6b"/>
    <text x="196" y="71" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">H⁺</text>
    <text x="196" y="128" text-anchor="middle" font-size="9.5" fill="#2e9e6b" font-weight="700">ไม่มีอิเล็กตรอนเลย</text>
  </g>
  <path d="M222 66 h24" stroke="currentColor" stroke-width="2"/>
  <path d="M240 60 l10 6 l-10 6 z" fill="currentColor"/>
  <g>
    <text x="320" y="72" text-anchor="middle" font-size="17" fill="#3b7ddd" font-weight="700">N</text>
    <text x="290" y="72" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="350" y="72" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="320" y="104" text-anchor="middle" font-size="13" fill="#d98324" font-weight="700">H</text>
    <text x="320" y="42" text-anchor="middle" font-size="13" fill="#2e9e6b" font-weight="700">H</text>
    <g stroke="currentColor" stroke-width="1.6"><path d="M298 68 h12"/><path d="M330 68 h12"/><path d="M320 78 v14"/></g>
    <path d="M320 58 v-10" stroke="#e05252" stroke-width="2"/>
    <path d="M314 52 l6 -8 l6 8 z" fill="#e05252"/>
    <text x="378" y="66" text-anchor="end" font-size="14" fill="currentColor" font-weight="700">⁺</text>
  </g>
  <text x="320" y="128" text-anchor="middle" font-size="9.5" fill="#e05252" font-weight="700">พันธะโคออร์ดิเนต</text>
  <text x="200" y="158" text-anchor="middle" font-size="11" fill="currentColor">ต่างจากโคเวเลนต์ปกติแค่<tspan font-weight="700">ที่มาของอิเล็กตรอนคู่ร่วมพันธะ</tspan> — มาจาก N ฝ่ายเดียว</text>
  <text x="200" y="180" text-anchor="middle" font-size="10.5" fill="currentColor">เมื่อเกิดแล้ว พันธะทั้ง 4 ใน NH₄⁺ <tspan font-weight="700">เหมือนกันทุกประการ</tspan> แยกไม่ออกว่าอันไหนเป็นโคออร์ดิเนต</text>
</svg>`;

  const SVG_RESONANCE = `<svg viewBox="0 0 400 200" width="400" height="200" role="img" aria-label="โครงสร้างเรโซแนนซ์ของไนเทรตไอออน">
  <text x="200" y="16" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">เรโซแนนซ์ของ NO₃⁻</text>
  <g font-size="13" font-weight="700" text-anchor="middle">
    <g>
      <text x="58" y="66" fill="#3b7ddd">N</text>
      <text x="58" y="36" fill="#e05252">O</text><text x="30" y="92" fill="#e05252">O</text><text x="86" y="92" fill="#e05252">O</text>
      <g stroke="currentColor" stroke-width="1.5" fill="none">
        <path d="M55 52 v-8"/><path d="M61 52 v-8"/>
        <path d="M52 72 l-10 12"/><path d="M64 72 l10 12"/>
      </g>
    </g>
    <g>
      <text x="200" y="66" fill="#3b7ddd">N</text>
      <text x="200" y="36" fill="#e05252">O</text><text x="172" y="92" fill="#e05252">O</text><text x="228" y="92" fill="#e05252">O</text>
      <g stroke="currentColor" stroke-width="1.5" fill="none">
        <path d="M200 52 v-8"/>
        <path d="M191 71 l-8 10"/><path d="M196 75 l-8 10"/>
        <path d="M206 72 l10 12"/>
      </g>
    </g>
    <g>
      <text x="342" y="66" fill="#3b7ddd">N</text>
      <text x="342" y="36" fill="#e05252">O</text><text x="314" y="92" fill="#e05252">O</text><text x="370" y="92" fill="#e05252">O</text>
      <g stroke="currentColor" stroke-width="1.5" fill="none">
        <path d="M342 52 v-8"/>
        <path d="M336 72 l-10 12"/>
        <path d="M349 71 l8 10"/><path d="M344 75 l8 10"/>
      </g>
    </g>
  </g>
  <g stroke="currentColor" stroke-width="1.6" fill="none">
    <path d="M110 62 h38"/><path d="M252 62 h38"/>
  </g>
  <g fill="currentColor">
    <path d="M140 56 l10 6 l-10 6 z"/><path d="M118 68 l-10 -6 l10 -6 z"/>
    <path d="M282 56 l10 6 l-10 6 z"/><path d="M260 68 l-10 -6 l10 -6 z"/>
  </g>
  <text x="200" y="128" text-anchor="middle" font-size="11" fill="currentColor">โมเลกุลจริง<tspan font-weight="700">ไม่ได้สลับไปมา</tspan>ระหว่าง 3 รูปนี้</text>
  <text x="200" y="148" text-anchor="middle" font-size="11" fill="currentColor">แต่เป็น<tspan font-weight="700">ค่าเฉลี่ยของทั้งสาม</tspan>อยู่ตลอดเวลา (เรโซแนนซ์ไฮบริด)</text>
  <text x="200" y="172" text-anchor="middle" font-size="10.5" fill="#e05252" font-weight="700">ผลที่วัดได้จริง: พันธะ N–O ทั้ง 3 เส้นยาวเท่ากันหมด</text>
  <text x="200" y="192" text-anchor="middle" font-size="10.5" fill="currentColor">ยาวอยู่ระหว่างพันธะเดี่ยวกับพันธะคู่ — เป็นหลักฐานยืนยันเรโซแนนซ์</text>
</svg>`;

  const SVG_POLARITY = `<svg viewBox="0 0 400 240" width="400" height="240" role="img" aria-label="เปรียบเทียบสภาพขั้วของ CO2 และ H2O">
  <text x="100" y="18" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">CO₂ — เส้นตรง</text>
  <text x="300" y="18" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">H₂O — มุมงอ</text>
  <g>
    <circle cx="100" cy="66" r="15" fill="#7c5cd6"/><text x="100" y="71" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">C</text>
    <circle cx="48" cy="66" r="14" fill="#e05252"/><text x="48" y="71" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">O</text>
    <circle cx="152" cy="66" r="14" fill="#e05252"/><text x="152" y="71" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">O</text>
    <g stroke="currentColor" stroke-width="2"><path d="M62 62 h24"/><path d="M62 70 h24"/><path d="M114 62 h24"/><path d="M114 70 h24"/></g>
    <g stroke="#3b7ddd" stroke-width="2.6" fill="none"><path d="M92 96 h-32"/><path d="M108 96 h32"/></g>
    <path d="M60 90 l-10 6 l10 6 z" fill="#3b7ddd"/><path d="M140 90 l10 6 l-10 6 z" fill="#3b7ddd"/>
    <text x="100" y="120" text-anchor="middle" font-size="10" fill="#3b7ddd">เวกเตอร์ขั้ว 2 ตัวสวนทางกันพอดี</text>
    <text x="100" y="140" text-anchor="middle" font-size="11" fill="#2e9e6b" font-weight="700">หักล้างกันหมด &#8594; ไม่มีขั้ว</text>
  </g>
  <g>
    <circle cx="300" cy="56" r="15" fill="#e05252"/><text x="300" y="61" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">O</text>
    <circle cx="262" cy="92" r="12" fill="#d98324"/><text x="262" y="96" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">H</text>
    <circle cx="338" cy="92" r="12" fill="#d98324"/><text x="338" y="96" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">H</text>
    <g stroke="currentColor" stroke-width="2"><path d="M289 66 l-18 17"/><path d="M311 66 l18 17"/></g>
    <g stroke="#3b7ddd" stroke-width="2.6" fill="none"><path d="M270 98 l20 -20"/><path d="M330 98 l-20 -20"/></g>
    <path d="M292 72 l-2 12 l11 -5 z" fill="#3b7ddd"/>
    <path d="M308 72 l2 12 l-11 -5 z" fill="#3b7ddd"/>
    <path d="M300 118 v-16" stroke="#e05252" stroke-width="3"/>
    <path d="M294 106 l6 -12 l6 12 z" fill="#e05252"/>
    <text x="300" y="136" text-anchor="middle" font-size="10" fill="#e05252">รวมกันแล้วเหลือเวกเตอร์ชี้ขึ้น</text>
    <text x="300" y="156" text-anchor="middle" font-size="11" fill="#e05252" font-weight="700">ไม่หักล้าง &#8594; มีขั้ว</text>
  </g>
  <line x1="12" y1="172" x2="388" y2="172" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="200" y="192" text-anchor="middle" font-size="11" fill="currentColor"><tspan font-weight="700">พันธะมีขั้ว ไม่ได้แปลว่าโมเลกุลมีขั้ว</tspan> — พันธะ C=O ทั้งสองเส้นมีขั้ว แต่ CO₂ ไม่มีขั้ว</text>
  <text x="200" y="214" text-anchor="middle" font-size="10.5" fill="currentColor">ต้องดู <tspan font-weight="700">รูปร่างโมเลกุล</tspan> ด้วยเสมอ ว่าเวกเตอร์หักล้างกันหรือไม่</text>
  <text x="200" y="234" text-anchor="middle" font-size="10.5" fill="currentColor">รูปร่าง<tspan font-weight="700">สมมาตรและรอบอะตอมกลางเหมือนกันหมด</tspan> &#8594; มักไม่มีขั้ว</text>
</svg>`;

  const SVG_IMF = `<svg viewBox="0 0 400 210" width="400" height="210" role="img" aria-label="ความแรงของแรงยึดเหนี่ยวระหว่างโมเลกุล">
  <text x="200" y="16" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">แรงยึดเหนี่ยวระหว่างโมเลกุล เรียงจากอ่อนไปแรง</text>
  <g>
    <rect x="30" y="40" width="100" height="26" rx="6" fill="#3b7ddd" opacity="0.28"/>
    <text x="80" y="58" text-anchor="middle" font-size="10.5" fill="currentColor" font-weight="700">ลอนดอน</text>
    <rect x="30" y="76" width="160" height="26" rx="6" fill="#7c5cd6" opacity="0.32"/>
    <text x="110" y="94" text-anchor="middle" font-size="10.5" fill="currentColor" font-weight="700">ขั้ว–ขั้ว (dipole–dipole)</text>
    <rect x="30" y="112" width="250" height="26" rx="6" fill="#e05252" opacity="0.32"/>
    <text x="155" y="130" text-anchor="middle" font-size="10.5" fill="currentColor" font-weight="700">พันธะไฮโดรเจน</text>
  </g>
  <g font-size="9.5" fill="currentColor">
    <text x="140" y="58">CH₄ · CO₂ · I₂</text>
    <text x="200" y="94">HCl · CH₃Cl</text>
    <text x="290" y="130">H₂O · NH₃ · HF</text>
  </g>
  <path d="M30 154 h330" stroke="currentColor" stroke-width="1.5"/>
  <path d="M356 148 l10 6 l-10 6 z" fill="currentColor"/>
  <text x="200" y="172" text-anchor="middle" font-size="10.5" fill="currentColor">แรงมากขึ้น &#8594; ต้องใช้พลังงานมากขึ้นในการแยกโมเลกุล &#8594; <tspan font-weight="700">จุดเดือดสูงขึ้น</tspan></text>
  <text x="200" y="194" text-anchor="middle" font-size="10.5" fill="#e05252" font-weight="700">พันธะไฮโดรเจนเกิดได้เมื่อ H ต่อกับ F, O หรือ N เท่านั้น</text>
  <text x="200" y="208" text-anchor="middle" font-size="10" fill="currentColor">ทั้งสามแรงนี้ยัง<tspan font-weight="700">อ่อนกว่าพันธะโคเวเลนต์ภายในโมเลกุลมาก</tspan></text>
</svg>`;

  const SVG_OCTET = `
<svg viewBox="0 0 340 150" width="340" height="150" role="img" aria-label="โลหะให้อิเล็กตรอนกับอโลหะ">
  <circle cx="62" cy="75" r="34" fill="none" stroke="#3b7ddd" stroke-width="2"/>
  <circle cx="62" cy="75" r="9" fill="#3b7ddd"/>
  <text x="62" y="79" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Na</text>
  <circle cx="96" cy="75" r="4.5" fill="#d98324"/>
  <path d="M108 75 L232 75" stroke="#d98324" stroke-width="2.5" marker-end="url(#ar1)"/>
  <defs><marker id="ar1" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
    <path d="M0,0 L9,4.5 L0,9 z" fill="#d98324"/></marker></defs>
  <text x="170" y="64" text-anchor="middle" font-size="12" fill="#d98324">ให้ 1 e⁻</text>
  <circle cx="272" cy="75" r="40" fill="none" stroke="#2e9e6b" stroke-width="2"/>
  <circle cx="272" cy="75" r="10" fill="#2e9e6b"/>
  <text x="272" y="79" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">Cl</text>
  <g fill="#2e9e6b">
    <circle cx="272" cy="35" r="4"/><circle cx="272" cy="115" r="4"/>
    <circle cx="232" cy="75" r="4"/><circle cx="312" cy="75" r="4"/>
    <circle cx="244" cy="47" r="4"/><circle cx="300" cy="47" r="4"/><circle cx="244" cy="103" r="4"/>
  </g>
  <text x="62" y="133" text-anchor="middle" font-size="12" fill="currentColor">Na⁺ ครบ 8 (ชั้นที่ 2)</text>
  <text x="272" y="133" text-anchor="middle" font-size="12" fill="currentColor">Cl⁻ ครบ 8</text>
</svg>`;

  const SVG_TREND = `
<svg viewBox="0 0 360 190" width="360" height="190" role="img" aria-label="แนวโน้มในตารางธาตุ">
  <rect x="40" y="30" width="280" height="120" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".5"/>
  <path d="M50 44 L308 44" stroke="#e05252" stroke-width="2.5" marker-end="url(#ar2)"/>
  <path d="M56 140 L56 52" stroke="#3b7ddd" stroke-width="2.5" marker-end="url(#ar3)"/>
  <defs>
    <marker id="ar2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#e05252"/></marker>
    <marker id="ar3" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#3b7ddd"/></marker>
  </defs>
  <text x="180" y="34" text-anchor="middle" font-size="12" fill="#e05252">ไปขวา: EN ↑ IE ↑ ขนาด ↓</text>
  <text x="20" y="100" font-size="12" fill="#3b7ddd" transform="rotate(-90 20 100)" text-anchor="middle">ขึ้นบน: EN ↑ IE ↑ ขนาด ↓</text>
  <text x="180" y="170" text-anchor="middle" font-size="12.5" fill="currentColor">มุมขวาบน (F) = EN สูงสุด · มุมซ้ายล่าง (Fr) = EN ต่ำสุด</text>
</svg>`;

  const SVG_BORN = `
<svg viewBox="0 0 380 310" width="380" height="310" role="img" aria-label="แผนภาพระดับพลังงานวัฏจักรบอร์น-ฮาเบอร์ของโซเดียมคลอไรด์">
  <defs>
    <marker id="bhU" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#e05252"/></marker>
    <marker id="bhD" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#2e9e6b"/></marker>
    <marker id="bhF" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3b7ddd"/></marker>
  </defs>
  <line x1="14" y1="292" x2="14" y2="18" stroke="currentColor" stroke-width="1.2" opacity=".55"/>
  <text x="20" y="14" font-size="9.5" fill="currentColor" opacity=".75">พลังงาน (kJ/mol) — ยิ่งสูงยิ่งไม่เสถียร</text>

  <line x1="25" y1="210" x2="105" y2="210" stroke="currentColor" stroke-width="2.2"/>
  <text x="26" y="205" font-size="8.5" fill="currentColor">Na(s) + ½Cl₂(g)</text>

  <line x1="105" y1="175" x2="175" y2="175" stroke="currentColor" stroke-width="2.2"/>
  <text x="106" y="170" font-size="8.5" fill="currentColor">Na(g) + ½Cl₂(g)</text>

  <line x1="175" y1="95" x2="245" y2="95" stroke="currentColor" stroke-width="2.2"/>
  <text x="158" y="90" font-size="8.5" fill="currentColor">Na⁺(g) + e⁻ + ½Cl₂(g)</text>

  <line x1="245" y1="55" x2="300" y2="55" stroke="currentColor" stroke-width="2.2"/>
  <text x="228" y="50" font-size="8.5" fill="currentColor">Na⁺(g) + e⁻ + Cl(g)</text>

  <line x1="300" y1="125" x2="358" y2="125" stroke="currentColor" stroke-width="2.2"/>
  <text x="295" y="120" font-size="8.5" fill="currentColor">Na⁺(g) + Cl⁻(g)</text>

  <line x1="30" y1="270" x2="365" y2="270" stroke="currentColor" stroke-width="2.2"/>
  <text x="34" y="284" font-size="9" fill="currentColor" font-weight="700">NaCl(s)</text>

  <path d="M105 208 L105 180" stroke="#e05252" stroke-width="2" marker-end="url(#bhU)"/>
  <text x="110" y="196" font-size="9" fill="#e05252">H_s +107</text>
  <path d="M175 173 L175 100" stroke="#e05252" stroke-width="2" marker-end="url(#bhU)"/>
  <text x="180" y="140" font-size="9" fill="#e05252">IE +496</text>
  <path d="M245 93 L245 60" stroke="#e05252" stroke-width="2" marker-end="url(#bhU)"/>
  <text x="249" y="78" font-size="9" fill="#e05252">D +121</text>
  <path d="M300 57 L300 120" stroke="#2e9e6b" stroke-width="2" marker-end="url(#bhD)"/>
  <text x="304" y="95" font-size="9" fill="#2e9e6b">EA −349</text>
  <path d="M330 127 L330 265" stroke="#2e9e6b" stroke-width="2" marker-end="url(#bhD)"/>
  <text x="252" y="205" font-size="9.5" fill="#2e9e6b" font-weight="700">U −787</text>
  <path d="M36 212 L36 265" stroke="#3b7ddd" stroke-width="2" marker-end="url(#bhF)"/>
  <text x="42" y="245" font-size="9.5" fill="#3b7ddd" font-weight="700">H_f −412</text>

  <text x="190" y="303" text-anchor="middle" font-size="9" fill="currentColor" opacity=".8">แดง = ดูดพลังงาน (ขึ้น) · เขียว = คายพลังงาน (ลง)</text>
</svg>`;

  const SVG_SOLN = `
<svg viewBox="0 0 380 210" width="380" height="210" role="img" aria-label="วงจรพลังงานการละลายของโซเดียมคลอไรด์">
  <defs>
    <marker id="slA" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#e05252"/></marker>
    <marker id="slB" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#2e9e6b"/></marker>
    <marker id="slC" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#3b7ddd"/></marker>
  </defs>
  <rect x="130" y="18" width="130" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="195" y="38" text-anchor="middle" font-size="11" fill="currentColor">Na⁺(g) + Cl⁻(g)</text>

  <rect x="14" y="138" width="96" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="62" y="158" text-anchor="middle" font-size="11" fill="currentColor">NaCl(s)</text>

  <rect x="262" y="138" width="108" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="316" y="158" text-anchor="middle" font-size="10.5" fill="currentColor">Na⁺(aq) + Cl⁻(aq)</text>

  <path d="M74 134 L140 52" stroke="#e05252" stroke-width="2.2" marker-end="url(#slA)"/>
  <text x="42" y="100" font-size="9.5" fill="#e05252">ขั้น 1 · Lattice</text>
  <text x="42" y="112" font-size="9.5" fill="#e05252" font-weight="700">U = +788 (ดูด)</text>

  <path d="M252 52 L310 134" stroke="#2e9e6b" stroke-width="2.2" marker-end="url(#slB)"/>
  <text x="258" y="100" font-size="9.5" fill="#2e9e6b">ขั้น 2 · Hydration</text>
  <text x="258" y="112" font-size="9.5" fill="#2e9e6b" font-weight="700">ΔH = −784 (คาย)</text>

  <path d="M116 153 L256 153" stroke="#3b7ddd" stroke-width="2.2" marker-end="url(#slC)"/>
  <text x="186" y="148" text-anchor="middle" font-size="9.5" fill="#3b7ddd" font-weight="700">ΔH_soln = +4 kJ/mol</text>
  <text x="186" y="186" text-anchor="middle" font-size="10" fill="currentColor">รวมแล้วยังเป็นบวกนิดเดียว → NaCl ละลายน้ำได้ แต่ดูดความร้อนเล็กน้อย</text>
</svg>`;

  const SVG_H2CURVE = `
<svg viewBox="0 0 380 240" width="380" height="240" role="img" aria-label="กราฟพลังงานศักย์ของโมเลกุลไฮโดรเจนเทียบกับระยะระหว่างนิวเคลียส">
  <line x1="48" y1="14" x2="48" y2="212" stroke="currentColor" stroke-width="1.3" opacity=".6"/>
  <line x1="48" y1="70" x2="360" y2="70" stroke="currentColor" stroke-width="1" opacity=".45" stroke-dasharray="4 3"/>
  <line x1="48" y1="212" x2="360" y2="212" stroke="currentColor" stroke-width="1.3" opacity=".6"/>
  <text x="30" y="74" font-size="9.5" fill="currentColor">0</text>
  <text x="10" y="194" font-size="9.5" fill="#3b7ddd" font-weight="700">−432</text>
  <text x="54" y="12" font-size="9.5" fill="currentColor" opacity=".8">พลังงานศักย์ (kJ/mol)</text>
  <text x="356" y="228" text-anchor="end" font-size="9.5" fill="currentColor" opacity=".8">ระยะระหว่างนิวเคลียส r (pm)</text>

  <path d="M91 20 C 103 120, 110 186, 117 190 C 136 193, 162 140, 186 112 C 232 76, 285 71, 356 69"
        fill="none" stroke="#d98324" stroke-width="2.6"/>

  <line x1="117" y1="190" x2="117" y2="212" stroke="currentColor" stroke-width="1" opacity=".5" stroke-dasharray="3 3"/>
  <line x1="48" y1="190" x2="117" y2="190" stroke="#3b7ddd" stroke-width="1" opacity=".6" stroke-dasharray="3 3"/>
  <circle cx="117" cy="190" r="4" fill="#3b7ddd"/>

  <text x="91" y="222" text-anchor="middle" font-size="9" fill="currentColor">45</text>
  <text x="119" y="222" text-anchor="middle" font-size="9" fill="#3b7ddd" font-weight="700">74</text>
  <text x="186" y="222" text-anchor="middle" font-size="9" fill="currentColor">150</text>
  <text x="323" y="222" text-anchor="middle" font-size="9" fill="currentColor">300</text>

  <text x="96" y="36" font-size="9" fill="#e05252">เข้าใกล้เกินไป</text>
  <text x="96" y="47" font-size="9" fill="#e05252">นิวเคลียสผลักกัน</text>
  <text x="128" y="182" font-size="9" fill="#3b7ddd" font-weight="700">ความยาวพันธะ H–H</text>
  <text x="240" y="58" font-size="9" fill="currentColor" opacity=".8">ไกลมาก = ยังไม่ดึงดูดกัน</text>
</svg>`;

  const SVG_VSEPR = `
<svg viewBox="0 0 380 230" width="380" height="230" role="img" aria-label="รูปร่างโมเลกุลตามทฤษฎี VSEPR">
  <g stroke="#d98324" stroke-width="2" fill="none">
    <path d="M18 45 L62 45 M62 45 L106 45"/>
    <path d="M148 60 L180 38 M180 38 L212 60"/>
    <path d="M300 45 L300 18 M300 45 L277 58 M300 45 L323 58"/>
  </g>
  <g fill="#d98324">
    <circle cx="62" cy="45" r="7"/><circle cx="18" cy="45" r="5.5"/><circle cx="106" cy="45" r="5.5"/>
    <circle cx="180" cy="38" r="7"/><circle cx="148" cy="60" r="5.5"/><circle cx="212" cy="60" r="5.5"/>
    <circle cx="300" cy="45" r="7"/><circle cx="300" cy="18" r="5.5"/><circle cx="277" cy="58" r="5.5"/><circle cx="323" cy="58" r="5.5"/>
  </g>
  <text x="62" y="82" text-anchor="middle" font-size="9.5" fill="currentColor">AB₂ เส้นตรง 180°</text>
  <text x="62" y="94" text-anchor="middle" font-size="9" fill="currentColor" opacity=".75">CO₂ BeCl₂</text>
  <text x="180" y="82" text-anchor="middle" font-size="9.5" fill="currentColor">AB₂E₂ มุมงอ 104.5°</text>
  <text x="180" y="94" text-anchor="middle" font-size="9" fill="currentColor" opacity=".75">H₂O H₂S</text>
  <text x="300" y="82" text-anchor="middle" font-size="9.5" fill="currentColor">AB₃ สามเหลี่ยมแบนราบ 120°</text>
  <text x="300" y="94" text-anchor="middle" font-size="9" fill="currentColor" opacity=".75">BF₃ SO₃ NO₃⁻</text>

  <g stroke="#7c5cd6" stroke-width="2" fill="none">
    <path d="M62 148 L62 170 M62 148 L38 162 M62 148 L86 162"/>
    <path d="M180 150 L180 124 M180 150 L152 166 M180 150 L204 162 M180 150 L196 174"/>
    <path d="M300 150 L300 122 M300 150 L300 178 M300 150 L272 150 M300 150 L328 150 M300 150 L284 136 M300 150 L316 164"/>
  </g>
  <g fill="#7c5cd6">
    <circle cx="62" cy="148" r="7"/><circle cx="62" cy="170" r="5.5"/><circle cx="38" cy="162" r="5.5"/><circle cx="86" cy="162" r="5.5"/>
    <circle cx="180" cy="150" r="7"/><circle cx="180" cy="124" r="5.5"/><circle cx="152" cy="166" r="5.5"/><circle cx="204" cy="162" r="5.5"/><circle cx="196" cy="174" r="5.5"/>
    <circle cx="300" cy="150" r="7"/><circle cx="300" cy="122" r="5.5"/><circle cx="300" cy="178" r="5.5"/><circle cx="272" cy="150" r="5.5"/><circle cx="328" cy="150" r="5.5"/><circle cx="284" cy="136" r="5.5"/><circle cx="316" cy="164" r="5.5"/>
  </g>
  <ellipse cx="62" cy="128" rx="11" ry="6" fill="none" stroke="#e05252" stroke-width="1.6"/>
  <text x="62" y="118" text-anchor="middle" font-size="8" fill="#e05252">คู่โดดเดี่ยว</text>
  <text x="62" y="192" text-anchor="middle" font-size="9.5" fill="currentColor">AB₃E พีระมิดฐาน 3 เหลี่ยม</text>
  <text x="62" y="204" text-anchor="middle" font-size="9" fill="currentColor" opacity=".75">NH₃ 107°</text>
  <text x="180" y="192" text-anchor="middle" font-size="9.5" fill="currentColor">AB₄ ทรงสี่หน้า 109.5°</text>
  <text x="180" y="204" text-anchor="middle" font-size="9" fill="currentColor" opacity=".75">CH₄ CCl₄ NH₄⁺</text>
  <text x="300" y="192" text-anchor="middle" font-size="9.5" fill="currentColor">AB₆ ทรงแปดหน้า 90°</text>
  <text x="300" y="204" text-anchor="middle" font-size="9" fill="currentColor" opacity=".75">SF₆</text>
</svg>`;

  const SVG_BRITTLE = `
<svg viewBox="0 0 360 170" width="360" height="170" role="img" aria-label="เหตุผลที่สารประกอบไอออนิกเปราะแตกง่าย">
  <g font-size="11" text-anchor="middle" font-weight="700">
    <g fill="#3b7ddd">
      <circle cx="26" cy="40" r="11"/><circle cx="74" cy="40" r="11"/>
      <circle cx="50" cy="66" r="11"/><circle cx="98" cy="66" r="11"/>
      <circle cx="26" cy="92" r="11"/><circle cx="74" cy="92" r="11"/>
    </g>
    <g fill="#e05252">
      <circle cx="50" cy="40" r="11"/><circle cx="98" cy="40" r="11"/>
      <circle cx="26" cy="66" r="11"/><circle cx="74" cy="66" r="11"/>
      <circle cx="50" cy="92" r="11"/><circle cx="98" cy="92" r="11"/>
    </g>
    <g fill="#fff">
      <text x="26" y="44">+</text><text x="74" y="44">+</text><text x="50" y="70">+</text><text x="98" y="70">+</text><text x="26" y="96">+</text><text x="74" y="96">+</text>
      <text x="50" y="44">−</text><text x="98" y="44">−</text><text x="26" y="70">−</text><text x="74" y="70">−</text><text x="50" y="96">−</text><text x="98" y="96">−</text>
    </g>
  </g>
  <text x="62" y="124" text-anchor="middle" font-size="10" fill="currentColor">ปกติ: บวกกับลบสลับกัน → ดูดกันแน่น</text>

  <path d="M140 66 L182 66" stroke="#d98324" stroke-width="2.5" marker-end="url(#brA)"/>
  <defs><marker id="brA" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#d98324"/></marker></defs>
  <text x="161" y="58" text-anchor="middle" font-size="9.5" fill="#d98324">ทุบ</text>
  <text x="161" y="80" text-anchor="middle" font-size="9.5" fill="#d98324">ชั้นเลื่อน</text>

  <g font-size="11" text-anchor="middle" font-weight="700">
    <g fill="#3b7ddd">
      <circle cx="222" cy="40" r="11"/><circle cx="270" cy="40" r="11"/>
      <circle cx="222" cy="66" r="11"/><circle cx="270" cy="66" r="11"/>
      <circle cx="246" cy="92" r="11"/><circle cx="294" cy="92" r="11"/>
    </g>
    <g fill="#e05252">
      <circle cx="246" cy="40" r="11"/><circle cx="294" cy="40" r="11"/>
      <circle cx="246" cy="66" r="11"/><circle cx="294" cy="66" r="11"/>
      <circle cx="222" cy="92" r="11"/><circle cx="270" cy="92" r="11"/>
    </g>
    <g fill="#fff">
      <text x="222" y="44">+</text><text x="270" y="44">+</text><text x="222" y="70">+</text><text x="270" y="70">+</text><text x="246" y="96">+</text><text x="294" y="96">+</text>
      <text x="246" y="44">−</text><text x="294" y="44">−</text><text x="246" y="70">−</text><text x="294" y="70">−</text><text x="222" y="96">−</text><text x="270" y="96">−</text>
    </g>
  </g>
  <path d="M210 53 L310 53" stroke="#e05252" stroke-width="2.5" stroke-dasharray="6 4"/>
  <text x="260" y="124" text-anchor="middle" font-size="10" fill="#e05252">ประจุเหมือนกันมาเจอกัน → ผลักกัน ผลึกแตกทันที</text>
  <text x="180" y="152" text-anchor="middle" font-size="10.5" fill="currentColor">โลหะเลื่อนชั้นแล้วไม่แตก เพราะ e⁻ อิสระไหลตามไปยึดไว้ได้</text>
</svg>`;

  const SVG_ESEA = `
<svg viewBox="0 0 340 170" width="340" height="170" role="img" aria-label="ทะเลอิเล็กตรอนในพันธะโลหะ">
  <rect x="14" y="14" width="312" height="112" rx="10" fill="none" stroke="#7c5cd6" stroke-width="1.8" opacity=".6"/>
  <g fill="#7c5cd6">
    <circle cx="54" cy="42" r="13"/><circle cx="114" cy="42" r="13"/><circle cx="174" cy="42" r="13"/><circle cx="234" cy="42" r="13"/><circle cx="294" cy="42" r="13"/>
    <circle cx="54" cy="98" r="13"/><circle cx="114" cy="98" r="13"/><circle cx="174" cy="98" r="13"/><circle cx="234" cy="98" r="13"/><circle cx="294" cy="98" r="13"/>
    <circle cx="84" cy="70" r="13"/><circle cx="144" cy="70" r="13"/><circle cx="204" cy="70" r="13"/><circle cx="264" cy="70" r="13"/>
  </g>
  <g fill="#fff" font-size="10" font-weight="700" text-anchor="middle">
    <text x="54" y="46">+</text><text x="114" y="46">+</text><text x="174" y="46">+</text><text x="234" y="46">+</text><text x="294" y="46">+</text>
    <text x="54" y="102">+</text><text x="114" y="102">+</text><text x="174" y="102">+</text><text x="234" y="102">+</text><text x="294" y="102">+</text>
    <text x="84" y="74">+</text><text x="144" y="74">+</text><text x="204" y="74">+</text><text x="264" y="74">+</text>
  </g>
  <g fill="#d98324">
    <circle cx="84" cy="30" r="3.4"/><circle cx="144" cy="30" r="3.4"/><circle cx="204" cy="30" r="3.4"/><circle cx="264" cy="30" r="3.4"/>
    <circle cx="34" cy="70" r="3.4"/><circle cx="114" cy="70" r="3.4"/><circle cx="174" cy="70" r="3.4"/><circle cx="234" cy="70" r="3.4"/><circle cx="310" cy="70" r="3.4"/>
    <circle cx="84" cy="112" r="3.4"/><circle cx="144" cy="112" r="3.4"/><circle cx="204" cy="112" r="3.4"/><circle cx="264" cy="112" r="3.4"/>
    <circle cx="54" cy="70" r="3.4"/><circle cx="294" cy="70" r="3.4"/>
  </g>
  <text x="170" y="146" text-anchor="middle" font-size="10.5" fill="currentColor">ไอออนบวกเรียงอยู่กับที่ · e⁻ วงนอก (จุดส้ม) หลุดออกมาไหลได้ทั่วก้อน</text>
  <text x="170" y="162" text-anchor="middle" font-size="10" fill="#7c5cd6">แรงดึงดูดระหว่างไอออนบวกกับทะเล e⁻ = พันธะโลหะ</text>
</svg>`;

  /* ============================================================
     1) โน้ตปกติ — สไตล์เคมี: นิยามสั้น → ตาราง → กล่องสรุป
     ============================================================ */
  STARTER_CONTENT[ID] = [
    { type: "h1", text: "บทที่ 1 · โครงสร้างอะตอม" },
    { type: "callout", html: "ก่อนจะเข้าใจว่าอะตอมจับกันเป็นพันธะได้อย่างไร ต้องรู้ก่อนว่า <b>อิเล็กตรอนวงนอกสุด</b> ของแต่ละอะตอมมีกี่ตัว — ทุกอย่างในบทพันธะเคมีตัดสินกันที่ตรงนี้" },

    { type: "h2", text: "1.1 อนุภาคมูลฐานและสัญลักษณ์นิวเคลียร์" },
    { type: "table", rows: [
      ["อนุภาค", "ประจุ", "มวลโดยประมาณ", "อยู่ที่ไหน"],
      ["โปรตอน (p)", "+1", "1 amu", "นิวเคลียส"],
      ["นิวตรอน (n)", "0", "1 amu", "นิวเคลียส"],
      ["อิเล็กตรอน (e⁻)", "−1", "≈ 1/1836 amu", "รอบนิวเคลียส"]
    ]},
    { type: "code", text: "ᴬ𝗓X   →   Z = เลขอะตอม = จำนวนโปรตอน\n          A = เลขมวล = โปรตอน + นิวตรอน\n          นิวตรอน = A − Z\n          อะตอมกลาง: e⁻ = p = Z" },
    { type: "p", html: "ไอออนบวกเกิดจาก<b>เสีย</b> e⁻ (e⁻ = Z − ประจุ) ส่วนไอออนลบเกิดจาก<b>รับ</b> e⁻ (e⁻ = Z + ประจุ)",
      detail: `<h3>อ่านสัญลักษณ์นิวเคลียร์ให้ไม่พลาด</h3>
<p>เลขสองตัวที่เขียนติดกับสัญลักษณ์ธาตุ บอกคนละเรื่องกัน และเป็นจุดที่นักเรียนสับสนบ่อยที่สุด</p>
<div class="box"><b>เลขอะตอม (Z) — ตัวล่าง</b>
บอกจำนวน<b>โปรตอน</b> และเป็น "บัตรประชาชน" ของธาตุ ถ้า Z เปลี่ยน ธาตุก็เปลี่ยนเป็นคนละธาตุทันที</div>
<div class="box"><b>เลขมวล (A) — ตัวบน</b>
บอกจำนวน<b>โปรตอน + นิวตรอน</b> ไม่รวมอิเล็กตรอน เพราะอิเล็กตรอนเบามากจนแทบไม่มีผลต่อมวล (เบากว่าโปรตอนราว 1,836 เท่า)</div>
<h4>ทำไมไอโซโทปถึงมีสมบัติเคมีเหมือนกัน?</h4>
<p>ไอโซโทปคือธาตุเดียวกันที่มีนิวตรอนต่างกัน เช่น ¹²C กับ ¹⁴C — ทั้งคู่มีโปรตอน 6 ตัวเท่ากัน จึงมีอิเล็กตรอน 6 ตัวเท่ากัน และจัดเรียงอิเล็กตรอนเหมือนกันทุกประการ <b>สมบัติทางเคมีถูกกำหนดด้วยอิเล็กตรอน ไม่ใช่นิวตรอน</b> ทั้งสองจึงทำปฏิกิริยาเหมือนกันหมด ต่างกันแค่มวลและความเสถียรของนิวเคลียส</p>
<h4>ตัวอย่างการคิดไอออน</h4>
<table><tr><th>อนุภาค</th><th>Z</th><th>A</th><th>p</th><th>n</th><th>e⁻</th></tr>
<tr><td>³¹P</td><td>15</td><td>31</td><td>15</td><td>16</td><td>15</td></tr>
<tr><td>³¹P³⁻</td><td>15</td><td>31</td><td>15</td><td>16</td><td>18</td></tr>
<tr><td>²⁴Mg²⁺</td><td>12</td><td>24</td><td>12</td><td>12</td><td>10</td></tr></table>
<div class="box tip"><b>เช็กเร็ว</b> ประจุบวกเท่าไร ให้ลบ e⁻ ออกเท่านั้น ประจุลบเท่าไร ให้บวก e⁻ เข้าไปเท่านั้น — โปรตอนกับนิวตรอนไม่เคยเปลี่ยนในปฏิกิริยาเคมี</div>` },

    { type: "h2", text: "1.2 แบบจำลองอะตอม" },
    { type: "table", rows: [
      ["นักวิทยาศาสตร์", "แบบจำลอง", "หลักฐานสำคัญ"],
      ["ดอลตัน", "ทรงกลมตัน แบ่งแยกไม่ได้", "กฎทรงมวล / กฎสัดส่วนคงที่"],
      ["ทอมสัน", "ขนมปังลูกเกด (e⁻ ฝังในเนื้อบวก)", "หลอดรังสีแคโทด → พบอิเล็กตรอน"],
      ["รัทเทอร์ฟอร์ด", "นิวเคลียสเล็กหนาแน่นตรงกลาง", "ยิงอนุภาค α ผ่านแผ่นทองคำ"],
      ["โบร์", "อิเล็กตรอนโคจรเป็นวงระดับพลังงาน", "สเปกตรัมเส้นของไฮโดรเจน"],
      ["กลุ่มหมอก", "e⁻ อยู่เป็นกลุ่มหมอกความน่าจะเป็น", "กลศาสตร์ควอนตัม"]
    ], detail: `<h3>ทำไมแบบจำลองถึงต้องเปลี่ยนไปเรื่อย ๆ</h3>
` + SVG_MODELS + `
<p>แบบจำลองอะตอมไม่ใช่ "คนก่อนคิดผิด" แต่เป็นการที่การทดลองใหม่เจอสิ่งที่แบบจำลองเดิมอธิบายไม่ได้ จึงต้องขยายแบบจำลอง</p>
<h4>1) ดอลตัน → ทอมสัน</h4>
<p>ดอลตันบอกว่าอะตอมแบ่งไม่ได้ แต่ทอมสันยิงกระแสไฟฟ้าผ่านหลอดสุญญากาศแล้วพบลำอนุภาคที่<b>เบนเข้าหาขั้วบวก</b>เสมอ ไม่ว่าจะใช้แก๊สอะไรหรือขั้วโลหะอะไร แปลว่ามีอนุภาคลบตัวเล็ก ๆ อยู่ในอะตอมของทุกธาตุ — อะตอมจึงแบ่งได้</p>
<h4>2) ทอมสัน → รัทเทอร์ฟอร์ด (การทดลองที่พลิกทุกอย่าง)</h4>
<p>รัทเทอร์ฟอร์ดยิงอนุภาคแอลฟา (บวก, หนัก) ใส่แผ่นทองคำบางมาก ถ้าอะตอมเป็นขนมปังลูกเกดจริง ประจุบวกกระจายทั่วทั้งก้อน อนุภาคแอลฟาก็ควรทะลุผ่านโดยเบนเพียงเล็กน้อยทุกอัน</p>
<p>แต่ผลคือ <b>ส่วนใหญ่ทะลุตรง ๆ ไปเลย</b> และมีบางอันที่<b>สะท้อนกลับมาเกือบ 180°</b> รัทเทอร์ฟอร์ดเปรียบว่า "เหมือนยิงปืนใหญ่ใส่กระดาษทิชชูแล้วกระสุนเด้งกลับมาโดนตัวเอง"</p>
<div class="box why"><b>ตีความอย่างไร</b>
• ทะลุเยอะ → อะตอมส่วนใหญ่เป็นที่ว่าง<br>
• เด้งกลับ → มีอะไรบางอย่างที่เล็กมาก มวลมาก และประจุบวกเข้มข้นอยู่ตรงกลาง = <b>นิวเคลียส</b></div>
<h4>3) รัทเทอร์ฟอร์ด → โบร์</h4>
<p>ปัญหาของรัทเทอร์ฟอร์ด: ตามฟิสิกส์คลาสสิก อิเล็กตรอนที่วิ่งวนต้องแผ่พลังงานออกแล้วตกลงสู่นิวเคลียสภายในเสี้ยววินาที แต่อะตอมกลับเสถียร และเมื่อเผาแก๊สไฮโดรเจนก็ได้<b>สเปกตรัมเป็นเส้น ๆ</b> ไม่ใช่แถบต่อเนื่อง</p>
<p>โบร์จึงเสนอว่า อิเล็กตรอนอยู่ได้เฉพาะบางวงที่มีพลังงานเฉพาะค่า (quantized) เวลากระโดดลงวงในจะคายพลังงานออกมาเป็นแสงสีเดียว จึงเห็นเป็นเส้นสเปกตรัม</p>
<h4>4) โบร์ → กลุ่มหมอก</h4>
<p>แบบจำลองโบร์ใช้ได้ดีกับไฮโดรเจน (1 อิเล็กตรอน) แต่ทำนายสเปกตรัมของธาตุอื่นไม่ตรง กลศาสตร์ควอนตัมจึงบอกว่าเราระบุ "วงโคจร" ที่แน่นอนไม่ได้ ทำได้แค่บอก<b>ความน่าจะเป็น</b>ที่จะเจออิเล็กตรอนตรงไหน ภาพที่ได้จึงเป็นกลุ่มหมอก (orbital) ที่มีรูปทรงต่างกัน s p d f</p>
<div class="box tip"><b>สอบชอบออก</b> จำคู่ "การทดลอง ↔ ข้อสรุป" ให้ได้: หลอดรังสีแคโทด → อิเล็กตรอน ; แผ่นทองคำ → นิวเคลียส ; สเปกตรัมเส้น → ระดับพลังงาน</div>` },

    { type: "h2", text: "1.3 การจัดเรียงอิเล็กตรอนและเวเลนซ์อิเล็กตรอน" },
    { type: "code", text: "จำนวน e⁻ สูงสุดในชั้นที่ n  =  2n²\nชั้น 1 = 2 | ชั้น 2 = 8 | ชั้น 3 = 18 | ชั้น 4 = 32\n(ชั้นนอกสุดของธาตุหมู่หลัก ไม่เกิน 8)" },
    { type: "bullet", text: "เลขหมู่ (A) = จำนวนเวเลนซ์อิเล็กตรอน" },
    { type: "bullet", text: "เลขคาบ = จำนวนชั้นพลังงานที่มีอิเล็กตรอน" },
    { type: "p", html: "เช่น ₁₇Cl จัดเป็น 2, 8, 7 → คาบ 3 หมู่ 7A มีเวเลนซ์อิเล็กตรอน 7 ตัว ขาดอีก 1 ก็ครบ 8",
      detail: `<h3>ทำไมเวเลนซ์อิเล็กตรอนถึงสำคัญที่สุด</h3>
` + SVG_SHELLS + `
<p>อิเล็กตรอนชั้นในถูกนิวเคลียสดึงไว้แน่นและถูกบังด้วยชั้นนอก แทบไม่ได้ยุ่งกับอะตอมอื่นเลย ส่วน<b>อิเล็กตรอนวงนอกสุด</b>อยู่ไกลนิวเคลียสที่สุดและอยู่ด้านนอกสุด จึงเป็นตัวที่ไปเจอกับอะตอมอื่นก่อน — การเกิดพันธะทั้งหมดจึงเป็นเรื่องของเวเลนซ์อิเล็กตรอนล้วน ๆ</p>
<h4>วิธีจัดเรียงแบบไม่ต้องท่อง</h4>
<ol>
<li>เติมชั้นในให้เต็มก่อน ตามกฎ 2n² : 2, 8, 18, 32</li>
<li>แต่ชั้นนอกสุดของธาตุหมู่หลัก <b>ห้ามเกิน 8</b></li>
<li>ถ้าเติมแล้วชั้นนอกเหลือ 9–18 ตัว ให้ถอยกลับไปใส่ชั้นก่อนหน้า 8 ตัวแล้วดันที่เหลือขึ้นชั้นใหม่</li>
</ol>
<div class="box"><b>ตัวอย่าง ₂₀Ca</b>
เติมตรง ๆ ได้ 2, 8, 10 → ชั้นนอกเกิน 8 ไม่ได้<br>
แก้เป็น <b>2, 8, 8, 2</b> → คาบ 4 หมู่ 2A มีเวเลนซ์อิเล็กตรอน 2 ตัว</div>
<h4>เชื่อมกับตารางธาตุอย่างไร</h4>
<table><tr><th>หมู่</th><th>เวเลนซ์ e⁻</th><th>มักกลายเป็นไอออน</th></tr>
<tr><td>1A</td><td>1</td><td>+1 (เสีย 1)</td></tr>
<tr><td>2A</td><td>2</td><td>+2 (เสีย 2)</td></tr>
<tr><td>3A</td><td>3</td><td>+3 (เสีย 3)</td></tr>
<tr><td>5A</td><td>5</td><td>−3 (รับ 3)</td></tr>
<tr><td>6A</td><td>6</td><td>−2 (รับ 2)</td></tr>
<tr><td>7A</td><td>7</td><td>−1 (รับ 1)</td></tr>
<tr><td>8A</td><td>8 (He = 2)</td><td>ไม่เกิดไอออน — เสถียรอยู่แล้ว</td></tr></table>
<div class="box tip"><b>ทริค</b> หมู่ 1A–3A "ให้" ง่ายกว่า เพราะเสียแค่ไม่กี่ตัวก็ครบ 8 ของชั้นถัดเข้าไป ส่วนหมู่ 5A–7A "รับ" ง่ายกว่า เพราะขาดอีกไม่กี่ตัวก็ครบ 8</div>` },

    { type: "h2", text: "1.4 แนวโน้มของธาตุในตารางธาตุ" },
    { type: "table", rows: [
      ["สมบัติ", "ไปทางขวาในคาบเดียวกัน", "ลงล่างในหมู่เดียวกัน", "เหตุผลสั้น ๆ"],
      ["ขนาดอะตอม", "เล็กลง", "ใหญ่ขึ้น", "ประจุนิวเคลียสดึงแรงขึ้น / ชั้นเพิ่มขึ้น"],
      ["พลังงานไอออไนเซชัน (IE)", "สูงขึ้น", "ต่ำลง", "ดึง e⁻ แน่นขึ้น / อยู่ไกลนิวเคลียส"],
      ["อิเล็กโทรเนกาติวิตี (EN)", "สูงขึ้น", "ต่ำลง", "แย่ง e⁻ เก่งขึ้น"],
      ["สัมพรรคภาพอิเล็กตรอน (EA)", "คายมากขึ้น", "คายน้อยลง", "อยากได้ e⁻ มากขึ้น"]
    ], detail: `<h3>แนวโน้มในตารางธาตุ — ทำไมถึงเป็นแบบนั้น</h3>
${SVG_TREND}
<h4>ขนาดอะตอม</h4>
<p><b>ไปทางขวา:</b> โปรตอนในนิวเคลียสเพิ่มขึ้นทีละตัว แต่อิเล็กตรอนที่เพิ่มเข้ามาอยู่ใน<b>ชั้นเดิม</b> ไม่ได้เพิ่มชั้นบัง นิวเคลียสจึงดึงอิเล็กตรอนทั้งหมดเข้ามาแน่นขึ้น อะตอมเลยหดเล็กลง</p>
<p><b>ลงล่าง:</b> เพิ่มชั้นพลังงานใหม่ทั้งชั้น ระยะจากนิวเคลียสถึงชั้นนอกสุดเพิ่มขึ้นชัดเจน อะตอมจึงใหญ่ขึ้น (ผลของระยะทางชนะผลของโปรตอนที่เพิ่ม เพราะชั้นในช่วยบัง)</p>
<h4>พลังงานไอออไนเซชัน (IE)</h4>
<p>คือพลังงานที่ต้อง<b>ใส่เข้าไป</b>เพื่อดึงอิเล็กตรอนออกจากอะตอมในสถานะแก๊ส ยิ่งอะตอมเล็กและดึงแน่น ก็ยิ่งดึงออกยาก IE จึงสูง</p>
<div class="box why"><b>จุดที่โจทย์ชอบดัก</b> IE ลำดับที่ 1, 2, 3… ของอะตอมเดียวกันจะ<b>เพิ่มขึ้นเสมอ</b> และจะมีจุดที่<b>กระโดดสูงผิดปกติ</b> ตรงจุดนั้นคือกำลังจะดึงอิเล็กตรอนออกจากชั้นที่ครบ 8 แล้ว — ใช้ดูได้ว่าธาตุนั้นอยู่หมู่อะไร เช่น ถ้า IE₃ กระโดดสูงมาก แปลว่าธาตุนั้นมีเวเลนซ์อิเล็กตรอน 2 ตัว = หมู่ 2A</div>
<h4>อิเล็กโทรเนกาติวิตี (EN)</h4>
<p>คือความสามารถในการ<b>ดึงอิเล็กตรอนคู่ร่วมพันธะ</b>เข้าหาตัวเอง ต่างจาก IE ตรงที่ EN ใช้ตอนอะตอมจับพันธะกันแล้ว ไม่ใช่ตอนอยู่โดดเดี่ยว</p>
<p>ค่าสูงสุดคือ <b>F (4.0)</b> รองลงมา O (3.5), N และ Cl (3.0) แก๊สเฉื่อยไม่กำหนดค่า EN เพราะปกติไม่สร้างพันธะ</p>
<div class="box tip"><b>ใช้ต่อในบทพันธะเคมี</b> ผลต่าง EN คือตัวตัดสินชนิดพันธะ: ต่าง ≥ 1.7–1.8 → ไอออนิก, ต่าง 0.4–1.7 → โคเวเลนต์มีขั้ว, ต่าง &lt; 0.4 → โคเวเลนต์ไม่มีขั้ว</div>` },

    { type: "h2", text: "1.5 กฎออกเตต — หัวใจของทั้งบท" },
    { type: "callout", html: "อะตอมมีแนวโน้มจะปรับตัวให้มีเวเลนซ์อิเล็กตรอน <b>ครบ 8</b> เหมือนแก๊สเฉื่อย โดยการ <b>ให้</b> <b>รับ</b> หรือ <b>ใช้ร่วมกัน</b> — สามทางนี้คือที่มาของพันธะทั้งสามชนิด",
      detail: `<h3>กฎออกเตต (Octet rule)</h3>
${SVG_OCTET}
<p>แก๊สเฉื่อย (He, Ne, Ar, Kr…) แทบไม่ทำปฏิกิริยากับอะไรเลย เพราะชั้นนอกสุดเต็มพอดี (8 ตัว หรือ 2 ตัวสำหรับ He) ซึ่งเป็นการจัดเรียงที่พลังงานต่ำและเสถียรที่สุด ธาตุอื่นจึง "อยากเป็นแบบนั้นบ้าง" และมีอยู่ 3 วิธี</p>
<table><tr><th>วิธี</th><th>ใครทำ</th><th>ได้พันธะอะไร</th></tr>
<tr><td>ให้ e⁻ ทิ้งไป</td><td>โลหะ (EN ต่ำ)</td><td rowspan="2">พันธะไอออนิก</td></tr>
<tr><td>รับ e⁻ เข้ามา</td><td>อโลหะ (EN สูง)</td></tr>
<tr><td>ใช้ e⁻ ร่วมกัน</td><td>อโลหะ + อโลหะ</td><td>พันธะโคเวเลนต์</td></tr>
<tr><td>ปล่อย e⁻ ให้ไหลรวมกัน</td><td>โลหะ + โลหะ</td><td>พันธะโลหะ</td></tr></table>
<h4>ข้อยกเว้นที่ต้องรู้ (ออกสอบบ่อย)</h4>
<ul>
<li><b>ต่ำกว่าออกเตต</b> — BeCl₂ (Be มี 4 e⁻), BF₃ (B มี 6 e⁻) : อะตอมกลางเล็กและมีเวเลนซ์น้อย จะครบ 8 ต้องรับมากเกินไป</li>
<li><b>เกินออกเตต</b> — PCl₅ (P มี 10), SF₆ (S มี 12) : เกิดได้เฉพาะอะตอมกลางที่อยู่<b>คาบ 3 ลงไป</b> เพราะมีออร์บิทัล d ว่างให้ใช้เพิ่ม</li>
<li><b>อิเล็กตรอนเป็นเลขคี่</b> — NO (11 e⁻), NO₂ (17 e⁻) : จับคู่ไม่ครบ จึงว่องไวมาก</li>
</ul>
<div class="box warn"><b>ระวัง</b> ถ้าเจอ SF₆ หรือ PCl₅ แล้วตอบว่า "ผิดกฎออกเตตจึงเกิดไม่ได้" จะผิด — มันเกิดได้จริง กฎออกเตตเป็นแนวโน้ม ไม่ใช่กฎตายตัว</div>` },

    { type: "divider" },
    { type: "h1", text: "บทที่ 2 · พันธะไอออนิก" },
    { type: "callout", html: "พันธะไอออนิกคือ <b>แรงดึงดูดทางไฟฟ้าระหว่างไอออนบวกกับไอออนลบ</b> ไม่ได้เกิดจากการใช้อิเล็กตรอนร่วมกัน — จำประโยคนี้ให้แม่น แล้วเรื่องอื่นทั้งบทจะตามมาเอง" },

    { type: "h2", text: "2.1 การเกิดพันธะไอออนิก" },
    { type: "p", html: "เกิดระหว่าง <b>โลหะ (EN ต่ำ) + อโลหะ (EN สูง)</b> โลหะยอม<b>ให้</b>เวเลนซ์อิเล็กตรอนทิ้งไปจนครบออกเตต กลายเป็นไอออนบวก ส่วนอโลหะ<b>รับ</b>เข้ามาจนครบออกเตต กลายเป็นไอออนลบ แล้วไอออนต่างประจุจึงดูดกันด้วยแรงไฟฟ้าสถิต",
      detail: `<h3>2.1 การเกิดพันธะไอออนิก — เกิดขึ้นทีละขั้นอย่างไร</h3>
${SVG_OCTET}
<p>ลองดู NaCl เป็นตัวอย่างมาตรฐาน</p>
<ol>
<li><b>Na (2, 8, 1)</b> มีเวเลนซ์อิเล็กตรอน 1 ตัว ถ้าจะรับเพิ่มให้ครบ 8 ต้องรับถึง 7 ตัว ซึ่งยากมาก แต่ถ้า<b>ให้ทิ้งไปแค่ 1 ตัว</b> ชั้นที่ 2 ซึ่งมี 8 ตัวอยู่แล้วจะกลายเป็นชั้นนอกสุดทันที = ครบออกเตต ได้ Na⁺ (2, 8)</li>
<li><b>Cl (2, 8, 7)</b> ขาดอีกแค่ 1 ตัวก็ครบ 8 จึงรับ e⁻ ที่ Na ทิ้งมา ได้ Cl⁻ (2, 8, 8)</li>
<li>ตอนนี้มี Na⁺ กับ Cl⁻ ลอยอยู่ด้วยกัน <b>ประจุตรงข้ามจึงดูดกันด้วยแรงคูลอมบ์</b> — แรงนี้แหละคือพันธะไอออนิก</li>
</ol>
<div class="box why"><b>ทำไมต้องเป็นโลหะกับอโลหะ</b><br>
โลหะมี IE ต่ำ (ดึง e⁻ ออกง่าย) และ EN ต่ำ (ไม่หวง e⁻) ส่วนอโลหะมี EA คายมาก (อยากได้ e⁻) และ EN สูง (แย่งเก่ง) เมื่อสองฝ่ายนี้มาเจอกัน การ "ย้าย e⁻ ไปเลย" จึงคุ้มค่าพลังงานมากกว่าการมาแบ่งกันใช้</div>
<h4>เกณฑ์ผลต่าง EN</h4>
<p class="frm">ผลต่าง EN ≥ 1.7–1.8 → พันธะไอออนิก</p>
<p>เช่น NaCl : EN ของ Cl = 3.0, Na = 0.9 ผลต่าง = 2.1 → ไอออนิกชัดเจน ส่วน HCl : 3.0 − 2.1 = 0.9 → ไม่ถึงเกณฑ์ จึงเป็นโคเวเลนต์มีขั้ว</p>
<div class="box warn"><b>ระวัง จุดพลาดอันดับ 1</b><br>
สารประกอบไอออนิก <b>ไม่มีโมเลกุล</b> ผลึก NaCl คือ Na⁺ กับ Cl⁻ นับล้าน ๆ ไอออนเรียงสลับกันเป็น<b>โครงผลึกร่างตาข่าย (lattice)</b> ทั้งก้อน ไม่มีการจับคู่กันเป็นก้อนเล็ก ๆ ว่า "นี่คู่ของฉัน" เพราะฉะนั้นห้ามเรียก NaCl ว่า "โมเลกุล NaCl" เด็ดขาด</div>
<div class="box tip"><b>คำที่ต้องใช้ให้ถูก</b> สูตร NaCl เรียกว่า <b>สูตรเอมพิริคัล</b> หรือ "สูตรอย่างง่าย" บอกแค่<b>อัตราส่วนอย่างต่ำ</b>ของไอออนในผลึก (Na⁺ : Cl⁻ = 1 : 1) ไม่ได้บอกจำนวนอะตอมจริงในหนึ่งอนุภาค</div>` },
    { type: "code", text: "Na (2,8,1)  →  Na⁺ (2,8)  +  e⁻        ให้ 1 ตัว\nCl (2,8,7)  +  e⁻  →  Cl⁻ (2,8,8)      รับ 1 ตัว\nNa⁺  +  Cl⁻  →  NaCl (s)               ดูดกันด้วยแรงไฟฟ้า" },
    { type: "bullet", html: "ผลต่าง EN <b>≥ 1.7–1.8</b> → ไอออนิก (ถ้าน้อยกว่านี้จะกลายเป็นโคเวเลนต์มีขั้ว)" },
    { type: "bullet", html: "อนุภาคของสารประกอบไอออนิกคือ <b>ไอออน</b> ไม่ใช่โมเลกุล — เรียงกันเป็นโครงผลึกร่างตาข่ายทั้งก้อน" },
    { type: "bullet", html: "สูตรที่เขียน เช่น NaCl, MgCl₂ เป็น <b>สูตรเอมพิริคัล</b> บอกอัตราส่วนอย่างต่ำของไอออนเท่านั้น" },

    { type: "h2", text: "2.2 สูตรและการอ่านชื่อสารประกอบไอออนิก" },
    { type: "p", html: "หลักเดียวของการเขียนสูตรคือ <b>ประจุรวมต้องเป็นศูนย์</b> วิธีเร็วที่สุดคือ <b>ไขว้เลขประจุ</b> แล้วทอนเป็นอัตราส่วนอย่างต่ำ" },
    { type: "code", text: "A^(m+)  กับ  B^(n−)     →     A_n B_m   (ไขว้ตัวเลขประจุลงมาเป็นตัวห้อย)\n\nAl³⁺ + O²⁻   →  Al₂O₃          (ไขว้ 3 กับ 2)\nCa²⁺ + CO₃²⁻ →  CaCO₃          (2 กับ 2 ทอนเหลือ 1 : 1)\nBa²⁺ + HSO₄⁻ →  Ba(HSO₄)₂      (กลุ่มไอออนที่มีตัวห้อย ต้องใส่วงเล็บ)" },
    { type: "table", rows: [
      ["ประจุ", "ไอออนบวกที่ต้องจำ"],
      ["+1", "Li⁺, Na⁺, K⁺, Ag⁺, Cu⁺, NH₄⁺, Hg⁺"],
      ["+2", "Mg²⁺, Ca²⁺, Ba²⁺, Sr²⁺, Zn²⁺, Pb²⁺, Cu²⁺, Co²⁺, Fe²⁺, Sn²⁺, Mn²⁺, Hg²⁺, Cr²⁺"],
      ["+3", "Al³⁺, Cr³⁺, Fe³⁺, Sc³⁺"],
      ["+4", "Pb⁴⁺, Sn⁴⁺, Mn⁴⁺"],
      ["+7", "Mn⁷⁺"]
    ], detail: `<h3>2.2.1 ตารางไอออนบวกที่ต้องจำ</h3>
<p>ไอออนบวกส่วนใหญ่ทำนายได้จากเลขหมู่ แต่<b>โลหะทรานซิชัน</b>ทำนายไม่ได้ ต้องจำ — และนั่นคือเหตุผลที่ชื่อของมันต้องมีเลขโรมันกำกับ</p>
<h4>กลุ่มที่ทำนายได้จากหมู่ (ไม่ต้องจำ)</h4>
<table><tr><th>หมู่</th><th>ประจุ</th><th>ตัวอย่าง</th></tr>
<tr><td>1A</td><td>+1</td><td>Li⁺ Na⁺ K⁺ Rb⁺</td></tr>
<tr><td>2A</td><td>+2</td><td>Mg²⁺ Ca²⁺ Ba²⁺ Sr²⁺</td></tr>
<tr><td>3A</td><td>+3</td><td>Al³⁺</td></tr></table>
<h4>กลุ่มที่ต้องจำ (ทรานซิชัน + หมู่ 4A บางตัว)</h4>
<table><tr><th>ธาตุ</th><th>ประจุที่พบ</th><th>อ่านชื่อว่า</th></tr>
<tr><td>Fe</td><td>Fe²⁺ / Fe³⁺</td><td>iron(II) / iron(III)</td></tr>
<tr><td>Cu</td><td>Cu⁺ / Cu²⁺</td><td>copper(I) / copper(II)</td></tr>
<tr><td>Cr</td><td>Cr²⁺ / Cr³⁺</td><td>chromium(II) / chromium(III)</td></tr>
<tr><td>Mn</td><td>Mn²⁺ / Mn⁴⁺ / Mn⁷⁺</td><td>manganese(II) / (IV) / (VII)</td></tr>
<tr><td>Pb, Sn</td><td>+2 / +4</td><td>lead(II)/(IV), tin(II)/(IV)</td></tr>
<tr><td>Hg</td><td>Hg⁺ / Hg²⁺</td><td>mercury(I) / mercury(II)</td></tr></table>
<div class="box tip"><b>3 ตัวที่ประจุคงที่ ไม่ต้องใส่เลขโรมัน</b><br>
<b>Ag⁺ , Zn²⁺ , Sc³⁺</b> — ถึงจะเป็นทรานซิชันก็มีประจุได้แบบเดียว จึงไม่มีอะไรให้สับสน เขียนว่า silver sulfate, zinc chloride ได้เลย ไม่ต้องเป็น silver(I) sulfate</div>
<div class="box warn"><b>NH₄⁺ ไม่ใช่โลหะ</b> แอมโมเนียมไอออนเป็นกลุ่มอะตอมของอโลหะล้วน แต่มีประจุบวกรวม จึงทำหน้าที่เป็นไอออนบวกในสารประกอบไอออนิกได้ เช่น NH₄Cl, (NH₄)₃PO₄</div>` },
    { type: "table", rows: [
      ["ประจุ", "ไอออนลบที่ต้องจำ"],
      ["−1", "F⁻ Cl⁻ Br⁻ I⁻ · NO₃⁻ NO₂⁻ · OH⁻ CN⁻ · HCO₃⁻ HSO₄⁻ HSO₃⁻ H₂PO₄⁻ · ClO⁻ ClO₂⁻ ClO₃⁻ ClO₄⁻ · MnO₄⁻"],
      ["−2", "O²⁻ S²⁻ · SO₄²⁻ SO₃²⁻ S₂O₃²⁻ · CO₃²⁻ · HPO₄²⁻ · CrO₄²⁻ Cr₂O₇²⁻ MnO₄²⁻"],
      ["−3", "N³⁻ P³⁻ · PO₄³⁻"]
    ], detail: `<h3>2.2.2 ตารางไอออนลบ และวิธีอ่านชื่อให้ไม่งง</h3>
<p>ไอออนลบแบ่งเป็น 2 พวก และเสียงลงท้ายบอกได้ว่าอยู่พวกไหน</p>
<h4>พวกที่ 1 — อะตอมเดี่ยว ลงท้าย "–ide" (ไ-ด์)</h4>
<table><tr><th>ไอออน</th><th>ชื่อ</th><th>มาจากหมู่</th></tr>
<tr><td>F⁻ Cl⁻ Br⁻ I⁻</td><td>fluoride, chloride, bromide, iodide</td><td>7A (รับ 1)</td></tr>
<tr><td>O²⁻ S²⁻</td><td>oxide, sulfide</td><td>6A (รับ 2)</td></tr>
<tr><td>N³⁻ P³⁻</td><td>nitride, phosphide</td><td>5A (รับ 3)</td></tr></table>
<p>สังเกตว่าประจุของพวกนี้เท่ากับ <b>8 − เลขหมู่</b> พอดี ไม่ต้องท่อง</p>
<h4>พวกที่ 2 — กลุ่มอะตอมที่มีออกซิเจน ลงท้าย "–ate" หรือ "–ite"</h4>
<p class="frm">ตัวที่มีออกซิเจน<b>มากกว่า</b> = –ate &nbsp;·&nbsp; ตัวที่มีออกซิเจน<b>น้อยกว่า</b> = –ite</p>
<table><tr><th>–ate (O มากกว่า)</th><th>–ite (O น้อยกว่า)</th></tr>
<tr><td>NO₃⁻ nitrate</td><td>NO₂⁻ nitrite</td></tr>
<tr><td>SO₄²⁻ sulfate</td><td>SO₃²⁻ sulfite</td></tr>
<tr><td>ClO₃⁻ chlorate</td><td>ClO₂⁻ chlorite</td></tr></table>
<p>ตระกูลคลอรีนมีถึง 4 ตัว จึงเติมคำนำหน้าเพิ่ม: <b>ClO⁻</b> hypochlorite (น้อยสุด) → <b>ClO₂⁻</b> chlorite → <b>ClO₃⁻</b> chlorate → <b>ClO₄⁻</b> perchlorate (มากสุด)</p>
<div class="box tip"><b>คำว่า hydrogen ข้างหน้าแปลว่าอะไร</b><br>
HCO₃⁻ = hydrogen carbonate คือ CO₃²⁻ ที่มี H⁺ มาเกาะ 1 ตัว ประจุจึงลดจาก −2 เหลือ −1 หลักเดียวกันกับ HSO₄⁻ (จาก SO₄²⁻) และ H₂PO₄⁻ / HPO₄²⁻ (จาก PO₄³⁻)</div>
<div class="box warn"><b>ตัวที่คนสับสนที่สุด</b><br>
• <b>MnO₄⁻</b> permanganate (−1) กับ <b>MnO₄²⁻</b> manganate (−2) ต่างกันแค่ประจุ<br>
• <b>CrO₄²⁻</b> chromate กับ <b>Cr₂O₇²⁻</b> dichromate — "di" มาจาก Cr 2 ตัว<br>
• <b>S₂O₃²⁻</b> thiosulfate คือ SO₄²⁻ ที่เอา O ออก 1 ตัวแล้วใส่ S แทน</div>` },
    { type: "table", rows: [
      ["ข้อ", "หลักการอ่านชื่อ", "ตัวอย่าง"],
      ["1", "อ่านชื่อไอออนบวกก่อน แล้วตามด้วยไอออนลบ", "NaCl → sodium chloride"],
      ["2", "ไอออนลบที่เป็นอะตอมเดี่ยว ลงท้าย \"–ide\"", "CaBr₂ → calcium bromide"],
      ["3", "ไม่อ่านตัวเลขห้อย (ไม่มี di- tri- แบบโคเวเลนต์)", "CaBr₂ ไม่ใช่ calcium dibromide"],
      ["4", "กลุ่มอะตอม ตัดคำว่า \"ไอออน\" ออก อ่านตามเสียงลงท้ายของมัน", "CaCO₃ → calcium carbonate"],
      ["5", "ทรานซิชัน / 4A บางตัว ต้องใส่เลขออกซิเดชันเป็นเลขโรมัน", "Fe(HCO₃)₂ → iron(II) hydrogencarbonate"],
      ["6", "ทรานซิชันที่ประจุคงที่ (Ag⁺ Zn²⁺ Sc³⁺) ไม่ต้องใส่เลขโรมัน", "Ag₂SO₄ → silver sulfate"]
    ], detail: `<h3>2.2.3 หลักการอ่านชื่อ 6 ข้อ — พร้อมตัวอย่างครบชุด</h3>
<p>ลำดับการคิดที่เร็วที่สุดคือ: <b>ดูไอออนบวกว่าต้องใส่เลขโรมันไหม → อ่านชื่อไอออนบวก → อ่านชื่อไอออนลบ</b> จบ</p>
<h4>ตัวอย่างไล่จากง่ายไปยาก</h4>
<table><tr><th>ไอออนที่ให้</th><th>สูตร</th><th>ชื่อ</th><th>ใช้ข้อไหน</th></tr>
<tr><td>Na⁺ + Cl⁻</td><td>NaCl</td><td>sodium chloride</td><td>1, 2</td></tr>
<tr><td>Ca²⁺ + Br⁻</td><td>CaBr₂</td><td>calcium bromide</td><td>1, 2, 3</td></tr>
<tr><td>K⁺ + MnO₄⁻</td><td>KMnO₄</td><td>potassium permanganate</td><td>4</td></tr>
<tr><td>Ca²⁺ + CO₃²⁻</td><td>CaCO₃</td><td>calcium carbonate</td><td>4 (ทอน 2:2 เหลือ 1:1)</td></tr>
<tr><td>NH₄⁺ + OH⁻</td><td>NH₄OH</td><td>ammonium hydroxide</td><td>4</td></tr>
<tr><td>Ba²⁺ + HSO₄⁻</td><td>Ba(HSO₄)₂</td><td>barium hydrogensulfate</td><td>4 + วงเล็บ</td></tr>
<tr><td>K⁺ + PO₄³⁻</td><td>K₃PO₄</td><td>potassium phosphate</td><td>4</td></tr>
<tr><td>Al³⁺ + Cr₂O₇²⁻</td><td>Al₂(Cr₂O₇)₃</td><td>aluminium dichromate</td><td>4 + วงเล็บ</td></tr>
<tr><td>Fe²⁺ + HCO₃⁻</td><td>Fe(HCO₃)₂</td><td>iron(II) hydrogencarbonate</td><td>5</td></tr>
<tr><td>Pb⁴⁺ + SO₄²⁻</td><td>Pb(SO₄)₂</td><td>lead(IV) sulfate</td><td>5</td></tr>
<tr><td>Mn⁷⁺ + O²⁻</td><td>Mn₂O₇</td><td>manganese(VII) oxide</td><td>5</td></tr>
<tr><td>Ag⁺ + SO₄²⁻</td><td>Ag₂SO₄</td><td>silver sulfate</td><td>6</td></tr></table>
<div class="box why"><b>เลขโรมันคือเลขอะไรกันแน่</b><br>
เป็น<b>ประจุของไอออนบวก</b> ไม่ใช่จำนวนอะตอม ถ้าโจทย์ให้สูตรมาแล้วถามชื่อ ให้คิดย้อน: Fe₂O₃ มี O²⁻ 3 ตัว = ประจุลบรวม −6 ต้องมีบวกรวม +6 หารด้วย Fe 2 ตัว → Fe³⁺ จึงอ่านว่า iron(III) oxide</div>
<div class="box warn"><b>ห้ามใส่ di- tri- เด็ดขาด</b><br>
CaCl₂ อ่านว่า calcium chloride ไม่ใช่ calcium dichloride — คำนำหน้า mono/di/tri ใช้กับสารประกอบ<b>โคเวเลนต์</b>เท่านั้น (เช่น CO₂ = carbon dioxide) เพราะสารไอออนิกอัตราส่วนถูกบังคับด้วยประจุอยู่แล้ว รู้ไอออนก็รู้สูตร ไม่ต้องบอกซ้ำ</div>
<div class="box tip"><b>วงเล็บใส่เมื่อไหร่</b> ใส่เมื่อ<b>กลุ่มอะตอมมีตัวห้อยมากกว่า 1</b> เท่านั้น เช่น Al(OH)₃ ต้องมีวงเล็บ แต่ AlPO₄ ไม่ต้อง เพราะ PO₄ มีแค่ 1 กลุ่ม</div>` },
    { type: "quote", text: "ฝึกเอง: Ba²⁺+S²⁻ → BaS barium sulfide | Al³⁺+OH⁻ → Al(OH)₃ aluminium hydroxide | Rb⁺+SO₄²⁻ → Rb₂SO₄ rubidium sulfate | NH₄⁺+PO₄³⁻ → (NH₄)₃PO₄ ammonium phosphate" },

    { type: "h2", text: "2.3 วัฏจักรบอร์น–ฮาเบอร์ (Born–Haber cycle)" },
    { type: "p", html: "การเกิด NaCl(s) จาก Na(s) กับ Cl₂(g) คายพลังงานรวม <b>412 kJ/mol</b> แต่ระหว่างทางไม่ได้คายรวดเดียว — มันมี 5 ขั้นย่อย บางขั้นดูด บางขั้นคาย วัฏจักรบอร์น–ฮาเบอร์คือการแตกทางเดินนี้ออกมาให้เห็นทีละขั้น เพื่อ<b>หาค่าพลังงานโครงผลึก (U)</b> ที่วัดตรง ๆ ไม่ได้" },
    { type: "code", text: "H_f  =  H_s  +  IE  +  D  +  EA  +  U\n\nH_f = พลังงานการเกิด (heat of formation)\nH_s = พลังงานการระเหิด (sublimation)\nIE  = พลังงานไอออไนเซชัน\nD   = พลังงานสลายพันธะ (dissociation)\nEA  = สัมพรรคภาพอิเล็กตรอน\nU   = พลังงานโครงผลึก (lattice energy)" },
    { type: "table", rows: [
      ["ขั้น", "สมการ", "ดูด/คาย", "ค่า (kJ/mol)"],
      ["1. H_s ระเหิด", "Na(s) → Na(g)", "ดูด", "+107"],
      ["2. IE ไอออไนซ์", "Na(g) → Na⁺(g) + e⁻", "ดูด", "+496"],
      ["3. D สลายพันธะ", "½Cl₂(g) → Cl(g)", "ดูด", "+121 (= 242 ÷ 2)"],
      ["4. EA รับอิเล็กตรอน", "Cl(g) + e⁻ → Cl⁻(g)", "คาย", "−349"],
      ["5. U รวมเป็นผลึก", "Na⁺(g) + Cl⁻(g) → NaCl(s)", "คาย", "−787 (คำตอบ)"],
      ["รวม H_f", "Na(s) + ½Cl₂(g) → NaCl(s)", "คาย", "−412"]
    ], detail: `<h3>2.3 วัฏจักรบอร์น–ฮาเบอร์ของ NaCl — อ่านแผนภาพทีละขั้น</h3>
${SVG_BORN}
<p>แนวคิดหลัก: พลังงานเป็น<b>ฟังก์ชันสถานะ</b> เดินจากจุดเริ่มต้นไปจุดจบทางไหนก็ตาม พลังงานรวมต้องเท่ากันเสมอ (กฎของเฮสส์) เราจึงเดินทางอ้อมผ่าน 5 ขั้น แล้วเอาผลรวมไปเท่ากับ H_f ที่วัดได้จริง</p>
<h4>ขั้นที่ 1 · H_s = +107 — ดูด</h4>
<p>โซเดียมในธรรมชาติเป็นของแข็ง ต้องทำให้เป็นแก๊สเดี่ยว ๆ ก่อน การแยกอะตอมออกจากผลึกโลหะต้องฝืนพันธะโลหะ จึง<b>ดูดพลังงาน</b></p>
<h4>ขั้นที่ 2 · IE = +496 — ดูด</h4>
<p>ดึง e⁻ ออกจาก Na(g) เป็นการฝืนแรงดึงดูดของนิวเคลียส ต้องใส่พลังงานเข้าไปเสมอ <b>IE เป็นบวกเสมอ</b> ไม่มีข้อยกเว้น</p>
<h4>ขั้นที่ 3 · D = +121 — ดูด และ<b>ต้องหารสอง</b></h4>
<div class="box why"><b>ทำไม D ต้องหารสอง</b><br>
ค่าพลังงานพันธะที่ให้มาคือ 242 kJ/mol สำหรับ <b>Cl₂(g) → 2Cl(g)</b> คือสลาย 1 โมลของ Cl₂ แล้วได้ Cl <b>2 โมล</b><br>
แต่ NaCl 1 โมลใช้ Cl⁻ แค่ <b>1 โมล</b> จึงใช้ Cl₂ แค่ครึ่งโมล<br>
สมการที่เราต้องการคือ <b>½Cl₂(g) → Cl(g)</b> พลังงานจึงเป็นครึ่งหนึ่ง = 242 ÷ 2 = <b>121 kJ/mol</b><br>
สังเกตได้จากสมการรวม H_f ที่เขียนว่า Na(s) + <b>½</b>Cl₂(g) → NaCl(s) — มีเลข ½ อยู่ตรงนั้นแล้ว</div>
<h4>ขั้นที่ 4 · EA = −349 — คาย</h4>
<p>Cl(g) ขาด e⁻ อีก 1 ตัวก็ครบ 8 การรับ e⁻ เข้ามาทำให้เสถียรขึ้น จึง<b>คายพลังงานออก</b> ค่าจึงติดลบ</p>
<h4>ขั้นที่ 5 · U = ? — คาย (สิ่งที่โจทย์ถาม)</h4>
<p>Na⁺(g) กับ Cl⁻(g) ที่ลอยอยู่แยกกันมารวมเป็นผลึก แรงดึงดูดไฟฟ้ามหาศาลทำให้ระบบเสถียรขึ้นมาก จึงคายพลังงานเยอะที่สุดในวัฏจักร</p>
<h4>แทนค่า</h4>
<pre>H_f = H_s + IE + D + EA + U
−412 = 107 + 496 + 121 + (−349) + U
−412 = 375 + U
   U = −412 − 375 = <b>−787 kJ/mol</b></pre>
<div class="box warn"><b>จุดที่คนพลาดบ่อย 3 จุด</b><br>
1. ลืมหาร D ด้วย 2 → ได้ U = −908 ผิด<br>
2. ใส่ EA เป็น +349 → ต้องเป็น <b>ลบ</b> เพราะคายพลังงาน<br>
3. ย้ายข้างผิดเครื่องหมาย — จำว่า <b>U = H_f − (H_s + IE + D + EA)</b></div>
<div class="box tip"><b>เช็กคำตอบเร็ว ๆ</b> U ต้องเป็น<b>ลบ</b> และ<b>ค่ามากที่สุด</b>ในวัฏจักรเสมอ ถ้าได้บวกหรือได้ค่าน้อยกว่า IE แสดงว่าคิดผิดแน่นอน</div>` },
    { type: "callout", html: "แทนค่า: −412 = 107 + 496 + 121 − 349 + U → −412 = 375 + U → <b>U = −787 kJ/mol</b> — ค่าติดลบมากที่สุดในวัฏจักรเสมอ เพราะการรวมไอออนเป็นผลึกคือขั้นที่ทำให้ระบบเสถียรที่สุด" },

    { type: "h2", text: "2.4 สมบัติของสารประกอบไอออนิก" },
    { type: "table", rows: [
      ["สมบัติ", "เป็นอย่างไร", "เพราะอะไร"],
      ["สถานะ", "ของแข็งที่อุณหภูมิห้อง", "ไอออนถูกตรึงในโครงผลึก เคลื่อนที่ไม่ได้"],
      ["การนำไฟฟ้า", "ของแข็ง: ไม่นำ · หลอมเหลว/ละลายน้ำ: นำ", "ต้องมีไอออนที่เคลื่อนที่ได้ จึงจะนำไฟฟ้า"],
      ["ความแข็ง–เปราะ", "แข็งแต่เปราะ ทุบแล้วแตก", "ชั้นไอออนเลื่อน → ประจุเหมือนกันมาเจอกัน → ผลักกัน"],
      ["จุดหลอมเหลว/จุดเดือด", "สูงมาก (แต่ยังต่ำกว่าพันธะโลหะบางชนิด)", "ต้องฝืนแรงดึงดูดไฟฟ้าทั้งผลึกพร้อมกัน"],
      ["การละลายน้ำ", "หลายตัวละลายได้ดี บางตัวไม่ละลาย", "ขึ้นกับการแข่งกันของ lattice กับ hydration energy"],
      ["ความเป็นกรด-เบส", "ได้สารละลายเบสหรือกลาง", "ขึ้นกับว่าไอออนที่ได้ทำปฏิกิริยากับน้ำหรือไม่"]
    ], detail: `<h3>2.4 สมบัติของสารประกอบไอออนิก — อธิบายด้วยกลไก ไม่ใช่ท่องจำ</h3>
<h4>1) ทำไมของแข็งไม่นำไฟฟ้า แต่หลอมเหลวหรือละลายน้ำแล้วนำ</h4>
<p>การนำไฟฟ้าต้องมี<b>ตัวนำประจุที่เคลื่อนที่ได้</b> สารประกอบไอออนิกไม่มีอิเล็กตรอนอิสระเหมือนโลหะ ตัวนำประจุของมันคือ<b>ตัวไอออนเอง</b></p>
<table><tr><th>สถานะ</th><th>ไอออนเคลื่อนที่ได้ไหม</th><th>นำไฟฟ้า</th></tr>
<tr><td>ของแข็ง</td><td>ไม่ได้ — ถูกล็อกในโครงผลึก สั่นได้แต่ย้ายที่ไม่ได้</td><td>ไม่นำ</td></tr>
<tr><td>หลอมเหลว</td><td>ได้ — ความร้อนทำลายโครงผลึกจนไอออนไหลได้</td><td>นำ</td></tr>
<tr><td>ละลายน้ำ</td><td>ได้ — โมเลกุลน้ำแยกไอออนออกจากกันแล้วล้อมไว้</td><td>นำ</td></tr></table>
<h4>2) ทำไมถึงแข็งแต่เปราะ</h4>
${SVG_BRITTLE}
<p>ในผลึกปกติ ไอออนบวกกับลบเรียงสลับกันอย่างเป็นระเบียบ ทุกคู่ที่อยู่ติดกันเป็นประจุตรงข้ามกัน จึงดูดกันแน่นมาก — นี่คือเหตุผลที่มัน<b>แข็ง</b></p>
<div class="box why"><b>แล้วทำไมทุบแล้วแตก</b><br>
เมื่อโดนแรงกระแทก ชั้นของไอออนจะ<b>เลื่อนไปครึ่งช่อง</b> ทันใดนั้นไอออนบวกก็มาอยู่ตรงกับไอออนบวก และลบตรงกับลบ<br>
จากที่เคยดูดกัน กลายเป็น<b>ผลักกันทั้งระนาบพร้อมกัน</b> ผลึกจึงแยกออกเป็นรอยแตกเรียบ ๆ ทันที ไม่ใช่ยืดหรือบุบ</div>
<p>เทียบกับ<b>โลหะ</b>: เลื่อนชั้นแล้วไม่แตก เพราะทะเลอิเล็กตรอนไหลตามไปยึดไอออนบวกไว้ได้เหมือนเดิม โลหะจึงตีแผ่ได้ แต่สารไอออนิกทำไม่ได้</p>
<h4>3) ทำไมจุดหลอมเหลวถึงสูงมาก</h4>
<p>จะหลอมสารไอออนิก ต้องให้ความร้อนมากพอที่จะทำลาย<b>แรงดึงดูดไฟฟ้าทั้งโครงผลึก</b> ไม่ใช่แค่คู่เดียว เพราะทุกไอออนถูกดึงจากเพื่อนบ้านหลายตัวรอบทิศ NaCl จึงหลอมที่ราว 801 °C</p>
<p class="frm">แรงดึงดูด ∝ (ประจุ × ประจุ) ÷ ระยะห่าง²</p>
<p>ดังนั้น <b>ประจุยิ่งมาก จุดหลอมเหลวยิ่งสูง</b> เช่น MgO (Mg²⁺ กับ O²⁻) หลอมที่ประมาณ 2,852 °C สูงกว่า NaCl มาก เพราะประจุทั้งคู่เป็น 2 และไอออนก็เล็กกว่าด้วย</p>
<h4>4) ความเป็นกรด–เบสของสารละลาย</h4>
<table><tr><th>ชนิดสาร</th><th>สารละลายที่ได้</th><th>ตัวอย่าง</th></tr>
<tr><td>โลหะหมู่ 1A/2A + OH⁻</td><td><b>เบส</b></td><td>NaOH, Ca(OH)₂</td></tr>
<tr><td>ออกไซด์ของโลหะหมู่ 1A/2A</td><td><b>เบส</b> (ทำปฏิกิริยากับน้ำได้ OH⁻)</td><td>Na₂O + H₂O → 2NaOH</td></tr>
<tr><td>โลหะหมู่ 1A/2A + อโลหะหมู่ 7A</td><td><b>กลาง</b> (เกลือแท้)</td><td>NaCl, KBr, CaCl₂</td></tr></table>
<div class="box tip"><b>ทริคคิดเร็ว</b> ถามตัวเองว่า "ไอออนที่ได้ไปแย่ง H⁺ หรือปล่อย OH⁻ ในน้ำไหม" — Cl⁻ ไม่ทำอะไรเลย (เบสอ่อนมากของกรดแก่) จึงได้กลาง ส่วน O²⁻ แย่ง H⁺ จากน้ำได้เก่ง เกิด OH⁻ จึงได้เบส</div>` },
    { type: "p", html: "จำเป็นคู่: <b>ไอออนิกเปราะ</b> เพราะเลื่อนชั้นแล้วประจุเหมือนกันผลักกัน · <b>โลหะตีแผ่ได้</b> เพราะเลื่อนชั้นแล้วทะเลอิเล็กตรอนไหลตามไปยึดไว้" },

    { type: "h2", text: "2.5 พลังงานการละลาย: Lattice กับ Hydration" },
    { type: "p", html: "เวลาสารไอออนิกละลายน้ำ มีพลังงาน 2 ก้อนแข่งกันเสมอ — ก้อนแรก<b>ดูด</b>เพื่อพังผลึก (lattice energy) ก้อนที่สอง<b>คาย</b>เพราะน้ำเข้าไปล้อมไอออน (hydration energy) ผลลัพธ์สุทธิตัดสินว่าละลายแล้วร้อนขึ้นหรือเย็นลง",
      detail: `<h3>2.5 พลังงานการละลาย — สองก้อนที่แข่งกัน</h3>
${SVG_SOLN}
<h4>ขั้นที่ 1 · Lattice energy — ดูดเสมอ</h4>
<pre>AB(s) → A⁺(g) + B⁻(g)    ;  ΔH₁ = +U  (ดูด)</pre>
<p>จะให้ไอออนแยกออกจากผลึกได้ ต้องฝืนแรงดึงดูดไฟฟ้าที่ยึดกันอยู่ จึงต้อง<b>ใส่พลังงานเข้าไป</b> ขั้นนี้เป็นบวกเสมอ</p>
<h4>ขั้นที่ 2 · Hydration energy — คายเสมอ</h4>
<pre>A⁺(g) + B⁻(g) --H₂O--> A⁺(aq) + B⁻(aq)  ;  ΔH₂ = −Y  (คาย)</pre>
<p>น้ำเป็นโมเลกุลมีขั้ว ปลาย O (ลบ) หันเข้าหาไอออนบวก ปลาย H (บวก) หันเข้าหาไอออนลบ เกิดแรงดึงดูดใหม่ ระบบเสถียรขึ้น จึง<b>คายพลังงาน</b> ขั้นนี้เป็นลบเสมอ</p>
<p class="frm">ΔH_soln = U + ΔH_hydr</p>
<h4>4 กรณีที่ต้องแยกให้ออก</h4>
<table><tr><th>เปรียบเทียบ</th><th>ΔH_soln</th><th>อุณหภูมิสารละลาย</th><th>ละลายดีขึ้นเมื่อ</th></tr>
<tr><td>Lattice &gt; Hydration</td><td>เป็นบวก = <b>ดูดพลังงาน</b></td><td><b>ลดลง</b> (เย็นลง)</td><td>T <b>สูง</b>ขึ้น</td></tr>
<tr><td>Lattice &lt; Hydration</td><td>เป็นลบ = <b>คายพลังงาน</b></td><td><b>เพิ่มขึ้น</b> (ร้อนขึ้น)</td><td>T <b>ต่ำ</b>ลง</td></tr>
<tr><td>Lattice = Hydration</td><td>เป็นศูนย์</td><td>ไม่เปลี่ยน</td><td>T ไม่มีผล</td></tr>
<tr><td>Lattice &gt;&gt;&gt; Hydration</td><td>บวกมาก</td><td>—</td><td><b>ไม่ละลายน้ำ</b> / ละลายน้อยมาก</td></tr></table>
<div class="box why"><b>ทำไมดูดพลังงานแล้วละลายดีขึ้นเมื่อร้อน</b><br>
ถ้าการละลายต้อง "ขอยืม" ความร้อนจากสิ่งแวดล้อม การเพิ่มอุณหภูมิก็คือการ<b>เติมสิ่งที่มันต้องการ</b>เข้าไปให้ ปฏิกิริยาจึงเดินหน้าได้มากขึ้น<br>
กลับกัน ถ้าการละลายคายความร้อนออก การเพิ่มอุณหภูมิเท่ากับไป<b>ยัดของที่มันอยากปล่อยทิ้ง</b>กลับเข้าไป การละลายจึงเกิดได้น้อยลง<br>
(นี่คือหลักเลอชาเตอลิเยร์ ที่จะเรียนละเอียดในบทสมดุลเคมี)</div>
<h4>ตัวอย่างจริง: NaCl</h4>
<pre>ขั้น 1  Lattice energy      U        = +788 kJ/mol   (ดูด)
ขั้น 2  Hydration energy   ΔH_hydr  = −784 kJ/mol   (คาย)
รวม     ΔH_soln = 788 + (−784)      = <b>+4 kJ/mol</b>   (ดูดนิดเดียว)</pre>
<p>เป็นบวกนิดเดียว แปลว่า NaCl <b>ละลายน้ำได้ดี</b> และละลายแล้วน้ำ<b>เย็นลงเล็กน้อยมาก</b>จนแทบไม่รู้สึก — ตรงกับประสบการณ์จริงเวลาเราละลายเกลือ</p>
<div class="box warn"><b>เครื่องหมายของ U สับสนตรงไหน</b><br>
ในบอร์น–ฮาเบอร์ U = <b>−787</b> เพราะเขียนทิศ Na⁺(g) + Cl⁻(g) → NaCl(s) (<b>สร้าง</b>ผลึก = คาย)<br>
ในเรื่องการละลาย U = <b>+788</b> เพราะเขียนทิศกลับกัน NaCl(s) → Na⁺(g) + Cl⁻(g) (<b>พัง</b>ผลึก = ดูด)<br>
เป็นค่าเดียวกัน แค่กลับทิศสมการจึงกลับเครื่องหมาย ให้ดู<b>ทิศของลูกศรในสมการ</b>ก่อนเสมอ (ตัวเลข 787 กับ 788 ต่างกันเพราะเป็นค่าจากคนละแหล่งวัด ถือว่าค่าเดียวกัน)</div>` },
    { type: "code", text: "ΔH_soln  =  U  +  ΔH_hydr\n\nNaCl :   U = +788   ΔH_hydr = −784\n         ΔH_soln = 788 − 784 = +4 kJ/mol   (ดูดพลังงานเล็กน้อย)" },
    { type: "table", rows: [
      ["ถ้า", "ΔH_soln", "อุณหภูมิสารละลาย", "อุณหภูมิสูงขึ้นแล้ว"],
      ["Lattice > Hydration", "+ ดูดพลังงาน", "ลดลง (เย็นลง)", "ละลายได้ดีขึ้น"],
      ["Lattice < Hydration", "− คายพลังงาน", "เพิ่มขึ้น (ร้อนขึ้น)", "ละลายได้น้อยลง"],
      ["Lattice = Hydration", "0", "ไม่เปลี่ยน", "ไม่มีผล"],
      ["Lattice >>> Hydration", "+ มาก", "—", "ไม่ละลายน้ำ"]
    ] },

    { type: "h2", text: "2.6 สภาพการละลายและสมการไอออนิกสุทธิ" },
    { type: "table", rows: [
      ["เกณฑ์", "ละลายได้เท่าไรในน้ำ 100 g"],
      ["ละลายได้ดี", "มากกว่า 1 กรัม"],
      ["ละลายได้บ้าง / ได้น้อย", "0.1 ถึง 1 กรัม"],
      ["ไม่ละลาย", "น้อยกว่า 0.1 กรัม"]
    ] },
    { type: "table", rows: [
      ["ข้อ", "หลักการดูตารางการละลาย", "ข้อยกเว้น"],
      ["1", "หมู่ 1A (Li⁺ Na⁺ K⁺) และ NH₄⁺ — ละลายหมด", "ไม่มี"],
      ["2", "NO₃⁻ , NO₂⁻ , ClO₃⁻ — ละลายหมด", "ไม่มี"],
      ["3", "ไอออนลบ −1 จากหมู่ 7A (Cl⁻ Br⁻ I⁻) — ละลายเกือบหมด", "ยกเว้นจับกับ Ag⁺ , Hg²⁺ , Pb²⁺"],
      ["4", "SO₄²⁻ — ละลายเป็นส่วนใหญ่", "ยกเว้น Ba²⁺ Sr²⁺ Pb²⁺ (ไม่ละลาย) และ Ca²⁺ Ag⁺ (ละลายเล็กน้อย)"],
      ["5", "CO₃²⁻ , PO₄³⁻ , SO₃²⁻ — ส่วนใหญ่ไม่ละลาย", "ยกเว้นจับกับหมู่ 1A และ NH₄⁺"],
      ["6", "S²⁻ , O²⁻ , OH⁻ จับกับโลหะทรานซิชัน — ไม่ละลาย", "ยกเว้นจับกับหมู่ 1A และ NH₄⁺"]
    ], detail: `<h3>2.6.1 ตารางการละลาย — วิธีจำที่ไม่ต้องท่องทั้งตาราง</h3>
<p>ตารางการละลายมีเป็นร้อยช่อง แต่จริง ๆ จำแค่ 6 บรรทัดก็ตอบโจทย์ได้เกือบหมด ลำดับการคิดคือ <b>ดูไอออนบวกก่อน ถ้าไม่ชี้ขาดค่อยดูไอออนลบ</b></p>
<h4>ขั้นที่ 1 — ดูไอออนบวก (ตัดจบได้ทันที)</h4>
<div class="box tip"><b>เจอ Li⁺ Na⁺ K⁺ Rb⁺ หรือ NH₄⁺ → ละลายแน่นอน</b> ไม่ต้องดูอะไรต่อ ไม่มีข้อยกเว้น<br>
นี่คือเหตุผลที่โจทย์ตกตะกอนชอบให้ NaCl, Na₂CO₃, KCl มาเป็นตัวจ่ายไอออน — เพราะมั่นใจได้ว่ามันแตกตัวหมด</div>
<h4>ขั้นที่ 2 — ดูไอออนลบ</h4>
<table><tr><th>ไอออนลบ</th><th>ปกติ</th><th>ยกเว้น (ตกตะกอน)</th></tr>
<tr><td>NO₃⁻ NO₂⁻ ClO₃⁻</td><td>ละลายหมด</td><td>ไม่มีเลย</td></tr>
<tr><td>Cl⁻ Br⁻ I⁻</td><td>ละลาย</td><td><b>Ag⁺ , Hg²⁺ , Pb²⁺</b></td></tr>
<tr><td>SO₄²⁻</td><td>ละลาย</td><td><b>Ba²⁺ Sr²⁺ Pb²⁺</b> · Ca²⁺ Ag⁺ ละลายเล็กน้อย</td></tr>
<tr><td>OH⁻</td><td><b>ไม่</b>ละลาย</td><td>ยกเว้น 1A, NH₄⁺ · Ca²⁺ Ba²⁺ Sr²⁺ ละลายเล็กน้อย</td></tr>
<tr><td>CO₃²⁻ PO₄³⁻ SO₃²⁻ S²⁻ O²⁻</td><td><b>ไม่</b>ละลาย</td><td>ยกเว้น 1A, NH₄⁺ (และ S²⁻ O²⁻ กับหมู่ 2A ละลายได้)</td></tr></table>
<div class="box why"><b>ทำไมหมู่ 1A ละลายหมด</b><br>
ไอออนหมู่ 1A มีประจุแค่ +1 และขนาดค่อนข้างใหญ่ ทำให้ <b>lattice energy ต่ำ</b> (ประจุน้อย = ดูดกันไม่แรง) น้ำจึงเอาชนะได้ง่าย<br>
กลับกัน คู่ที่ประจุสูงทั้งสองฝั่ง เช่น Ba²⁺ กับ SO₄²⁻ หรือ Ca²⁺ กับ PO₄³⁻ จะมี lattice energy มหาศาล น้ำสู้ไม่ไหว จึงตกตะกอน<br>
นี่คือ "Lattice &gt;&gt;&gt; Hydration" ในหัวข้อ 2.5 ที่กลับมาใช้ตรงนี้พอดี</div>
<div class="box warn"><b>ตัวที่คนจำสลับบ่อยที่สุด</b><br>
• <b>AgCl ไม่ละลาย</b> แต่ <b>AgNO₃ ละลาย</b> — เพราะ NO₃⁻ ไม่มีข้อยกเว้นเลย<br>
• <b>BaSO₄ ไม่ละลาย</b> แต่ <b>BaCl₂ ละลาย</b><br>
• <b>PbCl₂ ละลายเล็กน้อย</b> (ในน้ำร้อนละลายได้มากขึ้นชัดเจน) ต่างจาก PbBr₂ PbI₂ ที่ไม่ละลาย</div>` },
    { type: "code", text: "วิธีเขียนสมการไอออนิกสุทธิ 3 ขั้น\n\nขั้น 1  เขียนสมการโมเลกุลให้ครบและดุลให้เรียบร้อย\n        พร้อมระบุสถานะ (aq) / (s) โดยใช้ตารางการละลาย\n\nขั้น 2  แตกตัวเฉพาะสารที่เป็น (aq) ให้เป็นไอออน\n        สารที่เป็น (s) ตะกอน ห้ามแตก — เขียนทั้งก้อน\n\nขั้น 3  ตัดไอออนที่เหมือนกันทั้งสองข้าง (spectator ion) ทิ้ง\n        เหลืออะไรคือสมการไอออนิกสุทธิ",
      detail: `<h3>2.6.2 สมการไอออนิกสุทธิ — ทำตามขั้นแล้วไม่มีทางพลาด</h3>
<p>แนวคิด: เมื่อผสมสารละลายไอออนิกสองตัว ไอออนทั้งสี่ชนิดว่ายอยู่ในน้ำรวมกัน ถ้ามีคู่ไหน<b>จับกันแล้วไม่ละลายน้ำ</b> คู่นั้นจะตกตะกอนออกมา ส่วนไอออนที่เหลือก็ลอยอยู่เฉย ๆ ไม่ได้ทำอะไร เราเรียกมันว่า <b>ไอออนผู้ชม (spectator ion)</b> และตัดทิ้งได้</p>
<h4>ตัวอย่างเต็ม: AgNO₃(aq) + NaCl(aq)</h4>
<p><b>ขั้น 1 — สมการโมเลกุล</b></p>
<pre>AgNO₃(aq) + NaCl(aq) → NaNO₃(?) + AgCl(?)</pre>
<p>เช็กตารางการละลาย: NaNO₃ มีทั้ง Na⁺ (หมู่ 1A) และ NO₃⁻ → <b>ละลาย (aq)</b><br>
AgCl : Cl⁻ จับกับ Ag⁺ ซึ่งเป็นข้อยกเว้น → <b>ไม่ละลาย (s)</b></p>
<pre>AgNO₃(aq) + NaCl(aq) → NaNO₃(aq) + AgCl(s)↓</pre>
<p><b>ขั้น 2 — แตกตัวเฉพาะ (aq)</b></p>
<pre>Ag⁺(aq) + NO₃⁻(aq) + Na⁺(aq) + Cl⁻(aq) → Na⁺(aq) + NO₃⁻(aq) + AgCl(s)</pre>
<p><b>ขั้น 3 — ตัดไอออนผู้ชม</b> (Na⁺ และ NO₃⁻ อยู่ครบทั้งสองข้าง)</p>
<p class="frm">Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</p>
<h4>ฝึกเพิ่ม 3 ข้อ</h4>
<table><tr><th>ผสมอะไร</th><th>เกิดตะกอนไหม</th><th>สมการไอออนิกสุทธิ</th></tr>
<tr><td>BaCl₂ + Na₂CO₃</td><td><b>เกิด</b> BaCO₃</td><td>Ba²⁺(aq) + CO₃²⁻(aq) → BaCO₃(s)</td></tr>
<tr><td>K₂SO₄ + CaI₂</td><td><b>เกิด</b> CaSO₄ (ละลายเล็กน้อย)</td><td>Ca²⁺(aq) + SO₄²⁻(aq) → CaSO₄(s)</td></tr>
<tr><td>NaOH + Mg(NO₃)₂</td><td><b>เกิด</b> Mg(OH)₂</td><td>Mg²⁺(aq) + 2OH⁻(aq) → Mg(OH)₂(s)</td></tr>
<tr><td>CaCl₂ + NH₄NO₃</td><td><b>ไม่เกิด</b></td><td>ไม่มี — ทุกคู่ที่สลับกันได้ล้วนละลาย</td></tr>
<tr><td>CuSO₄ + NaCl</td><td><b>ไม่เกิด</b></td><td>ไม่มี — Na₂SO₄ และ CuCl₂ ละลายทั้งคู่</td></tr>
<tr><td>Na₃PO₄ + KCl</td><td><b>ไม่เกิด</b></td><td>ไม่มี — สลับแล้วได้ NaCl กับ K₃PO₄ ซึ่งเป็นหมู่ 1A ทั้งคู่</td></tr></table>
<div class="box warn"><b>ผิดบ่อยที่สุด 2 อย่าง</b><br>
1. <b>แตกตะกอนเป็นไอออน</b> — AgCl(s) ต้องเขียนทั้งก้อน ห้ามเขียน Ag⁺ + Cl⁻ ไม่งั้นจะตัดหมดแล้วไม่เหลืออะไรเลย<br>
2. <b>ลืมดุลประจุ</b> — Mg(OH)₂ ต้องใช้ OH⁻ สองตัว จึงเขียนว่า Mg²⁺ + <b>2</b>OH⁻ ตรวจได้ด้วยการบวกประจุสองข้าง: (+2) + (−1×2) = 0 เท่ากับ Mg(OH)₂ ที่เป็นกลาง ✓</div>
<div class="box tip"><b>ทางลัดตอนทำข้อสอบ</b> ให้ "สลับคู่" ทันที แล้วเช็กแค่สองสารใหม่ว่าตัวไหนติดข้อยกเว้นในตารางไหม ถ้าไม่มีเลย = ไม่เกิดตะกอน ตอบได้ภายใน 10 วินาที</div>` },
    { type: "callout", html: "ตัวอย่างมาตรฐาน: AgNO₃(aq) + NaCl(aq) → NaNO₃(aq) + <b>AgCl(s)↓</b> &nbsp;สมการไอออนิกสุทธิคือ <b>Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</b> เพราะ Na⁺ กับ NO₃⁻ เป็นไอออนผู้ชม" },

    { type: "divider" },
    { type: "h1", text: "บทที่ 3 · พันธะโคเวเลนต์" },
    { type: "callout", html: "เมื่ออโลหะสองตัวมาเจอกัน ทั้งคู่ EN สูงพอ ๆ กัน ไม่มีใครยอมเสียอิเล็กตรอนให้ใคร ทางออกเดียวคือ <b>ใช้อิเล็กตรอนร่วมกัน</b> — อิเล็กตรอนคู่นั้นถูกนิวเคลียสทั้งสองข้างดึงไว้พร้อมกัน กลายเป็นกาวยึดอะตอมสองตัวเข้าด้วยกัน" },

    { type: "h2", text: "3.1 การเกิดพันธะโคเวเลนต์" },
    { type: "p", html: "เกิดระหว่าง <b>อโลหะ + อโลหะ</b> เป็นหลัก (รวมถึงกึ่งโลหะ + อโลหะ และโลหะบางตัวอย่าง Be, Sn + อโลหะ) โดยแต่ละอะตอมเอาเวเลนซ์อิเล็กตรอนมาวางร่วมกันเป็นคู่ ๆ เรียกว่า <b>อิเล็กตรอนคู่ร่วมพันธะ</b> ส่วนคู่ที่ไม่ได้ใช้สร้างพันธะเรียกว่า <b>อิเล็กตรอนคู่โดดเดี่ยว (lone pair)</b>",
      detail: `<h3>3.1 การเกิดพันธะโคเวเลนต์ — ทำไมต้องแบ่งกันใช้</h3>
<p>ย้อนกลับไปที่ตรรกะเดิม: ทุกอะตอมอยากมีเวเลนซ์อิเล็กตรอนครบ 8</p>
<div class="box why"><b>ทำไมอโลหะ 2 ตัวถึงให้–รับกันไม่ได้</b><br>
อโลหะทุกตัวมี EN สูงและ IE สูง แปลว่า "หวง e⁻ ของตัวเอง" และ "แย่ง e⁻ ของคนอื่นเก่ง" พร้อมกัน<br>
ถ้า Cl ตัวหนึ่งจะยกอิเล็กตรอนให้ Cl อีกตัว ก็ต้องจ่าย IE ที่สูงมากโดยไม่คุ้ม เพราะอีกฝ่ายก็ไม่ได้อยากเป็นไอออนลบขนาดนั้น<br>
ทางออกที่พลังงานต่ำกว่าคือ <b>ต่างคนต่างเอามาลงขันคนละตัว</b> แล้วนับคู่ที่ใช้ร่วมกันนั้นเป็นของทั้งสองฝ่าย ต่างฝ่ายต่างครบ 8 พร้อมกัน</div>
<h4>ตัวอย่างที่ต้องวาดเป็นได้</h4>
<table><tr><th>โมเลกุล</th><th>แต่ละอะตอมขาดกี่ตัว</th><th>ใช้ร่วมกี่คู่</th><th>ชนิดพันธะ</th></tr>
<tr><td>Cl₂</td><td>Cl ขาด 1 ทั้งคู่</td><td>1 คู่</td><td><b>พันธะเดี่ยว</b> Cl–Cl</td></tr>
<tr><td>O₂</td><td>O ขาด 2 ทั้งคู่</td><td>2 คู่</td><td><b>พันธะคู่</b> O=O</td></tr>
<tr><td>N₂</td><td>N ขาด 3 ทั้งคู่</td><td>3 คู่</td><td><b>พันธะสาม</b> N≡N</td></tr></table>
<h4>รูปแบบการสร้างพันธะตามหมู่ — สูตรลัดที่ใช้ได้ทั้งบท</h4>
<p class="frm">จำนวนพันธะที่สร้างได้ = 8 − เลขหมู่</p>
<table><tr><th>หมู่</th><th>เวเลนซ์ e⁻</th><th>สร้างพันธะได้</th><th>คู่โดดเดี่ยว</th><th>ตัวอย่าง</th></tr>
<tr><td>4A (C, Si)</td><td>4</td><td><b>4 พันธะ</b></td><td>0 คู่</td><td>CH₄, CCl₄</td></tr>
<tr><td>5A (N, P)</td><td>5</td><td><b>3 พันธะ</b></td><td>1 คู่</td><td>NH₃, PCl₃</td></tr>
<tr><td>6A (O, S)</td><td>6</td><td><b>2 พันธะ</b></td><td>2 คู่</td><td>H₂O, H₂S</td></tr>
<tr><td>7A (F, Cl)</td><td>7</td><td><b>1 พันธะ</b></td><td>3 คู่</td><td>HCl, F₂</td></tr>
<tr><td>H</td><td>1</td><td><b>1 พันธะ</b> (ครบแค่ 2)</td><td>0 คู่</td><td>H₂, H₂O</td></tr></table>
<div class="box tip"><b>ใช้ยังไง</b> ก่อนวาดโครงสร้างใด ๆ ให้นับ "แขน" ของแต่ละอะตอมจากตารางนี้ก่อน แล้วจับแขนมาต่อกันให้ครบพอดี ไม่เหลือแขนลอย — ถ้าเหลือแขน แปลว่าต้องเพิ่มเป็นพันธะคู่หรือพันธะสาม</div>
<div class="box warn"><b>ข้อยกเว้นที่ครูย้ำ</b> Be สร้างได้ 2 พันธะ (BeCl₂) และ B สร้างได้ 3 พันธะ (BF₃) โดย<b>ไม่ครบออกเตต</b> ส่วนอะตอมกลางคาบ 3 ลงไป (P, S, Cl, Xe, I, Br) <b>ขยายออกเตตได้</b> เช่น PCl₅ (5 พันธะ), SF₆ (6 พันธะ), BrF₃, XeF₂ เพราะมีออร์บิทัล d ว่าง</div>` },
    { type: "code", text: "พันธะเดี่ยว  ใช้ e⁻ ร่วมกัน 1 คู่   Cl–Cl      ยาวที่สุด · อ่อนที่สุด\nพันธะคู่     ใช้ e⁻ ร่วมกัน 2 คู่   O=O        อยู่ตรงกลาง\nพันธะสาม    ใช้ e⁻ ร่วมกัน 3 คู่   N≡N        สั้นที่สุด · แข็งแรงที่สุด" },
    { type: "bullet", html: "หมู่ 4A สร้าง <b>4 พันธะ</b> · 5A สร้าง <b>3 พันธะ</b> · 6A สร้าง <b>2 พันธะ</b> · 7A และ H สร้าง <b>1 พันธะ</b>" },

    { type: "h2", text: "3.2 สูตรโครงสร้างลิวอิส (Lewis structure)" },
    { type: "code", text: "ขั้นที่ 1  หาอะตอมกลาง = อะตอมที่มีตัวเดียว และต้องการ e⁻ มากที่สุด (แขนเยอะสุด)\n           * H เป็นอะตอมกลางไม่ได้เด็ดขาด (มีแขนเดียว)\nขั้นที่ 2  วางอะตอมกลางไว้ตรงกลาง แล้วเอาอะตอมอื่นล้อมรอบ\nขั้นที่ 3  ต่อแขนให้ครบ ถ้าแขนเหลือให้ยกระดับเป็นพันธะคู่/สาม\nขั้นที่ 4  เติมอิเล็กตรอนคู่โดดเดี่ยวให้ทุกอะตอมครบออกเตต (H ครบ 2)" },
    { type: "code", text: "สูตรหาอิเล็กตรอนคู่โดดเดี่ยวของอะตอมกลาง\n\n          (Ve⁻ ของอะตอมกลาง)  −  (แขนของอะตอมล้อมรอบทั้งหมด)  ±  ประจุ\n  คู่  =  ──────────────────────────────────────────────────────────────\n                                     2\n\n  ไอออนลบ → บวกประจุเข้าไป      ไอออนบวก → ลบประจุออก",
      detail: `<h3>3.2 การหาอิเล็กตรอนคู่โดดเดี่ยวของอะตอมกลาง</h3>
` + SVG_LEWIS + `
<p>สูตรนี้ช่วยให้รู้ก่อนวาดว่าอะตอมกลางจะเหลือคู่โดดเดี่ยวกี่คู่ ซึ่งเป็นข้อมูลที่ต้องใช้ต่อในเรื่องรูปร่างโมเลกุล (VSEPR) พอดี</p>
<p class="frm">คู่โดดเดี่ยว = [ Ve⁻ อะตอมกลาง − แขนอะตอมล้อมรอบรวม ± ประจุ ] ÷ 2</p>
<h4>"แขน" ของอะตอมล้อมรอบนับยังไง</h4>
<p>ใช้กฎ <b>8 − เลขหมู่</b> เหมือนเดิม: H = 1 แขน, หมู่ 7A = 1 แขน, หมู่ 6A (O, S) = <b>2 แขน</b>, หมู่ 5A = 3 แขน</p>
<h4>เครื่องหมายของประจุ</h4>
<div class="box"><b>ไอออนลบ</b> (มี e⁻ เกินมา) → <b>บวก</b>เลขประจุเข้าไป<br>
<b>ไอออนบวก</b> (ขาด e⁻) → <b>ลบ</b>เลขประจุออก</div>
<h4>ทำให้ดู 8 ตัวอย่าง</h4>
<table><tr><th>สาร</th><th>แทนค่า</th><th>คู่โดดเดี่ยว</th><th>โครงสร้าง</th></tr>
<tr><td>H₂O</td><td>(6 − 1×2) ÷ 2</td><td><b>2 คู่</b></td><td>H–Ö–H มุมงอ</td></tr>
<tr><td>NH₃</td><td>(5 − 1×3) ÷ 2</td><td><b>1 คู่</b></td><td>N มีคู่โดดเดี่ยวข้างบน ต่อ H 3 ตัว</td></tr>
<tr><td>CH₄</td><td>(4 − 1×4) ÷ 2</td><td><b>0 คู่</b></td><td>C ต่อ H 4 ตัว พันธะเดี่ยวหมด</td></tr>
<tr><td>CO₂</td><td>(4 − 2×2) ÷ 2</td><td><b>0 คู่</b></td><td>Ö=C=Ö พันธะคู่สองข้าง</td></tr>
<tr><td>SO₂</td><td>(6 − 2×2) ÷ 2</td><td><b>1 คู่</b></td><td>S มี 1 คู่ → รูปมุมงอ</td></tr>
<tr><td>NO₃⁻</td><td>(5 − 2×3 <b>+ 1</b>) ÷ 2</td><td><b>0 คู่</b></td><td>สามเหลี่ยมแบนราบ</td></tr>
<tr><td>CO₃²⁻</td><td>(4 − 2×3 <b>+ 2</b>) ÷ 2</td><td><b>0 คู่</b></td><td>สามเหลี่ยมแบนราบ</td></tr>
<tr><td>NH₄⁺</td><td>(5 − 1×4 <b>− 1</b>) ÷ 2</td><td><b>0 คู่</b></td><td>ทรงสี่หน้า</td></tr></table>
<h4>เพิ่มอีกสองตัวที่เกินออกเตต</h4>
<table><tr><th>สาร</th><th>แทนค่า</th><th>คู่โดดเดี่ยว</th><th>รูปร่าง</th></tr>
<tr><td>XeF₂</td><td>(8 − 1×2) ÷ 2</td><td>3 คู่</td><td>AB₂E₃ เส้นตรง</td></tr>
<tr><td>BrF₃</td><td>(7 − 1×3) ÷ 2</td><td>2 คู่</td><td>AB₃E₂ รูปตัว T</td></tr>
<tr><td>SO₄²⁻</td><td>(6 − 2×4 + 2) ÷ 2</td><td>0 คู่</td><td>AB₄ ทรงสี่หน้า</td></tr></table>
<div class="box warn"><b>ถ้าคำนวณแล้วได้เศษ หรือได้ค่าติดลบ</b> แปลว่านับแขนผิด กลับไปเช็กว่า O นับเป็น <b>2</b> แขน (ไม่ใช่ 1) และเช็กเครื่องหมายประจุว่าบวกหรือลบเข้าไปถูกข้างหรือไม่</div>
<div class="box tip"><b>ทำไมต้องรู้ค่านี้</b> เพราะรูปร่างโมเลกุลในหัวข้อ 3.7 ใช้สัญลักษณ์ AB<sub>x</sub>E<sub>y</sub> โดย y คือจำนวนคู่โดดเดี่ยวตัวนี้พอดี คำนวณได้ = อ่านรูปร่างออกทันที</div>` },
    { type: "table", rows: [
      ["สาร", "คู่โดดเดี่ยวของอะตอมกลาง", "โครงสร้างลิวอิส", "ครบออกเตตไหม"],
      ["H₂O", "2 คู่", "H–Ö–H (มุมงอ)", "ครบ"],
      ["NH₃", "1 คู่", "N ต่อ H 3 ตัว + คู่โดดเดี่ยว 1 คู่", "ครบ"],
      ["CH₄", "0 คู่", "C ต่อ H 4 ตัว", "ครบ"],
      ["CO₂", "0 คู่", "Ö=C=Ö", "ครบ"],
      ["N₂", "—", ":N≡N:", "ครบ"],
      ["HCN", "0 คู่", "H–C≡N:", "ครบ"],
      ["SO₂", "1 คู่", "Ö=S–Ö⁻ (มีเรโซแนนซ์)", "ครบ (ใช้โคออร์ดิเนต)"],
      ["CO₃²⁻", "0 คู่", "C ต่อ O พันธะคู่ 1 + O⁻ 2 ตัว", "ครบ"],
      ["NH₄⁺", "0 คู่", "N ต่อ H 4 ตัว (มี 1 พันธะเป็นโคออร์ดิเนต)", "ครบ"],
      ["BF₃", "0 คู่", "B ต่อ F 3 ตัว", "ไม่ครบ (B มี 6)"],
      ["PCl₅", "0 คู่", "P ต่อ Cl 5 ตัว", "เกิน (P มี 10)"],
      ["SF₆", "0 คู่", "S ต่อ F 6 ตัว", "เกิน (S มี 12)"]
    ], detail: `<h3>3.2.2 ตารางโครงสร้างลิวอิสที่ออกสอบบ่อย</h3>
<p>ลองไล่ตรรกะทีละตัว จะเห็นว่าทุกตัวใช้หลักเดียวกันหมด</p>
<h4>กลุ่มที่ครบออกเตตพอดี</h4>
<table><tr><th>สาร</th><th>คิดยังไง</th></tr>
<tr><td><b>H₂O</b></td><td>O มี 2 แขน, H มี 1 แขน → O จับ H ได้ 2 ตัวพอดี เหลือ e⁻ อีก 4 ตัว = คู่โดดเดี่ยว 2 คู่</td></tr>
<tr><td><b>NH₃</b></td><td>N มี 3 แขน → จับ H 3 ตัว เหลือ e⁻ 2 ตัว = คู่โดดเดี่ยว 1 คู่</td></tr>
<tr><td><b>CH₄</b></td><td>C มี 4 แขน → จับ H 4 ตัวพอดี ไม่เหลืออะไร</td></tr>
<tr><td><b>CO₂</b></td><td>C มี 4 แขน, O มี 2 แขน × 2 ตัว = 4 แขน พอดีกัน → ต้องเป็น <b>พันธะคู่ทั้งสองข้าง</b> Ö=C=Ö</td></tr>
<tr><td><b>N₂</b></td><td>N มี 3 แขนทั้งคู่ → จับกันได้ 3 คู่ = พันธะสาม เหลือคู่โดดเดี่ยวข้างละ 1 คู่</td></tr>
<tr><td><b>HCN</b></td><td>C เป็นอะตอมกลาง (แขนเยอะสุด) จับ H 1 พันธะ เหลือ 3 แขนไปจับ N ที่มี 3 แขน → H–C≡N: และ N เหลือคู่โดดเดี่ยว 1 คู่</td></tr>
<tr><td><b>CO₃²⁻</b></td><td>C 4 แขน + ประจุ 2− ทำให้จับ O ได้ 3 ตัว: พันธะคู่ 1 ตัว และ O⁻ อีก 2 ตัว ผลรวมประจุ = −2 ✓</td></tr></table>
<h4>กลุ่มที่ไม่ครบ / เกินออกเตต</h4>
<table><tr><th>สาร</th><th>อะตอมกลางมี e⁻ กี่ตัว</th><th>ทำไมเกิดได้</th></tr>
<tr><td>BeCl₂</td><td>4</td><td rowspan="2">อะตอมกลางเล็กมาก ถ้าจะรับให้ครบ 8 ต้องอัด e⁻ เข้ามาเยอะจนผลักกันเอง ไม่คุ้ม</td></tr>
<tr><td>BF₃</td><td>6</td></tr>
<tr><td>PCl₅</td><td>10</td><td rowspan="3">อะตอมกลางอยู่<b>คาบ 3 ลงไป</b> มีออร์บิทัล d ว่าง จึงรับ e⁻ เกิน 8 ได้ (คาบ 2 ทำไม่ได้เด็ดขาด)</td></tr>
<tr><td>SF₆</td><td>12</td></tr>
<tr><td>BrF₃, XeF₂, ClF₅</td><td>10–12</td></tr></table>
<div class="box warn"><b>เส้นแบ่งที่ต้องจำ</b> C, N, O, F อยู่คาบ 2 → <b>ห้ามเกินออกเตตเด็ดขาด</b> ถ้าเจอตัวเลือกที่วาด N ให้มี 5 พันธะ หรือ O ให้มี 3 พันธะแบบไม่มีประจุ ให้ตัดทิ้งได้เลย</div>
<div class="box tip"><b>เช็กงานตัวเอง</b> วาดเสร็จแล้วนับ e⁻ รอบทุกอะตอม: H ต้องได้ 2, อะตอมอื่นควรได้ 8 (ยกเว้นรายการข้างบน) และผลรวมประจุต้องตรงกับที่โจทย์ให้</div>` },

    { type: "h2", text: "3.3 พันธะโคออร์ดิเนตโคเวเลนต์" },
    { type: "p", html: "พันธะโคเวเลนต์ปกติ อะตอมสองตัวลงขันคนละ 1 อิเล็กตรอน แต่ <b>พันธะโคออร์ดิเนตโคเวเลนต์</b> คือพันธะที่อะตอมหนึ่ง<b>ให้อิเล็กตรอนคู่โดดเดี่ยวไปทั้งคู่</b> ส่วนอีกฝ่ายไม่ต้องออกอะไรเลย — เกิดได้เมื่ออีกฝ่ายมีออร์บิทัลว่างและยังไม่ครบออกเตต",
      detail: `<h3>3.3 พันธะโคออร์ดิเนตโคเวเลนต์ (Coordinate covalent / Dative bond)</h3>
` + SVG_COORD + `
<p>นิยามจากเอกสาร: <b>"พันธะที่เกิดจากการให้ยืมอิเล็กตรอนในการสร้างพันธะ โดยให้อิเล็กตรอนคู่โดดเดี่ยวแก่อะตอมที่ไม่ครบ"</b></p>
<h4>เงื่อนไขการเกิด 2 ข้อ</h4>
<ol>
<li>ฝ่ายผู้ให้ต้องมี <b>อิเล็กตรอนคู่โดดเดี่ยว</b> เหลืออยู่ (เช่น N ใน NH₃, O ใน H₂O)</li>
<li>ฝ่ายผู้รับต้องมี <b>ที่ว่าง</b> คือยังไม่ครบออกเตต หรือมีออร์บิทัลว่าง (เช่น H⁺ ที่ไม่มีอิเล็กตรอนเลย, B ใน BF₃)</li>
</ol>
<h4>ตัวอย่างคลาสสิก 3 ตัว</h4>
<table><tr><th>สาร</th><th>ใครให้ ใครรับ</th><th>ผลลัพธ์</th></tr>
<tr><td><b>NH₄⁺</b></td><td>N ใน NH₃ มีคู่โดดเดี่ยว 1 คู่ → ยกให้ <b>H⁺</b> ที่ไม่มี e⁻ เลย</td><td>N มี 4 พันธะ ประจุรวม +1</td></tr>
<tr><td><b>H₃O⁺</b></td><td>O ใน H₂O มีคู่โดดเดี่ยว 2 คู่ → ยกให้ H⁺ ไป 1 คู่</td><td>O มี 3 พันธะ เหลือคู่โดดเดี่ยว 1 คู่ ประจุ +1</td></tr>
<tr><td><b>SO₃</b></td><td>S ให้คู่โดดเดี่ยวแก่ O ที่ยังไม่ครบ</td><td>เกิดพันธะ S→O เพิ่ม ทำให้ทุกอะตอมครบออกเตต</td></tr></table>
<p>ตัวอย่างอื่นที่เอกสารระบุไว้: <b>SO₂ , SO₃ , O₃ , H₂SO₄ , HNO₃ , HClO₄ , NH₄⁺ , CO , NO₃⁻</b></p>
<div class="box why"><b>ทำไม NH₄⁺ ถึงต้องใช้โคออร์ดิเนต</b><br>
N มีเวเลนซ์ 5 ตัว สร้างพันธะปกติได้แค่ 3 พันธะ (NH₃) และเหลือคู่โดดเดี่ยว 1 คู่<br>
เมื่อ H⁺ ลอยเข้ามา — H⁺ คือโปรตอนเปล่า ๆ ไม่มีอิเล็กตรอนสักตัว จึงลงขันไม่ได้<br>
N จึงต้อง<b>ออกให้ทั้งคู่</b> พันธะที่ 4 นี้แหละคือพันธะโคออร์ดิเนต และเพราะ N เสีย "ความเป็นเจ้าของ" e⁻ ไปครึ่งหนึ่ง ไอออนรวมจึงมีประจุ +1</div>
<div class="box warn"><b>จุดที่คนพลาดบ่อยที่สุดของหัวข้อนี้</b><br>
<b>เมื่อเกิดพันธะแล้ว แยกไม่ออกว่าพันธะไหนเป็นโคออร์ดิเนต</b><br>
ใน NH₄⁺ พันธะ N–H ทั้ง 4 พันธะมี<b>ความยาวเท่ากัน พลังงานเท่ากัน และสมบัติเหมือนกันทุกประการ</b> ไม่มีทางชี้ได้ว่าอันไหนคืออันที่ N ให้มาทั้งคู่<br>
คำว่า "โคออร์ดิเนต" บอกแค่<b>ที่มา</b>ของอิเล็กตรอนตอนสร้างพันธะ ไม่ได้บอกว่าพันธะนั้นต่างจากพันธะอื่น — ถ้าโจทย์ถามว่า "พันธะโคออร์ดิเนตแข็งแรงน้อยกว่าพันธะปกติหรือไม่" คำตอบคือ <b>ไม่ เท่ากัน</b></div>
<div class="box tip"><b>สัญลักษณ์</b> บางตำราเขียนพันธะโคออร์ดิเนตด้วย<b>ลูกศร</b> ชี้จากผู้ให้ไปผู้รับ เช่น H₃N→H⁺ เพื่อให้เห็นที่มาชัด ๆ แต่เขียนเป็นขีดธรรมดาก็ไม่ผิด</div>` },
    { type: "bullet", html: "ตัวอย่างที่ต้องจำ: <b>NH₄⁺ , H₃O⁺ , SO₃ , SO₂ , O₃ , HNO₃ , H₂SO₄ , CO , NO₃⁻</b>" },
    { type: "quote", text: "พันธะโคออร์ดิเนตเมื่อเกิดแล้ว มีความยาวและพลังงานเท่ากับพันธะโคเวเลนต์ปกติทุกประการ แยกไม่ออก — คำนี้บอกแค่ที่มาของอิเล็กตรอน ไม่ได้บอกว่าพันธะต่างกัน" },

    { type: "h2", text: "3.4 เรโซแนนซ์ (Resonance)" },
    { type: "p", html: "เรโซแนนซ์คือปรากฏการณ์ที่โมเลกุลหนึ่ง<b>เขียนโครงสร้างลิวอิสได้มากกว่า 1 แบบ</b> โดยตำแหน่งอะตอมเหมือนเดิม เปลี่ยนแค่ตำแหน่งของพันธะคู่ — โครงสร้างจริงคือ <b>ลูกผสม (hybrid)</b> ของทุกแบบพร้อมกัน ไม่ใช่การสลับไปมา และการเกิดเรโซแนนซ์ทำให้โมเลกุล<b>เสถียรขึ้น</b>",
      detail: `<h3>3.4 เรโซแนนซ์ — เข้าใจให้ถูก ไม่ใช่ "สลับไปมา"</h3>
` + SVG_RESONANCE + `
<h4>ปัญหาที่ทำให้ต้องมีเรโซแนนซ์</h4>
<p>ลองดู <b>SO₂</b> เราวาดได้ 2 แบบ: พันธะคู่อยู่ซ้าย–พันธะเดี่ยวอยู่ขวา หรือกลับกัน</p>
<p>ตามทฤษฎีปกติ พันธะคู่ต้อง<b>สั้นกว่า</b>และ<b>แข็งแรงกว่า</b>พันธะเดี่ยว ดังนั้น SO₂ ควรมีพันธะสองข้างที่ไม่เท่ากัน</p>
<div class="box why"><b>แต่ผลการทดลองบอกอีกอย่าง</b><br>
วัดจริงแล้วพบว่า พันธะ S–O ทั้งสองข้างของ SO₂ <b>มีความยาวเท่ากันและพลังงานพันธะเท่ากัน</b> เป๊ะ ๆ<br>
เหมือนแต่ละพันธะเป็น "1.5 พันธะ" คือ อยู่ตรงกลางระหว่างพันธะเดี่ยวกับพันธะคู่พอดี<br>
คำอธิบายคือ อิเล็กตรอนคู่ที่เป็นพันธะคู่นั้น<b>กระจายตัว (delocalized) อยู่ทั่วทั้งสองข้างพร้อมกัน</b> ไม่ได้ประจำอยู่ข้างใดข้างหนึ่ง</div>
<h4>ตัวอย่างที่ต้องรู้</h4>
<table><tr><th>สาร</th><th>เขียนได้กี่แบบ</th><th>พันธะจริง</th><th>ข้อมูลจากการทดลอง</th></tr>
<tr><td><b>O₃</b></td><td>2 แบบ</td><td>1.5 พันธะทั้งสองข้าง</td><td>มุม 116.8° ยาว 1.278 Å เท่ากันทั้งคู่</td></tr>
<tr><td><b>SO₂</b></td><td>2 แบบ</td><td>1.5 พันธะ</td><td>ยาวเท่ากันทั้งสองข้าง</td></tr>
<tr><td><b>NO₃⁻</b></td><td>3 แบบ</td><td>1.33 พันธะทั้งสามข้าง</td><td>รูปสามเหลี่ยมแบนราบสมมาตร 120°</td></tr>
<tr><td><b>CO₃²⁻</b></td><td>3 แบบ</td><td>1.33 พันธะ</td><td>C–O ยาวเท่ากันทั้งสาม</td></tr>
<tr><td><b>SO₃</b></td><td>3 แบบ</td><td>1.33 พันธะ</td><td>สามเหลี่ยมแบนราบ</td></tr>
<tr><td><b>C₆H₆</b></td><td>2 แบบ</td><td>1.5 พันธะทุกด้าน</td><td>C–C ในวงยาวเท่ากันหมด</td></tr></table>
<h4>ความยาวพันธะจริงอยู่ตรงไหน</h4>
<p class="frm">พันธะสาม &lt; พันธะจริงของเรโซแนนซ์ &lt; พันธะเดี่ยว</p>
<p>ยกตัวอย่าง C–O : พันธะเดี่ยว C–O ยาว 142 pm, พันธะคู่ C=O ยาว 121 pm ส่วน C–O ใน CO₃²⁻ วัดได้ประมาณ 129 pm — <b>อยู่ระหว่างกลางพอดี</b> ตรงกับที่ทฤษฎีเรโซแนนซ์ทำนาย</p>
<div class="box warn"><b>ความเข้าใจผิดที่ต้องแก้ให้ได้</b><br>
❌ "โมเลกุลสลับไปมาระหว่างโครงสร้าง A กับ B เร็ว ๆ"<br>
✔ <b>โมเลกุลเป็นโครงสร้างเดียวตลอดเวลา</b> ซึ่งคือลูกผสมของ A กับ B<br>
เปรียบเทียบ: ล่อ (mule) คือลูกผสมของม้ากับลา — มันไม่ได้กลายเป็นม้าบ้างลาบ้างสลับกัน แต่เป็น "ล่อ" อยู่ตลอด<br>
ลูกศร ↔ ที่เขียนระหว่างโครงสร้าง <b>ไม่ใช่</b>ลูกศรสมดุล (⇌) อย่าสับสน</div>
<div class="box tip"><b>สังเกตให้เร็ว</b> ถ้าเจออะตอมกลางที่ต่อกับอะตอมชนิดเดียวกันหลายตัว แล้วมีพันธะคู่ไม่ครบทุกตัว → <b>มีเรโซแนนซ์แน่นอน</b> เช่น NO₃⁻ CO₃²⁻ SO₃ O₃ SO₂</div>` },
    { type: "callout", html: "เรโซแนนซ์ทำให้โมเลกุล<b>เสถียรขึ้น</b> เพราะอิเล็กตรอนกระจายตัวไปทั่วแทนที่จะกระจุกอยู่ที่เดียว — และลูกศร ↔ ระหว่างโครงสร้างเรโซแนนซ์ <b>ไม่ใช่</b>ลูกศรสมดุล ⇌" },

    { type: "h2", text: "3.5 ความยาวพันธะและพลังงานพันธะ" },
    { type: "p", html: "<b>ความยาวพันธะ</b> = ระยะห่างระหว่างนิวเคลียสที่ทำให้พลังงานศักย์รวม<b>ต่ำที่สุด</b> · <b>พลังงานพันธะ</b> = พลังงานน้อยที่สุดที่ใช้สลายพันธะของโมเลกุลในสถานะแก๊สให้เป็นอะตอมเดี่ยวในสถานะแก๊ส (บอกความแข็งแรงของพันธะ)",
      detail: `<h3>3.5 ความยาวพันธะและพลังงานพันธะ — อ่านกราฟพลังงานศักย์ของ H₂</h3>
${SVG_H2CURVE}
<p>กราฟนี้ตอบคำถามเดียว: ถ้าเอาอะตอม H สองตัวมาค่อย ๆ ดันเข้าหากัน พลังงานของระบบจะเปลี่ยนอย่างไร</p>
<h4>เดินตามกราฟ 4 ขั้น</h4>
<table><tr><th>ขั้น</th><th>ระยะ r</th><th>เกิดอะไร</th><th>พลังงาน</th></tr>
<tr><td>1</td><td><b>300 pm</b></td><td>อยู่ห่างกันมาก ต่างคนต่างอยู่ ยังไม่รู้สึกถึงกัน และยังไม่เสถียรเพราะจัดเรียง e⁻ ไม่เหมือนหมู่ 8A</td><td>ประมาณ 0</td></tr>
<tr><td>2</td><td><b>150 pm</b></td><td>นิวเคลียสของแต่ละอะตอมเริ่ม<b>ดึงดูดอิเล็กตรอนของอีกอะตอม</b> ทั้งคู่ค่อย ๆ เคลื่อนเข้าหากันเอง</td><td>เริ่ม<b>ลดลง</b></td></tr>
<tr><td>3</td><td><b>74 pm</b></td><td>ถึงระยะที่แรงดึงดูดกับแรงผลัก<b>สมดุลพอดี</b> — นี่คือจุดต่ำสุดของกราฟ</td><td><b>−432 kJ/mol</b> (ต่ำสุด)</td></tr>
<tr><td>4</td><td><b>45 pm</b></td><td>ชิดเกินไป <b>นิวเคลียสบวกกับนิวเคลียสบวกผลักกัน</b> และ e⁻ ก็ผลักกันเอง แรงผลักชนะแรงดึงดูด</td><td><b>พุ่งสูงขึ้น</b> ไม่เสถียร</td></tr>
</table>
<div class="box why"><b>แรงที่แข่งกันมี 2 ฝ่าย</b><br>
<b>แรงดึงดูด</b> : นิวเคลียส (P) ของอะตอมหนึ่ง ↔ อิเล็กตรอน (e) ของอีกอะตอม — ดึงเข้าหากัน<br>
<b>แรงผลัก</b> : P ↔ P และ e ↔ e — ดันออกจากกัน<br>
ที่ระยะไกล แรงดึงดูดชนะ (เพราะ e⁻ อยู่ระหว่างกลาง ใกล้นิวเคลียสทั้งสองมากกว่าที่นิวเคลียสใกล้กันเอง) พลังงานจึงลดลง<br>
ที่ระยะใกล้มาก ๆ นิวเคลียสสองตัวเข้ามาชิดกันจนแรงผลัก P–P พุ่งขึ้นเร็วกว่ามาก พลังงานจึงพุ่งขึ้น<br>
จุดที่พลังงานต่ำสุดจึงคือจุดสมดุล = <b>ความยาวพันธะ</b> นั่นเอง</div>
<p>ค่า 432 kJ/mol ที่จุดต่ำสุดคือ "หลุมพลังงาน" ที่ต้องใส่กลับเข้าไปถ้าจะแยก H₂ ออกเป็น H สองตัว — ก็คือ<b>พลังงานพันธะ</b> H–H นั่นเอง (ตารางพลังงานพันธะเฉลี่ยระบุ 436 kJ/mol ซึ่งใกล้เคียงกัน ต่างกันเพราะเป็นค่าเฉลี่ยจากคนละวิธีวัด)</p>
<h4>ลำดับที่ต้องจำให้แม่น (สวนทางกันเสมอ)</h4>
<p class="frm">ความยาว : พันธะเดี่ยว &gt; พันธะคู่ &gt; พันธะสาม<br>พลังงาน : พันธะสาม &gt; พันธะคู่ &gt; พันธะเดี่ยว</p>
<table><tr><th>พันธะ</th><th>ความยาว (pm)</th><th>พลังงาน (kJ/mol)</th></tr>
<tr><td>C–C</td><td>154</td><td>346</td></tr>
<tr><td>C=C</td><td>134</td><td>614</td></tr>
<tr><td>C≡C</td><td>120</td><td>839</td></tr>
<tr><td>N–N</td><td>145</td><td>158</td></tr>
<tr><td>N=N</td><td>124</td><td>470</td></tr>
<tr><td>N≡N</td><td>113</td><td>945</td></tr></table>
<h4>ผลของขนาดอะตอม</h4>
<p><b>อะตอมยิ่งใหญ่ พันธะยิ่งยาว และพลังงานพันธะยิ่งต่ำ</b> เพราะอิเล็กตรอนคู่ร่วมพันธะอยู่ไกลนิวเคลียสมากขึ้น จึงถูกดึงไว้อ่อนลง</p>
<table><tr><th>พันธะ</th><th>ความยาว (pm)</th><th>พลังงาน (kJ/mol)</th></tr>
<tr><td>H–F</td><td>92</td><td>567</td></tr>
<tr><td>H–Cl</td><td>128</td><td>431</td></tr>
<tr><td>H–Br</td><td>141</td><td>366</td></tr>
<tr><td>H–I</td><td>161</td><td>298</td></tr></table>
<div class="box tip"><b>ตรรกะเดียวจบ</b> สั้น = ดึงกันแน่น = แข็งแรง = พลังงานสูง &nbsp;·&nbsp; ยาว = ดึงกันหลวม = อ่อน = พลังงานต่ำ<br>ใช้ได้ทั้งกรณีเปลี่ยนจำนวนพันธะ และกรณีเปลี่ยนขนาดอะตอม</div>
<div class="box warn"><b>ระวังคำถามหลอก</b> "พันธะสามยาวที่สุดใช่ไหม" — ไม่ใช่ พันธะสาม<b>สั้นที่สุด</b> เพราะมีอิเล็กตรอนถึง 3 คู่ดึงนิวเคลียสทั้งสองเข้าหากันพร้อมกัน</div>` },
    { type: "code", text: "ความยาวพันธะ :  เดี่ยว  >  คู่  >  สาม        (ยาว → สั้น)\nพลังงานพันธะ :  สาม   >  คู่  >  เดี่ยว       (แข็งแรง → อ่อน)\n\nอะตอมใหญ่ขึ้น  →  พันธะยาวขึ้น  →  พลังงานพันธะต่ำลง\nH–F 92 pm / 567   H–Cl 128 / 431   H–Br 141 / 366   H–I 161 / 298" },

    { type: "h2", text: "3.6 การคำนวณ ΔH จากพลังงานพันธะ" },
    { type: "code", text: "ΔH  =  Σ พลังงานพันธะของสารตั้งต้น  −  Σ พลังงานพันธะของผลิตภัณฑ์\n     =  พลังงานที่ใช้สลายพันธะเดิม (ดูด)  −  พลังงานที่ได้จากการสร้างพันธะใหม่ (คาย)\n\nΔH เป็น +  →  ดูดพลังงาน (endothermic)\nΔH เป็น −  →  คายพลังงาน (exothermic)",
      detail: `<h3>3.6 คำนวณ ΔH จากพลังงานพันธะ</h3>
<h4>ตรรกะเบื้องหลังสูตร</h4>
<p>ทุกปฏิกิริยาเคมีมีแค่ 2 เหตุการณ์: <b>พังพันธะเดิม</b> แล้ว <b>สร้างพันธะใหม่</b></p>
<div class="box"><b>สลายพันธะ = ดูดพลังงาน (+)</b> ต้องออกแรงดึงอะตอมให้แยกจากกัน<br>
<b>สร้างพันธะ = คายพลังงาน (−)</b> อะตอมมาจับกันแล้วเสถียรขึ้น ปล่อยพลังงานส่วนเกินออก</div>
<p>ดังนั้นพลังงานสุทธิ = (ที่จ่ายไปตอนพัง) − (ที่ได้คืนตอนสร้าง) = <b>พันธะสารตั้งต้น − พันธะผลิตภัณฑ์</b></p>
<p class="frm">ΔH = Σ BE(สารตั้งต้น) − Σ BE(ผลิตภัณฑ์)</p>
<h4>ตัวอย่างที่ 1 — H₂(g) + I₂(g) → 2HI(g)</h4>
<pre>ขั้น 1  นับพันธะสารตั้งต้น
        H₂ มี H–H  1 พันธะ  =  436
        I₂ มี I–I  1 พันธะ  =  151
        รวม = 436 + 151 = <b>587 kJ</b>

ขั้น 2  นับพันธะผลิตภัณฑ์
        HI มี H–I 1 พันธะ  และมี HI <b>2</b> โมเลกุล
        รวม = 2 × 298 = <b>596 kJ</b>

ขั้น 3  แทนสูตร
        ΔH = 587 − 596 = <b>−9 kJ/mol</b>

ขั้น 4  ตีความ
        ΔH เป็นลบ → <b>คายพลังงาน 9 kJ/mol</b></pre>
<h4>ตัวอย่างที่ 2 — 2NH₃(g) → N₂(g) + 3H₂(g)</h4>
<pre>ขั้น 1  สารตั้งต้น
        NH₃ 1 โมเลกุลมี N–H <b>3</b> พันธะ
        มี NH₃ <b>2</b> โมเลกุล → N–H รวม 6 พันธะ
        รวม = 6 × 391 = <b>2,346 kJ</b>

ขั้น 2  ผลิตภัณฑ์
        N₂ มี N≡N 1 พันธะ      = 945
        H₂ 3 โมเลกุล มี H–H 3 พันธะ = 3 × 436 = 1,308
        รวม = 945 + 1,308 = <b>2,253 kJ</b>

ขั้น 3  ΔH = 2,346 − 2,253 = <b>+93 kJ/mol</b>

ขั้น 4  ΔH เป็นบวก → <b>ดูดพลังงาน 93 kJ/mol</b></pre>
<div class="box why"><b>อ่านผลลัพธ์ให้เป็นภาษาคน</b><br>
ตัวอย่าง 1: พันธะใหม่ที่สร้าง (596) แข็งแรงกว่าพันธะเดิมที่พัง (587) ระบบจึงลงไปอยู่ในสถานะที่เสถียรกว่า และคายพลังงานส่วนต่างออกมา<br>
ตัวอย่าง 2: การพัง N–H 6 พันธะแพงมาก (2,346) แต่สร้างใหม่ได้คืนน้อยกว่า (2,253) จึงต้องขอพลังงานจากภายนอกมาเติม = ดูดความร้อน<br>
นี่คือเหตุผลที่การสังเคราะห์แอมโมเนียในอุตสาหกรรม (ทิศกลับของสมการนี้) เป็นปฏิกิริยาคายความร้อน</div>
<div class="box warn"><b>ผิดบ่อย 3 จุด</b><br>
1. <b>ลืมคูณสัมประสิทธิ์</b> — 2HI ต้องเป็น 2 × 298 ไม่ใช่ 298<br>
2. <b>ลืมนับพันธะในโมเลกุลเดียว</b> — NH₃ หนึ่งโมเลกุลมี 3 พันธะ ไม่ใช่ 1<br>
3. <b>สลับสูตรเป็น ผลิตภัณฑ์ − สารตั้งต้น</b> ทำให้เครื่องหมายกลับด้านหมด จำว่า <b>ตั้งต้นมาก่อน ลบด้วยผลิตภัณฑ์</b></div>
<div class="box tip"><b>เช็กคำตอบด้วยสามัญสำนึก</b> ถ้าผลิตภัณฑ์มีพันธะสาม (N≡N) หรือพันธะคู่แข็ง ๆ เกิดขึ้นใหม่ มักจะคายพลังงาน ส่วนถ้าต้องไปพังพันธะสามของสารตั้งต้น มักจะดูดพลังงาน</div>` },
    { type: "code", text: "ตัวอย่าง 1   H₂(g) + I₂(g) → 2HI(g)\n  ตั้งต้น :  (H–H) + (I–I)  =  436 + 151  =  587 kJ\n  ผลิต   :  2 × (H–I)      =  2 × 298    =  596 kJ\n  ΔH = 587 − 596 = −9 kJ/mol     →  คายพลังงาน 9 kJ/mol" },
    { type: "code", text: "ตัวอย่าง 2   2NH₃(g) → N₂(g) + 3H₂(g)\n  ตั้งต้น :  6 × (N–H)          =  6 × 391          =  2,346 kJ\n  ผลิต   :  (N≡N) + 3 × (H–H)  =  945 + 3 × 436    =  2,253 kJ\n  ΔH = 2,346 − 2,253 = +93 kJ/mol   →  ดูดพลังงาน 93 kJ/mol" },
    { type: "table", rows: [
      ["พันธะ", "ความยาว (pm)", "พลังงาน (kJ/mol)", "พันธะ", "ความยาว (pm)", "พลังงาน (kJ/mol)"],
      ["H–H", "74", "436", "C–C", "154", "346"],
      ["H–F", "92", "567", "C=C", "134", "614"],
      ["H–Cl", "128", "431", "C≡C", "120", "839"],
      ["H–Br", "141", "366", "N–N", "145", "158"],
      ["H–I", "161", "298", "N=N", "124", "470"],
      ["H–N", "102", "391", "N≡N", "113", "945"],
      ["H–O", "96", "463", "C–O", "142", "358"],
      ["C–H", "109", "414", "C=O", "121", "804"],
      ["Cl–Cl", "199", "242", "O–O", "148", "144"],
      ["I–I", "267", "151", "O=O", "121", "498"]
    ], detail: `<h3>3.6.2 ตารางพลังงานพันธะเฉลี่ย — อ่านให้เป็น</h3>
<p>ตารางนี้จะถูกแจกมาในข้อสอบเสมอ ไม่ต้องท่อง แต่ต้อง<b>หยิบค่าให้ถูกตัว</b>และเห็นแนวโน้มในนั้น</p>
<h4>3 แนวโน้มที่อ่านออกจากตาราง</h4>
<ol>
<li><b>เพิ่มจำนวนพันธะ → สั้นลงและแข็งแรงขึ้น</b><br>
C–C 154/346 → C=C 134/614 → C≡C 120/839 &nbsp; (ความยาวลด พลังงานเพิ่ม ชัดเจนทุกคู่)</li>
<li><b>อะตอมใหญ่ขึ้น → ยาวขึ้นและอ่อนลง</b><br>
H–F 92/567 → H–Cl 128/431 → H–Br 141/366 → H–I 161/298 (ไล่ลงหมู่ 7A)<br>
Cl–Cl 199/242 → I–I 267/151 เช่นกัน</li>
<li><b>คู่โดดเดี่ยวเยอะ ๆ ที่อยู่ติดกัน ทำให้พันธะอ่อน</b><br>
F–F แค่ 159, O–O แค่ 144, N–N แค่ 158 — ต่ำผิดสังเกต เพราะคู่โดดเดี่ยวของสองอะตอมที่อยู่ติดกันผลักกันเอง ไปลดความแข็งแรงของพันธะ</li>
</ol>
<div class="box warn"><b>หยิบค่าผิดตัวคือคะแนนหาย</b><br>
• <b>N–N (158) กับ N≡N (945)</b> ต่างกันเกือบ 6 เท่า ต้องดูให้ดีว่าสมการใช้ตัวไหน<br>
• <b>O–O (144) กับ O=O (498)</b> ก็เช่นกัน — O₂ ในอากาศคือ <b>O=O</b> ใช้ 498 เสมอ<br>
• <b>C=O (804) กับ C–O (358)</b> — CO₂ มี C=O สองพันธะ = 2 × 804</div>
<div class="box tip"><b>ทำไมเรียกว่า "ค่าเฉลี่ย"</b> พันธะ C–H ใน CH₄ กับใน CH₃OH ไม่ได้แข็งแรงเท่ากันเป๊ะ ตารางจึงให้ค่าเฉลี่ยจากหลาย ๆ สาร ผล ΔH ที่คำนวณได้จึงเป็น<b>ค่าประมาณ</b> ไม่ตรงกับค่าที่วัดด้วยแคลอริมิเตอร์ 100% และนั่นไม่ใช่ความผิดพลาดของเรา</div>` },

    { type: "h2", text: "3.7 รูปร่างโมเลกุล (VSEPR)" },
    { type: "p", html: "ทฤษฎี VSEPR (Valence Shell Electron Pair Repulsion) บอกว่า <b>กลุ่มอิเล็กตรอนรอบอะตอมกลางจะจัดตัวให้ห่างกันมากที่สุด</b> เพราะมันผลักกัน รูปร่างโมเลกุลจึงถูกกำหนดด้วยจำนวนกลุ่มอิเล็กตรอนนี้ — เขียนย่อเป็น A B<sub>x</sub> E<sub>y</sub> โดย A = อะตอมกลาง, x = อะตอมล้อมรอบ, y = คู่โดดเดี่ยว",
      detail: `<h3>3.7 VSEPR — คิดเป็นระบบใน 3 ขั้น</h3>
${SVG_VSEPR}
<h4>ขั้นตอนคิด</h4>
<ol>
<li>หา <b>x</b> = จำนวนอะตอมที่ล้อมรอบอะตอมกลาง (นับตัวอะตอม ไม่นับจำนวนพันธะ — พันธะคู่นับเป็น 1 กลุ่ม)</li>
<li>หา <b>y</b> = จำนวนคู่โดดเดี่ยวของอะตอมกลาง (ใช้สูตรจากหัวข้อ 3.2)</li>
<li>เปิดตาราง AB<sub>x</sub>E<sub>y</sub> อ่านรูปร่างกับมุมออกมาเลย</li>
</ol>
<h4>หลักแรงผลัก — ที่มาของ "มุมหด"</h4>
<p class="frm">คู่โดดเดี่ยว–คู่โดดเดี่ยว &gt; คู่โดดเดี่ยว–คู่ร่วมพันธะ &gt; คู่ร่วมพันธะ–คู่ร่วมพันธะ</p>
<div class="box why"><b>ทำไมคู่โดดเดี่ยวผลักแรงกว่า</b><br>
คู่ร่วมพันธะถูก<b>นิวเคลียสสองตัว</b>ดึงเอาไว้ จึงถูกบีบให้อยู่แคบ ๆ ระหว่างอะตอมสองตัว<br>
ส่วนคู่โดดเดี่ยวมีนิวเคลียส<b>ตัวเดียว</b>ดึง จึงบานออกและกินพื้นที่กว้างกว่า<br>
ผลคือมันไปเบียดคู่ร่วมพันธะให้หุบเข้าหากัน <b>มุมพันธะจึงเล็กกว่าค่ามาตรฐาน</b><br>
ดูตัวอย่างชัด ๆ : CH₄ (E₀) = 109.5° → NH₃ (E₁) = 107° → H₂O (E₂) = 104.5° ยิ่งคู่โดดเดี่ยวมาก มุมยิ่งหด</div>
<h4>ตารางรูปร่างโมเลกุลฉบับเต็ม</h4>
<table>
<tr><th>สูตร</th><th>รูปร่าง</th><th>มุม</th><th>ตัวอย่าง</th></tr>
<tr><td><b>AB₂</b></td><td>เส้นตรง (linear)</td><td>180°</td><td>BeCl₂ CO₂ HCN C₂H₂ N₂O</td></tr>
<tr><td><b>AB₂E</b></td><td>มุมงอ (bent)</td><td>&lt; 120°</td><td>SO₂</td></tr>
<tr><td><b>AB₂E₂</b></td><td>มุมงอ</td><td>&lt; 109.5° (104.5°)</td><td>H₂O H₂S</td></tr>
<tr><td><b>AB₂E₃</b></td><td>เส้นตรง</td><td>180°</td><td>XeF₂ I₃⁻ ICl₂⁻</td></tr>
<tr><td><b>AB₃</b></td><td>สามเหลี่ยมแบนราบ (trigonal planar)</td><td>120°</td><td>BF₃ GaI₃ SO₃ NO₃⁻ CO₃²⁻ C₂H₄</td></tr>
<tr><td><b>AB₃E</b></td><td>พีระมิดฐานสามเหลี่ยม (trigonal pyramidal)</td><td>&lt; 109.5° (107°)</td><td>NH₃ NCl₃ PCl₃ H₃O⁺ XeO₃ ClO₃⁻ SO₃²⁻</td></tr>
<tr><td><b>AB₃E₂</b></td><td>รูปตัวที (T-shape)</td><td>90° / 180°</td><td>ClF₃ BrF₃</td></tr>
<tr><td><b>AB₄</b></td><td>ทรงสี่หน้า (tetrahedral)</td><td>109.5°</td><td>CH₄ CCl₄ SiCl₄ NH₄⁺ SO₄²⁻ PO₄³⁻ ClO₄⁻ MnO₄⁻</td></tr>
<tr><td><b>AB₄E</b></td><td>ทรงสี่หน้าบิดเบี้ยว (see-saw)</td><td>—</td><td>SF₄ XeO₂F₂</td></tr>
<tr><td><b>AB₄E₂</b></td><td>สี่เหลี่ยมแบนราบ (square planar)</td><td>90°</td><td>XeF₄ ICl₄⁻</td></tr>
<tr><td><b>AB₅</b></td><td>พีระมิดคู่ฐานสามเหลี่ยม (trigonal bipyramidal)</td><td>90°, 120°, 180°</td><td>PCl₅ SbCl₅</td></tr>
<tr><td><b>AB₅E</b></td><td>พีระมิดฐานสี่เหลี่ยม (square pyramidal)</td><td>90°</td><td>IF₅ BrF₅ XeOF₄</td></tr>
<tr><td><b>AB₆</b></td><td>ทรงแปดหน้า (octahedral)</td><td>90°</td><td>SF₆ SiF₆²⁻</td></tr>
</table>
<div class="box warn"><b>คำที่ห้ามสับสน</b><br>
<b>รูปทรงของกลุ่มอิเล็กตรอน</b> กับ <b>รูปร่างโมเลกุล</b> ไม่เหมือนกัน<br>
NH₃ มีกลุ่มอิเล็กตรอน 4 กลุ่ม จัดตัวเป็นทรงสี่หน้า แต่<b>รูปร่างโมเลกุล</b>ที่เรามองเห็น (นับเฉพาะตำแหน่งอะตอม) คือ<b>พีระมิดฐานสามเหลี่ยม</b> เพราะคู่โดดเดี่ยวมองไม่เห็น<br>
ถ้าโจทย์ถาม "รูปร่างโมเลกุล" ให้ตอบโดย<b>ไม่นับคู่โดดเดี่ยว</b>เป็นมุมของรูปทรง</div>` },
    { type: "table", rows: [
      ["สูตร ABₓEᵧ", "รูปร่าง", "มุมพันธะ", "ตัวอย่าง"],
      ["AB₂", "เส้นตรง", "180°", "CO₂ BeCl₂ HCN"],
      ["AB₂E", "มุมงอ", "< 120°", "SO₂"],
      ["AB₂E₂", "มุมงอ", "104.5°", "H₂O H₂S"],
      ["AB₃", "สามเหลี่ยมแบนราบ", "120°", "BF₃ SO₃ NO₃⁻ CO₃²⁻"],
      ["AB₃E", "พีระมิดฐานสามเหลี่ยม", "107° (< 109.5°)", "NH₃ PCl₃ H₃O⁺"],
      ["AB₄", "ทรงสี่หน้า", "109.5°", "CH₄ CCl₄ NH₄⁺ SO₄²⁻"],
      ["AB₄E₂", "สี่เหลี่ยมแบนราบ", "90°", "XeF₄"],
      ["AB₅", "พีระมิดคู่ฐานสามเหลี่ยม", "90°, 120°, 180°", "PCl₅"],
      ["AB₆", "ทรงแปดหน้า", "90°", "SF₆"]
    ] },
    { type: "p", html: "การเปรียบเทียบ<b>มุมพันธะ</b>ระหว่างสารที่รูปร่างเหมือนกัน ให้ดูที่ <b>EN ของอะตอมล้อมรอบ</b> และ <b>EN ของอะตอมกลาง</b>",
      detail: `<h3>3.7.2 การพิจารณามุมพันธะ — เทียบกันสองคู่ตามเอกสาร</h3>
<p>เมื่อรูปร่างเหมือนกันแล้ว มุมจะต่างกันนิด ๆ ตามการกระจายของอิเล็กตรอน หลักคิดมีข้อเดียว: <b>อะตอมกลางมีอิเล็กตรอนอัดแน่นแค่ไหน ก็ผลักได้มากเท่านั้น</b></p>
<h4>คู่ที่ 1 — เปลี่ยนอะตอมล้อมรอบ : H₂O เทียบ OF₂</h4>
<table><tr><th>สาร</th><th>มุม</th></tr>
<tr><td>H–Ö–H (H₂O)</td><td><b>104.5°</b></td></tr>
<tr><td>F–Ö–F (OF₂)</td><td><b>103.2°</b></td></tr></table>
<div class="box why"><b>ทำไม OF₂ มุมเล็กกว่า</b><br>
อะตอมกลางเป็น O เหมือนกัน แต่ตัวล้อมรอบต่างกัน<br>
<b>F มี EN สูงกว่า H มาก</b> (4.0 เทียบ 2.1) จึงดึงอิเล็กตรอนคู่ร่วมพันธะ<b>ออกไป</b>จากอะตอมกลาง<br>
เมื่ออิเล็กตรอนรอบอะตอมกลางบางลง แรงผลักระหว่างพันธะก็<b>น้อยลง</b> มุมจึงหุบลงเหลือ 103.2°</div>
<h4>คู่ที่ 2 — เปลี่ยนอะตอมกลาง : NH₃ เทียบ PH₃</h4>
<table><tr><th>สาร</th><th>มุม</th></tr>
<tr><td>H–N̈–H (NH₃)</td><td><b>107°</b></td></tr>
<tr><td>H–P̈–H (PH₃)</td><td><b>94°</b></td></tr></table>
<div class="box why"><b>ทำไม PH₃ มุมเล็กกว่ามาก</b><br>
ตัวล้อมรอบเป็น H เหมือนกัน แต่อะตอมกลางต่างกัน<br>
<b>N มี EN สูงกว่า P</b> (3.0 เทียบ 2.1) จึงดึงอิเล็กตรอนคู่ร่วมพันธะ<b>เข้าหา</b>อะตอมกลาง<br>
อิเล็กตรอนรอบ N จึงอัดแน่นกว่า แรงผลักมากกว่า มุมจึง<b>กว้างกว่า</b> = 107°<br>
ส่วน P อะตอมใหญ่กว่าและ EN ต่ำกว่า อิเล็กตรอนอยู่ห่างและเบาบาง แรงผลักน้อย มุมจึงหุบลงเหลือ 94°</div>
<div class="box tip"><b>สรุปเป็นประโยคเดียว</b><br>
<b>อะตอมล้อมรอบ EN สูง → ดูด e⁻ ออกจากกลาง → มุมเล็กลง</b><br>
<b>อะตอมกลาง EN สูง → ดึง e⁻ เข้าหากลาง → มุมใหญ่ขึ้น</b><br>
สองบรรทัดนี้ตอบคำถามเปรียบเทียบมุมได้เกือบทุกข้อ</div>
<div class="box warn"><b>อย่าลืมตรวจรูปร่างก่อน</b> จะเปรียบเทียบมุมได้ ต้องเป็นรูปร่างเดียวกันก่อน เช่น เอา H₂O (มุมงอ) ไปเทียบมุมกับ CO₂ (เส้นตรง) ไม่ได้ ต้องตอบว่า CO₂ กว้างกว่าเพราะรูปร่างต่างกัน ไม่ใช่เพราะ EN</div>` },
    { type: "code", text: "เปรียบเทียบมุมพันธะ\n\n H₂O  104.5°   >   OF₂  103.2°     F มี EN สูงกว่า H ดึง e⁻ ออกจากอะตอมกลาง แรงผลักน้อยลง\n NH₃  107°     >   PH₃  94°        N มี EN สูงกว่า P ดึง e⁻ เข้าหาอะตอมกลาง แรงผลักมากขึ้น\n\n CH₄ 109.5°  >  NH₃ 107°  >  H₂O 104.5°     ยิ่งมีคู่โดดเดี่ยวมาก มุมยิ่งหด" },

    { type: "h2", text: "3.8 สภาพขั้วของพันธะและของโมเลกุล" },
    { type: "p", html: "ต้องแยกสองระดับให้ออก — <b>พันธะมีขั้วหรือไม่</b> ตัดสินด้วยผลต่าง EN แต่ <b>โมเลกุลมีขั้วหรือไม่</b> ต้องดู<b>รูปร่าง</b>ด้วย เพราะถ้ารูปร่างสมมาตร โมเมนต์ขั้วของแต่ละพันธะจะหักล้างกันหมด",
      detail: `<h3>3.8 สภาพขั้ว — โมเลกุลที่มีพันธะมีขั้ว อาจไม่มีขั้วก็ได้</h3>
` + SVG_POLARITY + `
<h4>ระดับที่ 1 · สภาพขั้วของพันธะ</h4>
<table><tr><th>ผลต่าง EN</th><th>ชนิดพันธะ</th><th>ตัวอย่าง</th></tr>
<tr><td>0 (หรือ &lt; 0.4)</td><td>โคเวเลนต์<b>ไม่มีขั้ว</b></td><td>H₂ Cl₂ O₂ N₂</td></tr>
<tr><td>0.4 – 1.7</td><td>โคเวเลนต์<b>มีขั้ว</b></td><td>H–Cl (0.9), H–O (1.4), C–O (1.0)</td></tr>
<tr><td>≥ 1.7–1.8</td><td>ถือเป็น<b>ไอออนิก</b></td><td>NaCl (2.1)</td></tr></table>
<p>ในพันธะมีขั้ว ฝั่ง EN สูงจะมีประจุลบบางส่วน (δ⁻) ฝั่ง EN ต่ำมีประจุบวกบางส่วน (δ⁺) เรียกว่ามี <b>โมเมนต์ขั้ว (dipole moment)</b> เขียนเป็นลูกศรชี้ไปทาง δ⁻</p>
<h4>ระดับที่ 2 · สภาพขั้วของโมเลกุล</h4>
<p class="frm">รวมเวกเตอร์โมเมนต์ขั้วทุกพันธะ · ผลรวม = 0 → ไม่มีขั้ว · ผลรวม ≠ 0 → มีขั้ว</p>
<div class="box why"><b>CO₂ มีพันธะมีขั้ว แต่โมเลกุลไม่มีขั้ว — เป็นไปได้ยังไง</b><br>
C=O ทั้งสองพันธะมีขั้วจริง (ผลต่าง EN = 1.0) O ทั้งสองข้างดึง e⁻ เข้าหาตัวเองเท่ากัน<br>
แต่ CO₂ เป็น<b>เส้นตรง</b> (O=C=O) โมเมนต์ขั้วทั้งสองชี้ไปคนละทาง 180° พอดี<br>
เวกเตอร์ที่ขนาดเท่ากันและทิศตรงข้าม <b>หักล้างกันหมด</b> ผลรวมเป็นศูนย์ → โมเลกุลไม่มีขั้ว<br>
เทียบกับ H₂O ที่เป็น<b>มุมงอ 104.5°</b> โมเมนต์ขั้วสองอันไม่ได้ชี้ตรงข้ามกัน จึงรวมกันได้เวกเตอร์ลัพธ์ชี้ขึ้นไปทาง O → <b>โมเลกุลมีขั้ว</b></div>
<h4>ตารางตัดสิน</h4>
<table><tr><th>โมเลกุล</th><th>รูปร่าง</th><th>พันธะมีขั้ว?</th><th>โมเลกุล</th></tr>
<tr><td>CO₂</td><td>เส้นตรง สมมาตร</td><td>มี</td><td><b>ไม่มีขั้ว</b></td></tr>
<tr><td>BF₃</td><td>สามเหลี่ยมแบนราบ สมมาตร</td><td>มี</td><td><b>ไม่มีขั้ว</b></td></tr>
<tr><td>CCl₄</td><td>ทรงสี่หน้า สมมาตร</td><td>มี</td><td><b>ไม่มีขั้ว</b></td></tr>
<tr><td>CH₄</td><td>ทรงสี่หน้า สมมาตร</td><td>มีน้อยมาก</td><td><b>ไม่มีขั้ว</b></td></tr>
<tr><td>SF₆ / PCl₅</td><td>สมมาตร</td><td>มี</td><td><b>ไม่มีขั้ว</b></td></tr>
<tr><td>H₂O</td><td>มุมงอ ไม่สมมาตร</td><td>มี</td><td><b>มีขั้ว</b></td></tr>
<tr><td>NH₃</td><td>พีระมิด ไม่สมมาตร</td><td>มี</td><td><b>มีขั้ว</b></td></tr>
<tr><td>SO₂</td><td>มุมงอ</td><td>มี</td><td><b>มีขั้ว</b></td></tr>
<tr><td>CHCl₃</td><td>ทรงสี่หน้าแต่อะตอมรอบไม่เหมือนกัน</td><td>มี</td><td><b>มีขั้ว</b></td></tr>
<tr><td>Cl₂ / N₂</td><td>เส้นตรง</td><td>ไม่มี</td><td><b>ไม่มีขั้ว</b></td></tr></table>
<div class="box tip"><b>ทางลัด 2 บรรทัด</b><br>
1. ถ้าอะตอมกลาง<b>มีคู่โดดเดี่ยว</b> → เกือบจะมีขั้วเสมอ (H₂O NH₃ SO₂)<br>
2. ถ้าอะตอมกลาง<b>ไม่มีคู่โดดเดี่ยว</b> และอะตอมล้อมรอบ<b>เหมือนกันหมด</b> → ไม่มีขั้ว (CO₂ BF₃ CCl₄ SF₆ PCl₅)</div>
<div class="box warn"><b>ระวังคำถามหลอกยอดฮิต</b> "CCl₄ มีพันธะมีขั้ว ดังนั้นเป็นโมเลกุลมีขั้ว" — <b>ผิด</b> รูปทรงสี่หน้าสมมาตรทำให้เวกเตอร์ทั้งสี่หักล้างกันพอดี แต่ถ้าเปลี่ยน Cl หนึ่งตัวเป็น H กลายเป็น CHCl₃ ความสมมาตรพัง → กลายเป็นมีขั้วทันที</div>` },
    { type: "bullet", html: "<b>ไม่มีขั้ว</b> เพราะสมมาตร: CO₂ · BF₃ · CCl₄ · CH₄ · PCl₅ · SF₆ · BeCl₂" },
    { type: "bullet", html: "<b>มีขั้ว</b> เพราะไม่สมมาตร: H₂O · NH₃ · SO₂ · H₂S · CHCl₃ · NH₄⁺ (มีประจุ)" },

    { type: "h2", text: "3.9 แรงยึดเหนี่ยวระหว่างโมเลกุลและสมบัติของสารโคเวเลนต์" },
    { type: "table", rows: [
      ["แรง", "เกิดกับใคร", "ความแรง", "ตัวอย่าง"],
      ["แรงลอนดอน (London dispersion)", "ทุกโมเลกุล โดยเฉพาะโมเลกุลไม่มีขั้ว", "อ่อนที่สุด", "H₂ O₂ CH₄ I₂"],
      ["แรงขั้ว–ขั้ว (dipole–dipole)", "โมเลกุลมีขั้ว", "ปานกลาง", "HCl SO₂ CHCl₃"],
      ["พันธะไฮโดรเจน (hydrogen bond)", "H ที่ต่อกับ F, O, N โดยตรง", "แรงที่สุดในสามอัน", "H₂O HF NH₃"]
    ], detail: `<h3>3.9.1 แรงยึดเหนี่ยวระหว่างโมเลกุล (Intermolecular force)</h3>
` + SVG_IMF + `
<div class="box warn"><b>แยกให้ออกก่อนเป็นอันดับแรก</b><br>
<b>พันธะโคเวเลนต์</b> = แรงยึด<b>ภายใน</b>โมเลกุล (ระหว่างอะตอม) — แข็งแรงมาก หลายร้อย kJ/mol<br>
<b>แรงระหว่างโมเลกุล</b> = แรงยึด<b>ระหว่าง</b>โมเลกุลกับโมเลกุล — อ่อนกว่ามาก ไม่กี่ kJ/mol ถึงไม่กี่สิบ<br>
เวลาน้ำเดือด เราไม่ได้พัง O–H แต่พังแค่พันธะไฮโดรเจนระหว่างโมเลกุล นี่คือเหตุผลที่ไอน้ำยังเป็น H₂O อยู่</div>
<p class="frm">แรงลอนดอน &lt; แรงขั้ว–ขั้ว &lt; พันธะไฮโดรเจน</p>
<h4>1) แรงลอนดอน</h4>
<p>เกิดจากการที่อิเล็กตรอนเคลื่อนที่ไปมา ทำให้เกิด<b>ขั้วชั่วคราว</b>ขึ้นมาแวบหนึ่ง แล้วไปเหนี่ยวนำโมเลกุลข้างเคียงให้เกิดขั้วตาม เกิดได้ใน<b>ทุกโมเลกุล</b>รวมถึงโมเลกุลไม่มีขั้ว</p>
<div class="box why"><b>โมเลกุลยิ่งใหญ่ แรงลอนดอนยิ่งแรง</b><br>
โมเลกุลใหญ่มีอิเล็กตรอนเยอะและอยู่ไกลนิวเคลียส จึง "โยกเยก" ง่าย เกิดขั้วชั่วคราวได้แรงกว่า<br>
นี่คือเหตุผลที่หมู่ 7A ไล่ลงมา: F₂ (แก๊ส) → Cl₂ (แก๊ส) → Br₂ (<b>ของเหลว</b>) → I₂ (<b>ของแข็ง</b>) ทั้งที่ไม่มีขั้วเหมือนกันหมด</div>
<h4>2) แรงขั้ว–ขั้ว</h4>
<p>โมเลกุลมีขั้วหันด้าน δ⁺ เข้าหา δ⁻ ของโมเลกุลข้างเคียง แรงกว่าลอนดอนที่ขนาดโมเลกุลใกล้เคียงกัน</p>
<h4>3) พันธะไฮโดรเจน</h4>
<p class="frm">เกิดเมื่อ H ต่อโดยตรงกับ <b>F, O หรือ N</b> เท่านั้น</p>
<div class="box why"><b>ทำไมต้องเป็น F O N</b><br>
สามตัวนี้ EN สูงมากและอะตอมเล็ก จึงดึงอิเล็กตรอนจาก H ไปเกือบหมด<br>
H ที่เหลือแทบจะเป็น<b>โปรตอนเปลือย</b> ประจุบวกเข้มข้นและตัวเล็กมาก จึงเข้าไปจ่อกับคู่โดดเดี่ยวของ F/O/N ของโมเลกุลข้างเคียงได้ใกล้มาก แรงดึงดูดจึงแรงเป็นพิเศษ</div>
<p><b>หลักฐานที่ชัดที่สุด</b>: จุดเดือดของ H₂O = 100 °C แต่ H₂S ซึ่งโมเลกุลใหญ่กว่ากลับเดือดที่ −60 °C เพราะ H₂O มีพันธะไฮโดรเจน ส่วน H₂S ไม่มี (S มี EN ไม่พอ)</p>
<div class="box tip"><b>เรียงจุดเดือดยังไงให้ถูก</b><br>
1. ดูก่อนว่ามีพันธะไฮโดรเจนไหม (มี H ต่อกับ F/O/N โดยตรง)<br>
2. ถ้าไม่มีทั้งคู่ ดูว่ามีขั้วไหม<br>
3. ถ้าเหมือนกันหมด ดูมวลโมเลกุล — หนักกว่าเดือดสูงกว่า</div>`},
    { type: "table", rows: [
      ["สมบัติของสารโคเวเลนต์", "เป็นอย่างไร", "เพราะอะไร"],
      ["จุดหลอมเหลว / จุดเดือด", "ต่ำ", "ตอนหลอมหรือเดือด แค่พังแรงระหว่างโมเลกุลซึ่งอ่อนมาก ไม่ได้พังพันธะโคเวเลนต์"],
      ["สถานะ", "มักเป็นแก๊สหรือของเหลว", "แรงยึดระหว่างโมเลกุลอ่อน โมเลกุลจึงหลุดออกจากกันง่าย"],
      ["การนำไฟฟ้า", "ไม่นำทุกสถานะ", "ไม่มีไอออนอิสระ และไม่มีอิเล็กตรอนอิสระ"],
      ["การละลาย", "ตามหลัก like dissolves like", "มีขั้วละลายในตัวทำละลายมีขั้ว · ไม่มีขั้วละลายในไม่มีขั้ว"],
      ["ความแข็ง", "อ่อน เปราะ", "แรงระหว่างโมเลกุลอ่อน"]
    ], detail: `<h3>3.9.2 สมบัติของสารโคเวเลนต์ และข้อยกเว้นที่ออกสอบทุกปี</h3>
<h4>ทำไมจุดเดือดถึงต่ำ</h4>
<p>คำถามที่ต้องตอบให้ถูกคือ <b>"ตอนเดือด เราพังอะไร"</b> คำตอบคือพังแค่<b>แรงระหว่างโมเลกุล</b> ซึ่งอ่อนกว่าพันธะโคเวเลนต์หลายสิบเท่า</p>
<table><tr><th>สาร</th><th>แรงที่ต้องพังตอนเดือด</th><th>จุดเดือด</th></tr>
<tr><td>CH₄</td><td>ลอนดอนล้วน</td><td>−162 °C</td></tr>
<tr><td>HCl</td><td>ขั้ว–ขั้ว</td><td>−85 °C</td></tr>
<tr><td>H₂O</td><td>พันธะไฮโดรเจน</td><td><b>100 °C</b></td></tr>
<tr><td>NaCl (ไอออนิก)</td><td>แรงดึงดูดไฟฟ้าทั้งผลึก</td><td>1,413 °C</td></tr></table>
<h4>ข้อยกเว้นใหญ่ — สารโครงผลึกร่างตาข่าย (network solid)</h4>
<div class="box warn"><b>สารกลุ่มนี้เป็นโคเวเลนต์ แต่จุดหลอมเหลวสูงมาก — เพราะมันไม่มีโมเลกุล</b><br>
ทั้งก้อนคืออะตอมที่ต่อกันด้วย<b>พันธะโคเวเลนต์ทั้งหมด</b>เป็นร่างแหไม่รู้จบ จะหลอมได้ต้อง<b>พังพันธะโคเวเลนต์จริง ๆ</b> ไม่ใช่แค่พังแรงระหว่างโมเลกุล</div>
<table><tr><th>สาร</th><th>โครงสร้าง</th><th>จุดหลอมเหลว</th><th>นำไฟฟ้า</th></tr>
<tr><td><b>เพชร (C)</b></td><td>C แต่ละตัวต่อ C อีก 4 ตัว เป็นทรงสี่หน้าทั้งก้อน</td><td>~3,550 °C</td><td><b>ไม่นำ</b> (e⁻ ถูกใช้สร้างพันธะหมด)</td></tr>
<tr><td><b>แกรไฟต์ (C)</b></td><td>C ต่อ C อีก 3 ตัวเป็นแผ่นหกเหลี่ยม แผ่นซ้อนกันด้วยแรงลอนดอน</td><td>สูงมาก</td><td><b>นำไฟฟ้าได้</b></td></tr>
<tr><td><b>ควอตซ์ (SiO₂)</b></td><td>Si ต่อ O สลับกันเป็นร่างแห 3 มิติ</td><td>~1,710 °C</td><td>ไม่นำ</td></tr></table>
<div class="box why"><b>ทำไมแกรไฟต์นำไฟฟ้าได้ แต่เพชรไม่ได้</b><br>
C ในเพชรใช้เวเลนซ์อิเล็กตรอนครบทั้ง 4 ตัวไปสร้างพันธะ ไม่เหลือ e⁻ ให้เคลื่อนที่เลย<br>
ส่วน C ในแกรไฟต์ต่อกับ C แค่ 3 ตัว <b>เหลืออิเล็กตรอนอีก 1 ตัวที่ไม่ได้ใช้</b> อิเล็กตรอนตัวนี้กระจายตัวได้ทั่วแผ่น จึงไหลนำไฟฟ้าได้<br>
และเพราะแผ่นแต่ละแผ่นยึดกันด้วยแรงลอนดอนอ่อน ๆ จึงเลื่อนหลุดออกจากกันง่าย — นั่นคือเหตุผลที่แกรไฟต์ใช้ทำไส้ดินสอและใช้เป็นสารหล่อลื่นได้</div>
<div class="box tip"><b>สรุปสำหรับข้อสอบ</b> ถ้าเจอ "สารโคเวเลนต์ที่จุดหลอมเหลวสูงมาก" ให้นึกถึง <b>เพชร แกรไฟต์ SiO₂</b> ทันที และอย่าตอบว่ามันเป็นสารไอออนิก</div>` },

    { type: "divider" },
    { type: "h1", text: "บทที่ 4 · พันธะโลหะ" },
    { type: "callout", html: "โลหะเจอโลหะ ทั้งคู่ EN ต่ำ ไม่มีใครอยากรับ e⁻ ทางออกคือ<b>ทุกตัวปล่อยเวเลนซ์อิเล็กตรอนออกมากองรวมกัน</b> กลายเป็นทะเลอิเล็กตรอนที่ไหลได้ทั่วก้อน — สมบัติเด่นทุกอย่างของโลหะอธิบายได้ด้วยภาพนี้ภาพเดียว" },

    { type: "h2", text: "4.1 การเกิดพันธะโลหะ (ทะเลอิเล็กตรอน)" },
    { type: "p", html: "อะตอมโลหะมี IE ต่ำ จึงปล่อยเวเลนซ์อิเล็กตรอนออกมาง่าย เมื่อโลหะอยู่รวมกันเป็นก้อน อิเล็กตรอนที่ปล่อยออกมาจะ<b>ไม่เป็นของอะตอมใดอะตอมหนึ่ง</b> แต่เคลื่อนที่ได้อิสระทั่วทั้งก้อนเหมือนทะเล เหลือไอออนบวกเรียงอยู่กับที่ <b>พันธะโลหะคือแรงดึงดูดระหว่างไอออนบวกกับทะเลอิเล็กตรอนนี้</b>",
      detail: `<h3>4.1 แบบจำลองทะเลอิเล็กตรอน (electron sea model)</h3>
${SVG_ESEA}
<h4>เกิดขึ้นได้อย่างไร</h4>
<ol>
<li>อะตอมโลหะมี <b>IE ต่ำ</b> และ <b>EN ต่ำ</b> — ปล่อย e⁻ ง่าย แต่ไม่มีใครอยากรับ เพราะทั้งก้อนเป็นโลหะเหมือนกันหมด</li>
<li>ผลคือทุกอะตอมปล่อยเวเลนซ์อิเล็กตรอนออกมา แต่ไม่มีปลายทาง จึง<b>กองรวมกันเป็นทะเล</b></li>
<li>อะตอมที่เสีย e⁻ ไปกลายเป็น<b>ไอออนบวก</b> เรียงตัวเป็นระเบียบอยู่กับที่</li>
<li>ไอออนบวกทุกตัวถูกทะเล e⁻ (ประจุลบ) ดึงดูดไว้พร้อมกันหมด = <b>พันธะโลหะ</b></li>
</ol>
<div class="box why"><b>ทำไมไอออนบวกที่อยู่ติดกันถึงไม่ผลักกันจนก้อนโลหะแตก</b><br>
เพราะมี<b>ทะเลอิเล็กตรอนคั่นอยู่ตรงกลางตลอดเวลา</b> อิเล็กตรอนลบเหล่านี้ทำหน้าที่เหมือน "กาว" ที่แทรกอยู่ระหว่างไอออนบวกทุกคู่ แรงดึงดูดบวก–ลบจึงชนะแรงผลักบวก–บวกได้เสมอ<br>
นี่คือความต่างสำคัญจากพันธะไอออนิกที่ไอออนถูกล็อกตายที่ตำแหน่งเดิม ถ้าเลื่อนแล้วจะเจอประจุเหมือนกัน</div>
<h4>เทียบพันธะทั้งสามด้วยประโยคเดียว</h4>
<table><tr><th>พันธะ</th><th>อิเล็กตรอนอยู่ที่ไหน</th></tr>
<tr><td>ไอออนิก</td><td><b>ย้ายไปเลย</b> — จากโลหะไปอยู่ที่อโลหะถาวร</td></tr>
<tr><td>โคเวเลนต์</td><td><b>ใช้ร่วมกันเฉพาะคู่</b> — อยู่ระหว่างอะตอม 2 ตัวที่จับกัน</td></tr>
<tr><td>โลหะ</td><td><b>ใช้ร่วมกันทั้งก้อน</b> — ไหลไปไหนก็ได้ ไม่เป็นของใคร</td></tr></table>
<div class="box tip"><b>คำที่ต้องพูดให้ถูก</b> โลหะไม่มี "โมเลกุล" และไม่มี "สูตรโมเลกุล" เขียนสัญลักษณ์ธาตุตัวเดียว เช่น Cu, Fe, Na ก็หมายถึงทั้งก้อนแล้ว</div>` },
    { type: "bullet", html: "อนุภาคในโลหะ = <b>ไอออนบวก</b> ที่ฝังอยู่ใน<b>ทะเลอิเล็กตรอน</b> ไม่ใช่อะตอมเป็นกลาง และไม่ใช่โมเลกุล" },

    { type: "h2", text: "4.2 สมบัติของโลหะและเหตุผล" },
    { type: "table", rows: [
      ["สมบัติ", "อธิบายด้วยทะเลอิเล็กตรอนอย่างไร"],
      ["นำไฟฟ้าได้ดีทุกสถานะ", "มีอิเล็กตรอนอิสระไหลอยู่แล้ว พอต่อขั้วไฟฟ้าก็ไหลไปทางขั้วบวกทันที ไม่ต้องหลอมก่อนเหมือนสารไอออนิก"],
      ["นำความร้อนได้ดี", "อิเล็กตรอนที่ได้รับความร้อนจะเคลื่อนที่เร็วขึ้นแล้ววิ่งไปชนถ่ายทอดพลังงานให้ส่วนอื่นได้ทันที"],
      ["ตีแผ่เป็นแผ่น / ดึงเป็นเส้นได้", "เมื่อชั้นไอออนบวกเลื่อน ทะเลอิเล็กตรอนไหลตามไปคั่นกลางเหมือนเดิม พันธะจึงไม่ขาด — ต่างจากไอออนิกที่แตกทันที"],
      ["เป็นมันวาว", "อิเล็กตรอนอิสระที่ผิวดูดกลืนแสงแล้วปล่อยกลับออกมาเกือบทั้งหมด จึงสะท้อนแสงได้ดี"],
      ["จุดหลอมเหลว/จุดเดือดสูง", "ต้องพังแรงดึงดูดระหว่างไอออนบวกทั้งหมดกับทะเลอิเล็กตรอนพร้อมกัน"],
      ["ความหนาแน่นสูง แข็งแรง", "ไอออนบวกเรียงชิดกันแน่นเป็นระเบียบ"]
    ], detail: `<h3>4.2 สมบัติของโลหะ — อธิบายทีละข้อด้วยกลไกเดียว</h3>
<p>ทุกข้อในหัวข้อนี้ย้อนกลับไปที่ประโยคเดียวกัน: <b>ในโลหะมีอิเล็กตรอนที่เคลื่อนที่ได้อิสระทั่วทั้งก้อน</b></p>
<h4>1) นำไฟฟ้าได้ดี — และนำได้ตั้งแต่เป็นของแข็ง</h4>
<div class="box why"><b>ต่างจากสารไอออนิกตรงไหน</b><br>
สารไอออนิกต้อง<b>หลอมหรือละลายน้ำก่อน</b> ไอออนถึงจะเคลื่อนที่ได้แล้วนำไฟฟ้า<br>
แต่โลหะมีอิเล็กตรอนอิสระ<b>พร้อมใช้อยู่แล้วตั้งแต่เป็นของแข็ง</b> จึงนำไฟฟ้าได้ทันที<br>
และตัวนำประจุก็ต่างกัน: โลหะใช้ <b>e⁻</b> · สารไอออนิกใช้ <b>ไอออน</b></div>
<p>เกร็ด: เมื่ออุณหภูมิสูงขึ้น โลหะนำไฟฟ้าได้<b>แย่ลง</b> เพราะไอออนบวกสั่นแรงจนไปขวางทางอิเล็กตรอน (ตรงข้ามกับสารกึ่งตัวนำ)</p>
<h4>2) ตีแผ่และดึงเป็นเส้นได้ — ข้อที่ต้องเทียบกับไอออนิกเสมอ</h4>
${SVG_BRITTLE}
<table><tr><th></th><th>โลหะ</th><th>สารไอออนิก</th></tr>
<tr><td>ตอนชั้นเลื่อน</td><td>ไอออนบวกเจอไอออนบวก <b>แต่มีทะเล e⁻ ไหลตามมาคั่น</b></td><td>ไอออนบวกเจอไอออนบวกเต็ม ๆ ไม่มีอะไรคั่น</td></tr>
<tr><td>ผลลัพธ์</td><td>พันธะยังอยู่ → <b>เปลี่ยนรูปได้ ไม่แตก</b></td><td>ผลักกันทั้งระนาบ → <b>แตกทันที</b></td></tr></table>
<p>นี่คือเหตุผลที่ทองคำ 1 กรัมตีเป็นแผ่นบาง ๆ ได้เป็นตารางเมตร แต่เกลือแกงทุบทีเดียวก็ป่นแล้ว</p>
<h4>3) เป็นมันวาว</h4>
<p>อิเล็กตรอนอิสระที่ผิวโลหะรับพลังงานจากแสงที่ตกกระทบได้ทุกความยาวคลื่น แล้ว<b>ปล่อยกลับออกมาเกือบทั้งหมดทันที</b> เราจึงเห็นเป็นผิวสะท้อนเงาวาว (ถ้าสีของโลหะต่างกัน เช่น ทองเหลือง ทองแดงแดง เกิดจากการดูดกลืนบางช่วงคลื่นไม่เท่ากัน)</p>
<h4>4) จุดหลอมเหลวสูง — แต่มีข้อยกเว้น</h4>
<p>โดยทั่วไปพันธะโลหะแข็งแรงมาก จุดหลอมเหลวจึงสูง เช่น <b>ทังสเตน (W) 3,422 °C</b> ซึ่งใช้ทำไส้หลอดไฟได้</p>
<div class="box warn"><b>อย่าตอบเหมารวมว่าโลหะทุกตัวจุดหลอมเหลวสูง</b><br>
• <b>Hg (ปรอท) เป็นของเหลว</b>ที่อุณหภูมิห้อง (จุดหลอมเหลว −39 °C)<br>
• <b>หมู่ 1A จุดหลอมเหลวต่ำ</b> เช่น Na 98 °C, K 63 °C ตัดด้วยมีดได้<br>
เหตุผล: โลหะหมู่ 1A ปล่อย e⁻ ได้แค่ตัวเดียวต่ออะตอม ทะเลอิเล็กตรอนจึง "จาง" และไอออนก็มีประจุแค่ +1 พันธะโลหะจึงอ่อน<br>
กลับกัน โลหะทรานซิชันปล่อย e⁻ ได้หลายตัว ทะเลเข้มข้นกว่า ประจุไอออนสูงกว่า จึงแข็งแรงและจุดหลอมเหลวสูงกว่ามาก</div>
<div class="box tip"><b>แนวคำถามที่เจอบ่อย</b> "เพราะเหตุใดโลหะจึงนำไฟฟ้าได้ทั้งที่เป็นของแข็ง แต่สารประกอบไอออนิกต้องหลอมเหลวก่อน" — ตอบด้วยคำสองคำ: <b>ตัวนำประจุคนละชนิด</b> (e⁻ อิสระ เทียบกับ ไอออนที่ถูกตรึง)</div>` },
    { type: "p", html: "เปรียบเทียบให้จำ: <b>โลหะเลื่อนชั้นแล้วไม่แตก</b> เพราะทะเลอิเล็กตรอนไหลตามไปคั่นกลาง แต่ <b>สารไอออนิกเลื่อนชั้นแล้วแตกทันที</b> เพราะประจุเหมือนกันมาเจอกันแล้วผลักกัน" },
    { type: "bullet", html: "ข้อยกเว้นที่ต้องรู้: <b>Hg เป็นของเหลว</b> ที่อุณหภูมิห้อง และ <b>โลหะหมู่ 1A (Na, K) จุดหลอมเหลวต่ำ</b> เพราะปล่อย e⁻ ได้แค่ตัวเดียว ทะเลอิเล็กตรอนจึงจาง" },

    { type: "h2", text: "4.3 ตารางเปรียบเทียบพันธะทั้ง 3 ชนิด" },
    { type: "table", rows: [
      ["หัวข้อ", "พันธะไอออนิก", "พันธะโคเวเลนต์", "พันธะโลหะ"],
      ["เกิดระหว่าง", "โลหะ + อโลหะ", "อโลหะ + อโลหะ", "โลหะ + โลหะ"],
      ["อิเล็กตรอนทำอะไร", "ย้ายจากโลหะไปอโลหะ", "ใช้ร่วมกันเป็นคู่", "ปล่อยออกมาไหลรวมทั้งก้อน"],
      ["ผลต่าง EN", "≥ 1.7–1.8", "< 1.7", "ต่ำทั้งคู่"],
      ["อนุภาคที่ได้", "ไอออน + และ − ในโครงผลึก", "โมเลกุล", "ไอออนบวก + ทะเลอิเล็กตรอน"],
      ["แรงยึด", "แรงดึงดูดไฟฟ้าระหว่างไอออน", "นิวเคลียสดึงคู่อิเล็กตรอนร่วม", "ไอออนบวกดึงทะเลอิเล็กตรอน"],
      ["จุดหลอมเหลว", "สูง", "ต่ำ (ยกเว้นร่างตาข่าย)", "สูงมาก (ยกเว้น 1A, Hg)"],
      ["นำไฟฟ้า", "ของแข็งไม่นำ · หลอม/ละลายน้ำนำ", "ไม่นำ (ยกเว้นแกรไฟต์)", "นำได้ทุกสถานะ"],
      ["ตัวนำประจุ", "ไอออน", "ไม่มี", "อิเล็กตรอนอิสระ"],
      ["ตีแผ่ได้ไหม", "ไม่ได้ — เปราะ แตกง่าย", "ไม่ได้ — อ่อน เปราะ", "ได้ — เหนียว ตีแผ่/ดึงเป็นเส้นได้"],
      ["ตัวอย่าง", "NaCl MgO CaCO₃", "H₂O CO₂ CH₄ NH₃", "Cu Fe Al Na"]
    ], detail: `<h3>4.3 สรุปรวบยอด — เปรียบเทียบพันธะทั้ง 3 ชนิด</h3>
<p>ตารางนี้คือทั้งบทที่ 2–4 บีบลงเหลือหน้าเดียว ถ้าอธิบายทุกช่องได้ว่า "เพราะอะไร" แปลว่าเข้าใจจริงแล้ว</p>
<h4>เริ่มจากคำถามเดียว: อิเล็กตรอนไปอยู่ที่ไหน</h4>
<table><tr><th>พันธะ</th><th>อิเล็กตรอนอยู่ที่ไหน</th><th>ผลที่ตามมา</th></tr>
<tr><td><b>ไอออนิก</b></td><td>ย้ายไปอยู่กับอโลหะ<b>ถาวร</b></td><td>เกิดไอออนที่ถูกล็อกในผลึก → ของแข็งไม่นำไฟฟ้า เปราะ</td></tr>
<tr><td><b>โคเวเลนต์</b></td><td>ติดอยู่<b>ระหว่างอะตอม 2 ตัว</b></td><td>เกิดโมเลกุลอิสระ → แรงระหว่างโมเลกุลอ่อน จุดเดือดต่ำ ไม่นำไฟฟ้า</td></tr>
<tr><td><b>โลหะ</b></td><td>ไหลได้<b>ทั่วทั้งก้อน</b></td><td>มีตัวนำประจุพร้อมใช้ → นำไฟฟ้าทุกสถานะ และเลื่อนชั้นได้โดยไม่แตก</td></tr></table>
<h4>เปรียบเทียบการนำไฟฟ้าให้ชัด</h4>
<table><tr><th>สาร</th><th>ของแข็ง</th><th>หลอมเหลว</th><th>ละลายน้ำ</th><th>ตัวนำประจุ</th></tr>
<tr><td>โลหะ (Cu)</td><td>✔ นำ</td><td>✔ นำ</td><td>— (ไม่ละลาย)</td><td>e⁻ อิสระ</td></tr>
<tr><td>ไอออนิก (NaCl)</td><td>✘ ไม่นำ</td><td>✔ นำ</td><td>✔ นำ</td><td>ไอออน</td></tr>
<tr><td>โคเวเลนต์ (น้ำตาล)</td><td>✘</td><td>✘</td><td>✘ ไม่นำ</td><td>ไม่มี</td></tr>
<tr><td>แกรไฟต์ (ข้อยกเว้น)</td><td>✔ นำ</td><td>—</td><td>—</td><td>e⁻ ที่เหลือใช้</td></tr></table>
<h4>เปรียบเทียบพฤติกรรมเมื่อโดนแรงกระแทก</h4>
<table><tr><th>สาร</th><th>เกิดอะไร</th><th>เพราะ</th></tr>
<tr><td>โลหะ</td><td>บุบ ยืด แต่ไม่แตก</td><td>ทะเล e⁻ ไหลตามไปยึดไว้</td></tr>
<tr><td>ไอออนิก</td><td>แตกเป็นระนาบเรียบ</td><td>ประจุเหมือนกันมาเรียงตรงกันแล้วผลัก</td></tr>
<tr><td>โคเวเลนต์</td><td>ยุ่ย หลุดเป็นผง</td><td>แรงระหว่างโมเลกุลอ่อนอยู่แล้ว</td></tr></table>
<div class="box tip"><b>วิธีตอบข้อสอบชนิด "สาร A B C มีสมบัติดังตาราง จงระบุชนิดพันธะ"</b><br>
1. ดูช่อง<b>นำไฟฟ้าตอนเป็นของแข็ง</b>ก่อน — ถ้านำ = <b>โลหะ</b> (หรือแกรไฟต์) จบทันที<br>
2. ถ้าไม่นำตอนของแข็งแต่นำตอนหลอม/ละลายน้ำ = <b>ไอออนิก</b><br>
3. ถ้าไม่นำเลยทุกสถานะ และจุดหลอมเหลวต่ำ = <b>โคเวเลนต์</b><br>
4. ถ้าไม่นำเลยแต่จุดหลอมเหลวสูงมาก = <b>โคเวเลนต์ร่างตาข่าย</b> (เพชร SiO₂)</div>
<div class="box warn"><b>อย่าลืมข้อยกเว้นทั้งสี่</b> แกรไฟต์นำไฟฟ้า · เพชรและ SiO₂ จุดหลอมเหลวสูงมาก · Hg เป็นของเหลว · โลหะหมู่ 1A จุดหลอมเหลวต่ำ</div>` },
    { type: "callout", html: "ถามตัวเองข้อเดียวก่อนตอบทุกข้อในบทพันธะเคมี: <b>\"อิเล็กตรอนไปอยู่ที่ไหน\"</b> — ย้ายไปเลย = ไอออนิก · ใช้ร่วมกันเป็นคู่ = โคเวเลนต์ · ไหลทั่วก้อน = โลหะ แล้วสมบัติทุกอย่างจะตามมาเอง" }
  ];

  /* ============================================================
     2) โน้ตไดอะแกรม — แผนผังหัวข้อ เชื่อมเส้นถึงกัน
     ============================================================ */
  STARTER_DIAGRAM[ID] = [
    { id: "ttl", t: "x", x: 40, y: 20, w: 620, html: "โครงสร้างอะตอม &amp; พันธะเคมี", size: 34, bold: true, c: "auto" },

    { id: "a0", t: "c", x: 60, y: 100, w: 250, c: "#3b7ddd",
      title: "1. โครงสร้างอะตอม",
      body: "ทุกอย่างเริ่มที่ <b>เวเลนซ์อิเล็กตรอน</b> — e⁻ วงนอกสุดมีกี่ตัว",
      detail: `<h3>1. โครงสร้างอะตอม — ทำไมต้องเริ่มตรงนี้</h3>
<p>บทพันธะเคมีทั้งบทคือเรื่องเดียว: อะตอมจัดการกับ<b>อิเล็กตรอนวงนอกสุด</b>ของมันอย่างไร ถ้ารู้ว่าแต่ละอะตอมมีเวเลนซ์อิเล็กตรอนกี่ตัว จะทำนายได้เกือบทุกอย่างในบทนี้</p>
<table><tr><th>รู้อะไร</th><th>ทำนายอะไรได้</th></tr>
<tr><td>เลขหมู่</td><td>เวเลนซ์ e⁻ → ให้หรือรับกี่ตัว → ประจุไอออน</td></tr>
<tr><td>โลหะ/อโลหะ</td><td>จะเกิดพันธะไอออนิกหรือโคเวเลนต์</td></tr>
<tr><td>ผลต่าง EN</td><td>พันธะมีขั้วมากน้อยแค่ไหน</td></tr>
<tr><td>e⁻ รอบอะตอมกลาง</td><td>รูปร่างโมเลกุล (VSEPR)</td></tr></table>
<div class="box tip"><b>ลำดับที่ควรอ่าน</b> 1.1 อนุภาคมูลฐาน → 1.3 การจัดเรียง e⁻ → 1.5 กฎออกเตต → แล้วค่อยเข้าบทที่ 2</div>` },

    { id: "a1", t: "c", x: 60, y: 280, w: 250, c: "#3b7ddd",
      title: "1.3 การจัดเรียงอิเล็กตรอน",
      body: "2n² ต่อชั้น · ชั้นนอกไม่เกิน 8<br>เลขหมู่ = เวเลนซ์ e⁻",
      detail: `<h3>1.3 การจัดเรียงอิเล็กตรอน</h3>
<p class="frm">จำนวน e⁻ สูงสุดชั้นที่ n = 2n² &nbsp;→&nbsp; 2, 8, 18, 32</p>
<p>แต่มีข้อบังคับเพิ่ม: <b>ชั้นนอกสุดของธาตุหมู่หลักห้ามเกิน 8</b> ถ้าคำนวณแล้วเกิน ให้ถอยกลับไปใส่ชั้นก่อนหน้าแค่ 8 แล้วดันที่เหลือขึ้นชั้นใหม่</p>
<h4>ฝึกดู 3 ตัวอย่าง</h4>
<table><tr><th>ธาตุ</th><th>จัดเรียง</th><th>คาบ</th><th>หมู่</th></tr>
<tr><td>₁₁Na</td><td>2, 8, 1</td><td>3</td><td>1A</td></tr>
<tr><td>₁₇Cl</td><td>2, 8, 7</td><td>3</td><td>7A</td></tr>
<tr><td>₂₀Ca</td><td>2, 8, 8, 2</td><td>4</td><td>2A</td></tr></table>
<div class="box why"><b>ทำไม Ca ไม่ใช่ 2, 8, 10</b><br>ถ้าเป็น 2, 8, 10 ชั้นนอกจะมี 10 ตัวซึ่งเกิน 8 ไม่ได้ ต้องหยุดชั้นที่ 3 ไว้ที่ 8 ก่อน แล้วอีก 2 ตัวขึ้นไปเริ่มชั้นที่ 4 จึงได้ 2, 8, 8, 2 และอ่านได้ว่า Ca อยู่คาบ 4 (มี 4 ชั้น) หมู่ 2A (เวเลนซ์ 2 ตัว)</div>` },

    { id: "a2", t: "c", x: 60, y: 460, w: 250, c: "#3b7ddd",
      title: "1.5 กฎออกเตต",
      body: "อยากมี e⁻ วงนอกครบ 8<br><b>ให้ / รับ / ใช้ร่วมกัน</b>",
      detail: `<h3>1.5 กฎออกเตต — จุดแยกไปสู่พันธะทั้ง 3 ชนิด</h3>
${SVG_OCTET}
<p>ทุกอะตอม (ยกเว้นแก๊สเฉื่อยที่ครบอยู่แล้ว) พยายามทำให้เวเลนซ์อิเล็กตรอนครบ 8 และมีอยู่ 3 วิธีเท่านั้น ซึ่งกลายเป็นพันธะ 3 ชนิดพอดี</p>
<table><tr><th>คู่ที่มาเจอกัน</th><th>เกิดอะไร</th><th>พันธะ</th></tr>
<tr><td>โลหะ + อโลหะ</td><td>โลหะให้ e⁻ อโลหะรับ → เกิดไอออน + และ − แล้วดูดกัน</td><td>ไอออนิก</td></tr>
<tr><td>อโลหะ + อโลหะ</td><td>ทั้งคู่ EN สูง ไม่มีใครยอมให้ จึงใช้ e⁻ ร่วมกัน</td><td>โคเวเลนต์</td></tr>
<tr><td>โลหะ + โลหะ</td><td>ปล่อย e⁻ ออกมาไหลรวมเป็นทะเลอิเล็กตรอน</td><td>โลหะ</td></tr></table>
<div class="box tip"><b>เช็กก่อนตอบทุกครั้ง</b> ดูว่าธาตุที่มาเจอกันเป็นโลหะหรืออโลหะ แล้วเลือกช่องในตารางนี้ — ตอบถูกได้เกือบทุกข้อโดยไม่ต้องคิดเยอะ</div>` },

    { id: "n0", t: "n", a: { id: "a0" }, b: { id: "a1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n1", t: "n", a: { id: "a1" }, b: { id: "a2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "b0", t: "c", x: 400, y: 100, w: 250, c: "#2e9e6b",
      title: "2. พันธะไอออนิก",
      body: "โลหะ<b>ให้</b> e⁻ · อโลหะ<b>รับ</b><br>ไอออนต่างประจุดูดกัน",
      detail: `<h3>2. พันธะไอออนิก — ภาพรวมทั้งบท</h3>
${SVG_OCTET}
<p>พันธะไอออนิกคือ<b>แรงดึงดูดทางไฟฟ้าระหว่างไอออนบวกกับไอออนลบ</b> เกิดเมื่อโลหะ (EN ต่ำ) เจออโลหะ (EN สูง) แล้วมีการ<b>ย้ายอิเล็กตรอนไปเลย</b> ไม่ใช่การใช้ร่วมกัน</p>
<table><tr><th>หัวข้อ</th><th>แก่นของเรื่อง</th></tr>
<tr><td>2.1 การเกิดพันธะ</td><td>ผลต่าง EN ≥ 1.7–1.8 · ได้โครงผลึกร่างตาข่าย ไม่ใช่โมเลกุล</td></tr>
<tr><td>2.2 สูตรและชื่อ</td><td>ไขว้ประจุ · เลขโรมันสำหรับทรานซิชัน · –ide / –ate / –ite</td></tr>
<tr><td>2.3 บอร์น–ฮาเบอร์</td><td>H_f = H_s + IE + D + EA + U</td></tr>
<tr><td>2.4 สมบัติ</td><td>นำไฟฟ้าเมื่อหลอม/ละลาย · เปราะ · จุดหลอมเหลวสูง</td></tr>
<tr><td>2.5 พลังงานการละลาย</td><td>ΔH_soln = U + ΔH_hydr</td></tr>
<tr><td>2.6 การละลายและสมการไอออนิกสุทธิ</td><td>ตารางการละลาย · ตัดไอออนผู้ชม</td></tr></table>
<div class="box tip"><b>เส้นด้ายที่ร้อยทั้งบท</b> ทุกเรื่องในบทนี้คือผลจากประโยคเดียว: <b>ไอออนต่างประจุดึงกันแรงมาก และถูกล็อกตำแหน่งไว้ในผลึก</b> — จุดหลอมเหลวสูงก็เพราะแรงนี้ · ของแข็งไม่นำไฟฟ้าก็เพราะถูกล็อก · เปราะก็เพราะพอเลื่อนตำแหน่งแล้วประจุเหมือนกันมาเจอกัน</div>` },

    { id: "b1", t: "c", x: 400, y: 300, w: 250, c: "#2e9e6b",
      title: "2.1 การเกิดพันธะไอออนิก",
      body: "ผลต่าง EN ≥ 1.7–1.8<br>ได้<b>โครงผลึกร่างตาข่าย</b> ไม่มีโมเลกุล",
      detail: `<h3>2.1 การเกิดพันธะไอออนิก</h3>
<p>Na (2,8,1) ให้ e⁻ 1 ตัว → Na⁺ (2,8) ครบออกเตต<br>Cl (2,8,7) รับ e⁻ 1 ตัว → Cl⁻ (2,8,8) ครบออกเตต<br>แล้ว Na⁺ กับ Cl⁻ ดูดกันด้วยแรงคูลอมบ์</p>
<p class="frm">ผลต่าง EN ≥ 1.7–1.8 → พันธะไอออนิก</p>
<div class="box why"><b>ทำไมต้องย้าย e⁻ ไปเลย ไม่แบ่งกันใช้</b><br>
โลหะมี IE ต่ำ (ปล่อยง่าย) และ EN ต่ำ (ไม่หวง) ส่วนอโลหะมี EN สูงและ EA คายมาก (อยากได้มาก) ความต่างที่มากขนาดนี้ทำให้การ "ยกให้ไปเลย" คุ้มพลังงานกว่าการมาแบ่งกัน</div>
<div class="box warn"><b>ผิดบ่อยที่สุด</b> สารประกอบไอออนิก<b>ไม่มีโมเลกุล</b> ห้ามพูดว่า "โมเลกุลของ NaCl" ผลึก NaCl คือไอออนนับล้านเรียงสลับกันทั้งก้อน สูตร NaCl เป็นเพียง<b>สูตรเอมพิริคัล</b>ที่บอกอัตราส่วนอย่างต่ำ Na⁺ : Cl⁻ = 1 : 1</div>` },

    { id: "b2", t: "c", x: 400, y: 500, w: 250, c: "#2e9e6b",
      title: "2.2 สูตรและการอ่านชื่อ",
      body: "ไขว้ประจุให้รวมเป็นศูนย์<br>ทรานซิชันใส่<b>เลขโรมัน</b>",
      detail: `<h3>2.2 สูตรและการอ่านชื่อสารประกอบไอออนิก</h3>
<p class="frm">A^(m+) + B^(n−) → A<sub>n</sub>B<sub>m</sub> &nbsp;(ไขว้เลขประจุ แล้วทอนอย่างต่ำ)</p>
<h4>หลักการอ่านชื่อ 6 ข้อ</h4>
<ol>
<li>อ่านไอออนบวกก่อน แล้วตามด้วยไอออนลบ</li>
<li>ไอออนลบอะตอมเดี่ยว ลงท้าย <b>–ide</b> (chloride, oxide, sulfide)</li>
<li><b>ไม่อ่านตัวเลขห้อย</b> — CaBr₂ = calcium bromide ไม่ใช่ dibromide</li>
<li>กลุ่มอะตอม อ่านตามเสียงลงท้ายของมัน <b>–ate</b> (O มาก) หรือ <b>–ite</b> (O น้อย)</li>
<li>ทรานซิชันและหมู่ 4A บางตัว ต้องใส่<b>เลขโรมัน</b> = ประจุ เช่น iron(II), lead(IV), manganese(VII)</li>
<li><b>Ag⁺ Zn²⁺ Sc³⁺</b> ประจุคงที่ ไม่ต้องใส่เลขโรมัน</li>
</ol>
<table><tr><th>ไอออน</th><th>สูตร</th><th>ชื่อ</th></tr>
<tr><td>K⁺ + MnO₄⁻</td><td>KMnO₄</td><td>potassium permanganate</td></tr>
<tr><td>Ba²⁺ + HSO₄⁻</td><td>Ba(HSO₄)₂</td><td>barium hydrogensulfate</td></tr>
<tr><td>Fe²⁺ + HCO₃⁻</td><td>Fe(HCO₃)₂</td><td>iron(II) hydrogencarbonate</td></tr>
<tr><td>Mn⁷⁺ + O²⁻</td><td>Mn₂O₇</td><td>manganese(VII) oxide</td></tr>
<tr><td>Ag⁺ + SO₄²⁻</td><td>Ag₂SO₄</td><td>silver sulfate</td></tr></table>
<div class="box tip"><b>วงเล็บใส่เมื่อไหร่</b> ใส่เมื่อกลุ่มอะตอมมีตัวห้อยมากกว่า 1 เท่านั้น — Al(OH)₃ ต้องมี แต่ AlPO₄ ไม่ต้อง</div>` },

    { id: "b3", t: "c", x: 400, y: 700, w: 250, c: "#2e9e6b",
      title: "2.3 วัฏจักรบอร์น–ฮาเบอร์",
      body: "H_f = H_s + IE + D + EA + U<br>NaCl → <b>U = −787 kJ/mol</b>",
      detail: `<h3>2.3 วัฏจักรบอร์น–ฮาเบอร์ของ NaCl</h3>
${SVG_BORN}
<p class="frm">H_f = H_s + IE + D + EA + U</p>
<table><tr><th>ขั้น</th><th>สมการ</th><th>ค่า</th><th>ดูด/คาย</th></tr>
<tr><td>H_s</td><td>Na(s) → Na(g)</td><td>+107</td><td>ดูด</td></tr>
<tr><td>IE</td><td>Na(g) → Na⁺(g) + e⁻</td><td>+496</td><td>ดูด</td></tr>
<tr><td>D</td><td>½Cl₂(g) → Cl(g)</td><td>+121</td><td>ดูด</td></tr>
<tr><td>EA</td><td>Cl(g) + e⁻ → Cl⁻(g)</td><td>−349</td><td>คาย</td></tr>
<tr><td>U</td><td>Na⁺(g) + Cl⁻(g) → NaCl(s)</td><td><b>−787</b></td><td>คาย</td></tr></table>
<pre>−412 = 107 + 496 + 121 − 349 + U
−412 = 375 + U
   U = −787 kJ/mol</pre>
<div class="box why"><b>ทำไม D ต้องหารสอง</b><br>
ค่าพลังงานพันธะ Cl–Cl = 242 kJ/mol เป็นค่าของ <b>Cl₂ → 2Cl</b> คือได้ Cl สองโมล<br>
แต่ NaCl 1 โมลใช้ Cl⁻ แค่ 1 โมล สมการจึงเป็น <b>½Cl₂ → Cl</b> ต้องใช้พลังงานครึ่งเดียว = 121</div>
<div class="box warn"><b>ผิดบ่อย</b> ลืมหาร D ด้วย 2 · ใส่ EA เป็นบวก (ต้องลบ เพราะคาย) · ย้ายข้างผิดเครื่องหมาย — จำว่า U = H_f − (H_s + IE + D + EA)</div>` },

    { id: "b4", t: "c", x: 400, y: 900, w: 250, c: "#2e9e6b",
      title: "2.4 สมบัติสารประกอบไอออนิก",
      body: "ของแข็งไม่นำ · หลอม/ละลายน้ำ<b>นำ</b><br>แข็งแต่<b>เปราะ</b> · จุดหลอมเหลวสูง",
      detail: `<h3>2.4 สมบัติของสารประกอบไอออนิก</h3>
${SVG_BRITTLE}
<h4>1) การนำไฟฟ้า — ขึ้นกับว่าไอออนเคลื่อนที่ได้ไหม</h4>
<table><tr><th>สถานะ</th><th>ไอออนเคลื่อนที่</th><th>นำไฟฟ้า</th></tr>
<tr><td>ของแข็ง</td><td>ไม่ได้ ถูกล็อกในผลึก</td><td>ไม่นำ</td></tr>
<tr><td>หลอมเหลว</td><td>ได้</td><td>นำ</td></tr>
<tr><td>ละลายน้ำ</td><td>ได้ (น้ำแยกไอออนออกแล้วล้อมไว้)</td><td>นำ</td></tr></table>
<h4>2) ทำไมเปราะ</h4>
<div class="box why">ปกติบวกสลับกับลบ ดูดกันแน่นจึง<b>แข็ง</b> แต่พอโดนทุบ ชั้นไอออนเลื่อนไปครึ่งช่อง ทันใดนั้น<b>บวกตรงกับบวก ลบตรงกับลบ</b> กลายเป็นผลักกันทั้งระนาบพร้อมกัน ผลึกจึงแยกออกเป็นรอยแตกเรียบทันที</div>
<h4>3) จุดหลอมเหลวสูง</h4>
<p class="frm">แรงดึงดูด ∝ (ประจุ × ประจุ) ÷ ระยะห่าง²</p>
<p>NaCl หลอมที่ ~801 °C ส่วน MgO (ประจุ 2 ทั้งคู่ และไอออนเล็กกว่า) หลอมที่ ~2,852 °C</p>
<h4>4) ความเป็นกรด–เบส</h4>
<table><tr><th>ชนิด</th><th>สารละลาย</th></tr>
<tr><td>1A/2A + OH⁻ · ออกไซด์ของ 1A/2A</td><td><b>เบส</b></td></tr>
<tr><td>1A/2A + หมู่ 7A</td><td><b>กลาง</b> (เกลือ)</td></tr></table>` },

    { id: "b5", t: "c", x: 400, y: 1100, w: 250, c: "#2e9e6b",
      title: "2.5 พลังงานการละลาย",
      body: "ΔH<sub>soln</sub> = U + ΔH<sub>hydr</sub><br>NaCl: 788 − 784 = <b>+4 kJ/mol</b>",
      detail: `<h3>2.5 Lattice energy กับ Hydration energy</h3>
${SVG_SOLN}
<p class="frm">ΔH_soln = U + ΔH_hydr</p>
<p><b>ขั้น 1 Lattice</b> AB(s) → A⁺(g) + B⁻(g) — พังผลึก <b>ดูดเสมอ</b><br>
<b>ขั้น 2 Hydration</b> A⁺(g) + B⁻(g) --H₂O--> A⁺(aq) + B⁻(aq) — น้ำเข้าล้อม <b>คายเสมอ</b></p>
<table><tr><th>เปรียบเทียบ</th><th>ΔH_soln</th><th>อุณหภูมิสารละลาย</th><th>ละลายดีขึ้นเมื่อ</th></tr>
<tr><td>Lattice &gt; Hydration</td><td>+ ดูด</td><td>ลดลง</td><td>T สูง</td></tr>
<tr><td>Lattice &lt; Hydration</td><td>− คาย</td><td>เพิ่มขึ้น</td><td>T ต่ำ</td></tr>
<tr><td>Lattice = Hydration</td><td>0</td><td>ไม่เปลี่ยน</td><td>—</td></tr>
<tr><td>Lattice &gt;&gt;&gt; Hydration</td><td>+ มาก</td><td>—</td><td><b>ไม่ละลายน้ำ</b></td></tr></table>
<pre>NaCl :  U = +788 , ΔH_hydr = −784
        ΔH_soln = +4 kJ/mol  (ดูดนิดเดียว → ละลายได้ดี น้ำเย็นลงเล็กน้อย)</pre>
<div class="box why"><b>ทำไมดูดพลังงานแล้วละลายดีขึ้นเมื่อร้อน</b> เพราะการเพิ่มอุณหภูมิคือการ<b>เติมสิ่งที่ปฏิกิริยาต้องการ</b>เข้าไป ส่วนถ้าปฏิกิริยาคายความร้อน การเพิ่มอุณหภูมิเท่ากับยัดของที่มันอยากทิ้งกลับเข้าไป การละลายจึงลดลง</div>
<div class="box warn"><b>เครื่องหมาย U สับสนตรงไหน</b> ในบอร์น–ฮาเบอร์ U = −787 (ทิศ<b>สร้าง</b>ผลึก คาย) แต่ในเรื่องการละลาย U = +788 (ทิศ<b>พัง</b>ผลึก ดูด) เป็นค่าเดียวกัน แค่กลับทิศสมการ</div>` },

    { id: "b6", t: "c", x: 400, y: 1300, w: 250, c: "#2e9e6b",
      title: "2.6 การละลายและสมการไอออนิกสุทธิ",
      body: "1A และ NH₄⁺ · NO₃⁻ ละลายหมด<br>ตัดไอออนผู้ชมทิ้ง",
      detail: `<h3>2.6 สภาพการละลายและสมการไอออนิกสุทธิ</h3>
<h4>เกณฑ์การละลาย (ต่อน้ำ 100 g)</h4>
<table><tr><th>ละลายได้ดี</th><th>ละลายได้บ้าง</th><th>ไม่ละลาย</th></tr>
<tr><td>มากกว่า 1 g</td><td>0.1–1 g</td><td>น้อยกว่า 0.1 g</td></tr></table>
<h4>หลักการดูตารางการละลาย</h4>
<ol>
<li><b>หมู่ 1A และ NH₄⁺ ละลายหมด</b> — ไม่มีข้อยกเว้น</li>
<li><b>NO₃⁻ NO₂⁻ ClO₃⁻ ละลายหมด</b> — ไม่มีข้อยกเว้น</li>
<li><b>Cl⁻ Br⁻ I⁻ ละลาย</b> ยกเว้นจับกับ <b>Ag⁺ Hg²⁺ Pb²⁺</b></li>
<li><b>SO₄²⁻ ละลาย</b> ยกเว้น <b>Ba²⁺ Sr²⁺ Pb²⁺</b> (Ca²⁺ Ag⁺ ละลายเล็กน้อย)</li>
<li><b>CO₃²⁻ PO₄³⁻ SO₃²⁻ ส่วนใหญ่ไม่ละลาย</b> ยกเว้นกับ 1A และ NH₄⁺</li>
<li><b>S²⁻ O²⁻ OH⁻ จับทรานซิชัน ไม่ละลาย</b></li>
</ol>
<h4>เขียนสมการไอออนิกสุทธิ 3 ขั้น</h4>
<pre>1. เขียนสมการโมเลกุล ดุลให้ครบ ระบุ (aq)/(s) ด้วยตารางการละลาย
2. แตกตัวเฉพาะ (aq) — ตะกอน (s) ห้ามแตก
3. ตัดไอออนผู้ชม (spectator ion) ที่ซ้ำสองข้างทิ้ง</pre>
<p><b>ตัวอย่าง</b></p>
<pre>AgNO₃(aq) + NaCl(aq) → NaNO₃(aq) + AgCl(s)
Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → Na⁺ + NO₃⁻ + AgCl(s)</pre>
<p class="frm">Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</p>
<div class="box warn"><b>ห้ามแตกตะกอนเป็นไอออน</b> ถ้าเขียน AgCl เป็น Ag⁺ + Cl⁻ จะตัดหมดจนไม่เหลืออะไรเลย · และอย่าลืมดุลประจุ เช่น Mg²⁺ + <b>2</b>OH⁻ → Mg(OH)₂(s)</div>` },

    { id: "c0", t: "c", x: 740, y: 100, w: 250, c: "#d98324",
      title: "3. พันธะโคเวเลนต์",
      body: "อโลหะ + อโลหะ<br><b>ใช้ e⁻ ร่วมกัน</b> ไม่มีใครยอมให้",
      detail: `<h3>3. พันธะโคเวเลนต์ — ภาพรวมทั้งบท</h3>
<p>เมื่ออโลหะสองตัวเจอกัน ทั้งคู่ EN สูง ไม่มีใครยอมเสีย e⁻ ทางออกเดียวคือ<b>ต่างคนต่างลงขันคนละตัวแล้วนับคู่นั้นเป็นของทั้งคู่</b> ทำให้ครบออกเตตพร้อมกัน</p>
<table><tr><th>หัวข้อ</th><th>แก่นของเรื่อง</th></tr>
<tr><td>3.1 การเกิดพันธะ</td><td>เดี่ยว/คู่/สาม · จำนวนพันธะ = 8 − เลขหมู่</td></tr>
<tr><td>3.2 โครงสร้างลิวอิส</td><td>คู่โดดเดี่ยว = (Ve − แขนรวม ± ประจุ) ÷ 2</td></tr>
<tr><td>3.3 โคออร์ดิเนต</td><td>อะตอมเดียวให้ e⁻ ทั้งคู่ (NH₄⁺ H₃O⁺ SO₃)</td></tr>
<tr><td>3.4 เรโซแนนซ์</td><td>โครงสร้างจริงคือลูกผสม ไม่ใช่สลับไปมา</td></tr>
<tr><td>3.5 ความยาว/พลังงานพันธะ</td><td>สาม &lt; คู่ &lt; เดี่ยว (ความยาว) สวนทางกับพลังงาน</td></tr>
<tr><td>3.6 คำนวณ ΔH</td><td>ΔH = ตั้งต้น − ผลิตภัณฑ์</td></tr>
<tr><td>3.7 VSEPR</td><td>AB<sub>x</sub>E<sub>y</sub> → รูปร่างและมุม</td></tr>
<tr><td>3.8 สภาพขั้ว</td><td>EN ตัดสินพันธะ · รูปร่างตัดสินโมเลกุล</td></tr>
<tr><td>3.9 แรงระหว่างโมเลกุล</td><td>ลอนดอน &lt; ขั้ว–ขั้ว &lt; พันธะไฮโดรเจน</td></tr></table>
<div class="box tip"><b>ลำดับที่ควรอ่าน</b> 3.1 → 3.2 (วาดโครงสร้างให้ได้ก่อน) → 3.7 (รูปร่าง) → 3.8 (ขั้ว) → 3.9 (สมบัติ) ส่วน 3.5–3.6 เป็นเรื่องคำนวณที่แยกออกมาอ่านทีหลังได้</div>` },

    { id: "c1", t: "c", x: 740, y: 300, w: 250, c: "#d98324",
      title: "3.1 การเกิดพันธะโคเวเลนต์",
      body: "จำนวนพันธะ = <b>8 − เลขหมู่</b><br>4A=4 · 5A=3 · 6A=2 · 7A=1",
      detail: `<h3>3.1 การเกิดพันธะโคเวเลนต์</h3>
<div class="box why"><b>ทำไมอโลหะ 2 ตัวให้–รับกันไม่ได้</b> อโลหะมี IE สูง (หวง e⁻) และ EN สูง (แย่งเก่ง) พร้อมกัน การยกให้จึงไม่คุ้มพลังงาน ทางออกที่พลังงานต่ำกว่าคือใช้ร่วมกัน</div>
<table><tr><th>โมเลกุล</th><th>แต่ละอะตอมขาด</th><th>ใช้ร่วม</th><th>พันธะ</th></tr>
<tr><td>Cl₂</td><td>1 ตัว</td><td>1 คู่</td><td>เดี่ยว Cl–Cl</td></tr>
<tr><td>O₂</td><td>2 ตัว</td><td>2 คู่</td><td>คู่ O=O</td></tr>
<tr><td>N₂</td><td>3 ตัว</td><td>3 คู่</td><td>สาม N≡N</td></tr></table>
<p class="frm">จำนวนพันธะที่สร้างได้ = 8 − เลขหมู่</p>
<table><tr><th>หมู่</th><th>พันธะ</th><th>คู่โดดเดี่ยว</th><th>ตัวอย่าง</th></tr>
<tr><td>4A (C)</td><td>4</td><td>0</td><td>CH₄</td></tr>
<tr><td>5A (N)</td><td>3</td><td>1</td><td>NH₃</td></tr>
<tr><td>6A (O)</td><td>2</td><td>2</td><td>H₂O</td></tr>
<tr><td>7A (F, Cl)</td><td>1</td><td>3</td><td>HCl</td></tr>
<tr><td>H</td><td>1</td><td>0</td><td>H₂ (ครบแค่ 2)</td></tr></table>
<div class="box warn"><b>ข้อยกเว้น</b> Be ทำ 2 พันธะ · B ทำ 3 พันธะ (ไม่ครบออกเตต) ส่วนอะตอมกลาง<b>คาบ 3 ลงไป</b> (P S Cl Br I Xe) ขยายออกเตตได้ เช่น PCl₅ SF₆ — แต่ C N O F ที่อยู่คาบ 2 <b>ห้ามเกินออกเตตเด็ดขาด</b></div>` },

    { id: "c2", t: "c", x: 740, y: 500, w: 250, c: "#d98324",
      title: "3.2 สูตรโครงสร้างลิวอิส",
      body: "คู่โดดเดี่ยว = (Ve − แขนรวม ± ประจุ) ÷ 2<br>H₂O = 2 คู่ · NH₃ = 1 คู่",
      detail: `<h3>3.2 สูตรโครงสร้างลิวอิส</h3>
<h4>ขั้นตอนวาด</h4>
<ol>
<li>หาอะตอมกลาง = อะตอมที่มีตัวเดียวและต้องการ e⁻ มากที่สุด (<b>H เป็นอะตอมกลางไม่ได้</b>)</li>
<li>วางอะตอมกลางไว้กลาง เอาอะตอมอื่นล้อมรอบ</li>
<li>ต่อแขนให้ครบ เหลือแขนก็ยกเป็นพันธะคู่/สาม</li>
<li>เติมคู่โดดเดี่ยวให้ทุกอะตอมครบออกเตต (H ครบ 2)</li>
</ol>
<p class="frm">คู่โดดเดี่ยวของอะตอมกลาง = [ Ve⁻ อะตอมกลาง − แขนอะตอมล้อมรอบรวม ± ประจุ ] ÷ 2</p>
<p><b>ไอออนลบ → บวกประจุเข้าไป · ไอออนบวก → ลบประจุออก</b> และนับแขนด้วยกฎ 8 − เลขหมู่ (O = 2 แขน)</p>
<table><tr><th>สาร</th><th>แทนค่า</th><th>คู่โดดเดี่ยว</th></tr>
<tr><td>H₂O</td><td>(6 − 2) ÷ 2</td><td>2 คู่</td></tr>
<tr><td>NH₃</td><td>(5 − 3) ÷ 2</td><td>1 คู่</td></tr>
<tr><td>CH₄</td><td>(4 − 4) ÷ 2</td><td>0 คู่</td></tr>
<tr><td>CO₂</td><td>(4 − 4) ÷ 2</td><td>0 คู่</td></tr>
<tr><td>SO₂</td><td>(6 − 4) ÷ 2</td><td>1 คู่</td></tr>
<tr><td>NO₃⁻</td><td>(5 − 6 + 1) ÷ 2</td><td>0 คู่</td></tr>
<tr><td>CO₃²⁻</td><td>(4 − 6 + 2) ÷ 2</td><td>0 คู่</td></tr>
<tr><td>NH₄⁺</td><td>(5 − 4 − 1) ÷ 2</td><td>0 คู่</td></tr></table>
<div class="box tip"><b>ทำไมต้องหาค่านี้</b> เพราะมันคือ <b>y</b> ในสัญลักษณ์ AB<sub>x</sub>E<sub>y</sub> ของเรื่องรูปร่างโมเลกุล คำนวณได้ = เปิดตาราง VSEPR อ่านรูปร่างได้ทันที</div>` },

    { id: "c3", t: "c", x: 740, y: 700, w: 250, c: "#d98324",
      title: "3.3 พันธะโคออร์ดิเนตโคเวเลนต์",
      body: "อะตอมหนึ่ง<b>ให้ e⁻ ทั้งคู่</b><br>NH₄⁺ · H₃O⁺ · SO₃",
      detail: `<h3>3.3 พันธะโคออร์ดิเนตโคเวเลนต์</h3>
<p>พันธะที่เกิดจากการ<b>ให้ยืมอิเล็กตรอน</b> — อะตอมหนึ่งยกอิเล็กตรอนคู่โดดเดี่ยวไปทั้งคู่ ให้แก่อะตอมที่ยังไม่ครบออกเตต ส่วนผู้รับไม่ต้องออกอะไรเลย</p>
<h4>เงื่อนไข 2 ข้อ</h4>
<ol><li>ผู้ให้ต้องมี<b>คู่โดดเดี่ยว</b>เหลือ</li><li>ผู้รับต้องมี<b>ที่ว่าง</b> (ยังไม่ครบออกเตต หรือมีออร์บิทัลว่าง)</li></ol>
<table><tr><th>สาร</th><th>ใครให้ ใครรับ</th></tr>
<tr><td>NH₄⁺</td><td>N ใน NH₃ ยกคู่โดดเดี่ยวให้ <b>H⁺</b> ที่ไม่มี e⁻ เลย</td></tr>
<tr><td>H₃O⁺</td><td>O ใน H₂O ยกคู่โดดเดี่ยวให้ H⁺</td></tr>
<tr><td>SO₃</td><td>S ให้คู่โดดเดี่ยวแก่ O ที่ยังไม่ครบ</td></tr></table>
<p>ตัวอย่างอื่นจากเอกสาร: SO₂ · O₃ · H₂SO₄ · HNO₃ · HClO₄ · CO · NO₃⁻</p>
<div class="box warn"><b>จุดพลาดสำคัญ</b> เมื่อเกิดพันธะแล้ว <b>แยกไม่ออก</b>ว่าพันธะไหนเป็นโคออร์ดิเนต — ใน NH₄⁺ พันธะ N–H ทั้ง 4 มีความยาวและพลังงาน<b>เท่ากันหมด</b> คำนี้บอกแค่<b>ที่มา</b>ของอิเล็กตรอนตอนสร้างพันธะ ไม่ได้แปลว่าพันธะนั้นอ่อนกว่าหรือต่างกัน</div>` },

    { id: "c4", t: "c", x: 740, y: 900, w: 250, c: "#d98324",
      title: "3.4 เรโซแนนซ์",
      body: "เขียนได้หลายแบบ แต่ของจริงคือ<b>ลูกผสม</b><br>O₃ · NO₃⁻ · CO₃²⁻ · SO₂",
      detail: `<h3>3.4 เรโซแนนซ์ (Resonance)</h3>
<p>ปรากฏการณ์ที่เขียนโครงสร้างลิวอิสได้มากกว่า 1 แบบ โดยตำแหน่งอะตอมเหมือนเดิม เปลี่ยนแค่ตำแหน่งพันธะคู่ — และการเกิดเรโซแนนซ์ทำให้โมเลกุล<b>เสถียรขึ้น</b></p>
<div class="box why"><b>หลักฐานจาก SO₂</b><br>
วาดได้ 2 แบบ (พันธะคู่ซ้ายหรือขวา) ตามทฤษฎีพันธะคู่ต้องสั้นกว่าพันธะเดี่ยว แต่<b>ผลการทดลองพบว่าพันธะ S–O ทั้งสองข้างยาวเท่ากันและพลังงานเท่ากันเป๊ะ</b><br>
คำอธิบาย: อิเล็กตรอนคู่นั้น<b>กระจายตัวอยู่ทั่วทั้งสองข้างพร้อมกัน</b> ทำให้เหมือนมีพันธะข้างละ 1.5 พันธะ</div>
<table><tr><th>สาร</th><th>เขียนได้</th><th>พันธะจริง</th></tr>
<tr><td>O₃</td><td>2 แบบ</td><td>1.5 พันธะ (มุม 116.8° ยาว 1.278 Å)</td></tr>
<tr><td>SO₂</td><td>2 แบบ</td><td>1.5 พันธะ</td></tr>
<tr><td>NO₃⁻</td><td>3 แบบ</td><td>1.33 พันธะ</td></tr>
<tr><td>CO₃²⁻</td><td>3 แบบ</td><td>1.33 พันธะ</td></tr>
<tr><td>C₆H₆</td><td>2 แบบ</td><td>1.5 พันธะทุกด้าน</td></tr></table>
<p class="frm">ความยาวพันธะจริง อยู่<b>ระหว่าง</b>พันธะเดี่ยวกับพันธะคู่</p>
<p>เช่น C–O เดี่ยว 142 pm, C=O คู่ 121 pm แต่ C–O ใน CO₃²⁻ วัดได้ ~129 pm — อยู่ตรงกลางพอดี</p>
<div class="box warn"><b>แก้ความเข้าใจผิด</b> ❌ "สลับไปมาเร็ว ๆ" ✔ <b>เป็นโครงสร้างเดียวตลอดเวลา คือลูกผสมของทุกแบบ</b> เหมือนล่อที่เป็นลูกผสมม้ากับลา ไม่ได้กลายเป็นม้าบ้างลาบ้าง — และลูกศร ↔ <b>ไม่ใช่</b>ลูกศรสมดุล ⇌</div>` },

    { id: "c5", t: "c", x: 740, y: 1100, w: 250, c: "#d98324",
      title: "3.5 ความยาวและพลังงานพันธะ",
      body: "ความยาว: เดี่ยว &gt; คู่ &gt; สาม<br>พลังงาน: สาม &gt; คู่ &gt; เดี่ยว",
      detail: `<h3>3.5 ความยาวพันธะและพลังงานพันธะ</h3>
${SVG_H2CURVE}
<p><b>ความยาวพันธะ</b> = ระยะห่างระหว่างนิวเคลียสที่ทำให้พลังงานศักย์รวมต่ำที่สุด<br>
<b>พลังงานพันธะ</b> = พลังงานน้อยที่สุดที่ใช้สลายพันธะของโมเลกุลแก๊สให้เป็นอะตอมเดี่ยวในสถานะแก๊ส</p>
<table><tr><th>r</th><th>เกิดอะไร</th><th>พลังงาน</th></tr>
<tr><td>300 pm</td><td>ห่างกันมาก ยังไม่รู้สึกถึงกัน</td><td>≈ 0</td></tr>
<tr><td>150 pm</td><td>นิวเคลียสเริ่มดึงดูด e⁻ ของอีกฝ่าย เคลื่อนเข้าหากัน</td><td>เริ่มลดลง</td></tr>
<tr><td><b>74 pm</b></td><td>แรงดึงดูดสมดุลกับแรงผลักพอดี = <b>ความยาวพันธะ</b></td><td><b>−432 kJ/mol</b></td></tr>
<tr><td>45 pm</td><td>ชิดเกิน <b>นิวเคลียสบวกผลักกัน</b> ชนะแรงดึงดูด</td><td>พุ่งขึ้น ไม่เสถียร</td></tr></table>
<div class="box why"><b>แรงที่แข่งกัน</b> ดึงดูด = นิวเคลียส(P) ↔ อิเล็กตรอน(e) ของอีกอะตอม · ผลัก = P↔P และ e↔e จุดที่พลังงานต่ำสุดคือจุดที่ทั้งสองสมดุล</div>
<p class="frm">ความยาว: เดี่ยว &gt; คู่ &gt; สาม &nbsp;·&nbsp; พลังงาน: สาม &gt; คู่ &gt; เดี่ยว</p>
<table><tr><th>พันธะ</th><th>ยาว (pm)</th><th>พลังงาน</th></tr>
<tr><td>N–N</td><td>145</td><td>158</td></tr>
<tr><td>N=N</td><td>124</td><td>470</td></tr>
<tr><td>N≡N</td><td>113</td><td>945</td></tr></table>
<p><b>อะตอมใหญ่ขึ้น → พันธะยาวขึ้น พลังงานต่ำลง</b> : H–F 92/567 → H–Cl 128/431 → H–Br 141/366 → H–I 161/298</p>
<div class="box tip"><b>ตรรกะเดียวจบ</b> สั้น = ดึงแน่น = แข็งแรง = พลังงานสูง · ยาว = หลวม = อ่อน = พลังงานต่ำ</div>` },

    { id: "c6", t: "c", x: 740, y: 1300, w: 250, c: "#d98324",
      title: "3.6 คำนวณ ΔH จากพลังงานพันธะ",
      body: "ΔH = <b>ตั้งต้น − ผลิตภัณฑ์</b><br>+ = ดูด · − = คาย",
      detail: `<h3>3.6 การคำนวณ ΔH จากพลังงานพันธะ</h3>
<p class="frm">ΔH = Σ พลังงานพันธะสารตั้งต้น − Σ พลังงานพันธะผลิตภัณฑ์</p>
<div class="box"><b>สลายพันธะ = ดูด (+)</b> ต้องออกแรงแยกอะตอม &nbsp;·&nbsp; <b>สร้างพันธะ = คาย (−)</b> จับกันแล้วเสถียรขึ้น<br>
ΔH เป็น + → <b>ดูดความร้อน</b> (endothermic) · ΔH เป็น − → <b>คายความร้อน</b> (exothermic)</div>
<h4>ตัวอย่างที่ 1 — H₂(g) + I₂(g) → 2HI(g)</h4>
<pre>ตั้งต้น : (H–H) + (I–I) = 436 + 151 = 587 kJ
ผลิต   : 2 × (H–I)     = 2 × 298   = 596 kJ
ΔH = 587 − 596 = <b>−9 kJ/mol</b>  →  คายพลังงาน 9 kJ/mol</pre>
<h4>ตัวอย่างที่ 2 — 2NH₃(g) → N₂(g) + 3H₂(g)</h4>
<pre>ตั้งต้น : NH₃ มี N–H 3 พันธะ × 2 โมเลกุล = 6 พันธะ
          6 × 391 = 2,346 kJ
ผลิต   : (N≡N) + 3 × (H–H) = 945 + 1,308 = 2,253 kJ
ΔH = 2,346 − 2,253 = <b>+93 kJ/mol</b>  →  ดูดพลังงาน 93 kJ/mol</pre>
<div class="box warn"><b>ผิดบ่อย 3 จุด</b> 1) ลืมคูณสัมประสิทธิ์ (2HI ต้อง × 2) 2) ลืมนับพันธะในโมเลกุลเดียว (NH₃ มี 3 พันธะ) 3) สลับสูตรเป็น ผลิตภัณฑ์ − ตั้งต้น ทำให้เครื่องหมายกลับหมด</div>
<div class="box tip"><b>หยิบค่าให้ถูก</b> N–N 158 กับ N≡N 945 ต่างกันเกือบ 6 เท่า · O–O 144 กับ O=O 498 ก็เช่นกัน — O₂ ในอากาศคือ O=O เสมอ</div>` },

    { id: "c7", t: "c", x: 740, y: 1500, w: 250, c: "#d98324",
      title: "3.7 รูปร่างโมเลกุล VSEPR",
      body: "AB<sub>x</sub>E<sub>y</sub> · กลุ่ม e⁻ ผลักกันให้ห่างที่สุด<br>คู่โดดเดี่ยวมาก = มุมหด",
      detail: `<h3>3.7 รูปร่างโมเลกุล (VSEPR)</h3>
${SVG_VSEPR}
<p class="frm">คู่โดดเดี่ยว–คู่โดดเดี่ยว &gt; คู่โดดเดี่ยว–คู่ร่วมพันธะ &gt; คู่ร่วมพันธะ–คู่ร่วมพันธะ</p>
<div class="box why"><b>ทำไมคู่โดดเดี่ยวผลักแรงกว่า</b> คู่ร่วมพันธะถูกนิวเคลียส<b>สองตัว</b>ดึงไว้จึงถูกบีบให้แคบ ส่วนคู่โดดเดี่ยวมีนิวเคลียส<b>ตัวเดียว</b>ดึง จึงบานออกกินพื้นที่กว้างกว่า แล้วไปเบียดคู่ร่วมพันธะให้หุบเข้า<br>ดูชัด ๆ: CH₄ 109.5° → NH₃ 107° → H₂O 104.5°</div>
<table><tr><th>สูตร</th><th>รูปร่าง</th><th>มุม</th><th>ตัวอย่าง</th></tr>
<tr><td>AB₂</td><td>เส้นตรง</td><td>180°</td><td>CO₂ BeCl₂ HCN</td></tr>
<tr><td>AB₂E</td><td>มุมงอ</td><td>&lt; 120°</td><td>SO₂</td></tr>
<tr><td>AB₂E₂</td><td>มุมงอ</td><td>104.5°</td><td>H₂O H₂S</td></tr>
<tr><td>AB₂E₃</td><td>เส้นตรง</td><td>180°</td><td>XeF₂ I₃⁻</td></tr>
<tr><td>AB₃</td><td>สามเหลี่ยมแบนราบ</td><td>120°</td><td>BF₃ SO₃ NO₃⁻ CO₃²⁻</td></tr>
<tr><td>AB₃E</td><td>พีระมิดฐานสามเหลี่ยม</td><td>107°</td><td>NH₃ PCl₃ H₃O⁺</td></tr>
<tr><td>AB₃E₂</td><td>รูปตัวที</td><td>90° / 180°</td><td>ClF₃ BrF₃</td></tr>
<tr><td>AB₄</td><td>ทรงสี่หน้า</td><td>109.5°</td><td>CH₄ CCl₄ NH₄⁺ SO₄²⁻</td></tr>
<tr><td>AB₄E</td><td>ทรงสี่หน้าบิดเบี้ยว</td><td>—</td><td>SF₄</td></tr>
<tr><td>AB₄E₂</td><td>สี่เหลี่ยมแบนราบ</td><td>90°</td><td>XeF₄</td></tr>
<tr><td>AB₅</td><td>พีระมิดคู่ฐานสามเหลี่ยม</td><td>90°, 120°, 180°</td><td>PCl₅</td></tr>
<tr><td>AB₅E</td><td>พีระมิดฐานสี่เหลี่ยม</td><td>90°</td><td>BrF₅ IF₅</td></tr>
<tr><td>AB₆</td><td>ทรงแปดหน้า</td><td>90°</td><td>SF₆</td></tr></table>
<h4>เปรียบเทียบมุมพันธะ</h4>
<table><tr><th>คู่เทียบ</th><th>มุม</th><th>เหตุผล</th></tr>
<tr><td>H₂O เทียบ OF₂</td><td>104.5° เทียบ 103.2°</td><td>F มี EN สูงกว่า H ดึง e⁻ <b>ออกจาก</b>อะตอมกลาง แรงผลักน้อยลง มุมจึงเล็กลง</td></tr>
<tr><td>NH₃ เทียบ PH₃</td><td>107° เทียบ 94°</td><td>N มี EN สูงกว่า P ดึง e⁻ <b>เข้าหา</b>อะตอมกลาง แรงผลักมากขึ้น มุมจึงกว้างกว่า</td></tr></table>
<div class="box warn"><b>รูปทรงกลุ่มอิเล็กตรอน ≠ รูปร่างโมเลกุล</b> NH₃ มีกลุ่ม e⁻ 4 กลุ่มจัดเป็นทรงสี่หน้า แต่<b>รูปร่างโมเลกุล</b>คือพีระมิดฐานสามเหลี่ยม เพราะคู่โดดเดี่ยวมองไม่เห็น</div>` },

    { id: "c8", t: "c", x: 740, y: 1700, w: 250, c: "#d98324",
      title: "3.8 สภาพขั้วของพันธะและโมเลกุล",
      body: "EN ตัดสิน<b>พันธะ</b> · รูปร่างตัดสิน<b>โมเลกุล</b><br>CO₂ ไม่มีขั้ว · H₂O มีขั้ว",
      detail: `<h3>3.8 สภาพขั้วของพันธะและโมเลกุล</h3>
<h4>ระดับที่ 1 · พันธะ — ตัดสินด้วยผลต่าง EN</h4>
<table><tr><th>ผลต่าง EN</th><th>ชนิด</th><th>ตัวอย่าง</th></tr>
<tr><td>&lt; 0.4</td><td>โคเวเลนต์ไม่มีขั้ว</td><td>H₂ Cl₂ O₂ N₂</td></tr>
<tr><td>0.4 – 1.7</td><td>โคเวเลนต์มีขั้ว</td><td>H–Cl (0.9) H–O (1.4)</td></tr>
<tr><td>≥ 1.7–1.8</td><td>ไอออนิก</td><td>NaCl (2.1)</td></tr></table>
<h4>ระดับที่ 2 · โมเลกุล — ต้องดูรูปร่างด้วย</h4>
<p class="frm">รวมเวกเตอร์โมเมนต์ขั้วทุกพันธะ · ผลรวม = 0 → ไม่มีขั้ว</p>
<div class="box why"><b>CO₂ มีพันธะมีขั้ว แต่โมเลกุลไม่มีขั้ว</b><br>
C=O ทั้งสองมีขั้วจริง แต่ CO₂ เป็น<b>เส้นตรง</b> โมเมนต์ขั้วชี้ตรงข้ามกัน 180° พอดี จึง<b>หักล้างกันหมด</b><br>
ส่วน H₂O เป็น<b>มุมงอ 104.5°</b> เวกเตอร์ไม่หักล้าง เหลือผลรวมชี้ไปทาง O → <b>มีขั้ว</b></div>
<table><tr><th>ไม่มีขั้ว (สมมาตร)</th><th>มีขั้ว (ไม่สมมาตร)</th></tr>
<tr><td>CO₂ BF₃ CCl₄ CH₄ PCl₅ SF₆ BeCl₂</td><td>H₂O NH₃ SO₂ H₂S CHCl₃</td></tr></table>
<div class="box tip"><b>ทางลัด 2 บรรทัด</b><br>1. อะตอมกลาง<b>มีคู่โดดเดี่ยว</b> → เกือบจะมีขั้วเสมอ<br>2. อะตอมกลาง<b>ไม่มีคู่โดดเดี่ยว</b> และอะตอมล้อมรอบเหมือนกันหมด → ไม่มีขั้ว</div>
<div class="box warn"><b>คำถามหลอกยอดฮิต</b> "CCl₄ มีพันธะมีขั้ว จึงเป็นโมเลกุลมีขั้ว" — <b>ผิด</b> ทรงสี่หน้าสมมาตรหักล้างกันพอดี แต่เปลี่ยน Cl เป็น H ตัวเดียวได้ CHCl₃ ความสมมาตรพัง กลายเป็นมีขั้วทันที</div>` },

    { id: "c9", t: "c", x: 740, y: 1900, w: 250, c: "#d98324",
      title: "3.9 แรงระหว่างโมเลกุลและสมบัติ",
      body: "ลอนดอน &lt; ขั้ว–ขั้ว &lt; <b>พันธะไฮโดรเจน</b><br>จุดเดือดต่ำ ไม่นำไฟฟ้า",
      detail: `<h3>3.9 แรงยึดเหนี่ยวระหว่างโมเลกุลและสมบัติสารโคเวเลนต์</h3>
<div class="box warn"><b>แยกให้ออกก่อน</b> <b>พันธะโคเวเลนต์</b> = แรงยึด<b>ภายใน</b>โมเลกุล (แข็งแรงมาก) ส่วน<b>แรงระหว่างโมเลกุล</b> = แรงยึดระหว่างโมเลกุลกับโมเลกุล (อ่อนกว่ามาก) — เวลาน้ำเดือด เราพังแค่พันธะไฮโดรเจน ไม่ได้พัง O–H ไอน้ำจึงยังเป็น H₂O</div>
<p class="frm">แรงลอนดอน &lt; แรงขั้ว–ขั้ว &lt; พันธะไฮโดรเจน</p>
<table><tr><th>แรง</th><th>เกิดกับใคร</th><th>ตัวอย่าง</th></tr>
<tr><td>ลอนดอน</td><td>ทุกโมเลกุล โดยเฉพาะที่ไม่มีขั้ว</td><td>H₂ O₂ CH₄ I₂</td></tr>
<tr><td>ขั้ว–ขั้ว</td><td>โมเลกุลมีขั้ว</td><td>HCl SO₂ CHCl₃</td></tr>
<tr><td>พันธะไฮโดรเจน</td><td>H ต่อกับ <b>F, O, N</b> โดยตรง</td><td>H₂O HF NH₃</td></tr></table>
<div class="box why"><b>ทำไมต้องเป็น F O N</b> สามตัวนี้ EN สูงมากและอะตอมเล็ก จึงดึง e⁻ จาก H ไปเกือบหมด H ที่เหลือแทบเป็นโปรตอนเปลือย ประจุบวกเข้มข้นและเล็กมาก จึงเข้าไปจ่อกับคู่โดดเดี่ยวของโมเลกุลข้างเคียงได้ใกล้เป็นพิเศษ<br><b>หลักฐาน:</b> H₂O เดือด 100 °C แต่ H₂S ซึ่งหนักกว่าเดือดที่ −60 °C</div>
<h4>สมบัติของสารโคเวเลนต์</h4>
<ul><li><b>จุดเดือด/จุดหลอมเหลวต่ำ</b> เพราะพังแค่แรงระหว่างโมเลกุล</li>
<li><b>ไม่นำไฟฟ้า</b>ทุกสถานะ เพราะไม่มีไอออนและไม่มี e⁻ อิสระ</li>
<li>ละลายตามหลัก <b>like dissolves like</b></li></ul>
<h4>ข้อยกเว้น — โครงผลึกร่างตาข่าย</h4>
<table><tr><th>สาร</th><th>จุดหลอมเหลว</th><th>นำไฟฟ้า</th></tr>
<tr><td>เพชร (C)</td><td>~3,550 °C</td><td>ไม่นำ (ใช้ e⁻ หมด 4 ตัว)</td></tr>
<tr><td>แกรไฟต์ (C)</td><td>สูงมาก</td><td><b>นำได้</b> (ต่อ C แค่ 3 ตัว เหลือ e⁻ 1 ตัวไหลได้)</td></tr>
<tr><td>SiO₂</td><td>~1,710 °C</td><td>ไม่นำ</td></tr></table>
<div class="box tip"><b>เจอ "โคเวเลนต์แต่จุดหลอมเหลวสูงมาก"</b> ให้นึกถึง เพชร แกรไฟต์ SiO₂ ทันที เพราะทั้งก้อนต่อกันด้วยพันธะโคเวเลนต์เป็นร่างแห ไม่มีโมเลกุลให้แยก</div>` },

    { id: "d0", t: "c", x: 1080, y: 100, w: 250, c: "#7c5cd6",
      title: "4. พันธะโลหะ",
      body: "โลหะ + โลหะ<br>ปล่อย e⁻ รวมเป็น<b>ทะเลอิเล็กตรอน</b>",
      detail: `<h3>4. พันธะโลหะ — ภาพรวมทั้งบท</h3>
${SVG_ESEA}
<p>โลหะเจอโลหะ ทั้งคู่ EN ต่ำ ไม่มีใครอยากรับ e⁻ ทางออกคือทุกตัวปล่อยเวเลนซ์อิเล็กตรอนออกมากองรวมกันเป็น<b>ทะเลอิเล็กตรอน</b> เหลือไอออนบวกเรียงอยู่กับที่</p>
<p class="frm">พันธะโลหะ = แรงดึงดูดระหว่างไอออนบวกกับทะเลอิเล็กตรอน</p>
<table><tr><th>หัวข้อ</th><th>แก่นของเรื่อง</th></tr>
<tr><td>4.1 การเกิดพันธะ</td><td>ทะเลอิเล็กตรอน (electron sea)</td></tr>
<tr><td>4.2 สมบัติของโลหะ</td><td>นำไฟฟ้า/ความร้อน · ตีแผ่ได้ · มันวาว · จุดหลอมเหลวสูง</td></tr>
<tr><td>4.3 ตารางเปรียบเทียบ</td><td>สรุปพันธะทั้ง 3 ชนิด</td></tr></table>
<div class="box tip"><b>ทั้งบทมาจากประโยคเดียว</b> "มีอิเล็กตรอนที่เคลื่อนที่ได้อิสระทั่วทั้งก้อน" — สมบัติทุกข้อของโลหะอธิบายได้ด้วยประโยคนี้</div>` },

    { id: "d1", t: "c", x: 1080, y: 300, w: 250, c: "#7c5cd6",
      title: "4.1 การเกิดพันธะโลหะ",
      body: "ไอออนบวกอยู่กับที่<br>e⁻ ไหลได้ทั่วก้อน ไม่เป็นของใคร",
      detail: `<h3>4.1 แบบจำลองทะเลอิเล็กตรอน</h3>
${SVG_ESEA}
<ol>
<li>อะตอมโลหะมี <b>IE ต่ำ EN ต่ำ</b> — ปล่อย e⁻ ง่าย แต่ไม่มีใครอยากรับ</li>
<li>e⁻ ที่ปล่อยออกมาจึง<b>กองรวมกันเป็นทะเล</b> ไม่เป็นของอะตอมใด</li>
<li>อะตอมที่เสีย e⁻ กลายเป็น<b>ไอออนบวก</b> เรียงเป็นระเบียบอยู่กับที่</li>
<li>ไอออนบวกทุกตัวถูกทะเล e⁻ ดึงดูดไว้พร้อมกัน = <b>พันธะโลหะ</b></li>
</ol>
<div class="box why"><b>ทำไมไอออนบวกที่ติดกันไม่ผลักกันจนก้อนแตก</b> เพราะมี<b>ทะเลอิเล็กตรอนคั่นอยู่ตรงกลางตลอดเวลา</b> อิเล็กตรอนลบทำหน้าที่เหมือนกาวแทรกระหว่างไอออนบวกทุกคู่ แรงดึงดูดบวก–ลบจึงชนะแรงผลักบวก–บวกเสมอ</div>
<table><tr><th>พันธะ</th><th>อิเล็กตรอนอยู่ที่ไหน</th></tr>
<tr><td>ไอออนิก</td><td><b>ย้ายไปเลย</b> ไปอยู่กับอโลหะถาวร</td></tr>
<tr><td>โคเวเลนต์</td><td><b>ใช้ร่วมกันเฉพาะคู่</b> ระหว่างอะตอม 2 ตัว</td></tr>
<tr><td>โลหะ</td><td><b>ใช้ร่วมกันทั้งก้อน</b> ไหลไปไหนก็ได้</td></tr></table>
<div class="box tip"><b>พูดให้ถูก</b> โลหะไม่มีโมเลกุลและไม่มีสูตรโมเลกุล เขียน Cu, Fe, Na ตัวเดียวก็หมายถึงทั้งก้อนแล้ว</div>` },

    { id: "d2", t: "c", x: 1080, y: 500, w: 250, c: "#7c5cd6",
      title: "4.2 สมบัติของโลหะ",
      body: "นำไฟฟ้า<b>ทุกสถานะ</b> · ตีแผ่ได้<br>มันวาว · จุดหลอมเหลวสูง",
      detail: `<h3>4.2 สมบัติของโลหะและเหตุผล</h3>
<table><tr><th>สมบัติ</th><th>เพราะอะไร</th></tr>
<tr><td>นำไฟฟ้าได้ดีทุกสถานะ</td><td>มี e⁻ อิสระพร้อมใช้อยู่แล้ว ไม่ต้องหลอมก่อนเหมือนสารไอออนิก</td></tr>
<tr><td>นำความร้อนได้ดี</td><td>e⁻ ที่ได้รับความร้อนวิ่งเร็วขึ้นแล้วไปชนถ่ายทอดพลังงานให้ส่วนอื่นทันที</td></tr>
<tr><td>ตีแผ่/ดึงเป็นเส้นได้</td><td>ชั้นไอออนเลื่อนแล้วทะเล e⁻ ไหลตามไปคั่นกลางเหมือนเดิม พันธะไม่ขาด</td></tr>
<tr><td>เป็นมันวาว</td><td>e⁻ อิสระที่ผิวดูดกลืนแสงแล้วปล่อยกลับออกมาเกือบหมด</td></tr>
<tr><td>จุดหลอมเหลวสูง</td><td>ต้องพังแรงดึงดูดระหว่างไอออนบวกทั้งหมดกับทะเล e⁻ พร้อมกัน</td></tr></table>
${SVG_BRITTLE}
<div class="box why"><b>โลหะตีแผ่ได้ แต่ไอออนิกแตก — ต่างกันตรงไหน</b><br>
<b>โลหะ:</b> ชั้นเลื่อน → ไอออนบวกเจอไอออนบวก <b>แต่ทะเล e⁻ ไหลตามมาคั่น</b> → พันธะยังอยู่ เปลี่ยนรูปได้<br>
<b>ไอออนิก:</b> ชั้นเลื่อน → ประจุเหมือนกันเจอกันเต็ม ๆ ไม่มีอะไรคั่น → ผลักกันทั้งระนาบ แตกทันที<br>
ทองคำ 1 กรัมจึงตีเป็นแผ่นได้เป็นตารางเมตร แต่เกลือทุบทีเดียวก็ป่น</div>
<div class="box warn"><b>อย่าเหมารวมว่าโลหะทุกตัวจุดหลอมเหลวสูง</b><br>
• <b>Hg เป็นของเหลว</b>ที่อุณหภูมิห้อง (−39 °C)<br>
• <b>หมู่ 1A ต่ำ</b>: Na 98 °C, K 63 °C ตัดด้วยมีดได้<br>
เหตุผล: 1A ปล่อย e⁻ ได้แค่ตัวเดียว ทะเลอิเล็กตรอนจึงจาง ประจุไอออนแค่ +1 พันธะจึงอ่อน ส่วนทรานซิชันปล่อยได้หลายตัว ทะเลเข้มข้น จึงแข็งแรงกว่ามาก (W = 3,422 °C)</div>` },

    { id: "d3", t: "c", x: 1080, y: 700, w: 250, c: "#7c5cd6",
      title: "4.3 เปรียบเทียบพันธะทั้ง 3 ชนิด",
      body: "ย้ายไปเลย = ไอออนิก<br>ใช้ร่วมเป็นคู่ = โคเวเลนต์ · ไหลทั่วก้อน = โลหะ",
      detail: `<h3>4.3 สรุปรวบยอด — เปรียบเทียบพันธะทั้ง 3 ชนิด</h3>
<table><tr><th>หัวข้อ</th><th>ไอออนิก</th><th>โคเวเลนต์</th><th>โลหะ</th></tr>
<tr><td>เกิดระหว่าง</td><td>โลหะ + อโลหะ</td><td>อโลหะ + อโลหะ</td><td>โลหะ + โลหะ</td></tr>
<tr><td>e⁻ ทำอะไร</td><td>ย้ายไปเลย</td><td>ใช้ร่วมกันเป็นคู่</td><td>ไหลรวมทั้งก้อน</td></tr>
<tr><td>ผลต่าง EN</td><td>≥ 1.7–1.8</td><td>&lt; 1.7</td><td>ต่ำทั้งคู่</td></tr>
<tr><td>อนุภาค</td><td>ไอออนในโครงผลึก</td><td>โมเลกุล</td><td>ไอออนบวก + ทะเล e⁻</td></tr>
<tr><td>จุดหลอมเหลว</td><td>สูง</td><td>ต่ำ (ยกเว้นร่างตาข่าย)</td><td>สูงมาก (ยกเว้น 1A, Hg)</td></tr>
<tr><td>นำไฟฟ้า</td><td>ของแข็งไม่นำ · หลอม/ละลายน้ำนำ</td><td>ไม่นำ (ยกเว้นแกรไฟต์)</td><td>นำทุกสถานะ</td></tr>
<tr><td>ตัวนำประจุ</td><td>ไอออน</td><td>ไม่มี</td><td>e⁻ อิสระ</td></tr>
<tr><td>โดนทุบ</td><td>แตกเป็นระนาบเรียบ</td><td>ยุ่ยเป็นผง</td><td>บุบ ยืด ไม่แตก</td></tr>
<tr><td>ตัวอย่าง</td><td>NaCl MgO CaCO₃</td><td>H₂O CO₂ CH₄</td><td>Cu Fe Al Na</td></tr></table>
<div class="box tip"><b>ตอบข้อสอบ "ระบุชนิดพันธะจากตารางสมบัติ"</b><br>
1. ดู<b>นำไฟฟ้าตอนของแข็ง</b>ก่อน — นำ = <b>โลหะ</b> (หรือแกรไฟต์) จบทันที<br>
2. ของแข็งไม่นำ แต่หลอม/ละลายน้ำนำ = <b>ไอออนิก</b><br>
3. ไม่นำเลย + จุดหลอมเหลวต่ำ = <b>โคเวเลนต์</b><br>
4. ไม่นำเลย + จุดหลอมเหลวสูงมาก = <b>โคเวเลนต์ร่างตาข่าย</b> (เพชร SiO₂)</div>
<div class="box warn"><b>ข้อยกเว้นที่ต้องจำทั้งสี่</b> แกรไฟต์นำไฟฟ้า · เพชรกับ SiO₂ จุดหลอมเหลวสูงมาก · Hg เป็นของเหลว · โลหะหมู่ 1A จุดหลอมเหลวต่ำ</div>` },

    { id: "nl1", t: "n", a: { id: "a0" }, b: { id: "b0" }, c: "auto", w: 2.5, arrow: "end", route: "e" },
    { id: "nl2", t: "n", a: { id: "b0" }, b: { id: "c0" }, c: "auto", w: 2.5, arrow: "end", route: "e" },
    { id: "nl3", t: "n", a: { id: "c0" }, b: { id: "d0" }, c: "auto", w: 2.5, arrow: "end", route: "e" },

    { id: "nb1", t: "n", a: { id: "b0" }, b: { id: "b1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nb2", t: "n", a: { id: "b0" }, b: { id: "b2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nb3", t: "n", a: { id: "b0" }, b: { id: "b3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nb4", t: "n", a: { id: "b0" }, b: { id: "b4" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nb5", t: "n", a: { id: "b0" }, b: { id: "b5" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nb6", t: "n", a: { id: "b0" }, b: { id: "b6" }, c: "auto", w: 2, arrow: "end", route: "e" },

    { id: "nc1", t: "n", a: { id: "c0" }, b: { id: "c1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc2", t: "n", a: { id: "c0" }, b: { id: "c2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc3", t: "n", a: { id: "c0" }, b: { id: "c3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc4", t: "n", a: { id: "c0" }, b: { id: "c4" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc5", t: "n", a: { id: "c0" }, b: { id: "c5" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc6", t: "n", a: { id: "c0" }, b: { id: "c6" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc7", t: "n", a: { id: "c0" }, b: { id: "c7" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc8", t: "n", a: { id: "c0" }, b: { id: "c8" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nc9", t: "n", a: { id: "c0" }, b: { id: "c9" }, c: "auto", w: 2, arrow: "end", route: "e" },

    { id: "nd1", t: "n", a: { id: "d0" }, b: { id: "d1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nd2", t: "n", a: { id: "d0" }, b: { id: "d2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "nd3", t: "n", a: { id: "d0" }, b: { id: "d3" }, c: "auto", w: 2, arrow: "end", route: "e" }
  ];
})();
