"use client";

import Project from "@/components/Project";
import { projects } from "@/config/projects";

export default function Works() {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <main className="h-auto lg:h-[400svh] min-h-full w-full bg-(--bg-color) py-10 lg:py-4 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
      <section className="w-full lg:w-1/2 min-h-full lg:h-screen flex flex-col items-center justify-start py-0 lg:py-[20vh]">
        {left.map((p, i) => (
          <Project
            key={p.id}
            src={p.image}
            title={p.title}
            year={p.year}
            summary={p.summary}
            video={p.video}
            link={p.link}
            tags={p.tags}
            className={i === 0 ? "mt-12 lg:mt-[100vh]" : "mt-12 lg:mt-[150vh]"}
          />
        ))}
      </section>

      <section className="w-full lg:w-1/2 min-h-full lg:h-screen flex flex-col items-center justify-start py-0 lg:py-[20vh]">
        {right.map((p, i) => (
          <Project
            key={p.id}
            src={p.image}
            title={p.title}
            year={p.year}
            summary={p.summary}
            video={p.video}
            link={p.link}
            tags={p.tags}
            className={i === 0 ? "mt-12 lg:mt-0" : "mt-12 lg:mt-[150vh]"}
          />
        ))}
      </section>
    </main>
  );
}
