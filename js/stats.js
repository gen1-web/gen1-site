/* Hero stats: rolling odometer numbers + country flags */
(function(){
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var odos = document.querySelectorAll(".odo");
  var probe = document.createElement("span");
  probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
  odos.forEach(function(el, k){
    var txt = el.textContent.trim(), html = "", d = 0, w = {};
    el.appendChild(probe);
    for (var q = 0; q < 10; q++) { probe.textContent = String(q); w[q] = probe.getBoundingClientRect().width; }
    var fs = parseFloat(getComputedStyle(el).fontSize) || 1;
    for (var c = 0; c < txt.length; c++) {
      var ch = txt[c];
      if (ch < "0" || ch > "9") { html += '<span class="sep">' + ch + "</span>"; continue; }
      var strip = ""; for (var n = 0; n < 30; n++) strip += "<b>" + (n % 10) + "</b>";
      html += '<span class="dg" style="width:' + (w[+ch] / fs).toFixed(3) + 'em"><i data-n="' + (20 + +ch) + '" style="transition-delay:' + (k * 0.15 + d * 0.12).toFixed(2) + 's">' + strip + "</i></span>";
      d++;
    }
    el.setAttribute("aria-label", txt + "+");
    el.innerHTML = html;
    el.style.setProperty("--pd", (k * 0.15 + d * 0.12 + 1.6).toFixed(2) + "s");
  });
  function roll(){
    odos.forEach(function(el){
      el.querySelectorAll(".dg i").forEach(function(i){ i.style.transform = "translateY(-" + i.getAttribute("data-n") + "em)"; });
      el.classList.add("done");
    });
  }
  function start(){ if (reduce) { odos.forEach(function(el){ el.querySelectorAll(".dg i").forEach(function(i){ i.style.transition = "none"; }); }); roll(); } else setTimeout(roll, 700); }
  if (document.body.classList.contains("loaded")) start();
  else new MutationObserver(function(m, o){ if (document.body.classList.contains("loaded")) { o.disconnect(); start(); } }).observe(document.body, { attributes: true, attributeFilter: ["class"] });

  var F = [["gb","United Kingdom"],["au","Australia"],["nz","New Zealand"],["sa","Saudi Arabia"],["bh","Bahrain"],["pk","Pakistan"],["us","United States"],["tt","Trinidad and Tobago"],["ca","Canada"]];
  var box = document.getElementById("flags");
  if (box) box.innerHTML = F.map(function(f, i){ return '<span class="flag" role="img" aria-label="' + f[1] + '" data-name="' + f[1] + '" style="--i:' + i + ';background-image:url(https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/1x1/' + f[0] + '.svg)"></span>'; }).join("");
})();
