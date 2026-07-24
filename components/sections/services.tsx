"use client";

import { motion } from "framer-motion";
import {
  Globe,
  LayoutDashboard,
  Ruler,
  ShoppingBag,
  Flame,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useCursor, cursorHoverProps } from "@/components/providers/cursor-provider";
import { SERVICES } from "@/lib/config";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  LayoutDashboard,
  Ruler,
  ShoppingBag,
  Flame,
  Sparkles,
};

function AppIcon({ name, icon }: { name: string; icon: string }) {
  const Icon = ICON_MAP[icon] ?? Globe;
  const { setVariant, isDesktop } = useCursor();

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      whileHover={isDesktop ? "hover" : undefined}
      whileTap="hover"
      {...cursorHoverProps(setVariant, "link")}
    >
      <motion.div
        variants={{
          hover: { scale: 1.08, y: -4 },
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-os-border bg-os-surface shadow-lg light:border-os-borderLight light:bg-os-surfaceLight md:h-20 md:w-20"
      >
        <motion.div
          variants={{ hover: { scale: 1.15 } }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
        >
          <Icon size={26} className="text-accent" />
        </motion.div>
      </motion.div>
      <span className="text-center font-mono text-xs text-os-muted">{name}</span>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          05 / services
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          Tap to launch.
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-6 md:gap-x-6">
          {SERVICES.map((service) => (
            <AppIcon key={service.name} name={service.name} icon={service.icon} />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
