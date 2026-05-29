"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Croissant, Coffee, Wheat, Star, MapPin, Phone, Mail, ArrowRight, Instagram, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import DemoLayout from '@/components/DemoLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const products = [
  { id: 1, name: "Country Sourdough", category: "Bread", price: "$8.00", img: "/images/demo/panaderia/1.jpg", desc: "Our signature loaf, fermented for 36 hours for a deep, complex flavor and perfect crust." },
  { id: 2, name: "Almond Croissant", category: "Pastry", price: "$5.50", img: "/images/demo/panaderia/2.jpg", desc: "Twice-baked butter croissant filled with rich almond frangipane and topped with toasted almonds." },
  { id: 3, name: "Baguette Tradition", category: "Bread", price: "$4.00", img: "/images/demo/panaderia/3.jpg", desc: "Classic French baguette with a crisp crust and an airy, open crumb structure." },
  { id: 4, name: "Cinnamon Morning Bun", category: "Pastry", price: "$4.50", img: "/images/demo/panaderia/4.jpg", desc: "Flaky croissant dough rolled with Ceylon cinnamon and brown sugar, tossed in cardamom sugar." },
  { id: 5, name: "Whole Wheat Walnut", category: "Bread", price: "$9.00", img: "/images/demo/panaderia/5.jpg", desc: "Earthy stone-ground whole wheat studded with toasted organic walnuts." },
  { id: 6, name: "Artisan Coffee Beans", category: "Pantry", price: "$18.00", img: "/images/demo/panaderia/6.jpg", desc: "Our house espresso blend, roasted locally. Notes of dark chocolate and cherry." }
];

const faqs = [
  { q: "How should I store my sourdough bread?", a: "To keep the crust crispy, store it cut-side down on a cutting board or in a paper bag at room temperature. Avoid plastic bags, which soften the crust. For longer storage, slice and freeze." },
  { q: "Do you offer gluten-free or vegan options?", a: "While our facility handles a lot of wheat, we do offer naturally vegan sourdoughs (just flour, water, salt). We currently do not produce gluten-free breads to ensure zero cross-contamination for celiacs." },
  { q: "Can I pre-order for the weekend?", a: "Yes! Weekend pre-orders open every Tuesday at 9 AM and close Thursday at noon. You can order online and skip the line on Saturday or Sunday morning." },
  { q: "Do you supply wholesale to local cafes?", a: "We do partner with a select group of local coffee shops. Please reach out via email to discuss wholesale partnerships." }
];

