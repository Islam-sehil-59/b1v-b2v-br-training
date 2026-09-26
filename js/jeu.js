/* ==========================================================================
   jeu.js — La couche « motivation » : XP, niveaux, séries, badges,
            objectif quotidien et RÉVISION ESPACÉE
   --------------------------------------------------------------------------
   Pourquoi une révision espacée ? Parce que revoir une notion juste avant
   de l'oublier est, de loin, la méthode la plus efficace pour retenir sur
   la durée. Chaque question a un niveau de maîtrise de 0 à 6 ; plus le
   niveau est haut, plus l'application attend longtemps avant de la
   reproposer. Une erreur remet le niveau à zéro.

   Tout est enregistré dans localStorage, chaque accès étant protégé par un
   try/catch (voir lireStockage / ecrireStockage dans app.js).
   ========================================================================== */
"use strict";

/* ---------------------------------------------------------------- NIVEAUX */

/* Seuils d'expérience cumulés. Au-delà du dernier, chaque niveau coûte
   PALIER_SUPPLEMENTAIRE points de plus. */
const SEUILS_XP = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];
const PALIER_SUPPLEMENTAIRE = 1000;

/* Un titre par niveau : la progression suit celle d'un vrai parcours. */
const TITRES_NIVEAU = [
  "Novice",
  "Apprenti",
  "Aide-électricien",
  "Exécutant B1",
  "Exécutant B1V",
  "Chargé de travaux B2V",
  "Chargé d'intervention BR",
  "Chargé de consignation BC",
  "Référent sécurité électrique",
  "Formateur",
  "Expert NF C18-510"
];

/* Points d'expérience attribués. */
const XP = {
  bonneReponse: 10,
  comboPalier: 5,        // bonus tous les 5 combos
  objectifAtteint: 25,
  examenReussi: 50,
  carteRevisee: 5
};

/** Niveau (à partir de 1) correspondant à une quantité d'expérience. */
function niveauPourXp(xp) {
  let niveau = 1;
  while (niveau < SEUILS_XP.length && xp >= SEUILS_XP[niveau]) niveau++;
  if (niveau === SEUILS_XP.length) {
    const reste = xp - SEUILS_XP[SEUILS_XP.length - 1];
    niveau += Math.floor(reste / PALIER_SUPPLEMENTAIRE);
  }
  return niveau;
}

/** Expérience cumulée nécessaire pour atteindre un niveau donné. */
function xpPourNiveau(niveau) {
  if (niveau <= 1) return 0;
  if (niveau <= SEUILS_XP.length) return SEUILS_XP[niveau - 1];
  return SEUILS_XP[SEUILS_XP.length - 1] + (niveau - SEUILS_XP.length) * PALIER_SUPPLEMENTAIRE;
}

/** Titre associé à un niveau. */
function titreNiveau(niveau) {
  return TITRES_NIVEAU[Math.min(niveau, TITRES_NIVEAU.length) - 1];
}

/** Toutes les informations d'affichage du niveau courant. */
function infosNiveau(xp) {
  const niveau = niveauPourXp(xp);
  const debut = xpPourNiveau(niveau);
  const fin = xpPourNiveau(niveau + 1);
  return {
    niveau: niveau,
    titre: titreNiveau(niveau),
    xp: xp,
    xpDebut: debut,
    xpFin: fin,
    restant: Math.max(0, fin - xp),
    pourcent: fin > debut ? Math.round(((xp - debut) / (fin - debut)) * 100) : 100
  };
}

/* -------------------------------------------------------------- CALENDRIER */

/** Date du jour au format AAAA-MM-JJ, en heure locale. */
function jourAujourdhui(decalageJours) {
  const d = new Date();
  if (decalageJours) d.setDate(d.getDate() + decalageJours);
  const mois = String(d.getMonth() + 1).padStart(2, "0");
  const jour = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + mois + "-" + jour;
}

/** Nombre de jours entre deux dates AAAA-MM-JJ (b - a). */
function ecartJours(a, b) {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  if (isNaN(da) || isNaN(db)) return 0;
  return Math.round((db - da) / 86400000);
}

/* ---------------------------------------------------- RÉVISION ESPACÉE */

/* Intervalle en jours avant de revoir une question, selon son niveau de
   maîtrise. Niveau 0 = à revoir aujourd'hui, niveau 6 = dans un mois. */
const INTERVALLES = [0, 1, 2, 4, 8, 16, 32];
const NIVEAU_MAX = INTERVALLES.length - 1;

