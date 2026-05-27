"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Clock, Phone, MapPin, Instagram, Star, X, Menu, ChevronRight, Calendar, Users } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const services = [
  { name: "CLASSIC FADE", price: "18€", time: "30 min", desc: "Degradado clásico americano. Perfilado de nuca y sienes incluido." },
  { name: "SKIN FADE", price: "22€", time: "40 min", desc: "Degradado a cero con navaja. Acabado quirúrgico." },
  { name: "CORTE + BARBA", price: "30€", time: "50 min", desc: "Corte completo más perfilado de barba con navaja caliente." },
  { name: "AFEITADO CLÁSICO", price: "15€", time: "25 min", desc: "Navaja barbera, toallas calientes, bálsamo aftershave." },
  { name: "BARBA COMPLETA", price: "14€", time: "20 min", desc: "Recorte, perfilado con navaja y aceite nutritivo." },
  { name: "TRATAMIENTO CAPILAR", price: "25€", time: "30 min", desc: "Diagnóstico + masaje craneal + mascarilla revitalizante." },
];

const team = [
  { name: "Rafa Moreno", role: "Fundador & Master Barber", exp: "15 años", desc: "Formado en Londres y Brooklyn. Especialista en fades y razor work." },
  { name: "Dani Cruz", role: "Senior Barber", exp: "8 años", desc: "Campeón regional de barbería 2024. Experto en barbas." },
  { name: "Álex Romero", role: "Barber", exp: "4 años", desc: "La nueva generación. Cortes texturizados y tendencia." },
];

const reviews = [
  { name: "Carlos M.", text: "El mejor fade de Sevilla. Rafa es un artista con la máquina. Imposible salir sin sentirte otro.", rating: 5 },
  { name: "Pablo G.", text: "El afeitado clásico con navaja y toallas calientes es una experiencia. Puro relax.", rating: 5 },
  { name: "Adrián L.", text: "Llevo 3 años viniendo. No cambio. El ambiente, los tíos, la música... todo cuadra.", rating: 5 },
];

const gallery = [
  { gradient: "from-[#1a1a1a] to-[#333]", label: "Skin Fade" },
  { gradient: "from-[#2a2a2a] to-[#444]", label: "Buzz Cut" },
  { gradient: "from-[#111] to-[#222]", label: "Afeitado Clásico" },
  { gradient: "from-[#1a1a1a] to-[#3a3a3a]", label: "Barba Perfilada" },
  { gradient: "from-[#222] to-[#111]", label: "Mullet Moderno" },
  { gradient: "from-[#333] to-[#1a1a1a]", label: "Crop Top" },
];

