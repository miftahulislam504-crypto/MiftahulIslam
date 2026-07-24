"use client";

import { SectionReveal } from "@/components/ui/section-reveal";
import { TerminalPanel } from "@/components/os/terminal-panel";
import { BlueprintPanel } from "@/components/os/blueprint-panel";

export function About() {
  return (
    <section
      id="about"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          01 / about
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          Two disciplines, one way of thinking.
        </h2>
      </SectionReveal>

      <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-12">
        <SectionReveal delay={0.1}>
          <TerminalPanel />
        </SectionReveal>

        <SectionReveal delay={0.2} className="pb-6">
          <BlueprintPanel />
        </SectionReveal>
      </div>
    </section>
  );
}
