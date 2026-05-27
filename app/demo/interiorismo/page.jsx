"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin, Instagram, ChevronRight, X, Menu, Ruler, Palette, Sofa, Lamp, Eye } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const projectCategories = ["Todo", "Residencial", "Comercial", "Hospitality"];

const projects = [
  { id: 1, title: "Casa Aljarafe", cat: "Residencial", area: "180m²", location: "Sevilla", desc: "Rehabilitación integral de una casa de campo. Materiales nobles, luz natural como protagonista. Roble macizo, lino y cal.", gradient: "from-[#d4c5a9] to-[#c4b599]", year: "2025" },
  { id: 2, title: "Hotel Boutique Triana", cat: "Hospitality", area: "420m²", location: "Sevilla", desc: "12 habitaciones con identidad propia. Azulejo artesanal sevillano reinterpretado. Estilo contemporáneo mediterráneo.", gradient: "from-[#9c8b7a] to-[#8a7a69]", year: "2025" },
  { id: 3, title: "Clínica Dermis", cat: "Comercial", area: "95m²", location: "Dos Hermanas", desc: "Diseño de clínica estética. Paleta clínica cálida: blanco hueso, madera de abedul, latón cepillado.", gradient: "from-[#e8e0d0] to-[#d8d0c0]", year: "2026" },
  { id: 4, title: "Ático Nervión", cat: "Residencial", area: "140m²", location: "Sevilla", desc: "Reforma de ático con terraza panorámica. Concepto open-plan. Cocina isla de mármol travertino. Microcemento.", gradient: "from-[#b8a898] to-[#a89888]", year: "2026" },
  { id: 5, title: "Restaurante Alma", cat: "Hospitality", area: "210m²", location: "Cádiz", desc: "Gastronomía de autor con interiorismo a la altura. Bóveda de ladrillo visto, mesas de cerezo, vajilla artesanal.", gradient: "from-[#8a7a69] to-[#7a6a59]", year: "2024" },
  { id: 6, title: "Concept Store Maison", cat: "Comercial", area: "75m²", location: "Sevilla", desc: "Espacio retail de moda sostenible. Estanterías de hierro reciclado, suelos de cemento pulido, iluminación directa.", gradient: "from-[#c4b5a4] to-[#b4a594]", year: "2024" },
];

const processSteps = [
  { num: "01", title: "Escucha", desc: "Primera reunión gratuita. Entendemos tu estilo de vida, necesidades funcionales y presupuesto. Visitamos el espacio." },
  { num: "02", title: "Concepto", desc: "Moodboard + planos conceptuales. Definimos materiales, paleta cromática y distribución. Presentación con renders 3D." },
  { num: "03", title: "Proyecto", desc: "Planos técnicos de detalle, selección final de mobiliario y acabados. Presupuesto cerrado sin sorpresas." },
  { num: "04", title: "Ejecución", desc: "Coordinación de obra y proveedores. Supervisión semanal. Instalación de mobiliario y estilismo final." },
];

