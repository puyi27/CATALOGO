"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mail, Instagram, Dribbble, ExternalLink, Sparkles, Layers, Palette, X, Menu } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const projects = [
  { id: 1, title: "LUMINA", cat: "Dirección de Arte", year: "2024", color: "#6366f1", desc: "Redefinición visual para una marca de cosmética orgánica. Identidad completa, packaging y experiencia digital.", tags: ["Branding", "Packaging", "Web"] },
  { id: 2, title: "AETHER", cat: "Identidad de Marca", year: "2025", color: "#ec4899", desc: "Sistema de identidad para un colectivo artístico multimedia. Tipografía variable y lenguaje visual adaptativo.", tags: ["Identidad", "Tipografía", "Print"] },
  { id: 3, title: "OBLIVION", cat: "Experiencia Digital", year: "2025", color: "#06b6d4", desc: "Instalación interactiva generativa para el MACBA. WebGL, sonido reactivo y datos en tiempo real.", tags: ["WebGL", "Instalación", "Sonido"] },
  { id: 4, title: "CHROMA", cat: "Diseño Espacial", year: "2026", color: "#f97316", desc: "Arquitectura efímera para Sónar Festival. Proyecciones mapeadas sobre estructura modular de 12 metros.", tags: ["Espacial", "Mapping", "Festival"] },
  { id: 5, title: "VÓRTEX", cat: "Motion Design", year: "2026", color: "#a855f7", desc: "Campaña audiovisual para Nike Running EMEA. 6 piezas de motion graphics con tipografía cinética.", tags: ["Motion", "Campaña", "Nike"] },
  { id: 6, title: "SATORI", cat: "Editorial", year: "2026", color: "#14b8a6", desc: "Diseño editorial para la revista Apartamento. Maquetación tipográfica experimental de 180 páginas.", tags: ["Editorial", "Print", "Tipografía"] },
];

const awards = [
  { name: "Awwwards — Site of the Day", project: "LUMINA", year: "2024" },
  { name: "FWA — Best UI Design", project: "OBLIVION", year: "2025" },
  { name: "CSS Design Awards — Innovation", project: "AETHER", year: "2025" },
  { name: "D&AD — Wood Pencil", project: "CHROMA", year: "2026" },
  { name: "Laus Oro — Motion Graphics", project: "VÓRTEX", year: "2026" },
];

const services = [
  { icon: Palette, title: "Dirección de Arte", desc: "Conceptualización visual, moodboards, estética de campaña y supervisión creativa integral." },
  { icon: Layers, title: "Identidad de Marca", desc: "Sistemas de identidad flexibles: logotipo, tipografía, color, aplicaciones digitales e impresas." },
  { icon: Sparkles, title: "Experiencias Digitales", desc: "Webs inmersivas, instalaciones interactivas, WebGL, realidad aumentada y diseño generativo." },
];

const testimonials = [
  { quote: "La capacidad de Ana para encontrar la esencia visual de un proyecto es sobrehumana. LUMINA superó todas nuestras expectativas.", name: "Clara Mendoza", role: "CMO, Orgánica Beauty", color: "#6366f1" },
  { quote: "Trabajar con el estudio fue como dar un salto cuántico. El resultado final del Sónar fue trending topic durante 3 días.", name: "Mikel Arteta", role: "Director Creativo, Sónar", color: "#f97316" },
  { quote: "Profesionalidad extrema. Entrega impecable. El proyecto de Nike llegó a tiempo y 200% por encima de lo esperado.", name: "Sofía Reyes", role: "Brand Manager, Nike EMEA", color: "#a855f7" },
];

