"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, X, ArrowUpRight, Box, Compass } from 'lucide-react';

const projects = [
  { id: 'p1', title: 'Casa Horizonte', category: 'Residencial / Ibiza', img: 'https://loremflickr.com/1000/1000/minimalist,interior/all?lock=1', desc: 'Una exploración de los límites entre el refugio interior y la inmensidad del mar balear. Hormigón blanco, madera de sabina y proporciones áureas.' },
  { id: 'p2', title: 'Estudio Nørd', category: 'Comercial / Copenhague', img: 'https://loremflickr.com/1000/1000/minimalist,interior/all?lock=2', desc: 'Sede creativa diseñada bajo los principios del esencialismo escandinavo. La luz natural como material constructivo principal.' },
  { id: 'p3', title: 'Loft Industrial A4', category: 'Residencial / Berlín', img: 'https://loremflickr.com/1000/1000/minimalist,interior/all?lock=3', desc: 'Rehabilitación de una antigua fábrica textil. Respetando el alma del hierro fundido y el ladrillo original.' },
  { id: 'p4', title: 'Clínica Luz', category: 'Salud / Madrid', img: 'https://loremflickr.com/1000/1000/minimalist,interior/all?lock=4', desc: 'Arquitectura sanadora. Espacios diseñados para reducir la ansiedad del paciente a través de geometrías curvas y materiales orgánicos.' }
];

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
      className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-black mix-blend-difference pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'])
      }}
    />
  );
}

// Architecture Services
const services = [
  { id: '01', name: 'Arquitectura Residencial', desc: 'Diseño integral de viviendas unifamiliares con enfoque pasivo y materiales nobles.' },
  { id: '02', name: 'Interiorismo Comercial', desc: 'Espacios retail y hostelería diseñados para maximizar la experiencia del usuario.' },
  { id: '03', name: 'Rehabilitación', desc: 'Recuperación de patrimonio arquitectónico adaptándolo a estándares contemporáneos.' },
  { id: '04', name: 'Diseño de Mobiliario', desc: 'Piezas exclusivas a medida que dialogan con la arquitectura del espacio.' }
];

const ServiceCard = ({ service }) => (
  <div className="interactive-el border-t border-black/10 py-12 group relative overflow-hidden flex flex-col md:flex-row md:items-start justify-between gap-8 hover:bg-black hover:text-white transition-colors duration-500 px-8 cursor-none">
    <span className="font-mono text-4xl font-light text-zinc-300 group-hover:text-white/50 transition-colors">{service.id}</span>
    <div className="flex-1 max-w-2xl">
      <h3 className="text-3xl md:text-5xl font-light tracking-tighter mb-4">{service.name}</h3>
      <p className="text-zinc-500 group-hover:text-zinc-400 font-light text-lg md:text-xl leading-relaxed transition-colors">{service.desc}</p>
    </div>
    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-black/10 group-hover:border-white/20 transition-colors">
      <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
    </div>
  </div>
);

