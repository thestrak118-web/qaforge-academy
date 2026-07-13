// data/modules/level-10-career.ts
//
// LEVEL 10 — Career
// 15 theory + 1 capstone practical + 1 quiz = 17 sections

import type { Module } from "../lessons";

export const LEVEL_10: Module = {
  id: "qa-career",
  icon: "🎓",
  title: "Level 10 — Karyera",
  summary:
    "Jamoada ishlash (Agile, Scrum, Jira, Git), intervyuga tayyorgarlik, CV, portfolio va yakuniy capstone loyiha.",
  level: "junior",
  sections: [
    {
      id: "l10-01-agile",
      title: "Agile",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Agile — dasturiy ta'minot ishlab chiqishning moslashuvchan yondashuvi. Uzoq rejalar o'rniga qisqa sikllar, doimiy fikr-mulohaza va tez moslashuv." },
        { type: "h", text: "Agile Manifest — 4 qadriyat" },
        { type: "table", head: ["Ustunroq", "Nisbatan"], rows: [
          ["Insonlar va muloqot", "Jarayon va asboblar"],
          ["Ishlaydigan mahsulot", "Batafsil hujjat"],
          ["Mijoz bilan hamkorlik", "Shartnoma muzokarasi"],
          ["O'zgarishga javob berish", "Rejaga qat'iy amal qilish"],
        ]},
        { type: "p", text: "Muhim: o'ng tomondagilar ham qimmatli, lekin chap tomondagilar ustunroq." },
        { type: "h", text: "Waterfall va Agile" },
        { type: "table", head: ["", "Waterfall", "Agile"], rows: [
          ["Bosqichlar", "Qat'iy ketma-ket", "Takrorlanuvchi sikllar"],
          ["O'zgarish", "Qiyin va qimmat", "Kutiladi va qabul qilinadi"],
          ["Reliz", "Oxirida bir marta", "Har sprintda"],
          ["QA roli", "Oxirida testing", "Boshidan oxirigacha ishtirok"],
        ]},
        { type: "h", text: "QA uchun Agile nima anglatadi" },
        { type: "list", items: [
          "QA jamoaning to'liq a'zosi (alohida 'testing bo'limi' emas)",
          "Talablar muhokamasida qatnashadi",
          "Sprint boshidan test qiladi (oxirida emas)",
          "Tez fikr-mulohaza beradi",
          "Sifat — butun jamoaning mas'uliyati",
        ]},
        { type: "key", text: "Agile — moslashuvchan, takrorlanuvchi yondashuv. QA jamoaning to'liq a'zosi, boshidan ishtirok etadi." },
      ],
    },

    {
      id: "l10-02-scrum",
      title: "Scrum",
      type: "theory",
      minutes: 15,
      body: [
        { type: "p", text: "Scrum — Agile'ning eng mashhur amaliy tizimi. Ish qisqa sikllarga (sprint) bo'linadi, har sprint oxirida ishlaydigan mahsulot bo'lagi chiqadi." },
        { type: "h", text: "Rollar" },
        { type: "table", head: ["Rol", "Vazifa"], rows: [
          ["Product Owner", "Nima qilinishini belgilaydi, backlog'ni boshqaradi"],
          ["Scrum Master", "Jarayonni qo'llab-quvvatlaydi, to'siqlarni olib tashlaydi"],
          ["Development Team", "Dasturchilar, QA, dizaynerlar — mahsulotni yaratadi"],
        ]},
        { type: "h", text: "Marosimlar (Ceremonies)" },
        { type: "table", head: ["Marosim", "Qachon", "QA'ning roli"], rows: [
          ["Sprint Planning", "Sprint boshida", "Testlash hajmini baholaydi, savol beradi"],
          ["Daily Standup", "Har kuni (15 daqiqa)", "Kecha nima qildim / bugun nima / to'siq bormi"],
          ["Sprint Review", "Sprint oxirida", "Natijani ko'rsatadi, sifat holatini aytadi"],
          ["Retrospective", "Sprint oxirida", "Nima yaxshi ketdi, nimani yaxshilash kerak"],
          ["Backlog Refinement", "Sprint davomida", "Talablarni aniqlashtiradi, savol beradi"],
        ]},
        { type: "h", text: "Artefaktlar" },
        { type: "table", head: ["Artefakt", "Ma'nosi"], rows: [
          ["Product Backlog", "Barcha talablar ro'yxati (ustuvorlik bo'yicha)"],
          ["Sprint Backlog", "Shu sprintda bajariladigan ishlar"],
          ["Increment", "Sprint natijasi — ishlaydigan mahsulot bo'lagi"],
          ["Definition of Done", "'Tayyor' degan so'zning aniq ta'rifi"],
        ]},
        { type: "h", text: "Definition of Done — QA uchun eng muhim" },
        { type: "example", text: "Namuna Definition of Done:\n\n☑ Kod yozildi va review qilindi\n☑ Unit testlar yozildi va o'tdi\n☑ Acceptance criteria bajarildi\n☑ QA test qildi, bug topilmadi (yoki tuzatildi)\n☑ Regression testlar o'tdi\n☑ Hujjat yangilandi\n☑ Staging'ga deploy qilindi\n\nAgar bularning biri bajarilmagan bo'lsa — task 'Done' emas!" },
        { type: "key", text: "Scrum — sprint, rollar (PO, SM, Team), marosimlar (planning, standup, review, retro). Definition of Done — QA uchun kalit." },
      ],
    },

    {
      id: "l10-03-jira",
      title: "Jira",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Jira — vazifa va bug'larni boshqarishning eng keng tarqalgan asbobi. Deyarli har QA vakansiyasida talab qilinadi." },
        { type: "h", text: "Issue turlari" },
        { type: "table", head: ["Tur", "Ma'nosi"], rows: [
          ["Epic", "Katta funksiya (bir necha sprint)"],
          ["Story", "Foydalanuvchi talabi ('Foydalanuvchi sifatida men...')"],
          ["Task", "Texnik vazifa"],
          ["Bug", "Topilgan xato"],
          ["Sub-task", "Katta vazifaning bir qismi"],
        ]},
        { type: "h", text: "Bug workflow (holatlar)" },
        { type: "code", text: `Open → In Progress → Ready for QA → In Testing
                                          ↓
                              ┌───────────┴──────────┐
                          Done ✅              Reopened ❌
                                                     ↓
                                              In Progress` },
        { type: "h", text: "QA kundalik ishi Jira'da" },
        { type: "list", items: [
          "Bug yaratish (to'liq: steps, expected, actual, dalil, severity, priority)",
          "Bug'ni dasturchiga biriktirish (assign)",
          "Tuzatilgan bug'ni retest qilish → Done yoki Reopen",
          "Story'larni test qilib, status o'zgartirish",
          "Sprint doskasida (board) ish holatini kuzatish",
        ]},
        { type: "h", text: "JQL — Jira Query Language" },
        { type: "code", text: `# Menga biriktirilgan ochiq bug'lar
assignee = currentUser() AND status != Done AND type = Bug

# Joriy sprintdagi kritik bug'lar
sprint in openSprints() AND priority = Highest

# Oxirgi 7 kunda yaratilgan bug'lar
type = Bug AND created >= -7d

# Menim yaratgan, hali yopilmagan bug'lar
reporter = currentUser() AND resolution = Unresolved` },
        { type: "tip", text: "JQL'ni bilish — QA'ni tajribali qiladi. U bilan o'z dashboard'ingizni yasab, kerakli bug'larni tez topasiz." },
        { type: "key", text: "Jira — vazifa va bug boshqaruvi. Issue turlari, workflow va JQL'ni biling — har vakansiyada so'raladi." },
      ],
    },

    {
      id: "l10-04-confluence",
      title: "Confluence",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Confluence — jamoa hujjatlari uchun platforma (Jira bilan bir kompaniyadan). Talablar, test rejalar, hisobotlar shu yerda saqlanadi." },
        { type: "h", text: "QA nima saqlaydi" },
        { type: "table", head: ["Hujjat", "Nima uchun"], rows: [
          ["Test Plan", "Strategiya, qamrov, resurs, xavflar"],
          ["Test Cases", "Test case to'plami (yoki TestRail'da)"],
          ["Checklist", "Tez tekshiruv ro'yxatlari"],
          ["Test Report", "Sprint/reliz natijalari"],
          ["Bug Analysis", "Bug statistikasi va tendensiyalar"],
          ["QA Process", "Jamoaning QA jarayoni hujjati"],
          ["Onboarding", "Yangi QA uchun qo'llanma"],
        ]},
        { type: "tip", text: "Yaxshi QA hujjatlashni sevadi. Yozilgan bilim — jamoa mulki. Siz ketsangiz ham, bilim qoladi." },
        { type: "key", text: "Confluence — jamoa hujjatlari (test plan, hisobot, jarayon). Jira bilan birga ishlatiladi." },
      ],
    },

    {
      id: "l10-05-git",
      title: "Git asoslari",
      type: "theory",
      minutes: 15,
      body: [
        { type: "p", text: "Git — kod versiyalarini boshqarish tizimi. Automation yozadigan QA uchun majburiy ko'nikma." },
        { type: "h", text: "Asosiy tushunchalar" },
        { type: "table", head: ["Termin", "Ma'nosi"], rows: [
          ["Repository (repo)", "Loyiha va uning butun tarixi"],
          ["Commit", "Saqlangan o'zgarishlar to'plami"],
          ["Branch", "Alohida ish yo'nalishi"],
          ["Merge", "Branch'larni birlashtirish"],
          ["Pull Request (PR)", "O'zgarishni ko'rib chiqish va qo'shish so'rovi"],
          ["Clone", "Repo'ni kompyuterga nusxalash"],
          ["Push / Pull", "Yuborish / olib kelish"],
        ]},
        { type: "h", text: "Kundalik buyruqlar" },
        { type: "code", text: `# Repo'ni nusxalash
git clone https://github.com/user/repo.git

# Holatni ko'rish
git status

# Yangi branch yaratish va o'tish
git checkout -b feature/login-tests

# O'zgarishlarni qo'shish
git add .
git add tests/login.spec.js   # faqat bitta fayl

# Commit qilish
git commit -m "Add login automation tests"

# Yuborish
git push origin feature/login-tests

# Asosiy branch'dan yangilanishlarni olish
git pull origin main

# Branch'lar ro'yxati
git branch

# Tarixni ko'rish
git log --oneline` },
        { type: "h", text: "Yaxshi commit xabari" },
        { type: "example", text: "❌ YOMON:\n'fix'\n'update'\n'asdasd'\n'ishladi'\n\n✅ YAXSHI:\n'Add login and cart automation tests'\n'Fix flaky wait in checkout test'\n'Update Page Object for new product page'\n\nQoida: commit xabari NIMA qilganini aytishi kerak." },
        { type: "key", text: "Git — versiya nazorati. clone, branch, add, commit, push, pull — kundalik buyruqlar. Aniq commit xabari yozing." },
      ],
    },

    {
      id: "l10-06-github",
      title: "GitHub",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "GitHub — Git repolarini saqlash va jamoada ishlash platformasi. QA uchun bu ham ish quroli, ham PORTFOLIO joyi." },
        { type: "h", text: "Asosiy imkoniyatlar" },
        { type: "table", head: ["Imkoniyat", "QA uchun"], rows: [
          ["Repository", "Automation kodini saqlash"],
          ["Pull Request", "Kod review — o'z testlaringizni ham review qildiring"],
          ["Issues", "Bug va vazifa kuzatuvi (kichik loyihalarda Jira o'rniga)"],
          ["Actions (CI/CD)", "Har commit'da avtomatik test ishga tushirish"],
          ["README", "Loyihani tushuntirish — portfolio uchun juda muhim"],
        ]},
        { type: "h", text: "GitHub — sizning portfolio'ngiz" },
        { type: "p", text: "Ish beruvchi CV'ga qaraydi, lekin GitHub'ga QARAB QAROR QILADI. Bu yerda sizning haqiqiy ishingiz ko'rinadi." },
        { type: "list", items: [
          "Automation loyihangizni yuklang (Playwright/Selenium)",
          "Postman collection'ingizni qo'shing",
          "Test case va bug report namunalarini joylashtiring",
          "Har repo'da tushunarli README yozing",
          "Muntazam commit qiling — faollik ko'rinadi",
        ]},
        { type: "h", text: "GitHub Actions bilan CI" },
        { type: "code", text: `# .github/workflows/tests.yml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test` },
        { type: "tip", text: "GitHub Actions bilan testlaringiz har push'da avtomatik ishlaydi. Bu portfolio'ngizda 'CI/CD tajribam bor' deyishga huquq beradi." },
        { type: "key", text: "GitHub — kod saqlash + PORTFOLIO. Automation loyihangizni yuklang, README yozing, Actions bilan CI qo'shing." },
      ],
    },

    {
      id: "l10-07-cicd-qa",
      title: "CI/CD va QA",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "CI/CD — QA automation'ning yakuniy manzili. Testlar shu yerda haqiqiy qiymat beradi." },
        { type: "h", text: "Test piramidasi — qaysi test qayerda" },
        { type: "code", text: `        /\\
       /  \\      E2E (UI) — kam, sekin, qimmat
      /────\\
     /      \\    Integration / API — o'rtacha
    /────────\\
   /          \\  Unit — ko'p, tez, arzon
  /────────────\\` },
        { type: "table", head: ["Daraja", "Kim yozadi", "Qancha", "Tezlik"], rows: [
          ["Unit", "Dasturchi", "Juda ko'p (70%)", "Millisoniya"],
          ["API / Integration", "QA + dasturchi", "O'rtacha (20%)", "Soniya"],
          ["E2E / UI", "QA", "Kam (10%)", "Daqiqa"],
        ]},
        { type: "warn", text: "ANTI-PATTERN (muzqaymoq konusi): ko'p E2E test, kam unit test. Natija: testlar sekin, flaky va saqlash qimmat. To'g'ri nisbatni saqlang." },
        { type: "h", text: "CI'da qaysi test qachon" },
        { type: "table", head: ["Bosqich", "Qaysi testlar", "Vaqt"], rows: [
          ["Har commit'da", "Unit + API smoke", "< 5 daqiqa"],
          ["Pull Request'da", "Unit + API + E2E smoke", "< 15 daqiqa"],
          ["Kechasi (nightly)", "To'liq regression", "Soatlab"],
          ["Reliz oldidan", "To'liq + performance", "Uzoq"],
        ]},
        { type: "key", text: "Test piramidasi: ko'p unit, o'rtacha API, kam E2E. CI'da tez testlar har commit'da, to'liq regression kechasi." },
      ],
    },

    {
      id: "l10-08-qa-interview",
      title: "QA Intervyu — tayyorgarlik",
      type: "theory",
      minutes: 15,
      body: [
        { type: "p", text: "Junior QA intervyusi odatda 3 qismdan iborat: nazariya, amaliy masala va yumshoq ko'nikmalar. Har biriga tayyorgarlik kerak." },
        { type: "h", text: "Eng ko'p so'raladigan nazariy savollar" },
        { type: "list", items: [
          "QA va QC farqi?",
          "Verification va Validation farqi?",
          "Severity va Priority farqi? Misol keltiring (past severity + yuqori priority)",
          "Smoke va Sanity farqi?",
          "Retesting va Regression farqi?",
          "Test case va Test scenario farqi?",
          "BVA va EP nima? Misol bilan tushuntiring",
          "Bug life cycle qanday?",
          "STLC bosqichlari?",
          "Testingning 7 tamoyili?",
          "HTTP status kodlar: 200, 400, 401, 403, 404, 500",
          "401 va 403 farqi?",
        ]},
        { type: "h", text: "Amaliy savollar (eng muhim!)" },
        { type: "example", text: "SAVOL: 'Login sahifasini qanday test qilasiz?'\n\nJAVOB TUZILMASI:\n\n1. AVVAL SAVOL BERING:\n   • Talab bormi? Acceptance criteria?\n   • Parol talablari qanday?\n   • Ko'p marta noto'g'ri urinishda bloklanadimi?\n\n2. POSITIVE:\n   • To'g'ri email + to'g'ri parol → kirish\n\n3. NEGATIVE:\n   • Noto'g'ri parol → xato\n   • Bo'sh maydonlar → validatsiya\n   • Noto'g'ri email format\n   • Mavjud bo'lmagan email\n\n4. BVA:\n   • Parol min/max uzunlik (7, 8, 20, 21 belgi)\n\n5. XAVFSIZLIK:\n   • Parol ochiq matnda yuborilmaydi (HTTPS)\n   • SQL injection: ' OR '1'='1\n   • Ko'p urinishda blok\n   • Xato xabari umumiy ('email yoki parol noto'g'ri')\n\n6. UI/UX:\n   • Parol yashiringan (••••)\n   • Enter tugmasi ishlaydi\n   • Mobil ekranda ishlaydi\n\n7. BOSHQA:\n   • Sessiya, cookie, 'meni eslab qol'" },
        { type: "warn", text: "Amaliy savolda ENG MUHIM narsa — SAVOL BERISH. 'Talab bormi?' deb so'ragan nomzod, darrov test sanashni boshlagandan ancha yaxshi taassurot qoldiradi." },
        { type: "h", text: "Yumshoq ko'nikmalar savollari" },
        { type: "list", items: [
          "Dasturchi 'bu bug emas' desa nima qilasiz?",
          "Muddat yaqin, lekin test tugamagan — nima qilasiz?",
          "Production'ga bug chiqib ketdi — nima qilasiz?",
          "Nima uchun QA bo'lishni tanladingiz?",
        ]},
        { type: "key", text: "Intervyu: nazariya (farqlar!) + amaliy ('X ni qanday test qilasiz?' — avval SAVOL BERING) + yumshoq ko'nikmalar." },
      ],
    },

    {
      id: "l10-09-resume",
      title: "Resume — CV yozish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "CV — birinchi taassurot. Recruiter unga o'rtacha 7 soniya qaraydi. Shuning uchun eng muhimi yuqorida bo'lishi kerak." },
        { type: "h", text: "Junior QA CV tuzilmasi" },
        { type: "code", text: `1. ISM + LAVOZIM
   Sarvar Tolipov | QA Engineer (Junior)

2. KONTAKT
   Email | Telefon | LinkedIn | GitHub

3. QISQA XULOSA (2-3 jumla)
   Nima bilasiz, nima qidiryapsiz

4. TEXNIK KO'NIKMALAR
   Testing: Manual, API, Regression, Exploratory
   Asboblar: Postman, Jira, Git, DevTools, Playwright
   Boshqa: SQL, HTTP/REST, Agile/Scrum

5. LOYIHALAR (portfolio!)  ← ENG MUHIM
   Har loyiha: nima qildingiz + natija + GitHub havolasi

6. TA'LIM / KURSLAR

7. TILLAR
   O'zbek (ona tili), Rus, Ingliz (texnik matn o'qiy olaman)` },
        { type: "h", text: "Tajribasiz CV — loyihalar bilan to'ldiring" },
        { type: "example", text: "❌ ZAIF:\n'QA kurslarini tugatdim. Testing bilaman.'\n\n✅ KUCHLI:\n'PROJECT: E-commerce Test Suite (SauceDemo)\n• 45 ta test case yozdim (positive, negative, BVA)\n• 12 ta bug topib, to'liq bug report yozdim (Jira formatida)\n• Playwright bilan 15 ta avtomatik test yozdim (POM pattern)\n• Postman'da 20 so'rovli API collection yaratdim\n• GitHub: github.com/username/saucedemo-tests'" },
        { type: "warn", text: "Yolg'on yozmang. 'Selenium: expert' deb yozib, intervyuda javob bera olmasangiz — bu eng yomon taassurot. Halol bo'ling: 'asoslarini bilaman'." },
        { type: "tip", text: "Har vakansiyaga CV'ni MOSLASHTIRING. Agar API testing talab qilinsa — Postman tajribangizni yuqoriga chiqaring." },
        { type: "key", text: "CV: qisqa xulosa + ko'nikmalar + LOYIHALAR (eng muhim!). Tajriba yo'q bo'lsa — loyihalar bilan to'ldiring. Yolg'on yozmang." },
      ],
    },

    {
      id: "l10-10-portfolio",
      title: "Portfolio yaratish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Portfolio — tajribasiz junior QA uchun ENG KUCHLI quroldir. U 'men bilaman' emas, 'mana men qildim' deydi." },
        { type: "h", text: "Portfolio'da nima bo'lishi kerak" },
        { type: "table", head: ["Element", "Nima ko'rsatadi"], rows: [
          ["Test case to'plami", "Tizimli fikrlash, texnikalarni bilish"],
          ["Bug report'lar", "Hujjatlash ko'nikmasi, professionallik"],
          ["Test plan / strategiya", "Rejalashtira olish"],
          ["Postman collection", "API testing"],
          ["Automation loyiha", "Texnik ko'nikma (eng qimmatli!)"],
          ["SQL so'rovlar", "Ma'lumot bilan ishlash"],
          ["Test hisoboti", "Natijani yetkaza olish"],
        ]},
        { type: "h", text: "Portfolio loyiha g'oyalari" },
        { type: "list", items: [
          "SauceDemo — to'liq test suite + bug report'lar",
          "AutomationExercise — e-commerce test qamrovi",
          "reqres.in yoki Restful Booker — API test collection",
          "OWASP Juice Shop — xavfsizlik bug'lari",
          "O'zbek saytlaridan biri (myid.uz, biror do'kon) — real bug topish",
        ]},
        { type: "h", text: "GitHub README namunasi" },
        { type: "code", text: `# SauceDemo Test Automation

## Loyiha haqi
SauceDemo e-commerce sayti uchun to'liq test qamrovi.

## Nima qilindi
- 45 ta manual test case (positive, negative, BVA, EP)
- 12 ta bug topildi va hujjatlandi
- 15 ta avtomatik test (Playwright + POM)
- CI/CD: GitHub Actions bilan har push'da test

## Ishlatilgan texnologiyalar
Playwright, JavaScript, POM, GitHub Actions

## Ishga tushirish
npm install
npx playwright test

## Topilgan bug'lar
[bugs/ papkasida to'liq bug report'lar]

## Test natijalari
[reports/ papkasida HTML hisobotlar]` },
        { type: "tip", text: "Portfolio ish beruvchini ishontiradi. 'Tajribam yo'q' degan gapga eng yaxshi javob — 'mana, men nima qila olaman'." },
        { type: "key", text: "Portfolio — tajribasiz junior uchun eng kuchli qurol. GitHub'da: test case, bug report, automation, README." },
      ],
    },

    {
      id: "l10-11-freelancing",
      title: "Freelancing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Freelance — birinchi tajriba orttirish va qo'shimcha daromad yo'li. Ayniqsa tajribasiz QA uchun 'birinchi ishni topish' muammosini hal qiladi." },
        { type: "h", text: "Platformalar" },
        { type: "table", head: ["Platforma", "Izoh"], rows: [
          ["Upwork", "Eng katta, xalqaro. Raqobat yuqori"],
          ["Freelancer.com", "Xalqaro"],
          ["Fiverr", "Xizmat 'paket' sifatida sotiladi"],
          ["uTest / Test IO", "Faqat testing — crowdtesting"],
          ["Mahalliy", "Telegram guruhlari, LinkedIn"],
        ]},
        { type: "h", text: "Crowdtesting — eng oson boshlanish" },
        { type: "p", text: "uTest, Test IO kabi platformalarda ko'p tester bir vaqtda saytni test qiladi. Har tasdiqlangan bug uchun pul to'lanadi." },
        { type: "list", items: [
          "Boshlash oson — tajriba talab qilinmaydi",
          "Real mahsulotlarda mashq qilasiz",
          "Bug report ko'nikmangiz o'sadi",
          "Portfolio uchun tajriba",
          "Kamchilik: to'lov kam, raqobat yuqori",
        ]},
        { type: "h", text: "Birinchi buyurtmani olish" },
        { type: "list", items: [
          "Profilni to'liq to'ldiring (portfolio havolasi bilan)",
          "Boshida narxni past qo'ying (reyting yig'ish uchun)",
          "Har taklifni MOSLASHTIRING (shablon yubormang)",
          "Kichik loyihalardan boshlang",
          "Har ishdan keyin sharh (review) so'rang",
        ]},
        { type: "key", text: "Freelance — birinchi tajriba yo'li. Crowdtesting (uTest) eng oson boshlanish. Portfolio + reyting = buyurtma." },
      ],
    },

    {
      id: "l10-12-soft-skills",
      title: "Soft Skills — yumshoq ko'nikmalar",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Texnik bilim sizni ishga oladi, yumshoq ko'nikmalar esa sizni o'stiradi. QA ishida muloqot — texnik bilimdan kam emas." },
        { type: "h", text: "QA uchun eng muhim ko'nikmalar" },
        { type: "table", head: ["Ko'nikma", "Nega muhim"], rows: [
          ["Muloqot", "Bug'ni tushunarli va ayblovsiz yetkazish"],
          ["Empatiya", "Foydalanuvchi ko'zi bilan qarash"],
          ["Diqqat", "Kichik nomuvofiqlikni sezish"],
          ["Sabr", "Bir xil narsani ko'p marta tekshirish"],
          ["Tanqidiy fikrlash", "'Ishlaydi' degan so'zga ishonmaslik"],
          ["Muzokara", "Bug priority'sini himoya qilish"],
          ["O'rganishga tayyorlik", "Texnologiya doim o'zgaradi"],
        ]},
        { type: "h", text: "Eng qiyin vaziyat: dasturchi 'bu bug emas' desa" },
        { type: "example", text: "❌ YOMON: 'Yo'q, bu bug. Siz noto'g'risiz.'\n(Janjal, munosabat buziladi)\n\n✅ YAXSHI:\n'Tushundim. Men buni bug deb hisoblashimning sababi: talabda X yozilgan, lekin tizim Y qilyapti. Mana skrinshot va konsol logi. Balki men talabni noto'g'ri tushungandirman — birga ko'rib chiqsakmi?'\n\n(Dalil + hurmat + hamkorlik → muammo hal bo'ladi)" },
        { type: "h", text: "Oltin qoidalar" },
        { type: "list", items: [
          "Hech qachon ayblamang — 'siz xato qildingiz' emas, 'tizim bunday ishlayapti'",
          "Har doim dalil keltiring — skrinshot, log, talab havolasi",
          "Foydalanuvchi ta'sirini tushuntiring — 'bu foydalanuvchini yo'qotishga olib keladi'",
          "Bug topish — g'alaba emas, jamoa ishi",
          "Bilmasangiz — 'bilmayman, o'rganaman' deng. Bu kuch, zaiflik emas",
        ]},
        { type: "warn", text: "Eng ko'p uchraydigan junior xatosi: bug topganda g'urur qilish yoki dasturchini ayblash. Bu munosabatni buzadi va sizga zarar keltiradi." },
        { type: "key", text: "Muloqot, empatiya, dalil bilan gapirish, ayblamaslik. QA va dasturchi bir jamoada — dushman emas." },
      ],
    },

    {
      id: "l10-13-english-for-qa",
      title: "English for QA",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Ingliz tili — QA karyerasining tezlatgichi. Xalqaro loyihalar, yaxshi maosh, ko'proq material — hammasi ingliz tili orqali ochiladi." },
        { type: "h", text: "Qaysi daraja kerak" },
        { type: "table", head: ["Daraja", "Nima ochadi"], rows: [
          ["Texnik matn o'qish", "Hujjat, xato xabarlari, Stack Overflow — MINIMUM"],
          ["Yozish", "Bug report, test case ingliz tilida — ko'p loyihada talab"],
          ["Gapirish", "Xalqaro jamoa, standup, intervyu — eng yuqori maosh"],
        ]},
        { type: "h", text: "QA'ning asosiy lug'ati" },
        { type: "table", head: ["Ingliz", "O'zbek"], rows: [
          ["Steps to reproduce", "Takrorlash qadamlari"],
          ["Expected / Actual result", "Kutilgan / haqiqiy natija"],
          ["Severity / Priority", "Jiddiylik / ustuvorlik"],
          ["Root cause", "Asosiy sabab"],
          ["Workaround", "Vaqtinchalik yechim"],
          ["Edge case", "Chegara holati"],
          ["Flaky test", "Beqaror test"],
          ["Blocker", "To'sqinlik qiluvchi bug"],
          ["Acceptance criteria", "Qabul mezonlari"],
          ["Regression", "Eski funksiyaning buzilishi"],
        ]},
        { type: "h", text: "Bug report ingliz tilida (namuna)" },
        { type: "code", text: `Title: [Cart] Negative quantity results in negative total price

Environment: Chrome 126 / Windows 11 / Staging

Steps to Reproduce:
1. Log in as standard_user
2. Add any product to the cart
3. Open the cart page
4. Enter "-3" in the quantity field
5. Click "Update"

Expected Result:
An error message "Quantity must be at least 1" is displayed
and the total price remains unchanged.

Actual Result:
The total price is calculated as -150,000 UZS.

Severity: Major
Priority: High
Attachments: screenshot.png, console-log.txt` },
        { type: "tip", text: "Bug report'ni ingliz tilida yozishni mashq qiling — bu ko'nikma ko'p loyihada talab qilinadi va CV'ngizni kuchaytiradi." },
        { type: "key", text: "Ingliz tili — karyera tezlatgichi. Minimum: texnik matn o'qish. Yaxshiroq: bug report yozish. Eng yaxshi: gapirish." },
      ],
    },

    {
      id: "l10-14-ai-for-qa",
      title: "AI for QA",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "AI (ChatGPT, Claude va boshqalar) QA ishini o'zgartirmoqda. U QA'ni almashtirmaydi, lekin AI'ni ishlata oladigan QA — ishlata olmaydiganidan ancha samarali." },
        { type: "h", text: "AI nima uchun foydali" },
        { type: "table", head: ["Vazifa", "Qanday yordam beradi"], rows: [
          ["Test case g'oyalari", "Talabni berib, test g'oyalari so'rash"],
          ["Edge case topish", "'Bu funksiyada qanday chegara holatlari bor?'"],
          ["Test ma'lumoti", "Turli formatdagi test ma'lumotlarini generatsiya qilish"],
          ["Automation kodi", "Skript yozish va tushuntirish"],
          ["Bug report yaxshilash", "Yozganingizni aniqroq qilish"],
          ["SQL so'rovlar", "Murakkab so'rov yozishda yordam"],
          ["Hujjat tushuntirish", "Murakkab texnik matnni soddalashtirish"],
          ["Ingliz tili", "Bug report'ni ingliz tiliga o'girish/tuzatish"],
        ]},
        { type: "h", text: "Yaxshi prompt yozish" },
        { type: "example", text: "❌ ZAIF PROMPT:\n'Login uchun test case yoz'\n\n✅ KUCHLI PROMPT:\n'Men QA muhandisiman. E-commerce saytining login sahifasi uchun test case'lar kerak.\n\nTalablar:\n- Email va parol bilan kirish\n- Parol: 8-20 belgi, kamida 1 raqam\n- 5 marta noto'g'ri urinishda 15 daqiqaga bloklash\n\nQuyidagi texnikalarni qo'llagan holda test case'lar yoz:\n- Positive va Negative\n- BVA (parol uzunligi uchun)\n- Xavfsizlik holatlari\n\nFormat: ID | Title | Steps | Expected Result'" },
        { type: "warn", text: "⚠️ MUHIM CHEKLOVLAR:\n\n1. AI XATO QILADI — har natijani o'zingiz tekshiring\n2. Maxfiy ma'lumot (kod, mijoz ma'lumoti) AI'ga bermang — kompaniya siyosatini tekshiring\n3. AI mahsulotingizni BILMAYDI — kontekst bering\n4. AI'ga ko'r-ko'rona ishonmang — u ishonchli ohangda noto'g'ri javob berishi mumkin" },
        { type: "tip", text: "AI — yordamchi, o'rinbosar emas. U qora ishni oladi, siz esa fikrlash va qaror qabul qilishga vaqt topasiz. AI'ni ishlata oladigan QA — kelajakning QA'si." },
        { type: "key", text: "AI — kuchli yordamchi (test g'oyalari, kod, SQL, ingliz tili). Lekin xato qiladi — har doim tekshiring. Maxfiy ma'lumot bermang." },
      ],
    },

    {
      id: "l10-15-roadmap",
      title: "Keyingi qadamlar — yo'l xaritasi",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "150 ta darsni tugatdingiz. Endi eng muhim savol: KEYIN NIMA?" },
        { type: "h", text: "Birinchi 3 oy — mustahkamlash" },
        { type: "list", items: [
          "Portfolio yarating (kamida 2-3 loyiha GitHub'da)",
          "Har kuni 1 soat mashq qiling (real saytlarda bug qidiring)",
          "Crowdtesting'da (uTest) ro'yxatdan o'ting — real tajriba",
          "CV va LinkedIn profilini to'ldiring",
          "Intervyu savollariga tayyorlaning (nazariy farqlarni yodlang)",
        ]},
        { type: "h", text: "Birinchi ishni topish" },
        { type: "table", head: ["Yo'l", "Izoh"], rows: [
          ["Junior QA vakansiya", "Eng to'g'ridan-to'g'ri yo'l"],
          ["Intern / stajyorlik", "Kam maosh, lekin tajriba"],
          ["Freelance / crowdtesting", "Tajriba orttirish"],
          ["Tanishlar / networking", "LinkedIn, Telegram guruhlar, IT tadbirlar"],
          ["Boshqa lavozimdan o'tish", "Support → QA (ichki o'tish oson)"],
        ]},
        { type: "h", text: "Karyera yo'llari (1-3 yildan keyin)" },
        { type: "table", head: ["Yo'nalish", "Nima qilasiz"], rows: [
          ["QA Automation Engineer", "Automation'ga chuqurlashish (eng talab qilinadigan)"],
          ["Performance Engineer", "Yuklama va unumdorlik"],
          ["Security Tester", "Xavfsizlik testi (yuqori maosh)"],
          ["QA Lead / Manager", "Jamoa boshqaruvi"],
          ["SDET", "Test infratuzilmasi quruvchi dasturchi"],
          ["Product Owner / BA", "Mahsulot tomoniga o'tish"],
        ]},
        { type: "h", text: "Doimiy o'sish" },
        { type: "list", items: [
          "Har oy bitta yangi narsa o'rganing",
          "Konferensiya va meetup'larga boring",
          "Bloglar o'qing, podkast eshiting",
          "O'z bilimingizni ulashing (blog, ustozlik) — bu eng yaxshi o'rganish usuli",
          "ISTQB sertifikati (ixtiyoriy, lekin ba'zi kompaniyada talab)",
        ]},
        { type: "key", text: "Portfolio → CV → intervyu → birinchi ish → automation'ga chuqurlashish. Doimiy o'rganish — QA'ning asosiy qoidasi." },
      ],
    },

    /* ---------- CAPSTONE PRACTICAL ---------- */
    {
      id: "l10-16-capstone",
      title: "Yakuniy loyiha (Capstone)",
      type: "practical",
      minutes: 180,
      body: [
        { type: "p", text: "Bu — kursning yakuniy loyihasi. Barcha 10 levelda o'rgangan bilimni bitta to'liq ishda birlashtirasiz." },
        { type: "p", text: "Natija — sizning PORTFOLIO'ngiz. Ish beruvchiga ko'rsatadigan haqiqiy ish. Bu loyihani puxta bajaring: u sizga birinchi ishni topishga yordam beradi." },
        { type: "h", text: "Loyiha tarkibi" },
        { type: "table", head: ["Bo'lim", "Nima yaratasiz"], rows: [
          ["1. Test Plan", "Strategiya, qamrov, xavflar, mezonlar"],
          ["2. Test Cases", "Kamida 40 ta (positive, negative, BVA, EP)"],
          ["3. Bug Reports", "Kamida 8 ta to'liq report (dalil bilan)"],
          ["4. API Collection", "Postman'da kamida 10 so'rov + assertion"],
          ["5. Automation", "Playwright'da kamida 10 test (POM bilan)"],
          ["6. SQL", "Ma'lumot tekshiruvi uchun 5 ta so'rov"],
          ["7. Test Report", "Yakuniy hisobot va xulosa"],
          ["8. README", "Loyiha tavsifi (GitHub uchun)"],
        ]},
        { type: "warn", text: "Shoshilmang. Bu 3-4 kunlik ish. Sifatli bajarilgan bitta loyiha — shoshib qilingan beshtadan yaxshiroq." },
        { type: "tip", text: "Tugagach, GitHub'ga yuklang va havolani CV'ngizga qo'shing. Bu — 'tajribam yo'q' degan gapga eng yaxshi javob." },
      ],
      practical: {
        targetUrl: "https://automationexercise.com",
        targetName: "AutomationExercise",
        task: "AutomationExercise sayti uchun TO'LIQ QA loyihasi bajaring va GitHub'ga yuklang. Loyiha 8 bo'limdan iborat: (1) Test Plan, (2) 40+ test case, (3) 8+ bug report, (4) Postman collection (10+ so'rov, assertion bilan), (5) Playwright automation (10+ test, POM), (6) 5 ta SQL so'rov (ma'lumot tekshiruvi uchun namuna), (7) Yakuniy test hisoboti, (8) README. Har bo'lim professional darajada bo'lishi kerak — bu sizning portfolio'ngiz.",
        steps: [
          "1-KUN: Saytni exploratory test qiling (2 soat). Funksiyalar ro'yxatini tuzing.",
          "1-KUN: Test Plan yozing — qamrov, strategiya, xavflar, entry/exit criteria",
          "2-KUN: 40+ test case yozing (login, ro'yxatdan o'tish, mahsulot, savat, checkout, qidiruv)",
          "2-KUN: Test case'larni bajaring va natijani yozing (Pass/Fail)",
          "2-KUN: Topilgan bug'larga to'liq report yozing (skrinshot, konsol, network bilan)",
          "3-KUN: Postman collection yarating — saytning API'larini toping (DevTools Network) va test qiling",
          "3-KUN: Playwright loyihasini sozlang, POM bilan 10+ test yozing",
          "4-KUN: SQL so'rovlar yozing (namuna — ma'lumot tekshiruvi uchun)",
          "4-KUN: Yakuniy test hisoboti yozing (natijalar, statistika, xulosa, tavsiyalar)",
          "4-KUN: README yozing va hammasini GitHub'ga yuklang",
        ],
        debrief:
          "PORTFOLIO CHECKLIST — o'zingizni baholang:\n\n📋 TEST PLAN\n☑ Qamrov aniq belgilanganmi?\n☑ Entry/Exit criteria bormi?\n☑ Xavflar sanab o'tilganmi?\n\n📝 TEST CASES (40+)\n☑ Positive va negative bormi?\n☑ BVA va EP qo'llanganmi?\n☑ Har case'da ID, steps, expected bormi?\n☑ Steps'ni boshqa odam takrorlay oladimi?\n\n🐞 BUG REPORTS (8+)\n☑ Title [Modul] formatidami?\n☑ Steps aniq va minimalmi?\n☑ Expected va Actual ajratilganmi?\n☑ Skrinshot/konsol/network dalili bormi?\n☑ Severity va Priority asoslanganmi?\n\n🔌 POSTMAN (10+)\n☑ Environment va o'zgaruvchilar ishlatilganmi?\n☑ Har so'rovda assertion bormi?\n☑ Negative testlar (400, 404) bormi?\n\n🤖 AUTOMATION (10+)\n☑ POM ishlatilganmi?\n☑ Har testda assertion bormi?\n☑ Hard wait (sleep) YO'QMI?\n☑ Lokatorlar barqarormi (ID/data-testid)?\n☑ Testlar mustaqilmi?\n\n📊 HISOBOT\n☑ Statistika bormi (nechta test, nechta bug)?\n☑ Xulosa va tavsiya bormi?\n\n📖 README\n☑ Loyiha nima qilishini tushuntiradimi?\n☑ Ishga tushirish yo'riqnomasi bormi?\n\nAgar barcha katakchani belgilay olsangiz — TABRIKLAYMAN! Sizda professional QA portfolio bor. Endi CV'ga havolani qo'shing va ish qidirishni boshlang.\n\nSiz 150+ darsni tugatdingiz, 10 ta amaliy ish bajardingiz va real portfolio yaratdingiz. Bu — junior QA uchun juda kuchli boshlanish. Omad! 🎓",
      },
    },

    /* ---------- FINAL QUIZ ---------- */
    {
      id: "l10-17-quiz",
      title: "Yakuniy test: Karyera",
      type: "quiz",
      minutes: 10,
      body: [
        { type: "p", text: "Kursning oxirgi testi. Karyera va jamoada ishlash bo'yicha bilimingizni tekshiring." },
      ],
      quiz: [
        {
          id: "l10q1",
          q: "Scrum'da 'Definition of Done' nima uchun QA uchun muhim?",
          options: [
            "Muhim emas",
            "U 'tayyor' degan so'zning aniq ta'rifi — QA test qilmaguncha va bug tuzatilmaguncha task Done bo'lmaydi",
            "Faqat dasturchilar uchun",
            "Faqat menejer uchun",
          ],
          answer: 1,
          explain: "Definition of Done — sifat darvozasi. Unda 'QA test qildi, bug topilmadi' punkti bo'lishi QA'ning ovozini kafolatlaydi.",
        },
        {
          id: "l10q2",
          q: "Intervyuda 'Login sahifasini qanday test qilasiz?' deb so'rashsa, birinchi nima qilasiz?",
          options: [
            "Darrov testlarni sanay boshlayman",
            "SAVOL BERAMAN — talab bormi? Parol talablari qanday? Bloklash bormi? — keyin tizimli javob beraman",
            "Bilmayman deyman",
            "Boshqa savolni so'rayman",
          ],
          answer: 1,
          explain: "Savol berish — professional QA belgisi. Darrov test sanashni boshlagan nomzoddan ko'ra, 'talab bormi?' deb so'ragan nomzod ancha yaxshi taassurot qoldiradi.",
        },
        {
          id: "l10q3",
          q: "Dasturchi 'bu bug emas' desa nima qilasiz?",
          options: [
            "Janjal qilaman",
            "Dalil bilan hurmat bilan tushuntiraman: talabda X yozilgan, tizim Y qilyapti, mana skrinshot — birga ko'rib chiqamiz",
            "Bug'ni yopib qo'yaman",
            "Menejerga shikoyat qilaman",
          ],
          answer: 1,
          explain: "Dalil + hurmat + hamkorlik. Ayblov emas. Balki siz talabni noto'g'ri tushungansiz, balki u — birga aniqlash kerak.",
        },
        {
          id: "l10q4",
          q: "Test piramidasiga ko'ra qaysi testlar eng ko'p bo'lishi kerak?",
          options: [
            "E2E / UI testlar",
            "Unit testlar (tez, arzon, ko'p) — E2E eng kam bo'lishi kerak",
            "Manual testlar",
            "Performance testlar",
          ],
          answer: 1,
          explain: "Piramida: ko'p unit (70%), o'rtacha API (20%), kam E2E (10%). Teskarisi — 'muzqaymoq konusi' anti-pattern: sekin, flaky, qimmat.",
        },
        {
          id: "l10q5",
          q: "Tajribasiz junior QA uchun eng kuchli qurol nima?",
          options: [
            "Uzun CV",
            "PORTFOLIO — GitHub'da real loyihalar (test case, bug report, automation)",
            "Ko'p sertifikat",
            "Yuqori ball",
          ],
          answer: 1,
          explain: "Portfolio 'men bilaman' emas, 'mana men qildim' deydi. Ish beruvchi CV'ni o'qiydi, lekin GitHub'ga qarab qaror qiladi.",
        },
        {
          id: "l10q6",
          q: "AI (ChatGPT/Claude) ni QA ishida ishlatishda eng muhim qoida?",
          options: [
            "AI'ga to'liq ishonish",
            "AI XATO QILADI — har natijani o'zingiz tekshiring. Maxfiy ma'lumot bermang.",
            "AI'ni umuman ishlatmaslik",
            "Faqat AI'ga tayanish",
          ],
          answer: 1,
          explain: "AI — kuchli yordamchi, lekin ishonchli ohangda noto'g'ri javob berishi mumkin. Har natijani tekshiring va maxfiy ma'lumot bermang.",
        },
        {
          id: "l10q7",
          q: "CV'da 'Selenium: expert' deb yozdingiz, lekin intervyuda javob bera olmadingiz. Bu nima?",
          options: [
            "Normal, hamma shunday qiladi",
            "Eng yomon taassurot — halol bo'ling: 'asoslarini bilaman' deb yozish ancha yaxshi",
            "Yaxshi strategiya",
            "Muhim emas",
          ],
          answer: 1,
          explain: "Yolg'on yozish — eng yomon taassurot. Halollik ishonch uyg'otadi. 'Asoslarini bilaman, o'rganishga tayyorman' — kuchli javob.",
        },
        {
          id: "l10q8",
          q: "Git'da yaxshi commit xabari qaysi?",
          options: [
            "fix",
            "Add login and cart automation tests",
            "update",
            "asdasd",
          ],
          answer: 1,
          explain: "Commit xabari NIMA qilganingizni aytishi kerak. 'fix' yoki 'update' — hech narsa bildirmaydi.",
        },
      ],
    },
  ],
};
