"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Leaf, Wind, Sun, Droplets, Zap, ChevronRight, ArrowUpRight, BarChart3, Globe, Recycle, Battery } from 'lucide-react';
import Link from 'next/link';

const metrics = [
  { icon: Zap, label: 'Energía Solar Generada', value: '847', unit: 'MWh', desc: 'Este año', color: '#e8b84b' },
  { icon: Droplets, label: 'Agua Reciclada', value: '92', unit: '%', desc: 'Del consumo total', color: '#4bb5e8' },
  { icon: Recycle, label: 'Residuo Cero', value: '0.8', unit: 'T/año', desc: 'Residuos no reciclados', color: '#7ab87a' },
  { icon: Globe, label: 'Huella de Carbono', value: '-68', unit: '%', desc: 'vs. industria media', color: '#9ab489' },
];

const products = [
  { id: 1, name: 'Panel Solar FlexSeries 420W', cat: 'Energía', price: '€389/ud', desc: 'Monocristalino de alta eficiencia. Rendimiento garantizado 25 años. Certificado TÜV.', badge: 'Bestseller', img: 'https://loremflickr.com/1000/1000/nature,green/all?lock=1' },
  { id: 2, name: 'Batería LiFePO4 10kWh', cat: 'Almacenamiento', price: '€2.890', desc: 'Ciclos: 6.000+. BMS integrado. Compatible Victron & SolarEdge. Garantía 10 años.', badge: 'Nuevo', img: 'https://loremflickr.com/1000/1000/nature,green/all?lock=2' },
  { id: 3, name: 'Aerogenerador Micro 2kW', cat: 'Eólica', price: '€1.450', desc: 'Silencioso, para instalaciones rurales. Start-up a 2.5 m/s. Eje vertical VAWT.', badge: 'Eco+', img: 'https://loremflickr.com/1000/1000/nature,green/all?lock=3' },
];

const manifesto = [
  { num: '01', title: 'Diseñamos para el planeta', text: 'Cada producto que comercializamos pasa por nuestra auditoría de ciclo de vida completo. Nada de greenwashing.' },
  { num: '02', title: 'Tecnología regenerativa', text: 'No solo reducimos el daño. Buscamos productos que restauran activamente ecosistemas, no que simplemente lo mitigan.' },
  { num: '03', title: 'Transparencia radical', text: 'Nuestros informes de impacto son públicos y auditados por terceros. Aquí los datos no mienten.' },
];

function useLiveStat(base, variance, interval) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const id = setInterval(() => setVal(base + (Math.random() * variance - variance / 2)), interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return val.toFixed(1);
}

