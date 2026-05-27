"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Phone, Mail, MapPin, Clock, X, Menu, ChevronRight, Diamond, Star } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const P = { ivory: "#FBF9F6", navy: "#0a0a0a", gold: "#C3A370", goldDark: "#A8885C", stone: "#8C8578" };

const collection = [
  { name: "Chronograph Noir", price: "4.800€", ref: "MH-CH-001", desc: "Movimiento automático suizo. Caja de acero inoxidable 316L, cristal de zafiro antirreflejo. 42mm.", gradient: "from-[#1a1a1a] to-[#2a2a2a]" },
  { name: "Dress Rose Gold", price: "6.200€", ref: "MH-DR-002", desc: "Oro rosa 18K. Esfera de nácar blanco con índices aplicados. Correa de cocodrilo cosida a mano.", gradient: "from-[#3d2e20] to-[#5a4430]" },
  { name: "Diver Titanium", price: "3.900€", ref: "MH-DV-003", desc: "Titanio grado 5. 300m de resistencia al agua. Bisel cerámico unidireccional. Lumen verde.", gradient: "from-[#1a2a3a] to-[#2a3a4a]" },
  { name: "Tourbillon Limited", price: "28.000€", ref: "MH-TB-004", desc: "Edición limitada de 50 piezas. Tourbillon volante visible. Puente de oro grabado a mano. 40mm.", gradient: "from-[#C3A370]/20 to-[#C3A370]/5" },
];

const craftsmanship = [
  { num: "01", title: "Diseño", desc: "Cada pieza nace como un boceto a mano alzada. Nuestro director creativo perfecciona las proporciones durante meses." },
  { num: "02", title: "Mecanismo", desc: "Movimientos suizos ETA y Sellita. Ensamblados y regulados a mano en nuestro taller de Sevilla." },
  { num: "03", title: "Acabado", desc: "Pulido Côtes de Genève, anglage a mano, perlage. Cada reloj pasa 40 horas de acabado manual." },
  { num: "04", title: "Control", desc: "Test de presión, cronometría COSC, inspección visual con lupa 10x. Solo el 3% se descarta." },
];

const testimonials = [
  { name: "Alejandro R.", text: "El Chronograph Noir es mi reloj del día a día desde hace 2 años. No tiene un solo arañazo en el cristal. Precisión suiza real.", role: "Director General, Madrid" },
  { name: "Victoria S.", text: "Compré el Dress Rose Gold para mi boda. El nivel de detalle del nácar y la correa es de una marca de 10 veces su precio.", role: "Arquitecta, Barcelona" },
  { name: "Fernando M.", text: "El servicio postventa es excepcional. Me ajustaron la correa y me hicieron una revisión completa gratis. Marca de verdad.", role: "Coleccionista, Sevilla" },
];

