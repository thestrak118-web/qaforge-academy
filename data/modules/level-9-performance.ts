// data/modules/level-9-performance.ts
//
// LEVEL 9 — Performance Testing
// 10 theory + 1 practical + 1 quiz = 12 sections

import type { Module } from "../lessons";

export const LEVEL_9: Module = {
  id: "performance-testing",
  icon: "⚡",
  title: "Level 9 — Performance Testing",
  summary:
    "Tizim yuklama ostida qanday ishlaydi: load, stress, spike testlar, JMeter, k6, metrikalar va bottleneck tahlili.",
  level: "junior",
  sections: [
    {
      id: "l9-01-performance-basics",
      title: "Performance Testing — asoslar",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Performance testing — tizim QANCHALIK TEZ va QANCHA YUKLAMA ostida ishlashini tekshirish. Funksiya ishlashi yetarli emas — u tez va barqaror ishlashi ham kerak." },
        { type: "h", text: "Nega muhim" },
        { type: "table", head: ["Fakt", "Ta'siri"], rows: [
          ["Sahifa 3 soniyadan uzoq yuklansa", "Foydalanuvchilarning ~50% i ketadi"],
          ["1 soniya kechikish", "Konversiya ~7% pasayadi"],
          ["Qora juma / aksiya", "Yuklama 10-100 barobar oshadi"],
          ["Sayt yiqilishi", "Katta moliyaviy va obro' zarari"],
        ]},
        { type: "h", text: "Performance testing turlari" },
        { type: "table", head: ["Tur", "Nima tekshiradi"], rows: [
          ["Load", "Kutilgan yuklama ostida normal ishlaydimi?"],
          ["Stress", "Chegaradan oshganda nima bo'ladi?"],
          ["Spike", "Yuklama birdan keskin oshganda?"],
          ["Endurance / Soak", "Uzoq vaqt ishlaganda buziladimi?"],
          ["Scalability", "Resurs qo'shilsa unumdorlik oshadimi?"],
          ["Volume", "Katta hajmli ma'lumot bilan ishlaydimi?"],
        ]},
        { type: "warn", text: "Performance testni PRODUCTION'da o'tkazmang! Bu haqiqiy foydalanuvchilarga ta'sir qiladi va saytni yiqitishi mumkin. Faqat staging yoki maxsus test muhitida." },
        { type: "key", text: "Performance testing — tezlik va yuklama chidamliligi. Load, Stress, Spike, Endurance — asosiy turlari." },
      ],
    },

    {
      id: "l9-02-load-testing",
      title: "Load Testing",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Load testing — tizim KUTILGAN, normal yuklama ostida to'g'ri ishlashini tekshirish. Bu eng ko'p o'tkaziladigan performance test." },
        { type: "h", text: "Maqsad" },
        { type: "list", items: [
          "Normal yuklamada javob vaqti maqbulmi?",
          "Barcha so'rovlar muvaffaqiyatli bajariladimi (xato yo'q)?",
          "Server resurslari (CPU, xotira) me'yordami?",
          "Ma'lumot bazasi bardosh beradimi?",
        ]},
        { type: "h", text: "Qanday rejalashtiriladi" },
        { type: "code", text: `1. Kutilgan yuklamani aniqlang
   Masalan: kuniga 10 000 foydalanuvchi
   Eng band vaqt: soatiga 2 000 → sekundiga ~0.5 foydalanuvchi

2. Ssenariylarni belgilang
   • 60% mahsulot ko'radi
   • 30% qidiradi
   • 10% xarid qiladi

3. Mezonlarni belgilang (Acceptance Criteria)
   • Javob vaqti: 95% so'rov < 2 soniya
   • Xato darajasi: < 1%
   • CPU: < 70%` },
        { type: "example", text: "Onlayn do'kon uchun load test:\n\nSharoit: 500 foydalanuvchi bir vaqtda, 30 daqiqa davomida.\n\nNatija:\n✅ O'rtacha javob vaqti: 1.2s (mezon: <2s)\n✅ Xato darajasi: 0.3% (mezon: <1%)\n❌ Checkout sahifasi: 4.5s (mezon buzildi!)\n\n→ Bug: checkout sahifasi normal yuklamada ham sekin." },
        { type: "key", text: "Load testing — kutilgan, normal yuklama ostida test. Javob vaqti, xato darajasi va resurs iste'molini tekshiradi." },
      ],
    },

    {
      id: "l9-03-stress-testing",
      title: "Stress Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Stress testing — tizimni CHEGARADAN OSHIRIB, sinish nuqtasini topish. Maqsad: 'qachon va qanday yiqiladi?' degan savolga javob berish." },
        { type: "h", text: "Nima aniqlanadi" },
        { type: "list", items: [
          "Maksimal sig'im — nechta foydalanuvchini ko'taradi?",
          "Sinish nuqtasi — qachon yiqiladi?",
          "Qanday yiqiladi — chiroyli (xato xabari) yoki halokatli (ma'lumot yo'qoladi)?",
          "Tiklanish — yuklama kamayganda o'ziga keladimi?",
        ]},
        { type: "h", text: "Load va Stress farqi" },
        { type: "table", head: ["", "Load", "Stress"], rows: [
          ["Yuklama", "Kutilgan, normal", "Chegaradan oshgan"],
          ["Maqsad", "Normal ishlashini tasdiqlash", "Sinish nuqtasini topish"],
          ["Kutilgan natija", "Hammasi ishlaydi", "Tizim yiqilishi mumkin (bu normal)"],
        ]},
        { type: "h", text: "Eng muhim savol: qanday yiqiladi?" },
        { type: "example", text: "✅ YAXSHI (graceful degradation):\nTizim ko'tara olmaydigan yuklamada foydalanuvchiga 'Serverlar band, keyinroq urinib ko'ring' deb ko'rsatadi. Ma'lumot yo'qolmaydi. Yuklama kamayganda o'ziga keladi.\n\n❌ YOMON:\nTizim yiqiladi, ma'lumot bazasi buziladi, yarim bajarilgan buyurtmalar qoladi, qayta ishga tushirish kerak.\n\nQA aynan shu farqni tekshiradi." },
        { type: "key", text: "Stress testing — sinish nuqtasini topish. Eng muhimi: tizim CHIROYLI yiqiladimi va o'ziga keladimi?" },
      ],
    },

    {
      id: "l9-04-spike-testing",
      title: "Spike Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Spike testing — yuklama BIRDAN keskin oshganda tizim qanday munosabat bildirishini tekshirish." },
        { type: "h", text: "Qachon bo'ladi" },
        { type: "list", items: [
          "TV reklama efirga chiqdi → minglab odam bir vaqtda kirdi",
          "Qora juma / aksiya boshlandi",
          "Chipta sotuvi ochildi (konsert, poyezd)",
          "Viral post — sayt havolasi tarqaldi",
          "Imtihon natijalari e'lon qilindi",
        ]},
        { type: "h", text: "Load va Spike farqi" },
        { type: "code", text: `LOAD (asta-sekin):
foydalanuvchilar
  500 |        ────────────
      |      ╱
      |    ╱
    0 |──╱
      └──────────────────► vaqt

SPIKE (birdan):
foydalanuvchilar
 5000 |     ┌────┐
      |     │    │
      |     │    │
    0 |─────┘    └───────► vaqt` },
        { type: "h", text: "Nima tekshiriladi" },
        { type: "list", items: [
          "Tizim keskin o'sishga bardosh beradimi?",
          "Avtomatik masshtablash (auto-scaling) ishlaydimi va qanchalik tez?",
          "Yuklama tushgach normal holatga qaytadimi?",
          "Spike paytida ma'lumot yo'qolmaydimi?",
          "Navbat (queue) tizimi ishlaydimi?",
        ]},
        { type: "key", text: "Spike testing — birdan keskin yuklama. Auto-scaling va tiklanishni tekshiradi. Aksiya/reklama uchun kritik." },
      ],
    },

    {
      id: "l9-05-endurance-testing",
      title: "Endurance (Soak) Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Endurance testing — tizimni UZOQ VAQT (soatlab, kunlab) normal yuklama ostida ishlatib, asta-sekin yig'iladigan muammolarni topish." },
        { type: "h", text: "Qanday muammolarni topadi" },
        { type: "table", head: ["Muammo", "Izoh"], rows: [
          ["Memory leak", "Xotira asta-sekin to'lib boradi → tizim sekinlashadi va yiqiladi"],
          ["Connection leak", "Ma'lumot bazasi ulanishlari yopilmaydi → tugab qoladi"],
          ["Disk to'lishi", "Loglar cheksiz o'sadi → disk tugaydi"],
          ["Unumdorlik pasayishi", "Vaqt o'tgan sari sekinlashadi"],
          ["Kesh muammosi", "Kesh cheksiz o'sadi"],
        ]},
        { type: "h", text: "Memory leak — klassik topilma" },
        { type: "example", text: "Endurance test: 100 foydalanuvchi, 8 soat davomida.\n\nKuzatuv:\n• 1-soat: xotira 500 MB, javob vaqti 1.0s\n• 4-soat: xotira 1.8 GB, javob vaqti 1.5s\n• 7-soat: xotira 3.5 GB, javob vaqti 4.2s\n• 8-soat: server yiqildi ❌\n\n→ Memory leak! Xotira asta-sekin to'lib bordi va tizim yiqildi.\n\nBu bug'ni faqat uzoq test topadi — 30 daqiqalik load test uni ko'rmaydi." },
        { type: "warn", text: "Bu bug'lar ENG XAVFLI — chunki ular test muhitida (qisqa testlarda) ko'rinmaydi, lekin production'da bir necha kundan keyin yiqilishga olib keladi." },
        { type: "key", text: "Endurance — uzoq vaqt test (soatlab). Memory leak, connection leak, disk to'lishini topadi. Qisqa test bularni ko'rmaydi." },
      ],
    },

    {
      id: "l9-06-jmeter",
      title: "JMeter",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Apache JMeter — eng keng tarqalgan bepul performance testing asbobi. Grafik interfeysi bor, kod yozish shart emas." },
        { type: "h", text: "Xususiyatlari" },
        { type: "table", head: ["Jihat", "Izoh"], rows: [
          ["Narxi", "Bepul, ochiq kodli"],
          ["Interfeys", "Grafik (GUI) — kod yozish shart emas"],
          ["Protokollar", "HTTP, HTTPS, SOAP, REST, FTP, JDBC, JMS"],
          ["Hisobot", "Grafik va jadval ko'rinishida"],
          ["Kamchilik", "Ko'p resurs talab qiladi, GUI sekin"],
        ]},
        { type: "h", text: "Asosiy elementlar" },
        { type: "table", head: ["Element", "Nima qiladi"], rows: [
          ["Thread Group", "Nechta virtual foydalanuvchi, qancha vaqt"],
          ["HTTP Request", "Yuboriladigan so'rov"],
          ["Listener", "Natijalarni ko'rsatadi (grafik, jadval)"],
          ["Assertion", "Javobni tekshiradi"],
          ["Timer", "So'rovlar orasida kutish"],
          ["Config Element", "Umumiy sozlamalar (baseUrl, header)"],
        ]},
        { type: "h", text: "Oddiy test rejasi" },
        { type: "code", text: `Test Plan
  └── Thread Group (100 foydalanuvchi, 60 soniya)
        ├── HTTP Request: GET /products
        ├── HTTP Request: GET /products/5
        ├── Assertion: Status = 200
        └── Listener: Summary Report` },
        { type: "warn", text: "MUHIM: JMeter'ni GUI rejimida faqat test yozish uchun ishlating. Haqiqiy testni terminal (CLI) rejimida ishga tushiring — GUI ko'p resurs yeydi va natijani buzadi.\n\njmeter -n -t test.jmx -l natija.jtl" },
        { type: "key", text: "JMeter — bepul, GUI'li performance asbobi. Test yozishda GUI, ishga tushirishda CLI ishlating." },
      ],
    },

    {
      id: "l9-07-k6",
      title: "k6",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "k6 — zamonaviy performance testing asbobi. Testlar JavaScript'da yoziladi, juda yengil va CI/CD'ga oson ulanadi." },
        { type: "h", text: "JMeter'dan farqi" },
        { type: "table", head: ["", "JMeter", "k6"], rows: [
          ["Test yozish", "GUI (klikllab)", "JavaScript kod"],
          ["Resurs", "Ko'p (Java)", "Kam (Go)"],
          ["CI/CD", "Murakkabroq", "Juda oson"],
          ["Versiya nazorati", "XML fayl (o'qish qiyin)", "JS fayl (git bilan qulay)"],
          ["O'rganish", "GUI oson", "Kod bilish kerak"],
        ]},
        { type: "h", text: "Oddiy k6 testi" },
        { type: "code", text: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },   // 50 foydalanuvchigacha o'sish
    { duration: '1m',  target: 50 },   // 50 da ushlab turish
    { duration: '30s', target: 0 },    // 0 gacha tushish
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% so'rov < 2s
    http_req_failed:   ['rate<0.01'],   // xato < 1%
  },
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');

  check(res, {
    'status 200': (r) => r.status === 200,
    'javob < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}` },
        { type: "code", text: `# Ishga tushirish
k6 run test.js

# Ko'proq foydalanuvchi bilan
k6 run --vus 100 --duration 60s test.js` },
        { type: "tip", text: "Thresholds (chegaralar) — k6'ning kuchli tomoni. Agar mezon buzilsa, test AVTOMATIK yiqiladi. Bu CI/CD uchun ideal." },
        { type: "key", text: "k6 — JavaScript'da yoziladigan zamonaviy performance asbobi. Yengil, CI/CD'ga oson ulanadi, thresholds bilan." },
      ],
    },

    {
      id: "l9-08-metrics",
      title: "Metrics — o'lchamlar",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Performance testda raqamlarni to'g'ri o'qish — eng muhim ko'nikma. Noto'g'ri metrikaga qarab noto'g'ri xulosa chiqarish oson." },
        { type: "h", text: "Asosiy metrikalar" },
        { type: "table", head: ["Metrika", "Ma'nosi"], rows: [
          ["Response Time", "So'rovdan javobgacha o'tgan vaqt"],
          ["Throughput", "Sekundiga nechta so'rov bajarildi (RPS)"],
          ["Error Rate", "Xato bilan tugagan so'rovlar foizi"],
          ["Concurrent Users", "Bir vaqtda faol foydalanuvchilar soni"],
          ["CPU / Memory", "Server resurs iste'moli"],
          ["Latency", "Tarmoq kechikishi"],
        ]},
        { type: "h", text: "⚠️ O'rtacha (average) — ALDAMCHI!" },
        { type: "example", text: "10 ta so'rov javob vaqti:\n0.1s, 0.1s, 0.1s, 0.1s, 0.1s, 0.1s, 0.1s, 0.1s, 0.1s, 10s\n\nO'RTACHA: 1.09s → 'yaxshi ko'rinadi' ✅\n\nLekin bitta foydalanuvchi 10 SONIYA kutdi! ❌\n\nO'rtacha bu muammoni yashiradi." },
        { type: "h", text: "Percentile — to'g'ri usul" },
        { type: "table", head: ["Metrika", "Ma'nosi"], rows: [
          ["p50 (median)", "So'rovlarning 50% i bundan tez"],
          ["p90", "90% i bundan tez (10% sekinroq)"],
          ["p95", "95% i bundan tez — eng ko'p ishlatiladi"],
          ["p99", "99% i bundan tez — eng yomon holatlar"],
        ]},
        { type: "example", text: "Yaxshi mezon:\n\n❌ 'O'rtacha javob vaqti < 2s'  (aldamchi)\n✅ 'p95 javob vaqti < 2s'  (95% foydalanuvchi 2s dan tez oladi)\n✅ 'p99 javob vaqti < 5s'  (eng yomon holatda ham 5s)" },
        { type: "warn", text: "OLTIN QOIDA: performance mezonlarini HAR DOIM percentile'da yozing, o'rtachada emas. O'rtacha muammolarni yashiradi." },
        { type: "key", text: "O'rtacha ALDAYDI. Percentile (p95, p99) ishlating. Throughput, error rate va resurs iste'molini ham kuzating." },
      ],
    },

    {
      id: "l9-09-bottlenecks",
      title: "Bottlenecks — to'siqlarni topish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Bottleneck (to'siq) — tizimning eng sekin joyi, butun unumdorlikni cheklovchi qism. Zanjir eng zaif halqasi qadar kuchli." },
        { type: "h", text: "Eng ko'p uchraydigan to'siqlar" },
        { type: "table", head: ["To'siq", "Belgisi", "Yechim"], rows: [
          ["Ma'lumot bazasi", "So'rovlar sekin, DB CPU yuqori", "Indeks qo'shish, so'rovni optimallashtirish"],
          ["N+1 query", "Bitta sahifa yuzlab DB so'rov yuboradi", "Ma'lumotni birga olish (JOIN)"],
          ["Sekin API", "Tashqi xizmat sekin javob beradi", "Kesh, timeout, asinxron"],
          ["CPU", "Server CPU 100%", "Kodni optimallashtirish, ko'proq server"],
          ["Xotira", "RAM to'lgan, swap ishlayapti", "Memory leak topish, ko'proq RAM"],
          ["Tarmoq", "Katta fayllar, ko'p so'rov", "Siqish, CDN, so'rovlarni birlashtirish"],
          ["Ulanishlar", "DB connection pool tugagan", "Pool hajmini oshirish, ulanishni yopish"],
        ]},
        { type: "h", text: "Qanday topiladi" },
        { type: "list", items: [
          "Yuklamani asta-sekin oshiring va qaysi metrika birinchi yomonlashishini kuzating",
          "Server monitoring (CPU, RAM, disk, tarmoq) ni kuzating",
          "DB so'rovlar logini tekshiring — sekin so'rovlar bormi?",
          "APM asboblari (New Relic, Datadog) bilan qaysi funksiya sekinligini toping",
          "So'rovlar sonini sanang — N+1 muammosi bormi?",
        ]},
        { type: "example", text: "N+1 muammosi — klassik topilma:\n\nMahsulotlar sahifasi 50 ta mahsulot ko'rsatadi.\n\nDB loglarini ko'rsangiz:\n• 1 ta so'rov: mahsulotlarni olish\n• 50 ta so'rov: har mahsulotning kategoriyasini olish\n\n= 51 ta so'rov! (1 ta bo'lishi kerak edi)\n\nBu sahifani juda sekinlashtiradi. QA buni topib, bug sifatida yozishi kerak." },
        { type: "key", text: "Bottleneck — eng sekin joy. DB (N+1!), CPU, xotira, tarmoq — eng ko'p uchraydigan to'siqlar." },
      ],
    },

    {
      id: "l9-10-reports",
      title: "Performance hisoboti",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Performance hisoboti — natijalarni biznes tushunadigan tilda ko'rsatish. Raqamlar emas, XULOSA muhim." },
        { type: "h", text: "Hisobot tuzilmasi" },
        { type: "table", head: ["Bo'lim", "Nima yoziladi"], rows: [
          ["Maqsad", "Nima test qilindi va nega"],
          ["Sharoit", "Nechta foydalanuvchi, qancha vaqt, qaysi muhit"],
          ["Mezonlar", "Qanday natija maqbul deb hisoblangan (p95 < 2s)"],
          ["Natijalar", "Metrikalar (p95, p99, throughput, error rate)"],
          ["Xulosa", "Mezon bajarildimi? ✅/❌"],
          ["Topilgan muammolar", "Bottleneck'lar va bug'lar"],
          ["Tavsiyalar", "Nima qilish kerak"],
        ]},
        { type: "h", text: "Namuna xulosa" },
        { type: "example", text: "PERFORMANCE TEST XULOSASI\n\nSharoit: 500 foydalanuvchi, 30 daqiqa, staging muhiti\n\nNATIJALAR:\n✅ Bosh sahifa: p95 = 1.1s (mezon: <2s)\n✅ Mahsulotlar: p95 = 1.6s (mezon: <2s)\n❌ Qidiruv: p95 = 4.8s (mezon: <2s) — MEZON BUZILDI\n❌ Checkout: p95 = 6.2s (mezon: <3s) — MEZON BUZILDI\n\nXato darajasi: 0.4% ✅ (mezon: <1%)\n\nTOPILGAN MUAMMОLAR:\n1. Qidiruv so'rovi indekssiz — DB to'liq jadvalni skanerlaydi\n2. Checkout sahifasi N+1 muammosi (each item uchun alohida so'rov)\n\nTAVSIYA:\n1. products.name ustuniga indeks qo'shish\n2. Checkout'da mahsulotlarni bitta so'rovda olish\n\nXULOSA: Joriy holatda 500 foydalanuvchini qabul qilish MUMKIN EMAS. Yuqoridagi ikki muammo tuzatilishi kerak." },
        { type: "tip", text: "Hisobotni menejer ham tushunishi kerak. 'p95 = 4.8s' emas, 'foydalanuvchilarning 5% i qidiruvda 5 soniyadan ko'p kutadi — bu ularni yo'qotishga olib keladi' deb yozing." },
        { type: "key", text: "Hisobotda: sharoit + mezon + natija + xulosa + tavsiya. Biznes tilida yozing, faqat raqam emas." },
      ],
    },

    /* ---------- PRACTICAL ---------- */
    {
      id: "l9-11-practical",
      title: "Amaliyot: k6 bilan load test",
      type: "practical",
      minutes: 45,
      body: [
        { type: "p", text: "k6 bilan birinchi load testingizni yozasiz va ishga tushirasiz. k6 bepul va o'rnatish oson." },
        { type: "h", text: "O'rnatish" },
        { type: "code", text: `# Linux
sudo apt install k6

# macOS
brew install k6

# Windows
winget install k6

# Yoki Docker bilan
docker run -i grafana/k6 run - <test.js` },
        { type: "warn", text: "MUHIM: faqat TEST uchun mo'ljallangan API'da sinang (k6.io test API). Boshqa saytga yuklama berish — hujum deb qabul qilinishi mumkin va noqonuniy." },
      ],
      practical: {
        targetUrl: "https://test-api.k6.io",
        targetName: "k6 Test API",
        task: "k6 o'rnating va test-api.k6.io uchun load test yozing. Test quyidagilarni o'z ichiga olishi kerak: (1) Bosqichli yuklama (0→20→20→0 foydalanuvchi), (2) Thresholds: p95 < 2000ms va xato darajasi < 1%, (3) check() bilan status kod tekshiruvi, (4) Kamida 2 ta endpoint. Testni ishga tushiring va natijani tahlil qiling: p95 qancha? Throughput qancha? Mezon bajarildimi?",
        steps: [
          "k6 ni o'rnating va tekshiring: k6 version",
          "load-test.js faylini yarating",
          "options ichida stages belgilang: 30s da 20 foydalanuvchigacha, 1m ushlab turish, 30s da 0 ga tushish",
          "thresholds qo'shing: http_req_duration p(95)<2000, http_req_failed rate<0.01",
          "default funksiyada 2 ta GET so'rov yozing (crocodiles ro'yxati va bitta crocodile)",
          "Har so'rovga check() qo'shing: status 200 va javob vaqti < 2s",
          "k6 run load-test.js bilan ishga tushiring",
          "Natijani tahlil qiling: p95, p99, throughput (RPS), error rate",
          "Xulosa yozing: mezon bajarildimi? Qaysi endpoint sekinroq?",
        ],
        debrief:
          "Natijada k6 quyidagilarni ko'rsatadi:\n\n📊 http_req_duration — javob vaqti\n   avg, min, med, max, p(90), p(95)\n   ⚠️ avg emas, p(95) ga qarang!\n\n📊 http_req_failed — xato darajasi\n   0% bo'lishi kerak (yoki mezondan past)\n\n📊 http_reqs — jami so'rovlar va RPS (throughput)\n\n📊 vus — virtual foydalanuvchilar soni\n\n✅ THRESHOLDS: agar yashil bo'lsa — mezon bajarildi. Qizil bo'lsa — buzildi va k6 xato bilan tugaydi (CI/CD uchun muhim!).\n\nO'ZINGIZNI TEKSHIRING:\n• p95 ni topa oldingizmi? (avg emas!)\n• Thresholds ishladimi?\n• check() natijalari ko'rindimi?\n• Qaysi endpoint sekinroq ekanini aniqladingizmi?\n\nAgar bularni bajardingiz — siz load testingning asosini o'zlashtirdingiz. Bu kodni portfolio'ga qo'shing.",
      },
    },

    /* ---------- QUIZ ---------- */
    {
      id: "l9-12-quiz",
      title: "Yakuniy test: Performance",
      type: "quiz",
      minutes: 10,
      body: [
        { type: "p", text: "Performance testing bo'yicha bilimingizni tekshiring." },
      ],
      quiz: [
        {
          id: "l9q1",
          q: "Load va Stress testing farqi?",
          options: [
            "Ular bir xil",
            "Load — kutilgan/normal yuklama ostida test; Stress — chegaradan oshirib sinish nuqtasini topish",
            "Stress tezroq",
            "Load faqat API uchun",
          ],
          answer: 1,
          explain: "Load — normal yuklamada to'g'ri ishlashini tasdiqlaydi. Stress — chegaradan oshirib, tizim qachon va QANDAY yiqilishini aniqlaydi.",
        },
        {
          id: "l9q2",
          q: "Nega o'rtacha (average) javob vaqti aldamchi?",
          options: [
            "U juda aniq",
            "Bir necha juda sekin so'rov o'rtachada yo'qoladi — masalan 9 ta 0.1s va 1 ta 10s → o'rtacha 1.09s 'yaxshi' ko'rinadi",
            "O'rtacha eng yaxshi metrika",
            "Aldamchi emas",
          ],
          answer: 1,
          explain: "O'rtacha eng yomon holatlarni yashiradi. Shuning uchun percentile (p95, p99) ishlatiladi — ular haqiqiy foydalanuvchi tajribasini ko'rsatadi.",
        },
        {
          id: "l9q3",
          q: "p95 = 2s nimani anglatadi?",
          options: [
            "Barcha so'rov 2 soniyada bajarilgan",
            "So'rovlarning 95% i 2 soniyadan tez bajarilgan (5% sekinroq)",
            "O'rtacha 2 soniya",
            "Eng sekin so'rov 2 soniya",
          ],
          answer: 1,
          explain: "p95 = 2s → so'rovlarning 95% i 2 soniyadan tez. Qolgan 5% sekinroq bo'lishi mumkin. Bu o'rtachadan ancha ishonchli ko'rsatkich.",
        },
        {
          id: "l9q4",
          q: "Endurance (soak) testing qanday bug'ni topadi?",
          options: [
            "UI bug'larini",
            "Memory leak, connection leak, disk to'lishi — vaqt o'tgan sari yig'iladigan muammolar",
            "Rang xatolarini",
            "Hech qanday",
          ],
          answer: 1,
          explain: "Endurance — uzoq vaqt (soatlab) test. Memory leak kabi asta-sekin yig'iladigan muammolarni topadi. Qisqa load test bularni ko'rmaydi.",
        },
        {
          id: "l9q5",
          q: "Stress testda eng muhim savol qaysi?",
          options: [
            "Tizim qancha tez",
            "Tizim CHIROYLI yiqiladimi (xato xabari, ma'lumot yo'qolmaydi) va yuklama kamayganda o'ziga keladimi?",
            "Rang to'g'rimi",
            "Necha foydalanuvchi bor",
          ],
          answer: 1,
          explain: "Har tizim qachondir yiqiladi — bu normal. Muhimi: chiroyli yiqiladimi (graceful degradation) yoki halokatli (ma'lumot buziladi)?",
        },
        {
          id: "l9q6",
          q: "N+1 query muammosi nima?",
          options: [
            "Bitta so'rov ishlamaydi",
            "Bitta sahifa uchun 1 ta emas, N+1 ta DB so'rov yuboriladi (masalan 50 mahsulot uchun 51 so'rov) — sahifani juda sekinlashtiradi",
            "Ma'lumot bazasi yo'q",
            "Bug emas",
          ],
          answer: 1,
          explain: "N+1 — klassik performance bug. 50 mahsulot uchun 1 ta so'rov o'rniga 51 ta yuboriladi (har biri uchun alohida). JOIN bilan hal qilinadi.",
        },
        {
          id: "l9q7",
          q: "Performance testni qayerda o'tkazish kerak?",
          options: [
            "Production'da — eng aniq natija",
            "Staging yoki maxsus test muhitida — production'da haqiqiy foydalanuvchilarga zarar yetkazadi va saytni yiqitishi mumkin",
            "Farqi yo'q",
            "Faqat lokal kompyuterda",
          ],
          answer: 1,
          explain: "Production'da performance test — haqiqiy foydalanuvchilarga ta'sir qiladi va saytni yiqitishi mumkin. Faqat staging yoki maxsus muhitda.",
        },
        {
          id: "l9q8",
          q: "k6'ning 'thresholds' xususiyati nima uchun kerak?",
          options: [
            "Chiroylilik uchun",
            "Mezon buzilganda test AVTOMATIK yiqiladi — bu CI/CD uchun ideal (performance regression'ni tutadi)",
            "Testni tezlashtirish uchun",
            "Kerak emas",
          ],
          answer: 1,
          explain: "Thresholds — mezonlar (p95<2s, error<1%). Buzilsa test yiqiladi va CI/CD to'xtaydi. Bu performance regression'ni avtomatik tutadi.",
        },
      ],
    },
  ],
};
