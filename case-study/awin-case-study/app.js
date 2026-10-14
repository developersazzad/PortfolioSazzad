/* AWIN case study — documented UI and workflow explorer */
const screens = [
  // Public website
  { img:'Landing_Website.png', type:'website', title:'Public acquisition website', route:'website/index.php', desc:'A CMS-driven public landing page that fetches hero content, marquees and active package previews from the Admin API.' },
  // PWA
  { img:'home_pwa.png', type:'pwa', title:'PWA home dashboard', route:'pwa/index.php', desc:'Mobile-first home hub for balance, live packages, quick actions and account-aware navigation.' },
  { img:'regular_pakage_pwa.png', type:'pwa', title:'Regular package discovery', route:'pwa/index.php', desc:'Live package cards reveal ticket price, countdown and prize segments before the player starts a purchase.' },
  { img:'drow_pakage_tickets_details_pwa.png', type:'pwa', title:'Draw package detail', route:'pwa/buy_ticket.php', desc:'A pre-purchase view for a standard lottery package, including price, prize and draw details.' },
  { img:'1_to_5_pakage_details_pwa.png', type:'pwa', title:'Guided number selection', route:'pwa/exp_package.php', desc:'Ticket quantity, segment choice and number-picker constraints are expressed as a focused touch workflow.' },
  { img:'pakage_details_pwa.png', type:'pwa', title:'Package rules & prize matrix', route:'pwa/package_info.php', desc:'A comprehensive package view explains rules, prize distribution and the expiration countdown.' },
  { img:'tickets_checkout_pwa.png', type:'pwa', title:'Review & checkout', route:'pwa/checkout.php', desc:'The critical confirmation point where the API checks balance and records a selected ticket purchase.' },
  { img:'aftet_checkout_pwa.png', type:'pwa', title:'Purchase confirmation', route:'pwa/checkout.php', desc:'Payment success state with transaction detail, delivery status, share controls and ticket receipt actions.' },
  { img:'tickets_order_sammery_marcent_user_pwa.png', type:'pwa', title:'Merchant order summary', route:'pwa/receipt.php', desc:'A detailed ticket summary that gives merchants proof they can share with local customers.' },
  { img:'tickets_qr_code_pwa.png', type:'pwa', title:'Ticket QR receipt', route:'pwa/receipt.php', desc:'A branded receipt with a unique QR code and ticket metadata for immediate authenticity checks.' },
  { img:'all_tickets_list_pwa.png', type:'pwa', title:'My tickets', route:'pwa/tickets.php', desc:'Ticket batches arranged by status, expiration and package with practical options for tracking and invoicing.' },
  { img:'check_tickets_status_pwa.png', type:'pwa', title:'Ticket status lookup', route:'pwa/tickets.php', desc:'Status inspection helps a customer see whether ticket numbers mapped to a pending, winning or lost outcome.' },
  { img:'check_tickets_use_id_pwa.png', type:'pwa', title:'Check by ticket ID', route:'pwa/scan.php', desc:'A focused input experience retrieves a ticket’s cryptographic status and receipt from the API.' },
  { img:'tickets_win_list_pwa.png', type:'pwa', title:'Winning tickets', route:'pwa/winners.php', desc:'A clear winner state communicates matched logic, prize amount and paid completion.' },
  { img:'tickets_lose_pwa.png', type:'pwa', title:'Lost ticket state', route:'pwa/tickets.php', desc:'A transparent result treatment clearly distinguishes an unsuccessful ticket from a pending draw.' },
  { img:'dynamic_result_page_pwa.png', type:'pwa', title:'Dynamic results board', route:'pwa/results.php', desc:'Latest draw outcomes are supplied from Admin through the API and rendered as an engaging, visual feed.' },
  { img:'public_tracking_link_pwa.png', type:'pwa', title:'Public purchase tracker', route:'pwa/track.php?id=…', desc:'A publicly shareable, tamper-conscious verification view proves a purchase without requiring account access.' },
  { img:'Scan_qr_check_result_pwa.png', type:'pwa', title:'QR result scanner', route:'pwa/scan.php', desc:'HTML5-QRCode opens the device camera so physical and digital ticket codes can be checked immediately.' },
  { img:'top_up_page_pwa.png', type:'pwa', title:'Top-up request', route:'pwa/topup.php', desc:'Users select an active payment method, enter a transaction ID and attach payment proof for administrator review.' },
  { img:'top_up_history_pwa.png', type:'pwa', title:'Top-up history', route:'pwa/balance_history.php', desc:'An account ledger makes deposit requests and their approved, pending or rejected states easy to audit.' },
  { img:'transection_history_pwa.png', type:'pwa', title:'Transaction history', route:'pwa/activity.php', desc:'A ledger view gathers purchases, bonuses, withdrawals and balance movements into one readable timeline.' },
  { img:'user_profile_pwa.png', type:'pwa', title:'Profile & withdrawal entry', route:'pwa/profile.php', desc:'Account information, payment preference, ticket totals and withdrawal access live together in a compact hub.' },
  { img:'withdrow_history_pwa.png', type:'pwa', title:'Withdrawal history', route:'pwa/withdraw_history.php', desc:'Payout requests show their financial status from pending to processing or approved using balance data.' },
  { img:'user_activity_page_pwa.png', type:'pwa', title:'User activity timeline', route:'pwa/activity.php', desc:'Non-financial activity, such as profile and page visits, becomes visible as an account-security timeline.' },
  { img:'notification_page_pwa.png', type:'pwa', title:'Notification timeline', route:'pwa/notifications.php', desc:'A real-time feed groups global updates, transaction notices and win announcements in a native-style drawer.' },
  { img:'email_notification_pwa.png', type:'pwa', title:'Ticket confirmation email', route:'api/v1/mailer/', desc:'PHPMailer dispatches a branded confirmation with the ticket group, total and a direct link for verification.' },
  { img:'menu_sidebar_pwa.png', type:'pwa', title:'Off-canvas navigation', route:'pwa/template/sidebar.php', desc:'A touch-friendly mobile menu brings wallet, profile, activity, settings and support within easy reach.' },
  { img:'sidebar_change_admin_in_pwa.png', type:'pwa', title:'Role-aware sidebar', route:'pwa/template/sidebar.php', desc:'Conditional navigation presents administrative or merchant-specific options only to an elevated signed-in role.' },
  { img:'mobile_bottom_nav_pwa.png', type:'pwa', title:'Fixed mobile navigation', route:'pwa/template/footer.php', desc:'A fixed bottom bar mirrors native app behavior, keeping key routes accessible with a thumb-first pattern.' },
  { img:'mobile_bottom_nav_change_color_pwa.png', type:'pwa', title:'Theme-aware mobile navigation', route:'pwa/template/footer.php', desc:'The navigation state and system accent respond to the active visual theme without losing orientation.' },
  { img:'home_theme_change_pwa.png', type:'pwa', title:'Personalized visual theme', route:'pwa/template/header.php', desc:'Theme color and layout settings can change the customer shell dynamically through CSS variables.' },
  { img:'live_chat_pwa.png', type:'pwa', title:'Live customer support', route:'pwa/support.php', desc:'An embedded live-chat support connection offers direct help at the moment a player needs it.' },
  { img:'overlay_pwa.png', type:'pwa', title:'Protected action overlay', route:'pwa/components/overlay', desc:'A blocking overlay avoids accidental multi-clicks and double-spending during critical API post operations.' },
  { img:'spical_pakage_ecom_pwa.png', type:'pwa', title:'Special package commerce', route:'pwa/exp_package.php', desc:'An ecommerce-shaped special package layout manages multi-ticket selection and high-value availability.' },
  { img:'spical_pakage_details_pwa.png', type:'pwa', title:'Special package details', route:'pwa/exp_package.php', desc:'A detailed view explains EXP package limits, segmented options and variable prizes.' },
  { img:'spical_pakage_dynamic_info_pwa.png', type:'pwa', title:'Dynamic segment information', route:'pwa/exp_package.php', desc:'AJAX updates selection constraints and current package data without asking the player to navigate away.' },
  // Admin
  { img:'Deshbord.png', type:'admin', title:'Admin dashboard', route:'index.php', desc:'The analytical command center combines headline KPIs, quick actions and configurable operational system data.' },
  { img:'Admin_panel_white.png', type:'admin', title:'Light admin theme', route:'index.php', desc:'A high-contrast day mode presents the complete administrative system hierarchy for long working sessions.' },
  { img:'admin_panel_dark.png', type:'admin', title:'Dark admin theme', route:'index.php', desc:'A dedicated night-mode treatment preserves readability while giving administrators a lower-light workspace.' },
  { img:'agents_admin.png', type:'admin', title:'Merchant & agent CRM', route:'marcents.php', desc:'Merchants can be reviewed, activated, credited and connected to balances from a searchable administrative grid.' },
  { img:'all_tickets_admin.png', type:'admin', title:'Master ticket inventory', route:'tickets.php', desc:'A master database view supports ticket search, package context, user mapping and stateful cancellation actions.' },
  { img:'exp_t.png', type:'admin', title:'EXP ticket inventory', route:'exp_tickets.php', desc:'A dedicated listing makes high-tier EXP ticket sales and distribution observable in the same control environment.' },
  { img:'pakages.png', type:'admin', title:'Standard package manager', route:'pakages.php', desc:'The package CRUD matrix manages ticket price, draw window, limit, segments and home visibility.' },
  { img:'pakages2_admin.png', type:'admin', title:'Package creation modal', route:'pakages.php', desc:'An advanced creation form lets operators define package identity, ticket constraints, dates and VAT details.' },
  { img:'exp_p.png', type:'admin', title:'EXP package manager', route:'exp_pakages.php', desc:'A special-package workflow controls advanced rules, limits and high-tier prize values without disrupting active sales.' },
  { img:'Prediction_winner_list_admin.png', type:'admin', title:'Winner grouping engine', route:'winners.php / Cron_Jobs_Winner_set', desc:'The core algorithmic console groups matching tickets by winning level before a team commits the final draw result.' },
  { img:'Result_admin.png', type:'admin', title:'Result publishing', route:'results.php', desc:'A final administrative results list makes published prizes and creative result cards manageable at a glance.' },
  { img:'admin_topup_requests.png', type:'admin', title:'Top-up review queue', route:'topup_requests.php', desc:'Operations can verify transaction references, payment methods and screenshots before approving wallet credit.' },
  { img:'withdrow_admin.png', type:'admin', title:'Withdrawal clearance', route:'withdraw.php', desc:'A dedicated financial queue moves payout requests through pending, processing, approval or rejection actions.' },
  { img:'website_castomizer_admin.png', type:'admin', title:'Website customizer', route:'website.php', desc:'A headless-CMS-style controller lets the team update public hero assets, copy, button paths and visibility rules.' },
  { img:'Theme_setting_admin.png', type:'admin', title:'Global theme controls', route:'settings.php', desc:'Theme controls configure color, layout direction, menu style, background treatments and user customization access.' },
  { img:'arohidraw.com_notifications_history.png', type:'admin', title:'Notification audit history', route:'notifications_history.php', desc:'A searchable log preserves delivery compliance for system-wide, payment and user-targeted notifications.' },
  { img:'arohidraw.com_reports-old.png', type:'admin', title:'Analytics & result reporting', route:'reports-old.php', desc:'The legacy analytics view joins filtering, inventory overlap analysis and winner setup into a data-led workflow.' },
  { img:'arohidraw.com_whatsapp_vps.png', type:'admin', title:'WhatsApp VPS control room', route:'whatsapp_vps.php', desc:'The main WhatsApp integration dashboard exposes VPS connection configuration, webhook details and security controls.' },
  { img:'arohidraw.com_whatsapp_vps (1).png', type:'admin', title:'WhatsApp notification logs', route:'whatsapp_vps.php', desc:'Message logs expose sent, queued and failed delivery states with filters and delivery-inspection actions.' },
  { img:'arohidraw.com_whatsapp_vps (2).png', type:'admin', title:'WhatsApp template library', route:'whatsapp_vps.php', desc:'Channel-specific templates make placeholders, live previews and reusable ticket messaging manageable in one place.' },
  { img:'arohidraw.com_whatsapp_vps (3).png', type:'admin', title:'SMS template composer', route:'whatsapp_vps.php', desc:'The same messaging shell can switch to SMS and create an actively managed channel template.' },
  { img:'arohidraw.com_whatsapp_vps (4).png', type:'admin', title:'WhatsApp status monitor', route:'whatsapp_vps.php', desc:'A live monitor shows Node API connection, WhatsApp Web status, uptime, queue state and anti-ban settings.' },
  { img:'arohidraw.com_whatsapp_vps (5).png', type:'admin', title:'Messaging channel settings', route:'whatsapp_vps.php', desc:'Channel controls expose WhatsApp, SMS and Email settings plus a sender test flow backed by SMTP.' },
  { img:'arohidraw.com_whatsapp_vps (6).png', type:'admin', title:'Messaging template context', route:'whatsapp_vps.php', desc:'The notification template workspace keeps dynamic variables, channel tabs and template setup within one operation.' },
  { img:'overlay_1_admin.png', type:'admin', title:'Admin loading overlay', route:'admin/components/overlay', desc:'An administrative loading state protects heavier AJAX actions from overlapping writes and unclear system feedback.' },
  { img:'Overlay_obe.png', type:'admin', title:'Admin security overlay', route:'admin/components/security-overlay', desc:'A global protective layer can block expired sessions and critical unauthorized actions before unsafe continuation.' }
];

