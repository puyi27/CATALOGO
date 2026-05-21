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
    <div className="min-h-screen bg-[#000000] text-white font-sans uppercase selection:bg-[#00FF00] selection:text-black cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border-2 border-[#00FF00] rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <div className="w-1 h-1 bg-[#00FF00] rounded-full" />
      </motion.div>

      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 hover:text-[#00FF00] transition-colors uppercase font-bold tracking-widest text-sm bg-black/20 p-2 rounded-lg backdrop-blur-sm">
          <ArrowLeft size={16} /> CATÁLOGO
        </Link>
        <div className="text-3xl font-black tracking-tighter pointer-events-auto">OBSIDIAN</div>
        <button onClick={() => setIsCartOpen(true)} className="pointer-events-auto hover:text-[#00FF00] transition-colors flex items-center gap-3 font-bold tracking-widest text-sm group bg-black/20 p-2 rounded-lg backdrop-blur-sm">
          CART <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
        </button>
      </nav>

      <header className="relative h-screen w-full flex flex-col justify-end overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
           <img src="https://loremflickr.com/1920/1080/streetwear,fashion?lock=101" alt="Hero" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" />
           <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 w-full overflow-hidden border-y border-[#00FF00]/30 py-6 bg-black/80 backdrop-blur-md">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex whitespace-nowrap text-[#00FF00] font-black text-5xl md:text-8xl tracking-tighter"
          >
            <span className="pr-12">NEW COLLECTION DROP // OBSIDIAN SS26 //</span>
            <span className="pr-12">NEW COLLECTION DROP // OBSIDIAN SS26 //</span>
            <span className="pr-12">NEW COLLECTION DROP // OBSIDIAN SS26 //</span>
            <span className="pr-12">NEW COLLECTION DROP // OBSIDIAN SS26 //</span>
          </motion.div>
        </div>
      </header>

      <main>
        <section className="py-32 px-6 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter">INVENTORY</h2>
            <p className="text-zinc-500 font-bold tracking-widest text-sm pb-3">SEASON 26 // CLASSIFIED GEAR</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-[#00FF00] transition-colors">
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=102" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0 grayscale" alt="Heavyweight Tee 1" />
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=103" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100" alt="Heavyweight Tee 2" />
                <div className="absolute top-4 left-4 bg-[#00FF00] text-black text-xs font-black px-2 py-1 tracking-widest">NEW</div>
              </div>
              <div className="mt-6 flex justify-between items-start font-bold uppercase tracking-widest text-sm">
                <div>
                  <h3 className="group-hover:text-[#00FF00] transition-colors text-lg">HEAVYWEIGHT TEE</h3>
                  <p className="text-zinc-500 mt-1 text-xs">BLACK / ONYX</p>
                </div>
                <div className="text-right text-lg">€55</div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-[#00FF00] transition-colors">
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=104" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0 grayscale" alt="Cargo Pants 1" />
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=105" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100" alt="Cargo Pants 2" />
              </div>
              <div className="mt-6 flex justify-between items-start font-bold uppercase tracking-widest text-sm">
                <div>
                  <h3 className="group-hover:text-[#00FF00] transition-colors text-lg">CARGO PANTS</h3>
                  <p className="text-zinc-500 mt-1 text-xs">NIGHT SHADOW</p>
                </div>
                <div className="text-right text-lg">€120</div>
              </div>
            </div>

            <div className="group opacity-50 cursor-not-allowed">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
                <img src="https://loremflickr.com/800/1000/streetwear,fashion?lock=106" className="w-full h-full object-cover grayscale" alt="Tactical Vest" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <span className="border-2 border-white/50 text-white/80 px-6 py-2 text-2xl font-black tracking-widest rotate-[-15deg]">SOLD OUT</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start font-bold uppercase tracking-widest text-sm">
                <div>
                  <h3 className="text-lg">TACTICAL VEST</h3>
                  <p className="text-zinc-500 mt-1 text-xs">GRAPHITE</p>
                </div>
                <div className="text-right text-lg">€85</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 border-y border-white/10 relative overflow-hidden bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center relative z-10">
            <div className="flex flex-col items-center">
              <Target className="text-[#00FF00] mb-8" size={48} />
              <div className="text-5xl md:text-7xl font-black text-white/10 tracking-tighter mb-6 absolute top-0 -z-10">01</div>
              <h3 className="text-2xl font-black tracking-widest mb-4">LIMITED PRODUCTION</h3>
              <p className="text-zinc-500 text-xs font-bold tracking-widest leading-loose max-w-xs">EACH GARMENT IS PRODUCED IN STRICTLY LIMITED QUANTITIES TO ENSURE EXCLUSIVITY.</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-[#00FF00] mb-8" size={48} />
              <div className="text-5xl md:text-7xl font-black text-white/10 tracking-tighter mb-6 absolute top-0 -z-10">02</div>
              <h3 className="text-2xl font-black tracking-widest mb-4">TACTICAL UTILITY</h3>
              <p className="text-zinc-500 text-xs font-bold tracking-widest leading-loose max-w-xs">ENGINEERED FOR THE URBAN BATTLEFIELD WITH MILITARY-GRADE MATERIALS.</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="text-[#00FF00] mb-8" size={48} />
              <div className="text-5xl md:text-7xl font-black text-white/10 tracking-tighter mb-6 absolute top-0 -z-10">03</div>
              <h3 className="text-2xl font-black tracking-widest mb-4">GLOBAL SYNDICATE</h3>
              <p className="text-zinc-500 text-xs font-bold tracking-widest leading-loose max-w-xs">A WORLDWIDE NETWORK OF INDIVIDUALS WHO REFUSE TO CONFORM TO THE MASSES.</p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-black border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-20 tracking-tighter text-center">SURVEILLANCE LOGS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 border border-white/10 hover:border-[#00FF00]/50 transition-colors bg-[#050505]">
                <Zap className="text-[#00FF00] mb-8" size={32} />
                <p className="text-xl md:text-2xl font-bold tracking-wide leading-relaxed mb-10 text-zinc-300">"OBSIDIAN APPAREL REDEFINES WHAT IT MEANS TO WEAR STREETWEAR IN A DYSTOPIAN PRESENT. BRUTAL, UNCOMPROMISING, ESSENTIAL."</p>
                <div className="text-[#00FF00] font-black tracking-widest text-sm">HYPEBEAST // HIGHSNOBIETY</div>
              </div>
              <div className="p-10 border border-white/10 hover:border-[#00FF00]/50 transition-colors bg-[#050505]">
                <Zap className="text-[#00FF00] mb-8" size={32} />
                <p className="text-xl md:text-2xl font-bold tracking-wide leading-relaxed mb-10 text-zinc-300">"THE AESTHETIC IS PURE AGGRESSION CONCEALED IN MINIMALIST TAILORING. A TRIUMPH OF URBAN SURVIVAL GEAR."</p>
                <div className="text-[#00FF00] font-black tracking-widest text-sm">VOGUE HOMMES // DAZED</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-40 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://loremflickr.com/1920/1080/streetwear,fashion?lock=107" className="w-full h-full object-cover opacity-20 grayscale" alt="Background" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-[#00FF00]">JOIN THE SYNDICATE</h2>
            <p className="text-lg md:text-xl font-bold tracking-widest mb-12 text-zinc-400">ENTER THE MAINFRAME FOR EARLY ACCESS TO CLASSIFIED DROPS.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <input type="email" placeholder="ENTER ENCRYPTED EMAIL" className="bg-black/50 border border-white/30 px-6 py-5 outline-none focus:border-[#00FF00] transition-colors w-full font-bold tracking-widest text-center md:text-left text-sm" />
              <button className="bg-[#00FF00] text-black px-12 py-5 font-black tracking-tighter text-xl hover:bg-white transition-colors shrink-0">INITIALIZE</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#00FF00]/30 bg-[#050505] pt-24 pb-12 px-6 uppercase tracking-widest text-xs font-bold">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">OBSIDIAN</h2>
            <p className="text-zinc-500 max-w-sm leading-loose">FORGED IN THE STREETS. ENGINEERED FOR THE FUTURE. NO COMPROMISE. NO SURRENDER.</p>
          </div>
          <div className="flex flex-col space-y-6 text-zinc-400">
            <a href="#" className="hover:text-[#00FF00] transition-colors">SHOP ALL</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">ARCHIVE CLASSIFIED</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">SYNDICATE MANIFESTO</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">COMMS DIRECT</a>
          </div>
          <div className="flex flex-col space-y-6 text-zinc-400">
            <a href="#" className="hover:text-[#00FF00] transition-colors">INSTAGRAM NETWORK</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">TWITTER FEED</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">DISCORD MAINFRAME</a>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-zinc-600 border-t border-white/10 pt-8 gap-4">
          <p>© 2026 OBSIDIAN APPAREL</p>
          <p>ALL RIGHTS RESERVED // SECURE CONNECTION</p>
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
              className="w-full max-w-lg h-full bg-[#050505] border-l border-[#00FF00]/30 p-8 flex flex-col uppercase font-bold tracking-widest relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF00] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8 relative z-10">
                <h2 className="text-3xl font-black tracking-tighter">SECURE CART (0)</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-[#00FF00] transition-colors hover:rotate-90 duration-300">
                  <X size={32} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 space-y-6 relative z-10">
                <ShoppingCart size={80} className="opacity-10" />
                <p className="text-xl font-black tracking-tighter">CART IS EMPTY</p>
                <p className="text-xs tracking-widest">LOAD UP BEFORE THE DROP ENDS</p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-8 space-y-6 relative z-10">
                <div className="flex justify-between text-xl font-black">
                  <span>SUBTOTAL</span>
                  <span className="text-[#00FF00]">€0.00</span>
                </div>
                <button className="w-full bg-[#00FF00] text-black py-5 hover:bg-white transition-all font-black text-2xl tracking-tighter group flex items-center justify-center gap-4" onClick={() => setIsCartOpen(false)}>
                  CHECKOUT <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
