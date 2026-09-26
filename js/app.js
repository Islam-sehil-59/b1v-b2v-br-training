/* ==========================================================================
   app.js — Toute la logique de l'application
   Organisation du fichier :
     1.  Petits utilitaires (construction du DOM, mélange, formatage)
     2.  Sauvegarde dans localStorage (tout est entouré de try/catch)
     3.  Thème clair / sombre
     4.  État global, navigation, notifications
     5.  Widgets de progression (niveau, série, objectif, badges)
     6.  Vue ACCUEIL
     7.  Vue FICHES (balayage d'un chapitre à l'autre)
     8.  Vue CARTES MÉMO (cartes à balayer, révision espacée)
     9.  Moteur de quiz : préparation, rendu par type, évaluation, correction
     10. Vue ENTRAÎNEMENT
     11. Déroulement d'un quiz (combo, expérience, balayage vers la suite)
     12. Vue EXAMEN BLANC (officiel et long)
     13. Vues MES ERREURS, RÉVISION DU JOUR, SUCCÈS
     14. Démarrage

   Les fichiers compagnons : icones.js (icônes SVG), jeu.js (expérience,
   séries, badges, révision espacée), gestes.js (balayage), data.js (contenu).
   ========================================================================== */
"use strict";

/* ==========================================================================
   1. PETITS UTILITAIRES
   ========================================================================== */

/**
 * Construit un élément du DOM.
 * h("p", { class: "truc" }, "du texte", autreElement)
 * Attributs spéciaux : class, dataset, onclick/onchange…, html (innerHTML).
 */
function h(balise, attributs, ...enfants) {
  const noeud = document.createElement(balise);
  for (const [cle, valeur] of Object.entries(attributs || {})) {
    if (valeur === null || valeur === undefined || valeur === false) continue;
    if (cle === "class") noeud.className = valeur;
    else if (cle === "dataset") Object.assign(noeud.dataset, valeur);
    else if (cle === "html") noeud.innerHTML = valeur;
    else if (cle.startsWith("on")) noeud.addEventListener(cle.slice(2).toLowerCase(), valeur);
    else noeud.setAttribute(cle, valeur === true ? "" : valeur);
  }
  ajouterEnfants(noeud, enfants);
  return noeud;
}

/** Ajoute des enfants (texte ou éléments), en ignorant null / undefined / false. */
function ajouterEnfants(parent, enfants) {
  for (const enfant of enfants.flat(Infinity)) {
    if (enfant === null || enfant === undefined || enfant === false || enfant === "") continue;
    parent.appendChild(enfant instanceof Node ? enfant : document.createTextNode(String(enfant)));
  }
  return parent;
}

/** Vide un élément de tous ses enfants. */
function vider(noeud) {
  while (noeud.firstChild) noeud.removeChild(noeud.firstChild);
  return noeud;
}

