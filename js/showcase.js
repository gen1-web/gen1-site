/* Websites showcase: interactive project switcher with a large device stage */
(function(){
  var grid = document.getElementById("sites");
  var W = window.WEBSITES || [];
  if (!grid) return;
  var cards = [].slice.call(grid.querySelectorAll(".site"));
  var items = [];
  cards.forEach(function(card, i){
    var s = W[i]; if (!s) return;
    var view = card.querySelector(".site-view");
    var hasImg = view && view.querySelector("img");
    if (!s.mock && !hasImg) return;
    items.push({ s: s, view: view, mock: !!s.mock });
  });
  if (!items.length) return;
  var TAGS = {
    "Amsha & Mohammad Funeral Service": ["Website design", "Development", "Mobile-first", "24/7 call funnel"],
    "Adah": ["Product design", "Web app", "Mobile-first", "Habit tools"],
    "Discover Islam": ["Website design", "Development", "Donations", "Outreach"],
    "Dar el Mecca Travel": ["Website design", "Travel", "Packages"]
  };
  var esc = function(t){ return String(t || "").replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  var host = function(u){ try { return new URL(u).hostname.replace(/^www\./, ""); } catch(e){ return ""; } };
  var st = document.createElement("style");
  st.textContent = ".ws{position:relative;z-index:1;display:grid;grid-template-columns:minmax(260px,330px) 1fr;gap:clamp(1.2rem,3vw,2.4rem);max-width:1240px;margin:0 auto;align-items:stretch}" +
    ".ws-list{display:flex;flex-direction:column;gap:6px}" +
    ".ws-item{position:relative;display:grid;grid-template-columns:auto 1fr;gap:.2rem 1rem;align-items:baseline;text-align:left;padding:1.15rem 1.2rem 1.25rem;border:0;border-radius:18px;background:transparent;color:#111;cursor:pointer;font-family:inherit;transition:background .35s,transform .35s}" +
    ".ws-item:hover{background:rgba(0,0,0,.035)}" +
    ".ws-item.on{background:#111;color:#fff;transform:translateX(6px);box-shadow:0 20px 40px rgba(0,0,0,.18)}" +
    ".ws-num{grid-row:span 2;font-size:.78rem;font-weight:700;color:#CC0001;letter-spacing:.05em}" +
    ".ws-item b{font-size:1.05rem;font-weight:700;letter-spacing:-.01em;line-height:1.25}" +
    ".ws-item small{grid-column:2;font-size:.8rem;color:#777;line-height:1.4}.ws-item.on small{color:rgba(255,255,255,.6)}" +
    ".ws-bar{position:absolute;left:1.2rem;right:1.2rem;bottom:.55rem;height:2px;border-radius:2px;background:rgba(255,255,255,.12);overflow:hidden;opacity:0}.ws-item.on .ws-bar{opacity:1}" +
    ".ws-bar i{display:block;height:100%;width:0;background:#CC0001}.ws-item.on .ws-bar i{animation:wsFill var(--ws-t,7s) linear forwards}.ws.paused .ws-item.on .ws-bar i{animation-play-state:paused}" +
    ".ws-count{margin-top:auto;padding:1rem 1.2rem 0;font-size:.78rem;color:#888}.ws-count b{color:#111;font-size:1.6rem;font-weight:800;letter-spacing:-.03em;margin-right:.3rem}" +
    ".ws-main{display:flex;flex-direction:column;gap:1rem;min-width:0}" +
    ".ws-stage{position:relative;aspect-ratio:16/9.4;border-radius:28px;overflow:hidden;background:#0b0b0b;box-shadow:0 50px 100px rgba(0,0,0,.28),0 0 0 1px rgba(0,0,0,.06)}" +
    ".ws-layer{position:absolute;inset:0;opacity:0;visibility:hidden;transform:scale(1.03);transition:opacity .7s ease,transform 1.1s cubic-bezier(.16,1,.3,1),visibility 0s .7s}" +
    ".ws-layer.on{opacity:1;visibility:visible;transform:none;transition:opacity .7s ease,transform 1.1s cubic-bezier(.16,1,.3,1),visibility 0s}" +
    ".ws-stage .ws-layer .site-view{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;min-height:0;margin:0;border-radius:0}" +
    ".ws-layer.plain .site-view img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}" +
    ".ws-info{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem 1.5rem;padding:.4rem .3rem}" +
    ".ws-info h3{margin:0;font-size:clamp(1.4rem,2.6vw,2rem);font-weight:700;letter-spacing:-.03em;color:#111}" +
    ".ws-info p{margin:.25rem 0 0;color:#666;font-size:.92rem}" +
    ".ws-tags{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.7rem}.ws-tags span{padding:.32rem .75rem;border-radius:999px;background:#fff;border:1px solid #e6e6e2;font-size:.75rem;font-weight:600;color:#444}" +
    ".ws-go{display:inline-flex;align-items:center;gap:.6rem;padding:.95rem 1.5rem;border-radius:999px;background:#CC0001;color:#fff;font-weight:600;font-size:.92rem;text-decoration:none;box-shadow:0 14px 30px rgba(204,0,1,.3);transition:transform .25s,box-shadow .25s}" +
    ".ws-go:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(204,0,1,.42)}.ws-go small{opacity:.75;font-weight:500}" +
    ".ws-go.off{background:#e9e9e6;color:#777;box-shadow:none;pointer-events:none}" +
    ".ws-arrows{position:absolute;right:16px;bottom:16px;z-index:5;display:flex;gap:8px}" +
    ".ws-arrows button{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;font-size:1.05rem;cursor:pointer;transition:background .25s}" +
    ".ws-arrows button:hover{background:#CC0001;border-color:#CC0001}" +
    "@keyframes wsFill{to{width:100%}}" +
    "@media (max-width:900px){.ws{grid-template-columns:1fr}.ws-list{flex-direction:row;overflow-x:auto;scrollbar-width:none;gap:8px;padding-bottom:4px}.ws-list::-webkit-scrollbar{display:none}.ws-item{flex:none;min-width:220px}.ws-item.on{transform:none}.ws-count{display:none}.ws-stage{aspect-ratio:4/3.4;border-radius:20px}}";
  document.head.appendChild(st);

  var wrap = document.createElement("div"); wrap.className = "ws";
  var list = document.createElement("div"); list.className = "ws-list"; list.setAttribute("role", "tablist");
  var main = document.createElement("div"); main.className = "ws-main";
  var stage = document.createElement("div"); stage.className = "ws-stage";
  var info = document.createElement("div"); info.className = "ws-info";
  items.forEach(function(it, n){
    var b = document.createElement("button"); b.type = "button"; b.className = "ws-item"; b.setAttribute("role", "tab");
    b.innerHTML = '<span class="ws-num">' + String(n + 1).padStart(2, "0") + '</span><b>' + esc(it.s.title) + '</b><small>' + esc(it.s.type) + '</small><span class="ws-bar"><i></i></span>';
    b.addEventListener("click", function(){ go(n, true); });
    list.appendChild(b); it.btn = b;
    var layer = document.createElement("div"); layer.className = "ws-layer " + (it.mock ? "mockcard" : "plain");
    layer.appendChild(it.view); stage.appendChild(layer); it.layer = layer;
  });
  var count = document.createElement("div"); count.className = "ws-count";
  count.innerHTML = "<b>" + (W.length >= 10 ? W.length : "10+") + "</b>websites built for organisations, charities and businesses";
  list.appendChild(count);
  stage.insertAdjacentHTML("beforeend", '<div class="ws-arrows"><button type="button" aria-label="Previous website">&#8592;</button><button type="button" aria-label="Next website">&#8594;</button></div>');
  main.appendChild(stage); main.appendChild(info);
  wrap.appendChild(list); wrap.appendChild(main);
  grid.style.display = "none";
  grid.parentNode.insertBefore(wrap, grid.nextSibling);

  var cur = -1, timer = null, T = 7000;
  wrap.style.setProperty("--ws-t", T / 1000 + "s");
  function go(n, user){
    n = (n + items.length) % items.length;
    if (n === cur) return;
    items.forEach(function(it, k){ it.btn.classList.toggle("on", k === n); it.btn.setAttribute("aria-selected", k === n); it.layer.classList.toggle("on", k === n); });
    var it = items[n], s = it.s, tags = s.tags || TAGS[s.title] || ["Website design", "Development"];
    info.innerHTML = '<div><h3>' + esc(s.title) + '</h3><p>' + esc(s.type) + '</p><div class="ws-tags">' + tags.map(function(t){ return "<span>" + esc(t) + "</span>"; }).join("") + "</div></div>" +
      (s.url ? '<a class="ws-go" href="' + esc(s.url) + '" target="_blank" rel="noopener">Visit live site <small>' + esc(host(s.url)) + '</small> &#8599;</a>' : '<span class="ws-go off">Private project</span>');
    var bars = list.querySelectorAll(".ws-bar i"); bars.forEach(function(b){ b.style.animation = "none"; void b.offsetWidth; b.style.animation = ""; });
    cur = n; restart();
  }
  function restart(){ clearTimeout(timer); timer = setTimeout(function(){ go(cur + 1); }, T); }
  var arrows = stage.querySelectorAll(".ws-arrows button");
  arrows[0].addEventListener("click", function(){ go(cur - 1, true); });
  arrows[1].addEventListener("click", function(){ go(cur + 1, true); });
  wrap.addEventListener("mouseenter", function(){ wrap.classList.add("paused"); clearTimeout(timer); });
  wrap.addEventListener("mouseleave", function(){ wrap.classList.remove("paused"); restart(); });
  go(0);
})();
