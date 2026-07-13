// data/challenges.ts
// Source of truth for MVP challenges. Product content is in Uzbek (latin).
// Each challenge points to a REAL, public practice target (linked, not rehosted).
//
// mentorHints = a 3-level "hint ladder". In Phase 1 these are shown statically,
// one at a time. In Phase 3 the AI mentor uses them + groundTruth as grounding.

export type Difficulty = "easy" | "medium" | "hard";
export type Domain =
  | "ecommerce"
  | "api"
  | "banking"
  | "forms"
  | "web";

export type TaskKind = "multi" | "single";

export interface TaskOption {
  id: string;
  text: string;      // Uzbek
  correct: boolean;
  explain: string;   // Uzbek — shown after submit
}

export interface Challenge {
  id: string;
  title: string;             // Uzbek
  domain: Domain;
  difficulty: Difficulty;
  points: number;
  targetUrl: string;         // real live practice site
  targetName: string;        // e.g. "SauceDemo"
  mission: string;           // Uzbek — what the user must do
  taskPrompt: string;        // Uzbek — the question
  taskKind: TaskKind;
  options: TaskOption[];
  mentorHints: [string, string, string]; // Uzbek — level 1..3 (soft -> strong)
  groundTruth: string;       // Uzbek — full explanation (mentor grounding; not shown until solved)
}

