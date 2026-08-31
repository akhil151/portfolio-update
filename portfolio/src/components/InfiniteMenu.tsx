"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { mat4, quat, vec3 } from "gl-matrix";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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
    image: "/assests/archive-normalized/creathon.jpg",
    link: socials.linkedin,
    title: "CREATATHON — 1ST PLACE",
    description: "Web Development · 2024",
  },
  {
    image: "/assests/archive-normalized/projectexpo.jpeg",
    link: socials.linkedin,
    title: "PROJECT EXPO — 1ST PRIZE",
    description: "Design Thinking · 2026",
  },
  {
    image: "/assests/archive-normalized/scifixx.jpg",
    link: socials.linkedin,
    title: "SCI-FIXX — 3RD PLACE",
    description: "Bug Fixing & Web Challenge · 2026",
  },
  {
    image: "/assests/archive-normalized/codex_certificate.jpeg",
    link: socials.github,
    title: "CHATGPT CODEX HACKATHON",
    description: "Web3 Sabha & BlockseBlock · 2026",
  },
  {
    image: "/assests/archive-normalized/workshop_design_and_development.jpeg",
    link: socials.linkedin,
    title: "DESIGN & DEVELOPMENT WORKSHOP",
    description: "Prototype & Process Design · IIC · 2025",
  },
  {
    image: "/assests/archive-normalized/samsang_certificate.jpeg",
    link: socials.linkedin,
    title: "SAMSUNG SOLVE FOR TOMORROW",
    description: "Design Thinking & Innovation · 2026",
  },
  {
    image: "/assests/archive-normalized/nvidia_deep_learning.png",
    link: socials.linkedin,
    title: "NVIDIA DEEP LEARNING",
    description: "Fundamentals of Deep Learning · 2026",
  },
  {
    image: "/assests/archive-normalized/Delotte_DataAnalyst.jpeg",
    link: socials.linkedin,
    title: "DELOITTE DATA ANALYTICS",
    description: "Virtual Job Simulation · Forage · 2026",
  },
  {
    image: "/assests/archive-normalized/nptel_design_thinking.png",
    link: socials.linkedin,
    title: "DESIGN THINKING — NPTEL",
    description: "Elite Certification (80%) · IIT Madras · 2026",
  },
  {
    image: "/assests/archive-normalized/nptel_ml.png",
    link: socials.linkedin,
    title: "MACHINE LEARNING — NPTEL",
    description: "Introduction to Machine Learning · IIT Madras · 2025",
  },
  {
    image: "/assests/archive-normalized/cloud_certificate.png",
    link: socials.linkedin,
    title: "CLOUD COMPUTING WITH AI",
    description: "Course Completion · Unstop · 2025",
  },
  {
    image: "/assests/archive-normalized/Mernstack_intern_certificate.jpeg",
    link: socials.linkedin,
    title: "MERN STACK INTERNSHIP",
    description: "Full-Stack Developer · EduCentro · 2025",
  },
  {
    image: "/assests/archive-normalized/DSA_concept.jpeg",
    link: socials.linkedin,
    title: "DATA STRUCTURES & ARRAYS",
    description: "C Programming · Infosys Springboard · 2025",
  },
];