/** Copie un tableau et le mélange (algorithme de Fisher-Yates). */
function melanger(tableau) {
  const copie = tableau.slice();
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/** Mélange en s'assurant que l'ordre obtenu n'est PAS l'ordre d'origine. */
function melangerVraiment(tableau) {
  if (tableau.length < 2) return tableau.slice();
  let essai = melanger(tableau);
  let securite = 0;
  while (essai.every((v, i) => v === tableau[i]) && securite++ < 20) essai = melanger(tableau);
  return essai;
}

/** Formate un nombre de secondes en mm:ss. */
function formaterDuree(secondes) {
  const s = Math.max(0, Math.round(secondes));
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}

/** Retrouve un chapitre par son identifiant. */
function chapitreParId(id) {
  return CHAPITRES.find((c) => c.id === id) || null;
}

/** Retrouve une question par son identifiant. */
function questionParId(id) {
  return QUESTIONS.find((q) => q.id === id) || null;
}

/** Toutes les questions d'un chapitre. */
function questionsDuChapitre(idChapitre) {
  return QUESTIONS.filter((q) => q.chapitre === idChapitre);
}

/** Numéro d'affichage d'un chapitre (1 à 10). */
function numeroChapitre(chapitre) {
  return CHAPITRES.indexOf(chapitre) + 1;
}

/** Annonce un message aux lecteurs d'écran (zone aria-live). */
function annoncer(message) {
  const zone = document.getElementById("annonce");
  if (zone) zone.textContent = message;
}

/** Barre de progression réutilisable, animée après insertion. */
function barreProgression(pourcent, etiquette) {
  const jauge = h("div", { class: "progression__jauge" });
  window.setTimeout(() => { jauge.style.width = Math.max(0, Math.min(100, pourcent)) + "%"; }, 30);
  return h("div", {
    class: "progression",
    role: "progressbar",
    "aria-valuenow": String(Math.round(pourcent)),
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-label": etiquette || "Progression"
  }, jauge);
}

/* ==========================================================================
   2. SAUVEGARDE DANS localStorage
   Chaque accès est entouré de try/catch : en navigation privée, ou si le
   stockage est bloqué, l'application continue de fonctionner sans sauvegarde.
   ========================================================================== */

const CLE_PROGRESSION = "habilitation-elec:progression:v2";
const CLE_PROGRESSION_V1 = "habilitation-elec:progression:v1";
const CLE_THEME = "habilitation-elec:theme:v1";

/** Progression « vide » utilisée au premier lancement ou après réinitialisation. */
function progressionVide() {
  return {
    version: 2,
    chapitres: {},          // { ch1: { reussies: [ids], tentatives, bonnes } }
    ratees: [],             // questions à revoir
    meilleurExamen: null,   // { note, pourcent, score, total, date }
    examens: [],            // historique des examens (20 derniers)
    xp: 0,
    cartes: {},             // révision espacée : { idQuestion: {niveau, prochaine, vues} }
    serie: { jours: 0, dernierJour: null, record: 0 },
    objectif: { parJour: CONFIG.objectifQuotidien, jour: null, faites: 0 },
    badges: [],
    stats: { totalRepondues: 0, totalBonnes: 0, meilleurCombo: 0, maxErreurs: 0, joursActifs: [] }
  };
}

/** Lit une valeur JSON dans localStorage, sans jamais lever d'erreur. */
function lireStockage(cle, valeurParDefaut) {
  try {
    const brut = window.localStorage.getItem(cle);
    if (brut === null) return valeurParDefaut;
    return JSON.parse(brut);
  } catch (erreur) {
    return valeurParDefaut; // stockage indisponible ou données corrompues
  }
}

/** Écrit une valeur JSON dans localStorage, sans jamais lever d'erreur. */
function ecrireStockage(cle, valeur) {
  try {
    window.localStorage.setItem(cle, JSON.stringify(valeur));
    return true;
  } catch (erreur) {
    return false; // quota dépassé, navigation privée… l'application continue
  }
}

/** Supprime une clé du stockage, sans jamais lever d'erreur. */
function supprimerStockage(cle) {
  try {
    window.localStorage.removeItem(cle);
    return true;
  } catch (erreur) {
    return false;
  }
}

/**
 * Charge la progression, la remet en forme si elle est incomplète, et
 * reprend au besoin une ancienne sauvegarde de version 1.
 */
function chargerProgression() {
  const p = progressionVide();
  let brut = lireStockage(CLE_PROGRESSION, null);
  if (!brut) {
    // Reprise d'une progression enregistrée par la version précédente
    const ancien = lireStockage(CLE_PROGRESSION_V1, null);
    if (ancien) brut = ancien;
  }
  if (!brut || typeof brut !== "object") return p;

  if (brut.chapitres && typeof brut.chapitres === "object") {
    for (const [id, donnees] of Object.entries(brut.chapitres)) {
      if (!chapitreParId(id) || !donnees || typeof donnees !== "object") continue;
      p.chapitres[id] = {
        reussies: Array.isArray(donnees.reussies) ? donnees.reussies.filter(questionParId) : [],
        tentatives: Number(donnees.tentatives) || 0,
        bonnes: Number(donnees.bonnes) || 0
      };
    }
  }
  if (Array.isArray(brut.ratees)) p.ratees = brut.ratees.filter(questionParId);
  if (brut.meilleurExamen && typeof brut.meilleurExamen === "object") p.meilleurExamen = brut.meilleurExamen;
  if (Array.isArray(brut.examens)) p.examens = brut.examens.slice(-20);
  if (typeof brut.xp === "number" && isFinite(brut.xp)) p.xp = Math.max(0, brut.xp);
  if (Array.isArray(brut.badges)) p.badges = brut.badges.filter((id) => badgeParId(id));

  if (brut.cartes && typeof brut.cartes === "object") {
    for (const [id, fiche] of Object.entries(brut.cartes)) {
      if (!questionParId(id) || !fiche || typeof fiche !== "object") continue;
      p.cartes[id] = {
        niveau: Math.max(0, Math.min(NIVEAU_MAX, Number(fiche.niveau) || 0)),
        prochaine: typeof fiche.prochaine === "string" ? fiche.prochaine : jourAujourdhui(),
        vues: Number(fiche.vues) || 0
      };
    }
  }
  if (brut.serie && typeof brut.serie === "object") {
    p.serie = {
      jours: Number(brut.serie.jours) || 0,
      dernierJour: typeof brut.serie.dernierJour === "string" ? brut.serie.dernierJour : null,
      record: Number(brut.serie.record) || 0
    };
  }
  if (brut.objectif && typeof brut.objectif === "object") {
    p.objectif = {
      parJour: Number(brut.objectif.parJour) || CONFIG.objectifQuotidien,
      jour: typeof brut.objectif.jour === "string" ? brut.objectif.jour : null,
      faites: Number(brut.objectif.faites) || 0
    };
  }
  if (brut.stats && typeof brut.stats === "object") {
    p.stats = {
      totalRepondues: Number(brut.stats.totalRepondues) || 0,
      totalBonnes: Number(brut.stats.totalBonnes) || 0,
      meilleurCombo: Number(brut.stats.meilleurCombo) || 0,
      maxErreurs: Number(brut.stats.maxErreurs) || 0,
      joursActifs: Array.isArray(brut.stats.joursActifs) ? brut.stats.joursActifs.slice(-60) : []
    };
  }
  // Remise à zéro du compteur du jour si la date a changé
  if (p.objectif.jour !== jourAujourdhui()) { p.objectif.jour = jourAujourdhui(); p.objectif.faites = 0; }
  return p;
}

/** Enregistre la progression courante. */
function sauverProgression() {
  ecrireStockage(CLE_PROGRESSION, etat.progression);
}

/** Retourne (en la créant au besoin) la fiche de progression d'un chapitre. */
function progressionChapitre(idChapitre) {
  const p = etat.progression;
  if (!p.chapitres[idChapitre]) p.chapitres[idChapitre] = { reussies: [], tentatives: 0, bonnes: 0 };
  return p.chapitres[idChapitre];
}

/**
 * Enregistre le résultat d'une question : progression du chapitre, liste des
 * erreurs, révision espacée, expérience, série du jour et badges.
 *
 * @param {object} question
 * @param {boolean} estJuste
 * @param {object} contexte  { combo: n, silencieux: true } (facultatif)
 * @returns {object} { xp, nouveauxBadges, objectifAtteint, niveauAvant, niveauApres }
 */
function enregistrerResultat(question, estJuste, contexte) {
  const p = etat.progression;
  const ctx = contexte || {};
  const niveauAvant = niveauPourXp(p.xp);

  // --- Progression du chapitre ---
  const pc = progressionChapitre(question.chapitre);
  pc.tentatives += 1;
  if (estJuste) {
    pc.bonnes += 1;
    if (!pc.reussies.includes(question.id)) pc.reussies.push(question.id);
    p.ratees = p.ratees.filter((id) => id !== question.id);
  } else {
    pc.reussies = pc.reussies.filter((id) => id !== question.id);
    if (!p.ratees.includes(question.id)) p.ratees.push(question.id);
  }
  p.stats.maxErreurs = Math.max(p.stats.maxErreurs || 0, p.ratees.length);

  // --- Statistiques globales ---
  p.stats.totalRepondues += 1;
  if (estJuste) p.stats.totalBonnes += 1;
  if (ctx.combo) p.stats.meilleurCombo = Math.max(p.stats.meilleurCombo || 0, ctx.combo);

  // --- Révision espacée ---
  majRevisionEspacee(p, question.id, estJuste);

  // --- Série du jour et objectif quotidien ---
  const activite = enregistrerActiviteDuJour(p);

  // --- Expérience ---
  let gain = 0;
  if (estJuste) {
    gain += XP.bonneReponse;
    if (ctx.combo && ctx.combo % 5 === 0) gain += XP.comboPalier;
  }
  if (activite.objectifAtteintMaintenant) gain += XP.objectifAtteint;
  p.xp += gain;

  const nouveauxBadges = verifierBadges(p);
  sauverProgression();
  rafraichirIndicateursEntete();

  return {
    xp: gain,
    nouveauxBadges: nouveauxBadges,
    objectifAtteint: activite.objectifAtteintMaintenant,
    niveauAvant: niveauAvant,
    niveauApres: niveauPourXp(p.xp)
  };
}

/** Pourcentage de maîtrise d'un chapitre (questions réussies / total). */
function pourcentageChapitre(idChapitre) {
  const total = questionsDuChapitre(idChapitre).length;
  if (!total) return 0;
  const pc = etat.progression.chapitres[idChapitre];
  return Math.round(((pc ? pc.reussies.length : 0) / total) * 100);
}

/** Pourcentage de maîtrise sur l'ensemble du programme. */
function pourcentageGlobal() {
  const reussies = CHAPITRES.reduce((somme, c) => {
    const pc = etat.progression.chapitres[c.id];
    return somme + (pc ? pc.reussies.length : 0);
  }, 0);
  return QUESTIONS.length ? Math.round((reussies / QUESTIONS.length) * 100) : 0;
}

/* ==========================================================================
   3. THÈME CLAIR / SOMBRE
   ========================================================================== */

function appliquerTheme(theme) {
  etat.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  const marqueur = document.getElementById("icone-theme");
  const label = document.getElementById("label-theme");
  if (marqueur) {
    vider(marqueur);
    marqueur.appendChild(icone(theme === "sombre" ? "sun" : "moon", 18));
  }
  if (label) label.textContent = theme === "sombre" ? "Clair" : "Sombre";
  ecrireStockage(CLE_THEME, theme);
}

function basculerTheme() {
  appliquerTheme(etat.theme === "sombre" ? "clair" : "sombre");
  annoncer("Thème " + etat.theme + " activé.");
}

/** Thème initial : choix enregistré, sinon préférence du système. */
function themeInitial() {
  const enregistre = lireStockage(CLE_THEME, null);
  if (enregistre === "clair" || enregistre === "sombre") return enregistre;
  try {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "sombre";
  } catch (erreur) { /* matchMedia indisponible */ }
  return "clair";
}

/* ==========================================================================
   4. ÉTAT GLOBAL, NAVIGATION, NOTIFICATIONS
   ========================================================================== */

const etat = {
  mode: "accueil",
  theme: "clair",
  progression: progressionVide(),
  quiz: null,        // session de questions en cours
  paquet: null,      // session de cartes mémo en cours
  nettoyages: []     // fonctions à appeler pour retirer les écouteurs de balayage
};

/* Les modes qui ne sont pas des onglets : on met alors en valeur l'onglet parent. */
const ONGLET_PARENT = { revision: "accueil", erreurs: "entrainement", succes: "accueil" };

function conteneur() {
  return document.getElementById("vue");
}

/** Met à jour l'onglet actif dans la barre de navigation. */
function majOngletActif() {
  const parent = ONGLET_PARENT[etat.mode] || etat.mode;
  document.querySelectorAll(".modes__btn").forEach((btn) => {
    const actif = btn.dataset.mode === parent;
    btn.classList.toggle("actif", actif);
    btn.setAttribute("aria-current", actif ? "page" : "false");
  });
}

/** Met à jour les indicateurs permanents de l'en-tête (niveau, série). */
function rafraichirIndicateursEntete() {
  const p = etat.progression;
  const infos = infosNiveau(p.xp);
  const zoneNiveau = document.getElementById("entete-niveau");
  if (zoneNiveau) {
    vider(zoneNiveau);
    ajouterEnfants(zoneNiveau, [
      icone("star", 15),
      h("span", {}, "Niv. " + infos.niveau)
    ]);
    zoneNiveau.title = infos.titre + " — " + p.xp + " XP";
    // L'aria-label reprend le texte visible (« Niv. 1 ») puis complète.
    // WCAG 2.5.3 « Label in Name » : le nom accessible doit contenir le
    // libellé visible, sinon la commande vocale « cliquer Niv. 1 » échoue.
    zoneNiveau.setAttribute("aria-label", "Niv. " + infos.niveau + " : mon niveau et mes succès");
  }
  const zoneSerie = document.getElementById("entete-serie");
  if (zoneSerie) {
    const jours = serieRompue(p) ? 0 : p.serie.jours;
    vider(zoneSerie);
    ajouterEnfants(zoneSerie, [icone("flame", 15), h("span", {}, String(jours))]);
    zoneSerie.classList.toggle("entete__jeton--eteint", jours === 0);
    zoneSerie.title = jours > 0
      ? "Série de " + jours + " jour(s) — record : " + (p.serie.record || 0)
      : "Aucune série en cours. Réponds à une question pour la démarrer.";
    // Même règle que pour le niveau : le nombre affiché doit figurer dans
    // le nom accessible, sinon on annonce « 0 » et le nom dit « série ».
    zoneSerie.setAttribute("aria-label",
      jours + (jours > 1 ? " jours" : " jour") + " de série consécutifs"
      + (p.serie.record ? ", record " + p.serie.record : ""));
  }
  const badge = document.getElementById("badge-erreurs");
  if (badge) {
    badge.textContent = String(p.ratees.length);
    badge.hidden = p.ratees.length === 0;
  }
}

/** Arrête proprement un quiz en cours (notamment son chronomètre). */
function arreterQuiz() {
  if (etat.quiz && etat.quiz.timerId) {
    clearInterval(etat.quiz.timerId);
    etat.quiz.timerId = null;
  }
}

/** Retire tous les écouteurs de balayage installés par la vue précédente. */
function nettoyerVue() {
  etat.nettoyages.forEach((fonction) => { try { fonction(); } catch (erreur) { /* rien */ } });
  etat.nettoyages = [];
}

/** Enregistre une fonction de nettoyage à exécuter au changement de vue. */
function aNettoyer(fonction) {
  if (typeof fonction === "function") etat.nettoyages.push(fonction);
}

/**
 * Navigation principale.
 * @param {string} mode accueil | fiches | cartes | entrainement | examen | erreurs | revision | succes
 * @param {object} options ex. { chapitre: "ch5" }
 */
function naviguer(mode, options) {
  arreterQuiz();
  nettoyerVue();
  etat.quiz = null;
  etat.paquet = null;
  etat.mode = mode;
  majOngletActif();
  const cible = vider(conteneur());
  cible.classList.remove("anime-entree");
  void cible.offsetWidth;          // relance l'animation d'apparition
  cible.classList.add("anime-entree");

  switch (mode) {
    case "fiches":       vueFiches(options && options.chapitre); break;
    case "cartes":       vueCartes(options && options.chapitre); break;
    case "entrainement": vueEntrainement(options && options.chapitre); break;
    case "examen":       vueExamenAccueil(); break;
    case "erreurs":      vueErreurs(); break;
    case "revision":     vueRevision(); break;
    case "succes":       vueSucces(); break;
    default:             vueAccueil(); break;
  }
  window.scrollTo({ top: 0, behavior: "auto" });
  cible.focus({ preventScroll: true });
}

/* ------------------------------- NOTIFICATIONS ---------------------------- */

/**
 * Affiche une notification flottante, qui disparaît d'elle-même.
 * Sert aux gains d'expérience, aux badges et aux montées de niveau.
 */
function notifier(nomIcone, titre, texte, variante) {
  let pile = document.getElementById("notifications");
  if (!pile) {
    pile = h("div", { id: "notifications", class: "notifications", "aria-live": "polite" });
    document.body.appendChild(pile);
  }
  const carte = h("div", { class: "notif" + (variante ? " notif--" + variante : "") },
    h("span", { class: "notif__icone" }, icone(nomIcone, 22)),
    h("span", { class: "notif__texte" },
      h("strong", {}, titre),
      texte ? h("small", {}, texte) : null
    )
  );
  pile.appendChild(carte);
  window.setTimeout(() => { carte.classList.add("notif--sortie"); }, 2600);
  window.setTimeout(() => { if (carte.parentNode) carte.parentNode.removeChild(carte); }, 3200);
}

/** Enchaîne les notifications issues d'un résultat de question. */
function notifierRecompenses(resultat, combo) {
  if (!resultat) return;
  if (resultat.niveauApres > resultat.niveauAvant) {
    notifier("star", "Niveau " + resultat.niveauApres + " !", titreNiveau(resultat.niveauApres), "niveau");
    vibrer([20, 40, 20]);
  }
  if (resultat.objectifAtteint) {
    notifier("calendar", "Objectif du jour atteint", "+" + XP.objectifAtteint + " XP", "objectif");
  }
  if (combo && combo >= 3 && combo % 5 === 0) {
    notifier("zap", combo + " d'affilée !", "+" + XP.comboPalier + " XP de bonus", "combo");
  }
  (resultat.nouveauxBadges || []).forEach((badge, i) => {
    window.setTimeout(() => {
      notifier(badge.icone, "Succès : " + badge.titre, badge.description, "badge");
      vibrer([15, 30, 15, 30, 15]);
    }, 300 * (i + 1));
  });
}

/* ==========================================================================
   5. WIDGETS DE PROGRESSION
   ========================================================================== */

/** Bandeau du joueur : niveau, expérience, série, objectif du jour. */
function bandeauJoueur() {
  const p = etat.progression;
  const infos = infosNiveau(p.xp);
  const jours = serieRompue(p) ? 0 : p.serie.jours;
  const faites = p.objectif.jour === jourAujourdhui() ? p.objectif.faites : 0;
  const objectifFait = Math.min(faites, p.objectif.parJour);
  const pourcentObjectif = Math.round((objectifFait / p.objectif.parJour) * 100);

  return h("section", { class: "joueur" },
    h("div", { class: "joueur__haut" },
      h("div", { class: "joueur__niveau" },
        h("span", { class: "joueur__pastille" }, String(infos.niveau)),
        h("span", { class: "joueur__identite" },
          h("strong", {}, infos.titre),
          h("small", {}, infos.xp + " XP" + (infos.restant > 0 ? " — encore " + infos.restant + " avant le niveau " + (infos.niveau + 1) : ""))
        )
      ),
      h("div", { class: "joueur__jetons" },
        h("span", { class: "jeton" + (jours === 0 ? " jeton--eteint" : ""), title: "Série de jours consécutifs" },
          icone("flame", 17), h("strong", {}, String(jours)), h("small", {}, jours > 1 ? "jours" : "jour")),
        h("span", { class: "jeton", title: "Succès débloqués" },
          icone("trophy", 17), h("strong", {}, p.badges.length + "/" + BADGES.length))
      )
    ),
    barreProgression(infos.pourcent, "Progression vers le niveau " + (infos.niveau + 1)),
    h("div", { class: "objectif" },
      h("div", { class: "objectif__texte" },
        icone("calendar", 16),
        h("span", {}, objectifFait >= p.objectif.parJour
          ? "Objectif du jour atteint : " + faites + " question(s) aujourd'hui"
          : "Objectif du jour : " + objectifFait + " / " + p.objectif.parJour + " questions")
      ),
      h("div", { class: "objectif__points" },
        Array.from({ length: p.objectif.parJour }, (_, i) =>
          h("span", { class: "objectif__point" + (i < objectifFait ? " objectif__point--fait" : "") }))
      )
    )
  );
}

/** Grande tuile d'action, utilisée pour les raccourcis de l'accueil. */
function tuile(nomIcone, titre, sousTitre, action, variante) {
  return h("button", {
    class: "tuile" + (variante ? " tuile--" + variante : ""), type: "button", onclick: action
  },
    h("span", { class: "tuile__icone" }, icone(nomIcone, 26)),
    h("span", { class: "tuile__texte" },
      h("strong", {}, titre),
      h("small", {}, sousTitre)
    ),
    h("span", { class: "tuile__fleche" }, icone("chevron-right", 20))
  );
}

/** Carte d'un chapitre avec sa barre de progression. */
function carteChapitre(chapitre, options) {
  const reglages = options || {};
  const pourcent = pourcentageChapitre(chapitre.id);
  const nbQuestions = questionsDuChapitre(chapitre.id).length;
  const numero = numeroChapitre(chapitre);
  const theme = THEMES[themeDuChapitre(chapitre.id)];

  return h("button", {
    class: "chapitre" + (pourcent === 100 ? " chapitre--termine" : ""),
    type: "button",
    // Pas d'aria-label ici, volontairement. Un libellé inventé qui ne
    // reprend pas mot pour mot le texte visible viole le critère WCAG
    // 2.5.3 « Label in Name » (critère 2.5.3 de l'audit axe), et le
    // lecteur d'écran annonçait « Chapitre 2 : … » pendant que l'œil
    // lisait « 2. … ». Sans aria-label, le nom accessible est calculé
    // depuis le contenu : il est par construction identique au texte
    // visible, et la progression reste annoncée par la barre, qui porte
    // sa propre étiquette.
    onclick: reglages.action || (() => naviguer("fiches", { chapitre: chapitre.id }))
  },
    h("div", { class: "chapitre__haut" },
      h("span", { class: "chapitre__icone" }, icone(chapitre.icone, 24)),
      h("span", { class: "chapitre__titre" },
        numero + ". " + chapitre.titre,
        h("small", {}, nbQuestions + " questions",
          theme && theme.partMini > 0 ? [" · ", h("span", { class: "puce-theme" }, "≥ " + Math.round(theme.partMini * 100) + " % à l'examen")] : null,
          pourcent === 100 ? [" · maîtrisé ", icone("check", 13)] : null)
      ),
      h("span", { class: "chapitre__pct" }, pourcent + " %")
    ),
    barreProgression(pourcent, "Progression du chapitre " + numero)
  );
}

/* ==========================================================================
   6. VUE ACCUEIL
   ========================================================================== */

function vueAccueil() {
  const cible = conteneur();
  const p = etat.progression;
  const nbRevision = nombreDuJour(p, QUESTIONS);
  const nbErreurs = p.ratees.length;
  const meilleur = p.meilleurExamen;

  ajouterEnfants(cible, [
    bandeauJoueur(),

    // --- Actions du jour ---
    h("h2", { class: "titre-section" }, "Aujourd'hui"),
    h("div", { class: "tuiles" },
      tuile("calendar",
        nbRevision > 0 ? "Révision du jour" : "Révision libre",
        nbRevision > 0
          ? nbRevision + " question(s) à revoir maintenant"
          : "Tout est à jour — continue avec de nouvelles questions",
        () => naviguer("revision"),
        "principale"),
      nbErreurs > 0 && tuile("rotate", "Mes erreurs",
        nbErreurs + " question(s) ratée(s) à reprendre",
        () => naviguer("erreurs")),
      tuile("layers", "Cartes mémo",
        "Cartes à balayer : je sais / à revoir",
        () => naviguer("cartes")),
      tuile("clipboard", "Examen blanc",
        meilleur ? "Meilleur résultat : " + meilleur.pourcent + " % (" + meilleur.note + "/20)" : "20 questions, règles officielles, 70 % exigés",
        () => naviguer("examen"))
    ),

    // --- Chiffres clés ---
    h("div", { class: "stats" },
      h("div", { class: "stat" },
        h("span", { class: "stat__valeur" }, pourcentageGlobal() + " %"),
        h("span", { class: "stat__label" }, "Programme maîtrisé")),
      h("div", { class: "stat" },
        h("span", { class: "stat__valeur" }, String(p.stats.totalRepondues)),
        h("span", { class: "stat__label" }, "Questions traitées")),
      h("div", { class: "stat" },
        h("span", { class: "stat__valeur" },
          p.stats.totalRepondues ? Math.round((p.stats.totalBonnes / p.stats.totalRepondues) * 100) + " %" : "—"),
        h("span", { class: "stat__label" }, "Taux de réussite")),
      h("div", { class: "stat" },
        h("span", { class: "stat__valeur" }, String(p.stats.meilleurCombo || 0)),
        h("span", { class: "stat__label" }, "Meilleure série d'affilée"))
    ),

    // --- Succès (aperçu) ---
    h("div", { class: "entete-section" },
      h("h2", { class: "titre-section" }, "Succès"),
      h("button", { class: "lien", type: "button", onclick: () => naviguer("succes") },
        "Tout voir", icone("chevron-right", 16))
    ),
    h("div", { class: "badges badges--apercu" },
      BADGES.slice(0, 6).map((badge) => vignetteBadge(badge, p.badges.includes(badge.id)))
    ),

    // --- Chapitres ---
    h("h2", { class: "titre-section" }, "Les " + CHAPITRES.length + " chapitres"),
    h("div", { class: "liste-chapitres" }, CHAPITRES.map((c) => carteChapitre(c))),

    blocReinitialisation()
  ]);
}

/** Vignette d'un succès, grisée tant qu'il n'est pas obtenu. */
function vignetteBadge(badge, obtenu) {
  return h("div", {
    class: "badge-vignette" + (obtenu ? " badge-vignette--obtenu" : ""),
    title: badge.titre + " — " + badge.description
  },
    h("span", { class: "badge-vignette__icone" }, icone(obtenu ? badge.icone : "lock", 20)),
    h("span", { class: "badge-vignette__titre" }, badge.titre)
  );
}

/**
 * Bloc « Réinitialiser ma progression ».
 * La confirmation se fait DANS la page (pas de boîte de dialogue du navigateur).
 */
function blocReinitialisation() {
  const zone = h("div", { class: "carte carte--discrete" });

  function afficherBouton() {
    vider(zone);
    ajouterEnfants(zone, [
      h("h3", {}, "Réinitialiser ma progression"),
      h("p", { class: "texte-doux" },
        "Efface les scores, l'expérience, les succès, la série de jours, la liste des erreurs et le planning de révision."),
      h("button", { class: "btn btn--danger", type: "button", onclick: afficherConfirmation },
        icone("trash", 18), "Réinitialiser ma progression")
    ]);
  }

  function afficherConfirmation() {
    vider(zone);
    ajouterEnfants(zone, [
      h("h3", { style: "color:var(--rouge)" }, "Confirmer la réinitialisation ?"),
      h("p", {}, "Cette action est définitive : toute ta progression sera perdue."),
      h("div", { class: "barre-actions", style: "margin-top:0" },
        h("button", {
          class: "btn btn--danger", type: "button",
          onclick: () => {
            etat.progression = progressionVide();
            supprimerStockage(CLE_PROGRESSION);
            supprimerStockage(CLE_PROGRESSION_V1);
            rafraichirIndicateursEntete();
            annoncer("Progression réinitialisée.");
            naviguer("accueil");
          }
        }, "Oui, tout effacer"),
        h("button", { class: "btn btn--discret", type: "button", onclick: afficherBouton }, "Annuler"))
    ]);
    const premier = zone.querySelector("button");
    if (premier) premier.focus();
  }

  afficherBouton();
  return zone;
}

/* ==========================================================================
   7. VUE FICHES
   ========================================================================== */

function vueFiches(idChapitre) {
  const cible = conteneur();
  if (!idChapitre) {
    ajouterEnfants(cible, [
      h("h1", {}, icone("book", 24), "Fiches de révision"),
      h("p", { class: "texte-doux" }, "Choisis un chapitre. Sur téléphone, tu peux ensuite balayer l'écran pour passer d'une fiche à l'autre."),
      h("div", { class: "liste-chapitres" }, CHAPITRES.map((c) => carteChapitre(c)))
    ]);
    return;
  }
  const chapitre = chapitreParId(idChapitre);
  if (!chapitre) { naviguer("fiches"); return; }
  ajouterEnfants(cible, ficheComplete(chapitre));

  // Balayage horizontal : chapitre précédent / suivant
  const index = CHAPITRES.indexOf(chapitre);
  const precedent = CHAPITRES[index - 1];
  const suivant = CHAPITRES[index + 1];
  aNettoyer(installerSwipe(cible, {
    surGauche: () => { if (suivant) naviguer("fiches", { chapitre: suivant.id }); },
    surDroite: () => { if (precedent) naviguer("fiches", { chapitre: precedent.id }); },
    seuil: 90
  }));
}

/** Construit l'affichage complet d'une fiche. */
function ficheComplete(chapitre) {
  const index = CHAPITRES.indexOf(chapitre);
  const precedent = CHAPITRES[index - 1];
  const suivant = CHAPITRES[index + 1];
  const theme = THEMES[themeDuChapitre(chapitre.id)];
  const morceaux = [];

  morceaux.push(
    h("button", { class: "btn btn--discret btn--petit", type: "button", onclick: () => naviguer("fiches") },
      icone("arrow-left", 16), "Toutes les fiches"),
    h("div", { class: "fiche__entete" },
      h("span", { class: "chapitre__icone" }, icone(chapitre.icone, 30)),
      h("div", {},
        h("h1", { style: "margin:0" }, (index + 1) + ". " + chapitre.titre),
        theme && h("small", { class: "texte-doux" },
          "Thème d'examen : " + theme.libelle +
          (theme.partMini > 0 ? " (au moins " + Math.round(theme.partMini * 100) + " % du QCM)" : ""))
      )
    ),
    h("p", { class: "fiche__resume" }, chapitre.resume)
  );

  (chapitre.sections || []).forEach((section) => {
    const bloc = h("section", { class: "section-fiche" });
    if (section.titre) bloc.appendChild(h("h3", {}, section.titre));
    (section.paragraphes || []).forEach((texte) => bloc.appendChild(h("p", {}, texte)));
    if (section.liste && section.liste.length) {
      bloc.appendChild(h("ul", {}, section.liste.map((item) => h("li", {}, item))));
    }
    if (section.tableau) bloc.appendChild(construireTableau(section.tableau));
    morceaux.push(bloc);
  });

  if (chapitre.pointsCles && chapitre.pointsCles.length) {
    morceaux.push(encadre("cles", "check-circle", "À retenir",
      h("ul", {}, chapitre.pointsCles.map((p) => h("li", {}, p)))));
  }
  if (chapitre.piege) morceaux.push(encadre("piege", "alert", "Piège fréquent à l'examen", h("p", {}, chapitre.piege)));
  if (chapitre.exemple) morceaux.push(encadre("exemple", "factory", "Sur le terrain", h("p", {}, chapitre.exemple)));
  if (chapitre.aVerifier && chapitre.aVerifier.length) {
    morceaux.push(encadre("verif", "help", "À vérifier avec le formateur",
      h("ul", {}, chapitre.aVerifier.map((p) => h("li", {}, p)))));
  }

  morceaux.push(
    h("div", { class: "barre-actions" },
      h("button", {
        class: "btn btn--principal", type: "button",
        onclick: () => naviguer("entrainement", { chapitre: chapitre.id })
      }, icone("target", 18), "M'entraîner sur ce chapitre"),
      h("button", {
        class: "btn", type: "button",
        onclick: () => naviguer("cartes", { chapitre: chapitre.id })
      }, icone("layers", 18), "Cartes mémo de ce chapitre")
    ),
    h("nav", { class: "nav-fiche", "aria-label": "Chapitre précédent ou suivant" },
      precedent
        ? h("button", { class: "nav-fiche__btn", type: "button", onclick: () => naviguer("fiches", { chapitre: precedent.id }) },
            icone("chevron-left", 18), h("span", {}, precedent.titre))
        : h("span", {}),
      suivant
        ? h("button", { class: "nav-fiche__btn nav-fiche__btn--droite", type: "button", onclick: () => naviguer("fiches", { chapitre: suivant.id }) },
            h("span", {}, suivant.titre), icone("chevron-right", 18))
        : h("span", {})
    ),
    h("p", { class: "astuce-swipe" }, icone("chevron-left", 14),
      " Sur téléphone, balaye l'écran pour changer de fiche ", icone("chevron-right", 14))
  );
  return morceaux;
}

/** Un encadré coloré (à retenir, piège, exemple, à vérifier). */
function encadre(variante, nomIcone, titre, contenu) {
  return h("aside", { class: "encadre encadre--" + variante },
    h("div", { class: "encadre__titre" }, icone(nomIcone, 18), titre),
    contenu
  );
}

/** Construit un tableau HTML à partir de { entetes, lignes }. */
function construireTableau(donnees) {
  return h("div", { class: "tableau-enveloppe" },
    h("table", {},
      h("thead", {}, h("tr", {}, donnees.entetes.map((e) => h("th", { scope: "col" }, e)))),
      h("tbody", {}, donnees.lignes.map((ligne) => h("tr", {}, ligne.map((c) => h("td", {}, c)))))
    )
  );
}

/* ==========================================================================
   8. VUE CARTES MÉMO
   --------------------------------------------------------------------------
   Une carte par question : au recto l'énoncé, au verso la bonne réponse et
   l'explication. On s'auto-évalue en balayant : à droite « je savais »,
   à gauche « à revoir ». Le résultat alimente la révision espacée.
   ========================================================================== */

function vueCartes(idChapitre) {
  const cible = conteneur();

  if (!idChapitre) {
    ajouterEnfants(cible, [
      h("h1", {}, icone("layers", 24), "Cartes mémo"),
      h("p", { class: "texte-doux" },
        "Le recto pose la question, le verso donne la réponse et le pourquoi. " +
        "Tu t'auto-évalues : balaye vers la droite si tu savais, vers la gauche si c'est à revoir. " +
        "Les cartes ratées reviennent plus vite."),
      h("div", { class: "tuiles" },
        tuile("shuffle", "Toutes les cartes", CONFIG.taillePaquetCartes + " cartes tirées dans tout le programme",
          () => demarrerPaquet(melanger(QUESTIONS).slice(0, CONFIG.taillePaquetCartes), "Toutes les cartes"),
          "principale"),
        tuile("calendar", "Cartes à revoir",
          nombreDuJour(etat.progression, QUESTIONS) + " carte(s) dues aujourd'hui",
          () => {
            const liste = questionsDuJour(etat.progression, QUESTIONS, CONFIG.taillePaquetCartes);
            demarrerPaquet(liste, "Cartes à revoir");
          })
      ),
      h("h2", { class: "titre-section" }, "Par chapitre"),
      h("div", { class: "liste-chapitres" },
        CHAPITRES.map((c) => carteChapitre(c, { action: () => naviguer("cartes", { chapitre: c.id }) })))
    ]);
    return;
  }

  const chapitre = chapitreParId(idChapitre);
  if (!chapitre) { naviguer("cartes"); return; }
  demarrerPaquet(melanger(questionsDuChapitre(idChapitre)), chapitre.titre);
}

/** Démarre une session de cartes mémo. */
function demarrerPaquet(questions, titre) {
  if (!questions.length) { naviguer("cartes"); return; }
  etat.paquet = {
    titre: titre,
    liste: questions.slice(),
    index: 0,
    sues: 0,
    aRevoir: 0,
    retournee: false
  };
  afficherCarteCourante();
}

/** Dessine la carte courante du paquet. */
function afficherCarteCourante() {
  const paquet = etat.paquet;
  if (!paquet) return;
  if (paquet.index >= paquet.liste.length) { afficherFinPaquet(); return; }

  const question = paquet.liste[paquet.index];
  const fiche = etat.progression.cartes[question.id];
  const chapitre = chapitreParId(question.chapitre);
  const cible = vider(conteneur());
  nettoyerVue();

  cible.appendChild(h("div", { class: "quiz__barre" },
    h("div", {},
      h("span", { class: "quiz__compteur" }, "Carte " + (paquet.index + 1) + " / " + paquet.liste.length),
      h("span", { class: "texte-doux" }, " — " + paquet.titre)),
    h("span", { class: "jeton jeton--petit" },
      icone("check", 14), h("strong", {}, String(paquet.sues)),
      icone("rotate", 14), h("strong", {}, String(paquet.aRevoir)))
  ));
  cible.appendChild(barreProgression((paquet.index / paquet.liste.length) * 100, "Avancement du paquet"));

  /* --- La carte --- */
  const carte = h("div", { class: "memo", tabindex: "0", role: "group",
    "aria-label": "Carte mémo, appuie sur Entrée pour retourner" });
  const indiceGauche = h("div", { class: "memo__indice memo__indice--gauche" }, icone("rotate", 18), "À revoir");
  const indiceDroite = h("div", { class: "memo__indice memo__indice--droite" }, icone("check", 18), "Je savais");

  const recto = h("div", { class: "memo__face" },
    h("div", { class: "memo__meta" },
      chapitre ? [icone(chapitre.icone, 15), " " + chapitre.titre] : question.chapitre,
      fiche ? h("span", { class: "memo__niveau", title: "Niveau de maîtrise de cette carte" },
        "maîtrise " + fiche.niveau + "/" + NIVEAU_MAX) : null),
    question.scenario ? h("p", { class: "scenario" }, question.scenario) : null,
    h("p", { class: "memo__question" }, question.enonce)
  );

  const verso = h("div", { class: "memo__face memo__face--verso" },
    h("div", { class: "memo__meta" }, icone("check-circle", 15), " Réponse"),
    h("p", { class: "memo__reponse" }, bonneReponseTexte(question)),
    h("p", { class: "memo__pourquoi" }, h("strong", {}, "Pourquoi : "), question.explication)
  );

  carte.appendChild(indiceGauche);
  carte.appendChild(indiceDroite);
  carte.appendChild(recto);

  function retourner() {
    if (paquet.retournee) return;
    paquet.retournee = true;
    carte.classList.add("memo--retournee");
    carte.replaceChild(verso, recto);
    majBoutonsMemo();
    annoncer("Réponse : " + bonneReponseTexte(question));
  }

  /* --- Jugement --- */
  function juger(sue) {
    if (!paquet.retournee) { retourner(); return; }
    carte.classList.add(sue ? "memo--partie-droite" : "memo--partie-gauche");
    vibrer(sue ? 12 : [10, 40, 10]);
    if (sue) paquet.sues += 1; else paquet.aRevoir += 1;

    const resultat = enregistrerResultat(question, sue, {});
    if (sue) { etat.progression.xp += XP.carteRevisee; sauverProgression(); }
    notifierRecompenses(resultat, 0);

    window.setTimeout(() => {
      paquet.index += 1;
      paquet.retournee = false;
      afficherCarteCourante();
    }, 260);
  }

  // Balayage : à droite « je savais », à gauche « à revoir »
  aNettoyer(installerSwipe(carte, {
    actif: () => paquet.retournee,
    pendant: (dx, ratio) => {
      carte.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 24) + "deg)";
      indiceDroite.style.opacity = String(Math.max(0, ratio));
      indiceGauche.style.opacity = String(Math.max(0, -ratio));
    },
    annule: () => {
      carte.style.transform = "";
      indiceDroite.style.opacity = "0";
      indiceGauche.style.opacity = "0";
    },
    surGauche: () => juger(false),
    surDroite: () => juger(true),
    seuil: 70
  }));

  // Clavier : Entrée / Espace pour retourner, flèches pour juger
  carte.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); retourner(); }
    else if (ev.key === "ArrowRight" && paquet.retournee) { ev.preventDefault(); juger(true); }
    else if (ev.key === "ArrowLeft" && paquet.retournee) { ev.preventDefault(); juger(false); }
  });
  carte.addEventListener("click", () => { if (!paquet.retournee) retourner(); });

  cible.appendChild(carte);

  /* --- Boutons, indispensables sur ordinateur et pour l'accessibilité --- */
  const boutonRetourner = h("button", { class: "btn btn--principal btn--large", type: "button", onclick: retourner },
    icone("eye", 18), "Voir la réponse");
  const boutonsJugement = h("div", { class: "memo__actions" },
    h("button", { class: "btn btn--rouge", type: "button", onclick: () => juger(false) },
      icone("thumbs-down", 18), "À revoir"),
    h("button", { class: "btn btn--vert", type: "button", onclick: () => juger(true) },
      icone("thumbs-up", 18), "Je savais")
  );
  const zoneActions = h("div", { class: "barre-collante" }, boutonRetourner);

  function majBoutonsMemo() {
    vider(zoneActions);
    zoneActions.appendChild(paquet.retournee ? boutonsJugement : boutonRetourner);
  }

  cible.appendChild(zoneActions);
  cible.appendChild(h("p", { class: "astuce-swipe" },
    "Balaye la carte : ", icone("chevron-left", 14), " à revoir · je savais ", icone("chevron-right", 14)));
  cible.appendChild(h("div", { class: "barre-actions" },
    h("button", { class: "btn btn--discret btn--petit", type: "button", onclick: () => naviguer("cartes") },
      "Quitter le paquet")));
  carte.focus({ preventScroll: true });
}

