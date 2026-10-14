# WordPress Case Studies — Portfolio Project
### Built for: UK Professor's three live sites · Developed by **Sazzad Hossain** (@developersazzad)

Three separate, self-contained case-study pages (HTML + CSS + JS, with 3D concepts) plus three
social-media posters, one per site. Every page works offline — fonts and screenshots are embedded
as base64 — so a single file can be opened anywhere or pasted into a WordPress **Custom HTML**
block on your portfolio.

---

## 📁 Deliverables

| File | What it is |
|---|---|
| `motionuk-case-study.html` | Case study 01 — MotionUK study-abroad platform (dark navy / red theme) |
| `systemcorner-case-study.html` | Case study 02 — System Corner agency + WooCommerce service store (blue / yellow theme) |
| `gibs-case-study.html` | Case study 03 — GreenTech Institute (GIBS) + Moodle LMS (black / green theme) |
| `posters/motionuk-poster.png` | 2160×2700 poster (Instagram/LinkedIn 4:5) with developer credit bar |
| `posters/systemcorner-poster.png` | 2160×2700 poster |
| `posters/gibs-poster.png` | 2160×2700 poster |
| `posters/*-poster.html` | Editable HTML source of each poster |
| `assets/screenshots/*.jpg` | Optimised captures (hero, mobile, full-page, feature crops) used inside the pages |
| `_source/` | Build system: `data.py` (all content), `template.html`, `poster.html`, `build.py` (regenerates everything) |

Research raw material (full-res screenshots, captured page HTML/text, build logs) is kept in the
sibling folder `/home/user/research/`.

---

## 🔬 How the data was collected (methodology)

1. **Visited every site** (`motionuk.bcet.uk`, `systemcorner.com`, `gibsbd.org`) and read all main
   pages: Home, Services, Courses, Partners, Notice Board, Inquiry, Pricing, Shop, Services,
   Booking, About, LMS.
2. **Captured screenshots** with headless Chromium (Playwright): desktop 1440px, mobile 390px @2x,
   full-page scrolls, and targeted feature crops — 40+ captures. The MotionUK popup was closed for
   clean shots.
3. **Extracted the real tech stack** from each page's HTML source (`wp-content/themes/…`,
   `wp-content/plugins/…`, `<meta name="generator">`), so every claim below is verifiable in the
   live markup, not guessed.

### Verified stack fingerprints

| | MotionUK | System Corner | GIBS |
|---|---|---|---|
| CMS | WordPress | WordPress | WordPress |
| Theme | WoodMart + child | WoodMart + child | Astra (+ Astra Sites) |
| Builder | Elementor 3.27.6 + Pro Elements | Elementor 3.35.7 + Pro Elements | Elementor 3.24.5 + Pro Elements |
| Slider | — | Slider Revolution 6.5.20 | Slider Revolution 6.5.20 |
| Commerce | — | WooCommerce + Deposits/Partial Payments | — |
| Forms | WPForms, Contact Form 7, Popup Maker | WPForms, Simply Schedule Appointments, Bit Assist | WPForms |
| Media | Cloudinary CDN | Cloudinary CDN (190+ images) | — |
| SEO | — | Rank Math | — |
| Other | Element Pack Lite, Essential Addons | Element Pack Pro | LMS at `/lms` (Moodle, theme "mb") |

---

## 📄 The data behind each case study

### 01 · MotionUK — `motionuk.bcet.uk` (Study-Abroad Platform)
* **Client story:** London-based student recruitment agency (London HQ + Dhaka office) sending
  students to the UK, USA, Canada, Australia, France, Finland, Denmark — **7 destinations**.
* **Why the site matters:** it replaced phone/WhatsApp-only enquiries with a qualifying funnel.
* **Key customisation:** a **9-field admission inquiry** (name, mobile, email, course level,
  current qualification ×10 options, IELTS band ×12 options, start month, tuition budget, bank
  funds) → counsellors receive pre-qualified leads.
* **Signature features:** "DRAGON" UK journey roadmap (6 steps: Decision → Ready → Admission → Go
  → Operation → Nationality), desktop + **separate art-directed mobile sliders** (1200×500 vs
  450×650) per destination, 43 partner-university logo carousel, 10+ student testimonial slider
  (6 countries, degrees + universities named), Notice Board with IELTS guide, Courses pages with
  tuition-fee accordion tables, sticky bottom mobile nav, Popup Maker announcement.
* **Numbers used:** 7 destinations · 9 form fields · 43 logos · 2 offices.

