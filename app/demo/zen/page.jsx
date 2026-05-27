"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Leaf, Droplets, Wind, Sun, Moon, Phone, Mail, MapPin, Clock, ChevronDown, X, Menu, ArrowRight } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const treatments = [
  { name: "Masaje Shiatsu", duration: "60 min", price: "75€", desc: "Técnica japonesa de presión digital que equilibra la energía vital. Alivio profundo de tensión muscular y bloqueos energéticos.", icon: Wind },
  { name: "Ritual de Piedras Calientes", duration: "90 min", price: "95€", desc: "Basalto volcánico a 50°C sobre meridianos corporales. Disolución completa de estrés acumulado.", icon: Sun },
  { name: "Baño de Bosque Interior", duration: "120 min", price: "120€", desc: "Experiencia multisensorial: aromaterapia de cedro, sonidos naturales y masaje de aceites esenciales.", icon: Leaf },
  { name: "Flotación Sensorial", duration: "60 min", price: "85€", desc: "Inmersión en agua salada a temperatura corporal. Oscuridad y silencio total. Reinicio neurológico.", icon: Droplets },
  { name: "Meditación Guiada", duration: "45 min", price: "40€", desc: "Sesión individual con técnicas de respiración pranayama y visualización. Para principiantes y avanzados.", icon: Moon },
];

const team = [
  { name: "Keiko Yamamoto", role: "Fundadora & Terapeuta", bio: "20 años de práctica. Formada en Kioto y Bali.", initial: "KY" },
  { name: "Carmen Reyes", role: "Terapeuta Holística", bio: "Especialista en reflexología y aromaterapia.", initial: "CR" },
  { name: "Hiroshi Tanaka", role: "Instructor de Meditación", bio: "Monje zen durante 8 años. Filosofía práctica.", initial: "HT" },
];

const testimonials = [
  { text: "Un oasis de paz en medio de la ciudad. Después de la sesión de flotación, dormí como no lo hacía en años.", name: "Isabel Moreno", treatment: "Flotación Sensorial" },
  { text: "Keiko tiene manos de oro. El shiatsu me quitó una contractura que arrastraba desde hacía meses.", name: "Andrés Gutiérrez", treatment: "Masaje Shiatsu" },
  { text: "El baño de bosque interior fue transformador. Salí siendo otra persona. Ahora vengo cada mes.", name: "Lucía Fernández", treatment: "Baño de Bosque Interior" },
];

const faqs = [
  { q: "¿Necesito experiencia previa en meditación?", a: "No. Nuestras sesiones están diseñadas tanto para principiantes como para practicantes avanzados. Hiroshi adapta cada sesión al nivel del participante." },
  { q: "¿Cuánto tiempo antes debo llegar?", a: "Recomendamos llegar 15 minutos antes para cambiarte y comenzar a relajarte en nuestra sala de espera con té matcha." },
  { q: "¿Puedo regalar un tratamiento?", a: "Sí. Ofrecemos tarjetas regalo personalizadas en sobre artesanal. Disponibles en recepción o a través de nuestra web." },
  { q: "¿Los aceites son naturales?", a: "100%. Utilizamos exclusivamente aceites esenciales orgánicos certificados, importados directamente de productores en Japón y la Provenza." },
];

