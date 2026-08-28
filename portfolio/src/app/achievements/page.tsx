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
  const transition = "clip-path 0.8s cubic-bezier(0.11, 0.82, 0.39, 0.92)";

  return (
    <main className="min-h-screen relative h-fit w-full bg-(--bg-color) flex flex-col items-center justify-start overflow-x-hidden">
      <section className="w-full h-auto lg:h-[25svh] flex flex-col items-start lg:items-end justify-between px-6 lg:px-0 py-10 lg:py-0">
        <p className="text-black leading-none tracking-tighter splineLight uppercase text-lg lg:text-xl lg:pr-[45%] mb-8 lg:mb-0">
          Recognized for <br />{" "}
          <span className="text-bold sofiaSemiBold text-xl lg:text-2xl leading-[0.80]">
            &nbsp;building and competing <br /> in AI &amp; systems
          </span>
        </p>
        <p className="text-black leading-none tracking-[-0.08rem] splineLight uppercase text-lg lg:text-xl lg:pr-8">
          <span className="text-bold sofiaSemiBold text-xl lg:text-2xl leading-[0.80] indent-1">
            Student Engineer
          </span>{" "}
          <br />
          Sri Eshwar College of Engineering <br />
          (2024 – 2028)
        </p>
      </section>

      <div className="w-full h-auto lg:h-[90svh] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-8 py-10 mt-10">
        <div className="w-full lg:w-[30%] h-full flex flex-col items-start justify-start">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="w-full"
              onMouseEnter={() => {
                setActiveImage(item.hoverImg);
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setActiveImage(item.hoverImg);
                  setIsHovered((v) => !v);
                }
              }}
            >
              <LogoLinkWithBadge
                iconUrl={item.icon}
                badgeNumber={item.badge}
                arrFrom="top right"
                arrTo="center center"
                className={`text-black! splineRegular text-xl lg:text-2xl! w-full pt-8`}
                gapIntensity={0.35}
                name={item.name}
                url={item.url}
              />
            </div>
          ))}
        </div>
      </div>

      <figure
        className="bg-transparent fixed lg:absolute top-1/2 lg:top-[45%] left-50 -translate-x-1/2 lg:translate-y-0 h-48 w-48 lg:h-48 lg:w-48 overflow-hidden pointer-events-none z-50 shadow-2xl rounded-lg"
        style={{ clipPath, transition }}
      >
        <div className="relative h-full w-full">
          <Image
            src={activeImage}
            alt="Achievement visual"
            fill
            sizes="(max-width: 1024px) 192px, 192px"
            priority
            className="object-contain object-center"
            style={{
              transform: isHovered ? "scale(1)" : "scale(1.05)",
              transition: "transform 1.2s cubic-bezier(0.11, 0.82, 0.39, 0.92)",
            }}
          />
        </div>
      </figure>

      <section className="w-full px-6 lg:px-12 pb-24 mt-10">
        <h2 className="text-black text-[2.5rem] lg:text-[4rem] uppercase leading-none splineLight tracking-tight border-t border-black/10 pt-10">
          Certifications
        </h2>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          {certifications.map((c) => (
            <li key={c.name + c.year} className="border-t border-black/10 pt-4">
              <p className="text-black text-[1.1rem] lg:text-[1.3rem] sofiaSemiBold uppercase tracking-tighter leading-none">
                {c.name}
              </p>
              <p className="text-[#6c6c6c] text-[0.9rem] splineLight uppercase mt-2">
                {c.issuer} · {c.year}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col md:flex-row gap-6">
          {codingStats.map((s) => (
            <div key={s.label} className="flex-1 border border-black/10 rounded-sm p-6">
              <p className="text-[2.5rem] lg:text-[3.5rem] sofiaBold uppercase leading-none tracking-tighter">
                {s.value}
              </p>
              <p className="text-[#6c6c6c] text-[0.85rem] splineLight uppercase mt-2">
                {s.label} · {s.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
