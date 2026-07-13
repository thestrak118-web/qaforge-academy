// data/modules/level-2-manual-testing.ts
//
// LEVEL 2 — Manual Testing
// 20 theory sections + 1 practical + 1 quiz = 22 sections

import type { Module } from "../lessons";

export const LEVEL_2: Module = {
  id: "manual-testing",
  icon: "🧪",
  title: "Level 2 — Manual Testing",
  summary:
    "Test case yozish, test dizayn texnikalari va real UI elementlarini test qilish. Bu — QA'ning kundalik hunari.",
  level: "beginner",
  sections: [
    /* ============================================================ 1 */
    {
      id: "l2-01-test-case",
      title: "Test Case — test holati",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Test case — nimani, qanday tekshirishning aniq, bosqichma-bosqich yo'riqnomasi. Yaxshi test case'ni har qanday odam olib, xuddi shu natijani takrorlay oladi." },
        { type: "h", text: "Test case tuzilmasi" },
        { type: "table", head: ["Maydon", "Ma'nosi", "Misol"], rows: [
          ["ID", "Noyob raqam", "TC-LOGIN-001"],
          ["Title", "Qisqa tavsif", "To'g'ri ma'lumot bilan login"],
          ["Preconditions", "Test oldidan bajarilishi kerak bo'lganlar", "Ro'yxatdan o'tgan foydalanuvchi mavjud"],
          ["Test Data", "Kiritiladigan ma'lumot", "email: user@mail.com, parol: Test123!"],
          ["Steps", "Bosqichlar (1, 2, 3...)", "1. Login sahifani och 2. Email kirit..."],
          ["Expected Result", "Kutilgan natija", "Foydalanuvchi bosh sahifaga o'tadi"],
          ["Actual Result", "Haqiqiy natija (bajargandan keyin)", "Bosh sahifaga o'tdi ✅"],
          ["Status", "Pass / Fail / Blocked", "Pass"],
          ["Priority", "Muhimlik darajasi", "High"],
        ]},
        { type: "h", text: "To'liq misol" },
        { type: "example", text: "ID: TC-LOGIN-001\nTitle: To'g'ri ma'lumot bilan tizimga kirish\nPrecondition: user@mail.com hisobi mavjud va faol\nTest data: user@mail.com / Test123!\n\nSteps:\n1. Brauzerda /login sahifasini och\n2. Email maydoniga user@mail.com kirit\n3. Parol maydoniga Test123! kirit\n4. 'Kirish' tugmasini bos\n\nExpected: Foydalanuvchi /dashboard sahifasiga o'tadi va yuqorida uning ismi ko'rinadi." },
        { type: "h", text: "Yaxshi test case xususiyatlari" },
        { type: "list", items: [
          "Aniq — ikki xil tushunilmaydi",
          "Takrorlanadigan — boshqa odam ham bajara oladi",
          "Mustaqil — boshqa test case'ga bog'liq emas",
          "Bitta narsani tekshiradi — bir case, bir maqsad",
          "Kutilgan natija aniq yozilgan",
        ]},
        { type: "warn", text: "Eng ko'p uchraydigan xato: 'Expected Result' noaniq yozilishi. 'Ishlaydi' emas, 'Foydalanuvchi /dashboard sahifasiga yo'naltiriladi' deb aniq yozing." },
        { type: "key", text: "Test case — aniq, takrorlanadigan, mustaqil yo'riqnoma. Bitta case bitta narsani tekshiradi." },
      ],
    },

    /* ============================================================ 2 */
    {
      id: "l2-02-test-scenario",
      title: "Test Scenario — test senariysi",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Test scenario — yuqori darajadagi, umumiy test g'oyasi. Test case esa — o'sha g'oyaning batafsil, qadamma-qadam ko'rinishi." },
        { type: "table", head: ["", "Test Scenario", "Test Case"], rows: [
          ["Daraja", "Yuqori (umumiy)", "Past (batafsil)"],
          ["Nima", "'Nimani test qilamiz?'", "'Qanday test qilamiz?'"],
          ["Hajmi", "Bir jumla", "Bir necha qadam"],
          ["Nisbat", "1 scenario → ko'p test case", "1 case → 1 scenario ichida"],
        ]},
        { type: "example", text: "SCENARIO: Login funksiyasini tekshirish\n\nBu scenario ichidagi TEST CASE'lar:\n• TC-001: To'g'ri email + to'g'ri parol → kirish muvaffaqiyatli\n• TC-002: To'g'ri email + noto'g'ri parol → xato xabari\n• TC-003: Bo'sh maydonlar → 'Majburiy maydon' xatosi\n• TC-004: Noto'g'ri email formati → format xatosi\n• TC-005: 5 marta noto'g'ri urinish → hisob bloklanadi" },
        { type: "tip", text: "Amaliyotda avval scenario'lar ro'yxatini tuzasiz (nimani test qilamiz), keyin har biriga case yozasiz (qanday test qilamiz)." },
        { type: "key", text: "Scenario = nimani test qilamiz (umumiy). Test case = qanday test qilamiz (batafsil qadamlar)." },
      ],
    },

    /* ============================================================ 3 */
    {
      id: "l2-03-checklist",
      title: "Checklist — tekshiruv ro'yxati",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Checklist — tekshirilishi kerak bo'lgan narsalar ro'yxati. Test case'dan farqi: qadamlar yozilmaydi, faqat 'nimani tekshirish kerak' sanab o'tiladi." },
        { type: "table", head: ["", "Test Case", "Checklist"], rows: [
          ["Batafsillik", "To'liq qadamlar", "Faqat punktlar"],
          ["Vaqt", "Yozish uzoq", "Yozish tez"],
          ["Kim uchun", "Yangi odam ham bajara oladi", "Mahsulotni biladigan odam uchun"],
          ["Qachon", "Muhim, murakkab funksiya", "Tez tekshiruv, tanish funksiya"],
        ]},
        { type: "example", text: "LOGIN CHECKLIST:\n☐ To'g'ri ma'lumot bilan kirish\n☐ Noto'g'ri parol\n☐ Mavjud bo'lmagan email\n☐ Bo'sh maydonlar\n☐ Email format validatsiyasi\n☐ Parol maydoni yashiringan (••••)\n☐ 'Parolni unutdim' havolasi ishlaydi\n☐ 'Meni eslab qol' checkbox ishlaydi\n☐ Ko'p marta noto'g'ri urinish → blok\n☐ Login'dan keyin to'g'ri sahifaga o'tish" },
        { type: "tip", text: "Checklist — tajribali QA'ning tezkor quroli. Vaqt kam bo'lganda yoki tanish funksiyani qayta tekshirganda juda foydali." },
        { type: "key", text: "Checklist — tez, qisqa, punktli. Test case — batafsil, qadamli. Ikkalasi ham kerak." },
      ],
    },

    /* ============================================================ 4 */
    {
      id: "l2-04-acceptance-criteria",
      title: "Acceptance Criteria — qabul mezonlari",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Acceptance Criteria (AC) — funksiya 'tayyor' deb hisoblanishi uchun bajarilishi kerak bo'lgan shartlar. Ular talab (user story) bilan birga yoziladi." },
        { type: "p", text: "AC — QA uchun oltin manba: aynan ulardan test case'lar tug'iladi." },
        { type: "h", text: "Given-When-Then formati" },
        { type: "p", text: "Eng keng tarqalgan format — har AC uch qismdan iborat:" },
        { type: "code", text: `Given (berilgan)  — boshlang'ich holat
When  (qachon)    — foydalanuvchi nima qiladi
Then  (unda)      — tizim nima qilishi kerak` },
        { type: "example", text: "USER STORY: 'Foydalanuvchi sifatida men tizimga kirishni xohlayman.'\n\nACCEPTANCE CRITERIA:\n\nAC1:\nGiven: Men ro'yxatdan o'tganman\nWhen: To'g'ri email va parol kiritib 'Kirish' bosaman\nThen: Men dashboard sahifasiga o'taman\n\nAC2:\nGiven: Men login sahifasidaman\nWhen: Noto'g'ri parol kiritaman\nThen: 'Email yoki parol noto'g'ri' xabari chiqadi\n\nAC3:\nGiven: Men login sahifasidaman\nWhen: Maydonlarni bo'sh qoldirib 'Kirish' bosaman\nThen: 'Bu maydon majburiy' xatosi chiqadi" },
        { type: "h", text: "Yaxshi AC xususiyatlari" },
        { type: "list", items: [
          "Testlanadigan — 'to'g'rimi?' deb aytish mumkin",
          "Aniq — ikki xil tushunilmaydi",
          "Foydalanuvchi tilida — texnik jargon emas",
          "Mustaqil — bir-biriga bog'liq emas",
        ]},
        { type: "key", text: "Acceptance Criteria — 'tayyor' degan so'zning aniq ta'rifi. QA aynan ulardan test case yozadi." },
      ],
    },

    /* ============================================================ 5 */
    {
      id: "l2-05-positive-testing",
      title: "Positive Testing",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Positive testing (happy path) — tizim TO'G'RI ma'lumot bilan, kutilgan yo'lda ishlashini tekshirish. Ya'ni: 'foydalanuvchi hamma narsani to'g'ri qilsa, ishlaydimi?'" },
        { type: "h", text: "Nima tekshiriladi" },
        { type: "list", items: [
          "To'g'ri formatdagi ma'lumot qabul qilinadi",
          "Ruxsat etilgan diapazondagi qiymatlar ishlaydi",
          "Asosiy funksiya kutilgan natija beradi",
          "Foydalanuvchi maqsadiga erishadi",
        ]},
        { type: "example", text: "Ro'yxatdan o'tish formasi — POSITIVE testlar:\n\n✅ Ism: 'Ali' (to'g'ri format)\n✅ Email: 'ali@mail.com' (to'g'ri format)\n✅ Parol: 'Test123!' (talabga mos: 8+ belgi, harf, raqam, belgi)\n✅ Yosh: 25 (18-100 oralig'ida)\n→ Kutilgan natija: hisob yaratiladi, tasdiqlash emaili yuboriladi" },
        { type: "warn", text: "Faqat positive test qilish — eng katta yangi QA xatosi. Foydalanuvchilar har doim hamma narsani to'g'ri qilmaydi. Keyingi darsda — negative testing." },
        { type: "key", text: "Positive testing — 'hammasi to'g'ri bo'lsa ishlaydimi?' Bu minimum, lekin yetarli emas." },
      ],
    },

    /* ============================================================ 6 */
    {
      id: "l2-06-negative-testing",
      title: "Negative Testing",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Negative testing — tizim NOTO'G'RI ma'lumot va kutilmagan harakatlarga qanday munosabat bildirishini tekshirish. Bu yerda haqiqiy bug'lar yashiringan." },
        { type: "p", text: "Maqsad: tizim yiqilmasin, ma'lumot buzilmasin, foydalanuvchiga tushunarli xato xabari chiqsin." },
        { type: "h", text: "Negative test g'oyalari" },
        { type: "table", head: ["Kategoriya", "Sinash"], rows: [
          ["Bo'sh qiymat", "Maydonni bo'sh qoldirib yuborish"],
          ["Noto'g'ri format", "Email'ga '@' siz matn, telefonga harf"],
          ["Chegaradan tashqari", "Yosh: -5, 0, 999"],
          ["Juda uzun", "10 000 belgili matn"],
          ["Maxsus belgilar", "<script>, ', \", %, &, emoji"],
          ["Noto'g'ri tur", "Raqam maydoniga matn"],
          ["Takroriy", "Bir emailni ikki marta ro'yxatdan o'tkazish"],
          ["Ruxsatsiz", "Login qilmasdan himoyalangan sahifaga kirish"],
        ]},
        { type: "example", text: "Ro'yxatdan o'tish formasi — NEGATIVE testlar:\n\n❌ Email: 'ali.mail.com' ('@' yo'q) → format xatosi kutiladi\n❌ Email: bo'sh → 'Majburiy maydon' kutiladi\n❌ Parol: '123' (juda qisqa) → 'Kamida 8 belgi' kutiladi\n❌ Yosh: -5 → 'Noto'g'ri qiymat' kutiladi\n❌ Ism: 5000 belgili matn → cheklov yoki xato kutiladi\n❌ Email: allaqachon ro'yxatdan o'tgan → 'Bu email band' kutiladi" },
        { type: "h", text: "Xato xabari ham test qilinadi" },
        { type: "p", text: "Negative testda faqat 'xato chiqdimi?' emas, balki 'xato TO'G'RIMI?' ham muhim:" },
        { type: "list", items: [
          "Xabar tushunarlimi? ('Error 500' emas, 'Email formati noto'g'ri')",
          "Xabar to'g'ri maydonga yaqinmi?",
          "Ortiqcha ma'lumot oshkor qilmayaptimi? ('Bu email ro'yxatda yo'q' — bu xavfsizlik muammosi)",
          "Kiritilgan ma'lumot saqlanib qoldimi (foydalanuvchi qaytadan yozmasin)?",
        ]},
        { type: "key", text: "Negative testing — noto'g'ri ma'lumot va kutilmagan harakatlarni sinash. Aynan shu yerda bug'lar yashiringan." },
      ],
    },

    /* ============================================================ 7 */
    {
      id: "l2-07-bva",
      title: "Boundary Value Analysis (BVA)",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "BVA — chegara qiymatlarini test qilish texnikasi. Asosi oddiy haqiqat: xatolar ko'pincha aynan CHEGARALARDA yuz beradi." },
        { type: "p", text: "Sabab: dasturchilar ko'pincha < va <= ni chalkashtiradi, yoki chegarani noto'g'ri yozadi." },
        { type: "h", text: "Qanday ishlaydi" },
        { type: "p", text: "Agar ruxsat etilgan diapazon [min...max] bo'lsa, quyidagilarni test qilamiz:" },
        { type: "table", head: ["Qiymat", "Kutilgan natija"], rows: [
          ["min − 1", "Rad etiladi ❌"],
          ["min", "Qabul qilinadi ✅"],
          ["min + 1", "Qabul qilinadi ✅ (ixtiyoriy)"],
          ["max − 1", "Qabul qilinadi ✅ (ixtiyoriy)"],
          ["max", "Qabul qilinadi ✅"],
          ["max + 1", "Rad etiladi ❌"],
        ]},
        { type: "example", text: "TALAB: Yosh maydoni 18 dan 60 gacha (o'z ichiga olgan holda) qabul qilinsin.\n\nBVA test qiymatlari:\n• 17 → rad etilishi kerak ❌\n• 18 → qabul qilinishi kerak ✅ (eng past chegara)\n• 60 → qabul qilinishi kerak ✅ (eng yuqori chegara)\n• 61 → rad etilishi kerak ❌\n\nAgar dasturchi `if (age > 18)` deb yozgan bo'lsa (`>=` o'rniga), 18 rad etiladi — BVA aynan shu bug'ni tutadi." },
        { type: "h", text: "Boshqa chegara turlari" },
        { type: "list", items: [
          "Matn uzunligi: 0, 1, maksimal, maksimal+1 belgi",
          "Ro'yxat: bo'sh ro'yxat, 1 element, maksimal element",
          "Sana: kecha, bugun, ertaga, 29-fevral (kabisa yili)",
          "Fayl hajmi: 0 KB, maksimal, maksimal+1",
          "Savat: 0 mahsulot, 1, maksimal miqdor",
        ]},
        { type: "key", text: "BVA — chegara atrofini test qilish (min-1, min, max, max+1). Eng samarali va eng ko'p ishlatiladigan texnika." },
      ],
    },

    /* ============================================================ 8 */
    {
      id: "l2-08-equivalence-partitioning",
      title: "Equivalence Partitioning (EP)",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "EP — kirish qiymatlarini 'bir xil ishlaydigan' guruhlarga (sinflarga) bo'lish va har guruhdan FAQAT BITTA qiymatni test qilish." },
        { type: "p", text: "Mantiq: agar 25 yosh ishlasa, 26, 27, 28... ham ishlaydi (ular bir sinfda). Demak hammasini test qilish shart emas." },
        { type: "h", text: "Qanday ishlaydi" },
        { type: "example", text: "TALAB: Yosh maydoni 18-60 qabul qilinsin.\n\nEKVIVALENT SINFLAR:\n\n1️⃣ 18 dan kichik → RAD (masalan: 10)\n2️⃣ 18-60 oralig'ida → QABUL (masalan: 35)\n3️⃣ 60 dan katta → RAD (masalan: 75)\n\nHar sinfdan bitta qiymat yetarli — 100 ta son kiritish shart emas." },
        { type: "h", text: "EP + BVA — eng kuchli juftlik" },
        { type: "p", text: "Amaliyotda ular BIRGA ishlatiladi: EP bilan sinflarni topasiz, BVA bilan har sinfning chegarasini sinaysiz." },
        { type: "table", head: ["Texnika", "Nimani beradi", "Yosh 18-60 uchun"], rows: [
          ["EP", "Har sinfdan 1 ta", "10, 35, 75"],
          ["BVA", "Chegara atrofi", "17, 18, 60, 61"],
          ["EP + BVA", "To'liq qamrov", "10, 17, 18, 35, 60, 61, 75"],
        ]},
        { type: "h", text: "Boshqa misollar" },
        { type: "example", text: "PAROL: 8-20 belgi\n• 7 belgi → rad (sinf 1)\n• 12 belgi → qabul (sinf 2)\n• 25 belgi → rad (sinf 3)\n\nTO'LOV TURI: Karta / Naqd / Bank o'tkazmasi\n• Har tur alohida sinf → har biridan bitta test\n\nCHEGIRMA: 0-100 so'm → 0%, 101-500 → 5%, 501+ → 10%\n• 3 ta sinf → har biridan bitta qiymat" },
        { type: "key", text: "EP — bir xil ishlaydigan qiymatlarni guruhlab, har guruhdan bittasini test qilish. BVA bilan birga ishlatiladi." },
      ],
    },

    /* ============================================================ 9 */
    {
      id: "l2-09-decision-table",
      title: "Decision Table — qaror jadvali",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Decision Table — bir necha SHART birga ta'sir qilganda ishlatiladigan texnika. Har shart kombinatsiyasi va uning natijasi jadvalga yoziladi." },
        { type: "p", text: "Nega kerak: 3 ta shart bo'lsa, 2³ = 8 ta kombinatsiya bor. Ularni boshda saqlash qiyin — jadval yordam beradi." },
        { type: "h", text: "Oddiy misol — 2 shart" },
        { type: "p", text: "QOIDA: Chegirma beriladi agar foydalanuvchi A'ZO bo'lsa VA xarid 100$ dan ko'p bo'lsa." },
        { type: "table", head: ["#", "A'zo?", "Xarid > 100$?", "Natija (chegirma)"], rows: [
          ["1", "Ha", "Ha", "20% ✅"],
          ["2", "Ha", "Yo'q", "0%"],
          ["3", "Yo'q", "Ha", "0%"],
          ["4", "Yo'q", "Yo'q", "0%"],
        ]},
        { type: "p", text: "Har qator — bitta test case. Ya'ni 4 ta test case kerak." },
        { type: "h", text: "Murakkabroq misol — 3 shart" },
        { type: "p", text: "QOIDA: Kredit beriladi agar: yosh 18+ VA daromad bor VA kredit tarixi toza bo'lsa." },
        { type: "table", head: ["#", "Yosh 18+", "Daromad", "Toza tarix", "Kredit"], rows: [
          ["1", "Ha", "Ha", "Ha", "Beriladi ✅"],
          ["2", "Ha", "Ha", "Yo'q", "Rad"],
          ["3", "Ha", "Yo'q", "Ha", "Rad"],
          ["4", "Ha", "Yo'q", "Yo'q", "Rad"],
          ["5", "Yo'q", "Ha", "Ha", "Rad"],
          ["6", "Yo'q", "Ha", "Yo'q", "Rad"],
          ["7", "Yo'q", "Yo'q", "Ha", "Rad"],
          ["8", "Yo'q", "Yo'q", "Yo'q", "Rad"],
        ]},
        { type: "tip", text: "Kombinatsiyalar soni = 2^(shartlar soni). 2 shart → 4, 3 shart → 8, 4 shart → 16. Agar juda ko'p bo'lsa, Pairwise texnikasini ishlating (keyingi darslarda)." },
        { type: "key", text: "Decision Table — bir necha shart birga ta'sir qilganda. Har kombinatsiya = bitta test case." },
      ],
    },

    /* ============================================================ 10 */
    {
      id: "l2-10-state-transition",
      title: "State Transition — holat o'tishi",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "State Transition — tizim bir HOLATDAN boshqasiga o'tganda ishlatiladigan texnika. Bunda muhimi: qaysi o'tish ruxsat etilgan, qaysi biri yo'q." },
        { type: "h", text: "Klassik misol — hisobni bloklash" },
        { type: "p", text: "QOIDA: Parolni 3 marta noto'g'ri kiritsangiz, hisob bloklanadi." },
        { type: "table", head: ["Joriy holat", "Hodisa", "Yangi holat"], rows: [
          ["Faol", "To'g'ri parol", "Kirdi ✅"],
          ["Faol", "Noto'g'ri parol (1-marta)", "Faol (1 urinish)"],
          ["Faol (1 urinish)", "Noto'g'ri parol (2-marta)", "Faol (2 urinish)"],
          ["Faol (2 urinish)", "Noto'g'ri parol (3-marta)", "Bloklangan 🔒"],
          ["Faol (2 urinish)", "To'g'ri parol", "Kirdi ✅ (hisoblagich nolga tushadi)"],
          ["Bloklangan", "To'g'ri parol", "Bloklangan qoladi 🔒"],
        ]},
        { type: "p", text: "Oxirgi qator eng muhim: bloklangan hisobga TO'G'RI parol bilan ham kira olmaslik kerak. Ko'p tizimda aynan shu bug bo'ladi." },
        { type: "h", text: "Boshqa misollar" },
        { type: "example", text: "BUYURTMA HOLATLARI:\nYangi → To'landi → Yuborildi → Yetkazildi\n\nTest qilinadigan noto'g'ri o'tishlar:\n❌ Yangi → Yetkazildi (to'lovsiz yetkazish mumkinmi?)\n❌ Yetkazildi → Yangi (orqaga qaytish mumkinmi?)\n❌ Bekor qilingan → Yuborildi (bekor qilingan buyurtma yuboriladimi?)" },
        { type: "warn", text: "Eng ko'p bug — 'noto'g'ri o'tish'da: tizim ruxsat etilmagan holatga o'tishga imkon beradi. Har doim teskari va sakrash o'tishlarini sinang." },
        { type: "key", text: "State Transition — holatlar va ular orasidagi o'tishlar. Ruxsat etilgan VA etilmagan o'tishlarni test qiling." },
      ],
    },

    /* ============================================================ 11 */
    {
      id: "l2-11-pairwise",
      title: "Pairwise Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Pairwise (juftlik) testing — kombinatsiyalar juda ko'p bo'lganda ishlatiladigan texnika. Asosi: bug'larning aksariyati IKKI parametr o'zaro ta'siridan kelib chiqadi." },
        { type: "h", text: "Muammо: kombinatsiyalar portlashi" },
        { type: "example", text: "Sizda 4 ta parametr bor:\n• Brauzer: Chrome, Firefox, Safari (3)\n• OS: Windows, Mac, Linux (3)\n• Til: UZ, RU, EN (3)\n• To'lov: Karta, Naqd (2)\n\nTo'liq kombinatsiya: 3 × 3 × 3 × 2 = 54 ta test!\n\nPairwise bilan: ~9-12 ta test yetarli (har juftlik kamida bir marta uchraydi)." },
        { type: "p", text: "Ya'ni siz har PARAMETRLAR JUFTLIGINI (Chrome+Windows, Chrome+Mac, Firefox+UZ...) kamida bir marta sinaysiz, lekin barcha to'liq kombinatsiyani emas." },
        { type: "h", text: "Nega ishlaydi" },
        { type: "p", text: "Tadqiqotlar ko'rsatishicha, bug'larning ~70-90% bitta parametr yoki ikki parametr juftligidan kelib chiqadi. Uch va undan ko'p parametr birgalikda bug beradigan holat juda kam." },
        { type: "tip", text: "Pairwise kombinatsiyalarni qo'lda hisoblash qiyin. Bepul asboblar bor: PICT (Microsoft), AllPairs, pairwise online generatorlar." },
        { type: "key", text: "Pairwise — kombinatsiyalar ko'p bo'lganda. Har parametr juftligini bir marta sinash → testlar keskin kamayadi, qamrov saqlanadi." },
      ],
    },

    /* ============================================================ 12 */
    {
      id: "l2-12-error-guessing",
      title: "Error Guessing — xatoni taxmin qilish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Error Guessing — tajriba va intuisiyaga asoslanib, xato bo'lishi mumkin bo'lgan joyni taxmin qilish. Bu rasmiy texnika emas, lekin tajribali QA'da juda kuchli quroldir." },
        { type: "h", text: "Klassik 'xato bo'ladigan' joylar" },
        { type: "table", head: ["Joy", "Nega xato bo'ladi"], rows: [
          ["Bo'sh qiymat", "Dasturchi null tekshirishni unutadi"],
          ["Nol (0)", "0 ga bo'lish, 0 miqdor, 0 narx"],
          ["Manfiy son", "Miqdor -5, narx -100"],
          ["Juda uzun matn", "Ma'lumot bazasi cheklovi, UI buziladi"],
          ["Maxsus belgilar", "', \", <, >, &, emoji — SQL/XSS muammolari"],
          ["Bir vaqtda ikki amal", "Ikki marta tez bosish → ikki buyurtma"],
          ["Orqaga tugmasi", "To'lovdan keyin orqaga → qayta to'lov?"],
          ["Sessiya tugashi", "Uzoq turib, keyin yuborish"],
          ["Sana chegaralari", "29-fevral, yil oxiri, vaqt mintaqasi"],
        ]},
        { type: "example", text: "Onlayn do'konda error guessing:\n• Savatga 999999 dona qo'shsam?\n• 'Xarid' tugmasini 5 marta tez bossam — 5 ta buyurtma bo'ladimi?\n• To'lov sahifasida orqaga bosib, qaytib kelsam?\n• Chegirma kuponini ikki marta ishlatsam?\n• Savat bo'sh holda checkout'ga o'tsam?" },
        { type: "tip", text: "Error guessing — o'tmish tajribangizdan o'sadi. Har topgan bug'ingizni eslab qoling: shunga o'xshash bug boshqa joyda ham bo'lishi mumkin." },
        { type: "key", text: "Error Guessing — tajribaga asoslangan taxmin. Rasmiy emas, lekin tajribali QA'ning eng tez quroli." },
      ],
    },

    /* ============================================================ 13 */
    {
      id: "l2-13-use-case-testing",
      title: "Use Case Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Use Case testing — foydalanuvchining tizim bilan to'liq muomalasini (boshidan oxirigacha) test qilish. Bu alohida funksiyani emas, butun OQIMNI tekshiradi." },
        { type: "h", text: "Use case tuzilmasi" },
        { type: "table", head: ["Element", "Ma'nosi"], rows: [
          ["Actor", "Kim (foydalanuvchi, admin, tizim)"],
          ["Precondition", "Boshlanishdan oldin nima bo'lishi kerak"],
          ["Main flow", "Asosiy, muvaffaqiyatli yo'l"],
          ["Alternative flow", "Boshqa mumkin bo'lgan yo'llar"],
          ["Exception flow", "Xato holatlar"],
          ["Postcondition", "Oxirida nima bo'ladi"],
        ]},
        { type: "example", text: "USE CASE: Onlayn xarid qilish\n\nActor: Ro'yxatdan o'tgan xaridor\nPrecondition: Foydalanuvchi tizimga kirgan, savatda mahsulot bor\n\nMAIN FLOW:\n1. Savatni ochadi\n2. 'Rasmiylashtirish' bosadi\n3. Yetkazib berish manzilini kiritadi\n4. To'lov usulini tanlaydi\n5. Karta ma'lumotini kiritadi\n6. 'To'lash' bosadi\n7. Buyurtma tasdiqlanadi, email keladi\n\nALTERNATIVE FLOW:\n4a. Naqd to'lovni tanlaydi → karta bosqichi o'tkazib yuboriladi\n\nEXCEPTION FLOW:\n6a. Kartada mablag' yetmaydi → xato, savat saqlanadi\n6b. Internet uziladi → buyurtma yaratilmaydi, savat saqlanadi\n\nPostcondition: Buyurtma bazaga yoziladi, savat bo'shatiladi" },
        { type: "warn", text: "Alohida funksiya ishlashi mumkin, lekin butun oqim buzilgan bo'lishi mumkin. Masalan: to'lov ishlaydi, lekin buyurtma bazaga yozilmaydi. Use case testing aynan shuni tutadi." },
        { type: "key", text: "Use Case testing — butun foydalanuvchi oqimini (main + alternative + exception) test qilish." },
      ],
    },

    /* ============================================================ 14 */
    {
      id: "l2-14-ui-testing",
      title: "UI Testing — interfeys testlash",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "UI testing — foydalanuvchi ko'radigan va ishlatadigan interfeysni tekshirish. Bu faqat 'chiroylimi?' emas — funksionallik, izchillik va qulaylikni ham qamraydi." },
        { type: "h", text: "UI testda nima tekshiriladi" },
        { type: "table", head: ["Soha", "Tekshiriladigan narsalar"], rows: [
          ["Ko'rinish", "Elementlar to'g'ri joyda, kesilmagan, ustma-ust emas"],
          ["Matn", "Imlo xatolari, tarjima, matn sig'adimi"],
          ["Izchillik", "Tugmalar bir xil uslubda, ranglar mos"],
          ["Interaktivlik", "Hover, focus, active, disabled holatlar"],
          ["Formalar", "Placeholder, label, validatsiya xabarlari"],
          ["Responsive", "Telefon, planshet, desktopda buzilmaydi"],
          ["Brauzerlar", "Chrome, Firefox, Safari, Edge'da bir xil"],
          ["Klaviatura", "Tab bilan yurish mumkinmi? Enter ishlaydimi?"],
          ["Yuklanish", "Loading holati, bo'sh holat (empty state)"],
        ]},
        { type: "h", text: "Ko'p e'tibordan chetda qoladigan holatlar" },
        { type: "list", items: [
          "Bo'sh holat (empty state) — ro'yxatda hech narsa yo'q bo'lsa nima ko'rinadi?",
          "Yuklanish holati (loading) — spinner bormi, yoki oq ekranmi?",
          "Xato holati — internet yo'q bo'lsa?",
          "Juda uzun matn — ism 100 belgi bo'lsa dizayn buziladimi?",
          "Juda ko'p element — ro'yxatda 1000 ta element bo'lsa?",
        ]},
        { type: "example", text: "UI bug misollari:\n❌ Tugma matni ichiga sig'may kesilyapti\n❌ Mobil ekranda menyu ochilmaydi\n❌ Xato xabari qizil emas, ko'rinmaydi\n❌ Uzun ism dizaynni buzyapti\n❌ Safari'da tugma boshqa rangda\n❌ Ro'yxat bo'sh bo'lsa — oq ekran (hech qanday xabar yo'q)" },
        { type: "key", text: "UI testing — ko'rinish + izchillik + interaktivlik + responsive + brauzer moslik. Bo'sh/yuklanish/xato holatlarini unutmang." },
      ],
    },

    /* ============================================================ 15 */
    {
      id: "l2-15-form-validation",
      title: "Form Validation Testing",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Forma — foydalanuvchi ma'lumot kiritadigan asosiy joy, shuning uchun eng ko'p bug ham shu yerda. Forma validatsiyasini test qilish — QA'ning kundalik ishi." },
        { type: "h", text: "Har maydon uchun tekshirish ro'yxati" },
        { type: "table", head: ["Tekshiruv", "Misol"], rows: [
          ["Majburiy maydonlar", "Bo'sh qoldirib yuborish → xato chiqadimi?"],
          ["Format", "Email'da '@' bormi? Telefon raqammi?"],
          ["Uzunlik (min/max)", "Parol 8-20 belgi — 7 va 21 ni sinang (BVA!)"],
          ["Ma'lumot turi", "Raqam maydoniga harf kiritsa?"],
          ["Maxsus belgilar", "', \", <script>, emoji"],
          ["Bo'shliq (space)", "Faqat bo'shliqdan iborat matn qabul qilinadimi?"],
          ["Boshi/oxiridagi bo'shliq", "' ali@mail.com ' — trim qilinadimi?"],
          ["Takroriy qiymat", "Bu email allaqachon ro'yxatdanmi?"],
        ]},
        { type: "h", text: "Validatsiya qachon ishga tushadi?" },
        { type: "table", head: ["Tur", "Qachon", "Izoh"], rows: [
          ["On blur", "Maydondan chiqqanda", "Eng qulay — foydalanuvchi darrov biladi"],
          ["On submit", "Yuborishda", "Kech, lekin oddiy"],
          ["On change", "Har harfda", "Bezovta qilishi mumkin"],
        ]},
        { type: "h", text: "Xato xabarlarini ham test qiling" },
        { type: "list", items: [
          "Xabar tushunarlimi? ('Invalid input' emas, 'Email formati noto'g'ri')",
          "Qaysi maydonga tegishli ekani aniqmi?",
          "Bir necha xato bo'lsa, hammasi ko'rsatiladimi?",
          "Xato tuzatilgach, xabar yo'qoladimi?",
          "Kiritilgan ma'lumot saqlanib qoladimi (qaytadan yozish shart emasmi)?",
        ]},
        { type: "warn", text: "Muhim xavfsizlik nuqtasi: validatsiya faqat brauzerda (frontend) bo'lmasligi kerak. Uni chetlab o'tish oson. Server tomonida ham tekshirilishi shart." },
        { type: "key", text: "Forma testda: majburiy + format + uzunlik (BVA) + tur + maxsus belgilar + xato xabarlari. Server validatsiyasi ham bo'lishi shart." },
      ],
    },

    /* ============================================================ 16 */
    {
      id: "l2-16-crud-testing",
      title: "CRUD Testing",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "CRUD — Create, Read, Update, Delete. Deyarli har bir ilova ma'lumot bilan shu to'rt amalni bajaradi. CRUD testing — ularning to'g'ri ishlashini tekshirish." },
        { type: "table", head: ["Amal", "Ma'nosi", "Nima tekshiriladi"], rows: [
          ["Create", "Yaratish", "Yangi yozuv to'g'ri saqlanadimi?"],
          ["Read", "O'qish", "Yaratilgan yozuv to'g'ri ko'rinadimi?"],
          ["Update", "Yangilash", "O'zgarish saqlanadimi?"],
          ["Delete", "O'chirish", "Yozuv haqiqatan o'chadimi?"],
        ]},
        { type: "h", text: "Har amal uchun test g'oyalari" },
        { type: "example", text: "CREATE:\n✅ To'g'ri ma'lumot bilan yaratish → saqlanadi\n❌ Majburiy maydonsiz → xato\n❌ Takroriy (masalan bir xil email) → xato\n❌ Juda uzun matn → cheklov\n\nREAD:\n✅ Yaratilgan yozuv ro'yxatda ko'rinadi\n✅ Barcha maydonlar to'g'ri ko'rsatilgan\n❌ Mavjud bo'lmagan ID → 404 yoki 'topilmadi'\n❌ Boshqa foydalanuvchi yozuvini ko'rish → ruxsat yo'q\n\nUPDATE:\n✅ O'zgartirish saqlanadi\n✅ Faqat o'zgargan maydon yangilanadi (boshqalari buzilmaydi)\n❌ Noto'g'ri ma'lumot bilan yangilash → xato\n❌ Boshqa foydalanuvchi yozuvini o'zgartirish → ruxsat yo'q\n\nDELETE:\n✅ Yozuv o'chadi va ro'yxatdan yo'qoladi\n✅ Tasdiqlash so'raladimi? ('Rostdan o'chirasizmi?')\n❌ O'chirilgan yozuvni qayta o'chirish → xato\n❌ Boshqa foydalanuvchi yozuvini o'chirish → ruxsat yo'q" },
        { type: "h", text: "Muhim: CRUD zanjiri" },
        { type: "p", text: "Har amalni ALOHIDA emas, ZANJIR sifatida test qiling: Create → Read (ko'rinadimi?) → Update → Read (o'zgardimi?) → Delete → Read (yo'qoldimi?)." },
        { type: "tip", text: "Ko'p bug aynan zanjirda topiladi: yozuv yaratiladi, lekin ro'yxatda ko'rinmaydi. Yoki o'chiriladi, lekin bazada qoladi (soft delete)." },
        { type: "key", text: "CRUD — Create, Read, Update, Delete. Har birini alohida VA zanjir sifatida test qiling. Ruxsatlarni unutmang." },
      ],
    },

    /* ============================================================ 17 */
    {
      id: "l2-17-search-testing",
      title: "Search Testing — qidiruvni testlash",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Qidiruv — deyarli har saytda bor va ko'p bug'ga ega funksiya. Uni test qilish alohida e'tibor talab qiladi." },
        { type: "h", text: "Qidiruv test g'oyalari" },
        { type: "table", head: ["Holat", "Kutilgan natija"], rows: [
          ["Aniq mos keluvchi so'z", "Natija topiladi"],
          ["Qisman so'z ('tele' → 'telefon')", "Topiladimi? (talabga bog'liq)"],
          ["Katta/kichik harf ('TELEFON' vs 'telefon')", "Ikkalasi ham topilishi kerak"],
          ["Bo'sh qidiruv", "Xato yoki hamma natija (talabga bog'liq)"],
          ["Faqat bo'shliq", "Bo'sh qidiruv kabi ishlashi kerak"],
          ["Mavjud bo'lmagan so'z", "'Natija topilmadi' xabari"],
          ["Maxsus belgilar (', \", %)", "Yiqilmasligi kerak (SQL injection!)"],
          ["Juda uzun so'rov", "Cheklov yoki xato"],
          ["Raqam", "Topiladimi?"],
          ["Bo'shliq bilan so'zlar ('qora telefon')", "Ikkala so'z bo'yicha topadimi?"],
          ["Imlo xatosi ('telefno')", "Taklif beradimi? ('Balki: telefon')"],
        ]},
        { type: "h", text: "Natijalarni ham tekshiring" },
        { type: "list", items: [
          "Natijalar to'g'rimi (haqiqatan mos keladimi)?",
          "Tartib mantiqiymi (eng mos yuqoridami)?",
          "Natijalar soni ko'rsatiladimi ('24 ta natija')?",
          "Pagination ishlaydimi (ko'p natija bo'lsa)?",
          "Natija bo'lmasa — tushunarli xabar bormi?",
          "Qidiruv tez ishlaydimi (performance)?",
        ]},
        { type: "warn", text: "Xavfsizlik: qidiruv maydoniga <script>alert(1)</script> yoki ' OR '1'='1 kiritib ko'ring. Tizim yiqilmasligi va kod bajarilmasligi kerak." },
        { type: "key", text: "Search testda: aniq/qisman/katta-kichik harf, bo'sh, mavjud bo'lmagan, maxsus belgilar. Natijalar to'g'riligini ham tekshiring." },
      ],
    },

    /* ============================================================ 18 */
    {
      id: "l2-18-pagination",
      title: "Pagination Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Pagination — ko'p ma'lumotni sahifalarga bo'lish. Oddiy ko'rinadi, lekin ko'p chegara bug'lari bor." },
        { type: "h", text: "Pagination test g'oyalari" },
        { type: "table", head: ["Holat", "Nima tekshiriladi"], rows: [
          ["Birinchi sahifa", "'Oldingi' tugmasi o'chiq (disabled) bo'lishi kerak"],
          ["Oxirgi sahifa", "'Keyingi' tugmasi o'chiq bo'lishi kerak"],
          ["Sahifa o'zgartirish", "To'g'ri ma'lumot yuklanadimi?"],
          ["Element soni", "Har sahifada aytilgan miqdorda (masalan 10 ta)"],
          ["Oxirgi sahifa to'liq emas", "25 element, 10 tadan → 3-sahifada 5 ta"],
          ["Jami 0 element", "Pagination ko'rinmasligi yoki bo'sh holat"],
          ["Jami 1 sahifalik", "Pagination ko'rinmasligi kerak"],
          ["To'g'ridan-to'g'ri sahifa raqami", "URL'da ?page=5 → 5-sahifa ochiladi"],
          ["Mavjud bo'lmagan sahifa", "?page=999 → xato yoki oxirgi sahifa"],
          ["Manfiy/nol sahifa", "?page=0 yoki ?page=-1 → yiqilmasligi kerak"],
        ]},
        { type: "h", text: "Chegara holatlari (BVA!)" },
        { type: "example", text: "Har sahifada 10 element bo'lsin:\n\n• 0 element → pagination yo'q, 'Hech narsa topilmadi'\n• 1 element → 1 sahifa, pagination yo'q yoki o'chiq\n• 10 element → aniq 1 sahifa\n• 11 element → 2 sahifa (2-da 1 ta element)\n• 100 element → 10 sahifa\n\nBu — BVA texnikasining amaliy qo'llanishi!" },
        { type: "warn", text: "Ko'p uchraydigan bug: filtr yoki qidiruv ishlatilgach, foydalanuvchi 5-sahifada qoladi, lekin yangi natijada faqat 2 sahifa bor → bo'sh sahifa ko'rinadi." },
        { type: "key", text: "Pagination testda: birinchi/oxirgi sahifa, element soni, chegara holatlari (BVA), URL orqali kirish, filtr bilan birga ishlashi." },
      ],
    },

    /* ============================================================ 19 */
    {
      id: "l2-19-sorting",
      title: "Sorting Testing — saralashni testlash",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Saralash (sorting) — ro'yxatni tartibga solish. Har xil ma'lumot turi har xil saralanadi, va aynan shu yerda bug'lar chiqadi." },
        { type: "h", text: "Ma'lumot turiga qarab saralash" },
        { type: "table", head: ["Tur", "To'g'ri saralash", "Ko'p uchraydigan bug"], rows: [
          ["Raqam", "1, 2, 10, 20", "Matn kabi saralanadi: 1, 10, 2, 20 ❌"],
          ["Matn", "Alifbo bo'yicha", "Katta/kichik harf aralashadi"],
          ["Sana", "Xronologik", "Matn kabi: '01/12' vs '1-dekabr'"],
          ["Narx", "Raqam bo'yicha", "Valyuta belgisi bilan matn kabi"],
          ["Bo'sh qiymat (null)", "Oxirida yoki boshida (izchil)", "Tasodifiy joyda"],
        ]},
        { type: "h", text: "Test g'oyalari" },
        { type: "list", items: [
          "O'sish (A→Z, 1→10) tartibi to'g'rimi?",
          "Kamayish (Z→A, 10→1) tartibi to'g'rimi?",
          "Ikki marta bosganda tartib teskarisiga o'zgaradimi?",
          "Saralash indikatori (▲▼) to'g'ri ko'rsatilyaptimi?",
          "Bo'sh ro'yxatda yiqilmaydimi?",
          "1 ta element bo'lsa?",
          "Bir xil qiymatli elementlar (masalan bir xil narx) barqaror tartibda qoladimi?",
          "Saralash + pagination birga ishlaydimi (2-sahifada ham tartib saqlanadimi)?",
          "Saralash + filtr birga ishlaydimi?",
        ]},
        { type: "example", text: "KLASSIK BUG — raqamlar matn kabi saralanmoqda:\n\n❌ Noto'g'ri: 1, 10, 100, 2, 20, 3\n✅ To'g'ri:   1, 2, 3, 10, 20, 100\n\nSabab: raqam string sifatida saqlangan yoki taqqoslangan. Bu eng ko'p uchraydigan sorting bug'i." },
        { type: "warn", text: "O'zbek/rus alifbosidagi harflar (o', g', ч, ш) to'g'ri saralanyaptimi? Ko'p tizim faqat ingliz alifbosini to'g'ri saralaydi." },
        { type: "key", text: "Sorting testda: har tur (raqam/matn/sana) alohida, ikki yo'nalish, chegara holatlar, pagination va filtr bilan birga." },
      ],
    },

    /* ============================================================ 20 */
    {
      id: "l2-20-filtering",
      title: "Filtering Testing — filtrlashni testlash",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Filtrlash — ro'yxatni shart bo'yicha toraytirish. Bir necha filtr birga ishlaganda murakkablik keskin oshadi — va bug'lar ko'payadi." },
        { type: "h", text: "Bitta filtr testi" },
        { type: "list", items: [
          "Filtr qo'llanganda faqat mos elementlar qoladimi?",
          "Natijalar soni to'g'ri yangilanadimi?",
          "Filtrni bekor qilganda hamma element qaytadimi?",
          "Hech narsa mos kelmasa — tushunarli xabar bormi?",
          "Filtr URL'da saqlanadimi (sahifani yangilaganda yo'qolmaydimi)?",
        ]},
        { type: "h", text: "Bir necha filtr birga (eng ko'p bug shu yerda)" },
        { type: "table", head: ["Holat", "Kutilgan natija"], rows: [
          ["2 filtr birga (rang=qora VA narx<100)", "Ikkala shartga mos elementlar (VA mantiq)"],
          ["Bir kategoriyada 2 tanlov (qora VA oq)", "Ikkalasidan biri (YOKI mantiq)"],
          ["Ziddiyatli filtrlar", "0 natija + tushunarli xabar"],
          ["Barcha filtrni tozalash", "Hamma element qaytadi"],
          ["Filtr + qidiruv birga", "Ikkalasi ham qo'llanadi"],
          ["Filtr + saralash birga", "Filtrlangan natija saralanadi"],
          ["Filtr + pagination birga", "Sahifa 1 ga qaytadi (muhim!)"],
        ]},
        { type: "warn", text: "KLASSIK BUG: foydalanuvchi 5-sahifada, keyin filtr qo'llaydi → natija faqat 2 sahifa, lekin u hali ham 5-sahifada → bo'sh ekran ko'radi. Filtr qo'llanganda sahifa 1 ga qaytishi kerak." },
        { type: "h", text: "Chegara holatlari" },
        { type: "example", text: "NARX FILTRI (min-max):\n• min > max (masalan 500 dan 100 gacha) → xato yoki avtomatik almashish\n• min = max → aniq shu narxdagi mahsulotlar\n• Manfiy narx → rad etilishi kerak\n• Bo'sh min yoki max → cheksiz deb qabul qilinadi\n• Juda katta son → yiqilmasligi kerak" },
        { type: "key", text: "Filtering testda: bitta filtr, bir necha filtr birga (VA/YOKI mantiq), qidiruv/saralash/pagination bilan kombinatsiya, chegara holatlari." },
      ],
    },

    /* ============================================================ 21 — PRACTICAL */
    {
      id: "l2-21-practical",
      title: "Amaliyot: to'liq test to'plami yozing",
      type: "practical",
      minutes: 45,
      body: [
        { type: "p", text: "20 ta darsda o'rgangan barcha texnikani bitta amaliy ishda qo'llaysiz. Bu — real QA ishining aynan o'zi." },
        { type: "p", text: "AutomationExercise — to'liq funksional e-commerce demo sayt. Unda ro'yxatdan o'tish, mahsulotlar, savat, qidiruv, filtr, saralash — hammasi bor." },
        { type: "h", text: "Qaysi texnikalarni qo'llaysiz" },
        { type: "list", items: [
          "Test case yozish (ID, steps, expected)",
          "Positive va Negative testing",
          "Boundary Value Analysis (BVA)",
          "Equivalence Partitioning (EP)",
          "Form validation testing",
          "Search, Sorting, Filtering testing",
          "Error guessing",
        ]},
        { type: "tip", text: "Vaqt ajrating — bu jiddiy topshiriq. Yozganlaringizni saqlab qo'ying: bu sizning birinchi portfolio ishingiz bo'lishi mumkin." },
      ],
      practical: {
        targetUrl: "https://automationexercise.com",
        targetName: "AutomationExercise",
        task: "AutomationExercise saytining SAVAT (Cart) va QIDIRUV funksiyalari uchun to'liq test to'plami yozing. Kamida 12 ta test case bo'lsin: 4 ta positive, 4 ta negative, 2 ta BVA, 2 ta qidiruv. Har test case'da: ID, Title, Preconditions, Steps, Expected Result bo'lishi shart. Topgan har bug'ingizni alohida bug report bilan hujjatlang.",
        steps: [
          "Saytni yangi tabda oching va tuzilishi bilan tanishing (10 daqiqa exploratory)",
          "Savat funksiyasi uchun test scenario'lar ro'yxatini tuzing",
          "Har scenario uchun test case yozing (ID, steps, expected)",
          "BVA qo'llang: savatga 0, 1, juda katta miqdor qo'shib ko'ring",
          "Negative testlar: manfiy miqdor, matn kiritish, bo'sh savat checkout",
          "Qidiruvni test qiling: mavjud so'z, mavjud bo'lmagan, bo'sh, maxsus belgilar",
          "Test case'larni bajaring va natijani yozing (Pass/Fail)",
          "Topgan bug'larga to'liq bug report yozing (severity va priority bilan)",
        ],
        debrief:
          "Ishingizni quyidagi mezonlar bo'yicha o'zingiz baholang:\n\n📋 TEST CASE SIFATI:\n• Har case'da aniq ID va tushunarli title bormi?\n• Steps'ni boshqa odam takrorlay oladimi?\n• Expected Result aniq yozilganmi ('ishlaydi' emas)?\n• Har case bitta narsani tekshiradimi?\n\n🎯 QAMROV:\n• Positive VA negative testlar bormi?\n• BVA qo'llanganmi (0, 1, maksimal miqdor)?\n• Chegara holatlari (bo'sh savat, bir mahsulot, ko'p mahsulot) qamrab olinganmi?\n• Qidiruvda maxsus belgilar sinaldimi?\n\n🐞 BUG REPORT:\n• Title aniqmi (nima + qayerda)?\n• Steps to reproduce to'liqmi?\n• Expected va Actual ajratilganmi?\n• Severity va Priority mantiqan to'g'rimi?\n\nAgar hammasiga 'ha' desangiz — siz professional QA ishini bajardingiz. Bu ishni saqlab qo'ying: portfolio uchun juda qimmatli.",
      },
    },

    /* ============================================================ 22 — QUIZ */
    {
      id: "l2-22-quiz",
      title: "Yakuniy test: Manual Testing",
      type: "quiz",
      minutes: 12,
      body: [
        { type: "p", text: "Level 2 ni yakunlash uchun quyidagi savollarga javob bering. Test dizayn texnikalari — QA intervyusining eng ko'p so'raladigan qismi, shuning uchun bularni yaxshi bilish muhim." },
      ],
      quiz: [
        {
          id: "l2q1",
          q: "Test Scenario va Test Case farqi nima?",
          options: [
            "Ular bir xil",
            "Scenario — yuqori darajadagi g'oya (nimani test qilamiz); Test case — batafsil qadamlar (qanday test qilamiz)",
            "Test case scenario'dan kengroq",
            "Scenario faqat avtomatik testlarda ishlatiladi",
          ],
          answer: 1,
          explain: "Scenario — umumiy g'oya ('Login funksiyasini tekshirish'). Test case — o'sha g'oyaning batafsil, qadamma-qadam ko'rinishi. Bitta scenario ichida ko'p test case bo'ladi.",
        },
        {
          id: "l2q2",
          q: "Boundary Value Analysis nima uchun ishlatiladi?",
          options: [
            "Ranglarni tekshirish uchun",
            "Chegara qiymatlarida xato topish uchun — xatolar ko'pincha aynan chegarada bo'ladi",
            "Faqat API testlash uchun",
            "Kombinatsiyalarni kamaytirish uchun",
          ],
          answer: 1,
          explain: "BVA — chegara atrofidagi qiymatlarni test qiladi (min-1, min, max, max+1). Sabab: dasturchilar ko'pincha < va <= ni chalkashtiradi.",
        },
        {
          id: "l2q3",
          q: "Yosh maydoni 18-60 qabul qilsa, BVA bo'yicha qaysi qiymatlar test qilinishi SHART?",
          options: [
            "Faqat 35 (o'rtadagi qiymat)",
            "17, 18, 60, 61",
            "1, 50, 100",
            "Faqat 18 va 60",
          ],
          answer: 1,
          explain: "BVA chegara atrofini sinaydi: 17 (rad), 18 (qabul), 60 (qabul), 61 (rad). O'rtadagi qiymat (35) — bu EP texnikasi.",
        },
        {
          id: "l2q4",
          q: "Equivalence Partitioning nima qiladi?",
          options: [
            "Chegara qiymatlarini sinaydi",
            "Bir xil ishlaydigan qiymatlarni guruhlarga bo'lib, har guruhdan bittasini test qiladi",
            "Barcha mumkin bo'lgan qiymatlarni test qiladi",
            "Faqat noto'g'ri qiymatlarni sinaydi",
          ],
          answer: 1,
          explain: "EP — kirish qiymatlarini 'bir xil ishlaydigan' sinflarga bo'ladi va har sinfdan faqat bitta qiymat test qilinadi. Bu testlar sonini keskin kamaytiradi.",
        },
        {
          id: "l2q5",
          q: "Decision Table qachon ishlatiladi?",
          options: [
            "Bitta maydonni test qilganda",
            "Bir necha SHART birga ta'sir qilganda — har kombinatsiya bitta test case bo'ladi",
            "Faqat UI testlashda",
            "Sahifalarni saralashda",
          ],
          answer: 1,
          explain: "Decision Table — bir necha shart birgalikda natijaga ta'sir qilganda. 2 shart → 4 kombinatsiya, 3 shart → 8 kombinatsiya.",
        },
        {
          id: "l2q6",
          q: "State Transition testingda eng muhim nima?",
          options: [
            "Faqat ruxsat etilgan o'tishlarni sinash",
            "Ruxsat etilgan VA ruxsat etilmagan o'tishlarni sinash",
            "Faqat boshlang'ich holatni tekshirish",
            "Ranglarni tekshirish",
          ],
          answer: 1,
          explain: "Eng ko'p bug 'noto'g'ri o'tish'da bo'ladi — tizim ruxsat etilmagan holatga o'tishga imkon beradi. Masalan: bloklangan hisobga to'g'ri parol bilan kirish mumkinmi?",
        },
        {
          id: "l2q7",
          q: "Positive va Negative testing farqi?",
          options: [
            "Positive — to'g'ri ma'lumot bilan kutilgan yo'l; Negative — noto'g'ri ma'lumot va kutilmagan harakatlar",
            "Ular bir xil",
            "Negative faqat avtomatik bo'ladi",
            "Positive testing kerak emas",
          ],
          answer: 0,
          explain: "Positive (happy path) — hammasi to'g'ri bo'lsa ishlaydimi. Negative — noto'g'ri ma'lumot, chegaradan tashqari qiymatlar, kutilmagan harakatlar. Bug'larning aksariyati negative testda topiladi.",
        },
        {
          id: "l2q8",
          q: "Pagination testda eng ko'p uchraydigan bug qaysi?",
          options: [
            "Sahifa raqamlari ko'rinmaydi",
            "Filtr yoki qidiruv qo'llanganda foydalanuvchi eski sahifada qoladi va bo'sh ekran ko'radi",
            "Tugmalar rangi noto'g'ri",
            "Pagination hech qachon buzilmaydi",
          ],
          answer: 1,
          explain: "Klassik bug: foydalanuvchi 5-sahifada, filtr qo'llaydi, natija faqat 2 sahifa — lekin u hali 5-sahifada → bo'sh ekran. Filtr qo'llanganda sahifa 1 ga qaytishi kerak.",
        },
        {
          id: "l2q9",
          q: "Sorting testda eng klassik bug qaysi?",
          options: [
            "Raqamlar matn kabi saralanadi: 1, 10, 100, 2, 20 (o'rniga 1, 2, 10, 20, 100)",
            "Saralash umuman ishlamaydi",
            "Ranglar noto'g'ri",
            "Sahifa yuklanmaydi",
          ],
          answer: 0,
          explain: "Eng klassik sorting bug: raqamlar string sifatida taqqoslanadi, natijada 1, 10, 100, 2, 20 tartibida chiqadi. To'g'risi: 1, 2, 10, 20, 100.",
        },
        {
          id: "l2q10",
          q: "Acceptance Criteria nima uchun kerak?",
          options: [
            "Dizaynni chiroyli qilish uchun",
            "Funksiya 'tayyor' deb hisoblanishi uchun shartlar — QA aynan ulardan test case yozadi",
            "Faqat dasturchilar uchun",
            "Kodni tezlashtirish uchun",
          ],
          answer: 1,
          explain: "AC — 'tayyor' degan so'zning aniq ta'rifi. Given-When-Then formatida yoziladi va QA uchun test case'ning asosiy manbai.",
        },
        {
          id: "l2q11",
          q: "Forma validatsiyasi faqat brauzerda (frontend) bo'lsa nima muammo?",
          options: [
            "Hech qanday muammo yo'q",
            "Uni chetlab o'tish oson — server tomonida ham tekshirilishi shart (xavfsizlik)",
            "Sayt sekinlashadi",
            "Dizayn buziladi",
          ],
          answer: 1,
          explain: "Frontend validatsiyasini chetlab o'tish oson (DevTools, to'g'ridan-to'g'ri API so'rovi). Xavfsizlik uchun server tomonida ham validatsiya bo'lishi SHART.",
        },
        {
          id: "l2q12",
          q: "CRUD testingda nima muhim?",
          options: [
            "Faqat Create'ni test qilish",
            "Har amalni alohida VA zanjir sifatida test qilish (Create → Read → Update → Read → Delete → Read)",
            "Faqat Delete'ni test qilish",
            "CRUD test qilinmaydi",
          ],
          answer: 1,
          explain: "Ko'p bug zanjirda topiladi: yozuv yaratiladi, lekin ro'yxatda ko'rinmaydi; yoki o'chiriladi, lekin bazada qoladi. Shuning uchun zanjir sifatida test qilish muhim.",
        },
      ],
    },
  ],
};
