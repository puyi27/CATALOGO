'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Instagram, Twitter, Menu, X } from 'lucide-react'

export default function NightfallDemo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredDJ, setHoveredDJ] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const carouselRef = useRef(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const strobeOpacity = useTransform(scrollY, (y) => (Math.floor(y / 30) % 2 === 0 ? 0 : 0.08))

  const lineup = [
    { id: 1, date: "JUL 12", name: "AMELIE LENS", img: "https://loremflickr.com/600/800/dj,techno?lock=101" },
    { id: 2, date: "JUL 19", name: "CHARLOTTE DE WITTE", img: "https://loremflickr.com/600/800/dj,techno?lock=102" },
    { id: 3, date: "AUG 02", name: "TALE OF US", img: "https://loremflickr.com/600/800/dj,techno?lock=103" },
    { id: 4, date: "AUG 16", name: "PEGGY GOU", img: "https://loremflickr.com/600/800/dj,techno?lock=104" },
    { id: 5, date: "AUG 30", name: "RICHIE HAWTIN", img: "https://loremflickr.com/600/800/dj,techno?lock=105" },
  ]

  const gallery = [
    "https://loremflickr.com/600/600/party,club?lock=110",
    "https://loremflickr.com/600/800/party,club?lock=111",
    "https://loremflickr.com/800/600/party,club?lock=112",
    "https://loremflickr.com/600/600/party,club?lock=113",
    "https://loremflickr.com/600/1000/party,club?lock=114",
    "https://loremflickr.com/800/800/party,club?lock=115",
  ]

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF00FF] selection:text-black overflow-x-hidden relative">
      <motion.div
        className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen bg-white"
        style={{ opacity: strobeOpacity }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-64 h-80 mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 128,
          y: mousePos.y - 160,
          opacity: hoveredDJ ? 1 : 0,
          scale: hoveredDJ ? 1 : 0.5,
          rotate: hoveredDJ ? (mousePos.x % 30 - 15) : 0,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.5 }}
      >
        <AnimatePresence>
          {hoveredDJ && (
            <motion.img
              key={hoveredDJ.id}
              initial={{ opacity: 0, filter: "hue-rotate(0deg) contrast(100%)" }}
              animate={{ opacity: 1, filter: "hue-rotate(90deg) contrast(250%)" }}
              exit={{ opacity: 0 }}
              src={hoveredDJ.img}
              className="w-full h-full object-cover grayscale border-4 border-[#00FFFF]"
              alt="DJ"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-[#FF00FF] text-black flex flex-col justify-center items-center px-4"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black hover:text-[#FF00FF] transition-colors active:scale-90"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-[clamp(2.5rem,8vw,5rem)] font-black uppercase tracking-tighter">
              <motion.a whileTap={{ scale: 0.9 }} href="#" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Lineup</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="#" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Atmosphere</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="#" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Tickets</motion.a>
              <motion.a whileTap={{ scale: 0.9 }} href="#" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">VIP</motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full border-b-4 border-white flex justify-between items-center px-4 md:px-8 py-4 z-40 bg-black/90 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:text-[#FF00FF] active:scale-95 transition-all text-xs md:text-base">
          <ArrowLeft size={16} />
          <span className="hidden md:inline">Catálogo</span>
        </Link>
        <div className="font-black text-xl md:text-3xl tracking-tighter">NIGHTFALL</div>
        <div className="hidden md:block font-bold uppercase tracking-widest hover:text-[#00FFFF] transition-colors cursor-pointer text-xs md:text-base">
          VIP Tables
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 active:scale-90 transition-transform">
          <Menu size={24} />
        </button>
      </nav>

      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden border-b-4 border-white pt-16">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://loremflickr.com/1920/1080/nightclub,laser,party?lock=50')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center px-4 w-full">
          <motion.h1
            animate={{
              x: [0, -5, 5, -3, 3, 0, 0, 0, 0, 0],
              y: [0, 3, -3, 3, -3, 0, 0, 0, 0, 0],
              textShadow: [
                "0px 0px 0px transparent",
                "8px 0px 0px #FF00FF, -8px 0px 0px #00FFFF",
                "-8px 0px 0px #FF00FF, 8px 0px 0px #00FFFF",
                "4px 4px 0px #FF00FF, -4px -4px 0px #00FFFF",
                "0px 0px 0px transparent",
                "0px 0px 0px transparent",
                "0px 0px 0px transparent",
                "0px 0px 0px transparent",
                "0px 0px 0px transparent",
                "0px 0px 0px transparent",
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="text-[clamp(4rem,15vw,12rem)] font-black uppercase leading-[0.8] tracking-tighter text-center mix-blend-screen text-white w-full"
          >
            ENTER<br />THE VOID.
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b-4 border-white relative bg-zinc-950">
        <div className="whitespace-nowrap overflow-hidden flex border-b-4 border-white pb-4 md:pb-6 mb-8 md:mb-12">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-10 text-[clamp(3rem,10vw,6rem)] font-black uppercase text-transparent"
            style={{ WebkitTextStroke: "2px white" }}
          >
            <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
            <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
          </motion.div>
        </div>
        <div className="flex flex-col px-4 md:px-12">
          {lineup.map((dj) => (
            <motion.div
              key={dj.id}
              initial="idle"
              whileInView="active"
              whileHover="active"
              viewport={{ margin: "-20% 0px -20% 0px" }}
              variants={{
                idle: { borderColor: "#27272a", color: "#a1a1aa" },
                active: { borderColor: "#FF00FF", color: "#ffffff" }
              }}
              className="flex flex-col md:flex-row md:justify-between md:items-end border-b-2 py-8 md:py-12 md:cursor-crosshair transition-all active:scale-[0.98]"
              onMouseEnter={() => setHoveredDJ(dj)}
              onMouseLeave={() => setHoveredDJ(null)}
            >
              <motion.span
                variants={{ idle: { color: "#52525b" }, active: { color: "#00FFFF" } }}
                className="text-xl md:text-4xl font-bold mb-1 md:mb-0"
              >
                {dj.date}
              </motion.span>
              <span className="text-[clamp(2.5rem,8vw,8rem)] font-black uppercase tracking-tighter leading-none text-current md:text-right break-words">
                {dj.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-0 md:px-12 border-b-4 border-white bg-black overflow-hidden">
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter mb-8 md:mb-16 text-center text-[#FF00FF] px-4">ATMOSPHERE</h2>
        
        <div className="hidden md:block columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
          {gallery.map((img, i) => (
            <div key={i} className="relative break-inside-avoid overflow-hidden group border-4 border-zinc-900 hover:border-[#00FFFF] transition-colors duration-500 cursor-crosshair">
              <img
                src={img}
                alt="Party"
                className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:saturate-[2.5] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#FF00FF] mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
            </div>
          ))}
        </div>

        <div className="md:hidden w-full cursor-grab active:cursor-grabbing" ref={carouselRef}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            dragElastic={0.1}
            className="flex gap-4 px-4 w-max"
          >
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                whileInView={{ filter: "grayscale(0%)", scale: 1 }}
                initial={{ filter: "grayscale(100%)", scale: 0.95 }}
                viewport={{ amount: 0.5 }}
                className="relative w-[80vw] h-[50vh] border-4 border-[#00FFFF] overflow-hidden shrink-0 pointer-events-none"
              >
                <img
                  src={img}
                  alt="Party"
                  className="w-full h-full object-cover saturate-[1.5]"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-12 border-b-4 border-white bg-zinc-950">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <motion.div whileTap={{ scale: 0.98 }} className="flex-1 border-4 border-white p-6 md:p-12 hover:border-[#FF00FF] transition-all duration-300 relative group overflow-hidden md:cursor-crosshair md:hover:shadow-[0_0_60px_rgba(255,0,255,0.2)]">
            <div className="absolute inset-0 bg-[#FF00FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300 hidden md:block" />
            <h3 className="text-[clamp(2rem,6vw,5rem)] font-black mb-4 md:mb-6 tracking-tighter md:group-hover:text-[#FF00FF] transition-colors leading-none">GENERAL<br/>ADMISSION</h3>
            <p className="text-base md:text-xl font-bold text-zinc-500 uppercase tracking-widest">Access to main room.<br/>Standard bar.</p>
            <div className="mt-8 md:mt-12 text-lg md:text-xl font-black border-4 border-white inline-block px-6 md:px-8 py-3 md:py-4 md:group-hover:bg-[#FF00FF] md:group-hover:text-black md:group-hover:border-[#FF00FF] transition-all active:bg-white active:text-black">
              BUY TICKET
            </div>
          </motion.div>
          <motion.div whileTap={{ scale: 0.98 }} className="flex-1 border-4 border-white p-6 md:p-12 hover:border-[#00FFFF] transition-all duration-300 relative group overflow-hidden md:cursor-crosshair md:hover:shadow-[0_0_60px_rgba(0,255,255,0.2)]">
            <div className="absolute inset-0 bg-[#00FFFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300 hidden md:block" />
            <h3 className="text-[clamp(2rem,6vw,5rem)] font-black mb-4 md:mb-6 tracking-tighter md:group-hover:text-[#00FFFF] transition-colors leading-none">VIP<br/>BOOTH</h3>
            <p className="text-base md:text-xl font-bold text-zinc-500 uppercase tracking-widest">Private table.<br/>Bottle service.<br/>Backstage access.</p>
            <div className="mt-8 md:mt-12 text-lg md:text-xl font-black border-4 border-white inline-block px-6 md:px-8 py-3 md:py-4 md:group-hover:bg-[#00FFFF] md:group-hover:text-black md:group-hover:border-[#00FFFF] transition-all active:bg-white active:text-black">
              RESERVE
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-40 flex justify-center items-center bg-black border-b-4 border-white px-4">
        <p className="text-[8px] md:text-xs tracking-[0.3em] md:tracking-[1em] text-zinc-800 font-black uppercase text-center md:hover:text-white transition-colors duration-1000">
          Strictly black.<br/><br/><br/>No photos inside.
        </p>
      </section>

      <footer className="py-16 md:py-24 px-4 md:px-12 bg-black flex flex-col items-center">
        <h2 className="text-[clamp(3rem,15vw,10rem)] font-black tracking-tighter mb-8 md:mb-12 text-white leading-none">NIGHTFALL</h2>
        <div className="flex gap-6 md:gap-8">
          <motion.a whileTap={{ scale: 0.9 }} href="#" className="p-4 border-4 border-white rounded-full md:hover:bg-white md:hover:text-black transition-colors active:bg-white active:text-black">
            <Instagram size={24} className="md:w-8 md:h-8" />
          </motion.a>
          <motion.a whileTap={{ scale: 0.9 }} href="#" className="p-4 border-4 border-white rounded-full md:hover:bg-white md:hover:text-black transition-colors active:bg-white active:text-black">
            <Twitter size={24} className="md:w-8 md:h-8" />
          </motion.a>
        </div>
      </footer>
    </div>
  )
}
