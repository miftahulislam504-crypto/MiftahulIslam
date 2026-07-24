"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/providers/lenis-provider";

/**
 * Stops Lenis (and native scroll, as a fallback for when reduced-motion
 * disabled Lenis entirely) while `locked` is true. Used by every modal/overlay
 * so background content can't be scrolled behind an open dialog.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [locked, lenis]);
}