/** Fiche de révision espacée d'une question (créée au besoin). */
function ficheCarte(progression, idQuestion) {
  if (!progression.cartes[idQuestion]) {
    progression.cartes[idQuestion] = { niveau: 0, prochaine: jourAujourdhui(), vues: 0 };
  }
  return progression.cartes[idQuestion];
}

/**
 * Met à jour la fiche de révision espacée d'une question.
 * Bonne réponse : le niveau monte d'un cran, la prochaine révision s'éloigne.
 * Erreur : retour au niveau 0, à revoir dès aujourd'hui.
 */
function majRevisionEspacee(progression, idQuestion, estJuste) {
  const fiche = ficheCarte(progression, idQuestion);
  fiche.vues += 1;
  fiche.niveau = estJuste ? Math.min(NIVEAU_MAX, fiche.niveau + 1) : 0;
  fiche.prochaine = jourAujourdhui(INTERVALLES[fiche.niveau]);
  return fiche;
}

/**
 * Questions à revoir aujourd'hui, les moins maîtrisées d'abord.
 * @param {object} progression
 * @param {Array} toutesLesQuestions
 * @param {number} limite  nombre maximal de questions renvoyées
 */
function questionsDuJour(progression, toutesLesQuestions, limite) {
  const aujourdhui = jourAujourdhui();
  const dues = [];
  const jamaisVues = [];
  toutesLesQuestions.forEach((q) => {
    const fiche = progression.cartes[q.id];
    if (!fiche) { jamaisVues.push(q); return; }
    if (ecartJours(fiche.prochaine, aujourdhui) >= 0) dues.push({ q: q, niveau: fiche.niveau });
  });
  dues.sort((a, b) => a.niveau - b.niveau);
  const liste = dues.map((d) => d.q);
  // On complète avec des questions encore jamais vues pour ne jamais tourner à vide.
  for (const q of jamaisVues) {
    if (liste.length >= (limite || 20)) break;
    liste.push(q);
  }
  return liste.slice(0, limite || 20);
}

/** Compte des questions réellement en retard de révision (hors jamais vues). */
function nombreDuJour(progression, toutesLesQuestions) {
  const aujourdhui = jourAujourdhui();
  return toutesLesQuestions.reduce((n, q) => {
    const fiche = progression.cartes[q.id];
    return n + (fiche && ecartJours(fiche.prochaine, aujourdhui) >= 0 ? 1 : 0);
  }, 0);
}

/* ------------------------------------------------------------ SÉRIE / JOURS */

/**
 * Enregistre une activité du jour : met à jour la série de jours consécutifs
 * et le compteur de l'objectif quotidien.
 * @returns {object} { serieAugmentee, objectifAtteintMaintenant }
 */
function enregistrerActiviteDuJour(progression) {
  const aujourdhui = jourAujourdhui();
  const resultat = { serieAugmentee: false, objectifAtteintMaintenant: false };

  // Série de jours consécutifs
  const serie = progression.serie;
  if (serie.dernierJour !== aujourdhui) {
    const ecart = serie.dernierJour ? ecartJours(serie.dernierJour, aujourdhui) : null;
    serie.jours = (ecart === 1) ? serie.jours + 1 : 1;
    serie.dernierJour = aujourdhui;
    serie.record = Math.max(serie.record || 0, serie.jours);
    resultat.serieAugmentee = true;
    if (!progression.stats.joursActifs.includes(aujourdhui)) {
      progression.stats.joursActifs.push(aujourdhui);
      // On ne garde que les 60 derniers jours pour ne pas gonfler le stockage.
      if (progression.stats.joursActifs.length > 60) progression.stats.joursActifs.shift();
    }
  }

  // Objectif quotidien
  const objectif = progression.objectif;
  if (objectif.jour !== aujourdhui) { objectif.jour = aujourdhui; objectif.faites = 0; }
  const etaitAtteint = objectif.faites >= objectif.parJour;
  objectif.faites += 1;
  if (!etaitAtteint && objectif.faites >= objectif.parJour) {
    resultat.objectifAtteintMaintenant = true;
  }
  return resultat;
}

/** La série est-elle rompue ? (dernier jour d'activité trop ancien) */
function serieRompue(progression) {
  const dernier = progression.serie.dernierJour;
  if (!dernier) return false;
  return ecartJours(dernier, jourAujourdhui()) > 1;
}

/* ------------------------------------------------------------------ BADGES */

/* Chaque badge a une condition évaluée sur la progression complète.
   Ajouter un badge : ajouter une entrée ici, rien d'autre à modifier. */
