# Révision Habilitation Électrique B1V / B2V / BR

Application de révision **hors ligne**, en français, pour préparer l'habilitation
électrique **B1V / B2V / BR** (norme **NF C18-510**).

HTML + CSS + JavaScript pur : aucun framework, aucune dépendance, aucune étape de
build. **Pensée pour le téléphone** : navigation au pouce, cartes à balayer,
gros boutons.

- **10 chapitres** de fiches de révision
- **134 questions**, 7 types d'exercices
- **Examen blanc aux règles officielles** (INRS ED 6127)
- **Révision espacée** : chaque question revient juste avant que tu l'oublies
- Niveaux, expérience, série de jours, objectif quotidien, 14 succès

---

## 1. Utilisation

**Double-clique sur `index.html`.** L'application s'ouvre dans ton navigateur et
fonctionne sans connexion Internet.

### Sur téléphone

Deux façons de l'avoir sous la main :

1. **Copier le dossier sur le téléphone** (câble USB, clé OTG, cloud) puis ouvrir
   `index.html` avec le navigateur, et l'ajouter à l'écran d'accueil.
2. **Le servir depuis l'ordinateur**, les deux appareils sur le même Wi-Fi :
   ```bash
   cd ~/Projects/habilitation-electrique
   python3 -m http.server 8000
   ```
   Puis, sur le téléphone, ouvrir `http://<IP-de-l-ordinateur>:8000`
   (`hostname -I` donne l'adresse). Ajouter la page à l'écran d'accueil : elle
   s'ouvre alors en plein écran, comme une application.

> La progression est enregistrée **par navigateur**. Elle ne se synchronise donc
> pas entre le téléphone et l'ordinateur.

### Les six modes

| Mode | À quoi ça sert |
|---|---|
| **Accueil** | Niveau, série, objectif du jour, raccourcis, succès, progression des chapitres. |
| **Fiches** | Les 10 fiches de révision. Sur téléphone, on **balaye** pour changer de chapitre. |
| **Cartes** | Cartes mémo à **balayer** : question au recto, réponse au verso, auto-évaluation. |
| **Entraînement** | Questions d'un chapitre au choix, correction et explication après chaque réponse. |
| **Examen** | Examen officiel (20 questions, quotas de thèmes, 70 %) ou examen long (30 questions). |
| **Révision du jour** | Ce que la révision espacée te propose aujourd'hui. Accessible depuis l'accueil. |

S'y ajoutent **Mes erreurs** (les questions ratées, accessible depuis l'accueil et
l'entraînement) et **Succès** (en touchant le niveau ou la flamme dans l'en-tête).

### Gestes et raccourcis

| Geste / touche | Effet |
|---|---|
| Balayer ← / → sur une **fiche** | Chapitre suivant / précédent |
| Balayer ← / → sur une **carte mémo** | « À revoir » / « Je savais » (après avoir vu la réponse) |
| Toucher une carte mémo | La retourner |
| Balayer ← / → en **examen** | Question suivante / précédente |
| Balayer ← après une correction | Question suivante |
| Touches **1** à **9** | Sélectionner une proposition |
| **Entrée** | Valider la réponse (ou retourner la carte mémo) |
| **Espace** / **→** après correction | Question suivante |
| **←** / **→** sur une carte retournée | « À revoir » / « Je savais » |
| **Tab** / **Maj+Tab** | Navigation clavier, focus toujours visible |

Tout ce qui se fait au balayage se fait **aussi au bouton** : l'application reste
entièrement utilisable à la souris et au clavier.

---

## 2. Structure du projet

```
habilitation-electrique/
├── index.html          Structure de la page (en-tête, navigation, conteneur)
├── css/style.css       Tout le style, écrit mobile d'abord
├── js/icones.js        Jeu d'icônes SVG (style Feather / Lucide)
├── js/gestes.js        Détection du balayage (doigt, stylet, souris)
├── js/data.js          TOUT LE CONTENU : fiches + questions  ← c'est ici que tu ajoutes
├── js/jeu.js           Expérience, niveaux, série, succès, révision espacée
├── js/app.js           La logique (navigation, quiz, examen, cartes, sauvegarde)
├── netlify.toml        Configuration de mise en ligne (voir §8)
├── .gitignore          Fichiers à ne pas versionner
└── README.md           Ce fichier
```

