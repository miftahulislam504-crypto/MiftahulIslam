import { JetBrains_Mono, Space_Grotesk, Inter } from "next/font/google";

// Monospace: used for terminal, command palette, git timeline, file explorer, footer prompt.
// This is the load-bearing font of the whole "OS" identity — it appears in every signature section.
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Display: used for hero headline and section titles. Space Grotesk has the slightly
// technical/geometric character that fits an engineer's workspace without being a generic
// grotesque — distinct from the mono, but clearly from the same family of "drafting tool" type.
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body: used for paragraph copy where mono would be too dense to read.
export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});
