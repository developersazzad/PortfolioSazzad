# 👑 GoldMaker — 3D Case Study (README)

**Project:** GoldMaker — Gold & Bitcoin Mining Platform
**Case Study by:** Sazzad Hossain — Full-Stack Web Developer
**Live demo:** https://res.bzmail.uk/ · Signup: https://res.bzmail.uk/create/signup · Admin: https://res.bzmail.uk/admin_login

---

## 📦 What's inside

| File | Purpose |
|---|---|
| `index.html` | ⭐ The complete interactive 3D case study — one self-contained file (HTML + CSS + JS + all 22 screenshots + fonts embedded as base64). No internet needed — works offline, share it as a single file. |
| `template.html` | Editable source template (images referenced by keys, assembled by `build.py`) |
| `build.py` | Build script — re-embeds assets into `index.html` after you edit the template |
| `assets/user/` | 14 real PWA user-app screenshots (cleaned, browser chrome cropped) |
| `assets/admin/` | 7 real admin-panel screenshots |
| `assets/site/` | Full-length marketing website capture |
| `fonts/` | Poppins 400 / 600 / 800 (woff2) — embedded into the page |
| `posters/` | 3 posters, 1920×1080 (PNG + JPG) with developer credit |
| `../make_posters.py` | Python (Pillow) renderer that generated the posters |

## 🧭 The 5 sections of the case study

1. **Hero — "GOLDMAKER"** — 3D floating devices: admin panel on a laptop behind, PWA app on phones in front, orbit rings, gold particles, mouse + scroll parallax, animated counters.
2. **01 · The Why** — the problem (manual, trust-less investing), the idea (packaged mining plans with daily bonuses), the build (3 products, 1 ecosystem) + the 4-step investor journey with the real progress meters from the site.
3. **02 · The Products** — tabbed 3D showcase:
   - 🌐 **Website:** the full landing page scrolls *inside a laptop frame*.
   - 🛡️ **Admin panel:** 7 clickable screens in a laptop gallery (dashboard, stats, investors, packages, KYC, customizers).
   - 📱 **PWA app:** floating 3-phone stage + all 14 screens as clickable thumbnails (side phones are previous/next).
4. **03 · The Impact** — Before → After comparison, animated counters, and impact for Owner / Investors / Engineering.
5. **04 · Stack & Skills** + **05 · Credits** — technology groups and full developer contact card (LinkedIn, GitHub, Facebook, WhatsApp, YouTube, Portfolio) with live demo buttons.

## 📱 Responsive system (v2 — mobile-first overhaul)

Verified with a real headless-Chrome audit at **13 viewports**: 320 / 360 / 390 / 420 / 480 / 560 / 640 / 768 / 920 / 1080 / 1280 / 1440 / 1920 — zero horizontal overflow, zero clipped text.

| Breakpoint | What changes |
|---|---|
| **≤1080px** | Hero stacks vertically, stage centers, showcases become single-column |
| **≤920px** | Nav becomes an always-visible swipeable pill menu (no JS needed), tighter section padding |
| **≤768px** | Hero = laptop + 1 phone, 2-col grids collapse, thumb grid 2-col |
| **≤560px** | Full-width stacked buttons, stats bar 2×2, single phone PWA stage (auto-height, no overflow), tabs full-width |
| **≤420px** | Fluid `GOLDMAKER` title always fits (13vw clamp), 4-col PWA thumbnails, compact cards |

Extra hardening: exact 1:2 phone screens (matches the real screenshots), `viewport-fit=cover`, `-webkit-text-size-adjust`, touch scrolling in the website frame, print stylesheet, and `prefers-reduced-motion` support.

## ✨ Interactions built in (pure JS, no libraries)

- Mouse parallax on hero devices (depth layers via CSS `translate`)
- Scroll parallax on background blobs + hero stage
- Card 3D tilt (perspective rotateX/Y)
- Scroll-reveal animations, animated number counters
- Tab switching + two interactive screenshot galleries
- Scroll progress bar, sticky glass navbar, mobile menu, back-to-top

## 🔧 How to customize

1. Edit `template.html` (texts, colors in `:root`, sections).
2. Swap any screenshot in `assets/` (keep the same file name).
3. Run: `python3 build.py` → it rebuilds `index.html` with fresh base64 assets.

## 🖼️ Posters (1920×1080)

- `poster-1-pwa-user-panel` — PWA user app with floating 3D phone
- `poster-2-admin-panel` — admin panel with laptop + phone
- `poster-3-platform-overview` — all 3 products in one frame
- Every poster carries the developer credit line + GitHub link: **Developed by Sazzad Hossain — github.com/developersazzad**

## 📊 Data used in the case study

All screens are **real product screenshots** (not mockups). Public figures shown on the live site (32 users · 17,121 total invest · %14 share profit · package prices 100–600 USD · daily bonus 0.8–3.7 USD · 30-day durations) are reported as displayed by the platform demo.

---

© 2023–2026 GoldMaker · Case study designed & engineered by **Sazzad Hossain**
GitHub — [github.com/developersazzad](https://github.com/developersazzad) · Portfolio — [sazzad.wedevspro.com](https://sazzad.wedevspro.com)