`data.js` ne contient **aucune logique** : tu peux le modifier sans risque de casser
l'application. Réciproquement, `app.js` ne contient **aucun contenu pédagogique**.

---

## 3. Ajouter mes propres questions

Ouvre `js/data.js`, descends jusqu'au tableau `const QUESTIONS = [ … ]`, et colle un
nouvel objet **avant le crochet fermant `];`**. Trois règles seulement :

1. `id` doit être **unique** (ex. `"ch5-q13"`).
2. `chapitre` doit être l'`id` d'un chapitre existant : `ch1` … `ch10`.
3. Les index **commencent à 0** : la première option de la liste est l'index `0`.

Compteurs, barres de progression, tirage de l'examen, cartes mémo et révision
espacée se mettent à jour tout seuls.

### Les 7 types de questions

#### QCM à une seule bonne réponse

```js
{
  id: "ch5-q13", chapitre: "ch5", type: "qcm",
  enonce: "Quel est le rôle du cadenas de consignation ?",
  options: [
    "Signaler la présence de l'intervenant",   // index 0
    "Immobiliser l'organe de coupure",          // index 1  ← la bonne
    "Vérifier l'absence de tension"             // index 2
  ],
  reponse: 1,
  explication: "Le cadenas immobilise physiquement l'organe en position d'ouverture."
}
```

#### QCM à plusieurs bonnes réponses

La mention « plusieurs réponses possibles » s'affiche automatiquement.

```js
{
  id: "ch6-q17", chapitre: "ch6", type: "qcm_multiple",
  enonce: "Quels équipements sont des EPI ?",
  options: ["Gants isolants", "Banderole de balisage", "Écran facial", "Nappe isolante"],
  reponses: [0, 2],
  explication: "Gants et écran facial protègent une seule personne."
}
```

#### Vrai / Faux

```js
{
  id: "ch1-q14", chapitre: "ch1", type: "vf",
  enonce: "Une électrocution est toujours mortelle.",
  reponse: true,                         // true = Vrai, false = Faux
  explication: "Par définition, l'électrocution est l'électrisation mortelle."
}
```

#### Remettre dans l'ordre (glisser-déposer + flèches ↑ ↓)

Écris les éléments **dans le BON ordre** : l'application les mélange elle-même.

```js
{
  id: "ch5-q14", chapitre: "ch5", type: "ordre",
  enonce: "Remets dans l'ordre les étapes de la consignation.",
  elements: ["Séparation", "Condamnation", "Identification", "Vérification d'absence de tension"],
  explication: "SÉ-CO-I-VÉ : séparer, condamner, identifier, vérifier."
}
```

#### Association

Une liste déroulante par élément de gauche ; la colonne de droite est mélangée.
**Garde des valeurs `droite` toutes différentes.**

```js
{
  id: "ch3-q15", chapitre: "ch3", type: "association",
  enonce: "Associe chaque symbole à son rôle.",
  paires: [
    { gauche: "B1V", droite: "Exécutant, voisinage autorisé" },
    { gauche: "B2V", droite: "Chargé de travaux, voisinage autorisé" },
    { gauche: "BC",  droite: "Chargé de consignation" }
  ],
  explication: "Le chiffre donne le rôle, la lettre V le voisinage."
}
```

#### Texte à trous avec liste déroulante

Marque chaque trou par `{{0}}`, `{{1}}`… **dans l'ordre**. Autant de marqueurs que
d'entrées dans `trous`.

```js
{
  id: "ch2-q17", chapitre: "ch2", type: "trous",
  enonce: "Complète les domaines de tension.",
  texte: "En alternatif, la BTA s'arrête à {{0}} et la BTB à {{1}}.",
  trous: [
    { options: ["400 V", "500 V", "750 V"], reponse: 1 },
    { options: ["750 V", "1 000 V", "1 500 V"], reponse: 1 }
  ],
  explication: "BTA jusqu'à 500 V, BTB jusqu'à 1 000 V en alternatif."
}
```

#### Mise en situation

