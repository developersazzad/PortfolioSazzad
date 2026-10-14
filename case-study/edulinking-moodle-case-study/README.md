# Client case studies — BCET LMS & EduLinking Career

Two compact, self-contained case-study pages (HTML + CSS + JS in one file each, screenshots
inlined as data URIs) plus two 1920×1080 posters with the developer credit in the bottom bar.

## What is in here

| File | What it is |
|---|---|
| `case-study-bcet-lms.html` | Case study 01 — Moodle LMS build for Brit College of Engineering & Technology. Single file, works offline. |
| `case-study-edulinking.html` | Case study 02 — WordPress/Elementor enrolment funnel for EduLinking Career. Single file, works offline. |
| `posters/poster-bcet-lms.png` / `.html` | 1920×1080 poster. PNG = ready to upload, HTML = the editable source. |
| `posters/poster-edulinking.png` / `.html` | 1920×1080 poster, same idea, navy/gold palette. |
| `dist/` | Deploy copy: same single-file pages, but screenshots are **file references** (`assets/*.jpg`) instead of base64 — 28 KB per page instead of 430 KB. Upload the contents of `dist/` as-is. |
| `src/` | Editable sources: `case.css`, `case.js`, templates, `data.json` (all copy lives here). |
| `assets/` | Captured + optimised screenshots used by both pages. |
| `shots/` | Raw captures and responsive QA renders (not part of the deliverable). |
| `build.py` | Rebuild everything: `python3 build.py` (self-contained) / `python3 build.py --dist` (deploy copy). |
| `verify.js` | QA: 16 checks — 2 pages × 8 viewports (1440/1200/990/768/580/420/390/360): overflow, broken images, JS errors, alt text. |
| `research/measure.json` | Measured live data used for the numbers in the case studies. |

## Preview

`python3 -m http.server 5173 --bind 0.0.0.0` from this folder, then open `/` (index.html lists
both case studies and both posters). The pages themselves need no server — each one is a single file.

## Structure (deliberately short)

Each page is a two-column hero (copy left, **compact 3D preview card** right — 519×361 px, with
a 390 px phone thumb and a second detail thumb underneath) followed by **exactly two case
sections** — `01 Problem` and `02 Outcome` — a 4-number stat strip and one pull line.
No process theatre, no filler. On mobile the whole preview collapses to a 264×191 px card,
so the H1 and lede stay in the first screen.

Measured hero heights: 565 px desktop (1440) · 795–823 px on a 390 px phone.

## Verified numbers (measured on the live sites, headless Chromium @1440)

- bcet-lms.gibsbd.org — 21 courses listed on the front page, 10 lecturer profiles, self-enrolment
  with 50-seat caps on degree courses, accessibility panel (4 profiles, 6 contrast modes, text
  size/spacing, reading guide/mask, stop animations), course-catalogue page load 1251 ms /
  interactive 778 ms, homepage load 2380 ms, LiteSpeed server, Moodle `mb2nl` theme.
- edulinking.uk — WordPress + Elementor Pro + Woodmart child, fee ৳20,000 standard / ৳12,000
  early bird (40%), bKash / bank / Visa-Mastercard, book-seat-then-pay flow, 3-month internship
  block (50+ hrs live tutorials, 5 projects), homepage load 1142 ms, mobile bottom nav
  (Home · Ongoing · Notice · Contact).

## Editing

1. Change copy in `src/data.json`, style in `src/case.css` / `src/poster.css`.
2. `python3 build.py` → pages + poster HTML. `node render-posters.js` → poster PNGs.

Design: mobile-first, 3D showcase with pointer tilt (desktop) and device-orientation tilt
(mobile), `prefers-reduced-motion` respected, breakpoints 990 / 768 / 580 / 420.

© 2026 Sazzad Hossain — @developersazzad · sazzad.wedevspro.com
