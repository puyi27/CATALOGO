"use client";

import React, { useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useSpring, useMotionValue, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronLeft, Wheat, Thermometer, Clock, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FlourCanvas = dynamic(() => import('./FlourCanvas'), { ssr: false });

// Organic Typewriter Subtitle
const TypewriterText = ({ text }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.3 * i } })
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } },
    hidden: { opacity: 0, y: 15 }
  };
  
  return (
    <m.div className="flex flex-wrap overflow-hidden font-serif text-[#d4a373] text-sm md:text-xl tracking-widest uppercase italic" variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <m.span variants={child} key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </m.span>
      ))}
    </m.div>
  );
};

// Custom Cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const hoverSpring = useSpring(isHovering, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-grid')) {
        scale.set(3);
        isHovering.set(1);
      } else {
        scale.set(1);
        isHovering.set(0);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, scale, isHovering]);

  return (
    <m.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[#d4a373] pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(212, 163, 115, 0)', 'rgba(212, 163, 115, 0.2)'])
      }}
    />
  );
}

// Product Catalog
const products = [
  { id: 1, name: 'Hogaza de Masa Madre', price: '6.50 €', desc: 'Fermentación lenta de 48h con harinas ecológicas molidas a la piedra.', img: 'https://loremflickr.com/1000/1000/bread,bakery/all?lock=1' },
  { id: 2, name: 'Baguette Rústica', price: '2.20 €', desc: 'Corteza crujiente, alveolado perfecto. Auténtica receta francesa.', img: 'https://loremflickr.com/1000/1000/bread,bakery/all?lock=2' },
  { id: 3, name: 'Croissant A.O.P.', price: '3.00 €', desc: 'Hojaldre invertido con mantequilla de Normandía AOP. Crujido sonoro.', img: 'https://loremflickr.com/1000/1000/bread,bakery/all?lock=3' },
  { id: 4, name: 'Centeno Bío 100%', price: '5.80 €', desc: 'Centeno integral ecológico con semillas tostadas. Alta hidratación.', img: 'https://loremflickr.com/1000/1000/bread,bakery/all?lock=4' }
];

const ProductCard = ({ product }) => (
  <div className="interactive-grid group relative overflow-hidden bg-[#161311] border border-white/5 flex flex-col h-full rounded-2xl cursor-none">
    <div className="relative aspect-[4/5] overflow-hidden">
      <div className="absolute inset-0 bg-[#d4a373]/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-700" />
      <img src={product.img} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#161311] to-transparent z-10" />
    </div>
    <div className="p-8 flex flex-col flex-grow justify-end -mt-20 relative z-20">
      <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{product.name}</h3>
      <p className="text-[#F9F6F0]/60 font-sans font-light text-sm mb-8">{product.desc}</p>
      
      <div className="flex justify-between items-center border-t border-white/10 pt-6">
        <span className="font-mono text-[#d4a373] text-xl">{product.price}</span>
        <button className="text-xs font-mono uppercase tracking-widest text-white hover:text-[#d4a373] transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-[#d4a373]/50">
          Añadir +
        </button>
      </div>
    </div>
  </div>
);

