/* ==========================================================================
   icones.js — Jeu d'icônes SVG au trait
   --------------------------------------------------------------------------
   Même style et mêmes tracés que les icônes « Feather / Lucide » distribuées
   par le paquet react-icons (Fi… / Lu…), mais en SVG inline : aucune
   dépendance, aucune étape de build, rien à télécharger.

   Toutes les icônes partagent la même grille 24 × 24, un trait de 2 px,
   des extrémités arrondies, et la couleur courante du texte (currentColor) :
   elles s'adaptent donc automatiquement au thème clair ou sombre.

   AJOUTER UNE ICÔNE : ajoute une entrée dans l'objet ICONES ci-dessous, avec
   le contenu interne d'un SVG dessiné sur une grille 24 × 24 (sans balise
   <svg>, sans attribut de couleur). Elle devient utilisable partout, y
   compris comme icône de chapitre dans data.js.
   ========================================================================== */

const ICONES = {

  /* --- Navigation et interface --- */
  home:      '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  book:      '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  target:    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  clock:     '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  rotate:    '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  refresh:   '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  shuffle:   '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
  play:      '<polygon points="6 3 20 12 6 21 6 3"/>',
  trash:     '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  moon:      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun:       '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',

  /* --- Flèches --- */
  "arrow-left":   '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  "arrow-right":  '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  "chevron-up":   '<polyline points="18 15 12 9 6 15"/>',
  "chevron-down": '<polyline points="6 9 12 15 18 9"/>',

  /* --- Retours de correction --- */
  check:          '<polyline points="20 6 9 17 4 12"/>',
  "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  "x-circle":     '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
  alert:          '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  help:           '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  award:          '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',

  /* --- Poignée de glisser-déposer (points pleins) --- */
  grip: '<circle cx="9" cy="5" r="1.5" fill="currentColor" stroke="none"/>' +
        '<circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none"/>' +
        '<circle cx="9" cy="19" r="1.5" fill="currentColor" stroke="none"/>' +
        '<circle cx="15" cy="5" r="1.5" fill="currentColor" stroke="none"/>' +
        '<circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none"/>' +
        '<circle cx="15" cy="19" r="1.5" fill="currentColor" stroke="none"/>',

  /* --- Icônes des chapitres --- */
  zap:     '<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  ruler:   '<rect x="2" y="8" width="20" height="8" rx="1.5"/><line x1="6.5" y1="8" x2="6.5" y2="12"/><line x1="10.5" y1="8" x2="10.5" y2="12"/><line x1="14.5" y1="8" x2="14.5" y2="12"/><line x1="18.5" y1="8" x2="18.5" y2="12"/>',
  badge:   '<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8.5" cy="10.5" r="2.5"/><path d="M4.5 17a4.3 4.3 0 0 1 8 0"/><line x1="16" y1="10" x2="20" y2="10"/><line x1="16" y1="14" x2="20" y2="14"/>',
  zone:    '<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="6.5" stroke-dasharray="3 3"/><circle cx="12" cy="12" r="10.5" stroke-dasharray="2 4"/>',
  lock:    '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield:  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  tool:    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  pulse:   '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  file:    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  factory: '<line x1="2" y1="21" x2="22" y2="21"/><path d="M4 21V11l5 3.5V11l5 3.5V7l6 4v10"/><line x1="8" y1="17" x2="8" y2="17.01"/><line x1="13" y1="17" x2="13" y2="17.01"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><polyline points="9 14 11 16 15 12"/>',

  /* --- Progression et récompenses (mode « addictif ») --- */
  flame:    '<path d="M12 22c4 0 7-2.8 7-6.8 0-4.6-4.2-7-7-13.2-2.8 6.2-7 8.6-7 13.2C5 19.2 8 22 12 22z"/><path d="M12 22c1.9 0 3.4-1.4 3.4-3.4 0-2.3-2-3.5-3.4-6.6-1.4 3.1-3.4 4.3-3.4 6.6C8.6 20.6 10.1 22 12 22z"/>',
  star:     '<polygon points="12 2 15.1 8.6 22 9.6 17 14.6 18.2 22 12 18.5 5.8 22 7 14.6 2 9.6 8.9 8.6 12 2"/>',
  trophy:   '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4.5a2.5 2.5 0 0 0 2.5 5"/><path d="M17 5h2.5a2.5 2.5 0 0 1-2.5 5"/><line x1="12" y1="14" x2="12" y2="18"/><path d="M8.5 21h7a3.5 3.5 0 0 0-7 0z"/>',
  layers:   '<polygon points="12 2 2 7.5 12 13 22 7.5 12 2"/><polyline points="2 12.5 12 18 22 12.5"/><polyline points="2 17 12 22.5 22 17"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/>',
  eye:      '<path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/>',
  x:        '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  "chevron-left":  '<polyline points="15 18 9 12 15 6"/>',
  "chevron-right": '<polyline points="9 18 15 12 9 6"/>',
  "thumbs-up":     '<path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/><path d="M7 11l4.5-8.5A2 2 0 0 1 15 4v5h4.2a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 18 20H7z"/>',
  "thumbs-down":   '<path d="M7 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"/><path d="M7 13l4.5 8.5A2 2 0 0 0 15 20v-5h4.2a2 2 0 0 0 2-2.3l-1.2-7A2 2 0 0 0 18 4H7z"/>'
};

const ESPACE_SVG = "http://www.w3.org/2000/svg";

/**
 * Construit une icône SVG prête à être insérée dans le DOM.
 * @param {string} nom     clé de l'objet ICONES (ex. "zap", "check-circle")
 * @param {number} taille  côté en pixels (20 par défaut)
 * @returns {SVGElement}
 */
function icone(nom, taille) {
  const tracé = ICONES[nom] || ICONES.help;
  const cote = taille || 20;
  const svg = document.createElementNS(ESPACE_SVG, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", String(cote));
  svg.setAttribute("height", String(cote));
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("class", "icone");
  // Décorative : masquée aux lecteurs d'écran, le texte voisin porte le sens.
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  // innerHTML fonctionne sur un élément SVG dans tous les navigateurs actuels ;
  // on garde une solution de repli au cas où.
  try {
    svg.innerHTML = tracé;
  } catch (erreur) {
    svg.appendChild(fragmentSvg(tracé));
  }
  if (!svg.firstChild && tracé) svg.appendChild(fragmentSvg(tracé));
  return svg;
}

/** Solution de repli : analyse le tracé comme un document XML. */
function fragmentSvg(tracé) {
  const fragment = document.createDocumentFragment();
  try {
    const document_ = new DOMParser().parseFromString(
      '<svg xmlns="' + ESPACE_SVG + '">' + tracé + "</svg>", "image/svg+xml");
    Array.prototype.slice.call(document_.documentElement.childNodes).forEach((noeud) => {
      fragment.appendChild(document.importNode(noeud, true));
    });
  } catch (erreur) { /* l'icône sera simplement vide */ }
  return fragment;
}

/**
 * Remplace dans le DOM tous les marqueurs <span data-icone="nom"></span>
 * par l'icône correspondante. Utilisé pour index.html, qui reste ainsi lisible.
 */
function hydraterIcones(racine) {
  (racine || document).querySelectorAll("[data-icone]").forEach((marqueur) => {
    const taille = Number(marqueur.dataset.taille) || 20;
    while (marqueur.firstChild) marqueur.removeChild(marqueur.firstChild);
    marqueur.appendChild(icone(marqueur.dataset.icone, taille));
  });
}
