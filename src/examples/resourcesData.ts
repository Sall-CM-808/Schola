export interface Resource {
  id: string;
  name: string;
  type: "document" | "video" | "audio" | "image" | "link" | "folder";
  url?: string;
  size?: number;
  unitId: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
  tags?: string[];
  downloadCount?: number;
}

/**
 * Données d'exemple pour les ressources par unité
 */
export const resourcesData: Record<string, Resource[]> = {
  // Classe CP-A
  "ecole-1-cycle-1-niv-1-classe-1": [
    {
      id: "res-1",
      name: "Manuel de Lecture CP",
      type: "document",
      url: "/resources/manuel-lecture-cp.pdf",
      size: 2048000,
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      uploadedBy: "M. Ibrahima Sarr",
      uploadedAt: "2023-09-01",
      description: "Manuel officiel pour l'apprentissage de la lecture",
      tags: ["lecture", "manuel", "cp"],
      downloadCount: 28
    },
    {
      id: "res-2",
      name: "Exercices de Mathématiques",
      type: "document",
      url: "/resources/exercices-math-cp.pdf",
      size: 1024000,
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      uploadedBy: "M. Ibrahima Sarr",
      uploadedAt: "2023-09-15",
      description: "Cahier d'exercices de mathématiques pour CP",
      tags: ["mathématiques", "exercices", "cp"],
      downloadCount: 25
    },
    {
      id: "res-3",
      name: "Chanson de l'Alphabet",
      type: "audio",
      url: "/resources/chanson-alphabet.mp3",
      size: 5120000,
      unitId: "ecole-1-cycle-1-niv-1-classe-1",
      uploadedBy: "M. Ibrahima Sarr",
      uploadedAt: "2023-10-01",
      description: "Chanson pour apprendre l'alphabet",
      tags: ["alphabet", "chanson", "audio"],
      downloadCount: 15
    }
  ],

  // Licence Génie Logiciel
  "univ-1-fac-1-dep-1-lic-1": [
    {
      id: "res-4",
      name: "Cours Java - Introduction",
      type: "document",
      url: "/resources/cours-java-intro.pdf",
      size: 3072000,
      unitId: "univ-1-fac-1-dep-1-lic-1",
      uploadedBy: "Prof. Ousmane Ndiaye",
      uploadedAt: "2023-09-10",
      description: "Support de cours - Introduction à Java",
      tags: ["java", "programmation", "cours"],
      downloadCount: 45
    },
    {
      id: "res-5",
      name: "TP Java - Exercices",
      type: "document",
      url: "/resources/tp-java-exercices.zip",
      size: 1536000,
      unitId: "univ-1-fac-1-dep-1-lic-1",
      uploadedBy: "Prof. Ousmane Ndiaye",
      uploadedAt: "2023-09-15",
      description: "Travaux pratiques et exercices Java",
      tags: ["java", "tp", "exercices"],
      downloadCount: 38
    },
    {
      id: "res-6",
      name: "Vidéo - Concepts OOP",
      type: "video",
      url: "/resources/video-oop-concepts.mp4",
      size: 15360000,
      unitId: "univ-1-fac-1-dep-1-lic-1",
      uploadedBy: "Prof. Ousmane Ndiaye",
      uploadedAt: "2023-10-01",
      description: "Vidéo explicative sur les concepts de la POO",
      tags: ["oop", "vidéo", "concepts"],
      downloadCount: 32
    },
    {
      id: "res-7",
      name: "Documentation Oracle Java",
      type: "link",
      url: "https://docs.oracle.com/javase/",
      unitId: "univ-1-fac-1-dep-1-lic-1",
      uploadedBy: "Dr. Fatou Seck",
      uploadedAt: "2023-09-20",
      description: "Documentation officielle Java Oracle",
      tags: ["java", "documentation", "oracle"],
      downloadCount: 28
    }
  ]
};