/** Écran de fin d'un paquet de cartes. */
function afficherFinPaquet() {
  const paquet = etat.paquet;
  const cible = vider(conteneur());
  const total = paquet.sues + paquet.aRevoir;
  const pourcent = total ? Math.round((paquet.sues / total) * 100) : 0;

  ajouterEnfants(cible, [
    h("h1", {}, "Paquet terminé"),
    h("div", { class: "note " + (pourcent >= 70 ? "note--reussi" : "note--echec") },
      h("div", { class: "note__valeur" }, paquet.sues, h("span", {}, " / " + total)),
      h("div", { class: "note__mention" }, pourcent + " % de cartes sues"),
      h("p", { class: "texte-doux", style: "margin:8px 0 0" },
        paquet.aRevoir > 0
          ? "Les " + paquet.aRevoir + " carte(s) marquées « à revoir » reviendront dès aujourd'hui."
          : "Excellent. Ces cartes ne reviendront que dans plusieurs jours.")
    ),
    h("div", { class: "barre-actions" },
      h("button", { class: "btn btn--principal", type: "button", onclick: () => naviguer("cartes") },
        icone("layers", 18), "Un autre paquet"),
      h("button", { class: "btn", type: "button", onclick: () => naviguer("revision") },
        icone("calendar", 18), "Révision du jour"),
      h("button", { class: "btn btn--discret", type: "button", onclick: () => naviguer("accueil") },
        icone("home", 18), "Accueil"))
  ]);
  etat.paquet = null;
  window.scrollTo({ top: 0, behavior: "auto" });
}

