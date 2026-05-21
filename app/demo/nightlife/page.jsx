'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Instagram, Twitter } from 'lucide-react'

export default function NightfallDemo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredDJ, setHoveredDJ] = useState(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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

      <nav className="fixed top-0 w-full border-b-4 border-white flex justify-between items-center px-4 md:px-8 py-4 z-40 bg-black">
        <Link href="/" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:text-[#FF00FF] transition-colors text-xs md:text-base">
          <ArrowLeft size={16} />
          Catálogo
        </Link>
        <div className="font-black text-xl md:text-3xl tracking-tighter">NIGHTFALL</div>
        <div className="font-bold uppercase tracking-widest hover:text-[#00FFFF] transition-colors cursor-pointer text-xs md:text-base">
          VIP Tables
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b-4 border-white pt-16">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://loremflickr.com/1920/1080/nightclub,laser,party?lock=50')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center">
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
            className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-center mix-blend-screen text-white"
          >
            ENTER<br />THE VOID.
          </motion.h1>
        </div>
      </section>

      <section className="py-24 border-b-4 border-white relative bg-zinc-950">
        <div className="whitespace-nowrap overflow-hidden flex border-b-4 border-white pb-6 mb-12">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 text-[10vw] font-black uppercase text-transparent"
            style={{ WebkitTextStroke: "2px white" }}
          >
            <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
            <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
          </motion.div>
        </div>
        <div className="flex flex-col px-4 md:px-12">
          {lineup.map((dj) => (
            <div
              key={dj.id}
              className="flex flex-col md:flex-row md:justify-between md:items-end border-b-2 border-zinc-800 py-12 hover:border-[#FF00FF] transition-colors cursor-crosshair group"
              onMouseEnter={() => setHoveredDJ(dj)}
              onMouseLeave={() => setHoveredDJ(null)}
            >
              <span className="text-2xl md:text-4xl text-zinc-600 font-bold group-hover:text-[#00FFFF] transition-colors mb-2 md:mb-0">
                {dj.date}
              </span>
              <span className="text-5xl md:text-8xl font-black uppercase tracking-tighter group-hover:text-white text-zinc-400 transition-colors md:text-right leading-none">
                {dj.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-4 md:px-12 border-b-4 border-white bg-black">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center text-[#FF00FF]">ATMOSPHERE</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
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
      </section>

      <section className="py-24 px-4 md:px-12 border-b-4 border-white bg-zinc-950">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div className="flex-1 border-4 border-white p-8 md:p-12 hover:border-[#FF00FF] transition-all duration-300 relative group overflow-hidden cursor-crosshair hover:shadow-[0_0_60px_rgba(255,0,255,0.2)]">
            <div className="absolute inset-0 bg-[#FF00FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter group-hover:text-[#FF00FF] transition-colors">GENERAL<br/>ADMISSION</h3>
            <p className="text-lg md:text-xl font-bold text-zinc-500 uppercase tracking-widest">Access to main room.<br/>Standard bar.</p>
            <div className="mt-12 text-xl font-black border-4 border-white inline-block px-8 py-4 group-hover:bg-[#FF00FF] group-hover:text-black group-hover:border-[#FF00FF] transition-all">
              BUY TICKET
            </div>
          </div>
          <div className="flex-1 border-4 border-white p-8 md:p-12 hover:border-[#00FFFF] transition-all duration-300 relative group overflow-hidden cursor-crosshair hover:shadow-[0_0_60px_rgba(0,255,255,0.2)]">
            <div className="absolute inset-0 bg-[#00FFFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter group-hover:text-[#00FFFF] transition-colors">VIP<br/>BOOTH</h3>
            <p className="text-lg md:text-xl font-bold text-zinc-500 uppercase tracking-widest">Private table.<br/>Bottle service.<br/>Backstage access.</p>
            <div className="mt-12 text-xl font-black border-4 border-white inline-block px-8 py-4 group-hover:bg-[#00FFFF] group-hover:text-black group-hover:border-[#00FFFF] transition-all">
              RESERVE
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 flex justify-center items-center bg-black border-b-4 border-white px-4">
        <p className="text-[10px] md:text-xs tracking-[0.5em] md:tracking-[1em] text-zinc-800 font-black uppercase text-center hover:text-white transition-colors duration-1000">
          Strictly black.<br/><br/><br/>No photos inside.
        </p>
      </section>

      <footer className="py-24 px-4 md:px-12 bg-black flex flex-col items-center">
        <h2 className="text-6xl md:text-[10vw] font-black tracking-tighter mb-12 text-white">NIGHTFALL</h2>
        <div className="flex gap-8">
          <a href="#" className="p-4 border-4 border-white rounded-full hover:bg-white hover:text-black transition-colors">
            <Instagram size={32} />
          </a>
          <a href="#" className="p-4 border-4 border-white rounded-full hover:bg-white hover:text-black transition-colors">
            <Twitter size={32} />
          </a>
        </div>
      </footer>
    </div>
  )
}
