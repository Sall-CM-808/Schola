// Types pour les unités structurelles
export interface Unit {
  id: string;
  name: string;
  code: string;
  type:
    | "university"
    | "faculty"
    | "department"
    | "service"
    | "laboratory"
    | "center";
  level: number;
  active: boolean;
  createdAt: string;
  parentId?: string;
  children?: Unit[];
  description?: string;
  head?: string;
  location?: string;
  email?: string;
  phone?: string;
}

// Données mock des unités - Structure hiérarchique
export const unitsTree: Unit[] = [
  {
    id: "unit-1",
    name: "Université Schola",
    code: "SCHOLA",
    type: "university",
    level: 0,
    active: true,
    createdAt: "2020-01-01T00:00:00Z",
    description: "Université principale Schola",
    head: "Dr. Marie Directrice",
    location: "Campus Principal",
    email: "direction@schola.edu",
    phone: "+33 1 23 45 67 89",
    children: [
      {
        id: "unit-2",
        name: "Faculté des Sciences",
        code: "FSC",
        type: "faculty",
        level: 1,
        active: true,
        createdAt: "2020-02-01T00:00:00Z",
        parentId: "unit-1",
        description: "Faculté regroupant les disciplines scientifiques",
        head: "Prof. Jean Sciences",
        location: "Bâtiment A",
        email: "sciences@schola.edu",
        phone: "+33 1 23 45 67 90",
        children: [
          {
            id: "unit-3",
            name: "Département de Mathématiques",
            code: "MATH",
            type: "department",
            level: 2,
            active: true,
            createdAt: "2020-03-01T00:00:00Z",
            parentId: "unit-2",
            description: "Département de mathématiques pures et appliquées",
            head: "Dr. Sophie Matheux",
            location: "Bâtiment A - Aile Est",
            email: "math@schola.edu",
            phone: "+33 1 23 45 67 91",
            children: [
              {
                id: "unit-4",
                name: "Laboratoire d'Algèbre",
                code: "LAB-ALG",
                type: "laboratory",
                level: 3,
                active: true,
                createdAt: "2020-04-01T00:00:00Z",
                parentId: "unit-3",
                description: "Recherche en algèbre moderne",
                head: "Dr. Pierre Algèbre",
                location: "A-301",
                email: "algebre@schola.edu",
                phone: "+33 1 23 45 67 92",
              },
              {
                id: "unit-5",
                name: "Laboratoire d'Analyse",
                code: "LAB-ANA",
                type: "laboratory",
                level: 3,
                active: true,
                createdAt: "2020-04-15T00:00:00Z",
                parentId: "unit-3",
                description: "Recherche en analyse fonctionnelle",
                head: "Dr. Julie Analyse",
                location: "A-302",
                email: "analyse@schola.edu",
                phone: "+33 1 23 45 67 93",
              },
            ],
          },
          {
            id: "unit-6",
            name: "Département de Physique",
            code: "PHYS",
            type: "department",
            level: 2,
            active: true,
            createdAt: "2020-03-15T00:00:00Z",
            parentId: "unit-2",
            description: "Département de physique théorique et expérimentale",
            head: "Prof. Antoine Physique",
            location: "Bâtiment A - Aile Ouest",
            email: "physique@schola.edu",
            phone: "+33 1 23 45 67 94",
            children: [
              {
                id: "unit-7",
                name: "Laboratoire de Physique Quantique",
                code: "LAB-QUANT",
                type: "laboratory",
                level: 3,
                active: true,
                createdAt: "2020-05-01T00:00:00Z",
                parentId: "unit-6",
                description: "Recherche en mécanique quantique",
                head: "Dr. Léa Quantique",
                location: "A-401",
                email: "quantique@schola.edu",
                phone: "+33 1 23 45 67 95",
              },
            ],
          },
          {
            id: "unit-8",
            name: "Département d'Informatique",
            code: "INFO",
            type: "department",
            level: 2,
            active: true,
            createdAt: "2020-03-20T00:00:00Z",
            parentId: "unit-2",
            description: "Département d'informatique et sciences du numérique",
            head: "Dr. Nicolas Code",
            location: "Bâtiment B",
            email: "info@schola.edu",
            phone: "+33 1 23 45 67 96",
            children: [
              {
                id: "unit-9",
                name: "Laboratoire d'IA",
                code: "LAB-IA",
                type: "laboratory",
                level: 3,
                active: true,
                createdAt: "2020-06-01T00:00:00Z",
                parentId: "unit-8",
                description: "Intelligence artificielle et machine learning",
                head: "Dr. Emma Intelligence",
                location: "B-201",
                email: "ia@schola.edu",
                phone: "+33 1 23 45 67 97",
              },
              {
                id: "unit-10",
                name: "Centre de Calcul",
                code: "CALC",
                type: "center",
                level: 3,
                active: true,
                createdAt: "2020-06-15T00:00:00Z",
                parentId: "unit-8",
                description: "Centre de calcul haute performance",
                head: "Dr. Thomas Calcul",
                location: "B-001",
                email: "calcul@schola.edu",
                phone: "+33 1 23 45 67 98",
              },
            ],
          },
        ],
      },
      {
        id: "unit-11",
        name: "Faculté des Lettres",
        code: "FLT",
        type: "faculty",
        level: 1,
        active: true,
        createdAt: "2020-02-15T00:00:00Z",
        parentId: "unit-1",
        description: "Faculté des lettres et sciences humaines",
        head: "Prof. Camille Lettres",
        location: "Bâtiment C",
        email: "lettres@schola.edu",
        phone: "+33 1 23 45 68 00",
        children: [
          {
            id: "unit-12",
            name: "Département de Littérature",
            code: "LITT",
            type: "department",
            level: 2,
            active: true,
            createdAt: "2020-04-01T00:00:00Z",
            parentId: "unit-11",
            description: "Littérature française et comparée",
            head: "Dr. Julien Littéraire",
            location: "Bâtiment C - 2e étage",
            email: "litterature@schola.edu",
            phone: "+33 1 23 45 68 01",
          },
          {
            id: "unit-13",
            name: "Département d'Histoire",
            code: "HIST",
            type: "department",
            level: 2,
            active: true,
            createdAt: "2020-04-10T00:00:00Z",
            parentId: "unit-11",
            description: "Histoire moderne et contemporaine",
            head: "Prof. Laura Histoire",
            location: "Bâtiment C - 3e étage",
            email: "histoire@schola.edu",
            phone: "+33 1 23 45 68 02",
          },
        ],
      },
      {
        id: "unit-14",
        name: "Services Administratifs",
        code: "ADMIN",
        type: "service",
        level: 1,
        active: true,
        createdAt: "2020-01-15T00:00:00Z",
        parentId: "unit-1",
        description: "Services administratifs et support",
        head: "Mme. Sarah Admin",
        location: "Bâtiment Administration",
        email: "admin@schola.edu",
        phone: "+33 1 23 45 68 10",
        children: [
          {
            id: "unit-15",
            name: "Service Informatique",
            code: "IT",
            type: "service",
            level: 2,
            active: true,
            createdAt: "2020-05-01T00:00:00Z",
            parentId: "unit-14",
            description: "Support informatique et infrastructure",
            head: "M. Maxime IT",
            location: "Admin - Sous-sol",
            email: "it@schola.edu",
            phone: "+33 1 23 45 68 11",
          },
          {
            id: "unit-16",
            name: "Service Scolarité",
            code: "SCOL",
            type: "service",
            level: 2,
            active: true,
            createdAt: "2020-05-10T00:00:00Z",
            parentId: "unit-14",
            description: "Gestion de la scolarité et des inscriptions",
            head: "Mme. Océane Scolarité",
            location: "Admin - 1er étage",
            email: "scolarite@schola.edu",
            phone: "+33 1 23 45 68 12",
          },
          {
            id: "unit-17",
            name: "Service Finances",
            code: "FIN",
            type: "service",
            level: 2,
            active: false,
            createdAt: "2020-05-15T00:00:00Z",
            parentId: "unit-14",
            description: "Gestion financière (en restructuration)",
            head: "M. Quentin Finances",
            location: "Admin - 2e étage",
            email: "finances@schola.edu",
            phone: "+33 1 23 45 68 13",
          },
        ],
      },
    ],
  },
];