Comme le QCM simple, avec un `scenario` affiché au-dessus de la question.

```js
{
  id: "ch7-q14", chapitre: "ch7", type: "situation",
  scenario: "Tu dois remplacer un contacteur dans une armoire 400 V sous tension.",
  enonce: "Que fais-tu en premier ?",
  options: ["J'ouvre l'armoire et je démonte", "J'analyse : demande, schéma, risques, autorisation, EPI"],
  reponse: 1,
  explication: "Toute intervention commence par la préparation."
}
```

---

## 4. Ajouter ou modifier une fiche

Même fichier, tableau `const CHAPITRES = [ … ]`. Toutes les clés d'une section sont
optionnelles.

```js
{
  id: "ch11",                     // identifiant unique
  titre: "Mon nouveau chapitre",
  icone: "tool",                  // nom d'une icône de js/icones.js (voir §5)
  resume: "Deux ou trois phrases d'accroche.",
  sections: [
    {
      titre: "Un sous-titre",
      paragraphes: ["Un paragraphe.", "Un autre."],
      liste: ["Un point", "Un autre point"],
      tableau: { entetes: ["Colonne A", "Colonne B"], lignes: [["a1", "b1"]] }
    }
  ],
  pointsCles: ["À retenir 1", "À retenir 2"],        // encadré vert
  piege: "Le piège classique à l'examen…",            // encadré rouge
  exemple: "Une situation concrète en entreprise…",   // encadré bleu
  aVerifier: ["Valeur incertaine à confirmer"]        // encadré orange (facultatif)
}
```

**Important : rattache aussi le chapitre à un thème d'examen**, dans la table
`THEMES` de `data.js`. C'est elle qui permet à l'examen officiel de respecter les
quotas réglementaires.

```js
const THEMES = {
  zones: { libelle: "…", chapitres: ["ch2", "ch4"], partMini: 0.30 },
  // …ajoute "ch11" au thème qui lui correspond
};
```

---

## 5. Les icônes

Toutes les icônes sont des **SVG au trait définis dans `js/icones.js`**, dans le
même style et avec les mêmes tracés que les jeux *Feather* / *Lucide* diffusés par
le paquet `react-icons` (`FiZap`, `FiBook`, `FiTarget`…). Pas de police d'icônes,
pas de CDN, pas de `npm install` : `react-icons` lui-même suppose React et une
étape de build, incompatibles avec une application qui doit s'ouvrir par double-clic.

Chaque icône hérite de la couleur du texte (`currentColor`) : elle s'adapte donc
automatiquement au thème clair ou sombre.

| Catégorie | Noms |
|---|---|
| Navigation | `home` `book` `target` `clock` `rotate` `refresh` `shuffle` `play` `trash` `moon` `sun` `eye` `x` |
| Flèches | `arrow-left` `arrow-right` `chevron-left` `chevron-right` `chevron-up` `chevron-down` |
| Correction | `check` `check-circle` `x-circle` `alert` `help` `award` `thumbs-up` `thumbs-down` |
| Progression | `flame` `star` `trophy` `layers` `calendar` |
| Divers | `grip` (poignée de glisser-déposer), `lock` |
| Chapitres | `zap` `ruler` `badge` `zone` `lock` `shield` `tool` `pulse` `file` `clipboard` `factory` |

### Utiliser une icône

```js
icone("lock")        // 20 px par défaut
icone("lock", 28)    // taille explicite
h("button", { class: "btn" }, icone("play", 18), "Commencer")
```

Dans `index.html`, on place un marqueur, rempli au démarrage par `hydraterIcones()` :

```html
<span data-icone="home" data-taille="20"></span>
```

### Ajouter une icône

Ajoute une entrée à l'objet `ICONES` : le **contenu interne** d'un SVG dessiné sur
une grille 24 × 24, sans balise `<svg>` et sans couleur figée.

```js
eclair_double: '<polyline points="11 2 4 13 10 13 9 22"/><polyline points="19 2 13 11 18 11 17 19"/>'
```

Tu peux copier n'importe quel tracé Feather ou Lucide : ils utilisent tous la même
grille et le même trait de 2 px.

---

## 6. Comment la motivation est construite

