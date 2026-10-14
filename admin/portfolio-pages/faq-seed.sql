-- =============================================================================
-- FAQ seed rows for the Portfolio module  (table: pf_faqs)
-- Project : SalesEngine WA-KHF → Portfolio → Customization → FAQ
-- Source  : CONTENT-faq-and-privacy.md  (FAQs page copy)
-- Run after: portfolio_schema.sql
-- Safe to re-run: matching questions are skipped (see the last DELETE/INSERT note)
-- =============================================================================

SET NAMES utf8mb4;

-- Optional: clear existing seeded rows first (comment out if you already have FAQs)
-- DELETE FROM `pf_faqs` WHERE `category` IN ('Getting started','Services & technical','Process & timelines','Pricing & payment','Ownership & support');

INSERT INTO `pf_faqs`
  (`question`, `answer`, `category`, `is_open_by_default`, `show_on_contact`, `is_active`, `sort_order`)
VALUES

-- ---------------------------------------------------------------- Getting started
('Are you available for new projects right now?',
 'Yes — I keep a small number of active projects at a time so each one gets real attention. The quickest way to find out about my current availability is to send a short message with your project idea and target date. You will get an honest answer, including "not right now" if my schedule is full.',
 'Getting started', 1, 1, 1, 10),

('Do you work with international clients?',
 'Yes. I am based in Chittagong, Bangladesh (GMT+6) and work remotely with clients in Europe, the UK, the US, the Middle East and Australia. I work async-first — written updates, shared documents and screenshots — with scheduled calls where a conversation is faster. There is normally a comfortable overlap window with UK/EU afternoons and US mornings.',
 'Getting started', 0, 1, 1, 20),

('What is the best way to reach you?',
 'Email is best for anything detailed: developer.sazzad.me@gmail.com. WhatsApp works well for quick questions: +880 1877-856951. The contact form on the portfolio home page lands in the same inbox. Whichever you use, you will hear back — usually within one business day.',
 'Getting started', 0, 1, 1, 30),

('Do you sign NDAs and confidentiality agreements?',
 'Yes, gladly. Send yours, or I can sign a simple mutual NDA before we discuss details. Under an NDA I also agree not to show the work in my portfolio, and I will name it in generic terms (industry and type of system) or omit it entirely — your call.',
 'Getting started', 0, 1, 1, 40),

('What languages do you work in?',
 'English and Bangla. All technical documentation, code comments and commit messages are written in English so any future developer can pick the project up cleanly.',
 'Getting started', 0, 1, 1, 50),

-- ------------------------------------------------------------ Services & technical
('What services do you primarily offer?',
 'Full-stack web development, WordPress and CMS solutions, web applications, REST APIs, third-party integrations, e-commerce builds, and long-term technical maintenance. I work across the full lifecycle — from planning to deployment and beyond.',
 'Services & technical', 0, 1, 1, 60),

('What technologies do you actually work with day to day?',
 'Frontend: HTML5, CSS3, JavaScript, responsive UI, AJAX — with React, Next.js and TypeScript as growing skills. Backend: PHP, Laravel, WordPress, REST APIs, authentication, plus Node.js and Express. Databases: MySQL and relational design, PostgreSQL. Platforms: WordPress, WooCommerce, Moodle, plugin and CMS theme development. Infrastructure: Git, GitHub, cPanel, DNS and SSL, with Docker and CI/CD in progress.',
 'Services & technical', 0, 1, 1, 70),

('Can you take over an existing project or fix an inherited codebase?',
 'Yes — this is a large part of what I do. I start with a short assessment: what the system does, where it is fragile, what is documented, what is at risk. You receive that in writing before any large piece of work begins, with a recommended order of fixes. If the honest answer is that rebuilding is cheaper than patching, I will tell you that too.',
 'Services & technical', 0, 1, 1, 80),

('Do you build e-commerce sites and payment or courier integrations?',
 'Yes. WooCommerce stores, custom product and collection structures, checkout flows, order and inventory logic, and integrations with payment gateways, courier and merchant platforms — including the kind of multi-platform operational tooling I built for KHF Manage. I also run my own e-commerce business, so I understand the business side of the checkout, not just the code.',
 'Services & technical', 0, 1, 1, 90),

