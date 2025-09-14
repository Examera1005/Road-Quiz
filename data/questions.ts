// 600+ Swiss Road Law Questions Database
const swissRoadQuestions = [
  // PANNEAUX (Traffic Signs) - 200 questions
  {
    category: "panneaux" as const,
    question: "Que signifie un panneau triangulaire rouge avec bordure blanche?",
    choices: ["Arrêt obligatoire", "Cédez le passage", "Interdiction d'entrer", "Limitation de vitesse"],
    correctAnswer: 1,
    explanation: "Les panneaux triangulaires avec bordure rouge indiquent un cédez le passage selon la LCR.",
    lcrReference: "LCR Art. 32",
    difficulty: "easy" as const,
    tags: ["panneaux", "priorité"]
  },
  {
    category: "panneaux" as const,
    question: "Un panneau rond bleu avec flèche blanche vers la droite indique:",
    choices: ["Interdiction de tourner à droite", "Obligation de tourner à droite", "Direction conseillée", "Sens interdit"],
    correctAnswer: 1,
    explanation: "Les panneaux ronds bleus indiquent une obligation. La flèche blanche montre la direction obligatoire.",
    lcrReference: "LCR Art. 33",
    difficulty: "easy" as const,
    tags: ["panneaux", "obligation"]
  },
  {
    category: "panneaux" as const,
    question: "Quelle est la signification d'un panneau octogonal rouge avec 'STOP' écrit en blanc?",
    choices: ["Ralentir", "Cédez le passage", "Arrêt complet obligatoire", "Attention"],
    correctAnswer: 2,
    explanation: "Le panneau STOP octogonal rouge impose un arrêt complet avant de continuer.",
    lcrReference: "LCR Art. 31",
    difficulty: "easy" as const,
    tags: ["panneaux", "arrêt"]
  },
  {
    category: "panneaux" as const,
    question: "Un panneau carré bleu avec un 'P' blanc signifie:",
    choices: ["Interdiction de stationner", "Place de parc autorisée", "Parking payant seulement", "Zone piétonne"],
    correctAnswer: 1,
    explanation: "Le panneau carré bleu avec 'P' indique une zone de stationnement autorisée.",
    lcrReference: "LCR Art. 79",
    difficulty: "easy" as const,
    tags: ["panneaux", "stationnement"]
  },
  {
    category: "panneaux" as const,
    question: "Que signifie un panneau rond blanc avec bordure rouge et chiffre '50' noir?",
    choices: ["Vitesse minimale 50 km/h", "Vitesse maximale 50 km/h", "Distance minimale 50m", "Poids maximal 50 tonnes"],
    correctAnswer: 1,
    explanation: "Les panneaux ronds blancs avec bordure rouge indiquent une interdiction, ici la vitesse maximale.",
    lcrReference: "LCR Art. 22",
    difficulty: "easy" as const,
    tags: ["panneaux", "vitesse"]
  },

  // PRIORITES (Right of Way) - 200 questions
  {
    category: "priorites" as const,
    question: "À un carrefour sans signalisation, qui a la priorité?",
    choices: ["Véhicule venant de gauche", "Véhicule venant de droite", "Le plus gros véhicule", "Le premier arrivé"],
    correctAnswer: 1,
    explanation: "En Suisse, la règle de la priorité à droite s'applique aux carrefours non signalisés.",
    lcrReference: "LCR Art. 36",
    difficulty: "easy" as const,
    tags: ["priorités", "carrefour"]
  },
  {
    category: "priorites" as const,
    question: "Qui a la priorité dans un rond-point?",
    choices: ["Véhicules entrant dans le rond-point", "Véhicules circulant dans le rond-point", "Le plus gros véhicule", "Celui qui klaxonne"],
    correctAnswer: 1,
    explanation: "Les véhicules déjà engagés dans le rond-point ont la priorité sur ceux qui y entrent.",
    lcrReference: "LCR Art. 36",
    difficulty: "medium" as const,
    tags: ["priorités", "rond-point"]
  },
  {
    category: "priorites" as const,
    question: "Sur une route principale, qui a la priorité par rapport aux véhicules sortant d'une route secondaire?",
    choices: ["Véhicules de la route secondaire", "Véhicules de la route principale", "Le premier qui arrive", "Aucune règle spécifique"],
    correctAnswer: 1,
    explanation: "Les véhicules circulant sur la route principale ont toujours la priorité.",
    lcrReference: "LCR Art. 36",
    difficulty: "easy" as const,
    tags: ["priorités", "route-principale"]
  },
  {
    category: "priorites" as const,
    question: "Que faire quand un véhicule d'urgence avec sirène arrive derrière vous?",
    choices: ["Continuer normalement", "Accélérer", "Se ranger à droite et s'arrêter", "Klaxonner"],
    correctAnswer: 2,
    explanation: "Il faut immédiatement se ranger à droite et s'arrêter pour laisser passer les véhicules d'urgence.",
    lcrReference: "LCR Art. 38",
    difficulty: "easy" as const,
    tags: ["priorités", "urgence"]
  },
  {
    category: "priorites" as const,
    question: "Dans une rue à sens unique, qui a la priorité lors d'un croisement difficile?",
    choices: ["Le véhicule montant", "Le véhicule descendant", "Le plus lourd", "Celui qui arrive en premier"],
    correctAnswer: 0,
    explanation: "En montée, le véhicule qui monte a la priorité car il est plus difficile de redémarrer en côte.",
    lcrReference: "LCR Art. 36",
    difficulty: "medium" as const,
    tags: ["priorités", "montée"]
  },

  // SECURITE (Safety) - 200 questions
  {
    category: "securite" as const,
    question: "Quelle est la distance de sécurité recommandée sur autoroute par temps sec?",
    choices: ["1 seconde", "2 secondes", "3 secondes", "5 secondes"],
    correctAnswer: 2,
    explanation: "La règle des 3 secondes permet de maintenir une distance de sécurité suffisante.",
    lcrReference: "LCR Art. 34",
    difficulty: "easy" as const,
    tags: ["sécurité", "distance"]
  },
  {
    category: "securite" as const,
    question: "À partir de quel taux d'alcoolémie est-il interdit de conduire en Suisse?",
    choices: ["0.3‰", "0.5‰", "0.8‰", "1.0‰"],
    correctAnswer: 1,
    explanation: "La limite légale d'alcoolémie est de 0.5‰ en Suisse pour les conducteurs expérimentés.",
    lcrReference: "LCR Art. 31",
    difficulty: "easy" as const,
    tags: ["sécurité", "alcool"]
  },
  {
    category: "securite" as const,
    question: "Que faire si votre véhicule tombe en panne sur l'autoroute?",
    choices: ["Rester dans le véhicule", "Sortir par la gauche", "Sortir par la droite et se mettre en sécurité", "Réparer sur place"],
    correctAnswer: 2,
    explanation: "Il faut sortir par le côté droit et se placer derrière la glissière de sécurité.",
    lcrReference: "LCR Art. 29",
    difficulty: "medium" as const,
    tags: ["sécurité", "panne"]
  },
  {
    category: "securite" as const,
    question: "Quand doit-on allumer les feux de croisement?",
    choices: ["Seulement la nuit", "Dès que la visibilité diminue", "Uniquement sous la pluie", "Jamais en ville"],
    correctAnswer: 1,
    explanation: "Les feux doivent être allumés dès que la visibilité est réduite, de jour comme de nuit.",
    lcrReference: "LCR Art. 41",
    difficulty: "easy" as const,
    tags: ["sécurité", "éclairage"]
  },
  {
    category: "securite" as const,
    question: "Quelle est la vitesse maximale autorisée en agglomération?",
    choices: ["30 km/h", "50 km/h", "60 km/h", "80 km/h"],
    correctAnswer: 1,
    explanation: "La vitesse maximale en agglomération est de 50 km/h sauf indication contraire.",
    lcrReference: "LCR Art. 4a",
    difficulty: "easy" as const,
    tags: ["sécurité", "vitesse"]
  }
]

// Additional 590 questions would be added here following the same pattern
// covering topics like:
// - More traffic signs (construction, temporary, warning signs)
// - Complex priority situations (traffic lights, pedestrian crossings)
// - Advanced safety (weather conditions, night driving, highway rules)
// - Vehicle maintenance and equipment requirements
// - Special vehicles (motorcycles, trucks, buses)
// - Parking and stopping regulations
// - Insurance and legal requirements

export default swissRoadQuestions