const displayType = { pwa: 'PWA', admin: 'ADMIN', website: 'WEBSITE' };
let activeFilter = 'all';
let visibleCount = 12;
let searchTerm = '';

function initCounts() {
  const count = type => screens.filter(item => item.type === type).length;
  document.getElementById('allCount').textContent = screens.length;
  document.getElementById('pwaCount').textContent = count('pwa');
  document.getElementById('adminCount').textContent = count('admin');
  document.getElementById('websiteCount').textContent = count('website');
}

function filteredScreens() {
  return screens.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const source = `${item.title} ${item.desc} ${item.route}`.toLowerCase();
    return matchesFilter && source.includes(searchTerm);
  });
}

function renderGallery() {
  const gallery = document.getElementById('screenGallery');
  const list = filteredScreens();
  const fragment = document.createDocumentFragment();
  gallery.innerHTML = '';
  list.slice(0, visibleCount).forEach(item => {
    const card = document.createElement('article');
    card.className = `gallery-card ${item.type}-card`;
    card.innerHTML = `
      <div class="gallery-thumb">
        <span class="card-type">${displayType[item.type]}</span>
        <img loading="lazy" src="assets/${item.img}" alt="${item.title}" />
        <button class="card-open" type="button" aria-label="Open ${item.title}">↗</button>
      </div>
      <div class="gallery-card-copy"><h3>${item.title}</h3><span>${item.route.split('/').pop()}</span></div>`;
    card.addEventListener('click', () => openModal(item));
    fragment.appendChild(card);
  });
  if (!list.length) gallery.innerHTML = '<div class="no-results">No screens match that search. Try “wallet”, “ticket”, “admin”, or “message”.</div>';
  gallery.appendChild(fragment);
  document.getElementById('loadMore').hidden = list.length <= visibleCount;
  document.getElementById('loadMore').textContent = `Load ${Math.min(12, list.length - visibleCount)} more screen${Math.min(12, list.length - visibleCount) === 1 ? '' : 's'} ↓`;
}

