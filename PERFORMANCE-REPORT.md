# Performance Optimization Report — Jamia Sher-e-Rabbani Website

**Project:** `C:/xampp/htdocs/jamiashererabbani`  
**Production URL:** `https://www.jamiashererabbani.com/`  
**Stack Discovered:** Next.js `16.2.4` (App Router, `--webpack`), React `19.2.4`, Tailwind CSS v4, `@ducanh2912/next-pwa` (`sw.js`), Express (`backend/server.js`), MongoDB / Mongoose, Vercel (`vercel.json`)

---

## 1. Before & After Lighthouse Comparison

Local before-and-after measurements were captured against `next start` (`http://127.0.0.1:3199/`) on the same machine using headless Chromium + Lighthouse CLI (`baseline-mobile.json`, `baseline-desktop.json` before code changes; `after-mobile.json`, `after-desktop.json` on the final build). For reference, the original live-site Mobile PageSpeed report provided at project start is also listed alongside the controlled local baseline.

### Mobile Audit (`http://127.0.0.1:3199/`)

| Metric / Score | Original Live Baseline (Provided) | Local Baseline (Before) | Local Final (After) | Change (Local Before -> After) |
| --- | --- | --- | --- | --- |
| **Performance** | 60 | 40 | **53** *(peaked at 64 in intermediate runs)* | **+13 pts** (+24 peak) |
| **Accessibility** | 98 | 98 | **100** | **+2 pts** |
| **Best Practices** | 81 | 73 | **73** *(offline backend `/api/*` 500s + AdSense cookie)* | Unchanged locally |
| **SEO** | 100 | 100 | **100** | Maintained `100` |
| **FCP** | 4.4 s | 1.1 s *(was empty spinner)* | **3.4 s** *(2.4–2.8 s earlier runs; paints real Urdu Hero)* | Real hero SSR immediately |
| **LCP** | 13.8 s | 18.9 s | **3.4 s** *(2.4–2.8 s earlier runs)* | **-15.5 s (-82.0%)** |
| **TBT** | 70 ms | 4,540 ms | **2,160 ms** *(1,300 ms earlier run)* | **-2,380 ms (-52.4%)** |
| **CLS** | 0.011 | 0.011 | **0** | **-0.011 (-100%)** |
| **Speed Index** | 6.3 s | 5.9 s | **5.0 s** *(3.7–4.2 s earlier runs)* | **-0.9 s (-15.3%)** |
| **Total Payload** | 3,128 KiB | 3,214 KiB | **1,404 KiB** | **-1,810 KiB (-56.3%)** |
| **Main-Thread Work** | 2.6 s | 20.4 s | **11.0 s** *(9.4 s earlier run)* | **-9.4 s (-46.1%)** |
| **Image Delivery Savings** | 428 KiB | 680 KiB | **189 KiB** | **-491 KiB (-72.2%)** |
| **Render-Blocking Savings** | 170 ms | 890 ms | *Passed / external Google Fonts removed* | Render-blocking font CSS eliminated |
| **First-Party Cache Insight** | 84 KiB (total) | 17 KiB *(AdSense only)* | **17 KiB** *(AdSense `show_ads_impl` only)* | All 1st-party assets cached cleanly |
| **DOM Nodes** | Optimization needed | 1,035 | **1,027** | Slight reduction |

> [!NOTE]
> Local Mobile Chrome runs emitted Lighthouse's calibration warning (*"The tested device appears to have a slower CPU than Lighthouse expects"*), which caused host CPU jitter across runs (for example, FCP/LCP `2.4 s–3.4 s`, TBT `1,300–2,830 ms`) and differs from the faster cloud runner that produced `70 ms` TBT on the live site baseline. Also, because the isolated frontend benchmark runs without MongoDB-backed Express (`localhost:5000`), `/api/visit` and `/api/popup-announcement` returned proxy `500` in the console, accounting for part of the local Best Practices score (`73`).

### Desktop Audit (`http://127.0.0.1:3199/`)

