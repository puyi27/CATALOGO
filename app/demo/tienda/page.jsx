"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  ShoppingCart, X, ArrowLeft, ArrowRight, Zap, Target, Shield, 
  Globe, Star, Package, Truck, RotateCcw, Menu, ChevronDown, 
  Activity, Fingerprint, Eye, Lock
, Instagram, Twitter, Facebook} from 'lucide-react';
import DemoLayout from "@/components/DemoLayout";

const products = [
  { id: 1, name: "HEAVYWEIGHT TEE", color: "BLACK / ONYX", price: "€55", status: "NEW", img: "/images/demo/tienda/1.jpg", sizes: ["S","M","L","XL"], specs: "400GSM ORGANIC COTTON. DOUBLE STITCHED." },
  { id: 2, name: "CARGO PANTS", color: "NIGHT SHADOW", price: "€120", status: null, img: "/images/demo/tienda/2.jpg", sizes: ["28","30","32","34","36"], specs: "RIPSTOP NYLON. 8 STRATEGIC POCKETS. WATER REPELLENT." },
  { id: 3, name: "TACTICAL VEST", color: "GRAPHITE", price: "€85", status: "SOLD OUT", img: "/images/demo/tienda/3.jpg", sizes: [], specs: "KEVLAR BLEND. MODULAR ATTACHMENT SYSTEM." },
  { id: 4, name: "FIELD HOODIE", color: "VOID BLACK", price: "€95", status: "NEW", img: "/images/demo/tienda/4.jpg", sizes: ["S","M","L","XL","XXL"], specs: "500GSM FRENCH TERRY. OVERSIZED FIT. HIDDEN ZIP POCKET." },
  { id: 5, name: "STEALTH CAP", color: "PHANTOM", price: "€38", status: null, img: "/images/demo/tienda/5.jpg", sizes: ["ONE SIZE"], specs: "5-PANEL CONSTRUCTION. WATERPROOF BREATHABLE MESH." },
  { id: 6, name: "UTILITY BAG", color: "ASH", price: "€65", status: "LOW STOCK", img: "/images/demo/tienda/6.jpg", sizes: ["ONE SIZE"], specs: "CORDURA 1000D. FIDLOCK MAGNETIC BUCKLES." },
];

const reviews = [
  { name: "AGENT_KAI", text: "THE HEAVYWEIGHT TEE IS BUILT DIFFERENT. 400GSM FEELS LIKE ARMOR. SECOND ORDER INCOMING.", rating: 5, date: "24.10.2025" },
  { name: "NULL_GHOST", text: "CARGO PANTS FIT PERFECTLY. EVERY POCKET HAS A PURPOSE. THIS IS WHAT UTILITY LOOKS LIKE.", rating: 5, date: "12.09.2025" },
  { name: "SIGNAL_VOID", text: "FIELD HOODIE IS INDESTRUCTIBLE. WORE IT THROUGH RAIN, WIND, CONCRETE. STILL PERFECT.", rating: 5, date: "03.11.2025" },
  { name: "NEO_PUNK", text: "SHIPPING WAS FAST. PACKAGING IS CRAZY SECURE. QUALITY EXCEEDS THE PRICE POINT.", rating: 4, date: "15.12.2025" },
];

const lookbook = [
  "/images/demo/tienda/1.jpg",
  "/images/demo/tienda/2.jpg",
  "/images/demo/tienda/3.jpg",
  "/images/demo/tienda/4.jpg",
  "/images/demo/tienda/5.jpg",
  "/images/demo/tienda/6.jpg"
];

