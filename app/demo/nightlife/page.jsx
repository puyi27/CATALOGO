'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DemoLayout from '@/components/DemoLayout';
import { 
  ArrowLeft, Instagram, Twitter, Menu, X, Users, Wine, 
  Ticket, Plus, Minus, Check, Send, Music, MapPin, 
  AlertTriangle, Clock, Speaker
} from 'lucide-react';

export default function NightfallDemo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredDJ, setHoveredDJ] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ticketModal, setTicketModal] = useState(null);
  const [ticketQty, setTicketQty] = useState(1);
  const [ticketStep, setTicketStep] = useState(1);
  const [ticketConfirmed, setTicketConfirmed] = useState(false);
  const [guestlistOpen, setGuestlistOpen] = useState(false);
  const [guestlistSent, setGuestlistSent] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [drinkOrder, setDrinkOrder] = useState([]);
  const [showBar, setShowBar] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    import('animejs').then((animeModule) => {
      const anime = animeModule.default;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.anime-gallery-item',
              scale: [0.9, 1],
              opacity: [0, 1],
              delay: anime.stagger(150),
              easing: 'easeOutExpo',
              duration: 800
            });
            observer.disconnect();
          }
        });
      });
      const el = document.querySelector('.anime-gallery-container');
      if(el) observer.observe(el);
    });
  }, []);

  const strobeOpacity = useTransform(scrollY, (y) => (Math.floor(y / 30) % 2 === 0 ? 0 : 0.04));

  const lineup = [
    { id: 1, date: "JUL 12", name: "AMELIE LENS", img: "/images/demo/nightlife/1.jpg", genre: "TECHNO" },
    { id: 2, date: "JUL 19", name: "CHARLOTTE DE WITTE", img: "/images/demo/nightlife/2.jpg", genre: "ACID TECHNO" },
    { id: 3, date: "AUG 02", name: "TALE OF US", img: "/images/demo/nightlife/3.jpg", genre: "MELODIC" },
    { id: 4, date: "AUG 16", name: "PEGGY GOU", img: "/images/demo/nightlife/4.jpg", genre: "HOUSE" },
    { id: 5, date: "AUG 30", name: "RICHIE HAWTIN", img: "/images/demo/nightlife/5.jpg", genre: "MINIMAL" },
    { id: 6, date: "SEP 12", name: "NINA KRAVIZ", img: "/images/demo/nightlife/6.jpg", genre: "TECHNO" },
  ];

  const gallery = [
    "/images/demo/nightlife/1.jpg",
    "/images/demo/nightlife/2.jpg",
    "/images/demo/nightlife/3.jpg",
    "/images/demo/nightlife/4.jpg",
    "/images/demo/nightlife/5.jpg",
    "/images/demo/nightlife/6.jpg",
  ];

  const drinks = [
    { name: "NEGRONI SMOKED", price: "€14", type: "cocktail", desc: "Gin, Campari, Sweet Vermouth — smoked with juniper wood." },
    { name: "ESPRESSO MARTINI", price: "€12", type: "cocktail", desc: "Vodka, coffee liqueur, fresh espresso. Shaken hard." },
    { name: "DARK 'N STORMY", price: "€13", type: "cocktail", desc: "Dark rum, ginger beer, lime. Served tall." },
    { name: "CHAMPAGNE MOËT", price: "€95", type: "champagne", desc: "Brut Impérial. Served in flute." },
    { name: "CHAMPAGNE DOM", price: "€280", type: "champagne", desc: "Dom Pérignon Vintage 2015. VIP table only." },
    { name: "GIN TONIC PREMIUM", price: "€15", type: "cocktail", desc: "Monkey 47 Gin, Fever-Tree tonic, juniper berries." },
  ];

  const faqs = [
    { q: "WHAT IS THE DRESS CODE?", a: "Strictly black. Avant-garde, techno, fetish, or minimalist. No sportswear, no logos, no bright colors. The door selector has final say." },
    { q: "CAN I TAKE PHOTOS INSIDE?", a: "No. Phone cameras will be taped at the door. Anyone caught taking photos will be permanently banned. Experience the moment." },
    { q: "DO YOU ACCEPT CASH?", a: "NIGHTFALL is a 100% cashless venue. Cards and contactless payments only at all bars and box office." },
    { q: "WHAT TIME DO THE HEADLINERS START?", a: "Resident DJs play until 2:00 AM. Headliners typically start between 2:30 AM and 3:00 AM. Arrive early to guarantee entry." }
  ];

  const handleTicketPurchase = () => {
    if (ticketStep < 3) { setTicketStep(s => s + 1); return; }
    setTicketConfirmed(true);
    setTimeout(() => { setTicketModal(null); setTicketStep(1); setTicketConfirmed(false); setTicketQty(1); }, 2000);
  };

  const addToDrinkOrder = (drink) => {
    setDrinkOrder(prev => {
      const existing = prev.find(d => d.name === drink.name);
      if (existing) return prev.map(d => d.name === drink.name ? { ...d, qty: d.qty + 1 } : d);
      return [...prev, { ...drink, qty: 1 }];
    });
  };

  const totalOrder = drinkOrder.reduce((sum, d) => sum + parseInt(d.price.replace('€', '')) * d.qty, 0);

  return (
    <DemoLayout title="Nightfall">
    <div className="text-white font-sans selection:bg-[#FF00FF] selection:text-black overflow-x-hidden relative bg-black min-h-screen">
      
      {/* Background Strobe & Noise */}
      <motion.div className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen bg-white" style={{ opacity: strobeOpacity }} />
      <div className="fixed inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Hover Image Reveal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-64 h-80 mix-blend-difference hidden md:block overflow-hidden"
        animate={{ x: mousePos.x - 128, y: mousePos.y - 160, opacity: hoveredDJ ? 1 : 0, scale: hoveredDJ ? 1 : 0.5, rotate: hoveredDJ ? (mousePos.x % 30 - 15) : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.5 }}
      >
        <AnimatePresence>
          {hoveredDJ && (
            <motion.img 
              key={hoveredDJ.id} 
              src={hoveredDJ.img} 
              initial={{ opacity: 0, scale: 1.2, filter: "contrast(200%) grayscale(100%)" }} 
              animate={{ opacity: 1, scale: 1, filter: "contrast(150%) grayscale(0%) hue-rotate(90deg)" }} 
              exit={{ opacity: 0 }} 
              className="w-full h-full object-cover border-4 border-[#00FFFF]" 
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b-4 border-white flex justify-between items-center px-6 py-5 z-40 bg-black/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:text-[#FF00FF] active:scale-95 transition-all text-xs md:text-sm">
          <ArrowLeft size={16} />
          <span className="hidden md:inline">CATÁLOGO</span>
        </Link>
        <div className="font-black text-2xl md:text-4xl tracking-tighter mix-blend-difference absolute left-1/2 -translate-x-1/2 pointer-events-none">NIGHTFALL</div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#lineup" className="font-bold uppercase tracking-widest hover:text-[#00FFFF] transition-all text-sm cursor-pointer">LINEUP</a>
          <button onClick={() => setGuestlistOpen(true)} className="font-bold uppercase tracking-widest hover:text-[#FF00FF] transition-all text-sm cursor-pointer">GUESTLIST</button>
          <button onClick={() => setTicketModal("VIP")} className="font-bold uppercase tracking-widest text-black bg-white px-4 py-2 hover:bg-[#FF00FF] hover:text-white transition-all text-sm cursor-pointer">VIP BOOKING</button>
        </div>
        <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 active:scale-90 transition-transform"><Menu size={24} /></button>
      </nav>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-0 z-[150] bg-[#FF00FF] text-black flex flex-col justify-center items-center px-4">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black hover:text-[#FF00FF] transition-colors active:scale-90"><X size={32} /></button>
            <div className="flex flex-col items-center gap-8 text-6xl md:text-8xl font-black uppercase tracking-tighter">
              {["Lineup", "Atmosphere", "Tickets", "VIP", "Bar"].map((item, i) => (
                <motion.a 
                  href={`#${item.toLowerCase()}`}
                  key={item} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.1 }} 
                  whileTap={{ scale: 0.9 }} 
                  className="hover:text-white transition-colors cursor-pointer" 
                  onClick={() => { 
                    setMenuOpen(false); 
                    if (item === "Tickets") setTicketModal("GA"); 
                    if (item === "VIP") setTicketModal("VIP"); 
                    if (item === "Bar") setShowBar(true); 
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket & VIP Modal */}
      <AnimatePresence>
        {ticketModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-black border-4 border-white w-full max-w-lg p-8 md:p-12 relative shadow-[0_0_50px_rgba(255,0,255,0.3)]">
              <button onClick={() => { setTicketModal(null); setTicketStep(1); setTicketQty(1); setTicketConfirmed(false); }} className="absolute top-4 right-4 hover:text-[#FF00FF] transition-colors"><X size={24} /></button>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">{ticketModal === "VIP" ? "VIP BOOTH" : "GENERAL ADMISSION"}</h3>
              
              {!ticketConfirmed ? (
                <div className="flex flex-col gap-8">
                  <AnimatePresence mode="wait">
                    {ticketStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <p className="text-sm text-zinc-500 mb-4 uppercase tracking-widest font-bold">Select Quantity</p>
                        <div className="flex items-center justify-center gap-6 bg-zinc-900 p-8 border-2 border-white">
                          <button onClick={() => setTicketQty(q => Math.max(1, q - 1))} className="p-3 border-2 border-white hover:bg-[#FF00FF] hover:border-[#FF00FF] transition-all active:scale-90"><Minus size={24} /></button>
                          <span className="text-6xl font-black w-20 text-center">{ticketQty}</span>
                          <button onClick={() => setTicketQty(q => Math.min(10, q + 1))} className="p-3 border-2 border-white hover:bg-[#FF00FF] hover:border-[#FF00FF] transition-all active:scale-90"><Plus size={24} /></button>
                        </div>
                        <p className="text-center text-zinc-500 mt-6 font-mono text-sm tracking-widest">{ticketModal === "VIP" ? "€450 Minimum Spend" : "€25"} / ticket · Total: <span className="text-white font-bold text-xl">€{ticketQty * (ticketModal === "VIP" ? 450 : 25)}</span></p>
                      </motion.div>
                    )}
                    {ticketStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                        <p className="text-sm text-zinc-500 mb-2 uppercase tracking-widest font-bold">Guest Details</p>
                        <input type="text" placeholder="Full Name" className="w-full bg-zinc-900 border-2 border-white p-5 text-sm uppercase tracking-widest outline-none focus:border-[#FF00FF] transition-colors" />
                        <input type="email" placeholder="Email Address" className="w-full bg-zinc-900 border-2 border-white p-5 text-sm uppercase tracking-widest outline-none focus:border-[#FF00FF] transition-colors" />
                        <input type="tel" placeholder="Phone Number" className="w-full bg-zinc-900 border-2 border-white p-5 text-sm uppercase tracking-widest outline-none focus:border-[#FF00FF] transition-colors" />
                      </motion.div>
                    )}
                    {ticketStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="bg-zinc-900 border-2 border-white p-8 text-center">
                          <p className="font-mono text-sm tracking-widest text-zinc-500 mb-6">Final Review</p>
                          <p className="text-3xl font-black mb-2">{ticketQty} × {ticketModal === "VIP" ? "VIP BOOTH" : "GA"} TICKET{ticketQty > 1 ? "S" : ""}</p>
                          <p className="text-sm text-zinc-400 tracking-widest mb-8">ENTRY GUARANTEED BEFORE 2:00 AM</p>
                          <div className="w-full h-[2px] bg-white mb-8" />
                          <p className="text-6xl font-black text-[#FF00FF]">€{ticketQty * (ticketModal === "VIP" ? 450 : 25)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex gap-4">
                    {ticketStep > 1 && (
                      <button onClick={() => setTicketStep(s => s - 1)} className="px-6 py-5 border-2 border-white text-white font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">Back</button>
                    )}
                    <button onClick={handleTicketPurchase} className="flex-1 py-5 bg-[#FF00FF] text-black font-black text-sm uppercase tracking-widest border-2 border-[#FF00FF] hover:bg-white hover:border-white active:scale-[0.98] transition-all">
                      {ticketStep < 3 ? "Continue" : "Confirm Payment"}
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-[#00FFFF] flex items-center justify-center bg-[#00FFFF]/10"><Check size={48} className="text-[#00FFFF]" /></div>
                  <h4 className="text-4xl font-black tracking-tighter mb-4">CONFIRMED</h4>
                  <p className="text-zinc-400 text-lg">Tickets sent to your email.</p>
                  <p className="text-zinc-600 text-sm mt-4 tracking-widest">SEE YOU IN THE VOID.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guestlist Modal */}
      <AnimatePresence>
        {guestlistOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-black border-4 border-[#00FFFF] w-full max-w-lg p-8 md:p-12 relative shadow-[0_0_50px_rgba(0,255,255,0.2)]">
              <button onClick={() => { setGuestlistOpen(false); setGuestlistSent(false); }} className="absolute top-4 right-4 hover:text-[#00FFFF] transition-colors"><X size={24} /></button>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 text-[#00FFFF]">GUESTLIST</h3>
              <p className="text-zinc-400 text-sm uppercase tracking-widest mb-8">Reduced entry before 1:30 AM</p>
              
              {!guestlistSent ? (
                <form onSubmit={e => { e.preventDefault(); setGuestlistSent(true); }} className="flex flex-col gap-5">
                  <input type="text" placeholder="Full Name" required className="w-full bg-zinc-900 border-2 border-white p-5 text-sm uppercase tracking-widest outline-none focus:border-[#00FFFF] transition-colors" />
                  <input type="email" placeholder="Email Address" required className="w-full bg-zinc-900 border-2 border-white p-5 text-sm uppercase tracking-widest outline-none focus:border-[#00FFFF] transition-colors" />
                  
                  <div className="flex items-center gap-4 bg-zinc-900 border-2 border-white p-5 focus-within:border-[#00FFFF] transition-colors">
                    <Users size={20} className="text-[#00FFFF]" />
                    <select className="flex-1 bg-transparent text-sm uppercase tracking-widest outline-none text-white appearance-none cursor-pointer">
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-zinc-900 text-white">{n} Guest{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  
                  <button type="submit" className="w-full py-5 bg-[#00FFFF] text-black font-black text-sm uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4">
                    Send Request <Send size={18} />
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <Music size={64} className="mx-auto mb-6 text-[#00FFFF] animate-pulse" />
                  <p className="text-2xl font-black uppercase tracking-widest mb-2">Request Received</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">Confirmation will be sent via email 24 hours before the event.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Section 1: Hero */}
        <section className="relative h-[100svh] flex items-center justify-center overflow-hidden border-b-4 border-white pt-20">
          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.05, 1] }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute inset-0 bg-gradient-to-br from-fuchsia-900 via-black to-cyan-900" 
          />
          <div className="absolute inset-0 bg-black/70" />
          
          <div className="absolute inset-0 bg-[url('/images/demo/nightlife/hero.jpg')] bg-cover bg-center mix-blend-luminosity opacity-40"></div>

          <div className="relative z-10 flex flex-col items-center px-4 w-full">
            <motion.h1 
              animate={{ 
                x: [0, -4, 4, -2, 2, 0, 0, 0, 0, 0], 
                y: [0, 2, -2, 2, -2, 0, 0, 0, 0, 0], 
                textShadow: [
                  "0px 0px 0px transparent", 
                  "10px 0px 0px #FF00FF, -10px 0px 0px #00FFFF", 
                  "-10px 0px 0px #FF00FF, 10px 0px 0px #00FFFF", 
                  "5px 5px 0px #FF00FF, -5px -5px 0px #00FFFF", 
                  "0px 0px 0px transparent", 
                  "0px 0px 0px transparent", 
                  "0px 0px 0px transparent"
                ] 
              }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
              className="text-7xl sm:text-[8rem] md:text-[14rem] font-black uppercase leading-[0.8] tracking-tighter text-center text-white w-full"
            >
              NIGHT<br />FALL.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 text-sm md:text-xl tracking-[0.5em] md:tracking-[1em] font-bold text-zinc-300 text-center uppercase"
            >
              UNDERGROUND TECHNO CLUB
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-12 flex flex-col items-center gap-4 text-zinc-500 animate-bounce"
            >
              <span className="text-[10px] tracking-widest font-bold uppercase">Scroll Down</span>
              <div className="w-[2px] h-12 bg-zinc-500" />
            </motion.div>
          </div>
        </section>

        {/* Section 2: Manifesto / Rules */}
        <section className="py-24 md:py-40 bg-zinc-950 border-b-4 border-white px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF00FF]/5 mix-blend-screen pointer-events-none" />
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-[#FF00FF]">THE RULES.</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <AlertTriangle className="w-8 h-8 text-[#00FFFF] shrink-0" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-2">No Cameras</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-bold tracking-wide">Lenses are taped at the door. Flash photography will result in immediate removal. Live in the present.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <Users className="w-8 h-8 text-[#00FFFF] shrink-0" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-2">Dress Code</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-bold tracking-wide">Strictly black. Minimalist, fetish, avant-garde. The door makes the final decision regardless of ticket status.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <Speaker className="w-8 h-8 text-[#00FFFF] shrink-0" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-2">Respect The Vibe</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-bold tracking-wide">Zero tolerance for discrimination, harassment, or non-consensual behavior. Speak to any staff if you feel unsafe.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] border-4 border-white hidden md:block">
              <img src="/images/demo/nightlife/6.jpg" alt="Club Rules" className="w-full h-full object-cover grayscale" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 border-8 border-transparent hover:border-[#FF00FF] transition-colors duration-500" />
            </div>
          </div>
        </section>

        {/* Section 3: Lineup */}
        <section id="lineup" className="py-24 md:py-40 border-b-4 border-white relative bg-black">
          <div className="whitespace-nowrap overflow-hidden flex border-b-4 border-white pb-6 mb-12 md:mb-20">
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="flex gap-8 md:gap-16 text-6xl md:text-9xl font-black uppercase text-transparent" style={{ WebkitTextStroke: "2px white" }}>
              <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
              <span className="shrink-0">LINEUP --- LINEUP --- LINEUP --- LINEUP --- </span>
            </motion.div>
          </div>
          
          <div className="flex flex-col max-w-[1400px] mx-auto px-6 md:px-12">
            {lineup.map((dj) => (
              <motion.div 
                key={dj.id} 
                initial="idle" 
                whileInView="active" 
                whileHover="active" 
                viewport={{ margin: "-20% 0px -20% 0px" }}
                variants={{ 
                  idle: { borderColor: "#27272a", color: "#71717a" }, 
                  active: { borderColor: "#FF00FF", color: "#ffffff" } 
                }}
                className="flex flex-col md:flex-row md:justify-between md:items-end border-b-[3px] py-10 md:py-16 md:cursor-crosshair transition-colors duration-300 group"
                onMouseEnter={() => setHoveredDJ(dj)} 
                onMouseLeave={() => setHoveredDJ(null)}
              >
                <div className="flex flex-col mb-4 md:mb-0">
                  <motion.span variants={{ idle: { color: "#52525b" }, active: { color: "#00FFFF" } }} className="text-2xl md:text-5xl font-black mb-2">{dj.date}</motion.span>
                  <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-zinc-500 group-hover:text-white transition-colors">{dj.genre}</span>
                </div>
                <span className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-current md:text-right break-words">{dj.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4: Atmosphere / Gallery */}
        <section id="atmosphere" className="py-24 md:py-40 px-6 md:px-12 border-b-4 border-white bg-zinc-950 overflow-hidden">
          <div className="max-w-[1400px] mx-auto mb-16 md:mb-24 text-center">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white">ATMOSPHERE</h2>
            <p className="text-zinc-500 text-sm md:text-xl font-bold tracking-widest uppercase">Lose yourself in the sound</p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-[1400px] mx-auto anime-gallery-container">
            {gallery.map((img, i) => (
              <div key={i} className="anime-gallery-item opacity-0 relative break-inside-avoid overflow-hidden group border-4 border-zinc-900 hover:border-[#00FFFF] transition-colors duration-500 cursor-crosshair">
                <img src={img} alt="Atmosphere" className={`w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0`} />
                <div className="absolute inset-0 bg-[#FF00FF] mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Tickets / VIP */}
        <section id="tickets" className="py-24 md:py-40 px-6 md:px-12 border-b-4 border-white bg-black">
          <div className="flex flex-col md:flex-row gap-8 max-w-[1400px] mx-auto">
            
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => setTicketModal("GA")} className="flex-1 border-4 border-white p-8 md:p-16 hover:border-[#FF00FF] transition-all duration-300 relative group overflow-hidden md:cursor-crosshair bg-zinc-950">
              <div className="absolute inset-0 bg-[#FF00FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <h3 className="text-5xl md:text-8xl font-black mb-6 md:mb-10 tracking-tighter md:group-hover:text-[#FF00FF] transition-colors leading-[0.9]">GENERAL<br/>ADMISSION</h3>
              <div className="space-y-4 mb-12">
                <p className="text-sm md:text-lg font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-3"><Check size={20} className="text-[#FF00FF]"/> Access to main room</p>
                <p className="text-sm md:text-lg font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-3"><Check size={20} className="text-[#FF00FF]"/> Standard bar access</p>
                <p className="text-sm md:text-lg font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-3"><Check size={20} className="text-[#FF00FF]"/> Cloakroom included</p>
              </div>
              <div className="text-xl md:text-3xl font-black border-4 border-white inline-block px-8 md:px-12 py-4 md:py-6 md:group-hover:bg-[#FF00FF] md:group-hover:text-black md:group-hover:border-[#FF00FF] transition-all active:bg-white active:text-black">BUY TICKET - €25</div>
            </motion.div>
            
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => setTicketModal("VIP")} className="flex-1 border-4 border-white p-8 md:p-16 hover:border-[#00FFFF] transition-all duration-300 relative group overflow-hidden md:cursor-crosshair bg-zinc-950">
              <div className="absolute inset-0 bg-[#00FFFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <h3 className="text-5xl md:text-8xl font-black mb-6 md:mb-10 tracking-tighter md:group-hover:text-[#00FFFF] transition-colors leading-[0.9]">VIP<br/>BOOTH</h3>
              <div className="space-y-4 mb-12">
                <p className="text-sm md:text-lg font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-3"><Check size={20} className="text-[#00FFFF]"/> Private table (up to 6)</p>
                <p className="text-sm md:text-lg font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-3"><Check size={20} className="text-[#00FFFF]"/> Fast-track entry</p>
                <p className="text-sm md:text-lg font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-3"><Check size={20} className="text-[#00FFFF]"/> Bottle service</p>
              </div>
              <div className="text-xl md:text-3xl font-black border-4 border-white inline-block px-8 md:px-12 py-4 md:py-6 md:group-hover:bg-[#00FFFF] md:group-hover:text-black md:group-hover:border-[#00FFFF] transition-all active:bg-white active:text-black">RESERVE - €450</div>
            </motion.div>
            
          </div>
        </section>

        {/* Section 6: Bar Menu */}
        <section id="bar" className="py-24 md:py-40 px-6 md:px-12 border-b-4 border-white bg-zinc-950 overflow-hidden">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">THE BAR</h2>
              <p className="text-zinc-500 text-sm md:text-lg uppercase tracking-widest font-bold mt-2">Premium Spirits & Cocktails</p>
            </div>
            <button onClick={() => setShowBar(!showBar)} className="border-4 border-white px-8 py-4 font-black text-sm md:text-base tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex items-center gap-3">
              <Wine size={20} /> {showBar ? "CLOSE MENU" : "OPEN MENU"}
            </button>
          </div>
          
          <AnimatePresence>
            {showBar && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }}
                className="max-w-[1400px] mx-auto overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t-4 border-zinc-800">
                  {drinks.map((drink) => (
                    <motion.div 
                      key={drink.name} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="border-4 border-zinc-900 p-6 md:p-8 hover:border-[#00FFFF] transition-all cursor-pointer bg-black group"
                      onMouseEnter={() => setSelectedDrink(drink.name)} 
                      onMouseLeave={() => setSelectedDrink(null)} 
                      onClick={() => addToDrinkOrder(drink)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-black text-xl uppercase tracking-widest group-hover:text-[#00FFFF] transition-colors pr-4">{drink.name}</h3>
                        <span className="text-white font-black text-xl">{drink.price}</span>
                      </div>
                      <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">{drink.type}</p>
                      
                      <AnimatePresence>
                        {selectedDrink === drink.name && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-zinc-400 leading-relaxed font-bold border-t-2 border-zinc-800 pt-4 mt-4"
                          >
                            {drink.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                
                {drinkOrder.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 border-4 border-[#FF00FF] p-8 md:p-12 bg-black shadow-[0_0_30px_rgba(255,0,255,0.1)]">
                    <div className="flex justify-between items-center mb-8 border-b-2 border-zinc-800 pb-4">
                      <h3 className="font-black uppercase tracking-tighter text-2xl md:text-3xl">YOUR ORDER</h3>
                      <span className="text-4xl md:text-5xl font-black text-[#FF00FF]">€{totalOrder}</span>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {drinkOrder.map((d, i) => (
                        <div key={i} className="flex justify-between text-base md:text-xl font-bold text-zinc-300">
                          <span>{d.qty} × {d.name}</span>
                          <span className="text-white">€{parseInt(d.price.replace('€','')) * d.qty}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full py-6 bg-[#FF00FF] text-black font-black text-xl uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all">Order to VIP Table</button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 7: FAQ / Info */}
        <section className="py-24 md:py-40 px-6 md:px-12 border-b-4 border-white bg-black">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-white">INFO.</h2>
              <div className="flex flex-col gap-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b-2 border-zinc-800 pb-6">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <span className="font-black text-lg md:text-xl uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">{faq.q}</span>
                      <Plus className={`w-6 h-6 text-[#FF00FF] transition-transform ${activeFaq === i ? 'rotate-45' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-zinc-500 font-bold text-sm md:text-base leading-relaxed tracking-wide">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-between">
              <div className="border-4 border-zinc-900 p-8 md:p-12 mb-8 bg-zinc-950">
                <MapPin className="w-12 h-12 text-[#00FFFF] mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Location</h3>
                <p className="text-zinc-400 font-bold tracking-widest leading-relaxed">
                  INDUSTRIAL DISTRICT<br/>
                  BUILDING 4A, SECTOR 7<br/>
                  BERLIN, 10243
                </p>
              </div>
              <div className="border-4 border-zinc-900 p-8 md:p-12 bg-zinc-950">
                <Clock className="w-12 h-12 text-[#FF00FF] mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Hours</h3>
                <p className="text-zinc-400 font-bold tracking-widest leading-relaxed">
                  FRI - SAT: 23:59 - 08:00<br/>
                  SUN: 14:00 - 22:00 (DAY EVENT)<br/>
                  MON - THU: CLOSED
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-24 md:py-32 px-6 md:px-12 bg-black flex flex-col items-center border-t-[10px] border-[#FF00FF]">
        <h2 className="text-7xl sm:text-[8rem] md:text-[12rem] font-black tracking-tighter mb-12 text-white leading-none text-center">NIGHTFALL</h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
          <motion.a whileTap={{ scale: 0.9 }} href="#" className="p-6 border-4 border-zinc-800 rounded-none md:hover:border-white md:hover:bg-white md:hover:text-black transition-colors active:bg-white active:text-black"><Instagram size={32} /></motion.a>
          <motion.a whileTap={{ scale: 0.9 }} href="#" className="p-6 border-4 border-zinc-800 rounded-none md:hover:border-white md:hover:bg-white md:hover:text-black transition-colors active:bg-white active:text-black"><Twitter size={32} /></motion.a>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-xs md:text-sm font-bold tracking-widest text-zinc-600 uppercase w-full max-w-[1400px] border-t-2 border-zinc-900 pt-12">
          <span className="hover:text-white transition-colors cursor-pointer">Impressum</span>
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          <span>© 2026 NIGHTFALL BERLIN</span>
        </div>
      </footer>
    </div>
    </DemoLayout>
  );
}
