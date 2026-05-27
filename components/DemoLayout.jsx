import Link from 'next/link';

export default function DemoLayout({ children, title, year }) {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden relative bg-black">
      {/* Botón Volver — flotante sobre la demo */}
      <Link href="/#catalogo"
        className="fixed top-6 left-6 z-[60] px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-mono tracking-[0.2em] uppercase rounded-full hover:bg-black/70 transition-all">
        ← Volver
      </Link>

      {/* Demo a pantalla completa */}
      <div className="w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}

