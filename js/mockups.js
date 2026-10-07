/* Websites: device mockups (laptop + phone or floating window) for entries with mock: {...} */
(function(){
  var W = window.WEBSITES || [];
  var st = document.createElement("style");
  st.textContent = ".mockcard .site-bar{display:none}" +
    ".mockcard .site-view{position:relative;aspect-ratio:16/8.7;height:auto;min-height:0;overflow:hidden;background:radial-gradient(120% 90% at 30% 20%,var(--mk2) 0%,var(--mk1) 55%,#050505 100%)}" +
    ".mk-dots{position:absolute;inset:0;background:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1.6px) 0 0/22px 22px;-webkit-mask-image:radial-gradient(ellipse at 70% 30%,#000,transparent 70%);mask-image:radial-gradient(ellipse at 70% 30%,#000,transparent 70%)}" +
    ".mk-glow{position:absolute;width:55%;aspect-ratio:1;right:-10%;top:-30%;border-radius:50%;background:radial-gradient(circle,var(--mka) 0%,transparent 65%);opacity:.35;filter:blur(30px)}" +
    ".mk-laptop{position:absolute;left:7%;top:7%;width:66%;filter:drop-shadow(0 30px 40px rgba(0,0,0,.55))}" +
    ".mk-lid{background:#0d0d0f;border-radius:14px 14px 4px 4px;padding:2.1% 2.1% 2.6%;box-shadow:inset 0 0 0 1.5px #2b2b30}" +
    ".mk-scr{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:3px;background:#fff}" +
    ".mk-scr img,.mk-pscr img,.mk-win .mk-ws img{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1s ease,transform 6s ease}" +
    ".mk-scr img{object-position:center top}.mk-scr img.on,.mk-pscr img.on,.mk-ws img.on{opacity:1}" +
    ".mk-scr img.on{transform:scale(1.015)}" +
    ".mk-base{position:relative;width:114%;margin-left:-7%;height:0;padding-bottom:3.2%;background:linear-gradient(#cfd0d4,#8d8f95);border-radius:0 0 18px 18px}" +
    ".mk-base::after{content:'';position:absolute;left:42%;right:42%;top:0;height:35%;background:#a8aab0;border-radius:0 0 8px 8px}" +
    ".mk-phone{position:absolute;right:9%;top:17%;width:19%;aspect-ratio:432/844;background:#0d0d0f;border-radius:16% / 7.5%;padding:2.1%;box-shadow:0 30px 60px rgba(0,0,0,.6),inset 0 0 0 1.5px #2b2b30;animation:mkFloat 6s ease-in-out infinite}" +
    ".mk-pscr{position:relative;width:100%;height:100%;overflow:hidden;border-radius:13% / 6%;background:#fff}" +
    ".mk-pscr img{object-position:left top;height:102.5%}" +
    ".mk-notch{position:absolute;left:50%;top:3.2%;width:32%;height:3%;transform:translateX(-50%);background:#0d0d0f;border-radius:20px;z-index:2}" +
    ".mk-win{position:absolute;right:5%;bottom:10%;width:36%;border-radius:10px;overflow:hidden;background:#fff;box-shadow:0 30px 60px rgba(0,0,0,.55);transform:rotate(-3deg);animation:mkFloat2 7s ease-in-out infinite}" +
    ".mk-wbar{display:flex;gap:5px;align-items:center;padding:7px 10px;background:#f1f1ef}.mk-wbar i{width:7px;height:7px;border-radius:50%;background:#d9d9d6}.mk-wbar i:first-child{background:#CC0001}" +
    ".mk-ws{position:relative;aspect-ratio:16/9}.mk-ws img{object-position:center top}" +
    ".mk-live{position:absolute;left:3.2%;top:5%;z-index:3;display:inline-flex;align-items:center;gap:7px;padding:5px 12px;border-radius:99px;background:rgba(0,0,0,.55);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;font-size:.68rem;font-weight:700;letter-spacing:.08em}" +
    ".mk-live::before{content:'';width:7px;height:7px;border-radius:50%;background:#2ecc71;animation:livePulse 1.8s infinite}" +
    ".mk-pdots{position:absolute;left:50%;bottom:4%;z-index:3;display:flex;gap:6px;transform:translateX(-50%)}.mk-pdots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);transition:all .35s}.mk-pdots i.on{width:20px;border-radius:4px;background:#CC0001}" +
    "@keyframes mkFloat{50%{transform:translateY(-10px)}}@keyframes mkFloat2{50%{transform:rotate(-3deg) translateY(-8px)}}" +
    "@media (max-width:640px){.mockcard .site-view{aspect-ratio:4/3}.mk-laptop{left:4%;top:12%;width:78%}.mk-phone{right:4%;width:24%;top:22%}.mk-win{width:44%;right:3%}}";
  document.head.appendChild(st);
  var imgs = function(list){ return list.map(function(src, n){ return '<img src="' + src + '" alt="" loading="lazy"' + (n === 0 ? ' class="on"' : "") + ">"; }).join(""); };
  document.querySelectorAll("#sites .site").forEach(function(card, i){
    var s = W[i]; if (!s || !s.mock) return;
    var m = s.mock, D = m.desktop || [], M = m.mobile || [];
    card.classList.add("wide", "mockcard");
    var view = card.querySelector(".site-view");
    view.style.setProperty("--mk1", m.bg || "#141414"); view.style.setProperty("--mk2", m.bg2 || m.bg || "#2a2a2a"); view.style.setProperty("--mka", m.accent || "#CC0001");
    var second = M.length ? '<div class="mk-phone"><span class="mk-notch"></span><div class="mk-pscr">' + imgs(M) + "</div></div>"
      : (D.length > 1 ? '<div class="mk-win"><div class="mk-wbar"><i></i><i></i><i></i></div><div class="mk-ws">' + imgs(D.slice(1).concat(D[0])) + "</div></div>" : "");
    view.innerHTML = '<span class="mk-dots"></span><span class="mk-glow"></span>' + (s.url ? '<span class="mk-live">LIVE SITE</span>' : "") +
      '<div class="mk-laptop"><div class="mk-lid"><div class="mk-scr">' + imgs(D) + '</div></div><div class="mk-base"></div></div>' + second +
      '<div class="mk-pdots">' + D.map(function(_, n){ return "<i" + (n === 0 ? ' class="on"' : "") + "></i>"; }).join("") + "</div>";
    var groups = [view.querySelectorAll(".mk-scr img"), view.querySelectorAll(".mk-pscr img, .mk-ws img")], dots = view.querySelectorAll(".mk-pdots i"), k = 0;
    setInterval(function(){
      k++;
      groups.forEach(function(g){ if (!g.length) return; g.forEach(function(im){ im.classList.remove("on"); }); g[k % g.length].classList.add("on"); });
      dots.forEach(function(d, n){ d.classList.toggle("on", n === k % dots.length); });
    }, 3400);
  });
})();