const modal = document.getElementById('imageModal');
function findScreen(img) { return screens.find(item => item.img === img); }
function openModal(item) {
  if (!item) return;
  document.getElementById('modalImage').src = `assets/${item.img}`;
  document.getElementById('modalImage').alt = item.title;
  document.getElementById('modalType').textContent = `${displayType[item.type]} / DOCUMENTED SCREEN`;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalDescription').textContent = item.desc;
  document.getElementById('modalRoute').textContent = item.route;
  if (!modal.open) modal.showModal();
}

function initModal() {
  document.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    const rect = modal.getBoundingClientRect();
    const inDialog = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inDialog) modal.close();
  });
  document.querySelectorAll('[data-open-gallery]').forEach(button => {
    button.addEventListener('click', () => openModal(findScreen(button.dataset.openGallery)));
  });
}

function initGallery() {
  initCounts();
  renderGallery();
  document.querySelectorAll('.gallery-filter').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      visibleCount = 12;
      document.querySelectorAll('.gallery-filter').forEach(item => item.classList.toggle('active', item === button));
      renderGallery();
    });
  });
  document.getElementById('gallerySearch').addEventListener('input', event => {
    searchTerm = event.target.value.toLowerCase().trim();
    visibleCount = 12;
    renderGallery();
  });
  document.getElementById('loadMore').addEventListener('click', () => { visibleCount += 12; renderGallery(); });
}

