"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ABOUT } from "@/lib/config";

interface TypedLine {
  text: string;
  kind: "command" | "output";
}

// Flatten the command/output structure into a linear script the typewriter
// plays through, so timing is trivial to reason about.
function buildScript(): TypedLine[] {
  const lines: TypedLine[] = [];
  for (const block of ABOUT.terminalLines) {
    lines.push({ text: block.command, kind: "command" });
    for (const out of block.output) {
      lines.push({ text: out, kind: "output" });
    }
  }
  return lines;
}

const SCRIPT = buildScript();
const CHAR_MS = 18;
const LINE_PAUSE_MS = 350;
const COMMAND_PAUSE_MS = 500;

export function TerminalPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  const [completedLines, setCompletedLines] = useState<TypedLine[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;
    if (lineIndex >= SCRIPT.length) {
      setDone(true);
      return;
    }

    const line = SCRIPT[lineIndex];
    let charIndex = 0;
    let cancelled = false;

    function typeNextChar() {
      if (cancelled) return;
      charIndex += 1;
      setCurrentText(line.text.slice(0, charIndex));

      if (charIndex < line.text.length) {
        setTimeout(typeNextChar, CHAR_MS);
      } else {
        const pause = line.kind === "command" ? COMMAND_PAUSE_MS : LINE_PAUSE_MS;
        setTimeout(() => {
          if (cancelled) return;
          setCompletedLines((prev) => [...prev, line]);
          setCurrentText("");
          setLineIndex((i) => i + 1);
        }, pause);
      }
    }

    const startDelay = setTimeout(typeNextChar, 80);
    return () => {
      cancelled = true;
      clearTimeout(startDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, lineIndex, done]);

  const activeLine = SCRIPT[lineIndex];

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-os-border bg-os-surface shadow-2xl light:border-os-borderLight light:bg-os-surfaceLight"
    >
      {/* Window chrome, consistent with the "Mini Desktop Windows" language
          used later in Projects — establishes the visual grammar early. */}
      <div className="flex items-center gap-2 border-b border-os-border px-4 py-3 light:border-os-borderLight">
        <span className="h-3 w-3 rounded-full bg-signal-red/80" />
        <span className="h-3 w-3 rounded-full bg-accent/80" />
        <span className="h-3 w-3 rounded-full bg-signal-green/80" />
        <span className="ml-3 font-mono text-xs text-os-muted">about.sh</span>
      </div>

      <div className="min-h-[280px] p-5 font-mono text-sm leading-relaxed md:min-h-[320px] md:p-6 md:text-[15px]">
        {completedLines.map((line, i) => (
          <div key={i} className={line.kind === "command" ? "mt-3 first:mt-0" : ""}>
            {line.kind === "command" ? (
              <span>
                <span className="text-accent">$</span>{" "}
                <span className="text-white light:text-os-surface">{line.text}</span>
              </span>
            ) : (
              <span className="text-os-muted">{line.text}</span>
            )}
          </div>
        ))}

        {!done && activeLine && (
          <div className={activeLine.kind === "command" ? "mt-3 first:mt-0" : ""}>
            {activeLine.kind === "command" ? (
              <span>
                <span className="text-accent">$</span>{" "}
                <span className="text-white light:text-os-surface">{currentText}</span>
              </span>
            ) : (
              <span className="text-os-muted">{currentText}</span>
            )}
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent align-middle"
            />
          </div>
        )}

        {done && (
          <div className="mt-3 flex items-center">
            <span className="text-accent">$</span>
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="ml-2 inline-block h-[1em] w-[7px] bg-accent"
            />
          </div>
        )}
      </div>
    </div>
  );
}
