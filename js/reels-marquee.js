/* Homepage reels: continuous right-to-left marquee, pauses on hover */
(function(){
  var rail = document.getElementById("phones");
  if (!rail) return;
  var originals = [].slice.call(rail.querySelectorAll(".phone"));
  if (originals.length < 2) return;
  var st = document.createElement("style");
  st.textContent = ".reel-marquee{position:relative;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}" +
    ".phones.marquee{display:flex;flex-wrap:nowrap;width:max-content;gap:clamp(1rem,2.2vw,2rem);justify-content:flex-start;perspective:none;padding:1.5rem 0 2.5rem;will-change:transform}" +
    ".phones.marquee .phone{flex:none;width:clamp(200px,20vw,268px)!important;margin:0!important;transform:none!important;opacity:1!important;filter:none!important;transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s}" +
    ".phones.marquee .phone:hover{transform:translateY(-10px) scale(1.03)!important;z-index:3}" +
    ".reel-hint{display:flex;align-items:center;justify-content:center;gap:.5rem;margin-top:.3rem;color:rgba(255,255,255,.4);font-size:.8rem;font-weight:500;letter-spacing:.02em}" +
    ".reel-hint svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2}" +
    "@media (prefers-reduced-motion:reduce){.phones.marquee{animation:none}}";
  document.head.appendChild(st);
  var wrap = document.createElement("div"); wrap.className = "reel-marquee";
  rail.parentNode.insertBefore(wrap, rail); wrap.appendChild(rail);
  rail.classList.remove("rail"); rail.classList.add("marquee");
  // duplicate the set for a seamless loop
  originals.forEach(function(p){ rail.appendChild(p.cloneNode(true)); });
  // rebind video behaviour on clones (click-to-play posters handled by main render; keep simple: clones are visual)
  var hint = document.createElement("div"); hint.className = "reel-hint";
  hint.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12h14M5 12l4-4M5 12l4 4"/></svg> Hover to pause';
  wrap.after(hint);
  var x = 0, half = 0, speed = 0.5, paused = false, raf;
  function measure(){ half = rail.scrollWidth / 2; }
  setTimeout(measure, 80); window.addEventListener("resize", measure);
  wrap.addEventListener("mouseenter", function(){ paused = true; });
  wrap.addEventListener("mouseleave", function(){ paused = false; });
  // pause when a video inside is playing
  rail.addEventListener("play", function(){ paused = true; }, true);
  function tick(){
    if (!paused && half) { x -= speed; if (-x >= half) x += half; rail.style.transform = "translateX(" + x + "px)"; }
    raf = requestAnimationFrame(tick);
  }
  tick();
})();
