/**
 * main.js — Comportements globaux
 * Navigation, menu mobile, scroll effects, animations d'entrée.
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Navigation sticky & scroll shadow ─────────────────────────── */
  const nav = document.querySelector(".navbar");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("navbar--scrolled", window.scrollY > 60);
    }, { passive: true });
  }

  /* ── Menu mobile hamburger ──────────────────────────────────────── */
  const hamburger = document.querySelector(".hamburger");
  const navLinks  = document.querySelector(".nav-links");
  const overlay   = document.querySelector(".nav-overlay");

  const closeMenu = () => {
    hamburger?.classList.remove("is-active");
    navLinks?.classList.remove("is-open");
    overlay?.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  hamburger?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-active", open);
    overlay?.classList.toggle("is-active", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  overlay?.addEventListener("click", closeMenu);

  // Ferme le menu en cliquant un lien
  navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  /* ── Animations d'entrée au scroll (Intersection Observer) ─────── */
  const animatedEls = document.querySelectorAll(".fade-in, .slide-up, .slide-left, .slide-right");

  if (animatedEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // une seule fois
        }
      });
    }, { threshold: 0.12 });

    animatedEls.forEach(el => observer.observe(el));
  }

  /* ── Smooth scroll pour ancres internes ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ── Lien actif dans la nav ─────────────────────────────────────── */
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ── Mini-panier slide-in (header) ─────────────────────────────── */
  const cartIcon = document.querySelector(".cart-icon-btn");
  const miniCart = document.querySelector(".mini-cart");
  const miniCartClose = document.querySelector(".mini-cart__close");

  const renderMiniCart = () => {
    if (!miniCart) return;
    const items = Cart.getItems();
    const body  = miniCart.querySelector(".mini-cart__items");
    const footer= miniCart.querySelector(".mini-cart__footer");

    if (!items.length) {
      body.innerHTML = `<p class="mini-cart__empty">Votre panier est vide.</p>`;
      footer.style.display = "none";
    } else {
      body.innerHTML = items.map(i => `
        <div class="mini-cart__item">
          <img src="${i.image}" alt="${i.name}" loading="lazy">
          <div class="mini-cart__item-info">
            <span class="mini-cart__item-name">${i.name}</span>
            <span class="mini-cart__item-price">${(i.price * i.qty).toFixed(2)} €</span>
            <span class="mini-cart__item-qty">Qté : ${i.qty}</span>
          </div>
          <button class="mini-cart__remove" data-id="${i.id}" aria-label="Supprimer">✕</button>
        </div>`).join("");
      footer.style.display = "block";
      footer.querySelector(".mini-cart__total-val").textContent = `${Cart.getTotal().toFixed(2)} €`;

      body.querySelectorAll(".mini-cart__remove").forEach(btn => {
        btn.addEventListener("click", () => {
          Cart.remove(parseInt(btn.dataset.id));
          renderMiniCart();
        });
      });
    }
  };

  cartIcon?.addEventListener("click", () => {
    renderMiniCart();
    miniCart?.classList.toggle("is-open");
    document.body.classList.toggle("mini-cart-open");
  });

  miniCartClose?.addEventListener("click", () => {
    miniCart?.classList.remove("is-open");
    document.body.classList.remove("mini-cart-open");
  });

  document.addEventListener("cart:updated", () => {
    if (miniCart?.classList.contains("is-open")) renderMiniCart();
  });

  /* ── Back-to-top button ─────────────────────────────────────────── */
  const backTop = document.querySelector(".back-to-top");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("is-visible", window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

});