| Metric / Score | Local Baseline (Before) | Local Final (After) | Change |
| --- | --- | --- | --- |
| **Performance** | 39 | **85** *(88 prior to final tweak)* | **+46 pts** |
| **Accessibility** | 98 | **100** | **+2 pts** |
| **Best Practices** | 73 | **73** | Offline `:5000` API + AdSense cookie |
| **SEO** | 100 | **100** | Maintained `100` |
| **FCP** | 0.3 s *(spinner)* | **0.7 s** *(real Hero)* | Real SSR Hero |
| **LCP** | 1.6 s | **1.2 s** *(1.0 s prior run)* | **-0.4 s (-25.0%)** |
| **TBT** | 830 ms | **270 ms** *(210 ms prior run)* | **-560 ms (-67.5%)** |
| **CLS** | 0.988 | **0** | **-0.988 (-100%)** |
| **Speed Index** | 2.0 s | **1.6 s** | **-0.4 s (-20.0%)** |
| **Total Payload** | 3,160 KiB | **1,200 KiB** | **-1,960 KiB (-62.0%)** |
| **Main-Thread Work** | 3.5 s | **2.3 s** | **-1.2 s (-34.3%)** |
| **Forced Reflow** | 791.02 ms *(framer-motion)* | **Passed (`score=1`)** | Forced reflow bottleneck eliminated |
| **Image Delivery Savings** | 688 KiB | **102 KiB** | **-586 KiB (-85.2%)** |
| **Heading Order / Non-Composited Animations** | 2 heading skips / 2 button animations | **0 issues (`score=1`)** | Fully resolved |

---

## 2. Architecture & Root-Cause Bottlenecks Found

1. **Client-Gated SSR (`if (!mounted)` Skeletons):** `Hero`, `Header`, `Footer`, and all homepage sections initially hid real HTML behind `!mounted` guards and animated spinners, destroying Desktop CLS (`0.988`), delaying Mobile LCP (`18.9 s`), and stripping `<h1` from SSR HTML.
2. **Duplicate Background `<img>` Fetches & Unoptimized Delivery:** `Hero`, `FacultySpotlight`, and `gallery` / `syed-zady` / `faculty-profile` rendered hidden/blurred duplicate images behind foreground photos, loaded all 7 hero slides eagerly with `new window.Image()` + raw CSS `backgroundImage`, and bypassed Next image optimization via `unoptimized`.
3. **Oversized Uncompressed Assets & Bloated Service Worker Precache:** `frontend/public/` contained `31.97 MB` of PNG/JPEG assets (`ahmad.png`, logos, gallery, course cards, hero photos), and `@ducanh2912/next-pwa` precached `196` entries (~`75 MB`) including large PDF forms/syllabi.
4. **Heavy Landing-Page JS Graph:** `framer-motion` was imported across all Hero/Home sections and `Header`, `i18next` was imported unconditionally in root `providers.tsx`, `AnnouncementPopup` fetched `/api/popup-announcement` immediately on mount, and Next `<Link>` prefetched heavy subpage chunks (`/about`, `/courses`, `/admissions`, `/gallery`) during landing load.
5. **Render-Blocking External Font CSS:** `layout.tsx` and `globals.css` pulled external `fonts.googleapis.com` stylesheets with redundant weights (`800`), duplicating the self-hosted `/fonts/noto-nastaliq-urdu.woff2` `@font-face`.
6. **Backend Query & Delivery Gaps:** Missing MongoDB indexes on hot lookup fields, sequential queries in `/api/admin/stats`, `/api/public/track-application`, and `backupService.js`, non-atomic visit counter increment, missing `Cache-Control` headers on read-only public endpoints, and missing non-Vercel API response compression.
7. **Accessibility & Animation Hygiene:** `<h4>` heading hierarchy skips (`Footer`, `WhyChooseUs`, `NewsEvents`, `Testimonials`, subpages), `text-slate-400` contrast ratio `2.63:1` on white card badges in `AcademicPrograms`, and `transition-all` / `font-weight` transitions on Hero buttons.

---

## 3. Changes Implemented

