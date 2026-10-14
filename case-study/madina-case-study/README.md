# Madina Clothing — WordPress E-commerce Case Study

> Portfolio case study for the **WordPress** section of [sazzad.wedevspro.com](https://sazzad.wedevspro.com)
> Live site: **https://madinaclothing.net/** · Data captured: **10 Oct 2026**

**Developer:** Sazzad Hossain — `@developersazzad` · Full-Stack Web Developer
[Portfolio](https://sazzad.wedevspro.com) · [LinkedIn](https://linkedin.com/in/developer-sazzad) · [GitHub](https://github.com/developersazzad) · [Facebook](https://fb.com/developersazzad) · [WhatsApp](https://wa.me/8801877856951) · [YouTube](https://youtube.com/@sazzadhossain01)

---

## 1. Deliverables

| File | What it is |
|---|---|
| `madina-clothing-case-study.html` | **Main case study.** A single self-contained file with all screenshots inlined as base64. Upload it as is or paste it into a WordPress *Custom HTML* block or page template. |
| `poster/madina-clothing-poster.png` | Poster, 2160×2700 (2×, 4:5). Use it for LinkedIn, Facebook and Instagram. |
| `poster/madina-clothing-poster.jpg` | The same poster at 1080×1350, a lighter file for the web and portfolio thumbnails. |
| `poster/poster.html` | HTML source of the poster, so you can edit it and re-render. |
| `assets/shots/` | Raw screenshots of the live site (desktop 1440px + mobile 390px @2x). |
| `assets/opt/` | Compressed versions that get embedded into the HTML files. |
| `src/*.template.html` | Editable templates. Images are written as `{{img:name}}` placeholders. |
| `build.py` / `render_poster.py` | Build scripts (see §6). |

> **Scope:** you chose **1 site → 1 case study + 1 poster**. The structure is reusable: copy `src/`, swap the screenshots and text, and run `build.py` to get case study #2.

---

## 2. Research: how the data was collected

1. **Crawled the live site** (home, shop, product, category, about) and read the full content.
2. **Captured screenshots automatically** with headless Chromium (Playwright), at desktop 1440×900 and mobile 390×844 @2x, plus a full-length mobile homepage that powers the auto-scrolling phone mockup.
3. **Fingerprinted the stack** from the page HTML: `meta[name=generator]`, `body` classes and `wp-content/plugins/*` asset paths.
4. **Pulled catalogue numbers** from the public WooCommerce Store API (`/wp-json/wc/store/v1/products`, `/products/categories`).
5. **Read the custom plugin's front-end source** (`sr-frontend.js`, `sr-floating.js`) to describe exactly what it does.

### Verified facts

| Item | Value | Source |
|---|---|---|
| Brand | Madina Clothing, "Islamic lifestyle store" | `<title>` |
| Market | United Kingdom, prices in **£ GBP**, UK phone, "dedicated store located in the United Kingdom" | Homepage content |
| Products | **158** published | Store API `X-WP-Total` |
| Categories | **16** (Fragrances & Scents 62, Men's Clothing 36, Islamic Lifestyle 31, Abaya/Women's 20, Prayer Mat 17, Thobe 15, Kufi 13, Moroccan Thobes 8, New Arrivals 7, Air Freshener 6, Bakhoor Burners 6…) | Store API |
| Platform | WordPress 7.1.3 · WooCommerce 11.1.2 · Elementor 4.3.2 + Pro Elements | `meta generator` |
| Theme | **Woodmart + woodmart-child** | body classes / asset paths |
| Slider | Slider Revolution 6.7.58 | `meta generator` |
| Payments | WooCommerce PayPal Payments | plugin path |
| Contact | Chaty widget with **WhatsApp + Phone** channels, Contact Form 7, WPForms | plugin path / `data-channel` |
| Size guide | Woo Advanced Product Size Chart; variations such as **S-52 / M-54 / L-56** | product page |
| Shop UX | AJAX shop, off-canvas sidebar on mobile, sticky bottom toolbar, wishlist, compare, quick view, 9/12/18/24 per page | body classes + UI |
| **Custom plugin** | **`shopable-reel-devsazzad` v1.5.0** | plugin path + JS source |
| Footer credit | "developed by Developersazzad" → wedevspro.com | footer HTML |

### What the custom plugin does (from its source code)
- A **reels carousel** (`.sr-devsazzad-wrapper`) with smooth, eased scrolling (custom `easeInOutCubic`).
- Each reel is linked to a **WooCommerce product**: thumbnail, `price_html`, **discount badge** and a "Go to product" CTA.
- A **modal player** with prev/next, a side playlist, a keyboard (Esc/arrow) handler, a sound toggle and a share button.
- It uses the **YouTube IFrame API** (`YT.Player`) so mute, unmute and autoplay are reliable instead of using raw postMessage.
- A **MutationObserver** re-initialises widgets, so the carousel also works inside the Elementor editor.
- A **floating mini-reel** (`sr-floating.js`) attaches to the product gallery, with a fixed-position fallback. It can be **dragged with mouse or touch**, expanded and minimised.

---

## 3. Case study structure (2 sections, as requested)

**Hero:** title, one-line value statement, meta cards (Client · Market · Platform · Role), CTAs, and a **3D stage** (tilted laptop + auto-scrolling phone + floating stat chips + 3D orb, ring and Islamic-arch shapes).

**Section 01: Why this site (the problem)**
Four problem cards, each paired with its fix:
1. Selling through DMs → self-serve PayPal checkout, open 24/7
2. Mixed catalogue (sizes, ml, books, mats) → 16 nested categories + variable products
3. Size doubt = returns → size chart + one-tap WhatsApp/phone
4. Shoppers start on video → custom Shoppable Reel plugin

Plus a **Client requirements** panel.

**Section 02: Solution & impact**
- A signature card for the **Shoppable Reel plugin**, with a 3D reel carousel mockup and a code snippet
- Six feature cards: categories, size guide, app-like mobile UX, trust & contact, AJAX shop, checkout & ownership
- A screenshot gallery: product, shop and category pages
- Impact stats: **158 products · 16 categories · 1-tap contact · 24/7 ordering**
- Three outcomes and the tech stack chips

**Footer:** developer credits with every social link.

---

## 4. Design system

| Token | Value |
|---|---|
| Deep green | `#0f2219` / `#14281d` / `#1f3a2c` (taken from the site's top bar) |
| Brand green | `#3d6b4a`, mint `#e7efe9` |
| Gold accent | `#c9a45c` / `#e9d3a1` (fits the luxury fragrances and Islamic look) |
| Background | Cream `#f7f4ee`, paper `#fffdf9` |
| Display font | **Fraunces** (serif, italic for "Clothing") |
| Body font | **Plus Jakarta Sans** |
| 3D language | CSS `perspective` mockups, layered "clay" shadows, gradient orbs, gold rings, an **Islamic arch** motif, mouse-parallax hero, card tilt |

### Responsive and mobile-first
The CSS is written **mobile-first**, with these breakpoints:

| Query | Changes |
|---|---|
| `< 420px` | Smaller 3D stage and phone, one chip hidden, tighter stats |
| `≥ 420px` | More padding, larger phone mockup |
| `≥ 580px` | Meta cards in a 4-column row, 2-column problems and features, 4-column stats, 3-column socials |
| `≥ 768px` | Big outlined section numbers, 2-column gallery, 3-column outcomes, split footer |
| `≥ 990px` | Two-column hero with the 3D stage, 4-column problems, split plugin card, 3-column features, hover-depth gallery |
| `≥ 1280px` | Max-width tuning |

- Tested for **no horizontal overflow** at 1440 / 990 / 768 / 580 / 420 / 375 px.
- 3D tilt and parallax only run on devices with a fine pointer (mouse). On touch screens the elements float gently instead.
- `prefers-reduced-motion` turns off all animation.
- Semantic landmarks, `aria-label`s and alt text are included.

---

## 5. Poster
- **Format:** 1080×1350 (4:5), exported at 2× → 2160×2700 PNG.
- **Content:** title, value line, a 3D composition (laptop + shoppable reel card + phone), stat chips, four feature tiles.
- **Bottom band:** developer credits (Sazzad Hossain · @developersazzad · Full-Stack Web Developer · portfolio · GitHub · LinkedIn · WhatsApp), with minimal 3D gold-ring and arch accents.

---

## 6. Rebuild and edit
```bash
pip install playwright pillow && python -m playwright install chromium
# edit src/case-study.template.html or src/poster.template.html, then:
python build.py          # rebuilds both HTML files with images inlined
python render_poster.py  # re-exports poster PNG
```

---

## 7. Notes for you, Sazzad (please check)
- **Problems and outcomes are written from analysing the site** (catalogue, features, UX). They are not client analytics. If you have real numbers (orders, conversion rate, fewer DMs), add them to the impact stats for more credibility.
- The site sells to the **UK** (£, UK store). Your note says it was a **BD client** project. If the owner is Bangladeshi, you can add one line such as *"Bangladeshi-owned brand, UK market"* in the hero meta.
- At capture time the Shoppable Reel scripts were loaded site-wide, but **no reel widget was published on the pages we checked**. If a page with reels exists, a screenshot of it would make the plugin section even stronger.
- The site's top bar says "Free shipping for orders of **$150**", but the store uses **£**. You may want to fix that on the live site.
- Fonts load from Google Fonts. Offline, the page falls back to Georgia and system fonts, so the layout stays the same.
