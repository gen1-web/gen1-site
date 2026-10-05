/* Contact: "Book a meeting" form (sent by email via FormSubmit) + optional Calendly */
(function(){
  var sec = document.getElementById("contact");
  if (!sec) return;
  var TO = "contact.gen1solutions@gmail.com";
  var CALENDLY = window.CALENDLY_URL || "https://calendly.com/contact-gen1solutions/30min";
  var st = document.createElement("style");
  st.textContent = ".bk{position:relative;z-index:2;max-width:860px;margin:3rem auto 0;text-align:left;background:#fff;color:#111;border-radius:26px;padding:clamp(1.4rem,4vw,2.6rem);box-shadow:0 40px 90px rgba(0,0,0,.35)}" +
    ".bk h3{margin:0 0 .3rem;font-size:clamp(1.5rem,3vw,2rem);font-weight:700;letter-spacing:-.03em}.bk h3 b{color:#CC0001}" +
    ".bk .bk-sub{margin:0 0 1.6rem;color:#666;font-size:.95rem}" +
    ".bk-tabs{display:inline-flex;gap:4px;padding:4px;border-radius:999px;background:#f1f1ef;margin-bottom:1.6rem}" +
    ".bk-tabs button{border:0;background:none;padding:.55rem 1.1rem;border-radius:999px;font:600 .85rem Poppins,sans-serif;color:#555;cursor:pointer}.bk-tabs button.on{background:#CC0001;color:#fff}" +
    ".bk form{display:grid;grid-template-columns:1fr 1fr;gap:1rem 1.1rem}.bk .full{grid-column:1/-1}" +
    ".bk label{display:flex;flex-direction:column;gap:.4rem;font-size:.78rem;font-weight:600;color:#333}" +
    ".bk input,.bk select,.bk textarea{font:400 .95rem Poppins,sans-serif;color:#111;background:#f7f7f5;border:1.5px solid #e4e4e0;border-radius:14px;padding:.85rem 1rem;outline:none;transition:border-color .2s,box-shadow .2s,background .2s}" +
    ".bk textarea{min-height:120px;resize:vertical}" +
    ".bk input,.bk select,.bk textarea{width:100%;box-sizing:border-box;min-width:0}.bk form>*{min-width:0}.bk{box-sizing:border-box;width:100%}" +
    ".bk input:focus,.bk select:focus,.bk textarea:focus{border-color:#CC0001;background:#fff;box-shadow:0 0 0 4px rgba(204,0,1,.12)}" +
    ".bk .chips{display:flex;flex-wrap:wrap;gap:.5rem}.bk .chips label{flex-direction:row;align-items:center}" +
    ".bk .chips input{position:absolute;opacity:0;pointer-events:none}.bk .chips span{padding:.5rem .95rem;border-radius:999px;border:1.5px solid #e4e4e0;font-weight:500;font-size:.85rem;cursor:pointer;transition:all .2s}" +
    ".bk .chips input:checked+span{background:#CC0001;border-color:#CC0001;color:#fff}" +
    ".bk .hp{position:absolute;left:-9999px}" +
    ".bk button[type=submit]{grid-column:1/-1;justify-self:start;border:0;cursor:pointer;background:#CC0001;color:#fff;font:600 1rem Poppins,sans-serif;padding:1rem 2rem;border-radius:999px;box-shadow:0 14px 30px rgba(204,0,1,.35);transition:transform .25s,box-shadow .25s}" +
    ".bk button[type=submit]:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(204,0,1,.45)}.bk button[disabled]{opacity:.6;cursor:wait}" +
    ".bk .note{grid-column:1/-1;font-size:.8rem;color:#888;margin:0}.bk .note a{color:#CC0001}" +
    ".bk .ok{display:none;text-align:center;padding:2rem 0}.bk.sent form,.bk.sent .bk-tabs{display:none}.bk.sent .ok{display:block}" +
    ".bk .ok b{display:block;font-size:1.6rem;margin-bottom:.4rem}.bk .err{grid-column:1/-1;color:#CC0001;font-size:.88rem;margin:0;display:none}" +
    ".bk .cal{display:none;height:680px;border-radius:16px;overflow:hidden}.bk.cal-on .cal{display:block}.bk.cal-on form{display:none}" +
    "@media (max-width:640px){.bk form{grid-template-columns:1fr}}";
  document.head.appendChild(st);
  var services = ["Social media design", "Video & reels", "Website", "Branding", "Marketing & ads", "Not sure yet"];
  var box = document.createElement("div");
  box.className = "bk"; box.id = "book";
  box.innerHTML = '<h3>Book a <b>free</b> meeting</h3><p class="bk-sub">Tell us a little about your project and when suits you. We will confirm a time on WhatsApp or email, usually the same day.</p>' +
    (CALENDLY ? '<div class="bk-tabs" role="tablist"><button type="button" class="on" data-t="form">Send details</button><button type="button" data-t="cal">Pick a time now</button></div>' : "") +
    '<form novalidate>' +
    '<label>Your name *<input name="name" required autocomplete="name"></label>' +
    '<label>Organisation<input name="organisation" autocomplete="organization"></label>' +
    '<label>Email *<input name="email" type="email" required autocomplete="email"></label>' +
    '<label>WhatsApp number<input name="whatsapp" type="tel" autocomplete="tel" placeholder="+44 7..."></label>' +
    '<div class="full"><label style="margin-bottom:.5rem">What do you need?</label><div class="chips">' + services.map(function(s){ return '<label><input type="checkbox" name="services" value="' + s + '"><span>' + s + '</span></label>'; }).join("") + '</div></div>' +
    '<label>Preferred day<input name="preferred_day" type="date"></label>' +
    '<label>Preferred time<select name="preferred_time"><option value="">Any time</option><option>Morning (UK)</option><option>Afternoon (UK)</option><option>Evening (UK)</option><option>Morning (Pakistan)</option><option>Afternoon (Pakistan)</option><option>Evening (Pakistan)</option></select></label>' +
    '<label class="full">Tell us about your project *<textarea name="message" required placeholder="Event, course, campaign, deadline, budget..."></textarea></label>' +
    '<input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off">' +
    '<p class="err" role="alert"></p>' +
    '<button type="submit">Request my meeting</button>' +
    '<p class="note">Prefer email? Write to <a href="mailto:' + TO + '">' + TO + '</a>. By sending this form you agree to our <a href="/privacy-policy">privacy policy</a>.</p></form>' +
    (CALENDLY ? '<div class="cal"></div>' : "") +
    '<div class="ok" role="status"><b>Thank you, we have your request.</b>We will be in touch shortly, in sha Allah.</div>';
  sec.appendChild(box);
  var form = box.querySelector("form"), err = box.querySelector(".err"), btn = form.querySelector("button[type=submit]");
  form.addEventListener("submit", function(e){
    e.preventDefault(); err.style.display = "none";
    var fd = new FormData(form);
    if (!fd.get("name") || !/^\S+@\S+\.\S+$/.test(fd.get("email") || "") || !fd.get("message")) { err.textContent = "Please add your name, a valid email and a few words about your project."; err.style.display = "block"; return; }
    if (fd.get("_honey")) return;
    var data = { name: fd.get("name"), organisation: fd.get("organisation"), email: fd.get("email"), whatsapp: fd.get("whatsapp"), services: fd.getAll("services").join(", "), preferred_day: fd.get("preferred_day"), preferred_time: fd.get("preferred_time"), message: fd.get("message"),
      _subject: "New meeting request: " + fd.get("name") + (fd.get("organisation") ? " (" + fd.get("organisation") + ")" : ""), _replyto: fd.get("email"), _template: "table", _captcha: "false" };
    btn.disabled = true; btn.textContent = "Sending...";
    fetch("https://formsubmit.co/ajax/" + TO, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
      .then(function(r){ return r.json(); })
      .then(function(j){ if (j && (j.success === true || j.success === "true")) { box.classList.add("sent"); } else { throw new Error(j && j.message || "failed"); } })
      .catch(function(){ err.innerHTML = 'Sorry, that did not send. Please message us on <a href="https://wa.me/923054559888" target="_blank" rel="noopener">WhatsApp</a> or email <a href="mailto:' + TO + '">' + TO + '</a>.'; err.style.display = "block"; btn.disabled = false; btn.textContent = "Request my meeting"; });
  });
  if (CALENDLY) {
    var loaded = false;
    box.querySelectorAll(".bk-tabs button").forEach(function(b){
      b.addEventListener("click", function(){
        box.querySelectorAll(".bk-tabs button").forEach(function(x){ x.classList.toggle("on", x === b); });
        var cal = b.getAttribute("data-t") === "cal"; box.classList.toggle("cal-on", cal);
        if (cal && !loaded) { loaded = true; box.querySelector(".cal").innerHTML = '<iframe src="' + CALENDLY + (CALENDLY.indexOf("?") > -1 ? "&" : "?") + 'hide_gdpr_banner=1&primary_color=cc0001" width="100%" height="100%" frameborder="0" title="Book a meeting"></iframe>'; }
      });
    });
  }
  document.querySelectorAll('a[href="#contact"]').forEach(function(a){ a.setAttribute("href", "#book"); });
})();