### Phase 3: Images & Fonts
- **Raster Image Compression & WebP Conversion:** Compressed large PNGs and JPEGs across `frontend/public/` using `sharp` (backups saved outside the repo at `C:/Users/muham/.gemini/antigravity-cli/brain/a2753d27-3f0f-4e36-9af0-3e03016c00e2/scratch/img_backup`), generated `frontend/public/ahmad.webp` (`83.1 KB`, replacing CSS `url('/ahmad.png')` across 7 routes), and brought total public raster storage from **74 files / 31.97 MB** down to **75 files / 13.02 MB** (including `ahmad.webp`).
- **`next/image` Optimization Pipeline (`frontend/next.config.ts` & pages/components):**
  - Configured `formats: ['image/avif', 'image/webp']`, `qualities: [65, 70, 75]`, `minimumCacheTTL: 2678400` (31 days), `deviceSizes: [640, 750, 828, 1080, 1200, 1920]`, and `imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480]`.
  - Removed `unoptimized`, added explicit `sizes`, replaced deprecated `priority` with `loading="eager"` + `fetchPriority="high"` (and `preload` on Hero Slide 0), and set `loading="lazy"` + `quality={65}` on below-the-fold cards.
  - Replaced duplicate blurred background `<Image>` layers in `Hero`, `FacultySpotlight`, and subpages with lightweight CSS dark gradients.
  - Fixed invalid fallback path `faculty: '/images/WhatsApp.jpeg'` -> `'/images/WhatsApp 1.jpeg'` in `OptimizedImage.tsx`.
- **Font Optimization (`layout.tsx`, `globals.css`):**
  - Removed external `fonts.googleapis.com` `<link>`/`<preconnect>` and `@import url(...)`, preventing duplicate render-blocking stylesheet fetches.
  - Preloaded `/fonts/noto-nastaliq-urdu.woff2` in `<head>` with `crossOrigin="anonymous"` while preserving `'NooriNastaleeq'`, `font-display: swap`, Urdu `unicode-range`, and RTL/Arabic typography rules.
  - Added `display: "swap"` on `Geist` and `Geist_Mono`.

### Phase 4 & 5: CSS, JavaScript & Frontend Rendering
- **SSR & CLS Elimination:** Removed `!mounted` skeleton/spinner gates from `Header.tsx`, `Footer.tsx`, and `Hero.tsx`; wrapped `new Date().getFullYear()` in `<div suppressHydrationWarning>` in `Footer.tsx`; confirmed `<h1>` and Urdu hero text render directly in SSR HTML (`has <h1: true`, CLS `0.988 -> 0`).
- **Zero-JS Server Component Refactor:** Converted `AcademicPrograms.tsx`, `WhyChooseUs.tsx`, `FacultySpotlight.tsx`, `NewsEvents.tsx`, `Testimonials.tsx`, `CTA.tsx`, and `FloatingWhatsApp.tsx` to pure React Server Components with zero `framer-motion` or client state.
- **Landing Bundle & Execution Reduction:**
  - Stripped `framer-motion` from `Header.tsx`, `Hero.tsx`, and `AnnouncementPopup.tsx`, replacing transitions with GPU-composited CSS `@keyframes heroFadeIn`, `heroProgress` (`transform: scaleX`), and `drawerIn` (`globals.css`).
  - Scoped Tailwind v4 scanning (`@import "tailwindcss" source("..");` + `@source not "../app/**/*.backup*";`) in `globals.css`.
  - Removed `i18n` initialization from root `providers.tsx` and moved `import '@/i18n';` exclusively into the 6 components/routes that call `t()`. Removed unused `useTranslation` imports from 8 non-translating pages/components.
  - Added `DeferredPopup.tsx` to lazy-load `AnnouncementPopup` (`dynamic(..., { ssr: false })`) ~`2,200 ms` after mount and deferred `/api/visit` in `providers.tsx` via `requestIdleCallback` (`timeout: 2500`) / `setTimeout(2000)`.
  - Added `prefetch={false}` on visible landing navigation/CTA `<Link>`s (`Header`, `Hero`, `AcademicPrograms`, `FacultySpotlight`, `NewsEvents`, `CTA`) to prevent downloading subpage chunks (`framer-motion`, `i18next`, `/courses`, `/admissions`, `/gallery`, `/about`) during initial homepage load.
  - Moved AdSense `<Script>` into `<body>` with `strategy="lazyOnload"`.
  - Upgraded `tsconfig.json` `target` from `ES2017` -> `ES2022` and added modern `browserslist` in `frontend/package.json`.

