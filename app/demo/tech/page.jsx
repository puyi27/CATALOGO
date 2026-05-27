"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Zap, Code2, Database, Shield, TrendingUp, ChevronRight, ArrowUpRight, Check, X, Menu, Users, Globe, Clock } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

/* ── Animated Counter ─────────────────────────────── */
function Num({ end, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let f = 0;
    const step = end / 80;
    const t = setInterval(() => {
      f += step;
      if (f >= end) { setN(end); clearInterval(t); } else setN(Math.floor(f));
    }, 16);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{n.toLocaleString("es-ES")}{suffix}</span>;
}

/* ── Blinking cursor ──────────────────────────────── */
function BlinkCursor() {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setOn(v => !v), 530); return () => clearInterval(t); }, []);
  return <span style={{ opacity: on ? 1 : 0, color: "#3b82f6" }}>|</span>;
}

/* ── Terminal Line animation ─────────────────────── */
function TerminalLine({ text, delay = 0 }) {
  const [shown, setShown] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setShown(text.slice(0, i++));
        if (i > text.length) clearInterval(iv);
      }, 18);
    }, delay);
    return () => clearTimeout(t);
  }, [inView, text, delay]);
  return <div ref={ref} className="font-mono text-sm text-[#86efac]">{shown}<BlinkCursor /></div>;
}

const SOLUTIONS = [
  { id: "nlp", label: "NLP", icon: Brain, title: "Procesamiento de Lenguaje Natural", desc: "Modelos de comprensión semántica entrenados con datos de tu industria. Clasificación, extracción de entidades, resumen automático y generación de contenido a escala.", metrics: ["98.2% precisión", "< 80ms latencia", "47 idiomas"] },
  { id: "vision", label: "Visión IA", icon: Globe, title: "Computer Vision", desc: "Detección de objetos, control de calidad visual, reconocimiento facial y análisis de imágenes médicas. Inferencia en edge o cloud.", metrics: ["99.1% mAP", "4K en tiempo real", "30+ modelos"] },
  { id: "predict", label: "Predicción", icon: TrendingUp, title: "Analítica Predictiva", desc: "Modelos de forecasting, detección de anomalías y optimización operativa para supply chain, finanzas y mantenimiento predictivo.", metrics: ["±3.1% error", "18 meses horizonte", "AutoML incluido"] },
  { id: "infra", label: "MLOps", icon: Database, title: "Infraestructura ML", desc: "Pipelines de entrenamiento, versionado de modelos, monitoreo en producción y CI/CD para equipos de ciencia de datos.", metrics: ["99.9% uptime", "A/B testing nativo", "Rollback instant."] },
];

const PRICING = [
  { plan: "Starter", price: "1.900", period: "/mes", desc: "Para equipos que dan sus primeros pasos con IA", features: ["Hasta 3 modelos en producción", "1M tokens/mes incluidos", "API REST + SDKs Python/JS", "Soporte por email", "Dashboard básico", "SLA 99.5%"], cta: "Empezar gratis 14 días", highlight: false },
  { plan: "Scale", price: "5.900", period: "/mes", desc: "Para empresas que escalan sus operaciones con IA", features: ["Modelos ilimitados", "50M tokens/mes incluidos", "Fine-tuning personalizado", "Soporte prioritario 24/7", "Analytics avanzado", "SLA 99.9%", "Repositorio privado"], cta: "Solicitar demo", highlight: true },
  { plan: "Enterprise", price: "Custom", period: "", desc: "Infraestructura dedicada para grandes organizaciones", features: ["Despliegue on-premise / VPC", "Tokens sin límite", "Equipo de ingeniería dedicado", "Contrato SLA personalizado", "Formación del equipo", "Auditorías de seguridad", "Integraciones enterprise"], cta: "Hablar con ventas", highlight: false },
];

const CASES = [
  { client: "BancaSur", sector: "Finanzas", result: "-73% tiempo revisión créditos", tag: "NLP + Fraude", color: "#3b82f6" },
  { client: "Logísur Express", sector: "Logística", result: "34% reducción costes operativos", tag: "Predicción", color: "#818cf8" },
  { client: "Clinamed Group", sector: "Salud", result: "96.4% precisión en diagnóstico", tag: "Computer Vision", color: "#06b6d4" },
  { client: "RetailPro Iberia", sector: "Retail", result: "+28% conversión con recomendaciones", tag: "Personalización", color: "#8b5cf6" },
];

