"use client";

import { motion, useInView } from "framer-motion";
import { Search, Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SKILLS } from "@/lib/config";

const PLACEHOLDER_CYCLE = "search skill...";
const CHAR_MS = 55;

export function Skills() {
  const [query, setQuery] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  // Typing animation plays once into the placeholder, purely decorative,
  // then hands control to the real input.
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let cancelled = false;
    function type() {
      if (cancelled) return;
      i += 1;
      setPlaceholderText(PLACEHOLDER_CYCLE.slice(0, i));
      if (i < PLACEHOLDER_CYCLE.length) setTimeout(type, CHAR_MS);
    }
    const start = setTimeout(type, 300);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [inView]);

  const filtered = useMemo(() => {
    if (!query.trim()) return SKILLS;
    return SKILLS.filter((s) => s.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <section
      id="skills"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          02 / skills
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          Everything, one keystroke away.
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.15} className="mt-10 md:mt-14">
        <div
          ref={ref}
          className="mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-os-border bg-os-surface shadow-2xl light:border-os-borderLight light:bg-os-surfaceLight"
        >
          <div className="flex items-center gap-3 border-b border-os-border px-4 py-3.5 light:border-os-borderLight">
            <Search size={16} className="text-os-muted" />
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className="w-full bg-transparent font-mono text-sm text-white placeholder:text-os-muted focus:outline-none light:text-os-surface"
                aria-label="Search skills"
              />
              {!query && !inputFocused && (
                <span className="pointer-events-none absolute inset-0 font-mono text-sm text-os-muted">
                  {placeholderText}
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                    className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent align-middle"
                  />
                </span>
              )}
            </div>
            <kbd className="rounded border border-os-border px-1.5 py-0.5 font-mono text-[10px] text-os-muted light:border-os-borderLight">
              {filtered.length}
            </kbd>
          </div>

          <ul className="max-h-[340px] overflow-y-auto p-2">
            {filtered.length === 0 && (
              <li className="px-3 py-8 text-center font-mono text-xs text-os-muted">
                no matches
              </li>
            )}
            {filtered.map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
              >
                <div className="flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-sm text-white transition-colors hover:bg-accent/10 light:text-os-surface">
                  <span>{skill}</span>
                  <Check size={14} className="text-accent" />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    </section>
  );
}
