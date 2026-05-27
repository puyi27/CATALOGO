"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Leaf, Wind, Droplets, Sun, TreePine, Recycle, Users, Heart, ChevronDown, ArrowRight, Mail, Phone, MapPin, Menu, X, Check } from "lucide-react";
import Link from "next/link";
import DemoLayout from "@/components/DemoLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count.toLocaleString("es-ES")}{suffix}</span>;
}

const SERVICES = [
  { icon: TreePine, title: "Reforestación Activa", desc: "Plantamos especies autóctonas en zonas degradadas de Andalucía. Cada árbol es geolocalizando y monitoreado durante 3 años para garantizar su arraigo.", color: "#4a7c59" },
  { icon: Recycle, title: "Economía Circular", desc: "Asesoramos a empresas en la transición hacia modelos de producción sin residuos, optimizando el ciclo de vida de materiales y reduciendo la huella de carbono.", color: "#6b8f5e" },
  { icon: Droplets, title: "Gestión del Agua", desc: "Proyectos de restauración de riberas, recolección de agua de lluvia y sistemas de riego eficiente para comunidades rurales y agrícolas.", color: "#5b8fa8" },
  { icon: Sun, title: "Energía Renovable", desc: "Facilitamos el acceso a instalaciones fotovoltaicas comunitarias en zonas rurales, reduciendo la dependencia de combustibles fósiles y el coste energético.", color: "#d4a843" },
  { icon: Wind, title: "Calidad del Aire", desc: "Monitorización de contaminantes atmosféricos en tiempo real y programas de sensibilización ciudadana para reducir las emisiones locales.", color: "#7aa3a3" },
  { icon: Users, title: "Educación Ambiental", desc: "Talleres en centros escolares, universidades y empresas. Más de 12.000 personas formadas en sostenibilidad y conciencia ecológica desde 2018.", color: "#8b6f4e" },
];

const STATS = [
  { value: 47800, suffix: "", label: "Árboles plantados", icon: TreePine },
  { value: 1240, suffix: " ton", label: "CO₂ compensado", icon: Wind },
  { value: 89, suffix: "%", label: "Tasa de supervivencia", icon: Leaf },
  { value: 23, suffix: "", label: "Municipios activos", icon: MapPin },
];

const PROJECTS = [
  { title: "Corredor Verde del Guadalquivir", location: "Sevilla - Córdoba", status: "En curso", year: "2024-2026", desc: "Restauración de 340 hectáreas de ribera fluvial con vegetación autóctona. El proyecto incluye la creación de corredores ecológicos para fauna amenazada.", gradient: "from-emerald-800 to-green-600", tag: "Reforestación" },
  { title: "Cero Plásticos, Sierra Sur", location: "Jaén", status: "Completado", year: "2023", desc: "Recogida de 18 toneladas de residuos plásticos en espacios naturales protegidos, con formación a 340 voluntarios locales.", gradient: "from-teal-700 to-cyan-600", tag: "Limpieza" },
  { title: "Huertos Comunitarios Urbanos", location: "Sevilla capital", status: "En curso", year: "2025", desc: "Red de 12 huertos urbanos en barrios periféricos, produciendo alimentos ecológicos para más de 600 familias sin acceso a espacios verdes.", gradient: "from-lime-700 to-green-500", tag: "Agricultura" },
];

const TEAM = [
  { name: "Dra. Carmen Vega Ruiz", role: "Directora Ejecutiva", bio: "Doctora en Ciencias Ambientales. 15 años en proyectos de conservación en Doñana.", color: "from-green-600 to-emerald-400" },
  { name: "Alejandro Morales Gil", role: "Director de Proyectos", bio: "Ingeniero forestal especializado en restauración de ecosistemas mediterráneos.", color: "from-teal-600 to-cyan-400" },
  { name: "Lucía Fernández Pons", role: "Coordinadora de Voluntariado", bio: "Gestión de comunidades. Ha movilizado más de 8.000 voluntarios en Andalucía.", color: "from-lime-600 to-green-400" },
  { name: "Ibrahima Diallo Sow", role: "Experto en Energías Renovables", bio: "Ingeniero industrial. Especialista en transición energética y comunidades rurales.", color: "from-amber-600 to-yellow-400" },
];

