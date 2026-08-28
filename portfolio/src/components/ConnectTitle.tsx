import TextRipple from "@/animations/TextRipple";

export default function ConnectTitle() {
  return (
    <header className="w-full py-8 lg:py-12 flex flex-col px-4 items-center justify-center overflow-hidden">
      <p className="leading-tight sofiaSemiBold tracking-tight text-lg lg:text-xl py-2 uppercase text-center text-black/60">
        LET&apos;S START THE CONVERSATION
      </p>

      <h1 className="text-[14vw] sm:text-[10vw] lg:text-[6.5vw] leading-[0.88] px-4 pt-1 pb-2 sofiaBold tracking-[-0.04em] uppercase text-center">
        <TextRipple
          text="Great &nbsp; Work"
          delayOffset={0.5}
          blur={false}
          duration={0.8}
          scrub={true}
        />
      </h1>

      <p className="leading-tight splineRegular tracking-[0.3rem] lg:tracking-[0.8rem] py-2 text-xs lg:text-sm uppercase text-center text-black/50">
        Starts With
      </p>

      <h1 className="text-[14vw] sm:text-[10vw] lg:text-[6.5vw] leading-[0.88] px-4 pt-1 sofiaBold tracking-[-0.04em] uppercase text-center">
        <TextRipple
          text="Great &nbsp; Collabs"
          delayOffset={0.6}
          blur={false}
          duration={0.8}
          scrub={true}
        />
      </h1>
    </header>
  );
}