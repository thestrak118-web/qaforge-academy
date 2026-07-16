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
    id: "sd-login-status",
    title: "SauceDemo: standart login",
    domain: "ecommerce",
    difficulty: "easy",
    points: 15,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "SauceDemo saytiga standard_user (parol: secret_sauce) bilan kiring. Login jarayonini va undan " +
      "keyin ochiladigan mahsulotlar sahifasini kuzating.",
    taskPrompt: "standard_user muvaffaqiyatli login qilgandan so'ng qaysi sahifa ochiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Inventory (mahsulotlar) sahifasi", correct: true,
        explain: "To'g'ri! Muvaffaqiyatli login foydalanuvchini /inventory.html sahifasiga yo'naltiradi, u yerda barcha mahsulotlar ro'yxati ko'rinadi." },
      { id: "b", text: "Bo'sh oq sahifa", correct: false,
        explain: "standard_user uchun bunday xatolik yo'q — login muvaffaqiyatli bo'lsa mahsulotlar sahifasi ochiladi." },
      { id: "c", text: "Qayta login sahifasi", correct: false,
        explain: "To'g'ri login ma'lumotlari bilan foydalanuvchi login sahifasida qolmaydi." },
      { id: "d", text: "Xato xabari bilan login sahifasi", correct: false,
        explain: "standard_user — nosozliksiz hisob, xato xabari chiqmaydi." },
    ],
    mentorHints: [
      "Login formasiga to'g'ri ma'lumotlarni kiriting va 'Login' tugmasini bosing.",
      "URL manzili qanday o'zgarishini kuzating — sahifa nomi sizga javob beradi.",
      "Muvaffaqiyatli autentifikatsiyadan so'ng foydalanuvchi odatda asosiy funksional sahifaga yo'naltiriladi.",
    ],
    groundTruth:
      "standard_user + secret_sauce bilan login qilinganda SauceDemo foydalanuvchini /inventory.html " +
      "sahifasiga yo'naltiradi — bu yerda barcha mahsulotlar ro'yxati, narxlari va 'Add to cart' tugmalari " +
      "ko'rinadi. Bu — funksional testda 'positive path' (muvaffaqiyatli stsenariy) deb ataladi va har doim " +
      "birinchi tekshiriladigan holat.",
  },

  {
    id: "sd-locked-out",
    title: "SauceDemo: bloklangan foydalanuvchi",
    domain: "ecommerce",
    difficulty: "easy",
    points: 15,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "SauceDemo saytiga locked_out_user (parol: secret_sauce) bilan kirishga urinib ko'ring. Nima sodir " +
      "bo'lishini kuzating.",
    taskPrompt: "locked_out_user bilan login qilishga urinilganda nima sodir bo'ladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Login muvaffaqiyatli o'tadi", correct: false,
        explain: "locked_out_user ataylab bloklangan hisob — login muvaffaqiyatli bo'lmaydi." },
      { id: "b", text: "'Epic sadface' bilan boshlanuvchi xato xabari chiqadi va login bloklanadi", correct: true,
        explain: "To'g'ri! SauceDemo bu holatda 'Epic sadface: Sorry, this user has been locked out.' xabarini ko'rsatadi." },
      { id: "c", text: "Sahifa umuman yuklanmaydi", correct: false,
        explain: "Login sahifasi normal yuklanadi, faqat login amalga oshmaydi va xato xabari chiqadi." },
      { id: "d", text: "Parolni qayta kiritish so'raladi", correct: false,
        explain: "Tizim parol xato deb emas, foydalanuvchi bloklangani haqida aniq xabar beradi." },
    ],
    mentorHints: [
      "Login formasiga locked_out_user va secret_sauce'ni kiriting va natijani kuzating.",
      "Xato xabarining aniq matniga e'tibor bering — u nimani anglatadi?",
      "Bu — 'negative testing' namunasi: tizim bloklangan foydalanuvchini qanday aniq va tushunarli xabar bilan rad etishini tekshirish.",
    ],
    groundTruth:
      "locked_out_user — SauceDemo'da ataylab bloklangan hisob. Login urinishida 'Epic sadface: Sorry, this " +
      "user has been locked out.' xato xabari chiqadi va foydalanuvchi tizimga kira olmaydi. QA nuqtai " +
      "nazaridan bu — access control va xato xabarlarining aniqligini tekshiruvchi muhim negative test holati.",
  },

  {
    id: "sd-sort-menu",
    title: "SauceDemo: mahsulotlarni saralash",
    domain: "ecommerce",
    difficulty: "easy",
    points: 18,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "Mahsulotlar sahifasidagi saralash (sort) menyusidan foydalaning: 'Name (A to Z)', 'Name (Z to A)', " +
      "'Price (low to high)', 'Price (high to low)'. Har birini sinab ko'ring.",
    taskPrompt: "Saralash funksiyasini test qilishda qaysi holatlar muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Har bir saralash turi tanlanganda ro'yxat tartibi haqiqatan ham to'g'ri o'zgarishini tekshirish", correct: true,
        explain: "Bu saralashning asosiy maqsadi — natija haqiqatan ham to'g'ri tartiblanganini tasdiqlash kerak." },
      { id: "b", text: "Narx bo'yicha saralashda raqamlar to'g'ri (kichikdan kattaga yoki aksincha) ketma-ketlikda ekanini tekshirish", correct: true,
        explain: "Narxlarni qo'lda solishtirib, saralash algoritmi xato qilmaganini tasdiqlash muhim." },
      { id: "c", text: "Sahifani yangilagandan (refresh) keyin tanlangan saralash saqlanib qolishini tekshirish", correct: true,
        explain: "Bu holat ko'pincha e'tibordan chetda qoladi, lekin foydalanuvchi tajribasi uchun muhim edge case." },
      { id: "d", text: "Sayt logotipining shrift turini tekshirish", correct: false,
        explain: "Bu saralash funksionalligiga umuman aloqador emas." },
    ],
    mentorHints: [
      "Har bir saralash variantini birma-bir tanlab, ro'yxatdagi mahsulotlar tartibini diqqat bilan kuzating.",
      "Narxlarni qo'lda yozib oling va saralashdan keyingi tartib bilan solishtiring.",
      "Funksional testda faqat 'ishladi/ishlamadi' emas, balki natijaning haqiqatan TO'G'RI ekanini tekshirish kerak.",
    ],
    groundTruth:
      "Saralash (sort) funksiyasini test qilishda har bir variant natijasini qo'lda tekshirish kerak: " +
      "A-Z/Z-A alifbo tartibi va narx bo'yicha o'sish/kamayish. Bundan tashqari, sahifa yangilanganda " +
      "holatning saqlanishi kabi edge case'lar ham UI/UX testining bir qismi. Bu — funksional to'g'rilikni " +
      "tasdiqlash (assertion) texnikasi.",
  },

  {
    id: "sd-cart-badge",
    title: "SauceDemo: savat belgisi (badge)",
    domain: "ecommerce",
    difficulty: "easy",
    points: 16,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "Bir nechta mahsulotni savatga qo'shing va sahifa yuqori qismidagi savat belgisidagi (badge) raqamni " +
      "kuzating.",
    taskPrompt: "Savat belgisi (cart badge) qanday ishlashi kerak?",
    taskKind: "single",
    options: [
      { id: "a", text: "Savatga qo'shilgan mahsulotlar sonini aniq ko'rsatishi kerak", correct: true,
        explain: "To'g'ri! Badge — savatdagi umumiy mahsulot sonining vizual indikatori, u har bir 'Add to cart' bosilganda +1 oshishi kerak." },
      { id: "b", text: "Har doim '0' ko'rsatishi kerak", correct: false,
        explain: "Bu badge'ning maqsadiga zid — u real vaqtda savat holatini aks ettirishi kerak." },
      { id: "c", text: "Faqat sahifa yangilangandan keyin yangilanishi kerak", correct: false,
        explain: "Badge foydalanuvchi harakatiga darhol (real-time) reaksiya berishi kerak, sahifani yangilashni talab qilmasligi kerak." },
      { id: "d", text: "Faqat checkout sahifasida ko'rinishi kerak", correct: false,
        explain: "Badge butun sayt bo'ylab, har qanday sahifada ko'rinib turishi kerak." },
    ],
    mentorHints: [
      "Bir nechta mahsulotni ketma-ket savatga qo'shib, badge raqamini kuzating.",
      "Mahsulotni savatdan olib tashlaganda badge kamayadimi?",
      "UI indikatorlari (badge, counter) har doim real ma'lumot bilan sinxron bo'lishi kerak — bu muhim UI test printsipi.",
    ],
    groundTruth:
      "Cart badge — savatdagi mahsulotlar sonini real vaqtda ko'rsatuvchi UI elementi. Har bir 'Add to " +
      "cart' bosilganda +1, 'Remove' bosilganda -1 bo'lishi va sahifalar orasida holatini saqlab qolishi " +
      "kerak. Bu kabi kichik UI indikatorlar ko'pincha e'tibordan chetda qoladi, lekin ular foydalanuvchi " +
      "ishonchi uchun muhim.",
  },

  {
    id: "sd-checkout-required-fields",
    title: "SauceDemo: checkout majburiy maydonlar",
    domain: "ecommerce",
    difficulty: "medium",
    points: 28,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "Savatga mahsulot qo'shib, Checkout: Your Information sahifasiga o'ting. First Name, Last Name, " +
      "Zip/Postal Code maydonlarini bo'sh qoldirib 'Continue' tugmasini bosing.",
    taskPrompt: "Checkout formasidagi majburiy maydonlar bo'sh qoldirilsa nima sodir bo'lishi kerak?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Forma yuborilmasligi va aniq xato xabari chiqishi kerak (masalan, 'First Name is required')", correct: true,
        explain: "To'g'ri — majburiy maydon bo'sh bo'lsa, forma keyingi bosqichga o'tmasligi va foydalanuvchiga aniq sabab ko'rsatilishi kerak." },
      { id: "b", text: "Xato xabari qaysi aniq maydon bo'sh ekanini ko'rsatishi kerak", correct: true,
        explain: "Yaxshi UX uchun xato xabari umumiy emas, balki aniq maydonga ishora qilishi kerak." },
      { id: "c", text: "Har uchala maydon (First Name, Last Name, Zip) alohida-alohida tekshirilishi kerak", correct: true,
        explain: "Har bir maydon o'zining validatsiyasiga ega bo'lishi va mustaqil tekshirilishi kerak — bu Equivalence Partitioning'ning bir qismi." },
      { id: "d", text: "Forma bo'sh maydonlar bilan ham keyingi bosqichga o'tishi kerak", correct: false,
        explain: "Bu validatsiya buzilishini anglatadi — majburiy maydonlar bo'sh bo'lsa forma o'tmasligi kerak." },
    ],
    mentorHints: [
      "Checkout formasini bo'sh holatda 'Continue' tugmasi bilan yuboring va nima chiqishini ko'ring.",
      "Endi faqat bitta maydonni to'ldirib, qolganlarini bo'sh qoldiring — xato xabari o'zgaradimi?",
      "Har bir majburiy maydonni alohida-alohida sinab, xato xabari har doim to'g'ri maydonga ishora qilishini tekshiring.",
    ],
    groundTruth:
      "SauceDemo checkout formasida First Name, Last Name va Zip/Postal Code majburiy. Har biri bo'sh " +
      "qoldirilganda forma yuborilmaydi va 'Error: [Maydon nomi] is required' turidagi aniq xato xabari " +
      "chiqadi. Bu klassik forma validatsiya testi — har bir majburiy maydonni alohida-alohida (bo'sh " +
      "holatda) sinash kerak.",
  },

  {
    id: "sd-checkout-postal-code",
    title: "SauceDemo: pochta indeksi maydoni",
    domain: "ecommerce",
    difficulty: "medium",
    points: 25,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "Checkout: Your Information sahifasidagi Zip/Postal Code maydoniga turli formatdagi qiymatlar " +
      "kiriting: faqat raqamlar, harflar, bo'sh qiymat.",
    taskPrompt: "Zip/Postal Code maydoni uchun eng to'g'ri test yondashuvi qaysi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Maydon qiymati bo'sh emasligini tekshirish yetarli, format cheklovi kerak emas", correct: false,
        explain: "Faqat 'bo'sh emas' tekshiruvi yetarli emas — real dunyoda pochta indekslari turli formatda bo'ladi va bu holatlar ham hisobga olinishi kerak." },
      { id: "b", text: "Maydon istalgan matnni (raqam, harf, belgilar) qabul qilishini va faqat bo'sh bo'lmasligini tekshirish, chunki bu real forma xatti-harakati", correct: true,
        explain: "To'g'ri — SauceDemo'ning bu maydoni faqat 'bo'sh emasligini' tekshiradi, format bo'yicha cheklov yo'q. QA vazifasi — real xatti-harakatni aniq hujjatlashtirish va bu yetarlimi yoki yo'qligini baholash." },
      { id: "c", text: "Faqat 5 xonali raqam qabul qilinishini tekshirish", correct: false,
        explain: "Bu taxmin — haqiqiy xatti-harakatni tekshirmasdan aniq format talab qilinadi deb faraz qilib bo'lmaydi." },
      { id: "d", text: "Bu maydonni umuman test qilish shart emas", correct: false,
        explain: "Har qanday forma maydoni, ayniqsa checkout kabi kritik oqimda, test qilinishi shart." },
    ],
    mentorHints: [
      "Zip maydoniga turli qiymatlar kiriting: '12345', 'abcde', '!!!', bitta belgi.",
      "Har bir holatda forma keyingi bosqichga o'tadimi yoki xato beradimi — kuzating.",
      "Haqiqiy xatti-harakatni kuzatmasdan turib format haqida xulosa chiqarmang — bu QA'da muhim printsip: taxmin qilmang, tekshiring.",
    ],
    groundTruth:
      "SauceDemo'ning Zip/Postal Code maydoni haqiqatda faqat bo'sh emasligini tekshiradi — u istalgan " +
      "matnni (raqam, harf, maxsus belgi) qabul qiladi, real pochta indeksi formatini validatsiya " +
      "qilmaydi. Bu — 'kam validatsiya' (under-validation) muammosiga misol va QA hisobotida alohida qayd " +
      "etilishi kerak bo'lgan kuzatish.",
  },

  {
    id: "sd-remove-cart-item",
    title: "SauceDemo: savatdan mahsulot olib tashlash",
    domain: "ecommerce",
    difficulty: "medium",
    points: 27,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "Bir nechta mahsulotni savatga qo'shing, so'ng ham mahsulotlar sahifasidan, ham savat sahifasidan " +
      "mahsulot olib tashlab ko'ring.",
    taskPrompt: "Savatdan mahsulot olib tashlash funksiyasi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Mahsulotlar sahifasidagi 'Remove' tugmasi bosilganda ham badge, ham savat ro'yxati yangilanishi", correct: true,
        explain: "Ikkala joydan ham mahsulotni olib tashlash imkoniyati bor va ular sinxron ishlashi kerak." },
      { id: "b", text: "Savat sahifasidagi 'Remove' tugmasi bosilganda mahsulot ro'yxatdan chiqib, badge kamayishi", correct: true,
        explain: "Savat sahifasidan olib tashlash ham to'g'ri sinxronlashishi kerak." },
      { id: "c", text: "Savatdagi barcha mahsulotlarni olib tashlagandan keyin badge butunlay yo'qolishi (0 ko'rsatmasligi)", correct: true,
        explain: "SauceDemo'da savat bo'sh bo'lganda badge umuman ko'rinmay ketadi — bu kutilgan xatti-harakat va tekshirilishi kerak." },
      { id: "d", text: "Mahsulotni olib tashlagandan keyin sahifani majburan yangilash (refresh) kerakligini tekshirish", correct: false,
        explain: "Yaxshi ilova holatni avtomatik, sahifani yangilamasdan yangilashi kerak — bu talab qilinmasligi lozim." },
    ],
    mentorHints: [
      "Mahsulotlar sahifasidan 2-3 ta mahsulot qo'shing, so'ng ulardan birini xuddi shu sahifadan olib tashlang.",
      "Endi savat sahifasiga o'ting va qolgan mahsulotni u yerdan olib tashlang — badge holatini kuzating.",
      "Savat butunlay bo'shaganda badge ikonkasi qanday ko'rinishini alohida tekshiring.",
    ],
    groundTruth:
      "Mahsulot olib tashlash funksiyasi ikki joydan (mahsulotlar sahifasi va savat sahifasi) ishlaydi va " +
      "ikkalasi ham badge son bilan sinxron bo'lishi kerak. Savat bo'sh bo'lganda badge ikonkasi umuman " +
      "ko'rsatilmaydi. Bu — state sinxronizatsiyasini turli UI nuqtalaridan tekshirish zarurligini " +
      "ko'rsatadigan test holati.",
  },

  {
    id: "sd-performance-glitch-user",
    title: "SauceDemo: performance_glitch_user",
    domain: "ecommerce",
    difficulty: "medium",
    points: 30,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "performance_glitch_user (parol: secret_sauce) bilan login qiling va sahifalar orasida " +
      "harakatlanish tezligini kuzating.",
    taskPrompt: "performance_glitch_user bilan ishlashda qanday non-funksional (performance) muammo kuzatiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Login va sahifa yuklanishi sezilarli darajada sekinlashadi", correct: true,
        explain: "To'g'ri — bu hisob ataylab sun'iy kechikish (delay) bilan yaratilgan, funksionallik ishlaydi, lekin sekin." },
      { id: "b", text: "Funksionallik butunlay ishlamay qoladi", correct: false,
        explain: "Funksiyalar ishlaydi, faqat sekin — bu performance muammosi, funksional buzilish emas." },
      { id: "c", text: "Sahifa ranglari o'zgaradi", correct: false,
        explain: "Bu vizual emas, tezlik (performance) bilan bog'liq muammo." },
      { id: "d", text: "Mahsulotlar ro'yxati bo'sh ko'rinadi", correct: false,
        explain: "Mahsulotlar ro'yxati to'liq ko'rinadi, faqat yuklanish sekinroq bo'ladi." },
    ],
    mentorHints: [
      "performance_glitch_user bilan login qilishga urinib ko'ring va vaqtni hisoblang (masalan, sekundomer bilan).",
      "Buni standard_user bilan solishtiring — farq sezilarlimi?",
      "Bu — funksional emas, performance (unumdorlik) testiga misol: 'ishlaydi' va 'yaxshi ishlaydi' o'rtasidagi farqni tekshirish.",
    ],
    groundTruth:
      "performance_glitch_user — SauceDemo'da ataylab sun'iy kechikish (delay) qo'shilgan hisob. Login va " +
      "sahifalar orasidagi o'tish sezilarli darajada sekinlashadi, lekin funksionallik o'zi buzilmaydi. Bu " +
      "QA'ga faqat 'to'g'ri ishlayaptimi' emas, balki 'qanchalik tez ishlayapti' degan performance testing " +
      "tushunchasini o'rgatadi.",
  },

  {
    id: "sd-problem-user-bugs",
    title: "SauceDemo: problem_user buglarini aniqlash",
    domain: "ecommerce",
    difficulty: "hard",
    points: 45,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "problem_user (parol: secret_sauce) bilan kiring. Bu hisob ataylab nosoz — mahsulotlar sahifasi va " +
      "savatni sinchiklab tekshiring.",
    taskPrompt: "problem_user hisobida qaysi buglarni aniqladingiz?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Barcha mahsulot rasmlari bir xil (yoki noto'g'ri) ko'rsatiladi", correct: true,
        explain: "problem_user'da mahsulot rasmlari almashtirilgan/bir xil — bu ataylab qo'yilgan vizual bug." },
      { id: "b", text: "'Add to cart' tugmalarining ba'zilari kutilganidek ishlamaydi", correct: true,
        explain: "Ba'zi mahsulotlarda savatga qo'shish xatti-harakati nomuvofiq." },
      { id: "c", text: "Saralash (sort) funksiyasi ba'zan noto'g'ri natija beradi", correct: true,
        explain: "problem_user'da saralash mantig'ida ham nomuvofiqliklar kuzatiladi." },
      { id: "d", text: "Login umuman amalga oshmaydi", correct: false,
        explain: "problem_user muvaffaqiyatli login qiladi, muammolar login'dan keyingi sahifalarda." },
      { id: "e", text: "Sayt boshqa tilga avtomatik o'giriladi", correct: false,
        explain: "Bunday xatti-harakat mavjud emas — bu chalg'ituvchi variant." },
    ],
    mentorHints: [
      "Mahsulotlar sahifasidagi har bir mahsulot rasmini diqqat bilan solishtiring.",
      "Har bir 'Add to cart' tugmasini alohida-alohida bosib, natijani kuzating.",
      "Saralash menyusidan foydalanib, natija haqiqatan to'g'ri tartiblanganini tekshiring — nomuvofiqlik bormi?",
    ],
    groundTruth:
      "problem_user — SauceDemo'ning ataylab ko'p nosozlikka ega hisobi. Asosiy kuzatiladigan muammolar: " +
      "barcha mahsulot rasmlari bir xil/noto'g'ri, ba'zi 'Add to cart' tugmalari nomuvofiq ishlaydi, va " +
      "saralash natijalarida xatoliklar uchraydi. Bu challenge kuzatuvchanlik va tizimli exploratory " +
      "testing ko'nikmasini o'rgatadi — aniq mission berilmagan holatda mustaqil bug topish.",
  },

  {
    id: "sd-back-button-cache",
    title: "SauceDemo: logout va orqaga qaytish",
    domain: "ecommerce",
    difficulty: "hard",
    points: 42,
    targetUrl: "https://www.saucedemo.com",
    targetName: "SauceDemo",
    mission:
      "standard_user bilan login qiling, mahsulotlar sahifasini ko'ring, so'ng 'Logout' qiling. Shundan " +
      "so'ng brauzerning 'Orqaga' (Back) tugmasini bosing.",
    taskPrompt: "Logout qilgandan so'ng brauzer 'Back' tugmasi bosilganda nima kutilishi kerak (yaxshi xavfsizlik amaliyoti nuqtai nazaridan)?",
    taskKind: "single",
    options: [
      { id: "a", text: "Login sahifasiga qaytarilishi yoki qayta autentifikatsiya talab qilinishi kerak, kesh orqali eski sahifa ko'rsatilmasligi kerak", correct: true,
        explain: "To'g'ri — xavfsiz ilova logout'dan keyin himoyalangan sahifalarni keshdan ko'rsatmasligi, foydalanuvchini qayta login qilishga yo'naltirishi kerak." },
      { id: "b", text: "Foydalanuvchi hech qanday to'siqsiz mahsulotlar sahifasini ko'rishi kerak", correct: false,
        explain: "Bu xavfsizlik nuqtai nazaridan noto'g'ri — logout qilingan sessiya himoyalangan ma'lumotlarni ko'rsatmasligi kerak." },
      { id: "c", text: "Brauzer albatta xato sahifasini ko'rsatishi kerak", correct: false,
        explain: "Xato sahifasi emas, balki login sahifasiga yo'naltirish yoki qayta autentifikatsiya talabi to'g'ri xatti-harakat." },
      { id: "d", text: "Bu holatni test qilishning hojati yo'q", correct: false,
        explain: "Aksincha — session/logout xavfsizligi web ilovalarda eng muhim test yo'nalishlaridan biri." },
    ],
    mentorHints: [
      "Login qiling, ichki sahifada bo'ling, so'ng logout qiling.",
      "Brauzerning 'Orqaga' tugmasini bosing va qaysi sahifa ko'rinishini kuzating — bu keshdan olingan eski sahifami?",
      "Xavfsiz ilovalar himoyalangan sahifalarni brauzer keshida saqlashiga yo'l qo'ymasligi kerak (cache-control sarlavhalari) — logout'dan keyin bu qanday ta'minlanishi kerakligini o'ylab ko'ring.",
    ],
    groundTruth:
      "Logout va brauzer 'Back' tugmasi o'rtasidagi o'zaro ta'sir — session/xavfsizlik testining klassik " +
      "holati. Yaxshi ilova logout qilingandan keyin himoyalangan sahifalarni brauzer keshidan " +
      "ko'rsatishga yo'l qo'ymasligi, foydalanuvchini qayta autentifikatsiyaga yo'naltirishi kerak. Bu " +
      "Cache-Control sarlavhalari va session boshqaruvi bilan bog'liq muhim xavfsizlik-yo'naltirilgan QA " +
      "test holati.",
  },

  {
    id: "dq-practice-form-required",
    title: "DemoQA: majburiy maydonlar",
    domain: "forms",
    difficulty: "easy",
    points: 18,
    targetUrl: "https://demoqa.com/automation-practice-form",
    targetName: "DemoQA",
    mission:
      "Practice Form sahifasini oching va formani to'liq bo'sh holda 'Submit' qilishga urinib ko'ring.",
    taskPrompt: "Bo'sh forma yuborilganda qaysi maydonlar majburiy ekanini bildiruvchi belgi (qizil ramka) chiqadi?",
    taskKind: "multi",
    options: [
      { id: "a", text: "First Name va Last Name", correct: true,
        explain: "Bu ikkala maydon majburiy — bo'sh qoldirilsa qizil ramka bilan belgilanadi." },
      { id: "b", text: "Gender (jins) tanlovi", correct: true,
        explain: "Gender radio tugmalaridan biri tanlanishi shart, aks holda maydon qizil bilan ajratiladi." },
      { id: "c", text: "Mobile Number", correct: true,
        explain: "Telefon raqami maydoni ham majburiy va bo'sh qoldirilsa xato ko'rsatiladi." },
      { id: "d", text: "State va City", correct: false,
        explain: "Bu maydonlar formani submit qilish uchun majburiy emas — forma ularsiz ham yuboriladi." },
    ],
    mentorHints: [
      "Formani hech narsa kiritmasdan pastdagi 'Submit' tugmasini bosing.",
      "Qaysi maydonlar qizil ramka bilan ajralib turishiga e'tibor bering.",
      "Majburiy maydonlarni HTML5 'required' atributi yoki JS validatsiyasi orqali aniqlash mumkin — vizual belgilarga tayaning.",
    ],
    groundTruth:
      "DemoQA Practice Form'da First Name, Last Name, Gender va Mobile Number majburiy maydonlar " +
      "hisoblanadi — ular bo'sh qoldirilganda qizil ramka bilan belgilanadi va forma yuborilmaydi. " +
      "State/City kabi maydonlar esa ixtiyoriy. Bu — forma majburiy maydonlarini aniqlash uchun standart " +
      "negative test yondashuvi.",
  },

  {
    id: "dq-practice-form-mobile",
    title: "DemoQA: telefon raqami validatsiyasi",
    domain: "forms",
    difficulty: "easy",
    points: 17,
    targetUrl: "https://demoqa.com/automation-practice-form",
    targetName: "DemoQA",
    mission:
      "Practice Form'dagi Mobile Number maydoniga turli uzunlikdagi raqamlar kiriting: 5 xonali, 10 " +
      "xonali, 15 xonali.",
    taskPrompt: "Mobile Number maydoni to'g'ri deb qabul qilishi uchun qancha xonali raqam kerak?",
    taskKind: "single",
    options: [
      { id: "a", text: "Aynan 10 ta raqam", correct: true,
        explain: "To'g'ri — maydon faqat 10 xonali raqamni to'g'ri (valid) deb qabul qiladi, kam yoki ko'p bo'lsa qizil ramka bilan xato ko'rsatadi." },
      { id: "b", text: "Istalgan uzunlikdagi raqam", correct: false,
        explain: "Maydon uzunlikni cheklaydi — istalgan son qabul qilinmaydi." },
      { id: "c", text: "Faqat 7 ta raqam", correct: false,
        explain: "Bu noto'g'ri — talab qilinadigan aniq uzunlik 10 ta." },
      { id: "d", text: "Raqam umuman tekshirilmaydi", correct: false,
        explain: "Maydon aniq validatsiyaga ega — uzunlik va faqat raqam ekanligi tekshiriladi." },
    ],
    mentorHints: [
      "Mobile Number maydoniga avval 5 ta raqam kiriting va Submit qiling — natijani kuzating.",
      "Endi 10 ta raqam kiriting — qizil ramka yo'qoladimi?",
      "Chegara qiymatlarini sinang: 9, 10, 11 ta raqam — bu Boundary Value Analysis texnikasi.",
    ],
    groundTruth:
      "DemoQA Practice Form'dagi Mobile Number maydoni faqat aynan 10 xonali raqamni to'g'ri (valid) deb " +
      "hisoblaydi. Kam yoki ortiq raqam kiritilsa maydon qizil ramka bilan ajralib, forma yuborilmaydi. Bu " +
      "— Boundary Value Analysis (chegara qiymatlarini tekshirish: 9, 10, 11 xona) texnikasini amalda " +
      "qo'llashga misol.",
  },

  {
    id: "dq-web-tables-search",
    title: "DemoQA: Web Tables qidiruv va CRUD",
    domain: "web",
    difficulty: "easy",
    points: 20,
    targetUrl: "https://demoqa.com/webtables",
    targetName: "DemoQA",
    mission:
      "Web Tables sahifasida yangi qator (record) qo'shing, uni tahrirlang, so'ng qidiruv maydonidan " +
      "foydalanib toping.",
    taskPrompt: "Web Tables funksionalligi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Yangi qator qo'shilgandan keyin u jadvalda darhol ko'rinishi", correct: true,
        explain: "Create (Add) amalidan keyin ma'lumot jadvalda aks etishi kerak — bu CRUD'ning 'Create' qismi." },
      { id: "b", text: "Qatorni tahrirlagandan keyin yangi ma'lumot saqlanib, eski ma'lumot o'chishi", correct: true,
        explain: "Update amali to'g'ri ishlashi va eski qiymat qolib ketmasligi kerak." },
      { id: "c", text: "Qidiruv maydoniga ism yozilganda faqat mos keluvchi qatorlar ko'rinishi", correct: true,
        explain: "Qidiruv (search/filter) funksiyasi jadvalni real vaqtda filtrlashi kerak." },
      { id: "d", text: "Jadval doim aynan 10 ta qator ko'rsatishi shart", correct: false,
        explain: "Qatorlar soni foydalanuvchi qo'shgan/o'chirgan ma'lumotlarga bog'liq, qat'iy 10 ta emas." },
    ],
    mentorHints: [
      "'Add' tugmasi orqali yangi foydalanuvchi qo'shing va jadvalda paydo bo'lishini kuzating.",
      "Qo'shilgan qatorni 'Edit' qilib, bir maydonni o'zgartiring — saqlangandan keyin natijani tekshiring.",
      "Qidiruv maydoniga ism yoki email qismini yozib, filtrlash to'g'ri ishlayotganini ko'ring.",
    ],
    groundTruth:
      "Web Tables — CRUD (Create, Read, Update, Delete) operatsiyalarini test qilish uchun klassik sahifa. " +
      "Yangi qator qo'shish, mavjudini tahrirlash, o'chirish va qidiruv/filtrlash funksiyalarining har biri " +
      "alohida test qilinishi kerak. Bu — ma'lumotlar bilan ishlovchi har qanday jadval komponentini test " +
      "qilishning umumiy metodikasi.",
  },

  {
    id: "dq-practice-form-modal",
    title: "DemoQA: forma submit va tasdiqlash modali",
    domain: "forms",
    difficulty: "medium",
    points: 28,
    targetUrl: "https://demoqa.com/automation-practice-form",
    targetName: "DemoQA",
    mission:
      "Practice Form'ni to'liq va to'g'ri ma'lumotlar bilan to'ldiring (ism, familiya, sana, telefon va " +
      "h.k.) va 'Submit' qiling.",
    taskPrompt: "Forma muvaffaqiyatli yuborilgandan keyin ochilgan modal oynada nima tekshirilishi kerak?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Modal jadvalidagi har bir qiymat foydalanuvchi kiritgan ma'lumot bilan aynan mos kelishi", correct: true,
        explain: "Bu — ma'lumot yaxlitligini (data integrity) tekshirish, kiritilgan va ko'rsatilgan ma'lumot bir xil bo'lishi shart." },
      { id: "b", text: "Modal oyna to'g'ri sarlavha ('Thanks for submitting the form') bilan ochilishi", correct: true,
        explain: "UI elementlarining to'g'ri matn/sarlavhaga ega ekanini tekshirish ham QA vazifasi." },
      { id: "c", text: "Modalni yopish (Close) tugmasi ishlashi va foydalanuvchini formaga qaytarishi", correct: true,
        explain: "Modal oynaning barcha interaktiv elementlari (shu jumladan yopish tugmasi) ishlashi tekshirilishi kerak." },
      { id: "d", text: "Modal oynadagi shrift o'lchamini piksellarda o'lchash", correct: false,
        explain: "Bu darajadagi vizual detal odatda funksional testda emas, dizayn/tasdiqlash bosqichida tekshiriladi." },
    ],
    mentorHints: [
      "Formani to'liq to'ldirib, har bir maydonga aniq qiymat kiriting (masalan, ismni yozib qo'ying).",
      "Submit qilgandan so'ng ochilgan jadvaldagi qiymatlarni kiritgan ma'lumotlaringiz bilan solishtiring.",
      "Modal oynani yopib, forma holati (kiritilgan ma'lumotlar) saqlanib qoladimi yoki tozalanadimi — tekshiring.",
    ],
    groundTruth:
      "Practice Form muvaffaqiyatli yuborilgandan so'ng modal oynada barcha kiritilgan ma'lumotlar jadval " +
      "ko'rinishida ko'rsatiladi. QA vazifasi — bu ma'lumotlarning foydalanuvchi kiritgani bilan aynan mos " +
      "kelishini tasdiqlash (data integrity), shuningdek modalning UI elementlari (sarlavha, yopish " +
      "tugmasi) to'g'ri ishlashini tekshirish.",
  },

  {
    id: "dq-select-menu",
    title: "DemoQA: Select Menu widget'lari",
    domain: "web",
    difficulty: "medium",
    points: 26,
    targetUrl: "https://demoqa.com/select-menu",
    targetName: "DemoQA",
    mission:
      "Select Menu sahifasidagi turli xil tanlov elementlarini (oddiy dropdown, ko'p tanlovli/multi-select) " +
      "sinab ko'ring.",
    taskPrompt: "Multi-select (bir nechta qiymat tanlash mumkin bo'lgan) dropdown uchun eng muhim test qanday?",
    taskKind: "single",
    options: [
      { id: "a", text: "Bir nechta qiymatni bir vaqtda tanlash mumkinligini va barchasi saqlanib qolishini tekshirish", correct: true,
        explain: "To'g'ri — multi-select'ning asosiy vazifasi bir nechta qiymatni bir vaqtda ushlab turish, shuni tasdiqlash kerak." },
      { id: "b", text: "Faqat bitta qiymat tanlanishini tekshirish", correct: false,
        explain: "Bu single-select uchun to'g'ri, lekin multi-select maxsus bir nechta qiymatni qo'llab-quvvatlashi kerak." },
      { id: "c", text: "Dropdown rangini tekshirish", correct: false,
        explain: "Bu funksional testga aloqador emas." },
      { id: "d", text: "Dropdown har doim yopiq holda boshlanishini tekshirish yetarli", correct: false,
        explain: "Bu faqat boshlang'ich holat, asosiy funksionallik — ko'p tanlov qobiliyati tekshirilmagan." },
    ],
    mentorHints: [
      "Multi-select dropdown'ni oching va bir nechta qiymatni ketma-ket tanlang.",
      "Tanlangan barcha qiymatlar ro'yxatda saqlanib qolayaptimi yoki oxirgisi qolib, avvalgilari o'chib ketyaptimi?",
      "Bitta qiymatni olib tashlashga (deselect) urinib ko'ring — qolganlari saqlanib qoladimi?",
    ],
    groundTruth:
      "Multi-select dropdown komponentini test qilishda asosiy e'tibor — bir nechta qiymatni bir vaqtda " +
      "tanlash, ularni saqlab qolish va istalgan birini alohida olib tashlash imkoniyatiga qaratilishi " +
      "kerak. Bu oddiy (single) dropdown'dan farqli murakkabroq komponent bo'lib, alohida test strategiyasini " +
      "talab qiladi.",
  },

  {
    id: "dq-date-picker",
    title: "DemoQA: Date Picker widget",
    domain: "forms",
    difficulty: "medium",
    points: 25,
    targetUrl: "https://demoqa.com/date-picker",
    targetName: "DemoQA",
    mission:
      "Date Picker sahifasidagi sana tanlash maydonini oching. Kalendardan sana tanlang, so'ngra maydonga " +
      "qo'lda matn kiritishga urinib ko'ring.",
    taskPrompt: "Date Picker widget'ini test qilishda qaysi holatlar muhim?",
    taskKind: "single",
    options: [
      { id: "a", text: "Kalendardan tanlangan sana maydonda to'g'ri formatda ko'rsatilishini va oy/yil o'zgartirish tugmalari to'g'ri ishlashini tekshirish", correct: true,
        explain: "To'g'ri — bu widget'ning asosiy funksionalligi: tanlash, ko'rsatish formati va navigatsiya." },
      { id: "b", text: "Faqat bugungi sanani tanlash mumkinligini tekshirish yetarli", correct: false,
        explain: "Foydalanuvchi istalgan sanani (o'tmish yoki kelajak) tanlashi mumkin bo'lgan holatlar ham tekshirilishi kerak." },
      { id: "c", text: "Widget rangini tekshirish yetarli", correct: false,
        explain: "Bu funksional test emas, vizual detal." },
      { id: "d", text: "Sana maydoniga umuman qo'l bilan matn kiritib bo'lmaydi, shuning uchun bu holatni tekshirishning hojati yo'q", correct: false,
        explain: "Aksincha — foydalanuvchi qo'lda matn kiritishga urinishi mumkin, bu holat ham tekshirilishi kerak (masalan, noto'g'ri formatda matn kiritilsa nima bo'ladi)." },
    ],
    mentorHints: [
      "Kalendarni oching va bir nechta oy/yilni oldinga-orqaga o'tkazib ko'ring.",
      "Bir necha xil sanani tanlab, maydondagi formatni kuzating (masalan, kun/oy/yil tartibi).",
      "Maydonga qo'lda matn kiritishga urinib ko'ring — widget buni qanday qabul qiladi yoki rad etadi?",
    ],
    groundTruth:
      "Date Picker widget'ini test qilishda kalendar navigatsiyasi (oy/yil o'zgartirish), sana tanlash va " +
      "uning maydonda to'g'ri formatda aks etishi, hamda qo'lda matn kiritishga urinish kabi holatlar " +
      "tekshirilishi kerak. Sana kiritish maydonlari ko'p ilovalarda format nomuvofiqligi tufayli " +
      "xatoliklarga sabab bo'ladi.",
  },

  {
    id: "dq-dynamic-properties",
    title: "DemoQA: Dynamic Properties",
    domain: "web",
    difficulty: "hard",
    points: 45,
    targetUrl: "https://demoqa.com/dynamic-properties",
    targetName: "DemoQA",
    mission:
      "Dynamic Properties sahifasini oching. Sahifadagi tugmalar vaqt o'tishi bilan (masalan, 5 sekunddan " +
      "keyin) o'z holatini o'zgartiradi — buni kuzating.",
    taskPrompt: "Dynamic Properties sahifasidagi elementlarni test qilishda qanday yondashuv to'g'ri?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Element darhol mavjud emasligi mumkinligini hisobga olib, aniq kutish (explicit wait) qo'llash kerak, qattiq sleep() emas", correct: true,
        explain: "To'g'ri — vaqt bilan o'zgaruvchi elementlar uchun aniq shart asosidagi kutish (masalan, 'element bosilishi mumkin bo'lguncha kutish') eng ishonchli yondashuv." },
      { id: "b", text: "Tugma bosila oladigan (enabled) holatga o'tishi uchun ketgan vaqtni tekshirish", correct: true,
        explain: "Element qachon interaktiv bo'lib qolishini aniqlash — bu sahifaning asosiy maqsadi." },
      { id: "c", text: "Sahifa yuklangandan keyin ba'zi elementlarning ID'si o'zgarishi mumkinligini hisobga olib, faqat ID orqali emas, boshqa lokator (masalan, matn yoki class) orqali ham topa olishni sinash", correct: true,
        explain: "Dinamik ID'lar avtomatlashtirilgan testlarni buzishi mumkin — barqaror lokator strategiyasi tanlash muhim ko'nikma." },
      { id: "d", text: "Har doim 10 sekundlik qattiq sleep() qo'yish eng yaxshi yechim", correct: false,
        explain: "Qattiq (hardcoded) kutish vaqtni behuda sarflaydi yoki yetarli bo'lmasligi mumkin — bu yaxshi amaliyot emas." },
    ],
    mentorHints: [
      "Sahifani oching va tugmaning dastlabki holatini (masalan, 'disabled' yoki ko'rinmas) kuzating.",
      "Bir necha soniya kutib, tugma holati o'zgarishini (masalan, bosila oladigan bo'lib qolishini) tekshiring.",
      "Sahifani yangilab (refresh), ba'zi elementlarning texnik atributlari (masalan, id) o'zgarib qolishi mumkinligini o'ylab ko'ring — bu avtomatlashtirishga qanday ta'sir qiladi?",
    ],
    groundTruth:
      "Dynamic Properties sahifasi vaqt o'tishi bilan holatini o'zgartiruvchi (enable bo'lish, ko'rinadigan " +
      "bo'lish, rang o'zgartirish) va sahifa yuklanganda ID'si o'zgarib turadigan elementlarni o'z ichiga " +
      "oladi. Bunday elementlarni test qilishda qattiq kutish (sleep) emas, balki aniq shart asosidagi " +
      "kutish (explicit wait) va barqaror lokator strategiyasi qo'llanilishi kerak — bu real " +
      "avtomatlashtirish loyihalarida eng ko'p uchraydigan muammolardan biri.",
  },

  {
    id: "dq-broken-links-images",
    title: "DemoQA: Broken Links & Images",
    domain: "web",
    difficulty: "hard",
    points: 42,
    targetUrl: "https://demoqa.com/broken",
    targetName: "DemoQA",
    mission:
      "Broken Links - Images sahifasini oching. Sahifadagi rasmlar va havolalarni tekshiring — qaysi biri " +
      "to'g'ri yuklanadi, qaysi biri buzuq.",
    taskPrompt: "Broken links va images'ni test qilish uchun to'g'ri metodika qanday?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Har bir rasmning haqiqatan yuklanganini (masalan, rasm o'lchami/holati orqali) tekshirish", correct: true,
        explain: "Buzuq rasm odatda kichik 'broken image' ikonkasi bilan ko'rinadi — bu dasturiy tekshirilishi mumkin." },
      { id: "b", text: "Har bir havola bosilganda qaytariladigan HTTP status kodini tekshirish (200 — ishlayapti, 4xx/5xx — buzuq)", correct: true,
        explain: "Havolaning 'buzuq' yoki 'ishlaydigan' ekanini status kod orqali aniq aniqlash mumkin — bu eng ishonchli usul." },
      { id: "c", text: "Faqat ko'z bilan ko'rib, rasm chiroyli ko'rinadimi deb baholash", correct: false,
        explain: "Vizual baho subyektiv va katta sahifalarda samarasiz — status kod/texnik tekshiruv ancha ishonchli." },
      { id: "d", text: "Sahifadagi barcha havolalarni avtomatik tekshiruvchi vosita yoki skript yordamida status kodlarini yig'ish", correct: true,
        explain: "Ko'p havolali sahifalarda avtomatlashtirilgan tekshiruv vaqtni tejaydi va inson xatosini kamaytiradi." },
    ],
    mentorHints: [
      "Sahifadagi ikkita rasmni solishtiring — biri to'g'ri ko'rinadi, ikkinchisi buzuq ikonka ko'rsatadi.",
      "Havolalardan birini bosing va qayerga yo'naltirilishini, qanday status qaytarishini kuzating.",
      "Katta saytlarda bunday tekshiruvni qo'lda emas, balki avtomatlashtirilgan (masalan, barcha linklarni yig'ib status kod so'rovchi) vosita bilan qilish samaraliroq ekanini o'ylab ko'ring.",
    ],
    groundTruth:
      "Broken Links - Images sahifasida bitta to'g'ri va bitta buzuq rasm, shuningdek to'g'ri (200 status) " +
      "va noto'g'ri (masalan, mavjud bo'lmagan sahifaga yo'naltiruvchi) havolalar joylashgan. Professional " +
      "QA amaliyotida bunday tekshiruv HTTP status kodlarini avtomatik yig'ish orqali amalga oshiriladi, " +
      "chunki vizual tekshiruv katta saytlarda amaliy emas.",
  },

  {
    id: "ae-signup-existing-email",
    title: "AutomationExercise: mavjud email bilan ro'yxatdan o'tish",
    domain: "ecommerce",
    difficulty: "easy",
    points: 18,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "automationexercise.com saytida ro'yxatdan o'ting, so'ng xuddi shu email manzili bilan qayta " +
      "ro'yxatdan o'tishga urinib ko'ring.",
    taskPrompt: "Allaqachon ro'yxatdan o'tgan email bilan qayta signup qilishga urinilsa nima sodir bo'ladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "'Email Address already exist!' turidagi xato xabari chiqadi va yangi hisob yaratilmaydi", correct: true,
        explain: "To'g'ri — tizim email allaqachon mavjudligini aniqlaydi va noyoblik (uniqueness) qoidasini buzishga yo'l qo'ymaydi." },
      { id: "b", text: "Yangi hisob eskisining ustidan yoziladi (overwrite)", correct: false,
        explain: "Bu xavfli va noto'g'ri xatti-harakat bo'lardi — tizim bunga yo'l qo'ymaydi." },
      { id: "c", text: "Ikkita bir xil email bilan ikkita hisob yaratiladi", correct: false,
        explain: "Email — noyob identifikator bo'lishi kerak, tizim buni oldini oladi." },
      { id: "d", text: "Sahifa xatosiz, jimgina asosiy sahifaga qaytaradi", correct: false,
        explain: "Foydalanuvchiga nima sodir bo'lgani haqida aniq xabar berilishi kerak, jim qaytarish yomon UX." },
    ],
    mentorHints: [
      "Avval yangi (haqiqiy) email bilan to'liq ro'yxatdan o'ting.",
      "Endi xuddi shu email manzilini ishlatib, signup formasini qayta to'ldiring.",
      "Noyoblik (uniqueness) cheklovlarini tekshirish — bu ma'lumotlar bazasi darajasidagi muhim validatsiya turi.",
    ],
    groundTruth:
      "automationexercise.com email manzilining noyobligini talab qiladi — mavjud email bilan qayta " +
      "ro'yxatdan o'tishga urinilganda 'Email Address already exist!' xato xabari chiqadi va yangi hisob " +
      "yaratilmaydi. Bu — ma'lumotlar bazasi darajasidagi noyoblik cheklovini UI orqali test qilishga " +
      "misol.",
  },

  {
    id: "ae-product-search",
    title: "AutomationExercise: mahsulot qidiruvi",
    domain: "ecommerce",
    difficulty: "easy",
    points: 20,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "Products sahifasidagi qidiruv maydonidan foydalanib turli so'rovlarni sinab ko'ring: to'liq nom, " +
      "qisman nom, mavjud bo'lmagan mahsulot nomi, bo'sh so'rov.",
    taskPrompt: "Qidiruv (search) funksiyasi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Qisman mos keluvchi so'z bilan qidirilganda ham tegishli natijalar chiqishi (partial match)", correct: true,
        explain: "Foydalanuvchilar ko'pincha to'liq nomni bilishmaydi — qisman moslik muhim UX talabi." },
      { id: "b", text: "Mavjud bo'lmagan mahsulot nomi bilan qidirilganda tushunarli 'natija topilmadi' holati ko'rsatilishi", correct: true,
        explain: "Bo'sh natija holatini to'g'ri boshqarish — muhim edge case." },
      { id: "c", text: "Katta-kichik harflarga sezgir bo'lmasligi (case-insensitive qidiruv)", correct: true,
        explain: "'Dress' va 'dress' bir xil natijani berishi kerak — bu foydalanuvchi tajribasi uchun muhim." },
      { id: "d", text: "Qidiruv natijalari sahifasining fon rangi qanday ekanini tekshirish", correct: false,
        explain: "Bu funksional qidiruv testiga aloqador emas." },
    ],
    mentorHints: [
      "Mahsulot nomining faqat bir qismini yozib qidiruvni sinang.",
      "Umuman mavjud bo'lmagan so'z (masalan, tasodifiy harflar) bilan qidiring — natija qanday ko'rsatiladi?",
      "Bir xil so'zni katta va kichik harflarda yozib, natijalar bir xil ekanini solishtiring.",
    ],
    groundTruth:
      "Qidiruv funksiyasini test qilishda qisman moslik (partial match), katta-kichik harflarga sezgirlik " +
      "(case sensitivity) va natija topilmagan holatning to'g'ri ko'rsatilishi (bo'sh holat dizayni) " +
      "asosiy tekshiriladigan jihatlar hisoblanadi. Bu — Equivalence Partitioning texnikasining amaliy " +
      "qo'llanilishi: turli xil kirish toifalarini (to'liq, qisman, mavjud emas, bo'sh) sinash.",
  },

  {
    id: "ae-subscription",
    title: "AutomationExercise: obuna (newsletter)",
    domain: "ecommerce",
    difficulty: "easy",
    points: 16,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "Sahifa pastidagi 'Subscription' bo'limiga to'g'ri email manzil kiritib, obuna bo'lishga urinib " +
      "ko'ring, so'ng bo'sh maydon bilan urinib ko'ring.",
    taskPrompt: "Newsletter obuna formasi qanday xatti-harakat ko'rsatishi kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "To'g'ri email kiritilganda muvaffaqiyat xabari (masalan, 'You have been successfully subscribed!') chiqishi, bo'sh yoki noto'g'ri email esa qabul qilinmasligi kerak", correct: true,
        explain: "To'g'ri — bu forma ham boshqa formalar kabi ijobiy va salbiy stsenariylarni to'g'ri boshqarishi kerak." },
      { id: "b", text: "Har qanday holatda ham xato xabari chiqishi kerak", correct: false,
        explain: "To'g'ri email kiritilganda muvaffaqiyat xabari chiqishi kutiladi, doim xato emas." },
      { id: "c", text: "Email formati tekshirilmasdan, har qanday matn qabul qilinishi kerak", correct: false,
        explain: "Yaxshi forma email formatini (masalan, '@' belgisi borligini) tekshirishi kerak." },
      { id: "d", text: "Obuna formasi faqat ro'yxatdan o'tgan foydalanuvchilar uchun ko'rinishi kerak", correct: false,
        explain: "Newsletter obunasi odatda barcha tashrif buyuruvchilar uchun ochiq bo'ladi, faqat ro'yxatdan o'tganlar uchun emas." },
    ],
    mentorHints: [
      "Sahifani pastga aylantirib 'Subscription' bo'limini toping.",
      "To'g'ri formatdagi email kiritib obuna bo'lishga urinib ko'ring — qanday xabar chiqadi?",
      "Endi bo'sh maydon yoki noto'g'ri formatdagi email bilan urinib ko'ring — forma buni qabul qiladimi?",
    ],
    groundTruth:
      "Newsletter obuna formasi to'g'ri email kiritilganda muvaffaqiyat xabarini ko'rsatishi, bo'sh yoki " +
      "formatga mos kelmaydigan qiymatlarni esa rad etishi kerak. Bu kichik, lekin har bir saytda " +
      "uchraydigan forma bo'lib, u ham to'liq positive/negative test yondashuvini talab qiladi.",
  },

  {
    id: "ae-cart-quantity",
    title: "AutomationExercise: savat va miqdor",
    domain: "ecommerce",
    difficulty: "medium",
    points: 30,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "Mahsulotni savatga qo'shing, miqdorni o'zgartiring va checkout'gacha boring. Savat va miqdor bilan " +
      "bog'liq holatlarni test qiling.",
    taskPrompt: "Savat funksiyasi uchun eng muhim test holatlarini tanlang:",
    taskKind: "multi",
    options: [
      { id: "a", text: "Bir mahsulotni bir necha marta qo'shib, miqdor to'g'ri yig'ilishini tekshirish", correct: true,
        explain: "Takroriy qo'shishda miqdor to'g'ri hisoblanishi kerak — alohida qatorga emas, mavjud qatorga qo'shilishi kutiladi." },
      { id: "b", text: "Savatdagi jami narx (miqdor × narx) to'g'ri hisoblanishini tekshirish", correct: true,
        explain: "Narx hisob-kitobi noto'g'ri bo'lsa, bu jiddiy biznes xatosi — har doim tekshirilishi kerak." },
      { id: "c", text: "Mahsulotni savatdan o'chirish (Delete/Remove) to'g'ri ishlashini tekshirish", correct: true,
        explain: "Savatdan o'chirish — CRUD operatsiyasining muhim qismi, savat holati to'g'ri yangilanishi kerak." },
      { id: "d", text: "Sayt logotipining rangini tekshirish", correct: false,
        explain: "Bu funksional savat testi emas — kontekstga mos emas." },
    ],
    mentorHints: [
      "Savat testida har doim chegara qiymatlarini o'ylang.",
      "Bir mahsulotni ikki marta qo'shsangiz nima bo'ladi — miqdor 2 bo'ladimi yoki 2 ta alohida qator paydo bo'ladimi?",
      "Har o'zgarishda jami summani qo'lda hisoblab, ekrandagi qiymat bilan solishtiring.",
    ],
    groundTruth:
      "Savat uchun muhim testlar: takroriy qo'shishda miqdorning to'g'ri yig'ilishi, narx × miqdor " +
      "hisobining aniqligi va mahsulotni o'chirish funksiyasi. Bu Equivalence Partitioning va matematik " +
      "hisob-kitoblarni tekshirish texnikalarini amalda qo'llash.",
  },

  {
    id: "ae-checkout-address",
    title: "AutomationExercise: checkout manzil ma'lumotlari",
    domain: "ecommerce",
    difficulty: "medium",
    points: 28,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "Ro'yxatdan o'tishda kiritilgan manzil ma'lumotlari bilan checkout jarayonidagi 'Address Details' " +
      "bo'limini solishtiring.",
    taskPrompt: "Checkout'dagi manzil ma'lumotlarini test qilishda nimalarga e'tibor berish kerak?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Checkout'da ko'rsatilgan manzil ro'yxatdan o'tishda kiritilgan manzil bilan aynan mos kelishi", correct: true,
        explain: "Ma'lumotlar bazasidan olingan ma'lumot foydalanuvchi kiritgani bilan bir xil bo'lishi shart — bu data integrity testi." },
      { id: "b", text: "Ism, familiya, shahar, davlat va pochta indeksi kabi barcha maydonlar to'liq va to'g'ri ko'rsatilishi", correct: true,
        explain: "Har bir maydon alohida tekshirilishi kerak, faqat umumiy ko'rinish emas." },
      { id: "c", text: "Delivery va Billing manzillari alohida ko'rsatilgan bo'lsa, ikkalasi ham to'g'ri ekanligi tekshirilishi", correct: true,
        explain: "Ba'zi tizimlarda yetkazib berish va hisob-kitob manzillari farq qilishi mumkin — ikkalasi ham alohida tasdiqlanishi kerak." },
      { id: "d", text: "Manzil maydonlarining shrift o'lchamini tekshirish", correct: false,
        explain: "Bu vizual detal, funksional data integrity testiga aloqador emas." },
    ],
    mentorHints: [
      "Ro'yxatdan o'tishda kiritgan manzil ma'lumotlaringizni yozib qo'ying (yoki eslab qoling).",
      "Checkout jarayonida 'Address Details' bo'limiga o'ting va u yerdagi ma'lumotni solishtiring.",
      "Har bir maydonni (ism, manzil, shahar, indeks) alohida-alohida tekshiring, umumiy ko'rinishga qanoat qilmang.",
    ],
    groundTruth:
      "Checkout jarayonidagi manzil ma'lumotlari ro'yxatdan o'tishda saqlangan ma'lumot bilan aynan mos " +
      "kelishi kerak. Bu — turli sahifalar/bosqichlar orasida ma'lumot yaxlitligini (data consistency) " +
      "tekshirish uchun muhim end-to-end test holati, ayniqsa ko'p bosqichli checkout oqimlarida.",
  },

  {
    id: "ae-contact-us-form",
    title: "AutomationExercise: Contact Us formasi",
    domain: "ecommerce",
    difficulty: "medium",
    points: 27,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "Contact Us sahifasini oching. Formani bo'sh holda, so'ng to'liq ma'lumot va fayl biriktirilgan " +
      "holda yuborib ko'ring.",
    taskPrompt: "Contact Us formasi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Majburiy maydonlar (Name, Email, Subject, Message) bo'sh qoldirilganda forma yuborilmasligi", correct: true,
        explain: "Standart forma validatsiyasi — majburiy maydonlar bo'sh bo'lsa forma o'tmasligi kerak." },
      { id: "b", text: "Email maydoniga noto'g'ri formatdagi qiymat (masalan, '@' siz) kiritilganda xato berilishi", correct: true,
        explain: "Email format validatsiyasi — klassik forma test holati." },
      { id: "c", text: "Fayl biriktirish (attachment) funksiyasi turli fayl turlari bilan to'g'ri ishlashi", correct: true,
        explain: "Fayl yuklash funksiyasi ham alohida test qilinishi kerak — masalan, ruxsat etilgan va etilmagan formatlar." },
      { id: "d", text: "Formaning orqa fon rasmini tekshirish", correct: false,
        explain: "Bu funksional forma testiga aloqador emas." },
    ],
    mentorHints: [
      "Formani hech narsa kiritmasdan yuborishga urinib ko'ring.",
      "Email maydoniga noto'g'ri formatdagi matn kiriting va natijani kuzating.",
      "Fayl biriktirish maydoniga turli formatdagi fayl (masalan, rasm, matn fayli) yuklab ko'ring.",
    ],
    groundTruth:
      "Contact Us formasi boshqa har qanday forma kabi majburiy maydon validatsiyasi, email format " +
      "tekshiruvi va fayl yuklash funksionalligini to'g'ri boshqarishi kerak. Fayl yuklash maydonlari " +
      "qo'shimcha ravishda fayl turi va hajmi bo'yicha cheklovlarni ham talab qilishi mumkin — bu alohida " +
      "test yo'nalishi.",
  },

  {
    id: "ae-product-review",
    title: "AutomationExercise: mahsulot sharhi (review)",
    domain: "ecommerce",
    difficulty: "medium",
    points: 26,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "Istalgan mahsulot sahifasini oching va 'Write Your Review' bo'limida sharh qoldirishga urinib " +
      "ko'ring — avval bo'sh, so'ng to'liq ma'lumot bilan.",
    taskPrompt: "Mahsulot sharhi (review) formasi bo'sh holda yuborilsa nima kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Forma yuborilmaydi, chunki Name, Email va Review maydonlari majburiy", correct: true,
        explain: "To'g'ri — barcha uchta maydon to'ldirilmaguncha sharh yuborilmaydi." },
      { id: "b", text: "Sharh 'Anonim' nomi bilan avtomatik yuboriladi", correct: false,
        explain: "Bunday avtomatik almashtirish yo'q — maydonlar to'ldirilishi shart." },
      { id: "c", text: "Sahifa qayta yuklanadi va hech qanday xabar chiqmaydi", correct: false,
        explain: "Foydalanuvchiga nima sodir bo'lgani (masalan, qaysi maydon yetishmayotgani) haqida signal berilishi kerak." },
      { id: "d", text: "Sharh bo'sh matn bilan saqlanadi", correct: false,
        explain: "Bo'sh sharh matni ma'nosiz bo'lardi, tizim buni rad etishi kerak." },
    ],
    mentorHints: [
      "Mahsulot sahifasidagi 'Write Your Review' bo'limini toping.",
      "Formani bo'sh holda 'Submit' qilishga urinib ko'ring.",
      "Endi Name, Email va Review maydonlarini to'liq to'ldirib, muvaffaqiyatli yuborishni sinang.",
    ],
    groundTruth:
      "Mahsulot sharhi formasi Name, Email va Review matn maydonlarini majburiy deb belgilaydi — ular " +
      "to'ldirilmaguncha sharh yuborilmaydi. To'g'ri to'ldirilganda odatda 'Thank you for your review' " +
      "turidagi tasdiqlash xabari ko'rsatiladi. Bu — foydalanuvchi tomonidan yaratiladigan kontent (UGC) " +
      "formalarini test qilishning standart yondashuvi.",
  },

  {
    id: "ae-invalid-login",
    title: "AutomationExercise: noto'g'ri login stsenariylari",
    domain: "ecommerce",
    difficulty: "hard",
    points: 42,
    targetUrl: "https://automationexercise.com",
    targetName: "AutomationExercise",
    mission:
      "Login sahifasida bir nechta negativ stsenariyni sinab ko'ring: mavjud email + noto'g'ri parol, " +
      "mavjud bo'lmagan email, bo'sh maydonlar.",
    taskPrompt: "Login funksiyasi uchun qaysi negativ test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Mavjud email + noto'g'ri parol kiritilganda tushunarli xato xabari chiqishi", correct: true,
        explain: "Bu eng keng tarqalgan negative holat — tizim buni to'g'ri boshqarishi va aniq xabar berishi kerak." },
      { id: "b", text: "Ro'yxatdan o'tmagan email bilan urinilganda ham mos xato xabari chiqishi", correct: true,
        explain: "Bu holat ham alohida tekshirilishi kerak — tizim foydalanuvchi mavjudligi haqida to'g'ri signal berishi lozim." },
      { id: "c", text: "Bo'sh email/parol maydonlari bilan 'Login' bosilganda forma yuborilmasligi", correct: true,
        explain: "Majburiy maydonlar bo'sh bo'lsa so'rov yuborilmasligi kerak — bu asosiy validatsiya." },
      { id: "d", text: "Login xato xabari matnining shrift o'lchamini piksellarda o'lchash", correct: false,
        explain: "Bu darajadagi vizual detal funksional negative testga aloqador emas." },
    ],
    mentorHints: [
      "Mavjud (ro'yxatdan o'tgan) email bilan, lekin ataylab noto'g'ri parol kiritib login qiling.",
      "Endi umuman ro'yxatdan o'tmagan email bilan urinib ko'ring — xato xabari o'zgaradimi?",
      "Ikkala maydonni ham bo'sh qoldirib 'Login' tugmasini bosing — forma umuman yuborilmasligi kerak.",
    ],
    groundTruth:
      "Login funksiyasini to'liq test qilish uchun kamida uchta negativ stsenariy tekshirilishi kerak: " +
      "to'g'ri email + noto'g'ri parol, mavjud bo'lmagan email, va bo'sh maydonlar. AutomationExercise " +
      "bunday holatlarda 'Your email or password is incorrect!' turidagi xabar ko'rsatadi. Bu — " +
      "autentifikatsiya oqimini har tomonlama sinovdan o'tkazishning namunasi.",
  },

  {
    id: "rq-get-list-users",
    title: "reqres.in: foydalanuvchilar ro'yxati",
    domain: "api",
    difficulty: "easy",
    points: 15,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "GET /api/users?page=2 so'rovini yuboring (brauzer yoki Postman orqali) va javob tuzilishini (JSON) " +
      "o'rganing.",
    taskPrompt: "GET /api/users?page=2 javobida qaysi maydonlar bo'lishi kutiladi?",
    taskKind: "multi",
    options: [
      { id: "a", text: "page, per_page, total, total_pages kabi pagination (sahifalash) maydonlari", correct: true,
        explain: "Ro'yxat qaytaruvchi API'lar odatda pagination haqida meta-ma'lumot beradi." },
      { id: "b", text: "data — foydalanuvchilar massivi (id, email, first_name, last_name, avatar)", correct: true,
        explain: "Bu — so'ralgan asosiy ma'lumot, har bir foydalanuvchi obyekti bo'lishi kerak." },
      { id: "c", text: "status kod 200 OK", correct: true,
        explain: "Muvaffaqiyatli GET so'rovi 200 status kodini qaytarishi kutiladi." },
      { id: "d", text: "Foydalanuvchi parollari ochiq matnda (plain text)", correct: false,
        explain: "Bu jiddiy xavfsizlik xatosi bo'lardi — API bunday nozik ma'lumotni hech qachon qaytarmasligi kerak." },
    ],
    mentorHints: [
      "So'rovni brauzer manzil satriga yozib yoki Postman'da yuboring: https://reqres.in/api/users?page=2",
      "Javobdagi JSON tuzilishini diqqat bilan o'qing — qaysi kalitlar (keys) bor?",
      "Pagination ma'lumotlari (page, total va h.k.) bilan data massivini bir-biridan ajrating.",
    ],
    groundTruth:
      "GET /api/users?page=2 javobi 200 status bilan qaytadi va page, per_page, total, total_pages kabi " +
      "pagination maydonlarini hamda data massivida foydalanuvchilar ro'yxatini (id, email, first_name, " +
      "last_name, avatar) o'z ichiga oladi. API javob strukturasini tekshirish (schema validation) — API " +
      "testlashning asosiy qismi.",
  },

  {
    id: "rq-get-single-user-404",
    title: "reqres.in: mavjud bo'lmagan foydalanuvchi",
    domain: "api",
    difficulty: "easy",
    points: 15,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "GET /api/users/2 (mavjud) va GET /api/users/23 (mavjud emas) so'rovlarini yuboring va status " +
      "kodlarini solishtiring.",
    taskPrompt: "GET /api/users/23 (mavjud bo'lmagan id) qanday status kod qaytaradi?",
    taskKind: "single",
    options: [
      { id: "a", text: "200 OK", correct: false,
        explain: "200 — muvaffaqiyat. Lekin foydalanuvchi topilmadi, demak bu emas." },
      { id: "b", text: "404 Not Found", correct: true,
        explain: "To'g'ri! Mavjud bo'lmagan resurs so'ralganda server 404 qaytaradi va bo'sh JSON obyekti ({}) beradi." },
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
      "GET /api/users/2 → 200 OK (foydalanuvchi bor). GET /api/users/23 → 404 Not Found (foydalanuvchi " +
      "yo'q, javob bo'sh {} obyekt). 404 — so'ralgan resurs topilmaganini bildiradi. QA API testda har " +
      "doim status kodni birinchi navbatda tekshiradi.",
  },

  {
    id: "rq-post-create-user",
    title: "reqres.in: foydalanuvchi yaratish (POST)",
    domain: "api",
    difficulty: "easy",
    points: 18,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "POST /api/users so'rovini {\"name\": \"morpheus\", \"job\": \"leader\"} tanasi (body) bilan " +
      "yuboring va javobni tekshiring.",
    taskPrompt: "Yangi resurs muvaffaqiyatli yaratilganda (POST) qaysi status kod qaytarilishi kerak?",
    taskKind: "single",
    options: [
      { id: "a", text: "200 OK", correct: false,
        explain: "200 — umumiy muvaffaqiyat, lekin yangi resurs YARATILGANDA aniqroq kod ishlatiladi." },
      { id: "b", text: "201 Created", correct: true,
        explain: "To'g'ri! Yangi resurs muvaffaqiyatli yaratilganda REST konventsiyasi bo'yicha 201 Created qaytariladi, javobda odatda yangi id va createdAt bo'ladi." },
      { id: "c", text: "204 No Content", correct: false,
        explain: "204 — muvaffaqiyatli, lekin javob tanasi yo'q holatlar uchun (masalan, DELETE)." },
      { id: "d", text: "202 Accepted", correct: false,
        explain: "202 — so'rov qabul qilindi, lekin hali qayta ishlanmoqda (asinxron jarayonlar uchun) degani, bu yerga mos emas." },
    ],
    mentorHints: [
      "POST so'rovini to'g'ri JSON tanasi bilan /api/users manziliga yuboring.",
      "Javobdagi status kodga e'tibor bering — bu 200 emas, boshqacha kod.",
      "REST konventsiyasida 'yangi narsa yaratildi' degan ma'noni bildiruvchi maxsus 2xx kod bor.",
    ],
    groundTruth:
      "POST /api/users {\"name\":\"morpheus\",\"job\":\"leader\"} so'rovi 201 Created status kodini va " +
      "javobda yangi yaratilgan resursning id hamda createdAt maydonlarini qaytaradi. REST API'larda 200 " +
      "va 201 orasidagi farqni bilish — status kodlarni to'g'ri talqin qilish ko'nikmasining muhim qismi.",
  },

  {
    id: "rq-put-update-user",
    title: "reqres.in: foydalanuvchini yangilash (PUT)",
    domain: "api",
    difficulty: "easy",
    points: 18,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "PUT /api/users/2 so'rovini yangi {\"name\": \"morpheus\", \"job\": \"zion resident\"} tanasi bilan " +
      "yuboring.",
    taskPrompt: "PUT /api/users/2 muvaffaqiyatli bajarilganda qaysi status kod va javob kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "200 OK va javobda updatedAt maydoni bilan yangilangan ma'lumot", correct: true,
        explain: "To'g'ri! PUT bilan mavjud resursni to'liq yangilash muvaffaqiyatli bo'lsa 200 status va updatedAt bilan javob qaytariladi." },
      { id: "b", text: "201 Created", correct: false,
        explain: "201 — yangi resurs yaratilganda ishlatiladi (POST), bu yerda mavjud resurs yangilanmoqda (PUT)." },
      { id: "c", text: "404 Not Found", correct: false,
        explain: "id=2 mavjud foydalanuvchi bo'lgani uchun 404 emas, muvaffaqiyatli javob kutiladi." },
      { id: "d", text: "Javob tanasi bo'lmaydi", correct: false,
        explain: "PUT so'rovi odatda yangilangan ma'lumotni o'z ichiga olgan javob tanasi bilan qaytadi." },
    ],
    mentorHints: [
      "PUT so'rovini /api/users/2 manziliga yangi job qiymati bilan yuboring.",
      "Status kodni GET va POST bilan solishtiring — farqi bormi?",
      "Javob tanasida qaysi vaqt belgisi (timestamp) maydoni borligiga e'tibor bering — bu yangilanish vaqtini bildiradi.",
    ],
    groundTruth:
      "PUT /api/users/2 mavjud resursni to'liq yangilaydi va muvaffaqiyatli bo'lsa 200 OK status hamda " +
      "javobda updatedAt vaqt belgisi bilan qaytadi. PUT (to'liq yangilash) va PATCH (qisman yangilash) " +
      "orasidagi farqni bilish REST API testlashda muhim.",
  },

  {
    id: "rq-delete-user",
    title: "reqres.in: foydalanuvchini o'chirish (DELETE)",
    domain: "api",
    difficulty: "medium",
    points: 25,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "DELETE /api/users/2 so'rovini yuboring va javobning status kodi hamda tanasini (body) tekshiring.",
    taskPrompt: "DELETE /api/users/2 muvaffaqiyatli bajarilganda qanday javob kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "204 No Content — status kod 204, javob tanasi bo'sh", correct: true,
        explain: "To'g'ri! O'chirish (DELETE) muvaffaqiyatli bo'lganda odatda qaytariladigan ma'lumot yo'q, shuning uchun 204 No Content ishlatiladi." },
      { id: "b", text: "200 OK va o'chirilgan foydalanuvchi ma'lumotlari bilan to'liq javob", correct: false,
        explain: "DELETE odatda hech qanday tana (body) qaytarmaydi, 200 emas 204 kutiladi." },
      { id: "c", text: "404 Not Found", correct: false,
        explain: "id=2 mavjud bo'lgani uchun muvaffaqiyatli o'chirish kutiladi, 404 emas." },
      { id: "d", text: "302 Found (redirect)", correct: false,
        explain: "DELETE so'rovlar odatda boshqa sahifaga yo'naltirmaydi — bu holat mos emas." },
    ],
    mentorHints: [
      "DELETE so'rovini /api/users/2 manziliga yuboring.",
      "Javobning status kodiga va tanasi (body) bor-yo'qligiga e'tibor bering.",
      "2xx guruhidagi qaysi kod 'muvaffaqiyatli, lekin qaytariladigan ma'lumot yo'q' degan ma'noni bildiradi?",
    ],
    groundTruth:
      "DELETE /api/users/2 muvaffaqiyatli bajarilganda 204 No Content status kodi qaytariladi va javob " +
      "tanasi bo'sh bo'ladi. Bu — muvaffaqiyatli, ammo qaytariladigan kontent yo'q operatsiyalar uchun " +
      "standart REST konventsiyasi. QA testda status kod bilan bir qatorda javob tanasining bo'sh yoki " +
      "to'liq ekanini ham tekshirish kerak.",
  },

  {
    id: "rq-post-register-success",
    title: "reqres.in: muvaffaqiyatli ro'yxatdan o'tish",
    domain: "api",
    difficulty: "medium",
    points: 27,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "POST /api/register so'rovini {\"email\": \"eve.holt@reqres.in\", \"password\": \"pistol\"} tanasi " +
      "bilan yuboring (bu — reqres.in'ning maxsus 'ishlaydigan' test email manzili).",
    taskPrompt: "To'g'ri (tanish) email va parol bilan ro'yxatdan o'tish muvaffaqiyatli bo'lganda javobda nima bo'lishi kerak?",
    taskKind: "single",
    options: [
      { id: "a", text: "200 status kod va javobda id hamda token maydonlari", correct: true,
        explain: "To'g'ri! Muvaffaqiyatli registratsiyada server foydalanuvchi id'si va autentifikatsiya token'ini qaytaradi." },
      { id: "b", text: "400 status kod va xato xabari", correct: false,
        explain: "400 — xato holat uchun, lekin bu yerda to'g'ri ma'lumot bilan muvaffaqiyatli so'rov yuborilmoqda." },
      { id: "c", text: "Faqat status 200, lekin javob tanasi bo'sh", correct: false,
        explain: "Muvaffaqiyatli registratsiyada odatda id va token kabi foydali ma'lumot qaytariladi, bo'sh javob emas." },
      { id: "d", text: "302 redirect boshqa sahifaga", correct: false,
        explain: "API so'rovlarida bunday redirect kutilmaydi." },
    ],
    mentorHints: [
      "reqres.in faqat oldindan belgilangan ba'zi email manzillari (masalan, eve.holt@reqres.in) bilan muvaffaqiyatli registratsiyani simulyatsiya qiladi — buni hujjatdan tekshiring.",
      "So'rovni to'g'ri email va istalgan parol bilan yuboring.",
      "Javobdagi maydonlarni oldingi (parolsiz) urinish bilan solishtiring — farqi nimada?",
    ],
    groundTruth:
      "reqres.in'da faqat ma'lum test email manzillari (masalan, eve.holt@reqres.in) bilan muvaffaqiyatli " +
      "registratsiya simulyatsiya qilinadi. To'g'ri email + parol bilan POST /api/register 200 status va " +
      "javobda id hamda token qaytaradi. Bu — mock API'larning haqiqiy tizimni qanday simulyatsiya " +
      "qilishini tushunish uchun muhim mashq.",
  },

  {
    id: "rq-post-login-missing-password",
    title: "reqres.in: parolsiz login",
    domain: "api",
    difficulty: "medium",
    points: 26,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "POST /api/login so'rovini faqat email bilan (parolsiz) yuboring: {\"email\": \"eve.holt@reqres.in\"}.",
    taskPrompt: "Parolsiz POST /api/login yuborilganda nima kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "400 status va {\"error\":\"Missing password\"} turidagi javob", correct: true,
        explain: "To'g'ri! Majburiy maydon (parol) yo'qligida server aniq xato xabari bilan 400 qaytaradi." },
      { id: "b", text: "200 status va token", correct: false,
        explain: "Majburiy maydon yo'q bo'lsa muvaffaqiyatli login berilmasligi kerak." },
      { id: "c", text: "500 server xatosi", correct: false,
        explain: "Bu validatsiya xatosi (client xatosi), server ichki xatosi (500) emas." },
      { id: "d", text: "Login sahifasi cheksiz yuklanadi (hang)", correct: false,
        explain: "API to'g'ri javob qaytarishi kerak, osilib qolmasligi kerak." },
    ],
    mentorHints: [
      "Avval to'g'ri email+parol bilan login qiling va muvaffaqiyatli javobni ko'ring.",
      "Endi parolni butunlay olib tashlab so'rov yuboring.",
      "Majburiy maydon yo'qligi — bu client xatosi, 4xx guruhidan qaysi aniq kod qaytarilishini kuzating.",
    ],
    groundTruth:
      "POST /api/login parolsiz yuborilganda reqres.in 400 status va {\"error\":\"Missing password\"} " +
      "javobini qaytaradi. Bu — autentifikatsiya endpoint'larida majburiy maydonlarni negative testing " +
      "orqali tekshirishning klassik namunasi.",
  },

  {
    id: "rq-delayed-response",
    title: "reqres.in: kechiktirilgan javob (delay)",
    domain: "api",
    difficulty: "hard",
    points: 45,
    targetUrl: "https://reqres.in/",
    targetName: "reqres.in",
    mission:
      "GET /api/users?delay=3 so'rovini yuboring — bu parametr javobni sun'iy ravishda 3 sekundga " +
      "kechiktiradi. So'rov vaqtini o'lchang.",
    taskPrompt: "Kechiktirilgan (delayed) API javoblarini test qilishda qanday yondashuv to'g'ri?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Test kodida javobni kutish uchun yetarli timeout belgilash, aks holda test soxta (false negative) muvaffaqiyatsizlikka uchraydi", correct: true,
        explain: "Agar timeout juda qisqa bo'lsa, test sekin (lekin to'g'ri) javobni xato deb belgilashi mumkin — bu QA'da keng tarqalgan muammo." },
      { id: "b", text: "Kechikish davomida foydalanuvchi interfeysida yuklanish indikatori (loading spinner) ko'rsatilishini tekshirish (agar UI mavjud bo'lsa)", correct: true,
        explain: "Sekin javoblarda foydalanuvchiga vizual signal berish UX uchun muhim va test qilinishi kerak." },
      { id: "c", text: "Javob qanchalik sekin kelmasin, natija (data) to'g'riligini alohida tasdiqlash", correct: true,
        explain: "Tezlik va to'g'rilik — ikki xil o'lchov, ikkalasi ham mustaqil tekshirilishi kerak." },
      { id: "d", text: "Kechikishni butunlay e'tiborsiz qoldirish, chunki API oxir-oqibat javob beradi", correct: false,
        explain: "Ishlab chiqarish muhitida sekin javoblar foydalanuvchi tajribasiga jiddiy ta'sir qiladi — buni e'tiborsiz qoldirib bo'lmaydi." },
    ],
    mentorHints: [
      "So'rovni ?delay=3 parametri bilan yuboring va javob qancha vaqtda kelishini o'lchang.",
      "Buni parametrsiz (delay'siz) so'rov bilan solishtiring.",
      "Avtomatlashtirilgan testlarda qattiq (juda qisqa) timeout belgilash qanday muammolarga olib kelishi mumkinligini o'ylab ko'ring.",
    ],
    groundTruth:
      "reqres.in'ning delay parametri (masalan, ?delay=3) javobni sun'iy kechiktirish orqali sekin " +
      "tarmoq yoki server sharoitlarini simulyatsiya qiladi. Bunday holatlarni test qilishda " +
      "avtomatlashtirilgan testlarga yetarli timeout berish, UI'da yuklanish holatini tekshirish va javob " +
      "sekin kelsa ham ma'lumot to'g'riligini alohida tasdiqlash muhim. Bu — performance va funksional " +
      "testlarning kesishgan nuqtasi.",
  },

  {
    id: "ti-login-page",
    title: "The Internet: login sahifasi",
    domain: "web",
    difficulty: "easy",
    points: 16,
    targetUrl: "https://the-internet.herokuapp.com/login",
    targetName: "The Internet",
    mission:
      "Login sahifasini oching. To'g'ri (tomsmith / SuperSecretPassword!) va noto'g'ri ma'lumotlar bilan " +
      "login qilishga urinib ko'ring.",
    taskPrompt: "Noto'g'ri parol bilan login qilishga urinilganda nima sodir bo'ladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "'Your password is invalid!' turidagi xato xabari chiqadi va foydalanuvchi tizimga kirmaydi", correct: true,
        explain: "To'g'ri — tizim aniq xato xabari bilan noto'g'ri parolni rad etadi." },
      { id: "b", text: "Foydalanuvchi baribir tizimga kiritiladi", correct: false,
        explain: "Bu jiddiy xavfsizlik xatosi bo'lardi — noto'g'ri parol bilan kirish mumkin bo'lmasligi kerak." },
      { id: "c", text: "Sahifa hech qanday xabarsiz qayta yuklanadi", correct: false,
        explain: "Foydalanuvchiga nima uchun kira olmagani haqida signal berilishi kerak." },
      { id: "d", text: "Ilova ishdan chiqadi (crash)", correct: false,
        explain: "Xato holatlar to'g'ri boshqarilishi, ilova ishdan chiqmasligi kerak." },
    ],
    mentorHints: [
      "To'g'ri login (tomsmith / SuperSecretPassword!) bilan kirib, muvaffaqiyat xabarini ko'ring.",
      "Endi to'g'ri foydalanuvchi nomi, lekin noto'g'ri parol bilan urinib ko'ring.",
      "Xato xabari matniga e'tibor bering — u aniq foydalanuvchi nomi yoki parolga ishora qiladimi?",
    ],
    groundTruth:
      "The Internet login sahifasi to'g'ri ma'lumot bilan 'You logged into a secure area!' xabarini, " +
      "noto'g'ri parol bilan 'Your password is invalid!' xabarini va noto'g'ri foydalanuvchi nomi bilan " +
      "'Your username is invalid!' xabarini qaytaradi. Bu — autentifikatsiya xato xabarlarining aniqligini " +
      "tekshirish uchun asosiy namuna.",
  },

  {
    id: "ti-checkboxes",
    title: "The Internet: checkbox'lar",
    domain: "web",
    difficulty: "easy",
    points: 15,
    targetUrl: "https://the-internet.herokuapp.com/checkboxes",
    targetName: "The Internet",
    mission:
      "Checkboxes sahifasini oching va ikkita checkbox'ning boshlang'ich holatini (belgilangan/" +
      "belgilanmagan) kuzating.",
    taskPrompt: "Sahifa birinchi marta ochilganda checkbox'larning boshlang'ich holati qanday?",
    taskKind: "single",
    options: [
      { id: "a", text: "Birinchi checkbox belgilanmagan, ikkinchisi belgilangan holatda", correct: true,
        explain: "To'g'ri — sahifadagi ikkita checkbox turli boshlang'ich holatga ega, bu ataylab shunday sozlangan." },
      { id: "b", text: "Ikkalasi ham belgilangan", correct: false,
        explain: "Boshlang'ich holatlar bir xil emas — bu noto'g'ri kuzatish." },
      { id: "c", text: "Ikkalasi ham belgilanmagan", correct: false,
        explain: "Ikkinchi checkbox boshlanishidayoq belgilangan holatda bo'ladi." },
      { id: "d", text: "Checkbox'lar boshida ko'rinmaydi, faqat bosilganda paydo bo'ladi", correct: false,
        explain: "Ikkala checkbox ham sahifa yuklangan zahoti ko'rinadi." },
    ],
    mentorHints: [
      "Sahifani ochib, ikkala checkbox holatini diqqat bilan solishtiring.",
      "Har birini bosib, holat teskarisiga o'zgarishini tekshiring.",
      "Boshlang'ich holat (default state) — UI testlarida tez-tez e'tibordan chetda qoladigan, lekin muhim tekshiruv nuqtasi.",
    ],
    groundTruth:
      "Checkboxes sahifasida boshlang'ich holatda birinchi checkbox belgilanmagan (unchecked), ikkinchisi " +
      "esa belgilangan (checked) holatda bo'ladi. Bosilganda har biri o'z holatini teskarisiga " +
      "o'zgartiradi. Boshlang'ich (default) UI holatini tekshirish — funksional testlarning ko'zdan chetda " +
      "qoladigan, ammo muhim qismi.",
  },

  {
    id: "ti-status-codes",
    title: "The Internet: status kodlar sahifasi",
    domain: "web",
    difficulty: "easy",
    points: 18,
    targetUrl: "https://the-internet.herokuapp.com/status_codes",
    targetName: "The Internet",
    mission:
      "Status Codes sahifasini oching. 200, 301, 404 va 500 havolalarini birma-bir bosib, har biri qaysi " +
      "sahifaga olib borishini kuzating.",
    taskPrompt: "Status Codes sahifasidagi havolalarni test qilishda qanday tekshiruv to'g'ri?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Har bir havola bosilganda brauzer/tarmoq vositasi (Network tab) orqali haqiqatan mos status kod qaytishini tasdiqlash", correct: true,
        explain: "Sahifa nomi (masalan, '404') bilan haqiqiy HTTP status kod bir xil ekanini texnik tekshiruv orqali tasdiqlash kerak — ko'zga ishonib bo'lmaydi." },
      { id: "b", text: "Har bir sahifada ko'rsatilgan matn haqiqatan tegishli status kodga mos kelishini o'qib tekshirish", correct: true,
        explain: "Sahifadagi matn ('This page returned a 404 status code') to'g'ri kod haqida gapirayotganini tasdiqlash muhim." },
      { id: "c", text: "Faqat bitta status kodni (masalan, 200) tekshirib, qolganlarini o'tkazib yuborish", correct: false,
        explain: "Har bir status kod alohida stsenariyni ifodalaydi, faqat bittasini tekshirish yetarli emas." },
      { id: "d", text: "Sahifadagi rasm hajmini piksellarda o'lchash", correct: false,
        explain: "Bu status kod testiga aloqador emas." },
    ],
    mentorHints: [
      "Sahifadagi har bir havolani (200, 301, 404, 500) birma-bir bosing.",
      "Brauzeringizning developer tools (Network) bo'limidan haqiqiy HTTP status kodni tekshiring.",
      "Sahifadagi matn bilan haqiqiy status kod bir-biriga mos kelishini solishtiring.",
    ],
    groundTruth:
      "Status Codes sahifasi 200, 301, 404, 500 kabi turli HTTP status kodlarini simulyatsiya qiluvchi " +
      "havolalarni taqdim etadi. Har birini test qilishda nafaqat sahifadagi matnga, balki brauzer " +
      "developer tools orqali haqiqiy HTTP javob kodiga ham tayanish kerak — bu API/tarmoq darajasidagi " +
      "tekshiruvni UI testlash bilan birlashtiradi.",
  },

  {
    id: "ti-dynamic-loading",
    title: "The Internet: Dynamic Loading",
    domain: "web",
    difficulty: "medium",
    points: 28,
    targetUrl: "https://the-internet.herokuapp.com/dynamic_loading/2",
    targetName: "The Internet",
    mission:
      "Dynamic Loading (Example 2) sahifasini oching. 'Start' tugmasini bosing va yuklanish (loading) " +
      "jarayonidan keyin matn paydo bo'lishini kuzating.",
    taskPrompt: "Dinamik yuklanadigan elementni (masalan, AJAX orqali) avtomatlashtirilgan testda qanday kutish to'g'ri?",
    taskKind: "single",
    options: [
      { id: "a", text: "Element sahifada haqiqatan paydo bo'lishini kutuvchi aniq shart (explicit wait) qo'llash", correct: true,
        explain: "To'g'ri — bu eng barqaror yondashuv, chunki u haqiqiy holatga asoslanadi, taxminiy vaqtga emas." },
      { id: "b", text: "Doim 10 soniya qattiq kutish (sleep) qo'yish", correct: false,
        explain: "Qattiq kutish yoki keraksiz uzun (sekinlashtiradi) yoki yetarli emas (test barqaror bo'lmaydi) bo'lishi mumkin." },
      { id: "c", text: "Hech qanday kutishsiz darhol elementni tekshirishga urinish", correct: false,
        explain: "Element hali DOM'da yo'q bo'lganda darhol tekshirish testni muvaffaqiyatsizlikka uchratadi." },
      { id: "d", text: "Sahifani qayta-qayta yangilab, elementni tasodifan topishga harakat qilish", correct: false,
        explain: "Bu ishonchsiz va samarasiz yondashuv." },
    ],
    mentorHints: [
      "'Start' tugmasini bosing va yuklanish indikatori (spinner) qancha vaqt ko'rinishini kuzating.",
      "Matn paydo bo'lgandan keyin sahifa manba kodini (yoki DOM'ni) tekshiring — element avval mavjud emasmi?",
      "Avtomatlashtirishda 'element ko'rinadigan bo'lguncha kutish' kabi shart asosidagi kutish usullarini o'ylab ko'ring.",
    ],
    groundTruth:
      "Dynamic Loading Example 2'da 'Start' tugmasi bosilgach, element AJAX orqali asinxron ravishda " +
      "DOM'ga qo'shiladi (avval mavjud emas). Bunday holatlarni avtomatlashtirishda qattiq sleep() emas, " +
      "balki elementning haqiqiy mavjudligini/ko'rinishini kutuvchi aniq shart (explicit wait) qo'llash " +
      "kerak — bu flaky (beqaror) testlarning oldini oladi.",
  },

  {
    id: "ti-file-upload",
    title: "The Internet: fayl yuklash",
    domain: "web",
    difficulty: "medium",
    points: 27,
    targetUrl: "https://the-internet.herokuapp.com/upload",
    targetName: "The Internet",
    mission:
      "File Upload sahifasini oching. Avval fayl tanlamasdan 'Upload' tugmasini bosing, so'ng haqiqiy " +
      "faylni tanlab yuklang.",
    taskPrompt: "Fayl yuklash (file upload) funksiyasi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Fayl tanlanmagan holda 'Upload' bosilganda tizim to'g'ri xato/signal berishi", correct: true,
        explain: "Bo'sh holatni to'g'ri boshqarish — asosiy negative test holati." },
      { id: "b", text: "Fayl muvaffaqiyatli yuklangandan keyin fayl nomi natija sahifasida to'g'ri ko'rsatilishi", correct: true,
        explain: "Yuklangan faylning nomi/ma'lumoti tasdiqlanishi kerak — bu funksional to'g'rilik tekshiruvi." },
      { id: "c", text: "Turli fayl formatlari (matn, rasm) bilan yuklashni sinash", correct: true,
        explain: "Ilova qaysi fayl turlarini qo'llab-quvvatlashini aniqlash uchun turli formatlarni sinash kerak." },
      { id: "d", text: "Fayl nomining shrift turini tekshirish", correct: false,
        explain: "Bu vizual detal, funksional fayl yuklash testiga aloqador emas." },
    ],
    mentorHints: [
      "Hech qanday fayl tanlamasdan 'Upload' tugmasini bosing va natijani kuzating.",
      "Endi kompyuteringizdan haqiqiy faylni tanlab yuklang.",
      "Yuklangandan keyingi natija sahifasida fayl nomi to'g'ri ko'rsatilganini tekshiring.",
    ],
    groundTruth:
      "Fayl yuklash funksiyasini test qilishda bo'sh (fayl tanlanmagan) holatning to'g'ri boshqarilishi, " +
      "muvaffaqiyatli yuklashdan keyin fayl nomining to'g'ri ko'rsatilishi va turli fayl formatlarining " +
      "qo'llab-quvvatlanishi asosiy tekshiruv nuqtalari hisoblanadi. Fayl yuklash — real loyihalarda ko'p " +
      "xatolikka yo'l qo'yiladigan funksionallik.",
  },

  {
    id: "ti-basic-auth",
    title: "The Internet: Basic Auth",
    domain: "web",
    difficulty: "hard",
    points: 44,
    targetUrl: "https://the-internet.herokuapp.com/basic_auth",
    targetName: "The Internet",
    mission:
      "Basic Auth sahifasini oching. To'g'ridan-to'g'ri kirishga urinib ko'ring (login/parol so'raladi: " +
      "admin/admin), so'ng URL ichida login/parolni ko'rsatib kirishni sinang (masalan, " +
      "https://admin:admin@the-internet.herokuapp.com/basic_auth).",
    taskPrompt: "HTTP Basic Authentication'ni test qilishda qanday yondashuvlar to'g'ri?",
    taskKind: "multi",
    options: [
      { id: "a", text: "To'g'ri login/parol bilan (URL orqali yoki brauzer oynasi orqali) muvaffaqiyatli kirish mumkinligini tekshirish", correct: true,
        explain: "Bu — positive path, asosiy muvaffaqiyatli stsenariy." },
      { id: "b", text: "Noto'g'ri login/parol bilan kirish rad etilishini tekshirish", correct: true,
        explain: "Negative stsenariy — noto'g'ri ma'lumot bilan kirish imkoni bo'lmasligi kerak." },
      { id: "c", text: "Login/parolni URL manzilida ochiq ko'rsatishning xavfsizlik xatarini (masalan, brauzer tarixida, log fayllarida saqlanib qolishi) hisobga olish", correct: true,
        explain: "Basic Auth ma'lumotlarni oddiy Base64'da kodlaydi (shifrlamaydi) — bu xavfsizlik nuqtai nazaridan muhim kuzatish." },
      { id: "d", text: "Sahifaning fon rasmini tekshirish", correct: false,
        explain: "Bu autentifikatsiya testiga aloqador emas." },
    ],
    mentorHints: [
      "Sahifani to'g'ridan-to'g'ri ochishga urinib ko'ring — brauzer login/parol so'raydimi?",
      "URL ichiga to'g'ridan-to'g'ri login:parol@domen formatida kirib ko'ring.",
      "Noto'g'ri login/parol bilan urinib, tizim qanday rad etishini kuzating — bu Base64 kodlash (shifrlash emas) ekanini eslang.",
    ],
    groundTruth:
      "HTTP Basic Authentication login va parolni so'rov sarlavhasida Base64 formatida (shifrlamasdan) " +
      "yuboradi. To'g'ri ma'lumot bilan kirish muvaffaqiyatli, noto'g'ri bilan esa rad etilishi kerak. " +
      "QA/xavfsizlik nuqtai nazaridan Basic Auth'ning HTTPS'siz ishlatilishi yoki ma'lumotning URL'da " +
      "ochiq qolishi xavf tug'diradi — bu authentication mexanizmlarini baholashda muhim bilim.",
  },

  {
    id: "pb-invalid-login",
    title: "ParaBank: noto'g'ri login",
    domain: "banking",
    difficulty: "easy",
    points: 18,
    targetUrl: "https://parabank.parasoft.com/parabank/index.htm",
    targetName: "ParaBank",
    mission:
      "ParaBank saytida mavjud bo'lmagan foydalanuvchi nomi va parol bilan login qilishga urinib ko'ring.",
    taskPrompt: "Noto'g'ri login ma'lumotlari bilan kirishga urinilganda nima kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "'The username and password could not be verified.' turidagi umumiy xato xabari chiqadi", correct: true,
        explain: "To'g'ri — bank tizimlari odatda xavfsizlik uchun aniq 'foydalanuvchi mavjud emas' yoki 'parol xato' demasdan, umumiy xabar beradi." },
      { id: "b", text: "Tizim qaysi maydon (login yoki parol) xato ekanini aniq ko'rsatadi", correct: false,
        explain: "Aksincha — bank kabi nozik tizimlarda xavfsizlik sababli xato xabari ataylab umumiy qilib beriladi, bu orqali tajovuzkorga qo'shimcha ma'lumot berilmaydi." },
      { id: "c", text: "Foydalanuvchi baribir tizimga kiritiladi", correct: false,
        explain: "Bu jiddiy xavfsizlik nuqsoni bo'lardi." },
      { id: "d", text: "Sahifa xato bermasdan bo'sh dashboard ochadi", correct: false,
        explain: "Noto'g'ri ma'lumot bilan kirish imkoni bo'lmasligi kerak." },
    ],
    mentorHints: [
      "Login formasiga tasodifiy (mavjud bo'lmagan) foydalanuvchi nomi va parol kiriting.",
      "Xato xabarining aniq matnini o'qing — u qaysi maydon xato ekanini ko'rsatadimi yoki umumiymi?",
      "Bank tizimlarida xavfsizlik nuqtai nazaridan xato xabarlarining qanchalik 'ma'lumot bermasligi' muhimligini o'ylab ko'ring.",
    ],
    groundTruth:
      "ParaBank noto'g'ri login ma'lumotlari bilan kirishga urinilganda 'The username and password could " +
      "not be verified.' umumiy xato xabarini beradi — bu qaysi aniq maydon (login yoki parol) xato " +
      "ekanini oshkor qilmaydi. Bu — moliyaviy tizimlarda xavfsizlik va foydalanuvchi tajribasi o'rtasidagi " +
      "muvozanatga misol (user enumeration hujumlarining oldini olish).",
  },

  {
    id: "pb-register-required-fields",
    title: "ParaBank: ro'yxatdan o'tish majburiy maydonlar",
    domain: "banking",
    difficulty: "easy",
    points: 20,
    targetUrl: "https://parabank.parasoft.com/parabank/index.htm",
    targetName: "ParaBank",
    mission:
      "ParaBank'da 'Register' sahifasini oching va formani bo'sh holda yuborishga urinib ko'ring.",
    taskPrompt: "ParaBank ro'yxatdan o'tish formasida qaysi maydonlar majburiy hisoblanadi?",
    taskKind: "multi",
    options: [
      { id: "a", text: "First Name, Last Name, Address, City, State, Zip Code", correct: true,
        explain: "Shaxsiy va manzil ma'lumotlari to'liq to'ldirilishi shart — bu hisob ochish uchun zarur." },
      { id: "b", text: "Username va Password (hamda Confirm Password)", correct: true,
        explain: "Kirish ma'lumotlari majburiy va parol tasdiqlash maydoni bilan mos kelishi kerak." },
      { id: "c", text: "SSN (Social Security Number) maydoni", correct: true,
        explain: "Bank hisobini ochish uchun identifikatsiya raqami ham majburiy maydonlardan biri." },
      { id: "d", text: "Sevimli rang (Favorite Color) kabi ixtiyoriy so'rovnoma maydoni", correct: false,
        explain: "Bunday maydon formada umuman mavjud emas — bu chalg'ituvchi variant." },
    ],
    mentorHints: [
      "Register formasini hech narsa kiritmasdan yuborishga urinib ko'ring.",
      "Har bir maydon yonida qanday xato xabari chiqishini kuzating.",
      "Formani qismlarga bo'lib to'ldiring (avval shaxsiy ma'lumot, keyin login ma'lumoti) va har safar qaysi qism majburiy ekanini aniqlang.",
    ],
    groundTruth:
      "ParaBank ro'yxatdan o'tish formasi First Name, Last Name, Address, City, State, Zip Code, Phone, " +
      "SSN, Username, Password va Confirm Password kabi maydonlarning barchasini majburiy deb belgilaydi. " +
      "Har biri bo'sh qoldirilganda mos xato xabari chiqadi. Bu — ko'p maydonli, murakkab ro'yxatdan " +
      "o'tish formasini sistematik tarzda test qilish namunasi.",
  },

  {
    id: "pb-transfer-funds",
    title: "ParaBank: mablag' o'tkazish",
    domain: "banking",
    difficulty: "medium",
    points: 30,
    targetUrl: "https://parabank.parasoft.com/parabank/index.htm",
    targetName: "ParaBank",
    mission:
      "ParaBank'ga login qiling (demo hisob yarating yoki mavjud demo ma'lumotdan foydalaning) va " +
      "'Transfer Funds' sahifasini sinab ko'ring.",
    taskPrompt: "Transfer Funds funksiyasi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Hisobdagi mavjud balansdan ko'p summani o'tkazishga urinish (balansdan oshib ketish holati)", correct: true,
        explain: "Bu — muhim chegara/negativ holat: tizim balansdan ortiq mablag' o'tkazishga yo'l qo'ymasligi kerak (yoki kamida buni aniq ogohlantirishi kerak)." },
      { id: "b", text: "Bir xil hisobdan o'ziga o'tkazishga urinish (from = to)", correct: true,
        explain: "Bu mantiqiy jihatdan ma'nosiz operatsiya — tizim buni qanday boshqarishini tekshirish kerak." },
      { id: "c", text: "0 yoki manfiy summa bilan o'tkazishga urinish", correct: true,
        explain: "Chegara qiymatlari (BVA) — 0 yoki manfiy summalar bloklanishi kerak." },
      { id: "d", text: "O'tkazish tugmasining fon rangini tekshirish", correct: false,
        explain: "Bu funksional testga aloqador emas." },
    ],
    mentorHints: [
      "Ikki hisob orasida (yoki bir xil hisob ichida) mablag' o'tkazishga urinib ko'ring.",
      "Balansdan ko'proq summani o'tkazishga harakat qiling — tizim buni bloklaydimi yoki ruxsat beradimi?",
      "0 yoki manfiy summa kiritib, natijani kuzating — bu topgan narsangiz muhim QA kuzatuvi bo'lishi mumkin.",
    ],
    groundTruth:
      "Transfer Funds funksiyasini test qilishda balansdan ortiq summa o'tkazish, bir xil hisobga " +
      "o'tkazish va 0/manfiy summa bilan o'tkazish kabi chegara va mantiqiy holatlar tekshirilishi kerak. " +
      "Ba'zi demo tizimlar (jumladan ParaBank) bunday holatlarda kutilganidek qattiq validatsiya " +
      "qilmasligi mumkin — bu holatning o'zi QA hisobotida muhim kuzatuv (defekt nomzodi) sifatida qayd " +
      "etiladi.",
  },

  {
    id: "pb-open-new-account",
    title: "ParaBank: yangi hisob ochish",
    domain: "banking",
    difficulty: "medium",
    points: 26,
    targetUrl: "https://parabank.parasoft.com/parabank/index.htm",
    targetName: "ParaBank",
    mission:
      "Login qilgandan so'ng 'Open New Account' sahifasiga o'ting va mavjud hisob turlarini ko'rib chiqing.",
    taskPrompt: "ParaBank'da 'Open New Account' orqali qanday hisob turlarini ochish mumkin?",
    taskKind: "single",
    options: [
      { id: "a", text: "CHECKING va SAVINGS", correct: true,
        explain: "To'g'ri — ParaBank'da yangi hisob ochishda faqat shu ikki tur taklif etiladi." },
      { id: "b", text: "CHECKING, SAVINGS va CREDIT CARD", correct: false,
        explain: "Credit Card — bu yerda 'Open New Account' orqali ochiladigan hisob turi emas." },
      { id: "c", text: "Faqat SAVINGS", correct: false,
        explain: "CHECKING ham mavjud tanlov — bu javob to'liq emas." },
      { id: "d", text: "LOAN (kredit) hisobi", correct: false,
        explain: "Kredit — alohida funksiya (Request Loan), 'Open New Account' orqali ochiladigan oddiy hisob turi emas." },
    ],
    mentorHints: [
      "'Open New Account' sahifasini oching va dropdown menyudagi tanlovlarni ko'rib chiqing.",
      "Har bir hisob turi uchun qaysi mavjud hisobdan boshlang'ich mablag' talab qilinishini kuzating.",
      "Yangi hisob ochilgandan keyin u hisoblar ro'yxatida (Accounts Overview) ko'rinishini tekshiring.",
    ],
    groundTruth:
      "ParaBank'da 'Open New Account' funksiyasi orqali faqat CHECKING va SAVINGS turidagi hisoblarni " +
      "ochish mumkin, buning uchun mavjud hisoblardan biri manba sifatida tanlanadi. Kredit kabi boshqa " +
      "moliyaviy mahsulotlar alohida funksiyalar (masalan, Request Loan) orqali amalga oshiriladi. Mavjud " +
      "UI tanlovlarini to'g'ri hujjatlashtirish — test dizaynining boshlang'ich qadami.",
  },

  {
    id: "pb-bill-pay-validation",
    title: "ParaBank: Bill Pay formasi validatsiyasi",
    domain: "banking",
    difficulty: "hard",
    points: 44,
    targetUrl: "https://parabank.parasoft.com/parabank/index.htm",
    targetName: "ParaBank",
    mission:
      "Bill Pay (to'lov) sahifasini oching va formani turli xil noto'g'ri ma'lumotlar bilan (bo'sh " +
      "maydonlar, noto'g'ri formatdagi telefon/zip, juda katta summa) to'ldirib yuboring.",
    taskPrompt: "Bill Pay formasi uchun qaysi negativ test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Barcha majburiy maydonlar (Payee Name, Address, City, State, Zip Code, Phone, Account, Amount) bo'sh qoldirilgan holatni tekshirish", correct: true,
        explain: "Standart forma validatsiyasi — har bir majburiy maydon alohida sinalishi kerak." },
      { id: "b", text: "Amount (summa) maydoniga harf yoki maxsus belgi kiritilgan holatni tekshirish", correct: true,
        explain: "Raqam kutilgan maydonga matn kiritilganda tizim buni qanday boshqarishini bilish muhim." },
      { id: "c", text: "Balansdan ko'p summa bilan to'lov qilishga urinishni tekshirish", correct: true,
        explain: "Bu — moliyaviy operatsiyalarda muhim chegara holati, xuddi Transfer Funds'dagi kabi." },
      { id: "d", text: "Faqat bitta maydonni (masalan, Payee Name) tekshirib, qolganlarini o'tkazib yuborish", correct: false,
        explain: "Har bir maydon alohida validatsiya mantig'iga ega bo'lishi mumkin, faqat bittasini tekshirish yetarli emas." },
    ],
    mentorHints: [
      "Bill Pay formasini bo'sh holda yuborishga urinib ko'ring va qaysi maydonlar majburiy ekanini aniqlang.",
      "Amount maydoniga raqam o'rniga harf yoki bo'sh joy kiritib ko'ring.",
      "Mavjud balansdan sezilarli darajada ko'p summa bilan to'lovga urinib, tizim reaksiyasini kuzating.",
    ],
    groundTruth:
      "Bill Pay formasi ko'p maydonli moliyaviy operatsiya bo'lib, uni test qilishda majburiy maydonlar " +
      "validatsiyasi, raqamli maydonlarga noto'g'ri turdagi ma'lumot kiritish va balansdan ortiq summa " +
      "bilan to'lov qilishga urinish kabi holatlar muhim. Moliyaviy formalarni test qilish — noto'g'ri " +
      "operatsiyaning oldini olish tizim ishonchliligi uchun kritik ahamiyatga ega.",
  },

  {
    id: "js-registration-password-mismatch",
    title: "Juice Shop: parolni tasdiqlash nomosligi",
    domain: "web",
    difficulty: "easy",
    points: 20,
    targetUrl: "https://juice-shop.herokuapp.com",
    targetName: "OWASP Juice Shop",
    mission:
      "Juice Shop'da ro'yxatdan o'tish formasini oching. Password va Repeat Password maydonlariga har xil " +
      "qiymat kiritib yuborishga urinib ko'ring.",
    taskPrompt: "Password va Repeat Password bir-biriga mos kelmasa nima kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Forma yuborilmaydi va parollar mos kelmasligi haqida xato xabari chiqadi", correct: true,
        explain: "To'g'ri — parolni tasdiqlash maydoni asosiy parol bilan aynan bir xil bo'lishini talab qiladi, aks holda forma rad etiladi." },
      { id: "b", text: "Ikkinchi kiritilgan (Repeat Password) qiymat asosiy parol sifatida saqlanadi", correct: false,
        explain: "Bunday avtomatik almashtirish yo'q — mos kelmaslik xato sifatida ko'rsatiladi." },
      { id: "c", text: "Ikkala qiymat ham e'tiborsiz qoldirilib, bo'sh parol saqlanadi", correct: false,
        explain: "Bo'sh parol xavfsizlik nuqtai nazaridan qabul qilib bo'lmaydi, forma rad etiladi." },
      { id: "d", text: "Ro'yxatdan o'tish parolsiz yakunlanadi", correct: false,
        explain: "Parol maydonlarining ikkalasi ham to'g'ri va bir xil bo'lishi shart bo'lgan majburiy maydonlar." },
    ],
    mentorHints: [
      "Registration formasini oching va Email/Security Question kabi boshqa maydonlarni to'g'ri to'ldiring.",
      "Password va Repeat Password maydonlariga ataylab har xil qiymat kiriting.",
      "Forma yuborishga urinib, xato xabarining aniq matnini o'qing.",
    ],
    groundTruth:
      "Juice Shop registratsiya formasida Password va Repeat Password maydonlari bir-biriga mos kelishi " +
      "shart — mos kelmasa forma yuborilmaydi va tegishli xato xabari ko'rsatiladi. Bu — parolni ikki " +
      "marta kiritish orqali xatolarni oldini olishga qaratilgan keng tarqalgan UX/validatsiya patterni.",
  },

  {
    id: "js-search-empty-results",
    title: "Juice Shop: qidiruv — natija topilmadi",
    domain: "web",
    difficulty: "medium",
    points: 26,
    targetUrl: "https://juice-shop.herokuapp.com",
    targetName: "OWASP Juice Shop",
    mission:
      "Juice Shop'da qidiruv (lupa ikonkasi) orqali mavjud bo'lmagan mahsulot nomini (masalan, tasodifiy " +
      "harflar to'plami) qidiring.",
    taskPrompt: "Hech qanday mahsulotga mos kelmaydigan so'rov bilan qidirilganda nima kutiladi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Mahsulotlar ro'yxati bo'sh ko'rsatiladi va bu holat foydalanuvchiga tushunarli tarzda bildiriladi", correct: true,
        explain: "Yaxshi ilova 'natija yo'q' holatini xatolik sifatida emas, balki tushunarli bo'sh holat sifatida ko'rsatishi kerak." },
      { id: "b", text: "Ilova xato bilan ishdan chiqadi", correct: false,
        explain: "Natija topilmasligi kutilgan holat, ilova buzilmasligi kerak." },
      { id: "c", text: "Barcha mahsulotlar baribir ko'rsatiladi (filtr e'tiborsiz qoldiriladi)", correct: false,
        explain: "Bu qidiruv funksiyasining butunlay ishlamayotganini anglatadi — noto'g'ri xatti-harakat." },
      { id: "d", text: "Sahifa cheksiz aylanuvchi yuklanish belgisini (loading spinner) ko'rsatib qoladi", correct: false,
        explain: "Qidiruv natijasi (bo'sh bo'lsa ham) oxir-oqibat ko'rsatilishi kerak, abadiy yuklanib turmasligi kerak." },
    ],
    mentorHints: [
      "Qidiruv maydoniga tasodifiy, hech qanday mahsulotga mos kelmaydigan so'z kiriting.",
      "Sahifada qanday holat ko'rsatilishini kuzating — mahsulotlar ro'yxati nima bo'ladi?",
      "Bo'sh natija holatini funksional xato bilan aralashtirmang — bu kutilgan, to'g'ri xatti-harakat bo'lishi mumkin.",
    ],
    groundTruth:
      "Qidiruv funksiyasida mos natija topilmagan holatni to'g'ri boshqarish muhim — mahsulotlar ro'yxati " +
      "shunchaki bo'shashi va bu foydalanuvchiga tushunarli bo'lishi kerak (xato emas). Bu — 'bo'sh holat' " +
      "(empty state) dizaynini funksional test nuqtai nazaridan tekshirishga misol.",
  },

  {
    id: "js-basket-quantity",
    title: "Juice Shop: savat miqdori",
    domain: "web",
    difficulty: "medium",
    points: 28,
    targetUrl: "https://juice-shop.herokuapp.com",
    targetName: "OWASP Juice Shop",
    mission:
      "Juice Shop'da mahsulotni savatga qo'shing va 'Your Basket' sahifasida miqdorni oshirib/kamaytirib " +
      "ko'ring, so'ng mahsulotni butunlay olib tashlang.",
    taskPrompt: "Savat (basket) miqdori funksiyasi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Miqdor oshirilganda umumiy narx (jami summa) to'g'ri qayta hisoblanishi", correct: true,
        explain: "Narx × miqdor hisobi har doim to'g'ri bo'lishi kerak — bu asosiy biznes mantiqi." },
      { id: "b", text: "Miqdorni eng past qiymatga (masalan, 1) kamaytirgandan keyin yana kamaytirishga urinilganda mahsulot to'g'ri olib tashlanishi yoki bloklanishi", correct: true,
        explain: "Chegara holati — miqdor 0 yoki undan kam bo'lolmasligi, tizim buni qanday boshqarishini tekshirish kerak." },
      { id: "c", text: "Mahsulotni savatdan butunlay olib tashlagandan keyin savat ro'yxati va umumiy summa to'g'ri yangilanishi", correct: true,
        explain: "O'chirishdan keyin holat to'liq va to'g'ri yangilanishi shart." },
      { id: "d", text: "Savat sahifasining orqa fon rasmi sifatini tekshirish", correct: false,
        explain: "Bu funksional savat testiga aloqador emas." },
    ],
    mentorHints: [
      "Mahsulotni savatga qo'shib, miqdorni bir necha marta oshiring — jami summa to'g'ri o'zgaryaptimi?",
      "Miqdorni eng kam qiymatgacha kamaytirib, undan pastga tushirishga urinib ko'ring.",
      "Mahsulotni savatdan butunlay olib tashlab, ro'yxat va umumiy summaning to'g'ri yangilanishini tekshiring.",
    ],
    groundTruth:
      "Savat miqdorini test qilishda narx × miqdor hisobining to'g'riligi, minimal miqdor chegarasi (0 " +
      "yoki undan past bo'lishining oldini olish) va mahsulotni to'liq olib tashlagandan keyin holatning " +
      "to'g'ri yangilanishi asosiy tekshiruv nuqtalari. Bu — Boundary Value Analysis va state management " +
      "testlarining birlashuvi.",
  },

  {
    id: "js-login-generic-error",
    title: "Juice Shop: login xato xabari",
    domain: "web",
    difficulty: "hard",
    points: 46,
    targetUrl: "https://juice-shop.herokuapp.com",
    targetName: "OWASP Juice Shop",
    mission:
      "Juice Shop login sahifasida ikki xil noto'g'ri stsenariyni sinang: (1) mavjud email + noto'g'ri " +
      "parol, (2) umuman ro'yxatdan o'tmagan email. Ikkala holatdagi xato xabarlarini solishtiring.",
    taskPrompt: "Xavfsizlik nuqtai nazaridan login xato xabarlari qanday bo'lishi to'g'ri deb hisoblanadi?",
    taskKind: "single",
    options: [
      { id: "a", text: "Ikkala holatda (mavjud email+xato parol va mavjud bo'lmagan email) ham bir xil, umumiy xato xabari ('Invalid email or password') ko'rsatilishi kerak", correct: true,
        explain: "To'g'ri — agar xabar farqlansa, tajovuzkor qaysi email manzillari tizimda ro'yxatdan o'tgani haqida ma'lumot to'plashi mumkin (user enumeration hujumi)." },
      { id: "b", text: "Xato xabari aniq 'bu email ro'yxatdan o'tmagan' yoki 'parol xato' deb ko'rsatilishi kerak, chunki bu foydalanuvchiga qulay", correct: false,
        explain: "Bu qulaylik xavfsizlik narxiga tushadi — tajovuzkor bu orqali qaysi email manzillar mavjudligini aniqlab, keyingi hujumlarni (masalan, parol tanlash) osonlashtirishi mumkin." },
      { id: "c", text: "Ikkala holatda ham hech qanday xabar chiqmasligi kerak", correct: false,
        explain: "Foydalanuvchiga signal berilishi shart, aks holda u nima sodir bo'lganini bilolmaydi — bu yomon UX." },
      { id: "d", text: "Xato xabari tasodifiy har safar boshqacha bo'lishi kerak", correct: false,
        explain: "Xato xabarlari izchil (consistent) bo'lishi kerak, tasodifiylik chalkashlik keltirib chiqaradi." },
    ],
    mentorHints: [
      "Mavjud (ro'yxatdan o'tgan) email bilan, lekin noto'g'ri parol kiriting va xato xabarini yozib oling.",
      "Endi umuman mavjud bo'lmagan email bilan urinib ko'ring va xabarni solishtiring.",
      "Ikkala xabar bir xil ekanligi — bu ataylab qilingan xavfsizlik dizayni, 'user enumeration' hujumlarining oldini olish uchun.",
    ],
    groundTruth:
      "Juice Shop login sahifasi ikkala negativ holatda (noto'g'ri parol va mavjud bo'lmagan email) ham " +
      "bir xil umumiy xato xabarini ('Invalid email or password.') ko'rsatadi. Bu — user enumeration " +
      "(foydalanuvchi mavjudligini aniqlash) hujumlarining oldini oluvchi xavfsizlik amaliyoti. QA sifatida " +
      "bunday xato xabarlarining izchilligini tekshirish — funksional va xavfsizlik testlarining " +
      "kesishgan nuqtasi.",
  },

  {
    id: "js-feedback-form-rating",
    title: "Juice Shop: fikr-mulohaza (feedback) formasi",
    domain: "web",
    difficulty: "hard",
    points: 42,
    targetUrl: "https://juice-shop.herokuapp.com",
    targetName: "OWASP Juice Shop",
    mission:
      "Juice Shop'da 'Customer Feedback' (fikr-mulohaza) sahifasini toping. Reyting (yulduzcha) " +
      "tanlamasdan va bo'sh sharh bilan yuborishga urinib ko'ring, so'ng to'liq to'ldirib yuboring.",
    taskPrompt: "Feedback formasi uchun qaysi test holatlari muhim?",
    taskKind: "multi",
    options: [
      { id: "a", text: "Reyting (yulduzcha) tanlanmasdan forma yuborilishga urinilganda tizim buni talab qilishi", correct: true,
        explain: "Reyting — fikr-mulohazaning asosiy qismi, uni tanlamasdan yuborishga yo'l qo'yilmasligi kerak." },
      { id: "b", text: "Sharh matni bo'sh qoldirilganda tizimning xatti-harakatini tekshirish (majburiymi yoki ixtiyoriymi)", correct: true,
        explain: "Sharh matni maydonining majburiy yoki ixtiyoriy ekanini aniqlash — forma qoidalarini hujjatlashtirish uchun muhim." },
      { id: "c", text: "Juda uzun matn (belgilar chegarasidan oshib ketuvchi) kiritilganda forma qanday reaksiya berishini tekshirish", correct: true,
        explain: "Maydonlar odatda maksimal uzunlik chegarasiga ega bo'ladi — bu chegara qiymatini sinash kerak." },
      { id: "d", text: "Formaning fon rangini pixel darajasida tekshirish", correct: false,
        explain: "Bu vizual detal, funksional forma validatsiyasiga aloqador emas." },
    ],
    mentorHints: [
      "Feedback sahifasini toping va reyting tanlamasdan yuborishga urinib ko'ring.",
      "Sharh maydonini bo'sh qoldirib, faqat reyting bilan yuborishga harakat qiling.",
      "Sharh maydoniga juda uzun matn (masalan, bir necha yuz belgidan iborat) kiritib, tizim reaksiyasini kuzating.",
    ],
    groundTruth:
      "Feedback formasida reyting (yulduzcha) tanlash majburiyligi, sharh matnining majburiy/ixtiyoriyligi " +
      "va maksimal uzunlik chegarasi asosiy tekshiriladigan validatsiya qoidalari. Bu — foydalanuvchi " +
      "tomonidan yaratiladigan kontent formalarini Boundary Value Analysis va majburiy maydon " +
      "tekshiruvlari orqali sinovdan o'tkazish namunasi.",
  },
];

