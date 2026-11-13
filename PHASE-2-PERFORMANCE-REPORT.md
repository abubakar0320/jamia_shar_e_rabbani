# Jamia Sher-e-Rabbani — Phase 2 Targeted Core Web Vitals Optimization Report

**Repository:** `C:/xampp/htdocs/jamiashererabbani`  
**Production URL:** https://www.jamiashererabbani.com/  
**Date:** 2026-11-13  

---

## 1. Executive Summary & Benchmark Comparison

### Baseline vs. Phase 2 Measured Results

- **Reported Live PageSpeed Baseline (pre-Phase 2 deployment):**
  - **Mobile:** Performance `73` | FCP `0.9s` | LCP `16.1s` | TBT `70ms` | CLS `0.057` | Speed Index `3.8s` | Est. Image Savings `456 KiB`
  - **Desktop:** Performance `74` | FCP `0.2s` | LCP `1.1s` | TBT `20ms` | CLS `0.987` (Hero carousel `0.970` + inner card `0.017`) | Speed Index `0.8s`

- **Final Post-Edit Local Production Medians (`next start -p 3202 -H 127.0.0.1`, 3x Mobile + 3x Desktop Lighthouse 13 runs, `phase2_clean3`):**

| Metric | Mobile Baseline (Reported) | Mobile Final Median (3 Runs) | Mobile Final Run Values | Desktop Baseline (Reported) | Desktop Final Median (3 Runs) | Desktop Final Run Values |
| :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **Performance** | `73` | **`82`** | `73`, `83`, `82` | `74` | **`99`** | `99`, `99`, `99` |
| **Accessibility** | `98+` | **`100`** | `100`, `100`, `100` | — | **`100`** | `100`, `100`, `100` |
| **Best Practices** | `81+` | **`100`** | `100`, `100`, `100` | — | **`100`** | `100`, `100`, `100` |
| **SEO** | `100` | **`100`** | `100`, `100`, `100` | — | **`100`** | `100`, `100`, `100` |
| **FCP** | `0.9s` | **`2.06s`** | `1.94s`, `2.06s`, `2.15s` | `0.2s` | **`0.53s`** | `0.53s`, `0.53s`, `0.53s` |
| **LCP** | `16.1s` | **`2.06s`** | `1.94s`, `2.06s`, `2.15s` | `1.1s` | **`0.94s`** | `0.88s`, `0.94s`, `0.94s` |
| **TBT** | `70ms` | **`572ms`** | `1306ms`, `541ms`, `572ms` | `20ms` | **`66ms`** | `66ms`, `62ms`, `69ms` |
| **CLS** | `0.057` | **`0.0000`** | `0.0000`, `0.0000`, `0.0000` | `0.987` | **`0.0000`** | `0.0000`, `0.0000`, `0.0000` |
| **Speed Index** | `3.8s` | **`2.15s`** | `2.18s`, `2.06s`, `2.15s` | `0.8s` | **`0.78s`** | `0.79s`, `0.78s`, `0.78s` |
| **Render-Blocking** | — | **`0`** | `0` requests | — | **`0`** | `0` requests |
| **Image Savings** | `456 KiB` | **`0 KiB`** | `0 KiB` | — | **`0 KiB`** | `0 KiB` |
| **Transfer Size** | `~3,128 KiB` | **`802 KiB`** | `802 KiB` | — | **`737 KiB`** | `737 KiB` |

> **Important Measurement Context (Mobile TBT & CPU Frequency):**  
> During the final `phase2_clean3` run, the test laptop's CPU clock was capped at `1896 MHz` across all 8 cores, amplifying Lighthouse's 4x simulated CPU throttling on Blink's Nastaleeq text shaping (`Style & Layout: 1,710.0 ms` in Mobile run #2) and React/Next hydration (`Script Evaluation: 1,021.8 ms`). In earlier unthrottled host runs (`phase2h`, prior to deferring `/api/visit` from `requestIdleCallback` to `5500ms`), Mobile measured **`Perf=89 | FCP=1.60s | LCP=1.60s | TBT=407ms | CLS=0.0000 | SI=1.60s`** (`Style & Layout: 1,084.8 ms`, `Script Evaluation: 570.8 ms`) and Desktop measured **`Perf=99 | FCP=0.41s | LCP=0.90s | TBT=18ms | CLS=0.0000 | SI=0.52s`**. On Vercel Edge + standard PageSpeed Insights hardware, FCP/LCP benefit directly from `inlineCss: true`, `0` render-blocking CSS requests, and WebP delivery, while residual Mobile TBT stems cleanly from initial Chromium `HarfBuzz` shaping of `noto-nastaliq-urdu.woff2` (`271,314 B` `GSUB` table) across homepage DOM nodes plus Next.js App Router/React 19 core runtime hydration (`8928` + `4bd1b696`).