export default function ObsidianApparel() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const addToCart = (product, size) => {
    setCart(prev => [...prev, { ...product, selectedSize: size, cartId: Math.random() }]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((total, item) => total + parseInt(item.price.replace('€', '')), 0);

  const filteredProducts = activeTab === 'ALL' ? products : products.filter(p => p.status === activeTab);

  return (
    <DemoLayout title="Tienda Dystopia">
    <div className="text-white font-sans uppercase selection:bg-[#00FF00] selection:text-black md:cursor-none bg-[#050505] min-h-screen">
      
      {/* CUSTOM CURSOR */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-6 h-6 border border-[#00FF00] pointer-events-none z-[150] mix-blend-difference items-center justify-center transition-transform"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <div className="w-[2px] h-[2px] bg-[#00FF00]" />
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden border-l-4 border-[#00FF00]">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-4"><X className="w-8 h-8 text-[#00FF00]" /></button>
            <nav className="flex flex-col gap-8 text-center w-full px-6">
              {["Inventory", "Lookbook", "Manifesto", "Logs"].map((item, i) => (
                <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                  className="text-5xl font-black tracking-tighter border-b border-white/10 pb-4 w-full" onClick={() => { setMenuOpen(false); }}
                  href={`#${item.toLowerCase()}`}>{item}</motion.a>
              ))}
              <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} 
                onClick={() => { setMenuOpen(false); setIsCartOpen(true); }} className="text-xl font-bold tracking-widest text-[#00FF00] mt-8 flex items-center justify-center gap-3">
                SECURE CART [{cart.length}] <ShoppingCart size={20} />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[90] mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold tracking-widest hover:text-[#00FF00] transition-colors">
            <ArrowLeft size={16} /><span className="hidden md:inline">SYSTEM.EXIT</span>
          </Link>
        </div>
        <div className="text-2xl md:text-4xl font-black tracking-tighter pointer-events-auto">OBSIDIAN</div>
        <div className="flex items-center gap-6 pointer-events-auto">
          <button onClick={() => setIsCartOpen(true)} className="md:hover:text-[#00FF00] transition-colors flex items-center gap-2 font-bold tracking-widest text-xs group relative">
            <span className="hidden md:inline">CART</span> <ShoppingCart size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[#00FF00] text-black w-4 h-4 text-[10px] flex items-center justify-center font-black rounded-full">{cart.length}</span>}
          </button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={24} /></button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative h-[100svh] w-full flex flex-col justify-end overflow-hidden pt-24 border-b border-white/10">
        <motion.div style={{ opacity: opacityHero }} className="absolute inset-0 z-0">
           <img src="/images/demo/tienda/hero.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(0,255,0,0.15)_0%,_transparent_60%)] mix-blend-screen" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
           {/* Grid overlay */}
           <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </motion.div>
        
        <div className="relative z-10 px-6 md:px-12 pb-24 md:pb-32 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-[#00FF00] animate-pulse rounded-full" />
              <span className="text-xs font-bold tracking-[0.3em] text-[#00FF00]">SEASON 26 LAUNCH</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-[clamp(4rem,12vw,12rem)] font-black tracking-tighter leading-[0.8] mb-6 drop-shadow-2xl">
              OBSIDIAN<br/><span className="text-transparent" style={{ WebkitTextStroke: "2px #00FF00" }}>CORE</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-zinc-400 font-bold tracking-widest text-sm md:text-base max-w-xl leading-relaxed">
              FORGED IN THE STREETS. ENGINEERED FOR THE FUTURE. TACTICAL UTILITY MEETS URBAN AESTHETICS. LIMITED PRODUCTION RUN.
            </motion.p>
          </div>
          <motion.a initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
            href="#inventory" className="flex items-center justify-center bg-[#00FF00] text-black w-32 h-32 md:w-40 md:h-40 rounded-full font-black tracking-tighter text-lg md:text-xl hover:scale-105 hover:bg-white transition-all">
            ACCESS<br/>DROP
          </motion.a>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-[#00FF00]/30 py-4 bg-black/80 backdrop-blur-md z-20">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex whitespace-nowrap text-[#00FF00] font-black text-4xl md:text-6xl tracking-tighter" >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="pr-8 flex items-center gap-8">NEW COLLECTION DROP <Zap size={32} /> SYSTEM ONLINE <Zap size={32} /></span>
            ))}
          </motion.div>
        </div>
      </header>

      <main>
        {/* INVENTORY */}
        <section id="inventory" className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">INVENTORY</h2>
              <p className="text-zinc-500 font-bold tracking-widest text-sm flex items-center gap-2"><Fingerprint size={16} /> SECURE DATABASE // 6 FILES FOUND</p>
            </div>
            <div className="flex gap-4 text-xs font-bold tracking-widest bg-zinc-900 p-2 border border-white/10 overflow-x-auto w-full md:w-auto">
              {['ALL', 'NEW', 'LOW STOCK'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-[#00FF00] text-black' : 'text-zinc-500 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, i) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }} className={`group cursor-pointer flex flex-col bg-zinc-900/50 border border-white/5 hover:border-[#00FF00]/50 p-4 transition-colors ${p.status === 'SOLD OUT' ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                  onClick={() => p.status !== 'SOLD OUT' && setSelectedProduct(p)}>
                  
                  <div className="relative aspect-[4/5] overflow-hidden bg-black mb-6">
                    <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    
                    {p.status && (
                      <div className={`absolute top-4 left-4 text-[10px] font-black px-3 py-1.5 tracking-widest z-10 ${
                        p.status === 'SOLD OUT' ? 'bg-red-600 text-white' :
                        p.status === 'LOW STOCK' ? 'bg-amber-500 text-black' :
                        'bg-[#00FF00] text-black'
                      }`}>{p.status}</div>
                    )}
                    
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#00FF00] font-mono text-[10px] tracking-widest mb-1">ID: OBS-{p.id}00</p>
                      <h3 className="text-xl md:text-2xl font-black tracking-tighter mb-1">{p.name}</h3>
                      <p className="text-zinc-500 text-xs font-bold tracking-widest">{p.color}</p>
                    </div>
                    <div className="text-xl md:text-2xl font-black">{p.price}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* TECHNICAL SPECS */}
        <section className="py-24 md:py-32 bg-zinc-950 border-y border-[#00FF00]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/demo/tienda/2.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent"></div>
          
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-[#00FF00]">TECHNICAL PROWESS</h2>
              <p className="text-zinc-400 font-bold text-lg leading-relaxed mb-8 max-w-xl">Every garment in the OBSIDIAN lineup is rigorously tested for durability, weather resistance, and urban functionality.</p>
              
              <div className="space-y-6">
                {[
                  { title: "WEATHER RESISTANCE", desc: "DWR coatings and waterproof zips protect against unpredictable climates.", val: "98%" },
                  { title: "TENSILE STRENGTH", desc: "Military-grade stitching and ripstop fabrics prevent tearing.", val: "1000D" },
                  { title: "THERMAL REGULATION", desc: "Breathable meshes and heavy-weight cottons adapt to body heat.", val: "400GSM" }
                ].map((spec, i) => (
                  <div key={i} className="border-l-2 border-[#00FF00] pl-6 py-2">
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-xl font-black tracking-widest">{spec.title}</h4>
                      <span className="text-[#00FF00] font-mono font-bold">{spec.val}</span>
                    </div>
                    <p className="text-zinc-500 text-sm font-bold tracking-widest">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-zinc-900 border border-white/10 p-6 flex flex-col justify-between">
                <Shield className="w-10 h-10 text-zinc-600" />
                <div className="text-2xl font-black tracking-tighter">KEVLAR<br/>BLEND</div>
              </div>
              <div className="aspect-square bg-[#00FF00] text-black p-6 flex flex-col justify-between">
                <Activity className="w-10 h-10" />
                <div className="text-2xl font-black tracking-tighter">OPTIMIZED<br/>MOBILITY</div>
              </div>
              <div className="aspect-square bg-zinc-900 border border-white/10 p-6 flex flex-col justify-between">
                <Lock className="w-10 h-10 text-zinc-600" />
                <div className="text-2xl font-black tracking-tighter">MAGNETIC<br/>BUCKLES</div>
              </div>
              <div className="aspect-square bg-white text-black p-6 flex flex-col justify-between">
                <Zap className="w-10 h-10" />
                <div className="text-2xl font-black tracking-tighter">RAPID<br/>DEPLOY</div>
              </div>
            </div>
          </div>
        </section>

        {/* LOOKBOOK (MASONRY) */}
        <section id="lookbook" className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4">LOOKBOOK</h2>
            <p className="text-zinc-500 font-bold tracking-widest text-sm uppercase">Field Testing // Urban Environment</p>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {lookbook.map((img, i) => (
              <div key={i} className="break-inside-avoid relative group overflow-hidden border border-white/10">
                <img src={img} alt="Lookbook" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-[#00FF00]/0 group-hover:bg-[#00FF00]/10 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 bg-black px-3 py-1 font-mono text-[10px] text-[#00FF00] opacity-0 group-hover:opacity-100 transition-opacity">
                  FILE_{i+1}.JPG
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="manifesto" className="py-24 md:py-32 border-y border-white/10 bg-black relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-white/[0.02] pointer-events-none whitespace-nowrap">OBSIDIAN</div>
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
            {[
              { icon: Target, title: "LIMITED PRODUCTION", desc: "Each garment is produced in runs of 50 units maximum. No restocks. No exceptions." },
              { icon: Shield, title: "TACTICAL UTILITY", desc: "Engineered for the urban battlefield. Military-grade materials meet functional design." },
              { icon: Globe, title: "GLOBAL SYNDICATE", desc: "A worldwide network of individuals who refuse to conform to the masses." },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center bg-zinc-950 p-8 border border-white/5 hover:border-[#00FF00]/30 transition-colors">
                <v.icon className="text-[#00FF00] mb-8 w-12 h-12" />
                <h3 className="text-2xl font-black tracking-widest mb-4">{v.title}</h3>
                <p className="text-zinc-400 text-sm font-bold tracking-widest leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SURVEILLANCE LOGS */}
        <section id="logs" className="py-24 md:py-32 bg-[#050505]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter border-l-4 border-[#00FF00] pl-6">SURVEILLANCE LOGS<br/><span className="text-xl text-zinc-500 block mt-2 tracking-widest">USER FEEDBACK NETWORK</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-8 border border-zinc-800 bg-black flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`w-4 h-4 ${s < r.rating ? 'fill-[#00FF00] text-[#00FF00]' : 'text-zinc-800'}`} />)}
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600">{r.date}</span>
                    </div>
                    <p className="text-sm font-bold tracking-wide leading-loose mb-8 text-zinc-300">"{r.text}"</p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                    <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center">
                      <UserIcon />
                    </div>
                    <span className="text-[#00FF00] font-black tracking-widest text-xs">{r.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SHIPPING INFO */}
        <section className="py-16 bg-zinc-900 border-y border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 text-center md:text-left">
            {[
              { icon: Truck, title: "EXPRESS GLOBAL SHIPPING", desc: "FREE ON ORDERS OVER €150" },
              { icon: RotateCcw, title: "14-DAY RETURNS", desc: "HASSLE-FREE PROCESS" },
              { icon: Package, title: "SECURE PACKAGING", desc: "ANONYMOUS & PROTECTED" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
                <s.icon className="w-8 h-8 text-[#00FF00]" />
                <div>
                  <h3 className="text-sm font-black tracking-widest mb-1">{s.title}</h3>
                  <p className="text-xs font-bold tracking-widest text-zinc-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SYNDICATE / NEWSLETTER */}
        <section className="py-32 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/demo/tienda/6.jpg" alt="Background" className="w-full h-full object-cover opacity-30 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto bg-black/60 p-8 md:p-16 backdrop-blur-md border border-white/10">
            <Shield className="w-16 h-16 text-[#00FF00] mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">JOIN THE SYNDICATE</h2>
            <p className="text-sm md:text-base font-bold tracking-widest mb-10 text-zinc-400 leading-relaxed">ENTER THE MAINFRAME. GAIN EARLY ACCESS TO CLASSIFIED DROPS AND RESTRICTED ARCHIVES. NO SPAM, JUST COMMS.</p>
            
            <div className="flex flex-col sm:flex-row gap-0 border-2 border-zinc-700 focus-within:border-[#00FF00] transition-colors bg-black">
              <input type="email" placeholder="ENTER ENCRYPTED EMAIL" className="bg-transparent px-6 py-5 outline-none w-full font-bold tracking-widest text-xs sm:text-sm text-center sm:text-left placeholder:text-zinc-600" />
              <button className="bg-zinc-800 text-white px-8 py-5 font-black tracking-widest text-sm hover:bg-[#00FF00] hover:text-black transition-colors shrink-0">INITIALIZE</button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#050505] pt-24 pb-12 px-6 md:px-12 uppercase tracking-widest text-xs font-bold border-t-2 border-[#00FF00]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20 text-center md:text-left">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-none">OBSIDIAN</h2>
            <p className="text-zinc-500 max-w-sm leading-relaxed mb-6">FORGED IN THE STREETS.<br/>ENGINEERED FOR THE FUTURE.<br/>NO COMPROMISE.</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#00FF00] transition-colors cursor-pointer"><Instagram size={18} /></div>
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#00FF00] transition-colors cursor-pointer"><Twitter size={18} /></div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-6 text-zinc-400 items-center md:items-start">
            <h4 className="text-white font-black mb-2">DIRECTORY</h4>
            <a href="#" className="hover:text-[#00FF00] transition-colors">ALL GEAR</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">RESTRICTED ARCHIVE</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">SYNDICATE LOGIN</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">COMMS / CONTACT</a>
          </div>
          
          <div className="flex flex-col space-y-6 text-zinc-400 items-center md:items-start">
            <h4 className="text-white font-black mb-2">LEGAL</h4>
            <a href="#" className="hover:text-[#00FF00] transition-colors">SHIPPING POLICY</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">RETURNS / EXCHANGES</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">PRIVACY POLICY</a>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center text-zinc-600 border-t border-white/10 pt-8 gap-4 text-center text-[10px]">
          <p>© 2026 OBSIDIAN APPAREL.</p>
          <div className="flex items-center gap-2 text-[#00FF00]">
            <Lock size={12} /> SECURE CONNECTION ESTABLISHED
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[130]" />
            <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#050505] z-[140] overflow-y-auto border-l border-[#00FF00]/30 shadow-[-20px_0_50px_rgba(0,255,0,0.05)]">
              
              <div className="sticky top-0 z-10 flex justify-end p-6 pointer-events-none">
                <button onClick={() => setSelectedProduct(null)} className="pointer-events-auto bg-black border border-white/20 p-3 hover:border-[#00FF00] hover:text-[#00FF00] transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="px-8 pb-12 -mt-16">
                <div className="aspect-[4/5] bg-black mb-8 relative border border-white/10">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/80 font-mono text-xs text-[#00FF00] px-3 py-1 border border-[#00FF00]/30">
                    STATUS: {selectedProduct.status || 'AVAILABLE'}
                  </div>
                </div>

                <h2 className="text-4xl font-black tracking-tighter mb-2">{selectedProduct.name}</h2>
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                  <p className="text-zinc-400 font-bold tracking-widest text-sm">{selectedProduct.color}</p>
                  <span className="text-3xl font-black text-[#00FF00]">{selectedProduct.price}</span>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-black tracking-widest mb-4">TECHNICAL SPECS</h4>
                  <p className="text-zinc-400 font-bold leading-relaxed tracking-wide text-sm bg-zinc-900 p-4 border-l-2 border-[#00FF00]">
                    {selectedProduct.specs}
                  </p>
                </div>

                {selectedProduct.sizes.length > 0 ? (
                  <div className="mb-10">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm font-black tracking-widest">SELECT SIZE</span>
                      <span className="text-xs text-zinc-500 underline underline-offset-4 cursor-pointer hover:text-white transition-colors">SIZE GUIDE</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedProduct.sizes.map(s => (
                        <button key={s} onClick={() => addToCart(selectedProduct, s)}
                          className="py-4 border border-zinc-700 text-sm font-bold tracking-widest hover:border-[#00FF00] hover:bg-[#00FF00]/5 transition-colors">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-10 p-6 border border-red-500/30 bg-red-500/5 text-center">
                    <span className="text-red-500 font-black tracking-widest">CURRENTLY UNAVAILABLE</span>
                  </div>
                )}
                
                <div className="space-y-4 text-xs font-bold tracking-widest text-zinc-500 bg-black p-6 border border-white/5">
                  <div className="flex items-center gap-3"><Truck className="w-4 h-4 text-white" /> DISPATCHES WITHIN 48 HOURS</div>
                  <div className="flex items-center gap-3"><RotateCcw className="w-4 h-4 text-white" /> 14-DAY RETURN POLICY</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-xl flex justify-end">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-[100svh] bg-[#050505] border-l-2 border-[#00FF00] flex flex-col uppercase font-bold tracking-widest relative">
              
              <div className="flex justify-between items-center p-8 border-b border-white/10 bg-black">
                <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3">SECURE CART <span className="bg-[#00FF00] text-black w-6 h-6 flex items-center justify-center text-sm rounded-full">{cart.length}</span></h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-[#00FF00] transition-colors"><X size={28} /></button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-8 text-center gap-6">
                  <ShoppingCart size={64} className="opacity-20" />
                  <div>
                    <p className="text-xl font-black tracking-tighter mb-2 text-zinc-400">CART IS EMPTY</p>
                    <p className="text-xs tracking-widest">YOUR LOADOUT IS CURRENTLY CLEAR.</p>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="border border-zinc-700 px-8 py-4 text-sm hover:border-white hover:text-white transition-colors">RETURN TO ARMORY</button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex gap-4 border border-zinc-800 bg-black p-4">
                      <div className="w-20 h-24 bg-zinc-900 shrink-0 border border-white/5">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-black tracking-tight">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.cartId)} className="text-zinc-600 hover:text-red-500 transition-colors"><X size={16} /></button>
                          </div>
                          <p className="text-[10px] text-zinc-500 mb-1">{item.color}</p>
                          <p className="text-[10px] text-[#00FF00]">SIZE: {item.selectedSize}</p>
                        </div>
                        <span className="text-base font-black">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="border-t border-white/10 p-8 bg-black">
                  <div className="flex justify-between text-sm font-black mb-2 text-zinc-400">
                    <span>SHIPPING</span>
                    <span>CALCULATED AT CHECKOUT</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black mb-8">
                    <span>SUBTOTAL</span>
                    <span className="text-[#00FF00]">€{cartTotal}</span>
                  </div>
                  <button className="w-full bg-[#00FF00] text-black py-5 font-black text-xl tracking-tighter group flex items-center justify-center gap-3 active:scale-[0.98] hover:bg-white transition-colors"
                    onClick={() => { setIsCartOpen(false); setCart([]); }}>
                    PROCEED TO CHECKOUT <ArrowRight className="group-hover:translate-x-2 transition-transform w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </DemoLayout>
  );
}

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
