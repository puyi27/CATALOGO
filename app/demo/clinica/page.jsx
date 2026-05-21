"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Activity, Users, Stethoscope, Microscope, Brain, HeartPulse } from 'lucide-react';

// Custom Cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const hoverSpring = useSpring(isHovering, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-el')) {
        scale.set(3.5);
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
      className="fixed top-0 left-0 w-3 h-3 rounded-full border-2 border-[#008080] mix-blend-difference pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(0, 128, 128, 0)', 'rgba(0, 128, 128, 1)'])
      }}
    />
  );
}

// Medical Team Card
const DoctorCard = ({ name, role, img }) => (
  <div className="group relative overflow-hidden interactive-el cursor-none bg-[#001a1a] rounded-2xl aspect-[3/4]">
    <div className="absolute inset-0 bg-[#008080]/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-700" />
    <img src={img} alt={name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#000505] via-[#000505]/40 to-transparent z-20" />
    <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <h3 className="text-2xl font-light text-white tracking-tight">{name}</h3>
      <p className="text-[#008080] font-mono text-xs uppercase tracking-widest mt-2">{role}</p>
      <div className="h-0 group-hover:h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-4">
        <button className="text-white/60 hover:text-white text-sm font-sans underline decoration-white/20 underline-offset-4">Ver perfil completo</button>
      </div>
    </div>
  </div>
);

export default function ClinicaDemo() {
  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-[#000505] text-white font-sans cursor-none selection:bg-[#008080] selection:text-white min-h-screen relative overflow-hidden">
        
        <CustomCursor />

        {/* Abstract Bio-Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#008080 1px, transparent 1px), linear-gradient(90deg, #008080 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#008080]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#008080]/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-el">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#001a1a] border border-[#008080]/30 backdrop-blur-md text-[#008080] hover:bg-[#008080] hover:text-[#000505] transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* TOP BAR */}
        <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference pointer-events-none text-white">
          <div className="font-sans font-black text-2xl tracking-tighter uppercase pointer-events-auto cursor-none">
            NOVA <span className="text-[#008080] font-light">Inst. Médico</span>
          </div>
          <div className="font-mono text-xs tracking-widest text-[#008080] border border-[#008080]/30 px-4 py-2 rounded-full pointer-events-auto uppercase bg-[#001a1a]/50 backdrop-blur-sm flex items-center gap-2">
            <Activity className="w-3 h-3" />
            Portal del Paciente
          </div>
        </header>

        {/* HERO SANIDAD */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 z-10 pointer-events-none">
          <div className="max-w-[100rem] mx-auto w-full">
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="mb-8 flex items-center gap-4">
                 <ShieldCheck className="w-5 h-5 text-[#008080]" />
                 <span className="font-mono text-[#008080] text-xs md:text-sm tracking-[0.2em] uppercase">Medicina Personalizada de Precisión</span>
              </div>
              
              <h1 className="text-7xl md:text-[11rem] lg:text-[13rem] font-light tracking-tighter leading-[0.85] mb-12 uppercase text-white">
                Vanguardia <br /> <span className="font-black text-transparent" style={{ WebkitTextStroke: '2px #008080' }}>Quirúrgica.</span>
              </h1>
              
              <div className="max-w-3xl border-l border-[#008080]/50 pl-8 ml-2">
                <p className="text-xl md:text-3xl text-white/70 font-light leading-relaxed">
                  Redefiniendo la experiencia médica. Instalaciones asépticas, tecnología de diagnóstico de última generación y un equipo médico de excelencia internacional.
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* ESPECIALIDADES (BENTO GRID) */}
        <section className="py-32 px-6 md:px-24 z-10 relative">
          <div className="max-w-[100rem] mx-auto">
            <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter mb-16 text-white"><span className="font-black text-[#008080]">Áreas</span> Clínicas.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2 bg-[#001a1a] rounded-3xl p-12 border border-[#008080]/20 interactive-el cursor-none group hover:bg-[#008080]/10 transition-colors duration-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 text-[#008080]/5 group-hover:text-[#008080]/10 transition-colors duration-500">
                  <HeartPulse className="w-96 h-96" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Cardiología Intervencionista</h3>
                  <p className="text-white/60 text-lg md:text-xl font-light max-w-lg mb-8">Diagnóstico y tratamiento avanzado de patologías cardiovasculares mediante técnicas mínimamente invasivas. Monitorización holter y ecocardiografía 3D.</p>
                  <button className="font-mono text-xs text-[#008080] uppercase tracking-widest border-b border-[#008080] pb-1">Conocer Unidad</button>
                </div>
              </div>
              
              <div className="bg-[#001a1a] rounded-3xl p-12 border border-[#008080]/20 interactive-el cursor-none group hover:bg-[#008080]/10 transition-colors duration-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 text-[#008080]/5 group-hover:text-[#008080]/10 transition-colors duration-500">
                  <Brain className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-4 tracking-tight">Neurología</h3>
                  <p className="text-white/60 font-light mb-8">Unidad especializada en neurofisiología, cefaleas crónicas y trastornos neurodegenerativos.</p>
                  <button className="font-mono text-xs text-[#008080] uppercase tracking-widest border-b border-[#008080] pb-1">Conocer Unidad</button>
                </div>
              </div>

              <div className="bg-[#001a1a] rounded-3xl p-12 border border-[#008080]/20 interactive-el cursor-none group hover:bg-[#008080]/10 transition-colors duration-500 flex flex-col justify-between">
                <Microscope className="w-12 h-12 text-[#008080] mb-8" />
                <div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">Laboratorio Genético</h3>
                  <p className="text-white/60 font-light text-sm">Secuenciación de ADN, medicina predictiva y farmacogenética.</p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl border border-[#008080]/20 interactive-el cursor-none group">
                <div className="absolute inset-0 bg-[#001a1a]/80 group-hover:bg-[#001a1a]/40 transition-colors duration-700 z-10 mix-blend-multiply" />
                <img src="https://loremflickr.com/1000/1000/surgery,doctor/all?lock=1" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Instalaciones Quirúrgicas" />
                <div className="absolute bottom-0 left-0 w-full p-12 z-20">
                  <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Instalaciones Quirúrgicas Quirófano Híbrido C</h3>
                  <p className="text-white/80 font-light max-w-xl">Entornos controlados ISO Clase 5 con sistemas de navegación quirúrgica guiada por imagen.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CUADRO MÉDICO */}
        <section className="py-32 px-6 md:px-24 z-10 relative bg-black/40 border-y border-[#008080]/10">
          <div className="max-w-[100rem] mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter">Equipo <br/> <span className="font-black text-[#008080]">Médico.</span></h2>
              <Link href="#" className="font-mono text-xs tracking-widest uppercase text-[#008080] border border-[#008080]/30 px-6 py-3 rounded-full hover:bg-[#008080] hover:text-[#000505] transition-colors cursor-none interactive-el hidden md:block">
                Ver Cuadro Médico
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <DoctorCard 
                name="Dra. Elena Rostova" 
                role="Jefa de Cardiología" 
                img="https://loremflickr.com/1000/1000/surgery,doctor/all?lock=2" 
              />
              <DoctorCard 
                name="Dr. Marcus Thorne" 
                role="Neurocirugía" 
                img="https://loremflickr.com/1000/1000/surgery,doctor/all?lock=3" 
              />
              <DoctorCard 
                name="Dra. Sarah Chen" 
                role="Oncología Radioterápica" 
                img="https://loremflickr.com/1000/1000/surgery,doctor/all?lock=4" 
              />
              <DoctorCard 
                name="Dr. Javier Valls" 
                role="Traumatología Deportiva" 
                img="https://loremflickr.com/1000/1000/surgery,doctor/all?lock=5" 
              />
            </div>
          </div>
        </section>

        {/* CTA CITA ONLINE */}
        <section className="py-48 lg:py-64 relative flex flex-col items-center text-center overflow-hidden z-10 bg-[#001a1a]">
          <div className="absolute inset-0 bg-[#008080]/5 mix-blend-screen pointer-events-none" />
          
          <h2 className="text-5xl md:text-9xl font-light uppercase tracking-tighter mb-16 relative z-10 text-white leading-[0.85]">
            Tu Salud, <br/> <span className="font-black text-[#008080]">Nuestra Prioridad.</span>
          </h2>
          
          <a
            href="mailto:citas@institutomnova.com"
            className="group relative px-12 py-6 md:px-20 md:py-8 border-2 border-[#008080] font-mono tracking-widest uppercase overflow-hidden bg-[#000505] backdrop-blur-sm z-10 inline-block cursor-none interactive-el rounded-2xl"
          >
            <span className="relative z-10 text-[#008080] font-bold text-sm md:text-xl group-hover:text-black transition-colors duration-500">
              Pedir Cita Online
            </span>
            <m.div 
              className="absolute inset-0 z-0 origin-bottom bg-[#008080]"
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </a>

          <div className="mt-16 flex items-center justify-center gap-8 opacity-50">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/ISO_9001-2015.svg/512px-ISO_9001-2015.svg.png" className="h-12 opacity-50 grayscale" alt="ISO 9001" />
             <div className="font-mono text-[10px] tracking-widest uppercase text-left border-l border-white/20 pl-4">
               Centro Médico<br/>Homologado<br/>Nº Reg: 28394-RM
             </div>
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
