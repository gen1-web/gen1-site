/* GEN1 SOLUTIONS - Videos page. Data: REELS and FILMS in data.js (add a line there to add a video). */
(function(){
  var R = window.REELS || [], F = window.FILMS || [], PR = window.PROMOS || [], S = window.SITE || {}, RB = window.REELS_BASE || "";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function(s, c){ return (c || document).querySelector(s); };
  var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function(s){ return String(s || "").replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  var playIcon = '<span class="pbtn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></span>';

  /* Contacts */
  $("#year").textContent = new Date().getFullYear();
  if (S.whatsapp) $("#wa").href = "https://wa.me/" + String(S.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent("Assalamu alaikum Gen1, I saw your videos and I'd like to discuss a project.");
  if (S.email) $("#mail").href = "mailto:" + S.email;
  [["#ig", S.instagram], ["#li", S.linkedin], ["#fb", S.facebook]].forEach(function(p){ var a = $(p[0]); if (!a) return; if (p[1]) a.href = p[1]; else a.remove(); });

  /* Counters */
  [["#cReels", R.length], ["#cFilms", F.length]].forEach(function(p){
    var el = $(p[0]), end = p[1], t0 = null, dur = reduce ? 1 : 1400;
    setTimeout(function(){ requestAnimationFrame(function tick(t){ if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); }); }, 400);
  });

  /* Reveal */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: "0px 0px -30px 0px" }) : null;
  function watch(el){ if (io && !reduce) io.observe(el); else el.classList.add("in"); }
  $$(".reveal").forEach(watch);

  /* ---------- Lightbox ---------- */
  var box = $("#lightbox"), media = $("#lbMedia"), cap = $("#lbCap"), list = [], idx = 0;
  function render(){
    media.innerHTML = "";
    var it = list[idx], v = document.createElement("video");
    v.src = it.file; v.poster = it.poster || ""; v.controls = true; v.autoplay = true; v.playsInline = true;
    v.setAttribute("controlsList", "nodownload noremoteplayback"); v.disablePictureInPicture = true;
    media.append(v);
    cap.innerHTML = "<b>" + esc(it.title) + "</b>" + esc(it.tag) + (list.length > 1 ? " &middot; " + (idx + 1) + " / " + list.length : "");
  }
  function openBox(items, i){ list = items; idx = i; render(); if (!box.open) box.showModal(); }
  function step(n){ idx = (idx + n + list.length) % list.length; render(); }
  document.addEventListener("keydown", function(e){ if (!box.open) return; if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });
  $("#lbPrev").addEventListener("click", function(){ step(-1); });
  $("#lbNext").addEventListener("click", function(){ step(1); });
  $("#lbClose").addEventListener("click", function(){ box.close(); });
  box.addEventListener("click", function(e){ if (e.target === box) box.close(); });
  box.addEventListener("close", function(){ media.innerHTML = ""; });

  /* ---------- Reels: filters + grid ---------- */
  var items = R.map(function(r){ return { title: r.title, tag: r.tag, file: RB + r.file, poster: RB + r.poster }; });
  var tags = ["All"];
  R.forEach(function(r){ if (r.tag && tags.indexOf(r.tag) < 0) tags.push(r.tag); });
  var fb = $("#filters"), grid = $("#reelGrid");
  function drawReels(tag){
    grid.innerHTML = "";
    var shown = items.filter(function(it){ return tag === "All" || it.tag === tag; });
    shown.forEach(function(it, i){
      var el = document.createElement("button");
      el.type = "button"; el.className = "rcard reveal"; el.setAttribute("aria-label", "Play " + it.title);
      el.innerHTML = '<div class="rcard-frame"><img src="' + esc(it.poster) + '" alt="" loading="lazy"><video muted loop playsinline preload="none"></video>' + playIcon + '</div><b>' + esc(it.title) + '</b><span>' + esc(it.tag) + '</span>';
      var v = $("video", el), img = $("img", el);
      v.setAttribute("controlsList", "nodownload"); v.disablePictureInPicture = true;
      /* No cover image uploaded yet: show the first frame of the video instead */
      img.addEventListener("error", function(){ img.remove(); v.preload = "metadata"; v.src = it.file + "#t=0.6"; v.style.opacity = 1; });
      if (fine) {
        el.addEventListener("mouseenter", function(){ if (!v.src || v.src.indexOf("#t=") > -1) v.src = it.file; v.play().then(function(){ el.classList.add("playing"); }).catch(function(){}); });
        el.addEventListener("mouseleave", function(){ v.pause(); el.classList.remove("playing"); });
      }
      el.addEventListener("click", function(){ openBox(shown, i); });
      grid.append(el); watch(el);
    });
    if (!shown.length) grid.innerHTML = '<p class="vempty">No videos here yet.</p>';
  }
  tags.forEach(function(t, i){
    var n = t === "All" ? R.length : R.filter(function(r){ return r.tag === t; }).length;
    var b = document.createElement("button");
    b.type = "button"; b.innerHTML = esc(t) + "<sup>" + n + "</sup>"; b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function(){
      $$("button", fb).forEach(function(x){ x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true"); drawReels(t);
    });
    fb.append(b);
  });
  if (tags.length < 3) fb.style.display = "none";
  drawReels("All");

  /* ---------- Films ---------- */
  var fg = $("#filmGrid"), films = F.map(function(f){ return { title: f.title, tag: (f.tag || "Brand film") + (f.length ? " · " + f.length : ""), file: f.file, poster: f.poster }; });
  F.forEach(function(f, i){
    var el = document.createElement("button");
    el.type = "button"; el.className = "vfilm reveal"; el.setAttribute("aria-label", "Play " + f.title);
    el.innerHTML = '<div class="vfilm-frame"><img src="' + esc(f.poster) + '" alt="" loading="lazy">' + playIcon + '</div><b>' + esc(f.title) + '</b><span>' + esc(films[i].tag) + '</span>';
    el.addEventListener("click", function(){ openBox(films, i); });
    fg.append(el); watch(el);
  });
  if (!F.length) $("#films").style.display = "none";

  /* ---------- Promos ---------- */
  var pg = $("#promoGrid"), promos = PR.map(function(f){ return { title: f.title, tag: (f.tag || "Promo") + (f.length ? " · " + f.length : ""), file: f.file, poster: f.poster }; });
  PR.forEach(function(f, i){
    var el = document.createElement("button");
    el.type = "button"; el.className = "vfilm reveal" + (f.portrait ? " is-portrait" : ""); el.setAttribute("aria-label", "Play " + f.title);
    el.innerHTML = '<div class="vfilm-frame"><img src="' + esc(f.poster) + '" alt="" loading="lazy">' + playIcon + '</div><b>' + esc(f.title) + '</b><span>' + esc(promos[i].tag) + '</span>';
    el.addEventListener("click", function(){ openBox(promos, i); });
    pg.append(el); watch(el);
  });
  if (!PR.length) $("#promos").style.display = "none";

  /* ---------- Nav ---------- */
  var nav = $("#nav"), ly = 0, mnav = $("#mnav"), burger = $("#burger");
  window.addEventListener("scroll", function(){ var y = window.scrollY; nav.classList.toggle("hide", y > ly && y > 300 && !mnav.classList.contains("open")); ly = y; }, { passive: true });
  burger.addEventListener("click", function(){ var o = mnav.classList.toggle("open"); burger.setAttribute("aria-expanded", o ? "true" : "false"); document.body.style.overflow = o ? "hidden" : ""; });
  $$("a", mnav).forEach(function(a){ a.addEventListener("click", function(){ mnav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }); });

  /* Protect videos: no right-click save */
  document.addEventListener("contextmenu", function(e){ if (e.target.closest && e.target.closest("video,.rcard,.vfilm,.lb-media")) e.preventDefault(); }, true);
})();
