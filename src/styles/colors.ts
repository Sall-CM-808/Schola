// Palette de couleurs Schola - Design Tokens
export const colors = {
  // Primary (teal)
  primary: {
    300: "#6cbec1",
    400: "#3fa7ab",
    500: "#1d8b93", // couleur clé – boutons, liens actifs
    600: "#177880",
    700: "#12666d",
  },

  // Brand / Accent (lime-olive)
  brand: {
    500: "#b8d070", // chips, CTA secondaires, surbrillance
    600: "#a2c65e",
    700: "#8fb650",
  },

  // Surfaces & verres (glass)
  surface: {
    1: "rgba(255,255,255,0.06)",
    2: "rgba(255,255,255,0.10)",
  },

  // Bordures
  border: "rgba(255,255,255,0.14)",

  // Texte
  text: {
    primary: "#ffffff",
    muted: "rgba(255,255,255,0.70)",
    dim: "rgba(255,255,255,0.55)",
  },

  // États
  success: "#40c98b",
  warning: "#f0c245",
  danger: "#ef6b6b",

  // Gradients
  gradients: {
    primary: "linear-gradient(135deg, #1d8b93 0%, #12666d 100%)",
    brand: "linear-gradient(135deg, #b8d070 0%, #a2c65e 100%)",
  },
} as const;

// Classes Tailwind CSS personnalisées
export const colorClasses = {
  // Primary
  "bg-primary-300": `bg-[${colors.primary[300]}]`,
  "bg-primary-400": `bg-[${colors.primary[400]}]`,
  "bg-primary-500": `bg-[${colors.primary[500]}]`,
  "bg-primary-600": `bg-[${colors.primary[600]}]`,
  "bg-primary-700": `bg-[${colors.primary[700]}]`,

  "text-primary-300": `text-[${colors.primary[300]}]`,
  "text-primary-400": `text-[${colors.primary[400]}]`,
  "text-primary-500": `text-[${colors.primary[500]}]`,
  "text-primary-600": `text-[${colors.primary[600]}]`,
  "text-primary-700": `text-[${colors.primary[700]}]`,

  "border-primary-300": `border-[${colors.primary[300]}]`,
  "border-primary-400": `border-[${colors.primary[400]}]`,
  "border-primary-500": `border-[${colors.primary[500]}]`,
  "border-primary-600": `border-[${colors.primary[600]}]`,
  "border-primary-700": `border-[${colors.primary[700]}]`,

  // Brand
  "bg-brand-500": `bg-[${colors.brand[500]}]`,
  "bg-brand-600": `bg-[${colors.brand[600]}]`,
  "bg-brand-700": `bg-[${colors.brand[700]}]`,

  "text-brand-500": `text-[${colors.brand[500]}]`,
  "text-brand-600": `text-[${colors.brand[600]}]`,
  "text-brand-700": `text-[${colors.brand[700]}]`,

  "border-brand-500": `border-[${colors.brand[500]}]`,
  "border-brand-600": `border-[${colors.brand[600]}]`,
  "border-brand-700": `border-[${colors.brand[700]}]`,

  // Surfaces
  "bg-surface-1": `bg-[${colors.surface[1]}]`,
  "bg-surface-2": `bg-[${colors.surface[2]}]`,

  // Texte
  "text-primary": `text-[${colors.text.primary}]`,
  "text-muted": `text-[${colors.text.muted}]`,
  "text-dim": `text-[${colors.text.dim}]`,

  // États
  "bg-success": `bg-[${colors.success}]`,
  "bg-warning": `bg-[${colors.warning}]`,
  "bg-danger": `bg-[${colors.danger}]`,

  "text-success": `text-[${colors.success}]`,
  "text-warning": `text-[${colors.warning}]`,
  "text-danger": `text-[${colors.danger}]`,

  // Bordures
  "border-glass": `border-[${colors.border}]`,
} as const;
