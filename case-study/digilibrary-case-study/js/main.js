/* ============================================================
   DIGILIBRARY — CASE STUDY · main.js
   Mobile-first interactions, 3D effects, AJAX data layer
   Author: developersazzad (Sazzad Hossain)
   ============================================================ */
(function () {
  "use strict";
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Preloader ---------- */
  window.addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), 450));
  setTimeout(() => $("#loader").classList.add("done"), 3500); // safety

  /* ---------- 2. Theme toggle (light / dark) ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("dl-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  $("#theme-btn").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("dl-theme", next);
  });

  /* ---------- 3. Mobile menu + active link ---------- */
  const menuBtn = $("#menu-btn");
  menuBtn.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  $$(".mobile-menu a, .nav-links a").forEach(a =>
    a.addEventListener("click", () => document.body.classList.remove("menu-open"))
  );
  const secObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const id = "#" + e.target.id;
      $$(".nav-links a, .mobile-menu a").forEach(a =>
        a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => secObs.observe(s));

  /* ---------- 4. Scroll progress + back-to-top ---------- */
  const progress = $("#progress"), topBtn = $("#top-btn");
  addEventListener("scroll", () => {
    const h = document.documentElement;
    progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
    topBtn.classList.toggle("show", h.scrollTop > 700);
  }, { passive: true });
  topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ---------- 5. Hero starfield canvas ---------- */
  const cv = $("#stars");
  if (cv && !reduceMotion) {
    const ctx = cv.getContext("2d");
    let stars = [], W, H, running = true;
    const size = () => {
      W = cv.width = cv.offsetWidth * devicePixelRatio;
      H = cv.height = cv.offsetHeight * devicePixelRatio;
      stars = Array.from({ length: Math.min(70, Math.floor(W / 22)) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        z: Math.random() * .7 + .3, r: Math.random() * 1.6 + .4
      }));
    };
    size(); addEventListener("resize", size);
    new IntersectionObserver(e => running = e[0].isIntersecting).observe(cv);
    (function tick() {
      if (running) {
        ctx.clearRect(0, 0, W, H);
        for (const s of stars) {
          s.y -= .12 * s.z * devicePixelRatio;
          if (s.y < 0) s.y = H;
          ctx.globalAlpha = .25 + s.z * .55;
          ctx.fillStyle = s.z > .75 ? "#8ef0ff" : "#b9aefe";
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * devicePixelRatio, 0, 7); ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------- 6. Parallax (mouse + mobile gyroscope) ---------- */
  const scene = $(".book-stage");
  if (scene && !reduceMotion) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const apply = () => {
      cx += (tx - cx) * .06; cy += (ty - cy) * .06;
      scene.style.transform = `translateY(${cy}px) translateX(${cx}px)`;
      requestAnimationFrame(apply);
    };
    addEventListener("mousemove", e => {
      tx = (e.clientX / innerWidth - .5) * 26;
      ty = (e.clientY / innerHeight - .5) * 18;
    }, { passive: true });
    addEventListener("deviceorientation", e => {
      if (e.gamma == null) return;
      tx = Math.max(-30, Math.min(30, e.gamma)) * .8;
      ty = Math.max(-30, Math.min(30, e.beta - 45)) * .5;
    }, { passive: true });
    apply();
  }

  /* ---------- 7. 3D tilt cards ---------- */
  if (!reduceMotion && matchMedia("(pointer:fine)").matches) {
    $$("[data-tilt]").forEach(el => {
      const max = parseFloat(el.dataset.tilt || 8);
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(.5 - py) * max}deg) rotateY(${(px - .5) * max}deg) translateY(-4px)`;
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- 8. Reveal on scroll ---------- */
  const revObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); }
  }), { threshold: .15 });
  $$(".reveal").forEach(el => revObs.observe(el));

  /* ---------- 9. Animated counters ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || 0);
    const suf = el.dataset.suffix || "", t0 = performance.now(), dur = 1600;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  const cntObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { countUp(e.target); cntObs.unobserve(e.target); }
  }), { threshold: .6 });

  /* ---------- 10. Tabs ---------- */
  $$(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
    $$(".tab-btn").forEach(b => b.setAttribute("aria-selected", b === btn));
    $$(".tab-panel").forEach(p => p.classList.toggle("on", p.id === btn.dataset.panel));
  }));

  /* ---------- 11. AJAX console (live demo widget) ---------- */
  const conBody = $("#console-body");
  function log(type, url, extra, json) {
    if (!conBody) return;
    const line = document.createElement("div");
    line.className = "cl";
    const t = new Date().toTimeString().slice(0, 8);
    line.innerHTML = `<span class="m ${type}">${type.toUpperCase()}</span><span class="u">${url}</span>` +
      (extra ? `<span class="m ok">${extra}</span>` : "") + `<span class="t">${t}</span>` +
      (json ? `<span class="j">${json}</span>` : "");
    conBody.appendChild(line);
    conBody.scrollTop = conBody.scrollHeight;
  }
  const ajaxDemo = {
    stats() {
      log("get", "/api/stats.php");
      setTimeout(() => log("ok", "200 · 41 ms", "", JSON.stringify(DATA?.stats?.slice(0, 2).map(s => ({ label: s.label, value: s.value })) || [])), 420);
    },
    search() {
      log("get", "/api/books.php?search=masters&page=1");
      setTimeout(() => log("ok", "200 · 87 ms", "", JSON.stringify((DATA?.books || []).filter(b => /masters/i.test(b.cat)).map(b => b.title))), 480);
    },
    request() {
      log("post", "/api/requests.php  {book_id:12, student_id:4}");
      setTimeout(() => log("ok", "201 · 63 ms", "", '{"status":"requested","notify":"admin + staff alerted"}'), 460);
    },
    mail() {
      log("post", "/api/mail.php · {to: student@bcet.edu, tpl: book_approved}");
      setTimeout(() => log("ok", "200 · 312 ms", "", '{"smtp":"smtp.gmail.com:587","result":"queued → sent"}'), 640);
    }
  };
  $$(".console-actions [data-demo]").forEach(b => b.addEventListener("click", () => ajaxDemo[b.dataset.demo]()));

  /* ---------- 12. AJAX data layer: fetch JSON → render UI ---------- */
  let DATA = window.PROJECT_DATA || null;
  const imgSrc = key => (window.IMG_MAP && window.IMG_MAP[key]) || ("assets/img/" + key + ".jpg");

  function renderStats() {
    const box = $("#stat-grid");
    if (!box || !DATA) return;
    box.innerHTML = DATA.stats.map((s, i) => `
      <div class="card stat-card glow-line reveal d${i % 4}" data-tilt="6">
        <div class="glare"></div>
        <strong class="tz" data-count="${s.value}" data-dec="${s.dec}" data-suffix="${s.suffix}">0</strong>
        <span>${s.label}</span><small>${s.note}</small>
      </div>`).join("");
    $$("#stat-grid [data-count]").forEach(el => cntObs.observe(el));
    $$("#stat-grid .reveal").forEach(el => revObs.observe(el));
    if (!reduceMotion && matchMedia("(pointer:fine)").matches) bindTiltLate();
  }

  function bindTiltLate() {
    $$("#stat-grid [data-tilt]").forEach(el => {
      const max = parseFloat(el.dataset.tilt || 8);
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(.5 - py) * max}deg) rotateY(${(px - .5) * max}deg) translateY(-4px)`;
        el.style.setProperty("--mx", px * 100 + "%"); el.style.setProperty("--my", py * 100 + "%");
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  function renderGallery() {
    const flow = $("#flow");
    if (!flow || !DATA) return;
    flow.innerHTML = DATA.gallery.map((g, i) => `
      <figure class="flow-card" data-i="${i}">
        <span class="chip p tag">${g.tag}</span>
        <img src="${imgSrc(g.img)}" alt="${g.title} — Digilibrary digital library management system screenshot" loading="lazy">
        <figcaption class="fc-meta"><b>${g.title}</b><p>${g.cap}</p></figcaption>
      </figure>`).join("");
    coverflow();
    flow.addEventListener("scroll", () => requestAnimationFrame(coverflow), { passive: true });
    addEventListener("resize", coverflow);
    $$(".flow-card", flow).forEach(c => c.addEventListener("click", () => openLightbox(+c.dataset.i)));
  }

  /* 3D coverflow math */
  function coverflow() {
    const flow = $("#flow"); if (!flow) return;
    const center = flow.scrollLeft + flow.clientWidth / 2;
    $$(".flow-card", flow).forEach(card => {
      const cc = card.offsetLeft + card.offsetWidth / 2;
      const d = (cc - center) / card.offsetWidth;
      const rot = Math.max(-38, Math.min(38, d * -34));
      const z = -Math.min(1.6, Math.abs(d)) * 130;
      card.style.transform = `rotateY(${rot}deg) translateZ(${z}px) scale(${1 - Math.min(.18, Math.abs(d) * .12)})`;
      card.style.opacity = Math.abs(d) > 2.1 ? .25 : 1;
      card.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
    });
  }

  /* lightbox */
  const lb = $("#lightbox");
  let lbIndex = 0;
  function openLightbox(i) {
    if (!DATA) return;
    lbIndex = (i + DATA.gallery.length) % DATA.gallery.length;
    const g = DATA.gallery[lbIndex];
    $("#lb-img").src = imgSrc(g.img);
    $("#lb-img").alt = g.title;
    $("#lb-cap").innerHTML = `<b>${g.title}</b> — ${g.cap}`;
    lb.classList.add("on");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() { lb.classList.remove("on"); document.body.style.overflow = ""; }
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", e => { e.stopPropagation(); openLightbox(lbIndex - 1); });
  $("#lb-next").addEventListener("click", e => { e.stopPropagation(); openLightbox(lbIndex + 1); });
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
    if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
  });
  /* static .shot figures also open lightbox by image key */
  $$("[data-shot]").forEach(f => f.addEventListener("click", () => {
    const i = (DATA?.gallery || []).findIndex(g => g.img === f.dataset.shot);
    if (i > -1) openLightbox(i);
  }));

  /* real AJAX fetch with graceful embedded fallback */
  (function loadData() {
    const t0 = performance.now();
    fetch("data/project.json", { cache: "no-store" })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(json => {
        DATA = json;
        log("get", "data/project.json", `200 · ${Math.round(performance.now() - t0)} ms · real fetch`);
        hydrate();
      })
      .catch(() => {
        DATA = DATA || window.PROJECT_DATA;
        log("sys", "embedded cache", "offline / single-file mode");
        hydrate();
      });
    function hydrate() { renderStats(); renderGallery(); }
  })();

  /* ---------- 13. Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