Rien de tout cela n'est cosmétique : chaque mécanisme sert la mémorisation.

### Révision espacée — le cœur du dispositif

Chaque question a un **niveau de maîtrise de 0 à 6**. Une bonne réponse fait monter
d'un cran et éloigne la prochaine révision ; une erreur ramène à 0.

| Niveau | Prochaine révision |
|---|---|
| 0 | le jour même |
| 1 | dans 1 jour |
| 2 | dans 2 jours |
| 3 | dans 4 jours |
| 4 | dans 8 jours |
| 5 | dans 16 jours |
| 6 | dans 32 jours |

Revoir une notion **juste avant de l'oublier** est de loin le meilleur rapport
effort / mémorisation. C'est ce que propose le bouton « Révision du jour ».

### Expérience et niveaux

| Action | Gain |
|---|---|
| Bonne réponse | 10 XP |
| Tous les 5 combos | +5 XP de bonus |
| Objectif quotidien atteint | +25 XP |
| Examen blanc réussi | +50 XP |
| Carte mémo sue | +5 XP |

Onze titres jalonnent la progression, de « Novice » à « Expert NF C18-510 », en
passant par « Exécutant B1V », « Chargé d'intervention BR » et « Chargé de
consignation BC ».

### Série, objectif, combos, succès

- **Série de jours** : la flamme de l'en-tête compte les jours consécutifs de
  révision. Un jour manqué la remet à 1, mais le record est conservé.
- **Objectif quotidien** : 10 questions par jour par défaut, matérialisé par une
  rangée de pastilles qui se remplit.
- **Combo** : les bonnes réponses consécutives s'affichent en haut du quiz.
- **14 succès** à débloquer, du « Premier pas » au « Programme complet ».

Pour changer la cadence, modifie `CONFIG.objectifQuotidien` dans `data.js`.

---

## 7. L'examen blanc et les règles officielles

### Ce qui n'était pas possible

Tu m'avais demandé de récupérer de vrais sujets d'examen. Ce n'est pas faisable
honnêtement : la norme **NF C18-510 est un document payant de l'AFNOR**, protégé par
le droit d'auteur, et les banques de questions des organismes de formation sont leur
propriété. Il n'existe pas de sujet officiel librement diffusé, et recopier un sujet
trouvé au hasard sur Internet n'aurait offert aucune garantie d'exactitude.

### Ce que j'ai trouvé à la place, et qui vaut mieux

La brochure **INRS ED 6127** (janvier 2021), *L'habilitation électrique — Démarche de
prévention*, est **gratuite et officielle**. Elle ne donne pas les questions, mais
elle donne **les règles de l'évaluation**. Le mode « Examen officiel » les applique :

| Règle officielle | Dans l'application |
|---|---|
| QCM de **15 questions minimum** | 20 questions |
| **Tirage aléatoire** | à chaque lancement, propositions mélangées |
| Base d'au moins **5 × le nombre de questions posées**, par thème | 134 questions, vérifié par les tests |
| **70 % de bonnes réponses** exigées | seuil affiché et appliqué |
| Thème « distances et zones d'environnement » : **≥ 30 %** | quota garanti au tirage |
| Thème « limites des opérations du symbole » : **≥ 30 %** | quota garanti au tirage |
| Thèmes « dangers » et « protections » également évalués | au moins une question chacun |

Le résultat détaille ton score **thème par thème** : tu vois immédiatement lequel te
ferait échouer.

La partie **pratique** de l'évaluation est décrite dans la fiche 10 : trois critères
(sans erreur, erreur mineure, erreur majeure) et l'acceptation à **deux erreurs
mineures maximum, aucune erreur majeure**.

### Autres réglages

Tout en bas de `js/data.js` :

```js
const CONFIG = {
  nbQuestionsExamenOfficiel: 20,   // la norme impose 15 au minimum
  dureeExamenOfficielMinutes: 30,
  seuilReussitePourcent: 70,
  nbQuestionsExamen: 30,           // formule « examen long »
  dureeExamenMinutes: 45,
  noteMiniReussite: 14,
  objectifQuotidien: 10,
  taillePaquetCartes: 20,
  taillePaquetRevision: 20
};
```

