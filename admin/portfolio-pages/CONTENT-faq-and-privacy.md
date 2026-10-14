# Content pack — FAQs page & Privacy Policy page
**For:** Sazzad Hossain — portfolio at `ai.khatifoodbazar.com/wa/portfolio/`
**Prepared:** 21 September 2026
**Files that go with this document**

| File | Purpose |
|---|---|
| `faq/index.html` | Ready-to-deploy FAQs page (self-contained, no external assets except Google Fonts) |
| `privacy/index.html` | Ready-to-deploy Privacy Policy page (self-contained) |
| `faq-seed.sql` | Optional — the FAQ questions/answers as `INSERT` rows for `pf_faqs` (from the Portfolio module TRD) |
| `CONTENT-faq-and-privacy.md` | This file — all copy in plain text + wiring instructions + review checklist |

---

## 1. Where these pages go (wiring)

The footer bottom bar links currently point to `href="#"` (dead). Change them to:

```html
<div class="footer-bottom-links">
  <a href="/wa/portfolio/faq/">FAQs</a>
  <a href="/wa/portfolio/privacy/">Privacy</a>
  <a href="#contact">Contact</a>
</div>
```

Upload so the file structure becomes:

```
/wa/portfolio/
├── index.php (or index.html)      ← your main page, unchanged
├── faq/index.html                 ← new
├── privacy/index.html             ← new
└── assets/…
```

