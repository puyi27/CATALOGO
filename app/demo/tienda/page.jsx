"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Menu, X, ArrowRight, ChevronLeft, Plus } from 'lucide-react';

// Custom Cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const hoverSpring = useSpring(isHovering, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-target')) {
        scale.set(2.5);
        isHovering.set(1);
      } else {
        scale.set(1);
        isHovering.set(0);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, scale, isHovering]);

  return (
    <m.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-black mix-blend-difference pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'])
      }}
    />
  );
}

const products = [
  { id: 1, name: 'Anillo Ónice V', price: '450€', category: 'Anillos', img: 'https://loremflickr.com/1000/1000/jewelry,luxury/all?lock=1' },
  { id: 2, name: 'Collar Cadena Plata', price: '680€', category: 'Collares', img: 'https://loremflickr.com/1000/1000/jewelry,luxury/all?lock=2' },
  { id: 3, name: 'Brazalete Minimal', price: '320€', category: 'Pulseras', img: 'https://loremflickr.com/1000/1000/jewelry,luxury/all?lock=3' },
  { id: 4, name: 'Pendientes Gota', price: '290€', category: 'Pendientes', img: 'https://loremflickr.com/1000/1000/jewelry,luxury/all?lock=4' }
];

export default function TiendaDemo() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="min-h-screen bg-[#F5F5F3] text-[#111] font-sans selection:bg-[#111] selection:text-white relative">
        <CustomCursor />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-target">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black/10 backdrop-blur-md text-black hover:bg-black hover:text-white transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>
        
        {/* Navbar */}
        <nav className="fixed w-full p-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
          <button className="text-sm uppercase tracking-widest font-medium hover:opacity-50 transition-opacity pointer-events-auto cursor-none interactive-target">
            <Menu className="w-6 h-6"/>
          </button>
          
          <h1 className="text-2xl font-serif font-light tracking-[0.3em] uppercase ml-6 pointer-events-auto">MAISON</h1>
          
          <button onClick={() => setCartOpen(true)} className="relative hover:opacity-50 transition-opacity pointer-events-auto cursor-none interactive-target">
            <ShoppingBag className="w-6 h-6" />
            {cartItems.length > 0 && (
              <m.span 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold"
              >
                {cartItems.length}
              </m.span>
            )}
          </button>
        </nav>

        {/* Hero Banner */}
        <section className="relative h-screen w-full bg-[#111] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-80">
            <Image 
              src="https://loremflickr.com/1000/1000/jewelry,luxury/all?lock=5" 
              alt="Maison Jewelry Banner" 
              fill 
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative z-10 text-center text-white flex flex-col items-center">
            <m.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-6 block"
            >
              Colección Otoño / Invierno
            </m.span>
            <m.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-[9rem] font-serif font-light tracking-tighter leading-[0.85] mb-8"
            >
              Artesanía <br/><span className="italic">Pura.</span>
            </m.h2>
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 border border-white/30 hover:border-white px-8 py-4 uppercase text-xs tracking-widest font-mono transition-colors interactive-target cursor-none bg-black/20 backdrop-blur-sm"
              onClick={() => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar Colección
            </m.button>
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="py-32 px-6 max-w-[100rem] mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-black/10 pb-8">
            <h3 className="text-4xl md:text-6xl font-serif font-light tracking-tight">Selección</h3>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">4 Piezas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
            {products.map((product, idx) => (
              <m.div 
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full bg-[#EAEAEA] mb-6 overflow-hidden cursor-none interactive-target" onClick={() => handleAddToCart(product)}>
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Plus className="w-4 h-4"/> Añadir a Bolsa
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2 block">{product.category}</span>
                    <h4 className="text-2xl font-serif font-light">{product.name}</h4>
                  </div>
                  <span className="text-xl font-light">{product.price}</span>
                </div>
              </m.div>
            ))}
          </div>
        </section>

        {/* E-commerce Quality Trust Banner */}
        <section className="py-24 border-t border-black/10 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest mb-4">Envío Global Asegurado</h5>
              <p className="text-zinc-500 font-light text-sm">Entregas en 48-72h mediante servicio de mensajería acorazada para todas las piezas de alta joyería.</p>
            </div>
            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest mb-4">Plata Reciclada 925</h5>
              <p className="text-zinc-500 font-light text-sm">Nuestros talleres utilizan metales nobles procedentes de fuentes éticas y 100% circulares.</p>
            </div>
            <div>
              <h5 className="font-mono text-xs uppercase tracking-widest mb-4">Atención Personalizada</h5>
              <p className="text-zinc-500 font-light text-sm">Un conserje digital disponible 24/7 para asistirle en tallas, grabados y pedidos especiales.</p>
            </div>
          </div>
        </section>

        {/* Off-canvas Cart */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <m.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setCartOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] cursor-none"
              />
              <m.div 
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-[#FAFAFA] z-[100] p-8 md:p-12 shadow-2xl flex flex-col"
              >
                <div className="flex justify-between items-center mb-12 border-b border-black/10 pb-6">
                  <h3 className="text-2xl font-serif font-light uppercase tracking-widest">Bolsa <span className="text-zinc-400">({cartItems.length})</span></h3>
                  <button onClick={() => setCartOpen(false)} className="hover:rotate-90 transition-transform interactive-target cursor-none">
                    <X className="w-8 h-8 font-light"/>
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                      <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                      <p className="font-light text-lg uppercase tracking-widest text-center">Tu bolsa está <br/>vacía.</p>
                    </div>
                  ) : (
                    cartItems.map((item, i) => (
                      <div key={i} className="flex gap-6 items-center border-b border-black/5 pb-6 mb-6 group">
                        <div className="relative w-24 h-32 bg-[#F0F0F0] flex-shrink-0">
                          <Image src={item.img} alt={item.name} fill sizes="96px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-lg">{item.name}</h4>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 mb-3">Talla Única</p>
                          <p className="font-medium text-lg">{item.price}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(i)}
                          className="text-xs uppercase font-mono tracking-widest text-zinc-400 hover:text-red-500 transition-colors underline interactive-target cursor-none"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-black/10 pt-8 mt-auto">
                  <div className="flex justify-between items-end mb-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">Subtotal</span>
                    <span className="text-3xl font-serif">{cartTotal}€</span>
                  </div>
                  <button 
                    disabled={cartItems.length === 0}
                    className="w-full bg-[#111] text-white py-6 text-sm uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed interactive-target cursor-none flex justify-center items-center gap-4"
                  >
                    Checkout Seguro <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[9px] text-center text-zinc-400 mt-6 uppercase tracking-widest font-mono">
                    Impuestos incluidos. Pago encriptado.
                  </p>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>

      </main>
    </LazyMotion>
  );
}
