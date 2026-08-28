import Image, { StaticImageData } from "next/image";
import { CustomLinkArrow } from "@/components/CustomLink";
import dynamic from "next/dynamic";

const CursorVideoReveal = dynamic(() => import("@/components/CursorVideoReveal"), {
  ssr: false,
});

interface ProjectInterface {
  src: string | StaticImageData;
  video?: string;
  title: string;
  link: string;
  tags: string[];
  summary?: string;
  year?: string;
  className?: string;
}

export default function Project({
  src,
  title,
  link,
  tags,
  summary,
  year,
  className = "",
  video,
}: ProjectInterface) {
  return (
    <article className={`relative w-full flex flex-col items-start justify-start ${className}`}>
      {/* Project Visual / Image Thumbnail */}
      <div className="relative aspect-[16/10] w-full bg-black/5 overflow-hidden border border-black/10">
        <Image
          src={src}
          alt={title}
          fill
          className="object-contain object-center p-2"
          sizes="(max-width: 768px) 100vw, 45vw"
          priority={false}
        />

        {video ? <CursorVideoReveal videoSrc={video} /> : null}
      </div>

      {/* Project Details */}
      <div className="w-full pt-4 pb-2 flex flex-col gap-3">
        <div className="w-full flex flex-row items-baseline justify-between gap-4 py-1">
          <h2 className="text-2xl sm:text-3xl sofiaBold uppercase tracking-tight text-black flex items-baseline">
            <span>{title}</span>
            {year ? (
              <span className="text-sm splineLight ml-3 text-[#6c6c6c]">
                {year}
              </span>
            ) : null}
          </h2>

          <div className="w-28 shrink-0">
            <CustomLinkArrow
              className="text-xs lg:text-sm text-black max-w-28"
              name="Visit Live"
              url={link}
              arrFrom="bottom right"
              arrTo="center center"
              arrSize={16}
            />
          </div>
        </div>

        {summary ? (
          <p className="text-[#555] text-xs sm:text-sm splineLight leading-relaxed line-clamp-3 sm:line-clamp-4">
            {summary}
          </p>
        ) : null}

        <ul className="w-full flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#777] splineLight uppercase tracking-tight pt-1">
          {tags.map((tag, index) => (
            <li key={`${tag}-${index}`} className="flex items-center gap-1.5">
              <span>/</span>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