/**
 * Texte de la bonne réponse d'une question, sans avoir à la « préparer ».
 * Sert aux cartes mémo et aux récapitulatifs.
 */
function bonneReponseTexte(question) {
  switch (question.type) {
    case "qcm":
    case "situation":
      return question.options[question.reponse];
    case "qcm_multiple":
      return question.reponses.map((i) => question.options[i]).join(" ; ");
    case "vf":
      return question.reponse ? "Vrai" : "Faux";
    case "ordre":
      return question.elements.map((e, i) => (i + 1) + ". " + e).join("  ");
    case "association":
      return question.paires.map((p) => p.gauche + " → " + p.droite).join(" ; ");
    case "trous":
      return question.trous.map((t) => t.options[t.reponse]).join(" ; ");
    default:
      return "";
  }
}
/* ==========================================================================
   9. MOTEUR DE QUIZ
   --------------------------------------------------------------------------
   Une « question préparée » (notée rq dans le code) est un objet de travail
   construit à partir d'une question de data.js :
     rq.q       la question d'origine
     rq.saisie  la réponse de l'utilisateur (le format dépend du type)
     rq.corrige true quand la correction a déjà été affichée
   Les options sont mélangées à la préparation, ce qui évite de retenir
   « la bonne réponse, c'est la deuxième ».
   ========================================================================== */

/** Libellés affichés en étiquette au-dessus de l'énoncé. */
const LIBELLE_TYPE = {
  qcm: "QCM",
  qcm_multiple: "QCM — plusieurs réponses",
  vf: "Vrai ou Faux",
  ordre: "Remettre dans l'ordre",
  association: "Association",
  trous: "Texte à trous",
  situation: "Mise en situation"
};

/** Prépare une question pour être affichée (mélange des propositions). */
function preparerQuestion(question, melangerPropositions) {
  const rq = { q: question, type: question.type, saisie: null, corrige: false, dom: {} };
  const brasser = melangerPropositions ? melanger : (t) => t.slice();

  if (question.type === "qcm" || question.type === "situation") {
    rq.options = brasser(question.options.map((texte, i) => ({ texte, correcte: i === question.reponse })));
  } else if (question.type === "qcm_multiple") {
    rq.options = brasser(question.options.map((texte, i) => ({ texte, correcte: question.reponses.includes(i) })));
    rq.saisie = [];
  } else if (question.type === "vf") {
    rq.saisie = null;
  } else if (question.type === "ordre") {
    // saisie = ordre courant, sous forme d'indices dans question.elements
    rq.saisie = melangerVraiment(question.elements.map((_, i) => i));
  } else if (question.type === "association") {
    rq.choixDroites = melanger(question.paires.map((p) => p.droite));
    rq.saisie = question.paires.map(() => null);
  } else if (question.type === "trous") {
    rq.segments = question.texte.split(/\{\{\d+\}\}/);
    rq.trous = question.trous.map((trou) => ({
      options: brasser(trou.options.map((texte, i) => ({ texte, correcte: i === trou.reponse })))
    }));
    rq.saisie = question.trous.map(() => null);
  }
  return rq;
}

/** Une réponse a-t-elle été saisie ? (sert à activer le bouton Valider) */
function reponseSaisie(rq) {
  switch (rq.type) {
    case "qcm": case "situation": return typeof rq.saisie === "number";
    case "qcm_multiple": return Array.isArray(rq.saisie) && rq.saisie.length > 0;
    case "vf": return typeof rq.saisie === "boolean";
    case "ordre": return true; // un ordre est toujours proposé
    case "association": return rq.saisie.every((v) => v !== null);
    case "trous": return rq.saisie.every((v) => v !== null);
    default: return false;
  }
}

/** La réponse est-elle juste ? */
function evaluer(rq) {
  switch (rq.type) {
    case "qcm":
    case "situation":
      return typeof rq.saisie === "number" && rq.options[rq.saisie].correcte;
    case "qcm_multiple": {
      const attendus = rq.options.reduce((liste, o, i) => (o.correcte ? liste.concat(i) : liste), []);
      const donnes = (rq.saisie || []).slice().sort();
      return donnes.length === attendus.length && attendus.slice().sort().every((v, i) => v === donnes[i]);
    }
    case "vf":
      return rq.saisie === rq.q.reponse;
    case "ordre":
      return rq.saisie.every((valeur, position) => valeur === position);
    case "association":
      return rq.q.paires.every((paire, i) =>
        rq.saisie[i] !== null && rq.choixDroites[rq.saisie[i]] === paire.droite);
    case "trous":
      return rq.trous.every((trou, i) => rq.saisie[i] !== null && trou.options[rq.saisie[i]].correcte);
    default:
      return false;
  }
}

/** Texte lisible de la réponse donnée (utilisé dans le récapitulatif d'examen). */
function reponseLisible(rq) {
  switch (rq.type) {
    case "qcm": case "situation":
      return typeof rq.saisie === "number" ? rq.options[rq.saisie].texte : "aucune réponse";
    case "qcm_multiple":
      return (rq.saisie && rq.saisie.length)
        ? rq.saisie.map((i) => rq.options[i].texte).join(" ; ") : "aucune réponse";
    case "vf":
      return typeof rq.saisie === "boolean" ? (rq.saisie ? "Vrai" : "Faux") : "aucune réponse";
    case "ordre":
      return rq.saisie.map((i, position) => (position + 1) + ". " + rq.q.elements[i]).join(" | ");
    case "association":
      return rq.q.paires.map((p, i) =>
        p.gauche + " → " + (rq.saisie[i] === null ? "?" : rq.choixDroites[rq.saisie[i]])).join(" ; ");
    case "trous":
      return rq.trous.map((t, i) => (rq.saisie[i] === null ? "?" : t.options[rq.saisie[i]].texte)).join(" ; ");
    default:
      return "";
  }
}

