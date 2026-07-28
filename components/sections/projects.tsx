"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, ExternalLink, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { HoverGlow } from "@/components/ui/hover-glow";
import { useCursor, cursorHoverProps } from "@/components/providers/cursor-provider";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/config";

type Project = (typeof PROJECTS)[number];

// The width (in px) we render the live site at before scaling it down.
// This forces every embedded site into its desktop layout, regardless of
// how small the card actually is on screen.
const DESKTOP_VIEWPORT_WIDTH = 1440;
const DESKTOP_VIEWPORT_HEIGHT = 900;

/**
 * Renders a live iframe of the project at a fixed desktop resolution, then
 * scales the whole thing down with a CSS transform to fit the container.
 * This is what makes a 380px-wide card show the *desktop* interface of the
 * site (not a squished mobile view) — like a tiny monitor sitting on a desk.
 */
function MiniDesktopFrame({
  project,
  containerWidth,
  containerHeight,
  interactive = false,
}: {
  project: Project;
  containerWidth: number;
  containerHeight: number;
  interactive?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const scale = containerWidth / DESKTOP_VIEWPORT_WIDTH;

  return (
    <div
      className="relative w-full overflow-hidden bg-os-bg/60"
      style={{ height: containerHeight }}
    >
      {!loaded && !failed && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}22, transparent)`,
          }}
        >
          <span className="animate-pulse font-mono text-[10px] uppercase tracking-widest text-os-muted">
            booting {project.name.toLowerCase().replace(/\s+/g, "-")} …
          </span>
        </div>
      )}

      {failed && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 p-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}22, transparent)`,
          }}
        >
          <span
            className="font-display text-xl font-bold opacity-40"
            style={{ color: project.accentColor }}
          >
            {project.name}
          </span>
          <span className="max-w-[220px] font-mono text-[10px] text-os-muted">
            live preview blocked this embed — open it directly instead
          </span>
        </div>
      )}

      <div
        style={{
          width: DESKTOP_VIEWPORT_WIDTH,
          height: DESKTOP_VIEWPORT_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        <iframe
          key={project.url}
          src={project.url}
          title={project.name}
          loading="lazy"
          sandbox={
            interactive
              ? "allow-scripts allow-same-origin allow-forms allow-popups"
              : "allow-scripts allow-same-origin"
          }
          style={{
            width: DESKTOP_VIEWPORT_WIDTH,
            height: DESKTOP_VIEWPORT_HEIGHT,
            border: "none",
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}

function DesktopWindow({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: () => void;
}) {
  const { setVariant, isDesktop } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewWidth, setPreviewWidth] = useState(0);

  // Measure actual rendered width so the scale factor for the embedded
  // desktop iframe is always correct, regardless of card/viewport size.
  useEffect(() => {
    function measure() {
      if (previewRef.current) setPreviewWidth(previewRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 30 });
  const lift = useTransform([rotateX, rotateY], ([rx, ry]: number[]) =>
    -(Math.abs(rx) + Math.abs(ry)) * 0.6
  );

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * 10);
    rotateXRaw.set(-py * 10);
  }

  function onMouseLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  const previewHeight = previewWidth
    ? (previewWidth / DESKTOP_VIEWPORT_WIDTH) * DESKTOP_VIEWPORT_HEIGHT
    : 0;

  return (
    <motion.div
      ref={cardRef}
      className="w-[min(85vw,380px)] flex-shrink-0 snap-start"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        y: lift,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <HoverGlow glowColor={`${project.accentColor}22`}>
        <div className="block w-full overflow-hidden rounded-xl border border-os-border bg-os-surface text-left shadow-xl light:border-os-borderLight light:bg-os-surfaceLight">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-os-border px-4 py-3 light:border-os-borderLight">
            <span className="h-3 w-3 rounded-full bg-signal-red/80" />
            <span className="h-3 w-3 rounded-full bg-accent/80" />
            <span className="h-3 w-3 rounded-full bg-signal-green/80" />
            <span className="ml-3 truncate font-mono text-xs text-os-muted">
              {project.name.toLowerCase().replace(/\s+/g, "-")}.app
            </span>
          </div>

          {/* Live scaled-down desktop preview */}
          <button
            type="button"
            onClick={onExpand}
            {...cursorHoverProps(setVariant, "view")}
            className="block w-full"
          >
            <div ref={previewRef} className="w-full">
              {previewWidth > 0 && (
                <MiniDesktopFrame
                  project={project}
                  containerWidth={previewWidth}
                  containerHeight={previewHeight}
                />
              )}
            </div>
          </button>

          <div className="p-5">
            <h3 className="font-display text-lg font-bold">{project.name}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-os-muted">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-os-border px-2 py-0.5 font-mono text-[10px] text-os-muted light:border-os-borderLight"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={onExpand}
                {...cursorHoverProps(setVariant, "view")}
                className="inline-flex items-center gap-1 font-mono text-xs text-accent"
              >
                ↗ open
              </button>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                {...cursorHoverProps(setVariant, "link")}
                className="inline-flex items-center gap-1 font-mono text-xs text-os-muted hover:text-white"
              >
                <ExternalLink size={12} /> visit
              </a>
            </div>
          </div>
        </div>
      </HoverGlow>
    </motion.div>
  );
}

function FullscreenPreview({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [reloadKey, setReloadKey] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapWidth, setWrapWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(600);

  useEffect(() => {
    function measure() {
      if (wrapRef.current) setWrapWidth(wrapRef.current.offsetWidth);
      setMaxHeight(window.innerHeight * 0.7);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const wrapHeight = wrapWidth
    ? Math.min((wrapWidth / DESKTOP_VIEWPORT_WIDTH) * DESKTOP_VIEWPORT_HEIGHT, maxHeight)
    : 0;

  return (
    <motion.div
      className="fixed inset-0 z-[92] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-5xl overflow-hidden rounded-xl border border-os-border bg-os-surface shadow-2xl"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-os-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-signal-red/80" />
          <span className="h-3 w-3 rounded-full bg-accent/80" />
          <span className="h-3 w-3 rounded-full bg-signal-green/80" />
          <span className="ml-3 font-mono text-xs text-os-muted">
            {project.name.toLowerCase().replace(/\s+/g, "-")}.app
          </span>

          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            aria-label="Reload preview"
            className="ml-auto text-os-muted hover:text-white"
          >
            <RotateCcw size={14} />
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in new tab"
            className="text-os-muted hover:text-white"
          >
            <ExternalLink size={14} />
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="text-os-muted hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div ref={wrapRef} className="w-full overflow-hidden" style={{ maxHeight }}>
          {wrapWidth > 0 && (
            <div key={reloadKey}>
              <MiniDesktopFrame
                project={project}
                containerWidth={wrapWidth}
                containerHeight={wrapHeight}
                interactive
              />
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl font-bold">{project.name}</h3>
          <p className="mt-2 text-os-muted">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-os-border px-2.5 py-1 font-mono text-xs text-os-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
          >
            <ExternalLink size={14} /> visit project
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CategoryRow({
  label,
  count,
  projects,
  onExpand,
}: {
  label: string;
  count: number;
  projects: Project[];
  onExpand: (project: Project) => void;
}) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-14 first:mt-10 md:mt-16 md:first:mt-14">
      <SectionReveal className="px-6 md:px-10">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-xl font-bold md:text-2xl">{label}</h3>
          <span className="font-mono text-xs text-os-muted">
            {count} {count === 1 ? "project" : "projects"}
          </span>
        </div>
      </SectionReveal>

      <div
        className="mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:mt-6 md:px-10"
        style={{ scrollbarWidth: "thin" }}
      >
        {projects.map((project, i) => (
          <SectionReveal key={project.id} delay={i * 0.06} className="flex-shrink-0">
            <DesktopWindow project={project} onExpand={() => onExpand(project)} />
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const [expanded, setExpanded] = useState<Project | null>(null);

  useScrollLock(!!expanded);

  useEffect(() => {
    if (!expanded) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  return (
    <section
      id="projects"
      className="border-t border-os-border py-24 light:border-os-borderLight md:py-32"
    >
      <SectionReveal className="px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          03 / projects
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold md:text-4xl">
          A desk full of open windows.
        </h2>
        <p className="mt-2 max-w-md text-sm text-os-muted">
          Grouped by kind. Scroll sideways within a row, click a window to
          open it full screen — each one is a live look at the real, deployed
          site.
        </p>
      </SectionReveal>

      {PROJECT_CATEGORIES.map((category) => {
        const categoryProjects = PROJECTS.filter((p) => p.category === category.id);
        return (
          <CategoryRow
            key={category.id}
            label={category.label}
            count={categoryProjects.length}
            projects={[...categoryProjects]}
            onExpand={setExpanded}
          />
        );
      })}

      <AnimatePresence>
        {expanded && (
          <FullscreenPreview project={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
