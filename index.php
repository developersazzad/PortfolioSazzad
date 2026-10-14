<?php
    include("head.php");
?>


<body class="antialiased">

  <!-- ============================================================
     NAV
     ============================================================ -->
  <header id="site-header" class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    style="background:transparent; border-bottom:1px solid transparent;">
    <div class="wrap flex items-center justify-between h-16">
      <a href="#top" class="brand-logo">
        Sazzad<span class="brand-dot">.</span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm" aria-label="Main Navigation" style="color:var(--text-muted)">
        <a href="#about" class="nav-link">About</a>
        <a href="#work" class="nav-link">Work</a>
        <a href="#stack" class="nav-link">Stack</a>
        <a href="#experience" class="nav-link">Experience</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
      <div class="hidden md:flex items-center gap-3">
        <a href="https://github.com/developersazzad" target="_blank" rel="noopener" class="nav-gh-link" aria-label="GitHub" title="View GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="#contact" class="btn btn-primary">Let's Connect</a>
      </div>
      <!-- Hamburger Button (Candy Box) -->
      <button id="menu-btn" class="nav-toggle md:hidden p-2 -mr-2 z-[60] relative" aria-expanded="false" aria-controls="mobile-panel" aria-label="Toggle menu">
        <div class="hamburger-icon">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>
      </button>
    </div>
  </header>

  <!-- Mobile Menu Fullscreen Overlay -->
  <div id="mobile-panel" class="mobile-menu-overlay" aria-hidden="true" inert>
    <div class="mobile-menu-inner">
      <div class="mobile-menu-header">
        <a href="#top" class="brand-logo mobile-close-link">
          Sazzad<span class="brand-dot">.</span>
        </a>
        <button class="mobile-close-btn" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <nav class="mobile-menu-links" aria-label="Mobile Navigation">
        <a href="#about" class="mobile-link">About</a>
        <a href="#work" class="mobile-link">Work</a>
        <a href="#stack" class="mobile-link">Stack</a>
        <a href="#experience" class="mobile-link">Experience</a>
        <a href="#contact" class="mobile-link">Contact</a>
      </nav>
    </div>
  </div>

  <main id="main" tabindex="-1"><a id="top" style="position:absolute;top:0;" aria-hidden="true"></a>

    <!-- ============================================================
     HERO
     ============================================================ -->
    <section class="hero-section relative">
      <!-- Dot-grid background -->
      <div class="absolute inset-0 dot-grid pointer-events-none"></div>

      <!-- Main accent glow blob -->
      <div class="hero-glow-blob pointer-events-none"></div>

      <!-- 2-column grid -->
      <div class="wrap hero-wrap">

        <!-- LEFT: Text content -->
        <div class="hero-left">
          <p class="hero-label reveal" style="animation-delay:.05s;">
            <span class="hero-label-dot"></span>sazzad@devfolio:~$ whoami<span class="caret carets"></span>
          </p>

          <h1 class="hero-heading reveal" style="animation-delay:.15s;">
            Sazzad <span class="hero-heading-accent">Hossain</span>
          </h1>

          <p id="role-line" class="hero-role reveal" style="animation-delay:.25s;">Full-Stack Web Developer, UI/UX Designer & Engineer</p>

          <p class="hero-desc reveal" style="animation-delay:.35s;">
            I build production-focused web applications and business systems — frontend,
            backend, APIs, databases, integrations and deployment, end to end.
            Real requirements, turned into software that holds up after launch.
          </p>

          <!-- CTA row -->
          <div class="hero-cta reveal" style="animation-delay:.45s;">
            <a href="#work" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:7px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> My Work</a>
            <a href="assets/cv/developer_sazzad.pdf" download class="btn btn-ghost" style="display:inline-flex;align-items:center;gap:7px;" aria-label="Download CV" title="Download CV">
              Download CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </a>
            <a href="https://github.com/developersazzad" target="_blank" rel="noopener" class="btn btn-ghost btn-icon" aria-label="GitHub" title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/developer-sazzad" target="_blank" rel="noopener" class="btn btn-ghost btn-icon" aria-label="LinkedIn" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>

        <!-- RIGHT: Photo + floating 3D badges -->
        <div id="hero-right-container" class="reveal" style="animation-delay:.2s;">
          <div class="hero-photo-wrap" id="hero-tilt">

            <!-- Animated ring glow behind photo -->
            <div class="hero-ring-glow"></div>

            <!-- Globe SVG (decorative) -->
            <svg id="globe-svg" class="hero-globe" viewBox="0 0 460 460" aria-hidden="true"></svg>

            <!-- Photo -->
            <div class="hero-photo-mask">
              <img decoding="sync" src="assets/img/sazzad.webp" width="400" height="400"
                alt="Sazzad Hossain — Full-Stack Developer"
                fetchpriority="high"
                loading="eager"
              >
            </div>

            <!-- Floating badge 1: Full-Stack Development (top-left) -->
            <div class="hero-float-badge badge-tl">
              <div class="badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <span>Full-Stack Development</span>
            </div>

            <!-- Floating badge 2: API & Integration (mid-right) -->
            <div class="hero-float-badge badge-mr">
              <div class="badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <span>API &amp; Integration</span>
            </div>

            <!-- Floating badge 3: Database Design (bottom-left) -->
            <div class="hero-float-badge badge-bl">
              <div class="badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>
              </div>
              <span>Database Design</span>
            </div>


          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
     STATS SECTION
     ============================================================ -->
    <section class="stats-section">
      <div class="wrap">
        <div class="stats-grid">

          <div class="stats-item">
            <div class="stats-icon stats-icon--code">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <div class="stats-body">
              <span class="stats-num">120+</span>
              <p class="stats-title">Projects Completed</p>
              <p class="stats-sub">Across industries</p>
            </div>
          </div>

          <div class="stats-item">
            <div class="stats-icon stats-icon--people">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="stats-body">
              <span class="stats-num">7+</span>
              <p class="stats-title">Years Experience</p>
              <p class="stats-sub">Building solutions</p>
            </div>
          </div>

          <div class="stats-item">
            <div class="stats-icon stats-icon--bolt">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div class="stats-body">
              <span class="stats-num">10x</span>
              <p class="stats-title">Performance Boost</p>
              <p class="stats-sub">For key systems</p>
            </div>
          </div>

          <div class="stats-item">
            <div class="stats-icon stats-icon--check">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="stats-body">
              <span class="stats-num">100%</span>
              <p class="stats-title">Client Satisfaction</p>
              <p class="stats-sub">Quality is priority</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="work" class="py-20 md:py-28 relative overflow-hidden">
      <div class="absolute -left-32 bottom-0 w-[420px] h-[420px] glow-blob pointer-events-none"></div>
      <div class="wrap relative">
        <h2 class="font-display text-3xl sm:text-4xl font-semibold">Featured Work</h2>
        <p class="mt-2 max-w-xl" style="color:var(--text-muted);">A selection of platforms I've built and kept running —
          from business systems to digital learning environments.</p>

                <div class="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          <button class="work-tab-btn work-tab-active" data-tab="All" role="tab" aria-selected="true">All</button>
          <button class="work-tab-btn" data-tab="Wordpress & CMS" role="tab" aria-selected="false">Wordpress & CMS</button>
          <button class="work-tab-btn" data-tab="Php & laravel" role="tab" aria-selected="false">Php & laravel</button>
          <button class="work-tab-btn" data-tab="React and Next js" role="tab" aria-selected="false">React and Next js</button>
          <button class="work-tab-btn" data-tab="Javascript & Vanila js" role="tab" aria-selected="false">Javascript & Vanila js</button>
          <button class="work-tab-btn" data-tab=".Net" role="tab" aria-selected="false">.Net</button>
          <button class="work-tab-btn" data-tab="HtmlCssJs" role="tab" aria-selected="false">HtmlCssJs</button>
          <button class="work-tab-btn" data-tab="LMS" role="tab" aria-selected="false">LMS</button>
        </div>

        <div id="projects-grid" class="grid md:grid-cols-2 gap-5 mt-8"></div>
        <div id="projects-grid-more" class="grid md:grid-cols-2 gap-5 mt-5 hidden"></div>

        <div class="mt-10 flex justify-center">
          <button id="view-all-btn" class="btn btn-ghost">View All Projects</button>
        </div>
      </div>
    </section>

    <!-- ============================================================
     SNAPSHOT / CAPABILITIES
     ============================================================ -->
    <section class="py-16">
      <div class="wrap">
        <div id="capabilities-grid" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
      </div>
    </section>


    <!-- ============================================================
     ABOUT
     ============================================================ -->
    <section id="about" class="py-20 md:py-28 relative overflow-hidden">
      <div class="absolute -right-24 top-1/3 w-[380px] h-[380px] glow-blob pointer-events-none"></div>
      <div class="wrap relative grid md:grid-cols-[0.8fr,1.2fr] gap-14 items-center">

        <div class="relative mx-auto md:mx-0">
          <div class="absolute -bottom-4 -right-4 w-full h-full rounded-2xl"
            style="background:linear-gradient(135deg, var(--accent) 0%, transparent 75%); opacity:.28;"></div>
          <div class="about-photo-frame relative rounded-2xl overflow-hidden border"
            style="border-color:var(--border-strong);">
            <img src="assets/img/sazzad_jpg.jpg" alt="Sazzad Hossain portrait" class="w-full">
          </div>

        </div>

        <div>
          <h2 class="font-display text-3xl sm:text-4xl font-semibold">About Me</h2>

          <div class="mt-6 space-y-4 text-base leading-relaxed" style="color:var(--text-muted);">
            <p>I'm a full-stack web developer with a practical, project-driven approach to technology. Over the years
              I've worked across websites, e-commerce platforms, custom web applications, learning systems and
              integrated business platforms.</p>
            <p>My experience goes beyond writing code — understanding requirements, planning solutions, working directly
              with clients, integrating third-party services, managing hosting and deployment, and maintaining systems
              that are already live.</p>
          </div>

          <div class="relative quote-block pl-5 mt-8 py-1">
            <span class="absolute font-display select-none pointer-events-none"
              style="top:-1.4rem; left:-.25rem; font-size:4rem; color:var(--accent); opacity:.18; line-height:1;">"</span>
            <p class="relative text-lg leading-relaxed" style="color:var(--text);">
              I like working where technology meets real business needs — where a website isn't just software, but a
              tool that has to work reliably for actual people.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- ============================================================
     TECH STACK
     ============================================================ -->
    <section id="stack" class="py-20 md:py-28 relative overflow-hidden">
      <div class="absolute inset-0 pattern-lines pointer-events-none"></div>
      <div class="wrap relative">
        <div class="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h2 class="font-display text-3xl sm:text-4xl font-semibold">Technical Stack</h2>
            <p class="mt-2" style="color:var(--text-muted);">Branched by how deep the experience runs — not a wall of
              logos.</p>
          </div>
          <div class="flex flex-wrap gap-4 text-xs font-mono" style="color:var(--text-faint);">
            <span class="flex items-center gap-2"><span class="chip-dot dot-core"></span>Core experience</span>
            <span class="flex items-center gap-2"><span class="chip-dot dot-growing"></span>Working / growing</span>
            <span class="flex items-center gap-2"><span class="chip-dot dot-expanding"></span>Expanding</span>
          </div>
        </div>

        <div id="stack-tree" class="stack-tree"></div>
      </div>
    </section>

    <!-- ============================================================
     TESTIMONIALS (Ref 5 style)
     ============================================================ -->
    <section class="testi-section py-20 relative overflow-hidden">
      <!-- 3D particle canvas — decorative, aria-hidden, lazy-loaded by JS -->
      <canvas id="testi-canvas" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.55;"></canvas>

      <!-- Radial glow -->
      <div class="testi-glow" aria-hidden="true"></div>

      <div class="wrap relative" style="z-index:1;">
        <!-- Header -->
        <div class="text-center mb-10">
          <p class="font-mono text-xs uppercase tracking-widest mb-3 flex items-center justify-center gap-2" style="color:var(--accent); letter-spacing:0.18em;">
            <span style="display:inline-block;width:32px;height:1px;background:var(--accent);opacity:.6;"></span>
            TESTIMONIALS
          </p>
          <h2 class="font-display text-3xl sm:text-4xl font-semibold">What <span style="color:var(--accent);">clients say</span></h2>
        </div>

        <!-- Slider wrapper -->
        <div style="position:relative; max-width:1140px; margin:0 auto; padding:0 56px;">
          <!-- Prev button -->
          <button id="testi-prev" class="testi-nav-btn testi-nav-prev" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- Track -->
          <div class="testi-track" id="testi-track">
            <!-- Cards injected by JS -->
          </div>

          <!-- Next button -->
          <button id="testi-next" class="testi-nav-btn testi-nav-next" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- Bottom: avatar stack + dots -->
        <div class="wrap mt-6 flex justify-center items-center gap-8">
          <div class="testi-dot-indicator" id="testi-dots"></div>
        </div>
      </div>
    </section>


    <!-- ============================================================
     FEATURED PROJECTS
     ============================================================ -->


    <!-- ============================================================
     CASE STUDY MODAL
     ============================================================ -->
    <div id="case-modal" class="fixed inset-0 z-[100] hidden" aria-hidden="true">
      <div id="case-modal-backdrop" class="absolute inset-0"
        style="background:rgba(5,5,8,0.78); backdrop-filter:blur(5px);"></div>
      <div class="relative h-full flex items-center justify-center p-3 sm:p-8">
        <div id="case-modal-panel" class="surface rounded-xl w-full max-w-2xl relative flex flex-col"
          style="max-height:88vh;" role="dialog" aria-modal="true" aria-labelledby="case-modal-title">
          <button id="case-modal-close"
            class="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 p-2 rounded-full surface-2"
            aria-label="Close case study">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <div id="case-modal-body" class="overflow-y-auto p-6 sm:p-9 pt-14 sm:pt-16"></div>
        </div>
      </div>
    </div>

    <!-- ============================================================
     HOW I WORK � ENGINEERING APPROACH
     ============================================================ -->

    <section id="hiw" class="hiw py-20 md:py-28">
      <div class="wrap">
        <div class="hiw-grid">
          <!-- ── left rail (sticky on desktop) ── -->
          <div class="hiw-intro rv">
            <span class="hiw-eyebrow">// process</span>
            <h2>How I Work</h2>
            <p class="hiw-sub">I treat development as a full lifecycle, not just a coding task. Explore the tree — every branch is a phase, every leaf is a step.</p>

            <div class="hiw-toolbar">
              <button class="hiw-tbtn" data-expand-all type="button">[ + ] expand all</button>
              <button class="hiw-tbtn" data-collapse-all type="button">[ − ] collapse all</button>
            </div>

            <div class="hiw-progress" aria-live="polite">
              <div class="row"><span>EXPLORATION</span><b id="hiw-count">0 / 8 steps</b></div>
              <div class="hiw-bar"><i id="hiw-fill"></i></div>
            </div>

            <ul class="hiw-legend" aria-hidden="true">
              <li><span class="sym">▸</span> phase — tap to unfold its steps</li>
              <li><span class="sym">○</span> step — tap to read the detail leaf</li>
              <li><span class="sym">●</span> explored — fills lime once opened</li>
            </ul>

            <p class="hiw-hint">Open all eight leaves to <em>complete the lifecycle map</em>.</p>
          </div>

          <!-- ── the tree ── -->
          <div class="rv" style="transition-delay:.1s">
            <div class="hiw-term" aria-hidden="true">
              <span class="p-user">sazzad@studio</span>:<span class="p-path">~</span>$ <span class="cmd">./lifecycle</span> <span class="flag">--mode=full --care</span><span class="caret carets"></span><br/>
              <span class="done">✔ 8/8 steps explored — lifecycle mapped. let's build.</span>
            </div>
            <div class="hiw-rootlink" aria-hidden="true"></div>

            <ul class="hiw-tree branch" role="tree" aria-label="Development lifecycle">

              <!-- ▸ PHASE 1 · DISCOVER -->
              <li class="open" role="treeitem" aria-expanded="true">
                <button class="node" data-toggle type="button" aria-expanded="true" aria-label="Toggle folder">
                  <svg class="caret " viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                  <svg class="ph-ic" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                    <path class="f-closed" d="M1.5 4h5l1.6 2H15.5v8h-14z"/>
                    <path class="f-open" d="M1.5 4h5l1.4 1.8h7.6v1.7H4.2L2.6 14H1.5zM4.2 7.5h11.3L14 14H2.6z"/>
                  </svg>
                  <span class="ph-key">P1</span>
                  <span class="ph-name">Discover</span>
                  <span class="ph-meta">steps 01–02 · wk 01</span>
                </button>
                <div class="kids" role="group"><div class="kids-in">
                  <ul class="branch" role="group">

                    <li data-step="01" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-01" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">01</span>
                        <span class="st-name">Understand</span>
                        <span class="tag">discovery</span>
                      </button>
                      <div class="kids" id="leaf-01" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">Every engagement starts with listening. I map the business problem, the users and the constraints before a single line of code is written.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>Stakeholder &amp; user interviews</li>
                                <li>Goals + success metrics defined</li>
                                <li>Audit of existing code / systems</li>
                                <li>Constraints: budget, timeline, team</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>project brief</li><li>scope map</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">2–4 days</span></span>
                            <span><span class="k">output</span> <span class="v">shared understanding</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                    <li data-step="02" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-02" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">02</span>
                        <span class="st-name">Analyze</span>
                        <span class="tag">research</span>
                      </button>
                      <div class="kids" id="leaf-02" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">Research turns vague ideas into concrete requirements. I pressure-test assumptions and surface risks early — when they're cheap to fix.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>User &amp; market research</li>
                                <li>Data / domain modeling</li>
                                <li>Edge-case &amp; risk mapping</li>
                                <li>Feasibility checks on tech options</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>requirements doc</li><li>risk register</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">3–5 days</span></span>
                            <span><span class="k">output</span> <span class="v">validated requirements</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                  </ul>
                </div></div>
              </li>

              <!-- ▸ PHASE 2 · BLUEPRINT -->
              <li role="treeitem" aria-expanded="false">
                <button class="node" data-toggle type="button" aria-expanded="false" aria-label="Toggle folder">
                  <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                  <svg class="ph-ic" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                    <path class="f-closed" d="M1.5 4h5l1.6 2H15.5v8h-14z"/>
                    <path class="f-open" d="M1.5 4h5l1.4 1.8h7.6v1.7H4.2L2.6 14H1.5zM4.2 7.5h11.3L14 14H2.6z"/>
                  </svg>
                  <span class="ph-key">P2</span>
                  <span class="ph-name">Blueprint</span>
                  <span class="ph-meta">step 03 · wk 02</span>
                </button>
                <div class="kids" role="group"><div class="kids-in">
                  <ul class="branch" role="group">

                    <li data-step="03" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-03" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">03</span>
                        <span class="st-name">Plan</span>
                        <span class="tag">strategy</span>
                      </button>
                      <div class="kids" id="leaf-03" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">A good plan makes the build predictable. I define architecture, milestones and the definition of done — so we always know what "next" means.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>Architecture &amp; stack decisions</li>
                                <li>Milestones + sprint planning</li>
                                <li>Wireframes / technical spec</li>
                                <li>Task board with estimates</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>roadmap</li><li>spec</li><li>task board</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">~1 week</span></span>
                            <span><span class="k">output</span> <span class="v">a plan anyone can follow</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                  </ul>
                </div></div>
              </li>

              <!-- ▸ PHASE 3 · CONSTRUCT -->
              <li role="treeitem" aria-expanded="false">
                <button class="node" data-toggle type="button" aria-expanded="false" aria-label="Toggle folder">
                  <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                  <svg class="ph-ic" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                    <path class="f-closed" d="M1.5 4h5l1.6 2H15.5v8h-14z"/>
                    <path class="f-open" d="M1.5 4h5l1.4 1.8h7.6v1.7H4.2L2.6 14H1.5zM4.2 7.5h11.3L14 14H2.6z"/>
                  </svg>
                  <span class="ph-key">P3</span>
                  <span class="ph-name">Construct</span>
                  <span class="ph-meta">steps 04–06 · wk 03–06</span>
                </button>
                <div class="kids" role="group"><div class="kids-in">
                  <ul class="branch" role="group">

                    <li data-step="04" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-04" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">04</span>
                        <span class="st-name">Build</span>
                        <span class="tag">development</span>
                      </button>
                      <div class="kids" id="leaf-04" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">Focused, incremental development. Small commits, clean architecture and a demo every week — you see progress, not promises.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>Component-driven development</li>
                                <li>Weekly demo builds</li>
                                <li>Code reviews &amp; refactoring</li>
                                <li>Documentation written as I go</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>staging builds</li><li>feature branches</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">2–4 weeks</span></span>
                            <span><span class="k">output</span> <span class="v">working software, weekly</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                    <li data-step="05" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-05" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">05</span>
                        <span class="st-name">Integrate</span>
                        <span class="tag">ci/cd</span>
                      </button>
                      <div class="kids" id="leaf-05" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">Pieces become a product. APIs, payments, auth and third-party services — wired together behind a continuous-integration safety net.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>API &amp; third-party wiring</li>
                                <li>CI pipeline set up</li>
                                <li>Environments configured</li>
                                <li>Merge &amp; review discipline</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>green pipeline</li><li>integrated system</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">3–6 days</span></span>
                            <span><span class="k">output</span> <span class="v">one coherent system</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                    <li data-step="06" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-06" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">06</span>
                        <span class="st-name">Test</span>
                        <span class="tag">quality</span>
                      </button>
                      <div class="kids" id="leaf-06" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">Quality is a phase, not a hope. Automated suites plus hands-on QA across real devices before anything touches production.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>Unit &amp; integration tests</li>
                                <li>End-to-end user journeys</li>
                                <li>Accessibility (WCAG) audit</li>
                                <li>Performance &amp; load checks</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>test report</li><li>release candidate</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">~1 week</span></span>
                            <span><span class="k">output</span> <span class="v">confidence to ship</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                  </ul>
                </div></div>
              </li>

              <!-- ▸ PHASE 4 · OPERATE -->
              <li role="treeitem" aria-expanded="false">
                <button class="node" data-toggle type="button" aria-expanded="false" aria-label="Toggle folder">
                  <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                  <svg class="ph-ic" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                    <path class="f-closed" d="M1.5 4h5l1.6 2H15.5v8h-14z"/>
                    <path class="f-open" d="M1.5 4h5l1.4 1.8h7.6v1.7H4.2L2.6 14H1.5zM4.2 7.5h11.3L14 14H2.6z"/>
                  </svg>
                  <span class="ph-key">P4</span>
                  <span class="ph-name">Operate</span>
                  <span class="ph-meta">steps 07–08 · wk 07 →</span>
                </button>
                <div class="kids" role="group"><div class="kids-in">
                  <ul class="branch" role="group">

                    <li data-step="07" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-07" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">07</span>
                        <span class="st-name">Deploy</span>
                        <span class="tag">release</span>
                      </button>
                      <div class="kids" id="leaf-07" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">Boring, repeatable releases. Zero-downtime deploys, monitoring from minute one, and a clean handover with documentation.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>Zero-downtime release</li>
                                <li>Monitoring &amp; alerts on</li>
                                <li>Analytics hooks in place</li>
                                <li>Handover docs + walkthrough</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>production release</li><li>runbook</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">1–2 days</span></span>
                            <span><span class="k">output</span> <span class="v">live, watched, documented</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                    <li data-step="08" role="treeitem" aria-expanded="false">
                      <button class="node" data-toggle type="button" aria-expanded="false" aria-controls="leaf-08" aria-label="Toggle details">
                        <svg class="caret" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M4 1.5l5 4.5-5 4.5z"/></svg>
                        <span class="dot" aria-hidden="true"></span>
                        <span class="num">08</span>
                        <span class="st-name">Maintain</span>
                        <span class="tag">support</span>
                      </button>
                      <div class="kids" id="leaf-08" role="group"><div class="kids-in">
                        <div class="leaf">
                          <p class="leaf-desc">Launch is the starting line. I keep watching, patching and improving — the product stays fast, safe and current.</p>
                          <div class="leaf-grid">
                            <div><h3>What happens</h3>
                              <ul class="acts">
                                <li>Bug-fix &amp; security patches</li>
                                <li>Dependency updates</li>
                                <li>Performance watch</li>
                                <li>Iterations from real feedback</li>
                              </ul>
                            </div>
                            <div><h3>Deliverables</h3>
                              <ul class="chips"><li>health reports</li><li>iteration backlog</li></ul>
                            </div>
                          </div>
                          <div class="leaf-meta">
                            <span><span class="k">duration</span> <span class="dur">ongoing</span></span>
                            <span><span class="k">output</span> <span class="v">a product that ages well</span></span>
                          </div>
                        </div>
                      </div></div>
                    </li>

                  </ul>
                </div></div>
              </li>

            </ul>

            <div class="hiw-complete"><span class="pulse"></span> lifecycle mapped — ready to build yours</div>
          </div>

        </div>
      </div>
    </section>

    <!-- ============================================================
     HOW I WORK — ENGINEERING APPROACH
     ============================================================ -->


    <!-- ============================================================
     EXPERIENCE
     ============================================================ -->
    <section id="experience" class="py-20 md:py-28">
      <div class="wrap">

        <!-- Section Header -->
        <div class="mb-12">
          <h2 class="font-display text-3xl sm:text-4xl font-semibold">Experience</h2>
          <p class="mt-3 font-mono text-sm" style="color:var(--text-faint);">Roles I've held — building products &amp; running businesses.</p>
        </div>

        <!-- Experience Cards — stacked full-width for richness -->
        <div class="flex flex-col gap-6">

          <!-- ── Card 1 : Wedevspro ── -->
          <div class="rounded-2xl relative overflow-hidden" style="background:var(--surface); border:1px solid var(--border);">
            <!-- lime glow -->
            <div class="absolute -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none" style="background:var(--accent-glow); filter:blur(60px);"></div>

            <div class="grid lg:grid-cols-[1fr,1.4fr] relative">
              <!-- LEFT: Identity -->
              <div class="p-7 sm:p-8 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r" style="border-color:var(--border);">
                <div>
                  <span class="inline-block font-mono text-xs px-2.5 py-1 rounded-full font-semibold mb-3" style="background:var(--accent-glow); color:var(--accent); border:1px solid rgba(182,255,60,0.2);">Founder &amp; Developer</span>
                  <div class="flex items-center justify-between gap-4 flex-wrap">
                    <h3 class="font-display text-2xl font-semibold">Wedevspro</h3>
                    <span class="font-mono text-xs px-3 py-1 rounded-lg shrink-0" style="background:var(--surface-2); color:var(--text-faint); border:1px solid var(--border);">Ongoing</span>
                  </div>
                  <p class="font-mono text-sm mt-1" style="color:var(--accent);">Full-Stack Developer &amp; Technical Operations</p>
                </div>
                <p class="text-sm leading-relaxed" style="color:var(--text-muted);">Built and managed digital solutions for clients — development, integrations, deployment, and ongoing technical support.</p>
                <!-- Strengths chips populated by JS -->
                <div>
                  <p class="font-mono text-xs uppercase tracking-wider mb-2" style="color:var(--text-faint); letter-spacing:0.08em;">Strengths</p>
                  <div id="strengths-list" class="flex flex-wrap gap-2"></div>
                </div>
                <!-- Link -->
                <div class="mt-auto">
                  <a href="https://wedevspro.com" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300"
                     style="color:var(--accent); border-color:rgba(182,255,60,0.2); background:rgba(182,255,60,0.05);"
                     onmouseover="this.style.background='rgba(182,255,60,0.12)';this.style.borderColor='rgba(182,255,60,0.35)';"
                     onmouseout="this.style.background='rgba(182,255,60,0.05)';this.style.borderColor='rgba(182,255,60,0.2)';">
                    Visit Wedevspro
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>

              <!-- RIGHT: Responsibilities (JS-rendered) -->
              <div class="p-7 sm:p-8">
                <p class="font-mono text-xs uppercase tracking-wider mb-4" style="color:var(--text-faint); letter-spacing:0.08em;">Key Responsibilities</p>
                <ul id="responsibilities-list" class="grid sm:grid-cols-2 gap-x-6 gap-y-2.5"></ul>
              </div>
            </div>
          </div>

          <!-- ── Card 2 : Khati Food Bazar ── -->
          <div class="rounded-2xl relative overflow-hidden" style="background:var(--surface); border:1px solid var(--border);">
            <!-- orange glow -->
            <div class="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none" style="background:rgba(255,150,40,0.08); filter:blur(60px);"></div>

            <div class="grid lg:grid-cols-[1fr,1.4fr] relative">
              <!-- LEFT: Identity -->
              <div class="p-7 sm:p-8 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r" style="border-color:var(--border);">
                <div>
                  <span class="inline-block font-mono text-xs px-2.5 py-1 rounded-full font-semibold mb-3" style="background:rgba(255,150,40,0.1); color:#ff9628; border:1px solid rgba(255,150,40,0.2);">Co-Founder &amp; Managing Director</span>
                  <div class="flex items-center justify-between gap-4 flex-wrap">
                    <h3 class="font-display text-2xl font-semibold">Khati Food Bazar</h3>
                    <span class="font-mono text-xs px-3 py-1 rounded-lg shrink-0" style="background:var(--surface-2); color:var(--text-faint); border:1px solid var(--border);">3 Years</span>
                  </div>
                  <p class="font-mono text-sm mt-1" style="color:#ff9628;">Business Operations &amp; Management</p>
                </div>
                <p class="text-sm leading-relaxed" style="color:var(--text-muted);">Founded and managed Khati Food Bazar — overseeing e-commerce, customer management, supplier coordination, sales, marketing and daily administration.</p>
                <!-- Core tags -->
                <div>
                  <p class="font-mono text-xs uppercase tracking-wider mb-2" style="color:var(--text-faint); letter-spacing:0.08em;">Core Experience</p>
                  <div class="flex flex-wrap gap-2">
                    <?php foreach (["Business Operations","E-commerce","Management","CRM","Sales & Marketing","Vendor Coordination","Digital Business","Problem Solving"] as $tag): ?>
                      <span class="chip"><?php echo htmlspecialchars($tag); ?></span>
                    <?php endforeach; ?>
                  </div>
                </div>
                <!-- Link -->
                <div class="mt-auto">
                  <a href="https://khatifoodbazar.com" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300"
                     style="color:#ff9628; border-color:rgba(255,150,40,0.2); background:rgba(255,150,40,0.05);"
                     onmouseover="this.style.background='rgba(255,150,40,0.12)';this.style.borderColor='rgba(255,150,40,0.35)';"
                     onmouseout="this.style.background='rgba(255,150,40,0.05)';this.style.borderColor='rgba(255,150,40,0.2)';">
                    Visit Khati Food Bazar
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>

              <!-- RIGHT: Key Responsibilities -->
              <div class="p-7 sm:p-8">
                <p class="font-mono text-xs uppercase tracking-wider mb-4" style="color:var(--text-faint); letter-spacing:0.08em;">Key Responsibilities</p>
                <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  <?php foreach ([
                    "Managed end-to-end business operations and daily workflow",
                    "Planned and executed e-commerce and online sales activities",
                    "Managed customer communication and after-sales support",
                    "Coordinated suppliers, delivery partners, and service providers",
                    "Handled product sourcing, pricing, and inventory management",
                    "Built digital systems to streamline business operations",
                    "Ran social media, digital marketing, and promotions",
                    "Monitored sales, expenses, and business performance",
                    "Solved operational issues and made independent decisions",
                    "Built experience in team coordination and workflow management",
                  ] as $r): ?>
                    <li class="flex items-start gap-2 text-sm" style="color:var(--text-muted);">
                      <svg class="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" style="color:#ff9628;"><polyline points="9 18 15 12 9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      <?php echo htmlspecialchars($r); ?>
                    </li>
                  <?php endforeach; ?>
                </ul>
              </div>
            </div>
          </div>

        </div><!-- /cards -->
      </div>
    </section>

    <!-- ============================================================
     BEYOND CODE
     ============================================================ -->
    <section class="py-16 md:py-20">
      <div class="wrap max-w-3xl">
        <div class="quote-block pl-6">
          <h3 class="font-display text-xl font-semibold mb-3">Beyond Code</h3>
          <p class="leading-relaxed" style="color:var(--text-muted);">
            Working with real businesses has taught me not only how to build software, but why a business needs it, how
            people actually use it, and what happens after launch.
          </p>
        </div>
      </div>
    </section>

    <!-- ============================================================
     CONTACT (Ref 4 style)
     ============================================================ -->
    <section id="contact" class="py-20 md:py-28">
      <div class="wrap">
        <div class="contact-v4-wrap">
          <!-- Left: FAQ accordion -->
          <div class="contact-faq-col">
            <p class="font-mono text-xs uppercase tracking-widest mb-3"
              style="color:var(--accent); letter-spacing:0.15em;">— FAQ'S</p>
            <h2 class="font-display text-3xl sm:text-4xl font-semibold mb-8">Frequently Asked <span
                style="color:var(--accent);">Questions</span></h2>

            <div class="faq-list" id="faq-list">
              <div class="faq-item active">
                <button class="faq-q" onclick="toggleFaq(this)">
                  What services do you primarily offer?
                  <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
                <div class="faq-a">Full-stack web development, WordPress & CMS solutions, web applications, REST APIs,
                  third-party integrations, e-commerce builds, and long-term technical maintenance. I work across the
                  full lifecycle — from planning to deployment and beyond.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                  Do you work with businesses of all sizes?
                  <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
                <div class="faq-a">Yes — from solo entrepreneurs launching their first product to established businesses
                  needing custom platforms. The approach adapts to the scale and budget of each project.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                  How long does it take to see results?
                  <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
                <div class="faq-a">Simple websites and landing pages: 1–2 weeks. Complex web apps and integrated
                  platforms: 4–8 weeks depending on scope. I always provide a timeline estimate before starting.</div>
              </div>
              <div class="faq-item">
                <button class="faq-q" onclick="toggleFaq(this)">
                  How do we start a project?
                  <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
                <div class="faq-a">Start by describing your problem or goal. I'll analyze the requirements and propose
                  the best technical approach — whether that's a custom build, a platform integration, or an existing
                  solution configured for your needs.</div>
              </div>
            </div>

            <div class="contact-cta-bar mt-10">
              <div>
                <span class="text-xs" style="color:var(--text-faint);">Have Any Question</span>
                <p class="font-display font-semibold">Let's talk</p>
              </div>
              <a href="mailto:developer.sazzad.me@gmail.com" class="btn btn-primary flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                developer.sazzad.me@gmail.com
              </a>
            </div>
          </div>

          <!-- Right: Lime green contact form card -->
          <div class="contact-lime-card">
            <h3 class="font-display text-xl font-semibold mb-6 text-center" style="color:#0a0a0f;">Get A Free
              Consultation</h3>
            <form id="contact-form" class="space-y-4" onsubmit="handleContactForm(event)">
              <input type="hidden" name="form_type" value="contact">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <input type="text" name="name" placeholder="Full Name*" class="contact-input" aria-label="Full Name" required>
                </div>
                <div>
                  <input type="email" name="email" placeholder="Your Email*" class="contact-input" aria-label="Your Email" required>
                </div>
              </div>
              <input type="text" name="phone" placeholder="Phone Number" class="contact-input w-full" aria-label="Phone Number">
              <textarea name="message" placeholder="Message" rows="5" class="contact-input w-full resize-none" aria-label="Message" required></textarea>
              <button type="submit" class="contact-submit-btn">
                SEND MESSAGE
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

  </main>

  
<?php
    include("footer.php");
?>















