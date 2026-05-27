"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, BarChart3, Shield, Globe, ArrowRight, Check, X, Menu, Star, Users, Clock, Code, Database, Lock, Cpu, ChevronDown, Mail } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const features = [
  { icon: BarChart3, title: "Analytics en Tiempo Real", desc: "Dashboards personalizables con métricas que importan. Exporta en CSV, PDF o conecta vía API.", tag: "Core" },
  { icon: Zap, title: "Automatizaciones", desc: "Crea flujos de trabajo sin código. Triggers, condiciones y acciones encadenadas. Hasta 500 automatizaciones/mes.", tag: "Pro" },
  { icon: Shield, title: "Seguridad Enterprise", desc: "SOC 2 Type II, GDPR compliant. SSO/SAML, 2FA, audit logs. Cifrado AES-256 en reposo.", tag: "Enterprise" },
  { icon: Database, title: "API REST & Webhooks", desc: "API documentada con Swagger. Rate limit de 10K req/min. SDK oficial para Python, JS y Go.", tag: "Core" },
  { icon: Globe, title: "Multi-workspace", desc: "Gestiona equipos separados con permisos granulares. Ideal para agencias y consultoras.", tag: "Pro" },
  { icon: Cpu, title: "IA Integrada", desc: "Predicciones de churn, scoring automático de leads y resúmenes inteligentes de datos.", tag: "Enterprise" },
];

const pricing = [
  { name: "Starter", price: "29", period: "/mes", desc: "Para equipos pequeños que empiezan.", features: ["Hasta 5 usuarios", "1.000 registros", "Dashboard básico", "Soporte email", "API básica"], highlight: false, cta: "Empezar Gratis" },
  { name: "Pro", price: "79", period: "/mes", desc: "Para equipos en crecimiento.", features: ["Hasta 25 usuarios", "50.000 registros", "Dashboards avanzados", "Automatizaciones", "Soporte prioritario", "SSO incluido"], highlight: true, cta: "Probar 14 días gratis" },
  { name: "Enterprise", price: "Custom", period: "", desc: "Para organizaciones con necesidades específicas.", features: ["Usuarios ilimitados", "Registros ilimitados", "IA integrada", "SLA 99.99%", "Account manager", "On-premise disponible"], highlight: false, cta: "Contactar Ventas" },
];

const metrics = [
  { value: "2.4K", label: "Empresas activas" },
  { value: "99.98%", label: "Uptime 12 meses" },
  { value: "340M", label: "Registros procesados" },
  { value: "<200ms", label: "Latencia media API" },
];

const testimonials = [
  { company: "Factorial", name: "María García", role: "VP of Engineering", text: "Migramos desde Salesforce y reducimos costes un 40%. La API de Nexus es la mejor documentada que hemos usado.", avatar: "MG" },
  { company: "Cabify", name: "Pablo Torres", role: "Head of Data", text: "Las automatizaciones nos ahorraron 120 horas/mes en tareas manuales. El ROI fue inmediato.", avatar: "PT" },
  { company: "Glovo", name: "Ana Ruiz", role: "CTO", text: "El soporte enterprise responde en menos de 15 min. En 2 años no hemos tenido un solo incidente grave.", avatar: "AR" },
];

const faqs = [
  { q: "¿Puedo probar antes de pagar?", a: "Sí. Plan Pro gratis durante 14 días sin tarjeta de crédito. Si no te convence, no pagas nada." },
  { q: "¿Cómo migro mis datos?", a: "Tenemos herramientas de importación para CSV, Excel, Salesforce, HubSpot y Airtable. El equipo de onboarding te acompaña gratis." },
  { q: "¿Dónde se alojan los datos?", a: "Infraestructura en AWS EU (Frankfurt e Irlanda). Opción de región US disponible. On-premise para Enterprise." },
  { q: "¿Hay descuento anual?", a: "Sí. Facturación anual = 2 meses gratis (ahorro del 16%). Aplica a todos los planes." },
];

const integrations = ["Slack", "Zapier", "Google", "HubSpot", "Stripe", "GitHub", "Notion", "Linear"];

