"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Home, Bed, Bath, Maximize, ArrowRight, X, Menu, Search, Heart, Building, Star, ChevronDown } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const properties = [
  { id: 1, title: "Ático con Terraza Panorámica", location: "Nervión, Sevilla", price: "520.000€", beds: 3, baths: 2, area: "165m²", type: "Ático", gradient: "from-[#1a2744] to-[#2a3a5a]", featured: true },
  { id: 2, title: "Villa con Piscina Infinity", location: "Aljarafe, Sevilla", price: "890.000€", beds: 5, baths: 3, area: "340m²", type: "Villa", gradient: "from-[#2a3a5a] to-[#1a2744]", featured: true },
  { id: 3, title: "Piso Reformado Centro Histórico", location: "Santa Cruz, Sevilla", price: "385.000€", beds: 2, baths: 1, area: "95m²", type: "Piso", gradient: "from-[#b8960c]/20 to-[#b8960c]/10", featured: false },
  { id: 4, title: "Cortijo Restaurado con Olivar", location: "Carmona, Sevilla", price: "1.250.000€", beds: 6, baths: 4, area: "520m²", type: "Finca", gradient: "from-[#3a4a6a] to-[#2a3a5a]", featured: false },
  { id: 5, title: "Loft Industrial Reconvertido", location: "Triana, Sevilla", price: "295.000€", beds: 1, baths: 1, area: "85m²", type: "Loft", gradient: "from-[#1a2744] to-[#0f172a]", featured: false },
  { id: 6, title: "Chalet Pareado con Jardín", location: "Dos Hermanas", price: "425.000€", beds: 4, baths: 2, area: "210m²", type: "Chalet", gradient: "from-[#2a3a5a] to-[#3a4a6a]", featured: true },
];

const services = [
  { title: "Compra", desc: "Te acompañamos en todo el proceso: búsqueda, visitas, negociación, financiación y notaría." },
  { title: "Venta", desc: "Valoración profesional, fotografía premium, marketing digital y gestión de visitas cualificadas." },
  { title: "Inversión", desc: "Análisis de rentabilidad, gestión de patrimonio inmobiliario y asesoría fiscal especializada." },
  { title: "Alquiler Premium", desc: "Selección de inquilinos, contratos blindados, gestión integral y mantenimiento del inmueble." },
];

const team = [
  { name: "Antonio Delgado", role: "Director · Fundador", exp: "22 años en el sector" },
  { name: "Isabel Torres", role: "Directora Comercial", exp: "15 años, especialista lujo" },
  { name: "Miguel Ángel Vega", role: "Asesor Financiero", exp: "Banca privada 12 años" },
];

const stats = [
  { value: "350+", label: "Propiedades vendidas" },
  { value: "98%", label: "Satisfacción cliente" },
  { value: "45", label: "Días venta media" },
  { value: "22", label: "Años de experiencia" },
];

