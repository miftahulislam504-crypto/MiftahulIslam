"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ABOUT } from "@/lib/config";

/**
 * A hand-drafted-feeling blueprint: a simple building elevation with
 * dimension lines, drawn as inline SVG so it needs no image asset and
 * can be recolored per theme. Two layers (structure + dimension lines)
 * move at slightly different speeds on scroll for depth.
 */
export function BlueprintPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBack = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const yFront = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-os-border bg-blueprint bg-grid light:border-os-borderLight"
      style={{
        // Blueprint reads better on a dark plane even in light mode — it's
        // meant to look like a physical drafting sheet sitting on the desk.
        backgroundColor: "#0E2233",
      }}
    >
      <motion.svg
        style={{ y: yBack }}
        viewBox="0 0 400 480"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Dimension lines — back layer, subtle */}
        <g stroke="#4C7893" strokeWidth="1" opacity="0.6">
          <line x1="40" y1="40" x2="360" y2="40" />
          <line x1="40" y1="30" x2="40" y2="50" />
          <line x1="360" y1="30" x2="360" y2="50" />
          <line x1="20" y1="60" x2="20" y2="420" />
          <line x1="10" y1="60" x2="30" y2="60" />
          <line x1="10" y1="420" x2="30" y2="420" />
        </g>
        <text x="180" y="32" fill="#6B93AC" fontSize="10" fontFamily="monospace">
          9600 mm
        </text>
        <text
          x="8"
          y="245"
          fill="#6B93AC"
          fontSize="10"
          fontFamily="monospace"
          transform="rotate(-90 8 245)"
        >
          4200 mm
        </text>
      </motion.svg>

      <motion.svg
        style={{ y: yFront }}
        viewBox="0 0 400 480"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Building elevation — front layer */}
        <g stroke="#9FC6DE" strokeWidth="1.4">
          <rect x="60" y="80" width="280" height="320" />
          {/* Roof line */}
          <path d="M60 80 L200 30 L340 80" />
          {/* Floor divisions */}
          <line x1="60" y1="180" x2="340" y2="180" />
          <line x1="60" y1="290" x2="340" y2="290" />
          {/* Windows */}
          <rect x="90" y="110" width="40" height="50" />
          <rect x="180" y="110" width="40" height="50" />
          <rect x="270" y="110" width="40" height="50" />
          <rect x="90" y="210" width="40" height="50" />
          <rect x="180" y="210" width="40" height="50" />
          <rect x="270" y="210" width="40" height="50" />
          {/* Door */}
          <rect x="180" y="330" width="40" height="70" />
          {/* Ground line */}
          <line x1="30" y1="400" x2="370" y2="400" strokeWidth="2" />
        </g>
        {/* Hatch marks on ground line, drafting convention */}
        <g stroke="#6B93AC" strokeWidth="1">
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1={35 + i * 19}
              y1="400"
              x2={27 + i * 19}
              y2="412"
            />
          ))}
        </g>
      </motion.svg>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-[#6B93AC]">
        <span>fig. 01 — elevation</span>
        <span>scale 1:100</span>
      </div>

      <p className="absolute -bottom-6 left-0 font-mono text-xs text-os-muted">
        {ABOUT.blueprintCaption}
      </p>
    </div>
  );
}
