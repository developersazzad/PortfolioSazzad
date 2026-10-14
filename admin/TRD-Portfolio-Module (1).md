# TRD — Portfolio Management Module for `SalesEngine WA-KHF` Admin Panel

**Document type:** Technical Requirements Document (TRD) / Build Instruction
**Project:** Portfolio CMS — new `Portfolio` menu inside the existing **SalesEngine WA-KHF** admin panel
**Public frontend (already built, live):** https://ai.khatifoodbazar.com/wa/portfolio/
**Admin panel (existing, to be extended):** https://ai.khatifoodbazar.com/wa/login
**Prepared for:** Sazzad Hossain (dev / owner)
**Version:** 1.0 — 20 September 2026
**Status:** Ready for development (2 blocking questions in §3.2 must be answered first)

---

## Table of contents

1. [Overview & background](#1-overview--background)
2. [Objectives, success criteria & scope](#2-objectives-success-criteria--scope)
3. [Assumptions, dependencies & open questions](#3-assumptions-dependencies--open-questions)
4. [System architecture](#4-system-architecture)
5. [Menu, routing & permission model](#5-menu-routing--permission-model)
6. [Frontend content inventory → database mapping](#6-frontend-content-inventory--database-mapping)
7. [Database design](#7-database-design)
8. [Admin functional specification (screen by screen)](#8-admin-functional-specification-screen-by-screen)
9. [Public + admin API contract](#9-public--admin-api-contract)
10. [Frontend integration plan](#10-frontend-integration-plan)
11. [Security requirements](#11-security-requirements)
12. [Validation rules (master table)](#12-validation-rules-master-table)
13. [Media & file handling](#13-media--file-handling)
14. [Email & notification specification](#14-email--notification-specification)
15. [Non-functional requirements](#15-non-functional-requirements)
16. [Delivery plan, timeline & effort](#16-delivery-plan-timeline--effort)
17. [Testing, QA & acceptance criteria](#17-testing-qa--acceptance-criteria)
18. [Deployment, migration & rollback](#18-deployment-migration--rollback)
19. [Risks & mitigation](#19-risks--mitigation)
20. [Deliverables checklist](#20-deliverables-checklist)
21. [Appendices](#21-appendices)

Companion files in this folder:

| File | Purpose |
|---|---|
| `TRD-Portfolio-Module.md` | This document — full build instruction |
| `portfolio_schema.sql` | Complete MySQL DDL (tables, indexes, FKs, seed rows) — ready to import |
| `portfolio_api_contract.json` | Reference JSON shape for the public site payload (also usable as seed/import sample) |
| `reference/frontend-live-source.html` | Snapshot of the live portfolio frontend (audited source) |
| `reference/admin-login-source.html` | Snapshot of the existing admin login page (stack confirmation) |

---

## 1. Overview & background

### 1.1 What exists today

**A. The public portfolio frontend** — `https://ai.khatifoodbazar.com/wa/portfolio/`

- Single static HTML file (~156 KB) with inline CSS + inline vanilla JavaScript, Tailwind loaded from CDN, dark terminal-inspired theme with a lime accent (`--accent: #b6ff3c`), light-theme variant available via `data-theme="light"`.
- All content is **hard-coded in JavaScript `const` arrays** inside the page (`CAPABILITIES`, `BRING`, `STACK_GROUPS`, `PROJECTS`, `STEPS`, `PRINCIPLES`, `RESPONSIBILITIES`, `STRENGTHS`, `AVAILABLE_FOR`, `ROLES`, `TESTIMONIALS`) plus hard-coded HTML for Hero, About, Experience, Beyond Code, FAQ, Contact and Footer.
- Render pipeline: `renderXxx()` functions build the DOM from those arrays and a `buildCaseModal()` / `buildSlide()` pair powers the project case-study modal and the testimonial carousel.
- **The comment in the source literally says the data arrays are placeholders meant to be swapped for an API/CMS call without touching render logic** — that is the single most important fact for this project: the frontend was designed for exactly this module.
- Gaps found in the audit:
  - Contact form `handleContactForm()` is a **fake `setTimeout` simulation** — no message is ever stored or emailed.
  - Footer newsletter form is `onsubmit="event.preventDefault()"` — **saves nothing**.
  - CV button points to a **static PDF** (`/wa/portfolio/assets/cv/developer_sazzad.pdf`); replacing the CV requires a manual file upload to the server.
  - Social links: Facebook / X are `href="#"` (dead), LinkedIn points to the generic `linkedin.com`.
  - Testimonials are duplicated in the DOM by carousel cloning; the source array holds 5 unique entries.
  - All 10 projects display "View Case Study" but there is no per-project URL — deep linking / sharing / SEO per project is impossible today.

**B. The existing admin panel** — `SalesEngine WA-KHF` at `https://ai.khatifoodbazar.com/wa/`

- PHP **8.3.33** on **LiteSpeed** (HTTP/3 + QUIC enabled, HSTS on), MySQL, session cookie named `SEWA_SESSION` (HttpOnly + Secure), `x-frame-options: SAMEORIGIN`, `x-content-type-options: nosniff`.
- Clean-URL routing (`/wa/login`, `/wa/admin` → 302 to `/wa/login`), CSRF token already implemented as a hidden `csrf_token` field (64-hex), Bootstrap 5.3.2 + Bootstrap Icons 1.11.1 + Inter font, WhatsApp/SalesEngine branding with brand asset paths (`/wa/assets/media/brand/...`).
- Because the portfolio lives under `/wa/portfolio/`, **the public site and the admin panel share the same PHP application and domain** — the module can reuse the existing session, CSRF, DB connection, mailer, media library and route table instead of building a second application.

### 1.2 What is requested

Add a **`Portfolio` menu** to the admin sidebar with (as specified) these submenus:

1. **Customization** 2. **Contact** 3. **CV** 4. **Activity**

…so that **every section of the public portfolio can be managed from the panel, 100% content-editable, professionally organised, and super easy to operate**. Stack is fixed: **PHP + JavaScript + AJAX + MySQL**, plus supporting libraries where needed.

### 1.3 Problem statement

Today, any change to the portfolio (new project, new testimonial, updated CV, changed hero text, fixed typo) requires editing HTML/JS source and re-uploading a file. There is no contact inbox, no subscriber list, no CV versioning, no audit trail, and no way for a non-developer (e.g. a VA, marketer) to update the site. This module converts the portfolio from a **static page** into a **CMS-managed website** inside the panel the team already uses daily.

---

## 2. Objectives, success criteria & scope

### 2.1 Objectives

| # | Objective | Measurable success criterion |
|---|---|---|
| O1 | Full content control from admin | 100% of visible text, image, link and list item on the public page is editable from the panel — verified by a checklist covering every field in §6 |
| O2 | Manage without a developer | A non-technical operator can publish a new project, add a testimonial, replace the CV and hide a section, following only the in-panel help text |
| O3 | Capture real leads | Contact + subscribe forms persist to DB, notify by email, and appear in the Contact inbox with status workflow |
| O4 | No regression on the live design | Public page renders pixel-identically to the current build (all existing animations: globe, marquee, carousel, typewriter, case modal, theme toggle, back-to-top) |
| O5 | Speed & SEO preserved | Public HTML payload unchanged in size; content data delivered in a single cached JSON request ≤ 40 KB gzipped; p95 TTFB < 400 ms on shared hosting |
| O6 | Professional operations | Every create/update/delete is audit-logged, content revisions are restorable, media is centrally managed |

### 2.2 In scope

- New `Portfolio` parent menu + submenus in the admin sidebar, with role-based visibility.
- Database: 41 new tables with the `pf_` prefix (§7) — additive only, no existing table altered.
- Admin CRUD + settings screens for every portfolio section (§8).
- Public read API + public write endpoints (contact, subscribe, CV download counter) (§9).
- Migration of the live frontend from hard-coded arrays to API/bootstrap data, with **zero changes to visual design** (§10).
- Seed/import of all current live content, so day-1 the site looks exactly like it does now.
- Media upload library for portfolio assets (images, PDFs), with resize/WebP conversion.
- Email notifications for new inquiries and subscribers; CSV/Excel export.
- Activity/audit log, login history, revision restore, cache purge, backup/export tools.
- Documentation: admin user guide (1–2 pages) + developer handover notes.

### 2.3 Out of scope (v1)

- Redesign or layout changes of the public portfolio (the design is frozen; only content becomes dynamic).
- Multi-language site (EN + BN toggle) — designed for, not built (see §15.5).
- Multi-user portfolios / multiple profile sites (single portfolio assumed).
- Blog, payments, client portal, testimonials submission form on the public side.
- Replacing the Tailwind CDN with a compiled build — **recommended but a separate task** (§19, R7). The module must not break the current CDN setup.
- WhatsApp/SalesEngine core features of the existing panel.

### 2.4 KPI to monitor after go-live (Activity module provides the data)

- Contact submissions per month (baseline today: **0**, because the form is fake).
- Subscribers captured per month.
- CV downloads per month.
- Time-to-publish for a new project (target: **< 5 minutes**, no code).

---

## 3. Assumptions, dependencies & open questions

### 3.1 Assumptions (proceed unless corrected)

1. **A1** — The existing panel is plain PHP (no Laravel) with its own mini-router, PDO/MySQLi layer, CSRF helper and `SEWA_SESSION` auth. The module will follow the existing conventions of that codebase rather than introducing a framework.
2. **A2** — The panel's DB user can `CREATE TABLE` in the same schema (or a `portfolio_` prefixed set inside it). If not, DB scripts must be run by the hosting provider/DBA.
3. **A3** — `mod_rewrite`/LiteSpeed rewrite rules can be added to `/wa/.htaccess` for the new clean URLs.
4. **A4** — The server can write to a storage path (e.g. `/wa/storage/portfolio/` or `/wa/assets/media/portfolio/`); PHP uploads are enabled with ≥ 10 MB limit.
5. **A5** — An SMTP account exists or can be created for notifications (e.g. `no-reply@khatifoodbazar.com`). If not, fall back to PHP `mail()`.
6. **A6** — Single portfolio, single language (English), single owner account plus optionally one editor account.
7. **A7** — The server timezone is Asia/Dhaka; all stored timestamps are UTC in MySQL, rendered in Asia/Dhaka in the UI.
8. **A8** — Content is provided by the owner (project images, case-study details, new testimonials). Placeholder fallbacks must never appear in production if content is missing (see §12, required-field rules).

### 3.2 Blocking questions (need an answer before coding starts)

| # | Question | Why it blocks | Recommendation |
|---|---|---|---|
| **Q1** | **Is the public portfolio allowed to become `index.php` instead of `index.html`?** (one-line change: the page prints the content JSON inline as `window.__PF_DATA__` so there is zero extra request and SEO is preserved) | Determines the frontend integration method (Option A vs B in §10.3) | **Yes → Option A.** Falls back to pure `fetch()` if you refuse |
| **Q2** | **Do you want the CV built automatically from your profile data (PDF generated from a template) or just an uploaded PDF file?** | Changes CV module scope by ~1.5–2 dev-days | **Both, phased:** v1 = upload + versioning + analytics (fast, safe); v1.1 = template generator |

### 3.3 Non-blocking questions (nice to confirm early)

3. Number of admin users who will manage the portfolio, and their roles.
4. Should the "Hire Me" mailto in the footer keep `hello@sazzadhossain.dev` (a domain not otherwise used) or switch to `developer.sazzad.me@gmail.com`?
5. Do you want reCAPTCHA v3 on the contact form, or honeypot + rate-limit only (zero friction)?
6. Testimonials: keep the current 5, or curate a shorter, visually stronger set? (Currently duplicated on screen by the carousel — a content decision, not a technical one.)
7. Analytics: Google Analytics 4 / Meta Pixel IDs available for the SEO & Integrations tab?

---

## 4. System architecture

### 4.1 High-level component diagram

```
                        ┌───────────────────────────────────────────────┐
                        │  Browser — PUBLIC SITE                        │
                        │  https://ai.khatifoodbazar.com/wa/portfolio/  │
                        │  index.php (design unchanged)                 │
                        │   ├─ window.__PF_DATA__  (inline JSON, Q1=A)  │
                        │   ├─ renderXxx() functions  (unchanged)       │
                        │   └─ fetch() fallback → /portfolio/api/site   │
                        └───────────────┬───────────────────────────────┘
                                        │  GET  (cacheable, ETag, gzip)
                                        │  POST contact / subscribe  (rate-limited)
                        ┌───────────────▼───────────────────────────────┐
                        │  PUBLIC API LAYER   /wa/portfolio/api/*.php   │
                        │  site.php · contact.php · subscribe.php ·      │
                        │  cv-download.php · sitemap.php · jsonld.php    │
                        └───────────────┬───────────────────────────────┘
                                        │
              ┌─────────────────────────▼─────────────────────────────┐
              │  SERVICE LAYER  /wa/portfolio/lib/                     │
              │  Repository classes · Validator · MediaService ·       │
              │  MailService · ActivityLogger · CacheWriter ·          │
              │  SlugService · RateLimiter · RevisionService           │
              └───────┬───────────────────────────────┬───────────────┘
                      │ PDO (prepared)                │ filesystem
        ┌─────────────▼──────────────┐   ┌────────────▼─────────────────┐
        │ MySQL — pf_* tables        │   │ Storage                      │
        │ 41 tables, InnoDB, utf8mb4 │   │ /wa/storage/portfolio/…      │
        └─────────────▲──────────────┘   │   uploads/img, uploads/cv,   │
                      │                  │   cache/site.json            │
                      │                  └──────────────────────────────┘
        ┌─────────────┴───────────────────────────────────────────────┐
        │  ADMIN PANEL  SalesEngine WA-KHF   /wa/portfolio/…          │
        │  Sidebar → Portfolio ▾ (Overview · Customization ·          │
        │  Contact · CV · Activity)  + Projects/Content screens       │
        │  Bootstrap 5.3 · AJAX fetch · CSRF token reuse · SEWA_SESSION│
        └─────────────────────────────────────────────────────────────┘
```

### 4.2 Technology stack (fixed by requirement, confirmed against the live panel)

| Layer | Technology | Notes |
|---|---|---|
| Backend | PHP 8.3 (server-confirmed `PHP/8.3.33`) | Typed properties, `match`, enums allowed; keep compatible with 8.1+ |
| Database | MySQL 8 / MariaDB 10.4+, InnoDB, `utf8mb4_unicode_ci` | PDO with `ERRMODE_EXCEPTION`, prepared statements only |
| Admin UI | Bootstrap 5.3.x + Bootstrap Icons 1.11 (already loaded in panel) | Keep the panel's existing card/table/form classes so the module looks native |
| JS | Vanilla JS + `fetch()` AJAX (no build step), optional jQuery only if the existing panel already uses it | Drag-and-drop reorder via SortableJS (single CDN file, no build) or native HTML5 DnD |
| Rich text | TinyMCE 6 self-hosted (or Summernote) for About/Project case-study fields only | Everything else plain textarea; store sanitised HTML |
| Media | GD or Imagick (GD assumed), PDF validated with `finfo` | Auto WebP conversion + thumbnail generation |
| PDF (CV generator, v1.1) | Dompdf (pure PHP, no system dependency) | Reads the same DB data as the site |
| Mail | Existing panel mailer if present, else PHPMailer 6 with SMTP (or `mail()`) | Queue table for retry (`pf_email_queue`) |
| Excel/CSV export | CSV via `fputcsv` (always available) + optional PhpSpreadsheet |  |
| Charts (Activity/Overview) | ApexCharts or Chart.js CDN | Dashboard widgets only |
| Server | LiteSpeed + `.htaccess` rewrites, HTTP/3, gzip/brotli | Cache purge hook on content save |

External libraries are limited to: SortableJS, TinyMCE, Chart.js/ApexCharts, PHPMailer, (optional) Dompdf, (optional) PhpSpreadsheet. **No Composer requirement for the core module** — a `vendor/` folder with prebuilt libs is acceptable on cPanel-style hosting.

### 4.3 Key architectural decisions

| ID | Decision | Rationale |
|---|---|---|
| AD1 | **Public site is server-bootstrapped, not a blank fetch.** `index.php` prints the compact content JSON inline; the existing `renderXxx()` functions then run exactly as today. | Zero extra round-trip (faster than today's CDN-fetch pattern), no flash of empty content, graceful fallback if the API is down (last cached JSON baked at build), and the render architecture of the frontend is untouched. |
| AD2 | **Single aggregate endpoint** `GET /wa/portfolio/api/site.php` returns the whole site payload; `?section=` filters are supported for future lazy loading. | One request, one cache entry, one ETag. Matches how the page renders today (all at once). |
| AD3 | **Write-through file cache.** Every save in admin regenerates `storage/portfolio/cache/site.json` + a version hash. Public API serves the file (not the DB) and sets `ETag: <hash>`. | Shared hosting friendly: no DB hit for anonymous visitors; instant invalidation; survives DB hiccups. |
| AD4 | **Generic child-item tables** for repeaters (`pf_project_items`, `pf_experience_items`) with a `type` enum. | Avoids 12 near-identical tables, and lets the admin use ONE reusable "Repeater" UI component for key features, contributions, engineering focus, architecture steps, responsibilities and skills. |
| AD5 | **Soft delete + revisions + activity log on every write.** | Requirement "Activity" + safe recovery; deletions are reversible for 30 days. |
| AD6 | **Media is stored outside any directly-executable path** taken from user input; PHP execution disabled in the upload folder. | The public site already lives inside `/wa/`, so a careless upload path would be a code-execution hole. |
| AD7 | **Projects get real slugs/URLs** (`/wa/portfolio/work/khf-manage`) while the case modal is preserved. In-page modal still works; the URL becomes shareable and SEO-indexable. | The 10 existing "View Case Study" buttons currently go nowhere shareable — a clear defect this module fixes. |

### 4.4 Data flow — content edit → live site

```
Admin edits "Featured Work → KHF Manage"
   → POST /wa/portfolio/api/projects/12   (X-CSRF-Token + SEWA_SESSION)
   → ProjectController: validate → transaction → save pf_projects + pf_project_items
   → ActivityLogger: insert pf_activity_log (before/after JSON diff)
   → RevisionService: snapshot into pf_revisions
   → CacheWriter: regenerate cache/site.json, bump version hash
   → Cache purge: clear LiteSpeed page cache for /wa/portfolio/*
   → JSON response { ok:true, message:"Project updated", data:{...} }
   → Admin toast + table row refresh (no full page reload)
   → Visitor loads page: index.php reads cache hash → inline JSON → renders new content
```

---

## 5. Menu, routing & permission model

### 5.1 Sidebar structure

The requirement names four submenus — **Customization, Contact, CV, Activity**. To make the module self-sufficient ("manage complete portfolio every section"), the parent contains those four **exactly as named**, plus two supporting entries. If the menu must strictly contain four children, the two extras fold into `Customization` as tabs (noted in brackets) — no functionality is lost either way.

```
Sidebar (existing panel)
└── ▣ Portfolio                                    ← NEW parent (icon: bi-briefcase)
    ├── ▤ Overview / Dashboard          /wa/portfolio
    │        KPI cards · quick actions · system health · recent activity
    ├── ▤ Projects                       /wa/portfolio/projects      [alt: tab inside Customization]
    │        list · create · edit · case-study builder · trash · preview
    ├── ▤ Customization                  /wa/portfolio/customization
    │   ├── Brand & Theme                …/customization/brand
    │   ├── Hero / Home                  …/customization/hero
    │   ├── Sections Manager             …/customization/sections
    │   ├── Services (Capabilities)      …/customization/services
    │   ├── About & Beyond Code          …/customization/about
    │   ├── Marquee / Bring to the table …/customization/marquee
    │   ├── Technical Stack              …/customization/stack
    │   ├── Process (How I Work)         …/customization/process
    │   ├── Principles                   …/customization/principles
    │   ├── Experience                   …/customization/experience
    │   ├── Testimonials                 …/customization/testimonials
    │   ├── FAQ                          …/customization/faq
    │   ├── Navigation & Footer          …/customization/navigation
    │   ├── SEO & Integrations           …/customization/seo
    │   └── Tools (import·export·cache·backup·revisions)  …/customization/tools
    ├── ▤ Contact                        /wa/portfolio/contact
    │   ├── Inbox                        …/contact
    │   ├── Subscribers                  …/contact/subscribers
    │   ├── Reply Templates              …/contact/templates
    │   └── Form & Anti-spam Settings    …/contact/settings
    ├── ▤ CV                             /wa/portfolio/cv
    │   ├── CV Manager                   …/cv
    │   ├── Builder (data → PDF)         …/cv/builder        (v1.1)
    │   ├── Templates                    …/cv/templates      (v1.1)
    │   └── Downloads & Analytics        …/cv/analytics
    └── ▤ Activity                       /wa/portfolio/activity
        ├── Action Log                   …/activity
        ├── Login History                …/activity/logins
        ├── Revisions & Restore          …/activity/revisions
        └── Retention Settings           …/activity/settings
```

Sidebar behaviour rules:
- Parent expands/collapses; remembers state per user (localStorage key `pf_menu_state`).
- Badge counters: unread contact messages on `Contact`; failed email count on `Contact`, if any.
- Active item is highlighted; breadcrumb shows `Portfolio / Customization / Testimonials`.
- Parent is hidden entirely if the user has none of the `portfolio.*` permissions.

### 5.2 Route map (admin)

| Route | Method | Purpose |
|---|---|---|
| `/wa/portfolio` | GET | Overview dashboard |
| `/wa/portfolio/projects` | GET | Project list (search, filter, sort, paginate, bulk) |
| `/wa/portfolio/projects/create` | GET/POST | Create project |
| `/wa/portfolio/projects/{id}/edit` | GET/POST | Edit project (tabbed: Content, Case Study, Media, SEO, Publish) |
| `/wa/portfolio/projects/{id}/duplicate` | POST | Duplicate as draft |
| `/wa/portfolio/projects/{id}/delete` | POST | Soft delete (trash) |
| `/wa/portfolio/projects/trash` | GET | Trash + restore + permanent delete |
| `/wa/portfolio/customization/{section}` | GET/POST | Section editors (list in §5.1) |
| `/wa/portfolio/contact` | GET | Inbox list |
| `/wa/portfolio/contact/{id}` | GET/POST | Message detail, status, notes, reply log |
| `/wa/portfolio/contact/export` | GET | CSV export of filtered set |
| `/wa/portfolio/contact/subscribers` | GET/POST | Subscriber list, add/import/unsubscribe/export |
| `/wa/portfolio/cv` | GET/POST | CV versions list, upload, activate, delete |
| `/wa/portfolio/cv/{id}/downloads` | GET | Download analytics for a CV |
| `/wa/portfolio/activity` | GET | Audit log with filters |
| `/wa/portfolio/api/*` | GET/POST | AJAX endpoints (§9.2) |

**Route-collision check (required at kickoff):** confirm the existing panel has no `/wa/portfolio` route or folder handler; if `/wa/portfolio/` resolves to the static frontend folder, the admin routes must be namespaced as `/wa/manage/portfolio/*` **or** the frontend folder renamed to `/wa/portfolio-site/` with a 301. Decide once, document in `.htaccess`, and keep the public URL as-is if at all possible.

### 5.3 Permission model

Reuse the panel's existing role system; add these capabilities (seed into the existing permissions table / config):

| Capability | Super Admin | Manager | Editor | Viewer |
|---|---|---|---|---|
| `portfolio.view` | ✔ | ✔ | ✔ | ✔ |
| `portfolio.content.manage` | ✔ | ✔ | ✔ | – |
| `portfolio.projects.manage` | ✔ | ✔ | ✔ | – |
| `portfolio.projects.publish` | ✔ | ✔ | – | – |
| `portfolio.contact.view` | ✔ | ✔ | – | – |
| `portfolio.contact.manage` | ✔ | ✔ | – | – |
| `portfolio.subscribers.export` | ✔ | ✔ | – | – |
| `portfolio.cv.manage` | ✔ | ✔ | – | – |
| `portfolio.activity.view` | ✔ | ✔ | – | – |
| `portfolio.activity.restore` | ✔ | – | – | – |
| `portfolio.settings.manage` | ✔ | – | – | – |

Rules: hide UI the user cannot use; **enforce on the server for every endpoint** (never trust the hidden menu).

---

## 6. Frontend content inventory → database mapping

This is the field-level contract between the existing frontend and the new tables. The developer must tick every row before considering the module complete.

### 6.1 Global / shell

| Live element | Source today | New source | Editor screen |
|---|---|---|---|
| `<title>`, meta description | hard-coded HTML | `pf_seo.title`, `pf_seo.meta_description` | Customization → SEO |
| OG/Twitter image, canonical, robots | absent | `pf_seo.*` | SEO |
| Favicon | browser default | `pf_settings.favicon_media_id` | Brand & Theme |
| Fonts (Space Grotesk / Inter / JetBrains Mono) | Google Fonts link | `pf_theme.font_heading` / `font_body` / `font_mono` (whitelist) | Brand & Theme |
| Accent color `#b6ff3c` + derived `--accent-dim/--accent-glow` | CSS `:root` | `pf_theme.accent`, auto-derived dims + optional overrides | Brand & Theme |
| Dark/light variant + default theme | `data-theme` | `pf_theme.default_mode` (dark/light/system), light palette overrides JSON | Brand & Theme |
| Navbar links (About, Work, Stack, Experience, Contact) | hard-coded HTML | `pf_nav_links` (label, anchor, sort, visible) | Navigation & Footer |
| Navbar CTA "Let's Connect" | hard-coded | `pf_settings.nav_cta_label/url` | Navigation & Footer |
| Theme toggle button behaviour | inline JS | unchanged (kept, no DB) | — |
| Back-to-top button | inline | unchanged | — |

### 6.2 Section: Hero

| Live element | Source today | New source |
|---|---|---|
| Terminal label `sazzad@devfolio:~$ whoami` | hard-coded | `pf_hero.terminal_label` |
| Name `Sazzad Hossain` (with accent on surname) | hard-coded | `pf_hero.name`, `pf_hero.name_accent` |
| Typewriter roles | `ROLES[]` | `pf_hero.roles_json` (array) + `pf_settings.typewriter_speed_ms` |
| Description paragraph | hard-coded | `pf_hero.description` (HTML-lite) |
| CTA 1 "View My Work" → `#work` | hard-coded | `pf_hero.cta_primary_label/url` |
| CTA 2 "Let's Connect" → `#contact` | hard-coded | `pf_hero.cta_secondary_label/url` |
| CTA 3 "Download CV" → static PDF, `title="Download CV"` | hard-coded | `pf_hero.cta_cv_label` + active CV from `pf_cv_profiles` |
| Hero chips (Full-Stack Development / API & System Integration / Production Deployment) | hard-coded | `pf_hero.chips_json` (array of {label, dot:true}) — or `pf_hero_chips` table if they need ordering UI |
| Portrait image `assets/img/sazzad_png.png` | static file | `pf_hero.portrait_media_id` |
| Floating badges (3) — icon + label, positions `badge-tl/mr/bl` | hard-coded | `pf_hero.badges_json` [{icon,label,position,visible}] |
| Stat badge variant (`.badge-stat` num/label) | present in CSS, unused | `pf_stats` rows with scope=`hero` |
| "Available for" chips (`AVAILABLE_FOR[]`) | JS array (used in About/badge area) | `pf_hero.available_for_json` |
| Globe/particle canvas animation | `initGlobe()` | unchanged (no data) |

### 6.3 Section: Marquee (project ticker)

| Live element | Source today | New source |
|---|---|---|
| `KHF Manage✦ Business Management & Web Platform✦ …` repeated | hard-coded, partially derived from projects | **auto-generated** from `pf_projects` where `show_in_marquee = 1` (`title` + `type`) — the admin simply toggles a switch per project, plus `pf_marquee_items` for manual extras |
| Speed / direction / pause-on-hover | CSS | `pf_settings.marquee_speed`, `.marquee_direction` |

### 6.4 Section: Services (SERVICE 01–04)

Source today: `CAPABILITIES[]` (4 items: title + desc). New: `pf_services` (title, description, icon, image, sort_order, is_active). Icons: Bootstrap Icons class.

### 6.5 Section: About Me

| Live element | Source today | New source |
|---|---|---|
| Portrait `sazzad_jpg.jpg` + frame/offset shadow | static | `pf_about.photo_media_id` |
| Heading "About Me" + kicker label | hard-coded | `pf_sections` (title/subtitle per section_key=`about`) |
| Body paragraphs (2) | hard-coded HTML | `pf_about.paragraph_1`, `pf_about.paragraph_2` (rich text, sanitised) |
| Quote block ("I like working where technology meets…") | hard-coded | `pf_about.quote_text`, `quote_author` (optional) |
| "Bring to the table" chip/list contents | `BRING[]` (9 items) | `pf_bring_items` (text, sort, active) — section heading editable via `pf_sections` |

### 6.6 Section: Technical Stack

Source today: `STACK_GROUPS[]` → 6 groups (Frontend, Backend, Database, CMS & E-commerce, Infrastructure, Tools); each item has `name` + `status` ∈ {`core`, `growing`, `expanding`}.
New: `pf_stack_groups` (name, sort, active) + `pf_stack_items` (group_id, name, level enum, icon/logo_media_id, sort, active).
Legend labels ("Core experience / Working / growing / Expanding") are editable via `pf_settings.stack_legend_json`.
Optional enhancement (flagged, not required): per-item proficiency % bar.

### 6.7 Section: Testimonials

Source today: `TESTIMONIALS[]` (5 unique; the carousel clones them so 14 appear on screen).
New: `pf_testimonials` — `client_name`, `initials` (auto-derived from name, editable), `client_role`, `text`, `stars` (1–5), `score` (decimal, or auto = `stars.0`), `avatar_media_id` (optional; initials used when empty), `project_ref` (optional FK to `pf_projects`), `is_active`, `sort_order`, `date_given`.
Section heading is custom: "What Our Clients say About Us" → `pf_sections` (title + `title_accent` for the highlighted word "Clients"). Carousel autoplay/interval/speed → `pf_settings.testimonial_*`.

### 6.8 Section: Featured Work (Projects)

Source today: `PROJECTS[]` — 10 objects with up to 16 fields each. **The richest entity in the module.**

| JS field | Type | DB column | Notes |
|---|---|---|---|
| `id` | string slug | `pf_projects.slug` (unique) | becomes the public URL |
| `title` | string | `title` | required |
| `type` | string | `type_label` | e.g. "PWA · Business Operations" |
| `category` | string | `category` | long label for modal header |
| `tab` | enum | `filter_group` | drives the filter tabs (All / WordPress Design / Plugin Development / PHP & Framework / PWA & API); tabs themselves come from `pf_project_filters` (label, slug, sort, active) |
| `featured` | bool | `is_featured` | shows on the Featured strip / in the "featured" group |
| `role` | string | `role` | e.g. "Full-Stack / Web Application Developer" |
| `desc` | text | `short_description` | card + modal intro |
| `keyFeatures[]` | array | `pf_project_items(type='key_feature')` | ordered repeater |
| `tech[]` | array | `pf_project_items(type='tech')` | ordered chips |
| `challenge` | text | `challenge` | modal block |
| `solution` | text | `solution` | modal block |
| `contribution[]` | array | `pf_project_items(type='contribution')` | ordered list |
| `engineeringFocus[]` | array | `pf_project_items(type='engineering_focus')` | ordered chips |
| `architecture[]` | array | `pf_project_items(type='architecture')` | ordered flow steps |
| `outcome` | text | `outcome` | modal block |
| — (new) | media | `thumbnail_media_id`, `cover_media_id` | card thumbnail (currently typographic placeholder) + modal hero image |
| — (new) | media[] | `pf_project_media` | gallery, caption each |
| — (new) | url | `live_url`, `repo_url`, `case_url` | external links (optional) |
| — (new) | status | `status` enum(draft/published/scheduled/archived) + `published_at` | scheduling |
| — (new) | flags | `show_in_marquee`, `show_on_home`, `is_pinned` | marquee + ordering |
| — (new) | seo | `seo_title`, `seo_description`, `og_media_id` | per-project meta |
| — (new) | metrics | `view_count`, `project_year`, `duration_label`, `client_name`, `industry` | optional but useful for a professional case study |

### 6.9 Section: How I Work (process)

Source today: `STEPS[]` — 8 strings (Understand, Analyze, Plan, Build, Integrate, Test, Deploy, Maintain).
New: `pf_process_steps` — `step_number` (auto), `title`, `description` (new field, so each step can explain itself), `icon`, `duration_hint` (optional), `sort_order`, `is_active`. Layout variant (grid / timeline / flow arrows) → `pf_sections.layout_variant`.

### 6.10 Section: Principles I Build By

Source today: `PRINCIPLES[]` (5: User First, Clean Structure, Practical Architecture, Security by Awareness, Production Mindset — title + desc). New: `pf_principles` + icon per row.

### 6.11 Section: Experience

Source today: hard-coded HTML, two entries (Wedevspro — Founder & Developer, Ongoing; Khati Food Bazar — Co-Founder & Managing Director, 3 Years) each with: role label, company, duration, headline, summary, "Strengths"/"Core Experience" chips, external link button, and 8–10 responsibility bullets.
New: `pf_experience` (company, role_title, role_kicker e.g. "Founder & Developer", period_label, duration_label, is_current, location, employment_type, headline, summary, link_url, link_label, logo_media_id, sort_order, is_active) + `pf_experience_items` (type ∈ `responsibility | strength | highlight`, text, sort) + `pf_sections` for the "Roles I've held — building products & running businesses" subtitle.
Also: `pf_stats` rows with scope=`experience` for any numeric badges.

### 6.12 Section: Beyond Code

Hard-coded single quote block (heading + paragraph). New: `pf_beyond` single row (heading, body rich text, optional image, `pf_sections` toggle).

### 6.13 Section: FAQ (inside Contact section)

Source today: 4 hard-coded `.faq-item` accordions. New: `pf_faqs` (question, answer rich text, category, sort_order, is_active, `show_on_contact`). Kicker "— FAQ'S" and heading from `pf_sections`.

### 6.14 Section: Contact & Footer

| Live element | Source today | New source |
|---|---|---|
| Kicker / heading / sub-heading | hard-coded | `pf_sections` (contact) |
| Contact form fields (Full Name*, Your Email*, Phone Number, Message) | HTML, **no backend** | `pf_contact_submissions` via `POST /api/contact.php`; field labels/placeholders/required flags → `pf_form_fields` (ordered, required/enabled) |
| Submit button label / success + error messages | hard-coded | `pf_settings.contact_submit_label`, `.contact_success_msg`, `.contact_error_msg` |
| Email address shown (developer.sazzad.me@gmail.com) | hard-coded | `pf_settings.contact_email` |
| "Get A Free Consultation" card heading/image | hard-coded | `pf_settings.consult_heading`, `.consult_media_id` |
| Footer headline "Let's Work Together" + avatar chip | hard-coded SVG avatar | `pf_settings.footer_headline_a/b`, `pf_settings.footer_avatar_media_id` |
| "HIRE ME ↗ FOR WORK" mailto | hard-coded `hello@sazzadhossain.dev` | `pf_settings.footer_hire_label/url` |
| Subscribe form (dead) | no backend | `pf_subscribers` via `POST /api/subscribe.php`; label/copy editable |
| Social icons (FB, IG, X, LinkedIn) | FB/X = `#` | `pf_social_links` (platform, label, url, icon, is_active, sort) |
| Footer nav column | hard-coded | `pf_nav_links` (scope=`footer`) |
| Footer contact column (address "Bakalia, Chittagong", email, WhatsApp +880 1877-856951) | hard-coded | `pf_settings.contact_address`, `.contact_email`, `.contact_phone`, `.contact_whatsapp`, or `pf_contact_channels` for multi-channel ordering |
| Bottom bar: copyright text, FAQs/Privacy/Contact links | hard-coded | `pf_settings.copyright_text`; `pf_nav_links` (scope=`footer_bottom`); Privacy/FAQ pages exist? see open item — if no pages, links hide automatically |
| Back-to-top button | inline | unchanged |

### 6.15 Cross-cutting settings (`pf_settings` keys)

`site_name`, `site_tagline`, `owner_name`, `logo_media_id`, `logo_dark_media_id`, `favicon_media_id`, `og_default_media_id`, `default_theme`, `accent_color`, `theme_tokens_json`, `seo_title`, `seo_description`, `seo_keywords`, `seo_robots`, `canonical_url`, `ga4_id`, `gtm_id`, `meta_pixel_id`, `recaptcha_site_key`, `recaptcha_secret_key`, `recaptcha_enabled`, `honeypot_enabled`, `rate_limit_per_hour`, `notification_emails`, `mail_from_name`, `mail_from_email`, `smtp_*`, `cv_default_profile_id`, `cv_download_label`, `maintenance_mode`, `maintenance_message`, `custom_css`, `custom_js_head`, `custom_js_body`, `cache_ttl_seconds`, `timezone`, `date_format`, `activity_retention_days`, `revision_retention_days`, `trash_retention_days`, `typewriter_speed_ms`, `marquee_speed`, `testimonial_autoplay`, `testimonial_interval_ms`, `show_section_nav_dots`, `footer_headline_a`, `footer_headline_b`, `copyright_text`, `consult_heading`, `contact_email`, `contact_phone`, `contact_whatsapp`, `contact_address`, `stack_legend_json`, `hero_badges_json`, `hero_chips_json`, `hero_available_for_json`, `hero_roles_json`.

Rule: unknown keys must be rejected by the settings API (whitelist), so a compromised admin session cannot inject arbitrary config, and every key has a defined type + default.

---

## 7. Database design

Full DDL → **`portfolio_schema.sql`** in this folder (import-ready). Summary below.

### 7.1 Conventions

- Engine `InnoDB`, charset `utf8mb4`, collation `utf8mb4_unicode_ci`.
- Every table has: `id` BIGINT UNSIGNED AI PK, `created_at`, `updated_at` (DATETIME, UTC), `created_by`, `updated_by` (FK → existing users table, nullable, `ON DELETE SET NULL`).
- Content tables additionally: `is_active` TINYINT(1) default 1, `sort_order` INT default 0, `deleted_at` DATETIME NULL (soft delete where content matters).
- Booleans are `TINYINT(1)`; JSON payloads use MySQL `JSON` (MariaDB ≥ 10.2: use `LONGTEXT` with app-side encoding — the schema file notes both).
- All FKs are `RESTRICT` by default (no accidental data loss), `CASCADE` only for owned child rows (project items ↔ project, stack items ↔ stack group).
- Indexes: every FK, every `slug` (UNIQUE), every `status`+`sort_order` combo used by list screens, `published_at`, `created_at`, and a FULLTEXT index on `pf_projects(title, short_description, challenge, solution)` for admin search.
- No `ENUM` for anything the client may want to extend later (use VARCHAR(30) + app-side validation), except a handful of fixed-state columns where it improves safety (`status`, `type` in child tables).
- Every table ends with a short `COMMENT` describing purpose and the frontend mapping.

### 7.2 Table list (26)

| # | Table | Type | Purpose / frontend mapping |
|---|---|---|---|
| 1 | `pf_settings` | KV | Global config, whitelisted keys (§6.15) |
| 2 | `pf_theme` | single row | Colours, fonts, dark/light palettes, layout variants |
| 3 | `pf_seo` | KV | Site meta, OG, robots, analytics IDs, verification tags |
| 4 | `pf_sections` | list | Section registry: key, kicker, title, title_accent, subtitle, is_visible, sort_order, layout_variant |
| 5 | `pf_hero` | single row | Hero copy, CTAs, chips/badges/roles JSON, portrait |
| 6 | `pf_stats` | list | Number + label badges (hero/about/experience/footer) |
| 7 | `pf_services` | list | SERVICE 01–04 cards |
| 8 | `pf_bring_items` | list | "Bring to the table" items (BRING[]) |
| 9 | `pf_about` | single row | About paragraphs + quote + photo |
| 10 | `pf_beyond` | single row | Beyond Code block |
| 11 | `pf_marquee_items` | list | Manual marquee entries (auto ones come from projects) |
| 12 | `pf_stack_groups` | list | Frontend / Backend / Database / CMS / Infrastructure / Tools |
| 13 | `pf_stack_items` | child | Skills with level (`core`/`growing`/`expanding`) |
| 14 | `pf_projects` | list | 10 → N projects (featured work) |
| 15 | `pf_project_items` | child | key_feature / tech / contribution / engineering_focus / architecture (ordered) |
| 16 | `pf_project_media` | child | Gallery images + captions |
| 17 | `pf_project_filters` | list | Filter tabs (All, WordPress Design, Plugin Development, PHP & Framework, PWA & API) |
| 18 | `pf_process_steps` | list | How I Work steps |
| 19 | `pf_principles` | list | Principles I Build By |
| 20 | `pf_experience` + `pf_experience_items` | list + child | Experience cards + responsibilities/strengths |
| 21 | `pf_testimonials` | list | Client reviews |
| 22 | `pf_faqs` | list | FAQ accordion |
| 23 | `pf_nav_links` | list | Navbar + footer navigation (scope) |
| 24 | `pf_social_links` | list | Social icons |
| 25 | `pf_media` | list | Media library (images, PDFs, alt text) |
| 26 | `pf_contact_submissions` | list | Contact inbox |
| 27 | `pf_contact_notes` | child | Internal notes + reply log per message |
| 28 | `pf_form_fields` | list | Dynamic contact-form field config |
| 29 | `pf_subscribers` | list | Newsletter list + confirm/unsubscribe tokens |
| 30 | `pf_email_queue` | list | Outbound mail queue + retry/failure log |
| 31 | `pf_email_templates` | list | Reply/notification templates with placeholders |
| 32 | `pf_cv_profiles` | list | CV versions (uploaded PDF and/or generated) |
| 33 | `pf_cv_sections` | child | Blocks used by the CV builder (v1.1) |
| 34 | `pf_cv_downloads` | log | Download analytics (ip, ua, referrer, cv_id) |
| 35 | `pf_activity_log` | log | Audit trail for the Activity module |
| 36 | `pf_login_history` | log | Admin logins (success/fail, ip, device) — powers Activity → Login History |
| 37 | `pf_revisions` | log | Entity snapshots for restore |
| 38 | `pf_rate_limits` | log | Throttling counters for public POST endpoints |
| 39 | `pf_blocklist` | list | Blocked IPs / emails / spam phrases |
| 40 | `pf_cache_meta` | single row | Cache version hash, last build time, last purge |

The rows above are grouped for readability; `portfolio_schema.sql` is the authority and contains **41 physical tables**, verified: 41 `CREATE TABLE IF NOT EXISTS` statements, 10 seed inserts (theme, SEO, cache meta, about, beyond, hero, settings, sections, project filters, form fields), and no `ALTER` of any existing panel table.

### 7.3 Relationships (key ones)

```
pf_stack_groups 1───n pf_stack_items
pf_projects     1───n pf_project_items        (CASCADE)
pf_projects     1───n pf_project_media        (CASCADE)
pf_projects     n───1 pf_project_filters      (SET NULL)
pf_projects     n───1 pf_media (thumbnail/cover/og)
pf_experience   1───n pf_experience_items     (CASCADE)
pf_contact_submissions 1───n pf_contact_notes (CASCADE)
pf_cv_profiles  1───n pf_cv_downloads         (CASCADE)
pf_media        1───n (used by hero, about, projects, testimonials, cv, settings…)
pf_users        1───n pf_activity_log / pf_revisions (created_by)
```

### 7.4 Data-retention defaults (editable in Activity → Retention Settings)

| Data | Retention |
|---|---|
| Activity log | 180 days (then archived/purged) |
| Login history | 365 days |
| Revisions | last 20 per entity or 90 days |
| Trash | 30 days, then permanently purgeable |
| Contact submissions | never auto-deleted (business record) |
| Subscription/rate-limit rows | rate limits pruned daily; unsubscribed subscribers kept |

---

## 8. Admin functional specification (screen by screen)

Cross-cutting admin UX rules that apply to **every** screen in this module:

- **Native look**: reuse the panel's existing Bootstrap card/table/button/badge classes, breadcrumbs and toasts so the module feels like part of SalesEngine WA-KHF, not a bolt-on.
- **AJAX everywhere**: create/update/delete/toggle/reorder happen without a page reload, via `fetch()` with the panel's CSRF token in an `X-CSRF-Token` header and `credentials: 'same-origin'`.
- **Dirty-state guard**: leaving a form with unsaved changes prompts a confirmation.
- **Keyboard**: `Ctrl/Cmd + S` saves the current form; `Esc` closes modals; forms are fully tab-navigable.
- **Optimistic toggles**: `is_active`/`is_featured` switches update instantly and roll back with an error toast if the request fails.
- **Empty states**: every list has an illustration-free, text-only empty state with a primary action button ("No testimonials yet — Add your first one").
- **Delete = confirm dialog** stating exactly what will be affected ("This will hide the project from the public site immediately. It goes to Trash for 30 days.").
- **Inline help**: each section has a one-line explainer at the top ("This controls the SERVICES 01–04 cards on the homepage").
- **Preview links**: every editor has a "View on site ↗" button deep-linking to the anchor it controls.
- **Loading states**: skeleton rows for tables, spinner inside the save button, disabled duplicate submissions.
- **Audit auto-write**: the server (not the UI) writes activity log + revision for every successful write.

---

### 8.1 Overview / Dashboard (`/wa/portfolio`)

Purpose: one screen that answers "how is my portfolio doing and what needs attention?"

**Widgets**

| Widget | Content | Source |
|---|---|---|
| KPI row | New messages (7d), Unread messages, Subscribers (total + new 7d), CV downloads (30d), Published projects, Site content last updated | aggregates |
| Quick actions | + New Project · Edit Hero · Upload New CV · View Inbox · Clear Cache · Preview Site | links |
| Content health | Checklist: every required field filled? Any section empty? Any broken links? Missing image alt text? Draft projects older than 7 days? | validators |
| Recent activity | Last 10 admin actions with user + time | `pf_activity_log` |
| Charts | Messages per day (30d) line, project categories doughnut, CV downloads per week | Chart.js |
| System status | DB connection, cache last built at, mailer test, upload folder writable, storage usage | runtime checks |
| Traffic snapshot (optional) | GA4 embed / simple server-side hit counter | optional |

**Edge cases**: no data yet → zeros with "No messages yet — your contact form is live" hint. Cache stale → amber banner with one-click rebuild. Mailer failing → red banner linking to Contact → Settings.

---

### 8.2 Brand & Theme (`/wa/portfolio/customization/brand`)

Fields: site name, tagline, owner display name, logo (light/dark), favicon, default theme mode (dark / light / system), accent colour (colour picker + hex input, live preview swatch), derived accents auto-calculated (`--accent-dim` = accent darkened 12%, `--accent-glow` = accent at 14% alpha, editable advanced override), font family pickers from a whitelist (headings / body / mono), border radius scale, section vertical padding scale, optional custom CSS (advanced, shown behind a toggle with a warning).

Behaviour: **live preview iframe** of the portfolio on the right side of the screen (desktop ≥ 1280px) that re-renders on save or via a "Preview" button; a **Reset to default** action restores the shipped palette; a **Contrast check** warning appears if the chosen accent fails WCAG AA against the background.

Output mapping: writes `pf_theme` + `pf_settings`; the public API exposes a `theme` object that the frontend feeds into its existing CSS custom properties (`--accent`, `--accent-dim`, `--accent-glow`, `--bg`, `--surface`, `--text*`) — this is the only place where the frontend's inline `<style>` token block is touched, via a tiny injected `:root{...}` override. Existing dark/light token sets stay intact.

---

### 8.3 Hero / Home (`/wa/portfolio/customization/hero`)

Grouped form (accordion): **Identity** (terminal label, name, accent word, portrait upload with drag-drop + crop-to-portrait hint 1:1.2), **Roles** (repeater of typewriter strings, min 1 / max 6, with speed slider 40–160 ms), **Description** (rich text, char counter, soft cap 320 chars), **CTAs** (3 rows: label + type [anchor/external/mailto/file] + target URL + style primary/ghost/icon; the CV CTA's URL is auto-resolved to the active CV), **Chips** (repeater, max 4 visible), **Floating badges** (repeater: icon picker, label, position select tl/tr/mr/bl, visible toggle — max 4), **Available-for chips** (repeater), **Stats** (number, label, suffix, visible).

Validation: name required; at least one role; description required; primary CTA requires a valid target; portrait must be ≥ 600×700 px with a warning otherwise.

---

### 8.4 Sections Manager (`/wa/portfolio/customization/sections`)

One table of all sections in **page order**, with columns: drag handle · section key · kicker label · title · visibility switch · layout variant select · "items" count (e.g. 10 projects, 5 testimonials) · updated at · actions (Edit, View ↗).

Behaviour: drag-and-drop reordering persists `sort_order` and the public page's section order follows it (the frontend maps `sort_order` to the DOM order of the existing `<section>` blocks); sections hidden here disappear without code changes; **a section that would render empty is auto-hidden with a warning badge** ("No FAQ items — section is hidden to avoid an empty block"); anchor links in the navbar auto-hide when their target section is hidden (prevents dead anchors).

Layout variants offered (all already present in the shipped CSS or trivially mapped): services `cards` / `list`; process `grid` / `timeline`; testimonials `slider` / `grid`; experience `cards` / `timeline`; projects `grid` / `filterable` (default).

---

### 8.5 Content section editors

Shared pattern for **Services, Bring items, Stack, Process, Principles, Testimonials, FAQ, Experience, Beyond Code, Marquee, Navigation & Footer**:

- **List screens**: server-side pagination (25/page), instant search (debounced 300 ms), sort (manual / newest / name), status filter, bulk select with bulk enable/disable/delete, inline switches, drag-order with autosave of order (`POST /api/{resource}/reorder {ids:[...]}`), per-row actions (Edit, Duplicate, Hide, Delete, Preview).
- **Edit screens**: single-column form with field-level help text, unsaved-changes guard, "Save" (stay) and "Save & close" buttons, `Ctrl+S` support, and a "Save Draft" concept only where a publish state exists (projects, CV).

Per-module specifics:

| Module | Specific rules |
|---|---|
| **Services** | Title ≤ 60 chars, description ≤ 240, icon picker (Bootstrap Icons searchable), optional image; exactly-4 layout hint shown but not enforced (min 1, max 8) |
| **Bring items** | Text ≤ 60 chars, min 3 / max 15; used by both About chips and marquee fallback |
| **Stack** | Two-pane UI: groups (left, reorderable) and items (right, reorderable within group); item = name + level (Core / Working–growing / Expanding) + optional logo upload; group colour badge is derived from level; warns if a group ends up with 0 items (group auto-hidden) |
| **Process** | Auto-numbered 01…0N (number editable), title ≤ 40, description ≤ 200, icon, optional duration hint; a "flow preview" strip shows the arrows layout |
| **Principles** | Title ≤ 40, description ≤ 160, icon |
| **Testimonials** | Name required, initials auto-derived (first letters, editable), role ≤ 60, text 40–600 chars (min length prevents useless 1-word reviews), stars 1–5 (score auto = `stars.0` unless overridden), optional avatar (falls back to initials bubble), optional project link, "Verified" flag optional. Section-level: autoplay toggle, interval ms, pause-on-hover, order (manual / newest / random) |
| **FAQ** | Question ≤ 160 (question mark auto-appended if missing, with a notice), answer rich text ≤ 900 chars, category (optional grouping), "first item open by default" per-item flag, order manual |
| **Experience** | Company required; role kicker + role + period label ("Ongoing", "3 Years") free text with optional start/end dates to auto-generate the label; is_current switch (renders the "Ongoing" badge); headline; summary; "Strengths"/"Core Experience" chips via `type='strength'` repeater; responsibilities repeater (`type='responsibility'`, min 1, max 15, each ≤ 160 chars); external link (url + label, validated http/https); logo upload; company URL optional |
| **Beyond Code** | Heading, body (rich text ≤ 600), optional image, section toggle |
| **Navigation & Footer** | Two tabs: **Navbar** and **Footer**. Navbar: link repeater (label, anchor selector with a dropdown of available section anchors + "custom URL" option, visible toggle, order). Footer: headline parts A/B, avatar image, hire-me label + URL (validated mailto/https), subscribe copy, columns (Community/Social, Navigation, Contact), bottom-bar links, copyright text with a `{year}` token that auto-renders the current year |
| **SEO & Integrations** | SEO title (≤ 60 with live counter, red at >60), meta description (≤ 160 with counter), keywords, canonical URL, robots (index/noindex, follow/nofollow), default OG image (1200×630 recommended, warning otherwise), GA4 ID, GTM ID, Meta Pixel ID, Search Console verification tag, custom `<head>`/`<body>` code (advanced, sanitised against `<script>` injection except approved snippet IDs), plus a live **SERP/social preview card** |

**Tools tab** (`/wa/portfolio/customization/tools`): Export all content (JSON + SQL dump of `pf_*`), Import JSON with dry-run diff preview, Seed/Reset demo content (destructive, double confirm), Rebuild cache, Purge LiteSpeed cache, Download full media backup (zip), Restore from revision, Clear trash, Run DB integrity check, and an **Environment info** panel (PHP version, memory limit, max upload size, GD/Imagick availability, writable paths).

---

### 8.6 Projects (`/wa/portfolio/projects`)

The flagship screen. Tabbed editor:

1. **Content** — title, slug (auto-generated from title with a lock/unlock toggle, uniqueness validated live), type label, category, role, short description, filter group, project year, duration label, client name, industry, featured switch, pinned switch, marquee switch.
2. **Case Study** — challenge, solution, outcome (rich text), and four **repeater blocks**: Key Features, Technical Stack (chips with autocomplete from existing stack items), My Contribution, Engineering Focus (chips), Architecture Flow (ordered steps with a live flow preview `User → PWA Interface → Launcher → Platforms`).
3. **Media** — thumbnail (card), cover (modal hero), gallery (drag-order, captions, alt text required per image), OG image override.
4. **Links** — live URL, repository URL, case-study external URL if hosted elsewhere; each validated and tested with a "reachable?" check (HEAD request, warning only).
5. **SEO** — per-project meta title/description, canonical, robots, OG image, plus a live preview of how the card will look in the grid.
6. **Publish** — status (draft/scheduled/published/archived), published_at (schedules publishing), author, "Notify subscribers of this update?" switch (v1.1), delete/duplicate actions.

List screen extras: filter chips for the same categories the public site uses (so admin and site vocabulary stay in sync), "Featured only" toggle, drag-order for the default project order, and per-row "View Case Study ↗" opening the live modal URL.

Publishing rules: `status=published` + `published_at <= now()` + `is_active=1` → included in the API payload; anything else is invisible to visitors but visible to logged-in admins (with a "Preview as admin" banner). Scheduled projects are published by a cron/lazy check on API build (`storage/portfolio/cron/publish.php` invoked by cron every 5 min, or lazily on cache rebuild if cron is unavailable).

---

### 8.7 Contact (`/wa/portfolio/contact`)

**Inbox** — table with: checkbox, status pill (New / Read / Replied / Archived / Spam), name, email (mailto), phone, truncated message, source page, received-at (relative + absolute on hover), IP with country if GeoIP available, actions (open, star, mark spam, delete).

Filters: status, date range (today / 7d / 30d / custom), has-phone, starred, search across name/email/phone/message (FULLTEXT), sort. Search + filters are reflected in the URL so an inbox view can be bookmarked or shared.

**Message detail** — full message, contact card with one-click actions (Send email, Open WhatsApp if phone present, Copy email), **internal notes timeline** (`pf_contact_notes`) with author + timestamp, status changer, "Mark as replied" with an optional reply-template selector that copies the rendered text to the clipboard / opens the mail client, export single message as PDF (optional), and a "Delete permanently" behind a typed confirmation.

**Bulk actions**: mark read/unread, mark replied, archive, mark spam, delete, export selected to CSV.

**Anti-spam**: honeypot field (hidden, must stay empty), time-trap (submission faster than 3 s is rejected), rate limit (default 5 submissions/hour/IP), optional reCAPTCHA v3 with a configurable threshold, blocklist for IP/email/keywords, spam scoring shown in the detail view, and a "Spam" folder excluded from KPI counters.

**Subscribers** — list with email, status (pending / active / unsubscribed / bounced), source, subscribed-at, confirmed-at, IP; actions: add manually (single or paste-multiple), resend confirmation, unsubscribe, export CSV, delete. Double opt-in toggle (default **off** for v1 to keep friction low; the schema already supports tokens).

**Reply Templates** — name, subject, body with placeholders `{{name}}`, `{{email}}`, `{{site_name}}`, `{{date}}`; used for quick replies and for auto-responder confirmation.

**Form & Anti-spam Settings** — recipient emails (comma-separated, validated), auto-responder toggle + template, notification subject, field configuration (enable/disable/reorder/label/placeholder/required for Full Name, Email, Phone, Subject, Message, plus custom fields), success/error messages, and a **test submission** button that creates a clearly-marked test row.

**Performance guard**: inbox list is paginated server-side (25/page default, 50/100 options); counts are cached; heavy exports stream with `fputcsv` to avoid memory spikes.

---

### 8.8 CV (`/wa/portfolio/cv`)

**CV Manager** — cards/list of CV versions: title ("Full-Stack Developer — 2026"), version label, language, file (PDF, size, pages if detectable), is-active switch (**exactly one active version** — switching auto-deactivates the others inside a transaction), visibility (public / unlisted), download counter (all-time + 30d), created/updated, actions (Download, Replace file, Duplicate, Deactivate, Delete, View downloads).

Rules:
- Upload accepts PDF (and optionally DOCX for the internal copy) up to the configured limit; MIME sniffed with `finfo`, extension whitelisted, filename normalised to a slug + hash, stored in `storage/portfolio/uploads/cv/`, **never executable**.
- Activating a CV instantly changes the hero "Download CV" button and the footer/nav links; the old public URL (if a bookmark exists) redirects to the new one via a permanent redirect entry in `pf_settings` (`legacy_cv_map` JSON) so no incoming link 404s — this covers the current `/assets/cv/developer_sazzad.pdf` path.
- Keep the last **5 versions** downloadable; older ones can be archived (still in DB, file moved to `archive/`).
- Deletion is soft; the file is only removed on permanent delete.

**Builder (v1.1, if Q2 = yes)** — pick which data blocks appear in a generated CV (profile summary, technical stack by group, experience with responsibilities, projects with outcomes, education, certifications, languages), reorder them, choose a template (1-col ATS-safe, 2-col modern), then Generate PDF with Dompdf; the result is saved as a CV version and can be regenerated whenever the underlying data changes ("Regenerate — data changed since last build" badge). Generated PDFs carry a footer with `{{site_url}}` and the generation date.

**Templates (v1.1)** — the layout presets above plus typography/accent colour per template.

**Downloads & Analytics** — per-CV: downloads over time (line chart), last 30 days, top referrers, device/browser split, unique vs total, recent downloads table (time, IP hashed for GDPR, UA). Exportable CSV. A privacy note: IPs are stored hashed with a site salt.

---

### 8.9 Activity (`/wa/portfolio/activity`)

**Action Log** — every write operation: user, action (create/update/delete/restore/upload/settings/login/export/cache-purge), module, entity label, entity id, before/after diff (expandable, JSON pretty-printed, changed fields highlighted), IP, user agent, timestamp.

Filters: user, module, action, date range, entity id, free-text search. Export CSV/JSON. Row detail opens a **diff viewer** with a "Restore this version" button (Super Admin only) that writes the snapshot back, logs a new activity entry, and marks the restore source.

**Login History** — success and failed attempts, username/email, IP, device/browser parsed from UA, location if GeoIP configured, session duration where determinable; a "suspicious" flag for >5 failed attempts in 15 minutes from one IP; optional "force logout all sessions" action for the current user.

**Revisions & Restore** — list per entity: Entity type, label, revision #, author, created at, size; actions: view, diff with current, restore, delete. Retention per §7.4 with a "Purge now" button.

**Retention Settings** — the values in §7.4 exposed as form fields, plus a "Run cleanup now" button with a dry-run report ("would delete 1,284 log rows older than 180 days"). Cleanup runs daily via cron (`cron/cleanup.php`) or lazily on admin login if cron is not available.

**Notes/limits**: activity log writes must never fail the main operation — wrap in its own try/catch (a failed log must not roll back a content save, but must itself be logged to the PHP error log).

---

## 9. Public + admin API contract

### 9.1 Conventions

- Base admin API: `/wa/portfolio/api/`; base public API: `/wa/portfolio/api/` as well (public endpoints sit under `public.php`, `contact.php`, `subscribe.php`, `cv-download.php` and are explicitly marked `authRequired=false`).
- All responses: `Content-Type: application/json; charset=utf-8`.
- Standard envelope:

```json
{
  "ok": true,
  "message": "Project updated successfully.",
  "data": {},
  "errors": {},
  "meta": { "page": 1, "per_page": 25, "total": 148, "total_pages": 6 },
  "csrf": "0f3a…(fresh token for the next request)",
  "server_time": "2026-09-20T16:04:12+06:00"
}
```

- Errors use HTTP status codes **and** `ok:false`: 400 validation, 401 unauthenticated, 403 not permitted, 404 missing, 409 conflict (duplicate slug), 419 expired CSRF, 422 unprocessable file, 429 rate-limited, 500 server error. Field-level errors populate `errors` as `{ "title": ["The title field is required."] }`.
- Auth: existing `SEWA_SESSION` cookie; CSRF: existing token, accepted via `X-CSRF-Token` header or `csrf_token` body field; every non-GET admin request is verified.
- Pagination, search (`?q=`), sort (`?sort=sort_order&dir=asc`), filtering (`?status=published&group=pwa-api`), and sparse fields (`?fields=id,title`) are supported on all list endpoints.
- Rate limits: public POSTs 5/hour/IP (contact) and 3/hour/IP (subscribe) by default; admin API 300 requests/2 min per user; violations return 429 with `Retry-After`.

### 9.2 Admin endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/settings` · POST `/api/settings` | Read/update whitelisted settings keys |
| GET/POST | `/api/theme` | Theme tokens |
| GET/POST | `/api/seo` | SEO + integrations |
| GET | `/api/sections` · POST `/api/sections/reorder` · POST `/api/sections/{key}` | Section registry, order, visibility |
| GET/POST | `/api/hero` · `/api/about` · `/api/beyond` | Singletons |
| GET/POST/DELETE | `/api/services[/{id}]` · `/api/bring[/{id}]` | Simple lists |
| GET/POST/DELETE | `/api/stack/groups[/{id}]` · `/api/stack/items[/{id}]` | Stack (two-level) |
| POST | `/api/{resource}/reorder` | Batch order update for any list (`services, bring, stack/items, projects, process, principles, testimonials, faqs, experience, nav, social, marquee, project/items, project/media, stats`) |
| GET/POST/DELETE | `/api/projects[/{id}]` | Projects CRUD |
| POST | `/api/projects/{id}/duplicate` · `/api/projects/{id}/restore` | Duplicate / restore from trash |
| GET/POST/DELETE | `/api/projects/{id}/items[/{itemId}]` · `/api/projects/{id}/media[/{mediaId}]` | Case-study repeaters + gallery |
| GET/POST/DELETE | `/api/process[/{id}]` · `/api/principles[/{id}]` · `/api/testimonials[/{id}]` · `/api/faqs[/{id}]` · `/api/nav[/{id}]` · `/api/social[/{id}]` · `/api/marquee[/{id}]` · `/api/stats[/{id}]` | Content lists |
| GET/POST/DELETE | `/api/experience[/{id}]` · `/api/experience/{id}/items[/{itemId}]` | Experience + children |
| POST | `/api/media/upload` · GET `/api/media` · POST `/api/media/{id}` (alt/title) · DELETE `/api/media/{id}` | Media library |
| GET | `/api/contact?status=&q=&from=&to=` · GET `/api/contact/{id}` · POST `/api/contact/{id}` | Inbox |
| POST | `/api/contact/bulk` · GET `/api/contact/export` | Bulk ops + CSV |
| GET/POST | `/api/contact/templates[/{id}]` | Reply templates |
| GET/POST/DELETE | `/api/subscribers[/{id}]` · POST `/api/subscribers/import` · GET `/api/subscribers/export` | Subscribers |
| GET/POST/DELETE | `/api/cv[/{id}]` · POST `/api/cv/{id}/activate` · GET `/api/cv/{id}/downloads` · POST `/api/cv/{id}/generate` | CV module |
| GET | `/api/activity` · `/api/activity/logins` · `/api/activity/revisions` · POST `/api/activity/revisions/{id}/restore` · POST `/api/activity/cleanup` | Activity |
| GET/POST | `/api/cache` | Cache status / rebuild / purge |
| GET/POST | `/api/tools/export` · `/api/tools/import` · `/api/tools/backup` | Tools |
| GET | `/api/dashboard` | Overview widget data |

### 9.3 Public endpoints

| Method | Endpoint | Auth | Cache | Notes |
|---|---|---|---|---|
| GET | `/wa/portfolio/api/site.php` | none | `public, max-age=300` + `ETag` + `Last-Modified` | Full site payload. `?section=projects,testimonials` for partial. `?v=<hash>` cache-bust |
| GET | `/wa/portfolio/api/sitemap.php` | none | 1 h | XML sitemap: home + each published project URL |
| GET | `/wa/portfolio/api/jsonld.php` | none | 1 h | Person + WebSite + FAQPage + ItemList(projects) JSON-LD |
| POST | `/wa/portfolio/api/contact.php` | none | no-store | Validates, stores, queues notification + auto-responder; returns `{ok, message, ref:"MSG-2026-000123"}` |
| POST | `/wa/portfolio/api/subscribe.php` | none | no-store | Stores subscriber; optional double opt-in email |
| GET | `/wa/portfolio/api/cv-download.php?slug=…` | none | no-store | 302 to the active CV file, increments `pf_cv_downloads`; legacy path redirect |
| GET | `/wa/portfolio/api/track.php` | none | no-store | Optional lightweight view counter per project (if enabled) |

### 9.4 Reference payload

See **`portfolio_api_contract.json`**. Structural summary (keys map 1:1 to what the current render functions expect):

```
{
  "version": "2026-09-20T16:10:00Z#a91f3c",
  "theme":   { mode, tokens{...}, fonts{...} },
  "seo":     { title, description, canonical, og{...}, analytics{...} },
  "nav":     [ {label, anchor, visible, sort} ],
  "sections":[ {key, kicker, title, title_accent, subtitle, visible, layout, sort} ],
  "hero":    { terminal_label, name, name_accent, roles[], description, ctas{...}, chips[], badges[], available_for[], portrait{url,alt,w,h} },
  "stats":   [ {number, suffix, label, scope} ],
  "services":[ {id, title, description, icon, image} ],
  "about":   { paragraphs[], quote, photo{...} },
  "bring":   [ {text} ],
  "stack":   [ {group, items:[{name, level, logo}] } ],
  "projects":{ filters:[{slug,label,count}], items:[ {slug,title,type_label,category,filter_group,role,short_description,
                featured,tech[],key_features[],contribution[],engineering_focus[],architecture[],
                challenge,solution,outcome,media{thumb,cover,gallery[]},links{live,repo,case},
                year,duration,client,industry,seo{},url,modal_url} ] },
  "process": [ {step, title, description, icon} ],
  "principles":[ {title, description, icon} ],
  "experience":[ {company, role_kicker, role, period, is_current, headline, summary, strengths[], responsibilities[], link{label,url}, logo} ],
  "beyond":  { heading, body, image },
  "testimonials":[ {name, initials, role, text, stars, score, avatar, project_slug} ],
  "faqs":    [ {question, answer} ],
  "contact": { heading, kicker, fields[], submit_label, messages{success,error}, channels[], consult{heading,image}, form_token, endpoint, recaptcha{enabled,site_key} },
  "footer":  { headline_a, headline_b, avatar, hire{label,url}, subscribe{label,placeholder}, social[], columns[], bottom_links[], copyright },
  "cv":      { active:{id,title,url,label,updated_at,size}, versions_count },
  "built_at": "…", "cache_ttl": 300
}
```

Sizes: with current content, expect ~28–36 KB uncompressed, ~7–9 KB gzipped. Empty/absent optional blocks must be **omitted**, not emitted as `null`, so the frontend's `if (arr?.length)` guards keep working.

---

## 10. Frontend integration plan

### 10.1 Principle

**The design, markup structure, CSS and all render/animation functions stay untouched.** Only the *source of data* changes. The frontend is already structured for this (arrays → render functions), so the rewrite is surgical.

### 10.2 Work items

| Step | Task |
|---|---|
| F1 | Rename `index.html` → `index.php` (or add `index.php` that sets the same document — hosting serves `index.php` first by default). Keep a `index.html` symlink/rewrite as a fallback for direct hits, or 301 `index.html` → `/wa/portfolio/`. |
| F2 | At the top of `index.php`, load the cache/bootstrap: `$boot = PortfolioBootstrap::payload();` and emit `<script>window.__PF_DATA__ = <?= json_encode($boot, JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT) ?>;</script>` **before** the main script. |
| F3 | Replace each `const X = [...]` definition with a bootstrap read: `const X = window.__PF_DATA__?.services ?? FALLBACK_X;` — keeping a small static `FALLBACK_X` so the page still renders if PHP/DB is down (last-known-good content). |
| F4 | Add a single async `loadPortfolioData()` used only when `window.__PF_DATA__` is missing (e.g. static hosting, broken PHP): `fetch('./api/site.php', {cache:'no-store'})` then run `renderAll()`. Preserve current render order. |
| F5 | Inject theme overrides: a `<style id="pf-theme">` block printing `:root{--accent:…;--accent-dim:…;--accent-glow:…}` from `payload.theme`, plus `data-theme` default from `theme.mode`. The existing dark/light toggle keeps working on top of it. |
| F6 | Nav and footer links: render from `payload.nav` / `payload.footer` into the existing `<nav>` / footer markup, preserving classes (`nav-link`, `footer-social-icon`, etc.) so CSS is unaffected. Hide anchors whose sections are hidden. |
| F7 | Contact form: add `name` attributes (`full_name`, `email`, `phone`, `message`), a hidden honeypot field, `data-endpoint`, and replace `handleContactForm()`'s fake timeout with a real `fetch` POST; keep the same button states ("Sending…" / "Sent! ✓"), add field-level error rendering under each input using existing `--accent` styling. |
| F8 | Subscribe form: same treatment — real POST, inline success/error text, no layout change. |
| F9 | CV button: point to `/wa/portfolio/api/cv-download.php?slug=developer_sazzad` (or the active slug) so downloads are counted and swapping the file needs no code edit; keep the `title="Download CV"` tooltip. |
| F10 | Project case studies: keep the modal (`buildCaseModal`), and additionally push `history.pushState` with `/wa/portfolio/work/{slug}` so a modal state has a real URL; opening a slug URL cold opens the page with the modal already displayed; add a "Copy link" button inside the modal. |
| F11 | SEO: `<title>`, meta description, canonical, OG/Twitter tags, and JSON-LD (`Person`, `WebSite`, `FAQPage`, `ItemList`) rendered from payload. Add `<html lang="en">` (already present) and a proper `og:image` (currently missing). |
| F12 | Analytics: inject GA4/GTM/Pixel snippets from settings when IDs are set; add event hooks for CV download, contact submit, project modal open, social click (pass as custom events if GA4 configured). |
| F13 | Performance: `loading="lazy"` + `decoding="async"` on all content images and gallery items; `width`/`height` attributes from media metadata to prevent layout shift; preload the hero portrait; add `<link rel="canonical">`; add `rel="noopener"` on external links. |
| F14 | Robustness: wrap each render call in the existing `safe()` helper; if any payload key is missing, that section degrades to hidden rather than throwing (a single JS error currently kills everything after it). |
| F15 | Remove the "placeholder arrays" comment block and document the new data contract in a short comment header. |

### 10.3 Integration options

| Option | How | Pros | Cons | Recommendation |
|---|---|---|---|---|
| **A — PHP bootstrap + inline JSON** | `index.php` prints payload inline; JS reads `window.__PF_DATA__` | Zero extra request; SEO-friendly; instant render; works even if `fetch` is blocked | Needs `index.php` (Q1) | ✅ **Primary** |
| **B — Pure static + `fetch()`** | `index.html` unchanged except the data layer fetches `api/site.php` | No server-side change; easiest deploy | One extra round-trip; brief empty-state flash; needs loading skeleton; SEO relies on crawlers executing JS | Fallback if Q1 = no |
| **C — Full server-side rendering** | PHP prints all section HTML | Best SEO, no JS dependency | Rewrites the frontend, duplicates the render logic in PHP, doubles maintenance | ❌ Out of scope for v1 |

**Hybrid for SEO (recommended, small addition to Option A):** render crawler-visible essentials server-side inside `<noscript>`-free markup for the hero, about, stack list, project titles and FAQ (the same strings that already exist in the payload) — search engines index text without executing JS. This is a ~1 day addition and can be a v1.1 enhancement: the JSON-LD (F11) already covers a large part of the SEO need.

### 10.4 Loading, empty and error behaviour on the public site

- **Loading** (Option B only): section skeletons matching current spacing; never a full-page spinner.
- **Empty**: if a section's array is empty → the section is not rendered at all (no empty headings), and the nav entry for it is hidden.
- **Error**: if neither inline data nor the API is reachable → the page renders the static fallback arrays with an unobtrusive console warning; the visitor sees a complete site, never a broken layout.
- **Stale content**: after an admin save, the cache is regenerated and purged; if purge fails, the TTL (300 s) still guarantees propagation within 5 minutes.

---

## 11. Security requirements

The module touches a public form, file uploads and an admin panel on the same domain as a live business tool. Every item below is a **must-pass** item in QA.

| # | Requirement | Implementation |
|---|---|---|
| S1 | SQL injection | PDO prepared statements only; **no string concatenation** in queries; ORDER BY / column names from a whitelist map, never from raw request input |
| S2 | XSS | All output escaped (`htmlspecialchars($v, ENT_QUOTES, 'UTF-8')`) in PHP templates; rich-text fields sanitised server-side via an HTML allowlist (p, br, strong, em, ul, ol, li, a[href], blockquote, code) with `href` scheme validation; JSON API emits `JSON_HEX_TAG\|HEX_AMP\|HEX_APOS\|HEX_QUOT` so inline injection cannot break out of the `<script>` tag |
| S3 | CSRF | Existing token enforced on every POST/PUT/DELETE (admin) — header or body; token rotated on login; `SameSite=Lax` session cookie; reject mismatches with 419 |
| S4 | AuthZ | Every endpoint declares a capability (`portfolio.*`) and checks it server-side; ownership/role checks never rely on UI state; IDOR prevention — all `{id}` lookups are scoped and validated as integers |
| S5 | Session | Reuse `SEWA_SESSION` (HttpOnly + Secure already on); idle timeout 60 min configurable; "logout all sessions" available; session regeneration on privilege change |
| S6 | File upload | Whitelist MIME (`finfo`) + extension + size; reject double extensions and `.php`, `.phtml`, `.phar`, `.htaccess`, `.svg` (SVG only allowed with an explicit sanitisation step, otherwise rejected); store outside executable paths; `.htaccess` in the upload dir with `php_flag engine off` / `Require all denied` for PHP execution; random filename; images re-encoded (strips EXIF/embedded payloads) |
| S7 | Path traversal | Filenames never used raw; `realpath()` containment checks; media served via ID, not path |
| S8 | Spam / abuse | Rate limiting (S1 default 5/hour/IP contact, 3/hour/IP subscribe, 10/hour/IP login-fail lockout), honeypot, time-trap, optional reCAPTCHA v3, blocklist, spam scoring, `pf_rate_limits` counters |
| S9 | Email header injection | Strip CR/LF from all header-bound values; validate `From`; use the configured SMTP sender only; never use the visitor's email as `From` (use it as `Reply-To`) |
| S10 | Sensitive data in logs | Never log passwords/tokens; hash IPs in CV/download logs with a site salt; activity diff hides secrets (SMTP password, reCAPTCHA secret) as `***` |
| S11 | Secrets at rest | SMTP password / reCAPTCHA secret stored encrypted (AES-256-GCM with a key from `config/secrets.php` outside the web root) or at minimum base64 + file permission 600; never returned by the settings API (return masked `••••1234`) |
| S12 | Error handling | `display_errors=0` in production; all exceptions caught, logged to `storage/portfolio/logs/app-YYYY-MM-DD.log`, generic message to the client, `ref` id returned for support |
| S13 | Headers | Keep existing `X-Frame-Options`, `X-Content-Type-Options`, HSTS; add `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and a CSP for the admin module (report-only first, because Tailwind CDN and inline styles on the public page make strict CSP non-trivial) |
| S14 | Public read endpoint hardening | `site.php` exposes only published, active, whitelisted fields — never `created_by`, internal notes, IPs, other users' emails, draft data, or `is_active=0` rows |
| S15 | Dependency hygiene | Vendor libraries pinned to exact versions with a documented update path; no `eval`, no `unserialize()` on user data (use `json_decode`); Dompdf/PhpSpreadsheet kept current (known CVEs) |
| S16 | Backups | Before each deploy, DB + uploads backed up; Tools → Export provides an on-demand full JSON/SQL dump |
| S17 | Audit | All writes logged with before/after; failed logins logged; exports logged (who exported subscriber lists) |
| S18 | GDPR/basic privacy | Subscriber unsubscribe link in every newsletter, contact data retention notice, hashed IPs, "delete my data" workflow (find by email → anonymise) in Contact → Inbox filters |

---

## 12. Validation rules (master table)

Server-side validation is authoritative; the same rules are mirrored client-side for UX. Every message is returned in `errors` keyed by field.

| Field type | Rule |
|---|---|
| Slug | `^[a-z0-9]+(?:-[a-z0-9]+)*$`, 3–80 chars, unique per table, auto-generated from title if empty, reserved words rejected (`api`, `admin`, `assets`, `contact`, `cv`, `index`) |
| Short text | trim, collapse double spaces, strip control chars, max length per §8, non-empty after trim |
| Long text / rich text | sanitised HTML allowlist, max length per §8, `<script>`/`<iframe>`/`on*` attributes removed, nested quote depth ≤ 2 |
| URL | scheme whitelist `http/https/mailto/tel`, host must be valid, reject `javascript:`/`data:`; internal anchors must match an existing visible section key (else warn + auto-hide the link) |
| Email | `filter_var(FILTER_VALIDATE_EMAIL)` + MX check (soft warning only, never block a real lead), max 190 chars, lowercase stored |
| Phone | digits/`+`/spaces/`-`/`()` only, 7–20 chars, stored normalised with country code when derivable (BD default `+880`) |
| Integer | min/max bounds per field, cast with `(int)` after validation |
| Decimal (rating) | 0.0–5.0, one decimal |
| Boolean | accept `1/0/true/false/on` → normalise to `1/0` |
| Date/datetime | `Y-m-d H:i:s` (UTC in DB), rendered `Asia/Dhaka`; `published_at` may be future (schedule) |
| Colour | `^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$` |
| JSON arrays (chips/badges) | valid JSON, max 20 entries, each entry validated against its own sub-schema, unknown keys dropped |
| Sort order | integer ≥ 0; the reorder endpoint receives a full ordered id list, validates that the set matches existing rows in the same parent scope, then updates in one transaction |
| Image upload | jpg/jpeg/png/webp/gif; ≤ 5 MB (configurable); min 200×200 px; re-encoded to WebP at quality 82 with the original kept; alt text required (blocks save with a warning if missing — see §13) |
| PDF upload | `application/pdf` sniffed, ≤ 15 MB, page count ≤ 20, must open with a PDF parser head-check |
| Required-field policy | A section's item cannot be set to `is_active=1` unless its required fields are present; the Sections Manager surfaces these as blocking warnings so the public page never renders half-empty cards |

---

## 13. Media & file handling

| Topic | Decision |
|---|---|
| Storage root | `storage/portfolio/` (outside web root, recommended) **or** `/wa/assets/media/portfolio/` if that is the panel's convention — but then PHP execution must be disabled in that directory |
| Folder layout | `uploads/img/{yyyy}/{mm}/`, `uploads/cv/`, `uploads/cv/archive/`, `uploads/docs/`, `cache/`, `logs/`, `tmp/`, `backup/` |
| Naming | `{slug}-{8charhash}.{ext}` — original name stored in DB for search, never used on disk |
| Public delivery | Images served directly (fast path) from a web-accessible path with long `Cache-Control: public, max-age=31536000, immutable`; PDFs served through `cv-download.php` so downloads can be counted and access controlled |
| Derivatives | On upload generate: `thumb` (400w), `medium` (800w), `large` (1600w), original; all WebP unless transparency/gif; keep aspect ratio; never upscale |
| Metadata | width, height, size, mime, alt_text, caption, credit, focal point (optional, for cropping in cards), usage count (which entities reference it — blocks deletion of in-use media) |
| Deletion | Media in use cannot be hard-deleted; soft delete + scheduled purge of unreferenced files older than 90 days (dry-run report first) |
| Quotas | Warn at 500 MB portfolio media; show usage in Overview → System status |
| Reuse | If the panel already has a media library, integrate rather than duplicate: the module consumes it through an adapter class so both stay in sync |
| Migration of existing assets | `sazzad_png.png`, `sazzad_jpg.jpg`, the CV PDF and any other current assets are imported into `pf_media` by the seed script so they become manageable from day 1 (files are copied, not moved, to avoid breaking the current page before go-live) |

---

## 14. Email & notification specification

| Trigger | Recipients | Template | Notes |
|---|---|---|---|
| New contact message | `settings.notification_emails` (comma-separated) | "New portfolio inquiry — {{name}}" | Includes name, email, phone, message, source page, IP, timestamp, and a "Open in panel" deep link; `Reply-To` = visitor email |
| Auto-responder (optional, default off) | The visitor | "Thanks for reaching out" | Marked as no-reply; includes the sender's message echoed back; respects rate limit; never sent for spam-flagged submissions |
| New subscriber | Owner (+ visitor confirmation if double opt-in is on) | "New subscriber" / "Confirm your subscription" | Unsubscribe link + token in every mail |
| CV download notification (optional) | Owner | "Your CV was downloaded" | Off by default to avoid noise; available as a weekly digest instead |
| Weekly digest (optional) | Owner | Messages / subscribers / downloads of the week | Cron, Monday 09:00 Asia/Dhaka |
| Test email | Owner, on demand | "SMTP test" | From Contact → Settings |

Mechanics:
- **Queue-first**: every mail is inserted into `pf_email_queue` and sent by a worker (`cron/mailer.php`, every minute) with 3 retries, exponential backoff, and a `failed` state visible in the panel.
- If cron is unavailable, a fallback sends synchronously after the response is flushed (`fastcgi_finish_request()` / `ignore_user_abort`), with a hard 5-second timeout so the visitor never waits.
- Delivery log: recipient, template, status, error, attempts, sent_at — visible in Contact → Settings → Delivery Log.
- From-address, from-name and SMTP credentials live in settings; failures surface as an admin banner and in Overview → System status.

---

## 15. Non-functional requirements

### 15.1 Performance budgets

| Metric | Target |
|---|---|
| Public payload (`site.php`) | ≤ 40 KB uncompressed, ≤ 10 KB gzipped |
| Public TTFB (cached) | < 400 ms p95 on the current shared hosting |
| Admin list screen render | < 1.5 s p95 including AJAX data |
| Admin save round-trip | < 900 ms p95 |
| Cache regeneration on save | < 300 ms (single JSON write) |
| Media upload + derivatives | < 3 s for a 5 MB JPEG |
| Lighthouse (public, mobile) | Performance ≥ 85, A11y ≥ 90, SEO ≥ 95 (unchanged from today apart from improvements) |
| DB queries per public request | 0 for cached payloads; ≤ 12 for a cold cache build |

### 15.2 Compatibility

- **Browsers**: latest 2 versions of Chrome, Edge, Firefox, Safari; iOS Safari 15+; Android Chrome. Admin panel is desktop-first (≥ 1280 px optimal) and usable at 768 px with collapsible tables.
- **Frontend design**: existing responsive behaviour at all breakpoints must remain identical (verified by screenshot diff at 360 / 768 / 1024 / 1440 / 1920 px — see §17.3).
- **PHP**: 8.1–8.4 compatible; no deprecated 8.4 features; strict types in new files.
- **MySQL**: 5.7+ / MariaDB 10.4+ (JSON columns optional — LONGTEXT fallback documented in the schema file).

### 15.3 Accessibility

WCAG 2.1 AA for the admin module: labels on all inputs, `aria-*` on toggles/accordions, visible focus rings, keyboard-operable drag-and-drop (with up/down buttons as an alternative to dragging — required, not optional), colour contrast ≥ 4.5:1, no information conveyed by colour alone (status pills carry a text label), error summaries linked to fields, semantic table markup with `<caption>`.

### 15.4 Reliability

- Content writes are transactional; partial saves are impossible.
- The public page must never white-screen: inline data → fallback arrays → hide the section.
- Graceful degradation if `storage/` is unwritable: the panel shows a red banner and writes still hit the DB (cache rebuild falls back to live queries).
- Log rotation at 10 MB/file, 14 files kept.

### 15.5 Internationalisation readiness (build-time, not shipped)

- All UI strings in `lang/en.php` (associative array + `__()` helper) instead of literals in markup.
- `pf_*` content tables reserve `lang` column defaulting to `en` for future EN/BN rows.
- Dates/numbers formatted via helpers so a locale switch is a config change.
- No RTL support required in v1 (documented as a known limitation).

### 15.6 Backup & continuity

Daily DB dump + weekly media archive via cron to `storage/portfolio/backup/` (7 daily / 4 weekly retention), with a one-click download and an integrity-verified restore procedure documented in §18.

---

## 16. Delivery plan, timeline & effort

Assumes **1 developer, ~6 productive hours/day**, frontend and DB access available, and answers to §3.2 received before Phase 1. Estimates are dev-days.

| Phase | Scope | Deliverable | Effort |
|---|---|---|---|
| **P0 — Discovery & setup** | Confirm Q1/Q2, inspect existing panel codebase (router, auth, DB layer, mailer, media, layout/partials, `.htaccess`), route-collision check, staging environment + DB backup, create module skeleton `lib/`, `controllers/`, `views/`, config, cron entries | Kickoff report + environment checklist + skeleton committed | 1 |
| **P1 — Foundation** | Import `portfolio_schema.sql`, base Model/Repository classes, JSON response envelope, CSRF/auth/capability guards, ActivityLogger, RevisionService, CacheWriter, RateLimiter, media service, `pf_media` + upload pipeline, admin layout partials + sidebar menu + breadcrumbs, empty Overview | Menu visible, empty screens navigable, logging + caching working end-to-end | 2 |
| **P2 — Settings, theme, sections** | Settings/theme/SEO editors, Sections Manager (visibility + order + variants), Hero editor, Brand & Theme with live preview, Tools tab (export/import/cache) | Public site can be re-skinned and re-ordered from the panel | 2 |
| **P3 — Simple content modules** | Services, Bring items, Marquee, Stack (two-level UI), Process, Principles, Beyond, Stats — list + form + reorder + toggle patterns and the reusable repeater component | All simple sections fully manageable | 2.5 |
| **P4 — Projects module** | List/filter/bulk, tabbed editor, 5 repeater blocks, gallery, SEO tab, publish/schedule/draft/preview, duplicate/trash, filters registry | Flagship module complete | 2.5 |
| **P5 — Experience, Testimonials, FAQ, Nav & Footer** | These all reuse the P3 patterns plus their specifics (§8.5) | Every content section storable in DB | 1.5 |
| **P6 — Public API + frontend rewire** | `site.php` + cache/ETag, JSON-LD, sitemap, frontend F1–F15, CV download endpoint + legacy redirect, analytics hooks, fallback handling | Public site fully dynamic, design unchanged | 2 |
| **P7 — Contact & subscribers** | Public contact/subscribe endpoints, anti-spam, inbox UI, detail view, notes, bulk, templates, subscribers, exports, email queue + notifications | Leads captured and manageable | 2 |
| **P8 — CV module** | Manager, upload + validation, activate/legacy handling, download analytics, trash | CV swappable from panel | 1.5 |
| **P9 — Activity module** | Action log + diff viewer + restore, login history, retention settings + cleanup cron, exports | Audit + recovery complete | 1 |
| **P10 — QA, UAT, deploy, docs** | Full regression vs. live design, cross-browser, security pass (§11), performance pass (§15.1), content migration of all live data, staging → production, backups, admin user guide + handover | Go-live + documentation | 2 |
| | **Total (v1, Q2 = upload-only CV)** | | **≈ 20 dev-days** |
| | **v1.1 add-ons** | CV builder + templates (Dompdf), subscriber notify-on-new-project, server-side SEO rendering (Option C-lite), multi-language EN/BN | +1.5 to +5 |

**Suggested calendar (1 developer, 5 days/week):** ~4.5 weeks including UAT buffer → **go-live target: 4–5 weeks from kickoff**. With 2 developers (one on P3–P5 content modules, one on P6–P7 API/contact in parallel after P1), compress to **~3 weeks**.

**Milestones**

| M | Date (from kickoff) | Acceptance gate |
|---|---|---|
| M1 | Day 3 | Menu live, DB imported, logging + cache proven |
| M2 | Day 7 | Site content 100% database-driven on staging, design pixel-identical |
| M3 | Day 12 | Contact inbox live end-to-end (form → email → panel → reply) |
| M4 | Day 16 | Projects + CV + Activity complete |
| M5 | Day 20–21 | UAT signed off, production deployed, docs handed over |

---

## 17. Testing, QA & acceptance criteria

### 17.1 Test levels

1. **Unit-ish (PHP script tests)**: validators, slug generator, cache writer, sanitizer, rate limiter, order-rebuild logic — run via a tiny CLI runner (`tests/run.php`) so no framework is needed.
2. **API integration**: every admin endpoint exercised with valid, invalid and unauthorized payloads (a Postman/Bruno collection shipped with the handover); assert response envelope, status codes, side effects on `pf_activity_log`.
3. **Frontend contract test**: assert the payload keys match exactly what `renderXxx()` reads; a broken contract must fail loudly, so include a `tests/contract.php` that diffs the payload schema against a checked-in expected key list.
4. **UI/E2E (manual, scripted)**: the UAT checklist in §17.4.
5. **Security pass**: §11 checklist + a DAST scan (e.g. OWASP ZAP baseline) against staging.
6. **Performance pass**: Lighthouse + WebPageTest on the public page; slow-query log review for admin endpoints.

### 17.2 Required test cases (minimum set)

| ID | Scenario | Expected |
|---|---|---|
| T01 | Add a project with all fields | Appears on public page after cache rebuild; URL `/work/{slug}` opens the modal; JSON-LD includes it |
| T02 | Add a project with only required fields | Saves as draft; warning that the public card will be sparse; not visible publicly until published |
| T03 | Duplicate slug | 409 with field error; slug field highlights; no partial insert |
| T04 | Reorder projects by drag | Order persists after reload and is reflected publicly |
| T05 | Hide "Testimonials" section | Section disappears publicly; nav/footer link hides; other sections unaffected |
| T06 | Delete a project | Moves to Trash, disappears publicly, restorable within 30 days, permanent delete removes it + gallery links |
| T07 | Upload 6 MB JPG | Rejected with a clear size message, or accepted if the limit is raised in settings — limit is honoured |
| T08 | Upload a `.php` renamed as `.jpg` | Rejected by MIME sniffing; attempt logged |
| T09 | Submit contact form with valid data | Row created, notification queued, success message shown with reference id, honeypot untouched |
| T10 | Submit contact form 6× in an hour | 6th returns 429 with a friendly message; no row created; rate-limit entry logged |
| T11 | Contact form with bot filling the honeypot | Silently accepted-looking response but stored as spam / discarded; no email sent |
| T12 | Mark message replied + add internal note | Status pill updates, note appears in the timeline with the admin's name, activity logged |
| T13 | Subscribe with an existing email | Idempotent: no duplicate row, friendly "already subscribed" message |
| T14 | Activate a new CV | Hero/nav download button serves the new file; download counter increments; old URL 301s to the new one |
| T15 | Download CV from 3 different devices | `pf_cv_downloads` rows with hashed IPs, dashboard chart updated |
| T16 | Save settings without permission | 403 from the API and UI hidden for the Editor role |
| T17 | POST without CSRF token | 419, nothing written |
| T18 | Restore an old revision | Previous content returns, a new activity entry records the restore |
| T19 | Public site with DB stopped | Page still renders the last-known-good content (cache or fallback) — no white screen |
| T20 | Public site with an empty section | Section and its nav link are hidden; no broken layout |
| T21 | Migration check: compare live page vs. seeded staging page | Screenshot diff at 5 breakpoints shows no visual change beyond intended content |
| T22 | Activity retention dry-run | Report counts match a manual SQL count before purge |

### 17.3 Regression method for the frozen design

1. Capture baseline screenshots of the live site **before** any change (full-page + per-section, at 360/768/1024/1440/1920 px, dark and light).
2. After the migration, capture the same set on staging.
3. Diff with a pixel-diff tool (e.g. `pixelmatch` via CLI or BackstopJS); any diff must be triaged: intended (content) vs. regression (layout/colour/spacing). **Regressions must be fixed before production.**

### 17.4 UAT checklist (owner signs off per line)

- [ ] I can log in and see `Portfolio` in the sidebar, expanded with all submenus I am allowed to use.
- [ ] I changed the hero name and description and saw it live within 1 minute.
- [ ] I added a new project including a case study, gallery and SEO, and published it.
- [ ] I edited an existing project's challenge/solution/outcome and the modal shows the new text.
- [ ] I hid the FAQ section, then re-enabled it.
- [ ] I replaced my CV and the download button gave the new file.
- [ ] I submitted the contact form on my phone and received the email notification within 2 minutes.
- [ ] I replied to the message from the panel and marked it replied.
- [ ] I exported the message list to CSV and opened it in Excel.
- [ ] I added myself as a subscriber and saw the row appear.
- [ ] I searched the Activity log, opened a diff and restored a previous version.
- [ ] I checked the site on a phone and a laptop — it looks the same as before the change.
- [ ] I can follow the user guide to do all of the above without asking the developer.

### 17.5 Definition of Done (v1)

1. All §6 rows mapped and manageable.
2. All §17.2 test cases pass on staging, with evidence (screenshots/curl output) attached to the handover doc.
3. §11 security checklist fully signed; no high/critical findings open.
4. Lighthouse budgets met; payload ≤ 40 KB.
5. Cron jobs installed and verified (mailer, cleanup, publish-scheduler, backup).
6. Admin user guide (with screenshots) delivered, plus developer handover notes (structure, conventions, how to add a new field end-to-end).
7. Production deployed with a verified DB + media backup taken immediately before, and a documented rollback path.

---

## 18. Deployment, migration & rollback

### 18.1 Environment matrix

| Env | URL | Notes |
|---|---|---|
| Local (optional) | developer machine | XAMPP/Docker with a copy of the schema |
| Staging | e.g. `https://ai.khatifoodbazar.com/wa-test/` or a subdomain | **Mandatory** — content migration and screenshot diff happen here |
| Production | `https://ai.khatifoodbazar.com/wa/…` | Deploy in a low-traffic window |

### 18.2 Deployment steps

1. **Freeze + backup**: dump `SEWA` DB, zip `/wa/` (excluding logs/tmp), snapshot the current `index.html` and assets.
2. Upload module files (new folders only, plus the integration points listed below).
3. Run `portfolio_schema.sql` (creates `pf_*` tables; **no existing table is altered**).
4. Run the seeder (`tools/seed.php`) to import all current live content (Appendix D mapping).
5. Apply `.htaccess` additions for the new routes and the upload-directory hardening rules.
6. Switch `index.html` → `index.php` (keeping a backup copy of the HTML) and add the 301 rule if the filename changes for visitors.
7. Install cron jobs (mailer, cleanup, scheduler, backup).
8. Rebuild cache; verify payload; purge LiteSpeed cache.
9. Smoke tests: home renders, contact submit works, CV download counts, admin CRUD saves, activity log records, JSON-LD valid, sitemap returns XML.
10. Monitor `storage/portfolio/logs/` for 24 h; watch for 4xx/5xx spikes.

**Integration points in the existing panel (only these files should be touched):**
- Sidebar partial (add the `Portfolio` menu block, capability-guarded)
- Router/permission config (register `/wa/portfolio/*` + capabilities)
- Bootstrap file (register the module's autoloader + config)
- Panel layout header/footer (mount the module's CSS/JS once, conditionally loaded)
- `.htaccess` (rewrites + upload hardening)
- DB migration registry (mark this migration as applied)

### 18.3 Rollback plan

| Failure | Rollback |
|---|---|
| Public page broken after `index.php` switch | Restore `index.html` (1-line rename) — the static fallback arrays keep the site fully functional |
| Module code bug | Disable the menu entry + revert `index.php` to static; the DB content stays intact |
| Bad content save | Activity → Revisions → Restore (no DB restore needed) |
| Schema problem | Drop `pf_*` tables only (they are additive; nothing else references them) and restore the pre-deploy DB dump |
| Cache corruption | Delete `storage/portfolio/cache/*`; the API rebuilds from DB automatically |

Rollback must be executable in **under 10 minutes** — rehearse it on staging and document the exact commands in the handover notes.

---

## 19. Risks & mitigation

| # | Risk | L | I | Mitigation |
|---|---|---|---|---|
| R1 | Scope creep ("add a blog / multi-language / client portal") | H | M | This TRD defines v1; anything else goes to a v1.1 backlog with a separate estimate |
| R2 | Frontend regression while rewiring the data layer | M | H | Screenshot diff (§17.3); design frozen; render functions untouched; static fallback arrays retained |
| R3 | Route collision between `/wa/portfolio/` (public) and the admin route | M | H | Resolve in P0 (§5.2); namespace to `/wa/manage/portfolio/*` if needed; single documented decision |
| R4 | No direct access to the existing panel source during development | M | H | P0 includes a codebase walkthrough; if access is delayed, the module can be built standalone with an adapter layer, then integrated (adds ~1 day) |
| R5 | LiteSpeed page cache serves stale content after a save | M | M | Purge hook + 300 s TTL + `?v=hash` cache-bust; verify in T09-style tests |
| R6 | Contact form spam flood once it is real | M | M | Layered defence (§11 S8), spam scoring, blocklist, digest instead of per-message emails |
| R7 | Tailwind CDN + inline styles keep the public page heavy and CSP-weak | H | L | Documented as a separate optimisation task: precompile Tailwind, extract CSS, tighten CSP. Not required for this module but recommended as the immediate follow-up |
| R8 | Media storage grows unbounded (galleries, CV versions) | M | L | Quota warnings, unreferenced-file purge job, retention rules, WebP re-encoding |
| R9 | Email deliverability (notifications land in spam) | M | M | SPF/DKIM/DMARC on the sending domain, SMTP instead of `mail()`, proper `Reply-To`, low volume |
| R10 | Admin UX becomes "too technical" and nobody uses it | M | H | Mandatory plain-language labels, inline help, inline previews, and the §17.4 UAT walkthrough performed by the actual content owner |
| R11 | Two admins editing the same project simultaneously | L | M | Optimistic locking (`updated_at` check) returning 409 with "This item changed since you opened it — reload" |
| R12 | cPanel cron limits | M | L | Lazy fallbacks for mailer/cleanup/publisher triggered on admin requests |
| R13 | Legal/privacy exposure from storing leads | L | M | Retention policy, unsubscribe links, hashed IPs, data-deletion workflow |

---

## 20. Deliverables checklist

**Code**
- [ ] `portfolio_schema.sql` imported on staging + production (41 tables, additive only)
- [ ] Module PHP: `lib/` services, `controllers/`, `views/`, `api/` endpoints, `cron/` jobs
- [ ] Admin UI: sidebar entry, Overview, Customization (15 sub-screens), Projects, Contact (4 tabs), CV (4 tabs), Activity (4 tabs)
- [ ] Public API + updated frontend (`index.php`, JSON bootstrap, real forms, CV endpoint, SEO/JSON-LD, sitemap)
- [ ] Seed/import tool + fallback static arrays preserved

**Docs**
- [ ] This TRD (approved version, with any changes logged)
- [ ] Admin user guide (PDF/MD with screenshots) — how to publish a project, replace the CV, handle an inquiry
- [ ] Developer handover: file structure, conventions, how to add a field/table/section end-to-end, cron map, deployment + rollback runbook
- [ ] API collection (Postman/Bruno) + `tests/run.php` results
- [ ] Baseline vs. post-migration screenshot report

**Ops**
- [ ] Staging environment with migrated content
- [ ] Production deploy + DB/media backups + rollback rehearsal evidence
- [ ] Cron jobs installed and verified
- [ ] Monitoring: error log path, admin banner checks, uptime check on the public URL

---

## 21. Appendices

### Appendix A — Complete live-content inventory (seed source)

Snapshot of every value currently hard-coded on the live page, to be imported by the seeder so the site is unchanged on day 1. Full values are present in `reference/frontend-live-source.html`; the structured version is in `portfolio_api_contract.json`.

| Const / block | Items | Target table |
|---|---|---|
| `CAPABILITIES` | 4 (Full-Stack Development, Web Applications, API & Integration, Technical Ownership) | `pf_services` |
| `BRING` | 9 items | `pf_bring_items` |
| `STACK_GROUPS` | 6 groups / 34 items with levels | `pf_stack_groups` + `pf_stack_items` |
| `PROJECTS` | 10 projects (KHF Manage, Business Management & Web Platform, Automated Application Backend, Milanu, Moodle LMS & Digital Learning Platform, DigiLibrary, Sabinora, MotionUK, BCETUK, Mr. Kasem Apparel Store, Study Abroad & Education Platforms, Malco Lara Del Pozo — 10 published + 2 to verify) | `pf_projects` + `pf_project_items` |
| Filter tabs | All, WordPress Design, Plugin Development, PHP & Framework, PWA & API | `pf_project_filters` |
| `STEPS` | 8 | `pf_process_steps` |
| `PRINCIPLES` | 5 | `pf_principles` |
| Experience | 2 entries (Wedevspro, Khati Food Bazar) + 8 / 10 responsibilities + strengths | `pf_experience` + `pf_experience_items` |
| `TESTIMONIALS` | 5 unique (NL, SK, MA, AD, TK) | `pf_testimonials` |
| FAQ | 4 Q&A | `pf_faqs` |
| Hero | label, name, 4 roles, description, 3 CTAs, 3 chips, 3 badges, 3 available-for | `pf_hero` |
| Marquee | 10 project entries | auto from `pf_projects.show_in_marquee` |
| Contact/Footer | email, WhatsApp, address, social links, nav columns, copyright | `pf_settings`, `pf_social_links`, `pf_nav_links` |
| CV | `/assets/cv/developer_sazzad.pdf` (151 KB, live) | `pf_cv_profiles` + `pf_media` |

> Verification note for the developer: the live DOM shows 12 project cards region-wise while the JS array holds 10 entries plus two "View All Projects"-adjacent blocks — confirm the exact intended set from the `PROJECTS` array during seeding rather than by counting cards.

### Appendix B — `pf_settings` key reference

See §6.15. Every key: name, type, default, validation, editor screen, public exposure (yes/no). The settings API rejects any key outside this whitelist.

### Appendix C — Permission matrix

See §5.3.

### Appendix D — Seed / import mapping

The seeder (`tools/seed.php`) reads `portfolio_api_contract.json` (or the live JS arrays, parsed once into that shape) and inserts:

1. `pf_settings`, `pf_theme`, `pf_seo` — derived defaults.
2. `pf_sections` — one row per frontend section with current order and visibility.
3. `pf_hero`, `pf_about`, `pf_beyond`, `pf_stats`.
4. `pf_services`, `pf_bring_items`, `pf_stack_groups`/`items`, `pf_process_steps`, `pf_principles`, `pf_testimonials`, `pf_faqs`.
5. `pf_experience` + items.
6. `pf_projects` + items + filters (+ `pf_media` for the imported images/CV).
7. `pf_nav_links`, `pf_social_links`.
8. `pf_cv_profiles` — the existing PDF as version 1, marked active, with the legacy path mapped.

The seeder is idempotent: running it twice must not duplicate rows (match on natural keys: slug, title, or a `seed_key` column).

### Appendix E — Proposed file/folder structure

```
/wa/portfolio/                        ← public site (existing folder)
├── index.php                         ← renamed from index.html + JSON bootstrap
├── index.html.bak                    ← previous static version (rollback)
├── assets/…                          ← images, cv (legacy paths kept alive)
└── api/                              ← PUBLIC endpoints
    ├── site.php  contact.php  subscribe.php  cv-download.php
    ├── sitemap.php  jsonld.php  track.php

/wa/manage/portfolio/                 ← ADMIN module (or /wa/portfolio-admin/)
├── index.php                         ← front controller (router + capability guard)
├── views/
│   ├── layout/{sidebar.php, header.php, footer.php}
│   ├── overview.php
│   ├── customization/{brand.php, hero.php, sections.php, services.php, stack.php,
│   │                   process.php, principles.php, experience.php, testimonials.php,
│   │                   faq.php, navigation.php, seo.php, tools.php}
│   ├── projects/{list.php, form.php, trash.php}
│   ├── contact/{inbox.php, detail.php, subscribers.php, templates.php, settings.php}
│   ├── cv/{list.php, builder.php, templates.php, analytics.php}
│   ├── activity/{log.php, logins.php, revisions.php, settings.php}
│   └── partials/{repeater.php, media-picker.php, toggle.php, sortable-table.php, toast.php}
├── controllers/                      ← one per resource
├── api/                              ← ADMIN JSON endpoints (auth + CSRF)
├── lib/
│   ├── Db.php  Model.php  Repository/*.php
│   ├── Validator.php  Sanitizer.php  Slug.php
│   ├── Auth.php  Capability.php  Csrf.php
│   ├── MediaService.php  Uploader.php
│   ├── CacheWriter.php  PortfolioBootstrap.php
│   ├── ActivityLogger.php  RevisionService.php
│   ├── RateLimiter.php  Mailer.php  Queue.php
│   ├── Settings.php  Theme.php  Seo.php
│   └── helpers.php  lang/en.php
├── assets/{css/portfolio-admin.css, js/portfolio-admin.js, js/sortable.min.js, vendor/…}
├── cron/{mailer.php, cleanup.php, publish.php, backup.php, digest.php}
├── tests/{run.php, contract.php, cases/*.php}
└── sql/{portfolio_schema.sql, portfolio_seed.sql, migrations/}

storage/portfolio/                    ← outside webroot (preferred)
├── uploads/{img/yyyy/mm, cv, cv/archive, docs}
├── cache/{site.json, sitemap.xml, jsonld.json, meta.json}
├── logs/{app-YYYY-MM-DD.log, error.log}
├── backup/  tmp/
```

### Appendix F — Glossary

| Term | Meaning |
|---|---|
| Payload | The single JSON object describing the whole site, consumed by the frontend |
| Cache version hash | Short hash of the content state; used as `ETag` and cache-buster |
| Repeater | Reusable admin UI for an ordered list of items (key features, responsibilities, chips) |
| Revision | A stored snapshot of an entity before an update, restorable |
| Capability | Named permission (`portfolio.cv.manage`) checked server-side |
| Seed | Import of the current live content into the new tables |
| Q1 / Q2 | The two blocking questions in §3.2 |

---

**End of document.** Anything not listed in §2.2 is out of scope for v1; changes to scope must be agreed in writing and will update the effort table in §16.