/** Texte lisible de la bonne réponse. */
function bonneReponseLisible(rq) {
  switch (rq.type) {
    case "qcm": case "situation":
      return rq.options.filter((o) => o.correcte).map((o) => o.texte).join(" ; ");
    case "qcm_multiple":
      return rq.options.filter((o) => o.correcte).map((o) => o.texte).join(" ; ");
    case "vf":
      return rq.q.reponse ? "Vrai" : "Faux";
    case "ordre":
      return rq.q.elements.map((e, i) => (i + 1) + ". " + e).join(" | ");
    case "association":
      return rq.q.paires.map((p) => p.gauche + " → " + p.droite).join(" ; ");
    case "trous":
      return rq.q.trous.map((t) => t.options[t.reponse]).join(" ; ");
    default:
      return "";
  }
}

/* -------------------------- RENDU D'UNE QUESTION ------------------------- */

/**
 * Construit le bloc complet d'une question.
 * @param {object} rq        question préparée
 * @param {function} auChangement  appelé à chaque modification de la réponse
 */
function rendreQuestion(rq, auChangement) {
  const bloc = h("div", { class: "carte anime-entree" });
  const q = rq.q;

  // Étiquette du type
  const multiple = rq.type === "qcm_multiple";
  bloc.appendChild(h("span", { class: "etiquette" + (multiple ? " etiquette--multi" : "") },
    LIBELLE_TYPE[rq.type] || rq.type));

  // Scénario éventuel (mises en situation)
  if (q.scenario) bloc.appendChild(h("p", { class: "scenario" }, q.scenario));

  bloc.appendChild(h("h2", { class: "question__enonce" }, q.enonce));

  const consigne = consignePourType(rq);
  if (consigne) bloc.appendChild(h("p", { class: "question__consigne" }, consigne));

  // Zone de réponse selon le type
  const zone = h("div", { class: "zone-reponse" });
  switch (rq.type) {
    case "qcm": case "situation": zone.appendChild(rendreQcmSimple(rq, auChangement)); break;
    case "qcm_multiple":          zone.appendChild(rendreQcmMultiple(rq, auChangement)); break;
    case "vf":                    zone.appendChild(rendreVraiFaux(rq, auChangement)); break;
    case "ordre":                 zone.appendChild(rendreOrdre(rq, auChangement)); break;
    case "association":           zone.appendChild(rendreAssociation(rq, auChangement)); break;
    case "trous":                 zone.appendChild(rendreTrous(rq, auChangement)); break;
  }
  bloc.appendChild(zone);
  rq.dom.bloc = bloc;
  return bloc;
}

/** Petite consigne explicative affichée sous l'énoncé. */
function consignePourType(rq) {
  switch (rq.type) {
    case "qcm_multiple": return "Plusieurs réponses possibles : sélectionne toutes les bonnes propositions.";
    case "vf": return "Une seule réponse : Vrai ou Faux.";
    case "ordre": return "Glisse les éléments, ou utilise les flèches ↑ et ↓ pour les déplacer.";
    case "association": return "Pour chaque élément de gauche, choisis la proposition qui lui correspond.";
    case "trous": return "Complète chaque trou en choisissant dans la liste déroulante.";
    case "situation": return "Lis bien le scénario avant de répondre.";
    default: return "";
  }
}

/** Puce d'une option : la lettre A, B, C… (choix unique). */
function puceOption(indice) {
  return h("span", { class: "option__puce", "aria-hidden": "true" }, String.fromCharCode(65 + indice));
}

/** Puce d'une case à cocher : une coche, rendue visible par la classe CSS. */
function puceCase() {
  return h("span", { class: "option__puce", "aria-hidden": "true" }, icone("check", 15));
}

/* --- QCM à une seule bonne réponse (et mise en situation) --- */
function rendreQcmSimple(rq, auChangement) {
  const liste = h("div", { class: "options", role: "radiogroup", "aria-label": "Propositions" });
  rq.dom.boutons = [];
  rq.options.forEach((option, indice) => {
    const bouton = h("button", {
      class: "option", type: "button", role: "radio", "aria-checked": "false",
      onclick: () => {
        rq.saisie = indice;
        rq.dom.boutons.forEach((b, i) => {
          b.classList.toggle("selectionnee", i === indice);
          b.setAttribute("aria-checked", i === indice ? "true" : "false");
        });
        auChangement();
      }
    }, puceOption(indice), h("span", {}, option.texte));
    if (rq.saisie === indice) { bouton.classList.add("selectionnee"); bouton.setAttribute("aria-checked", "true"); }
    rq.dom.boutons.push(bouton);
    liste.appendChild(bouton);
  });
  return liste;
}

/* --- QCM à plusieurs bonnes réponses --- */
function rendreQcmMultiple(rq, auChangement) {
  const liste = h("div", { class: "options", role: "group", "aria-label": "Propositions, plusieurs réponses possibles" });
  rq.dom.boutons = [];
  rq.options.forEach((option, indice) => {
    const bouton = h("button", {
      class: "option option--case", type: "button", role: "checkbox", "aria-checked": "false",
      onclick: () => {
        const dedans = rq.saisie.includes(indice);
        rq.saisie = dedans ? rq.saisie.filter((i) => i !== indice) : rq.saisie.concat(indice);
        const actif = !dedans;
        bouton.classList.toggle("selectionnee", actif);
        bouton.setAttribute("aria-checked", actif ? "true" : "false");
        auChangement();
      }
    }, puceCase(), h("span", {}, option.texte));
    if (rq.saisie.includes(indice)) {
      bouton.classList.add("selectionnee");
      bouton.setAttribute("aria-checked", "true");
    }
    rq.dom.boutons.push(bouton);
    liste.appendChild(bouton);
  });
  return liste;
}

/* --- Vrai / Faux --- */
function rendreVraiFaux(rq, auChangement) {
  const liste = h("div", { class: "vrai-faux", role: "radiogroup", "aria-label": "Vrai ou Faux" });
  rq.dom.boutons = [];
  [["Vrai", true], ["Faux", false]].forEach(([libelle, valeur]) => {
    const bouton = h("button", {
      class: "option", type: "button", role: "radio", "aria-checked": "false",
      onclick: () => {
        rq.saisie = valeur;
        rq.dom.boutons.forEach((b) => {
          const actif = b.dataset.valeur === String(valeur);
          b.classList.toggle("selectionnee", actif);
          b.setAttribute("aria-checked", actif ? "true" : "false");
        });
        auChangement();
      },
      dataset: { valeur: String(valeur) }
    }, libelle);
    if (rq.saisie === valeur) { bouton.classList.add("selectionnee"); bouton.setAttribute("aria-checked", "true"); }
    rq.dom.boutons.push(bouton);
    liste.appendChild(bouton);
  });
  return liste;
}

/* --- Remettre dans l'ordre : glisser-déposer + flèches ↑ ↓ --- */
function rendreOrdre(rq, auChangement) {
  const liste = h("ul", { class: "ordre" });
  rq.dom.liste = liste;
  let indiceTire = null;

  function deplacer(de, vers) {
    if (vers < 0 || vers >= rq.saisie.length) return;
    const copie = rq.saisie.slice();
    const [element] = copie.splice(de, 1);
    copie.splice(vers, 0, element);
    rq.saisie = copie;
    dessiner();
    auChangement();
    // On garde le focus sur la flèche utilisée pour permettre les appuis répétés.
    const items = liste.querySelectorAll(".ordre__item");
    const cible = items[vers];
    if (cible) {
      const fleche = cible.querySelector(vers < de ? ".ordre__fleche--haut" : ".ordre__fleche--bas");
      if (fleche) fleche.focus();
    }
  }

  function dessiner() {
    vider(liste);
    rq.saisie.forEach((indiceElement, position) => {
      const item = h("li", {
        class: "ordre__item",
        draggable: rq.corrige ? "false" : "true",
        dataset: { position: String(position) },
        ondragstart: (ev) => {
          if (rq.corrige) return;
          indiceTire = position;
          item.classList.add("deplace");
          if (ev.dataTransfer) { ev.dataTransfer.effectAllowed = "move"; ev.dataTransfer.setData("text/plain", String(position)); }
        },
        ondragend: () => { item.classList.remove("deplace"); indiceTire = null; },
        ondragover: (ev) => { if (!rq.corrige) { ev.preventDefault(); item.classList.add("survol"); } },
        ondragleave: () => item.classList.remove("survol"),
        ondrop: (ev) => {
          ev.preventDefault();
          item.classList.remove("survol");
          const depart = indiceTire !== null ? indiceTire
            : parseInt(ev.dataTransfer ? ev.dataTransfer.getData("text/plain") : "-1", 10);
          if (!isNaN(depart) && depart >= 0 && depart !== position) deplacer(depart, position);
        }
      },
        h("span", { class: "ordre__poignee" }, icone("grip", 16)),
        h("span", { class: "ordre__rang" }, String(position + 1)),
        h("span", { class: "ordre__texte" }, rq.q.elements[indiceElement]),
        !rq.corrige && h("span", { class: "ordre__fleches" },
          h("button", {
            class: "ordre__fleche ordre__fleche--haut", type: "button",
            "aria-label": "Monter : " + rq.q.elements[indiceElement],
            disabled: position === 0,
            onclick: () => deplacer(position, position - 1)
          }, icone("chevron-up", 15)),
          h("button", {
            class: "ordre__fleche ordre__fleche--bas", type: "button",
            "aria-label": "Descendre : " + rq.q.elements[indiceElement],
            disabled: position === rq.saisie.length - 1,
            onclick: () => deplacer(position, position + 1)
          }, icone("chevron-down", 15))
        )
      );
      if (rq.corrige) {
        item.classList.add(indiceElement === position ? "juste" : "fausse");
      }
      liste.appendChild(item);
    });
  }

  rq.dom.dessinerOrdre = dessiner;
  dessiner();
  return liste;
}

/* --- Association : une liste déroulante par élément de gauche --- */
function rendreAssociation(rq, auChangement) {
  const bloc = h("div", { class: "assoc" });
  rq.dom.lignes = [];
  rq.q.paires.forEach((paire, indexLigne) => {
    const identifiant = rq.q.id + "-assoc-" + indexLigne;
    const menu = h("select", {
      id: identifiant,
      onchange: (ev) => {
        const valeur = ev.target.value;
        rq.saisie[indexLigne] = valeur === "" ? null : Number(valeur);
        auChangement();
      }
    },
      h("option", { value: "" }, "— choisir —"),
      rq.choixDroites.map((texte, i) =>
        h("option", { value: String(i), selected: rq.saisie[indexLigne] === i }, texte))
    );
    const ligne = h("div", { class: "assoc__ligne" },
      h("label", { class: "assoc__gauche", for: identifiant }, paire.gauche),
      menu
    );
    rq.dom.lignes.push({ ligne, menu });
    bloc.appendChild(ligne);
  });
  return bloc;
}

/* --- Texte à trous avec listes déroulantes --- */
function rendreTrous(rq, auChangement) {
  const bloc = h("p", { class: "trous" });
  rq.dom.menus = [];
  rq.segments.forEach((segment, i) => {
    if (segment) bloc.appendChild(document.createTextNode(segment));
    if (i < rq.trous.length) {
      const menu = h("select", {
        "aria-label": "Trou numéro " + (i + 1),
        onchange: (ev) => {
          const valeur = ev.target.value;
          rq.saisie[i] = valeur === "" ? null : Number(valeur);
          auChangement();
        }
      },
        h("option", { value: "" }, "— choisir —"),
        rq.trous[i].options.map((option, j) =>
          h("option", { value: String(j), selected: rq.saisie[i] === j }, option.texte))
      );
      rq.dom.menus.push(menu);
      bloc.appendChild(menu);
    }
  });
  return bloc;
}

/* ---------------------- AFFICHAGE DE LA CORRECTION ---------------------- */

/**
 * Marque visuellement la correction sur la question et retourne le bloc
 * d'explication (« pourquoi »).
 */
