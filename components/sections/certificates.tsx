"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, X, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useCursor, cursorHoverProps } from "@/components/providers/cursor-provider";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { CERTIFICATES } from "@/lib/config";

export function Certificates() {
  const [selected, setSelected] = useState<string | null>(null);
  const [openedFile, setOpenedFile] = useState<string | null>(null);
  const { setVariant } = useCursor();

  useScrollLock(!!openedFile);

  useEffect(() => {
    if (!openedFile) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenedFile(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openedFile]);

  return (
    <section
      id="certificates"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          06 / certificates
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          C:\Certificates
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.15} className="mt-10 md:mt-14">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-os-border bg-os-surface shadow-2xl light:border-os-borderLight light:bg-os-surfaceLight">
          <div className="flex items-center gap-2 border-b border-os-border px-4 py-3 font-mono text-xs text-os-muted light:border-os-borderLight">
            <Folder size={13} className="text-accent" />
            Certificates
          </div>

          {/* Column headers, explorer-style */}
          <div className="grid grid-cols-[1fr,80px] gap-4 border-b border-os-border px-4 py-2 font-mono text-[10px] uppercase tracking-wide text-os-muted light:border-os-borderLight">
            <span>Name</span>
            <span className="text-right">Size</span>
          </div>

          <ul>
            {CERTIFICATES.map((cert) => (
              <li key={cert.name}>
                <button
                  type="button"
                  onClick={() => setSelected(cert.name)}
                  onDoubleClick={() => setOpenedFile(cert.name)}
                  {...cursorHoverProps(setVariant, "link")}
                  className={`grid w-full grid-cols-[1fr,80px] items-center gap-4 px-4 py-3 text-left transition-colors ${
                    selected === cert.name
                      ? "bg-accent/15"
                      : "hover:bg-white/5 light:hover:bg-black/5"
                  }`}
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm text-white light:text-os-surface">
                    <FileText size={15} className="flex-shrink-0 text-accent" />
                    <span className="truncate">{cert.name}</span>
                  </span>
                  <span className="text-right font-mono text-xs text-os-muted">
                    {cert.size}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-os-border px-4 py-2 font-mono text-[10px] text-os-muted light:border-os-borderLight">
            {CERTIFICATES.length} items · double-click to open
          </div>
        </div>
      </SectionReveal>

      <AnimatePresence>
        {openedFile && (
          <motion.div
            className="fixed inset-0 z-[92] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenedFile(null)}
          >
            <motion.div
              className="w-full max-w-lg overflow-hidden rounded-xl border border-os-border bg-os-surface shadow-2xl"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 border-b border-os-border px-4 py-3">
                <FileText size={14} className="text-accent" />
                <span className="font-mono text-xs text-os-muted">{openedFile}</span>
                <button
                  type="button"
                  onClick={() => setOpenedFile(null)}
                  aria-label="Close"
                  className="ml-auto text-os-muted hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-os-bg/50 p-8 text-center">
                <FileText size={40} className="text-os-muted" />
                <p className="font-mono text-xs text-os-muted">
                  Certificate preview will render here once the PDF is uploaded.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