export default function PanaderiaDemo() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.horizontal-panel');
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + scrollWrapperRef.current.offsetWidth
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-[#0a0a0a] text-[#F9F6F0] font-serif selection:bg-[#d4a373] selection:text-black overflow-x-hidden min-h-screen relative">
        
        <CustomCursor />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-grid">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#161311] border border-[#d4a373]/30 backdrop-blur-md text-[#d4a373] hover:bg-[#d4a373] hover:text-[#0a0a0a] transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* TOP BAR */}
        <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
          <div className="font-serif italic text-2xl tracking-widest pointer-events-auto cursor-none">
            Masa Madre & Co.
          </div>
          <div className="font-sans text-xs text-[#d4a373] tracking-widest pointer-events-auto border border-[#d4a373]/20 px-6 py-2 rounded-full uppercase bg-[#0a0a0a]/50 backdrop-blur-md">
            Obrador Artesano
          </div>
        </header>

        {/* HORIZONTAL SCROLL ORCHESTRATION */}
        <div ref={containerRef} className="h-screen w-full overflow-hidden bg-[#0a0a0a]">
          <div ref={scrollWrapperRef} className="flex h-full w-[400vw]">
            
            {/* Panel 1: Hero */}
            <div className="horizontal-panel w-screen h-full flex flex-col justify-center relative px-6 md:px-24 shrink-0 bg-[#0a0a0a]">
              {/* Harina Interactiva */}
              <FlourCanvas />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
              
              <div className="relative z-20 max-w-6xl pointer-events-none">
                <div className="mb-12">
                  <TypewriterText text="Agua. Harina. Sal. Tiempo." />
                </div>
                <h1 className="text-7xl md:text-[11rem] font-light uppercase tracking-tighter text-transparent leading-[0.8] mb-12" style={{ WebkitTextStroke: '1px #F9F6F0' }}>
                  El Arte <br /> <span className="text-[#d4a373] font-black" style={{ WebkitTextStroke: '0px' }}>De la Masa.</span>
                </h1>
                <p className="text-xl md:text-3xl text-zinc-400 max-w-2xl font-serif font-light leading-relaxed italic border-l border-[#d4a373] pl-6 ml-2">
                  Pasa el cursor por el lienzo para sentir la harina virtual. Haz scroll para acompañarnos en el ritual diario de nuestro obrador.
                </p>
              </div>
              
              <div className="absolute bottom-12 left-6 md:left-24 z-20 font-mono text-[10px] tracking-widest uppercase text-[#d4a373] flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#d4a373]" />
                Scroll para amasar
              </div>
            </div>

            {/* Panel 2: Amasado */}
            <div className="horizontal-panel w-screen h-full flex items-center relative px-6 md:px-24 border-l border-white/5 shrink-0 bg-[#120f0d]">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                   <Wheat className="w-8 h-8 text-[#d4a373]" />
                   <span className="font-mono text-[#d4a373] tracking-widest uppercase text-sm">Fase 01 // Autólisis</span>
                </div>
                <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter mb-8 leading-none">
                  Trigo <br/> Salvaje.
                </h2>
                <p className="text-zinc-400 font-serif italic text-xl md:text-3xl leading-relaxed max-w-2xl">
                  Seleccionamos trigos antiguos molidos a la piedra. La primera mezcla descansa, permitiendo que las enzimas despierten el alma del cereal antes de añadir la sal.
                </p>
              </div>
            </div>

            {/* Panel 3: Fermentación */}
            <div className="horizontal-panel w-screen h-full flex items-center relative px-6 md:px-24 border-l border-white/5 shrink-0 bg-[#16120f]">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                   <Clock className="w-8 h-8 text-[#d4a373]" />
                   <span className="font-mono text-[#d4a373] tracking-widest uppercase text-sm">Fase 02 // Reposo en bloque</span>
                </div>
                <h2 className="text-6xl md:text-[8rem] font-light uppercase tracking-tighter mb-8 leading-none">
                  El Tiempo <br/> <span className="font-black text-[#d4a373]">Es Clave.</span>
                </h2>
                <p className="text-zinc-400 font-serif italic text-xl md:text-3xl leading-relaxed max-w-2xl">
                  Hasta 48 horas de fermentación retardada en frío. Desarrollamos perfiles aromáticos complejos, acidez equilibrada y una alta digestibilidad. No hay atajos.
                </p>
              </div>
            </div>

            {/* Panel 4: Horneado */}
            <div className="horizontal-panel w-screen h-full flex items-center justify-end relative px-6 md:px-24 border-l border-white/5 shrink-0 bg-[#1c1613]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,163,115,0.1)_0%,transparent_50%)] pointer-events-none" />
              <div className="max-w-4xl text-right">
                <div className="flex items-center justify-end gap-4 mb-6">
                   <span className="font-mono text-[#d4a373] tracking-widest uppercase text-sm">Fase 03 // Suela de Piedra</span>
                   <Flame className="w-8 h-8 text-[#d4a373]" />
                </div>
                <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter mb-8 text-[#d4a373] leading-none">
                  Fuego & <br/> Corteza.
                </h2>
                <p className="text-zinc-400 font-serif italic text-xl md:text-3xl leading-relaxed max-w-2xl ml-auto">
                  Altas temperaturas y choque de vapor. La expansión final en el horno de leña crea una corteza caramelizada, gruesa y sonora, protegiendo una miga perlada.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* E-COMMERCE CATALOG */}
        <section className="py-48 px-6 bg-[#0a0a0a] border-t border-white/5">
          <div className="max-w-[100rem] mx-auto">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="font-mono text-[#d4a373] tracking-[0.2em] uppercase text-xs mb-4 block border border-[#d4a373]/30 px-3 py-1 inline-block">Directo del Obrador</span>
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white mt-6">
                  Nuestros<br/><span className="font-light italic">Panes.</span>
                </h2>
              </div>
              <p className="max-w-md text-zinc-400 font-sans font-light text-lg">
                Reserva online y recoge en tienda recién horneado. Producción limitada diaria para garantizar la excelencia en cada hogaza.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="py-48 lg:py-64 border-t border-[#d4a373]/20 bg-[#050505] relative flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-[#d4a373]/5 mix-blend-screen pointer-events-none" />
          
          <h2 className="text-5xl md:text-[8rem] font-light uppercase tracking-tighter mb-16 relative z-10 text-white">
            Pruébalo <br/> <span className="font-black italic text-[#d4a373]">Hoy Mismo.</span>
          </h2>
          
          <a
            href="mailto:pedidos@masamadre.com"
            className="group relative px-12 py-6 md:px-20 md:py-8 border border-[#d4a373] font-sans tracking-[0.2em] text-lg uppercase overflow-hidden bg-transparent z-10 inline-block cursor-none interactive-grid rounded-full"
          >
            <span className="relative z-10 text-[#d4a373] group-hover:text-[#050505] transition-colors duration-500 font-bold">
              Realizar Pedido
            </span>
            <m.div 
              className="absolute inset-0 z-0 origin-bottom bg-[#d4a373]"
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </a>
        </section>

      </main>
    </LazyMotion>
  );
}
