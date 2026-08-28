"use client";
import { useMemo } from "react";
import * as THREE from "three";

export function CoordinateGrid({ radius = 2.25, isMobile = false }: {
  radius?: number;
  isMobile?: boolean;
}) {
  const ringXY = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
    const pts = curve.getPoints(isMobile ? 32 : 64).map((p) => new THREE.Vector3(p.x, p.y, 0));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, isMobile]);

  const ringXZ = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
    const pts = curve.getPoints(isMobile ? 32 : 64).map((p) => new THREE.Vector3(p.x, 0, p.y));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, isMobile]);

  const ringYZ = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
    const pts = curve.getPoints(isMobile ? 32 : 64).map((p) => new THREE.Vector3(0, p.x, p.y));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, isMobile]);

  const axesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const len = radius * 1.15;
    points.push(new THREE.Vector3(-len, 0, 0), new THREE.Vector3(len, 0, 0));
    points.push(new THREE.Vector3(0, -len, 0), new THREE.Vector3(0, len, 0));
    points.push(new THREE.Vector3(0, 0, -len), new THREE.Vector3(0, 0, len));

    const tick = 0.08;
    points.push(new THREE.Vector3(len, -tick, 0), new THREE.Vector3(len, tick, 0));
    points.push(new THREE.Vector3(len, 0, -tick), new THREE.Vector3(len, 0, tick));
    points.push(new THREE.Vector3(-len, -tick, 0), new THREE.Vector3(-len, tick, 0));
    points.push(new THREE.Vector3(-len, 0, -tick), new THREE.Vector3(-len, 0, tick));

    points.push(new THREE.Vector3(-tick, len, 0), new THREE.Vector3(tick, len, 0));
    points.push(new THREE.Vector3(0, len, -tick), new THREE.Vector3(0, len, tick));
    points.push(new THREE.Vector3(-tick, -len, 0), new THREE.Vector3(tick, -len, 0));
    points.push(new THREE.Vector3(0, -len, -tick), new THREE.Vector3(0, -len, tick));

    points.push(new THREE.Vector3(-tick, 0, len), new THREE.Vector3(tick, 0, len));
    points.push(new THREE.Vector3(0, -tick, len), new THREE.Vector3(0, tick, len));
    points.push(new THREE.Vector3(-tick, 0, -len), new THREE.Vector3(tick, 0, -len));
    points.push(new THREE.Vector3(0, -tick, -len), new THREE.Vector3(0, tick, -len));

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  const gridMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color("#666666"),
      transparent: true,
      opacity: 0.35,
    });
  }, []);

  const axesMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color("#181818"),
      transparent: true,
      opacity: 0.65,
    });
  }, []);

  const lineXY = useMemo(() => new THREE.Line(ringXY, gridMaterial), [ringXY, gridMaterial]);
  const lineXZ = useMemo(() => new THREE.Line(ringXZ, gridMaterial), [ringXZ, gridMaterial]);
  const lineYZ = useMemo(() => new THREE.Line(ringYZ, gridMaterial), [ringYZ, gridMaterial]);
  const lineAxes = useMemo(() => new THREE.LineSegments(axesGeometry, axesMaterial), [axesGeometry, axesMaterial]);

  return (
    <group>
      <primitive object={lineXY} />
      <primitive object={lineXZ} />
      <primitive object={lineYZ} />
      <primitive object={lineAxes} />
    </group>
  );
}