const discVertShaderSource = `#version 300 es
precision highp float;

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec4 uRotationAxisVelocity;
uniform float uSphereOpenProgress;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in vec3 aInstancePosition;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

void main() {
    // 3D center position of this disc on the rotating sphere
    vec3 centerPos = (uWorldMatrix * vec4(aInstancePosition, 1.0)).xyz;
    vec3 normCenter = normalize(centerPos);

    // Front-facing indicator: 1.0 when facing directly at camera (+Z)
    float facingFront = smoothstep(0.85, 0.995, normCenter.z);

    // Scale dynamics:
    // When resting (uSphereOpenProgress = 0.0): center item is 1.38x (medium focal circle), others scale to 0.0
    // When dragging (uSphereOpenProgress = 1.0): center item is 1.0x, surrounding items are 1.0x on compact 3D sphere
    float selectedScale = mix(1.38, 1.0, uSphereOpenProgress);
    float peripheralScale = mix(0.0, 1.0, uSphereOpenProgress);
    float dynamicScale = mix(peripheralScale, selectedScale, facingFront);

    // Camera-facing / Billboard offset in screen plane (X, Y)
    // Ensures every image ALWAYS faces the camera and NEVER shows its backside
    vec3 localOffset = aModelPosition * dynamicScale;

    // Kinetic elastic stretch distortion on perimeter vertices along angular velocity
    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(0.16, uRotationAxisVelocity.w * 16.0);
        vec3 stretchDir = normalize(vec3(-rotationAxis.y, rotationAxis.x, 0.0) + vec3(0.0001, 0.0001, 0.0));
        vec3 relPos = normalize(localOffset);
        float strength = dot(stretchDir, relPos);
        float invAbsStrength = min(0.0, abs(strength) - 1.0);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.0);
        localOffset += stretchDir * strength * dynamicScale;
    }

    // World position = 3D sphere center + camera-facing billboard offset
    vec3 worldPos = centerPos + localOffset;
    gl_Position = uProjectionMatrix * uViewMatrix * vec4(worldPos, 1.0);

    // Opacity:
    // At rest (uSphereOpenProgress = 0.0): only the selected front item has alpha 1.0; others are 0.0
    // During drag (uSphereOpenProgress = 1.0): full compact 3D sphere with smooth depth fade
    float spatialAlpha = smoothstep(-0.6, 0.85, normCenter.z) * 0.70 + 0.30;
    float peripheralAlpha = mix(0.0, spatialAlpha, uSphereOpenProgress);
    vAlpha = mix(peripheralAlpha, 1.0, facingFront);

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

    // Direct 1:1 cover mapping: image fills the entire circular disc
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;

    vec4 texColor = texture(uTex, st);

    // Clean circular disc clipping & edge anti-aliasing
    float dist = length(vUvs - vec2(0.5));
    float circleMask = 1.0 - smoothstep(0.485, 0.5, dist);

    // Subtle dark border ring for crisp geometry definition
    float ring = smoothstep(0.47, 0.49, dist) * circleMask;
    vec4 finalColor = mix(texColor, vec4(0.0, 0.0, 0.0, 0.25), ring * 0.45);

    outColor = finalColor;
    outColor.a *= vAlpha * circleMask;
}
`;

// Perfect Circular Disc Geometry
class DiscGeometry {
  vertices: number[] = [];
  normals: number[] = [];
  uvs: number[] = [];
  indices: number[] = [];

  constructor(steps = 64, radius = 0.38) {
    const alpha = (2 * Math.PI) / steps;

    // Center vertex
    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 1);
    this.uvs.push(0.5, 0.5);

