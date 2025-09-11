import { Unit } from "@/types/unit";

/**
 * Données d'exemple pour une structure de fichiers VSCode typique
 */
export const vscodeFileStructure: Unit[] = [
  {
    id: "1",
    name: "sall",
    type: "folder",
    path: ["1"],
    children: [
      {
        id: "1-1",
        name: "react",
        type: "folder",
        path: ["1", "1-1"],
        children: [
          {
            id: "1-1-1",
            name: "package.json",
            type: "file",
            path: ["1", "1-1", "1-1-1"],
          }
        ]
      },
      {
        id: "1-2",
        name: "typescript",
        type: "folder",
        path: ["1", "1-2"],
        children: [
          {
            id: "1-2-1",
            name: "lib",
            type: "folder",
            path: ["1", "1-2", "1-2-1"],
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "public",
    type: "folder",
    path: ["2"],
    children: [
      {
        id: "2-1",
        name: "favicon.ico",
        type: "file",
        path: ["2", "2-1"],
      },
      {
        id: "2-2",
        name: "index.html",
        type: "file",
        path: ["2", "2-2"],
      }
    ]
  },
  {
    id: "3",
    name: "src",
    type: "folder",
    path: ["3"],
    children: [
      {
        id: "3-1",
        name: "components",
        type: "folder",
        path: ["3", "3-1"],
        children: [
          {
            id: "3-1-1",
            name: "Button.tsx",
            type: "file",
            path: ["3", "3-1", "3-1-1"],
          },
          {
            id: "3-1-2",
            name: "Card.tsx",
            type: "file",
            path: ["3", "3-1", "3-1-2"],
          },
          {
            id: "3-1-3",
            name: "Navbar.tsx",
            type: "file",
            path: ["3", "3-1", "3-1-3"],
          }
        ]
      },
      {
        id: "3-2",
        name: "pages",
        type: "folder",
        path: ["3", "3-2"],
        children: [
          {
            id: "3-2-1",
            name: "Home.tsx",
            type: "file",
            path: ["3", "3-2", "3-2-1"],
          },
          {
            id: "3-2-2",
            name: "About.tsx",
            type: "file",
            path: ["3", "3-2", "3-2-2"],
          }
        ]
      },
      {
        id: "3-3",
        name: "App.tsx",
        type: "file",
        path: ["3", "3-3"],
      },
      {
        id: "3-4",
        name: "index.tsx",
        type: "file",
        path: ["3", "3-4"],
      },
      {
        id: "3-5",
        name: "styles.css",
        type: "file",
        path: ["3", "3-5"],
      }
    ]
  },
  {
    id: "4",
    name: ".gitignore",
    type: "file",
    path: ["4"],
  },
  {
    id: "5",
    name: "package.json",
    type: "file",
    path: ["5"],
  },
  {
    id: "6",
    name: "README.md",
    type: "file",
    path: ["6"],
  },
  {
    id: "7",
    name: "tsconfig.json",
    type: "file",
    path: ["7"],
  }
];
