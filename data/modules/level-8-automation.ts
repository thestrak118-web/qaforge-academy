// data/modules/level-8-automation.ts
//
// LEVEL 8 — Automation Basics
// 15 theory + 1 practical + 1 quiz = 17 sections

import type { Module } from "../lessons";

export const LEVEL_8: Module = {
  id: "automation-basics",
  icon: "🤖",
  title: "Level 8 — Automation asoslari",
  summary:
    "Avtomatlashtirish nima, qachon kerak, qaysi asbob va qanday yoziladi. Selenium, Playwright, lokatorlar, POM va CI/CD.",
  level: "junior",
  sections: [
    {
      id: "l8-01-automation-testing",
      title: "Automation Testing — nima va qachon",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Automation testing — testlarni qo'lda emas, kod orqali bajarish. Skript yoziladi va u testni siz uchun qayta-qayta bajaradi." },
        { type: "h", text: "Nima uchun kerak" },
        { type: "table", head: ["Foyda", "Izoh"], rows: [
          ["Tezlik", "100 ta test 5 daqiqada, qo'lda esa 5 soat"],
          ["Takrorlanuvchanlik", "Har safar aynan bir xil bajariladi (inson charchamaydi)"],
          ["Regression", "Har build'da butun to'plamni ishga tushirish mumkin"],
          ["CI/CD", "Har commit'da avtomatik test"],
          ["Ishonch", "Tez-tez reliz qilish mumkin"],
        ]},
        { type: "h", text: "Nimani avtomatlashtirmaslik kerak" },
        { type: "table", head: ["Holat", "Nega"], rows: [
          ["Bir marta ishlatiladigan test", "Yozish vaqti tejaganidan ko'p"],
          ["Tez-tez o'zgaradigan UI", "Test doim buziladi, saqlash qimmat"],
          ["Exploratory testing", "Inson intuisiyasi kerak"],
          ["Usability / dizayn", "'Chiroylimi?' — bu inson savoli"],
          ["Murakkab, kam takrorlanuvchi holat", "Yozish arzimaydi"],
        ]},
        { type: "warn", text: "MUHIM: automation manual testingni ALMASHTIRMAYDI. U faqat takrorlanuvchi ishni oladi, inson esa yangi bug qidirishga vaqt topadi." },
        { type: "h", text: "Avtomatlashtirish uchun eng yaxshi nomzodlar" },
        { type: "list", items: [
          "Regression test to'plami (har build'da bajariladi)",
          "Smoke test (tez tekshiruv)",
          "Barqaror, kam o'zgaradigan funksiyalar",
          "Ko'p ma'lumot bilan takrorlanuvchi test (data-driven)",
          "API testlar (UI'dan barqarorroq)",
        ]},
        { type: "key", text: "Automation — takrorlanuvchi ishni oladi. Manual testingni almashtirmaydi, uni to'ldiradi. Regression — eng yaxshi nomzod." },
      ],
    },

    {
      id: "l8-02-selenium",
      title: "Selenium",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Selenium — eng eski va eng keng tarqalgan brauzer avtomatlashtirish asbobi. Ko'p kompaniyada hali ham asosiy quroldir." },
        { type: "h", text: "Xususiyatlari" },
        { type: "table", head: ["Jihat", "Izoh"], rows: [
          ["Tillar", "Java, Python, C#, JavaScript, Ruby"],
          ["Brauzerlar", "Chrome, Firefox, Safari, Edge"],
          ["Yoshi", "2004 dan beri — juda ko'p material va yechim bor"],
          ["Kamchiligi", "Sekinroq, kutish (wait) bilan ko'p muammo, sozlash murakkabroq"],
        ]},
        { type: "h", text: "Oddiy Selenium testi (Python)" },
        { type: "code", text: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://www.saucedemo.com")

# Login
driver.find_element(By.ID, "user-name").send_keys("standard_user")
driver.find_element(By.ID, "password").send_keys("secret_sauce")
driver.find_element(By.ID, "login-button").click()

# Tekshirish
title = driver.find_element(By.CLASS_NAME, "title").text
assert title == "Products"

driver.quit()` },
        { type: "tip", text: "Selenium hali ham ish e'lonlarida eng ko'p so'raladigan asbob. Uni bilish — junior QA uchun katta afzallik." },
        { type: "key", text: "Selenium — eng keng tarqalgan brauzer automation asbobi. Ko'p til, ko'p brauzer. Sekinroq, lekin ish bozorida eng talab qilinadigan." },
      ],
    },

    {
      id: "l8-03-playwright",
      title: "Playwright",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Playwright — Microsoft yaratgan zamonaviy automation asbobi. Selenium'ning ko'p muammosini hal qilgan va tez ommalashmoqda." },
        { type: "h", text: "Selenium'dan afzalliklari" },
        { type: "table", head: ["Xususiyat", "Playwright"], rows: [
          ["Auto-wait", "Element tayyor bo'lishini o'zi kutadi (wait yozish shart emas!)"],
          ["Tezlik", "Sezilarli tezroq"],
          ["Sozlash", "Bir buyruq — driver yuklab olish shart emas"],
          ["Trace / video", "Test yozib olinadi, xato tahlili oson"],
          ["Parallel", "Qutidan chiqib ishlaydi"],
          ["Brauzerlar", "Chromium, Firefox, WebKit"],
        ]},
        { type: "h", text: "Oddiy Playwright testi (JavaScript)" },
        { type: "code", text: `import { test, expect } from '@playwright/test';

test('login ishlaydi', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('.title')).toHaveText('Products');
});` },
        { type: "p", text: "Diqqat qiling: hech qanday `wait` yo'q — Playwright element tayyor bo'lishini o'zi kutadi. Bu Selenium'dagi eng katta muammoni hal qiladi." },
        { type: "tip", text: "Yangi loyiha boshlayotgan bo'lsangiz — Playwright tanlang. Mavjud loyihaga qo'shilsangiz — ehtimol Selenium bilan ishlaysiz." },
        { type: "key", text: "Playwright — zamonaviy, tez, auto-wait bilan. Yangi loyihalar uchun eng yaxshi tanlov." },
      ],
    },

    {
      id: "l8-04-cypress",
      title: "Cypress",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Cypress — frontend dasturchilar orasida mashhur automation asbobi. Brauzer ichida ishlaydi va juda qulay debug imkoniyati bor." },
        { type: "h", text: "Xususiyatlari" },
        { type: "table", head: ["Jihat", "Izoh"], rows: [
          ["Til", "Faqat JavaScript / TypeScript"],
          ["Debug", "Ajoyib — har qadamni orqaga qaytarib ko'rish mumkin (time travel)"],
          ["Tezlik", "Tez"],
          ["Kamchilik", "Faqat JS, ko'p tab/oyna bilan ishlash cheklangan"],
        ]},
        { type: "code", text: `describe('Login', () => {
  it('muvaffaqiyatli kirish', () => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.title').should('have.text', 'Products');
  });
});` },
        { type: "h", text: "Uchtasini solishtirish" },
        { type: "table", head: ["", "Selenium", "Playwright", "Cypress"], rows: [
          ["Tillar", "Ko'p", "Ko'p", "Faqat JS/TS"],
          ["Tezlik", "Sekinroq", "Tez", "Tez"],
          ["Auto-wait", "Yo'q", "Ha", "Ha"],
          ["Ish bozori", "Eng ko'p", "O'smoqda", "O'rtacha"],
          ["O'rganish", "Qiyinroq", "Oson", "Oson"],
        ]},
        { type: "key", text: "Cypress — JS/TS, ajoyib debug. Selenium — ish bozorida eng ko'p. Playwright — eng zamonaviy." },
      ],
    },

    {
      id: "l8-05-page-object-model",
      title: "Page Object Model (POM)",
      type: "theory",
      minutes: 15,
      body: [
        { type: "p", text: "POM — automation kodini tartibli saqlashning eng muhim naqshi (pattern). Har sahifa uchun alohida klass yaratiladi." },
        { type: "h", text: "Muammо: POM'siz kod" },
        { type: "code", text: `// ❌ YOMON — lokatorlar hamma joyda takrorlanadi
