/* ============================================================
   SystemEasy smooth video player
   Custom professional shell over the official YouTube IFrame API
   (dependency: https://www.youtube.com/iframe_api — loaded on demand).
   Features: poster facade (fast load), custom controls (play/pause,
   seek, volume, mute, speed, fullscreen), chapter playlist with
   auto-next, keyboard shortcuts, automatic host retry on player
   error (www -> nocookie) and a graceful "watch on YouTube" card.
   Author: Sazzad Hossain (@developersazzad)
   ============================================================ */
(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };

  var shell = $("#playerShell");
  if (!shell) return;                     /* only on tutorials page */

  var stage = $("#stage"), hostWrap = $("#hostWrap"), poster = $("#poster"),
      posterImg = $("#posterImg"), posterTitle = $("#posterTitle"),
      errCard = $("#playerError"), errCode = $("#errCode"),
      btnPlay = $("#btnPlay"), btnMute = $("#btnMute"), btnFS = $("#btnFS"),
      seek = $("#seek"), vol = $("#vol"), speed = $("#speed"),
      tCur = $("#tCur"), tDur = $("#tDur"), autoNext = $("#autoNext"),
      btnYT = $("#btnYT"), errYT = $("#errYT"), npTitle = $("#npTitle");

  var items = Array.prototype.slice.call(document.querySelectorAll("#chapList a[data-video]"));
  var VIDEOS = items.map(function (a) {
    return { id: a.getAttribute("data-video"), title: a.getAttribute("data-title"), el: a };
  });

  var player = null, ready = false, apiLoading = false, pendingPlay = false,
      current = 0, seeking = false, nocookie = false, ticker = null;

  function fmt(s) {
    s = Math.max(0, Math.round(s || 0));
    var m = Math.floor(s / 60), r = s % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }
  function thumb(id, hq) {
    return "https://i.ytimg.com/vi/" + id + "/" + (hq ? "hqdefault" : "maxresdefault") + ".jpg";
  }
  function watchUrl(i) {
    return "https://www.youtube.com/watch?v=" + VIDEOS[i].id +
           "&list=PLZ9xgaZ2Fc9oyiI9m-ZMmn6f8yPNabNCd&index=" + (i + 1);
  }

  /* ---------- UI state ---------- */
  function paintChapter(i) {
    current = i;
    poster.hidden = false;           /* branded cover for the new chapter */
    items.forEach(function (a, k) { a.classList.toggle("active", k === i); });
    if (npTitle) npTitle.textContent = VIDEOS[i].title;
    if (btnYT) btnYT.href = watchUrl(i);
    if (errYT) errYT.href = watchUrl(i);
    posterTitle.textContent = VIDEOS[i].title;
    posterImg.onerror = function () { this.src = thumb(VIDEOS[i].id, true); };
    posterImg.src = thumb(VIDEOS[i].id, false);
  }
  function setPlayIcon(playing) {
    btnPlay.textContent = playing ? "❚❚" : "▶";
    btnPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  /* ---------- YouTube IFrame API ---------- */
  function loadAPI() {
    if (apiLoading || window.YT && window.YT.Player) return;
    apiLoading = true;
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onload = function () { /* onYouTubeIframeAPIReady fires from API */ };
    document.head.appendChild(tag);
  }
  window.onYouTubeIframeAPIReady = function () {
    apiLoading = false;
    buildPlayer(VIDEOS[current].id, pendingPlay);
  };

  function freshHost() {
    hostWrap.innerHTML = "";
    var d = document.createElement("div");
    d.id = "ytHost";
    hostWrap.appendChild(d);
  }
  function buildPlayer(id, autoplay) {
    freshHost();
    player = new YT.Player("ytHost", {
      videoId: id,
      host: nocookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com",
      playerVars: {
        autoplay: autoplay ? 1 : 0, rel: 0, playsinline: 1, modestbranding: 1,
        controls: 0, disablekb: 1, iv_load_policy: 3, fs: 0, cc_load_policy: 0
      },
      events: { onReady: onReady, onStateChange: onState, onError: onError }
    });
  }
  function onReady() {
    ready = true;
    /* keep the branded poster up: it hides YouTube's own pre-play chrome */
    errCard.hidden = true;
    tDur.textContent = fmt(player.getDuration());
    if (vol) player.setVolume(parseInt(vol.value, 10));
    setPlayIcon(player.getPlayerState() === 1);
    if (!ticker) ticker = setInterval(tick, 400);
  }
  function onState(e) {
    if (e.data === YT.PlayerState.PLAYING) {
      setPlayIcon(true);
      poster.hidden = true;          /* real playback started → reveal player */
      errCard.hidden = true;
      tDur.textContent = fmt(player.getDuration());
    }
    else if (e.data === YT.PlayerState.PAUSED) setPlayIcon(false);
    else if (e.data === YT.PlayerState.ENDED) {
      setPlayIcon(false);
      if (autoNext && autoNext.checked && current < VIDEOS.length - 1) playIndex(current + 1, true);
      else poster.hidden = false;    /* ended without auto-next → show poster again */
    }
  }
  function onError(e) {
    /* one silent retry on the alternate host, then a graceful card */
    if (!nocookie) {
      nocookie = true;
      if (player && player.destroy) { try { player.destroy(); } catch (x) {} }
      ready = false;
      buildPlayer(VIDEOS[current].id, true);
      return;
    }
    if (errCode) errCode.textContent = String(e.data);
    errCard.hidden = false;
    poster.hidden = true;
  }
  function tick() {
    if (!ready || seeking) return;
    var d = player.getDuration() || 0, c = player.getCurrentTime() || 0;
    tCur.textContent = fmt(c);
    if (d) seek.value = Math.round((c / d) * 1000);
  }

  /* ---------- commands ---------- */
  function playIndex(i, autoplay) {
    i = Math.max(0, Math.min(VIDEOS.length - 1, i));
    paintChapter(i);
    errCard.hidden = true;
    if (ready && player && player.loadVideoById) {
      if (autoplay) player.loadVideoById(VIDEOS[i].id);
      else player.cueVideoById(VIDEOS[i].id);
    } else {
      pendingPlay = !!autoplay;
      poster.hidden = false;
      loadAPI();
    }
  }
  function toggle() {
    if (!ready) { poster.hidden = false; pendingPlay = true; loadAPI(); if (player && player.playVideo) player.playVideo(); return; }
    if (player.getPlayerState() === 1) player.pauseVideo(); else player.playVideo();
  }

  /* ---------- wiring ---------- */
  poster.addEventListener("click", function () {
    pendingPlay = true;
    errCard.hidden = true;
    if (ready && player) { player.playVideo(); poster.hidden = true; }
    else loadAPI();
  });
  btnPlay.addEventListener("click", toggle);
  btnMute.addEventListener("click", function () {
    if (!ready) return;
    if (player.isMuted()) { player.unMute(); btnMute.textContent = "🔊"; }
    else { player.mute(); btnMute.textContent = "🔇"; }
  });
  vol.addEventListener("input", function () { if (ready) { player.setVolume(parseInt(vol.value, 10)); if (player.isMuted() && vol.value > 0) { player.unMute(); btnMute.textContent = "🔊"; } } });
  speed.addEventListener("change", function () { if (ready) player.setPlaybackRate(parseFloat(speed.value)); });
  seek.addEventListener("input", function () { seeking = true; });
  seek.addEventListener("change", function () {
    if (ready) { var d = player.getDuration() || 0; player.seekTo((seek.value / 1000) * d, true); }
    seeking = false;
  });
  btnFS.addEventListener("click", function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (shell.requestFullscreen) shell.requestFullscreen();
  });
  items.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      playIndex(i, true);
      shell.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
  $("#errRetry").addEventListener("click", function () {
    errCard.hidden = true; nocookie = false; ready = false;
    if (player && player.destroy) { try { player.destroy(); } catch (x) {} }
    pendingPlay = true; loadAPI();
  });
  $("#errYT").addEventListener("click", function () { /* normal link */ });

  document.addEventListener("keydown", function (e) {
    var t = e.target.tagName;
    if (t === "INPUT" || t === "SELECT" || t === "TEXTAREA" || e.target.isContentEditable) return;
    if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
    else if (e.key === "m") btnMute.click();
    else if (e.key === "f") btnFS.click();
    else if (e.key === "ArrowRight" && ready) player.seekTo(player.getCurrentTime() + 5, true);
    else if (e.key === "ArrowLeft" && ready) player.seekTo(Math.max(0, player.getCurrentTime() - 5), true);
  });

  paintChapter(0);
  setPlayIcon(false);
})();
