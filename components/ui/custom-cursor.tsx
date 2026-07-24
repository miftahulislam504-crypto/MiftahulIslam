"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useCursor } from "@/components/providers/cursor-provider";

const VARIANT_SIZE: Record<string, number> = {
  default: 10,
  link: 48,
  drag: 64,
  view: 72,
};

const VARIANT_LABEL: Record<string, string> = {
  default: "",
  link: "",
  drag: "DRAG",
  view: "VIEW",
};

export function CustomCursor() {
  const { isDesktop, variant } = useCursor();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    if (!isDesktop) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isDesktop, x, y]);

  if (!isDesktop) return null;

  const size = VARIANT_SIZE[variant] ?? VARIANT_SIZE.default;
  const label = VARIANT_LABEL[variant] ?? "";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-white bg-white/10 backdrop-blur-sm"
        animate={{ width: size, height: size }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
      >
        {label && (
          <span className="font-mono text-[9px] tracking-widest text-white">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
