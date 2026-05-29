"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  ShoppingCart, X, ArrowLeft, ArrowRight, Heart, Sparkles, Star, Menu, ChevronRight
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
  
  // Custom Cursor variables - FIXED
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 40, stiffness: 600, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
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

  return (
    <DemoLayout title="Luna Kids">
    <div className="text-[#4a4a4a] font-sans selection:bg-[#FBCFE8] selection:text-[#333] md:cursor-none bg-[#FAFAF9] min-h-screen">
      
      {/* CUSTOM CURSOR - NO CSS TRANSITIONS TO PREVENT LAG */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-3 h-3 rounded-full bg-[#f472b6] pointer-events-none z-[200] items-center justify-center transform-gpu will-change-transform shadow-md"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[90] pointer-events-none mix-blend-multiply">
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold tracking-wide hover:text-[#f472b6] transition-colors bg-white/80 px-4 py-2 rounded-full shadow-sm">
            <ArrowLeft size={16} /><span className="hidden md:inline">Volver al showroom</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <button onClick={() => setIsCartOpen(true)} className="hover:text-[#f472b6] transition-colors flex items-center gap-2 font-semibold tracking-wide text-xs group relative bg-white/80 px-4 py-2 rounded-full shadow-sm">
            <span className="hidden md:inline">Cesta</span> <ShoppingCart size={18} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#f472b6] text-white w-4 h-4 text-[10px] flex items-center justify-center font-bold rounded-full">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* ASYMMETRICAL HERO */}
      <header className="relative min-h-[100svh] w-full flex flex-col md:flex-row items-stretch overflow-hidden pt-24 md:pt-0">
        
        {/* Left Side: Typography */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h2 className="text-[#f472b6] font-semibold tracking-widest uppercase text-xs mb-6 flex items-center gap-3">
              <Sparkles size={14} /> Nueva Colección
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-serif font-light text-[#333] leading-[0.85] tracking-tight mb-8">
              Luna<br/><span className="text-[#f472b6] italic">Kids</span>
            </h1>
            <p className="text-[#666] font-medium text-lg md:text-xl max-w-md leading-relaxed mb-12">
              Vistiendo la magia de la infancia. Una propuesta visual que combina la dulzura de la niñez con tendencias contemporáneas.
            </p>
            <a href="#coleccion" className="inline-flex items-center gap-4 group">
              <span className="text-sm font-semibold tracking-widest uppercase text-[#333] group-hover:text-[#f472b6] transition-colors">Ver Colección</span>
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-[#f472b6] group-hover:border-[#f472b6] group-hover:text-white transition-all">
                <ArrowRight size={18} />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Editorial Arch Image */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-16 h-[60vh] md:h-[100svh]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full h-full max-w-md overflow-hidden relative shadow-2xl"
            style={{ borderRadius: "250px 250px 0 0" }} // ARCH SHAPE
          >
            <img src="/images/demo/tienda/hero.jpg" alt="Niños con ropa Luna Kids" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
          {/* Floating graphic */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-32 h-32 opacity-20 pointer-events-none hidden md:block"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#f472b6]">
               <path d="M50 0 L55 40 L95 50 L55 60 L50 100 L45 60 L5 50 L45 40 Z" />
            </svg>
          </motion.div>
        </div>
      </header>

      {/* INFINITE MARQUEE */}
      <div className="w-full overflow-hidden bg-[#FBCFE8] py-4 md:py-6 border-y border-pink-200">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center text-lg md:text-2xl font-serif text-pink-800 mx-4">
              <span>COMODIDAD QUE INSPIRA</span>
              <Sparkles className="mx-6 w-5 h-5 text-pink-600" />
              <span className="italic">MAGIA ATEMPORAL</span>
              <Heart className="mx-6 w-5 h-5 text-pink-600" />
            </div>
          ))}
        </div>
      </div>

      {/* MASONRY CATALOG */}
      <section id="coleccion" className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-[#333] mb-4">Nuestra Magia</h2>
          <p className="text-[#666] max-w-xl mx-auto">Prendas con estampados sutiles que nunca pasan de moda, logrando el equilibrio entre lo clásico y lo contemporáneo.</p>
        </div>

        {/* CSS Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {products.map((product, i) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group cursor-pointer break-inside-avoid"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-50">
                {/* Dynamically giving varying aspect ratios for masonry effect */}
                <div className={`w-full ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                {product.status && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#f472b6] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {product.status}
                  </div>
                )}
                {/* Quick Add Overlay */}
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#f472b6] shadow-lg">
                    <ShoppingCart size={16} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#333] group-hover:text-[#f472b6] transition-colors">{product.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-[#888]">{product.color}</p>
                  <span className="text-md font-medium text-[#f472b6]">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY ACCORDION (Instead of generic text blocks) */}
      <section className="py-24 bg-[#FFFDFD] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24">
            <h2 className="text-4xl md:text-5xl font-serif text-[#333] mb-8 leading-tight">Diseñando para la <br/><span className="text-[#f472b6] italic">Imaginación.</span></h2>
            <div className="flex gap-4 mb-12">
              <div className="w-10 h-10 rounded-full bg-[#FFFDFD] shadow-sm border border-gray-100" title="Blanco Nube"></div>
              <div className="w-10 h-10 rounded-full bg-[#FBCFE8] shadow-sm" title="Rosa Palo"></div>
              <div className="w-10 h-10 rounded-full bg-[#BAE6FD] shadow-sm" title="Azul Cielo"></div>
              <div className="w-10 h-10 rounded-full bg-[#FEF08A] shadow-sm" title="Vainilla"></div>
              <div className="w-10 h-10 rounded-full bg-[#D4A373] shadow-sm" title="Tonos Tierra"></div>
            </div>
            <img src="/images/demo/tienda/4.jpg" alt="Detalle textura" className="w-full h-64 object-cover rounded-2xl" />
          </div>
          
          <div className="flex flex-col gap-6">
            {/* Accordion Item 1 */}
            <div className="p-8 bg-[#FAFAF9] rounded-3xl border border-gray-100 hover:border-pink-200 transition-colors">
              <h3 className="text-2xl font-serif text-[#f472b6] mb-4">Comodidad y Movimiento</h3>
              <p className="text-[#666] leading-relaxed">
                El diseño infantil debe estar al servicio de la diversión. Huimos de las prendas rígidas y apostamos por un estilo casual-chic donde cada pieza está pensada para que los niños puedan correr, explorar y soñar con total libertad.
              </p>
            </div>
            {/* Accordion Item 2 */}
            <div className="p-8 bg-[#FAFAF9] rounded-3xl border border-gray-100 hover:border-pink-200 transition-colors">
              <h3 className="text-2xl font-serif text-[#f472b6] mb-4">El Valor de las Texturas</h3>
              <p className="text-[#666] leading-relaxed">
                Destacamos tejidos nobles y amables con la piel, como algodones suaves, linos transpirables y puntos ligeros. El mimo en los pequeños detalles: un lazo bien estructurado, un volante sutil o un botón de madera.
              </p>
            </div>
            {/* Accordion Item 3 */}
            <div className="p-8 bg-[#FAFAF9] rounded-3xl border border-gray-100 hover:border-pink-200 transition-colors">
              <h3 className="text-2xl font-serif text-[#f472b6] mb-4">Paleta de Ensueño</h3>
              <p className="text-[#666] leading-relaxed">
                Inspirados en la calma, nuestra paleta baila entre la delicadeza y la modernidad con tonos empolvados (blanco nube, rosa palo, vainilla) que aportan luz y serenidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
        <h2 className="text-6xl font-serif font-light text-[#f472b6] mb-6">Luna <span className="italic">Kids</span></h2>
        <p className="text-[#888] max-w-md mx-auto mb-12 font-medium">Cada conjunto está diseñado para crear hermosos recuerdos visuales. Magia atemporal.</p>
        <p className="text-sm text-gray-400">© 2026 LUNA KIDS. Todos los derechos reservados.</p>
      </footer>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-white/60 backdrop-blur-md flex items-center justify-center p-4 md:p-6 cursor-pointer"
            onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl cursor-auto border border-pink-100"
              onClick={e => e.stopPropagation()}>
              
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-[#FAFAF9] p-8 flex items-center justify-center">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover rounded-2xl shadow-sm" />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-3xl font-serif text-[#333]">{selectedProduct.name}</h2>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><X className="text-[#f472b6]" /></button>
                </div>
                <p className="text-[#888] text-sm uppercase tracking-widest mb-6">{selectedProduct.color}</p>
                <div className="text-3xl font-semibold text-[#f472b6] mb-8">{selectedProduct.price}</div>
                
                <div className="mb-8">
                  <p className="text-xs font-semibold text-[#666] tracking-widest uppercase mb-4">Seleccionar Talla</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.length > 0 ? selectedProduct.sizes.map(size => (
                      <button key={size} className="px-5 py-3 border border-gray-200 rounded-full text-sm font-semibold hover:border-[#f472b6] hover:text-[#f472b6] transition-colors">
                        {size}
                      </button>
                    )) : <span className="text-gray-400 italic">Talla única / Consultar</span>}
                  </div>
                </div>
                
                <div className="w-full h-px bg-gray-100 mb-8" />
                <p className="text-sm text-[#666] leading-relaxed mb-8">{selectedProduct.specs}</p>
                
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
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[140]" onClick={() => setIsCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-[100svh] w-full md:w-[450px] bg-white shadow-2xl z-[150] flex flex-col border-l border-pink-100">
              
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#FFFDFD]">
                <h2 className="text-2xl font-serif text-[#f472b6]">Tu Cesta</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-pink-50 rounded-full transition-colors"><X className="text-[#333]" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-400 mt-20">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30 text-[#f472b6]" />
                    <p>La cesta está vacía, lista para llenarse de magia.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartId} className="flex gap-4 items-center bg-[#FAFAF9] p-4 rounded-2xl border border-gray-100">
                      <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#333] text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-1">Talla: {item.selectedSize}</p>
                        <p className="text-[#f472b6] font-medium text-sm">{item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="p-2 text-gray-300 hover:text-red-400 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 bg-[#FAFAF9] border-t border-gray-100">
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span className="font-medium text-[#666]">Total</span>
                  <span className="font-semibold text-[#f472b6]">€{cartTotal}</span>
                </div>
                <button className="w-full py-4 bg-[#f472b6] hover:bg-[#ec4899] text-white font-semibold tracking-wide rounded-full transition-colors shadow-lg shadow-pink-200 disabled:opacity-50" disabled={cart.length === 0}>
                  Finalizar Compra
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global CSS for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: 200%;
        }
      `}} />

    </div>
    </DemoLayout>
  );
}
