/* ============================================================
   SHOPABLE REEL — CASE STUDY · main.js
   Vanilla ES6 · no dependencies · by developersazzad
   ============================================================ */
(() => {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = matchMedia('(pointer: fine)').matches;

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    setTimeout(() => $('#preloader')?.classList.add('done'), 450);
  });

  /* ---------- Scroll progress + nav state ---------- */
  const progress = $('#progress');
  const nav = $('#nav');
  const toTop = $('#toTop');
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    progress.style.width = (p * 100) + '%';
    nav.classList.toggle('scrolled', h.scrollTop > 30);
    toTop.classList.toggle('show', h.scrollTop > 700);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger'), mmenu = $('#mmenu');
  const toggleMenu = (open) => {
    burger.classList.toggle('open', open);
    mmenu.classList.toggle('open', open);
    document.body.classList.toggle('locked', open);
    $$('#mmenu a').forEach((a, i) => a.style.transitionDelay = open ? (0.06 * i + 0.1) + 's' : '0s');
  };
  burger.addEventListener('click', () => toggleMenu(!mmenu.classList.contains('open')));
  $$('#mmenu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Active nav link ---------- */
  const secIO = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach(s => secIO.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const rvIO = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvIO.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.rv').forEach(el => rvIO.observe(el));

  /* ---------- Animated counters ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const dur = 1600, t0 = performance.now();
    const tick = (t) => {
      const p = clamp((t - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cIO = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cIO.unobserve(e.target); } });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => cIO.observe(el));

  /* ---------- 3D tilt + glare ---------- */
  if (finePointer && !reduceMotion) {
    $$('[data-tilt]').forEach(el => {
      const max = parseFloat(el.dataset.tilt || 8);
      el.classList.add('tilt');
      // once revealed & first hovered, swap the slow reveal transition for a snappy tilt one
      el.addEventListener('mouseenter', () => {
        if (el.classList.contains('in')) el.style.transition = 'transform .15s ease-out';
      }, { once: true });
      el.addEventListener('mousemove', (ev) => {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-4px)`;
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Hero: mouse-parallax pivot + JS 3D orbit ring ---------- */
  const scene = $('#heroScene');
  if (scene) {
    const pivot = $('.scene-pivot', scene);
    if (finePointer && !reduceMotion) {
      $('#hero').addEventListener('mousemove', (ev) => {
        const x = ev.clientX / innerWidth - 0.5, y = ev.clientY / innerHeight - 0.5;
        pivot.style.setProperty('--ry', (x * 14) + 'deg');
        pivot.style.setProperty('--rx', (-y * 10) + 'deg');
      });
      $('#hero').addEventListener('mouseleave', () => {
        pivot.style.setProperty('--ry', '0deg'); pivot.style.setProperty('--rx', '0deg');
      });
    }
    // fake-3D orbit: cards circle the phone with depth-scaled size/blur/z-index
    const cards = $$('.orbit-card', scene);
    let ang = 0, last = performance.now(), visible = true;
    document.addEventListener('visibilitychange', () => visible = !document.hidden);
    const R_FACTOR = 0.36; // of scene width
    const orbit = (t) => {
      const dt = (t - last) / 1000; last = t;
      if (visible && !reduceMotion) ang += dt * 0.32; // rad/s
      const w = scene.clientWidth;
      const R = Math.min(w * R_FACTOR, 400);
      cards.forEach((c, i) => {
        const a = ang + (i * Math.PI * 2) / cards.length;
        const depth = Math.cos(a);            // +1 front … -1 back
        const x = Math.sin(a) * R;
        const s = 0.72 + 0.34 * ((depth + 1) / 2);
        const y = -6 + Math.sin(a * 2) * 6;
        c.style.transform = `translate(-50%,-50%) translate3d(${x}px, ${y}px, 0) scale(${s.toFixed(3)})`;
        c.style.zIndex = depth > 0.15 ? 60 : 10;   // phone sits at z 50
        c.style.opacity = (0.42 + 0.58 * ((depth + 1) / 2)).toFixed(2);
        c.style.filter = depth < -0.2 ? `blur(${(-depth * 2.4).toFixed(1)}px) brightness(.6)` : 'none';
      });
      requestAnimationFrame(orbit);
    };
    requestAnimationFrame(orbit);
  }

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastT;
  const showToast = (icon, msg) => {
    toast.innerHTML = `<i>${icon}</i><span>${msg}</span>`;
    toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  /* ---------- Demo reel data + carousel ---------- */
  const REELS = [
    { name: 'VASONTI', price: '৳ 1,690', old: '৳ 1,990', views: '3',  img: 'assets/img/demo-card-1.jpg' },
    { name: 'RUBAB',   price: '৳ 1,690', old: '৳ 1,890', views: '5K', img: 'assets/img/demo-card-2.jpg' },
    { name: 'MUSKAN',  price: '৳ 1,690', old: '৳ 1,890', views: '4',  img: 'assets/img/demo-card-3.jpg' },
    { name: 'FALAQ',   price: '৳ 1,690', old: '৳ 2,090', views: '1',  img: 'assets/img/demo-card-4.jpg' },
    { name: 'ZAIRA',   price: '৳ 1,550', old: '',        views: '—',  img: 'assets/img/demo-card-5.jpg' },
  ];
  const track = $('#demoTrack');
  if (track) {
    REELS.forEach((r, i) => {
      const card = document.createElement('article');
      card.className = 'reel-card rv';
      card.style.setProperty('--d', (i * 0.07) + 's');
      card.dataset.idx = i;
      card.innerHTML = `
        <img src="${r.img}" alt="${r.name} reel" loading="lazy" draggable="false">
        <span class="rc-views">👁 ${r.views}</span>
        <span class="rc-play">▶</span>
        <span class="rc-fade"></span>`;
      card.addEventListener('click', () => openViewer(i));
      track.appendChild(card);
      rvIO.observe(card);
    });
    // arrows
    const step = () => (track.querySelector('.reel-card')?.offsetWidth || 200) + 16;
    $('#demoPrev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('#demoNext').addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
    // drag-to-scroll (desktop)
    let down = false, sx = 0, sl = 0;
    track.addEventListener('pointerdown', (e) => { if (!finePointer) return; down = true; sx = e.clientX; sl = track.scrollLeft; track.classList.add('dragging'); });
    addEventListener('pointerup',   () => { down = false; track.classList.remove('dragging'); });
    addEventListener('pointermove', (e) => { if (!down) return; track.scrollLeft = sl - (e.clientX - sx); });
  }

  /* ---------- Full-screen reel viewer (concept replica) ---------- */
  const viewer = $('#viewer');
  let vIdx = 0;
  const vwMain = $('#vwMain'), vwPrev = $('#vwPrevImg'), vwNext = $('#vwNextImg'),
        vwThumb = $('#vwThumb'), vwName = $('#vwName'), vwPrice = $('#vwPrice'), vwCount = $('#vwCount');
  const paintViewer = (i) => {
    vIdx = (i + REELS.length) % REELS.length;
    const r = REELS[vIdx], p = REELS[(vIdx - 1 + REELS.length) % REELS.length], n = REELS[(vIdx + 1) % REELS.length];
    vwMain.src = r.img; vwThumb.src = r.img; vwPrev.src = p.img; vwNext.src = n.img;
    vwName.textContent = r.name;
    vwPrice.innerHTML = `${r.old ? `<s>${r.old}</s>` : ''}<b>${r.price}</b>`;
    vwCount.textContent = `${vIdx + 1} / ${REELS.length}  ·  👁 ${r.views}`;
  };
  const openViewer = (i) => {
    paintViewer(i);
    viewer.classList.add('open');
    document.body.classList.add('locked');
  };
  const closeViewer = () => { viewer.classList.remove('open'); document.body.classList.remove('locked'); };
  $('#vwClose').addEventListener('click', closeViewer);
  $('#vwPrev').addEventListener('click', () => paintViewer(vIdx - 1));
  $('#vwNext').addEventListener('click', () => paintViewer(vIdx + 1));
  $('#vwPlay').addEventListener('click', () => showToast('🎬', 'YouTube IFrame API would autoplay the reel here (muted, per browser policy).'));
  $('#vwMute').addEventListener('click', (e) => showToast('🔊', 'Mute / unmute — starts muted by default, exactly like the plugin.'));
  $('#vwLink').addEventListener('click', () => showToast('🔗', 'Copy reel link — shares straight to this product reel.'));
  $('#vwGo').addEventListener('click', () => showToast('🛍️', '“Go” jumps to the product page — where the floating video takes over.'));
  viewer.addEventListener('click', (e) => { if (e.target === viewer || e.target.classList.contains('vw-stage')) closeViewer(); });

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
  const shots = $$('[data-lightbox]');
  let lbIdx = 0;
  const paintLb = (i) => {
    lbIdx = (i + shots.length) % shots.length;
    const fig = shots[lbIdx];
    const img = $('img', fig);
    lbImg.src = img.currentSrc || img.src;
    lbImg.classList.remove('zoomed');
    lbCap.innerHTML = fig.dataset.lightbox;
    lbCount.textContent = `${lbIdx + 1} / ${shots.length}`;
  };
  const openLb = (i) => { paintLb(i); lb.classList.add('open'); document.body.classList.add('locked'); };
  const closeLb = () => { lb.classList.remove('open'); document.body.classList.remove('locked'); };
  shots.forEach((fig, i) => fig.addEventListener('click', () => openLb(i)));
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => paintLb(lbIdx - 1));
  $('#lbNext').addEventListener('click', () => paintLb(lbIdx + 1));
  lbImg.addEventListener('click', () => lbImg.classList.toggle('zoomed'));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });

  /* ---------- Keyboard ---------- */
  addEventListener('keydown', (e) => {
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') paintLb(lbIdx - 1);
      if (e.key === 'ArrowRight') paintLb(lbIdx + 1);
    } else if (viewer.classList.contains('open')) {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') paintViewer(vIdx - 1);
      if (e.key === 'ArrowRight') paintViewer(vIdx + 1);
    } else if (mmenu.classList.contains('open') && e.key === 'Escape') toggleMenu(false);
  });

  /* ---------- Architecture tabs ---------- */
  $$('.tabs').forEach(tabs => {
    const btns = $$('button', tabs);
    const panels = $$('.tab-panel', tabs.parentElement);
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.remove('on'));
      panels.forEach(p => p.classList.remove('on'));
      b.classList.add('on');
      panels[i].classList.add('on');
    }));
  });

  /* ---------- AJAX simulator ---------- */
  const ENDPOINTS = {
    'sr_save_reel': {
      desc: 'POST  admin-ajax.php  ·  action=sr_save_reel  (admin, nonce-secured)',
      lines: [
        ['req', '→ POST /wp-admin/admin-ajax.php'],
        ['dim', '   action=sr_save_reel&nonce=4f9c2ab17e&product_id=29513'],
        ['dim', '   video_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dk8B_SLh3pws'],
        ['dim', '✓ check_ajax_referer() passed · current_user_can("manage_options") ✓'],
        ['dim', '✓ update_post_meta( 29513, "_sr_video_url", … ) · "_sr_views"'],
        ['ok',  '← 200 OK · 41 ms'],
        ['js',  '{ "success": true, "data": { "product_id": 29513, "video_id": "k8B_SLh3pws", "views": "3", "badge": "-15%" } }'],
      ],
    },
    'sr_get_reels': {
      desc: 'POST  admin-ajax.php  ·  action=sr_get_reels  (frontend carousel / viewer)',
      lines: [
        ['req', '→ POST /wp-admin/admin-ajax.php'],
        ['dim', '   action=sr_get_reels&limit=10&orderby=newest'],
        ['dim', '✓ WP_Query built from Settings + shortcode attrs'],
        ['dim', '✓ products without a reel filtered out (hide_empty=1)'],
        ['ok',  '← 200 OK · 58 ms'],
        ['js',  '{ "success": true, "data": { "count": 13, "reels": [ { "name": "VASONTI", "price": "৳ 1,690", "views": "3" }, { "name": "RUBAB", "price": "৳ 1,690", "views": "5K" } … ] } }'],
      ],
    },
    'sr_track_view': {
      desc: 'POST  admin-ajax.php  ·  action=sr_track_view  (fired by YT player event)',
      lines: [
        ['req', '→ POST /wp-admin/admin-ajax.php'],
        ['dim', '   action=sr_track_view&nonce=4f9c2ab17e&reel=29494'],
        ['dim', '✓ YT.PlayerState.PLAYING · first play this session only'],
        ['dim', '✓ meta "_sr_views" incremented → 4999 → 5000'],
        ['ok',  '← 200 OK · 37 ms'],
        ['js',  '{ "success": true, "data": { "views": "5K", "formatted": true } }'],
      ],
    },
  };
  const simConsole = $('#simConsole'), simStatus = $('#simStatus'), simSend = $('#simSend');
  let simEp = 'sr_save_reel', simBusy = false;
  $$('.sim-eps button').forEach(b => b.addEventListener('click', () => {
    $$('.sim-eps button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    simEp = b.dataset.ep;
    simStatus.innerHTML = ENDPOINTS[simEp].desc;
  }));
  simStatus.innerHTML = ENDPOINTS[simEp].desc;
  simSend.addEventListener('click', () => {
    if (simBusy) return;
    simBusy = true;
    simSend.textContent = 'Sending…';
    simConsole.innerHTML = '<span class="dim">// awaiting response…</span>\n';
    const lines = ENDPOINTS[simEp].lines;
    lines.forEach((ln, i) => {
      setTimeout(() => {
        simConsole.innerHTML += `<span class="${ln[0]}">${ln[1].replace(/</g, '&lt;')}</span>\n`;
        simConsole.scrollTop = simConsole.scrollHeight;
        if (i === lines.length - 1) {
          simBusy = false;
          simSend.textContent = 'Send Request ↵';
          showToast('⚡', 'AJAX round-trip simulated — the real plugin talks to admin-ajax.php exactly like this.');
        }
      }, 260 * (i + 1));
    });
  });

  /* ---------- Copy shortcode ---------- */
  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const txt = btn.dataset.copy;
    try { await navigator.clipboard.writeText(txt); }
    catch { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    showToast('📋', `Copied: ${txt}`);
  }));

  /* ---------- Reviews (user-generated, localStorage-persisted) ---------- */
  const REV_KEY = 'sr_case_reviews_v1';
  const SEED_REVIEWS = [
    { name: 'Milanu Store', role: 'Store owner · WooCommerce', rating: 5, date: '2026-08-14',
      text: 'Sazzad bhai built this for our shop — customers now watch the reel and add to cart in the same minute. Time-on-page almost doubled and the floating video on product pages is pure magic.', badge: 'Verified client' },
    { name: 'Tanvir Ahmed', role: 'WordPress freelancer', rating: 5, date: '2026-08-29',
      text: 'Installed it on a client store in under 10 minutes. The Manage Reels screen is cleaner than plugins I pay $79 for, and the AJAX save means I never lose my place in the admin.', badge: '' },
    { name: 'Nusrat Jahan', role: 'Elementor designer', rating: 4, date: '2026-09-10',
      text: 'The widget exposes every control I need — colours, card size, scroll speed — right in the Elementor panel. Would love a grid layout next, but for reels this is the best free option.', badge: '' },
  ];
  const revList = $('#revList'), revForm = $('#revForm');
  let myRating = 0;
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const loadReviews = () => {
    try { const raw = localStorage.getItem(REV_KEY); if (raw) return JSON.parse(raw); } catch (e) { /* private mode */ }
    return SEED_REVIEWS;
  };
  const starStr = (n) => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  const renderReviews = () => {
    const list = loadReviews();
    const avg = list.reduce((a, r) => a + (+r.rating || 0), 0) / (list.length || 1);
    $('#revAvg').textContent = avg.toFixed(1);
    $('#revStars').textContent = starStr(Math.round(avg));
    $('#revCount').textContent = `${list.length} review${list.length === 1 ? '' : 's'}`;
    revList.innerHTML = list.map((r) => `
      <article class="rev-card">
        <div class="rev-head">
          <span class="rev-ava">${esc((r.name || '?').trim().charAt(0).toUpperCase())}</span>
          <div><b>${esc(r.name)}${r.badge ? `<span class="rev-badge">${esc(r.badge)}</span>` : ''}</b>
          <small>${esc(r.role || 'User')} · ${esc(r.date || '')}</small></div>
          <span class="rev-stars" title="${r.rating} out of 5">${starStr(+r.rating)}</span>
        </div>
        <p>${esc(r.text)}</p>
      </article>`).join('');
  };
  // star picker
  $$('#starPick button').forEach(b => {
    b.addEventListener('click', () => {
      myRating = +b.dataset.v;
      $$('#starPick button').forEach(x => x.classList.toggle('on', +x.dataset.v <= myRating));
    });
  });
  revForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#revName').value.trim();
    const text = $('#revText').value.trim();
    if (!name || !text || !myRating) { showToast('⚠️', 'Please add your name, a rating and a few words.'); return; }
    const list = loadReviews();
    list.unshift({ name, role: 'Case-study visitor', rating: myRating, text, date: new Date().toISOString().slice(0, 10), badge: 'New' });
    try { localStorage.setItem(REV_KEY, JSON.stringify(list)); } catch (err) { /* ignore */ }
    renderReviews();
    revForm.reset();
    myRating = 0;
    $$('#starPick button').forEach(x => x.classList.remove('on'));
    showToast('💖', 'Review published — dhonnobad, ' + name + '!');
  });
  renderReviews();

  /* ---------- Cursor glow ---------- */
  const glow = $('#cursorGlow');
  if (finePointer && !reduceMotion && glow) {
    let gx = innerWidth / 2, gy = innerHeight / 2, cx = gx, cy = gy;
    addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; });
    const loop = () => {
      cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
      glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
      requestAnimationFrame(loop);
    };
    loop();
  }
})();
