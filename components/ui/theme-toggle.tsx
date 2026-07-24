"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useCursor, cursorHoverProps } from "@/components/providers/cursor-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { setVariant } = useCursor();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      {...cursorHoverProps(setVariant, "link")}
      className="relative flex h-8 w-14 items-center rounded-full border border-os-border bg-os-surface px-1 transition-colors light:border-os-borderLight light:bg-os-surfaceLight"
    >
      <motion.span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-os-bg"
        animate={{ x: isDark ? 0 : 22 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </motion.span>
    </button>
  );
}
