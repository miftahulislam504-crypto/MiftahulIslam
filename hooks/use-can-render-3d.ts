"use client";

import { useEffect, useState } from "react";

/**
 * Gates whether the 3D layer should mount at all. We keep this deliberately
 * conservative: R3F canvases are the single heaviest thing on this page, and
 * a "workspace OS" feeling should never come at the cost of janky scroll on
 * a mid-range phone. Mobile and reduced-motion users get the 2D blueprint
 * grid background instead (already present), no 3D canvas mounted.
 */
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isWideEnough = window.innerWidth >= 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setCanRender(isFinePointer && isWideEnough && !prefersReducedMotion);
  }, []);

  return canRender;
}
