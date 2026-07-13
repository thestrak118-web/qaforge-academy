// data/modules/level-5-api-testing.ts
//
// LEVEL 5 — API Testing
// 15 theory + 1 practical + 1 quiz = 17 sections

import type { Module } from "../lessons";

export const LEVEL_5: Module = {
  id: "api-testing",
  icon: "🔌",
  title: "Level 5 — API Testing",
  summary:
    "Postman bilan API test qilish: so'rovlar, assertion'lar, environment, token va avtomatlashtirish. QA bozorida eng talab qilinadigan ko'nikma.",
  level: "junior",
  sections: [
    {
      id: "l5-01-postman",
      title: "Postman bilan tanishuv",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Postman — API test qilish uchun eng mashhur asbob. U brauzer o'rniga to'g'ridan-to'g'ri serverga so'rov yuboradi va javobni ko'rsatadi." },
        { type: "h", text: "Nega API test kerak" },
        { type: "table", head: ["Sabab", "Izoh"], rows: [
          ["Tezroq", "UI orqali 5 daqiqa — API orqali 5 soniya"],
          ["Chuqurroq", "UI yashiradigan xatolarni topadi"],
          ["Erta", "Frontend tayyor bo'lmasdan ham test qilish mumkin"],
          ["Barqarorroq", "UI o'zgaraveradi, API kamroq o'zgaradi"],
          ["Xavfsizlik", "UI'ni chetlab o'tib, ruxsatlarni sinash mumkin"],
        ]},
        { type: "h", text: "Postman interfeysi" },
        { type: "list", items: [
          "Method — GET, POST, PUT, PATCH, DELETE tanlash",
          "URL — so'rov manzili",
          "Params — query parametrlari (?key=value)",
          "Authorization — token, API key",
          "Headers — Content-Type, Authorization va h.k.",
          "Body — yuboriladigan ma'lumot (JSON)",
          "Tests — avtomatik tekshiruvlar (JavaScript)",
          "Response — status kod, javob, vaqt, hajm",
        ]},
        { type: "tip", text: "Postman bepul. Yuklab oling (postman.com) yoki brauzer versiyasidan foydalaning. Bu — junior QA rezyumesidagi eng muhim asbob." },
        { type: "key", text: "Postman — API test asbobi. API test UI testdan tezroq, chuqurroq va barqarorroq." },
      ],
    },

    {
      id: "l5-02-collections",
      title: "Collections — to'plamlar",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Collection — bog'liq so'rovlarni bir joyga guruhlash. Masalan, 'User API' collection'ida barcha foydalanuvchi bilan bog'liq so'rovlar bo'ladi." },
        { type: "h", text: "Nega kerak" },
        { type: "list", items: [
          "Tartib — so'rovlar guruhlangan, topish oson",
          "Qayta ishlatish — bir marta yozib, doim ishlatasiz",
          "Bo'lishish — jamoa bilan almashish mumkin",
          "Avtomatlashtirish — butun collection'ni bir marta ishga tushirish (Collection Runner)",
          "Hujjat — collection API hujjatiga aylanadi",
        ]},
        { type: "h", text: "Tuzilma misoli" },
        { type: "code", text: `📁 Shop API
  📁 Auth
    POST /login
    POST /register
    POST /logout
  📁 Products
    GET  /products
    GET  /products/:id
    POST /products
  📁 Orders
    GET  /orders
    POST /orders` },
        { type: "tip", text: "Collection'ni papkalarga (folder) bo'ling — Auth, Products, Orders. Katta loyihada bu juda yordam beradi." },
        { type: "key", text: "Collection — so'rovlar to'plami. Tartib, qayta ishlatish, jamoa bilan bo'lishish va avtomatlashtirish uchun." },
      ],
    },

    {
      id: "l5-03-variables",
      title: "Variables — o'zgaruvchilar",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "O'zgaruvchi — qiymatni bir joyda saqlab, ko'p joyda ishlatish. Masalan, server manzilini har so'rovda qayta yozmasdan, {{baseUrl}} deb ishlatasiz." },
        { type: "h", text: "O'zgaruvchi turlari" },
        { type: "table", head: ["Tur", "Qamrovi", "Qachon"], rows: [
          ["Global", "Butun Postman", "Kam ishlatiladi"],
          ["Collection", "Bitta collection", "API kaliti, umumiy sozlama"],
          ["Environment", "Tanlangan muhit", "baseUrl, token — eng ko'p ishlatiladi"],
          ["Local", "Bitta so'rov", "Vaqtinchalik"],
        ]},
        { type: "h", text: "Qanday ishlatiladi" },
        { type: "code", text: `// O'zgaruvchi yaratish:
baseUrl = https://api.shop.uz
token   = eyJhbGci...

// So'rovda ishlatish:
GET {{baseUrl}}/products
Authorization: Bearer {{token}}` },
        { type: "example", text: "Muammо: 50 ta so'rovingiz bor, hammasida https://staging.shop.uz yozilgan. Endi production'da test qilish kerak → 50 ta so'rovni qo'lda o'zgartirasizmi?\n\nYechim: {{baseUrl}} ishlatasiz. Environment'ni almashtirasiz — 50 ta so'rov ham avtomatik yangi manzilga o'tadi." },
        { type: "key", text: "O'zgaruvchi — qiymatni bir joyda saqlash. {{baseUrl}}, {{token}} — eng ko'p ishlatiladiganlari." },
      ],
    },

    {
      id: "l5-04-environment",
      title: "Environment — muhitlar",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Environment — o'zgaruvchilar to'plami. Har muhit (dev, staging, production) uchun alohida environment yaratasiz va bir bosishda almashasiz." },
        { type: "h", text: "Odatiy muhitlar" },
        { type: "table", head: ["Muhit", "Nima uchun"], rows: [
          ["Local", "O'z kompyuteringizda ishlaydigan versiya"],
          ["Dev", "Dasturchilar muhiti — tez o'zgaradi"],
          ["Staging / QA", "Test muhiti — production'ga o'xshash"],
          ["Production", "Haqiqiy, foydalanuvchilar ishlatadigan"],
        ]},
        { type: "h", text: "Environment misoli" },
        { type: "code", text: `// STAGING environment
baseUrl = https://staging-api.shop.uz
apiKey  = test_key_123

// PRODUCTION environment
baseUrl = https://api.shop.uz
apiKey  = prod_key_xyz` },
        { type: "warn", text: "XAVFSIZLIK: Production environment'da test qilishda juda ehtiyot bo'ling! DELETE yoki POST so'rovi haqiqiy ma'lumotni o'chirishi/yaratishi mumkin. Odatda QA faqat staging'da ishlaydi." },
        { type: "tip", text: "Maxfiy qiymatlarni (parol, API kalit) 'secret' turida saqlang — shunda ular ekranda yashirinadi va bo'lishishda ketmaydi." },
        { type: "key", text: "Environment — muhitga xos o'zgaruvchilar. Bir bosishda dev/staging/prod'ga almashasiz. Production'da ehtiyot bo'ling." },
      ],
    },

    {
      id: "l5-05-get",
      title: "GET so'rovi",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "GET — ma'lumot olish uchun. Eng ko'p ishlatiladigan va eng xavfsiz metod (ma'lumotni o'zgartirmaydi)." },
        { type: "h", text: "GET so'rovi misollari" },
        { type: "code", text: `GET {{baseUrl}}/products
→ barcha mahsulotlar

GET {{baseUrl}}/products/5
→ 5-mahsulot

GET {{baseUrl}}/products?category=phone&page=2
→ filtrlangan, 2-sahifa` },
        { type: "h", text: "GET testda nima tekshiriladi" },
        { type: "table", head: ["Tekshiruv", "Kutilgan"], rows: [
          ["Status kod", "200 OK"],
          ["Javob tuzilmasi", "Kutilgan JSON maydonlar bor"],
          ["Ma'lumot to'g'riligi", "Qiymatlar bazaga mos"],
          ["Mavjud bo'lmagan ID", "404 Not Found"],
          ["Query parametrlari", "Filtr/pagination to'g'ri ishlaydi"],
          ["Javob vaqti", "Maqbul (masalan < 1s)"],
          ["Autentifikatsiya", "Tokensiz → 401"],
        ]},
        { type: "h", text: "Negative testlar" },
        { type: "list", items: [
          "GET /products/99999 → 404?",
          "GET /products/abc (raqam o'rniga matn) → 400?",
          "GET /products?page=-1 → xato yoki 1-sahifa?",
          "GET /products?page=abc → 400?",
          "Tokensiz so'rov → 401?",
        ]},
        { type: "key", text: "GET — ma'lumot olish. Status 200, JSON tuzilma, ma'lumot to'g'riligi, negative holatlar (404, 400, 401) tekshiriladi." },
      ],
    },

    {
      id: "l5-06-post",
      title: "POST so'rovi",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "POST — yangi resurs yaratish. Ma'lumot request body'da (odatda JSON) yuboriladi." },
        { type: "h", text: "POST so'rovi tuzilishi" },
        { type: "code", text: `POST {{baseUrl}}/users
Headers:
  Content-Type: application/json
  Authorization: Bearer {{token}}

Body (raw JSON):
{
  "name": "Ali Karimov",
  "email": "ali@mail.com",
  "role": "user"
}` },
        { type: "h", text: "Kutilgan javob" },
        { type: "table", head: ["Holat", "Status", "Javob"], rows: [
          ["Muvaffaqiyat", "201 Created", "Yaratilgan obyekt (id bilan)"],
          ["Validatsiya xatosi", "400 yoki 422", "Xato tavsifi"],
          ["Takroriy (email band)", "409 Conflict", "Xato xabari"],
          ["Tokensiz", "401", "Unauthorized"],
          ["Huquq yo'q", "403", "Forbidden"],
        ]},
        { type: "h", text: "POST negative testlari" },
        { type: "list", items: [
          "Majburiy maydonsiz (email yo'q) → 400?",
          "Noto'g'ri format (email: 'abc') → 400?",
          "Bo'sh body → 400?",
          "Takroriy email → 409?",
          "Juda uzun matn (10 000 belgi) → cheklov bormi?",
          "Ortiqcha maydon (role: 'admin') → e'tiborsiz qoldiriladimi yoki xato?",
          "SQL/XSS belgilar (', <script>) → xavfsiz ishlanadimi?",
        ]},
        { type: "warn", text: "MUHIM XAVFSIZLIK TESTI: POST body'ga 'role': 'admin' qo'shib ko'ring. Agar server buni qabul qilsa — oddiy foydalanuvchi o'zini admin qila oladi. Bu Critical bug (mass assignment)." },
        { type: "key", text: "POST — yaratish. 201 Created kutiladi. Negative: majburiy maydon, format, takroriy, ortiqcha maydon (role: admin!)." },
      ],
    },

    {
      id: "l5-07-put",
      title: "PUT so'rovi",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "PUT — resursni TO'LIQ yangilash. Ya'ni butun obyektni almashtiradi: yuborilmagan maydonlar o'chib ketishi mumkin." },
        { type: "code", text: `PUT {{baseUrl}}/users/5
Body:
{
  "name": "Ali Karimov",
  "email": "ali@mail.com",
  "role": "editor"
}
→ 5-foydalanuvchi BUTUNLAY shu ma'lumot bilan almashtiriladi` },
        { type: "h", text: "PUT testda nima tekshiriladi" },
        { type: "list", items: [
          "Status 200 (yangilandi) yoki 204 (javobsiz)",
          "Ma'lumot haqiqatan o'zgardimi (GET bilan tekshiring!)",
          "Yuborilmagan maydon nima bo'ldi (o'chdimi yoki qoldimi)?",
          "Mavjud bo'lmagan ID → 404?",
          "Idempotent: ikki marta yuborsangiz natija bir xilmi?",
          "Boshqa foydalanuvchi yozuvini yangilay olasizmi → 403?",
        ]},
        { type: "tip", text: "PUT'dan keyin ALBATTA GET qiling — o'zgarish haqiqatan saqlandimi? Ko'p API 200 qaytaradi, lekin aslida saqlamaydi. Bu klassik bug." },
        { type: "key", text: "PUT — to'liq yangilash (butun obyekt almashadi). Yangilangach GET bilan tekshiring. Idempotent." },
      ],
    },

    {
      id: "l5-08-patch",
      title: "PATCH so'rovi",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "PATCH — resursni QISMAN yangilash. Faqat yuborgan maydonlaringiz o'zgaradi, qolganlari tegilmaydi." },
        { type: "h", text: "PUT va PATCH farqi" },
        { type: "table", head: ["", "PUT", "PATCH"], rows: [
          ["Nima qiladi", "Butun obyektni almashtiradi", "Faqat berilgan maydonlarni yangilaydi"],
          ["Yuborilmagan maydon", "O'chishi mumkin", "O'zgarmaydi"],
          ["Body", "To'liq obyekt", "Faqat o'zgaradiganlar"],
        ]},
        { type: "example", text: "Mavjud: { name: 'Ali', email: 'ali@mail.com', role: 'user' }\n\nPATCH /users/5 → body: { role: 'editor' }\nNatija: { name: 'Ali', email: 'ali@mail.com', role: 'editor' } ✅\n(name va email o'zgarmadi)\n\nPUT /users/5 → body: { role: 'editor' }\nNatija: { role: 'editor' } — name va email O'CHDI! ⚠️" },
        { type: "warn", text: "Ko'p API PUT va PATCH'ni bir xil ishlatadi — bu bug. QA farqni tekshirishi kerak: PUT'da yuborilmagan maydon o'chadimi? PATCH'da saqlanadimi?" },
        { type: "key", text: "PATCH — qisman yangilash (faqat berilgan maydonlar). PUT — to'liq almashtirish. Farqni albatta test qiling." },
      ],
    },

    {
      id: "l5-09-delete",
      title: "DELETE so'rovi",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "DELETE — resursni o'chirish. Oddiy ko'rinadi, lekin ko'p muhim test holati bor." },
        { type: "code", text: `DELETE {{baseUrl}}/users/5
→ 5-foydalanuvchi o'chiriladi

Kutilgan status: 200 (javob bilan) yoki 204 (javobsiz)` },
        { type: "h", text: "DELETE testlari" },
        { type: "table", head: ["Test", "Kutilgan"], rows: [
          ["Mavjud resursni o'chirish", "200 / 204"],
          ["O'chirilgach GET qilish", "404 (endi yo'q)"],
          ["Ikki marta o'chirish", "Ikkinchisida 404 (idempotent)"],
          ["Mavjud bo'lmagan ID", "404"],
          ["Tokensiz", "401"],
          ["Boshqa foydalanuvchi resursi", "403"],
        ]},
        { type: "h", text: "Muhim nuqtalar" },
        { type: "list", items: [
          "Soft delete: yozuv bazada qoladi, faqat 'deleted' belgilanadi — bu holat tekshirilishi kerak",
          "Bog'liq ma'lumot: foydalanuvchi o'chsa, uning buyurtmalari nima bo'ladi?",
          "Tasdiqlash: UI'da 'Rostdan o'chirasizmi?' so'raladimi?",
          "Qaytarib bo'lmaydigan amal — ehtiyot bo'ling (ayniqsa production'da!)",
        ]},
        { type: "warn", text: "DELETE'ni HECH QACHON production'da tasodifiy sinamang. Faqat staging muhitida test qiling." },
        { type: "key", text: "DELETE — o'chirish (200/204). O'chirgach GET bilan tekshiring (404 bo'lishi kerak). Bog'liq ma'lumot va soft delete'ni unutmang." },
      ],
    },

    {
      id: "l5-10-assertions",
      title: "Assertions — avtomatik tekshiruvlar",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Assertion — javobni avtomatik tekshirish. Postman'ning 'Tests' bo'limida JavaScript bilan yoziladi. Bu API testni avtomatlashtirishning asosi." },
        { type: "h", text: "Eng ko'p ishlatiladigan assertion'lar" },
        { type: "code", text: `// Status kodni tekshirish
pm.test("Status 200", function () {
    pm.response.to.have.status(200);
});

// Javob vaqti
pm.test("Javob 1 soniyadan tez", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// JSON maydon mavjudligi
pm.test("id maydoni bor", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property('id');
});

// Qiymatni tekshirish
pm.test("Ism to'g'ri", function () {
    const json = pm.response.json();
    pm.expect(json.name).to.eql("Ali Karimov");
});

// Massiv bo'sh emasligi
pm.test("Ro'yxat bo'sh emas", function () {
    const json = pm.response.json();
    pm.expect(json.data).to.be.an('array').that.is.not.empty;
});` },
        { type: "h", text: "Har so'rovga qo'shish kerak bo'lgan minimum" },
        { type: "list", items: [
          "Status kod to'g'rimi",
          "Javob vaqti maqbulmi",
          "Kutilgan maydonlar bormi",
          "Ma'lumot turi to'g'rimi (raqam raqammi, string emasmi)",
        ]},
        { type: "tip", text: "Assertion yozish — API testni QAYTA ISHLATILADIGAN qiladi. Bir marta yozasiz, keyin har build'da avtomatik ishga tushadi." },
        { type: "key", text: "Assertion — javobni avtomatik tekshirish (Tests bo'limida). Status, vaqt, maydonlar, qiymatlar tekshiriladi." },
      ],
    },

    {
      id: "l5-11-response-validation",
      title: "Response Validation",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Javobni tekshirish — faqat status kod emas. Ma'lumot tuzilmasi, turlari va qiymatlari ham to'g'ri bo'lishi kerak." },
        { type: "h", text: "Tekshirish darajalari" },
        { type: "table", head: ["Daraja", "Nima tekshiriladi", "Misol"], rows: [
          ["Status", "So'rov qanday tugadi", "200, 201, 404"],
          ["Tuzilma (schema)", "Kutilgan maydonlar bormi", "id, name, email mavjudmi"],
          ["Ma'lumot turi", "Har maydon to'g'ri turdami", "id — raqam, name — matn"],
          ["Qiymat", "Ma'lumot to'g'rimi", "name === 'Ali'"],
          ["Biznes mantiq", "Mantiqan to'g'rimi", "Chegirma narxdan katta emasmi"],
        ]},
        { type: "h", text: "Ko'p uchraydigan bug'lar" },
        { type: "list", items: [
          "Raqam string sifatida qaytadi: \"25\" o'rniga 25 bo'lishi kerak",
          "Majburiy maydon null keladi",
          "Sana formati noto'g'ri yoki nomuvofiq",
          "Maxfiy ma'lumot qaytadi (parol hash'i, ichki ID)",
          "Bo'sh ro'yxat o'rniga null keladi",
          "Ortiqcha maydonlar (ichki tizim ma'lumoti)",
        ]},
        { type: "warn", text: "XAVFSIZLIK: javobda parol, token, ichki xato tafsiloti (stack trace) qaytmasligi kerak. Bu ma'lumot oshkor qilish (information disclosure) bug'i." },
        { type: "key", text: "Javobni 5 darajada tekshiring: status, tuzilma, turlar, qiymatlar, biznes mantiq. Maxfiy ma'lumot qaytmasligini ham." },
      ],
    },

    {
      id: "l5-12-authentication-api",
      title: "API Authentication",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Ko'p API himoyalangan — so'rov yuborish uchun kimligingizni tasdiqlashingiz kerak. Postman bir necha usulni qo'llab-quvvatlaydi." },
        { type: "h", text: "Autentifikatsiya usullari" },
        { type: "table", head: ["Usul", "Qanday ishlaydi"], rows: [
          ["No Auth", "Ochiq API — token kerak emas"],
          ["Bearer Token", "Header: Authorization: Bearer <token> — eng keng tarqalgan"],
          ["Basic Auth", "Login + parol base64'da kodlangan"],
          ["API Key", "Header yoki query'da kalit"],
          ["OAuth 2.0", "Murakkab — uchinchi tomon orqali"],
        ]},
        { type: "h", text: "Bearer Token — eng ko'p ishlatiladigan" },
        { type: "code", text: `1. Login so'rovi:
POST {{baseUrl}}/login
Body: { "email": "ali@mail.com", "password": "Test123!" }
→ Javob: { "token": "eyJhbGci..." }

2. Tokenni saqlash (Tests bo'limida):
const json = pm.response.json();
pm.environment.set("token", json.token);

3. Boshqa so'rovlarda ishlatish:
Authorization: Bearer {{token}}` },
        { type: "h", text: "Auth test g'oyalari" },
        { type: "list", items: [
          "Tokensiz so'rov → 401?",
          "Noto'g'ri token → 401?",
          "Muddati o'tgan token → 401?",
          "Boshqa foydalanuvchi tokeni bilan uning ma'lumotiga kirish → 403?",
          "Token'ni o'zgartirib (role: admin) yuborish → rad etiladimi?",
          "Logout'dan keyin eski token ishlaydimi? (ishlmasligi kerak)",
        ]},
        { type: "key", text: "Bearer Token eng keng tarqalgan. Login → token saqlash → har so'rovda yuborish. Tokensiz/noto'g'ri/eskirgan token holatlarini test qiling." },
      ],
    },

    {
      id: "l5-13-tokens",
      title: "Tokens bilan ishlash",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Tokenni har safar qo'lda nusxalash — vaqt yo'qotish. Postman'da uni avtomatik olish va saqlash mumkin." },
        { type: "h", text: "Avtomatik token olish" },
        { type: "code", text: `// Login so'rovining "Tests" bo'limida:
const json = pm.response.json();

pm.test("Token olindi", function () {
    pm.expect(json).to.have.property('token');
});

// Tokenni environment'ga saqlash
pm.environment.set("token", json.token);

// Endi boshqa so'rovlarda {{token}} avtomatik ishlaydi` },
        { type: "h", text: "Token turlari" },
        { type: "table", head: ["Tur", "Izoh"], rows: [
          ["Access Token", "Qisqa muddatli (15 daqiqa - 1 soat), har so'rovda yuboriladi"],
          ["Refresh Token", "Uzoq muddatli, yangi access token olish uchun"],
        ]},
        { type: "h", text: "Token test holatlari" },
        { type: "list", items: [
          "Access token muddati tugaganda 401 qaytadimi?",
          "Refresh token bilan yangi access token olish ishlaydimi?",
          "Refresh token ham eskirganda nima bo'ladi?",
          "Logout'da token bekor qilinadimi (blacklist)?",
          "Bir tokenni bir necha qurilmada ishlatish mumkinmi?",
        ]},
        { type: "tip", text: "Collection'ning 'Pre-request Script' bo'limiga token yangilash mantiqini qo'ysangiz, u har so'rovdan oldin avtomatik ishlaydi." },
        { type: "key", text: "Tokenni avtomatik saqlang (pm.environment.set). Access va Refresh token farqini, muddat va logout holatlarini test qiling." },
      ],
    },

    {
      id: "l5-14-newman",
      title: "Newman — CLI orqali ishga tushirish",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Newman — Postman collection'larini buyruq qatoridan (terminal) ishga tushirish asbobi. Bu CI/CD'ga ulash uchun zarur." },
        { type: "h", text: "Nega kerak" },
        { type: "list", items: [
          "Postman'ni ochmasdan testlarni ishga tushirish",
          "CI/CD'ga ulash (har build'da avtomatik test)",
          "Hisobot yaratish (HTML, JSON)",
          "Rejalashtirilgan ishga tushirish",
        ]},
        { type: "h", text: "Asosiy buyruqlar" },
        { type: "code", text: `# O'rnatish
npm install -g newman

# Collection'ni ishga tushirish
newman run my-collection.json

# Environment bilan
newman run my-collection.json -e staging-env.json

# HTML hisobot bilan
newman run my-collection.json -r html` },
        { type: "h", text: "CI/CD'da qanday ishlaydi" },
        { type: "code", text: `1. Dasturchi kod push qiladi
2. CI (masalan GitHub Actions) ishga tushadi
3. Ilova deploy qilinadi (staging)
4. Newman API testlarini ishga tushiradi
5. Test o'tmasa → deploy to'xtatiladi ❌
   Test o'tsa → davom etadi ✅` },
        { type: "tip", text: "Newman'ni bilish — junior QA rezyumesida katta plyus. Bu sizning 'avtomatlashtirish' tajribangizni ko'rsatadi." },
        { type: "key", text: "Newman — Postman collection'ini terminaldan ishga tushirish. CI/CD'ga ulash uchun zarur." },
      ],
    },

    {
      id: "l5-15-api-documentation",
      title: "API Documentation",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "API hujjati — API qanday ishlashini tushuntiruvchi qo'llanma. QA uchun bu — talab hujjati: nimani kutish va nimani test qilish kerakligini aytadi." },
        { type: "h", text: "Hujjatda nima bo'ladi" },
        { type: "table", head: ["Element", "Izoh"], rows: [
          ["Endpoint", "URL va metod (GET /users/:id)"],
          ["Parametrlar", "Query, path, body parametrlari"],
          ["Majburiy/ixtiyoriy", "Qaysi maydon shart"],
          ["Ma'lumot turlari", "id — integer, name — string"],
          ["Javob namunasi", "Muvaffaqiyatli JSON misoli"],
          ["Xato kodlari", "Qanday xatolar bo'lishi mumkin"],
          ["Autentifikatsiya", "Token kerakmi, qanday"],
        ]},
        { type: "h", text: "Mashhur hujjat formatlari" },
        { type: "list", items: [
          "Swagger / OpenAPI — eng keng tarqalgan, interaktiv",
          "Postman Documentation — collection'dan avtomatik",
          "Redoc — chiroyli, o'qish uchun qulay",
        ]},
        { type: "h", text: "QA hujjat bilan nima qiladi" },
        { type: "list", items: [
          "Test case'lar yozadi (har endpoint uchun)",
          "Hujjat va haqiqiy API mos kelishini tekshiradi (bu ham bug bo'lishi mumkin!)",
          "Majburiy maydonlarni aniqlaydi → negative test",
          "Xato kodlarini aniqlaydi → negative test",
        ]},
        { type: "warn", text: "Ko'p uchraydigan bug: hujjatda 'email majburiy' deyilgan, lekin API emailsiz ham qabul qilyapti. Yoki aksincha. Hujjat va API mosligini albatta tekshiring." },
        { type: "key", text: "API hujjati — QA uchun talab hujjati. Undan test case yoziladi. Hujjat va API mosligini ham tekshiring." },
      ],
    },

    /* ---------- PRACTICAL ---------- */
    {
      id: "l5-16-practical",
      title: "Amaliyot: Postman collection yarating",
      type: "practical",
      minutes: 60,
      body: [
        { type: "p", text: "Bu — Level 5'ning yakuniy amaliyoti. Siz haqiqiy API uchun to'liq Postman collection yaratasiz: so'rovlar, o'zgaruvchilar, environment va assertion'lar bilan." },
        { type: "p", text: "reqres.in — bepul test API. Unda GET, POST, PUT, DELETE, login — hammasi bor." },
        { type: "h", text: "Nimani qo'llaysiz" },
        { type: "list", items: [
          "Collection va papkalar yaratish",
          "Environment va o'zgaruvchilar ({{baseUrl}})",
          "GET, POST, PUT, PATCH, DELETE so'rovlari",
          "Assertion'lar (status, vaqt, JSON maydonlar)",
          "Token olish va avtomatik saqlash",
          "Negative testlar",
        ]},
        { type: "tip", text: "Yaratgan collection'ingizni eksport qilib saqlang (JSON). Bu — portfolio uchun ajoyib ish namunasi." },
      ],
      practical: {
        targetUrl: "https://reqres.in",
        targetName: "reqres.in API",
        task: "reqres.in uchun to'liq Postman collection yarating. Talab: (1) 'Reqres API' collection, ichida Users va Auth papkalari. (2) Environment: baseUrl = https://reqres.in. (3) Kamida 8 so'rov: GET users, GET single user, POST create, PUT update, PATCH update, DELETE, POST login (muvaffaqiyatli), POST login (parolsiz — negative). (4) HAR so'rovda kamida 2 ta assertion (status + biror maydon/vaqt). (5) Login so'rovida tokenni environment'ga avtomatik saqlash.",
        steps: [
          "Postman'ni oching, 'Reqres API' nomli collection yarating",
          "Environment yarating: baseUrl = https://reqres.in",
          "Users papkasida: GET {{baseUrl}}/api/users?page=2",
          "Assertion qo'shing: status 200, javob vaqti < 1000ms, data massivi bo'sh emas",
          "GET {{baseUrl}}/api/users/2 — status 200, id maydoni bor",
          "GET {{baseUrl}}/api/users/23 — negative test, status 404 kutiladi",
          "POST {{baseUrl}}/api/users — body bilan, status 201 kutiladi",
          "PUT va PATCH {{baseUrl}}/api/users/2 — status 200",
          "DELETE {{baseUrl}}/api/users/2 — status 204",
          "Auth papkasida: POST {{baseUrl}}/api/login — body: {\"email\":\"eve.holt@reqres.in\",\"password\":\"cityslicka\"}",
          "Login Tests bo'limida tokenni saqlang: pm.environment.set('token', pm.response.json().token)",
          "Negative: POST login parolsiz — status 400 va xato xabari kutiladi",
          "Collection'ni to'liq ishga tushiring (Run Collection) — hammasi yashil bo'lsinmi?",
          "Collection'ni JSON qilib eksport qiling va saqlang",
        ],
        debrief:
          "Kutilgan natijalar:\n\n• GET /api/users?page=2 → 200, data massivi (6 foydalanuvchi)\n• GET /api/users/2 → 200, data.id = 2\n• GET /api/users/23 → 404 (mavjud emas)\n• POST /api/users → 201, javobda id va createdAt\n• PUT /api/users/2 → 200, javobda updatedAt\n• PATCH /api/users/2 → 200\n• DELETE /api/users/2 → 204 (javob body'siz)\n• POST /api/login (to'liq) → 200, javobda token\n• POST /api/login (parolsiz) → 400, {\"error\": \"Missing password\"}\n\nO'ZINGIZNI TEKSHIRING:\n✅ Barcha so'rov {{baseUrl}} ishlatadimi (hardcode URL yo'qmi)?\n✅ Har so'rovda kamida 2 ta assertion bormi?\n✅ Token avtomatik saqlanyaptimi?\n✅ Negative testlar bormi (404, 400)?\n✅ Collection Runner'da hammasi yashilmi?\n\nAgar hammasi bajarilgan bo'lsa — sizda endi PORTFOLIO uchun yaroqli Postman collection bor. Uni GitHub'ga qo'ying va rezyumeda ko'rsating.",
      },
    },

    /* ---------- QUIZ ---------- */
    {
      id: "l5-17-quiz",
      title: "Yakuniy test: API Testing",
      type: "quiz",
      minutes: 12,
      body: [
        { type: "p", text: "API testing — junior QA bozorida eng talab qilinadigan ko'nikma. Bilimingizni sinang." },
      ],
      quiz: [
        {
          id: "l5q1",
          q: "Nega API test UI testdan afzalroq?",
          options: [
            "API test chiroyliroq",
            "Tezroq, chuqurroq, barqarorroq va frontend tayyor bo'lmasdan ham qilish mumkin",
            "API test oson",
            "UI test kerak emas",
          ],
          answer: 1,
          explain: "API test: tezroq (soniyalar), chuqurroq (UI yashiradigan xatolarni topadi), barqarorroq (API kamroq o'zgaradi) va erta boshlanadi.",
        },
        {
          id: "l5q2",
          q: "PUT va PATCH farqi?",
          options: [
            "Ular bir xil",
            "PUT — butun obyektni almashtiradi (yuborilmagan maydon o'chishi mumkin); PATCH — faqat berilgan maydonlarni yangilaydi",
            "PATCH o'chiradi",
            "PUT faqat GET bilan ishlaydi",
          ],
          answer: 1,
          explain: "PUT — to'liq almashtirish. PATCH — qisman yangilash. Ko'p API ularni bir xil ishlatadi — bu bug, QA farqni tekshirishi kerak.",
        },
        {
          id: "l5q3",
          q: "POST body'ga 'role': 'admin' qo'shib yuborsangiz va server qabul qilsa — bu nima?",
          options: [
            "Normal xatti-harakat",
            "Critical xavfsizlik bug'i (mass assignment) — oddiy foydalanuvchi o'zini admin qila oladi",
            "Kichik UI bug",
            "Hech qanday muammo yo'q",
          ],
          answer: 1,
          explain: "Mass assignment — jiddiy xavfsizlik bug'i. Server faqat ruxsat etilgan maydonlarni qabul qilishi kerak, role kabi maxfiy maydonlarni emas.",
        },
        {
          id: "l5q4",
          q: "Postman'da {{baseUrl}} nima uchun ishlatiladi?",
          options: [
            "Chiroyli ko'rinishi uchun",
            "Server manzilini bir joyda saqlash — environment almashtirilganda barcha so'rov avtomatik yangi manzilga o'tadi",
            "Tezlik uchun",
            "Xavfsizlik uchun",
          ],
          answer: 1,
          explain: "O'zgaruvchi ({{baseUrl}}) — 50 ta so'rovni qo'lda o'zgartirish o'rniga, environment'ni bir bosishda almashtirasiz (staging ↔ production).",
        },
        {
          id: "l5q5",
          q: "PUT so'rovidan keyin nega GET qilish tavsiya etiladi?",
          options: [
            "Vaqt o'tkazish uchun",
            "O'zgarish HAQIQATAN saqlanganini tekshirish uchun — ko'p API 200 qaytaradi, lekin aslida saqlamaydi",
            "Kerak emas",
            "Serverni qizdirish uchun",
          ],
          answer: 1,
          explain: "Klassik bug: API 200 OK qaytaradi, lekin ma'lumot aslida saqlanmagan. Yangilashdan keyin GET bilan tekshirish — majburiy odat.",
        },
        {
          id: "l5q6",
          q: "Assertion nima?",
          options: [
            "So'rov yuborish",
            "Javobni avtomatik tekshirish (status, vaqt, JSON maydonlar) — Postman'ning Tests bo'limida",
            "Token olish",
            "Environment yaratish",
          ],
          answer: 1,
          explain: "Assertion — avtomatik tekshiruv. Bir marta yozasiz, keyin har ishga tushirishda avtomatik bajariladi. API testni qayta ishlatiladigan qiladi.",
        },
        {
          id: "l5q7",
          q: "Newman nima uchun kerak?",
          options: [
            "Postman'ni chiroyli qilish",
            "Postman collection'larini terminaldan ishga tushirish — CI/CD'ga ulash uchun",
            "Token yaratish",
            "JSON o'qish",
          ],
          answer: 1,
          explain: "Newman — CLI asbob. CI/CD'da har build'dan keyin API testlarni avtomatik ishga tushirish uchun ishlatiladi.",
        },
        {
          id: "l5q8",
          q: "API javobida parol hash'i yoki stack trace qaytsa — bu nima?",
          options: [
            "Normal",
            "Information disclosure — ma'lumot oshkor qilish xavfsizlik bug'i",
            "Foydali ma'lumot",
            "Performance muammosi",
          ],
          answer: 1,
          explain: "Javobda maxfiy ma'lumot (parol, token, ichki xato tafsiloti) qaytmasligi kerak. Bu hujumchiga tizim haqida ma'lumot beradi.",
        },
        {
          id: "l5q9",
          q: "DELETE so'rovini ikki marta yuborsangiz nima bo'lishi kerak?",
          options: [
            "Ikki marta o'chadi",
            "Birinchisi 200/204, ikkinchisi 404 (resurs endi yo'q) — DELETE idempotent",
            "Xato",
            "Server yiqiladi",
          ],
          answer: 1,
          explain: "DELETE idempotent: birinchi chaqiruv o'chiradi, keyingilari 404 qaytaradi (yoki bir xil natija). Yakuniy holat o'zgarmaydi.",
        },
        {
          id: "l5q10",
          q: "API hujjati (Swagger) QA uchun nima?",
          options: [
            "Faqat dasturchilar uchun",
            "Talab hujjati — undan test case yoziladi. Hujjat va haqiqiy API mosligini ham tekshirish kerak",
            "Keraksiz",
            "Faqat dizayn uchun",
          ],
          answer: 1,
          explain: "API hujjati — QA uchun talab manbai. Undan test case yoziladi. Va hujjat bilan API mos kelmasligi ham bug (masalan hujjatda majburiy, API'da emas).",
        },
      ],
    },
  ],
};
