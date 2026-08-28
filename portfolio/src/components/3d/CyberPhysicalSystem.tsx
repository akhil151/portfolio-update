"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CoordinateGrid } from "./CoordinateGrid";
import { TechnicalArcs } from "./TechnicalArcs";
import { GimbalRings } from "./GimbalRings";
import { DigitalTwinCore } from "./DigitalTwinCore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CyberPhysicalSystemProps {
  triggerRef: React.RefObject<HTMLDivElement>;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export function CyberPhysicalSystem({
  triggerRef,
  reducedMotion = false,
  isMobile = false,
}: CyberPhysicalSystemProps) {
  const masterGroup = useRef<THREE.Group>(null!);
  const outerGimbalGroup = useRef<THREE.Group>(null!);
  const middleGimbalGroup = useRef<THREE.Group>(null!);
  const innerCoreGroup = useRef<THREE.Group>(null!);
  const latticeGroup = useRef<THREE.Group>(null!);

  const mouseTarget = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      if (!masterGroup.current) return;

      if (reducedMotion) {
        gsap.set(masterGroup.current.rotation, {
          x: Math.PI / 7,
          y: -Math.PI / 5,
          z: 0.05,
        });
        return;
      }

      gsap.set(masterGroup.current.rotation, {
        x: Math.PI / 6,
        y: -0.25,
        z: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=1200vh",
          scrub: 1.2,
        },
      });

      tl.to(
        masterGroup.current.rotation,
        {
          x: -Math.PI * 1.5,
          y: Math.PI * 2,
          ease: "none",
        },
        0
      );

      if (middleGimbalGroup.current) {
        tl.to(
          middleGimbalGroup.current.rotation,
          {
            y: Math.PI * 3.5,
            z: Math.PI,
            ease: "none",
          },
          0
        );
      }

      if (innerCoreGroup.current) {
        tl.to(
          innerCoreGroup.current.rotation,
          {
            x: Math.PI * 2.5,
            z: -Math.PI * 2,
            ease: "none",
          },
          0
        );
      }

      if (latticeGroup.current) {
        tl.to(
          latticeGroup.current.rotation,
          {
            z: -Math.PI * 0.75,
            ease: "none",
          },
          0
        );
      }
    },
    { dependencies: [triggerRef, reducedMotion] }
  );

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const { mouse } = state;
    mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, mouse.x * 0.35, 0.08);
    mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, mouse.y * 0.35, 0.08);

    if (outerGimbalGroup.current) {
      outerGimbalGroup.current.rotation.y = mouseTarget.current.x;
      outerGimbalGroup.current.rotation.x = -mouseTarget.current.y;
    }

    if (innerCoreGroup.current) {
      innerCoreGroup.current.rotation.z += delta * 0.15;
    }
  });

  const scale = isMobile ? 0.62 : 0.95;

  return (
    <group ref={masterGroup} scale={scale}>
      <group ref={outerGimbalGroup}>
        <group ref={latticeGroup}>
          <CoordinateGrid radius={2.25} isMobile={isMobile} />
          <TechnicalArcs radius={2.05} isMobile={isMobile} />
        </group>

        <group ref={middleGimbalGroup}>
          <GimbalRings isMobile={isMobile} />
        </group>

        <group ref={innerCoreGroup}>
          <DigitalTwinCore isMobile={isMobile} />
        </group>
      </group>
    </group>
  );
}
