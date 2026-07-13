// data/modules/level-6-database.ts
//
// LEVEL 6 — Database (SQL)
// 10 theory + 1 practical + 1 quiz = 12 sections

import type { Module } from "../lessons";

export const LEVEL_6: Module = {
  id: "database-sql",
  icon: "🗄️",
  title: "Level 6 — Ma'lumotlar bazasi (SQL)",
  summary:
    "SQL asoslari: ma'lumot olish, filtrlash, birlashtirish va guruhlash. QA uchun ma'lumotni bevosita tekshirish quroli.",
  level: "junior",
  sections: [
    {
      id: "l6-01-sql-basics",
      title: "SQL asoslari — QA nega bilishi kerak",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "SQL (Structured Query Language) — ma'lumotlar bazasi bilan muloqot tili. QA uchun bu — UI aytganini bevosita tekshirish quroli." },
        { type: "h", text: "QA SQL'ni nima uchun ishlatadi" },
        { type: "table", head: ["Vazifa", "Misol"], rows: [
          ["Ma'lumotni tasdiqlash", "UI 'buyurtma yaratildi' dedi — bazada haqiqatan bormi?"],
          ["Test ma'lumoti tayyorlash", "Test uchun kerakli holatdagi foydalanuvchi topish"],
          ["Bug'ni chuqurroq tushunish", "Ma'lumot noto'g'ri saqlanyaptimi yoki noto'g'ri ko'rsatilyaptimi?"],
          ["Ma'lumot yaxlitligi", "O'chirilgan buyurtmaning tafsilotlari ham o'chdimi?"],
        ]},
        { type: "example", text: "Klassik holat:\n\nUI: 'Buyurtma muvaffaqiyatli yaratildi ✅'\nSiz bazani tekshirasiz: SELECT * FROM orders WHERE user_id = 5;\nNatija: 0 qator.\n\n→ UI yolg'on aytyapti! Bu jiddiy bug. SQL bilmасangiz, buni topa olmasdingiz." },
        { type: "h", text: "Asosiy tushunchalar" },
        { type: "table", head: ["Termin", "Ma'nosi"], rows: [
          ["Table (jadval)", "Ma'lumot saqlanadigan tuzilma (users, orders)"],
          ["Row (qator)", "Bitta yozuv (bitta foydalanuvchi)"],
          ["Column (ustun)", "Maydon (id, name, email)"],
          ["Primary Key", "Noyob identifikator (odatda id)"],
          ["Foreign Key", "Boshqa jadvalga havola (orders.user_id → users.id)"],
        ]},
        { type: "key", text: "SQL — QA'ning ma'lumotni bevosita tekshirish quroli. UI aytganini bazada tasdiqlash imkonini beradi." },
      ],
    },

    {
      id: "l6-02-select",
      title: "SELECT — ma'lumot olish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "SELECT — SQL'ning eng ko'p ishlatiladigan buyrug'i. QA ishining 90% i aynan SELECT bilan bajariladi (ma'lumotni o'qish, o'zgartirmaslik)." },
        { type: "h", text: "Asosiy tuzilma" },
        { type: "code", text: `SELECT ustunlar
FROM jadval
WHERE shart
ORDER BY ustun
LIMIT son;` },
        { type: "h", text: "Misollar" },
        { type: "code", text: `-- Barcha foydalanuvchilar (hamma ustun)
SELECT * FROM users;

-- Faqat kerakli ustunlar
SELECT id, name, email FROM users;

-- Shart bilan
SELECT * FROM users WHERE active = true;

-- Bir necha shart
SELECT * FROM users
WHERE active = true AND city = 'Toshkent';

-- Saralash va cheklash
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 10;` },
        { type: "h", text: "WHERE shartlari" },
        { type: "table", head: ["Operator", "Ma'nosi", "Misol"], rows: [
          ["=", "Teng", "WHERE id = 5"],
          ["!= yoki <>", "Teng emas", "WHERE status != 'deleted'"],
          [">, <, >=, <=", "Taqqoslash", "WHERE price > 100000"],
          ["LIKE", "Naqsh bo'yicha", "WHERE email LIKE '%@gmail.com'"],
          ["IN", "Ro'yxatda", "WHERE status IN ('new', 'paid')"],
          ["BETWEEN", "Oraliqda", "WHERE age BETWEEN 18 AND 60"],
          ["IS NULL", "Bo'sh", "WHERE phone IS NULL"],
          ["AND / OR / NOT", "Mantiqiy", "WHERE active = true AND city = 'Toshkent'"],
        ]},
        { type: "warn", text: "QA sifatida asosan SELECT ishlatasiz — u ma'lumotni O'ZGARTIRMAYDI, faqat o'qiydi. Bu xavfsiz." },
        { type: "key", text: "SELECT ustunlar FROM jadval WHERE shart. QA ishining asosiy quroli — xavfsiz, faqat o'qiydi." },
      ],
    },

    {
      id: "l6-03-insert",
      title: "INSERT — ma'lumot qo'shish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "INSERT — bazaga yangi qator qo'shish. QA buni asosan TEST MA'LUMOTI tayyorlash uchun ishlatadi." },
        { type: "code", text: `-- Yangi foydalanuvchi qo'shish
INSERT INTO users (name, email, active)
VALUES ('Test User', 'qa_test@mail.com', true);

-- Bir necha qator
INSERT INTO users (name, email, active) VALUES
  ('Test 1', 'test1@mail.com', true),
  ('Test 2', 'test2@mail.com', false);` },
        { type: "h", text: "QA qachon ishlatadi" },
        { type: "list", items: [
          "Test uchun kerakli holatdagi ma'lumot yaratish",
          "UI orqali yaratib bo'lmaydigan holat (masalan eskirgan buyurtma)",
          "Ko'p ma'lumot kerak bo'lganda (100 ta test buyurtma)",
          "Chegara holatlari uchun (juda uzun matn, maxsus belgilar)",
        ]},
        { type: "warn", text: "EHTIYOT BO'LING: INSERT bazani O'ZGARTIRADI. Faqat TEST bazasida ishlating, hech qachon production'da emas. Va test ma'lumotini keyin tozalang." },
        { type: "tip", text: "Test ma'lumotini ajratib qo'ying: email'ga 'qa_test_' prefiksi qo'ying. Keyin ularni oson topib o'chirasiz." },
        { type: "key", text: "INSERT — yangi qator qo'shish. QA test ma'lumoti tayyorlash uchun ishlatadi. Faqat test bazasida!" },
      ],
    },

    {
      id: "l6-04-update",
      title: "UPDATE — ma'lumot o'zgartirish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "UPDATE — mavjud qatorni o'zgartirish. QA buni test holatini tayyorlash uchun ishlatadi (masalan foydalanuvchini admin qilish)." },
        { type: "code", text: `-- Bitta foydalanuvchini o'zgartirish
UPDATE users
SET active = false
WHERE id = 5;

-- Bir necha maydon
UPDATE users
SET role = 'admin', updated_at = NOW()
WHERE email = 'qa_test@mail.com';` },
        { type: "warn", text: "⚠️ ENG XAVFLI XATO: WHERE'ni unutish!\n\nUPDATE users SET active = false;\n\nBu BARCHA foydalanuvchini nofaol qiladi! Har doim WHERE yozing va avval SELECT bilan tekshiring." },
        { type: "h", text: "Xavfsiz ish usuli" },
        { type: "code", text: `-- 1-QADAM: avval SELECT bilan tekshiring
SELECT * FROM users WHERE id = 5;
-- Nechta qator? To'g'ri qatormi?

-- 2-QADAM: keyin UPDATE
UPDATE users SET active = false WHERE id = 5;

-- 3-QADAM: natijani tekshiring
SELECT * FROM users WHERE id = 5;` },
        { type: "key", text: "UPDATE — o'zgartirish. WHERE'ni HECH QACHON unutmang. Avval SELECT bilan tekshiring, keyin UPDATE." },
      ],
    },

    {
      id: "l6-05-delete",
      title: "DELETE — ma'lumot o'chirish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "DELETE — qatorni o'chirish. Eng xavfli buyruq — qaytarib bo'lmaydi (agar backup bo'lmasa)." },
        { type: "code", text: `-- Bitta qatorni o'chirish
DELETE FROM users WHERE id = 5;

-- Test ma'lumotlarini tozalash
DELETE FROM users WHERE email LIKE 'qa_test_%';` },
        { type: "warn", text: "⚠️ HALOKATLI XATO:\n\nDELETE FROM users;\n\nWHERE'siz — BARCHA foydalanuvchi o'chadi! Bu qaytarib bo'lmaydigan xato. Har doim WHERE yozing." },
        { type: "h", text: "Soft delete va Hard delete" },
        { type: "table", head: ["Tur", "Nima bo'ladi", "QA tekshiradi"], rows: [
          ["Hard delete", "Qator bazadan butunlay o'chadi", "SELECT bilan yo'qligini tasdiqlash"],
          ["Soft delete", "deleted_at maydoni to'ldiriladi, qator qoladi", "UI'da ko'rinmasligi, lekin bazada borligi"],
        ]},
        { type: "example", text: "QA testi: UI'da buyurtmani o'chirdingiz.\n\nSoft delete bo'lsa:\nSELECT * FROM orders WHERE id = 10;\n→ Qator bor, lekin deleted_at to'ldirilgan ✅\n\nHard delete bo'lsa:\nSELECT * FROM orders WHERE id = 10;\n→ 0 qator ✅\n\nQaysi biri to'g'ri — talabga bog'liq. Lekin ikkalasida ham UI'da ko'rinmasligi kerak." },
        { type: "key", text: "DELETE — o'chirish. WHERE'siz halokat. Soft delete (belgilanadi) va hard delete (o'chadi) farqini bilib oling." },
      ],
    },

    {
      id: "l6-06-join",
      title: "JOIN — jadvallarni birlashtirish",
      type: "theory",
      minutes: 15,
      body: [
        { type: "p", text: "JOIN — bir necha jadvaldagi bog'liq ma'lumotni birga olish. Bu SQL'ning eng kuchli va QA uchun eng foydali imkoniyati." },
        { type: "h", text: "Nega kerak" },
        { type: "p", text: "Ma'lumot turli jadvalda saqlanadi: foydalanuvchilar — `users`, buyurtmalar — `orders`. 'Ali qanday buyurtma bergan?' degan savolga javob berish uchun ikkalasini birlashtirish kerak." },
        { type: "h", text: "INNER JOIN — eng ko'p ishlatiladigan" },
        { type: "code", text: `-- Har buyurtma va uning egasi
SELECT
  orders.id,
  orders.total,
  users.name,
  users.email
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- Faqat IKKALA jadvalda ham mos keladigan qatorlar qaytadi` },
        { type: "h", text: "JOIN turlari" },
        { type: "table", head: ["Tur", "Nima qaytaradi"], rows: [
          ["INNER JOIN", "Faqat ikkala jadvalda ham mos keladigan qatorlar"],
          ["LEFT JOIN", "Chap jadvalning HAMMA qatori + o'ngdan mos kelganlari (mos kelmasa NULL)"],
          ["RIGHT JOIN", "O'ng jadvalning hamma qatori + chapdan mos kelganlari"],
          ["FULL JOIN", "Ikkala jadvalning hamma qatori"],
        ]},
        { type: "h", text: "LEFT JOIN — QA uchun juda foydali" },
        { type: "example", text: "Savol: 'Hech qanday buyurtma bermagan foydalanuvchilar bormi?'\n\nSELECT users.name, orders.id\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id\nWHERE orders.id IS NULL;\n\n→ Buyurtmasiz foydalanuvchilarni topadi (orders.id NULL bo'ladi).\n\nBu 'yetim ma'lumot' (orphan data) topishning klassik usuli." },
        { type: "tip", text: "QA uchun LEFT JOIN + IS NULL — ma'lumot yaxlitligini tekshirishning eng yaxshi usuli. Masalan: egasi o'chirilgan buyurtmalar bormi?" },
        { type: "key", text: "JOIN — jadvallarni birlashtirish. INNER = faqat mos kelganlar. LEFT = chapning hammasi. LEFT+IS NULL = yetim ma'lumot topish." },
      ],
    },

    {
      id: "l6-07-group-by",
      title: "GROUP BY — guruhlash",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "GROUP BY — qatorlarni guruhlab, har guruh uchun hisob-kitob qilish. Masalan: 'Har foydalanuvchi nechta buyurtma bergan?'" },
        { type: "code", text: `-- Har foydalanuvchi nechta buyurtma bergan
SELECT user_id, COUNT(*) AS buyurtmalar_soni
FROM orders
GROUP BY user_id;

-- Har shahar bo'yicha foydalanuvchilar soni
SELECT city, COUNT(*) AS soni
FROM users
GROUP BY city
ORDER BY soni DESC;` },
        { type: "h", text: "HAVING — guruhlarni filtrlash" },
        { type: "p", text: "WHERE qatorlarni filtrlaydi, HAVING esa GURUHLARNI filtrlaydi (guruhlashdan keyin)." },
        { type: "code", text: `-- 5 tadan ko'p buyurtma bergan foydalanuvchilar
SELECT user_id, COUNT(*) AS soni
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;` },
        { type: "h", text: "QA uchun foydali so'rovlar" },
        { type: "code", text: `-- Takroriy email bormi? (bu bug bo'lishi mumkin!)
SELECT email, COUNT(*) AS soni
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Har status bo'yicha buyurtmalar soni
SELECT status, COUNT(*) AS soni
FROM orders
GROUP BY status;` },
        { type: "tip", text: "'Takroriy email' so'rovi — QA'ning klassik tekshiruvi. Agar natija bo'sh bo'lmasa, tizimda takroriy hisob yaratish bug'i bor." },
        { type: "key", text: "GROUP BY — guruhlash + hisob. HAVING — guruhlarni filtrlash. Takroriy ma'lumot topish uchun juda foydali." },
      ],
    },

    {
      id: "l6-08-order-by",
      title: "ORDER BY — saralash",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "ORDER BY — natijalarni saralash. Oddiy, lekin QA uchun muhim: UI'dagi saralash bazadagi ma'lumotga mos keladimi?" },
        { type: "code", text: `-- O'sish tartibida (ASC — sukut bo'yicha)
SELECT * FROM products ORDER BY price ASC;

-- Kamayish tartibida
SELECT * FROM products ORDER BY price DESC;

-- Bir necha ustun bo'yicha
SELECT * FROM users
ORDER BY city ASC, name ASC;

-- Eng yangi 10 ta buyurtma
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 10;` },
        { type: "h", text: "QA test g'oyasi" },
        { type: "example", text: "UI'da mahsulotlarni narx bo'yicha saraladingiz.\n\nBazada tekshiring:\nSELECT id, name, price FROM products ORDER BY price ASC;\n\nUI'dagi tartib bazadagiga mos keladimi?\n\nAgar UI'da 1, 10, 100, 2, 20 bo'lsa, lekin bazada 1, 2, 10, 20, 100 bo'lsa → frontend bug'i (raqam matn kabi saralanmoqda)." },
        { type: "tip", text: "NULL qiymatlar qayerga tushadi? Ba'zi bazalarda boshida, ba'zilarida oxirida. UI'da izchil bo'lishi kerak." },
        { type: "key", text: "ORDER BY — saralash (ASC/DESC). QA UI saralashini baza bilan solishtiradi." },
      ],
    },

    {
      id: "l6-09-aggregate-functions",
      title: "Aggregate Functions",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Agregat funksiyalar — ko'p qatordan bitta natija hisoblaydi. QA ularni ma'lumot to'g'riligini tekshirish uchun ishlatadi." },
        { type: "table", head: ["Funksiya", "Nima qiladi", "Misol"], rows: [
          ["COUNT()", "Qatorlar sonini sanaydi", "COUNT(*) — nechta buyurtma"],
          ["SUM()", "Yig'indi", "SUM(total) — jami savdo"],
          ["AVG()", "O'rtacha", "AVG(price) — o'rtacha narx"],
          ["MIN()", "Eng kichik", "MIN(price) — eng arzon"],
          ["MAX()", "Eng katta", "MAX(price) — eng qimmat"],
        ]},
        { type: "code", text: `-- Jami foydalanuvchilar soni
SELECT COUNT(*) FROM users;

-- Faol foydalanuvchilar soni
SELECT COUNT(*) FROM users WHERE active = true;

-- Jami savdo summasi
SELECT SUM(total) AS jami_savdo FROM orders;

-- Statistika birga
SELECT
  COUNT(*)   AS buyurtmalar,
  SUM(total) AS jami,
  AVG(total) AS ortacha,
  MIN(total) AS eng_kichik,
  MAX(total) AS eng_katta
FROM orders;` },
        { type: "h", text: "QA test g'oyalari" },
        { type: "example", text: "UI'da: 'Jami savdo: 15 000 000 so'm'\n\nBazada tekshiring:\nSELECT SUM(total) FROM orders WHERE status = 'paid';\n\nAgar raqamlar mos kelmasa — hisob-kitob bug'i.\n\nEhtimoliy sabablar: bekor qilingan buyurtmalar ham hisoblanmoqda, yoki chegirma hisobga olinmagan." },
        { type: "warn", text: "COUNT(*) va COUNT(ustun) farq qiladi! COUNT(*) — barcha qator. COUNT(email) — email NULL bo'lmagan qatorlar. Bu farq bug topishga yordam beradi." },
        { type: "key", text: "COUNT, SUM, AVG, MIN, MAX — hisob-kitob. UI'dagi statistikani baza bilan solishtiring." },
      ],
    },

    {
      id: "l6-10-qa-sql-tasks",
      title: "QA uchun amaliy SQL so'rovlari",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Bu darsda QA kundalik ishida eng ko'p ishlatadigan SQL so'rovlarini to'playmiz. Ularni saqlab qo'ying — bu sizning 'shpargalkangiz'." },
        { type: "h", text: "1. Ma'lumot yaratilganini tasdiqlash" },
        { type: "code", text: `-- UI 'buyurtma yaratildi' dedi. Bazada bormi?
SELECT * FROM orders
WHERE user_id = 5
ORDER BY created_at DESC
LIMIT 1;` },
        { type: "h", text: "2. Takroriy ma'lumot topish (bug!)" },
        { type: "code", text: `-- Takroriy email bormi?
SELECT email, COUNT(*) AS soni
FROM users
GROUP BY email
HAVING COUNT(*) > 1;` },
        { type: "h", text: "3. Yetim ma'lumot topish (bug!)" },
        { type: "code", text: `-- Egasi mavjud bo'lmagan buyurtmalar
SELECT o.id, o.user_id
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;` },
        { type: "h", text: "4. Bo'sh majburiy maydonlar (bug!)" },
        { type: "code", text: `-- Email bo'sh foydalanuvchilar (email majburiy bo'lishi kerak edi)
SELECT * FROM users WHERE email IS NULL OR email = '';` },
        { type: "h", text: "5. Mantiqan noto'g'ri ma'lumot (bug!)" },
        { type: "code", text: `-- Manfiy narx yoki miqdor
SELECT * FROM products WHERE price < 0;
SELECT * FROM order_items WHERE quantity <= 0;

-- Kelajakdagi sana (yaratilish sanasi kelajakdami?)
SELECT * FROM orders WHERE created_at > NOW();` },
        { type: "h", text: "6. Test ma'lumotini tozalash" },
        { type: "code", text: `-- Test foydalanuvchilarini o'chirish
DELETE FROM users WHERE email LIKE 'qa_test_%';` },
        { type: "tip", text: "Bu so'rovlarni saqlab qo'ying. Har yangi loyihada jadval nomlarini almashtirib ishlatasiz. Bu — QA'ning 'ma'lumot sifati' tekshiruvi." },
        { type: "key", text: "QA SQL shpargalkasi: tasdiqlash, takroriy, yetim, bo'sh majburiy, mantiqan noto'g'ri ma'lumot topish. Bularning har biri — potentsial bug." },
      ],
    },

    /* ---------- PRACTICAL ---------- */
    {
      id: "l6-11-practical",
      title: "Amaliyot: SQL so'rovlari yozish",
      type: "practical",
      minutes: 45,
      body: [
        { type: "p", text: "SQL'ni brauzerda, hech narsa o'rnatmasdan mashq qilasiz. SQLZoo — bepul interaktiv SQL o'quv platformasi." },
        { type: "p", text: "Bu yerda o'rgangan SELECT, WHERE, JOIN, GROUP BY, agregat funksiyalarni amalda ishlatasiz." },
        { type: "tip", text: "Shoshilmang. Har so'rovni yozib, natijani ko'ring. Xato qilsangiz — bu normal, SQL mashq bilan o'rganiladi." },
      ],
      practical: {
        targetUrl: "https://sqlzoo.net/wiki/SQL_Tutorial",
        targetName: "SQLZoo",
        task: "SQLZoo'dagi quyidagi bo'limlarni bajaring: (1) SELECT basics, (2) SELECT from WORLD, (3) SELECT from Nobel, (4) SUM and COUNT. Har bo'limdagi barcha savolga javob yozing. Keyin o'zingiz uchun QA shpargalkasi tuzing: takroriy ma'lumot, yetim ma'lumot va bo'sh majburiy maydon topadigan 3 ta so'rov yozing.",
        steps: [
          "SQLZoo'ni yangi tabda oching",
          "'SELECT basics' bo'limini bajaring — WHERE, AND, OR, IN, BETWEEN",
          "'SELECT from WORLD' — filtrlash va taqqoslash bilan mashq",
          "'SELECT from Nobel' — LIKE, IN, ORDER BY bilan mashq",
          "'SUM and COUNT' — agregat funksiyalar va GROUP BY",
          "Har savolda: avval o'zingiz yozing, keyin javobni tekshiring",
          "Oxirida daftaringizga QA uchun 3 ta foydali so'rov yozing (takroriy/yetim/bo'sh maydon)",
        ],
        debrief:
          "O'zingizni tekshiring — quyidagi so'rovlarni yozib chiqa olasizmi?\n\n1) Faol foydalanuvchilar sonini sanash:\n   SELECT COUNT(*) FROM users WHERE active = true;\n\n2) Takroriy email topish (bug!):\n   SELECT email, COUNT(*) FROM users\n   GROUP BY email HAVING COUNT(*) > 1;\n\n3) Buyurtma bermagan foydalanuvchilar:\n   SELECT u.name FROM users u\n   LEFT JOIN orders o ON u.id = o.user_id\n   WHERE o.id IS NULL;\n\n4) Har status bo'yicha buyurtmalar soni:\n   SELECT status, COUNT(*) FROM orders GROUP BY status;\n\n5) Jami savdo:\n   SELECT SUM(total) FROM orders WHERE status = 'paid';\n\nAgar bularni yozib chiqa olsangiz — junior QA uchun yetarli SQL bilimingiz bor. Intervyuda aynan shunday savollar so'raladi.",
      },
    },

    /* ---------- QUIZ ---------- */
    {
      id: "l6-12-quiz",
      title: "Yakuniy test: SQL",
      type: "quiz",
      minutes: 10,
      body: [
        { type: "p", text: "SQL — junior QA intervyusida deyarli har doim so'raladi. Bilimingizni tekshiring." },
      ],
      quiz: [
        {
          id: "l6q1",
          q: "QA nima uchun SQL bilishi kerak?",
          options: [
            "Kod yozish uchun",
            "UI aytganini bazada bevosita tekshirish, test ma'lumoti tayyorlash va ma'lumot yaxlitligini nazorat qilish uchun",
            "Dizayn qilish uchun",
            "Kerak emas",
          ],
          answer: 1,
          explain: "SQL — QA'ning ma'lumotni bevosita tekshirish quroli. UI 'saqlandi' desa ham, bazada yo'q bo'lishi mumkin.",
        },
        {
          id: "l6q2",
          q: "UPDATE yoki DELETE yozganda eng xavfli xato qaysi?",
          options: [
            "Katta harf ishlatish",
            "WHERE'ni unutish — bu BARCHA qatorni o'zgartiradi/o'chiradi",
            "Nuqta-vergul qo'ymaslik",
            "Ustun nomini noto'g'ri yozish",
          ],
          answer: 1,
          explain: "WHERE'siz UPDATE/DELETE butun jadvalga ta'sir qiladi. Bu halokatli va qaytarib bo'lmaydigan xato. Har doim avval SELECT bilan tekshiring.",
        },
        {
          id: "l6q3",
          q: "INNER JOIN va LEFT JOIN farqi?",
          options: [
            "Ular bir xil",
            "INNER — faqat ikkala jadvalda mos keladigan qatorlar; LEFT — chap jadvalning HAMMA qatori (mos kelmasa NULL)",
            "LEFT tezroq",
            "INNER faqat 2 jadval bilan ishlaydi",
          ],
          answer: 1,
          explain: "INNER JOIN faqat mos kelgan qatorlarni qaytaradi. LEFT JOIN chap jadvalning barcha qatorini qaytaradi — mos kelmasa o'ng tomonda NULL bo'ladi.",
        },
        {
          id: "l6q4",
          q: "Takroriy email topish uchun qaysi so'rov to'g'ri?",
          options: [
            "SELECT * FROM users WHERE email = email;",
            "SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;",
            "SELECT DISTINCT email FROM users;",
            "DELETE FROM users;",
          ],
          answer: 1,
          explain: "GROUP BY email bilan guruhlab, HAVING COUNT(*) > 1 bilan bir martadan ko'p uchraydigan emaillarni topamiz. Bu klassik QA tekshiruvi.",
        },
        {
          id: "l6q5",
          q: "WHERE va HAVING farqi?",
          options: [
            "Ular bir xil",
            "WHERE qatorlarni filtrlaydi (guruhlashdan oldin); HAVING guruhlarni filtrlaydi (guruhlashdan keyin)",
            "HAVING tezroq",
            "WHERE faqat SELECT bilan ishlaydi",
          ],
          answer: 1,
          explain: "WHERE — alohida qatorlarni filtrlaydi. HAVING — GROUP BY bilan hosil bo'lgan guruhlarni filtrlaydi.",
        },
        {
          id: "l6q6",
          q: "'Yetim ma'lumot' (egasi mavjud bo'lmagan buyurtma) qanday topiladi?",
          options: [
            "SELECT * FROM orders;",
            "LEFT JOIN + WHERE users.id IS NULL",
            "INNER JOIN",
            "DELETE FROM orders;",
          ],
          answer: 1,
          explain: "LEFT JOIN barcha buyurtmani qaytaradi; mos foydalanuvchi bo'lmasa users.id NULL bo'ladi. WHERE ... IS NULL bilan aynan shularni topamiz.",
        },
        {
          id: "l6q7",
          q: "Soft delete nima?",
          options: [
            "Ma'lumot butunlay o'chadi",
            "Ma'lumot bazada qoladi, lekin 'deleted' deb belgilanadi (masalan deleted_at to'ldiriladi)",
            "Ma'lumot boshqa jadvalga ko'chadi",
            "Bu xato",
          ],
          answer: 1,
          explain: "Soft delete — qator bazadan o'chmaydi, faqat belgilanadi. QA tekshiradi: UI'da ko'rinmasligi kerak, lekin bazada qoladi.",
        },
        {
          id: "l6q8",
          q: "UI'da 'Jami savdo: 15 000 000' deb ko'rsatilgan. Buni qanday tekshirasiz?",
          options: [
            "Ishonaman",
            "SELECT SUM(total) FROM orders WHERE status = 'paid'; — natijani UI bilan solishtiraman",
            "Dasturchidan so'rayman",
            "Tekshirib bo'lmaydi",
          ],
          answer: 1,
          explain: "SUM() bilan bazadagi haqiqiy summani hisoblab, UI bilan solishtirasiz. Mos kelmasa — hisob-kitob bug'i (masalan bekor qilingan buyurtmalar ham hisoblanmoqda).",
        },
      ],
    },
  ],
};
