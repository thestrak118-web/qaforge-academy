// data/modules/level-7-devtools.ts
//
// LEVEL 7 — Browser DevTools
// 10 theory + 1 practical + 1 quiz = 12 sections

import type { Module } from "../lessons";

export const LEVEL_7: Module = {
  id: "browser-devtools",
  icon: "🔧",
  title: "Level 7 — Browser DevTools",
  summary:
    "Brauzer ichidagi eng kuchli QA quroli: element tekshirish, konsol, tarmoq, storage, performance va mobil emulyatsiya.",
  level: "junior",
  sections: [
    {
      id: "l7-01-elements",
      title: "Elements — DOM tekshirish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Elements paneli — sahifaning HTML tuzilishini (DOM) va CSS uslublarini ko'rsatadi. QA uni element tekshirish, lokator topish va UI bug'ni tahlil qilish uchun ishlatadi." },
        { type: "h", text: "Qanday ochiladi" },
        { type: "list", items: [
          "F12 → Elements tab",
          "Elementga o'ng tugma → 'Inspect' (eng tez usul)",
          "Ctrl+Shift+C → element tanlash rejimi",
        ]},
        { type: "h", text: "QA nima qiladi" },
        { type: "table", head: ["Vazifa", "Qanday"], rows: [
          ["Element atributlarini ko'rish", "id, class, name, data-* — automation uchun lokator"],
          ["Yashirin elementni topish", "display:none, visibility:hidden bilan yashirilganmi?"],
          ["Matnni tekshirish", "Ekrandagi matn HTML'dagiga mos keladimi?"],
          ["CSS'ni tekshirish", "Rang, o'lcham, joylashuv — dizaynga mosmi?"],
          ["Vaqtincha o'zgartirish", "Matn/uslubni o'zgartirib, qanday ko'rinishini sinash"],
          ["Disabled holatni sinash", "disabled atributini olib tashlab, tugma ishlaydimi?"],
        ]},
        { type: "warn", text: "XAVFSIZLIK TESTI: disabled tugmani DevTools'da yoqib, bosing. Agar so'rov ketsa va server qabul qilsa — bu bug! Server ham ruxsatni tekshirishi kerak, faqat UI'da yashirish yetarli emas." },
        { type: "example", text: "Klassik bug: 'O'chirish' tugmasi oddiy foydalanuvchida yashiringan (CSS bilan). Siz DevTools'da uni ko'rinadigan qilib bosasiz → element o'chib ketadi!\n\n→ Server ruxsatni tekshirmayapti. Critical severity xavfsizlik bug'i." },
        { type: "key", text: "Elements — DOM va CSS tekshirish. Yashirin/disabled elementlarni yoqib, server ruxsatni tekshirishini sinang." },
      ],
    },

    {
      id: "l7-02-console",
      title: "Console — xatolarni ko'rish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Console — JavaScript xatolarini ko'rsatadi. Bu QA'ning eng kam ishlatiladigan, lekin eng qimmatli quroli." },
        { type: "h", text: "Xabar turlari" },
        { type: "table", head: ["Tur", "Rang", "Ma'nosi"], rows: [
          ["Error", "Qizil ❌", "JavaScript xatosi — ko'pincha bug sababi"],
          ["Warning", "Sariq ⚠️", "Ogohlantirish — muammo bo'lishi mumkin"],
          ["Info / Log", "Oq", "Dasturchi qoldirgan ma'lumot"],
        ]},
        { type: "h", text: "Ko'p uchraydigan xatolar" },
        { type: "table", head: ["Xato", "Ma'nosi"], rows: [
          ["TypeError: Cannot read property 'x' of null", "Bo'sh obyektdan ma'lumot olishga urinish"],
          ["TypeError: undefined is not a function", "Mavjud bo'lmagan funksiya chaqirilgan"],
          ["ReferenceError: x is not defined", "E'lon qilinmagan o'zgaruvchi"],
          ["404 (Not Found)", "Fayl yoki API topilmadi"],
          ["500 (Internal Server Error)", "Serverda xato"],
          ["CORS error", "Boshqa domendan so'rov bloklangan"],
          ["Uncaught (in promise)", "Asinxron kod xatosi"],
        ]},
        { type: "h", text: "Console'da buyruq yozish" },
        { type: "code", text: `// Element topish
document.querySelector("#login-btn")

// Barcha tugmalarni sanash
document.querySelectorAll("button").length

// Local Storage ko'rish
localStorage

// Cookie ko'rish
document.cookie` },
        { type: "tip", text: "OLTIN QOIDA: har bug topganingizda Console'ni oching. Qizil xato bo'lsa — nusxa ko'chirib bug report'ga qo'shing. Bu dasturchi vaqtini bir necha barobar tejaydi." },
        { type: "key", text: "Console — JavaScript xatolari. Har bug'da ochib qarang, qizil xatoni bug report'ga nusxalang." },
      ],
    },

    {
      id: "l7-03-network",
      title: "Network — tarmoq so'rovlari",
      type: "theory",
      minutes: 15,
      body: [
        { type: "p", text: "Network paneli — brauzer va server o'rtasidagi barcha so'rovlarni ko'rsatadi. Bu — frontend va backend bug'ini ajratishning eng aniq yo'li." },
        { type: "h", text: "Asosiy ustunlar" },
        { type: "table", head: ["Ustun", "Ma'nosi"], rows: [
          ["Name", "So'rov manzili"],
          ["Status", "HTTP status kod (200, 404, 500)"],
          ["Type", "Turi (xhr, fetch, document, img, css)"],
          ["Initiator", "Kim so'rov yubordi"],
          ["Size", "Javob hajmi"],
          ["Time", "Qancha vaqt oldi"],
        ]},
        { type: "h", text: "So'rovni bosganda" },
        { type: "list", items: [
          "Headers — so'rov va javob header'lari",
          "Payload / Request — nima yuborilgan",
          "Response — server nima qaytargan (JSON)",
          "Preview — javobning chiroyli ko'rinishi",
          "Timing — vaqt taqsimoti",
        ]},
        { type: "h", text: "Frontend yoki backend bug'i?" },
        { type: "table", head: ["Kuzatuv", "Xulosa"], rows: [
          ["So'rov umuman yuborilmadi", "Frontend bug — tugma ishlamayapti"],
          ["So'rov ketdi, 500 qaytdi", "Backend bug — serverda xato"],
          ["200 qaytdi, lekin ma'lumot noto'g'ri", "Backend bug — noto'g'ri ma'lumot"],
          ["200 + to'g'ri ma'lumot, lekin ekranda ko'rinmadi", "Frontend bug — ko'rsatishda xato"],
          ["So'rov 20 soniya oldi", "Performance muammosi"],
        ]},
        { type: "h", text: "Foydali filtrlar" },
        { type: "list", items: [
          "Fetch/XHR — faqat API so'rovlari (eng foydali)",
          "Status ustunini bosib saralash — 4xx/5xx xatolarni topish",
          "'Disable cache' belgilash — keshsiz test",
          "'Preserve log' — sahifa o'tganda ham loglar saqlanadi",
        ]},
        { type: "key", text: "Network — barcha so'rovlar. Status kod va javobga qarab frontend yoki backend bug'ini ajratish mumkin." },
      ],
    },

    {
      id: "l7-04-sources",
      title: "Sources — kod va debug",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Sources paneli — sahifaning JavaScript kodini ko'rsatadi. QA uni asosan xato qayerdan kelayotganini aniqlash uchun ishlatadi." },
        { type: "h", text: "QA nima qiladi" },
        { type: "list", items: [
          "Console'dagi xato havolasini bosib, xato qatoriga o'tish",
          "Breakpoint qo'yib, kod bajarilishini to'xtatish (ilg'or)",
          "Qaysi fayl/qatorda muammo borligini aniqlash",
        ]},
        { type: "h", text: "Breakpoint — kodni to'xtatish" },
        { type: "p", text: "Kod qatorining raqamini bosing → qizil nuqta paydo bo'ladi. Kod o'sha qatorga yetganda to'xtaydi va o'zgaruvchilar qiymatini ko'rish mumkin." },
        { type: "table", head: ["Tugma", "Nima qiladi"], rows: [
          ["Resume (▶)", "Davom ettirish"],
          ["Step over", "Keyingi qatorga o'tish"],
          ["Step into", "Funksiya ichiga kirish"],
          ["Watch", "O'zgaruvchi qiymatini kuzatish"],
        ]},
        { type: "tip", text: "Junior QA sifatida breakpoint shart emas. Lekin Console'dagi xato havolasini bosib, qaysi faylda ekanini bug report'ga yozish — juda qadrlanadi." },
        { type: "key", text: "Sources — kod va debug. QA uchun asosiy foyda: xato qaysi fayl/qatorda ekanini aniqlash." },
      ],
    },

    {
      id: "l7-05-application",
      title: "Application — ilova ma'lumotlari",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Application paneli — brauzerda saqlanadigan barcha ma'lumotni ko'rsatadi: cookie, storage, kesh, service worker." },
        { type: "h", text: "Bo'limlar" },
        { type: "table", head: ["Bo'lim", "Nima ko'rinadi"], rows: [
          ["Local Storage", "Doimiy saqlangan ma'lumot"],
          ["Session Storage", "Tab ochiq turgancha saqlanadi"],
          ["Cookies", "Barcha cookie'lar va ularning bayroqlari"],
          ["Cache Storage", "Keshlangan resurslar"],
          ["Service Workers", "Fon skriptlari (offline ishlash)"],
        ]},
        { type: "h", text: "QA test g'oyalari" },
        { type: "list", items: [
          "Cookie'da Secure va HttpOnly bayroqlari bormi? (xavfsizlik)",
          "Local Storage'da token yoki maxfiy ma'lumot saqlanyaptimi? (xavf!)",
          "Logout'dan keyin storage tozalanadimi?",
          "Cookie muddati to'g'ri belgilanganmi?",
          "Storage'ni qo'lda o'zgartirsa nima bo'ladi?",
        ]},
        { type: "warn", text: "XAVFSIZLIK TESTI: Application → Local Storage'da JWT token yoki parol saqlanayotgan bo'lsa — bu xavf. JavaScript (va XSS hujumi) uni o'qiy oladi. httpOnly cookie xavfsizroq." },
        { type: "example", text: "Test: Logout qiling, keyin Application → Local Storage va Cookies'ni tekshiring.\n\nAgar token hali ham turgan bo'lsa — bu bug. Logout barcha maxfiy ma'lumotni tozalashi kerak." },
        { type: "key", text: "Application — cookie, storage, kesh. Xavfsizlik bayroqlarini va logout'da tozalanishini tekshiring." },
      ],
    },

    {
      id: "l7-06-storage",
      title: "Storage — ma'lumotni boshqarish",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "DevTools'da storage'ni nafaqat ko'rish, balki o'zgartirish va o'chirish ham mumkin. Bu — kuchli test usuli." },
        { type: "h", text: "Amaliy test usullari" },
        { type: "table", head: ["Amal", "Nimani tekshiradi"], rows: [
          ["Cookie'ni o'chirish", "Login chiqib ketadimi? Qayta login so'raladimi?"],
          ["Local Storage'ni tozalash", "Ilova to'g'ri ishlaydimi? Yiqilmaydimi?"],
          ["Token qiymatini o'zgartirish", "Server yaroqsiz tokenni rad etadimi? (401)"],
          ["Role qiymatini o'zgartirish", "Server ishonadimi? (ishonmasligi kerak!)"],
          ["Sessiya cookie'sini nusxalash", "Boshqa brauzerda ishlaydimi? (session hijacking)"],
        ]},
        { type: "warn", text: "ENG MUHIM TEST: Local Storage'da role: 'user' bo'lsa, uni 'admin' ga o'zgartiring va sahifani yangilang.\n\nAgar admin funksiyalari ochilsa — bu KRITIK xavfsizlik bug'i. Server rolni o'zi tekshirishi kerak, brauzerdagi qiymatga ishonmasligi kerak." },
        { type: "h", text: "'Clear site data' tugmasi" },
        { type: "p", text: "Application → Storage → 'Clear site data' — barcha cookie, storage va keshni bir tugma bilan tozalaydi. Toza holatdan test boshlash uchun juda qulay." },
        { type: "key", text: "Storage'ni o'zgartirib test qiling: token, role qiymatlari. Server brauzerdagi ma'lumotga ISHONMASLIGI kerak." },
      ],
    },

    {
      id: "l7-07-performance",
      title: "Performance — tezlik tahlili",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Performance paneli — sahifa qanday va qancha vaqtda yuklanishini tahlil qiladi. Sekinlik sababini aniqlash uchun ishlatiladi." },
        { type: "h", text: "Asosiy metrikalar" },
        { type: "table", head: ["Metrika", "Ma'nosi", "Yaxshi qiymat"], rows: [
          ["FCP (First Contentful Paint)", "Birinchi kontent ko'ringan vaqt", "< 1.8s"],
          ["LCP (Largest Contentful Paint)", "Eng katta element yuklangan vaqt", "< 2.5s"],
          ["TTI (Time to Interactive)", "Sahifa ishlatishga tayyor bo'lgan vaqt", "< 3.8s"],
          ["CLS (Cumulative Layout Shift)", "Elementlar sakrashi", "< 0.1"],
          ["TBT (Total Blocking Time)", "Bloklangan vaqt", "< 200ms"],
        ]},
        { type: "h", text: "Sekinlik sabablari" },
        { type: "list", items: [
          "Katta rasmlar (optimallashtirilmagan)",
          "Ko'p JavaScript fayl",
          "Sekin API so'rovlar",
          "Keshlash sozlanmagan",
          "Ko'p sonli so'rovlar (har biri alohida)",
          "Bloklovchi skriptlar",
        ]},
        { type: "h", text: "CLS — foydalanuvchini bezovta qiluvchi bug" },
        { type: "example", text: "Siz maqolani o'qiyapsiz. Birdan reklama yuklanadi va matn pastga siljiydi — siz noto'g'ri joyni bosasiz.\n\nBu — Layout Shift (CLS). Foydalanuvchi uchun juda bezovta qiluvchi. QA buni topib, bug sifatida yozishi kerak." },
        { type: "tip", text: "Performance tahlili murakkab. Junior QA uchun Lighthouse (keyingi dars) ancha oson va yetarli." },
        { type: "key", text: "Performance — yuklanish tahlili. FCP, LCP, TTI, CLS asosiy metrikalar. CLS (sakrash) — ko'p e'tibordan chetda qoladi." },
      ],
    },

    {
      id: "l7-08-lighthouse",
      title: "Lighthouse — avtomatik audit",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Lighthouse — Chrome'ga o'rnatilgan avtomatik audit asbobi. Bir tugma bilan sahifani tahlil qilib, ball va tavsiyalar beradi." },
        { type: "h", text: "Nimalarni tekshiradi" },
        { type: "table", head: ["Bo'lim", "Nima baholanadi"], rows: [
          ["Performance", "Tezlik, yuklanish vaqti, metrikalar"],
          ["Accessibility", "Imkoniyati cheklanganlar uchun qulaylik"],
          ["Best Practices", "Zamonaviy web standartlariga muvofiqlik"],
          ["SEO", "Qidiruv tizimlari uchun optimallashtirish"],
        ]},
        { type: "h", text: "Qanday ishlatiladi" },
        { type: "list", items: [
          "F12 → Lighthouse tab",
          "Rejimni tanlang (Mobile / Desktop)",
          "Kategoriyalarni belgilang",
          "'Analyze page load' bosing",
          "Natija: har bo'lim uchun 0-100 ball + aniq tavsiyalar",
        ]},
        { type: "h", text: "QA uchun ayniqsa muhim: Accessibility" },
        { type: "p", text: "Accessibility bo'limi ko'p bug topadi va ular ko'pincha e'tibordan chetda qoladi:" },
        { type: "list", items: [
          "Rasmlarda alt matni yo'q (ko'zi ojizlar uchun)",
          "Rang kontrasti yetarli emas (o'qish qiyin)",
          "Tugmalarda tushunarli nom yo'q",
          "Forma maydonlarida label yo'q",
          "Klaviatura bilan yurish mumkin emas",
        ]},
        { type: "tip", text: "Lighthouse'ni har yangi sahifada ishga tushiring — 30 soniyada ko'p bug topasiz. Bu QA uchun eng oson 'g'alaba'." },
        { type: "warn", text: "Eslatma: Lighthouse ballari incognito'da aniqroq (kengaytmalar ta'sir qilmaydi)." },
        { type: "key", text: "Lighthouse — bir tugmali audit (Performance, Accessibility, Best Practices, SEO). Tez va ko'p bug topadi." },
      ],
    },

    {
      id: "l7-09-har-export",
      title: "HAR Export — tarmoq logini saqlash",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "HAR (HTTP Archive) — barcha tarmoq so'rovlarini bitta faylga saqlash. Bug report'ga qo'shish uchun juda kuchli dalil." },
        { type: "h", text: "Qanday saqlanadi" },
        { type: "list", items: [
          "F12 → Network tab",
          "'Preserve log' belgilang (sahifa o'tganda ham saqlansin)",
          "Bug'ni takrorlang (barcha so'rovlar yoziladi)",
          "Network panelida o'ng tugma → 'Save all as HAR with content'",
          "Faylni bug report'ga biriktiring",
        ]},
        { type: "h", text: "Nega foydali" },
        { type: "table", head: ["Foyda", "Izoh"], rows: [
          ["To'liq manzara", "Barcha so'rov, header, javob — hammasi bor"],
          ["Takrorlash shart emas", "Dasturchi HAR'ni ochib, holatni ko'radi"],
          ["Vaqt ma'lumoti", "Qaysi so'rov sekin ishlagani ko'rinadi"],
          ["Intermittent bug uchun ideal", "Ba'zan chiqadigan bug'ni 'ushlab qolish'"],
        ]},
        { type: "warn", text: "XAVFSIZLIK: HAR faylda parol, token, shaxsiy ma'lumot bo'lishi mumkin! Bug report'ga qo'shishdan oldin tekshiring va maxfiy ma'lumotni tozalang." },
        { type: "tip", text: "'Cannot Reproduce' javobini olsangiz — HAR fayl yuboring. U hech qanday bahsga o'rin qoldirmaydi." },
        { type: "key", text: "HAR — barcha tarmoq so'rovlarini faylga saqlash. Kuchli dalil, lekin maxfiy ma'lumotni tozalang." },
      ],
    },

    {
      id: "l7-10-mobile-emulation",
      title: "Mobile Emulation — mobil rejim",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "DevTools'da mobil qurilmani taqlid qilish mumkin — telefon sotib olmasdan mobil ko'rinishni test qilasiz." },
        { type: "h", text: "Qanday yoqiladi" },
        { type: "list", items: [
          "F12 → Toggle device toolbar (Ctrl+Shift+M)",
          "Yuqoridan qurilma tanlang (iPhone, Galaxy, iPad)",
          "Yoki 'Responsive' → o'lchamni qo'lda o'zgartiring",
        ]},
        { type: "h", text: "Nimalarni test qilish mumkin" },
        { type: "table", head: ["Test", "Izoh"], rows: [
          ["Responsive dizayn", "Elementlar to'g'ri joylashadimi, kesilmaydimi?"],
          ["Menyu", "Hamburger menyu ochiladimi?"],
          ["Matn o'lchami", "O'qish mumkinmi (juda kichik emasmi)?"],
          ["Tugma o'lchami", "Barmoq bilan bosish qulaymi (kamida 44x44px)?"],
          ["Gorizontal skroll", "Bo'lmasligi kerak!"],
          ["Orientatsiya", "Landscape (yon) rejimda buzilmaydimi?"],
          ["Sekin tarmoq", "Throttling bilan 3G'da qanday ishlaydi?"],
        ]},
        { type: "h", text: "Network throttling — sekin internet taqlidi" },
        { type: "p", text: "Network tab → 'No throttling' o'rniga 'Slow 3G' tanlang. Sahifa sekin internetda qanday ishlashini ko'rasiz — loading holatlari, timeout'lar test qilinadi." },
        { type: "warn", text: "MUHIM CHEKLOV: Emulyatsiya — haqiqiy qurilma EMAS. U ekran o'lchamini taqlid qiladi, lekin haqiqiy sensorli ekran, brauzer farqlari, qurilma quvvati emas.\n\nKritik funksiyalarni HAQIQIY qurilmada ham test qilish shart." },
        { type: "key", text: "Mobile emulation — ekran o'lchami taqlidi + throttling. Tez, lekin haqiqiy qurilmaning o'rnini bosmaydi." },
      ],
    },

    /* ---------- PRACTICAL ---------- */
    {
      id: "l7-11-practical",
      title: "Amaliyot: DevTools bilan to'liq audit",
      type: "practical",
      minutes: 45,
      body: [
        { type: "p", text: "Barcha DevTools panelini bitta saytda amalda ishlatasiz: Elements, Console, Network, Application, Lighthouse va mobil rejim." },
        { type: "p", text: "SauceDemo'ning 'problem_user' hisobi ataylab nosoz — bu DevTools bilan bug topish uchun ideal maydon." },
        { type: "tip", text: "Har panelni ketma-ket ishlating va topilmalaringizni yozib boring. Bu — real QA audit ishi." },
      ],
      practical: {
        targetUrl: "https://www.saucedemo.com",
        targetName: "SauceDemo",
        task: "SauceDemo'da to'liq DevTools audit o'tkazing. Quyidagilarni bajaring va har biri bo'yicha topilmalaringizni yozing: (1) Console — qanday xatolar bor? (2) Network — login so'rovi qaysi status kod qaytaradi, qanday ma'lumot yuboriladi? (3) Application — cookie va storage'da nima saqlanadi, Secure/HttpOnly bayroqlari bormi? (4) Elements — yashirin yoki disabled element bormi? (5) Lighthouse — Accessibility bali qancha, qanday muammolar topildi? (6) Mobile — mobil rejimda dizayn buzilmaydimi?",
        steps: [
          "F12 ni oching, Console'ni tozalang va problem_user bilan login qiling",
          "Console'dagi barcha xato va ogohlantirishni yozib oling",
          "Network → login so'rovini toping: status, payload, response ni yozing",
          "Application → Cookies: qanday cookie bor, Secure va HttpOnly bayroqlari bormi?",
          "Application → Local Storage: maxfiy ma'lumot saqlanyaptimi?",
          "Elements → mahsulot rasmlarini tekshiring — src atributlari bir xilmi?",
          "Lighthouse → Accessibility auditini ishga tushiring, ballni va muammolarni yozing",
          "Ctrl+Shift+M → mobil rejim: dizayn buzilmaydimi, gorizontal skroll bormi?",
          "Logout qiling va Application'ni qayta tekshiring — storage tozalandimi?",
        ],
        debrief:
          "Topishingiz kerak bo'lgan narsalar:\n\n🔴 CONSOLE: problem_user bilan kirganda JavaScript xatolari chiqadi (rasm yuklashda va tugma bosilganda).\n\n🌐 NETWORK: Login POST so'rovi — status va yuborilayotgan ma'lumotni ko'rasiz. Parol qanday yuborilyapti?\n\n🍪 APPLICATION: session-username cookie'si bor. Secure va HttpOnly bayroqlari bormi? (Ko'pincha yo'q — bu xavfsizlik kamchiligi.)\n\n🔍 ELEMENTS: Mahsulot rasmlarining src atributi bir xil — bu problem_user'ning asosiy bug'i.\n\n💡 LIGHTHOUSE: Accessibility bali odatda 90 dan past. Rasmlarda alt matni yo'qligi, kontrast muammolari topiladi.\n\n📱 MOBILE: Mobil rejimda ba'zi elementlar to'g'ri joylashmaydi.\n\nAgar bularning ko'pini topgan bo'lsangiz — siz DevTools'ni professional darajada ishlata olasiz. Bu ko'nikma sizni ko'p junior QA'dan ajratib turadi.",
      },
    },

    /* ---------- QUIZ ---------- */
    {
      id: "l7-12-quiz",
      title: "Yakuniy test: DevTools",
      type: "quiz",
      minutes: 10,
      body: [
        { type: "p", text: "DevTools — QA'ning kundalik quroli. Bilimingizni tekshiring." },
      ],
      quiz: [
        {
          id: "l7q1",
          q: "Network panelida so'rov umuman yuborilmagan bo'lsa — bu qanday bug?",
          options: [
            "Backend bug",
            "Frontend bug — tugma so'rov yubormayapti",
            "Bug emas",
            "Server ishlamayapti",
          ],
          answer: 1,
          explain: "So'rov umuman ketmagan bo'lsa — muammo frontend'da (tugma ishlamayapti). Agar so'rov ketib, 500 qaytsa — backend bug'i.",
        },
        {
          id: "l7q2",
          q: "DevTools'da disabled tugmani yoqib bosdingiz va so'rov muvaffaqiyatli o'tdi. Bu nima?",
          options: [
            "Normal xatti-harakat",
            "Xavfsizlik bug'i — server ham ruxsatni tekshirishi kerak, faqat UI'da yashirish yetarli emas",
            "DevTools xatosi",
            "Bug emas",
          ],
          answer: 1,
          explain: "UI'da yashirish — soxta himoya. Server har so'rovda ruxsatni mustaqil tekshirishi shart. Bu klassik xavfsizlik bug'i.",
        },
        {
          id: "l7q3",
          q: "Local Storage'da role: 'user' ni 'admin' ga o'zgartirdingiz va admin funksiyalari ochildi. Bu nima?",
          options: [
            "Normal",
            "KRITIK xavfsizlik bug'i — server brauzerdagi qiymatga ishonmasligi kerak",
            "Kichik UI bug'i",
            "Bug emas",
          ],
          answer: 1,
          explain: "Server hech qachon brauzerdagi ma'lumotga ishonmasligi kerak. Rolni server o'zi (tokendan/bazadan) tekshirishi shart. Bu Critical severity.",
        },
        {
          id: "l7q4",
          q: "Bug topganingizda Console'da qizil xato ko'rsangiz nima qilasiz?",
          options: [
            "E'tibor bermayman",
            "Nusxa ko'chirib bug report'ga qo'shaman — bu ko'pincha bug sababini to'g'ridan-to'g'ri ko'rsatadi",
            "Brauzerni yopaman",
            "Sahifani yangilayman",
          ],
          answer: 1,
          explain: "Console xatosi ko'pincha fayl nomi va qator raqamini ko'rsatadi. Bug report'ga qo'shish tuzatish vaqtini keskin qisqartiradi.",
        },
        {
          id: "l7q5",
          q: "HAR fayl nima uchun kerak?",
          options: [
            "Rasmni saqlash uchun",
            "Barcha tarmoq so'rovlarini bitta faylga saqlab, bug report'ga dalil sifatida qo'shish uchun",
            "Kodni saqlash uchun",
            "Kerak emas",
          ],
          answer: 1,
          explain: "HAR — barcha so'rov, header va javoblarni saqlaydi. 'Cannot Reproduce' javobiga qarshi eng kuchli dalil. Lekin maxfiy ma'lumotni tozalash kerak.",
        },
        {
          id: "l7q6",
          q: "Lighthouse QA uchun nima uchun ayniqsa foydali?",
          options: [
            "Chiroyli grafik chizadi",
            "Bir tugma bilan Performance, Accessibility, Best Practices va SEO auditini o'tkazadi — tez va ko'p bug topadi",
            "Kodni tuzatadi",
            "Faqat SEO uchun",
          ],
          answer: 1,
          explain: "Lighthouse 30 soniyada ko'p muammo topadi, ayniqsa Accessibility (alt matni yo'q, kontrast past, label yo'q) — bular ko'pincha e'tibordan chetda qoladi.",
        },
        {
          id: "l7q7",
          q: "Mobile emulation (DevTools mobil rejimi) haqida qaysi TO'G'RI?",
          options: [
            "Haqiqiy qurilmani to'liq almashtiradi",
            "Ekran o'lchamini taqlid qiladi, lekin haqiqiy qurilmaning o'rnini BOSMAYDI — kritik funksiyalar haqiqiy qurilmada ham test qilinishi kerak",
            "Faqat iPhone'ni taqlid qiladi",
            "Foydasiz",
          ],
          answer: 1,
          explain: "Emulyatsiya ekran o'lchami va throttling uchun yaxshi, lekin haqiqiy sensorli ekran, brauzer farqlari va qurilma quvvatini taqlid qilmaydi.",
        },
        {
          id: "l7q8",
          q: "Logout'dan keyin Application → Local Storage'da token hali turibdi. Bu nima?",
          options: [
            "Normal",
            "Bug — logout barcha maxfiy ma'lumotni tozalashi kerak",
            "Yaxshi, tez qayta kirish uchun",
            "Bug emas",
          ],
          answer: 1,
          explain: "Logout barcha sessiya ma'lumotini (token, cookie, storage) tozalashi kerak. Aks holda boshqa odam o'sha kompyuterda kirishi mumkin.",
        },
      ],
    },
  ],
};
