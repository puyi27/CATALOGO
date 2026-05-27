"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, ArrowLeft, Droplet, Sun, Sprout, X } from "lucide-react"
import DemoLayout from "@/components/DemoLayout"

export default function FincaLaAlmazara() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const textReveal = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  }

  const oils = [
    {
      name: "Picual Reserva",
      price: "24€",
      notes: "Notas de tomate verde, higuera y hierba recién cortada.",
      gradient: "from-[#5a6b3a] via-[#3B4F2D] to-[#2a3a1e]"
    },
    {
      name: "Arbequina Suave",
      price: "22€",
      notes: "Aromas a manzana, plátano y almendra dulce.",
      gradient: "from-[#8a9a5a] via-[#6a7a4a] to-[#3B4F2D]"
    },
    {
      name: "Blend Familiar",
      price: "28€",
      notes: "Equilibrio perfecto con toques de alcachofa y nuez.",
      gradient: "from-[#4a5a2e] via-[#3B4F2D] to-[#1f2b18]"
    }
  ]

  const timeline = [
    { year: "1890", text: "Don Manuel Romero planta los primeros 200 olivos en la Sierra Sur de Sevilla." },
    { year: "1932", text: "Se construye la almazara de piedra que aún conservamos como museo." },
    { year: "1978", text: "Tercera generación. Se introduce el prensado en frío con prensa hidráulica." },
    { year: "2015", text: "Certificación ecológica y transición a energía solar 100%." },
    { year: "2024", text: "Quinta generación. 12.000 olivos. Exportación a 8 países." },
  ]

  const testimonials = [
    { name: "Marta G.", text: "El Picual Reserva tiene una intensidad que no he encontrado en ningún otro aceite. Puro campo andaluz.", loc: "Madrid" },
    { name: "Pierre D.", text: "J'utilise l'Arbequina pour tous mes plats. C'est extraordinaire. La qualité est incomparable.", loc: "Lyon, Francia" },
    { name: "Elena R.", text: "Visité la finca con mi familia. La experiencia es inolvidable. Volvemos cada otoño a la recolección.", loc: "Sevilla" },
  ]

  const stats = [
    { value: "0", label: "Huella de Carbono", icon: Droplet },
    { value: "100%", label: "Energía Solar", icon: Sun },
    { value: "100%", label: "Riego Inteligente", icon: Sprout }
  ]

  const menuItems = ["La Finca", "Nuestros Aceites", "Sostenibilidad", "Contacto"]

  return (
    <DemoLayout title="La Almazara">
      <div ref={containerRef} className="relative text-[#3B4F2D] font-serif overflow-hidden md:cursor-none">
        <motion.div 
          className="fixed top-0 left-0 w-6 h-6 border border-[#3B4F2D] rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
          animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#3B4F2D] z-50 flex flex-col items-center justify-center text-[#F5F5E1] px-4"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-2 active:scale-90 md:active:scale-100 hover:opacity-70 transition-all"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6 md:gap-8 text-center w-full max-w-md">
              {menuItems.map((item, i) => (
                <motion.span 
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(2.25rem,6vw,3.75rem)] font-light tracking-widest active:scale-95 md:active:scale-100 hover:text-white/70 transition-all cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#5a6b3a] via-[#3B4F2D] to-[#1f2b18] scale-105 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </motion.div>
        
        <div className="relative z-10 text-center text-[#F5F5E1] flex flex-col items-center px-4 w-full">
          <div className="overflow-hidden mb-4 md:mb-6 w-full">
            <motion.h1 
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-9xl leading-[0.9] font-light tracking-tighter"
            >
              Oro líquido.
            </motion.h1>
          </div>
          <div className="overflow-hidden w-full">
            <motion.p 
              variants={textReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-[clamp(0.875rem,3vw,1.5rem)] font-light tracking-[0.2em] md:tracking-widest uppercase"
            >
              Prensado en frío desde 1890
            </motion.p>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#F5F5E1] flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-24 md:sticky md:top-0 h-auto md:h-screen flex flex-col justify-center z-10 bg-[#F5F5E1]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-8xl font-light mb-6 md:mb-8 leading-tight tracking-tighter">La Cosecha<br/>Manual.</h2>
            <p className="text-lg md:text-xl font-sans font-light leading-relaxed max-w-md opacity-80">
              Respetamos los tiempos de la naturaleza. Cada oliva es seleccionada a mano en su punto óptimo de maduración, garantizando la máxima expresión de sabor y pureza en cada gota de nuestro aceite.
            </p>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 block">
          <div className="h-[60vh] md:h-screen w-full relative">
            <div className="w-full h-full bg-gradient-to-b from-[#6a7a4a] to-[#3B4F2D] pointer-events-none" />
          </div>
          <div className="h-[60vh] md:h-screen w-full relative">
            <div className="w-full h-full bg-gradient-to-b from-[#3B4F2D] to-[#5a6b3a] pointer-events-none" />
          </div>
          <div className="h-[60vh] md:h-screen w-full relative">
            <div className="w-full h-full bg-gradient-to-b from-[#4a5a2e] to-[#1f2b18] pointer-events-none" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#3B4F2D] text-[#F5F5E1] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl tracking-tighter font-light text-center mb-16 md:mb-24 px-6"
          >
            Nuestros Aceites
          </motion.h2>
          
          <div className="w-full overflow-hidden md:cursor-none">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12 px-6">
              {oils.map((oil, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="w-full group relative flex flex-col items-center transition-transform"
                >
                  <div className="w-full aspect-[3/4] overflow-hidden bg-black/10 relative mb-8 rounded-sm md:rounded-none">
                    <div className={`w-full h-full bg-gradient-to-br ${oil.gradient} transition-transform duration-1000 md:group-hover:scale-105`} />
                    <div className="flex absolute inset-0 bg-[#3B4F2D]/90 opacity-0 hover:opacity-100 active:opacity-100 md:group-hover:opacity-100 transition-opacity duration-500 items-center justify-center p-8 text-center pointer-events-none">
                      <p className="font-sans font-light text-[clamp(1rem,3vw,1.125rem)]">{oil.notes}</p>
                    </div>
                  </div>
                  <h3 className="text-[clamp(1.25rem,4vw,1.5rem)] tracking-widest mb-2 text-center">{oil.name}</h3>
                  <span className="font-sans font-light opacity-70 mb-3 text-[clamp(0.875rem,2.5vw,1rem)]">{oil.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-[#F5F5E1]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-5xl md:text-7xl tracking-tighter font-light mb-6">Compromiso Vital</h2>
            <p className="font-sans font-light max-w-2xl mx-auto opacity-80 text-lg md:text-xl">
              La tierra nos da todo. Nuestra responsabilidad es devolverle el favor mediante prácticas que aseguran el futuro de nuestro entorno.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-8 border border-[#3B4F2D]/20 rounded-3xl md:rounded-full aspect-auto md:aspect-square justify-center bg-white/30 md:bg-transparent"
              >
                <stat.icon size={40} strokeWidth={1} className="mb-4 md:mb-6 opacity-70" />
                <span className="text-[clamp(2.25rem,5vw,3rem)] font-light mb-2 md:mb-4">{stat.value}</span>
                <span className="font-sans font-light tracking-widest uppercase text-[clamp(0.75rem,2vw,0.875rem)] opacity-80">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HISTORIA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#F5F5E1]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl tracking-tighter font-light text-center mb-16 md:mb-20">Cinco Generaciones</h2>
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 md:gap-8 border-b border-[#3B4F2D]/10 pb-8">
                <span className="text-3xl md:text-4xl font-light text-[#3B4F2D]/30 shrink-0 w-20">{t.year}</span>
                <p className="font-sans font-light text-base md:text-lg opacity-70 leading-relaxed">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#3B4F2D] text-[#F5F5E1]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl tracking-tighter font-light text-center mb-16 md:mb-20">Lo Dicen Ellos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="border-l-2 border-[#F5F5E1]/20 pl-6">
                <p className="font-sans font-light text-base leading-relaxed opacity-80 mb-4">"{t.text}"</p>
                <p className="font-sans text-sm">{t.name}</p>
                <p className="font-sans text-xs opacity-40">{t.loc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 md:py-40 px-6 bg-[#F5F5E1] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-2xl"
        >
          <h2 className="text-6xl md:text-9xl tracking-tighter font-light mb-6 md:mb-8 leading-none">Vive la Finca</h2>
          <p className="font-sans font-light text-lg md:text-xl mx-auto mb-12 md:mb-16 opacity-80">
            Pasea entre olivos centenarios, conoce la almazara desde dentro y degusta nuestra historia.
          </p>
          
          <button className="w-full md:w-auto group relative inline-flex items-center justify-center px-8 md:px-12 py-5 md:py-6 border border-[#3B4F2D] overflow-hidden text-[clamp(1rem,3vw,1.125rem)] tracking-widest uppercase active:scale-95 transition-transform">
            <div className="absolute inset-0 w-0 bg-[#3B4F2D] transition-all duration-[600ms] ease-out md:group-hover:w-full" />
            <span className="relative text-[#3B4F2D] md:group-hover:text-[#F5F5E1] transition-colors duration-300">
              Reservar Visita
            </span>
          </button>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 font-sans text-sm">
            <div><p className="opacity-40 mb-1">Dirección</p><p>Ctra. de Carmona km 12<br/>Alcalá de Guadaíra, Sevilla</p></div>
            <div><p className="opacity-40 mb-1">Teléfono</p><p>+34 955 678 123</p></div>
            <div><p className="opacity-40 mb-1">Horario Visitas</p><p>Sáb-Dom 10:00-14:00<br/>Oct-Feb: también Vie</p></div>
          </div>
        </motion.div>
      </section>

      <footer className="bg-[#1f2b18] text-[#F5F5E1] py-12 px-6 flex flex-col md:flex-row justify-between items-center font-sans font-light text-[clamp(0.75rem,2vw,0.875rem)] tracking-widest opacity-80 gap-8 md:gap-0">
        <div>© 2024 FINCA LA ALMAZARA</div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <span className="active:opacity-50 md:hover:opacity-100 cursor-pointer transition-opacity">INSTAGRAM</span>
          <span className="active:opacity-50 md:hover:opacity-100 cursor-pointer transition-opacity">TIENDA</span>
          <span className="active:opacity-50 md:hover:opacity-100 cursor-pointer transition-opacity">LEGAL</span>
        </div>
      </footer>
      </div>
    </DemoLayout>
  )
}
