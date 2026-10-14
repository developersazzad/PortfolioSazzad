/* ============================================================
   SystemEasy — interactions: 3D tilt, scroll reveal, lightbox,
   mobile menu, auto year.
   Author: Sazzad Hossain (@developersazzad)
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- mobile menu ---- */
    var burger = document.querySelector(".burger");
    var menu = document.querySelector(".mobile-menu");
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.addEventListener("click", function (e) {
        if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
      });
    }

    /* ---- 3D tilt on cards (desktop / fine pointer only) ---- */
    if (!reduce && !coarse) {
      var tilts = document.querySelectorAll("[data-tilt]");
      Array.prototype.forEach.call(tilts, function (el) {
        var max = parseFloat(el.getAttribute("data-tilt") || "7");
        el.style.transition = "transform .18s ease, border-color .25s";
        el.addEventListener("pointermove", function (ev) {
          var r = el.getBoundingClientRect();
          var px = (ev.clientX - r.left) / r.width - 0.5;
          var py = (ev.clientY - r.top) / r.height - 0.5;
          el.style.transform = "perspective(900px) rotateY(" + (px * max).toFixed(2) + "deg) rotateX(" + (-py * max).toFixed(2) + "deg) translateY(-4px)";
        });
        el.addEventListener("pointerleave", function () {
          el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)";
        });
      });
    }

    /* ---- reveal on scroll ---- */
    if (!reduce && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".rv").forEach(function (el) { el.classList.add("in"); });
    }

    /* ---- lightbox ---- */
    var lb = document.querySelector(".lightbox");
    if (lb) {
      var lbImg = lb.querySelector("img");
      var lbCap = lb.querySelector(".cap2");
      document.querySelectorAll(".gitem[data-full]").forEach(function (g) {
        g.addEventListener("click", function () {
          lbImg.src = g.getAttribute("data-full");
          lbImg.alt = g.getAttribute("data-alt") || "";
          if (lbCap) lbCap.textContent = g.getAttribute("data-cap") || "";
          lb.classList.add("open");
          document.body.style.overflow = "hidden";
        });
      });
      lb.addEventListener("click", function (e) {
        if (e.target === lb || e.target.classList.contains("x")) {
          lb.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lb.classList.contains("open")) {
          lb.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
    }

    /* ---- in-page YouTube chapter player (avoids videoseries Error 153) ---- */
    var player = document.getElementById("ytPlayer");
    if (player) {
      document.querySelectorAll("[data-video]").forEach(function (a) {
        a.addEventListener("click", function (e) {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; /* modifier-click = open YouTube */
          e.preventDefault();
          var id = a.getAttribute("data-video");
          player.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
          var np = document.getElementById("npTitle");
          var title = a.getAttribute("data-title");
          if (np && title) np.textContent = title;
          var frame = player.closest(".video-frame");
          if (frame) frame.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        });
      });
    }

    /* ---- auto year ---- */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  });
})();
