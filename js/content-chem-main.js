/* ============================================================
   content-chem-main.js — วิทย์กายภาพ (เคมี) หัวข้อหลัก
   สรุปจากหัวข้อที่ Taco ส่งมา (สรุปจากรูปเรียน 33–67)
   ครอบคลุม 4 บท: อะตอม/ตารางธาตุ · พันธะ · พอลิเมอร์ · ปฏิกิริยาและกัมมันตรังสี
   หมายเหตุ: หัวข้อ "โครงสร้างอะตอม & พันธะเคมี" (คาบเสริม) เจาะลึกกว่านี้
   ไฟล์นี้เน้นความครบของทั้งวิชากายภาพ
   ============================================================ */
(function () {
  const ID = "chem_main";

  const SVG_NUCLEAR = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="สัญลักษณ์นิวเคลียร์">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อ่านสัญลักษณ์นิวเคลียร์</text>
  <g font-family="serif">
    <text x="120" y="62" font-size="20" font-weight="700" fill="#e05252">23</text>
    <text x="120" y="92" font-size="20" font-weight="700" fill="#3b7ddd">11</text>
    <text x="146" y="80" font-size="34" font-weight="700" fill="currentColor">Na</text>
  </g>
  <g stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.6">
    <path d="M 114 56 L 66 44"/><path d="M 114 88 L 66 104"/>
  </g>
  <text x="62" y="42" text-anchor="end" font-size="10" font-weight="700" fill="#e05252">เลขมวล A</text>
  <text x="62" y="56" text-anchor="end" font-size="9.5" fill="currentColor">p + n = 23</text>
  <text x="62" y="104" text-anchor="end" font-size="10" font-weight="700" fill="#3b7ddd">เลขอะตอม Z</text>
  <text x="62" y="118" text-anchor="end" font-size="9.5" fill="currentColor">p = 11</text>
  <g font-size="10.5" fill="currentColor">
    <text x="210" y="50" font-weight="700">คิดต่อได้ทันที</text>
    <text x="210" y="68">โปรตอน = Z = 11</text>
    <text x="210" y="86">นิวตรอน = A − Z = 12</text>
    <text x="210" y="104">อิเล็กตรอน (อะตอมกลาง) = 11</text>
  </g>
  <line x1="20" y1="130" x2="380" y2="130" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="148" font-weight="700">ไอออนคิดยังไง</text>
    <text x="20" y="166">ไอออนบวก = <tspan font-weight="700">เสีย</tspan> e⁻ &nbsp;→&nbsp; Na⁺ มี e⁻ = 11 − 1 = 10</text>
    <text x="20" y="184">ไอออนลบ = <tspan font-weight="700">รับ</tspan> e⁻ &nbsp;→&nbsp; Cl⁻ (Z=17) มี e⁻ = 17 + 1 = 18</text>
    <text x="20" y="206" font-weight="700" fill="#d98324">ไอโซโทป</text>
    <text x="20" y="224">ธาตุเดียวกัน (Z เท่ากัน) แต่ <tspan font-weight="700">n ต่างกัน</tspan> → A ต่างกัน</text>
    <text x="20" y="242" font-size="10">เช่น ¹²C กับ ¹⁴C สมบัติทางเคมีเหมือนกัน เพราะ e⁻ เท่ากัน</text>
  </g>
</svg>`;

  const SVG_MODELS2 = `<svg viewBox="0 0 400 240" width="400" height="240" role="img" aria-label="พัฒนาการแบบจำลองอะตอม">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">แบบจำลองอะตอมเปลี่ยนเพราะมีหลักฐานใหม่</text>
  <g text-anchor="middle">
    <circle cx="52" cy="58" r="20" fill="#7c5cd6" opacity="0.8"/>
    <text x="52" y="96" font-size="10" font-weight="700" fill="currentColor">ดอลตัน</text>
    <text x="52" y="110" font-size="8.5" fill="currentColor">ทรงกลมตัน</text>

    <circle cx="140" cy="58" r="20" fill="#3b7ddd" opacity="0.3"/>
    <g fill="#3b7ddd"><circle cx="132" cy="52" r="3"/><circle cx="148" cy="55" r="3"/><circle cx="137" cy="66" r="3"/></g>
    <text x="140" y="96" font-size="10" font-weight="700" fill="currentColor">ทอมสัน</text>
    <text x="140" y="110" font-size="8.5" fill="currentColor">ขนมปังลูกเกด</text>

    <circle cx="228" cy="58" r="20" fill="none" stroke="#2e9e6b" stroke-width="1.4" stroke-dasharray="3 3"/>
    <circle cx="228" cy="58" r="5" fill="#e05252"/>
    <circle cx="242" cy="47" r="2.6" fill="#2e9e6b"/><circle cx="215" cy="68" r="2.6" fill="#2e9e6b"/>
    <text x="228" y="96" font-size="10" font-weight="700" fill="currentColor">รัทเทอร์ฟอร์ด</text>
    <text x="228" y="110" font-size="8.5" fill="currentColor">มีนิวเคลียสตรงกลาง</text>

    <circle cx="316" cy="58" r="10" fill="none" stroke="#d98324" stroke-width="1.2"/>
    <circle cx="316" cy="58" r="20" fill="none" stroke="#d98324" stroke-width="1.2"/>
    <circle cx="316" cy="58" r="4" fill="#e05252"/>
    <circle cx="326" cy="58" r="2.6" fill="#d98324"/><circle cx="316" cy="38" r="2.6" fill="#d98324"/>
    <text x="316" y="96" font-size="10" font-weight="700" fill="currentColor">โบร์</text>
    <text x="316" y="110" font-size="8.5" fill="currentColor">วงระดับพลังงาน</text>
  </g>
  <g stroke="currentColor" stroke-width="1.2" opacity="0.5" fill="none">
    <path d="M 76 58 h 40"/><path d="M 164 58 h 40"/><path d="M 252 58 h 40"/>
  </g>
  <line x1="20" y1="126" x2="380" y2="126" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="144" font-weight="700">หลักฐานที่ทำให้ต้องเปลี่ยน</text>
    <text x="20" y="162">ทอมสัน: หลอดรังสีแคโทด พบอนุภาคลบในทุกธาตุ → อะตอมแบ่งได้</text>
    <text x="20" y="180">รัทเทอร์ฟอร์ด: ยิงอนุภาคแอลฟาใส่แผ่นทอง บางอันสะท้อนกลับ</text>
    <text x="20" y="198">→ มวลและประจุบวกกระจุกอยู่ตรงกลางเป็นนิวเคลียสเล็ก ๆ</text>
    <text x="20" y="216">โบร์: สเปกตรัมเส้นของไฮโดรเจน → e⁻ อยู่ในระดับพลังงานที่แน่นอน</text>
    <text x="20" y="234" font-weight="700" fill="#7c5cd6">ปัจจุบัน: แบบจำลองกลุ่มหมอก บอกได้แค่โอกาสที่จะพบ e⁻</text>
  </g>
</svg>`;

  const SVG_PERIODIC = `<svg viewBox="0 0 400 270" width="400" height="270" role="img" aria-label="ตารางธาตุและสมบัติ">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อ่านตารางธาตุให้เป็น</text>
  <g>
    <rect x="24" y="32" width="150" height="56" rx="9" fill="#3b7ddd" opacity="0.16"/>
    <text x="99" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#3b7ddd">โลหะ (ซ้ายและกลาง)</text>
    <text x="99" y="66" text-anchor="middle" font-size="9" fill="currentColor">นำไฟฟ้าดี · ตีแผ่ได้ · เป็นมันวาว</text>
    <text x="99" y="80" text-anchor="middle" font-size="9" fill="currentColor">มักเสีย e⁻ เป็นไอออนบวก</text>

    <rect x="182" y="32" width="86" height="56" rx="9" fill="#2e9e6b" opacity="0.16"/>
    <text x="225" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#2e9e6b">กึ่งโลหะ</text>
    <text x="225" y="66" text-anchor="middle" font-size="9" fill="currentColor">นำไฟฟ้าได้บ้าง</text>
    <text x="225" y="80" text-anchor="middle" font-size="9" fill="currentColor">Si · Ge ใช้ทำชิป</text>

    <rect x="276" y="32" width="100" height="56" rx="9" fill="#d98324" opacity="0.16"/>
    <text x="326" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#d98324">อโลหะ (ขวาบน)</text>
    <text x="326" y="66" text-anchor="middle" font-size="9" fill="currentColor">ไม่นำไฟฟ้า · เปราะ</text>
    <text x="326" y="80" text-anchor="middle" font-size="9" fill="currentColor">มักรับ e⁻ เป็นไอออนลบ</text>
  </g>
  <g font-size="10" fill="currentColor">
    <text x="24" y="110" font-weight="700">หมู่ (คอลัมน์) = จำนวนเวเลนซ์อิเล็กตรอน</text>
    <text x="24" y="128">หมู่ 1A = 1 ตัว · 2A = 2 ตัว · … · 7A = 7 ตัว · 8A = 8 ตัว (ครบออกเตต)</text>
    <text x="24" y="146" font-weight="700">คาบ (แถว) = จำนวนระดับพลังงาน (ชั้นของอิเล็กตรอน)</text>
  </g>
  <line x1="20" y1="164" x2="380" y2="164" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="182" font-weight="700">หมู่ที่ต้องรู้จักชื่อ</text>
    <text x="20" y="200">1A โลหะแอลคาไล (ว่องไวมาก) · 2A โลหะแอลคาไลน์เอิร์ท</text>
    <text x="20" y="218">7A แฮโลเจน (ว่องไวมาก) · 8A แก๊สมีสกุล (เฉื่อยเพราะ e⁻ ครบ 8)</text>
    <text x="20" y="240" font-weight="700" fill="#e05252">ทำไมแก๊สมีสกุลถึงเฉื่อย</text>
    <text x="20" y="258" font-size="10">เพราะชั้นนอกสุดมี e⁻ ครบแล้ว ไม่ต้องให้หรือรับจากใคร จึงไม่ทำปฏิกิริยา</text>
  </g>
</svg>`;

  const SVG_BONDTYPE = `<svg viewBox="0 0 400 270" width="400" height="270" role="img" aria-label="พันธะไอออนิกกับโคเวเลนต์">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ไอออนิก = ให้กันขาด · โคเวเลนต์ = ใช้ร่วมกัน</text>
  <g>
    <rect x="18" y="30" width="178" height="96" rx="10" fill="#3b7ddd" opacity="0.10"/>
    <text x="107" y="48" text-anchor="middle" font-size="11" font-weight="700" fill="#3b7ddd">พันธะไอออนิก</text>
    <circle cx="58" cy="76" r="15" fill="#3b7ddd" opacity="0.5"/>
    <text x="58" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Na</text>
    <circle cx="152" cy="76" r="15" fill="#d98324" opacity="0.5"/>
    <text x="152" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Cl</text>
    <g stroke="#e05252" stroke-width="1.6" fill="none">
      <path d="M 76 70 L 130 70"/><path d="M 124 66 L 131 70 L 124 74"/>
    </g>
    <circle cx="103" cy="70" r="3.4" fill="#e05252"/>
    <text x="107" y="102" text-anchor="middle" font-size="9" fill="currentColor">โลหะให้ e⁻ → อโลหะรับ</text>
    <text x="107" y="116" text-anchor="middle" font-size="9.5" font-weight="700" fill="currentColor">Na⁺ กับ Cl⁻ ดูดกันด้วยแรงไฟฟ้า</text>

    <rect x="204" y="30" width="178" height="96" rx="10" fill="#2e9e6b" opacity="0.10"/>
    <text x="293" y="48" text-anchor="middle" font-size="11" font-weight="700" fill="#2e9e6b">พันธะโคเวเลนต์</text>
    <circle cx="255" cy="76" r="15" fill="#2e9e6b" opacity="0.5"/>
    <text x="255" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">H</text>
    <circle cx="331" cy="76" r="15" fill="#2e9e6b" opacity="0.5"/>
    <text x="331" y="80" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">H</text>
    <circle cx="287" cy="76" r="3.4" fill="#e05252"/><circle cx="299" cy="76" r="3.4" fill="#e05252"/>
    <path d="M 270 76 h 46" stroke="currentColor" stroke-width="1" opacity="0.4"/>
    <text x="293" y="102" text-anchor="middle" font-size="9" fill="currentColor">อโลหะกับอโลหะ ใช้ e⁻ คู่ร่วมกัน</text>
    <text x="293" y="116" text-anchor="middle" font-size="9.5" font-weight="700" fill="currentColor">เกิดเป็นโมเลกุล H₂</text>
  </g>
  <line x1="20" y1="142" x2="380" y2="142" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="160" font-weight="700">เทียบสมบัติที่ออกสอบบ่อย</text>
    <text x="20" y="178">ไอออนิก: จุดหลอมเหลวสูงมาก · ของแข็งไม่นำไฟฟ้า</text>
    <text x="20" y="196">แต่<tspan font-weight="700">หลอมเหลวหรือละลายน้ำแล้วนำไฟฟ้า</tspan> เพราะไอออนเคลื่อนที่ได้</text>
    <text x="20" y="214">โคเวเลนต์: จุดหลอมเหลวต่ำ · ไม่นำไฟฟ้าทั้งของแข็งและของเหลว</text>
    <text x="20" y="236" font-weight="700" fill="#7c5cd6">กฎออกเตต</text>
    <text x="20" y="254" font-size="10">อะตอมจะให้ รับ หรือใช้ e⁻ ร่วมกัน เพื่อให้ชั้นนอกสุดครบ 8 เหมือนแก๊สมีสกุล</text>
  </g>
</svg>`;

  const SVG_IMF2 = `<svg viewBox="0 0 400 270" width="400" height="270" role="img" aria-label="แรงยึดเหนี่ยวระหว่างโมเลกุล">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">แรงระหว่างโมเลกุล — ตัวกำหนดจุดเดือด</text>
  <g>
    <rect x="20" y="32" width="112" height="66" rx="9" fill="#3b7ddd" opacity="0.14"/>
    <text x="76" y="50" text-anchor="middle" font-size="10.5" font-weight="700" fill="#3b7ddd">แรงลอนดอน</text>
    <text x="76" y="66" text-anchor="middle" font-size="9" fill="currentColor">มีในทุกโมเลกุล</text>
    <text x="76" y="80" text-anchor="middle" font-size="9" fill="currentColor">โมเลกุลใหญ่ = แรงมาก</text>
    <text x="76" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor">อ่อนที่สุด</text>

    <rect x="144" y="32" width="112" height="66" rx="9" fill="#2e9e6b" opacity="0.14"/>
    <text x="200" y="50" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2e9e6b">ขั้ว–ขั้ว</text>
    <text x="200" y="66" text-anchor="middle" font-size="9" fill="currentColor">เฉพาะโมเลกุลมีขั้ว</text>
    <text x="200" y="80" text-anchor="middle" font-size="9" fill="currentColor">ปลายบวกดูดปลายลบ</text>
    <text x="200" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor">ปานกลาง</text>

    <rect x="268" y="32" width="112" height="66" rx="9" fill="#e05252" opacity="0.14"/>
    <text x="324" y="50" text-anchor="middle" font-size="10.5" font-weight="700" fill="#e05252">พันธะไฮโดรเจน</text>
    <text x="324" y="66" text-anchor="middle" font-size="9" fill="currentColor">H ติดกับ F, O, N</text>
    <text x="324" y="80" text-anchor="middle" font-size="9" fill="currentColor">เช่น น้ำ แอลกอฮอล์</text>
    <text x="324" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor">แรงที่สุด</text>
  </g>
  <g font-size="10" fill="currentColor">
    <text x="20" y="122" font-weight="700">แรงมากขึ้น → ต้องใช้พลังงานมากขึ้นในการแยกโมเลกุลออกจากกัน</text>
    <text x="20" y="140">→ จุดเดือดและจุดหลอมเหลว<tspan font-weight="700">สูงขึ้น</tspan> · ระเหยยากขึ้น</text>
  </g>
  <line x1="20" y1="156" x2="380" y2="156" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="174" font-weight="700">ตัวอย่างที่อธิบายได้ด้วยแรงเหล่านี้</text>
    <text x="20" y="192">น้ำ (H₂O, M=18) เดือดที่ 100°C แต่ CH₄ (M=16) เดือดที่ −162°C</text>
    <text x="20" y="210">ทั้งที่มวลใกล้กัน — เพราะน้ำมี<tspan font-weight="700">พันธะไฮโดรเจน</tspan> ส่วนมีเทนมีแค่ลอนดอน</text>
    <text x="20" y="232" font-weight="700" fill="#d98324">ระวังสับสน</text>
    <text x="20" y="250" font-size="10">แรงระหว่างโมเลกุล<tspan font-weight="700">อ่อนกว่า</tspan>พันธะเคมีในโมเลกุลมาก — ต้มน้ำเดือดคือแยกโมเลกุล</text>
    <text x="20" y="264" font-size="10">ไม่ใช่สลาย H₂O เป็น H กับ O</text>
  </g>
</svg>`;

  const SVG_HYDRO = `<svg viewBox="0 0 400 280" width="400" height="280" role="img" aria-label="สารประกอบไฮโดรคาร์บอน">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ไฮโดรคาร์บอน — ดูที่พันธะระหว่างคาร์บอน</text>
  <g stroke="currentColor" stroke-width="1.8" fill="none">
    <path d="M 40 60 L 80 60"/>
    <path d="M 150 56 L 190 56 M 150 64 L 190 64"/>
    <path d="M 260 52 L 300 52 M 260 60 L 300 60 M 260 68 L 300 68"/>
  </g>
  <g font-size="11" font-weight="700" text-anchor="middle" fill="currentColor">
    <text x="32" y="64">C</text><text x="88" y="64">C</text>
    <text x="142" y="64">C</text><text x="198" y="64">C</text>
    <text x="252" y="64">C</text><text x="308" y="64">C</text>
  </g>
  <g font-size="10" text-anchor="middle" fill="currentColor">
    <text x="60" y="88" font-weight="700" fill="#3b7ddd">แอลเคน</text>
    <text x="60" y="102" font-size="9">พันธะเดี่ยว · CₙH₂ₙ₊₂</text>
    <text x="60" y="114" font-size="9">อิ่มตัว · ว่องไวน้อย</text>
    <text x="170" y="88" font-weight="700" fill="#2e9e6b">แอลคีน</text>
    <text x="170" y="102" font-size="9">พันธะคู่ · CₙH₂ₙ</text>
    <text x="170" y="114" font-size="9">ไม่อิ่มตัว · ว่องไวกว่า</text>
    <text x="280" y="88" font-weight="700" fill="#d98324">แอลไคน์</text>
    <text x="280" y="102" font-size="9">พันธะสาม · CₙH₂ₙ₋₂</text>
    <text x="280" y="114" font-size="9">ไม่อิ่มตัวมากที่สุด</text>
  </g>
  <g>
    <polygon points="70,150 90,138 110,150 110,174 90,186 70,174" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="90" cy="162" r="10" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <text x="90" y="204" text-anchor="middle" font-size="10" font-weight="700" fill="#7c5cd6">อะโรมาติก</text>
    <text x="90" y="218" text-anchor="middle" font-size="9" fill="currentColor">วงเบนซีน C₆H₆</text>
    <polygon points="230,148 258,148 258,176 230,176" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <text x="244" y="204" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">โซ่ปิด (วง)</text>
    <text x="244" y="218" text-anchor="middle" font-size="9" fill="currentColor">ไซโคลแอลเคน</text>
    <path d="M 300 176 L 320 152 L 340 176 L 360 152" stroke="currentColor" stroke-width="1.6" fill="none"/>
    <text x="330" y="204" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">โซ่เปิด</text>
    <text x="330" y="218" text-anchor="middle" font-size="9" fill="currentColor">ตรงหรือแตกกิ่ง</text>
  </g>
  <line x1="20" y1="232" x2="380" y2="232" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="250" font-weight="700">แปลงระหว่างสูตรสามแบบ</text>
    <text x="20" y="268" font-size="10">สูตรโมเลกุล C₃H₈ → สูตรย่อ CH₃CH₂CH₃ → สูตรโครงสร้างวาดพันธะครบทุกเส้น</text>
  </g>
</svg>`;

  const SVG_POLYMER2 = `<svg viewBox="0 0 400 280" width="400" height="280" role="img" aria-label="พอลิเมอร์">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">มอนอเมอร์ → พอลิเมอไรเซชัน → พอลิเมอร์</text>
  <g>
    <circle cx="44" cy="52" r="9" fill="#3b7ddd"/><circle cx="70" cy="52" r="9" fill="#3b7ddd"/><circle cx="96" cy="52" r="9" fill="#3b7ddd"/>
    <text x="70" y="78" text-anchor="middle" font-size="9.5" fill="currentColor">มอนอเมอร์ (หน่วยย่อย)</text>
    <g stroke="currentColor" stroke-width="1.6" fill="none">
      <path d="M 116 52 h 26"/><path d="M 136 48 L 143 52 L 136 56"/>
    </g>
    <text x="129" y="38" text-anchor="middle" font-size="9" fill="currentColor">ต่อกัน</text>
    <circle cx="170" cy="52" r="9" fill="#2e9e6b"/><circle cx="192" cy="52" r="9" fill="#2e9e6b"/>
    <circle cx="214" cy="52" r="9" fill="#2e9e6b"/><circle cx="236" cy="52" r="9" fill="#2e9e6b"/>
    <circle cx="258" cy="52" r="9" fill="#2e9e6b"/>
    <path d="M 179 52 h 4 M 201 52 h 4 M 223 52 h 4 M 245 52 h 4" stroke="currentColor" stroke-width="2"/>
    <text x="214" y="78" text-anchor="middle" font-size="9.5" fill="currentColor">พอลิเมอร์ (สายยาว)</text>
    <text x="330" y="48" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">ตัวอย่าง</text>
    <text x="330" y="64" text-anchor="middle" font-size="9" fill="currentColor">เอทิลีน → พอลิเอทิลีน</text>
    <text x="330" y="78" text-anchor="middle" font-size="9" fill="currentColor">กลูโคส → แป้ง</text>
  </g>
  <g>
    <text x="70" y="108" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">แบบเส้น</text>
    <path d="M 26 126 h 88" stroke="#3b7ddd" stroke-width="2.4" fill="none"/>
    <text x="70" y="146" text-anchor="middle" font-size="8.5" fill="currentColor">เรียงชิด แข็งแรง เหนียว</text>
    <text x="200" y="108" text-anchor="middle" font-size="10" font-weight="700" fill="#2e9e6b">แบบกิ่ง</text>
    <path d="M 156 126 h 88 M 178 126 l 8 -12 M 210 126 l 8 -12 M 194 126 l -8 12" stroke="#2e9e6b" stroke-width="2.2" fill="none"/>
    <text x="200" y="146" text-anchor="middle" font-size="8.5" fill="currentColor">เรียงไม่ชิด อ่อนกว่า</text>
    <text x="330" y="108" text-anchor="middle" font-size="10" font-weight="700" fill="#e05252">แบบร่างแห</text>
    <path d="M 292 114 h 76 M 292 132 h 76 M 306 108 v 30 M 340 108 v 30" stroke="#e05252" stroke-width="2" fill="none"/>
    <text x="330" y="146" text-anchor="middle" font-size="8.5" fill="currentColor">เชื่อมข้ามสาย แข็งมาก</text>
  </g>
  <line x1="20" y1="164" x2="380" y2="164" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="182" font-weight="700">ธรรมชาติ กับ สังเคราะห์</text>
    <text x="20" y="200">ธรรมชาติ: แป้ง เซลลูโลส โปรตีน ยางธรรมชาติ DNA</text>
    <text x="20" y="218">สังเคราะห์: พอลิเอทิลีน (ถุง) · PVC (ท่อ) · ไนลอน · พอลิเอสเทอร์</text>
    <text x="20" y="240" font-weight="700" fill="#d98324">โครงสร้างกำหนดสมบัติ</text>
    <text x="20" y="258" font-size="10">แบบเส้นเรียงชิดกันได้ → แน่น แข็งแรง · แบบกิ่งเรียงไม่ชิด → นิ่มกว่า</text>
    <text x="20" y="274" font-size="10">แบบร่างแหเชื่อมกันหมดทั้งก้อน → แข็ง ไม่หลอมใหม่ ขึ้นรูปซ้ำไม่ได้</text>
  </g>
</svg>`;

  const SVG_PLASTIC = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="เทอร์มอพลาสติกกับเทอร์มอเซต">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">เทอร์มอพลาสติก กับ เทอร์มอเซต</text>
  <g>
    <rect x="20" y="32" width="176" height="98" rx="10" fill="#3b7ddd" opacity="0.12"/>
    <text x="108" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#3b7ddd">เทอร์มอพลาสติก</text>
    <text x="108" y="68" text-anchor="middle" font-size="9.5" fill="currentColor">โครงสร้างแบบเส้น/กิ่ง</text>
    <text x="108" y="84" text-anchor="middle" font-size="9.5" fill="currentColor">ร้อนแล้ว<tspan font-weight="700">อ่อนตัว</tspan> เย็นแล้วแข็ง</text>
    <text x="108" y="100" text-anchor="middle" font-size="9.5" font-weight="700" fill="#2e9e6b">หลอมขึ้นรูปใหม่ได้ → รีไซเคิลได้</text>
    <text x="108" y="118" text-anchor="middle" font-size="9" fill="currentColor">ขวดน้ำ ถุง ท่อ PVC กล่องอาหาร</text>

    <rect x="204" y="32" width="176" height="98" rx="10" fill="#e05252" opacity="0.12"/>
    <text x="292" y="50" text-anchor="middle" font-size="11" font-weight="700" fill="#e05252">เทอร์มอเซต</text>
    <text x="292" y="68" text-anchor="middle" font-size="9.5" fill="currentColor">โครงสร้าง<tspan font-weight="700">แบบร่างแห</tspan></text>
    <text x="292" y="84" text-anchor="middle" font-size="9.5" fill="currentColor">ร้อนแล้ว<tspan font-weight="700">ไม่อ่อน</tspan> ร้อนมากจะไหม้</text>
    <text x="292" y="100" text-anchor="middle" font-size="9.5" font-weight="700" fill="#e05252">ขึ้นรูปใหม่ไม่ได้ → รีไซเคิลยาก</text>
    <text x="292" y="118" text-anchor="middle" font-size="9" fill="currentColor">เมลามีน จานชาม ปลั๊กไฟ กาวอีพ็อกซี</text>
  </g>
  <line x1="20" y1="146" x2="380" y2="146" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="164" font-weight="700">เลือกใช้และแยกทิ้งอย่างไร</text>
    <text x="20" y="182">ดูรหัสสามเหลี่ยมใต้ภาชนะ: 1 PET (ขวดน้ำ) · 2 HDPE (ขวดนม)</text>
    <text x="20" y="200">3 PVC · 4 LDPE (ถุง) · 5 PP (กล่องไมโครเวฟ) · 6 PS (โฟม) · 7 อื่น ๆ</text>
    <text x="20" y="222" font-weight="700" fill="#2e9e6b">ลดปัญหาพลาสติกด้วยหลัก 3R</text>
    <text x="20" y="240" font-size="10">Reduce ใช้น้อยลง → Reuse ใช้ซ้ำ → Recycle แปรรูปใหม่ (ลำดับสำคัญ)</text>
  </g>
</svg>`;

  const SVG_BALANCE = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="การดุลสมการเคมี">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ดุลสมการเคมี — จำนวนอะตอมต้องเท่ากันสองข้าง</text>
  <g font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">
    <text x="200" y="48">CH₄ + 2O₂ → CO₂ + 2H₂O</text>
  </g>
  <g font-size="10">
    <rect x="40" y="62" width="150" height="76" rx="9" fill="#3b7ddd" opacity="0.12"/>
    <text x="115" y="80" text-anchor="middle" font-weight="700" fill="#3b7ddd">ฝั่งสารตั้งต้น</text>
    <text x="115" y="98" text-anchor="middle" fill="currentColor">C = 1</text>
    <text x="115" y="114" text-anchor="middle" fill="currentColor">H = 4</text>
    <text x="115" y="130" text-anchor="middle" fill="currentColor">O = 2 × 2 = 4</text>
    <rect x="210" y="62" width="150" height="76" rx="9" fill="#2e9e6b" opacity="0.12"/>
    <text x="285" y="80" text-anchor="middle" font-weight="700" fill="#2e9e6b">ฝั่งผลิตภัณฑ์</text>
    <text x="285" y="98" text-anchor="middle" fill="currentColor">C = 1</text>
    <text x="285" y="114" text-anchor="middle" fill="currentColor">H = 2 × 2 = 4</text>
    <text x="285" y="130" text-anchor="middle" fill="currentColor">O = 2 + 2 × 1 = 4</text>
  </g>
  <text x="200" y="154" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2e9e6b">ครบทุกธาตุ = ดุลแล้ว</text>
  <line x1="20" y1="170" x2="380" y2="170" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="188" font-weight="700">ลำดับที่ทำให้ดุลง่ายขึ้น</text>
    <text x="20" y="206">① ดุลธาตุที่อยู่ในสารน้อยชนิดก่อน (C ก่อน H ก่อน O)</text>
    <text x="20" y="224">② ดุล O เป็นอันสุดท้าย เพราะมักอยู่หลายที่</text>
    <text x="20" y="242" fill="#e05252">③ แก้ได้เฉพาะ<tspan font-weight="700">ตัวเลขหน้าสูตร</tspan> ห้ามแก้ตัวห้อยในสูตร เช่น H₂O เป็น H₂O₂</text>
  </g>
</svg>`;

  const SVG_REDOX2 = `<svg viewBox="0 0 400 260" width="400" height="260" role="img" aria-label="ปฏิกิริยารีดอกซ์">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">รีดอกซ์ — ใครให้อิเล็กตรอน ใครรับ</text>
  <g>
    <circle cx="90" cy="70" r="24" fill="#3b7ddd" opacity="0.4"/>
    <text x="90" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Zn</text>
    <circle cx="300" cy="70" r="24" fill="#d98324" opacity="0.4"/>
    <text x="300" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Cu²⁺</text>
    <g stroke="#e05252" stroke-width="2" fill="none">
      <path d="M 118 62 L 268 62"/><path d="M 260 57 L 269 62 L 260 67"/>
    </g>
    <text x="193" y="52" text-anchor="middle" font-size="10" font-weight="700" fill="#e05252">e⁻ 2 ตัว</text>
    <text x="90" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">เสีย e⁻ = ถูกออกซิไดซ์</text>
    <text x="90" y="126" text-anchor="middle" font-size="9" fill="currentColor">เลขออกซิเดชันเพิ่ม 0 → +2</text>
    <text x="90" y="140" text-anchor="middle" font-size="9" fill="currentColor">ตัวมันเองเป็น<tspan font-weight="700">ตัวรีดิวซ์</tspan></text>
    <text x="300" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="#d98324">รับ e⁻ = ถูกรีดิวซ์</text>
    <text x="300" y="126" text-anchor="middle" font-size="9" fill="currentColor">เลขออกซิเดชันลด +2 → 0</text>
    <text x="300" y="140" text-anchor="middle" font-size="9" fill="currentColor">ตัวมันเองเป็น<tspan font-weight="700">ตัวออกซิไดซ์</tspan></text>
  </g>
  <line x1="20" y1="158" x2="380" y2="158" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="176" font-weight="700">กฎหาเลขออกซิเดชันที่ใช้บ่อย</text>
    <text x="20" y="194">ธาตุอิสระ = 0 · ไอออนเดี่ยว = ประจุของมัน · H มัก +1 · O มัก −2</text>
    <text x="20" y="212">ผลรวมในสารประกอบเป็นกลาง = 0 · ในไอออนกลุ่ม = ประจุของไอออนนั้น</text>
    <text x="20" y="234" font-weight="700" fill="#7c5cd6">วิธีจำชื่อไม่ให้สลับ</text>
    <text x="20" y="252" font-size="10">ตัวที่<tspan font-weight="700">ถูก</tspan>ออกซิไดซ์ คือตัวที่ทำให้คนอื่นถูกรีดิวซ์ จึงชื่อว่า<tspan font-weight="700">ตัวรีดิวซ์</tspan> — สลับกันเสมอ</text>
  </g>
</svg>`;

  const SVG_RADIO = `<svg viewBox="0 0 400 280" width="400" height="280" role="img" aria-label="กัมมันตรังสี">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">รังสีสามชนิดและอำนาจทะลุทะลวง</text>
  <g>
    <rect x="130" y="34" width="10" height="60" fill="#8a8a8a" opacity="0.5"/>
    <text x="135" y="106" text-anchor="middle" font-size="8.5" fill="currentColor">กระดาษ</text>
    <rect x="210" y="34" width="12" height="60" fill="#8a8a8a" opacity="0.7"/>
    <text x="216" y="106" text-anchor="middle" font-size="8.5" fill="currentColor">อะลูมิเนียม</text>
    <rect x="292" y="34" width="18" height="60" fill="#8a8a8a"/>
    <text x="301" y="106" text-anchor="middle" font-size="8.5" fill="currentColor">ตะกั่วหนา</text>
    <g stroke-width="2.4" fill="none">
      <path d="M 30 48 L 128 48" stroke="#e05252"/>
      <path d="M 30 64 L 208 64" stroke="#3b7ddd"/>
      <path d="M 30 80 L 344 80" stroke="#2e9e6b"/>
    </g>
    <text x="24" y="52" text-anchor="end" font-size="10" font-weight="700" fill="#e05252">α</text>
    <text x="24" y="68" text-anchor="end" font-size="10" font-weight="700" fill="#3b7ddd">β</text>
    <text x="24" y="84" text-anchor="end" font-size="10" font-weight="700" fill="#2e9e6b">γ</text>
  </g>
  <g font-size="9.5" fill="currentColor">
    <text x="20" y="128" font-weight="700" fill="#e05252">แอลฟา (α)</text>
    <text x="96" y="128">= นิวเคลียสฮีเลียม ⁴₂He · ประจุ +2 · หนัก · ทะลุน้อยสุด</text>
    <text x="20" y="146" font-weight="700" fill="#3b7ddd">บีตา (β)</text>
    <text x="96" y="146">= อิเล็กตรอนเร็วสูง ⁰₋₁e · ประจุ −1 · เบา · ทะลุปานกลาง</text>
    <text x="20" y="164" font-weight="700" fill="#2e9e6b">แกมมา (γ)</text>
    <text x="96" y="164">= คลื่นแม่เหล็กไฟฟ้า · ไม่มีประจุ ไม่มีมวล · ทะลุมากที่สุด</text>
  </g>
  <line x1="20" y1="180" x2="380" y2="180" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="198" font-weight="700">เลขมวลกับเลขอะตอมเปลี่ยนอย่างไร</text>
    <text x="20" y="216">สลายแอลฟา: A ลด 4 · Z ลด 2 &nbsp;→&nbsp; ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He</text>
    <text x="20" y="234">สลายบีตา: A <tspan font-weight="700">เท่าเดิม</tspan> · Z เพิ่ม 1 &nbsp;→&nbsp; ¹⁴₆C → ¹⁴₇N + ⁰₋₁e</text>
    <text x="20" y="252">ปล่อยแกมมา: A และ Z <tspan font-weight="700">ไม่เปลี่ยน</tspan> แค่ปล่อยพลังงานส่วนเกินออกมา</text>
    <text x="20" y="272" font-size="10" fill="#d98324">ตรวจคำตอบ: ผลรวม A สองข้างต้องเท่ากัน และผลรวม Z สองข้างต้องเท่ากัน</text>
  </g>
</svg>`;

  STARTER_CONTENT[ID] = [
    { type: "h1", text: "เคมี (วิทย์กายภาพ)" },
    { type: "callout", html: "วิชานี้ไล่จาก<b>เล็กไปใหญ่</b>: อะตอม → พันธะ → โมเลกุลใหญ่ (พอลิเมอร์) → การเปลี่ยนแปลงของสาร (ปฏิกิริยา) → การเปลี่ยนแปลงในนิวเคลียส (กัมมันตรังสี) · ถ้าเข้าใจว่า<b>อิเล็กตรอนวงนอกสุด</b>ทำอะไรได้บ้าง จะเข้าใจบทที่ 1–2 ทั้งบท" },

    { type: "h2", text: "1.1 แบบจำลองอะตอม" },
    { type: "p", html: "แบบจำลองอะตอมเปลี่ยนไปเรื่อย ๆ เพราะมี<b>หลักฐานใหม่</b>ที่แบบเดิมอธิบายไม่ได้ ไม่ใช่เพราะคนก่อนคิดผิดทั้งหมด",
      detail: `<h3>ลำดับพัฒนาการและหลักฐาน</h3>` + SVG_MODELS2 + `
<table><tr><th>นักวิทยาศาสตร์</th><th>แบบจำลอง</th><th>หลักฐานที่ทำให้เปลี่ยน</th></tr>
<tr><td>ดอลตัน</td><td>ทรงกลมตัน แบ่งแยกไม่ได้</td><td>กฎทรงมวล กฎสัดส่วนคงที่</td></tr>
<tr><td>ทอมสัน</td><td>ขนมปังลูกเกด e⁻ ฝังในเนื้อบวก</td><td>หลอดรังสีแคโทด พบ e⁻ ในทุกธาตุ</td></tr>
<tr><td>รัทเทอร์ฟอร์ด</td><td>นิวเคลียสเล็กหนาแน่นตรงกลาง</td><td>ยิงอนุภาค α ใส่แผ่นทองคำ บางอันสะท้อนกลับ</td></tr>
<tr><td>โบร์</td><td>e⁻ โคจรในระดับพลังงานที่แน่นอน</td><td>สเปกตรัมเส้นของไฮโดรเจน</td></tr>
<tr><td>กลุ่มหมอก</td><td>e⁻ เป็นกลุ่มหมอกความน่าจะเป็น</td><td>กลศาสตร์ควอนตัม</td></tr></table>
<div class="box why"><b>การทดลองแผ่นทองคำ — จุดพลิกของวิชาเคมี</b><br>ถ้าอะตอมเป็นขนมปังลูกเกดจริง อนุภาค α ควรทะลุผ่านโดยเบนนิดเดียวทุกอัน<br>แต่ผลจริงคือ<b>ส่วนใหญ่ทะลุตรงไป</b> (อะตอมเป็นที่ว่างเป็นส่วนใหญ่) และ<b>บางอันสะท้อนกลับเกือบ 180°</b> (มีอะไรหนักและบวกอยู่ตรงกลาง)</div>
<div class="box tip"><b>ข้อสอบมักถาม</b> "แบบจำลองใดอธิบาย … ไม่ได้" — ให้ย้อนดูว่าแบบนั้นรู้จักอะไรบ้าง เช่น ดอลตันยังไม่รู้จักอิเล็กตรอน จึงอธิบายไฟฟ้าสถิตไม่ได้</div>` },

    { type: "h2", text: "1.2 องค์ประกอบของอะตอมและสัญลักษณ์นิวเคลียร์" },
    { type: "table", rows: [
      ["อนุภาค", "ประจุ", "มวลโดยประมาณ", "อยู่ที่ไหน"],
      ["โปรตอน (p)", "+1", "1 amu", "นิวเคลียส"],
      ["นิวตรอน (n)", "0", "1 amu", "นิวเคลียส"],
      ["อิเล็กตรอน (e⁻)", "−1", "≈ 1/1836 amu", "รอบนิวเคลียส"]
    ], detail: `<h3>อ่านและคำนวณจากสัญลักษณ์นิวเคลียร์</h3>` + SVG_NUCLEAR + `
<p class="frm">Z = เลขอะตอม = จำนวนโปรตอน &nbsp;·&nbsp; A = เลขมวล = p + n &nbsp;·&nbsp; n = A − Z</p>
<h4>ตัวอย่างที่ต้องทำได้</h4>
<table><tr><th>อนุภาค</th><th>Z</th><th>A</th><th>p</th><th>n</th><th>e⁻</th></tr>
<tr><td>³¹P</td><td>15</td><td>31</td><td>15</td><td>16</td><td>15</td></tr>
<tr><td>³¹P³⁻</td><td>15</td><td>31</td><td>15</td><td>16</td><td>18</td></tr>
<tr><td>²⁴Mg²⁺</td><td>12</td><td>24</td><td>12</td><td>12</td><td>10</td></tr>
<tr><td>³⁵Cl⁻</td><td>17</td><td>35</td><td>17</td><td>18</td><td>18</td></tr></table>
<div class="box tip"><b>เช็กเร็ว</b> ประจุบวกเท่าไร = ลบ e⁻ ออกเท่านั้น · ประจุลบเท่าไร = บวก e⁻ เข้าไปเท่านั้น<br>โปรตอนกับนิวตรอน<b>ไม่เคยเปลี่ยน</b>ในปฏิกิริยาเคมี (เปลี่ยนเฉพาะปฏิกิริยานิวเคลียร์)</div>
<div class="box warn"><b>ไอโซโทปกับไอออนคนละเรื่อง</b><br>ไอโซโทป = n ต่างกัน (A เปลี่ยน, Z เท่าเดิม) · ไอออน = e⁻ ต่างกัน (A และ Z เท่าเดิม)</div>` },

    { type: "h2", text: "1.3 สมบัติและการใช้ประโยชน์ของธาตุ" },
    { type: "p", html: "ตำแหน่งในตารางธาตุบอก<b>สมบัติ</b>ได้เกือบทั้งหมด — หมู่บอกเวเลนซ์อิเล็กตรอน คาบบอกจำนวนชั้น",
      detail: `<h3>อ่านตารางธาตุและสมบัติของธาตุ</h3>` + SVG_PERIODIC + `
<table><tr><th>สมบัติ</th><th>โลหะ</th><th>อโลหะ</th><th>กึ่งโลหะ</th></tr>
<tr><td>การนำไฟฟ้า</td><td>นำดี</td><td>ไม่นำ (ยกเว้นแกรไฟต์)</td><td>นำได้บ้าง ควบคุมได้</td></tr>
<tr><td>สถานะที่อุณหภูมิห้อง</td><td>ของแข็งเกือบหมด (ยกเว้น Hg)</td><td>มีทั้งแก๊ส ของเหลว ของแข็ง</td><td>ของแข็ง</td></tr>
<tr><td>การตีแผ่/ดึงเป็นเส้น</td><td>ได้</td><td>เปราะ แตกง่าย</td><td>เปราะ</td></tr>
<tr><td>แนวโน้มของไอออน</td><td>เสีย e⁻ → ไอออนบวก</td><td>รับ e⁻ → ไอออนลบ</td><td>ได้ทั้งสองแบบ</td></tr></table>
<h4>การใช้ประโยชน์ที่ควรรู้</h4>
<div class="box">• <b>ทองแดง</b> นำไฟฟ้าดี → สายไฟ &nbsp;·&nbsp; <b>อะลูมิเนียม</b> เบาไม่เป็นสนิม → กระป๋อง เครื่องบิน<br>• <b>เหล็ก</b> แข็งแรง ราคาถูก → โครงสร้าง (ผสมคาร์บอนเป็นเหล็กกล้า)<br>• <b>ซิลิคอน</b> กึ่งโลหะ → ชิปคอมพิวเตอร์ แผงโซลาร์<br>• <b>แก๊สมีสกุล</b> เฉื่อย → ฮีเลียมเติมบอลลูน นีออนทำป้ายไฟ อาร์กอนในหลอดไฟ</div>
<div class="box why"><b>ทำไมหมู่ 1A ถึงว่องไวมาก</b><br>มีเวเลนซ์ e⁻ แค่ 1 ตัว เสียไปตัวเดียวก็ครบออกเตตทันที จึงทำปฏิกิริยาง่ายมาก — โซเดียมตัดใส่น้ำจะระเบิดได้<br>ในทางกลับกันหมู่ 7A ขาดแค่ 1 ตัวก็ครบ จึงว่องไวเช่นกันแต่เป็นฝั่งรับ</div>` },
  ];
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 2 · พันธะเคมีและสารประกอบ" },

    { type: "h2", text: "2.1 พันธะไอออนิกและโคเวเลนต์" },
    { type: "p", html: "อะตอมสร้างพันธะเพื่อให้ <b>เวเลนซ์อิเล็กตรอนครบ 8</b> (กฎออกเตต) — <b>ให้กันขาด</b>เป็นไอออนิก · <b>ใช้ร่วมกัน</b>เป็นโคเวเลนต์",
      detail: `<h3>สองแบบที่ต้องแยกให้ขาด</h3>` + SVG_BONDTYPE + `
<table><tr><th></th><th>ไอออนิก</th><th>โคเวเลนต์</th></tr>
<tr><td>เกิดระหว่าง</td><td>โลหะ + อโลหะ</td><td>อโลหะ + อโลหะ</td></tr>
<tr><td>กลไก</td><td>ถ่ายโอน e⁻ แล้วดูดกันด้วยแรงไฟฟ้า</td><td>ใช้ e⁻ คู่ร่วมกัน</td></tr>
<tr><td>หน่วยย่อย</td><td>ผลึกไอออน (ไม่เรียกโมเลกุล)</td><td>โมเลกุล</td></tr>
<tr><td>จุดหลอมเหลว</td><td>สูงมาก</td><td>ต่ำ</td></tr>
<tr><td>นำไฟฟ้า</td><td>ของแข็งไม่นำ · หลอมเหลว/ละลายน้ำนำ</td><td>ไม่นำ</td></tr>
<tr><td>ละลายน้ำ</td><td>มักละลายได้ดี</td><td>แล้วแต่ความมีขั้ว</td></tr></table>
<div class="box why"><b>ทำไมเกลือแข็งไม่นำไฟฟ้า แต่น้ำเกลือนำ</b><br>ในของแข็ง ไอออนถูกล็อกอยู่ในผลึก ขยับไม่ได้ จึงไม่มีตัวพาประจุ<br>พอละลายน้ำหรือหลอมเหลว ไอออนหลุดออกมาเคลื่อนที่ได้ ไฟฟ้าจึงไหลผ่านได้</div>
<h4>เขียนสูตรสารประกอบไอออนิก</h4>
<div class="box"><b>ใช้วิธีไขว้ประจุ</b><br>Al³⁺ กับ O²⁻ → ไขว้เลขประจุมาเป็นตัวห้อย → Al₂O₃<br>ตรวจเสมอว่าประจุรวมเป็นศูนย์: 2(+3) + 3(−2) = 0 ✓</div>
<div class="box warn"><b>พันธะโคเวเลนต์มีหลายชนิด</b> เดี่ยว (ใช้ 1 คู่) · คู่ (2 คู่) · สาม (3 คู่) — ยิ่งใช้คู่มาก พันธะยิ่งสั้นและแข็งแรงขึ้น</div>` },

    { type: "h2", text: "2.2 การเรียกชื่อสารประกอบโคเวเลนต์" },
    { type: "table", rows: [
      ["จำนวนอะตอม", "คำนำหน้า", "ตัวอย่าง"],
      ["1", "มอโน (mono)", "CO = คาร์บอนมอนอกไซด์"],
      ["2", "ได (di)", "CO₂ = คาร์บอนไดออกไซด์"],
      ["3", "ไตร (tri)", "SO₃ = ซัลเฟอร์ไตรออกไซด์"],
      ["4", "เตตระ (tetra)", "CCl₄ = คาร์บอนเตตระคลอไรด์"],
      ["5", "เพนตะ (penta)", "PCl₅ = ฟอสฟอรัสเพนตะคลอไรด์"]
    ], detail: `<h3>กฎการเรียกชื่อ</h3>
<h4>สารประกอบโคเวเลนต์ (อโลหะ + อโลหะ)</h4>
<div class="box">① ธาตุตัวหน้าเรียกชื่อธาตุตามปกติ ใส่คำนำหน้าบอกจำนวน (<b>ยกเว้นตัวหน้าที่มี 1 อะตอม ไม่ต้องใส่ มอโน</b>)<br>② ธาตุตัวหลังใส่คำนำหน้าบอกจำนวนเสมอ แล้วลงท้ายด้วย <b>-ไอด์</b></div>
<table><tr><th>สูตร</th><th>ชื่อ</th><th>สังเกต</th></tr>
<tr><td>CO</td><td>คาร์บอนมอนอกไซด์</td><td>ตัวหน้าไม่ใส่ มอโน</td></tr>
<tr><td>N₂O</td><td>ไดไนโตรเจนมอนอกไซด์</td><td>ตัวหน้ามี 2 ต้องใส่ ได</td></tr>
<tr><td>P₂O₅</td><td>ไดฟอสฟอรัสเพนตะออกไซด์</td><td></td></tr></table>
<h4>เทียบกับสารประกอบไอออนิก — กฎคนละชุด</h4>
<div class="box warn"><b>ไอออนิกไม่ใช้คำนำหน้าบอกจำนวน</b><br>NaCl = โซเดียมคลอไรด์ (ไม่ใช่ "โซเดียมมอโนคลอไรด์")<br>CaCl₂ = แคลเซียมคลอไรด์ (ไม่ใช่ "แคลเซียมไดคลอไรด์")<br>เพราะประจุของไอออนบังคับอัตราส่วนอยู่แล้ว ไม่ต้องบอกซ้ำ</div>
<div class="box tip"><b>ตรวจก่อนตั้งชื่อ</b> ดูว่าตัวหน้าเป็น<b>โลหะ</b>หรือไม่ — เป็นโลหะ = ไอออนิก (ไม่ใส่คำนำหน้า) · เป็นอโลหะ = โคเวเลนต์ (ใส่คำนำหน้า)</div>` },

    { type: "h2", text: "2.3 แรงยึดเหนี่ยวระหว่างโมเลกุล" },
    { type: "p", html: "แรงระหว่างโมเลกุลมี 3 ชนิด เรียงจากอ่อนไปแรง: <b>ลอนดอน → ขั้ว–ขั้ว → พันธะไฮโดรเจน</b> และเป็นตัวกำหนดจุดเดือด จุดหลอมเหลว",
      detail: `<h3>แรงระหว่างโมเลกุลกับสมบัติของสาร</h3>` + SVG_IMF2 + `
<table><tr><th>ชนิด</th><th>เกิดกับ</th><th>ความแรง</th><th>ตัวอย่าง</th></tr>
<tr><td>แรงลอนดอน</td><td><b>ทุกโมเลกุล</b> (รวมโมเลกุลไม่มีขั้ว)</td><td>อ่อนสุด</td><td>CH₄ · Cl₂ · แก๊สมีสกุล</td></tr>
<tr><td>ขั้ว–ขั้ว</td><td>โมเลกุลมีขั้วเท่านั้น</td><td>ปานกลาง</td><td>HCl · CHCl₃</td></tr>
<tr><td>พันธะไฮโดรเจน</td><td>H ติดกับ <b>F, O, N</b></td><td>แรงสุด</td><td>H₂O · NH₃ · เอทานอล</td></tr></table>
<div class="box why"><b>ตัวอย่างที่ต้องอธิบายได้</b><br>น้ำ (M = 18) เดือดที่ 100°C แต่มีเทน (M = 16) เดือดที่ −162°C ทั้งที่มวลใกล้เคียงกัน<br>เพราะน้ำมี<b>พันธะไฮโดรเจน</b>ที่แรงมาก ต้องใช้พลังงานสูงกว่ามากในการดึงโมเลกุลออกจากกัน</div>
<div class="box warn"><b>แยกให้ขาด</b> การต้มน้ำเดือด = แยก<b>โมเลกุล</b>ออกจากกัน (สู้กับแรงระหว่างโมเลกุล) <b>ไม่ใช่</b>สลายพันธะ O–H ในโมเลกุล — พันธะภายในโมเลกุลแรงกว่ามาก</div>
<div class="box tip"><b>แนวโน้มที่ใช้ตอบข้อสอบ</b> ในกลุ่มที่มีแรงชนิดเดียวกัน โมเลกุล<b>ใหญ่กว่า</b>จะมีแรงลอนดอนมากกว่า จุดเดือดจึงสูงกว่า เช่น F₂ &lt; Cl₂ &lt; Br₂ &lt; I₂</div>` },
  ]);

  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 3 · สารประกอบอินทรีย์และพอลิเมอร์" },

    { type: "h2", text: "3.1 สารประกอบอินทรีย์และไฮโดรคาร์บอน" },
    { type: "p", html: "<b>สารประกอบอินทรีย์</b> คือสารที่มีคาร์บอนเป็นแกนหลัก · <b>ไฮโดรคาร์บอน</b> คือกลุ่มที่มีแค่ C กับ H เท่านั้น",
      detail: `<h3>จำแนกไฮโดรคาร์บอน</h3>` + SVG_HYDRO + `
<table><tr><th>ประเภท</th><th>พันธะ C–C</th><th>สูตรทั่วไป</th><th>ตัวอย่าง</th></tr>
<tr><td>แอลเคน</td><td>เดี่ยวทั้งหมด (อิ่มตัว)</td><td>CₙH₂ₙ₊₂</td><td>มีเทน CH₄ · อีเทน C₂H₆</td></tr>
<tr><td>แอลคีน</td><td>มีพันธะคู่อย่างน้อย 1</td><td>CₙH₂ₙ</td><td>อีทีน C₂H₄</td></tr>
<tr><td>แอลไคน์</td><td>มีพันธะสามอย่างน้อย 1</td><td>CₙH₂ₙ₋₂</td><td>อีไทน์ C₂H₂</td></tr>
<tr><td>อะโรมาติก</td><td>วงเบนซีน</td><td>—</td><td>เบนซีน C₆H₆</td></tr></table>
<div class="box why"><b>ทำไมคาร์บอนถึงสร้างสารได้เป็นล้านชนิด</b><br>C มีเวเลนซ์ 4 ตัว สร้างพันธะได้ 4 พันธะ และ<b>ต่อกับคาร์บอนด้วยกันเองได้ยาว ๆ</b> ทั้งโซ่ตรง โซ่กิ่ง และวง จึงเกิดโครงสร้างได้หลากหลายมหาศาล</div>
<h4>สามสูตรที่ต้องแปลงไปมาได้</h4>
<div class="box"><b>สูตรโมเลกุล</b> C₃H₈ — บอกแค่จำนวนอะตอม<br><b>สูตรย่อ</b> CH₃CH₂CH₃ — บอกลำดับการต่อคร่าว ๆ<br><b>สูตรโครงสร้าง</b> — วาดพันธะทุกเส้น เห็นรูปร่างจริง</div>
<div class="box warn"><b>ไอโซเมอร์</b> สูตรโมเลกุลเดียวกันแต่โครงสร้างต่างกัน → สมบัติต่างกัน เช่น C₄H₁₀ มีทั้งบิวเทน (โซ่ตรง) และไอโซบิวเทน (โซ่กิ่ง)</div>` },

    { type: "h2", text: "3.2 พอลิเมอร์" },
    { type: "p", html: "<b>มอนอเมอร์</b> (หน่วยย่อย) ต่อกันด้วยปฏิกิริยา<b>พอลิเมอไรเซชัน</b> กลายเป็น<b>พอลิเมอร์</b> (สายยาว)",
      detail: `<h3>จากหน่วยย่อยสู่สายยาว</h3>` + SVG_POLYMER2 + `
<table><tr><th>มอนอเมอร์</th><th>พอลิเมอร์</th><th>พบที่ไหน</th></tr>
<tr><td>เอทิลีน</td><td>พอลิเอทิลีน (PE)</td><td>ถุงพลาสติก ขวด</td></tr>
<tr><td>ไวนิลคลอไรด์</td><td>พอลิไวนิลคลอไรด์ (PVC)</td><td>ท่อน้ำ สายไฟ</td></tr>
<tr><td>สไตรีน</td><td>พอลิสไตรีน (PS)</td><td>โฟม กล่องใส</td></tr>
<tr><td>กลูโคส</td><td>แป้ง · เซลลูโลส · ไกลโคเจน</td><td>ธรรมชาติ</td></tr>
<tr><td>กรดแอมิโน</td><td>โปรตีน</td><td>ธรรมชาติ</td></tr></table>
<h4>โครงสร้างกำหนดสมบัติ</h4>
<table><tr><th>โครงสร้าง</th><th>การจัดเรียง</th><th>สมบัติ</th></tr>
<tr><td>แบบเส้น</td><td>เรียงชิดกันได้ดี</td><td>แน่น แข็งแรง เหนียว จุดหลอมเหลวสูงกว่า</td></tr>
<tr><td>แบบกิ่ง</td><td>กิ่งขวางไม่ให้เรียงชิด</td><td>นิ่มกว่า ยืดหยุ่นกว่า</td></tr>
<tr><td>แบบร่างแห</td><td>เชื่อมข้ามสายทั้งก้อน</td><td>แข็งมาก ไม่หลอม ขึ้นรูปใหม่ไม่ได้</td></tr></table>
<div class="box why"><b>แป้งกับเซลลูโลสทำจากกลูโคสเหมือนกัน แต่คนกินเซลลูโลสไม่ได้</b><br>เพราะพันธะที่เชื่อมกลูโคสต่างชนิดกัน (α กับ β) เอนไซม์ของคนย่อยได้เฉพาะแบบ α ของแป้ง — โครงสร้างต่างนิดเดียวแต่ผลต่างมหาศาล</div>` },

    { type: "h2", text: "3.3 ผลิตภัณฑ์พอลิเมอร์และสิ่งแวดล้อม" },
    { type: "p", html: "พลาสติกแบ่งเป็น <b>เทอร์มอพลาสติก</b> (หลอมขึ้นรูปใหม่ได้ รีไซเคิลได้) กับ <b>เทอร์มอเซต</b> (ขึ้นรูปใหม่ไม่ได้)",
      detail: `<h3>เลือกใช้ แยกทิ้ง และรีไซเคิล</h3>` + SVG_PLASTIC + `
<h4>รหัสพลาสติกใต้ภาชนะ</h4>
<table><tr><th>รหัส</th><th>ชื่อ</th><th>ตัวอย่าง</th><th>รีไซเคิล</th></tr>
<tr><td>1</td><td>PET</td><td>ขวดน้ำใส</td><td>ได้ดี</td></tr>
<tr><td>2</td><td>HDPE</td><td>ขวดนม แกลลอน</td><td>ได้ดี</td></tr>
<tr><td>3</td><td>PVC</td><td>ท่อ สายไฟ</td><td>ยาก</td></tr>
<tr><td>4</td><td>LDPE</td><td>ถุงพลาสติก</td><td>ได้</td></tr>
<tr><td>5</td><td>PP</td><td>กล่องเข้าไมโครเวฟได้</td><td>ได้</td></tr>
<tr><td>6</td><td>PS</td><td>โฟม</td><td>ยาก</td></tr>
<tr><td>7</td><td>อื่น ๆ</td><td>ผสมหลายชนิด</td><td>ยากที่สุด</td></tr></table>
<div class="box"><b>หลัก 3R เรียงตามลำดับความสำคัญ</b><br><b>Reduce</b> ใช้ให้น้อยลง (ดีที่สุด) → <b>Reuse</b> ใช้ซ้ำ → <b>Recycle</b> แปรรูปใหม่ (ใช้พลังงาน)</div>
<div class="box warn"><b>ปัญหาที่ต้องอธิบายได้</b><br>พลาสติกย่อยสลายตามธรรมชาติช้ามาก (หลายร้อยปี) เพราะจุลินทรีย์ไม่มีเอนไซม์ที่ย่อยพันธะ C–C สายยาวแบบนี้<br>เมื่อแตกเป็น<b>ไมโครพลาสติก</b> จะเข้าสู่ห่วงโซ่อาหารและกลับมาหาคน</div>
<div class="box tip"><b>พลาสติกชีวภาพ</b> ทำจากพืช เช่น PLA จากข้าวโพด ย่อยสลายได้ในสภาวะที่เหมาะสม แต่ต้องมีโรงงานหมักเฉพาะ ไม่ใช่ทิ้งลงดินแล้วหายไปเอง</div>` },
  ]);
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 4 · ปฏิกิริยาเคมีและกัมมันตรังสี" },

    { type: "h2", text: "4.1 การเกิดปฏิกิริยาเคมีและสมการเคมี" },
    { type: "p", html: "ปฏิกิริยาเคมีคือการที่<b>พันธะเดิมสลายและพันธะใหม่เกิดขึ้น</b> ได้สารใหม่ที่มีสมบัติต่างจากเดิม · อะตอมไม่หายไปไหน จึงต้อง<b>ดุลสมการ</b>",
      detail: `<h3>สังเกตอย่างไรว่าเกิดปฏิกิริยา</h3>
<div class="box">① มี<b>สีเปลี่ยน</b> ② มี<b>แก๊ส</b>เกิดขึ้น (ฟองอากาศ) ③ มี<b>ตะกอน</b>เกิดขึ้น<br>④ มีการ<b>เปลี่ยนแปลงพลังงาน</b> (ร้อนขึ้นหรือเย็นลง) ⑤ มี<b>กลิ่น</b>ใหม่</div>
<div class="box warn"><b>ระวังสับสนกับการเปลี่ยนแปลงทางกายภาพ</b><br>น้ำแข็งละลาย น้ำเดือด เกลือละลายน้ำ = <b>กายภาพ</b> เพราะยังเป็นสารเดิม แค่เปลี่ยนสถานะหรือกระจายตัว<br>เผากระดาษ เหล็กเป็นสนิม = <b>เคมี</b> เพราะได้สารใหม่ที่ย้อนกลับเองไม่ได้</div>
<h3>การดุลสมการ</h3>` + SVG_BALANCE + `
<p class="frm">กฎทรงมวล: มวลสารตั้งต้น = มวลผลิตภัณฑ์ → จำนวนอะตอมแต่ละธาตุต้องเท่ากันสองข้าง</p>
<h4>ตัวอย่างที่ดุลแล้ว</h4>
<table><tr><th>สมการ</th><th>ตรวจอะตอม</th></tr>
<tr><td>2H₂ + O₂ → 2H₂O</td><td>H: 4 = 4 · O: 2 = 2</td></tr>
<tr><td>CH₄ + 2O₂ → CO₂ + 2H₂O</td><td>C: 1 = 1 · H: 4 = 4 · O: 4 = 4</td></tr>
<tr><td>2Na + Cl₂ → 2NaCl</td><td>Na: 2 = 2 · Cl: 2 = 2</td></tr>
<tr><td>Zn + 2HCl → ZnCl₂ + H₂</td><td>Zn: 1 = 1 · H: 2 = 2 · Cl: 2 = 2</td></tr></table>
<div class="box tip"><b>ลำดับที่ทำให้ดุลง่าย</b> ดุล C ก่อน → H → O เป็นอันสุดท้าย เพราะ O มักโผล่หลายที่<br>ถ้าติดเศษครึ่ง ให้คูณทั้งสมการด้วย 2</div>
<div class="box warn"><b>ห้ามแก้ตัวห้อยในสูตร</b> แก้ได้เฉพาะ<b>ตัวเลขหน้าสูตร</b>เท่านั้น — เปลี่ยน H₂O เป็น H₂O₂ คือเปลี่ยนเป็นสารคนละตัว (น้ำ เป็น ไฮโดรเจนเปอร์ออกไซด์)</div>
<h4>สัญลักษณ์สถานะ</h4>
<p>(s) ของแข็ง · (l) ของเหลว · (g) แก๊ส · (aq) ละลายในน้ำ</p>` },

    { type: "h2", text: "4.2 ปฏิกิริยารีดอกซ์" },
    { type: "p", html: "<b>รีดอกซ์</b> = ปฏิกิริยาที่มีการ<b>ถ่ายโอนอิเล็กตรอน</b> · เสีย e⁻ = ถูกออกซิไดซ์ · รับ e⁻ = ถูกรีดิวซ์ — เกิดพร้อมกันเสมอ",
      detail: `<h3>ติดตามอิเล็กตรอนและเลขออกซิเดชัน</h3>` + SVG_REDOX2 + `
<h4>กฎหาเลขออกซิเดชัน</h4>
<table><tr><th>กรณี</th><th>เลขออกซิเดชัน</th></tr>
<tr><td>ธาตุอิสระ (Na, O₂, Cl₂)</td><td>0</td></tr>
<tr><td>ไอออนเดี่ยว</td><td>เท่ากับประจุ เช่น Na⁺ = +1</td></tr>
<tr><td>H ในสารประกอบ</td><td>+1 (ยกเว้นไฮไดรด์โลหะ = −1)</td></tr>
<tr><td>O ในสารประกอบ</td><td>−2 (ยกเว้นเปอร์ออกไซด์ = −1)</td></tr>
<tr><td>ผลรวมในสารประกอบเป็นกลาง</td><td>= 0</td></tr>
<tr><td>ผลรวมในไอออนกลุ่ม</td><td>= ประจุของไอออนนั้น</td></tr></table>
<h4>ฝึกคำนวณ (ตรวจด้วยสคริปต์แล้ว)</h4>
<table><tr><th>สาร</th><th>หาเลขออกซิเดชันของ</th><th>คำตอบ</th><th>วิธีคิด</th></tr>
<tr><td>KMnO₄</td><td>Mn</td><td><b>+7</b></td><td>(+1) + Mn + 4(−2) = 0</td></tr>
<tr><td>H₂SO₄</td><td>S</td><td><b>+6</b></td><td>2(+1) + S + 4(−2) = 0</td></tr>
<tr><td>Cr₂O₇²⁻</td><td>Cr</td><td><b>+6</b></td><td>2Cr + 7(−2) = −2</td></tr>
<tr><td>NH₃</td><td>N</td><td><b>−3</b></td><td>N + 3(+1) = 0</td></tr></table>
<div class="box why"><b>ชื่อที่สลับกันจนสับสน</b><br>สารที่<b>ถูกออกซิไดซ์</b> (เสีย e⁻) เป็นคนทำให้อีกฝ่ายถูกรีดิวซ์ จึงเรียกมันว่า<b>ตัวรีดิวซ์</b><br>สารที่<b>ถูกรีดิวซ์</b> (รับ e⁻) เป็นคนทำให้อีกฝ่ายถูกออกซิไดซ์ จึงเรียกมันว่า<b>ตัวออกซิไดซ์</b><br>ชื่อจะ<b>สลับกับสิ่งที่มันโดน</b>เสมอ</div>
<div class="box tip"><b>รีดอกซ์รอบตัว</b> เหล็กเป็นสนิม · ถ่านไฟฉายและแบตเตอรี่ · การเผาไหม้ · การหายใจระดับเซลล์ · การชุบโลหะด้วยไฟฟ้า</div>` },

    { type: "h2", text: "4.3 กัมมันตรังสี" },
    { type: "p", html: "ธาตุกัมมันตรังสีมี<b>นิวเคลียสไม่เสถียร</b> จึงปล่อยรังสีออกมาเพื่อให้เสถียรขึ้น — ต่างจากปฏิกิริยาเคมีตรงที่<b>เปลี่ยนที่นิวเคลียส</b> ไม่ใช่ที่อิเล็กตรอน",
      detail: `<h3>รังสีสามชนิดและการสลาย</h3>` + SVG_RADIO + `
<table><tr><th>รังสี</th><th>คืออะไร</th><th>ประจุ</th><th>อำนาจทะลุทะลวง</th><th>ผลต่อ A และ Z</th></tr>
<tr><td>แอลฟา (α)</td><td>นิวเคลียสฮีเลียม ⁴₂He</td><td>+2</td><td>น้อยสุด (กระดาษกั้นได้)</td><td>A ลด 4 · Z ลด 2</td></tr>
<tr><td>บีตา (β)</td><td>อิเล็กตรอนความเร็วสูง ⁰₋₁e</td><td>−1</td><td>ปานกลาง (อะลูมิเนียมกั้น)</td><td>A เท่าเดิม · Z เพิ่ม 1</td></tr>
<tr><td>แกมมา (γ)</td><td>คลื่นแม่เหล็กไฟฟ้า</td><td>0</td><td>มากสุด (ต้องใช้ตะกั่วหนา)</td><td>ไม่เปลี่ยนทั้งคู่</td></tr></table>
<h4>ตัวอย่างสมการนิวเคลียร์ (ตรวจผลรวม A และ Z ด้วยสคริปต์แล้ว)</h4>
<div class="box"><b>สลายแอลฟา</b><br>²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He &nbsp;&nbsp; (A: 234+4 = 238 ✓ · Z: 90+2 = 92 ✓)<br>²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He<br><br><b>สลายบีตา</b><br>¹⁴₆C → ¹⁴₇N + ⁰₋₁e &nbsp;&nbsp; (A: 14 = 14 ✓ · Z: 7 + (−1) = 6 ✓)<br>²¹⁰₈₃Bi → ²¹⁰₈₄Po + ⁰₋₁e</div>
<div class="box why"><b>ทำไมสลายบีตาแล้ว Z เพิ่ม</b><br>เพราะนิวตรอนในนิวเคลียสเปลี่ยนเป็นโปรตอนแล้วปล่อยอิเล็กตรอนออกมา — โปรตอนเพิ่ม 1 ตัว (Z เพิ่ม) แต่จำนวนอนุภาคในนิวเคลียสรวมเท่าเดิม (A คงที่)</div>
<h4>ครึ่งชีวิต</h4>
<p><b>ครึ่งชีวิต</b> = เวลาที่ธาตุสลายไปครึ่งหนึ่ง · เป็นค่าคงที่ของแต่ละไอโซโทป ไม่ขึ้นกับอุณหภูมิหรือความดัน</p>
<div class="box">เริ่มต้น 80 กรัม ครึ่งชีวิต 5 ปี<br>5 ปี → 40 ก. · 10 ปี → 20 ก. · 15 ปี → 10 ก. · 20 ปี → 5 ก.<br>สูตร: เหลือ = เริ่มต้น × (1/2)ⁿ เมื่อ n = จำนวนครึ่งชีวิตที่ผ่านไป</div>
<h4>ประโยชน์และความเสี่ยง</h4>
<table><tr><th>ด้าน</th><th>ตัวอย่าง</th></tr>
<tr><td>การแพทย์</td><td>I-131 รักษาไทรอยด์ · Co-60 ฉายรังสีรักษามะเร็ง · ถ่ายภาพวินิจฉัย</td></tr>
<tr><td>อุตสาหกรรม</td><td>ตรวจรอยร้าวในโลหะ · วัดความหนาแผ่นวัสดุ · ถนอมอาหาร</td></tr>
<tr><td>โบราณคดี</td><td>C-14 หาอายุซากสิ่งมีชีวิต (ครึ่งชีวิตราว 5,730 ปี)</td></tr>
<tr><td>พลังงาน</td><td>โรงไฟฟ้านิวเคลียร์</td></tr></table>
<div class="box warn"><b>ความเสี่ยงและการป้องกัน</b><br>รังสีทำลาย DNA ทำให้เซลล์กลายพันธุ์หรือตาย เสี่ยงมะเร็ง<br>ป้องกันด้วยหลัก 3 ข้อ: <b>อยู่ให้ไกล · อยู่ให้สั้น · มีวัสดุกำบัง</b> (ตะกั่ว คอนกรีต)</div>` },
  ]);

  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 5 · แบบฝึกคิดเร็ว" },
    { type: "todo", html: "³⁹K⁺ มีโปรตอน นิวตรอน และอิเล็กตรอนอย่างละกี่ตัว (K มี Z = 19)",
      detail: `<h3>เฉลย</h3><p>โปรตอน = 19 · นิวตรอน = 39 − 19 = <b>20</b> · อิเล็กตรอน = 19 − 1 = <b>18</b></p>
<div class="box tip">ประจุ +1 แปลว่าเสีย e⁻ ไป 1 ตัว — โปรตอนกับนิวตรอนไม่เปลี่ยน</div>` },
    { type: "todo", html: "ดุลสมการ: ___Fe + ___O₂ → ___Fe₂O₃",
      detail: `<h3>เฉลย: 4Fe + 3O₂ → 2Fe₂O₃</h3>
<p>ตรวจ: Fe ซ้าย 4 ขวา 2×2 = 4 ✓ · O ซ้าย 3×2 = 6 ขวา 2×3 = 6 ✓</p>
<div class="box">วิธีคิด: เริ่มจาก Fe₂O₃ ต้องมี O เป็นเลขคู่ จึงใส่ 2 ข้างหน้า → O ขวา 6 → O₂ ต้องเป็น 3 → Fe ขวา 4 → Fe ซ้าย 4</div>` },
    { type: "todo", html: "ในสารประกอบ H₂SO₄ ซัลเฟอร์มีเลขออกซิเดชันเท่าไร",
      detail: `<h3>เฉลย: +6</h3><p class="frm">2(+1) + S + 4(−2) = 0 → S = +6</p>` },
    { type: "todo", html: "²²⁶₈₈Ra สลายให้อนุภาคแอลฟา จะได้ธาตุที่มี A และ Z เท่าไร",
      detail: `<h3>เฉลย: A = 222, Z = 86 (เรดอน Rn)</h3>
<p>แอลฟาพา A ไป 4 และ Z ไป 2 → 226 − 4 = 222 และ 88 − 2 = 86</p>
<div class="box tip">ตรวจเสมอว่าผลรวม A และ Z สองข้างเท่ากัน</div>` },
    { type: "todo", html: "เพราะเหตุใดน้ำ (M = 18) จึงเดือดสูงกว่ามีเทน (M = 16) มาก",
      detail: `<h3>เฉลย: เพราะน้ำมีพันธะไฮโดรเจน</h3>
<p>น้ำมี H ต่อกับ O จึงเกิด<b>พันธะไฮโดรเจน</b>ระหว่างโมเลกุล ซึ่งเป็นแรงที่แรงที่สุดในสามชนิด<br>ส่วนมีเทนเป็นโมเลกุลไม่มีขั้ว มีแค่แรงลอนดอนที่อ่อนมาก จึงแยกโมเลกุลได้ง่าย เดือดที่อุณหภูมิต่ำมาก</p>` },
    { type: "todo", html: "จานเมลามีนเอาเข้าไมโครเวฟแล้วไม่ละลาย เป็นพลาสติกชนิดใด และเพราะอะไร",
      detail: `<h3>เฉลย: เทอร์มอเซต</h3>
<p>เมลามีนมีโครงสร้าง<b>แบบร่างแห</b> สายพอลิเมอร์เชื่อมข้ามกันทั้งก้อน เมื่อได้รับความร้อนจึงไม่อ่อนตัวและหลอมใหม่ไม่ได้ ถ้าร้อนเกินไปจะไหม้แทน</p>
<div class="box warn">ข้อเสียคือรีไซเคิลยากมาก เพราะหลอมขึ้นรูปใหม่ไม่ได้</div>` },
  ]);

  STARTER_DIAGRAM[ID] = [
    { id: "ttl", t: "x", x: 40, y: 20, w: 700, html: "เคมี (วิทย์กายภาพ) — แผนที่ทั้งวิชา", size: 34, bold: true, c: "auto" },
    { id: "lb1", t: "x", x: 60, y: 66, w: 250, html: "บทที่ 1 · อะตอมและตารางธาตุ", size: 15, bold: true, c: "#3b7ddd" },
    { id: "lb2", t: "x", x: 400, y: 66, w: 250, html: "บทที่ 2 · พันธะเคมี", size: 15, bold: true, c: "#2e9e6b" },
    { id: "lb3", t: "x", x: 740, y: 66, w: 250, html: "บทที่ 3 · อินทรีย์และพอลิเมอร์", size: 15, bold: true, c: "#d98324" },
    { id: "lb4", t: "x", x: 1080, y: 66, w: 250, html: "บทที่ 4 · ปฏิกิริยาและรังสี", size: 15, bold: true, c: "#7c5cd6" },

    { id: "a0", t: "c", x: 60, y: 100, w: 250, c: "#3b7ddd",
      title: "1.1 แบบจำลองอะตอม",
      body: "เปลี่ยนเพราะมี<b>หลักฐานใหม่</b> ไม่ใช่คนก่อนคิดผิด",
      detail: `<h3>ลำดับและหลักฐาน</h3>` + SVG_MODELS2 },

    { id: "a1", t: "c", x: 60, y: 280, w: 250, c: "#3b7ddd",
      title: "1.2 สัญลักษณ์นิวเคลียร์",
      body: "Z = โปรตอน · A = p + n<br>n = A − Z",
      detail: `<h3>อ่านและคำนวณ</h3>` + SVG_NUCLEAR },

    { id: "a2", t: "c", x: 60, y: 460, w: 250, c: "#3b7ddd",
      title: "1.3 ตารางธาตุ",
      body: "หมู่ = เวเลนซ์ e⁻ · คาบ = จำนวนชั้น<br>โลหะ · อโลหะ · กึ่งโลหะ",
      detail: `<h3>อ่านตารางธาตุ</h3>` + SVG_PERIODIC },

    { id: "b0", t: "c", x: 400, y: 100, w: 250, c: "#2e9e6b",
      title: "2.1 ไอออนิก vs โคเวเลนต์",
      body: "โลหะ+อโลหะ = ให้กันขาด<br>อโลหะ+อโลหะ = ใช้ร่วมกัน",
      detail: `<h3>สองแบบที่ต้องแยกให้ขาด</h3>` + SVG_BONDTYPE },

    { id: "b1", t: "c", x: 400, y: 280, w: 250, c: "#2e9e6b",
      title: "2.2 เรียกชื่อสารโคเวเลนต์",
      body: "มอโน ได ไตร เตตระ เพนตะ<br>ลงท้าย -ไอด์",
      detail: `<h3>กฎเรียกชื่อ</h3>
<table><tr><th>สูตร</th><th>ชื่อ</th></tr>
<tr><td>CO</td><td>คาร์บอนมอนอกไซด์</td></tr>
<tr><td>CO₂</td><td>คาร์บอนไดออกไซด์</td></tr>
<tr><td>N₂O</td><td>ไดไนโตรเจนมอนอกไซด์</td></tr>
<tr><td>P₂O₅</td><td>ไดฟอสฟอรัสเพนตะออกไซด์</td></tr></table>
<div class="box warn">ตัวหน้ามี 1 อะตอมไม่ต้องใส่ มอโน · สารไอออนิกไม่ใช้คำนำหน้าเลย (NaCl = โซเดียมคลอไรด์)</div>` },

    { id: "b2", t: "c", x: 400, y: 460, w: 250, c: "#2e9e6b",
      title: "2.3 แรงระหว่างโมเลกุล",
      body: "ลอนดอน &lt; ขั้ว–ขั้ว &lt; พันธะไฮโดรเจน<br>ตัวกำหนด<b>จุดเดือด</b>",
      detail: `<h3>แรงระหว่างโมเลกุล</h3>` + SVG_IMF2 },

    { id: "c0", t: "c", x: 740, y: 100, w: 250, c: "#d98324",
      title: "3.1 ไฮโดรคาร์บอน",
      body: "แอลเคน (เดี่ยว) · แอลคีน (คู่) · แอลไคน์ (สาม)",
      detail: `<h3>จำแนกไฮโดรคาร์บอน</h3>` + SVG_HYDRO },

    { id: "c1", t: "c", x: 740, y: 280, w: 250, c: "#d98324",
      title: "3.2 พอลิเมอร์",
      body: "มอนอเมอร์ → พอลิเมอไรเซชัน → พอลิเมอร์<br>เส้น · กิ่ง · ร่างแห",
      detail: `<h3>จากหน่วยย่อยสู่สายยาว</h3>` + SVG_POLYMER2 },

    { id: "c2", t: "c", x: 740, y: 460, w: 250, c: "#d98324",
      title: "3.3 พลาสติกกับสิ่งแวดล้อม",
      body: "เทอร์มอพลาสติก = หลอมใหม่ได้<br>เทอร์มอเซต = ไม่ได้",
      detail: `<h3>เลือกใช้และแยกทิ้ง</h3>` + SVG_PLASTIC },

    { id: "d0", t: "c", x: 1080, y: 100, w: 250, c: "#7c5cd6",
      title: "4.1 สมการเคมีและการดุล",
      body: "อะตอมต้องเท่ากันสองข้าง<br>แก้ได้แค่เลขหน้าสูตร",
      detail: `<h3>ดุลสมการ</h3>` + SVG_BALANCE },

    { id: "d1", t: "c", x: 1080, y: 280, w: 250, c: "#7c5cd6",
      title: "4.2 รีดอกซ์",
      body: "เสีย e⁻ = ถูกออกซิไดซ์<br>รับ e⁻ = ถูกรีดิวซ์",
      detail: `<h3>ถ่ายโอนอิเล็กตรอน</h3>` + SVG_REDOX2 },

    { id: "d2", t: "c", x: 1080, y: 460, w: 250, c: "#7c5cd6",
      title: "4.3 กัมมันตรังสี",
      body: "α: A−4 Z−2 · β: A เท่าเดิม Z+1<br>γ: ไม่เปลี่ยน",
      detail: `<h3>รังสีและการสลาย</h3>` + SVG_RADIO },

    { id: "n1", t: "n", a: { id: "a0" }, b: { id: "a1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n2", t: "n", a: { id: "a1" }, b: { id: "a2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n3", t: "n", a: { id: "b0" }, b: { id: "b1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n4", t: "n", a: { id: "b1" }, b: { id: "b2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n5", t: "n", a: { id: "c0" }, b: { id: "c1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n6", t: "n", a: { id: "c1" }, b: { id: "c2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n7", t: "n", a: { id: "d0" }, b: { id: "d1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n8", t: "n", a: { id: "d1" }, b: { id: "d2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "x1", t: "n", a: { id: "a2" }, b: { id: "b0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x2", t: "n", a: { id: "b0" }, b: { id: "c0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x3", t: "n", a: { id: "b2" }, b: { id: "c2" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x4", t: "n", a: { id: "a1" }, b: { id: "d2" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 }
  ];
})();
