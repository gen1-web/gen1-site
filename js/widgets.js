/* Floating WhatsApp chat button, on every page */
(function(){
  var NUM = "923054559888";
  var MSG = encodeURIComponent("Assalamu alaikum! I'd like to know more about Gen1 Solutions.");
  var st = document.createElement("style");
  st.textContent = ".wa-fab{position:fixed;right:clamp(16px,3vw,28px);bottom:clamp(16px,3vw,28px);z-index:900;display:flex;align-items:center;gap:0;height:60px;padding:0;border-radius:999px;background:#25D366;color:#fff;text-decoration:none;box-shadow:0 10px 30px rgba(37,211,102,.45),0 4px 12px rgba(0,0,0,.2);overflow:hidden;transition:padding .45s cubic-bezier(.16,1,.3,1),box-shadow .3s}" +
    ".wa-fab svg{flex:none;width:34px;height:34px;margin:0 13px;fill:#fff}" +
    ".wa-fab .wa-label{max-width:0;opacity:0;white-space:nowrap;font:600 .95rem Poppins,sans-serif;transition:max-width .45s cubic-bezier(.16,1,.3,1),opacity .3s,margin .45s;margin-right:0}" +
    ".wa-fab:hover{padding-right:4px}.wa-fab:hover .wa-label{max-width:230px;opacity:1;margin-right:20px}" +
    ".wa-fab::before{content:'';position:absolute;inset:0;border-radius:999px;background:#25D366;z-index:-1;animation:waPulse 2.2s ease-out infinite}" +
    "@keyframes waPulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.5);opacity:0}100%{opacity:0}}" +
    ".wa-fab .wa-ic{position:relative;animation:waWiggle 2.6s ease-in-out infinite;transform-origin:center}" +
    "@keyframes waWiggle{0%,86%,100%{transform:rotate(0)}88%{transform:rotate(-14deg)}91%{transform:rotate(12deg)}94%{transform:rotate(-8deg)}97%{transform:rotate(5deg)}}" +
    ".wa-dot{position:absolute;top:8px;left:40px;width:16px;height:16px;border-radius:50%;background:#CC0001;color:#fff;font:700 10px/16px Poppins,sans-serif;text-align:center;box-shadow:0 0 0 2px #fff;animation:waBob 2.6s ease-in-out infinite}" +
    "@keyframes waBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}" +
    "@media (prefers-reduced-motion:reduce){.wa-fab::before,.wa-fab .wa-ic,.wa-dot{animation:none}}" +
    "@media (max-width:600px){.wa-fab:hover .wa-label{max-width:0;opacity:0;margin-right:0}.wa-fab:hover{padding-right:0}}";
  document.head.appendChild(st);
  var a = document.createElement("a");
  a.className = "wa-fab"; a.href = "https://wa.me/" + NUM + "?text=" + MSG;
  a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "Chat with Gen1 Solutions on WhatsApp");
  a.innerHTML = '<span class="wa-ic"><svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.01c-.24.68-1.42 1.3-1.95 1.35-.5.05-.96.24-3.24-.67-2.73-1.08-4.47-3.86-4.61-4.04-.13-.18-1.1-1.46-1.1-2.79 0-1.33.7-1.98.95-2.25.24-.27.53-.34.71-.34.18 0 .36 0 .51.01.16.01.39-.06.6.46.24.56.81 1.96.88 2.1.07.14.12.31.02.49-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.68-.17 1.36z"/></svg></span><span class="wa-dot">1</span><span class="wa-label">Chat with us on WhatsApp</span>';
  document.body.appendChild(a);
})();
