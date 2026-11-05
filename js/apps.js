/* Mobile apps page: contact links, menu, reveal animation, and the My Salah images.
   The app icon and screenshots appear automatically once they are uploaded to assets/:
   my-salah-icon.png, then my-salah-screen-1.jpg, my-salah-screen-2.jpg ... (up to 12), all in the assets folder. */
(function(){
  "use strict";
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return [].slice.call((r || document).querySelectorAll(s)); };
  var S = window.SITE || {};
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Contact links */
  var wa = $("#wa");
  if (wa && S.whatsapp) wa.href = "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent("Assalamu alaikum! I have an app idea and would like to talk.");
  var mail = $("#mail");
  if (mail && S.email) mail.href = "mailto:" + S.email;
  [["#ig", "instagram"], ["#li", "linkedin"], ["#fb", "facebook"]].forEach(function(p){ var a = $(p[0]); if (a && S[p[1]]) a.href = S[p[1]]; });
  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* Menu */
  var nav = $("#nav"), mnav = $("#mnav"), burger = $("#burger"), ly = 0;
  window.addEventListener("scroll", function(){
    var y = window.scrollY;
    nav.classList.toggle("hide", y > ly && y > 300 && !mnav.classList.contains("open"));
    ly = y;
  }, { passive: true });
  burger.addEventListener("click", function(){
    var o = mnav.classList.toggle("open");
    burger.setAttribute("aria-expanded", o ? "true" : "false");
    document.body.style.overflow = o ? "hidden" : "";
  });
  $$("a", mnav).forEach(function(a){
    a.addEventListener("click", function(){ mnav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; });
  });

  /* Reveal on scroll */
  var io = ("IntersectionObserver" in window && !reduce) ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -6% 0px" }) : null;
  $$(".reveal").forEach(function(el){ if (io) io.observe(el); else el.classList.add("in"); });

  /* My Salah images */
  var BASE = "assets/my-salah-";
  function probe(src, cb){ var im = new Image(); im.onload = function(){ cb(im); }; im.onerror = function(){ cb(null); }; im.src = src; }

  probe(BASE + "icon.png", function(im){
    if (!im) return;
    $$("[data-app-icon]").forEach(function(el){ el.src = im.src; el.hidden = false; });
  });

  var shots = [];
  (function next(n){
    if (n > 12) return build();
    probe(BASE + "screen-" + n + ".jpg", function(im){
      if (!im) return build();
      shots.push(im.src);
      next(n + 1);
    });
  })(1);

  /* Short descriptions of the 8 screenshots, in order (used as the image descriptions) */
  var ALTS = [
    "Today screen: adhan, iqamah and the sun arc at a glance",
    "Fajr alarm that rings on silent and stops when you solve a sum",
    "Ramadan Suhoor countdown and a daily Quran page target",
    "Tasbih counter and morning and evening adhkar",
    "Prayer time widgets in many sizes and colours on the home screen",
    "Qibla compass and your mosque's jamaat times",
    "Language and colour theme settings: 6 languages and 16 themes",
    "Private prayer break that pauses reminders and keeps your streak safe"
  ];

  function build(){
    if (!shots.length) return;
    /* Hero fan: Today, Fajr alarm (centre) and Qibla when all are there, otherwise the first three */
    var want = [0, 1, 5].filter(function(i){ return shots[i]; });
    if (want.length < 3) want = [0, 1, 2].filter(function(i){ return shots[i]; });
    $("#fan").innerHTML = want.map(function(i){ return '<img src="' + shots[i] + '" alt="" width="720" height="1280" decoding="async">'; }).join("");
    $("#appVisual").classList.add("has-shots");
    var track = $("#shotsTrack");
    track.innerHTML = shots.map(function(s, i){
      return '<figure class="shot"><img src="' + s + '" alt="' + (ALTS[i] || ("My Salah screenshot " + (i + 1))) + '" width="720" height="1280" loading="lazy" decoding="async"></figure>';
    }).join("");
    $("#screens").hidden = false;
    var step = function(d){ track.scrollBy({ left: d * track.clientWidth * .8, behavior: "smooth" }); };
    $("#shotPrev").addEventListener("click", function(){ step(-1); });
    $("#shotNext").addEventListener("click", function(){ step(1); });
  }
})();
