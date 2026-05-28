"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Truck, Navigation, Clock, ShieldCheck, Gauge, Menu, X, ChevronRight, MapPin } from "lucide-react"
import DemoLayout from "@/components/DemoLayout"

export default function TransporteDemo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFleet, setSelectedFleet] = useState(0)
  const [simSpeed, setSimSpeed] = useState(60)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    import('animejs').then((animeModule) => {
      const anime = animeModule.default;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.anime-tech-item',
              scale: [0.8, 1],
              opacity: [0, 1],
              delay: anime.stagger(150),
              easing: 'easeOutElastic(1, .8)',
              duration: 1200
            });
            observer.disconnect();
          }
        });
      });
      const el = document.querySelector('.anime-tech-container');
      if(el) observer.observe(el);
    });
  }, []);

  const fleet = [
    { name: "FTR 4000", type: "Furgón Refrigerado", capacity: "4.000 kg", range: "650 km", consumption: "28 L/100km", status: "En ruta", eta: "2h 14m" },
    { name: "MEGA 18T", type: "Tráiler Articulado", capacity: "18.000 kg", range: "1.200 km", consumption: "32 L/100km", status: "Disponible", eta: "—" },
    { name: "CITY 3.5", type: "Furgoneta Urbana", capacity: "3.500 kg", range: "280 km", consumption: "12 L/100km", status: "En ruta", eta: "0h 45m" },
  ]

  const routes = [
    { from: "Alcalá de Guadaíra", to: "Polígono Cabeza Hermosa", type: "Distribución Local", freq: "Diaria", time: "45 min" },
    { from: "Alcalá de Guadaíra", to: "Puerto de Sevilla", type: "Exportación", freq: "3/semana", time: "1h 30m" },
    { from: "Alcalá de Guadaíra", to: "Madrid", type: "Larga Distancia", freq: "5/semana", time: "5h 30m" },
  ]

  const stats = [
    { icon: Truck, value: "12", label: "Vehículos en Flota" },
    { icon: Navigation, value: "98.7%", label: "Tasa de Entrega" },
    { icon: Clock, value: "2.4 h", label: "Tiempo Medio" },
    { icon: ShieldCheck, value: "0", label: "Incidencias/ mes" },
  ]

  return (
    <DemoLayout title="Gestión de Transporte">
    <div ref={containerRef} className="relative text-white font-sans overflow-hidden md:cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-[#38BDF8] rounded-full pointer-events-none z-50 hidden md:block"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />

      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-[#38BDF8] active:scale-95 transition-all">
          <ArrowLeft size={14} />
          <span className="hidden md:inline">Catálogo</span>
        </Link>
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-[#38BDF8]" />
          <span className="text-sm tracking-[0.2em] font-bold">LOGISUR</span>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="p-2 active:scale-90 hover:text-[#38BDF8] transition-all">
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A] z-50 flex flex-col items-center justify-center px-6"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2 active:scale-90 hover:text-[#38BDF8] transition-all">
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6 text-center">
              {["Flota", "Rutas", "Estadísticas", "Contacto"].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl md:text-5xl font-light tracking-widest hover:text-[#38BDF8] active:scale-95 transition-all cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-[100svh] flex flex-col justify-center items-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-transparent to-[#0F172A]" />
        </div>
        <div className="relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-[#38BDF8] text-xs tracking-[0.3em] uppercase mb-4 block">Logística Industrial en Tiempo Real</span>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
              Tu Flota.<br />Tu Control.
            </h1>
            <p className="text-sm md:text-lg text-white/60 max-w-xl mx-auto tracking-wide">
              Gestión de flotas, rutas dinámicas y telemetría en vivo para empresas de transporte.
            </p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-10 px-8 py-4 bg-[#38BDF8] text-[#0F172A] text-xs tracking-widest uppercase font-bold hover:bg-white active:scale-95 transition-all inline-flex items-center gap-2"
          >
            Simular Ruta <Navigation size={14} />
          </motion.button>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 text-[#38BDF8]/50 text-xs tracking-widest">
          \u25BC DESPLAZAR
        </motion.div>
      </section>

      <section className="py-24 md:py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Flota Activa</h2>
              <p className="text-sm text-white/40 tracking-widest uppercase mt-2 font-mono">Selecciona un vehículo para ver su estado</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/60 tracking-widest uppercase">{fleet.filter(f => f.status === "En ruta").length} vehículos activos</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {fleet.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setSelectedFleet(i)}
                className={`text-left p-6 border transition-all duration-300 active:scale-[0.98] ${
                  selectedFleet === i
                    ? "border-[#38BDF8] bg-[#38BDF8]/10"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <Truck size={20} className={selectedFleet === i ? "text-[#38BDF8]" : "text-white/40"} />
                  <span className={`text-xs tracking-widest uppercase font-mono px-2 py-1 ${
                    v.status === "En ruta" ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/60"
                  }`}>{v.status}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{v.name}</h3>
                <p className="text-xs text-white/40 tracking-wider mb-4">{v.type}</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-white/60">
                  <span>Capacidad: {v.capacity}</span>
                  <span>Autonomía: {v.range}</span>
                </div>
                {v.status === "En ruta" && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-[#38BDF8] tracking-widest">ETA: {v.eta}</span>
                    <ChevronRight size={14} className="text-[#38BDF8]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFleet}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Gauge size={20} className="text-[#38BDF8]" />
                  <span className="text-xs tracking-widest uppercase font-mono">Simulación de velocidad media</span>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <span className="text-xs font-mono text-white/60">{simSpeed} km/h</span>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    value={simSpeed}
                    onChange={(e) => setSimSpeed(e.target.value)}
                    className="w-full md:w-48 accent-[#38BDF8]"
                  />
                  <span className="text-xs font-mono text-[#38BDF8]">{Math.round((simSpeed / 120) * 100)}%</span>
                </div>
              </div>
              <div className="h-2 bg-white/5 mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-[#38BDF8]"
                  animate={{ width: `${(simSpeed / 120) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 border-t border-white/10 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">Rutas Estratégicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {routes.map((route, i) => (
              <motion.div
                key={route.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-white/10 hover:border-[#38BDF8]/30 transition-all group"
              >
                <div className="flex justify-between mb-6">
                  <MapPin size={20} className="text-[#38BDF8] opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xs font-mono text-white/40">{route.freq}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{route.from}</h3>
                <div className="flex items-center gap-2 text-[#38BDF8] text-sm mb-4">
                  <ChevronRight size={14} />
                  <span>{route.to}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-white/40 pt-4 border-t border-white/10">
                  <span>{route.type}</span>
                  <span className="text-[#38BDF8]">{route.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Métrica Operativa</h2>
          <p className="text-sm text-white/40 tracking-widest uppercase font-mono mb-12">Datos agregados de la flota</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-white/10 text-center hover:border-[#38BDF8]/30 transition-all"
              >
                <s.icon size={24} className="mx-auto mb-4 text-[#38BDF8] opacity-60" />
                <div className="text-3xl md:text-4xl font-black tracking-tighter mb-2">{s.value}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1px] h-32 bg-[#38BDF8]" />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Tecnología Embarcada</h2>
          <p className="text-sm text-white/40 tracking-widest uppercase font-mono mb-12">Sensores IoT en cada unidad</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 anime-tech-container">
            {[
              { title: "Control de Frío", value: "-18°C", desc: "Monitorización continua" },
              { title: "Telemetría", value: "Activo", desc: "Datos OBD2 en tiempo real" },
              { title: "Dashcam", value: "4K", desc: "Análisis de conducción" },
              { title: "Rastreador GPS", value: "Sub-metro", desc: "Precisión satelital" }
            ].map((tech, i) => (
              <div key={i} className="anime-tech-item opacity-0 p-6 border border-white/10 hover:border-[#38BDF8] bg-white/5 transition-colors">
                <div className="text-xs text-[#38BDF8] tracking-widest uppercase mb-4">{tech.title}</div>
                <div className="text-3xl font-black mb-2">{tech.value}</div>
                <div className="text-xs font-mono text-white/40">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40 px-6 border-t border-white/10 bg-[#0A0F1E] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="text-[#38BDF8] text-xs tracking-[0.3em] uppercase mb-4 block">¿Listo para digitalizar tu flota?</span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">Solicita una Demo</h2>
          <p className="text-white/40 text-sm md:text-base mb-10 max-w-lg mx-auto">
            Te mostramos cómo nuestra plataforma puede reducir tus costes operativos y mejorar la eficiencia de tu flota.
          </p>
          <button className="px-10 py-5 bg-[#38BDF8] text-[#0F172A] text-xs tracking-widest uppercase font-bold hover:bg-white active:scale-95 transition-all inline-flex items-center gap-2">
            Solicitar Demo <Navigation size={14} />
          </button>
        </motion.div>
      </section>

      <footer className="bg-[#0F172A] py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white/40 tracking-widest font-mono gap-6">
          <div className="flex items-center gap-2">
            <Truck size={14} className="text-[#38BDF8]" />
            <span>© 2026 LOGISUR TRANSPORT</span>
          </div>
          <div className="flex gap-8">
            <span className="hover:text-white active:opacity-60 transition-all cursor-pointer">LinkedIn</span>
            <span className="hover:text-white active:opacity-60 transition-all cursor-pointer">Blog</span>
            <span className="hover:text-white active:opacity-60 transition-all cursor-pointer">Legal</span>
          </div>
        </div>
      </footer>
    </div>
    </DemoLayout>
  )
}
