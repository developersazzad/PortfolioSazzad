# BZmail — Case Study · Documentation

> **BZmail** — Email Marketing Tool powered by multiple Gmail SMTP servers. **No limit.**
> Case study designed & built by **Sazzad Hossain** ([@developersazzad](https://github.com/developersazzad)) · 2026

Live demo: **https://bzmail.uk/** · PWA panel: **https://res.bzmail.uk/**

---

## 1. What this repository contains

| File / folder | What it is |
|---|---|
| `index.html` | The complete interactive **case-study page** — a single, fully self-contained HTML file (inline CSS + vanilla JS, all screenshots embedded as base64 data-URIs, ~580 KB). Open it anywhere: browser, GitHub Pages, CDN — no dependencies, no network needed. |
| `posters/poster-1-user-panel-pwa.png` | Poster **1920×1080** — PWA user panel (phone mockups). |
| `posters/poster-2-admin-panel.png` | Poster **1920×1080** — admin panel (laptop mockup + SMTP pool card). |
| `posters/poster-3-full-ecosystem.png` | Poster **1920×1080** — all three surfaces (website + admin + PWA). |
| `screenshots/` | Clean, renamed copies of every product screenshot used (admin, PWA, website). |
| `GITHUB-README.md` | A ready-to-use **project README** to drop into the BZmail GitHub repository. |
| `scripts/` | Build sources: `template.html` (page template), `build_page.py` (injects image data-URIs), `make_posters.py` (PIL poster compositor), `prep_images.py` (image optimization). |
| `uploads/` | Original raw screenshots as provided. |

---

## 2. The data behind the case study

**BZmail** is a three-surface email-marketing ecosystem:

1. **Public website** (`bzmail.uk`) — dark, conversion-focused landing page: hero, sales-funnel storytelling, pricing tiers, testimonials, contact.
2. **Admin panel** — the control room: dashboard KPIs (Open / Click / Bounce / Campaigns), Gmail SMTP server cards with **Active/Disabled failover toggles** (`smtp.gmail.com : 587`), users & guests, projects (BCET, MotionUk, PPA, DMGD), campaigns with success/fail/don’t-try tracking, premade + custom templates, theme engine (light/dark/gradient, LTR/RTL), Copy/Excel/PDF exports.
3. **User panel (PWA)** — installable progressive web app with guest login & registration and a high-UX dark-glass UI.

**Key figures used (from live product screenshots):** 44% open rate · 44% click rate · 0% bounce · 9/10 delivery success (0 fail) on the test campaign · 4 projects onboarded · multi-server Gmail pool.

**The core problem solved:** Gmail caps a single account (~500 mails/day) and blocks it. BZmail rotates a *pool* of Gmail SMTP servers; when one hits its limit or bounces it flips to *Disabled* and traffic auto-routes to the next healthy server — sending never stops, and every send is tracked.

---

## 3. How the case-study page is built

Exactly **four sections**, as required:

1. **Overview (hero)** — headline, value chips, CTAs (demo / PWA / GitHub) and a 3D floating device constellation (browser + laptop + phone) over a perspective grid floor, with scroll-parallax layers and floating feature tags.
2. **Why BZmail exists** — four “Problem → Fix” cards explaining *why the engine, why the admin panel, why the user panel, why the impact*, plus an animated **“how the SMTP rotation works”** flow diagram (campaign → rotation engine → Gmail pool → inbox).
3. **The product (three surfaces)** — real screenshots in device mockups: website in a browser frame, admin in a **laptop frame with interactive tabs** (Dashboard / Servers / Users / Campaigns / Templates), PWA in **two smartphone frames**.
4. **Impact & results** — animated counters, “problems solved” checklist, live projects strip, skills/stack chips and the developer credit card with all social links.

### Design & engineering notes
- **3D concept:** CSS `perspective` + `rotateX/rotateY` device stages, pointer-tracking tilt (`vanilla JS`), layered floating animations, perspective grid floor, glassmorphism cards.
- **Parallax:** scroll-driven `translate` on layered devices (`data-plx` speeds) + pointer tilt on every device.
- **Zero dependencies / zero network:** all styles and scripts are inline; every screenshot is an optimized JPEG embedded as a data-URI (total page ≈ 580 KB) so the page renders identically offline, in sandboxes, or on GitHub Pages.
- **Motion:** IntersectionObserver reveal-on-scroll, animated counters, marquee strip, animated SMTP “pipe” dashes.
- **Responsive:** fully tuned mobile-first passes at **1020 / 920 / 768 / 560 / 420 px** — hamburger menu with slide-down panel, re-composed device stage (laptop full-width, website + phone side-by-side), tighter section spacing, scaled type/chips/counters. The website browser frame is **scrollable** (real mini-site preview) and admin laptop screens zoom to the KPI area on small viewports.

### Screenshot → placement map
| Source screenshot | Used as |
|---|---|
| admin (1) Dashboard | hero laptop + admin tab “Dashboard” + posters 2/3 |
| admin (2) All Servers | admin tab “Servers” + poster 2 floating card |
| admin (3) All Users | admin tab “Users” |
| admin (6) All Campaigns | admin tab “Campaigns” |
| admin (5) Premade Template | admin tab “Templates” |
| website_7 Guest Login | hero phone + PWA phones + posters 1/3 |
| website_5 Guest Registration | PWA phone + poster 1 |
| website full-page (top crop) | hero browser card + website frame + poster 3 |

---

## 4. Posters

Composited programmatically (`scripts/make_posters.py`, Pillow + NumPy): gradient glow backgrounds, perspective grid floor, **true perspective-warped** device mockups with soft shadows, feature chips, and a developer credit bar —
`Developed by Sazzad Hossain — @developersazzad · github.com/developersazzad`.

## 5. Rebuilding

```bash
python3 scripts/prep_images.py   # optimize screenshots -> scripts/img.json + screenshots/
python3 scripts/build_page.py    # inject data-URIs -> index.html
python3 scripts/make_posters.py  # render the 3 posters -> posters/
```

---

### Developer
**Sazzad Hossain** — Full-Stack Web Developer · [@developersazzad](https://github.com/developersazzad) ·
[LinkedIn](https://linkedin.com/in/developer-sazzad) · [Facebook](https://fb.com/developersazzad) ·
[WhatsApp](https://wa.me/8801877856951) · [YouTube](https://youtube.com/@sazzadhossain01) ·
[Portfolio](http://sazzad.wedevspro.com)
