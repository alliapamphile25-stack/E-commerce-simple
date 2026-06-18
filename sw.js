/**
 * Service Worker — LUXE&CO PWA
 * Stratégie : Cache-first pour assets statiques, Network-first pour les pages HTML
 */

const CACHE_NAME    = "luxeco-v1";
const OFFLINE_PAGE  = "/offline.html";

const PRECACHE = [
  "/",
  "/index.html",
  "/products.html",
  "/product-detail.html",
  "/cart.html",
  "/checkout.html",
  "/contact.html",
  "/css/style.css",
  "/js/products.js",
  "/js/admin-sync.js",
  "/js/cart.js",
  "/js/main.js",
  "/manifest.json",
  "/offline.html",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
];

/* ── Installation : mise en cache des assets ── */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

/* ── Activation : nettoyage des anciens caches ── */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch : stratégie hybride ── */
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Ignore les requêtes non-GET et les extensions d'admin
  if (event.request.method !== "GET") return;
  if (url.pathname.includes("admin")) return;

  // Pages HTML → Network-first (contenu à jour), fallback offline
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match(OFFLINE_PAGE)))
    );
    return;
  }

  // CSS, JS, polices, images → Cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (!res || res.status !== 200 || res.type === "opaque") return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return res;
      }).catch(() => new Response("", { status: 503 }));
    })
  );
});
