const fs = require("fs");
const p = "js/main.js";
let c = fs.readFileSync(p, "utf8");
const old = `// ── Vercel Speed Insights ──
(function(){
  var s = document.createElement('script');
  s.src = '/_vercel/speed-insights/script.js';
  s.defer = true;
  document.head.appendChild(s);
})();

// ── Vercel Analytics ──
(function(){
  var s = document.createElement('script');
  s.src = '/_vercel/insights/script.js';
  s.defer = true;
  document.head.appendChild(s);
})();`;
const neu = `/* Vercel Analytics scripts only load when actually deployed on Vercel; locally they 404. */
if (location.hostname && !['localhost', '127.0.0.1'].includes(location.hostname)) {
  (function(){
    var s = document.createElement('script');
    s.src = '/_vercel/speed-insights/script.js';
    s.defer = true;
    document.head.appendChild(s);
  })();
  (function(){
    var s = document.createElement('script');
    s.src = '/_vercel/insights/script.js';
    s.defer = true;
    document.head.appendChild(s);
  })();
}`;
if (!c.includes(old)) {
  console.error("anchor not found");
  process.exit(1);
}
c = c.replace(old, neu);
fs.writeFileSync(p, c);
console.log("patched js/main.js");
