"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { useCanRender3D } from "@/hooks/use-can-render-3d";
import { SITE } from "@/lib/config";

// Loaded only on the client, and only when useCanRender3D says it's safe to.
// This keeps the 3D bundle out of the initial JS on mobile entirely.
const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

function useLiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000 * 15);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Hero() {
  const time = useLiveClock();
  const canRender3D = useCanRender3D();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-24 md:px-10"
    >
      {/* 3D wireframe truss, floating behind the typography. Desktop/fine-pointer
          only (see useCanRender3D) — mobile keeps the flat blueprint-grid
          background instead, no WebGL cost. pointer-events-none so it never
          intercepts scroll or clicks. */}
      {canRender3D && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <HeroCanvas />
        </div>
      )}

      {/* Signature detail: a thin status-bar line, like the top of an OS desktop,
          establishing the "workspace" premise before any content is read. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-between font-mono text-[11px] text-os-muted"
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
          system online
        </span>
        <span suppressHydrationWarning>{time || "--:--"} local</span>
      </motion.div>

      {/* Main thesis: large, confident type. No supporting stat blocks, no
          gradient card — the name and role carry the whole opening. */}
      <div className="flex flex-1 flex-col justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {"// portfolio.init()"}
        </p>

        <TextReveal
          as="h1"
          text={SITE.name}
          wordDelay={0.06}
          className="mt-4 font-display text-[15vw] font-bold leading-[0.95] tracking-tight sm:text-[11vw] md:text-[7.5rem]"
        />

        <TextReveal
          as="h2"
          text={SITE.role}
          wordDelay={0.05}
          className="mt-4 max-w-2xl font-display text-2xl font-medium text-os-muted md:text-3xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 max-w-md text-sm text-os-muted md:text-base"
        >
          {SITE.tagline}
        </motion.p>
      </div>

      {/* Scroll cue, quiet and functional rather than decorative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex items-center gap-2 font-mono text-[11px] text-os-muted"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        scroll to explore the workspace
      </motion.div>
    </section>
  );
}
