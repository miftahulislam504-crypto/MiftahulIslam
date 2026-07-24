"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { HoverGlow } from "@/components/ui/hover-glow";
import { STATS } from "@/lib/config";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 24, stiffness: 90 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold md:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const maxValue = Math.max(...STATS.map((s) => s.value));

  return (
    <section
      id="stats"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          08 / stats
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          System metrics.
        </h2>
      </SectionReveal>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14">
        {STATS.map((stat, i) => (
          <SectionReveal key={stat.label} delay={i * 0.08}>
            <HoverGlow glowColor="rgba(232,163,61,0.1)" className="rounded-xl">
              <div className="rounded-xl border border-os-border bg-os-surface p-6 shadow-lg light:border-os-borderLight light:bg-os-surfaceLight">
                <p className="font-mono text-xs uppercase tracking-wide text-os-muted">
                  {stat.label}
                </p>
                <div className="mt-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-os-border light:bg-os-borderLight">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${(stat.value / maxValue) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </HoverGlow>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
