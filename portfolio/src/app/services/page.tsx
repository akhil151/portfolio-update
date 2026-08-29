"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { services } from "@/config/content";

const customEase: [number, number, number, number] = [0.11, 0.82, 0.39, 0.92];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tagContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const tagItemVariants: Variants = {
    initial: { y: "-100%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: customEase },
    },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  return (
    <section className="w-full bg-(--bg-color) flex flex-col items-center justify-between py-12 lg:py-16 overflow-hidden">
      <header className="w-full px-6 lg:px-12 pb-8">
        <h2 className="text-black text-[14vw] sm:text-[10vw] lg:text-[6.5rem] sofiaBold uppercase leading-[0.88] tracking-[-0.04em] text-left">
          SERVICES
        </h2>
      </header>

      <div className="w-full h-auto lg:h-[55vh] lg:min-h-[480px] lg:max-h-[620px] flex flex-col lg:flex-row lg:overflow-hidden border-b border-black">
        {services.map((field, i) => {
          const isHovered = hovered === i;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => !isMobile && setHovered(i)}
              onMouseLeave={() => !isMobile && setHovered(null)}
              onClick={() => {
                if (isMobile) {
                  setHovered(isHovered ? null : i);
                }
              }}
              className="
                relative
                w-full lg:w-auto
                min-h-[80px] lg:h-full
                border-black border-b lg:border-b-0 lg:border-r-[0.5px] border-t-[0.5px]
                flex flex-col px-6 lg:px-4
                cursor-pointer bg-(--bg-color) group min-w-0
                overflow-hidden
              "
              animate={{
                flexGrow: isMobile ? 1 : hovered === null ? 1 : isHovered ? 2.5 : 0.75,
                height: isMobile ? (isHovered ? "auto" : "80px") : "100%",
              }}
              style={{ flexBasis: isMobile ? "auto" : 0 }}
              transition={{ duration: 0.6, ease: customEase }}
            >
              <header className="min-h-[80px] lg:h-24 flex items-center justify-between overflow-hidden shrink-0">
                <motion.p
                  animate={{ scale: isHovered ? (isMobile ? 1.3 : 1.8) : 1 }}
                  transition={{ duration: 0.5, ease: customEase }}
                  className="font-bold tracking-tighter text-sm lg:text-lg origin-left whitespace-nowrap sofiaBold"
                >
                  {`00-${i + 1}`}
                </motion.p>

                <div className="overflow-hidden h-fit">
                  <motion.h3
                    animate={{ y: isHovered ? 0 : "100%" }}
                    transition={{ duration: 0.6, ease: customEase }}
                    className="font-bold text-black uppercase tracking-[-1px] lg:tracking-[-2px] text-[1.1rem] sm:text-[1.3rem] lg:text-[2.2rem] sofiaBold"
                  >
                    &nbsp;&nbsp;{field.title}
                  </motion.h3>
                </div>
              </header>

              <div className="relative h-0 lg:h-16 overflow-hidden shrink-0">
                <motion.h3
                  animate={{ y: isHovered ? "-100%" : 0 }}
                  transition={{ duration: 0.6, ease: customEase }}
                  className="hidden lg:block absolute inset-0 font-bold text-black text-2xl lg:text-3xl uppercase tracking-tighter whitespace-nowrap sofiaBold"
                >
                  {field.title}
                </motion.h3>
              </div>

              <div className="grow flex items-start lg:items-center py-6 lg:py-0">
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: isMobile ? 10 : 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    >
                      <motion.ul
                        variants={tagContainerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex-1 flex flex-col gap-1"
                      >
                        {field.tags.map((tag, idx) => (
                          <li key={idx} className="overflow-hidden">
                            <motion.span
                              variants={tagItemVariants}
                              className="block text-base lg:text-xl font-bold uppercase tracking-tight text-black/90 sofiaBold"
                            >
                              / {tag}
                            </motion.span>
                          </li>
                        ))}
                      </motion.ul>

                      <motion.div
                        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0 } }}
                        transition={{
                          duration: 0.6,
                          ease: customEase,
                          delay: 0.1,
                        }}
                        className="w-full lg:w-1/2 relative aspect-video rounded-none overflow-hidden bg-black/5"
                      >
                        <Image
                          fill
                          src={field.img}
                          className="object-contain p-2"
                          alt={field.title}
                          sizes="(max-width: 1024px) 100vw, 350px"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <footer className="h-auto lg:h-24 tracking-tighter flex items-end pb-6 overflow-hidden shrink-0">
                <div className="overflow-hidden w-full">
                  <motion.p
                    initial={{ y: "-100%" }}
                    animate={{ y: isHovered ? "0%" : "-100%" }}
                    transition={
                      isHovered
                        ? { duration: 0.5, ease: customEase, delay: 0.2 }
                        : { duration: 0 }
                    }
                    className="text-gray-600 splineLight text-xs lg:text-sm uppercase leading-relaxed max-w-full lg:max-w-[90%]"
                  >
                    {field.info}
                  </motion.p>
                </div>
              </footer>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
