"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/config/site";
import "./InfiniteMenu.css";

export interface MenuItem {
  image: string;
  link?: string;
  title: string;
  description: string;
}

export const defaultArchiveItems: MenuItem[] = [
  {
    image: "/achievements/creathon.jpeg",
    link: socials.linkedin,
    title: "CREATATHON — 1ST PLACE",
    description: "Web Development · 2026",
  },
  {
    image: "/achievements/projectexpo.jpeg",
    link: socials.linkedin,
    title: "PROJECT EXPO — 1ST PRIZE",
    description: "Design Thinking · 2026",
  },
  {
    image: "/achievements/scifixx.jpeg",
    link: socials.linkedin,
    title: "SCI-FIXX — 3RD PLACE",
    description: "Bug Fixing Competition · 2026",
  },
  {
    image: "/achievements/hackathons/WhatsApp Image 2026-08-28 at 6.54.37 PM.jpeg",
    link: socials.github,
    title: "NATIONAL HACKATHON",
    description: "4+ National Hackathons · 2025",
  },
  {
    image: "/achievements/hackathons/WhatsApp Image 2026-08-28 at 6.54.59 PM.jpeg",
    link: socials.github,
    title: "HACKATHON FINALIST",
    description: "AI & Embedded Systems · 2025",
  },
  {
    image: "/assests/certificates/codex_certificate.jpeg",
    link: socials.linkedin,
    title: "NVIDIA DEEP LEARNING",
    description: "Fundamentals of Deep Learning · 2026",
  },
  {
    image: "/assests/certificates/WhatsApp Image 2026-08-28 at 6.51.24 PM.jpeg",
    link: socials.linkedin,
    title: "MACHINE LEARNING — NPTEL",
    description: "Intro to Machine Learning · 2025",
  },
  {
    image: "/assests/certificates/WhatsApp Image 2026-08-28 at 6.53.10 PM.jpeg",
    link: socials.linkedin,
    title: "CLOUD & DISTRIBUTED SYSTEMS",
    description: "Cloud Infrastructure · 2025",
  },
  {
    image: "/assests/certificates/WhatsApp Image 2026-08-28 at 6.53.43 PM.jpeg",
    link: socials.linkedin,
    title: "DATA STRUCTURES & ALGORITHMS",
    description: "DSA in C++ · 2025",
  },
];

