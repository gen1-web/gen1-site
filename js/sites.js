/* Websites: sliding screens + live badge for sites with several screenshots */
(function(){
  var W = window.WEBSITES || [];
  var st = document.createElement("style");
  st.textContent = ".site-view.slides img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:left top;opacity:0;transform:scale(1);transition:opacity .9s ease,transform 7s linear}" +
    ".site-view.slides img.on{opacity:1;transform:scale(1.03)}" +
    ".slides .dots{position:absolute;left:50%;bottom:12px;z-index:2;display:flex;gap:6px;padding:6px 9px;border-radius:99px;background:rgba(0,0,0,.5);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transform:translateX(-50%)}" +
    ".slides .dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.55);transition:all .35s}" +
    ".slides .dots i.on{width:20px;border-radius:4px;background:#CC0001}" +
    ".site-bar .live{flex:none;margin-left:8px;display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:99px;background:#111;color:#fff;font-size:.66rem;font-weight:700;letter-spacing:.06em}" +
    ".site-bar .live::before{content:'';width:7px;height:7px;border-radius:50%;background:#2ecc71;box-shadow:0 0 0 0 rgba(46,204,113,.6);animation:livePulse 1.8s infinite}" +
    "@keyframes livePulse{70%{box-shadow:0 0 0 7px rgba(46,204,113,0)}100%{box-shadow:0 0 0 0 rgba(46,204,113,0)}}" +
    ".sites .site.wide{grid-column:1/-1;grid-row:auto}" +
    ".sites .site.wide .site-view{aspect-ratio:1554/710;height:auto;min-height:0}";
  document.head.appendChild(st);
  document.querySelectorAll("#sites .site").forEach(function(card, i){
    var s = W[i]; if (!s) return;
    if (s.url) { var bar = card.querySelector(".site-bar"); if (bar) bar.insertAdjacentHTML("beforeend", '<span class="live">LIVE</span>'); }
    if (!s.images || !s.images.length || !s.image) return;
    var list = [s.image].concat(s.images), view = card.querySelector(".site-view"), k = 0;
    view.classList.add("slides");
    card.classList.add("wide");
    view.innerHTML = list.map(function(src, n){ return '<img src="' + src + '" alt="' + s.title + ' website, screen ' + (n + 1) + '"' + (n ? ' loading="lazy"' : "") + (n === 0 ? ' class="on"' : "") + ">"; }).join("") +
      '<div class="dots">' + list.map(function(_, n){ return "<i" + (n === 0 ? ' class="on"' : "") + "></i>"; }).join("") + "</div>";
    var imgs = view.querySelectorAll("img"), dots = view.querySelectorAll(".dots i");
    setInterval(function(){
      imgs[k].classList.remove("on"); dots[k].classList.remove("on");
      k = (k + 1) % imgs.length;
      imgs[k].classList.add("on"); dots[k].classList.add("on");
    }, 3200);
  });
})();
