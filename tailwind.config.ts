import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base OS surface tones
        os: {
          bg: "#0B0D10",        // near-black window desktop background
          bgLight: "#F3F1EC",   // light-mode desktop background (warm paper, not stark white)
          surface: "#14171C",   // window chrome / panel surface (dark)
          surfaceLight: "#FFFFFF",
          border: "#242830",
          borderLight: "#DCD8CE",
          muted: "#7C838F",
          mutedLight: "#6B6558",
        },
        // Signature accent — traffic-light amber (from window controls), not a generic gradient
        accent: {
          DEFAULT: "#E8A33D", // amber — the "active window" glow color
          dim: "#8A6425",
          light: "#F4C878",
        },
        // Secondary system accents (macOS/Windows control colors, used sparingly)
        signal: {
          red: "#E8564B",
          green: "#4CAF7D",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(rgba(232,163,61,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232,163,61,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      animation: {
        blink: "blink 1s step-start infinite",
        "caret-blink": "blink 1.1s step-end infinite",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, selector: string) => void }) {
      // Custom variant: `light:bg-white` applies when <html> has class "light".
      // We default to dark mode (no class needed) and opt into light explicitly,
      // which matches ThemeProvider's behavior of toggling `.light` on <html>.
      addVariant("light", "html.light &");
    },
  ],
};

export default config;
