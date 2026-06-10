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

  function run() {
    try { onProductDetail(); } catch (e) {}
    try { onCart(); } catch (e) {}
  }

  if (document.readyState !== "loading") run();
  else document.addEventListener("DOMContentLoaded", run);
  // Shoptet fires its own lifecycle + AJAX events; re-run defensively.
  document.addEventListener("ShoptetDOMPageContentLoaded", run);
  document.addEventListener("ShoptetDOMCartUpdated", run);
})();
