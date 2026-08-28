"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface GimbalRingsProps {
  isMobile?: boolean;
}

export function GimbalRings({ isMobile = false }: GimbalRingsProps) {
  const darkAnodizedMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#161616",
      roughness: 0.28,
      metalness: 0.85,
    });
  }, []);

  const graphiteRingMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#282828",
      roughness: 0.35,
      metalness: 0.75,
    });
  }, []);

  const titaniumJointMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#999999",
      roughness: 0.2,
      metalness: 0.9,
    });
  }, []);

  const outerTorusGeo = useMemo(
    () => new THREE.TorusGeometry(1.85, 0.038, isMobile ? 12 : 20, isMobile ? 36 : 72),
    [isMobile]
  );
  const midTorusGeo = useMemo(
    () => new THREE.TorusGeometry(1.48, 0.03, isMobile ? 12 : 20, isMobile ? 36 : 72),
    [isMobile]
  );
  const innerTorusGeo = useMemo(
    () => new THREE.TorusGeometry(1.12, 0.024, isMobile ? 12 : 20, isMobile ? 36 : 72),
    [isMobile]
  );

  const jointBlockGeo = useMemo(() => new THREE.BoxGeometry(0.12, 0.12, 0.12), []);
  const jointPinGeo = useMemo(() => new THREE.CylinderGeometry(0.03, 0.03, 0.22, 12), []);

  return (
    <group>
      {/* Outer Gimbal Ring */}
      <group>
        <mesh geometry={outerTorusGeo} material={darkAnodizedMat} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[1.85, 0, 0]} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[-1.85, 0, 0]} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[0, 1.85, 0]} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[0, -1.85, 0]} />
        <mesh geometry={jointPinGeo} material={titaniumJointMat} position={[1.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
        <mesh geometry={jointPinGeo} material={titaniumJointMat} position={[-1.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
      </group>

      {/* Middle Gimbal Ring */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={midTorusGeo} material={graphiteRingMat} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[1.48, 0, 0]} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[-1.48, 0, 0]} />
      </group>

      {/* Inner Gimbal Ring */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh geometry={innerTorusGeo} material={darkAnodizedMat} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[0, 1.12, 0]} />
        <mesh geometry={jointBlockGeo} material={titaniumJointMat} position={[0, -1.12, 0]} />
      </group>
    </group>
  );
}
