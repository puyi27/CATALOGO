import HeroKinetic from "@/components/HeroKinetic";
import PortfolioBook from "@/components/PortfolioBook";
import CursorMagnetico from "@/components/CursorMagnetico";

export default function Home() {
  return (
    <main className="flex flex-col relative w-full overflow-hidden md:cursor-none">
      <CursorMagnetico />
      <HeroKinetic />
      <PortfolioBook />
    </main>
  );
}