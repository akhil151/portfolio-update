"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import FallingText from "@/components/FallingText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/animations/TextReveal";
import ImageReveal from "@/animations/ImageReveal";
import { useDevice } from "@/hooks/useDevice";
import { ArrowRight } from "lucide-react";
import { about } from "@/config/content";
import { site } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const fallingTextRef = useRef<HTMLDivElement | null>(null);
  const { isMobile, isDesktop } = useDevice();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      const chars = containerRef.current?.querySelectorAll(".char-span");

      if (chars && chars.length > 0) {
        tl.to(
          chars,
          {
            y: (i: number) => 100 + ((i * 17) % 80),
            x: (i: number) => Math.sin(i * 1.9) * 10,
            rotation: (i: number) => Math.cos(i * 1.5) * 12,
            ease: "power1.in",
            stagger: {
              amount: 0.25,
              from: "random",
            },
            duration: 0.6,
          },
          0
        );
      } else {
        tl.to({}, { duration: 0.5 });
      }

      tl.fromTo(
        infoRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          ease: "cubic-bezier(0.11, 0.82, 0.39, 0.92)",
          duration: 1,
        },
        0.3
      );
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full bg-black text-white sofiaBold">
      {/* Pinned Falling Text & Slide-in Intro */}
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden border-t border-white/10 bg-black"
      >
        <div ref={fallingTextRef} className="absolute inset-0 h-full w-full">
          <div className="h-fit w-full px-6 lg:px-12 pb-2 pt-16 mt-6 lg:mt-0 lg:pt-24 mb-8">
            <ul className="w-full flex items-center justify-between">
              <li className="text-[2.2rem] lg:text-[3.5rem] leading-[0.8] tracking-tight">
                2/5
              </li>
              <li className="text-[0.9rem] lg:text-[1.1rem] leading-[0.8] w-auto lg:w-[34%] uppercase splineLight">
                For Me
              </li>
              <li className="text-[1.3rem] lg:text-[1.8rem] leading-[0.8] tracking-tighter">
                DSGN/2
              </li>
            </ul>
          </div>

          <FallingText
            text={`AI is not just built, <br /> but architected <br /> for systems <br /> and impact.`}
            highlightWords={["is not just built,", "but architected"]}
            trigger="scroll"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.6}
            fontSize={isMobile ? "min(3.2rem, 9.5vw)" : "8.5rem"}
            reset={true}
            className="tracking-[-2px] lg:tracking-[-10px] pb-5 leading-[0.8]! lg:ml-[8%] uppercase flex items-start lg:items-center justify-center gap-0 text-left!"
          />
        </div>

        {/* Sliding Overlay Info */}
        <div
          ref={infoRef}
          className="absolute inset-0 h-full w-full bg-black z-10 flex flex-col items-start justify-between px-6 lg:px-12 py-12"
          style={{ willChange: "transform" }}
        >
          <header className="w-full flex items-center justify-start pt-8">
            <h3 className="tracking-tighter leading-none text-white text-[1.2rem] splineLight uppercase">
              ABOUT ME
            </h3>
          </header>

          <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-4">
            <figure className="w-full sm:w-72 lg:w-80 shrink-0 flex flex-col items-center gap-4">
              <ImageReveal
                className="w-48 sm:w-60 lg:w-64 h-64 sm:h-80 lg:h-84"
                src="/assests/profile/profile.jpeg"
                alt={`Portrait of ${site.name}`}
                delay={0.3}
                duration={1.2}
                easing={[0.11, 0.82, 0.39, 0.92]}
              />
              <TextReveal delay={0.6} once staggerDuration={0.01}>
                <h4 className="tracking-tighter leading-tight text-white text-base lg:text-lg splineLight uppercase text-center">
                  Hello! <br /> I&apos;m {about.introName}
                </h4>
              </TextReveal>
            </figure>

            <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
              <h2 className="w-full flex items-center justify-start gap-2 text-white/50 text-base lg:text-lg splineLight uppercase">
                <span>My Focus</span>
                <ArrowRight
                  className="text-white/50 transform rotate-45"
                  size={20}
                  strokeWidth={1.5}
                />
              </h2>

              <div className="mt-4">
                <TextReveal delay={0.6} repeat staggerDuration={0.01}>
                  <p className="text-white text-left uppercase tracking-tighter leading-tight text-xl sm:text-2xl lg:text-3xl splineRegular w-full">
                    building across machine learning, computer vision, and
                    LLM-based agentic AI — from edge-deployed wildlife detection
                    to enterprise cyber-physical security platforms.
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Details Section (Natural Height) */}
      <section className="h-auto w-full flex flex-col items-start justify-start px-6 lg:px-12 py-16 lg:py-24">
        <hr className="w-full h-px bg-white/20 border-none mb-12" />

        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
          <h2 className="text-white/80 text-[2.2rem] sm:text-[3rem] lg:text-[4rem] uppercase leading-[0.95] splineLight w-full lg:w-[90%]">
            I Don&rsquo;t Just Build <br className="hidden lg:block" /> Models - I Ship Systems, for the Real World.
          </h2>
        </TextReveal>

        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
          <p className="mt-8 lg:mt-6 lg:ml-[25vw] text-white/90 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-left w-full lg:max-w-2xl tracking-tight leading-relaxed">
            My craft is part of my training. As{isDesktop && <br />}a student engineer, I am constantly{isDesktop && <br />}deconstructing problems: how models learn,{isDesktop && <br />}how agents reason, how edges infer,{isDesktop && <br />}and how resilient systems scale.
          </p>
        </TextReveal>

        {/* Blueprint & Approach Row */}
        <div className="w-full h-auto mt-16 lg:mt-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <figure className="h-64 sm:h-80 lg:h-96 w-full lg:w-1/2 flex items-center justify-center relative">
            <div className="relative h-full w-full max-w-md">
              <Image
                src="/about/hardware_working.jpeg"
                alt="Hardware engineering and systems development"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </figure>

          <div className="w-full lg:w-1/2 flex flex-col items-start justify-start gap-6">
            <p className="text-white/50 text-lg splineLight uppercase flex items-center gap-3">
              <span>My Approach</span>
              <ArrowRight className="text-white/50 transform rotate-45" size={22} strokeWidth={1.5} />
            </p>
            <TextReveal delay={0.2} scrub staggerDuration={0.01}>
              <p className="text-white/95 text-base sm:text-lg lg:text-xl splineLight uppercase tracking-tight leading-relaxed">
                I value systems that are explainable and grounded in real data — not demos. Resilient architecture, clear interfaces, and measured results.
              </p>
            </TextReveal>
            <TextReveal delay={0.2} scrub staggerDuration={0.01}>
              <p className="text-white/95 text-base sm:text-lg lg:text-xl splineLight uppercase tracking-tight leading-relaxed">
                Every project is a pipeline I help build end-to-end: from dataset and model to deployment and the people who rely on it.
              </p>
            </TextReveal>
          </div>
        </div>

        {/* Education & Experience Grid */}
        <div className="w-full mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-white/50 text-base splineLight uppercase tracking-tight mb-6 flex items-center gap-2">
              <span>Education</span>
              <ArrowRight className="text-white/50 transform rotate-45" size={18} strokeWidth={1.5} />
            </p>
            <ul className="flex flex-col gap-6">
              {about.education.map((e) => (
                <li key={e.degree + e.years} className="border-t border-white/15 pt-4">
                  <p className="text-white text-lg lg:text-xl splineRegular uppercase tracking-tight leading-none">
                    {e.school}
                  </p>
                  <p className="text-white/70 text-sm splineLight uppercase mt-2">
                    {e.degree} · {e.meta}
                  </p>
                  <p className="text-white/40 text-xs splineLight uppercase mt-1">
                    {e.years}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/50 text-base splineLight uppercase tracking-tight mb-6 flex items-center gap-2">
              <span>Experience</span>
              <ArrowRight className="text-white/50 transform rotate-45" size={18} strokeWidth={1.5} />
            </p>
            <ul className="flex flex-col gap-6">
              {about.experience.map((x) => (
                <li key={x.role + x.year} className="border-t border-white/15 pt-4">
                  <p className="text-white text-lg lg:text-xl splineRegular uppercase tracking-tight leading-none">
                    {x.role} — {x.org}
                  </p>
                  <p className="text-white/70 text-sm splineLight uppercase mt-2">
                    {x.stack}
                  </p>
                  <p className="text-white/40 text-xs splineLight uppercase mt-1">
                    {x.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={`mailto:${site.email}`}
          className="text-white/70 hover:text-white mt-16 text-lg splineLight uppercase flex items-center gap-3 transition-colors"
        >
          <span>Let&apos;s Connect</span>
          <ArrowRight className="transform rotate-45" size={22} strokeWidth={1.5} />
        </Link>
      </section>
    </section>
  );
}
