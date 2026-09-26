/* ==========================================================================
   data.js — TOUT le contenu de l'application (fiches + questions)
   Aucune logique ici : ce fichier ne contient que des données.
   Voir le README.md pour ajouter vos propres questions.
   ==========================================================================

   FORMAT D'UNE FICHE (tableau CHAPITRES) :
   {
     id: "ch1",                       // identifiant unique, utilisé par les questions
     titre: "...",
     icone: "zap",                   // nom d'une icône du registre js/icones.js
     resume: "...",                   // 2-3 phrases d'accroche
     sections: [                      // toutes les clés d'une section sont optionnelles
       { titre: "...",
         paragraphes: ["...", "..."],
         liste: ["...", "..."],
         tableau: { entetes: ["A","B"], lignes: [["a1","b1"]] } }
     ],
     pointsCles: ["...", "..."],      // encadré vert « À retenir »
     piege: "...",                    // encadré rouge « Piège fréquent à l'examen »
     exemple: "...",                  // encadré bleu « Sur le terrain »
     aVerifier: ["..."]               // encadré orange (optionnel) : valeurs à confirmer
   }

   FORMAT D'UNE QUESTION (tableau QUESTIONS) : voir le bas de ce fichier.
   ========================================================================== */

/* ==========================================================================
   1. LES FICHES DE RÉVISION
   ========================================================================== */
