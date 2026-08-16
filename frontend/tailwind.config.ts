import type { Config } from "tailwindcss";

// Every color below reads from a CSS variable defined in src/styles/tokens.css.
// This is what lets the Theme & Accent settings screen (Phase 14) repaint the
// whole app at runtime by rewriting the variables instead of shipping new CSS.
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // The "hsl(var(--x) / <alpha-value>)" pattern (not plain "hsl(var(--x))")
        // is what lets Tailwind's opacity modifiers work, e.g. bg-primary/10,
        // border-danger/20. Every color below follows it.
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--bg-app) / <alpha-value>)",
        foreground: "hsl(var(--text-primary) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--bg-card) / <alpha-value>)",
          foreground: "hsl(var(--text-primary) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--bg-app) / <alpha-value>)",
          foreground: "hsl(var(--text-secondary) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--neutral) / 0.12)",
          foreground: "hsl(var(--text-secondary) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--primary) / 0.08)",
          foreground: "hsl(var(--primary) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          foreground: "hsl(var(--danger-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)",
        },
        sky: {
          DEFAULT: "hsl(var(--sky) / <alpha-value>)",
          foreground: "hsl(var(--sky-foreground) / <alpha-value>)",
        },
        neutral: "hsl(var(--neutral) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontSize: {
        xs: "calc(0.75rem * var(--font-scale))",
        sm: "calc(0.875rem * var(--font-scale))",
        base: "calc(1rem * var(--font-scale))",
        lg: "calc(1.125rem * var(--font-scale))",
        xl: "calc(1.25rem * var(--font-scale))",
        "2xl": "calc(1.5rem * var(--font-scale))",
        "3xl": "calc(1.875rem * var(--font-scale))",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      spacing: {
        "card-desktop": "24px",
        "card-mobile": "16px",
        "sidebar": "260px",
        "sidebar-rail": "72px",
        "topbar-height": "64px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