('Do you handle hosting, domains, SSL, email and deployment?',
 'Yes. I can set up and manage hosting (shared or cPanel or VPS), point domains, install and renew SSL, configure business email, set up staging environments, and handle the deployment itself — or work inside your existing hosting account, using your own credentials, if you prefer to keep everything in your name.',
 'Services & technical', 0, 1, 1, 100),

('Do you build mobile apps, or just websites and web apps?',
 'Native iOS and Android app development is not my service. What I do build are Progressive Web Apps (PWA) — installable, app-like experiences that work on phones and desktops from one codebase, like KHF Manage. For most businesses a PWA covers the requirement without the cost and maintenance of two native apps.',
 'Services & technical', 0, 1, 1, 110),

('Do you also do UI/UX or graphic design?',
 'I implement frontend design at a high standard — including the design system this site uses — and I can create a clean, practical interface for a business system where usability matters more than branding. I do not offer brand identity or logo design; if you have a designer or an existing brand, I will build precisely to it.',
 'Services & technical', 0, 1, 1, 120),

('Do you work with Moodle, LMS platforms and digital libraries?',
 'Yes. I have delivered Moodle-based learning environments — course and user management, enrolment workflows, third-party API integrations — plus custom digital library and learning-resource platforms. If you are migrating an existing course catalogue into an LMS, that is familiar ground.',
 'Services & technical', 0, 1, 1, 130),

('Can you do SEO for my website?',
 'Technical SEO — yes: clean site structure, semantic markup, metadata, sitemaps, page speed, structured data and schema, and generative-engine optimisation (making a brand readable to AI search systems). Content marketing, link building and ongoing campaign management are outside my scope.',
 'Services & technical', 0, 1, 1, 140),

-- ------------------------------------------------------------- Process & timelines
('How long does it take to see results?',
 'Simple websites and landing pages: 1 to 2 weeks. Complex web apps and integrated platforms: 4 to 8 weeks depending on scope. I always provide a timeline estimate before starting.',
 'Process & timelines', 0, 1, 1, 150),

('How do you actually work — what is your process?',
 'Eight stages, and I stay involved in all of them: Understand, Analyze, Plan, Build, Integrate, Test, Deploy, Maintain. In practice that means I ask questions before writing code, plan the structure in writing, build in reviewable stages, test on real devices, deploy carefully, and do not disappear after launch.',
 'Process & timelines', 0, 1, 1, 160),

('Do I get a written scope and estimate before work starts?',
 'Always. Before any project you receive, in writing: what is included, what is excluded, the deliverables, the timeline with milestones, the price and the assumptions it is based on. The goal is simple — no surprises on either side, and no "I thought that was included" later.',
 'Process & timelines', 0, 1, 1, 170),

('How often will I hear from you during the project?',
 'You will get a scheduled update at least once a week, plus a working demo or staging link at each milestone so you can see progress instead of taking my word for it. For anything urgent you can reach me directly on WhatsApp or email — you are never waiting weeks to find out what is happening.',
 'Process & timelines', 0, 1, 1, 180),

('How do you handle feedback and revisions?',
 'Each milestone comes with a review point. Changes that refine what we agreed are part of the work — fix them and move on, no argument. Changes that add something new to the scope are quoted separately so you can decide with the cost in front of you.',
 'Process & timelines', 0, 1, 1, 190),

('Does my project need to be fully specified before we start?',
 'No. A problem description in plain language is enough to begin: what you do, what is painful today, and what you want to be possible. I will ask the questions that turn that into a specification — that analysis is part of the job, not something you have to arrive with.',
 'Process & timelines', 0, 1, 1, 200),

-- -------------------------------------------------------------- Pricing & payment
('How much does a project cost?',
 'It depends on scope, so I do not publish a price list that would be wrong for your project. What I can promise is this: the consultation is free, you get a fixed written quote before work starts, and that quote is based on real requirements rather than a guess. Small, well-defined jobs are quoted as a flat task fee; larger builds are priced per milestone.',
 'Pricing & payment', 0, 1, 1, 210),