const CHAPITRES = [

  /* ---------------------------------------------------------------- CH 1 */
  {
    id: "ch1",
    titre: "Les dangers de l'électricité",
    icone: "zap",
    resume: "Le courant électrique est dangereux parce qu'il traverse le corps humain comme n'importe quel autre conducteur. Ce n'est pas la tension qui tue directement, c'est l'INTENSITÉ qui passe dans le corps, et la DURÉE pendant laquelle elle passe.",
    sections: [
      {
        titre: "Pourquoi le courant passe-t-il dans le corps ?",
        paragraphes: [
          "Le corps humain est un conducteur : il contient de l'eau et des sels. Dès qu'il est en contact avec deux points à des potentiels différents (une phase et la terre, par exemple), un courant s'établit.",
          "On retrouve la loi d'Ohm : I = U / R. U est la tension de contact, R la résistance du corps (peau + trajet interne). Plus la résistance baisse, plus l'intensité monte pour une même tension."
        ],
        liste: [
          "Peau sèche et épaisse : résistance élevée (plusieurs milliers d'ohms) — le courant est limité.",
          "Peau humide, transpiration, mains mouillées : la résistance s'écroule — l'intensité grimpe fortement.",
          "Pieds nus sur du béton humide, chaussures percées : très mauvais, la liaison avec la terre est excellente."
        ]
      },
      {
        titre: "Électrisation ou électrocution ?",
        paragraphes: [
          "Ces deux mots ne sont pas synonymes et c'est une question classique à l'examen."
        ],
        liste: [
          "ÉLECTRISATION : passage du courant dans le corps, avec des effets (picotements, contraction musculaire, brûlure, malaise…). La victime est VIVANTE.",
          "ÉLECTROCUTION : une électrisation qui entraîne la MORT. Toute électrocution est une électrisation, l'inverse est faux."
        ]
      },
      {
        titre: "Les effets du courant alternatif sur le corps",
        paragraphes: [
          "Les valeurs ci-dessous sont des ordres de grandeur pédagogiques pour du 50 Hz alternatif, sur un trajet main-main ou main-pied. Elles servent à comprendre la progression du danger."
        ],
        tableau: {
          entetes: ["Intensité (≈)", "Effet sur le corps"],
          lignes: [
            ["0,5 à 1 mA", "Seuil de perception : on sent un léger picotement."],
            ["10 mA", "Seuil de non-lâcher : les muscles se contractent (tétanisation), la main reste crispée sur le conducteur et on ne peut plus lâcher."],
            ["30 mA", "Seuil de dangerosité : tétanisation des muscles respiratoires, asphyxie si le courant persiste. C'est la valeur de référence des différentiels 30 mA."],
            ["≈ 75 mA et plus", "Risque de fibrillation ventriculaire : le cœur bat de façon désordonnée et ne pompe plus. Sans défibrillateur, c'est mortel."],
            ["1 A et plus", "Arrêt cardiaque, brûlures internes profondes."]
          ]
        }
      },
      {
        titre: "Les trois familles de brûlures",
        liste: [
          "Brûlure par ARC ÉLECTRIQUE (coup d'arc) : un court-circuit provoque un arc de plusieurs milliers de degrés. Brûlures de la peau, projection de métal en fusion, et rayonnement ultraviolet qui brûle la cornée — c'est l'ophtalmie, comme un coup d'arc de soudure. Très douloureux, apparaît quelques heures après.",
          "Brûlure ÉLECTROTHERMIQUE (interne) : le courant traverse les tissus et les chauffe par effet Joule. La plaie visible peut être minuscule alors que les dégâts internes (muscles, nerfs, reins) sont énormes. C'est pourquoi une victime d'électrisation doit TOUJOURS voir un médecin, même si elle dit que ça va.",
          "Brûlure par CONTACT / projection : contact avec une pièce chauffée, ou éclaboussure de matière en fusion lors d'un court-circuit dans une armoire."
        ]
      },
      {
        titre: "Les deux types de contact",
        liste: [
          "CONTACT DIRECT : on touche une pièce nue normalement sous tension (une barre de cuivre, une borne, un conducteur dénudé). Protection : isolation, éloignement, obstacles, enveloppes (indices IP).",
          "CONTACT INDIRECT : on touche une masse métallique normalement hors tension mais mise accidentellement sous tension par un défaut d'isolement (la carcasse d'un moteur, par exemple). Protection : mise à la terre des masses + dispositif différentiel."
        ]
      },
      {
        titre: "Les facteurs aggravants",
        liste: [
          "L'INTENSITÉ du courant (facteur numéro un).",
          "La DURÉE du contact : 30 mA pendant 1/10 de seconde se supporte, 30 mA pendant 5 secondes peut tuer.",
          "Le TRAJET du courant : main gauche → pied droit traverse le cœur, c'est le pire. Main → main traverse aussi la cage thoracique.",
          "La RÉSISTANCE du corps : humidité, transpiration, plaie, surface de contact, pression du contact.",
          "La NATURE du courant : à intensité égale, l'alternatif 50 Hz est plus dangereux pour le cœur que le continu (il provoque plus facilement la fibrillation).",
          "L'environnement : local humide, milieu conducteur, travail en hauteur (risque de chute après la contraction musculaire), bijoux et bracelets métalliques, montre."
        ]
      },
      {
        titre: "La tension limite conventionnelle UL",
        paragraphes: [
          "C'est la tension de contact la plus élevée qu'on admet sans danger pendant un temps indéfini. Elle dépend du milieu : elle est plus basse quand c'est mouillé, parce que la résistance du corps chute."
        ],
        tableau: {
          entetes: ["Milieu", "UL en alternatif", "UL en continu"],
          lignes: [
            ["Local sec", "50 V", "120 V"],
            ["Local mouillé", "25 V", "60 V"]
          ]
        }
      }
    ],
    pointsCles: [
      "Ce n'est pas la tension qui tue, c'est l'intensité qui traverse le corps — et la durée.",
      "Électrisation = le courant passe. Électrocution = l'électrisation est mortelle.",
      "10 mA : on ne peut plus lâcher. 30 mA : asphyxie si ça dure. Au-delà : fibrillation du cœur.",
      "Une brûlure électrique interne peut être grave avec une plaie minuscule en surface : consultation médicale obligatoire.",
      "Le coup d'arc brûle aussi les yeux (ophtalmie) par rayonnement ultraviolet.",
      "Contact direct = pièce nue sous tension. Contact indirect = masse mise sous tension par un défaut."
    ],
    piege: "On vous demandera souvent « à partir de quelle tension y a-t-il un danger ? ». Le réflexe faux est de répondre « à partir de la haute tension ». La très grande majorité des accidents électriques mortels en France se produisent en BASSE TENSION, sur du 230 V ou du 400 V, parce que c'est ce qu'on manipule tous les jours. Autre piège : confondre électrisation et électrocution.",
    exemple: "Un technicien de maintenance intervient torse nu en été dans un local technique mal ventilé, à genoux sur un sol en béton humide. Il touche par mégarde une borne 230 V non protégée. Sa transpiration et le contact au sol font chuter sa résistance corporelle : l'intensité qui le traverse est bien plus élevée que si le même geste avait été fait au sec, en combinaison et avec des chaussures isolantes.",
    aVerifier: [
      "Les seuils exacts en milliampères et les temps associés (courbes de sécurité temps/courant) : demandez au formateur les valeurs officielles qu'il attend, elles peuvent être présentées différemment selon les supports."
    ]
  },

  /* ---------------------------------------------------------------- CH 2 */
  {
    id: "ch2",
    titre: "Les domaines de tension",
    icone: "ruler",
    resume: "Classer une installation dans son domaine de tension, c'est la première chose à faire : c'est ce qui détermine les distances à respecter, les équipements de protection, et le type d'habilitation nécessaire. Les valeurs ne sont PAS les mêmes en alternatif et en continu.",
    sections: [
      {
        titre: "Le tableau à connaître par cœur",
        paragraphes: [
          "Les bornes sont données pour la tension nominale de l'installation. En alternatif on parle de la valeur efficace."
        ],
        tableau: {
          entetes: ["Domaine", "Alternatif (AC)", "Continu (DC)"],
          lignes: [
            ["TBT — Très Basse Tension", "U ≤ 50 V", "U ≤ 120 V"],
            ["BTA — Basse Tension A", "50 V < U ≤ 500 V", "120 V < U ≤ 750 V"],
            ["BTB — Basse Tension B", "500 V < U ≤ 1 000 V", "750 V < U ≤ 1 500 V"],
            ["HTA — Haute Tension A", "1 000 V < U ≤ 50 000 V", "1 500 V < U ≤ 75 000 V"],
            ["HTB — Haute Tension B", "U > 50 000 V", "U > 75 000 V"]
          ]
        }
      },
      {
        titre: "Le moyen mnémotechnique",
        paragraphes: [
          "En alternatif, retenez la suite : 50 — 500 — 1 000 — 50 000. En continu, tout est plus élevé (le continu est moins agressif pour le cœur) : 120 — 750 — 1 500 — 75 000.",
          "Astuce : les bornes du continu valent grosso modo 1,5 fois celles de l'alternatif pour la BT (500 → 750 et 1 000 → 1 500), et 2,4 fois pour la limite HTA/HTB (50 000 → 75 000)."
        ]
      },
      {
        titre: "Où se situent les tensions du quotidien ?",
        tableau: {
          entetes: ["Tension", "Domaine", "Où on la rencontre"],
          lignes: [
            ["24 V AC / 24 V DC", "TBT", "Circuits de commande d'automate, capteurs, télécommande de contacteurs"],
            ["230 V AC monophasé", "BTA", "Prises de courant, éclairage, petits moteurs"],
            ["400 V AC triphasé", "BTA", "Moteurs, armoires de puissance, distribution d'atelier"],
            ["690 V AC", "BTB", "Gros moteurs industriels, réseaux d'usine particuliers"],
            ["20 000 V AC", "HTA", "Poste de livraison d'une usine, réseau de distribution"],
            ["400 000 V AC", "HTB", "Lignes de transport à très grande distance"]
          ]
        }
      },
      {
        titre: "TBT : attention, basse tension ne veut pas dire sans danger",
        paragraphes: [
          "La TBT est plus sûre, mais il existe plusieurs régimes de TBT et ils n'offrent pas la même protection."
        ],
        liste: [
          "TBTS — Très Basse Tension de Sécurité : circuit isolé de la terre et des autres circuits (transformateur de sécurité). C'est le plus protecteur.",
          "TBTP — Très Basse Tension de Protection : même principe mais un point est relié à la terre.",
          "TBTF — Très Basse Tension Fonctionnelle : la tension est basse pour des raisons de fonctionnement, sans garantie de séparation. Le danger peut rester présent.",
          "Et dans tous les cas, même en TBT, un court-circuit sur une batterie peut provoquer un arc et de graves brûlures : pensez aux 12 V d'une batterie de voiture qui fait fondre une clé plate."
        ]
      },
      {
        titre: "Ce que ça change pour vous en B1V / B2V / BR",
        paragraphes: [
          "Le B de B1V, B2V et BR signifie BASSE TENSION (domaines BTA et BTB, donc jusqu'à 1 000 V en alternatif). Le H (H0, H1, H2…) désigne la haute tension.",
          "Une habilitation B ne donne AUCUN droit en haute tension, et inversement."
        ]
      }
    ],
    pointsCles: [
      "TBT : ≤ 50 V AC / ≤ 120 V DC.",
      "BTA : jusqu'à 500 V AC / 750 V DC. BTB : jusqu'à 1 000 V AC / 1 500 V DC.",
      "La frontière BT / HT est à 1 000 V en alternatif et 1 500 V en continu.",
      "HTA jusqu'à 50 000 V AC, au-delà c'est HTB.",
      "Le 400 V triphasé d'une armoire d'atelier est du BTA : c'est le domaine de travail du BR.",
      "Lettre B = basse tension, lettre H = haute tension."
    ],
    piege: "Deux pièges reviennent sans arrêt. Premier : donner les valeurs de l'alternatif pour une question posée en continu (une installation 1 200 V continu est en BTB, pas en HTA !). Deuxième : croire que 400 V est de la BTB parce que « c'est plus que le 230 V ». 400 V est bien du BTA, car la limite BTA/BTB est à 500 V en alternatif.",
    exemple: "Vous ouvrez une armoire d'atelier : l'arrivée est en 400 V triphasé (BTA), la partie commande de l'automate est en 24 V continu (TBT). Dans la même armoire vous avez donc deux domaines de tension. La partie 400 V exige gants isolants et écran facial ; la partie 24 V est moins dangereuse — mais un court-circuit franc y provoque quand même un arc, et vous êtes toujours au voisinage du 400 V juste à côté."
  },

  /* ---------------------------------------------------------------- CH 3 */
  {
    id: "ch3",
    titre: "Les symboles d'habilitation",
    icone: "badge",
    resume: "Un symbole d'habilitation se lit lettre par lettre. Chaque caractère répond à une question : quel domaine de tension ? quel rôle ? quel type d'opération ? La lettre V ajoutée autorise à travailler AU VOISINAGE de pièces nues sous tension.",
    sections: [
      {
        titre: "Comment décoder un symbole",
        liste: [
          "1re lettre — le DOMAINE DE TENSION : B = basse et très basse tension. H = haute tension.",
          "1er chiffre — le RÔLE : 0 = travaux d'ordre NON électrique. 1 = exécutant de travaux d'ordre électrique. 2 = chargé de travaux d'ordre électrique (il encadre).",
          "Lettre V — VOISINAGE : autorise à opérer dans la zone de voisinage renforcé de pièces nues sous tension en BT.",
          "Lettres finales — le TYPE D'OPÉRATION : C = consignation, R = intervention BT générale, S = intervention BT élémentaire, E = opérations spécifiques (essai, mesurage, vérification, manœuvre)."
        ]
      },
      {
        titre: "Les symboles les plus courants",
        tableau: {
          entetes: ["Symbole", "Qui est-ce ?", "Ce qu'il peut faire"],
          lignes: [
            ["B0", "Non-électricien (maçon, peintre, technicien mécanique…)", "Travaux d'ordre NON électrique dans un local réservé aux électriciens ou au voisinage. Ne touche pas à l'électricité."],
            ["B1", "Exécutant électricien", "Exécute des travaux d'ordre électrique HORS TENSION, sur ordre d'un chargé de travaux."],
            ["B1V", "Exécutant électricien, voisinage autorisé", "Idem B1, plus le droit de travailler dans la zone de voisinage renforcé BT."],
            ["B2", "Chargé de travaux", "Dirige des travaux hors tension, encadre les B1/B0, assure sa sécurité et celle de son équipe."],
            ["B2V", "Chargé de travaux, voisinage autorisé", "Idem B2 au voisinage. Reçoit l'attestation de consignation du chargé de consignation."],
            ["B2V Essai", "Chargé de travaux pour essais", "Dirige des essais (plateforme d'essai, banc, machine en réglage)."],
            ["BC", "Chargé de consignation", "Réalise la consignation et la déconsignation, délivre l'attestation de consignation."],
            ["BR", "Chargé d'intervention BT générale", "Dépannage, mesurage, essai, vérification, remplacement, raccordement en BT, dans la limite de 500 V alternatif (750 V continu) et 63 A alternatif (32 A continu). Travaille seul ou avec un aide. Le voisinage est inclus dans son habilitation."],
            ["BS", "Chargé d'intervention BT élémentaire", "Remplacements simples à l'identique (lampe, fusible, prise, interrupteur) et raccordement sur circuit en attente, uniquement HORS TENSION."],
            ["BE Manœuvre", "Chargé d'opération spécifique", "Manœuvre d'appareillage (réarmer un disjoncteur, manœuvrer un interrupteur) sans intervenir sur les circuits."]
          ]
        }
      },
      {
        titre: "Travaux ou interventions : deux mondes différents",
        liste: [
          "TRAVAUX (B1, B1V, B2, B2V) : opération programmée, préparée, souvent longue (installer, modifier, entretenir). Elle suit une préparation et, pour du hors tension, une CONSIGNATION faite par un BC.",
          "INTERVENTIONS BT (BR, BS) : opérations de courte durée, sur une partie limitée de l'installation, souvent en urgence (une panne). Le BR gère lui-même la mise en sécurité de son périmètre, il ne reçoit pas d'attestation de consignation d'un BC."
        ]
      },
      {
        titre: "BR : l'habilitation la plus large en basse tension",
        paragraphes: [
          "Le BR est le seul à pouvoir faire une recherche de panne en présence de tension. Il peut être assisté par un autre BR, ou par un B1/B1V qu'il désigne et surveille."
        ],
        liste: [
          "Il peut faire : dépannage, mesurage, essai, vérification, raccordement, remplacement.",
          "Son périmètre est borné : circuits alimentés en BT ou TBT, protégés contre les courts-circuits, dans la limite de 500 V en alternatif (750 V en continu) et 63 A en alternatif (32 A en continu).",
          "Il ne peut pas : travailler en haute tension, ni réaliser une consignation pour le compte d'une autre équipe (c'est le rôle du BC), ni faire des travaux d'ordre électrique programmés de grande ampleur (rôle du B2).",
          "Son habilitation englobe les prérogatives du BS et du BE Manœuvre en basse tension."
        ]
      },
      {
        titre: "Le titre d'habilitation",
        liste: [
          "C'est l'EMPLOYEUR qui habilite, pas l'organisme de formation. La formation donne une attestation de compétence ; le titre d'habilitation est signé par l'employeur.",
          "Le titre précise : le symbole, le domaine de tension, les ouvrages ou installations concernés, les éventuelles restrictions, la date de délivrance et sa durée de validité.",
          "Durée de validité : 3 ans dans le cas général, ramenée à 1 an pour les travaux sous tension. Entre deux recyclages, l'employeur assure un suivi annuel pour vérifier que l'habilitation correspond toujours aux opérations confiées.",
          "Le recyclage a pour but de maintenir les compétences : sa périodicité est décidée par l'employeur, la périodicité recommandée est de 3 ans, et elle peut être réduite en cas de pratique occasionnelle ou exceptionnelle.",
          "L'habilitation est personnelle : elle ne se prête pas et elle n'est valable que pour l'employeur qui l'a délivrée.",
          "Elle peut être suspendue, modifiée ou retirée par l'employeur (changement de fonction, inaptitude médicale, manquement à la sécurité)."
        ]
      }
    ],
    pointsCles: [
      "B = basse tension. 0 = non-électricien, 1 = exécutant, 2 = chargé de travaux.",
      "V = voisinage renforcé autorisé en BT.",
      "C = consignation, R = intervention BT générale, S = intervention élémentaire, E = opération spécifique.",
      "Le B2V reçoit l'attestation de consignation ; c'est le BC qui la délivre.",
      "Le BR est le seul autorisé à chercher une panne en présence de tension, et il inclut le voisinage.",
      "L'habilitation est délivrée par l'EMPLOYEUR, elle est nominative, et elle a une durée de validité.",
      "Validité : 3 ans en général, 1 an pour les travaux sous tension. Recyclage recommandé tous les 3 ans, avec un suivi annuel."
    ],
    piege: "Ne confondez pas l'attestation de formation (délivrée par l'organisme, elle prouve que vous avez suivi le stage et réussi l'évaluation) et le TITRE D'HABILITATION (délivré et signé par votre employeur, c'est lui qui vous autorise réellement à opérer). Autre confusion très fréquente : BS et BR. Le BS ne travaille QUE hors tension, sur des remplacements à l'identique et des raccordements sur circuit en attente ; le BR fait du dépannage complet, y compris la recherche de panne sous tension.",
    exemple: "Dans un atelier, une lampe est grillée : un agent BS peut la remplacer après avoir mis le circuit hors tension. Si le luminaire ne fonctionne toujours pas et qu'il faut mesurer la tension aux bornes, chercher d'où vient le défaut et réparer, alors il faut un BR. Et si l'on doit refaire tout le circuit d'éclairage de l'atelier pendant un arrêt de production, c'est un chantier de travaux : un BC consigne, et un B2V dirige des B1V.",
    aVerifier: [
      "Le périmètre exact inscrit sur VOTRE titre d'habilitation (ouvrages et installations concernés, restrictions éventuelles) : lui seul fait foi, la norme ne définit que le cadre général."
    ]
  },

  /* ---------------------------------------------------------------- CH 4 */
  {
    id: "ch4",
    titre: "Les zones d'environnement et le voisinage",
    icone: "zone",
    resume: "Autour d'une pièce nue sous tension, l'espace est découpé en zones. Plus on s'approche, plus le risque augmente et plus les exigences montent (habilitation, EPI, autorisation). Savoir dans quelle zone on se trouve, c'est savoir ce qu'on a le droit de faire.",
    sections: [
      {
        titre: "Le point de départ : la pièce nue sous tension",
        paragraphes: [
          "Toutes les distances se mesurent depuis la PIÈCE NUE SOUS TENSION (PNST) : un conducteur dénudé, une borne, une barre de cuivre, un jeu de barres… accessible au toucher.",
          "S'il n'y a aucune pièce nue accessible (armoire fermée, matériel sous enveloppe avec un bon indice de protection), il n'y a pas de zone de voisinage : c'est pour cela qu'on referme les capots."
        ]
      },
      {
        titre: "Les distances en BASSE TENSION",
        paragraphes: [
          "Ce sont les deux valeurs à retenir absolument pour le B1V / B2V / BR."
        ],
        tableau: {
          entetes: ["Sigle", "Nom", "Valeur en BT", "Valeur en HT"],
          lignes: [
            ["DLI", "Distance limite d'investigation", "50 m", "50 m"],
            ["DLVS", "Distance limite de voisinage simple", "3 m", "3 m si U ≤ 50 kV — 5 m si U > 50 kV"],
            ["DLVR", "Distance limite de voisinage renforcé", "0,30 m", "2 m en HTA (1 à 50 kV), 3 m de 50 à 250 kV, 4 m de 250 à 500 kV"],
            ["DMA", "Distance minimale d'approche", "0,30 m (confondue avec la DLVR)", "distance de tension + 0,50 m de distance de garde"]
          ]
        }
      },
      {
        titre: "Les zones, de la plus éloignée à la plus proche",
        paragraphes: [
          "Point crucial : la numérotation n'est pas la même en BT et en HT. La BASSE TENSION n'a que TROIS zones (0, 1 et 4). La HAUTE TENSION en a quatre (0, 1, 2 et 3). Il n'existe donc PAS de zone 2 ni de zone 3 en basse tension, et PAS de zone 4 en haute tension."
        ],
        liste: [
          "ZONE 0 — zone d'investigation (BT et HT) : entre la DLI (50 m) et la DLVS. Au-delà de 50 m, aucune prescription liée au risque électrique ne s'applique. Dans la zone 0, on prépare, on repère, on identifie l'ouvrage — typiquement autour d'une ligne aérienne.",
          "ZONE 1 — voisinage simple (BT et HT) : entre la DLVS et la DLVR. En BT, c'est donc de 3 m jusqu'à 30 cm de la pièce nue.",
          "ZONE 4 — voisinage renforcé en BASSE TENSION : de la DLVR (30 cm) jusqu'au contact avec la pièce nue. C'est ICI qu'il faut l'habilitation avec la lettre V (B1V, B2V) ou être BR.",
          "ZONE 2 — voisinage renforcé en HAUTE TENSION : entre la DLVR et la DMA.",
          "ZONE 3 — travaux sous tension en HAUTE TENSION : à l'intérieur de la DMA, au contact de l'ouvrage. Réservée aux opérateurs TST spécialement formés — ce n'est pas votre domaine avec une habilitation B."
        ]
      },
      {
        titre: "Ce que chaque zone autorise en basse tension",
        tableau: {
          entetes: ["Où je suis", "Ce qu'il me faut"],
          lignes: [
            ["Au-delà de 3 m d'une pièce nue sous tension", "Pas de voisinage : pas d'exigence particulière liée au voisinage électrique."],
            ["Entre 3 m et 0,30 m (voisinage simple)", "Être informé du risque ; pour un non-électricien qui travaille là, habilitation B0 et surveillance selon le cas."],
            ["Moins de 0,30 m (voisinage renforcé, zone 4 BT)", "Habilitation B1V / B2V / BR, EPI adaptés (gants isolants, écran facial), instruction de sécurité, et si possible pose d'un écran ou d'une nappe isolante."]
          ]
        }
      },
      {
        titre: "Les locaux réservés aux électriciens",
        liste: [
          "Ce sont les locaux dont l'accès est réservé parce qu'on y trouve des pièces nues sous tension accessibles : poste de livraison, local TGBT, armoires ouvertes.",
          "La porte doit porter la signalisation de danger électrique, rester fermée et si possible verrouillée.",
          "Y pénétrer demande une habilitation (au minimum B0 pour un non-électricien) ou une autorisation d'accès accompagnée."
        ]
      },
      {
        titre: "Comment supprimer le voisinage plutôt que le subir",
        paragraphes: [
          "La meilleure parade, c'est de faire disparaître le risque. Dans l'ordre de préférence :"
        ],
        liste: [
          "Mettre hors tension et consigner : plus de pièce nue sous tension, plus de zone de voisinage.",
          "Isoler la pièce nue : nappe isolante, protecteur, capot remis en place, écran.",
          "Éloigner : baliser, délimiter, mettre des banderoles pour empêcher l'approche.",
          "En dernier recours seulement : travailler au voisinage, avec l'habilitation V, les EPI et une instruction de sécurité écrite."
        ]
      }
    ],
    pointsCles: [
      "Toutes les distances partent de la pièce NUE sous tension.",
      "En BT : DLI = 50 m, DLVS = 3 m, DLVR = DMA = 0,30 m.",
      "La zone 4 en BT (moins de 30 cm) exige la lettre V ou une habilitation BR.",
      "La zone 1 est le voisinage simple, la zone 0 la zone d'investigation (entre 50 m et la DLVS).",
      "La BT n'a que 3 zones : 0, 1 et 4. La HT en a 4 : 0, 1, 2 et 3.",
      "En HT : zone 2 = voisinage renforcé, zone 3 = travaux sous tension. DLVR = 2 m en HTA.",
      "Pas de pièce nue accessible = pas de zone de voisinage : refermez les capots.",
      "On préfère toujours supprimer le voisinage (consigner, isoler, baliser) plutôt que travailler dedans."
    ],
    piege: "La numérotation des zones est LE piège de ce chapitre. Beaucoup croient qu'elle est croissante avec la proximité : c'est faux. En basse tension on saute de la zone 1 directement à la zone 4, et les zones 2 et 3 n'existent pas en BT (ce sont les zones proches de la HAUTE tension : 2 = voisinage renforcé HT, 3 = travaux sous tension HT). Symétriquement, la zone 4 n'existe pas en HT. Second piège : on mesure la distance par rapport à la PIÈCE NUE SOUS TENSION, pas par rapport à l'armoire ou à la porte du local. Troisième piège : au-delà de la DLI (50 m), il n'y a plus AUCUNE prescription liée au risque électrique — la zone 0 est entre 50 m et la DLVS, pas au-delà de 50 m.",
    exemple: "Vous devez faire un relevé de température par caméra thermique sur un jeu de barres dans un TGBT. La porte de l'armoire est ouverte, les barres sont nues. Si vous restez à plus de 30 cm des barres, vous êtes en voisinage simple. Si vous approchez la caméra à 15 cm pour cadrer une borne, vous entrez en zone 4 BT : il faut l'habilitation avec V (ou BR), les gants isolants, l'écran facial, et l'accord du chargé d'exploitation.",
    aVerifier: [
      "La DMA en haute tension se calcule (distance de tension liée au niveau de tension + 0,50 m de distance de garde) : elle vaut environ 0,60 m en HTA 20 kV, mais demandez le tableau officiel au formateur plutôt que de retenir une valeur unique.",
      "Votre entreprise peut imposer des distances de balisage plus larges que les valeurs de la norme : vérifiez les consignes internes."
    ]
  },

  /* ---------------------------------------------------------------- CH 5 */
  {
    id: "ch5",
    titre: "La consignation et la déconsignation",
    icone: "lock",
    resume: "Consigner, c'est mettre une installation dans un état tel qu'il est IMPOSSIBLE qu'elle se retrouve sous tension pendant les travaux. Quatre opérations, toujours dans le même ordre, réalisées par le chargé de consignation (BC).",
    sections: [
      {
        titre: "Les quatre étapes, dans l'ordre",
        paragraphes: [
          "Un moyen de retenir l'ordre : SÉ-CO-I-VÉ (Séparer, Condamner, Identifier, Vérifier)."
        ],
        liste: [
          "1 — SÉPARATION de toutes les sources de tension. La coupure doit être certaine : soit pleinement apparente (on VOIT les contacts ouverts, on voit le fusible retiré, la prise débranchée), soit matérialisée par un dispositif fiable (indicateur de position mécanique lié aux contacts). Attention aux sources multiples : deuxième arrivée, groupe électrogène, onduleur, batteries, alimentation de commande venant d'une autre armoire.",
          "2 — CONDAMNATION en position d'ouverture. On immobilise l'organe de coupure avec un dispositif qui nécessite un outil ou une clé pour être retiré : cadenas de consignation. Et on SIGNALE par une pancarte lisible (« Consigné — ne pas manœuvrer », avec le nom de l'intervenant). Un cadenas sans pancarte ou une pancarte sans cadenas : condamnation incomplète.",
          "3 — IDENTIFICATION de l'ouvrage ou de l'installation. Il faut être certain qu'on travaille bien sur le bon matériel : lecture des schémas, repérage des étiquettes, suivi du câble, contrôle du numéro de départ. C'est l'étape qui évite d'intervenir sur l'armoire voisine encore alimentée.",
          "4 — VÉRIFICATION D'ABSENCE DE TENSION (VAT) sur le lieu de travail, suivie IMMÉDIATEMENT de la mise à la terre et en court-circuit (MALT + CC) là où elle est requise."
        ]
      },
      {
        titre: "La VAT : le geste qui ne se délègue pas",
        liste: [
          "On utilise un vérificateur d'absence de tension (VAT) conçu pour ça, conforme et adapté au domaine de tension. PAS un multimètre : un multimètre peut afficher 0 V parce qu'un fusible interne a fondu ou parce qu'il est sur le mauvais calibre.",
          "On vérifie le bon fonctionnement du VAT AVANT l'essai et APRÈS l'essai (autotest intégré ou source de contrôle). Si on ne le teste qu'avant, un VAT qui tombe en panne pendant la mesure vous laisse croire à une absence de tension.",
          "On teste TOUS les conducteurs entre eux et par rapport à la terre : chaque phase entre elles, chaque phase avec le neutre, chaque phase avec la terre, et le neutre avec la terre. Le neutre peut être sous tension (neutre coupé, erreur de câblage, retour par un autre circuit).",
          "La VAT n'est valable qu'à l'INSTANT où elle est faite et à l'ENDROIT où elle est faite. Si vous quittez le chantier et revenez, ou si vous changez de point de travail, vous refaites la VAT.",
          "On porte les EPI pendant la VAT : à ce moment-là, on considère encore le matériel comme étant sous tension."
        ]
      },
      {
        titre: "La mise à la terre et en court-circuit (MALT + CC)",
        paragraphes: [
          "Elle sert à écouler une éventuelle réalimentation ou une tension induite, et à décharger les capacités des câbles. Elle est systématique en haute tension."
        ],
        liste: [
          "En basse tension, elle est requise notamment en cas de risque de réalimentation, de tension induite (câble cheminant à côté d'un autre circuit), ou sur des câbles de grande longueur.",
          "Elle se pose IMMÉDIATEMENT après la VAT : toute attente entre les deux rouvre le risque.",
          "On raccorde toujours la terre d'abord, puis les conducteurs actifs. Au retrait, on fait l'inverse."
        ]
      },
      {
        titre: "Consignation en une ou deux étapes",
        liste: [
          "EN UNE ÉTAPE : le BC réalise les quatre opérations, puis remet au chargé de travaux (B2 / B2V) l'ATTESTATION DE CONSIGNATION. Le chargé de travaux peut faire travailler son équipe.",
          "EN DEUX ÉTAPES : le BC réalise la séparation et la condamnation, puis remet une ATTESTATION DE PREMIÈRE ÉTAPE DE CONSIGNATION au chargé de travaux. C'est ensuite le chargé de travaux (habilité en conséquence) qui réalise l'identification et la VAT, et la MALT/CC si nécessaire, sur le lieu de travail.",
          "Ce découpage est pratique quand le point de coupure est loin du lieu de travail (une armoire dans un autre bâtiment)."
        ]
      },
      {
        titre: "La déconsignation : l'ordre inverse, et jamais dans la précipitation",
        liste: [
          "Avant tout : s'assurer que les travaux sont terminés, que le personnel est retiré de la zone, que le matériel est en état de fonctionner, que les protections et capots sont remis en place, et que le balisage est retiré.",
          "Le chargé de travaux remet l'AVIS DE FIN DE TRAVAIL au chargé de consignation (ou au chargé d'exploitation électrique). À partir de cet instant, il n'a plus le droit de faire travailler son équipe sur l'ouvrage.",
          "Le BC retire les MALT et CC, puis la condamnation (cadenas et pancarte), puis referme l'organe de séparation pour remettre sous tension.",
          "Règle d'or : celui qui a posé son cadenas est le seul à le retirer. On ne retire jamais le cadenas d'un collègue, même « pour gagner du temps »."
        ]
      }
    ],
    pointsCles: [
      "Ordre imposé : SÉPARATION → CONDAMNATION → IDENTIFICATION → VÉRIFICATION D'ABSENCE DE TENSION.",
      "La condamnation = immobilisation (cadenas) + signalisation (pancarte). Les deux, pas l'un ou l'autre.",
      "La VAT se fait avec un VAT, jamais avec un multimètre, et on teste l'appareil avant ET après.",
      "La VAT est valable ici et maintenant : on la refait si on revient ou si on change d'endroit.",
      "La MALT + CC se pose immédiatement après la VAT quand elle est requise.",
      "Le BC délivre l'attestation de consignation ; le chargé de travaux rend l'avis de fin de travail.",
      "Un seul propriétaire par cadenas : chacun retire le sien."
    ],
    piege: "Le piège classique est l'ORDRE des étapes, et plus précisément la place de l'identification : beaucoup la placent en premier « puisqu'il faut savoir sur quoi on travaille ». Dans la consignation, l'identification arrive en TROISIÈME position, après la séparation et la condamnation. Autre piège redoutable : penser que la VAT dispense de porter les EPI, ou qu'une VAT faite le matin vaut encore l'après-midi.",
    exemple: "On vous demande de remplacer un moteur de convoyeur. Vous coupez le sectionneur de l'armoire du convoyeur, cadenas + pancarte à votre nom, vous identifiez le bon départ sur le schéma, puis vous faites la VAT aux bornes du moteur. Tout est à zéro. MAIS le convoyeur est aussi équipé d'un frein alimenté depuis une seconde armoire, et d'un variateur avec des condensateurs qui restent chargés plusieurs minutes. La séparation de TOUTES les sources et le respect du temps de décharge du variateur font partie de la consignation : une seule coupure ne suffisait pas.",
    aVerifier: [
      "Les cas précis où la MALT + CC est obligatoire en basse tension, et le temps de décharge à respecter sur les variateurs et onduleurs de votre parc : ces règles dépendent de l'installation, demandez les consignes de votre entreprise et l'avis du formateur."
    ]
  },

  /* ---------------------------------------------------------------- CH 6 */
  {
    id: "ch6",
    titre: "Les protections individuelles et collectives",
    icone: "shield",
    resume: "Un EPI protège UNE personne, un EPC protège TOUT LE MONDE dans la zone. La règle est simple : on cherche d'abord la protection collective, l'EPI vient compléter ce qu'on n'a pas pu supprimer. Et un EPI non vérifié est un EPI dangereux, car il donne un faux sentiment de sécurité.",
    sections: [
      {
        titre: "Les EPI de l'électricien basse tension",
        liste: [
          "GANTS ISOLANTS adaptés au domaine de tension (la classe est marquée sur le gant, norme NF EN 60903 / NF EN 50321-1). En basse tension : classe 00 jusqu'à 500 V, classe 0 jusqu'à 1 000 V. Au-dessus, classes 1 à 4 pour la haute tension (classe 4 jusqu'à 36 kV). Ils se portent dès qu'il y a un risque de contact avec une pièce nue sous tension, et pendant la VAT.",
          "ÉCRAN FACIAL ou visière anti-UV : protège des projections de métal en fusion et du rayonnement d'un arc électrique (protection des yeux contre l'ophtalmie).",
          "CASQUE ISOLANT avec jugulaire : protège du choc, de la chute d'objet et du contact avec une pièce sous tension au-dessus de la tête. La jugulaire évite qu'il tombe quand on se penche dans une armoire.",
          "VÊTEMENTS DE TRAVAIL adaptés : manches longues, matière qui ne fond pas sur la peau. On évite le synthétique nu, qui fond et colle en cas d'arc.",
          "CHAUSSURES ou bottes de sécurité isolantes.",
          "GANTS DE MANUTENTION en cuir par-dessus les gants isolants quand il y a un risque de déchirure mécanique."
        ]
      },
      {
        titre: "La vérification AVANT CHAQUE USAGE",
        paragraphes: [
          "C'est un réflexe à automatiser, et c'est très souvent demandé à l'examen."
        ],
        liste: [
          "GANTS ISOLANTS : contrôle visuel (coupure, craquelure, trace de brûlure, produit chimique) PUIS essai d'étanchéité en les roulant ou en les gonflant à l'air pour détecter un trou. On vérifie aussi la classe et la date de la dernière vérification périodique : l'essai diélectrique en laboratoire se fait tous les 6 MOIS, et le délai maximal entre la fabrication et la première mise en service est également de 6 mois.",
          "Un gant qui a touché un hydrocarbure, un solvant ou une source de chaleur excessive est éliminé IMMÉDIATEMENT, quel que soit son aspect : la dégradation du caoutchouc ne se voit pas.",
          "Les gants se rangent dans leur étui ou leur boîte, à plat, à l'abri de la chaleur, du soleil, de l'huile et des solvants. On ne les met pas en boule au fond de la caisse à outils avec les tournevis.",
          "VAT : autotest ou essai sur source connue avant ET après la mesure, état des pointes de touche et des câbles, pile.",
          "OUTILS ISOLÉS : isolant intact jusqu'à la lame, pas de manche fendu, marquage 1000 V (double triangle). Un tournevis dont l'isolant est entaillé part à la poubelle.",
          "ÉCRAN FACIAL : pas de rayure profonde qui gêne la vision, pas de fissure.",
          "Tout EPI douteux est mis hors service et signalé : on ne le repose pas dans l'armoire « en attendant »."
        ]
      },
      {
        titre: "Les protections collectives (EPC)",
        liste: [
          "NAPPES ET PROTECTEURS ISOLANTS : on les pose sur les pièces nues qu'on ne peut pas mettre hors tension, pour supprimer le risque de contact.",
          "ÉCRANS et OBSTACLES : empêchent physiquement d'atteindre la partie sous tension.",
          "BALISAGE : banderoles, barrières, cônes, rubans pour délimiter la zone de travail et empêcher qu'un tiers s'approche.",
          "SIGNALISATION : pancartes de consignation, panneaux de danger électrique, affichage à l'entrée du local.",
          "CADENAS ET DISPOSITIFS DE CONDAMNATION : ils protègent tout le monde en interdisant la remise sous tension.",
          "CAPOTS, PLASTRONS ET ENVELOPPES remis en place : le meilleur EPC, et le moins cher."
        ]
      },
      {
        titre: "L'ordre des priorités",
        paragraphes: [
          "On applique toujours le même raisonnement, du plus efficace au moins efficace :"
        ],
        liste: [
          "1 — SUPPRIMER le risque : mettre hors tension et consigner.",
          "2 — PROTÉGER COLLECTIVEMENT : isoler la pièce nue, poser un écran, baliser.",
          "3 — PROTÉGER INDIVIDUELLEMENT : EPI, en complément de ce qui précède.",
          "4 — INFORMER ET FORMER : instruction de sécurité, habilitation, consignes.",
          "L'EPI n'est donc jamais la première réponse. Il est le dernier rempart."
        ]
      },
      {
        titre: "L'outillage et les accessoires indispensables du BR",
        liste: [
          "VAT adapté à la tension mesurée.",
          "Outils isolés (tournevis, pinces) marqués pour le travail en basse tension.",
          "Nappe isolante, protecteurs de barres, tapis isolant.",
          "Cadenas de consignation personnel + pancartes.",
          "Lampe frontale ou baladeuse : une armoire mal éclairée est une armoire dangereuse.",
          "Multimètre pour les MESURES (jamais pour la VAT), avec des cordons en bon état et un calibre adapté."
        ]
      }
    ],
    pointsCles: [
      "EPI = une personne. EPC = toute la zone. On privilégie toujours le collectif.",
      "Ordre des priorités : supprimer le risque, protéger collectivement, puis EPI, puis informer.",
      "Les gants isolants se vérifient à chaque usage : visuel + essai d'étanchéité (gonflage), et on contrôle leur classe.",
      "Classes de gants BT : 00 jusqu'à 500 V, 0 jusqu'à 1 000 V. Essai diélectrique périodique tous les 6 mois.",
      "Le VAT se teste avant ET après la vérification d'absence de tension.",
      "Outils isolés : marquage double triangle, isolant intact — sinon rebut.",
      "Un EPI douteux est retiré du service et signalé immédiatement.",
      "Un capot remis en place supprime la zone de voisinage : c'est la protection la plus simple."
    ],
    piege: "Deux erreurs très pénalisées. La première : dire qu'on met les gants isolants « pour travailler sous tension » seulement — on les porte aussi pendant la VAT et dès qu'on est en voisinage renforcé, car à ce moment on considère encore l'installation comme sous tension. La seconde : confondre la vérification AVANT USAGE (visuelle + gonflage, faite par vous, à chaque fois) avec la VÉRIFICATION PÉRIODIQUE (faite par un organisme ou un service compétent, avec un essai diélectrique, à intervalles réglementés).",
    exemple: "Vous partez dépanner une armoire 400 V. Vous sortez les gants de la caisse : l'un a une petite trace noire sur l'index. Vous le gonflez : il se dégonfle lentement. Il est percé, il part au rebut et vous en prenez une autre paire — pas question de s'en servir « juste pour une mesure rapide ». Avant d'intervenir, vous posez aussi une nappe isolante sur le jeu de barres que vous n'avez pas pu mettre hors tension et vous balisez devant l'armoire : voilà l'EPC avant l'EPI.",
    aVerifier: [
      "La périodicité de vérification des autres EPI de votre entreprise (VAT, écrans, tapis, outillage) : elle dépend du matériel et des consignes internes, demandez le tableau de suivi de votre site."
    ]
  },

  /* ---------------------------------------------------------------- CH 7 */
  {
    id: "ch7",
    titre: "Les interventions BR",
    icone: "tool",
    resume: "L'intervention BT générale est le cœur du métier du BR : une opération courte, sur une partie limitée de l'installation, en basse tension. Le BR est autonome : il prépare, il sécurise lui-même son périmètre, il opère, il vérifie et il rend compte.",
    sections: [
      {
        titre: "Les cinq types d'opérations du BR",
        liste: [
          "DÉPANNAGE : remettre en état de fonctionnement une installation en panne (c'est l'opération la plus complète, elle contient souvent toutes les autres).",
          "REMPLACEMENT : changer un composant défaillant (fusible, lampe, contacteur, relais, borne) — normalement à l'identique.",
          "RACCORDEMENT : raccorder ou déraccorder un matériel sur un circuit prévu à cet effet (circuit en attente, bornier de réserve).",
          "MESURAGE : mesurer une grandeur électrique (tension, courant, résistance d'isolement, continuité).",
          "ESSAI ET VÉRIFICATION : contrôler le bon fonctionnement, valider une remise en service."
        ]
      },
      {
        titre: "Le déroulement d'un dépannage, dans l'ordre",
        liste: [
          "1 — PRÉPARATION / ANALYSE : prendre connaissance de la demande, se faire préciser le symptôme, consulter les schémas, identifier le matériel et son domaine de tension, évaluer les risques, vérifier son habilitation et l'autorisation du chargé d'exploitation.",
          "2 — RECHERCHE DE LA PANNE : c'est la seule phase où le BR peut être amené à opérer EN PRÉSENCE DE TENSION, parce qu'il faut bien mesurer sur une installation vivante pour localiser le défaut. EPI obligatoires, outils isolés, une seule main dans l'armoire quand c'est possible, et on ne touche qu'un point à la fois.",
          "3 — MISE EN SÉCURITÉ avant la réparation : pour éliminer la panne, on repasse HORS TENSION sur son périmètre. Le BR réalise lui-même la séparation, la condamnation, l'identification et la VAT sur la partie concernée.",
          "4 — ÉLIMINATION DE LA PANNE : la réparation ou le remplacement, hors tension.",
          "5 — ESSAIS ET REMISE EN SERVICE : remettre les capots et protections, retirer le balisage, remettre sous tension, vérifier le bon fonctionnement.",
          "6 — COMPTE RENDU : informer le demandeur et le chargé d'exploitation, consigner l'intervention par écrit (nature de la panne, pièce changée, anomalie constatée)."
        ]
      },
      {
        titre: "Avant d'ouvrir l'armoire : les questions à se poser",
        liste: [
          "Suis-je habilité pour cette opération et ce domaine de tension ?",
          "Ai-je l'autorisation du chargé d'exploitation électrique ?",
          "Y a-t-il des pièces nues sous tension accessibles ? Suis-je alors en voisinage renforcé ?",
          "Y a-t-il plusieurs sources d'alimentation (deuxième arrivée, onduleur, variateur avec condensateurs, batteries) ?",
          "Mon éclairage est-il suffisant ? Ai-je la place pour travailler sans être en appui sur du métal ?",
          "Suis-je seul ? Quelqu'un sait-il où je suis et peut-il donner l'alerte ?",
          "Mes EPI sont-ils vérifiés, mes outils isolés en bon état, mon VAT testé ?"
        ]
      },
      {
        titre: "Les règles de prudence pendant l'opération sous tension",
        liste: [
          "Retirer bagues, montre, bracelets, chaîne : un bijou métallique fait un court-circuit parfait.",
          "Travailler autant que possible d'une seule main, l'autre main hors de l'armoire, pour éviter le trajet main-main à travers le thorax.",
          "Isoler les parties voisines sous tension avec une nappe ou un protecteur avant d'approcher les outils.",
          "Ne jamais travailler sous tension sur un sol mouillé ou en position instable.",
          "Repérer et étiqueter les fils avant de les débrancher : un fil remis au mauvais endroit crée un danger pour le suivant.",
          "Ne pas court-circuiter une protection ni ponter un dispositif de sécurité pour « voir si ça marche »."
        ]
      },
      {
        titre: "Les limites du BR",
        liste: [
          "Basse tension uniquement : aucun droit en haute tension.",
          "Circuits bornés : alimentés en BT ou TBT, protégés contre les courts-circuits, et dans la limite de 500 V en alternatif (750 V en continu) et 63 A en alternatif (32 A en continu).",
          "Périmètre limité à l'installation ou à la partie d'installation concernée par l'intervention.",
          "Le BR ne réalise pas la consignation pour le compte d'une équipe de travaux : c'est le rôle du BC.",
          "Il peut se faire assister par un autre BR ou par un exécutant B1/B1V, qu'il désigne, informe et surveille — l'assistant reste sous sa responsabilité.",
          "Le remplacement se fait normalement à l'identique. Changer un calibre de protection, modifier un schéma ou ajouter un départ, ce n'est plus une intervention : c'est un travail de modification."
        ]
      },
      {
        titre: "Le cas du remplacement de fusible",
        paragraphes: [
          "C'est un classique du terrain et de l'examen. Un fusible qui a fondu a fondu pour une raison : le remplacer sans chercher pourquoi, c'est préparer le prochain incident."
        ],
        liste: [
          "Le remplacement se fait hors tension, avec un fusible de même calibre et de même type.",
          "On recherche la cause de la fusion avant de remettre en service.",
          "Si le fusible refond immédiatement, on arrête et on cherche le défaut : on ne met pas un calibre supérieur."
        ]
      }
    ],
    pointsCles: [
      "Cinq opérations du BR : dépannage, remplacement, raccordement, mesurage, essai / vérification.",
      "Le BR est le seul à pouvoir faire une RECHERCHE de panne en présence de tension.",
      "La RÉPARATION, elle, se fait hors tension : le BR fait sa propre mise en sécurité (séparation, condamnation, identification, VAT).",
      "Ordre d'un dépannage : préparation → recherche → mise hors tension → réparation → essais et remise en service → compte rendu.",
      "Une seule main dans l'armoire, bijoux retirés, parties voisines isolées.",
      "Un remplacement se fait à l'identique ; sinon c'est une modification, donc un travail.",
      "Toute intervention se termine par un compte rendu."
    ],
    piege: "Le piège majeur : croire que « BR = je peux tout faire sous tension ». Non. La présence de tension est tolérée pour la phase de RECHERCHE de panne et pour les mesurages, parce qu'on ne peut pas faire autrement. Dès qu'il s'agit de RÉPARER, de remplacer une pièce ou de raccorder, on repasse hors tension. Autre piège fréquent : oublier le compte rendu et la remise en place des capots, qui font partie intégrante de l'intervention.",
    exemple: "Tu dois remplacer un contacteur qui ne colle plus dans une armoire 400 V. Tu ne te jettes pas sur le contacteur : tu préviens le responsable de l'atelier et le chargé d'exploitation, tu regardes le schéma, tu mets tes EPI. Tu mesures sous tension la bobine et sa commande pour confirmer que c'est bien le contacteur et pas le relais en amont — c'est la recherche de panne. Le diagnostic posé, tu ouvres le sectionneur du départ, tu poses ton cadenas et ta pancarte, tu identifies le bon départ, tu fais ta VAT aux bornes du contacteur, et seulement là tu le démontes. Tu remontes le neuf, tu remets le capot, tu retires ton cadenas, tu remets sous tension, tu vérifies que ça colle, et tu écris ton compte rendu.",
    aVerifier: [
      "Les cas où votre entreprise interdit purement et simplement le travail en présence de tension, même pour une recherche de panne : beaucoup de sites sont plus stricts que la norme, voir les consignes internes.",
      "Le temps de décharge à respecter sur les variateurs et onduleurs de votre parc : il est propre à chaque matériel, il figure sur la plaque ou dans la notice."
    ]
  },

  /* ---------------------------------------------------------------- CH 8 */
  {
    id: "ch8",
    titre: "Accident et incendie d'origine électrique",
    icone: "pulse",
    resume: "Face à une victime du courant, le premier réflexe naturel — se précipiter pour la tirer — est celui qui fait deux victimes au lieu d'une. La conduite à tenir tient en trois mots dans l'ordre : PROTÉGER, ALERTER, SECOURIR.",
    sections: [
      {
        titre: "1 — PROTÉGER : supprimer le courant avant de toucher",
        liste: [
          "COUPER l'alimentation : disjoncteur, sectionneur, arrêt d'urgence, débrancher la prise. C'est toujours la meilleure solution.",
          "Si la coupure est impossible ou trop longue à atteindre : DÉGAGER la victime sans jamais la toucher directement, en s'isolant soi-même (planche sèche, manche en bois sec, corde sèche, tapis isolant sous les pieds, gants isolants).",
          "Ne JAMAIS toucher la victime à mains nues tant que le contact avec le conducteur n'est pas rompu : le corps de la victime est sous tension.",
          "En haute tension, on ne s'approche pas : il faut faire consigner l'ouvrage par l'exploitant. L'arc peut amorcer à distance.",
          "Se protéger soi-même et protéger les autres : empêcher quiconque d'entrer dans la zone, baliser."
        ]
      },
      {
        titre: "2 — ALERTER ou faire alerter",
        liste: [
          "15 — SAMU (urgence médicale).",
          "18 — Sapeurs-pompiers (secours, incendie).",
          "112 — Numéro d'urgence européen, fonctionne partout et depuis un portable sans réseau de son opérateur.",
          "114 — Urgences par SMS pour les personnes sourdes ou malentendantes.",
          "En entreprise : le numéro interne des secours, le sauveteur secouriste du travail (SST), l'infirmerie, et le responsable.",
          "Ce qu'il faut dire : qui vous êtes et d'où vous appelez (adresse précise, bâtiment, accès), ce qui s'est passé (accident électrique, tension en jeu), combien de victimes, leur état (consciente ? respire ?), et ce que vous avez déjà fait. On ne raccroche pas le premier."
        ]
      },
      {
        titre: "3 — SECOURIR dans la limite de ses compétences",
        liste: [
          "La victime est consciente et respire : on la laisse au repos, on la couvre, on la surveille, on ne la laisse pas partir seule. Consultation médicale OBLIGATOIRE, même si elle se sent bien : les brûlures internes et les troubles du rythme cardiaque peuvent apparaître plus tard.",
          "La victime est inconsciente mais respire : position latérale de sécurité, surveillance de la respiration.",
          "La victime ne respire pas : alerte immédiate, massage cardiaque et ventilation si on est formé, et mise en œuvre du DÉFIBRILLATEUR (DAE) dès qu'il est disponible — la fibrillation ventriculaire est exactement ce que le défibrillateur sait traiter.",
          "Brûlure : arroser à l'eau tempérée si la coupure du courant est effective, ne pas retirer les vêtements collés à la peau, ne rien appliquer sur la brûlure.",
          "Coup d'arc dans les yeux : ne pas frotter, protéger de la lumière, consultation ophtalmologique."
        ]
      },
      {
        titre: "L'incendie d'origine électrique",
        liste: [
          "Si c'est possible et sans danger : COUPER l'alimentation électrique. Un feu électrique qui reste alimenté se rallume et le risque d'électrisation persiste pour ceux qui attaquent le feu.",
          "Donner l'alerte et faire évacuer.",
          "Attaquer le feu uniquement s'il est naissant, si on est formé, et avec un extincteur ADAPTÉ : CO2 (dioxyde de carbone) ou poudre. Le CO2 a l'avantage de ne pas détériorer le matériel électronique.",
          "JAMAIS d'eau en jet plein sur une installation sous tension : l'eau est conductrice, le jet ramène la tension jusqu'à vous. Même remarque pour la mousse.",
          "Avec un extincteur CO2 : attention au givre sur le diffuseur (risque de gelure aux mains) et à l'atmosphère dans un local fermé (le CO2 chasse l'oxygène) — on n'enferme pas le porte-lance.",
          "Dans un local haute tension en feu, on n'entre pas : on attend les pompiers et l'exploitant.",
          "Après le sinistre, on ne remet pas sous tension : l'installation doit être vérifiée."
        ]
      },
      {
        titre: "Le réflexe à graver",
        paragraphes: [
          "PROTÉGER — ALERTER — SECOURIR. Dans cet ordre. Et dans les trois cas, on ne s'improvise pas : on agit dans la limite de sa formation. Tout accident, même sans blessure apparente (« j'ai juste pris une châtaigne »), doit être déclaré : c'est ce qui permet de corriger l'installation avant le prochain."
        ]
      }
    ],
    pointsCles: [
      "PROTÉGER, ALERTER, SECOURIR — toujours dans cet ordre.",
      "On coupe le courant AVANT de toucher la victime ; sinon on la dégage avec un isolant sec, jamais à mains nues.",
      "Numéros : 15 SAMU, 18 pompiers, 112 européen, 114 par SMS.",
      "Toute victime d'électrisation voit un médecin, même si elle se sent bien.",
      "Victime qui ne respire pas : massage cardiaque + défibrillateur au plus vite.",
      "Feu électrique : couper l'alimentation, extincteur CO2 ou poudre, JAMAIS d'eau en jet.",
      "Tout accident ou presque-accident se déclare."
    ],
    piege: "Le piège numéro un, c'est l'ordre : beaucoup répondent « j'appelle les secours » en premier. Non : on PROTÈGE d'abord (couper le courant), sinon les secours trouveront deux victimes. Le piège numéro deux : penser qu'une personne qui a pris une décharge et qui va bien n'a pas besoin de médecin — les troubles du rythme cardiaque peuvent survenir plusieurs heures après. Le piège numéro trois : l'extincteur à eau sur un tableau électrique.",
    exemple: "Un collègue s'effondre devant un tableau, la main crispée sur un câble. Vous ne le tirez pas par le bras : vous cherchez du regard l'arrêt d'urgence ou le disjoncteur général, vous coupez. Vous criez pour faire venir quelqu'un qui appellera le 18 pendant que vous vous occupez de lui. Puis vous regardez s'il respire, vous le mettez en PLS ou vous démarrez le massage cardiaque, et vous envoyez chercher le défibrillateur qui est dans le couloir de l'atelier.",
    aVerifier: [
      "Les distances minimales à respecter avec un extincteur selon le type d'extincteur et le domaine de tension : demandez les valeurs exactes au formateur, elles figurent sur les consignes de votre site."
    ]
  },

  /* ---------------------------------------------------------------- CH 9 */
  {
    id: "ch9",
    titre: "Les documents",
    icone: "file",
    resume: "Les documents matérialisent le transfert de responsabilité entre les acteurs. Savoir QUI délivre QUOI et À QUI, c'est comprendre qui est responsable de la sécurité à chaque instant. Un document oublié, c'est une responsabilité dans le flou.",
    sections: [
      {
        titre: "Les documents de la consignation",
        tableau: {
          entetes: ["Document", "Délivré par", "Remis à", "À quoi ça sert"],
          lignes: [
            ["Attestation de consignation pour travaux", "Chargé de consignation (BC)", "Chargé de travaux (B2 / B2V)", "Atteste que les 4 étapes sont faites : le chargé de travaux peut engager son équipe."],
            ["Attestation de première étape de consignation", "Chargé de consignation (BC)", "Chargé de travaux", "Séparation + condamnation faites ; le chargé de travaux devra réaliser lui-même l'identification et la VAT."],
            ["Avis de fin de travail", "Chargé de travaux", "Chargé de consignation / chargé d'exploitation", "Les travaux sont terminés, le personnel est retiré : la remise sous tension devient possible."],
            ["Attestation de consignation pour essais", "Chargé de consignation", "Chargé d'essais (B2V Essai)", "Encadre les essais, avec des remises sous tension successives maîtrisées."]
          ]
        }
      },
      {
        titre: "Les documents d'autorisation et d'accès",
        liste: [
          "AUTORISATION DE TRAVAIL : délivrée par le chargé d'exploitation électrique, elle autorise une opération sur un ouvrage qu'il exploite (elle précise l'ouvrage, la nature de l'opération, les limites, les mesures de sécurité).",
          "AUTORISATION D'ACCÈS aux locaux réservés aux électriciens : permet d'entrer dans un local à risque électrique.",
          "INSTRUCTION DE SÉCURITÉ : document écrit qui précise les mesures à respecter pour une opération particulière, notamment pour un travail au voisinage.",
          "CERTIFICAT POUR TIERS : quand une entreprise extérieure intervient à proximité d'un ouvrage, ce document lui indique les précautions à prendre.",
          "PLAN DE PRÉVENTION : établi entre l'entreprise utilisatrice et l'entreprise extérieure, il recense les risques liés à la coactivité."
        ]
      },
      {
        titre: "Le titre d'habilitation",
        liste: [
          "Délivré, daté et signé par L'EMPLOYEUR, et signé également par la personne habilitée.",
          "Il mentionne : l'identité du titulaire et de l'employeur, le ou les symboles d'habilitation, le domaine de tension, les ouvrages ou installations concernés, les indications supplémentaires ou restrictions, la date de délivrance et la durée de validité.",
          "Il est personnel, il doit pouvoir être présenté, et il n'est valable que chez l'employeur qui l'a délivré.",
          "Il est précédé d'une formation (théorique et pratique) et d'un avis médical d'aptitude.",
          "Sa validité est de 3 ans dans le cas général (1 an pour les travaux sous tension), avec un suivi annuel par l'employeur et un recyclage dont la périodicité recommandée est de 3 ans."
        ]
      },
      {
        titre: "Les autres écrits du quotidien",
        liste: [
          "SCHÉMAS ÉLECTRIQUES à jour : indispensables pour l'identification lors d'une consignation. Un schéma faux est un piège.",
          "REGISTRE / CARNET DE BORD des interventions : trace ce qui a été fait, par qui, quand.",
          "COMPTE RENDU D'INTERVENTION : obligation du BR à la fin de son dépannage.",
          "RAPPORTS DE VÉRIFICATION PÉRIODIQUE de l'installation et des EPI.",
          "CONSIGNES et modes opératoires internes à l'entreprise."
        ]
      },
      {
        titre: "Qui fait quoi : les rôles à ne pas mélanger",
        tableau: {
          entetes: ["Acteur", "Sa responsabilité"],
          lignes: [
            ["Employeur", "Habilite, fournit les EPI, organise la prévention, désigne les acteurs."],
            ["Chargé d'exploitation électrique", "Responsable de l'exploitation de l'ouvrage ; délivre les autorisations de travail, coordonne les accès et les remises sous tension."],
            ["Chargé de consignation (BC)", "Réalise la consignation, délivre l'attestation, effectue la déconsignation."],
            ["Chargé de travaux (B2 / B2V)", "Dirige les travaux sur le terrain, veille à la sécurité de son équipe, rend l'avis de fin de travail."],
            ["Exécutant (B1 / B1V / B0)", "Exécute ce que le chargé de travaux lui prescrit, dans les limites de son habilitation."],
            ["Chargé d'intervention (BR / BS)", "Réalise et sécurise lui-même son intervention, rend compte."],
            ["Surveillant de sécurité électrique", "Désigné quand il faut une surveillance permanente ; il ne fait que surveiller, il ne travaille pas."]
          ]
        }
      }
    ],
    pointsCles: [
      "Attestation de consignation : du BC vers le chargé de travaux.",
      "Avis de fin de travail : du chargé de travaux vers le BC ou le chargé d'exploitation.",
      "Attestation de PREMIÈRE ÉTAPE : le chargé de travaux devra faire lui-même l'identification et la VAT.",
      "L'autorisation de travail vient du chargé d'exploitation électrique.",
      "Le titre d'habilitation vient de l'EMPLOYEUR, il est nominatif et limité dans le temps.",
      "Le surveillant de sécurité électrique surveille et ne participe pas aux travaux.",
      "Le BR termine toujours par un compte rendu."
    ],
    piege: "L'erreur la plus fréquente est d'inverser le sens de circulation des documents : on écrit que le chargé de travaux délivre l'attestation de consignation, alors qu'il la REÇOIT. Retenez le sens : le BC donne l'autorisation d'y aller (attestation de consignation), le chargé de travaux rend le terrain (avis de fin de travail). Autre piège : croire que l'organisme de formation habilite — non, il forme ; l'employeur habilite.",
    exemple: "Arrêt annuel de l'usine. Le chargé d'exploitation électrique délivre l'autorisation de travail pour le remplacement d'un jeu de barres. Le BC consigne le TGBT et remet l'attestation de consignation au B2V, qui fait travailler deux B1V. En fin de journée, le B2V rassemble son équipe, retire le balisage, vérifie les capots et remet l'avis de fin de travail au BC. Tant que ce papier n'est pas signé et remis, le BC ne retire pas ses cadenas.",
    aVerifier: [
      "Les modèles de documents utilisés dans votre entreprise : ils reprennent ceux de la norme mais avec une présentation propre à chaque site.",
      "La périodicité de recyclage effectivement retenue par votre employeur : la recommandation est de 3 ans, mais il peut la réduire."
    ]
  },

  /* --------------------------------------------------------------- CH 10 */
  {
    id: "ch10",
    titre: "Comment se passe l'évaluation",
    icone: "clipboard",
    resume: "Savoir comment on va être évalué change la façon de réviser. L'évaluation comporte TOUJOURS deux parties : les savoirs (un QCM) et les savoir-faire (une mise en situation pratique). Les règles ci-dessous sont celles de la brochure INRS ED 6127, qui accompagne la norme NF C18-510.",
    sections: [
      {
        titre: "Deux évaluations, dans cet ordre",
        liste: [
          "1 — L'ÉVALUATION DES SAVOIRS : un questionnaire à choix multiple. C'est la partie théorique.",
          "2 — L'ÉVALUATION DES SAVOIR-FAIRE : une ou plusieurs situations de travail ou d'intervention, sur du matériel représentatif de celui sur lequel vous opérerez. Elle n'a lieu QU'APRÈS une évaluation positive des savoirs.",
          "Autrement dit : rater le QCM, c'est ne pas accéder à la pratique."
        ]
      },
      {
        titre: "Le QCM : les règles chiffrées",
        liste: [
          "15 questions MINIMUM.",
          "Les questions sont tirées de façon ALÉATOIRE dans une base qui contient, pour chaque thème retenu, au moins CINQ FOIS plus de questions que le nombre posé.",
          "Il faut 70 % de bonnes réponses au minimum pour valider.",
          "Le contenu et les critères de validation sont les MÊMES en formation initiale et en recyclage."
        ]
      },
      {
        titre: "Les quatre thèmes évalués",
        paragraphes: [
          "Le QCM porte notamment sur ces quatre thèmes. Deux d'entre eux ont un poids minimal imposé, ce qui vous dit où mettre l'effort de révision."
        ],
        tableau: {
          entetes: ["Thème", "Poids minimal", "Chapitres correspondants"],
          lignes: [
            ["Dangers de l'électricité", "—", "1 et 8"],
            ["Distances et zones d'environnement", "au moins 30 % des questions", "2 et 4"],
            ["Limites des opérations liées au symbole visé", "au moins 30 % des questions", "3, 5, 7 et 9"],
            ["Mesures de protection collective et individuelle", "—", "6"]
          ]
        },
        liste: [
          "D'autres thèmes peuvent s'ajouter : l'appareillage (caractéristiques, identification), les règles propres à une opération (mesurage, essai, vérification).",
          "Conséquence pratique : les zones et distances d'une part, les limites de votre symbole d'autre part, représentent à eux seuls au moins 60 % du QCM. Ce sont les deux chapitres à connaître par cœur."
        ]
      },
      {
        titre: "L'évaluation pratique : comment on est noté",
        paragraphes: [
          "L'évaluateur classe chaque geste selon trois critères seulement."
        ],
        liste: [
          "SANS ERREUR.",
          "ERREUR MINEURE : sans conséquence pour la sécurité des personnes.",
          "ERREUR MAJEURE : avec conséquence directe pour la sécurité des personnes.",
          "Critères d'acceptation : DEUX erreurs mineures au maximum, et AUCUNE erreur majeure. Une seule erreur majeure suffit à faire échouer."
        ]
      },
      {
        titre: "Les savoir-faire attendus de tous les symboles",
        liste: [
          "Identifier les risques électriques sur ou à proximité d'une installation ou d'un ouvrage (armoire, local, chantier, champ libre), savoir se déplacer et évoluer dans un environnement électrique.",
          "Avoir un comportement adapté à la situation et aux risques.",
          "Rendre compte de l'opération réalisée au chargé de chantier, de travaux, d'exploitation électrique, de consignation, ou à son employeur.",
          "En plus, pour un B1 ou B1V : respecter les consignes de sécurité pour exécuter les travaux.",
          "En plus, pour un B2 ou B2V : baliser et surveiller la zone des opérations."
        ]
      },
      {
        titre: "Avant, pendant et après l'habilitation",
        liste: [
          "AVANT : l'employeur définit ses besoins sous forme de cahier des charges (types d'opérations, organisation, matériel) pour déterminer les symboles à viser. Un avis médical d'aptitude est requis.",
          "LA FORMATION comprend obligatoirement une partie théorique ET une partie pratique. La pratique se déroule sur le lieu de travail ou dans un environnement aussi proche que possible du réel.",
          "APRÈS : le titre d'habilitation est délivré par l'employeur. Sa validité est de 3 ans dans le cas général, ramenée à 1 an pour les travaux sous tension.",
          "ENTRE DEUX RECYCLAGES : l'employeur assure un suivi annuel, pour vérifier que l'habilitation correspond toujours aux opérations confiées.",
          "LE RECYCLAGE : périodicité décidée par l'employeur, recommandation de 3 ans, réductible en cas de pratique occasionnelle ou exceptionnelle. Il reprend toutes les étapes de la démarche d'habilitation."
        ]
      },
      {
        titre: "Comment réviser en conséquence",
        liste: [
          "Visez bien au-dessus de 70 % en entraînement : le jour J, le stress fait perdre quelques points.",
          "Traitez en priorité les chapitres 2, 4 (zones et distances) et 3, 7 (limites du symbole) : c'est au moins 60 % du QCM.",
          "Les questions étant tirées au hasard, il ne sert à rien d'apprendre un ordre : entraînez-vous avec les propositions mélangées, comme dans le mode Examen de cette application.",
          "Pour la pratique, apprenez les GESTES dans l'ordre : consignation, VAT, pose des EPI, balisage, compte rendu. Une inversion d'ordre peut être comptée comme erreur majeure.",
          "N'oubliez jamais le compte rendu : c'est un savoir-faire exigé de TOUS les symboles, et c'est celui qu'on oublie le plus souvent."
        ]
      }
    ],
    pointsCles: [
      "Deux évaluations : les savoirs (QCM) puis les savoir-faire (pratique). La pratique n'a lieu qu'après un QCM réussi.",
      "QCM : 15 questions minimum, tirées au hasard, 70 % de bonnes réponses exigées.",
      "La base de questions contient au moins 5 fois plus de questions que le nombre posé, par thème.",
      "Zones et distances : au moins 30 % du QCM. Limites des opérations du symbole : au moins 30 % aussi.",
      "Pratique : 2 erreurs mineures maximum, AUCUNE erreur majeure.",
      "Savoir-faire exigés de tous : identifier les risques, se déplacer en sécurité, avoir un comportement adapté, RENDRE COMPTE.",
      "Titre valable 3 ans (1 an pour les travaux sous tension), suivi annuel, recyclage recommandé tous les 3 ans."
    ],
    piege: "Deux pièges de méthode. Le premier : réviser uniformément tous les chapitres. Les zones et distances, plus les limites de votre symbole, pèsent au moins 60 % du QCM : c'est là qu'il faut être irréprochable. Le second : croire que la pratique se juge « à peu près ». Non : une seule ERREUR MAJEURE, c'est-à-dire un geste avec conséquence directe pour la sécurité des personnes (toucher une pièce nue, sauter la VAT, oublier de condamner), suffit à faire échouer l'évaluation, même si tout le reste était parfait.",
    exemple: "En évaluation pratique, on vous demande de remplacer un disjoncteur. Vous consignez correctement, vous faites votre VAT, vous remplacez, vous remettez le capot. Vous oubliez simplement de prévenir le responsable de l'atelier que c'est terminé. Ce n'est pas un détail : « rendre compte de l'opération réalisée » est un savoir-faire exigé de TOUS les symboles d'habilitation. Selon l'évaluateur, cet oubli sera au minimum une erreur mineure.",
    aVerifier: [
      "Le nombre exact de questions et le barème retenus par VOTRE organisme de formation : la norme fixe un minimum de 15 questions et un seuil de 70 %, mais chaque organisme peut aller au-delà.",
      "La liste des savoir-faire qui seront évalués pour VOS symboles précis : elle peut être complétée selon la nature des opérations et l'environnement de votre entreprise."
    ]
  }
];

