"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useCursor, cursorHoverProps } from "@/components/providers/cursor-provider";
import { DOCK_ITEMS } from "@/lib/config";

const ICON_MAP: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  FileText,
};

const BASE_SIZE = 52;
const MAX_SIZE = 88;
const DISTANCE_RANGE = 160;

function DockIcon({
  name,
  icon,
  href,
  mouseX,
}: {
  name: string;
  icon: string;
  href: string;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { setVariant } = useCursor();
  const Icon = ICON_MAP[icon] ?? Github;

  const distance = useTransform(mouseX, (x) => {
    const el = ref.current;
    if (!el) return DISTANCE_RANGE;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return x - center;
  });

  const sizeRaw = useTransform(
    distance,
    [-DISTANCE_RANGE, 0, DISTANCE_RANGE],
    [BASE_SIZE, MAX_SIZE, BASE_SIZE]
  );
  const size = useSpring(sizeRaw, { mass: 0.15, stiffness: 220, damping: 16 });

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={name}
      {...cursorHoverProps(setVariant, "link")}
      className="group relative flex flex-col items-center"
    >
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-2xl border border-os-border bg-os-surface shadow-lg light:border-os-borderLight light:bg-os-surfaceLight"
      >
        <Icon size={20} className="text-accent" />
      </motion.div>
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-os-border bg-os-surface px-2 py-1 font-mono text-[10px] text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 light:border-os-borderLight light:bg-os-surfaceLight light:text-os-surface">
        {name}
      </span>
    </a>
  );
}

export function Contact() {
  const mouseX = useMotionValue(Infinity);

  return (
    <section
      id="contact"
      className="border-t border-os-border px-6 py-24 light:border-os-borderLight md:px-10 md:py-32"
    >
      <SectionReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          10 / contact
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-2 max-w-md text-sm text-os-muted">
          Open the dock. Pick a channel.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="mx-auto mt-14 flex w-fit items-end gap-4 rounded-2xl border border-os-border bg-os-surface/80 px-6 py-4 shadow-2xl backdrop-blur-md light:border-os-borderLight light:bg-os-surfaceLight/80 md:mt-20 md:gap-5 md:px-8"
        >
          {DOCK_ITEMS.map((item) => (
            <DockIcon
              key={item.name}
              name={item.name}
              icon={item.icon}
              href={item.href}
              mouseX={mouseX}
            />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
