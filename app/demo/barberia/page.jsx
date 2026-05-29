"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { 
  ShoppingCart, X, Menu, Instagram, Twitter, ChevronRight, 
  Scissors, MapPin, Clock, Phone, Star, Shield, Award, Map
, ArrowLeft} from 'lucide-react'
import DemoLayout from "@/components/DemoLayout"

export default function BarberShop() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState('ALL')
  const [cart, setCart] = useState([
    { id: 'c1', name: 'MATTE CLAY', price: 25, type: 'PRODUCT', img: '/images/demo/barberia/3.jpg', qty: 1 },
    { id: 'c2', name: 'BEARD TRIM', price: 20, type: 'SERVICE', img: '/images/demo/barberia/2.jpg', detail: 'NOV 24, 2:30 PM' }
  ])

  const { scrollYProgress } = useScroll()
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  useEffect(() => {
    import('animejs').then((animeModule) => {
      const anime = animeModule.default;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.anime-barber-item',
              translateY: [50, 0],
              opacity: [0, 1],
              delay: anime.stagger(100),
              easing: 'easeOutExpo',
              duration: 800
            });
            observer.disconnect();
          }
        });
      });
      const el = document.querySelector('.anime-barber-container');
      if(el) observer.observe(el);
    });
  }, [activeTab]);

  const items = [
    { id: 1, name: "CLASSIC FADE", price: 30, img: "/images/demo/barberia/1.jpg", soldOut: false, category: "SERVICES", desc: "Traditional skin fade with precise sheer work on top." },
    { id: 2, name: "BEARD SCULPT", price: 25, img: "/images/demo/barberia/2.jpg", soldOut: false, category: "SERVICES", desc: "Hot towel prep, straight razor lineup, and beard oil finish." },
    { id: 3, name: "TEXTURE CLAY", price: 22, img: "/images/demo/barberia/3.jpg", soldOut: false, category: "PRODUCTS", desc: "High hold, matte finish. Water soluble." },
    { id: 4, name: "HEAVY HOODIE", price: 65, img: "/images/demo/barberia/4.jpg", soldOut: true, category: "MERCH", desc: "400gsm cotton fleece. Drop shoulder fit." },
    { id: 5, name: "BUZZ CUT", price: 20, img: "/images/demo/barberia/5.jpg", soldOut: false, category: "SERVICES", desc: "Single guard all over with a crisp lineup." },
    { id: 6, name: "SIGNATURE CAP", price: 35, img: "/images/demo/barberia/6.jpg", soldOut: false, category: "MERCH", desc: "Classic 6-panel with embroidered FADE & CO logo." }
  ]

  const barbers = [
    { name: "MARCUS", role: "MASTER BARBER", exp: "12 YRS", img: "/images/demo/barberia/1.jpg" },
    { name: "LEON", role: "FADE SPECIALIST", exp: "5 YRS", img: "/images/demo/barberia/2.jpg" },
    { name: "DAVID", role: "SENIOR BARBER", exp: "8 YRS", img: "/images/demo/barberia/3.jpg" },
  ]

  const reviews = [
    { name: "ALEX T.", text: "Best fade in the city. The attention to detail is insane.", rating: 5 },
    { name: "JAMES R.", text: "Vibe is unmatched. They actually listen to what you want.", rating: 5 },
    { name: "MICHAEL B.", text: "Been coming here for 3 years. Consistent every single time.", rating: 5 },
  ]

  const filteredItems = activeTab === 'ALL' ? items : items.filter(item => item.category === activeTab);
  const cartTotal = cart.reduce((total, item) => total + item.price, 0)

  const removeFromCart = (id) => {
    setCart(cart.filter(c => c.id !== id))
  }

  return (
    <DemoLayout title="Fade & Co.">
      <div className="text-stone-900 bg-[#E8E6E1] selection:bg-black selection:text-white font-sans uppercase md:cursor-none overflow-x-hidden min-h-screen">
        
        {/* Custom Cursor */}
        <motion.div
          className="hidden md:flex fixed top-0 left-0 w-8 h-8 bg-black mix-blend-difference rounded-full pointer-events-none z-[100] items-center justify-center transition-transform"
          animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        />
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-40 p-6 md:p-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
          <Link href="/" className="pointer-events-auto flex items-center gap-2 font-bold tracking-widest text-xs hover:opacity-50 transition-opacity">
            <ArrowLeft size={16} /> <span className="hidden md:inline">CATÁLOGO</span>
          </Link>
          
          <div className="pointer-events-auto flex gap-6 md:gap-8 items-center">
            <a href="#booking" className="hidden md:block text-xs font-bold tracking-widest hover:opacity-50 transition-opacity">
              BOOK NOW
            </a>
            <button onClick={() => setIsCartOpen(true)} className="relative active:scale-95 md:hover:opacity-50 transition-all">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden active:scale-95 transition-transform">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              className="fixed inset-0 bg-[#09090b] text-white z-50 flex flex-col p-6"
            >
              <div className="flex justify-end pt-2 border-b border-white/10 pb-6">
                <button onClick={() => setIsMenuOpen(false)} className="active:scale-90 transition-transform hover:rotate-90 duration-300">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <div className="flex flex-col gap-6 mt-12 px-4">
                {["THE CRAFT", "MENU", "TEAM", "BOOK NOW"].map((item, i) => (
                  <motion.a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    key={item}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="text-5xl md:text-6xl font-black tracking-tighter active:opacity-50 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto px-4 pb-8 flex gap-6">
                <Instagram className="w-8 h-8" />
                <Twitter className="w-8 h-8" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* Section 1: Hero */}
          <section className="relative h-[100svh] w-full flex flex-col justify-end p-6 md:p-12 overflow-hidden bg-black text-white">
            <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
              <img src="/images/demo/barberia/hero.jpg" alt="Hero" className="w-full h-full object-cover opacity-50 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
            </motion.div>
            
            <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start gap-6 pb-12 md:pb-16 border-b border-white/20">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-4 bg-white text-black px-4 py-2 font-bold tracking-widest text-xs">
                <Scissors size={14} /> EST. 2026
              </motion.div>
              <motion.h1 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-8xl md:text-[11rem] font-black leading-[0.8] tracking-tighter w-full"
              >
                FADE <span className="text-stone-500 italic font-serif">&</span> CO.
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col md:flex-row gap-8 justify-between w-full mt-4 md:mt-8"
              >
                <p className="text-sm md:text-xl font-bold tracking-widest max-w-xl text-stone-400">
                  PRECISION CUTS. RAW AESTHETICS. STREET CULTURE. WE SET THE STANDARD FOR MODERN GROOMING.
                </p>
                <a href="#booking" className="bg-white text-black px-8 py-4 md:py-5 font-black text-sm md:text-base tracking-widest hover:bg-stone-300 transition-colors shrink-0 text-center">
                  BOOK APPOINTMENT
                </a>
              </motion.div>
            </div>
          </section>

          {/* Section 2: The Craft (Manifesto) */}
          <section id="the-craft" className="py-24 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-[3/4] overflow-hidden bg-stone-300">
                  <img src="/images/demo/barberia/2.jpg" alt="Craft" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-black text-white p-6 hidden md:flex flex-col justify-between">
                  <Shield size={32} />
                  <span className="font-black tracking-widest text-xl">QUALITY<br/>ASSURED</span>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">THE<br/>CRAFT.</h2>
                <div className="w-16 h-1 bg-black mb-8" />
                <p className="text-lg md:text-xl font-bold text-stone-600 mb-6 leading-relaxed">
                  More than just a haircut. We blend traditional barbering techniques with contemporary streetwear culture to create an experience that goes beyond the chair.
                </p>
                <p className="text-base text-stone-500 font-medium mb-12 leading-relaxed">
                  Every barber at Fade & Co. is rigorously trained in both classic scissors work and modern fading techniques. We don't rush. We don't compromise. We deliver perfection.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-stone-300">
                  <div>
                    <span className="block text-4xl font-black mb-2">15k+</span>
                    <span className="text-xs font-bold tracking-widest text-stone-500">Cuts Delivered</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-black mb-2">4.9</span>
                    <span className="text-xs font-bold tracking-widest text-stone-500">Average Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Menu (Products/Services) */}
          <section id="menu" className="w-full py-24 md:py-32 max-w-[1400px] mx-auto overflow-hidden bg-[#09090b] text-white rounded-[2rem] md:rounded-[4rem]">
            <div className="px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">THE<br />MENU.</h2>
              
              <div className="flex gap-4 text-xs md:text-sm font-bold tracking-widest border-b border-white/20 pb-4 w-full md:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {['ALL', 'SERVICES', 'PRODUCTS', 'MERCH'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`${activeTab === tab ? 'text-white border-b-2 border-white pb-3 -mb-[18px]' : 'text-stone-600 hover:text-white'} transition-all`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 anime-barber-container">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="anime-barber-item opacity-0 group flex flex-col cursor-pointer">
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-900 mb-6">
                      <img src={item.img} alt={item.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.soldOut ? 'opacity-40 grayscale' : ''}`} />
                      <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-[10px] font-bold tracking-widest">{item.category}</div>
                      {item.soldOut && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                          <span className="bg-white text-black px-6 py-2 text-xl font-black tracking-tighter transform -rotate-12">SOLD OUT</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black tracking-tighter group-hover:text-stone-400 transition-colors">{item.name}</h3>
                      <span className="text-xl font-bold">€{item.price}</span>
                    </div>
                    <p className="text-stone-500 text-sm font-medium mb-6">{item.desc}</p>
                    <button 
                      disabled={item.soldOut}
                      className={`w-full py-4 font-black tracking-widest text-sm border transition-colors ${item.soldOut ? 'border-stone-800 text-stone-600' : 'border-white hover:bg-white hover:text-black'}`}
                    >
                      {item.category === 'SERVICES' ? 'BOOK SERVICE' : 'ADD TO CART'}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Section 4: Team / Barbers */}
          <section id="team" className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-stone-300">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">THE TEAM</h2>
              <p className="text-stone-500 font-bold tracking-widest">MASTERS OF THE CRAFT</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {barbers.map((barber, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-stone-300 mb-6 overflow-hidden">
                    <img src={barber.img} alt={barber.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="flex justify-between items-end border-b-2 border-transparent group-hover:border-black pb-4 transition-all">
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter mb-1">{barber.name}</h3>
                      <p className="text-stone-500 text-xs font-bold tracking-widest">{barber.role}</p>
                    </div>
                    <span className="font-mono text-sm font-bold bg-black text-white px-2 py-1">{barber.exp}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Testimonials */}
          <section className="py-24 md:py-32 px-6 md:px-12 bg-black text-white">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">CLIENT<br/>RECORDS.</h2>
                <div className="flex gap-2">
                  <Award size={48} className="text-stone-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((r, i) => (
                  <div key={i} className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex gap-1 mb-6">
                      {[...Array(r.rating)].map((_, s) => <Star key={s} className="w-4 h-4 fill-white" />)}
                    </div>
                    <p className="text-lg md:text-xl font-bold leading-relaxed mb-8">"{r.text}"</p>
                    <span className="text-xs font-black tracking-widest text-stone-500">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: Booking / Info */}
          <section id="booking" className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="bg-white p-8 md:p-12 shadow-2xl border border-stone-200">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">RESERVE A CHAIR</h2>
                <form className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="FIRST NAME" className="border-b-2 border-stone-300 py-4 outline-none focus:border-black text-sm font-bold tracking-widest bg-transparent transition-colors" />
                    <input type="text" placeholder="LAST NAME" className="border-b-2 border-stone-300 py-4 outline-none focus:border-black text-sm font-bold tracking-widest bg-transparent transition-colors" />
                  </div>
                  <input type="email" placeholder="EMAIL ADDRESS" className="border-b-2 border-stone-300 py-4 outline-none focus:border-black text-sm font-bold tracking-widest bg-transparent transition-colors" />
                  <select className="border-b-2 border-stone-300 py-4 outline-none focus:border-black text-sm font-bold tracking-widest bg-transparent transition-colors appearance-none cursor-pointer">
                    <option value="" disabled selected>SELECT SERVICE</option>
                    <option value="fade">CLASSIC FADE - €30</option>
                    <option value="beard">BEARD SCULPT - €25</option>
                    <option value="combo">FADE + BEARD - €50</option>
                  </select>
                  <select className="border-b-2 border-stone-300 py-4 outline-none focus:border-black text-sm font-bold tracking-widest bg-transparent transition-colors appearance-none cursor-pointer">
                    <option value="" disabled selected>SELECT BARBER</option>
                    <option value="marcus">MARCUS</option>
                    <option value="leon">LEON</option>
                    <option value="david">DAVID</option>
                    <option value="any">ANY AVAILABLE</option>
                  </select>
                  <button type="button" className="w-full bg-black text-white py-6 mt-4 font-black tracking-widest text-lg hover:bg-stone-800 transition-colors">
                    CONTINUE TO CALENDAR
                  </button>
                </form>
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">THE<br/>DETAILS.</h2>
                <div className="flex flex-col gap-8 text-sm md:text-base font-bold tracking-widest">
                  <div className="flex items-start gap-6 border-b border-stone-300 pb-8">
                    <MapPin className="w-8 h-8 shrink-0" />
                    <div>
                      <span className="block text-stone-500 mb-2">LOCATION</span>
                      <p className="leading-relaxed">128 URBAN STREET<br/>DOWNTOWN, DISTRICT 9<br/>CITY, CP 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 border-b border-stone-300 pb-8">
                    <Clock className="w-8 h-8 shrink-0" />
                    <div>
                      <span className="block text-stone-500 mb-2">HOURS</span>
                      <p className="leading-relaxed">MON - FRI: 10AM - 8PM<br/>SAT: 10AM - 6PM<br/>SUN: CLOSED (PRIVATE APPTS ONLY)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <Phone className="w-8 h-8 shrink-0" />
                    <div>
                      <span className="block text-stone-500 mb-2">CONTACT</span>
                      <p className="leading-relaxed">+1 (555) 123-4567<br/>HELLO@FADEANDCO.COM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#09090b] text-white pt-24 md:pt-32 pb-12 px-6 md:px-12 border-t-[8px] border-stone-300">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="w-full md:w-auto">
              <h2 className="text-7xl md:text-[8rem] font-black tracking-tighter leading-[0.8] mb-8">
                FADE<br />& CO.
              </h2>
              <p className="text-stone-400 font-bold tracking-widest max-w-sm mb-8">THE PREMIER DESTINATION FOR MODERN GROOMING AND STREET CULTURE.</p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12 md:gap-24 text-sm font-bold tracking-widest">
              <div className="flex flex-col gap-4">
                <h4 className="text-stone-500 mb-2">NAVIGATE</h4>
                <a href="#the-craft" className="hover:text-stone-300 transition-colors">THE CRAFT</a>
                <a href="#menu" className="hover:text-stone-300 transition-colors">MENU</a>
                <a href="#team" className="hover:text-stone-300 transition-colors">TEAM</a>
                <a href="#booking" className="hover:text-stone-300 transition-colors">BOOK NOW</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-stone-500 mb-2">LEGAL</h4>
                <a href="#" className="hover:text-stone-300 transition-colors">TERMS OF SERVICE</a>
                <a href="#" className="hover:text-stone-300 transition-colors">PRIVACY POLICY</a>
                <a href="#" className="hover:text-stone-300 transition-colors">CANCELLATION</a>
              </div>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold tracking-widest text-stone-500 border-t border-white/10 pt-8 gap-4">
            <p>© 2026 FADE & CO. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED FOR THE BOLD.</p>
          </div>
        </footer>

        {/* Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white text-black z-[160] flex flex-col shadow-2xl"
              >
                <div className="p-6 md:p-8 border-b border-stone-200 flex justify-between items-center bg-white sticky top-0 z-10">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter">CART / BOOKING</h3>
                  <button onClick={() => setIsCartOpen(false)} className="active:scale-90 hover:rotate-90 transition-transform">
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8">
                  {cart.length === 0 ? (
                    <div className="text-center text-stone-400 mt-20">
                      <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="font-black text-xl tracking-tighter">CART IS EMPTY</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-4 border-b border-stone-200 pb-6 group">
                        <div className="w-24 h-32 bg-stone-100 shrink-0 border border-stone-200">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-lg font-black tracking-tighter">{item.name}</h4>
                              <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-black transition-colors"><X size={16} /></button>
                            </div>
                            <span className="text-[10px] font-bold tracking-widest text-white bg-black px-2 py-1">{item.type}</span>
                            {item.detail && <p className="text-xs font-bold tracking-widest text-stone-500 mt-2">{item.detail}</p>}
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-lg font-black">€{item.price}</span>
                            {item.qty && <span className="text-xs font-bold text-stone-500">QTY: {item.qty}</span>}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 md:p-8 bg-stone-100 border-t border-stone-200 sticky bottom-0">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-sm font-bold tracking-widest text-stone-500">ESTIMATED TOTAL</span>
                      <span className="text-2xl font-black">€{cartTotal}</span>
                    </div>
                    <button className="w-full bg-black text-white py-5 text-lg font-black tracking-widest active:scale-[0.98] hover:bg-stone-800 transition-colors flex justify-center items-center gap-2">
                      CHECKOUT <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DemoLayout>
  )
}