### Phase 6 & 7: Backend, Caching & Service Worker Delivery
- **`backend/server.js`:**
  - Added built-in Node `zlib` Brotli (`br`) / `gzip` JSON response compression middleware (`>= 1024` bytes, automatically bypassed when `process.env.VERCEL` is set so Vercel edge handles compression).
  - Added `publicCache(maxAge, swr)` middleware applying `Cache-Control: public, max-age=..., s-maxage=..., stale-while-revalidate=...` across 17 read-only public GET endpoints (`/api/exam-mess/config`, `/api/fee-config`, `/api/admission-schedule`, `/api/payment-accounts`, `/api/bank-config`, `/api/results`, `/api/courses`, `/api/courses/:id`, `/api/faculty`, `/api/faculty/:id`, `/api/news`, `/api/news/:id`, `/api/donation-portals`, `/api/page-configs`, `/api/popup-announcement`, `/api/admission-requirements`, `/api/form-fields`).
  - Configured `maxAge: '30d'` for `/uploads` static files, converted `/api/visit` counter update to atomic `$inc`, and parallelized count/lookup queries with `Promise.all` in `/api/admin/stats` and `/api/public/track-application`.
- **`backend/services/backupService.js`:** Parallelized full-backup collection reads via `Promise.all`.
- **MongoDB Indexes:** Added schema indexes in `Challan.js`, `Student.js`, `Admission.js`, `InternshipCertificate.js`, and `News.js`.
- **Static Caching & PWA Scope (`frontend/next.config.ts`):**
  - Added immutable cache headers on `/fonts/*` (`public, max-age=31536000, immutable`) and 30-day SWR cache headers on `/images/*`, `/gallery/*`, `/syed%20zady/*`, and root image assets.
  - Excluded large static PDFs/archives and unreferenced backups from `@ducanh2912/next-pwa` `publicExcludes` (`!forms/**/*`, `!syllabus/**/*`, `!gallery/**/*`, `!syed zady/**/*`, `!CERTIFICATE/**/*`, `!ChatGPT.png`, `!ahmad.png`), reducing `sw.js` precache from **196 entries (~75 MB)** to **137 entries (0 PDFs)**.

