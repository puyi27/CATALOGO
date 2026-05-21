"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, X, ArrowLeft, ArrowRight, Zap, Target, Shield, Globe } from "lucide-react";

export default function ObsidianApparel() {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans uppercase selection:bg-[#00FF00] selection:text-black md:cursor-none overflow-x-hidden">
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-6 h-6 border-2 border-[#00FF00] rounded-full pointer-events-none z-[100] mix-blend-difference items-center justify-center"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <div className="w-1 h-1 bg-[#00FF00] rounded-full" />
      </motion.div>

      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 md:hover:text-[#00FF00] transition-colors uppercase font-bold tracking-widest text-xs md:text-sm bg-black/20 p-2 md:p-3 rounded-lg backdrop-blur-sm active:scale-95">
          <ArrowLeft size={16} /> <span className="hidden md:inline">CATÁLOGO</span>
        </Link>
        <div className="text-xl md:text-3xl font-black tracking-tighter pointer-events-auto">OBSIDIAN</div>
        <button onClick={() => setIsCartOpen(true)} className="pointer-events-auto md:hover:text-[#00FF00] transition-colors flex items-center gap-2 md:gap-3 font-bold tracking-widest text-xs md:text-sm group bg-black/20 p-2 md:p-3 rounded-lg backdrop-blur-sm active:scale-95">
          <span className="hidden md:inline">CART</span> <ShoppingCart size={18} className="md:group-hover:scale-110 transition-transform" />
        </button>
      </nav>

      <header className="relative h-[100svh] w-full flex flex-col justify-end overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
           <img src="https://loremflickr.com/1920/1080/streetwear,fashion?lock=101" alt="Hero" className="w-full h-full object-cover opacity-60 grayscale md:hover:grayscale-0 transition-all duration-1000 scale-105 md:hover:scale-100" />
           <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 w-full overflow-hidden border-y border-[#00FF00]/30 py-4 md:py-6 bg-black/80 backdrop-blur-md">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex whitespace-nowrap text-[#00FF00] font-black text-[clamp(2.5rem,6vw,6rem)] md:text-8xl tracking-tighter"
          >
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
            <span className="pr-8 md:pr-12">NEW COLLECTION DROP :: OBSIDIAN SS26 ::</span>
          </motion.div>
        </div>
      </header>

      <main>
        <section className="py-20 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
            <h2 className="text-[clamp(3rem,8vw,6rem)] md:text-8xl font-black tracking-tighter leading-none">INVENTORY</h2>
            <p className="text-zinc-500 font-bold tracking-widest text-xs md:text-sm pb-1 md:pb-3">SEASON 26 :: CLASSIFIED GEAR</p>
          </div>
          
          <motion.div 
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            <motion.div whileTap={{ scale: 0.96 }} className="group cursor-pointer min-w-[85vw] md:min-w-0 snap-center shrink-0">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 md:group-hover:border-[#00FF00] transition-colors rounded-lg md:rounded-none">
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=102" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 md:group-hover:opacity-0 grayscale" alt="Heavyweight Tee 1" />
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=103" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 md:group-hover:opacity-100 grayscale md:group-hover:grayscale-0 scale-110 md:group-hover:scale-100" alt="Heavyweight Tee 2" />
                <div className="absolute top-4 left-4 bg-[#00FF00] text-black text-[10px] md:text-xs font-black px-2 py-1 tracking-widest rounded-sm md:rounded-none">NEW</div>
              </div>
              <div className="mt-4 md:mt-6 flex justify-between items-start font-bold uppercase tracking-widest text-xs md:text-sm px-1 md:px-0">
                <div>
                  <h3 className="md:group-hover:text-[#00FF00] transition-colors text-base md:text-lg">HEAVYWEIGHT TEE</h3>
                  <p className="text-zinc-500 mt-1 text-[10px] md:text-xs">BLACK / ONYX</p>
                </div>
                <div className="text-right text-base md:text-lg">€55</div>
              </div>
            </motion.div>

            <motion.div whileTap={{ scale: 0.96 }} className="group cursor-pointer min-w-[85vw] md:min-w-0 snap-center shrink-0">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 md:group-hover:border-[#00FF00] transition-colors rounded-lg md:rounded-none">
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=104" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 md:group-hover:opacity-0 grayscale" alt="Cargo Pants 1" />
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=105" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 md:group-hover:opacity-100 grayscale md:group-hover:grayscale-0 scale-110 md:group-hover:scale-100" alt="Cargo Pants 2" />
              </div>
              <div className="mt-4 md:mt-6 flex justify-between items-start font-bold uppercase tracking-widest text-xs md:text-sm px-1 md:px-0">
                <div>
                  <h3 className="md:group-hover:text-[#00FF00] transition-colors text-base md:text-lg">CARGO PANTS</h3>
                  <p className="text-zinc-500 mt-1 text-[10px] md:text-xs">NIGHT SHADOW</p>
                </div>
                <div className="text-right text-base md:text-lg">€120</div>
              </div>
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="group opacity-50 cursor-not-allowed min-w-[85vw] md:min-w-0 snap-center shrink-0">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5 rounded-lg md:rounded-none">
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=106" className="w-full h-full object-cover grayscale" alt="Tactical Vest" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <span className="border-2 border-white/50 text-white/80 px-4 md:px-6 py-2 text-xl md:text-2xl font-black tracking-widest rotate-[-15deg]">SOLD OUT</span>
                </div>
              </div>
              <div className="mt-4 md:mt-6 flex justify-between items-start font-bold uppercase tracking-widest text-xs md:text-sm px-1 md:px-0">
                <div>
                  <h3 className="text-base md:text-lg">TACTICAL VEST</h3>
                  <p className="text-zinc-500 mt-1 text-[10px] md:text-xs">GRAPHITE</p>
                </div>
                <div className="text-right text-base md:text-lg">€85</div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-20 md:py-32 border-y border-white/10 relative overflow-hidden bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col items-center">
              <Target className="text-[#00FF00] mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12" />
              <div className="text-[clamp(4rem,10vw,5rem)] md:text-7xl font-black text-white/5 tracking-tighter mb-4 absolute top-0 -z-10">01</div>
              <h3 className="text-xl md:text-2xl font-black tracking-widest mb-3 md:mb-4">LIMITED PRODUCTION</h3>
              <p className="text-zinc-500 text-[10px] md:text-xs font-bold tracking-widest leading-loose max-w-xs px-4">EACH GARMENT IS PRODUCED IN STRICTLY LIMITED QUANTITIES TO ENSURE EXCLUSIVITY.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }} className="flex flex-col items-center">
              <Shield className="text-[#00FF00] mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12" />
              <div className="text-[clamp(4rem,10vw,5rem)] md:text-7xl font-black text-white/5 tracking-tighter mb-4 absolute top-0 -z-10">02</div>
              <h3 className="text-xl md:text-2xl font-black tracking-widest mb-3 md:mb-4">TACTICAL UTILITY</h3>
              <p className="text-zinc-500 text-[10px] md:text-xs font-bold tracking-widest leading-loose max-w-xs px-4">ENGINEERED FOR THE URBAN BATTLEFIELD WITH MILITARY-GRADE MATERIALS.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
              <Globe className="text-[#00FF00] mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12" />
              <div className="text-[clamp(4rem,10vw,5rem)] md:text-7xl font-black text-white/5 tracking-tighter mb-4 absolute top-0 -z-10">03</div>
              <h3 className="text-xl md:text-2xl font-black tracking-widest mb-3 md:mb-4">GLOBAL SYNDICATE</h3>
              <p className="text-zinc-500 text-[10px] md:text-xs font-bold tracking-widest leading-loose max-w-xs px-4">A WORLDWIDE NETWORK OF INDIVIDUALS WHO REFUSE TO CONFORM TO THE MASSES.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-black border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-0 md:px-6">
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] md:text-6xl font-black mb-12 md:mb-20 tracking-tighter text-center px-4">SURVEILLANCE LOGS</h2>
            <div className="flex md:grid md:grid-cols-2 gap-6 md:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-0 pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <motion.div whileTap={{ scale: 0.98 }} className="p-8 md:p-10 border border-white/10 md:hover:border-[#00FF00]/50 transition-colors bg-[#050505] min-w-[85vw] md:min-w-0 snap-center rounded-xl md:rounded-none shrink-0">
                <Zap className="text-[#00FF00] mb-6 md:mb-8" size={28} />
                <p className="text-lg md:text-2xl font-bold tracking-wide leading-relaxed mb-8 md:mb-10 text-zinc-300">&quot;OBSIDIAN APPAREL REDEFINES WHAT IT MEANS TO WEAR STREETWEAR IN A DYSTOPIAN PRESENT. BRUTAL, UNCOMPROMISING, ESSENTIAL.&quot;</p>
                <div className="text-[#00FF00] font-black tracking-widest text-[10px] md:text-sm">HYPEBEAST :: HIGHSNOBIETY</div>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }} className="p-8 md:p-10 border border-white/10 md:hover:border-[#00FF00]/50 transition-colors bg-[#050505] min-w-[85vw] md:min-w-0 snap-center rounded-xl md:rounded-none shrink-0">
                <Zap className="text-[#00FF00] mb-6 md:mb-8" size={28} />
                <p className="text-lg md:text-2xl font-bold tracking-wide leading-relaxed mb-8 md:mb-10 text-zinc-300">&quot;THE AESTHETIC IS PURE AGGRESSION CONCEALED IN MINIMALIST TAILORING. A TRIUMPH OF URBAN SURVIVAL GEAR.&quot;</p>
                <div className="text-[#00FF00] font-black tracking-widest text-[10px] md:text-sm">VOGUE HOMMES :: DAZED</div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-40 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://loremflickr.com/1920/1080/streetwear,fashion?lock=107" className="w-full h-full object-cover opacity-20 grayscale" alt="Background" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h2 className="text-[clamp(3rem,8vw,6rem)] md:text-8xl font-black tracking-tighter mb-6 md:mb-8 text-[#00FF00] leading-none">JOIN THE SYNDICATE</h2>
            <p className="text-sm md:text-xl font-bold tracking-widest mb-10 md:mb-12 text-zinc-400 px-2">ENTER THE MAINFRAME FOR EARLY ACCESS TO CLASSIFIED DROPS.</p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center max-w-2xl mx-auto w-full">
              <input type="email" placeholder="ENTER ENCRYPTED EMAIL" className="bg-black/50 border border-white/30 px-6 py-4 md:py-5 outline-none focus:border-[#00FF00] transition-colors w-full font-bold tracking-widest text-center md:text-left text-xs md:text-sm rounded-lg md:rounded-none placeholder:text-white/30" />
              <button className="bg-[#00FF00] text-black px-12 py-4 md:py-5 font-black tracking-tighter text-lg md:text-xl md:hover:bg-white transition-colors shrink-0 rounded-lg md:rounded-none active:scale-95">INITIALIZE</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#00FF00]/30 bg-[#050505] pt-16 md:pt-24 pb-8 md:pb-12 px-4 md:px-6 uppercase tracking-widest text-[10px] md:text-xs font-bold">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-24 text-center md:text-left">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 text-white">OBSIDIAN</h2>
            <p className="text-zinc-500 max-w-sm leading-relaxed md:leading-loose">FORGED IN THE STREETS. ENGINEERED FOR THE FUTURE. NO COMPROMISE. NO SURRENDER.</p>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-6 text-zinc-400 items-center md:items-start">
            <a href="#" className="md:hover:text-[#00FF00] transition-colors active:text-[#00FF00] py-2 md:py-0">SHOP ALL</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors active:text-[#00FF00] py-2 md:py-0">ARCHIVE CLASSIFIED</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors active:text-[#00FF00] py-2 md:py-0">SYNDICATE MANIFESTO</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors active:text-[#00FF00] py-2 md:py-0">COMMS DIRECT</a>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-6 text-zinc-400 items-center md:items-start">
            <a href="#" className="md:hover:text-[#00FF00] transition-colors active:text-[#00FF00] py-2 md:py-0">INSTAGRAM NETWORK</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors active:text-[#00FF00] py-2 md:py-0">TWITTER FEED</a>
            <a href="#" className="md:hover:text-[#00FF00] transition-colors active:text-[#00FF00] py-2 md:py-0">DISCORD MAINFRAME</a>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-zinc-600 border-t border-white/10 pt-6 md:pt-8 gap-4 text-center">
          <p>© 2026 OBSIDIAN APPAREL</p>
          <p>ALL RIGHTS RESERVED :: SECURE CONNECTION</p>
        </div>
      </footer>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-lg h-[100svh] bg-[#050505] md:border-l border-[#00FF00]/30 p-6 md:p-8 flex flex-col uppercase font-bold tracking-widest relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#00FF00] opacity-10 md:opacity-5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8 relative z-10 pt-4 md:pt-0">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter">SECURE CART (0)</h2>
                <button onClick={() => setIsCartOpen(false)} className="active:scale-90 md:hover:text-[#00FF00] transition-colors md:hover:rotate-90 duration-300 p-2 -mr-2">
                  <X size={28} className="md:w-8 md:h-8" />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 space-y-4 md:space-y-6 relative z-10">
                <ShoppingCart size={64} className="opacity-10 md:w-20 md:h-20" />
                <p className="text-lg md:text-xl font-black tracking-tighter">CART IS EMPTY</p>
                <p className="text-[10px] md:text-xs tracking-widest text-center px-4">LOAD UP BEFORE THE DROP ENDS</p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6 md:pt-8 space-y-6 relative z-10 pb-6 md:pb-0">
                <div className="flex justify-between text-lg md:text-xl font-black">
                  <span>SUBTOTAL</span>
                  <span className="text-[#00FF00]">€0.00</span>
                </div>
                <button className="w-full bg-[#00FF00] text-black py-4 md:py-5 md:hover:bg-white transition-all font-black text-xl md:text-2xl tracking-tighter group flex items-center justify-center gap-3 md:gap-4 rounded-lg md:rounded-none active:scale-[0.98]" onClick={() => setIsCartOpen(false)}>
                  CHECKOUT <ArrowRight className="md:group-hover:translate-x-2 transition-transform w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
