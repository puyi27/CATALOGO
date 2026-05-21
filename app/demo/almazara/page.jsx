"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, ArrowLeft, Droplet, Sun, Sprout } from "lucide-react"

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
    { value: "100%", label: "Riego Goteo Inteligente", icon: Sprout }
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#F5F5E1] text-[#3B4F2D] font-serif overflow-hidden selection:bg-[#3B4F2D] selection:text-[#F5F5E1]">
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 border border-[#3B4F2D] rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />

      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference text-[#F5F5E1]"
      >
        <Link href="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          <ArrowLeft size={16} />
          <span>Catálogo</span>
        </Link>
        <div className="text-xl tracking-[0.3em] font-light">LA ALMAZARA</div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:opacity-70 transition-opacity">
          <Menu size={24} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#3B4F2D] z-30 flex flex-col items-center justify-center text-[#F5F5E1]"
          >
            <div className="flex flex-col gap-8 text-4xl font-light tracking-widest text-center">
              <span className="hover:text-white cursor-pointer transition-colors">La Finca</span>
              <span className="hover:text-white cursor-pointer transition-colors">Nuestros Aceites</span>
              <span className="hover:text-white cursor-pointer transition-colors">Sostenibilidad</span>
              <span className="hover:text-white cursor-pointer transition-colors">Contacto</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
        >
          <img 
            src="https://loremflickr.com/1920/1080/olive,tree,nature?lock=30" 
            alt="Olive groves" 
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        
        <div className="relative z-10 text-center text-[#F5F5E1] flex flex-col items-center">
          <div className="overflow-hidden mb-6">
            <motion.h1 
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="text-7xl md:text-9xl font-light tracking-tighter"
            >
              Oro líquido.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.p 
              variants={textReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-light tracking-widest uppercase"
            >
              Prensado en frío desde 1890
            </motion.p>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#F5F5E1] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 md:p-24 md:sticky md:top-0 h-auto md:h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight">La Cosecha<br/>Manual.</h2>
            <p className="text-lg md:text-xl font-sans font-light leading-relaxed max-w-md opacity-80">
              Respetamos los tiempos de la naturaleza. Cada oliva es seleccionada a mano en su punto óptimo de maduración, garantizando la máxima expresión de sabor y pureza en cada gota de nuestro aceite.
            </p>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="h-[50vh] md:h-screen w-full relative">
            <img src="https://loremflickr.com/800/1200/olive,farmer?lock=41" alt="Harvest 1" className="w-full h-full object-cover" />
          </div>
          <div className="h-[50vh] md:h-screen w-full relative">
            <img src="https://loremflickr.com/800/1200/olive,nature?lock=42" alt="Harvest 2" className="w-full h-full object-cover" />
          </div>
          <div className="h-[50vh] md:h-screen w-full relative">
            <img src="https://loremflickr.com/800/1200/olive,tree?lock=43" alt="Harvest 3" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#3B4F2D] text-[#F5F5E1]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-light text-center mb-24"
          >
            Nuestros Aceites
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {oils.map((oil, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative flex flex-col items-center"
              >
                <div className="w-full aspect-[3/4] overflow-hidden bg-black/10 relative mb-8">
                  <img src={oil.image} alt={oil.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#3B4F2D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                    <p className="font-sans font-light text-lg">{oil.notes}</p>
                  </div>
                </div>
                <h3 className="text-2xl tracking-widest mb-2">{oil.name}</h3>
                <span className="font-sans font-light opacity-70">{oil.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#F5F5E1]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-light mb-6">Compromiso Vital</h2>
            <p className="font-sans font-light max-w-2xl mx-auto opacity-80 text-lg">
              La tierra nos da todo. Nuestra responsabilidad es devolverle el favor mediante prácticas que aseguran el futuro de nuestro entorno.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center p-8 border border-[#3B4F2D]/20 rounded-full aspect-square justify-center"
              >
                <stat.icon size={48} strokeWidth={1} className="mb-6 opacity-70" />
                <span className="text-5xl font-light mb-4">{stat.value}</span>
                <span className="font-sans font-light tracking-widest uppercase text-sm opacity-80">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-[#3B4F2D] text-[#F5F5E1] flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-8xl font-light mb-8">Vive la Finca</h2>
          <p className="font-sans font-light text-xl max-w-xl mx-auto mb-16 opacity-80">
            Pasea entre olivos centenarios, conoce la almazara desde dentro y degusta nuestra historia.
          </p>
          
          <button className="group relative inline-flex items-center justify-center px-12 py-6 border border-[#F5F5E1] overflow-hidden text-lg tracking-widest uppercase">
            <div className="absolute inset-0 w-0 bg-[#F5F5E1] transition-all duration-[600ms] ease-out group-hover:w-full" />
            <span className="relative text-[#F5F5E1] group-hover:text-[#3B4F2D] transition-colors duration-300">
              Reservar Visita
            </span>
          </button>
        </motion.div>
      </section>

      <footer className="bg-[#1f2b18] text-[#F5F5E1] py-12 px-6 flex flex-col md:flex-row justify-between items-center font-sans font-light text-sm tracking-widest opacity-80">
        <div>© 2024 FINCA LA ALMAZARA</div>
        <div className="mt-4 md:mt-0 flex gap-8">
          <span className="hover:opacity-100 cursor-pointer transition-opacity">INSTAGRAM</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">TIENDA</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">LEGAL</span>
        </div>
      </footer>
    </div>
  )
}
