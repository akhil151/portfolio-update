"use client";

import { useState, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import Link from "next/link";
import { CustomLink, CustomLinkBracket } from "./CustomLink";
import TextRipple from "@/animations/TextRipple";
import { Underline } from "@/components/Underline";
import { useDevice } from "@/hooks/useDevice";
import { site, socials, navItems } from "@/config/site";

export default function Footer() {
  const [time, setTime] = useState("");
  const { isMobile } = useDevice();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const swapTransition: Transition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <footer className="w-full bg-(--bg-color) flex flex-col items-center justify-between px-6 lg:px-12 pt-16 pb-8 text-black border-t border-black/10 overflow-hidden">
      {/* Top Section: Direct Contact */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-12 border-b border-black/10">
        <div>
          <p className="splineLight text-xs lg:text-sm uppercase tracking-widest text-black/50 mb-2">
            Direct Line
          </p>
          <Link
            href={site.phoneHref}
            className="transition-all duration-300 text-black text-2xl sm:text-4xl lg:text-5xl sofiaBold leading-tight uppercase hover:text-black/60"
          >
            <Underline lineClassName="bg-black mt-1" className="inline-block">
              {site.phone}
            </Underline>
          </Link>
        </div>

        <div className="text-left lg:text-right">
          <p className="splineLight text-xs lg:text-sm uppercase tracking-widest text-black/50 mb-2">
            Direct Email
          </p>
          <Link
            href={`mailto:${site.email}`}
            className="transition-all duration-300 text-black text-xl sm:text-3xl lg:text-4xl sofiaBold leading-tight hover:text-black/60 break-all"
          >
            <Underline lineClassName="bg-black mt-1" className="inline-block">
              {site.email}
            </Underline>
          </Link>
        </div>
      </div>

      {/* Middle Navigation & Socials Row */}
      <div className="w-full py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-black/10">
        <div className="flex flex-wrap items-center gap-6 lg:gap-10">
          {navItems.map((item) => (
            <CustomLink
              key={item.url}
              name={item.name}
              url={item.url}
              className="text-base lg:text-lg splineRegular text-black w-fit!"
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <CustomLinkBracket
            className="w-24 text-sm lg:text-base text-black"
            name="GitHub"
            url={socials.github}
          />
          <CustomLinkBracket
            className="w-28 text-sm lg:text-base text-black"
            name="LinkedIn"
            url={socials.linkedin}
          />
        </div>
      </div>

      {/* Large Typography Brand Marquee */}
      <div className="w-full py-12 lg:py-16 flex items-center justify-center overflow-hidden">
        {isMobile ? (
          <h1 className="text-[20vw] text-black leading-[0.85] sofiaBold tracking-[-0.05em] uppercase flex flex-col items-center text-center">
            <TextRipple
              reverse
              text="AKHILESH"
              className="block"
              delayOffset={0.3}
              blur={false}
              duration={0.8}
              scrub={true}
            />
            <TextRipple
              reverse
              text="M P"
              className="block"
              delayOffset={0.5}
              blur={false}
              duration={0.8}
              scrub={true}
            />
          </h1>
        ) : (
          <h1 className="text-[14vw] text-black leading-[0.88] sofiaBold tracking-[-0.06em] uppercase whitespace-nowrap text-center">
            <TextRipple
              reverse
              text="AKHILESH M P"
              delayOffset={0.5}
              blur={false}
              duration={0.8}
              scrub={true}
            />
          </h1>
        )}
      </div>

      {/* Bottom Meta & Copyright Bar */}
      <div className="w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs splineLight text-black/60 border-t border-black/10">
        <p className="uppercase tracking-tight text-center sm:text-left">
          {site.location} &nbsp;|&nbsp; IST &nbsp;|&nbsp; {time || "00:00 AM"}
        </p>

        <motion.p
          initial="initial"
          whileHover="hover"
          className="flex items-center justify-center uppercase splineRegular text-xs tracking-tight cursor-default"
        >
          <span className="whitespace-pre">Ref - </span>
          <span className="relative inline-grid overflow-hidden h-[1.2em]">
            <motion.span
              style={{ gridArea: "1 / 1" }}
              variants={{ initial: { y: 0 }, hover: { y: "-100%" } }}
              transition={swapTransition}
            >
              PORT
            </motion.span>
            <motion.span
              style={{ gridArea: "1 / 1" }}
              className="whitespace-nowrap"
              variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
              transition={swapTransition}
            >
              Portfolio
            </motion.span>
          </span>
        </motion.p>

        <p className="text-center sm:text-right">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