function afficherCorrection(rq) {
  rq.corrige = true;
  const juste = evaluer(rq);

  // Marquage des propositions selon le type
  if (rq.type === "qcm" || rq.type === "situation" || rq.type === "qcm_multiple") {
    rq.dom.boutons.forEach((bouton, i) => {
      bouton.disabled = true;
      const estBonne = rq.options[i].correcte;
      const choisie = rq.type === "qcm_multiple" ? rq.saisie.includes(i) : rq.saisie === i;
      if (estBonne) bouton.classList.add("juste");
      else if (choisie) bouton.classList.add("fausse");
      bouton.classList.remove("selectionnee");
    });
  } else if (rq.type === "vf") {
    rq.dom.boutons.forEach((bouton) => {
      bouton.disabled = true;
      const valeur = bouton.dataset.valeur === "true";
      if (valeur === rq.q.reponse) bouton.classList.add("juste");
      else if (rq.saisie === valeur) bouton.classList.add("fausse");
      bouton.classList.remove("selectionnee");
    });
  } else if (rq.type === "ordre") {
    if (rq.dom.dessinerOrdre) rq.dom.dessinerOrdre();
    if (!juste) {
      rq.dom.liste.parentNode.appendChild(h("p", { class: "ordre__attendu" },
        "Ordre attendu : " + rq.q.elements.map((e, i) => (i + 1) + ") " + e).join("  ")));
    }
  } else if (rq.type === "association") {
    rq.dom.lignes.forEach((ref, i) => {
      ref.menu.disabled = true;
      const bonne = rq.saisie[i] !== null && rq.choixDroites[rq.saisie[i]] === rq.q.paires[i].droite;
      ref.ligne.classList.add(bonne ? "juste" : "fausse");
      ref.menu.classList.add(bonne ? "juste" : "fausse");
      if (!bonne) ref.ligne.appendChild(h("span", { class: "assoc__correction" }, "→ " + rq.q.paires[i].droite));
    });
  } else if (rq.type === "trous") {
    rq.dom.menus.forEach((menu, i) => {
      menu.disabled = true;
      const bonne = rq.saisie[i] !== null && rq.trous[i].options[rq.saisie[i]].correcte;
      menu.classList.add(bonne ? "juste" : "fausse");
      if (!bonne) {
        menu.parentNode.insertBefore(
          h("strong", { style: "color:var(--vert)" }, " (" + rq.q.trous[i].options[rq.q.trous[i].reponse] + ") "),
          menu.nextSibling
        );
      }
    });
  }

  // Animation discrète sur la carte de la question
  rq.dom.bloc.classList.add(juste ? "anime-juste" : "anime-fausse");

  // Bloc d'explication
  const bloc = h("div", {
    class: "correction " + (juste ? "correction--juste" : "correction--fausse"),
    role: "alert"
  },
    h("div", { class: "correction__titre" },
      icone(juste ? "check-circle" : "x-circle", 20),
      juste ? "Bonne réponse !" : "Réponse incorrecte"),
    !juste && h("p", { style: "margin:0 0 .5em" },
      h("strong", {}, "Bonne réponse : "), bonneReponseLisible(rq)),
    h("p", { class: "correction__pourquoi" }, h("strong", {}, "Pourquoi : "), rq.q.explication)
  );
  rq.dom.bloc.appendChild(bloc);
  annoncer(juste ? "Bonne réponse." : "Réponse incorrecte. " + rq.q.explication);
  return juste;
}


/* ==========================================================================
   10. VUE ENTRAÎNEMENT (correction immédiate, pas de chrono)
   ========================================================================== */

function vueEntrainement(idChapitre) {
  const cible = conteneur();
  if (idChapitre) {
    const chapitre = chapitreParId(idChapitre);
    if (chapitre) {
      demarrerQuiz({
        mode: "entrainement",
        titre: chapitre.titre,
        questions: melanger(questionsDuChapitre(idChapitre)),
        correctionImmediate: true,
        retour: () => naviguer("entrainement")
      });
      return;
    }
  }
  const nbErreurs = etat.progression.ratees.length;
  ajouterEnfants(cible, [
    h("h1", {}, icone("target", 24), "Entraînement"),
    h("p", { class: "texte-doux" },
      "Correction et explication après chaque réponse, sans limite de temps."),
    h("div", { class: "tuiles" },
      tuile("shuffle", "Tous les chapitres mélangés",
        QUESTIONS.length + " questions dans un ordre aléatoire",
        () => demarrerQuiz({
          mode: "entrainement",
          titre: "Toutes les questions mélangées",
          questions: melanger(QUESTIONS),
          correctionImmediate: true,
          retour: () => naviguer("entrainement")
        }), "principale"),
      nbErreurs > 0 && tuile("rotate", "Mes erreurs",
        nbErreurs + " question(s) à reprendre", () => naviguer("erreurs")),
      tuile("calendar", "Révision du jour",
        nombreDuJour(etat.progression, QUESTIONS) + " question(s) dues", () => naviguer("revision"))
    ),
    h("h2", { class: "titre-section" }, "Par chapitre"),
    h("div", { class: "liste-chapitres" },
      CHAPITRES.map((c) => carteChapitre(c, { action: () => naviguer("entrainement", { chapitre: c.id }) })))
  ]);
}

/* ==========================================================================
   11. DÉROULEMENT D'UN QUIZ
   ========================================================================== */

/**
 * Démarre une session de questions.
 * @param {object} config
 *   mode                "entrainement" | "examen" | "erreurs" | "revision"
 *   titre               titre affiché en haut
 *   questions           tableau de questions issues de data.js
 *   correctionImmediate true = correction après chaque réponse
 *   chronoMinutes       durée du chronomètre (examen uniquement)
 *   seuilPourcent       seuil de réussite affiché à la fin (examen)
 *   retour              fonction appelée par le bouton « Quitter »
 */
function demarrerQuiz(config) {
  arreterQuiz();
  etat.paquet = null;
  etat.quiz = {
    mode: config.mode,
    titre: config.titre,
    correctionImmediate: config.correctionImmediate,
    seuilPourcent: config.seuilPourcent || CONFIG.seuilReussitePourcent,
    retour: config.retour || (() => naviguer("accueil")),
    liste: config.questions.map((q) => preparerQuestion(q, true)),
    index: 0,
    bonnes: 0,
    repondues: 0,
    combo: 0,
    meilleurCombo: 0,
    timerId: null,
    secondesRestantes: config.chronoMinutes ? config.chronoMinutes * 60 : null
  };
  if (etat.quiz.secondesRestantes !== null) lancerChrono();
  afficherQuestionCourante();
}

/** Chronomètre de l'examen blanc : décompte et fin automatique. */
function lancerChrono() {
  const quiz = etat.quiz;
  quiz.timerId = window.setInterval(() => {
    quiz.secondesRestantes -= 1;
    const affichage = document.getElementById("chrono-valeur");
    if (affichage) {
      affichage.textContent = formaterDuree(quiz.secondesRestantes);
      if (affichage.parentNode) {
        affichage.parentNode.classList.toggle("chrono--urgence", quiz.secondesRestantes <= 120);
      }
    }
    if (quiz.secondesRestantes <= 0) {
      arreterQuiz();
      annoncer("Temps écoulé, l'examen est terminé.");
      terminerExamen(true);
    }
  }, 1000);
}

/** Dessine la question courante du quiz. */
function afficherQuestionCourante() {
  const quiz = etat.quiz;
  if (!quiz) return;
  nettoyerVue();
  const rq = quiz.liste[quiz.index];
  const cible = vider(conteneur());

  /* --- Bandeau : compteur, chrono ou score, combo --- */
  cible.appendChild(h("div", { class: "quiz__barre" },
    h("div", {},
      h("span", { class: "quiz__compteur" }, "Question " + (quiz.index + 1) + " / " + quiz.liste.length),
      h("span", { class: "texte-doux" }, " — " + quiz.titre)),
    h("div", { class: "quiz__indicateurs" },
      quiz.combo >= 3 && h("span", { class: "combo" }, icone("zap", 15), h("strong", {}, "×" + quiz.combo)),
      quiz.secondesRestantes !== null
        ? h("span", { class: "chrono" }, icone("clock", 17),
            h("span", { id: "chrono-valeur" }, formaterDuree(quiz.secondesRestantes)))
        : h("span", { class: "texte-doux" }, "Score : " + quiz.bonnes + " / " + quiz.repondues))
  ));
  cible.appendChild(barreProgression((quiz.index / quiz.liste.length) * 100, "Avancement de la série"));

  /* --- La question --- */
  const actions = h("div", { class: "barre-collante" });
  const boutonValider = h("button", {
    class: "btn btn--principal btn--large", type: "button", disabled: true,
    onclick: () => validerReponse()
  }, "Valider ma réponse");
  const auChangement = () => { if (!rq.corrige) boutonValider.disabled = !reponseSaisie(rq); };

  cible.appendChild(rendreQuestion(rq, auChangement));
  cible.appendChild(actions);
  auChangement();

  if (quiz.correctionImmediate) {
    actions.appendChild(boutonValider);
  } else {
    /* Mode examen : navigation libre, pas de correction */
    const nav = h("div", { class: "barre-actions", style: "margin-top:0" });
    if (quiz.index > 0) {
      nav.appendChild(h("button", { class: "btn", type: "button",
        onclick: () => { quiz.index -= 1; afficherQuestionCourante(); } },
        icone("arrow-left", 18), "Précédent"));
    }
    if (quiz.index < quiz.liste.length - 1) {
      nav.appendChild(h("button", { class: "btn btn--principal", type: "button",
        onclick: () => { quiz.index += 1; afficherQuestionCourante(); } },
        "Suivant", icone("arrow-right", 18)));
    }
    nav.appendChild(h("button", {
      class: "btn" + (quiz.index === quiz.liste.length - 1 ? " btn--principal" : " btn--discret"),
      type: "button", onclick: () => terminerExamen(false)
    }, "Terminer l'examen"));
    actions.appendChild(nav);
  }

  cible.appendChild(h("div", { class: "barre-actions" },
    h("button", { class: "btn btn--discret btn--petit", type: "button", onclick: () => quiz.retour() },
      "Quitter"),
    !quiz.correctionImmediate && h("p", { class: "texte-doux", style: "flex:1 1 100%;font-size:.86rem;margin:4px 0 0" },
      "La correction n'apparaîtra qu'à la fin. Tu peux revenir sur tes réponses, ou balayer l'écran pour changer de question.")
  ));

  /* --- Balayage : en examen on change de question, en entraînement on passe
         à la suivante une fois la correction affichée. --- */
  aNettoyer(installerSwipe(conteneur(), {
    actif: () => !quiz.correctionImmediate || rq.corrige,
    surGauche: () => {
      if (rq.corrige) { passerALaSuite(); return; }
      if (!quiz.correctionImmediate && quiz.index < quiz.liste.length - 1) {
        quiz.index += 1; afficherQuestionCourante();
      }
    },
    surDroite: () => {
      if (!quiz.correctionImmediate && quiz.index > 0) { quiz.index -= 1; afficherQuestionCourante(); }
    },
    seuil: 90
  }));

  rq.dom.actions = actions;
  rq.dom.boutonValider = boutonValider;
  window.scrollTo({ top: 0, behavior: "auto" });
}

/** Valide la réponse en mode correction immédiate. */
function validerReponse() {
  const quiz = etat.quiz;
  const rq = quiz.liste[quiz.index];
  if (rq.corrige || !reponseSaisie(rq)) return;

  const juste = afficherCorrection(rq);
  quiz.repondues += 1;
  if (juste) {
    quiz.bonnes += 1;
    quiz.combo += 1;
    quiz.meilleurCombo = Math.max(quiz.meilleurCombo, quiz.combo);
    vibrer(12);
  } else {
    quiz.combo = 0;
    vibrer([12, 50, 12]);
  }

  const resultat = enregistrerResultat(rq.q, juste, { combo: quiz.combo });
  if (juste && resultat.xp > 0) afficherGainXp(rq.dom.bloc, resultat.xp);
  notifierRecompenses(resultat, quiz.combo);

  /* Le bouton « Valider » devient « Question suivante » */
  vider(rq.dom.actions);
  const dernier = quiz.index === quiz.liste.length - 1;
  const suivant = h("button", { class: "btn btn--principal btn--large", type: "button", onclick: passerALaSuite },
    dernier ? "Voir mon résultat" : [h("span", {}, "Question suivante"), icone("arrow-right", 18)]);
  rq.dom.actions.appendChild(suivant);
  suivant.focus();
}

/** Passe à la question suivante, ou termine la série. */
function passerALaSuite() {
  const quiz = etat.quiz;
  if (!quiz) return;
  if (quiz.index >= quiz.liste.length - 1) { afficherFinSerie(); return; }
  quiz.index += 1;
  afficherQuestionCourante();
}

/** Petite étiquette « +10 XP » qui monte et disparaît. */
function afficherGainXp(bloc, gain) {
  if (!bloc) return;
  const etiquette = h("span", { class: "gain-xp" }, "+" + gain + " XP");
  bloc.appendChild(etiquette);
  window.setTimeout(() => { if (etiquette.parentNode) etiquette.parentNode.removeChild(etiquette); }, 1400);
}