Notes:
- Both pages are **completely self-contained** — one HTML file each, with inline CSS/JS. No build step, no dependencies to upload. Other than Google Fonts and your host's own serving, they make zero third-party requests.
- Relative links (`../#work`, `../privacy/`) work exactly in this structure. If you place them somewhere else, update the `../` prefixes and the two `canonical` URLs.
- Optional polish: add `RewriteRule ^faq/?$ faq/index.html [L]` style clean URLs if you prefer `/wa/portfolio/faq` without the trailing slash — LiteSpeed already serves `faq/` → `faq/index.html` by default.
- Optional SEO: add both URLs to `sitemap.xml`, and add `FAQPage` structured data (already prepared in the TRD's `jsonld.php` endpoint).

---

## 2. FAQs page — full copy

**Page title:** FAQ — Sazzad Hossain | Full-Stack Web Developer
**Meta description:** Answers to the questions clients ask most before starting a project with Sazzad Hossain — services, tech stack, process, pricing, timelines, ownership and post-launch support.

**Hero kicker:** `sazzad@devfolio:~$ cat faq.md`
**H1:** Frequently Asked **Questions**
**Intro:** Everything clients usually ask before we start working together — what I build, how I work, how pricing and timelines are handled, who owns the code afterwards, and what happens after launch. If your question isn't here, message me directly and I'll answer it honestly.

**Stat pills:** 24 questions · Based in Bakakalia, Chittagong · Working worldwide, remote · Replies in ~1 business day

The page includes a live **search box** and five **category filters** (Getting started · Services & technical · Process · Pricing & payment · Ownership & support). No results state offers a direct link to the contact form.

### 01 — Getting started

**Q1. Are you available for new projects right now?**
Yes — I keep a small number of active projects at a time so each one gets real attention. The quickest way to find out about my current availability is to send a short message with your project idea and target date. You'll get an honest answer, including "not right now" if my schedule is full.

**Q2. Do you work with international clients?**
Yes. I'm based in Chittagong, Bangladesh (GMT+6) and work remotely with clients in Europe, the UK, the US, the Middle East and Australia. I work async-first — written updates, shared documents and screenshots — with scheduled calls where a conversation is faster. There is normally a comfortable overlap window with UK/EU afternoons and US mornings.

**Q3. What's the best way to reach you?**
Email is best for anything detailed: developer.sazzad.me@gmail.com. WhatsApp works well for quick questions: +880 1877-856951. The contact form on the portfolio home page lands in the same inbox. Whichever you use, you'll hear back — usually within one business day.

**Q4. Do you sign NDAs and confidentiality agreements?**
Yes, gladly. Send yours, or I can sign a simple mutual NDA before we discuss details. Under an NDA I also agree not to show the work in my portfolio, and I'll name it in generic terms (industry and type of system) or omit it entirely — your call.

**Q5. What languages do you work in?**
English and Bangla (বাংলা). All technical documentation, code comments and commit messages are written in English so any future developer can pick the project up cleanly.

### 02 — Services & technical

**Q6. What services do you primarily offer?** *(marked "Popular")*
Full-stack web development, WordPress & CMS solutions, web applications, REST APIs, third-party integrations, e-commerce builds, and long-term technical maintenance. I work across the full lifecycle — from planning to deployment and beyond.

**Q7. What technologies do you actually work with day to day?**
Frontend: HTML5, CSS3, JavaScript, responsive UI, AJAX — with React, Next.js and TypeScript as growing skills. Backend: PHP, Laravel, WordPress, REST APIs, authentication — plus Node.js/Express. Databases: MySQL and relational design, PostgreSQL. Platforms: WordPress, WooCommerce, Moodle, plugin and CMS theme development. Infrastructure: Git/GitHub, cPanel, DNS & SSL, with Docker and CI/CD in progress. The full breakdown with depth levels is on the Technical Stack section.

**Q8. Can you take over an existing project or fix an inherited codebase?**
Yes — this is a large part of what I do. I start with a short assessment: what the system does, where it's fragile, what's documented, what's at risk. You receive that in writing before any large piece of work begins, with a recommended order of fixes. If the honest answer is "rebuilding is cheaper than patching", I'll tell you that too.

**Q9. Do you build e-commerce sites and payment/courier integrations?**
Yes. WooCommerce stores, custom product/collection structures, checkout flows, order and inventory logic, and integrations with payment gateways, courier and merchant platforms — including the kind of multi-platform operational tooling I built for KHF Manage. I also run my own e-commerce business, so I understand the business side of the checkout, not just the code.

**Q10. Do you handle hosting, domains, SSL, email and deployment?**
Yes. I can set up and manage hosting (shared/cPanel or VPS), point domains, install and renew SSL, configure business email, set up staging environments, and handle the deployment itself — or work inside your existing hosting account, using your own credentials, if you prefer to keep everything in your name.

**Q11. Do you build mobile apps, or just websites and web apps?**
Native iOS/Android app development isn't my service. What I do build are Progressive Web Apps (PWA) — installable, app-like experiences that work on phones and desktops from one codebase, like KHF Manage. For most businesses a PWA covers the requirement without the cost and maintenance of two native apps.

**Q12. Do you also do UI/UX or graphic design?**
I implement frontend design at a high standard — including the design system this site uses — and I can create a clean, practical interface for a business system where usability matters more than branding. I don't offer brand identity or logo design; if you have a designer or an existing brand, I'll build precisely to it.

**Q13. Do you work with Moodle, LMS platforms and digital libraries?**
Yes. I've delivered Moodle-based learning environments — course and user management, enrolment workflows, third-party API integrations — plus custom digital library and learning-resource platforms. If you're migrating an existing course catalogue into an LMS, that's familiar ground.

**Q14. Can you do SEO for my website?**
Technical SEO — yes: clean site structure, semantic markup, metadata, sitemaps, page speed, structured data and schema, and generative-engine optimisation (making a brand readable to AI search systems, as I did for Malco Larra Del Pozo). Content marketing, link building and ongoing campaign management are outside my scope.

### 03 — Process & timelines

**Q15. How long does it take to see results?**
Simple websites and landing pages: 1–2 weeks. Complex web apps and integrated platforms: 4–8 weeks depending on scope. I always provide a timeline estimate before starting.

**Q16. How do you actually work — what's your process?**
Eight stages, and I stay involved in all of them: Understand → Analyze → Plan → Build → Integrate → Test → Deploy → Maintain. In practice that means I ask questions before writing code, plan the structure in writing, build in reviewable stages, test on real devices, deploy carefully, and don't disappear after launch.

**Q17. Do I get a written scope and estimate before work starts?**
Always. Before any project you receive, in writing: what's included, what's excluded, the deliverables, the timeline with milestones, the price and the assumptions it's based on. The goal is simple — no surprises on either side, and no "I thought that was included" later.

**Q18. How often will I hear from you during the project?**
You'll get a scheduled update at least once a week, plus a working demo or staging link at each milestone so you can see progress instead of taking my word for it. For anything urgent you can reach me directly on WhatsApp or email — you're never waiting weeks to find out what's happening.

**Q19. How do you handle feedback and revisions?**
Each milestone comes with a review point. Changes that refine what we agreed are part of the work — fix them and move on, no argument. Changes that add something new to the scope are quoted separately so you can decide with the cost in front of you.

**Q20. Does my project need to be fully specified before we start?**
No. A problem description in plain language is enough to begin: what you do, what's painful today, and what you want to be possible. I'll ask the questions that turn that into a specification — that analysis is part of the job, not something you have to arrive with.

### 04 — Pricing & payment

**Q21. How much does a project cost?**
It depends on scope, so I don't publish a price list that would be wrong for your project. What I can promise is this: the consultation is free, you get a fixed written quote before work starts, and that quote is based on real requirements rather than a guess. Small, well-defined jobs are quoted as a flat task fee; larger builds are priced per milestone.

**Q22. Do you take an advance payment?**
Yes — projects typically start with an advance, followed by scheduled milestone payments, with the balance due before final delivery and handover. The exact split is agreed in the written scope, so both sides know the schedule from day one.

**Q23. Which payment methods do you accept?**
Within Bangladesh: bank transfer, bKash or Nagad. For international clients: bank/wire transfer or another agreed method. Every payment is documented with an invoice or receipt, and third-party costs (domain, hosting, licences, gateway fees) are billed at cost and listed upfront — never buried in the price.

**Q24. Are there any hidden costs?**
No. My development fee is what the quote says. The only additional costs are external ones you own directly — hosting, domain renewal, paid plugins or licences, SMS/gateway charges — and those are listed in the scope before you commit. If a requirement changes, you get a written quote for the change before any extra work is done.

**Q25. Do you offer monthly retainers or ongoing support plans?**
Yes. Some clients prefer a small monthly block of hours for fixes, improvements, backups, monitoring and small feature work instead of paying per task. It's optional — plenty of projects run perfectly well with per-task quotes after launch.

### 05 — Ownership, handover & support

**Q26. Who owns the code and content after delivery?**
You do. Once the project is complete and paid for, the code, design and content are yours — including access to the hosting, database and repository. I keep no lock on your system. The only exception is portfolio rights: I may reference the work as an example unless an NDA says otherwise.

**Q27. Do you provide maintenance after launch?**
Yes. Every project includes a support window after launch for defects in the delivered work — if something I built misbehaves, I fix it. Beyond that, ongoing maintenance, updates, monitoring and new features are available as a retainer or on a per-task basis. A project isn't finished at deploy; it needs care afterwards.

**Q28. What happens if something breaks a year later?**
Send me the detail and I'll diagnose it — usually quickly, since I built the system and know where to look. If it's a bug in code I delivered, it's handled as a defect. If it's a hosting change, a third-party service update, or an expired licence, I'll tell you exactly what happened and quote the fix. Either way, you get clarity instead of a mystery.

**Q29. Will you document the system and train my team to use it?**
Yes, and this matters more than most developers admit. You get handover notes covering what was built and how it's structured, plus a practical walkthrough of the admin panel for the people who'll actually use it — recording included for larger systems. If your team can't run the system confidently, the delivery isn't finished.

**Q30. What if my project stops midway — can we pause?**
Life happens and business priorities move — you can pause. Completed and approved milestones are settled, the current state is documented and committed so nothing is lost, and we agree a restart date. Long pauses (several months) mean re-quoting the remaining work, since the environment, dependencies and requirements will have moved.

**Q31. What about my data, files and privacy?**
Client files, credentials and databases are treated as confidential: access is limited to me, stored securely, never shared or reused for other work, and removed from my systems when the engagement ends (after an agreed retention period in case you need support). Exactly what I collect on this website, why, and how long I keep it is set out in the Privacy Policy.

**Q32. I'm not sure what I need yet — where do we start?**
Start by describing your problem or goal. I'll analyze the requirements and propose the best technical approach — whether that's a custom build, a platform integration, or an existing solution configured for your needs. The consultation is free and there's no obligation to continue afterwards.

### Closing CTA
**Kicker:** Have any question
**Heading:** Still not answered? **Let's talk.**
**Body:** A short message is enough — tell me what you're building, what's stuck, and what a good outcome looks like. You'll get an honest reply (usually within one business day) with a clear next step.
**Buttons:** Send a message · developer.sazzad.me@gmail.com · WhatsApp

> Count: the page header pill and the results counter both read **32 questions**, matching the 5 categories above (5 + 9 + 6 + 5 + 7). If you trim or add questions, update the two places in `faq/index.html` — search for `>32<` and `>32 of 32 shown<`. The live counter after that is generated automatically by the page script.

---

## 3. Privacy Policy page — full copy

**Page title:** Privacy Policy — Sazzad Hossain | Full-Stack Web Developer
**Effective date:** 21 September 2026
**Kicker:** `sazzad@devfolio:~$ cat privacy.md`

**Summary cards (top of page):**
1. **I collect very little** — Only what you type into the contact or subscribe form, plus basic technical data for security and statistics.
2. **I never sell it** — Your details are never sold, rented or traded, and never used for advertising lists or resold mailing lists.
3. **No ad tracking** — No advertising pixels, no cross-site profiling. Analytics, if enabled, are aggregate and configuration-light.
4. **You stay in control** — Unsubscribe in one click, or email me to access, correct or delete everything I hold about you.

**Sections (the page has a sticky "On this page" index that highlights as you scroll):**

1. **Who is responsible for your information** — Sazzad Hossain, independent full-stack developer, Bakalia, Chittagong, Bangladesh; controller of the data described; contact email.
2. **What information I collect** — table of 6 data types (contact form message; subscriber email; CV download stats incl. hashed IP; server logs; theme/local-storage preference; aggregate analytics) each with when/why/retention. Plus "what I do not collect" list (no passwords, no card data, no sensitive categories, no ad identifiers) and a callout: *don't send secrets through the form*.
3. **Why I use your information** — reply to you; prepare a proposal; deliver agreed work; send updates you asked for; keep the site safe; understand what's useful. Explicitly: no automated decision-making, no unrequested marketing.
4. **The legal basis for processing** — table mapping each purpose to consent / contract / legitimate interest; note on the local Bangladeshi framework and following the stricter standard where rules differ.
5. **Cookies and local storage** — table: `theme` and `menu` local storage, session cookie, host-level security filtering, optional analytics cookies (13–14 months). No advertising cookies.
6. **Third-party services this site relies on** — table: web host, Google Fonts, Tailwind/JS assets, email/SMTP provider, GA4 (only if enabled), reCAPTCHA (only if enabled), WhatsApp (only if you choose it) — with what each can see, plus a transfer note.
7. **Who I share information with** — nobody else, never for money; providers, professional advisers, lawful authority requests; portfolio-rights exception with the NDA caveat.
8. **How long information is kept** — enquiries 24 months; client records engagement + 24 months; subscribers until unsubscribe (+6 months suppression); CV stats 12 months hashed; server logs 12 months; spam records 12 months. Earlier deletion on request.
9. **How the information is protected** — HTTPS/HSTS, spam filtering and rate limiting, protected admin area, hashed download stats, restricted backups, dependency updates; honest note that no system is perfect.
10. **If you're a client: your project data** — data belongs to the client; limited access; no copying production data; credentials via password manager; no reuse; access removed and copies deleted on completion; NDA available.
11. **Your rights over your information** — six rights cards: access, correction, deletion, portability, objection & restriction, withdraw consent; 30-day response promise; complaint route note for EU/UK and Bangladesh.
12. **Children** — services for businesses; nothing knowingly collected from under-16s; deletion on request.
13. **Links to other websites** — client projects, repositories and social profiles have their own policies.
14. **Changes to this policy** — how updates are communicated + version history block (`v1.0 — 21 September 2026`).
15. **How to contact me about privacy** — email, WhatsApp, postal address; links to FAQ and contact form.

---

## 4. Before you publish — review checklist

These are the items where **your confirmation matters**, because the copy states a commitment on your behalf:

- [ ] **Response time** — the FAQ says "usually within one business day" (3 places). Confirm or change.
- [ ] **Retention periods** — 24 months for enquiries, 12 months for logs/CV stats, 6 months for unsubscribed records. Align these with what your panel actually does (the Portfolio module TRD keeps contact submissions indefinitely unless a retention policy is set — either shorten the policy text or set the retention rule in the module).
- [ ] **Third-party services table** — remove any row that isn't true for your build. Specifically: is Google Analytics / reCAPTCHA actually enabled? Is Cloudflare (or similar) in front of the host? Is Tailwind loaded from a CDN (yes, currently)? If you self-host fonts later, delete that row.
- [ ] **Payment methods** — bank transfer, bKash, Nagad listed. Confirm which you actually accept; add international options you use.
- [ ] **Advance/milestone split** — the FAQ describes advance + milestones + balance before handover. Confirm your real policy.
- [ ] **Social links** — Facebook, YouTube and LinkedIn URLs in both page footers are placeholders (`facebook.com`, `youtube.com`, `linkedin.com`). Replace with your real profile URLs — this also fixes the same dead links on the main page.
- [ ] **WhatsApp number** — `+880 1877-856951` reused from the live site; confirm it's current.
- [ ] **Address** — "Bakalia, Chittagong" is shown publicly in the privacy policy and footer. If you'd rather not publish a neighbourhood, change to "Chittagong, Bangladesh".
- [ ] **NDA / portfolio rights wording** — confirm you're comfortable with "I may reference the work unless an NDA says otherwise".
- [ ] **Effective date & version** — set to today's date (21 Sep 2026) in both pages; update on any future change.
- [ ] **FAQ count pill** — currently set to **32 questions** (5 + 9 + 6 + 5 + 7); keep it in sync if you add or remove questions.
- [ ] **Subscriber data** — the policy says unsubscribe in one click. Make sure the footer subscribe flow actually stores subscribers (it currently doesn't) or the promise can't be honoured.

**One more thing:** this policy is written to be clear, accurate and professional, but it is not legal advice. Given you handle client project data as a contractor, it's worth a 30-minute review by a lawyer familiar with Bangladeshi and (if you take EU/UK clients) GDPR obligations before you rely on it contractually. The text is structured so a lawyer can adjust wording without rewriting it.

---

## 5. Optional — FAQ rows for the admin panel

`faq-seed.sql` contains the same questions as `INSERT` statements for the `pf_faqs` table from the Portfolio module TRD, so you can manage them from **Portfolio → Customization → FAQ** instead of editing HTML. Import it after `portfolio_schema.sql`, then switch the FAQ page to render from the API (same pattern as the main page — see TRD §10).

---

## 6. Design consistency notes (for whoever edits these pages later)

Both pages intentionally reuse the main portfolio's design tokens so nothing looks bolted on:

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#0a0a0f` | Page background |
| `--surface` | `#12121b` | Cards, inputs, table headers |
| `--border` / `--border-strong` | `rgba(255,255,255,.09 / .16)` | Dividers, card outlines |
| `--accent` | `#b6ff3c` | Kickers, active states, links, buttons |
| `--accent-glow` | `rgba(182,255,60,.14)` | Focus rings, icon backgrounds |
| Fonts | Space Grotesk (headings) · Inter (body) · JetBrains Mono (labels/terminal) | same as main page |

Both files also ship with: skip-to-content link, keyboard-focus outlines, `aria-expanded` on the accordion, an accessible "Back to top" button, a print stylesheet on the privacy page (so it prints cleanly as a document), and a light-theme-safe structure if you later port the theme toggle.
