import Image, { StaticImageData } from "next/image";
import { CustomLinkArrow } from "@/components/CustomLink";
import dynamic from "next/dynamic";

// Lazy load heavy component
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
  className,
  video,
}: ProjectInterface) {
  return (
    <div className={`relative w-[90%] h-[58vh] ${className}`}>
      <div className="relative h-[42.5vh] w-full overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority={false}
        />

        {video ? <CursorVideoReveal videoSrc={video} /> : null}
      </div>

      <aside className="h-[calc(58vh-42.5vh)] w-full flex flex-col items-start justify-start">
        <div className="h-[30%] w-full flex flex-row items-start justify-between py-2">
          <h2 className="text-[1.5rem] leading-[0.80] sofiaBold uppercase">
            {title}
            {year ? <span className="text-[1rem] splineLight ml-3 text-[#6c6c6c]">{year}</span> : null}
          </h2>

          <CustomLinkArrow
            className="text-[0.8rem] text-white max-w-28"
            name="Visit Live"
            url={link}
            arrFrom="bottom right"
            arrTo="center center"
            arrSize={18}
          />
        </div>

        {summary ? (
          <p className="text-[#6c6c6c] text-[0.85rem] splineLight leading-snug mt-1 mb-2 line-clamp-4">
            {summary}
          </p>
        ) : null}

        <ul className="w-full h-full text-[#6c6c6c] text-[1rem] flex flex-col items-start justify-center gap-1 splineLight tracking-tighter leading-[0.90]">
          {tags.map((tag, index) => (
            <li key={`${tag}-${index}`} className="uppercase">
              {tag}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
