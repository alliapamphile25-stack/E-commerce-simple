/**
 * cart.js — Gestion du panier
 * Stocke le panier dans localStorage pour persister entre les pages.
 * Expose un objet global `Cart` utilisé par toutes les pages.
 */

const Cart = (() => {
  const STORAGE_KEY = "luxe_cart";

  // Charge le panier depuis localStorage
  const load = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  // Sauvegarde et déclenche la mise à jour de l'UI
  const save = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadge();
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: items }));
  };

  // Met à jour le badge numérique sur l'icône panier
  const updateBadge = () => {
    const items = load();
    const total = items.reduce((sum, i) => sum + i.qty, 0);
    document.querySelectorAll(".cart-badge").forEach(el => {
      el.textContent = total;
      el.style.display = total > 0 ? "flex" : "none";
    });
  };

  // Ajoute ou incrémente un produit
  const add = (productId, qty = 1) => {
    const items = load();
    const product = getProductById(productId);
    if (!product) return;

    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty
      });
    }
    save(items);
    showToast(`"${product.name}" ajouté au panier`);
  };

  // Retire complètement un produit du panier
  const remove = (productId) => {
    const items = load().filter(i => i.id !== productId);
    save(items);
  };

  // Met à jour la quantité (0 = supprime)
  const updateQty = (productId, qty) => {
    if (qty <= 0) return remove(productId);
    const items = load();
    const item = items.find(i => i.id === productId);
    if (item) item.qty = qty;
    save(items);
  };

  // Vide le panier
  const clear = () => save([]);

  // Calculs
  const getItems = () => load();
  const getCount = () => load().reduce((s, i) => s + i.qty, 0);
  const getSubtotal = () => load().reduce((s, i) => s + i.price * i.qty, 0);
  const getShipping = () => getSubtotal() >= 100 ? 0 : 9.90;
  const getTotal = () => getSubtotal() + getShipping();

  // Notification toast
  const showToast = (message) => {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
    document.body.appendChild(toast);

    // Force reflow pour déclencher l'animation CSS
    toast.offsetHeight;
    toast.classList.add("toast--visible");

    setTimeout(() => {
      toast.classList.remove("toast--visible");
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  };

  // Initialisation (badge au chargement de chaque page)
  const init = () => updateBadge();

  return { add, remove, updateQty, clear, getItems, getCount, getSubtotal, getShipping, getTotal, init, showToast };
})();

// Init automatique dès que le DOM est prêt
document.addEventListener("DOMContentLoaded", () => Cart.init());