export default function PremiumDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);

  return (
    <DemoLayout title="Maison Horlogère" year="2026">
      <div className="text-[#0a0a0a] selection:bg-[#C3A370] selection:text-white overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a0a0a] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-[#FBF9F6]"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center text-[#FBF9F6]">
                {["Colección", "Savoir-Faire", "Atelier", "Contacto"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                    className="text-2xl tracking-[0.1em] font-light" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-16 py-6 flex justify-between items-center z-[80] bg-[#FBF9F6]/90 backdrop-blur-xl">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#C3A370]">Maison Horlogère</span>
          <div className="hidden md:flex items-center gap-10">
            {["Colección", "Savoir-Faire", "Atelier"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] tracking-[0.2em] uppercase text-[#8C8578] hover:text-[#0a0a0a] transition-colors" style={{ fontFamily: "system-ui" }}>{item}</a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-[#C3A370]" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — LUXURY SILENCE
        ═══════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[#FBF9F6] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F6] via-[#F5F0E8] to-[#FBF9F6]" />

          <motion.div className="relative z-10 max-w-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
              className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 rounded-full bg-gradient-to-br from-[#C3A370]/10 to-[#C3A370]/5 border border-[#C3A370]/10 flex items-center justify-center">
              <Diamond className="w-12 h-12 md:w-16 md:h-16 text-[#C3A370]/30" strokeWidth={1} />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              className="text-[10px] tracking-[0.6em] uppercase text-[#C3A370] mb-8" style={{ fontFamily: "system-ui" }}>
              Haute Horlogerie · Sevilla · Depuis 2018
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 1.5 }}
              className="text-[clamp(2.5rem,8vw,5rem)] font-light leading-[1.15] tracking-[0.02em] mb-8">
              El tiempo,<br/><span className="italic text-[#C3A370]">hecho a mano.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
              className="text-sm text-[#8C8578] max-w-md mx-auto leading-relaxed mb-12" style={{ fontFamily: "system-ui" }}>
              Relojería artesanal de alta gama. Movimientos suizos. Acabado manual en nuestro atelier sevillano.
            </motion.p>

            <motion.a href="#colección" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
              className="text-[10px] tracking-[0.3em] uppercase text-[#C3A370] border-b border-[#C3A370]/30 pb-2 hover:border-[#C3A370] transition-colors cursor-pointer" style={{ fontFamily: "system-ui" }}>
              Descubrir la Colección
            </motion.a>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            2. COLECCIÓN — GRID MONUMENTAL
        ═══════════════════════════════════ */}
        <section id="colección" className="py-24 md:py-40 px-6 md:px-16 bg-[#0a0a0a] text-[#FBF9F6]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#C3A370]/50 block mb-4" style={{ fontFamily: "system-ui" }}>La Colección</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-[0.02em]">Cuatro visiones del tiempo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collection.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="group cursor-pointer" onClick={() => setSelectedPiece(c)}>
                  <div className={`aspect-[4/3] bg-gradient-to-br ${c.gradient} relative overflow-hidden mb-6`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Clock className="w-20 h-20 text-white/[0.04]" strokeWidth={0.5} />
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 border border-[#C3A370]/30 flex items-center justify-center backdrop-blur-sm bg-black/20">
                        <ArrowUpRight className="w-4 h-4 text-[#C3A370]" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#C3A370]/50" style={{ fontFamily: "system-ui" }}>{c.ref}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl tracking-wide group-hover:text-[#C3A370] transition-colors">{c.name}</h3>
                      <p className="text-xs text-[#FBF9F6]/20 mt-1 max-w-sm" style={{ fontFamily: "system-ui" }}>{c.desc}</p>
                    </div>
                    <span className="text-lg text-[#C3A370] font-light shrink-0 ml-4">{c.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PIECE DETAIL MODAL ═══ */}
        <AnimatePresence>
          {selectedPiece && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedPiece(null)} className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100]" />
              <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 80 }}
                className="fixed inset-4 md:inset-16 bg-[#0a0a0a] z-[101] overflow-y-auto p-8 md:p-16 border border-[#C3A370]/10 text-[#FBF9F6]">
                <button onClick={() => setSelectedPiece(null)} className="absolute top-6 right-6"><X className="w-5 h-5 text-[#C3A370]" /></button>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C3A370]/50" style={{ fontFamily: "system-ui" }}>{selectedPiece.ref}</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-3 mb-4">{selectedPiece.name}</h2>
                <span className="text-3xl text-[#C3A370] font-light">{selectedPiece.price}</span>
                <p className="text-base text-[#FBF9F6]/40 leading-relaxed mt-8 max-w-2xl" style={{ fontFamily: "system-ui" }}>{selectedPiece.desc}</p>
                <div className={`aspect-[16/9] bg-gradient-to-br ${selectedPiece.gradient} mt-8`} />
                <a href="#contacto" onClick={() => setSelectedPiece(null)}
                  className="inline-flex items-center gap-2 mt-8 px-8 py-3 border border-[#C3A370]/30 text-[#C3A370] text-[10px] tracking-[0.3em] uppercase hover:bg-[#C3A370] hover:text-[#0a0a0a] transition-all" style={{ fontFamily: "system-ui" }}>
                  Solicitar Información <ArrowUpRight className="w-3 h-3" />
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════
            3. SAVOIR-FAIRE — PROCESS
        ═══════════════════════════════════ */}
        <section id="savoir-faire" className="py-24 md:py-40 px-6 md:px-16 bg-[#FBF9F6]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#C3A370] block mb-4" style={{ fontFamily: "system-ui" }}>Savoir-Faire</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-[0.02em]">El arte del detalle</h2>
            </div>

            <div className="space-y-12 md:space-y-16">
              {craftsmanship.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-[4rem_1fr] gap-6 items-start">
                  <span className="text-4xl font-light text-[#C3A370]/20">{s.num}</span>
                  <div>
                    <h3 className="text-2xl tracking-wide mb-3">{s.title}</h3>
                    <p className="text-sm text-[#8C8578] leading-relaxed max-w-lg" style={{ fontFamily: "system-ui" }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. NUMBERS
        ═══════════════════════════════════ */}
        <section className="py-16 md:py-24 px-6 md:px-16 bg-[#C3A370] text-[#0a0a0a]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { v: "6", l: "años de historia" }, { v: "200+", l: "relojes creados" },
              { v: "40h", l: "de acabado por pieza" }, { v: "3%", l: "de descarte en QA" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <span className="text-4xl md:text-5xl font-light">{s.v}</span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a]/50 mt-2" style={{ fontFamily: "system-ui" }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. TESTIMONIOS
        ═══════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#FBF9F6]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#C3A370] block mb-4" style={{ fontFamily: "system-ui" }}>Testimonios</span>
              <h2 className="text-4xl font-light tracking-[0.02em]">Voces de nuestros clientes</h2>
            </div>
            <div className="space-y-12">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="text-center max-w-2xl mx-auto">
                  <p className="text-lg italic text-[#0a0a0a]/50 leading-[1.8] mb-6">"{t.text}"</p>
                  <p className="text-sm">{t.name}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C3A370]/50 mt-1" style={{ fontFamily: "system-ui" }}>{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. ATELIER
        ═══════════════════════════════════ */}
        <section id="atelier" className="py-24 md:py-40 px-6 md:px-16 bg-[#0a0a0a] text-[#FBF9F6]">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#C3A370]/50 block mb-6" style={{ fontFamily: "system-ui" }}>El Atelier</span>
              <h2 className="text-4xl font-light tracking-[0.02em] mb-6 leading-[1.2]">
                Donde nace<br/><span className="italic text-[#C3A370]">cada pieza.</span>
              </h2>
              <p className="text-sm text-[#FBF9F6]/30 leading-relaxed mb-8" style={{ fontFamily: "system-ui" }}>
                Nuestro taller en el centro de Sevilla es un espacio de 80m² donde 4 relojeros trabajan con herramientas que tienen más de 50 años. Visitas privadas con cita previa.
              </p>
              <a href="#contacto" className="text-[10px] tracking-[0.3em] uppercase text-[#C3A370] border-b border-[#C3A370]/30 pb-1 hover:border-[#C3A370] transition-colors cursor-pointer" style={{ fontFamily: "system-ui" }}>
                Solicitar Visita al Atelier
              </a>
            </div>
            <div className="aspect-square bg-gradient-to-br from-[#C3A370]/10 to-[#C3A370]/5 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10rem] font-extralight text-[#C3A370]/[0.04] select-none">MH</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. CONTACTO
        ═══════════════════════════════════ */}
        <section id="contacto" className="py-24 md:py-40 px-6 md:px-16 bg-[#FBF9F6]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#C3A370] block mb-8" style={{ fontFamily: "system-ui" }}>Contacto</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.02em] mb-12 leading-[1.1]">
              Cada reloj comienza<br/><span className="italic text-[#C3A370]">con una conversación.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" style={{ fontFamily: "system-ui" }}>
              <a href="tel:+34955901234" className="px-8 py-4 bg-[#0a0a0a] text-[#C3A370] text-[10px] tracking-[0.3em] uppercase hover:bg-[#C3A370] hover:text-[#0a0a0a] transition-all flex items-center gap-2">
                <Phone className="w-3 h-3" /> +34 955 901 234
              </a>
              <a href="mailto:atelier@maisonhorlogere.com" className="px-8 py-4 border border-[#C3A370]/30 text-[#C3A370] text-[10px] tracking-[0.3em] uppercase hover:bg-[#C3A370] hover:text-[#0a0a0a] transition-all">
                <Mail className="w-3 h-3 inline mr-2" /> Email
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ fontFamily: "system-ui" }}>
              <div><MapPin className="w-4 h-4 text-[#C3A370]/30 mx-auto mb-3" /><p className="text-xs text-[#8C8578]">C/ Cuna 14, Bajo<br/>41004 Sevilla</p></div>
              <div><Clock className="w-4 h-4 text-[#C3A370]/30 mx-auto mb-3" /><p className="text-xs text-[#8C8578]">Lun-Vie 10:00-14:00 / 17:00-20:00<br/>Sáb con cita previa</p></div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-16 border-t border-[#C3A370]/10 bg-[#FBF9F6]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: "system-ui" }}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C3A370]/30">© 2026 Maison Horlogère</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C3A370]/30">Haute Horlogerie · Sevilla</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