export default function PanaderiaDemo() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [filter, setFilter] = useState("All");
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <DemoLayout title="Panadería - Artisan Bakery">
      <div className="bg-[#FCF9F2] text-[#4A3C31] font-sans selection:bg-[#E5C7A3] selection:text-[#4A3C31]">
        
        {/* Navigation */}
        <nav className="absolute w-full px-6 py-6 flex justify-between items-center z-50">
          <Link href="/" className="font-mono text-sm tracking-widest uppercase text-[#4A3C31] hover:text-[#C17A4D] transition-colors font-bold">
            ← Catálogo
          </Link>
          <div className="text-2xl font-serif font-bold text-[#4A3C31] tracking-wide">
            MIE DE PAIN
          </div>
          <button className="flex items-center gap-2 text-[#4A3C31] hover:text-[#C17A4D] transition-colors font-medium">
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden md:inline">Order Ahead</span>
          </button>
        </nav>

        {/* 1. Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img 
              style={{ y: yBg }}
              src="/images/demo/panaderia/hero.jpg" 
              alt="Freshly baked bread" 
              className="w-full h-full object-cover opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FCF9F2]/60 via-transparent to-[#FCF9F2]" />
          </div>
          <motion.div 
            className="relative z-10 text-center px-4 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex justify-center mb-6 text-[#C17A4D]">
              <Wheat className="w-12 h-12" />
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-[#4A3C31] mb-6 tracking-tight leading-none">
              Slow Fermentation.<br />Real Bread.
            </h1>
            <p className="text-lg md:text-xl text-[#6B5A4E] mb-10 font-light max-w-xl mx-auto">
              Handcrafted sourdough, laminated pastries, and specialty coffee. Baked fresh every morning using ancient grains and a 10-year-old starter.
            </p>
            <button className="bg-[#C17A4D] text-white px-8 py-4 rounded-full font-medium hover:bg-[#A6663E] transition-all transform hover:scale-105 shadow-xl shadow-[#C17A4D]/20">
              Explore Our Menu
            </button>
          </motion.div>
        </section>

        {/* 2. Our Process (Features) */}
        <section className="py-24 px-6 md:px-12 bg-[#FCF9F2] relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <div className="w-20 h-20 mx-auto bg-[#F4EBE1] rounded-full flex items-center justify-center mb-6 text-[#C17A4D]">
                <Wheat className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Organic Flours</h3>
              <p className="text-[#6B5A4E] leading-relaxed">
                We mill a portion of our heritage grains in-house daily. Partnering only with sustainable, organic farms.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <div className="w-20 h-20 mx-auto bg-[#F4EBE1] rounded-full flex items-center justify-center mb-6 text-[#C17A4D]">
                <Coffee className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Time & Patience</h3>
              <p className="text-[#6B5A4E] leading-relaxed">
                Every loaf undergoes a minimum 36-hour cold fermentation process to unlock maximum flavor and digestibility.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}>
              <div className="w-20 h-20 mx-auto bg-[#F4EBE1] rounded-full flex items-center justify-center mb-6 text-[#C17A4D]">
                <Croissant className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Hand Laminated</h3>
              <p className="text-[#6B5A4E] leading-relaxed">
                Our viennoiserie is made with high-fat European butter, carefully folded over three days for ultimate flakiness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3. Products Grid */}
        <section className="py-24 px-6 md:px-12 bg-[#F4EBE1]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif text-[#4A3C31] mb-4">Fresh from the Oven</h2>
                <p className="text-[#6B5A4E] text-lg max-w-md">Our menu changes slightly with the seasons, but these classics are always on the rack.</p>
              </div>
              <div className="flex gap-4">
                {["All", "Bread", "Pastry", "Pantry"].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 rounded-full font-medium transition-colors ${
                      filter === f ? 'bg-[#C17A4D] text-white' : 'bg-white text-[#4A3C31] hover:bg-[#E5C7A3]/50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#C17A4D] uppercase tracking-wider">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-serif font-bold text-[#4A3C31]">{product.name}</h3>
                        <span className="font-mono text-[#C17A4D] font-bold">{product.price}</span>
                      </div>
                      <p className="text-[#6B5A4E] text-sm leading-relaxed mb-6 line-clamp-2">{product.desc}</p>
                      <button className="w-full py-3 border border-[#E5C7A3] text-[#C17A4D] font-medium rounded-xl hover:bg-[#C17A4D] hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Add to Order
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 4. Split Banner (Story) */}
        <section className="py-0 flex flex-col lg:flex-row bg-[#4A3C31] text-[#FCF9F2]">
          <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-0 relative">
            <img src="/images/demo/panaderia/4.jpg" alt="Baker shaping dough" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center">
            <span className="font-mono text-[#E5C7A3] tracking-[0.2em] uppercase text-sm mb-4 block">Meet the Baker</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Baking with Intention.</h2>
            <p className="text-[#E5C7A3] text-lg leading-relaxed mb-8 font-light">
              "We opened Mie de Pain with a simple goal: to return to the roots of breadmaking. No commercial yeast, no dough conditioners. Just flour, water, salt, and time. When you pull a dark, crackling loaf from the hearth, it's a testament to the life inside the dough."
            </p>
            <div>
              <p className="font-serif italic text-xl">— Elena Rossi, Founder & Head Baker</p>
            </div>
          </div>
        </section>

        {/* 5. Testimonials */}
        <section className="py-24 px-6 md:px-12 bg-[#FCF9F2]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-4xl font-serif text-[#4A3C31] mb-16">What the Neighborhood Says</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sophie M.", text: "The almond croissants here rival the ones I had in Paris. Flaky, buttery perfection. Get here early before they sell out!" },
                { name: "David K.", text: "Their country sourdough is a staple in my house. It lasts for days and makes the most incredible toast. The coffee is top-notch too." },
                { name: "Emma R.", text: "The smell when you walk in is heavenly. The staff is so warm, and you can really taste the love and quality ingredients in every bite." }
              ].map((review, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-[#F4EBE1]"
                >
                  <div className="flex text-[#C17A4D] mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-[#6B5A4E] mb-6 italic leading-relaxed">"{review.text}"</p>
                  <p className="font-bold text-[#4A3C31] uppercase tracking-wide text-sm">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="py-24 px-6 md:px-12 bg-[#F4EBE1]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-[#4A3C31] mb-4">Frequently Asked</h2>
              <p className="text-[#6B5A4E]">Everything you need to know about our baked goods and process.</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left text-[#4A3C31] font-bold text-lg hover:bg-[#FCF9F2] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {activeFaq === idx ? <Minus className="w-5 h-5 text-[#C17A4D]" /> : <Plus className="w-5 h-5 text-[#C17A4D]" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-[#6B5A4E] leading-relaxed border-t border-[#F4EBE1] pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Footer */}
        <footer className="bg-[#4A3C31] text-[#FCF9F2] pt-24 pb-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-3xl mb-4 text-white">MIE DE PAIN</h3>
              <p className="text-[#E5C7A3] font-light max-w-sm mb-8 leading-relaxed">
                Artisan bakery dedicated to slow fermentation, local organic grains, and the craft of traditional viennoiserie.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Join our newsletter for weekend specials" 
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[#C17A4D] text-sm w-full max-w-xs transition-colors"
                />
                <button className="bg-[#C17A4D] text-white px-6 py-3 rounded-lg hover:bg-[#A6663E] transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#E5C7A3] mb-6">Visit Us</h4>
              <ul className="space-y-4 text-sm font-light text-white/80">
                <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-[#C17A4D] shrink-0" /> 84 Baker Street<br/>Portland, OR 97204</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#C17A4D]" /> (503) 555-0199</li>
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#C17A4D]" /> hello@miedepain.com</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#E5C7A3] mb-6">Bakery Hours</h4>
              <ul className="space-y-4 text-sm font-light text-white/80">
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Wednesday - Friday</span> <span>7am - 3pm</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Saturday - Sunday</span> <span>8am - 2pm</span></li>
                <li className="text-[#C17A4D] pt-2">Closed Monday & Tuesday</li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/50 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Mie de Pain Bakery. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram</a>
            </div>
          </div>
        </footer>
        
      </div>
    </DemoLayout>
  );
}
