# Shopable Reel — Interactive Case Study

Portfolio case-study page for **Shopable Reel** (WordPress plugin, v1.5.0)
by **Sazzad Hossain — @developersazzad**.

Mobile-first · 3D concept design · vanilla HTML/CSS/JS · AJAX simulator · zero dependencies.

---

## 👨‍💻 About the Developer

| | |
|---|---|
| **Name** | Sazzad Hossain |
| **Handle** | `developersazzad` |
| **Role** | Full-Stack Web Developer |
| **Location** | Chattogram (Chittagong), Bangladesh |
| **Focus** | WordPress / WooCommerce plugin development, MERN-ready full-stack builds, UI/UX implementation, performance & SEO |

> “If ReelUp can charge monthly for this on Shopify, WooCommerce merchants deserve
> something even easier — paste one YouTube link and the store starts selling in motion.”

### 🧰 Skills & Tech Stack

**WordPress / Backend**
- WordPress plugin architecture (hooks, nonces, capabilities, `admin-ajax`, options & post-meta APIs)
- WooCommerce integration (products, galleries, price/badge logic, WoodMart & theme compatibility)
- PHP 7/8, MySQL, REST & AJAX API design, ACF (Advanced Custom Fields) auto-sync patterns
- Elementor Widget API — custom widgets with full live controls
- YouTube IFrame API — lazy players, muted autoplay policy, play-event analytics

**Frontend**
- JavaScript ES6+ (vanilla, dependency-free), DOM/IntersectionObserver/pointer events
- HTML5 semantic markup, CSS3 (3D transforms, perspective scenes, glassmorphism, animations)
- Mobile-first responsive design, Core Web Vitals & conditional asset loading
- SEO engineering: JSON-LD schema (`Person`, `SoftwareApplication`, `Article`, `FAQPage`), Open Graph, Twitter cards

**Full-Stack / MERN & Tools**
- React, Node.js, Express, MongoDB (MERN projects on GitHub)
- Git & GitHub workflow, Figma-to-code, cPanel/hosting deployment
- UI/UX case-study documentation & in-admin product docs

### 🔗 Links

| Platform | URL |
|---|---|
| 🌐 **Portfolio** | https://ai.khatifoodbazar.com/wa/portfolio/ |
| 🐙 **GitHub** | https://github.com/developersazzad |
| 💼 **LinkedIn** | https://www.linkedin.com/in/developer-sazzad |
| 💬 **WhatsApp** | https://wa.me/+8801877856951 |
| ▶️ **YouTube** | https://www.youtube.com/sazzadhossain_01 |
| ✉️ **Email** | developersazzad7@gmail.com |

---

## 📁 Files

| Path | Purpose |
|---|---|
| `index.html` | Dev version (links css/js/assets) |
| `css/style.css` | Mobile-first design system, 3D scenes, glassmorphism |
| `js/main.js` | Orbit-ring 3D hero, tilt+glare, reel viewer replica, lightbox, tabs, AJAX simulator, review system, counters |
| `assets/img/` | HD (2× retina, sharpened) plugin screenshots + cropped reel cards |
| `build_single.py` | Inlines CSS/JS/images → portable single file |
| `shopable-reel-case-study.html` | **Deliverable** — fully self-contained, opens anywhere, no server needed |

## 🔨 Rebuild single file

```bash
python3 build_single.py
```

## 🧭 Sections

Hero (3D orbit + phone) → Overview → Problem/Solution → 4-step User Flow (live screenshots) →
Feature deep-dive → Interactive carousel + full-screen viewer replica → Architecture & AJAX
simulator → Competitive comparison (ReelUp / Ecomm Reels) → SEO FAQ (with FAQPage schema) →
Results → 12-shot gallery with lightbox → **User reviews (star rating + localStorage persistence)**
→ Credits (Sazzad Hossain + portfolio/GitHub/LinkedIn links).

## 🔍 SEO built in

- Keyword-rich title/description/keywords for “Shopable Reel plugin”, “WooCommerce video reels”,
  “ReelUp alternative”, “developersazzad”, “Sazzad Hossain”
- Open Graph + Twitter cards, robots, canonical, theme-color
- JSON-LD `@graph`: Person (Sazzad Hossain / developersazzad) + SoftwareApplication
  (Shopable Reel v1.5.0, free offer, featureList) + Article
- Separate `FAQPage` schema mirroring the visible FAQ section
- Semantic single-H1 structure, descriptive alt text, keyword-anchored footer

## ⭐ Reviews

Visitors can publish reviews (name + 1–5 stars + text). Stored in `localStorage`
(`sr_case_reviews_v1`) with 3 seeded reviews; average score + star bar update live.

---

© 2026 **Sazzad Hossain** (`developersazzad`) — built with vanilla HTML / CSS / JS.