export default function SaasDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <DemoLayout title="Nexus" year="2026">
      <div className="text-white selection:bg-[#3b82f6] selection:text-white overflow-x-hidden bg-[#0a0a0a]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a0a0a] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Producto", "Precios", "Clientes", "Docs"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-2xl font-medium" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-[80] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#818cf8] flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
            <span className="text-sm font-semibold">Nexus</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Producto", "Precios", "Clientes", "Docs"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-white/40 hover:text-white transition-colors">{item}</a>
            ))}
            <a href="#precios" className="px-4 py-2 text-xs font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors">Empezar Gratis</a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — TECH DARK
        ═══════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/5 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#3b82f6]/[0.03] blur-[120px]" />

          <div className="relative z-10 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-white/50">v3.2 — IA Predictiva ahora disponible</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-6">
              La plataforma que<br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#818cf8]">tu equipo necesita.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
              CRM, automatizaciones y analytics en un solo producto. Sin curva de aprendizaje. Sin contratos anuales.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#precios" className="px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
                Empezar Gratis <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#producto" className="px-8 py-3.5 border border-white/10 text-white/70 text-sm rounded-lg hover:border-white/20 transition-all">
                Ver Demo
              </a>
            </motion.div>

            {/* Mock Dashboard */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="mt-16 p-4 md:p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" /><div className="w-3 h-3 rounded-full bg-yellow-500/50" /><div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-white/20 ml-2">nexus-dashboard</span>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {metrics.map((m, i) => (
                  <div key={i} className="p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <span className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#3b82f6] to-[#818cf8]">{m.value}</span>
                    <p className="text-[8px] md:text-[10px] text-white/20 mt-1 uppercase tracking-wide">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 md:gap-3">
                <div className="col-span-2 h-32 rounded-xl bg-gradient-to-br from-[#3b82f6]/10 to-[#818cf8]/5 border border-white/5 p-3 flex flex-col justify-between">
                  <span className="text-[10px] text-white/20">Revenue MRR</span>
                  <div className="flex items-end gap-1 h-16">
                    {[35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#3b82f6]/40 to-[#818cf8]/20" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="h-32 rounded-xl bg-white/[0.03] border border-white/5 p-3 flex flex-col justify-between">
                  <span className="text-[10px] text-white/20">Active Users</span>
                  <span className="text-2xl font-bold">2,847</span>
                  <span className="text-[10px] text-green-400">↑ 12.4%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            2. FEATURES
        ═══════════════════════════════════ */}
        <section id="producto" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#3b82f6] block mb-3">Producto</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Todo lo que necesitas. Nada que sobre.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#3b82f6]/20 hover:bg-[#3b82f6]/[0.03] transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center group-hover:bg-[#3b82f6]/20 transition-colors">
                      <f.icon className="w-5 h-5 text-[#3b82f6]" />
                    </div>
                    <span className="px-2 py-0.5 text-[8px] tracking-wide uppercase bg-white/5 text-white/30 rounded-full border border-white/5">{f.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. INTEGRACIONES
        ═══════════════════════════════════ */}
        <section className="py-16 px-6 md:px-12 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">+40 Integraciones</h3>
                <p className="text-sm text-white/30">Conecta con las herramientas que ya usas.</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {integrations.map((name, i) => (
                  <motion.div key={name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                    className="px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white/40">{name}</motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. PRICING
        ═══════════════════════════════════ */}
        <section id="precios" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#3b82f6] block mb-3">Precios</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Transparentes. Sin sorpresas.</h2>
              <div className="inline-flex items-center gap-3 p-1 rounded-full border border-white/10 bg-white/5">
                <button onClick={() => setBillingAnnual(false)} className={`px-4 py-1.5 text-xs rounded-full transition-all ${!billingAnnual ? 'bg-white text-black' : 'text-white/40'}`}>Mensual</button>
                <button onClick={() => setBillingAnnual(true)} className={`px-4 py-1.5 text-xs rounded-full transition-all ${billingAnnual ? 'bg-white text-black' : 'text-white/40'}`}>Anual (-16%)</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricing.map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className={`p-6 md:p-8 rounded-2xl border ${plan.highlight ? 'border-[#3b82f6]/30 bg-[#3b82f6]/5 relative' : 'border-white/5 bg-white/[0.02]'}`}>
                  {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-semibold bg-[#3b82f6] text-white rounded-full">Popular</div>}
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <p className="text-xs text-white/30 mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    {plan.price === "Custom" ? (
                      <span className="text-3xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">{billingAnnual ? Math.round(parseInt(plan.price) * 0.84) : plan.price}€</span>
                        <span className="text-sm text-white/30">{plan.period}</span>
                      </>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-white/50"><Check className="w-4 h-4 text-[#3b82f6] shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 text-sm font-medium rounded-lg transition-colors ${plan.highlight ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. TESTIMONIOS
        ═══════════════════════════════════ */}
        <section id="clientes" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#3b82f6] block mb-3">Clientes</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Equipos que confían en Nexus</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#818cf8]/20 flex items-center justify-center text-xs font-semibold text-[#3b82f6]">{t.avatar}</div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-[10px] text-white/30">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed italic">"{t.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. FAQ
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
            </div>
            <div className="space-y-0">
              {faqs.map((f, i) => (
                <div key={i} className="border-b border-white/5">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-5 flex justify-between items-center text-left">
                    <span className="text-sm font-medium pr-8">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-white/20 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"><p className="pb-5 text-sm text-white/30 leading-relaxed">{f.a}</p></motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. CTA
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-4xl mx-auto p-8 md:p-16 rounded-2xl bg-gradient-to-br from-[#3b82f6]/10 to-[#818cf8]/5 border border-[#3b82f6]/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-[80px]" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 relative z-10">
              Empieza hoy.<br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#818cf8]">Gratis.</span>
            </h2>
            <p className="text-sm text-white/30 max-w-md mx-auto mb-8 relative z-10">14 días de prueba en el plan Pro. Sin tarjeta. Sin compromiso.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
              <input type="email" placeholder="tu@empresa.com"
                className="px-5 py-3 text-sm bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#3b82f6]/50 transition-colors placeholder:text-white/20 w-full sm:w-64" />
              <button className="px-8 py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap w-full sm:w-auto">Crear Cuenta</button>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-[#3b82f6] to-[#818cf8] flex items-center justify-center"><Zap className="w-3 h-3" /></div>
              <p className="text-[10px] text-white/20">© 2026 Nexus Technologies S.L.</p>
            </div>
            <div className="flex gap-6 text-[10px] text-white/20">
              <span>Privacidad</span><span>Términos</span><span>Status</span><span>Docs</span>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
