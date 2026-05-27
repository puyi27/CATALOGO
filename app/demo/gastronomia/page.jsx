"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, Star, Wine, Flame, Award, ChevronRight, X, Menu, Instagram, Utensils } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const menuTasting = [
  { num: "01", name: "Tomate Raf en texturas", desc: "Agua de tomate, perlas de albahaca, crujiente de ajo negro y aceite de oliva ahumado.", wine: "Manzanilla La Gitana" },
  { num: "02", name: "Gamba roja de Huelva", desc: "Carpaccio con cítricos, espuma de cabeza de gamba y polvo de alga nori.", wine: "Albariño Pazo de Señoráns" },
  { num: "03", name: "Huevo a baja temperatura", desc: "Yema líquida sobre crema de boletus, trufa negra rallada y brioche tostado.", wine: "Fino Tío Pepe" },
  { num: "04", name: "Ventresca de atún", desc: "Braseada al binchotan. Jugo de Pedro Ximénez reducido, puré de coliflor y caviar de Riofrío.", wine: "Ribera del Duero — Aalto" },
  { num: "05", name: "Cordero lechal", desc: "Asado 12 horas. Espárrago triguero, romero cristalizado y salsa de sus jugos.", wine: "Priorat — Clos Mogador" },
  { num: "06", name: "Chocolate, oliva y sal", desc: "Esfera de chocolate 70%, helado de aceite de oliva virgen, sal Maldon y crumble de cacao.", wine: "PX Muy Viejo — Toro Albalá" },
];

const awards = [
  { icon: Star, title: "1 Estrella Michelin", year: "2024" },
  { icon: Award, title: "Sol Repsol", year: "2023" },
  { icon: Flame, title: "Mejor Restaurante Andalucía", year: "2025" },
];

const reviews = [
  { name: "Jordi R.", text: "El menú degustación es una montaña rusa de sabores. Cada plato sorprende más que el anterior.", source: "Google", rating: 5 },
  { name: "Sofía E.", text: "La ventresca de atún es probablemente el mejor plato que he comido en mi vida. Sin exagerar.", source: "TripAdvisor", rating: 5 },
  { name: "Fernando C.", text: "Servicio impecable, ambiente íntimo y una carta de vinos que marea de lo buena. Experiencia de 10.", source: "Google", rating: 5 },
];

