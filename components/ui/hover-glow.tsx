"use client";

import type { CSSProperties } from "react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

/**
 * Wraps children in a container that renders a radial-gradient glow
 * following the mouse position, via CSS custom properties (no per-frame
 * React state updates — keeps this cheap even with many instances on screen).
 */
export function HoverGlow({
  children,
  className,
  glowColor = "rgba(232,163,61,0.15)",
}: HoverGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn("group relative overflow-hidden", className)}
      style={
        {
          "--glow-color": glowColor,
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