('Do you take an advance payment?',
 'Yes — projects typically start with an advance, followed by scheduled milestone payments, with the balance due before final delivery and handover. The exact split is agreed in the written scope, so both sides know the schedule from day one.',
 'Pricing & payment', 0, 1, 1, 220),

('Which payment methods do you accept?',
 'Within Bangladesh: bank transfer, bKash or Nagad. For international clients: bank or wire transfer, or another agreed method. Every payment is documented with an invoice or receipt, and third-party costs (domain, hosting, licences, gateway fees) are billed at cost and listed upfront — never buried in the price.',
 'Pricing & payment', 0, 1, 1, 230),

('Are there any hidden costs?',
 'No. My development fee is what the quote says. The only additional costs are external ones you own directly — hosting, domain renewal, paid plugins or licences, SMS and gateway charges — and those are listed in the scope before you commit. If a requirement changes, you get a written quote for the change before any extra work is done.',
 'Pricing & payment', 0, 1, 1, 240),

('Do you offer monthly retainers or ongoing support plans?',
 'Yes. Some clients prefer a small monthly block of hours for fixes, improvements, backups, monitoring and small feature work instead of paying per task. It is optional — plenty of projects run perfectly well with per-task quotes after launch.',
 'Pricing & payment', 0, 1, 1, 250),

-- --------------------------------------------------- Ownership, handover & support
('Who owns the code and content after delivery?',
 'You do. Once the project is complete and paid for, the code, design and content are yours — including access to the hosting, database and repository. I keep no lock on your system. The only exception is portfolio rights: I may reference the work as an example unless an NDA says otherwise.',
 'Ownership & support', 0, 1, 1, 260),

('Do you provide maintenance after launch?',
 'Yes. Every project includes a support window after launch for defects in the delivered work — if something I built misbehaves, I fix it. Beyond that, ongoing maintenance, updates, monitoring and new features are available as a retainer or on a per-task basis. A project is not finished at deploy; it needs care afterwards.',
 'Ownership & support', 0, 1, 1, 270),

('What happens if something breaks a year later?',
 'Send me the detail and I will diagnose it — usually quickly, since I built the system and know where to look. If it is a bug in code I delivered, it is handled as a defect. If it is a hosting change, a third-party service update, or an expired licence, I will tell you exactly what happened and quote the fix. Either way, you get clarity instead of a mystery.',
 'Ownership & support', 0, 1, 1, 280),

('Will you document the system and train my team to use it?',
 'Yes, and this matters more than most developers admit. You get handover notes covering what was built and how it is structured, plus a practical walkthrough of the admin panel for the people who will actually use it — recording included for larger systems. If your team cannot run the system confidently, the delivery is not finished.',
 'Ownership & support', 0, 1, 1, 290),

('What if my project stops midway — can we pause?',
 'Life happens and business priorities move — you can pause. Completed and approved milestones are settled, the current state is documented and committed so nothing is lost, and we agree a restart date. Long pauses of several months mean re-quoting the remaining work, since the environment, dependencies and requirements will have moved.',
 'Ownership & support', 0, 1, 1, 300),

('What about my data, files and privacy?',
 'Client files, credentials and databases are treated as confidential: access is limited to me, stored securely, never shared or reused for other work, and removed from my systems when the engagement ends, after an agreed retention period in case you need support. Exactly what I collect on this website, why, and how long I keep it is set out in the Privacy Policy.',
 'Ownership & support', 0, 1, 1, 310),

('I am not sure what I need yet — where do we start?',
 'Start by describing your problem or goal. I will analyze the requirements and propose the best technical approach — whether that is a custom build, a platform integration, or an existing solution configured for your needs. The consultation is free and there is no obligation to continue afterwards.',
 'Ownership & support', 0, 1, 1, 320);

-- =============================================================================
-- 32 rows inserted across 5 categories.
--
-- Frontend mapping: the FAQs page currently ships the same copy statically.
-- Once you wire the page to GET /wa/portfolio/api/site.php (payload key "faqs"),
-- the page renders from these rows — edit here, not in HTML (see TRD §10).
--
-- Note: the first question is flagged is_open_by_default = 1, matching the
-- behaviour of the live site where the first accordion item starts expanded.
-- =============================================================================
