"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, X, ArrowLeft, ArrowRight, Zap, Target, Shield, Globe, Star, Package, Truck, RotateCcw, Menu } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const products = [
  { id: 1, name: "HEAVYWEIGHT TEE", color: "BLACK / ONYX", price: "€55", status: "NEW", gradient: "from-zinc-800 to-zinc-950", sizes: ["S","M","L","XL"] },
  { id: 2, name: "CARGO PANTS", color: "NIGHT SHADOW", price: "€120", status: null, gradient: "from-zinc-900 to-black", sizes: ["28","30","32","34","36"] },
  { id: 3, name: "TACTICAL VEST", color: "GRAPHITE", price: "€85", status: "SOLD OUT", gradient: "from-zinc-700 to-zinc-900", sizes: [] },
  { id: 4, name: "FIELD HOODIE", color: "VOID BLACK", price: "€95", status: "NEW", gradient: "from-zinc-800 to-black", sizes: ["S","M","L","XL","XXL"] },
  { id: 5, name: "STEALTH CAP", color: "PHANTOM", price: "€38", status: null, gradient: "from-zinc-850 to-zinc-950", sizes: ["ONE SIZE"] },
  { id: 6, name: "UTILITY BAG", color: "ASH", price: "€65", status: "LOW STOCK", gradient: "from-zinc-700 to-zinc-800", sizes: ["ONE SIZE"] },
];

const reviews = [
  { name: "AGENT_KAI", text: "THE HEAVYWEIGHT TEE IS BUILT DIFFERENT. 400GSM FEELS LIKE ARMOR. SECOND ORDER INCOMING.", rating: 5 },
  { name: "NULL_GHOST", text: "CARGO PANTS FIT PERFECTLY. EVERY POCKET HAS A PURPOSE. THIS IS WHAT UTILITY LOOKS LIKE.", rating: 5 },
  { name: "SIGNAL_VOID", text: "FIELD HOODIE IS INDESTRUCTIBLE. WORE IT THROUGH RAIN, WIND, CONCRETE. STILL PERFECT.", rating: 5 },
];