export default function InteriorismoDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todo");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === "Todo" ? projects : projects.filter(p => p.cat === activeFilter);

  return (
    <DemoLayout title="Maison Studio" year="2026">
      <div className="text-[#2d2d2d] selection:bg-[#9c8b7a] selection:text-white overflow-x-hidden bg-[#f5f0eb]" style={{ fontFamily: "'Georgia', serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-0 bg-[#f5f0eb] z-[90] flex flex-col p-8 md:hidden">
              <button onClick={() => setMenuOpen(false)} className="self-end mb-16"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6">
                {["Proyectos", "Proceso", "Estudio", "Contacto"].map((item, i) => (
                  <motion.a key={item} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-3xl tracking-wide font-light" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-16 py-6 flex justify-between items-center z-[80] bg-[#f5f0eb]/80 backdrop-blur-lg">
          <span className="text-xs tracking-[0.3em] uppercase text-[#9c8b7a]">Maison</span>
          <div className="hidden md:flex items-center gap-8">
            {["Proyectos", "Proceso", "Estudio", "Contacto"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] tracking-[0.15em] uppercase text-[#9c8b7a] hover:text-[#2d2d2d] transition-colors">{item}</a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-[#9c8b7a]" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — ASIMÉTRICA EDITORIAL
        ═══════════════════════════════════ */}
        <section className="min-h-screen flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col justify-center px-8 md:px-20 pt-32 md:pt-0">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#9c8b7a] block mb-8">Estudio de interiorismo · Sevilla</span>
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.1] tracking-tight mb-8">
                Espacios que<br/><span className="italic text-[#9c8b7a]">cuentan historias.</span>
              </h1>
              <p className="text-sm text-[#2d2d2d]/50 leading-relaxed max-w-md mb-10 font-light" style={{ fontFamily: "system-ui, sans-serif" }}>
                Diseñamos interiores que reflejan la esencia de quien los habita. Cada proyecto es un diálogo entre función, belleza y emoción.
              </p>
              <div className="flex items-center gap-6">
                <a href="#proyectos" className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase border-b border-[#2d2d2d] pb-1.5 hover:border-[#9c8b7a] hover:text-[#9c8b7a] transition-colors" style={{ fontFamily: "system-ui" }}>
                  Ver proyectos <ArrowUpRight className="w-3 h-3" />
                </a>
                <a href="#contacto" className="text-xs tracking-[0.15em] uppercase text-[#9c8b7a] hover:text-[#2d2d2d] transition-colors" style={{ fontFamily: "system-ui" }}>Contactar</a>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 min-h-[50vh] md:min-h-0 m-4 md:m-8 rounded-3xl bg-gradient-to-br from-[#d4c5a9] via-[#c4b599] to-[#b4a589] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[20vw] font-extralight tracking-tighter text-white/[0.06] select-none">M</span>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            2. STATS
        ═══════════════════════════════════ */}
        <section className="py-16 md:py-24 px-8 md:px-20 border-y border-[#9c8b7a]/10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "47", l: "Proyectos realizados" }, { n: "12", l: "Años de experiencia" },
              { n: "98%", l: "Clientes satisfechos" }, { n: "6", l: "Premios de diseño" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center md:text-left">
                <span className="text-4xl md:text-5xl font-light tracking-tight text-[#9c8b7a]">{s.n}</span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#2d2d2d]/30 mt-2" style={{ fontFamily: "system-ui" }}>{s.l}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. PROYECTOS — GRID CON FILTRO
        ═══════════════════════════════════ */}
        <section id="proyectos" className="py-20 md:py-32 px-8 md:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#9c8b7a] block mb-4">Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">Nuestros proyectos</h2>
              </div>
              <div className="flex gap-2" style={{ fontFamily: "system-ui" }}>
                {projectCategories.map(c => (
                  <button key={c} onClick={() => setActiveFilter(c)}
                    className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase rounded-full border transition-all ${activeFilter === c ? 'bg-[#2d2d2d] text-white border-[#2d2d2d]' : 'border-[#9c8b7a]/20 text-[#9c8b7a] hover:border-[#9c8b7a]/50'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                    className="group cursor-pointer" onClick={() => setSelectedProject(p)}>
                    <div className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${p.gradient} relative overflow-hidden mb-4`}>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 text-[8px] tracking-[0.15em] uppercase bg-white/80 text-[#2d2d2d] rounded-full backdrop-blur-sm" style={{ fontFamily: "system-ui" }}>{p.cat}</span>
                        <span className="px-2.5 py-1 text-[8px] tracking-[0.15em] uppercase bg-white/80 text-[#2d2d2d] rounded-full backdrop-blur-sm" style={{ fontFamily: "system-ui" }}>{p.area}</span>
                      </div>
                      <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-sm"><Eye className="w-4 h-4 text-[#2d2d2d]" /></div>
                      </div>
                    </div>
                    <h3 className="text-xl tracking-tight group-hover:text-[#9c8b7a] transition-colors">{p.title}</h3>
                    <p className="text-xs text-[#2d2d2d]/40 mt-1" style={{ fontFamily: "system-ui" }}>{p.location} — {p.year}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ═══ PROJECT MODAL ═══ */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-black/30 backdrop-blur-md z-[100]" />
              <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
                className="fixed inset-4 md:inset-12 bg-[#f5f0eb] rounded-3xl z-[101] overflow-y-auto p-8 md:p-16 border border-[#9c8b7a]/10">
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6"><X className="w-5 h-5 text-[#9c8b7a]" /></button>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#9c8b7a]">{selectedProject.cat} · {selectedProject.area} · {selectedProject.location}</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-4 mb-6">{selectedProject.title}</h2>
                <p className="text-base text-[#2d2d2d]/60 leading-relaxed max-w-2xl mb-8 font-light">{selectedProject.desc}</p>
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${selectedProject.gradient}`} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════
            4. PROCESO — NUMBERED STEPS
        ═══════════════════════════════════ */}
        <section id="proceso" className="py-20 md:py-32 px-8 md:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#9c8b7a] block mb-4">Metodología</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16">Cómo trabajamos</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              {processSteps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                  <span className="text-5xl font-light text-[#9c8b7a]/20 block mb-4">{s.num}</span>
                  <h3 className="text-lg tracking-wide mb-3">{s.title}</h3>
                  <p className="text-xs text-[#2d2d2d]/40 leading-relaxed font-light" style={{ fontFamily: "system-ui" }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. SERVICIOS
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-8 md:px-20 bg-[#f5f0eb]">
          <div className="max-w-6xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#9c8b7a] block mb-4">Servicios</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16">Lo que ofrecemos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Ruler, title: "Diseño de Interiores", price: "Desde 45€/m²", desc: "Proyecto integral: distribución, materiales, iluminación, mobiliario y decoración." },
                { icon: Palette, title: "Asesoría de Color", price: "Desde 300€", desc: "Estudio cromático personalizado para tu espacio. Incluye muestrario físico." },
                { icon: Sofa, title: "Home Staging", price: "Desde 500€", desc: "Preparación de inmuebles para venta o alquiler. Incrementa el valor percibido hasta un 20%." },
                { icon: Lamp, title: "Proyecto de Iluminación", price: "Desde 25€/m²", desc: "Diseño lumínico técnico y decorativo. Selección de luminarias y programación de escenas." },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-[#9c8b7a]/10 bg-white hover:border-[#9c8b7a]/30 transition-colors group">
                  <div className="flex items-start justify-between mb-6">
                    <s.icon className="w-6 h-6 text-[#9c8b7a]/40 group-hover:text-[#9c8b7a] transition-colors" strokeWidth={1.5} />
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#9c8b7a]/50" style={{ fontFamily: "system-ui" }}>{s.price}</span>
                  </div>
                  <h3 className="text-xl tracking-tight mb-3">{s.title}</h3>
                  <p className="text-xs text-[#2d2d2d]/40 leading-relaxed font-light" style={{ fontFamily: "system-ui" }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. ESTUDIO — ABOUT
        ═══════════════════════════════════ */}
        <section id="estudio" className="py-20 md:py-32 px-8 md:px-20 bg-[#2d2d2d] text-[#f5f0eb]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#9c8b7a]/50 block mb-6">Sobre nosotras</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Maison Studio</h2>
            <p className="text-base md:text-lg text-[#f5f0eb]/50 leading-[1.8] max-w-2xl mx-auto mb-12 font-light">
              Fundado en 2014 por Elena Vázquez y Marta del Río. Dos arquitectas sevillanas obsesionadas con los detalles. 
              Creemos que un espacio bien diseñado cambia la forma en que vives, trabajas y sientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto">
              {[
                { name: "Elena Vázquez", role: "Co-fundadora · Directora Creativa" },
                { name: "Marta del Río", role: "Co-fundadora · Directora Técnica" },
              ].map((m, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#9c8b7a]/15 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg text-[#9c8b7a]/50">{m.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-sm">{m.name}</h3>
                  <p className="text-[10px] text-[#f5f0eb]/30 tracking-[0.15em] uppercase mt-1" style={{ fontFamily: "system-ui" }}>{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. CONTACTO
        ═══════════════════════════════════ */}
        <section id="contacto" className="py-20 md:py-32 px-8 md:px-20 bg-[#f5f0eb]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#9c8b7a] block mb-4">Contacto</span>
                <h2 className="text-4xl font-light tracking-tight mb-6">Hablemos de<br/><span className="italic text-[#9c8b7a]">tu proyecto.</span></h2>
                <p className="text-sm text-[#2d2d2d]/40 leading-relaxed mb-8 font-light" style={{ fontFamily: "system-ui" }}>
                  La primera consulta es gratuita. Cuéntanos qué tienes en mente y encontraremos la mejor forma de hacerlo realidad.
                </p>
                <div className="space-y-4" style={{ fontFamily: "system-ui" }}>
                  <a href="tel:+34955345678" className="flex items-center gap-3 text-sm text-[#2d2d2d]/60 hover:text-[#9c8b7a] transition-colors">
                    <Phone className="w-4 h-4" /> +34 955 345 678
                  </a>
                  <a href="mailto:hola@maisonstudio.es" className="flex items-center gap-3 text-sm text-[#2d2d2d]/60 hover:text-[#9c8b7a] transition-colors">
                    <Mail className="w-4 h-4" /> hola@maisonstudio.es
                  </a>
                  <div className="flex items-center gap-3 text-sm text-[#2d2d2d]/60">
                    <MapPin className="w-4 h-4" /> Calle Feria 28, Bajo A, Sevilla
                  </div>
                  <a href="#" className="flex items-center gap-3 text-sm text-[#2d2d2d]/60 hover:text-[#9c8b7a] transition-colors">
                    <Instagram className="w-4 h-4" /> @maisonstudio
                  </a>
                </div>
              </div>
              <div className="space-y-4" style={{ fontFamily: "system-ui" }}>
                <input type="text" placeholder="Nombre" className="w-full px-0 py-3 text-sm border-b border-[#9c8b7a]/15 outline-none focus:border-[#9c8b7a] transition-colors bg-transparent placeholder:text-[#2d2d2d]/20" />
                <input type="email" placeholder="Email" className="w-full px-0 py-3 text-sm border-b border-[#9c8b7a]/15 outline-none focus:border-[#9c8b7a] transition-colors bg-transparent placeholder:text-[#2d2d2d]/20" />
                <select className="w-full px-0 py-3 text-sm border-b border-[#9c8b7a]/15 outline-none focus:border-[#9c8b7a] transition-colors bg-transparent text-[#2d2d2d]/40">
                  <option>Tipo de proyecto</option>
                  <option>Residencial</option>
                  <option>Comercial</option>
                  <option>Hospitality</option>
                </select>
                <textarea placeholder="Cuéntanos sobre tu proyecto..." rows={4}
                  className="w-full px-0 py-3 text-sm border-b border-[#9c8b7a]/15 outline-none focus:border-[#9c8b7a] transition-colors bg-transparent placeholder:text-[#2d2d2d]/20 resize-none" />
                <button className="mt-4 px-8 py-3 bg-[#2d2d2d] text-white text-xs tracking-[0.15em] uppercase rounded-full hover:bg-[#9c8b7a] transition-colors">Enviar consulta</button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-8 md:px-20 border-t border-[#9c8b7a]/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: "system-ui" }}>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#9c8b7a]/30">© 2026 Maison Studio. Interiorismo con alma.</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#9c8b7a]/30">Sevilla, Andalucía</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
