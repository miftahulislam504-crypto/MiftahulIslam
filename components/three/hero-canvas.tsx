"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { HeroScene } from "./hero-scene";

export function HeroCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    // Walk up to the actual hero <section> so visibility reflects the whole
    // hero, not just this absolutely-positioned wrapper div.
    const target = el.closest("section") ?? el;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        className="!absolute inset-0"
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]} // cap device pixel ratio — avoids full-res render on high-DPI displays
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={inView ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