export default function ZenDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTreatment, setActiveTreatment] = useState(0);

  return (
    <DemoLayout title="Retiro Zen" year="2026">
      <div className="text-[#2d2417] selection:bg-[#2d2417] selection:text-[#f5f0eb] overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#f5f0eb] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6 text-[#2d2417]" /></button>
              <nav className="flex flex-col gap-8 text-center">
                {["Tratamientos", "Filosofía", "Equipo", "Reservar"].map((item, i) => (
                  <motion.a key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="text-3xl tracking-wide" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-16 py-6 flex justify-between items-center z-[80]">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#a8956e]">禅 Retiro Zen</span>
          <div className="flex items-center gap-6">
            <a href="#reservar" className="hidden md:block text-[10px] tracking-[0.3em] uppercase text-[#a8956e] hover:text-[#2d2417] transition-colors">Reservar</a>
            <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-[#a8956e]" /></button>
          </div>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — SILENCIO TOTAL
        ═══════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0eb] via-[#f0ebe3] to-[#ebe5db]" />
          
          <motion.div className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 0.08 }} transition={{ duration: 2, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full border border-[#a8956e]" />
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1.5 }}
              className="text-[10px] tracking-[0.6em] uppercase text-[#a8956e] mb-12">
              Centro de bienestar · Alcalá de Guadaíra
            </motion.p>
            
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.5 }}
              className="text-[clamp(2.5rem,10vw,7rem)] leading-[1.1] tracking-[0.02em] mb-8 font-light">
              El silencio<br/>
              <span className="italic text-[#a8956e]">es el refugio.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1.5 }}
              className="text-sm text-[#a8956e]/60 max-w-md mx-auto leading-relaxed mb-16">
              Un espacio donde el tiempo se detiene. Terapias ancestrales japonesas en el corazón de Andalucía.
            </motion.p>

            <motion.a href="#tratamientos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
              className="text-[10px] tracking-[0.3em] uppercase text-[#a8956e] border-b border-[#a8956e]/30 pb-2 hover:border-[#a8956e] transition-colors cursor-pointer">
              Descubrir
            </motion.a>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            2. FILOSOFÍA
        ═══════════════════════════════════ */}
        <section id="filosofía" className="py-24 md:py-40 px-6 md:px-16 bg-[#f0ebe3]">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-20">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#a8956e] block mb-6">哲学 · Filosofía</span>
              <p className="text-xl md:text-2xl leading-[1.8] text-[#2d2417]/70 font-light italic">
                "No intentamos arreglar lo que está roto. Creamos el espacio para que el cuerpo recuerde cómo sanarse a sí mismo."
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#a8956e]/50 mt-8">— Keiko Yamamoto, Fundadora</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {[
                { kanji: "体", title: "Cuerpo", desc: "Terapias manuales que liberan la tensión almacenada y restauran la movilidad natural." },
                { kanji: "心", title: "Mente", desc: "Meditación y técnicas de respiración para aquietar el ruido mental crónico." },
                { kanji: "魂", title: "Espíritu", desc: "Rituales que reconectan con la esencia, lejos de la aceleración del mundo exterior." },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }} viewport={{ once: true }} className="text-center">
                  <span className="text-5xl md:text-6xl text-[#a8956e]/20 block mb-6">{p.kanji}</span>
                  <h3 className="text-lg tracking-[0.1em] mb-4">{p.title}</h3>
                  <p className="text-sm text-[#2d2417]/50 leading-relaxed font-light">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. TRATAMIENTOS — ACCORDION
        ═══════════════════════════════════ */}
        <section id="tratamientos" className="py-24 md:py-40 px-6 md:px-16 bg-[#f5f0eb]">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a8956e] block mb-6 text-center">施術 · Tratamientos</span>
            <h2 className="text-4xl md:text-5xl text-center tracking-[0.02em] font-light mb-16">Nuestras terapias</h2>

            <div className="space-y-0">
              {treatments.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="border-b border-[#a8956e]/10"
                >
                  <button onClick={() => setActiveTreatment(activeTreatment === i ? -1 : i)}
                    className="w-full py-8 flex items-center justify-between text-left group">
                    <div className="flex items-center gap-6">
                      <t.icon className={`w-5 h-5 transition-colors ${activeTreatment === i ? 'text-[#a8956e]' : 'text-[#a8956e]/30'}`} strokeWidth={1.5} />
                      <div>
                        <h3 className="text-lg md:text-xl tracking-wide group-hover:text-[#a8956e] transition-colors">{t.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#a8956e]/40">{t.duration}</span>
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#a8956e]/40">·</span>
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#a8956e]/40">{t.price}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#a8956e]/30 transition-transform ${activeTreatment === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeTreatment === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }} className="overflow-hidden">
                        <div className="pb-8 pl-11 md:pl-11 pr-8">
                          <p className="text-sm text-[#2d2417]/50 leading-relaxed max-w-lg font-light">{t.desc}</p>
                          <a href="#reservar" className="inline-flex items-center gap-2 mt-6 text-[10px] tracking-[0.2em] uppercase text-[#a8956e] border-b border-[#a8956e]/30 pb-1 hover:border-[#a8956e] transition-colors">
                            Reservar <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. ESPACIO — VISUAL
        ═══════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#2d2417]">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a8956e]/50 block mb-6">空間 · Espacio</span>
            <h2 className="text-4xl md:text-5xl text-[#f5f0eb] tracking-[0.02em] font-light mb-8">Un lugar fuera del tiempo</h2>
            <p className="text-sm text-[#f5f0eb]/40 max-w-lg mx-auto leading-relaxed mb-16 font-light">
              240m² de silencio. Materiales naturales: bambú, piedra volcánica, lino japonés. Iluminación tenue. Aroma de hinoki.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { gradient: "from-[#a8956e]/20 to-[#a8956e]/5", label: "Sala de meditación" },
                { gradient: "from-[#7d8f6e]/20 to-[#7d8f6e]/5", label: "Jardín interior" },
                { gradient: "from-[#8b7355]/20 to-[#8b7355]/5", label: "Cabinas de terapia" },
                { gradient: "from-[#6b8a8a]/20 to-[#6b8a8a]/5", label: "Zona de flotación" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${s.gradient} flex items-end p-4`}>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#f5f0eb]/40">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. EQUIPO
        ═══════════════════════════════════ */}
        <section id="equipo" className="py-24 md:py-40 px-6 md:px-16 bg-[#f5f0eb]">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a8956e] block mb-6 text-center">チーム · Equipo</span>
            <h2 className="text-4xl md:text-5xl text-center tracking-[0.02em] font-light mb-16">Nuestras manos</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {team.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[#a8956e]/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-xl text-[#a8956e]/40 tracking-widest">{m.initial}</span>
                  </div>
                  <h3 className="text-lg tracking-wide mb-1">{m.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#a8956e] mb-4">{m.role}</p>
                  <p className="text-sm text-[#2d2417]/40 font-light leading-relaxed">{m.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. TESTIMONIOS
        ═══════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#f0ebe3]">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a8956e] block mb-6 text-center">声 · Voces</span>
            <h2 className="text-4xl md:text-5xl text-center tracking-[0.02em] font-light mb-16">Experiencias</h2>

            <div className="space-y-12">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="text-center max-w-2xl mx-auto">
                  <p className="text-lg md:text-xl italic leading-[1.8] text-[#2d2417]/60 font-light mb-6">"{t.text}"</p>
                  <p className="text-sm">{t.name}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#a8956e]/50 mt-1">{t.treatment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. FAQ
        ═══════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#f5f0eb]">
          <div className="max-w-3xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a8956e] block mb-6 text-center">質問 · Preguntas</span>
            <h2 className="text-4xl md:text-5xl text-center tracking-[0.02em] font-light mb-16">Dudas frecuentes</h2>

            <div className="space-y-0">
              {faqs.map((f, i) => (
                <div key={i} className="border-b border-[#a8956e]/10">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-6 flex justify-between items-center text-left">
                    <span className="text-sm md:text-base pr-8">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#a8956e]/30 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <p className="pb-6 text-sm text-[#2d2417]/50 leading-relaxed font-light">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            8. RESERVAR / CONTACTO
        ═══════════════════════════════════ */}
        <section id="reservar" className="py-24 md:py-40 px-6 md:px-16 bg-[#2d2417]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a8956e]/50 block mb-6">予約 · Reservar</span>
            <h2 className="text-4xl md:text-6xl text-[#f5f0eb] tracking-[0.02em] font-light mb-6 leading-[1.1]">
              Tu momento<br/><span className="italic text-[#a8956e]">de quietud.</span>
            </h2>
            <p className="text-sm text-[#f5f0eb]/30 max-w-md mx-auto leading-relaxed mb-12 font-light">
              Reserva por teléfono o envíanos un email. Respondemos en menos de 2 horas durante horario de apertura.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="tel:+34955234567" className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#a8956e] text-[#2d2417] text-xs tracking-[0.2em] uppercase hover:bg-[#b8a57e] transition-colors">
                <Phone className="w-4 h-4" /> +34 955 234 567
              </a>
              <a href="mailto:paz@retirozen.es" className="flex items-center gap-3 px-8 py-4 rounded-full border border-[#a8956e]/20 text-[#a8956e] text-xs tracking-[0.2em] uppercase hover:border-[#a8956e]/50 transition-colors">
                <Mail className="w-4 h-4" /> paz@retirozen.es
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <MapPin className="w-4 h-4 text-[#a8956e]/30 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-xs text-[#f5f0eb]/30 leading-relaxed">Camino de los Alcores 12<br/>Alcalá de Guadaíra, Sevilla</p>
              </div>
              <div>
                <Clock className="w-4 h-4 text-[#a8956e]/30 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-xs text-[#f5f0eb]/30 leading-relaxed">Lun — Sáb: 9:00 — 21:00<br/>Dom: 10:00 — 14:00</p>
              </div>
              <div>
                <Leaf className="w-4 h-4 text-[#a8956e]/30 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-xs text-[#f5f0eb]/30 leading-relaxed">Parking privado gratuito<br/>Acceso adaptado</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-16 bg-[#f5f0eb] border-t border-[#a8956e]/10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#a8956e]/30">© 2026 Retiro Zen. Todos los derechos reservados.</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#a8956e]/30">禅 · Paz interior, resultados visibles.</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
