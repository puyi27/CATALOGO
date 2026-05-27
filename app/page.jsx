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
      <section className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#050505] to-[#111111] py-24 border-t border-white/5 relative z-10">
        <h2 className="text-sm font-mono text-white/50 uppercase tracking-[0.3em] mb-12">Mini-Book Catalog</h2>
        <div className="w-full max-w-6xl mx-auto px-4 relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <PortfolioBook />
        </div>
      </section>
    </main>
  );
}