const TEAM = [
  { name: "Dr. Rafael Montoya", role: "CEO & Co-founder", bg: "#1e3a5f" },
  { name: "Isabela Ferreira, PhD", role: "CTO · ML Research", bg: "#1e1b4b" },
  { name: "Álex Cano Ruiz", role: "Head of Engineering", bg: "#164e63" },
  { name: "Natalia Voss", role: "Product Design Lead", bg: "#1c1917" },
];

export default function TechDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSol, setActiveSol] = useState("nlp");
  const [activeYear, setActiveYear] = useState("2025");

  const currentSolution = SOLUTIONS.find(s => s.id === activeSol);

  return (
    <DemoLayout title="NexusAI" year="2026">
      <div className="bg-[#020617] text-[#e2e8f0] antialiased overflow-x-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          .grid-bg { background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 40px 40px; }
          .glow-blue { box-shadow: 0 0 40px rgba(59,130,246,0.25); }
          .glow-text { background: linear-gradient(135deg, #f1f5f9 0%, #3b82f6 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .card-border { border: 1px solid rgba(59,130,246,0.15); }
          .card-border:hover { border-color: rgba(59,130,246,0.4); box-shadow: 0 0 20px rgba(59,130,246,0.1); }
          ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #020617; } ::-webkit-scrollbar-thumb { background: #1e40af; border-radius: 2px; }
        `}</style>

        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020617]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#818cf8] flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <span className="font-black text-white tracking-tight text-lg">NEXUS<span className="text-[#3b82f6]">AI</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-[#94a3b8]">
              {["Soluciones","Casos de uso","Precios","Documentación","Blog"].map(l => (
                <button key={l} className="hover:text-white transition-colors">{l}</button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="text-sm text-[#94a3b8] hover:text-white px-4 py-2 transition-colors">Iniciar sesión</button>
              <motion.button whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }} whileTap={{ scale: 0.97 }}
                className="bg-[#3b82f6] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#2563eb] transition-colors">
                Solicitar demo →
              </motion.button>
            </div>
            <button onClick={() => setMenuOpen(true)} className="md:hidden text-white"><Menu size={22} /></button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#020617]/98 z-[100] flex flex-col p-8 pt-20">
              <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-6 text-[#94a3b8]"><X size={24} /></button>
              {["Soluciones","Casos de uso","Precios","Documentación"].map((l, i) => (
                <motion.button key={l} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)} className="text-3xl font-bold text-left py-4 border-b border-white/5 text-white hover:text-[#3b82f6] transition-colors">{l}</motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section className="grid-bg relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3b82f6] rounded-full opacity-5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#818cf8] rounded-full opacity-8 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 border border-[#3b82f6]/30 bg-[#3b82f6]/8 rounded-full px-4 py-2 text-[#93c5fd] text-xs font-semibold tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                Plataforma de IA empresarial · Serie B
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="glow-text text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-6">
                Inteligencia<br />artificial que<br />escala contigo.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-[#94a3b8] text-xl leading-relaxed max-w-lg mb-10">
                Modelos de IA de producción para empresas europeas. NLP, visión artificial y predicción sin el dolor de la infraestructura.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                className="flex flex-wrap gap-4 mb-12">
                <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }} whileTap={{ scale: 0.96 }}
                  className="bg-[#3b82f6] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#2563eb] transition-colors flex items-center gap-2">
                  Empezar gratis <ArrowUpRight size={18} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="border border-white/15 text-white font-medium px-8 py-4 rounded-xl text-lg hover:bg-white/5 transition-colors">
                  Ver documentación
                </motion.button>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="flex items-center gap-4 text-sm text-[#64748b]">
                <div className="flex -space-x-2">
                  {["#1e3a5f","#1e1b4b","#164e63","#1c1917"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617]" style={{ background: `linear-gradient(135deg, ${c}, #3b82f6)` }} />
                  ))}
                </div>
                <span>Más de <strong className="text-white">3.400 equipos</strong> ya usan NexusAI</span>
              </motion.div>
            </div>

            {/* Dashboard preview */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="card-border rounded-2xl bg-[#0f172a] p-5 glow-blue">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" /></div>
                <span className="text-xs font-mono text-[#64748b] ml-2">nexus-dashboard · prod</span>
              </div>
              {/* Simulated terminal */}
              <div className="bg-[#020617] rounded-xl p-4 mb-4 font-mono text-xs space-y-2">
                <TerminalLine text="$ nexus deploy --model=sentiment-v3 --env=prod" delay={200} />
                <TerminalLine text="✓ Model uploaded (847MB)" delay={800} />
                <TerminalLine text="✓ Health check passed · latency: 62ms" delay={1400} />
                <TerminalLine text="✓ Traffic shifted 100% → v3" delay={2000} />
                <TerminalLine text="→ Live at api.nexus.ai/v3/sentiment" delay={2600} />
              </div>
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Req/seg", value: "24.8K", delta: "+12%" },
                  { label: "Latencia p99", value: "84ms", delta: "-8ms" },
                  { label: "Precisión", value: "98.2%", delta: "+0.3%" },
                ].map((m, i) => (
                  <div key={i} className="bg-[#0f172a] border border-white/5 rounded-xl p-3">
                    <div className="text-[#64748b] text-xs mb-1">{m.label}</div>
                    <div className="text-white font-bold text-lg leading-none">{m.value}</div>
                    <div className="text-[#22c55e] text-xs mt-1">{m.delta}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="border-y border-white/5 bg-[#0f172a]/50">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Llamadas API / día", end: 4200000, suffix: "M+" },
              { label: "Empresas activas", end: 3400, suffix: "+" },
              { label: "Tiempo medio hasta producción", end: 4, suffix: " días" },
              { label: "Uptime garantizado", end: 99, suffix: ".9%" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl font-black text-white">
                  <Num end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-sm text-[#64748b] mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <span className="text-xs uppercase tracking-widest text-[#3b82f6] font-bold">Capacidades</span>
              <h2 className="text-5xl font-black text-white mt-3">IA para cada necesidad</h2>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tabs */}
              <div className="flex flex-col gap-2">
                {SOLUTIONS.map(s => (
                  <motion.button key={s.id} whileHover={{ x: 4 }} onClick={() => setActiveSol(s.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all ${activeSol === s.id ? "bg-[#1e3a5f] border border-[#3b82f6]/40" : "hover:bg-white/5 border border-transparent"}`}>
                    <s.icon size={20} className={activeSol === s.id ? "text-[#3b82f6]" : "text-[#64748b]"} />
                    <span className={`font-semibold ${activeSol === s.id ? "text-white" : "text-[#94a3b8]"}`}>{s.label}</span>
                    <ChevronRight size={16} className={`ml-auto transition-transform ${activeSol === s.id ? "text-[#3b82f6] translate-x-1" : "text-[#334155]"}`} />
                  </motion.button>
                ))}
              </div>
              {/* Detail */}
              <AnimatePresence mode="wait">
                {currentSolution && (
                  <motion.div key={activeSol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="lg:col-span-2 card-border rounded-2xl bg-[#0f172a] p-8">
                    <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center mb-6">
                      <currentSolution.icon size={24} className="text-[#3b82f6]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{currentSolution.title}</h3>
                    <p className="text-[#94a3b8] leading-relaxed mb-8">{currentSolution.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {currentSolution.metrics.map((m, i) => (
                        <div key={i} className="bg-[#3b82f6]/10 border border-[#3b82f6]/25 rounded-lg px-4 py-2 text-[#93c5fd] text-sm font-mono font-semibold">
                          {m}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CASOS DE USO */}
        <section className="py-24 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <span className="text-xs uppercase tracking-widest text-[#3b82f6] font-bold">Impacto real</span>
              <h2 className="text-5xl font-black text-white mt-3">Resultados en producción</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CASES.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }} className="card-border bg-[#020617] rounded-2xl p-6 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-bold text-white text-lg">{c.client}</div>
                      <div className="text-[#64748b] text-sm">{c.sector}</div>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full font-semibold" style={{ background: c.color + "22", color: c.color }}>{c.tag}</span>
                  </div>
                  <div className="text-2xl font-black" style={{ color: c.color }}>{c.result}</div>
                  <div className="mt-4 flex items-center gap-2 text-[#64748b] text-sm hover:text-[#3b82f6] transition-colors group">
                    Ver caso completo <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#3b82f6] font-bold">Precios</span>
              <h2 className="text-5xl font-black text-white mt-3">Escala sin sorpresas</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-8 flex flex-col ${p.highlight ? "bg-gradient-to-b from-[#1e40af] to-[#1e3a5f] border-2 border-[#3b82f6] glow-blue" : "bg-[#0f172a] border border-white/8"}`}>
                  {p.highlight && <div className="text-xs font-bold text-[#93c5fd] bg-[#3b82f6]/20 px-3 py-1 rounded-full self-start mb-4 tracking-wider">MÁS POPULAR</div>}
                  <div className="font-bold text-white text-xl mb-1">{p.plan}</div>
                  <div className="flex items-baseline gap-1 my-4">
                    {p.price === "Custom" ? (
                      <span className="text-4xl font-black text-white">Custom</span>
                    ) : (
                      <><span className="text-[#64748b] text-lg">€</span><span className="text-4xl font-black text-white">{p.price}</span><span className="text-[#64748b]">{p.period}</span></>
                    )}
                  </div>
                  <p className="text-[#64748b] text-sm mb-6">{p.desc}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <Check size={16} className={p.highlight ? "text-[#93c5fd] mt-0.5 flex-shrink-0" : "text-[#3b82f6] mt-0.5 flex-shrink-0"} />
                        <span className={p.highlight ? "text-white/90" : "text-[#94a3b8]"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className={`w-full py-3.5 rounded-xl font-bold transition-colors ${p.highlight ? "bg-white text-[#1e40af] hover:bg-[#e0e7ff]" : "bg-white/8 text-white hover:bg-white/12 border border-white/10"}`}>
                    {p.cta}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EQUIPO */}
        <section className="py-24 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="text-5xl font-black text-white">El equipo</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {TEAM.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }} className="card-border rounded-2xl overflow-hidden cursor-pointer">
                  <div className="h-32 bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6]" style={{ background: `linear-gradient(135deg, ${m.bg}, #3b82f6)` }} />
                  <div className="p-4 bg-[#020617]">
                    <div className="font-bold text-white text-sm">{m.name}</div>
                    <div className="text-xs text-[#64748b] mt-1">{m.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, label: "Certificado SOC 2 Tipo II", desc: "Seguridad de nivel enterprise auditada anualmente" },
                { icon: Globe, label: "Servidores en la UE", desc: "GDPR compliant. Datos procesados solo en Europa" },
                { icon: Clock, label: "SLA 99.9% garantizado", desc: "Compensación automática si incumplimos" },
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/15 flex items-center justify-center flex-shrink-0">
                    <t.icon size={20} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.label}</div>
                    <div className="text-sm text-[#64748b] mt-1">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] via-[#1e3a5f] to-[#020617]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#818cf8] rounded-full opacity-10 blur-[100px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-6xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6">
              Tu competencia ya<br />usa IA. Tú también.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-xl text-white/70 mb-10">
              14 días gratis. Sin tarjeta. Sin burocracia.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.3)" }} whileTap={{ scale: 0.96 }}
                className="bg-white text-[#1e40af] font-black px-10 py-5 rounded-xl text-xl">
                Empezar ahora →
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="border border-white/30 text-white font-semibold px-10 py-5 rounded-xl text-xl hover:bg-white/10 transition-colors">
                Hablar con ventas
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-10 bg-[#020617]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-[#3b82f6]" />
              <span className="font-black text-white">NEXUS<span className="text-[#3b82f6]">AI</span></span>
              <span className="text-[#64748b] text-sm ml-2">· Sevilla · Madrid · Lisboa</span>
            </div>
            <div className="flex gap-6 text-[#64748b] text-sm">
              {["Privacidad","Términos","Seguridad","Status"].map(l => <button key={l} className="hover:text-white transition-colors">{l}</button>)}
            </div>
            <div className="text-[#64748b] text-sm">© 2026 NexusAI Technologies S.L.</div>
          </div>
        </footer>
      </div>
    </DemoLayout>
  );
}
