"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Menu, X } from "lucide-react"

const Nav = () => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false)
      } else {
        setShow(true)
      }
      setLastScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:px-12 bg-black/30 backdrop-blur-md text-white"
      >
        <Link href="/" className="hidden md:flex items-center gap-2 uppercase tracking-widest text-xs hover:opacity-70 transition-opacity active:scale-95">
          <ArrowLeft size={16} /> Catálogo
        </Link>
        <div className="text-2xl font-serif tracking-[0.3em] uppercase">Aura</div>
        
        <button className="hidden md:block uppercase tracking-widest text-xs border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors active:scale-95">
          Reservar
        </button>

        <button 
          className="md:hidden p-2 active:scale-90 transition-transform"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.17, 1] }}
            className="fixed inset-0 z-[100] bg-black text-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center w-full">
              <div className="text-2xl font-serif tracking-[0.3em] uppercase">Aura</div>
              <button 
                className="p-2 active:scale-90 transition-transform"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-12 text-2xl font-serif uppercase tracking-widest">
              <Link href="/" className="active:scale-95 transition-transform">Inicio</Link>
              <button className="active:scale-95 transition-transform">Menú</button>
              <button className="active:scale-95 transition-transform">La Bodega</button>
              <button className="border border-white px-8 py-4 active:scale-95 transition-transform mt-8 text-sm">
                Reservar Mesa
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    if (window.innerWidth < 768) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    if (window.innerWidth < 768) return
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const Hero = () => {
  const title = "AURA"
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://loremflickr.com/1920/1080/finedining,plating?lock=40"
          alt="Aura plating"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>
      <div className="z-10 text-center flex flex-col items-center w-full px-4">
        <h1 className="text-white text-[clamp(4rem,15vw,9rem)] font-serif tracking-[0.3em] md:tracking-[0.8em] uppercase ml-[0.3em] md:ml-[0.8em] overflow-hidden flex justify-center w-full">
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: [0.77, 0, 0.17, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-gray-400 mt-8 tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm text-center"
        >
          Gastronomía sensorial
        </motion.p>
      </div>
    </section>
  )
}

const menuItems = [
  { name: "Preludio del Mar", img: "https://loremflickr.com/1920/1080/seafood,plating?lock=41" },
  { name: "Tierra Quemada", img: "https://loremflickr.com/1920/1080/meat,smoke?lock=42" },
  { name: "Texturas de Bosque", img: "https://loremflickr.com/1920/1080/mushrooms,foraging?lock=43" },
  { name: "El Origen", img: "https://loremflickr.com/1920/1080/dessert,minimal?lock=44" }
]

const Experience = () => {
  const [activeItem, setActiveItem] = useState(0)

  return (
    <section className="relative w-full min-h-screen py-24 md:py-32 flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeItem}
            src={menuItems[activeItem].img}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-500 uppercase tracking-[0.4em] text-xs mb-12 md:mb-24 px-6 text-center"
        >
          La Experiencia
        </motion.h2>

        <div className="flex flex-col items-center w-full px-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveItem(index)}
              onClick={() => setActiveItem(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer py-8 w-full text-center border-b border-white/5 last:border-0 relative"
            >
              <h3 className={`text-3xl md:text-6xl font-serif transition-colors duration-500 tracking-wide relative z-10 ${activeItem === index ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Chef = () => {
  return (
    <section className="w-full min-h-screen bg-[#030303] flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-24 md:py-32 gap-12 md:gap-32">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full md:w-5/12 aspect-[3/4] relative"
      >
        <img
          src="https://loremflickr.com/800/1200/chef,portrait?lock=45"
          alt="Chef portrait"
          className="w-full h-full object-cover md:grayscale opacity-90"
        />
        <div className="absolute inset-0 border border-white/10 -translate-x-4 translate-y-4 pointer-events-none" />
      </motion.div>
      <div className="w-full md:w-6/12 flex flex-col justify-center text-center md:text-left">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight"
        >
          "No cocinamos comida, esculpimos recuerdos."
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 md:mt-12 text-gray-500 uppercase tracking-[0.2em] text-xs md:text-sm"
        >
          — Alejandro Valdés, Head Chef
        </motion.p>
      </div>
    </section>
  )
}

const Cellar = () => {
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"])
  
  const wines = [
    { title: "Terroir", img: "https://loremflickr.com/600/800/wineglass?lock=50" },
    { title: "Añada", img: "https://loremflickr.com/600/800/vineyard,dark?lock=51" },
    { title: "Equilibrio", img: "https://loremflickr.com/600/800/winecellar?lock=52" }
  ]

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-24 md:top-32 left-6 md:left-24 z-10">
          <h2 className="text-gray-500 uppercase tracking-[0.4em] text-xs">La Bodega</h2>
        </div>
        <motion.div style={{ x }} className="flex w-max gap-12 md:gap-24 px-6 md:px-24 mt-20">
          {wines.map((wine, idx) => (
            <div key={idx} className="w-[75vw] md:w-[35vw] h-[50vh] md:h-[60vh] shrink-0 relative group">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={wine.img}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  alt={wine.title}
                />
              </div>
              <h3 className="absolute bottom-8 left-8 text-2xl md:text-3xl font-serif text-white tracking-widest uppercase">
                {wine.title}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const Reservation = () => {
  return (
    <section className="w-full py-40 md:py-64 bg-[#030303] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm mb-12 md:mb-16"
      >
        Solo 12 comensales por noche.
      </motion.p>
      <MagneticButton>
        <button className="px-8 md:px-16 py-6 md:py-8 bg-white text-black font-serif text-xl md:text-4xl uppercase tracking-widest hover:bg-gray-200 active:scale-95 transition-all">
          Solicitar Mesa
        </button>
      </MagneticButton>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 gap-8 md:gap-0">
      <div className="font-serif text-3xl tracking-[0.3em] uppercase text-white/80">
        Aura
      </div>
      <div className="flex flex-col items-center md:items-end text-xs uppercase tracking-widest text-gray-500 gap-3">
        <p>Calle Falsa 123, Ciudad</p>
        <p>reservas@aura.com</p>
        <p>+34 900 000 000</p>
      </div>
    </footer>
  )
}

export default function RestauranteDemo() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateCursor)
    return () => window.removeEventListener("mousemove", updateCursor)
  }, [])

  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black md:cursor-none">
      {isClient && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
          animate={{ x: cursorPos.x, y: cursorPos.y }}
          transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.1 }}
        />
      )}
      <Nav />
      <Hero />
      <Experience />
      <Chef />
      <Cellar />
      <Reservation />
      <Footer />
    </main>
  )
}
