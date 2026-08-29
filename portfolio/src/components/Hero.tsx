import Link from "next/link";
import TextRipple from "@/animations/TextRipple";
import { CustomLinkArrow } from "./CustomLink";
import { Underline } from "./Underline";
import ImageReveal from "@/animations/ImageReveal";
import { site } from "@/config/site";

export default function Hero() {
  const LatestProject = {
    projectName: "AEGIS-CPS",
    linkTitle: "Selected Work",
    url: "/works",
  };

  return (
    <section
      id="hero-section"
      className="min-h-screen w-full flex flex-col items-center justify-between pt-24 lg:pt-32 pb-12 px-6 lg:px-12 relative overflow-hidden"
    >
      {/* Top Header & Location */}
      <div className="w-full flex flex-col items-center justify-start">
        <h1 className="text-[14vw] sm:text-[13vw] lg:text-[11vw] xl:text-[9.5rem] relative z-2 font-black tracking-[-0.04em] lg:tracking-[-0.06em] leading-[0.88] sofiaBold uppercase text-center w-full">
          <TextRipple
            text="AI &nbsp; ENGINEER"
            delayOffset={0.1}
            blur={false}
            duration={0.8}
          />
        </h1>

        <p className="text-black/80 h-fit w-full text-center lg:text-right text-xs lg:text-sm tracking-[3px] sm:tracking-[6px] lg:tracking-[18px] mt-3 lg:mt-1 uppercase splineLight">
          {site.location}
        </p>
      </div>

      {/* Hero Showcase Center Block */}
      <div className="relative mt-8 lg:mt-6 graySecondaryColor h-auto w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-end justify-between p-4 lg:p-8 rounded-none">
        <ul className="w-full lg:w-1/2 flex flex-col items-start justify-end gap-1.5 py-4 lg:py-6 order-2 lg:order-1">
          <li className="text-[1.2rem] lg:text-[1.8rem] text-left leading-none tracking-tighter uppercase sofiaBold">
            / AI &amp; ML
          </li>
          <li className="text-[1.2rem] lg:text-[1.8rem] text-left leading-none tracking-tighter uppercase sofiaBold">
            / Computer Vision
          </li>
          <li className="text-[1.2rem] lg:text-[1.8rem] text-left leading-none tracking-tighter uppercase sofiaBold">
            / Full-Stack Dev.
          </li>
        </ul>

        <figure className="relative z-1 h-72 sm:h-96 lg:h-[22rem] w-full lg:w-72 shrink-0 order-1 lg:order-2 overflow-hidden">
          <ImageReveal
            className="h-full w-full"
            src="/assests/profile/profile 2.jpeg"
            alt={`Portrait of ${site.name}`}
            duration={1.2}
            priority={true}
            easing={[0.11, 0.82, 0.39, 0.92]}
          />
        </figure>
      </div>

      {/* Hero Bottom Row: 3-column structured grid */}
      <div className="w-full max-w-6xl mt-10 lg:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-between">
        {/* Col 1: Bio */}
        <aside className="w-full flex flex-col items-start justify-center">
          <p className="text-xs lg:text-sm uppercase tracking-tight text-left leading-relaxed splineLight text-black/90">
            I engineer AI systems — from edge computer vision to agentic RAG — and ship them as resilient full-stack products.
          </p>
        </aside>

        {/* Col 2: Selected Work */}
        <aside className="w-full flex flex-col items-start justify-start">
          <CustomLinkArrow
            className="text-black text-[0.9rem] lg:text-[1rem] splineLight tracking-tighter leading-none w-35! text-left"
            arrFrom="bottom right"
            arrTo="center center"
            animateUnderline={false}
            name={LatestProject.linkTitle}
            url={LatestProject.url}
          />
          <Link
            href={LatestProject.url}
            className="text-black mt-2 transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-[2.4rem] lg:text-[2.6rem] sofiaBold uppercase tracking-tighter leading-none hover:text-black/60"
          >
            {LatestProject.projectName}
          </Link>
        </aside>

        {/* Col 3: Available for Work */}
        <aside className="w-full flex flex-col items-start justify-start">
          <CustomLinkArrow
            className="text-black text-[0.9rem] lg:text-[1rem] leading-none splineLight tracking-tighter whitespace-nowrap"
            arrFrom="bottom right"
            arrTo="center center"
            animateUnderline={false}
            name="AVAILABLE FOR WORK"
            url="/connect"
          />
          <Link
            href={`mailto:${site.email}`}
            className="transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-black hover:text-[#6f6f6f] text-[1.2rem] sm:text-[1.4rem] lg:text-[1.5rem] sofiaSemiBold tracking-tight leading-none break-all mt-2"
          >
            <Underline lineClassName="bg-black mt-1" className="inline-block">
              {site.email}
            </Underline>
          </Link>
        </aside>
      </div>
    </section>
  );
}