const TESTIMONIALS = [
  { text: "Raíces Verdes transformó la ladera de nuestra sierra. En un año, volvieron los murciélagos y las rapaces. Es emocionante.", name: "Antonio Pérez Rueda", role: "Alcalde, Priego de Córdoba", stars: 5 },
  { text: "El taller de economía circular que impartieron en nuestra empresa redujo nuestros residuos en un 67% en solo seis meses.", name: "Marta Lozano Torres", role: "Gerente, Aceites Lozano S.L.", stars: 5 },
  { text: "Mi empresa lleva tres años colaborando con ellos. La transparencia en el uso de los fondos y el rigor científico de sus proyectos son impecables.", name: "Ricardo Sousa Vidal", role: "Director RSC, Grupo Alimenta", stars: 5 },
];

const FAQ = [
  { q: "¿Cómo puedo hacerme voluntario?", a: "Puedes apuntarte a través de nuestro formulario online. Organizamos jornadas mensuales de plantación y limpieza en toda Andalucía. No se requiere experiencia previa, solo ganas de aportar." },
  { q: "¿Las donaciones son desgravables fiscalmente?", a: "Sí. Raíces Verdes es una entidad sin ánimo de lucro acogida a la Ley 49/2002. Las donaciones de particulares tienen una deducción del 80% hasta 150€ y del 35% a partir de esa cantidad." },
  { q: "¿Cómo puedo saber si mi árbol ha sobrevivido?", a: "Cada donante de árbol recibe un código de seguimiento y acceso a nuestra plataforma de monitoreo con fotos satelitales y visitas de campo actualizadas trimestralmente." },
  { q: "¿Trabajáis con empresas para compensar emisiones?", a: "Sí. Ofrecemos programas de compensación de carbono verificados bajo estándares internacionales. Calculamos tu huella, diseñamos un plan de reducción y gestionamos proyectos de compensación certificados." },
  { q: "¿Dónde operáis geográficamente?", a: "Nuestros proyectos se concentran en Andalucía, aunque participamos en redes nacionales de conservación. El 85% del presupuesto se destina a proyectos locales con impacto medible." },
];

