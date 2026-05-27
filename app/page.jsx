import HeroKinetic from "@/components/HeroKinetic";
import PortfolioGrid from "@/components/PortfolioGrid";
import PortfolioBook from "@/components/PortfolioBook";
import CursorMagnetico from "@/components/CursorMagnetico";

export default function Home() {
  return (
    <main className="flex flex-col relative w-full overflow-hidden md:cursor-none">
      <CursorMagnetico />
      <HeroKinetic />
      <PortfolioGrid />
      <section className="w-full flex flex-col items-center justify-center bg-stone-100 py-20 border-t border-stone-300">
        <h2 className="text-xl md:text-2xl font-serif text-blue-950 uppercase tracking-widest mb-10">Mini-Book Catalog</h2>
        <div className="w-full max-w-[300px] md:max-w-[400px]">
          <PortfolioBook />
        </div>
      </section>
    </main>
  );
}