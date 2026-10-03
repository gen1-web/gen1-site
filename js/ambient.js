/* Ambient background: pure black dark sections, moving red glass light, floating creative icons */
(function(){
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var P = {
    monitor: '<rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>',
    laptop: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20l-2-4H4z"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
    pen: '<path d="M12 2l7 9-7 11-7-11z"/><circle cx="12" cy="11" r="1.6"/><path d="M12 2v7.4"/>',
    bezier: '<path d="M3 18C8 4 16 4 21 18"/><rect x="1.5" y="16.5" width="3" height="3"/><rect x="19.5" y="16.5" width="3" height="3"/><path d="M3 18L8 6M21 18l-5-12"/><circle cx="8" cy="6" r="1.3"/><circle cx="16" cy="6" r="1.3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
    brush: '<path d="M19 3l2 2-9 9-2-2z"/><path d="M10 12c-3 0-5 2-5 5 0 1.5-1 2.5-2 3 4 1 9 0 9-5z"/>',
    crop: '<path d="M6 2v16h16"/><path d="M2 6h16v16"/>',
    type: '<path d="M5 5h14M12 5v14M9 19h6"/>',
    timeline: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M7 5v5M12 5v5M17 5v5"/><rect x="5" y="13" width="6" height="3" rx="1"/><rect x="13" y="13" width="5" height="3" rx="1"/>',
    film: '<rect x="3" y="2" width="18" height="20" rx="2"/><path d="M7 2v20M17 2v20M3 7h4M3 12h4M3 17h4M17 7h4M17 12h4M17 17h4"/>',
    play: '<circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/>',
    camera: '<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13.5" r="4"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M3 18l6-5 4 3 3-2 5 4"/>',
    heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    hashtag: '<path d="M9 3L7 21M17 3l-2 18M4 8h17M3 16h17"/>',
    cursor: '<path d="M5 3l14 7-6 2-2 6z"/>',
    bell: '<path d="M6 16V11a6 6 0 0112 0v5l2 2H4z"/><path d="M10 20a2 2 0 004 0"/>'
  };
  var NAMES = Object.keys(P);
  var css = "" +
    ".hero,.videos,.services,.whero,.wsec-dark,.wsec-black,.legal-hero{background:#000!important}" +
    ".legal-hero,.legal,.clients{isolation:isolate;overflow:hidden}" +
    ".amb{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}" +
    ".amb-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.42;background:radial-gradient(circle,rgba(220,0,10,.9),rgba(204,0,1,0) 70%);will-change:transform}" +
    ".amb-orb.o1{width:46vmax;height:46vmax;left:-12vmax;top:-14vmax;animation:ambA 26s ease-in-out infinite alternate}" +
    ".amb-orb.o2{width:36vmax;height:36vmax;right:-10vmax;bottom:-16vmax;opacity:.32;animation:ambB 32s ease-in-out infinite alternate}" +
    ".amb-glass{position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.035) 45%,transparent 60%);background-size:260% 100%;animation:ambSheen 16s ease-in-out infinite}" +
    ".amb-i{position:absolute;width:var(--s);height:var(--s);color:var(--c);opacity:0;animation:ambIn 1.6s ease forwards,ambFloat var(--d) ease-in-out infinite alternate;animation-delay:var(--w),var(--w)}" +
    ".amb-i svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}" +
    ".amb.dark .amb-i{--c:rgba(255,255,255,.11)}.amb.dark .amb-i.r{--c:rgba(255,60,50,.22)}" +
    ".amb.light .amb-i{--c:rgba(0,0,0,.07)}.amb.light .amb-i.r{--c:rgba(204,0,1,.14)}" +
    ".amb.red .amb-i{--c:rgba(255,255,255,.16)}" +
    "@keyframes ambIn{to{opacity:1}}" +
    "@keyframes ambFloat{0%{transform:translate(0,0) rotate(var(--r0))}100%{transform:translate(var(--dx),var(--dy)) rotate(var(--r1))}}" +
    "@keyframes ambA{0%{transform:translate(0,0) scale(1)}50%{transform:translate(18vw,10vh) scale(1.15)}100%{transform:translate(6vw,24vh) scale(.95)}}" +
    "@keyframes ambB{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-20vw,-12vh) scale(1.1)}100%{transform:translate(-8vw,-26vh) scale(1)}}" +
    "@keyframes ambSheen{0%{background-position:130% 0}55%,100%{background-position:-30% 0}}" +
    "@media (max-width:760px){.amb-i:nth-child(n+8){display:none}}" +
    "@media (prefers-reduced-motion:reduce){.amb-i,.amb-orb,.amb-glass{animation:none!important;opacity:1}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var seed = 7;
  function rnd(){ seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function layer(sec, kind, count, orbs){
    var amb = document.createElement("div");
    amb.className = "amb " + kind; amb.setAttribute("aria-hidden", "true");
    var html = orbs ? '<div class="amb-orb o1"></div><div class="amb-orb o2"></div><div class="amb-glass"></div>' : "";
    for (var i = 0; i < count; i++) {
      var name = NAMES[Math.floor(rnd() * NAMES.length)];
      var col = i % 2, row = Math.floor(i / 2), rows = Math.ceil(count / 2);
      var x = (col ? 52 : 2) + rnd() * 44, y = (row / rows) * 100 + rnd() * (90 / rows);
      var s = Math.round(26 + rnd() * 46), r0 = Math.round(rnd() * 40 - 20);
      html += '<span class="amb-i' + (rnd() < .3 ? " r" : "") + '" style="left:' + x.toFixed(1) + "%;top:" + Math.min(y, 94).toFixed(1) + "%;--s:" + s + "px;--d:" + (9 + rnd() * 12).toFixed(1) + "s;--w:" + (rnd() * 2).toFixed(2) + "s;--r0:" + r0 + "deg;--r1:" + (r0 + Math.round(rnd() * 30 - 15)) + "deg;--dx:" + Math.round(rnd() * 40 - 20) + "px;--dy:" + Math.round(-14 - rnd() * 26) + 'px"><svg viewBox="0 0 24 24">' + P[name] + "</svg></span>";
    }
    amb.innerHTML = html;
    sec.insertBefore(amb, sec.firstChild);
  }
  var map = [
    [".hero", "dark", 12, false], [".videos", "dark", 12, true], [".services", "dark", 12, true],
    [".whero", "dark", 10, false], [".wsec-dark", "dark", 12, true], [".wsec-black", "dark", 12, true], [".legal-hero", "dark", 8, true],
    [".designs", "light", 10, false], [".websites", "light", 10, false], [".story", "light", 8, false], [".wsec-light", "light", 12, false], [".legal", "light", 8, false],
    [".process", "red", 10, false], [".cta", "red", 10, false]
  ];
  map.forEach(function(m){ document.querySelectorAll(m[0]).forEach(function(sec){ layer(sec, m[1], m[2], m[3]); }); });
})();
