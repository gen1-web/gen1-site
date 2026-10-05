/* Testimonials: "What clients say". Add new ones to the list below. */
window.TESTIMONIALS = window.TESTIMONIALS || [
  { name: "Imam, Al-Manaar Centre", role: "Al-Manaar Muslim Cultural Heritage Centre, UK", tag: "Client", text: "We love the way Gen1solutions work, exceeded in terms of Quality and the way Abdul Aleem deals with clients with patience and utmost respect its awesome" },
  { name: "Sa'diyya Nesar", role: "Award-winning Author & TEDx Speaker", tag: "Client", src: "LinkedIn", text: "Abdul Aleem's videography work quality is highly professional and efficient. He understands vision in mind and promptly works on the project by utilizing his skills. He takes the time to understand what client is looking for and makes useful recommendations for clients to consider. I would highly recommend him as a videographer that also plans according to social media optimization." },
  { name: "Waleed Razzaq", role: "Mechanical BIM Specialist & Principal HVAC Engineer", tag: "Client", src: "LinkedIn", text: "I highly recommend Abdul Aleem for animation projects. He exceeded my expectations with his exceptional work on my Revit families animation showcasing his unique ability to understand complex requirements and deliver accurate, engaging visuals. Abdul's rare blend of artistic flair, technical skill, and mathematical precision makes him an invaluable asset to any project." },
  { name: "Nadeem Ashraf", role: "Motivational Speaker, Fundraising Specialist & Da'wah Trainer", tag: "Worked together", src: "LinkedIn", text: "I would regard Abdulaleem as one of the most talented professionals out there. We are talking premium standards. I've known and worked with him for many years and he has excellence in all his works be it video editing, management, general media. This is a world class service." },
  { name: "Abdullah Qazi", role: "Graphic Design Lead, Youth Club", tag: "Worked together", src: "LinkedIn", text: "I had the privilege of working with Abdul Aleem for approximately two years at Youth Club. He was the Marketing and Media Head, and I led the Graphic Design team. I really enjoyed working with him as he always welcomed feedback and approached challenges with creativity and innovation. His dedication and sincerity to work are qualities that I find truly remarkable!" }
];
(function(){
  var T = window.TESTIMONIALS || [];
  var anchor = document.getElementById("faq") || document.getElementById("contact");
  if (!T.length || !anchor) return;
  var esc = function(s){ return String(s || "").replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  var initials = function(n){ return n.replace(/^Imam,\s*/, "").split(/\s+/).filter(Boolean).slice(0, 2).map(function(w){ return w[0]; }).join("").toUpperCase(); };
  var st = document.createElement("style");
  st.textContent = ".tst{position:relative;background:#fff;color:#111;padding:clamp(4rem,9vw,7rem) 0;overflow:hidden}" +
    ".tst-head{max-width:1200px;margin:0 auto 3rem;padding:0 var(--pad,1.5rem);display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1.5rem}" +
    ".tst-head h2{margin:0;font-size:clamp(2.4rem,6vw,4.4rem);font-weight:700;letter-spacing:-.04em;line-height:.95}.tst-head h2 b{color:#CC0001}" +
    ".tst-head p{margin:0;max-width:30ch;color:#666;line-height:1.6}" +
    ".tst-track{display:flex;gap:24px;width:max-content;animation:tstMove var(--dur,60s) linear infinite;padding:10px 0 30px}" +
    ".tst:hover .tst-track{animation-play-state:paused}" +
    ".tst-mask{-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}" +
    ".tcard{position:relative;flex:none;width:min(420px,82vw);display:flex;flex-direction:column;gap:1.2rem;padding:2rem 1.8rem 1.6rem;border-radius:24px;background:#f6f6f4;border:1px solid #ececea;transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s,background .4s}" +
    ".tcard:hover{transform:translateY(-6px);background:#fff;box-shadow:0 30px 60px rgba(0,0,0,.1),0 0 0 1.5px #CC0001}" +
    ".tcard::before{content:'\\201C';position:absolute;top:-.6rem;right:1.4rem;font:700 6rem/1 Georgia,serif;color:#CC0001;opacity:.18}" +
    ".tcard q{quotes:none;font-size:1rem;line-height:1.7;color:#2a2a2a;flex:1}" +
    ".tperson{display:flex;align-items:center;gap:.85rem;padding-top:1.1rem;border-top:1px solid #e6e6e2}" +
    ".tav{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:#CC0001;color:#fff;font-weight:700;font-size:.95rem}" +
    ".tperson b{display:block;font-size:.98rem}.tperson small{display:block;color:#777;font-size:.78rem;line-height:1.4}" +
    ".tmeta{display:flex;gap:.4rem;margin-left:auto;flex-direction:column;align-items:flex-end}" +
    ".tmeta span{white-space:nowrap;font-size:.66rem;font-weight:700;letter-spacing:.04em;padding:.25rem .6rem;border-radius:999px;background:#fff;border:1px solid #e4e4e0;color:#555}" +
    ".tmeta .src{background:#0a66c2;border-color:#0a66c2;color:#fff}" +
    "@keyframes tstMove{to{transform:translateX(-50%)}}" +
    "@media (prefers-reduced-motion:reduce){.tst-track{animation:none}.tst-mask{overflow-x:auto}}";
  document.head.appendChild(st);
  var card = function(t){
    return '<figure class="tcard"><q>' + esc(t.text) + '</q><figcaption class="tperson"><span class="tav" aria-hidden="true">' + esc(initials(t.name)) + '</span><span><b>' + esc(t.name) + '</b><small>' + esc(t.role) + '</small></span>' +
      '<span class="tmeta">' + (t.tag ? '<span>' + esc(t.tag) + '</span>' : "") + (t.src ? '<span class="src">' + esc(t.src) + '</span>' : "") + '</span></figcaption></figure>';
  };
  var set = T.map(card).join("");
  var sec = document.createElement("section");
  sec.className = "tst"; sec.id = "testimonials"; sec.setAttribute("aria-labelledby", "tstTitle");
  sec.innerHTML = '<div class="tst-head"><h2 id="tstTitle">What clients<br><b>say.</b></h2><p>From imams and charity leaders to authors and engineers. Hover to pause.</p></div>' +
    '<div class="tst-mask"><div class="tst-track" style="--dur:' + Math.max(40, T.length * 14) + 's">' + set + '<div style="display:contents" aria-hidden="true">' + set + '</div></div></div>';
  anchor.parentNode.insertBefore(sec, anchor);
})();