export default function InmobiliariaDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todo");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const types = ["Todo", "Ático", "Villa", "Piso", "Finca", "Loft", "Chalet"];
  const filtered = activeFilter === "Todo" ? properties : properties.filter(p => p.type === activeFilter);

  return (
    <DemoLayout title="Meridian" year="2026">
      <div className="text-white selection:bg-[#b8960c] selection:text-[#0f172a] overflow-x-hidden bg-[#0f172a]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0f172a] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Propiedades", "Servicios", "Equipo", "Contacto"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-2xl font-light tracking-wide" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[80] bg-[#0f172a]/90 backdrop-blur-xl border-b border-[#b8960c]/5">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#b8960c]" />
            <span className="text-sm font-medium tracking-[0.15em] text-[#b8960c]">MERIDIAN</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Propiedades", "Servicios", "Equipo"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-white/40 hover:text-[#b8960c] transition-colors">{item}</a>
            ))}
            <a href="#contacto" className="px-5 py-2 border border-[#b8960c]/30 text-[#b8960c] text-xs tracking-[0.1em] hover:bg-[#b8960c] hover:text-[#0f172a] transition-all">Contactar</a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-[#b8960c]" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — LUXURY NAVY
        ═══════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#162042] to-[#0f172a]" />
          <div className="absolute bottom-0 right-0 w-[40%] h-[60%] bg-gradient-to-tl from-[#b8960c]/5 to-transparent" />

          <div className="relative z-10 max-w-5xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="w-12 h-[1px] bg-[#b8960c]/30 mb-8" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#b8960c]/50 block mb-6">Inmobiliaria de prestigio · Sevilla</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.1] tracking-tight mb-8" style={{ fontFamily: "Georgia, serif" }}>
              Propiedades que<br/>
              <span className="italic text-[#b8960c]">definen un estilo de vida.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-base text-white/30 max-w-lg mb-10 leading-relaxed">
              Más de 20 años seleccionando las mejores propiedades del mercado sevillano. Asesoramiento integral y exclusivo.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex gap-4">
              <a href="#propiedades" className="px-8 py-3.5 bg-[#b8960c] text-[#0f172a] text-xs font-semibold tracking-[0.1em] hover:bg-[#c9a71d] transition-colors">Ver Propiedades</a>
              <a href="#contacto" className="px-8 py-3.5 border border-white/10 text-white/60 text-xs tracking-[0.1em] hover:border-[#b8960c]/30 hover:text-[#b8960c] transition-all">Contactar</a>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="relative z-10 max-w-5xl mx-auto w-full mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 border-t border-[#b8960c]/10">
            {stats.map((s, i) => (
              <div key={i}>
                <span className="text-3xl font-light text-[#b8960c]" style={{ fontFamily: "Georgia, serif" }}>{s.value}</span>
                <p className="text-[10px] text-white/20 tracking-wide uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            2. PROPIEDADES — GRID
        ═══════════════════════════════════ */}
        <section id="propiedades" className="py-20 md:py-32 px-6 md:px-16 bg-[#0a0f1e]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#b8960c] block mb-3">Portfolio</span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: "Georgia, serif" }}>Propiedades destacadas</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {types.slice(0, 5).map(t => (
                  <button key={t} onClick={() => setActiveFilter(t)}
                    className={`px-4 py-2 text-[10px] tracking-[0.1em] uppercase border transition-all whitespace-nowrap ${activeFilter === t ? 'border-[#b8960c] bg-[#b8960c]/10 text-[#b8960c]' : 'border-white/5 text-white/30 hover:border-white/10'}`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                    className="group cursor-pointer" onClick={() => setSelectedProperty(p)}>
                    <div className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} relative overflow-hidden mb-4`}>
                      {p.featured && <span className="absolute top-3 left-3 px-2 py-1 text-[8px] tracking-wide uppercase bg-[#b8960c] text-[#0f172a] font-semibold">Destacada</span>}
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute bottom-3 left-3 right-3 flex gap-3">
                        <span className="flex items-center gap-1 text-[10px] text-white/50"><Bed className="w-3 h-3" />{p.beds}</span>
                        <span className="flex items-center gap-1 text-[10px] text-white/50"><Bath className="w-3 h-3" />{p.baths}</span>
                        <span className="flex items-center gap-1 text-[10px] text-white/50"><Maximize className="w-3 h-3" />{p.area}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium group-hover:text-[#b8960c] transition-colors">{p.title}</h3>
                        <p className="text-[10px] text-white/30 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#b8960c]">{p.price}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ═══ PROPERTY MODAL ═══ */}
        <AnimatePresence>
          {selectedProperty && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedProperty(null)} className="fixed inset-0 bg-black/50 backdrop-blur-md z-[100]" />
              <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 80 }}
                className="fixed inset-4 md:inset-12 bg-[#0f172a] z-[101] overflow-y-auto p-8 md:p-16 border border-[#b8960c]/10">
                <button onClick={() => setSelectedProperty(null)} className="absolute top-6 right-6"><X className="w-5 h-5 text-[#b8960c]" /></button>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#b8960c]/50">{selectedProperty.type} · {selectedProperty.location}</span>
                <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-3 mb-4" style={{ fontFamily: "Georgia, serif" }}>{selectedProperty.title}</h2>
                <span className="text-3xl text-[#b8960c] font-light">{selectedProperty.price}</span>
                <div className="flex gap-6 mt-6 mb-8">
                  <span className="flex items-center gap-2 text-sm text-white/40"><Bed className="w-4 h-4" />{selectedProperty.beds} hab.</span>
                  <span className="flex items-center gap-2 text-sm text-white/40"><Bath className="w-4 h-4" />{selectedProperty.baths} baños</span>
                  <span className="flex items-center gap-2 text-sm text-white/40"><Maximize className="w-4 h-4" />{selectedProperty.area}</span>
                </div>
                <div className={`aspect-video bg-gradient-to-br ${selectedProperty.gradient} mb-8`} />
                <a href="#contacto" onClick={() => setSelectedProperty(null)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#b8960c] text-[#0f172a] text-xs font-semibold tracking-[0.1em] hover:bg-[#c9a71d] transition-colors">
                  Solicitar Visita <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════
            3. SERVICIOS
        ═══════════════════════════════════ */}
        <section id="servicios" className="py-20 md:py-32 px-6 md:px-16 bg-[#0f172a]">
          <div className="max-w-5xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#b8960c] block mb-3">Servicios</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-16" style={{ fontFamily: "Georgia, serif" }}>Lo que ofrecemos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 md:p-8 border border-white/5 hover:border-[#b8960c]/20 transition-colors group">
                  <span className="text-xs text-[#b8960c]/30 font-medium">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-medium mt-4 mb-3 group-hover:text-[#b8960c] transition-colors" style={{ fontFamily: "Georgia, serif" }}>{s.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. EQUIPO
        ═══════════════════════════════════ */}
        <section id="equipo" className="py-20 md:py-32 px-6 md:px-16 bg-[#0a0f1e]">
          <div className="max-w-5xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#b8960c] block mb-3">Equipo</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-16" style={{ fontFamily: "Georgia, serif" }}>Profesionales de confianza</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 border border-[#b8960c]/15 flex items-center justify-center">
                    <span className="text-lg font-light text-[#b8960c]/40">{m.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-sm font-medium">{m.name}</h3>
                  <p className="text-[10px] text-[#b8960c]/50 mt-1">{m.role}</p>
                  <p className="text-[10px] text-white/20 mt-1">{m.exp}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. CONTACTO
        ═══════════════════════════════════ */}
        <section id="contacto" className="py-20 md:py-32 px-6 md:px-16 bg-[#0f172a]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#b8960c] block mb-3">Contacto</span>
                <h2 className="text-3xl font-light tracking-tight mb-6" style={{ fontFamily: "Georgia, serif" }}>
                  Hablemos de su<br/><span className="italic text-[#b8960c]">próxima propiedad.</span>
                </h2>
                <div className="space-y-4 text-sm text-white/40">
                  <a href="tel:+34955678901" className="flex items-center gap-3 hover:text-[#b8960c] transition-colors"><Phone className="w-4 h-4" /> +34 955 678 901</a>
                  <a href="mailto:info@meridian.es" className="flex items-center gap-3 hover:text-[#b8960c] transition-colors"><Mail className="w-4 h-4" /> info@meridian.es</a>
                  <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> Av. de la Palmera 32, Sevilla</div>
                </div>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Nombre completo" className="w-full px-0 py-3 text-sm bg-transparent border-b border-white/5 outline-none focus:border-[#b8960c]/30 transition-colors placeholder:text-white/15" />
                <input type="email" placeholder="Email" className="w-full px-0 py-3 text-sm bg-transparent border-b border-white/5 outline-none focus:border-[#b8960c]/30 transition-colors placeholder:text-white/15" />
                <input type="tel" placeholder="Teléfono" className="w-full px-0 py-3 text-sm bg-transparent border-b border-white/5 outline-none focus:border-[#b8960c]/30 transition-colors placeholder:text-white/15" />
                <select className="w-full px-0 py-3 text-sm bg-transparent border-b border-white/5 outline-none focus:border-[#b8960c]/30 transition-colors text-white/30">
                  <option>Interés</option><option>Comprar</option><option>Vender</option><option>Invertir</option><option>Alquilar</option>
                </select>
                <button className="mt-4 px-8 py-3 bg-[#b8960c] text-[#0f172a] text-xs font-semibold tracking-[0.1em] hover:bg-[#c9a71d] transition-colors">Enviar Consulta</button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-16 border-t border-[#b8960c]/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2"><Building className="w-3 h-3 text-[#b8960c]/20" /><p className="text-[10px] text-white/15">© 2026 Meridian Inmobiliaria S.L.</p></div>
            <p className="text-[10px] text-white/15">Av. de la Palmera 32, Sevilla</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
