"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useCursor } from "@/components/providers/cursor-provider";
import { TECH_STACK } from "@/lib/config";

// Deterministic pseudo-random scatter so server/client render match
// (avoids hydration mismatches from Math.random on every render).
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const STICKER_COLORS = ["#E8A33D", "#4CAF7D", "#E8564B", "#9FC6DE"];

export function TechStack() {
  const { isDesktop } = useCursor();
  const stickers = useMemo(
    () =>
      TECH_STACK.map((tech, i) => ({
        tech,
        rotate: (seededRandom(i * 3.1) - 0.5) * 24,
        color: STICKER_COLORS[i % STICKER_COLORS.length],
      })),
    []
  );

  return (
    <section
      id="tech-stack"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          07 / tech stack
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          The laptop lid.
        </h2>
      </SectionReveal>

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-4 md:mt-14 md:gap-5">
        {stickers.map(({ tech, rotate, color }, i) => (
          <motion.div
            key={tech}
            drag
            dragConstraints={{ left: -40, right: 40, top: -20, bottom: 20 }}
            dragElastic={0.4}
            initial={{ opacity: 0, scale: 0.7, rotate }}
            whileInView={{ opacity: 1, scale: 1, rotate }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            whileHover={isDesktop ? { scale: 1.12, rotate: rotate * 0.4, zIndex: 10 } : undefined}
            whileDrag={{ scale: 1.15, zIndex: 20, cursor: "grabbing" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: i * 0.04,
            }}
            className="cursor-grab select-none rounded-lg border-2 px-4 py-2.5 font-display text-sm font-bold shadow-lg active:cursor-grabbing"
            style={{
              borderColor: color,
              color,
              backgroundColor: `${color}14`,
            }}
          >
            {tech}
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-xs text-os-muted">
        drag a sticker around
      </p>
    </section>
  );
}
