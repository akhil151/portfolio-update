"use client";
import { useMemo } from "react";
import * as THREE from "three";

export function DigitalTwinCore({ isMobile = false }: { isMobile?: boolean; }) {
  const facetedFrameMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#181818",
      roughness: 0.25,
      metalness: 0.85,
      flatShading: true,
    });
  }, []);

  const sensorOrbMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#0a0a0a",
      roughness: 0.1,
      metalness: 0.95,
    });
  }, []);

  const collarMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#3a3a3a",
      roughness: 0.3,
      metalness: 0.8,
    });
  }, []);

  const titaniumPinMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#a0a0a0",
      roughness: 0.2,
      metalness: 0.9,
    });
  }, []);

  const statusLedMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#e06b24",
      emissive: "#e06b24",
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.5,
    });
  }, []);

  const octGeometry = useMemo(() => new THREE.OctahedronGeometry(0.58, 0), []);
  const sphereGeometry = useMemo(
    () => new THREE.SphereGeometry(0.38, isMobile ? 16 : 32, isMobile ? 16 : 32),
    [isMobile]
  );
  const collarGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.24, 0.24, 0.85, isMobile ? 16 : 32),
    [isMobile]
  );
  const lensRingGeometry = useMemo(
    () => new THREE.TorusGeometry(0.26, 0.022, 12, isMobile ? 24 : 48),
    [isMobile]
  );
  const pinGeometry = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 0.95, 12), []);
  const ledGeometry = useMemo(() => new THREE.SphereGeometry(0.035, 12, 12), []);

  return (
    <group>
      <mesh geometry={sphereGeometry} material={sensorOrbMat} />
      <mesh geometry={octGeometry} material={facetedFrameMat} />
      <mesh geometry={collarGeometry} material={collarMat} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={lensRingGeometry} material={titaniumPinMat} position={[0, 0, 0.43]} />
      <mesh geometry={lensRingGeometry} material={titaniumPinMat} position={[0, 0, -0.43]} />
      <mesh geometry={pinGeometry} material={titaniumPinMat} />
      <mesh geometry={pinGeometry} material={titaniumPinMat} rotation={[0, 0, Math.PI / 2]} />
      <mesh geometry={ledGeometry} material={statusLedMat} position={[0, 0.32, 0.32]} />
    </group>
  );
}