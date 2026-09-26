/* ==========================================================================
   gestes.js — Détection du balayage (swipe) au doigt et à la souris
   --------------------------------------------------------------------------
   Un seul point d'entrée : installerSwipe(element, options).

   Le geste est reconnu quand le déplacement horizontal dépasse un seuil ET
   qu'il est nettement plus horizontal que vertical — sinon on laisse la page
   défiler normalement, ce qui est indispensable sur téléphone.

   Les événements « pointer » couvrent d'un coup le doigt, le stylet et la
   souris ; une solution de repli en événements « touch » est prévue pour les
   navigateurs plus anciens.
   ========================================================================== */
"use strict";

/**
 * Rend un élément sensible au balayage horizontal.
 *
 * @param {HTMLElement} element  l'élément à écouter
 * @param {object} options
 *   surGauche()            appelé sur un balayage vers la gauche
 *   surDroite()            appelé sur un balayage vers la droite
 *   pendant(dx, ratio)     appelé en continu pendant le geste (pour animer)
 *   annule()               appelé si le geste est abandonné
 *   seuil                  distance minimale en pixels (80 par défaut)
 *   actif()                si fourni, le geste est ignoré quand elle renvoie faux
 * @returns {function} une fonction à appeler pour retirer les écouteurs
 */
function installerSwipe(element, options) {
  const reglages = options || {};
  const seuil = reglages.seuil || 80;
  let xDepart = 0, yDepart = 0;
  let enCours = false;
  let horizontalConfirme = false;
  let idPointeur = null;

  function autorise() {
    return typeof reglages.actif !== "function" || reglages.actif() === true;
  }

  /* On ignore les gestes qui démarrent sur un contrôle : un bouton, une liste
     déroulante ou un champ doivent continuer à fonctionner normalement. */
  function surControle(cible) {
    return !!(cible && cible.closest && cible.closest("button, select, input, textarea, a, [data-sans-swipe]"));
  }

  function debut(x, y, cible) {
    if (!autorise() || surControle(cible)) return false;
    xDepart = x; yDepart = y;
    enCours = true;
    horizontalConfirme = false;
    return true;
  }

  function mouvement(x, y, evenement) {
    if (!enCours) return;
    const dx = x - xDepart;
    const dy = y - yDepart;

    // Tant que le geste n'est pas franchement horizontal, on ne fait rien :
    // l'utilisateur est peut-être simplement en train de faire défiler la page.
    if (!horizontalConfirme) {
      if (Math.abs(dx) < 12) return;
      if (Math.abs(dx) <= Math.abs(dy) * 1.2) { enCours = false; return; }
      horizontalConfirme = true;
    }

    // Geste horizontal confirmé : on empêche le défilement parasite.
    if (evenement && evenement.cancelable) evenement.preventDefault();
    if (typeof reglages.pendant === "function") {
      reglages.pendant(dx, Math.max(-1, Math.min(1, dx / (seuil * 2))));
    }
  }

  function fin(x) {
    if (!enCours) return;
    const dx = x - xDepart;
    enCours = false;
    idPointeur = null;
    if (horizontalConfirme && Math.abs(dx) >= seuil) {
      if (dx < 0 && typeof reglages.surGauche === "function") reglages.surGauche();
      else if (dx > 0 && typeof reglages.surDroite === "function") reglages.surDroite();
      return;
    }
    if (typeof reglages.annule === "function") reglages.annule();
  }

  function abandon() {
    if (!enCours) return;
    enCours = false;
    idPointeur = null;
    if (typeof reglages.annule === "function") reglages.annule();
  }

  const ecouteurs = [];
  const ajouter = (cible, type, fonction, extra) => {
    cible.addEventListener(type, fonction, extra);
    ecouteurs.push([cible, type, fonction, extra]);
  };

  if (window.PointerEvent) {
    ajouter(element, "pointerdown", (ev) => {
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      if (debut(ev.clientX, ev.clientY, ev.target)) idPointeur = ev.pointerId;
    });
    ajouter(element, "pointermove", (ev) => {
      if (idPointeur !== null && ev.pointerId !== idPointeur) return;
      mouvement(ev.clientX, ev.clientY, ev);
    }, { passive: false });
    ajouter(element, "pointerup", (ev) => {
      if (idPointeur !== null && ev.pointerId !== idPointeur) return;
      fin(ev.clientX);
    });
    ajouter(element, "pointercancel", abandon);
    ajouter(element, "pointerleave", abandon);
  } else {
    // Solution de repli pour les navigateurs sans PointerEvent
    ajouter(element, "touchstart", (ev) => {
      const t = ev.touches[0];
      if (t) debut(t.clientX, t.clientY, ev.target);
    }, { passive: true });
    ajouter(element, "touchmove", (ev) => {
      const t = ev.touches[0];
      if (t) mouvement(t.clientX, t.clientY, ev);
    }, { passive: false });
    ajouter(element, "touchend", (ev) => {
      const t = ev.changedTouches[0];
      if (t) fin(t.clientX);
    });
    ajouter(element, "touchcancel", abandon);
  }

  return function desinstaller() {
    ecouteurs.forEach(([cible, type, fonction, extra]) => cible.removeEventListener(type, fonction, extra));
    ecouteurs.length = 0;
  };
}