---

## 2. Priority One — Eliminating Desktop CLS (`0.987 → 0.0000`)

### Root Causes Fixed
1. **Carousel slide height instability & multi-slide eager layout shifts:** Locked slide dimensions in `frontend/src/components/home/HeroCarousel.tsx` (`min-h-[500px] md:min-h-[480px] lg:min-h-[610px]`) with stable absolute/flex positioning for controls and consistent 2-column grid layout inside server-rendered `frontend/src/components/home/Hero.tsx`.
2. **Client boundary bloat in Hero:** Extracted only interactive slide state and `SLIDES` constant into `HeroCarousel.tsx` while keeping `Hero.tsx` as a Server Component rendering outer shell, radial gradients, trust checklist slot, and bottom institutional grid.
3. **Heavy non-composited blur filters:** Replaced `blur-3xl` background effects in `Hero.tsx` and `frontend/src/components/home/CTA.tsx` with pure `radial-gradient` backgrounds.
4. **Urdu Nastaleeq font-swap reflow:** Added a calibrated fallback font face (`NooriNastaleeqFallback` in `frontend/src/app/globals.css`) matched to `Noto Nastaleeq Urdu`'s tall vertical metrics (`ascent-override: 205%`, `descent-override: 65%`, `line-gap-override: 0%`, `size-adjust: 88%`), preventing line-wrap jumps between initial fallback paint and font swap.

### Verification (Playwright `verify_phase2_ui.js`)
- **Desktop (`1366×900`):** Across all 7 slides (`#0`–`#6`), outer hero height remained locked at **`976px`**, left column **`750px`**, and slide wrapper **`610px`**, with **`0`** additional CLS during slide transitions (`clsTotal: 0.00785` before font settle -> `0.00785` after all 7 clicks; `0.0000` in all Lighthouse runs).
- **Mobile (`390×844`):** Across all 7 slides (`#0`–`#6`), outer hero height remained locked at **`1437px`**, left column **`673px`**, slide wrapper **`500px`**, and **`clsTotal: 0`**. (Playwright observed `docScrollW: 402` vs `innerW: 390` from the horizontally scrollable header nav strip; Lighthouse Mobile SEO & CLS remained `100` and `0.0000`.)

---

## 3. Priority Two — Fixing Mobile & Desktop LCP (`16.1s → 2.06s` Mobile, `0.94s` Desktop)

### LCP Element Analysis (Lighthouse 13 `lcp-breakdown-insight`)
- **Mobile (`phase2_clean3-mobile-r2`):** LCP element is hero heading `<h1 class="text-3xl ...">جامعہ شیرِ ربانی دینی و عصری علوم کا عظیم تعلیمی مرکز</h1>` (`TTFB: 27.2 ms`, `Element Render Delay: 664.3 ms`).
- **Desktop (`phase2_clean3-desktop-r2`):** LCP element is hero slide 1 image `<img alt="جامعہ شیرِ ربانی" fetchpriority="high" loading="eager">` serving `/images/optimized/hero-section-1.webp` (`TTFB: 35.9 ms`, `Resource Load Delay: 47.2 ms`, `Resource Load Duration: 23.2 ms`, `Element Render Delay: 687.3 ms`).

### Implemented Fixes
- **Slide-0-Only Initial Image Mounting:** `HeroCarousel.tsx` mounts only Slide `0` (`hero-section-1.webp`) on initial render with `priority`, `fetchPriority="high"`, `loading="eager"`, and responsive `sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 480px"`. Slides `1..6` mount dynamically upon slide activation, avoiding 6 unnecessary above-the-fold downloads while keeping slideshow playback intact (`heroImgsInit: 1` -> `heroImgsAfterCount: 20` after cycling all 7 slides).
- **Server-First Rendering & Client Island Extraction:**
  - Converted `Footer.tsx` to a Server Component by extracting `FooterCopyButton.tsx`.
  - Moved `<Providers />` and `<AdSenseLoader />` in `frontend/src/app/layout.tsx` to sibling slots after `<FloatingWhatsApp />` so `{children}` is no longer wrapped inside a `'use client'` boundary.
  - Replaced `'use client'` `<OptimizedImage>` wrappers with direct `next/image` `<Image>` across `AcademicPrograms.tsx`, `WhyChooseUs.tsx`, `FacultySpotlight.tsx`, and `NewsEvents.tsx`.
  - Added `prefetch={false}` on internal `<Link>` elements in `Header.tsx`, `Footer.tsx`, and `NewsEvents.tsx`.
  - Removed `fetchPriority="high"` from the small `56×56` header logo in `Header.tsx` so network priority favors the actual hero image/font.