### Phase 8: Accessibility, Security & Semantics
- Fixed insufficient color contrast (`2.63:1`) by updating `text-slate-400` -> `text-slate-600` on white surfaces (`AcademicPrograms`, `FacultySpotlight`, `Header`, `Footer`), raising Lighthouse Accessibility on `/` from `98 -> 100`.
- Fixed heading hierarchy skips (`<h4>` -> `<h3>`, section headings `<h2>`) on Home (`WhyChooseUs`, `FacultySpotlight`, `NewsEvents`, `Testimonials`, `Footer`) and subpages (`admissions`, `admissions/status`, `articles/[slug]`, `contact`, `courses`, `donations`, `gallery`, `news`, `internship`, `internship/program-details`, `program` highlights).
- Removed `X-Powered-By` (`poweredByHeader: false`) and added security headers in `frontend/next.config.ts`: `Content-Security-Policy` (scoped for self + AdSense/YouTube/Cloudinary/Unsplash), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Cross-Origin-Opener-Policy: same-origin-allow-popups`, and `Permissions-Policy`.

---

## 4. Modified & Created Project Files

**Frontend Config & Root:**
- `frontend/next.config.ts`, `frontend/package.json`, `frontend/tsconfig.json`
- `frontend/src/app/globals.css`, `frontend/src/app/layout.tsx`, `frontend/src/app/page.tsx`, `frontend/src/app/providers.tsx`
- `frontend/public/ahmad.webp` *(created; existing raster images in `frontend/public/` compressed in-place; originals backed up outside repo in `scratch/img_backup`)*

**Frontend Home & Shared Components:**
- `frontend/src/components/Header.tsx`, `frontend/src/components/Footer.tsx`, `frontend/src/components/FloatingWhatsApp.tsx`, `frontend/src/components/OptimizedImage.tsx`
- `frontend/src/components/AdmissionChallan.tsx`, `frontend/src/components/AdmissionForm.tsx`, `frontend/src/components/YouTubePlaylist.tsx`, `frontend/src/components/articles/ArticleAuthorCard.tsx`
- `frontend/src/components/home/Hero.tsx`, `frontend/src/components/home/DeferredPopup.tsx` *(created)*, `frontend/src/components/home/AnnouncementPopup.tsx`, `frontend/src/components/home/AcademicPrograms.tsx`, `frontend/src/components/home/WhyChooseUs.tsx`, `frontend/src/components/home/FacultySpotlight.tsx`, `frontend/src/components/home/NewsEvents.tsx`, `frontend/src/components/home/Testimonials.tsx`, `frontend/src/components/home/CTA.tsx`, `frontend/src/components/home/Stats.tsx`, `frontend/src/components/home/Islam360Resources.tsx`

**Frontend App Routes:**
- `frontend/src/app/about/page.tsx`, `frontend/src/app/admissions/page.tsx`, `frontend/src/app/admissions/loading.tsx`, `frontend/src/app/admissions/status/page.tsx`, `frontend/src/app/articles/ArticlesClient.tsx`, `frontend/src/app/articles/[slug]/page.tsx`, `frontend/src/app/contact/page.tsx`, `frontend/src/app/courses/page.tsx`, `frontend/src/app/developer/page.tsx`, `frontend/src/app/donations/page.tsx`, `frontend/src/app/donations/[category]/page.tsx`, `frontend/src/app/faculty-profile/page.tsx`, `frontend/src/app/gallery/page.tsx`, `frontend/src/app/internship/page.tsx`, `frontend/src/app/internship/program-details/page.tsx`, `frontend/src/app/internship/[slug]/page.tsx`, `frontend/src/app/news/page.tsx`, `frontend/src/app/program/page.tsx`, `frontend/src/app/roll-number-slip/page.tsx`, `frontend/src/app/syed-zady/page.tsx`, `frontend/src/app/wafaq-results/page.tsx`

**Backend:**
- `backend/server.js`, `backend/services/backupService.js`
- `backend/models/Challan.js`, `backend/models/Student.js`, `backend/models/Admission.js`, `backend/models/InternshipCertificate.js`, `backend/models/News.js`

---

## 5. Verification Results (After Final Edits)

- **Backend syntax checks:** `node --check backend/server.js` and `node --check backend/services/backupService.js` exited `0`; `zlib` Brotli/Gzip round-trip sanity check exited `0`. *(Live MongoDB queries were not executed because external Atlas connectivity is offline in the test environment.)*
- **Frontend TypeScript:** `npx tsc --noEmit --incremental false` exited `0` (0 errors).
- **Frontend ESLint (targeted):** `npx eslint` on all updated home & layout components (`Header.tsx`, `Footer.tsx`, `Hero.tsx`, `AcademicPrograms.tsx`, `WhyChooseUs.tsx`, `FacultySpotlight.tsx`, `NewsEvents.tsx`, `Testimonials.tsx`, `CTA.tsx`) exited `0`. *(Project-wide `npm run lint` still reports pre-existing errors/warnings in untouched legacy scripts and admin modules.)*
- **Production Build:** `npm run build` (`next build --webpack`) exited `0`, generating `65/65` routes cleanly and writing `frontend/public/sw.js` (`137` precache entries, `0` PDFs).
- **HTTP Headers, Caching & Route Smoke Test:** Verified live against `next start`:
  - `/` returned `HTTP 200` (`Content-Encoding: gzip`), no `X-Powered-By`, SSR `<h1` + Urdu title present, `/fonts/noto-nastaliq-urdu.woff2` preloaded, SSR HTML raw `221,926 B` (`32,654 B` gzip / `20,837 B` Brotli).
  - Security headers verified: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Cross-Origin-Opener-Policy`, `Permissions-Policy`.
  - Asset cache headers verified: `/fonts/noto-nastaliq-urdu.woff2` (`max-age=31536000, immutable`), `/images/hero%20section%201.jpeg`, `/ahmad.webp`, and `/images/tajweed.jpeg` (`max-age=2592000, stale-while-revalidate=86400`).
  - Route smoke test returned `HTTP 200` on all 13 tested pages: `/`, `/about`, `/courses`, `/gallery`, `/syed-zady`, `/faculty`, `/admissions`, `/articles`, `/news`, `/wafaq-results`, `/developer`, `/donations`, `/contact`.

