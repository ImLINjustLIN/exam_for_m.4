/* ============================================================
   content-bio.js — ชีววิทยา (เสริม) : เซลล์ของสิ่งมีชีวิต
   บทที่ 1 เคมีที่เป็นพื้นฐานของสิ่งมีชีวิต
   บทที่ 2 สารชีวโมเลกุล (คาร์โบไฮเดรต โปรตีน ลิพิด กรดนิวคลีอิก)
   บทที่ 3 ปฏิกิริยาเคมีในสิ่งมีชีวิต (พลังงาน เอนไซม์ เมแทบอลิซึม)
   ------------------------------------------------------------
   สรุปจากเอกสารประกอบการเรียนของครูโดยตรง 3 ไฟล์ รวม 60 หน้า
   ตัวเลขและชื่อเฉพาะทุกตัวตรงตามเอกสารต้นฉบับ
   ============================================================ */
(function () {
  const ID = "bio_slot";

  /* ---------- รูปประกอบ : วาดเป็น SVG inline ทั้งหมด (ห้ามใช้รูปจากเว็บนอก) ---------- */

  const SVG_WATER = `
<svg viewBox="0 0 380 240" width="380" height="240" role="img" aria-label="ความมีขั้วของน้ำและพันธะไฮโดรเจน">
  <line x1="152" y1="92" x2="246" y2="140" stroke="#2e9e6b" stroke-width="3" stroke-dasharray="6 5"/>
  <text x="208" y="100" text-anchor="middle" font-size="12" fill="#2e9e6b" font-weight="700">พันธะไฮโดรเจน</text>
  <text x="214" y="116" text-anchor="middle" font-size="10.5" fill="#2e9e6b">อ่อนกว่าพันธะโคเวเลนต์</text>
  <line x1="96" y1="74" x2="86" y2="86" stroke="currentColor" stroke-width="2.5"/>
  <line x1="124" y1="74" x2="134" y2="86" stroke="currentColor" stroke-width="2.5"/>
  <circle cx="110" cy="58" r="21" fill="#3b7ddd"/>
  <text x="110" y="63" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">O</text>
  <text x="110" y="28" text-anchor="middle" font-size="12" fill="#3b7ddd" font-weight="700">&#948;&#8722;</text>
  <circle cx="78" cy="94" r="12" fill="#d98324"/>
  <text x="78" y="98" text-anchor="middle" font-size="10.5" fill="#fff" font-weight="700">H</text>
  <circle cx="142" cy="94" r="12" fill="#d98324"/>
  <text x="142" y="98" text-anchor="middle" font-size="10.5" fill="#fff" font-weight="700">H</text>
  <text x="50" y="112" text-anchor="middle" font-size="12" fill="#d98324" font-weight="700">&#948;+</text>
  <text x="170" y="112" text-anchor="middle" font-size="12" fill="#d98324" font-weight="700">&#948;+</text>
  <line x1="264" y1="166" x2="254" y2="178" stroke="currentColor" stroke-width="2.5"/>
  <line x1="292" y1="166" x2="302" y2="178" stroke="currentColor" stroke-width="2.5"/>
  <circle cx="278" cy="150" r="21" fill="#3b7ddd"/>
  <text x="278" y="155" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">O</text>
  <circle cx="246" cy="186" r="12" fill="#d98324"/>
  <text x="246" y="190" text-anchor="middle" font-size="10.5" fill="#fff" font-weight="700">H</text>
  <circle cx="310" cy="186" r="12" fill="#d98324"/>
  <text x="310" y="190" text-anchor="middle" font-size="10.5" fill="#fff" font-weight="700">H</text>
  <text x="40" y="150" font-size="11.5" fill="currentColor">อิเล็กตรอนคู่ร่วมพันธะเอียงไปทาง O</text>
  <text x="40" y="166" font-size="11.5" fill="currentColor">O จึงค่อนข้างลบ · H ค่อนข้างบวก</text>
  <text x="40" y="182" font-size="11.5" fill="currentColor">โมเลกุลน้ำจึง<tspan font-weight="700">เป็นโมเลกุลมีขั้ว</tspan></text>
  <text x="190" y="226" text-anchor="middle" font-size="11.5" fill="currentColor">ภายในโมเลกุล = พันธะโคเวเลนต์ · ระหว่างโมเลกุล = พันธะไฮโดรเจน</text>
</svg>`;

  const SVG_CBOND = `
<svg viewBox="0 0 380 150" width="380" height="150" role="img" aria-label="พันธะเดี่ยว พันธะคู่ พันธะสาม ระหว่างคาร์บอน">
  <text x="60" y="26" text-anchor="middle" font-size="12.5" fill="currentColor" font-weight="700">พันธะเดี่ยว</text>
  <text x="190" y="26" text-anchor="middle" font-size="12.5" fill="currentColor" font-weight="700">พันธะคู่</text>
  <text x="320" y="26" text-anchor="middle" font-size="12.5" fill="currentColor" font-weight="700">พันธะสาม</text>
  <circle cx="34" cy="70" r="17" fill="#7c5cd6"/><text x="34" y="75" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">C</text>
  <circle cx="86" cy="70" r="17" fill="#7c5cd6"/><text x="86" y="75" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">C</text>
  <line x1="51" y1="70" x2="69" y2="70" stroke="currentColor" stroke-width="2.5"/>
  <circle cx="164" cy="70" r="17" fill="#7c5cd6"/><text x="164" y="75" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">C</text>
  <circle cx="216" cy="70" r="17" fill="#7c5cd6"/><text x="216" y="75" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">C</text>
  <line x1="181" y1="65" x2="199" y2="65" stroke="currentColor" stroke-width="2.5"/>
  <line x1="181" y1="75" x2="199" y2="75" stroke="currentColor" stroke-width="2.5"/>
  <circle cx="294" cy="70" r="17" fill="#7c5cd6"/><text x="294" y="75" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">C</text>
  <circle cx="346" cy="70" r="17" fill="#7c5cd6"/><text x="346" y="75" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">C</text>
  <line x1="311" y1="62" x2="329" y2="62" stroke="currentColor" stroke-width="2.5"/>
  <line x1="311" y1="70" x2="329" y2="70" stroke="currentColor" stroke-width="2.5"/>
  <line x1="311" y1="78" x2="329" y2="78" stroke="currentColor" stroke-width="2.5"/>
  <text x="60" y="110" text-anchor="middle" font-size="11.5" fill="currentColor">อีเทน C&#8322;H&#8326;</text>
  <text x="190" y="110" text-anchor="middle" font-size="11.5" fill="currentColor">เอทิลีน C&#8322;H&#8324;</text>
  <text x="320" y="110" text-anchor="middle" font-size="11.5" fill="currentColor">อะเซทิลีน C&#8322;H&#8322;</text>
  <text x="190" y="136" text-anchor="middle" font-size="11.5" fill="currentColor">คาร์บอนมีเวเลนซ์อิเล็กตรอน 4 จึงสร้างพันธะโคเวเลนต์ได้สูงสุด 4 พันธะ</text>
</svg>`;

  const SVG_ENERGY = `
<svg viewBox="0 0 390 200" width="390" height="200" role="img" aria-label="กราฟปฏิกิริยาดูดพลังงานและคายพลังงาน">
  <line x1="30" y1="170" x2="180" y2="170" stroke="currentColor" stroke-width="1.5"/>
  <line x1="30" y1="170" x2="30" y2="30" stroke="currentColor" stroke-width="1.5"/>
  <path d="M42 140 C 80 140, 90 50, 110 50 C 130 50, 140 82, 172 82" fill="none" stroke="#e05252" stroke-width="2.6"/>
  <line x1="42" y1="140" x2="42" y2="82" stroke="#d98324" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="105" y="22" text-anchor="middle" font-size="12" fill="currentColor" font-weight="700">ดูดพลังงาน</text>
  <text x="46" y="160" font-size="10.5" fill="currentColor">สารตั้งต้น</text>
  <text x="128" y="100" font-size="10.5" fill="currentColor">ผลิตภัณฑ์สูงกว่า</text>
  <text x="12" y="100" font-size="10.5" fill="currentColor" transform="rotate(-90 12 100)">พลังงาน</text>
  <line x1="210" y1="170" x2="370" y2="170" stroke="currentColor" stroke-width="1.5"/>
  <line x1="210" y1="170" x2="210" y2="30" stroke="currentColor" stroke-width="1.5"/>
  <path d="M222 74 C 260 74, 268 44, 290 44 C 312 44, 322 138, 360 138" fill="none" stroke="#2e9e6b" stroke-width="2.6"/>
  <line x1="222" y1="74" x2="222" y2="44" stroke="#e05252" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="290" y="22" text-anchor="middle" font-size="12" fill="currentColor" font-weight="700">คายพลังงาน</text>
  <text x="226" y="92" font-size="10.5" fill="currentColor">สารตั้งต้น</text>
  <text x="310" y="158" font-size="10.5" fill="currentColor">ผลิตภัณฑ์ต่ำกว่า</text>
  <text x="200" y="192" text-anchor="middle" font-size="11" fill="currentColor">แกนนอน = การดำเนินไปของปฏิกิริยา · โหนกกลาง = พลังงานก่อกัมมันต์</text>
</svg>`;

  const SVG_EA = `
<svg viewBox="0 0 380 200" width="380" height="200" role="img" aria-label="เอนไซม์ลดพลังงานก่อกัมมันต์">
  <line x1="36" y1="168" x2="364" y2="168" stroke="currentColor" stroke-width="1.5"/>
  <line x1="36" y1="168" x2="36" y2="24" stroke="currentColor" stroke-width="1.5"/>
  <path d="M52 78 C 120 78, 140 34, 180 34 C 220 34, 240 140, 344 140" fill="none" stroke="#e05252" stroke-width="2.6"/>
  <path d="M52 78 C 120 78, 148 58, 180 58 C 212 58, 240 140, 344 140" fill="none" stroke="#3b7ddd" stroke-width="2.6" stroke-dasharray="7 4"/>
  <line x1="52" y1="78" x2="52" y2="34" stroke="#e05252" stroke-width="2"/>
  <line x1="66" y1="78" x2="66" y2="58" stroke="#3b7ddd" stroke-width="2"/>
  <text x="196" y="24" font-size="11.5" fill="#e05252" font-weight="700">ไม่มีเอนไซม์ — โหนกสูง</text>
  <text x="196" y="72" font-size="11.5" fill="#3b7ddd" font-weight="700">มีเอนไซม์ — โหนกเตี้ยลง</text>
  <text x="56" y="96" font-size="10.5" fill="currentColor">สารตั้งต้น</text>
  <text x="290" y="160" font-size="10.5" fill="currentColor">สารผลิตภัณฑ์</text>
  <text x="18" y="100" font-size="10.5" fill="currentColor" transform="rotate(-90 18 100)">พลังงาน</text>
  <text x="200" y="192" text-anchor="middle" font-size="11" fill="currentColor">เอนไซม์ลดเฉพาะ "โหนก" — ระดับสารตั้งต้นและผลิตภัณฑ์ไม่เปลี่ยน</text>
</svg>`;

  const SVG_PH = `
<svg viewBox="0 0 380 190" width="380" height="190" role="img" aria-label="ช่วง pH ที่เหมาะสมของเพปซิน อะไมเลส ทริปซิน">
  <line x1="36" y1="150" x2="364" y2="150" stroke="currentColor" stroke-width="1.5"/>
  <line x1="36" y1="150" x2="36" y2="24" stroke="currentColor" stroke-width="1.5"/>
  <path d="M46 150 C 66 150, 68 40, 88 40 C 108 40, 112 150, 130 150" fill="none" stroke="#e05252" stroke-width="2.6"/>
  <path d="M136 150 C 170 150, 178 44, 200 44 C 222 44, 232 150, 264 150" fill="none" stroke="#2e9e6b" stroke-width="2.6"/>
  <path d="M198 150 C 236 150, 246 52, 268 52 C 290 52, 300 150, 340 150" fill="none" stroke="#3b7ddd" stroke-width="2.6"/>
  <text x="88" y="32" text-anchor="middle" font-size="11.5" fill="#e05252" font-weight="700">เพปซิน</text>
  <text x="200" y="36" text-anchor="middle" font-size="11.5" fill="#2e9e6b" font-weight="700">อะไมเลส</text>
  <text x="290" y="44" text-anchor="middle" font-size="11.5" fill="#3b7ddd" font-weight="700">ทริปซิน</text>
  <text x="88" y="166" text-anchor="middle" font-size="10.5" fill="currentColor">pH 2</text>
  <text x="200" y="166" text-anchor="middle" font-size="10.5" fill="currentColor">pH 7</text>
  <text x="270" y="166" text-anchor="middle" font-size="10.5" fill="currentColor">pH 8</text>
  <text x="18" y="110" font-size="10.5" fill="currentColor" transform="rotate(-90 18 110)">อัตราการเกิดปฏิกิริยา</text>
  <text x="200" y="184" text-anchor="middle" font-size="11" fill="currentColor">แกนนอน = pH (เอกสารครูให้กราฟช่วง 0–10)</text>
</svg>`;

  const SVG_BILAYER = `
<svg viewBox="0 0 380 170" width="380" height="170" role="img" aria-label="ฟอสโฟลิพิดสองชั้นของเยื่อหุ้มเซลล์">
  <text x="190" y="18" text-anchor="middle" font-size="11.5" fill="currentColor">ด้านนอกเซลล์ (มีน้ำ)</text>
  <g stroke="#2e9e6b" stroke-width="2.2" fill="none">
    <path d="M28 44 l0 34 M36 44 l0 34 M58 44 l0 34 M66 44 l0 34 M88 44 l0 34 M96 44 l0 34 M118 44 l0 34 M126 44 l0 34 M148 44 l0 34 M156 44 l0 34 M178 44 l0 34 M186 44 l0 34 M208 44 l0 34 M216 44 l0 34 M238 44 l0 34 M246 44 l0 34 M268 44 l0 34 M276 44 l0 34 M298 44 l0 34 M306 44 l0 34 M328 44 l0 34 M336 44 l0 34"/>
    <path d="M28 92 l0 34 M36 92 l0 34 M58 92 l0 34 M66 92 l0 34 M88 92 l0 34 M96 92 l0 34 M118 92 l0 34 M126 92 l0 34 M148 92 l0 34 M156 92 l0 34 M178 92 l0 34 M186 92 l0 34 M208 92 l0 34 M216 92 l0 34 M238 92 l0 34 M246 92 l0 34 M268 92 l0 34 M276 92 l0 34 M298 92 l0 34 M306 92 l0 34 M328 92 l0 34 M336 92 l0 34"/>
  </g>
  <g fill="#d98324">
    <circle cx="32" cy="38" r="9"/><circle cx="62" cy="38" r="9"/><circle cx="92" cy="38" r="9"/><circle cx="122" cy="38" r="9"/><circle cx="152" cy="38" r="9"/><circle cx="182" cy="38" r="9"/><circle cx="212" cy="38" r="9"/><circle cx="242" cy="38" r="9"/><circle cx="272" cy="38" r="9"/><circle cx="302" cy="38" r="9"/><circle cx="332" cy="38" r="9"/>
    <circle cx="32" cy="132" r="9"/><circle cx="62" cy="132" r="9"/><circle cx="92" cy="132" r="9"/><circle cx="122" cy="132" r="9"/><circle cx="152" cy="132" r="9"/><circle cx="182" cy="132" r="9"/><circle cx="212" cy="132" r="9"/><circle cx="242" cy="132" r="9"/><circle cx="272" cy="132" r="9"/><circle cx="302" cy="132" r="9"/><circle cx="332" cy="132" r="9"/>
  </g>
  <text x="352" y="42" font-size="10.5" fill="#d98324" font-weight="700">หัว</text>
  <text x="376" y="58" font-size="9.5" fill="#d98324" text-anchor="end">ไฮโดรฟิลิก</text>
  <text x="352" y="92" font-size="10.5" fill="#2e9e6b" font-weight="700">หาง</text>
  <text x="376" y="108" font-size="9.5" fill="#2e9e6b" text-anchor="end">ไฮโดรโฟบิก</text>
  <text x="190" y="160" text-anchor="middle" font-size="11.5" fill="currentColor">หางไฮโดรโฟบิกหันเข้าหากันตรงกลาง หัวไฮโดรฟิลิกหันออกหาน้ำทั้งสองด้าน</text>
</svg>`;

  const SVG_FIT = `
<svg viewBox="0 0 380 190" width="380" height="190" role="img" aria-label="lock and key model เทียบกับ induced fit model">
  <text x="95" y="20" text-anchor="middle" font-size="12" fill="currentColor" font-weight="700">ก. lock and key</text>
  <path d="M30 42 h130 v60 h-40 l-12 -18 h-26 l-12 18 h-40 z" fill="#3b7ddd" opacity="0.85"/>
  <path d="M96 30 l12 18 h-26 z" fill="#e05252"/>
  <text x="95" y="122" text-anchor="middle" font-size="10.5" fill="currentColor">บริเวณเร่งรูปร่างคงเดิม</text>
  <text x="95" y="140" text-anchor="middle" font-size="10.5" fill="currentColor">สารตั้งต้นต้องพอดีอยู่แล้ว</text>
  <text x="285" y="20" text-anchor="middle" font-size="12" fill="currentColor" font-weight="700">ข. induced fit</text>
  <path d="M220 42 h130 v60 h-34 c-8 -22 -22 -26 -30 -26 c-10 0 -22 6 -28 26 h-38 z" fill="#2e9e6b" opacity="0.85"/>
  <circle cx="286" cy="52" r="13" fill="#e05252"/>
  <text x="285" y="122" text-anchor="middle" font-size="10.5" fill="currentColor">บริเวณเร่งเปลี่ยนรูปโอบรับ</text>
  <text x="285" y="140" text-anchor="middle" font-size="10.5" fill="currentColor">หลังสารตั้งต้นเข้ามาจับ</text>
  <text x="190" y="170" text-anchor="middle" font-size="10" fill="currentColor">แนวคิดที่ยอมรับในปัจจุบันคือ induced fit</text>
  <text x="190" y="186" text-anchor="middle" font-size="10" fill="currentColor">ไลโซไซม์กับเพปทิโดไกลแคนเป็นตัวอย่าง</text>
</svg>`;

  const SVG_FEEDBACK = `
<svg viewBox="0 0 380 170" width="380" height="170" role="img" aria-label="การยับยั้งแบบย้อนกลับในวิถีเมแทบอลิซึม">
  <g font-size="10.5" fill="currentColor" text-anchor="middle">
    <rect x="12" y="58" width="52" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <text x="38" y="77">สาร A</text>
    <rect x="102" y="58" width="52" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <text x="128" y="77">สาร B</text>
    <rect x="192" y="58" width="52" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <text x="218" y="77">สาร C</text>
    <rect x="282" y="58" width="80" height="30" rx="6" fill="#7c5cd6" stroke="none"/>
    <text x="322" y="77" fill="#fff" font-weight="700">ผลิตภัณฑ์สุดท้าย</text>
  </g>
  <g stroke="currentColor" stroke-width="1.8" fill="none">
    <path d="M64 73 h32"/><path d="M154 73 h32"/><path d="M244 73 h32"/>
  </g>
  <g font-size="10" fill="#2e9e6b" text-anchor="middle" font-weight="700">
    <text x="80" y="64">E&#8321;</text><text x="170" y="64">E&#8322;</text><text x="260" y="64">E&#8323;</text>
  </g>
  <path d="M322 92 v26 H80 v-24" fill="none" stroke="#e05252" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="80" cy="92" r="4" fill="#e05252"/>
  <text x="200" y="134" text-anchor="middle" font-size="11" fill="#e05252" font-weight="700">ผลิตภัณฑ์สุดท้ายย้อนกลับไปยับยั้งเอนไซม์ตัวแรก (E&#8321;)</text>
  <text x="190" y="156" text-anchor="middle" font-size="11" fill="currentColor">เมื่อผลิตภัณฑ์มากเกินจำเป็น วิถีทั้งเส้นจึงหยุดเอง</text>
</svg>`;

  const SVG_DNA = `
<svg viewBox="0 0 360 200" width="360" height="200" role="img" aria-label="การจับคู่เบสใน DNA">
  <text x="60" y="20" font-size="11" fill="currentColor" font-weight="700">5&#8242;</text>
  <text x="290" y="20" font-size="11" fill="currentColor" font-weight="700">3&#8242;</text>
  <text x="60" y="192" font-size="11" fill="currentColor" font-weight="700">3&#8242;</text>
  <text x="286" y="192" font-size="11" fill="currentColor" font-weight="700">5&#8242;</text>
  <line x1="66" y1="30" x2="66" y2="178" stroke="#7c5cd6" stroke-width="5"/>
  <line x1="294" y1="30" x2="294" y2="178" stroke="#7c5cd6" stroke-width="5"/>
  <g font-size="11.5" font-weight="700" text-anchor="middle">
    <rect x="76" y="40" width="88" height="22" rx="5" fill="#2e9e6b"/><text x="120" y="56" fill="#fff">A</text>
    <rect x="196" y="40" width="88" height="22" rx="5" fill="#e05252"/><text x="240" y="56" fill="#fff">T</text>
    <rect x="76" y="76" width="88" height="22" rx="5" fill="#3b7ddd"/><text x="120" y="92" fill="#fff">G</text>
    <rect x="196" y="76" width="88" height="22" rx="5" fill="#d98324"/><text x="240" y="92" fill="#fff">C</text>
    <rect x="76" y="112" width="88" height="22" rx="5" fill="#d98324"/><text x="120" y="128" fill="#fff">C</text>
    <rect x="196" y="112" width="88" height="22" rx="5" fill="#3b7ddd"/><text x="240" y="128" fill="#fff">G</text>
    <rect x="76" y="148" width="88" height="22" rx="5" fill="#e05252"/><text x="120" y="164" fill="#fff">T</text>
    <rect x="196" y="148" width="88" height="22" rx="5" fill="#2e9e6b"/><text x="240" y="164" fill="#fff">A</text>
  </g>
  <g stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3">
    <line x1="164" y1="51" x2="196" y2="51"/><line x1="164" y1="87" x2="196" y2="87"/>
    <line x1="164" y1="123" x2="196" y2="123"/><line x1="164" y1="159" x2="196" y2="159"/>
  </g>
  <text x="180" y="34" text-anchor="middle" font-size="10" fill="currentColor">พันธะไฮโดรเจน</text>
  <text x="26" y="104" font-size="10" fill="#7c5cd6" transform="rotate(-90 26 104)">น้ำตาล+ฟอสเฟต</text>
</svg>`;

  /* ==========================================================
     โน้ตปกติ
     ========================================================== */
  /* ---- โครงสร้างเคมีของสารชีวโมเลกุล (บทที่ 1–3) ---- */
  const SVG_FUNCGROUP = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="หมู่ฟังก์ชันที่พบบ่อยในสารชีวโมเลกุล">
  <g font-size="12" fill="currentColor" font-weight="700">
    <text x="12" y="20">ไฮดรอกซิล</text><text x="150" y="20">คาร์บอนิล</text><text x="278" y="20">คาร์บอกซิล</text>
    <text x="12" y="140">แอมิโน</text><text x="150" y="140">ฟอสเฟต</text><text x="278" y="140">ซัลฟ์ไฮดริล</text>
  </g>
  <g font-size="13" font-family="serif" text-anchor="middle">
    <g stroke="#3b7ddd" stroke-width="2" fill="none">
      <line x1="24" y1="56" x2="48" y2="56"/><line x1="48" y1="56" x2="70" y2="56"/>
    </g>
    <text x="18" y="60" fill="#888">C</text><text x="48" y="60" fill="#e05252">O</text><text x="76" y="60" fill="#3b7ddd">H</text>
    <text x="48" y="86" font-size="11" fill="currentColor" font-family="sans-serif">— OH</text>
    <text x="48" y="104" font-size="10" fill="currentColor" font-family="sans-serif">น้ำตาล · แอลกอฮอล์</text>

    <g stroke="#3b7ddd" stroke-width="2" fill="none">
      <line x1="178" y1="52" x2="178" y2="34"/><line x1="183" y1="52" x2="183" y2="34"/>
      <line x1="160" y1="60" x2="172" y2="60"/><line x1="188" y1="60" x2="200" y2="60"/>
    </g>
    <text x="180" y="30" fill="#e05252">O</text><text x="180" y="64" fill="#888">C</text>
    <text x="180" y="86" font-size="11" fill="currentColor" font-family="sans-serif">— C = O</text>
    <text x="180" y="104" font-size="10" fill="currentColor" font-family="sans-serif">น้ำตาล (แอลดีไฮด์ · คีโตน)</text>

    <g stroke="#3b7ddd" stroke-width="2" fill="none">
      <line x1="313" y1="52" x2="313" y2="34"/><line x1="318" y1="52" x2="318" y2="34"/>
      <line x1="295" y1="60" x2="307" y2="60"/><line x1="324" y1="60" x2="338" y2="60"/><line x1="344" y1="60" x2="356" y2="60"/>
    </g>
    <text x="315" y="30" fill="#e05252">O</text><text x="315" y="64" fill="#888">C</text>
    <text x="341" y="64" fill="#e05252">O</text><text x="362" y="64" fill="#3b7ddd">H</text>
    <text x="322" y="86" font-size="11" fill="currentColor" font-family="sans-serif">— COOH</text>
    <text x="322" y="104" font-size="10" fill="currentColor" font-family="sans-serif">กรดแอมิโน · กรดไขมัน</text>

    <g stroke="#3b7ddd" stroke-width="2" fill="none">
      <line x1="26" y1="176" x2="42" y2="176"/><line x1="52" y1="170" x2="66" y2="164"/><line x1="52" y1="182" x2="66" y2="188"/>
    </g>
    <text x="20" y="180" fill="#888">C</text><text x="47" y="180" fill="#7c5cd6">N</text>
    <text x="72" y="168" fill="#3b7ddd">H</text><text x="72" y="192" fill="#3b7ddd">H</text>
    <text x="52" y="210" font-size="11" fill="currentColor" font-family="sans-serif">— NH₂</text>
    <text x="52" y="228" font-size="10" fill="currentColor" font-family="sans-serif">กรดแอมิโน (รับ H⁺ ได้)</text>

    <g stroke="#3b7ddd" stroke-width="2" fill="none">
      <line x1="180" y1="168" x2="180" y2="152"/><line x1="185" y1="168" x2="185" y2="152"/>
      <line x1="162" y1="176" x2="172" y2="176"/><line x1="192" y1="176" x2="206" y2="176"/><line x1="182" y1="184" x2="182" y2="196"/>
    </g>
    <text x="182" y="148" fill="#e05252">O</text><text x="182" y="180" fill="#d98324">P</text>
    <text x="212" y="180" fill="#e05252">O⁻</text><text x="182" y="208" fill="#e05252">O⁻</text>
    <text x="180" y="228" font-size="10" fill="currentColor" font-family="sans-serif">DNA · ATP · ฟอสโฟลิพิด</text>

    <g stroke="#3b7ddd" stroke-width="2" fill="none">
      <line x1="300" y1="176" x2="318" y2="176"/><line x1="328" y1="176" x2="344" y2="176"/>
    </g>
    <text x="294" y="180" fill="#888">C</text><text x="323" y="180" fill="#b8651a">S</text><text x="350" y="180" fill="#3b7ddd">H</text>
    <text x="322" y="204" font-size="11" fill="currentColor" font-family="sans-serif">— SH</text>
    <text x="322" y="228" font-size="10" fill="currentColor" font-family="sans-serif">ยึดโครงสร้างโปรตีนขั้นที่ 3</text>
  </g>
</svg>`;

  const SVG_MONOSAC = `<svg viewBox="0 0 400 210" width="400" height="210" role="img" aria-label="โครงสร้างวงของกลูโคส กาแลกโทส และฟรุกโทส">
  <polygon points="57.0,47.484 83.0,47.484 96,70 83.0,92.51599999999999 57.0,92.51599999999999 44,70" fill="none" stroke="#2e9e6b" stroke-width="2.2"/>
  <text x="70" y="35" font-size="11" fill="#e05252" text-anchor="middle" font-family="serif">O</text>
  <g font-size="10" fill="currentColor" text-anchor="middle">
    <text x="104" y="74">C1</text><text x="88" y="112">C2</text><text x="52" y="112">C3</text>
    <text x="36" y="74">C4</text><text x="52" y="36">C5</text>
  </g>
  <text x="70" y="146" font-size="12" font-weight="700" fill="#2e9e6b" text-anchor="middle">กลูโคส</text>
  <text x="70" y="163" font-size="10" fill="currentColor" text-anchor="middle">วง 6 เหลี่ยม</text>

  <polygon points="187.0,47.484 213.0,47.484 226,70 213.0,92.51599999999999 187.0,92.51599999999999 174,70" fill="none" stroke="#2e9e6b" stroke-width="2.2"/>
  <text x="200" y="35" font-size="11" fill="#e05252" text-anchor="middle" font-family="serif">O</text>
  <text x="200" y="146" font-size="12" font-weight="700" fill="#2e9e6b" text-anchor="middle">กาแลกโทส</text>
  <text x="200" y="163" font-size="9.5" fill="currentColor" text-anchor="middle">ต่างที่ตำแหน่ง OH ของ C4</text>

  <polygon points="300,92 330,46 360,60 348,100 312,100" fill="none" stroke="#d98324" stroke-width="2.2"/>
  <text x="332" y="42" font-size="11" fill="#e05252" text-anchor="middle" font-family="serif">O</text>
  <text x="330" y="146" font-size="12" font-weight="700" fill="#d98324" text-anchor="middle">ฟรุกโทส</text>
  <text x="330" y="163" font-size="10" fill="currentColor" text-anchor="middle">วง 5 เหลี่ยม</text>

  <line x1="8" y1="176" x2="392" y2="176" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="200" y="196" font-size="10" fill="currentColor" text-anchor="middle">ทั้งสามตัวมีสูตรโมเลกุลเดียวกันคือ C₆H₁₂O₆ ต่างกันที่การจัดเรียงอะตอม (ไอโซเมอร์)</text>
</svg>`;

  const SVG_GLYCOSIDIC = `<svg viewBox="0 0 400 310" width="400" height="310" role="img" aria-label="พันธะไกลโคซิดิกของมอลโทส ซูโครส และแล็กโทส">
  <text x="200" y="16" font-size="11.5" font-weight="700" fill="currentColor" text-anchor="middle">น้ำตาลโมเลกุลเดี่ยว 2 ตัว เชื่อมกันด้วยออกซิเจน 1 อะตอม</text>
  <polygon points="44.0,41.216 68.0,41.216 80,62 68.0,82.78399999999999 44.0,82.78399999999999 32,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><line x1="82" y1="62" x2="106" y2="62" stroke="#e05252" stroke-width="2.6"/><circle cx="94" cy="62" r="8.5" fill="#fff" stroke="#e05252" stroke-width="2"/><text x="94" y="66" font-size="10" fill="#e05252" text-anchor="middle" font-family="serif" font-weight="700">O</text><text x="94" y="38" font-size="11.5" fill="#e05252" text-anchor="middle" font-weight="700">α-1,4</text><polygon points="120.0,41.216 144.0,41.216 156,62 144.0,82.78399999999999 120.0,82.78399999999999 108,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/>
  <text x="94" y="104" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">มอลโทส</text>
  <text x="94" y="120" font-size="10" fill="currentColor" text-anchor="middle">กลูโคส + กลูโคส</text>
  <path d="M42 68 l-10 10" stroke="#2e9e6b" stroke-width="2"/><text x="26" y="92" font-size="9" fill="#2e9e6b" text-anchor="middle">OH</text>

  <polygon points="232.0,41.216 256.0,41.216 268,62 256.0,82.78399999999999 232.0,82.78399999999999 220,62" fill="none" stroke="#d98324" stroke-width="2.2"/><line x1="270" y1="62" x2="294" y2="62" stroke="#e05252" stroke-width="2.6"/><circle cx="282" cy="62" r="8.5" fill="#fff" stroke="#e05252" stroke-width="2"/><text x="282" y="66" font-size="10" fill="#e05252" text-anchor="middle" font-family="serif" font-weight="700">O</text><text x="282" y="38" font-size="11.5" fill="#e05252" text-anchor="middle" font-weight="700">α-1,2</text><polygon points="316.0,40.0 336.9,55.2 328.9,79.8 303.1,79.8 295.1,55.2" fill="none" stroke="#d98324" stroke-width="2.2"/>
  <text x="290" y="104" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">ซูโครส</text>
  <text x="290" y="120" font-size="10" fill="currentColor" text-anchor="middle">กลูโคส + ฟรุกโทส (วง 5 เหลี่ยม)</text>

  <polygon points="100.0,159.216 124.0,159.216 136,180 124.0,200.784 100.0,200.784 88,180" fill="none" stroke="#7c5cd6" stroke-width="2.2"/><line x1="138" y1="180" x2="162" y2="180" stroke="#7c5cd6" stroke-width="2.6"/><circle cx="150" cy="180" r="8.5" fill="#fff" stroke="#7c5cd6" stroke-width="2"/><text x="150" y="184" font-size="10" fill="#7c5cd6" text-anchor="middle" font-family="serif" font-weight="700">O</text><text x="150" y="156" font-size="11.5" fill="#7c5cd6" text-anchor="middle" font-weight="700">β-1,4</text><polygon points="176.0,159.216 200.0,159.216 212,180 200.0,200.784 176.0,200.784 164,180" fill="none" stroke="#7c5cd6" stroke-width="2.2"/>
  <text x="150" y="222" font-size="12" fill="currentColor" text-anchor="middle" font-weight="700">แล็กโทส</text>
  <text x="150" y="238" font-size="10" fill="currentColor" text-anchor="middle">กาแลกโทส + กลูโคส</text>
  <g stroke="#7c5cd6" stroke-width="2"><path d="M212 168 l10 -10"/></g>
  <text x="236" y="154" font-size="9" fill="#7c5cd6" text-anchor="middle">OH</text>
  <text x="270" y="176" font-size="10" fill="#7c5cd6" font-weight="700">β = OH ชี้ขึ้น</text>
  <text x="270" y="192" font-size="10" fill="#2e9e6b" font-weight="700">α = OH ชี้ลง</text>

  <line x1="8" y1="256" x2="392" y2="256" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <g font-size="10" fill="currentColor">
    <text x="12" y="274">ตัวเลขคือ<tspan font-weight="700">คาร์บอนตำแหน่งที่ใช้เชื่อม</tspan></text>
    <text x="12" y="290">α-1,4 = C1 ของตัวซ้าย ต่อกับ C4 ของตัวขวา</text>
    <text x="12" y="306">α กับ β ต่างกันที่ทิศของ OH — เอนไซม์คนละตัวจึงย่อยได้คนละแบบ</text>
  </g>
</svg>`;

  const SVG_POLYSAC = `<svg viewBox="0 0 400 320" width="400" height="320" role="img" aria-label="เปรียบเทียบโครงสร้างแป้งกับเซลลูโลส">
  <text x="12" y="22" font-size="11.5" font-weight="700" fill="#2e9e6b">แป้ง (สตาร์ช) · ไกลโคเจน — พันธะ α</text>
  <text x="318" y="22" font-size="10.5" fill="#e05252" font-weight="700">α-1,4 สายหลัก</text>
  <polygon points="29.0,46.412 47.0,46.412 56,62 47.0,77.588 29.0,77.588 20,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><polygon points="71.0,46.412 89.0,46.412 98,62 89.0,77.588 71.0,77.588 62,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><polygon points="113.0,46.412 131.0,46.412 140,62 131.0,77.588 113.0,77.588 104,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><polygon points="155.0,46.412 173.0,46.412 182,62 173.0,77.588 155.0,77.588 146,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><polygon points="197.0,46.412 215.0,46.412 224,62 215.0,77.588 197.0,77.588 188,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><polygon points="239.0,46.412 257.0,46.412 266,62 257.0,77.588 239.0,77.588 230,62" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><line x1="56" y1="62" x2="62" y2="62" stroke="#e05252" stroke-width="2.4"/><line x1="98" y1="62" x2="104" y2="62" stroke="#e05252" stroke-width="2.4"/><line x1="140" y1="62" x2="146" y2="62" stroke="#e05252" stroke-width="2.4"/><line x1="182" y1="62" x2="188" y2="62" stroke="#e05252" stroke-width="2.4"/><line x1="224" y1="62" x2="230" y2="62" stroke="#e05252" stroke-width="2.4"/><polygon points="113.0,100.412 131.0,100.412 140,116 131.0,131.588 113.0,131.588 104,116" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><polygon points="155.0,100.412 173.0,100.412 182,116 173.0,131.588 155.0,131.588 146,116" fill="none" stroke="#2e9e6b" stroke-width="2.2"/><line x1="122" y1="80" x2="122" y2="98" stroke="#d98324" stroke-width="2.6"/><line x1="140" y1="116" x2="146" y2="116" stroke="#e05252" stroke-width="2.4"/>
  <text x="194" y="120" font-size="10.5" fill="#d98324" font-weight="700">α-1,6 = กิ่ง</text>
  <text x="12" y="156" font-size="10" fill="currentColor">วงทุกวงหันทางเดียวกัน → สายม้วนเป็นเกลียว</text>
  <text x="12" y="172" font-size="10" fill="currentColor">คนย่อยได้ เพราะมีเอนไซม์อะไมเลส</text>
  <line x1="8" y1="184" x2="392" y2="184" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="12" y="204" font-size="11.5" font-weight="700" fill="#7c5cd6">เซลลูโลส — พันธะ β-1,4</text>
  <text x="318" y="204" font-size="10.5" fill="#e05252" font-weight="700">β-1,4</text>
  <polygon points="29.0,224.412 47.0,224.412 56,240 47.0,255.588 29.0,255.588 20,240" fill="none" stroke="#7c5cd6" stroke-width="2.2"/><polygon points="71.0,234.412 89.0,234.412 98,250 89.0,265.588 71.0,265.588 62,250" fill="none" stroke="#7c5cd6" stroke-width="2.2"/><polygon points="113.0,224.412 131.0,224.412 140,240 131.0,255.588 113.0,255.588 104,240" fill="none" stroke="#7c5cd6" stroke-width="2.2"/><polygon points="155.0,234.412 173.0,234.412 182,250 173.0,265.588 155.0,265.588 146,250" fill="none" stroke="#7c5cd6" stroke-width="2.2"/><polygon points="197.0,224.412 215.0,224.412 224,240 215.0,255.588 197.0,255.588 188,240" fill="none" stroke="#7c5cd6" stroke-width="2.2"/><polygon points="239.0,234.412 257.0,234.412 266,250 257.0,265.588 239.0,265.588 230,250" fill="none" stroke="#7c5cd6" stroke-width="2.2"/><line x1="56" y1="245" x2="62" y2="245" stroke="#e05252" stroke-width="2.4"/><line x1="98" y1="245" x2="104" y2="245" stroke="#e05252" stroke-width="2.4"/><line x1="140" y1="245" x2="146" y2="245" stroke="#e05252" stroke-width="2.4"/><line x1="182" y1="245" x2="188" y2="245" stroke="#e05252" stroke-width="2.4"/><line x1="224" y1="245" x2="230" y2="245" stroke="#e05252" stroke-width="2.4"/><circle cx="38" cy="224" r="3" fill="#7c5cd6"/><circle cx="80" cy="266" r="3" fill="#7c5cd6"/><circle cx="122" cy="224" r="3" fill="#7c5cd6"/><circle cx="164" cy="266" r="3" fill="#7c5cd6"/><circle cx="206" cy="224" r="3" fill="#7c5cd6"/><circle cx="248" cy="266" r="3" fill="#7c5cd6"/>
  <text x="12" y="292" font-size="10" fill="currentColor">จุดคือ OH ที่ C1 — <tspan font-weight="700">สลับขึ้นลงทุกวง</tspan> สายจึงเหยียดตรง เรียงชิดเป็นเส้นใยแข็ง</text>
  <text x="12" y="312" font-size="10" fill="currentColor"><tspan font-weight="700" fill="#e05252">คนย่อยไม่ได้</tspan> เพราะไม่มีเอนไซม์ที่ตัดพันธะ β จึงกลายเป็นกากใย</text>
</svg>`;

  const SVG_AMINO = `<svg viewBox="0 0 400 260" width="400" height="260" role="img" aria-label="โครงสร้างกรดแอมิโนและการเกิดพันธะเพปไทด์">
  <text x="12" y="20" font-size="12" font-weight="700" fill="currentColor">โครงสร้างกลางของกรดแอมิโนทุกตัว</text>
  <g font-family="serif" font-size="14" text-anchor="middle">
    <rect x="30" y="52" width="46" height="34" rx="6" fill="#7c5cd6" opacity="0.18" stroke="#7c5cd6" stroke-width="1.8"/>
    <text x="53" y="74" font-size="13" fill="#7c5cd6" font-weight="700">NH₂</text>
    <line x1="76" y1="69" x2="104" y2="69" stroke="#3b7ddd" stroke-width="2"/>
    <text x="118" y="74" fill="currentColor" font-weight="700">C</text>
    <line x1="118" y1="56" x2="118" y2="40" stroke="#3b7ddd" stroke-width="2"/>
    <text x="118" y="34" font-size="12" fill="#3b7ddd">H</text>
    <line x1="118" y1="80" x2="118" y2="98" stroke="#3b7ddd" stroke-width="2"/>
    <rect x="98" y="100" width="42" height="30" rx="6" fill="#d98324" opacity="0.2" stroke="#d98324" stroke-width="1.8"/>
    <text x="119" y="121" font-size="13" fill="#d98324" font-weight="700">R</text>
    <line x1="132" y1="69" x2="160" y2="69" stroke="#3b7ddd" stroke-width="2"/>
    <rect x="160" y="52" width="60" height="34" rx="6" fill="#2e9e6b" opacity="0.18" stroke="#2e9e6b" stroke-width="1.8"/>
    <text x="190" y="74" font-size="13" fill="#2e9e6b" font-weight="700">COOH</text>
  </g>
  <g font-size="10.5" fill="currentColor">
    <text x="240" y="60">หมู่แอมิโน · หมู่คาร์บอกซิล · H</text>
    <text x="240" y="76">สามส่วนนี้<tspan font-weight="700">เหมือนกันทุกตัว</tspan></text>
    <text x="240" y="100" fill="#d98324" font-weight="700">R = หมู่ที่ต่างกัน</text>
    <text x="240" y="116">ตัวตัดสินสมบัติของกรดแอมิโน</text>
    <text x="240" y="132">มี 20 ชนิดในสิ่งมีชีวิต</text>
  </g>
  <line x1="8" y1="152" x2="392" y2="152" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="12" y="174" font-size="12" font-weight="700" fill="currentColor">การเกิดพันธะเพปไทด์ — ดึงน้ำออก 1 โมเลกุล</text>
  <g font-size="11" font-family="serif">
    <text x="16" y="206" fill="#7c5cd6" font-weight="700">H₂N</text>
    <text x="46" y="206" fill="currentColor">— CH(R) —</text>
    <text x="112" y="206" fill="#2e9e6b" font-weight="700">C</text>
    <text x="112" y="190" fill="#e05252" font-size="10">O</text>
    <line x1="118" y1="194" x2="118" y2="200" stroke="#e05252" stroke-width="1.6"/>
    <line x1="122" y1="194" x2="122" y2="200" stroke="#e05252" stroke-width="1.6"/>
    <rect x="126" y="192" width="26" height="20" rx="4" fill="#e05252" opacity="0.14"/>
    <text x="130" y="206" fill="#e05252" font-weight="700">OH</text>
    <text x="160" y="206" fill="currentColor">+</text>
    <rect x="174" y="192" width="22" height="20" rx="4" fill="#e05252" opacity="0.14"/>
    <text x="176" y="206" fill="#e05252" font-weight="700">H</text>
    <text x="190" y="206" fill="#7c5cd6" font-weight="700">N(H)</text>
    <text x="224" y="206" fill="currentColor">— CH(R) — COOH</text>
  </g>
  <path d="M148 216 q26 16 48 0" fill="none" stroke="#e05252" stroke-width="1.8" stroke-dasharray="4 3"/>
  <text x="172" y="238" font-size="10.5" fill="#e05252" text-anchor="middle" font-weight="700">คาย H₂O</text>
  <text x="230" y="238" font-size="10" fill="currentColor">เหลือ —CO—NH— คือ<tspan font-weight="700">พันธะเพปไทด์</tspan></text>
</svg>`;

  const SVG_FATTYACID = `<svg viewBox="0 0 400 230" width="400" height="230" role="img" aria-label="เปรียบเทียบกรดไขมันอิ่มตัวกับไม่อิ่มตัว">
  <text x="12" y="20" font-size="12" font-weight="700" fill="#d98324">กรดไขมันอิ่มตัว — พันธะเดี่ยวทั้งสาย</text>
  <text x="14" y="62" font-size="12" font-family="serif" fill="#e05252" font-weight="700">HO—C</text>
  <text x="26" y="44" font-size="10" font-family="serif" fill="#e05252">O</text>
  <line x1="33" y1="47" x2="33" y2="53" stroke="#e05252" stroke-width="1.5"/>
  <line x1="37" y1="47" x2="37" y2="53" stroke="#e05252" stroke-width="1.5"/>
  <polyline points="60,58 80,47 100,58 120,47 140,58 160,47 180,58 200,47 220,58 240,47 260,58 280,47 300,58 320,47" fill="none" stroke="#d98324" stroke-width="2.6" stroke-linejoin="round"/>
  <text x="352" y="62" font-size="11" fill="#d98324" font-weight="700">CH₃</text>
  <text x="12" y="92" font-size="10" fill="currentColor">สายตรง เรียงชิดกันแน่น → แรงระหว่างโมเลกุลมาก → <tspan font-weight="700">แข็งตัวง่าย</tspan> (ไขมันสัตว์)</text>
  <line x1="8" y1="106" x2="392" y2="106" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="12" y="128" font-size="12" font-weight="700" fill="#2e9e6b">กรดไขมันไม่อิ่มตัว — มีพันธะคู่</text>
  <text x="14" y="170" font-size="12" font-family="serif" fill="#e05252" font-weight="700">HO—C</text>
  <text x="26" y="152" font-size="10" font-family="serif" fill="#e05252">O</text>
  <line x1="33" y1="155" x2="33" y2="161" stroke="#e05252" stroke-width="1.5"/>
  <line x1="37" y1="155" x2="37" y2="161" stroke="#e05252" stroke-width="1.5"/>
  <polyline points="60,166 80,155 100,166 120,155 140,166 160,155 180,166" fill="none" stroke="#2e9e6b" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="180" y1="155" x2="204" y2="155" stroke="#2e9e6b" stroke-width="2.6"/>
  <line x1="182" y1="161" x2="202" y2="161" stroke="#2e9e6b" stroke-width="2.6"/>
  <polyline points="204,155 224,178 244,166 264,178 284,166 304,178" fill="none" stroke="#2e9e6b" stroke-width="2.6" stroke-linejoin="round"/>
  <text x="192" y="142" font-size="10.5" fill="#e05252" text-anchor="middle" font-weight="700">พันธะคู่</text>
  <path d="M198 186 q10 12 24 6" fill="none" stroke="#e05252" stroke-width="1.6"/>
  <text x="238" y="200" font-size="10.5" fill="#e05252" font-weight="700">สายหักงอตรงนี้</text>
  <text x="12" y="222" font-size="10" fill="currentColor">สายหักงอ เรียงชิดไม่ได้ → แรงน้อย → <tspan font-weight="700">แข็งตัวยาก เป็นน้ำมัน</tspan> (ถั่วเหลือง)</text>
</svg>`;

  const SVG_TRIGLY = `<svg viewBox="0 0 400 200" width="400" height="200" role="img" aria-label="โครงสร้างไตรกลีเซอไรด์">
  <rect x="16" y="40" width="46" height="112" rx="8" fill="#7c5cd6" opacity="0.16" stroke="#7c5cd6" stroke-width="2"/>
  <text x="39" y="92" font-size="11" fill="#7c5cd6" text-anchor="middle" font-weight="700">กลี</text>
  <text x="39" y="108" font-size="11" fill="#7c5cd6" text-anchor="middle" font-weight="700">เซอรอล</text>
  <g stroke="#e05252" stroke-width="2.4">
    <line x1="62" y1="62" x2="92" y2="62"/><line x1="62" y1="96" x2="92" y2="96"/><line x1="62" y1="130" x2="92" y2="130"/>
  </g>
  <g fill="#e05252" font-size="9" text-anchor="middle">
    <circle cx="77" cy="62" r="8" fill="#fff" stroke="#e05252" stroke-width="1.8"/><text x="77" y="66" font-family="serif" font-weight="700">O</text>
    <circle cx="77" cy="96" r="8" fill="#fff" stroke="#e05252" stroke-width="1.8"/><text x="77" y="100" font-family="serif" font-weight="700">O</text>
    <circle cx="77" cy="130" r="8" fill="#fff" stroke="#e05252" stroke-width="1.8"/><text x="77" y="134" font-family="serif" font-weight="700">O</text>
  </g>
  <polyline points="96,62 114,53 132,62 150,53 168,62 186,53 204,62 222,53 240,62 258,53 276,62 294,53 312,62" fill="none" stroke="#d98324" stroke-width="2.4" stroke-linejoin="round"/>
  <polyline points="96,96 114,87 132,96 150,87 168,96 186,87 204,96 222,87 240,96 258,87 276,96 294,87 312,96" fill="none" stroke="#d98324" stroke-width="2.4" stroke-linejoin="round"/>
  <polyline points="96,130 114,121 132,130 150,121 168,130 186,121 204,130 222,121 240,130 258,121 276,130 294,121 312,130" fill="none" stroke="#d98324" stroke-width="2.4" stroke-linejoin="round"/>
  <text x="200" y="26" font-size="12" fill="#d98324" text-anchor="middle" font-weight="700">กรดไขมัน 3 สาย</text>
  <text x="140" y="172" font-size="11" fill="#e05252" font-weight="700">พันธะเอสเทอร์ 3 พันธะ</text>
  <text x="140" y="190" font-size="10.5" fill="currentColor">เกิดจากการดึงน้ำออก 3 โมเลกุล</text>
</svg>`;

  const SVG_PHOSPHOLIPID = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="โครงสร้างฟอสโฟลิพิดและการเรียงตัวในน้ำ">
  <circle cx="70" cy="46" r="20" fill="#3b7ddd" opacity="0.28" stroke="#3b7ddd" stroke-width="2.2"/>
  <text x="70" y="51" font-size="12" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
  <text x="104" y="38" font-size="11" fill="#3b7ddd" font-weight="700">หมู่ฟอสเฟต + หมู่ R</text>
  <text x="104" y="54" font-size="10.5" fill="currentColor">มีประจุ · <tspan font-weight="700" fill="#3b7ddd">ชอบน้ำ</tspan> (hydrophilic)</text>
  <line x1="70" y1="66" x2="70" y2="82" stroke="#7c5cd6" stroke-width="2.4"/>
  <rect x="48" y="82" width="44" height="26" rx="6" fill="#7c5cd6" opacity="0.16" stroke="#7c5cd6" stroke-width="2"/>
  <text x="70" y="100" font-size="10" fill="#7c5cd6" text-anchor="middle" font-weight="700">กลีเซอรอล</text>
  <g stroke="#e05252" stroke-width="2.2">
    <line x1="58" y1="108" x2="58" y2="122"/><line x1="82" y1="108" x2="82" y2="122"/>
  </g>
  <polyline points="58,122 58,122 58,122 58,122 58,122 58,122 58,122 58,122 58,122" fill="none" stroke="#d98324" stroke-width="2.6"/>
  <path d="M58 122 l-8 12 l8 12 l-8 12 l8 12 l-8 12 l8 12" fill="none" stroke="#d98324" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M82 122 l8 12 l-8 12 l8 12 l-8 12 l8 12 l-8 12" fill="none" stroke="#d98324" stroke-width="2.6" stroke-linejoin="round"/>
  <text x="104" y="152" font-size="11" fill="#d98324" font-weight="700">หางไฮโดรคาร์บอน 2 สาย</text>
  <text x="104" y="168" font-size="10.5" fill="currentColor">ไม่มีขั้ว · <tspan font-weight="700" fill="#d98324">ไม่ชอบน้ำ</tspan> (hydrophobic)</text>
  <text x="104" y="184" font-size="10.5" fill="currentColor">(ไตรกลีเซอไรด์มี 3 สาย ฟอสโฟลิพิดมี 2)</text>
  <line x1="8" y1="198" x2="392" y2="198" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="12" y="220" font-size="10" fill="currentColor">โมเลกุลเดียวมีทั้งส่วนชอบน้ำและไม่ชอบน้ำ พอลงน้ำจึงหันหัวออก หางเข้าหากัน</text>
  <text x="12" y="238" font-size="10" fill="currentColor">กลายเป็น<tspan font-weight="700">เยื่อสองชั้น</tspan>ได้เอง — เป็นที่มาของเยื่อหุ้มเซลล์ในบทที่ 4</text>
</svg>`;

  const SVG_STEROID = `<svg viewBox="0 0 400 220" width="400" height="220" role="img" aria-label="โครงสร้างพื้นฐานของสเตอรอยด์ 4 วง">
  <text x="200" y="20" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">สเตอรอยด์ = วง 6 เหลี่ยม 3 วง + วง 5 เหลี่ยม 1 วง เชื่อมติดกัน</text>
  <polygon points="67.0,87.48400000000001 93.0,87.48400000000001 106,110 93.0,132.516 67.0,132.516 54,110" fill="none" stroke="#7c5cd6" stroke-width="2.4"/><polygon points="106.0,65.48400000000001 132.0,65.48400000000001 145,88 132.0,110.51599999999999 106.0,110.51599999999999 93,88" fill="none" stroke="#7c5cd6" stroke-width="2.4"/><polygon points="145.0,87.48400000000001 171.0,87.48400000000001 184,110 171.0,132.516 145.0,132.516 132,110" fill="none" stroke="#7c5cd6" stroke-width="2.4"/>
  <polygon points="184,95 214,84 232,106 214,128 184,125" fill="none" stroke="#7c5cd6" stroke-width="2.4"/>
  <g font-size="13" font-weight="700" fill="#7c5cd6" text-anchor="middle">
    <text x="80" y="115">A</text><text x="119" y="93">B</text><text x="158" y="115">C</text><text x="208" y="112">D</text>
  </g>
  <line x1="54" y1="110" x2="36" y2="110" stroke="#e05252" stroke-width="2.4"/>
  <text x="26" y="114" font-size="12" fill="#e05252" text-anchor="end" font-family="serif" font-weight="700">HO</text>
  <text x="14" y="146" font-size="10" fill="#e05252">HO = หมู่ไฮดรอกซิล</text>
  <polyline points="232,106 252,96 268,106 286,96 302,106" fill="none" stroke="#d98324" stroke-width="2.4" stroke-linejoin="round"/>
  <text x="268" y="86" font-size="10" fill="#d98324" font-weight="700">หางไฮโดรคาร์บอน</text>
  <line x1="8" y1="156" x2="392" y2="156" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <g font-size="10.5" fill="currentColor">
    <text x="12" y="176">โครง 4 วงนี้เหมือนกันหมดทุกสเตอรอยด์ ต่างกันแค่<tspan font-weight="700">หมู่ที่มาเกาะรอบ ๆ</tspan></text>
    <text x="12" y="194"><tspan font-weight="700">คอเลสเตอรอล</tspan> แทรกในเยื่อหุ้มเซลล์สัตว์ · เป็นสารตั้งต้นของฮอร์โมนเพศ</text>
    <text x="12" y="212"><tspan font-weight="700">เทสโทสเตอโรน · เอสโทรเจน · คอร์ติซอล</tspan> ใช้โครงเดียวกันนี้หมด</text>
  </g>
</svg>`;

  const SVG_NUCLEOTIDE = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="โครงสร้างนิวคลีโอไทด์และพันธะฟอสโฟไดเอสเทอร์">
  <text x="12" y="20" font-size="12" font-weight="700" fill="currentColor">นิวคลีโอไทด์ 1 หน่วย = 3 ส่วน</text>
  <circle cx="52" cy="66" r="21" fill="#3b7ddd" opacity="0.26" stroke="#3b7ddd" stroke-width="2.2"/>
  <text x="52" y="71" font-size="13" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
  <text x="46" y="112" font-size="10.5" fill="#3b7ddd" text-anchor="middle" font-weight="700">หมู่ฟอสเฟต</text>
  <line x1="73" y1="66" x2="92" y2="66" stroke="currentColor" stroke-width="2"/>
  <polygon points="118,44 146,58 138,86 104,86 96,58" fill="#d98324" opacity="0.2" stroke="#d98324" stroke-width="2.2"/>
  <text x="121" y="72" font-size="10.5" fill="#d98324" text-anchor="middle" font-weight="700">น้ำตาล</text>
  <text x="160" y="96" font-size="10" fill="currentColor" text-anchor="middle">DNA = ดีออกซีไรโบส · RNA = ไรโบส</text>
  <line x1="146" y1="58" x2="176" y2="58" stroke="currentColor" stroke-width="2"/>
  <rect x="176" y="40" width="70" height="36" rx="7" fill="#7c5cd6" opacity="0.2" stroke="#7c5cd6" stroke-width="2.2"/>
  <text x="211" y="63" font-size="11" fill="#7c5cd6" text-anchor="middle" font-weight="700">เบสไนโตรเจน</text>
  <text x="300" y="50" font-size="10.5" fill="currentColor">DNA: A T C G</text>
  <text x="300" y="68" font-size="10.5" fill="currentColor">RNA: A <tspan font-weight="700" fill="#e05252">U</tspan> C G</text>
  <text x="300" y="86" font-size="10" fill="currentColor">(RNA ใช้ U แทน T)</text>
  <line x1="8" y1="120" x2="392" y2="120" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="12" y="142" font-size="12" font-weight="700" fill="currentColor">ต่อกันเป็นสายด้วยพันธะฟอสโฟไดเอสเทอร์</text>
  <g>
    <circle cx="48" cy="184" r="15" fill="#3b7ddd" opacity="0.26" stroke="#3b7ddd" stroke-width="2"/><text x="48" y="189" font-size="11" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
    <polygon points="94,166 116,176 110,198 82,198 76,176" fill="#d98324" opacity="0.2" stroke="#d98324" stroke-width="2"/>
    <line x1="63" y1="184" x2="76" y2="184" stroke="currentColor" stroke-width="2"/>
    <circle cx="152" cy="184" r="15" fill="#3b7ddd" opacity="0.26" stroke="#3b7ddd" stroke-width="2"/><text x="152" y="189" font-size="11" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
    <line x1="116" y1="184" x2="137" y2="184" stroke="#e05252" stroke-width="2.6"/>
    <polygon points="198,166 220,176 214,198 186,198 180,176" fill="#d98324" opacity="0.2" stroke="#d98324" stroke-width="2"/>
    <line x1="167" y1="184" x2="180" y2="184" stroke="currentColor" stroke-width="2"/>
    <circle cx="256" cy="184" r="15" fill="#3b7ddd" opacity="0.26" stroke="#3b7ddd" stroke-width="2"/><text x="256" y="189" font-size="11" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
    <line x1="220" y1="184" x2="241" y2="184" stroke="#e05252" stroke-width="2.6"/>
    <polygon points="302,166 324,176 318,198 290,198 284,176" fill="#d98324" opacity="0.2" stroke="#d98324" stroke-width="2"/>
    <line x1="271" y1="184" x2="284" y2="184" stroke="currentColor" stroke-width="2"/>
  </g>
  <text x="200" y="222" font-size="10.5" fill="#e05252" text-anchor="middle" font-weight="700">ฟอสเฟตของหน่วยหนึ่ง จับกับน้ำตาลของหน่วยถัดไป</text>
  <text x="200" y="240" font-size="10" fill="currentColor" text-anchor="middle">สลับฟอสเฟต–น้ำตาลเป็น "โครงสันหลัง" ของสาย · เบสห้อยออกด้านข้าง</text>
</svg>`;

  const SVG_ATP = `<svg viewBox="0 0 400 230" width="400" height="230" role="img" aria-label="โครงสร้าง ATP และพันธะพลังงานสูง">
  <text x="200" y="20" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">ATP = อะดีนีน + ไรโบส + หมู่ฟอสเฟต 3 หมู่</text>
  <rect x="14" y="52" width="62" height="38" rx="8" fill="#7c5cd6" opacity="0.2" stroke="#7c5cd6" stroke-width="2.2"/>
  <text x="45" y="76" font-size="11" fill="#7c5cd6" text-anchor="middle" font-weight="700">อะดีนีน</text>
  <line x1="76" y1="71" x2="94" y2="71" stroke="currentColor" stroke-width="2"/>
  <polygon points="118,50 144,62 138,88 106,88 100,62" fill="#d98324" opacity="0.2" stroke="#d98324" stroke-width="2.2"/>
  <text x="121" y="76" font-size="10.5" fill="#d98324" text-anchor="middle" font-weight="700">ไรโบส</text>
  <line x1="144" y1="68" x2="162" y2="68" stroke="currentColor" stroke-width="2"/>
  <circle cx="182" cy="68" r="19" fill="#3b7ddd" opacity="0.26" stroke="#3b7ddd" stroke-width="2.2"/><text x="182" y="73" font-size="12" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
  <circle cx="242" cy="68" r="19" fill="#3b7ddd" opacity="0.26" stroke="#3b7ddd" stroke-width="2.2"/><text x="242" y="73" font-size="12" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
  <circle cx="302" cy="68" r="19" fill="#3b7ddd" opacity="0.26" stroke="#3b7ddd" stroke-width="2.2"/><text x="302" y="73" font-size="12" fill="#3b7ddd" text-anchor="middle" font-weight="700">P</text>
  <line x1="201" y1="68" x2="223" y2="68" stroke="#e05252" stroke-width="3.4"/>
  <line x1="261" y1="68" x2="283" y2="68" stroke="#e05252" stroke-width="3.4"/>
  <path d="M206 56 q6 -8 12 0" fill="none" stroke="#e05252" stroke-width="1.6"/>
  <path d="M266 56 q6 -8 12 0" fill="none" stroke="#e05252" stroke-width="1.6"/>
  <text x="242" y="112" font-size="11" fill="#e05252" text-anchor="middle" font-weight="700">พันธะพลังงานสูง 2 พันธะ</text>
  <line x1="8" y1="128" x2="392" y2="128" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <g font-size="11" fill="currentColor">
    <text x="12" y="152">ATP  +  H₂O  →  ADP  +  Pi  +  <tspan font-weight="700" fill="#e05252">พลังงาน</tspan>   (คายพลังงาน)</text>
    <text x="12" y="172">ADP  +  Pi  +  <tspan font-weight="700" fill="#2e9e6b">พลังงาน</tspan>  →  ATP  +  H₂O   (ดูดพลังงาน)</text>
  </g>
  <text x="12" y="198" font-size="10" fill="currentColor">ฟอสเฟตทั้งสามมีประจุลบ อยู่ชิดกันจึง<tspan font-weight="700">ผลักกันแรง</tspan> พอตัดหมู่ท้ายออก จึงคายพลังงาน</text>
  <text x="12" y="218" font-size="10" fill="currentColor">ตัดหมู่ที่ 3 ได้ ADP · ตัดอีกหมู่ได้ AMP — เซลล์สร้างกลับเป็น ATP ได้เรื่อย ๆ</text>
</svg>`;

  STARTER_CONTENT[ID] = [

    /* ---------------- บทที่ 1 ---------------- */
    { type: "h1", text: "บทที่ 1 · เคมีที่เป็นพื้นฐานของสิ่งมีชีวิต" },

    { type: "callout", html: "สิ่งมีชีวิตไม่ได้ใช้กฎเคมีคนละชุดกับก้อนหินหรืออากาศ — ใช้กฎเดียวกันเป๊ะ ๆ ที่ต่างคือ<b>วิธีจัดวางอะตอม</b> บทนี้จึงไล่จากหน่วยเล็กที่สุด (อะตอม) ขึ้นไปหาสารที่ประกอบเป็นเซลล์ ถ้าจับหลัก “โครงสร้างแบบนี้ → สมบัติแบบนี้” ได้ บทหลัง ๆ จะง่ายขึ้นมาก",
      detail: `<h3>ลำดับการจัดระบบของสิ่งมีชีวิต</h3>
<p>เอกสารเปิดบทด้วยภาพเปรียบเทียบไก่กับต้นไม้ ไล่จากใหญ่ไปเล็ก ให้จำลำดับนี้ให้ได้ เพราะข้อสอบชอบถามว่า "ระดับใดอยู่ก่อนระดับใด"</p>
<p class="frm">สิ่งมีชีวิต → ระบบอวัยวะ → อวัยวะ → เนื้อเยื่อ → เซลล์ → โมเลกุล → อะตอม</p>
<table>
<tr><th>ระดับ</th><th>ตัวอย่างในสัตว์ (ไก่)</th><th>ตัวอย่างในพืช (ต้นไม้)</th></tr>
<tr><td>ระบบอวัยวะ</td><td>ระบบหมุนเวียนเลือด</td><td>ระบบลำต้น ระบบราก</td></tr>
<tr><td>อวัยวะ</td><td>หัวใจ</td><td>ใบ</td></tr>
<tr><td>เนื้อเยื่อ</td><td>เนื้อเยื่อกล้ามเนื้อ</td><td>เนื้อเยื่อลำเลียง</td></tr>
<tr><td>เซลล์</td><td>เซลล์สัตว์</td><td>เซลล์พืช</td></tr>
</table>
<div class="box why"><b>ทำไมต้องเริ่มที่อะตอม</b><br>
เพราะทุกสมบัติที่เราจะเรียนต่อไป — น้ำเป็นตัวทำละลายที่ดี ไขมันไม่ละลายน้ำ เอนไซม์เสียสภาพเมื่อร้อน — อธิบายได้จาก<b>การจัดเรียงอิเล็กตรอนและชนิดพันธะ</b>ทั้งสิ้น ถ้าข้ามตรงนี้ไปจะต้องท่องจำทุกอย่างแทนที่จะเข้าใจ</div>
<div class="box tip"><b>ทริคจำ</b> อ่านย้อนจากล่างขึ้นบน: "อะตอม → โมเลกุล → เซลล์" คือฝั่งเคมี ส่วน "เนื้อเยื่อ → อวัยวะ → ระบบ → สิ่งมีชีวิต" คือฝั่งชีวะ จุดต่อของสองฝั่งคือ<b>เซลล์</b></div>` },

    { type: "h2", text: "1.1 อะตอม ธาตุ และสารประกอบ" },

    { type: "p", html: "อะตอมประกอบด้วย <b>โปรตอน</b> และ <b>นิวตรอน</b> ที่อยู่รวมกันในนิวเคลียส และ <b>อิเล็กตรอน</b> ที่เคลื่อนที่รอบนิวเคลียสในระดับพลังงานต่าง ๆ",
      detail: `<h3>1.1.1 ส่วนประกอบของอะตอม และเลขสองตัวที่ต้องแยกให้ออก</h3>
<table>
<tr><th>อนุภาค</th><th>ประจุไฟฟ้า</th><th>อยู่ที่ไหน</th></tr>
<tr><td>โปรตอน (proton)</td><td><b>บวก</b></td><td>นิวเคลียส</td></tr>
<tr><td>นิวตรอน (neutron)</td><td><b>ไม่มีประจุ</b></td><td>นิวเคลียส</td></tr>
<tr><td>อิเล็กตรอน (electron)</td><td><b>ลบ</b></td><td>เคลื่อนที่รอบนิวเคลียส</td></tr>
</table>
<p>อะตอมที่มี<b>จำนวนอิเล็กตรอนเท่ากับจำนวนโปรตอน</b> จะเป็นกลางทางไฟฟ้า</p>
<p class="frm">เลขอะตอม = จำนวนโปรตอน<br>เลขมวล = จำนวนโปรตอน + จำนวนนิวตรอน</p>
<h4>สัญลักษณ์นิวเคลียร์</h4>
<p>เขียนเป็น <sup>12</sup><sub>6</sub>C โดยเลข<b>บนซ้ายคือเลขมวล (12)</b> เลข<b>ล่างซ้ายคือเลขอะตอม (6)</b> และ C คือสัญลักษณ์ธาตุ ดังนั้นคาร์บอนอะตอมนี้มีโปรตอน 6 นิวตรอน 12 − 6 = 6</p>
<h4>เวเลนซ์อิเล็กตรอน</h4>
<p>อิเล็กตรอนที่อยู่ใน<b>ระดับพลังงานนอกสุด</b> เรียกว่า <b>เวเลนซ์อิเล็กตรอน (valence electron)</b> — ตัวนี้แหละที่เป็นพระเอกของการเกิดพันธะเคมีทั้งหมดในบทนี้</p>
<div class="box warn"><b>จุดที่คนพลาดบ่อย</b> "เลขมวล" ไม่ใช่ "มวลอะตอม" และไม่ใช่จำนวนนิวตรอน — เลขมวลคือ<b>ผลรวม</b>ของโปรตอนกับนิวตรอน ถ้าโจทย์ให้เลขมวลกับเลขอะตอมมา ต้องลบกันก่อนถึงจะได้จำนวนนิวตรอน</div>` },

    { type: "p", html: "เมื่ออะตอมมีจำนวนโปรตอนไม่เท่ากับจำนวนอิเล็กตรอน ประจุสุทธิจะไม่เป็นศูนย์ กลายเป็น <b>ไอออน</b> เช่น Na⁺ มีโปรตอน 11 แต่มีอิเล็กตรอนเพียง 10 จึงมีประจุบวก ส่วน Cl⁻ มีโปรตอน 17 แต่มีอิเล็กตรอน 18 จึงมีประจุลบ",
      detail: `<h3>1.1.2 ไอออน — ตัวเลขที่เอกสารให้มาโดยตรง</h3>
<table>
<tr><th>ไอออน</th><th>โปรตอน</th><th>อิเล็กตรอน</th><th>ประจุสุทธิ</th></tr>
<tr><td>Na⁺ (โซเดียมไอออน)</td><td>11</td><td>10</td><td><b>+1</b> (โปรตอนเกินมา 1)</td></tr>
<tr><td>Cl⁻ (คลอไรด์ไอออน)</td><td>17</td><td>18</td><td><b>−1</b> (อิเล็กตรอนเกินมา 1)</td></tr>
</table>
<div class="box why"><b>ทำไมประจุ 1+ กับ 1− ถึงไม่เขียนเลข</b><br>
เป็นข้อตกลงในการเขียน ถ้าประจุเท่ากับ 1 จะเขียนแค่เครื่องหมาย เช่น Na⁺ Cl⁻ แต่ถ้ามากกว่า 1 ต้องใส่เลขนำหน้าเครื่องหมาย เช่น Ca²⁺ ไม่ใช่ Ca⁺²</div>
<p>ธาตุในสิ่งมีชีวิต<b>ส่วนใหญ่อยู่ในรูปไอออน</b> เช่น Na⁺ K⁺ Ca²⁺ และไนเทรตไอออน NO₃⁻ ไอออนเหล่านี้ละลายอยู่ในน้ำ พืชจึงดูดซึมเข้าทางรากได้</p>
<div class="box tip"><b>ทริคทำข้อสอบ</b> เห็นคำว่า "ประจุบวก" ให้นึกทันทีว่า<b>อิเล็กตรอนหายไป</b> ไม่ใช่โปรตอนเพิ่มขึ้น เพราะจำนวนโปรตอนคือเลขอะตอมซึ่งเปลี่ยนไม่ได้ ถ้าโปรตอนเปลี่ยนก็จะกลายเป็นธาตุอื่นไปแล้ว</div>` },

    { type: "p", html: "สารประกอบเกิดจากอะตอมมากกว่า 1 ชนิดมารวมกัน และมักมี<b>สมบัติต่างจากธาตุที่เป็นองค์ประกอบโดยสิ้นเชิง</b>",
      detail: `<h3>1.1.3 โซเดียมคลอไรด์ — ตัวอย่างคลาสสิกที่เอกสารใช้</h3>
<table>
<tr><th>สาร</th><th>ลักษณะ</th></tr>
<tr><td><b>โซเดียม (Na)</b></td><td>ธาตุ ลักษณะเป็น<b>โลหะสีเทา จุดหลอมเหลวต่ำ ไวต่อปฏิกิริยา</b></td></tr>
<tr><td><b>คลอรีน (Cl)</b></td><td>ธาตุ ลักษณะเป็น<b>แก๊สสีเขียวเหลือง และเป็นพิษ</b></td></tr>
<tr><td><b>โซเดียมคลอไรด์ (NaCl)</b></td><td>สารประกอบ เป็น<b>ของแข็ง ไม่เป็นพิษ ไม่มีสี จุดหลอมเหลวสูง</b></td></tr>
</table>
<div class="box why"><b>ทำไมสมบัติถึงเปลี่ยนไปคนละเรื่อง</b><br>
เพราะสมบัติของสารไม่ได้ขึ้นกับว่า "มีธาตุอะไรอยู่" แต่ขึ้นกับว่า<b>อิเล็กตรอนถูกจัดเรียงอย่างไร</b> เมื่อ Na ให้อิเล็กตรอนแก่ Cl ทั้งคู่กลายเป็นไอออนที่มีการจัดเรียงอิเล็กตรอนเสถียร แรงดึงดูดระหว่างประจุตรงข้ามยึดกันแน่นเป็นผลึก จึงได้ของแข็งจุดหลอมเหลวสูงที่กินได้</div>
<div class="box warn"><b>ระวัง</b> ข้อสอบชอบถามกลับว่า "ถ้ากินเกลือแกงแล้วปลอดภัย แสดงว่าคลอรีนไม่เป็นพิษใช่หรือไม่" — ตอบว่าไม่ใช่ เพราะ Cl ในเกลือแกงอยู่ในรูป<b>คลอไรด์ไอออน (Cl⁻)</b> ซึ่งเป็นคนละสารกับ<b>แก๊สคลอรีน (Cl₂)</b></div>` },

    { type: "h2", text: "1.2 ธาตุและปริมาณของธาตุในสิ่งมีชีวิต" },

    { type: "p", html: "พืชประกอบด้วยธาตุหลัก 3 ชนิด คือ <b>คาร์บอน (C) ไฮโดรเจน (H) และออกซิเจน (O)</b> ซึ่งทั้งหมดได้มาจาก<b>น้ำและแก๊สคาร์บอนไดออกไซด์</b>" },

    { type: "table", rows: [
      ["กลุ่ม", "ธาตุ", "ร้อยละ"],
      ["ธาตุที่เป็นองค์ประกอบหลัก รวม 96%", "คาร์บอน (C)", "45%"],
      ["", "ออกซิเจน (O)", "45%"],
      ["", "ไฮโดรเจน (H)", "6%"],
      ["ธาตุจากสารอาหารหลัก รวม 3.6%", "ไนโตรเจน (N)", "1.5%"],
      ["", "โพแทสเซียม (K)", "1%"],
      ["", "แคลเซียม (Ca)", "0.5%"],
      ["", "แมกนีเซียม (Mg) · ฟอสฟอรัส (P)", "อย่างละ 0.2%"],
      ["", "กำมะถัน (S) · ซิลิกอน (Si)", "อย่างละ 0.1%"],
      ["ธาตุจากสารอาหารรอง รวม 0.4%", "Cl, Fe, B, Mn, Mo, Zn, Na, Cu, Ni", "รวม 0.4%"]
    ], detail: `<h3>1.2.1 ชนิดและปริมาณของธาตุที่พบในพืชทั่วไป</h3>
<p>ตารางนี้คือ<b>ตัวเลขที่เอกสารครูให้มาตรง ๆ</b> (รูปต้นไม้ 3 พุ่ม) และเป็นชุดตัวเลขที่ออกข้อสอบบ่อยที่สุดของหัวข้อนี้ ให้จำเป็น "ก้อน" ไม่ต้องจำทีละตัว</p>
<p class="frm">96% + 3.6% + 0.4% = 100%</p>
<h4>วิธีจำที่ใช้ได้จริง</h4>
<ul>
<li><b>C กับ O เท่ากัน 45%</b> — สองตัวนี้รวมกัน 90% แล้ว</li>
<li><b>H เหลือแค่ 6%</b> เพราะไฮโดรเจนมวลอะตอมน้อยมาก ถึงจะมีจำนวนอะตอมเยอะแต่คิดเป็นมวลแล้วน้อย</li>
<li>กลุ่มถัดมาไล่จากมากไปน้อย: <b>N 1.5 → K 1 → Ca 0.5 → Mg 0.2 → P 0.2 → S 0.1 → Si 0.1</b></li>
</ul>
<div class="box why"><b>ทำไม C กับ O ถึงเยอะเท่ากัน</b><br>
เพราะเนื้อพืชส่วนใหญ่คือคาร์โบไฮเดรต ซึ่งมีสูตรโดยประมาณ (CH₂O)ₙ — ในหนึ่งหน่วยมี C 1 อะตอม (มวล 12) และ O 1 อะตอม (มวล 16) สัดส่วนมวลจึงใกล้เคียงกัน ส่วน H มี 2 อะตอมก็จริงแต่มวลแค่ 1 ต่ออะตอม</div>
<div class="box warn"><b>ระวังสับสน</b> ตัวเลขชุดนี้เป็นของ<b>พืช</b> อย่าเอาไปปนกับตัวเลขปริมาณสารในร่างกายมนุษย์ (น้ำ 65% โปรตีน 18% ...) ที่อยู่ในหัวข้อถัดไป — เป็นคนละตารางและคนละสิ่งที่วัด (ตารางนี้วัด "ธาตุ" ตารางนั้นวัด "สาร")</div>` },

    { type: "bullet", html: "<b>ไนโตรเจน (N)</b> เป็นองค์ประกอบของ คลอโรฟิลล์ · กรดแอมิโน · กรดนิวคลีอิก" },
    { type: "bullet", html: "<b>ฟอสฟอรัส (P)</b> เป็นองค์ประกอบของ ฟอสโฟลิพิด · ATP · นิวคลีโอไทด์" },
    { type: "bullet", html: "<b>เหล็ก (Fe)</b> เป็นองค์ประกอบของ ฮีโมโกลบิน" },

    { type: "table", rows: [
      ["ธาตุ", "ปริมาณที่ร่างกายมนุษย์ต้องการต่อวัน (โดยประมาณ)"],
      ["เหล็ก (Fe)", "15 มิลลิกรัม"],
      ["โซเดียม (Na)", "2,400 มิลลิกรัม"],
      ["โพแทสเซียม (K)", "3,500 มิลลิกรัม"],
      ["ไอโอดีน (I)", "0.15 มิลลิกรัม"]
    ], detail: `<h3>1.2.2 ปริมาณธาตุที่ร่างกายต้องการต่อวัน</h3>
<p>ตัวเลขชุดนี้เอกสารให้มาตรง ๆ เช่นกัน จำเรียงจากมากไปน้อยได้ว่า</p>
<p class="frm">K 3,500 &gt; Na 2,400 &gt; Fe 15 &gt; I 0.15 (หน่วยมิลลิกรัม)</p>
<div class="box tip"><b>ทริคจำ</b> K กับ Na เป็นหลัก<b>พันมิลลิกรัม</b> (เพราะเป็นไอออนหลักที่ควบคุมสมดุลน้ำและการทำงานของเซลล์ประสาท ใช้เยอะ) ส่วน Fe กับ I เป็นหลัก<b>เศษมิลลิกรัม</b> (ใช้เป็นองค์ประกอบเฉพาะจุด — Fe ในฮีโมโกลบิน, I ในฮอร์โมนไทรอยด์) ตัวเลขห่างกันหลักร้อยเท่า</div>
<div class="box warn"><b>ระวัง</b> "ต้องการน้อย" ไม่ได้แปลว่า "ไม่สำคัญ" เอกสารเน้นไว้ว่าถ้าได้รับไม่เพียงพอหรือสูญเสียไป <b>การทำงานของอวัยวะต่าง ๆ อาจผิดปกติได้</b> — ประโยคนี้มักถูกเอาไปทำเป็นตัวเลือกในข้อสอบ</div>` },

    { type: "table", rows: [
      ["สารในร่างกายมนุษย์", "ร้อยละโดยน้ำหนัก"],
      ["น้ำ", "65%"],
      ["โปรตีน", "18%"],
      ["ลิพิด (ไขมัน)", "10%"],
      ["คาร์โบไฮเดรต", "5%"],
      ["สารอื่น ๆ", "2%"]
    ], detail: `<h3>1.2.3 ปริมาณของสารต่าง ๆ ในร่างกายมนุษย์</h3>
<p>ร่างกายมนุษย์มีน้ำประมาณ <b>65%</b> หรือราว <b>2 ใน 3</b> ของน้ำหนักตัว ถัดมาคือโปรตีน 18% ลิพิด 10% คาร์โบไฮเดรต 5% และสารอื่น ๆ 2%</p>
<div class="box why"><b>ทำไมคาร์โบไฮเดรตถึงน้อยที่สุดในสามชนิด ทั้งที่เป็นแหล่งพลังงานหลัก</b><br>
เพราะคาร์โบไฮเดรตเป็น "พลังงานที่ใช้ทันที" ไม่ใช่ของที่ร่างกาย<b>สะสม</b>ไว้เยอะ — เก็บได้จำกัดในรูปไกลโคเจนที่ตับและกล้ามเนื้อเท่านั้น ส่วนพลังงานส่วนเกินถูกเปลี่ยนไปเก็บเป็นไขมันซึ่งเก็บได้ไม่จำกัดและให้พลังงานต่อกรัมมากกว่า</div>
<div class="box tip"><b>ทริคจำเรียงลำดับ</b> น้ำ &gt; โปรตีน &gt; ลิพิด &gt; คาร์โบไฮเดรต &gt; อื่น ๆ &nbsp;(65-18-10-5-2) ตัวเลขไล่ลดลงอย่างมีแบบแผน จำเป็นลำดับง่ายกว่าจำทีละตัว</div>
<div class="box warn"><b>ระวัง</b> โปรตีนมากกว่าไขมัน — คนมักเดาสลับเพราะคิดว่าร่างกายมีไขมันเยอะ แต่โปรตีนกระจายอยู่ในกล้ามเนื้อ เอนไซม์ เยื่อหุ้มเซลล์ และเนื้อเยื่อเกี่ยวพันทั้งตัว จึงรวมแล้วมากกว่า</div>` },

    { type: "p", html: "คาร์บอนหมุนเวียนอยู่ในระบบนิเวศตลอดเวลา พืชรับ CO₂ จากบรรยากาศไปสังเคราะห์ด้วยแสงเป็นน้ำตาล สัตว์ได้คาร์บอนจากการกิน สิ่งมีชีวิตหายใจปล่อย CO₂ กลับคืน และซากที่สะสมนานอาจกลายเป็นเชื้อเพลิงฟอสซิล",
      detail: `<h3>1.2.4 การหมุนเวียนของคาร์บอน</h3>
<p>เส้นทางที่เอกสารวาดไว้ อ่านเป็นวงกลมได้ดังนี้</p>
<ol>
<li>พืชใช้ <b>CO₂ ในบรรยากาศ</b> สังเคราะห์ด้วยแสง เปลี่ยนคาร์บอนให้อยู่ในรูป<b>น้ำตาล (คาร์โบไฮเดรต)</b></li>
<li>พืชนำน้ำตาลไปสลายเพื่อให้ได้พลังงาน หรือใช้เป็นสารตั้งต้นสร้างสารอินทรีย์อื่น</li>
<li><b>สัตว์</b>ได้รับคาร์บอนในรูปสารอินทรีย์จาก<b>การกิน</b></li>
<li>สิ่งมีชีวิต<b>หายใจ</b> ปล่อยคาร์บอนออกสู่บรรยากาศในรูป <b>CO₂</b></li>
<li>เมื่อพืชและสัตว์ตาย <b>แบคทีเรียและฟังไจ</b>ย่อยสลายซาก</li>
<li>คาร์บอนที่สะสมนานมากกลายเป็น<b>เชื้อเพลิงฟอสซิล</b> ได้แก่ <b>ถ่านหิน น้ำมันดิบ และแก๊สธรรมชาติ</b> เมื่อเผาไหม้ก็ปล่อย CO₂ กลับสู่บรรยากาศอีกครั้ง</li>
</ol>
<div class="box warn"><b>จุดที่คนพลาด</b> เชื้อเพลิงฟอสซิลมี 3 อย่างตามเอกสาร คือ <b>ถ่านหิน น้ำมันดิบ แก๊สธรรมชาติ</b> — ไม่รวม "ถ่านไม้" ซึ่งเกิดจากการเผาไม้ในปัจจุบัน ไม่ได้สะสมมาเป็นเวลานาน</div>` },

    { type: "h2", text: "1.3 พันธะเคมีและแรงยึดเหนี่ยวระหว่างโมเลกุล" },

    { type: "p", html: "<b>พันธะเคมี (chemical bond)</b> คือแรงยึดเหนี่ยวที่ทำให้อะตอมหรือไอออนรวมตัวกันเป็นสาร และเกี่ยวข้องกับ<b>เวเลนซ์อิเล็กตรอน</b>ของคู่อะตอมที่ร่วมสร้างพันธะ" },

    { type: "table", rows: [
      ["ชนิดแรงยึดเหนี่ยว", "เกิดขึ้นอย่างไร", "ระดับความแข็งแรง", "ตัวอย่างในสิ่งมีชีวิต"],
      ["พันธะโคเวเลนต์ (covalent)", "อะตอม 2 อะตอม<b>ใช้เวเลนซ์อิเล็กตรอนร่วมกัน</b>", "แข็งแรงที่สุด", "O–H ในน้ำ, C–C ในสายคาร์บอน, พันธะเพปไทด์"],
      ["พันธะไอออนิก (ionic)", "อะตอมหนึ่ง<b>ให้</b>อิเล็กตรอน อีกอะตอม<b>รับ</b> เกิดไอออนบวกกับไอออนลบดูดกัน", "แข็งแรง (แต่อ่อนลงมากเมื่ออยู่ในน้ำ)", "NaCl, แรงยึดในโครงสร้างตติยภูมิของโปรตีน"],
      ["พันธะไฮโดรเจน (hydrogen bond)", "แรงยึดเหนี่ยว<b>ระหว่างโมเลกุล</b>ที่มีขั้ว", "อ่อนกว่าพันธะโคเวเลนต์มาก", "ระหว่างโมเลกุลน้ำ, ระหว่างคู่เบสใน DNA, โครงสร้างทุติยภูมิของโปรตีน"]
    ], detail: `<h3>1.3 พันธะเคมี — ทำไมชีวิตต้องมีทั้ง "พันธะแข็ง" และ "พันธะอ่อน"</h3>
` + SVG_WATER + `
<h4>พันธะโคเวเลนต์กับพันธะไอออนิก ต่างกันตรงไหน</h4>
<p>จำสั้น ๆ ว่า <b>โคเวเลนต์ = ใช้ร่วมกัน</b> · <b>ไอออนิก = ให้กับรับ</b></p>
<ul>
<li><b>โคเวเลนต์</b> อะตอมทั้งสองดึงอิเล็กตรอนคู่เดียวกันไว้ด้วยกัน ไม่มีใครได้ไปครอบครองเต็มตัว</li>
<li><b>ไอออนิก</b> อะตอมหนึ่งปล่อยอิเล็กตรอนออกไปเลยจนกลายเป็นไอออนบวก อีกอะตอมรับไปจนเป็นไอออนลบ แล้วประจุตรงข้ามดูดกัน</li>
</ul>
<h4>พันธะไฮโดรเจน — แรงระหว่างโมเลกุล ไม่ใช่ภายในโมเลกุล</h4>
<p>เอกสารยกตัวอย่างไว้ 2 กรณี คือพันธะไฮโดรเจน<b>ระหว่างโมเลกุลแอมโมเนียด้วยกันเอง</b> และ<b>ระหว่างแอมโมเนียกับน้ำ</b> แสดงว่าเกิดได้ทั้งกับโมเลกุลชนิดเดียวกันและต่างชนิดกัน</p>
<div class="box why"><b>ทำไมชีวิตต้องมีพันธะอ่อนด้วย</b><br>
ถ้าทุกอย่างในเซลล์ยึดกันด้วยพันธะโคเวเลนต์อย่างเดียว เซลล์จะกลายเป็นก้อนแข็งที่รื้อไม่ได้ สร้างใหม่ไม่ได้ ตอบสนองอะไรไม่ได้เลย<br>
พันธะไฮโดรเจนเป็น "กาวที่แกะออกได้" — แต่ละพันธะอ่อนมาก จึงต่อและถอดได้ที่อุณหภูมิร่างกายโดยไม่ต้องใช้พลังงานมหาศาล แต่เมื่อมีจำนวนมหาศาลรวมกันก็แข็งแรงพอจะยึด DNA สองสายหรือพับโปรตีนให้คงรูปได้</div>
<div class="box warn"><b>จุดที่คนพลาดบ่อยที่สุด</b> ในโมเลกุลน้ำ H กับ O ยึดกันด้วย<b>พันธะโคเวเลนต์</b> ส่วนโมเลกุลน้ำกับโมเลกุลน้ำยึดกันด้วย<b>พันธะไฮโดรเจน</b> — ถ้าตอบสลับกัน ข้อนั้นผิดทันที ให้จำคำว่า "ภายใน = โคเวเลนต์ · ระหว่าง = ไฮโดรเจน"</div>` },

    { type: "h2", text: "1.4 น้ำ — โครงสร้างและสมบัติ" },

    { type: "p", html: "น้ำ (H₂O) เกิดจากไฮโดรเจน 2 อะตอมกับออกซิเจน 1 อะตอมยึดกันด้วย<b>พันธะโคเวเลนต์</b> แต่อิเล็กตรอนคู่ร่วมพันธะอยู่ใกล้ออกซิเจนมากกว่า จึงทำให้โมเลกุลน้ำเป็น<b>โมเลกุลมีขั้ว (polar molecule)</b>",
      detail: `<h3>1.4.1 ทำไมน้ำถึงมีขั้ว — ต้นทางของสมบัติทุกข้อ</h3>
` + SVG_WATER + `
<p>ออกซิเจนดึงอิเล็กตรอนเก่งกว่าไฮโดรเจน อิเล็กตรอนคู่ร่วมพันธะจึงใช้เวลาอยู่แถวออกซิเจนมากกว่า ผลคือ</p>
<ul>
<li>บริเวณ<b>ออกซิเจน</b> มีอิเล็กตรอนหนาแน่นกว่า → ประจุค่อนข้าง<b>ลบ</b> (&#948;&#8722;)</li>
<li>บริเวณ<b>ไฮโดรเจน</b> มีอิเล็กตรอนหนาแน่นน้อยกว่า → ประจุค่อนข้าง<b>บวก</b> (&#948;+)</li>
</ul>
<div class="box why"><b>เส้นเหตุผลที่ต้องท่องให้ได้ทั้งเส้น</b><br>
O ดึงอิเล็กตรอนเก่งกว่า → โมเลกุลมีขั้ว → เกิดพันธะไฮโดรเจนระหว่างโมเลกุลได้ → <b>จากตรงนี้อธิบายสมบัติของน้ำได้ทุกข้อ</b> ทั้งการเป็นตัวทำละลาย ความร้อนจำเพาะสูง แรงโคฮีชัน และแรงแอดฮีชัน<br>
ข้อสอบชอบถามแบบ "เพราะเหตุใดน้ำจึง..." ทุกคำตอบย้อนกลับมาที่ประโยคนี้เสมอ</div>
<p>เอกสารย้ำว่า<b>พันธะไฮโดรเจนมีแรงยึดเหนี่ยวน้อยกว่าพันธะโคเวเลนต์</b> และถูกสลายได้เมื่อน้ำไปรวมตัวกับสารอื่น</p>` },

    { type: "table", rows: [
      ["สมบัติของน้ำ", "เกิดจากอะไร", "สำคัญต่อสิ่งมีชีวิตอย่างไร"],
      ["เป็นตัวทำละลายที่ดี", "โมเลกุลมีขั้ว + เกิดพันธะไฮโดรเจนกับสารอื่น", "นำสารเข้า-ออกเซลล์ ลำเลียงสาร กำจัดของเสีย"],
      ["ความร้อนจำเพาะสูง", "ต้องใช้พลังงานมากในการทำลายพันธะไฮโดรเจนระหว่างโมเลกุล", "อุณหภูมิภายในร่างกายเปลี่ยนแปลงได้น้อย"],
      ["แรงโคฮีชัน (cohesion)", "พันธะไฮโดรเจน<b>ระหว่างโมเลกุลน้ำด้วยกัน</b>", "น้ำต่อกันไม่ขาดตอนขณะถูกดึงขึ้นไปในไซเล็ม"],
      ["แรงแอดฮีชัน (adhesion)", "แรงยึดเหนี่ยว<b>ระหว่างโมเลกุลน้ำกับพื้นผิว</b> เช่น ผนังเซลล์", "ช่วยให้น้ำเกาะผนังท่อลำเลียงและไม่ไหลย้อนลง"],
      ["ควบคุมความเป็นกรด-เบส", "น้ำแตกตัวได้เล็กน้อยเป็น H⁺ และ OH⁻", "รักษา pH ของเลือดและของเหลวในร่างกายให้ใกล้ 7"]
    ], detail: `<h3>1.4.2 สมบัติของน้ำทีละข้อ พร้อมตัวเลขจากเอกสาร</h3>
<h4>ก. น้ำเป็นตัวทำละลาย</h4>
<p>เมื่อ NaCl ละลายน้ำ <b>Na⁺ จะเกาะกับอะตอมออกซิเจน</b> (ซึ่งเป็นขั้วลบ) ส่วน <b>Cl⁻ จะเกาะกับอะตอมไฮโดรเจน</b> (ซึ่งเป็นขั้วบวก) โมเลกุลน้ำจึงล้อมไอออนไว้แล้วดึงออกจากผลึกทีละตัว</p>
<h4>ข. ไฮโดรฟิลิก และ ไฮโดรโฟบิก</h4>
<table>
<tr><th>สมบัติ</th><th>แปลว่า</th><th>ตัวอย่าง</th></tr>
<tr><td><b>ไฮโดรฟิลิก</b> (hydrophilic)</td><td>ชอบน้ำ — สารมีขั้ว ละลายน้ำได้ดี</td><td>โซเดียมคลอไรด์ (เกลือแกง), ซูโครส (น้ำตาลทราย)</td></tr>
<tr><td><b>ไฮโดรโฟบิก</b> (hydrophobic)</td><td>ไม่ชอบน้ำ — สารไม่มีขั้ว ละลายน้ำได้น้อย</td><td>น้ำมัน ลิพิด</td></tr>
</table>
<p>เหตุผลคือสารไฮโดรโฟบิก<b>ไม่แตกตัวให้ไอออน</b>และ<b>ไม่มีขั้ว</b> จึงยึดเกาะกับโมเลกุลน้ำไม่ได้</p>
<h4>ค. ความเป็นกรด-เบส</h4>
<p class="frm">H₂O &#8652; H⁺ + OH⁻</p>
<ul>
<li>ความเข้มข้น H⁺ <b>สูง</b> → pH <b>ต่ำ</b> → เป็น<b>กรด</b></li>
<li>ความเข้มข้น H⁺ <b>ต่ำ</b> → pH <b>สูง</b> → เป็น<b>เบส</b></li>
<li>เซลล์ร่างกายทำงานได้ดีเมื่อ pH ใกล้ <b>7</b> (ค่อนข้างเป็นกลาง)</li>
</ul>
<h4>ง. ความร้อนจำเพาะสูง — ตัวเลขที่ต้องจำ</h4>
<table>
<tr><th>สาร</th><th>มวล</th><th>อุณหภูมิเพิ่มขึ้น</th><th>พลังงานความร้อนที่ต้องใช้</th></tr>
<tr><td><b>น้ำ</b></td><td>1 กรัม</td><td>1 องศาเซลเซียส</td><td><b>1 แคลอรี</b></td></tr>
<tr><td><b>เอทิลแอลกอฮอล์</b></td><td>1 กรัม</td><td>1 องศาเซลเซียส</td><td><b>0.58 แคลอรี</b></td></tr>
</table>
<div class="box why"><b>ทำไมน้ำถึงต้องใช้พลังงานมากกว่า</b><br>
เพราะก่อนที่โมเลกุลน้ำจะสั่นเร็วขึ้น (= อุณหภูมิสูงขึ้น) พลังงานที่ใส่เข้าไปส่วนหนึ่งต้องถูกใช้ไป<b>ทำลายพันธะไฮโดรเจน</b>ที่ยึดโมเลกุลน้ำไว้ด้วยกันก่อน พลังงานจึงไม่ได้ไปเพิ่มอุณหภูมิทั้งหมด ผลคือน้ำร้อนช้าและเย็นช้า — สิ่งมีชีวิตที่มีน้ำเป็นองค์ประกอบส่วนใหญ่จึงมี<b>อุณหภูมิภายในร่างกายที่เปลี่ยนแปลงได้น้อย</b></div>
<div class="box warn"><b>ระวังจำสลับ</b> <b>โคฮีชัน = น้ำกับน้ำ</b> · <b>แอดฮีชัน = น้ำกับผนัง/พื้นผิว</b><br>
จำด้วยเสียง: "โค" ใกล้ "คู่" (น้ำคู่กับน้ำ) ส่วน "แอด" มาจาก adhere = ติดกับของอื่น</div>` },

    { type: "callout", html: "สรุปเส้นเดียวของหัวข้อน้ำ: <b>O ดึงอิเล็กตรอนเก่งกว่า → น้ำมีขั้ว → เกิดพันธะไฮโดรเจน → ละลายสารมีขั้วได้ เก็บความร้อนเก่ง และเกาะกันเป็นสายไม่ขาดตอน</b> ทุกคำถามเรื่องสมบัติของน้ำตอบได้จากประโยคนี้" },

    { type: "h2", text: "1.5 สารประกอบคาร์บอนและหมู่ฟังก์ชัน" },

    { type: "p", html: "สารประกอบคาร์บอนในสิ่งมีชีวิตส่วนใหญ่จัดเป็น<b>สารอินทรีย์</b> เช่น คาร์โบไฮเดรต กรดแอมิโน โปรตีน ยูเรีย มีเทน ลิพิด และกรดนิวคลีอิก โดยมีไฮโดรเจนเป็นองค์ประกอบร่วมเสมอ และอาจมี O, N, P, S ด้วย" },

    { type: "p", html: "อะตอมคาร์บอนมี<b>เวเลนซ์อิเล็กตรอนเท่ากับ 4</b> จึงสร้างพันธะโคเวเลนต์ได้สูงสุด <b>4 พันธะ</b> และสร้างพันธะระหว่างคาร์บอนด้วยกันเองได้ทั้ง <b>พันธะเดี่ยว พันธะคู่ และพันธะสาม</b>",
      detail: `<h3>1.5.1 ทำไมคาร์บอนถึงเป็นแกนของสิ่งมีชีวิต</h3>
` + SVG_FUNCGROUP + `
` + SVG_CBOND + `
<p>สารอินทรีย์ที่มีเฉพาะคาร์บอนกับไฮโดรเจนเรียกว่า <b>สารประกอบไฮโดรคาร์บอน (hydrocarbon)</b></p>
<table>
<tr><th>ชื่อ</th><th>สูตร</th><th>พันธะระหว่าง C</th></tr>
<tr><td>มีเทน</td><td>CH₄</td><td>มี C เดียว ล้อมด้วย H 4 อะตอม</td></tr>
<tr><td>อีเทน</td><td>C₂H₆</td><td>พันธะเดี่ยว C–C</td></tr>
<tr><td>เอทิลีน</td><td>C₂H₄</td><td>พันธะคู่ C=C</td></tr>
<tr><td>อะเซทิลีน</td><td>C₂H₂</td><td>พันธะสาม C&#8801;C</td></tr>
</table>
<div class="box why"><b>เวเลนซ์อิเล็กตรอน 4 ทำไมถึงพิเศษ</b><br>
เพราะ 4 คือจุดกึ่งกลางพอดี — คาร์บอนไม่ได้อยากให้อิเล็กตรอนทิ้ง (แบบโลหะ) และไม่ได้อยากแย่งมา (แบบอโลหะแรง ๆ) มันจึง<b>ใช้ร่วมกัน</b>ได้ถึง 4 ทิศทางพร้อมกัน ผลคือสร้างโครงได้ทั้งสายยาว สายแตกกิ่ง และวงแหวน ซึ่งเป็นเหตุผลที่โมเลกุลของสิ่งมีชีวิตมีความหลากหลายมหาศาล</div>
<div class="box warn"><b>ระวัง</b> "พันธะสามแข็งแรงกว่าพันธะเดี่ยว" ถูก แต่ "พันธะสามเสถียรกว่า/ทำปฏิกิริยายากกว่า" <b>ผิด</b> — พันธะคู่และพันธะสามมีอิเล็กตรอนหนาแน่นสูง จึงมักเป็นตำแหน่งที่<b>ว่องไวต่อปฏิกิริยา</b> เช่น กรดไขมันไม่อิ่มตัวที่มีพันธะคู่จะเหม็นหืนง่ายกว่ากรดไขมันอิ่มตัว</div>` },

    { type: "table", rows: [
      ["หมู่ฟังก์ชัน", "โครงสร้าง", "ตัวอย่างของแหล่งที่พบ"],
      ["ไฮดรอกซิล (hydroxyl)", "—OH", "คาร์โบไฮเดรต เช่น น้ำตาล · แอลกอฮอล์ เช่น กลีเซอรอล"],
      ["คาร์บอกซิล (carboxyl)", "—COOH", "กรดแอมิโน · ลิพิด เช่น กรดไขมัน"],
      ["คาร์บอนิล กลุ่มคีโตน", "—C=O อยู่<b>กลางสาย</b>", "คาร์โบไฮเดรต เช่น ฟรักโทส ไรบูโลส"],
      ["คาร์บอนิล กลุ่มอัลดีไฮด์", "—C=O อยู่<b>ปลายสาย</b>", "คาร์โบไฮเดรต เช่น กลูโคส ไรโบส กาแล็กโทส"],
      ["แอมิโน (amino)", "—NH₂", "กรดแอมิโน"],
      ["ซัลฟ์ไฮดริล (sulfhydryl)", "—SH", "กรดแอมิโนบางชนิด เช่น ซิสเทอีน"],
      ["ฟอสเฟต (phosphate)", "—OPO₃²⁻", "ฟอสโฟลิพิด · กรดนิวคลีอิก (DNA, RNA) · ATP"]
    ], detail: `<h3>1.5.2 หมู่ฟังก์ชัน — "ปุ่มควบคุม" ของโมเลกุลอินทรีย์</h3>
<p><b>หมู่ฟังก์ชัน (functional group)</b> คือกลุ่มของอะตอมที่แสดงสมบัติเฉพาะในโมเลกุล และเป็นตัวกำหนดว่าโมเลกุลนั้นจะเกิดปฏิกิริยาเคมีแบบใด จึงใช้เป็น<b>เกณฑ์จำแนกสารประกอบคาร์บอน</b></p>
<p>ตัวอย่างที่เอกสารยกไว้</p>
<ul>
<li><b>กรดแอมิโน</b> มีหมู่แอมิโน (—NH₂) กับหมู่คาร์บอกซิล (—COOH)</li>
<li><b>น้ำตาล</b> มีหมู่ไฮดรอกซิล (—OH) กับหมู่คาร์บอนิล (—C=O)</li>
</ul>
<div class="box warn"><b>คู่ที่ต้องแยกให้ขาด — ออกสอบแทบทุกครั้ง</b><br>
<b>คาร์บอนิลกลุ่มอัลดีไฮด์</b> หมู่ C=O อยู่ที่<b>ปลายสาย</b> → กลูโคส, ไรโบส, กาแล็กโทส<br>
<b>คาร์บอนิลกลุ่มคีโตน</b> หมู่ C=O อยู่<b>กลางสาย</b> → ฟรักโทส, ไรบูโลส<br>
ทริคจำ: ชื่อที่ลงท้าย "-โทส" แล้วขึ้นต้นด้วย <b>ฟรัก/ไรบู</b> คือคีโตน ที่เหลือในบทนี้เป็นอัลดีไฮด์</div>
<div class="box tip"><b>ทริคจำหมู่ฟอสเฟต</b> จำ 3 อย่างที่มันอยู่: <b>ฟอสโฟลิพิด · กรดนิวคลีอิก · ATP</b> ทั้งสามคือของที่ "ต้องมีประจุลบ" — เยื่อหุ้มเซลล์ต้องมีหัวชอบน้ำ, DNA ต้องมีแกนประจุลบ, ATP ต้องมีฟอสเฟตที่ผลักกันเองจนแตกง่าย</div>` },

    { type: "table", rows: [
      ["มอโนเมอร์ (หน่วยย่อย)", "พอลิเมอร์", "ตัวอย่างองค์ประกอบภายในเซลล์"],
      ["นิวคลีโอไทด์", "DNA", "โครโมโซม"],
      ["กรดแอมิโน", "โปรตีน", "ไซโทสเกเลตอน"],
      ["กลูโคส", "แป้ง", "เม็ดแป้งในคลอโรพลาสต์"]
    ], detail: `<h3>1.5.3 มอโนเมอร์ → พอลิเมอร์ → โครงสร้างในเซลล์</h3>
<p>ตารางนี้คือ "แผนที่ย่อ" ของบทที่ 2 ทั้งบท — สารชีวโมเลกุลขนาดใหญ่เกือบทั้งหมดสร้างขึ้นจากหน่วยย่อยชนิดเดิมซ้ำ ๆ ต่อกันเป็นสาย</p>
<h4>ปฏิกิริยาที่ใช้สร้างและสลาย มีแค่ 2 แบบ</h4>
<p class="frm">สร้าง: มอโนเมอร์ + มอโนเมอร์ → พอลิเมอร์ + <b>H₂O</b> (คายน้ำออก)<br>สลาย: พอลิเมอร์ + <b>H₂O</b> → มอโนเมอร์ + มอโนเมอร์ (เติมน้ำเข้าไป)</p>
<div class="box why"><b>ทำไมการต่อหน่วยย่อยถึงต้องคายน้ำออกทุกครั้ง</b><br>
เพราะปลายที่จะเชื่อมกันมักเป็นหมู่ —OH กับ —H หรือ —OH กับ —OH เมื่อจะสร้างพันธะใหม่ระหว่างสองโมเลกุล ต้องดึง <b>H จากตัวหนึ่ง</b> และ <b>OH จากอีกตัวหนึ่ง</b> ออกไป ซึ่งรวมกันได้พอดีเป็น H₂O 1 โมเลกุล<br>
นี่คือเหตุผลที่ทุกปฏิกิริยาสร้างพอลิเมอร์ในบทที่ 2 — ไกลโคซิดิก เพปไทด์ เอสเทอร์ ฟอสโฟไดเอสเทอร์ — <b>คายน้ำออก 1 โมเลกุลต่อ 1 พันธะ</b> เสมอ</div>
<div class="box tip"><b>ทริคทำข้อสอบ</b> ถ้าโจทย์ถามว่า "กรดแอมิโน 5 หน่วยต่อกันเป็นสายเดียว จะได้น้ำกี่โมเลกุล" ตอบ <b>4</b> เพราะจำนวนพันธะ = จำนวนหน่วย − 1 เสมอ (สายตรงไม่แตกกิ่ง)</div>` },

    { type: "divider" },

    /* ---------------- บทที่ 2 ---------------- */
    { type: "h1", text: "บทที่ 2 · สารชีวโมเลกุล" },

    { type: "callout", html: "สารชีวโมเลกุลมี 4 กลุ่มใหญ่: <b>คาร์โบไฮเดรต · โปรตีน · ลิพิด · กรดนิวคลีอิก</b> ทุกกลุ่มใช้หลักการเดียวกันจากหัวข้อ 1.5 — ต่างกันแค่ว่าเอา “อิฐ” ชนิดไหนมาต่อ และต่อในรูปแบบใด",
      detail: `<h3>ภาพรวมสารชีวโมเลกุล 4 กลุ่ม — ด่านแรกคือดูว่ามีธาตุอะไร</h3>
<table>
<tr><th>กลุ่ม</th><th>ธาตุองค์ประกอบ</th><th>หน่วยย่อย</th><th>พันธะที่เชื่อม</th></tr>
<tr><td>คาร์โบไฮเดรต</td><td>C H O</td><td>มอโนแซ็กคาไรด์</td><td>ไกลโคซิดิก</td></tr>
<tr><td>โปรตีน</td><td>C H O <b>N</b> (บางชนิดมี <b>S</b>)</td><td>กรดแอมิโน</td><td>เพปไทด์</td></tr>
<tr><td>ลิพิด</td><td>C H O (บางชนิดมี <b>N, P</b>)</td><td>ไม่ถือเป็นพอลิเมอร์แท้</td><td>เอสเทอร์</td></tr>
<tr><td>กรดนิวคลีอิก</td><td>C H O N <b>P</b></td><td>นิวคลีโอไทด์</td><td>ฟอสโฟไดเอสเทอร์</td></tr>
</table>
<div class="box tip"><b>ทริคแยกชนิดสารใน 1 วินาที</b> เห็น <b>N</b> → โปรตีนหรือกรดนิวคลีอิก · เห็น <b>N และ P</b> ด้วยกัน → กรดนิวคลีอิก · มีแค่ <b>C H O</b> → คาร์โบไฮเดรตหรือลิพิด แล้วดูต่อว่าละลายน้ำไหม (ละลาย = คาร์โบไฮเดรต)</div>` },

    { type: "h2", text: "2.1 คาร์โบไฮเดรต — มอโนแซ็กคาไรด์" },

    { type: "p", html: "คาร์โบไฮเดรตเป็นสารอาหารหลักที่ให้พลังงาน ประกอบด้วย <b>คาร์บอน ไฮโดรเจน และออกซิเจน</b> พบทั่วไปในรูป น้ำตาล แป้ง เซลลูโลส และไกลโคเจน โดย<b>แป้งและเซลลูโลสพบในพืช</b> ส่วน<b>ไกลโคเจนพบในเซลล์ตับและกล้ามเนื้อของสัตว์</b>" },

    { type: "p", html: "แบ่งตามขนาดโมเลกุลได้ 3 กลุ่ม คือ <b>มอโนแซ็กคาไรด์ · ไดแซ็กคาไรด์ · พอลิแซ็กคาไรด์</b>" },

    { type: "code", text: "มอโนแซ็กคาไรด์  สูตรทั่วไป  CnH2nOn\n\nมีคาร์บอนตั้งแต่ 3 – 7 อะตอม\n  เพนโทส (pentose)  C 5 อะตอม  →  ไรโบส, ไรบูโลส\n  เฮ็กโซส (hexose)  C 6 อะตอม  →  กลูโคส, ฟรักโทส, กาแล็กโทส\n\nเพนโทสและเฮ็กโซสเป็นมอโนแซ็กคาไรด์ที่พบมากที่สุดในธรรมชาติ",
      detail: `<h3>2.1.1 มอโนแซ็กคาไรด์ — อิฐก้อนเดียวของคาร์โบไฮเดรตทั้งหมด</h3>
` + SVG_MONOSAC + `
<p>มอโนแซ็กคาไรด์เป็นคาร์โบไฮเดรตที่มี<b>ขนาดโมเลกุลเล็กที่สุด มีรสหวาน และละลายน้ำได้</b> จำนวนคาร์บอนอยู่ระหว่าง <b>3 ถึง 7 อะตอม</b></p>
<h4>แบ่งตามหมู่คาร์บอนิล — จุดที่ออกสอบ</h4>
<table>
<tr><th>ประเภท</th><th>หมู่คาร์บอนิลอยู่ที่</th><th>ได้แก่</th></tr>
<tr><td>กลุ่ม<b>อัลดีไฮด์</b></td><td>ปลายสาย</td><td><b>ไรโบส · กลูโคส · กาแล็กโทส</b></td></tr>
<tr><td>กลุ่ม<b>คีโตน</b></td><td>กลางสาย</td><td><b>ไรบูโลส · ฟรักโทส</b></td></tr>
</table>
<p>นอกจากหมู่คาร์บอนิลแล้ว มอโนแซ็กคาไรด์ยังมี<b>หมู่ไฮดรอกซิล (—OH) หลายหมู่</b> ซึ่งเป็นเหตุผลที่ละลายน้ำได้ดี</p>
<h4>การนับตำแหน่งคาร์บอน</h4>
<p>เอกสารระบุว่าให้<b>เริ่มนับจากปลายด้านที่ใกล้กับหมู่คาร์บอนิลเป็นหลัก</b> ดังนั้น</p>
<ul>
<li><b>กลูโคส</b> หมู่อัลดีไฮด์อยู่ที่ <b>C1</b> → เมื่อปิดวงจะได้วง<b>6 เหลี่ยม</b></li>
<li><b>ฟรักโทส</b> หมู่คีโตนอยู่ที่ <b>C2</b> → เมื่อปิดวงจะได้วง<b>5 เหลี่ยม</b></li>
</ul>
<div class="box why"><b>ทำไมมอโนแซ็กคาไรด์ส่วนใหญ่อยู่ในรูปวง</b><br>
เพราะสายเปิดยาวพอที่ปลายหมู่ —OH จะม้วนกลับมาทำปฏิกิริยากับหมู่คาร์บอนิลของตัวเองได้ เกิดเป็นโครงสร้างวงซึ่ง<b>เสถียรกว่า</b> ในสารละลายจึงพบรูปวงเป็นส่วนใหญ่ โดยสายเปิดกับสายวงเปลี่ยนกลับไปกลับมาได้ตลอด</div>
<div class="box warn"><b>ระวัง</b> "เพนโทส = วง 5 เหลี่ยม" ไม่จริงเสมอไป — เพนโทสหมายถึงมี<b>คาร์บอน 5 อะตอม</b> ส่วนขนาดวงขึ้นกับตำแหน่งหมู่คาร์บอนิล ฟรักโทสมีคาร์บอน 6 อะตอม (เฮ็กโซส) แต่ปิดวงได้เป็นวง 5 เหลี่ยม</div>` },

    { type: "h2", text: "2.2 ไดแซ็กคาไรด์และพันธะไกลโคซิดิก" },

    { type: "p", html: "ไดแซ็กคาไรด์ประกอบด้วยมอโนแซ็กคาไรด์ <b>2 โมเลกุล</b> เชื่อมกันด้วยพันธะโคเวเลนต์ที่เรียกว่า <b>พันธะไกลโคซิดิก (glycosidic bond)</b> โดยคายน้ำออก 1 โมเลกุลทุกครั้ง" },

    { type: "table", rows: [
      ["ไดแซ็กคาไรด์", "ประกอบด้วย", "ชนิดพันธะไกลโคซิดิก", "แหล่งที่พบ"],
      ["ซูโครส (sucrose)", "กลูโคส + <b>ฟรักโทส</b>", "<b>α-1,2</b>", "อ้อย มะพร้าว ตาล ผลไม้"],
      ["มอลโทส (maltose)", "กลูโคส + กลูโคส", "<b>α-1,4</b>", "ข้าวมอลต์ เมล็ดธัญพืชงอก"],
      ["แล็กโทส (lactose)", "<b>กาแล็กโทส</b> + กลูโคส", "<b>β-1,4</b>", "น้ำนม"]
    ], detail: `<h3>2.2 ตารางไดแซ็กคาไรด์ — จำให้ได้ทั้ง 3 แถว</h3>
` + SVG_GLYCOSIDIC + `
<p>นี่คือตารางที่<b>ออกข้อสอบบ่อยที่สุด</b>ของบทสารชีวโมเลกุล เพราะตอบได้ต้องรู้ครบทั้งสามช่อง: ประกอบด้วยอะไร · พันธะแบบไหน · พบที่ไหน</p>
<h4>วิธีจำที่ไม่ต้องท่อง</h4>
<ul>
<li><b>ซูโครส = ซู(กลู)โคส + ฟรักโทส</b> เป็นตัวเดียวที่มีฟรักโทส และเป็นตัวเดียวที่เป็น <b>1,2</b> — เพราะฟรักโทสมีหมู่คาร์บอนิลที่ C2 จึงต้องเชื่อมที่ตำแหน่ง 2</li>
<li><b>มอลโทส = กลูโคส 2 ตัว</b> แบบ <b>α-1,4</b> ซึ่งเป็นพันธะแบบเดียวกับที่ใช้ต่อสายในแป้ง — สมเหตุสมผล เพราะมอลโทสได้จากการย่อยแป้ง</li>
<li><b>แล็กโทส = กาแล็กโทส + กลูโคส</b> เป็นตัวเดียวที่เป็น <b>β</b> — จำว่า "นม (Lactose) เป็นเบต้า"</li>
</ul>
<div class="box why"><b>เลข 1,2 / 1,4 / 1,6 หมายความว่าอะไร</b><br>
หมายถึง<b>คาร์บอนตำแหน่งใดเชื่อมกับคาร์บอนตำแหน่งใด</b> เช่น α-1,2 คือ C ตำแหน่งที่ 1 ของกลูโคส เชื่อมกับ C ตำแหน่งที่ 2 ของฟรักโทส<br>
ส่วน α หรือ β บอกว่า<b>หมู่ —OH ที่คาร์บอนตำแหน่งที่ 1 ของกลูโคสชี้ไปทางไหน</b> — ถ้าอยู่<b>ด้านล่าง</b>ระนาบเรียก <b>α กลูโคส</b> ถ้าอยู่<b>เหนือ</b>ระนาบเรียก <b>β กลูโคส</b></div>
<div class="box tip"><b>เกร็ดจากเอกสาร</b> มอลโทสพบใน<b>มอลต์ (malt)</b> ซึ่งได้จากการนำเมล็ดธัญพืช (ส่วนใหญ่เป็นข้าว) มาแช่น้ำให้งอก ระหว่างงอกเมล็ดจะสร้างเอนไซม์ <b>อะไมเลส</b> มาย่อยแป้งให้เป็นมอลโทสและกลูโคส จากนั้นให้ความร้อนเพื่อหยุดการงอก</div>
<div class="box warn"><b>จุดพลาดคลาสสิก</b> อย่าตอบว่าแล็กโทสคือ "กลูโคส + กลูโคส" — นั่นคือมอลโทส และอย่าตอบว่าซูโครสเป็น α-1,4 — นั่นคือมอลโทสเช่นกัน ถ้าจำได้แค่อันเดียว ให้จำ <b>ซูโครส α-1,2</b> ไว้ก่อน เพราะเป็นตัวที่โผล่ในบทที่ 3 (เอนไซม์ซูเครส) ด้วย</div>` },

    { type: "h2", text: "2.3 พอลิแซ็กคาไรด์" },

    { type: "p", html: "พอลิแซ็กคาไรด์เกิดจากมอโนแซ็กคาไรด์<b>หลายโมเลกุล</b>เชื่อมต่อกันเป็นสายยาว ความแตกต่างระหว่างแต่ละชนิดอยู่ที่ <b>ชนิด จำนวน และรูปแบบการเชื่อมต่อ</b> ของหน่วยย่อย" },

    { type: "table", rows: [
      ["พอลิแซ็กคาไรด์", "พันธะ", "โครงสร้าง", "สมบัติ / แหล่งที่พบ"],
      ["อะไมโลส (amylose)", "α-1,4", "สายยาวตรง <b>ไม่แตกแขนง</b> ขดเป็นเกลียว", "ละลายน้ำ<b>ได้ไม่ดี</b> · ไอโอดีนให้<b>สีน้ำเงิน</b>"],
      ["อะไมโลเพกทิน (amylopectin)", "α-1,4 (สายหลัก) + <b>α-1,6</b> (จุดแตกแขนง)", "สายยาว<b>มีการแตกแขนง</b>", "ละลายน้ำ<b>ดีกว่าอะไมโลส</b> · ไอโอดีนให้<b>สีม่วงแดง</b> · สุกแล้วใสและเหนียว"],
      ["ไกลโคเจน (glycogen)", "α-1,4 + α-1,6", "คล้ายอะไมโลเพกทิน แต่<b>แตกแขนงมากกว่า</b>", "สะสมใน<b>ตับและกล้ามเนื้อ</b>ของสัตว์"],
      ["เซลลูโลส (cellulose)", "<b>β-1,4</b>", "สายตรง แต่ละสายยึดกันด้วย<b>พันธะไฮโดรเจน</b>เป็นมัดเส้นใย", "<b>ไม่ละลายน้ำ</b> แต่ดูดซับน้ำได้ · โครงสร้างหลักของผนังเซลล์พืช"]
    ], detail: `<h3>2.3 พอลิแซ็กคาไรด์ — อิฐก้อนเดียวกัน ต่อคนละแบบ ได้ของคนละอย่าง</h3>
` + SVG_POLYSAC + `
<p><b>แป้ง (starch)</b> ประกอบด้วยโมเลกุล 2 แบบ คือ <b>อะไมโลส</b> กับ <b>อะไมโลเพกทิน</b> ทั้งคู่เป็นพอลิเมอร์ของกลูโคส</p>
<h4>ทำไมพันธะ α กับ β ถึงเปลี่ยนทุกอย่าง</h4>
<div class="box why">
อะไมโลสกับเซลลูโลสต่างกันแค่จุดเดียว — <b>α-1,4 กับ β-1,4</b> — แต่ได้ของคนละชนิดสิ้นเชิง<br>
พันธะ <b>α</b> ทำให้สาย<b>ขดเป็นเกลียว</b> จึงมีช่องให้น้ำและเอนไซม์เข้าถึง ย่อยได้ง่าย<br>
พันธะ <b>β</b> ทำให้กลูโคสสลับหัวกลับหางไปมา สายจึง<b>เหยียดตรง</b> เรียงชิดกันแล้วยึดด้วยพันธะไฮโดรเจนเป็นมัดแน่น น้ำและเอนไซม์แทรกเข้าไม่ได้ จึงแข็งแรงและย่อยยาก — เหมาะเป็นโครงสร้าง ไม่ใช่แหล่งพลังงาน</div>
<h4>เซลลูโลสกับมนุษย์</h4>
<p>เซลลูโลสเป็น<b>สารประกอบคาร์บอนจากสิ่งมีชีวิตที่มีมากที่สุดในโลก</b> มนุษย์ได้รับจากผักผลไม้ แต่<b>ย่อยไม่ได้เพราะร่างกายไม่มีเอนไซม์สำหรับย่อยเซลลูโลส</b> จึงเหลือเป็น<b>กากใยอาหาร</b> ช่วยเพิ่มปริมาณกากในอุจจาระ ทำให้ขับถ่ายสะดวก และ<b>ลดความเสี่ยงต่อการเป็นโรคมะเร็งลำไส้ใหญ่</b></p>
<h4>พอลิแซ็กคาไรด์ชนิดอื่นที่เอกสารระบุ</h4>
<table>
<tr><th>ชนิด</th><th>พบที่</th></tr>
<tr><td><b>ไคทิน (chitin)</b></td><td>เปลือกของ <b>กุ้ง ปู แมลง</b></td></tr>
<tr><td><b>เพกทิน (pectin)</b></td><td>ผนังเซลล์พืช เช่น ด้านในเปลือกผลส้มโอ</td></tr>
<tr><td><b>เพปทิโดไกลแคน (peptidoglycan)</b></td><td><b>ผนังเซลล์ของแบคทีเรีย</b> (มีสายเพปไทด์เป็นส่วนประกอบด้วย)</td></tr>
</table>
<div class="box tip"><b>ทริคจำสีไอโอดีน</b> <b>อะไมโลส → น้ำเงิน</b> (สายตรงขดเป็นเกลียวยาว ไอโอดีนแทรกเข้าไปในเกลียวได้ดี) · <b>อะไมโลเพกทิน → ม่วงแดง</b> (แตกแขนง เกลียวสั้นกว่า สีจึงอ่อนลง)</div>
<div class="box warn"><b>ระวัง</b> "ไกลโคเจนสะสมในตับและกล้ามเนื้อ" — ไม่ใช่ "ในตับเท่านั้น" และไกลโคเจน<b>แตกแขนงมากกว่า</b>อะไมโลเพกทิน ไม่ใช่เท่ากัน<br>
เหตุผลเชิงกลไก: ยิ่งแตกแขนงมาก ยิ่งมี<b>ปลายสายให้เอนไซม์เข้าตัดพร้อมกันหลายจุด</b> สัตว์จึงระดมกลูโคสออกมาใช้ได้เร็วกว่าพืช ซึ่งเหมาะกับสัตว์ที่ต้องวิ่งหนีทันที</div>` },

    { type: "bullet", html: "แป้งเป็นพอลิแซ็กคาไรด์ที่พืชเก็บสะสมไว้ตามส่วนต่าง ๆ เช่น <b>เมล็ดข้าว ลำต้นสาคู รากมันสำปะหลัง รากเท้ายายม่อม</b>" },

    { type: "h2", text: "2.4 โปรตีน — กรดแอมิโนและพันธะเพปไทด์" },

    { type: "p", html: "โปรตีนเป็นสารโมเลกุลขนาดใหญ่ที่ประกอบด้วย<b>กรดแอมิโน</b>มาเชื่อมต่อกัน ธาตุหลักคือ <b>C H O N</b> และโปรตีนบางชนิดมี <b>กำมะถัน (S)</b> ด้วย" },

    { type: "code", text: "โครงสร้างทั่วไปของกรดแอมิโน (ทุกชนิดหน้าตาแบบนี้)\n\n              H\n              |\n       H2N —  C  — COOH\n              |\n              R\n\n  หมู่แอมิโน  (-NH2)   เชื่อมกับคาร์บอนอะตอมเดียวกัน\n  หมู่คาร์บอกซิล (-COOH)  เชื่อมกับคาร์บอนอะตอมเดียวกัน\n  หมู่ R                  ส่วนเดียวที่ต่างกันระหว่าง 20 ชนิด\n\n  ตัวอย่างหมู่ R\n    ไกลซีน (Glycine)   R = -H\n    อะลานีน (Alanine)  R = -CH3\n    ซิสเทอีน (Cysteine) R = -CH2-SH   (มีกำมะถัน)",
      detail: `<h3>2.4.1 กรดแอมิโนและพันธะเพปไทด์</h3>
` + SVG_AMINO + `
<p>กรดแอมิโนทุกชนิดมีส่วนที่เหมือนกัน 3 อย่าง คือ<b>อะตอมไฮโดรเจน หมู่แอมิโน (—NH₂) และหมู่คาร์บอกซิล (—COOH)</b> ซึ่งเชื่อมอยู่กับ<b>คาร์บอนอะตอมเดียวกัน</b> ส่วนที่ต่างกันคือ<b>หมู่ R</b></p>
<p>สิ่งมีชีวิตสังเคราะห์โปรตีนจากกรดแอมิโน <b>20 ชนิด</b></p>
<table>
<tr><th>ประเภท</th><th>ความหมาย</th></tr>
<tr><td><b>กรดแอมิโนจำเป็น</b> (essential amino acid)</td><td>ร่างกาย<b>สังเคราะห์เองไม่ได้</b> ต้องได้รับจากอาหาร</td></tr>
<tr><td><b>กรดแอมิโนไม่จำเป็น</b> (non-essential amino acid)</td><td>ร่างกาย<b>สังเคราะห์ได้เอง</b></td></tr>
</table>
<h4>พันธะเพปไทด์เกิดอย่างไร</h4>
<p class="frm">หมู่คาร์บอกซิล (—COOH) ของตัวหนึ่ง + หมู่แอมิโน (—NH₂) ของอีกตัวหนึ่ง → <b>พันธะเพปไทด์</b> + H₂O</p>
<p>พันธะเพปไทด์เป็น<b>พันธะโคเวเลนต์</b> และเรียกชื่อผลิตภัณฑ์ตามจำนวนหน่วย</p>
<ul>
<li>กรดแอมิโน <b>2</b> หน่วย → <b>ไดเพปไทด์</b> (คายน้ำ 1 โมเลกุล)</li>
<li>กรดแอมิโน <b>3</b> หน่วย → <b>ไตรเพปไทด์</b> (คายน้ำ 2 โมเลกุล)</li>
<li>กรดแอมิโน<b>จำนวนมาก</b> → <b>พอลิเพปไทด์</b></li>
</ul>
<div class="box why"><b>ทำไมกรดแอมิโนแค่ 20 ชนิดถึงสร้างโปรตีนได้หลากหลายมหาศาล</b><br>
เพราะความหลากหลายมาจาก<b>ลำดับ</b> ไม่ใช่จำนวนชนิด สายยาว 100 หน่วยจากตัวเลือก 20 ชนิด มีลำดับที่เป็นไปได้ 20<sup>100</sup> แบบ ซึ่งมากกว่าจำนวนอะตอมในเอกภพ — เหมือนตัวอักษรไทย 44 ตัวสร้างคำได้ไม่จำกัด</div>
<div class="box warn"><b>ระวัง</b> "กรดแอมิโนจำเป็น" ไม่ได้แปลว่า "สำคัญกว่า" — แปลว่า<b>จำเป็นต้องกิน</b> เพราะร่างกายสร้างเองไม่ได้ ส่วนกรดแอมิโนไม่จำเป็นก็สำคัญเท่ากัน เพียงแต่ร่างกายสร้างเองได้</div>` },

    { type: "h2", text: "2.5 โครงสร้างโปรตีน 4 ระดับ และหน้าที่ของโปรตีน" },

    { type: "table", rows: [
      ["ระดับโครงสร้าง", "คืออะไร", "ยึดด้วยอะไร"],
      ["ปฐมภูมิ (primary)", "กรดแอมิโนเรียงต่อกันเป็นสายพอลิเพปไทด์ 1 สาย โปรตีนแต่ละชนิดมี<b>จำนวนและลำดับกรดแอมิโนที่จำเพาะ</b>", "พันธะเพปไทด์"],
      ["ทุติยภูมิ (secondary)", "สายพอลิเพปไทด์<b>บิดเป็นเกลียวหรือเป็นแผ่น</b>", "<b>พันธะไฮโดรเจน</b>"],
      ["ตติยภูมิ (tertiary)", "โครงสร้างทุติยภูมิ<b>พับม้วนเข้าหากันเป็นรูปทรงสามมิติ</b>", "แรงไฮโดรโฟบิก · พันธะไฮโดรเจน · พันธะไอออนิก"],
      ["จตุรภูมิ (quaternary)", "พอลิเพปไทด์<b>มากกว่า 1 สาย</b>มารวมกัน อาจเป็นชนิดเดียวกันหรือต่างชนิด", "แรงยึดเหนี่ยวแบบเดียวกับตติยภูมิ เช่น <b>ฮีโมโกลบินมี 4 สาย</b>"]
    ], detail: `<h3>2.5.1 โครงสร้างโปรตีน 4 ระดับ</h3>
<p>โปรตีนส่วนใหญ่ที่ทำหน้าที่ได้ในสิ่งมีชีวิต เป็นสายพอลิเพปไทด์ที่<b>พับม้วนเป็นโครงสร้างสามมิติ</b>ซึ่งเหมาะสมกับการทำงาน</p>
<div class="box why"><b>ทำไมลำดับ (ปฐมภูมิ) ถึงเป็นตัวกำหนดทุกระดับที่เหลือ</b><br>
เพราะหมู่ R ของแต่ละตำแหน่งเป็นตัวตัดสินว่าจุดนั้นจะดึงกันหรือผลักกัน ชอบน้ำหรือหนีน้ำ<br>
เมื่อลำดับถูกกำหนดแล้ว สายจะพับม้วนตาม "แรง" เหล่านั้นไปเองจนได้รูปทรงเดียวที่เสถียรที่สุด<br>
ดังนั้น<b>เปลี่ยนกรดแอมิโนเพียงตำแหน่งเดียว อาจทำให้โปรตีนทั้งโมเลกุลพับผิดรูปและทำงานไม่ได้</b></div>
<h4>เกลียวและแผ่นในระดับทุติยภูมิ</h4>
<p>เอกสารสรุปท้ายบทระบุสองแบบไว้ชัดเจน คือ <b>α-helix</b> (เกลียว มี 3.6 กรดแอมิโนต่อรอบ) และ <b>β-sheet</b> (แผ่นพับ) ทั้งสองยึดด้วย<b>พันธะไฮโดรเจน</b></p>
<h4>การเสียสภาพของโปรตีน (denaturation)</h4>
<p>เมื่อได้รับความร้อน โครงสร้างสามมิติจะ<b>คลายออก</b> จนทำงานไม่ได้ เช่น ไข่ขาวที่ใสเปลี่ยนเป็นขาวขุ่นและแข็งตัว</p>
<div class="box warn"><b>จุดที่คนพลาด</b> การเสียสภาพทำลาย<b>เฉพาะพันธะอ่อน</b>ที่ยึดโครงสร้างทุติยภูมิ ตติยภูมิ และจตุรภูมิ — <b>พันธะเพปไทด์ยังอยู่ครบ</b> ลำดับกรดแอมิโน (โครงสร้างปฐมภูมิ) จึงไม่เปลี่ยน<br>
นั่นคือเหตุผลที่ไข่ต้มแล้ว "ยังเป็นโปรตีนอยู่" และยังให้สารอาหารได้ เพียงแต่ถ้าโปรตีนนั้นเป็นเอนไซม์ก็จะเร่งปฏิกิริยาไม่ได้อีก</div>` },

    { type: "table", rows: [
      ["ประเภทของโปรตีน", "หน้าที่ / ตัวอย่างตามเอกสาร"],
      ["โปรตีนลำเลียง (transport protein)", "ลำเลียงสาร เช่น <b>โปรตีนช่อง (channel protein)</b> ที่เยื่อหุ้มเซลล์"],
      ["เอนไซม์ (enzyme)", "เร่งปฏิกิริยาเคมีในเซลล์ เช่น <b>แลกเทส</b> ย่อยแล็กโทสในน้ำนม · <b>ดีเอ็นเอพอลิเมอเรส</b> ช่วยสร้าง DNA"],
      ["โปรตีนโครงสร้าง (structural protein)", "<b>ไฟโบรอิน</b> ในเส้นไหมและใยแมงมุม · <b>อีลาสติน</b> ในเอ็นยึดกระดูก · <b>คอลลาเจน</b> ในเนื้อเยื่อเกี่ยวพัน · <b>แอกทิน</b> ในกล้ามเนื้อ · <b>เคราติน</b> ในผม ขน เล็บ เกล็ดปลา เขาสัตว์"],
      ["โปรตีนสะสม (storage protein)", "<b>เคซีน</b> ในน้ำนมมารดา · <b>ไวเทลลิน</b> ในไข่แดง ช่วยการเจริญของเอ็มบริโอ"],
      ["โปรตีนภูมิคุ้มกัน (defense protein)", "<b>แอนติบอดี</b> · <b>ไลโซไซม์</b> ในน้ำตา"],
      ["โปรตีนตัวรับ (receptor protein)", "ตอบสนองต่อสารเคมีที่มากระตุ้น เช่น ตัวรับสารสื่อประสาทที่เยื่อหุ้มเซลล์ประสาท"]
    ], detail: `<h3>2.5.2 หน้าที่ของโปรตีน — ทำไมโปรตีนถึงทำได้แทบทุกอย่าง</h3>
<div class="box why"><b>เหตุผลเดียวที่อธิบายทั้งตาราง</b><br>
เพราะโปรตีนเป็นสารชีวโมเลกุลกลุ่มเดียวที่<b>ควบคุมรูปร่างสามมิติได้ละเอียดระดับอะตอม</b> ผ่านลำดับกรดแอมิโน 20 ชนิด<br>
อยากได้เส้นใยเหนียว ๆ ก็เรียงหมู่ R ให้สายเกาะกันเป็นมัด (เคราติน คอลลาเจน)<br>
อยากได้หลุมที่รับเฉพาะโมเลกุลหนึ่ง ก็พับเป็นกระเป๋าที่รูปร่างพอดีกับโมเลกุลนั้น (เอนไซม์ ตัวรับ แอนติบอดี)<br>
คาร์โบไฮเดรตกับลิพิดทำแบบนี้ไม่ได้ เพราะหน่วยย่อยของมันซ้ำ ๆ กันเกินไป</div>
<h4>ไกลโคโปรตีน</h4>
<p>โปรตีนที่มี<b>คาร์โบไฮเดรตสายสั้น ๆ</b>เป็นส่วนประกอบเรียกว่า <b>ไกลโคโปรตีน (glycoprotein)</b> เช่น โปรตีนที่เยื่อหุ้มเซลล์ ทำหน้าที่เกี่ยวกับ<b>การจดจำของเซลล์</b></p>
<div class="box tip"><b>ทริคจำโปรตีนโครงสร้าง 5 ตัว</b> ไล่จากนอกเข้าใน: <b>เคราติน</b> (ผม เล็บ — นอกสุด) → <b>คอลลาเจน</b> (เนื้อเยื่อเกี่ยวพัน) → <b>อีลาสติน</b> (เอ็น) → <b>แอกทิน</b> (กล้ามเนื้อ) → <b>ไฟโบรอิน</b> (ไหม ใยแมงมุม — ของที่สัตว์สร้างออกมาข้างนอก)</div>
<div class="box warn"><b>ระวัง</b> <b>ไลโซไซม์</b> จัดเป็นโปรตีนภูมิคุ้มกัน (ในน้ำตา) และในบทที่ 3 มันยัง<b>เป็นเอนไซม์</b>ที่ใช้เป็นตัวอย่างของ induced fit ด้วย — เป็นได้ทั้งสองอย่าง ไม่ขัดกัน เพราะมันฆ่าแบคทีเรียโดยการ<b>ย่อยเพปทิโดไกลแคน</b>ที่ผนังเซลล์</div>` },

    { type: "h2", text: "2.6 ลิพิด" },

    { type: "p", html: "ลิพิดเป็นสารที่<b>ละลายได้ดีในตัวทำละลายที่ไม่มีขั้ว</b> เช่น อีเทอร์ เบนซีน คลอโรฟอร์ม และเอทานอล ธาตุหลักคือ <b>C H O</b> และลิพิดบางชนิดมี <b>N และ P</b> ด้วย" },

    { type: "bullet", html: "เป็นองค์ประกอบของ<b>เยื่อหุ้มเซลล์</b>" },
    { type: "bullet", html: "ให้พลังงาน โดย<b>ให้พลังงานมากกว่าคาร์โบไฮเดรตและโปรตีนที่มีน้ำหนักเท่ากัน</b>" },
    { type: "bullet", html: "ป้องกันการสูญเสียน้ำ · เป็นฉนวนควบคุมอุณหภูมิ · ป้องกันการกระทบกระแทกของอวัยวะภายใน" },
    { type: "bullet", html: "เป็นตัวทำละลายของวิตามิน <b>A D E K</b>" },

    { type: "table", rows: [
      ["กลุ่มลิพิด", "โครงสร้างเด่น", "หน้าที่ / ตัวอย่าง"],
      ["1. กรดไขมัน (fatty acid)", "สายไฮโดรคาร์บอนที่มี<b>หมู่คาร์บอกซิล</b>อยู่ปลายด้านหนึ่ง", "หน่วยย่อยของลิพิดชนิดอื่น"],
      ["2. ไตรกลีเซอไรด์ (triglyceride)", "กลีเซอรอล 1 + กรดไขมัน <b>3</b> โมเลกุล", "<b>ลิพิดที่พบมากที่สุดในพืชและสัตว์</b> · สะสมพลังงาน"],
      ["3. ฟอสโฟลิพิด (phospholipid)", "กลีเซอรอล 1 + กรดไขมัน <b>2</b> + หมู่ฟอสเฟต 1 (ต่อกับหมู่ R)", "<b>องค์ประกอบหลักของเยื่อหุ้มเซลล์</b>"],
      ["4. สเตอรอยด์ (steroid)", "วงคาร์บอน 6 อะตอม <b>3 วง</b> + วงคาร์บอน 5 อะตอม <b>1 วง</b>", "คอเลสเตอรอล · อีสโทรเจน · เทสโทสเทอโรน"]
    ], detail: `<h3>2.6.1 ลิพิด 4 กลุ่มที่ต้องรู้</h3>
` + SVG_FATTYACID + `
` + SVG_TRIGLY + `
` + SVG_PHOSPHOLIPID + `
` + SVG_STEROID + `
` + SVG_BILAYER + `
<h4>กรดไขมันอิ่มตัว เทียบกับ ไม่อิ่มตัว</h4>
<table>
<tr><th></th><th>กรดไขมันอิ่มตัว</th><th>กรดไขมันไม่อิ่มตัว</th></tr>
<tr><td>พันธะระหว่าง C</td><td><b>พันธะเดี่ยวทั้งหมด</b></td><td><b>มีบางพันธะเป็นพันธะคู่</b></td></tr>
<tr><td>รูปร่างสาย</td><td>ตรง เรียงชิดกันได้</td><td>หักงอตรงตำแหน่งพันธะคู่</td></tr>
<tr><td>แหล่งที่พบ</td><td>ไขมันสัตว์ เนย · น้ำมันมะพร้าว น้ำมันปาล์ม</td><td>น้ำมันข้าวโพด ถั่วเหลือง ทานตะวัน งา</td></tr>
<tr><td>การแข็งตัว</td><td>แข็งตัวที่อุณหภูมิห้องได้ง่ายกว่า</td><td><b>แข็งตัวที่อุณหภูมิห้องได้ยากกว่า</b></td></tr>
</table>
<div class="box why"><b>ทำไมพันธะคู่ถึงทำให้ไม่แข็งตัว</b><br>
พันธะคู่ทำให้สายไฮโดรคาร์บอน<b>หักงอ</b> โมเลกุลจึงเรียงชิดกันไม่ได้ แรงยึดเหนี่ยวระหว่างโมเลกุลน้อยลง ต้องใช้อุณหภูมิต่ำกว่าจึงจะแข็งตัว — ดังนั้นน้ำมันพืชเป็นของเหลวที่อุณหภูมิห้อง ส่วนไขมันสัตว์เป็นก้อน</div>
<h4>กลีเซอไรด์ — นับตามจำนวนกรดไขมัน</h4>
<table>
<tr><th>จำนวนกรดไขมันที่ต่อกับกลีเซอรอล</th><th>เรียกว่า</th></tr>
<tr><td>1 โมเลกุล</td><td>มอโนกลีเซอไรด์</td></tr>
<tr><td>2 โมเลกุล</td><td>ไดกลีเซอไรด์</td></tr>
<tr><td>3 โมเลกุล</td><td><b>ไตรกลีเซอไรด์</b></td></tr>
</table>
<p class="frm">กลีเซอรอล + กรดไขมัน 3 โมเลกุล → ไตรกลีเซอไรด์ + <b>H₂O 3 โมเลกุล</b></p>
<ul>
<li>กลีเซอไรด์ที่เป็น<b>ของแข็ง</b>ที่อุณหภูมิห้อง เรียกว่า <b>ไขมัน (fat)</b></li>
<li>กลีเซอไรด์ที่เป็น<b>ของเหลว</b>ที่อุณหภูมิห้อง เรียกว่า <b>น้ำมัน (oil)</b></li>
</ul>
<div class="box warn"><b>ตัวเลขที่ต้องแยกให้ขาด</b> <b>ไตรกลีเซอไรด์ = กรดไขมัน 3</b> · <b>ฟอสโฟลิพิด = กรดไขมัน 2 + ฟอสเฟต 1</b><br>
นี่คือจุดที่ข้อสอบชอบสลับกัน — จำว่าฟอสโฟลิพิดต้องเหลือที่ว่างไว้ 1 ตำแหน่งให้หมู่ฟอสเฟต จึงมีกรดไขมันได้แค่ 2</div>` },

    { type: "p", html: "ฟอสโฟลิพิดมี<b>ปลายด้านหนึ่งเป็นไฮโดรโฟบิก</b> (ส่วนกรดไขมัน) และ<b>อีกด้านเป็นไฮโดรฟิลิก</b> (หมู่ฟอสเฟตกับหมู่ R) เยื่อหุ้มเซลล์จึงประกอบด้วย<b>ฟอสโฟลิพิด 2 ชั้น ที่หันส่วนไฮโดรโฟบิกเข้าหากัน</b>",
      detail: `<h3>2.6.2 ทำไมฟอสโฟลิพิดถึงเหมาะเป็นเยื่อหุ้มเซลล์ที่สุด</h3>
` + SVG_BILAYER + `
<div class="box why"><b>เหตุผลเชิงกลไก</b><br>
ทั้งข้างในและข้างนอกเซลล์เต็มไปด้วยน้ำ ส่วนหัวที่<b>ชอบน้ำ</b>จึงหันออกทั้งสองด้านไปหาน้ำ ส่วนหางที่<b>หนีน้ำ</b>ถูกน้ำบีบให้มาซุกกันอยู่ตรงกลาง<br>
ผลคือเยื่อสองชั้นนี้<b>จัดตัวเองได้เอง</b>โดยไม่ต้องมีอะไรมาบังคับ และถ้าถูกเจาะรู มันก็ปิดกลับเองเพราะหางไม่ยอมสัมผัสน้ำ — เยื่อหุ้มเซลล์จึงทั้งยืดหยุ่นและซ่อมตัวเองได้</div>
<h4>ลิพิดชนิดอื่นที่เอกสารระบุ</h4>
<table>
<tr><th>ชนิด</th><th>สมบัติ / ที่พบ</th></tr>
<tr><td><b>ไข (wax)</b></td><td>เป็นของแข็ง <b>ไม่ละลายน้ำ</b> หล่อลื่นหรือป้องกันการสูญเสียน้ำ พบใน<b>ขี้ผึ้ง ผิวใบไม้ ผลไม้บางชนิด ขนนก ขนเป็ด</b></td></tr>
<tr><td><b>ไกลโคลิพิด (glycolipid)</b></td><td>ลิพิดที่มีคาร์โบไฮเดรตต่ออยู่ เป็นส่วนประกอบของเยื่อหุ้มเซลล์ พบมากใน<b>เยื่อหุ้มเซลล์ประสาท</b></td></tr>
</table>
<h4>สเตอรอยด์ คอเลสเตอรอล และ HDL / LDL</h4>
<p><b>คอเลสเตอรอล</b>เป็นองค์ประกอบของเยื่อหุ้มเซลล์ และเป็น<b>สารตั้งต้นในการสังเคราะห์สเตอรอยด์ชนิดอื่น</b> เช่น <b>อีสโทรเจน</b> และ <b>เทสโทสเทอโรน</b></p>
<table>
<tr><th></th><th>LDL</th><th>HDL</th></tr>
<tr><td>ชื่อเต็ม</td><td>low-density lipoproteins</td><td>high-density lipoproteins</td></tr>
<tr><td>เกิดจากการกิน</td><td>กรดไขมัน<b>อิ่มตัว</b>หรือคอเลสเตอรอลเกินความต้องการ</td><td>กรดไขมัน<b>ไม่อิ่มตัว</b></td></tr>
<tr><td>ทำอะไร</td><td>สะสมที่<b>ผนังหลอดเลือด</b> ทำให้หลอดเลือดแข็งตัวหรือตีบ</td><td>นำคอเลสเตอรอลส่วนเกินไป<b>ทำลายที่ตับ</b> และป้องกันการสะสมของ LDL</td></tr>
</table>
<div class="box warn"><b>ผลที่ตามมา</b> การสะสมของ LDL ทำให้หลอดเลือดแข็งตัวหรืออุดตัน อาจก่อให้เกิด<b>ภาวะหัวใจขาดเลือด หรือหลอดเลือดในสมองตีบ ทำให้เสียชีวิตได้</b> — ประโยคนี้อยู่ในเอกสารตรง ๆ</div>` },

    { type: "h2", text: "2.7 กรดนิวคลีอิก" },

    { type: "p", html: "<b>กรดนิวคลีอิก (nucleic acid)</b> เป็นสารโมเลกุลขนาดใหญ่ ทำหน้าที่เป็น<b>ข้อมูลทางพันธุกรรม</b>ที่ถ่ายทอดจากรุ่นสู่รุ่น และ<b>ควบคุมการสังเคราะห์โปรตีน</b> มี 2 ชนิดคือ <b>DNA</b> และ <b>RNA</b>" },

    { type: "code", text: "นิวคลีโอไทด์ 1 หน่วย = 3 ส่วนต่อกัน\n\n  (1) น้ำตาลเพนโทส (คาร์บอน 5 อะตอม)\n        RNA  ใช้  ไรโบส (ribose)        → C ตำแหน่งที่ 2 มีหมู่ -OH\n        DNA  ใช้  ดีออกซีไรโบส (deoxyribose) → C ตำแหน่งที่ 2 ไม่มีหมู่ -OH\n\n  (2) ไนโตรจีนัสเบส\n\n  (3) หมู่ฟอสเฟต\n\nนิวคลีโอไทด์ต่อกันด้วย พันธะฟอสโฟไดเอสเทอร์\n  หมู่ -OH ที่ C ตำแหน่ง 3' ของตัวหนึ่ง\n  + หมู่ฟอสเฟตที่ C ตำแหน่ง 5' ของตัวถัดไป\n  → ได้สายพอลินิวคลีโอไทด์ ที่มีปลาย 5' และปลาย 3'",
      detail: `<h3>2.7.1 นิวคลีโอไทด์ — หน่วยย่อยที่มี 3 ชิ้นส่วน</h3>
` + SVG_NUCLEOTIDE + `
<table>
<tr><th>เบส</th><th>ตัวย่อ</th><th>พบใน</th></tr>
<tr><td>กวานีน (guanine)</td><td>G</td><td>ทั้ง DNA และ RNA</td></tr>
<tr><td>อะดีนีน (adenine)</td><td>A</td><td>ทั้ง DNA และ RNA</td></tr>
<tr><td>ไซโทซีน (cytosine)</td><td>C</td><td>ทั้ง DNA และ RNA</td></tr>
<tr><td>ไทมีน (thymine)</td><td>T</td><td><b>เฉพาะใน DNA</b></td></tr>
<tr><td>ยูราซิล (uracil)</td><td>U</td><td><b>เฉพาะใน RNA</b></td></tr>
</table>
<div class="box why"><b>ทำไมสายพอลินิวคลีโอไทด์ถึงต้องมีทิศทาง</b><br>
เพราะพันธะฟอสโฟไดเอสเทอร์เชื่อมระหว่าง<b>ตำแหน่งที่ไม่เหมือนกันสองตำแหน่ง</b> คือ 3&#8242; ของตัวหนึ่ง กับ 5&#8242; ของอีกตัวหนึ่ง<br>
ดังนั้นไม่ว่าจะต่อยาวแค่ไหน ปลายด้านหนึ่งจะเหลือหมู่ฟอสเฟตที่ 5&#8242; อยู่เสมอ (เรียกปลาย 5&#8242;) และอีกด้านเหลือหมู่ —OH ที่ 3&#8242; (เรียกปลาย 3&#8242;) สายจึงมี "หัว" กับ "ท้าย" ที่ต่างกันเสมอ</div>
<div class="box tip"><b>ทริคจำน้ำตาล</b> <b>ดีออกซี</b> แปลว่า "ขาดออกซิเจน" — <b>D</b>NA จึงใช้ <b>D</b>eoxyribose ที่ C2 ไม่มี —OH ส่วน RNA ใช้ Ribose ที่มีครบ</div>` },

    { type: "table", rows: [
      ["หัวข้อเปรียบเทียบ", "DNA", "RNA"],
      ["น้ำตาล", "ดีออกซีไรโบส (C2 <b>ไม่มี</b> —OH)", "ไรโบส (C2 <b>มี</b> —OH)"],
      ["เบส", "A · T · C · G", "A · <b>U</b> · C · G"],
      ["จำนวนสาย", "<b>2 สาย</b> เรียงสลับทิศ (ปลาย 5′ ของสายหนึ่งจับคู่กับปลาย 3′ ของอีกสาย)", "<b>สายเดียว</b>"],
      ["รูปร่าง", "เกลียวคู่ (double helix) คล้ายบันไดเวียน", "สายเดี่ยว"],
      ["การจับคู่เบส", "<b>A จับกับ T</b> · <b>C จับกับ G</b> ยึดด้วย<b>พันธะไฮโดรเจน</b>", "—"]
    ], detail: `<h3>2.7.2 DNA เทียบกับ RNA</h3>
` + SVG_DNA + `
<div class="box why"><b>ทำไม A ต้องคู่กับ T และ C ต้องคู่กับ G</b><br>
เพราะรูปร่างและตำแหน่งของหมู่ที่สร้างพันธะไฮโดรเจนต้องเข้ากันได้พอดี ถ้าจับผิดคู่ พันธะไฮโดรเจนจะสร้างไม่ได้ และความกว้างของเกลียวจะไม่คงที่<br>
ผลที่สำคัญคือ ถ้ารู้ลำดับของสายหนึ่ง ก็<b>เดาลำดับอีกสายได้ทันที</b> — นี่คือเหตุผลที่ DNA จำลองตัวเองได้อย่างแม่นยำ</div>
<div class="box tip"><b>ทริคทำข้อสอบ</b> โจทย์ให้สาย DNA หนึ่งมา เช่น 5&#8242;-ATGC-3&#8242; สายคู่จะเป็น 3&#8242;-TACG-5&#8242; — <b>อย่าลืมกลับทิศด้วย</b> ไม่ใช่แค่เปลี่ยนตัวอักษร เพราะสองสายเรียง<b>สลับทิศ</b>กัน</div>
<div class="box warn"><b>ข้อควรรู้</b> เอกสารของครู<b>ไม่ได้ระบุจำนวนพันธะไฮโดรเจนระหว่างคู่เบส</b> (ที่หลายเล่มเขียนว่า A=T 2 พันธะ, C&#8801;G 3 พันธะ) ถ้าข้อสอบของครูอ้างอิงเอกสารนี้อย่างเดียว ประเด็นนี้ก็ไม่น่าออก แต่รู้ไว้ก็ไม่เสียหาย</div>` },

    { type: "divider" },

    /* ---------------- บทที่ 3 ---------------- */
    { type: "h1", text: "บทที่ 3 · ปฏิกิริยาเคมีในสิ่งมีชีวิต" },

    { type: "callout", html: "ช้างเดินได้ หิ่งห้อยเปล่งแสงได้ เมล็ดข้าวโพดงอกได้ — พลังงานเหล่านี้<b>ไม่ใช่พลังงานที่สิ่งมีชีวิตสร้างขึ้นใหม่</b> แต่เป็นการ<b>เปลี่ยนรูปพลังงานเคมีที่สะสมอยู่ในสารอาหาร</b>ผ่านปฏิกิริยาเคมี ให้อยู่ในรูปที่เซลล์นำไปใช้ได้",
      detail: `<h3>กฎการอนุรักษ์พลังงาน — จุดตั้งต้นของทั้งบท</h3>
<p>เอกสารมีกล่อง "เชื่อมโยงฟิสิกส์" ระบุไว้ว่า พลังงานในสิ่งมีชีวิต<b>ไม่มีการสูญหายไปหรือเกิดขึ้นใหม่</b> แต่เปลี่ยนจากพลังงานหนึ่งเป็นอีกพลังงานหนึ่งได้ โดยผลรวมของพลังงานทั้งหมดไม่เปลี่ยนแปลง ซึ่งเป็นไปตาม<b>กฎการอนุรักษ์พลังงาน (law of conservation of energy)</b></p>
<div class="box why"><b>ทำไมประโยคนี้ถึงสำคัญกับทั้งบท</b><br>
เพราะมันตัดคำตอบผิด ๆ ออกไปได้ทันทีหลายข้อ เช่น "เซลล์ผลิตพลังงาน" (ผิด — เซลล์<b>เปลี่ยนรูป</b>พลังงาน) หรือ "เอนไซม์ให้พลังงานแก่ปฏิกิริยา" (ผิด — เอนไซม์แค่<b>ลดพลังงานก่อกัมมันต์</b>)</div>` },

    { type: "h2", text: "3.1 พลังงานกับการเกิดปฏิกิริยาเคมี" },

    { type: "p", html: "การเกิดปฏิกิริยาเคมีคือการที่สารตั้งต้นเกิด<b>การจัดเรียงตัวใหม่ของอะตอม</b> พร้อมกับมีการเปลี่ยนแปลงพลังงาน ได้สารผลิตภัณฑ์ที่มีสมบัติต่างไปจากสารตั้งต้น" },

    { type: "code", text: "ตัวอย่างคู่คลาสสิกจากเอกสาร\n\n  การแยกน้ำด้วยไฟฟ้า   2H2O + พลังงาน  →  2H2 + O2\n        สารตั้งต้น = 2H2O        ผลิตภัณฑ์ = 2H2 + O2\n        ต้องได้รับพลังงานไฟฟ้า\n\n  การเกิดน้ำ           2H2 + O2  →  2H2O + พลังงาน\n        สารตั้งต้น = 2H2 + O2    ผลิตภัณฑ์ = 2H2O\n        คายพลังงานออกมา (ระเบิดเมื่อมีประกายไฟ)",
      detail: `<h3>3.1 พลังงานเคมี — พลังงานเก็บอยู่ที่ไหน</h3>
<p>สารต่าง ๆ มีพลังงานสะสมอยู่ เนื่องจาก<b>การจัดเรียงตัวของอิเล็กตรอนในพันธะเคมีระหว่างอะตอม</b>และ<b>การจัดเรียงตัวของอะตอม</b> พลังงานนี้อาจเปลี่ยนแปลงขณะเกิดปฏิกิริยา ในทางชีววิทยาเรียกพลังงานนี้ว่า <b>พลังงานเคมี (chemical energy)</b></p>
<div class="box why"><b>อ่านสองสมการข้างต้นให้เห็นภาพเดียวกัน</b><br>
สองสมการนี้เป็น<b>ปฏิกิริยาเดียวกันที่เดินคนละทาง</b> — ถ้าทางหนึ่งต้องใส่พลังงานเข้าไป อีกทางย่อมคายพลังงานออกมาเท่ากัน<br>
นั่นคือเหตุผลที่แยกน้ำต้องใช้ไฟฟ้า แต่สร้างน้ำแล้วระเบิด — ไม่ใช่เรื่องบังเอิญ แต่เป็นผลโดยตรงจากกฎการอนุรักษ์พลังงาน</div>
<div class="box warn"><b>ระวัง</b> ในปฏิกิริยา<b>ทุกปฏิกิริยา</b>มีทั้งการ<b>สลายพันธะเดิม</b>และการ<b>สร้างพันธะใหม่</b> — ไม่ใช่ว่าปฏิกิริยาคายพลังงานมีแต่การสลาย หรือปฏิกิริยาดูดพลังงานมีแต่การสร้าง สิ่งที่ตัดสินว่าดูดหรือคาย คือ<b>ผลต่างสุทธิ</b>ของพลังงานระหว่างสารตั้งต้นกับผลิตภัณฑ์</div>` },

    { type: "h2", text: "3.2 ปฏิกิริยาดูดพลังงานและปฏิกิริยาคายพลังงาน" },

    { type: "table", rows: [
      ["ประเภทปฏิกิริยา", "เงื่อนไขพลังงาน", "ลักษณะ", "เกิดขึ้นเองได้ไหม"],
      ["ปฏิกิริยาดูดพลังงาน (endergonic)", "พลังงานรวมของ<b>สารผลิตภัณฑ์สูงกว่า</b>สารตั้งต้น", "ต้องการพลังงานจากภายนอกเข้าไปเพื่อให้ปฏิกิริยาเกิดขึ้นได้", "<b>เกิดเองไม่ได้</b>"],
      ["ปฏิกิริยาคายพลังงาน (exergonic)", "พลังงานรวมของ<b>สารผลิตภัณฑ์ต่ำกว่า</b>สารตั้งต้น", "มีพลังงานส่วนเกินถูกปล่อยออกมา", "<b>น่าจะเกิดเองได้</b> (แต่ไม่จำเป็นต้องเร็ว)"]
    ], detail: `<h3>3.2 อ่านกราฟพลังงานให้ขาด</h3>
` + SVG_ENERGY + `
<div class="box tip"><b>วิธีอ่านกราฟใน 2 วินาที</b> ดูแค่ว่า<b>ปลายเส้นด้านขวาอยู่สูงหรือต่ำกว่าปลายด้านซ้าย</b><br>
ขวาสูงกว่า = ผลิตภัณฑ์มีพลังงานมากกว่า = <b>ดูดพลังงาน</b><br>
ขวาต่ำกว่า = ผลิตภัณฑ์มีพลังงานน้อยกว่า = <b>คายพลังงาน</b><br>
ส่วน "โหนก" ตรงกลางเป็นคนละเรื่อง — นั่นคือพลังงานก่อกัมมันต์ในหัวข้อถัดไป</div>
<div class="box warn"><b>จุดที่เอกสารเน้นและข้อสอบชอบถาม</b><br>
"ปฏิกิริยาคายพลังงานน่าจะเกิดขึ้นเองได้" — คำว่า<b>น่าจะ</b>สำคัญมาก<br>
เพราะ<b>ไม่ใช่ทุกปฏิกิริยาคายพลังงานที่จะเกิดขึ้นเองได้อย่างรวดเร็ว</b> เช่น แก๊ส H₂ กับ O₂ อยู่ปนกันได้โดยไม่ทำปฏิกิริยา<b>จนกว่าจะมีประกายไฟหรือความร้อน</b> — นี่คือสะพานไปสู่เรื่องพลังงานก่อกัมมันต์พอดี</div>` },

    { type: "h2", text: "3.3 พลังงานก่อกัมมันต์และปฏิกิริยาควบคู่" },

    { type: "p", html: "ในการเกิดปฏิกิริยา สารตั้งต้นต้องได้รับพลังงานมากพอที่จะ<b>สลายพันธะเดิม</b>และทำให้เกิด<b>การเรียงตัวใหม่ของอะตอม</b>ที่เหมาะสม พลังงานเริ่มต้นนี้เรียกว่า <b>พลังงานกระตุ้น</b> หรือ <b>พลังงานก่อกัมมันต์ (activation energy)</b>" },

    { type: "code", text: "ปฏิกิริยาควบคู่ (coupled reaction)\n\nวิธีที่สิ่งมีชีวิตใช้ทำให้ปฏิกิริยาดูดพลังงานเกิดขึ้นได้\nคือให้เกิด \"ควบคู่\" ไปกับปฏิกิริยาคายพลังงาน\n\n  glucose + ATP  →  glucose 6-phosphate + ADP\n\n  ฝั่งดูดพลังงาน : glucose → glucose 6-phosphate\n  ฝั่งคายพลังงาน : ATP     → ADP\n  พลังงานจากการสลาย ATP ถูกนำไปใช้เติมหมู่ฟอสเฟตให้กลูโคส",
      detail: `<h3>3.3 พลังงานก่อกัมมันต์ และปฏิกิริยาควบคู่</h3>
` + SVG_ATP + `
` + SVG_EA + `
<h4>ตัวอย่างในสิ่งมีชีวิตที่เอกสารระบุ</h4>
<table>
<tr><th>ประเภท</th><th>ตัวอย่าง</th></tr>
<tr><td>ปฏิกิริยา<b>ดูดพลังงาน</b></td><td>การสร้าง <b>glucose 6-phosphate</b> (ปฏิกิริยาแรกของการสลายกลูโคส)</td></tr>
<tr><td>ปฏิกิริยา<b>คายพลังงาน</b></td><td>การ<b>สลาย ATP</b></td></tr>
</table>
<div class="box why"><b>ทำไมปฏิกิริยาควบคู่ถึงแก้ปัญหาได้</b><br>
ปฏิกิริยาดูดพลังงานเกิดเองไม่ได้ เพราะผลิตภัณฑ์มีพลังงานสูงกว่าสารตั้งต้น<br>
แต่ถ้าเอามันไป "มัดรวม" กับปฏิกิริยาคายพลังงานที่ปล่อยพลังงานออกมามากกว่า <b>ผลรวมของทั้งคู่จะกลายเป็นคายพลังงาน</b> ปฏิกิริยารวมจึงเกิดได้<br>
เปรียบเหมือนคนสองคนบนรอกเดียวกัน คนหนักกว่าลงมา ทำให้คนเบากว่าถูกยกขึ้นไปได้</div>
<div class="box warn"><b>ระวัง 2 จุด</b><br>
1. <b>พลังงานก่อกัมมันต์ไม่ใช่พลังงานที่คายออกมา</b> — มันคือ "โหนก" ที่ต้องปีนข้ามก่อน ปฏิกิริยาคายพลังงานก็ยังต้องมีโหนกนี้<br>
2. ATP ในสมการไม่ได้ "ให้พลังงานลอย ๆ" แต่<b>ยกหมู่ฟอสเฟตไปติดที่กลูโคสจริง ๆ</b> ผลิตภัณฑ์จึงชื่อ glucose 6-phosphate และ ATP กลายเป็น ADP</div>` },

    { type: "h2", text: "3.4 เอนไซม์และกลไกการทำงาน" },

    { type: "p", html: "ในสิ่งมีชีวิต ปฏิกิริยาเคมีต้องเกิดขึ้นได้<b>อย่างรวดเร็ว จำเพาะ และควบคุมได้</b> การเร่งด้วยการเพิ่มอุณหภูมิหรือเติมสารเคมีแรง ๆ เป็นสภาวะที่<b>ไม่เหมาะสมต่อสิ่งมีชีวิต</b> เซลล์จึงใช้ <b>เอนไซม์ (enzyme)</b> ซึ่งทำหน้าที่<b>ลดพลังงานกระตุ้นของปฏิกิริยา</b>",
      detail: `<h3>3.4.1 เอนไซม์คือตัวเร่งปฏิกิริยา (catalyst)</h3>
` + SVG_EA + `
<p>ตัวอย่างจากเอกสาร: เอนไซม์ในลำไส้เล็กย่อยโปรตีนจนได้กรดแอมิโน แต่ถ้าไม่มีเอนไซม์ ปฏิกิริยานี้<b>แทบจะไม่สามารถเกิดขึ้นเลย</b></p>
<div class="box why"><b>เอนไซม์เปลี่ยนอะไร และไม่เปลี่ยนอะไร</b><br>
<b>เปลี่ยน:</b> ความสูงของ "โหนก" คือพลังงานก่อกัมมันต์ — ทำให้โมเลกุลจำนวนมากขึ้นมีพลังงานพอจะข้ามไปได้ ปฏิกิริยาจึงเร็วขึ้นมหาศาล<br>
<b>ไม่เปลี่ยน:</b> ระดับพลังงานของสารตั้งต้นและผลิตภัณฑ์ ดังนั้น<b>พลังงานที่คายออกมาเท่าเดิมทุกประการ</b> และเอนไซม์ไม่สามารถทำให้ปฏิกิริยาที่เกิดไม่ได้กลายเป็นเกิดได้</div>
<h4>เอนไซม์ทำจากอะไร</h4>
<p><b>เอนไซม์ส่วนใหญ่เป็นโปรตีน</b> แต่มีเอนไซม์บางชนิดที่เป็น<b>โมเลกุลของ RNA ซึ่งเรียกว่า ไรโบไซม์ (ribozyme)</b></p>
<div class="box tip"><b>ทริคทำข้อสอบ</b> ถ้าตัวเลือกบอกว่า "เอนไซม์เป็นโปรตีนทั้งหมด" ให้ระวัง — คำที่ถูกคือ<b>ส่วนใหญ่</b> เพราะมีไรโบไซม์เป็นข้อยกเว้น</div>` },

    { type: "code", text: "วัฏจักรการทำงานของเอนไซม์ซูเครส (4 ขั้นตอน)\n\n  1. ซูโครสเข้าจับกับ บริเวณเร่ง (active site) ของเอนไซม์ซูเครส\n\n  2. เกิดเป็น เอนไซม์ซับสเตรตคอมเพลกซ์\n     (enzyme-substrate complex)\n\n  3. การจับกันทำให้ปฏิกิริยาเกิดง่ายขึ้น\n     จึงเกิดการสลาย พันธะไกลโคซิดิกแบบ alpha-1,2 ของซูโครส\n     โดยมี H2O เข้าทำปฏิกิริยา\n\n  4. กลูโคสและฟรักโทส (ผลิตภัณฑ์) แยกออกจากเอนไซม์\n     เอนไซม์กลับไปจับซูโครสโมเลกุลต่อไปได้",
      detail: `<h3>3.4.2 บริเวณเร่ง และวัฏจักรการทำงาน</h3>
<p>สารตั้งต้น (substrate) เข้าจับกับเอนไซม์ที่บริเวณจำเพาะเรียกว่า <b>บริเวณเร่ง (active site)</b> เนื่องจากสายโปรตีนของเอนไซม์แต่ละชนิดพับม้วนจนเกิดรูปร่างเฉพาะตัว <b>บริเวณเร่งของเอนไซม์แต่ละชนิดจึงมีความจำเพาะกับสารตั้งต้น</b></p>
<p class="frm">E + S &#8652; ES → E + P<br><small>เอนไซม์ + สารตั้งต้น &#8652; เอนไซม์ซับสเตรตคอมเพลกซ์ → เอนไซม์ (ตัวเดิม) + ผลิตภัณฑ์</small></p>
<div class="box why"><b>ทำไมเอนไซม์ถึงใช้ซ้ำได้ไม่รู้จบ</b><br>
เพราะเอนไซม์<b>ไม่ได้ถูกใช้หมดไปในปฏิกิริยา</b> — มันแค่ยืมโมเลกุลมาจับ ช่วยจัดท่าให้พันธะแตกง่าย แล้วปล่อยผลิตภัณฑ์ออกไป ตัวมันเองออกมาเหมือนเดิมทุกประการ<br>
เอกสารระบุตัวเลขไว้ว่า <b>เอนไซม์โมเลกุลหนึ่งอาจเร่งปฏิกิริยาได้เป็นพันครั้งหรือมากกว่านั้นในเวลา 1 วินาที</b></div>
<div class="box warn"><b>จุดที่ต้องจำให้แม่น</b> ในวัฏจักรซูเครส พันธะที่ถูกสลายคือ<b>พันธะไกลโคซิดิกแบบ α-1,2</b> เพราะซูโครส = กลูโคส + ฟรักโทส ต่อกันแบบ α-1,2 (ย้อนกลับไปดูหัวข้อ 2.2)<br>
และปฏิกิริยานี้ต้องมี <b>H₂O เข้าทำปฏิกิริยา</b> เพราะเป็นการย่อยสลาย (hydrolysis)</div>` },

    { type: "p", html: "ในอดีตเชื่อว่าบริเวณเร่ง<b>ไม่เปลี่ยนรูปร่าง</b> เปรียบเหมือนแม่กุญแจกับลูกกุญแจ เรียกแนวคิดนี้ว่า <b>lock and key model</b> ต่อมาพบว่าบริเวณเร่ง<b>เปลี่ยนรูปร่างให้เข้ากับสารตั้งต้นได้พอดี</b>เมื่อสารตั้งต้นเข้ามาจับ เรียกว่า <b>induced fit model</b>",
      detail: `<h3>3.4.3 lock and key เทียบกับ induced fit</h3>
` + SVG_FIT + `
<table>
<tr><th></th><th>lock and key model</th><th>induced fit model</th></tr>
<tr><td>รูปร่างบริเวณเร่ง</td><td><b>ไม่เปลี่ยน</b>ทั้งก่อนและหลังจับสารตั้งต้น</td><td><b>เปลี่ยนรูป</b>โอบรับสารตั้งต้นหลังจับ</td></tr>
<tr><td>สถานะแนวคิด</td><td>แนวคิด<b>ในอดีต</b></td><td>แนวคิดที่ได้จากการศึกษา<b>ในภายหลัง</b></td></tr>
<tr><td>ตัวอย่าง</td><td>—</td><td><b>ไลโซไซม์ (lysozyme) กับ เพปทิโดไกลแคน</b></td></tr>
</table>
<div class="box why"><b>ทำไมนักวิทยาศาสตร์ถึงเปลี่ยนความเชื่อ</b><br>
เพราะเมื่อศึกษา<b>รูปร่างของเอนไซม์ก่อนและหลังการจับกับสารตั้งต้น</b> พบว่ารูปร่างไม่เหมือนเดิม — หลักฐานตรงนี้เองที่หักล้างแบบจำลองเดิม<br>
ข้อดีของ induced fit คือ การที่เอนไซม์บีบรัดสารตั้งต้นเข้าหาตัว ช่วย<b>ดึงพันธะเดิมให้ตึงจนแตกง่ายขึ้น</b> ซึ่งอธิบายได้ดีกว่าว่าเอนไซม์ลดพลังงานก่อกัมมันต์อย่างไร</div>
<div class="box tip"><b>ตัวอย่างที่เอกสารให้</b> <b>ไลโซไซม์</b>จับกับ<b>เพปทิโดไกลแคน</b> ซึ่งเป็นองค์ประกอบหนึ่งของ<b>ผนังเซลล์แบคทีเรีย</b> เมื่อเพปทิโดไกลแคนเข้าจับ จะเหนี่ยวนำให้บริเวณเร่งเปลี่ยนรูปจนเข้ากันพอดี — จำคู่นี้ไว้ ออกสอบบ่อย</div>` },

    { type: "h2", text: "3.5 ปัจจัยที่มีผลต่อการทำงานของเอนไซม์" },

    { type: "table", rows: [
      ["ปัจจัย", "ผลต่ออัตราการเกิดปฏิกิริยา", "เหตุผลเชิงกลไก"],
      ["ความเข้มข้นของ<b>สารตั้งต้น</b> (เอนไซม์คงที่)", "เพิ่มขึ้นจนถึงระดับหนึ่งแล้ว<b>คงที่</b>", "สารตั้งต้นจับกับเอนไซม์<b>ทั้งหมด</b>แล้ว → <b>ปริมาณเอนไซม์เป็นปัจจัยจำกัด</b>"],
      ["ความเข้มข้นของ<b>เอนไซม์</b> (สารตั้งต้นเพียงพอ)", "เพิ่มขึ้นจนถึงระดับหนึ่งแล้ว<b>คงที่</b>", "<b>สารตั้งต้นเป็นปัจจัยจำกัด</b>"],
      ["<b>อุณหภูมิ</b>", "เพิ่มขึ้นจนถึงจุดเหมาะสมแล้ว<b>ลดลงอย่างรวดเร็ว</b>", "สูงเกินไป → <b>โปรตีนเสียสภาพ</b> โครงสร้างสามมิติเปลี่ยนจนทำงานไม่ได้"],
      ["<b>ค่า pH</b>", "ทำงานได้ดีเฉพาะช่วง pH ที่เหมาะสม", "pH มีผลต่อ<b>ประจุของหมู่ R</b> → แรงยึดเหนี่ยวเปลี่ยน → <b>รูปร่างบริเวณเร่งเปลี่ยน</b>"]
    ], detail: `<h3>3.5.1 อุณหภูมิและ pH — ตัวเลขที่ต้องจำ</h3>
<h4>อุณหภูมิ</h4>
<table>
<tr><th>ชนิดเอนไซม์</th><th>ช่วงอุณหภูมิที่เหมาะสม</th></tr>
<tr><td>เอนไซม์ทั่ว ๆ ไปของ<b>มนุษย์</b></td><td><b>25–40 °C</b></td></tr>
<tr><td>เอนไซม์ของ<b>แบคทีเรียบางชนิดที่ทนต่อความร้อน</b></td><td><b>65–80 °C</b></td></tr>
</table>
<div class="box why"><b>ทำไมกราฟอุณหภูมิถึงไม่สมมาตร</b><br>
ฝั่งซ้าย (อุณหภูมิต่ำ) เอนไซม์แค่<b>ทำงานช้าลง</b> เพราะโมเลกุลชนกันน้อยลง — เป็นการเปลี่ยนแปลงที่<b>ย้อนกลับได้</b> พออุ่นขึ้นก็กลับมาทำงานเหมือนเดิม<br>
ฝั่งขวา (อุณหภูมิสูงเกิน) โครงสร้างสามมิติ<b>เสียสภาพ</b> บริเวณเร่งพังถาวร จับสารตั้งต้นไม่ได้อีก — กราฟจึงดิ่งลงชันและ<b>ย้อนกลับไม่ได้</b></div>
<h4>ค่า pH</h4>
` + SVG_PH + `
<table>
<tr><th>เอนไซม์</th><th>pH ที่เหมาะสม</th><th>ที่พบ / หน้าที่</th></tr>
<tr><td><b>เพปซิน</b></td><td><b>ประมาณ 1.5–2</b></td><td>กระเพาะอาหาร (สภาวะเป็นกรดสูง) ย่อยโปรตีน</td></tr>
<tr><td><b>อะไมเลส</b></td><td><b>ประมาณ 7</b></td><td>ย่อยแป้ง</td></tr>
<tr><td><b>ทริปซิน</b></td><td><b>ประมาณ 8</b></td><td>ย่อยโปรตีน (ลำไส้เล็ก)</td></tr>
</table>
<p>เอกสารระบุว่า<b>เอนไซม์ในร่างกายส่วนมากทำงานได้ดีที่ pH ประมาณ 7</b> ยกเว้นเอนไซม์ย่อยอาหารบางชนิด</p>
<div class="box tip"><b>ทริคจำเรียง</b> <b>เพปซิน 2 → อะไมเลส 7 → ทริปซิน 8</b> จำเป็นเส้นทางเดินอาหาร: กระเพาะ (กรดจัด) → ลำไส้ (เบสอ่อน ๆ) ตัวเลขไล่จากน้อยไปมากตามทางเดินอาหารพอดี</div>
<div class="box warn"><b>จุดที่คนพลาดบ่อย</b> ถ้าโจทย์ถามว่า "เติมสารตั้งต้นเพิ่มเรื่อย ๆ อัตราการเกิดปฏิกิริยาจะเพิ่มขึ้นตลอดไปหรือไม่" ตอบ<b>ไม่</b> — จะเพิ่มจนถึงจุดที่<b>บริเวณเร่งของเอนไซม์ทุกโมเลกุลถูกใช้งานเต็มหมดแล้ว</b> จากนั้นจะคงที่ เพราะเอนไซม์กลายเป็นปัจจัยจำกัด</div>` },

    { type: "h2", text: "3.6 ตัวยับยั้งเอนไซม์ โคแฟกเตอร์ และโคเอนไซม์" },

    { type: "table", rows: [
      ["ประเภทตัวยับยั้ง", "จับที่ไหน", "กลไก"],
      ["ตัวยับยั้งแบบแข่งขัน (competitive inhibitor)", "<b>บริเวณเร่ง</b>", "<b>แย่งจับ</b>กับสารตั้งต้น มักมี<b>รูปร่างบางส่วนคล้ายสารตั้งต้น</b> เอนไซม์จึงจับกับสารตั้งต้นไม่ได้"],
      ["ตัวยับยั้งแบบไม่แข่งขัน (noncompetitive inhibitor)", "<b>บริเวณอื่นที่ไม่ใช่บริเวณเร่ง</b>", "ทำให้เอนไซม์<b>เปลี่ยนรูปร่าง</b> จึงจับกับสารตั้งต้นไม่ได้"]
    ], detail: `<h3>3.6.1 ตัวยับยั้งเอนไซม์ 2 แบบ</h3>
<div class="box tip"><b>วิธีแยกให้ขาดด้วยคำถามเดียว</b><br>
ถาม: "ถ้าเติมสารตั้งต้นเข้าไปมาก ๆ จะแก้ได้ไหม"<br>
<b>แข่งขัน</b> → แก้ได้ เพราะเป็นการแย่งที่นั่งกัน ถ้าสารตั้งต้นมีมากกว่าก็ชนะได้<br>
<b>ไม่แข่งขัน</b> → แก้ไม่ได้ เพราะตัวยับยั้งไปนั่งคนละที่ และทำให้บริเวณเร่งเปลี่ยนรูปไปแล้ว เติมสารตั้งต้นเท่าไรก็เข้าไม่ได้</div>
<h3>3.6.2 โคแฟกเตอร์และโคเอนไซม์</h3>
<p>เอนไซม์บางชนิดมี<b>องค์ประกอบที่ไม่ใช่โปรตีน</b>รวมอยู่ด้วย ซึ่งมีผลต่อการทำงานของเอนไซม์</p>
<table>
<tr><th>ชนิด</th><th>คืออะไร</th><th>ตัวอย่างตามเอกสาร</th></tr>
<tr><td><b>โคแฟกเตอร์ (cofactor)</b></td><td>สารพวก<b>ไอออน</b></td><td><b>แคลเซียมไอออน (Ca²⁺) · ซิงค์ไอออน (Zn²⁺)</b></td></tr>
<tr><td><b>โคเอนไซม์ (coenzyme)</b></td><td><b>วิตามิน</b></td><td><b>วิตามิน B1, B2 และ K</b></td></tr>
</table>
<p>สารเหล่านี้<b>จำเป็นต่อการทำงานของเอนไซม์ ถ้าแยกออกจากเอนไซม์จะทำให้เอนไซม์ไม่สามารถทำงานได้ตามปกติ</b></p>
<div class="box tip"><b>ทริคจำ</b> <b>โค<u>แฟก</u>เตอร์ = ไ<u>อ</u>ออน</b> (โลหะ) · <b>โค<u>เอนไซม์</u> = <u>วิตามิน</u></b><br>
เหตุผลที่สมเหตุสมผล: นี่คือคำตอบว่าทำไมร่างกายถึงต้องการแร่ธาตุ (Fe, Zn, Ca) และวิตามินในปริมาณเล็กน้อยแต่ขาดไม่ได้ — เพราะมันไปเป็นผู้ช่วยของเอนไซม์นั่นเอง เชื่อมกลับไปหาหัวข้อ 1.2 ได้พอดี</div>
<h3>3.6.3 การควบคุมวิถีเมแทบอลิซึม — การยับยั้งแบบย้อนกลับ</h3>
` + SVG_FEEDBACK + `
<p>เมื่อ<b>สารผลิตภัณฑ์สุดท้ายมีปริมาณมากเกินความจำเป็น</b> ผลิตภัณฑ์นั้นจะ<b>เข้าจับกับเอนไซม์ตัวแรก ๆ ในวิถี</b> ทำให้เอนไซม์จับกับสารตั้งต้นไม่ได้ ปฏิกิริยาต่อไปในวิถีจึง<b>หยุดชะงัก</b></p>
<div class="box why"><b>ทำไมต้องยับยั้งที่เอนไซม์ตัวแรก ไม่ใช่ตัวสุดท้าย</b><br>
เพราะถ้าไปหยุดตรงกลางหรือท้ายวิถี สารตัวกลางจะ<b>สะสมค้าง</b>อยู่เต็มไปหมด เปลืองวัตถุดิบและอาจเป็นพิษต่อเซลล์<br>
หยุดที่ต้นทางคือหยุดไม่ให้เริ่มผลิตตั้งแต่แรก — เหมือนปิดก๊อกน้ำ ไม่ใช่ปล่อยน้ำไหลแล้วค่อยเอาถังไปรอง</div>` },

    { type: "h2", text: "3.7 การเรียกชื่อเอนไซม์" },

    { type: "bullet", html: "เอนไซม์จำนวนมาก<b>เรียกชื่อตามสารตั้งต้น โดยลงท้ายเสียงเป็น “-เ_ส” (-ase)</b> เช่น <b>ซูเครส อะไมเลส ลิเพส ยูรีเอส</b>" },
    { type: "bullet", html: "เอนไซม์บางชนิดมี<b>ชื่อเฉพาะ</b> เพราะตั้งชื่อตั้งแต่ตอนที่ยังพบเอนไซม์ไม่กี่ชนิด เช่น <b>เพปซิน ทริปซิน</b> ซึ่งเป็นเอนไซม์ช่วยย่อยโปรตีน" },

    { type: "table", rows: [
      ["ระดับ", "รหัส", "ความหมาย"],
      ["Main enzyme class", "EC 3", "Hydrolases — เอนไซม์ที่ใช้น้ำในการสลายพันธะ"],
      ["Subclass", "EC 3.4", "Hydrolases ที่ทำงานกับ<b>พันธะเพปไทด์</b>"],
      ["Sub-Subclass", "EC 3.4.11", "Peptidases ที่ตัด<b>กรดแอมิโนตัวแรก</b>ออกจากสายพอลิเพปไทด์"],
      ["Enzyme identifier", "EC 3.4.11.4", "เอนไซม์ที่ตัดกรดแอมิโนตัวแรกออกจาก<b>ไตรเพปไทด์</b>"]
    ], detail: `<h3>3.7 ระบบ Enzyme Commission number (EC number)</h3>
<p>เมื่อค้นพบเอนไซม์จำนวนมากขึ้น การเรียกชื่อตามสารตั้งต้นอย่างเดียวไม่พอ จึงกำหนดหลักเกณฑ์เรียกชื่ออย่างเป็นระบบตามระบบ <b>EC number</b></p>
<div class="box why"><b>อ่านรหัส EC อย่างไร</b><br>
รหัสเป็น<b>วงกลมซ้อนกัน</b> — ตัวเลขแต่ละหลักที่เพิ่มเข้ามาคือการ<b>ระบุให้แคบลง</b>ทีละชั้น เหมือนที่อยู่: ประเทศ → จังหวัด → อำเภอ → บ้านเลขที่<br>
<b>EC 3</b> = กลุ่มใหญ่ (ไฮโดรเลส) → <b>EC 3.4</b> = ทำงานกับพันธะเพปไทด์ → <b>EC 3.4.11</b> = ตัดกรดแอมิโนตัวแรก → <b>EC 3.4.11.4</b> = ตัวที่ตัดจากไตรเพปไทด์โดยเฉพาะ</div>
<div class="box tip"><b>ทริคจำเลข 3</b> <b>Hydro</b>lase = ใช้ <b>น้ำ</b> สลายพันธะ — คำว่า hydro แปลว่าน้ำอยู่แล้ว เอนไซม์ย่อยอาหารทั้งหลาย (อะไมเลส ซูเครส เพปซิน ทริปซิน ลิเพส) ล้วนอยู่ในกลุ่มนี้ เพราะการย่อยคือการเติมน้ำเข้าไปสลายพันธะทั้งสิ้น</div>
<div class="box warn"><b>ระวัง</b> เอนไซม์ที่ลงท้ายด้วย -ase ไม่ได้ตั้งชื่อตามสารตั้งต้นเสมอไป เช่น <b>ดีเอ็นเอพอลิเมอเรส</b> ตั้งชื่อตาม<b>สิ่งที่มันสร้าง</b> (พอลิเมอร์ของ DNA) ไม่ใช่สิ่งที่มันย่อย</div>` },

    { type: "h2", text: "3.8 เมแทบอลิซึมและวิถีเมแทบอลิซึม" },

    { type: "p", html: "สิ่งมีชีวิตแบ่งได้ 2 กลุ่ม คือ<b>กลุ่มที่สร้างอาหารเองได้</b> เช่น พืช (ได้รับพลังงานจากแสงมาสร้างน้ำตาล) และ<b>กลุ่มที่สร้างอาหารเองไม่ได้</b> เช่น สัตว์ (ได้รับพลังงานจากอาหารที่กิน) ปฏิกิริยาเคมีทั้งหมดที่เกิดขึ้นในสิ่งมีชีวิตเรียกว่า <b>เมแทบอลิซึม (metabolism)</b>" },

    { type: "table", rows: [
      ["", "แคแทบอลิซึม (catabolism)", "แอแนบอลิซึม (anabolism)"],
      ["ทำอะไร", "<b>สลาย</b>สารโมเลกุลใหญ่ให้เป็นโมเลกุลเล็กลง", "<b>สังเคราะห์</b>สารโมเลกุลใหญ่จากสารโมเลกุลเล็ก"],
      ["พลังงาน", "<b>ปลดปล่อยพลังงานออกมา</b>", "<b>ต้องการพลังงาน</b>"],
      ["ตัวอย่าง", "การหายใจระดับเซลล์", "การสังเคราะห์โปรตีน คาร์โบไฮเดรต ลิพิด กรดนิวคลีอิก"]
    ], detail: `<h3>3.8.1 แคแทบอลิซึมกับแอแนบอลิซึม</h3>
<p>ผลิตภัณฑ์จากแคแทบอลิซึม เช่น <b>ATP</b> และสารโมเลกุลเล็กต่าง ๆ จะถูกนำไปใช้ใน<b>แอแนบอลิซึม</b>เพื่อสังเคราะห์สารโมเลกุลใหญ่</p>
<p class="frm">สารอินทรีย์โมเลกุลใหญ่ —(แคแทบอลิซึม)→ สารโมเลกุลเล็ก + <b>ATP</b><br>สารโมเลกุลเล็ก + <b>ATP</b> —(แอแนบอลิซึม)→ สารอินทรีย์โมเลกุลใหญ่</p>
<div class="box tip"><b>ทริคจำ</b> “<b>แคแท</b> = แคะออก (สลาย)” · “<b>แอนา</b> = แอบสร้าง (สังเคราะห์)”<br>
และจำคู่ว่า แคแทบอลิซึม<b>ผลิต</b> ATP ส่วนแอแนบอลิซึม<b>ใช้</b> ATP</div>
<div class="box warn"><b>ระวัง</b> "เมแทบอลิซึม" ไม่ได้แปลว่า "การเผาผลาญ" อย่างเดียว — มันคือ<b>ผลรวมของปฏิกิริยาเคมีทั้งหมด</b> ซึ่งรวมทั้งการสลายและการสร้าง ถ้าตัวเลือกบอกว่าเมแทบอลิซึมคือการสลายสารอย่างเดียว ข้อนั้นผิด</div>` },

    { type: "p", html: "ปฏิกิริยาเคมีในสิ่งมีชีวิตมักเกิดต่อเนื่องกันอย่างมีลำดับ เรียกว่า <b>วิถีเมแทบอลิซึม (metabolic pathway)</b> โดย<b>สารผลิตภัณฑ์ของปฏิกิริยาหนึ่งจะเป็นสารตั้งต้นของอีกปฏิกิริยาหนึ่ง</b> และ<b>แต่ละปฏิกิริยามีเอนไซม์ที่จำเพาะของตัวเอง</b>",
      detail: `<h3>3.8.2 วิถีเมแทบอลิซึม และการศึกษาลำดับปฏิกิริยา</h3>
<p>โดยทั่วไป<b>เอนไซม์ชนิดหนึ่ง ๆ จะเร่งปฏิกิริยาได้เฉพาะอย่างเท่านั้น</b> เซลล์จึงต้องมีเอนไซม์หลายชนิด ตัวอย่างวิถีเมแทบอลิซึมที่เอกสารยกไว้คือ<b>ไกลโคลิซิส</b> ซึ่งเป็นการสลายกลูโคสที่มีหลายขั้นตอนและใช้เอนไซม์หลายชนิด</p>
<h4>การหายใจระดับเซลล์ 3 ขั้นตามเอกสาร</h4>
<table>
<tr><th>ขั้น</th><th>เกิดที่</th><th>ได้อะไร</th></tr>
<tr><td>1. <b>Glycolysis</b> (กลูโคส → กรดไพรูวิก)</td><td><b>ไซโทซอล</b></td><td>ATP และ NADH</td></tr>
<tr><td>2. <b>Krebs Cycle</b></td><td><b>ไมโทคอนเดรีย</b></td><td>ATP, NADH และปล่อย <b>CO₂</b></td></tr>
<tr><td>3. <b>Electron Transport</b></td><td><b>ไมโทคอนเดรีย</b></td><td>ATP และ <b>น้ำ</b></td></tr>
</table>
<h4>การศึกษาลำดับปฏิกิริยาด้วยตัวยับยั้ง — ออกข้อสอบบ่อย</h4>
<p>วิธีศึกษาคือ<b>เติมตัวยับยั้งเอนไซม์เข้าไปขัดขวางการทำงานของเอนไซม์ตัวใดตัวหนึ่ง</b> แล้ว<b>วัดปริมาณสารที่สะสมเพิ่มขึ้นหรือลดลง</b> ก็จะบอกลำดับของปฏิกิริยาได้</p>
<div class="box why"><b>ตัวอย่างจากเอกสาร — อ่านให้เข้าใจตรรกะ</b><br>
วิถีหนึ่งมี 2 ขั้น มีสาร <b>P, Q, R</b> และเอนไซม์ <b>E₁, E₂</b><br>
เมื่อเติมตัวยับยั้งที่ขัดขวาง <b>E₂</b> พบว่า<br>
• สาร <b>Q สะสมมากขึ้น</b> → แปลว่า Q ถูก<b>สร้างต่อไปได้</b> แต่<b>ใช้ต่อไม่ได้</b> ดังนั้น Q อยู่<b>ก่อน</b>จุดที่ถูกบล็อก<br>
• สาร <b>P ค่อย ๆ ลดลง</b> → แปลว่า P ยังถูกเปลี่ยนเป็นอย่างอื่นได้ ดังนั้น P อยู่<b>ก่อน</b> Q<br>
• <b>ไม่เกิดสาร R เพิ่ม</b> → R อยู่<b>หลัง</b>จุดที่ถูกบล็อก<br>
สรุปลำดับได้เป็น <b>P —(E₁)→ Q —(E₂)→ R</b></div>
<div class="box tip"><b>สูตรทำข้อสอบแบบนี้</b> "สารที่<b>สะสม</b> = สารที่อยู่<b>ก่อน</b>จุดที่ถูกบล็อกทันที" และ "สารที่<b>หายไป/ไม่เกิดเพิ่ม</b> = สารที่อยู่<b>หลัง</b>จุดที่ถูกบล็อก" จำสองประโยคนี้แล้วเรียงลำดับได้ทุกข้อ</div>` },

    { type: "callout", html: "สรุปท้ายบท: <b>สารต่าง ๆ สะสมพลังงานไว้ในพันธะเคมี</b> ปฏิกิริยาการสังเคราะห์และสลายสารมีทั้งที่ดูดพลังงานและคายพลังงาน <b>เอนไซม์เป็นส่วนสำคัญที่ทำให้เมแทบอลิซึมเกิดขึ้นได้อย่างเหมาะสม</b> — หากขาดเอนไซม์แม้ตัวใดตัวหนึ่ง ปฏิกิริยานั้นจะเปลี่ยนสารตั้งต้นเป็นผลิตภัณฑ์ไม่ได้ และส่งผลต่อปฏิกิริยาลำดับถัดไปจนอาจกระทบต่อการดำรงชีวิต" }
  ];

  /* ==========================================================
     โน้ตไดอะแกรม — ทุกชิ้นเป็นวัตถุปกติบนกระดาน
     ผู้ใช้ลากย้าย ปรับขนาด หมุน จัดกลุ่ม และลบได้เหมือนรูปทรงที่วาดเอง
     คอลัมน์ x = 60 / 400 / 740 / 1080 · แถวห่างกัน 200 · การ์ดกว้าง 250
     ========================================================== */
  STARTER_DIAGRAM[ID] = [

    { id:"ttl", t:"x", x:40, y:16, w:900, html:"ชีววิทยา ม.4 · เซลล์ของสิ่งมีชีวิต — แผนผังรวม 3 บท", size:30, bold:true, c:"auto" },

    /* ---------- คอลัมน์ 1 : บทที่ 1 ---------- */
    { id:"c1", t:"c", x:60, y:100, w:250, c:"#3b7ddd",
      title:"1. เคมีที่เป็นพื้นฐานของสิ่งมีชีวิต",
      body:"อะตอม → พันธะ → โมเลกุล → เซลล์<br>โครงสร้างแบบไหน ให้สมบัติแบบนั้น",
      detail:`<h3>บทที่ 1 — ภาพรวม</h3>
<p>บทนี้ตอบคำถามเดียว: <b>ทำไมสิ่งมีชีวิตถึงทำสิ่งที่มันทำได้</b> คำตอบอยู่ที่การจัดเรียงอิเล็กตรอนและชนิดพันธะ</p>
<p class="frm">สิ่งมีชีวิต → ระบบอวัยวะ → อวัยวะ → เนื้อเยื่อ → เซลล์ → โมเลกุล → อะตอม</p>
<div class="box why"><b>เส้นเรื่องของบท</b><br>
อะตอมมีเวเลนซ์อิเล็กตรอน → เวเลนซ์อิเล็กตรอนกำหนดชนิดพันธะ → ชนิดพันธะกำหนดรูปร่างโมเลกุล → รูปร่างโมเลกุลกำหนดสมบัติ → สมบัติกำหนดหน้าที่ในเซลล์<br>
ทุกคำถามในบทนี้อยู่บนเส้นนี้เส้นเดียว</div>
<div class="box tip"><b>อ่านบทนี้อย่างไรให้คุ้ม</b> อย่าท่องตาราง แต่ให้ถามตัวเองทุกครั้งว่า "ข้อมูลนี้ไปอธิบายสมบัติอะไร" เช่น รู้ว่า O ดึงอิเล็กตรอนเก่งกว่า H ไปอธิบายได้ว่าทำไมน้ำละลายเกลือได้และทำไมร่างกายไม่ร้อนเร็ว</div>` },

    { id:"c2", t:"c", x:60, y:300, w:250, c:"#3b7ddd",
      title:"1.1 อะตอม ธาตุ และสารประกอบ",
      body:"โปรตอน + นิวตรอน ในนิวเคลียส<br>อิเล็กตรอนวิ่งรอบ · เวเลนซ์อิเล็กตรอนคือตัวสร้างพันธะ",
      detail:`<h3>1.1 อะตอม ธาตุ และสารประกอบ</h3>
<table>
<tr><th>อนุภาค</th><th>ประจุ</th><th>ตำแหน่ง</th></tr>
<tr><td>โปรตอน</td><td>บวก</td><td>นิวเคลียส</td></tr>
<tr><td>นิวตรอน</td><td>ไม่มีประจุ</td><td>นิวเคลียส</td></tr>
<tr><td>อิเล็กตรอน</td><td>ลบ</td><td>รอบนิวเคลียส</td></tr>
</table>
<p class="frm">เลขอะตอม = จำนวนโปรตอน · เลขมวล = โปรตอน + นิวตรอน</p>
<p>สัญลักษณ์นิวเคลียร์เขียนเป็น <sup>12</sup><sub>6</sub>C — บนซ้ายคือเลขมวล ล่างซ้ายคือเลขอะตอม</p>
<p>อิเล็กตรอนในระดับพลังงานนอกสุดเรียก <b>เวเลนซ์อิเล็กตรอน</b></p>
<h4>ไอออน — ตัวเลขจากเอกสาร</h4>
<p>Na⁺ โปรตอน 11 อิเล็กตรอน 10 · Cl⁻ โปรตอน 17 อิเล็กตรอน 18</p>
<div class="box why"><b>ทำไมสารประกอบถึงมีสมบัติต่างจากธาตุตั้งต้นสิ้นเชิง</b><br>
Na เป็นโลหะสีเทาไวปฏิกิริยา · Cl เป็นแก๊สสีเขียวเหลืองเป็นพิษ · แต่ NaCl เป็นของแข็งไม่มีสี ไม่เป็นพิษ จุดหลอมเหลวสูง<br>
เพราะสมบัติมาจาก<b>การจัดเรียงอิเล็กตรอนหลังเกิดพันธะ</b> ไม่ใช่จาก "มีธาตุอะไรอยู่ข้างใน"</div>
<div class="box warn"><b>ระวัง</b> ประจุบวกเกิดจาก<b>อิเล็กตรอนหายไป</b> ไม่ใช่โปรตอนเพิ่ม — ถ้าโปรตอนเปลี่ยนจะกลายเป็นธาตุอื่น</div>` },

    { id:"c3", t:"c", x:60, y:500, w:250, c:"#3b7ddd",
      title:"1.2 ธาตุและปริมาณในสิ่งมีชีวิต",
      body:"พืช: C 45% · O 45% · H 6% (รวม 96%)<br>คน: น้ำ 65% โปรตีน 18% ลิพิด 10% คาร์โบไฮเดรต 5%",
      detail:`<h3>1.2 ตัวเลขชุดที่ออกสอบบ่อยที่สุด</h3>
<h4>ธาตุในพืช</h4>
<table>
<tr><th>กลุ่ม</th><th>ธาตุและร้อยละ</th></tr>
<tr><td>องค์ประกอบหลัก <b>96%</b></td><td>C 45% · O 45% · H 6%</td></tr>
<tr><td>สารอาหารหลัก <b>3.6%</b></td><td>N 1.5% · K 1% · Ca 0.5% · Mg 0.2% · P 0.2% · S 0.1% · Si 0.1%</td></tr>
<tr><td>สารอาหารรอง <b>0.4%</b></td><td>Cl, Fe, B, Mn, Mo, Zn, Na, Cu, Ni</td></tr>
</table>
<h4>สารในร่างกายมนุษย์</h4>
<p>น้ำ <b>65%</b> · โปรตีน <b>18%</b> · ลิพิด <b>10%</b> · คาร์โบไฮเดรต <b>5%</b> · อื่น ๆ <b>2%</b></p>
<h4>บทบาทของธาตุ</h4>
<ul>
<li><b>N</b> → คลอโรฟิลล์ กรดแอมิโน กรดนิวคลีอิก</li>
<li><b>P</b> → ฟอสโฟลิพิด ATP นิวคลีโอไทด์</li>
<li><b>Fe</b> → ฮีโมโกลบิน</li>
</ul>
<h4>ปริมาณที่ร่างกายต้องการต่อวัน</h4>
<p>K 3,500 มก. &gt; Na 2,400 มก. &gt; Fe 15 มก. &gt; I 0.15 มก.</p>
<div class="box warn"><b>อย่าปนกัน</b> ตาราง 45/45/6 วัด <b>ธาตุในพืช</b> ส่วน 65/18/10/5/2 วัด <b>สารในร่างกายมนุษย์</b> — คนละสิ่งที่วัด คนละสิ่งมีชีวิต</div>` },

    { id:"c4", t:"c", x:60, y:700, w:250, c:"#3b7ddd",
      title:"1.3 พันธะเคมีและแรงยึดเหนี่ยว",
      body:"โคเวเลนต์ = ใช้อิเล็กตรอนร่วมกัน<br>ไอออนิก = ให้และรับ<br>ไฮโดรเจน = แรงระหว่างโมเลกุล",
      detail:`<h3>1.3 สามชนิดที่ต้องแยกให้ขาด</h3>
` + SVG_CBOND + `
<table>
<tr><th>ชนิด</th><th>เกิดจาก</th><th>ตัวอย่าง</th></tr>
<tr><td><b>โคเวเลนต์</b></td><td>อะตอม 2 อะตอม<b>ใช้เวเลนซ์อิเล็กตรอนร่วมกัน</b></td><td>O–H ในน้ำ, C–C, พันธะเพปไทด์</td></tr>
<tr><td><b>ไอออนิก</b></td><td>อะตอมหนึ่ง<b>ให้</b> อีกอะตอม<b>รับ</b> เกิดไอออนบวก-ลบดูดกัน</td><td>NaCl</td></tr>
<tr><td><b>ไฮโดรเจน</b></td><td>แรงยึดเหนี่ยว<b>ระหว่างโมเลกุล</b>ที่มีขั้ว</td><td>น้ำกับน้ำ, คู่เบสใน DNA, แอมโมเนียกับน้ำ</td></tr>
</table>
<div class="box why"><b>ทำไมชีวิตต้องมีพันธะอ่อน</b><br>
ถ้าทุกอย่างยึดด้วยโคเวเลนต์ เซลล์จะรื้อของเก่าไม่ได้ สร้างของใหม่ไม่ได้<br>
พันธะไฮโดรเจนแต่ละพันธะอ่อนมาก จึงต่อและถอดได้ที่อุณหภูมิร่างกาย แต่เมื่อมีจำนวนมหาศาลก็แข็งแรงพอจะยึด DNA สองสายไว้ได้ — <b>ชีวิตเลือกกาวที่แกะออกได้ ไม่ใช่เชื่อมเหล็ก</b></div>
<div class="box warn"><b>ผิดบ่อยที่สุดในหัวข้อนี้</b> ในน้ำ H กับ O ยึดกันด้วย<b>โคเวเลนต์</b> ส่วนโมเลกุลน้ำกับโมเลกุลน้ำยึดกันด้วย<b>ไฮโดรเจน</b> — ท่องว่า "ภายใน = โคเวเลนต์ · ระหว่าง = ไฮโดรเจน"</div>` },

    { id:"c5", t:"c", x:60, y:900, w:250, c:"#3b7ddd",
      title:"1.4 น้ำ — โครงสร้างและสมบัติ",
      body:"O ดึง e⁻ เก่งกว่า → น้ำมีขั้ว → พันธะไฮโดรเจน<br>น้ำ 1 ก. 1 °C ใช้ 1 แคลอรี · เอทานอล 0.58",
      detail:`<h3>1.4 น้ำ — ทุกสมบัติมาจากเหตุเดียว</h3>
` + SVG_WATER + `
<p class="frm">O ดึงอิเล็กตรอนเก่งกว่า → โมเลกุลมีขั้ว → เกิดพันธะไฮโดรเจน → อธิบายสมบัติได้ทุกข้อ</p>
<table>
<tr><th>สมบัติ</th><th>ผลต่อสิ่งมีชีวิต</th></tr>
<tr><td>ตัวทำละลายที่ดี</td><td>นำสารเข้า-ออกเซลล์ ลำเลียงสาร กำจัดของเสีย</td></tr>
<tr><td>ความร้อนจำเพาะสูง</td><td>อุณหภูมิในร่างกายเปลี่ยนแปลงได้น้อย</td></tr>
<tr><td><b>โคฮีชัน</b> — น้ำกับน้ำ</td><td>สายน้ำในไซเล็มไม่ขาดตอน</td></tr>
<tr><td><b>แอดฮีชัน</b> — น้ำกับพื้นผิว</td><td>น้ำเกาะผนังท่อลำเลียง</td></tr>
</table>
<h4>ตัวเลขความร้อนจำเพาะ</h4>
<p>น้ำ 1 กรัม เพิ่ม 1 °C ใช้ <b>1 แคลอรี</b> · เอทิลแอลกอฮอล์ 1 กรัม เพิ่ม 1 °C ใช้ <b>0.58 แคลอรี</b></p>
<h4>ไฮโดรฟิลิก / ไฮโดรโฟบิก</h4>
<p><b>ไฮโดรฟิลิก</b> = ชอบน้ำ (NaCl, ซูโครส) · <b>ไฮโดรโฟบิก</b> = ไม่ชอบน้ำ (น้ำมัน ลิพิด)</p>
<p class="frm">H₂O &#8652; H⁺ + OH⁻ &nbsp;— H⁺ มาก → pH ต่ำ → เป็นกรด</p>
<div class="box why"><b>ทำไมน้ำถึงร้อนช้า</b> พลังงานที่ใส่เข้าไปต้องใช้<b>ทำลายพันธะไฮโดรเจนก่อน</b> จึงเหลือไปเพิ่มการสั่นของโมเลกุลน้อยลง</div>` },

    { id:"c6", t:"c", x:60, y:1100, w:250, c:"#3b7ddd",
      title:"1.5 สารประกอบคาร์บอนและหมู่ฟังก์ชัน",
      body:"C มีเวเลนซ์อิเล็กตรอน 4 → สร้างพันธะได้ 4<br>หมู่ฟังก์ชันคือปุ่มควบคุมสมบัติของโมเลกุล",
      detail:`<h3>1.5 คาร์บอนและหมู่ฟังก์ชัน</h3>
` + SVG_FUNCGROUP + `
<p>คาร์บอนมีเวเลนซ์อิเล็กตรอน <b>4</b> จึงสร้างพันธะโคเวเลนต์ได้สูงสุด <b>4 พันธะ</b> ทั้งพันธะเดี่ยว คู่ และสาม</p>
<p>ไฮโดรคาร์บอนที่เอกสารยกตัวอย่าง: <b>มีเทน CH₄ · อีเทน C₂H₆ · เอทิลีน C₂H₄ · อะเซทิลีน C₂H₂</b></p>
<table>
<tr><th>หมู่ฟังก์ชัน</th><th>สูตร</th><th>พบใน</th></tr>
<tr><td>ไฮดรอกซิล</td><td>—OH</td><td>น้ำตาล กลีเซอรอล</td></tr>
<tr><td>คาร์บอกซิล</td><td>—COOH</td><td>กรดแอมิโน กรดไขมัน</td></tr>
<tr><td>คาร์บอนิล <b>คีโตน</b></td><td>C=O <b>กลางสาย</b></td><td>ฟรักโทส ไรบูโลส</td></tr>
<tr><td>คาร์บอนิล <b>อัลดีไฮด์</b></td><td>C=O <b>ปลายสาย</b></td><td>กลูโคส ไรโบส กาแล็กโทส</td></tr>
<tr><td>แอมิโน</td><td>—NH₂</td><td>กรดแอมิโน</td></tr>
<tr><td>ซัลฟ์ไฮดริล</td><td>—SH</td><td>ซิสเทอีน</td></tr>
<tr><td>ฟอสเฟต</td><td>—OPO₃²⁻</td><td>ฟอสโฟลิพิด · DNA/RNA · ATP</td></tr>
</table>
<div class="box why"><b>ทำไมสร้างพอลิเมอร์ต้องคายน้ำทุกครั้ง</b><br>
เพราะต้องดึง <b>H</b> จากปลายหนึ่งและ <b>OH</b> จากอีกปลายออกไป ซึ่งรวมกันได้พอดีเป็น H₂O 1 โมเลกุลต่อ 1 พันธะ — ใช้ได้กับไกลโคซิดิก เพปไทด์ เอสเทอร์ และฟอสโฟไดเอสเทอร์เหมือนกันหมด</div>
<div class="box tip"><b>สูตรทำข้อสอบ</b> จำนวนน้ำที่คายออก = จำนวนหน่วย − 1 (สายตรงไม่แตกกิ่ง)</div>` },

    /* ---------- คอลัมน์ 2 : บทที่ 2 ---------- */
    { id:"c7", t:"c", x:400, y:100, w:250, c:"#2e9e6b",
      title:"2. สารชีวโมเลกุล",
      body:"4 กลุ่ม: คาร์โบไฮเดรต · โปรตีน · ลิพิด · กรดนิวคลีอิก<br>ต่างกันที่ “อิฐ” และรูปแบบการต่อ",
      detail:`<h3>บทที่ 2 — ภาพรวมและด่านแรกในการแยกชนิด</h3>
<table>
<tr><th>กลุ่ม</th><th>ธาตุ</th><th>หน่วยย่อย</th><th>พันธะ</th></tr>
<tr><td>คาร์โบไฮเดรต</td><td>C H O</td><td>มอโนแซ็กคาไรด์</td><td>ไกลโคซิดิก</td></tr>
<tr><td>โปรตีน</td><td>C H O <b>N</b> (บางชนิดมี S)</td><td>กรดแอมิโน</td><td>เพปไทด์</td></tr>
<tr><td>ลิพิด</td><td>C H O (บางชนิดมี N, P)</td><td>ไม่ใช่พอลิเมอร์แท้</td><td>เอสเทอร์</td></tr>
<tr><td>กรดนิวคลีอิก</td><td>C H O N <b>P</b></td><td>นิวคลีโอไทด์</td><td>ฟอสโฟไดเอสเทอร์</td></tr>
</table>
<div class="box tip"><b>แยกชนิดใน 1 วินาที</b> เห็น <b>N</b> → โปรตีนหรือกรดนิวคลีอิก · เห็น <b>N กับ P</b> ด้วยกัน → กรดนิวคลีอิก · มีแค่ <b>C H O</b> → ถ้าละลายน้ำคือคาร์โบไฮเดรต ถ้าไม่ละลายคือลิพิด</div>` },

    { id:"c8", t:"c", x:400, y:300, w:250, c:"#2e9e6b",
      title:"2.1 มอโนแซ็กคาไรด์",
      body:"CnH2nOn · คาร์บอน 3–7 อะตอม<br>เพนโทส = 5 C · เฮ็กโซส = 6 C",
      detail:`<h3>2.1 มอโนแซ็กคาไรด์</h3>
` + SVG_MONOSAC + `
<p>โมเลกุลเล็กที่สุด มีรสหวาน ละลายน้ำได้ มีคาร์บอน <b>3–7 อะตอม</b></p>
<table>
<tr><th>กลุ่ม</th><th>จำนวน C</th><th>ตัวอย่าง</th></tr>
<tr><td><b>เพนโทส</b></td><td>5</td><td>ไรโบส · ไรบูโลส</td></tr>
<tr><td><b>เฮ็กโซส</b></td><td>6</td><td>กลูโคส · ฟรักโทส · กาแล็กโทส</td></tr>
</table>
<h4>แบ่งตามหมู่คาร์บอนิล — ออกสอบ</h4>
<table>
<tr><th>กลุ่ม</th><th>ตำแหน่ง C=O</th><th>ได้แก่</th></tr>
<tr><td><b>อัลดีไฮด์</b></td><td>ปลายสาย</td><td>ไรโบส กลูโคส กาแล็กโทส</td></tr>
<tr><td><b>คีโตน</b></td><td>กลางสาย</td><td>ไรบูโลส ฟรักโทส</td></tr>
</table>
<p>การนับตำแหน่งคาร์บอน ให้<b>เริ่มจากปลายที่ใกล้หมู่คาร์บอนิล</b> — กลูโคสมีอัลดีไฮด์ที่ C1 ปิดวงได้ 6 เหลี่ยม · ฟรักโทสมีคีโตนที่ C2 ปิดวงได้ 5 เหลี่ยม</p>
<div class="box why"><b>α กับ β กลูโคส ต่างกันตรงไหน</b><br>
ดูที่หมู่ —OH บนคาร์บอนตำแหน่งที่ 1 — อยู่<b>ใต้</b>ระนาบคือ <b>α</b> อยู่<b>เหนือ</b>ระนาบคือ <b>β</b> ต่างกันแค่นี้ แต่ผลคือได้แป้ง (ย่อยได้) กับเซลลูโลส (ย่อยไม่ได้)</div>
<div class="box warn"><b>ระวัง</b> "เพนโทส" บอกจำนวนคาร์บอน ไม่ได้บอกขนาดวง — ฟรักโทสมี 6 C แต่ปิดวงได้ 5 เหลี่ยม</div>` },

    { id:"c9", t:"c", x:400, y:500, w:250, c:"#2e9e6b",
      title:"2.2 ไดแซ็กคาไรด์",
      body:"ซูโครส = กลูโคส+ฟรักโทส α-1,2<br>มอลโทส = กลูโคส+กลูโคส α-1,4<br>แล็กโทส = กาแล็กโทส+กลูโคส β-1,4",
      detail:`<h3>2.2 ตารางที่ต้องจำให้ครบทั้ง 3 แถว</h3>
` + SVG_GLYCOSIDIC + `
<table>
<tr><th>ไดแซ็กคาไรด์</th><th>ประกอบด้วย</th><th>พันธะ</th><th>พบใน</th></tr>
<tr><td><b>ซูโครส</b></td><td>กลูโคส + <b>ฟรักโทส</b></td><td><b>α-1,2</b></td><td>อ้อย มะพร้าว ตาล ผลไม้</td></tr>
<tr><td><b>มอลโทส</b></td><td>กลูโคส + กลูโคส</td><td><b>α-1,4</b></td><td>ข้าวมอลต์ เมล็ดธัญพืชงอก</td></tr>
<tr><td><b>แล็กโทส</b></td><td><b>กาแล็กโทส</b> + กลูโคส</td><td><b>β-1,4</b></td><td>น้ำนม</td></tr>
</table>
<p>ทุกคู่เชื่อมด้วย<b>พันธะไกลโคซิดิก</b> ซึ่งเป็นพันธะโคเวเลนต์ และคายน้ำออก 1 โมเลกุล</p>
<div class="box why"><b>เลข 1,2 / 1,4 บอกอะไร</b><br>
บอกว่า<b>คาร์บอนตำแหน่งใดเชื่อมกับตำแหน่งใด</b> — ซูโครสเป็น 1,2 เพราะฟรักโทสมีหมู่คาร์บอนิลที่ C2 ไม่ใช่ C1 เหมือนกลูโคส</div>
<div class="box tip"><b>วิธีจำ</b> ซูโครสเป็นตัวเดียวที่มีฟรักโทสและเป็นตัวเดียวที่เป็น 1,2 · แล็กโทส (นม) เป็นตัวเดียวที่เป็น β · มอลโทสใช้พันธะเดียวกับแป้ง (α-1,4) เพราะมันได้จากการย่อยแป้ง</div>
<div class="box warn"><b>ถ้าจำได้แค่ข้อเดียว</b> ให้จำ <b>ซูโครส α-1,2</b> เพราะมันโผล่ซ้ำในบทที่ 3 ตอนวัฏจักรเอนไซม์ซูเครส</div>` },

    { id:"c10", t:"c", x:400, y:700, w:250, c:"#2e9e6b",
      title:"2.3 พอลิแซ็กคาไรด์",
      body:"แป้ง = อะไมโลส + อะไมโลเพกทิน<br>ไกลโคเจนแตกแขนงมากสุด · เซลลูโลส β-1,4",
      detail:`<h3>2.3 อิฐก้อนเดียวกัน ต่อคนละแบบ</h3>
` + SVG_POLYSAC + `
<table>
<tr><th>ชนิด</th><th>พันธะ</th><th>ลักษณะ / สมบัติ</th></tr>
<tr><td><b>อะไมโลส</b></td><td>α-1,4</td><td>สายตรง ไม่แตกแขนง · ละลายน้ำไม่ดี · <b>ไอโอดีนให้สีน้ำเงิน</b></td></tr>
<tr><td><b>อะไมโลเพกทิน</b></td><td>α-1,4 + <b>α-1,6</b></td><td>แตกแขนง · ละลายน้ำดีกว่า · <b>ไอโอดีนให้สีม่วงแดง</b></td></tr>
<tr><td><b>ไกลโคเจน</b></td><td>α-1,4 + α-1,6</td><td><b>แตกแขนงมากกว่าอะไมโลเพกทิน</b> · สะสมใน<b>ตับและกล้ามเนื้อ</b></td></tr>
<tr><td><b>เซลลูโลส</b></td><td><b>β-1,4</b></td><td>สายตรง ยึดกันด้วย<b>พันธะไฮโดรเจน</b> · ไม่ละลายน้ำ · ผนังเซลล์พืช</td></tr>
</table>
<div class="box why"><b>α กับ β เปลี่ยนทุกอย่างอย่างไร</b><br>
<b>α</b> ทำให้สาย<b>ขดเป็นเกลียว</b> มีช่องให้เอนไซม์เข้า ย่อยง่าย → เหมาะเป็นแหล่งพลังงาน<br>
<b>β</b> ทำให้กลูโคสสลับหัวกลับหาง สาย<b>เหยียดตรง</b> เรียงชิดเป็นมัดแน่น เอนไซม์แทรกไม่ได้ → เหมาะเป็นโครงสร้าง</div>
<p>เซลลูโลสเป็น<b>สารประกอบคาร์บอนจากสิ่งมีชีวิตที่มีมากที่สุดในโลก</b> มนุษย์ย่อยไม่ได้เพราะไม่มีเอนไซม์ จึงเป็นกากใยอาหาร ช่วยขับถ่ายและลดความเสี่ยงมะเร็งลำไส้ใหญ่</p>
<p>ชนิดอื่น: <b>ไคทิน</b> (กุ้ง ปู แมลง) · <b>เพกทิน</b> (ผนังเซลล์พืช) · <b>เพปทิโดไกลแคน</b> (ผนังเซลล์แบคทีเรีย)</p>
<div class="box tip"><b>ทำไมสัตว์ใช้ไกลโคเจนที่แตกแขนงเยอะ</b> ยิ่งแตกแขนงมาก ยิ่งมีปลายสายให้เอนไซม์เข้าตัดพร้อมกันหลายจุด ระดมกลูโคสออกมาใช้ได้เร็ว — เหมาะกับสัตว์ที่ต้องวิ่งหนีทันที</div>` },

    { id:"c11", t:"c", x:400, y:900, w:250, c:"#2e9e6b",
      title:"2.4 กรดแอมิโนและพันธะเพปไทด์",
      body:"ทุกตัวมี -NH₂ + -COOH + H + หมู่ R<br>ต่างกันที่หมู่ R · สิ่งมีชีวิตใช้ 20 ชนิด",
      detail:`<h3>2.4 กรดแอมิโนและพันธะเพปไทด์</h3>
` + SVG_AMINO + `
<p class="frm">H₂N — C(H)(R) — COOH</p>
<p>ทุกชนิดมี<b>หมู่แอมิโน (—NH₂) หมู่คาร์บอกซิล (—COOH) และไฮโดรเจน</b> เชื่อมกับ<b>คาร์บอนอะตอมเดียวกัน</b> ต่างกันที่<b>หมู่ R</b></p>
<p>ตัวอย่างหมู่ R: <b>ไกลซีน</b> R = —H · <b>อะลานีน</b> R = —CH₃ · <b>ซิสเทอีน</b> R = —CH₂—SH (มีกำมะถัน)</p>
<table>
<tr><th>ประเภท</th><th>ความหมาย</th></tr>
<tr><td>กรดแอมิโน<b>จำเป็น</b></td><td>ร่างกายสังเคราะห์เองไม่ได้ ต้องได้จากอาหาร</td></tr>
<tr><td>กรดแอมิโน<b>ไม่จำเป็น</b></td><td>ร่างกายสังเคราะห์ได้เอง</td></tr>
</table>
<p class="frm">—COOH ของตัวหนึ่ง + —NH₂ ของอีกตัว → <b>พันธะเพปไทด์</b> + H₂O</p>
<p>2 หน่วย = <b>ไดเพปไทด์</b> · 3 หน่วย = <b>ไตรเพปไทด์</b> · จำนวนมาก = <b>พอลิเพปไทด์</b></p>
<div class="box why"><b>20 ชนิดทำไมพอ</b> เพราะความหลากหลายมาจาก<b>ลำดับ</b> ไม่ใช่จำนวนชนิด — สาย 100 หน่วยจาก 20 ตัวเลือก มีได้ 20<sup>100</sup> แบบ</div>
<div class="box warn"><b>ระวัง</b> "จำเป็น" แปลว่า<b>จำเป็นต้องกิน</b> ไม่ได้แปลว่าสำคัญกว่า</div>` },

    { id:"c12", t:"c", x:400, y:1100, w:250, c:"#2e9e6b",
      title:"2.5 โครงสร้างโปรตีน 4 ระดับ",
      body:"ปฐมภูมิ = ลำดับ · ทุติยภูมิ = พันธะไฮโดรเจน<br>ตติยภูมิ = ก้อน 3 มิติ · จตุรภูมิ = หลายสาย",
      detail:`<h3>2.5 โครงสร้างโปรตีนและการเสียสภาพ</h3>
<table>
<tr><th>ระดับ</th><th>คืออะไร</th><th>ยึดด้วย</th></tr>
<tr><td><b>ปฐมภูมิ</b></td><td>ลำดับกรดแอมิโนในสายเดียว</td><td>พันธะเพปไทด์</td></tr>
<tr><td><b>ทุติยภูมิ</b></td><td>บิดเป็น<b>เกลียว (α-helix)</b> หรือ<b>แผ่น (β-sheet)</b></td><td><b>พันธะไฮโดรเจน</b></td></tr>
<tr><td><b>ตติยภูมิ</b></td><td>พับม้วนเป็นก้อน<b>สามมิติ</b></td><td>แรงไฮโดรโฟบิก · ไฮโดรเจน · ไอออนิก</td></tr>
<tr><td><b>จตุรภูมิ</b></td><td>พอลิเพปไทด์<b>มากกว่า 1 สาย</b> เช่น <b>ฮีโมโกลบิน 4 สาย</b></td><td>แรงแบบเดียวกับตติยภูมิ</td></tr>
</table>
<div class="box why"><b>ทำไมลำดับกำหนดทุกอย่าง</b> หมู่ R แต่ละตำแหน่งตัดสินว่าจุดนั้นดึงกันหรือผลักกัน ชอบน้ำหรือหนีน้ำ สายจึงพับไปเองจนได้รูปทรงที่เสถียรที่สุด — <b>เปลี่ยนกรดแอมิโนตำแหน่งเดียวอาจทำให้พับผิดรูปทั้งโมเลกุล</b></div>
<h4>หน้าที่ของโปรตีน</h4>
<p><b>ลำเลียง</b> (โปรตีนช่อง) · <b>เอนไซม์</b> (แลกเทส ดีเอ็นเอพอลิเมอเรส) · <b>โครงสร้าง</b> (ไฟโบรอิน อีลาสติน คอลลาเจน แอกทิน เคราติน) · <b>สะสม</b> (เคซีน ไวเทลลิน) · <b>ภูมิคุ้มกัน</b> (แอนติบอดี ไลโซไซม์) · <b>ตัวรับ</b></p>
<div class="box warn"><b>การเสียสภาพ</b> ทำลายเฉพาะ<b>พันธะอ่อน</b> — <b>พันธะเพปไทด์ยังอยู่ครบ</b> ลำดับกรดแอมิโนไม่เปลี่ยน ไข่ต้มจึงยังเป็นโปรตีน แต่ถ้าเป็นเอนไซม์ก็เร่งปฏิกิริยาไม่ได้อีก</div>` },

    { id:"c13", t:"c", x:400, y:1300, w:250, c:"#2e9e6b",
      title:"2.6 ลิพิด",
      body:"4 กลุ่ม: กรดไขมัน · ไตรกลีเซอไรด์ · ฟอสโฟลิพิด · สเตอรอยด์<br>ไตรฯ = กรดไขมัน 3 · ฟอสโฟฯ = 2 + ฟอสเฟต",
      detail:`<h3>2.6 ลิพิด 4 กลุ่ม</h3>
` + SVG_FATTYACID + `
` + SVG_PHOSPHOLIPID + `
` + SVG_STEROID + `
` + SVG_BILAYER + `
<p>ละลายได้ดีใน<b>ตัวทำละลายไม่มีขั้ว</b> เช่น อีเทอร์ เบนซีน คลอโรฟอร์ม เอทานอล · ให้พลังงาน<b>มากกว่า</b>คาร์โบไฮเดรตและโปรตีนที่น้ำหนักเท่ากัน · เป็นตัวทำละลายวิตามิน <b>A D E K</b></p>
<table>
<tr><th>กลุ่ม</th><th>โครงสร้าง</th></tr>
<tr><td>กรดไขมัน</td><td>สายไฮโดรคาร์บอน + <b>หมู่คาร์บอกซิล</b>ที่ปลาย</td></tr>
<tr><td><b>ไตรกลีเซอไรด์</b></td><td>กลีเซอรอล 1 + กรดไขมัน <b>3</b> (พบมากที่สุดในพืชและสัตว์)</td></tr>
<tr><td><b>ฟอสโฟลิพิด</b></td><td>กลีเซอรอล 1 + กรดไขมัน <b>2</b> + หมู่ฟอสเฟต 1 (ต่อกับหมู่ R)</td></tr>
<tr><td>สเตอรอยด์</td><td>วง 6 เหลี่ยม <b>3 วง</b> + วง 5 เหลี่ยม <b>1 วง</b></td></tr>
</table>
<p>กรดไขมัน<b>อิ่มตัว</b> = พันธะเดี่ยวทั้งหมด สายตรง แข็งตัวง่าย (ไขมันสัตว์ น้ำมันมะพร้าว น้ำมันปาล์ม)<br>
กรดไขมัน<b>ไม่อิ่มตัว</b> = มีพันธะคู่ สายหักงอ <b>แข็งตัวยากกว่า</b> (ข้าวโพด ถั่วเหลือง ทานตะวัน งา)</p>
<p>ของแข็งที่อุณหภูมิห้อง = <b>ไขมัน (fat)</b> · ของเหลว = <b>น้ำมัน (oil)</b></p>
<div class="box why"><b>ทำไมฟอสโฟลิพิดเหมาะเป็นเยื่อหุ้มเซลล์</b> หัวชอบน้ำหันออกหาน้ำทั้งสองด้าน หางหนีน้ำถูกบีบมารวมตรงกลาง เยื่อจึง<b>จัดตัวเองได้เองและปิดรูที่ถูกเจาะได้เอง</b></div>
<div class="box warn"><b>อย่าสลับตัวเลข</b> ไตรกลีเซอไรด์ = <b>3</b> กรดไขมัน · ฟอสโฟลิพิด = <b>2</b> กรดไขมัน (ต้องเหลือที่ให้ฟอสเฟต)</div>
<p><b>HDL</b> นำคอเลสเตอรอลส่วนเกินไปทำลายที่<b>ตับ</b> · <b>LDL</b> สะสมที่ผนังหลอดเลือด ทำให้ตีบหรือแข็งตัว</p>` },

    { id:"c14", t:"c", x:400, y:1500, w:250, c:"#2e9e6b",
      title:"2.7 กรดนิวคลีอิก",
      body:"นิวคลีโอไทด์ = น้ำตาลเพนโทส + เบส + ฟอสเฟต<br>DNA 2 สาย A-T C-G · RNA สายเดียว มี U",
      detail:`<h3>2.7 กรดนิวคลีอิก</h3>
` + SVG_NUCLEOTIDE + `
` + SVG_DNA + `
<p>นิวคลีโอไทด์ 1 หน่วยมี <b>3 ส่วน</b>: น้ำตาลเพนโทส (C 5 อะตอม) · ไนโตรจีนัสเบส · หมู่ฟอสเฟต</p>
<table>
<tr><th>เบส</th><th>ย่อ</th><th>พบใน</th></tr>
<tr><td>กวานีน</td><td>G</td><td>ทั้งคู่</td></tr>
<tr><td>อะดีนีน</td><td>A</td><td>ทั้งคู่</td></tr>
<tr><td>ไซโทซีน</td><td>C</td><td>ทั้งคู่</td></tr>
<tr><td>ไทมีน</td><td>T</td><td><b>DNA เท่านั้น</b></td></tr>
<tr><td>ยูราซิล</td><td>U</td><td><b>RNA เท่านั้น</b></td></tr>
</table>
<p>น้ำตาลของ RNA คือ<b>ไรโบส</b> (C2 มี —OH) · ของ DNA คือ<b>ดีออกซีไรโบส</b> (C2 ไม่มี —OH)</p>
<p>ต่อกันด้วย<b>พันธะฟอสโฟไดเอสเทอร์</b> ระหว่างหมู่ —OH ที่ <b>3&#8242;</b> กับหมู่ฟอสเฟตที่ <b>5&#8242;</b> ได้สายที่มีปลาย 5&#8242; และปลาย 3&#8242;</p>
<p>DNA มี <b>2 สายเรียงสลับทิศ</b> เป็น<b>เกลียวคู่</b> จับคู่เบส <b>A–T</b> และ <b>C–G</b> ด้วย<b>พันธะไฮโดรเจน</b> · RNA เป็น<b>สายเดียว</b></p>
<div class="box why"><b>ทำไมสายต้องมีทิศ</b> เพราะพันธะเชื่อมระหว่าง<b>ตำแหน่งที่ต่างกัน</b> (3&#8242; กับ 5&#8242;) ปลายหนึ่งจึงเหลือฟอสเฟต อีกปลายเหลือ —OH เสมอ</div>
<div class="box tip"><b>ทำข้อสอบ</b> ให้สาย 5&#8242;-ATGC-3&#8242; สายคู่คือ 3&#8242;-TACG-5&#8242; — <b>อย่าลืมกลับทิศ</b></div>` },

    /* ---------- คอลัมน์ 3 : บทที่ 3 ตอนต้น ---------- */
    { id:"c15", t:"c", x:740, y:100, w:250, c:"#d98324",
      title:"3. ปฏิกิริยาเคมีในสิ่งมีชีวิต",
      body:"พลังงานไม่ได้ถูกสร้างใหม่ แต่ถูกเปลี่ยนรูป<br>เอนไซม์คือตัวคุมจังหวะทั้งหมด",
      detail:`<h3>บทที่ 3 — ภาพรวม</h3>
<p>ช้างเดิน หิ่งห้อยเปล่งแสง เมล็ดข้าวโพดงอก — พลังงานเหล่านี้<b>ไม่ใช่พลังงานที่สิ่งมีชีวิตสร้างขึ้นใหม่</b> แต่เป็นการเปลี่ยนรูป<b>พลังงานเคมีที่สะสมอยู่ในสารอาหาร</b></p>
<div class="box why"><b>กฎการอนุรักษ์พลังงาน</b><br>
พลังงาน<b>ไม่สูญหายและไม่เกิดขึ้นใหม่</b> เปลี่ยนรูปได้เท่านั้น ผลรวมไม่เปลี่ยนแปลง<br>
ประโยคนี้ตัดตัวเลือกผิดได้หลายข้อ เช่น "เซลล์ผลิตพลังงาน" (ผิด — เปลี่ยนรูป) หรือ "เอนไซม์ให้พลังงานแก่ปฏิกิริยา" (ผิด — ลดพลังงานก่อกัมมันต์)</div>
<div class="box tip"><b>เส้นเรื่องของบท</b> พลังงานอยู่ในพันธะ → ปฏิกิริยามีทั้งดูดและคาย → ทุกปฏิกิริยาต้องข้ามโหนก (Ea) → เอนไซม์ลดโหนก → หลายปฏิกิริยาต่อกันเป็นวิถี → วิถีถูกควบคุมด้วย feedback</div>` },

    { id:"c16", t:"c", x:740, y:300, w:250, c:"#d98324",
      title:"3.1 พลังงานกับปฏิกิริยาเคมี",
      body:"2H₂O + พลังงาน → 2H₂ + O₂<br>2H₂ + O₂ → 2H₂O + พลังงาน",
      detail:`<h3>3.1 พลังงานเคมีเก็บอยู่ที่ไหน</h3>
` + SVG_ENERGY + `
<p>สารมีพลังงานสะสมอยู่จาก<b>การจัดเรียงอิเล็กตรอนในพันธะเคมี</b>และ<b>การจัดเรียงตัวของอะตอม</b> ในทางชีววิทยาเรียกว่า <b>พลังงานเคมี (chemical energy)</b></p>
<p class="frm">การแยกน้ำ: 2H₂O + พลังงาน → 2H₂ + O₂<br>การเกิดน้ำ: 2H₂ + O₂ → 2H₂O + พลังงาน</p>
<div class="box why"><b>สองสมการนี้คือเรื่องเดียวกันที่เดินคนละทาง</b><br>
ถ้าทางหนึ่งต้องใส่พลังงานเข้าไป อีกทางย่อมคายพลังงานออกมา — จึงเป็นเหตุผลว่าทำไมแยกน้ำต้องใช้ไฟฟ้า แต่สร้างน้ำแล้วระเบิด</div>
<div class="box warn"><b>ระวัง</b> ทุกปฏิกิริยามี<b>ทั้งการสลายพันธะเดิมและการสร้างพันธะใหม่</b> — สิ่งที่ตัดสินว่าดูดหรือคาย คือ<b>ผลต่างสุทธิ</b>ของพลังงานระหว่างสารตั้งต้นกับผลิตภัณฑ์</div>` },

    { id:"c17", t:"c", x:740, y:500, w:250, c:"#d98324",
      title:"3.2 ดูดพลังงาน / คายพลังงาน",
      body:"ดูด (endergonic): ผลิตภัณฑ์พลังงาน<b>สูงกว่า</b><br>คาย (exergonic): ผลิตภัณฑ์พลังงาน<b>ต่ำกว่า</b>",
      detail:`<h3>3.2 แยกสองประเภทด้วยกราฟ</h3>
<table>
<tr><th>ประเภท</th><th>เงื่อนไข</th><th>เกิดเองได้ไหม</th></tr>
<tr><td><b>ดูดพลังงาน</b> (endergonic)</td><td>ผลิตภัณฑ์<b>สูงกว่า</b>สารตั้งต้น</td><td><b>ไม่ได้</b> ต้องมีพลังงานจากภายนอก</td></tr>
<tr><td><b>คายพลังงาน</b> (exergonic)</td><td>ผลิตภัณฑ์<b>ต่ำกว่า</b>สารตั้งต้น</td><td><b>น่าจะได้</b> แต่ไม่จำเป็นต้องเร็ว</td></tr>
</table>
<div class="box tip"><b>อ่านกราฟใน 2 วินาที</b> ดูแค่ปลายเส้นขวาเทียบกับปลายเส้นซ้าย — ขวาสูงกว่า = ดูด · ขวาต่ำกว่า = คาย ส่วน "โหนก" ตรงกลางเป็นคนละเรื่อง (พลังงานก่อกัมมันต์)</div>
<div class="box warn"><b>คำที่เอกสารเน้น</b> คำว่า "<b>น่าจะ</b>เกิดขึ้นเองได้" สำคัญมาก — เพราะ H₂ กับ O₂ อยู่ปนกันได้โดยไม่ทำปฏิกิริยา<b>จนกว่าจะมีประกายไฟหรือความร้อน</b> ทั้งที่เป็นปฏิกิริยาคายพลังงาน</div>` },

    { id:"c18", t:"c", x:740, y:700, w:250, c:"#d98324",
      title:"3.3 พลังงานก่อกัมมันต์",
      body:"พลังงานเริ่มต้นที่ต้องใส่เพื่อสลายพันธะเดิม<br>= “โหนก” ที่ต้องปีนข้ามก่อนเสมอ",
      detail:`<h3>3.3 พลังงานก่อกัมมันต์ (activation energy)</h3>
` + SVG_EA + `
<p>ในการเกิดปฏิกิริยา สารตั้งต้นต้องได้รับพลังงานพอที่จะ<b>สลายพันธะเดิม</b>และทำให้เกิด<b>การเรียงตัวใหม่ของอะตอม</b>ที่เหมาะสม พลังงานเริ่มต้นนี้เรียกว่า<b>พลังงานกระตุ้น</b>หรือ<b>พลังงานก่อกัมมันต์</b></p>
<div class="box why"><b>ทำไมปฏิกิริยาคายพลังงานถึงยังต้องมีโหนก</b><br>
เพราะก่อนจะสร้างพันธะใหม่ที่เสถียรกว่า ต้อง<b>คลายพันธะเดิมก่อน</b> ซึ่งขั้นนั้นต้องใช้พลังงาน<br>
เหมือนก้อนหินบนหน้าผา — มันจะกลิ้งลงมาเองก็ต่อเมื่อถูกดันให้พ้นขอบก่อน ถึงแม้ปลายทางจะอยู่ต่ำกว่าก็ตาม</div>
<div class="box warn"><b>ผิดบ่อย</b> พลังงานก่อกัมมันต์<b>ไม่ใช่</b>พลังงานที่คายออกมา และ<b>ไม่ใช่</b>ผลต่างระหว่างสารตั้งต้นกับผลิตภัณฑ์ — มันคือความสูงจากสารตั้งต้นขึ้นไปถึง<b>ยอดโหนก</b>เท่านั้น</div>` },

    { id:"c19", t:"c", x:740, y:900, w:250, c:"#d98324",
      title:"3.3b ปฏิกิริยาควบคู่",
      body:"glucose + ATP → glucose 6-phosphate + ADP<br>ฝั่งคายพลังงานลากฝั่งดูดพลังงานให้เกิดได้",
      detail:`<h3>3.3b ปฏิกิริยาควบคู่ (coupled reaction)</h3>
` + SVG_ATP + `
<p>วิธีที่สิ่งมีชีวิตทำให้ปฏิกิริยาดูดพลังงานเกิดขึ้นได้ คือให้เกิด<b>ควบคู่</b>ไปกับปฏิกิริยาคายพลังงาน</p>
<p class="frm">glucose + ATP → glucose 6-phosphate + ADP</p>
<table>
<tr><th>ฝั่ง</th><th>ปฏิกิริยา</th></tr>
<tr><td><b>ดูดพลังงาน</b></td><td>glucose → glucose 6-phosphate (ปฏิกิริยาแรกของการสลายกลูโคส)</td></tr>
<tr><td><b>คายพลังงาน</b></td><td>ATP → ADP</td></tr>
</table>
<div class="box why"><b>ทำไมมัดรวมกันแล้วเกิดได้</b><br>
ถ้าปฏิกิริยาคายพลังงานปล่อยพลังงานออกมา<b>มากกว่า</b>ที่ปฏิกิริยาดูดพลังงานต้องการ <b>ผลรวมของทั้งคู่จะกลายเป็นคายพลังงาน</b> ปฏิกิริยารวมจึงเกิดได้เอง<br>
เปรียบเหมือนคนสองคนบนรอกเดียวกัน คนหนักกว่าลง ทำให้คนเบากว่าถูกยกขึ้น</div>
<div class="box warn"><b>ระวัง</b> ATP ไม่ได้ "ให้พลังงานลอย ๆ" แต่<b>ยกหมู่ฟอสเฟตไปติดที่กลูโคสจริง ๆ</b> ผลิตภัณฑ์จึงชื่อ glucose 6-phosphate และ ATP กลายเป็น ADP</div>` },

    { id:"c20", t:"c", x:740, y:1100, w:250, c:"#d98324",
      title:"3.4 เอนไซม์ — ตัวเร่งปฏิกิริยา",
      body:"หน้าที่เดียว: <b>ลดพลังงานก่อกัมมันต์</b><br>ส่วนใหญ่เป็นโปรตีน · บางชนิดเป็น RNA (ไรโบไซม์)",
      detail:`<h3>3.4 เอนไซม์ทำอะไร และไม่ทำอะไร</h3>
<p>ในสิ่งมีชีวิต ปฏิกิริยาต้องเกิด<b>เร็ว จำเพาะ และควบคุมได้</b> การเร่งด้วยความร้อนหรือสารเคมีแรง ๆ เป็นสภาวะที่<b>ไม่เหมาะสมต่อสิ่งมีชีวิต</b> เซลล์จึงใช้เอนไซม์</p>
<div class="box why"><b>เปลี่ยนอะไร / ไม่เปลี่ยนอะไร</b><br>
<b>เปลี่ยน:</b> ความสูงของโหนก (พลังงานก่อกัมมันต์) → โมเลกุลจำนวนมากขึ้นมีพลังงานพอข้ามไปได้ → ปฏิกิริยาเร็วขึ้นมหาศาล<br>
<b>ไม่เปลี่ยน:</b> ระดับพลังงานของสารตั้งต้นและผลิตภัณฑ์ → <b>พลังงานที่คายออกมาเท่าเดิมทุกประการ</b> และเอนไซม์ทำให้ปฏิกิริยาที่เกิดไม่ได้กลายเป็นเกิดได้ไม่ได้</div>
<p><b>เอนไซม์ส่วนใหญ่เป็นโปรตีน</b> แต่มีบางชนิดเป็นโมเลกุลของ <b>RNA เรียกว่า ไรโบไซม์ (ribozyme)</b></p>
<p>ตัวอย่างจากเอกสาร: เอนไซม์ในลำไส้เล็กย่อยโปรตีนจนได้กรดแอมิโน แต่ถ้าไม่มีเอนไซม์ ปฏิกิริยานี้<b>แทบจะไม่เกิดขึ้นเลย</b></p>
<div class="box tip"><b>ทำข้อสอบ</b> ถ้าตัวเลือกบอกว่า "เอนไซม์เป็นโปรตีนทั้งหมด" ให้ระวัง — คำที่ถูกคือ<b>ส่วนใหญ่</b></div>` },

    { id:"c21", t:"c", x:740, y:1300, w:250, c:"#d98324",
      title:"3.4b บริเวณเร่งและวัฏจักรซูเครส",
      body:"E + S ⇌ ES → E + P · เอนไซม์ออกมาเหมือนเดิม<br>ซูเครสสลายพันธะ α-1,2 ของซูโครส",
      detail:`<h3>3.4b บริเวณเร่ง (active site) และวัฏจักร 4 ขั้น</h3>
<p class="frm">E + S &#8652; ES → E + P</p>
<p>สารตั้งต้นเข้าจับที่<b>บริเวณเร่ง</b> ซึ่งมีรูปร่างเฉพาะจากการพับม้วนของสายโปรตีน ทำให้<b>บริเวณเร่งของเอนไซม์แต่ละชนิดจำเพาะกับสารตั้งต้น</b></p>
<h4>วัฏจักรเอนไซม์ซูเครส 4 ขั้น</h4>
<ol>
<li><b>ซูโครสเข้าจับกับบริเวณเร่ง</b>ของเอนไซม์ซูเครส</li>
<li>เกิดเป็น <b>เอนไซม์ซับสเตรตคอมเพลกซ์</b> (enzyme-substrate complex)</li>
<li>การจับกันทำให้ปฏิกิริยาเกิดง่ายขึ้น จึงเกิดการสลาย<b>พันธะไกลโคซิดิกแบบ α-1,2</b> โดยมี <b>H₂O</b> เข้าทำปฏิกิริยา</li>
<li><b>กลูโคสและฟรักโทส</b>แยกออกจากเอนไซม์ เอนไซม์กลับไปจับซูโครสโมเลกุลต่อไปได้</li>
</ol>
<div class="box why"><b>ทำไมเอนไซม์ใช้ซ้ำได้ไม่รู้จบ</b> เพราะมันไม่ได้ถูกใช้หมดไป — แค่ยืมโมเลกุลมาจับ ช่วยจัดท่าให้พันธะแตกง่าย แล้วปล่อยออกไป ตัวมันออกมาเหมือนเดิมทุกประการ<br>
เอกสารระบุว่าเอนไซม์โมเลกุลหนึ่งอาจเร่งปฏิกิริยาได้<b>เป็นพันครั้งหรือมากกว่าในเวลา 1 วินาที</b></div>
<div class="box warn"><b>จุดที่ต้องแม่น</b> พันธะที่ถูกสลายคือ <b>α-1,2</b> เพราะซูโครส = กลูโคส + ฟรักโทส (ย้อนไปดูการ์ด 2.2)</div>` },

    { id:"c22", t:"c", x:740, y:1500, w:250, c:"#d98324",
      title:"3.4c lock and key / induced fit",
      body:"lock and key = บริเวณเร่งไม่เปลี่ยนรูป (แนวคิดเดิม)<br>induced fit = เปลี่ยนรูปโอบรับ · เช่น ไลโซไซม์",
      detail:`<h3>3.4c สองแบบจำลองของการจับกัน</h3>
` + SVG_FIT + `
<table>
<tr><th></th><th>lock and key</th><th>induced fit</th></tr>
<tr><td>รูปร่างบริเวณเร่ง</td><td><b>ไม่เปลี่ยน</b>ทั้งก่อนและหลังจับ</td><td><b>เปลี่ยนรูปโอบรับ</b>หลังสารตั้งต้นเข้าจับ</td></tr>
<tr><td>สถานะ</td><td>แนวคิด<b>ในอดีต</b></td><td>แนวคิดจากการศึกษา<b>ในภายหลัง</b></td></tr>
<tr><td>ตัวอย่าง</td><td>เปรียบกับแม่กุญแจ-ลูกกุญแจ</td><td><b>ไลโซไซม์ กับ เพปทิโดไกลแคน</b></td></tr>
</table>
<div class="box why"><b>ทำไมถึงเปลี่ยนความเชื่อ</b> เพราะเมื่อศึกษา<b>รูปร่างของเอนไซม์ก่อนและหลังการจับ</b> พบว่ารูปร่างไม่เหมือนเดิม<br>
ข้อดีของ induced fit คือการที่เอนไซม์บีบรัดสารตั้งต้นช่วย<b>ดึงพันธะเดิมให้ตึงจนแตกง่ายขึ้น</b> ซึ่งอธิบายการลดพลังงานก่อกัมมันต์ได้ดีกว่า</div>
<div class="box tip"><b>คู่ที่ต้องจำ</b> <b>ไลโซไซม์</b> (พบในน้ำตา) จับกับ <b>เพปทิโดไกลแคน</b> ซึ่งเป็นองค์ประกอบของ<b>ผนังเซลล์แบคทีเรีย</b> — นี่คือกลไกที่น้ำตาฆ่าเชื้อโรคได้</div>` },

    /* ---------- คอลัมน์ 4 : บทที่ 3 ตอนท้าย ---------- */
    { id:"c23", t:"c", x:1080, y:100, w:250, c:"#d98324",
      title:"3.5 ปัจจัย: ความเข้มข้น",
      body:"เพิ่มสารตั้งต้น → เร็วขึ้นแล้วคงที่ (เอนไซม์เป็นปัจจัยจำกัด)<br>เพิ่มเอนไซม์ → เร็วขึ้นแล้วคงที่ (สารตั้งต้นเป็นปัจจัยจำกัด)",
      detail:`<h3>3.5 ความเข้มข้นของสารตั้งต้นและของเอนไซม์</h3>
<table>
<tr><th>กรณี</th><th>กราฟ</th><th>ปัจจัยจำกัด</th></tr>
<tr><td>เอนไซม์คงที่ เพิ่ม<b>สารตั้งต้น</b></td><td>เพิ่มขึ้นแล้ว<b>อิ่มตัวเป็นเส้นราบ</b></td><td><b>ปริมาณเอนไซม์</b></td></tr>
<tr><td>สารตั้งต้นเพียงพอ เพิ่ม<b>เอนไซม์</b></td><td>เพิ่มขึ้นแล้วคงที่</td><td><b>สารตั้งต้น</b></td></tr>
</table>
<div class="box why"><b>ทำไมกราฟถึงราบ</b><br>
เพราะเมื่อ<b>บริเวณเร่งของเอนไซม์ทุกโมเลกุลถูกใช้งานเต็มหมดแล้ว</b> ต่อให้เติมสารตั้งต้นเพิ่มอีกเท่าไร ก็ไม่มีที่ว่างให้จับ อัตราจึงไม่เพิ่มขึ้น<br>
เหมือนร้านอาหารที่โต๊ะเต็มหมด — ลูกค้ามาเพิ่มก็ต้องรอ ไม่ได้ทำให้ครัวเสิร์ฟเร็วขึ้น</div>
<div class="box tip"><b>วิธีตอบโจทย์กราฟ</b> จุดที่กราฟเริ่มราบ = จุดที่ "ของอีกฝั่ง" หมด ให้ตอบเสมอว่า<b>ตัวที่คงที่อยู่คือปัจจัยจำกัด</b></div>` },

    { id:"c24", t:"c", x:1080, y:300, w:250, c:"#d98324",
      title:"3.5b ปัจจัย: อุณหภูมิและ pH",
      body:"มนุษย์ 25–40 °C · แบคทีเรียทนร้อน 65–80 °C<br>เพปซิน pH 1.5–2 · อะไมเลส ~7 · ทริปซิน ~8",
      detail:`<h3>3.5b ตัวเลขที่ออกสอบแน่นอน</h3>
` + SVG_PH + `
<h4>อุณหภูมิ</h4>
<table>
<tr><th>เอนไซม์</th><th>ช่วงอุณหภูมิที่เหมาะสม</th></tr>
<tr><td>เอนไซม์ทั่วไปของ<b>มนุษย์</b></td><td><b>25–40 °C</b></td></tr>
<tr><td>เอนไซม์ของ<b>แบคทีเรียที่ทนความร้อน</b></td><td><b>65–80 °C</b></td></tr>
</table>
<div class="box why"><b>ทำไมกราฟอุณหภูมิไม่สมมาตร</b><br>
ฝั่งเย็น เอนไซม์แค่<b>ทำงานช้าลง</b> — ย้อนกลับได้ พออุ่นขึ้นก็กลับมาทำงาน<br>
ฝั่งร้อนเกิน โครงสร้างสามมิติ<b>เสียสภาพ</b> บริเวณเร่งพังถาวร — ย้อนกลับไม่ได้ กราฟจึงดิ่งลงชัน</div>
<h4>ค่า pH</h4>
<table>
<tr><th>เอนไซม์</th><th>pH ที่เหมาะสม</th></tr>
<tr><td><b>เพปซิน</b> (กระเพาะอาหาร)</td><td><b>1.5–2</b></td></tr>
<tr><td><b>อะไมเลส</b></td><td><b>ประมาณ 7</b></td></tr>
<tr><td><b>ทริปซิน</b></td><td><b>ประมาณ 8</b></td></tr>
</table>
<p>เหตุผล: <b>pH มีผลต่อประจุของหมู่ R ของกรดแอมิโน</b> → แรงยึดเหนี่ยวภายในโครงสร้างสามมิติเปลี่ยน → <b>รูปร่างบริเวณเร่งเปลี่ยน</b></p>
<div class="box tip"><b>จำเรียงตามทางเดินอาหาร</b> เพปซิน 2 (กระเพาะ กรดจัด) → อะไมเลส 7 → ทริปซิน 8 (ลำไส้ เบสอ่อน) ตัวเลขไล่จากน้อยไปมากพอดี</div>` },

    { id:"c25", t:"c", x:1080, y:500, w:250, c:"#d98324",
      title:"3.6 ตัวยับยั้งเอนไซม์",
      body:"แข่งขัน = แย่งจับ<b>บริเวณเร่ง</b> · รูปร่างคล้ายสารตั้งต้น<br>ไม่แข่งขัน = จับที่อื่น ทำให้เอนไซม์เปลี่ยนรูป",
      detail:`<h3>3.6 ตัวยับยั้งเอนไซม์ (enzyme inhibitor)</h3>
<table>
<tr><th>ประเภท</th><th>จับที่</th><th>กลไก</th></tr>
<tr><td><b>แบบแข่งขัน</b><br>(competitive)</td><td><b>บริเวณเร่ง</b></td><td><b>แย่งจับ</b>กับสารตั้งต้น มักมี<b>รูปร่างบางส่วนคล้ายสารตั้งต้น</b></td></tr>
<tr><td><b>แบบไม่แข่งขัน</b><br>(noncompetitive)</td><td><b>บริเวณอื่นที่ไม่ใช่บริเวณเร่ง</b></td><td>ทำให้เอนไซม์<b>เปลี่ยนรูปร่าง</b> จึงจับกับสารตั้งต้นไม่ได้</td></tr>
</table>
<div class="box tip"><b>แยกให้ขาดด้วยคำถามเดียว</b><br>
"ถ้าเติมสารตั้งต้นเข้าไปมาก ๆ จะแก้ได้ไหม"<br>
<b>แข่งขัน → แก้ได้</b> เพราะเป็นการแย่งที่นั่ง ถ้าสารตั้งต้นมากกว่าก็ชนะ<br>
<b>ไม่แข่งขัน → แก้ไม่ได้</b> เพราะบริเวณเร่งเปลี่ยนรูปไปแล้ว เติมเท่าไรก็เข้าไม่ได้</div>
<div class="box warn"><b>ระวัง</b> ตัวยับยั้งแบบไม่แข่งขัน<b>ไม่ได้</b>ไปนั่งในบริเวณเร่ง แต่ผลลัพธ์คือสารตั้งต้นเข้าไม่ได้เหมือนกัน — อย่าสับสนระหว่าง "จับที่ไหน" กับ "ผลเป็นอย่างไร"</div>` },

    { id:"c26", t:"c", x:1080, y:700, w:250, c:"#d98324",
      title:"3.6b โคแฟกเตอร์และโคเอนไซม์",
      body:"โคแฟกเตอร์ = ไอออน เช่น Ca²⁺ Zn²⁺<br>โคเอนไซม์ = วิตามิน เช่น B1 B2 K",
      detail:`<h3>3.6b องค์ประกอบที่ไม่ใช่โปรตีนของเอนไซม์</h3>
<table>
<tr><th>ชนิด</th><th>คืออะไร</th><th>ตัวอย่างตามเอกสาร</th></tr>
<tr><td><b>โคแฟกเตอร์ (cofactor)</b></td><td>สารพวก<b>ไอออน</b></td><td><b>แคลเซียมไอออน (Ca²⁺) · ซิงค์ไอออน (Zn²⁺)</b></td></tr>
<tr><td><b>โคเอนไซม์ (coenzyme)</b></td><td><b>วิตามิน</b></td><td><b>วิตามิน B1, B2 และ K</b></td></tr>
</table>
<p>สารเหล่านี้<b>จำเป็นต่อการทำงานของเอนไซม์</b> ถ้าแยกออกจากเอนไซม์จะทำให้เอนไซม์<b>ทำงานไม่ได้ตามปกติ</b></p>
<div class="box why"><b>ทำไมเรื่องนี้ถึงเชื่อมกลับไปหาบทที่ 1</b><br>
นี่คือคำตอบว่า<b>ทำไมร่างกายต้องการแร่ธาตุและวิตามินในปริมาณเล็กน้อยแต่ขาดไม่ได้</b> — เพราะมันไปทำหน้าที่เป็นผู้ช่วยของเอนไซม์<br>
ย้อนกลับไปดูตารางธาตุปริมาณน้อย (Fe, Zn, Cu, Mn) ในการ์ด 1.2 ได้เลย ทุกตัวคือโคแฟกเตอร์ของเอนไซม์บางชนิดทั้งสิ้น</div>
<div class="box tip"><b>จำสั้น ๆ</b> โค<u>แฟก</u>เตอร์ = ไ<u>อ</u>ออน · โค<u>เอนไซม์</u> = <u>วิตามิน</u></div>` },

    { id:"c27", t:"c", x:1080, y:900, w:250, c:"#d98324",
      title:"3.7 การเรียกชื่อเอนไซม์",
      body:"ตั้งตามสารตั้งต้น ลงท้าย -ase (ซูเครส อะไมเลส ลิเพส)<br>ชื่อเฉพาะ: เพปซิน ทริปซิน · ระบบสากล: EC number",
      detail:`<h3>3.7 ชื่อเอนไซม์และระบบ EC number</h3>
<ul>
<li>เรียกชื่อ<b>ตามสารตั้งต้น ลงท้ายเสียง -ase</b> เช่น <b>ซูเครส อะไมเลส ลิเพส ยูรีเอส</b></li>
<li>บางชนิดมี<b>ชื่อเฉพาะ</b> เพราะตั้งตอนที่ยังพบเอนไซม์ไม่กี่ชนิด เช่น <b>เพปซิน ทริปซิน</b> (ทั้งคู่ย่อยโปรตีน)</li>
<li>ภายหลังจึงกำหนดระบบสากล <b>Enzyme Commission number (EC number)</b></li>
</ul>
<table>
<tr><th>ระดับ</th><th>รหัส</th><th>ความหมาย</th></tr>
<tr><td>Main class</td><td><b>EC 3</b></td><td>Hydrolases — ใช้<b>น้ำ</b>สลายพันธะ</td></tr>
<tr><td>Subclass</td><td><b>EC 3.4</b></td><td>ทำงานกับ<b>พันธะเพปไทด์</b></td></tr>
<tr><td>Sub-subclass</td><td><b>EC 3.4.11</b></td><td>ตัด<b>กรดแอมิโนตัวแรก</b>ออกจากพอลิเพปไทด์</td></tr>
<tr><td>Identifier</td><td><b>EC 3.4.11.4</b></td><td>ตัดกรดแอมิโนตัวแรกออกจาก<b>ไตรเพปไทด์</b></td></tr>
</table>
<div class="box why"><b>อ่านรหัสอย่างไร</b> ตัวเลขแต่ละหลักที่เพิ่มเข้ามาคือการ<b>ระบุให้แคบลงทีละชั้น</b> เหมือนที่อยู่: ประเทศ → จังหวัด → อำเภอ → บ้านเลขที่</div>
<div class="box warn"><b>ระวัง</b> ไม่ใช่ทุกตัวที่ลงท้าย -ase จะตั้งตามสารตั้งต้น เช่น <b>ดีเอ็นเอพอลิเมอเรส</b> ตั้งตาม<b>สิ่งที่มันสร้าง</b> ไม่ใช่สิ่งที่มันย่อย</div>` },

    { id:"c28", t:"c", x:1080, y:1100, w:250, c:"#d98324",
      title:"3.8 เมแทบอลิซึม",
      body:"แคแทบอลิซึม = สลาย → <b>สร้าง</b> ATP<br>แอแนบอลิซึม = สังเคราะห์ → <b>ใช้</b> ATP",
      detail:`<h3>3.8 เมแทบอลิซึม 2 ฝั่ง</h3>
<p>ปฏิกิริยาเคมีทั้งหมดที่เกิดในสิ่งมีชีวิตเรียกว่า <b>เมแทบอลิซึม (metabolism)</b></p>
<table>
<tr><th></th><th>แคแทบอลิซึม</th><th>แอแนบอลิซึม</th></tr>
<tr><td>ทำอะไร</td><td><b>สลาย</b>โมเลกุลใหญ่เป็นเล็ก</td><td><b>สังเคราะห์</b>โมเลกุลใหญ่จากเล็ก</td></tr>
<tr><td>พลังงาน</td><td><b>ปลดปล่อย</b>พลังงาน</td><td><b>ต้องการ</b>พลังงาน</td></tr>
<tr><td>ตัวอย่าง</td><td>การหายใจระดับเซลล์</td><td>สังเคราะห์โปรตีน คาร์โบไฮเดรต ลิพิด กรดนิวคลีอิก</td></tr>
</table>
<p class="frm">โมเลกุลใหญ่ —(แคแทบอลิซึม)→ โมเลกุลเล็ก + ATP<br>โมเลกุลเล็ก + ATP —(แอแนบอลิซึม)→ โมเลกุลใหญ่</p>
<p>สิ่งมีชีวิตแบ่งเป็น 2 กลุ่ม: <b>สร้างอาหารเองได้</b> (พืช ได้พลังงานจากแสง) และ<b>สร้างอาหารเองไม่ได้</b> (สัตว์ ได้พลังงานจากอาหารที่กิน)</p>
<div class="box tip"><b>ทริคจำ</b> "<b>แคแท</b> = แคะออก (สลาย)" · "<b>แอนา</b> = แอบสร้าง (สังเคราะห์)" — แคแทบอลิซึม<b>ผลิต</b> ATP · แอแนบอลิซึม<b>ใช้</b> ATP</div>
<div class="box warn"><b>ระวัง</b> เมแทบอลิซึมคือ<b>ผลรวมของทั้งสองฝั่ง</b> ไม่ใช่การสลายอย่างเดียว</div>` },

    { id:"c29", t:"c", x:1080, y:1300, w:250, c:"#d98324",
      title:"3.8b วิถีเมแทบอลิซึมและ feedback",
      body:"ผลิตภัณฑ์ของขั้นหนึ่ง = สารตั้งต้นของขั้นถัดไป<br>ผลิตภัณฑ์สุดท้ายมากเกิน → ย้อนไปยับยั้งเอนไซม์<b>ตัวแรก</b>",
      detail:`<h3>3.8b วิถีเมแทบอลิซึม (metabolic pathway)</h3>
` + SVG_FEEDBACK + `
<p>ปฏิกิริยาเคมีมักเกิดต่อเนื่องกันอย่างมีลำดับ โดย<b>ผลิตภัณฑ์ของปฏิกิริยาหนึ่งเป็นสารตั้งต้นของอีกปฏิกิริยาหนึ่ง</b> และ<b>แต่ละขั้นมีเอนไซม์จำเพาะของตัวเอง</b></p>
<p>เอนไซม์ชนิดหนึ่ง ๆ เร่งปฏิกิริยาได้<b>เฉพาะอย่างเท่านั้น</b> เซลล์จึงต้องมีเอนไซม์หลายชนิด ตัวอย่างวิถีคือ<b>ไกลโคลิซิส</b></p>
<h4>การหายใจระดับเซลล์ 3 ขั้น</h4>
<table>
<tr><th>ขั้น</th><th>เกิดที่</th><th>ได้อะไร</th></tr>
<tr><td>1. Glycolysis (กลูโคส → กรดไพรูวิก)</td><td><b>ไซโทซอล</b></td><td>ATP, NADH</td></tr>
<tr><td>2. Krebs Cycle</td><td><b>ไมโทคอนเดรีย</b></td><td>ATP, NADH, ปล่อย CO₂</td></tr>
<tr><td>3. Electron Transport</td><td><b>ไมโทคอนเดรีย</b></td><td>ATP, น้ำ</td></tr>
</table>
<h4>การยับยั้งแบบย้อนกลับ</h4>
<p>เมื่อ<b>ผลิตภัณฑ์สุดท้ายมีมากเกินความจำเป็น</b> มันจะเข้าจับกับ<b>เอนไซม์ตัวแรก ๆ ในวิถี</b> ทำให้เอนไซม์จับสารตั้งต้นไม่ได้ ปฏิกิริยาต่อไปจึงหยุดชะงัก</p>
<div class="box why"><b>ทำไมต้องยับยั้งที่ตัวแรก ไม่ใช่ตัวสุดท้าย</b><br>
ถ้าหยุดกลางทาง สารตัวกลางจะ<b>สะสมค้าง</b>เต็มไปหมด เปลืองวัตถุดิบและอาจเป็นพิษ<br>
หยุดที่ต้นทาง = ปิดก๊อกน้ำ ไม่ใช่ปล่อยน้ำไหลแล้วค่อยเอาถังไปรอง</div>` },

    { id:"c30", t:"c", x:1080, y:1500, w:250, c:"#d98324",
      title:"3.8c ศึกษาลำดับปฏิกิริยา (P→Q→R)",
      body:"สารที่<b>สะสม</b> = อยู่ก่อนจุดที่ถูกบล็อก<br>สารที่<b>ไม่เกิดเพิ่ม</b> = อยู่หลังจุดที่ถูกบล็อก",
      detail:`<h3>3.8c การศึกษาลำดับปฏิกิริยาในวิถีเมแทบอลิซึม</h3>
<p>วิธีศึกษาคือ<b>เติมตัวยับยั้งเอนไซม์</b>ไปขัดขวางเอนไซม์ตัวใดตัวหนึ่ง (เพราะตัวยับยั้งส่วนใหญ่จับกับเอนไซม์ได้ค่อนข้างจำเพาะ) แล้ว<b>วัดปริมาณสารที่สะสมเพิ่มขึ้นหรือลดลง</b></p>
<div class="box why"><b>ตัวอย่างจากเอกสาร</b><br>
วิถี 2 ขั้น มีสาร <b>P, Q, R</b> และเอนไซม์ <b>E₁, E₂</b> · เติมตัวยับยั้งที่ขัดขวาง <b>E₂</b> พบว่า<br>
• สาร <b>Q สะสมมากขึ้น</b> → Q ถูกสร้างต่อได้ แต่ใช้ต่อไม่ได้ → Q อยู่<b>ก่อน</b>จุดที่ถูกบล็อก<br>
• สาร <b>P ค่อย ๆ ลดลง</b> → P ยังเปลี่ยนเป็นอย่างอื่นได้ → P อยู่<b>ก่อน</b> Q<br>
• <b>ไม่เกิดสาร R เพิ่ม</b> → R อยู่<b>หลัง</b>จุดที่ถูกบล็อก<br>
สรุป: <b>P —(E₁)→ Q —(E₂)→ R</b></div>
<div class="box tip"><b>สูตรทำข้อสอบแนวนี้</b><br>
1. หาว่าสารตัวไหน<b>สะสม</b> → ตัวนั้นอยู่<b>ก่อน</b>เอนไซม์ที่ถูกยับยั้งทันที<br>
2. หาว่าสารตัวไหน<b>ไม่เกิดเพิ่ม</b> → ตัวนั้นอยู่<b>หลัง</b><br>
3. สารที่<b>ลดลงเรื่อย ๆ</b> อยู่ต้นทางสุด เพราะยังถูกใช้ต่อไปได้<br>
จำสามข้อนี้แล้วเรียงลำดับได้ทุกข้อ</div>
<div class="box warn"><b>ระวัง</b> อย่าสับสนกับ feedback inhibition — อันนั้นเป็น<b>กลไกควบคุมตามธรรมชาติ</b>ของเซลล์ ส่วนอันนี้เป็น<b>วิธีการทดลอง</b>ที่นักวิทยาศาสตร์ใช้หาลำดับ</div>` },

    /* ---------- เส้นเชื่อม ---------- */
    { id:"n1",  t:"n", a:{id:"c1"},  b:{id:"c2"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n2",  t:"n", a:{id:"c2"},  b:{id:"c3"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n3",  t:"n", a:{id:"c3"},  b:{id:"c4"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n4",  t:"n", a:{id:"c4"},  b:{id:"c5"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n5",  t:"n", a:{id:"c5"},  b:{id:"c6"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n6",  t:"n", a:{id:"c1"},  b:{id:"c7"},  c:"#7c5cd6", w:2.5, arrow:"end", route:"e" },
    { id:"n7",  t:"n", a:{id:"c7"},  b:{id:"c8"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n8",  t:"n", a:{id:"c8"},  b:{id:"c9"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n9",  t:"n", a:{id:"c9"},  b:{id:"c10"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n10", t:"n", a:{id:"c10"}, b:{id:"c11"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n11", t:"n", a:{id:"c11"}, b:{id:"c12"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n12", t:"n", a:{id:"c12"}, b:{id:"c13"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n13", t:"n", a:{id:"c13"}, b:{id:"c14"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n14", t:"n", a:{id:"c7"},  b:{id:"c15"}, c:"#7c5cd6", w:2.5, arrow:"end", route:"e" },
    { id:"n15", t:"n", a:{id:"c15"}, b:{id:"c16"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n16", t:"n", a:{id:"c16"}, b:{id:"c17"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n17", t:"n", a:{id:"c17"}, b:{id:"c18"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n18", t:"n", a:{id:"c18"}, b:{id:"c19"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n19", t:"n", a:{id:"c19"}, b:{id:"c20"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n20", t:"n", a:{id:"c20"}, b:{id:"c21"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n21", t:"n", a:{id:"c21"}, b:{id:"c22"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n22", t:"n", a:{id:"c22"}, b:{id:"c23"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n23", t:"n", a:{id:"c23"}, b:{id:"c24"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n24", t:"n", a:{id:"c24"}, b:{id:"c25"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n25", t:"n", a:{id:"c25"}, b:{id:"c26"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n26", t:"n", a:{id:"c26"}, b:{id:"c27"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n27", t:"n", a:{id:"c27"}, b:{id:"c28"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n28", t:"n", a:{id:"c28"}, b:{id:"c29"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n29", t:"n", a:{id:"c29"}, b:{id:"c30"}, c:"auto", w:2, arrow:"end", route:"e" },

    /* เส้นเชื่อมข้ามบท — แสดงว่าเรื่องไหนต่อยอดจากเรื่องไหน */
    { id:"x1", t:"n", a:{id:"c6"},  b:{id:"c8"},  c:"#2e9e6b", w:1.8, dash:1, arrow:"end", route:"e" },
    { id:"x2", t:"n", a:{id:"c9"},  b:{id:"c21"}, c:"#e05252", w:1.8, dash:1, arrow:"end", route:"e" },
    { id:"x3", t:"n", a:{id:"c12"}, b:{id:"c20"}, c:"#3b7ddd", w:1.8, dash:1, arrow:"end", route:"e" },
    { id:"x4", t:"n", a:{id:"c3"},  b:{id:"c26"}, c:"#d98324", w:1.8, dash:1, arrow:"end", route:"e" },
    { id:"x5", t:"n", a:{id:"c25"}, b:{id:"c30"}, c:"#7c5cd6", w:1.8, dash:1, arrow:"end", route:"e" },

    /* ป้ายกำกับเส้นข้ามบท */
    { id:"lb1", t:"x", x:340, y:1240, w:300, html:"หมู่ฟังก์ชัน → รู้จักน้ำตาลได้", size:13, bold:false, c:"#2e9e6b" },
    { id:"lb2", t:"x", x:620, y:1690, w:320, html:"พันธะ α-1,2 ของซูโครส → วัฏจักรซูเครส", size:13, bold:false, c:"#e05252" },
    { id:"lb3", t:"x", x:660, y:1060, w:300, html:"โปรตีน → เอนไซม์ก็คือโปรตีน", size:13, bold:false, c:"#3b7ddd" },
    { id:"lb4", t:"x", x:1000, y:660, w:330, html:"ธาตุปริมาณน้อย → โคแฟกเตอร์ของเอนไซม์", size:13, bold:false, c:"#d98324" }
  ];

  /* ==========================================================
     บทที่ 4 · โครงสร้างและหน้าที่ของเซลล์
     เพิ่มเติมจากหลักสูตรชีววิทยา ม.4 เล่ม 1 สสวท. บท "เซลล์และการทำงานของเซลล์"
     (เอกสารของครู 3 ไฟล์ครอบคลุมถึงบทที่ 3 เท่านั้น บทนี้จึงอ้างอิงหลักสูตรกลาง)
     ========================================================== */

  /* ---------- รูปประกอบของบทที่ 4 ---------- */

  const SVG_SCALE = `
<svg viewBox="0 0 400 210" width="400" height="210" role="img" aria-label="เปรียบเทียบขนาดของอะตอม ไวรัส แบคทีเรีย และเซลล์">
  <line x1="24" y1="150" x2="380" y2="150" stroke="currentColor" stroke-width="1.6"/>
  <g font-size="10" fill="currentColor" text-anchor="middle">
    <line x1="40" y1="145" x2="40" y2="155" stroke="currentColor" stroke-width="1.4"/><text x="40" y="170">0.1 nm</text>
    <line x1="108" y1="145" x2="108" y2="155" stroke="currentColor" stroke-width="1.4"/><text x="108" y="170">1 nm</text>
    <line x1="176" y1="145" x2="176" y2="155" stroke="currentColor" stroke-width="1.4"/><text x="176" y="170">100 nm</text>
    <line x1="244" y1="145" x2="244" y2="155" stroke="currentColor" stroke-width="1.4"/><text x="244" y="170">1 &#181;m</text>
    <line x1="312" y1="145" x2="312" y2="155" stroke="currentColor" stroke-width="1.4"/><text x="312" y="170">10 &#181;m</text>
    <line x1="368" y1="145" x2="368" y2="155" stroke="currentColor" stroke-width="1.4"/><text x="368" y="170">1 mm</text>
  </g>
  <circle cx="40" cy="126" r="3" fill="#7c5cd6"/>
  <text x="40" y="112" text-anchor="middle" font-size="9.5" fill="#7c5cd6">อะตอม</text>
  <circle cx="108" cy="124" r="5" fill="#3b7ddd"/>
  <text x="108" y="108" text-anchor="middle" font-size="9.5" fill="#3b7ddd">โมเลกุล</text>
  <circle cx="176" cy="120" r="9" fill="#d98324"/>
  <text x="176" y="100" text-anchor="middle" font-size="9.5" fill="#d98324">ไวรัส</text>
  <ellipse cx="244" cy="116" rx="16" ry="9" fill="#2e9e6b"/>
  <text x="244" y="94" text-anchor="middle" font-size="9.5" fill="#2e9e6b">แบคทีเรีย</text>
  <circle cx="312" cy="112" r="20" fill="#e05252" opacity="0.85"/>
  <text x="312" y="80" text-anchor="middle" font-size="9.5" fill="#e05252">เซลล์สัตว์</text>
  <text x="200" y="196" text-anchor="middle" font-size="11" fill="currentColor">1 mm = 1,000 &#181;m = 1,000,000 nm · แกนนี้เพิ่มทีละ 10 เท่า ไม่ใช่ทีละหน่วย</text>
  <text x="200" y="20" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">ตาเปล่าเห็นได้ราว 0.1 mm ขึ้นไป — เซลล์ส่วนใหญ่จึงต้องใช้กล้องจุลทรรศน์</text>
</svg>`;

  const SVG_PROKARYOTE = `
<svg viewBox="0 0 400 210" width="400" height="210" role="img" aria-label="โครงสร้างเซลล์โพรคาริโอต (แบคทีเรีย)">
  <ellipse cx="180" cy="105" rx="120" ry="62" fill="#2e9e6b" opacity="0.12" stroke="#2e9e6b" stroke-width="3"/>
  <ellipse cx="180" cy="105" rx="112" ry="55" fill="none" stroke="#d98324" stroke-width="2.5"/>
  <path d="M120 96 q18 -14 36 0 q18 14 36 0 q18 -14 36 0" fill="none" stroke="#7c5cd6" stroke-width="2.6"/>
  <g fill="#3b7ddd"><circle cx="140" cy="126" r="3.2"/><circle cx="160" cy="134" r="3.2"/><circle cx="184" cy="128" r="3.2"/><circle cx="206" cy="136" r="3.2"/><circle cx="226" cy="124" r="3.2"/><circle cx="150" cy="80" r="3.2"/><circle cx="212" cy="78" r="3.2"/></g>
  <path d="M300 105 q18 -16 30 0 q12 16 26 2" fill="none" stroke="#e05252" stroke-width="2.4"/>
  <g font-size="10.5" fill="currentColor">
    <text x="4" y="46">ผนังเซลล์</text><line x1="46" y1="42" x2="86" y2="62" stroke="currentColor" stroke-width="1"/>
    <text x="4" y="176">เยื่อหุ้มเซลล์</text><line x1="56" y1="168" x2="90" y2="146" stroke="currentColor" stroke-width="1"/>
    <text x="236" y="58" fill="#7c5cd6" font-weight="700">นิวคลีออยด์ (DNA วงกลม)</text>
    <line x1="252" y1="62" x2="222" y2="88" stroke="#7c5cd6" stroke-width="1"/>
    <text x="252" y="168" fill="#3b7ddd" font-weight="700">ไรโบโซม</text>
    <line x1="264" y1="160" x2="232" y2="132" stroke="#3b7ddd" stroke-width="1"/>
    <text x="330" y="86" fill="#e05252" font-weight="700">แฟลเจลลัม</text>
  </g>
  <text x="200" y="200" text-anchor="middle" font-size="11" fill="currentColor"><tspan font-weight="700">ไม่มีนิวเคลียส ไม่มีออร์แกเนลล์ที่มีเยื่อหุ้ม</tspan> · ขนาดราว 1–10 &#181;m</text>
</svg>`;

  const SVG_ANIMALCELL = `<svg viewBox="0 0 400 350" width="400" height="350" role="img" aria-label="แผนผังเซลล์สัตว์พร้อมหมายเลขกำกับออร์แกเนลล์">
  <ellipse cx="200" cy="120" rx="172" ry="106" fill="#3b7ddd" opacity="0.08" stroke="#3b7ddd" stroke-width="3.5"/>
  <circle cx="132" cy="104" r="40" fill="#7c5cd6" opacity="0.32" stroke="#7c5cd6" stroke-width="2.4"/>
  <circle cx="132" cy="104" r="13" fill="#7c5cd6"/>
  <g stroke="#2e9e6b" stroke-width="2.4" fill="none">
    <path d="M186 66 q30 8 24 24 q-6 16 -28 10"/><path d="M190 88 q28 8 22 22 q-6 14 -26 8"/>
  </g>
  <g fill="#2e9e6b"><circle cx="190" cy="68" r="2.4"/><circle cx="200" cy="74" r="2.4"/><circle cx="208" cy="82" r="2.4"/><circle cx="194" cy="93" r="2.4"/><circle cx="204" cy="101" r="2.4"/></g>
  <g stroke="#7c5cd6" stroke-width="2.2" fill="none" opacity="0.75">
    <path d="M240 56 q26 -4 30 10 q4 14 -14 16"/><path d="M248 44 q26 -2 28 12"/>
  </g>
  <g stroke="#d98324" stroke-width="2.8" fill="none">
    <path d="M232 140 q32 -8 44 6"/><path d="M230 152 q32 -8 44 6"/><path d="M230 164 q30 -8 42 6"/>
  </g>
  <circle cx="288" cy="146" r="7" fill="#d98324" opacity="0.65"/>
  <circle cx="300" cy="166" r="6" fill="#d98324" opacity="0.45"/>
  <circle cx="116" cy="166" r="12" fill="#7c5cd6" opacity="0.55"/>
  <ellipse cx="196" cy="188" rx="30" ry="15" fill="#e05252" opacity="0.75"/>
  <path d="M172 188 q10 -9 14 0 q4 9 14 0 q10 -9 14 0" fill="none" stroke="#fff" stroke-width="1.8"/>
  <ellipse cx="312" cy="96" rx="25" ry="12" fill="#e05252" opacity="0.6" transform="rotate(-22 312 96)"/>
  <g fill="#3b7ddd"><circle cx="76" cy="150" r="3"/><circle cx="90" cy="168" r="3"/><circle cx="72" cy="128" r="3"/><circle cx="262" cy="196" r="3"/><circle cx="246" cy="206" r="3"/></g>
  <g stroke="#3b7ddd" stroke-width="2.2" fill="none" opacity="0.7">
    <rect x="58" y="60" width="20" height="10" rx="3"/><rect x="64" y="74" width="20" height="10" rx="3"/>
  </g>
  <g font-size="11" font-weight="700" text-anchor="middle">
    <circle cx="360" cy="30" r="10" fill="#3b7ddd"/><text x="360" y="34" fill="#fff">1</text>
    <circle cx="132" cy="104" r="10" fill="#fff" opacity="0.001"/>
    <circle cx="98" cy="72" r="10" fill="#7c5cd6"/><text x="98" y="76" fill="#fff">2</text>
    <circle cx="150" cy="122" r="10" fill="#4b2fa0"/><text x="150" y="126" fill="#fff">3</text>
    <circle cx="216" cy="62" r="10" fill="#2e9e6b"/><text x="216" y="66" fill="#fff">4</text>
    <circle cx="268" cy="44" r="10" fill="#7c5cd6"/><text x="268" y="48" fill="#fff">5</text>
    <circle cx="252" cy="152" r="10" fill="#d98324"/><text x="252" y="156" fill="#fff">6</text>
    <circle cx="300" cy="166" r="10" fill="#b8651a"/><text x="300" y="170" fill="#fff">7</text>
    <circle cx="116" cy="166" r="10" fill="#5b3fb0"/><text x="116" y="170" fill="#fff">8</text>
    <circle cx="196" cy="188" r="10" fill="#e05252"/><text x="196" y="192" fill="#fff">9</text>
    <circle cx="76" cy="150" r="10" fill="#2f6bc0"/><text x="76" y="154" fill="#fff">10</text>
    <circle cx="68" cy="67" r="10" fill="#1f4f96"/><text x="68" y="71" fill="#fff">11</text>
  </g>
  <line x1="350" y1="32" x2="302" y2="34" stroke="#3b7ddd" stroke-width="1.4"/>
  <g font-size="11" fill="currentColor">
    <text x="14" y="258">1 เยื่อหุ้มเซลล์</text>
    <text x="14" y="278">2 นิวเคลียส</text>
    <text x="14" y="298">3 นิวคลีโอลัส</text>
    <text x="14" y="318">4 ร่างแหเอนโดพลาซึมแบบขรุขระ</text>
    <text x="14" y="338">5 ร่างแหเอนโดพลาซึมแบบเรียบ</text>
    <text x="216" y="258">6 กอลจิคอมเพลกซ์</text>
    <text x="216" y="278">7 เวสิเคิล</text>
    <text x="216" y="298">8 ไลโซโซม</text>
    <text x="216" y="318">9 ไมโทคอนเดรีย</text>
    <text x="216" y="338">10 ไรโบโซม &#183; 11 เซนทริโอล</text>
  </g>
  <line x1="8" y1="238" x2="392" y2="238" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
</svg>`;

  const SVG_PLANTCELL = `<svg viewBox="0 0 400 350" width="400" height="350" role="img" aria-label="แผนผังเซลล์พืชพร้อมหมายเลขกำกับออร์แกเนลล์">
  <rect x="24" y="20" width="352" height="204" rx="12" fill="none" stroke="#2e9e6b" stroke-width="8"/>
  <rect x="34" y="30" width="332" height="184" rx="8" fill="#2e9e6b" opacity="0.07" stroke="#3b7ddd" stroke-width="2.8"/>
  <rect x="96" y="60" width="238" height="128" rx="16" fill="#3b7ddd" opacity="0.2" stroke="#3b7ddd" stroke-width="2.2"/>
  <circle cx="72" cy="104" r="30" fill="#7c5cd6" opacity="0.32" stroke="#7c5cd6" stroke-width="2.2"/>
  <circle cx="72" cy="104" r="10" fill="#7c5cd6"/>
  <g>
    <ellipse cx="180" cy="84" rx="23" ry="13" fill="#2e9e6b" transform="rotate(-18 180 84)"/>
    <ellipse cx="268" cy="118" rx="23" ry="13" fill="#2e9e6b" transform="rotate(20 268 118)"/>
    <ellipse cx="186" cy="176" rx="23" ry="13" fill="#2e9e6b" transform="rotate(8 186 176)"/>
    <g fill="#1d5c3f"><circle cx="174" cy="82" r="2.6"/><circle cx="186" cy="87" r="2.6"/><circle cx="262" cy="116" r="2.6"/><circle cx="274" cy="121" r="2.6"/><circle cx="180" cy="175" r="2.6"/><circle cx="192" cy="179" r="2.6"/></g>
  </g>
  <ellipse cx="82" cy="176" rx="25" ry="12" fill="#e05252" opacity="0.75"/>
  <path d="M62 176 q8 -8 12 0 q4 8 12 0 q8 -8 12 0" fill="none" stroke="#fff" stroke-width="1.6"/>
  <g stroke="#7c5cd6" stroke-width="2.2" fill="none"><path d="M108 66 q26 6 22 20 q-6 14 -24 8"/></g>
  <g stroke="#d98324" stroke-width="2.6" fill="none"><path d="M58 140 q26 -6 34 5"/><path d="M56 150 q26 -6 34 5"/></g>
  <g font-size="11" font-weight="700" text-anchor="middle">
    <circle cx="336" cy="16" r="10" fill="#2e9e6b"/><text x="336" y="20" fill="#fff">1</text>
    <circle cx="368" cy="40" r="10" fill="#2f6bc0"/><text x="368" y="44" fill="#fff">2</text>
    <circle cx="44" cy="76" r="10" fill="#7c5cd6"/><text x="44" y="80" fill="#fff">3</text>
    <circle cx="312" cy="170" r="10" fill="#2f6bc0"/><text x="312" y="174" fill="#fff">4</text>
    <circle cx="268" cy="118" r="10" fill="#1d5c3f"/><text x="268" y="122" fill="#fff">5</text>
    <circle cx="82" cy="176" r="10" fill="#e05252"/><text x="82" y="180" fill="#fff">6</text>
    <circle cx="124" cy="60" r="10" fill="#5b3fb0"/><text x="124" y="64" fill="#fff">7</text>
    <circle cx="52" cy="144" r="10" fill="#b8651a"/><text x="52" y="148" fill="#fff">8</text>
  </g>
  <line x1="332" y1="26" x2="326" y2="34" stroke="#2e9e6b" stroke-width="1.4"/>
  <line x1="362" y1="48" x2="356" y2="56" stroke="#2f6bc0" stroke-width="1.4"/>
  <g font-size="11" fill="currentColor">
    <text x="14" y="258">1 ผนังเซลล์ (เซลลูโลส)</text>
    <text x="14" y="278">2 เยื่อหุ้มเซลล์</text>
    <text x="14" y="298">3 นิวเคลียส</text>
    <text x="14" y="318">4 แวคิวโอลกลาง (ใหญ่มาก)</text>
    <text x="216" y="258">5 คลอโรพลาสต์</text>
    <text x="216" y="278">6 ไมโทคอนเดรีย</text>
    <text x="216" y="298">7 ร่างแหเอนโดพลาซึม</text>
    <text x="216" y="318">8 กอลจิคอมเพลกซ์</text>
  </g>
  <line x1="8" y1="238" x2="392" y2="238" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <text x="200" y="342" text-anchor="middle" font-size="11" fill="currentColor">พืชมีเพิ่มจากสัตว์: <tspan font-weight="700">ผนังเซลล์ &#183; คลอโรพลาสต์ &#183; แวคิวโอลกลาง</tspan> และไม่มีเซนทริโอล</text>
</svg>`;

  const SVG_MEMBRANE = `
<svg viewBox="0 0 400 240" width="400" height="240" role="img" aria-label="แบบจำลองฟลูอิดโมเซอิกของเยื่อหุ้มเซลล์">
  <text x="200" y="18" text-anchor="middle" font-size="11" fill="currentColor">ภายนอกเซลล์</text>
  <g stroke="#2e9e6b" stroke-width="2.2" fill="none">
    <path d="M22 74 l0 42 M30 74 l0 42 M50 74 l0 42 M58 74 l0 42 M78 74 l0 42 M86 74 l0 42 M106 74 l0 42 M114 74 l0 42 M190 74 l0 42 M198 74 l0 42 M218 74 l0 42 M226 74 l0 42 M274 74 l0 42 M282 74 l0 42 M302 74 l0 42 M310 74 l0 42 M330 74 l0 42 M338 74 l0 42 M358 74 l0 42 M366 74 l0 42"/>
    <path d="M22 132 l0 42 M30 132 l0 42 M50 132 l0 42 M58 132 l0 42 M78 132 l0 42 M86 132 l0 42 M106 132 l0 42 M114 132 l0 42 M190 132 l0 42 M198 132 l0 42 M218 132 l0 42 M226 132 l0 42 M274 132 l0 42 M282 132 l0 42 M302 132 l0 42 M310 132 l0 42 M330 132 l0 42 M338 132 l0 42 M358 132 l0 42 M366 132 l0 42"/>
  </g>
  <g fill="#d98324">
    <circle cx="26" cy="68" r="8"/><circle cx="54" cy="68" r="8"/><circle cx="82" cy="68" r="8"/><circle cx="110" cy="68" r="8"/><circle cx="194" cy="68" r="8"/><circle cx="222" cy="68" r="8"/><circle cx="278" cy="68" r="8"/><circle cx="306" cy="68" r="8"/><circle cx="334" cy="68" r="8"/><circle cx="362" cy="68" r="8"/>
    <circle cx="26" cy="180" r="8"/><circle cx="54" cy="180" r="8"/><circle cx="82" cy="180" r="8"/><circle cx="110" cy="180" r="8"/><circle cx="194" cy="180" r="8"/><circle cx="222" cy="180" r="8"/><circle cx="278" cy="180" r="8"/><circle cx="306" cy="180" r="8"/><circle cx="334" cy="180" r="8"/><circle cx="362" cy="180" r="8"/>
  </g>
  <path d="M132 52 h44 v144 h-44 q14 -36 0 -72 q-14 -36 0 -72 z" fill="#3b7ddd" opacity="0.9"/>
  <rect x="144" y="86" width="20" height="76" fill="#fff" opacity="0.55"/>
  <ellipse cx="248" cy="124" rx="22" ry="34" fill="#7c5cd6" opacity="0.9"/>
  <path d="M244 92 q10 -16 24 -12 q-6 12 6 18" fill="none" stroke="#e05252" stroke-width="2.4"/>
  <circle cx="268" cy="82" r="3.4" fill="#e05252"/><circle cx="256" cy="76" r="3.4" fill="#e05252"/>
  <ellipse cx="160" cy="124" rx="7" ry="20" fill="none" stroke="#fff" stroke-width="0"/>
  <rect x="86" y="112" width="12" height="26" rx="5" fill="#e05252" opacity="0.65"/>
  <g font-size="10" fill="currentColor">
    <text x="130" y="42" fill="#3b7ddd" font-weight="700">โปรตีนช่อง</text>
    <text x="216" y="222" fill="#7c5cd6" font-weight="700">โปรตีนฝังในเยื่อ</text>
    <text x="286" y="48" fill="#e05252" font-weight="700">ไกลโคโปรตีน</text>
    <line x1="292" y1="52" x2="272" y2="74" stroke="#e05252" stroke-width="1"/>
    <text x="4" y="42" fill="#d98324" font-weight="700">หัวชอบน้ำ</text>
    <line x1="42" y1="46" x2="26" y2="58" stroke="#d98324" stroke-width="1"/>
    <text x="4" y="222" fill="#2e9e6b" font-weight="700">หางหนีน้ำ</text>
    <line x1="42" y1="214" x2="30" y2="176" stroke="#2e9e6b" stroke-width="1"/>
    <text x="70" y="158" fill="#e05252" font-size="9">คอเลสเตอรอล</text>
  </g>
  <text x="200" y="238" text-anchor="middle" font-size="11" fill="currentColor">หนาประมาณ 7–8 nm · โปรตีนลอยอยู่ในชั้นไขมันที่ไหลได้ จึงเรียก <tspan font-weight="700">ฟลูอิดโมเซอิก</tspan></text>
</svg>`;

  const SVG_NUCLEUS = `
<svg viewBox="0 0 400 220" width="400" height="220" role="img" aria-label="โครงสร้างของนิวเคลียส">
  <circle cx="176" cy="110" r="88" fill="#7c5cd6" opacity="0.12" stroke="#7c5cd6" stroke-width="3"/>
  <circle cx="176" cy="110" r="80" fill="none" stroke="#7c5cd6" stroke-width="2.4"/>
  <g fill="#e05252">
    <circle cx="176" cy="22" r="5"/><circle cx="240" cy="48" r="5"/><circle cx="264" cy="110" r="5"/><circle cx="240" cy="172" r="5"/><circle cx="176" cy="198" r="5"/><circle cx="112" cy="172" r="5"/><circle cx="88" cy="110" r="5"/><circle cx="112" cy="48" r="5"/>
  </g>
  <circle cx="150" cy="96" r="24" fill="#7c5cd6"/>
  <g stroke="#3b7ddd" stroke-width="2.2" fill="none" opacity="0.85">
    <path d="M118 140 q22 -16 44 2 q22 18 46 -6"/>
    <path d="M124 158 q26 -12 48 6 q22 18 44 -4"/>
    <path d="M136 66 q22 14 44 -4"/>
  </g>
  <g stroke="#2e9e6b" stroke-width="2" fill="none">
    <path d="M264 90 q26 6 20 20 q-6 14 -24 8"/>
    <path d="M268 74 q30 4 24 18"/>
  </g>
  <g font-size="10.5" fill="currentColor">
    <text x="288" y="34" fill="#7c5cd6" font-weight="700">เยื่อหุ้มนิวเคลียส</text>
    <text x="316" y="47" fill="#7c5cd6" font-size="9">(2 ชั้น)</text>
    <line x1="300" y1="38" x2="244" y2="66" stroke="#7c5cd6" stroke-width="1"/>
    <text x="284" y="200" fill="#e05252" font-weight="700">รูที่เยื่อหุ้มนิวเคลียส</text>
    <line x1="300" y1="192" x2="248" y2="168" stroke="#e05252" stroke-width="1"/>
    <text x="4" y="52" fill="#7c5cd6" font-weight="700">นิวคลีโอลัส</text>
    <line x1="52" y1="56" x2="132" y2="86" stroke="#7c5cd6" stroke-width="1"/>
    <text x="4" y="206" fill="#3b7ddd" font-weight="700">โครมาทิน (DNA + โปรตีน)</text>
    <line x1="70" y1="198" x2="126" y2="158" stroke="#3b7ddd" stroke-width="1"/>
    <text x="292" y="120" fill="#2e9e6b" font-size="9.5">ร่างแหเอนโดพลาซึม</text>
    <text x="300" y="133" fill="#2e9e6b" font-size="9.5">ต่อกับเยื่อหุ้มนิวเคลียส</text>
  </g>
</svg>`;

  const SVG_ENDOMEMBRANE = `
<svg viewBox="0 0 400 210" width="400" height="210" role="img" aria-label="เส้นทางการสร้างและส่งออกโปรตีนในระบบเยื่อหุ้มภายใน">
  <circle cx="44" cy="96" r="30" fill="#7c5cd6" opacity="0.3" stroke="#7c5cd6" stroke-width="2.2"/>
  <circle cx="44" cy="96" r="10" fill="#7c5cd6"/>
  <g stroke="#2e9e6b" stroke-width="2.6" fill="none">
    <path d="M88 76 q30 6 24 22 q-6 16 -28 10"/>
    <path d="M92 100 q28 6 22 20 q-6 14 -26 8"/>
  </g>
  <g fill="#2e9e6b"><circle cx="92" cy="78" r="2.4"/><circle cx="102" cy="84" r="2.4"/><circle cx="110" cy="92" r="2.4"/><circle cx="96" cy="103" r="2.4"/><circle cx="106" cy="112" r="2.4"/></g>
  <circle cx="158" cy="96" r="9" fill="#d98324" opacity="0.55"/>
  <g stroke="#d98324" stroke-width="3" fill="none">
    <path d="M196 66 q34 -8 46 6"/><path d="M194 82 q34 -8 46 6"/><path d="M194 98 q32 -8 44 6"/><path d="M196 114 q30 -8 42 6"/>
  </g>
  <circle cx="276" cy="66" r="9" fill="#d98324" opacity="0.55"/>
  <circle cx="276" cy="130" r="11" fill="#7c5cd6" opacity="0.6"/>
  <g stroke="#3b7ddd" stroke-width="3" fill="none"><path d="M340 26 l0 160"/></g>
  <g fill="#d98324"><circle cx="330" cy="78" r="7" opacity="0.55"/></g>
  <g stroke="currentColor" stroke-width="1.8" fill="none" marker-end="none">
    <path d="M78 96 l6 0"/><path d="M126 96 l22 0"/><path d="M170 92 l18 -10"/><path d="M246 78 l20 -8"/><path d="M246 104 l20 18"/><path d="M290 66 l32 8"/>
  </g>
  <g font-size="10" fill="currentColor" text-anchor="middle">
    <text x="44" y="146" fill="#7c5cd6" font-weight="700">นิวเคลียส</text>
    <text x="106" y="146" fill="#2e9e6b" font-weight="700">ER ขรุขระ</text>
    <text x="106" y="158" fill="#2e9e6b" font-size="9">สร้างโปรตีน</text>
    <text x="218" y="146" fill="#d98324" font-weight="700">กอลจิคอมเพลกซ์</text>
    <text x="218" y="158" fill="#d98324" font-size="9">ดัดแปลง · คัดแยก · บรรจุ</text>
    <text x="276" y="158" fill="#7c5cd6" font-size="9.5">ไลโซโซม</text>
    <text x="344" y="200" fill="#3b7ddd" font-size="9.5">เยื่อหุ้มเซลล์</text>
    <text x="158" y="80" font-size="9">เวสิเคิล</text>
  </g>
  <text x="200" y="18" text-anchor="middle" font-size="11.5" fill="currentColor" font-weight="700">เส้นทางเดียวกันทั้งหมด: สร้าง → ดัดแปลง → ส่งถึงที่</text>
</svg>`;

  const SVG_MITO = `
<svg viewBox="0 0 400 200" width="400" height="200" role="img" aria-label="โครงสร้างไมโทคอนเดรีย">
  <ellipse cx="180" cy="100" rx="130" ry="68" fill="#e05252" opacity="0.12" stroke="#e05252" stroke-width="3"/>
  <ellipse cx="180" cy="100" rx="120" ry="58" fill="none" stroke="#e05252" stroke-width="2.4"/>
  <g stroke="#e05252" stroke-width="2.4" fill="none">
    <path d="M96 58 q26 14 0 28 q-26 14 0 26"/>
    <path d="M140 52 q28 16 0 32 q-28 16 0 30"/>
    <path d="M186 50 q28 16 0 34 q-28 16 0 32"/>
    <path d="M232 54 q26 14 0 30 q-26 14 0 28"/>
  </g>
  <g fill="#3b7ddd"><circle cx="118" cy="100" r="3"/><circle cx="164" cy="104" r="3"/><circle cx="210" cy="96" r="3"/><circle cx="256" cy="102" r="3"/></g>
  <path d="M268 118 q10 -10 18 0" fill="none" stroke="#7c5cd6" stroke-width="2.4"/>
  <g font-size="10.5" fill="currentColor">
    <text x="4" y="30" fill="#e05252" font-weight="700">เยื่อชั้นนอก (เรียบ)</text>
    <line x1="80" y1="34" x2="94" y2="48" stroke="#e05252" stroke-width="1"/>
    <text x="256" y="30" fill="#e05252" font-weight="700">เยื่อชั้นใน พับเป็น "คริสตี"</text>
    <line x1="290" y1="34" x2="236" y2="60" stroke="#e05252" stroke-width="1"/>
    <text x="4" y="182" fill="#3b7ddd" font-weight="700">เมทริกซ์</text>
    <line x1="42" y1="174" x2="110" y2="126" stroke="#3b7ddd" stroke-width="1"/>
    <text x="396" y="178" fill="#7c5cd6" font-size="9" text-anchor="end">มี DNA และไรโบโซมของตัวเอง</text>
  </g>
  <text x="200" y="196" text-anchor="middle" font-size="11" fill="currentColor">พับเป็นคริสตีเพื่อ<tspan font-weight="700">เพิ่มพื้นที่ผิว</tspan> ให้วางเอนไซม์สร้าง ATP ได้มากขึ้น</text>
</svg>`;

  const SVG_CHLORO = `
<svg viewBox="0 0 400 200" width="400" height="200" role="img" aria-label="โครงสร้างคลอโรพลาสต์">
  <ellipse cx="180" cy="100" rx="132" ry="66" fill="#2e9e6b" opacity="0.12" stroke="#2e9e6b" stroke-width="3"/>
  <ellipse cx="180" cy="100" rx="122" ry="56" fill="none" stroke="#2e9e6b" stroke-width="2.2"/>
  <g fill="#2e9e6b">
    <g><rect x="94" y="72" width="34" height="5" rx="2.5"/><rect x="94" y="80" width="34" height="5" rx="2.5"/><rect x="94" y="88" width="34" height="5" rx="2.5"/><rect x="94" y="96" width="34" height="5" rx="2.5"/><rect x="94" y="104" width="34" height="5" rx="2.5"/></g>
    <g><rect x="160" y="62" width="34" height="5" rx="2.5"/><rect x="160" y="70" width="34" height="5" rx="2.5"/><rect x="160" y="78" width="34" height="5" rx="2.5"/><rect x="160" y="86" width="34" height="5" rx="2.5"/><rect x="160" y="94" width="34" height="5" rx="2.5"/><rect x="160" y="102" width="34" height="5" rx="2.5"/></g>
    <g><rect x="226" y="86" width="34" height="5" rx="2.5"/><rect x="226" y="94" width="34" height="5" rx="2.5"/><rect x="226" y="102" width="34" height="5" rx="2.5"/><rect x="226" y="110" width="34" height="5" rx="2.5"/></g>
  </g>
  <path d="M128 100 q16 12 32 -4" fill="none" stroke="#2e9e6b" stroke-width="2"/>
  <path d="M194 92 q16 12 32 4" fill="none" stroke="#2e9e6b" stroke-width="2"/>
  <ellipse cx="150" cy="134" rx="14" ry="8" fill="#d98324" opacity="0.7"/>
  <g font-size="10.5" fill="currentColor">
    <text x="4" y="28" fill="#2e9e6b" font-weight="700">เยื่อหุ้ม 2 ชั้น</text>
    <line x1="64" y1="32" x2="86" y2="52" stroke="#2e9e6b" stroke-width="1"/>
    <text x="268" y="34" fill="#2e9e6b" font-weight="700">กรานุม</text>
    <text x="272" y="47" font-size="9" fill="#2e9e6b">(ไทลาคอยด์ซ้อนกัน)</text>
    <line x1="284" y1="52" x2="250" y2="82" stroke="#2e9e6b" stroke-width="1"/>
    <text x="4" y="180" fill="currentColor" font-weight="700">สโตรมา</text>
    <line x1="40" y1="172" x2="96" y2="130" stroke="currentColor" stroke-width="1"/>
    <text x="172" y="160" fill="#d98324" font-size="9.5">เม็ดแป้ง</text>
  </g>
  <text x="200" y="194" text-anchor="middle" font-size="11" fill="currentColor">คลอโรฟิลล์อยู่ที่<tspan font-weight="700">เยื่อไทลาคอยด์</tspan> · การสร้างน้ำตาลเกิดใน<tspan font-weight="700">สโตรมา</tspan></text>
</svg>`;

  const SVG_ENDOEXO = `<svg viewBox="0 0 400 180" width="400" height="180" role="img" aria-label="เอนโดไซโทซิสและเอกโซไซโทซิส">
  <text x="100" y="16" text-anchor="middle" font-size="11" fill="currentColor" font-weight="700">เอนโดไซโทซิส — นำเข้า</text>
  <text x="300" y="16" text-anchor="middle" font-size="11" fill="currentColor" font-weight="700">เอกโซไซโทซิส — ปล่อยออก</text>
  <path d="M14 66 q28 0 40 -18 q12 -18 32 -18 q20 0 32 18 q12 18 40 18" fill="none" stroke="#d98324" stroke-width="5"/>
  <path d="M14 86 q28 0 40 18 q12 18 32 18 q20 0 32 -18 q12 -18 40 -18" fill="none" stroke="#d98324" stroke-width="5"/>
  <g fill="#e05252"><circle cx="86" cy="26" r="7"/><circle cx="70" cy="14" r="5"/><circle cx="102" cy="14" r="5"/></g>
  <circle cx="88" cy="128" r="16" fill="none" stroke="#d98324" stroke-width="4"/>
  <circle cx="88" cy="128" r="6" fill="#e05252"/>
  <path d="M88 96 l0 12" stroke="currentColor" stroke-width="2"/>
  <path d="M83 106 h10 l-5 10 z" fill="currentColor"/>
  <text x="100" y="164" text-anchor="middle" font-size="9.5" fill="currentColor">เยื่อหุ้มเว้าโอบสารเข้ามาเป็นถุง</text>
  <path d="M214 66 q28 0 40 -18 q12 -18 32 -18 q20 0 32 18 q12 18 40 18" fill="none" stroke="#d98324" stroke-width="5" opacity="0.35"/>
  <path d="M214 76 h172" stroke="#d98324" stroke-width="5"/>
  <path d="M214 96 h172" stroke="#d98324" stroke-width="5"/>
  <circle cx="286" cy="132" r="16" fill="none" stroke="#d98324" stroke-width="4"/>
  <circle cx="286" cy="132" r="6" fill="#2e9e6b"/>
  <path d="M286 110 l0 -12" stroke="currentColor" stroke-width="2"/>
  <path d="M281 102 h10 l-5 -10 z" fill="currentColor"/>
  <g fill="#2e9e6b"><circle cx="286" cy="44" r="6"/><circle cx="268" cy="30" r="5"/><circle cx="306" cy="32" r="5"/></g>
  <text x="300" y="164" text-anchor="middle" font-size="9.5" fill="currentColor">เวสิเคิลเชื่อมกับเยื่อหุ้มแล้วปล่อยสารออก</text>
  <text x="200" y="178" text-anchor="middle" font-size="10" fill="currentColor">ทั้งสองแบบ<tspan font-weight="700">ใช้ ATP</tspan> เพราะต้องเปลี่ยนรูปร่างของเยื่อหุ้ม</text>
</svg>`;

  const SVG_TRANSPORT = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="การแพร่ การแพร่แบบฟาซิลิเทต และการลำเลียงแบบใช้พลังงาน">
  <text x="200" y="16" text-anchor="middle" font-size="10.5" fill="currentColor">ภายนอกเซลล์ &#183; ความเข้มข้นสูง</text>
  <g fill="#d98324"><rect x="12" y="86" width="376" height="9" rx="4"/><rect x="12" y="121" width="376" height="9" rx="4"/></g>
  <rect x="12" y="95" width="376" height="26" fill="#2e9e6b" opacity="0.28"/>
  <rect x="180" y="80" width="26" height="56" rx="6" fill="#3b7ddd"/>
  <rect x="187" y="86" width="12" height="44" rx="4" fill="#fff" opacity="0.65"/>
  <rect x="300" y="80" width="30" height="56" rx="6" fill="#7c5cd6"/>
  <rect x="308" y="86" width="14" height="18" rx="4" fill="#fff" opacity="0.6"/>
  <circle cx="352" cy="108" r="11" fill="#d98324"/>
  <text x="352" y="112" text-anchor="middle" font-size="8.5" fill="#fff" font-weight="700">ATP</text>
  <path d="M341 108 h-6" stroke="#d98324" stroke-width="2"/>
  <g fill="#e05252">
    <circle cx="60" cy="52" r="6"/><circle cx="82" cy="38" r="6"/><circle cx="40" cy="38" r="6"/><circle cx="60" cy="166" r="6"/>
    <circle cx="193" cy="48" r="6"/><circle cx="193" cy="166" r="6"/>
    <circle cx="315" cy="166" r="6"/><circle cx="315" cy="50" r="6"/><circle cx="345" cy="172" r="6"/><circle cx="286" cy="172" r="6"/>
  </g>
  <g stroke="#e05252" stroke-width="2.2" fill="none">
    <path d="M60 60 l0 96"/><path d="M193 56 l0 100"/><path d="M315 158 l0 -100"/>
  </g>
  <g fill="#e05252">
    <path d="M55 158 h10 l-5 10 z"/><path d="M188 158 h10 l-5 10 z"/><path d="M310 60 h10 l-5 -10 z"/>
  </g>
  <text x="200" y="190" text-anchor="middle" font-size="10.5" fill="currentColor">ภายในเซลล์ &#183; ความเข้มข้นต่ำ</text>
  <g font-size="10.5" text-anchor="middle" font-weight="700">
    <text x="60" y="214" fill="currentColor">การแพร่</text>
    <text x="193" y="214" fill="#3b7ddd">แพร่แบบฟาซิลิเทต</text>
    <text x="315" y="214" fill="#7c5cd6">ใช้พลังงาน</text>
  </g>
  <g font-size="9" text-anchor="middle" fill="currentColor">
    <text x="60" y="228">ผ่านชั้นไขมันเอง</text><text x="60" y="240">ไม่ใช้โปรตีน ไม่ใช้ ATP</text>
    <text x="193" y="228">ผ่านโปรตีนช่อง</text><text x="193" y="240">ใช้โปรตีน ไม่ใช้ ATP</text>
    <text x="315" y="228">ทวนความเข้มข้น</text><text x="315" y="240">ใช้โปรตีน และใช้ ATP</text>
  </g>
</svg>`;

  const SVG_OSMOSIS = `<svg viewBox="0 0 400 270" width="400" height="270" role="img" aria-label="เซลล์สัตว์และเซลล์พืชในสารละลายไฮเพอร์โทนิก ไอโซโทนิก และไฮโพโทนิก">
  <g font-size="11" fill="currentColor" text-anchor="middle" font-weight="700">
    <text x="72" y="18">ไฮเพอร์โทนิก</text><text x="200" y="18">ไอโซโทนิก</text><text x="330" y="18">ไฮโพโทนิก</text>
  </g>
  <g font-size="9" fill="currentColor" text-anchor="middle">
    <text x="72" y="31">นอกเซลล์เข้มข้นกว่า</text><text x="200" y="31">เท่ากัน</text><text x="330" y="31">นอกเซลล์เจือจางกว่า</text>
  </g>
  <text x="14" y="82" font-size="11" fill="currentColor" font-weight="700">สัตว์</text>
  <path d="M48 84 q10 -14 24 -6 q14 -10 22 6 q10 14 -6 22 q-14 12 -30 2 q-16 -10 -10 -24 z" fill="#e05252" opacity="0.6" stroke="#e05252" stroke-width="2"/>
  <circle cx="200" cy="92" r="24" fill="#e05252" opacity="0.6" stroke="#e05252" stroke-width="2"/>
  <circle cx="330" cy="92" r="30" fill="#e05252" opacity="0.6" stroke="#e05252" stroke-width="2.6" stroke-dasharray="6 4"/>
  <g font-size="9.5" fill="currentColor" text-anchor="middle">
    <text x="72" y="140">เหี่ยว (น้ำออก)</text><text x="200" y="140">ปกติ ดีที่สุดสำหรับสัตว์</text><text x="330" y="140">บวม อาจแตก</text>
  </g>
  <text x="14" y="196" font-size="11" fill="currentColor" font-weight="700">พืช</text>
  <rect x="44" y="164" width="60" height="50" rx="4" fill="none" stroke="#2e9e6b" stroke-width="3.5"/>
  <rect x="58" y="176" width="32" height="26" rx="5" fill="#3b7ddd" opacity="0.4" stroke="#3b7ddd" stroke-width="2"/>
  <rect x="170" y="164" width="60" height="50" rx="4" fill="none" stroke="#2e9e6b" stroke-width="3.5"/>
  <rect x="177" y="171" width="46" height="36" rx="5" fill="#3b7ddd" opacity="0.4" stroke="#3b7ddd" stroke-width="2"/>
  <rect x="300" y="164" width="60" height="50" rx="4" fill="none" stroke="#2e9e6b" stroke-width="3.5"/>
  <rect x="304" y="168" width="52" height="42" rx="4" fill="#3b7ddd" opacity="0.55" stroke="#3b7ddd" stroke-width="2.4"/>
  <g font-size="9.5" fill="currentColor" text-anchor="middle">
    <text x="72" y="232">พลาสโมไลซิส</text><text x="200" y="232">ไม่เต่ง</text><text x="330" y="232">เต่ง ดีที่สุดสำหรับพืช</text>
  </g>
  <text x="200" y="256" text-anchor="middle" font-size="10.5" fill="currentColor">พืชไม่แตกเพราะมี<tspan font-weight="700">ผนังเซลล์</tspan>ต้านแรงดันไว้</text>
  <text x="200" y="268" text-anchor="middle" font-size="10.5" fill="currentColor">จำว่า <tspan font-weight="700">น้ำวิ่งไปหาที่เข้มข้นกว่า</tspan> เสมอ</text>
</svg>`;

  /* ---------- บล็อกเนื้อหาบทที่ 4 ---------- */
  const CH4 = [

    { type: "divider" },
    { type: "h1", text: "บทที่ 4 · โครงสร้างและหน้าที่ของเซลล์" },

    { type: "callout", html: "บทที่ 1–3 พูดเรื่อง<b>สาร</b>กับ<b>ปฏิกิริยา</b> บทนี้คือการเอาทั้งหมดมาประกอบเป็น<b>ที่อยู่จริง</b> — เซลล์ ฟอสโฟลิพิดกลายเป็นเยื่อหุ้ม โปรตีนกลายเป็นเอนไซม์กับช่องลำเลียง DNA อยู่ในนิวเคลียส และเอนไซม์ทั้งหมดถูกจัดวางไว้คนละห้องเพื่อไม่ให้ปฏิกิริยาชนกัน",
      detail: `<h3>ทำไมต้องมีบทนี้</h3>
<p>หัวข้อนี้ชื่อว่า "เซลล์ของสิ่งมีชีวิต" ดังนั้นสามบทแรกเป็นเพียง<b>วัสดุก่อสร้าง</b> ส่วนบทนี้คือ<b>ตัวอาคาร</b></p>
<div class="box why"><b>แนวคิดเดียวที่ร้อยทั้งบท: การแบ่งห้อง (compartmentalization)</b><br>
เซลล์ยูคาริโอตแก้ปัญหาใหญ่ข้อหนึ่งด้วยการสร้าง "ห้อง" ที่มีเยื่อหุ้มแยกจากกัน<br>
• เอนไซม์ย่อยสลายที่รุนแรงถูกขังไว้ใน<b>ไลโซโซม</b> ไม่ให้ย่อยเซลล์ตัวเอง<br>
• ปฏิกิริยาสร้าง ATP ถูกจัดไว้ใน<b>ไมโทคอนเดรีย</b> ซึ่งมีเยื่อพับเพิ่มพื้นที่ผิว<br>
• DNA ถูกเก็บใน<b>นิวเคลียส</b> แยกจากไซโทพลาซึมที่วุ่นวาย<br>
ถ้าเข้าใจหลักนี้ จะเดาหน้าที่ของออร์แกเนลล์ได้เกือบทุกตัวโดยไม่ต้องท่อง</div>
<div class="box tip"><b>หมายเหตุเรื่องแหล่งอ้างอิง</b> เอกสารของครู 3 ไฟล์ครอบคลุมถึงบทที่ 3 (ปฏิกิริยาเคมีในสิ่งมีชีวิต) บทนี้จึงเรียบเรียงตาม<b>หลักสูตรชีววิทยา ม.4 เล่ม 1 ของ สสวท. บท "เซลล์และการทำงานของเซลล์"</b> ถ้าครูแจกเอกสารบทนี้เมื่อไร ควรเทียบตัวเลขและคำศัพท์อีกรอบ</div>` },

    { type: "h2", text: "4.1 กล้องจุลทรรศน์และทฤษฎีเซลล์" },

    { type: "p", html: "เซลล์ส่วนใหญ่มีขนาดเล็กเกินกว่าตาเปล่าจะมองเห็น การค้นพบเซลล์จึงเกิดขึ้นได้ก็ต่อเมื่อมี<b>กล้องจุลทรรศน์</b> ความรู้เรื่องเซลล์กับเครื่องมือจึงเดินมาด้วยกันเสมอ",
      detail: `<h3>4.1.1 ขนาดของสิ่งต่าง ๆ — ให้เห็นภาพก่อนจำตัวเลข</h3>
` + SVG_SCALE + `
<table>
<tr><th>สิ่งที่วัด</th><th>ขนาดโดยประมาณ</th></tr>
<tr><td>อะตอม</td><td>ราว 0.1 nm</td></tr>
<tr><td>โมเลกุลโปรตีน</td><td>ไม่กี่ nm</td></tr>
<tr><td>ไวรัส</td><td>20–300 nm</td></tr>
<tr><td><b>แบคทีเรีย</b></td><td><b>1–10 &#181;m</b> (E. coli กว้างราว 1 &#181;m ยาวราว 2 &#181;m)</td></tr>
<tr><td>ยีสต์</td><td>ราว 6 &#181;m</td></tr>
<tr><td><b>เซลล์สัตว์ทั่วไป</b></td><td><b>10–30 &#181;m</b></td></tr>
<tr><td><b>เซลล์พืชทั่วไป</b></td><td><b>10–100 &#181;m</b></td></tr>
<tr><td>ไข่ไก่ (เซลล์เดียว)</td><td>หลายเซนติเมตร</td></tr>
</table>
<p class="frm">1 mm = 1,000 &#181;m &nbsp;·&nbsp; 1 &#181;m = 1,000 nm</p>
<div class="box why"><b>ทำไมเซลล์ถึงใหญ่ไม่ได้มาก</b><br>
เมื่อเซลล์โตขึ้น <b>ปริมาตรเพิ่มเป็นกำลังสาม แต่พื้นที่ผิวเพิ่มเป็นกำลังสอง</b><br>
เซลล์ทรงกลมรัศมี 1 หน่วย มีอัตราส่วนพื้นที่ผิวต่อปริมาตร = 3 แต่ถ้ารัศมี 3 หน่วย เหลือเพียง 1<br>
พื้นที่ผิวคือ "ประตู" ที่สารเข้าออก ส่วนปริมาตรคือ "ปากที่ต้องเลี้ยง" — โตเกินไปแล้วลำเลียงสารไม่ทัน เซลล์จึงเล็กและแบ่งตัวแทนที่จะโตขึ้นเรื่อย ๆ</div>
<div class="box tip"><b>ทริคทำข้อสอบ</b> เจอโจทย์ถามว่าเซลล์ใดลำเลียงสารได้ดีกว่ากัน ให้คิดที่ <b>พื้นที่ผิว ÷ ปริมาตร</b> เสมอ ยิ่งค่ามากยิ่งแลกเปลี่ยนสารได้ดี นี่คือเหตุผลเดียวกับที่ลำไส้เล็กมีวิลไล และไมโทคอนเดรียพับเยื่อเป็นคริสตี</div>` },

    { type: "table", rows: [
      ["ข้อของทฤษฎีเซลล์", "ใจความ", "ผู้เสนอ"],
      ["ข้อที่ 1", "สิ่งมีชีวิตทั้งหมดประกอบด้วยเซลล์", "ชไลเดน (พืช) และ ชวานน์ (สัตว์)"],
      ["ข้อที่ 2", "เซลล์เป็นหน่วยพื้นฐานที่เล็กที่สุดของสิ่งมีชีวิต", "ชไลเดน และ ชวานน์"],
      ["ข้อที่ 3", "เซลล์เกิดจากเซลล์ที่มีอยู่เดิมเท่านั้น", "เวอร์โชว์ (Virchow)"]
    ], detail: `<h3>4.1.2 ทฤษฎีเซลล์ และเครื่องมือที่ทำให้มันเกิดขึ้นได้</h3>
<p>ลำดับเหตุการณ์สั้น ๆ ที่ควรจำ</p>
<ul>
<li><b>รอเบิร์ต ฮุก</b> ส่องไม้คอร์กแล้วเห็นช่องเล็ก ๆ เรียกว่า <i>cell</i> — แต่สิ่งที่เห็นจริง ๆ คือ<b>ผนังเซลล์ของเซลล์ที่ตายแล้ว</b></li>
<li><b>เลเวนฮุก</b> เป็นคนแรกที่เห็น<b>เซลล์ที่มีชีวิต</b> เช่น แบคทีเรียและโพรโทซัว</li>
<li><b>ชไลเดนและชวานน์</b> สรุปว่าทั้งพืชและสัตว์ประกอบด้วยเซลล์</li>
<li><b>เวอร์โชว์</b> เติมข้อที่ 3 ซึ่งหักล้างความเชื่อเรื่องสิ่งมีชีวิตเกิดขึ้นเองจากสิ่งไม่มีชีวิต</li>
</ul>
<div class="box why"><b>ทำไมข้อที่ 3 ถึงสำคัญที่สุด</b><br>
สองข้อแรกบอกว่า "ทุกอย่างทำจากเซลล์" ซึ่งเป็นการอธิบาย<b>โครงสร้าง</b><br>
ข้อที่ 3 บอกว่าเซลล์ต้องมาจากเซลล์ ซึ่งเป็นการอธิบาย<b>ความต่อเนื่องของชีวิต</b> — แปลว่าสายของเซลล์ที่ประกอบเป็นตัวเรา ต่อกันไม่ขาดตอนย้อนกลับไปถึงเซลล์แรกของโลก และเป็นรากฐานของเรื่องการแบ่งเซลล์และพันธุกรรมที่จะเรียนต่อไป</div>
<h4>กล้องจุลทรรศน์ 2 ประเภทหลัก</h4>
<table>
<tr><th></th><th>กล้องใช้แสง (light microscope)</th><th>กล้องอิเล็กตรอน (electron microscope)</th></tr>
<tr><td>ใช้อะไรส่อง</td><td>แสง</td><td>ลำอิเล็กตรอน</td></tr>
<tr><td>กำลังขยายใช้งานจริง</td><td>ราว 1,000 เท่า</td><td>หลายแสนเท่า</td></tr>
<tr><td>ดูตัวอย่างมีชีวิตได้ไหม</td><td><b>ได้</b></td><td><b>ไม่ได้</b> (ต้องอยู่ในสุญญากาศ)</td></tr>
<tr><td>เห็นอะไร</td><td>เซลล์ นิวเคลียส คลอโรพลาสต์</td><td>รายละเอียดของออร์แกเนลล์ เยื่อหุ้ม ไรโบโซม</td></tr>
</table>
<div class="box warn"><b>แยกให้ออก: กำลังขยาย vs กำลังแยกภาพ</b><br>
<b>กำลังขยาย (magnification)</b> = ทำให้ภาพใหญ่ขึ้นกี่เท่า — คำนวณจาก กำลังขยายเลนส์ใกล้วัตถุ × กำลังขยายเลนส์ใกล้ตา<br>
<b>กำลังแยกภาพ (resolution)</b> = ความสามารถในการแยกจุดสองจุดที่อยู่ชิดกันให้เห็นเป็นคนละจุด<br>
ขยายมากแต่กำลังแยกภาพต่ำ จะได้แค่ภาพใหญ่ที่เบลอ — นี่คือข้อจำกัดที่ทำให้กล้องใช้แสงขยายเกิน 1,000 เท่าแล้วไม่ได้ประโยชน์เพิ่ม</div>` },

    { type: "h2", text: "4.2 เซลล์โพรคาริโอตและเซลล์ยูคาริโอต" },

    { type: "p", html: "สิ่งมีชีวิตทั้งหมดบนโลกแบ่งตามชนิดของเซลล์ได้เป็น 2 กลุ่มใหญ่ — <b>โพรคาริโอต</b> (ไม่มีนิวเคลียสที่แท้จริง) และ <b>ยูคาริโอต</b> (มีนิวเคลียสที่มีเยื่อหุ้ม)",
      detail: `<h3>4.2.1 โพรคาริโอต — เซลล์แบบไม่มีห้อง</h3>
` + SVG_PROKARYOTE + `
<p>คำว่า <i>pro-</i> แปลว่า "ก่อน" และ <i>karyon</i> แปลว่า "แก่น/นิวเคลียส" รวมกันคือ "ก่อนจะมีนิวเคลียส"</p>
<ul>
<li>DNA เป็น<b>วงกลม</b> ลอยอยู่ในบริเวณที่เรียกว่า <b>นิวคลีออยด์</b> โดยไม่มีเยื่อหุ้ม</li>
<li>มี<b>ไรโบโซม</b> แต่<b>ไม่มีออร์แกเนลล์ที่มีเยื่อหุ้ม</b>เลย</li>
<li>มี<b>ผนังเซลล์</b>ที่ทำจาก<b>เพปทิโดไกลแคน</b> (เชื่อมกลับไปหาบทที่ 2 และไลโซไซม์ในบทที่ 3)</li>
<li>จีโนมราว <b>0.6–5 ล้านคู่เบส</b> เข้ารหัสโปรตีนราว 5,000 ชนิด</li>
<li>บางชนิดมี<b>แฟลเจลลัม</b>ไว้เคลื่อนที่ และ<b>แคปซูล</b>หุ้มนอกผนังเซลล์</li>
</ul>
<div class="box why"><b>ไม่มีออร์แกเนลล์แล้วอยู่ได้อย่างไร</b><br>
เพราะแบคทีเรีย<b>เล็กพอ</b> — ที่ขนาด 1–2 &#181;m โมเลกุลแพร่ไปทั่วเซลล์ได้ในเวลาไม่ถึงวินาที จึงไม่จำเป็นต้องมีระบบขนส่งภายในหรือการแบ่งห้อง<br>
พอเซลล์ยูคาริโอตใหญ่ขึ้นเป็นสิบเท่า (ปริมาตรมากขึ้นเป็นพันเท่า) การแพร่อย่างเดียวไม่พออีกต่อไป จึงต้องมีเยื่อหุ้มภายในและระบบขนส่ง</div>` },

    { type: "table", rows: [
      ["หัวข้อเปรียบเทียบ", "เซลล์โพรคาริโอต", "เซลล์ยูคาริโอต"],
      ["ตัวอย่าง", "แบคทีเรีย · อาร์เคีย", "พืช · สัตว์ · ฟังไจ · โพรทิสต์"],
      ["นิวเคลียส", "<b>ไม่มี</b> (DNA อยู่ในนิวคลีออยด์)", "<b>มี</b> เยื่อหุ้ม 2 ชั้น"],
      ["รูปร่าง DNA", "วงกลม 1 วง", "เส้นตรงหลายเส้น จับกับโปรตีนเป็นโครมาทิน"],
      ["ออร์แกเนลล์ที่มีเยื่อหุ้ม", "<b>ไม่มี</b>", "<b>มี</b> เช่น ไมโทคอนเดรีย กอลจิ ER"],
      ["ไรโบโซม", "มี (ขนาดเล็กกว่า)", "มี (ขนาดใหญ่กว่า)"],
      ["ขนาดทั่วไป", "1–10 μm", "10–100 μm"],
      ["ไซโทสเกเลตอน", "แทบไม่มี", "มีครบ"]
    ], detail: `<h3>4.2.2 ตารางเปรียบเทียบ — และหลักฐานว่าออร์แกเนลล์บางตัวเคยเป็นแบคทีเรีย</h3>
<div class="box why"><b>ทฤษฎีเอนโดซิมไบโอซิส (endosymbiosis)</b><br>
<b>ไมโทคอนเดรียและคลอโรพลาสต์เคยเป็นแบคทีเรียอิสระ</b> ที่ถูกเซลล์ใหญ่กลืนเข้าไปแล้วอยู่ร่วมกันแบบพึ่งพา หลักฐานที่ยกมาสนับสนุนคือ<br>
1. ทั้งคู่มี <b>DNA เป็นวงกลม</b>ของตัวเอง เหมือนแบคทีเรีย<br>
2. ทั้งคู่มี <b>ไรโบโซม</b>ของตัวเอง และเป็นขนาดแบบแบคทีเรีย<br>
3. ทั้งคู่มี<b>เยื่อหุ้ม 2 ชั้น</b> — ชั้นในเป็นของแบคทีเรียเดิม ชั้นนอกมาจากเซลล์ที่กลืนเข้าไป<br>
4. ทั้งคู่<b>แบ่งตัวเองได้</b>คล้ายแบคทีเรีย ไม่ได้ถูกสร้างขึ้นใหม่จากศูนย์<br>
ไมโทคอนเดรียสืบจากแบคทีเรียที่หายใจแบบใช้ออกซิเจน ส่วนคลอโรพลาสต์สืบจากไซยาโนแบคทีเรียที่สังเคราะห์ด้วยแสงได้</div>
<div class="box tip"><b>ทริคจำ</b> ออร์แกเนลล์ที่มี<b>เยื่อหุ้ม 2 ชั้น</b> มีอยู่ 3 ตัวเท่านั้น คือ <b>นิวเคลียส · ไมโทคอนเดรีย · คลอโรพลาสต์</b> ที่เหลือมีชั้นเดียว (ยกเว้นไรโบโซมที่ไม่มีเยื่อหุ้มเลย)</div>
<div class="box warn"><b>ระวัง</b> "โพรคาริโอตไม่มีไรโบโซม" <b>ผิด</b> — ไรโบโซม<b>ไม่ใช่</b>ออร์แกเนลล์ที่มีเยื่อหุ้ม แบคทีเรียจึงมีไรโบโซมและสร้างโปรตีนได้ตามปกติ</div>` },

    { type: "p", html: "ภาพรวมของ<b>เซลล์สัตว์</b>และ<b>เซลล์พืช</b> — ดูให้เห็นว่าอะไรมีเหมือนกัน และอะไรมีเฉพาะฝั่งเดียว",
      detail: `<h3>4.2.3 แผนผังเซลล์สัตว์และเซลล์พืช</h3>
<h4>เซลล์สัตว์</h4>
` + SVG_ANIMALCELL + `
<h4>เซลล์พืช</h4>
` + SVG_PLANTCELL + `
<table>
<tr><th>โครงสร้าง</th><th>เซลล์สัตว์</th><th>เซลล์พืช</th></tr>
<tr><td>เยื่อหุ้มเซลล์</td><td>มี</td><td>มี</td></tr>
<tr><td><b>ผนังเซลล์</b></td><td><b>ไม่มี</b></td><td><b>มี</b> (เซลลูโลส)</td></tr>
<tr><td><b>คลอโรพลาสต์</b></td><td><b>ไม่มี</b></td><td><b>มี</b></td></tr>
<tr><td><b>แวคิวโอลกลาง</b></td><td>มีแวคิวโอลเล็ก ๆ</td><td><b>มีขนาดใหญ่มาก</b> กินพื้นที่เกือบทั้งเซลล์</td></tr>
<tr><td><b>เซนทริโอล</b></td><td><b>มี</b></td><td>โดยทั่วไป<b>ไม่มี</b></td></tr>
<tr><td>ไลโซโซม</td><td>มีชัดเจน</td><td>พบน้อย หน้าที่ย่อยสลายส่วนใหญ่อยู่ที่แวคิวโอล</td></tr>
<tr><td>ไมโทคอนเดรีย นิวเคลียส ER กอลจิ ไรโบโซม</td><td colspan="2" style="text-align:center">มีทั้งคู่</td></tr>
<tr><td>รูปร่าง</td><td>ค่อนข้างกลม ยืดหยุ่น</td><td>เป็นเหลี่ยมคงรูป เพราะมีผนังเซลล์</td></tr>
</table>
<div class="box why"><b>ทำไมพืชถึงต้องมีแวคิวโอลกลางที่ใหญ่ขนาดนั้น</b><br>
เพราะพืชโตขึ้นโดย<b>ดูดน้ำเข้าไปขยายแวคิวโอล</b> แทนที่จะสร้างไซโทพลาซึมใหม่ทั้งหมดซึ่งแพงกว่ามาก<br>
แรงดันน้ำในแวคิวโอลที่ดันผนังเซลล์ (แรงดันเต่ง) ยังเป็นสิ่งที่ทำให้ลำต้นอ่อนและใบตั้งตรงอยู่ได้ — เวลาพืชขาดน้ำแล้วเหี่ยว ก็คือแรงดันนี้หายไป</div>
<div class="box tip"><b>วิธีจำ 3 อย่างที่พืชมีแต่สัตว์ไม่มี</b> นึกถึงต้นไม้: <b>ยืนอยู่ได้</b> (ผนังเซลล์) · <b>สีเขียว</b> (คลอโรพลาสต์) · <b>อวบน้ำ</b> (แวคิวโอลกลาง) และจำกลับกันว่าสัตว์มี<b>เซนทริโอล</b>ที่พืชไม่มี</div>` },

    { type: "h2", text: "4.3 เยื่อหุ้มเซลล์และผนังเซลล์" },

    { type: "p", html: "เยื่อหุ้มเซลล์เป็น<b>ฟอสโฟลิพิด 2 ชั้น</b>ที่มีโปรตีนแทรกอยู่ เรียกโครงสร้างนี้ว่า <b>แบบจำลองฟลูอิดโมเซอิก (fluid mosaic model)</b> มีหน้าที่หลักคือ<b>ควบคุมการผ่านเข้าออกของสาร</b> ทำให้ภายในเซลล์ต่างจากภายนอก",
      detail: `<h3>4.3.1 แบบจำลองฟลูอิดโมเซอิก</h3>
` + SVG_MEMBRANE + `
<p>ชื่อนี้มาจากสองคำ</p>
<ul>
<li><b>fluid</b> = ไหลได้ โมเลกุลฟอสโฟลิพิดไม่ได้ยึดติดกับที่ แต่เลื่อนไปมาในระนาบได้</li>
<li><b>mosaic</b> = โมเสก โปรตีนหลายชนิดกระจายฝังอยู่เหมือนกระเบื้องบนพื้น</li>
</ul>
<h4>ส่วนประกอบและหน้าที่</h4>
<table>
<tr><th>ส่วนประกอบ</th><th>หน้าที่</th></tr>
<tr><td><b>ฟอสโฟลิพิด 2 ชั้น</b></td><td>โครงหลัก กั้นสารที่ละลายน้ำไม่ให้ผ่านเข้าออกตามใจ</td></tr>
<tr><td><b>โปรตีนช่อง</b> (channel protein)</td><td>เปิดทางให้ไอออนและโมเลกุลมีขั้วผ่านได้</td></tr>
<tr><td><b>โปรตีนตัวพา</b> (carrier protein)</td><td>จับสารแล้วเปลี่ยนรูปพาข้ามไปอีกด้าน</td></tr>
<tr><td><b>โปรตีนตัวรับ</b> (receptor)</td><td>รับสัญญาณเคมี เช่น ฮอร์โมน สารสื่อประสาท</td></tr>
<tr><td><b>ไกลโคโปรตีน · ไกลโคลิพิด</b></td><td>การจดจำระหว่างเซลล์ เช่น หมู่เลือด ABO</td></tr>
<tr><td><b>คอเลสเตอรอล</b></td><td>คุมความยืดหยุ่นของเยื่อไม่ให้เหลวหรือแข็งเกินไป</td></tr>
</table>
<div class="box why"><b>สมบัติสำคัญที่สุดคือ "เลือกผ่าน" (semipermeable)</b><br>
แกนกลางของเยื่อเป็น<b>หางไฮโดรคาร์บอนที่ไม่มีขั้ว</b> ดังนั้น<br>
• สาร<b>ไม่มีขั้วและโมเลกุลเล็ก</b> เช่น O₂ CO₂ และลิพิด ผ่านได้สบาย<br>
• สาร<b>มีขั้วหรือมีประจุ</b> เช่น ไอออน กลูโคส กรดแอมิโน ผ่านเองแทบไม่ได้ ต้องอาศัยโปรตีน<br>
นี่คือเหตุผลที่เซลล์ควบคุมได้ว่าอะไรเข้าได้และเข้าเท่าไร ถ้าเยื่อปล่อยผ่านทุกอย่าง ภายในเซลล์จะเหมือนภายนอกและปฏิกิริยาชีวเคมีทั้งหมดจะพังทันที</div>
<div class="box warn"><b>ระวัง</b> น้ำเป็นโมเลกุลมีขั้วก็จริง แต่<b>ผ่านเยื่อได้</b>เพราะโมเลกุลเล็กมาก และในเซลล์หลายชนิดยังมีโปรตีนช่องเฉพาะสำหรับน้ำ (แอควาพอริน) ช่วยเร่งอีกทาง</div>` },

    { type: "table", rows: [
      ["", "เยื่อหุ้มเซลล์", "ผนังเซลล์"],
      ["พบใน", "เซลล์ทุกชนิด", "พืช · ฟังไจ · แบคทีเรีย (ไม่มีในสัตว์)"],
      ["ทำจากอะไร", "ฟอสโฟลิพิด + โปรตีน", "พืช = <b>เซลลูโลส</b> · ฟังไจ = <b>ไคทิน</b> · แบคทีเรีย = <b>เพปทิโดไกลแคน</b>"],
      ["ยอมให้สารผ่าน", "<b>เลือกผ่าน</b> (semipermeable)", "<b>ผ่านได้เกือบหมด</b> (ยอมให้น้ำและสารละลายผ่าน)"],
      ["หน้าที่หลัก", "ควบคุมการเข้าออกของสาร · รับสัญญาณ", "ค้ำจุนรูปร่าง · ป้องกันเซลล์แตกเมื่อน้ำเข้ามาก"],
      ["ตำแหน่ง", "อยู่ด้านใน", "อยู่ด้านนอกสุด หุ้มเยื่อหุ้มเซลล์อีกที"]
    ], detail: `<h3>4.3.2 ผนังเซลล์ — ทำไมพืชถึงไม่แตกเมื่อดูดน้ำ</h3>
<div class="box why"><b>จุดที่ต้องเข้าใจ ไม่ใช่ท่อง</b><br>
ผนังเซลล์<b>ไม่ได้</b>ทำหน้าที่ควบคุมว่าสารอะไรเข้าได้ — มันยอมให้น้ำและสารละลายผ่านแทบทั้งหมด<br>
สิ่งที่มันทำคือ<b>ต้านแรงดัน</b> เมื่อน้ำไหลเข้าเซลล์พืชจนแวคิวโอลพองดันออก ผนังเซลล์จะดันกลับ เกิด<b>แรงดันเต่ง (turgor pressure)</b> น้ำจึงหยุดไหลเข้าก่อนที่เซลล์จะแตก<br>
เซลล์สัตว์ไม่มีผนังเซลล์ พอวางในน้ำกลั่นจึงบวมจนแตกได้จริง (เม็ดเลือดแดงแตกเรียกว่า hemolysis)</div>
<div class="box tip"><b>ทริคทำข้อสอบ</b> ถ้าโจทย์ถามว่า "โครงสร้างใดทำให้เซลล์พืชไม่แตกในน้ำกลั่น" ตอบ <b>ผนังเซลล์</b> ไม่ใช่เยื่อหุ้มเซลล์ และถ้าถามว่า "โครงสร้างใดควบคุมการเข้าออกของสาร" ตอบ<b>เยื่อหุ้มเซลล์</b> ไม่ใช่ผนังเซลล์ — สองคำถามนี้คนละคำตอบเสมอ</div>` },

    { type: "h2", text: "4.4 นิวเคลียส" },

    { type: "p", html: "นิวเคลียสเป็นออร์แกเนลล์ที่<b>ควบคุมกิจกรรมทั้งหมดของเซลล์</b> เพราะเป็นที่เก็บ DNA ซึ่งเป็นแบบพิมพ์เขียวสำหรับสร้างโปรตีนทุกชนิด",
      detail: `<h3>4.4 โครงสร้างของนิวเคลียสและวิธีที่มันสั่งการ</h3>
` + SVG_NUCLEUS + `
<table>
<tr><th>ส่วนประกอบ</th><th>หน้าที่</th></tr>
<tr><td><b>เยื่อหุ้มนิวเคลียส</b> (2 ชั้น)</td><td>กั้น DNA ออกจากไซโทพลาซึม · ชั้นนอกต่อเนื่องกับร่างแหเอนโดพลาซึม</td></tr>
<tr><td><b>รูที่เยื่อหุ้มนิวเคลียส</b> (nuclear pore)</td><td>ทางเข้าออกของสาร เช่น RNA ออกไป โปรตีนเข้ามา</td></tr>
<tr><td><b>โครมาทิน</b></td><td>DNA พันอยู่กับโปรตีน เมื่อจะแบ่งเซลล์จะขดแน่นเป็น<b>โครโมโซม</b></td></tr>
<tr><td><b>นิวคลีโอลัส</b></td><td>แหล่ง<b>สร้างไรโบโซม</b> (สังเคราะห์ rRNA และประกอบหน่วยย่อยของไรโบโซม)</td></tr>
</table>
<div class="box why"><b>นิวเคลียสสั่งการเซลล์อย่างไร ทั้งที่ตัวเองไม่ออกจากห้อง</b><br>
นิวเคลียสไม่ได้ส่งตัวเองออกไป แต่ส่ง<b>สำเนาคำสั่ง</b>ออกไปแทน<br>
DNA ถูกคัดลอกเป็น <b>mRNA</b> → mRNA ลอดออกทาง<b>รูที่เยื่อหุ้มนิวเคลียส</b> → ไปที่<b>ไรโบโซม</b>ในไซโทพลาซึม → ไรโบโซมแปลรหัสเป็น<b>โปรตีน</b> → โปรตีนคือตัวที่ลงมือทำงานจริงทุกอย่าง (เอนไซม์ ช่องลำเลียง โครงสร้าง)<br>
นี่คือเหตุผลว่าทำไม "ควบคุมเซลล์" ถึงเท่ากับ "ควบคุมว่าจะสร้างโปรตีนตัวไหนเมื่อไร"</div>
<div class="box warn"><b>ระวังคำ</b> <b>โครมาทิน</b> กับ <b>โครโมโซม</b> เป็นสารตัวเดียวกัน ต่างกันที่<b>สภาพการขด</b> — ช่วงเซลล์ทำงานปกติจะคลายเป็นโครมาทิน (เพื่อให้อ่าน DNA ได้) ช่วงจะแบ่งเซลล์จะขดแน่นเป็นโครโมโซม (เพื่อให้ลากแยกกันได้โดยไม่พันกัน)</div>
<div class="box tip"><b>เกร็ดที่ใช้ตอบข้อสอบได้</b> เซลล์เม็ดเลือดแดงของคนที่โตเต็มที่<b>ไม่มีนิวเคลียส</b> จึงสร้างโปรตีนใหม่ไม่ได้และมีอายุจำกัดราว 120 วัน ส่วนเซลล์กล้ามเนื้อลายมี<b>หลายนิวเคลียส</b>ในเซลล์เดียว</div>` },

    { type: "h2", text: "4.5 ออร์แกเนลล์ในระบบเยื่อหุ้มภายใน" },

    { type: "p", html: "<b>ร่างแหเอนโดพลาซึม · กอลจิคอมเพลกซ์ · ไลโซโซม · แวคิวโอล · เวสิเคิล</b> และเยื่อหุ้มนิวเคลียส ทำงานต่อเนื่องกันเป็นสายพานเดียว เรียกรวมว่า <b>ระบบเยื่อหุ้มภายใน (endomembrane system)</b>" },

    { type: "table", rows: [
      ["ออร์แกเนลล์", "ลักษณะ", "หน้าที่"],
      ["ร่างแหเอนโดพลาซึม<b>แบบขรุขระ</b> (RER)", "ถุงแบนซ้อนกัน <b>มีไรโบโซมเกาะ</b>", "สร้างโปรตีนที่จะส่งออกนอกเซลล์หรือฝังที่เยื่อหุ้ม"],
      ["ร่างแหเอนโดพลาซึม<b>แบบเรียบ</b> (SER)", "เป็นท่อ <b>ไม่มีไรโบโซมเกาะ</b>", "สร้างลิพิดและสเตอรอยด์ · กำจัดสารพิษ · เก็บ Ca²⁺"],
      ["กอลจิคอมเพลกซ์", "ถุงแบนซ้อนกันเป็นตั้ง", "<b>ดัดแปลง คัดแยก และบรรจุ</b>สารที่มาจาก ER แล้วส่งต่อ"],
      ["ไลโซโซม", "ถุงกลมเยื่อชั้นเดียว", "บรรจุ<b>เอนไซม์ย่อยสลาย</b> ย่อยสารและออร์แกเนลล์ที่เสีย"],
      ["แวคิวโอล", "ถุงเยื่อชั้นเดียว พืชมีขนาดใหญ่มาก", "เก็บน้ำ สารอาหาร ของเสีย · สร้างแรงดันเต่งในพืช"],
      ["เพอรอกซิโซม", "ถุงกลมเล็ก", "สลายไฮโดรเจนเพอรอกไซด์ (H₂O₂) และกรดไขมัน"]
    ], detail: `<h3>4.5 สายพานการผลิตของเซลล์ — ดูเป็นเส้นทางเดียว อย่าจำแยกตัว</h3>
` + SVG_ENDOMEMBRANE + `
<h4>ตามรอยโปรตีนหนึ่งโมเลกุลตั้งแต่ต้นจนจบ</h4>
<ol>
<li><b>นิวเคลียส</b> ส่งคำสั่ง (mRNA) ออกมา</li>
<li><b>ไรโบโซมบน ER แบบขรุขระ</b> แปลรหัสเป็นสายโปรตีน แล้วหย่อนเข้าไปในถุง ER</li>
<li>โปรตีนถูกห่อเป็น<b>เวสิเคิล</b>แยกออกมาจาก ER</li>
<li>เวสิเคิลไปรวมกับ<b>กอลจิคอมเพลกซ์</b> ซึ่งดัดแปลง (เช่น เติมน้ำตาลกลายเป็นไกลโคโปรตีน) คัดแยก และติด "ป้ายที่อยู่"</li>
<li>กอลจิปล่อยเวสิเคิลออกไปตามป้ายนั้น — ไปเป็น<b>ไลโซโซม</b> ไปฝังที่<b>เยื่อหุ้มเซลล์</b> หรือ<b>ส่งออกนอกเซลล์</b></li>
</ol>
<div class="box why"><b>ทำไมต้องขังเอนไซม์ย่อยไว้ในไลโซโซม</b><br>
เอนไซม์ในไลโซโซมทำงานได้ดีที่ <b>pH ประมาณ 5</b> ซึ่งเป็นกรดกว่าไซโทซอลที่มี pH ราว 7<br>
ต่อให้ไลโซโซมรั่ว เอนไซม์ที่หลุดออกมาก็เจอ pH 7 แล้ว<b>ทำงานได้ไม่ดี</b> เซลล์จึงไม่ถูกย่อยตัวเองทันที — เป็นระบบนิรภัยสองชั้น (ขังไว้ + ปรับ pH ให้ไม่เหมาะกับข้างนอก)<br>
ย้อนกลับไปดูหัวข้อ 3.5 เรื่อง pH กับเอนไซม์ได้เลย เป็นหลักการเดียวกันเป๊ะ</div>
<div class="box tip"><b>ทริคจำ RER กับ SER</b> <b>R</b>ough มีไ<b>ร</b>โบโซม → สร้างโ<b>ป</b>รตีน · <b>S</b>mooth เรียบ → สร้างลิ<b>พิ</b>ด และล้าง<b>พิษ</b><br>
ข้อสอบชอบถามว่าเซลล์ตับมี SER มากเป็นพิเศษเพราะอะไร ตอบ: เพราะตับทำหน้าที่<b>กำจัดสารพิษและแอลกอฮอล์</b></div>
<div class="box warn"><b>ระวัง</b> "กอลจิสร้างโปรตีน" <b>ผิด</b> — กอลจิ<b>ไม่ได้สร้าง</b>โปรตีน มันรับโปรตีนที่ ER สร้างมาแล้วเอามาดัดแปลงและส่งต่อเท่านั้น ตัวที่สร้างโปรตีนคือ<b>ไรโบโซม</b></div>` },

    { type: "h2", text: "4.6 ไมโทคอนเดรียและคลอโรพลาสต์" },

    { type: "p", html: "สองออร์แกเนลล์นี้เป็น<b>โรงงานพลังงาน</b>ของเซลล์ มีจุดร่วมกันหลายอย่าง คือมี<b>เยื่อหุ้ม 2 ชั้น</b> มี<b>DNA และไรโบโซมของตัวเอง</b> และ<b>เพิ่มพื้นที่ผิวด้วยการพับเยื่อชั้นใน</b>",
      detail: `<h3>4.6.1 ไมโทคอนเดรีย — โรงไฟฟ้าของเซลล์</h3>
` + SVG_MITO + `
<table>
<tr><th>ส่วน</th><th>เกิดอะไรที่นั่น</th></tr>
<tr><td>เยื่อชั้นนอก</td><td>ผิวเรียบ ยอมให้สารโมเลกุลเล็กผ่าน</td></tr>
<tr><td><b>เยื่อชั้นใน (คริสตี)</b></td><td>พับไปมาเพื่อ<b>เพิ่มพื้นที่ผิว</b> · เป็นที่ตั้งของ<b>การถ่ายทอดอิเล็กตรอน</b> ซึ่งสร้าง ATP ได้มากที่สุด</td></tr>
<tr><td><b>เมทริกซ์</b></td><td>ของเหลวด้านใน · เป็นที่เกิด<b>วัฏจักรเครบส์</b> · มี DNA และไรโบโซม</td></tr>
</table>
<div class="box why"><b>เชื่อมกับบทที่ 3 ให้เห็นภาพ</b><br>
ในบทที่ 3 เราเรียนว่าการหายใจระดับเซลล์มี 3 ขั้น ตอนนี้เติม "สถานที่" ลงไปได้แล้ว<br>
• <b>ไกลโคลิซิส</b> → ไซโทซอล (ไม่ได้อยู่ในไมโทคอนเดรีย)<br>
• <b>วัฏจักรเครบส์</b> → เมทริกซ์ของไมโทคอนเดรีย<br>
• <b>การถ่ายทอดอิเล็กตรอน</b> → เยื่อชั้นในของไมโทคอนเดรีย<br>
เซลล์ที่ใช้พลังงานมาก เช่น<b>เซลล์กล้ามเนื้อหัวใจ</b> จึงมีไมโทคอนเดรียหนาแน่นเป็นพิเศษ</div>
<h3>4.6.2 คลอโรพลาสต์ — โรงงานสร้างอาหารของพืช</h3>
` + SVG_CHLORO + `
<table>
<tr><th>ส่วน</th><th>เกิดอะไรที่นั่น</th></tr>
<tr><td>เยื่อหุ้ม 2 ชั้น</td><td>กั้นคลอโรพลาสต์จากไซโทพลาซึม</td></tr>
<tr><td><b>ไทลาคอยด์ / กรานุม</b></td><td>ถุงแบนซ้อนกัน มี<b>คลอโรฟิลล์</b>อยู่ที่เยื่อ · เป็นที่<b>รับพลังงานแสง</b></td></tr>
<tr><td><b>สโตรมา</b></td><td>ของเหลวรอบกรานุม · เป็นที่<b>สร้างน้ำตาลจาก CO₂</b> · มี DNA ไรโบโซม และเม็ดแป้ง</td></tr>
</table>
<div class="box tip"><b>เทียบสองตัวให้เห็นความสมมาตร</b><br>
ไมโทคอนเดรีย: <b>สลาย</b>น้ำตาล → ได้ ATP · ปล่อย CO₂ และ H₂O<br>
คลอโรพลาสต์: <b>สร้าง</b>น้ำตาล จาก CO₂ และ H₂O · ใช้พลังงานแสง<br>
สองตัวนี้คือแคแทบอลิซึมกับแอแนบอลิซึมในหัวข้อ 3.8 ที่กลายเป็นออร์แกเนลล์จริง ๆ<br>
และจำไว้ว่า<b>พืชมีทั้งสองอย่าง</b> ไม่ใช่มีแต่คลอโรพลาสต์ — พืชก็ต้องหายใจเหมือนกัน</div>
<div class="box warn"><b>ผิดบ่อยมาก</b> "พืชไม่ต้องหายใจเพราะสังเคราะห์ด้วยแสงอยู่แล้ว" <b>ผิด</b> — พืชสังเคราะห์ด้วยแสงเพื่อ<b>สร้างน้ำตาล</b> แต่ยังต้อง<b>สลายน้ำตาลนั้นในไมโทคอนเดรีย</b>เพื่อให้ได้ ATP มาใช้ และทำตลอดเวลาทั้งกลางวันกลางคืน</div>` },

    { type: "h2", text: "4.7 ไรโบโซม ไซโทสเกเลตอน และเซนทริโอล" },

    { type: "table", rows: [
      ["โครงสร้าง", "มีเยื่อหุ้มไหม", "หน้าที่"],
      ["<b>ไรโบโซม</b>", "<b>ไม่มี</b>", "สังเคราะห์โปรตีน · พบทั้งลอยอิสระในไซโทซอลและเกาะบน ER"],
      ["<b>ไซโทสเกเลตอน</b>", "ไม่มี", "ค้ำจุนรูปร่างเซลล์ · ยึดออร์แกเนลล์ · เป็นรางลำเลียงภายในเซลล์ · ช่วยการเคลื่อนไหว"],
      ["ไมโครฟิลาเมนต์ (แอกทิน)", "—", "เส้นเล็กที่สุด · การเคลื่อนไหวของเซลล์และการหดตัวของกล้ามเนื้อ"],
      ["ไมโครทิวบูล (ทูบูลิน)", "—", "เส้นใหญ่ที่สุด เป็นท่อกลวง · เป็นรางลากโครโมโซมตอนแบ่งเซลล์ · เป็นแกนของซิเลียและแฟลเจลลัม"],
      ["<b>เซนทริโอล</b>", "ไม่มี", "พบใน<b>เซลล์สัตว์</b> · สร้างเส้นใยสปินเดิลสำหรับแยกโครโมโซมตอนแบ่งเซลล์"]
    ], detail: `<h3>4.7 โครงสร้างที่ไม่มีเยื่อหุ้ม — แต่ขาดไม่ได้</h3>
<div class="box why"><b>ทำไมไรโบโซมถึงไม่นับเป็นออร์แกเนลล์ที่มีเยื่อหุ้ม</b><br>
เพราะไรโบโซมเป็น<b>ก้อนของ rRNA กับโปรตีน</b>ล้วน ๆ ไม่มีเยื่อหุ้มล้อมรอบ<br>
ผลที่ตามมาคือ <b>แบคทีเรียซึ่งไม่มีออร์แกเนลล์ที่มีเยื่อหุ้มเลย ก็ยังมีไรโบโซม</b> และสร้างโปรตีนได้ตามปกติ — ข้อนี้ออกสอบบ่อย</div>
<h4>ไรโบโซมอยู่ 2 ที่ และงานคนละแบบ</h4>
<table>
<tr><th>ตำแหน่ง</th><th>โปรตีนที่สร้างไปไหน</th></tr>
<tr><td><b>ลอยอิสระ</b>ในไซโทซอล</td><td>โปรตีนที่ใช้<b>ภายในเซลล์เอง</b> เช่น เอนไซม์ในไซโทซอล</td></tr>
<tr><td><b>เกาะบน ER แบบขรุขระ</b></td><td>โปรตีนที่จะ<b>ส่งออกนอกเซลล์</b> หรือ<b>ฝังที่เยื่อหุ้ม</b> หรือไปไลโซโซม</td></tr>
</table>
<div class="box tip"><b>ทริคทำข้อสอบ</b> โจทย์บอกว่าเซลล์ชนิดหนึ่ง<b>หลั่งเอนไซม์หรือฮอร์โมนออกนอกเซลล์มาก</b> (เช่น เซลล์ตับอ่อน) ให้ตอบว่ามี <b>ER แบบขรุขระและกอลจิคอมเพลกซ์เยอะ</b><br>
ถ้าโจทย์บอกว่าเซลล์<b>ใช้พลังงานมาก</b> ให้ตอบ <b>ไมโทคอนเดรียเยอะ</b><br>
ถ้าบอกว่า<b>กำจัดสารพิษ</b> ให้ตอบ <b>ER แบบเรียบเยอะ</b></div>
<div class="box warn"><b>ระวัง</b> <b>เซนทริโอลไม่ใช่เซนโทรเมียร์</b> — เซนทริโอลเป็นออร์แกเนลล์รูปทรงกระบอกในเซลล์สัตว์ ส่วนเซนโทรเมียร์เป็นตำแหน่งคอดบนโครโมโซม คนละอย่างกันโดยสิ้นเชิง</div>` },

    { type: "h2", text: "4.8 การลำเลียงสารผ่านเยื่อหุ้มเซลล์" },

    { type: "p", html: "การลำเลียงสารแบ่งเป็น 2 กลุ่มใหญ่ตามว่า<b>ใช้พลังงาน ATP หรือไม่</b> — ถ้าสารเคลื่อนที่<b>ตาม</b>ความเข้มข้น (มากไปน้อย) ไม่ต้องใช้พลังงาน แต่ถ้าเคลื่อนที่<b>ทวน</b>ความเข้มข้น ต้องใช้ ATP" },

    { type: "table", rows: [
      ["วิธีลำเลียง", "ทิศทางเทียบความเข้มข้น", "ใช้โปรตีนไหม", "ใช้ ATP ไหม", "ตัวอย่าง"],
      ["<b>การแพร่</b> (diffusion)", "มาก → น้อย", "ไม่ใช้", "<b>ไม่ใช้</b>", "O₂ และ CO₂ ผ่านเยื่อหุ้มถุงลมปอด"],
      ["<b>ออสโมซิส</b> (osmosis)", "น้ำเคลื่อนไปทางที่สารละลายเข้มข้นกว่า", "อาจผ่านแอควาพอริน", "<b>ไม่ใช้</b>", "รากพืชดูดน้ำจากดิน"],
      ["<b>การแพร่แบบฟาซิลิเทต</b>", "มาก → น้อย", "<b>ใช้</b> (โปรตีนช่อง/ตัวพา)", "<b>ไม่ใช้</b>", "กลูโคสเข้าเซลล์เม็ดเลือดแดง"],
      ["<b>การลำเลียงแบบใช้พลังงาน</b> (active transport)", "<b>น้อย → มาก (ทวน)</b>", "<b>ใช้</b>", "<b>ใช้</b>", "โซเดียม-โพแทสเซียมปั๊มที่เซลล์ประสาท"],
      ["<b>เอนโดไซโทซิส</b>", "โอบสารเข้ามาทั้งก้อน", "ใช้เยื่อหุ้มเซลล์", "<b>ใช้</b>", "เซลล์เม็ดเลือดขาวกลืนแบคทีเรีย"],
      ["<b>เอกโซไซโทซิส</b>", "ปล่อยสารออกทั้งถุง", "ใช้เวสิเคิล", "<b>ใช้</b>", "เซลล์ประสาทหลั่งสารสื่อประสาท"]
    ], detail: `<h3>4.8.1 ภาพรวมการลำเลียงสาร</h3>
` + SVG_TRANSPORT + `
<div class="box why"><b>วิธีแยกทุกแบบด้วยคำถาม 2 ข้อ</b><br>
<b>ข้อ 1: สารเคลื่อนตามหรือทวนความเข้มข้น</b><br>
ตาม = ไม่ต้องใช้ ATP (การแพร่ ออสโมซิส ฟาซิลิเทต) เพราะเป็นการไหลลงเนินตามธรรมชาติ<br>
ทวน = ต้องใช้ ATP (active transport) เพราะเป็นการเข็นขึ้นเนิน<br>
<b>ข้อ 2: ต้องใช้โปรตีนช่วยไหม</b><br>
สารไม่มีขั้วโมเลกุลเล็ก (O₂ CO₂) ผ่านชั้นไขมันได้เอง → การแพร่ธรรมดา<br>
สารมีขั้วหรือมีประจุ (กลูโคส ไอออน) ผ่านเองไม่ได้ → ต้องมีโปรตีน<br>
ตอบสองข้อนี้ได้ ก็ระบุชื่อวิธีลำเลียงได้ทุกข้อ</div>
<h4>เอนโดไซโทซิสกับเอกโซไซโทซิส — สำหรับของที่ใหญ่เกินกว่าจะผ่านโปรตีน</h4>
<ul>
<li><b>เอนโดไซโทซิส</b> เยื่อหุ้มเซลล์เว้าเข้าไปโอบสารแล้วหนีบเป็นถุงเข้ามาในเซลล์ — ถ้ากลืนของแข็งเรียก <b>ฟาโกไซโทซิส</b> ถ้ากลืนของเหลวเรียก <b>พิโนไซโทซิส</b></li>
<li><b>เอกโซไซโทซิส</b> เวสิเคิลจากกอลจิเคลื่อนมาเชื่อมกับเยื่อหุ้มเซลล์แล้วปล่อยสารออกไป — ต่อกับเส้นทางในหัวข้อ 4.5 พอดี</li>
</ul>
` + SVG_ENDOEXO + `
<div class="box tip"><b>ทริคจำโซเดียม-โพแทสเซียมปั๊ม</b> ปั๊ม <b>Na⁺ ออก 3 ตัว</b> และ <b>K⁺ เข้า 2 ตัว</b> ต่อ ATP 1 โมเลกุล — ทั้งสองทิศเป็นการทวนความเข้มข้น จึงต้องใช้ ATP และเป็นสาเหตุที่เซลล์ประสาทใช้พลังงานสูงมาก</div>` },

    { type: "p", html: "<b>ออสโมซิส</b> คือการแพร่ของ<b>น้ำ</b>ผ่านเยื่อเลือกผ่าน โดยน้ำจะเคลื่อนจากบริเวณที่สารละลาย<b>เจือจาง</b>ไปยังบริเวณที่สารละลาย<b>เข้มข้น</b>กว่า",
      detail: `<h3>4.8.2 ออสโมซิส และพฤติกรรมของเซลล์ในสารละลาย 3 แบบ</h3>
` + SVG_OSMOSIS + `
<table>
<tr><th>สารละลายภายนอก</th><th>ความหมาย</th><th>เซลล์สัตว์</th><th>เซลล์พืช</th></tr>
<tr><td><b>ไฮเพอร์โทนิก</b></td><td>นอกเซลล์<b>เข้มข้นกว่า</b> → น้ำออกจากเซลล์</td><td>เหี่ยว</td><td><b>พลาสโมไลซิส</b> (เยื่อหุ้มหดแยกจากผนังเซลล์)</td></tr>
<tr><td><b>ไอโซโทนิก</b></td><td><b>เท่ากัน</b> → น้ำเข้าออกเท่ากัน</td><td>รูปร่างปกติ</td><td>ไม่เต่ง (พืชจะดูอ่อน ๆ)</td></tr>
<tr><td><b>ไฮโพโทนิก</b></td><td>นอกเซลล์<b>เจือจางกว่า</b> → น้ำเข้าเซลล์</td><td>บวม อาจ<b>แตก</b></td><td><b>เต่ง (turgid)</b> ซึ่งเป็นสภาพที่พืชต้องการ</td></tr>
</table>
<div class="box why"><b>ทำไมสภาพที่ดีที่สุดของพืชกับสัตว์ถึงตรงข้ามกัน</b><br>
เซลล์สัตว์ไม่มีผนังเซลล์ พอน้ำเข้ามากจึงบวมจนแตก สภาพที่ปลอดภัยที่สุดคือ<b>ไอโซโทนิก</b> (นี่คือเหตุผลที่น้ำเกลือที่ให้ผู้ป่วยต้องเป็นไอโซโทนิก)<br>
เซลล์พืชมีผนังเซลล์ต้านไว้ น้ำจึงเข้าได้จนถึงจุดหนึ่งแล้วหยุดเอง สภาพ<b>ไฮโพโทนิก</b>จึงดีที่สุดเพราะทำให้เซลล์<b>เต่ง</b>และลำต้นตั้งตรง</div>
<div class="box warn"><b>จุดที่คนพลาดมากที่สุด</b> ให้จำว่า "<b>น้ำวิ่งไปหาที่เค็มกว่า</b>" ไม่ใช่ "น้ำวิ่งไปหาที่น้ำเยอะกว่า"<br>
ทดสอบด้วยตัวอย่างจริง: โรยเกลือบนผักแล้วผักเหี่ยว เพราะข้างนอกเค็มกว่า น้ำจึงออกจากเซลล์ผัก — ตรงนี้คือไฮเพอร์โทนิก</div>
<div class="box tip"><b>เกร็ดที่โยงกับชีวิตจริง</b> ปลาน้ำจืดอยู่ในน้ำที่<b>ไฮโพโทนิก</b>เมื่อเทียบกับตัวมัน น้ำจึงไหลเข้าตัวตลอดเวลา มันจึง<b>ขับปัสสาวะเจือจางออกมามาก</b> ส่วนปลาน้ำเค็มเจอสภาพตรงข้าม จึงต้อง<b>ดื่มน้ำทะเลและขับเกลือออก</b></div>` },

    { type: "callout", html: "สรุปทั้งบท: <b>เยื่อหุ้มเซลล์</b>กำหนดว่าอะไรเข้าออกได้ · <b>นิวเคลียส</b>เก็บคำสั่ง · <b>ไรโบโซมกับ ER และกอลจิ</b>คือสายพานผลิตและส่งโปรตีน · <b>ไมโทคอนเดรียกับคลอโรพลาสต์</b>จัดการพลังงาน · <b>ไลโซโซม</b>ทำลายของเสีย · และทั้งหมดนี้ทำงานได้เพราะเซลล์<b>แบ่งห้อง</b>ไม่ให้ปฏิกิริยาชนกัน",
      detail: `<h3>สรุปบทที่ 4 แบบตารางเดียวจบ</h3>
<table>
<tr><th>โครงสร้าง</th><th>เยื่อหุ้ม</th><th>หน้าที่สั้นที่สุด</th><th>พบใน</th></tr>
<tr><td>เยื่อหุ้มเซลล์</td><td>1 ชั้น</td><td>ควบคุมการเข้าออกของสาร</td><td>ทุกเซลล์</td></tr>
<tr><td>ผนังเซลล์</td><td>—</td><td>ค้ำจุน ป้องกันเซลล์แตก</td><td>พืช ฟังไจ แบคทีเรีย</td></tr>
<tr><td><b>นิวเคลียส</b></td><td><b>2 ชั้น</b></td><td>เก็บ DNA ควบคุมเซลล์</td><td>ยูคาริโอต</td></tr>
<tr><td>นิวคลีโอลัส</td><td>—</td><td>สร้างไรโบโซม</td><td>ในนิวเคลียส</td></tr>
<tr><td>ไรโบโซม</td><td><b>ไม่มี</b></td><td>สังเคราะห์โปรตีน</td><td>ทุกเซลล์</td></tr>
<tr><td>ER ขรุขระ</td><td>1 ชั้น</td><td>สร้างโปรตีนส่งออก</td><td>ยูคาริโอต</td></tr>
<tr><td>ER เรียบ</td><td>1 ชั้น</td><td>สร้างลิพิด กำจัดสารพิษ</td><td>ยูคาริโอต</td></tr>
<tr><td>กอลจิคอมเพลกซ์</td><td>1 ชั้น</td><td>ดัดแปลง คัดแยก บรรจุ ส่งต่อ</td><td>ยูคาริโอต</td></tr>
<tr><td>ไลโซโซม</td><td>1 ชั้น</td><td>ย่อยสลายด้วยเอนไซม์</td><td>เด่นในเซลล์สัตว์</td></tr>
<tr><td>แวคิวโอล</td><td>1 ชั้น</td><td>เก็บสาร สร้างแรงดันเต่ง</td><td>ใหญ่มากในพืช</td></tr>
<tr><td><b>ไมโทคอนเดรีย</b></td><td><b>2 ชั้น</b></td><td>สร้าง ATP</td><td>ยูคาริโอตเกือบทั้งหมด</td></tr>
<tr><td><b>คลอโรพลาสต์</b></td><td><b>2 ชั้น</b></td><td>สังเคราะห์ด้วยแสง</td><td>พืชและสาหร่าย</td></tr>
<tr><td>ไซโทสเกเลตอน</td><td>ไม่มี</td><td>ค้ำจุนรูปร่าง ลำเลียงภายใน</td><td>ยูคาริโอต</td></tr>
<tr><td>เซนทริโอล</td><td>ไม่มี</td><td>ช่วยแยกโครโมโซม</td><td>เซลล์สัตว์</td></tr>
</table>
<div class="box tip"><b>3 คำถามที่ตอบได้แล้วผ่านบทนี้</b><br>
1. อะไรมีเยื่อหุ้ม 2 ชั้น → นิวเคลียส ไมโทคอนเดรีย คลอโรพลาสต์<br>
2. อะไรมีในพืชแต่ไม่มีในสัตว์ → ผนังเซลล์ คลอโรพลาสต์ แวคิวโอลกลาง<br>
3. อะไรไม่มีเยื่อหุ้มเลย → ไรโบโซม ไซโทสเกเลตอน เซนทริโอล นิวคลีโอลัส</div>` }
  ];

  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat(CH4);

  /* ---------- การ์ดโน้ตไดอะแกรมของบทที่ 4 (คอลัมน์ที่ 5 : x = 1420) ---------- */
  const CH4_CARDS = [

    { id:"d1", t:"c", x:1420, y:100, w:250, c:"#7c5cd6",
      title:"4. โครงสร้างและหน้าที่ของเซลล์",
      body:"แนวคิดเดียวทั้งบท: <b>การแบ่งห้อง</b><br>เอาสารจากบท 1–3 มาประกอบเป็นที่อยู่จริง",
      detail:`<h3>บทที่ 4 — ภาพรวม</h3>
<div class="box why"><b>การแบ่งห้อง (compartmentalization) คือกุญแจ</b><br>
เซลล์ยูคาริโอตสร้าง "ห้อง" ที่มีเยื่อหุ้มแยกกัน เพื่อให้ปฏิกิริยาที่ขัดกันไม่ชนกัน<br>
• เอนไซม์ย่อยสลายถูกขังใน<b>ไลโซโซม</b><br>
• การสร้าง ATP อยู่ใน<b>ไมโทคอนเดรีย</b><br>
• DNA อยู่ใน<b>นิวเคลียส</b><br>
เข้าใจหลักนี้แล้วเดาหน้าที่ออร์แกเนลล์ได้เกือบทุกตัว</div>
<div class="box tip"><b>แหล่งอ้างอิง</b> เอกสารของครูครอบคลุมถึงบทที่ 3 บทนี้เรียบเรียงตามหลักสูตรชีววิทยา ม.4 เล่ม 1 ของ สสวท. บท "เซลล์และการทำงานของเซลล์"</div>` },

    { id:"d2", t:"c", x:1420, y:300, w:250, c:"#7c5cd6",
      title:"4.1 กล้องจุลทรรศน์และทฤษฎีเซลล์",
      body:"แบคทีเรีย 1–10 µm · เซลล์สัตว์ 10–30 µm<br>ทฤษฎีเซลล์ 3 ข้อ · ขยาย ≠ กำลังแยกภาพ",
      detail:`<h3>4.1 ขนาด กล้อง และทฤษฎีเซลล์</h3>
` + SVG_SCALE + `
<table>
<tr><th>สิ่งที่วัด</th><th>ขนาด</th></tr>
<tr><td>ไวรัส</td><td>20–300 nm</td></tr>
<tr><td><b>แบคทีเรีย</b></td><td><b>1–10 &#181;m</b></td></tr>
<tr><td><b>เซลล์สัตว์</b></td><td><b>10–30 &#181;m</b></td></tr>
<tr><td><b>เซลล์พืช</b></td><td><b>10–100 &#181;m</b></td></tr>
</table>
<h4>ทฤษฎีเซลล์ 3 ข้อ</h4>
<ol>
<li>สิ่งมีชีวิตทั้งหมดประกอบด้วยเซลล์ (ชไลเดน · ชวานน์)</li>
<li>เซลล์เป็นหน่วยพื้นฐานที่เล็กที่สุดของสิ่งมีชีวิต</li>
<li><b>เซลล์เกิดจากเซลล์ที่มีอยู่เดิมเท่านั้น</b> (เวอร์โชว์)</li>
</ol>
<div class="box why"><b>ทำไมเซลล์ถึงใหญ่ไม่ได้มาก</b> ปริมาตรเพิ่มเป็นกำลังสาม แต่พื้นที่ผิวเพิ่มเป็นกำลังสอง — โตเกินไปแล้ว<b>ลำเลียงสารไม่ทัน</b> เซลล์จึงเล็กและแบ่งตัวแทน</div>
<div class="box warn"><b>แยกให้ออก</b> <b>กำลังขยาย</b> = ภาพใหญ่ขึ้นกี่เท่า · <b>กำลังแยกภาพ</b> = แยกจุดสองจุดที่ชิดกันได้ไหม — ขยายมากแต่แยกภาพไม่ได้ ก็ได้แค่ภาพใหญ่ที่เบลอ</div>` },

    { id:"d3", t:"c", x:1420, y:500, w:250, c:"#7c5cd6",
      title:"4.2 โพรคาริโอต / ยูคาริโอต",
      body:"โพรคาริโอต = ไม่มีนิวเคลียส ไม่มีออร์แกเนลล์มีเยื่อหุ้ม<br>แต่ <b>มีไรโบโซม</b>",
      detail:`<h3>4.2 สองแบบของเซลล์</h3>
` + SVG_PROKARYOTE + `
<table>
<tr><th></th><th>โพรคาริโอต</th><th>ยูคาริโอต</th></tr>
<tr><td>นิวเคลียส</td><td><b>ไม่มี</b> (นิวคลีออยด์)</td><td><b>มี</b></td></tr>
<tr><td>DNA</td><td>วงกลม 1 วง</td><td>เส้นตรงหลายเส้น</td></tr>
<tr><td>ออร์แกเนลล์มีเยื่อหุ้ม</td><td><b>ไม่มี</b></td><td><b>มี</b></td></tr>
<tr><td>ไรโบโซม</td><td><b>มี</b></td><td>มี</td></tr>
<tr><td>ขนาด</td><td>1–10 &#181;m</td><td>10–100 &#181;m</td></tr>
</table>
<div class="box why"><b>ทฤษฎีเอนโดซิมไบโอซิส</b> ไมโทคอนเดรียและคลอโรพลาสต์<b>เคยเป็นแบคทีเรียอิสระ</b> หลักฐาน 4 ข้อ: มี DNA วงกลมของตัวเอง · มีไรโบโซมของตัวเอง · มีเยื่อหุ้ม 2 ชั้น · แบ่งตัวเองได้</div>
<div class="box warn"><b>ผิดบ่อย</b> "โพรคาริโอตไม่มีไรโบโซม" — <b>ผิด</b> ไรโบโซมไม่มีเยื่อหุ้ม แบคทีเรียจึงมีและสร้างโปรตีนได้ปกติ</div>
<div class="box tip"><b>ออร์แกเนลล์ที่มีเยื่อหุ้ม 2 ชั้นมีแค่ 3 ตัว</b> นิวเคลียส · ไมโทคอนเดรีย · คลอโรพลาสต์</div>` },

    { id:"d4", t:"c", x:1420, y:700, w:250, c:"#7c5cd6",
      title:"4.2b เซลล์พืช vs เซลล์สัตว์",
      body:"พืชมีเพิ่ม: ผนังเซลล์ · คลอโรพลาสต์ · แวคิวโอลกลาง<br>สัตว์มีเพิ่ม: เซนทริโอล",
      detail:`<h3>4.2b เทียบภาพเซลล์สัตว์กับเซลล์พืช</h3>
<h4>เซลล์สัตว์</h4>
` + SVG_ANIMALCELL + `
<h4>เซลล์พืช</h4>
` + SVG_PLANTCELL + `
<table>
<tr><th>โครงสร้าง</th><th>สัตว์</th><th>พืช</th></tr>
<tr><td>ผนังเซลล์</td><td><b>ไม่มี</b></td><td><b>มี</b> (เซลลูโลส)</td></tr>
<tr><td>คลอโรพลาสต์</td><td><b>ไม่มี</b></td><td><b>มี</b></td></tr>
<tr><td>แวคิวโอลกลาง</td><td>เล็ก</td><td><b>ใหญ่มาก</b></td></tr>
<tr><td>เซนทริโอล</td><td><b>มี</b></td><td>ไม่มี</td></tr>
<tr><td>ไมโทคอนเดรีย</td><td>มี</td><td><b>มี</b> (พืชก็ต้องหายใจ)</td></tr>
</table>
<div class="box tip"><b>วิธีจำ</b> นึกถึงต้นไม้: <b>ยืนอยู่ได้</b> (ผนังเซลล์) · <b>สีเขียว</b> (คลอโรพลาสต์) · <b>อวบน้ำ</b> (แวคิวโอลกลาง)</div>` },

    { id:"d5", t:"c", x:1420, y:900, w:250, c:"#7c5cd6",
      title:"4.3 เยื่อหุ้มเซลล์และผนังเซลล์",
      body:"ฟลูอิดโมเซอิก · หนา 7–8 nm<br>เยื่อหุ้ม = <b>เลือกผ่าน</b> · ผนังเซลล์ = <b>ค้ำจุน</b>",
      detail:`<h3>4.3 เยื่อหุ้มเซลล์</h3>
` + SVG_MEMBRANE + `
<p><b>fluid</b> = ฟอสโฟลิพิดเลื่อนไปมาได้ · <b>mosaic</b> = โปรตีนกระจายฝังอยู่เหมือนกระเบื้อง</p>
<div class="box why"><b>สมบัติเลือกผ่าน</b> แกนกลางเป็นหางไม่มีขั้ว ดังนั้น<br>
• O₂ CO₂ ลิพิด (ไม่มีขั้ว เล็ก) → <b>ผ่านได้เอง</b><br>
• ไอออน กลูโคส กรดแอมิโน (มีขั้ว/มีประจุ) → <b>ต้องใช้โปรตีน</b><br>
ถ้าเยื่อปล่อยผ่านทุกอย่าง ภายในเซลล์จะเหมือนภายนอกและปฏิกิริยาทั้งหมดพังทันที</div>
<table>
<tr><th></th><th>เยื่อหุ้มเซลล์</th><th>ผนังเซลล์</th></tr>
<tr><td>พบใน</td><td>ทุกเซลล์</td><td>พืช ฟังไจ แบคทีเรีย</td></tr>
<tr><td>ยอมให้ผ่าน</td><td><b>เลือกผ่าน</b></td><td>ผ่านได้เกือบหมด</td></tr>
<tr><td>หน้าที่</td><td>คุมการเข้าออก</td><td>ค้ำจุน กันเซลล์แตก</td></tr>
</table>
<div class="box warn"><b>สองคำถามนี้คนละคำตอบเสมอ</b> "อะไรทำให้เซลล์พืชไม่แตกในน้ำกลั่น" → <b>ผนังเซลล์</b> · "อะไรควบคุมการเข้าออกของสาร" → <b>เยื่อหุ้มเซลล์</b></div>` },

    { id:"d6", t:"c", x:1420, y:1100, w:250, c:"#7c5cd6",
      title:"4.4 นิวเคลียส",
      body:"เยื่อหุ้ม 2 ชั้น มีรู · โครมาทิน · นิวคลีโอลัสสร้างไรโบโซม<br>สั่งงานผ่าน mRNA",
      detail:`<h3>4.4 นิวเคลียส</h3>
` + SVG_NUCLEUS + `
<table>
<tr><th>ส่วน</th><th>หน้าที่</th></tr>
<tr><td>เยื่อหุ้มนิวเคลียส 2 ชั้น</td><td>กั้น DNA จากไซโทพลาซึม · ต่อกับ ER</td></tr>
<tr><td>รูที่เยื่อหุ้ม</td><td>ทางออกของ RNA ทางเข้าของโปรตีน</td></tr>
<tr><td>โครมาทิน</td><td>DNA + โปรตีน · ขดแน่นเป็นโครโมโซมตอนแบ่งเซลล์</td></tr>
<tr><td><b>นิวคลีโอลัส</b></td><td><b>สร้างไรโบโซม</b></td></tr>
</table>
<div class="box why"><b>สั่งการอย่างไรทั้งที่ไม่ออกจากห้อง</b><br>
DNA → คัดลอกเป็น <b>mRNA</b> → ลอดออกทางรู → <b>ไรโบโซม</b>แปลเป็นโปรตีน → โปรตีนลงมือทำงานจริง<br>
"ควบคุมเซลล์" จึงเท่ากับ "ควบคุมว่าจะสร้างโปรตีนตัวไหนเมื่อไร"</div>
<div class="box warn"><b>โครมาทิน = โครโมโซม</b> สารตัวเดียวกัน ต่างกันที่<b>สภาพการขด</b>เท่านั้น</div>` },

    { id:"d7", t:"c", x:1420, y:1300, w:250, c:"#7c5cd6",
      title:"4.5 ระบบเยื่อหุ้มภายใน",
      body:"ER ขรุขระ → เวสิเคิล → กอลจิ → ไลโซโซม/ส่งออก<br>เป็นสายพานเดียว ไม่ใช่ของแยกชิ้น",
      detail:`<h3>4.5 สายพานการผลิตของเซลล์</h3>
` + SVG_ENDOMEMBRANE + `
<table>
<tr><th>ออร์แกเนลล์</th><th>หน้าที่</th></tr>
<tr><td><b>ER ขรุขระ</b> (มีไรโบโซม)</td><td>สร้างโปรตีนที่จะส่งออกหรือฝังที่เยื่อ</td></tr>
<tr><td><b>ER เรียบ</b></td><td>สร้างลิพิด สเตอรอยด์ · <b>กำจัดสารพิษ</b></td></tr>
<tr><td><b>กอลจิคอมเพลกซ์</b></td><td>ดัดแปลง คัดแยก บรรจุ ส่งต่อ</td></tr>
<tr><td><b>ไลโซโซม</b></td><td>เอนไซม์ย่อยสลาย (ทำงานดีที่ pH ~5)</td></tr>
<tr><td>แวคิวโอล</td><td>เก็บสาร · แรงดันเต่งในพืช</td></tr>
</table>
<div class="box why"><b>ทำไมขังเอนไซม์ย่อยไว้ในไลโซโซม</b> เอนไซม์พวกนี้ทำงานดีที่ <b>pH 5</b> ต่อให้รั่วออกมาเจอไซโทซอล pH 7 ก็ทำงานได้ไม่ดี — เป็นระบบนิรภัยสองชั้น (ขังไว้ + ปรับ pH) หลักการเดียวกับหัวข้อ 3.5</div>
<div class="box warn"><b>ผิดบ่อย</b> "กอลจิสร้างโปรตีน" — <b>ผิด</b> ตัวที่สร้างคือ<b>ไรโบโซม</b> กอลจิแค่ดัดแปลงและส่งต่อ</div>
<div class="box tip"><b>จำ RER/SER</b> <b>R</b>ough มีไ<b>ร</b>โบโซม → โ<b>ป</b>รตีน · <b>S</b>mooth เรียบ → ลิ<b>พิ</b>ด และล้าง<b>พิษ</b> (เซลล์ตับมี SER เยอะ)</div>` },

    { id:"d8", t:"c", x:1420, y:1500, w:250, c:"#7c5cd6",
      title:"4.6 ไมโทคอนเดรีย / คลอโรพลาสต์",
      body:"ทั้งคู่: เยื่อ 2 ชั้น · DNA ของตัวเอง · พับเพิ่มพื้นที่ผิว<br>สลาย ATP vs สร้างน้ำตาล",
      detail:`<h3>4.6 สองโรงงานพลังงาน</h3>
` + SVG_MITO + `
<table>
<tr><th>ส่วน</th><th>เกิดอะไร</th></tr>
<tr><td>เยื่อชั้นใน (<b>คริสตี</b>)</td><td><b>การถ่ายทอดอิเล็กตรอน</b> · พับเพื่อเพิ่มพื้นที่ผิว</td></tr>
<tr><td><b>เมทริกซ์</b></td><td><b>วัฏจักรเครบส์</b> · มี DNA และไรโบโซม</td></tr>
</table>
` + SVG_CHLORO + `
<table>
<tr><th>ส่วน</th><th>เกิดอะไร</th></tr>
<tr><td><b>ไทลาคอยด์ / กรานุม</b></td><td>มีคลอโรฟิลล์ · <b>รับพลังงานแสง</b></td></tr>
<tr><td><b>สโตรมา</b></td><td><b>สร้างน้ำตาลจาก CO₂</b> · มี DNA และเม็ดแป้ง</td></tr>
</table>
<div class="box why"><b>เชื่อมกับบทที่ 3</b> ไกลโคลิซิส → <b>ไซโทซอล</b> · วัฏจักรเครบส์ → <b>เมทริกซ์</b> · การถ่ายทอดอิเล็กตรอน → <b>เยื่อชั้นใน</b></div>
<div class="box warn"><b>ผิดบ่อยมาก</b> "พืชไม่ต้องหายใจ" — <b>ผิด</b> พืชสังเคราะห์ด้วยแสงเพื่อสร้างน้ำตาล แต่ยังต้องสลายน้ำตาลในไมโทคอนเดรียเพื่อให้ได้ ATP ตลอดทั้งกลางวันกลางคืน</div>` },

    { id:"d9", t:"c", x:1420, y:1700, w:250, c:"#7c5cd6",
      title:"4.7 ไรโบโซม ไซโทสเกเลตอน เซนทริโอล",
      body:"ทั้งสามตัว <b>ไม่มีเยื่อหุ้ม</b><br>ไรโบโซม = สร้างโปรตีน ทั้งลอยอิสระและเกาะ ER",
      detail:`<h3>4.7 โครงสร้างที่ไม่มีเยื่อหุ้ม</h3>
<table>
<tr><th>โครงสร้าง</th><th>หน้าที่</th></tr>
<tr><td><b>ไรโบโซม</b></td><td>สังเคราะห์โปรตีน · ทำจาก rRNA + โปรตีน ไม่มีเยื่อหุ้ม</td></tr>
<tr><td><b>ไซโทสเกเลตอน</b></td><td>ค้ำจุนรูปร่าง · ยึดออร์แกเนลล์ · เป็นรางลำเลียงภายใน</td></tr>
<tr><td>ไมโครฟิลาเมนต์ (แอกทิน)</td><td>เส้นเล็กสุด · การเคลื่อนไหวและการหดตัวของกล้ามเนื้อ</td></tr>
<tr><td>ไมโครทิวบูล (ทูบูลิน)</td><td>ท่อกลวงใหญ่สุด · รางลากโครโมโซม · แกนของซิเลียและแฟลเจลลัม</td></tr>
<tr><td><b>เซนทริโอล</b></td><td>สร้างเส้นใยสปินเดิล · พบใน<b>เซลล์สัตว์</b></td></tr>
</table>
<h4>ไรโบโซมอยู่ 2 ที่ งานคนละแบบ</h4>
<p><b>ลอยอิสระ</b> → โปรตีนใช้ในเซลล์เอง · <b>เกาะบน ER ขรุขระ</b> → โปรตีนส่งออกนอกเซลล์หรือฝังที่เยื่อ</p>
<div class="box tip"><b>สูตรทำข้อสอบ</b> เซลล์<b>หลั่งสารมาก</b> → ER ขรุขระ + กอลจิเยอะ · เซลล์<b>ใช้พลังงานมาก</b> → ไมโทคอนเดรียเยอะ · เซลล์<b>กำจัดสารพิษ</b> → ER เรียบเยอะ</div>
<div class="box warn"><b>ระวัง</b> <b>เซนทริโอล</b> (ออร์แกเนลล์ในเซลล์สัตว์) ไม่ใช่ <b>เซนโทรเมียร์</b> (ตำแหน่งคอดบนโครโมโซม)</div>` },

    { id:"d10", t:"c", x:1420, y:1900, w:250, c:"#7c5cd6",
      title:"4.8 การลำเลียงสารผ่านเยื่อหุ้ม",
      body:"ตามความเข้มข้น = ไม่ใช้ ATP<br>ทวนความเข้มข้น = ใช้ ATP<br>น้ำวิ่งไปหาที่เข้มข้นกว่า",
      detail:`<h3>4.8 การลำเลียงสาร</h3>
` + SVG_TRANSPORT + `
<table>
<tr><th>วิธี</th><th>ทิศทาง</th><th>โปรตีน</th><th>ATP</th></tr>
<tr><td>การแพร่</td><td>มาก → น้อย</td><td>ไม่ใช้</td><td><b>ไม่ใช้</b></td></tr>
<tr><td>ออสโมซิส</td><td>น้ำไปทางที่เข้มข้นกว่า</td><td>อาจใช้</td><td><b>ไม่ใช้</b></td></tr>
<tr><td>แพร่แบบฟาซิลิเทต</td><td>มาก → น้อย</td><td><b>ใช้</b></td><td><b>ไม่ใช้</b></td></tr>
<tr><td><b>ลำเลียงแบบใช้พลังงาน</b></td><td><b>ทวน</b></td><td><b>ใช้</b></td><td><b>ใช้</b></td></tr>
<tr><td>เอนโด/เอกโซไซโทซิส</td><td>โอบเข้า / ปล่อยออกทั้งถุง</td><td>ใช้เยื่อหุ้ม</td><td><b>ใช้</b></td></tr>
</table>
` + SVG_OSMOSIS + `
<table>
<tr><th>สารละลายนอกเซลล์</th><th>เซลล์สัตว์</th><th>เซลล์พืช</th></tr>
<tr><td><b>ไฮเพอร์โทนิก</b> (เข้มข้นกว่า)</td><td>เหี่ยว</td><td><b>พลาสโมไลซิส</b></td></tr>
<tr><td><b>ไอโซโทนิก</b></td><td><b>ปกติ — ดีที่สุดสำหรับสัตว์</b></td><td>ไม่เต่ง</td></tr>
<tr><td><b>ไฮโพโทนิก</b> (เจือจางกว่า)</td><td>บวม อาจแตก</td><td><b>เต่ง — ดีที่สุดสำหรับพืช</b></td></tr>
</table>
<div class="box warn"><b>จำให้ถูก</b> "<b>น้ำวิ่งไปหาที่เค็มกว่า</b>" ไม่ใช่ไปหาที่น้ำเยอะกว่า — โรยเกลือบนผักแล้วผักเหี่ยว เพราะข้างนอกเค็มกว่า</div>
<div class="box tip"><b>โซเดียม-โพแทสเซียมปั๊ม</b> ดัน <b>Na⁺ ออก 3</b> และ <b>K⁺ เข้า 2</b> ต่อ ATP 1 โมเลกุล ทวนความเข้มข้นทั้งคู่</div>` },

    /* ป้ายหัวคอลัมน์ + เส้นเชื่อม */
    { id:"lb5", t:"x", x:1420, y:60, w:300, html:"บทที่ 4 · โครงสร้างและหน้าที่ของเซลล์", size:15, bold:true, c:"#7c5cd6" },
    { id:"n30", t:"n", a:{id:"c15"}, b:{id:"d1"},  c:"#7c5cd6", w:2.5, arrow:"end", route:"e" },
    { id:"n31", t:"n", a:{id:"d1"},  b:{id:"d2"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n32", t:"n", a:{id:"d2"},  b:{id:"d3"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n33", t:"n", a:{id:"d3"},  b:{id:"d4"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n34", t:"n", a:{id:"d4"},  b:{id:"d5"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n35", t:"n", a:{id:"d5"},  b:{id:"d6"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n36", t:"n", a:{id:"d6"},  b:{id:"d7"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n37", t:"n", a:{id:"d7"},  b:{id:"d8"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n38", t:"n", a:{id:"d8"},  b:{id:"d9"},  c:"auto", w:2, arrow:"end", route:"e" },
    { id:"n39", t:"n", a:{id:"d9"},  b:{id:"d10"}, c:"auto", w:2, arrow:"end", route:"e" },
    { id:"x6", t:"n", a:{id:"c13"}, b:{id:"d5"},  c:"#2e9e6b", w:1.8, dash:1, arrow:"end", route:"e" },
    { id:"x7", t:"n", a:{id:"c29"}, b:{id:"d8"},  c:"#d98324", w:1.8, dash:1, arrow:"end", route:"e" },
    { id:"lb6", t:"x", x:700, y:1420, w:330, html:"ฟอสโฟลิพิด → เยื่อหุ้มเซลล์จริง", size:13, bold:false, c:"#2e9e6b" },
    { id:"lb7", t:"x", x:1120, y:1640, w:330, html:"การหายใจระดับเซลล์ → เกิดที่ไมโทคอนเดรีย", size:13, bold:false, c:"#d98324" }
  ];

  STARTER_DIAGRAM[ID] = STARTER_DIAGRAM[ID].concat(CH4_CARDS);

})();
