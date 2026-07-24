"use client";

import { GitCommit } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { EXPERIENCE } from "@/lib/config";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          04 / experience
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          Commit history.
        </h2>
      </SectionReveal>

      <div className="mx-auto mt-10 max-w-2xl md:mt-14">
        {EXPERIENCE.map((yearBlock, yi) => (
          <SectionReveal key={yearBlock.year} delay={yi * 0.1} className="mb-10 last:mb-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-display text-xl font-bold text-accent">
                {yearBlock.year}
              </span>
              <span className="h-px flex-1 bg-os-border light:bg-os-borderLight" />
            </div>

            <div className="relative border-l border-os-border pl-6 light:border-os-borderLight">
              {yearBlock.commits.map((commit, ci) => (
                <div key={ci} className="relative mb-5 last:mb-0">
                  <span className="absolute -left-[29px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-os-border bg-os-surface light:border-os-borderLight light:bg-os-surfaceLight">
                    <GitCommit size={9} className="text-accent" />
                  </span>
                  <p className="font-mono text-sm text-white light:text-os-surface">
                    {commit}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