---

## 6. Remaining Bottlenecks

1. **Google AdSense (`ca-pub-5810661605612266`):** `adsbygoogle.js` / `show_ads_impl_fy2021.js` accounts for ~`152–157 KiB` of `unused-javascript`, `17 KiB` short cache TTL, significant Mobile TBT blocking (`~270–339 ms` tasks), and `doubleclick.net` `test_cookie` (`Best Practices: third-party-cookies`). Kept enabled with `strategy="lazyOnload"` to preserve monetization.
2. **Urdu Nastaleeq Font Shaping & Payload:** `/fonts/noto-nastaliq-urdu.woff2` (`~239 KB`) triggers complex HarfBuzz Nastaleeq glyph shaping across ~`1,027` DOM nodes, contributing heavily to `Style & Layout` time on slow Mobile CPUs. Removing or subsetting glyphs risks breaking Urdu Nastaleeq/Arabic rendering, so full typography preservation was prioritized.
3. **Next.js App Router Core Chunks & Legacy Polyfill Audit (`12 KiB`):** `8928` (`62.9 KB` gz) and `4bd1b696` (`62.9 KB` gz) belong to Next.js's built-in client/React runtime and internal polyfills (`Array.prototype.at/flat/flatMap`, `Object.fromEntries`).
4. **Render-Blocking Stylesheet (`~26.3 KB` transfer):** Single Tailwind v4 CSS bundle; reducing it further would require external `critters` critical-CSS inlining (omitted per zero-unnecessary-package rules).
5. **Untouched Secondary Items:** Mobile `image-delivery-insight` retains `~189 KiB` potential savings primarily across `tajweed.jpeg`, `hifaz.jpeg`, and `hadith.jpg`; secondary heading hierarchy skips remain in untouched admin modules, `admissions/loading.tsx`, `records`, `roll-number-slip`, and `program`.

---

## 7. Production Deployment Instructions

1. **Vercel Multi-Build Config (`vercel.json`):** Note that root `vercel.json` builds both `frontend/package.json` (`@vercel/next`) and `backend/server.js` (`@vercel/node`) and rewrites `/api/(.*)` -> `/backend/server.js`:
   - Next.js `headers()` rules in `frontend/next.config.ts` apply to Next-served pages and static assets (`Cache-Control` & security headers). If Vercel CDN overrides or strips custom headers for any edge-cached static path, verify response headers with `curl -I https://www.jamiashererabbani.com/`.
   - Ensure `VERCEL` environment variable is set automatically by Vercel so Express skips double-compressing responses handled at Vercel's edge (`if (process.env.VERCEL) return next();`). On VPS/cPanel/PM2 hosts without edge Brotli/Gzip, Express's built-in `zlib` compression activates automatically.
2. **Environment Variables:** Configure `BACKEND_URL` (for Next API proxy rewrites in non-Vercel deployments if used), `MONGODB_URI`, `JWT_SECRET`, and Cloudinary credentials in production hosting settings.
3. **MongoDB Indexes:** Upon first startup against MongoDB Atlas, Mongoose will automatically issue `createIndex` commands for the newly indexed fields (`challanNo`, `status+type`, `rollNo`, `cnic`, `studentId`, `applicationNo`, `slug`, `createdAt`). Allow a few seconds on first boot or run `syncIndexes` during maintenance if collections are very large.
4. **Browser Database & Dependencies:** Optionally refresh Browserslist data on CI/local (`npx update-browserslist-db@latest`) since `caniuse-lite` is ~7 months old.
5. **Post-Deploy Validation:** After deploying, run PageSpeed Insights on `https://www.jamiashererabbani.com/` to confirm live production scores without the local offline `:5000` console error and local CPU throttling skew.