// Version plate pour la table (optionnel)
const flattenUnits = (units: Unit[], parentPath = ""): Unit[] => {
  const result: Unit[] = [];

  units.forEach((unit) => {
    const unitCopy = { ...unit };
    delete unitCopy.children; // Supprimer les enfants pour la version plate
    result.push(unitCopy);

    if (unit.children && unit.children.length > 0) {
      result.push(
        ...flattenUnits(unit.children, `${parentPath}${unit.name} > `)
      );
    }
  });

  return result;
};

export const unitsFlat: Unit[] = flattenUnits(unitsTree);

// Types d'unités avec leurs labels
export const unitTypes = {
  university: {
    label: "Université",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  faculty: {
    label: "Faculté",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  department: {
    label: "Département",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  service: {
    label: "Service",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  laboratory: {
    label: "Laboratoire",
    color: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  center: {
    label: "Centre",
    color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
};

// Statistiques des unités
export const unitsStats = {
  total: unitsFlat.length,
  active: unitsFlat.filter((u) => u.active).length,
  inactive: unitsFlat.filter((u) => !u.active).length,
  byType: {
    university: unitsFlat.filter((u) => u.type === "university").length,
    faculty: unitsFlat.filter((u) => u.type === "faculty").length,
    department: unitsFlat.filter((u) => u.type === "department").length,
    service: unitsFlat.filter((u) => u.type === "service").length,
    laboratory: unitsFlat.filter((u) => u.type === "laboratory").length,
    center: unitsFlat.filter((u) => u.type === "center").length,
  },
  byLevel: {
    0: unitsFlat.filter((u) => u.level === 0).length,
    1: unitsFlat.filter((u) => u.level === 1).length,
    2: unitsFlat.filter((u) => u.level === 2).length,
    3: unitsFlat.filter((u) => u.level === 3).length,
  },
};

// Fonction pour simuler un délai de chargement
export const simulateLoading = (delay: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
