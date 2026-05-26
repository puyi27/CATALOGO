"use client";

import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Cpu, Server, Database, ShieldCheck, TrendingDown, Zap, AlertTriangle, DollarSign } from 'lucide-react';

const benefits = [
  { icon: Server, label: 'Arquitectura Node.js + Express', desc: 'Hasta 40.000 conexiones concurrentes con una huella de memoria mínima. El bucle de eventos asíncrono de un único hilo lo hace posible.' },
  { icon: Database, label: 'Soberanía del Dato Empresarial', desc: 'Tu código fuente es tuyo. Sin licencias mensuales, sin plugins de terceros que te aten. Eres dueño de tu infraestructura.' },
  { icon: ShieldCheck, label: 'Deuda Técnica Cero', desc: 'WordPress acumula parches de seguridad y plugins hinchados. Nosotros construimos desde cero, sin heredar basura de terceros.' },
  { icon: TrendingDown, label: 'Ahorro en Hosting', desc: 'El bucle de eventos asíncrono de Node.js reduce drásticamente el coste mensual de infraestructura. Pagas menos, rindes más.' },
];

const comparisonRows = [
  { feature: 'Rendimiento (Lighthouse)', wp: '45-65 / 100', custom: '90-100 / 100' },
  { feature: 'Conexiones concurrentes', wp: '~500', custom: '40.000+' },
  { feature: 'Seguridad', wp: 'Vulnerabilidades crónicas (plugins)', custom: 'Capa personalizada + auditoría' },
  { feature: 'Deuda técnica', wp: 'Exponencial con cada plugin', custom: 'Cero. Código limpio.' },
  { feature: 'Coste mensual (hosting)', wp: '50-200€ (servidores hinchados)', custom: '5-20€ (DigitalOcean + Cloudflare)' },
  { feature: 'Propiedad del código', wp: 'Del cliente (pero con licencias)', custom: '100% del cliente' },
];

export default function TechMuscle() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-[#050505] text-white overflow-hidden py-24 md:py-32 border-t border-white/5">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em]">Músculo Técnico</span>
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] max-w-5xl">
              <span className="block text-white">¿Por qué pagar</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-zinc-500">más de 2.000€</span>
              <span className="block text-white/80">por un WordPress?</span>
            </h2>
            <p className="mt-6 text-zinc-400 font-mono text-sm md:text-base max-w-2xl leading-relaxed uppercase tracking-widest">
              El Síndrome del Kit Digital infló los precios y llenó el mercado de plantillas genéricas. Tu negocio merece una arquitectura soberana, rápida y blindada.
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-24 md:mb-32">
            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <m.div
                  key={benefit.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex gap-4 p-4 rounded-lg border border-white/5 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all group"
                >
                  <benefit.icon className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-1 text-white/80 group-hover:text-white transition-colors">{benefit.label}</h3>
                    <p className="text-xs font-mono text-zinc-500 leading-relaxed">{benefit.desc}</p>
                  </div>
                </m.div>
              ))}

              <m.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex gap-4 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5"
              >
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1 text-amber-400">El Síndrome del Kit Digital</h3>
                  <p className="text-xs font-mono text-zinc-500 leading-relaxed">
                    Subvenciones públicas inflaron precios y llenaron el mercado de agencias low-cost con WordPress. Resultado: webs lentas, inseguras y clónicas que no generan negocio.
                  </p>
                </div>
              </m.div>
            </div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">WordPress vs Arquitectura Custom</span>
                <DollarSign className="w-4 h-4 text-green-400" />
              </div>
              <div className="divide-y divide-white/5">
                {comparisonRows.map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 px-6 py-4 text-xs md:text-sm font-mono">
                    <span className="text-zinc-400 col-span-1">{row.feature}</span>
                    <span className="text-red-400/80 col-span-1">{row.wp}</span>
                    <span className="text-green-400/80 col-span-1">{row.custom}</span>
                  </div>
                ))}
              </div>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative border border-white/10 rounded-xl p-8 md:p-12 bg-gradient-to-br from-indigo-500/5 to-transparent"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-indigo-400" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-indigo-400">Caso de Estudio</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">Portal Musical Masivo</h3>
                <p className="text-zinc-400 font-mono text-xs md:text-sm leading-relaxed max-w-xl">
                  Bases de datos relacionales y documentales, sistemas de reviews complejos, mecánicas de gamificación y millones de hits diarios.
                  Todo sobre una arquitectura Node.js + Express. Sin WordPress. Sin plugins. Sin límites. Gobernado al 100% por código personalizado.
                </p>
                <div className="mt-6 flex flex-wrap gap-6">
                  <div>
                    <span className="text-2xl font-black text-indigo-400">2M+</span>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Requests / día</p>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-indigo-400">99.9%</span>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Uptime</p>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-indigo-400">95%</span>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Cache hit ratio</p>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-indigo-400">60%</span>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Ahorro en hosting</p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Solicitar Auditoría
                  <TrendingDown className="w-4 h-4" />
                </a>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