---

## 8. Mise en ligne (GitHub + Netlify)

Le site est **entièrement statique** : aucune dépendance, aucune étape de build.
Netlify sert les fichiers du dépôt tels quels.

### Les deux fichiers de configuration

| Fichier | Rôle |
|---|---|
| `.gitignore` | Écarte les fichiers créés par le système et les éditeurs, et par précaution tout fichier de secrets. |
| `netlify.toml` | Déclare la racine du dépôt comme site, sans commande de build, et pose les en-têtes HTTP. |

### Le cache, et pourquoi il n'est pas agressif

`index.html` référence `css/style.css` et `js/*.js` **par leur nom, sans empreinte**
(pas de `style.a1b2c3.css`). Avec un cache long, un visiteur qui revient après une
mise à jour récupérerait un mélange d'anciens et de nouveaux fichiers — le genre de
panne difficile à diagnostiquer.

`netlify.toml` demande donc au navigateur de **revalider** à chaque visite : il envoie
un ETag, Netlify répond `304 Not Modified` si rien n'a changé. Le transfert reste quasi
nul et une mise en ligne est visible tout de suite.

Si un jour les fichiers sont renommés avec une empreinte, on pourra passer `css/` et
`js/` à `public, max-age=31536000, immutable`.

### Les en-têtes de sécurité

`netlify.toml` pose aussi une politique de sécurité du contenu (CSP) stricte, rendue
possible par le fait que l'application ne dépend de rien :

- `script-src 'self'` — aucun script en ligne, aucun script externe ;
- `connect-src 'none'` — l'application ne fait **aucune** requête réseau ;
- `img-src 'self' data:` — l'icône d'onglet est un SVG en `data:` ;
- `style-src 'self' 'unsafe-inline'` — seule tolérance nécessaire : l'application pose
  quelques attributs `style="…"` depuis JavaScript (barres de progression, animations
  de carte). Sans risque ici, puisqu'aucun contenu extérieur n'entre dans la page.

### Pas de redirection « /* vers /index.html »

Tentant, par réflexe d'application à page unique — mais inutile : la navigation entre
les modes se fait en mémoire, sans jamais changer l'URL. Cette règle masquerait au
contraire les vraies erreurs 404.

### Brancher Netlify

1. Pousser le dépôt sur GitHub.
2. Sur Netlify : **Add new site → Import an existing project → GitHub**, choisir le dépôt.
3. Ne rien changer : `netlify.toml` fournit déjà la configuration. Le champ *Build
   command* reste vide, *Publish directory* vaut `.`.
4. **Deploy**. Chaque `git push` redéploie automatiquement.

> Rappel : la progression est enregistrée dans le `localStorage` du navigateur, donc
> **par appareil**. Mettre le site en ligne ne la synchronise pas entre le téléphone et
> l'ordinateur — mais permet d'y accéder de n'importe où sans copier de fichiers.

---

## 9. Sources et avertissement

Les valeurs chiffrées de cette application ont été recoupées avec :

- **INRS ED 6127** — *L'habilitation électrique, démarche de prévention* (gratuit) :
  règles d'évaluation, validité du titre (3 ans, 1 an pour les travaux sous tension),
  suivi annuel, recyclage recommandé tous les 3 ans.
- Sources professionnelles pour les distances et zones (DLI 50 m, DLVS 3 m,
  DLVR 0,30 m en BT et 2 m en HTA, DMA = distance de tension + distance de garde),
  les limites de l'intervention BT générale du BR (500 V alternatif / 750 V continu,
  63 A alternatif / 32 A continu) et les classes de gants isolants
  (classe 00 → 500 V, classe 0 → 1 000 V, essai diélectrique tous les 6 mois).

Les encadrés **« À vérifier avec le formateur »** signalent ce qui reste volontairement
non chiffré, pour ne rien inventer : fais-le confirmer en cours et corrige `data.js`
si besoin.

> Cet outil est une aide à la révision **personnelle**. Il ne remplace ni la lecture
> de la norme **NF C18-510**, ni la formation dispensée par un organisme habilité, ni
> le titre d'habilitation délivré par l'employeur.
