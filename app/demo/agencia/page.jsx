"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkle, ChevronDown, Mail, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const projects = [
  { id: 1, title: 'Rebrand Completo', client: 'Grupo Terranova', year: '2024', category: 'Branding', color: '#1a1a2e', img: 'https://loremflickr.com/1000/1000/branding,design/all?lock=1' },
  { id: 2, title: 'E-Commerce Headless', client: 'Moda Nuo', year: '2024', category: 'Digital', color: '#16213e', img: 'https://loremflickr.com/1000/1000/branding,design/all?lock=2' },
  { id: 3, title: 'Campaña Viral', client: 'Cerveza Nórdica', year: '2023', category: 'Campaña', color: '#0f3460', img: 'https://loremflickr.com/1000/1000/branding,design/all?lock=3' },
  { id: 4, title: 'App UX/UI', client: 'FinTech Iberia', year: '2023', category: 'Product Design', color: '#533483', img: 'https://loremflickr.com/1000/1000/branding,design/all?lock=4' },
];

const services = [
  { num: '01', title: 'Estrategia de Marca', desc: 'Posicionamiento, naming, identidad visual y arquitectura de comunicación para marcas con ambición.' },
  { num: '02', title: 'Diseño Digital', desc: 'Webs, apps y experiencias interactivas que convierten visitantes en clientes fieles.' },
  { num: '03', title: 'Producción Audiovisual', desc: 'Spots, reels y contenido para redes con un enfoque narrativo que impacta de los primeros 3 segundos.' },
  { num: '04', title: 'Performance & SEO', desc: 'Campañas de Google y Meta con ROI demostrado. Medimos cada euro para que rinda al máximo.' },
];

const stats = [
  { value: '12+', label: 'Años de experiencia' },
  { value: '230+', label: 'Proyectos entregados' },
  { value: '94%', label: 'Clientes repiten' },
  { value: '€4.2M', label: 'Revenue generado' },
];