export default function BarberiaDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <DemoLayout title="Fade & Co." year="2026">
      <div className="text-white selection:bg-[#dc2626] selection:text-white overflow-x-hidden bg-[#09090b] uppercase" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Custom cursor */}
        <motion.div className="fixed top-0 left-0 w-5 h-5 bg-white mix-blend-difference rounded-full pointer-events-none z-[200] hidden md:block"
          animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} />

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              className="fixed inset-0 bg-[#09090b] z-[90] flex flex-col justify-center p-8 md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-8 h-8" /></button>
              <nav className="flex flex-col gap-4">
                {["Servicios", "Equipo", "Galería", "Reservar"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-5xl font-black tracking-tighter" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[80] mix-blend-difference">
          <span className="text-xs font-black tracking-[0.3em]">FADE&CO.</span>
          <div className="flex items-center gap-6">
            <a href="#reservar" className="hidden md:block text-xs font-bold tracking-widest hover:opacity-50 transition-opacity">BOOK NOW</a>
            <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-6 h-6" /></button>
          </div>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — B&W BOLD
        ═══════════════════════════════════ */}
        <section className="h-screen flex flex-col justify-end px-6 md:px-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-[#09090b] to-[#111]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#dc2626]/5 to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="text-[clamp(4rem,18vw,12rem)] font-black leading-[0.82] tracking-tighter">
                NO<br/><span className="text-[#dc2626]">COMPRO</span><br/>MISE.
              </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-sm md:text-lg font-bold tracking-[0.3em] text-white/30 mt-8 max-w-xl normal-case">
              Precision cuts. Raw aesthetics. Street culture.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="flex items-center gap-6 mt-8">
              <a href="#servicios" className="px-8 py-4 bg-white text-black text-xs font-black tracking-widest hover:bg-[#dc2626] hover:text-white transition-colors">SERVICIOS</a>
              <a href="#reservar" className="text-xs font-bold tracking-widest text-white/40 border-b border-white/20 pb-1 hover:text-white hover:border-white transition-all">RESERVAR →</a>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            2. SERVICIOS — LISTA HARDCORE
        ═══════════════════════════════════ */}
        <section id="servicios" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16">THE<br/>MENU.</h2>

            <div className="space-y-0">
              {services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 group hover:border-[#dc2626]/30 transition-colors">
                  <div className="flex items-start gap-4 mb-2 md:mb-0">
                    <span className="text-xs font-bold text-white/10 mt-1">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black tracking-tighter group-hover:text-[#dc2626] transition-colors">{s.name}</h3>
                      <p className="text-[10px] text-white/20 normal-case mt-1 tracking-wide max-w-sm">{s.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 ml-8 md:ml-0">
                    <span className="text-xs text-white/20 font-bold tracking-widest">{s.time}</span>
                    <span className="text-2xl font-black text-[#dc2626]">{s.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. GALERÍA — GRID B&W
        ═══════════════════════════════════ */}
        <section id="galería" className="py-20 md:py-32 px-6 md:px-12 bg-white text-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16">THE<br/>WORK.</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((g, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="aspect-square relative overflow-hidden group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient}`} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#dc2626]/80">
                    <span className="text-white text-xs font-black tracking-widest">{g.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. EQUIPO
        ═══════════════════════════════════ */}
        <section id="equipo" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16">THE<br/>CREW.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] mb-4 relative overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl font-black text-white/[0.03]">{m.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#dc2626] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </div>
                  <h3 className="text-xl font-black tracking-tighter">{m.name}</h3>
                  <p className="text-[10px] text-[#dc2626] font-bold tracking-widest mt-1">{m.role}</p>
                  <p className="text-[10px] text-white/20 normal-case mt-2 tracking-wide">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. RESEÑAS
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-white text-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16">THE<br/>WORD.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="border-l-4 border-[#dc2626] pl-6 py-4">
                  <div className="flex mb-3">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-[#dc2626] text-[#dc2626]" />)}
                  </div>
                  <p className="text-sm text-black/60 normal-case leading-relaxed mb-4">"{r.text}"</p>
                  <p className="text-xs font-black tracking-widest">{r.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. MARQUEE
        ═══════════════════════════════════ */}
        <section className="py-16 md:py-24 overflow-hidden relative">
          <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="whitespace-nowrap text-7xl md:text-9xl font-black tracking-tighter opacity-5">
            FADE & CO. ✂ BARBERÍA URBANA ✂ EST. 2019 ✂ SEVILLA ✂ FADE & CO. ✂ BARBERÍA URBANA ✂ EST. 2019 ✂
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            7. RESERVAR
        ═══════════════════════════════════ */}
        <section id="reservar" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">BOOK<br/>NOW.</h2>
            <p className="text-sm text-white/30 normal-case mb-12 max-w-md mx-auto">Reserva por teléfono o WhatsApp. Walk-ins bienvenidos si hay hueco.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="tel:+34955111222" className="px-8 py-4 bg-[#dc2626] text-white text-sm font-black tracking-widest hover:bg-[#b91c1c] transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> 955 111 222
              </a>
              <a href="https://wa.me/34600111222" className="px-8 py-4 border-2 border-white/10 text-sm font-bold tracking-widest hover:border-white/30 transition-colors">WHATSAPP</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-bold tracking-widest text-white/20 normal-case">
              <div><MapPin className="w-4 h-4 mx-auto mb-3 text-[#dc2626]/30" /><p>C/ Feria 96<br/>Sevilla Centro</p></div>
              <div><Clock className="w-4 h-4 mx-auto mb-3 text-[#dc2626]/30" /><p>Lun-Vie 10:00-21:00<br/>Sáb 9:00-15:00</p></div>
              <div><Instagram className="w-4 h-4 mx-auto mb-3 text-[#dc2626]/30" /><p>@fadeandco.sevilla<br/>Walk-ins en Stories</p></div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold tracking-widest text-white/10">© 2026 FADE & CO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 text-[10px] font-bold tracking-widest text-white/10">
              <span>TERMS</span><span>PRIVACY</span>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
