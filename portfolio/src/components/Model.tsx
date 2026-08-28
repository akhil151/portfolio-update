"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { CustomLinkBracket } from "./CustomLink";
import { CyberPhysicalSystem } from "./3d/CyberPhysicalSystem";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Scene3D({
  reducedMotion = false,
  isMobile = false,
}: {
  reducedMotion?: boolean;
  isMobile?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const linkRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      if (reducedMotion) return; // no pin/scrub under reduced motion
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=1200vh",
        pinSpacing: true,
      });

      gsap.set(linkRef.current, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(linkRef.current, "x", { duration: 0.6, ease: "power2.out" });
      const yTo = gsap.quickTo(linkRef.current, "y", { duration: 0.6, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        xTo(x * 0.08);
        yTo(y * 0.08);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${reducedMotion ? "h-[100svh]" : "h-svh"} bg-white overflow-hidden`}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 6.8 : 5.2], fov: 35 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[6, 8, 6]} intensity={2.2} />
          <directionalLight position={[-6, -4, -4]} intensity={1.0} />
          <directionalLight position={[0, 6, -8]} intensity={1.4} />
          <CyberPhysicalSystem triggerRef={containerRef} reducedMotion={reducedMotion} isMobile={isMobile} />
        </Suspense>
      </Canvas>

      <div
        ref={linkRef}
        className="absolute top-1/2 left-1/2 pointer-events-none z-10 w-full flex justify-center"
      >
        <div className="pointer-events-auto scale-75 md:scale-100">
          <CustomLinkBracket name="Explore Systems" url="/works" />
        </div>
      </div>
    </div>
  );
}
