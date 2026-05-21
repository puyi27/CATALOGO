"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, ArrowLeft, Menu, Instagram, Twitter } from "lucide-react"

export default function BarberShop() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const products = [
    { id: 1, name: "CLASSIC FADE", price: 30, image: "https://loremflickr.com/600/800/barber,fade", soldOut: false, category: "SERVICE" },
    { id: 2, name: "BEARD TRIM", price: 20, image: "https://loremflickr.com/600/800/beard,trim", soldOut: false, category: "SERVICE" },
    { id: 3, name: "MATTE CLAY", price: 25, image: "https://loremflickr.com/600/800/pomade", soldOut: false, category: "PRODUCT" },
    { id: 4, name: "HEAVY HOODIE", price: 60, image: "https://loremflickr.com/600/800/hoodie,black", soldOut: true, category: "MERCH" },
    { id: 5, name: "BUZZ CUT", price: 20, image: "https://loremflickr.com/600/800/buzzcut", soldOut: false, category: "SERVICE" },
    { id: 6, name: "SIGNATURE CAP", price: 35, image: "https://loremflickr.com/600/800/snapback,cap", soldOut: false, category: "MERCH" }
  ]

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-white selection:text-black font-sans uppercase">
      <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference flex items-center justify-between p-6 md:p-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest hover:opacity-50 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            CATÁLOGO
          </Link>
          <span className="hidden md:block text-2xl font-black tracking-tighter">FADE & CO.</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:block text-sm font-bold tracking-widest hover:opacity-50 transition-opacity">
            BOOK NOW
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative hover:opacity-50 transition-opacity">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </button>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <section className="relative h-screen w-full flex flex-col justify-end p-6 md:p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://loremflickr.com/1920/1080/barber,gritty" 
            alt="Barber Shop" 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-4">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter"
          >
            NO<br />COMPROMISE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl font-bold tracking-widest max-w-xl text-gray-400 mt-4"
          >
            PRECISION CUTS. RAW AESTHETICS. STREET CULTURE.
          </motion.p>
        </div>
      </section>

      <section className="w-full py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
            THE<br />MENU.
          </h2>
          <div className="flex gap-4 text-sm font-bold tracking-widest border-b border-white/20 pb-4 w-full md:w-auto">
            <button className="text-white">ALL</button>
            <button className="text-gray-600 hover:text-white transition-colors">SERVICES</button>
            <button className="text-gray-600 hover:text-white transition-colors">PRODUCTS</button>
            <button className="text-gray-600 hover:text-white transition-colors">MERCH</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileInView={{ y: [50, 0], opacity: [0, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group cursor-pointer relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${product.soldOut ? "grayscale opacity-50" : "grayscale hover:grayscale-0"}`}
                />
                <div className={`absolute inset-0 border-[0px] border-white transition-all duration-300 ease-out ${!product.soldOut ? "group-hover:border-[8px]" : ""}`}></div>
                {product.soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <span className="bg-white text-black px-6 py-2 text-xl font-black tracking-tighter transform -rotate-12">SOLD OUT</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-xs font-bold tracking-widest">
                  {product.category}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter group-hover:text-gray-300 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 font-bold tracking-widest text-sm mt-1">FADE & CO. STANDARD</p>
                </div>
                <span className="text-xl font-bold">€{product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-white text-black flex items-center justify-center overflow-hidden relative">
        <motion.div 
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute whitespace-nowrap text-[15vw] font-black tracking-tighter opacity-10"
        >
          STREETWEAR EST 2026 BARBER SHOP
        </motion.div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            MORE THAN<br />A HAIRCUT.
          </h2>
          <p className="text-xl md:text-3xl font-bold tracking-tight text-gray-800">
            WE BLEND CLASSIC BARBERING TECHNIQUES WITH CONTEMPORARY STREET CULTURE.
          </p>
        </div>
      </section>

      <footer className="bg-[#09090b] pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-16 mb-24">
          <div className="w-full md:w-auto">
            <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.8] mb-8">
              FADE<br />& CO.
            </h2>
            <div className="flex gap-6">
              <Instagram className="w-8 h-8 hover:opacity-50 cursor-pointer transition-opacity" />
              <Twitter className="w-8 h-8 hover:opacity-50 cursor-pointer transition-opacity" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm font-bold tracking-widest w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 mb-2">LOCATION</span>
              <p>128 URBAN STREET</p>
              <p>DOWNTOWN, DISTRICT 9</p>
              <p>CITY, CP 10001</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 mb-2">HOURS</span>
              <p>MON - FRI: 10AM - 8PM</p>
              <p>SAT: 10AM - 6PM</p>
              <p>SUN: CLOSED</p>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest text-gray-600 border-t border-white/10 pt-8">
          <p>© 2026 FADE & CO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
            <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#111] z-50 flex flex-col border-l border-white/10"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-3xl font-black tracking-tighter">CART</h3>
                <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform">
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
                <div className="flex gap-4 border-b border-white/10 pb-8">
                  <div className="w-24 h-32 bg-[#222]">
                    <img src="https://loremflickr.com/600/800/pomade" alt="MATTE CLAY" className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <h4 className="text-xl font-black tracking-tighter">MATTE CLAY</h4>
                      <p className="text-sm font-bold tracking-widest text-gray-500">QTY: 1</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold">€25</span>
                      <button className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-gray-400">REMOVE</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 border-b border-white/10 pb-8">
                  <div className="w-24 h-32 bg-[#222]">
                    <img src="https://loremflickr.com/600/800/beard,trim" alt="BEARD TRIM" className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <h4 className="text-xl font-black tracking-tighter">BEARD TRIM</h4>
                      <p className="text-sm font-bold tracking-widest text-gray-500">NOV 24, 2:30 PM</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold">€20</span>
                      <button className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-gray-400">REMOVE</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#1a1a1a] border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold tracking-widest text-gray-400">SUBTOTAL</span>
                  <span className="text-2xl font-black">€45</span>
                </div>
                <button className="w-full bg-white text-black py-6 text-xl font-black tracking-tighter hover:bg-gray-200 transition-colors">
                  CHECKOUT
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
