import Hero from "@/components/Hero";
import AboutTitle from "@/components/AboutTitle";
import About from "./about/page";
import InfiniteMenu from "@/components/InfiniteMenu";
import RecentWorksTitle from "@/components/RecentWorksTitle";
import Works from "./works/page";
import Services from "./services/page";
import AchievementsTitle from "@/components/AchievementsTitle";
import Achievements from "./achievements/page";
import Connect from "./connect/page";

export default function Home() {
  return (
    <main
      id="home"
      className="bg-(--bg-color) sofiaBold min-h-screen w-full flex flex-col items-start justify-start overflow-x-hidden"
    >
      <Hero />
      <AboutTitle />
      <About />
      <InfiniteMenu />
      <RecentWorksTitle />
      <Works />
      <Services />
      <AchievementsTitle />
      <Achievements />
      <Connect />
    </main>
  );
}