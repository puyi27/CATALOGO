"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  ShoppingCart, X, ArrowLeft, ArrowRight, Heart, Sparkles, Star, Moon, Menu, ChevronDown
} from 'lucide-react';
import DemoLayout from "@/components/DemoLayout";

const products = [
  { id: 1, name: "CONJUNTO NUBE", color: "BLANCO NUBE", price: "€45", status: "NUEVO", img: "/images/demo/tienda/1.jpg", sizes: ["3M","6M","12M","18M"], specs: "100% ALGODÓN ORGÁNICO. TACTO EXTRASUAVE." },
  { id: 2, name: "PETO LINO", color: "ARENA", price: "€55", status: null, img: "/images/demo/tienda/2.jpg", sizes: ["12M","18M","24M","3A"], specs: "LINO TRANSPIRABLE. BOTONES DE MADERA NATURAL." },
  { id: 3, name: "VESTIDO FLORES", color: "ROSA PALO", price: "€65", status: "AGOTADO", img: "/images/demo/tienda/3.jpg", sizes: [], specs: "ESTAMPADO FLORAL CLÁSICO. VUELO GENEROSO." },
  { id: 4, name: "PIJAMA SUEÑOS", color: "AZUL CIELO", price: "€35", status: "NUEVO", img: "/images/demo/tienda/4.jpg", sizes: ["6M","12M","18M","24M","3A"], specs: "PUNTO LIGERO. COSTURAS PLANAS PARA MAYOR COMODIDAD." },
  { id: 5, name: "CHAQUETA PUNTO", color: "VAINILLA", price: "€48", status: null, img: "/images/demo/tienda/5.jpg", sizes: ["TALLA ÚNICA"], specs: "PUNTO BOBÓ. HECHO A MANO CON CARIÑO." },
  { id: 6, name: "CONJUNTO RAYAS", color: "AZUL NOCHE", price: "€52", status: "ÚLTIMAS", img: "/images/demo/tienda/6.jpg", sizes: ["18M","24M"], specs: "RAYAS MARINERAS. ESTILO CASUAL CHIC." },
];

const reviews = [
  { name: "Mamá de Leo", text: "El conjunto nube es un sueño. La tela es increíblemente suave y a Leo le encanta moverse libremente con él.", rating: 5, date: "24.10.2025" },
  { name: "Papá de Sofía", text: "Compramos el vestido de flores para un evento y no podía estar más preciosa. La caída de la tela y los detalles son preciosos.", rating: 5, date: "12.09.2025" },
  { name: "Lucía M.", text: "Los pijamas son un must. Resistentes a los lavados, suaves y con un diseño precioso que les ayuda a dormir relajados.", rating: 5, date: "03.11.2025" },
];

