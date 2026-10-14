# SystemEasy — Promotional Case Study Site + Marketing Posters

**Project:** SystemEasy — Complete Shop, Business & Inventory Management System (free POS management software)
**Developer of SystemEasy & this case study:** Sazzad Hossain — [@developersazzad](https://github.com/developersazzad)
**Built:** 2026-10-12 · Static HTML/CSS/JS (no build step, no dependencies) · minimal-3D concept · mobile-first

---

## 1. What this folder is

A 4-page promotional case-study website for **SystemEasy** (the Laravel POS/ERP at
[`https://se.wedevspro.com`](https://se.wedevspro.com/)) plus **4 marketing posters**
(2 × 1920×1080 and 2 × 1080×1440 / 3:4). Everything is static — upload the folder to any
host (shared hosting / GitHub Pages / Netlify / a sub-folder of wedevspro.com) and it works.

| File | Purpose |
|---|---|
| `index.html` | Promo hero + **the case study (exactly 2 sections: Problem → Solution & Impact)** + modules teaser + FAQ/AEO + CTA |
| `features.html` | Full software details: 7 modules in depth, engineering highlights, tech stack, metrics table, real-screenshot gallery with lightbox |
| `tutorials.html` | In-page YouTube player + **all 7 real playlist chapters** (real IDs, titles, durations, thumbnails) that play inside the page, plus the 6 uploaded live-system screens |
| `contact.html` | Full credits, direct contact channels, social links, hire CTA + personal banner |
| `css/style.css` | One shared stylesheet — mobile-first, minimal-3D concept, breakpoints **420 / 580 / 768 / 990** (+1200 container) |
| `js/lang.js` | Cookie-based **EN / বাংলা** switcher (cookie `se_lang`, 365 days, **default English**), full 213-key dictionary per language |
| `js/main.js` | 3D tilt, scroll reveal, screenshot lightbox, mobile burger menu, auto-year |
| `make_posters.py` | Pillow script that composes the 4 posters (re-run anytime: `python3 make_posters.py`) |
| `assets/img/` | The 7 uploaded screenshots, renamed semantically (see §4) |
| `assets/posters/` | The 4 finished marketing posters |
| `robots.txt`, `sitemap.xml` | SEO extras (placeholder domain — update on deploy, see §7) |

---

## 2. Source data used (nothing invented)

Every fact, metric and module description on the site and posters comes **only** from the
brief supplied by Sazzad Hossain:

- **Live system:** https://se.wedevspro.com/ — demo login `admin` / `admin123`
- **Tutorial playlist:** https://youtube.com/playlist?list=PLZ9xgaZ2Fc9oyiI9m-ZMmn6f8yPNabNCd
- **Metrics:** 69 normalized MySQL tables · 141 currencies · 81 permissions · 7 core modules · <50 ms transaction speed · 100 % uptime/stock accuracy
- **Stack:** Laravel 5.8, PHP 7.4-FPM, MySQL 8.0 (InnoDB), AdminLTE 2.4, Blade, jQuery, Bootstrap 3, DataTables server-side, Pusher, Milon Barcode, mPDF/DomPDF, Spatie Permission, Ubuntu 24.04 LTS, Nginx FastCGI, Cloudflare WAF/SSL, OPcache, Redis
- **Case-study narrative:** the 5 field problems (stock-sync leaks, missing double-entry accounting, checkout race conditions, FIFO costing, fragmented restaurant workflow) and the 6 engineering decisions (`lockForUpdate()`, BCMath, server-side DataTables, FIFO batch matching, auto double-entry posting, isolated PHP-FPM socket + installer route patching)
- **Developer identity/links:** email `developer.sazzad.me@gmail.com` · agency `wedevspro.com` · WhatsApp `wa.me/8801877856951` · LinkedIn `linkedin.com/in/developer-sazzad` · GitHub `github.com/developersazzad` · Facebook `fb.com/developersazzad` · YouTube `youtube.com/@sazzadhossain01` · portfolio `sazzad.wedevspro.com` · location Chattogram, Bangladesh

## 3. Case-study structure (kept to 2 sections on purpose)

1. **Section 01 — Why SystemEasy Had to Exist:** the 5 real business/technical failures.
2. **Section 02 — The Solution & The Impact:** reference architecture stack (Client → Gateway → Domain engines → MySQL), the 6 engineering decisions, and the metrics/impact table.

Everything else on `index.html` (hero, stats, modules teaser, FAQ) is promotional framing
around those two sections, not extra case-study sections.

## 4. Screenshot mapping (uploaded → renamed)

| Original upload | Now | Used as |
|---|---|---|
| `Home - wedevspro Agency (2).png` | `assets/img/screen-dashboard.png` | hero shot, gallery, poster 1/4, chapter 01 cover |
| `Home - wedevspro Agency (1).png` | `assets/img/screen-calculator.png` | gallery, chapter 02 cover |
| `Home - wedevspro Agency.png` | `assets/img/screen-profit.png` | gallery, poster 2, chapter 03 cover |
| `POS - wedevspro Agency.png` | `assets/img/screen-pos.png` | gallery, poster 2/3/4, chapter 04 cover |
| `System Easy - POS By Sazzad Hossain..png` | `assets/img/screen-landing.png` | gallery, chapter 05 cover |
| `Login - System Easy - POS By Sazzad Hossain..png` | `assets/img/screen-login.png` | gallery, poster 2/4, chapter 06 cover |
| `Fix What's Broken. Build What's Missing..png` | `assets/img/banner-sazzad.png` | contact page hire banner |

## 5. Language switcher (cookie based)

- Cookie name **`se_lang`**, value `en` or `bn`, expiry **365 days**, `path=/`, `SameSite=Lax`.
- **Default = English** when the cookie is absent.
- Switching is instant on click (all `data-i18n` / `data-i18n-ph` / `data-i18n-aria` nodes are
  re-rendered from the dictionary in `js/lang.js`), saved to the cookie, and auto-applied on
  every page load of every page. `<html lang>` updates to `en`/`bn`.
- 213 keys per language; a CI-style check confirmed every key used in the HTML exists in both
  dictionaries and the two dictionaries are symmetric.

## 6. Design system

- **Minimal 3D concept:** perspective-tilted hero screenshot with float animation, pointer-tracked
  card tilt (`data-tilt`, disabled on touch + reduced-motion), layered "press" shadows on buttons,
  glass navbar, gradient-mesh + grid backdrop, depth-numbered problem cards.
- **Mobile-first:** base styles target ≤420 px, then `min-width: 420 / 580 / 768 / 990` (+1200).
  Grid parity: stats 2→3→6 cols, cards 1→2→3, gallery 1→2→3, footer 1→2→4.
- Brand palette mirrors the live product: violet `#7c3aed/#a855f7`, orange `#ff5a1f`, green `#00a651`.
- Accessibility: skip link, semantic landmarks, `aria-pressed` on the language toggle,
  `aria-expanded` on the burger, focus-visible defaults, `prefers-reduced-motion` respected.

## 7. SEO / AEO applied

- Per-page unique `<title>`, meta description, keywords, robots, canonical, hreflang (`en` + `x-default`).
- Open Graph + Twitter cards on every page (poster images as share images).
- **JSON-LD:** `SoftwareApplication` (free offer, featureList, creator Person with sameAs socials),
  `Person`, `FAQPage` (6 Q&A mirroring the visible FAQ), `BreadcrumbList`, `WebPage`, `ItemList`
  (playlist chapters), `ContactPage`.
- AEO: visible FAQ written as direct question→answer sentences; concise factual summary lines
  (who / what / free / stack) so answer engines can quote them.
- Semantic HTML (header/nav/main/section/article/figure/footer), lazy-loaded images with
  width/height (CLS-safe), `robots.txt` + `sitemap.xml`.
- ⚠️ **Before deploying:** replace the placeholder domain
  `https://sazzad.wedevspro.com/systemeasy/` in canonical/OG/sitemap/JSON-LD with the real
  deployment URL (grep-replace `sazzad.wedevspro.com/systemeasy`).

## 8. Posters (marketing-ready)

| File | Size | Content |
|---|---|---|
| `assets/posters/poster-1-1920x1080.png` | 1920×1080 | Hero promo: headline, 7 feature chips, 4 metric tiles, tilted dashboard shot, "100% STOCK ACCURACY" badge, demo/URL footer |
| `assets/posters/poster-2-1920x1080.png` | 1920×1080 | "One Platform. Seven Power Modules." grid + metrics tile + 3 real screens |
| `assets/posters/poster-3-1080x1440.png` | 1080×1440 (3:4) | Vertical ad: "Run Your Entire Business From One Counter.", POS shot, 6 benefit bullets, demo CTA |
| `assets/posters/poster-4-1080x1440.png` | 1080×1440 (3:4) | Playlist ad: cascading chapter covers with play badges, "WATCH NOW" CTA |

All poster text is real vector text drawn with Pillow (crisp at any zoom), screenshots are the
actual product screens, and every poster carries credit + contact: `se.wedevspro.com`,
`@developersazzad`, `youtube.com/@sazzadhossain01`, `wa.me/8801877856951`.
Regenerate/modify via `python3 make_posters.py` (needs Pillow only).

## 9. Run locally

```bash
cd systemeasy
python3 -m http.server 8000        # then open http://localhost:8000
# posters (optional, already generated):
python3 make_posters.py
```

### 9.1 YouTube player note (Error 153 fix → custom smooth player, 2026-10-12)

The first build embedded the playlist via `youtube.com/embed/videoseries?list=…`.
YouTube's playlist player returns **Error 153 ("video player configuration error")** in
browsers that block third-party cookies / in some sandboxed preview contexts.
A plain single-video `youtube-nocookie` embed could still be blocked the same way, so the
final solution is a **custom professional player shell** (`js/player.js`, ~200 lines, no
build step) over the official **YouTube IFrame API** (`https://www.youtube.com/iframe_api`,
loaded on demand — the only external dependency):

- **Poster facade:** real `maxresdefault.jpg` thumbnail + big play button; the YouTube
  iframe is created only when the user clicks (fast first paint, no pre-emptive errors).
- **Custom control bar:** play/pause, seek slider, current/total time, volume + mute,
  playback speed (0.75–1.5×), auto-next toggle, fullscreen, "Watch on YouTube" link.
  YouTube's own chrome is hidden (`controls:0`) for a clean, branded look.
- **Chapter sidebar:** all **7 real playlist videos** (real IDs, titles, durations,
  `hqdefault.jpg` thumbs): `FsO6IZ4S8eQ, cKA3sNF2a8M, a3k3AQYl_7g, hqR7L0QkiOY,
  mBA78m4fEX0, z2FDFBCidMI, 7N9WS2n0a5I`. Click = play in page (active state highlighted);
  Ctrl/Cmd+click = open on YouTube with playlist context. Auto-advances to the next
  chapter on end when the toggle is on.
- **Error resilience:** on any player error the shell silently retries once on the
  alternate host (`www.youtube.com` ↔ `youtube-nocookie.com`); if that also fails it shows
  a graceful card with the error code, a **Retry** button and a **Watch on YouTube** button
  for that exact chapter — the page never dead-ends.
- **Keyboard:** Space/K play-pause · ←/→ seek ±5s · M mute · F fullscreen.
- JSON-LD `ItemList` lists the 7 real videos with their watch URLs; the uploaded
  screenshots remain as the "Live system screens" strip.

## 10. Credits

Architecture, development, case-study writing, design, screenshots, posters and tutorial videos:
**Sazzad Hossain (@developersazzad)** — full-stack web developer, Chattogram, Bangladesh.
Core technology credits: Laravel, PHP, MySQL, AdminLTE, jQuery, DataTables, Pusher,
mPDF/DomPDF, Spatie Permission, Nginx, Cloudflare.
