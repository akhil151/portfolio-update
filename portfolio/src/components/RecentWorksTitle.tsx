import TextRipple from "@/animations/TextRipple";

export default function RecentWorksTitle() {
  return (
    <header className="w-full py-12 lg:py-20 flex items-center justify-center overflow-hidden">
      <h1 className="text-[20vw] sm:text-[15vw] lg:text-[10vw] tracking-[-0.05em] leading-[0.88] px-4 py-2 sofiaBold uppercase text-center">
        <TextRipple
          text="RECENT &nbsp; WORKS"
          delayOffset={0.5}
          blur={false}
          duration={0.8}
          scrub={true}
        />
      </h1>
    </header>
  );
}