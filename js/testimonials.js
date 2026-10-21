/* Testimonials: bold dark marquee, placed right after the reels section */
window.TESTIMONIALS = window.TESTIMONIALS || [
  { name: "Mohammad Asif", role: "CEO, Dar el Mecca Travel", tag: "Client", text: "I truly admire the professional work delivered by the Gen1 Solutions team. Their designs, marketing strategies, ad campaigns, and video production were all exceptional." },
  { name: "Imam, Al-Manaar Centre", role: "Al-Manaar Muslim Cultural Heritage Centre, UK", tag: "Client", text: "We love the way Gen1solutions work, exceeded in terms of Quality and the way Abdul Aleem deals with clients with patience and utmost respect its awesome" },
  { name: "Sa'diyya Nesar", role: "Award-winning Author & TEDx Speaker", tag: "Client", src: "LinkedIn", text: "Abdul Aleem's videography work quality is highly professional and efficient. He understands vision in mind and promptly works on the project by utilizing his skills. He takes the time to understand what client is looking for and makes useful recommendations for clients to consider. I would highly recommend him as a videographer that also plans according to social media optimization." },
  { name: "Waleed Razzaq", role: "Mechanical BIM Specialist & Principal HVAC Engineer", tag: "Client", src: "LinkedIn", text: "I highly recommend Abdul Aleem for animation projects. He exceeded my expectations with his exceptional work on my Revit families animation showcasing his unique ability to understand complex requirements and deliver accurate, engaging visuals. Abdul's rare blend of artistic flair, technical skill, and mathematical precision makes him an invaluable asset to any project." },
  { name: "Nadeem Ashraf", role: "Motivational Speaker, Fundraising Specialist & Da'wah Trainer", tag: "Worked together", src: "LinkedIn", text: "I would regard Abdulaleem as one of the most talented professionals out there. We are talking premium standards. I've known and worked with him for many years and he has excellence in all his works be it video editing, management, general media. This is a world class service." },
  { name: "Abdullah Qazi", role: "Graphic Design Lead, Youth Club", tag: "Worked together", src: "LinkedIn", text: "I had the privilege of working with Abdul Aleem for approximately two years at Youth Club. He was the Marketing and Media Head, and I led the Graphic Design team. I really enjoyed working with him as he always welcomed feedback and approached challenges with creativity and innovation. His dedication and sincerity to work are qualities that I find truly remarkable!" }
];
(function(){
  var T = window.TESTIMONIALS || [];
  // place right after the reels/videos section
  var anchor = document.getElementById("videos") || document.getElementById("films") || document.getElementById("faq") || document.getElementById("contact");
  if (!T.length || !anchor) return;
  var esc = function(s){ return String(s || "").replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  var initials = function(n){ return n.replace(/^Imam,\s*/, "").split(/\s+/).filter(Boolean).slice(0, 2).map(function(w){ return w[0]; }).join("").toUpperCase(); };
  var st = document.createElement("style");
  st.textContent = ".tst{position:relative;background:#0a0a0a;color:#fff;padding:clamp(4.5rem,10vw,8rem) 0;overflow:hidden}" +
    ".tst::before{content:'';position:absolute;width:60%;aspect-ratio:1;left:-10%;top:-20%;background:radial-gradient(circle,rgba(204,0,1,.35),transparent 60%);filter:blur(40px);pointer-events:none}" +
    ".tst::after{content:'';position:absolute;width:50%;aspect-ratio:1;right:-8%;bottom:-20%;background:radial-gradient(circle,rgba(204,0,1,.22),transparent 60%);filter:blur(40px);pointer-events:none}" +
    ".tst-head{position:relative;z-index:1;max-width:1200px;margin:0 auto 3rem;padding:0 var(--pad,1.5rem);display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1.2rem}" +
    ".tst-head h2{margin:0;font-size:clamp(2.6rem,7vw,5rem);font-weight:700;letter-spacing:-.045em;line-height:.9}.tst-head h2 b{color:#CC0001}" +
    ".tst-head .tst-kick{display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#ff6b62;margin-bottom:1rem}" +
    ".tst-head .tst-kick::before{content:'';width:26px;height:2px;background:#CC0001}" +
    ".tst-head p{margin:0;max-width:26ch;color:rgba(255,255,255,.55);line-height:1.6}" +
    ".tst-rows{position:relative;z-index:1;display:flex;flex-direction:column;gap:18px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}" +
    ".tst-track{display:flex;gap:18px;width:max-content;will-change:transform}" +
    ".tst-track.r1{animation:tstL var(--d1,55s) linear infinite}" +
    ".tst-track.r2{animation:tstR var(--d2,70s) linear infinite}" +
    ".tst-rows:hover .tst-track{animation-play-state:paused}" +
    ".tcard{position:relative;flex:none;width:min(430px,84vw);display:flex;flex-direction:column;gap:1.1rem;padding:1.9rem 1.7rem 1.5rem;border-radius:22px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:transform .4s cubic-bezier(.16,1,.3,1),background .4s,border-color .4s}" +
    ".tcard:hover{transform:translateY(-6px);background:rgba(255,255,255,.07);border-color:#CC0001}" +
    ".tcard::before{content:'\\201C';position:absolute;top:-.4rem;right:1.3rem;font:700 5.5rem/1 Georgia,serif;color:#CC0001;opacity:.5}" +
    ".tstars{display:flex;gap:3px;color:#ffc531}.tstars svg{width:15px;height:15px;fill:currentColor}" +
    ".tcard q{quotes:none;font-size:1rem;line-height:1.65;color:rgba(255,255,255,.88);flex:1}" +
    ".tperson{display:flex;align-items:center;gap:.8rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.1)}" +
    ".tav{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#CC0001,#7a0001);color:#fff;font-weight:700;font-size:.92rem}" +
    ".tperson b{display:block;font-size:.95rem}.tperson small{display:block;color:rgba(255,255,255,.5);font-size:.78rem;line-height:1.4}" +
    ".tmeta{display:flex;gap:.4rem;margin-left:auto;flex-direction:column;align-items:flex-end}" +
    ".tmeta span{white-space:nowrap;font-size:.64rem;font-weight:700;letter-spacing:.04em;padding:.25rem .6rem;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.75)}" +
    ".tmeta .src{background:#0a66c2;border-color:#0a66c2;color:#fff}" +
    "@keyframes tstL{to{transform:translateX(-50%)}}@keyframes tstR{from{transform:translateX(-50%)}to{transform:translateX(0)}}" +
    "@media (prefers-reduced-motion:reduce){.tst-track{animation:none!important}.tst-rows{overflow-x:auto}}";
  document.head.appendChild(st);
  var stars = '<div class="tstars">' + [0,0,0,0,0].map(function(){ return '<svg viewBox="0 0 24 24"><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'; }).join("") + "</div>";
  var card = function(t){
    return '<figure class="tcard">' + stars + '<q>' + esc(t.text) + '</q><figcaption class="tperson"><span class="tav" aria-hidden="true">' + esc(initials(t.name)) + '</span><span><b>' + esc(t.name) + '</b><small>' + esc(t.role) + '</small></span>' +
      '<span class="tmeta">' + (t.tag ? '<span>' + esc(t.tag) + '</span>' : "") + (t.src ? '<span class="src">' + esc(t.src) + '</span>' : "") + '</span></figcaption></figure>';
  };
  var mid = Math.ceil(T.length / 2);
  var rowA = T.slice(0, mid), rowB = T.slice(mid).concat(rowA.slice(0, Math.max(0, mid - (T.length - mid))));
  if (rowB.length < 2) rowB = T.slice();
  var dup = function(arr){ var h = arr.map(card).join(""); return h + '<div style="display:contents" aria-hidden="true">' + h + "</div>"; };
  var sec = document.createElement("section");
  sec.className = "tst"; sec.id = "testimonials"; sec.setAttribute("aria-labelledby", "tstTitle");
  sec.innerHTML = '<div class="tst-head"><div><span class="tst-kick">Client love</span><h2 id="tstTitle">What clients<br><b>say.</b></h2></div><p>From imams and charity leaders to award-winning authors and engineers. Hover to pause.</p></div>' +
    '<div class="tst-rows"><div class="tst-track r1" style="--d1:' + Math.max(40, rowA.length * 13) + 's">' + dup(rowA) + '</div><div class="tst-track r2" style="--d2:' + Math.max(48, rowB.length * 15) + 's">' + dup(rowB) + "</div></div>";
  anchor.parentNode.insertBefore(sec, anchor.nextSibling);
})();
