/* GEN1 SOLUTIONS - Work page */
(function(){
  var D = window.DESIGNS || [], R = window.REELS || [], W = window.WEBSITES || [], B = window.BRANDING || [], S = window.SITE || {};
  var RB = window.REELS_BASE || "", DIR = "designs/";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function(s, c){ return (c || document).querySelector(s); };
  var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function(s){ return String(s || "").replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  var playIcon = '<span class="pbtn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></span>';

  /* Contacts */
  $("#year").textContent = new Date().getFullYear();
  if (S.whatsapp) $("#wa").href = "https://wa.me/" + String(S.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent("Assalamu alaikum Gen1, I saw your portfolio and I'd like to discuss a project.");
  if (S.email) $("#mail").href = "mailto:" + S.email;
  [["#ig", S.instagram], ["#li", S.linkedin], ["#fb", S.facebook]].forEach(function(p){ var a = $(p[0]); if (p[1]) a.href = p[1]; else a.remove(); });

  /* Hero counters */
  [["#cDesigns", D.length], ["#cReels", R.length], ["#cSites", W.length]].forEach(function(p){
    var el = $(p[0]), end = p[1], t0 = null, dur = reduce ? 1 : 1500;
    setTimeout(function(){ requestAnimationFrame(function tick(t){ if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); }); }, 500);
  });

  /* Reveal */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: "0px 0px -30px 0px" }) : null;
  function watch(el){ if (io && !reduce) io.observe(el); else el.classList.add("in"); }

  /* ---------- Designs: filters + masonry ---------- */
  var cats = ["All"];
  D.forEach(function(d){ if (d.cat && cats.indexOf(d.cat) < 0) cats.push(d.cat); });
  var fb = $("#filters"), mason = $("#masonry"), visible = D.slice();
  cats.forEach(function(c, i){
    var n = c === "All" ? D.length : D.filter(function(d){ return d.cat === c; }).length;
    var b = document.createElement("button");
    b.innerHTML = esc(c) + "<sup>" + n + "</sup>";
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function(){
      $$("button", fb).forEach(function(x){ x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      filter(c);
    });
    fb.append(b);
  });
  D.forEach(function(d, i){
    var f = document.createElement("figure");
    f.className = "mcard"; f.tabIndex = 0; f.setAttribute("role", "button"); f.setAttribute("data-i", i); f.setAttribute("data-cat", d.cat || "");
    f.setAttribute("aria-label", "View " + d.title);
    f.style.transitionDelay = ((i % 4) * 70) + "ms";
    f.innerHTML = '<img src="' + DIR + d.src + '" alt="' + esc(d.title) + '" loading="lazy" decoding="async">' +
      (d.cat ? '<span class="tag">' + esc(d.cat) + '</span>' : "") +
      '<figcaption><b>' + esc(d.title) + '</b><span>' + esc(d.client) + '</span></figcaption>';
    mason.append(f); watch(f);
  });
  function filter(c){
    var cards = $$(".mcard", mason);
    cards.forEach(function(el){ el.classList.remove("in"); });
    setTimeout(function(){
      visible = [];
      cards.forEach(function(el, k){
        var show = c === "All" || el.getAttribute("data-cat") === c;
        el.classList.toggle("hide", !show);
        if (show) { visible.push(D[+el.getAttribute("data-i")]); el.style.transitionDelay = ((visible.length - 1) % 8 * 50) + "ms"; }
      });
      requestAnimationFrame(function(){ cards.forEach(function(el){ if (!el.classList.contains("hide")) el.classList.add("in"); }); });
    }, reduce ? 0 : 280);
  }

  /* ---------- Branding ---------- */
  var brands = $("#brands");
  if (B.length) {
    B.forEach(function(b, i){
      var el = document.createElement("article");
      el.className = "bcase reveal";
      var sw = (b.colors || []).map(function(c){ return '<i style="background:' + c + '" title="' + c + '"></i>'; }).join("");
      var tg = (b.tags || []).map(function(t){ return "<span>" + esc(t) + "</span>"; }).join("");
      var th = (b.thumbs || []).map(function(t, k){ return '<button class="bthumb" data-k="' + (k + 1) + '" aria-label="View page ' + (k + 2) + '"><img src="' + t + '" alt="" loading="lazy"></button>'; }).join("");
      var total = 1 + (b.images || []).length;
      el.innerHTML =
        '<button class="bcase-cover" aria-label="Open ' + esc(b.title) + ' brand guideline"><img src="' + b.cover + '" alt="' + esc(b.title) + ' brand guideline cover" loading="lazy"><span class="bcase-open">View ' + total + ' pages</span></button>' +
        '<div class="bcase-info"><h3>' + esc(b.title) + '</h3><p class="bcase-client">' + esc(b.client) + '</p>' +
        (b.desc ? '<p class="bcase-desc">' + esc(b.desc) + '</p>' : "") +
        (sw ? '<div class="bcase-swatches">' + sw + '</div>' : "") +
        (tg ? '<div class="bcase-tags">' + tg + '</div>' : "") +
        (th ? '<div class="bcase-thumbs">' + th + '</div>' : "") + '</div>';
      $(".bcase-cover", el).addEventListener("click", function(){ openBox("brand", i, 0); });
      $$(".bthumb", el).forEach(function(t){ t.addEventListener("click", function(){ openBox("brand", i, +t.getAttribute("data-k")); }); });
      brands.append(el); watch(el);
    });
    var more = document.createElement("div");
    more.className = "bnext reveal";
    more.innerHTML = '<b>Your brand next?</b><span>Logos, colour systems and full brand guidelines.</span><a class="btn btn-red magnetic" href="#contact"><span>Start a brand project</span></a>';
    brands.append(more); watch(more);
  } else {
    [["#CC0001","#000","#fff"],["#1f6f43","#e9d8a6","#0b0b0b"],["#0f3d91","#f2b705","#fff"]].forEach(function(sw){
      var el = document.createElement("div");
      el.className = "brand soon reveal";
      el.innerHTML = '<div class="brand-cover"><div class="swatches"><i style="background:' + sw[0] + '"></i><i style="background:' + sw[1] + '"></i><i style="background:' + sw[2] + '"></i></div></div><div class="brand-info"><b>Brand identity</b><span>Case study coming soon</span></div>';
      brands.append(el); watch(el);
    });
  }
  var pg = $("#partners"), ph = "";
  for (var i = 1; i <= 19; i++) ph += '<div><img src="assets/clients/c' + (i < 10 ? "0" + i : i) + '.png" alt="" loading="lazy"></div>';
  pg.innerHTML = ph;

  /* ---------- Reels ---------- */
  var rg = $("#reelGrid");
  R.forEach(function(r, i){
    var el = document.createElement("button");
    el.className = "rcard reveal";
    el.setAttribute("aria-label", "Play " + r.title);
    el.innerHTML = '<div class="rcard-frame"><img src="' + RB + r.poster + '" alt="" loading="lazy"><video muted loop playsinline preload="none"></video>' + playIcon + '</div><b>' + esc(r.title) + '</b><span>' + esc(r.tag) + '</span>';
    var v = $("video", el);
    if (fine) {
      el.addEventListener("mouseenter", function(){ if (!v.src) v.src = RB + r.file; v.play().then(function(){ el.classList.add("playing"); }).catch(function(){}); });
      el.addEventListener("mouseleave", function(){ v.pause(); el.classList.remove("playing"); });
    }
    el.addEventListener("click", function(){ openBox("reel", i); });
    rg.append(el); watch(el);
  });

  /* ---------- Websites ---------- */
  var sites = $("#sites");
  var arrow = '<span class="site-go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
  W.forEach(function(s){
    var el = document.createElement(s.url ? "a" : "div");
    el.className = "site reveal";
    if (s.url) { el.href = s.url; el.target = "_blank"; el.rel = "noopener"; }
    var host = s.url ? s.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : s.title.toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com";
    var view = s.image ? '<img src="' + s.image + '" alt="' + esc(s.title) + ' website" loading="lazy">' : '<div class="site-ph"><div><b>' + esc(s.title) + '</b><span>Screenshot coming soon</span></div></div>';
    el.innerHTML = '<div class="site-bar"><i></i><i></i><i></i><span>' + esc(host) + '</span></div><div class="site-view">' + view + '</div><div class="site-info"><div><b>' + esc(s.title) + '</b><span>' + esc(s.type) + '</span></div>' + arrow + '</div>';
    sites.append(el); watch(el);
  });

  $$(".reveal").forEach(watch);

  /* ---------- Jump bar: highlight current section ---------- */
  var links = $$("#jump a");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) links.forEach(function(a){ a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); }); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["designs", "branding", "reels", "websites"].forEach(function(id){ so.observe(document.getElementById(id)); });
  }

  /* ---------- Nav ---------- */
  var nav = $("#nav"), ly = 0, mnav = $("#mnav"), burger = $("#burger");
  window.addEventListener("scroll", function(){ var y = window.scrollY; nav.classList.toggle("hide", y > ly && y > 300 && !mnav.classList.contains("open")); ly = y; }, { passive: true });
  burger.addEventListener("click", function(){ var o = mnav.classList.toggle("open"); burger.setAttribute("aria-expanded", o ? "true" : "false"); document.body.style.overflow = o ? "hidden" : ""; });
  $$("a", mnav).forEach(function(a){ a.addEventListener("click", function(){ mnav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }); });

  /* ---------- Cursor + magnetic ---------- */
  if (fine && !reduce) {
    var cur = $("#cursor"), cx = innerWidth / 2, cy = innerHeight / 2, mx = cx, my = cy;
    document.addEventListener("mousemove", function(e){ mx = e.clientX; my = e.clientY; });
    (function move(){ cx += (mx - cx) * .22; cy += (my - cy) * .22; cur.style.transform = "translate(" + cx + "px," + cy + "px)"; requestAnimationFrame(move); })();
    document.addEventListener("mouseover", function(e){ cur.classList.toggle("big", !!e.target.closest("a,button,.mcard")); });
    $$(".magnetic").forEach(function(b){
      b.addEventListener("mousemove", function(e){ var r = b.getBoundingClientRect(); b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * .25) + "px," + ((e.clientY - r.top - r.height / 2) * .35) + "px)"; });
      b.addEventListener("mouseleave", function(){ b.style.transform = ""; });
    });
  }

  /* ---------- Lightbox ---------- */
  var box = $("#lightbox"), media = $("#lbMedia"), cap = $("#lbCap"), mode = "design", idx = 0, list = [];
  function render(){
    media.innerHTML = "";
    var it = list[idx];
    if (mode === "reel") {
      var v = document.createElement("video");
      v.src = RB + it.file; v.poster = RB + it.poster; v.controls = true; v.autoplay = true; v.playsInline = true;
      media.append(v); cap.innerHTML = "<b>" + esc(it.title) + "</b>" + esc(it.tag);
    } else {
      var img = new Image();
      img.src = mode === "design" ? DIR + it.src.replace(".jpg", "-lg.jpg") : it;
      img.alt = mode === "design" ? it.title : "";
      media.append(img);
      cap.innerHTML = mode === "design" ? "<b>" + esc(it.title) + "</b>" + esc(it.client) : "<b>" + esc(B[bIdx].title) + "</b>" + (idx + 1) + " / " + list.length;
    }
  }
  var bIdx = 0;
  function openBox(m, i, start){
    mode = m;
    if (m === "design") { list = visible; idx = Math.max(0, list.indexOf(D[i])); }
    else if (m === "reel") { list = R; idx = i; }
    else { bIdx = i; list = [B[i].cover].concat(B[i].images || []); idx = start || 0; }
    render(); if (!box.open) box.showModal();
  }
  function step(n){ idx = (idx + n + list.length) % list.length; render(); }
  mason.addEventListener("click", function(e){ var c = e.target.closest(".mcard"); if (c) openBox("design", +c.getAttribute("data-i")); });
  mason.addEventListener("keydown", function(e){ var c = e.target.closest(".mcard"); if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openBox("design", +c.getAttribute("data-i")); } });
  document.addEventListener("keydown", function(e){ if (!box.open) return; if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });
  $("#lbPrev").addEventListener("click", function(){ step(-1); });
  $("#lbNext").addEventListener("click", function(){ step(1); });
  $("#lbClose").addEventListener("click", function(){ box.close(); });
  box.addEventListener("click", function(e){ if (e.target === box) box.close(); });
  box.addEventListener("close", function(){ media.innerHTML = ""; });
})();
/* Land on #branding etc. after the design images above it have loaded */
(function(){ if (!location.hash) return; var t = document.querySelector(location.hash); if (!t) return; document.querySelectorAll(".mcard img").forEach(function(i){ i.loading = "eager"; }); window.addEventListener("load", function(){ t.scrollIntoView(); }); })();
/* Protect videos: no right-click save, no download button, no picture-in-picture */
(function(){
  function lock(v){ v.setAttribute("controlsList", "nodownload noremoteplayback noplaybackrate"); v.setAttribute("disablePictureInPicture", ""); v.disablePictureInPicture = true; }
  document.querySelectorAll("video").forEach(lock);
  new MutationObserver(function(ms){ ms.forEach(function(m){ m.addedNodes.forEach(function(n){ if (n.nodeType !== 1) return; if (n.tagName === "VIDEO") lock(n); else if (n.querySelectorAll) n.querySelectorAll("video").forEach(lock); }); }); }).observe(document.body, { childList: true, subtree: true });
  document.addEventListener("contextmenu", function(e){ if (e.target.closest && e.target.closest("video,.phone,.rcard,.lb-media")) e.preventDefault(); }, true);
})();
