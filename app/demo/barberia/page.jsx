"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Scissors, Calendar, MapPin, Watch, ShieldCheck, Plus, Check } from 'lucide-react';

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
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-el')) {
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
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-[#D4AF37] pointer-events-none z-[9999] mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(212, 175, 55, 0)', 'rgba(212, 175, 55, 0.1)'])
      }}
    />
  );
}

const services = [
  { id: 'corte', title: 'Corte de Autor', price: '45€', desc: 'Asesoramiento visagista, lavado con toalla caliente, corte con tijera japonesa y styling final con pomada premium.' },
  { id: 'navaja', title: 'Afeitado Tradicional', price: '35€', desc: 'Ritual clásico de toallas calientes y frías, aceites esenciales, afeitado a navaja y masaje facial con aftershave botánico.' },
  { id: 'combo', title: 'El Ritual Ejecutivo', price: '70€', desc: 'La experiencia completa: corte de autor y arreglo de barba o afeitado tradicional, acompañado de degustación de whisky.' }
];

export default function BarberiaDemo() {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [bookingStep, setBookingStep] = useState(0);

  const activeService = services.find(s => s.id === selectedService);

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black min-h-screen relative overflow-hidden">
        
        <CustomCursor />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-el">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#111] border border-[#D4AF37]/30 backdrop-blur-md text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none mix-blend-difference">
          <div className="flex items-center gap-4">
            <Scissors className="w-6 h-6 text-[#D4AF37]" />
            <div>
              <div className="font-serif text-xl tracking-[0.2em] uppercase pointer-events-auto">La Navaja</div>
              <div className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">Grooming & Club</div>
            </div>
          </div>
          <button className="font-mono text-[10px] uppercase tracking-widest border border-[#D4AF37]/30 px-6 py-3 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors pointer-events-auto cursor-none interactive-el">
            Reservar Sillón
          </button>
        </header>

        {/* HERO */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://loremflickr.com/1000/1000/barber,vintage/all?lock=1" 
              alt="Barberia Interior" 
              fill 
              priority
              className="object-cover grayscale opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
            <m.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-16 h-16 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mb-8 rotate-45"
            >
              <Scissors className="w-6 h-6 text-[#D4AF37] -rotate-45" />
            </m.div>
            
            <m.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-[8rem] font-serif font-light tracking-tighter leading-[0.85] uppercase mb-8"
            >
              Corte <br/><span className="text-[#D4AF37] italic font-serif">Preciso.</span>
            </m.h1>

            <m.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-sans font-light text-zinc-400 text-lg md:text-2xl max-w-2xl leading-relaxed"
            >
              Un santuario para el caballero contemporáneo. Fusionamos la tradición de la navaja con la sofisticación del diseño vanguardista.
            </m.p>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-32 px-6 max-w-[100rem] mx-auto z-10 relative">
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            
            {/* Service Menu */}
            <div className="md:w-1/3 flex flex-col gap-6 border-l border-white/10 pl-6">
              <span className="font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase mb-4 block">01 // Carta de Servicios</span>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`text-left text-2xl md:text-4xl font-serif tracking-tight transition-all duration-500 cursor-none interactive-el ${
                    selectedService === service.id ? 'text-white italic pl-4 border-l-2 border-[#D4AF37]' : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* Service Detail */}
            <div className="md:w-2/3">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#111] p-12 rounded-2xl border border-white/5 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
                  
                  <div className="flex justify-between items-end mb-8 relative z-10">
                    <h3 className="text-4xl font-serif text-[#D4AF37]">{activeService.title}</h3>
                    <span className="font-mono text-2xl">{activeService.price}</span>
                  </div>
                  
                  <p className="text-zinc-400 font-light text-xl leading-relaxed mb-12 max-w-xl relative z-10">
                    {activeService.desc}
                  </p>

                  <div className="flex gap-4 border-t border-white/10 pt-8 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
                      <Watch className="w-4 h-4 text-[#D4AF37]" /> 45 Min
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Premium
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
            
          </div>
        </section>

        {/* BOOKING EXPERIENCE */}
        <section className="py-32 bg-[#111] border-t border-[#D4AF37]/20 z-10 relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tighter mb-16">
              Asegure su <span className="text-[#D4AF37] italic">Cita.</span>
            </h2>

            <div className="bg-[#050505] rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <m.div 
                  className="h-full bg-[#D4AF37]" 
                  animate={{ width: `${(bookingStep / 2) * 100}%` }} 
                  transition={{ duration: 0.5 }}
                />
              </div>

              <AnimatePresence mode="wait">
                {bookingStep === 0 && (
                  <m.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-8">
                    <h4 className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest">Seleccionar Fecha</h4>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {[12, 13, 14, 15, 16].map((day) => (
                        <button key={day} onClick={() => setBookingStep(1)} className="p-4 border border-white/10 rounded-xl hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors cursor-none interactive-el flex flex-col items-center gap-2">
                          <span className="text-zinc-500 text-xs font-mono">NOV</span>
                          <span className="text-2xl font-serif">{day}</span>
                        </button>
                      ))}
                    </div>
                  </m.div>
                )}

                {bookingStep === 1 && (
                  <m.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-8">
                    <h4 className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest">Seleccionar Hora</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['10:00', '12:30', '16:00', '18:45'].map((time) => (
                        <button key={time} onClick={() => setBookingStep(2)} className="p-4 border border-white/10 rounded-xl hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors cursor-none interactive-el font-mono text-lg">
                          {time}
                        </button>
                      ))}
                    </div>
                  </m.div>
                )}

                {bookingStep === 2 && (
                  <m.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 py-8">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="font-serif text-3xl">Reserva Confirmada</h4>
                    <p className="text-zinc-400 font-light">Le esperamos el próximo 14 de Noviembre a las 18:45. Le hemos enviado un pase digital a su correo.</p>
                    <button onClick={() => setBookingStep(0)} className="mt-8 font-mono text-[10px] uppercase tracking-widest border-b border-white/30 pb-1 text-zinc-500 hover:text-white transition-colors cursor-none interactive-el">
                      Realizar otra reserva
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
