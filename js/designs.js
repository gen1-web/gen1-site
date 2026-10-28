/* GEN1 SOLUTIONS - Designs page: contacts, counter and reveal. The carousel itself is js/carousel.js (data: GCAROUSEL in data.js). */
(function(){
  var S = window.SITE || {}, G = window.GCAROUSEL || [];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function(s){ return document.querySelector(s); };
  var $$ = function(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); };
  $("#year").textContent = new Date().getFullYear();
  if (S.whatsapp) $("#wa").href = "https://wa.me/" + String(S.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent("Assalamu alaikum Gen1, I saw your designs and I'd like to discuss a project.");
  if (S.email) $("#mail").href = "mailto:" + S.email;
  [["#ig", S.instagram], ["#li", S.linkedin], ["#fb", S.facebook]].forEach(function(p){ var a = $(p[0]); if (!a) return; if (p[1]) a.href = p[1]; else a.remove(); });
  var el = $("#cSlides"), end = G.length, t0 = null, dur = reduce ? 1 : 1400;
  setTimeout(function(){ requestAnimationFrame(function tick(t){ if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); }); }, 400);
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .08, rootMargin: "0px 0px -30px 0px" }) : null;
  $$(".reveal").forEach(function(n){ if (io && !reduce) io.observe(n); else n.classList.add("in"); });
  /* Mobile menu and nav hide-on-scroll */
  var nav = $("#nav"), ly = 0, mnav = $("#mnav"), burger = $("#burger");
  window.addEventListener("scroll", function(){ var y = window.scrollY; nav.classList.toggle("hide", y > ly && y > 300 && !mnav.classList.contains("open")); ly = y; }, { passive: true });
  burger.addEventListener("click", function(){ var o = mnav.classList.toggle("open"); burger.setAttribute("aria-expanded", o ? "true" : "false"); document.body.style.overflow = o ? "hidden" : ""; });
  $$("#mnav a").forEach(function(a){ a.addEventListener("click", function(){ mnav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }); });

  /* Latest campaigns grid with lightbox */
  var D = (window.DESIGNS || []).filter(function(x){ return x.feat; }), grid = $("#dgrid");
  var esc = function(s){ return String(s || "").replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  if (grid && D.length) {
    grid.innerHTML = D.map(function(x, i){
      return '<button type="button" class="dcard reveal" data-i="' + i + '" style="--i:' + i + '" aria-label="View ' + esc(x.title) + '"><img src="designs/' + x.src + '" alt="' + esc(x.title) + ' by Gen1 Solutions for ' + esc(x.client) + '" width="520" height="650" loading="lazy" decoding="async"><span class="dcard-cap"><b>' + esc(x.title) + '</b><i>' + esc(x.client) + '</i></span></button>';
    }).join("");
    $$(".dcard").forEach(function(n){ if (io && !reduce) io.observe(n); else n.classList.add("in"); });
    var box = $("#dbox"), img = $("#dboxImg"), cap = $("#dboxCap"), idx = 0;
    var show = function(i){ idx = (i + D.length) % D.length; img.src = "designs/" + D[idx].src.replace(".jpg", "-lg.jpg"); img.alt = D[idx].title; cap.innerHTML = "<b>" + esc(D[idx].title) + "</b>" + esc(D[idx].client) + " &middot; " + (idx + 1) + " / " + D.length; };
    grid.addEventListener("click", function(e){ var b = e.target.closest(".dcard"); if (!b) return; show(+b.getAttribute("data-i")); box.showModal(); });
    $("#dboxClose").addEventListener("click", function(){ box.close(); });
    $("#dboxPrev").addEventListener("click", function(){ show(idx - 1); });
    $("#dboxNext").addEventListener("click", function(){ show(idx + 1); });
    box.addEventListener("click", function(e){ if (e.target === box) box.close(); });
    box.addEventListener("keydown", function(e){ if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1); });
  }
})();
