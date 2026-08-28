import TextRipple from "@/animations/TextRipple";

export default function AchievementsTitle() {
  return (
    <header className="w-full py-12 lg:py-16 flex bg-(--bg-color) items-center justify-between px-6 lg:px-12 overflow-hidden border-t border-black/10">
      <h1 className="text-[16vw] sm:text-[12vw] lg:text-[7vw] leading-[0.88] sofiaBold tracking-[-0.04em] uppercase text-left">
        <TextRipple
          text="ACHIEVEMENTS"
          delayOffset={0.5}
          blur={false}
          duration={0.8}
          scrub={true}
        />
      </h1>
      <p className="text-xl sm:text-2xl lg:text-3xl sofiaBold leading-none tracking-tighter uppercase text-right">
        DSGN/5
      </p>
    </header>
  );
}