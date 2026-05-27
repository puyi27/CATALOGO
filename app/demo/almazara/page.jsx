"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { Leaf, Droplets, Sun, Award, ShoppingBag, ChevronDown, Star, MapPin, Phone, Mail, TreePine } from "lucide-react"
import DemoLayout from "@/components/DemoLayout"

// Almazara San Isidro — Finca oleícola artesanal
// Identidad: Orgánica · Serif elegante · Tierra y verde oliva · Espaciado generoso · Editorial lento

export default function AlmazaraSanIsidro() {
  const [activeVarietal, setActiveVarietal] = useState(0)
  const [openSection, setOpenSection] = useState(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const varietales = [
    {
      nombre: "Picual Reserva",
      codigo: "ASI-01",
      precio: "24,90 €",
      ml: "500 ml",
      cosecha: "Noviembre 2025",
      acidez: "< 0,15°",
      aromas: ["Tomate verde", "Higuera", "Hierba recién cortada", "Almendra amarga"],
      maridaje: "Gazpacho, carnes a la brasa, quesos curados, pan con tomate",
      desc: "Nuestra joya de la corona. Una Picual de montaña con una intensidad y complejidad aromática que rivalizan con los mejores AOVEs del mundo. Récord de puntuación en el Concurso Internacional de Jaén 2025.",
      gradColor: "from-[#3d5a2e] to-[#1f2e17]",
      accentColor: "#6b8f54",
      medal: "🥇 Oro — CIJ 2025"
    },
    {
      nombre: "Arbequina Suave",
      codigo: "ASI-02",
      precio: "22,90 €",
      ml: "500 ml",
      cosecha: "Octubre 2025",
      acidez: "< 0,10°",
      aromas: ["Manzana golden", "Plátano maduro", "Almendra dulce", "Vainilla sutil"],
      maridaje: "Ensaladas, pescados al vapor, postres, helados artesanos",
      desc: "Elegante y equilibrada. Nuestra Arbequina temprana, recogida a mano en la segunda semana de octubre cuando los frutos apenas viran de verde a violeta. Ideal para iniciarse en el mundo del AOVE.",
      gradColor: "from-[#8B7355] to-[#5c4d38]",
      accentColor: "#c4a97d",
      medal: "🥈 Plata — EVOOLEUM 2025"
    },
    {
      nombre: "Blend Centenario",
      codigo: "ASI-03",
      precio: "32,50 €",
      ml: "500 ml",
      cosecha: "Noviembre 2025",
      acidez: "< 0,20°",
      aromas: ["Alcachofa", "Nuez fresca", "Pimiento verde", "Pienso de heno"],
      maridaje: "Todo tipo de cocinas, aliñar en crudo, sofritos, guisos tradicionales",
      desc: "La mezcla familiar. Fruto de tres generaciones seleccionando los mejores árboles de más de 200 años. Complejo, generoso y profundo. Cada botella contiene el alma de la finca.",
      gradColor: "from-[#4a7c59] to-[#2d4e36]",
      accentColor: "#7ab594",
      medal: "🏆 Gran Oro — Mario Solinas 2024"
    },
    {
      nombre: "Hojiblanca Premium",
      codigo: "ASI-04",
      precio: "26,90 €",
      ml: "500 ml",
      cosecha: "Diciembre 2025",
      acidez: "< 0,25°",
      aromas: ["Manzana verde", "Hierba mojada", "Tomate cherry", "Cardamomo"],
      maridaje: "Tapas, embutidos ibéricos, arroces caldosos, croquetas",
      desc: "La variedad más andaluza en manos de la familia más andaluza. Nuestra Hojiblanca cosechada en diciembre cuando el frío abraza la sierra y la aceituna alcanza su máximo potencial polifenólico.",
      gradColor: "from-[#5c7a3e] to-[#384d27]",
      accentColor: "#8db870",
      medal: "🥇 Oro — Biol 2025"
    }
  ]

  const proceso = [
    { n: "01", titulo: "Cosecha Manual", desc: "Valeo a mano en noviembre, cuando la aceituna está en su punto óptimo de maduración. Prohibidas las máquinas en nuestra finca.", icon: "🫒" },
    { n: "02", titulo: "Transporte Inmediato", desc: "Del árbol a la almazara en menos de 4 horas. Cada minuto cuenta para preservar los aromas y polifenoles del fruto.", icon: "🚜" },
    { n: "03", titulo: "Molturación en Frío", desc: "La aceituna se muele a menos de 27°C. Sin calor adicional, sin disolventes. Solo presión mecánica y tiempo.", icon: "⚙️" },
    { n: "04", titulo: "Análisis y Selección", desc: "Cada lote es analizado por nuestro panel de cata propio antes de envasarse. Solo los mejores pasan el corte.", icon: "🔬" },
    { n: "05", titulo: "Envasado al Vacío", desc: "Envasado en botellas oscuras con atmósfera inerte de nitrógeno para preservar la frescura durante 18 meses.", icon: "🍶" },
    { n: "06", titulo: "Entrega a Domicilio", desc: "Enviamos a toda España en 24-48h en caja refrigerada. También enviamos a Europa en 3-5 días laborables.", icon: "📦" },
  ]

  const equipo = [
    { nombre: "Don Ernesto Villalba", rol: "Maestro Almazarero", desde: "4ª generación", color: "from-[#4a7c59] to-[#2d4e36]" },
    { nombre: "Isabel Villalba Ruiz", rol: "Directora Técnica", desde: "Ing. Agrónoma · UJA", color: "from-[#8B7355] to-[#5c4d38]" },
    { nombre: "Carlos Villalba Ruiz", rol: "Responsable Comercial", desde: "15 años de experiencia", color: "from-[#3d5a2e] to-[#1f2e17]" },
    { nombre: "Antonia García Mora", rol: "Panel de Cata Jefa", desde: "Catadora internacional", color: "from-[#6b5c44] to-[#3d3426]" },
  ]

  const testimonios = [
    { texto: "El Blend Centenario es el mejor aceite que he probado en mi vida. Lo compro cada año desde 2018 y nunca defrauda. Mis clientes del restaurante lo adoran.", nombre: "Chef Paco Montoya", lugar: "Restaurante El Majuelo, Córdoba", estrellas: 5 },
    { texto: "Llevo años buscando un AOVE de verdad y por fin lo encontré. La Picual Reserva es otro nivel. El packaging es precioso y llega perfectamente embalado.", nombre: "Lucía Fernández", lugar: "Madrid", estrellas: 5 },
    { texto: "Visitamos la finca en otoño y fue una experiencia inolvidable. La familia Villalba te recibe como si fueras de la casa. El aceite, sin palabras.", nombre: "Familia Ruiz-Castro", lugar: "Valencia", estrellas: 5 },
  ]

  const galardones = [
    { titulo: "Gran Oro Mario Solinas", entidad: "Consejo Oleícola Internacional", año: "2024" },
    { titulo: "Oro EVOOLEUM 100", entidad: "Revista EVOOLEUM", año: "2025" },
    { titulo: "Mejor AOVE Ecológico España", entidad: "Ministerio de Agricultura", año: "2023" },
    { titulo: "Oro Concurso Internacional Jaén", entidad: "Diputación de Jaén", año: "2025" },
  ]

  return (
    <DemoLayout title="Almazara San Isidro" year="2026">
      <div ref={containerRef} className="bg-[#F5F0E8] text-[#2d2416] font-serif overflow-x-hidden">

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 h-0.5 bg-[#4a7c59] z-50 origin-left"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        {/* ── HERO ── Full-screen editorial */}
        <section className="min-h-screen relative flex flex-col">
          {/* Fondo degradado orgánico */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f2e17] via-[#2d4e36] to-[#1f2e17]">
            {/* Textura sutil de olivos */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(ellipse at 20% 50%, #6b8f54 0%, transparent 50%),
                                   radial-gradient(ellipse at 80% 20%, #8B7355 0%, transparent 50%),
                                   radial-gradient(ellipse at 60% 80%, #4a7c59 0%, transparent 40%)`
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-16 py-16 md:py-24">
            {/* Logo área */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-auto"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#c4a97d] flex items-center justify-center">
                <Leaf size={18} className="text-[#c4a97d]" />
              </div>
              <div>
                <div className="text-[#F5F0E8] text-xs tracking-[0.4em] uppercase font-sans">Almazara</div>
                <div className="text-[#c4a97d] text-xs tracking-[0.3em] uppercase font-sans">San Isidro</div>
              </div>
            </motion.div>

            {/* Headline central */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[#c4a97d] font-sans text-xs tracking-[0.5em] uppercase mb-8"
              >
                Prensado en frío · Desde 1924 · Jaén, Andalucía
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: 140 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] text-[#F5F0E8] font-serif font-light tracking-tighter"
                >
                  El aceite
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: 140 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] text-[#7ab594] italic font-serif font-light tracking-tighter"
                >
                  que sí importa.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-[#F5F0E8]/60 font-sans font-light text-lg max-w-xl leading-relaxed"
              >
                Cuatro generaciones cultivando olivos centenarios en la sierra de Cazorla. Sin intermediarios. Sin compromiso con el sabor.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex gap-4 mt-10"
              >
                <button className="px-8 py-4 bg-[#4a7c59] text-[#F5F0E8] font-sans text-sm tracking-widest uppercase hover:bg-[#3d6b4a] transition-colors">
                  Tienda Online
                </button>
                <button className="px-8 py-4 border border-[#c4a97d]/40 text-[#c4a97d] font-sans text-sm tracking-widest uppercase hover:border-[#c4a97d] transition-colors">
                  Visitar la Finca
                </button>
              </motion.div>
            </div>

            {/* Badges al pie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap gap-4 mt-16"
            >
              {["🏅 4 Medallas Internacionales", "🌿 Certificación Ecológica", "📍 D.O. Sierra de Cazorla", "🫒 +3.000 árboles centenarios"].map(b => (
                <span key={b} className="text-xs font-sans text-[#F5F0E8]/50 tracking-widest border border-white/10 px-4 py-2">{b}</span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HISTORIA ── Editorial texto + visual */}
        <section className="py-24 md:py-40 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="md:col-span-5"
              >
                <div className="text-[#8B7355] font-sans text-xs tracking-[0.5em] uppercase mb-6">— Nuestra historia</div>
                <h2 className="text-5xl md:text-6xl font-serif font-light leading-tight tracking-tighter mb-8">
                  Cuatro generaciones.<br />
                  <em className="text-[#4a7c59]">Un único compromiso.</em>
                </h2>
                <div className="space-y-5 text-[#2d2416]/70 font-sans font-light text-base leading-relaxed">
                  <p>En 1924, el abuelo Isidro Villalba plantó los primeros olivos en las faldas de la Sierra de Cazorla. Lo que empezó como una pequeña almazara familiar se convirtió en cuatro generaciones de obsesión por el aceite perfecto.</p>
                  <p>Hoy, su bisnieta Isabel dirige la parte técnica con titulación en Ingeniería Agronómica, y su hermano Carlos se ocupa de llevar el sabor de la sierra a las mejores mesas de España y Europa.</p>
                  <p>Somos pequeños por elección. Producimos menos de 12.000 litros al año para garantizar que cada botella es perfecta.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="md:col-span-7"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#3d5a2e] to-[#1f2e17] rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <TreePine size={40} className="text-[#7ab594] mb-4 opacity-60" />
                      <span className="text-[#F5F0E8]/80 font-sans text-sm tracking-widest">+100 años</span>
                      <span className="text-[#c4a97d] font-sans text-xs mt-1">Olivos centenarios</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="text-xs font-sans text-[#F5F0E8]/60 tracking-widest">Sierra de Cazorla, Jaén</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="aspect-square bg-gradient-to-br from-[#8B7355] to-[#5c4d38] rounded-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-serif text-[#F5F0E8] font-light">1924</div>
                        <div className="text-xs font-sans text-[#c4a97d] tracking-widest mt-1">Fundación</div>
                      </div>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-[#4a7c59] to-[#2d4e36] rounded-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-serif text-[#F5F0E8] font-light">12K</div>
                        <div className="text-xs font-sans text-[#7ab594] tracking-widest mt-1">Litros/año</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ACEITES (SELECTOR INTERACTIVO) ── */}
        <section className="py-24 md:py-40 bg-[#2d2416] text-[#F5F0E8]">
          <div className="px-6 md:px-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-16"
            >
              <div className="text-[#c4a97d] font-sans text-xs tracking-[0.5em] uppercase mb-6">— Colección 2025/26</div>
              <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tighter leading-tight">
                Nuestros<br /><em className="text-[#7ab594]">Aceites.</em>
              </h2>
            </motion.div>

            {/* Tabs varietales */}
            <div className="flex flex-wrap gap-3 mb-12">
              {varietales.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVarietal(i)}
                  className={`px-5 py-2.5 font-sans text-sm tracking-widest transition-all duration-400 border ${
                    activeVarietal === i
                      ? "bg-[#4a7c59] border-[#4a7c59] text-white"
                      : "border-white/20 text-white/50 hover:border-white/50 hover:text-white/80"
                  }`}
                >
                  {v.nombre}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVarietal}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-12 items-start"
              >
                {/* Visual */}
                <div className={`aspect-[4/5] bg-gradient-to-br ${varietales[activeVarietal].gradColor} rounded-sm relative overflow-hidden flex flex-col justify-between p-8`}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-sans tracking-widest text-white/40">{varietales[activeVarietal].codigo}</span>
                    <span className="text-sm font-sans bg-white/10 px-3 py-1 text-white/80">{varietales[activeVarietal].medal}</span>
                  </div>
                  <div>
                    <div className="text-[#F5F0E8]/30 font-sans text-xs tracking-widest mb-2 uppercase">Variedad</div>
                    <div className="text-4xl font-serif text-[#F5F0E8] font-light italic">{varietales[activeVarietal].nombre}</div>
                    <div className="text-[#c4a97d] text-4xl font-serif font-light mt-2">{varietales[activeVarietal].precio}</div>
                    <div className="text-xs font-sans text-white/30 mt-1">{varietales[activeVarietal].ml} · Cosecha {varietales[activeVarietal].cosecha}</div>
                  </div>
                </div>

                {/* Ficha técnica */}
                <div className="flex flex-col gap-8 pt-4">
                  <div>
                    <div className="text-[#c4a97d] font-sans text-xs tracking-widest uppercase mb-3">Descripción</div>
                    <p className="text-[#F5F0E8]/75 font-sans font-light text-base leading-relaxed">{varietales[activeVarietal].desc}</p>
                  </div>

                  <div>
                    <div className="text-[#c4a97d] font-sans text-xs tracking-widest uppercase mb-4">Perfil Aromático</div>
                    <div className="flex flex-wrap gap-2">
                      {varietales[activeVarietal].aromas.map(a => (
                        <span key={a} className="px-3 py-1.5 border border-white/15 text-xs font-sans text-white/60 tracking-wide">{a}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-[#c4a97d] font-sans text-xs tracking-widest uppercase mb-2">Acidez</div>
                      <div className="text-2xl font-serif text-[#F5F0E8]">{varietales[activeVarietal].acidez}</div>
                    </div>
                    <div>
                      <div className="text-[#c4a97d] font-sans text-xs tracking-widest uppercase mb-2">Cosecha</div>
                      <div className="text-2xl font-serif text-[#F5F0E8]">{varietales[activeVarietal].cosecha.split(" ")[0]}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[#c4a97d] font-sans text-xs tracking-widest uppercase mb-2">Maridaje</div>
                    <p className="text-[#F5F0E8]/60 font-sans text-sm">{varietales[activeVarietal].maridaje}</p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 py-4 bg-[#4a7c59] text-white font-sans text-sm tracking-widest uppercase hover:bg-[#3d6b4a] transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag size={16} /> Añadir al carrito
                    </button>
                    <button className="px-6 py-4 border border-white/20 text-white/60 font-sans text-sm tracking-widest uppercase hover:border-white/50 hover:text-white transition-colors">
                      Pack regalo
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── PROCESO ── Timeline horizontal */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-16"
            >
              <div className="text-[#8B7355] font-sans text-xs tracking-[0.5em] uppercase mb-6">— Del árbol a la mesa</div>
              <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tighter leading-tight text-[#2d2416]">
                El proceso<br /><em className="text-[#4a7c59]">artesanal.</em>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {proceso.map((p, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true, margin: "-60px" })
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.12 }}
                    className="group"
                  >
                    <div className="mb-5 flex items-start gap-4">
                      <div className="text-3xl">{p.icon}</div>
                      <div className="text-[#8B7355] font-sans text-xs tracking-widest pt-1">{p.n}</div>
                    </div>
                    <h3 className="text-xl font-serif text-[#2d2416] mb-3 group-hover:text-[#4a7c59] transition-colors">{p.titulo}</h3>
                    <p className="text-[#2d2416]/60 font-sans font-light text-sm leading-relaxed">{p.desc}</p>
                    <div className="mt-5 h-0.5 bg-[#4a7c59]/20 group-hover:bg-[#4a7c59]/50 transition-colors" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── GALARDONES ── */}
        <section className="py-20 px-6 md:px-16 bg-[#2d2416]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="text-[#c4a97d] font-sans text-xs tracking-[0.5em] uppercase mb-4">— Reconocimientos</div>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[#F5F0E8] tracking-tighter">Premiados en todo el mundo.</h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-4">
              {galardones.map((g, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true })
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="border border-[#c4a97d]/20 p-6 text-center hover:border-[#c4a97d]/50 transition-colors"
                  >
                    <Award size={24} className="text-[#c4a97d] mx-auto mb-4" />
                    <div className="text-sm font-serif text-[#F5F0E8] mb-2">{g.titulo}</div>
                    <div className="text-xs font-sans text-[#F5F0E8]/40 tracking-wide mb-1">{g.entidad}</div>
                    <div className="text-[#c4a97d] font-sans text-xs tracking-widest">{g.año}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── EQUIPO ── */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#F5F0E8]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-16"
            >
              <div className="text-[#8B7355] font-sans text-xs tracking-[0.5em] uppercase mb-6">— Familia Villalba</div>
              <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tighter text-[#2d2416]">
                Las personas<br /><em className="text-[#4a7c59]">detrás del aceite.</em>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {equipo.map((m, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true })
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    className="group"
                  >
                    <div className={`aspect-[3/4] bg-gradient-to-br ${m.color} mb-5 relative overflow-hidden rounded-sm`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-7xl font-serif text-white/10 font-light">{m.nombre.charAt(0)}</span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <h3 className="font-serif text-lg text-[#2d2416] group-hover:text-[#4a7c59] transition-colors">{m.nombre}</h3>
                    <p className="font-sans text-xs text-[#8B7355] tracking-widest uppercase mt-1">{m.rol}</p>
                    <p className="font-sans text-xs text-[#2d2416]/50 mt-1">{m.desde}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section className="py-24 px-6 md:px-16 bg-[#4a7c59] text-[#F5F0E8]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tighter">Lo que dicen nuestros clientes.</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonios.map((t, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true })
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    className="bg-white/10 p-8 rounded-sm"
                  >
                    <div className="flex gap-1 mb-5">
                      {[...Array(t.estrellas)].map((_, si) => (
                        <Star key={si} size={14} className="text-[#c4a97d] fill-[#c4a97d]" />
                      ))}
                    </div>
                    <p className="font-sans font-light text-[#F5F0E8]/85 leading-relaxed text-sm mb-6 italic">"{t.texto}"</p>
                    <div>
                      <div className="font-sans font-medium text-sm text-[#F5F0E8]">{t.nombre}</div>
                      <div className="font-sans text-xs text-[#F5F0E8]/50 tracking-wide mt-0.5">{t.lugar}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACTO / VISITAS ── */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#F5F0E8]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <div className="text-[#8B7355] font-sans text-xs tracking-[0.5em] uppercase mb-6">— Visítanos</div>
                <h2 className="text-5xl font-serif font-light tracking-tighter text-[#2d2416] mb-8">
                  Ven a vivir<br />
                  <em className="text-[#4a7c59]">la finca.</em>
                </h2>
                <p className="font-sans font-light text-[#2d2416]/70 leading-relaxed mb-10">
                  Ofrecemos visitas guiadas a la almazara con cata de aceites incluida. Grupos reducidos, atención personalizada de la familia Villalba. Mañanas de martes a sábado con reserva previa.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: MapPin, text: "Ctra. de Cazorla km 14, 23470 Cazorla, Jaén" },
                    { icon: Phone, text: "+34 953 721 145" },
                    { icon: Mail, text: "visitas@almazarasanisidro.es" },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Icon size={16} className="text-[#4a7c59] mt-0.5 shrink-0" />
                      <span className="font-sans text-sm text-[#2d2416]/70">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 text-sm font-sans text-[#2d2416]/60">
                  <div>
                    <div className="text-[#8B7355] text-xs tracking-widest uppercase mb-2">Visita básica</div>
                    <div className="font-serif text-2xl text-[#2d2416]">15 €/persona</div>
                    <div className="text-xs mt-1">Incluye cata de 3 aceites</div>
                  </div>
                  <div>
                    <div className="text-[#8B7355] text-xs tracking-widest uppercase mb-2">Visita Premium</div>
                    <div className="font-serif text-2xl text-[#2d2416]">35 €/persona</div>
                    <div className="text-xs mt-1">Cata + picoteo andaluz</div>
                  </div>
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="bg-[#2d2416] p-8 md:p-10 rounded-sm space-y-5"
                onSubmit={e => e.preventDefault()}
              >
                <h3 className="text-2xl font-serif text-[#F5F0E8] font-light mb-2">Reservar visita</h3>
                <p className="text-xs font-sans text-[#F5F0E8]/40 tracking-widest mb-6">Confirmación en menos de 24 horas</p>

                <input type="text" placeholder="Nombre completo" className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-[#F5F0E8] font-sans text-sm placeholder-white/25 focus:border-[#c4a97d] outline-none transition-colors" />
                <input type="email" placeholder="Correo electrónico" className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-[#F5F0E8] font-sans text-sm placeholder-white/25 focus:border-[#c4a97d] outline-none transition-colors" />
                <input type="tel" placeholder="Teléfono" className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-[#F5F0E8] font-sans text-sm placeholder-white/25 focus:border-[#c4a97d] outline-none transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-[#F5F0E8]/60 font-sans text-sm focus:border-[#c4a97d] outline-none transition-colors" />
                  <select className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-[#F5F0E8]/60 font-sans text-sm focus:border-[#c4a97d] outline-none transition-colors appearance-none">
                    <option>Nº personas</option>
                    <option>1-2</option>
                    <option>3-6</option>
                    <option>7-15</option>
                    <option>+15</option>
                  </select>
                </div>
                <select className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-[#F5F0E8]/60 font-sans text-sm focus:border-[#c4a97d] outline-none transition-colors appearance-none">
                  <option>Tipo de visita</option>
                  <option>Visita básica (15€/persona)</option>
                  <option>Visita Premium (35€/persona)</option>
                  <option>Grupo corporativo</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-[#4a7c59] text-[#F5F0E8] font-sans text-sm tracking-widest uppercase hover:bg-[#3d6b4a] transition-colors"
                >
                  Solicitar reserva
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-[#1f2e17] text-[#F5F0E8]/50 py-12 px-6 md:px-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-serif text-[#F5F0E8] text-lg font-light">Almazara San Isidro</div>
              <div className="font-sans text-xs tracking-widest text-[#c4a97d] mt-1">Desde 1924 · Cazorla, Jaén</div>
            </div>
            <p className="font-sans text-xs tracking-widest text-center">© 2026 Almazara San Isidro S.L. · Todos los derechos reservados</p>
            <div className="flex gap-6 text-xs font-sans tracking-widest uppercase">
              <a href="#" className="hover:text-[#F5F0E8] transition-colors">Tienda</a>
              <a href="#" className="hover:text-[#F5F0E8] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#F5F0E8] transition-colors">Aviso legal</a>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  )
}