/* ==========================================================================
   1 bis. LES THÈMES D'ÉVALUATION OFFICIELS
   --------------------------------------------------------------------------
   La brochure INRS ED 6127 impose que le QCM porte sur quatre thèmes, et que
   deux d'entre eux représentent au moins 30 % des questions chacun.
   Cette table relie chaque chapitre à son thème : elle sert au mode
   « Examen officiel » pour respecter ces quotas lors du tirage au sort.
   ========================================================================== */
const THEMES = {
  dangers:     { libelle: "Dangers de l'électricité",                    chapitres: ["ch1", "ch8"], partMini: 0 },
  zones:       { libelle: "Distances et zones d'environnement",          chapitres: ["ch2", "ch4"], partMini: 0.30 },
  limites:     { libelle: "Limites des opérations liées au symbole",     chapitres: ["ch3", "ch5", "ch7", "ch9"], partMini: 0.30 },
  protections: { libelle: "Protections collectives et individuelles",    chapitres: ["ch6"], partMini: 0 },
  methode:     { libelle: "Déroulement de l'évaluation",                 chapitres: ["ch10"], partMini: 0 }
};

/** Retourne la clé de thème d'un chapitre (ou "methode" par défaut). */
function themeDuChapitre(idChapitre) {
  for (const [cle, theme] of Object.entries(THEMES)) {
    if (theme.chapitres.includes(idChapitre)) return cle;
  }
  return "methode";
}


