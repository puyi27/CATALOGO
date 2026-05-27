"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, ArrowRight, X, Menu, Plus, Minus, ChevronDown } from "lucide-react"
import DemoLayout from "@/components/DemoLayout"

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function AgenciaDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("estrategia")
  const [openFaq, setOpenFaq] = useState(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const services = {
    estrategia: {
      title: "Estrategia Digital",
      desc: "Analizamos tu mercado, competidores y audiencia para construir una hoja de ruta digital que maximice tu ROI. Cada decisión se basa en datos, no en suposiciones.",
      items: ["Auditoría de marca", "Investigación de mercado", "Arquitectura de contenido", "KPIs y métricas", "Plan de crecimiento"],
      price: "desde 2.400€"
    },
    branding: {
      title: "Branding & Identidad",
      desc: "Creamos identidades de marca que trascienden lo visual. Desde el naming hasta el sistema de diseño completo, construimos marcas que la gente recuerda.",
      items: ["Naming y posicionamiento", "Logo y sistema visual", "Manual de marca", "Tono de voz", "Brand guidelines"],
      price: "desde 3.800€"
    },
    web: {
      title: "Desarrollo Web",
      desc: "Diseñamos y desarrollamos webs de alto rendimiento con tecnologías de vanguardia. Velocidad, accesibilidad y conversión son nuestra obsesión.",
      items: ["Diseño UX/UI", "Desarrollo frontend", "CMS a medida", "Optimización SEO", "Analítica avanzada"],
      price: "desde 5.500€"
    },
    campañas: {
      title: "Campañas Digitales",
      desc: "Lanzamos y gestionamos campañas de performance y branding en todos los canales. Pagamos por resultados, no por clics vacíos.",
      items: ["Meta & Google Ads", "Contenido social", "Email marketing", "Retargeting", "A/B testing"],
      price: "desde 1.200€/mes"
    }
  }

  const projects = [
    { name: "VEGA MAYOR", cat: "E-COMMERCE & BRANDING", year: "2025", color: "from-indigo-900 to-purple-950", tag: "Fashion" },
    { name: "ONDA LABS", cat: "PLATAFORMA SAAS", year: "2025", color: "from-slate-800 to-indigo-900", tag: "Tech" },
    { name: "CASA LABRANZA", cat: "IDENTIDAD & WEB", year: "2024", color: "from-stone-700 to-stone-900", tag: "Hospitality" },
    { name: "NÓMADA STUDIO", cat: "DIRECCIÓN DE ARTE", year: "2024", color: "from-violet-900 to-fuchsia-950", tag: "Creative" },
    { name: "PULSO MEDIA", cat: "CAMPAÑA DIGITAL", year: "2024", color: "from-blue-900 to-slate-900", tag: "Media" },
    { name: "ARCA BIOTECH", cat: "WEB & CONTENIDO", year: "2023", color: "from-teal-900 to-slate-900", tag: "Biotech" },
  ]

  const team = [
    { name: "Alejandro Reyes", role: "Director Creativo", color: "from-indigo-600 to-purple-700", years: "14 años de exp." },
    { name: "Claudia Martín", role: "Directora de Estrategia", color: "from-slate-600 to-indigo-700", years: "11 años de exp." },
    { name: "Bruno Sánchez", role: "Lead Developer", color: "from-violet-600 to-fuchsia-700", years: "9 años de exp." },
    { name: "Sofía Delgado", role: "UX/UI Designer", color: "from-blue-600 to-cyan-700", years: "7 años de exp." },
  ]

  const testimonials = [
    { text: "Transformaron nuestra presencia digital de cero a referente del sector en menos de ocho meses. Su visión estratégica y ejecución impecable superaron todas nuestras expectativas.", name: "Rafael Jiménez", role: "CEO, Onda Labs", stars: 5 },
    { text: "El rebrand que hicieron para Casa Labranza fue revelador. Por fin tenemos una identidad que comunica exactamente lo que somos. El incremento de reservas fue del 40% el primer trimestre.", name: "María Castellano", role: "Directora, Casa Labranza", stars: 5 },
    { text: "Trabajar con ellos es diferente. No venden servicios, construyen soluciones reales. Su equipo entiende el negocio antes de diseñar una sola línea.", name: "Ignacio Torres", role: "Founder, Pulso Media", stars: 5 },
  ]

  const faqs = [
    { q: "¿Cuánto tarda un proyecto de branding completo?", a: "Un proyecto de branding completo (naming, identidad visual, manual de marca y tono de voz) tarda entre 6 y 10 semanas, dependiendo de la complejidad y los ciclos de revisión. Empezamos con un sprint de discovery intensivo de 2 semanas." },
    { q: "¿Trabajáis con empresas de cualquier tamaño?", a: "Sí, aunque la mayor parte de nuestra cartera son pymes y startups en fase de crecimiento. También colaboramos con marcas consolidadas que necesitan un refresh o una extensión digital." },
    { q: "¿Qué diferencia a FORMA de otras agencias?", a: "Somos un equipo pequeño y muy senior. Sin juniors asignados a proyectos importantes. La persona con quien negocias el proyecto es quien lo ejecuta. Esto garantiza coherencia, calidad y comunicación directa." },
    { q: "¿Ofrecéis mantenimiento web tras la entrega?", a: "Sí, tenemos planes de mantenimiento y soporte mensual desde 350€/mes que incluyen actualizaciones, seguridad, backups y hasta 4 horas de cambios editoriales." },
    { q: "¿Cómo es el proceso de pago?", a: "50% al inicio del proyecto, 25% al presentar el primer borrador y 25% restante en la entrega final. Para proyectos por encima de 15.000€ ofrecemos planes de pago personalizados." },
  ]

  const stats = [
    { n: "127", label: "Proyectos completados" },
    { n: "94%", label: "Clientes que repiten" },
    { n: "8", label: "Años en el mercado" },
    { n: "3x", label: "ROI medio generado" },
  ]

  return (
    <DemoLayout title="FORMA Studio" year="2026">
      {/* Custom cursor */}
      <div className="bg-[#0a0a0a] text-white min-h-screen font-sans overflow-x-hidden">

        {/* ── NAV ── */}
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference">
          <span className="font-black text-xl tracking-tighter text-white">FORMA</span>
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-white/70">
            {["Trabajo", "Servicios", "Estudio", "Contacto"].map(item => (
              <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
          <button
            className="md:hidden text-white z-50"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <button className="hidden md:block text-xs font-black tracking-widest uppercase border border-white/30 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-300 text-white">
            HABLEMOS →
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col p-8"
            >
              <button onClick={() => setMenuOpen(false)} className="self-end mb-12">
                <X size={28} className="text-white" />
              </button>
              <nav className="flex flex-col gap-6">
                {["Trabajo", "Servicios", "Estudio", "Contacto"].map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-5xl font-black tracking-tighter text-white text-left"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-auto text-xs text-white/40 tracking-widest uppercase">
                <p>+34 955 421 890</p>
                <p>hola@forma.studio</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-16 px-6 md:px-12 overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: heroY }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }}
            />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-white/50">Agencia creativa · Sevilla, España</span>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(4rem,14vw,13rem)] font-black leading-[0.85] tracking-tighter"
              >
                FORMA
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[clamp(4rem,14vw,13rem)] font-black leading-[0.85] tracking-tighter text-[#6366f1]"
              >
                STUDIO
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
            >
              <p className="text-white/60 max-w-sm text-base md:text-lg leading-relaxed font-light">
                Diseñamos marcas y experiencias digitales que generan impacto real. Estrategia, identidad y tecnología al servicio del crecimiento.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-[#6366f1] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#4f46e5] transition-colors">
                  VER TRABAJO
                </button>
                <button className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:border-white/60 transition-colors">
                  CONTACTAR
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 right-12 flex items-center gap-2 text-white/30 text-xs tracking-widest"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
            <span>SCROLL</span>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: "-80px" })
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="text-5xl md:text-6xl font-black tracking-tighter text-[#6366f1] mb-2">{s.n}</div>
                  <div className="text-xs text-white/50 tracking-widest uppercase">{s.label}</div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── SERVICIOS (TABS) ── */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0f0f1a]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="mb-16"
            >
              <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-[#6366f1] mb-4">02 — Servicios</motion.p>
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                LO QUE<br />HACEMOS.
              </motion.h2>
            </motion.div>

            <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-4">
              {Object.keys(services).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === key ? "bg-[#6366f1] text-white" : "text-white/40 hover:text-white"}`}
                >
                  {services[key].title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-16 items-start"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">{services[activeTab].title}</h3>
                  <p className="text-white/60 leading-relaxed mb-10 text-lg">{services[activeTab].desc}</p>
                  <div className="space-y-3">
                    {services[activeTab].items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                        <span className="text-sm text-white/70 tracking-wide">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="bg-[#1a1a2e] border border-[#6366f1]/20 p-8 rounded-sm">
                    <div className="text-xs text-white/40 tracking-widest uppercase mb-3">Inversión</div>
                    <div className="text-4xl font-black text-[#6366f1] tracking-tighter">{services[activeTab].price}</div>
                    <div className="mt-6 text-sm text-white/50 leading-relaxed">Incluye briefing inicial, iteraciones y entrega de archivos fuente. Presupuesto sin compromiso en 48h.</div>
                    <button className="mt-8 w-full py-4 bg-[#6366f1] text-white font-black text-sm tracking-widest uppercase hover:bg-[#4f46e5] transition-colors flex items-center justify-center gap-2">
                      SOLICITAR PRESUPUESTO <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── PROYECTOS ── */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="flex justify-between items-end mb-16"
            >
              <div>
                <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-[#6366f1] mb-4">03 — Trabajo</motion.p>
                <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  CASOS<br />SELECCIONADOS.
                </motion.h2>
              </div>
              <motion.button variants={fadeUp} className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/50 hover:text-white transition-colors">
                VER TODO <ArrowUpRight size={16} />
              </motion.button>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true, margin: "-60px" })
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 60 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className="group relative overflow-hidden cursor-pointer"
                  >
                    <div className={`aspect-[4/3] bg-gradient-to-br ${p.color} relative`}>
                      {/* Abstract pattern overlay */}
                      <div className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.4) 0%, transparent 70%)"
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                      <div className="absolute top-4 left-4 text-xs font-mono text-white/50 tracking-widest">{p.year}</div>
                      <div className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold tracking-widest bg-[#6366f1]/80 text-white">
                        {p.tag}
                      </div>
                      <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                        <ArrowUpRight size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="pt-5 pb-2">
                      <h3 className="text-2xl font-black tracking-tighter group-hover:text-[#6366f1] transition-colors">{p.name}</h3>
                      <p className="text-xs text-white/40 tracking-widest uppercase mt-1">{p.cat}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── EQUIPO ── */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0f0f1a]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16"
            >
              <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-[#6366f1] mb-4">04 — Estudio</motion.p>
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tighter">
                EL EQUIPO.
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {team.map((m, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true })
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="group"
                  >
                    <div className={`aspect-square bg-gradient-to-br ${m.color} mb-4 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-black text-white/20">{m.name.charAt(0)}</span>
                      </div>
                    </div>
                    <h3 className="font-black text-lg tracking-tighter group-hover:text-[#6366f1] transition-colors">{m.name}</h3>
                    <p className="text-xs text-white/50 tracking-widest uppercase mt-1">{m.role}</p>
                    <p className="text-xs text-[#6366f1] mt-2">{m.years}</p>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 p-8 md:p-12 border border-white/10 bg-[#0a0a0a]"
            >
              <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-2">¿Eres de los nuestros?</h3>
                  <p className="text-white/50 text-sm">Buscamos talento senior en diseño y desarrollo. Trabajo remoto, cultura horizontal.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 border border-[#6366f1] text-[#6366f1] font-black text-sm tracking-widest uppercase hover:bg-[#6366f1] hover:text-white transition-all duration-300 whitespace-nowrap">
                  VER VACANTES <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16"
            >
              <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-[#6366f1] mb-4">05 — Clientes</motion.p>
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tighter">
                LO QUE<br />DICEN.
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true })
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    className="p-8 border border-white/10 bg-[#0f0f1a] flex flex-col"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.stars)].map((_, si) => (
                        <div key={si} className="w-3 h-3 bg-[#6366f1]" />
                      ))}
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm flex-1 mb-8">"{t.text}"</p>
                    <div>
                      <div className="font-black text-sm tracking-tight">{t.name}</div>
                      <div className="text-xs text-[#6366f1] tracking-widest mt-0.5">{t.role}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0f0f1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16"
            >
              <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-[#6366f1] mb-4">06 — FAQ</motion.p>
              <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl font-black tracking-tighter">
                PREGUNTAS<br />FRECUENTES.
              </motion.h2>
            </motion.div>

            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-sm md:text-base tracking-tight pr-8">{faq.q}</span>
                    {openFaq === i ? <Minus size={16} className="text-[#6366f1] shrink-0" /> : <Plus size={16} className="text-white/40 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACTO / CTA ── */}
        <section className="py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <p className="text-xs font-mono tracking-widest uppercase text-[#6366f1] mb-6">07 — Contacto</p>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                  HAGAMOS<br />ALGO<br />GRANDE.
                </h2>
                <div className="space-y-4 text-white/50 text-sm">
                  <p>📍 Calle Sierpes 44, 2ª planta · 41004 Sevilla</p>
                  <p>📞 +34 955 421 890</p>
                  <p>✉️ hola@forma.studio</p>
                  <p>🕐 Lun–Vie 9:00–18:00</p>
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="space-y-4"
                onSubmit={e => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Nombre y empresa"
                  className="w-full bg-[#0f0f1a] border border-white/10 px-5 py-4 text-white text-sm placeholder-white/30 focus:border-[#6366f1] outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#0f0f1a] border border-white/10 px-5 py-4 text-white text-sm placeholder-white/30 focus:border-[#6366f1] outline-none transition-colors"
                />
                <select className="w-full bg-[#0f0f1a] border border-white/10 px-5 py-4 text-white/60 text-sm focus:border-[#6366f1] outline-none transition-colors appearance-none">
                  <option>¿Qué necesitas?</option>
                  <option>Branding completo</option>
                  <option>Desarrollo web</option>
                  <option>Campaña digital</option>
                  <option>Estrategia</option>
                  <option>Otro</option>
                </select>
                <textarea
                  placeholder="Cuéntanos tu proyecto..."
                  rows={4}
                  className="w-full bg-[#0f0f1a] border border-white/10 px-5 py-4 text-white text-sm placeholder-white/30 focus:border-[#6366f1] outline-none transition-colors resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-[#6366f1] text-white font-black text-sm tracking-widest uppercase hover:bg-[#4f46e5] transition-colors flex items-center justify-center gap-2"
                >
                  ENVIAR MENSAJE <ArrowRight size={16} />
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/10 py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-black text-2xl tracking-tighter text-[#6366f1]">FORMA</span>
            <p className="text-xs text-white/30 tracking-widest">© 2026 FORMA Studio. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-xs text-white/30 tracking-widest uppercase">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  )
}