function initHeader() {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress span');
  function updateHeader() {
    const scroll = window.scrollY;
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    header.classList.toggle('scrolled', scroll > 14);
    progress.style.width = `${Math.min(100, (scroll / max) * 100)}%`;
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  toggle.addEventListener('click', () => {
    const state = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!state));
    mobileNav.classList.toggle('open', !state);
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false'); mobileNav.classList.remove('open');
  }));
}

function initVisualEffects() {
  const glow = document.querySelector('.cursor-glow');
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', event => {
      glow.style.transform = `translate(${event.clientX - 220}px, ${event.clientY - 220}px)`;
    }, { passive: true });
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: .11 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
}

function initArchitecture() {
  const flowData = {
    journey: { label: 'ACQUISITION → PLAY → PROOF', title: 'Landing → Live data', body: 'Hero content and package previews are supplied by the admin-managed CMS.' },
    governance: { label: 'OPERATIONS → RESOLUTION → PUBLISH', title: 'Control → trusted outcome', body: 'Administrators validate finance and winner groups before publishing results back to each client.' },
    signal: { label: 'EVENT → DELIVERY → RECEIPT', title: 'System event → customer update', body: 'Important ticket and payment events travel through the logged Email, SMS and WhatsApp delivery layer.' }
  };
  const stage = document.querySelector('.tree-stage');
  const label = document.getElementById('flow-label');
  const annotation = document.getElementById('flow-annotation');
  document.querySelectorAll('.flow-tab').forEach(tab => tab.addEventListener('click', () => {
    const flow = tab.dataset.flow;
    const current = flowData[flow];
    stage.dataset.flow = flow;
    label.textContent = current.label;
    annotation.innerHTML = `<b>${current.title}</b><span>${current.body}</span>`;
    document.querySelectorAll('.flow-tab').forEach(item => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
  }));
}

function initExperience() {
  const screen = document.getElementById('loopScreen');
  const number = document.getElementById('loopNumber');
  const title = document.getElementById('loopTitle');
  const description = document.getElementById('loopDescription');
  let currentImage = 'regular_pakage_pwa.png';
  document.querySelectorAll('.loop-step').forEach((step, index) => step.addEventListener('click', () => {
    currentImage = step.dataset.screen;
    screen.style.opacity = '0';
    window.setTimeout(() => {
      screen.src = `assets/${currentImage}`;
      screen.alt = step.dataset.title;
      screen.style.opacity = '1';
    }, 130);
    number.textContent = String(index + 1).padStart(2, '0');
    title.textContent = step.dataset.title;
    description.textContent = step.dataset.description;
    document.querySelectorAll('.loop-step').forEach(item => item.classList.toggle('active', item === step));
  }));
  document.getElementById('inspectLoop').addEventListener('click', () => openModal(findScreen(currentImage)));
}

function initCapabilities() {
  const img = document.getElementById('capImage');
  const stage = document.getElementById('capSpotlight');
  const device = document.getElementById('capDevice');
  const eyebrow = document.getElementById('capEyebrow');
  const title = document.getElementById('capTitle');
  const body = document.getElementById('capBody');
  let currentImage = 'pakage_details_pwa.png';

  // Present every source in its natural context: vertical PWA views live inside a phone,
  // while horizontal admin interfaces use a responsive laptop shell.
  function applyDeviceShell(imageName) {
    const item = findScreen(imageName);
    const surface = item ? item.type : 'pwa';
    stage.dataset.surface = surface;
    stage.className = `spotlight-image ${surface}-display`;
    device.className = `device-shell ${surface}-device`;
  }

  applyDeviceShell(currentImage);
  document.querySelectorAll('.capability').forEach(button => button.addEventListener('click', () => {
    currentImage = button.dataset.image;
    img.style.opacity = '0';
    applyDeviceShell(currentImage);
    window.setTimeout(() => { img.src = `assets/${currentImage}`; img.alt = button.dataset.title; img.style.opacity = '1'; }, 130);
    eyebrow.textContent = button.dataset.eyebrow;
    title.textContent = button.dataset.title;
    body.textContent = button.dataset.body;
    document.querySelectorAll('.capability').forEach(item => item.classList.toggle('active', item === button));
  }));
  document.getElementById('capOpen').addEventListener('click', () => openModal(findScreen(currentImage)));
}

function init() {
  initHeader();
  initVisualEffects();
  initModal();
  initArchitecture();
  initExperience();
  initCapabilities();
  initGallery();
}
init();