export default function InteriorismoDemo() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = projects.find(p => p.id === selectedId);

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedId]);

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-[#f7f7f7] text-black font-sans selection:bg-black selection:text-white min-h-screen">
        
        <CustomCursor />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-el">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black/10 backdrop-blur-md text-black hover:bg-black hover:text-white transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* TOP BAR */}
        <header className="fixed top-0 left-0 w-full p-8 z-40 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
          <div className="font-mono text-sm tracking-widest uppercase pointer-events-auto cursor-none">
            ATELIER ESPACIO ©
          </div>
          <div className="font-sans text-xs tracking-[0.2em] uppercase border-b border-white pb-1 pointer-events-auto cursor-none interactive-el hover:opacity-50 transition-opacity">
            Proyectos & Obra
          </div>
        </header>

        {/* HERO EXPANDIDO */}
        <section className="pt-48 pb-32 px-6 max-w-[100rem] mx-auto min-h-[85vh] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
               <h1 className="text-6xl md:text-[9rem] font-light tracking-tighter leading-[0.85] mb-8 uppercase text-black">
                 Geometría <br /> <span className="font-black">Habitable.</span>
               </h1>
            </div>
            <div className="lg:col-span-4 pb-4">
               <p className="text-xl md:text-2xl text-zinc-600 font-light leading-relaxed border-l border-black pl-6">
                 Arquitectura esencialista. Diseñamos espacios que trascienden la estética para convertirse en refugios atemporales de calma y proporción.
               </p>
               <div className="mt-8 flex gap-4 text-xs font-mono tracking-widest uppercase text-black/40">
                 <span>[ Madrid ]</span>
                 <span>[ Ibiza ]</span>
                 <span>[ Copenhague ]</span>
               </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID PROYECTOS */}
        <section className="px-6 pb-48 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, idx) => (
              <m.div 
                key={project.id}
                layoutId={`card-container-${project.id}`}
                onClick={() => setSelectedId(project.id)}
                className={`bg-white relative aspect-[4/3] cursor-none overflow-hidden group interactive-el ${idx === 0 ? 'md:col-span-2 aspect-[21/9]' : ''}`}
              >
                <m.img 
                  src={project.img} 
                  alt={project.title}
                  layoutId={`card-image-${project.id}`}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-[1.5s] ease-out"
                />
                <m.div 
                  layoutId={`card-info-${project.id}`}
                  className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white"
                >
                  <m.span layoutId={`card-category-${project.id}`} className="font-mono text-xs tracking-widest uppercase text-white/70">{project.category}</m.span>
                  <m.h2 layoutId={`card-title-${project.id}`} className="text-4xl md:text-5xl font-light tracking-tight mt-2">{project.title}</m.h2>
                </m.div>
                {/* Hover overlay text */}
                <div className="absolute top-8 right-8 bg-white text-black px-4 py-2 rounded-full font-sans text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center gap-2">
                  <Compass className="w-3 h-3" /> Ver Proyecto
                </div>
              </m.div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE SERVICES */}
        <section className="py-48 lg:py-64 px-6 bg-white border-t border-black/10">
          <div className="max-w-[100rem] mx-auto">
            <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="font-mono text-zinc-400 tracking-[0.2em] uppercase text-sm mb-6 block">Estudio // Metodología</span>
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none font-sans text-black">
                  Áreas de<br/><span className="font-light">Actuación.</span>
                </h2>
              </div>
              <p className="max-w-lg text-zinc-500 font-sans font-light text-xl border-l border-black/20 pl-6">
                Abordamos cada proyecto desde la comprensión profunda del lugar y sus habitantes, buscando una arquitectura silenciosa pero contundente que resista el paso del tiempo.
              </p>
            </div>

            <div className="flex flex-col">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="py-48 lg:py-64 bg-black relative flex flex-col items-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
          
          <h2 className="text-5xl md:text-[9rem] font-light uppercase tracking-tighter mb-16 relative z-10">
            Diseña <br/> <span className="font-black italic">El Vacío.</span>
          </h2>
          
          <a
            href="mailto:estudio@atelierescpacio.com"
            className="group relative px-12 py-6 md:px-20 md:py-8 border border-white font-mono tracking-widest uppercase overflow-hidden bg-black/50 backdrop-blur-sm z-10 inline-block cursor-none interactive-el"
          >
            <span className="relative z-10 text-white font-light text-sm md:text-xl group-hover:text-black transition-colors duration-500">
              Iniciar Proyecto
            </span>
            <m.div 
              className="absolute inset-0 z-0 origin-bottom bg-white"
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </a>
        </section>

        {/* FULLSCREEN EXPANDED VIEW */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[8000] flex items-center justify-center bg-[#f7f7f7] cursor-none"
              onClick={() => setSelectedId(null)}
            >
              <m.div 
                layoutId={`card-container-${selectedId}`}
                className="relative w-full h-full interactive-el"
              >
                <m.img 
                  src={selectedProject.img} 
                  layoutId={`card-image-${selectedId}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay Text */}
                <m.div 
                  layoutId={`card-info-${selectedId}`}
                  className="absolute bottom-0 left-0 w-full p-12 md:p-24 bg-gradient-to-t from-black via-black/60 to-transparent text-white flex flex-col justify-end h-full"
                >
                  <div className="max-w-[100rem] mx-auto w-full">
                    <m.span layoutId={`card-category-${selectedId}`} className="font-mono text-sm tracking-[0.2em] uppercase text-white/60 block">{selectedProject.category}</m.span>
                    <m.h2 layoutId={`card-title-${selectedId}`} className="text-6xl md:text-9xl font-light tracking-tighter mt-4 mb-12">{selectedProject.title}</m.h2>
                    
                    <m.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="max-w-3xl text-2xl text-white/90 font-light leading-relaxed border-l-2 border-white/30 pl-8"
                    >
                      {selectedProject.desc}
                    </m.p>
                    
                    <m.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-12 font-mono text-xs uppercase tracking-widest border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors"
                    >
                      Ver Galería Completa del Proyecto
                    </m.button>
                  </div>
                </m.div>

                <m.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-12 right-12 w-20 h-20 bg-black/20 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center cursor-none hover:bg-black/80 transition-colors interactive-el z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(null);
                  }}
                >
                  <X className="w-8 h-8" />
                </m.button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

      </main>
    </LazyMotion>
  );
}