export default function GastronomiaDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <DemoLayout title="Alma" year="2026">
      <div className="text-[#1c1917] selection:bg-[#ea580c] selection:text-white overflow-x-hidden bg-[#fff8f0]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1c1917] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-[#fff8f0]"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Menú", "Chef", "Reconocimientos", "Reservar"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                    className="text-3xl text-[#fff8f0] tracking-wide" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-16 py-5 flex justify-between items-center z-[80] bg-[#fff8f0]/90 backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#ea580c]" />
            <span className="text-xs tracking-[0.4em] uppercase text-[#ea580c]">Alma</span>
          </div>
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "system-ui" }}>
            {["Menú", "Chef", "Reservar"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] tracking-[0.15em] uppercase text-[#1c1917]/40 hover:text-[#ea580c] transition-colors">{item}</a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-[#ea580c]" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — WARM AND INVITING
        ═══════════════════════════════════ */}
        <section className="min-h-screen flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col justify-center px-8 md:px-20 pt-32 md:pt-0 pb-12 md:pb-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="flex items-center gap-3 mb-8">
                {awards.map((a, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#ea580c]/10 bg-[#ea580c]/5" style={{ fontFamily: "system-ui" }}>
                    <a.icon className="w-3 h-3 text-[#ea580c]" />
                    <span className="text-[9px] tracking-wide text-[#ea580c]/70">{a.title}</span>
                  </div>
                ))}
              </div>

              <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] tracking-tight mb-6">
                Donde el fuego<br/><span className="italic text-[#ea580c]">cuenta historias.</span>
              </h1>

              <p className="text-base text-[#1c1917]/40 max-w-lg leading-relaxed mb-10" style={{ fontFamily: "system-ui" }}>
                Cocina de autor con raíces andaluzas. Producto de temporada elevado con técnica contemporánea. Una estrella Michelin.
              </p>

              <div className="flex gap-4" style={{ fontFamily: "system-ui" }}>
                <a href="#reservar" className="px-8 py-3.5 bg-[#ea580c] text-white text-xs tracking-[0.15em] uppercase rounded-full hover:bg-[#c2410c] transition-colors">Reservar</a>
                <a href="#menú" className="px-8 py-3.5 border border-[#ea580c]/20 text-[#ea580c] text-xs tracking-[0.15em] uppercase rounded-full hover:border-[#ea580c]/40 transition-colors">Ver Menú</a>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 min-h-[50vh] md:min-h-0 m-4 md:m-0 rounded-3xl md:rounded-none bg-gradient-to-br from-[#ea580c]/10 via-[#d4a574]/20 to-[#ea580c]/5 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className="w-32 h-32 text-[#ea580c]/[0.06]" />
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            2. MENÚ DEGUSTACIÓN — PASO A PASO
        ═══════════════════════════════════ */}
        <section id="menú" className="py-24 md:py-40 px-6 md:px-16 bg-[#1c1917] text-[#fff8f0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ea580c] block mb-4" style={{ fontFamily: "system-ui" }}>Menú Degustación</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">6 tiempos · 85€</h2>
              <p className="text-sm text-[#fff8f0]/30 max-w-md mx-auto" style={{ fontFamily: "system-ui" }}>Maridaje de vinos incluido: +35€. Experiencia completa en mesa del chef: +20€ (solo 4 plazas).</p>
            </div>

            <div className="space-y-0">
              {menuTasting.map((dish, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`py-8 border-b border-[#fff8f0]/5 cursor-pointer group transition-colors ${activeStep === i ? 'border-[#ea580c]/20' : ''}`}
                  onClick={() => setActiveStep(i)}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-6 flex-1">
                      <span className="text-3xl font-light text-[#ea580c]/20 shrink-0">{dish.num}</span>
                      <div>
                        <h3 className="text-xl md:text-2xl tracking-tight group-hover:text-[#ea580c] transition-colors">{dish.name}</h3>
                        <AnimatePresence>
                          {activeStep === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                              <p className="text-sm text-[#fff8f0]/30 mt-3 leading-relaxed" style={{ fontFamily: "system-ui" }}>{dish.desc}</p>
                              <div className="flex items-center gap-2 mt-3" style={{ fontFamily: "system-ui" }}>
                                <Wine className="w-3 h-3 text-[#ea580c]/40" />
                                <span className="text-[10px] text-[#ea580c]/50 tracking-wide">{dish.wine}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[#fff8f0]/10 shrink-0 mt-2 transition-transform ${activeStep === i ? 'rotate-90 text-[#ea580c]' : ''}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. CHEF
        ═══════════════════════════════════ */}
        <section id="chef" className="py-24 md:py-40 px-6 md:px-16 bg-[#fff8f0]">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ea580c] block mb-6" style={{ fontFamily: "system-ui" }}>El Chef</span>
              <h2 className="text-4xl font-light tracking-tight mb-6 leading-[1.2]">
                Pablo Romero<br/><span className="italic text-[#ea580c]">García</span>
              </h2>
              <div className="space-y-4 text-sm text-[#1c1917]/50 leading-relaxed" style={{ fontFamily: "system-ui" }}>
                <p>Sevillano de nacimiento, cocinero de vocación. Se formó en el Celler de Can Roca y pasó por Mugaritz y Noma antes de abrir Alma en 2020.</p>
                <p>Su cocina busca la emoción a través del producto andaluz. Trabaja directamente con pescadores de Barbate, ganaderos de la Sierra de Aracena y hortelanos del Aljarafe.</p>
                <p>"Cocinar es recordar con la boca. Cada plato es un paisaje de Andalucía."</p>
              </div>
            </div>
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#ea580c]/10 to-[#d4a574]/15 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[12rem] font-extralight text-[#ea580c]/[0.04] select-none">P</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. RECONOCIMIENTOS
        ═══════════════════════════════════ */}
        <section id="reconocimientos" className="py-16 md:py-24 px-6 md:px-16 bg-[#ea580c] text-white">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {awards.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                <a.icon className="w-8 h-8 text-white/80 mx-auto mb-4" />
                <h3 className="text-xl tracking-wide mb-1">{a.title}</h3>
                <p className="text-xs text-white/50" style={{ fontFamily: "system-ui" }}>{a.year}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. RESEÑAS
        ═══════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#fff8f0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ea580c] block mb-4" style={{ fontFamily: "system-ui" }}>Experiencias</span>
              <h2 className="text-4xl font-light tracking-tight">Lo que se siente</h2>
            </div>
            <div className="space-y-8">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="text-center max-w-2xl mx-auto">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-[#ea580c] text-[#ea580c]" />)}
                  </div>
                  <p className="text-lg italic text-[#1c1917]/60 leading-[1.8] mb-4">"{r.text}"</p>
                  <p className="text-xs font-medium" style={{ fontFamily: "system-ui" }}>{r.name}</p>
                  <p className="text-[10px] text-[#1c1917]/20 mt-1" style={{ fontFamily: "system-ui" }}>{r.source}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. RESERVAR
        ═══════════════════════════════════ */}
        <section id="reservar" className="py-24 md:py-40 px-6 md:px-16 bg-[#1c1917] text-[#fff8f0]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#ea580c] block mb-6" style={{ fontFamily: "system-ui" }}>Reservas</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 leading-[1.1]">
              Una experiencia<br/><span className="italic text-[#ea580c]">se reserva.</span>
            </h2>
            <p className="text-sm text-[#fff8f0]/30 max-w-md mx-auto mb-12" style={{ fontFamily: "system-ui" }}>
              Aforo limitado a 28 comensales por servicio. Recomendamos reservar con mínimo 1 semana de antelación.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" style={{ fontFamily: "system-ui" }}>
              <a href="tel:+34954890123" className="px-8 py-4 bg-[#ea580c] text-white text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#c2410c] transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> 954 890 123
              </a>
              <a href="mailto:reservas@almarest.es" className="px-8 py-4 border border-[#fff8f0]/10 text-xs tracking-[0.2em] uppercase rounded-full hover:border-[#fff8f0]/20 transition-colors">reservas@almarest.es</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ fontFamily: "system-ui" }}>
              <div><MapPin className="w-4 h-4 text-[#ea580c]/30 mx-auto mb-3" /><p className="text-xs text-[#fff8f0]/30">Plaza del Cabildo 3<br/>Sevilla Centro</p></div>
              <div><Clock className="w-4 h-4 text-[#ea580c]/30 mx-auto mb-3" /><p className="text-xs text-[#fff8f0]/30">Mié-Sáb 13:30-15:30 / 21:00-23:00<br/>Dom 13:30-15:30</p></div>
              <div><Instagram className="w-4 h-4 text-[#ea580c]/30 mx-auto mb-3" /><p className="text-xs text-[#fff8f0]/30">@almarestaurante<br/>Cocina en directo</p></div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-16 border-t border-[#ea580c]/5 bg-[#fff8f0]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: "system-ui" }}>
            <div className="flex items-center gap-2"><Flame className="w-3 h-3 text-[#ea580c]/20" /><p className="text-[10px] text-[#ea580c]/20">© 2026 Alma Restaurante · 1★ Michelin</p></div>
            <p className="text-[10px] text-[#ea580c]/20">Cocina de autor andaluza</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
