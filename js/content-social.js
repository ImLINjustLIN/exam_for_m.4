/* ============================================================
   content-social.js — สังคมศึกษา (หลัก) : เศรษฐศาสตร์
   สรุปจากหัวข้อที่ Taco ส่งมา (สรุปจากรูปเรียน 89–119)
   + ค้นคว้าเพิ่มจากสื่อการสอน ส32103 และตำราเศรษฐศาสตร์จุลภาค
   กราฟทุกรูปคำนวณจุดตัดจริงด้วยสคริปต์ Python ไม่ได้วาดกะ ๆ เอา
   ============================================================ */
(function () {
  const ID = "social_main";

  /* ---------- รูปประกอบ: วาดเป็น SVG เองทั้งหมด ---------- */
  const SVG_CHOICE = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="ทรัพยากรมีจำกัดจึงต้องเลือก">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ทำไมต้องมีวิชาเศรษฐศาสตร์</text>
  <g font-size="11" fill="currentColor">
    <rect x="24" y="34" width="150" height="46" rx="10" fill="#3b7ddd" opacity="0.15"/>
    <text x="99" y="54" text-anchor="middle" font-weight="700" fill="#3b7ddd">ความต้องการ</text>
    <text x="99" y="70" text-anchor="middle" font-size="10">ไม่มีที่สิ้นสุด</text>
    <rect x="226" y="34" width="150" height="46" rx="10" fill="#e05252" opacity="0.15"/>
    <text x="301" y="54" text-anchor="middle" font-weight="700" fill="#e05252">ทรัพยากร</text>
    <text x="301" y="70" text-anchor="middle" font-size="10">มีจำกัด</text>
    <text x="200" y="62" text-anchor="middle" font-size="18" font-weight="700" fill="currentColor">&gt;</text>
    <path d="M 200 84 L 200 104" stroke="currentColor" stroke-width="1.6" fill="none"/>
    <path d="M 196 98 L 200 105 L 204 98" stroke="currentColor" stroke-width="1.6" fill="none"/>
    <rect x="96" y="108" width="208" height="30" rx="9" fill="#d98324" opacity="0.18"/>
    <text x="200" y="128" text-anchor="middle" font-weight="700" fill="#d98324">ความขาดแคลน (scarcity) → ต้องเลือก</text>
  </g>
  <g font-size="10.5" fill="currentColor">
    <text x="24" y="162" font-weight="700">เลือกแล้วเกิดอะไรตามมา</text>
    <text x="24" y="180">มีเงิน 100 บาท · เลือกซื้อหนังสือ 1 เล่ม</text>
    <text x="24" y="196">สิ่งที่ต้องสละคือของที่ดีที่สุดในตัวเลือกที่เหลือ เช่น ดูหนัง</text>
    <text x="24" y="212" font-weight="700" fill="#d98324">ค่าเสียโอกาส = มูลค่าของทางเลือกที่ดีที่สุดที่ไม่ได้เลือก</text>
    <text x="24" y="232" font-size="10">นับเฉพาะ ทางเลือกอันดับสอง อันเดียว ไม่ใช่รวมทุกอันที่สละ</text>
  </g>
</svg>`;

  const SVG_FACTORS = `<svg viewBox="0 0 400 260" width="400" height="260" role="img" aria-label="ปัจจัยการผลิตสี่ชนิดและผลตอบแทน">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ปัจจัยการผลิต 4 ชนิด กับผลตอบแทนของเจ้าของ</text>
  <g font-size="10.5">
    <rect x="20" y="34" width="86" height="64" rx="10" fill="#2e9e6b" opacity="0.16"/>
    <text x="63" y="54" text-anchor="middle" font-weight="700" fill="#2e9e6b">① ที่ดิน</text>
    <text x="63" y="70" text-anchor="middle" fill="currentColor" font-size="9.5">ทรัพยากรธรรมชาติ</text>
    <text x="63" y="88" text-anchor="middle" font-weight="700" fill="currentColor">ค่าเช่า</text>

    <rect x="115" y="34" width="86" height="64" rx="10" fill="#3b7ddd" opacity="0.16"/>
    <text x="158" y="54" text-anchor="middle" font-weight="700" fill="#3b7ddd">② แรงงาน</text>
    <text x="158" y="70" text-anchor="middle" fill="currentColor" font-size="9.5">กำลังกาย+สมองคน</text>
    <text x="158" y="88" text-anchor="middle" font-weight="700" fill="currentColor">ค่าจ้าง</text>

    <rect x="210" y="34" width="86" height="64" rx="10" fill="#d98324" opacity="0.16"/>
    <text x="253" y="54" text-anchor="middle" font-weight="700" fill="#d98324">③ ทุน</text>
    <text x="253" y="70" text-anchor="middle" fill="currentColor" font-size="9.5">เครื่องจักร โรงงาน</text>
    <text x="253" y="88" text-anchor="middle" font-weight="700" fill="currentColor">ดอกเบี้ย</text>

    <rect x="305" y="34" width="86" height="64" rx="10" fill="#7c5cd6" opacity="0.16"/>
    <text x="348" y="54" text-anchor="middle" font-weight="700" fill="#7c5cd6">④ ผู้ประกอบการ</text>
    <text x="348" y="70" text-anchor="middle" fill="currentColor" font-size="9.5">คนรวมปัจจัย+เสี่ยง</text>
    <text x="348" y="88" text-anchor="middle" font-weight="700" fill="currentColor">กำไร</text>
  </g>
  <line x1="20" y1="112" x2="380" y2="112" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="132" font-weight="700">อ่านสถานการณ์แล้วแยกให้ออก — ร้านกาแฟหนึ่งร้าน</text>
    <text x="20" y="152">① ห้องแถวที่เช่าอยู่ และเมล็ดกาแฟจากไร่ → ที่ดิน/ทรัพยากรธรรมชาติ</text>
    <text x="20" y="170">② บาริสต้าที่จ้างมาชงกาแฟ → แรงงาน</text>
    <text x="20" y="188">③ เครื่องชงกาแฟ เครื่องบด โต๊ะเก้าอี้ → ทุน</text>
    <text x="20" y="206">④ เจ้าของร้านที่ตัดสินใจเปิดร้านและรับความเสี่ยงเอง → ผู้ประกอบการ</text>
    <text x="20" y="232" font-size="10" font-weight="700" fill="#e05252">กับดัก: เงินสดไม่ใช่ทุนในทางเศรษฐศาสตร์</text>
    <text x="20" y="248" font-size="10">เงินเป็นแค่สื่อกลางไปซื้อทุน ทุนคือสิ่งของที่ใช้ผลิตซ้ำได้</text>
  </g>
</svg>`;

  const SVG_FLOW = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="วงจรเศรษฐกิจอย่างง่าย">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">วงจรเศรษฐกิจ — เงินกับของหมุนสวนทางกัน</text>
  <rect x="26" y="100" width="104" height="54" rx="12" fill="#3b7ddd" opacity="0.18"/>
  <text x="78" y="124" text-anchor="middle" font-size="11.5" font-weight="700" fill="#3b7ddd">ครัวเรือน</text>
  <text x="78" y="140" text-anchor="middle" font-size="9.5" fill="currentColor">เจ้าของปัจจัย · ผู้ซื้อ</text>
  <rect x="270" y="100" width="104" height="54" rx="12" fill="#d98324" opacity="0.18"/>
  <text x="322" y="124" text-anchor="middle" font-size="11.5" font-weight="700" fill="#d98324">ธุรกิจ</text>
  <text x="322" y="140" text-anchor="middle" font-size="9.5" fill="currentColor">ผู้ผลิต · ผู้จ้าง</text>
  <rect x="150" y="34" width="100" height="34" rx="9" fill="currentColor" opacity="0.10"/>
  <text x="200" y="55" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">ตลาดปัจจัยการผลิต</text>
  <rect x="150" y="186" width="100" height="34" rx="9" fill="currentColor" opacity="0.10"/>
  <text x="200" y="207" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">ตลาดสินค้า–บริการ</text>
  <g fill="none" stroke-width="1.8">
    <path d="M 78 100 L 78 51 L 146 51" stroke="#2e9e6b"/>
    <path d="M 140 47 L 148 51 L 140 55" stroke="#2e9e6b"/>
    <path d="M 254 51 L 322 51 L 322 100" stroke="#e05252"/>
    <path d="M 318 94 L 322 101 L 326 94" stroke="#e05252"/>
    <path d="M 322 154 L 322 203 L 254 203" stroke="#2e9e6b"/>
    <path d="M 260 199 L 252 203 L 260 207" stroke="#2e9e6b"/>
    <path d="M 146 203 L 78 203 L 78 154" stroke="#e05252"/>
    <path d="M 74 160 L 78 153 L 82 160" stroke="#e05252"/>
  </g>
  <g font-size="9.5" fill="currentColor">
    <text x="88" y="80">① ส่งแรงงาน/ที่ดิน/ทุน</text>
    <text x="250" y="80" text-anchor="start">② จ่ายค่าจ้าง ค่าเช่า</text>
    <text x="250" y="178" text-anchor="start">③ ส่งสินค้า–บริการ</text>
    <text x="88" y="178">④ จ่ายเงินซื้อของ</text>
  </g>
  <line x1="20" y1="232" x2="380" y2="232" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="250" font-weight="700">อ่านวงจรนี้ให้เป็น จะตอบข้อสอบได้ครึ่งบท</text>
    <text x="20" y="268" fill="#2e9e6b">เส้นเขียว = ของจริงไหล (แรงงาน สินค้า)</text>
    <text x="20" y="284" fill="#e05252">เส้นแดง = เงินไหล — สวนทางกับของจริงเสมอ</text>
  </g>
</svg>`;

  const SVG_SYSTEMS = `<svg viewBox="0 0 400 270" width="400" height="270" role="img" aria-label="ระบบเศรษฐกิจสามแบบ">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ระบบเศรษฐกิจ — ใครเป็นคนตัดสินใจ</text>
  <defs><linearGradient id="axg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#3b7ddd"/><stop offset="100%" stop-color="#e05252"/></linearGradient></defs>
  <rect x="30" y="36" width="340" height="10" rx="5" fill="url(#axg)" opacity="0.55"/>
  <text x="30" y="62" font-size="9.5" fill="#3b7ddd">เอกชนตัดสินใจล้วน</text>
  <text x="370" y="62" text-anchor="end" font-size="9.5" fill="#e05252">รัฐตัดสินใจล้วน</text>
  <g font-size="10">
    <rect x="22" y="76" width="110" height="88" rx="10" fill="#3b7ddd" opacity="0.14"/>
    <text x="77" y="96" text-anchor="middle" font-size="11" font-weight="700" fill="#3b7ddd">ทุนนิยม</text>
    <text x="77" y="114" text-anchor="middle" fill="currentColor" font-size="9.5">เอกชนเป็นเจ้าของ</text>
    <text x="77" y="130" text-anchor="middle" fill="currentColor" font-size="9.5">กลไกราคาตัดสิน</text>
    <text x="77" y="150" text-anchor="middle" fill="currentColor" font-size="9">เก่ง: มีประสิทธิภาพ</text>
    <text x="77" y="162" text-anchor="middle" fill="currentColor" font-size="9">เสี่ยง: เหลื่อมล้ำ</text>

    <rect x="145" y="76" width="110" height="88" rx="10" fill="#7c5cd6" opacity="0.14"/>
    <text x="200" y="96" text-anchor="middle" font-size="11" font-weight="700" fill="#7c5cd6">แบบผสม</text>
    <text x="200" y="114" text-anchor="middle" fill="currentColor" font-size="9.5">เอกชนนำ รัฐกำกับ</text>
    <text x="200" y="130" text-anchor="middle" fill="currentColor" font-size="9.5">รัฐดูแลของสาธารณะ</text>
    <text x="200" y="150" text-anchor="middle" fill="currentColor" font-size="9">เก่ง: ยืดหยุ่น</text>
    <text x="200" y="162" text-anchor="middle" fill="currentColor" font-size="9">เสี่ยง: เส้นแบ่งไม่ชัด</text>

    <rect x="268" y="76" width="110" height="88" rx="10" fill="#e05252" opacity="0.14"/>
    <text x="323" y="96" text-anchor="middle" font-size="11" font-weight="700" fill="#e05252">สังคมนิยม</text>
    <text x="323" y="114" text-anchor="middle" fill="currentColor" font-size="9.5">รัฐเป็นเจ้าของ</text>
    <text x="323" y="130" text-anchor="middle" fill="currentColor" font-size="9.5">รัฐวางแผนกลาง</text>
    <text x="323" y="150" text-anchor="middle" fill="currentColor" font-size="9">เก่ง: เท่าเทียมกว่า</text>
    <text x="323" y="162" text-anchor="middle" fill="currentColor" font-size="9">เสี่ยง: ขาดแรงจูงใจ</text>
  </g>
  <line x1="20" y1="184" x2="380" y2="184" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="202" font-weight="700">เกณฑ์ที่ใช้เทียบมี 3 ข้อ ถามข้อสอบวนอยู่แค่นี้</text>
    <text x="20" y="220">① ใครเป็นเจ้าของปัจจัยการผลิต ② ใครตัดสินใจว่าจะผลิตอะไร</text>
    <text x="20" y="238">③ เสรีภาพในการเลือกของประชาชนมีแค่ไหน</text>
    <text x="20" y="260" font-size="10" fill="#e05252">ของจริงแทบไม่มีประเทศไหนสุดขั้ว ส่วนใหญ่เป็นแบบผสม ไทยก็เช่นกัน</text>
  </g>
</svg>`;

  const SVG_MARKETS = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="ประเภทของตลาดตามการแข่งขัน">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ตลาดตามระดับการแข่งขัน — ยิ่งขวา ยิ่งคุมราคาได้มาก</text>
  <g>
    <rect x="22" y="36" width="356" height="8" rx="4" fill="#3b7ddd" opacity="0.3"/>
    <circle cx="66" cy="40" r="6" fill="#3b7ddd"/><circle cx="170" cy="40" r="6" fill="#2e9e6b"/>
    <circle cx="274" cy="40" r="6" fill="#d98324"/><circle cx="356" cy="40" r="6" fill="#e05252"/>
  </g>
  <g font-size="10">
    <text x="66" y="66" text-anchor="middle" font-weight="700" fill="#3b7ddd">แข่งขันสมบูรณ์</text>
    <text x="66" y="82" text-anchor="middle" fill="currentColor" font-size="9">ผู้ขายมากราย</text>
    <text x="66" y="94" text-anchor="middle" fill="currentColor" font-size="9">สินค้าเหมือนกัน</text>
    <text x="66" y="110" text-anchor="middle" fill="currentColor" font-size="9">เช่น ข้าวเปลือก</text>

    <text x="170" y="66" text-anchor="middle" font-weight="700" fill="#2e9e6b">กึ่งแข่งขันกึ่งผูกขาด</text>
    <text x="170" y="82" text-anchor="middle" fill="currentColor" font-size="9">ผู้ขายมาก</text>
    <text x="170" y="94" text-anchor="middle" fill="currentColor" font-size="9">สินค้าต่างกันเล็กน้อย</text>
    <text x="170" y="110" text-anchor="middle" fill="currentColor" font-size="9">เช่น ร้านกาแฟ สบู่</text>

    <text x="274" y="66" text-anchor="middle" font-weight="700" fill="#d98324">ผู้ขายน้อยราย</text>
    <text x="274" y="82" text-anchor="middle" fill="currentColor" font-size="9">ผู้ขายไม่กี่เจ้า</text>
    <text x="274" y="94" text-anchor="middle" fill="currentColor" font-size="9">จับตากันเอง</text>
    <text x="274" y="110" text-anchor="middle" fill="currentColor" font-size="9">เช่น ค่ายมือถือ</text>

    <text x="356" y="66" text-anchor="middle" font-weight="700" fill="#e05252">ผูกขาด</text>
    <text x="356" y="82" text-anchor="middle" fill="currentColor" font-size="9">ผู้ขายรายเดียว</text>
    <text x="356" y="94" text-anchor="middle" fill="currentColor" font-size="9">ไม่มีของทดแทน</text>
    <text x="356" y="110" text-anchor="middle" fill="currentColor" font-size="9">เช่น น้ำประปา</text>
  </g>
  <line x1="20" y1="132" x2="380" y2="132" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="152" font-weight="700">ดูอะไรถึงแยกออก — ถามตัวเอง 3 ข้อ</text>
    <text x="20" y="172">① ผู้ขายมีกี่ราย ② สินค้าของแต่ละรายเหมือนกันไหม</text>
    <text x="20" y="190">③ รายใหม่เข้ามาขายได้ง่ายแค่ไหน</text>
    <text x="20" y="212" font-size="10" font-weight="700" fill="#3b7ddd">ตลาดแข่งขันสมบูรณ์: ผู้ขายเป็นผู้รับราคา ตั้งราคาเองไม่ได้เลย</text>
    <text x="20" y="230" font-size="10" font-weight="700" fill="#e05252">ตลาดผูกขาด: ผู้ขายเป็นผู้กำหนดราคา แต่ก็ยังถูกจำกัดด้วยกำลังซื้อ</text>
  </g>
</svg>`;

  const SVG_ACTIVITY = `<svg viewBox="0 0 400 230" width="400" height="230" role="img" aria-label="กิจกรรมทางเศรษฐกิจสี่ขั้น">
  <text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">กิจกรรมทางเศรษฐกิจ 4 ขั้น ต่อกันเป็นลูกโซ่</text>
  <g font-size="10.5">
    <rect x="18" y="38" width="80" height="44" rx="10" fill="#2e9e6b" opacity="0.16"/>
    <text x="58" y="58" text-anchor="middle" font-weight="700" fill="#2e9e6b">① การผลิต</text>
    <text x="58" y="74" text-anchor="middle" font-size="9" fill="currentColor">สร้างของ/บริการ</text>
    <rect x="115" y="38" width="80" height="44" rx="10" fill="#3b7ddd" opacity="0.16"/>
    <text x="155" y="58" text-anchor="middle" font-weight="700" fill="#3b7ddd">② การกระจาย</text>
    <text x="155" y="74" text-anchor="middle" font-size="9" fill="currentColor">ส่งของ+แบ่งรายได้</text>
    <rect x="212" y="38" width="80" height="44" rx="10" fill="#d98324" opacity="0.16"/>
    <text x="252" y="58" text-anchor="middle" font-weight="700" fill="#d98324">③ การแลกเปลี่ยน</text>
    <text x="252" y="74" text-anchor="middle" font-size="9" fill="currentColor">ซื้อขายผ่านเงิน</text>
    <rect x="309" y="38" width="80" height="44" rx="10" fill="#7c5cd6" opacity="0.16"/>
    <text x="349" y="58" text-anchor="middle" font-weight="700" fill="#7c5cd6">④ การบริโภค</text>
    <text x="349" y="74" text-anchor="middle" font-size="9" fill="currentColor">ใช้เพื่อสนองความต้องการ</text>
  </g>
  <g stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.7">
    <path d="M 98 60 L 112 60"/><path d="M 107 56 L 113 60 L 107 64"/>
    <path d="M 195 60 L 209 60"/><path d="M 204 56 L 210 60 L 204 64"/>
    <path d="M 292 60 L 306 60"/><path d="M 301 56 L 307 60 L 301 64"/>
  </g>
  <line x1="20" y1="104" x2="380" y2="104" stroke="currentColor" stroke-width="1" opacity="0.25"/>
  <g font-size="10.5" fill="currentColor">
    <text x="20" y="124" font-weight="700">คำที่ต้องแยกให้ขาด</text>
    <text x="20" y="144">สินค้า = จับต้องได้ · บริการ = จับต้องไม่ได้ แต่สนองความต้องการได้เหมือนกัน</text>
    <text x="20" y="164">การบริโภค ไม่ได้แปลว่า กิน อย่างเดียว — ใช้ปากกา ดูหนัง นั่งรถเมล์ ก็คือบริโภค</text>
    <text x="20" y="186" font-weight="700" fill="#d98324">การแลกเปลี่ยนพัฒนามาเป็น 3 ยุค</text>
    <text x="20" y="204" font-size="10">ของแลกของ → ใช้เงินเป็นสื่อกลาง → ใช้เครดิตและเงินดิจิทัล</text>
    <text x="20" y="222" font-size="10">ของแลกของลำบากตรงต้อง อยากได้ตรงกันพอดีทั้งสองฝ่าย จึงเกิดเงินขึ้นมาแก้ปัญหา</text>
  </g>
</svg>`;

  const SVG_DEMAND = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="เส้นอุปสงค์">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">กฎของอุปสงค์ — ราคากับปริมาณซื้อสวนทางกัน</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 60 26 L 60 200 L 318 200"/><path d="M 56 32 L 60 25 L 64 32"/><path d="M 312 196 L 319 200 L 312 204"/></g><text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text><text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 288.0 192.0 L 72.0 48.0" fill="none" stroke="#3b7ddd" stroke-width="2.2"/><text x="294.0" y="186.0" font-size="11.5" font-weight="700" fill="#3b7ddd">D</text>
<circle cx="108.0" cy="72.0" r="3.4" fill="#3b7ddd"/>
<g stroke="#3b7ddd" stroke-width="0.9" stroke-dasharray="3 3" opacity="0.6"><path d="M 60 72.0 L 108.0 72.0"/><path d="M 108.0 72.0 L 108.0 200"/></g>
<text x="54" y="76.0" text-anchor="end" font-size="10" fill="#3b7ddd">80</text>
<text x="108.0" y="214" text-anchor="middle" font-size="10" fill="#3b7ddd">20</text>
<circle cx="156.0" cy="104.0" r="3.4" fill="#3b7ddd"/>
<g stroke="#3b7ddd" stroke-width="0.9" stroke-dasharray="3 3" opacity="0.6"><path d="M 60 104.0 L 156.0 104.0"/><path d="M 156.0 104.0 L 156.0 200"/></g>
<text x="54" y="108.0" text-anchor="end" font-size="10" fill="#3b7ddd">60</text>
<text x="156.0" y="214" text-anchor="middle" font-size="10" fill="#3b7ddd">40</text>
<circle cx="204.0" cy="136.0" r="3.4" fill="#3b7ddd"/>
<g stroke="#3b7ddd" stroke-width="0.9" stroke-dasharray="3 3" opacity="0.6"><path d="M 60 136.0 L 204.0 136.0"/><path d="M 204.0 136.0 L 204.0 200"/></g>
<text x="54" y="140.0" text-anchor="end" font-size="10" fill="#3b7ddd">40</text>
<text x="204.0" y="214" text-anchor="middle" font-size="10" fill="#3b7ddd">60</text>
<path d="M 108.0 72.0 L 204.0 136.0" stroke="#e05252" stroke-width="0" fill="none"/>
<text x="232.8" y="75.2" font-size="10.5" fill="currentColor">ราคาลง → ซื้อมากขึ้น</text>
<text x="232.8" y="88.0" font-size="10.5" fill="currentColor">ราคาขึ้น → ซื้อน้อยลง</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="250" font-size="11.5" font-weight="700" fill="currentColor">อุปสงค์ = ปริมาณที่ผู้บริโภค เต็มใจซื้อ และ มีเงินจ่ายไหว</text><text x="20" y="267" font-size="10.5" font-weight="400" fill="currentColor">เส้นลาดลงจากซ้ายบนไปขวาล่าง เพราะราคากับปริมาณซื้อแปรผกผัน</text><text x="20" y="284" font-size="10.5" font-weight="400" fill="currentColor">ต้องครบทั้งสองอย่าง อยากได้อย่างเดียวแต่ไม่มีเงิน ไม่นับเป็นอุปสงค์</text>
</svg>`;

  const SVG_SUPPLY = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="เส้นอุปทาน">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">กฎของอุปทาน — ราคากับปริมาณขายไปทางเดียวกัน</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 60 26 L 60 200 L 318 200"/><path d="M 56 32 L 60 25 L 64 32"/><path d="M 312 196 L 319 200 L 312 204"/></g><text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text><text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 24.0 192.0 L 240.0 48.0" fill="none" stroke="#d98324" stroke-width="2.2"/><text x="246.0" y="42.0" font-size="11.5" font-weight="700" fill="#d98324">S</text>
<circle cx="204.0" cy="72.0" r="3.4" fill="#d98324"/>
<g stroke="#d98324" stroke-width="0.9" stroke-dasharray="3 3" opacity="0.6"><path d="M 60 72.0 L 204.0 72.0"/><path d="M 204.0 72.0 L 204.0 200"/></g>
<text x="54" y="76.0" text-anchor="end" font-size="10" fill="#d98324">80</text>
<text x="204.0" y="214" text-anchor="middle" font-size="10" fill="#d98324">60</text>
<circle cx="156.0" cy="104.0" r="3.4" fill="#d98324"/>
<g stroke="#d98324" stroke-width="0.9" stroke-dasharray="3 3" opacity="0.6"><path d="M 60 104.0 L 156.0 104.0"/><path d="M 156.0 104.0 L 156.0 200"/></g>
<text x="54" y="108.0" text-anchor="end" font-size="10" fill="#d98324">60</text>
<text x="156.0" y="214" text-anchor="middle" font-size="10" fill="#d98324">40</text>
<circle cx="108.0" cy="136.0" r="3.4" fill="#d98324"/>
<g stroke="#d98324" stroke-width="0.9" stroke-dasharray="3 3" opacity="0.6"><path d="M 60 136.0 L 108.0 136.0"/><path d="M 108.0 136.0 L 108.0 200"/></g>
<text x="54" y="140.0" text-anchor="end" font-size="10" fill="#d98324">40</text>
<text x="108.0" y="214" text-anchor="middle" font-size="10" fill="#d98324">20</text>
<text x="74.4" y="62.4" font-size="10.5" fill="currentColor">ราคาขึ้น → ผลิตขายมากขึ้น</text>
<text x="74.4" y="75.2" font-size="10.5" fill="currentColor">ราคาลง → ผลิตขายน้อยลง</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="250" font-size="11.5" font-weight="700" fill="currentColor">อุปทาน = ปริมาณที่ผู้ผลิต เต็มใจขาย และ ผลิตได้จริง</text><text x="20" y="267" font-size="10.5" font-weight="400" fill="currentColor">เส้นชันขึ้นจากซ้ายล่างไปขวาบน เพราะราคาสูงแปลว่ากำไรต่อชิ้นสูงขึ้น</text><text x="20" y="284" font-size="10.5" font-weight="400" fill="currentColor">ราคาที่สูงขึ้นจึงจูงใจให้ดึงทรัพยากรมาผลิตสินค้านี้มากขึ้น</text>
</svg>`;

  const SVG_MOVE = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="เคลื่อนบนเส้นกับเลื่อนทั้งเส้น">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">จุดที่พลาดบ่อยที่สุด — เคลื่อนบนเส้น ≠ เลื่อนทั้งเส้น</text>
<text x="106" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">① ราคาสินค้าเปลี่ยนเอง</text><g stroke="currentColor" stroke-width="1.4" fill="none" opacity="0.8"><path d="M 40 46 L 40 190 L 182 190"/></g><path d="M 46.6 66.5 L 165.4 183.5" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="169.4" y="177.5" font-size="10.5" font-weight="700" fill="#3b7ddd">D₀</text><g stroke="#e05252" stroke-width="1.6" fill="none"><path d="M 66.4 86.0 L 119.2 138.0"/><path d="M 113.2 136.0 L 119.2 138.0 L 118.2 131.0"/></g><circle cx="66.4" cy="86.0" r="3.6" fill="#3b7ddd"/><circle cx="119.2" cy="138.0" r="3.6" fill="#e05252"/><text x="40" y="208" font-size="10" fill="#e05252">ราคาเปลี่ยน จุดเลื่อนบนเส้นเดิม</text>
<text x="271" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">② ปัจจัยอื่นเปลี่ยน</text><g stroke="currentColor" stroke-width="1.4" fill="none" opacity="0.8"><path d="M 205 46 L 205 190 L 347 190"/></g><path d="M 211.6 66.5 L 330.4 183.5" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="334.4" y="177.5" font-size="10.5" font-weight="700" fill="#3b7ddd">D₀</text><path d="M 244.6 66.5 L 363.4 183.5" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="367.4" y="177.5" font-size="10.5" font-weight="700" fill="#3b7ddd">D₁</text><g stroke="#2e9e6b" stroke-width="1.6" fill="none"><path d="M 257.8 112.0 L 290.8 112.0"/><path d="M 285.8 108.0 L 290.8 112.0 L 285.8 116.0"/></g><circle cx="257.8" cy="112.0" r="3.6" fill="#3b7ddd"/><circle cx="290.8" cy="112.0" r="3.6" fill="#2e9e6b"/><text x="205" y="208" font-size="10" fill="#2e9e6b">ราคาเท่าเดิม แต่ทั้งเส้นขยับ</text>
<line x1="20" y1="220" x2="380" y2="220" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="236" font-size="11.5" font-weight="700" fill="currentColor">ราคาสินค้านั้นเปลี่ยนเอง = เดินบนเส้นเดิม</text><text x="20" y="253" font-size="10.5" font-weight="400" fill="currentColor">เรียกว่า การเปลี่ยนแปลงปริมาณอุปสงค์</text><text x="20" y="270" font-size="10.5" font-weight="400" fill="currentColor">ปัจจัยอื่นเปลี่ยน (รายได้ รสนิยม ราคาสินค้าอื่น) = เลื่อนทั้งเส้น</text><text x="20" y="287" font-size="10.5" font-weight="400" fill="currentColor">เรียกว่า การเปลี่ยนแปลงอุปสงค์ — คนละคำกัน ข้อสอบชอบถาม</text>
</svg>`;

  const SVG_EQ = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="ดุลยภาพและส่วนเกิน">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">ดุลยภาพ · อุปทานส่วนเกิน · อุปสงค์ส่วนเกิน</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 60 26 L 60 200 L 318 200"/><path d="M 56 32 L 60 25 L 64 32"/><path d="M 312 196 L 319 200 L 312 204"/></g><text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text><text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 288.0 192.0 L 72.0 48.0" fill="none" stroke="#3b7ddd" stroke-width="2.2"/><text x="294.0" y="186.0" font-size="11.5" font-weight="700" fill="#3b7ddd">D</text>
<path d="M 24.0 192.0 L 240.0 48.0" fill="none" stroke="#d98324" stroke-width="2.2"/><text x="246.0" y="42.0" font-size="11.5" font-weight="700" fill="#d98324">S</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"><path d="M 60 104.0 L 156.0 104.0"/><path d="M 156.0 104.0 L 156.0 200"/></g><circle cx="156.0" cy="104.0" r="4.2" fill="#e05252"/><text x="163.0" y="95.0" font-size="11" font-weight="700" fill="#e05252">E</text>
<text x="54" y="108.0" text-anchor="end" font-size="10" fill="#e05252">P*</text>
<text x="156.0" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q*</text>
<g stroke="#d98324" stroke-width="1.2" stroke-dasharray="4 3"><path d="M 60 64.0 L 216.0 64.0"/></g>
<path d="M 96.0 64.0 L 216.0 64.0" stroke="#d98324" stroke-width="5" opacity="0.35"/>
<text x="222.0" y="68.0" font-size="9.5" font-weight="700" fill="#d98324">อุปทานส่วนเกิน (ของล้นตลาด)</text>
<g stroke="#3b7ddd" stroke-width="1.2" stroke-dasharray="4 3"><path d="M 60 144.0 L 216.0 144.0"/></g>
<path d="M 96.0 144.0 L 216.0 144.0" stroke="#3b7ddd" stroke-width="5" opacity="0.35"/>
<text x="222.0" y="148.0" font-size="9.5" font-weight="700" fill="#3b7ddd">อุปสงค์ส่วนเกิน (ของขาดตลาด)</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="250" font-size="11.5" font-weight="700" fill="currentColor">ดุลยภาพ = ปริมาณซื้อเท่ากับปริมาณขายพอดี ไม่มีของเหลือ ไม่มีของขาด</text><text x="20" y="267" font-size="10.5" font-weight="400" fill="currentColor">ราคาสูงกว่าดุลยภาพ → ของล้น ผู้ขายต้องลดราคา ราคาจึงไหลกลับลงมาที่ E</text><text x="20" y="284" font-size="10.5" font-weight="400" fill="currentColor">ราคาต่ำกว่าดุลยภาพ → ของขาด ผู้ซื้อแย่งกัน ราคาจึงถูกดันขึ้นกลับไปที่ E</text>
</svg>`;

  const SVG_CEILING = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="ราคาขั้นสูง">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">รัฐกำหนดราคาขั้นสูง (เพดานราคา) — ต้องต่ำกว่าดุลยภาพจึงมีผล</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 60 26 L 60 200 L 318 200"/><path d="M 56 32 L 60 25 L 64 32"/><path d="M 312 196 L 319 200 L 312 204"/></g><text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text><text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 288.0 192.0 L 72.0 48.0" fill="none" stroke="#3b7ddd" stroke-width="2.2"/><text x="294.0" y="186.0" font-size="11.5" font-weight="700" fill="#3b7ddd">D</text>
<path d="M 24.0 192.0 L 240.0 48.0" fill="none" stroke="#d98324" stroke-width="2.2"/><text x="246.0" y="42.0" font-size="11.5" font-weight="700" fill="#d98324">S</text>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"><path d="M 60 104.0 L 156.0 104.0"/><path d="M 156.0 104.0 L 156.0 200"/></g><circle cx="156.0" cy="104.0" r="4.2" fill="#8a8a8a"/><text x="163.0" y="95.0" font-size="11" font-weight="700" fill="#8a8a8a">E</text>
<path d="M 60 136.0 L 310 136.0" stroke="#e05252" stroke-width="2.2" stroke-dasharray="7 4"/>
<text x="312" y="140.0" font-size="10" font-weight="700" fill="#e05252">เพดาน</text>
<path d="M 108.0 136.0 L 204.0 136.0" stroke="#3b7ddd" stroke-width="6" opacity="0.35"/>
<circle cx="108.0" cy="136.0" r="3.6" fill="#d98324"/><circle cx="204.0" cy="136.0" r="3.6" fill="#3b7ddd"/>
<text x="108.0" y="214" text-anchor="middle" font-size="10" fill="#d98324">ขายจริง</text>
<text x="204.0" y="214" text-anchor="middle" font-size="10" fill="#3b7ddd">อยากซื้อ</text>
<text x="156.0" y="152.0" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">ของขาดตลาด 40 หน่วย</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="250" font-size="11.5" font-weight="700" fill="currentColor">ใช้ตอนของแพงจนคนเดือดร้อน เช่น ตรึงราคาสินค้าจำเป็นช่วงวิกฤต</text><text x="20" y="267" font-size="10.5" font-weight="400" fill="currentColor">ราคาถูกกดต่ำกว่าดุลยภาพ คนอยากซื้อเยอะขึ้นแต่ผู้ผลิตอยากขายน้อยลง</text><text x="20" y="284" font-size="10.5" font-weight="400" fill="currentColor">ผลข้างเคียงคือของขาดตลาด ต้องเข้าคิว ปันส่วน และมักเกิดตลาดมืด</text>
</svg>`;

  const SVG_FLOOR = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="ราคาขั้นต่ำ">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">รัฐกำหนดราคาขั้นต่ำ (ราคาประกัน) — ต้องสูงกว่าดุลยภาพจึงมีผล</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 60 26 L 60 200 L 318 200"/><path d="M 56 32 L 60 25 L 64 32"/><path d="M 312 196 L 319 200 L 312 204"/></g><text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text><text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 288.0 192.0 L 72.0 48.0" fill="none" stroke="#3b7ddd" stroke-width="2.2"/><text x="294.0" y="186.0" font-size="11.5" font-weight="700" fill="#3b7ddd">D</text>
<path d="M 24.0 192.0 L 240.0 48.0" fill="none" stroke="#d98324" stroke-width="2.2"/><text x="246.0" y="42.0" font-size="11.5" font-weight="700" fill="#d98324">S</text>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"><path d="M 60 104.0 L 156.0 104.0"/><path d="M 156.0 104.0 L 156.0 200"/></g><circle cx="156.0" cy="104.0" r="4.2" fill="#8a8a8a"/><text x="163.0" y="119.0" font-size="11" font-weight="700" fill="#8a8a8a">E</text>
<path d="M 60 72.0 L 310 72.0" stroke="#2e9e6b" stroke-width="2.2" stroke-dasharray="7 4"/>
<text x="312" y="76.0" font-size="10" font-weight="700" fill="#2e9e6b">ขั้นต่ำ</text>
<path d="M 108.0 72.0 L 204.0 72.0" stroke="#d98324" stroke-width="6" opacity="0.35"/>
<circle cx="204.0" cy="72.0" r="3.6" fill="#d98324"/><circle cx="108.0" cy="72.0" r="3.6" fill="#3b7ddd"/>
<text x="108.0" y="214" text-anchor="middle" font-size="10" fill="#3b7ddd">ซื้อจริง</text>
<text x="204.0" y="214" text-anchor="middle" font-size="10" fill="#d98324">อยากขาย</text>
<text x="156.0" y="52.8" text-anchor="middle" font-size="10" font-weight="700" fill="#d98324">ของล้นตลาด 40 หน่วย</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="250" font-size="11.5" font-weight="700" fill="currentColor">ใช้ตอนของถูกจนผู้ผลิตอยู่ไม่ได้ เช่น ประกันราคาพืชผลหรือค่าจ้างขั้นต่ำ</text><text x="20" y="267" font-size="10.5" font-weight="400" fill="currentColor">ราคาถูกยกสูงกว่าดุลยภาพ ผู้ผลิตอยากขายเยอะขึ้นแต่คนซื้อน้อยลง</text><text x="20" y="284" font-size="10.5" font-weight="400" fill="currentColor">ผลข้างเคียงคือของล้นตลาด รัฐมักต้องรับซื้อส่วนเกินเก็บไว้เอง</text>
</svg>`;

/* กราฟอุปสงค์-อุปทาน 12 กรณี — สร้างด้วยสคริปต์ คำนวณจุดตัดจริงทุกรูป */

  const SVG_G01 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์ลด มากกว่า อุปทานลด">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์ลด มากกว่า อุปทานลด</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 214.2 200.0 L 55.0 96.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="220.2" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 144.0 L 214.2 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="220.2" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 116.2 136.0"/><path d="M 121.2 132.0 L 116.2 136.0 L 121.2 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 184.8 59.2"/><path d="M 189.8 55.2 L 184.8 59.2 L 189.8 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 120.0 L 91.8 120.0"/><path d="M 91.8 120.0 L 91.8 200"/></g><circle cx="91.8" cy="120.0" r="4" fill="#e05252"/><text x="98.8" y="112.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="124.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="91.8" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาลดลง · ปริมาณลดลง</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันปริมาณลง → ปริมาณลดแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ราคา: D ดันลงแรงกว่า S ดันขึ้น → ราคาจึงลดลง</text>
</svg>`;

  const SVG_G02 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์ลด น้อยกว่า อุปทานลด">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์ลด น้อยกว่า อุปทานลด</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 263.2 200.0 L 55.0 64.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="269.2" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 112.0 L 165.2 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="171.2" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 165.2 136.0"/><path d="M 170.2 132.0 L 165.2 136.0 L 170.2 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 135.9 59.2"/><path d="M 140.9 55.2 L 135.9 59.2 L 140.9 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 88.0 L 91.8 88.0"/><path d="M 91.8 88.0 L 91.8 200"/></g><circle cx="91.8" cy="88.0" r="4" fill="#e05252"/><text x="98.8" y="103.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="92.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="91.8" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาสูงขึ้น · ปริมาณลดลง</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันปริมาณลง → ปริมาณลดแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ราคา: S ดันขึ้นแรงกว่า D ดันลง → ราคาจึงสูงขึ้น</text>
</svg>`;

  const SVG_G03 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์ลด เท่ากับ อุปทานลด">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์ลด เท่ากับ อุปทานลด</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 238.8 200.0 L 55.0 80.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="244.8" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 128.0 L 189.8 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="195.8" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 140.8 136.0"/><path d="M 145.8 132.0 L 140.8 136.0 L 145.8 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 160.3 59.2"/><path d="M 165.3 55.2 L 160.3 59.2 L 165.3 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 91.8 104.0"/><path d="M 91.8 104.0 L 91.8 200"/></g><circle cx="91.8" cy="104.0" r="4" fill="#e05252"/><text x="98.8" y="96.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="currentColor">P₀=P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="91.8" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาเท่าเดิม · ปริมาณลดลง</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันปริมาณลง → ปริมาณลดแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ราคา: สองแรงหักล้างกันพอดี → ราคาเท่าเดิม</text>
</svg>`;

  const SVG_G04 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์ลด มากกว่า อุปทานเพิ่ม">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์ลด มากกว่า อุปทานเพิ่ม</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 214.2 200.0 L 55.0 96.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="220.2" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 192.0 L 287.8 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="293.8" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 116.2 136.0"/><path d="M 121.2 132.0 L 116.2 136.0 L 121.2 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 258.4 59.2"/><path d="M 253.39999999999998 55.2 L 258.4 59.2 L 253.39999999999998 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 144.0 L 128.5 144.0"/><path d="M 128.5 144.0 L 128.5 200"/></g><circle cx="128.5" cy="144.0" r="4" fill="#e05252"/><text x="135.5" y="136.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="148.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="128.5" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาลดลง · ปริมาณลดลง</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันราคาลง → ราคาลดแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ปริมาณ: D ดึงลงแรงกว่า S ดันขึ้น → ปริมาณจึงลดลง</text>
</svg>`;

  const SVG_G05 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์ลด น้อยกว่า อุปทานเพิ่ม">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์ลด น้อยกว่า อุปทานเพิ่ม</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 263.2 200.0 L 55.0 64.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="269.2" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 91.8 200.0 L 300.0 64.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="59.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 165.2 136.0"/><path d="M 170.2 132.0 L 165.2 136.0 L 170.2 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 307.4 59.2"/><path d="M 302.4 55.2 L 307.4 59.2 L 302.4 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 144.0 L 177.5 144.0"/><path d="M 177.5 144.0 L 177.5 200"/></g><circle cx="177.5" cy="144.0" r="4" fill="#e05252"/><text x="184.5" y="136.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="148.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="177.5" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาลดลง · ปริมาณเพิ่มขึ้น</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันราคาลง → ราคาลดแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ปริมาณ: S ดันขึ้นแรงกว่า D ดึงลง → ปริมาณจึงเพิ่มขึ้น</text>
</svg>`;

  const SVG_G06 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์ลด เท่ากับ อุปทานเพิ่ม">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์ลด เท่ากับ อุปทานเพิ่ม</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 238.8 200.0 L 55.0 80.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="244.8" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 67.2 200.0 L 300.0 48.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="43.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 140.8 136.0"/><path d="M 145.8 132.0 L 140.8 136.0 L 145.8 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 282.9 59.2"/><path d="M 277.9 55.2 L 282.9 59.2 L 277.9 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 144.0 L 153.0 144.0"/><path d="M 153.0 144.0 L 153.0 200"/></g><circle cx="153.0" cy="144.0" r="4" fill="#e05252"/><text x="160.0" y="136.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="148.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="currentColor">Q₀=Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาลดลง · ปริมาณเท่าเดิม</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันราคาลง → ราคาลดแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ปริมาณ: สองแรงหักล้างกันพอดี → ปริมาณเท่าเดิม</text>
</svg>`;

  const SVG_G07 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์เพิ่ม มากกว่า อุปทานเพิ่ม">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์เพิ่ม มากกว่า อุปทานเพิ่ม</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 300.0 144.0 L 140.8 40.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="137.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 192.0 L 287.8 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="293.8" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 287.8 136.0"/><path d="M 282.8 132.0 L 287.8 136.0 L 282.8 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 258.4 59.2"/><path d="M 253.39999999999998 55.2 L 258.4 59.2 L 253.39999999999998 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 88.0 L 214.2 88.0"/><path d="M 214.2 88.0 L 214.2 200"/></g><circle cx="214.2" cy="88.0" r="4" fill="#e05252"/><text x="221.2" y="103.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="92.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="214.2" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาสูงขึ้น · ปริมาณเพิ่มขึ้น</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันปริมาณขึ้น → ปริมาณเพิ่มแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ราคา: D ดันขึ้นแรงกว่า S กดลง → ราคาจึงสูงขึ้น</text>
</svg>`;

  const SVG_G08 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์เพิ่ม น้อยกว่า อุปทานเพิ่ม">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์เพิ่ม น้อยกว่า อุปทานเพิ่ม</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 300.0 176.0 L 91.8 40.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="169.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 91.8 200.0 L 300.0 64.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="59.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 238.8 136.0"/><path d="M 233.8 132.0 L 238.8 136.0 L 233.8 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 307.4 59.2"/><path d="M 302.4 55.2 L 307.4 59.2 L 302.4 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 120.0 L 214.2 120.0"/><path d="M 214.2 120.0 L 214.2 200"/></g><circle cx="214.2" cy="120.0" r="4" fill="#e05252"/><text x="221.2" y="112.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="124.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="214.2" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาลดลง · ปริมาณเพิ่มขึ้น</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันปริมาณขึ้น → ปริมาณเพิ่มแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ราคา: S กดลงแรงกว่า D ดันขึ้น → ราคาจึงลดลง</text>
</svg>`;

  const SVG_G09 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์เพิ่ม เท่ากับ อุปทานเพิ่ม">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์เพิ่ม เท่ากับ อุปทานเพิ่ม</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 300.0 160.0 L 116.2 40.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="153.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 67.2 200.0 L 300.0 48.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="43.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 263.2 136.0"/><path d="M 258.2 132.0 L 263.2 136.0 L 258.2 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 282.9 59.2"/><path d="M 277.9 55.2 L 282.9 59.2 L 277.9 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 214.2 104.0"/><path d="M 214.2 104.0 L 214.2 200"/></g><circle cx="214.2" cy="104.0" r="4" fill="#e05252"/><text x="221.2" y="96.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="currentColor">P₀=P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="214.2" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาเท่าเดิม · ปริมาณเพิ่มขึ้น</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันปริมาณขึ้น → ปริมาณเพิ่มแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ราคา: สองแรงหักล้างกันพอดี → ราคาเท่าเดิม</text>
</svg>`;

  const SVG_G10 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์เพิ่ม เท่ากับ อุปทานลด">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์เพิ่ม เท่ากับ อุปทานลด</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 300.0 160.0 L 116.2 40.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="153.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 128.0 L 189.8 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="195.8" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 263.2 136.0"/><path d="M 258.2 132.0 L 263.2 136.0 L 258.2 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 160.3 59.2"/><path d="M 165.3 55.2 L 160.3 59.2 L 165.3 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 64.0 L 153.0 64.0"/><path d="M 153.0 64.0 L 153.0 200"/></g><circle cx="153.0" cy="64.0" r="4" fill="#e05252"/><text x="160.0" y="79.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="68.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="currentColor">Q₀=Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาสูงขึ้น · ปริมาณเท่าเดิม</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันราคาขึ้น → ราคาสูงขึ้นแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ปริมาณ: สองแรงหักล้างกันพอดี → ปริมาณเท่าเดิม</text>
</svg>`;

  const SVG_G11 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์เพิ่ม มากกว่า อุปทานลด">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์เพิ่ม มากกว่า อุปทานลด</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 300.0 144.0 L 140.8 40.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="137.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 144.0 L 214.2 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="220.2" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 287.8 136.0"/><path d="M 282.8 132.0 L 287.8 136.0 L 282.8 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 184.8 59.2"/><path d="M 189.8 55.2 L 184.8 59.2 L 189.8 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 64.0 L 177.5 64.0"/><path d="M 177.5 64.0 L 177.5 200"/></g><circle cx="177.5" cy="64.0" r="4" fill="#e05252"/><text x="184.5" y="79.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="68.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="177.5" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาสูงขึ้น · ปริมาณเพิ่มขึ้น</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันราคาขึ้น → ราคาสูงขึ้นแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ปริมาณ: D ดันขึ้นแรงกว่า S ดึงลง → ปริมาณจึงเพิ่มขึ้น</text>
</svg>`;

  const SVG_G12 = `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="อุปสงค์เพิ่ม น้อยกว่า อุปทานลด">
<text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">อุปสงค์เพิ่ม น้อยกว่า อุปทานลด</text>
<g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 55 26 L 55 200 L 318 200"/><path d="M 51 32 L 55 25 L 59 32"/><path d="M 312 196 L 319 200 L 312 204"/></g>
<text transform="rotate(-90 18 120)" x="18" y="120" text-anchor="middle" font-size="10.5" fill="currentColor">ราคา (P)</text>
<text x="320" y="216" text-anchor="end" font-size="10.5" fill="currentColor">ปริมาณ (Q)</text>
<path d="M 300.0 200.0 L 55.0 40.0" fill="none" stroke="#3b7ddd" stroke-width="2"/><text x="306.0" y="193.0" font-size="11" font-weight="700" fill="#3b7ddd">D₀</text>
<path d="M 55.0 168.0 L 251.0 40.0" fill="none" stroke="#d98324" stroke-width="2"/><text x="257.0" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₀</text>
<path d="M 300.0 176.0 L 91.8 40.0" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="5 4"/><text x="306.0" y="169.0" font-size="11" font-weight="700" fill="#3b7ddd">D₁</text>
<path d="M 55.0 112.0 L 165.2 40.0" fill="none" stroke="#d98324" stroke-width="2" stroke-dasharray="5 4"/><text x="171.2" y="35.0" font-size="11" font-weight="700" fill="#d98324">S₁</text>
<g stroke="#3b7ddd" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 202.0 136.0 L 238.8 136.0"/><path d="M 233.8 132.0 L 238.8 136.0 L 233.8 140.0"/></g>
<g stroke="#d98324" stroke-width="1.5" fill="none" opacity="0.9"><path d="M 221.6 59.2 L 135.9 59.2"/><path d="M 140.9 55.2 L 135.9 59.2 L 140.9 63.2"/></g>
<g stroke="#8a8a8a" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 104.0 L 153.0 104.0"/><path d="M 153.0 104.0 L 153.0 200"/></g><circle cx="153.0" cy="104.0" r="4" fill="#8a8a8a"/><text x="160.0" y="96.0" font-size="11" font-weight="700" fill="#8a8a8a">E₀</text>
<g stroke="#e05252" stroke-width="1" stroke-dasharray="3 3" opacity="0.75"><path d="M 55 64.0 L 128.5 64.0"/><path d="M 128.5 64.0 L 128.5 200"/></g><circle cx="128.5" cy="64.0" r="4" fill="#e05252"/><text x="135.5" y="79.0" font-size="11" font-weight="700" fill="#e05252">E₁</text>
<text x="49" y="108.0" text-anchor="end" font-size="10" fill="#8a8a8a">P₀</text>
<text x="49" y="68.0" text-anchor="end" font-size="10" fill="#e05252">P₁</text>
<text x="153.0" y="214" text-anchor="middle" font-size="10" fill="#8a8a8a">Q₀</text>
<text x="128.5" y="214" text-anchor="middle" font-size="10" fill="#e05252">Q₁</text>
<line x1="20" y1="234" x2="380" y2="234" stroke="currentColor" stroke-width="1" opacity="0.25"/>
<text x="20" y="252" font-size="11.5" font-weight="700" fill="currentColor">ผลลัพธ์ · ราคาสูงขึ้น · ปริมาณลดลง</text>
<text x="20" y="270" font-size="10.5" fill="currentColor">ทั้งสองแรงดันราคาขึ้น → ราคาสูงขึ้นแน่นอน</text>
<text x="20" y="286" font-size="10.5" fill="currentColor">ปริมาณ: S ดึงลงแรงกว่า D ดันขึ้น → ปริมาณจึงลดลง</text>
</svg>`;

  /* ============================================================
     โน้ตปกติ
     ============================================================ */
  STARTER_CONTENT[ID] = [
    { type: "h1", text: "เศรษฐศาสตร์ — เรื่องของการเลือก" },
    { type: "callout", html: "ทั้งบทนี้ตอบคำถามเดียว: <b>เมื่อของมีไม่พอ เราจะตัดสินใจอย่างไร</b> — ตั้งแต่ระดับตัวเราเอง ไปจนถึงระดับประเทศ ส่วนที่ออกสอบหนักที่สุดคือ <b>กราฟอุปสงค์–อุปทาน</b> ซึ่งอยู่ในบทที่ 4 ของโน้ตนี้ มีครบ 12 กรณีพร้อมรูป" },

    { type: "h2", text: "1.1 ความหมายและปัญหาพื้นฐานทางเศรษฐกิจ" },
    { type: "p", html: "<b>เศรษฐศาสตร์</b> คือวิชาที่ศึกษาการเลือกใช้<b>ทรัพยากรที่มีจำกัด</b> เพื่อตอบสนองความต้องการของมนุษย์ที่<b>ไม่มีที่สิ้นสุด</b> ให้เกิดประโยชน์สูงสุด",
      detail: `<h3>ทำไมวิชานี้ถึงเกิดขึ้น</h3>
` + SVG_CHOICE + `
<p>จุดเริ่มต้นของทุกอย่างในวิชานี้คือคำเดียว — <b>ความขาดแคลน (scarcity)</b> ไม่ได้แปลว่า "จน" แต่แปลว่า <b>ของมีน้อยกว่าที่คนอยากได้</b> ต่อให้รวยแค่ไหน เวลาก็ยังมีวันละ 24 ชั่วโมงเท่ากัน</p>
<div class="box why"><b>ถ้าทรัพยากรไม่จำกัด จะไม่มีวิชานี้</b><br>ลองนึกภาพโลกที่ทุกอย่างฟรีและมีไม่จำกัด ไม่มีใครต้องเลือก ไม่มีราคา ไม่มีการค้า วิชาเศรษฐศาสตร์ก็ไม่จำเป็นต้องมี</div>
<h4>ปัญหาพื้นฐานทางเศรษฐกิจ 3 ข้อ</h4>
<p>ไม่ว่าจะเป็นประเทศไหน ระบบไหน ก็ต้องตอบ 3 คำถามนี้ให้ได้</p>
<table><tr><th>คำถาม</th><th>ความหมาย</th><th>ตัวอย่าง</th></tr>
<tr><td><b>ผลิตอะไร</b> (What)</td><td>จะเอาทรัพยากรไปทำอะไร</td><td>ที่ดินผืนนี้ปลูกข้าวหรือสร้างโรงงาน</td></tr>
<tr><td><b>ผลิตอย่างไร</b> (How)</td><td>ใช้วิธีไหน ใช้คนหรือเครื่องจักร</td><td>ทำนาด้วยควายหรือรถไถ</td></tr>
<tr><td><b>ผลิตเพื่อใคร</b> (For whom)</td><td>ของที่ผลิตได้จะไปถึงมือใคร</td><td>ขายคนรวย ขายคนทั่วไป หรือแจกฟรี</td></tr></table>
<h4>ค่าเสียโอกาส — คำที่ออกสอบทุกปี</h4>
<p><b>ค่าเสียโอกาส (opportunity cost)</b> คือมูลค่าของ<b>ทางเลือกที่ดีที่สุดที่เราไม่ได้เลือก</b></p>
<div class="box tip"><b>ตัวอย่างที่ต้องคิดให้ครบ</b><br>วันเสาร์ว่าง มีตัวเลือก 3 อย่าง: ① อ่านหนังสือสอบ ② ไปทำงานพิเศษได้ 500 บาท ③ นอนดูซีรีส์<br>ถ้าเลือก ① ค่าเสียโอกาสคือ <b>500 บาท</b> (ทางเลือกที่ดีที่สุดที่สละไป) <b>ไม่ใช่</b> 500 บาท + การนอนดูซีรีส์</div>
<div class="box warn"><b>กับดักข้อสอบ</b> ค่าเสียโอกาสนับแค่ <b>อันดับสอง อันเดียว</b> ไม่ใช่ผลรวมของทุกอย่างที่ไม่ได้เลือก</div>
<h4>เศรษฐศาสตร์จุลภาค กับ มหภาค</h4>
<table><tr><th></th><th>จุลภาค (micro)</th><th>มหภาค (macro)</th></tr>
<tr><td>มองระดับ</td><td>หน่วยย่อย — คน ครัวเรือน ร้านค้า ตลาดหนึ่งตลาด</td><td>ทั้งประเทศ</td></tr>
<tr><td>ตัวอย่างเรื่อง</td><td>ราคาไข่ไก่ อุปสงค์อุปทาน พฤติกรรมผู้บริโภค</td><td>เงินเฟ้อ ว่างงาน GDP นโยบายการคลัง</td></tr></table>
<p>บทนี้เกือบทั้งหมดคือ<b>จุลภาค</b> เพราะคุยเรื่องตลาดกับราคาเป็นหลัก</p>` },
    { type: "bullet", html: "ทรัพยากรในทางเศรษฐศาสตร์ = ที่ดิน แรงงาน ทุน ผู้ประกอบการ — ทั้งหมด<b>มีจำกัด</b>" },
    { type: "bullet", html: "ความขาดแคลนทำให้ต้อง<b>เลือก</b> และการเลือกทำให้เกิด<b>ค่าเสียโอกาส</b>เสมอ" },
    { type: "bullet", html: "ปัญหาพื้นฐาน 3 ข้อ: <b>ผลิตอะไร · ผลิตอย่างไร · ผลิตเพื่อใคร</b>" },

    { type: "h2", text: "1.2 กิจกรรมทางเศรษฐกิจ" },
    { type: "p", html: "กิจกรรมทางเศรษฐกิจมี 4 ขั้นที่ต่อกันเป็นลูกโซ่ — <b>การผลิต → การกระจาย → การแลกเปลี่ยน → การบริโภค</b>",
      detail: `<h3>กิจกรรมทางเศรษฐกิจ 4 ขั้น</h3>
` + SVG_ACTIVITY + `
<h4>① การผลิต</h4>
<p>คือการสร้าง<b>อรรถประโยชน์</b> (ความสามารถของสิ่งของในการตอบสนองความต้องการ) ไม่ได้แปลว่าต้องเป็นโรงงานเท่านั้น — หมอตรวจคนไข้ ครูสอนหนังสือ คนขับแท็กซี่ ก็คือการผลิต<b>บริการ</b></p>
<div class="box"><b>ระดับของการผลิต</b><br>• <b>ขั้นปฐมภูมิ</b> — เอาของจากธรรมชาติมาตรง ๆ เช่น ทำนา ประมง เหมืองแร่<br>• <b>ขั้นทุติยภูมิ</b> — แปรรูปของจากขั้นแรก เช่น โรงสีข้าว โรงงานกระป๋อง<br>• <b>ขั้นตติยภูมิ</b> — บริการ เช่น ขนส่ง ธนาคาร ค้าปลีก ท่องเที่ยว</div>
<h4>② การกระจาย</h4>
<p>มีสองความหมายที่ต้องแยก: <b>กระจายสินค้า</b> (ของเดินทางจากโรงงานไปถึงผู้ซื้อ) กับ <b>กระจายรายได้</b> (เงินที่ได้จากการขายถูกแบ่งกลับไปให้เจ้าของปัจจัยการผลิตเป็นค่าจ้าง ค่าเช่า ดอกเบี้ย กำไร)</p>
<h4>③ การแลกเปลี่ยน</h4>
<table><tr><th>ยุค</th><th>วิธี</th><th>ปัญหา</th></tr>
<tr><td>ของแลกของ</td><td>เอาข้าวแลกปลา</td><td>ต้องอยากได้ตรงกันพอดีทั้งสองฝ่าย และแบ่งของไม่ได้</td></tr>
<tr><td>ใช้เงินเป็นสื่อกลาง</td><td>ขายข้าวได้เงิน แล้วเอาเงินไปซื้อปลา</td><td>แก้ปัญหาข้างบนได้หมด</td></tr>
<tr><td>เครดิต/ดิจิทัล</td><td>บัตรเครดิต โอนผ่านแอป</td><td>สะดวกแต่ใช้เกินตัวง่าย</td></tr></table>
<div class="box why"><b>ทำไมเงินถึงเกิดขึ้น</b><br>ระบบของแลกของต้องการสิ่งที่เรียกว่า "ความต้องการตรงกันสองทาง" — ฉันมีข้าวอยากได้ปลา และต้องเจอคนที่มีปลาและอยากได้ข้าวพอดี ซึ่งหายากมาก เงินจึงถูกคิดขึ้นมาเป็นตัวกลางให้ทุกคนยอมรับ</div>
<h4>④ การบริโภค</h4>
<p>คือการใช้สินค้าและบริการเพื่อตอบสนองความต้องการ <b>ไม่ได้แปลว่ากินอย่างเดียว</b> — ใช้ปากกา นั่งรถเมล์ ดูหนัง ก็คือการบริโภค</p>
<div class="box tip"><b>แยกให้ขาด</b> สินค้าคงทน (ใช้ได้นาน เช่น ตู้เย็น) กับ สินค้าไม่คงทน (ใช้แล้วหมด เช่น อาหาร)</div>` },

    { type: "h2", text: "1.3 การผลิตและปัจจัยการผลิต" },
    { type: "table", rows: [
      ["ปัจจัยการผลิต", "หมายถึง", "ผลตอบแทนของเจ้าของ"],
      ["ที่ดิน / ทรัพยากรธรรมชาติ", "ผืนดิน น้ำ ป่า แร่ธาตุ อากาศ", "ค่าเช่า (rent)"],
      ["แรงงาน", "กำลังกายและกำลังสมองของคน", "ค่าจ้าง / เงินเดือน (wage)"],
      ["ทุน", "เครื่องจักร โรงงาน เครื่องมือ ที่ใช้ผลิตซ้ำได้", "ดอกเบี้ย (interest)"],
      ["ผู้ประกอบการ", "คนที่รวมปัจจัยทั้งสามเข้าด้วยกันและรับความเสี่ยง", "กำไร (profit)"]
    ], detail: `<h3>ปัจจัยการผลิต 4 ชนิด</h3>
` + SVG_FACTORS + `
<h4>ทำไมผู้ประกอบการถึงได้ "กำไร" ไม่ใช่เงินเดือน</h4>
<p>เพราะผลตอบแทนอีกสามอย่างเป็นจำนวนที่<b>ตกลงกันไว้ล่วงหน้า</b> — ลูกจ้างได้ค่าจ้างแน่นอน เจ้าของที่ได้ค่าเช่าแน่นอน เจ้าหนี้ได้ดอกเบี้ยแน่นอน ส่วนผู้ประกอบการได้<b>เศษที่เหลือ</b>หลังจ่ายทุกคนแล้ว ซึ่งอาจเป็นบวก (กำไร) หรือลบ (ขาดทุน) ก็ได้ นี่คือเหตุผลที่เขาได้รับผลตอบแทนแลกกับ<b>การแบกความเสี่ยง</b></p>
<div class="box warn"><b>กับดักที่พลาดกันเยอะ</b><br>• <b>เงินสดไม่ใช่ "ทุน"</b> ในทางเศรษฐศาสตร์ — เงินเป็นเพียงสื่อกลางที่เอาไปซื้อทุน ทุนคือของจริงที่ใช้ผลิต เช่น เครื่องจักร<br>• <b>ที่ดินไม่ได้แปลว่าดินเท่านั้น</b> — รวมทรัพยากรธรรมชาติทุกชนิด ทั้งน้ำ แร่ ป่าไม้<br>• คนหนึ่งคนเป็นได้หลายปัจจัย เช่น เจ้าของร้านที่ลงมือขายเองด้วย เป็นทั้งผู้ประกอบการและแรงงาน</div>
<h4>ฝึกอ่านสถานการณ์</h4>
<p><i>"สมชายกู้เงินธนาคารมาซื้อรถเข็นและเตา เช่าที่หน้าปากซอยขายลูกชิ้น จ้างน้องมาช่วยขายวันละ 300 บาท"</i></p>
<table><tr><th>สิ่งที่เห็น</th><th>เป็นปัจจัยอะไร</th><th>ผลตอบแทนไปหาใคร</th></tr>
<tr><td>ที่หน้าปากซอย</td><td>ที่ดิน</td><td>ค่าเช่า → เจ้าของที่</td></tr>
<tr><td>น้องที่จ้างมา</td><td>แรงงาน</td><td>ค่าจ้าง 300 บาท → น้อง</td></tr>
<tr><td>รถเข็นและเตา</td><td>ทุน</td><td>ดอกเบี้ย → ธนาคาร</td></tr>
<tr><td>สมชายที่ตัดสินใจเปิดร้าน</td><td>ผู้ประกอบการ</td><td>กำไรที่เหลือ → สมชาย</td></tr></table>` },

    { type: "h2", text: "1.4 ผู้บริโภค การกระจาย และการแลกเปลี่ยน" },
    { type: "p", html: "ผู้บริโภคที่ฉลาดต้องตัดสินใจจาก<b>ข้อมูล</b> ไม่ใช่จากโฆษณาอย่างเดียว และต้องรู้ว่าตัวเองมี<b>สิทธิ</b>อะไรบ้างเมื่อถูกเอาเปรียบ",
      detail: `<h3>สิทธิของผู้บริโภคและการตัดสินใจซื้อ</h3>
<h4>สิทธิพื้นฐานของผู้บริโภคไทย 5 ข้อ</h4>
<table><tr><th>สิทธิ</th><th>หมายความว่า</th></tr>
<tr><td>ได้รับข่าวสารที่ถูกต้อง</td><td>ฉลากต้องบอกส่วนประกอบ วันหมดอายุ ราคา ตามจริง</td></tr>
<tr><td>เลือกซื้อได้อย่างอิสระ</td><td>ไม่ถูกบังคับให้ซื้อพ่วง หรือถูกหลอกให้เซ็นสัญญา</td></tr>
<tr><td>ได้รับความปลอดภัย</td><td>สินค้าต้องไม่เป็นอันตรายเมื่อใช้ตามปกติ</td></tr>
<tr><td>ได้รับความเป็นธรรมในสัญญา</td><td>สัญญาต้องไม่เอาเปรียบฝ่ายเดียว</td></tr>
<tr><td>ได้รับการชดเชยความเสียหาย</td><td>ร้องเรียนและเรียกค่าเสียหายได้เมื่อของมีปัญหา</td></tr></table>
<div class="box tip"><b>หน่วยงานที่ดูแล</b> สำนักงานคณะกรรมการคุ้มครองผู้บริโภค (สคบ.) และ อย. สำหรับอาหารและยา</div>
<h4>ตัดสินใจซื้ออย่างมีเหตุผล</h4>
<div class="box"><b>ถามตัวเอง 4 ข้อก่อนจ่าย</b><br>① จำเป็น หรือแค่<b>อยากได้</b> ② ราคาที่อื่นเท่าไร ③ คุณภาพเทียบกับราคาคุ้มไหม ④ ถ้าซื้ออันนี้ ต้องสละอะไร (ค่าเสียโอกาส)</div>
<h4>การกระจายรายได้</h4>
<p>รายได้ที่ธุรกิจหามาได้ถูกแบ่งกลับไปให้เจ้าของปัจจัยการผลิตทั้งสี่ — นี่คือ<b>การกระจายรายได้ขั้นแรก</b> หลังจากนั้นรัฐยัง<b>กระจายซ้ำ</b>อีกชั้นด้วยการเก็บภาษีจากคนรายได้สูงไปทำสวัสดิการให้คนรายได้น้อย</p>
<div class="box why"><b>ทำไมต้องกระจายซ้ำ</b><br>เพราะกลไกตลาดเพียงอย่างเดียวตอบคำถาม "ผลิตเพื่อใคร" ด้วย<b>กำลังซื้อ</b> — ใครมีเงินมากก็ได้ของไปมาก คนไม่มีเงินแม้จะจำเป็นก็อาจไม่ได้เลย รัฐจึงเข้ามาช่วยตรงจุดนี้</div>` },
  ];
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 2 · หน่วยและระบบเศรษฐกิจ" },

    { type: "h2", text: "2.1 ความสัมพันธ์ของหน่วยเศรษฐกิจ" },
    { type: "p", html: "หน่วยเศรษฐกิจมี 3 หน่วยหลัก — <b>ครัวเรือน · ธุรกิจ · รัฐบาล</b> โดยมี<b>ตลาด</b>เป็นที่นัดพบ ทั้งหมดเชื่อมกันเป็น<b>วงจรเศรษฐกิจ</b>",
      detail: `<h3>วงจรเศรษฐกิจ — อ่านให้เป็นแล้วตอบได้ครึ่งบท</h3>
` + SVG_FLOW + `
<h4>ใครทำอะไร</h4>
<table><tr><th>หน่วย</th><th>บทบาทในฐานะผู้ขาย</th><th>บทบาทในฐานะผู้ซื้อ</th></tr>
<tr><td><b>ครัวเรือน</b></td><td>ขายปัจจัยการผลิต (แรงงาน ที่ดิน ทุน)</td><td>ซื้อสินค้าและบริการมาบริโภค</td></tr>
<tr><td><b>ธุรกิจ</b></td><td>ขายสินค้าและบริการ</td><td>ซื้อปัจจัยการผลิตมาใช้ผลิต</td></tr>
<tr><td><b>รัฐบาล</b></td><td>ให้บริการสาธารณะ เช่น ถนน โรงเรียน</td><td>ซื้อของและจ้างคนเข้ารับราชการ</td></tr></table>
<div class="box why"><b>จุดสำคัญที่ข้อสอบชอบถาม</b><br>ครัวเรือนเป็นทั้ง<b>ผู้ขาย</b>และ<b>ผู้ซื้อ</b> — ขายแรงงานในตลาดปัจจัยการผลิต แล้วเอาเงินที่ได้ไปซื้อของในตลาดสินค้า ธุรกิจก็เช่นกันแต่สลับข้างกัน</div>
<h4>สองกระแสที่ไหลสวนทางกัน</h4>
<p>ในวงจรมีของไหลอยู่ 2 ชุดเสมอ และ<b>ไหลสวนทางกัน</b>:</p>
<div class="box"><b>กระแสของจริง (real flow)</b> — แรงงาน ที่ดิน สินค้า บริการ<br><b>กระแสเงิน (money flow)</b> — ค่าจ้าง ค่าเช่า ดอกเบี้ย เงินที่จ่ายซื้อของ</div>
<p>ถ้าธุรกิจได้แรงงานมา เงินก็ต้องไหลกลับไปหาครัวเรือนเป็นค่าจ้าง — สองกระแสนี้จึงมีขนาดเท่ากันเสมอแต่ทิศตรงข้าม</p>
<h4>รัฐเข้ามาตรงไหน</h4>
<p>รัฐไม่ได้อยู่นอกวงจร แต่แทรกอยู่ทุกจุด: <b>เก็บภาษี</b>จากทั้งครัวเรือนและธุรกิจ แล้วคืนกลับเป็น<b>สวัสดิการและบริการสาธารณะ</b> รวมถึงจ้างงานและซื้อของเองด้วย</p>` },

    { type: "h2", text: "2.2 ระบบเศรษฐกิจ" },
    { type: "table", rows: [
      ["เกณฑ์", "ทุนนิยม", "สังคมนิยม", "แบบผสม"],
      ["เจ้าของปัจจัยการผลิต", "เอกชน", "รัฐ", "เอกชนเป็นหลัก รัฐถือบางส่วน"],
      ["ใครตัดสินใจผลิต", "กลไกราคา", "รัฐวางแผนจากส่วนกลาง", "กลไกราคาเป็นหลัก รัฐกำกับ"],
      ["เสรีภาพของประชาชน", "สูง", "ต่ำ", "ปานกลางถึงสูง"],
      ["ข้อดี", "มีประสิทธิภาพ แข่งขันทำให้พัฒนา", "ความเหลื่อมล้ำน้อยกว่า", "ได้ข้อดีของทั้งสองฝั่ง"],
      ["ข้อจำกัด", "เหลื่อมล้ำสูง ผูกขาดได้", "ขาดแรงจูงใจ ปรับตัวช้า", "เส้นแบ่งบทบาทรัฐไม่ชัด"]
    ], detail: `<h3>ระบบเศรษฐกิจ — ต่างกันที่ "ใครตัดสินใจ"</h3>
` + SVG_SYSTEMS + `
<h4>ระบบเศรษฐกิจแบบดั้งเดิม</h4>
<p>หนังสือบางเล่มนับเป็นระบบที่ 4 — ผลิตตามที่<b>บรรพบุรุษเคยทำ</b> พึ่งพาตนเอง แลกเปลี่ยนกันเองในชุมชน ปัจจุบันเหลือน้อยมาก พบในชุมชนห่างไกล</p>
<h4>ทุนนิยมทำงานอย่างไรถ้าไม่มีใครสั่ง</h4>
<div class="box why"><b>"มือที่มองไม่เห็น"</b><br>อดัม สมิธ อธิบายว่าเมื่อแต่ละคนทำเพื่อประโยชน์ตัวเอง ผลรวมกลับทำให้สังคมได้ของที่ต้องการ — คนขายขนมปังไม่ได้ตื่นมาตีสี่เพราะรักเพื่อนมนุษย์ แต่เพราะอยากได้กำไร และผลคือทุกคนมีขนมปังกิน <b>ราคา</b>คือสัญญาณที่บอกว่าควรผลิตอะไรมากขึ้นหรือน้อยลง</div>
<h4>ทำไมสังคมนิยมเต็มรูปแบบถึงติดปัญหา</h4>
<p>เมื่อรัฐวางแผนทั้งหมด ต้องรู้ข้อมูลมหาศาลว่าใครต้องการอะไรเท่าไร ซึ่งทำได้ยากมาก และเมื่อผลตอบแทนเท่ากันหมดไม่ว่าจะขยันแค่ไหน <b>แรงจูงใจในการพัฒนาก็หายไป</b></p>
<div class="box warn"><b>ระวังตอนยกตัวอย่างประเทศ</b><br>อย่าจับคู่แบบตายตัวว่า "สหรัฐ = ทุนนิยมบริสุทธิ์" หรือ "จีน = สังคมนิยมบริสุทธิ์" ของจริงทุกประเทศเป็น<b>แบบผสม</b>ที่ต่างกันแค่สัดส่วน สหรัฐก็มีสวัสดิการและกฎหมายกำกับ จีนก็มีเอกชนขนาดใหญ่</div>
<div class="box tip"><b>ไทยอยู่ตรงไหน</b> ระบบผสมที่เอกชนเป็นหลัก รัฐดูแลโครงสร้างพื้นฐานและรัฐวิสาหกิจบางส่วน เช่น ไฟฟ้า ประปา รถไฟ</div>` },
    { type: "bullet", html: "จำ 3 เกณฑ์เทียบระบบ: <b>ใครเป็นเจ้าของ · ใครตัดสินใจ · เสรีภาพแค่ไหน</b>" },
    { type: "bullet", html: "ของจริงแทบไม่มีระบบบริสุทธิ์ — เกือบทุกประเทศเป็น<b>แบบผสม</b>" },

    { type: "divider" },
    { type: "h1", text: "บทที่ 3 · ตลาดและการกำหนดราคา" },

    { type: "h2", text: "3.1 ตลาดในระบบเศรษฐกิจ" },
    { type: "p", html: "<b>ตลาด</b> ในทางเศรษฐศาสตร์ไม่ได้แปลว่าสถานที่ — แต่หมายถึง<b>การที่ผู้ซื้อกับผู้ขายติดต่อกันจนเกิดการซื้อขาย</b> จะเจอกันกลางตลาดสดหรือคุยกันผ่านแอปก็นับเป็นตลาดทั้งนั้น",
      detail: `<h3>ตลาดและการจัดประเภท</h3>
` + SVG_MARKETS + `
<h4>แบ่งตามระดับการแข่งขัน (ที่ออกสอบบ่อยที่สุด)</h4>
<table><tr><th>ประเภท</th><th>จำนวนผู้ขาย</th><th>ลักษณะสินค้า</th><th>อำนาจตั้งราคา</th><th>ตัวอย่าง</th></tr>
<tr><td>แข่งขันสมบูรณ์</td><td>มากราย</td><td>เหมือนกันทุกประการ</td><td>ไม่มีเลย (ผู้รับราคา)</td><td>ข้าวเปลือก ยางแผ่น</td></tr>
<tr><td>กึ่งแข่งขันกึ่งผูกขาด</td><td>มากราย</td><td>ต่างกันเล็กน้อย</td><td>มีบ้าง</td><td>ร้านกาแฟ สบู่ ยาสีฟัน</td></tr>
<tr><td>ผู้ขายน้อยราย</td><td>ไม่กี่ราย</td><td>เหมือนหรือต่างก็ได้</td><td>ค่อนข้างมาก</td><td>ค่ายมือถือ สายการบิน</td></tr>
<tr><td>ผูกขาด</td><td>รายเดียว</td><td>ไม่มีของทดแทนใกล้เคียง</td><td>มากที่สุด</td><td>น้ำประปา ไฟฟ้า</td></tr></table>
<h4>แบ่งแบบอื่นที่ควรรู้</h4>
<div class="box"><b>ตามชนิดของสิ่งที่ซื้อขาย</b> — ตลาดสินค้าและบริการ กับ ตลาดปัจจัยการผลิต (เช่น ตลาดแรงงาน)<br><b>ตามระดับการจำหน่าย</b> — ตลาดขายส่ง กับ ตลาดขายปลีก</div>
<h4>หน้าที่ของตลาด</h4>
<p>① เชื่อมผู้ซื้อกับผู้ขายให้เจอกัน ② <b>กำหนดราคา</b>ผ่านการต่อรองระหว่างอุปสงค์กับอุปทาน ③ ส่งสัญญาณว่าควรผลิตอะไรเพิ่มหรือลด ④ จัดสรรสินค้าไปยังคนที่ยอมจ่ายในราคานั้น</p>
<div class="box warn"><b>ตลาดล้มเหลว (market failure)</b><br>บางกรณีกลไกตลาดจัดสรรได้ไม่ดี เช่น สินค้าสาธารณะ (ถนน ไฟทาง) ที่ไม่มีเอกชนอยากผลิตเพราะเก็บเงินยาก หรือผลกระทบภายนอก เช่น โรงงานปล่อยน้ำเสีย — จุดนี้รัฐจึงต้องเข้ามา</div>` },
  ]);
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "h2", text: "3.2 อุปสงค์และอุปทาน" },
    { type: "p", html: "<b>อุปสงค์ (Demand)</b> = ปริมาณที่<b>ผู้บริโภค</b>เต็มใจซื้อ<b>และ</b>มีกำลังซื้อจริง ณ ราคาหนึ่ง · <b>อุปทาน (Supply)</b> = ปริมาณที่<b>ผู้ผลิต</b>เต็มใจขาย<b>และ</b>ผลิตได้จริง ณ ราคาหนึ่ง",
      detail: `<h3>อุปสงค์ — กฎและเส้นกราฟ</h3>
` + SVG_DEMAND + `
<div class="box warn"><b>ต้องครบสองอย่างถึงจะนับ</b><br>"อยากได้รถสปอร์ตแต่ไม่มีเงิน" <b>ไม่ใช่</b>อุปสงค์ เพราะขาดกำลังซื้อ — คำว่าเต็มใจอย่างเดียวไม่พอ</div>
<p class="frm">กฎของอุปสงค์: ราคาสูงขึ้น → ปริมาณซื้อลดลง &nbsp;·&nbsp; ราคาต่ำลง → ปริมาณซื้อเพิ่มขึ้น (แปรผกผัน)</p>
<h4>ทำไมเส้นอุปสงค์ถึงลาดลง</h4>
<div class="box why">① <b>ผลทางรายได้</b> — ของถูกลงเท่ากับเงินในกระเป๋ามีอำนาจซื้อมากขึ้น จึงซื้อได้มากขึ้น<br>② <b>ผลการทดแทน</b> — ของถูกลงเมื่อเทียบกับของอื่น คนจึงหันมาซื้ออันนี้แทน<br>③ <b>อรรถประโยชน์ส่วนเพิ่มลดลง</b> — ชิ้นที่สองอร่อยน้อยกว่าชิ้นแรก จึงยอมจ่ายน้อยลงสำหรับชิ้นถัดไป</div>
<h3>อุปทาน — กฎและเส้นกราฟ</h3>
` + SVG_SUPPLY + `
<p class="frm">กฎของอุปทาน: ราคาสูงขึ้น → ปริมาณขายเพิ่มขึ้น &nbsp;·&nbsp; ราคาต่ำลง → ปริมาณขายลดลง (แปรผันตาม)</p>
<div class="box why"><b>ทำไมเส้นอุปทานถึงชันขึ้น</b><br>ราคาสูงแปลว่ากำไรต่อชิ้นสูงขึ้น ผู้ผลิตจึงอยากผลิตมากขึ้น และคุ้มที่จะดึงทรัพยากรจากงานอื่นมาผลิตสินค้านี้ รวมถึงจูงใจให้รายใหม่เข้ามาขายด้วย</div>` },

    { type: "p", html: "จุดที่พลาดกันมากที่สุดคือ <b>การเคลื่อนบนเส้น</b> กับ <b>การเลื่อนทั้งเส้น</b> — สองคำนี้คนละเรื่องกันและข้อสอบถามแทบทุกปี",
      detail: `<h3>เคลื่อนบนเส้น ≠ เลื่อนทั้งเส้น</h3>
` + SVG_MOVE + `
<table><tr><th></th><th>เคลื่อนบนเส้นเดิม</th><th>เลื่อนทั้งเส้น</th></tr>
<tr><td>เกิดจาก</td><td><b>ราคาของสินค้านั้นเอง</b>เปลี่ยน</td><td><b>ปัจจัยอื่น</b>เปลี่ยน</td></tr>
<tr><td>เรียกว่า</td><td>การเปลี่ยนแปลง<b>ปริมาณ</b>อุปสงค์/อุปทาน</td><td>การเปลี่ยนแปลง<b>อุปสงค์/อุปทาน</b></td></tr>
<tr><td>บนกราฟ</td><td>จุดขยับไปตามเส้นเดิม</td><td>เส้นทั้งเส้นขยับซ้ายหรือขวา</td></tr></table>
<h4>ปัจจัยที่ทำให้เส้นอุปสงค์เลื่อนทั้งเส้น</h4>
<table><tr><th>ปัจจัย</th><th>เพิ่มขึ้นแล้วเกิดอะไร</th></tr>
<tr><td>รายได้ผู้บริโภค</td><td>สินค้าปกติ: อุปสงค์เพิ่ม (เลื่อนขวา) · สินค้าด้อย เช่น มาม่า: อุปสงค์ลด</td></tr>
<tr><td>ราคาสินค้าทดแทน (เช่น หมู–ไก่)</td><td>หมูแพงขึ้น → อุปสงค์ไก่เพิ่ม</td></tr>
<tr><td>ราคาสินค้าประกอบ (เช่น รถ–น้ำมัน)</td><td>น้ำมันแพงขึ้น → อุปสงค์รถลด</td></tr>
<tr><td>รสนิยม / กระแส</td><td>ของกำลังฮิต → อุปสงค์เพิ่ม</td></tr>
<tr><td>จำนวนผู้ซื้อในตลาด</td><td>คนมากขึ้น → อุปสงค์เพิ่ม</td></tr>
<tr><td>การคาดการณ์ราคาอนาคต</td><td>คิดว่าพรุ่งนี้จะแพงขึ้น → รีบซื้อวันนี้ อุปสงค์วันนี้เพิ่ม</td></tr></table>
<h4>ปัจจัยที่ทำให้เส้นอุปทานเลื่อนทั้งเส้น</h4>
<table><tr><th>ปัจจัย</th><th>เพิ่มขึ้นแล้วเกิดอะไร</th></tr>
<tr><td>ต้นทุนการผลิต (ค่าแรง วัตถุดิบ)</td><td>ต้นทุนสูงขึ้น → อุปทานลด (เลื่อนซ้าย)</td></tr>
<tr><td>เทคโนโลยี</td><td>ดีขึ้น ผลิตได้มากขึ้นด้วยต้นทุนเท่าเดิม → อุปทานเพิ่ม</td></tr>
<tr><td>จำนวนผู้ขาย</td><td>รายใหม่เข้ามา → อุปทานเพิ่ม</td></tr>
<tr><td>ภาษี / เงินอุดหนุนจากรัฐ</td><td>เก็บภาษีเพิ่ม → อุปทานลด · ให้เงินอุดหนุน → อุปทานเพิ่ม</td></tr>
<tr><td>ภัยธรรมชาติ / ดินฟ้าอากาศ</td><td>น้ำท่วมนาข้าว → อุปทานข้าวลด</td></tr>
<tr><td>การคาดการณ์ราคาอนาคต</td><td>คิดว่าราคาจะขึ้น → เก็บของไว้ขายทีหลัง อุปทานวันนี้ลด</td></tr></table>
<div class="box tip"><b>เช็กเร็ว 1 วินาที</b> โจทย์พูดถึง<b>ราคาของสินค้าตัวนั้นเอง</b>ไหม? ถ้าใช่ = เคลื่อนบนเส้น · ถ้าเป็นอย่างอื่นทั้งหมด = เลื่อนทั้งเส้น</div>` },
    { type: "bullet", html: "อุปสงค์ต้องมีครบทั้ง <b>ความเต็มใจซื้อ</b> และ <b>กำลังซื้อ</b>" },
    { type: "bullet", html: "เส้นอุปสงค์<b>ลาดลง</b> · เส้นอุปทาน<b>ชันขึ้น</b>" },
    { type: "bullet", html: "ราคาสินค้านั้นเปลี่ยน = <b>เคลื่อนบนเส้น</b> · ปัจจัยอื่นเปลี่ยน = <b>เลื่อนทั้งเส้น</b>" },

    { type: "h2", text: "3.3 ดุลยภาพตลาดและการอ่านกราฟ" },
    { type: "p", html: "<b>ดุลยภาพ</b> คือจุดที่เส้นอุปสงค์ตัดกับเส้นอุปทาน — ปริมาณที่คนอยากซื้อ<b>เท่ากับ</b>ปริมาณที่คนอยากขายพอดี ได้เป็น<b>ราคาดุลยภาพ (P*)</b> และ<b>ปริมาณดุลยภาพ (Q*)</b>",
      detail: `<h3>ดุลยภาพ · ของล้น · ของขาด</h3>
` + SVG_EQ + `
<h4>ทำไมราคาถึงวิ่งกลับมาที่ดุลยภาพเอง</h4>
<table><tr><th>สถานการณ์</th><th>เกิดอะไร</th><th>ตลาดแก้ตัวเองอย่างไร</th></tr>
<tr><td>ราคา<b>สูงกว่า</b>ดุลยภาพ</td><td>คนขายอยากขายเยอะ คนซื้อน้อย → <b>อุปทานส่วนเกิน</b> (ของล้นตลาด)</td><td>ผู้ขายแข่งกันลดราคา ราคาไหลลงมาที่ E</td></tr>
<tr><td>ราคา<b>ต่ำกว่า</b>ดุลยภาพ</td><td>คนซื้ออยากซื้อเยอะ ของมีน้อย → <b>อุปสงค์ส่วนเกิน</b> (ของขาดตลาด)</td><td>ผู้ซื้อแย่งกันจนยอมจ่ายแพงขึ้น ราคาถูกดันขึ้นไปที่ E</td></tr></table>
<div class="box tip"><b>วิธีจำ</b> ส่วนเกินชื่อตามฝั่งที่<b>เหลือเฟือ</b> — ของล้น = อุปทานส่วนเกิน · ของขาด = อุปสงค์ส่วนเกิน</div>
<h4>คำนวณดุลยภาพจากสมการ</h4>
<p class="frm">Qd = 100 − P &nbsp;และ&nbsp; Qs = P − 20 &nbsp;→&nbsp; ตั้ง Qd = Qs</p>
<p>100 − P = P − 20 → 120 = 2P → <b>P* = 60</b> แล้วแทนกลับได้ <b>Q* = 40</b> ตรวจสองเส้นให้ได้ค่าเท่ากันเสมอ</p>
<h4>ลำดับการอ่านโจทย์กราฟให้ไม่พลาด</h4>
<div class="box">① โจทย์กระทบ<b>ฝั่งไหน</b> — ผู้ซื้อ (D) หรือผู้ผลิต (S)<br>② กระทบแล้ว<b>เพิ่มหรือลด</b> — เลื่อนขวาหรือซ้าย<br>③ วาดเส้นใหม่แล้ว<b>หาจุดตัดใหม่</b><br>④ เทียบ E ใหม่กับ E เดิม ทั้ง<b>ราคา</b>และ<b>ปริมาณ</b><br>⑤ อ่านให้ตรงคำถามว่าเขาถาม<b>ราคา</b>หรือ<b>ปริมาณ</b></div>
<div class="box warn"><b>ข้อผิดพลาดที่เสียคะแนนบ่อย</b><br>• สลับแกน — แกนตั้งคือ<b>ราคา</b> แกนนอนคือ<b>ปริมาณ</b> เสมอ<br>• เลื่อนเส้นผิดฝั่ง เช่น ค่าแรงขึ้นแล้วไปเลื่อนเส้น D ทั้งที่ค่าแรงเป็นต้นทุนของ<b>ผู้ผลิต</b><br>• ตอบแค่อย่างเดียวทั้งที่โจทย์ถามทั้งราคาและปริมาณ</div>` },

    { type: "p", html: "เมื่อรัฐไม่พอใจราคาดุลยภาพ รัฐจะ<b>แทรกแซงราคา</b> ซึ่งมีสองแบบและให้ผลข้างเคียงคนละทาง",
      detail: `<h3>การแทรกแซงราคาของรัฐ</h3>
<h4>① ราคาขั้นสูง (เพดานราคา)</h4>
` + SVG_CEILING + `
<p>รัฐห้ามขายเกินราคาที่กำหนด ใช้ตอนของแพงจนผู้บริโภคเดือดร้อน · <b>ต้องกำหนดต่ำกว่าราคาดุลยภาพจึงจะมีผล</b> ถ้ากำหนดสูงกว่าดุลยภาพจะไม่เกิดอะไรเลย เพราะตลาดขายอยู่ต่ำกว่านั้นอยู่แล้ว</p>
<div class="box warn"><b>ผลข้างเคียง</b> ของขาดตลาด → ต้องเข้าคิว ปันส่วน จับสลาก และมักเกิด<b>ตลาดมืด</b>ที่ขายแพงกว่าเพดาน</div>
<h4>② ราคาขั้นต่ำ (ราคาประกัน)</h4>
` + SVG_FLOOR + `
<p>รัฐห้ามซื้อต่ำกว่าราคาที่กำหนด ใช้ตอนของถูกจนผู้ผลิตอยู่ไม่ได้ · <b>ต้องกำหนดสูงกว่าราคาดุลยภาพจึงจะมีผล</b></p>
<div class="box warn"><b>ผลข้างเคียง</b> ของล้นตลาด รัฐมักต้องรับซื้อส่วนเกินไปเก็บเอง · ถ้าเป็นค่าจ้างขั้นต่ำ ผลข้างเคียงคือแรงงานบางส่วนอาจ<b>ว่างงาน</b>เพราะนายจ้างจ้างน้อยลง</div>
<div class="box tip"><b>จำสั้น ๆ</b> เพดานอยู่<b>ต่ำ</b>กว่าดุลยภาพ ช่วย<b>ผู้ซื้อ</b> ทำให้ของ<b>ขาด</b> · ขั้นต่ำอยู่<b>สูง</b>กว่าดุลยภาพ ช่วย<b>ผู้ขาย</b> ทำให้ของ<b>ล้น</b></div>` },
  ]);
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 4 · คลังกราฟ 12 กรณี" },
    { type: "callout", html: "ส่วนนี้คือส่วนที่ต้องฝึกหนักที่สุด — เมื่อ<b>เส้นทั้งสองขยับพร้อมกัน</b> จะมีอย่างหนึ่งที่ตอบได้แน่นอน และอีกอย่างที่<b>ตอบไม่ได้ถ้าไม่รู้ว่าใครแรงกว่า</b> ทุกกรณีมีรูปกราฟที่คำนวณจุดตัดจริง กดที่หัวข้อเพื่อดูรูปได้เลย" },

    { type: "h2", text: "4.1 กฎ 2 ข้อที่ทำให้ไม่ต้องท่อง 12 กรณี" },
    { type: "p", html: "ไม่ต้องจำ 12 กรณีทีละอัน — จำแค่ว่า <b>แรงไหนไปทางเดียวกัน อันนั้นตอบได้แน่</b> ส่วน<b>แรงที่สวนกัน ต้องดูว่าใครแรงกว่า</b>",
      detail: `<h3>คิดทีละสองชั้น จบทุกข้อ</h3>
<h4>ชั้นที่ 1 — หาอันที่ตอบได้แน่นอน</h4>
<table><tr><th>เส้นขยับแบบไหน</th><th>อะไรตอบได้แน่</th><th>เพราะ</th></tr>
<tr><td>D กับ S ไปทางเดียวกัน (ทั้งคู่เพิ่ม หรือทั้งคู่ลด)</td><td><b>ปริมาณ</b></td><td>ทั้งสองแรงดันปริมาณไปทางเดียวกัน</td></tr>
<tr><td>D กับ S ไปคนละทาง (อันเพิ่ม อันลด)</td><td><b>ราคา</b></td><td>ทั้งสองแรงดันราคาไปทางเดียวกัน</td></tr></table>
<h4>ชั้นที่ 2 — อีกอันดูว่าใครแรงกว่า</h4>
<div class="box"><b>ฝั่งที่เลื่อนมากกว่า เป็นฝ่ายชนะเสมอ</b><br>• D เลื่อนแรงกว่า → ผลออกมาตามทิศของ D<br>• S เลื่อนแรงกว่า → ผลออกมาตามทิศของ S<br>• เลื่อนเท่ากัน → <b>หักล้างกันพอดี เท่าเดิม</b></div>
<div class="box why"><b>ทิศที่แต่ละแรงดัน — จำ 4 บรรทัดนี้พอ</b><br>D เพิ่ม → ราคาขึ้น ปริมาณขึ้น<br>D ลด → ราคาลง ปริมาณลง<br>S เพิ่ม → ราคาลง ปริมาณขึ้น<br>S ลด → ราคาขึ้น ปริมาณลง</div>
<div class="box tip"><b>ลองใช้</b> โจทย์: D เพิ่ม และ S ลด เท่ากัน<br>① ไปคนละทาง → <b>ราคา</b>ตอบได้แน่ · D เพิ่มดันราคาขึ้น S ลดก็ดันราคาขึ้น → <b>ราคาสูงขึ้น</b><br>② ปริมาณ: D เพิ่มดันขึ้น S ลดดึงลง ขนาดเท่ากัน → <b>ปริมาณเท่าเดิม</b></div>` },
    { type: "bullet", html: "ไปทางเดียวกัน = <b>ปริมาณ</b>ตอบได้แน่ · ไปคนละทาง = <b>ราคา</b>ตอบได้แน่" },
    { type: "bullet", html: "อีกอันหนึ่งดูที่<b>ขนาดการเลื่อน</b> ใครแรงกว่าเป็นฝ่ายชนะ เท่ากันคือเท่าเดิม" },

    { type: "h2", text: "4.2 กลุ่มที่ 1 · อุปสงค์ลด กับ อุปทานลด" },
    { type: "p", html: "ทั้งสองเส้นเลื่อนไปทางซ้ายทั้งคู่ — <b>ปริมาณลดลงแน่นอน</b> ส่วนราคาต้องดูว่าฝั่งไหนเลื่อนแรงกว่า" },
    { type: "p", html: "<b>อุปสงค์ลด มากกว่า อุปทานลด</b> → ราคาลดลง · ปริมาณลดลง",
      detail: `<h3>อุปสงค์ลด มากกว่า อุปทานลด</h3>
` + SVG_G01 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>ลดลง</b></td><td><b>ลดลง</b></td></tr></table>
<p>ปริมาณลดแน่เพราะสองแรงดันไปทางเดียวกัน ส่วนราคาแพ้ทางฝั่ง D ที่แรงกว่า จึงลดลง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">เศรษฐกิจซบเซา คนชะลอซื้อรถยนต์กันมาก (D ลดแรง) ขณะเดียวกันโรงงานบางแห่งลดกำลังผลิตลงบ้าง (S ลดเบา)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์ลด น้อยกว่า อุปทานลด</b> → ราคาสูงขึ้น · ปริมาณลดลง",
      detail: `<h3>อุปสงค์ลด น้อยกว่า อุปทานลด</h3>
` + SVG_G02 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>สูงขึ้น</b></td><td><b>ลดลง</b></td></tr></table>
<p>ปริมาณลดแน่ ส่วนราคาแพ้ทางฝั่ง S ที่หายไปมากกว่า ราคาจึงสูงขึ้น</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">น้ำท่วมทำนาข้าวเสียหายหนัก (S ลดแรง) ส่วนคนกินข้าวน้อยลงเล็กน้อยเพราะหันไปกินอย่างอื่นบ้าง (D ลดเบา)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์ลด เท่ากับ อุปทานลด</b> → ราคาเท่าเดิม · ปริมาณลดลง",
      detail: `<h3>อุปสงค์ลด เท่ากับ อุปทานลด</h3>
` + SVG_G03 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>เท่าเดิม</b></td><td><b>ลดลง</b></td></tr></table>
<p>สองแรงกดราคาคนละทางด้วยขนาดเท่ากัน จึงหักล้างกันพอดี เหลือแค่ปริมาณที่ลดลง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">โรคระบาดทำให้คนออกจากบ้านน้อยลง ร้านอาหารขายได้น้อยลง (D ลด) และร้านหลายแห่งปิดกิจการไปพอ ๆ กัน (S ลดเท่ากัน)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },

    { type: "h2", text: "4.3 กลุ่มที่ 2 · อุปสงค์ลด กับ อุปทานเพิ่ม" },
    { type: "p", html: "สองเส้นสวนทางกัน แต่ทั้งคู่กดราคาลง — <b>ราคาลดลงแน่นอน</b> ส่วนปริมาณต้องดูว่าฝั่งไหนแรงกว่า" },
    { type: "p", html: "<b>อุปสงค์ลด มากกว่า อุปทานเพิ่ม</b> → ราคาลดลง · ปริมาณลดลง",
      detail: `<h3>อุปสงค์ลด มากกว่า อุปทานเพิ่ม</h3>
` + SVG_G04 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>ลดลง</b></td><td><b>ลดลง</b></td></tr></table>
<p>ราคาลดแน่เพราะสองแรงกดราคาลงทั้งคู่ ส่วนปริมาณแพ้ทางฝั่ง D ที่หดแรงกว่า จึงลดลง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">กระแสความนิยมสินค้าตัวหนึ่งหายไปเกือบหมด (D ลดแรง) แต่โรงงานเพิ่งลงทุนเครื่องจักรใหม่ผลิตได้ถูกลง (S เพิ่มเบา)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์ลด น้อยกว่า อุปทานเพิ่ม</b> → ราคาลดลง · ปริมาณสูงขึ้น",
      detail: `<h3>อุปสงค์ลด น้อยกว่า อุปทานเพิ่ม</h3>
` + SVG_G05 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>ลดลง</b></td><td><b>สูงขึ้น</b></td></tr></table>
<p>ราคาลดแน่ ส่วนปริมาณชนะโดยฝั่ง S ที่ทะลักเข้ามามากกว่า ปริมาณซื้อขายจึงเพิ่มขึ้น</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">เทคโนโลยีใหม่ทำให้ผลิตแผงโซลาร์ได้มากขึ้นมาก (S เพิ่มแรง) ขณะที่คนซื้อลดลงเล็กน้อยตามฤดูกาล (D ลดเบา)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์ลด เท่ากับ อุปทานเพิ่ม</b> → ราคาลดลง · ปริมาณเท่าเดิม",
      detail: `<h3>อุปสงค์ลด เท่ากับ อุปทานเพิ่ม</h3>
` + SVG_G06 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>ลดลง</b></td><td><b>เท่าเดิม</b></td></tr></table>
<p>สองแรงดึงปริมาณคนละทางเท่า ๆ กันจึงหักล้างพอดี เหลือแต่ราคาที่ถูกกดลงทั้งสองทาง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">คนหันไปใช้สินค้าทดแทนพอดีกับที่ผู้ผลิตรายใหม่เข้าตลาดเพิ่มขึ้นในขนาดเท่ากัน</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },

    { type: "h2", text: "4.4 กลุ่มที่ 3 · อุปสงค์เพิ่ม กับ อุปทานเพิ่ม" },
    { type: "p", html: "ทั้งสองเส้นเลื่อนไปทางขวาทั้งคู่ — <b>ปริมาณเพิ่มขึ้นแน่นอน</b> ส่วนราคาต้องดูว่าฝั่งไหนแรงกว่า" },
    { type: "p", html: "<b>อุปสงค์เพิ่ม มากกว่า อุปทานเพิ่ม</b> → ราคาสูงขึ้น · ปริมาณสูงขึ้น",
      detail: `<h3>อุปสงค์เพิ่ม มากกว่า อุปทานเพิ่ม</h3>
` + SVG_G07 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>สูงขึ้น</b></td><td><b>สูงขึ้น</b></td></tr></table>
<p>ปริมาณเพิ่มแน่ ส่วนราคาแพ้ทางฝั่ง D ที่มาแรงกว่า ราคาจึงสูงขึ้น</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">ใกล้เทศกาลคนแห่ซื้อของขวัญ (D เพิ่มแรง) ร้านค้าสั่งของเข้ามาเพิ่มได้บ้างแต่ไม่ทัน (S เพิ่มเบา)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์เพิ่ม น้อยกว่า อุปทานเพิ่ม</b> → ราคาลดลง · ปริมาณสูงขึ้น",
      detail: `<h3>อุปสงค์เพิ่ม น้อยกว่า อุปทานเพิ่ม</h3>
` + SVG_G08 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>ลดลง</b></td><td><b>สูงขึ้น</b></td></tr></table>
<p>ปริมาณเพิ่มแน่ ส่วนราคาถูกฝั่ง S กดลงแรงกว่าที่ D ดันขึ้น ราคาจึงลดลง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">คนซื้อทีวีเพิ่มขึ้นเล็กน้อย (D เพิ่มเบา) แต่โรงงานจีนเข้ามาตีตลาดผลิตล้นมาก (S เพิ่มแรง)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์เพิ่ม เท่ากับ อุปทานเพิ่ม</b> → ราคาเท่าเดิม · ปริมาณสูงขึ้น",
      detail: `<h3>อุปสงค์เพิ่ม เท่ากับ อุปทานเพิ่ม</h3>
` + SVG_G09 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>เท่าเดิม</b></td><td><b>สูงขึ้น</b></td></tr></table>
<p>สองแรงดันราคาคนละทางเท่ากันจึงหักล้างพอดี เหลือแต่ปริมาณที่เพิ่มขึ้นทั้งสองทาง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">ประชากรในเมืองเพิ่มขึ้น คนอยากเช่าห้องมากขึ้น พอดีกับที่มีคอนโดสร้างเสร็จเพิ่มในขนาดเท่ากัน</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },

    { type: "h2", text: "4.5 กลุ่มที่ 4 · อุปสงค์เพิ่ม กับ อุปทานลด" },
    { type: "p", html: "สองเส้นสวนทางกัน แต่ทั้งคู่ดันราคาขึ้น — <b>ราคาสูงขึ้นแน่นอน</b> ส่วนปริมาณต้องดูว่าฝั่งไหนแรงกว่า" },
    { type: "p", html: "<b>อุปสงค์เพิ่ม เท่ากับ อุปทานลด</b> → ราคาสูงขึ้น · ปริมาณเท่าเดิม",
      detail: `<h3>อุปสงค์เพิ่ม เท่ากับ อุปทานลด</h3>
` + SVG_G10 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>สูงขึ้น</b></td><td><b>เท่าเดิม</b></td></tr></table>
<p>สองแรงดึงปริมาณคนละทางเท่ากันจึงหักล้างพอดี เหลือแต่ราคาที่ถูกดันขึ้นทั้งสองทาง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">อากาศร้อนจัดคนอยากกินน้ำแข็งมากขึ้น พอดีกับที่โรงน้ำแข็งบางแห่งหยุดซ่อมเครื่องในขนาดเท่ากัน</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์เพิ่ม มากกว่า อุปทานลด</b> → ราคาสูงขึ้น · ปริมาณสูงขึ้น",
      detail: `<h3>อุปสงค์เพิ่ม มากกว่า อุปทานลด</h3>
` + SVG_G11 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>สูงขึ้น</b></td><td><b>สูงขึ้น</b></td></tr></table>
<p>ราคาสูงขึ้นแน่เพราะสองแรงดันราคาขึ้นทั้งคู่ ส่วนปริมาณชนะโดยฝั่ง D ที่มาแรงกว่า จึงเพิ่มขึ้น</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">กระแสสุขภาพทำให้คนซื้อผักออร์แกนิกเพิ่มขึ้นมาก (D เพิ่มแรง) ขณะที่เกษตรกรบางรายเลิกปลูกไปบ้าง (S ลดเบา)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },
    { type: "p", html: "<b>อุปสงค์เพิ่ม น้อยกว่า อุปทานลด</b> → ราคาสูงขึ้น · ปริมาณลดลง",
      detail: `<h3>อุปสงค์เพิ่ม น้อยกว่า อุปทานลด</h3>
` + SVG_G12 + `
<h4>ผลที่เกิดขึ้น</h4>
<table><tr><th>ราคาดุลยภาพ</th><th>ปริมาณดุลยภาพ</th></tr><tr><td><b>สูงขึ้น</b></td><td><b>ลดลง</b></td></tr></table>
<p>ราคาสูงขึ้นแน่ ส่วนปริมาณแพ้ทางฝั่ง S ที่หายไปมากกว่า ปริมาณซื้อขายจึงลดลง</p>
<h4>ตัวอย่างสถานการณ์จริง</h4>
<div class="box">คนอยากกินหมูเพิ่มขึ้นเล็กน้อยช่วงปีใหม่ (D เพิ่มเบา) แต่โรคระบาดในหมูทำให้ผลผลิตหายไปมาก (S ลดแรง)</div>
<div class="box tip"><b>ตรวจด้วยตัวเลขในรูป</b> เส้นตั้งต้นคือ Qd = 100 − P และ Qs = P − 20 ได้ดุลยภาพที่ P* = 60, Q* = 40 · รูปนี้เลื่อนเส้นแล้วคำนวณจุดตัดใหม่จริง ไม่ได้วาดกะเอา</div>` },

    { type: "h2", text: "4.6 ตารางสรุป 12 กรณี" },
    { type: "table", rows: [
      ["กรณี", "ราคาดุลยภาพ", "ปริมาณดุลยภาพ"],
      ["อุปสงค์ลด มากกว่า อุปทานลด", "ลดลง", "ลดลง"],
      ["อุปสงค์ลด น้อยกว่า อุปทานลด", "สูงขึ้น", "ลดลง"],
      ["อุปสงค์ลด เท่ากับ อุปทานลด", "เท่าเดิม", "ลดลง"],
      ["อุปสงค์ลด มากกว่า อุปทานเพิ่ม", "ลดลง", "ลดลง"],
      ["อุปสงค์ลด น้อยกว่า อุปทานเพิ่ม", "ลดลง", "สูงขึ้น"],
      ["อุปสงค์ลด เท่ากับ อุปทานเพิ่ม", "ลดลง", "เท่าเดิม"],
      ["อุปสงค์เพิ่ม มากกว่า อุปทานเพิ่ม", "สูงขึ้น", "สูงขึ้น"],
      ["อุปสงค์เพิ่ม น้อยกว่า อุปทานเพิ่ม", "ลดลง", "สูงขึ้น"],
      ["อุปสงค์เพิ่ม เท่ากับ อุปทานเพิ่ม", "เท่าเดิม", "สูงขึ้น"],
      ["อุปสงค์เพิ่ม เท่ากับ อุปทานลด", "สูงขึ้น", "เท่าเดิม"],
      ["อุปสงค์เพิ่ม มากกว่า อุปทานลด", "สูงขึ้น", "สูงขึ้น"],
      ["อุปสงค์เพิ่ม น้อยกว่า อุปทานลด", "สูงขึ้น", "ลดลง"]
    ], detail: `<h3>ตารางสรุปและวิธีตรวจคำตอบ</h3>
<h4>อ่านตารางนี้เป็นแพตเทิร์น</h4>
<table><tr><th>กลุ่ม</th><th>ตอบได้แน่</th><th>ต้องดูขนาด</th></tr>
<tr><td>D ลด + S ลด</td><td>ปริมาณ<b>ลด</b>เสมอ</td><td>ราคา</td></tr>
<tr><td>D เพิ่ม + S เพิ่ม</td><td>ปริมาณ<b>เพิ่ม</b>เสมอ</td><td>ราคา</td></tr>
<tr><td>D ลด + S เพิ่ม</td><td>ราคา<b>ลด</b>เสมอ</td><td>ปริมาณ</td></tr>
<tr><td>D เพิ่ม + S ลด</td><td>ราคา<b>เพิ่ม</b>เสมอ</td><td>ปริมาณ</td></tr></table>
<div class="box tip"><b>ตรวจคำตอบตัวเอง</b> ถ้าตอบว่า "ทั้งราคาและปริมาณเปลี่ยนแน่นอน" ทั้งที่โจทย์ไม่ได้บอกขนาดการเลื่อน แปลว่าตอบเกินจริง — ต้องมีอย่างหนึ่งที่<b>สรุปไม่ได้</b></div>
<div class="box warn"><b>ข้อสอบชอบหลอกแบบนี้</b><br>โจทย์บอกแค่ "อุปสงค์เพิ่มและอุปทานเพิ่ม" แล้วถามราคา — คำตอบที่ถูกคือ <b>สรุปไม่ได้ ขึ้นกับว่าฝั่งไหนเลื่อนมากกว่า</b> ไม่ใช่เดาว่าขึ้นหรือลง</div>` },
  ]);

  /* ============================================================
     โน้ตไดอะแกรม (กระดาน)
     ============================================================ */
  STARTER_DIAGRAM[ID] = [
    { id: "ttl", t: "x", x: 40, y: 20, w: 760, html: "เศรษฐศาสตร์ — แผนที่ทั้งวิชา", size: 34, bold: true, c: "auto" },
    { id: "lb1", t: "x", x: 60, y: 66, w: 250, html: "บทที่ 1 · พื้นฐาน", size: 15, bold: true, c: "#2e9e6b" },
    { id: "lb2", t: "x", x: 400, y: 66, w: 250, html: "บทที่ 2 · หน่วยและระบบ", size: 15, bold: true, c: "#3b7ddd" },
    { id: "lb3", t: "x", x: 740, y: 66, w: 250, html: "บทที่ 3 · ตลาดและราคา", size: 15, bold: true, c: "#d98324" },
    { id: "lb4", t: "x", x: 1080, y: 66, w: 250, html: "บทที่ 4 · กราฟ 12 กรณี", size: 15, bold: true, c: "#7c5cd6" },

    { id: "a0", t: "c", x: 60, y: 100, w: 250, c: "#2e9e6b",
      title: "ทำไมต้องมีวิชานี้",
      body: "ของมีจำกัด แต่ความต้องการไม่จำกัด → <b>ต้องเลือก</b>",
      detail: `<h3>จุดเริ่มต้นของทั้งวิชา</h3>` + SVG_CHOICE + `
<p>ทุกหัวข้อในวิชานี้ต่อยอดมาจากประโยคเดียว: <b>ทรัพยากรมีจำกัด ความต้องการไม่จำกัด</b></p>
<div class="box tip"><b>ลำดับที่ควรอ่าน</b> 1.1 ความขาดแคลนและค่าเสียโอกาส → 1.3 ปัจจัยการผลิต → 2.1 วงจรเศรษฐกิจ → บทที่ 3 ตลาด → บทที่ 4 กราฟ</div>` },

    { id: "a1", t: "c", x: 60, y: 280, w: 250, c: "#2e9e6b",
      title: "1.1 ปัญหาพื้นฐาน 3 ข้อ",
      body: "ผลิตอะไร · ผลิตอย่างไร · ผลิตเพื่อใคร<br>+ <b>ค่าเสียโอกาส</b>",
      detail: `<h3>ปัญหาพื้นฐานและค่าเสียโอกาส</h3>
<table><tr><th>คำถาม</th><th>ตัดสินอะไร</th></tr>
<tr><td>ผลิตอะไร</td><td>เอาทรัพยากรไปทำอะไร</td></tr>
<tr><td>ผลิตอย่างไร</td><td>ใช้คนหรือเครื่องจักร</td></tr>
<tr><td>ผลิตเพื่อใคร</td><td>ของไปถึงมือใคร</td></tr></table>
<div class="box warn"><b>ค่าเสียโอกาส</b> = มูลค่าของทางเลือก<b>ที่ดีที่สุดอันเดียว</b>ที่ไม่ได้เลือก ไม่ใช่ผลรวมของทุกอันที่สละ</div>` },

    { id: "a2", t: "c", x: 60, y: 460, w: 250, c: "#2e9e6b",
      title: "1.2 กิจกรรมทางเศรษฐกิจ",
      body: "ผลิต → กระจาย → แลกเปลี่ยน → บริโภค",
      detail: `<h3>กิจกรรมทางเศรษฐกิจ 4 ขั้น</h3>` + SVG_ACTIVITY + `
<div class="box tip">การผลิตมี 3 ขั้น: ปฐมภูมิ (เอาจากธรรมชาติ) · ทุติยภูมิ (แปรรูป) · ตติยภูมิ (บริการ)</div>` },

    { id: "a3", t: "c", x: 60, y: 640, w: 250, c: "#2e9e6b",
      title: "1.3 ปัจจัยการผลิต 4 ชนิด",
      body: "ที่ดิน→ค่าเช่า · แรงงาน→ค่าจ้าง<br>ทุน→ดอกเบี้ย · ผู้ประกอบการ→กำไร",
      detail: `<h3>ปัจจัยการผลิตและผลตอบแทน</h3>` + SVG_FACTORS + `
<div class="box why"><b>ทำไมผู้ประกอบการได้กำไร</b> เพราะอีกสามฝ่ายได้ผลตอบแทนที่ตกลงไว้ล่วงหน้า ส่วนผู้ประกอบการได้เศษที่เหลือ ซึ่งติดลบก็ได้ — เขาจึงเป็นคนแบกความเสี่ยง</div>` },

    { id: "a4", t: "c", x: 60, y: 820, w: 250, c: "#2e9e6b",
      title: "1.4 ผู้บริโภคและการกระจาย",
      body: "สิทธิผู้บริโภค 5 ข้อ · การกระจายรายได้",
      detail: `<h3>ผู้บริโภค การกระจาย การแลกเปลี่ยน</h3>
<p>สิทธิผู้บริโภค: ได้ข่าวสารถูกต้อง · เลือกอิสระ · ปลอดภัย · สัญญาเป็นธรรม · ได้ชดเชย</p>
<div class="box">การแลกเปลี่ยนพัฒนาจาก<b>ของแลกของ</b> → <b>ใช้เงินเป็นสื่อกลาง</b> → <b>เครดิตและเงินดิจิทัล</b> เพราะของแลกของติดปัญหาว่าต้องอยากได้ตรงกันพอดีทั้งสองฝ่าย</div>` },

    { id: "b0", t: "c", x: 400, y: 100, w: 250, c: "#3b7ddd",
      title: "หน่วยเศรษฐกิจ",
      body: "ครัวเรือน · ธุรกิจ · รัฐบาล — เจอกันที่<b>ตลาด</b>",
      detail: `<h3>ใครเป็นใครในระบบเศรษฐกิจ</h3>
<table><tr><th>หน่วย</th><th>ขายอะไร</th><th>ซื้ออะไร</th></tr>
<tr><td>ครัวเรือน</td><td>แรงงาน ที่ดิน ทุน</td><td>สินค้าและบริการ</td></tr>
<tr><td>ธุรกิจ</td><td>สินค้าและบริการ</td><td>ปัจจัยการผลิต</td></tr>
<tr><td>รัฐบาล</td><td>บริการสาธารณะ</td><td>ของและแรงงาน</td></tr></table>` },

    { id: "b1", t: "c", x: 400, y: 280, w: 250, c: "#3b7ddd",
      title: "2.1 วงจรเศรษฐกิจ",
      body: "ของจริงกับเงิน<b>ไหลสวนทางกัน</b>เสมอ",
      detail: `<h3>วงจรเศรษฐกิจ</h3>` + SVG_FLOW + `
<div class="box tip">ครัวเรือนเป็นทั้งผู้ขาย (ขายแรงงาน) และผู้ซื้อ (ซื้อของ) — ธุรกิจก็เช่นกันแต่สลับข้าง</div>` },

    { id: "b2", t: "c", x: 400, y: 460, w: 250, c: "#3b7ddd",
      title: "2.2 ระบบเศรษฐกิจ",
      body: "ทุนนิยม · สังคมนิยม · แบบผสม<br>ต่างกันที่<b>ใครตัดสินใจ</b>",
      detail: `<h3>เทียบ 3 ระบบด้วย 3 เกณฑ์</h3>` + SVG_SYSTEMS + `
<div class="box warn">อย่าจับคู่ประเทศแบบตายตัว ของจริงเกือบทุกประเทศเป็นแบบผสม ต่างกันแค่สัดส่วน</div>` },

    { id: "c0", t: "c", x: 740, y: 100, w: 250, c: "#d98324",
      title: "ตลาดคืออะไร",
      body: "ไม่ใช่สถานที่ แต่คือ<b>การที่ผู้ซื้อกับผู้ขายเจอกัน</b>",
      detail: `<h3>ตลาดและหน้าที่ของมัน</h3>` + SVG_MARKETS + `
<div class="box">หน้าที่ของตลาด: เชื่อมคนซื้อกับคนขาย · กำหนดราคา · ส่งสัญญาณว่าควรผลิตอะไร · จัดสรรสินค้า</div>` },

    { id: "c1", t: "c", x: 740, y: 280, w: 250, c: "#d98324",
      title: "3.2 อุปสงค์ (D)",
      body: "เต็มใจซื้อ <b>และ</b> มีเงินจ่ายไหว<br>เส้น<b>ลาดลง</b>",
      detail: `<h3>อุปสงค์</h3>` + SVG_DEMAND + `
<div class="box why">เส้นลาดลงเพราะ ① ผลทางรายได้ ② ผลการทดแทน ③ อรรถประโยชน์ส่วนเพิ่มลดลง</div>` },

    { id: "c2", t: "c", x: 740, y: 460, w: 250, c: "#d98324",
      title: "3.2 อุปทาน (S)",
      body: "เต็มใจขาย <b>และ</b> ผลิตได้จริง<br>เส้น<b>ชันขึ้น</b>",
      detail: `<h3>อุปทาน</h3>` + SVG_SUPPLY + `
<div class="box why">เส้นชันขึ้นเพราะราคาสูง = กำไรต่อชิ้นสูง จึงคุ้มที่จะดึงทรัพยากรมาผลิตเพิ่ม และดึงรายใหม่เข้าตลาด</div>` },

    { id: "c3", t: "c", x: 740, y: 640, w: 250, c: "#d98324",
      title: "เคลื่อนบนเส้น ≠ เลื่อนทั้งเส้น",
      body: "ราคาตัวเองเปลี่ยน = เดินบนเส้น<br>ปัจจัยอื่นเปลี่ยน = ทั้งเส้นขยับ",
      detail: `<h3>จุดที่พลาดบ่อยที่สุดของบทนี้</h3>` + SVG_MOVE + `
<div class="box tip"><b>เช็ก 1 วินาที</b> โจทย์พูดถึงราคาของสินค้าตัวนั้นเองไหม ถ้าใช่คือเคลื่อนบนเส้น ถ้าไม่ใช่คือเลื่อนทั้งเส้น</div>
<p>ปัจจัยที่เลื่อนเส้น D: รายได้ · ราคาสินค้าทดแทน/ประกอบ · รสนิยม · จำนวนผู้ซื้อ · การคาดการณ์<br>
ปัจจัยที่เลื่อนเส้น S: ต้นทุน · เทคโนโลยี · จำนวนผู้ขาย · ภาษี/เงินอุดหนุน · ภัยธรรมชาติ</p>` },

    { id: "c4", t: "c", x: 740, y: 820, w: 250, c: "#d98324",
      title: "3.3 ดุลยภาพ",
      body: "จุดตัด D กับ S → <b>P*</b> และ <b>Q*</b><br>ของล้น = อุปทานส่วนเกิน",
      detail: `<h3>ดุลยภาพและส่วนเกิน</h3>` + SVG_EQ + `
<p class="frm">Qd = Qs → หา P* แล้วแทนกลับหา Q*</p>
<div class="box tip">ส่วนเกินเรียกชื่อตามฝั่งที่<b>เหลือเฟือ</b> — ของล้นคืออุปทานส่วนเกิน ของขาดคืออุปสงค์ส่วนเกิน</div>` },

    { id: "c5", t: "c", x: 740, y: 1000, w: 250, c: "#d98324",
      title: "รัฐแทรกแซงราคา",
      body: "เพดานราคา → ของขาด<br>ราคาขั้นต่ำ → ของล้น",
      detail: `<h3>ราคาขั้นสูงและราคาขั้นต่ำ</h3>` + SVG_CEILING + SVG_FLOOR + `
<div class="box tip">เพดานต้องอยู่<b>ต่ำกว่า</b>ดุลยภาพจึงมีผล ช่วยผู้ซื้อ ทำให้ของขาด · ขั้นต่ำต้องอยู่<b>สูงกว่า</b>ดุลยภาพ ช่วยผู้ขาย ทำให้ของล้น</div>` },

    { id: "d0", t: "c", x: 1080, y: 100, w: 250, c: "#7c5cd6",
      title: "กฎ 2 ข้อ แทนการท่อง 12 กรณี",
      body: "ไปทางเดียวกัน → <b>ปริมาณ</b>ตอบได้แน่<br>ไปคนละทาง → <b>ราคา</b>ตอบได้แน่",
      detail: `<h3>คิดสองชั้น จบทุกข้อ</h3>
<div class="box"><b>ชั้นที่ 1</b> ดูว่าสองเส้นไปทางเดียวกันหรือสวนกัน เพื่อรู้ว่าอะไรตอบได้แน่<br><b>ชั้นที่ 2</b> อีกอันดูว่าฝั่งไหนเลื่อนแรงกว่า ฝั่งนั้นชนะ ถ้าเท่ากันคือเท่าเดิม</div>
<div class="box why"><b>ทิศที่แต่ละแรงดัน</b><br>D เพิ่ม → ราคาขึ้น ปริมาณขึ้น · D ลด → ราคาลง ปริมาณลง<br>S เพิ่ม → ราคาลง ปริมาณขึ้น · S ลด → ราคาขึ้น ปริมาณลง</div>` },

    { id: "d1", t: "c", x: 1080, y: 280, w: 250, c: "#7c5cd6",
      title: "กลุ่ม 1 · D ลด + S ลด",
      body: "ปริมาณ<b>ลด</b>แน่ · ราคาดูว่าใครแรงกว่า",
      detail: `<h3>D ลด กับ S ลด — 3 กรณี</h3>` + SVG_G01 + SVG_G02 + SVG_G03 + `
<div class="box tip">ปริมาณลดทั้งสามกรณี ต่างกันแค่ราคา: D แรงกว่า → ราคาลด · S แรงกว่า → ราคาขึ้น · เท่ากัน → ราคาเท่าเดิม</div>` },

    { id: "d2", t: "c", x: 1080, y: 460, w: 250, c: "#7c5cd6",
      title: "กลุ่ม 2 · D ลด + S เพิ่ม",
      body: "ราคา<b>ลด</b>แน่ · ปริมาณดูว่าใครแรงกว่า",
      detail: `<h3>D ลด กับ S เพิ่ม — 3 กรณี</h3>` + SVG_G04 + SVG_G05 + SVG_G06 + `
<div class="box tip">ราคาลดทั้งสามกรณี ต่างกันแค่ปริมาณ: D แรงกว่า → ปริมาณลด · S แรงกว่า → ปริมาณเพิ่ม · เท่ากัน → เท่าเดิม</div>` },

    { id: "d3", t: "c", x: 1080, y: 640, w: 250, c: "#7c5cd6",
      title: "กลุ่ม 3 · D เพิ่ม + S เพิ่ม",
      body: "ปริมาณ<b>เพิ่ม</b>แน่ · ราคาดูว่าใครแรงกว่า",
      detail: `<h3>D เพิ่ม กับ S เพิ่ม — 3 กรณี</h3>` + SVG_G07 + SVG_G08 + SVG_G09 + `
<div class="box tip">ปริมาณเพิ่มทั้งสามกรณี ต่างกันแค่ราคา: D แรงกว่า → ราคาขึ้น · S แรงกว่า → ราคาลด · เท่ากัน → เท่าเดิม</div>` },

    { id: "d4", t: "c", x: 1080, y: 820, w: 250, c: "#7c5cd6",
      title: "กลุ่ม 4 · D เพิ่ม + S ลด",
      body: "ราคา<b>ขึ้น</b>แน่ · ปริมาณดูว่าใครแรงกว่า",
      detail: `<h3>D เพิ่ม กับ S ลด — 3 กรณี</h3>` + SVG_G10 + SVG_G11 + SVG_G12 + `
<div class="box tip">ราคาขึ้นทั้งสามกรณี ต่างกันแค่ปริมาณ: D แรงกว่า → ปริมาณเพิ่ม · S แรงกว่า → ปริมาณลด · เท่ากัน → เท่าเดิม</div>` },

    { id: "d5", t: "c", x: 1080, y: 1000, w: 250, c: "#7c5cd6",
      title: "กับดักข้อสอบกราฟ",
      body: "ถ้าโจทย์ไม่บอกขนาดการเลื่อน ต้องมีอย่างหนึ่งที่<b>สรุปไม่ได้</b>",
      detail: `<h3>ตรวจคำตอบตัวเองก่อนส่ง</h3>
<div class="box warn">โจทย์บอกแค่ "D เพิ่มและ S เพิ่ม" แล้วถามราคา — คำตอบที่ถูกคือ <b>สรุปไม่ได้</b> ไม่ใช่เดาว่าขึ้นหรือลง</div>
<div class="box">① สลับแกนหรือเปล่า แกนตั้ง = ราคา แกนนอน = ปริมาณ<br>② เลื่อนถูกเส้นไหม ต้นทุนคือเรื่องของผู้ผลิต ต้องเลื่อน S ไม่ใช่ D<br>③ โจทย์ถามราคา หรือ ปริมาณ อ่านให้ตรงคำถาม</div>` },

    { id: "n1", t: "n", a: { id: "a0" }, b: { id: "a1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n2", t: "n", a: { id: "a0" }, b: { id: "a2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n3", t: "n", a: { id: "a0" }, b: { id: "a3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n4", t: "n", a: { id: "a0" }, b: { id: "a4" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n5", t: "n", a: { id: "b0" }, b: { id: "b1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n6", t: "n", a: { id: "b0" }, b: { id: "b2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n7", t: "n", a: { id: "c0" }, b: { id: "c1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n8", t: "n", a: { id: "c0" }, b: { id: "c2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n9", t: "n", a: { id: "c1" }, b: { id: "c3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n10", t: "n", a: { id: "c2" }, b: { id: "c4" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n11", t: "n", a: { id: "c4" }, b: { id: "c5" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n12", t: "n", a: { id: "d0" }, b: { id: "d1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n13", t: "n", a: { id: "d0" }, b: { id: "d2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n14", t: "n", a: { id: "d0" }, b: { id: "d3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n15", t: "n", a: { id: "d0" }, b: { id: "d4" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n16", t: "n", a: { id: "d4" }, b: { id: "d5" }, c: "auto", w: 2, arrow: "end", route: "e" },

    { id: "x1", t: "n", a: { id: "a3" }, b: { id: "b1" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x2", t: "n", a: { id: "b0" }, b: { id: "c0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x3", t: "n", a: { id: "c4" }, b: { id: "d0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x4", t: "n", a: { id: "c3" }, b: { id: "d0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 }
  ];
})();
