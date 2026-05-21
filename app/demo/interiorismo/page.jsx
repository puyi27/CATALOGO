"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Plus, ArrowUpRight } from 'lucide-react'

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])
  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[#F5F5F0] pointer-events-none z-50 mix-blend-difference"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
    />
  )
}

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-8 md:px-12 flex justify-between items-center z-40 mix-blend-difference text-[#F5F5F0]">
      <Link href="/" className="text-xs md:text-sm tracking-widest uppercase hover:opacity-70 transition-opacity">
        &larr; Catálogo
      </Link>
      <div className="font-serif text-xl md:text-2xl tracking-widest uppercase font-light">
        Aura
      </div>
      <div className="text-xs md:text-sm tracking-widest uppercase hover:opacity-70 transition-opacity cursor-pointer">
        Projects
      </div>
    </nav>
  )
}

const Hero = ({ mouseX, mouseY }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 250])

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-900">
      <motion.div 
        className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%]"
        animate={{
          x: mouseX * -30,
          y: mouseY * -30
        }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      >
        <img 
          src="https://loremflickr.com/1920/1080/interior,design?random=1" 
          alt="Aura Interiors Hero" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
      <motion.div style={{ y }} className="relative z-10 text-center text-[#F5F5F0] px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[9rem] font-light tracking-tighter leading-none"
        >
          Designing
          <br />
          Silence
        </motion.h1>
      </motion.div>
    </section>
  )
}

const projects = [
  { id: 1, title: 'Casa Olivo', location: 'Madrid', image: 'https://loremflickr.com/800/1000/architecture,interior?random=2' },
  { id: 2, title: 'Villa Lumière', location: 'Paris', image: 'https://loremflickr.com/800/1000/architecture,interior?random=3' },
  { id: 3, title: 'The Atrium', location: 'London', image: 'https://loremflickr.com/800/1000/architecture,interior?random=4' },
  { id: 4, title: 'Oasis Penthouse', location: 'New York', image: 'https://loremflickr.com/800/1000/architecture,interior?random=5' }
]

const DraggableCarousel = () => {
  const carouselRef = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 overflow-hidden bg-[#F5F5F0]">
      <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">Selected<br/>Works</h2>
        <p className="text-xs md:text-sm uppercase tracking-widest max-w-[200px] text-zinc-500">Drag to explore our recent spatial interventions</p>
      </div>
      <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} 
          className="flex gap-6 md:gap-12"
        >
          {projects.map((project) => (
            <motion.div key={project.id} className="min-w-[280px] md:min-w-[450px] lg:min-w-[550px] flex-shrink-0 group">
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-zinc-200">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  draggable={false}
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl">{project.title}</h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-2">{project.location}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

const accordionData = [
  { title: "Materiales", content: "We source organic, enduring materials that age gracefully alongside the inhabitants. Stone, raw timber, and unpolished metals form the vocabulary of our structural expression." },
  { title: "Luz Natural", content: "Light is treated as a physical material. We sculpt spaces around the trajectory of the sun, creating ethereal moments that shift continually throughout the day." },
  { title: "Espacio", content: "True luxury is found in emptiness. By celebrating the void, we allow proportions to speak and create sanctuaries of profound tranquility." }
]

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-zinc-900/20 py-8 md:py-12 cursor-pointer group" onClick={onClick}>
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light group-hover:translate-x-4 transition-transform duration-500">{title}</h3>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <Plus className="w-6 h-6 md:w-8 md:h-8" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-8 pb-4 text-base md:text-xl max-w-2xl leading-relaxed text-zinc-600">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AccordionSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-[#F5F5F0]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xs md:text-sm uppercase tracking-widest mb-12 md:mb-20 text-zinc-500">Philosophy</h2>
        <div className="flex flex-col border-t border-zinc-900/20">
          {accordionData.map((item, index) => (
            <AccordionItem 
              key={index} 
              title={item.title} 
              content={item.content} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-[#F5F5F0] py-24 md:py-40 px-6 md:px-12 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="font-serif text-5xl md:text-8xl lg:text-[10rem] font-light text-center mb-16 md:mb-24 tracking-tighter"
      >
        Aura
      </motion.h2>
      <div className="flex gap-8 md:gap-16 text-xs md:text-sm uppercase tracking-widest mb-24 md:mb-40">
        <span className="hover:opacity-70 cursor-pointer transition-opacity">Instagram</span>
        <span className="hover:opacity-70 cursor-pointer transition-opacity">Pinterest</span>
        <span className="hover:opacity-70 cursor-pointer transition-opacity">Journal</span>
      </div>
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs uppercase tracking-widest opacity-40 gap-4">
        <span>&copy; 2026 Aura Interiors</span>
        <span>Madrid &middot; Paris &middot; London</span>
        <span>Designing Silence</span>
      </div>
    </footer>
  )
}

export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="bg-[#F5F5F0] text-zinc-900 min-h-screen font-sans selection:bg-zinc-900 selection:text-[#F5F5F0]">
      <Cursor />
      <Nav />
      <Hero mouseX={mousePosition.x} mouseY={mousePosition.y} />
      <DraggableCarousel />
      <AccordionSection />
      <Footer />
    </main>
  )
}
