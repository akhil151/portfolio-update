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
  const containerRef = useRef(null);
  const infoRef = useRef(null);
  const fallingTextRef = useRef(null);
  const { isMobile, isDesktop } = useDevice();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to({}, { duration: 1 });

    tl.fromTo(
      infoRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        ease: "cubic-bezier(0.11, 0.82, 0.39, 0.92)",
        duration: 1,
      }
    );
  }, { scope: containerRef });

  return (
    <main className="w-full bg-black text-white sofiaBold">
      <section
        ref={containerRef}
        className="relative w-full max-h-screen h-screen overflow-hidden border-t border-white/10 bg-black"
      >
        <div ref={fallingTextRef} className="absolute inset-0 h-[75vh] w-full">
          <section className="h-fit w-full px-6 lg:px-12 pb-2 pt-16 mt-6 lg:mt-0 lg:pt-24 mb-12">
            <ul className="w-full flex items-center justify-between">
              <li className="text-[2.2rem] lg:text-[3.5rem] leading-[0.8] tracking-tight"> 2/5 </li>
              <li className="text-[0.9rem] lg:text-[1.1rem] leading-[0.8] w-auto lg:w-[34%] uppercase splineLight"> For Me </li>
              <li className="text-[1.3rem] lg:text-[1.8rem] leading-[0.8] tracking-tighter"> DSGN/2 </li>
            </ul>
          </section>

          <FallingText
            text={`AI is not just built, <br /> but architected <br /> for systems <br /> and impact.`}
            highlightWords={["is not just built,", "but architected"]}
            trigger="scroll"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.6}
            fontSize={isMobile ? "3.2rem" : "8.5rem"}
            reset={true}
            className="tracking-[-2px] lg:tracking-[-10px] pb-5 leading-[0.8]! lg:ml-[8%] uppercase flex items-start lg:items-center justify-center gap-0 text-left!"
          />
        </div>
        <div
          ref={infoRef}
          className="absolute inset-0 h-svh w-full bg-black z-10 flex flex-col items-start justify-start px-6 lg:px-12 text-center"
          style={{ willChange: "transform" }}
        >
          <div className="h-screen w-full flex flex-col items-center justify-between">
            <header className="w-full min-h-[6vh]! mt-[11vh] flex items-center justify-start">
              <h3 className="tracking-tighter leading-[0.80] text-white text-[1.2rem] splineLight uppercase">
                ABOUT ME
              </h3>
            </header>

            <section className="w-full h-[calc(100%-12vh)] flex flex-col lg:block">
              <figure className="w-full lg:w-[18vw] h-auto lg:h-[56%] lg:ml-[26vw] mt-8 lg:mt-16 flex flex-col items-center justify-between gap-6">
                <ImageReveal
                  className="w-[70vw] lg:w-full h-[40vh] lg:h-[60vh]"
                  src="/profile.jpg"
                  alt={`Portrait of ${site.name}`}
                  delay={0.5}
                  duration={1.4}
                  easing={[0.11, 0.82, 0.39, 0.92]}
                />
                <TextReveal delay={0.8} once staggerDuration={0.01}>
                  <h4 className="tracking-tighter leading-[1.1] text-white text-[1.1rem] lg:text-[1.25rem] splineLight uppercase">
                    Hello! <br /> I&apos;m {about.introName}
                  </h4>
                </TextReveal>
              </figure>

              <div className="w-full lg:w-[60%] h-fit lg:h-[16vh] mt-10 lg:mt-16 lg:ml-[26vw]">
                <h2 className="h-fit lg:h-[20%] w-full flex flex-col items-center lg:items-start justify-between">
                  <p className="text-white/50 h-fit w-fit lg:w-[12vw] text-[1.15rem] splineLight uppercase flex flex-row items-center justify-between gap-2">
                    My Focus
                    <ArrowRight
                      className="text-white/50 transform rotate-45"
                      size={23}
                      strokeWidth={1.5}
                    />
                  </p>
                </h2>

                <div className="h-auto lg:h-[80%]">
                  <TextReveal delay={0.8} repeat staggerDuration={0.01}>
                    <p className="text-white text-center lg:text-left mt-4 uppercase tracking-tighter leading-none! text-[1.25rem] lg:text-[1.5rem] splineRegular w-full ">
                      building across machine learning, computer vision, and
                      LLM-based agentic AI — from edge-deployed wildlife
                      detection to enterprise cyber-physical security platforms.
                    </p>
                  </TextReveal>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="h-auto min-h-[200svh] w-full flex flex-col items-start justify-start px-6 lg:px-12 pb-24">
        <hr className="w-full h-[0.5px] bg-white mt-22 border-rounded" />
        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
          <h2 className="mt-8 lg:mt-[2.2rem] text-white/70 text-[2.5rem] lg:text-[4rem] uppercase leading-none splineLight w-full lg:w-[90%] h-fit">
            I Don&rsquo;t Just Build <br className="hidden lg:block" /> Models - I Ship Systems, for the Real World.
          </h2>
        </TextReveal>
        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
          <p className="mt-8 lg:mt-1 lg:ml-[30vw] text-white/95 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-center lg:text-center w-full lg:w-fit h-fit tracking-tighter leading-[1.2]">
            My craft is part of my training. As{isDesktop && <br />}a student engineer, I am constantly{isDesktop && <br />}deconstructing problems: how models learn,{isDesktop && <br />}how agents reason, how edges infer,{isDesktop && <br />}and how resilient systems scale.
          </p>
        </TextReveal>

        <div className="w-full h-auto lg:h-[60svh] mt-16 lg:mt-25 flex flex-col lg:flex-row items-center justify-between gap-12">
          <figure className="h-[40vh] lg:h-[90%] w-full lg:w-[48vw] flex flex-row items-center justify-center lg:justify-between">
            <div className="relative h-[65%] flex items-center justify-center w-[80vw] lg:w-[30vw] lg:ml-[18vw]">
              <Image
                src="/about/lifestyle.svg"
                alt="Systems blueprint placeholder"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 80vw, 30vw"
              />
            </div>
          </figure>
          <div className="w-full lg:w-[35vw] lg:mt-10 h-auto flex flex-col items-center justify-start gap-8">
            <p className="text-white/50 h-fit w-fit lg:w-[14vw] mt-2 text-[1.3rem] splineLight uppercase flex flex-row items-center justify-between gap-4">
              My Approach
              <ArrowRight className="text-white/50 transform rotate-45" size={25} strokeWidth={1.5} />
            </p>
            <TextReveal delay={0.2} scrub staggerDuration={0.01}>
              <p className="text-white/95 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-center w-full h-fit tracking-tighter leading-[1.2]">
                I value systems that are explainable and grounded in real data — not demos. Resilient architecture, clear interfaces, and measured results.
              </p>
            </TextReveal>
            <TextReveal delay={0.2} scrub staggerDuration={0.01}>
              <p className="text-white/95 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-center w-full h-fit tracking-tighter leading-[1.2]">
                Every project is a pipeline I help build end-to-end: from dataset and model to deployment and the people who rely on it.
              </p>
            </TextReveal>
          </div>
        </div>

        <div className="w-full mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-white/50 text-[1.1rem] splineLight uppercase tracking-tighter mb-6 flex items-center gap-2">
              Education <ArrowRight className="text-white/50 transform rotate-45" size={20} strokeWidth={1.5} />
            </p>
            <ul className="flex flex-col gap-6">
              {about.education.map((e) => (
                <li key={e.degree + e.years} className="border-t border-white/10 pt-4">
                  <p className="text-white text-[1.1rem] lg:text-[1.35rem] splineRegular uppercase tracking-tighter leading-none">
                    {e.school}
                  </p>
                  <p className="text-white/70 text-[0.95rem] splineLight uppercase mt-2">
                    {e.degree} · {e.meta}
                  </p>
                  <p className="text-white/40 text-[0.85rem] splineLight uppercase mt-1">{e.years}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/50 text-[1.1rem] splineLight uppercase tracking-tighter mb-6 flex items-center gap-2">
              Experience <ArrowRight className="text-white/50 transform rotate-45" size={20} strokeWidth={1.5} />
            </p>
            <ul className="flex flex-col gap-6">
              {about.experience.map((x) => (
                <li key={x.role + x.year} className="border-t border-white/10 pt-4">
                  <p className="text-white text-[1.1rem] lg:text-[1.35rem] splineRegular uppercase tracking-tighter leading-none">
                    {x.role} — {x.org}
                  </p>
                  <p className="text-white/70 text-[0.95rem] splineLight uppercase mt-2">{x.stack}</p>
                  <p className="text-white/40 text-[0.85rem] splineLight uppercase mt-1">{x.year}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={site.email}
          className="text-white/50 h-fit w-fit lg:w-[14vw] mt-24 lg:ml-[18.5vw] mx-auto lg:mx-0 text-[1.3rem] splineLight uppercase flex flex-row items-center justify-between gap-4"
        >
          Let&apos;s Connect
          <ArrowRight className="text-white/50 transform rotate-45" size={25} strokeWidth={1.5} />
        </Link>
      </section>
    </main>
  );
}
