// data/modules/level-3-bug-reporting.ts
//
// LEVEL 3 — Bug Reporting
// 15 theory + 1 practical + 1 quiz = 17 sections

import type { Module } from "../lessons";

export const LEVEL_3: Module = {
  id: "bug-reporting",
  icon: "🐞",
  title: "Level 3 — Bug Reporting",
  summary:
    "Bug'ni to'g'ri hujjatlash, dalil to'plash va dasturchi bilan samarali muloqot qilish. Bu — QA'ning eng ko'p baholanadigan ko'nikmasi.",
  level: "beginner",
  sections: [
    {
      id: "l3-01-bug-report",
      title: "Bug Report — asoslar",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Bug report — topilgan xatoni dasturchi tushunib, takrorlab va tuzata olishi uchun yozilgan hujjat. Bu QA ishining ko'zga eng ko'rinadigan mahsuloti." },
        { type: "p", text: "Yomon bug report — bug tuzatilmaydi, vaqt yo'qoladi, munosabat buziladi. Yaxshi bug report — dasturchi savol bermasdan darrov ishga kirishadi." },
        { type: "h", text: "Bug report tarkibi" },
        { type: "table", head: ["Maydon", "Nima yoziladi"], rows: [
          ["Title", "Qisqa, aniq: nima + qayerda"],
          ["Environment", "Brauzer, OS, qurilma, versiya, muhit (dev/staging/prod)"],
          ["Preconditions", "Bug ko'rinishi uchun kerak bo'lgan boshlang'ich holat"],
          ["Steps to Reproduce", "Raqamlangan, aniq qadamlar"],
          ["Expected Result", "Nima bo'lishi KERAK edi"],
          ["Actual Result", "Aslida NIMA bo'ldi"],
          ["Attachments", "Skrinshot, video, log, HAR fayl"],
          ["Severity", "Texnik jiddiylik (QA belgilaydi)"],
          ["Priority", "Qachon tuzatish (menejer belgilaydi)"],
        ]},
        { type: "example", text: "Title: [Savat] Manfiy miqdor kiritilganda jami summa manfiy chiqadi\n\nEnvironment: Chrome 126 / Windows 11 / staging\nPrecondition: Savatda kamida 1 mahsulot bor\n\nSteps:\n1. Savat sahifasini och\n2. Miqdor maydoniga -3 kirit\n3. 'Yangilash' tugmasini bos\n\nExpected: 'Miqdor 1 dan kam bo'lmasligi kerak' xatosi chiqadi\nActual: Jami summa -150 000 so'm bo'lib ko'rsatiladi\n\nSeverity: Major | Priority: High\nAttachments: screenshot.png" },
        { type: "key", text: "Bug report — dasturchi savol bermasdan tuzata oladigan hujjat. Aniq, to'liq, dalilli." },
      ],
    },

    {
      id: "l3-02-title",
      title: "Yaxshi Title yozish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Title — bug report'ning eng ko'p o'qiladigan qismi. Menejer, dasturchi, lead — hamma avval title'ni ko'radi. Shuning uchun u aniq bo'lishi shart." },
        { type: "h", text: "Yaxshi title formulasi" },
        { type: "code", text: `[Modul / Sahifa] Qisqa muammo tavsifi (qanday holatda)

Misol:
[Login] Bo'sh parol bilan tizimga kirish mumkin
[Savat] Manfiy miqdor qabul qilinyapti
[Checkout] To'lov tugmasi 500 xatosi qaytaradi` },
        { type: "table", head: ["❌ Yomon", "✅ Yaxshi", "Nega"], rows: [
          ["Ishlamayapti", "[Login] Kirish tugmasi bosilganda hech narsa bo'lmaydi", "Aniq: qayerda, nima"],
          ["Bug bor", "[Qidiruv] Bo'sh so'rovda 500 xatosi chiqadi", "Muammo aniq"],
          ["Savat xato", "[Savat] Manfiy miqdor kiritilganda jami summa manfiy chiqadi", "Holatni ham ko'rsatadi"],
          ["Tugma yomon", "[Checkout] 'To'lash' tugmasi mobil ekranda ko'rinmaydi", "Qurilma ham aytilgan"],
        ]},
        { type: "warn", text: "Title'da hech qachon ayblov bo'lmasin. 'Dasturchi savatni buzib qo'ygan' emas, '[Savat] Manfiy miqdor qabul qilinyapti'." },
        { type: "key", text: "Title = [Modul] + aniq muammo + (holat). Qisqa, lekin o'zi bilan hamma narsani aytadi." },
      ],
    },

    {
      id: "l3-03-reproduction-steps",
      title: "Reproduction Steps",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Steps to Reproduce — bug report'ning YURAGI. Agar dasturchi bug'ni takrorlay olmasa, u tuzatilmaydi. Nuqta." },
        { type: "h", text: "Yaxshi qadamlar qanday yoziladi" },
        { type: "list", items: [
          "Raqamlangan (1, 2, 3...)",
          "Har qadam BITTA amal",
          "Aniq — 'sahifaga o'ting' emas, '/checkout sahifasini oching'",
          "To'liq — hech narsa taxmin qilinmaydi",
          "Test ma'lumoti ko'rsatilgan (qaysi email, qaysi mahsulot)",
          "Minimal — keraksiz qadamlar olib tashlangan",
        ]},
        { type: "example", text: "❌ YOMON:\n'Savatga kirib miqdorni o'zgartirsam xato chiqadi'\n\n✅ YAXSHI:\n1. https://shop.uz/login sahifasini oching\n2. user@test.com / Test123! bilan kiring\n3. 'Simsiz quloqchin' mahsulotini savatga qo'shing\n4. Savat sahifasini oching (/cart)\n5. Miqdor maydoniga -3 kiriting\n6. 'Yangilash' tugmasini bosing" },
        { type: "h", text: "Minimal qadamlar (minimal reproduction)" },
        { type: "p", text: "Bug'ni ko'rsatish uchun ENG KAM qadamni toping. Agar 10 qadamdan 3 tasi keraksiz bo'lsa — olib tashlang. Bu dasturchi vaqtini tejaydi." },
        { type: "tip", text: "Yozgach, o'zingiz TEKSHIRING: qadamlarni ketma-ket bajarib, bug qaytadan chiqadimi? Chiqmasa — qadamlar to'liq emas." },
        { type: "key", text: "Steps — raqamlangan, aniq, to'liq, minimal. Takrorlanmasa, bug tuzatilmaydi." },
      ],
    },

    {
      id: "l3-04-expected-result",
      title: "Expected Result",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Expected Result — tizim NIMA QILISHI KERAK edi. Bu javob taxminingizdan emas, TALABDAN kelib chiqishi kerak." },
        { type: "h", text: "Qayerdan olinadi" },
        { type: "table", head: ["Manba", "Izoh"], rows: [
          ["Talab / User Story", "Eng ishonchli manba"],
          ["Acceptance Criteria", "Aniq shartlar yozilgan"],
          ["Dizayn / maket", "UI qanday bo'lishi kerak"],
          ["Umumiy mantiq", "Talab yo'q bo'lsa — mantiqiy kutish"],
        ]},
        { type: "example", text: "❌ Noaniq: 'Xato chiqishi kerak'\n✅ Aniq: \"'Miqdor 1 dan kam bo'lmasligi kerak' degan xato xabari miqdor maydoni ostida qizil rangda chiqadi va jami summa o'zgarmaydi\"\n\n❌ Noaniq: 'Ishlashi kerak'\n✅ Aniq: 'Foydalanuvchi /dashboard sahifasiga yo'naltiriladi va yuqori o'ng burchakda uning ismi ko'rinadi'" },
        { type: "warn", text: "Agar talab yo'q bo'lsa yoki noaniq bo'lsa — bug yozishdan oldin SO'RANG. Balki bu bug emas, balki noaniq talabdir." },
        { type: "key", text: "Expected Result — talabdan kelib chiqadi, taxmindan emas. Aniq va o'lchanadigan bo'lsin." },
      ],
    },

    {
      id: "l3-05-actual-result",
      title: "Actual Result",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Actual Result — aslida NIMA bo'ldi. Bu yerda faqat FAKT yoziladi, talqin emas." },
        { type: "h", text: "Fakt va talqin farqi" },
        { type: "table", head: ["❌ Talqin (noto'g'ri)", "✅ Fakt (to'g'ri)"], rows: [
          ["Tizim buzilib ketdi", "Sahifa oq bo'lib qoldi, konsolda 'TypeError: undefined' xatosi"],
          ["Ishlamadi", "Tugma bosilganda hech narsa sodir bo'lmadi, so'rov yuborilmadi"],
          ["Xato chiqdi", "'Error 500' matni ekranda ko'rindi"],
          ["Sekin", "Sahifa 14 soniyada yuklandi (kutilgan: 3s dan kam)"],
        ]},
        { type: "h", text: "Nimalarni qo'shish foydali" },
        { type: "list", items: [
          "Aniq xato matni (nusxa ko'chiring, qayta yozmang)",
          "Konsoldagi xato (DevTools → Console)",
          "Tarmoq so'rovi natijasi (status kod, javob)",
          "Skrinshot yoki video",
          "Bug har safar takrorlanadimi yoki ba'zan? (100% yoki 3/10)",
        ]},
        { type: "tip", text: "'Har safar takrorlanadimi?' degan savolga javob berish juda muhim. 'Har safar' — oson tuzatiladi. 'Ba'zan' — dasturchiga ko'proq ma'lumot kerak." },
        { type: "key", text: "Actual Result — faqat fakt, talqin emas. Aniq xato matni, konsol, skrinshot bilan." },
      ],
    },

    {
      id: "l3-06-attachments",
      title: "Attachments — dalil qo'shish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Dalil (attachment) — bug report'ni bir necha barobar kuchliroq qiladi. 'Bir rasm ming so'zdan afzal' degan gap bu yerda to'g'ri ishlaydi." },
        { type: "h", text: "Qaysi dalil qachon" },
        { type: "table", head: ["Dalil turi", "Qachon ishlatiladi"], rows: [
          ["Skrinshot", "UI bug, xato xabari, noto'g'ri ko'rinish"],
          ["Video / GIF", "Ketma-ket harakat, animatsiya, takrorlash qiyin bug"],
          ["Konsol log", "JavaScript xatosi, frontend muammosi"],
          ["Network log / HAR", "API xatosi, sekin so'rov, noto'g'ri javob"],
          ["Ma'lumot bazasi", "Ma'lumot noto'g'ri saqlangan"],
          ["Test ma'lumoti", "Bug'ni takrorlash uchun kerak bo'lgan aniq ma'lumot"],
        ]},
        { type: "h", text: "Yaxshi skrinshot qoidalari" },
        { type: "list", items: [
          "Butun ekran emas — muhim qismni ko'rsating",
          "Muammoni qizil ramka yoki strelka bilan belgilang",
          "URL ko'rinib tursin (qaysi sahifa ekani aniq bo'lsin)",
          "Agar xato xabari bo'lsa — u to'liq ko'rinsin",
          "Shaxsiy ma'lumotni yashiring (parol, karta raqami)",
        ]},
        { type: "warn", text: "Xavfsizlik: skrinshot yoki logda haqiqiy parol, token, karta ma'lumoti bo'lmasin. Ularni bo'yab tashlang." },
        { type: "key", text: "Har bug'ga kamida bitta dalil. Skrinshot — UI uchun, konsol/network — texnik bug uchun." },
      ],
    },

    {
      id: "l3-07-screenshots",
      title: "Screenshots — samarali skrinshot",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Skrinshot — eng ko'p ishlatiladigan dalil. Lekin yomon skrinshot foyda bermaydi." },
        { type: "h", text: "Skrinshotda nima bo'lishi kerak" },
        { type: "list", items: [
          "Muammoning o'zi (aniq ko'rinadigan)",
          "URL manzili (brauzer manzil qatori)",
          "Xato xabari (agar bor bo'lsa) — to'liq",
          "Kontekst — muammo qaysi sahifa/bo'limda ekani tushunarli",
          "Belgilash — qizil ramka, strelka, matn izohi",
        ]},
        { type: "h", text: "Foydali asboblar" },
        { type: "table", head: ["Asbob", "Nima uchun"], rows: [
          ["Brauzer DevTools", "Butun sahifa skrinshoti (full-page)"],
          ["Lightshot / ShareX", "Tez skrinshot + belgilash"],
          ["Snipping Tool (Windows)", "Oddiy, tayyor"],
          ["Firefox Screenshot", "Element yoki butun sahifa"],
        ]},
        { type: "tip", text: "Ikki skrinshot ko'pincha bittadan yaxshiroq: biri 'kutilgan holat' (ishlagan joyda), ikkinchisi 'haqiqiy holat' (bug bor joyda). Solishtirish oson bo'ladi." },
        { type: "key", text: "Yaxshi skrinshot: muammo + URL + xato matni + belgilash. Shaxsiy ma'lumotni yashiring." },
      ],
    },

    {
      id: "l3-08-video",
      title: "Video Recording",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Ba'zi bug'larni skrinshot bilan ko'rsatib bo'lmaydi — ular HARAKATDA yuz beradi. Bunday holatda video yoki GIF eng yaxshi dalil." },
        { type: "h", text: "Qachon video kerak" },
        { type: "list", items: [
          "Bug ketma-ket harakat natijasida chiqadi",
          "Animatsiya yoki o'tish (transition) buzilgan",
          "Bug ba'zan chiqadi (intermittent) — takrorlashni ko'rsatish kerak",
          "Murakkab qadamlar — matn bilan tushuntirish qiyin",
          "Performance muammosi (sekinlik ko'rinadi)",
        ]},
        { type: "h", text: "Yaxshi video qoidalari" },
        { type: "table", head: ["Qoida", "Izoh"], rows: [
          ["Qisqa", "30-60 soniya — faqat kerakli qism"],
          ["Boshidan", "Qadamlarni boshidan ko'rsating"],
          ["Sekin", "Shoshilmang — ko'rish mumkin bo'lsin"],
          ["Konsol ochiq", "DevTools ochiq bo'lsa, xato ham ko'rinadi"],
          ["Ovozsiz ham tushunarli", "Matn izoh yoki qadam ko'rsatkichi"],
        ]},
        { type: "tip", text: "GIF ko'pincha videodan qulayroq — Jira/Slack'da darrov o'ynaydi, yuklab olish shart emas. ScreenToGif, LICEcap kabi bepul asboblar bor." },
        { type: "key", text: "Video — harakatdagi bug uchun. Qisqa, sekin, konsol ochiq. GIF ko'pincha qulayroq." },
      ],
    },

    {
      id: "l3-09-browser-console",
      title: "Browser Console — konsol",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Brauzer konsoli (F12 → Console) — QA'ning eng kuchli va eng kam ishlatiladigan quroli. Ko'p bug'ning sababi aynan shu yerda yozilgan bo'ladi." },
        { type: "h", text: "Konsolda nima ko'rinadi" },
        { type: "table", head: ["Tur", "Rangi", "Ma'nosi"], rows: [
          ["Error", "Qizil ❌", "JavaScript xatosi — ko'pincha bug sababi"],
          ["Warning", "Sariq ⚠️", "Ogohlantirish — muammo bo'lishi mumkin"],
          ["Info / Log", "Oq", "Ma'lumot, dasturchi qoldirgan"],
        ]},
        { type: "h", text: "Ko'p uchraydigan xatolar" },
        { type: "table", head: ["Xato", "Nimani bildiradi"], rows: [
          ["TypeError: undefined is not a function", "Mavjud bo'lmagan funksiya chaqirilgan"],
          ["Cannot read property 'x' of null", "Bo'sh (null) obyektdan ma'lumot olishga urinish"],
          ["404 (Not Found)", "Fayl yoki API manzili topilmadi"],
          ["500 (Internal Server Error)", "Serverda xato"],
          ["CORS error", "Boshqa domendan so'rov bloklangan"],
          ["Uncaught (in promise)", "Asinxron kod xatosi"],
        ]},
        { type: "example", text: "Bug: 'Savatga qo'shish tugmasi ishlamayapti'\n\nKonsolni ochsangiz:\n❌ TypeError: Cannot read property 'id' of undefined at addToCart (cart.js:42)\n\nEndi bug report'ingizda bu xato ham bor → dasturchi darrov 42-qatorga qaraydi. Tuzatish vaqti bir necha barobar qisqaradi." },
        { type: "tip", text: "Har bug topganingizda F12 → Console'ni oching va qizil xato bormi qarang. Bo'lsa — nusxa ko'chirib bug report'ga qo'shing. Dasturchilar buni juda qadrlaydi." },
        { type: "key", text: "F12 → Console. Qizil xatolarni nusxalab bug report'ga qo'shing. Bu QA'ni professional qiladi." },
      ],
    },

    {
      id: "l3-10-network-logs",
      title: "Network Logs — tarmoq so'rovlari",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Network paneli (F12 → Network) — brauzer va server o'rtasidagi barcha so'rovlarni ko'rsatadi. Bu — frontend va backend bug'ini ajratishning eng aniq yo'li." },
        { type: "h", text: "Nimaga qaraysiz" },
        { type: "table", head: ["Ustun", "Nima bildiradi"], rows: [
          ["Name", "So'rov manzili (endpoint)"],
          ["Status", "HTTP status kod (200, 404, 500...)"],
          ["Method", "GET, POST, PUT, DELETE"],
          ["Time", "Qancha vaqt oldi"],
          ["Size", "Javob hajmi"],
          ["Payload / Request", "Nima yuborilgan"],
          ["Response / Preview", "Server nima qaytargan"],
        ]},
        { type: "h", text: "Frontend yoki backend bug'i?" },
        { type: "table", head: ["Holat", "Xulosa"], rows: [
          ["So'rov umuman yuborilmadi", "Frontend bug — tugma so'rov yubormayapti"],
          ["So'rov ketdi, 500 qaytdi", "Backend bug — serverda xato"],
          ["So'rov ketdi, 200 qaytdi, lekin ma'lumot noto'g'ri", "Backend bug — noto'g'ri ma'lumot"],
          ["200 qaytdi, ma'lumot to'g'ri, lekin ekranda ko'rinmadi", "Frontend bug — ko'rsatishda xato"],
          ["So'rov 30 soniya oldi", "Performance muammosi"],
        ]},
        { type: "p", text: "Bu tahlil bug'ni to'g'ri odamga yo'naltirishga yordam beradi — frontend yoki backend dasturchiga." },
        { type: "tip", text: "Bug report'ga so'rov ma'lumotini qo'shing: endpoint, method, status kod, request payload va response. Bu dasturchining ishini juda yengillashtiradi." },
        { type: "key", text: "F12 → Network. Status kod va javobga qarab, bug frontend'dami yoki backend'da — aniqlash mumkin." },
      ],
    },

    {
      id: "l3-11-root-cause",
      title: "Root Cause Basics",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Root cause — bug'ning ASL sababi. QA kodni tuzatmaydi, lekin sababni tushunishga harakat qilish bug report'ni ancha kuchliroq qiladi." },
        { type: "h", text: "5 Why texnikasi" },
        { type: "p", text: "Sababni topish uchun 'nega?' deb 5 marta so'rang:" },
        { type: "example", text: "MUAMMО: Foydalanuvchi buyurtma bera olmayapti.\n\n1. Nega? → 'To'lash' tugmasi bosilganda xato chiqyapti\n2. Nega? → Server 500 xatosi qaytaryapti\n3. Nega? → So'rovda manzil maydoni bo'sh ketyapti\n4. Nega? → Forma manzilni to'g'ri saqlamayapti\n5. Nega? → Manzil maydoni 'required' deb belgilanmagan\n\n→ ROOT CAUSE: Formada manzil maydoni majburiy emas, shuning uchun bo'sh yuborilyapti va server uni qabul qila olmayapti." },
        { type: "h", text: "QA nima qila oladi" },
        { type: "list", items: [
          "Konsol va network'ni tekshirish — xato qayerdan kelayotgani",
          "Bug qaysi holatda chiqishini aniqlashtirish (faqat mobil? faqat bir foydalanuvchida?)",
          "Bug qachondan boshlab paydo bo'lgan (qaysi buildda)?",
          "Shunga o'xshash boshqa joyda ham bormi?",
        ]},
        { type: "warn", text: "QA root cause'ni ANIQLASHI shart emas — bu dasturchi ishi. Lekin ma'lumot to'plash va taxmin qilish juda qadrlanadi." },
        { type: "key", text: "5 Why — sababni chuqurlashtirib topish. QA sababni topishi shart emas, lekin ma'lumot to'plashi kerak." },
      ],
    },

    {
      id: "l3-12-good-bug-report",
      title: "Yaxshi Bug Report — yakuniy mezonlar",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Bug report yozgach, yuborishdan oldin o'zingizni tekshiring. Quyidagi checklist — professional QA'ning odati." },
        { type: "h", text: "Yuborishdan oldingi checklist" },
        { type: "list", items: [
          "Title aniqmi — [Modul] + muammo + holat?",
          "Qadamlarni o'zim takrorlab ko'rdimmi?",
          "Qadamlar minimal (keraksizlari olib tashlanganmi)?",
          "Expected Result talabdan kelib chiqadimi?",
          "Actual Result — fakt, talqin emasmi?",
          "Dalil (skrinshot / video / konsol) qo'shilganmi?",
          "Environment yozilganmi (brauzer, OS, muhit)?",
          "Severity va Priority mantiqan to'g'rimi?",
          "Bu bug allaqachon yozilmaganmi (duplicate)?",
          "Shaxsiy ma'lumot (parol, token) oshkor bo'lmaganmi?",
          "Ayblov ohangi yo'qmi?",
        ]},
        { type: "h", text: "Uch xato — eng ko'p uchraydigan" },
        { type: "table", head: ["Xato", "Oqibat"], rows: [
          ["Noaniq qadamlar", "Dasturchi takrorlay olmaydi → 'Cannot Reproduce'"],
          ["Expected Result yo'q", "Nima kutilganini hech kim bilmaydi → bahs"],
          ["Dalil yo'q", "Dasturchi ishonmaydi yoki tushunmaydi → vaqt yo'qoladi"],
        ]},
        { type: "key", text: "Yuborishdan oldin checklist. Yaxshi bug report — dasturchi savol bermasdan ishga kirishadigan report." },
      ],
    },

    {
      id: "l3-13-duplicate",
      title: "Duplicate — takroriy bug",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Duplicate — bu bug allaqachon boshqa kimdir tomonidan yozilgan. Ko'p duplicate — jamoada tartibsizlik va vaqt yo'qotishga olib keladi." },
        { type: "h", text: "Duplicate'ning oldini olish" },
        { type: "list", items: [
          "Bug yozishdan oldin qidiring — Jira'da kalit so'z bilan",
          "Yopilgan bug'larni ham tekshiring (balki qaytadan paydo bo'lgandir)",
          "Modul bo'yicha filtrlab ko'ring",
          "Jamoadan so'rang — 'buni kimdir ko'rganmi?'",
        ]},
        { type: "h", text: "Duplicate deb belgilanganda" },
        { type: "p", text: "Agar sizning bug'ingiz duplicate deb yopilsa:" },
        { type: "list", items: [
          "Asl bug'ni oching va o'qing — haqiqatan bir xilmi?",
          "Agar sizniki BOSHQA holatda chiqsa — bu duplicate emas, izoh yozing",
          "Agar sizda qo'shimcha ma'lumot bo'lsa — asl bug'ga izoh qo'shing (skrinshot, konsol)",
          "Agar haqiqatan bir xil bo'lsa — qabul qiling, muammo emas",
        ]},
        { type: "tip", text: "Duplicate — xato emas. Ayniqsa katta jamoada bu tabiiy. Lekin qidirish odati vaqtni tejaydi." },
        { type: "key", text: "Bug yozishdan oldin qidiring. Duplicate deb yopilsa — asl bug'ga qo'shimcha ma'lumot qo'shing." },
      ],
    },

    {
      id: "l3-14-cannot-reproduce",
      title: "Cannot Reproduce va Rejected",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Ikki eng noxush status: dasturchi bug'ni takrorlay olmadi (Cannot Reproduce) yoki bu bug emas dedi (Rejected). Ikkalasi ham ko'pincha QA'ning xatosi." },
        { type: "h", text: "Cannot Reproduce — nega bo'ladi" },
        { type: "table", head: ["Sabab", "Yechim"], rows: [
          ["Qadamlar to'liq emas", "Har qadamni aniq yozing, hech narsa taxmin qilmang"],
          ["Muhit boshqacha", "Brauzer, OS, versiya, muhitni aniq yozing"],
          ["Test ma'lumoti boshqa", "Qaysi foydalanuvchi, qaysi mahsulot — aniq ko'rsating"],
          ["Bug ba'zan chiqadi", "Buni ayting: '10 urinishdan 3 tasida chiqadi'"],
          ["Bug tuzatilgan", "Yangi buildda tekshiring"],
        ]},
        { type: "h", text: "Rejected — nega bo'ladi" },
        { type: "table", head: ["Sabab", "Nima qilish kerak"], rows: [
          ["Bu talab bo'yicha to'g'ri xatti-harakat", "Talabni qayta o'qing — balki siz noto'g'ri tushungansiz"],
          ["Talab noaniq edi", "Bug emas, savol sifatida qo'ying"],
          ["Dizayn bo'yicha shunday", "Aniqlashtiring — Product Owner bilan gaplashing"],
        ]},
        { type: "warn", text: "Bug rad etilsa — janjal qilmang. Avval talabni qayta o'qing. Agar hali ham to'g'ri deb hisoblasangiz, dalil bilan tinch tushuntiring." },
        { type: "tip", text: "Cannot Reproduce olganda: video yozing. Video hech qanday bahsga o'rin qoldirmaydi." },
        { type: "key", text: "Cannot Reproduce — odatda qadamlar to'liq emas. Rejected — odatda talab noto'g'ri tushunilgan. Ikkalasidan ham xulosa chiqaring." },
      ],
    },

    {
      id: "l3-15-wont-fix-deferred",
      title: "Won't Fix va Deferred",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Har bug tuzatilmaydi — bu normal. Ba'zilari 'tuzatilmaydi' (Won't Fix), ba'zilari 'keyinroq' (Deferred) deb belgilanadi." },
        { type: "table", head: ["Status", "Ma'nosi", "Qachon"], rows: [
          ["Won't Fix", "Bug tan olindi, lekin tuzatilmaydi", "Juda kichik ta'sir, tuzatish juda qimmat, funksiya olib tashlanmoqchi"],
          ["Deferred", "Tuzatiladi, lekin keyingi relizda", "Muhim emas, hozir vaqt yo'q, kichik ta'sir"],
          ["Rejected", "Bu bug emas", "Talab bo'yicha to'g'ri ishlayapti"],
        ]},
        { type: "example", text: "Won't Fix misoli: Internet Explorer 8'da sayt buziladi. Lekin foydalanuvchilarning 0.01% i IE8 ishlatadi va tuzatish 2 hafta oladi → Won't Fix.\n\nDeferred misoli: Footer'dagi havola noto'g'ri joyda. Kichik muammo, reliz shoshilinch → keyingi sprintga qoldiriladi." },
        { type: "h", text: "QA nima qiladi" },
        { type: "list", items: [
          "Qaror sababini tushunish (savol berish mumkin)",
          "Agar rozi bo'lmasangiz — dalil bilan tushuntirish (foydalanuvchiga ta'siri, xavf)",
          "Qarorni qabul qilish — bu biznes qarori, QA'niki emas",
          "Deferred bug'larni kuzatib borish (unutilib ketmasin)",
        ]},
        { type: "warn", text: "Deferred bug'lar ko'pincha unutiladi va yillar davomida qoladi. QA ularni davriy ravishda ko'rib chiqishi va eslatishi foydali." },
        { type: "key", text: "Won't Fix — tuzatilmaydi. Deferred — keyinroq. Bular biznes qarori. QA sababni tushunadi va kuzatib boradi." },
      ],
    },

    /* ---------- PRACTICAL ---------- */
    {
      id: "l3-16-practical",
      title: "Amaliyot: professional bug report",
      type: "practical",
      minutes: 40,
      body: [
        { type: "p", text: "Endi barcha o'rgangan bilimni bitta ishda birlashtirasiz: bug topib, unga to'liq professional bug report yozasiz — dalil, konsol logi va network ma'lumoti bilan." },
        { type: "p", text: "Bu topshiriqda DevTools'ni faol ishlatasiz. Bu — junior QA'ni o'rta darajadan ajratib turadigan ko'nikma." },
        { type: "tip", text: "F12 ni oching va Console hamda Network panellarini butun test davomida ochiq tuting. Ko'p bug'ning sababi o'sha yerda yozilgan bo'ladi." },
      ],
      practical: {
        targetUrl: "https://www.saucedemo.com",
        targetName: "SauceDemo",
        task: "SauceDemo'ga 'problem_user' bilan kiring. Kamida 2 ta bug toping va HAR BIRIGA to'liq professional bug report yozing. Har report'da bo'lishi SHART: Title ([Modul] formatida), Environment, Preconditions, raqamlangan Steps, Expected, Actual (fakt sifatida), Severity, Priority, va kamida bitta dalil (skrinshot + konsol yoki network ma'lumoti).",
        steps: [
          "F12 ni ochib, Console va Network panellarini ko'rinadigan qiling",
          "problem_user / secret_sauce bilan kiring",
          "Saytni test qiling — har bug topganingizda konsolda xato bormi qarang",
          "Har bug uchun skrinshot oling va muammoni belgilang",
          "Network panelida tegishli so'rov va status kodni tekshiring",
          "Har bug'ga to'liq bug report yozing (barcha maydonlar bilan)",
          "Yozgach, o'z qadamlaringizni qaytadan bajarib, bug takrorlanishini tekshiring",
        ],
        debrief:
          "Bug report'ingizni quyidagi mezonlar bo'yicha baholang:\n\n✅ TITLE: [Modul] formatida, aniq, ayblovsizmi?\n✅ STEPS: Raqamlangan, aniq, minimal, o'zingiz takrorlab ko'rdingizmi?\n✅ EXPECTED: Talabdan kelib chiqqanmi, aniqmi ('ishlaydi' emas)?\n✅ ACTUAL: Fakt sifatida yozilganmi, talqin emasmi?\n✅ DALIL: Skrinshot bormi? Konsol xatosi nusxalanganmi? Network status kodi ko'rsatilganmi?\n✅ ENVIRONMENT: Brauzer, OS, muhit yozilganmi?\n✅ SEVERITY/PRIORITY: Mantiqan asoslanganmi?\n\nENG MUHIM SAVOL: Bu report'ni dasturchiga bersangiz, u SAVOL BERMASDAN ishga kirisha oladimi?\n\nAgar 'ha' desangiz — siz professional bug report yozdingiz. Bu ko'nikma sizni ko'p junior QA'dan ajratib turadi.",
      },
    },

    /* ---------- QUIZ ---------- */
    {
      id: "l3-17-quiz",
      title: "Yakuniy test: Bug Reporting",
      type: "quiz",
      minutes: 10,
      body: [
        { type: "p", text: "Bug reporting — QA ishining eng ko'rinadigan qismi. Quyidagi savollar bilan bilimingizni mustahkamlang." },
      ],
      quiz: [
        {
          id: "l3q1",
          q: "Bug report'ning eng muhim qismi qaysi?",
          options: [
            "Severity",
            "Steps to Reproduce — dasturchi bug'ni takrorlay olmasa, u tuzatilmaydi",
            "Title rangi",
            "Bug topilgan vaqt",
          ],
          answer: 1,
          explain: "Steps to Reproduce — bug report'ning yuragi. Takrorlanmasa, bug tuzatilmaydi ('Cannot Reproduce' bo'ladi).",
        },
        {
          id: "l3q2",
          q: "Qaysi title eng yaxshi?",
          options: [
            "Ishlamayapti",
            "[Savat] Manfiy miqdor kiritilganda jami summa manfiy chiqadi",
            "Savatda bug bor",
            "Dasturchi savatni buzib qo'ygan",
          ],
          answer: 1,
          explain: "Yaxshi title: [Modul] + aniq muammo + holat. Ayblov bo'lmasligi kerak.",
        },
        {
          id: "l3q3",
          q: "Actual Result'da nima yozilishi kerak?",
          options: [
            "Sizning talqiningiz ('tizim buzilib ketdi')",
            "Faqat FAKT — aniq nima bo'ldi, aniq xato matni, konsol xatosi",
            "Bug'ning sababi",
            "Tuzatish yo'li",
          ],
          answer: 1,
          explain: "Actual Result — faqat fakt, talqin emas. 'Tizim buzildi' emas, 'Sahifa oq bo'ldi, konsolda TypeError xatosi'.",
        },
        {
          id: "l3q4",
          q: "Konsolda (F12 → Console) qizil xato ko'rsangiz nima qilasiz?",
          options: [
            "E'tibor bermayman",
            "Nusxa ko'chirib bug report'ga qo'shaman — bu dasturchiga bug sababini ko'rsatadi",
            "Brauzerni yopib qo'yaman",
            "Sahifani yangilayman",
          ],
          answer: 1,
          explain: "Konsoldagi xato ko'pincha bug sababini to'g'ridan-to'g'ri ko'rsatadi (masalan fayl nomi va qator raqami bilan). Uni bug report'ga qo'shish tuzatish vaqtini qisqartiradi.",
        },
        {
          id: "l3q5",
          q: "Network panelida so'rov ketdi, lekin 500 status kod qaytdi. Bu nimani bildiradi?",
          options: [
            "Frontend bug — tugma so'rov yubormayapti",
            "Backend bug — serverda xato",
            "Bug yo'q",
            "Internet uzilgan",
          ],
          answer: 1,
          explain: "So'rov ketdi (frontend ishladi), lekin server 500 qaytardi → muammo backend'da. Agar so'rov umuman ketmagan bo'lsa — frontend bug'i bo'lardi.",
        },
        {
          id: "l3q6",
          q: "Bug'ingiz 'Cannot Reproduce' deb yopildi. Eng ehtimoliy sabab?",
          options: [
            "Dasturchi yalqov",
            "Sizning qadamlaringiz to'liq emas yoki muhit/test ma'lumoti aniq ko'rsatilmagan",
            "Bug o'z-o'zidan tuzalgan",
            "Bu normal, e'tibor bermaslik kerak",
          ],
          answer: 1,
          explain: "'Cannot Reproduce' — odatda QA'ning qadamlari to'liq emasligini bildiradi. Yechim: aniqroq qadamlar, muhit ma'lumoti va video.",
        },
        {
          id: "l3q7",
          q: "Won't Fix va Deferred farqi?",
          options: [
            "Ular bir xil",
            "Won't Fix — umuman tuzatilmaydi; Deferred — tuzatiladi, lekin keyingi relizda",
            "Deferred — bu bug emas",
            "Won't Fix — bug tuzatildi",
          ],
          answer: 1,
          explain: "Won't Fix — bug tan olindi, lekin tuzatilmaydi (juda kichik yoki juda qimmat). Deferred — tuzatiladi, lekin keyinroq.",
        },
        {
          id: "l3q8",
          q: "Bug yozishdan oldin nima qilish kerak?",
          options: [
            "Darrov yozish — vaqt tejaladi",
            "Jira'da qidirish — bu bug allaqachon yozilganmi (duplicate'ning oldini olish)",
            "Dasturchiga qo'ng'iroq qilish",
            "Hech narsa",
          ],
          answer: 1,
          explain: "Duplicate'ning oldini olish uchun avval qidiring. Bu jamoa vaqtini tejaydi va tartibni saqlaydi.",
        },
      ],
    },
  ],
};