export default function SostenibilidadDemo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const co2 = useLiveStat(23.4, 1.2, 2000);

  return (
    <div className="min-h-screen bg-[#DDE5D4] text-[#2C3E2A] font-sans selection:bg-[#2C3E2A] selection:text-[#DDE5D4] overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed w-full px-6 md:px-10 py-5 flex justify-between items-center z-50 bg-[#DDE5D4]/90 backdrop-blur-md border-b border-[#9AB489]/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2C3E2A] rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4 text-[#DDE5D4]" />
          </div>
          <span className="font-bold tracking-tight text-lg">EcoTech<span className="font-light"> Solutions</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['Productos', 'Impacto', 'Manifiesto', 'Blog'].map(item => (
            <button key={item} className="hover:text-[#4E6840] transition-colors">{item}</button>
          ))}
        </div>
        <Link href="/" className="flex items-center gap-2 text-sm bg-[#2C3E2A] text-[#DDE5D4] px-5 py-2.5 rounded-full hover:bg-[#4E6840] transition-colors font-medium">
          ← Catálogo
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#9AB489]/30 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#728A61]/20 rounded-tr-full pointer-events-none" />

        <div className="max-w-[90rem] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="inline-flex items-center gap-2 bg-[#2C3E2A]/10 border border-[#2C3E2A]/20 text-[#2C3E2A] text-xs font-mono uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              CO₂ capturado hoy: {co2} Ton — Live
            </span>
            <h1 className="text-6xl md:text-[10rem] font-serif font-light tracking-tighter leading-[0.85] mb-8 text-[#2C3E2A]">
              Energía<br /><span className="italic text-[#728A61]">Limpia.</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between max-w-4xl">
              <p className="text-xl md:text-2xl font-light text-[#486345] leading-relaxed max-w-xl">
                Soluciones de energía renovable para hogares y empresas. Instalación, mantenimiento y monitorización en tiempo real.
              </p>
              <div className="flex gap-4">
                <a href="mailto:info@ecotech.es" className="bg-[#2C3E2A] text-[#DDE5D4] px-8 py-4 rounded-full font-medium hover:bg-[#4E6840] transition-colors text-sm uppercase tracking-wider whitespace-nowrap">
                  Solicitar Auditoría
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MÉTRICAS EN VIVO */}
      <section className="py-24 px-6 bg-[#2C3E2A]">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[#9AB489] text-xs tracking-widest uppercase block mb-3">Dashboard en Tiempo Real</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[#DDE5D4] tracking-tighter">Nuestro Impacto</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1a2e1a]/60 border border-[#4E6840]/30 p-8 md:p-10 flex flex-col gap-6"
              >
                <div className="flex justify-between items-start">
                  <m.icon className="w-8 h-8" style={{ color: m.color }} />
                  <span className="text-[9px] font-mono text-[#9AB489] uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live
                  </span>
                </div>
                <div>
                  <p className="text-xs font-mono text-[#728A61] uppercase tracking-widest mb-2">{m.label}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl md:text-6xl font-black text-[#DDE5D4] tracking-tighter font-mono">{m.value}</span>
                    <span className="text-lg text-[#9AB489] mb-1">{m.unit}</span>
                  </div>
                  <p className="text-xs text-[#728A61] mt-1">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[#728A61] text-xs tracking-widest uppercase block mb-3">Catálogo</span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-[#2C3E2A] tracking-tighter">Soluciones</h2>
            </div>
            <p className="max-w-sm text-[#486345] font-light leading-relaxed">
              Hardware certificado, instalación profesional incluida y garantía extendida en todos los productos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#DDE5D4] rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#2C3E2A] text-[#DDE5D4] text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full">
                    {p.badge}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-mono text-[#728A61] uppercase tracking-widest">{p.cat}</span>
                  <h3 className="text-xl font-semibold text-[#2C3E2A] mt-1 mb-3">{p.name}</h3>
                  <p className="text-sm text-[#486345] font-light leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#2C3E2A]">{p.price}</span>
                    <button className="group/btn flex items-center gap-2 bg-[#2C3E2A] text-[#DDE5D4] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4E6840] transition-colors">
                      Ver más <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFIESTO */}
      <section ref={ref} className="py-40 px-6 relative overflow-hidden bg-[#DDE5D4]">
        <motion.div style={{ rotate }} className="absolute -right-1/4 top-1/2 -translate-y-1/2 text-[#9AB489]/10 pointer-events-none">
          <Wind className="w-[80vw] h-[80vw]" />
        </motion.div>

        <div className="max-w-[90rem] mx-auto relative z-10">
          <div className="mb-16">
            <span className="font-mono text-[#728A61] text-xs tracking-widest uppercase block mb-3">Nuestra filosofía</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[#2C3E2A] tracking-tighter">Manifiesto</h2>
          </div>

          <div className="space-y-0">
            {manifesto.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group border-t border-[#9AB489]/40 py-10 md:py-14 flex flex-col md:flex-row md:items-start gap-6 md:gap-16 hover:bg-[#2C3E2A] transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8 cursor-pointer"
              >
                <span className="font-mono text-3xl md:text-5xl text-[#9AB489] group-hover:text-[#728A61] font-bold transition-colors w-16 flex-shrink-0">{m.num}</span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-[#2C3E2A] group-hover:text-[#DDE5D4] transition-colors mb-3">{m.title}</h3>
                  <p className="text-base text-[#486345] group-hover:text-[#9AB489] font-light leading-relaxed max-w-2xl transition-colors">{m.text}</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-[#9AB489] group-hover:text-[#DDE5D4] transition-colors flex-shrink-0 self-center" />
              </motion.div>
            ))}
            <div className="border-t border-[#9AB489]/40" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-[#2C3E2A] text-[#DDE5D4] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-serif font-light tracking-tighter mb-8">
            Empieza tu<br /><span className="italic text-[#9AB489]">transición.</span>
          </h2>
          <p className="text-lg text-[#728A61] font-light max-w-xl mx-auto mb-12">
            Auditoría energética gratuita para hogares y empresas. Sin compromiso.
          </p>
          <a href="mailto:info@ecotech-solutions.es" className="inline-flex items-center gap-3 bg-[#9AB489] text-[#2C3E2A] px-10 py-5 rounded-full text-base font-bold uppercase tracking-wider hover:bg-[#DDE5D4] transition-colors">
            <Sun className="w-5 h-5" />
            Solicitar Auditoría Gratuita
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#1a2e1a] border-t border-[#4E6840]/30">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#728A61] font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} EcoTech Solutions S.L.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#9AB489] transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-[#9AB489] transition-colors">Certificaciones</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
