import Link from 'next/link';

export default function DemoLayout({ children, title, year }) {
  return (
    <main className="min-h-screen relative">
      {/* Botón Volver — flotante sobre la demo */}
      <Link href="/#catalogo"
        className="fixed top-6 left-6 z-[60] px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-mono tracking-[0.2em] uppercase rounded-full hover:bg-black/70 transition-all">
        ← Volver
      </Link>

      {/* Demo a pantalla completa */}
      {children}
    </main>
  );
}
