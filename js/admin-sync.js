/**
 * admin-sync.js — Pont entre le dashboard admin et le site
 * Chargé sur toutes les pages. Applique les données du localStorage
 * (produits, textes, couleurs) sauvegardées depuis admin.html.
 */

(function () {

  /* ── 1. Produits ──────────────────────────────────────────────
     Remplace le tableau PRODUCTS par la version sauvegardée admin.
     Doit être exécuté APRÈS que products.js soit chargé.       */
  const savedProducts = localStorage.getItem("admin_products");
  if (savedProducts) {
    try {
      const parsed = JSON.parse(savedProducts);
      // Réassigne le tableau global PRODUCTS en place
      PRODUCTS.length = 0;
      parsed.forEach(p => PRODUCTS.push(p));
    } catch (e) {
      console.warn("admin-sync: produits corrompus, données d'origine utilisées.");
    }
  }

  /* ── 2. Couleurs ──────────────────────────────────────────────
     Injecte les variables CSS personnalisées dans <head>.        */
  const savedColors = localStorage.getItem("admin_colors");
  if (savedColors) {
    try {
      const c = JSON.parse(savedColors);
      const style = document.createElement("style");
      style.id = "admin-colors";
      style.textContent = `
        :root {
          --black:      ${c.black} !important;
          --black-soft: ${c.black}cc !important;
          --white:      ${c.white} !important;
          --gold:       ${c.gold} !important;
          --gold-light: ${c.gold}cc !important;
          --gold-dark:  ${c.goldDark} !important;
          --gray-100:   ${c.gray} !important;
          --gray-600:   ${c.muted} !important;
        }`;
      document.head.appendChild(style);
    } catch (e) {
      console.warn("admin-sync: couleurs corrompues.");
    }
  }

  /* ── 3. Textes — appliqués après chargement du DOM ────────────
     Cible chaque élément par son data-admin-key.               */
  document.addEventListener("DOMContentLoaded", function () {
    const savedTexts = localStorage.getItem("admin_texts");
    if (!savedTexts) return;

    try {
      const t = JSON.parse(savedTexts);

      const apply = (key, value, attr) => {
        document.querySelectorAll(`[data-admin-key="${key}"]`).forEach(el => {
          if (attr) el.setAttribute(attr, value);
          else el.innerHTML = value;
        });
      };

      apply("hero-label",   t.heroLabel);
      apply("hero-title1",  t.heroTitle1);
      apply("hero-title2",  `<em>${t.heroTitle2}</em>`);
      apply("hero-desc",    t.heroDesc);
      apply("hero-btn1",    t.heroBt1);
      apply("trust-ship",   `Livraison gratuite à partir d'un achat de <strong>${t.trustShip}</strong>`);
      apply("trust-return", t.trustReturn);
      apply("trust-pay",    t.trustPay);
      apply("trust-rating", t.trustRating);
      apply("promo-tag",    t.promoTag);
      apply("promo-title",  t.promoTitle.replace(/\n/g, "<br>"));
      apply("promo-desc",   t.promoDesc);
      apply("promo-btn",    t.promoBt);
      apply("shop-name",    t.shopName);
      apply("shop-desc",    t.shopDesc);
      apply("shop-address", t.shopAddress);
      apply("shop-phone",   t.shopPhone);
      apply("shop-email",   t.shopEmail);

      // Logo (remplace "LUXE&CO" par le nom de la boutique si différent)
      if (t.shopName) {
        document.querySelectorAll(".navbar__logo, .footer__logo").forEach(el => {
          // Garde la structure <span> pour la couleur or
          const parts = t.shopName.split("&");
          if (parts.length === 2) {
            el.innerHTML = `${parts[0]}<span>&</span>${parts[1]}`;
          }
        });
      }

      // Barre de confiance — textes complets
      const trustItems = document.querySelectorAll(".trust-item span:not(.trust-item__icon)");
      const trustKeys  = ["trustShip","trustReturn","trustPay","trustRating"];
      const trustTexts = [
        `Livraison gratuite à partir d'un achat de <strong>${t.trustShip}</strong>`,
        `Retours gratuits <strong>${t.trustReturn.replace("Retours gratuits ","")}</strong>`,
        `Paiement <strong>${t.trustPay.replace("Paiement ","")}</strong>`,
        `Note moyenne <strong>${t.trustRating.replace("Note moyenne ","")}</strong>`
      ];
      trustItems.forEach((el, i) => {
        if (trustTexts[i]) el.innerHTML = trustTexts[i];
      });

    } catch (e) {
      console.warn("admin-sync: textes corrompus.");
    }
  });

})();
