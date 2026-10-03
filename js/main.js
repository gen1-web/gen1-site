/* GEN1 SOLUTIONS - homepage interactions */
(function(){
  var D = (window.DESIGNS || []).filter(function(d){ return !d.pages; }), R = window.REELS || [], W = window.WEBSITES || [], S = window.SITE || {};
  var RB = window.REELS_BASE || "";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function(s, c){ return (c || document).querySelector(s); };
  var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function(s){ return String(s || "").replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  var DIR = "designs/";

  /* ---------- Preloader ---------- */
  function done(){ document.body.classList.remove("is-loading"); document.documentElement.classList.add("loaded"); document.body.classList.add("loaded"); startCounters(); }
  window.addEventListener("load", function(){ setTimeout(done, reduce ? 0 : 900); });
  setTimeout(done, 3500); // safety net on slow connections

  /* ---------- Contact links ---------- */
  $("#year").textContent = new Date().getFullYear();
  if (S.whatsapp) $("#wa").href = "https://wa.me/" + String(S.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent("Assalamu alaikum Gen1, I'd like to discuss a project.");
  if (S.email) $("#mail").href = "mailto:" + S.email;
  [["#ig", S.instagram], ["#li", S.linkedin], ["#fb", S.facebook]].forEach(function(p){ var a = $(p[0]); if (p[1]) a.href = p[1]; else a.remove(); });

  /* ---------- Hero: rotating word ---------- */
  var words = $$("#rotator b"), wi = 0;
  words[0].classList.add("on");
  if (!reduce) setInterval(function(){
    var cur = words[wi]; wi = (wi + 1) % words.length; var nxt = words[wi];
    cur.classList.remove("on"); cur.classList.add("out");
    nxt.classList.remove("out"); nxt.classList.add("on");
    setTimeout(function(){ cur.classList.remove("out"); }, 700);
  }, 2200);

  /* ---------- Hero: counters ---------- */
  var sd = $("#statDesigns"); if (sd && D.length) sd.setAttribute("data-count", D.length);
  function startCounters(){
    $$("[data-count]").forEach(function(el){
      var end = +el.getAttribute("data-count"), t0 = null, dur = reduce ? 1 : 1600;
      function tick(t){ if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); }
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Hero: 3D design wall ---------- */
  var wall = $("#wall");
  if (wall && D.length) {
    for (var c = 0; c < 4; c++) {
      var col = document.createElement("div");
      col.className = "col" + (c % 2 ? " down" : "");
      col.style.setProperty("--t", (55 + c * 9) + "s");
      var pick = D.filter(function(_, i){ return i % 4 === c; });
      var html = pick.map(function(d){ return '<img src="' + DIR + d.src + '" alt="" loading="' + (c < 2 ? "eager" : "lazy") + '" decoding="async">'; }).join("");
      col.innerHTML = html + html; // doubled for a seamless loop
      wall.append(col);
    }
  }

  /* ---------- Client logos ---------- */
  var logos = $("#logos");
  if (logos) {
    var lh = "";
    for (var i = 1; i <= 19; i++) lh += '<img src="assets/clients/c' + (i < 10 ? "0" + i : i) + '.png" alt="" loading="lazy">';
    logos.innerHTML = lh + lh;
  }

  /* ---------- Designs: two marquee rows driven by scroll ---------- */
  var rows = $$(".row");
  var half = Math.ceil(D.length / 2);
  var rowState = rows.map(function(row, r){
    var list = r === 0 ? D.slice(0, half) : D.slice(half);
    var track = $(".row-track", row);
    var html = list.map(function(d){
      var idx = D.indexOf(d);
      return '<figure class="dcard" tabindex="0" role="button" data-i="' + idx + '" aria-label="View ' + esc(d.title) + '">' +
             '<img src="' + DIR + d.src + '" alt="' + esc(d.title) + '" loading="lazy" decoding="async">' +
             '<figcaption><b>' + esc(d.title) + '</b><span>' + esc(d.client) + '</span></figcaption></figure>';
    }).join("");
    track.innerHTML = html + html + html;
    var st = { track: track, x: 0, base: parseFloat(row.getAttribute("data-speed")) || .5, hover: false, w: 0 };
    row.addEventListener("mouseenter", function(){ st.hover = true; });
    row.addEventListener("mouseleave", function(){ st.hover = false; });
    return st;
  });
  function measure(){ rowState.forEach(function(st){ st.w = st.track.scrollWidth / 3; if (st.base < 0 && st.x === 0) st.x = -st.w; }); }
  window.addEventListener("load", measure); window.addEventListener("resize", measure); measure();

  var lastY = window.scrollY, vel = 0;
  function loop(){
    var y = window.scrollY, dy = y - lastY; lastY = y;
    vel += (dy - vel) * .1;
    rowState.forEach(function(st){
      if (!st.w) return;
      var boost = Math.max(-18, Math.min(18, vel * .35));
      var speed = st.hover ? 0 : (st.base + boost * Math.sign(st.base || 1));
      st.x -= speed;
      if (st.x <= -st.w * 2) st.x += st.w;
      if (st.x > 0) st.x -= st.w;
      st.track.style.transform = "translate3d(" + st.x.toFixed(2) + "px,0,0)";
    });
    requestAnimationFrame(loop);
  }
  if (!reduce) requestAnimationFrame(loop);
  else rowState.forEach(function(st){ st.track.parentNode.style.overflowX = "auto"; });

  /* ---------- Videos: phone mockups ---------- */
  var phones = $("#phones");
  var playIcon = '<span class="pbtn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></span>';
  R.slice(0, 3).forEach(function(r, i){
    var p = document.createElement("button");
    p.className = "phone reveal";
    p.setAttribute("aria-label", "Play " + r.title);
    p.innerHTML = '<div class="phone-screen"><div class="phone-notch"></div>' +
      '<img src="' + RB + r.poster + '" alt="" loading="lazy">' +
      '<video muted loop playsinline preload="none" src="' + RB + r.file + '"></video>' +
      '<div class="phone-meta"><div><span>' + esc(r.tag) + '</span><b>' + esc(r.title) + '</b></div>' + playIcon + '</div></div>';
    p.addEventListener("click", function(){ openBox("reel", i); });
    phones.append(p);
  });
  if ("IntersectionObserver" in window && !reduce) {
    var vio = new IntersectionObserver(function(es){
      es.forEach(function(e){ var v = $("video", e.target); if (e.isIntersecting) { v.play().catch(function(){}); } else v.pause(); });
    }, { threshold: .55 });
    $$(".phone").forEach(function(p){ vio.observe(p); });
  }
  if (fine && !reduce) {
    $$(".phone").forEach(function(p){
      var base = getComputedStyle(p).transform;
      p.addEventListener("mousemove", function(e){
        var b = p.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
        p.style.transform = "rotateY(" + (x * 18) + "deg) rotateX(" + (-y * 14) + "deg) translateZ(30px)";
      });
      p.addEventListener("mouseleave", function(){ p.style.transform = ""; });
    });
  }

  /* ---------- Websites ---------- */
  var sites = $("#sites");
  var arrow = '<span class="site-go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
  W.forEach(function(s){
    var el = document.createElement(s.url ? "a" : "div");
    el.className = "site reveal";
    if (s.url) { el.href = s.url; el.target = "_blank"; el.rel = "noopener"; }
    var host = s.url ? s.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : s.title.toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com";
    var view = s.image ? '<img src="' + s.image + '" alt="' + esc(s.title) + ' website" loading="lazy">'
                       : '<div class="site-ph"><div><b>' + esc(s.title) + '</b><span>Screenshot coming soon</span></div></div>';
    el.innerHTML = '<div class="site-bar"><i></i><i></i><i></i><span>' + esc(host) + '</span></div>' +
                   '<div class="site-view">' + view + '</div>' +
                   '<div class="site-info"><div><b>' + esc(s.title) + '</b><span>' + esc(s.type) + '</span></div>' + arrow + '</div>';
    sites.append(el);
  });

  /* ---------- Services: hover image follows cursor ---------- */
  var prev = $("#svcPreview"), pimg = $("img", prev);
  if (fine && !reduce) {
    var px = 0, py = 0, tx = 0, ty = 0;
    $$(".svc").forEach(function(s){
      s.addEventListener("mouseenter", function(){ pimg.src = s.getAttribute("data-img"); prev.classList.add("on"); });
      s.addEventListener("mouseleave", function(){ prev.classList.remove("on"); });
    });
    document.addEventListener("mousemove", function(e){ tx = e.clientX + 30; ty = e.clientY - 110; });
    (function follow(){ px += (tx - px) * .14; py += (ty - py) * .14; prev.style.left = px + "px"; prev.style.top = py + "px"; requestAnimationFrame(follow); })();
  }

  /* ---------- Cursor + magnetic buttons ---------- */
  if (fine && !reduce) {
    var cur = $("#cursor"), cx = innerWidth / 2, cy = innerHeight / 2, mx = cx, my = cy;
    document.addEventListener("mousemove", function(e){ mx = e.clientX; my = e.clientY; });
    (function move(){ cx += (mx - cx) * .22; cy += (my - cy) * .22; cur.style.transform = "translate(" + cx + "px," + cy + "px)"; requestAnimationFrame(move); })();
    document.addEventListener("mouseover", function(e){ cur.classList.toggle("big", !!e.target.closest("a,button,.dcard,.phone")); });
    $$(".magnetic").forEach(function(b){
      b.addEventListener("mousemove", function(e){ var r = b.getBoundingClientRect(); b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * .25) + "px," + ((e.clientY - r.top - r.height / 2) * .35) + "px)"; });
      b.addEventListener("mouseleave", function(){ b.style.transform = ""; });
    });
  }

  /* ---------- Nav: hide on scroll down, mobile menu ---------- */
  var nav = $("#nav"), ly = 0;
  window.addEventListener("scroll", function(){
    var y = window.scrollY;
    nav.classList.toggle("hide", y > ly && y > 300 && !$("#mnav").classList.contains("open"));
    ly = y;
  }, { passive: true });
  var burger = $("#burger"), mnav = $("#mnav");
  burger.addEventListener("click", function(){
    var open = mnav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("a", mnav).forEach(function(a){ a.addEventListener("click", function(){ mnav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }); });

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } }); }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function(el){ rio.observe(el); });
  } else $$(".reveal").forEach(function(el){ el.classList.add("in"); });

  /* ---------- Lightbox (designs + reels) ---------- */
  var box = $("#lightbox"), media = $("#lbMedia"), cap = $("#lbCap"), mode = "design", idx = 0;
  function render(){
    media.innerHTML = "";
    if (mode === "design") {
      var d = D[idx], img = new Image();
      img.src = DIR + d.src.replace(".jpg", "-lg.jpg"); img.alt = d.title;
      media.append(img);
      cap.innerHTML = "<b>" + esc(d.title) + "</b>" + esc(d.client);
    } else {
      var r = R[idx], v = document.createElement("video");
      v.src = RB + r.file; v.poster = RB + r.poster; v.controls = true; v.autoplay = true; v.playsInline = true;
      media.append(v);
      cap.innerHTML = "<b>" + esc(r.title) + "</b>" + esc(r.tag);
    }
  }
  function openBox(m, i){ mode = m; idx = i; render(); if (!box.open) box.showModal(); }
  function step(n){ var len = mode === "design" ? D.length : R.length; idx = (idx + n + len) % len; render(); }
  document.addEventListener("click", function(e){ var c = e.target.closest(".dcard"); if (c) openBox("design", +c.getAttribute("data-i")); });
  document.addEventListener("keydown", function(e){
    var c = document.activeElement && document.activeElement.closest && document.activeElement.closest(".dcard");
    if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openBox("design", +c.getAttribute("data-i")); }
    if (!box.open) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  $("#lbPrev").addEventListener("click", function(){ step(-1); });
  $("#lbNext").addEventListener("click", function(){ step(1); });
  $("#lbClose").addEventListener("click", function(){ box.close(); });
  box.addEventListener("click", function(e){ if (e.target === box) box.close(); });
  box.addEventListener("close", function(){ media.innerHTML = ""; });
})();
/* Protect videos: no right-click save, no download button, no picture-in-picture */
(function(){
  function lock(v){ v.setAttribute("controlsList", "nodownload noremoteplayback noplaybackrate"); v.setAttribute("disablePictureInPicture", ""); v.disablePictureInPicture = true; }
  document.querySelectorAll("video").forEach(lock);
  new MutationObserver(function(ms){ ms.forEach(function(m){ m.addedNodes.forEach(function(n){ if (n.nodeType !== 1) return; if (n.tagName === "VIDEO") lock(n); else if (n.querySelectorAll) n.querySelectorAll("video").forEach(lock); }); }); }).observe(document.body, { childList: true, subtree: true });
  document.addEventListener("contextmenu", function(e){ if (e.target.closest && e.target.closest("video,.phone,.rcard,.lb-media")) e.preventDefault(); }, true);
})();