export default function CreativoDemo() {
  const [activeProject, setActiveProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <DemoLayout title="Ana Estudio" year="2026">
      <div className="text-[#f4f4f0] selection:bg-[#ec4899] selection:text-black font-sans overflow-x-hidden">

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[90] bg-[#0f0f0f] flex flex-col justify-center items-center md:hidden"
            >
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-8 h-8" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Proyectos", "Servicios", "Premios", "Contacto"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 + 0.2 }}
                    className="text-5xl font-black italic tracking-tighter" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}
                  >{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full p-5 md:p-8 flex justify-between items-center z-[80] mix-blend-difference pointer-events-none">
          <span className="pointer-events-auto font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">Ana Estudio ©</span>
          <div className="pointer-events-auto flex items-center gap-4">
            <a href="#contacto" className="hidden md:block font-mono text-[10px] tracking-[0.3em] uppercase hover:opacity-50 transition-opacity">Hablemos</a>
            <button onClick={() => setMenuOpen(true)} className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><Menu className="w-4 h-4" /></button>
          </div>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — ANTI-CONVENCIONAL
        ═══════════════════════════════════ */}
        <motion.section ref={heroRef} style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-[90vh] md:h-screen w-full flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-[#0f0f0f] to-[#ec4899]/10" />
          
          {/* Floating shape decorations */}
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute top-20 right-10 md:right-32 w-32 h-32 md:w-64 md:h-64 border border-[#6366f1]/20 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute bottom-40 left-5 md:left-20 w-20 h-20 md:w-40 md:h-40 border border-[#ec4899]/20" style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }} />

          <div className="relative z-10 max-w-7xl">
            <motion.div initial={{ width: 0 }} animate={{ width: "4rem" }} transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-[#6366f1] to-[#ec4899] mb-8" />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
              Estudio de diseño multidisciplinar — Sevilla / Madrid / Tokyo
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,15vw,10rem)] font-black leading-[0.82] tracking-tighter"
            >
              <span className="block">Caos</span>
              <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#ec4899] to-[#06b6d4] ml-[5vw]">
                Controlado.
              </span>
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="flex items-center gap-4 mt-12 text-white/30">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll para explorar</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-[1px] h-8 bg-white/20" />
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════
            2. PROJECTS — GRID EXPERIMENTAL
        ═══════════════════════════════════ */}
        <section id="proyectos" className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-4">01 — Archivo</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                Proyectos<br/><span className="italic text-white/50">Seleccionados.</span>
              </h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">6 Trabajos — 2024/26</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true, margin: "-50px" }}
                className="group relative cursor-pointer"
                onClick={() => setActiveProject(p)}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${p.color}30, ${p.color}05)` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8rem] md:text-[12rem] font-black tracking-tighter opacity-[0.06] text-white select-none">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {p.tags.map(t => <span key={t} className="px-2 py-1 text-[8px] font-mono tracking-[0.2em] uppercase border border-white/10 rounded-full backdrop-blur-sm bg-black/20">{t}</span>)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">{p.cat} — {p.year}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter group-hover:translate-x-2 transition-transform duration-300">{p.title}</h3>
                  </div>
                  <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/5">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. PROJECT DETAIL MODAL
        ═══════════════════════════════════ */}
        <AnimatePresence>
          {activeProject && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100]" />
              <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-4 md:inset-16 bg-[#111] rounded-3xl z-[101] overflow-y-auto p-8 md:p-16 border border-white/5"
              >
                <button onClick={() => setActiveProject(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeProject.color }} />
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">{activeProject.cat} — {activeProject.year}</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">{activeProject.title}</h2>
                  <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-12">{activeProject.desc}</p>
                  <div className="aspect-video rounded-2xl mb-12" style={{ background: `linear-gradient(135deg, ${activeProject.color}40, ${activeProject.color}10)` }} />
                  <div className="flex flex-wrap gap-3">
                    {activeProject.tags.map(t => (
                      <span key={t} className="px-4 py-2 text-xs font-mono tracking-[0.2em] uppercase border border-white/10 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════
            4. SERVICIOS — TABS INTERACTIVAS
        ═══════════════════════════════════ */}
        <section id="servicios" className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-4">02 — Lo que hacemos</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">Servicios.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i}
                className={`p-8 md:p-10 rounded-2xl border cursor-pointer transition-all duration-500 ${activeService === i ? 'border-[#6366f1]/50 bg-[#6366f1]/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}
                onClick={() => setActiveService(i)}
                whileHover={{ y: -4 }}
              >
                <s.icon className={`w-8 h-8 mb-6 transition-colors duration-300 ${activeService === i ? 'text-[#6366f1]' : 'text-white/30'}`} />
                <h3 className="text-2xl font-black tracking-tight mb-4">{s.title}</h3>
                <AnimatePresence mode="wait">
                  {activeService === i && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-white/50 leading-relaxed">{s.desc}</motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-16">
            {[{ n: "47", l: "Proyectos Entregados" }, { n: "12", l: "Premios Internacionales" }, { n: "8", l: "Años Operando" }, { n: "23", l: "Clientes Activos" }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center md:text-left">
                <span className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-[#6366f1] to-[#ec4899]">{s.n}</span>
                <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/30 mt-2">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. PREMIOS — MARQUEE HORIZONTAL
        ═══════════════════════════════════ */}
        <section id="premios" className="py-20 md:py-32 border-y border-white/5 overflow-hidden">
          <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-4">03 — Reconocimientos</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Premios.</h2>
          </div>
          
          <div className="space-y-0">
            {awards.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="group flex flex-col md:flex-row md:items-center justify-between px-6 md:px-16 py-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-default max-w-7xl mx-auto"
              >
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/20">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight">{a.name}</h3>
                </div>
                <div className="flex items-center gap-6 md:gap-8">
                  <span className="font-mono text-xs text-white/40">{a.project}</span>
                  <span className="font-mono text-xs text-white/20">{a.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. TESTIMONIOS — CARRUSEL
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-4">04 — Dicen de nosotras</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">Voces.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }} />
                <p className="text-lg italic text-white/70 leading-relaxed mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black" style={{ backgroundColor: t.color + '30', color: t.color }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. EQUIPO
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-4">05 — Equipo</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">Nosotras.</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Ana Rivas", role: "Directora Creativa", color: "#6366f1" },
              { name: "Lucía Ortega", role: "Diseñadora Senior", color: "#ec4899" },
              { name: "Maya Chen", role: "Dev Creativa", color: "#06b6d4" },
              { name: "Sofía Nakamura", role: "Motion Designer", color: "#f97316" },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-2xl mb-4 relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${m.color}25, ${m.color}05)` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-black opacity-10 select-none">{m.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: m.color }} />
                </div>
                <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mt-1">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            8. CONTACTO — CTA FINAL
        ═══════════════════════════════════ */}
        <section id="contacto" className="py-24 md:py-40 px-6 md:px-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#ec4899]/10" />
          
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-8">06 — Siguiente paso</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">
              ¿Creamos algo<br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#ec4899]">inolvidable?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-12">
              Nos encanta trabajar con marcas que entienden que el diseño no es decoración, es estrategia.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="mailto:hola@anaestudio.com"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-tight hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" /> hola@anaestudio.com
              </a>
              <a href="tel:+34955123456"
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 font-mono text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-colors">
                +34 955 123 456
              </a>
            </div>

            <div className="flex items-center justify-center gap-8">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Dribbble, label: "Dribbble" },
                { icon: ExternalLink, label: "Behance" },
              ].map((s, i) => (
                <a key={i} className="flex items-center gap-2 text-white/30 hover:text-white transition-colors group" href="#">
                  <s.icon className="w-4 h-4" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase hidden md:inline">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            FOOTER
        ═══════════════════════════════════ */}
        <footer className="border-t border-white/5 py-8 px-6 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">© 2026 Ana Estudio. Todos los derechos reservados.</p>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">Sevilla — Madrid — Tokyo</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