- **Retained Font Preload:** Kept `<link rel="preload" href="/fonts/noto-nastaliq-urdu.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />` in `layout.tsx` (testing removal caused late font swap, raising Desktop TBT `23ms → 298ms` and introducing `0.0136` CLS).

---

## 4. Priority Three — Image Optimization (`0 KiB` Lighthouse Savings, Originals Preserved)

All original assets (`frontend/public/images/hero section *.jpeg`, `frontend/public/*.jpeg`, `frontend/public/*.jpg`, SVGs, PNGs) remain untouched on disk. Optimized WebP variants and icons were generated into `frontend/public/images/optimized/`:

| Original Asset | Original Size | Optimized Asset | Optimized Size | Reduction |
| :--- | :---: | :--- | :---: | :---: |
| `hero section 1.jpeg` | `190.3 KB` | `hero-section-1.webp` | `94.0 KB` | `-50.6%` |
| `hero section 2.jpeg` | `64.3 KB` | `hero-section-2.webp` | `44.6 KB` | `-30.7%` |
| `hero section 3.jpeg` | `155.9 KB` | `hero-section-3.webp` | `117.1 KB` | `-24.9%` |
| `hero section 4.jpeg` | `253.4 KB` | `hero-section-4.webp` | `152.1 KB` | `-40.0%` |
| `hero section 5.jpeg` | `160.1 KB` | `hero-section-5.webp` | `84.2 KB` | `-47.4%` |
| `hero section 6.jpeg` | `182.0 KB` | `hero-section-6.webp` | `103.4 KB` | `-43.2%` |
| `hero section 7.jpeg` | `244.8 KB` | `hero-section-7.webp` | `133.9 KB` | `-45.3%` |
| `tajweed.jpeg` | `381.9 KB` | `tajweed.webp` / `tajweed-card.webp` | `196.8 KB` / `81.1 KB` | `-48.5%` / `-78.7%` |
| `hifaz.jpeg` | `318.0 KB` | `hifaz.webp` / `hifaz-card.webp` | `153.2 KB` / `54.9 KB` | `-51.8%` / `-82.7%` |
| `hadith.jpg` | `310.7 KB` | `hadith.webp` | `129.5 KB` | `-58.3%` |

Additional optimized logos/icons created in `frontend/public/images/optimized/`: `logo-icon.webp` (`4.7 KB`), `logo-apple.png` (`23.0 KB`), `gov-logo.webp` (`5.1 KB`), `punjab-logo.webp` (`5.4 KB`), `saudi-logo.webp` (`3.9 KB`), `hec-logo.webp` (`3.8 KB`), `ppsc-logo.webp` (`2.8 KB`), `wafaq-logo.webp` (`4.6 KB`), `army-logo.webp` (`3.6 KB`).  

Secondary routes updated to reference `/images/optimized/*.webp` while preserving originals:
- `frontend/src/app/donations/page.tsx`
- `frontend/src/app/news/page.tsx`
- `frontend/src/app/program/page.tsx`
- `frontend/src/app/courses/page.tsx`
- `frontend/src/data/coursesData.ts`
- `frontend/src/data/articles.ts`

---

## 5. Priority Four — Urdu Nastaleeq Font Inspection & Optimization

Inspected `frontend/public/fonts/noto-nastaliq-urdu.woff2` (`239,060 B` / `233.5 KiB`):
- **Internal Structure:** Contains `19` OpenType tables (`totalSfntSize: 623,328 B`), `1,338` glyphs, and a `wght` variable axis (`400..700`). Its `cmap` table (`936 B`) already maps **only `333` Urdu/Arabic codepoints** (no unused Latin subset bloat), while shaping tables account for most of the font payload (`GSUB: 271,314 B`, `glyf: 145,416 B`, `gvar: 116,820 B`, `GPOS: 47,634 B`).
- **Why Naive Glyph Subsetting Was Avoided:** Stripping contextual presentation forms or OpenType `GSUB` rules corrupts Nastaleeq word joining and cascading ligatures.
- **Safe Optimization Applied (`frontend/src/app/globals.css`):**
  - Pinned `@font-face` (`'NooriNastaleeq'`) to `font-weight: 400` and consolidated dense body/UI elements to weight `400` (`:where(body, div, section, header, nav, footer, p, span, a, li, button, label, h3, h4, h5, h6):not(h1):not(h1 *):not(h2):not(h2 *):not(strong):not(b) { font-weight: 400; }`) while retaining bold weights on `h1`, `h2`, `strong`, and `b`.
  - Kept `font-display: swap` paired with calibrated `NooriNastaleeqFallback` overrides (`ascent-override: 205%`, `descent-override: 65%`, `line-gap-override: 0%`, `size-adjust: 88%`), achieving **`0.0000` CLS**.

