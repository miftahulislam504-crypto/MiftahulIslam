"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MESSAGE = "thank you for visiting.";
const CHAR_MS = 45;

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let cancelled = false;
    function type() {
      if (cancelled) return;
      i += 1;
      setTyped(MESSAGE.slice(0, i));
      if (i < MESSAGE.length) setTimeout(type, CHAR_MS);
    }
    const start = setTimeout(type, 200);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [inView]);

  return (
    <footer
      ref={ref}
      className="border-t border-os-border px-6 py-16 light:border-os-borderLight md:px-10"
    >
      <div className="mx-auto max-w-2xl font-mono text-sm text-os-muted">
        <p>
          <span className="text-accent">$</span> {typed}
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent align-middle"
          />
        </p>
        <div className="mt-8 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Miftahul Islam</span>
          <span>built with Next.js, on a desktop that never sleeps.</span>
        </div>
      </div>
    </footer>
  );
}
