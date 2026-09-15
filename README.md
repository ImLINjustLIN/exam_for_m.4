# ห้องเรียนรวม — เว็บสรุปเนื้อหา 7 วิชา

เว็บไซต์แบบ static (HTML/CSS/JS ล้วน) เปิดใช้ฟรีบน GitHub Pages
ทุกคนเข้าใช้ได้ และ **สมุดจดของแต่ละคนแยกขาดจากกัน**

## โครงสร้างไฟล์
```
index.html          หน้าเว็บหลัก
css/styles.css      หน้าตา / สี / โหมดมืด
js/config.js        ← แก้ชื่อวิชา หัวข้อ สี และใส่คีย์ฐานข้อมูลที่ไฟล์นี้
js/storage.js       ระบบบันทึก (ฐานข้อมูล + สำรองในเครื่อง)
js/app.js           การทำงานของหน้าเว็บและสมุดจด
.nojekyll           บอก GitHub Pages ไม่ต้องประมวลผลด้วย Jekyll
```

## วิชาและหัวข้อ
| # | วิชา | หลัก | เสริม (Slot) |
|---|------|------|--------------|
| 1 | ไทย | ไทย | — |
| 2 | สังคมศึกษา | สังคมศึกษา | — |
| 3 | เคมี | วิทย์กายภาพ(เคมี) | โครงสร้างอะตอม |
| 4 | ฟิสิกส์ | ธรณีวิทยา/โลกและอวกาศ | กลศาสตร์ |
| 5 | ชีวะ | ชีววิทยาหลัก | เซลล์ของสิ่งมีชีวิต |
| 6 | คณิต | เซตและตรรกศาสตร์ | จำนวนจริงและพหุนาม |
| 7 | อังกฤษ | อังกฤษ | — |

วิชาที่มีแค่ "หลัก" จะเข้าสมุดจดทันทีโดยไม่ต้องเลือก

## การตั้งค่าฐานข้อมูล (Supabase — ฟรี)
1. สร้างโปรเจกต์ที่ supabase.com
2. ไปที่ **SQL Editor** แล้วรันคำสั่งนี้:

```sql
create table if not exists public.notes (
  user_id   uuid        not null references auth.users(id) on delete cascade,
  topic_id  text        not null,
  doc       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

alter table public.notes enable row level security;

create policy "อ่านได้เฉพาะของตัวเอง"  on public.notes for select using (auth.uid() = user_id);
create policy "เพิ่มได้เฉพาะของตัวเอง" on public.notes for insert with check (auth.uid() = user_id);
create policy "แก้ได้เฉพาะของตัวเอง"   on public.notes for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ลบได้เฉพาะของตัวเอง"    on public.notes for delete using (auth.uid() = user_id);
```

3. คัดลอก **Project URL** และ **anon public key** จาก Settings → API
   มาใส่ใน `js/config.js` ที่ตัวแปร `SUPABASE_URL` และ `SUPABASE_ANON_KEY`
4. ที่ **Authentication → URL Configuration** ใส่ที่อยู่เว็บ GitHub Pages ลงใน Site URL

> RLS (Row Level Security) คือสิ่งที่ทำให้ผู้ใช้คนหนึ่ง **อ่านหรือแก้สมุดจดของคนอื่นไม่ได้เลย**
> anon key เป็นคีย์สาธารณะ ปลอดภัยที่จะใส่ในโค้ดหน้าเว็บ

ถ้ายังไม่ได้ใส่คีย์ เว็บยังใช้งานได้ปกติ แต่จะบันทึกไว้ในเบราว์เซอร์ของเครื่องนั้นเท่านั้น

## การนำขึ้น GitHub Pages
1. สร้าง repository ใหม่ (public)
2. อัปโหลดไฟล์ทั้งหมดนี้ขึ้นไปที่ branch `main`
3. Settings → Pages → Source = `Deploy from a branch` → `main` / `(root)` → Save
4. รอ 1–2 นาที จะได้ลิงก์ `https://<ชื่อผู้ใช้>.github.io/<ชื่อ repo>/`

## การเติมเนื้อหาวิชาในภายหลัง
ใส่ไว้ที่ `STARTER_CONTENT` ใน `js/config.js` เช่น
```js
const STARTER_CONTENT = {
  chem_slot: [
    { type: "h1", text: "โครงสร้างอะตอม" },
    { type: "p",  text: "อะตอมประกอบด้วย..." },
    { type: "callout", text: "จุดที่ออกสอบบ่อย: ..." }
  ]
};
```
เนื้อหานี้จะขึ้นให้ผู้ใช้ที่ยังไม่เคยเขียนอะไรในหน้านั้น และผู้ใช้แก้ไข/เพิ่มต่อได้ตามใจ
