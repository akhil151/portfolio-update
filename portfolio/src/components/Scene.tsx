"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDevice } from "@/hooks/useDevice";

// Defer the heavy three.js + GLB chunk until the section is near the viewport.
const Scene3D = dynamic(() => import("@/components/Model"), {
  ssr: false,
});

function LoaderOverlay() {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white">
      <p className="splineLight uppercase tracking-[0.3em] text-black text-xs lg:text-sm">
        Loading systems · {Math.floor(progress)}%
      </p>
    </div>
  );
}

export default function Scene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { isMobile } = useDevice();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-white">
      {inView ? <Scene3D reducedMotion={reduced} isMobile={isMobile} /> : null}
      <LoaderOverlay />
    </div>
  );
}
