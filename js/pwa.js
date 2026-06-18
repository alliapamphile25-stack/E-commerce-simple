/* ── Enregistrement du Service Worker PWA ── */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("SW enregistré :", reg.scope))
      .catch(err => console.warn("SW échec :", err));
  });
}

/* ── Bannière d'installation (Android/Chrome) ── */
let deferredPrompt = null;
const installBanner = document.getElementById("pwa-install-banner");
const installBtn    = document.getElementById("pwa-install-btn");
const installDismiss= document.getElementById("pwa-install-dismiss");

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBanner) {
    setTimeout(() => installBanner.classList.add("is-visible"), 3000);
  }
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (installBanner) installBanner.classList.remove("is-visible");
    if (outcome === "accepted") console.log("PWA installée ✓");
  });
}

if (installDismiss) {
  installDismiss.addEventListener("click", () => {
    installBanner.classList.remove("is-visible");
    sessionStorage.setItem("pwa-dismissed", "1");
  });
}

/* Ne pas re-afficher si déjà fermé dans cette session */
if (sessionStorage.getItem("pwa-dismissed") && installBanner) {
  installBanner.style.display = "none";
}
