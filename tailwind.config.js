/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Fiinor - Design Tokens
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
        "border-glass": "rgba(255,255,255,0.14)",

        // Texte
        "text-primary": "#ffffff",
        "text-muted": "rgba(255,255,255,0.70)",
        "text-dim": "rgba(255,255,255,0.55)",

        // États
        success: "#40c98b",
        warning: "#f0c245",
        danger: "#ef6b6b",
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #1d8b93 0%, #12666d 100%)",
        "gradient-brand": "linear-gradient(135deg, #b8d070 0%, #a2c65e 100%)",
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