/* ==========================================================================
   2. LES QUESTIONS
   --------------------------------------------------------------------------
   Chaque question a TOUJOURS : id (unique), chapitre (l'id d'un chapitre),
   type, enonce et explication.
   Les 7 types et leurs champs propres :

   type: "qcm"           options: [...]          reponse: 1            (un seul index)
   type: "qcm_multiple"  options: [...]          reponses: [0, 2]      (plusieurs index)
   type: "vf"            (pas d'options)         reponse: true|false
   type: "ordre"         elements: [...]         (déjà dans le BON ordre)
   type: "association"   paires: [ {gauche, droite} ]
   type: "trous"         texte: "... {{0}} ... {{1}}"  trous: [ {options:[...], reponse:0} ]
   type: "situation"     scenario: "..."  options: [...]  reponse: 2

   Les index commencent à 0 : la première option de la liste est l'index 0.
   ========================================================================== */
const QUESTIONS = [

  /* ================================ CHAPITRE 1 — LES DANGERS ============ */
  {
    id: "ch1-q1", chapitre: "ch1", type: "qcm",
    enonce: "Qu'est-ce qui rend un choc électrique mortel avant tout ?",
    options: [
      "La tension appliquée, exprimée en volts",
      "L'intensité du courant qui traverse le corps et la durée du passage",
      "La puissance de l'installation, exprimée en kVA",
      "La fréquence du réseau, exprimée en hertz"
    ],
    reponse: 1,
    explication: "C'est l'intensité qui traverse le corps, associée à la durée du contact, qui détermine la gravité. La tension intervient seulement parce qu'elle provoque cette intensité (I = U / R) : à tension égale, un corps humide laissera passer bien plus de courant qu'un corps sec."
  },
  {
    id: "ch1-q2", chapitre: "ch1", type: "qcm",
    enonce: "Quelle est la différence entre électrisation et électrocution ?",
    options: [
      "L'électrisation concerne le courant alternatif, l'électrocution le courant continu",
      "L'électrisation est un passage de courant dans le corps ; l'électrocution est une électrisation mortelle",
      "L'électrocution est un simple picotement, l'électrisation est grave",
      "Les deux mots veulent dire exactement la même chose"
    ],
    reponse: 1,
    explication: "L'électrisation, c'est le passage du courant dans le corps avec des effets, la victime est vivante. L'électrocution, c'est l'électrisation qui entraîne la mort. Toute électrocution est donc une électrisation, mais l'inverse est faux."
  },
  {
    id: "ch1-q3", chapitre: "ch1", type: "vf",
    enonce: "La très grande majorité des accidents électriques mortels du travail se produisent en haute tension.",
    reponse: false,
    explication: "FAUX. C'est en basse tension (230 V, 400 V) que se produisent la grande majorité des accidents, tout simplement parce que c'est ce qu'on manipule tous les jours et que la vigilance y est plus faible. La basse tension n'est jamais « sans danger »."
  },
  {
    id: "ch1-q4", chapitre: "ch1", type: "qcm",
    enonce: "À environ 10 mA en courant alternatif, quel effet se manifeste sur le corps ?",
    options: [
      "Rien du tout, on ne sent même pas le courant",
      "Le seuil de non-lâcher : les muscles se contractent et on ne peut plus lâcher le conducteur",
      "L'arrêt cardiaque immédiat",
      "Une brûlure interne profonde des organes"
    ],
    reponse: 1,
    explication: "Vers 10 mA on atteint le seuil de non-lâcher : la tétanisation musculaire crispe la main sur le conducteur, la victime ne peut plus se dégager seule. C'est pour cela qu'il faut couper le courant avant de vouloir la secourir."
  },
  {
    id: "ch1-q5", chapitre: "ch1", type: "qcm_multiple",
    enonce: "Quels éléments AGGRAVENT la gravité d'un choc électrique ? (plusieurs réponses possibles)",
    options: [
      "La durée du contact",
      "L'humidité de la peau et la transpiration",
      "Le port de chaussures isolantes en bon état",
      "Un trajet du courant qui passe par le cœur (main gauche vers pied droit)",
      "Le port d'une montre métallique et de bagues"
    ],
    reponses: [0, 1, 3, 4],
    explication: "La durée, l'humidité (qui fait chuter la résistance du corps), le trajet à travers le thorax et les objets métalliques conducteurs sont tous des facteurs aggravants. Les chaussures isolantes en bon état, au contraire, PROTÈGENT en limitant la liaison avec la terre."
  },
  {
    id: "ch1-q6", chapitre: "ch1", type: "qcm",
    enonce: "Un collègue reçoit un coup d'arc en ouvrant une armoire. Quelques heures plus tard il se plaint de douleurs aux yeux. Que s'est-il passé ?",
    options: [
      "Une ophtalmie : le rayonnement ultraviolet de l'arc a brûlé la surface de l'œil",
      "Une fibrillation ventriculaire, qui se manifeste par des douleurs oculaires",
      "Un simple éblouissement sans conséquence, qui passera seul",
      "Une électrisation des nerfs optiques par le courant"
    ],
    reponse: 0,
    explication: "L'arc électrique émet un rayonnement ultraviolet très intense, comme un poste à souder. Il provoque une ophtalmie : une brûlure de la cornée, très douloureuse, qui apparaît typiquement plusieurs heures après. C'est pour cela que l'écran facial anti-UV est indispensable."
  },
  {
    id: "ch1-q7", chapitre: "ch1", type: "vf",
    enonce: "Une personne qui a reçu une décharge électrique et qui se sent bien peut retourner travailler sans voir de médecin.",
    reponse: false,
    explication: "FAUX. Les brûlures électrothermiques internes peuvent être graves avec une plaie minuscule en surface, et des troubles du rythme cardiaque peuvent apparaître plusieurs heures après le choc. La consultation médicale est obligatoire, et l'accident doit être déclaré."
  },
  {
    id: "ch1-q8", chapitre: "ch1", type: "association",
    enonce: "Associez chaque situation au type de contact correspondant.",
    paires: [
      { gauche: "Je touche une borne dénudée sous tension dans une armoire", droite: "Contact direct" },
      { gauche: "Je touche la carcasse d'un moteur mise sous tension par un défaut d'isolement", droite: "Contact indirect" },
      { gauche: "Protection assurée par l'isolation des conducteurs et les capots", droite: "Prévention du contact direct" },
      { gauche: "Protection assurée par la mise à la terre des masses et le différentiel", droite: "Prévention du contact indirect" }
    ],
    explication: "Le contact DIRECT, c'est le contact avec une pièce normalement sous tension : on s'en protège en isolant, en capotant, en éloignant. Le contact INDIRECT, c'est le contact avec une masse métallique mise accidentellement sous tension : on s'en protège en mettant les masses à la terre et en installant un dispositif différentiel qui coupe au premier défaut."
  },
  {
    id: "ch1-q9", chapitre: "ch1", type: "trous",
    enonce: "Complétez ce rappel sur la tension limite conventionnelle.",
    texte: "En courant alternatif, la tension limite conventionnelle UL vaut {{0}} dans un local sec. Dans un local mouillé, elle descend à {{1}}, parce que l'humidité fait {{2}} la résistance du corps humain.",
    trous: [
      { options: ["12 V", "25 V", "50 V", "120 V"], reponse: 2 },
      { options: ["12 V", "25 V", "50 V", "60 V"], reponse: 1 },
      { options: ["augmenter", "chuter", "rester constante"], reponse: 1 }
    ],
    explication: "UL vaut 50 V en alternatif en local sec, et 25 V en local mouillé (120 V et 60 V respectivement en continu). Plus le milieu est humide, plus la résistance du corps chute, donc plus l'intensité est élevée pour une même tension : on abaisse donc la tension admissible."
  },
  {
    id: "ch1-q10", chapitre: "ch1", type: "situation",
    scenario: "Il fait 34 °C dans l'atelier. Tu transpires beaucoup, tu es accroupi sur un sol en béton légèrement humide, et tu dois faire une mesure dans un coffret 230 V dont le capot est ouvert.",
    enonce: "Pourquoi cette situation est-elle bien plus dangereuse que la même mesure faite au sec et debout sur un tapis isolant ?",
    options: [
      "Parce que la tension du réseau augmente quand il fait chaud",
      "Parce que la transpiration et le contact avec le sol humide font chuter ta résistance corporelle, donc augmentent l'intensité qui te traverserait",
      "Parce que la chaleur fait fondre l'isolant des câbles instantanément",
      "Parce que le courant alternatif devient du courant continu au-delà de 30 °C"
    ],
    reponse: 1,
    explication: "La tension du réseau ne change pas : c'est TA résistance qui s'effondre. Peau mouillée + bonne liaison à la terre par le sol humide = intensité bien plus forte pour la même tension de contact. D'où l'intérêt du tapis isolant, des chaussures isolantes et d'une tenue adaptée."
  },
  {
    id: "ch1-q11", chapitre: "ch1", type: "qcm_multiple",
    enonce: "Parmi ces types de brûlures, lesquelles peuvent être causées par un incident électrique ? (plusieurs réponses possibles)",
    options: [
      "La brûlure par arc électrique, avec projection de métal en fusion",
      "La brûlure électrothermique interne, par effet Joule sur le trajet du courant",
      "La brûlure de la cornée par rayonnement ultraviolet de l'arc",
      "Aucune : l'électricité ne provoque que des chocs, jamais de brûlures"
    ],
    reponses: [0, 1, 2],
    explication: "Les trois premières sont bien des conséquences classiques d'un incident électrique. L'arc brûle par sa chaleur et ses projections, le passage du courant chauffe les tissus de l'intérieur, et le rayonnement ultraviolet de l'arc brûle les yeux."
  },

  /* ================================ CHAPITRE 2 — DOMAINES DE TENSION === */
  {
    id: "ch2-q1", chapitre: "ch2", type: "qcm",
    enonce: "Une installation fonctionne en 400 V alternatif triphasé. Dans quel domaine de tension se situe-t-elle ?",
    options: ["TBT", "BTA", "BTB", "HTA"],
    reponse: 1,
    explication: "En alternatif, la BTA va de 50 V à 500 V. 400 V est donc du BTA. On le confond souvent avec la BTB, mais la limite BTA / BTB est à 500 V en alternatif."
  },
  {
    id: "ch2-q2", chapitre: "ch2", type: "qcm",
    enonce: "En courant ALTERNATIF, à partir de quelle tension passe-t-on en haute tension (HTA) ?",
    options: ["Au-delà de 500 V", "Au-delà de 750 V", "Au-delà de 1 000 V", "Au-delà de 1 500 V"],
    reponse: 2,
    explication: "La frontière BT / HT est à 1 000 V en alternatif. En continu elle se situe à 1 500 V. Ne mélangez pas les deux colonnes du tableau."
  },
  {
    id: "ch2-q3", chapitre: "ch2", type: "qcm",
    enonce: "Une installation en 1 200 V CONTINU appartient à quel domaine ?",
    options: ["BTA", "BTB", "HTA", "HTB"],
    reponse: 1,
    explication: "En continu, la BTB va de 750 V à 1 500 V : 1 200 V continu est donc du BTB, toujours de la basse tension. Si on avait appliqué par erreur les valeurs de l'alternatif, on aurait répondu HTA — c'est exactement le piège."
  },
  {
    id: "ch2-q4", chapitre: "ch2", type: "association",
    enonce: "Associez chaque tension à son domaine.",
    paires: [
      { gauche: "24 V alternatif (commande d'automate)", droite: "TBT" },
      { gauche: "230 V alternatif (prise de courant)", droite: "BTA" },
      { gauche: "690 V alternatif (gros moteur)", droite: "BTB" },
      { gauche: "20 000 V alternatif (poste de livraison)", droite: "HTA" },
      { gauche: "400 000 V alternatif (ligne de transport)", droite: "HTB" }
    ],
    explication: "En alternatif, retenez la suite 50 — 500 — 1 000 — 50 000. 24 V ≤ 50 V donc TBT ; 230 V est entre 50 et 500 donc BTA ; 690 V est entre 500 et 1 000 donc BTB ; 20 kV est entre 1 kV et 50 kV donc HTA ; 400 kV dépasse 50 kV donc HTB."
  },
  {
    id: "ch2-q5", chapitre: "ch2", type: "trous",
    enonce: "Complétez les bornes du tableau des domaines de tension.",
    texte: "En alternatif, la TBT correspond à une tension inférieure ou égale à {{0}}. La BTA s'arrête à {{1}} et la BTB à {{2}}. En continu, la TBT va jusqu'à {{3}}.",
    trous: [
      { options: ["25 V", "50 V", "120 V", "230 V"], reponse: 1 },
      { options: ["400 V", "500 V", "750 V", "1 000 V"], reponse: 1 },
      { options: ["500 V", "750 V", "1 000 V", "1 500 V"], reponse: 2 },
      { options: ["50 V", "60 V", "120 V", "750 V"], reponse: 2 }
    ],
    explication: "Alternatif : TBT ≤ 50 V, BTA jusqu'à 500 V, BTB jusqu'à 1 000 V. Continu : TBT ≤ 120 V, BTA jusqu'à 750 V, BTB jusqu'à 1 500 V. Les valeurs du continu sont plus élevées car le continu provoque moins facilement la fibrillation cardiaque."
  },
  {
    id: "ch2-q6", chapitre: "ch2", type: "vf",
    enonce: "Dans le symbole d'habilitation B1V, la lettre B indique que l'on travaille en basse tension.",
    reponse: true,
    explication: "VRAI. La lettre B désigne la basse tension (et la très basse tension), la lettre H désigne la haute tension. Une habilitation B ne donne aucun droit en haute tension."
  },
  {
    id: "ch2-q7", chapitre: "ch2", type: "qcm_multiple",
    enonce: "Quelles affirmations sur la TBT sont exactes ? (plusieurs réponses possibles)",
    options: [
      "En alternatif, la TBT correspond à une tension inférieure ou égale à 50 V",
      "En TBT, un court-circuit peut encore provoquer un arc et de graves brûlures",
      "La TBTS est un régime où le circuit est séparé de la terre et des autres circuits",
      "La TBT supprime totalement tout danger, quelle que soit la situation"
    ],
    reponses: [0, 1, 2],
    explication: "La TBT réduit fortement le risque d'électrisation, mais ne supprime pas tout danger : un court-circuit sur une batterie 12 V fait fondre une clé plate et peut brûler gravement. La TBTS est le régime le plus protecteur car le circuit est séparé de la terre et des autres circuits."
  },
  {
    id: "ch2-q8", chapitre: "ch2", type: "qcm",
    enonce: "Pourquoi les bornes du domaine de tension sont-elles plus élevées en courant continu qu'en alternatif ?",
    options: [
      "Parce que le courant continu ne traverse pas le corps humain",
      "Parce qu'à intensité égale, le continu provoque plus difficilement la fibrillation ventriculaire que l'alternatif à 50 Hz",
      "Parce que le courant continu ne produit pas de chaleur",
      "Parce que le continu n'existe qu'en très basse tension"
    ],
    reponse: 1,
    explication: "Le courant alternatif à 50 Hz est particulièrement apte à désorganiser le rythme cardiaque. Le continu est moins agressif de ce point de vue, ce qui explique des seuils plus hauts. Mais il traverse bien le corps et il brûle : il n'est pas inoffensif, et il provoque en plus un phénomène d'électrolyse dans les tissus."
  },
  {
    id: "ch2-q9", chapitre: "ch2", type: "situation",
    scenario: "Tu ouvres une armoire d'atelier. L'arrivée de puissance est en 400 V triphasé. Juste en dessous, le circuit de commande de l'automate est en 24 V continu.",
    enonce: "Comment analyses-tu correctement cette armoire ?",
    options: [
      "Elle est entièrement en TBT puisque l'automate est en 24 V",
      "Elle contient deux domaines de tension : du BTA (400 V AC) et de la TBT (24 V DC), et le risque du 400 V reste présent même quand je travaille sur la partie 24 V",
      "Elle est en BTB puisque 400 V + 24 V dépasse 400 V",
      "Elle est en HTA car une armoire industrielle est toujours en haute tension"
    ],
    reponse: 1,
    explication: "Une même armoire mélange très souvent plusieurs domaines. Travailler sur la partie 24 V ne vous met pas à l'abri : le 400 V est à quelques centimètres, vous êtes potentiellement en voisinage renforcé, donc EPI et habilitation adaptée au niveau de tension LE PLUS ÉLEVÉ présent."
  },
  {
    id: "ch2-q10", chapitre: "ch2", type: "ordre",
    enonce: "Classez ces domaines de tension du plus faible au plus élevé.",
    elements: ["TBT", "BTA", "BTB", "HTA", "HTB"],
    explication: "L'ordre croissant est TBT, BTA, BTB, HTA, HTB. La lettre A précède toujours la lettre B dans un même domaine : BTA est inférieure à BTB, et HTA est inférieure à HTB."
  },
  {
    id: "ch2-q11", chapitre: "ch2", type: "vf",
    enonce: "Une tension de 500 V alternatif est la limite haute du domaine BTA.",
    reponse: true,
    explication: "VRAI. En alternatif, la BTA va de plus de 50 V jusqu'à 500 V inclus. Au-delà de 500 V et jusqu'à 1 000 V, on est en BTB."
  },

  /* ================================ CHAPITRE 3 — HABILITATIONS ========= */
  {
    id: "ch3-q1", chapitre: "ch3", type: "qcm",
    enonce: "Dans un symbole d'habilitation, que signifie la lettre V ajoutée (comme dans B1V) ?",
    options: [
      "Que la personne est habilitée à faire des vérifications",
      "Que la personne peut travailler au voisinage de pièces nues sous tension",
      "Que l'habilitation est valable pour les véhicules électriques",
      "Que la personne peut réaliser des VAT"
    ],
    reponse: 1,
    explication: "Le V signifie VOISINAGE : il autorise à opérer dans la zone de voisinage renforcé de pièces nues sous tension en basse tension (moins de 30 cm). Sans le V, l'exécutant ne peut pas entrer dans cette zone."
  },
  {
    id: "ch3-q2", chapitre: "ch3", type: "qcm",
    enonce: "Que signifie le chiffre 2 dans B2V ?",
    options: [
      "Deux ans de validité de l'habilitation",
      "Exécutant de travaux d'ordre électrique",
      "Chargé de travaux d'ordre électrique : il dirige et encadre l'équipe",
      "Deuxième niveau de tension autorisé"
    ],
    reponse: 2,
    explication: "Le chiffre indique le rôle : 0 = travaux d'ordre non électrique, 1 = exécutant, 2 = chargé de travaux. Le B2V dirige les travaux, veille à la sécurité de son équipe et reçoit l'attestation de consignation du BC."
  },
  {
    id: "ch3-q3", chapitre: "ch3", type: "association",
    enonce: "Associez chaque symbole d'habilitation à sa définition.",
    paires: [
      { gauche: "B0", droite: "Travaux d'ordre NON électrique dans un local ou au voisinage" },
      { gauche: "B1V", droite: "Exécutant de travaux d'ordre électrique, voisinage autorisé" },
      { gauche: "B2V", droite: "Chargé de travaux d'ordre électrique, voisinage autorisé" },
      { gauche: "BC", droite: "Chargé de consignation" },
      { gauche: "BR", droite: "Chargé d'intervention BT générale (dépannage, mesurage…)" },
      { gauche: "BS", droite: "Chargé d'intervention BT élémentaire (remplacement à l'identique)" }
    ],
    explication: "La lecture est systématique : la lettre donne le domaine (B = basse tension), le chiffre donne le rôle (0 non-électricien, 1 exécutant, 2 chargé de travaux) et les lettres finales donnent le type d'opération (C consignation, R intervention générale, S intervention élémentaire)."
  },
  {
    id: "ch3-q4", chapitre: "ch3", type: "qcm",
    enonce: "Qui délivre le titre d'habilitation électrique ?",
    options: [
      "L'organisme de formation, à la fin du stage",
      "L'employeur du salarié",
      "L'inspection du travail",
      "Le médecin du travail"
    ],
    reponse: 1,
    explication: "C'est l'EMPLOYEUR qui habilite, parce que c'est lui qui connaît les installations, les tâches confiées et les compétences réelles du salarié. L'organisme de formation délivre une attestation de formation ; le médecin du travail donne un avis d'aptitude. Ni l'un ni l'autre n'habilite."
  },
  {
    id: "ch3-q5", chapitre: "ch3", type: "vf",
    enonce: "Un titulaire d'une habilitation BS peut effectuer une recherche de panne en présence de tension.",
    reponse: false,
    explication: "FAUX. Le BS n'opère que HORS TENSION, sur des remplacements à l'identique (lampe, fusible, prise, interrupteur) et des raccordements sur circuit en attente. Seul le BR peut réaliser une recherche de panne en présence de tension."
  },
  {
    id: "ch3-q6", chapitre: "ch3", type: "qcm_multiple",
    enonce: "Que peut faire un titulaire d'une habilitation BR ? (plusieurs réponses possibles)",
    options: [
      "Un dépannage en basse tension",
      "Un mesurage de tension dans une armoire 400 V",
      "Un remplacement de contacteur",
      "Des travaux d'ordre électrique en haute tension",
      "Se faire assister par un exécutant B1V qu'il surveille"
    ],
    reponses: [0, 1, 2, 4],
    explication: "Le BR couvre le dépannage, le mesurage, l'essai, la vérification, le raccordement et le remplacement, en BASSE TENSION uniquement. Aucune habilitation B ne donne de droit en haute tension : il faudrait une habilitation H. Le BR peut effectivement désigner et surveiller un aide B1 ou B1V."
  },
  {
    id: "ch3-q7", chapitre: "ch3", type: "qcm",
    enonce: "Quelle est la différence essentielle entre des TRAVAUX et une INTERVENTION BT ?",
    options: [
      "Les travaux se font le jour, les interventions la nuit",
      "Les travaux sont une opération programmée et préparée, souvent longue ; l'intervention BT est une opération courte sur une partie limitée de l'installation, souvent en urgence",
      "Les travaux se font en haute tension, les interventions en basse tension",
      "Il n'y a aucune différence, seul le vocabulaire change"
    ],
    reponse: 1,
    explication: "Les travaux (B1, B1V, B2, B2V) sont programmés, préparés, et pour le hors tension ils reposent sur une consignation réalisée par un BC. Les interventions BT (BR, BS) sont courtes, limitées en périmètre, et le chargé d'intervention assure lui-même la mise en sécurité de sa zone."
  },
  {
    id: "ch3-q8", chapitre: "ch3", type: "qcm",
    enonce: "Une lampe a grillé dans un bureau. Quelle habilitation suffit pour la remplacer à l'identique, hors tension ?",
    options: ["B0", "BS", "B2V", "BC"],
    reponse: 1,
    explication: "Le remplacement à l'identique d'une lampe est typiquement une intervention BT élémentaire : le BS suffit (et le BR le peut aussi, puisque son habilitation englobe celle du BS). Le B0 ne touche pas à l'électricité, le B2V est un chargé de travaux et le BC un chargé de consignation : ce ne sont pas les bons profils."
  },
  {
    id: "ch3-q9", chapitre: "ch3", type: "trous",
    enonce: "Complétez la lecture d'un symbole d'habilitation.",
    texte: "Dans un symbole, la première lettre indique le {{0}}. Le chiffre indique le {{1}}. La lettre C signifie {{2}} et la lettre R signifie {{3}}.",
    trous: [
      { options: ["domaine de tension", "nombre d'années de validité", "type d'entreprise"], reponse: 0 },
      { options: ["nombre de personnes encadrées", "rôle de la personne", "niveau de risque du local"], reponse: 1 },
      { options: ["consignation", "contrôle", "certification"], reponse: 0 },
      { options: ["réparation libre", "intervention BT générale", "responsable de site"], reponse: 1 }
    ],
    explication: "B ou H pour le domaine, 0 / 1 / 2 pour le rôle, puis les lettres d'opération : C = consignation, R = intervention BT générale, S = intervention BT élémentaire, E = opération spécifique (essai, mesurage, vérification, manœuvre)."
  },
  {
    id: "ch3-q10", chapitre: "ch3", type: "situation",
    scenario: "On te demande de diriger une équipe de deux électriciens pour remplacer un jeu de barres dans un TGBT pendant l'arrêt annuel. L'installation sera consignée par un chargé de consignation, mais il restera des pièces nues sous tension à moins de 30 cm de la zone de travail.",
    enonce: "Quelle habilitation te faut-il au minimum ?",
    options: ["B1V", "B2V", "BR", "BS"],
    reponse: 1,
    explication: "Vous DIRIGEZ une équipe sur des travaux d'ordre électrique : il faut le chiffre 2 (chargé de travaux). Et comme il subsiste des pièces nues sous tension à moins de 30 cm, il faut le V. Donc B2V. Le B1V ne dirige personne, le BR fait des interventions et non des travaux d'équipe, le BS est très limité."
  },
  {
    id: "ch3-q11", chapitre: "ch3", type: "vf",
    enonce: "Une habilitation électrique est personnelle et n'est valable que pour l'employeur qui l'a délivrée.",
    reponse: true,
    explication: "VRAI. L'habilitation est nominative, elle ne se prête pas, et elle perd sa validité quand on change d'employeur : le nouvel employeur doit délivrer son propre titre. Elle peut aussi être suspendue, modifiée ou retirée."
  },
  {
    id: "ch3-q12", chapitre: "ch3", type: "qcm",
    enonce: "Un maçon doit percer un mur dans un local technique où se trouvent des armoires ouvertes avec des pièces nues sous tension. Quelle habilitation lui faut-il ?",
    options: [
      "Aucune, il n'est pas électricien",
      "B0, car il réalise des travaux d'ordre NON électrique dans un local à risque électrique",
      "B1, car il entre dans un local réservé aux électriciens",
      "BR, car il travaille au voisinage"
    ],
    reponse: 1,
    explication: "Le maçon ne touche pas à l'électricité, mais il est exposé au risque électrique : c'est exactement la définition du B0, l'habilitation du non-électricien. Il devra en plus être informé des risques, et une surveillance ou un balisage peut être imposé selon la configuration."
  },

  /* ================================ CHAPITRE 4 — ZONES ET VOISINAGE ==== */
  {
    id: "ch4-q1", chapitre: "ch4", type: "qcm",
    enonce: "En basse tension, quelle est la distance limite de voisinage SIMPLE (DLVS) ?",
    options: ["0,30 m", "1 m", "3 m", "50 m"],
    reponse: 2,
    explication: "La DLVS vaut 3 mètres, mesurés depuis la pièce nue sous tension. Entre 3 m et 0,30 m on est en voisinage simple ; à moins de 0,30 m on entre dans le voisinage renforcé (zone 4 BT)."
  },
  {
    id: "ch4-q2", chapitre: "ch4", type: "qcm",
    enonce: "En basse tension, à partir de quelle distance de la pièce nue sous tension entre-t-on dans la zone de voisinage RENFORCÉ ?",
    options: ["3 m", "1 m", "0,50 m", "0,30 m"],
    reponse: 3,
    explication: "À moins de 0,30 m (30 cm) d'une pièce nue sous tension en BT, on est dans la zone de voisinage renforcé, appelée zone 4 en basse tension. Il faut alors une habilitation avec la lettre V, ou être BR."
  },
  {
    id: "ch4-q3", chapitre: "ch4", type: "vf",
    enonce: "Les distances de voisinage se mesurent depuis la porte de l'armoire électrique.",
    reponse: false,
    explication: "FAUX. Toutes les distances se mesurent depuis la PIÈCE NUE SOUS TENSION (borne, barre, conducteur dénudé). C'est un piège classique : l'armoire elle-même n'est pas la référence."
  },
  {
    id: "ch4-q4", chapitre: "ch4", type: "qcm",
    enonce: "Une armoire est fermée, tout le matériel est sous enveloppe et aucune pièce nue n'est accessible. Que peut-on dire de la zone de voisinage ?",
    options: [
      "Elle s'étend quand même à 3 m autour de l'armoire",
      "Il n'y a pas de zone de voisinage électrique, puisqu'il n'y a pas de pièce nue sous tension accessible",
      "Elle est doublée, car l'enveloppe concentre le champ électrique",
      "Elle dépend uniquement de la puissance de l'armoire"
    ],
    reponse: 1,
    explication: "Pas de pièce nue accessible = pas de zone de voisinage. C'est la raison très concrète pour laquelle on referme les capots et les plastrons : c'est la protection collective la plus simple et la plus efficace."
  },
  {
    id: "ch4-q5", chapitre: "ch4", type: "association",
    enonce: "Associez chaque zone à sa définition.",
    paires: [
      { gauche: "Zone 0", droite: "Zone d'investigation, entre la DLI (50 m) et la DLVS" },
      { gauche: "Zone 1", droite: "Zone de voisinage simple, entre la DLVS et la DLVR" },
      { gauche: "Zone 4", droite: "Voisinage renforcé en BASSE tension (moins de 0,30 m)" },
      { gauche: "Zone 2", droite: "Voisinage renforcé en HAUTE tension (entre DLVR et DMA)" },
      { gauche: "Zone 3", droite: "Travaux sous tension en HAUTE tension (à l'intérieur de la DMA)" }
    ],
    explication: "La basse tension n'a que trois zones : 0, 1 et 4. La haute tension en a quatre : 0, 1, 2 et 3. Il n'y a donc ni zone 2 ni zone 3 en BT, et pas de zone 4 en HT. La zone 4 (BT) et la zone 2 (HT) désignent toutes deux le voisinage renforcé, mais dans deux domaines différents."
  },
  {
    id: "ch4-q6", chapitre: "ch4", type: "qcm_multiple",
    enonce: "Quelles mesures permettent de SUPPRIMER le risque lié au voisinage, plutôt que de travailler dedans ? (plusieurs réponses possibles)",
    options: [
      "Mettre hors tension et consigner l'installation",
      "Poser une nappe isolante ou un protecteur sur la pièce nue",
      "Remettre en place le capot ou le plastron",
      "Baliser pour empêcher l'approche",
      "Mettre des gants isolants et y aller quand même"
    ],
    reponses: [0, 1, 2, 3],
    explication: "Consigner, isoler, capoter et baliser font disparaître ou éloignent le risque : ce sont des mesures à privilégier. Les gants isolants, eux, ne suppriment pas le risque : ils protègent l'opérateur une fois qu'on a décidé de travailler dans la zone. L'EPI vient en dernier."
  },
  {
    id: "ch4-q7", chapitre: "ch4", type: "trous",
    enonce: "Complétez les valeurs de voisinage en basse tension.",
    texte: "En basse tension, la distance limite de voisinage simple vaut {{0}} et la limite du voisinage renforcé vaut {{1}}. Pour travailler dans cette dernière zone, il faut une habilitation portant la lettre {{2}}.",
    trous: [
      { options: ["1 m", "2 m", "3 m", "5 m"], reponse: 2 },
      { options: ["0,10 m", "0,30 m", "0,50 m", "1 m"], reponse: 1 },
      { options: ["C", "R", "S", "V"], reponse: 3 }
    ],
    explication: "DLVS = 3 m, limite du voisinage renforcé = 0,30 m en BT. La lettre V (B1V, B2V) autorise à entrer dans cette zone ; le BR y est autorisé d'office, le voisinage étant inclus dans son habilitation."
  },
  {
    id: "ch4-q8", chapitre: "ch4", type: "situation",
    scenario: "Tu fais un contrôle par caméra thermique dans un TGBT. La porte est ouverte, le jeu de barres est nu et sous tension. Pour cadrer une borne précise, tu dois approcher la caméra à environ 15 cm des barres.",
    enonce: "Que t'impose cette approche ?",
    options: [
      "Rien de particulier, tu ne touches rien avec la main",
      "Tu entres en zone 4 BT (voisinage renforcé) : habilitation avec V ou BR, EPI adaptés, accord du chargé d'exploitation",
      "Il faut obligatoirement consigner tout le TGBT avant toute mesure thermique",
      "Il faut une habilitation haute tension, car un TGBT est toujours en HTA"
    ],
    reponse: 1,
    explication: "À 15 cm d'une pièce nue sous tension en BT, vous êtes à l'intérieur des 30 cm, donc en voisinage renforcé : habilitation avec la lettre V (ou BR), gants isolants, écran facial, et l'accord de l'exploitant. Le fait de ne pas toucher avec la main ne change rien : c'est la distance qui compte, et un geste involontaire suffit."
  },
  {
    id: "ch4-q9", chapitre: "ch4", type: "qcm",
    enonce: "Qu'est-ce qu'un local réservé aux électriciens ?",
    options: [
      "Un local où l'on stocke le matériel électrique de rechange",
      "Un local dont l'accès est réservé parce qu'on y trouve des pièces nues sous tension accessibles",
      "Le bureau du responsable maintenance",
      "Un local où l'on ne trouve que de la très basse tension"
    ],
    reponse: 1,
    explication: "C'est un local présentant un risque électrique du fait de pièces nues sous tension accessibles (poste de livraison, TGBT). Sa porte porte la signalisation de danger, elle reste fermée, et il faut une habilitation ou une autorisation d'accès pour y entrer."
  },
  {
    id: "ch4-q10", chapitre: "ch4", type: "ordre",
    enonce: "Classez ces mesures de prévention du voisinage, de la PLUS efficace à la moins efficace.",
    elements: [
      "Mettre hors tension et consigner (le risque disparaît)",
      "Isoler la pièce nue avec une nappe ou un protecteur",
      "Baliser et délimiter pour empêcher l'approche",
      "Travailler au voisinage avec EPI et instruction de sécurité"
    ],
    explication: "On cherche toujours d'abord à SUPPRIMER le risque (consigner), puis à l'isoler, puis à éloigner les personnes, et seulement en dernier recours on travaille dans la zone avec les protections individuelles. L'EPI est le dernier rempart, pas la première réponse."
  },

  /* ================================ CHAPITRE 5 — CONSIGNATION ========== */
  {
    id: "ch5-q1", chapitre: "ch5", type: "ordre",
    enonce: "Remettez dans l'ordre les quatre étapes de la consignation.",
    elements: [
      "Séparation de toutes les sources de tension",
      "Condamnation en position d'ouverture (cadenas + pancarte)",
      "Identification de l'ouvrage ou de l'installation",
      "Vérification d'absence de tension (VAT), suivie de la MALT et du court-circuit si requis"
    ],
    explication: "L'ordre est imposé : SÉPARER, CONDAMNER, IDENTIFIER, VÉRIFIER l'absence de tension. Moyen mnémotechnique : SÉ-CO-I-VÉ. L'identification arrive en troisième position, et non en premier : c'est le piège le plus fréquent."
  },
  {
    id: "ch5-q2", chapitre: "ch5", type: "qcm",
    enonce: "En quoi consiste exactement la CONDAMNATION d'un organe de séparation ?",
    options: [
      "Écrire son nom sur un papier posé sur l'armoire",
      "Immobiliser l'organe en position d'ouverture par un dispositif nécessitant un outil ou une clé, ET le signaler par une pancarte",
      "Couper l'alimentation générale du bâtiment",
      "Vérifier qu'il n'y a plus de tension aux bornes"
    ],
    reponse: 1,
    explication: "La condamnation = immobilisation (cadenas de consignation, verrou) + signalisation (pancarte lisible avec le nom de l'intervenant). Les deux sont nécessaires : un cadenas sans pancarte ne dit pas qui a consigné ni pourquoi, une pancarte sans cadenas n'empêche personne de manœuvrer."
  },
  {
    id: "ch5-q3", chapitre: "ch5", type: "qcm",
    enonce: "Avec quel appareil réalise-t-on la vérification d'absence de tension ?",
    options: [
      "Un multimètre en position voltmètre",
      "Un vérificateur d'absence de tension (VAT) conçu pour cet usage et adapté au domaine de tension",
      "Un tournevis testeur à néon",
      "Une lampe témoin bricolée avec une douille et deux fils"
    ],
    reponse: 1,
    explication: "Seul un VAT normalisé, adapté au domaine de tension, est autorisé. Un multimètre peut afficher 0 V parce qu'un fusible interne a fondu, parce qu'il est sur le mauvais calibre ou parce qu'un cordon est coupé : il vous ferait croire à une absence de tension. Le tournevis testeur et les montages maison sont interdits."
  },
  {
    id: "ch5-q4", chapitre: "ch5", type: "vf",
    enonce: "Il suffit de vérifier le bon fonctionnement du VAT avant de l'utiliser.",
    reponse: false,
    explication: "FAUX. On teste le VAT AVANT et APRÈS la vérification. Si l'appareil tombe en panne entre-temps, le test final le révèle ; sans ce second test, on pourrait travailler sur une installation encore sous tension en croyant l'avoir vérifiée."
  },
  {
    id: "ch5-q5", chapitre: "ch5", type: "qcm_multiple",
    enonce: "Lors d'une VAT sur un circuit triphasé avec neutre, entre quels points doit-on vérifier ? (plusieurs réponses possibles)",
    options: [
      "Entre les phases, deux à deux",
      "Entre chaque phase et le neutre",
      "Entre chaque phase et la terre",
      "Entre le neutre et la terre",
      "Uniquement entre la phase 1 et la terre, cela suffit"
    ],
    reponses: [0, 1, 2, 3],
    explication: "On vérifie TOUS les conducteurs entre eux et par rapport à la terre, neutre compris. Le neutre peut être sous tension à cause d'un neutre coupé, d'une erreur de câblage ou d'un retour par un autre circuit : le négliger est une erreur classique et dangereuse."
  },
  {
    id: "ch5-q6", chapitre: "ch5", type: "vf",
    enonce: "Une VAT réalisée le matin reste valable toute la journée sur le même chantier.",
    reponse: false,
    explication: "FAUX. La VAT n'est valable qu'à l'INSTANT où elle est faite et à l'ENDROIT où elle est faite. Si vous quittez le poste de travail puis revenez, ou si vous changez de point d'intervention, vous refaites la VAT."
  },
  {
    id: "ch5-q7", chapitre: "ch5", type: "qcm",
    enonce: "Qui délivre l'attestation de consignation, et à qui ?",
    options: [
      "Le chargé de travaux la délivre au chargé de consignation",
      "Le chargé de consignation (BC) la délivre au chargé de travaux (B2 / B2V)",
      "L'employeur la délivre à l'exécutant B1V",
      "Le chargé d'exploitation la délivre aux pompiers"
    ],
    reponse: 1,
    explication: "Le sens de circulation est à retenir : le BC consigne puis DONNE l'attestation de consignation au chargé de travaux, qui peut alors engager son équipe. En fin de chantier, c'est l'inverse : le chargé de travaux REND l'avis de fin de travail."
  },
  {
    id: "ch5-q8", chapitre: "ch5", type: "qcm",
    enonce: "Dans une consignation en DEUX étapes, que doit faire le chargé de travaux ?",
    options: [
      "Rien de plus, tout a été fait par le chargé de consignation",
      "L'identification de l'ouvrage et la vérification d'absence de tension (et la MALT/CC si nécessaire)",
      "La séparation et la condamnation",
      "Seulement signer l'attestation sans opération technique"
    ],
    reponse: 1,
    explication: "En deux étapes, le BC réalise la séparation et la condamnation puis remet l'attestation de PREMIÈRE ÉTAPE. Le chargé de travaux réalise alors lui-même, sur le lieu de travail, l'identification et la VAT, plus la mise à la terre et en court-circuit si elle est requise. C'est pratique quand le point de coupure est loin du chantier."
  },
  {
    id: "ch5-q9", chapitre: "ch5", type: "trous",
    enonce: "Complétez ce texte sur la consignation.",
    texte: "La consignation commence par la {{0}} de toutes les sources de tension, puis par la {{1}} de l'organe de coupure. Vient ensuite l'{{2}} de l'ouvrage, et enfin la {{3}}. La mise à la terre et en court-circuit doit être posée {{4}} après cette dernière.",
    trous: [
      { options: ["séparation", "condamnation", "identification", "vérification"], reponse: 0 },
      { options: ["séparation", "condamnation", "identification", "vérification"], reponse: 1 },
      { options: ["séparation", "condamnation", "identification", "vérification"], reponse: 2 },
      { options: ["vérification d'absence de tension", "remise sous tension", "déconsignation"], reponse: 0 },
      { options: ["immédiatement", "une heure plus tard", "le lendemain"], reponse: 0 }
    ],
    explication: "Séparation, condamnation, identification, vérification d'absence de tension : toujours dans cet ordre. La MALT/CC se pose immédiatement après la VAT, car tout délai entre les deux rouvre la possibilité d'une réalimentation."
  },
  {
    id: "ch5-q10", chapitre: "ch5", type: "situation",
    scenario: "Tu dois remplacer un moteur de convoyeur. Tu ouvres le sectionneur de l'armoire du convoyeur, tu poses ton cadenas et ta pancarte, tu identifies le départ sur le schéma, tu fais ta VAT aux bornes du moteur : tout est à zéro. Mais le convoyeur possède aussi un frein alimenté depuis une seconde armoire, et le moteur est piloté par un variateur de vitesse.",
    enonce: "Qu'est-ce qui manque à ta consignation ?",
    options: [
      "Rien, la VAT à zéro prouve que tout est sûr",
      "La séparation de TOUTES les sources (dont l'armoire du frein) et le respect du temps de décharge des condensateurs du variateur",
      "Il fallait faire l'identification avant la séparation",
      "Il fallait mettre deux cadenas au lieu d'un sur le même sectionneur"
    ],
    reponse: 1,
    explication: "La première étape exige la séparation de TOUTES les sources de tension : une deuxième arrivée, un circuit de commande venant d'ailleurs, un onduleur, un groupe ou une batterie doivent être traités. Et les condensateurs du bus continu d'un variateur restent chargés plusieurs minutes après la coupure : il faut attendre le temps de décharge indiqué par le constructeur avant d'approcher."
  },
  {
    id: "ch5-q11", chapitre: "ch5", type: "ordre",
    enonce: "Remettez dans l'ordre les étapes de la DÉCONSIGNATION et de la remise sous tension.",
    elements: [
      "S'assurer que les travaux sont terminés, le personnel retiré, les capots et protections remis en place",
      "Le chargé de travaux remet l'avis de fin de travail au chargé de consignation",
      "Retirer les mises à la terre et les courts-circuits",
      "Retirer la condamnation (cadenas et pancarte)",
      "Refermer l'organe de séparation et remettre sous tension"
    ],
    explication: "La déconsignation suit l'ordre inverse de la consignation, et elle ne commence qu'une fois le terrain rendu : personnel retiré, capots remontés, balisage enlevé, avis de fin de travail signé. Tant que ce document n'est pas remis, le BC ne retire pas ses cadenas."
  },
  {
    id: "ch5-q12", chapitre: "ch5", type: "vf",
    enonce: "Si un collègue a laissé son cadenas de consignation et qu'il est parti en congé, on peut le couper pour remettre l'installation en service rapidement.",
    reponse: false,
    explication: "FAUX, et c'est une règle absolue : celui qui a posé son cadenas est le seul à le retirer. Couper le cadenas d'un autre, c'est risquer de remettre sous tension une installation sur laquelle quelqu'un travaille encore. En cas de réelle impossibilité, il existe une procédure encadrée dans l'entreprise, avec la hiérarchie et le chargé d'exploitation."
  },

  /* ================================ CHAPITRE 6 — EPI / EPC ============= */
  {
    id: "ch6-q1", chapitre: "ch6", type: "qcm",
    enonce: "Quelle est la différence entre un EPI et un EPC ?",
    options: [
      "L'EPI est obligatoire, l'EPC est facultatif",
      "L'EPI protège une seule personne ; l'EPC protège toutes les personnes présentes dans la zone",
      "L'EPI sert en basse tension, l'EPC en haute tension",
      "L'EPC est porté sur le corps, l'EPI est posé sur l'installation"
    ],
    reponse: 1,
    explication: "L'Équipement de Protection INDIVIDUELLE protège celui qui le porte. L'Équipement de Protection COLLECTIVE (nappe isolante, écran, balisage, capot remis en place) protège tout le monde dans la zone. On privilégie toujours le collectif, car il ne dépend pas de la vigilance de chacun."
  },
  {
    id: "ch6-q2", chapitre: "ch6", type: "ordre",
    enonce: "Classez les mesures de prévention dans l'ordre des priorités, de la plus efficace à la moins efficace.",
    elements: [
      "Supprimer le risque : mettre hors tension et consigner",
      "Protéger collectivement : isoler la pièce nue, poser un écran, baliser",
      "Protéger individuellement : porter les EPI",
      "Informer et former : instruction de sécurité, habilitation, consignes"
    ],
    explication: "On supprime le risque quand c'est possible, sinon on protège collectivement, puis individuellement, et on accompagne toujours d'information et de formation. L'EPI n'est jamais la première réponse : c'est le dernier rempart quand on n'a pas pu supprimer le danger."
  },
  {
    id: "ch6-q3", chapitre: "ch6", type: "qcm",
    enonce: "Comment vérifie-t-on des gants isolants avant chaque utilisation ?",
    options: [
      "On les met et on touche une pièce sous tension pour tester",
      "Contrôle visuel (coupure, craquelure, brûlure) puis essai d'étanchéité en les gonflant ou en les roulant pour détecter un trou",
      "On les mesure à l'ohmmètre entre l'intérieur et l'extérieur",
      "Aucune vérification n'est nécessaire s'ils sont neufs"
    ],
    reponse: 1,
    explication: "Contrôle visuel puis essai d'étanchéité par gonflage (ou en roulant le gant sur lui-même) : si l'air s'échappe, le gant est percé et part au rebut. On vérifie aussi la classe du gant et la date de la dernière vérification périodique. Un gant neuf peut avoir été abîmé au stockage : on le vérifie quand même."
  },
  {
    id: "ch6-q4", chapitre: "ch6", type: "qcm_multiple",
    enonce: "Quels équipements sont des protections COLLECTIVES (EPC) ? (plusieurs réponses possibles)",
    options: [
      "Une nappe isolante posée sur un jeu de barres",
      "Des gants isolants",
      "Des banderoles délimitant la zone de travail",
      "Un cadenas de consignation avec sa pancarte",
      "Un écran facial anti-UV",
      "Le plastron remis en place sur l'armoire"
    ],
    reponses: [0, 2, 3, 5],
    explication: "Nappe isolante, balisage, cadenas et capot remis en place protègent TOUTES les personnes présentes : ce sont des EPC. Les gants isolants et l'écran facial ne protègent que celui qui les porte : ce sont des EPI."
  },
  {
    id: "ch6-q5", chapitre: "ch6", type: "vf",
    enonce: "On porte les gants isolants pendant la vérification d'absence de tension.",
    reponse: true,
    explication: "VRAI. Au moment de la VAT, on n'a pas encore la preuve que l'installation est hors tension : on la considère donc comme étant SOUS tension, avec tous les EPI adaptés (gants isolants, écran facial). C'est précisément à cet instant qu'on approche des pièces potentiellement vivantes."
  },
  {
    id: "ch6-q6", chapitre: "ch6", type: "qcm",
    enonce: "À quoi sert principalement l'écran facial lors d'une opération en basse tension ?",
    options: [
      "À éviter de respirer les poussières de l'armoire",
      "À protéger le visage et les yeux des projections de métal en fusion et du rayonnement ultraviolet d'un arc électrique",
      "À empêcher la buée sur les lunettes de vue",
      "À isoler électriquement la tête en cas de contact direct"
    ],
    reponse: 1,
    explication: "Un court-circuit en basse tension peut produire un arc violent : chaleur intense, projection de cuivre fondu, et un rayonnement ultraviolet qui brûle la cornée (ophtalmie). L'écran facial anti-UV protège contre ces trois effets. Ce n'est pas un isolant contre le contact direct : ce rôle revient aux gants et à l'outillage isolé."
  },
  {
    id: "ch6-q7", chapitre: "ch6", type: "association",
    enonce: "Associez chaque équipement à ce dont il protège.",
    paires: [
      { gauche: "Gants isolants", droite: "Contact avec une pièce nue sous tension" },
      { gauche: "Écran facial anti-UV", droite: "Projections et rayonnement d'un arc électrique" },
      { gauche: "Casque isolant avec jugulaire", droite: "Choc à la tête, chute d'objet, contact au-dessus de soi" },
      { gauche: "Tapis ou nappe isolante au sol", droite: "Liaison du corps avec la terre par les pieds" },
      { gauche: "Balisage et banderoles", droite: "Approche involontaire d'un tiers dans la zone" }
    ],
    explication: "Chaque équipement répond à un risque précis. Savoir POURQUOI on porte un EPI évite de le porter au mauvais moment ou d'en oublier un : le casque avec jugulaire, par exemple, sert surtout quand on se penche dans une armoire, situation où un casque sans jugulaire tomberait."
  },
  {
    id: "ch6-q8", chapitre: "ch6", type: "qcm",
    enonce: "Tu constates qu'un tournevis isolé a l'isolant entaillé près de la lame. Que fais-tu ?",
    options: [
      "Tu l'utilises quand même en faisant attention",
      "Tu le répares avec du ruban isolant",
      "Tu le mets hors service et tu le signales : il part au rebut",
      "Tu ne l'utilises que sur des circuits en 24 V"
    ],
    reponse: 2,
    explication: "Un isolant entaillé n'est plus un isolant : le ruban adhésif ne rétablit ni la tenue diélectrique ni la certification. L'outil est mis hors service, signalé et remplacé. Le réserver au 24 V est un faux raisonnement : il finira par être utilisé ailleurs par quelqu'un d'autre."
  },
  {
    id: "ch6-q9", chapitre: "ch6", type: "qcm",
    enonce: "Quelle est la différence entre la vérification AVANT USAGE et la vérification PÉRIODIQUE d'un EPI ?",
    options: [
      "Aucune, ce sont deux noms pour la même opération",
      "La vérification avant usage est faite par l'utilisateur à chaque fois (visuel + étanchéité) ; la vérification périodique est faite à intervalles réglementés par un service ou un organisme compétent, avec des essais",
      "La vérification périodique est faite par l'utilisateur, l'autre par l'employeur",
      "La vérification avant usage ne concerne que les EPC"
    ],
    reponse: 1,
    explication: "Ce sont deux contrôles complémentaires : l'un est quotidien et sous votre responsabilité (vous regardez, vous gonflez le gant), l'autre est réglementaire, périodique, avec des essais diélectriques et une traçabilité. Les confondre est un piège d'examen fréquent."
  },
  {
    id: "ch6-q10", chapitre: "ch6", type: "situation",
    scenario: "Tu dois faire une mesure de tension dans une armoire 400 V. En sortant tes gants de la caisse à outils, tu remarques une petite trace noire sur l'index. Tu gonfles le gant : il se dégonfle lentement.",
    enonce: "Que fais-tu ?",
    options: [
      "Tu l'utilises : la fuite est minime et la mesure sera rapide",
      "Tu mets le gant au rebut, tu le signales, et tu prends une autre paire vérifiée avant d'intervenir",
      "Tu mets un gant de manutention en cuir par-dessus pour boucher le trou",
      "Tu fais la mesure sans gants, puisque de toute façon les gants sont percés"
    ],
    reponse: 1,
    explication: "Un gant qui fuit est percé : sa tenue diélectrique n'est plus garantie, et le porter donne un faux sentiment de sécurité, ce qui est pire que de savoir qu'on n'est pas protégé. Il part au rebut et on le signale pour qu'il ne retourne pas dans la caisse. On range d'ailleurs les gants dans leur étui, pas au contact des tournevis."
  },
  {
    id: "ch6-q11", chapitre: "ch6", type: "qcm_multiple",
    enonce: "Quelles précautions concernent le stockage et l'entretien des gants isolants ? (plusieurs réponses possibles)",
    options: [
      "Les ranger dans leur étui ou leur boîte, à plat",
      "Les tenir à l'abri de la chaleur, du soleil, de l'huile et des solvants",
      "Les stocker en boule au fond de la caisse à outils, avec les pinces et tournevis",
      "Contrôler la date de la dernière vérification périodique avant usage"
    ],
    reponses: [0, 1, 3],
    explication: "Le caoutchouc des gants se dégrade avec les UV, la chaleur, les hydrocarbures et les solvants, et se perce au contact d'outils pointus. Un rangement soigné dans l'étui prévu, à l'abri, prolonge la protection — et un contrôle de la date de vérification périodique évite d'utiliser des gants hors validité."
  },

  /* ================================ CHAPITRE 7 — INTERVENTIONS BR ====== */
  {
    id: "ch7-q1", chapitre: "ch7", type: "qcm_multiple",
    enonce: "Quelles opérations font partie des interventions BT du chargé d'intervention BR ? (plusieurs réponses possibles)",
    options: [
      "Le dépannage",
      "Le mesurage",
      "Le remplacement d'un composant",
      "Le raccordement sur un circuit en attente",
      "La consignation pour le compte d'une équipe de travaux",
      "L'essai et la vérification"
    ],
    reponses: [0, 1, 2, 3, 5],
    explication: "Le BR couvre le dépannage, le mesurage, l'essai, la vérification, le raccordement et le remplacement. En revanche, consigner pour le compte d'une équipe de travaux est le rôle du chargé de consignation (BC) : le BR ne fait que la mise en sécurité de SON propre périmètre d'intervention."
  },
  {
    id: "ch7-q2", chapitre: "ch7", type: "qcm",
    enonce: "Dans un dépannage, quelle phase peut nécessiter d'opérer EN PRÉSENCE de tension ?",
    options: [
      "La réparation elle-même",
      "La recherche de la panne (les mesures nécessaires au diagnostic)",
      "Le remplacement du composant défectueux",
      "Le remontage des capots"
    ],
    reponse: 1,
    explication: "On ne peut pas diagnostiquer une installation morte : la recherche de panne se fait souvent sous tension, avec EPI et outils isolés. Mais dès qu'il s'agit de RÉPARER ou de REMPLACER, on repasse hors tension. C'est LA nuance à ne pas rater sur le BR."
  },
  {
    id: "ch7-q3", chapitre: "ch7", type: "ordre",
    enonce: "Remettez dans l'ordre les étapes d'un dépannage réalisé par un BR.",
    elements: [
      "Préparation et analyse : demande, schémas, risques, autorisation",
      "Recherche de la panne (mesures, éventuellement en présence de tension)",
      "Mise en sécurité : séparation, condamnation, identification, VAT",
      "Élimination de la panne : réparation ou remplacement, hors tension",
      "Essais et remise en service (capots remontés, balisage retiré)",
      "Compte rendu au demandeur et au chargé d'exploitation"
    ],
    explication: "Le dépannage est une démarche complète : on prépare, on diagnostique, on sécurise, on répare, on essaie, on rend compte. Deux étapes sont souvent oubliées à l'examen : la mise en sécurité AVANT la réparation, et le compte rendu final qui fait partie intégrante de l'intervention."
  },
  {
    id: "ch7-q4", chapitre: "ch7", type: "situation",
    scenario: "Tu dois remplacer un contacteur qui ne colle plus dans une armoire 400 V. Le moteur est à l'arrêt, l'armoire est sous tension et tu viens d'arriver avec ta caisse à outils.",
    enonce: "Que fais-tu en PREMIER ?",
    options: [
      "Tu ouvres l'armoire et tu démontes le contacteur, c'est un remplacement simple",
      "Tu analyses la situation : tu te fais préciser la demande, tu consultes le schéma, tu t'assures d'avoir l'autorisation du chargé d'exploitation et tu prépares tes EPI",
      "Tu coupes l'alimentation générale de l'atelier pour être tranquille",
      "Tu remplaces le contacteur par un modèle de calibre supérieur pour éviter que ça recommence"
    ],
    reponse: 1,
    explication: "On commence TOUJOURS par la préparation : comprendre la demande, lire le schéma, identifier les sources, évaluer les risques, vérifier son habilitation et obtenir l'autorisation. Couper l'alimentation générale de l'atelier serait disproportionné et dangereux pour d'autres process ; et changer le calibre n'est plus un remplacement à l'identique, donc plus une intervention."
  },
  {
    id: "ch7-q5", chapitre: "ch7", type: "qcm_multiple",
    enonce: "Quelles précautions prends-tu avant d'introduire tes mains dans une armoire sous tension ? (plusieurs réponses possibles)",
    options: [
      "Retirer bague, montre, bracelet et chaîne",
      "Mettre gants isolants et écran facial",
      "Isoler les parties voisines sous tension avec une nappe ou un protecteur",
      "Travailler autant que possible d'une seule main",
      "Poser sa caisse à outils métallique en équilibre sur le bord de l'armoire pour l'avoir sous la main"
    ],
    reponses: [0, 1, 2, 3],
    explication: "Bijoux retirés (ils font un court-circuit parfait), EPI en place, parties voisines isolées, et une seule main dans l'armoire pour éviter le trajet main-main à travers le thorax. Une caisse métallique en équilibre sur l'armoire, en revanche, est un futur court-circuit : on la pose au sol, à côté."
  },
  {
    id: "ch7-q6", chapitre: "ch7", type: "vf",
    enonce: "Quand un fusible a fondu, il faut le remplacer par un fusible de calibre supérieur pour éviter que cela se reproduise.",
    reponse: false,
    explication: "FAUX, et c'est dangereux. Un fusible protège un câble et un matériel avec un calibre calculé : augmenter le calibre laisse passer un courant que le câble ne supporte pas, avec risque d'échauffement et d'incendie. On remplace à l'identique et on CHERCHE la cause de la fusion."
  },
  {
    id: "ch7-q7", chapitre: "ch7", type: "qcm",
    enonce: "Le BR peut-il se faire assister pendant son intervention ?",
    options: [
      "Non, il travaille obligatoirement seul",
      "Oui, par un autre BR ou par un exécutant B1 / B1V qu'il désigne, informe et surveille",
      "Oui, par n'importe quelle personne présente sur le site",
      "Oui, mais seulement par un chargé de consignation BC"
    ],
    reponse: 1,
    explication: "Le BR peut être assisté par un autre BR ou par un exécutant habilité B1 ou B1V. Il le désigne, lui donne les instructions et le surveille : l'assistant reste sous sa responsabilité. En aucun cas il ne peut se faire aider par une personne non habilitée."
  },
  {
    id: "ch7-q8", chapitre: "ch7", type: "trous",
    enonce: "Complétez ce texte sur la mise en sécurité par le BR.",
    texte: "Pour éliminer la panne, le BR repasse {{0}}. Il réalise lui-même la séparation, la {{1}}, l'identification et la {{2}} sur la partie concernée. Le remplacement d'un composant se fait normalement {{3}}.",
    trous: [
      { options: ["hors tension", "sous tension", "en haute tension"], reponse: 0 },
      { options: ["condamnation", "déconsignation", "déclaration"], reponse: 0 },
      { options: ["vérification d'absence de tension", "mesure d'isolement", "mise en service"], reponse: 0 },
      { options: ["à l'identique", "avec un calibre supérieur", "avec la première pièce disponible"], reponse: 0 }
    ],
    explication: "La réparation se fait hors tension : le BR assure sa propre mise en sécurité (séparation, condamnation, identification, VAT) sur son périmètre. Et le remplacement se fait à l'identique — sinon ce n'est plus une intervention mais une modification, donc un travail."
  },
  {
    id: "ch7-q9", chapitre: "ch7", type: "qcm",
    enonce: "Qu'est-ce qui distingue un REMPLACEMENT (intervention BR) d'une MODIFICATION (travaux) ?",
    options: [
      "La durée : moins de deux heures c'est un remplacement",
      "Le remplacement se fait à l'identique ; dès qu'on change un calibre, un schéma ou qu'on ajoute un départ, c'est une modification, donc un travail",
      "Le remplacement se fait sous tension, la modification hors tension",
      "Il n'y a pas de différence dans la pratique"
    ],
    reponse: 1,
    explication: "Le critère est l'identité du matériel et du schéma. Remplacer un contacteur par le même modèle est une intervention. Changer son calibre, ajouter un départ, modifier le câblage change l'installation : cela relève des travaux, avec préparation, éventuelle consignation par un BC et mise à jour du schéma."
  },
  {
    id: "ch7-q10", chapitre: "ch7", type: "qcm_multiple",
    enonce: "Qu'est-ce qui doit obligatoirement être fait à la FIN d'une intervention de dépannage ? (plusieurs réponses possibles)",
    options: [
      "Remettre en place les capots, plastrons et protections",
      "Retirer le balisage et les cadenas posés",
      "Vérifier le bon fonctionnement de l'installation",
      "Rendre compte de l'intervention (nature de la panne, pièce changée, anomalies)",
      "Laisser l'armoire ouverte pour faciliter la prochaine intervention"
    ],
    reponses: [0, 1, 2, 3],
    explication: "Une intervention se termine par la remise en état complet : capots remontés (ce qui supprime la zone de voisinage), balisage et cadenas retirés, fonctionnement vérifié, et compte rendu écrit. Laisser une armoire ouverte, c'est laisser des pièces nues sous tension accessibles à n'importe qui."
  },
  {
    id: "ch7-q11", chapitre: "ch7", type: "vf",
    enonce: "Une habilitation BR permet de réaliser une intervention de dépannage sur un ouvrage en haute tension si la panne est simple.",
    reponse: false,
    explication: "FAUX. La lettre B limite strictement au domaine de la basse et très basse tension, quelle que soit la simplicité apparente de l'opération. Pour la haute tension il faut une habilitation H, avec une formation et des règles totalement différentes."
  },

  /* ================================ CHAPITRE 8 — ACCIDENT / INCENDIE == */
  {
    id: "ch8-q1", chapitre: "ch8", type: "ordre",
    enonce: "Remettez dans l'ordre la conduite à tenir face à une victime d'accident électrique.",
    elements: [
      "PROTÉGER : couper le courant, ou dégager la victime avec un isolant sec",
      "ALERTER ou faire alerter les secours",
      "SECOURIR dans la limite de ses compétences"
    ],
    explication: "PROTÉGER, ALERTER, SECOURIR, toujours dans cet ordre. Si on alerte ou si on secourt avant d'avoir supprimé le danger, on risque de devenir la deuxième victime — et les secours en trouveront deux au lieu d'une."
  },
  {
    id: "ch8-q2", chapitre: "ch8", type: "qcm",
    enonce: "Un collègue est en contact avec un conducteur sous tension et ne peut plus lâcher. Que fais-tu en premier ?",
    options: [
      "Tu le tires par le bras pour l'éloigner",
      "Tu coupes le courant (arrêt d'urgence, disjoncteur, sectionneur, débrancher la prise)",
      "Tu appelles le 18 avant toute chose",
      "Tu lui jettes de l'eau pour le réveiller"
    ],
    reponse: 1,
    explication: "Le corps de la victime est sous tension : le toucher à mains nues vous électriserait à votre tour. On coupe le courant en priorité. Si c'est impossible, on la dégage SANS la toucher directement, avec un isolant sec (planche, manche en bois sec), en s'isolant du sol."
  },
  {
    id: "ch8-q3", chapitre: "ch8", type: "association",
    enonce: "Associez chaque numéro d'urgence à son service.",
    paires: [
      { gauche: "15", droite: "SAMU — urgence médicale" },
      { gauche: "18", droite: "Sapeurs-pompiers — secours et incendie" },
      { gauche: "112", droite: "Numéro d'urgence européen" },
      { gauche: "114", droite: "Urgences par SMS pour personnes sourdes ou malentendantes" }
    ],
    explication: "Le 112 fonctionne partout en Europe et depuis un portable même sans réseau de votre opérateur : c'est celui à retenir en cas de doute. Le 114 permet d'alerter par SMS. En entreprise, on utilise aussi le numéro interne et on prévient le sauveteur secouriste du travail."
  },
  {
    id: "ch8-q4", chapitre: "ch8", type: "qcm_multiple",
    enonce: "Que doit contenir un message d'alerte efficace ? (plusieurs réponses possibles)",
    options: [
      "Qui vous êtes et d'où vous appelez, avec l'adresse précise et les accès",
      "La nature de l'accident (accident électrique, tension en jeu)",
      "Le nombre de victimes et leur état (consciente ? respire ?)",
      "Ce qui a déjà été fait (courant coupé, gestes de secours entrepris)",
      "La marque et le modèle de l'armoire électrique concernée"
    ],
    reponses: [0, 1, 2, 3],
    explication: "Les secours ont besoin de savoir où venir, comment entrer, ce qui s'est passé, combien de victimes, dans quel état, et ce qui a déjà été fait. La référence commerciale du matériel ne leur sert à rien. Et on ne raccroche pas le premier : ils peuvent avoir des consignes à donner."
  },
  {
    id: "ch8-q5", chapitre: "ch8", type: "vf",
    enonce: "On peut éteindre un début d'incendie dans une armoire électrique sous tension avec un extincteur à eau en jet plein.",
    reponse: false,
    explication: "FAUX, et c'est très dangereux : l'eau est conductrice, le jet ramène la tension jusqu'à l'opérateur. Sur un feu d'origine électrique on utilise un extincteur au CO2 ou à poudre, et on coupe l'alimentation si c'est possible."
  },
  {
    id: "ch8-q6", chapitre: "ch8", type: "qcm",
    enonce: "Pourquoi l'extincteur au CO2 est-il souvent préféré sur un feu d'armoire électrique ?",
    options: [
      "Parce qu'il refroidit mieux les flammes que tout autre agent",
      "Parce qu'il est isolant et qu'il ne détériore pas le matériel électronique, contrairement à la poudre",
      "Parce qu'il n'a aucun inconvénient d'utilisation",
      "Parce qu'il est utilisable les yeux fermés dans un local fermé"
    ],
    reponse: 1,
    explication: "Le CO2 étouffe le feu sans laisser de résidu et sans détériorer l'électronique, contrairement à la poudre qui est très corrosive et salissante. Mais il a deux inconvénients : le givre au diffuseur (risque de gelure aux mains) et le fait qu'il chasse l'oxygène — donc prudence dans un local fermé."
  },
  {
    id: "ch8-q7", chapitre: "ch8", type: "situation",
    scenario: "Un collègue a reçu une décharge de 230 V dans les doigts. Il est debout, conscient, il plaisante et te dit qu'il va très bien et qu'il reprend le travail.",
    enonce: "Quelle est la bonne conduite ?",
    options: [
      "Le laisser reprendre, puisqu'il va bien",
      "Le faire voir par un médecin même s'il se sent bien, le surveiller, et déclarer l'accident",
      "Lui faire boire un café sucré et attendre une heure",
      "Lui faire un massage cardiaque par précaution"
    ],
    reponse: 1,
    explication: "Une électrisation peut provoquer des brûlures internes invisibles et des troubles du rythme cardiaque qui apparaissent PLUSIEURS HEURES après. La consultation médicale est obligatoire, la personne ne doit pas rester seule, et l'accident se déclare — c'est ce qui permettra de corriger l'installation. Le massage cardiaque ne se pratique jamais sur une personne consciente qui respire."
  },
  {
    id: "ch8-q8", chapitre: "ch8", type: "qcm",
    enonce: "Une victime d'électrisation est inconsciente et ne respire pas. Quelle est la priorité absolue, après avoir protégé et alerté ?",
    options: [
      "L'asperger d'eau froide pour la réveiller",
      "Démarrer le massage cardiaque et mettre en œuvre le défibrillateur (DAE) dès qu'il est disponible",
      "La mettre en position latérale de sécurité",
      "Lui donner à boire"
    ],
    reponse: 1,
    explication: "L'arrêt cardiaque par fibrillation ventriculaire est le mécanisme typique de l'électrocution, et c'est précisément ce que le défibrillateur sait corriger. Massage cardiaque immédiat et DAE au plus vite : chaque minute compte. La position latérale de sécurité, elle, s'utilise pour une personne inconsciente QUI RESPIRE."
  },
  {
    id: "ch8-q9", chapitre: "ch8", type: "qcm_multiple",
    enonce: "Face à un début d'incendie dans un local électrique, quelles actions sont correctes ? (plusieurs réponses possibles)",
    options: [
      "Couper l'alimentation électrique si c'est possible et sans danger",
      "Donner l'alerte et faire évacuer",
      "N'attaquer le feu que s'il est naissant, si l'on est formé, et avec un extincteur adapté",
      "Entrer dans un local haute tension en feu pour sauver le matériel",
      "Remettre l'installation sous tension juste après l'extinction pour vérifier qu'elle fonctionne"
    ],
    reponses: [0, 1, 2],
    explication: "Couper, alerter, évacuer, puis éventuellement attaquer un feu naissant avec le bon extincteur. On n'entre jamais dans un local haute tension en feu : l'arc peut amorcer à distance, on attend les pompiers et l'exploitant. Et après un sinistre, l'installation doit être vérifiée avant toute remise sous tension."
  },
  {
    id: "ch8-q10", chapitre: "ch8", type: "vf",
    enonce: "Si la coupure du courant est impossible, on peut dégager la victime en la tirant avec un objet isolant et sec, sans la toucher directement.",
    reponse: true,
    explication: "VRAI. C'est la solution de repli quand la coupure est impossible ou trop longue à atteindre : on utilise un isolant SEC (planche, manche en bois, corde sèche), on s'isole soi-même du sol, et on ne touche jamais la victime à mains nues. Cela ne vaut qu'en basse tension : en haute tension, on ne s'approche pas et on fait consigner par l'exploitant."
  },

  /* ================================ CHAPITRE 9 — LES DOCUMENTS ========= */
  {
    id: "ch9-q1", chapitre: "ch9", type: "association",
    enonce: "Associez chaque document à celui qui le DÉLIVRE.",
    paires: [
      { gauche: "Attestation de consignation", droite: "Le chargé de consignation (BC)" },
      { gauche: "Avis de fin de travail", droite: "Le chargé de travaux (B2 / B2V)" },
      { gauche: "Autorisation de travail", droite: "Le chargé d'exploitation électrique" },
      { gauche: "Titre d'habilitation", droite: "L'employeur" }
    ],
    explication: "Retenez le sens de circulation : le BC donne l'autorisation d'y aller (attestation de consignation), le chargé de travaux rend le terrain (avis de fin de travail), le chargé d'exploitation autorise l'opération sur son ouvrage, et l'employeur habilite les personnes."
  },
  {
    id: "ch9-q2", chapitre: "ch9", type: "qcm",
    enonce: "Que signifie la remise de l'AVIS DE FIN DE TRAVAIL ?",
    options: [
      "Que la consignation vient d'être réalisée et que l'équipe peut commencer",
      "Que les travaux sont terminés, le personnel retiré et les protections remises : la remise sous tension devient possible",
      "Que le chantier est interrompu pour la pause déjeuner",
      "Que l'habilitation du chargé de travaux arrive à échéance"
    ],
    reponse: 1,
    explication: "L'avis de fin de travail est remis par le chargé de travaux au chargé de consignation (ou au chargé d'exploitation). Il signifie que le terrain est rendu : dès cet instant, le chargé de travaux n'a plus le droit de faire travailler son équipe sur l'ouvrage, et la déconsignation peut commencer."
  },
  {
    id: "ch9-q3", chapitre: "ch9", type: "qcm",
    enonce: "À quoi sert l'ATTESTATION DE PREMIÈRE ÉTAPE DE CONSIGNATION ?",
    options: [
      "À indiquer que les quatre étapes de consignation sont terminées",
      "À indiquer que la séparation et la condamnation sont faites, le chargé de travaux devant réaliser lui-même l'identification et la VAT",
      "À autoriser un travail sous tension",
      "À remplacer le titre d'habilitation sur un chantier extérieur"
    ],
    reponse: 1,
    explication: "C'est le document de la consignation en DEUX étapes : le BC a séparé et condamné, il transfère la suite au chargé de travaux qui identifiera l'ouvrage et fera la VAT sur le lieu de travail. Pratique quand le point de coupure est loin du chantier."
  },
  {
    id: "ch9-q4", chapitre: "ch9", type: "vf",
    enonce: "C'est l'organisme de formation qui délivre le titre d'habilitation à la fin du stage.",
    reponse: false,
    explication: "FAUX. L'organisme délivre une ATTESTATION DE FORMATION (il certifie que vous avez suivi le stage et réussi l'évaluation). Le TITRE D'HABILITATION est délivré et signé par l'EMPLOYEUR, qui connaît les installations et les tâches qu'il vous confie."
  },
  {
    id: "ch9-q5", chapitre: "ch9", type: "qcm_multiple",
    enonce: "Quelles informations figurent sur un titre d'habilitation ? (plusieurs réponses possibles)",
    options: [
      "L'identité du titulaire et celle de l'employeur",
      "Le ou les symboles d'habilitation et le domaine de tension",
      "Les ouvrages ou installations concernés et les restrictions éventuelles",
      "La date de délivrance et la durée de validité",
      "Le salaire du titulaire"
    ],
    reponses: [0, 1, 2, 3],
    explication: "Le titre identifie la personne, l'employeur, les symboles, le domaine de tension, le périmètre (ouvrages concernés), les éventuelles restrictions ou indications supplémentaires, et sa validité dans le temps. Il est signé par les deux parties et il est personnel."
  },
  {
    id: "ch9-q6", chapitre: "ch9", type: "association",
    enonce: "Associez chaque acteur à sa responsabilité.",
    paires: [
      { gauche: "Chargé d'exploitation électrique", droite: "Responsable de l'exploitation de l'ouvrage, délivre les autorisations de travail" },
      { gauche: "Chargé de consignation (BC)", droite: "Consigne, délivre l'attestation, déconsigne" },
      { gauche: "Chargé de travaux (B2V)", droite: "Dirige les travaux et veille à la sécurité de son équipe" },
      { gauche: "Exécutant (B1V)", droite: "Exécute ce que le chargé de travaux lui prescrit" },
      { gauche: "Surveillant de sécurité électrique", droite: "Surveille en permanence et ne participe pas aux travaux" }
    ],
    explication: "Chaque rôle a un périmètre précis. Le point souvent oublié : le surveillant de sécurité électrique SURVEILLE, c'est tout. S'il se met à travailler, il ne surveille plus, et la mesure de sécurité disparaît au moment où on en a le plus besoin."
  },
  {
    id: "ch9-q7", chapitre: "ch9", type: "qcm",
    enonce: "Qui délivre l'AUTORISATION DE TRAVAIL ?",
    options: [
      "Le chargé d'exploitation électrique",
      "Le chargé de travaux",
      "L'exécutant B1V",
      "Le médecin du travail"
    ],
    reponse: 0,
    explication: "L'autorisation de travail vient du chargé d'exploitation électrique, qui est responsable de l'ouvrage. Elle précise l'ouvrage concerné, la nature de l'opération, les limites et les mesures de sécurité à respecter. Ne la confondez pas avec l'attestation de consignation, qui vient du BC."
  },
  {
    id: "ch9-q8", chapitre: "ch9", type: "trous",
    enonce: "Complétez le circuit des documents lors d'un chantier de travaux hors tension.",
    texte: "Le chargé d'exploitation électrique délivre l'{{0}}. Le chargé de consignation remet l'{{1}} au chargé de travaux. En fin de chantier, le chargé de travaux remet l'{{2}} au chargé de consignation, qui peut alors {{3}}.",
    trous: [
      { options: ["autorisation de travail", "attestation de consignation", "avis de fin de travail"], reponse: 0 },
      { options: ["autorisation de travail", "attestation de consignation", "avis de fin de travail"], reponse: 1 },
      { options: ["autorisation de travail", "attestation de consignation", "avis de fin de travail"], reponse: 2 },
      { options: ["déconsigner et remettre sous tension", "commencer les travaux", "délivrer un titre d'habilitation"], reponse: 0 }
    ],
    explication: "Le circuit est logique : autorisation de l'exploitant → consignation par le BC (attestation) → travaux → avis de fin de travail → déconsignation et remise sous tension. Chaque document matérialise un transfert de responsabilité."
  },
  {
    id: "ch9-q9", chapitre: "ch9", type: "situation",
    scenario: "Ton équipe a terminé le remplacement d'un jeu de barres. Tu es le chargé de travaux B2V. Il est 17 h, tout le monde veut partir, les capots sont remontés, le balisage est retiré et l'équipe est sortie de la zone. Le BC est encore sur place avec ses cadenas.",
    enonce: "Que dois-tu faire avant de partir ?",
    options: [
      "Rien de spécial, tu peux partir puisque les travaux sont finis",
      "Remettre l'avis de fin de travail au chargé de consignation, après avoir vérifié que le personnel est bien retiré et l'ouvrage en état",
      "Retirer toi-même les cadenas du BC pour lui faire gagner du temps",
      "Remettre l'installation sous tension toi-même pour tester"
    ],
    reponse: 1,
    explication: "Le chargé de travaux doit remettre l'avis de fin de travail : c'est ce document qui autorise le BC à déconsigner. Retirer les cadenas d'un autre est formellement interdit, et la remise sous tension appartient au BC ou au chargé d'exploitation, pas au chargé de travaux."
  },
  {
    id: "ch9-q10", chapitre: "ch9", type: "qcm",
    enonce: "Pourquoi les schémas électriques à jour sont-ils un document de sécurité ?",
    options: [
      "Parce qu'ils sont exigés pour la comptabilité de l'entreprise",
      "Parce qu'ils permettent l'IDENTIFICATION de l'ouvrage lors d'une consignation et le repérage de toutes les sources d'alimentation",
      "Parce qu'ils remplacent la vérification d'absence de tension",
      "Parce qu'ils indiquent la date de la prochaine vérification des EPI"
    ],
    reponse: 1,
    explication: "L'identification, troisième étape de la consignation, repose sur les schémas : c'est grâce à eux qu'on est sûr de travailler sur le bon départ et qu'on repère une seconde alimentation. Un schéma faux ou périmé est un piège mortel — mais attention, un schéma ne remplace JAMAIS la VAT."
  },

  /* ============ COMPLÉMENTS — THÈME « DANGERS » (ch1 et ch8) ============ */
  {
    id: "ch1-q12", chapitre: "ch1", type: "qcm",
    enonce: "Pourquoi un dispositif différentiel est-il calibré à 30 mA dans les locaux d'habitation et de travail ?",
    options: [
      "Parce que 30 mA est l'intensité maximale que peut fournir une prise de courant",
      "Parce qu'au-delà de 30 mA le courant peut tétaniser les muscles respiratoires et provoquer une asphyxie s'il persiste",
      "Parce que 30 mA correspond au seuil de perception du courant",
      "Parce que les disjoncteurs ne savent pas détecter une valeur plus faible"
    ],
    reponse: 1,
    explication: "30 mA est le seuil de dangerosité : à cette intensité, les muscles respiratoires se tétanisent et la victime s'asphyxie si le courant persiste. Le différentiel coupe donc avant que ce seuil ne devienne mortel. Le seuil de perception est bien plus bas (0,5 à 1 mA)."
  },
  {
    id: "ch1-q13", chapitre: "ch1", type: "vf",
    enonce: "À intensité égale, le courant continu provoque plus facilement une fibrillation ventriculaire que le courant alternatif à 50 Hz.",
    reponse: false,
    explication: "FAUX, c'est l'inverse. L'alternatif à 50 Hz est particulièrement apte à désorganiser le rythme cardiaque. C'est pour cette raison que les bornes des domaines de tension sont plus élevées en continu (TBT jusqu'à 120 V en continu contre 50 V en alternatif). Le continu reste dangereux : il brûle et provoque une électrolyse des tissus."
  },
  {
    id: "ch8-q11", chapitre: "ch8", type: "qcm",
    enonce: "Vous devez utiliser un extincteur au CO2 dans un petit local technique fermé. Quelle précaution particulière prenez-vous ?",
    options: [
      "Aucune, le CO2 est totalement inoffensif",
      "Ne pas rester enfermé : le CO2 chasse l'oxygène. Et ne pas toucher le diffuseur, qui givre et peut geler les mains",
      "Mouiller le sol avant pour éviter les étincelles",
      "Retirer ses gants isolants pour mieux tenir l'extincteur"
    ],
    reponse: 1,
    explication: "Le CO2 étouffe le feu en remplaçant l'oxygène : dans un volume fermé, il devient dangereux pour l'opérateur. Et la détente du gaz refroidit fortement le diffuseur, d'où le risque de gelure. On garde donc ses gants et on se ménage une sortie."
  },
  {
    id: "ch8-q12", chapitre: "ch8", type: "vf",
    enonce: "Un accident électrique sans blessure apparente — « j'ai juste pris une châtaigne » — n'a pas besoin d'être déclaré.",
    reponse: false,
    explication: "FAUX. Tout accident, même sans blessure visible, doit être déclaré : c'est ce qui permet d'analyser la cause et de corriger l'installation avant le prochain, qui pourrait être grave. Et la victime doit malgré tout voir un médecin, car les troubles cardiaques peuvent survenir plus tard."
  },

  /* ============ COMPLÉMENTS — THÈME « ZONES ET DISTANCES » (ch2, ch4) === */
  {
    id: "ch2-q12", chapitre: "ch2", type: "qcm",
    enonce: "Une batterie de secours délivre 110 V en continu. Dans quel domaine de tension se situe-t-elle ?",
    options: ["TBT", "BTA", "BTB", "HTA"],
    reponse: 0,
    explication: "En continu, la TBT va jusqu'à 120 V : 110 V continu est donc de la TBT. Attention : en alternatif, 110 V serait du BTA. C'est exactement le piège du tableau, il faut toujours vérifier d'abord la nature du courant."
  },
  {
    id: "ch2-q13", chapitre: "ch2", type: "qcm_multiple",
    enonce: "Quelles tensions appartiennent au domaine BTA ? (plusieurs réponses possibles)",
    options: [
      "230 V alternatif",
      "400 V alternatif",
      "690 V alternatif",
      "600 V continu",
      "1 200 V continu"
    ],
    reponses: [0, 1, 3],
    explication: "BTA : de 50 à 500 V en alternatif, et de 120 à 750 V en continu. Donc 230 V et 400 V alternatif sont du BTA, ainsi que 600 V continu. En revanche 690 V alternatif dépasse 500 V (c'est du BTB) et 1 200 V continu dépasse 750 V (c'est aussi du BTB)."
  },
  {
    id: "ch2-q14", chapitre: "ch2", type: "trous",
    enonce: "Complétez les bornes du domaine haute tension.",
    texte: "La frontière entre basse et haute tension se situe à {{0}} en alternatif et à {{1}} en continu. Au-delà de {{2}} en alternatif, on quitte la HTA pour la HTB.",
    trous: [
      { options: ["500 V", "750 V", "1 000 V", "1 500 V"], reponse: 2 },
      { options: ["750 V", "1 000 V", "1 500 V", "75 000 V"], reponse: 2 },
      { options: ["1 000 V", "50 000 V", "75 000 V", "400 000 V"], reponse: 1 }
    ],
    explication: "Alternatif : BT jusqu'à 1 000 V, HTA de 1 000 à 50 000 V, HTB au-delà. Continu : BT jusqu'à 1 500 V, HTA de 1 500 à 75 000 V, HTB au-delà."
  },
  {
    id: "ch2-q15", chapitre: "ch2", type: "vf",
    enonce: "Un circuit en TBTF (très basse tension fonctionnelle) offre la même garantie de sécurité qu'un circuit en TBTS.",
    reponse: false,
    explication: "FAUX. En TBTS, le circuit est séparé de la terre et des autres circuits par un transformateur de sécurité : c'est le régime le plus protecteur. En TBTF, la tension est basse pour des raisons de FONCTIONNEMENT, sans garantie de séparation : un défaut sur le circuit primaire peut ramener une tension dangereuse."
  },
  {
    id: "ch2-q16", chapitre: "ch2", type: "situation",
    scenario: "Tu dois intervenir sur un onduleur industriel. L'entrée est en 400 V alternatif, le bus continu interne est à 650 V continu, et la sortie alimente des circuits de commande en 24 V continu.",
    enonce: "Quel domaine de tension détermine tes équipements de protection ?",
    options: [
      "Le 24 V continu, car c'est la tension de sortie",
      "Le domaine le plus contraignant présent dans l'armoire : ici le 650 V continu, qui est du BTA, et le 400 V alternatif, également du BTA",
      "Le 650 V continu, qui est du BTB",
      "Aucun, un onduleur n'est jamais dangereux quand il est éteint"
    ],
    reponse: 1,
    explication: "On se protège toujours par rapport au niveau le plus contraignant réellement présent. Ici, 400 V alternatif (BTA) et 650 V continu (BTA, car la BTA continue va jusqu'à 750 V) : on est en BTA. Et un onduleur « éteint » garde ses batteries et ses condensateurs chargés : le danger persiste après la coupure."
  },
  {
    id: "ch4-q11", chapitre: "ch4", type: "qcm",
    enonce: "Que vaut la distance limite d'investigation (DLI), et qu'implique-t-elle ?",
    options: [
      "3 m : au-delà, on est en voisinage simple",
      "50 m : au-delà de cette distance, aucune prescription liée au risque électrique ne s'applique",
      "0,30 m : c'est la limite du voisinage renforcé en BT",
      "5 m : c'est la limite d'approche des lignes aériennes HTB"
    ],
    reponse: 1,
    explication: "La DLI vaut 50 m. Au-delà, plus aucune prescription liée au risque électrique. La zone d'investigation (zone 0) se situe donc ENTRE la DLI (50 m) et la DLVS : c'est là qu'on repère et qu'on prépare, typiquement autour d'une ligne aérienne."
  },
  {
    id: "ch4-q12", chapitre: "ch4", type: "qcm",
    enonce: "Combien de zones d'environnement existe-t-il en BASSE tension, et lesquelles ?",
    options: [
      "Quatre : 1, 2, 3 et 4",
      "Trois : les zones 0, 1 et 4",
      "Cinq : de 0 à 4",
      "Deux : le voisinage simple et le voisinage renforcé"
    ],
    reponse: 1,
    explication: "La basse tension ne connaît que trois zones : la 0 (investigation), la 1 (voisinage simple) et la 4 (voisinage renforcé BT). Les zones 2 et 3 sont propres à la HAUTE tension : zone 2 = voisinage renforcé HT, zone 3 = travaux sous tension HT."
  },
  {
    id: "ch4-q13", chapitre: "ch4", type: "qcm",
    enonce: "En HTA (20 000 V), que vaut la distance limite de voisinage renforcé (DLVR) ?",
    options: ["0,30 m", "2 m", "3 m", "50 m"],
    reponse: 1,
    explication: "En HTA (de 1 000 à 50 000 V), la DLVR vaut 2 m. Elle augmente avec la tension : 3 m de 50 à 250 kV, 4 m de 250 à 500 kV. En basse tension, elle n'est que de 0,30 m. Franchir la DLVR, c'est entrer en zone 2 en HT et en zone 4 en BT."
  },
  {
    id: "ch4-q14", chapitre: "ch4", type: "trous",
    enonce: "Complétez les distances en basse tension.",
    texte: "En BT, la distance limite d'investigation vaut {{0}}, la distance limite de voisinage simple {{1}}, et la distance limite de voisinage renforcé {{2}}. Franchir cette dernière fait entrer en zone {{3}}.",
    trous: [
      { options: ["3 m", "5 m", "50 m", "100 m"], reponse: 2 },
      { options: ["0,30 m", "1 m", "3 m", "5 m"], reponse: 2 },
      { options: ["0,10 m", "0,30 m", "0,50 m", "2 m"], reponse: 1 },
      { options: ["1", "2", "3", "4"], reponse: 3 }
    ],
    explication: "DLI = 50 m, DLVS = 3 m, DLVR = 0,30 m en BT. Franchir la DLVR en basse tension fait entrer en ZONE 4, le voisinage renforcé, qui exige la lettre V ou une habilitation BR."
  },
  {
    id: "ch4-q15", chapitre: "ch4", type: "vf",
    enonce: "En haute tension, la zone de travaux sous tension porte le numéro 4.",
    reponse: false,
    explication: "FAUX : en haute tension, la zone de travaux sous tension est la ZONE 3 (à l'intérieur de la DMA). La zone 4 n'existe qu'en BASSE tension, où elle désigne le voisinage renforcé. C'est la confusion la plus fréquente sur ce chapitre."
  },
  {
    id: "ch4-q16", chapitre: "ch4", type: "qcm",
    enonce: "Comment se calcule la distance minimale d'approche (DMA) ?",
    options: [
      "Elle vaut toujours 0,30 m, quelle que soit la tension",
      "C'est la distance de tension (liée au niveau de tension) à laquelle on ajoute une distance de garde : 0,30 m en BT, 0,50 m en HT",
      "C'est la moitié de la distance limite de voisinage simple",
      "Elle est fixée librement par le chargé de travaux"
    ],
    reponse: 1,
    explication: "La DMA additionne une distance de tension, qui dépend du niveau de tension, et une distance de garde qui couvre les mouvements involontaires de l'opérateur : 0,30 m en BT, 0,50 m en HT. En basse tension, la DMA se confond en pratique avec la DLVR de 0,30 m."
  },

  /* ============ COMPLÉMENTS — THÈME « PROTECTIONS » (ch6) ============== */
  {
    id: "ch6-q12", chapitre: "ch6", type: "qcm",
    enonce: "Vous devez travailler sur un circuit 230 V. Quelle classe de gants isolants au minimum ?",
    options: [
      "Classe 00, qui couvre les usages jusqu'à 500 V",
      "Classe 2, qui couvre jusqu'à 17 000 V",
      "Aucune classe n'est nécessaire en dessous de 400 V",
      "Des gants de manutention en cuir suffisent"
    ],
    reponse: 0,
    explication: "La classe 00 couvre les usages jusqu'à 500 V, ce qui englobe le 230 V. La classe 0 monte à 1 000 V et convient donc aussi. Prendre une classe supérieure n'est pas une faute de sécurité mais réduit la dextérité. Les gants de cuir ne protègent QUE mécaniquement : ils ne sont pas isolants."
  },
  {
    id: "ch6-q13", chapitre: "ch6", type: "qcm",
    enonce: "À quelle fréquence l'essai diélectrique périodique des gants isolants doit-il être réalisé ?",
    options: ["Tous les mois", "Tous les 6 mois", "Tous les 3 ans", "Uniquement à l'achat"],
    reponse: 1,
    explication: "L'essai diélectrique en laboratoire accrédité se fait tous les 6 mois. Le délai maximal entre la fabrication et la première mise en service est également de 6 mois. Cet essai périodique ne remplace PAS votre contrôle visuel et le gonflage avant chaque usage."
  },
  {
    id: "ch6-q14", chapitre: "ch6", type: "vf",
    enonce: "Un gant isolant qui a été en contact avec du solvant peut être conservé s'il ne présente aucun défaut visible.",
    reponse: false,
    explication: "FAUX. Un gant ayant touché un hydrocarbure, un solvant ou une source de chaleur excessive est éliminé immédiatement, quel que soit son aspect : ces produits attaquent le caoutchouc en profondeur et la perte de tenue diélectrique ne se voit pas à l'œil."
  },
  {
    id: "ch6-q15", chapitre: "ch6", type: "association",
    enonce: "Associez chaque classe de gants à sa tension d'usage maximale.",
    paires: [
      { gauche: "Classe 00", droite: "500 V" },
      { gauche: "Classe 0", droite: "1 000 V" },
      { gauche: "Classe 2", droite: "17 000 V" },
      { gauche: "Classe 4", droite: "36 000 V" }
    ],
    explication: "Les classes 00 et 0 couvrent la basse tension (500 V et 1 000 V). Les classes 1 à 4 montent progressivement jusqu'à 36 000 V pour la haute tension. La classe est marquée sur le gant : c'est la première chose à lire avant de l'enfiler."
  },
  {
    id: "ch6-q16", chapitre: "ch6", type: "situation",
    scenario: "Tu ouvres l'armoire de consignation : les gants de la caisse commune portent une étiquette de vérification datée de 11 mois. Aucun défaut visible, le gonflage est bon.",
    enonce: "Que fais-tu ?",
    options: [
      "Tu les utilises : ils sont visuellement bons et étanches",
      "Tu ne les utilises pas : l'essai diélectrique périodique est dépassé (6 mois). Tu les signales et tu prends une paire à jour",
      "Tu les utilises seulement pour du 24 V",
      "Tu refais toi-même l'essai diélectrique avec un mégohmmètre"
    ],
    reponse: 1,
    explication: "Le contrôle visuel et le gonflage sont nécessaires mais pas suffisants : la tenue diélectrique se dégrade sans signe visible, d'où l'essai périodique tous les 6 mois. À 11 mois, les gants sont hors validité. Et l'essai diélectrique ne s'improvise pas : il exige un laboratoire accrédité, pas un mégohmmètre de terrain."
  },

  /* ============ COMPLÉMENTS — THÈME « LIMITES » (ch3, ch7, ch9) ======== */
  {
    id: "ch3-q13", chapitre: "ch3", type: "qcm",
    enonce: "Dans quelles limites de tension et d'intensité un BR peut-il réaliser une intervention BT générale ?",
    options: [
      "230 V et 16 A",
      "500 V alternatif (750 V continu) et 63 A alternatif (32 A continu)",
      "1 000 V et 100 A",
      "Aucune limite en basse tension"
    ],
    reponse: 1,
    explication: "L'intervention BT générale est bornée : circuits alimentés en BT ou TBT, protégés contre les courts-circuits, dans la limite de 500 V en alternatif (750 V en continu) et 63 A en alternatif (32 A en continu). Au-delà, ce n'est plus une intervention : il faut organiser des travaux."
  },
  {
    id: "ch3-q14", chapitre: "ch3", type: "qcm",
    enonce: "Quelle est la durée de validité d'un titre d'habilitation dans le cas général ?",
    options: ["1 an", "3 ans", "5 ans", "Illimitée"],
    reponse: 1,
    explication: "3 ans dans le cas général, ramenée à 1 an pour les travaux sous tension. Entre deux recyclages, l'employeur assure un suivi annuel pour vérifier que l'habilitation correspond toujours aux opérations confiées. La périodicité de recyclage recommandée est également de 3 ans."
  },
  {
    id: "ch7-q12", chapitre: "ch7", type: "situation",
    scenario: "Un départ moteur est protégé par un disjoncteur de 80 A en 400 V triphasé. Le moteur ne démarre plus et on te demande, en tant que BR, de dépanner.",
    enonce: "Que dois-tu constater avant toute chose ?",
    options: [
      "Rien de particulier : 400 V est bien de la basse tension, je peux intervenir",
      "Le circuit dépasse la limite de 63 A de l'intervention BT générale : je ne peux pas traiter cela comme une intervention, il faut en informer le chargé d'exploitation et organiser des travaux",
      "Je peux intervenir si je mets des gants de classe 0",
      "Je remplace le disjoncteur 80 A par un 63 A pour rentrer dans les limites"
    ],
    reponse: 1,
    explication: "L'intervention BT générale est limitée à 63 A en alternatif. Un circuit protégé à 80 A sort de ce périmètre : il faut passer par une opération de travaux, avec consignation par un BC et un chargé de travaux. Et changer le calibre de la protection pour « rentrer dans les limites » serait une modification de l'installation, donc une faute grave."
  },
  {
    id: "ch7-q13", chapitre: "ch7", type: "qcm_multiple",
    enonce: "Quelles conditions doit remplir un circuit pour relever d'une intervention BT générale ? (plusieurs réponses possibles)",
    options: [
      "Être alimenté en BT ou en TBT",
      "Être protégé contre les courts-circuits",
      "Ne pas dépasser 500 V alternatif ou 750 V continu",
      "Ne pas dépasser 63 A alternatif ou 32 A continu",
      "Être alimenté par un poste HTA dédié"
    ],
    reponses: [0, 1, 2, 3],
    explication: "Les quatre premières conditions définissent le périmètre de l'intervention BT générale. L'alimentation par un poste HTA n'a rien à voir : ce qui compte, c'est la tension et l'intensité du circuit SUR LEQUEL on intervient, pas la façon dont le bâtiment est alimenté en amont."
  },
  {
    id: "ch9-q11", chapitre: "ch9", type: "qcm",
    enonce: "Entre deux recyclages, quelle obligation l'employeur a-t-il vis-à-vis des habilitations de ses salariés ?",
    options: [
      "Aucune, le titre est valable jusqu'à son échéance",
      "Un suivi annuel, pour vérifier que l'habilitation correspond toujours aux opérations confiées",
      "Un nouvel examen médical tous les 6 mois",
      "Repasser le QCM complet chaque année"
    ],
    reponse: 1,
    explication: "L'employeur assure un suivi annuel : il vérifie que l'habilitation reste en adéquation avec les opérations réellement confiées. Si la fonction change, si de nouveaux matériels apparaissent, ou si des manquements sont constatés, une formation complémentaire ou une modification du titre peut être nécessaire avant l'échéance des 3 ans."
  },

  /* ============ CHAPITRE 10 — COMMENT SE PASSE L'ÉVALUATION =========== */
  {
    id: "ch10-q1", chapitre: "ch10", type: "qcm",
    enonce: "Quel pourcentage de bonnes réponses faut-il obtenir au minimum au QCM d'évaluation des savoirs ?",
    options: ["50 %", "60 %", "70 %", "100 %"],
    reponse: 2,
    explication: "Il faut 70 % de bonnes réponses au minimum. En entraînement, visez nettement plus haut : le jour de l'évaluation, le stress et la formulation inhabituelle des questions font toujours perdre quelques points."
  },
  {
    id: "ch10-q2", chapitre: "ch10", type: "qcm",
    enonce: "Combien de questions comporte au minimum le QCM d'évaluation des savoirs ?",
    options: ["10", "15", "20", "30"],
    reponse: 1,
    explication: "15 questions minimum, tirées de façon aléatoire. La base de questions doit contenir, pour chaque thème retenu, au moins cinq fois plus de questions que le nombre posé : impossible donc d'apprendre le questionnaire par cœur."
  },
  {
    id: "ch10-q3", chapitre: "ch10", type: "qcm_multiple",
    enonce: "Sur quels thèmes porte l'évaluation des savoirs ? (plusieurs réponses possibles)",
    options: [
      "Les dangers de l'électricité",
      "Les distances et zones d'environnement",
      "Les limites des opérations liées au symbole d'habilitation visé",
      "Les mesures de protection collective et individuelle",
      "La comptabilité analytique du chantier"
    ],
    reponses: [0, 1, 2, 3],
    explication: "Ce sont les quatre thèmes de l'évaluation. Deux d'entre eux ont un poids minimal imposé : les distances et zones d'environnement, et les limites des opérations liées au symbole visé, comptent chacun pour au moins 30 % des questions."
  },
  {
    id: "ch10-q4", chapitre: "ch10", type: "qcm",
    enonce: "Quel poids minimal représentent, ensemble, les thèmes « distances et zones » et « limites des opérations » dans le QCM ?",
    options: ["30 %", "50 %", "60 %", "100 %"],
    reponse: 2,
    explication: "Chacun de ces deux thèmes compte pour au moins 30 % du total, soit au moins 60 % à eux deux. Conséquence directe pour vos révisions : les chapitres sur les zones et distances, et sur les limites de votre symbole, sont ceux à connaître par cœur."
  },
  {
    id: "ch10-q5", chapitre: "ch10", type: "ordre",
    enonce: "Remettez dans l'ordre les étapes menant à l'habilitation.",
    elements: [
      "L'employeur définit ses besoins et les symboles visés (cahier des charges)",
      "Formation théorique puis formation pratique",
      "Évaluation des savoirs (QCM), qui doit être positive",
      "Évaluation des savoir-faire en situation de travail",
      "Délivrance du titre d'habilitation par l'employeur"
    ],
    explication: "L'ordre est imposé : besoins de l'employeur, formation (théorie ET pratique), QCM, puis pratique évaluée seulement si le QCM est réussi, et enfin délivrance du titre par l'employeur. Rater le QCM, c'est ne pas accéder à l'évaluation pratique."
  },
  {
    id: "ch10-q6", chapitre: "ch10", type: "qcm",
    enonce: "En évaluation pratique, quels sont les critères d'acceptation ?",
    options: [
      "Aucune erreur, quelle qu'elle soit",
      "Deux erreurs mineures au maximum, et aucune erreur majeure",
      "Trois erreurs majeures au maximum",
      "La moitié des gestes réussis suffit"
    ],
    reponse: 1,
    explication: "Deux erreurs mineures au maximum, et AUCUNE erreur majeure. Une erreur mineure est sans conséquence pour la sécurité des personnes ; une erreur majeure a une conséquence directe pour cette sécurité. Une seule erreur majeure fait échouer, même si tout le reste est parfait."
  },
  {
    id: "ch10-q7", chapitre: "ch10", type: "vf",
    enonce: "L'évaluation des savoir-faire peut avoir lieu avant l'évaluation des savoirs si le planning l'exige.",
    reponse: false,
    explication: "FAUX. L'évaluation des savoir-faire est réalisée APRÈS une évaluation positive des savoirs. Il est d'ailleurs recommandé de s'assurer que les stagiaires ont assimilé la théorie avant d'aborder la pratique, surtout quand les deux parties sont assurées par des formateurs différents."
  },
  {
    id: "ch10-q8", chapitre: "ch10", type: "qcm_multiple",
    enonce: "Quels savoir-faire sont évalués pour TOUS les symboles d'habilitation ? (plusieurs réponses possibles)",
    options: [
      "Identifier les risques électriques et savoir évoluer dans un environnement électrique",
      "Avoir un comportement adapté à la situation et aux risques",
      "Rendre compte de l'opération réalisée",
      "Réaliser une consignation complète",
      "Diriger une équipe de deux exécutants"
    ],
    reponses: [0, 1, 2],
    explication: "Ces trois savoir-faire sont exigés de tous les symboles. La consignation est propre au BC, et diriger une équipe est propre au chargé de travaux (B2, B2V). Le plus souvent oublié des trois : RENDRE COMPTE de l'opération réalisée."
  },
  {
    id: "ch10-q9", chapitre: "ch10", type: "trous",
    enonce: "Complétez les règles de l'évaluation.",
    texte: "Le QCM comporte au minimum {{0}} questions et exige {{1}} de bonnes réponses. En pratique, on accepte au maximum {{2}} erreurs mineures et {{3}} erreur majeure.",
    trous: [
      { options: ["10", "15", "20", "25"], reponse: 1 },
      { options: ["50 %", "60 %", "70 %", "80 %"], reponse: 2 },
      { options: ["une", "deux", "trois"], reponse: 1 },
      { options: ["aucune", "une", "deux"], reponse: 0 }
    ],
    explication: "15 questions minimum, 70 % de bonnes réponses, et en pratique : deux erreurs mineures maximum, aucune erreur majeure. Retenez ces quatre chiffres, ils cadrent tout le déroulement de votre évaluation."
  },
  {
    id: "ch10-q10", chapitre: "ch10", type: "situation",
    scenario: "En évaluation pratique, tu réalises un remplacement de disjoncteur. Tu consignes correctement, tu fais la VAT, tu remplaces, tu remets le capot. Tu ranges tes outils et tu repars sans rien dire à personne.",
    enonce: "Comment cet oubli sera-t-il jugé ?",
    options: [
      "Ce n'est pas évalué : seul le geste technique compte",
      "C'est une erreur, car « rendre compte de l'opération réalisée » est un savoir-faire exigé de tous les symboles d'habilitation",
      "C'est acceptable puisque l'installation fonctionne",
      "C'est une erreur seulement pour un chargé de travaux"
    ],
    reponse: 1,
    explication: "Rendre compte de l'opération — au chargé de chantier, de travaux, d'exploitation, de consignation, ou à son employeur — figure parmi les savoir-faire évalués pour TOUS les symboles. Ne pas le faire est donc bien une erreur, et selon l'évaluateur elle peut peser lourd dans le total des deux erreurs mineures tolérées."
  },
  {
    id: "ch10-q11", chapitre: "ch10", type: "vf",
    enonce: "Le contenu et les critères de validation de l'évaluation sont allégés lors d'un recyclage par rapport à une formation initiale.",
    reponse: false,
    explication: "FAUX. Le contenu et les critères de validation sont les MÊMES, que la formation soit initiale ou de recyclage. Un recyclage n'est pas une formalité : c'est la reconduction complète de la démarche d'habilitation."
  }
];

/* ==========================================================================
   3. PETITS RÉGLAGES DE L'APPLICATION
   Modifiables sans toucher à js/app.js
   ========================================================================== */
const CONFIG = {
  /* --- Examen blanc « officiel » : calé sur les règles de l'INRS ED 6127 --- */
  nbQuestionsExamenOfficiel: 20,   // la norme impose 15 questions au minimum
  dureeExamenOfficielMinutes: 30,
  seuilReussitePourcent: 70,       // 70 % de bonnes réponses exigées

  /* --- Examen blanc « long », pour s'entraîner en conditions plus dures --- */
  nbQuestionsExamen: 30,
  dureeExamenMinutes: 45,

  noteMiniReussite: 14,            // note sur 20 équivalente à 70 %

  /* --- Motivation --- */
  objectifQuotidien: 10,           // nombre de questions visées par jour
  taillePaquetCartes: 20,          // nombre de cartes mémo par session
  taillePaquetRevision: 20         // nombre de questions de la révision du jour
};
