/* ============================================================
   content-eng.js — อังกฤษ (หลัก) : Past tenses & Future forms
   สรุปจากหัวข้อที่ Taco ส่งมา (สรุปจากรูปเรียน 1–16)
   เส้นเวลาทุกรูปวาดเป็น SVG เอง อ่านได้ทั้งโหมดสว่างและมืด
   ============================================================ */
(function () {
  const ID = "eng_main";

  const SVG_PASTSIMPLE = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="Past Simple — จบไปแล้วในอดีต"><text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">Past Simple — จบไปแล้วในอดีต</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 24 70 L 376 70"/><path d="M 368 66 L 377 70 L 368 74"/></g><path d="M 280 54 L 280 86" stroke="#e05252" stroke-width="2"/><text x="280" y="100" text-anchor="middle" font-size="10" font-weight="700" fill="#e05252">ตอนนี้</text><text x="30" y="48" font-size="10" fill="currentColor" opacity="0.7">อดีต</text><text x="370" y="48" text-anchor="end" font-size="10" fill="currentColor" opacity="0.7">อนาคต</text><circle cx="96" cy="70" r="5" fill="#3b7ddd"/><text x="96" y="58" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">I ate lunch</text><circle cx="160" cy="70" r="5" fill="#3b7ddd"/><text x="160" y="90" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">then I left</text><text x="128" y="112" text-anchor="middle" font-size="10" fill="currentColor">เกิดแล้วจบแล้ว เป็นจุด ๆ เรียงกัน</text><line x1="20" y1="132" x2="380" y2="132" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="148" font-size="10.5" font-weight="700" fill="currentColor">โครงสร้าง 3 รูป</text><text x="20" y="165" font-size="10.5" font-weight="400" fill="currentColor">บอกเล่า: S + V2  →  She walked home. / He went out.</text><text x="20" y="182" font-size="10.5" font-weight="400" fill="currentColor">ปฏิเสธ: S + did not + V1  →  She did not walk home.</text><text x="20" y="199" font-size="10.5" font-weight="400" fill="currentColor">คำถาม: Did + S + V1 ?  →  Did she walk home?</text><text x="20" y="216" font-size="10.5" font-weight="700" fill="#e05252">พอมี did แล้ว กริยาต้องกลับเป็นช่อง 1 เสมอ ห้ามใช้ V2 ซ้ำ</text></svg>`;

  const SVG_PASTCONT = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="Past Continuous — กำลังทำอยู่ ณ เวลาหนึ่งในอดีต"><text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">Past Continuous — กำลังทำอยู่ ณ เวลาหนึ่งในอดีต</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 24 70 L 376 70"/><path d="M 368 66 L 377 70 L 368 74"/></g><path d="M 280 54 L 280 86" stroke="#e05252" stroke-width="2"/><text x="280" y="100" text-anchor="middle" font-size="10" font-weight="700" fill="#e05252">ตอนนี้</text><text x="30" y="48" font-size="10" fill="currentColor" opacity="0.7">อดีต</text><text x="370" y="48" text-anchor="end" font-size="10" fill="currentColor" opacity="0.7">อนาคต</text><path d="M 70 70 L 175 70" stroke="#d98324" stroke-width="8" opacity="0.4" stroke-linecap="round"/><path d="M 70 63 L 70 77 M 175 63 L 175 77" stroke="#d98324" stroke-width="1.6"/><text x="122" y="56" text-anchor="middle" font-size="10" font-weight="700" fill="#d98324">was watching TV</text><path d="M 122 64 L 122 94" stroke="#e05252" stroke-width="1.4" stroke-dasharray="4 3"/><text x="122" y="106" text-anchor="middle" font-size="10" fill="#e05252">at 8 p.m.</text><line x1="20" y1="132" x2="380" y2="132" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="148" font-size="10.5" font-weight="700" fill="currentColor">โครงสร้าง 3 รูป</text><text x="20" y="165" font-size="10.5" font-weight="400" fill="currentColor">บอกเล่า: S + was/were + V-ing  →  I was watching TV.</text><text x="20" y="182" font-size="10.5" font-weight="400" fill="currentColor">ปฏิเสธ: S + was/were not + V-ing</text><text x="20" y="199" font-size="10.5" font-weight="400" fill="currentColor">คำถาม: Was/Were + S + V-ing ?</text><text x="20" y="216" font-size="10.5" font-weight="700" fill="#d98324">I / he / she / it → was  ·  you / we / they → were</text></svg>`;

  const SVG_WHENWHILE = `<svg viewBox="0 0 400 260" width="400" height="260" role="img" aria-label="Past Simple ตัด Past Continuous"><text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">Past Simple ตัด Past Continuous</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 24 80 L 376 80"/><path d="M 368 76 L 377 80 L 368 84"/></g><path d="M 316 64 L 316 96" stroke="#e05252" stroke-width="2"/><text x="316" y="110" text-anchor="middle" font-size="10" font-weight="700" fill="#e05252">ตอนนี้</text><text x="30" y="58" font-size="10" fill="currentColor" opacity="0.7">อดีต</text><text x="370" y="58" text-anchor="end" font-size="10" fill="currentColor" opacity="0.7">อนาคต</text><path d="M 56 80 L 210 80" stroke="#d98324" stroke-width="8" opacity="0.4" stroke-linecap="round"/><path d="M 56 73 L 56 87 M 210 73 L 210 87" stroke="#d98324" stroke-width="1.6"/><text x="133" y="66" text-anchor="middle" font-size="10" font-weight="700" fill="#d98324">I was cooking dinner</text><path d="M 132 62 L 132 98" stroke="#3b7ddd" stroke-width="2.4"/><circle cx="132" cy="80" r="5.5" fill="#3b7ddd"/><text x="132" y="116" text-anchor="middle" font-size="10.5" font-weight="700" fill="#3b7ddd">the phone rang</text><line x1="20" y1="134" x2="380" y2="134" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="150" font-size="10.5" font-weight="700" fill="currentColor">เหตุการณ์ยาว = Past Continuous · เหตุการณ์สั้นที่แทรก = Past Simple</text><text x="20" y="167" font-size="10.5" font-weight="400" fill="currentColor">I was cooking dinner when the phone rang.</text><text x="20" y="184" font-size="10.5" font-weight="400" fill="currentColor">While I was cooking dinner, the phone rang.</text><text x="20" y="201" font-size="10.5" font-weight="700" fill="#2e9e6b">when มักตามด้วยเหตุการณ์สั้น · while มักตามด้วยเหตุการณ์ยาว</text><text x="20" y="218" font-size="10.5" font-weight="400" fill="currentColor">ถ้าสองอันยาวพร้อมกัน ใช้ continuous ทั้งคู่: While I was reading,</text><text x="20" y="235" font-size="10.5" font-weight="400" fill="currentColor">he was sleeping.</text></svg>`;

  const SVG_FUTUREMAP = `<svg viewBox="0 0 400 280" width="400" height="280" role="img" aria-label="เลือกรูปอนาคตจาก “เจตนา” ไม่ใช่จากคำแปล"><text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">เลือกรูปอนาคตจาก “เจตนา” ไม่ใช่จากคำแปล</text><rect x="24" y="34" width="352" height="26" rx="8" fill="currentColor" opacity="0.08"/><text x="200" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">ถามตัวเอง: ประโยคนี้สื่อ “เจตนา” แบบไหน</text><g font-size="9.5"><rect x="24" y="72" width="108" height="52" rx="9" fill="#3b7ddd" opacity="0.15"/><text x="78" y="90" text-anchor="middle" font-weight="700" fill="#3b7ddd">ตัดสินใจเดี๋ยวนั้น</text><text x="78" y="105" text-anchor="middle" fill="currentColor">สัญญา · เสนอตัว</text><text x="78" y="119" text-anchor="middle" font-weight="700" fill="currentColor">will</text><rect x="146" y="72" width="108" height="52" rx="9" fill="#d98324" opacity="0.15"/><text x="200" y="90" text-anchor="middle" font-weight="700" fill="#d98324">วางแผนไว้ก่อน</text><text x="200" y="105" text-anchor="middle" fill="currentColor">เห็นหลักฐานชัด</text><text x="200" y="119" text-anchor="middle" font-weight="700" fill="currentColor">be going to</text><rect x="268" y="72" width="108" height="52" rx="9" fill="#2e9e6b" opacity="0.15"/><text x="322" y="90" text-anchor="middle" font-weight="700" fill="#2e9e6b">นัดหมายแน่นอน</text><text x="322" y="105" text-anchor="middle" fill="currentColor">จองไว้แล้ว</text><text x="322" y="119" text-anchor="middle" font-weight="700" fill="currentColor">present continuous</text><rect x="24" y="134" width="108" height="52" rx="9" fill="#7c5cd6" opacity="0.15"/><text x="78" y="152" text-anchor="middle" font-weight="700" fill="#7c5cd6">ตารางเวลาทางการ</text><text x="78" y="167" text-anchor="middle" fill="currentColor">รถไฟ หนัง เปิด-ปิด</text><text x="78" y="181" text-anchor="middle" font-weight="700" fill="currentColor">present simple</text><rect x="146" y="134" width="108" height="52" rx="9" fill="#3b7ddd" opacity="0.15"/><text x="200" y="152" text-anchor="middle" font-weight="700" fill="#3b7ddd">กำลังทำ ณ เวลานั้น</text><text x="200" y="167" text-anchor="middle" fill="currentColor">at 8 tomorrow</text><text x="200" y="181" text-anchor="middle" font-weight="700" fill="currentColor">future continuous</text><rect x="268" y="134" width="108" height="52" rx="9" fill="#e05252" opacity="0.15"/><text x="322" y="152" text-anchor="middle" font-weight="700" fill="#e05252">เสร็จก่อนเวลานั้น</text><text x="322" y="167" text-anchor="middle" fill="currentColor">by Friday</text><text x="322" y="181" text-anchor="middle" font-weight="700" fill="currentColor">future perfect</text></g><line x1="20" y1="198" x2="380" y2="198" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="214" font-size="10.5" font-weight="700" fill="currentColor">คำบอกเวลาเป็นแค่เบาะแส เจตนาต่างหากที่ตัดสิน</text><text x="20" y="231" font-size="10.5" font-weight="400" fill="currentColor">tomorrow ใช้ได้เกือบทุกรูป ต้องดูว่าประโยคสื่ออะไร</text><text x="20" y="248" font-size="10.5" font-weight="400" fill="#2e9e6b">by + เวลา → นึกถึง future perfect ก่อนเสมอ</text></svg>`;

  const SVG_WILLGOING = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="will กับ be going to ต่างกันตรงไหน"><text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">will กับ be going to ต่างกันตรงไหน</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 24 86 L 376 86"/><path d="M 368 82 L 377 86 L 368 90"/></g><path d="M 196 70 L 196 102" stroke="#e05252" stroke-width="2"/><text x="196" y="116" text-anchor="middle" font-size="10" font-weight="700" fill="#e05252">ตอนนี้</text><text x="30" y="64" font-size="10" fill="currentColor" opacity="0.7">อดีต</text><text x="370" y="64" text-anchor="end" font-size="10" fill="currentColor" opacity="0.7">อนาคต</text><text x="104" y="46" text-anchor="middle" font-size="10" font-weight="700" fill="#d98324">แผนมีอยู่ก่อนแล้ว</text><path d="M 104 52 L 104 78" stroke="#d98324" stroke-width="1.4" stroke-dasharray="4 3"/><path d="M 108 60 L 250 60" stroke="#d98324" stroke-width="1.5" fill="none"/><path d="M 244 56 L 251 60 L 244 64" stroke="#d98324" stroke-width="1.5" fill="none"/><circle cx="256" cy="86" r="5" fill="#d98324"/><text x="256" y="106" text-anchor="middle" font-size="10" font-weight="700" fill="#d98324">be going to</text><text x="330" y="46" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">เพิ่งคิดตอนพูด</text><path d="M 330 52 L 330 74" stroke="#3b7ddd" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="330" cy="86" r="5" fill="#3b7ddd"/><text x="330" y="106" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">will</text><line x1="20" y1="132" x2="380" y2="132" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="148" font-size="10.5" font-weight="700" fill="currentColor">สถานการณ์เดียวกัน คนละคำตอบ</text><text x="20" y="165" font-size="10.5" font-weight="400" fill="#3b7ddd">A: The phone is ringing.  B: I’ll get it!  → เพิ่งตัดสินใจ</text><text x="20" y="182" font-size="10.5" font-weight="400" fill="#d98324">I’m going to visit my grandma this weekend. → วางแผนไว้แล้ว</text><text x="20" y="199" font-size="10.5" font-weight="400" fill="#d98324">Look at those clouds — it’s going to rain. → มีหลักฐานเห็นอยู่</text><text x="20" y="216" font-size="10.5" font-weight="400" fill="#3b7ddd">I think it will rain tomorrow. → เดา ไม่มีหลักฐาน</text></svg>`;

  const SVG_FUTPERF = `<svg viewBox="0 0 400 280" width="400" height="280" role="img" aria-label="Future Continuous · Perfect · Perfect Continuous"><text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">Future Continuous · Perfect · Perfect Continuous</text><g stroke="currentColor" stroke-width="1.6" fill="none" opacity="0.85"><path d="M 24 86 L 376 86"/><path d="M 368 82 L 377 86 L 368 90"/></g><path d="M 78 70 L 78 102" stroke="#e05252" stroke-width="2"/><text x="78" y="116" text-anchor="middle" font-size="10" font-weight="700" fill="#e05252">ตอนนี้</text><text x="30" y="64" font-size="10" fill="currentColor" opacity="0.7">อดีต</text><text x="370" y="64" text-anchor="end" font-size="10" fill="currentColor" opacity="0.7">อนาคต</text><path d="M 300 44 L 300 106" stroke="#e05252" stroke-width="1.6" stroke-dasharray="4 3"/><text x="374" y="122" text-anchor="end" font-size="10" font-weight="700" fill="#e05252">เส้นแดงประ = 8 p.m. พรุ่งนี้</text><path d="M 272 56 L 330 56" stroke="#3b7ddd" stroke-width="8" opacity="0.4" stroke-linecap="round"/><path d="M 272 49 L 272 63 M 330 49 L 330 63" stroke="#3b7ddd" stroke-width="1.6"/><text x="301" y="42" text-anchor="middle" font-size="10" font-weight="700" fill="#3b7ddd">will be eating</text><path d="M 140 86 L 292 86" stroke="#2e9e6b" stroke-width="7" opacity="0.4" stroke-linecap="round"/><circle cx="292" cy="86" r="5" fill="#2e9e6b"/><text x="196" y="106" text-anchor="middle" font-size="10" font-weight="700" fill="#2e9e6b">will have finished</text><line x1="20" y1="134" x2="380" y2="134" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="150" font-size="10.5" font-weight="700" fill="currentColor">อ่านจากเส้นเวลา ไม่ต้องท่องสูตร</text><text x="20" y="167" font-size="10.5" font-weight="400" fill="#3b7ddd">future continuous: กำลังทำอยู่พอดี ณ เวลานั้น</text><text x="20" y="184" font-size="10.5" font-weight="400" fill="currentColor">At 8 p.m. tomorrow I will be eating dinner.</text><text x="20" y="201" font-size="10.5" font-weight="400" fill="#2e9e6b">future perfect: เสร็จเรียบร้อยก่อนถึงเวลานั้น</text><text x="20" y="218" font-size="10.5" font-weight="400" fill="currentColor">I will have finished my homework by 8 p.m.</text><text x="20" y="235" font-size="10.5" font-weight="400" fill="#7c5cd6">future perfect continuous: เน้นว่าทำมานานแค่ไหนจนถึงเวลานั้น</text><text x="20" y="252" font-size="10.5" font-weight="400" fill="currentColor">By next month I will have been studying here for a year.</text></svg>`;

  const SVG_TIMEEXPR = `<svg viewBox="0 0 400 250" width="400" height="250" role="img" aria-label="จับคู่คำบอกเวลากับ tense"><text x="200" y="18" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">จับคู่คำบอกเวลากับ tense</text><g font-size="10"><rect x="22" y="34" width="168" height="120" rx="10" fill="#3b7ddd" opacity="0.10"/><text x="106" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#3b7ddd">คำของอดีต</text><text x="34" y="72" fill="currentColor">yesterday · last week</text><text x="34" y="90" fill="currentColor">two days ago · in 2019</text><text x="34" y="108" fill="currentColor">when I was young</text><text x="34" y="128" fill="currentColor" font-weight="700">→ Past Simple</text><text x="34" y="146" fill="currentColor">while / at 8 p.m. → Past Cont.</text><rect x="210" y="34" width="168" height="120" rx="10" fill="#2e9e6b" opacity="0.10"/><text x="294" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#2e9e6b">คำของอนาคต</text><text x="222" y="72" fill="currentColor">tomorrow · next month</text><text x="222" y="90" fill="currentColor">soon · in two days</text><text x="222" y="108" fill="currentColor" font-weight="700">by Friday → Future Perfect</text><text x="222" y="128" fill="currentColor" font-weight="700">at 8 p.m. tomorrow</text><text x="222" y="146" fill="currentColor">→ Future Continuous</text></g><line x1="20" y1="170" x2="380" y2="170" stroke="currentColor" stroke-width="1" opacity="0.25"/><text x="20" y="186" font-size="10.5" font-weight="700" fill="currentColor">วิธีทำโจทย์เลือก tense ให้แม่น</text><text x="20" y="203" font-size="10.5" font-weight="400" fill="currentColor">① ขีดเส้นใต้คำบอกเวลา ② ถามว่าเจตนาคืออะไร ③ ค่อยเลือกรูป</text><text x="20" y="220" font-size="10.5" font-weight="400" fill="#e05252">for + ระยะเวลา ใช้ได้หลาย tense ต้องดูบริบทเสมอ</text></svg>`;

  STARTER_CONTENT[ID] = [
    { type: "h1", text: "Past Tenses & Future Forms" },
    { type: "callout", html: "บทนี้มีหัวใจอยู่ 2 อย่าง: <b>อดีตต้องแยกให้ออกว่า “เป็นจุด” หรือ “กำลังทำอยู่”</b> และ <b>อนาคตต้องเลือกรูปจากเจตนา ไม่ใช่จากคำแปล</b> — ทุกหัวข้อมีเส้นเวลาให้ดู กดที่หัวข้อเพื่อเปิดรูปได้เลย" },

    { type: "h2", text: "1.1 Past Simple" },
    { type: "p", html: "ใช้กับเหตุการณ์ที่<b>เกิดและจบไปแล้วในอดีต</b> รู้เวลาชัดเจน · โครงสร้าง <b>S + V2</b>",
      detail: `<h3>Past Simple — เหตุการณ์ที่จบแล้ว</h3>
` + SVG_PASTSIMPLE + `
<h4>สามรูปที่ต้องเขียนได้ทันที</h4>
<table><tr><th>รูป</th><th>โครงสร้าง</th><th>ตัวอย่าง</th></tr>
<tr><td>บอกเล่า</td><td>S + V2</td><td>She <b>watched</b> a movie last night.</td></tr>
<tr><td>ปฏิเสธ</td><td>S + did not (didn't) + V1</td><td>She <b>didn't watch</b> a movie.</td></tr>
<tr><td>คำถาม</td><td>Did + S + V1 ?</td><td><b>Did</b> she <b>watch</b> a movie?</td></tr></table>
<div class="box warn"><b>กับดักอันดับหนึ่งของบทนี้</b><br>พอมี <b>did / didn't</b> แล้ว กริยาต้องกลับเป็น<b>ช่อง 1</b> เสมอ<br>✗ She didn't <b>watched</b> → ✓ She didn't <b>watch</b><br>เหตุผล: did แบกความเป็นอดีตไว้แล้ว ไม่ต้องบอกซ้ำสองที่</div>
<h4>ใช้ตอนไหนบ้าง</h4>
<table><tr><th>ใช้กับ</th><th>ตัวอย่าง</th></tr>
<tr><td>เหตุการณ์จบแล้ว รู้เวลา</td><td>I <b>met</b> him yesterday.</td></tr>
<tr><td>เหตุการณ์เรียงต่อกันเป็นลำดับ</td><td>I <b>woke up</b>, <b>brushed</b> my teeth and <b>left</b>.</td></tr>
<tr><td>นิสัยในอดีตที่เลิกไปแล้ว</td><td>She <b>played</b> the piano when she was ten.</td></tr></table>
<h4>คำบอกเวลาที่มักมาคู่กัน</h4>
<p>yesterday · last night/week/year · two days ago · in 2019 · when I was young</p>
<div class="box tip"><b>ประโยคที่มี ago แทบจะการันตีว่าเป็น Past Simple</b> เพราะ ago นับถอยหลังจากปัจจุบันไปยังจุดที่จบแล้ว</div>` },

    { type: "h2", text: "1.2 Past Continuous" },
    { type: "p", html: "ใช้กับเหตุการณ์ที่<b>กำลังดำเนินอยู่</b> ณ เวลาหนึ่งในอดีต · โครงสร้าง <b>S + was/were + V-ing</b>",
      detail: `<h3>Past Continuous — ภาพที่กำลังเคลื่อนไหวอยู่</h3>
` + SVG_PASTCONT + `
<table><tr><th>รูป</th><th>โครงสร้าง</th><th>ตัวอย่าง</th></tr>
<tr><td>บอกเล่า</td><td>S + was/were + V-ing</td><td>They <b>were playing</b> football at 5 p.m.</td></tr>
<tr><td>ปฏิเสธ</td><td>S + was/were + not + V-ing</td><td>They <b>weren't playing</b> football.</td></tr>
<tr><td>คำถาม</td><td>Was/Were + S + V-ing ?</td><td><b>Were</b> they <b>playing</b> football?</td></tr></table>
<div class="box"><b>เลือก was หรือ were</b><br>I / he / she / it → <b>was</b> &nbsp;·&nbsp; you / we / they → <b>were</b><br>สังเกตว่า <b>I</b> ใช้ was ไม่ใช่ were (ยกเว้นประโยคสมมติ If I were you)</div>
<h4>ใช้ตอนไหน</h4>
<table><tr><th>ใช้กับ</th><th>ตัวอย่าง</th></tr>
<tr><td>กำลังทำอยู่ ณ เวลาที่ระบุ</td><td>At 8 p.m. I <b>was studying</b>.</td></tr>
<tr><td>ฉากหลังของเรื่องเล่า</td><td>It <b>was raining</b> and the wind <b>was blowing</b>.</td></tr>
<tr><td>สองเหตุการณ์ยาวเกิดพร้อมกัน</td><td>While I <b>was cooking</b>, he <b>was watching</b> TV.</td></tr></table>
<div class="box warn"><b>กริยาที่ไม่ใช้รูป continuous</b> (stative verbs)<br>know, like, love, hate, want, need, believe, understand, belong, seem<br>✗ I was knowing the answer → ✓ I <b>knew</b> the answer</div>` },

    { type: "h2", text: "1.3 Past Simple vs. Past Continuous" },
    { type: "p", html: "ตัดสินจาก<b>เส้นเวลา</b> ไม่ใช่จากสูตร — อันไหน<b>ยาว</b>ใช้ continuous อันไหน<b>สั้นและแทรกเข้ามา</b>ใช้ simple",
      detail: `<h3>เหตุการณ์สั้นตัดเหตุการณ์ยาว</h3>
` + SVG_WHENWHILE + `
<h4>สูตรที่ใช้ได้จริง</h4>
<p class="frm">เหตุการณ์ยาว (Past Continuous) + <b>when</b> + เหตุการณ์สั้น (Past Simple)<br><b>While</b> + เหตุการณ์ยาว (Past Continuous), เหตุการณ์สั้น (Past Simple)</p>
<table><tr><th>ประโยค</th><th>อ่านว่า</th></tr>
<tr><td>I <b>was taking</b> a shower when the doorbell <b>rang</b>.</td><td>กำลังอาบน้ำอยู่ แล้วกริ่งดังแทรกเข้ามา</td></tr>
<tr><td>While she <b>was driving</b>, she <b>saw</b> an accident.</td><td>ระหว่างขับรถ เห็นอุบัติเหตุ</td></tr>
<tr><td>When I <b>arrived</b>, they <b>were eating</b>.</td><td>ตอนฉันมาถึง เขากินอยู่ก่อนแล้ว</td></tr></table>
<div class="box why"><b>เทียบให้เห็นความต่าง</b><br>When I <b>arrived</b>, she <b>made</b> coffee. → ฉันมาถึงก่อน <b>แล้วเธอค่อยเริ่ม</b>ชง<br>When I <b>arrived</b>, she <b>was making</b> coffee. → ตอนฉันมาถึง เธอ<b>ชงอยู่แล้ว</b><br>ความหมายคนละเรื่องเลย ทั้งที่ต่างกันแค่รูปกริยา</div>
<div class="box tip"><b>เช็กเร็ว</b> ถ้าสองเหตุการณ์<b>ยาวทั้งคู่</b> → continuous ทั้งคู่ · ถ้า<b>สั้นทั้งคู่และเรียงกัน</b> → simple ทั้งคู่</div>` },

    { type: "h2", text: "1.4 กริยาช่อง 2 และกฎการเติม" },
    { type: "table", rows: [
      ["ชนิด", "กฎ", "ตัวอย่าง"],
      ["ปกติทั่วไป", "เติม -ed", "walk → walked · play → played"],
      ["ลงท้ายด้วย e", "เติม -d", "like → liked · move → moved"],
      ["พยัญชนะ + y", "เปลี่ยน y เป็น i แล้วเติม -ed", "study → studied · try → tried"],
      ["สระ + y", "เติม -ed ตามปกติ", "play → played (ไม่ใช่ plaied)"],
      ["พยางค์เดียว สระตัวเดียว ท้ายพยัญชนะ", "ซ้ำตัวท้ายแล้วเติม -ed", "stop → stopped · plan → planned"]
    ], detail: `<h3>กฎการเติม -ed และ -ing</h3>
<h4>กฎการเติม -ing</h4>
<table><tr><th>กรณี</th><th>กฎ</th><th>ตัวอย่าง</th></tr>
<tr><td>ทั่วไป</td><td>เติม -ing</td><td>read → reading</td></tr>
<tr><td>ลงท้ายด้วย e ที่ไม่ออกเสียง</td><td>ตัด e แล้วเติม -ing</td><td>make → making · write → writing</td></tr>
<tr><td>พยางค์เดียว สระตัวเดียว ท้ายพยัญชนะ</td><td>ซ้ำตัวท้าย</td><td>run → running · sit → sitting</td></tr>
<tr><td>ลงท้ายด้วย ie</td><td>เปลี่ยนเป็น y แล้วเติม -ing</td><td>lie → lying · die → dying</td></tr></table>
<h4>กริยาไม่ปกติที่เจอบ่อยที่สุด</h4>
<table><tr><th>V1</th><th>V2</th><th>V1</th><th>V2</th></tr>
<tr><td>go</td><td>went</td><td>see</td><td>saw</td></tr>
<tr><td>eat</td><td>ate</td><td>take</td><td>took</td></tr>
<tr><td>come</td><td>came</td><td>give</td><td>gave</td></tr>
<tr><td>get</td><td>got</td><td>make</td><td>made</td></tr>
<tr><td>write</td><td>wrote</td><td>read</td><td>read (อ่านว่า เรด)</td></tr>
<tr><td>buy</td><td>bought</td><td>bring</td><td>brought</td></tr>
<tr><td>think</td><td>thought</td><td>teach</td><td>taught</td></tr>
<tr><td>begin</td><td>began</td><td>drink</td><td>drank</td></tr>
<tr><td>run</td><td>ran</td><td>swim</td><td>swam</td></tr>
<tr><td>put</td><td>put</td><td>cut</td><td>cut</td></tr></table>
<div class="box tip"><b>กลุ่มที่จำง่ายขึ้นถ้าจับแพตเทิร์น</b><br>• ไม่เปลี่ยนเลย: put · cut · hit · let · cost · read<br>• เปลี่ยนสระตัวเดียว: begin→began · drink→drank · swim→swam · sing→sang<br>• ลงท้าย -ought / -aught: buy→bought · think→thought · teach→taught · catch→caught</div>` },
  ];
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 2 · Future Forms" },

    { type: "h2", text: "2.1 เลือกรูปอนาคตให้ตรงเจตนา" },
    { type: "p", html: "ภาษาอังกฤษมีรูปอนาคตอย่างน้อย 7 แบบ และเลือกใช้จาก<b>เจตนาของผู้พูด</b> ไม่ใช่จากคำแปลว่า “จะ”",
      detail: `<h3>แผนที่รูปอนาคตทั้งหมด</h3>
` + SVG_FUTUREMAP + `
<table><tr><th>รูป</th><th>ใช้เมื่อ</th><th>ตัวอย่าง</th></tr>
<tr><td><b>will</b></td><td>ตัดสินใจตอนพูด · สัญญา · เสนอตัว · ทำนายลอย ๆ</td><td>I'<b>ll help</b> you with that bag.</td></tr>
<tr><td><b>be going to</b></td><td>แผนที่ตั้งใจไว้ก่อน · ทำนายที่มีหลักฐานเห็นอยู่</td><td>I'<b>m going to study</b> abroad next year.</td></tr>
<tr><td><b>present continuous</b></td><td>นัดหมายที่จัดไว้แน่นอนแล้ว</td><td>I'<b>m meeting</b> the dentist at 3.</td></tr>
<tr><td><b>present simple</b></td><td>ตารางเวลาทางการ</td><td>The train <b>leaves</b> at 6:00.</td></tr>
<tr><td><b>future continuous</b></td><td>กำลังทำอยู่พอดี ณ เวลาหนึ่งในอนาคต</td><td>At 9 I'<b>ll be flying</b> to Tokyo.</td></tr>
<tr><td><b>future perfect</b></td><td>เสร็จก่อนถึงเวลาหนึ่ง</td><td>I'<b>ll have finished</b> by Friday.</td></tr>
<tr><td><b>future perfect continuous</b></td><td>ทำต่อเนื่องมานานแค่ไหนจนถึงเวลานั้น</td><td>By June I'<b>ll have been working</b> here for 2 years.</td></tr></table>
<div class="box why"><b>ทำไมคำบอกเวลาอย่างเดียวไม่พอ</b><br>ประโยคทั้งสี่นี้ใช้ tomorrow เหมือนกันหมด แต่คนละรูป:<br>• I<b>'ll call</b> you tomorrow. (เพิ่งตัดสินใจ)<br>• I<b>'m going to call</b> him tomorrow. (ตั้งใจไว้แล้ว)<br>• I<b>'m calling</b> the doctor tomorrow. (นัดไว้แล้ว)<br>• At 9 tomorrow I<b>'ll be calling</b> him. (กำลังโทรอยู่ตอน 9 โมง)</div>` },

    { type: "h2", text: "2.2 Future Simple — will" },
    { type: "p", html: "<b>will + V1</b> ใช้ตอน<b>ตัดสินใจขณะพูด</b> ให้สัญญา เสนอความช่วยเหลือ หรือทำนายที่ไม่มีหลักฐานชัด",
      detail: `<h3>will ใช้ตอนไหน</h3>
<table><tr><th>รูป</th><th>โครงสร้าง</th><th>ตัวอย่าง</th></tr>
<tr><td>บอกเล่า</td><td>S + will + V1</td><td>I <b>will call</b> you later.</td></tr>
<tr><td>ปฏิเสธ</td><td>S + will not (won't) + V1</td><td>I <b>won't tell</b> anyone.</td></tr>
<tr><td>คำถาม</td><td>Will + S + V1 ?</td><td><b>Will</b> you <b>come</b> with me?</td></tr></table>
<table><tr><th>ใช้กับ</th><th>ตัวอย่าง</th></tr>
<tr><td>ตัดสินใจทันทีตอนพูด</td><td>A: I'm cold. &nbsp; B: I'<b>ll close</b> the window.</td></tr>
<tr><td>สัญญา</td><td>I <b>promise</b> I <b>won't be</b> late again.</td></tr>
<tr><td>เสนอตัวช่วย / ขอร้อง</td><td><b>Will</b> you <b>help</b> me, please?</td></tr>
<tr><td>ทำนายจากความคิดเห็น</td><td>I think our team <b>will win</b>.</td></tr></table>
<div class="box tip"><b>คำที่มักมาคู่กับ will</b> I think · I'm sure · probably · maybe · I hope · I expect — ทั้งหมดคือคำที่แสดงว่า<b>เดา</b> ไม่ได้มีหลักฐาน</div>
<div class="box warn"><b>ห้ามใช้ will หลัง if / when ที่บอกเงื่อนไขหรือเวลา</b><br>✗ If it <b>will rain</b>, I'll stay home. → ✓ If it <b>rains</b>, I'll stay home.<br>✗ When I <b>will arrive</b>, I'll call you. → ✓ When I <b>arrive</b>, I'll call you.</div>` },

    { type: "h2", text: "2.3 be going to" },
    { type: "p", html: "<b>be going to + V1</b> ใช้กับ<b>แผนที่มีอยู่ก่อนแล้ว</b> หรือ<b>การคาดการณ์ที่เห็นหลักฐานในปัจจุบัน</b>",
      detail: `<h3>be going to กับ will ต่างกันตรงไหน</h3>
` + SVG_WILLGOING + `
<table><tr><th></th><th>will</th><th>be going to</th></tr>
<tr><td>เวลาที่ตัดสินใจ</td><td>ตอนพูดนี่แหละ</td><td>ตัดสินใจไปก่อนหน้านี้แล้ว</td></tr>
<tr><td>การทำนาย</td><td>เดาจากความรู้สึก/ความเห็น</td><td>เดาจาก<b>หลักฐานที่เห็นอยู่</b></td></tr>
<tr><td>ตัวอย่างทำนาย</td><td>I think it <b>will rain</b> tomorrow.</td><td>Look at the sky — it'<b>s going to rain</b>.</td></tr></table>
<div class="box why"><b>บทสนทนาที่เห็นความต่างชัดที่สุด</b><br>A: We need milk.<br>B: OK, I'<b>ll buy</b> some on my way home. → เพิ่งตัดสินใจตอนได้ยิน<br><br>A: Why are you taking the car keys?<br>B: I'<b>m going to buy</b> milk. → ตั้งใจไว้ก่อนแล้ว กำลังจะไป</div>
<div class="box tip"><b>ในภาษาพูด</b> going to มักออกเสียงว่า <b>gonna</b> — เข้าใจได้ในบทสนทนา แต่<b>อย่าเขียนในข้อสอบ</b></div>` },

    { type: "h2", text: "2.4 Present Continuous และ Present Simple เพื่ออนาคต" },
    { type: "p", html: "สองรูปนี้ดูเหมือนปัจจุบันแต่ใช้พูดถึงอนาคตได้ — ต่างกันที่ <b>นัดส่วนตัว</b> กับ <b>ตารางเวลาทางการ</b>",
      detail: `<h3>ปัจจุบันที่ใช้พูดถึงอนาคต</h3>
<h4>Present Continuous — นัดหมายที่จัดไว้แล้ว</h4>
<p>ใช้เมื่อ<b>ตกลงกับใครไว้แล้ว</b> มีวันเวลาชัดเจน จองแล้ว นัดแล้ว</p>
<table><tr><th>ตัวอย่าง</th><th>ความหมาย</th></tr>
<tr><td>I'<b>m seeing</b> the dentist on Monday.</td><td>นัดหมอฟันไว้แล้ว</td></tr>
<tr><td>We'<b>re having</b> dinner with grandma tonight.</td><td>ตกลงกันไว้แล้ว</td></tr>
<tr><td>She'<b>s flying</b> to Chiang Mai tomorrow.</td><td>จองตั๋วแล้ว</td></tr></table>
<h4>Present Simple — ตารางเวลาที่ทางการกำหนด</h4>
<p>ใช้กับสิ่งที่<b>องค์กรกำหนดไว้</b> ไม่ใช่เรื่องที่เราตัดสินใจเอง เช่น ตารางรถ ตารางเรียน เวลาเปิด-ปิด</p>
<table><tr><th>ตัวอย่าง</th><th>ความหมาย</th></tr>
<tr><td>The train <b>leaves</b> at 7:30.</td><td>ตารางเดินรถกำหนดไว้</td></tr>
<tr><td>The movie <b>starts</b> at 8 p.m.</td><td>รอบหนังกำหนดไว้</td></tr>
<tr><td>School <b>begins</b> on May 16.</td><td>ปฏิทินโรงเรียนกำหนด</td></tr></table>
<div class="box why"><b>วิธีแยกให้ขาด</b> ถามว่า "ใครเป็นคนกำหนด"<br>• <b>เรา</b>หรือคนที่เรานัดกำหนดเอง → present continuous<br>• <b>องค์กร/ตารางทางการ</b>กำหนด เราเปลี่ยนไม่ได้ → present simple</div>
<div class="box warn"><b>เทียบให้เห็น</b><br>I<b>'m meeting</b> John at 6. (นัดกับ John ไว้)<br>The meeting <b>starts</b> at 6. (บริษัทกำหนดเวลาประชุม)</div>` },

    { type: "h2", text: "2.5 Future Continuous / Perfect / Perfect Continuous" },
    { type: "p", html: "สามรูปนี้แยกกันที่<b>ตำแหน่งบนเส้นเวลา</b> เทียบกับจุดเวลาในอนาคตที่โจทย์กำหนด",
      detail: `<h3>อ่านจากเส้นเวลา ไม่ต้องท่องสูตร</h3>
` + SVG_FUTPERF + `
<table><tr><th>รูป</th><th>โครงสร้าง</th><th>ความหมาย</th></tr>
<tr><td>Future Continuous</td><td>will be + V-ing</td><td><b>กำลังทำอยู่พอดี</b> ณ เวลานั้น</td></tr>
<tr><td>Future Perfect</td><td>will have + V3</td><td><b>เสร็จไปแล้ว</b>ก่อนถึงเวลานั้น</td></tr>
<tr><td>Future Perfect Continuous</td><td>will have been + V-ing</td><td>ทำ<b>ต่อเนื่องมานานเท่าไร</b>จนถึงเวลานั้น</td></tr></table>
<h4>ประโยคเดียวกัน สามมุมมอง</h4>
<div class="box">สมมติเวลานัดคือ <b>8 โมงเช้าพรุ่งนี้</b><br>• At 8 a.m. I'<b>ll be studying</b>. → ตอน 8 โมงกำลังอ่านอยู่<br>• By 8 a.m. I'<b>ll have studied</b> three chapters. → ก่อน 8 โมงอ่านจบ 3 บทแล้ว<br>• By 8 a.m. I'<b>ll have been studying</b> for four hours. → ถึง 8 โมงจะอ่านมาแล้ว 4 ชั่วโมง</div>
<div class="box tip"><b>คำใบ้ที่ใช้ได้จริง</b><br>• <b>at</b> + เวลา → มักเป็น future continuous<br>• <b>by</b> + เวลา → มักเป็น future perfect<br>• <b>by</b> + เวลา + <b>for</b> + ระยะเวลา → future perfect continuous</div>` },

    { type: "h2", text: "2.6 Time expressions" },
    { type: "p", html: "คำบอกเวลาเป็น<b>เบาะแส</b>ที่ดี แต่ตัวตัดสินจริง ๆ คือเจตนา — ทำโจทย์ให้ขีดเส้นใต้ทั้งสองอย่างก่อนตอบ",
      detail: `<h3>จับคู่คำบอกเวลากับ tense</h3>
` + SVG_TIMEEXPR + `
<table><tr><th>คำบอกเวลา</th><th>มักไปกับ</th><th>ตัวอย่าง</th></tr>
<tr><td>yesterday · last week · ago · in 2019</td><td>Past Simple</td><td>I <b>saw</b> her two days <b>ago</b>.</td></tr>
<tr><td>while · as · at 8 p.m. (อดีต)</td><td>Past Continuous</td><td><b>While</b> I <b>was walking</b>…</td></tr>
<tr><td>tomorrow · next week · soon</td><td>will / be going to</td><td>We'<b>ll leave</b> <b>soon</b>.</td></tr>
<tr><td>at + เวลา (อนาคต)</td><td>Future Continuous</td><td><b>At 9 p.m.</b> I'<b>ll be sleeping</b>.</td></tr>
<tr><td>by + เวลา</td><td>Future Perfect</td><td><b>By Friday</b> I'<b>ll have finished</b>.</td></tr>
<tr><td>for + ระยะเวลา</td><td>ได้หลาย tense ต้องดูบริบท</td><td>I'll have been working here <b>for</b> 2 years.</td></tr></table>
<div class="box warn"><b>ระวัง by กับ until สลับกัน</b><br>• <b>by</b> Friday = ภายในวันศุกร์ (เสร็จเมื่อไรก็ได้ก่อนถึง) → future perfect<br>• <b>until</b> Friday = ต่อเนื่องไปจนถึงวันศุกร์ → I'll be working until Friday.</div>
<div class="box tip"><b>ขั้นตอนทำโจทย์เลือก tense</b><br>① ขีดเส้นใต้คำบอกเวลา ② ถามว่าประโยคสื่อเจตนาอะไร ③ ดูว่าเหตุการณ์เป็นจุดหรือช่วง ④ ค่อยเลือกรูป</div>` },
  ]);

  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 3 · สรุปรวมและกับดัก" },

    { type: "h2", text: "3.1 ตารางเทียบทุกรูปในที่เดียว" },
    { type: "table", rows: [
      ["รูป", "โครงสร้าง", "ใช้เมื่อ", "ตัวอย่าง"],
      ["Past Simple", "S + V2", "จบแล้วในอดีต", "I went out."],
      ["Past Continuous", "S + was/were + V-ing", "กำลังทำอยู่ในอดีต", "I was going out."],
      ["will", "S + will + V1", "ตัดสินใจตอนพูด", "I will go out."],
      ["be going to", "S + is/am/are going to + V1", "วางแผนไว้ก่อน", "I am going to go out."],
      ["Present Continuous (อนาคต)", "S + is/am/are + V-ing", "นัดไว้แล้ว", "I am going out at 7."],
      ["Present Simple (อนาคต)", "S + V1", "ตารางทางการ", "The bus leaves at 7."],
      ["Future Continuous", "S + will be + V-ing", "กำลังทำ ณ เวลานั้น", "I will be going out."],
      ["Future Perfect", "S + will have + V3", "เสร็จก่อนเวลานั้น", "I will have gone out."],
      ["Future Perfect Continuous", "S + will have been + V-ing", "ทำมานานจนถึงเวลานั้น", "I will have been waiting for an hour."]
    ], detail: `<h3>อ่านตารางนี้เป็นแผนที่</h3>
<h4>แกนที่ 1 — เวลาไหน</h4>
<p>อดีต / ปัจจุบัน / อนาคต ตัดสินจากจุดอ้างอิงในประโยค</p>
<h4>แกนที่ 2 — มองเป็นจุดหรือช่วง</h4>
<div class="box"><b>simple</b> = มองเป็นจุด จบแล้วหรือจะจบ<br><b>continuous</b> = มองเป็นช่วงที่กำลังดำเนิน<br><b>perfect</b> = มองย้อนกลับจากจุดเวลาหนึ่งว่าเสร็จไปแล้ว<br><b>perfect continuous</b> = มองย้อนกลับแล้วเน้นว่าทำมานานเท่าไร</div>
<p>สองแกนนี้ประกอบกันได้ทุกช่องในตาราง ถ้าเข้าใจสองแกนก็ไม่ต้องท่องทีละรูป</p>` },

    { type: "h2", text: "3.2 กับดักที่เสียคะแนนบ่อยที่สุด" },
    { type: "p", html: "ห้าข้อนี้คือจุดที่นักเรียนพลาดซ้ำ ๆ ทุกปี — อ่านก่อนเข้าห้องสอบสัก 2 รอบ",
      detail: `<h3>เช็กลิสต์ก่อนส่งกระดาษ</h3>
<div class="box warn"><b>① did แล้วต้องช่อง 1</b><br>✗ Did you <b>went</b>? → ✓ Did you <b>go</b>?<br>✗ She didn't <b>came</b>. → ✓ She didn't <b>come</b>.</div>
<div class="box warn"><b>② หลัง if / when ห้ามใช้ will</b><br>✗ If it will rain… → ✓ If it <b>rains</b>…<br>เหตุผล: อนุประโยคเงื่อนไขและเวลาใช้รูปปัจจุบันแทนอนาคต</div>
<div class="box warn"><b>③ stative verb ไม่ใช้ continuous</b><br>✗ I am knowing / I was wanting → ✓ I <b>know</b> / I <b>wanted</b><br>กลุ่มนี้คือกริยาที่บอกสภาวะ ไม่ใช่การกระทำ</div>
<div class="box warn"><b>④ was กับ were สลับกัน</b><br>✗ They was playing → ✓ They <b>were</b> playing<br>✗ I were reading → ✓ I <b>was</b> reading</div>
<div class="box warn"><b>⑤ เลือกจากคำแปลแทนเจตนา</b><br>“จะ” ในภาษาไทยแปลได้ทั้ง will, be going to, present continuous<br>ต้องอ่านบริบทว่าตัดสินใจตอนไหน มีแผนอยู่แล้วไหม นัดไว้หรือยัง</div>
<h4>ฝึกด้วยตัวเอง 3 นาที</h4>
<p>เอาประโยคเดียว เช่น “ฉันไปโรงเรียน” แล้วเขียนให้ครบทั้ง 9 รูปในตาราง 3.1 พร้อมบอกว่าแต่ละรูปใช้ตอนไหน ถ้าทำได้โดยไม่เปิดโน้ต แปลว่าพร้อมสอบ</p>` },
  ]);
  STARTER_CONTENT[ID] = STARTER_CONTENT[ID].concat([
    { type: "divider" },
    { type: "h1", text: "บทที่ 4 · แบบฝึกคิดเร็ว" },
    { type: "callout", html: "ทำในใจก่อน แล้วค่อยกดเปิด<b>ข้อมูลแบบละเอียด</b>เพื่อดูเฉลยและเหตุผล — ติ๊กช่องหน้าข้อเมื่อทำได้แล้ว" },

    { type: "h2", text: "4.1 ฝึกแยก Past Simple กับ Past Continuous" },
    { type: "todo", html: "I ______ (read) a book when the lights ______ (go) out.",
      detail: `<h3>เฉลย</h3><p><b>was reading … went</b></p>
<p>อ่านหนังสือเป็นเหตุการณ์<b>ยาว</b> ไฟดับเป็นเหตุการณ์<b>สั้นที่แทรก</b>เข้ามา จึงเป็น continuous + simple</p>` },
    { type: "todo", html: "While we ______ (wait) for the bus, it ______ (start) to rain.",
      detail: `<h3>เฉลย</h3><p><b>were waiting … started</b></p>
<p>หลัง While ต้องเป็นเหตุการณ์ยาว จึงใช้ past continuous ส่วนฝนเริ่มตกเป็นจุดเดียว ใช้ past simple</p>` },
    { type: "todo", html: "She ______ (not / go) to school yesterday because she ______ (be) sick.",
      detail: `<h3>เฉลย</h3><p><b>didn't go … was</b></p>
<div class="box warn">ระวัง didn't go ไม่ใช่ didn't went — พอมี did แล้วกริยาต้องช่อง 1</div>` },
    { type: "todo", html: "What ______ you ______ (do) at 9 p.m. last night?",
      detail: `<h3>เฉลย</h3><p><b>were … doing</b></p>
<p>at 9 p.m. last night คือจุดเวลาหนึ่งในอดีต ถามว่ากำลังทำอะไรอยู่ จึงใช้ past continuous</p>` },

    { type: "h2", text: "4.2 ฝึกเลือกรูปอนาคต" },
    { type: "todo", html: "A: The bag looks heavy. &nbsp; B: Don't worry, I ______ carry it for you.",
      detail: `<h3>เฉลย</h3><p><b>will</b> (I'll carry it)</p>
<p>เพิ่งเห็นแล้วเสนอตัวช่วยตอนนั้นเลย = ตัดสินใจขณะพูด จึงใช้ will</p>` },
    { type: "todo", html: "I've already bought the tickets. We ______ (watch) the movie at 7 tonight.",
      detail: `<h3>เฉลย</h3><p><b>are watching</b></p>
<p>ซื้อตั๋วแล้ว = นัดหมายที่จัดไว้เรียบร้อย จึงใช้ present continuous เพื่ออนาคต · ตอบ are going to watch ก็พอรับได้ แต่ present continuous ตรงเจตนากว่า</p>` },
    { type: "todo", html: "Look at that car! It ______ (crash) into the wall!",
      detail: `<h3>เฉลย</h3><p><b>is going to crash</b></p>
<div class="box why">มีหลักฐานเห็นอยู่ตรงหน้า = be going to · ถ้าใช้ will จะกลายเป็นการเดาลอย ๆ ซึ่งไม่ตรงกับสถานการณ์</div>` },
    { type: "todo", html: "The train ______ (leave) at 6:45 every morning.",
      detail: `<h3>เฉลย</h3><p><b>leaves</b></p>
<p>ตารางเดินรถเป็นสิ่งที่องค์กรกำหนดไว้ ใช้ present simple</p>` },
    { type: "todo", html: "By the time you arrive, I ______ (finish) cooking.",
      detail: `<h3>เฉลย</h3><p><b>will have finished</b></p>
<p>By the time = ก่อนถึงจุดเวลานั้นจะเสร็จแล้ว → future perfect</p>` },
    { type: "todo", html: "This time tomorrow I ______ (fly) to Japan.",
      detail: `<h3>เฉลย</h3><p><b>will be flying</b></p>
<p>This time tomorrow คือจุดเวลาหนึ่งในอนาคต และกำลังทำอยู่พอดี → future continuous</p>` },

    { type: "h2", text: "4.3 ฝึกจับผิดประโยค" },
    { type: "todo", html: "หาที่ผิด: “If it will rain tomorrow, we will cancel the trip.”",
      detail: `<h3>เฉลย</h3><p>ผิดที่ <b>If it will rain</b> → ต้องเป็น <b>If it rains</b></p>
<div class="box warn">อนุประโยคหลัง if / when / as soon as / before / after ที่บอกเงื่อนไขหรือเวลา ใช้รูปปัจจุบันแทนอนาคตเสมอ ส่วนประโยคหลักใช้ will ได้ตามปกติ</div>` },
    { type: "todo", html: "หาที่ผิด: “I was knowing the answer but I forgot it.”",
      detail: `<h3>เฉลย</h3><p>ผิดที่ <b>was knowing</b> → ต้องเป็น <b>knew</b></p>
<p>know เป็น stative verb บอกสภาวะไม่ใช่การกระทำ จึงไม่ใช้รูป continuous · กลุ่มเดียวกัน: like, love, want, need, believe, understand, seem, belong</p>` },
    { type: "todo", html: "หาที่ผิด: “They was playing football when I called them.”",
      detail: `<h3>เฉลย</h3><p>ผิดที่ <b>They was</b> → ต้องเป็น <b>They were</b></p>
<p>they / we / you ใช้ were เสมอ · I / he / she / it ใช้ was</p>` },
    { type: "todo", html: "หาที่ผิด: “Did she went to the party last night?”",
      detail: `<h3>เฉลย</h3><p>ผิดที่ <b>Did she went</b> → ต้องเป็น <b>Did she go</b></p>
<div class="box tip">กฎเดียวที่ต้องจำ: มี did/didn't เมื่อไร กริยาหลักกลับเป็นช่อง 1 ทันที เพราะ did แบกความเป็นอดีตไว้หมดแล้ว</div>` },
  ]);

  STARTER_DIAGRAM[ID] = [
    { id: "ttl", t: "x", x: 40, y: 20, w: 700, html: "Past Tenses &amp; Future Forms", size: 34, bold: true, c: "auto" },
    { id: "lb1", t: "x", x: 60, y: 66, w: 250, html: "บทที่ 1 · อดีต", size: 15, bold: true, c: "#3b7ddd" },
    { id: "lb2", t: "x", x: 400, y: 66, w: 250, html: "บทที่ 2 · อนาคต", size: 15, bold: true, c: "#2e9e6b" },
    { id: "lb3", t: "x", x: 740, y: 66, w: 250, html: "บทที่ 2 · อนาคตขั้นสูง", size: 15, bold: true, c: "#7c5cd6" },
    { id: "lb4", t: "x", x: 1080, y: 66, w: 250, html: "บทที่ 3 · สรุปและกับดัก", size: 15, bold: true, c: "#d98324" },

    { id: "a0", t: "c", x: 60, y: 100, w: 250, c: "#3b7ddd",
      title: "1.1 Past Simple",
      body: "S + V2 — เกิดแล้ว<b>จบแล้ว</b> เป็นจุดบนเส้นเวลา",
      detail: `<h3>Past Simple</h3>` + SVG_PASTSIMPLE + `
<div class="box warn">พอมี did/didn't แล้ว กริยาต้องกลับเป็นช่อง 1 เสมอ</div>
<p>คำที่มาคู่: yesterday · last night · two days ago · in 2019</p>` },

    { id: "a1", t: "c", x: 60, y: 280, w: 250, c: "#3b7ddd",
      title: "1.2 Past Continuous",
      body: "was/were + V-ing — <b>กำลังทำอยู่</b> ณ เวลาหนึ่งในอดีต",
      detail: `<h3>Past Continuous</h3>` + SVG_PASTCONT + `
<div class="box">I/he/she/it → was · you/we/they → were</div>
<div class="box warn">stative verbs (know, like, want, believe) ไม่ใช้รูป continuous</div>` },

    { id: "a2", t: "c", x: 60, y: 460, w: 250, c: "#3b7ddd",
      title: "1.3 สั้นตัดยาว",
      body: "ยาว = continuous · สั้นที่แทรก = simple<br>when / while",
      detail: `<h3>Past Simple ตัด Past Continuous</h3>` + SVG_WHENWHILE + `
<div class="box why">When I arrived, she <b>made</b> coffee = มาถึงก่อนแล้วค่อยชง<br>When I arrived, she <b>was making</b> coffee = ชงอยู่ก่อนแล้ว</div>` },

    { id: "a3", t: "c", x: 60, y: 640, w: 250, c: "#3b7ddd",
      title: "1.4 กฎการเติมและกริยาช่อง 2",
      body: "-ed · -ing · irregular verbs ที่เจอบ่อย",
      detail: `<h3>กฎการเติมและกริยาไม่ปกติ</h3>
<table><tr><th>กรณี</th><th>กฎ</th><th>ตัวอย่าง</th></tr>
<tr><td>พยัญชนะ + y</td><td>y → i + ed</td><td>study → studied</td></tr>
<tr><td>พยางค์เดียว สระเดียว</td><td>ซ้ำตัวท้าย</td><td>stop → stopped · run → running</td></tr>
<tr><td>ลงท้าย e</td><td>ตัด e ก่อนเติม -ing</td><td>make → making</td></tr></table>
<div class="box tip">กลุ่มไม่เปลี่ยนเลย: put · cut · hit · let · cost · read</div>` },

    { id: "b0", t: "c", x: 400, y: 100, w: 250, c: "#2e9e6b",
      title: "2.1 เลือกรูปจากเจตนา",
      body: "คำบอกเวลาเป็นแค่เบาะแส <b>เจตนา</b>ต่างหากที่ตัดสิน",
      detail: `<h3>แผนที่รูปอนาคต</h3>` + SVG_FUTUREMAP + `
<div class="box why">tomorrow ใช้ได้กับเกือบทุกรูป ต้องดูว่าประโยคสื่อว่าเพิ่งตัดสินใจ วางแผนไว้ หรือได้นัดไว้แล้ว</div>` },

    { id: "b1", t: "c", x: 400, y: 280, w: 250, c: "#2e9e6b",
      title: "2.2 will",
      body: "ตัดสินใจตอนพูด · สัญญา · เสนอตัว · เดาลอย ๆ",
      detail: `<h3>will + V1</h3>
<table><tr><th>ใช้กับ</th><th>ตัวอย่าง</th></tr>
<tr><td>ตัดสินใจทันที</td><td>I'll close the window.</td></tr>
<tr><td>สัญญา</td><td>I won't be late again.</td></tr>
<tr><td>เดาจากความเห็น</td><td>I think our team will win.</td></tr></table>
<div class="box warn">หลัง if / when ห้ามใช้ will → If it <b>rains</b>, I'll stay home.</div>` },

    { id: "b2", t: "c", x: 400, y: 460, w: 250, c: "#2e9e6b",
      title: "2.3 be going to",
      body: "แผนที่มีอยู่ก่อน · เดาจาก<b>หลักฐานที่เห็น</b>",
      detail: `<h3>be going to</h3>` + SVG_WILLGOING + `
<div class="box tip">Look at those clouds — it's going to rain. (มีหลักฐาน)<br>I think it will rain tomorrow. (เดาเฉย ๆ)</div>` },

    { id: "b3", t: "c", x: 400, y: 640, w: 250, c: "#2e9e6b",
      title: "2.4 ปัจจุบันที่พูดถึงอนาคต",
      body: "present continuous = นัดไว้แล้ว<br>present simple = ตารางทางการ",
      detail: `<h3>ใครเป็นคนกำหนดเวลา</h3>
<table><tr><th>ประโยค</th><th>ใครกำหนด</th></tr>
<tr><td>I'm meeting John at 6.</td><td>เรานัดเอง → present continuous</td></tr>
<tr><td>The meeting starts at 6.</td><td>บริษัทกำหนด → present simple</td></tr></table>` },

    { id: "c0", t: "c", x: 740, y: 100, w: 250, c: "#7c5cd6",
      title: "2.5 Future Continuous",
      body: "will be + V-ing — <b>กำลังทำอยู่พอดี</b> ณ เวลานั้น",
      detail: `<h3>สามรูปอนาคตขั้นสูง</h3>` + SVG_FUTPERF + `
<div class="box">At 8 p.m. tomorrow I will be eating dinner.</div>` },

    { id: "c1", t: "c", x: 740, y: 280, w: 250, c: "#7c5cd6",
      title: "2.5 Future Perfect",
      body: "will have + V3 — <b>เสร็จก่อน</b>ถึงเวลานั้น",
      detail: `<h3>Future Perfect</h3>
<p class="frm">by + เวลา → นึกถึง future perfect ก่อนเสมอ</p>
<div class="box">I will have finished my homework <b>by</b> 8 p.m.<br>By next year she will have graduated.</div>` },

    { id: "c2", t: "c", x: 740, y: 460, w: 250, c: "#7c5cd6",
      title: "2.5 Future Perfect Continuous",
      body: "will have been + V-ing — เน้น<b>ระยะเวลา</b>จนถึงจุดนั้น",
      detail: `<h3>Future Perfect Continuous</h3>
<div class="box">By June I will have been working here <b>for</b> two years.</div>
<div class="box tip">ต่างจาก future perfect ตรงที่อันนี้เน้นว่า<b>ทำมานานแค่ไหน</b> ไม่ใช่ว่าเสร็จหรือยัง</div>` },

    { id: "c3", t: "c", x: 740, y: 640, w: 250, c: "#7c5cd6",
      title: "2.6 Time expressions",
      body: "at + เวลา → continuous<br>by + เวลา → perfect",
      detail: `<h3>คำบอกเวลาที่ต้องจำ</h3>` + SVG_TIMEEXPR + `
<div class="box warn">by Friday = ภายในวันศุกร์ · until Friday = ต่อเนื่องไปจนถึงวันศุกร์ — คนละความหมาย</div>` },

    { id: "d0", t: "c", x: 1080, y: 100, w: 250, c: "#d98324",
      title: "3.1 สองแกนที่ประกอบเป็นทุก tense",
      body: "แกนเวลา × แกนมุมมอง (simple/continuous/perfect)",
      detail: `<h3>เข้าใจสองแกน ไม่ต้องท่อง 9 รูป</h3>
<div class="box"><b>simple</b> = จุด · <b>continuous</b> = ช่วงที่กำลังดำเนิน<br><b>perfect</b> = มองย้อนจากจุดเวลาหนึ่งว่าเสร็จแล้ว<br><b>perfect continuous</b> = มองย้อนแล้วเน้นระยะเวลา</div>` },

    { id: "d1", t: "c", x: 1080, y: 280, w: 250, c: "#d98324",
      title: "3.2 กับดัก 5 ข้อ",
      body: "did + ช่อง 1 · ห้าม will หลัง if/when · stative verbs",
      detail: `<h3>ห้าข้อที่พลาดซ้ำทุกปี</h3>
<div class="box warn">① Did you <b>go</b>? ไม่ใช่ Did you went?<br>② If it <b>rains</b>, I'll stay. ไม่ใช่ If it will rain<br>③ I <b>know</b> ไม่ใช่ I am knowing<br>④ They <b>were</b> / I <b>was</b><br>⑤ อย่าเลือกรูปจากคำแปลว่า "จะ" ให้ดูเจตนา</div>` },

    { id: "n1", t: "n", a: { id: "a0" }, b: { id: "a1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n2", t: "n", a: { id: "a1" }, b: { id: "a2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n3", t: "n", a: { id: "a0" }, b: { id: "a3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n4", t: "n", a: { id: "b0" }, b: { id: "b1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n5", t: "n", a: { id: "b0" }, b: { id: "b2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n6", t: "n", a: { id: "b0" }, b: { id: "b3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n7", t: "n", a: { id: "c0" }, b: { id: "c1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n8", t: "n", a: { id: "c1" }, b: { id: "c2" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n9", t: "n", a: { id: "c2" }, b: { id: "c3" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "n10", t: "n", a: { id: "d0" }, b: { id: "d1" }, c: "auto", w: 2, arrow: "end", route: "e" },
    { id: "x1", t: "n", a: { id: "b0" }, b: { id: "c0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x2", t: "n", a: { id: "a2" }, b: { id: "d0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 },
    { id: "x3", t: "n", a: { id: "c3" }, b: { id: "d0" }, c: "#8a8a8a", w: 1.5, arrow: "end", route: "s", dash: 6 }
  ];
})();