export default function LunaKidsApparel() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('TODOS');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
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
  const filteredProducts = activeTab === 'TODOS' ? products : products.filter(p => p.status === activeTab);

  return (
    <DemoLayout title="Luna Kids">
    <div className="text-[#4a4a4a] font-sans selection:bg-[#FBCFE8] selection:text-[#333] md:cursor-none bg-[#FFFDFD] min-h-screen">
      
      {/* CUSTOM CURSOR (Pastel Circle) */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full bg-[#FBCFE8]/60 pointer-events-none z-[150] items-center justify-center transition-transform backdrop-blur-sm"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-white/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-4"><X className="w-8 h-8 text-[#f472b6]" /></button>
            <nav className="flex flex-col gap-8 text-center w-full px-6">
              {["Colección", "Lookbook", "Filosofía"].map((item, i) => (
                <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                  className="text-4xl font-medium tracking-tight text-[#f472b6] border-b border-[#FBCFE8] pb-4 w-full" onClick={() => { setMenuOpen(false); }}
                  href={`#${item.toLowerCase()}`}>{item}</motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[90] pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 text-xs font-medium tracking-wide hover:text-[#f472b6] transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
            <ArrowLeft size={16} /><span className="hidden md:inline">Volver</span>
          </Link>
        </div>
        <div className="text-2xl md:text-3xl font-medium tracking-tight text-[#f472b6] pointer-events-auto bg-white/80 px-6 py-2 rounded-full shadow-sm backdrop-blur-md">
          LUNA KIDS
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <button onClick={() => setIsCartOpen(true)} className="hover:text-[#f472b6] transition-colors flex items-center gap-2 font-medium tracking-wide text-xs group relative bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
            <span className="hidden md:inline">Cesta</span> <ShoppingCart size={18} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#f472b6] text-white w-4 h-4 text-[10px] flex items-center justify-center font-bold rounded-full">{cart.length}</span>}
          </button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden bg-white/50 p-2 rounded-full shadow-sm"><Menu size={20} /></button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden pt-24 bg-[#FFF5F8]">
        {/* Soft Blobs Background */}
        <motion.div style={{ opacity: opacityHero }} className="absolute inset-0 z-0 overflow-hidden">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FBCFE8] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
           <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#BAE6FD] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
           <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-[#FEF08A] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
           <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        </motion.div>
        
        <div className="relative z-10 px-6 md:px-12 pb-12 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8 mt-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
            <Moon className="w-4 h-4 text-[#f472b6]" />
            <span className="text-xs font-semibold tracking-widest text-[#f472b6] uppercase">Nueva Colección</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-[#333] mb-4">
            Vistiendo la <span className="text-[#f472b6] font-style-italic">magia</span><br/>de la infancia.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-[#666] font-medium text-base md:text-xl max-w-2xl leading-relaxed">
            Ropa alegre, libre y llena de encanto. Un estilo visual que combina la dulzura de la infancia con tendencias contemporáneas.
          </motion.p>
          <motion.a href="#coleccion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-8 px-8 py-4 bg-[#f472b6] text-white rounded-full font-semibold tracking-wide hover:bg-[#ec4899] hover:scale-105 transition-all shadow-lg shadow-pink-200">
            Descubrir Magia
          </motion.a>
        </div>
      </header>

      {/* MANIFESTO SECTION (Comodidad & Paleta) */}
      <section id="filosofia" className="py-24 md:py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#FBCFE8] relative">
              <img src="/images/demo/tienda/2.jpg" alt="Niños jugando" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <Sparkles className="w-8 h-8 mb-4" />
                <h3 className="text-2xl font-semibold">Comodidad que Inspira</h3>
              </div>
            </div>
          </motion.div>
          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-semibold text-[#f472b6] mb-4">Comodidad que Inspira Movimiento</h2>
              <p className="text-[#666] leading-relaxed text-lg">
                El diseño infantil debe estar al servicio de la diversión. La estética de Luna Kids se caracteriza por siluetas relajadas, cortes fluidos y ergonomía. Huimos de las prendas rígidas y apostamos por un estilo casual-chic donde cada pieza está pensada para que los niños puedan correr, explorar y soñar con total libertad.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-3xl font-semibold text-[#f472b6] mb-4">Una Paleta de Ensueño</h2>
              <p className="text-[#666] leading-relaxed text-lg mb-4">
                Inspirados en la calma y el encanto que evoca nuestro nombre, la paleta cromática baila entre la delicadeza y la modernidad.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFFDFD] shadow-sm border border-gray-100" title="Blanco Nube"></div>
                <div className="w-12 h-12 rounded-full bg-[#FBCFE8] shadow-sm" title="Rosa Palo"></div>
                <div className="w-12 h-12 rounded-full bg-[#BAE6FD] shadow-sm" title="Azul Cielo"></div>
                <div className="w-12 h-12 rounded-full bg-[#FEF08A] shadow-sm" title="Vainilla"></div>
                <div className="w-12 h-12 rounded-full bg-[#D4A373] shadow-sm" title="Tonos Tierra"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SHOP GRID */}
      <section id="coleccion" className="py-24 bg-[#FFF5F8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#333] mb-4">Colección Mágica</h2>
              <p className="text-[#666] max-w-md">Prendas con estampados sutiles que nunca pasan de moda, logrando el equilibrio entre lo clásico y lo moderno.</p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto snap-x">
              {['TODOS', 'NUEVO', 'ÚLTIMAS'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab ? 'bg-[#f472b6] text-white shadow-md' : 'bg-white text-[#666] hover:bg-pink-50'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-gray-50">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {product.status && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#f472b6] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {product.status}
                      </div>
                    )}
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-[#333]">{product.name}</h3>
                      <span className="text-lg font-medium text-[#f472b6]">{product.price}</span>
                    </div>
                    <p className="text-sm text-[#888]">{product.color}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* TEXTURES & DETAILS (Text from Prompt) */}
      <section className="py-24 md:py-32 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <Heart className="w-12 h-12 text-[#f472b6] mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-semibold text-[#333] mb-8">El Valor de las Texturas</h2>
          <p className="text-[#666] text-lg md:text-xl leading-relaxed mb-8">
            Buscamos transmitir una sensación inmediata de calidez. Estéticamente, destacamos tejidos nobles y amables con la piel, como algodones suaves, linos transpirables y puntos ligeros. Además, la estética de Luna Kids se define por el mimo en los pequeños detalles: un lazo bien estructurado, un volante sutil, un botón de madera o un estampado delicado que convierte una prenda sencilla en una pieza especial.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#f472b6] to-transparent mx-auto opacity-50"></div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-[#BAE6FD]/10 border-y border-[#BAE6FD]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-semibold text-center mb-16 text-[#333]">Familias Felices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 relative">
                <div className="flex gap-1 text-[#FEF08A] mb-6">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                </div>
                <p className="text-[#666] mb-6 leading-relaxed italic">"{rev.text}"</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-[#f472b6]">{rev.name}</span>
                  <span className="text-gray-400">{rev.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100 text-center">
        <h2 className="text-4xl font-semibold text-[#f472b6] mb-6">LUNA KIDS</h2>
        <p className="text-[#888] max-w-md mx-auto mb-12">Cada conjunto está diseñado para crear hermosos recuerdos visuales. Magia atemporal para los más pequeños.</p>
        <p className="text-sm text-gray-400">© 2026 LUNA KIDS. Todos los derechos reservados.</p>
      </footer>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-white/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 cursor-pointer"
            onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-2xl cursor-auto border border-pink-100"
              onClick={e => e.stopPropagation()}>
              
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-pink-50">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FFFDFD]">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-semibold text-[#333]">{selectedProduct.name}</h2>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><X className="text-[#f472b6]" /></button>
                </div>
                <p className="text-[#888] text-sm mb-6">{selectedProduct.color}</p>
                <div className="text-3xl font-medium text-[#f472b6] mb-8">{selectedProduct.price}</div>
                
                <div className="mb-8">
                  <p className="text-sm font-semibold text-[#666] mb-3">TALLA</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.length > 0 ? selectedProduct.sizes.map(size => (
                      <button key={size} className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:border-[#f472b6] hover:text-[#f472b6] transition-colors">
                        {size}
                      </button>
                    )) : <span className="text-gray-400 italic">Talla única / Consultar</span>}
                  </div>
                </div>
                
                <p className="text-sm text-[#888] leading-relaxed mb-8">{selectedProduct.specs}</p>
                
                <button 
                  onClick={() => addToCart(selectedProduct, selectedProduct.sizes[0] || 'UNIQUE')}
                  className="w-full py-4 bg-[#f472b6] hover:bg-[#ec4899] text-white font-semibold rounded-full transition-colors flex justify-center items-center gap-2 shadow-lg shadow-pink-200">
                  Añadir a la Cesta <ShoppingCart size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOPPING CART SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[140]" onClick={() => setIsCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-[100svh] w-full md:w-[450px] bg-white shadow-2xl z-[150] flex flex-col border-l border-pink-100">
              
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FFF5F8]">
                <h2 className="text-xl font-semibold text-[#f472b6]">Tu Cesta ({cart.length})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors"><X className="text-[#333]" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-400 mt-20">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30 text-[#f472b6]" />
                    <p>La cesta está vacía, lista para llenarse de magia.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartId} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl">
                      <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#333]">{item.name}</h4>
                        <p className="text-sm text-gray-500">Talla: {item.selectedSize}</p>
                        <p className="text-[#f472b6] font-medium">{item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-[#FFF5F8] border-t border-gray-100">
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span className="font-medium text-[#666]">Total</span>
                  <span className="font-semibold text-[#f472b6]">€{cartTotal}</span>
                </div>
                <button className="w-full py-4 bg-[#f472b6] hover:bg-[#ec4899] text-white font-semibold rounded-full transition-colors shadow-lg shadow-pink-200 disabled:opacity-50" disabled={cart.length === 0}>
                  Finalizar Compra
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />

    </div>
    </DemoLayout>
  );
}