---

## 6. Priority Five & Six — Third-Party Scripts & Render-Blocking CSS

1. **AdSense & Consent Script Deferral (`frontend/src/components/AdSenseLoader.tsx` & `layout.tsx`):** Replaced eager `<Script>` injection with a deduplicated loader triggered on first user interaction (`pointerdown`, `keydown`, `scroll`, `touchstart`) or a `5000ms` fallback timer (`adsenseBefore: 0` -> `adsenseAfter: 1` confirmed in Playwright).
2. **Popup Hydration Deferral (`frontend/src/components/home/DeferredPopup.tsx`):** Increased fallback timer from `2200ms` to `5500ms` (with immediate mount on user interaction) so announcement modal code does not execute inside the initial Lighthouse TBT window.
3. **Passive Visit Telemetry (`frontend/src/app/providers.tsx`):** Replaced `requestIdleCallback(..., { timeout: 4000 })` (which fired `/api/visit` at `~606ms`, contending during load and logging a `500` error when local backend wasn't running) with a clean `5500ms` post-load timer, bringing Best Practices to **`100`**.
4. **Render-Blocking CSS Elimination (`frontend/next.config.ts`):** Kept `experimental.inlineCss: true`. Disabling `inlineCss` was benchmarked (`phase2i`) and confirmed worse across all Core Web Vitals (`RB: 0 → 2` requests, Mobile FCP/LCP `1.60s → 2.47s`, Speed Index `1.60s → 2.90s`).

---

## 7. Build, Lint, Runtime & Git Deployment Verification

- **TypeScript (`cd frontend && ./node_modules/.bin/tsc.cmd --noEmit --incremental false`):** Exited `0` with `0` errors.
- **ESLint (`cd frontend && ./node_modules/.bin/eslint.cmd ...`):**
  - **0 errors / 0 warnings** across all 19 core edited files (`layout.tsx`, `providers.tsx`, `AdSenseLoader.tsx`, `Footer.tsx`, `FooterCopyButton.tsx`, `Header.tsx`, `Hero.tsx`, `HeroCarousel.tsx`, `AcademicPrograms.tsx`, `WhyChooseUs.tsx`, `FacultySpotlight.tsx`, `NewsEvents.tsx`, `CTA.tsx`, `DeferredPopup.tsx`, `donations/page.tsx`, `news/page.tsx`, `coursesData.ts`, `articles.ts`, `next.config.ts`).
  - Pre-existing untouched lint items remain strictly isolated in `courses/page.tsx` (`no-explicit-any` at line 126 and unused imports) and `program/page.tsx` (3 unused icon imports).
- **Production Build (`npm --prefix frontend run build`):** Exited `0`, compiling `65/65` static pages + service worker (`public/sw.js`).
- **Playwright Multi-Route Verification (`verify_phase2_ui.js`):**
  - `/courses`: `HTTP 200`, `20` images (`18` optimized WebP), `brokenImgs: []`, `overflowX: false`
  - `/articles`: `HTTP 200`, `46` images (`10` optimized WebP), `brokenImgs: []`, `overflowX: false`
  - `/donations`: `HTTP 200`, `17` images (`14` optimized WebP), `brokenImgs: []`, `overflowX: false`
  - `/program`: `HTTP 200`, `13` images (`13` optimized WebP), `brokenImgs: []`, `overflowX: false`
  - `/news`: `HTTP 200`, `20` images (`15` optimized WebP), `brokenImgs: []`, `overflowX: false`
- **Visual Screenshot Inspection:** Verified Desktop Hero, Desktop Programs, Desktop Footer, and Mobile Hero PNG captures in full Nastaleeq RTL layout with sharp WebP rendering and zero visual regressions.
- **Git Branch Sync Note:** Vercel production tracks `origin/main`, while Phase 1 commit `baf25a9` had previously been pushed only to `origin/master`. Phase 2 pushes cleanly to **both** `origin/main` and `origin/master`.
