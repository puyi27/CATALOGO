"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import DemoLayout from "@/components/DemoLayout";
import {
  ArrowLeft, Menu, X, ChevronDown, Phone, Mail, MapPin,
  Shield, Cog, Zap, Award, TrendingUp, Users, Factory, Star
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const services = [
  { icon: Cog, title: "Mecanizado CNC", desc: "Fresado y torneado de precisión en 5 ejes. Tolerancias de hasta ±0,001 mm en acero, aluminio y titanio.", price: "Desde 85 €/h" },
  { icon: Zap, title: "Corte por Láser", desc: "Corte de chapa hasta 30 mm de espesor. Tecnología fiber laser CO₂ de última generación.", price: "Desde 60 €/h" },
  { icon: Factory, title: "Soldadura Industrial", desc: "Soldadura TIG/MIG robótica y manual. Certificados EN ISO 3834-2 para estructuras críticas.", price: "Desde 75 €/h" },
  { icon: Shield, title: "Tratamientos de Superficie", desc: "Galvanizado, fosfatado, pintado en polvo y anodizado. Control de calidad por lotes.", price: "Consultar" },
  { icon: TrendingUp, title: "Ingeniería y Diseño", desc: "Oficina técnica propia. Diseño CAD/CAM, simulación FEM y prototipado rápido en 48h.", price: "Desde 95 €/h" },
  { icon: Award, title: "Control de Calidad", desc: "Laboratorio de metrología interno. Certificación ISO 9001:2015. Trazabilidad total de materiales.", price: "Incluido" },
];

const projects = [
  { name: "Estructura Puente Ronda", sector: "Obra Civil", tons: "240 t", color: "from-orange-900 to-stone-900" },
  { name: "Chasis Tren AVE S106", sector: "Ferroviario", tons: "18 t", color: "from-slate-800 to-zinc-900" },
  { name: "Silo Industrial Écija", sector: "Agro-Industrial", tons: "85 t", color: "from-amber-900 to-stone-800" },
  { name: "Módulos Offshore Huelva", sector: "Energía", tons: "320 t", color: "from-blue-900 to-slate-900" },
  { name: "Torres Eólicas Cádiz", sector: "Renovables", tons: "190 t", color: "from-green-900 to-emerald-900" },
  { name: "Pasarela Aeropuerto SVQ", sector: "Aeronáutica", tons: "42 t", color: "from-red-900 to-stone-900" },
];

const team = [
  { name: "Rodrigo Fernández Mora", role: "Director Técnico", exp: "22 años", color: "from-orange-600 to-amber-700" },
  { name: "Carmen Jiménez Roldán", role: "Jefa de Producción", exp: "15 años", color: "from-slate-600 to-zinc-700" },
  { name: "Pablo Ortiz Navarro", role: "Ingeniería & CAD", exp: "12 años", color: "from-stone-600 to-neutral-700" },
  { name: "Isabel Santos Fuentes", role: "Control de Calidad", exp: "10 años", color: "from-amber-700 to-orange-800" },
];

const testimonials = [
  { name: "Miguel Ángel Serrano", company: "Constructora Serrano Hnos.", text: "Metálicas Solano entregó las 240 toneladas de estructura en un plazo imposible. Calidad perfecta, sin una sola no conformidad.", stars: 5 },
  { name: "Laura Domínguez", company: "Renfe Operadora", text: "Llevamos 8 años trabajando con ellos para proyectos ferroviarios. Precisión, fiabilidad y siempre cumplen con la normativa EN.", stars: 5 },
  { name: "Antonio Ramos Vega", company: "Siemens Gamesa Renewable", text: "Su capacidad para absorber variaciones de diseño en tiempo real es excepcional. El mejor taller de la región sin duda.", stars: 5 },
];

const faqs = [
  { q: "¿Cuál es vuestra capacidad máxima de producción?", a: "Contamos con 4.200 m² de nave industrial con dos puentes grúa de 20 toneladas, 12 centros de mecanizado CNC y una capacidad de producción de hasta 150 toneladas mensuales de estructura metálica." },
  { q: "¿Trabajan con materiales especiales?", a: "Sí. Procesamos acero al carbono, acero inoxidable (304/316L), aluminio, titanio grado 5 y aleaciones de nickel para aplicaciones aeroespaciales y offshore." },
  { q: "¿Ofrecen diseño y ingeniería propios?", a: "Contamos con oficina técnica interna de 6 ingenieros industriales. Realizamos diseño CAD/CAM, cálculo estructural, simulación FEM y supervisión de montaje en obra." },
  { q: "¿Qué certificaciones tienen?", a: "ISO 9001:2015, ISO 3834-2 (soldadura de estructuras), marcado CE EXC3 y homologación Renfe para fabricación de componentes ferroviarios." },
  { q: "¿Pueden gestionar proyectos llave en mano?", a: "Absolutamente. Ofrecemos servicio integral desde el diseño hasta el montaje final en obra, incluyendo transporte especial y grúa de montaje." },
];

const stats = [
  { value: "28", suffix: " años", label: "de experiencia" },
  { value: "+2.400", suffix: " t", label: "fabricadas en 2025" },
  { value: "99.2", suffix: "%", label: "entregas en plazo" },
  { value: "ISO", suffix: " 9001", label: "certificados" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.replace(/[0-9.,]/g, "").trim();
    if (isNaN(numeric)) { setDisplay(value); return; }
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = numeric / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) { setDisplay(prefix + numeric.toLocaleString("es-ES")); clearInterval(timer); }
      else setDisplay(prefix + Math.floor(start).toLocaleString("es-ES"));
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function MetalSolanoDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <DemoLayout title="Metálicas Solano" year="2026">
      <div className="bg-[#0f0f0f] text-white font-sans overflow-x-hidden">

        {/* NAV */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <Factory size={16} className="text-white" />
              </div>
              <span className="font-bold tracking-wider text-sm md:text-base uppercase">Metálicas Solano</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-neutral-400">
              {["Servicios","Proyectos","Equipo","Contacto"].map(l => (
                <span key={l} className="hover:text-orange-500 transition-colors cursor-pointer">{l}</span>
              ))}
            </div>
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2">
              <Menu size={22} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-[200] bg-[#0f0f0f] flex flex-col p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-bold text-lg uppercase tracking-wider">Metálicas Solano</span>
                <button onClick={() => setMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-8">
                {["Servicios","Proyectos","Equipo","FAQ","Contacto"].map((item, i) => (
                  <motion.span key={item} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-3xl font-bold uppercase tracking-tight hover:text-orange-500 transition-colors cursor-pointer"
                    onClick={() => setMenuOpen(false)}>
                    {item}
                  </motion.span>
                ))}
              </div>
              <div className="mt-auto text-neutral-600 text-sm">
                <p>+34 954 231 870</p>
                <p>info@metalicassolano.es</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0800] via-[#0f0f0f] to-[#0a0a1a]" />
            {/* Geometric industrial pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#f97316" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-mono mb-6">
                Est. 1997 · Sevilla, España · ISO 9001:2015
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Fabricación<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                  Industrial
                </span><br />
                de Precisión
              </h1>
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                28 años fabricando estructuras metálicas, componentes de precisión y soluciones de ingeniería para los sectores más exigentes de España y Europa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="bg-orange-500 text-black font-black uppercase tracking-wider px-8 py-4 hover:bg-orange-400 transition-colors">
                  Solicitar Presupuesto
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="border border-white/20 text-white uppercase tracking-wider px-8 py-4 hover:border-orange-500 hover:text-orange-500 transition-colors">
                  Ver Proyectos
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-neutral-600">
            <ChevronDown size={20} />
          </motion.div>
        </section>

        {/* STATS */}
        <section className="py-16 md:py-20 bg-[#111] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-neutral-500 uppercase tracking-widest text-xs">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 md:py-32 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
              <p className="text-orange-500 uppercase tracking-[0.3em] text-xs font-mono mb-4">Nuestros Servicios</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Capacidades<br /><span className="text-neutral-600">Productivas</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ borderColor: "rgba(249,115,22,0.5)", y: -4 }}
                  className="border border-white/5 bg-[#111] p-6 md:p-8 group transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <s.icon size={22} className="text-orange-500" />
                    </div>
                    <span className="text-orange-500 font-mono text-sm font-bold">{s.price}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="py-24 md:py-32 bg-[#111]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
              <p className="text-orange-500 uppercase tracking-[0.3em] text-xs font-mono mb-4">Proyectos Destacados</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Obras<br /><span className="text-neutral-600">Realizadas</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-br ${p.color} h-48 md:h-56 p-6 flex flex-col justify-between cursor-pointer border border-white/5 transition-all duration-300`}>
                  <div className="flex justify-between items-start">
                    <span className="text-orange-400 text-xs uppercase tracking-widest font-mono">{p.sector}</span>
                    <span className="text-white/40 text-xs font-mono">{p.tons}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{p.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-24 md:py-32 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
              <p className="text-orange-500 uppercase tracking-[0.3em] text-xs font-mono mb-4">Nuestro Equipo</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Las Personas<br /><span className="text-neutral-600">Detrás</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((t, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -6 }} className="group">
                  <div className={`h-56 bg-gradient-to-br ${t.color} mb-4 flex items-end p-4 relative overflow-hidden`}>
                    <div className="absolute top-4 right-4 text-white/30 font-mono text-xs">{t.exp}</div>
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "8px 8px" }} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-orange-500 transition-colors">{t.name}</h3>
                  <p className="text-neutral-500 text-sm uppercase tracking-widest">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 md:py-32 bg-[#111]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
              <p className="text-orange-500 uppercase tracking-[0.3em] text-xs font-mono mb-4">Clientes Satisfechos</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Lo Que Dicen<br /><span className="text-neutral-600">de Nosotros</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="bg-[#0f0f0f] border border-white/5 p-6 md:p-8">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, s) => <Star key={s} size={14} className="text-orange-500 fill-orange-500" />)}
                  </div>
                  <p className="text-neutral-300 leading-relaxed mb-8 text-sm md:text-base italic">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-neutral-600 text-xs uppercase tracking-widest mt-1">{t.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32 bg-[#0f0f0f]">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
              <p className="text-orange-500 uppercase tracking-[0.3em] text-xs font-mono mb-4">Preguntas Frecuentes</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">FAQ</h2>
            </motion.div>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="border border-white/5 bg-[#111]">
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-5 md:p-6 text-left">
                    <span className="font-semibold text-sm md:text-base pr-4">{f.q}</span>
                    <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                      <ChevronDown size={18} className="text-orange-500 shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <p className="px-5 md:px-6 pb-6 text-neutral-400 text-sm leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="py-24 md:py-32 bg-[#111]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="text-orange-500 uppercase tracking-[0.3em] text-xs font-mono mb-4">Contacto</p>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                  Hablemos de<br /><span className="text-orange-500">su Proyecto</span>
                </h2>
                <div className="space-y-6 text-neutral-400">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <MapPin size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Dirección</p>
                      <p className="text-sm">Polígono Industrial Los Olivares, Nave 14<br />41500 Alcalá de Guadaíra, Sevilla</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <Phone size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Teléfono</p>
                      <p className="text-sm">+34 954 231 870</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <Mail size={16} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Email</p>
                      <p className="text-sm">info@metalicassolano.es</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {formSent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                    <div className="w-16 h-16 bg-orange-500/20 flex items-center justify-center">
                      <Award size={32} className="text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold">¡Solicitud Recibida!</h3>
                    <p className="text-neutral-400">Nos pondremos en contacto en menos de 24h laborables.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Nombre *</label>
                        <input required type="text" className="w-full bg-[#0f0f0f] border border-white/10 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="Su nombre" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Empresa</label>
                        <input type="text" className="w-full bg-[#0f0f0f] border border-white/10 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="Empresa S.L." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email *</label>
                      <input required type="email" className="w-full bg-[#0f0f0f] border border-white/10 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="correo@empresa.es" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Servicio de Interés</label>
                      <select className="w-full bg-[#0f0f0f] border border-white/10 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors text-neutral-300">
                        {services.map(s => <option key={s.title} className="bg-[#111]">{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Descripción del Proyecto *</label>
                      <textarea required rows={4} className="w-full bg-[#0f0f0f] border border-white/10 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors resize-none" placeholder="Describa brevemente su proyecto..." />
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-orange-500 text-black font-black uppercase tracking-wider py-4 hover:bg-orange-400 transition-colors">
                      Enviar Solicitud de Presupuesto
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 bg-[#0a0a0a] py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <Factory size={16} />
              </div>
              <span className="font-bold uppercase tracking-wider text-sm">Metálicas Solano S.L.</span>
            </div>
            <p className="text-neutral-600 text-xs text-center">
              © 2026 Metálicas Solano S.L. · CIF B-41023487 · Pol. Ind. Los Olivares, Alcalá de Guadaíra
            </p>
            <div className="flex gap-6 text-neutral-600 text-xs uppercase tracking-widest">
              <span className="hover:text-white transition-colors cursor-pointer">Privacidad</span>
              <span className="hover:text-white transition-colors cursor-pointer">Aviso Legal</span>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
