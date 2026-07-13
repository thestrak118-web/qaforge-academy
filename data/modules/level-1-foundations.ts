// data/modules/level-1-foundations.ts
//
// LEVEL 1 — QA Foundations
// 20 theory sections + 1 practical + 1 quiz = 22 sections
//
// Import this into data/lessons.ts:
//   import { LEVEL_1 } from "./modules/level-1-foundations";
//   export const MODULES: Module[] = [LEVEL_1, /* ...others */];

import type { Module } from "../lessons";

export const LEVEL_1: Module = {
  id: "qa-foundations",
  icon: "🚀",
  title: "Level 1 — QA Asoslari",
  summary:
    "QA nima, qanday jarayonlar bor, bug qanday yashaydi va QA muhandisi qanday fikrlaydi. Bu — barcha bilimlar quriladigan poydevor.",
  level: "beginner",
  sections: [
    /* ============================================================ 1 */
    {
      id: "l1-01-qa-nima",
      title: "QA nima?",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "QA (Quality Assurance — sifatni ta'minlash) — dasturiy mahsulot sifati talab va standartlarga mos kelishini ta'minlaydigan jarayon. QA nafaqat xatolarni topadi, balki umuman xato kam bo'lishi uchun butun ishlab chiqish jarayonini yaxshilaydi." },
        { type: "p", text: "Ko'pchilik QA'ni 'tugmalarni bosib xato qidirish' deb tushunadi. Aslida bu — jarayon muhandisligi: talablar aniqmi, dizayn mantiqiymi, test qanday rejalashtirilgan, jamoa qanday ishlayapti — bularning barchasi QA doirasiga kiradi." },
        { type: "h", text: "QA nimalar bilan shug'ullanadi" },
        { type: "list", items: [
          "Talablarni tahlil qiladi — nima qilinishi kerakligini aniq tushunadi",
          "Test strategiyasi va rejasini tuzadi",
          "Test case va checklist yozadi",
          "Mahsulotni test qiladi va bug topadi",
          "Bug report yozadi va dasturchi bilan ishlaydi",
          "Jarayonni yaxshilash bo'yicha taklif beradi",
        ]},
        { type: "h", text: "QA'ning to'rt ustuni" },
        { type: "table", head: ["Ustun", "Nima qiladi"], rows: [
          ["Oldini olish (Prevention)", "Xato yuzaga kelmasligi uchun standart, jarayon va kelishuvlar o'rnatadi"],
          ["Aniqlash (Detection)", "Mavjud xatolarni test orqali topadi"],
          ["Tekshirish (Verification)", "Mahsulot talablarga mos kelishini tasdiqlaydi"],
          ["Yaxshilash (Improvement)", "Topilgan muammolar asosida jarayonni takomillashtiradi"],
        ]},
        { type: "example", text: "Restoran ochdingiz. QA — bu oshpazga aniq retsept berish, oshxonani toza tutish, mahsulot sifatini oldindan tekshirish (xato bo'lmasin deb). Faqat tayyor taomni tatib ko'rish — bu QA emas, bu QC (keyingi darsda)." },
        { type: "key", text: "Yaxshi QA — xatolarni topish emas, ularning oldini olishdir. Testing esa — QA'ning bir quroli." },
      ],
    },

    /* ============================================================ 2 */
    {
      id: "l1-02-sdlc",
      title: "SDLC — dasturiy ta'minot hayot sikli",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "SDLC (Software Development Life Cycle) — dastur g'oyadan tayyor mahsulotgacha o'tadigan bosqichlar ketma-ketligi. QA bu siklning deyarli har bosqichida ishtirok etadi, faqat 'testing' bosqichida emas." },
        { type: "h", text: "SDLC bosqichlari" },
        { type: "table", head: ["Bosqich", "Nima bo'ladi", "QA nima qiladi"], rows: [
          ["1. Talablarni yig'ish", "Mijoz nima xohlashi aniqlanadi", "Talablarni o'qiydi, noaniqliklarni so'raydi"],
          ["2. Rejalashtirish", "Muddat, resurs, xavflar belgilanadi", "Test strategiyasi va rejasini tuzadi"],
          ["3. Dizayn", "Arxitektura va UI ishlab chiqiladi", "Dizaynni tahlil qiladi, test case yoza boshlaydi"],
          ["4. Dasturlash", "Kod yoziladi", "Test case'larni yakunlaydi, test muhitini tayyorlaydi"],
          ["5. Testing", "Mahsulot sinaladi", "Testlarni bajaradi, bug topadi va hujjatlaydi"],
          ["6. Deploy", "Foydalanuvchiga chiqariladi", "Smoke test o'tkazadi, production'ni tekshiradi"],
          ["7. Qo'llab-quvvatlash", "Kuzatiladi, tuzatiladi", "Regression test, yangi bug'larni kuzatadi"],
        ]},
        { type: "h", text: "Asosiy SDLC modellari" },
        { type: "table", head: ["Model", "Xususiyati", "Kamchiligi"], rows: [
          ["Waterfall", "Bosqichlar qat'iy ketma-ket", "Orqaga qaytish qiyin, o'zgarishga moslashmaydi"],
          ["V-model", "Har dasturlash bosqichiga mos test bosqichi", "Hali ham qat'iy"],
          ["Iterative", "Kichik takrorlanuvchi sikllar", "Rejalashtirish murakkabroq"],
          ["Agile", "Qisqa sprintlar, tez moslashuv", "Hujjat kamroq, intizom talab qiladi"],
        ]},
        { type: "warn", text: "Ko'p yangi QA 'menim ishim faqat testing bosqichida' deb o'ylaydi. Bu xato — talablarni o'qish bosqichidayoq savol bergan QA eng qimmatli QA hisoblanadi." },
        { type: "key", text: "SDLC — butun dastur haqida. QA unda faqat mehmon emas, balki boshidan oxirigacha ishtirokchi." },
      ],
    },

    /* ============================================================ 3 */
    {
      id: "l1-03-stlc",
      title: "STLC — testing hayot sikli",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "STLC (Software Testing Life Cycle) — testingning o'z ichki bosqichlari. SDLC butun dastur haqida bo'lsa, STLC faqat testing jarayoni haqida." },
        { type: "h", text: "STLC bosqichlari" },
        { type: "table", head: ["Bosqich", "Nima bo'ladi", "Natija (deliverable)"], rows: [
          ["1. Requirement Analysis", "Talablar o'rganiladi, nimani test qilish aniqlanadi", "Test qilinadigan talablar ro'yxati (RTM)"],
          ["2. Test Planning", "Strategiya, resurs, muddat, xavf belgilanadi", "Test Plan hujjati"],
          ["3. Test Case Design", "Test case va test ma'lumotlari yoziladi", "Test case to'plami"],
          ["4. Environment Setup", "Test muhiti tayyorlanadi", "Ishlaydigan test muhiti"],
          ["5. Test Execution", "Testlar bajariladi, bug topiladi", "Test natijalari, bug report'lar"],
          ["6. Test Closure", "Yakuniy tahlil va hisobot", "Test Summary Report"],
        ]},
        { type: "h", text: "Entry va Exit Criteria" },
        { type: "p", text: "Har bosqichga kirish va undan chiqish uchun shartlar bo'ladi. Bu — 'qachon boshlaymiz' va 'qachon tugatdik' degan savolga aniq javob." },
        { type: "table", head: ["", "Entry Criteria (kirish sharti)", "Exit Criteria (chiqish sharti)"], rows: [
          ["Test Execution", "Test case'lar tayyor, muhit ishlayapti, build kelgan", "Barcha test case bajarildi, kritik bug qolmadi"],
          ["Test Closure", "Testlar tugadi, bug'lar tuzatildi", "Hisobot tayyor, dars-xulosalar yozildi"],
        ]},
        { type: "example", text: "Dasturchi 'build tayyor' dedi, lekin test muhiti ishlamayapti va test case'lar hali yozilmagan. Entry criteria bajarilmagan — testni boshlamaslik kerak. Boshlasangiz, vaqtingizni behuda sarflaysiz." },
        { type: "key", text: "SDLC — butun dastur. STLC — SDLC ichidagi testing jarayoni. Entry/Exit criteria — 'qachon boshlaymiz / tugatamiz' degan aniq shartlar." },
      ],
    },

    /* ============================================================ 4 */
    {
      id: "l1-04-qa-vs-qc",
      title: "QA vs QC",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "QA va QC ko'pincha bir-biriga aralashtiriladi. Intervyuda deyarli har doim so'raladi, shuning uchun farqni aniq bilish kerak." },
        { type: "table", head: ["", "QA (Quality Assurance)", "QC (Quality Control)"], rows: [
          ["Ma'nosi", "Sifatni ta'minlash", "Sifatni nazorat qilish"],
          ["Yo'nalish", "Jarayonga qaratilgan", "Mahsulotga qaratilgan"],
          ["Maqsad", "Xatoning oldini olish", "Xatoni topish"],
          ["Qachon", "Ishlab chiqish davomida (proaktiv)", "Mahsulot tayyor bo'lgach (reaktiv)"],
          ["Kim mas'ul", "Butun jamoa", "Test qiluvchi jamoa"],
          ["Misol", "Standart, kod review, jarayon", "Testing, inspeksiya"],
        ]},
        { type: "h", text: "Testing bu yerda qayerda?" },
        { type: "p", text: "Testing — QC'ning bir qismi. Ya'ni ierarxiya: QA (eng keng) → QC (mahsulot nazorati) → Testing (aniq amal)." },
        { type: "example", text: "Non zavodi: QA — un sifati standarti, xamir retsepti, tozalik qoidalari (xato bo'lmasin deb). QC — pishgan nonni tekshirish (yaxshi chiqdimi?). Testing — har 100-nonni sinab ko'rish." },
        { type: "key", text: "QA — jarayon, oldini olish, proaktiv. QC — mahsulot, topish, reaktiv. Testing — QC ichidagi amaliyot." },
      ],
    },

    /* ============================================================ 5 */
    {
      id: "l1-05-verification-validation",
      title: "Verification vs Validation",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Bu ikki so'z ham chalkashtiriladi. Ular ikki xil savolga javob beradi — va bu farq juda muhim." },
        { type: "table", head: ["", "Verification", "Validation"], rows: [
          ["Savol", "Mahsulotni TO'G'RI yasayapmizmi?", "TO'G'RI mahsulotni yasayapmizmi?"],
          ["Nimaga qaraydi", "Talab, hujjat, dizaynga mosligi", "Foydalanuvchi haqiqiy ehtiyojiga"],
          ["Qachon", "Ishlab chiqish davomida", "Mahsulot tayyor bo'lgach"],
          ["Usullar", "Review, inspeksiya, walkthrough", "Testing, UAT, foydalanuvchi sinovi"],
          ["Kod ishga tushadimi", "Yo'q (statik)", "Ha (dinamik)"],
        ]},
        { type: "example", text: "Talab: 'Login tugmasi ko'k bo'lsin'.\n\nVerification: Tugma ko'kmi? — hujjatga solishtiramiz. Ha, ko'k. ✅\n\nValidation: Foydalanuvchi bu tugmani topa olyaptimi? Qulaymi? Balki u pastda qolib ketgandir. ❌\n\nYa'ni verification o'tdi, lekin validation o'tmadi — mahsulot 'to'g'ri yasalgan', lekin 'to'g'ri mahsulot emas'." },
        { type: "warn", text: "Bu farqni bilmaslik jiddiy muammoga olib keladi: jamoa hujjatga mos, lekin foydalanuvchiga keraksiz mahsulot yasab qo'yishi mumkin." },
        { type: "tip", text: "Yodda tutish uchun: Verification — HUJJATGA qaraydi. Validation — FOYDALANUVCHIGA qaraydi." },
      ],
    },

    /* ============================================================ 6 */
    {
      id: "l1-06-bug-nima",
      title: "Bug nima? (Error, Defect, Failure)",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Kundalik gapda hammasini 'bug' deymiz, lekin professional muhitda to'rt xil termin bor va ular aniq farq qiladi." },
        { type: "table", head: ["Termin", "Ma'nosi", "Kim/nima"], rows: [
          ["Error (xato)", "Insonning xatosi — noto'g'ri yozdi, noto'g'ri tushundi", "Dasturchi / analitik"],
          ["Defect / Bug", "O'sha xato tufayli mahsulotdagi nuqson", "Kod ichida"],
          ["Failure (nosozlik)", "Bug ishga tushib, tizim noto'g'ri natija bergani", "Ishlash paytida"],
          ["Fault", "Defect bilan bir xil (sinonim)", "Kod ichida"],
        ]},
        { type: "h", text: "Zanjir qanday ishlaydi" },
        { type: "example", text: "1. Dasturchi shoshib '+' o'rniga '-' yozdi → bu ERROR (inson xatosi).\n2. Natijada kalkulyator kodida nuqson paydo bo'ldi → bu DEFECT/BUG.\n3. Foydalanuvchi 2+2 bosdi va 0 chiqdi → bu FAILURE (nosozlik yuz berdi)." },
        { type: "p", text: "Muhim nuqta: har bir bug albatta failure'ga olib kelmaydi. Agar bug kodning hech qachon ishlamaydigan qismida bo'lsa, u hech qachon failure bermaydi — lekin baribir bug bo'lib qolaveradi." },
        { type: "key", text: "Zanjir: Error (inson) → Defect/Bug (kod) → Failure (ishlash paytida). Bug bor bo'lsa ham, failure bo'lmasligi mumkin." },
      ],
    },

    /* ============================================================ 7 */
    {
      id: "l1-07-severity",
      title: "Severity — jiddiylik",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Severity — bug TEXNIK jihatdan qanchalik og'ir ekanini bildiradi. Ya'ni: bu bug tizimga qancha zarar yetkazadi? Buni odatda QA belgilaydi." },
        { type: "h", text: "Severity darajalari" },
        { type: "table", head: ["Daraja", "Ma'nosi", "Misol"], rows: [
          ["Critical / Blocker", "Tizim umuman ishlamaydi, davom etib bo'lmaydi", "Sayt ochilmaydi, login butunlay ishlamaydi, ma'lumot yo'qolyapti"],
          ["Major / High", "Muhim funksiya ishlamaydi, lekin chetlab o'tish mumkin", "To'lov o'tmayapti, savat saqlanmayapti"],
          ["Minor / Medium", "Kichik funksional muammo, ish davom etadi", "Filtr noto'g'ri saralayapti, sana formati xato"],
          ["Trivial / Low", "Kosmetik, ishlashga ta'sir qilmaydi", "Imlo xatosi, tugma 2px siljigan, rang biroz boshqacha"],
        ]},
        { type: "example", text: "Onlayn do'konda 'Xarid qilish' tugmasi bosilganda 500 xatosi chiqadi → hech kim xarid qila olmaydi → Severity: CRITICAL.\n\nO'sha do'konda 'Biz haqimizda' sahifasida bitta imlo xatosi bor → hech narsaga xalaqit bermaydi → Severity: TRIVIAL." },
        { type: "key", text: "Severity — bug qanchalik JIDDIY (texnik ta'sir). QA belgilaydi." },
      ],
    },

    /* ============================================================ 8 */
    {
      id: "l1-08-priority",
      title: "Priority — ustuvorlik",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Priority — bug qanchalik TEZ tuzatilishi kerakligini bildiradi. Bu biznes qarori, shuning uchun odatda menejer / Product Owner belgilaydi." },
        { type: "h", text: "Priority darajalari" },
        { type: "table", head: ["Daraja", "Ma'nosi"], rows: [
          ["P1 / High", "Darhol tuzatilishi kerak — reliz to'xtaydi"],
          ["P2 / Medium", "Yaqin relizda tuzatiladi"],
          ["P3 / Low", "Vaqt bo'lganda tuzatiladi"],
        ]},
        { type: "h", text: "Eng muhim tushuncha: Severity ≠ Priority" },
        { type: "p", text: "Bu ikkisi mustaqil. Ular har xil kombinatsiyada bo'lishi mumkin — va intervyuda aynan shu misollar so'raladi." },
        { type: "table", head: ["Kombinatsiya", "Misol"], rows: [
          ["Yuqori Severity + Yuqori Priority", "To'lov tizimi ishlamayapti — hamma joyda, darhol tuzatish kerak"],
          ["Yuqori Severity + Past Priority", "Yiliga bir marta ochiladigan admin sahifa butunlay ishlamaydi — jiddiy, lekin shoshilinch emas"],
          ["Past Severity + Yuqori Priority", "Bosh sahifadagi kompaniya nomida imlo xatosi — kichik, lekin obro'ga ta'sir qiladi, darhol tuzatish kerak"],
          ["Past Severity + Past Priority", "Footer'dagi rang biroz boshqacha — hech kimga xalaqit bermaydi"],
        ]},
        { type: "warn", text: "Intervyuda 'Past severity, lekin yuqori priority bug misol keltiring' deb so'rashadi. Javob: bosh sahifadagi logotip yoki kompaniya nomidagi imlo xatosi." },
        { type: "key", text: "Severity = qanchalik jiddiy (QA belgilaydi). Priority = qachon tuzatamiz (biznes belgilaydi)." },
      ],
    },

    /* ============================================================ 9 */
    {
      id: "l1-09-bug-life-cycle",
      title: "Bug Life Cycle — bug hayoti",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Bug topilgandan yopilgunga qadar bir necha holatdan (status) o'tadi. Bu yo'l 'bug life cycle' deyiladi va Jira kabi tizimlarda aynan shunday kuzatiladi." },
        { type: "h", text: "Asosiy oqim" },
        { type: "code", text: `New          → QA bug topdi va yozdi
  ↓
Assigned     → Lead dasturchiga biriktirdi
  ↓
Open         → Dasturchi ustida ishlayapti
  ↓
Fixed        → Dasturchi tuzatdim dedi
  ↓
Retest       → QA qayta tekshiryapti
  ↓
  ├── Closed    ✅ Tuzatilgan, yopildi
  └── Reopened  ❌ Hali ham bor — qaytadan Open'ga` },
        { type: "h", text: "Boshqa yakunlar" },
        { type: "table", head: ["Status", "Qachon ishlatiladi"], rows: [
          ["Rejected", "Bu bug emas — tizim to'g'ri ishlayapti (QA noto'g'ri tushungan)"],
          ["Duplicate", "Bu bug allaqachon yozilgan"],
          ["Deferred", "Bug bor, lekin keyingi relizga qoldirildi"],
          ["Won't Fix", "Bug tan olindi, lekin tuzatilmaydi (juda kichik yoki juda qimmat)"],
          ["Cannot Reproduce", "Dasturchi takrorlay olmadi"],
        ]},
        { type: "example", text: "Siz savat bug'ini topdingiz → New. Lead Alisherga berdi → Assigned. Alisher tuzatdi → Fixed. Siz qayta tekshirdingiz — hali ham bor → Reopened. Alisher yana tuzatdi → Fixed. Endi ishlayapti → Closed. ✅" },
        { type: "warn", text: "'Cannot Reproduce' ko'p chiqsa — bu sizning bug report'ingiz sifatsiz degani. Steps to reproduce aniq bo'lmasa, dasturchi takrorlay olmaydi." },
        { type: "key", text: "New → Assigned → Open → Fixed → Retest → Closed (yoki Reopened). Bu QA'ning kundalik ish oqimi." },
      ],
    },

    /* ============================================================ 10 */
    {
      id: "l1-10-requirement-analysis",
      title: "Requirement Analysis — talablarni tahlil qilish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Testing kodni ochishdan emas, TALABNI O'QISHDAN boshlanadi. Agar nima bo'lishi kerakligini bilmasangiz, nimani test qilishni ham bilmaysiz." },
        { type: "h", text: "Yaxshi talab qanday bo'ladi" },
        { type: "table", head: ["Xususiyat", "Ma'nosi"], rows: [
          ["Aniq (Clear)", "Bir xil tushuniladi, ikki xil ma'no yo'q"],
          ["Testlanadigan (Testable)", "Uni tekshirish mumkin — 'to'g'rimi?' deb aytish mumkin"],
          ["To'liq (Complete)", "Barcha holatlar qamrab olingan"],
          ["Ziddiyatsiz (Consistent)", "Boshqa talablarga qarama-qarshi emas"],
          ["Bajariladigan (Feasible)", "Texnik jihatdan mumkin"],
        ]},
        { type: "h", text: "Yomon va yaxshi talab" },
        { type: "example", text: "❌ YOMON: 'Sayt tez ishlasin.'\nNega yomon? 'Tez' — qancha? 1 soniyami, 5 soniyami? Test qilib bo'lmaydi.\n\n✅ YAXSHI: 'Bosh sahifa 3G ulanishda 3 soniyadan kam vaqtda yuklansin.'\nNega yaxshi? Aniq raqam bor, o'lchash mumkin, test qilinadi." },
        { type: "h", text: "QA qanday savol beradi" },
        { type: "list", items: [
          "Agar foydalanuvchi bo'sh forma yuborsa nima bo'ladi?",
          "Maksimal va minimal qiymat qancha?",
          "Xato bo'lsa qanday xabar chiqadi?",
          "Bu funksiya kimlarga ko'rinadi? Ruxsat qanday tekshiriladi?",
          "Internet uzilsa nima bo'ladi?",
          "Bir vaqtda ikki foydalanuvchi o'zgartirsa-chi?",
        ]},
        { type: "tip", text: "Talablar bosqichida topilgan xato — eng arzon xato. Production'da topilgan o'sha xato ~100 barobar qimmatga tushadi. Shuning uchun savol berishdan qo'rqmang." },
        { type: "key", text: "Test talabdan boshlanadi. Talab noaniq bo'lsa — savol bering, taxmin qilmang." },
      ],
    },

    /* ============================================================ 11 */
    {
      id: "l1-11-functional-testing",
      title: "Functional Testing — funksional testlash",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Functional testing — tizim NIMA QILISHINI tekshiradi. Ya'ni: funksiya talabga muvofiq ishlayaptimi?" },
        { type: "p", text: "Bu testda siz kod ichini ko'rmaysiz (black box) — faqat kirish beriladi va chiqish tekshiriladi." },
        { type: "h", text: "Nimalar tekshiriladi" },
        { type: "table", head: ["Soha", "Misol savol"], rows: [
          ["Asosiy funksiyalar", "Login ishlayaptimi? Xarid amalga oshyaptimi?"],
          ["Ma'lumot kiritish", "Forma to'g'ri qabul qilyaptimi? Validatsiya bormi?"],
          ["Biznes mantiq", "Chegirma to'g'ri hisoblanyaptimi?"],
          ["Ma'lumot bazasi", "Ma'lumot to'g'ri saqlanyaptimi?"],
          ["Xato holatlar", "Noto'g'ri kiritishda to'g'ri xabar chiqyaptimi?"],
          ["Ruxsatlar", "Oddiy foydalanuvchi admin sahifasiga kira olmasligi kerak"],
        ]},
        { type: "example", text: "Login funksiyasini functional test qilish:\n\n✅ To'g'ri email + to'g'ri parol → tizimga kiradi\n✅ To'g'ri email + noto'g'ri parol → xato xabari\n✅ Bo'sh maydonlar → 'Majburiy maydon' xatosi\n✅ Noto'g'ri email formati → format xatosi\n✅ 5 marta noto'g'ri → hisob bloklanadi" },
        { type: "key", text: "Functional testing — 'tizim NIMA qiladi' degan savolga javob beradi. Talabga solishtiriladi." },
      ],
    },

    /* ============================================================ 12 */
    {
      id: "l1-12-non-functional-testing",
      title: "Non-functional Testing",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Non-functional testing — tizim QANDAY ishlashini tekshiradi. Funksiya bor, lekin u tez ishlaydimi? Xavfsizmi? Qulaymi?" },
        { type: "h", text: "Asosiy turlari" },
        { type: "table", head: ["Tur", "Nimani tekshiradi", "Misol savol"], rows: [
          ["Performance", "Tezlik va javob vaqti", "Sahifa necha soniyada yuklanadi?"],
          ["Load", "Kutilgan yuklama ostida ishlashi", "1000 foydalanuvchi bir vaqtda kirsa?"],
          ["Stress", "Chegaradan oshganda nima bo'ladi", "10 000 foydalanuvchi kirса tizim yiqiladimi?"],
          ["Security", "Xavfsizlik", "Ruxsatsiz ma'lumotga kirish mumkinmi?"],
          ["Usability", "Qulaylik", "Foydalanuvchi tugmani topa olyaptimi?"],
          ["Compatibility", "Turli muhitda ishlashi", "Safari'da ham ishlaydimi? Telefonda-chi?"],
          ["Accessibility", "Imkoniyati cheklanganlar uchun", "Screen reader o'qiy oladimi?"],
          ["Reliability", "Barqarorlik", "24 soat uzluksiz ishlaydimi?"],
        ]},
        { type: "example", text: "'Login tugmasi bosilganda tizimga kiradi' → FUNCTIONAL (nima qiladi).\n\n'Login 2 soniyadan kam vaqtda amalga oshadi' → NON-FUNCTIONAL / Performance (qanday qiladi).\n\n'Login sahifasi parolni ochiq matnda yubormaydi' → NON-FUNCTIONAL / Security." },
        { type: "warn", text: "Ko'p loyihada non-functional test e'tibordan chetda qoladi. Natija: funksiya ishlaydi, lekin sayt sekin, xavfsiz emas yoki telefonda buziladi." },
        { type: "key", text: "Functional = NIMA qiladi. Non-functional = QANDAY qiladi (tez, xavfsiz, qulay, barqaror)." },
      ],
    },

    /* ============================================================ 13 */
    {
      id: "l1-13-smoke-testing",
      title: "Smoke Testing",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Smoke testing — yangi build umuman ishlaydimi yo'qmi degan tez, yuzaki tekshiruv. Chuqur emas — faqat 'asosiy narsalar ishlayaptimi?' degan savolga javob beradi." },
        { type: "p", text: "Nomi elektronika sohasidan kelgan: yangi qurilmaga tok berilганда tutun (smoke) chiqsa — batafsil tekshirishning ma'nosi yo'q, qurilma nosoz." },
        { type: "h", text: "Nima tekshiriladi" },
        { type: "list", items: [
          "Ilova umuman ochiladimi?",
          "Login ishlaydimi?",
          "Asosiy sahifalar yuklanadimi?",
          "Kritik funksiya (masalan xarid) ishga tushadimi?",
        ]},
        { type: "h", text: "Muhim xususiyatlar" },
        { type: "table", head: ["Xususiyat", "Izoh"], rows: [
          ["Qachon", "Har yangi build kelganda, testdan OLDIN"],
          ["Chuqurlik", "Yuzaki — 'keng, lekin sayoz'"],
          ["Davomiylik", "Qisqa (15-30 daqiqa)"],
          ["Maqsad", "Build'ni qabul qilish yoki rad etish"],
        ]},
        { type: "example", text: "Dasturchi yangi build berdi. Siz smoke test qildingiz: sayt ochildi ✅, login ishladi ✅, mahsulotlar ko'rindi ✅, savat ochildi ✅ → build QABUL QILINDI, chuqur testga o'tsa bo'ladi.\n\nAgar login umuman ishlamasa → build RAD ETILADI, chuqur test qilishning ma'nosi yo'q — dasturchiga qaytariladi." },
        { type: "key", text: "Smoke test — 'build umuman ishlaydimi?' Keng, lekin sayoz. Chuqur testdan oldin qilinadi." },
      ],
    },

    /* ============================================================ 14 */
    {
      id: "l1-14-sanity-testing",
      title: "Sanity Testing",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Sanity testing — muayyan tuzatish yoki o'zgarishdan keyin, aynan O'SHA qism to'g'ri ishlayaptimi degan tor, lekin chuqurroq tekshiruv." },
        { type: "h", text: "Smoke va Sanity farqi" },
        { type: "table", head: ["", "Smoke", "Sanity"], rows: [
          ["Qamrov", "Keng — butun tizimning asosiy funksiyalari", "Tor — faqat o'zgargan qism"],
          ["Chuqurlik", "Sayoz", "Chuqurroq"],
          ["Qachon", "Har yangi build kelganda", "Kichik tuzatish/o'zgarishdan keyin"],
          ["Maqsad", "Build qabul qilinsinmi?", "Tuzatish to'g'ri ishladimi?"],
          ["Hujjatlanadimi", "Odatda ha (checklist)", "Odatda yo'q (tez, norasmiy)"],
        ]},
        { type: "example", text: "Dasturchi savatdagi hisob-kitob bug'ini tuzatdi.\n\nSANITY: Siz faqat savatga kirib, miqdor o'zgartirib, jami summani tekshirasiz — hisob to'g'ri chiqyaptimi? Tor, lekin chuqur.\n\n(SMOKE bo'lsa: butun sayt ochiladimi, login, mahsulotlar, savat, checkout — hammasi yuzaki tekshiriladi.)" },
        { type: "tip", text: "Yodda tutish: Smoke — KENG va SAYOZ. Sanity — TOR va CHUQUR." },
        { type: "key", text: "Sanity — 'tuzatilgan qism to'g'ri ishlayaptimi?' Tor va chuqur tekshiruv." },
      ],
    },

    /* ============================================================ 15 */
    {
      id: "l1-15-regression-testing",
      title: "Regression Testing",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Regression testing — yangi o'zgarish ESKI, ishlab turgan funksiyalarni buzmaganini tekshirish. Bu QA'ning eng muhim va eng ko'p vaqt oladigan ishlaridan biri." },
        { type: "p", text: "Sabab oddiy: dasturda hamma narsa bir-biriga bog'liq. Bir joyni o'zgartirsangiz, kutilmagan boshqa joy buzilishi mumkin." },
        { type: "h", text: "Qachon regression qilinadi" },
        { type: "list", items: [
          "Yangi funksiya qo'shilganda",
          "Bug tuzatilganda",
          "Kod refactoring qilinganda",
          "Muhit yoki kutubxona yangilanganda",
          "Reliz oldidan",
        ]},
        { type: "h", text: "Muammо: hamma narsani test qilib bo'lmaydi" },
        { type: "p", text: "Loyiha o'sgan sari regression test to'plami ham o'sadi. Oxir-oqibat uni qo'lda bajarish imkonsiz bo'lib qoladi. Yechim:" },
        { type: "table", head: ["Yechim", "Izoh"], rows: [
          ["Ustuvorlik (Risk-based)", "Faqat o'zgarish ta'sir qilishi mumkin bo'lgan va eng muhim qismlarni test qilish"],
          ["Avtomatlashtirish", "Regression to'plamini avtomatik testlarga o'tkazish — eng samarali yo'l"],
          ["Test to'plamini yangilash", "Eskirgan, foydasiz testlarni olib tashlash"],
        ]},
        { type: "example", text: "Dasturchi login modulida parolni shifrlash usulini o'zgartirdi.\n\nRegression testda tekshirish kerak:\n• Login hali ishlayaptimi?\n• Ro'yxatdan o'tish ishlayaptimi? (u ham parol bilan ishlaydi)\n• Parolni tiklash ishlayaptimi?\n• Profil sahifasida parol o'zgartirish?\n• Eski foydalanuvchilar hali kira olyaptimi?" },
        { type: "warn", text: "Regression'ni o'tkazib yuborish — QA'ning eng qimmat xatosi. Kichik tuzatish butun tizimni buzishi mumkin." },
        { type: "key", text: "Regression — 'yangi o'zgarish eski narsani buzmadimi?' Avtomatlashtirish uchun eng yaxshi nomzod." },
      ],
    },

    /* ============================================================ 16 */
    {
      id: "l1-16-retesting",
      title: "Retesting — qayta tekshirish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Retesting — dasturchi tuzatdim degan AYNAN O'SHA bug haqiqatan tuzatilganini tekshirish. Oddiy, lekin muhim." },
        { type: "h", text: "Retesting va Regression — eng ko'p chalkashtiriladigan juftlik" },
        { type: "table", head: ["", "Retesting", "Regression"], rows: [
          ["Maqsad", "Bug tuzatildimi?", "Boshqa narsa buzilmadimi?"],
          ["Nimani test qiladi", "Aynan o'sha bug", "Boshqa, ishlab turgan funksiyalar"],
          ["Test case", "Bug topilgan o'sha case (fail bo'lgan)", "Oldin pass bo'lgan case'lar"],
          ["Rejalashtiriladimi", "Yo'q — bug tuzatilganda qilinadi", "Ha — reja bo'yicha"],
          ["Avtomatlashtiriladimi", "Odatda yo'q", "Ha, albatta"],
        ]},
        { type: "example", text: "Siz bug topdingiz: 'Bo'sh parol bilan login bo'lyapti'.\nDasturchi tuzatdi.\n\nRETESTING: Bo'sh parol bilan login qilib ko'rasiz → endi xato chiqyaptimi? ✅\n\nREGRESSION: Keyin login'ning boshqa holatlarini ham tekshirasiz — to'g'ri parol ishlayaptimi, ro'yxatdan o'tish buzilmadimi, parolni tiklash-chi?" },
        { type: "tip", text: "Tartib: avval RETEST (bug tuzalganmi?), keyin REGRESSION (boshqa joy buzilmadimi?)." },
        { type: "key", text: "Retesting = aynan o'sha bug. Regression = boshqa joylar. Intervyuda 100% so'raladi." },
      ],
    },

    /* ============================================================ 17 */
    {
      id: "l1-17-exploratory-testing",
      title: "Exploratory Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Exploratory testing — oldindan yozilgan test case'siz, mahsulotni erkin o'rganib, bir vaqtda o'rganish + test dizayn + bajarish. Bu tartibsizlik emas — bu tizimli erkinlik." },
        { type: "p", text: "Siz mahsulotni ishlatasiz, o'rganasiz, savol tug'iladi, o'sha savolni darrov tekshirib ko'rasiz, natija yangi savol tug'diradi — va shu tarzda chuqurlashib borasiz." },
        { type: "h", text: "Qachon ayniqsa foydali" },
        { type: "list", items: [
          "Talablar to'liq emas yoki yo'q",
          "Vaqt kam, tez natija kerak",
          "Yangi funksiya — hali test case yozilmagan",
          "Skriptli testlar hech narsa topmayapti (pestitsid paradoksi)",
          "Mahsulotni chuqur tushunish kerak",
        ]},
        { type: "h", text: "Qanday tizimli qilish mumkin — Session-Based Testing" },
        { type: "table", head: ["Element", "Izoh"], rows: [
          ["Charter (missiya)", "Nimani o'rganamiz? Masalan: 'Savat funksiyasidagi chegara holatlarini o'rganish'"],
          ["Time-box", "Qat'iy vaqt — masalan 60 daqiqa"],
          ["Notes", "Nima qilganingiz, nima topganingiz yozib boriladi"],
          ["Debrief", "Sessiya oxirida xulosa: nima topildi, nima o'rganildi"],
        ]},
        { type: "example", text: "Charter: 'Login formasidagi xavfsizlik holatlarini 45 daqiqa o'rganish'.\n\nSiz sinaysiz: bo'sh parol → juda uzun parol → SQL belgilar → 100 marta noto'g'ri urinish → boshqa brauzerda sessiya → va h.k. Har natija keyingi g'oyani tug'diradi." },
        { type: "warn", text: "Exploratory testing ≠ tasodifiy bosish. Missiya, vaqt chegarasi va yozib borish bo'lishi shart. Aks holda bu shunchaki vaqt sarfi." },
        { type: "key", text: "Exploratory — o'rganish + test dizayn + bajarish bir vaqtda. Erkin, lekin tizimli (charter + time-box + notes)." },
      ],
    },

    /* ============================================================ 18 */
    {
      id: "l1-18-adhoc-testing",
      title: "Ad-hoc Testing",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Ad-hoc testing — hech qanday reja, hujjat va tuzilmasiz, tasodifiy test qilish. Maqsad — kutilmagan yo'l bilan tizimni buzishga urinish." },
        { type: "h", text: "Exploratory va Ad-hoc farqi" },
        { type: "p", text: "Ular o'xshash, lekin bir xil emas — bu ham intervyu savoli." },
        { type: "table", head: ["", "Exploratory", "Ad-hoc"], rows: [
          ["Tuzilma", "Bor — charter, time-box, notes", "Yo'q"],
          ["Yozib boriladimi", "Ha", "Odatda yo'q"],
          ["Maqsad", "Tizimli o'rganish", "Tasodifiy buzishga urinish"],
          ["Takrorlanadimi", "Qisman", "Yo'q"],
          ["Bilim talab qiladimi", "Ha — mahsulotni tushunish", "Kam"],
        ]},
        { type: "h", text: "Ad-hoc turlari" },
        { type: "table", head: ["Tur", "Izoh"], rows: [
          ["Buddy testing", "QA va dasturchi birga test qiladi"],
          ["Pair testing", "Ikki QA birga, biri qiladi biri kuzatadi"],
          ["Monkey testing", "Tasodifiy bosish/kiritish — tizim yiqiladimi?"],
        ]},
        { type: "example", text: "Ad-hoc misol: Formaga 10 000 belgili matn kiritib ko'rasiz. Ikki tugmani bir vaqtda bosasiz. Sahifa yuklanayotganda orqaga bosasiz. Bular rejada yo'q edi — shunchaki 'nima bo'larkin?' deb sinayapsiz." },
        { type: "tip", text: "Ad-hoc testda topilgan bug'ni albatta HUJJATLANG va takrorlash qadamlarini yozing — aks holda uni hech kim tuzata olmaydi." },
        { type: "key", text: "Ad-hoc — rejasiz, tasodifiy. Exploratory — erkin, lekin tizimli. Ad-hoc'da topilgan bug ham albatta hujjatlanadi." },
      ],
    },

    /* ============================================================ 19 */
    {
      id: "l1-19-shift-left",
      title: "Shift Left Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Shift Left — testingni SDLC'ning chap tomoniga, ya'ni ERTAROQ bosqichlarga surish. An'anaviy modelda testing oxirida bo'lardi; shift-left'da u boshidan boshlanadi." },
        { type: "h", text: "Nega bu muhim — bug narxi" },
        { type: "table", head: ["Bug qayerda topildi", "Tuzatish narxi (nisbiy)"], rows: [
          ["Talablar bosqichida", "1x — juda arzon"],
          ["Dizayn bosqichida", "~5x"],
          ["Dasturlash bosqichida", "~10x"],
          ["Testing bosqichida", "~15x"],
          ["Production'da (foydalanuvchida)", "~100x — juda qimmat"],
        ]},
        { type: "p", text: "Ya'ni talablar bosqichida 5 daqiqada tuzatiladigan noaniqlik, production'da bir necha kunlik ish va obro' zarariga aylanadi." },
        { type: "h", text: "QA shift-left'da nima qiladi" },
        { type: "list", items: [
          "Talablar muhokamasida qatnashadi va savol beradi",
          "Acceptance criteria yozishda ishtirok etadi",
          "Dizaynni ko'rib chiqadi (testlanadigan bo'lsinmi?)",
          "Dasturchi kod yozayotganda test case tayyorlaydi",
          "Kod review'da qatnashadi",
          "Avtomatik testlarni CI/CD'ga qo'shadi",
        ]},
        { type: "example", text: "An'anaviy: dasturchi 2 hafta kod yozdi, keyin QA test qildi va 'bu talab noaniq edi, butunlay boshqacha qilibsiz' dedi. → 2 hafta yo'qoldi.\n\nShift-left: QA talab muhokamasida 'foydalanuvchi bo'sh forma yuborsa nima bo'ladi?' deb so'radi. → Noaniqlik 5 daqiqada hal bo'ldi." },
        { type: "key", text: "Shift Left — testingni erta boshlash. Erta topilgan bug ~100 barobar arzon. QA talablar bosqichidayoq ishtirok etadi." },
      ],
    },

    /* ============================================================ 20 */
    {
      id: "l1-20-qa-mindset",
      title: "QA Mindset — QA qanday fikrlaydi",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Texnik bilim o'rganiladi. Lekin yaxshi QA'ni ajratib turadigan narsa — FIKRLASH USULI. Bu darsda aynan shu haqda." },
        { type: "h", text: "QA fikrlashining asosiy xususiyatlari" },
        { type: "table", head: ["Xususiyat", "Amalda nima demak"], rows: [
          ["Shubha (Skepticism)", "'Ishlaydi' degan so'zga ishonmaslik — o'zi tekshirish"],
          ["Qiziquvchanlik", "'Agar shunday qilsam nima bo'ladi?' deb so'rash"],
          ["Diqqat (Attention to detail)", "Kichik nomuvofiqlikni sezish"],
          ["Foydalanuvchi ko'zi", "'Men foydalanuvchi bo'lsam, buni qanday ishlatardim?'"],
          ["Buzuvchi tafakkur", "'Bu tizimni qanday buzsam bo'ladi?'"],
          ["Muloqot", "Bug'ni ayblovsiz, aniq va hurmat bilan yetkazish"],
        ]},
        { type: "h", text: "QA doim beradigan savollar" },
        { type: "list", items: [
          "Agar bo'sh qoldirsam nima bo'ladi?",
          "Agar juda katta / juda kichik qiymat kiritsam?",
          "Agar ikki marta bossam?",
          "Agar internet uzilsa?",
          "Agar boshqa foydalanuvchi bir vaqtda o'zgartirsa?",
          "Bu xato xabari foydalanuvchiga tushunarlimi?",
          "Bu funksiya telefonda ham ishlaydimi?",
        ]},
        { type: "h", text: "Muhim: QA ayblamaydi" },
        { type: "p", text: "Bug topish — dasturchini ayblash emas. Xato qilish tabiiy; QA va dasturchi bir jamoada, bir maqsad uchun ishlaydi: yaxshi mahsulot. Bug report'da 'siz xato qildingiz' emas, 'bu holatda tizim shunday ishlayapti' deb yoziladi." },
        { type: "warn", text: "Yangi QA ko'p qiladigan xato: bug topganda g'urur qilish yoki dasturchini ayblash. Bu munosabatni buzadi va jamoaga zarar keltiradi. Bug — jamoaning umumiy muammosi." },
        { type: "key", text: "QA mindset: shubha + qiziquvchanlik + diqqat + foydalanuvchi ko'zi + hurmatli muloqot. Bilim o'rganiladi, mindset shakllantiriladi." },
      ],
    },

    /* ============================================================ 21 — PRACTICAL */
    {
      id: "l1-21-practical",
      title: "Amaliyot: birinchi bug hunt",
      type: "practical",
      minutes: 30,
      body: [
        { type: "p", text: "20 ta nazariy dars o'qidingiz. Endi bilimni amalda sinaysiz — haqiqiy demo saytda o'zingiz bug topasiz." },
        { type: "p", text: "SauceDemo — QA'lar mashq qilishi uchun maxsus yaratilgan demo do'kon. Unda bir necha xil foydalanuvchi bor, ulardan biri — 'problem_user' — ataylab nosoz." },
        { type: "h", text: "Topshiriqda nimani qo'llaysiz" },
        { type: "list", items: [
          "QA Mindset — shubha bilan yondashish, har elementni tekshirish",
          "Functional testing — funksiya talabga muvofiq ishlayaptimi?",
          "Exploratory testing — erkin o'rganish, savol tug'ilsa darrov sinash",
          "Severity — topgan bug'ingizni baholash",
        ]},
        { type: "tip", text: "Shoshilmang. Har mahsulotni alohida ko'ring, har tugmani bosing, natijani kuzating. QA'ning kuchi — diqqatda." },
      ],
      practical: {
        targetUrl: "https://www.saucedemo.com",
        targetName: "SauceDemo",
        task: "SauceDemo saytiga 'problem_user' hisobi bilan kiring (parol: secret_sauce). Saytni sinchiklab test qiling va kamida 3 ta bug toping. Har bir bug uchun daftaringizga yozing: (1) qisqa title, (2) takrorlash qadamlari, (3) kutilgan natija, (4) haqiqiy natija, (5) severity darajasi.",
        steps: [
          "Saytni yangi tabda oching va problem_user / secret_sauce bilan kiring",
          "Mahsulotlar sahifasidagi RASMLARNI bir-biri bilan solishtiring",
          "Har bir 'Add to cart' tugmasini alohida bosib, savat holatini kuzating",
          "Savatga bir necha mahsulot qo'shib, savat sahifasini oching",
          "Checkout jarayonini boshlang va formani to'ldiring — har maydonni sinang",
          "Topgan har bug'ingizga severity bering (Critical / Major / Minor / Trivial)",
        ],
        debrief:
          "Topishingiz kerak bo'lgan asosiy buglar:\n\n1) Barcha mahsulot rasmlari bir xil / noto'g'ri — bu UI bug (Severity: Minor yoki Major, chunki foydalanuvchi mahsulotni ajrata olmaydi).\n\n2) Ba'zi 'Add to cart' tugmalari noto'g'ri ishlaydi — bosilgach holat o'zgarmaydi yoki boshqa mahsulot qo'shiladi (Severity: Major — asosiy funksiya buzilgan).\n\n3) Checkout formasida Last Name maydoni bilan muammo — kiritilgan matn qabul qilinmaydi yoki noto'g'ri saqlanadi (Severity: Major — xarid yakunlanmaydi).\n\nAgar uchalasini topgan bo'lsangiz — ajoyib, siz haqiqiy QA ishini bajardingiz. Topmagan bo'lsangiz — qaytib ko'ring va har elementga alohida e'tibor bering. Bug topish — mashq bilan o'sadigan ko'nikma.",
      },
    },

    /* ============================================================ 22 — QUIZ */
    {
      id: "l1-22-quiz",
      title: "Yakuniy test: QA Asoslari",
      type: "quiz",
      minutes: 10,
      body: [
        { type: "p", text: "Level 1 ni yakunlash uchun quyidagi savollarga javob bering. Barcha savolga to'g'ri javob berish talab qilinadi — bu bilimingizni mustahkamlaydi." },
        { type: "tip", text: "Agar biror savolda xato qilsangiz, izohni o'qing va tegishli darsga qaytib ko'ring. Shoshilmang." },
      ],
      quiz: [
        {
          id: "l1q1",
          q: "QA va QC o'rtasidagi asosiy farq nima?",
          options: [
            "Ular bir xil narsa",
            "QA — jarayonga qaratilgan, xatoning oldini oladi; QC — mahsulotga qaratilgan, xatoni topadi",
            "QC faqat avtomatlashtirilgan testlar bilan shug'ullanadi",
            "QA faqat dasturchilar ishi",
          ],
          answer: 1,
          explain: "QA — proaktiv, jarayonga qaratilgan (xato bo'lmasin). QC — reaktiv, mahsulotga qaratilgan (xato bormi?). Testing esa QC ichidagi amaliyot.",
        },
        {
          id: "l1q2",
          q: "Verification qaysi savolga javob beradi?",
          options: [
            "To'g'ri mahsulotni yasayapmizmi?",
            "Mahsulotni to'g'ri yasayapmizmi? (hujjat va talabga mosligi)",
            "Mahsulot qimmatmi?",
            "Foydalanuvchi kim?",
          ],
          answer: 1,
          explain: "Verification — hujjat/talabga mosligini tekshiradi ('to'g'ri yasayapmizmi'). Validation esa foydalanuvchi ehtiyojiga mosligini ('to'g'ri mahsulotmi').",
        },
        {
          id: "l1q3",
          q: "Error → Defect → Failure zanjiri nimani anglatadi?",
          options: [
            "Uchtasi bir xil narsa",
            "Inson xatosi (Error) → koddagi nuqson (Defect/Bug) → ishlashda nosozlik (Failure)",
            "Failure eng birinchi bo'ladi",
            "Defect faqat production'da paydo bo'ladi",
          ],
          answer: 1,
          explain: "Dasturchi xato qiladi (Error) → kodda nuqson paydo bo'ladi (Defect/Bug) → ishga tushganda noto'g'ri natija beradi (Failure).",
        },
        {
          id: "l1q4",
          q: "Severity va Priority o'rtasidagi farq nima?",
          options: [
            "Ular bir xil",
            "Severity — bug qanchalik jiddiy (texnik); Priority — qachon tuzatilishi kerak (biznes)",
            "Priority'ni faqat QA belgilaydi",
            "Severity'ni menejer belgilaydi",
          ],
          answer: 1,
          explain: "Severity — texnik jiddiylik, QA belgilaydi. Priority — qachon tuzatamiz, biznes/menejer belgilaydi. Ular mustaqil bo'lishi mumkin.",
        },
        {
          id: "l1q5",
          q: "Past severity, lekin yuqori priority bugga misol qaysi?",
          options: [
            "Yiliga bir marta ochiladigan admin sahifa ishlamaydi",
            "Bosh sahifadagi kompaniya nomida imlo xatosi",
            "To'lov tizimi butunlay ishlamaydi",
            "Footer'dagi rang biroz boshqacha",
          ],
          answer: 1,
          explain: "Imlo xatosi texnik jihatdan kichik (past severity), lekin bosh sahifada bo'lgani uchun obro'ga ta'sir qiladi va darhol tuzatish kerak (yuqori priority).",
        },
        {
          id: "l1q6",
          q: "Smoke va Sanity testing farqi?",
          options: [
            "Ular bir xil",
            "Smoke — keng va sayoz (build umuman ishlaydimi?); Sanity — tor va chuqur (tuzatilgan qism ishlaydimi?)",
            "Smoke faqat avtomatik bo'ladi",
            "Sanity butun tizimni tekshiradi",
          ],
          answer: 1,
          explain: "Smoke — yangi build'ning asosiy funksiyalarini yuzaki tekshiradi (keng, sayoz). Sanity — muayyan tuzatishdan keyin o'sha qismni chuqurroq tekshiradi (tor, chuqur).",
        },
        {
          id: "l1q7",
          q: "Retesting va Regression farqi?",
          options: [
            "Ular bir xil",
            "Retesting — aynan o'sha bug tuzatildimi?; Regression — o'zgarish boshqa ishlaydigan joylarni buzmadimi?",
            "Regression faqat bug tuzatilganda qilinadi",
            "Retesting avtomatlashtirish uchun eng yaxshi nomzod",
          ],
          answer: 1,
          explain: "Retesting — tuzatilgan AYNAN O'SHA bug'ni tekshiradi. Regression — o'zgarish eski, ishlab turgan funksiyalarni buzmaganini tekshiradi.",
        },
        {
          id: "l1q8",
          q: "Shift Left Testing nimani anglatadi?",
          options: [
            "Testni oxirida qilish",
            "Testingni SDLC'ning erta bosqichlariga surish — talablar bosqichidayoq boshlash",
            "Faqat avtomatik test qilish",
            "Testni dasturchiga topshirish",
          ],
          answer: 1,
          explain: "Shift Left — testingni erta boshlash. Sabab: talablar bosqichida topilgan bug ~1x, production'da ~100x qimmatga tushadi.",
        },
        {
          id: "l1q9",
          q: "Exploratory va Ad-hoc testing farqi?",
          options: [
            "Ular bir xil",
            "Exploratory — tizimli erkinlik (charter, time-box, notes bor); Ad-hoc — rejasiz, tasodifiy",
            "Ad-hoc'da hujjat majburiy",
            "Exploratory faqat avtomatik",
          ],
          answer: 1,
          explain: "Exploratory — erkin, lekin tizimli: missiya (charter), vaqt chegarasi va yozib borish bor. Ad-hoc — hech qanday tuzilmasiz, tasodifiy sinash.",
        },
        {
          id: "l1q10",
          q: "Functional va Non-functional testing farqi?",
          options: [
            "Functional — tizim NIMA qiladi; Non-functional — QANDAY qiladi (tez, xavfsiz, qulay)",
            "Non-functional faqat dizaynni tekshiradi",
            "Functional faqat avtomatik bo'ladi",
            "Ular bir xil",
          ],
          answer: 0,
          explain: "Functional — funksiya talabga muvofiq ishlayaptimi (nima qiladi). Non-functional — performance, security, usability, compatibility (qanday qiladi).",
        },
      ],
    },
  ],
};
