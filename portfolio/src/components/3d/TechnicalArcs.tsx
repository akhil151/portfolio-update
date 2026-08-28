"use client";
import { useMemo } from "react";
import * as THREE from "three";

export function TechnicalArcs({ radius = 2.1, color = "#2a2a2a", isMobile = false }: {
  radius?: number;
  color?: string;
  isMobile?: boolean;
}) {
  const tickGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = isMobile ? 24 : 48;
    const innerR = radius - 0.08;
    const outerR = radius;
    const majorOuterR = radius + 0.06;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const isMajor = i % 6 === 0;
      const curOuter = isMajor ? majorOuterR : outerR;

      points.push(
        new THREE.Vector3(innerR * cos, innerR * sin, 0),
        new THREE.Vector3(curOuter * cos, curOuter * sin, 0)
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius, isMobile]);

  const arcGeometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius * 1.04, radius * 1.04, 0, Math.PI / 3, false, 0);
    const pts = curve.getPoints(isMobile ? 16 : 32);
    const vec3Pts = pts.map((p) => new THREE.Vector3(p.x, p.y, 0));
    return new THREE.BufferGeometry().setFromPoints(vec3Pts);
  }, [radius, isMobile]);

  const arcGeometry2 = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius * 1.04, radius * 1.04, Math.PI, Math.PI + Math.PI / 3, false, 0);
    const pts = curve.getPoints(isMobile ? 16 : 32);
    const vec3Pts = pts.map((p) => new THREE.Vector3(p.x, p.y, 0));
    return new THREE.BufferGeometry().setFromPoints(vec3Pts);
  }, [radius, isMobile]);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.45,
  }), [color]);

  const accentMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color("#101010"),
    transparent: true,
    opacity: 0.8,
  }), []);

  const tickSegments = useMemo(() => new THREE.LineSegments(tickGeometry, lineMaterial), [tickGeometry, lineMaterial]);
  const arcLine1 = useMemo(() => new THREE.Line(arcGeometry, accentMaterial), [arcGeometry, accentMaterial]);
  const arcLine2 = useMemo(() => new THREE.Line(arcGeometry2, accentMaterial), [arcGeometry2, accentMaterial]);

  return (
    <group>
      <primitive object={tickSegments} />
      <primitive object={arcLine1} />
      <primitive object={arcLine2} />
    </group>
  );
}