test('login 1', async ({ page }) => {
  await page.fill('#user-name', 'user1');
  await page.fill('#password', 'pass1');
  await page.click('#login-button');
});

test('login 2', async ({ page }) => {
  await page.fill('#user-name', 'user2');   // takror!
  await page.fill('#password', 'pass2');    // takror!
  await page.click('#login-button');        // takror!
});

// Agar #user-name → #username ga o'zgarsa — 50 joyda tuzatish kerak!` },
        { type: "h", text: "Yechim: POM" },
        { type: "code", text: `// ✅ YAXSHI — LoginPage klassi
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}

// Testda ishlatish:
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
});

// Lokator o'zgarsa — FAQAT BITTA joyda tuzatasiz!` },
        { type: "h", text: "POM afzalliklari" },
        { type: "list", items: [
          "Lokatorlar bir joyda — o'zgarish oson",
          "Kod takrorlanmaydi (DRY)",
          "Test o'qish oson — biznes mantiq ko'rinadi",
          "Yangi test yozish tez",
          "Jamoada ishlash qulay",
        ]},
        { type: "key", text: "POM — har sahifa uchun alohida klass. Lokatorlar bir joyda. Bu automation'ning eng muhim naqshi." },
      ],
    },

    {
      id: "l8-06-locator",
      title: "Locator — element topish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Lokator — sahifadagi elementni topish usuli. Automation'ning eng muhim va eng ko'p muammo beradigan qismi." },
        { type: "h", text: "Lokator turlari (ishonchlilik tartibida)" },
        { type: "table", head: ["Tur", "Misol", "Ishonchlilik"], rows: [
          ["data-testid", "[data-testid='login-btn']", "⭐⭐⭐⭐⭐ Eng yaxshi"],
          ["ID", "#login-button", "⭐⭐⭐⭐ Juda yaxshi"],
          ["Name", "[name='username']", "⭐⭐⭐⭐ Yaxshi"],
          ["CSS Selector", ".btn-primary", "⭐⭐⭐ O'rtacha"],
          ["Link text", "text='Kirish'", "⭐⭐ Til o'zgarsa buziladi"],
          ["XPath", "//div[2]/button[1]", "⭐ Eng zaif"],
        ]},
        { type: "h", text: "Yaxshi va yomon lokator" },
        { type: "code", text: `// ❌ ENG YOMON — tuzilma o'zgarsa darrov buziladi
//html/body/div[2]/div[3]/form/button[1]

// ❌ YOMON — CSS klass dizayn o'zgarganda o'zgaradi
.btn.btn-primary.btn-lg

// ✅ YAXSHI — barqaror
#login-button

// ✅ ENG YAXSHI — maxsus test uchun qo'yilgan
[data-testid="login-button"]` },
        { type: "tip", text: "Dasturchidan `data-testid` atributi qo'shishni so'rang! Bu automation'ni bir necha barobar barqarorroq qiladi. Ular dizaynni o'zgartirganda ham buzilmaydi." },
        { type: "warn", text: "Flaky test (ba'zan o'tadi, ba'zan yiqiladi) — sabablarining eng kattasi zaif lokator. Barqaror lokator = barqaror test." },
        { type: "key", text: "Lokator ishonchliligi: data-testid > ID > name > CSS > text > XPath. Dasturchidan data-testid so'rang." },
      ],
    },

    {
      id: "l8-07-xpath",
      title: "XPath",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "XPath — XML/HTML hujjatda element topish tili. Kuchli, lekin ehtiyotkorlik bilan ishlatish kerak." },
        { type: "h", text: "Absolute va Relative XPath" },
        { type: "code", text: `// ❌ ABSOLUTE — juda zaif, tuzilma o'zgarsa darrov buziladi
/html/body/div[2]/div[3]/form/button[1]

// ✅ RELATIVE — barqarorroq
//button[@id='login-button']
//input[@name='username']` },
        { type: "h", text: "Foydali XPath naqshlari" },
        { type: "table", head: ["Naqsh", "Nima qiladi"], rows: [
          ["//button[@id='login']", "id bo'yicha"],
          ["//input[@type='text']", "atribut bo'yicha"],
          ["//button[text()='Kirish']", "aniq matn bo'yicha"],
          ["//button[contains(text(),'Kir')]", "matn qismi bo'yicha"],
          ["//div[@class='card']//button", "ichidagi element"],
          ["//input[@name='email']/following-sibling::span", "yonidagi element"],
          ["(//button)[1]", "birinchi tugma"],
        ]},
        { type: "h", text: "XPath qachon kerak" },
        { type: "list", items: [
          "Matn bo'yicha topish kerak bo'lganda",
          "Ota-ona yoki qo'shni elementga o'tish kerak bo'lganda",
          "CSS selector bilan topib bo'lmaydigan murakkab holat",
        ]},
        { type: "warn", text: "XPath — oxirgi chora. Avval data-testid, ID, name, CSS'ni sinang. XPath sekinroq va zaifroq." },
        { type: "key", text: "XPath — kuchli, lekin zaif. Absolute XPath ISHLATMANG. Faqat boshqa yo'l bo'lmaganda ishlating." },
      ],
    },

    {
      id: "l8-08-css-selector",
      title: "CSS Selector",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "CSS Selector — element topishning eng ko'p ishlatiladigan usuli. XPath'dan tezroq va o'qish osonroq." },
        { type: "h", text: "Asosiy selektorlar" },
        { type: "table", head: ["Selektor", "Nima topadi"], rows: [
          ["#login", "id='login' bo'lgan element"],
          [".btn", "class='btn' bo'lgan elementlar"],
          ["button", "barcha button teglari"],
          ["[name='email']", "name atributi bo'yicha"],
          ["[data-testid='submit']", "data atributi bo'yicha (eng yaxshi!)"],
          ["div.card", "class='card' bo'lgan div"],
          ["div > button", "div'ning bevosita farzandi bo'lgan button"],
          ["div button", "div ichidagi istalgan button"],
          ["input[type='text']", "matn kiritish maydonlari"],
          ["button:first-child", "birinchi farzand"],
        ]},
        { type: "h", text: "Amaliy misollar" },
        { type: "code", text: `// Login tugmasi
#login-button

// Xato xabari
.error-message

// Test atributi (eng barqaror)
[data-testid="submit-order"]

// Formadagi email maydoni
form input[name="email"]

// Savatdagi barcha mahsulot
.cart-item

// Faol tab
.tab.active` },
        { type: "tip", text: "CSS selectorni DevTools'da sinang: Console'da document.querySelector('#login-button') yozing. Element topilsa — selector to'g'ri." },
        { type: "key", text: "CSS Selector — tez, o'qish oson, XPath'dan afzal. [data-testid] eng barqaror." },
      ],
    },

    {
      id: "l8-09-assertions-auto",
      title: "Assertions — avtomatik tekshiruv",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Assertion — testda kutilgan natijani tekshirish. Assertion'siz test — test emas, shunchaki skript." },
        { type: "h", text: "Nimalarni tekshirish kerak" },
        { type: "table", head: ["Tekshiruv", "Misol"], rows: [
          ["Element ko'rinadimi", "expect(el).toBeVisible()"],
          ["Matn to'g'rimi", "expect(el).toHaveText('Products')"],
          ["Qiymat to'g'rimi", "expect(input).toHaveValue('ali@mail.com')"],
          ["Element mavjudmi", "expect(el).toBeAttached()"],
          ["Tugma yoqilganmi", "expect(btn).toBeEnabled()"],
          ["Elementlar soni", "expect(items).toHaveCount(6)"],
          ["URL to'g'rimi", "expect(page).toHaveURL(/inventory/)"],
        ]},
        { type: "code", text: `test('savatga qo\\'shish', async ({ page }) => {
  await page.goto('/inventory');

  // Amal
  await page.click('[data-testid="add-to-cart-1"]');

  // Tekshiruvlar
  await expect(page.locator('.cart-badge')).toHaveText('1');
  await expect(page.locator('[data-testid="remove-1"]')).toBeVisible();
});` },
        { type: "warn", text: "Ko'p uchraydigan xato: assertion yozmaslik. Test 'o'tadi' (xato bermaydi), lekin hech narsa tekshirmaydi. Bu — soxta ishonch." },
        { type: "key", text: "Assertion — kutilgan natijani tekshirish. Assertion'siz test foydasiz. Har testda kamida bitta bo'lishi shart." },
      ],
    },

    {
      id: "l8-10-waits",
      title: "Waits — kutish",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "Kutish — automation'dagi eng ko'p muammo manbai. Sahifa yuklanmagan, element hali paydo bo'lmagan — test yiqiladi." },
        { type: "h", text: "Kutish turlari" },
        { type: "table", head: ["Tur", "Izoh", "Baho"], rows: [
          ["Hard wait (sleep)", "Qat'iy N soniya kutish", "❌ Yomon — sekin va ishonchsiz"],
          ["Implicit wait", "Global kutish (Selenium)", "⚠️ O'rtacha"],
          ["Explicit wait", "Aniq shartni kutish", "✅ Yaxshi"],
          ["Auto-wait", "Asbob o'zi kutadi (Playwright, Cypress)", "✅✅ Eng yaxshi"],
        ]},
        { type: "h", text: "Yomon va yaxshi kutish" },
        { type: "code", text: `// ❌ ENG YOMON — hard wait
await page.click('#submit');
await sleep(5000);  // 5 soniya kutamiz "har ehtimolga qarshi"
// Muammo: agar 6 soniya kerak bo'lsa — yiqiladi.
//         agar 1 soniya yetsa — 4 soniya behuda ketdi.

// ✅ YAXSHI — shartni kutish
await page.click('#submit');
await expect(page.locator('.success')).toBeVisible();
// Element paydo bo'lishi bilan davom etadi. Tez va ishonchli.` },
        { type: "h", text: "Flaky test — asosiy sabab" },
        { type: "p", text: "Flaky test — ba'zan o'tadi, ba'zan yiqiladi. Sabablari:" },
        { type: "list", items: [
          "Noto'g'ri kutish (hard wait yoki umuman yo'q)",
          "Zaif lokator",
          "Testlar bir-biriga bog'liq (biri ikkinchisiga ta'sir qiladi)",
          "Test ma'lumoti tozalanmagan",
          "Animatsiya tugamasdan bosish",
        ]},
        { type: "warn", text: "Flaky test — automation'ning eng katta dushmani. Jamoa unga ishonmay qo'yadi ('yana yiqildi, e'tibor bermang'). Ularni darhol tuzatish kerak." },
        { type: "key", text: "Hard wait (sleep) ISHLATMANG. Shartni kuting (explicit/auto-wait). Flaky test — automation'ning eng katta muammosi." },
      ],
    },

    {
      id: "l8-11-fixtures",
      title: "Fixtures — test tayyorgarligi",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Fixture — test uchun boshlang'ich holatni tayyorlash va keyin tozalash. Bu testlarni mustaqil va barqaror qiladi." },
        { type: "h", text: "Odatiy oqim" },
        { type: "code", text: `beforeAll  → Bir marta, hamma testdan oldin (masalan baza ulanishi)
beforeEach → Har testdan oldin (masalan login qilish)
  TEST
afterEach  → Har testdan keyin (masalan test ma'lumotini o'chirish)
afterAll   → Bir marta, hamma testdan keyin (ulanishni yopish)` },
        { type: "code", text: `test.describe('Savat testlari', () => {

  test.beforeEach(async ({ page }) => {
    // Har testdan oldin login qilamiz
    await page.goto('/login');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('savatga qo\\'shish', async ({ page }) => {
    await page.click('[data-testid="add-item-1"]');
    await expect(page.locator('.cart-badge')).toHaveText('1');
  });

  test('savatdan o\\'chirish', async ({ page }) => {
    // Bu test ham login qilingan holatda boshlanadi
  });

  test.afterEach(async ({ page }) => {
    // Tozalash: savatni bo'shatish
  });
});` },
        { type: "h", text: "Test mustaqilligi — oltin qoida" },
        { type: "warn", text: "Har test MUSTAQIL bo'lishi shart. Test A test B'ga bog'liq bo'lmasligi kerak. Aks holda: A yiqilsa, B ham yiqiladi. Va testlarni tasodifiy tartibda ishga tushirib bo'lmaydi." },
        { type: "key", text: "Fixture — tayyorlash (beforeEach) va tozalash (afterEach). Har test mustaqil bo'lishi SHART." },
      ],
    },

    {
      id: "l8-12-test-runner",
      title: "Test Runner",
      type: "theory",
      minutes: 8,
      body: [
        { type: "p", text: "Test Runner — testlarni topib, ishga tushirib, natijani ko'rsatuvchi asbob." },
        { type: "table", head: ["Runner", "Til / Asbob"], rows: [
          ["Playwright Test", "Playwright bilan birga keladi"],
          ["Jest / Vitest", "JavaScript"],
          ["Mocha", "JavaScript"],
          ["PyTest", "Python (Selenium bilan)"],
          ["TestNG / JUnit", "Java (Selenium bilan)"],
          ["NUnit", "C#"],
        ]},
        { type: "h", text: "Runner nima qiladi" },
        { type: "list", items: [
          "Test fayllarini topadi",
          "Testlarni ketma-ket yoki parallel ishga tushiradi",
          "Fixture'larni boshqaradi (beforeEach/afterEach)",
          "Natijani ko'rsatadi (nechta o'tdi, nechta yiqildi)",
          "Hisobot yaratadi",
          "Yiqilgan testni qayta urinish (retry)",
        ]},
        { type: "code", text: `# Barcha testlarni ishga tushirish
npx playwright test

# Faqat bitta fayl
npx playwright test login.spec.js

# Brauzer ko'rinadigan rejimda
npx playwright test --headed

# Parallel (4 ta worker)
npx playwright test --workers=4` },
        { type: "key", text: "Test Runner — testlarni topadi, ishga tushiradi, natija va hisobot beradi. Playwright Test, PyTest, JUnit — eng keng tarqalganlari." },
      ],
    },

    {
      id: "l8-13-parallel-testing",
      title: "Parallel Testing",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Parallel testing — testlarni bir vaqtda ishga tushirish. 100 ta test ketma-ket 50 daqiqa olsa, 10 ta parallel ishlaganda 5 daqiqa oladi." },
        { type: "h", text: "Foydasi" },
        { type: "list", items: [
          "Testlar bir necha barobar tez tugaydi",
          "CI/CD tez ishlaydi — dasturchi tez natija oladi",
          "Ko'proq test yozish mumkin (vaqt cheklovi kamayadi)",
        ]},
        { type: "h", text: "Shartlar (juda muhim!)" },
        { type: "table", head: ["Shart", "Nega"], rows: [
          ["Testlar mustaqil", "Bir-biriga ta'sir qilmasligi kerak"],
          ["Alohida test ma'lumoti", "Ikki test bir foydalanuvchini o'zgartirsa — ziddiyat"],
          ["Umumiy holat yo'q", "Global o'zgaruvchi, umumiy savat — muammo"],
          ["Tozalash to'g'ri", "Har test o'zidan keyin tozalaydi"],
        ]},
        { type: "warn", text: "Parallel test — mustaqillikni shafqatsiz sinaydi. Ketma-ket ishlaganda o'tgan testlar parallel'da yiqilishi mumkin. Bu — testlaringiz mustaqil emasligini ko'rsatadi." },
        { type: "example", text: "Muammo misoli:\n\nTest A: qa_test@mail.com foydalanuvchini yaratadi\nTest B: qa_test@mail.com foydalanuvchini o'chiradi\n\nParallel ishlasa — B, A dan oldin tugashi mumkin → A yiqiladi.\n\nYechim: har test o'z noyob ma'lumotini ishlatsin (qa_test_${timestamp}@mail.com)." },
        { type: "key", text: "Parallel — tez, lekin testlar MUSTAQIL bo'lishi shart. Har test o'z ma'lumotini ishlatsin." },
      ],
    },

    {
      id: "l8-14-cicd-basics",
      title: "CI/CD asoslari",
      type: "theory",
      minutes: 12,
      body: [
        { type: "p", text: "CI/CD — kod o'zgarganda avtomatik test qilish va deploy qilish jarayoni. Automation'ning asosiy maqsadi aynan shu yerda ro'yobga chiqadi." },
        { type: "table", head: ["Termin", "Ma'nosi"], rows: [
          ["CI (Continuous Integration)", "Har commit'da avtomatik build va test"],
          ["CD (Continuous Delivery)", "Testdan o'tgan kod deploy'ga tayyor"],
          ["CD (Continuous Deployment)", "Testdan o'tgan kod avtomatik deploy qilinadi"],
        ]},
        { type: "h", text: "Odatiy CI/CD oqimi" },
        { type: "code", text: `Dasturchi kod push qiladi
  ↓
CI avtomatik ishga tushadi:
  1. Kodni yig'ish (build)
  2. Unit testlar
  3. API testlar (Newman)
  4. UI testlar (Playwright/Selenium)
  ↓
Hammasi o'tdi ✅  →  Deploy'ga ruxsat
Biror test yiqildi ❌  →  To'xtatiladi, jamoa xabar oladi` },
        { type: "h", text: "Mashhur CI/CD asboblari" },
        { type: "list", items: [
          "GitHub Actions — GitHub bilan integratsiya, eng oson",
          "GitLab CI — GitLab bilan",
          "Jenkins — eski, kuchli, ko'p sozlash kerak",
          "CircleCI, Travis CI — bulutli yechimlar",
        ]},
        { type: "h", text: "QA'ning roli CI/CD'da" },
        { type: "list", items: [
          "Avtomatik testlarni CI'ga ulash",
          "Qaysi testlar qaysi bosqichda ishlashini belgilash (smoke → to'liq regression)",
          "Yiqilgan testlarni tahlil qilish (haqiqiy bugmi yoki flaky test?)",
          "Test hisobotlarini kuzatish",
        ]},
        { type: "key", text: "CI/CD — har commit'da avtomatik test. QA testlarni CI'ga ulaydi va natijani kuzatadi. Automation'ning asosiy maqsadi." },
      ],
    },

    {
      id: "l8-15-reporting",
      title: "Reporting — test hisobotlari",
      type: "theory",
      minutes: 10,
      body: [
        { type: "p", text: "Hisobot — test natijalarini tushunarli ko'rsatish. 'Testlar o'tdi' — bu yetarli emas; jamoa tafsilotni ko'rishi kerak." },
        { type: "h", text: "Yaxshi hisobotda nima bo'ladi" },
        { type: "table", head: ["Element", "Izoh"], rows: [
          ["Umumiy natija", "Nechta o'tdi / yiqildi / o'tkazib yuborildi"],
          ["Yiqilgan testlar", "Qaysi test, qaysi qadamda, qanday xato"],
          ["Skrinshot", "Yiqilgan paytdagi ekran"],
          ["Video / Trace", "Test qanday ketganini ko'rish"],
          ["Vaqt", "Har test qancha vaqt oldi"],
          ["Tarix", "Bu test oldin ham yiqilganmi? (flaky aniqlash)"],
        ]},
        { type: "h", text: "Playwright hisoboti" },
        { type: "code", text: `# Test ishga tushirish
npx playwright test

# HTML hisobotni ochish
npx playwright show-report

# Yiqilgan testlarda avtomatik:
# - skrinshot
# - video
# - trace (har qadamni ko'rish mumkin)` },
        { type: "h", text: "Mashhur hisobot asboblari" },
        { type: "list", items: [
          "Playwright HTML Report — qutidan chiqib keladi, juda yaxshi",
          "Allure Report — chiroyli, batafsil, ko'p asbob bilan ishlaydi",
          "ExtentReports — Java/Selenium uchun",
          "Newman HTML — API testlar uchun",
        ]},
        { type: "tip", text: "Hisobot — QA ishining ko'rinadigan mahsuloti. Menejer va dasturchilar aynan uni ko'radi. Chiroyli va tushunarli hisobot — sizning qiymatingizni ko'rsatadi." },
        { type: "key", text: "Hisobot — natijani tushunarli ko'rsatish (skrinshot, video, trace bilan). Playwright HTML Report va Allure eng mashhur." },
      ],
    },

    /* ---------- PRACTICAL ---------- */
    {
      id: "l8-16-practical",
      title: "Amaliyot: birinchi avtomatik test",
      type: "practical",
      minutes: 60,
      body: [
        { type: "p", text: "Endi o'z birinchi avtomatik testingizni yozasiz. Playwright'dan foydalanamiz — u eng oson sozlanadi va auto-wait bilan keladi." },
        { type: "h", text: "Nima kerak" },
        { type: "list", items: [
          "Node.js o'rnatilgan bo'lishi kerak (nodejs.org)",
          "Kod muharriri (VS Code tavsiya etiladi)",
          "Terminal",
        ]},
        { type: "h", text: "O'rnatish" },
        { type: "code", text: `# Yangi papka yarating va ichiga kiring
mkdir qa-automation && cd qa-automation

# Playwright o'rnating
npm init playwright@latest

# Testni ishga tushirish
npx playwright test

# Hisobotni ko'rish
npx playwright show-report` },
        { type: "tip", text: "Playwright brauzerlarni o'zi yuklab oladi. Driver bilan ovora bo'lmaysiz — bu Selenium'dan katta afzallik." },
      ],
      practical: {
        targetUrl: "https://www.saucedemo.com",
        targetName: "SauceDemo",
        task: "Playwright o'rnating va SauceDemo uchun kamida 4 ta avtomatik test yozing: (1) Muvaffaqiyatli login (standard_user), (2) Noto'g'ri parol bilan login → xato xabari, (3) Mahsulotni savatga qo'shish → savat sanog'i 1 bo'ladi, (4) Savatdan o'chirish → savat bo'shaydi. Page Object Model (POM) ishlating — LoginPage va ProductsPage klasslari. Har testda assertion bo'lishi SHART.",
        steps: [
          "Node.js o'rnatilganini tekshiring: node --version",
          "Yangi papka yarating va npm init playwright@latest ni ishga tushiring",
          "pages/LoginPage.js yarating — lokatorlar va login() metodi bilan",
          "pages/ProductsPage.js yarating — savatga qo'shish metodlari bilan",
          "tests/login.spec.js — muvaffaqiyatli va muvaffaqiyatsiz login testlari",
          "tests/cart.spec.js — savatga qo'shish va o'chirish testlari",
          "Har testda expect() bilan assertion yozing",
          "npx playwright test bilan ishga tushiring",
          "npx playwright show-report bilan hisobotni ko'ring",
        ],
        debrief:
          "O'zingizni tekshiring:\n\n✅ POM ishlatdingizmi? Lokatorlar test faylida emas, Page klasslarida bo'lishi kerak.\n\n✅ Har testda assertion (expect) bormi? Assertion'siz test — test emas.\n\n✅ Hard wait (sleep) ishlatdingizmi? Ishlatmasligingiz kerak — Playwright o'zi kutadi.\n\n✅ Lokatorlar barqarormi? #user-name, #password, #login-button — ID ishlatilgan bo'lishi kerak (XPath emas).\n\n✅ Testlar mustaqilmi? Har test o'zi login qiladi (beforeEach), boshqa testga bog'liq emas.\n\n✅ Barcha 4 test o'tdimi?\n\nKUTILGAN NATIJA:\n• Login test: .title elementida 'Products' matni bo'ladi\n• Xato test: .error-message-container ko'rinadi\n• Savat test: .shopping_cart_badge da '1' bo'ladi\n• O'chirish test: badge yo'qoladi\n\nAgar hammasi ishladi — SIZ AVTOMATLASHTIRISHNI BOSHLADINGIZ! Bu kodni GitHub'ga yuklang: bu sizning portfolio'ngizning eng qimmatli qismi bo'ladi.",
      },
    },

    /* ---------- QUIZ ---------- */
    {
      id: "l8-17-quiz",
      title: "Yakuniy test: Automation",
      type: "quiz",
      minutes: 10,
      body: [
        { type: "p", text: "Automation asoslari bo'yicha bilimingizni tekshiring." },
      ],
      quiz: [
        {
          id: "l8q1",
          q: "Automation testing manual testingni almashtiradimi?",
          options: [
            "Ha, to'liq almashtiradi",
            "Yo'q — u takrorlanuvchi ishni oladi, inson esa exploratory va yangi bug qidirishga vaqt topadi",
            "Ha, manual testing kerak emas",
            "Automation faqat API uchun",
          ],
          answer: 1,
          explain: "Automation regression va takrorlanuvchi testlarni oladi. Exploratory, usability va yangi funksiya testi — inson ishi. Ular bir-birini to'ldiradi.",
        },
        {
          id: "l8q2",
          q: "Qaysi test avtomatlashtirish uchun ENG YAXSHI nomzod?",
          options: [
            "Exploratory testing",
            "Regression test to'plami — har build'da takrorlanadi va barqaror",
            "Usability testing",
            "Bir marta ishlatiladigan test",
          ],
          answer: 1,
          explain: "Regression — har build'da takrorlanadi, barqaror va ko'p vaqt oladi. Bu automation uchun ideal nomzod.",
        },
        {
          id: "l8q3",
          q: "Page Object Model (POM) nima uchun kerak?",
          options: [
            "Testlarni tezlashtirish uchun",
            "Lokatorlarni bir joyda saqlash — lokator o'zgarsa faqat bitta joyda tuzatiladi",
            "Chiroylilik uchun",
            "Kerak emas",
          ],
          answer: 1,
          explain: "POM'siz lokator 50 ta testda takrorlanadi. Lokator o'zgarsa — 50 joyda tuzatish kerak. POM bilan — bitta joyda.",
        },
        {
          id: "l8q4",
          q: "Eng barqaror lokator qaysi?",
          options: [
            "Absolute XPath: /html/body/div[2]/button[1]",
            "data-testid atributi: [data-testid='login-btn']",
            "CSS klass: .btn.btn-primary",
            "Link matni: text='Kirish'",
          ],
          answer: 1,
          explain: "data-testid — maxsus test uchun qo'yiladi, dizayn yoki tuzilma o'zgarganda ham buzilmaydi. Absolute XPath — eng zaif.",
        },
        {
          id: "l8q5",
          q: "Hard wait (sleep(5000)) nima uchun yomon?",
          options: [
            "Hech qanday muammo yo'q",
            "Agar 6 soniya kerak bo'lsa yiqiladi; agar 1 soniya yetsa 4 soniya behuda ketadi — sekin va ishonchsiz",
            "U juda tez",
            "Faqat Selenium'da yomon",
          ],
          answer: 1,
          explain: "Hard wait — qat'iy vaqt. U ham sekin (kerakmagan kutish), ham ishonchsiz (yetmasa yiqiladi). Shartni kutish (explicit/auto-wait) kerak.",
        },
        {
          id: "l8q6",
          q: "Flaky test nima va nega xavfli?",
          options: [
            "Tez ishlaydigan test",
            "Ba'zan o'tadi, ba'zan yiqiladi — jamoa unga ishonmay qo'yadi ('yana yiqildi, e'tibor bermang')",
            "Yozilmagan test",
            "API test",
          ],
          answer: 1,
          explain: "Flaky test — automation'ning eng katta dushmani. Jamoa natijaga ishonmay qo'yadi va haqiqiy bug'ni ham e'tiborsiz qoldiradi. Sabablari: zaif lokator, noto'g'ri kutish, testlar bir-biriga bog'liq.",
        },
        {
          id: "l8q7",
          q: "Parallel testing uchun eng muhim shart?",
          options: [
            "Tez kompyuter",
            "Testlar MUSTAQIL bo'lishi — bir-biriga ta'sir qilmasligi va har biri o'z ma'lumotini ishlatishi",
            "Ko'p brauzer",
            "Katta ekran",
          ],
          answer: 1,
          explain: "Parallel'da testlar bir vaqtda ishlaydi. Agar ular bir xil ma'lumotni o'zgartirsa — ziddiyat bo'ladi. Har test o'z noyob ma'lumotini ishlatishi kerak.",
        },
        {
          id: "l8q8",
          q: "Playwright'ning Selenium'dan asosiy afzalligi?",
          options: [
            "Chiroyliroq",
            "Auto-wait — element tayyor bo'lishini o'zi kutadi, wait yozish shart emas",
            "Faqat Chrome bilan ishlaydi",
            "Bepul",
          ],
          answer: 1,
          explain: "Auto-wait — Selenium'dagi eng katta muammoni (kutish) hal qiladi. Bundan tashqari: tezroq, oson sozlanadi, trace/video bilan keladi.",
        },
        {
          id: "l8q9",
          q: "Assertion'siz test nima?",
          options: [
            "Yaxshi test",
            "Test emas — u 'o'tadi', lekin hech narsani tekshirmaydi (soxta ishonch)",
            "Tez test",
            "Normal holat",
          ],
          answer: 1,
          explain: "Assertion'siz test faqat skript bajaradi, lekin natijani tekshirmaydi. U doim 'o'tadi' — bu soxta ishonch beradi va bug'ni o'tkazib yuboradi.",
        },
        {
          id: "l8q10",
          q: "CI/CD'da QA'ning roli nima?",
          options: [
            "Hech qanday rol yo'q",
            "Avtomatik testlarni CI'ga ulash, qaysi bosqichda qaysi test ishlashini belgilash, yiqilgan testlarni tahlil qilish",
            "Faqat kod yozish",
            "Faqat deploy qilish",
          ],
          answer: 1,
          explain: "QA testlarni CI'ga ulaydi, natijalarni kuzatadi va yiqilgan testni tahlil qiladi (haqiqiy bugmi yoki flaky test?).",
        },
      ],
    },
  ],
};
