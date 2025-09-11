import { Unit } from "@/types/unit";

/**
 * Données d'exemple pour une structure hiérarchique éducative
 * Comprend deux types d'organisations:
 * 1. Structure universitaire: Université > Faculté > Département > Licence
 * 2. Structure scolaire: École > Cycle > Niveau > Classe
 */
export const educationStructure: Unit[] = [
  // STRUCTURE UNIVERSITAIRE
  {
    id: "univ-1",
    name: "Université Cheikh Anta Diop",
    type: "université",
    path: ["univ-1"],
    children: [
      {
        id: "univ-1-fac-1",
        name: "Faculté des Sciences et Technologies",
        type: "faculté",
        path: ["univ-1", "univ-1-fac-1"],
        children: [
          {
            id: "univ-1-fac-1-dep-1",
            name: "Département Informatique",
            type: "département",
            path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-1"],
            children: [
              {
                id: "univ-1-fac-1-dep-1-lic-1",
                name: "Licence Génie Logiciel",
                type: "licence",
                path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-1", "univ-1-fac-1-dep-1-lic-1"],
                children: [
                  {
                    id: "univ-1-fac-1-dep-1-lic-1-sem-1",
                    name: "Semestre 1",
                    type: "semestre",
                    path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-1", "univ-1-fac-1-dep-1-lic-1", "univ-1-fac-1-dep-1-lic-1-sem-1"],
                  },
                  {
                    id: "univ-1-fac-1-dep-1-lic-1-sem-2",
                    name: "Semestre 2",
                    type: "semestre",
                    path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-1", "univ-1-fac-1-dep-1-lic-1", "univ-1-fac-1-dep-1-lic-1-sem-2"],
                  }
                ]
              },
              {
                id: "univ-1-fac-1-dep-1-lic-2",
                name: "Licence Intelligence Artificielle",
                type: "licence",
                path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-1", "univ-1-fac-1-dep-1-lic-2"],
              }
            ]
          },
          {
            id: "univ-1-fac-1-dep-2",
            name: "Département Mathématiques",
            type: "département",
            path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-2"],
            children: [
              {
                id: "univ-1-fac-1-dep-2-lic-1",
                name: "Licence Mathématiques Appliquées",
                type: "licence",
                path: ["univ-1", "univ-1-fac-1", "univ-1-fac-1-dep-2", "univ-1-fac-1-dep-2-lic-1"],
              }
            ]
          }
        ]
      },
      {
        id: "univ-1-fac-2",
        name: "Faculté de Médecine",
        type: "faculté",
        path: ["univ-1", "univ-1-fac-2"],
        children: [
          {
            id: "univ-1-fac-2-dep-1",
            name: "Département Médecine Générale",
            type: "département",
            path: ["univ-1", "univ-1-fac-2", "univ-1-fac-2-dep-1"],
          }
        ]
      }
    ]
  },
  
  // STRUCTURE SCOLAIRE
  {
    id: "ecole-1",
    name: "École Primaire Senghor",
    type: "école",
    path: ["ecole-1"],
    children: [
      {
        id: "ecole-1-cycle-1",
        name: "Cycle Primaire",
        type: "cycle",
        path: ["ecole-1", "ecole-1-cycle-1"],
        children: [
          {
            id: "ecole-1-cycle-1-niv-1",
            name: "CP - Cours Préparatoire",
            type: "niveau",
            path: ["ecole-1", "ecole-1-cycle-1", "ecole-1-cycle-1-niv-1"],
            children: [
              {
                id: "ecole-1-cycle-1-niv-1-classe-1",
                name: "CP-A",
                type: "classe",
                path: ["ecole-1", "ecole-1-cycle-1", "ecole-1-cycle-1-niv-1", "ecole-1-cycle-1-niv-1-classe-1"],
                badge: 28,
              },
              {
                id: "ecole-1-cycle-1-niv-1-classe-2",
                name: "CP-B",
                type: "classe",
                path: ["ecole-1", "ecole-1-cycle-1", "ecole-1-cycle-1-niv-1", "ecole-1-cycle-1-niv-1-classe-2"],
                badge: 30,
              }
            ]
          },
          {
            id: "ecole-1-cycle-1-niv-2",
            name: "CE1 - Cours Élémentaire 1",
            type: "niveau",
            path: ["ecole-1", "ecole-1-cycle-1", "ecole-1-cycle-1-niv-2"],
            children: [
              {
                id: "ecole-1-cycle-1-niv-2-classe-1",
                name: "CE1-A",
                type: "classe",
                path: ["ecole-1", "ecole-1-cycle-1", "ecole-1-cycle-1-niv-2", "ecole-1-cycle-1-niv-2-classe-1"],
                badge: 25,
              }
            ]
          }
        ]
      },
      {
        id: "ecole-1-cycle-2",
        name: "Cycle Moyen",
        type: "cycle",
        path: ["ecole-1", "ecole-1-cycle-2"],
        children: [
          {
            id: "ecole-1-cycle-2-niv-1",
            name: "CM1 - Cours Moyen 1",
            type: "niveau",
            path: ["ecole-1", "ecole-1-cycle-2", "ecole-1-cycle-2-niv-1"],
          },
          {
            id: "ecole-1-cycle-2-niv-2",
            name: "CM2 - Cours Moyen 2",
            type: "niveau",
            path: ["ecole-1", "ecole-1-cycle-2", "ecole-1-cycle-2-niv-2"],
          }
        ]
      }
    ]
  },
  
  // STRUCTURE LYCÉE
  {
    id: "lycee-1",
    name: "Lycée d'Excellence",
    type: "école",
    path: ["lycee-1"],
    children: [
      {
        id: "lycee-1-cycle-1",
        name: "Premier Cycle",
        type: "cycle",
        path: ["lycee-1", "lycee-1-cycle-1"],
        children: [
          {
            id: "lycee-1-cycle-1-niv-1",
            name: "6ème",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-1", "lycee-1-cycle-1-niv-1"],
          },
          {
            id: "lycee-1-cycle-1-niv-2",
            name: "5ème",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-1", "lycee-1-cycle-1-niv-2"],
          }
        ]
      },
      {
        id: "lycee-1-cycle-2",
        name: "Second Cycle",
        type: "cycle",
        path: ["lycee-1", "lycee-1-cycle-2"],
        children: [
          {
            id: "lycee-1-cycle-2-niv-1",
            name: "Seconde",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-2", "lycee-1-cycle-2-niv-1"],
            children: [
              {
                id: "lycee-1-cycle-2-niv-1-classe-1",
                name: "Seconde S1",
                type: "classe",
                path: ["lycee-1", "lycee-1-cycle-2", "lycee-1-cycle-2-niv-1", "lycee-1-cycle-2-niv-1-classe-1"],
                badge: 35,
              },
              {
                id: "lycee-1-cycle-2-niv-1-classe-2",
                name: "Seconde L1",
                type: "classe",
                path: ["lycee-1", "lycee-1-cycle-2", "lycee-1-cycle-2-niv-1", "lycee-1-cycle-2-niv-1-classe-2"],
                badge: 32,
              }
            ]
          },
          {
            id: "lycee-1-cycle-2-niv-2",
            name: "Première",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-2", "lycee-1-cycle-2-niv-2"],
          },
          {
            id: "lycee-1-cycle-2-niv-3",
            name: "Terminale",
            type: "niveau",
            path: ["lycee-1", "lycee-1-cycle-2", "lycee-1-cycle-2-niv-3"],
          }
        ]
      }
    ]
  }
];