export default function SostenibilidadDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <DemoLayout title="Raíces Verdes" year="2026">
      <div className="bg-[#f0fdf4] text-[#14532d] font-sans overflow-x-hidden">

        {/* NAV */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#f0fdf4]/90 backdrop-blur-md border-b border-[#14532d]/10">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14532d] to-[#86efac] flex items-center justify-center">
                <Leaf size={16} className="text-white" />
              </div>
              <span className="font-bold text-[#14532d] tracking-tight">Raíces Verdes</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#14532d]/70">
              {["Proyectos","Servicios","Equipo","FAQ","Contacto"].map(l => (
                <button key={l} className="hover:text-[#14532d] transition-colors">{l}</button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 bg-[#14532d] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#166534] transition-colors"
            >
              <Heart size={14} /> Donar ahora
            </motion.button>
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2"><Menu size={22} /></button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#14532d] text-white z-[100] flex flex-col p-8">
              <button onClick={() => setMenuOpen(false)} className="self-end mb-10"><X size={24} /></button>
              <div className="flex flex-col gap-8">
                {["Proyectos","Servicios","Equipo","FAQ","Contacto"].map(l => (
                  <button key={l} onClick={() => setMenuOpen(false)} className="text-3xl font-light text-left hover:text-[#86efac] transition-colors">{l}</button>
                ))}
              </div>
              <button className="mt-auto bg-[#86efac] text-[#14532d] px-6 py-4 rounded-full font-bold text-lg">Donar ahora</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section className="relative min-h-screen flex items-center pt-16">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-[#14532d] via-[#166534] to-[#15803d]" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #86efac 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4ade80 0%, transparent 40%)" }} />
            {/* Leaf pattern overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f0fdf4] to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#86efac]/20 border border-[#86efac]/40 text-[#86efac] px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-[#86efac] animate-pulse" />
                ONG Medioambiental · Andalucía
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-6">
                La tierra<br /><span className="text-[#86efac]">nos necesita</span><br />ahora.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-white/80 max-w-xl mb-10 leading-relaxed font-light">
                Desde 2018, plantamos bosques, restauramos ríos y educamos comunidades en Andalucía para construir un futuro ecológico real y medible.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="bg-[#86efac] text-[#14532d] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-[#bbf7d0] transition-colors">
                  Adopta un árbol <ArrowRight size={20} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="border border-white/40 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-colors">
                  Ver proyectos
                </motion.button>
              </motion.div>
            </motion.div>
            {/* Stats strip */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-white">
                  <s.icon size={20} className="text-[#86efac] mb-2" />
                  <div className="text-3xl font-bold"><AnimatedCounter end={s.value} suffix={s.suffix} /></div>
                  <div className="text-sm text-white/70 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* MISIÓN */}
        <section className="py-24 bg-[#f0fdf4]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="text-xs uppercase tracking-widest text-[#14532d]/60 font-semibold">Nuestra misión</span>
                <h2 className="text-5xl md:text-6xl font-bold text-[#14532d] leading-tight mt-4 mb-6">No somos una<br />ONG más.</h2>
                <p className="text-[#14532d]/80 text-lg leading-relaxed mb-6">
                  Raíces Verdes nació de la convicción de que la crisis climática exige acción local, rigurosa y medible. Cada proyecto que emprendemos tiene indicadores de impacto verificables, seguimiento científico y transparencia total en el uso de los recursos.
                </p>
                <p className="text-[#14532d]/80 text-lg leading-relaxed mb-8">
                  Trabajamos con la administración pública, el sector privado y, sobre todo, con las comunidades locales que son los verdaderos guardianes del territorio.
                </p>
                <div className="flex flex-col gap-3">
                  {["Ciencia aplicada en cada proyecto", "Transparencia total en la gestión", "Impacto medible y verificado", "Comunidades como protagonistas"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[#14532d] font-medium">
                      <div className="w-6 h-6 rounded-full bg-[#86efac] flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-[#14532d]" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#14532d] to-[#166534] rounded-3xl p-8 text-white aspect-square flex flex-col justify-end">
                    <TreePine size={32} className="text-[#86efac] mb-4" />
                    <div className="text-5xl font-bold">47K</div>
                    <div className="text-white/70 mt-1">árboles vivos</div>
                  </div>
                  <div className="bg-[#86efac] rounded-3xl p-8 text-[#14532d] mt-8">
                    <Droplets size={32} className="mb-4" />
                    <div className="text-5xl font-bold">340</div>
                    <div className="text-[#14532d]/70 mt-1">hectáreas restauradas</div>
                  </div>
                  <div className="bg-[#dcfce7] rounded-3xl p-8 text-[#14532d]">
                    <Users size={32} className="mb-4" />
                    <div className="text-5xl font-bold">8.2K</div>
                    <div className="text-[#14532d]/70 mt-1">voluntarios activos</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#064e3b] to-[#14532d] rounded-3xl p-8 text-white -mt-8">
                    <Wind size={32} className="text-[#86efac] mb-4" />
                    <div className="text-5xl font-bold">1.2K</div>
                    <div className="text-white/70 mt-1">ton CO₂ capturado</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#14532d]/60 font-semibold">Lo que hacemos</span>
              <h2 className="text-5xl font-bold text-[#14532d] mt-4">Áreas de actuación</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(20,83,45,0.12)" }}
                  className="bg-[#f0fdf4] border border-[#14532d]/10 rounded-2xl p-8 cursor-pointer transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: s.color + "22" }}>
                    <s.icon size={24} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#14532d] mb-3">{s.title}</h3>
                  <p className="text-[#14532d]/70 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section className="py-24 bg-[#14532d]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <span className="text-xs uppercase tracking-widest text-[#86efac]/80 font-semibold">En el terreno</span>
              <h2 className="text-5xl font-bold text-white mt-4">Proyectos destacados</h2>
            </motion.div>
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {PROJECTS.map((p, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === i ? "bg-[#86efac] text-[#14532d]" : "border border-white/30 text-white/70 hover:border-white/60"}`}>
                  {p.title}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {PROJECTS.map((p, i) => activeTab === i && (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/10 rounded-3xl overflow-hidden">
                  <div className={`bg-gradient-to-br ${p.gradient} min-h-64 md:min-h-80 flex items-end p-8`}>
                    <div>
                      <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{p.tag}</span>
                      <h3 className="text-3xl font-bold text-white mt-3">{p.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={14} className="text-[#86efac]" />
                      <span className="text-white/70 text-sm">{p.location}</span>
                      <span className={`ml-auto text-xs px-3 py-1 rounded-full font-medium ${p.status === "Completado" ? "bg-[#86efac]/20 text-[#86efac]" : "bg-white/20 text-white"}`}>{p.status}</span>
                    </div>
                    <p className="text-white/80 text-lg leading-relaxed mb-6">{p.desc}</p>
                    <div className="text-sm text-white/50 font-mono">{p.year}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* EQUIPO */}
        <section className="py-24 bg-[#f0fdf4]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#14532d]/60 font-semibold">Las personas detrás</span>
              <h2 className="text-5xl font-bold text-[#14532d] mt-4">Nuestro equipo</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }} className="bg-white border border-[#14532d]/10 rounded-2xl overflow-hidden">
                  <div className={`h-40 bg-gradient-to-br ${m.color}`} />
                  <div className="p-6">
                    <h3 className="font-bold text-[#14532d]">{m.name}</h3>
                    <p className="text-xs text-[#14532d]/60 font-medium uppercase tracking-wider mt-1 mb-3">{m.role}</p>
                    <p className="text-sm text-[#14532d]/70 leading-relaxed">{m.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#14532d]/60 font-semibold">Voces del territorio</span>
              <h2 className="text-5xl font-bold text-[#14532d] mt-4">Lo que dicen</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="bg-[#f0fdf4] border border-[#14532d]/10 rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">{Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-[#86efac] text-lg">★</span>
                  ))}</div>
                  <p className="text-[#14532d]/80 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div>
                    <div className="font-bold text-[#14532d]">{t.name}</div>
                    <div className="text-sm text-[#14532d]/60">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-[#f0fdf4]">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#14532d]/60 font-semibold">Preguntas frecuentes</span>
              <h2 className="text-5xl font-bold text-[#14532d] mt-4">Resolvemos tus dudas</h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-white border border-[#14532d]/10 rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left font-semibold text-[#14532d] hover:bg-[#f0fdf4] transition-colors">
                    {item.q}
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} className="text-[#14532d]/50 flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-6 pb-6 text-[#14532d]/70 leading-relaxed border-t border-[#14532d]/10 pt-4">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO / DONAR */}
        <section className="py-24 bg-[#14532d]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="text-xs uppercase tracking-widest text-[#86efac]/80 font-semibold">Únete al movimiento</span>
                <h2 className="text-5xl font-bold text-white mt-4 mb-6">Actúa ahora,<br />la tierra espera.</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-10">
                  Recibe nuestras actualizaciones, alertas de voluntariado y el informe anual de impacto directo en tu correo.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white/80">
                    <Phone size={18} className="text-[#86efac]" />
                    <span>+34 955 342 108</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <Mail size={18} className="text-[#86efac]" />
                    <span>contacto@raicesverdes.org</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <MapPin size={18} className="text-[#86efac]" />
                    <span>C/ San Fernando, 15, 41004 Sevilla</span>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#86efac] flex items-center justify-center mx-auto mb-4">
                      <Check size={28} className="text-[#14532d]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Gracias por unirte!</h3>
                    <p className="text-white/70">Pronto recibirás nuestras noticias de impacto.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                    <h3 className="text-2xl font-bold text-white mb-6">Recibe nuestro boletín</h3>
                    <input type="text" placeholder="Tu nombre" required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-[#86efac] transition-colors" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Tu email" required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-[#86efac] transition-colors" />
                    <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/70 outline-none focus:border-[#86efac] transition-colors">
                      <option value="">¿Cómo quieres colaborar?</option>
                      <option>Voluntariado</option>
                      <option>Donación mensual</option>
                      <option>Colaboración empresarial</option>
                      <option>Solo información</option>
                    </select>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#86efac] text-[#14532d] py-4 rounded-xl font-bold text-lg hover:bg-[#bbf7d0] transition-colors flex items-center justify-center gap-2">
                      Quiero colaborar <ArrowRight size={18} />
                    </motion.button>
                    <p className="text-white/40 text-xs text-center">Sin spam. Baja cuando quieras. Datos seguros.</p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#052e16] py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Leaf size={18} className="text-[#86efac]" />
              <span className="font-bold">Raíces Verdes</span>
              <span className="text-white/40 text-sm">· ONG registrada en Andalucía · CIF G-41902347</span>
            </div>
            <div className="flex gap-6 text-white/50 text-sm">
              <button className="hover:text-white transition-colors">Aviso legal</button>
              <button className="hover:text-white transition-colors">Privacidad</button>
              <button className="hover:text-white transition-colors">Memorias anuales</button>
            </div>
            <div className="text-white/40 text-sm">© 2026 Raíces Verdes</div>
          </div>
        </footer>
      </div>
    </DemoLayout>
  );
}
