"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";

const BOOT_LINES = [
  "miftahul-os boot",
  "mounting /projects ... ok",
  "mounting /skills ... ok",
  "starting workspace shell",
];

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useScrollLock(visible);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, BOOT_LINES.length));
    }, 220);

    const doneTimer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-os-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="w-[min(90vw,420px)] font-mono text-sm text-os-muted">
            {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
              <div key={i} className="mb-1">
                <span className="text-accent">$</span> {line}
              </div>
            ))}
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-os-border">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
