<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#080b1d" />
  <meta name="color-scheme" content="dark" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="author" content="DeveloperSazzad" />
  <meta name="application-name" content="AWIN Lottery PWA Case Study" />
  <meta name="keywords"
    content="AWIN lottery PWA case study, lottery app design, PWA ticketing system, admin dashboard, API-powered lottery ecosystem, QR ticket verification, wallet management, DeveloperSazzad" />
  <meta name="description"
    content="Explore AWIN, an API-powered lottery ecosystem with a mobile PWA, admin dashboard, QR ticket verification, wallet operations and live notifications." />
  <title>AWIN Lottery PWA Case Study | DeveloperSazzad</title>

  <link rel="canonical" href="https://sazzad.wedevspro.com/case-study/awin-case-study/" />
  <meta property="og:url" content="https://sazzad.wedevspro.com/case-study/awin-case-study/" />
  <!-- Social sharing metadata. Set an absolute canonical URL after deploying the portfolio page. -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="DeveloperSazzad Portfolio" />
  <meta property="og:title" content="AWIN Lottery PWA Case Study | DeveloperSazzad" />
  <meta property="og:description"
    content="A connected, API-powered lottery ecosystem spanning a public website, mobile PWA and admin command center." />
  <meta property="og:image" content="https://sazzad.wedevspro.com/assets/posters/awin_poster.webp" />
  <meta property="og:image:width" content="1920" />
  <meta property="og:image:height" content="1080" />
  <meta property="og:image:alt" content="AWIN connected system case study by DeveloperSazzad" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="AWIN Lottery PWA Case Study | DeveloperSazzad" />
  <meta name="twitter:description"
    content="See how AWIN connects public discovery, a mobile PWA, admin operations and secure API workflows." />
  <meta name="twitter:image" content="https://sazzad.wedevspro.com/assets/posters/awin_poster.webp" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "AWIN Lottery PWA Case Study",
        "description": "A product case study of an API-powered lottery ecosystem with a mobile PWA, public website and admin dashboard.",
        "inLanguage": "en",
        "about": { "@id": "#awin-software" },
        "author": { "@type": "Person", "name": "DeveloperSazzad" }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "#awin-software",
        "name": "AWIN",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Progressive Web App",
        "description": "An API-powered lottery ecosystem combining secure ticketing, wallet operations, QR verification, omnichannel notifications and a role-based admin control plane.",
        "featureList": [
          "Mobile PWA ticket purchasing", "Role-based Admin dashboard", "Secure REST API", "Wallet top-ups and withdrawals", "QR ticket verification", "WhatsApp, SMS and Email notifications"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is AWIN?", "acceptedAnswer": { "@type": "Answer", "text": "AWIN is a connected lottery ecosystem that combines a public website, a mobile-first PWA and an administrative control panel through secure API routes." } },
          { "@type": "Question", "name": "How does the AWIN PWA work?", "acceptedAnswer": { "@type": "Answer", "text": "The PWA uses API-driven flows for wallet management, package discovery, ticket purchasing, QR scanning and result verification without direct client database access." } },
          { "@type": "Question", "name": "What does the AWIN admin dashboard manage?", "acceptedAnswer": { "@type": "Answer", "text": "The admin dashboard manages users, merchants, package inventory, financial approvals, winner resolution, public website content and notification delivery." } }
        ]
      }
    ]
  }
  </script>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <div class="cursor-glow" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <div class="progress" aria-hidden="true"><span></span></div>

  <header class="site-header" id="top">
    <a class="brand" href="#top" aria-label="AWIN case study home">
      <span class="brand-mark"><i></i><i></i><i></i></span>
      <span>AWIN<span class="brand-dim"> / CASE STUDY</span></span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="#story">Story</a>
      <a href="#architecture">Architecture</a>
      <a href="#experience">Experience</a>
      <a href="#system">System</a>
      <a href="#gallery">Screens</a>
    </nav>
    <a href="#gallery" class="header-cta">Explore build <span>↘</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false"
      aria-controls="mobile-nav"><span></span><span></span></button>
  </header>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
    <a href="#story">Story</a><a href="#architecture">Architecture</a><a href="#experience">Experience</a><a
      href="#system">System</a><a href="#gallery">Screens</a>
  </nav>

  <main>
    <section class="hero section-shell">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow"><span class="pulse-dot"></span> PRODUCT SYSTEM / 2026</p>
        <h1>One lottery <em>ecosystem.</em><br>Every surface, <span>in sync.</span></h1>
        <p class="hero-lede">AWIN unifies a dynamic public website, an API-first mobile PWA, and a high-control
          administration panel into one connected ticketing experience.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#architecture">Trace the system <span>↓</span></a>
          <button class="text-button" type="button" data-open-gallery="home_pwa.png">View PWA home
            <span>↗</span></button>
        </div>
        <div class="hero-notes"><span>Role-based</span><i></i><span>API powered</span><i></i><span>Mobile-first</span>
        </div>
      </div>

      <div class="hero-visual reveal" aria-label="Interactive model of the AWIN system">
        <div class="scene">
          <div class="orbit orbit-a"><span></span><b>CLIENT</b></div>
          <div class="orbit orbit-b"><span></span><b>CONTROL</b></div>
          <div class="orbit orbit-c"><span></span><b>SIGNAL</b></div>
          <div class="api-core"><span class="core-echo"></span><strong>API</strong><small>secure data bridge</small>
          </div>
          <div class="float-card f-website"><span class="tiny-icon">◈</span><b>Website</b><small>CMS-driven</small>
          </div>
          <div class="float-card f-pwa"><span class="tiny-icon">▣</span><b>PWA</b><small>play anywhere</small></div>
          <div class="float-card f-admin"><span class="tiny-icon">◒</span><b>Admin</b><small>control plane</small></div>
          <svg class="scene-lines" viewBox="0 0 600 540" preserveAspectRatio="none" aria-hidden="true">
            <path d="M296 250 C180 150,160 185,114 157" />
            <path d="M314 278 C467 342,478 371,490 395" />
            <path d="M326 244 C441 139,451 161,494 145" />
            <circle cx="114" cy="157" r="5" />
            <circle cx="490" cy="395" r="5" />
            <circle cx="494" cy="145" r="5" />
          </svg>
        </div>
      </div>

      <div class="hero-footer reveal">
        <div><span class="metric-value">03</span><span class="metric-label">Connected surfaces</span></div>
        <div><span class="metric-value">35+</span><span class="metric-label">PWA experience states</span></div>
        <div><span class="metric-value">26+</span><span class="metric-label">Admin command views</span></div>
        <div><span class="metric-value">01</span><span class="metric-label">Secure API spine</span></div>
      </div>
      <a href="#story" class="scroll-line" aria-label="Scroll to project story"><span>SCROLL TO
          EXPLORE</span><i></i></a>
    </section>

    <section id="story" class="story section-shell">
      <div class="section-intro reveal">
        <p class="eyebrow">01 / PROJECT BRIEF</p>
        <h2>A single source of truth, made <span>human.</span></h2>
      </div>
      <div class="story-layout">
        <article class="statement-panel reveal">
          <span class="panel-index">01</span>
          <p class="statement">“How can a complete lottery operation feel as immediate for a player as it is deliberate
            for the team behind it?”</p>
          <div class="statement-line"></div>
          <p class="muted">The brief demanded far more than a dashboard. AWIN needed to make high-stakes
            actions—top-ups, ticket selection, result verification and withdrawals—easy to understand while preserving
            operational control.</p>
        </article>
        <article class="case-facts reveal">
          <div class="fact-label">THE RESPONSE</div>
          <h3>A decentralized, API-first product ecosystem.</h3>
          <p>The public site acquires visitors, the PWA turns engagement into action, and the admin panel governs
            finance, inventory and outcomes. Each surface is focused; all are connected.</p>
          <div class="fact-grid">
            <div><strong>Core PHP</strong><span>Modular backend</span></div>
            <div><strong>MySQL</strong><span>Relational data</span></div>
            <div><strong>REST</strong><span>Secure exchange</span></div>
            <div><strong>Bootstrap 5</strong><span>Admin foundation</span></div>
          </div>
        </article>
      </div>
      <div class="outcome-bar reveal">
        <span class="outcome-kicker">Design direction</span>
        <p>Make a complex transactional platform feel <b>visual, traceable and confidence-building</b> at every decision
          point.</p>
        <span class="arrow-mark">↘</span>
      </div>
    </section>

    <section id="architecture" class="architecture section-shell">
      <div class="section-intro intro-split reveal">
        <div>
          <p class="eyebrow">02 / SYSTEM ARCHITECTURE</p>
          <h2>Follow the <span>signal.</span></h2>
        </div>
        <p class="intro-detail">A crawl-tree model reveals how live data travels—from acquisition and authentication to
          ticket validation, result publication, and notification delivery.</p>
      </div>

      <div class="architecture-controls reveal" role="tablist" aria-label="System flow selector">
        <button class="flow-tab active" type="button" data-flow="journey" role="tab"
          aria-selected="true"><span>01</span> Customer journey</button>
        <button class="flow-tab" type="button" data-flow="governance" role="tab" aria-selected="false"><span>02</span>
          Governance loop</button>
        <button class="flow-tab" type="button" data-flow="signal" role="tab" aria-selected="false"><span>03</span>
          Notification signal</button>
      </div>

      <div class="tree-stage reveal" data-flow="journey">
        <div class="tree-bg-grid" aria-hidden="true"></div>
        <div class="tree-caption"><span class="tree-caption-dot"></span><span id="flow-label">ACQUISITION → PLAY →
            PROOF</span></div>
        <svg class="tree-lines" viewBox="0 0 1200 640" preserveAspectRatio="none" aria-hidden="true">
          <path class="line l-website" d="M175 155 C300 155 360 225 484 285" />
          <path class="line l-admin" d="M1027 150 C896 150 820 225 715 286" />
          <path class="line l-pwa" d="M715 352 C830 420 891 461 1028 477" />
          <path class="line l-message" d="M704 333 C592 397 453 465 185 477" />
          <path class="line l-web-pwa" d="M180 174 C141 280 145 359 180 456" />
          <path class="line l-control" d="M716 310 C839 278 906 255 1027 255" />
          <circle class="node-dot d-website" cx="175" cy="155" r="7" />
          <circle class="node-dot d-admin" cx="1027" cy="150" r="7" />
          <circle class="node-dot d-pwa" cx="1028" cy="477" r="7" />
          <circle class="node-dot d-message" cx="185" cy="477" r="7" />
        </svg>
        <button class="tree-node website-node"
          data-open-gallery="Landing_Website.png"><i>◈</i><span>01</span><strong>Public
            website</strong><small>CMS-powered acquisition</small></button>
        <button class="tree-node admin-node" data-open-gallery="Deshbord.png"><i>◒</i><span>03</span><strong>Admin
            command</strong><small>Control, financial review & CMS</small></button>
        <button class="tree-node pwa-node" data-open-gallery="home_pwa.png"><i>▣</i><span>02</span><strong>User
            PWA</strong><small>Wallet, tickets & verification</small></button>
        <button class="tree-node msg-node"
          data-open-gallery="arohidraw.com_whatsapp_vps.png"><i>✦</i><span>04</span><strong>Omnichannel</strong><small>Email,
            SMS & WhatsApp</small></button>
        <button class="tree-node admin-logic-node"
          data-open-gallery="Prediction_winner_list_admin.png"><i>⌁</i><strong>Winner engine</strong><small>Manual /
            Cron resolution</small></button>
        <div class="bridge-node"><span class="bridge-ping"></span>
          <div class="bridge-symbol">↯</div><b>SECURE API BRIDGE</b><small>Token-validated JSON routes</small>
        </div>
        <div class="flow-annotation" id="flow-annotation"><b>Landing → Live data</b><span>Hero content and package
            previews are supplied by the admin-managed CMS.</span></div>
      </div>

      <div class="architecture-foot reveal">
        <p><span>Why it matters</span> Decoupling the client experience from the core database reduces exposure, limits
          server load, and makes scaling a surface—not the whole product—possible.</p>
        <a href="#system">See implementation details <span>→</span></a>
      </div>
    </section>

    <section id="experience" class="experience section-shell">
      <div class="section-intro reveal">
        <p class="eyebrow">03 / EXPERIENCE DESIGN</p>
        <h2>From uncertainty to <span>one clear next step.</span></h2>
      </div>
      <div class="surface-grid">
        <article class="surface-card web-surface reveal">
          <div class="surface-topline"><span>PUBLIC SITE</span><span>01 / 03</span></div>
          <div class="web-shot frame"><img loading="lazy" src="assets/Landing_Website.png"
              alt="AWIN public website landing page" /></div>
          <div class="surface-copy">
            <h3>The acquisition layer</h3>
            <p>A live, CMS-fed landing experience introduces the product through current campaigns, package previews and
              direct entry points into the ecosystem.</p><button data-open-gallery="Landing_Website.png">Open surface
              <span>↗</span></button>
          </div>
        </article>
        <article class="surface-card pwa-surface reveal">
          <div class="surface-topline"><span>PLAYER PWA</span><span>02 / 03</span></div>
          <div class="phone-stage">
            <div class="phone-shadow"></div>
            <div class="phone-frame">
              <div class="phone-speaker"></div><img id="pwaSpotlight" src="assets/home_pwa.png"
                alt="AWIN mobile PWA interface" />
            </div>
            <div class="floating-chip chip-a"><span>✓</span> API validated</div>
            <div class="floating-chip chip-b"><span>↯</span> Mobile-first</div>
          </div>
          <div class="surface-copy">
            <h3>An app-like ticket flow</h3>
            <p>A touch-first PWA makes account balances, package discovery, number selection and post-purchase proof
              feel immediate and understandable.</p><button data-open-gallery="home_pwa.png">Open PWA flow
              <span>↗</span></button>
          </div>
        </article>
        <article class="surface-card admin-surface reveal">
          <div class="surface-topline"><span>CONTROL PLANE</span><span>03 / 03</span></div>
          <div class="admin-shot frame"><img loading="lazy" src="assets/Deshbord.png" alt="AWIN Admin dashboard" />
          </div>
          <div class="surface-copy">
            <h3>Operational confidence</h3>
            <p>The admin interface handles financial approvals, inventory, result publishing, merchant access and
              real-time notification oversight from a single command center.</p><button
              data-open-gallery="Deshbord.png">Open control plane <span>↗</span></button>
          </div>
        </article>
      </div>

      <div class="interaction-lab reveal">
        <div class="lab-copy">
          <p class="eyebrow">THE CORE PWA LOOP</p>
          <h3>Every choice gets a <em>visible response.</em></h3>
          <p id="loopDescription">Live packages present the cost, draw window and prize logic before a player commits.
          </p>
          <div class="loop-steps" role="tablist" aria-label="PWA flow">
            <button class="loop-step active" type="button" data-screen="regular_pakage_pwa.png"
              data-title="Discover packages"
              data-description="Live packages present the cost, draw window and prize logic before a player commits."><span>01</span>
              Discover</button>
            <button class="loop-step" type="button" data-screen="1_to_5_pakage_details_pwa.png"
              data-title="Choose numbers"
              data-description="Purpose-built selection panels enforce the package rules visually, turning constraints into a straightforward interaction."><span>02</span>
              Select</button>
            <button class="loop-step" type="button" data-screen="tickets_checkout_pwa.png"
              data-title="Confirm the purchase"
              data-description="Checkout validates wallet balance and the cart through the API before the system records the ticket."><span>03</span>
              Confirm</button>
            <button class="loop-step" type="button" data-screen="public_tracking_link_pwa.png"
              data-title="Share or verify"
              data-description="A public tracking record and QR proof make a completed transaction easy to check beyond the account itself."><span>04</span>
              Prove</button>
          </div>
        </div>
        <div class="lab-screen">
          <div class="screen-label"><span id="loopNumber">01</span><b id="loopTitle">Discover packages</b></div>
          <div class="device-crop"><img id="loopScreen" src="assets/regular_pakage_pwa.png"
              alt="PWA package discovery screen" /></div><button class="inspect-button" type="button"
            id="inspectLoop">Inspect screen ↗</button>
        </div>
      </div>
    </section>

    <section class="flows section-shell">
      <div class="section-intro intro-split reveal">
        <div>
          <p class="eyebrow">04 / WORKFLOWS</p>
          <h2>Designed for <span>movement,</span> not menus.</h2>
        </div>
        <p class="intro-detail">The product behaves as a connected series of confidence moments. The system makes the
          status of money, tickets and outcomes easy to read.</p>
      </div>
      <div class="flow-rail reveal">
        <article class="flow-card flow-one"><span class="flow-number">01</span>
          <div class="flow-icon">⌁</div>
          <h3>Fund</h3>
          <p>Users submit a top-up with a transaction ID and payment proof. Admin sees a clean review queue.</p><button
            data-open-gallery="top_up_page_pwa.png">Top-up flow <span>↗</span></button>
        </article>
        <article class="flow-card flow-two"><span class="flow-number">02</span>
          <div class="flow-icon">◎</div>
          <h3>Play</h3>
          <p>Packages guide selection limits, ticket quantity and segments before an API-validated checkout.</p><button
            data-open-gallery="tickets_checkout_pwa.png">Purchase flow <span>↗</span></button>
        </article>
        <article class="flow-card flow-three"><span class="flow-number">03</span>
          <div class="flow-icon">✦</div>
          <h3>Resolve</h3>
          <p>Admins set or schedule outcomes; the winner engine groups matching ticket sequences for review.</p><button
            data-open-gallery="Prediction_winner_list_admin.png">Winner workflow <span>↗</span></button>
        </article>
        <article class="flow-card flow-four"><span class="flow-number">04</span>
          <div class="flow-icon">↗</div>
          <h3>Notify</h3>
          <p>Results and receipts travel to the customer through Email, SMS or WhatsApp with delivery history.</p>
          <button data-open-gallery="arohidraw.com_whatsapp_vps (1).png">Delivery system <span>↗</span></button>
        </article>
      </div>
    </section>

    <section id="system" class="system section-shell">
      <div class="section-intro reveal">
        <p class="eyebrow">05 / PRODUCT SYSTEM</p>
        <h2>Complex capabilities. <span>Simple mental models.</span></h2>
      </div>
      <div class="system-layout">
        <div class="capability-list reveal" id="capabilityList">
          <button class="capability active" type="button" data-image="pakage_details_pwa.png"
            data-eyebrow="PWA / TICKET LOGIC" data-title="Advanced ticketing"
            data-body="Standard and EXP package flows make limits, segment rules, prices and expiration windows understandable before payment."><span>01</span><b>Advanced
              ticketing</b><i>↗</i></button>
          <button class="capability" type="button" data-image="top_up_history_pwa.png" data-eyebrow="PWA / WALLET"
            data-title="Wallet operations"
            data-body="A single account view links top-ups, balance movement, withdrawals and conversions to easy-to-read status records."><span>02</span><b>Wallet
              operations</b><i>↗</i></button>
          <button class="capability" type="button" data-image="Prediction_winner_list_admin.png"
            data-eyebrow="ADMIN / OUTCOME ENGINE" data-title="Algorithmic resolution"
            data-body="Manual and Cron-ready control enables a team to evaluate matching sequences and publish trusted results."><span>03</span><b>Algorithmic
              resolution</b><i>↗</i></button>
          <button class="capability" type="button" data-image="Scan_qr_check_result_pwa.png"
            data-eyebrow="PWA / VERIFICATION" data-title="Proof in the real world"
            data-body="HTML5 QR scanning and public tracking make digital or printed ticket checks quick, visual and accessible."><span>04</span><b>QR
              verification</b><i>↗</i></button>
          <button class="capability" type="button" data-image="arohidraw.com_whatsapp_vps.png"
            data-eyebrow="ADMIN / COMMUNICATION" data-title="Omnichannel awareness"
            data-body="WhatsApp, SMS and email templates work from one logged communication framework rather than disconnected manual actions."><span>05</span><b>Omnichannel
              notifications</b><i>↗</i></button>
          <button class="capability" type="button" data-image="website_castomizer_admin.png"
            data-eyebrow="ADMIN / CONTENT" data-title="CMS without friction"
            data-body="Campaign art, public copy and visible packages are actively governed from the administration panel through a headless-style content bridge."><span>06</span><b>Dynamic
              content control</b><i>↗</i></button>
        </div>
        <div class="capability-spotlight reveal">
          <div class="spotlight-meta"><span id="capEyebrow">PWA / TICKET LOGIC</span><button type="button"
              id="capOpen">Fullscreen ↗</button></div>
          <div class="spotlight-image pwa-display" id="capSpotlight" data-surface="pwa">
            <div class="device-shell pwa-device" id="capDevice"><span class="device-topbar"
                aria-hidden="true"></span><img id="capImage" src="assets/pakage_details_pwa.png"
                alt="AWIN feature screen" /></div>
          </div>
          <div class="spotlight-copy">
            <h3 id="capTitle">Advanced ticketing</h3>
            <p id="capBody">Standard and EXP package flows make limits, segment rules, prices and expiration windows
              understandable before payment.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="trust section-shell">
      <div class="trust-copy reveal">
        <p class="eyebrow">06 / ENGINEERING DECISIONS</p>
        <h2>Trust is not a screen. It is the <span>system underneath.</span></h2>
        <p>AWIN keeps database access off the client. Token-validated API routes carry only the necessary data between
          the mobile app, public site and administrative command center.</p>
      </div>
      <div class="trust-diagram reveal">
        <div class="security-ring ring-one"></div>
        <div class="security-ring ring-two"></div>
        <div class="security-core"><span>API</span><small>VALIDATE</small></div>
        <div class="security-chip chip-lock"><i>⌾</i><b>Role-based access</b><small>Admins · merchants · users</small>
        </div>
        <div class="security-chip chip-token"><i>⌘</i><b>Token validation</b><small>Cross-domain transfer</small></div>
        <div class="security-chip chip-db"><i>▤</i><b>No client DB</b><small>Reduced exposure</small></div>
      </div>
      <div class="tech-ribbon reveal"><span>CORE PHP</span><span>MYSQL</span><span>REST API</span><span>VANILLA
          JS</span><span>FETCH()</span><span>PHPMAILER</span><span>HTML5-QR
          CODE</span><span>PDFMAKE</span><span>DATATABLES</span></div>
    </section>

    <section id="gallery" class="gallery section-shell">
      <div class="gallery-head reveal">
        <div>
          <p class="eyebrow">07 / DOCUMENTED BUILD</p>
          <h2>Every screen has a <span>role.</span></h2>
        </div>
        <p>Explore the complete set of reference screens from the connected AWIN build. Each frame maps to a distinct
          workflow, control point or interface state.</p>
      </div>
      <div class="gallery-tools reveal">
        <div class="gallery-filters" role="tablist" aria-label="Screen galleries"><button class="gallery-filter active"
            type="button" data-filter="all">All screens <span id="allCount">62</span></button><button
            class="gallery-filter" type="button" data-filter="pwa">PWA <span id="pwaCount">35</span></button><button
            class="gallery-filter" type="button" data-filter="admin">Admin <span
              id="adminCount">26</span></button><button class="gallery-filter" type="button"
            data-filter="website">Website <span id="websiteCount">1</span></button></div><label
          class="search-wrap"><span>⌕</span><input id="gallerySearch" type="search"
            placeholder="Find a workflow or screen" aria-label="Search screen gallery" /></label>
      </div>
      <div class="screen-gallery reveal" id="screenGallery" aria-live="polite"></div>
      <button class="load-more" type="button" id="loadMore">Load more screens <span>↓</span></button>
    </section>

    <section id="faq" class="seo-faq section-shell" aria-labelledby="faq-title">
      <div class="section-intro intro-split reveal">
        <div>
          <p class="eyebrow">08 / PRODUCT FAQ</p>
          <h2 id="faq-title">The system, <span>made clear.</span></h2>
        </div>
        <p class="intro-detail">Quick answers for visitors, recruiters and product teams evaluating the AWIN case study.
        </p>
      </div>
      <div class="faq-list reveal">
        <details open>
          <summary><span>01</span><b>What is AWIN?</b><i>+</i></summary>
          <p>AWIN is a connected lottery ecosystem that combines a public website, a mobile-first PWA and an
            administrative command center through secure API routes.</p>
        </details>
        <details>
          <summary><span>02</span><b>How does the AWIN PWA work?</b><i>+</i></summary>
          <p>The PWA uses API-driven flows for wallet management, package discovery, number selection, ticket
            purchasing, QR scanning and result verification—without exposing a direct database connection to the client.
          </p>
        </details>
        <details>
          <summary><span>03</span><b>What does the admin dashboard manage?</b><i>+</i></summary>
          <p>The admin control plane manages users, merchants, package inventory, financial approvals, winner
            resolution, public website content and omnichannel notification delivery.</p>
        </details>
        <details>
          <summary><span>04</span><b>Why use a standalone API architecture?</b><i>+</i></summary>
          <p>Decoupling the customer-facing surfaces from the database improves scalability, reduces public exposure and
            enables each product surface to request only the data it needs.</p>
        </details>
      </div>
    </section>

    <section class="conclusion section-shell">
      <div class="conclusion-grid reveal">
        <p class="eyebrow">CASE STUDY / CONCLUSION</p>
        <h2>A connected product can still feel <em>lightweight.</em></h2>
        <div>
          <p>AWIN proves that a complex operational system does not need a complicated customer experience. A clear API
            boundary, intentional mobile patterns and an operator-grade control plane make the ecosystem faster to
            use—and easier to trust.</p><a class="button button-primary" href="#top">Back to top <span>↑</span></a>
        </div>
      </div>
    </section>

    <section id="live-project" class="live-project section-shell">
      <div class="live-project-panel reveal">
        <div class="live-orb orb-left" aria-hidden="true"></div>
        <div class="live-orb orb-right" aria-hidden="true"></div>
        <div class="live-copy">
          <p class="eyebrow"><span class="pulse-dot"></span> READY TO EXPLORE</p>
          <h2>See the system <span>in motion.</span></h2>
          <p>From the first campaign impression to verified ticket proof, AWIN is designed as one connected experience
            across the web, PWA and operator control plane.</p>
          <div class="live-actions">
            <a class="button button-primary live-link" href="https://luckywinuk.com" target="_blank"
              rel="noopener noreferrer">Visit live project <span>↗</span></a>
            <span class="live-hint"><i></i> External project link</span>
          </div>
          <div class="surface-status"><span><b>01</b> Public website</span><span><b>02</b> Mobile
              PWA</span><span><b>03</b> Admin core</span></div>
        </div>
        <div class="live-visual" aria-label="Three dimensional preview of the AWIN live landing page">
          <div class="project-halo"></div>
          <div class="browser-card">
            <div class="browser-bar"><i></i><i></i><i></i><span>luckywinuk.com</span><b>↗</b></div>
            <img loading="lazy" src="assets/Landing_Website.png" alt="AWIN live public website preview" />
          </div>
          <div class="live-float float-live"><span>●</span> LIVE DATA</div>
          <div class="live-float float-api">API <b>↯</b></div>
          <div class="floor-grid"></div>
        </div>
      </div>
    </section>
  </main>

  <aside class="floating-actions" aria-label="Quick actions">
    <!-- Placeholder portfolio and WhatsApp destinations: replace these URLs with your final links. -->
    <a class="floating-action floating-portfolio" href="http://sazzad.wedevspro.com/" target="_blank"
      rel="noopener noreferrer" aria-label="Back to portfolio">
      <span class="floating-icon">◫</span><b>Portfolio</b><i>↗</i>
    </a>
    <a class="floating-action floating-contact" href="https://wa.me/8801877856951" target="_blank"
      rel="noopener noreferrer" aria-label="Contact on WhatsApp">
      <span class="floating-icon">◌</span><b>Contact</b><i>↗</i>
    </a>
  </aside>

  <footer class="site-footer">
    <div class="footer-brand"><span class="brand-mark"><i></i><i></i><i></i></span><b>AWIN</b><span>Connected lottery
        ecosystem</span></div>
    <p>Case study assembled from the AWIN product interface and workflow documentation.</p><a href="#top">↑ Top</a>
  </footer>

  <dialog class="image-modal" id="imageModal" aria-label="Screen preview"><button class="modal-close" type="button"
      aria-label="Close preview">×</button>
    <div class="modal-body">
      <div class="modal-image-wrap"><img id="modalImage" src="" alt="" /></div>
      <div class="modal-copy">
        <p class="eyebrow" id="modalType">PWA / SCREEN</p>
        <h3 id="modalTitle">Screen title</h3>
        <p id="modalDescription">Screen description</p>
        <div class="modal-route" id="modalRoute">pwa/index.php</div>
      </div>
    </div>
  </dialog>

  <script src="app.js"></script>
</body>

</html>