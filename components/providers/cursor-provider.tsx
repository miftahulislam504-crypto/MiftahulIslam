"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CursorVariant = "default" | "link" | "drag" | "view";

interface CursorContextValue {
  isDesktop: boolean;
  variant: CursorVariant;
  setVariant: (v: CursorVariant) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      setIsDesktop(mq.matches);
      document.documentElement.classList.toggle("custom-cursor-active", mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <CursorContext.Provider value={{ isDesktop, variant, setVariant }}>
      {children}
    </CursorContext.Provider>
  );
}

// Helper props to spread onto any interactive element so it sets the cursor variant on hover.
export function cursorHoverProps(setVariant: (v: CursorVariant) => void, v: CursorVariant) {
  return {
    onMouseEnter: () => setVariant(v),
    onMouseLeave: () => setVariant("default"),
  };
}