const discVertShaderSource = `#version 300 es
precision highp float;

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.0);
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(0.15, uRotationAxisVelocity.w * 15.0);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis + vec3(0.0001, 0.0, 0.0)));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0.0, abs(strength) - 1.0);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.0);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

    vAlpha = smoothstep(0.2, 1.0, normalize(worldPosition.xyz).z) * 0.9 + 0.1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    float scale = max(imageAspect / containerAspect, containerAspect / imageAspect);

    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;

    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

class Face {
  a: number;
  b: number;
  c: number;
  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

class Vertex {
  position: vec3;
  normal: vec3;
  uv: vec2;
  constructor(x: number, y: number, z: number) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  vertices: Vertex[] = [];
  faces: Face[] = [];

  addVertex(x: number, y: number, z: number) {
    this.vertices.push(new Vertex(x, y, z));
    return this;
  }

  addFace(a: number, b: number, c: number) {
    this.faces.push(new Face(a, b, c));
    return this;
  }

  get lastVertex() {
    return this.vertices[this.vertices.length - 1];
  }

  subdivide(divisions = 1) {
    const midPointCache: Record<string, number> = {};
    let f = this.faces;

    for (let div = 0; div < divisions; ++div) {
      const newFaces = new Array(f.length * 4);

      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);

        const i = ndx * 4;
        newFaces[i + 0] = new Face(face.a, mAB, mCA);
        newFaces[i + 1] = new Face(face.b, mBC, mAB);
        newFaces[i + 2] = new Face(face.c, mCA, mBC);
        newFaces[i + 3] = new Face(mAB, mBC, mCA);
      });

      f = newFaces;
    }

    this.faces = f;
    return this;
  }

  spherize(radius = 1) {
    this.vertices.forEach((vertex) => {
      vec3.normalize(vertex.normal, vertex.position);
      vec3.scale(vertex.position, vertex.normal, radius);
    });
    return this;
  }

  get vertexData() {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.position)));
  }

  get normalData() {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.normal)));
  }

  get uvData() {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.uv)));
  }

  get indexData() {
    return new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c]));
  }

  getMidPoint(ndxA: number, ndxB: number, cache: Record<string, number>) {
    const cacheKey = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {
      return cache[cacheKey];
    }
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[cacheKey] = ndx;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    const v = [
      -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, 0,
      0, -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t,
      t, 0, -1, t, 0, 1, -t, 0, -1, -t, 0, 1
    ];
    for (let i = 0; i < v.length; i += 3) {
      this.addVertex(v[i], v[i + 1], v[i + 2]);
    }
    const f = [
      0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
      1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
      3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
      4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1
    ];
    for (let i = 0; i < f.length; i += 3) {
      this.addFace(f[i], f[i + 1], f[i + 2]);
    }
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 32, radius = 1) {
    super();
    steps = Math.max(4, steps);
    const alpha = (2 * Math.PI) / steps;

    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5;
    this.lastVertex.uv[1] = 0.5;

    for (let i = 0; i < steps; ++i) {
      const x = Math.cos(alpha * i);
      const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5;
      this.lastVertex.uv[1] = y * 0.5 + 0.5;

      if (i > 0) {
        this.addFace(0, i, i + 1);
      }
    }
    this.addFace(0, steps, 1);
  }
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

interface InfiniteMenuProps {
  items?: MenuItem[];
  scale?: number;
  backgroundColor?: string;
}

export default function InfiniteMenu({
  items = defaultArchiveItems,
  scale = 1,
  backgroundColor = "#f7f7f7",
}: InfiniteMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const handleActiveIndexChange = useCallback((idx: number) => {
    if (activeIndexRef.current !== idx) {
      activeIndexRef.current = idx;
      setActiveItemIndex(idx);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, discVertShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, discFragShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    gl.useProgram(program);

    // Uniform Locations
    const uWorldMatrixLoc = gl.getUniformLocation(program, "uWorldMatrix");
    const uViewMatrixLoc = gl.getUniformLocation(program, "uViewMatrix");
    const uProjectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
    const uRotationAxisVelocityLoc = gl.getUniformLocation(program, "uRotationAxisVelocity");
    const uItemCountLoc = gl.getUniformLocation(program, "uItemCount");
    const uAtlasSizeLoc = gl.getUniformLocation(program, "uAtlasSize");

    const sphereGeometry = new IcosahedronGeometry();
    sphereGeometry.subdivide(1).spherize(1.6);

    const discGeometry = new DiscGeometry(32, 0.42 * scale);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Disc Vertex Buffer (Positions)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, discGeometry.vertexData, gl.STATIC_DRAW);
    const aModelPositionLoc = gl.getAttribLocation(program, "aModelPosition");
    gl.enableVertexAttribArray(aModelPositionLoc);
    gl.vertexAttribPointer(aModelPositionLoc, 3, gl.FLOAT, false, 0, 0);

    // Disc UV Buffer
    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, discGeometry.uvData, gl.STATIC_DRAW);
    const aModelUvsLoc = gl.getAttribLocation(program, "aModelUvs");
    gl.enableVertexAttribArray(aModelUvsLoc);
    gl.vertexAttribPointer(aModelUvsLoc, 2, gl.FLOAT, false, 0, 0);

    // Disc Indices
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, discGeometry.indexData, gl.STATIC_DRAW);

    // Instance Matrices for each disc on the sphere
    const instanceCount = sphereGeometry.vertices.length;
    const instanceMatrices = new Float32Array(instanceCount * 16);
    const instanceNormals: vec3[] = [];

    sphereGeometry.vertices.forEach((vertex, i) => {
      const normal = vec3.clone(vertex.normal);
      const position = vec3.clone(vertex.position);
      instanceNormals.push(normal);

      const matrix = mat4.create();
      const target = vec3.create();
      vec3.add(target, position, normal);

      const up = vec3.fromValues(0, 1, 0);
      if (Math.abs(vec3.dot(normal, up)) > 0.95) {
        vec3.set(up, 1, 0, 0);
      }

      mat4.targetTo(matrix, position, target, up);
      instanceMatrices.set(matrix, i * 16);
    });

    const instanceMatrixBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceMatrixBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, instanceMatrices, gl.STATIC_DRAW);

    const aInstanceMatrixLoc = gl.getAttribLocation(program, "aInstanceMatrix");
    for (let col = 0; col < 4; col++) {
      const loc = aInstanceMatrixLoc + col;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 64, col * 16);
      gl.vertexAttribDivisor(loc, 1);
    }

    // Build Texture Atlas
    const itemCount = items.length;
    const atlasSize = Math.ceil(Math.sqrt(itemCount));
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const atlasCanvas = document.createElement("canvas");
    const atlasDim = 2048;
    atlasCanvas.width = atlasDim;
    atlasCanvas.height = atlasDim;
    const ctx = atlasCanvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, atlasDim, atlasDim);
    }

    let loadedImages = 0;
    items.forEach((item, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.image;
      img.onload = () => {
        if (!ctx) return;
        const cellW = atlasDim / atlasSize;
        const cellH = atlasDim / atlasSize;
        const cellX = (index % atlasSize) * cellW;
        const cellY = Math.floor(index / atlasSize) * cellH;

        // Cover fit into square cell
        const imgAspect = img.width / img.height;
        let dw = cellW;
        let dh = cellH;
        let dx = cellX;
        let dy = cellY;

        if (imgAspect > 1) {
          dw = cellH * imgAspect;
          dx = cellX - (dw - cellW) / 2;
        } else {
          dh = cellW / imgAspect;
          dy = cellY - (dh - cellH) / 2;
        }

        ctx.save();
        ctx.beginPath();
        ctx.rect(cellX, cellY, cellW, cellH);
        ctx.clip();
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.restore();

        loadedImages++;
        if (loadedImages === items.length) {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
      };
    });

    // GL State
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Matrices
    const worldMatrix = mat4.create();
    const viewMatrix = mat4.create();
    const projectionMatrix = mat4.create();
    const currentQuat = quat.create();

    mat4.lookAt(viewMatrix, vec3.fromValues(0, 0, 4.4), vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));

    // Interaction State
    let isDown = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let angularSpeed = 0;
    const rotationAxis = vec3.fromValues(0, 1, 0);

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      lastX = clientX;
      lastY = clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - lastX;
      const dy = clientY - lastY;

      velocityX = dx * 0.005;
      velocityY = dy * 0.005;

      const deltaQuat = quat.create();
      const axis = vec3.fromValues(dy, dx, 0);
      const angle = vec3.length(axis) * 0.005;

      if (angle > 0.0001) {
        vec3.normalize(axis, axis);
        vec3.copy(rotationAxis, axis);
        quat.setAxisAngle(deltaQuat, axis, angle);
        quat.multiply(currentQuat, deltaQuat, currentQuat);
      }

      lastX = clientX;
      lastY = clientY;
    };

    const onPointerUp = () => {
      isDown = false;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Resize Observer
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width > 0 && height > 0) {
        canvas.width = width * Math.min(window.devicePixelRatio, 2);
        canvas.height = height * Math.min(window.devicePixelRatio, 2);
        gl.viewport(0, 0, canvas.width, canvas.height);

        const aspect = width / height;
        mat4.perspective(projectionMatrix, (38 * Math.PI) / 180, aspect, 0.1, 100);
      }
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    handleResize();

    // Render Loop
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!isDown) {
        // Inertia
        velocityX *= 0.94;
        velocityY *= 0.94;

        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        angularSpeed = speed;

        if (speed > 0.00005) {
          const axis = vec3.fromValues(velocityY, velocityX, 0);
          vec3.normalize(axis, axis);
          vec3.copy(rotationAxis, axis);

          const deltaQuat = quat.create();
          quat.setAxisAngle(deltaQuat, axis, speed * dt * 60);
          quat.multiply(currentQuat, deltaQuat, currentQuat);
        }
      } else {
        angularSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      }

      quat.normalize(currentQuat, currentQuat);
      mat4.fromQuat(worldMatrix, currentQuat);

      // Active Item Calculation: Find disc normal closest to view direction (0, 0, 1)
      let maxZ = -Infinity;
      let closestIndex = 0;

      for (let i = 0; i < instanceCount; i++) {
        const norm = instanceNormals[i];
        const transformedNormal = vec3.create();
        vec3.transformMat4(transformedNormal, norm, worldMatrix);

        if (transformedNormal[2] > maxZ) {
          maxZ = transformedNormal[2];
          closestIndex = i % itemCount;
        }
      }

      handleActiveIndexChange(closestIndex);

      // Clear Canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);

      gl.uniformMatrix4fv(uWorldMatrixLoc, false, worldMatrix);
      gl.uniformMatrix4fv(uViewMatrixLoc, false, viewMatrix);
      gl.uniformMatrix4fv(uProjectionMatrixLoc, false, projectionMatrix);
      gl.uniform4f(uRotationAxisVelocityLoc, rotationAxis[0], rotationAxis[1], rotationAxis[2], angularSpeed);
      gl.uniform1i(uItemCountLoc, itemCount);
      gl.uniform1i(uAtlasSizeLoc, atlasSize);

      gl.bindVertexArray(vao);
      gl.drawElementsInstanced(gl.TRIANGLES, discGeometry.faces.length * 3, gl.UNSIGNED_SHORT, 0, instanceCount);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);

      canvas.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      ro.disconnect();

      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(uvBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteBuffer(instanceMatrixBuffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteVertexArray(vao);
    };
  }, [items, scale, backgroundColor, handleActiveIndexChange]);

  const activeItem = items[activeItemIndex] || items[0];

  return (
    <section
      id="archive"
      className="relative w-full bg-(--bg-color) text-black py-12 lg:py-16 flex flex-col items-center justify-start border-t border-black/10 overflow-hidden"
    >
      {/* Section Header */}
      <header className="w-full px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6">
        <div>
          <p className="text-black/50 text-xs lg:text-sm splineLight uppercase tracking-widest flex items-center gap-2">
            <span>03 / 05</span>
            <span>·</span>
            <span>VISUAL ARCHIVE</span>
          </p>
          <h2 className="text-black text-[12vw] sm:text-[8vw] lg:text-[5rem] sofiaBold uppercase leading-[0.88] tracking-[-0.04em] mt-2">
            Archive &amp; Artifacts
          </h2>
        </div>

        <p className="splineLight text-xs lg:text-sm uppercase tracking-wider text-black/50 hidden sm:block text-right">
          Interactive Sphere · Drag to explore
        </p>
      </header>

      {/* InfiniteMenu WebGL Container */}
      <div
        ref={containerRef}
        data-lenis-prevent="true"
        className="infinite-menu-container h-[480px] sm:h-[540px] lg:h-[600px] max-h-[650px]"
        style={{ backgroundColor }}
      >
        <canvas ref={canvasRef} className="infinite-menu-canvas" />

        {/* Active Item Overlay HUD */}
        {activeItem && (
          <div className="infinite-menu-info">
            <div className="infinite-menu-text">
              <h3 className="infinite-menu-title">{activeItem.title}</h3>
              <p className="infinite-menu-description">{activeItem.description}</p>
            </div>

            {activeItem.link ? (
              <a
                href={activeItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="infinite-menu-action"
                aria-label={`View ${activeItem.title}`}
              >
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
