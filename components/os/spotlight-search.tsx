"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { NAV_ITEMS } from "@/lib/config";
import { useLenis } from "@/components/providers/lenis-provider";
import { useScrollLock } from "@/hooks/use-scroll-lock";

export function SpotlightSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("Home");
  const inputRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();

  useScrollLock(open);

  // Active Navbar Indicator: since there's no persistent navbar, the spotlight
  // trigger itself doubles as the indicator, updating its label to the section
  // currently in view.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = NAV_ITEMS.find(
            (item) => document.querySelector(item.href) === visible.target
          );
          if (match) setActiveSection(match.label);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return NAV_ITEMS;
    return NAV_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function goTo(href: string) {
    setOpen(false);
    const el = document.querySelector(href);
    if (el && lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -24 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      goTo(results[activeIndex].href);
    }
  }

  return (
    <>
      {/* Trigger button, sits where a navbar would be */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-1/2 top-5 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-os-border bg-os-surface/80 px-4 py-2 font-mono text-xs text-os-muted backdrop-blur-md transition-colors hover:border-accent/50 hover:text-white light:border-os-borderLight light:bg-os-surfaceLight/80 light:text-os-mutedLight"
        aria-label="Open search (Ctrl+K)"
      >
        <Search size={13} />
        <span className="text-white light:text-os-surface">{activeSection}</span>
        <span className="text-os-muted">/ search</span>
        <kbd className="ml-2 rounded border border-os-border px-1.5 py-0.5 text-[10px] light:border-os-borderLight">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal
              className="fixed left-1/2 top-[18vh] z-[96] w-[min(92vw,560px)] -translate-x-1/2 overflow-hidden rounded-xl border border-os-border bg-os-surface shadow-2xl light:border-os-borderLight light:bg-os-surfaceLight"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 border-b border-os-border px-4 py-3 light:border-os-borderLight">
                <Search size={15} className="text-os-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search sections..."
                  className="w-full bg-transparent font-mono text-sm text-white placeholder:text-os-muted focus:outline-none light:text-os-surface"
                />
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-6 text-center font-mono text-xs text-os-muted">
                    no matches for &ldquo;{query}&rdquo;
                  </li>
                )}
                {results.map((item, i) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => goTo(item.href)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-mono text-sm transition-colors ${
                        i === activeIndex
                          ? "bg-accent/15 text-accent"
                          : "text-os-muted"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
