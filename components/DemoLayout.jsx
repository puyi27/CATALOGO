import Link from 'next/link';

export default function DemoLayout({ children, title, year }) {
  return (
    <main className="min-h-screen bg-stone-50 text-blue-950 selection:bg-blue-950 selection:text-stone-50">
      {/* Navegación Minimalista */}
      <nav className="fixed top-0 w-full p-6 md:p-12 flex justify-between items-center z-50 mix-blend-difference text-white">
        <Link href="/#catalogo" className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase hover:opacity-50 transition-opacity">
          [ Volver al Libro ]
        </Link>
        <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">{year || '2026'}</span>
      </nav>

      {/* Cabecera Editorial */}
      <header className="pt-40 pb-20 px-8 md:px-24 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-[0.85] mb-6">
          {title}
        </h1>
        <div className="h-[1px] w-full bg-blue-950/20 mt-12"></div>
      </header>

      {/* Contenedor de la Demo con Padding Extremo */}
      <section className="px-8 md:px-24 pb-32 max-w-7xl mx-auto">
        {/* Aquí se inyecta el contenido de tu demo. 
          Al estar envuelto aquí, hereda el fondo y los límites perfectos.
        */}
        <div className="demo-content-wrapper">
          {children}
        </div>
      </section>
    </main>
  );
}