export const CHALLENGES: Challenge[] = [
  {
    id: "sd-problem-user",
    title: "SauceDemo: nosoz foydalanuvchi",
    domain: "ecommerce",
    difficulty: "easy",
    points: 20,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "SauceDemo demo do'koniga 'problem_user' hisobi bilan kiring (parol: secret_sauce). " +
      "Bu foydalanuvchi ataylab nosoz — mahsulotlar sahifasi va savatni sinchiklab test qiling. " +
      "Qaysi buglar borligini aniqlang.",
    taskPrompt: "problem_user hisobida qaysi bug'larni topdingiz?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Mahsulot rasmlari noto'g'ri / bir xil ko'rinadi", correct: true,
        explain: "problem_user'da barcha mahsulot rasmlari bir xil (buzuq) — bu ataylab qo'yilgan UI bug." },
      { id: "b", text: "Ba'zi 'Add to cart' tugmalari ishlamaydi yoki noto'g'ri ishlaydi", correct: true,
        explain: "problem_user'da savatga qo'shish tugmalari nomuvofiq ishlaydi." },
      { id: "c", text: "Ism (last name) maydoni checkout'da noto'g'ri qabul qilinadi", correct: true,
        explain: "Checkout formasida last name maydoni bilan bog'liq bug bor." },
      { id: "d", text: "Sayt umuman ochilmaydi", correct: false,
        explain: "Sayt normal ochiladi — bu bug emas." },
      { id: "e", text: "Login butunlay ishlamaydi", correct: false,
        explain: "problem_user muvaffaqiyatli login qiladi — muammo login'da emas, sahifa ichida." },
    ],
    mentorHints: [
      "Mahsulotlar sahifasidagi har bir mahsulotni alohida solishtiring — rasmlarga e'tibor bering.",
      "Har bir 'Add to cart' tugmasini bosib ko'ring va savat holatini kuzating. Hammasi bir xil ishlayaptimi?",
      "Checkout jarayonini oxirigacha bajaring va formadagi maydonlarni sinang — ayniqsa ism maydonlarini.",
    ],
    groundTruth:
      "problem_user — SauceDemo'ning ataylab nosoz hisobi. Asosiy buglar: (1) barcha mahsulot " +
      "rasmlari bir xil/buzuq (UI bug), (2) ba'zi Add-to-cart tugmalari noto'g'ri ishlaydi, " +
      "(3) checkout formasida ism maydoni bilan bog'liq muammo. Bu challenge kuzatuvchanlik va " +
      "tizimli test qilishni o'rgatadi.",
  },

  {
    id: "reqres-status",
    title: "reqres.in: status kodlar",
    domain: "api",
    difficulty: "easy",
    points: 15,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "reqres.in — bepul soxta REST API. Brauzer yoki Postman bilan quyidagi so'rovlarni yuboring va " +
      "javob status kodlarini tekshiring: GET /api/users/2 va GET /api/users/23. " +
      "Mavjud bo'lmagan foydalanuvchi qanday status qaytaradi?",
    taskPrompt: "GET /api/users/23 (mavjud bo'lmagan id) qanday status kod qaytaradi?",
    taskKind: "single",
    options: [
      { id: "a", text: "200 OK", correct: false,
        explain: "200 — muvaffaqiyat. Lekin foydalanuvchi topilmadi, demak bu emas." },
      { id: "b", text: "404 Not Found", correct: true,
        explain: "To'g'ri! Mavjud bo'lmagan resurs so'ralganda server 404 qaytaradi." },
      { id: "c", text: "500 Internal Server Error", correct: false,
        explain: "500 — serverning o'z ichki xatosi. Bu yerda server ishlayapti, faqat resurs yo'q." },
      { id: "d", text: "403 Forbidden", correct: false,
        explain: "403 — ruxsat yo'q. Bu holat resurs mavjudligiga aloqador emas." },
    ],
    mentorHints: [
      "Avval mavjud foydalanuvchini (id=2) so'rang va status kodni ko'ring — bu asos.",
      "Endi mavjud bo'lmagan id (23) ni so'rang. Status kod o'zgaradimi?",
      "HTTP 4xx guruhi client tomonidagi muammolar. 'Topilmadi' uchun aynan qaysi kod ishlatiladi?",
    ],
    groundTruth:
      "GET /api/users/2 → 200 OK (foydalanuvchi bor). GET /api/users/23 → 404 Not Found " +
      "(foydalanuvchi yo'q). 404 — so'ralgan resurs topilmaganini bildiradi. QA API testda " +
      "har doim status kodni birinchi navbatda tekshiradi.",
  },

  {
    id: "reqres-post-register",
    title: "reqres.in: ro'yxatdan o'tish validatsiyasi",
    domain: "api",
    difficulty: "medium",
    points: 30,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "POST /api/register endpointini test qiling. To'liq body (email + password) bilan va " +
      "parolsiz (faqat email) yuboring. Server parolsiz so'rovga qanday javob beradi?",
    taskPrompt: "Parolsiz (faqat email bilan) POST /api/register yuborilsa nima kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "400 status + xato xabari ('Missing password')", correct: true,
        explain: "To'g'ri! Majburiy maydon yo'qligida server 400 va tushunarli xato qaytarishi kerak." },
      { id: "b", text: "200 status + token", correct: false,
        explain: "Majburiy maydon yo'q bo'lsa muvaffaqiyat qaytarilmasligi kerak." },
      { id: "c", text: "500 server xatosi", correct: false,
        explain: "Validatsiya xatosi 500 emas, 4xx bo'lishi kerak." },
      { id: "d", text: "Hech qanday javob kelmaydi", correct: false,
        explain: "Server har doim javob qaytaradi." },
    ],
    mentorHints: [
      "Avval to'g'ri body bilan (email + password) yuboring — muvaffaqiyatli javobni ko'ring.",
      "Endi password'ni olib tashlab yuboring. Status kod va javob body'si o'zgaradimi?",
      "Majburiy maydon yo'qligi — client xatosi. 4xx guruhidan qaysi kod validatsiya uchun ishlatiladi?",
    ],
    groundTruth:
      "reqres.in registration faqat ma'lum foydalanuvchilar uchun ishlaydi va password majburiy. " +
      "Parolsiz so'rov 400 + {\"error\":\"Missing password\"} qaytaradi. QA negative testing — " +
      "majburiy maydonlar yo'qligini har doim sinash kerak.",
  },

  {
    id: "ae-ecommerce-flow",
    title: "AutomationExercise: xarid oqimi",
    domain: "ecommerce",
    difficulty: "medium",
    points: 30,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "automationexercise.com — real e-commerce demo. Mahsulotni savatga qo'shing, miqdorni " +
      "o'zgartiring va checkout'gacha boring. Savat va miqdor bilan bog'liq holatlarni test qiling. " +
      "Qaysi holatlar test qilinishi SHART?",
    taskPrompt: "Savat funksiyasi uchun eng muhim test holatlarini tanlang:",
    taskKind: "multi",
    options: [
      { id: "a", text: "Miqdorni 0 yoki manfiy qilib ko'rish", correct: true,
        explain: "Chegara holatlari — 0/manfiy miqdor bloklanishi kerak (BVA)." },
      { id: "b", text: "Bir mahsulotni bir necha marta qo'shib, miqdor to'g'ri yig'ilishini tekshirish", correct: true,
        explain: "Takroriy qo'shishда miqdor to'g'ri hisoblanishi kerak." },
      { id: "c", text: "Savatdagi jami narx to'g'ri hisoblanishini tekshirish", correct: true,
        explain: "Narx × miqdor = jami — hisob-kitob to'g'riligi kritik." },
      { id: "d", text: "Sayt logotipining rangini tekshirish", correct: false,
        explain: "Bu funksional savat testi emas — kontekstga mos emas." },
    ],
    mentorHints: [
      "Savat testida har doim chegara qiymatlarini o'ylang — eng kichik va eng katta miqdor.",
      "Bir mahsulotni ikki marta qo'shsangiz nima bo'ladi? Miqdor 2 bo'ladimi yoki 2 ta qator?",
      "Har o'zgarishda jami summani qo'lda hisoblab, ekрandagi bilan solishtiring.",
    ],
    groundTruth:
      "Savat uchun muhim testlar: chegara qiymatlari (0/manfiy/juda katta miqdor), takroriy qo'shishда " +
      "miqdor to'g'ri yig'ilishi, narx × miqdor hisobi, mahsulotni o'chirish. Bu Equivalence Partitioning " +
      "va Boundary Value texnikalarini amalda qo'llash.",
  },

  {
    id: "demoqa-forms",
    title: "DemoQA: forma validatsiyasi",
    domain: "forms",
    difficulty: "easy",
    points: 20,
    targetUrl: "https://demoqa.com/automation-practice-form",
    targetName: "DemoQA",
    mission:
      "DemoQA'ning 'Practice Form' sahifasini oching. Formani turli xil noto'g'ri ma'lumot bilan " +
      "to'ldirib yuborishga urinib ko'ring. Qaysi validatsiya muammolarini topdingiz?",
    taskPrompt: "Forma validatsiyasida nimalarni test qilish kerak?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Bo'sh majburiy maydonlar bilan yuborishga urinish", correct: true,
        explain: "Majburiy maydonlar bo'sh bo'lsa forma yuborilmasligi kerak." },
      { id: "b", text: "Noto'g'ri email formati (@ siz) kiritish", correct: true,
        explain: "Email formati validatsiyasi tekshirilishi kerak." },
      { id: "c", text: "Telefon raqamiga harf kiritish", correct: true,
        explain: "Raqam maydoniga harf qabul qilinmasligi kerak." },
      { id: "d", text: "Brauzer versiyasini tekshirish", correct: false,
        explain: "Bu forma validatsiyasiga aloqador emas." },
    ],
    mentorHints: [
      "Har doim eng oddiy negative testdan boshlang: bo'sh forma yuboring.",
      "Har bir maydonга mos kelmaydigan ma'lumot kiriting — email'ga matn, telefonга harf.",
      "Formа qaysi maydonlarни majburiy deb belgilaydi? Ularsiz yuborilsa nima bo'ladi?",
    ],
    groundTruth:
      "Forma testida: majburiy maydonlar (bo'sh yuborish), format validatsiyasi (email, telefon), " +
      "maydon turlari (raqam vs matn), chegara uzunliklari. Positive va negative testlarни birga qo'llang.",
  },
];
