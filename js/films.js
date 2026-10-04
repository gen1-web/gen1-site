/* Cinema Cuts: Full HD brand films and promos (16:9) */
(function(){
  var F = window.FILMS || [];
  if (!F.length) return;
  var esc = function(s){ return String(s || "").replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  var st = document.createElement("style");
  st.textContent = ".films-sec .film-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr));gap:28px;max-width:1200px;margin:0 auto}" +
    ".film{position:relative}" +
    ".film-frame{position:relative;aspect-ratio:16/9;border-radius:22px;overflow:hidden;background:#000;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 30px 70px rgba(0,0,0,.6),0 0 90px rgba(204,0,1,.18);cursor:pointer}" +
    ".film-frame img,.film-frame video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}" +
    ".film-frame img{transition:transform 1s cubic-bezier(.16,1,.3,1),filter .5s}" +
    ".film:hover .film-frame img{transform:scale(1.04);filter:brightness(.75)}" +
    ".film-frame::before,.film-frame::after{content:'';position:absolute;left:0;right:0;height:9%;background:#000;z-index:1;transition:height .5s cubic-bezier(.16,1,.3,1);pointer-events:none}" +
    ".film-frame::before{top:0}.film-frame::after{bottom:0}" +
    ".film:hover .film-frame::before,.film:hover .film-frame::after{height:0}" +
    ".film.playing .film-frame::before,.film.playing .film-frame::after{display:none}" +
    ".film-play{position:absolute;left:50%;top:50%;z-index:2;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:50%;background:rgba(204,0,1,.92);display:grid;place-items:center;box-shadow:0 0 0 10px rgba(204,0,1,.18),0 14px 40px rgba(0,0,0,.5);transition:transform .4s cubic-bezier(.34,1.6,.5,1)}" +
    ".film:hover .film-play{transform:scale(1.12)}" +
    ".film-play svg{width:30px;height:30px;margin-left:5px;fill:#fff}" +
    ".film-badge{position:absolute;top:16px;left:16px;z-index:2;padding:.3rem .75rem;border-radius:999px;background:rgba(0,0,0,.6);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#fff;font-size:.7rem;font-weight:700;letter-spacing:.08em}" +
    ".film-len{position:absolute;bottom:16px;right:16px;z-index:2;padding:.25rem .6rem;border-radius:6px;background:rgba(0,0,0,.7);color:#fff;font-size:.75rem;font-weight:600}" +
    ".film.playing .film-play,.film.playing .film-badge,.film.playing .film-len{display:none}" +
    ".film-info{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;margin-top:1rem;color:#fff}" +
    ".film-info b{font-size:1.2rem;font-weight:700}.film-info span{color:#ff6b62;font-size:.85rem;font-weight:500}";
  document.head.appendChild(st);
  var cards = F.map(function(f, i){
    return '<article class="film" data-i="' + i + '"><div class="film-frame"><img src="' + f.poster + '" alt="' + esc(f.title) + '" loading="lazy">' +
      '<span class="film-badge">FULL HD</span>' + (f.length ? '<span class="film-len">' + esc(f.length) + '</span>' : "") +
      '<span class="film-play"><svg viewBox="0 0 24 24"><path d="M6 4l15 8-15 8z"/></svg></span></div>' +
      '<div class="film-info"><b>' + esc(f.title) + '</b><span>' + esc(f.tag) + '</span></div></article>';
  }).join("");
  var sec = document.createElement("section");
  sec.className = "wsec wsec-black films-sec"; sec.id = "films";
  sec.innerHTML = '<div class="wsec-head light"><h2 class="sec-title">Cinema<br>Cuts.</h2><p class="sec-text">Full HD brand films and promos, made for YouTube, websites, big screens and event nights. Click to watch with sound.</p></div><div class="film-grid">' + cards + "</div>";
  var anchor = document.getElementById("reels") || document.getElementById("videos");
  if (!anchor) return;
  anchor.parentNode.insertBefore(sec, anchor.nextSibling);
  var jump = document.getElementById("jump");
  if (jump) { var r = jump.querySelector('a[href="#reels"]'); var a = document.createElement("a"); a.href = "#films"; a.textContent = "Films"; if (r) r.after(a); else jump.appendChild(a); }
  sec.querySelectorAll(".film").forEach(function(card){
    card.addEventListener("click", function(){
      if (card.classList.contains("playing")) return;
      var f = F[+card.getAttribute("data-i")], frame = card.querySelector(".film-frame");
      var v = document.createElement("video");
      v.src = f.file; v.poster = f.poster; v.controls = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute("controlsList", "nodownload noremoteplayback noplaybackrate"); v.setAttribute("disablePictureInPicture", "");
      v.addEventListener("contextmenu", function(e){ e.preventDefault(); });
      sec.querySelectorAll(".film.playing video").forEach(function(o){ o.pause(); });
      frame.appendChild(v); card.classList.add("playing");
    });
  });
})();