### 02 · System Corner — `systemcorner.com` (Agency + Service Store)
* **Client story:** UK/USA web agency ("300+ websites crafted", 580+ projects, 180+ companies)
  that sells design/dev/marketing as products.
* **Why the site matters:** services became a self-serve store — browse → cart → deposit →
  book a call, no sales conversation needed.
* **Key customisation:** **WooCommerce service products** (11 products / 4 categories: combo,
  website, content writing, Facebook ads) with sale pricing, price filter, quick view, compare,
  wishlist; **Deposits & Partial Payments** for high-ticket packages ($399–$749+); **Simply
  Schedule Appointments** with 3 consultation types and automatic timezone detection ("Your
  timezone: America/New_York" observed live).
* **Signature features:** tabbed portfolio (Web, Ecommerce, Software, LMS, IT Consultancy) with
  long-scroll previews + "visit live site" links, 3D testimonial carousel, animated counters
  (600 clients / 400 projects / 5 team), FAQ, WhatsApp CTA bar, Bit Assist chat, all 190+ images
  served through Cloudinary as WebP/AVIF.
* **Numbers used:** 11 products · 4 categories · 3 bookable consults · 25+ showcased projects ·
  190+ CDN images.

### 03 · GreenTech Institute (GIBS) — `gibsbd.org` (Institute + Moodle LMS)
* **Client story:** long-established Chittagong institute (British affiliations: Edexcel
  Pearson, AIA) whose old site dated back to **2013** and whose e-learning lived separately.
* **Why the site matters:** one digital campus — website + media archive + downloads + LMS.
* **Key customisation:** full **legacy migration** to Elementor layouts (25+ pages: About, Why
  Study, Admission, Affiliations, Fees, Financial Aid, Career Advice, FAQ…), **13-slide Slider
  Revolution course hero** (IoT, Cyber Security, Software Engineering…), and a **Moodle LMS
  themed to the brand** on the same domain (`gibsbd.org/lms`) with a permanent "LMS" nav button.
* **Signature features:** Pearson Edexcel visit gallery (16 photos) with lightbox, campus
  galleries, 5 event galleries (ICPSD 2014, CU visit 2017, graduation…), 4 YouTube video embeds,
  Download centre (application form + admission procedure PDFs), leadership messages (MD +
  Chairman) — and the same WordPress+Moodle blueprint reused for sister portals (BCET LMS, KIGS
  LMS, Digital Library).
* **Numbers used:** 13 hero slides · 25+ migrated pages · 5 galleries + 4 videos · 1 Moodle LMS.

---

## 🧊 Page & 3D concept (max 3 sections, as briefed)

Each case study has exactly **three sections**:

1. **Overview** — a 3D "device stage": perspective-tilted browser frame whose full-page capture
   auto-scrolls, a floating phone showing the mobile build, a spinning brand cube, an orbit ring
   and glass info tags. The whole stage tilts with mouse / device orientation.
2. **Challenge & Build** — the four problems solved, a **3D stacked-card showcase** of three key
   feature screenshots (click / dots / auto-rotate), and six tilting "special customisation"
   cards with cursor spotlight.
3. **Impact** — animated stat counters, four outcome cards, a **3D rotating tech-stack ring**
   around a "Built on WordPress" core, and a closing CTA to the live site.

Footer on every page = developer credit (Sazzad Hossain, @developersazzad) with LinkedIn, GitHub,
Facebook, WhatsApp, YouTube and portfolio links.

## 🖼️ Posters

1080×1350 (4:5) minimal-3D posters: same device-stage concept, three stats, and a bottom credit
bar — *Designed & Developed by Sazzad Hossain* + all six social links. Rendered at 2× (2160×2700).

## 🛠️ Editing / regenerating

All text lives in `_source/data.py`. Change anything there and run:

```
cd case-studies/_source && python3 build.py           # pages + posters
cd case-studies/_source && python3 build.py --pages   # pages only
```

The build re-embeds fonts (Space Grotesk + Inter woff2) and screenshots, so output stays a single
portable file. Requires Python + Pillow (assets) and Playwright (poster PNG rendering only).

## 📌 Notes

- Data collected from the live sites on 27 Sept 2026; versions (Elementor 3.27/3.35/3.24,
  Slider Revolution 6.5.20) read from the served markup at that date.
- GIBS homepage title keeps the client's own spelling "Scinece"; body copy elsewhere uses
  "Science". Poster/page copy uses "GreenTech GIBS" to stay neutral.
- The QA full-page screenshots in `/home/user/research/` were used only for verification.

© 2026 Sazzad Hossain · Full-Stack Web Developer · sazzad.wedevspro.com