export default function AgenciaDemo() {
  const [activeProject, setActiveProject] = useState(null);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.3 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);

  useEffect(() => {
    const handler = (e) => { cursorX.set(e.clientX - 6); cursorY.set(e.clientY - 6); };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#F0EDEA] text-[#111] font-sans selection:bg-[#111] selection:text-[#F0EDEA] overflow-x-hidden">

        {/* Custom Cursor */}
        <m.div
          className="fixed top-0 left-0 w-3 h-3 bg-[#111] rounded-full pointer-events-none z-[9999] mix-blend-difference"
          style={{ x: springX, y: springY }}
        />

        {/* Nav */}
        <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white">
          <Link href="/" className="font-bold tracking-[0.3em] uppercase text-sm hover:opacity-60 transition-opacity">
            ← Catálogo
          </Link>
          <span className="font-bold tracking-[0.4em] uppercase text-lg">The Agency.</span>
          <button className="flex items-center gap-2 text-sm tracking-widest uppercase hover:opacity-60 transition-opacity font-medium">
            <Sparkle className="w-4 h-4" /> Work
          </button>
        </nav>

        {/* HERO */}
        <m.section style={{ opacity: heroOpacity, y: heroY }} className="relative h-screen flex flex-col justify-end p-8 md:p-16 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <m.div
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(45% at 50% 50%)" }}
              transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-full bg-[url('https://loremflickr.com/1000/1000/branding,design/all?lock=5')] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-[#F0EDEA]/60 mix-blend-multiply" />
          </div>

          <div className="relative z-10 max-w-[90rem] mx-auto w-full">
            <m.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              className="font-mono text-xs tracking-[0.4em] uppercase text-zinc-500 mb-6"
            >
              Agencia Creativa & Digital — Madrid, España
            </m.p>
            <m.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="text-[3.5rem] md:text-[8rem] lg:text-[11rem] leading-[0.82] font-medium tracking-tighter mb-12"
            >
              We build<br />digital <span className="italic font-serif">emotions.</span>
            </m.h1>

            <m.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="flex flex-col md:flex-row justify-between items-end gap-6"
            >
              <p className="text-lg md:text-xl font-light max-w-lg text-zinc-600 leading-relaxed">
                Creamos marcas, experiencias digitales y campañas que generan impacto real. No hacemos webs; construimos motores de crecimiento.
              </p>
              <button className="group flex items-center gap-3 bg-[#111] text-white px-8 py-4 rounded-full font-medium hover:bg-zinc-800 transition-colors">
                Ver Proyectos
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </m.div>
          </div>
        </m.section>

        {/* STATS */}
        <section className="py-20 px-6 border-y border-zinc-200 bg-white">
          <div className="max-w-[90rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold tracking-tighter mb-2">{s.value}</div>
                <div className="text-sm text-zinc-500 font-mono uppercase tracking-widest">{s.label}</div>
              </m.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="py-32 px-6 max-w-[90rem] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 block mb-3">Trabajo Seleccionado</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter">Casos de Éxito</h2>
            </div>
            <span className="text-zinc-400 font-mono text-sm hidden md:block">2023–2024</span>
          </div>

          <div className="space-y-2">
            {projects.map((project, i) => (
              <m.div
                key={project.id}
                onHoverStart={() => setActiveProject(project.id)}
                onHoverEnd={() => setActiveProject(null)}
                className="group border-b border-zinc-200 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative overflow-hidden"
              >
                <m.div
                  className="absolute inset-0 bg-[#111] origin-left z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeProject === project.id ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
                <div className="relative z-10 flex items-center gap-8">
                  <span className={`font-mono text-xs tracking-widest ${activeProject === project.id ? 'text-zinc-500' : 'text-zinc-300'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={`text-2xl md:text-4xl font-light tracking-tight transition-colors ${activeProject === project.id ? 'text-white' : 'text-[#111]'}`}>{project.title}</h3>
                </div>
                <div className="relative z-10 flex items-center gap-8 md:gap-16">
                  <span className={`text-sm font-mono uppercase tracking-widest transition-colors ${activeProject === project.id ? 'text-zinc-400' : 'text-zinc-400'}`}>{project.client}</span>
                  <span className={`text-sm font-mono hidden md:block transition-colors ${activeProject === project.id ? 'text-zinc-400' : 'text-zinc-300'}`}>{project.category}</span>
                  <span className={`text-sm font-mono hidden md:block transition-colors ${activeProject === project.id ? 'text-zinc-500' : 'text-zinc-300'}`}>{project.year}</span>
                  <ArrowUpRight className={`w-5 h-5 transition-all duration-300 ${activeProject === project.id ? 'text-white rotate-0' : 'text-zinc-300 -rotate-45'}`} />
                </div>
              </m.div>
            ))}
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="py-32 px-6 bg-[#111] text-white">
          <div className="max-w-[90rem] mx-auto">
            <div className="mb-20">
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-500 block mb-3">Lo que hacemos</span>
              <h2 className="text-4xl md:text-7xl font-light tracking-tighter">Servicios</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {services.map((s, i) => (
                <m.div
                  key={i}
                  whileHover={{ backgroundColor: '#1c1c1c' }}
                  className="p-10 md:p-14 border border-white/5 flex flex-col gap-8 group cursor-pointer transition-colors"
                >
                  <span className="font-mono text-zinc-600 text-xs tracking-widest">{s.num}</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-white transition-colors">{s.title}</h3>
                    <p className="text-zinc-500 font-sans font-light leading-relaxed text-base">{s.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors self-end" />
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-40 px-6 bg-[#F0EDEA] flex flex-col items-center text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-zinc-400 block mb-8">¿Listo para crecer?</span>
            <h2 className="text-5xl md:text-9xl font-light tracking-tighter leading-none mb-16">
              Hablemos.
            </h2>
            <a
              href="mailto:hola@theagency.es"
              className="group inline-flex items-center gap-4 bg-[#111] text-white px-12 py-6 rounded-full text-lg font-medium hover:bg-zinc-800 transition-colors"
            >
              <Mail className="w-5 h-5" />
              hola@theagency.es
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="flex items-center justify-center gap-8 mt-12">
              <a href="#" className="text-zinc-400 hover:text-[#111] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-zinc-400 hover:text-[#111] transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </m.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-zinc-200 bg-[#F0EDEA]">
          <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-mono uppercase tracking-widest">
            <span>© {new Date().getFullYear()} The Agency S.L. — Madrid</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#111] transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-[#111] transition-colors">Política de Privacidad</a>
            </div>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}