import { Unit } from "@/types/unit";

// Données d'exemple pour la structure éducative
export const educationStructure: Unit[] = [
  {
    id: "univ-1",
    name: "Université Cheikh Anta Diop",
    type: "université",
    path: ["univ-1"],
    children: [
      {
        id: "univ-1-fac-1",
        name: "Faculté des Sciences",
        type: "faculté",
        path: ["univ-1", "univ-1-fac-1"],
        badge: 3240,
        children: [
          {
            id: "univ-1-fac-1-dep-1",
            name: "Département de Mathématiques",
            type: "département",
            path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-1"],
            badge: 1205,
            children: [
              {
                id: "univ-1-fac-1-dep-1-lic-1",
                name: "Licence 1 Mathématiques",
                type: "licence",
                path: [
                  "univ-1",
                  "univ-1-fac-1",
                  "univ-1-fac-1-dep-1",
                  "univ-1-fac-1-dep-1-lic-1",
                ],
                badge: 180,
                children: [],
              },
              {
                id: "univ-1-fac-1-dep-1-lic-2",
                name: "Licence 2 Mathématiques",
                type: "licence",
                path: [
                  "univ-1",
                  "univ-1-fac-1",
                  "univ-1-fac-1-dep-1",
                  "univ-1-fac-1-dep-1-lic-2",
                ],
                badge: 165,
                children: [],
              },
            ],
          },
          {
            id: "univ-1-fac-1-dep-2",
            name: "Département de Physique",
            type: "département",
            path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-2"],
            badge: 980,
            children: [],
          },
        ],
      },
      {
        id: "univ-1-fac-2",
        name: "Faculté des Lettres",
        type: "faculté",
        path: ["univ-1", "univ-1-fac-2"],
        badge: 2150,
        children: [],
      },
    ],
  },
  {
    id: "ecole-1",
    name: "École Primaire Senghor",
    type: "école",
    path: ["ecole-1"],
    badge: 420,
    children: [
      {
        id: "ecole-1-cycle-1",
        name: "Cycle Primaire",
        type: "cycle",
        path: ["ecole-1", "ecole-1-cycle-1"],
        badge: 245,
        children: [
          {
            id: "ecole-1-cycle-1-niv-1",
            name: "Niveau 1 (CP-CE1)",
            type: "niveau",
            path: ["ecole-1", "ecole-1-cycle-1", "ecole-1-cycle-1-niv-1"],
            badge: 58,
            children: [
              {
                id: "ecole-1-cycle-1-niv-1-classe-1",
                name: "Classe CP A",
                type: "classe",
                path: [
                  "ecole-1",
                  "ecole-1-cycle-1",
                  "ecole-1-cycle-1-niv-1",
                  "ecole-1-cycle-1-niv-1-classe-1",
                ],
                badge: 28,
                children: [],
              },
              {
                id: "ecole-1-cycle-1-niv-1-classe-2",
                name: "Classe CP B",
                type: "classe",
                path: [
                  "ecole-1",
                  "ecole-1-cycle-1",
                  "ecole-1-cycle-1-niv-1",
                  "ecole-1-cycle-1-niv-1-classe-2",
                ],
                badge: 30,
                children: [],
              },
            ],
          },
          {
            id: "ecole-1-cycle-1-niv-2",
            name: "Niveau 2 (CE2-CM1-CM2)",
            type: "niveau",
            path: ["ecole-1", "ecole-1-cycle-1", "ecole-1-cycle-1-niv-2"],
            badge: 187,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "lycee-1",
    name: "Lycée d'Excellence",
    type: "lycée",
    path: ["lycee-1"],
    badge: 850,
    children: [
      {
        id: "lycee-1-cycle-1",
        name: "Cycle Secondaire",
        type: "cycle",
        path: ["lycee-1", "lycee-1-cycle-1"],
        badge: 850,
        children: [
          {
            id: "lycee-1-cycle-1-niv-1",
            name: "Seconde",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-1", "lycee-1-cycle-1-niv-1"],
            badge: 280,
            children: [
              {
                id: "lycee-1-cycle-1-niv-1-classe-1",
                name: "Classe Seconde A",
                type: "classe",
                path: [
                  "lycee-1",
                  "lycee-1-cycle-1",
                  "lycee-1-cycle-1-niv-1",
                  "lycee-1-cycle-1-niv-1-classe-1",
                ],
                badge: 35,
                children: [],
              },
              {
                id: "lycee-1-cycle-1-niv-1-classe-2",
                name: "Classe Seconde B",
                type: "classe",
                path: [
                  "lycee-1",
                  "lycee-1-cycle-1",
                  "lycee-1-cycle-1-niv-1",
                  "lycee-1-cycle-1-niv-1-classe-2",
                ],
                badge: 32,
                children: [],
              },
            ],
          },
          {
            id: "lycee-1-cycle-1-niv-2",
            name: "Première",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-1", "lycee-1-cycle-1-niv-2"],
            badge: 285,
            children: [],
          },
          {
            id: "lycee-1-cycle-1-niv-3",
            name: "Terminale",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-1", "lycee-1-cycle-1-niv-3"],
            badge: 285,
            children: [],
          },
        ],
      },
    ],
  },
  // Nouvelle école: Institution Sainte-Marie avec 3 cycles directs
  {
    id: "institution-sainte-marie",
    name: "Institution Sainte-Marie",
    type: "école",
    path: ["institution-sainte-marie"],
    badge: 0,
    children: [
      {
        id: "institution-sainte-marie-cycle-primaire",
        name: "Cycle Primaire",
        type: "cycle",
        path: [
          "institution-sainte-marie",
          "institution-sainte-marie-cycle-primaire",
        ],
        badge: 0,
        children: [],
      },
      {
        id: "institution-sainte-marie-cycle-college",
        name: "Cycle Collège",
        type: "cycle",
        path: [
          "institution-sainte-marie",
          "institution-sainte-marie-cycle-college",
        ],
        badge: 0,
        children: [],
      },
      {
        id: "institution-sainte-marie-cycle-lycee",
        name: "Cycle Lycée",
        type: "cycle",
        path: [
          "institution-sainte-marie",
          "institution-sainte-marie-cycle-lycee",
        ],
        badge: 0,
        children: [],
      },
    ],
  },
];

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
