# QAForge Academy

QA/QC amaliyot platformasi (HTB uslubida, QA uchun). O'zbek bozori uchun.
Foydalanuvchilar internetdagi real "target" ilovalar ustida challenge yechadi,
ball yig'adi, darajaga chiqadi. AI Mentor topolmaganда ishora beradi (javob bermaydi).

---

## 1. Loyihani boshlash (bir marta)

Terminal (VS Code ichida) ochib, quyidagilarни bajaring:

```bash
# Yangi Next.js loyiha yaratish (bu papkaнинг o'zida)
npx create-next-app@latest qaforge --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd qaforge

# Supabase kutubxonalari
npm install @supabase/supabase-js @supabase/ssr
```

Keyin bu starter'dagi fayllarни yangi loyihaga ko'chiring:
- `CLAUDE.md`         → loyiha ildiziga (root)
- `data/challenges.ts` → `data/challenges.ts`
- `docs/`            → `docs/`

## 2. Muhit o'zgaruvchilari (.env.local)

Loyiha ildizida `.env.local` fayl yarating:

```
NEXT_PUBLIC_SUPABASE_URL=...        # Supabase project sozlamalaridan
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...       # FAQAT server tomonда ishlatiladi
# Phase 3 uchun (keyinroq):
# ANTHROPIC_API_KEY=...
```

`.env.local` ni hech qachon git'ga qo'shmang (`.gitignore` da bo'lsin).

## 3. Ishga tushirish

```bash
npm run dev
# http://localhost:3000
```

---

## 4. Claude Code bilan qanday ishlash

VS Code'да terminal'да Claude Code'ni oching va shunday ayting:

> "CLAUDE.md ni o'qi. Phase 1 ni boshla: challenges hub va challenge detail
> sahifasini `data/challenges.ts` dan yasab ber. Auth hozircha kerak emas."

Claude Code `CLAUDE.md` ni o'qib, faza tartibida ishlaydi. Har faza tugagach
tekshirib, keyingisiga o'ting:

- **Phase 1** — Challenge Hub (auth/db yo'q). Client-side scoring.
- **Phase 2** — Supabase auth + `docs/schema.sql` + leaderboard + profil.
- **Phase 3** — Real AI Mentor (`app/api/mentor/route.ts` stub'ini almashtirish).

### Foydali Claude Code buyruqlari
- "Phase 1 ni tugat, keyin qisqa demo qilib ber."
- "Bu komponentni CLAUDE.md konvensiyalariga moslashtir."
- "schema.sql ni Supabase'ga qo'llash bo'yicha qadamlarni ko'rsat."

---

## 5. Deploy (tayyor bo'lganda)

1. GitHub'ga push qiling.
2. Vercel'ga ulang (import repo).
3. Environment variables'ni Vercel'ga qo'shing.
4. Supabase'da `docs/schema.sql` ni qo'llang.

---

## Litsenziya eslatmasi

Linked target'lar (SauceDemo, reqres.in, DemoQA...) — biz ularни **rehost
qilmaymiz**, faqat havola beramiz + missiya qo'shamiz. Kelajakda self-host
qilinadigan ochiq kodli ilovalar (Juice Shop, ParaBank...) o'z litsenziyasiga
rioya qilib joylanadi.