const BADGES = [
  { id: "premier-pas", titre: "Premier pas", icone: "play",
    description: "Répondre à sa première question.",
    obtenu: (p) => p.stats.totalRepondues >= 1 },
  { id: "dizaine", titre: "Dans le bain", icone: "target",
    description: "Répondre à 10 questions.",
    obtenu: (p) => p.stats.totalRepondues >= 10 },
  { id: "centurion", titre: "Centurion", icone: "award",
    description: "Répondre à 100 questions.",
    obtenu: (p) => p.stats.totalRepondues >= 100 },
  { id: "combo-10", titre: "Dans le mille", icone: "zap",
    description: "Enchaîner 10 bonnes réponses d'affilée.",
    obtenu: (p) => p.stats.meilleurCombo >= 10 },
  { id: "combo-20", titre: "Sans trembler", icone: "star",
    description: "Enchaîner 20 bonnes réponses d'affilée.",
    obtenu: (p) => p.stats.meilleurCombo >= 20 },
  { id: "serie-3", titre: "Trois jours", icone: "flame",
    description: "Réviser 3 jours de suite.",
    obtenu: (p) => (p.serie.record || 0) >= 3 },
  { id: "serie-7", titre: "Une semaine", icone: "flame",
    description: "Réviser 7 jours de suite.",
    obtenu: (p) => (p.serie.record || 0) >= 7 },
  { id: "serie-30", titre: "Un mois entier", icone: "trophy",
    description: "Réviser 30 jours de suite.",
    obtenu: (p) => (p.serie.record || 0) >= 30 },
  { id: "chapitre-maitrise", titre: "Chapitre maîtrisé", icone: "check-circle",
    description: "Réussir toutes les questions d'un chapitre.",
    obtenu: (p) => CHAPITRES.some((c) => {
      const pc = p.chapitres[c.id];
      const total = QUESTIONS.filter((q) => q.chapitre === c.id).length;
      return total > 0 && pc && pc.reussies.length >= total;
    }) },
  { id: "tout-maitrise", titre: "Programme complet", icone: "trophy",
    description: "Réussir toutes les questions de tous les chapitres.",
    obtenu: (p) => CHAPITRES.every((c) => {
      const pc = p.chapitres[c.id];
      const total = QUESTIONS.filter((q) => q.chapitre === c.id).length;
      return total > 0 && pc && pc.reussies.length >= total;
    }) },
  { id: "examen-reussi", titre: "Examen validé", icone: "clipboard",
    description: "Obtenir au moins 70 % à un examen blanc.",
    obtenu: (p) => (p.examens || []).some((e) => e.pourcent >= 70) },
  { id: "examen-parfait", titre: "Sans une faute", icone: "star",
    description: "Faire un examen blanc sans aucune erreur.",
    obtenu: (p) => (p.examens || []).some((e) => e.pourcent === 100) },
  { id: "erreurs-vidées", titre: "Table rase", icone: "rotate",
    description: "Vider entièrement sa liste d'erreurs après y avoir eu au moins 5 questions.",
    obtenu: (p) => (p.stats.maxErreurs || 0) >= 5 && p.ratees.length === 0 },
  { id: "revision-a-jour", titre: "À jour", icone: "calendar",
    description: "N'avoir plus aucune carte en retard de révision.",
    obtenu: (p) => p.stats.totalRepondues >= 20 && nombreDuJour(p, QUESTIONS) === 0 }
];

/** Retourne la liste des badges nouvellement obtenus, et les enregistre. */
function verifierBadges(progression) {
  const nouveaux = [];
  BADGES.forEach((badge) => {
    if (progression.badges.includes(badge.id)) return;
    let obtenu = false;
    try { obtenu = badge.obtenu(progression); } catch (erreur) { obtenu = false; }
    if (obtenu) { progression.badges.push(badge.id); nouveaux.push(badge); }
  });
  return nouveaux;
}

/** Badge par identifiant. */
function badgeParId(id) {
  return BADGES.find((b) => b.id === id) || null;
}

/* --------------------------------------------------- RETOUR HAPTIQUE (mobile) */

/**
 * Petite vibration sur téléphone. Silencieuse si l'appareil ne sait pas
 * vibrer ou si l'utilisateur a désactivé les animations.
 */
function vibrer(motif) {
  try {
    if (!window.navigator || typeof window.navigator.vibrate !== "function") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.navigator.vibrate(motif);
  } catch (erreur) { /* sans conséquence */ }
}
