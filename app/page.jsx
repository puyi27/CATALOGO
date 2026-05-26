import HeroKinetic from "@/components/HeroKinetic";
import StyleShowcase from "@/components/StyleShowcase";
import TechMuscle from "@/components/TechMuscle";
import OperationalAutomation from "@/components/OperationalAutomation";
import PortfolioGrid from "@/components/PortfolioGrid";
import CursorMagnetico from "@/components/CursorMagnetico";

export default function Home() {
  return (
    <main className="flex flex-col relative w-full overflow-hidden md:cursor-none">
      <CursorMagnetico />
      <HeroKinetic />
      <StyleShowcase />
      <TechMuscle />
      <OperationalAutomation />
      <PortfolioGrid />
    </main>
  );
}