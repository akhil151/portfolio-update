import Image, { StaticImageData } from "next/image";
import { CustomLinkBracket } from "@/components/CustomLink";
import dynamic from "next/dynamic";

const CursorVideoReveal = dynamic(() => import("@/components/CursorVideoReveal"), {
  ssr: false,
});

interface ProjectInterface {
  src: string | StaticImageData;
  video?: string;
  title: string;
  link: string;
  demo?: string;
  tags: string[];
  summary?: string;
  year?: string;
  aspectRatio?: "landscape" | "portrait" | "square" | string;
  className?: string;
}

export default function Project({
  src,
  title,
  link,
  tags,
  summary,
  year,
  aspectRatio = "landscape",
  className = "",
  video,
}: ProjectInterface) {
  const isPortrait =
    aspectRatio === "portrait" ||
    (typeof src === "string" && src.includes("elephant"));

  return (
    <article className={`relative w-full flex flex-col items-start justify-start ${className}`}>
      {/* Project Visual / Image Thumbnail */}
      {isPortrait ? (
        <div className="relative w-full bg-black/5 overflow-hidden border border-black/10 flex items-center justify-center py-6 sm:py-8 px-4">
          <div className="relative w-full max-w-[210px] sm:max-w-[240px] lg:max-w-[260px] aspect-[590/1280] rounded-2xl overflow-hidden shadow-md border border-black/15 bg-[#0d1117]">
            <Image
              src={src}
              alt={title}
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 70vw, 25vw"
              priority={false}
            />
            {video ? <CursorVideoReveal videoSrc={video} /> : null}
          </div>
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full bg-black/5 overflow-hidden border border-black/10">
          <Image
            src={src}
            alt={title}
            fill
            className="object-contain object-center p-2 sm:p-3"
            sizes="(max-width: 768px) 100vw, 45vw"
            priority={false}
          />
          {video ? <CursorVideoReveal videoSrc={video} /> : null}
        </div>
      )}

      {/* Project Details */}
      <div className="w-full pt-4 pb-2 flex flex-col gap-3">
        <div className="w-full flex flex-row items-baseline justify-between gap-4 py-1">
          <h2 className="text-2xl sm:text-3xl sofiaBold uppercase tracking-tight text-black flex items-baseline flex-wrap gap-x-2">
            <span>{title}</span>
            {year ? (
              <span className="text-sm splineLight text-[#6c6c6c]">
                {year}
              </span>
            ) : null}
          </h2>
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

        {/* Project Action */}
        <div className="w-full flex items-center pt-2 min-h-[44px]">
          <CustomLinkBracket
            name="GITHUB ↗"
            url={link}
            className="text-sm sm:text-base text-black cursor-pointer"
          />
        </div>
      </div>
    </article>
  );
}
