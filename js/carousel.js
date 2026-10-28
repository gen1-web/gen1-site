/* Design carousel: swipeable coverflow-style scroller for the 15 portrait slides.
   Mount point: <section class="gcar" id="gcar"></section> (homepage and Work page). Data: window.GCAROUSEL in data.js */
(function(){
  var D = window.GCAROUSEL || [];
  var mount = document.getElementById("gcar");
  if (!mount || !D.length) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var esc = function(s){ return String(s || "").replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  var pad = function(n){ return (n < 10 ? "0" : "") + n; };

  var slides = D.map(function(d, i){
    return '<figure class="gcar-slide" data-i="' + i + '"><img src="' + d.src + '" alt="' + esc(d.title) + ' by Gen1 Solutions" width="600" height="800" loading="' + (i < 3 ? "eager" : "lazy") + '" decoding="async" draggable="false"></figure>';
  }).join("");
  var arrowPrev = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4M10 5l-7 7 7 7"/></svg>';
  var arrowNext = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 5l7 7-7 7"/></svg>';

  mount.innerHTML =
    '<div class="gcar-head">' +
      '<h2 class="sec-title">Swipe through<br>our design work.</h2>' +
      '<p class="sec-text">Social posts, thumbnails, print, branding and ads for Islamic brands. Drag, swipe or use the arrows, tap the centre slide to see it full size.</p>' +
    '</div>' +
    '<div class="gcar-stage">' +
      '<button type="button" class="row-arrow row-arrow-prev" aria-label="Previous slide">' + arrowPrev + '</button>' +
      '<div class="gcar-track" tabindex="0" role="region" aria-roledescription="carousel" aria-label="Design carousel">' + slides + '</div>' +
      '<button type="button" class="row-arrow row-arrow-next" aria-label="Next slide">' + arrowNext + '</button>' +
    '</div>' +
    '<div class="gcar-meta"><span class="gcar-count"><b>01</b> / ' + pad(D.length) + '</span><span class="gcar-name"></span><span class="gcar-bar" aria-hidden="true"><i></i></span></div>';

  var track = mount.querySelector(".gcar-track");
  var els = [].slice.call(mount.querySelectorAll(".gcar-slide"));
  var count = mount.querySelector(".gcar-count b"), name = mount.querySelector(".gcar-name"), bar = mount.querySelector(".gcar-bar i");
  var active = 0, raf = 0;

  function centreOf(el){ return el.offsetLeft + el.offsetWidth / 2; }
  function go(i, instant){
    i = Math.max(0, Math.min(els.length - 1, i));
    track.scrollTo({ left: centreOf(els[i]) - track.clientWidth / 2, behavior: (instant || reduce) ? "auto" : "smooth" });
  }
  function update(){
    raf = 0;
    var mid = track.scrollLeft + track.clientWidth / 2, best = 0, bd = 1e9;
    var unit = els[0].offsetWidth * 1.1;
    els.forEach(function(el, i){
      var d = Math.abs(centreOf(el) - mid), k = Math.min(1, d / (unit * 1.6));
      el.style.setProperty("--s", (1 - k * .2).toFixed(3));
      el.style.setProperty("--o", (1 - k * .55).toFixed(3));
      if (d < bd) { bd = d; best = i; }
    });
    if (best !== active || !count.dataset.ready) {
      active = best; count.dataset.ready = "1";
      els.forEach(function(el, i){ el.classList.toggle("on", i === active); });
      count.textContent = pad(active + 1); name.textContent = D[active].title;
    }
    var max = track.scrollWidth - track.clientWidth;
    bar.style.transform = "scaleX(" + (max > 0 ? (track.scrollLeft / max * .9 + .1).toFixed(3) : 1) + ")";
  }
  function queue(){ if (!raf) raf = requestAnimationFrame(update); }
  track.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", function(){ go(active, true); queue(); });

  mount.querySelector(".row-arrow-prev").addEventListener("click", function(){ go(active - 1); });
  mount.querySelector(".row-arrow-next").addEventListener("click", function(){ go(active + 1); });
  track.addEventListener("keydown", function(e){
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  });

  /* Mouse drag (touch uses native swipe) */
  var down = false, sx = 0, sl = 0, moved = false;
  track.addEventListener("pointerdown", function(e){
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.classList.add("drag");
  });
  window.addEventListener("pointermove", function(e){
    if (!down) return;
    var dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true;
    track.scrollLeft = sl - dx;
  });
  window.addEventListener("pointerup", function(){
    if (!down) return; down = false; track.classList.remove("drag");
    if (moved) go(active);
  });

  /* Click: a side slide centres itself, the centre slide opens full size */
  var box, boxImg, boxCap, boxIdx = 0;
  function buildBox(){
    box = document.createElement("dialog"); box.className = "lightbox gcar-box"; box.setAttribute("aria-label", "Design viewer");
    box.innerHTML = '<button class="lb-close" type="button">Close</button>' +
      '<button class="lb-nav prev" type="button" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<figure class="lb-body"><div class="lb-media"><img alt=""></div><figcaption></figcaption></figure>' +
      '<button class="lb-nav next" type="button" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>';
    document.body.appendChild(box);
    boxImg = box.querySelector("img"); boxCap = box.querySelector("figcaption");
    box.querySelector(".lb-close").addEventListener("click", function(){ box.close(); });
    box.querySelector(".prev").addEventListener("click", function(){ show(boxIdx - 1); });
    box.querySelector(".next").addEventListener("click", function(){ show(boxIdx + 1); });
    box.addEventListener("click", function(e){ if (e.target === box) box.close(); });
    box.addEventListener("keydown", function(e){ if (e.key === "ArrowRight") show(boxIdx + 1); if (e.key === "ArrowLeft") show(boxIdx - 1); });
    box.addEventListener("close", function(){ go(boxIdx, true); });
  }
  function show(i){
    boxIdx = (i + D.length) % D.length;
    boxImg.src = D[boxIdx].src; boxImg.alt = D[boxIdx].title;
    boxCap.innerHTML = "<b>" + esc(D[boxIdx].title) + "</b>" + pad(boxIdx + 1) + " / " + pad(D.length);
  }
  track.addEventListener("click", function(e){
    if (moved) { moved = false; return; }
    var s = e.target.closest(".gcar-slide"); if (!s) return;
    var i = +s.getAttribute("data-i");
    if (i !== active) { go(i); return; }
    if (!box) buildBox();
    show(i); box.showModal();
  });

  /* Autoplay on the dedicated Designs page: moves left to right, loops, pauses on interaction */
  if (document.body.classList.contains("page-designs") && !reduce) {
    var timer = 0, hold = false, seen = true;
    var tick = function(){ if (hold || !seen || document.hidden || box && box.open) return; go(active >= els.length - 1 ? 0 : active + 1); };
    var start = function(){ if (!timer) timer = setInterval(tick, 2800); };
    ["pointerdown", "touchstart", "focusin", "keydown"].forEach(function(e){ mount.addEventListener(e, function(){ hold = true; }, { passive: true }); });
    ["mouseenter"].forEach(function(e){ mount.addEventListener(e, function(){ hold = true; }); });
    mount.addEventListener("mouseleave", function(){ hold = false; });
    mount.addEventListener("focusout", function(){ hold = false; });
    mount.addEventListener("touchend", function(){ setTimeout(function(){ hold = false; }, 4000); }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function(es){ seen = es[0].isIntersecting; }, { threshold: .25 }).observe(mount);
    start();
  }

  /* Start on the first slide, centred */
  function init(){ go(0, true); update(); }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
  setTimeout(init, 300);
})();
