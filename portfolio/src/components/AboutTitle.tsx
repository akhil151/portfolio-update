import TextRipple from "@/animations/TextRipple";

export default function AboutTitle() {
  return (
    <header className="w-full py-12 lg:py-20 flex items-center justify-center overflow-hidden">
      <h1 className="text-[22vw] sm:text-[18vw] lg:text-[14vw] tracking-[-0.05em] leading-[0.88] px-4 py-2 sofiaBold uppercase text-center">
        <TextRipple
          text="ABOUT &nbsp; ME"
          delayOffset={0.5}
          blur={false}
          duration={0.8}
          scrub={true}
        />
      </h1>
    </header>
  );
}