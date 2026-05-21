import HeroKinetic from "@/components/HeroKinetic";
import StyleShowcase from "@/components/StyleShowcase";
import CursorMagnetico from "@/components/CursorMagnetico";

export default function Home() {
  return (
    <main className="flex flex-col relative w-full overflow-hidden md:cursor-none">
      <CursorMagnetico />
      <HeroKinetic />
      <StyleShowcase />
    </main>
  );
}