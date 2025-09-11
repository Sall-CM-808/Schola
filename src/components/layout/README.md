# SideBar - Composant de Navigation Hiérarchique

Ce composant permet d'afficher une arborescence hiérarchique d'unités éducatives (écoles, départements, classes, etc.) avec une navigation récursive à l'infini.

## Fonctionnalités

- Affichage hiérarchique des unités avec une arborescence infinie
- Expansion/réduction des nœuds
- Ajout de nouvelles unités à n'importe quel niveau
- Sélection d'unités avec mise à jour du contexte global
- Mode réduit/étendu pour optimiser l'espace
- Responsive avec support mobile
- Intégration avec UnitContext pour la persistance de la sélection

## Utilisation

### 1. Importation

```tsx
import SideBar from "@/components/layout/sideBar";
import { Unit } from "@/types/unit";
import { UnitProvider } from "@/contexts/UnitContext";
```

### 2. Préparation des données

Créez un tableau d'unités avec la structure hiérarchique souhaitée :

```tsx
const units: Unit[] = [
  {
    id: "1",
    name: "École Supérieure",
    type: "École",
    path: ["1"],
    children: [
      {
        id: "1-1",
        name: "Département Informatique",
        type: "Département",
        path: ["1", "1-1"],
        children: [
          {
            id: "1-1-1",
            name: "Classe L1",
            type: "Classe",
            path: ["1", "1-1", "1-1-1"],
          }
        ]
      }
    ]
  }
];
```

### 3. Intégration dans votre composant

```tsx
export default function YourComponent() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [collapsed, setCollapsed] = useState(false);
  
  const handleUnitSelect = (unit: Unit) => {
    // Logique de traitement lors de la sélection d'une unité
    console.log("Unité sélectionnée:", unit);
  };
  
  const handleUnitAdd = (parentId: string | null) => {
    // Logique d'ajout d'une nouvelle unité
    // Voir AdminSidebarExample.tsx pour un exemple complet
  };

  return (
    <UnitProvider>
      <div className="flex min-h-screen">
        <SideBar
          units={units}
          onUnitSelect={handleUnitSelect}
          onUnitAdd={handleUnitAdd}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
        
        <main className={`flex-1 p-8 ${collapsed ? 'ml-20' : 'ml-64'}`}>
          {/* Votre contenu principal ici */}
        </main>
      </div>
    </UnitProvider>
  );
}
```

### 4. Props disponibles

| Prop | Type | Description |
|------|------|-------------|
| units | Unit[] | Tableau d'unités à afficher dans la sidebar |
| onUnitSelect | (unit: Unit) => void | Callback appelé lors de la sélection d'une unité |
| onUnitAdd | (parentId: string \| null) => void | Callback appelé lors de l'ajout d'une unité |
| className | string | Classes CSS additionnelles pour la sidebar |
| title | string | Titre affiché en haut de la sidebar |
| logo | string | Chemin vers le logo à afficher |
| collapsed | boolean | État de réduction de la sidebar |
| onToggleCollapse | () => void | Callback pour basculer l'état de réduction |

## Exemple complet

Un exemple complet d'utilisation est disponible dans le fichier `SideBarExample.tsx`. Vous pouvez voir le composant en action en visitant la page `/pageHierarchique` de l'application.

## Personnalisation

Le composant utilise Tailwind CSS pour le style et peut être personnalisé en modifiant les classes CSS ou en passant des classes additionnelles via la prop `className`.
