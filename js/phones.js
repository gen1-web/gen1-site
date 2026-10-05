/* Homepage reels: up to 9 phones on a swipeable rail with arrows */
(function(){
  var rail = document.getElementById("phones");
  if (!rail) return;
  var phones = rail.querySelectorAll(".phone");
  if (phones.length <= 3) return;
  var st = document.createElement("style");
  st.textContent = ".phones.rail{justify-content:flex-start;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;gap:clamp(1rem,2.4vw,2.2rem);perspective:none;scrollbar-width:none;padding:1.5rem calc(50% - clamp(105px,11vw,145px)) 2.5rem}" +
    ".phones.rail::-webkit-scrollbar{display:none}" +
    ".phones.rail .phone{width:clamp(210px,22vw,290px)!important;margin:0!important;scroll-snap-align:center;transform:scale(.86);opacity:.55;filter:saturate(.6) brightness(.8);transition:transform .6s cubic-bezier(.16,1,.3,1),opacity .6s,filter .6s}" +
    ".phones.rail .phone.is-center{transform:scale(1);opacity:1;filter:none;z-index:2}" +
    ".rail-wrap{position:relative}" +
    ".rail-btn{position:absolute;top:50%;z-index:5;width:56px;height:56px;margin-top:-28px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:rgba(20,20,20,.65);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;display:grid;place-items:center;cursor:pointer;transition:background .3s,transform .3s}" +
    ".rail-btn:hover{background:#CC0001;transform:scale(1.08)}.rail-btn svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}" +
    ".rail-btn.prev{left:clamp(.5rem,4vw,3rem)}.rail-btn.next{right:clamp(.5rem,4vw,3rem)}" +
    ".rail-dots{display:flex;justify-content:center;gap:8px;margin-top:.5rem}" +
    ".rail-dots i{width:8px;height:8px;border-radius:99px;background:rgba(255,255,255,.25);cursor:pointer;transition:all .35s}.rail-dots i.on{width:26px;background:#CC0001}" +
    "@media (max-width:760px){.rail-btn{display:none}}";
  document.head.appendChild(st);
  rail.classList.add("rail");
  var wrap = document.createElement("div"); wrap.className = "rail-wrap";
  rail.parentNode.insertBefore(wrap, rail); wrap.appendChild(rail);
  var arrow = function(cls, d){ var b = document.createElement("button"); b.className = "rail-btn " + cls; b.setAttribute("aria-label", cls === "prev" ? "Previous reel" : "Next reel"); b.innerHTML = '<svg viewBox="0 0 24 24"><path d="' + d + '"/></svg>'; wrap.appendChild(b); return b; };
  var prev = arrow("prev", "M15 5l-7 7 7 7"), next = arrow("next", "M9 5l7 7-7 7");
  var dots = document.createElement("div"); dots.className = "rail-dots";
  dots.innerHTML = Array.prototype.map.call(phones, function(_, i){ return '<i data-i="' + i + '"></i>'; }).join("");
  wrap.after(dots);
  var cur = 0;
  function go(i){ i = Math.max(0, Math.min(phones.length - 1, i)); var p = phones[i]; rail.scrollTo({ left: p.offsetLeft - (rail.clientWidth - p.offsetWidth) / 2, behavior: "smooth" }); }
  function mark(){
    var mid = rail.scrollLeft + rail.clientWidth / 2, best = 0, bd = 1e9;
    phones.forEach(function(p, i){ var d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
    cur = best;
    phones.forEach(function(p, i){ p.classList.toggle("is-center", i === best); });
    dots.querySelectorAll("i").forEach(function(d, i){ d.classList.toggle("on", i === best); });
  }
  prev.addEventListener("click", function(){ go(cur - 1); });
  next.addEventListener("click", function(){ go(cur + 1); });
  dots.addEventListener("click", function(e){ var i = e.target.getAttribute("data-i"); if (i !== null) go(+i); });
  var t; rail.addEventListener("scroll", function(){ cancelAnimationFrame(t); t = requestAnimationFrame(mark); }, { passive: true });
  window.addEventListener("resize", mark);
  var start = Math.min(1, phones.length - 1);
  setTimeout(function(){ var p = phones[start]; rail.style.scrollBehavior = "auto"; rail.scrollLeft = p.offsetLeft - (rail.clientWidth - p.offsetWidth) / 2; rail.style.scrollBehavior = ""; mark(); }, 60);
})();
