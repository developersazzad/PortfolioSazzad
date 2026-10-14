/* ============================================================
   SystemEasy i18n — cookie-based language switcher
   Default: English · Options: English / বাংলা (Bangla)
   Cookie: se_lang (365 days) — auto-applied on every page load
   Author: Sazzad Hossain (@developersazzad)
   ============================================================ */
(function () {
  "use strict";

  var DICT = {
    en: {
      /* ---- nav ---- */
      "nav.home": "Home",
      "nav.software": "Software",
      "nav.tutorials": "Tutorials",
      "nav.contact": "Contact",
      "nav.demo": "Live Demo",
      "nav.menu": "Menu",
      "brand.tag": "POS · Inventory · ERP",

      /* ---- hero ---- */
      "hero.badge": "Laravel 5.8 · PHP 7.4 · MySQL 8.0 — Multi-Tenant POS & ERP Ecosystem",
      "hero.title": "SystemEasy",
      "hero.sub": "Complete Shop, Business & Inventory Management System",
      "hero.lead": "A free POS management software developed by Sazzad Hossain (@developersazzad). One platform for sales, purchase, multi-location inventory, true double-entry accounting, restaurant operations and team permissions — built for retail chains, wholesalers, distribution hubs, super shops and restaurants.",
      "hero.ctaDemo": "Live Demo",
      "hero.ctaTut": "Watch Tutorials",
      "hero.ctaFeat": "Explore Features",
      "hero.demoNote": "Demo access:",
      "hero.demoCred": "admin / admin123",
      "hero.shotTag": "SystemEasy admin dashboard — live build",

      /* ---- stats ---- */
      "st.tables": "Normalized DB Tables",
      "st.curr": "Global Currencies",
      "st.perm": "Granular Permissions",
      "st.modules": "Core Modules",
      "st.speed": "Transaction Speed",
      "st.uptime": "Uptime & Security",

      /* ---- case study section 1 ---- */
      "cs1.kicker": "Case Study · Section 01",
      "cs1.h2": "Why SystemEasy Had to Exist",
      "cs1.lead": "Fast-growing retail chains outgrow generic POS software. Five costly failures showed up again and again in the field — and SystemEasy was engineered to remove every one of them.",
      "cs1.c1t": "Multi-Outlet Stock Sync Leaks",
      "cs1.c1p": "One central warehouse feeding many branches: desynced stock readings caused over-selling and silent inventory loss across outlets.",
      "cs1.c2t": "No Double-Entry Accounting",
      "cs1.c2p": "Most POS tools log only sales and expenses. Without double-entry bookkeeping (Asset = Liability + Equity), month-end audits and balance sheets never matched.",
      "cs1.c3t": "Checkout Race Conditions",
      "cs1.c3p": "Several cashiers selling the last unit in the same millisecond created database lock conflicts, double selling and corrupted stock counts.",
      "cs1.c4t": "FIFO Costing Complexity",
      "cs1.c4p": "Goods bought at different purchase prices over time made true COGS and gross profit per product impossible to calculate.",
      "cs1.c5t": "Fragmented Restaurant Workflow",
      "cs1.c5p": "Table booking, kitchen order tickets (KOT), service staff tracking and modifiers never integrated cleanly with a retail POS.",

      /* ---- case study section 2 ---- */
      "cs2.kicker": "Case Study · Section 02",
      "cs2.h2": "The Solution & The Impact",
      "cs2.lead": "A modular, domain-driven monolith on Laravel — every domain engine below was built to kill one of the five failures above, and the metrics prove it.",
      "cs2.archTitle": "Reference Architecture",
      "lay1.t": "Client Layer — Web · POS Terminal · Mobile",
      "lay1.p": "AdminLTE 2.4 · jQuery · Blade · DataTables Server-Side · Pusher WebSockets",
      "lay2.t": "Enterprise Gateway & Security",
      "lay2.p": "Cloudflare WAF · CSRF protection · Rate limiter · Session auth · SSL proxied",
      "lay3.t": "SystemEasy Core Domain Engines",
      "lay3.p": "Product (single/variant/combo) · Transactions · Atomic POS · Inventory & FIFO map with pessimistic row lock · Double-entry ledger · Cash drawer & shift close",
      "lay4.t": "Relational Persistence — MySQL 8.0 (InnoDB)",
      "lay4.p": "systemeasy_db · 69 normalized relational tables with full ACID integrity",
      "cs2.solTitle": "Engineering Decisions That Solved It",
      "cs2.s1t": "Pessimistic Row Locking",
      "cs2.s1p": "lockForUpdate() inside DB transactions makes double-selling the same stock unit physically impossible.",
      "cs2.s2t": "BCMath Money Precision",
      "cs2.s2p": "Zero floating-point discrepancy on currency and tax math — down to the last paisa.",
      "cs2.s3t": "Server-Side DataTables",
      "cs2.s3p": "Pagination, filtering and search at database level: rendering under 100ms even with millions of rows.",
      "cs2.s4t": "FIFO Batch Matching",
      "cs2.s4p": "Every sale auto-maps to the oldest purchase batch, producing exact COGS, gross profit and margin.",
      "cs2.s5t": "Automatic Double-Entry Posting",
      "cs2.s5p": "Each sale or payment posts debit + credit to the chart of accounts in the background — books always audit-ready.",
      "cs2.s6t": "Isolated PHP 7.4-FPM + Nginx",
      "cs2.s6p": "Dedicated FastCGI socket with OPcache tuning on Ubuntu 24.04 LTS: downtime-free deploys beside PHP 8.3 projects.",
      "cs2.impactTitle": "Key Metrics & Impact",
      "tbl.metric": "Metric",
      "tbl.impact": "Achievement",
      "tm1": "Database Tables", "ti1": "69 fully normalized relational tables",
      "tm2": "Active Currencies", "ti2": "141 global currencies configured",
      "tm3": "System Permissions", "ti3": "81 granular access-control permissions",
      "tm4": "Stock Accuracy", "ti4": "100% accurate inventory — zero over-selling",
      "tm5": "Transaction Speed", "ti5": "Under 50ms database execution time",
      "tm6": "Uptime & Security", "ti6": "100% uptime · Cloudflare SSL proxied · Nginx hardened",
      "cs2.quote": "Result: 100% stock accuracy, audit-ready books and sub-50ms checkout on every counter, every shift.",

      /* ---- modules teaser ---- */
      "mod.kicker": "Product Powerhouse",
      "mod.h2": "7 Core Modules, One Ecosystem",
      "mod.lead": "Every module ships production-ready inside the same codebase — no plugins, no extra licence.",
      "mod.m1t": "High-Speed POS Terminal",
      "mod.m1p": "Keyboard-driven checkout, split payments (cash + card + mobile banking), cash register shifts, barcode & 80/58mm thermal printing.",
      "mod.m2t": "Multi-Location Inventory",
      "mod.m2p": "Single / variant / combo / modifier products, rack-row-shelf tracking, batch & expiry management, low-stock alerts.",
      "mod.m3t": "Double-Entry Accounting",
      "mod.m3p": "Auto chart of accounts, background debit-credit posting, balance sheet, trial balance, P&L, cash flow and party ledgers.",
      "mod.m4t": "Purchase & Supply Chain",
      "mod.m4p": "Purchase orders, goods receipt, purchase returns, supplier dues with partial payment scheduling and FIFO batch matching.",
      "mod.m5t": "Restaurant & Hospitality",
      "mod.m5p": "Table layout, kitchen order tickets (KOT), dine-in / takeaway / delivery service charges and staff tracking.",
      "mod.m6t": "RBAC & Audit Log",
      "mod.m6p": "Spatie Laravel-Permission with 81+ permissions, custom roles and a full activity trail of every invoice edit.",
      "mod.m7t": "Multi-Currency, Tax & SMS",
      "mod.m7p": "141 currencies, multiple tax groups (VAT / GST / flat), Twilio-Nexmo SMS engine and secure public invoice links.",
      "mod.cta": "Full Software Details",

      /* ---- FAQ / AEO ---- */
      "faq.kicker": "Quick Answers · AEO",
      "faq.h2": "Frequently Asked Questions",
      "faq.q1": "What is SystemEasy?",
      "faq.a1": "SystemEasy is a free, open POS and inventory management software — a complete shop, business and inventory management system with double-entry accounting, built on Laravel 5.8, PHP 7.4 and MySQL 8.0.",
      "faq.q2": "Who developed SystemEasy?",
      "faq.a2": "SystemEasy was developed by Sazzad Hossain (@developersazzad), a full-stack web developer based in Chattogram, Bangladesh, as principal Laravel architect and lead engineer.",
      "faq.q3": "Is SystemEasy free to use?",
      "faq.a3": "Yes. SystemEasy is positioned as a free POS management system. A live demo is available at se.wedevspro.com with demo login admin / admin123.",
      "faq.q4": "Which technologies power SystemEasy?",
      "faq.a4": "Laravel 5.8, PHP 7.4-FPM, MySQL 8.0 (InnoDB), AdminLTE 2.4, Blade, jQuery, server-side DataTables, Pusher WebSockets, mPDF/DomPDF, Nginx, Redis and Cloudflare WAF/SSL.",
      "faq.q5": "Does SystemEasy support multiple outlets, currencies and restaurants?",
      "faq.a5": "Yes — multi-location inventory with stock transfers, 141 global currencies, multiple tax groups, and a full restaurant suite with tables, kitchen order tickets and delivery service charges.",
      "faq.q6": "Where can I watch SystemEasy video tutorials?",
      "faq.a6": "On the official YouTube playlist of Sazzad Hossain (@sazzadhossain01), linked from the Tutorials page of this case study.",

      /* ---- CTA ---- */
      "cta.h2": "See SystemEasy Running Live",
      "cta.p": "Log into the live demo, watch the full video playlist, or talk to the developer directly.",
      "cta.b1": "Open Live Demo",
      "cta.b2": "YouTube Playlist",
      "cta.b3": "Hire the Developer",

      /* ---- features page ---- */
      "feat.kicker": "Software Details",
      "feat.h2": "Inside the SystemEasy Codebase",
      "feat.lead": "A production tour of the seven modules — exactly what ships in the live build at se.wedevspro.com.",
      "fm1t": "High-Speed Interactive POS Terminal",
      "fm1b1": "Keyboard-shortcut driven checkout for the fastest possible counter experience.",
      "fm1b2": "Split payment in one bill: cash + card + bKash/mobile banking combined.",
      "fm1b3": "Offline-ready cash register: shift opening balance and closing handover report.",
      "fm1b4": "Barcode scanner support with 80mm/58mm thermal printer auto receipt cutting.",
      "fm2t": "Multi-Location Inventory & Warehousing",
      "fm2b1": "Product types: single, variable (size/color templates), combo bundles and modifiers.",
      "fm2b2": "Warehouse rack / row / shelf location tracking (product_racks).",
      "fm2b3": "Batch number and expiry-date management — essential for pharmacy, food and cosmetics.",
      "fm2b4": "Automatic low-stock alerts and stock adjustment with damage/scrap logging.",
      "fm3t": "True Double-Entry Accounting & Ledger",
      "fm3b1": "Fully automatic chart of accounts (accounts, account_types, account_transactions).",
      "fm3b2": "Every sale or payment posts debit and credit in the background, instantly.",
      "fm3b3": "Balance sheet, trial balance, profit & loss, cash flow statement.",
      "fm3b4": "Customer and supplier ledgers with due tracking.",
      "fm4t": "Intelligent Purchase & Supply Chain",
      "fm4b1": "Purchase order generation, goods receipt notes and purchase returns.",
      "fm4b2": "Supplier due tracking with partial payment scheduling.",
      "fm4b3": "FIFO batch matching: each sale maps to the oldest batch for exact gross profit and margin.",
      "fm5t": "Restaurant & Hospitality Suite",
      "fm5b1": "Restaurant table layout and seating management (res_tables).",
      "fm5b2": "Kitchen order tickets (KOT): counter sends digital orders straight to the kitchen.",
      "fm5b3": "Separate service-charge handling for dine-in, takeaway and home delivery.",
      "fm6t": "Enterprise RBAC & Audit Log",
      "fm6b1": "Spatie Laravel-Permission integration with 81+ granular permissions.",
      "fm6b2": "Custom roles for manager, cashier, stock keeper and accountant.",
      "fm6b3": "Full audit trail (activity_log): who edited or deleted which invoice, and when.",
      "fm7t": "Multi-Currency, Multi-Tax & Notification Gateway",
      "fm7b1": "141 global currencies and multiple tax groups (VAT / GST / flat tax).",
      "fm7b2": "SMS notification engine (Twilio, Nexmo) with automatic invoice-link updates to customers.",
      "fm7b3": "Secure public invoice viewer (/invoice/{token}) and payment receipt sharing.",
      "eng.kicker": "Senior Engineering",
      "eng.h2": "20-Year-Class Engineering Highlights",
      "eng.lead": "The advanced techniques applied inside SystemEasy that separate it from off-the-shelf POS scripts.",
      "gal.kicker": "Real Screens",
      "gal.h2": "Captured From the Live Build",
      "gal.lead": "Every screenshot below was captured from the running system — click any screen to enlarge.",
      "g1": "Admin dashboard: purchase, sales, dues, expense KPIs and instant reports",
      "g2": "Built-in header calculator for quick counter math",
      "g3": "Today's profit breakdown — opening/closing stock, discounts, returns",
      "g4": "POS terminal: cart, customer, discount, tax, shipping and payment modes",
      "g5": "Public landing page of SystemEasy",
      "g6": "Secure login screen with language selector",

      /* ---- tutorials page ---- */
      "tut.kicker": "Video Tutorials",
      "tut.playerKicker": "In-Page Player",
      "tut.playerH2": "Smooth Tutorial Player",
      "tut.playerLead": "Branded in-page player with chapter queue, auto-next, speed control and fullscreen — powered by the official YouTube IFrame API.",
      "tut.h2": "Learn SystemEasy on YouTube",
      "tut.lead": "The official tutorial playlist walks through installation, configuration and daily operation of every module — straight from the developer.",
      "tut.btnPlaylist": "Open Full Playlist",
      "tut.btnDemo": "Try It Live",
      "tut.nowPlaying": "Now playing",
      "tut.fallback": "Shortcuts: Space / K play-pause · ← / → seek 5s · M mute · F fullscreen. Ctrl/Cmd + click on a chapter opens it on YouTube.",
      "tut.screens": "Live System Screens Shown In This Course",
      "tut.chapters": "Chapters — 7 Videos",
      "tut.autoNext": "Auto next",
      "tut.watchYT": "Watch on YouTube ↗",
      "tut.playHint": "Click to play — smooth in-page player",
      "tut.errTitle": "YouTube player is blocked in this browser",
      "tut.errBody": "Your browser or an extension blocked the embedded player (error code",
      "tut.errBody2": "). Retry, or watch this chapter directly on YouTube.",
      "tut.retry": "Retry player",
      "tut.v1": "SystemEasy Introduction - Complete Shop, Business & Inventory Management System.",
      "tut.v2": "SystemEasy Contacts পরিচিতি - Complete Shop, Business & Inventory Management System.",
      "tut.v3": "SystemEasy Product পরিচিতি - Complete Shop, Business & Inventory Management System.",
      "tut.v4": "SystemEasy Product part 2 - Complete Shop, Business & Inventory Management System.",
      "tut.v5": "SystemEasy User Management পরিচিতি - Complete Shop, Business & Inventory Management System.",
      "tut.v6": "SystemEasy Sales পরিচিতি - Complete Shop,Business & Inventory Management System.",
      "tut.v7": "SystemEasy Purchases পরিচিতি - Complete Shop, Business & Inventory Management System.",

      /* ---- contact / credits ---- */
      "con.kicker": "Credits & Contact",
      "con.h2": "Built, Documented & Supported by One Developer",
      "con.lead": "SystemEasy, this case study and the tutorial playlist are all designed, developed and maintained by Sazzad Hossain.",
      "con.creditsTitle": "Project Credits",
      "cr1t": "Architecture & Development",
      "cr1p": "Sazzad Hossain — principal Laravel architect & full-stack lead engineer.",
      "cr2t": "Case Study & Design",
      "cr2p": "This promotional case-study site: minimal-3D concept, mobile-first, cookie-based Bangla/English switch — by Sazzad Hossain.",
      "cr3t": "Screenshots & Media",
      "cr3p": "All product screenshots and video covers captured from the live SystemEasy build by the author.",
      "cr4t": "Core Technology Credits",
      "cr4p": "Laravel, PHP, MySQL, AdminLTE, jQuery, DataTables, Pusher, mPDF/DomPDF, Spatie Permission, Nginx, Cloudflare.",
      "cr5t": "Tutorial Videos",
      "cr5p": "Recorded and published on the official YouTube channel @sazzadhossain01.",
      "con.reachTitle": "Reach Directly",
      "ci.mail": "Email",
      "ci.web": "Agency Website",
      "ci.wa": "WhatsApp",
      "ci.loc": "Location",
      "ci.locv": "Chattogram, Bangladesh",
      "con.socialTitle": "Connect",
      "con.hireTitle": "Need a POS, ERP or Full-Stack Build?",
      "con.hireP": "From website fixes to full-stack builds — one developer, end to end. Custom PHP/MySQL, Laravel, WordPress plugins, JavaScript, admin panels and REST APIs.",
      "con.bannerCap": "From website fixes to full-stack builds — one developer, end to end.",
      "soc.linkedin": "LinkedIn",
      "soc.github": "GitHub",
      "soc.facebook": "Facebook",
      "soc.whatsapp": "WhatsApp",
      "soc.youtube": "YouTube",
      "soc.portfolio": "Portfolio",

      /* ---- footer ---- */
      "foot.about": "SystemEasy is a free POS, inventory and double-entry accounting ecosystem for retail chains, wholesalers, super shops and restaurants — developed by Sazzad Hossain.",
      "foot.nav": "Site",
      "foot.res": "Resources",
      "foot.dev": "Developer",
      "foot.res1": "Live demo (admin / admin123)",
      "foot.res2": "YouTube tutorial playlist",
      "foot.res3": "Case study — problem & solution",
      "foot.copy": "© 2026 SystemEasy — Free POS Management System. Developed by",
      "foot.made": "Made with Laravel · MySQL · Nginx · ☕ in Chattogram"
    },

    bn: {
      /* ---- nav ---- */
      "nav.home": "হোম",
      "nav.software": "সফটওয়্যার",
      "nav.tutorials": "টিউটোরিয়াল",
      "nav.contact": "যোগাযোগ",
      "nav.demo": "লাইভ ডেমো",
      "nav.menu": "মেনু",
      "brand.tag": "পিওএস · ইনভেন্টরি · ইআরপি",

      /* ---- hero ---- */
      "hero.badge": "লারাভেল ৫.৮ · পিএইচপি ৭.৪ · মাইএসকিউএল ৮.০ — মাল্টি-টেন্যান্ট পিওএস ও ইআরপি ইকোসিস্টেম",
      "hero.title": "সিস্টেমইজি",
      "hero.sub": "কমপ্লিট শপ, বিজনেস ও ইনভেন্টরি ম্যানেজমেন্ট সিস্টেম",
      "hero.lead": "সাজ্জাদ হোসাইন (@developersazzad) কর্তৃক উন্নয়নকৃত একটি ফ্রি পিওএস ম্যানেজমেন্ট সফটওয়্যার। সেলস, পারচেস, মাল্টি-লোকেশন ইনভেন্টরি, প্রকৃত ডাবল-এন্ট্রি একাউন্টিং, রেস্টুরেন্ট অপারেশন ও টিম পারমিশন — সব এক প্ল্যাটফর্মে; রিটেইল চেইন, পাইকারি, ডিস্ট্রিবিউশন হাব, সুপারশপ ও রেস্টুরেন্টের জন্য তৈরি।",
      "hero.ctaDemo": "লাইভ ডেমো",
      "hero.ctaTut": "টিউটোরিয়াল দেখুন",
      "hero.ctaFeat": "ফিচার দেখুন",
      "hero.demoNote": "ডেমো লগইন:",
      "hero.demoCred": "admin / admin123",
      "hero.shotTag": "সিস্টেমইজি অ্যাডমিন ড্যাশবোর্ড — লাইভ বিল্ড",

      /* ---- stats ---- */
      "st.tables": "নরমালাইজড ডিবি টেবিল",
      "st.curr": "গ্লোবাল কারেন্সি",
      "st.perm": "গ্র্যানুলার পারমিশন",
      "st.modules": "কোর মডিউল",
      "st.speed": "ট্রানজেকশন স্পিড",
      "st.uptime": "আপটাইম ও সিকিউরিটি",

      /* ---- case study section 1 ---- */
      "cs1.kicker": "কেস স্টাডি · পর্ব ০১",
      "cs1.h2": "সিস্টেমইজি কেন দরকার ছিল",
      "cs1.lead": "দ্রুত বর্ধনশীল রিটেইল চেইন সাধারণ পিওএস সফটওয়্যারকে ছাড়িয়ে যায়। মাঠপর্যায়ে বারবার পাঁচটি খরচসাপেক্ষ সমস্যা দেখা দিয়েছে — এবং সিস্টেমইজি সেই পাঁচটি দূর করার জন্যই ইঞ্জিনিয়ার করা।",
      "cs1.c1t": "মাল্টি-আউটলেট স্টক সিংক লিক",
      "cs1.c1p": "একটি সেন্ট্রাল ওয়্যারহাউস থেকে একাধিক শাখায় স্টক যাওয়ায় ডাটা ডিসিঙ্ক, ওভার-সেলিং ও নীরব ইনভেন্টরি লস হতো।",
      "cs1.c2t": "ডাবল-এন্ট্রি একাউন্টিংয়ের অভাব",
      "cs1.c2p": "বেশিরভাগ পিওএস-এ শুধু সেলস ও খরচের রেকর্ড থাকে। ডাবল-এন্ট্রি বুককিপিং (Asset = Liability + Equity) না থাকায় মাস শেষে অডিট ও ব্যালান্স শিট কখনো মিলত না।",
      "cs1.c3t": "চেকআউট রেস কন্ডিশন",
      "cs1.c3p": "একই মিলিসেকেন্ডে একাধিক ক্যাশিয়ার শেষ ইউনিট বিক্রি করায় ডাটাবেজ লক কনফ্লিক্ট, ডাবল-সেলিং ও ভুল স্টক গণনা হতো।",
      "cs1.c4t": "FIFO কস্টিং জটিলতা",
      "cs1.c4p": "ভিন্ন ভিন্ন সময়ে ভিন্ন ক্রয়মূল্যে কেনা পণ্যের প্রকৃত COGS ও গ্রস প্রফিট বের করা অসম্ভব ছিল।",
      "cs1.c5t": "বিচ্ছিন্ন রেস্টুরেন্ট ওয়ার্কফ্লো",
      "cs1.c5p": "টেবিল বুকিং, কিচেন অর্ডার টিকিট (KOT), সার্ভিস স্টাফ ট্র্যাকিং ও মডিফায়ার কখনো রিটেইল পিওএসের সাথে মসৃণভাবে ইন্টিগ্রেট হতো না।",

      /* ---- case study section 2 ---- */
      "cs2.kicker": "কেস স্টাডি · পর্ব ০২",
      "cs2.h2": "সমাধান এবং প্রভাব",
      "cs2.lead": "লারাভেলের উপর মডুলার, ডোমেইন-ড্রিভেন মনোলিথ — নিচের প্রতিটি ডোমেইন ইঞ্জিন উপরের পাঁচটি সমস্যার একটি করে দূর করতে তৈরি, এবং মেট্রিকগুলোই তার প্রমাণ।",
      "cs2.archTitle": "রেফারেন্স আর্কিটেকচার",
      "lay1.t": "ক্লায়েন্ট লেয়ার — ওয়েব · পিওএস টার্মিনাল · মোবাইল",
      "lay1.p": "AdminLTE 2.4 · jQuery · Blade · DataTables Server-Side · Pusher WebSockets",
      "lay2.t": "এন্টারপ্রাইজ গেটওয়ে ও সিকিউরিটি",
      "lay2.p": "Cloudflare WAF · CSRF প্রোটেকশন · Rate limiter · Session auth · SSL proxied",
      "lay3.t": "সিস্টেমইজি কোর ডোমেইন ইঞ্জিন",
      "lay3.p": "প্রোডাক্ট (সিঙ্গল/ভ্যারিয়েন্ট/কম্বো) · ট্রানজেকশন · অ্যাটমিক পিওএস · পেসিমিস্টিক র-লক সহ ইনভেন্টরি ও FIFO ম্যাপ · ডাবল-এন্ট্রি লেজার · ক্যাশ ড্রয়ার ও শিফট ক্লোজ",
      "lay4.t": "রিলেশনাল পারসিস্টেন্স — MySQL 8.0 (InnoDB)",
      "lay4.p": "systemeasy_db · পূর্ণ ACID ইন্টিগ্রিটি সহ ৬৯টি নরমালাইজড রিলেশনাল টেবিল",
      "cs2.solTitle": "যে ইঞ্জিনিয়ারিং সিদ্ধান্তগুলো সমস্যা সমাধান করেছে",
      "cs2.s1t": "পেসিমিস্টিক র লকিং",
      "cs2.s1p": "DB ট্রানজেকশনে lockForUpdate() ব্যবহারে একই স্টক ইউনিট ডাবল-সেল করা কার্যত অসম্ভব।",
      "cs2.s2t": "BCMath মানি প্রিসিশন",
      "cs2.s2p": "কারেন্সি ও ট্যাক্স গণনায় শূন্য ফ্লোটিং-পয়েন্ট ভুল — শেষ পয়সা পর্যন্ত নির্ভুল।",
      "cs2.s3t": "সার্ভার-সাইড ডাটাটেবিলস",
      "cs2.s3p": "ডাটাবেজ লেভেলে পেজিনেশন, ফিল্টার ও সার্চ: লাখ লাখ রো-তেও রেন্ডারিং ১০০মি.সে.-এর কম।",
      "cs2.s4t": "FIFO ব্যাচ ম্যাচিং",
      "cs2.s4p": "প্রতিটি সেল স্বয়ংক্রিয়ভাবে পুরনোতম পারচেস ব্যাচের সাথে ম্যাপ হয়ে সঠিক COGS, গ্রস প্রফিট ও মার্জিন দেয়।",
      "cs2.s5t": "অটোমেটিক ডাবল-এন্ট্রি পোস্টিং",
      "cs2.s5p": "প্রতিটি সেল বা পেমেন্ট ব্যাকগ্রাউন্ডে চার্ট অফ অ্যাকাউন্টসে ডেবিট + ক্রেডিট পোস্ট করে — বই সবসময় অডিট-রেডি।",
      "cs2.s6t": "আইসোলেটেড PHP 7.4-FPM + Nginx",
      "cs2.s6p": "Ubuntu 24.04 LTS-এ ডেডিকেটেড FastCGI সকেট ও OPcache টিউনিং: PHP 8.3 প্রজেক্টের পাশে ডাউনটাইম-মুক্ত ডিপ্লয়।",
      "cs2.impactTitle": "মূল মেট্রিক ও প্রভাব",
      "tbl.metric": "মেট্রিক",
      "tbl.impact": "অর্জন",
      "tm1": "ডাটাবেজ টেবিল", "ti1": "৬৯টি পূর্ণ নরমালাইজড রিলেশনাল টেবিল",
      "tm2": "সক্রিয় কারেন্সি", "ti2": "১৪১টি গ্লোবাল কারেন্সি কনফিগার করা",
      "tm3": "সিস্টেম পারমিশন", "ti3": "৮১টি গ্র্যানুলার অ্যাক্সেস-কন্ট্রোল পারমিশন",
      "tm4": "স্টক নির্ভুলতা", "ti4": "১০০% নির্ভুল ইনভেন্টরি — জিরো ওভার-সেলিং",
      "tm5": "ট্রানজেকশন স্পিড", "ti5": "৫০মি.সে.-এর কম ডাটাবেজ এক্সিকিউশন টাইম",
      "tm6": "আপটাইম ও সিকিউরিটি", "ti6": "১০০% আপটাইম · Cloudflare SSL proxied · Nginx hardened",
      "cs2.quote": "ফলাফল: ১০০% স্টক নির্ভুলতা, অডিট-রেডি হিসাব এবং প্রতি কাউন্টারে ৫০মি.সে.-এর কম চেকআউট।",

      /* ---- modules teaser ---- */
      "mod.kicker": "প্রোডাক্ট পাওয়ারহাউস",
      "mod.h2": "৭টি কোর মডিউল, এক ইকোসিস্টেম",
      "mod.lead": "একই কোডবেসে প্রতিটি মডিউল প্রোডাকশন-রেডি — কোনো প্লাগইন বা অতিরিক্ত লাইসেন্স লাগে না।",
      "mod.m1t": "হাই-স্পিড পিওএস টার্মিনাল",
      "mod.m1p": "কিবোর্ড-চালিত চেকআউট, স্প্লিট পেমেন্ট (ক্যাশ + কার্ড + মোবাইল ব্যাংকিং), ক্যাশ রেজিস্টার শিফট, বারকোড ও ৮০/৫৮মিমি থার্মাল প্রিন্টিং।",
      "mod.m2t": "মাল্টি-লোকেশন ইনভেন্টরি",
      "mod.m2p": "সিঙ্গল / ভ্যারিয়েন্ট / কম্বো / মডিফায়ার প্রোডাক্ট, র‍্যাক-রো-শেলফ ট্র্যাকিং, ব্যাচ ও এক্সপায়ারি ম্যানেজমেন্ট, লো-স্টক অ্যালার্ট।",
      "mod.m3t": "ডাবল-এন্ট্রি একাউন্টিং",
      "mod.m3p": "অটো চার্ট অফ অ্যাকাউন্টস, ব্যাকগ্রাউন্ড ডেবিট-ক্রেডিট পোস্টিং, ব্যালান্স শিট, ট্রায়াল ব্যালান্স, P&L, ক্যাশ ফ্লো ও পার্টি লেজার।",
      "mod.m4t": "পারচেস ও সাপ্লাই চেইন",
      "mod.m4p": "পারচেস অর্ডার, গুডস রিসিট, পারচেস রিটার্ন, পার্শিয়াল পেমেন্ট শিডিউল সহ সাপ্লায়ার ডিউ এবং FIFO ব্যাচ ম্যাচিং।",
      "mod.m5t": "রেস্টুরেন্ট ও হসপিটালিটি",
      "mod.m5p": "টেবিল লেআউট, কিচেন অর্ডার টিকিট (KOT), ডাইন-ইন / টেক-অ্যাওয়ে / ডেলিভারি সার্ভিস চার্জ ও স্টাফ ট্র্যাকিং।",
      "mod.m6t": "RBAC ও অডিট লগ",
      "mod.m6p": "৮১+ পারমিশন সহ Spatie Laravel-Permission, কাস্টম রোল এবং প্রতিটি ইনভয়েস এডিটের পূর্ণ অ্যাক্টিভিটি ট্রেইল।",
      "mod.m7t": "মাল্টি-কারেন্সি, ট্যাক্স ও SMS",
      "mod.m7p": "১৪১টি কারেন্সি, একাধিক ট্যাক্স গ্রুপ (VAT / GST / ফ্ল্যাট), Twilio-Nexmo SMS ইঞ্জিন ও সিকিউর পাবলিক ইনভয়েস লিংক।",
      "mod.cta": "সফটওয়্যারের পূর্ণ বিবরণ",

      /* ---- FAQ / AEO ---- */
      "faq.kicker": "দ্রুত উত্তর · AEO",
      "faq.h2": "সচরাচর জিজ্ঞাসা",
      "faq.q1": "সিস্টেমইজি কী?",
      "faq.a1": "সিস্টেমইজি একটি ফ্রি, ওপেন পিওএস ও ইনভেন্টরি ম্যানেজমেন্ট সফটওয়্যার — ডাবল-এন্ট্রি একাউন্টিং সহ কমপ্লিট শপ, বিজনেস ও ইনভেন্টরি ম্যানেজমেন্ট সিস্টেম; লারাভেল ৫.৮, পিএইচপি ৭.৪ ও মাইএসকিউএল ৮.০ এর উপর তৈরি।",
      "faq.q2": "সিস্টেমইজি কে তৈরি করেছেন?",
      "faq.a2": "সিস্টেমইজি তৈরি করেছেন সাজ্জাদ হোসাইন (@developersazzad), চট্টগ্রাম, বাংলাদেশ ভিত্তিক ফুল-স্ট্যাক ওয়েব ডেভেলপার — প্রিন্সিপাল লারাভেল আর্কিটেক্ট ও লিড ইঞ্জিনিয়ার হিসেবে।",
      "faq.q3": "সিস্টেমইজি কি ফ্রি?",
      "faq.a3": "হ্যাঁ। সিস্টেমইজি একটি ফ্রি পিওএস ম্যানেজমেন্ট সিস্টেম হিসেবে পরিবেশিত। se.wedevspro.com-এ লাইভ ডেমো আছে, ডেমো লগইন admin / admin123।",
      "faq.q4": "কোন টেকনোলজিতে সিস্টেমইজি তৈরি?",
      "faq.a4": "লারাভেল ৫.৮, পিএইচপি ৭.৪-FPM, মাইএসকিউএল ৮.০ (InnoDB), AdminLTE 2.4, Blade, jQuery, সার্ভার-সাইড DataTables, Pusher WebSockets, mPDF/DomPDF, Nginx, Redis ও Cloudflare WAF/SSL।",
      "faq.q5": "মাল্টিপল আউটলেট, কারেন্সি ও রেস্টুরেন্ট সাপোর্ট আছে?",
      "faq.a5": "হ্যাঁ — স্টক ট্রান্সফার সহ মাল্টি-লোকেশন ইনভেন্টরি, ১৪১টি গ্লোবাল কারেন্সি, একাধিক ট্যাক্স গ্রুপ এবং টেবিল, KOT ও ডেলিভারি সার্ভিস চার্জ সহ পূর্ণ রেস্টুরেন্ট স্যুট।",
      "faq.q6": "সিস্টেমইজির ভিডিও টিউটোরিয়াল কোথায় পাব?",
      "faq.a6": "সাজ্জাদ হোসাইনের অফিসিয়াল ইউটিউব চ্যানেল (@sazzadhossain01)-এর প্লেলিস্টে, এই কেস স্টাডির টিউটোরিয়াল পেজ থেকে লিংক দেওয়া আছে।",

      /* ---- CTA ---- */
      "cta.h2": "সিস্টেমইজি লাইভ চলতে দেখুন",
      "cta.p": "লাইভ ডেমোতে লগইন করুন, পূর্ণ ভিডিও প্লেলিস্ট দেখুন, অথবা সরাসরি ডেভেলপারের সাথে কথা বলুন।",
      "cta.b1": "লাইভ ডেমো খুলুন",
      "cta.b2": "ইউটিউব প্লেলিস্ট",
      "cta.b3": "ডেভেলপারকে হায়ার করুন",

      /* ---- features page ---- */
      "feat.kicker": "সফটওয়্যার বিবরণ",
      "feat.h2": "সিস্টেমইজি কোডবেসের ভিতরে",
      "feat.lead": "সাতটি মডিউলের প্রোডাকশন টুর — se.wedevspro.com-এর লাইভ বিল্ডে যা যা আছে হুবহু তাই।",
      "fm1t": "হাই-স্পিড ইন্টারঅ্যাকটিভ পিওএস টার্মিনাল",
      "fm1b1": "দ্রুততম কাউন্টার অভিজ্ঞতার জন্য কীবোর্ড-শর্টকাট চালিত চেকআউট।",
      "fm1b2": "এক বিলে স্প্লিট পেমেন্ট: ক্যাশ + কার্ড + বিকাশ/মোবাইল ব্যাংকিং।",
      "fm1b3": "অফলাইন-রেডি ক্যাশ রেজিস্টার: শিফট ওপেনিং ব্যালান্স ও ক্লোজিং হ্যান্ডওভার রিপোর্ট।",
      "fm1b4": "বারকোড স্ক্যানার সাপোর্ট সহ ৮০মিমি/৫৮মিমি থার্মাল প্রিন্টারে অটো রিসিট কাটিং।",
      "fm2t": "মাল্টি-লোকেশন ইনভেন্টরি ও ওয়্যারহাউসিং",
      "fm2b1": "প্রোডাক্ট টাইপ: সিঙ্গল, ভ্যারিয়েবল (সাইজ/কালার টেমপ্লেট), কম্বো বান্ডল ও মডিফায়ার।",
      "fm2b2": "ওয়্যারহাউস র‍্যাক / রো / শেলফ লোকেশন ট্র্যাকিং (product_racks)।",
      "fm2b3": "ব্যাচ নম্বর ও মেয়াদোত্তীর্ণ ডেট ম্যানেজমেন্ট — ফার্মেসি, খাদ্য ও কসমেটিকসের জন্য অপরিহার্য।",
      "fm2b4": "অটোমেটিক লো-স্টক অ্যালার্ট এবং ড্যামেজ/স্ক্র্যাপ লগ সহ স্টক অ্যাডজাস্টমেন্ট।",
      "fm3t": "প্রকৃত ডাবল-এন্ট্রি একাউন্টিং ও লেজার",
      "fm3b1": "সম্পূর্ণ অটোমেটিক চার্ট অফ অ্যাকাউন্টস (accounts, account_types, account_transactions)।",
      "fm3b2": "প্রতিটি সেল বা পেমেন্ট সাথে সাথেই ব্যাকগ্রাউন্ডে ডেবিট ও ক্রেডিট পোস্ট করে।",
      "fm3b3": "ব্যালান্স শিট, ট্রায়াল ব্যালান্স, প্রফিট ও লস, ক্যাশ ফ্লো স্টেটমেন্ট।",
      "fm3b4": "ডিউ ট্র্যাকিং সহ কাস্টমার ও সাপ্লায়ার লেজার।",
      "fm4t": "ইন্টেলিজেন্ট পারচেস ও সাপ্লাই চেইন",
      "fm4b1": "পারচেস অর্ডার জেনারেশন, গুডস রিসিট নোট ও পারচেস রিটার্ন।",
      "fm4b2": "পার্শিয়াল পেমেন্ট শিডিউলিং সহ সাপ্লায়ার ডিউ ট্র্যাকিং।",
      "fm4b3": "FIFO ব্যাচ ম্যাচিং: প্রতিটি সেল পুরনোতম ব্যাচের সাথে ম্যাপ হয়ে সঠিক গ্রস প্রফিট ও মার্জিন দেয়।",
      "fm5t": "রেস্টুরেন্ট ও হসপিটালিটি স্যুট",
      "fm5b1": "রেস্টুরেন্ট টেবিল লেআউট ও সিটিং ম্যানেজমেন্ট (res_tables)।",
      "fm5b2": "কিচেন অর্ডার টিকিট (KOT): কাউন্টার থেকে সরাসরি কিচেনে ডিজিটাল অর্ডার।",
      "fm5b3": "ডাইন-ইন, টেক-অ্যাওয়ে ও হোম ডেলিভারির জন্য আলাদা সার্ভিস চার্জ ম্যানেজমেন্ট।",
      "fm6t": "এন্টারপ্রাইজ RBAC ও অডিট লগ",
      "fm6b1": "৮১+ গ্র্যানুলার পারমিশন সহ Spatie Laravel-Permission ইন্টিগ্রেশন।",
      "fm6b2": "ম্যানেজার, ক্যাশিয়ার, স্টক কিপার ও অ্যাকাউন্ট্যান্টের জন্য কাস্টম রোল।",
      "fm6b3": "পূর্ণ অডিট ট্রেইল (activity_log): কে কখন কোন ইনভয়েস এডিট বা ডিলিট করেছে।",
      "fm7t": "মাল্টি-কারেন্সি, মাল্টি-ট্যাক্স ও নোটিফিকেশন গেটওয়ে",
      "fm7b1": "১৪১টি গ্লোবাল কারেন্সি এবং একাধিক ট্যাক্স গ্রুপ (VAT / GST / ফ্ল্যাট ট্যাক্স)।",
      "fm7b2": "Twilio, Nexmo SMS নোটিফিকেশন ইঞ্জিন সহ কাস্টমারকে অটো ইনভয়েস-লিংক আপডেট।",
      "fm7b3": "সিকিউর পাবলিক ইনভয়েস ভিউয়ার (/invoice/{token}) ও পেমেন্ট রিসিট শেয়ারিং।",
      "eng.kicker": "সিনিয়র ইঞ্জিনিয়ারিং",
      "eng.h2": "২০ বছর-মানের ইঞ্জিনিয়ারিং হাইলাইটস",
      "eng.lead": "সিস্টেমইজির ভিতরে প্রয়োগ করা অ্যাডভান্সড টেকনিক যা একে সাধারণ পিওএস স্ক্রিপ্ট থেকে আলাদা করে।",
      "gal.kicker": "আসল স্ক্রিন",
      "gal.h2": "লাইভ বিল্ড থেকে ক্যাপচার করা",
      "gal.lead": "নিচের প্রতিটি স্ক্রিনশট চলমান সিস্টেম থেকে ক্যাপচার করা — বড় করে দেখতে যেকোনো স্ক্রিনে ক্লিক করুন।",
      "g1": "অ্যাডমিন ড্যাশবোর্ড: পারচেস, সেলস, ডিউ, এক্সপেনস KPI ও ইনস্ট্যান্ট রিপোর্ট",
      "g2": "কাউন্টারের দ্রুত হিসাবের বিল্ট-ইন হেডার ক্যালকুলেটর",
      "g3": "আজকের প্রফিট ব্রেকডাউন — ওপেনিং/ক্লোজিং স্টক, ডিসকাউন্ট, রিটার্ন",
      "g4": "পিওএস টার্মিনাল: কার্ট, কাস্টমার, ডিসকাউন্ট, ট্যাক্স, শিপিং ও পেমেন্ট মোড",
      "g5": "সিস্টেমইজির পাবলিক ল্যান্ডিং পেজ",
      "g6": "ল্যাঙ্গুয়েজ সিলেক্টর সহ সিকিউর লগইন স্ক্রিন",

      /* ---- tutorials page ---- */
      "tut.kicker": "ভিডিও টিউটোরিয়াল",
      "tut.playerKicker": "ইন-পেজ প্লেয়ার",
      "tut.playerH2": "মসৃণ টিউটোরিয়াল প্লেয়ার",
      "tut.playerLead": "চ্যাপ্টার কিউ, অটো-নেক্সট, স্পিড কন্ট্রোল ও ফুলস্ক্রিন সহ ব্র্যান্ডেড ইন-পেজ প্লেয়ার — অফিসিয়াল ইউটিউব IFrame API চালিত।",
      "tut.h2": "ইউটিউবে সিস্টেমইজি শিখুন",
      "tut.lead": "অফিসিয়াল টিউটোরিয়াল প্লেলিস্টে ইনস্টলেশন, কনফিগারেশন ও প্রতিটি মডিউলের দৈনন্দিন অপারেশন — সরাসরি ডেভেলপারের কাছ থেকে।",
      "tut.btnPlaylist": "পূর্ণ প্লেলিস্ট খুলুন",
      "tut.btnDemo": "লাইভ দেখুন",
      "tut.nowPlaying": "এখন চলছে",
      "tut.fallback": "শর্টকাট: Space / K প্লে-পজ · ← / → ৫ সেকেন্ড সিক · M মিউট · F ফুলস্ক্রিন। চ্যাপ্টারে Ctrl/Cmd + ক্লিক করলে ইউটিউবে খুলবে।",
      "tut.screens": "এই কোর্সে দেখানো লাইভ সিস্টেমের স্ক্রিন",
      "tut.chapters": "চ্যাপ্টার — ৭টি ভিডিও",
      "tut.autoNext": "অটো পরবর্তী",
      "tut.watchYT": "ইউটিউবে দেখুন ↗",
      "tut.playHint": "প্লে করতে ক্লিক করুন — পেজের ভিতরেই মসৃণ প্লেয়ার",
      "tut.errTitle": "এই ব্রাউজারে ইউটিউব প্লেয়ার ব্লক করা",
      "tut.errBody": "আপনার ব্রাউজার বা কোনো এক্সটেনশন এমবেড করা প্লেয়ার ব্লক করেছে (এরর কোড",
      "tut.errBody2": ")। আবার চেষ্টা করুন, অথবা চ্যাপ্টারটি সরাসরি ইউটিউবে দেখুন।",
      "tut.retry": "আবার চেষ্টা করুন",
      "tut.v1": "SystemEasy Introduction - Complete Shop, Business & Inventory Management System.",
      "tut.v2": "SystemEasy Contacts পরিচিতি - Complete Shop, Business & Inventory Management System.",
      "tut.v3": "SystemEasy Product পরিচিতি - Complete Shop, Business & Inventory Management System.",
      "tut.v4": "SystemEasy Product part 2 - Complete Shop, Business & Inventory Management System.",
      "tut.v5": "SystemEasy User Management পরিচিতি - Complete Shop, Business & Inventory Management System.",
      "tut.v6": "SystemEasy Sales পরিচিতি - Complete Shop,Business & Inventory Management System.",
      "tut.v7": "SystemEasy Purchases পরিচিতি - Complete Shop, Business & Inventory Management System.",

      /* ---- contact / credits ---- */
      "con.kicker": "ক্রেডিট ও যোগাযোগ",
      "con.h2": "এক ডেভেলপারের হাতে তৈরি, ডকুমেন্টেড ও সাপোর্টেড",
      "con.lead": "সিস্টেমইজি, এই কেস স্টাডি এবং টিউটোরিয়াল প্লেলিস্ট — সবকিছুর ডিজাইন, ডেভেলপমেন্ট ও মেইনটেন্যান্স সাজ্জাদ হোসাইনের।",
      "con.creditsTitle": "প্রজেক্ট ক্রেডিট",
      "cr1t": "আর্কিটেকচার ও ডেভেলপমেন্ট",
      "cr1p": "সাজ্জাদ হোসাইন — প্রিন্সিপাল লারাভেল আর্কিটেক্ট ও ফুল-স্ট্যাক লিড ইঞ্জিনিয়ার।",
      "cr2t": "কেস স্টাডি ও ডিজাইন",
      "cr2p": "এই প্রমোশনাল কেস-স্টাডি সাইট: মিনিমাল-3D কনসেপ্ট, মোবাইল-ফার্স্ট, কুকি-ভিত্তিক বাংলা/ইংরেজি সুইচ — সাজ্জাদ হোসাইন।",
      "cr3t": "স্ক্রিনশট ও মিডিয়া",
      "cr3p": "সব প্রোডাক্ট স্ক্রিনশট ও ভিডিও কভার লাইভ সিস্টেমইজি বিল্ড থেকে লেখক কর্তৃক ক্যাপচার করা।",
      "cr4t": "কোর টেকনোলজি ক্রেডিট",
      "cr4p": "Laravel, PHP, MySQL, AdminLTE, jQuery, DataTables, Pusher, mPDF/DomPDF, Spatie Permission, Nginx, Cloudflare।",
      "cr5t": "টিউটোরিয়াল ভিডিও",
      "cr5p": "অফিসিয়াল ইউটিউব চ্যানেল @sazzadhossain01-এ রেকর্ড ও প্রকাশিত।",
      "con.reachTitle": "সরাসরি যোগাযোগ",
      "ci.mail": "ইমেইল",
      "ci.web": "এজেন্সি ওয়েবসাইট",
      "ci.wa": "হোয়াটসঅ্যাপ",
      "ci.loc": "লোকেশন",
      "ci.locv": "চট্টগ্রাম, বাংলাদেশ",
      "con.socialTitle": "কানেক্ট করুন",
      "con.hireTitle": "পিওএস, ইআরপি বা ফুল-স্ট্যাক বিল্ড দরকার?",
      "con.hireP": "ওয়েবসাইট ফিক্স থেকে ফুল-স্ট্যাক বিল্ড — এক ডেভেলপার, এন্ড টু এন্ড। কাস্টম PHP/MySQL, লারাভেল, ওয়ার্ডপ্রেস প্লাগইন, জাভাস্ক্রিপ্ট, অ্যাডমিন প্যানেল ও REST API।",
      "con.bannerCap": "ওয়েবসাইট ফিক্স থেকে ফুল-স্ট্যাক বিল্ড — এক ডেভেলপার, এন্ড টু এন্ড।",
      "soc.linkedin": "লিংকডইন",
      "soc.github": "গিটহাব",
      "soc.facebook": "ফেসবুক",
      "soc.whatsapp": "হোয়াটসঅ্যাপ",
      "soc.youtube": "ইউটিউব",
      "soc.portfolio": "পোর্টফোলিও",

      /* ---- footer ---- */
      "foot.about": "সিস্টেমইজি একটি ফ্রি পিওএস, ইনভেন্টরি ও ডাবল-এন্ট্রি একাউন্টিং ইকোসিস্টেম — রিটেইল চেইন, পাইকারি, সুপারশপ ও রেস্টুরেন্টের জন্য; ডেভেলপার সাজ্জাদ হোসাইন।",
      "foot.nav": "সাইট",
      "foot.res": "রিসোর্স",
      "foot.dev": "ডেভেলপার",
      "foot.res1": "লাইভ ডেমো (admin / admin123)",
      "foot.res2": "ইউটিউব টিউটোরিয়াল প্লেলিস্ট",
      "foot.res3": "কেস স্টাডি — সমস্যা ও সমাধান",
      "foot.copy": "© ২০২৬ সিস্টেমইজি — ফ্রি পিওএস ম্যানেজমেন্ট সিস্টেম। ডেভেলপার:",
      "foot.made": "লারাভেল · মাইএসকিউএল · Nginx · ☕ চট্টগ্রামে তৈরি"
    }
  };

  var COOKIE = "se_lang";

  function getCookie(name) {
    var m = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }
  function currentLang() {
    var l = getCookie(COOKIE);
    return l === "bn" ? "bn" : "en";   /* default = english */
  }
  function t(key, lang) {
    var d = DICT[lang] || DICT.en;
    return d[key] != null ? d[key] : (DICT.en[key] != null ? DICT.en[key] : null);
  }
  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var v = t(nodes[i].getAttribute("data-i18n"), lang);
      if (v != null) nodes[i].textContent = v;
    }
    var ph = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < ph.length; j++) {
      var pv = t(ph[j].getAttribute("data-i18n-ph"), lang);
      if (pv != null) ph[j].setAttribute("placeholder", pv);
    }
    var al = document.querySelectorAll("[data-i18n-aria]");
    for (var k = 0; k < al.length; k++) {
      var av = t(al[k].getAttribute("data-i18n-aria"), lang);
      if (av != null) al[k].setAttribute("aria-label", av);
    }
    var btns = document.querySelectorAll(".lang button");
    for (var b = 0; b < btns.length; b++) {
      var on = btns[b].getAttribute("data-lang") === lang;
      btns[b].classList.toggle("on", on);
      btns[b].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }
  window.seSetLang = function (lang) {
    lang = lang === "bn" ? "bn" : "en";
    setCookie(COOKIE, lang, 365);
    applyLang(lang);
    document.dispatchEvent(new CustomEvent("se:lang", { detail: { lang: lang } }));
  };
  window.seLang = currentLang;

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(currentLang());
    var btns = document.querySelectorAll(".lang button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        window.seSetLang(this.getAttribute("data-lang"));
      });
    }
  });
})();
