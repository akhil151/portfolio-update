import Link from "next/dist/client/link";
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
    <section id='hero-section' className="h-auto min-h-screen lg:h-[170svh] w-full flex flex-col items-center justify-start px-4 lg:px-0">
      <h1 className="text-[12vw] lg:text-[13.85rem] relative z-2 lg:whitespace-nowrap! font-black tracking-[-0.2rem] lg:tracking-[-1.2rem] leading-[0.95] lg:leading-[0.90] sofiaBold mt-40 lg:mt-35 uppercase text-center lg:text-left">
        <TextRipple
          text="AI &nbsp; engineer"
          delayOffset={0.1}
          blur={false}
          duration={0.8}
        />
      </h1>

      <p className="text-black h-fit w-full text-center lg:text-right text-xs lg:text-md tracking-[8px] lg:tracking-[22px] mt-2 lg:-mt-3 uppercase">
        {site.location}
      </p>

      <div className="relative mt-10 lg:mt-0 lg:top-[1.5%] graySecondaryColor h-auto lg:h-[28%] w-full lg:w-[40%] flex flex-col lg:block">
        <figure className="relative lg:absolute lg:bottom-[6%] lg:left-[40%] z-1 h-[50vh] lg:h-100 w-full lg:w-[20rem]">
          <ImageReveal
            className="h-full w-full"
            src="/profile.jpg"
            alt={`Portrait of ${site.name}`}
            duration={1.2}
            easing={[0.11, 0.82, 0.39, 0.92]}
          />
        </figure>

        <ul className="relative lg:absolute left-0 lg:bottom-[6%] h-auto lg:h-[80%] w-full lg:w-[39.5%] flex flex-col items-center lg:items-start justify-end gap-1 p-2 py-6">
          <li className="text-[1.2rem] lg:text-[1.9rem] text-left leading-none tracking-tighter uppercase">/ AI &amp; ML</li>
          <li className="text-[1.2rem] lg:text-[1.9rem] text-left leading-none tracking-tighter uppercase">/ Computer Vision</li>
          <li className="text-[1.2rem] lg:text-[1.9rem] text-left leading-none tracking-tighter uppercase">/ Full-Stack Dev.</li>
        </ul>
      </div>

      <aside className="relative mt-30 lg:mt-0 lg:top-7 h-auto lg:h-[12%] w-full lg:w-[28%] flex items-center justify-center gap-4 px-4">
        <p className="text-sm lg:text-md uppercase tracking-tight text-center leading-[1.3] lg:leading-[1.1] splineLight">
          I engineer AI systems — from edge computer vision to agentic RAG — and ship them as resilient full-stack products.
        </p>
      </aside>

      <aside className="relative flex flex-col items-end lg:items-start justify-between lg:justify-start p-2 mt-30 lg:mt-0 lg:top-7 lg:left-[50%] lg:-translate-x-[50%] h-fit w-full lg:w-[17%]">
        <CustomLinkArrow className="text-white! lg:text-black! text-[1rem] lg:text-[1.2rem] indent-14 splineLight tracking-tighter leading-none w-35! text-left" arrFrom="bottom right" arrTo="center center" animateUnderline={false} name={LatestProject.linkTitle} url={LatestProject.url} />
        <Link href={LatestProject.url} className="text-black pr-4 indent-2 mt-4 transition-all duration-300 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] text-[3.6rem] lg:text-[3rem] uppercase tracking-tighter leading-none">
          {LatestProject.projectName}
        </Link>
      </aside>

      <aside className="relative flex flex-col items-start lg:items-start justify-start py-2 mt-10 lg:mt-0 lg:top-7 lg:left-[-32.5%] lg:-translate-x-[50%] h-fit w-full lg:w-[17%]">
        <CustomLinkArrow className="text-white! lg:text-black! text-right w-70! text-[1rem] lg:text-[1.2rem] leading-none splineLight tracking-tighter whitespace-nowrap" arrFrom="bottom right" arrTo="center center" animateUnderline={false} name="AVAILABLE FOR WORK" url="/connect" />
        <Link href={site.email} className="transition-all duration-300 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] text-black hover:text-[#6f6f6f] text-[1.6rem] sm:text-[1.8rem] lg:text-[2.2rem] sofiaSemiBold indent-8 lg:indent-19 tracking-tight leading-none break-all lg:break-normal text-center lg:text-left">
          <Underline lineClassName="bg-black mt-2 lg:mt-8" className="inline-block">
            {site.email}
          </Underline>
        </Link>
      </aside>
    </section>
  );
}
