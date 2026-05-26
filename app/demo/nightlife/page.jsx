'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Instagram, Twitter, Menu, X, Users, Wine, Ticket, Plus, Minus, Check, Send, Music } from 'lucide-react'

export default function NightfallDemo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredDJ, setHoveredDJ] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ticketModal, setTicketModal] = useState(null)
  const [ticketQty, setTicketQty] = useState(1)
  const [ticketStep, setTicketStep] = useState(1)
  const [ticketConfirmed, setTicketConfirmed] = useState(false)
  const [guestlistOpen, setGuestlistOpen] = useState(false)
  const [guestlistSent, setGuestlistSent] = useState(false)
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [drinkOrder, setDrinkOrder] = useState([])
  const [showBar, setShowBar] = useState(false)
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

  const drinks = [
    { name: "NEGRONI SMOKED", price: "€14", type: "cocktail", desc: "Ginebra, Campari, Vermut rojo — ahumado con madera de enebro." },
    { name: "ESPRESSO MARTINI", price: "€12", type: "cocktail", desc: "Vodka, licor de café, espresso freso. Agitado 30s." },
    { name: "DARK 'N STORMY", price: "€13", type: "cocktail", desc: "Ron oscuro, ginger beer, lima. Servido en vaso alto." },
    { name: "CHAMPAGNE MOËT", price: "€95", type: "champagne", desc: "Brut Impérial. Servido en copa flauta." },
    { name: "CHAMPAGNE DOM", price: "€280", type: "champagne", desc: "Dom Pérignon Vintage 2015. Para la mesa VIP." },
    { name: "GIN TONIC PREMIUM", price: "€15", type: "cocktail", desc: "Ginebra Monkey 47, tónica Fever-Tree, enebro y pomelo." },
  ]

  const handleTicketPurchase = () => {
    if (ticketStep < 3) { setTicketStep(s => s + 1); return }
    setTicketConfirmed(true)
    setTimeout(() => { setTicketModal(null); setTicketStep(1); setTicketConfirmed(false); setTicketQty(1) }, 2000)
  }

  const addToDrinkOrder = (drink) => {
    setDrinkOrder(prev => {
      const existing = prev.find(d => d.name === drink.name)
      if (existing) return prev.map(d => d.name === drink.name ? { ...d, qty: d.qty + 1 } : d)
      return [...prev, { ...drink, qty: 1 }]
    })
  }

  const totalOrder = drinkOrder.reduce((sum, d) => sum + parseInt(d.price.replace('€', '')) * d.qty, 0)

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF00FF] selection:text-black overflow-x-hidden relative">
      <motion.div className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen bg-white" style={{ opacity: strobeOpacity }} />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-64 h-80 mix-blend-difference hidden md:block"
        animate={{ x: mousePos.x - 128, y: mousePos.y - 160, opacity: hoveredDJ ? 1 : 0, scale: hoveredDJ ? 1 : 0.5, rotate: hoveredDJ ? (mousePos.x % 30 - 15) : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.5 }}
      >
        <AnimatePresence>
          {hoveredDJ && (
            <motion.img key={hoveredDJ.id} initial={{ opacity: 0, filter: "hue-rotate(0deg) contrast(100%)" }} animate={{ opacity: 1, filter: "hue-rotate(90deg) contrast(250%)" }} exit={{ opacity: 0 }} src={hoveredDJ.img} className="w-full h-full object-cover grayscale border-4 border-[#00FFFF]" alt="DJ" />
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-0 z-[150] bg-[#FF00FF] text-black flex flex-col justify-center items-center px-4">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black hover:text-[#FF00FF] transition-colors active:scale-90"><X size={32} /></button>
            <div className="flex flex-col items-center gap-8 text-[clamp(2.5rem,8vw,5rem)] font-black uppercase tracking-tighter">
              {["Lineup", "Atmosphere", "Tickets", "VIP", "Bar"].map((item, i) => (
                <motion.span key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileTap={{ scale: 0.9 }} className="hover:text-white transition-colors cursor-pointer" onClick={() => { setMenuOpen(false); if (item === "Tickets") setTicketModal("GA"); if (item === "VIP") setTicketModal("VIP"); if (item === "Bar") setShowBar(true) }}>{item}</motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ticketModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-zinc-900 border-4 border-white w-full max-w-md p-6 md:p-10 relative">
              <button onClick={() => { setTicketModal(null); setTicketStep(1); setTicketQty(1); setTicketConfirmed(false) }} className="absolute top-4 right-4 hover:text-[#FF00FF] transition-colors"><X size={24} /></button>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">{ticketModal === "VIP" ? "VIP BOOTH" : "GENERAL ADMISSION"}</h3>
              {!ticketConfirmed ? (
                <div className="flex flex-col gap-6">
                  <AnimatePresence mode="wait">
                    {ticketStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <p className="text-sm text-zinc-400 mb-4 uppercase tracking-widest">Cantidad de entradas</p>
                        <div className="flex items-center justify-center gap-6 bg-zinc-800 p-6 border-2 border-white">
                          <button onClick={() => setTicketQty(q => Math.max(1, q - 1))} className="p-3 border-2 border-white hover:bg-[#FF00FF] hover:border-[#FF00FF] transition-all active:scale-90"><Minus size={20} /></button>
                          <span className="text-5xl font-black w-16 text-center">{ticketQty}</span>
                          <button onClick={() => setTicketQty(q => Math.min(10, q + 1))} className="p-3 border-2 border-white hover:bg-[#FF00FF] hover:border-[#FF00FF] transition-all active:scale-90"><Plus size={20} /></button>
                        </div>
                        <p className="text-center text-zinc-500 mt-4 font-mono text-xs tracking-widest">{ticketModal === "VIP" ? "€45" : "€22"} / entrada · Total: <span className="text-white font-bold">€{ticketQty * (ticketModal === "VIP" ? 45 : 22)}</span></p>
                      </motion.div>
                    )}
                    {ticketStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                        <input type="text" placeholder="Nombre completo" className="w-full bg-zinc-800 border-2 border-white p-4 text-sm uppercase tracking-widest outline-none focus:border-[#FF00FF]" />
                        <input type="email" placeholder="Email" className="w-full bg-zinc-800 border-2 border-white p-4 text-sm uppercase tracking-widest outline-none focus:border-[#FF00FF]" />
                      </motion.div>
                    )}
                    {ticketStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="bg-zinc-800 border-2 border-white p-6 text-center">
                          <p className="font-mono text-xs tracking-widest text-zinc-400 mb-4">Resumen</p>
                          <p className="text-2xl font-bold">{ticketQty} × {ticketModal === "VIP" ? "VIP BOOTH" : "GA"} ENTRADA{ticketQty > 1 ? "S" : ""}</p>
                          <p className="text-4xl font-black mt-4 text-[#FF00FF]">€{ticketQty * (ticketModal === "VIP" ? 45 : 22)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button onClick={handleTicketPurchase} className="w-full py-5 bg-[#FF00FF] text-black font-black text-sm uppercase tracking-widest border-2 border-[#FF00FF] hover:bg-white hover:border-white active:scale-[0.97] transition-all">
                    {ticketStep < 3 ? "Continuar" : "Confirmar Pago"}
                  </button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-[#00FFFF] flex items-center justify-center"><Check size={40} className="text-[#00FFFF]" /></div>
                  <h4 className="text-3xl font-black tracking-tighter mb-2">CONFIRMADO</h4>
                  <p className="text-zinc-400 text-sm">Recibirás tus entradas por email.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {guestlistOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-zinc-900 border-4 border-[#00FFFF] w-full max-w-md p-6 md:p-10 relative">
              <button onClick={() => { setGuestlistOpen(false); setGuestlistSent(false) }} className="absolute top-4 right-4 hover:text-[#00FFFF] transition-colors"><X size={24} /></button>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">GUESTLIST</h3>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8">Nombre + acompañantes</p>
              {!guestlistSent ? (
                <form onSubmit={e => { e.preventDefault(); setGuestlistSent(true) }} className="flex flex-col gap-4">
                  <input type="text" placeholder="Tu nombre" required className="w-full bg-zinc-800 border-2 border-white p-4 text-sm uppercase tracking-widest outline-none focus:border-[#00FFFF]" />
                  <input type="email" placeholder="Email" required className="w-full bg-zinc-800 border-2 border-white p-4 text-sm uppercase tracking-widest outline-none focus:border-[#00FFFF]" />
                  <div className="flex items-center gap-4 bg-zinc-800 border-2 border-white p-4">
                    <Users size={20} className="text-[#00FFFF]" />
                    <select className="flex-1 bg-transparent text-sm uppercase tracking-widest outline-none">
                      {[1,2,3,4,5,6].map(n => <option key={n} className="bg-zinc-900">{n} acompañante{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#00FFFF] text-black font-black text-sm uppercase tracking-widest hover:bg-white active:scale-[0.97] transition-all flex items-center justify-center gap-2 mt-4">Enviar Solicitud <Send size={16} /></button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <Music size={48} className="mx-auto mb-4 text-[#00FFFF]" />
                  <p className="text-lg font-bold uppercase tracking-widest">¡Recibido!</p>
                  <p className="text-zinc-500 text-xs mt-2">Te confirmaremos antes del evento.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full border-b-4 border-white flex justify-between items-center px-4 md:px-8 py-4 z-40 bg-black/90 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:text-[#FF00FF] active:scale-95 transition-all text-xs md:text-base">
          <ArrowLeft size={16} />
          <span className="hidden md:inline">Catálogo</span>
        </Link>
        <div className="font-black text-xl md:text-3xl tracking-tighter">NIGHTFALL</div>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => setGuestlistOpen(true)} className="font-bold uppercase tracking-widest hover:text-[#00FFFF] transition-all text-xs cursor-pointer">Guestlist</button>
          <button onClick={() => setTicketModal("VIP")} className="font-bold uppercase tracking-widest hover:text-[#FF00FF] transition-all text-xs cursor-pointer">VIP Tables</button>
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 active:scale-90 transition-transform"><Menu size={24} /></button>
      </nav>

      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden border-b-4 border-white pt-16">
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://loremflickr.com/1920/1080/nightclub,laser,party?lock=50')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center px-4 w-full">
          <motion.h1 animate={{ x: [0, -5, 5, -3, 3, 0, 0, 0, 0, 0], y: [0, 3, -3, 3, -3, 0, 0, 0, 0, 0], textShadow: ["0px 0px 0px transparent", "8px 0px 0px #FF00FF, -8px 0px 0px #00FFFF", "-8px 0px 0px #FF00FF, 8px 0px 0px #00FFFF", "4px 4px 0px #FF00FF, -4px -4px 0px #00FFFF", "0px 0px 0px transparent", "0px 0px 0px transparent", "0px 0px 0px transparent", "0px 0px 0px transparent", "0px 0px 0px transparent", "0px 0px 0px transparent"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="text-[clamp(4rem,15vw,12rem)] font-black uppercase leading-[0.8] tracking-tighter text-center mix-blend-screen text-white w-full">ENTER<br />THE VOID.</motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b-4 border-white relative bg-zinc-950">
        <div className="whitespace-nowrap overflow-hidden flex border-b-4 border-white pb-4 md:pb-6 mb-8 md:mb-12">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="flex gap-4 md:gap-10 text-[clamp(3rem,10vw,6rem)] font-black uppercase text-transparent" style={{ WebkitTextStroke: "2px white" }}>
            <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
            <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
          </motion.div>
        </div>
        <div className="flex flex-col px-4 md:px-12">
          {lineup.map((dj) => (
            <motion.div key={dj.id} initial="idle" whileInView="active" whileHover="active" viewport={{ margin: "-20% 0px -20% 0px" }}
              variants={{ idle: { borderColor: "#27272a", color: "#a1a1aa" }, active: { borderColor: "#FF00FF", color: "#ffffff" } }}
              className="flex flex-col md:flex-row md:justify-between md:items-end border-b-2 py-8 md:py-12 md:cursor-crosshair transition-all active:scale-[0.98]"
              onMouseEnter={() => setHoveredDJ(dj)} onMouseLeave={() => setHoveredDJ(null)}
            >
              <motion.span variants={{ idle: { color: "#52525b" }, active: { color: "#00FFFF" } }} className="text-xl md:text-4xl font-bold mb-1 md:mb-0">{dj.date}</motion.span>
              <span className="text-[clamp(2.5rem,8vw,8rem)] font-black uppercase tracking-tighter leading-none text-current md:text-right break-words">{dj.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-0 md:px-12 border-b-4 border-white bg-black overflow-hidden">
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter mb-8 md:mb-16 text-center text-[#FF00FF] px-4">ATMOSPHERE</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto px-4 md:px-0">
          {gallery.map((img, i) => (
            <div key={i} className="relative break-inside-avoid overflow-hidden group border-4 border-zinc-900 hover:border-[#00FFFF] transition-colors duration-500 cursor-crosshair">
              <img src={img} alt="Party" className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:saturate-[2.5] group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#FF00FF] mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-12 border-b-4 border-white bg-zinc-950">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <motion.div whileTap={{ scale: 0.98 }} onClick={() => setTicketModal("GA")} className="flex-1 border-4 border-white p-6 md:p-12 hover:border-[#FF00FF] transition-all duration-300 relative group overflow-hidden md:cursor-crosshair md:hover:shadow-[0_0_60px_rgba(255,0,255,0.2)]">
            <div className="absolute inset-0 bg-[#FF00FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <h3 className="text-[clamp(2rem,6vw,5rem)] font-black mb-4 md:mb-6 tracking-tighter md:group-hover:text-[#FF00FF] transition-colors leading-none">GENERAL<br/>ADMISSION</h3>
            <p className="text-base md:text-xl font-bold text-zinc-500 uppercase tracking-widest">Access to main room.<br/>Standard bar.</p>
            <div className="mt-8 md:mt-12 text-lg md:text-xl font-black border-4 border-white inline-block px-6 md:px-8 py-3 md:py-4 md:group-hover:bg-[#FF00FF] md:group-hover:text-black md:group-hover:border-[#FF00FF] transition-all active:bg-white active:text-black">BUY TICKET</div>
          </motion.div>
          <motion.div whileTap={{ scale: 0.98 }} onClick={() => setTicketModal("VIP")} className="flex-1 border-4 border-white p-6 md:p-12 hover:border-[#00FFFF] transition-all duration-300 relative group overflow-hidden md:cursor-crosshair md:hover:shadow-[0_0_60px_rgba(0,255,255,0.2)]">
            <div className="absolute inset-0 bg-[#00FFFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <h3 className="text-[clamp(2rem,6vw,5rem)] font-black mb-4 md:mb-6 tracking-tighter md:group-hover:text-[#00FFFF] transition-colors leading-none">VIP<br/>BOOTH</h3>
            <p className="text-base md:text-xl font-bold text-zinc-500 uppercase tracking-widest">Private table.<br/>Bottle service.<br/>Backstage access.</p>
            <div className="mt-8 md:mt-12 text-lg md:text-xl font-black border-4 border-white inline-block px-6 md:px-8 py-3 md:py-4 md:group-hover:bg-[#00FFFF] md:group-hover:text-black md:group-hover:border-[#00FFFF] transition-all active:bg-white active:text-black">RESERVE</div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-12 border-b-4 border-white bg-black overflow-hidden">
        <div className="flex justify-between items-end mb-12 max-w-7xl mx-auto">
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-black uppercase tracking-tighter">BAR</h2>
          <button onClick={() => setShowBar(!showBar)} className="font-mono text-xs tracking-widest uppercase hover:text-[#00FFFF] transition-colors flex items-center gap-2">
            <Wine size={16} /> {showBar ? "Cerrar" : "Abrir Carta"}
          </button>
        </div>
        {showBar && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {drinks.map((drink) => (
                <motion.div key={drink.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-2 border-zinc-800 p-4 md:p-6 hover:border-[#00FFFF]/50 transition-all cursor-pointer"
                  onMouseEnter={() => setSelectedDrink(drink.name)} onMouseLeave={() => setSelectedDrink(null)} onClick={() => addToDrinkOrder(drink)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm uppercase tracking-wider">{drink.name}</h3>
                    <span className="text-[#00FFFF] font-black">{drink.price}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{drink.type}</p>
                  {selectedDrink === drink.name && <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{drink.desc}</p>}
                </motion.div>
              ))}
            </div>
            {drinkOrder.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 border-2 border-[#FF00FF] p-6 bg-zinc-900/80 backdrop-blur-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black uppercase tracking-wider text-sm">Tu Pedido</h3>
                  <span className="text-2xl font-black text-[#FF00FF]">€{totalOrder}</span>
                </div>
                {drinkOrder.map((d, i) => (
                  <div key={i} className="flex justify-between text-sm text-zinc-400 py-2 border-b border-zinc-800">
                    <span>{d.name} × {d.qty}</span>
                    <span>€{parseInt(d.price.replace('€','')) * d.qty}</span>
                  </div>
                ))}
                <button className="w-full mt-6 py-4 bg-[#FF00FF] text-black font-black text-sm uppercase tracking-widest hover:bg-white active:scale-[0.97] transition-all">Pedir a Mesa</button>
              </motion.div>
            )}
          </motion.div>
        )}
      </section>

      <section className="py-24 md:py-40 flex justify-center items-center bg-black border-b-4 border-white px-4">
        <p className="text-[8px] md:text-xs tracking-[0.3em] md:tracking-[1em] text-zinc-800 font-black uppercase text-center md:hover:text-white transition-colors duration-1000">
          Strictly black.<br/><br/><br/>No photos inside.
        </p>
      </section>

      <footer className="py-16 md:py-24 px-4 md:px-12 bg-black flex flex-col items-center">
        <h2 className="text-[clamp(3rem,15vw,10rem)] font-black tracking-tighter mb-8 md:mb-12 text-white leading-none">NIGHTFALL</h2>
        <div className="flex gap-6 md:gap-8">
          <motion.a whileTap={{ scale: 0.9 }} href="#" className="p-4 border-4 border-white rounded-full md:hover:bg-white md:hover:text-black transition-colors active:bg-white active:text-black"><Instagram size={24} className="md:w-8 md:h-8" /></motion.a>
          <motion.a whileTap={{ scale: 0.9 }} href="#" className="p-4 border-4 border-white rounded-full md:hover:bg-white md:hover:text-black transition-colors active:bg-white active:text-black"><Twitter size={24} className="md:w-8 md:h-8" /></motion.a>
        </div>
      </footer>
    </div>
  )
}
