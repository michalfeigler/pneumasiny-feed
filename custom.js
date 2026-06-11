/* ==========================================================================
   Pneumašiny.cz — Shoptet behaviour layer (template-11)
   Host on GitHub; link before </body> via jsDelivr:
   <script src="https://cdn.jsdelivr.net/gh/michalfeigler/pneumasiny-feed@main/custom.js" defer></script>
   Adds the made-to-order + 20% non-refundable deposit notice on product detail
   and cart (brief: every product surface shows price + deposit + lead time).
   Display aid only — the actual deposit charge is configured separately. Defensive:
   selectors verified on the live template; everything wrapped in try/catch.
   ========================================================================== */
(function () {
  "use strict";
  var DEPOSIT = 20; // %  (keep in sync with transform.py DEPOSIT)
  var MSG =
    'Zboží <b>na objednávku</b> &ndash; vyrábí se po objednávce. Při objednání se hradí ' +
    '<b>nevratná záloha ' + DEPOSIT + ' %</b> z ceny vč. DPH, zbytek před dodáním. ' +
    'Dodací lhůta dle výrobce.';

  function el() {
    var d = document.createElement("div");
    d.className = "pm-deposit";
    d.innerHTML = MSG;
    return d;
  }

  function onProductDetail() {
    if (!document.querySelector(".p-detail")) return;
    if (document.querySelector(".p-detail .pm-deposit")) return;
    // insert just after the price block
    var anchor =
      document.querySelector(".p-final-price-wrapper") ||
      document.querySelector(".p-detail .price-final") ||
      document.querySelector(".p-detail .prices");
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(el(), anchor.nextSibling);
    }
  }

  function onCart() {
    var cart = document.querySelector(".cart-table, .p-order-content, #cartContent, .cart-content");
    if (!cart || cart.querySelector(".pm-deposit")) return;
    cart.parentNode.insertBefore(el(), cart);
  }

  /* ---- Homepage: inject pristine markup (bypasses TinyMCE mangling) ------ */
  var CDN = "https://cdn.jsdelivr.net/gh/michalfeigler/pneumasiny-feed@main/img/logos/";
  var PCDN = "https://cdn.jsdelivr.net/gh/michalfeigler/pneumasiny-feed@main/img/products/";
  var BRANDS = [
    ["zvedaky", "mb-engineering.png", "M&amp;B Engineering"],
    ["montazni-stroje", "mondolfo-ferro.png", "Mondolfo Ferro"],
    ["vyvazovaci-stroje", "cemb.png", "CEMB"],
    ["kompresory", "werther.png", "Werther International"],
    ["montazni-stroje", "corghi.png", "Corghi"],
    ["montazni-stroje", "giuliano.svg", "Giuliano"],
    ["zvedaky", "consul.svg", "Consul"],
    ["zvedaky", "omer.png", "OMER"],
    ["zvedaky", "rotary.png", "Rotary"],
    ["kompresory", "guernet.svg", "Guernet Compresseurs"],
    ["kompresory", "chicago-pneumatic.svg", "Chicago Pneumatic"],
    ["kompresory", "inair.png", "Inair"],
    ["suseni-a-vytvrzovani", "hedson.png", "Hedson"],
    ["myci-technika", "istobal.png", "Istobal"],
    ["zvedaky", "cascos.png", "Cascos"],
    ["dilenske-lisy", "omcn.png", "OMCN"]
  ];
  var CATS = [
    ["montazni-stroje", "Montážní stroje", "181 strojů"],
    ["vyvazovaci-stroje", "Vyvažovací stroje", "107 strojů"],
    ["zvedaky", "Zvedáky", "234 strojů"],
    ["kompresory", "Kompresory", "354 strojů"],
    ["geometrie-a-adas", "Geometrie a ADAS", "38 strojů"],
    ["suseni-a-vytvrzovani", "Sušení a vytvrzování", "18 strojů"],
    ["myci-technika", "Mycí technika", "28 strojů"],
    ["dilenske-lisy", "Dílenské lisy", "8 strojů"]
  ];

  function homeHTML() {
    var brands = BRANDS.map(function (b) {
      return '<a href="/' + b[0] + '/"><img loading="lazy" src="' + CDN + b[1] + '" alt="' + b[2] + '"></a>';
    }).join("");
    var cats = CATS.map(function (c) {
      return '<a class="pmh-cat" href="/' + c[0] + '/"><span class="nm">' + c[1] +
        '</span><span class="ct">' + c[2] + '</span><span class="go">Zobrazit &rarr;</span></a>';
    }).join("");
    return '' +
'<div class="pm-home">' +
'<section class="pmh-hero"><div class="in"><div class="pmh-hero-grid">' +
'<div class="pmh-hero-text">' +
'<span class="eyebrow">Pneumašiny.cz &#8211; REMA TIP TOP INCO</span>' +
'<h1>Kompletní vybavení <em>pneuservisu</em> z jednoho místa</h1>' +
'<p>Montážní stroje, vyvažovačky, zvedáky, kompresory, geometrie i sušení. Špičkové evropské značky pro autoservisy a pneuservisy, na objednávku s dodací lhůtou přímo od výrobce.</p>' +
'<div class="pmh-cta"><a class="btn btn-red" href="/montazni-stroje/">Procházet stroje &rarr;</a>' +
'<a class="btn btn-ghost" href="/kompresory/">Kompresory</a></div>' +
'</div>' +
'<div class="pmh-hero-media"><div class="pmh-hero-card">' +
'<span class="pmh-tag">Na objednávku</span>' +
'<div class="pmh-hero-imgwrap"><img src="' + PCDN + 'cemb-smt56-matic.jpg" alt="Nákladní zouvačka CEMB SMT 56"></div>' +
'<div class="pmh-hero-cap"><b>CEMB SMT 56</b><span>Nákladní zouvačka</span></div>' +
'</div></div>' +
'</div>' +
'<div class="pmh-stats">' +
'<div><div class="n">16</div><div class="l">značek</div></div>' +
'<div><div class="n">8</div><div class="l">kategorií strojů</div></div>' +
'<div><div class="n">960<em>+</em></div><div class="l">strojů v nabídce</div></div>' +
'<div><div class="n">20<em>%</em></div><div class="l">záloha, zbytek při dodání</div></div>' +
'</div></div></section>' +
'<section class="sec"><div class="sec-head"><div><span class="eyebrow">Naše značky</span>' +
'<h2>16 <em>výrobců</em>, jeden e-shop</h2></div></div>' +
'<div class="pmh-brands">' + brands + '</div></section>' +
'<section class="sec sec--alt"><div class="sec" style="padding:0">' +
'<div class="sec-head"><div><span class="eyebrow">Kategorie</span>' +
'<h2>Procházet podle <em>typu stroje</em></h2></div></div>' +
'<div class="pmh-cats">' + cats + '</div></div></section>' +
'<section class="sec"><div class="pmh-usp">' +
'<div><h4>16 značek</h4><p>Italská, německá, francouzská i švédská technika pod jednou střechou.</p></div>' +
'<div><h4>Na objednávku</h4><p>Stroje vyrábíme po objednávce s dodací lhůtou přímo od výrobce.</p></div>' +
'<div><h4>Odborná podpora</h4><p>Poradíme s výběrem, instalací i servisem. Technici REMA TIP TOP.</p></div>' +
'<div><h4>Zázemí REMA TIP TOP</h4><p>Etablovaný distributor pneuservisní techniky v ČR.</p></div>' +
'</div></section>' +
'<section class="pmh-dep"><div class="in"><span class="eyebrow">Jak nákup funguje</span>' +
'<h2>Jednoduchá objednávka, <em>jasná záloha</em></h2><div class="pmh-steps">' +
'<div class="pmh-step"><div class="s">01</div><h4>Objednávka</h4><p>Vyberete stroj a odešlete objednávku s plnou cenou vč. DPH.</p></div>' +
'<div class="pmh-step"><div class="s">02</div><h4>Záloha 20 %</h4><p>Uhradíte nevratnou zálohu 20 % z ceny. Teprve poté objednáváme u výrobce.</p></div>' +
'<div class="pmh-step"><div class="s">03</div><h4>Výroba</h4><p>Stroj se vyrobí a připraví. Dodací lhůta odpovídá termínu výrobce.</p></div>' +
'<div class="pmh-step"><div class="s">04</div><h4>Dodání a doplatek</h4><p>Zbývajících 80 % uhradíte před dodáním nebo při dodání.</p></div>' +
'</div></div></section>' +
'</div>';
  }

  function onHomepage() {
    if (!document.body || document.body.className.indexOf("type-index") === -1) return;
    var host = document.querySelector(".welcome");
    if (!host) return;
    if (host.getAttribute("data-pm-home") === "1") return; // already injected
    host.innerHTML = homeHTML();
    host.setAttribute("data-pm-home", "1");
  }

  /* ---- Brand wordmark: replace default Shoptet logo on every page ---------- */
  function brandLogo() {
    var a = document.querySelector('a[data-testid="linkWebsiteLogo"]') ||
            document.querySelector('.logo a, a.logo');
    if (!a || a.querySelector(".pm-wordmark")) return;
    a.innerHTML =
      '<span class="pm-wordmark">PNEUMAŠINY<em>.cz</em>' +
      '<span class="pm-wordmark-sub">stroje pro pneuservisy</span></span>';
  }

  function run() {
    try { brandLogo(); } catch (e) {}
    try { onHomepage(); } catch (e) {}
    try { onProductDetail(); } catch (e) {}
    try { onCart(); } catch (e) {}
  }

  if (document.readyState !== "loading") run();
  else document.addEventListener("DOMContentLoaded", run);
  // Shoptet fires its own lifecycle + AJAX events; re-run defensively.
  document.addEventListener("ShoptetDOMPageContentLoaded", run);
  document.addEventListener("ShoptetDOMCartUpdated", run);
})();
