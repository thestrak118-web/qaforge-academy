// data/modules/level-4-web-fundamentals.ts
//
// LEVEL 4 — Web Fundamentals
// 20 theory + 1 practical + 1 quiz = 22 sections

import type { Module } from "../lessons";

export const LEVEL_4: Module = {
  id: "web-fundamentals",
  icon: "🌐",
  title: "Level 4 — Web Fundamentals",
  summary:
    "Internet qanday ishlaydi: HTTP, status kodlar, cookie, sessiya, autentifikatsiya va API asoslari. QA uchun zarur texnik poydevor.",
  level: "junior",
  sections: [
    {
      id: "l4-01-http",
      title: "HTTP — asosiy protokol",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "HTTP (HyperText Transfer Protocol) — brauzer (client) va server o'rtasidagi muloqot 'tili'. Har safar sahifa ochilganda, brauzer serverga HTTP so'rov yuboradi va javob oladi." },
        { type: "h", text: "So'rov-javob modeli" },
        { type: "code", text: `Client (brauzer)  ──── So'rov (Request) ───►  Server
Client (brauzer)  ◄──── Javob (Response) ────  Server` },
        { type: "h", text: "So'rov tarkibi" },
        { type: "table", head: ["Qism", "Ma'nosi", "Misol"], rows: [
          ["Method", "Qanday amal", "GET, POST, PUT, DELETE"],
          ["URL", "Manzil", "/api/users/5"],
          ["Headers", "Qo'shimcha ma'lumot", "Content-Type, Authorization"],
          ["Body", "Yuborilayotgan ma'lumot", "{ \"name\": \"Ali\" }"],
        ]},
        { type: "h", text: "Javob tarkibi" },
        { type: "table", head: ["Qism", "Ma'nosi"], rows: [
          ["Status Code", "So'rov qanday tugadi (200, 404, 500)"],
          ["Headers", "Javob haqida ma'lumot"],
          ["Body", "Qaytarilgan ma'lumot (odatda JSON)"],
        ]},
        { type: "p", text: "Muhim xususiyat: HTTP — stateless (holatsiz). Ya'ni har so'rov mustaqil — server oldingi so'rovni 'eslamaydi'. Aynan shuning uchun cookie va sessiya kerak bo'ladi (keyingi darslarda)." },
        { type: "key", text: "HTTP — client va server muloqoti. So'rov (method+URL+headers+body) → Javob (status+headers+body). Stateless." },
      ],
    },

    {
      id: "l4-02-https",
      title: "HTTPS — xavfsiz HTTP",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "HTTPS — HTTP'ning shifrlangan, xavfsiz versiyasi. 'S' — Secure. Ma'lumot client va server o'rtasida shifrlanadi, shuning uchun oraliqda kimdir uni o'qiy olmaydi." },
        { type: "table", head: ["", "HTTP", "HTTPS"], rows: [
          ["Shifrlash", "Yo'q — ochiq matn", "Ha — TLS/SSL bilan"],
          ["Port", "80", "443"],
          ["Manzil", "http://", "https:// (qulf belgisi)"],
          ["Xavfsizlik", "Ma'lumotni o'qish/o'zgartirish mumkin", "Himoyalangan"],
        ]},
        { type: "h", text: "QA nima tekshiradi" },
        { type: "list", items: [
          "Sayt HTTPS ishlatadimi (manzil qatorida qulf bormi)?",
          "HTTP so'rovi avtomatik HTTPS'ga yo'naltiriladimi?",
          "Login, to'lov kabi maxfiy sahifalar albatta HTTPS'dami?",
          "Sertifikat amal qilyaptimi (muddati o'tmaganmi)?",
          "'Mixed content' ogohlantirishi yo'qmi (HTTPS sahifada HTTP resurs)?",
        ]},
        { type: "warn", text: "Login yoki to'lov sahifasi HTTP'da bo'lsa — bu jiddiy xavfsizlik bug'i (Critical severity). Parol ochiq matnda yuboriladi." },
        { type: "key", text: "HTTPS — shifrlangan HTTP (port 443). Maxfiy ma'lumotli sahifalar albatta HTTPS'da bo'lishi shart." },
      ],
    },

    {
      id: "l4-03-dns",
      title: "DNS — domen tizimi",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "DNS (Domain Name System) — internetning 'telefon kitobi'. U domen nomini (google.com) IP manzilga (142.250.x.x) aylantiradi. Kompyuterlar raqamlar bilan, odamlar nomlar bilan ishlaydi — DNS shu ikkisini bog'laydi." },
        { type: "h", text: "Qanday ishlaydi" },
        { type: "code", text: `Siz: "shop.uz" yozasiz
  ↓
DNS: "shop.uz" → 93.184.216.34 (IP manzil)
  ↓
Brauzer: 93.184.216.34 ga so'rov yuboradi` },
        { type: "h", text: "QA uchun nega muhim" },
        { type: "list", items: [
          "Sayt ochilmasa — DNS muammosi bo'lishi mumkin (server emas)",
          "Turli muhitlar (dev, staging, prod) turli DNS/domenda bo'ladi",
          "'Bu sayt topilmadi' xatosi ko'pincha DNS bilan bog'liq",
          "Subdomain'lar (api.shop.uz, admin.shop.uz) alohida sozlanadi",
        ]},
        { type: "tip", text: "Sayt ochilmasa, muammo DNS'da, serverdami yoki tarmoqdami — aniqlash uchun IP manzil bilan to'g'ridan-to'g'ri urinib ko'rish yoki boshqa qurilmadan sinash foydali." },
        { type: "key", text: "DNS — domen nomini IP manzilga aylantiradi. Sayt ochilmaslik ba'zan DNS muammosi (server emas)." },
      ],
    },

    {
      id: "l4-04-url",
      title: "URL tuzilishi",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "URL (Uniform Resource Locator) — resurs manzili. QA URL'ni o'qiy va tahlil qila olishi kerak — chunki ko'p bug URL parametrlarida yashiringan." },
        { type: "h", text: "URL qismlari" },
        { type: "code", text: `https://shop.uz:443/products/5?color=qora&size=M#reviews
  │       │      │   │          │                    │
  scheme  host   port path      query                fragment` },
        { type: "table", head: ["Qism", "Ma'nosi", "Misol"], rows: [
          ["Scheme", "Protokol", "https"],
          ["Host", "Domen", "shop.uz"],
          ["Port", "Ulanish nuqtasi (odatda yashirin)", "443"],
          ["Path", "Resurs yo'li", "/products/5"],
          ["Query", "Parametrlar (? bilan)", "?color=qora&size=M"],
          ["Fragment", "Sahifadagi joy (# bilan)", "#reviews"],
        ]},
        { type: "h", text: "QA uchun query parametrlari" },
        { type: "p", text: "Query parametrlari (?key=value) — filtr, saralash, pagination uchun ishlatiladi. QA ularni o'zgartirib test qiladi:" },
        { type: "example", text: "?page=5 → 5-sahifa. Sinang:\n• ?page=0 → nima bo'ladi?\n• ?page=-1 → yiqilmaydimi?\n• ?page=9999 → mavjud bo'lmagan sahifa?\n• ?page=abc → raqam o'rniga matn?\n\n?sort=price → narx bo'yicha. Sinang:\n• ?sort=xyz → mavjud bo'lmagan tartib?\n• ?sort= (bo'sh) → nima bo'ladi?" },
        { type: "tip", text: "URL parametrlarini to'g'ridan-to'g'ri o'zgartirish — kuchli test usuli. UI orqali bo'lmaydigan holatlarni sinash mumkin (masalan ruxsatsiz ID'ga kirish)." },
        { type: "key", text: "URL: scheme://host:port/path?query#fragment. Query parametrlarini o'zgartirib test qiling — ko'p bug shu yerda." },
      ],
    },

    {
      id: "l4-05-cookies",
      title: "Cookies",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Cookie — server brauzerda saqlaydigan kichik ma'lumot. HTTP stateless bo'lgani uchun, cookie yordamida server foydalanuvchini 'eslab qoladi' (masalan login holatini)." },
        { type: "h", text: "Cookie qanday ishlaydi" },
        { type: "code", text: `1. Siz login qilasiz
2. Server cookie yuboradi: sessionId=abc123
3. Brauzer cookie'ni saqlaydi
4. Har keyingi so'rovda brauzer cookie'ni qaytaradi
5. Server: "abc123 — bu Ali, u tizimga kirgan"` },
        { type: "h", text: "Cookie xususiyatlari (QA tekshiradi)" },
        { type: "table", head: ["Xususiyat", "Ma'nosi", "Nega muhim"], rows: [
          ["Expires / Max-Age", "Amal qilish muddati", "Muddat tugaganda login chiqib ketishi kerak"],
          ["Secure", "Faqat HTTPS'da yuboriladi", "Maxfiy cookie ochiq yuborilmasin"],
          ["HttpOnly", "JavaScript o'qiy olmaydi", "XSS hujumidan himoya"],
          ["SameSite", "Boshqa saytdan yuborilishini cheklaydi", "CSRF hujumidan himoya"],
        ]},
        { type: "h", text: "QA test g'oyalari" },
        { type: "list", items: [
          "Cookie o'chirilса login chiqib ketadimi?",
          "Cookie muddati tugaganda nima bo'ladi?",
          "Sessiya cookie'si Secure va HttpOnly'mi (DevTools → Application → Cookies)?",
          "Cookie'ni qo'lda o'zgartirsa nima bo'ladi (xavfsizlik)?",
        ]},
        { type: "key", text: "Cookie — server brauzerda saqlaydigan ma'lumot (masalan login holati). Secure va HttpOnly bayroqlarini tekshiring." },
      ],
    },

    {
      id: "l4-06-sessions",
      title: "Sessions — sessiyalar",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Session (sessiya) — foydalanuvchining tizim bilan bir davrdagi faoliyati. Login qilganda sessiya boshlanadi, chiqqanda yoki muddati tugaganda tugaydi." },
        { type: "h", text: "Cookie va Session bog'liqligi" },
        { type: "p", text: "Odatda sessiya server tomonda saqlanadi, cookie esa faqat sessiya ID'sini saqlaydi. Cookie — 'kalit', session — 'xona'." },
        { type: "code", text: `Cookie (brauzerda):  sessionId=abc123
Session (serverda):  abc123 → { user: "Ali", cart: [...], role: "admin" }` },
        { type: "h", text: "QA test g'oyalari" },
        { type: "table", head: ["Holat", "Nima tekshiriladi"], rows: [
          ["Session timeout", "Uzoq harakatsizlikdan keyin avtomatik chiqadimi?"],
          ["Concurrent login", "Bir hisobga ikki qurilmadan kirsa nima bo'ladi?"],
          ["Logout", "Chiqqandan keyin orqaga bosib qaytib kirsa bo'ladimi?"],
          ["Session fixation", "Login'dan oldingi sessiya ID login'dan keyin o'zgaradimi?"],
          ["Boshqa foydalanuvchi sessiyasi", "Boshqa sessionId bilan boshqa hisobga kirsa bo'ladimi?"],
        ]},
        { type: "warn", text: "Muhim xavfsizlik testi: logout qilgandan keyin brauzer 'orqaga' tugmasini bossa, himoyalangan sahifa KESH'dan ko'rinmasligi kerak. Ko'p saytda bu bug bor." },
        { type: "key", text: "Session — foydalanuvchining bir davrdagi faoliyati. Timeout, logout, concurrent login holatlarini test qiling." },
      ],
    },

    {
      id: "l4-07-local-storage",
      title: "Local Storage",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Local Storage — brauzerda ma'lumot saqlashning yana bir usuli. Cookie'dan farqli o'laroq, u serverga avtomatik yuborilmaydi va ko'proq joy beradi (~5-10 MB)." },
        { type: "table", head: ["", "Cookie", "Local Storage"], rows: [
          ["Hajmi", "~4 KB", "~5-10 MB"],
          ["Serverga yuboriladimi", "Ha, har so'rovda", "Yo'q — faqat brauzerda"],
          ["Muddati", "Belgilanadi", "Cheksiz (o'chirilmaguncha)"],
          ["Kim o'qiydi", "Server + JS", "Faqat JS"],
          ["Ishlatilishi", "Login, sessiya", "Sozlamalar, kesh, vaqtinchalik ma'lumot"],
        ]},
        { type: "h", text: "QA test g'oyalari" },
        { type: "list", items: [
          "Local Storage'da maxfiy ma'lumot (token, parol) saqlanyaptimi? — bu xavf",
          "Local Storage o'chirilsa ilova to'g'ri ishlaydimi?",
          "Ma'lumot to'g'ri saqlanyaptimi (DevTools → Application → Local Storage)?",
          "Chiqqandan keyin maxfiy ma'lumot tozalanadimi?",
        ]},
        { type: "warn", text: "Local Storage'da JWT token yoki maxfiy ma'lumot saqlash — xavfli, chunki JavaScript (va XSS hujumi) uni o'qiy oladi. QA buni tekshirishi kerak." },
        { type: "key", text: "Local Storage — brauzerda katta ma'lumot saqlaydi, serverga yuborilmaydi. Maxfiy ma'lumot saqlanmasligi kerak." },
      ],
    },

    {
      id: "l4-08-session-storage",
      title: "Session Storage",
      type: "theory",
      minutes: 6,
      body: [
        { type: "p", text: "Session Storage — Local Storage'ga o'xshaydi, lekin bitta farq bilan: ma'lumot faqat tab (oyna) ochiq turganicha saqlanadi. Tab yopilsa — ma'lumot o'chadi." },
        { type: "table", head: ["", "Local Storage", "Session Storage"], rows: [
          ["Qancha saqlanadi", "O'chirilmaguncha (doimiy)", "Tab yopilgunicha"],
          ["Tablar orasida", "Bo'lishiladi", "Har tab alohida"],
          ["Ishlatilishi", "Doimiy sozlamalar", "Vaqtinchalik ma'lumot (forma qoralamasi)"],
        ]},
        { type: "example", text: "Ko'p bosqichli forma to'ldiryapsiz. Session Storage'da vaqtinchalik saqlanadi. Yangi tabda o'sha sayt ochilsa — ma'lumot yo'q (har tab alohida). Tabni yopib qaytsangiz — ma'lumot yo'qolgan." },
        { type: "tip", text: "QA test: ko'p bosqichli formada ma'lumot qayerda saqlanishini tekshiring. Session Storage bo'lsa — tab yopilganda yo'qoladi, bu kutilgan bo'lishi kerak." },
        { type: "key", text: "Session Storage — faqat tab ochiq turgancha. Har tab alohida. Vaqtinchalik ma'lumot uchun." },
      ],
    },

    {
      id: "l4-09-cache",
      title: "Cache — kesh",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Cache (kesh) — tez-tez ishlatiladigan ma'lumotni tez joyda saqlash. Brauzer rasmlar, CSS, JS fayllarni keshlaydi — shunda sahifa ikkinchi marta tezroq ochiladi." },
        { type: "h", text: "Kesh turlari" },
        { type: "table", head: ["Tur", "Nima keshlaydi"], rows: [
          ["Brauzer kesh", "Rasm, CSS, JS, sahifalar"],
          ["CDN kesh", "Statik fayllar (serverga yaqin nusxa)"],
          ["Server kesh", "Ma'lumotlar bazasi natijalari"],
          ["API kesh", "So'rov javoblari"],
        ]},
        { type: "h", text: "QA uchun eng muhim muammo" },
        { type: "p", text: "Kesh eng ko'p ' soxta bug' manbai! Dasturchi o'zgarish qildi, lekin siz eski (keshlangan) versiyani ko'ryapsiz. 'Tuzatilmagan' deb bug yozasiz — aslida u tuzatilgan." },
        { type: "example", text: "Dasturchi tugma rangini ko'kdan yashilga o'zgartirdi. Siz sahifani ochdingiz — hali ham ko'k. 'Tuzatilmagan' deb bug yozdingiz.\n\nAslida: brauzer eski CSS'ni keshdan olgan. Hard refresh (Ctrl+Shift+R) qilsangiz — yashil ko'rinadi." },
        { type: "h", text: "Keshni tozalash usullari" },
        { type: "list", items: [
          "Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)",
          "Incognito / Private oyna — kesh yo'q",
          "DevTools → Network → 'Disable cache' belgilash",
          "Brauzer sozlamalaridan keshni tozalash",
        ]},
        { type: "warn", text: "OLTIN QOIDA: bug yozishdan oldin hard refresh yoki incognito'da tekshiring. 'Soxta bug'larning yarmisi keshdan kelib chiqadi." },
        { type: "key", text: "Cache — tez ma'lumot uchun. Lekin eski versiyani ko'rsatib 'soxta bug' beradi. Bug yozishdan oldin hard refresh qiling." },
      ],
    },

    {
      id: "l4-10-status-codes",
      title: "HTTP Status Codes",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Status kod — server har javobda qaytaradigan uch xonali raqam. U so'rov qanday tugaganini bildiradi. QA har API/network testda birinchi shuni tekshiradi." },
        { type: "h", text: "Guruhlar" },
        { type: "table", head: ["Guruh", "Ma'nosi"], rows: [
          ["1xx", "Ma'lumot (kam ishlatiladi)"],
          ["2xx", "Muvaffaqiyat ✅"],
          ["3xx", "Yo'naltirish (redirect)"],
          ["4xx", "Client xatosi (so'rovda muammo)"],
          ["5xx", "Server xatosi"],
        ]},
        { type: "h", text: "Eng muhim kodlar" },
        { type: "table", head: ["Kod", "Ma'nosi", "Qachon"], rows: [
          ["200 OK", "Muvaffaqiyat", "So'rov to'g'ri bajarildi"],
          ["201 Created", "Yaratildi", "POST bilan yangi resurs yaratilganda"],
          ["204 No Content", "Muvaffaqiyat, javob bo'sh", "DELETE dan keyin"],
          ["301 / 302", "Yo'naltirish", "URL boshqa joyga o'tkazilgan"],
          ["400 Bad Request", "So'rov noto'g'ri", "Yaroqsiz ma'lumot yuborilgan"],
          ["401 Unauthorized", "Autentifikatsiya yo'q", "Login qilinmagan"],
          ["403 Forbidden", "Ruxsat yo'q", "Login bor, lekin huquq yo'q"],
          ["404 Not Found", "Topilmadi", "Resurs mavjud emas"],
          ["409 Conflict", "Ziddiyat", "Masalan, email allaqachon band"],
          ["422 Unprocessable", "Validatsiya xatosi", "Format to'g'ri, lekin ma'lumot yaroqsiz"],
          ["500 Internal Error", "Server xatosi", "Serverda kutilmagan xato"],
          ["503 Unavailable", "Server ishlamayapti", "Server band yoki texnik ishlar"],
        ]},
        { type: "h", text: "401 va 403 farqi (ko'p so'raladi)" },
        { type: "example", text: "401 Unauthorized: 'Sen kimligingni bilmayman' — login qil.\n403 Forbidden: 'Sen kimligingni bilaman, lekin bu senga mumkin emas' — huquqing yo'q.\n\nMisol: Oddiy foydalanuvchi admin sahifasiga kirsa → 403 (login bor, lekin admin emas)." },
        { type: "warn", text: "500 xatosi — bu HAR DOIM bug. Server hech qachon foydalanuvchiga 500 ko'rsatmasligi kerak. Uni topsangiz — darrov yozing (odatda yuqori severity)." },
        { type: "key", text: "2xx=muvaffaqiyat, 3xx=redirect, 4xx=client xatosi, 5xx=server xatosi. 401=login yo'q, 403=huquq yo'q, 404=topilmadi, 500=server bug." },
      ],
    },

    {
      id: "l4-11-request-methods",
      title: "Request Methods",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "HTTP metodlari — so'rov qanday amalni bajarmoqchi ekanini bildiradi. Ular CRUD amallariga mos keladi." },
        { type: "table", head: ["Metod", "Amal", "CRUD", "Misol"], rows: [
          ["GET", "Ma'lumot olish", "Read", "GET /users/5 — 5-foydalanuvchini olish"],
          ["POST", "Yangi yaratish", "Create", "POST /users — yangi foydalanuvchi"],
          ["PUT", "To'liq yangilash", "Update", "PUT /users/5 — butun yozuvni almashtirish"],
          ["PATCH", "Qisman yangilash", "Update", "PATCH /users/5 — faqat bir maydon"],
          ["DELETE", "O'chirish", "Delete", "DELETE /users/5 — o'chirish"],
        ]},
        { type: "h", text: "Muhim xususiyatlar" },
        { type: "table", head: ["Xususiyat", "Ma'nosi", "Qaysi metod"], rows: [
          ["Safe", "Ma'lumotni o'zgartirmaydi", "GET"],
          ["Idempotent", "Bir necha marta = bir marta natija", "GET, PUT, DELETE"],
          ["O'zgartiradi", "Ma'lumotni o'zgartiradi", "POST, PUT, PATCH, DELETE"],
        ]},
        { type: "example", text: "Idempotent nima demak:\n\nDELETE /users/5 ni 3 marta chaqirsangiz — natija bir xil (5-foydalanuvchi o'chgan). Idempotent ✅\n\nPOST /users ni 3 marta chaqirsangiz — 3 ta yangi foydalanuvchi yaratiladi. Idempotent EMAS. Aynan shuning uchun 'ikki marta tez bosish' bug'i POST'da bo'ladi." },
        { type: "tip", text: "QA test: 'To'lash' yoki 'Yuborish' tugmasini tez ikki marta bosing. Agar POST idempotent qilinmagan bo'lsa — ikki buyurtma/ikki to'lov bo'ladi." },
        { type: "key", text: "GET=olish, POST=yaratish, PUT/PATCH=yangilash, DELETE=o'chirish. POST idempotent emas — ikki marta bosish bug'i shundan." },
      ],
    },

    {
      id: "l4-12-headers",
      title: "HTTP Headers",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Header — so'rov va javobga qo'shiladigan qo'shimcha ma'lumot (metadata). Ular ma'lumotning o'zi emas, balki u haqida ma'lumot beradi." },
        { type: "h", text: "Muhim so'rov (request) header'lari" },
        { type: "table", head: ["Header", "Ma'nosi"], rows: [
          ["Content-Type", "Yuborilayotgan ma'lumot turi (application/json)"],
          ["Authorization", "Autentifikatsiya ma'lumoti (token)"],
          ["Accept", "Client qanday javob turini kutadi"],
          ["User-Agent", "Qaysi brauzer/qurilma"],
          ["Cookie", "Saqlangan cookie'lar"],
        ]},
        { type: "h", text: "Muhim javob (response) header'lari" },
        { type: "table", head: ["Header", "Ma'nosi"], rows: [
          ["Content-Type", "Qaytarilayotgan ma'lumot turi"],
          ["Set-Cookie", "Brauzerga cookie o'rnatish"],
          ["Cache-Control", "Keshlash qoidalari"],
          ["Location", "Yo'naltirish manzili (redirect)"],
        ]},
        { type: "h", text: "Xavfsizlik header'lari (QA tekshiradi)" },
        { type: "list", items: [
          "Strict-Transport-Security — HTTPS majburiy",
          "X-Content-Type-Options — MIME turini majburlash",
          "X-Frame-Options — clickjacking himoyasi",
          "Content-Security-Policy — XSS himoyasi",
        ]},
        { type: "tip", text: "Header'larni DevTools → Network → so'rovni bosib → Headers bo'limida ko'rasiz. API testda Content-Type va Authorization eng muhim." },
        { type: "key", text: "Header — so'rov/javob haqida metadata. Content-Type va Authorization eng muhim. Xavfsizlik header'larini ham tekshiring." },
      ],
    },

    {
      id: "l4-13-json",
      title: "JSON",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "JSON (JavaScript Object Notation) — ma'lumot almashishning eng keng tarqalgan formati. API'lar deyarli har doim JSON qaytaradi. QA JSON'ni o'qiy va tahlil qila olishi shart." },
        { type: "h", text: "JSON tuzilishi" },
        { type: "code", text: `{
  "id": 5,
  "name": "Ali Karimov",
  "active": true,
  "age": 25,
  "email": null,
  "roles": ["user", "editor"],
  "address": {
    "city": "Toshkent",
    "zip": "100000"
  }
}` },
        { type: "h", text: "JSON ma'lumot turlari" },
        { type: "table", head: ["Tur", "Misol"], rows: [
          ["String (matn)", "\"Ali\" — qo'shtirnoq ichida"],
          ["Number (raqam)", "25, 3.14 — qo'shtirnoqsiz"],
          ["Boolean", "true / false"],
          ["Null", "null — qiymat yo'q"],
          ["Array (ro'yxat)", "[\"a\", \"b\"] — kvadrat qavs"],
          ["Object", "{ } — jingalak qavs"],
        ]},
        { type: "h", text: "QA nima tekshiradi" },
        { type: "list", items: [
          "Kutilgan maydonlar bormi (id, name...)?",
          "Ma'lumot turlari to'g'rimi? (age — raqammi yoki \"25\" matnmi?)",
          "Majburiy maydonlar bo'sh (null) emasmi?",
          "Qiymatlar to'g'rimi (ma'lumot bazasiga mos)?",
          "Ortiqcha yoki maxfiy ma'lumot qaytmayaptimi (parol hash'i)?",
        ]},
        { type: "warn", text: "Ko'p uchraydigan bug: raqam string sifatida qaytadi — \"25\" o'rniga 25 bo'lishi kerak. Bu keyinchalik saralash va hisob-kitobda muammo beradi." },
        { type: "key", text: "JSON — API ma'lumot formati. Maydonlar, turlar (matn/raqam/bool/null/massiv) va qiymatlar to'g'riligini tekshiring." },
      ],
    },

    {
      id: "l4-14-xml",
      title: "XML",
      type: "theory",
      minutes: 6,
      body: [
        { type: "p", text: "XML (eXtensible Markup Language) — JSON'dan oldingi ma'lumot formati. Hozir kamroq ishlatiladi, lekin eski tizimlar va ba'zi API'lar hali XML qaytaradi." },
        { type: "h", text: "XML va JSON solishtirish" },
        { type: "code", text: `<!-- XML -->
<user>
  <id>5</id>
  <name>Ali</name>
  <active>true</active>
</user>

// JSON (o'sha ma'lumot)
{
  "id": 5,
  "name": "Ali",
  "active": true
}` },
        { type: "table", head: ["", "XML", "JSON"], rows: [
          ["O'qish", "Og'irroq (teglar)", "Yengil"],
          ["Hajmi", "Kattaroq", "Kichikroq"],
          ["Ishlatilishi", "Eski tizimlar, SOAP", "Zamonaviy REST API"],
        ]},
        { type: "tip", text: "Junior QA sifatida asosan JSON bilan ishlaysiz. XML'ni tanish darajasida bilish yetarli — o'qiy olsangiz kifoya." },
        { type: "key", text: "XML — eski ma'lumot formati (teglar bilan). Hozir ko'proq JSON ishlatiladi. Tanish darajasida bilish yetarli." },
      ],
    },

    {
      id: "l4-15-authentication",
      title: "Authentication — autentifikatsiya",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Authentication (autentifikatsiya) — 'Sen kimsan?' degan savolga javob. Ya'ni foydalanuvchining kimligini tasdiqlash (login/parol, kod, biometrika)." },
        { type: "h", text: "Autentifikatsiya usullari" },
        { type: "table", head: ["Usul", "Izoh"], rows: [
          ["Login + parol", "Eng keng tarqalgan"],
          ["2FA / OTP", "Ikki bosqichli — parol + SMS/app kodi"],
          ["OAuth", "Boshqa xizmat orqali (Google, Facebook bilan kirish)"],
          ["Biometrika", "Barmoq izi, yuz"],
          ["Magic link", "Emailga havola yuboriladi"],
        ]},
        { type: "h", text: "QA test g'oyalari" },
        { type: "list", items: [
          "To'g'ri ma'lumot bilan kirish ishlaydimi?",
          "Noto'g'ri parol → tushunarli xato (lekin ortiqcha ma'lumotsiz)?",
          "Ko'p marta noto'g'ri urinish → hisob bloklanadimi?",
          "Parol yetarlicha murakkabmi (talab bormi)?",
          "Parol ochiq matnda saqlanmaydimi/yuborilmaydimi?",
          "Login qilmasdan himoyalangan sahifaga kirsa → 401?",
          "Sessiya muddati tugaganda qayta login so'raladimi?",
        ]},
        { type: "warn", text: "Xavfsizlik: 'Bu email ro'yxatda yo'q' vs 'Parol noto'g'ri' — bunday farqli xabar hujumchiga qaysi email mavjudligini oshkor qiladi. To'g'risi: 'Email yoki parol noto'g'ri' (umumiy)." },
        { type: "key", text: "Authentication — 'sen kimsan?' Login usullari, blok mexanizmi, xavfsizlik (umumiy xato xabari) ni test qiling." },
      ],
    },

    {
      id: "l4-16-authorization",
      title: "Authorization — avtorizatsiya",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Authorization (avtorizatsiya) — 'Senga nima mumkin?' degan savolga javob. Autentifikatsiyadan keyin keladi: kim ekaning aniqlandi, endi nimaga huquqing bor?" },
        { type: "h", text: "Authentication va Authorization farqi" },
        { type: "table", head: ["", "Authentication", "Authorization"], rows: [
          ["Savol", "Sen kimsan?", "Senga nima mumkin?"],
          ["Qachon", "Birinchi", "Ikkinchi (autentifikatsiyadan keyin)"],
          ["Misol", "Login qilish", "Admin sahifasiga kirish huquqi"],
          ["Xato kodi", "401 Unauthorized", "403 Forbidden"],
        ]},
        { type: "h", text: "Rollar (roles)" },
        { type: "p", text: "Ko'p tizimda foydalanuvchilar rollarga bo'linadi: admin, editor, oddiy foydalanuvchi, mehmon. Har rolning o'z huquqlari bor." },
        { type: "h", text: "QA test g'oyalari (juda muhim!)" },
        { type: "list", items: [
          "Oddiy foydalanuvchi admin sahifasiga URL orqali kira oladimi? (403 bo'lishi kerak)",
          "Foydalanuvchi boshqa foydalanuvchi ma'lumotini ko'ra oladimi? (/users/5 → /users/6)",
          "Login qilmasdan himoyalangan API'ga so'rov yuborsa? (401)",
          "Rolni o'zgartirsa (masalan token'da) tizim tekshiradimi?",
          "Tugma yashiringan, lekin API to'g'ridan-to'g'ri chaqirilса ishlaydimi?",
        ]},
        { type: "warn", text: "ENG MUHIM XAVFSIZLIK TESTI: UI'da tugma yashiringan bo'lsa ham, API to'g'ridan-to'g'ri chaqirilса ruxsat tekshirilishi shart. Ko'p tizimda 'faqat UI'da yashirish' — bu soxta himoya." },
        { type: "example", text: "Klassik bug (IDOR): Siz o'z profilingizni /users/5 da ko'rasiz. URL'ni /users/6 ga o'zgartirsangiz — boshqa odamning profili ochiladi. Bu jiddiy xavfsizlik bug'i (Critical)." },
        { type: "key", text: "Authorization — 'senga nima mumkin?' Rollarni, ruxsatsiz kirishni (URL/API orqali), IDOR bug'ini test qiling." },
      ],
    },

    {
      id: "l4-17-jwt",
      title: "JWT — token",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "JWT (JSON Web Token) — autentifikatsiyada keng ishlatiladigan token. Login qilganda server JWT beradi, keyin har so'rovda uni yuborasiz — server sizni tanib oladi." },
        { type: "h", text: "JWT tuzilishi — 3 qism" },
        { type: "code", text: `xxxxx.yyyyy.zzzzz
  │      │      │
Header  Payload  Signature

Header:    algoritm turi
Payload:   ma'lumot (user id, role, muddat)
Signature: imzo (o'zgartirilmaganini tasdiqlaydi)` },
        { type: "h", text: "Qanday ishlatiladi" },
        { type: "code", text: `1. Login → server JWT beradi
2. Brauzer tokenni saqlaydi
3. Har so'rovda header'da yuboriladi:
   Authorization: Bearer xxxxx.yyyyy.zzzzz
4. Server imzoni tekshiradi → foydalanuvchini taniydi` },
        { type: "h", text: "QA test g'oyalari" },
        { type: "list", items: [
          "Token muddati tugaganda so'rov rad etiladimi (401)?",
          "Token o'zgartirilsa (payload'da role: admin qilinsa) server rad etadimi?",
          "Tokensiz himoyalangan API'ga so'rov → 401?",
          "Logout'dan keyin eski token ishlaydimi? (ishlmasligi kerak)",
          "Token qayerda saqlanadi? (Local Storage — xavfli, httpOnly cookie — yaxshiroq)",
        ]},
        { type: "warn", text: "JWT payload'i SHIFRLANMAGAN — faqat kodlangan (base64). Ya'ni uni har kim o'qiy oladi. Shuning uchun JWT'da parol yoki maxfiy ma'lumot bo'lmasligi kerak. Imzo esa uni o'zgartirishga yo'l qo'ymaydi." },
        { type: "key", text: "JWT — login tokeni (Header.Payload.Signature). Muddat, o'zgartirish, tokensiz kirish va logout holatlarini test qiling." },
      ],
    },

    {
      id: "l4-18-rest-api",
      title: "REST API",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "REST API — client va server ma'lumot almashishning eng keng tarqalgan uslubi. Deyarli har zamonaviy ilova REST API ustiga qurilgan, shuning uchun QA uni yaxshi bilishi shart." },
        { type: "h", text: "REST asoslari" },
        { type: "p", text: "REST'da hamma narsa — resurs (users, products, orders). Har resurs URL'ga ega va HTTP metodlari bilan ular ustida amal bajariladi." },
        { type: "table", head: ["Metod + URL", "Amal"], rows: [
          ["GET /products", "Barcha mahsulotlar ro'yxati"],
          ["GET /products/5", "5-mahsulot"],
          ["POST /products", "Yangi mahsulot yaratish"],
          ["PUT /products/5", "5-mahsulotni yangilash"],
          ["DELETE /products/5", "5-mahsulotni o'chirish"],
        ]},
        { type: "h", text: "REST xususiyatlari" },
        { type: "list", items: [
          "Stateless — har so'rov mustaqil (server holatni saqlamaydi)",
          "Resurs asosli — URL resursni ko'rsatadi",
          "HTTP metodlari amalni bildiradi",
          "JSON — asosiy ma'lumot formati",
          "Status kodlar — natijani bildiradi",
        ]},
        { type: "h", text: "QA API test g'oyalari" },
        { type: "table", head: ["Test turi", "Nima tekshiriladi"], rows: [
          ["Status kod", "To'g'ri kod qaytdimi (200, 201, 404...)?"],
          ["Javob tuzilishi", "JSON to'g'ri, kutilgan maydonlar bormi?"],
          ["Ma'lumot to'g'riligi", "Qiymatlar bazaga mos keladimi?"],
          ["Negative", "Noto'g'ri so'rovga to'g'ri xato (400/404)?"],
          ["Auth", "Tokensiz → 401, huquqsiz → 403?"],
          ["Chegara", "Bo'sh, juda katta, noto'g'ri turdagi ma'lumot?"],
        ]},
        { type: "key", text: "REST API — resurslar + HTTP metodlari + JSON + status kodlar. QA status, tuzilma, ma'lumot to'g'riligi, negative va auth'ni test qiladi." },
      ],
    },

    {
      id: "l4-19-graphql",
      title: "GraphQL",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "GraphQL — REST'ga muqobil API uslubi. Asosiy farqi: client aynan qaysi ma'lumot kerakligini o'zi so'raydi (REST'da server nima bersa shuni olasiz)." },
        { type: "h", text: "REST va GraphQL farqi" },
        { type: "table", head: ["", "REST", "GraphQL"], rows: [
          ["Endpoint", "Ko'p (/users, /products)", "Bitta (/graphql)"],
          ["Ma'lumot", "Server belgilaydi", "Client so'raydi"],
          ["Ortiqcha ma'lumot", "Bo'lishi mumkin (over-fetching)", "Faqat kerakli"],
          ["Metod", "GET, POST, PUT...", "Asosan POST"],
        ]},
        { type: "example", text: "REST: GET /users/5 → butun foydalanuvchi obyekti (hamma maydon bilan).\n\nGraphQL: faqat ism va email so'rash mumkin:\nquery { user(id: 5) { name email } }\n→ faqat { name, email } qaytadi." },
        { type: "h", text: "QA uchun farqlar" },
        { type: "list", items: [
          "Status kod odatda 200 bo'ladi, hatto xato bo'lsa ham — xato javob body'sida bo'ladi",
          "Xatolarni 'errors' maydonida tekshirish kerak",
          "So'rovni o'zgartirib, ortiqcha ma'lumot so'rash mumkinmi (xavfsizlik)?",
        ]},
        { type: "tip", text: "Junior QA sifatida asosan REST bilan ishlaysiz. GraphQL'ni tanish darajasida bilish yetarli — farqini tushunsangiz kifoya." },
        { type: "key", text: "GraphQL — client kerakli ma'lumotni o'zi so'raydi (bitta endpoint). Xato 200 bilan ham keladi — 'errors' maydonini tekshiring." },
      ],
    },

    {
      id: "l4-20-websockets",
      title: "WebSockets",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "WebSocket — client va server o'rtasida DOIMIY, ikki tomonlama ulanish. HTTP'da har safar so'rov-javob bo'lsa, WebSocket'da ulanish ochiq turadi va ikki tomon istalgan vaqtda ma'lumot yuboradi." },
        { type: "h", text: "HTTP va WebSocket farqi" },
        { type: "table", head: ["", "HTTP", "WebSocket"], rows: [
          ["Ulanish", "Har so'rovda yangi", "Bir marta ochiladi, ochiq qoladi"],
          ["Yo'nalish", "Client so'raydi, server javob beradi", "Ikki tomon ham yuboradi"],
          ["Ishlatilishi", "Oddiy sahifalar", "Real-time: chat, bildirishnoma, jonli yangilanish"],
        ]},
        { type: "h", text: "Qayerda ishlatiladi" },
        { type: "list", items: [
          "Chat / xabar almashish",
          "Jonli bildirishnomalar",
          "Real-time yangilanish (narx, hisob)",
          "Online o'yinlar",
          "Hamkorlik (Google Docs kabi)",
        ]},
        { type: "h", text: "QA test g'oyalari" },
        { type: "list", items: [
          "Ma'lumot real-time yetib boradimi (kutish yo'q)?",
          "Ulanish uzilса qayta ulanadimi?",
          "Internet uzilib-ulanganda xabarlar yo'qolmaydimi?",
          "Ikki foydalanuvchi bir vaqtda — ikkalasi ham ko'radimi?",
        ]},
        { type: "key", text: "WebSocket — doimiy, ikki tomonlama ulanish (real-time uchun). Uzilish/qayta ulanish va ma'lumot yo'qolmasligini test qiling." },
      ],
    },

    /* ---------- PRACTICAL ---------- */
    {
      id: "l4-21-practical",
      title: "Amaliyot: DevTools bilan tahlil",
      type: "practical",
      minutes: 40,
      body: [
        { type: "p", text: "Bu bo'limda nazariyani DevTools'da amalda ko'rasiz: HTTP so'rovlar, status kodlar, cookie, JSON javoblar — hammasini o'z ko'zingiz bilan tekshirasiz." },
        { type: "p", text: "reqres.in — QA'lar API o'rganishi uchun bepul soxta API. Undan turli so'rovlar yuborib, status kodlar va JSON javoblarni tahlil qilasiz." },
        { type: "tip", text: "F12 → Network panelini ochib ishlang. Har so'rovni bosib, Headers, Payload va Response bo'limlarini o'rganing." },
      ],
      practical: {
        targetUrl: "https://reqres.in",
        targetName: "reqres.in",
        task: "reqres.in saytini oching va DevTools (Network) yordamida quyidagilarni tekshiring: (1) GET /api/users?page=1 → status kod va JSON tuzilishini yozing, (2) GET /api/users/23 (mavjud emas) → qaysi status kod qaytadi? (3) POST /api/register ni to'liq va parolsiz sinab, status kod farqini yozing. Har topilma uchun: URL, method, status kod, javob JSON'ining asosiy maydonlari.",
        steps: [
          "reqres.in ni oching, F12 → Network panelini oching",
          "Sahifadagi 'GET /api/users' misolini ishga tushiring va so'rovni Network'da toping",
          "So'rovni bosib: Status, Headers, Response (JSON) ni o'rganing",
          "URL'ni /api/users/23 ga o'zgartirib sinang — status kodni yozing",
          "POST /api/register ni to'liq body bilan (email + password) sinang",
          "Endi parolsiz (faqat email) yuboring — status kod va xato xabarini yozing",
          "Har so'rov uchun status kod nimani anglatishini izohlang",
        ],
        debrief:
          "Kutilgan natijalar:\n\n• GET /api/users?page=1 → 200 OK. JSON'da: page, per_page, total, data (foydalanuvchilar massivi). Har foydalanuvchida id, email, first_name, last_name.\n\n• GET /api/users/23 → 404 Not Found. Mavjud bo'lmagan resurs. JSON bo'sh yoki {}.\n\n• POST /api/register (to'liq) → 200 OK, javobda id va token.\n\n• POST /api/register (parolsiz) → 400 Bad Request, javobda {\"error\": \"Missing password\"}.\n\nAgar bularni to'g'ri kuzatgan bo'lsangiz — siz endi HTTP so'rovlarni, status kodlarni va JSON javoblarni o'qiy olasiz. Bu API testingga (Level 5) tayyorgarlik.",
      },
    },

    /* ---------- QUIZ ---------- */
    {
      id: "l4-22-quiz",
      title: "Yakuniy test: Web Fundamentals",
      type: "quiz",
      minutes: 12,
      body: [
        { type: "p", text: "Web asoslari — API va automation testingning poydevori. Quyidagi savollar bilan bilimingizni mustahkamlang." },
      ],
      quiz: [
        {
          id: "l4q1",
          q: "HTTP 'stateless' bo'lishi nimani anglatadi?",
          options: [
            "HTTP xavfsiz",
            "Har so'rov mustaqil — server oldingi so'rovni 'eslamaydi' (shuning uchun cookie/session kerak)",
            "HTTP sekin",
            "HTTP faqat GET ishlatadi",
          ],
          answer: 1,
          explain: "Stateless — server so'rovlar orasida holatni saqlamaydi. Foydalanuvchini 'eslab qolish' uchun cookie va sessiya ishlatiladi.",
        },
        {
          id: "l4q2",
          q: "404 va 500 status kodlari farqi?",
          options: [
            "Ular bir xil",
            "404 — resurs topilmadi (client tomoni); 500 — serverda xato",
            "404 — server xatosi; 500 — topilmadi",
            "Ikkalasi ham muvaffaqiyat",
          ],
          answer: 1,
          explain: "404 (4xx) — client tomonidagi muammo (resurs yo'q). 500 (5xx) — serverning o'z ichki xatosi. 500 har doim bug.",
        },
        {
          id: "l4q3",
          q: "401 va 403 farqi?",
          options: [
            "Ular bir xil",
            "401 — login qilinmagan (kimliging noma'lum); 403 — login bor, lekin huquq yo'q",
            "401 — server xatosi; 403 — topilmadi",
            "403 — muvaffaqiyat",
          ],
          answer: 1,
          explain: "401 Unauthorized — 'sen kimligingni bilmayman' (login qil). 403 Forbidden — 'seni bilaman, lekin bu senga mumkin emas' (huquq yo'q).",
        },
        {
          id: "l4q4",
          q: "Cookie va Local Storage o'rtasidagi asosiy farq?",
          options: [
            "Ular bir xil",
            "Cookie har so'rovda serverga yuboriladi; Local Storage faqat brauzerda qoladi",
            "Local Storage kichikroq",
            "Cookie faqat rasmlar uchun",
          ],
          answer: 1,
          explain: "Cookie har HTTP so'rovda avtomatik serverga yuboriladi (login uchun qulay). Local Storage serverga yuborilmaydi va ko'proq joy beradi (~5-10 MB).",
        },
        {
          id: "l4q5",
          q: "Bug yozishdan oldin nega hard refresh (Ctrl+Shift+R) qilish tavsiya etiladi?",
          options: [
            "Kompyuterni tezlashtirish uchun",
            "Kesh eski versiyani ko'rsatib 'soxta bug' berishi mumkin — hard refresh keshni chetlab o'tadi",
            "Internetni tekshirish uchun",
            "Hech qanday sabab yo'q",
          ],
          answer: 1,
          explain: "Brauzer keshi eski (o'zgartirilmagan) versiyani ko'rsatishi mumkin. 'Soxta bug'larning yarmisi shundan. Hard refresh yoki incognito bu muammoni hal qiladi.",
        },
        {
          id: "l4q6",
          q: "POST metodi idempotent emasligi qanday bug'ga sabab bo'ladi?",
          options: [
            "Sahifa ochilmaydi",
            "Tugmani ikki marta tez bosish — ikki buyurtma/ikki to'lov yaratiladi",
            "Rang o'zgaradi",
            "Hech qanday muammo",
          ],
          answer: 1,
          explain: "POST idempotent emas — har chaqiruv yangi resurs yaratadi. 'To'lash' tugmasini tez ikki marta bosish ikki buyurtmaga olib kelishi mumkin. Bu klassik bug.",
        },
        {
          id: "l4q7",
          q: "JSON'da eng ko'p uchraydigan QA bug'i qaysi?",
          options: [
            "JSON umuman kelmaydi",
            "Raqam string sifatida qaytadi (\"25\" o'rniga 25 bo'lishi kerak) — saralash/hisobda muammo",
            "JSON juda uzun",
            "JSON rangli",
          ],
          answer: 1,
          explain: "Raqamning string sifatida qaytishi — keng tarqalgan bug. Keyinchalik saralash (1,10,2,20) va hisob-kitobda muammo beradi.",
        },
        {
          id: "l4q8",
          q: "IDOR bug'i nima?",
          options: [
            "Sahifa sekin yuklanadi",
            "URL/ID'ni o'zgartirib boshqa foydalanuvchi ma'lumotiga kirish (masalan /users/5 → /users/6)",
            "Rang noto'g'ri",
            "Tugma ishlamaydi",
          ],
          answer: 1,
          explain: "IDOR (Insecure Direct Object Reference) — jiddiy xavfsizlik bug'i. Foydalanuvchi URL'dagi ID'ni o'zgartirib, ruxsatsiz boshqa ma'lumotga kiradi.",
        },
        {
          id: "l4q9",
          q: "Authentication va Authorization farqi?",
          options: [
            "Ular bir xil",
            "Authentication — 'sen kimsan?' (login); Authorization — 'senga nima mumkin?' (huquqlar)",
            "Authorization birinchi keladi",
            "Authentication — huquqlar haqida",
          ],
          answer: 1,
          explain: "Authentication ('sen kimsan') birinchi — kimligingni tasdiqlash. Authorization ('senga nima mumkin') ikkinchi — huquqlaringni tekshirish.",
        },
        {
          id: "l4q10",
          q: "JWT token haqida qaysi to'g'ri?",
          options: [
            "Payload shifrlangan, hech kim o'qiy olmaydi",
            "Payload faqat kodlangan (base64) — har kim o'qiy oladi, shuning uchun maxfiy ma'lumot bo'lmasligi kerak",
            "JWT parolni saqlaydi",
            "JWT hech qachon eskirmaydi",
          ],
          answer: 1,
          explain: "JWT payload'i shifrlanmagan, faqat base64 bilan kodlangan — uni har kim ochib o'qiy oladi. Imzo esa o'zgartirishga yo'l qo'ymaydi. Shuning uchun maxfiy ma'lumot saqlanmasligi kerak.",
        },
      ],
    },
  ],
};
