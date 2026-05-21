'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft, MapPin, Clock, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Panaderia() {
  const { scrollYProgress } = useScroll()
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 600])
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-[#FAF9F6] text-[#2C2C2C] min-h-screen font-serif overflow-hidden cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#E6C280] pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? '#E6C280' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />

      <nav className="fixed top-0 left-0 w-full z-40 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#E6C280]/20 px-6 py-4 flex justify-between items-center">
        <Link 
          href="/"
          className="flex items-center gap-2 text-[#6A3E1E] hover:text-[#E6C280] transition-colors uppercase tracking-widest text-xs"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ArrowLeft size={16} />
          Catálogo
        </Link>
        
        <div className="text-2xl font-bold tracking-[0.2em] text-[#6A3E1E] text-center absolute left-1/2 -translate-x-1/2 uppercase">
          L'Atelier du Pain
        </div>

        <button 
          className="text-[#6A3E1E] hover:text-[#E6C280] transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ShoppingBag size={20} />
        </button>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yHero, opacity: opacityHero }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://loremflickr.com/1920/1080/bakery,flour,hands?lock=20" 
            alt="Bakery" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-10 text-center text-[#FAF9F6] flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-medium italic mb-6 tracking-tight"
          >
            L'art de la patience.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl uppercase tracking-[0.3em] font-light text-[#E6C280]"
          >
            Masa madre de 142 años.
          </motion.p>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="uppercase tracking-widest text-xs text-[#FAF9F6]">Scroll</span>
          <motion.div 
            className="w-[1px] h-16 bg-[#E6C280]"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      <section className="py-32 px-6 md:px-20 bg-[#FAF9F6] relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-24"
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-[#E6C280] mb-4">Nuestro Proceso</h2>
            <p className="text-4xl md:text-5xl text-[#6A3E1E] italic">El ritual de cada madrugada</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { title: "La Mezcla", desc: "Agua, harina, sal y nuestra masa madre centenaria.", img: "https://loremflickr.com/800/1000/dough,mixing?lock=21" },
              { title: "El Reposo", desc: "Fermentación lenta en frío durante 48 horas.", img: "https://loremflickr.com/800/1000/bread,dough?lock=22" },
              { title: "El Fuego", desc: "Horneado en piedra a 250 grados para una corteza perfecta.", img: "https://loremflickr.com/800/1000/oven,baking?lock=23" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="overflow-hidden mb-6 aspect-[4/5] relative">
                  <div className="absolute inset-0 bg-[#6A3E1E]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={step.img} 
                    alt={step.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 z-20 text-[#FAF9F6] text-xl font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    0{i + 1}.
                  </div>
                </div>
                <h3 className="text-2xl text-[#6A3E1E] mb-3 uppercase tracking-widest">{step.title}</h3>
                <p className="text-[#2C2C2C]/70 font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-20 bg-[#6A3E1E] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs uppercase tracking-[0.4em] text-[#E6C280] mb-4">Clásicos</h2>
              <p className="text-4xl md:text-5xl italic">Recién Salidos</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-0 uppercase tracking-widest text-xs border-b border-[#E6C280] pb-1 hover:text-[#E6C280] transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Ver menú completo
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Pain de Campagne", price: "4.00€", img: "https://loremflickr.com/600/800/sourdough,bread?lock=31" },
              { name: "Croissant au Beurre", price: "2.50€", img: "https://loremflickr.com/600/800/croissant,pastry?lock=32" },
              { name: "Fougasse aux Olives", price: "3.50€", img: "https://loremflickr.com/600/800/focaccia,olive?lock=33" },
              { name: "Baguette Tradition", price: "1.50€", img: "https://loremflickr.com/600/800/baguette,bread?lock=34" }
            ].map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="aspect-[3/4] overflow-hidden mb-4 border border-transparent group-hover:border-[#E6C280] transition-colors duration-500 p-2">
                  <div className="w-full h-full overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name}
                      className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-start pt-2">
                  <h3 className="text-lg uppercase tracking-wide w-2/3">{product.name}</h3>
                  <span className="text-[#E6C280] font-medium">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-[#2C2C2C] text-center relative overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://loremflickr.com/1920/1080/texture,paper?lock=50" alt="texture" className="w-full h-full object-cover" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <p className="text-3xl md:text-6xl text-[#E6C280] font-serif italic leading-tight mb-12">
            "El buen pan no es producto del tiempo, sino de la paciencia. Cada hogaza cuenta una historia de harina, agua y manos que saben esperar."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-[1px] bg-[#FAF9F6]/30 mb-6" />
            <span className="uppercase tracking-[0.3em] text-sm text-[#FAF9F6]">Jean-Paul Dubois</span>
            <span className="text-[#FAF9F6]/50 text-xs mt-2 italic">Maître Boulanger</span>
          </div>
        </motion.div>
      </section>

      <section className="py-0 flex flex-col md:flex-row min-h-screen bg-[#FAF9F6]">
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen">
          <img 
            src="https://loremflickr.com/1000/1500/storefront,bakery?lock=41" 
            alt="Storefront"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <h2 className="text-4xl md:text-5xl text-[#6A3E1E] italic mb-12">Nuestra Casa</h2>
            
            <div className="space-y-8 text-[#2C2C2C]">
              <div className="flex items-start gap-6">
                <MapPin className="text-[#E6C280] shrink-0 mt-1" />
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-bold mb-2">Visítanos</h4>
                  <p className="font-light leading-relaxed">Rue de l'Artisan, 12<br />75003 Paris, France</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Clock className="text-[#E6C280] shrink-0 mt-1" />
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-bold mb-2">Horario</h4>
                  <p className="font-light leading-relaxed">Martes a Domingo<br />06:30 - 19:00</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Phone className="text-[#E6C280] shrink-0 mt-1" />
                <div>
                  <h4 className="uppercase tracking-widest text-sm font-bold mb-2">Contacto</h4>
                  <p className="font-light leading-relaxed">+33 1 23 45 67 89<br />bonjour@atelierdupain.fr</p>
                </div>
              </div>
            </div>

            <button 
              className="mt-16 w-full py-4 border border-[#6A3E1E] text-[#6A3E1E] uppercase tracking-widest text-sm hover:bg-[#6A3E1E] hover:text-[#FAF9F6] transition-colors duration-300"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Hacer un encargo
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#FAF9F6] pt-20 pb-10 px-6 border-t border-[#6A3E1E]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-3xl font-bold tracking-[0.2em] text-[#6A3E1E] uppercase mb-12">
            L'Atelier du Pain
          </div>
          
          <div className="flex gap-8 mb-16 text-sm uppercase tracking-widest text-[#2C2C2C]/60">
            <a href="#" className="hover:text-[#6A3E1E] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#6A3E1E] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#6A3E1E] transition-colors">Prensa</a>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-[#2C2C2C]/40 uppercase tracking-widest pt-8 border-t border-[#6A3E1E]/10">
            <p>© 2026 L'Atelier du Pain</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#6A3E1E] transition-colors">Privacidad</a>
              <a href="#" className="hover:text-[#6A3E1E] transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