    // Perimeter vertices
    for (let i = 0; i < steps; ++i) {
      const cosA = Math.cos(alpha * i);
      const sinA = Math.sin(alpha * i);
      this.vertices.push(radius * cosA, radius * sinA, 0);
      this.normals.push(0, 0, 1);
      this.uvs.push(cosA * 0.5 + 0.5, sinA * 0.5 + 0.5);

      if (i > 0) {
        this.indices.push(0, i, i + 1);
      }
    }
    this.indices.push(0, steps, 1);
  }

  get vertexData() {
    return new Float32Array(this.vertices);
  }
  get uvData() {
    return new Float32Array(this.uvs);
  }
  get indexData() {
    return new Uint16Array(this.indices);
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

// Generate genuine 3D Fibonacci Sphere distribution for exactly N items
function generateFibonacciSpherePositions(count: number, radius: number): vec3[] {
  const positions: vec3[] = [];
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

  for (let i = 0; i < count; i++) {
    // y smoothly distributes from +1 (top pole) to -1 (bottom pole)
    const y = 1 - (i / (count - 1)) * 2;
    const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = 2 * Math.PI * i / phi;

    const x = Math.cos(theta) * rAtY;
    const z = Math.sin(theta) * rAtY;

    positions.push(vec3.fromValues(x * radius, y * radius, z * radius));
  }

  return positions;
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

  const navigateToItemRef = useRef<((idx: number) => void) | null>(null);

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
    const uSphereOpenProgressLoc = gl.getUniformLocation(program, "uSphereOpenProgress");
    const uItemCountLoc = gl.getUniformLocation(program, "uItemCount");
    const uAtlasSizeLoc = gl.getUniformLocation(program, "uAtlasSize");

    const itemCount = items.length;
    const sphereRadius = 1.25; // Compact tight 3D sphere radius
    const spherePositions = generateFibonacciSpherePositions(itemCount, sphereRadius);

    // Circular Disc Geometry
    const discGeometry = new DiscGeometry(64, 0.38 * scale);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Vertex Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, discGeometry.vertexData, gl.STATIC_DRAW);
    const aModelPositionLoc = gl.getAttribLocation(program, "aModelPosition");
    gl.enableVertexAttribArray(aModelPositionLoc);
    gl.vertexAttribPointer(aModelPositionLoc, 3, gl.FLOAT, false, 0, 0);

    // UV Buffer
    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, discGeometry.uvData, gl.STATIC_DRAW);
    const aModelUvsLoc = gl.getAttribLocation(program, "aModelUvs");
    gl.enableVertexAttribArray(aModelUvsLoc);
    gl.vertexAttribPointer(aModelUvsLoc, 2, gl.FLOAT, false, 0, 0);

    // Index Buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, discGeometry.indexData, gl.STATIC_DRAW);

    // Instance Positions on the 3D Fibonacci Sphere (1-to-1 unique mapping, no duplicates)
    const instancePositionsArray = new Float32Array(itemCount * 3);
    const instanceNormals: vec3[] = [];

    spherePositions.forEach((pos, i) => {
      instancePositionsArray[i * 3 + 0] = pos[0];
      instancePositionsArray[i * 3 + 1] = pos[1];
      instancePositionsArray[i * 3 + 2] = pos[2];

      const normal = vec3.create();
      vec3.normalize(normal, pos);
      instanceNormals.push(normal);
    });

    const instancePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instancePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, instancePositionsArray, gl.STATIC_DRAW);

    const aInstancePositionLoc = gl.getAttribLocation(program, "aInstancePosition");
    gl.enableVertexAttribArray(aInstancePositionLoc);
    gl.vertexAttribPointer(aInstancePositionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(aInstancePositionLoc, 1);

    // Build Texture Atlas
    const atlasSize = Math.ceil(Math.sqrt(itemCount));
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const atlasCanvas = document.createElement("canvas");
    const atlasDim = 2048;
    atlasCanvas.width = atlasDim;
    atlasCanvas.height = atlasDim;
    const ctx = atlasCanvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, atlasDim, atlasDim);
    }

    const cellW = atlasDim / atlasSize;
    const cellH = atlasDim / atlasSize;

    const updateTexture = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    let loadedImages = 0;
    items.forEach((item, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.image;
      img.onload = () => {
        if (!ctx) return;
        const cellX = (index % atlasSize) * cellW;
        const cellY = Math.floor(index / atlasSize) * cellH;

        // Clean white background for the circular disc cell
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cellX, cellY, cellW, cellH);

        // Aspect-ratio preserving contain logic:
        // Fits the complete original image inside the circular disc boundary (radius 0.485)
        // without any cropping, stretching, distortion, or alteration of original aspect ratio.
        const naturalW = img.naturalWidth || img.width;
        const naturalH = img.naturalHeight || img.height;
        const diag = Math.hypot(naturalW, naturalH);
        const maxCircleDiameter = cellW * 0.88;

        const scaleFactor = Math.min(
          maxCircleDiameter / diag,
          (cellW * 0.90) / naturalW,
          (cellH * 0.90) / naturalH
        );

        const drawW = naturalW * scaleFactor;
        const drawH = naturalH * scaleFactor;
        const drawX = cellX + (cellW - drawW) / 2;
        const drawY = cellY + (cellH - drawH) / 2;

        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();

        loadedImages++;
        updateTexture();
      };

      img.onerror = () => {
        console.warn(`Failed to load archive asset: ${item.image}`);
        loadedImages++;
        if (loadedImages === items.length) {
          updateTexture();
        }
      };
    });

    // GL State
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Initial state: Align item 0's normal to (0, 0, 1) facing the camera
    const currentQuat = quat.create();
    if (instanceNormals.length > 0) {
      quat.rotationTo(currentQuat, instanceNormals[0], vec3.fromValues(0, 0, 1));
    }

    const targetSnapQuat = quat.clone(currentQuat);
    const worldMatrix = mat4.create();
    const viewMatrix = mat4.create();
    const projectionMatrix = mat4.create();

    mat4.lookAt(viewMatrix, vec3.fromValues(0, 0, 3.4), vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));

    // Interaction & State Variables
    let isDown = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let angularSpeed = 0;
    const rotationAxis = vec3.fromValues(0, 1, 0);

    // State A (0.0: Resting) <-> State B (1.0: Compact Dragging Sphere)
    let sphereOpenProgress = 0.0;
    let targetSphereOpen = 0.0;

    // Navigation function
    navigateToItemRef.current = (targetIndex: number) => {
      const idx = ((targetIndex % itemCount) + itemCount) % itemCount;
      const targetNorm = instanceNormals[idx];
      quat.rotationTo(targetSnapQuat, targetNorm, vec3.fromValues(0, 0, 1));
      velocityX = 0;
      velocityY = 0;
      targetSphereOpen = 1.0;
      handleActiveIndexChange(idx);
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      targetSphereOpen = 1.0;
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

      // Multi-directional dragging in any direction (left, right, up, down, diagonal)
      velocityX = dx * 0.0035;
      velocityY = dy * 0.0035;

      const deltaQuat = quat.create();
      const axis = vec3.fromValues(dy, dx, 0);
      const angle = vec3.length(axis) * 0.0038;

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
      if (!isDown) return;
      isDown = false;

      // Identify nearest item to camera (+Z) on release
      let maxZ = -Infinity;
      let closestIdx = 0;

      for (let i = 0; i < itemCount; i++) {
        const tNorm = vec3.create();
        vec3.transformQuat(tNorm, instanceNormals[i], currentQuat);
        if (tNorm[2] > maxZ) {
          maxZ = tNorm[2];
          closestIdx = i;
        }
      }

      quat.rotationTo(targetSnapQuat, instanceNormals[closestIdx], vec3.fromValues(0, 0, 1));
      handleActiveIndexChange(closestIdx);
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
        mat4.perspective(projectionMatrix, (42 * Math.PI) / 180, aspect, 0.1, 100);
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
        // Natural inertia decay
        velocityX *= 0.94;
        velocityY *= 0.94;

        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        angularSpeed = speed;

        if (speed > 0.0004) {
          targetSphereOpen = 1.0;

          // In motion: apply angular velocity
          const axis = vec3.fromValues(velocityY, velocityX, 0);
          vec3.normalize(axis, axis);
          vec3.copy(rotationAxis, axis);

          const deltaQuat = quat.create();
          quat.setAxisAngle(deltaQuat, axis, speed * dt * 60);
          quat.multiply(currentQuat, deltaQuat, currentQuat);

          // Update active item continuously during spin
          let maxZ = -Infinity;
          let closestIdx = 0;
          for (let i = 0; i < itemCount; i++) {
            const tNorm = vec3.create();
            vec3.transformQuat(tNorm, instanceNormals[i], currentQuat);
            if (tNorm[2] > maxZ) {
              maxZ = tNorm[2];
              closestIdx = i;
            }
          }
          quat.rotationTo(targetSnapQuat, instanceNormals[closestIdx], vec3.fromValues(0, 0, 1));
          handleActiveIndexChange(closestIdx);
        } else {
          // Settling phase: smoothly slerp towards target focal alignment
          quat.slerp(currentQuat, currentQuat, targetSnapQuat, 0.08);

          // Once settled, transition sphereOpenProgress back to State A (0.0: One medium circular image)
          targetSphereOpen = 0.0;
        }
      } else {
        angularSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        targetSphereOpen = 1.0;

        // Update active item while dragging
        let maxZ = -Infinity;
        let closestIdx = 0;
        for (let i = 0; i < itemCount; i++) {
          const tNorm = vec3.create();
          vec3.transformQuat(tNorm, instanceNormals[i], currentQuat);
          if (tNorm[2] > maxZ) {
            maxZ = tNorm[2];
            closestIdx = i;
          }
        }
        handleActiveIndexChange(closestIdx);
      }

      // Smoothly interpolate sphereOpenProgress between 0.0 (resting) and 1.0 (dragging/momentum)
      sphereOpenProgress += (targetSphereOpen - sphereOpenProgress) * 0.08;

      quat.normalize(currentQuat, currentQuat);
      mat4.fromQuat(worldMatrix, currentQuat);

      // Clear Canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);

      gl.uniformMatrix4fv(uWorldMatrixLoc, false, worldMatrix);
      gl.uniformMatrix4fv(uViewMatrixLoc, false, viewMatrix);
      gl.uniformMatrix4fv(uProjectionMatrixLoc, false, projectionMatrix);
      gl.uniform4f(uRotationAxisVelocityLoc, rotationAxis[0], rotationAxis[1], rotationAxis[2], angularSpeed);
      gl.uniform1f(uSphereOpenProgressLoc, sphereOpenProgress);
      gl.uniform1i(uItemCountLoc, itemCount);
      gl.uniform1i(uAtlasSizeLoc, atlasSize);

      gl.bindVertexArray(vao);
      gl.drawElementsInstanced(gl.TRIANGLES, discGeometry.indices.length, gl.UNSIGNED_SHORT, 0, itemCount);

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
      gl.deleteBuffer(instancePosBuffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteVertexArray(vao);
    };
  }, [items, scale, backgroundColor, handleActiveIndexChange]);

  const activeItem = items[activeItemIndex] || items[0];

  const handleNext = () => {
    if (navigateToItemRef.current) {
      navigateToItemRef.current(activeItemIndex + 1);
    }
  };

  const handlePrev = () => {
    if (navigateToItemRef.current) {
      navigateToItemRef.current(activeItemIndex - 1);
    }
  };

  return (
    <section
      id="archive"
      className="relative w-full bg-(--bg-color) text-black py-12 lg:py-16 flex flex-col items-center justify-start border-t border-black/10 overflow-hidden"
    >
      {/* Section Header */}
      <header className="w-full px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4">
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

        {/* Navigation Step Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous archive item"
            className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next archive item"
            className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* InfiniteMenu WebGL Interactive Container */}
      <div
        ref={containerRef}
        data-lenis-prevent="true"
        className="infinite-menu-container h-[480px] sm:h-[540px] lg:h-[600px] max-h-[660px]"
        style={{ backgroundColor }}
      >
        <canvas ref={canvasRef} className="infinite-menu-canvas" />

        {/* Drag Affordance Hint */}
        <div className="infinite-menu-drag-hint" aria-hidden="true">
          <span className="infinite-menu-drag-arrow-left">←</span>
          <span>DRAG ME</span>
          <span className="infinite-menu-drag-arrow-right">→</span>
        </div>

        {/* Active Item Overlay HUD */}
        {activeItem && (
          <div className="infinite-menu-info">
            <div className="infinite-menu-text">
              <span className="splineLight text-[0.7rem] sm:text-xs text-black/50 uppercase tracking-widest">
                {String(activeItemIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · Selected Record
              </span>
              <h3 className="infinite-menu-title mt-1">{activeItem.title}</h3>
              <p className="infinite-menu-description">{activeItem.description}</p>
            </div>

            {activeItem.link ? (
              <a
                href={activeItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="infinite-menu-action"
                aria-label={`View record for ${activeItem.title}`}
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
