"use client";

import React, { useState } from "react";
import { LogoLinkWithBadge } from "@/components/CustomLink";
import Image from "next/image";
import { achievements, certifications } from "@/config/content";
import { codingStats } from "@/config/site";

export default function Achievements() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>(achievements[0].hoverImg);

  const clipPath = isHovered ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
  const transition = "clip-path 0.6s cubic-bezier(0.11, 0.82, 0.39, 0.92)";

  return (
    <section className="relative w-full bg-(--bg-color) flex flex-col items-center justify-start py-8 lg:py-12 overflow-hidden">
      {/* Intro Summary Bar */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 lg:px-12 py-6 gap-6">
        <p className="text-black leading-tight tracking-tight splineLight uppercase text-base lg:text-lg">
          Recognized for <br />
          <span className="text-bold sofiaSemiBold text-xl lg:text-2xl leading-none">
            building and competing in AI &amp; systems
          </span>
        </p>
        <p className="text-black leading-tight tracking-tight splineLight uppercase text-sm lg:text-base text-left lg:text-right">
          <span className="text-bold sofiaSemiBold text-lg lg:text-xl leading-none">
            Student Engineer
          </span>
          <br />
          Sri Eshwar College of Engineering (2024 – 2028)
        </p>
      </div>

      {/* Achievements List & Interactive Hover Preview */}
      <div className="w-full px-6 lg:px-12 py-8 relative flex flex-col lg:flex-row items-start justify-between gap-12">
        <div className="w-full lg:w-3/5 flex flex-col items-start justify-start divide-y divide-black/10 border-y border-black/10">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="w-full"
              onMouseEnter={() => {
                setActiveImage(item.hoverImg);
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <LogoLinkWithBadge
                iconUrl={item.icon}
                badgeNumber={item.badge}
                arrFrom="top right"
                arrTo="center center"
                className="text-black splineRegular text-lg lg:text-2xl w-full py-6"
                gapIntensity={0.35}
                name={item.name}
                url={item.url}
              />
            </div>
          ))}
        </div>

        {/* Hover Image Preview (Desktop Only, cleanly contained) */}
        <div className="hidden lg:flex w-2/5 h-80 sticky top-32 items-center justify-center pointer-events-none">
          <figure
            className="w-64 h-64 overflow-hidden shadow-xl rounded-sm bg-white p-3 border border-black/10 transition-transform duration-500"
            style={{
              clipPath,
              transition,
              transform: isHovered ? "scale(1)" : "scale(0.95)",
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src={activeImage}
                alt="Achievement visual preview"
                fill
                sizes="256px"
                className="object-contain object-center"
              />
            </div>
          </figure>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="w-full px-6 lg:px-12 pb-16 lg:pb-24 mt-12 border-t border-black/10 pt-12">
        <h3 className="text-black text-[2.2rem] lg:text-[3.5rem] uppercase leading-none sofiaBold tracking-tight">
          Certifications
        </h3>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((c) => (
            <li key={c.name + c.year} className="border-t border-black/10 pt-4">
              <p className="text-black text-base lg:text-lg sofiaSemiBold uppercase tracking-tight leading-snug">
                {c.name}
              </p>
              <p className="text-[#6c6c6c] text-xs lg:text-sm splineLight uppercase mt-1.5">
                {c.issuer} · {c.year}
              </p>
            </li>
          ))}
        </ul>

        {/* Coding Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingStats.map((s) => (
            <div key={s.label} className="border border-black/10 rounded-none p-6 bg-white/40">
              <p className="text-[2.5rem] lg:text-[3.5rem] sofiaBold uppercase leading-none tracking-tighter text-black">
                {s.value}
              </p>
              <p className="text-[#6c6c6c] text-xs lg:text-sm splineLight uppercase mt-2">
                {s.label} · {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
