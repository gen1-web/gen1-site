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
    ".reel-outer{position:relative}" +
    ".reel-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:5;width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(10,10,10,.72);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .25s,transform .25s,border-color .25s}" +
    ".reel-arrow:hover{background:var(--red);border-color:var(--red);transform:translateY(-50%) scale(1.08)}" +
    ".reel-arrow svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}" +
    ".reel-arrow-prev{left:clamp(.5rem,2vw,1.5rem)}.reel-arrow-next{right:clamp(.5rem,2vw,1.5rem)}" +
    "@media (max-width:640px){.reel-arrow{width:38px;height:38px}}" +
    "@media (prefers-reduced-motion:reduce){.phones.marquee{animation:none}}";
  document.head.appendChild(st);
  var wrap = document.createElement("div"); wrap.className = "reel-marquee";
  var outer = document.createElement("div"); outer.className = "reel-outer";
  rail.parentNode.insertBefore(outer, rail); outer.appendChild(wrap); wrap.appendChild(rail);
  rail.classList.remove("rail"); rail.classList.add("marquee");
  // duplicate the set for a seamless loop
  originals.forEach(function(p){ rail.appendChild(p.cloneNode(true)); });
  // rebind video behaviour on clones (click-to-play posters handled by main render; keep simple: clones are visual)
  var hint = document.createElement("div"); hint.className = "reel-hint";
  hint.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12h14M5 12l4-4M5 12l4 4"/></svg> Hover to pause';
  outer.after(hint);
  var nudge = 0;
  [["prev","M15 5l-7 7 7 7","Scroll reels left"],["next","M9 5l7 7-7 7","Scroll reels right"]].forEach(function(a){
    var b = document.createElement("button"); b.type = "button"; b.className = "reel-arrow reel-arrow-" + a[0];
    b.setAttribute("aria-label", a[2]);
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + a[1] + '"/></svg>';
    b.addEventListener("click", function(){ nudge += (a[0] === "prev" ? 1 : -1) * Math.min(520, wrap.clientWidth * .6); });
    outer.appendChild(b);
  });
  outer.addEventListener("mouseenter", function(){ paused = true; });
  outer.addEventListener("mouseleave", function(){ paused = false; });
  var x = 0, half = 0, speed = 0.5, paused = false, raf;
  function measure(){ half = rail.scrollWidth / 2; }
  setTimeout(measure, 80); window.addEventListener("resize", measure);
  wrap.addEventListener("mouseenter", function(){ paused = true; });
  wrap.addEventListener("mouseleave", function(){ paused = false; });
  // pause when a video inside is playing
  rail.addEventListener("play", function(){ paused = true; }, true);
  function tick(){
    if (half) {
      if (!paused) x -= speed;
      if (nudge) { var st = Math.abs(nudge) < 1 ? nudge : nudge * .14; x += st; nudge -= st; }
      while (-x >= half) x += half;
      while (x > 0) x -= half;
      rail.style.transform = "translateX(" + x + "px)";
    }
    raf = requestAnimationFrame(tick);
  }
  tick();
})();