export default function ObsidianApparel() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <DemoLayout title="Tienda Dystopia">
    <div className="text-white font-sans uppercase selection:bg-[#00FF00] selection:text-black md:cursor-none overflow-x-hidden bg-black">
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-6 h-6 border-2 border-[#00FF00] rounded-full pointer-events-none z-[100] mix-blend-difference items-center justify-center"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <div className="w-1 h-1 bg-[#00FF00] rounded-full" />
      </motion.div>

      {/* ═══ MOBILE MENU ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black flex flex-col justify-center items-center md:hidden">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6 text-[#00FF00]" /></button>
            <nav className="flex flex-col gap-6 text-center">
              {["Inventory", "Manifesto", "Syndicate", "Cart"].map((item, i) => (
                <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                  className="text-4xl font-black tracking-tighter" onClick={() => { setMenuOpen(false); if (item === 'Cart') setIsCartOpen(true); }}
                  href={item === 'Cart' ? undefined : `#${item.toLowerCase()}`}>{item}</motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto opacity-0">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold tracking-widest">
            <ArrowLeft size={16} /><span className="hidden md:inline">CATÁLOGO</span>
          </Link>
        </div>
        <div className="text-xl md:text-3xl font-black tracking-tighter pointer-events-auto">OBSIDIAN</div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <button onClick={() => setIsCartOpen(true)} className="md:hover:text-[#00FF00] transition-colors flex items-center gap-2 font-bold tracking-widest text-xs group">
            <span className="hidden md:inline">CART</span> <ShoppingCart size={18} />
          </button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu size={18} /></button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <header className="relative h-[100svh] w-full flex flex-col justify-end overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_#00FF00_0%,_transparent_50%)] opacity-[0.03]" />
           <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 px-4 md:px-8 pb-24 md:pb-32 max-w-[1400px] mx-auto w-full">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-[clamp(4rem,15vw,10rem)] font-black tracking-tighter leading-[0.85] mb-6">
            OBSIDIAN<br/><span className="text-[#00FF00]">SS26</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-zinc-500 font-bold tracking-widest text-xs md:text-sm max-w-md mb-8">
            FORGED IN THE STREETS. ENGINEERED FOR THE FUTURE. 6 PIECES. LIMITED PRODUCTION. NO RESTOCK.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            href="#inventory" className="inline-block bg-[#00FF00] text-black px-8 py-4 font-black tracking-tighter text-lg hover:bg-white transition-colors active:scale-95">
            SHOP DROP
          </motion.a>
        </div>
        
        <div className="relative z-10 w-full overflow-hidden border-y border-[#00FF00]/30 py-4 md:py-6 bg-black/80 backdrop-blur-md">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex whitespace-nowrap text-[#00FF00] font-black text-6xl md:text-9xl tracking-tighter"
          >
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
          </motion.div>
        </div>
      </header>

      <main>
        {/* ═══ INVENTORY — PRODUCT GRID ═══ */}
        <section id="inventory" className="py-20 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">INVENTORY</h2>
            <p className="text-zinc-500 font-bold tracking-widest text-xs md:text-sm pb-1 md:pb-3">SEASON 26 :: 6 CLASSIFIED ITEMS</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                whileTap={{ scale: 0.96 }}
                className={`group cursor-pointer ${p.status === 'SOLD OUT' ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => p.status !== 'SOLD OUT' && setSelectedProduct(p)}>
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 md:group-hover:border-[#00FF00] transition-colors">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
                  {p.status && (
                    <div className={`absolute top-3 left-3 text-[8px] md:text-[10px] font-black px-2 py-1 tracking-widest ${
                      p.status === 'SOLD OUT' ? 'bg-white/10 text-white/40' :
                      p.status === 'LOW STOCK' ? 'bg-amber-500 text-black' :
                      'bg-[#00FF00] text-black'
                    }`}>{p.status}</div>
                  )}
                  {p.status === 'SOLD OUT' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <span className="border-2 border-white/50 text-white/80 px-4 py-2 text-lg md:text-2xl font-black tracking-widest rotate-[-15deg]">SOLD OUT</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 md:mt-6 flex justify-between items-start font-bold tracking-widest text-[10px] md:text-sm">
                  <div>
                    <h3 className="md:group-hover:text-[#00FF00] transition-colors text-xs md:text-base">{p.name}</h3>
                    <p className="text-zinc-500 mt-0.5 text-[9px] md:text-xs">{p.color}</p>
                  </div>
                  <div className="text-right text-xs md:text-base">{p.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ PRODUCT MODAL ═══ */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-[#050505] z-[101] overflow-y-auto p-6 md:p-10 border-l border-[#00FF00]/20">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6"><X className="w-5 h-5 text-[#00FF00]" /></button>
                <div className={`aspect-[3/4] bg-gradient-to-br ${selectedProduct.gradient} mb-8`} />
                {selectedProduct.status && selectedProduct.status !== 'SOLD OUT' && (
                  <span className="text-[10px] font-black tracking-widest bg-[#00FF00] text-black px-2 py-1">{selectedProduct.status}</span>
                )}
                <h2 className="text-3xl font-black tracking-tighter mt-4">{selectedProduct.name}</h2>
                <p className="text-zinc-500 text-xs tracking-widest mt-1">{selectedProduct.color}</p>
                <span className="text-2xl font-black text-[#00FF00] block mt-4">{selectedProduct.price}</span>
                {selectedProduct.sizes.length > 0 && (
                  <div className="mt-6">
                    <span className="text-[10px] tracking-widest text-zinc-500 block mb-2">SIZE</span>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProduct.sizes.map(s => (
                        <span key={s} className="px-3 py-2 border border-white/10 text-[10px] font-bold tracking-widest hover:border-[#00FF00] hover:text-[#00FF00] cursor-pointer transition-colors">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button className="w-full mt-8 bg-[#00FF00] text-black py-4 font-black tracking-tighter text-lg hover:bg-white transition-colors active:scale-[0.98]">
                  ADD TO CART
                </button>
                <div className="mt-6 space-y-3 text-[10px] tracking-widest text-zinc-500">
                  <div className="flex items-center gap-2"><Truck className="w-3 h-3" /> FREE SHIPPING ON ORDERS €100+</div>
                  <div className="flex items-center gap-2"><RotateCcw className="w-3 h-3" /> 14-DAY RETURNS</div>
                  <div className="flex items-center gap-2"><Package className="w-3 h-3" /> SHIPS IN 2-4 BUSINESS DAYS</div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══ MANIFESTO ═══ */}
        <section id="manifesto" className="py-20 md:py-32 border-y border-white/10 relative overflow-hidden bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center relative z-10">
            {[
              { icon: Target, title: "LIMITED PRODUCTION", desc: "EACH GARMENT IS PRODUCED IN RUNS OF 50 UNITS MAXIMUM. NO RESTOCKS. EVER.", num: "01" },
              { icon: Shield, title: "TACTICAL UTILITY", desc: "ENGINEERED FOR THE URBAN BATTLEFIELD. MILITARY-GRADE MATERIALS. FUNCTIONAL DESIGN.", num: "02" },
              { icon: Globe, title: "GLOBAL SYNDICATE", desc: "A WORLDWIDE NETWORK OF INDIVIDUALS WHO REFUSE TO CONFORM TO THE MASSES.", num: "03" },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center">
                <v.icon className="text-[#00FF00] mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12" />
                <h3 className="text-2xl md:text-4xl font-black tracking-widest mb-3 md:mb-4">{v.title}</h3>
                <p className="text-zinc-500 text-xs md:text-base font-bold tracking-widest leading-loose max-w-xs px-4">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ SURVEILLANCE LOGS / REVIEWS ═══ */}
        <section className="py-20 md:py-32 bg-black border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <h2 className="text-6xl md:text-8xl font-black mb-12 md:mb-20 tracking-tighter text-center">SURVEILLANCE LOGS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 md:p-8 border border-white/10 md:hover:border-[#00FF00]/50 transition-colors bg-[#050505]">
                  <div className="flex mb-4">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-[#00FF00] text-[#00FF00]" />)}
                  </div>
                  <p className="text-sm md:text-base font-bold tracking-wide leading-relaxed mb-6 text-zinc-300">"{r.text}"</p>
                  <div className="text-[#00FF00] font-black tracking-widest text-[10px] md:text-xs">{r.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SHIPPING INFO ═══ */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-[#050505] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Truck, title: "FREE SHIPPING", desc: "ON ORDERS OVER €100" },
              { icon: RotateCcw, title: "14-DAY RETURNS", desc: "NO QUESTIONS ASKED" },
              { icon: Package, title: "SECURE PACKAGING", desc: "MILITARY-GRADE PROTECTION" },
              { icon: Shield, title: "2-YEAR WARRANTY", desc: "ON ALL GARMENTS" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <s.icon className="w-6 h-6 text-[#00FF00]/30 mb-3" />
                <h3 className="text-xs font-black tracking-widest mb-1">{s.title}</h3>
                <p className="text-[10px] tracking-widest text-zinc-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ NEWSLETTER ═══ */}
        <section id="syndicate" className="py-24 md:py-40 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#00FF00_0%,_transparent_50%)] opacity-[0.03]" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 md:mb-8 text-[#00FF00] leading-none">JOIN THE SYNDICATE</h2>
            <p className="text-sm md:text-xl font-bold tracking-widest mb-10 md:mb-12 text-zinc-400 px-2">ENTER THE MAINFRAME FOR EARLY ACCESS TO CLASSIFIED DROPS.</p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center max-w-2xl mx-auto w-full">
              <input type="email" placeholder="ENTER ENCRYPTED EMAIL" className="bg-black/50 border border-white/30 px-6 py-4 md:py-5 outline-none focus:border-[#00FF00] transition-colors w-full font-bold tracking-widest text-center md:text-left text-xs md:text-sm placeholder:text-white/30" />
              <button className="bg-[#00FF00] text-black px-12 py-4 md:py-5 font-black tracking-tighter text-lg md:text-xl md:hover:bg-white transition-colors shrink-0 active:scale-95">INITIALIZE</button>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#00FF00]/30 bg-[#050505] pt-16 md:pt-24 pb-8 md:pb-12 px-4 md:px-6 uppercase tracking-widest text-[10px] md:text-xs font-bold">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-24 text-center md:text-left">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 text-white">OBSIDIAN</h2>
            <p className="text-zinc-500 max-w-sm leading-relaxed md:leading-loose">FORGED IN THE STREETS. ENGINEERED FOR THE FUTURE. NO COMPROMISE. NO SURRENDER.</p>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-6 text-zinc-400 items-center md:items-start">
            <a href="#" className="md:hover:text-[#00FF00] transition-colors">SHOP ALL</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors">ARCHIVE CLASSIFIED</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors">SYNDICATE MANIFESTO</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors">COMMS DIRECT</a>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-6 text-zinc-400 items-center md:items-start">
            <a href="#" className="md:hover:text-[#00FF00] transition-colors">INSTAGRAM</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors">TWITTER</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors">DISCORD</a>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-zinc-600 border-t border-white/10 pt-6 md:pt-8 gap-4 text-center">
          <p>© 2026 OBSIDIAN APPAREL</p>
          <p>ALL RIGHTS RESERVED :: SECURE CONNECTION</p>
        </div>
      </footer>

      {/* ═══ CART DRAWER ═══ */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex justify-end">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-lg h-[100svh] bg-[#050505] md:border-l border-[#00FF00]/30 p-6 md:p-8 flex flex-col uppercase font-bold tracking-widest relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF00] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8 relative z-10 pt-4 md:pt-0">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter">SECURE CART (0)</h2>
                <button onClick={() => setIsCartOpen(false)} className="active:scale-90 md:hover:text-[#00FF00] transition-colors p-2 -mr-2">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 space-y-4 relative z-10">
                <ShoppingCart size={64} className="opacity-10" />
                <p className="text-lg font-black tracking-tighter">CART IS EMPTY</p>
                <p className="text-[10px] tracking-widest text-center">LOAD UP BEFORE THE DROP ENDS</p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6 space-y-6 relative z-10 pb-6 md:pb-0">
                <div className="flex justify-between text-lg font-black">
                  <span>SUBTOTAL</span>
                  <span className="text-[#00FF00]">€0.00</span>
                </div>
                <button className="w-full bg-[#00FF00] text-black py-4 font-black text-xl tracking-tighter group flex items-center justify-center gap-3 active:scale-[0.98] hover:bg-white transition-colors"
                  onClick={() => setIsCartOpen(false)}>
                  CHECKOUT <ArrowRight className="group-hover:translate-x-2 transition-transform w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </DemoLayout>
  );
}
