"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, ArrowLeft, Menu, Instagram, Twitter } from "lucide-react"
import DemoLayout from "@/components/DemoLayout"

export default function BarberShop() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
              scale: [0.95, 1],
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
  }, []);

  const products = [
    { id: 1, name: "CLASSIC FADE", price: 30, img: "/images/demo/barberia/1.jpg", soldOut: false, category: "SERVICE" },
    { id: 2, name: "BEARD TRIM", price: 20, img: "/images/demo/barberia/2.jpg", soldOut: false, category: "SERVICE" },
    { id: 3, name: "MATTE CLAY", price: 25, img: "/images/demo/barberia/3.jpg", soldOut: false, category: "PRODUCT" },
    { id: 4, name: "HEAVY HOODIE", price: 60, img: "/images/demo/barberia/4.jpg", soldOut: true, category: "MERCH" },
    { id: 5, name: "BUZZ CUT", price: 20, img: "/images/demo/barberia/5.jpg", soldOut: false, category: "SERVICE" },
    { id: 6, name: "SIGNATURE CAP", price: 35, img: "/images/demo/barberia/6.jpg", soldOut: false, category: "MERCH" }
  ]

  return (
    <DemoLayout title="Fade & Co.">
      <div className="text-stone-900 selection:bg-black selection:text-white font-sans uppercase md:cursor-none overflow-x-hidden">
        <motion.div
          className="hidden md:flex fixed top-0 left-0 w-6 h-6 bg-black mix-blend-difference rounded-full pointer-events-none z-[100] items-center justify-center"
          animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        />
        
        <div className="fixed top-6 right-6 z-40 mix-blend-difference flex gap-6 text-white pointer-events-auto">
          <button className="hidden md:block text-sm font-bold tracking-widest hover:opacity-50 transition-opacity">
            BOOK NOW
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative active:scale-95 md:hover:opacity-50 transition-all">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden active:scale-95 transition-transform">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 bg-[#09090b] z-50 flex flex-col p-6"
          >
            <div className="flex justify-end pt-2">
              <button onClick={() => setIsMenuOpen(false)} className="active:scale-90 transition-transform">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-16 px-4">
              {["SERVICES", "PRODUCTS", "MERCH", "BOOK NOW"].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-5xl font-black tracking-tighter active:scale-95 transition-transform origin-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto px-4 pb-8 flex gap-6">
              <Instagram className="w-6 h-6" />
              <Twitter className="w-6 h-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-[100svh] w-full flex flex-col justify-end p-6 md:p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-gradient-to-br from-zinc-900 to-black opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-4 pb-12 md:pb-0">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter break-words hyphens-none w-full text-white"
          >
            NO<br />COMPROMISE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-2xl font-bold tracking-widest max-w-xl text-gray-400 mt-2 md:mt-4"
          >
            PRECISION CUTS. RAW AESTHETICS. STREET CULTURE.
          </motion.p>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 max-w-[1400px] mx-auto overflow-hidden">
        <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6 md:gap-8">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            THE<br />MENU.
          </h2>
          <div className="flex gap-4 text-xs md:text-sm font-bold tracking-widest border-b border-white/20 pb-4 w-full md:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap">
            <button className="text-white active:scale-95 transition-transform">ALL</button>
            <button className="text-gray-600 md:hover:text-white active:scale-95 transition-all">SERVICES</button>
            <button className="text-gray-600 md:hover:text-white active:scale-95 transition-all">PRODUCTS</button>
            <button className="text-gray-600 md:hover:text-white active:scale-95 transition-all">MERCH</button>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 px-12 anime-barber-container">
          {products.map((product) => (
            <div key={product.id} className="anime-barber-item opacity-0">
              <DesktopProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="md:hidden w-full pl-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8">
          <div className="flex gap-4 pr-6 w-max">
            {products.map((product) => (
              <MobileProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white text-black flex items-center justify-center overflow-hidden relative">
        <motion.div 
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute whitespace-nowrap text-8xl md:text-9xl font-black tracking-tighter opacity-10"
        >
          STREETWEAR EST 2026 BARBER SHOP
        </motion.div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-8">
            MORE THAN<br />A HAIRCUT.
          </h2>
          <p className="text-base md:text-3xl font-bold tracking-tight text-gray-800">
            WE BLEND CLASSIC BARBERING TECHNIQUES WITH CONTEMPORARY STREET CULTURE.
          </p>
        </div>
      </section>

      <footer className="bg-[#09090b] text-white pt-20 md:pt-32 pb-8 md:pb-12 px-6 md:px-12 border-t border-stone-200 mt-12 rounded-[2rem]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="w-full md:w-auto">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8">
              FADE<br />& CO.
            </h2>
            <div className="flex gap-6">
              <Instagram className="w-8 h-8 active:scale-90 md:hover:opacity-50 md:cursor-pointer transition-all" />
              <Twitter className="w-8 h-8 active:scale-90 md:hover:opacity-50 md:cursor-pointer transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-sm font-bold tracking-widest w-full md:w-auto">
            <div className="flex flex-col gap-2 md:gap-4">
              <span className="text-gray-500 mb-1 md:mb-2">LOCATION</span>
              <p>128 URBAN STREET</p>
              <p>DOWNTOWN, DISTRICT 9</p>
              <p>CITY, CP 10001</p>
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <span className="text-gray-500 mb-1 md:mb-2">HOURS</span>
              <p>MON - FRI: 10AM - 8PM</p>
              <p>SAT: 10AM - 6PM</p>
              <p>SUN: CLOSED</p>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] md:text-xs font-bold tracking-widest text-gray-600 border-t border-white/10 pt-8 gap-6 md:gap-0">
          <p>© 2026 FADE & CO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span className="active:text-white md:hover:text-white md:cursor-pointer transition-colors">TERMS</span>
            <span className="active:text-white md:hover:text-white md:cursor-pointer transition-colors">PRIVACY</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#111] z-50 flex flex-col border-l border-white/10"
            >
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-[#111] sticky top-0 z-10">
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter">CART</h3>
                <button onClick={() => setIsCartOpen(false)} className="active:scale-90 md:hover:rotate-90 transition-transform">
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <CartItem 
                  gradient="from-neutral-800 to-black" 
                  name="MATTE CLAY" 
                  details="QTY: 1" 
                  price="€25" 
                />
                <CartItem 
                  gradient="from-zinc-800 to-black" 
                  name="BEARD TRIM" 
                  details="NOV 24, 2:30 PM" 
                  price="€20" 
                />
              </div>

              <div className="p-6 md:p-8 bg-[#1a1a1a] border-t border-white/10 sticky bottom-0">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <span className="text-sm md:text-lg font-bold tracking-widest text-gray-400">SUBTOTAL</span>
                  <span className="text-xl md:text-2xl font-black">€45</span>
                </div>
                <button className="w-full bg-white text-black py-4 md:py-6 text-lg md:text-xl font-black tracking-tighter active:scale-[0.98] md:hover:bg-gray-200 transition-all">
                  CHECKOUT
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </DemoLayout>
  )
}

function DesktopProductCard({ product }) {
  return (
    <motion.div 
      whileInView={{ y: [50, 0], opacity: [0, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative cursor-none"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-6">
        <div 
          className={`w-full h-full bg-gradient-to-br ${product.gradient} transition-transform duration-700 ease-out group-hover:scale-105 ${product.soldOut ? "opacity-50" : ""}`}
        />
        <div className={`absolute inset-0 border-[0px] border-white transition-all duration-300 ease-out pointer-events-none ${!product.soldOut ? "group-hover:border-[8px]" : ""}`}></div>
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
            <span className="bg-white text-black px-6 py-2 text-xl font-black tracking-tighter transform -rotate-12">SOLD OUT</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-xs font-bold tracking-widest pointer-events-none">
          {product.category}
        </div>
      </div>
      <div className="flex justify-between items-start pointer-events-none">
        <div>
          <h3 className="text-2xl font-black tracking-tighter group-hover:text-gray-300 transition-colors">{product.name}</h3>
          <p className="text-gray-500 font-bold tracking-widest text-sm mt-1">FADE & CO. STANDARD</p>
        </div>
        <span className="text-xl font-bold">€{product.price}</span>
      </div>
    </motion.div>
  )
}

function MobileProductCard({ product }) {
  return (
    <div className="min-w-[260px] w-[260px] flex flex-col snap-center active:scale-[0.98] transition-transform">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-4">
        <div 
          className={`w-full h-full bg-gradient-to-br ${product.gradient} pointer-events-none ${product.soldOut ? "opacity-50" : ""}`}
        />
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
            <span className="bg-white text-black px-4 py-1.5 text-lg font-black tracking-tighter transform -rotate-12">SOLD OUT</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-[10px] font-bold tracking-widest pointer-events-none">
          {product.category}
        </div>
      </div>
      <div className="flex justify-between items-start px-1">
        <div className="flex-1 pr-2">
          <h3 className="text-xl font-black tracking-tighter leading-tight">{product.name}</h3>
          <p className="text-gray-500 font-bold tracking-widest text-[10px] mt-1">FADE & CO.</p>
        </div>
        <span className="text-lg font-bold">€{product.price}</span>
      </div>
    </div>
  )
}

function CartItem({ gradient, name, details, price }) {
  return (
    <div className="flex gap-4 border-b border-white/10 pb-6 md:pb-8">
      <div className="w-20 md:w-24 h-28 md:h-32 bg-[#222] shrink-0">
        <img src={gradient} alt="Item" className={`w-full h-full object-cover `} />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1 md:py-2">
        <div>
          <h4 className="text-lg md:text-xl font-black tracking-tighter">{name}</h4>
          <p className="text-xs md:text-sm font-bold tracking-widest text-gray-500 mt-1">{details}</p>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-base md:text-lg font-bold">{price}</span>
          <button className="text-[10px] md:text-xs font-bold tracking-widest underline underline-offset-4 active:text-gray-400 md:hover:text-gray-400 transition-colors">REMOVE</button>
        </div>
      </div>
    </div>
  )
}
