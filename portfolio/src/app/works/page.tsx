"use client";

import Project from "@/components/Project";
import { projects } from "@/config/projects";

export default function Works() {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="h-auto w-full bg-(--bg-color) py-10 lg:py-16 px-6 lg:px-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column - slightly offset on desktop for staggered editorial feel */}
        <div className="w-full flex flex-col gap-12 lg:gap-20 lg:pt-16">
          {left.map((p) => (
            <Project
              key={p.id}
              src={p.image}
              title={p.title}
              year={p.year}
              summary={p.summary}
              video={p.video}
              link={p.link}
              aspectRatio={p.aspectRatio}
              tags={p.tags}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="w-full flex flex-col gap-12 lg:gap-20">
          {right.map((p) => (
            <Project
              key={p.id}
              src={p.image}
              title={p.title}
              year={p.year}
              summary={p.summary}
              video={p.video}
              link={p.link}
              aspectRatio={p.aspectRatio}
              tags={p.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
