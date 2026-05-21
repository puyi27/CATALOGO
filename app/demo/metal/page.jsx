"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Crosshair, Cpu, Maximize, Activity } from "lucide-react";

export default function TitanPrecision() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const blueprintRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: blueprintRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const [temp, setTemp] = useState(850);
  const [cycles, setCycles] = useState(12400);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((prev) => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5));
      setCycles((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const typeWriterText = "INGENIERÍA PARA LA METALURGIA DEL FUTURO.";
  const typeWriterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#ff4500] selection:text-white overflow-hidden cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-[#ff4500] pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPos.x - 12,
          y: cursorPos.y - 12,
          scale: isHovering ? 3 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        style={{ borderRadius: "0px" }}
      />

      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 uppercase tracking-[0.2em] text-xs font-bold">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:text-[#ff4500] transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ArrowLeft size={14} />
          Catálogo
        </Link>
        <div className="flex items-center gap-2">
          <Crosshair size={14} className="text-[#ff4500]" />
          <span>TITAN PRECISION</span>
        </div>
        <div className="flex gap-6">
          <span className="hover:text-[#ff4500] transition-colors cursor-none uppercase" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Manifiesto</span>
          <span className="hover:text-[#ff4500] transition-colors cursor-none uppercase" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Sistemas</span>
        </div>
      </nav>

      <section className="relative h-screen flex flex-col justify-center items-center px-6 mt-16">
        <div className="absolute inset-0 bg-[url('https://loremflickr.com/1920/1080/metal,industrial/all')] bg-cover bg-center opacity-20 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600"
          >
            PRECISIÓN<br />INDUSTRIAL.
          </motion.h1>
          
          <motion.div 
            variants={typeWriterVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex font-mono text-sm md:text-base text-[#ff4500] tracking-widest uppercase"
          >
            {typeWriterText.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-neutral-500 font-mono text-xs uppercase"
        >
          <span>Secuencia de inicio</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
        </motion.div>
      </section>

      <section className="py-32 px-6 border-t border-white/10" ref={blueprintRef}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">ADN de<br />Arquitectura</h2>
            <p className="text-neutral-400 font-mono text-sm leading-relaxed mb-6 uppercase tracking-widest">
              Las tolerancias exactas no son una opción, son un requisito estricto en nuestro flujo de trabajo de ensamblaje industrial. Cortamos, soldamos y extruimos materia prima con precisión submilimétrica.
            </p>
            <div className="flex items-center gap-4 text-[#ff4500] font-mono text-xs uppercase tracking-widest">
              <Activity size={16} />
              <span>Análisis de estructura activado</span>
            </div>
          </div>
          
          <div className="relative w-full aspect-square border border-white/10 bg-neutral-950 p-8 flex justify-center items-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]" />
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10" fill="none" stroke="#ff4500" strokeWidth="0.5">
              <motion.path
                d="M10,10 L90,10 L90,90 L10,90 Z"
                style={{ pathLength }}
              />
              <motion.path
                d="M10,50 L90,50"
                style={{ pathLength }}
              />
              <motion.path
                d="M50,10 L50,90"
                style={{ pathLength }}
              />
              <motion.circle
                cx="50" cy="50" r="30"
                style={{ pathLength }}
              />
              <motion.path
                d="M20,20 L80,80"
                style={{ pathLength }}
              />
              <motion.path
                d="M80,20 L20,80"
                style={{ pathLength }}
              />
            </svg>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              Esquema XYZ-409
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-t border-white/10 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Telemetría<br />Operativa</h2>
            <span className="font-mono text-[#ff4500] text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ff4500] animate-pulse" />
              Live Data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-white/10 p-6 bg-[#0a0a0a] flex flex-col justify-between aspect-square group hover:border-[#ff4500]/50 transition-colors">
              <div className="flex justify-between items-start">
                <Cpu className="text-neutral-500 group-hover:text-[#ff4500] transition-colors" size={24} />
                <span className="font-mono text-xs text-neutral-600 uppercase">Ciclos</span>
              </div>
              <div>
                <motion.div 
                  key={cycles}
                  initial={{ opacity: 0.5, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-black tracking-tighter"
                >
                  {cycles.toLocaleString()}
                </motion.div>
                <div className="font-mono text-xs text-[#ff4500] mt-2 uppercase">Operaciones/Hora</div>
              </div>
            </div>

            <div className="border border-white/10 p-6 bg-[#0a0a0a] flex flex-col justify-between aspect-square group hover:border-[#ff4500]/50 transition-colors">
              <div className="flex justify-between items-start">
                <Maximize className="text-neutral-500 group-hover:text-[#ff4500] transition-colors" size={24} />
                <span className="font-mono text-xs text-neutral-600 uppercase">Tolerancia</span>
              </div>
              <div>
                <div className="text-6xl font-black tracking-tighter">0.001</div>
                <div className="font-mono text-xs text-[#ff4500] mt-2 uppercase">Milímetros</div>
              </div>
            </div>

            <div className="border border-white/10 p-6 bg-[#0a0a0a] flex flex-col justify-between aspect-square group hover:border-[#ff4500]/50 transition-colors">
              <div className="flex justify-between items-start">
                <Activity className="text-neutral-500 group-hover:text-[#ff4500] transition-colors" size={24} />
                <span className="font-mono text-xs text-neutral-600 uppercase">Núcleo térmico</span>
              </div>
              <div>
                <motion.div 
                  key={temp}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="text-6xl font-black tracking-tighter flex items-start"
                >
                  {temp}<span className="text-2xl mt-2">°C</span>
                </motion.div>
                <div className="font-mono text-xs text-[#ff4500] mt-2 uppercase">Temperatura estable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#ff4500] opacity-5 skew-x-[-20deg] transform translate-x-32" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Fabricación<br />Pesada
              </h2>
              <div className="flex flex-col gap-6 font-mono text-sm text-neutral-400 uppercase tracking-widest">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-[#ff4500] font-black">01</span>
                  <span>Mecanizado CNC 5 Ejes</span>
                </div>
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-[#ff4500] font-black">02</span>
                  <span>Corte por Plasma</span>
                </div>
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-[#ff4500] font-black">03</span>
                  <span>Soldadura Robótica TIG/MIG</span>
                </div>
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-[#ff4500] font-black">04</span>
                  <span>Aleaciones de Titanio</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[3/4] w-full">
              <img 
                src="https://loremflickr.com/800/1000/welding,factory/all" 
                alt="Proceso de soldadura" 
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 border-2 border-[#ff4500] transform translate-x-4 translate-y-4 -z-10" />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0a0a0a] pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#ff4500] text-black font-black text-2xl md:text-5xl uppercase tracking-tighter overflow-hidden cursor-none"
          >
            <span className="relative z-10">Iniciar Proyecto</span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.button>
          
          <div className="mt-32 w-full flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-xs text-neutral-600 uppercase tracking-widest border-t border-white/10 pt-8">
            <div className="flex items-center gap-2">
              <Crosshair size={14} />
              <span>TITAN PRECISION CORP. © 2024</span>
            </div>
            <div className="flex gap-8">
              <span className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Terminos</span>
              <span className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Privacidad</span>
              <span className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Contacto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#ff4500]" />
              <span>Sistema Operativo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
