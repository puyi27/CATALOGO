import HeroKinetic from "@/components/HeroKinetic";
import PortfolioGrid from "@/components/PortfolioGrid";
import CursorMagnetico from "@/components/CursorMagnetico";

export default function Home() {
  return (
    <main className="flex flex-col relative w-full overflow-hidden md:cursor-none">
      <CursorMagnetico />
      <HeroKinetic />
      <PortfolioGrid />
    </main>
  );
}