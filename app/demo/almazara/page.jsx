"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, ArrowLeft, Droplet, Sun, Sprout, X } from "lucide-react"

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
      image: "https://loremflickr.com/600/800/oliveoil,bottle?lock=1"
    },
    {
      name: "Arbequina Suave",
      price: "22€",
      notes: "Aromas a manzana, plátano y almendra dulce.",
      image: "https://loremflickr.com/600/800/oliveoil,bottle?lock=2"
    },
    {
      name: "Blend Familiar",
      price: "28€",
      notes: "Equilibrio perfecto con toques de alcachofa y nuez.",
      image: "https://loremflickr.com/600/800/oliveoil,bottle?lock=3"
    }
  ]

  const stats = [
    { value: "0", label: "Huella de Carbono", icon: Droplet },
    { value: "100%", label: "Energía Solar", icon: Sun },
    { value: "100%", label: "Riego Inteligente", icon: Sprout }
  ]

  const menuItems = ["La Finca", "Nuestros Aceites", "Sostenibilidad", "Contacto"]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#F5F5E1] text-[#3B4F2D] font-serif overflow-hidden selection:bg-[#3B4F2D] selection:text-[#F5F5E1] md:cursor-none">
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 border border-[#3B4F2D] rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />

      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40 mix-blend-difference text-[#F5F5E1]"
      >
        <Link href="/" className="flex items-center gap-2 text-[clamp(0.75rem,2vw,0.875rem)] uppercase tracking-widest active:scale-95 md:active:scale-100 hover:opacity-70 transition-all">
          <ArrowLeft size={16} />
          <span className="hidden md:inline">Catálogo</span>
        </Link>
        <div className="text-[clamp(1.125rem,3vw,1.25rem)] tracking-[0.2em] md:tracking-[0.3em] font-light">LA ALMAZARA</div>
        <button onClick={() => setIsMenuOpen(true)} className="active:scale-90 md:active:scale-100 hover:opacity-70 transition-all p-2">
          <Menu size={24} />
        </button>
      </motion.nav>

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
          <img 
            src="https://loremflickr.com/1920/1080/olive,tree,nature?lock=30" 
            alt="Olive groves" 
            className="w-full h-full object-cover filter brightness-75 scale-105 pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </motion.div>
        
        <div className="relative z-10 text-center text-[#F5F5E1] flex flex-col items-center px-4 w-full">
          <div className="overflow-hidden mb-4 md:mb-6 w-full">
            <motion.h1 
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="text-[clamp(4rem,15vw,9rem)] leading-[0.9] font-light tracking-tighter"
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
            <h2 className="text-[clamp(3rem,8vw,4rem)] font-light mb-6 md:mb-8 leading-tight">La Cosecha<br/>Manual.</h2>
            <p className="text-[clamp(1rem,3vw,1.25rem)] font-sans font-light leading-relaxed max-w-md opacity-80">
              Respetamos los tiempos de la naturaleza. Cada oliva es seleccionada a mano en su punto óptimo de maduración, garantizando la máxima expresión de sabor y pureza en cada gota de nuestro aceite.
            </p>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 block">
          <div className="h-[60vh] md:h-screen w-full relative">
            <img src="https://loremflickr.com/800/1200/olive,farmer?lock=41" alt="Harvest 1" className="w-full h-full object-cover pointer-events-none" />
          </div>
          <div className="h-[60vh] md:h-screen w-full relative">
            <img src="https://loremflickr.com/800/1200/olive,nature?lock=42" alt="Harvest 2" className="w-full h-full object-cover pointer-events-none" />
          </div>
          <div className="h-[60vh] md:h-screen w-full relative">
            <img src="https://loremflickr.com/800/1200/olive,tree?lock=43" alt="Harvest 3" className="w-full h-full object-cover pointer-events-none" />
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
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-light text-center mb-16 md:mb-24 px-6"
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
                    <img src={oil.image} alt={oil.name} className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105 pointer-events-none" />
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
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-light mb-6">Compromiso Vital</h2>
            <p className="font-sans font-light max-w-2xl mx-auto opacity-80 text-[clamp(1rem,3vw,1.125rem)]">
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

      <section className="py-32 md:py-40 px-6 bg-[#3B4F2D] text-[#F5F5E1] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-2xl"
        >
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-light mb-6 md:mb-8 leading-none">Vive la Finca</h2>
          <p className="font-sans font-light text-[clamp(1rem,3vw,1.25rem)] mx-auto mb-12 md:mb-16 opacity-80">
            Pasea entre olivos centenarios, conoce la almazara desde dentro y degusta nuestra historia.
          </p>
          
          <button className="w-full md:w-auto group relative inline-flex items-center justify-center px-8 md:px-12 py-5 md:py-6 border border-[#F5F5E1] overflow-hidden text-[clamp(1rem,3vw,1.125rem)] tracking-widest uppercase active:scale-95 transition-transform">
            <div className="absolute inset-0 w-0 bg-[#F5F5E1] transition-all duration-[600ms] ease-out md:group-hover:w-full" />
            <span className="relative text-[#F5F5E1] md:group-hover:text-[#3B4F2D] transition-colors duration-300">
              Reservar Visita
            </span>
          </button>
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
  )
}