/** Écran de fin pour l'entraînement, les erreurs et la révision du jour. */
function afficherFinSerie() {
  const quiz = etat.quiz;
  const cible = vider(conteneur());
  nettoyerVue();
  const pourcent = quiz.repondues ? Math.round((quiz.bonnes / quiz.repondues) * 100) : 0;
  const reussi = pourcent >= CONFIG.seuilReussitePourcent;

  ajouterEnfants(cible, [
    h("h1", {}, "Série terminée"),
    h("div", { class: "note " + (reussi ? "note--reussi" : "note--echec") },
      h("div", { class: "note__valeur" }, quiz.bonnes, h("span", {}, " / " + quiz.repondues)),
      h("div", { class: "note__mention" }, pourcent + " % de bonnes réponses"),
      h("p", { class: "texte-doux", style: "margin:8px 0 0" },
        reussi
          ? "Au-dessus du seuil officiel de " + CONFIG.seuilReussitePourcent + " %. Continue comme ça."
          : "En dessous du seuil officiel de " + CONFIG.seuilReussitePourcent + " %. Relis la fiche, puis reprends la série.")
    ),
    h("div", { class: "stats" },
      h("div", { class: "stat" },
        h("span", { class: "stat__valeur" }, String(quiz.meilleurCombo)),
        h("span", { class: "stat__label" }, "Meilleure série d'affilée")),
      h("div", { class: "stat" },
        h("span", { class: "stat__valeur" }, String(etat.progression.ratees.length)),
        h("span", { class: "stat__label" }, "Erreurs à revoir")),
      h("div", { class: "stat" },
        h("span", { class: "stat__valeur" }, "Niv. " + niveauPourXp(etat.progression.xp)),
        h("span", { class: "stat__label" }, titreNiveau(niveauPourXp(etat.progression.xp))))
    ),
    h("div", { class: "barre-actions" },
      h("button", { class: "btn btn--principal", type: "button", onclick: () => quiz.retour() }, "Continuer"),
      etat.progression.ratees.length > 0 && h("button", { class: "btn", type: "button", onclick: () => naviguer("erreurs") },
        icone("rotate", 18), "Revoir mes erreurs"),
      h("button", { class: "btn btn--discret", type: "button", onclick: () => naviguer("accueil") },
        icone("home", 18), "Accueil"))
  ]);
  arreterQuiz();
  window.scrollTo({ top: 0, behavior: "auto" });
}

/* ==========================================================================
   12. VUE EXAMEN BLANC
   --------------------------------------------------------------------------
   Deux formules. L'examen OFFICIEL reproduit les règles de la brochure
   INRS ED 6127 : au moins 15 questions, tirage aléatoire, 70 % de bonnes
   réponses exigées, et deux thèmes pesant chacun au moins 30 % du total
   (distances et zones d'environnement ; limites des opérations du symbole).
   ========================================================================== */

/**
 * Tire au sort un sujet d'examen en respectant les quotas de thèmes.
 * @param {number} nombre  nombre total de questions souhaité
 * @returns {Array} les questions tirées, dans un ordre mélangé
 */
function tirerSujetExamen(nombre) {
  const parTheme = {};
  Object.keys(THEMES).forEach((cle) => { parTheme[cle] = []; });
  QUESTIONS.forEach((q) => { parTheme[themeDuChapitre(q.chapitre)].push(q); });

  const choisies = [];
  const dejaPrises = new Set();

  // 1. On honore d'abord les quotas minimaux imposés par la norme.
  Object.entries(THEMES).forEach(([cle, theme]) => {
    if (!theme.partMini) return;
    const quota = Math.ceil(nombre * theme.partMini);
    melanger(parTheme[cle]).slice(0, quota).forEach((q) => {
      if (!dejaPrises.has(q.id)) { choisies.push(q); dejaPrises.add(q.id); }
    });
  });

  // 2. On garantit au moins une question pour chacun des autres thèmes.
  Object.entries(THEMES).forEach(([cle, theme]) => {
    if (theme.partMini || !parTheme[cle].length) return;
    const q = melanger(parTheme[cle])[0];
    if (q && !dejaPrises.has(q.id)) { choisies.push(q); dejaPrises.add(q.id); }
  });

  // 3. On complète au hasard dans tout le programme.
  melanger(QUESTIONS).forEach((q) => {
    if (choisies.length >= nombre) return;
    if (!dejaPrises.has(q.id)) { choisies.push(q); dejaPrises.add(q.id); }
  });

  return melanger(choisies.slice(0, nombre));
}

/** Répartition par thème d'une liste de questions, pour affichage. */
function repartitionThemes(questions) {
  const compte = {};
  questions.forEach((q) => {
    const cle = themeDuChapitre(q.chapitre);
    compte[cle] = (compte[cle] || 0) + 1;
  });
  return compte;
}

/** Écran de présentation avant le lancement de l'examen. */
function vueExamenAccueil() {
  const cible = conteneur();
  const p = etat.progression;
  const meilleur = p.meilleurExamen;
  const nbOfficiel = Math.min(CONFIG.nbQuestionsExamenOfficiel, QUESTIONS.length);
  const nbLong = Math.min(CONFIG.nbQuestionsExamen, QUESTIONS.length);

  ajouterEnfants(cible, [
    h("h1", {}, icone("clipboard", 24), "Examen blanc"),

    h("div", { class: "tuiles" },
      tuile("clipboard", "Examen officiel",
        nbOfficiel + " questions · " + CONFIG.dureeExamenOfficielMinutes + " min · seuil " + CONFIG.seuilReussitePourcent + " %",
        () => demarrerQuiz({
          mode: "examen",
          titre: "Examen officiel",
          questions: tirerSujetExamen(nbOfficiel),
          correctionImmediate: false,
          chronoMinutes: CONFIG.dureeExamenOfficielMinutes,
          seuilPourcent: CONFIG.seuilReussitePourcent,
          retour: () => naviguer("examen")
        }), "principale"),
      tuile("shuffle", "Examen long",
        nbLong + " questions · " + CONFIG.dureeExamenMinutes + " min · tirage libre",
        () => demarrerQuiz({
          mode: "examen",
          titre: "Examen long",
          questions: melanger(QUESTIONS).slice(0, nbLong),
          correctionImmediate: false,
          chronoMinutes: CONFIG.dureeExamenMinutes,
          seuilPourcent: CONFIG.seuilReussitePourcent,
          retour: () => naviguer("examen")
        }))
    ),

    h("div", { class: "carte" },
      h("h3", {}, "Les règles reprises de l'évaluation réelle"),
      h("ul", {},
        h("li", {}, "Au moins 15 questions : l'examen officiel de cette application en pose " + nbOfficiel + "."),
        h("li", {}, h("strong", {}, CONFIG.seuilReussitePourcent + " % de bonnes réponses"), " exigées pour valider."),
        h("li", {}, "Tirage aléatoire dans une base de " + QUESTIONS.length + " questions, propositions mélangées."),
        h("li", {}, "Quotas de thèmes respectés : au moins 30 % sur « distances et zones d'environnement », au moins 30 % sur « limites des opérations »."),
        h("li", {}, "Aucune correction pendant l'épreuve ; tu peux revenir sur tes réponses."),
        h("li", {}, "À la fin : pourcentage, note sur 20, résultat par thème et liste des erreurs.")),
      h("p", { class: "texte-doux", style: "margin-bottom:0" },
        "Règles issues de la brochure INRS ED 6127, qui accompagne la norme NF C18-510. " +
        "La fiche 10 détaille le déroulement complet, partie pratique incluse.")
    ),

    meilleur && h("div", { class: "carte" },
      h("h3", {}, "Mes résultats"),
      h("p", {}, h("strong", {}, "Meilleur résultat : "),
        meilleur.pourcent + " % — " + meilleur.note + "/20 (" + meilleur.score + " / " + meilleur.total + ") le " + meilleur.date),
      (p.examens || []).length > 1 && h("div", { class: "historique" },
        (p.examens || []).slice(-10).map((e) =>
          h("span", {
            class: "historique__barre" + (e.pourcent >= CONFIG.seuilReussitePourcent ? " historique__barre--reussi" : ""),
            title: e.date + " : " + e.pourcent + " %",
            style: "height:" + Math.max(8, Math.round(e.pourcent * 0.6)) + "px"
          }))
      )
    ),

    h("div", { class: "barre-actions" },
      h("button", { class: "btn btn--discret", type: "button", onclick: () => naviguer("fiches", { chapitre: "ch10" }) },
        icone("book", 18), "Lire la fiche « Comment se passe l'évaluation »"))
  ]);
}

/**
 * Termine l'examen : calcule le résultat, enregistre la progression,
 * affiche le récapitulatif complet.
 * @param {boolean} tempsEcoule  vrai si l'examen s'est arrêté sur le chrono
 */
function terminerExamen(tempsEcoule) {
  const quiz = etat.quiz;
  if (!quiz) return;
  arreterQuiz();
  nettoyerVue();

  const resultats = quiz.liste.map((rq) => {
    const juste = evaluer(rq);
    enregistrerResultat(rq.q, juste, {});
    return { rq: rq, juste: juste };
  });
  const score = resultats.filter((r) => r.juste).length;
  const total = resultats.length;
  const pourcent = Math.round((score / total) * 100);
  const note = Math.round((score / total) * 20 * 2) / 2;
  const reussi = pourcent >= quiz.seuilPourcent;

  /* --- Enregistrement --- */
  const p = etat.progression;
  p.examens = (p.examens || []).concat([{
    date: new Date().toLocaleDateString("fr-FR"), pourcent: pourcent, note: note, score: score, total: total
  }]).slice(-20);
  if (!p.meilleurExamen || pourcent > p.meilleurExamen.pourcent) {
    p.meilleurExamen = { pourcent: pourcent, note: note, score: score, total: total,
      date: new Date().toLocaleDateString("fr-FR") };
  }
  if (reussi) p.xp += XP.examenReussi;
  const nouveauxBadges = verifierBadges(p);
  sauverProgression();
  rafraichirIndicateursEntete();

  /* --- Résultat par thème --- */
  const parTheme = {};
  resultats.forEach(({ rq, juste }) => {
    const cle = themeDuChapitre(rq.q.chapitre);
    if (!parTheme[cle]) parTheme[cle] = { total: 0, bonnes: 0 };
    parTheme[cle].total += 1;
    if (juste) parTheme[cle].bonnes += 1;
  });

  const cible = vider(conteneur());
  const erreurs = resultats.filter((r) => !r.juste);

  ajouterEnfants(cible, [
    h("h1", {}, "Résultat — " + quiz.titre),
    tempsEcoule && h("p", { class: "encadre encadre--piege" },
      icone("alert", 18), " Le temps imparti est écoulé : les questions sans réponse sont comptées comme fausses."),

    h("div", { class: "note " + (reussi ? "note--reussi" : "note--echec") },
      h("div", { class: "note__valeur" }, pourcent, h("span", {}, " %")),
      h("div", { class: "note__mention" },
        score + " bonnes réponses sur " + total + " — soit " + String(note).replace(".", ",") + "/20"),
      h("p", { class: "texte-doux", style: "margin:8px 0 0" },
        reussi
          ? "Au-dessus du seuil officiel de " + quiz.seuilPourcent + " % : ce serait validé."
          : "En dessous du seuil officiel de " + quiz.seuilPourcent + " % : ce ne serait pas validé.")
    ),

    h("div", { class: "carte" },
      h("h3", {}, "Résultat par thème d'examen"),
      Object.entries(parTheme).map(([cle, valeurs]) => {
        const theme = THEMES[cle];
        const pc = Math.round((valeurs.bonnes / valeurs.total) * 100);
        return h("div", { class: "theme-ligne" },
          h("div", { class: "theme-ligne__haut" },
            h("span", {}, theme ? theme.libelle : cle),
            h("strong", { class: pc >= quiz.seuilPourcent ? "texte-vert" : "texte-rouge" },
              valeurs.bonnes + " / " + valeurs.total + " (" + pc + " %)")),
          barreProgression(pc, theme ? theme.libelle : cle));
      })
    ),

    h("h2", {}, icone(erreurs.length ? "x-circle" : "award", 22),
      erreurs.length ? " Les " + erreurs.length + " question(s) à revoir" : " Aucune erreur, félicitations !"),
    h("div", { class: "recap" }, erreurs.map(({ rq }) => ligneRecapitulatif(rq, false))),

    total - erreurs.length > 0 && h("details", { style: "margin-top:20px" },
      h("summary", { class: "details-titre" },
        "Voir aussi les " + (total - erreurs.length) + " bonne(s) réponse(s)"),
      h("div", { class: "recap" }, resultats.filter((r) => r.juste).map(({ rq }) => ligneRecapitulatif(rq, true)))),

    h("div", { class: "barre-actions" },
      h("button", { class: "btn btn--principal", type: "button", onclick: () => naviguer("examen") },
        icone("refresh", 18), "Refaire un examen"),
      erreurs.length > 0 && h("button", { class: "btn", type: "button", onclick: () => naviguer("erreurs") },
        icone("rotate", 18), "Revoir mes erreurs"),
      h("button", { class: "btn btn--discret", type: "button", onclick: () => naviguer("accueil") },
        icone("home", 18), "Accueil"))
  ]);

  etat.quiz = null;
  notifierRecompenses({ nouveauxBadges: nouveauxBadges, niveauAvant: 0, niveauApres: 0 }, 0);
  annoncer("Examen terminé. " + pourcent + " pour cent de bonnes réponses.");
  window.scrollTo({ top: 0, behavior: "auto" });
}

