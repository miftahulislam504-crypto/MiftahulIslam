"use client";

import { FileWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SITE } from "@/lib/config";

export function Resume() {
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(SITE.resumeUrl, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setPdfExists(res.ok);
      })
      .catch(() => {
        if (!cancelled) setPdfExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="resume"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          09 / resume
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          resume.pdf
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.15} className="mt-10 md:mt-14">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-os-border bg-os-surface shadow-2xl light:border-os-borderLight light:bg-os-surfaceLight">
          <div className="flex items-center gap-2 border-b border-os-border px-4 py-3 light:border-os-borderLight">
            <span className="h-3 w-3 rounded-full bg-signal-red/80" />
            <span className="h-3 w-3 rounded-full bg-accent/80" />
            <span className="h-3 w-3 rounded-full bg-signal-green/80" />
            <span className="ml-3 font-mono text-xs text-os-muted">
              resume.pdf — viewer
            </span>
          </div>

          {pdfExists === false || pdfExists === null ? (
            <div className="flex aspect-[8.5/11] max-h-[70vh] flex-col items-center justify-center gap-3 bg-os-bg/40 p-8 text-center">
              <FileWarning size={36} className="text-os-muted" />
              <p className="max-w-xs font-mono text-xs text-os-muted">
                {pdfExists === null
                  ? "checking for resume.pdf ..."
                  : "resume.pdf not found yet — add it to /public/resume.pdf and this viewer will pick it up automatically."}
              </p>
            </div>
          ) : (
            <iframe
              src={`${SITE.resumeUrl}#toolbar=0`}
              title="Resume"
              className="h-[80vh] w-full"
            />
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