/** Une ligne du récapitulatif d'examen. */
function ligneRecapitulatif(rq, juste) {
  const chapitre = chapitreParId(rq.q.chapitre);
  return h("div", { class: "recap__item" + (juste ? " recap__item--juste" : "") },
    h("div", { class: "recap__meta" },
      chapitre ? [icone(chapitre.icone, 14), " " + chapitre.titre] : rq.q.chapitre,
      " — " + (LIBELLE_TYPE[rq.type] || rq.type)),
    rq.q.scenario && h("p", { class: "recap__scenario" }, rq.q.scenario),
    h("div", { class: "recap__enonce" }, rq.q.enonce),
    h("p", { class: "recap__reponse " + (juste ? "recap__reponse--juste" : "recap__reponse--fausse") },
      h("strong", {}, "Ta réponse : "), reponseLisible(rq)),
    !juste && h("p", { class: "recap__reponse recap__reponse--juste" },
      h("strong", {}, "Bonne réponse : "), bonneReponseLisible(rq)),
    h("p", { class: "recap__reponse", style: "margin-top:6px" },
      h("strong", {}, "Pourquoi : "), rq.q.explication),
    chapitre && h("button", {
      class: "btn btn--discret btn--petit", style: "margin-top:10px",
      type: "button", onclick: () => naviguer("fiches", { chapitre: chapitre.id })
    }, icone("book", 16), "Relire la fiche")
  );
}

/* ==========================================================================
   13. VUES MES ERREURS, RÉVISION DU JOUR, SUCCÈS
   ========================================================================== */

function vueErreurs() {
  const cible = conteneur();
  const questions = etat.progression.ratees.map(questionParId).filter(Boolean);

  if (questions.length === 0) {
    ajouterEnfants(cible, [
      h("h1", {}, icone("rotate", 24), "Mes erreurs"),
      h("div", { class: "vide" },
        h("span", { class: "vide__icone" }, icone("award", 46)),
        h("p", {}, h("strong", {}, "Aucune erreur à revoir pour le moment.")),
        h("p", {}, "Les questions ratées en entraînement, en cartes mémo ou en examen arrivent ici automatiquement, " +
          "et en sortent dès que tu y réponds correctement.")),
      h("div", { class: "barre-actions" },
        h("button", { class: "btn btn--principal", type: "button", onclick: () => naviguer("revision") },
          icone("calendar", 18), "Révision du jour"),
        h("button", { class: "btn", type: "button", onclick: () => naviguer("entrainement") },
          icone("target", 18), "Entraînement"))
    ]);
    return;
  }

  const parChapitre = {};
  questions.forEach((q) => { parChapitre[q.chapitre] = (parChapitre[q.chapitre] || 0) + 1; });

  ajouterEnfants(cible, [
    h("h1", {}, icone("rotate", 24), "Mes erreurs"),
    h("p", { class: "texte-doux" },
      questions.length + " question(s) à revoir. Une question réussie sort automatiquement de cette liste."),
    h("div", { class: "barre-actions" },
      h("button", {
        class: "btn btn--principal btn--large", type: "button",
        onclick: () => demarrerQuiz({
          mode: "erreurs", titre: "Mes erreurs", questions: melanger(questions),
          correctionImmediate: true, retour: () => naviguer("erreurs")
        })
      }, icone("play", 18), "Reprendre mes " + questions.length + " erreur(s)")),
    h("div", { class: "carte" },
      h("h3", {}, "Répartition par chapitre"),
      h("div", { class: "repartition" },
        Object.entries(parChapitre).sort((a, b) => b[1] - a[1]).map(([id, nb]) => {
          const chapitre = chapitreParId(id);
          return h("button", {
            class: "repartition__ligne", type: "button",
            onclick: () => naviguer("fiches", { chapitre: id })
          },
            h("span", { class: "repartition__nom" },
              chapitre ? [icone(chapitre.icone, 16), " " + chapitre.titre] : id),
            h("span", { class: "repartition__nb" }, nb + " erreur" + (nb > 1 ? "s" : "")),
            icone("chevron-right", 16));
        }))
    )
  ]);
}

/** Révision du jour : les questions dues d'après la révision espacée. */
function vueRevision() {
  const cible = conteneur();
  const p = etat.progression;
  const dues = nombreDuJour(p, QUESTIONS);
  const liste = questionsDuJour(p, QUESTIONS, CONFIG.taillePaquetRevision);

  if (!liste.length) {
    ajouterEnfants(cible, [
      h("h1", {}, icone("calendar", 24), "Révision du jour"),
      h("div", { class: "vide" },
        h("span", { class: "vide__icone" }, icone("check-circle", 46)),
        h("p", {}, h("strong", {}, "Tout est à jour. Rien à revoir aujourd'hui.")),
        h("p", {}, "Reviens demain : les questions réapparaîtront au bon moment pour que tu les retiennes durablement.")),
      h("div", { class: "barre-actions" },
        h("button", { class: "btn btn--principal", type: "button", onclick: () => naviguer("entrainement") },
          icone("target", 18), "Entraînement libre"))
    ]);
    return;
  }

  ajouterEnfants(cible, [
    h("h1", {}, icone("calendar", 24), "Révision du jour"),
    h("p", { class: "texte-doux" },
      dues > 0
        ? dues + " question(s) arrivent à échéance. La révision espacée les repropose juste avant que tu les oublies : c'est la façon la plus efficace de retenir."
        : "Aucune question en retard : voici de nouvelles questions que tu n'as pas encore vues."),
    h("div", { class: "barre-actions" },
      h("button", {
        class: "btn btn--principal btn--large", type: "button",
        onclick: () => demarrerQuiz({
          mode: "revision", titre: "Révision du jour", questions: liste,
          correctionImmediate: true, retour: () => naviguer("accueil")
        })
      }, icone("play", 18), "Commencer (" + liste.length + " questions)"),
      h("button", {
        class: "btn", type: "button",
        onclick: () => demarrerPaquet(liste, "Révision du jour")
      }, icone("layers", 18), "Plutôt en cartes mémo")),
    h("div", { class: "carte" },
      h("h3", {}, "Comment fonctionne la révision espacée"),
      h("p", {}, "Chaque question a un niveau de maîtrise de 0 à " + NIVEAU_MAX +
        ". Une bonne réponse fait monter d'un cran et éloigne la prochaine révision ; une erreur ramène à 0."),
      h("div", { class: "tableau-enveloppe" },
        h("table", {},
          h("thead", {}, h("tr", {},
            h("th", { scope: "col" }, "Niveau"),
            h("th", { scope: "col" }, "Prochaine révision"),
            h("th", { scope: "col" }, "Mes cartes"))),
          h("tbody", {}, INTERVALLES.map((jours, niveau) => {
            const nb = Object.values(p.cartes).filter((f) => f.niveau === niveau).length;
            return h("tr", {},
              h("td", {}, String(niveau)),
              h("td", {}, jours === 0 ? "le jour même" : "dans " + jours + " jour" + (jours > 1 ? "s" : "")),
              h("td", {}, String(nb)));
          })))
      ))
  ]);
}

/** Tous les succès, obtenus et à débloquer. */
function vueSucces() {
  const cible = conteneur();
  const p = etat.progression;
  const obtenus = BADGES.filter((b) => p.badges.includes(b.id));
  const infos = infosNiveau(p.xp);

  ajouterEnfants(cible, [
    h("h1", {}, icone("trophy", 24), "Succès et progression"),
    h("div", { class: "carte" },
      h("h3", {}, "Niveau " + infos.niveau + " — " + infos.titre),
      h("p", { class: "texte-doux" }, infos.xp + " XP au total" +
        (infos.restant > 0 ? " · encore " + infos.restant + " XP pour atteindre le niveau " + (infos.niveau + 1) : "")),
      barreProgression(infos.pourcent, "Progression du niveau"),
      h("div", { class: "stats", style: "margin-top:16px;margin-bottom:0" },
        h("div", { class: "stat" },
          h("span", { class: "stat__valeur" }, String(serieRompue(p) ? 0 : p.serie.jours)),
          h("span", { class: "stat__label" }, "Série en cours")),
        h("div", { class: "stat" },
          h("span", { class: "stat__valeur" }, String(p.serie.record || 0)),
          h("span", { class: "stat__label" }, "Record de série")),
        h("div", { class: "stat" },
          h("span", { class: "stat__valeur" }, obtenus.length + "/" + BADGES.length),
          h("span", { class: "stat__label" }, "Succès débloqués")))
    ),
    h("h2", { class: "titre-section" }, "Les " + BADGES.length + " succès"),
    h("div", { class: "badges" },
      BADGES.map((badge) => {
        const obtenu = p.badges.includes(badge.id);
        return h("div", { class: "badge-carte" + (obtenu ? " badge-carte--obtenu" : "") },
          h("span", { class: "badge-carte__icone" }, icone(obtenu ? badge.icone : "lock", 24)),
          h("span", { class: "badge-carte__texte" },
            h("strong", {}, badge.titre),
            h("small", {}, badge.description)),
          obtenu ? h("span", { class: "badge-carte__coche" }, icone("check", 18)) : null);
      })),
    h("div", { class: "barre-actions" },
      h("button", { class: "btn btn--discret", type: "button", onclick: () => naviguer("accueil") },
        icone("arrow-left", 18), "Retour à l'accueil"))
  ]);
}

/* ==========================================================================
   14. DÉMARRAGE
   ========================================================================== */

/**
 * Mesure la hauteur réelle de l'en-tête et la publie dans la variable
 * CSS --hauteur-entete.
 *
 * Sur grand écran, l'en-tête et la barre de modes sont tous deux collants.
 * La barre de modes doit se coller SOUS l'en-tête, donc à sa hauteur : une
 * valeur en dur (57px) serait fausse dès que le logo passe à la ligne ou
 * que la taille de police change. On mesure donc pour de vrai, et on
 * remesure au redimensionnement.
 */
function mesurerEntete() {
  const entete = document.querySelector(".entete");
  if (!entete) return;
  const poser = () => {
    // getBoundingClientRect() plutôt que offsetHeight : la hauteur inclut
    // la zone sûre de l'iPhone (padding-top: env(safe-area-inset-top)).
    const h = Math.round(entete.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty("--hauteur-entete", h + "px");
  };
  poser();
  window.addEventListener("resize", poser);
  // Le logo contient une police système : sa hauteur peut changer une fois
  // la police réellement chargée, après le premier rendu.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(poser).catch(() => {});
}

/** Raccourcis clavier : chiffres pour choisir une option, Entrée pour valider. */
function installerRaccourcisClavier() {
  document.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey || ev.altKey || ev.metaKey) return;
    const cible = ev.target;
    if (cible && (cible.tagName === "SELECT" || cible.tagName === "INPUT" || cible.tagName === "TEXTAREA")) return;
    if (!etat.quiz) return;
    const rq = etat.quiz.liste[etat.quiz.index];
    if (!rq) return;

    // Espace ou flèche droite après correction : question suivante
    if (rq.corrige && (ev.key === "ArrowRight" || ev.key === " ")) {
      ev.preventDefault(); passerALaSuite(); return;
    }
    if (rq.corrige) return;

    if (/^[1-9]$/.test(ev.key) && rq.dom.boutons && rq.dom.boutons.length) {
      const indice = Number(ev.key) - 1;
      if (indice < rq.dom.boutons.length) { rq.dom.boutons[indice].click(); ev.preventDefault(); }
      return;
    }
    if (ev.key === "Enter" && rq.dom.boutonValider && !rq.dom.boutonValider.disabled
        && cible && cible.tagName !== "BUTTON") {
      rq.dom.boutonValider.click();
      ev.preventDefault();
    }
  });
}

function demarrer() {
  // Les marqueurs data-icone de index.html deviennent de vraies icônes.
  hydraterIcones(document);

  // Thème d'abord, pour éviter tout clignotement
  appliquerTheme(themeInitial());

  etat.progression = chargerProgression();
  sauverProgression();              // fige la reprise d'une ancienne version
  rafraichirIndicateursEntete();

  const boutonTheme = document.getElementById("btn-theme");
  if (boutonTheme) boutonTheme.addEventListener("click", basculerTheme);
  const boutonAccueil = document.getElementById("btn-accueil");
  if (boutonAccueil) boutonAccueil.addEventListener("click", () => naviguer("accueil"));
  const jetonNiveau = document.getElementById("entete-niveau");
  if (jetonNiveau) jetonNiveau.addEventListener("click", () => naviguer("succes"));
  const jetonSerie = document.getElementById("entete-serie");
  if (jetonSerie) jetonSerie.addEventListener("click", () => naviguer("succes"));

  document.querySelectorAll(".modes__btn").forEach((btn) => {
    btn.addEventListener("click", () => naviguer(btn.dataset.mode));
  });

  installerRaccourcisClavier();
  mesurerEntete();
  naviguer("accueil");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", demarrer);
} else {
  demarrer();
}
