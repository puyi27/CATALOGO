"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Star, MapPin, Phone, Mail, ArrowRight, Minus, Plus, Wine, ChefHat, Utensils, Award } from 'lucide-react';
import Link from 'next/link';
import DemoLayout from '@/components/DemoLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const awards = [
  { year: "2023", title: "Two Michelin Stars", desc: "Awarded for exceptional culinary artistry and profound flavor profiles." },
  { year: "2022", title: "Best Fine Dining", desc: "National Restaurant Awards top pick for ambiance and service." },
  { year: "2021", title: "Repsol Sun", desc: "Recognized for continuous innovation in traditional gastronomy." }
];

const tastingMenus = [
  {
    name: "Tierra y Mar",
    price: "€185",
    courses: [
      "Amuse-Bouche: Truffle & Porcini Tartlet",
      "Bluefin Tuna Tartare with Oscietra Caviar",
      "Lobster Medallions in Saffron Emulsion",
      "Aged Wagyu Beef with Charred Leeks",
      "Pre-dessert: Yuzu Cleanser",
      "Signature Dark Chocolate Sphere"
    ]
  },
  {
    name: "Herencia",
    price: "€220",
    courses: [
      "Chef's Welcome Collection (4 bites)",
      "Smoked Eel and Foie Gras Mille-feuille",
      "Wild Turbot with Sea Urchin Sauce",
      "Iberian Suckling Pig with Quince Purée",
      "Artisan Cheese Selection",
      "Citrus & Pine Needle Textures"
    ]
  }
];

const faqs = [
  {
    q: "Do you offer vegetarian or vegan menus?",
    a: "Yes, we offer a fully vegetarian tasting menu upon request. Please inform us of any dietary restrictions at least 48 hours prior to your reservation so our culinary team can prepare a bespoke experience for you."
  },
  {
    q: "What is the dress code?",
    a: "We request an elegant smart-casual attire. Gentlemen are encouraged to wear collared shirts and closed-toe shoes. Sportswear, shorts, and flip-flops are not permitted in the dining room."
  },
  {
    q: "How far in advance should I make a reservation?",
    a: "Our reservation books open 90 days in advance. Due to limited seating (12 tables), we highly recommend booking as early as possible, especially for weekend dining."
  },
  {
    q: "Can I bring my own wine?",
    a: "We allow a maximum of two bottles per table for wines not featured on our list. A corkage fee of €50 per bottle applies. Our Sommelier is also happy to provide an exceptional pairing from our 2,000-bottle cellar."
  }
];

export default function GastronomiaDemo() {
  const [activeFaq, setActiveFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yHeroText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <DemoLayout title="Gastronomía - Michelin Star">
      <div className="bg-[#1C1A17] text-[#E8E3D9] font-sans selection:bg-[#C4A47C] selection:text-[#1C1A17]">
        
        {/* Navigation */}
        <nav className="fixed w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 mix-blend-difference">
          <Link href="/" className="font-mono text-sm tracking-widest uppercase hover:text-[#C4A47C] transition-colors">
            ← Catálogo
          </Link>
          <div className="font-serif text-2xl tracking-widest uppercase">Étoile</div>
          <button className="border border-[#C4A47C] text-[#C4A47C] px-6 py-2 uppercase tracking-widest text-xs hover:bg-[#C4A47C] hover:text-[#1C1A17] transition-all duration-300">
            Book a Table
          </button>
        </nav>

        {/* 1. Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
            <img src="/images/demo/gastronomia/hero.jpg" alt="Chef plating" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1A17]" />
          </motion.div>
          <motion.div 
            className="relative z-10 text-center px-4"
            style={{ y: yHeroText }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6 text-[#C4A47C]">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tighter mb-6 leading-none">
              A Symphony<br />of Senses
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-white/80">
              Redefining contemporary haute cuisine through ancestral techniques and zero-kilometer ingredients.
            </p>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-white/50" />
          </motion.div>
        </section>

        {/* 2. Philosophy / About */}
        <section className="py-24 md:py-32 px-6 md:px-12 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="space-y-8"
            >
              <h2 className="text-sm font-mono text-[#C4A47C] uppercase tracking-[0.3em]">The Philosophy</h2>
              <h3 className="text-4xl md:text-6xl font-serif leading-tight">
                Nature dictates our menu, we simply translate its language.
              </h3>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                Our kitchen operates on a simple principle: utmost respect for the ingredient. We forage in the morning, harvest at noon, and serve by dusk. Every dish is a narrative of our terroir, carefully constructed to evoke emotion and memory.
              </p>
              <div className="pt-8">
                <img src="/images/demo/gastronomia/1.jpg" alt="Signature dish" className="w-full h-64 object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative h-[600px]"
            >
              <img src="/images/demo/gastronomia/2.jpg" alt="Chef at work" className="w-full h-full object-cover rounded-sm" />
              <div className="absolute -bottom-10 -left-10 bg-[#25221E] p-8 hidden md:block">
                <p className="font-serif text-2xl italic text-[#C4A47C]">"Cooking is an act of love, a gift, a way of sharing with others."</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-widest">— Chef Alejandro M.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. The Experience (Menus) */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#151311]">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-20"
            >
              <h2 className="text-sm font-mono text-[#C4A47C] uppercase tracking-[0.3em] mb-4">The Experience</h2>
              <h3 className="text-4xl md:text-6xl font-serif">Tasting Menus</h3>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {tastingMenus.map((menu, idx) => (
                <motion.div 
                  key={menu.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.8 }}
                  className="bg-[#1C1A17] p-8 md:p-12 border border-white/5 hover:border-[#C4A47C]/30 transition-colors"
                >
                  <div className="flex justify-between items-baseline mb-8 pb-8 border-b border-white/10">
                    <h4 className="text-3xl font-serif text-[#C4A47C]">{menu.name}</h4>
                    <span className="font-mono text-xl">{menu.price}</span>
                  </div>
                  <ul className="space-y-6">
                    {menu.courses.map((course, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="font-mono text-xs text-[#C4A47C] mt-1.5">0{i + 1}</span>
                        <span className="text-lg font-light tracking-wide">{course}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-12 w-full py-4 border border-white/20 uppercase tracking-widest text-xs font-mono hover:bg-white hover:text-[#1C1A17] transition-colors">
                    Reserve this experience
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Cellar / Wine Pairing */}
        <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="/images/demo/gastronomia/3.jpg" alt="Wine cellar" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Wine className="w-12 h-12 text-[#C4A47C] mb-8" />
              <h2 className="text-4xl md:text-6xl font-serif mb-6">Liquid Alchemy</h2>
              <p className="text-white/70 text-lg font-light mb-8">
                Our Head Sommelier curates a living cellar of over 2,000 references. From rare grand crus to minimal intervention boutique wines, each pairing is designed to elevate the culinary narrative.
              </p>
              <ul className="space-y-4 font-mono text-sm tracking-wide text-white/80">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#C4A47C] rounded-full"></span> Standard Pairing — €95</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#C4A47C] rounded-full"></span> Grand Cru Pairing — €180</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#C4A47C] rounded-full"></span> Non-Alcoholic Ferments — €75</li>
              </ul>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/demo/gastronomia/4.jpg" alt="Pouring wine" className="w-full h-80 object-cover mt-12" />
              <img src="/images/demo/gastronomia/5.jpg" alt="Wine glasses" className="w-full h-80 object-cover" />
            </div>
          </div>
        </section>

        {/* 5. Accolades & Statistics */}
        <section className="py-24 bg-[#C4A47C] text-[#1C1A17]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-b border-[#1C1A17]/10 pb-16 mb-16">
              <div>
                <div className="text-6xl font-serif mb-2">12</div>
                <div className="font-mono text-xs uppercase tracking-widest">Exclusive Tables</div>
              </div>
              <div>
                <div className="text-6xl font-serif mb-2">2k+</div>
                <div className="font-mono text-xs uppercase tracking-widest">Wine References</div>
              </div>
              <div>
                <div className="text-6xl font-serif mb-2">100%</div>
                <div className="font-mono text-xs uppercase tracking-widest">Zero-Km Produce</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6"
                >
                  <Award className="w-8 h-8 mx-auto mb-4 text-[#1C1A17]" />
                  <h4 className="font-serif text-2xl mb-2">{award.title}</h4>
                  <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">{award.year}</p>
                  <p className="text-sm">{award.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#1C1A17]">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-sm font-mono text-[#C4A47C] uppercase tracking-[0.3em] mb-4">Inquiries</h2>
              <h3 className="text-4xl md:text-5xl font-serif">Frequent Questions</h3>
            </motion.div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="border border-white/10 rounded-sm overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-serif text-lg md:text-xl">{faq.q}</span>
                    {activeFaq === idx ? <Minus className="w-5 h-5 text-[#C4A47C]" /> : <Plus className="w-5 h-5 text-[#C4A47C]" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 text-white/60 font-light leading-relaxed">
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

        {/* 7. Contact & Footer */}
        <footer className="bg-[#151311] pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-3xl mb-6 tracking-wide">Étoile</h3>
              <p className="text-white/60 font-light max-w-md mb-8">
                A transcendent dining experience merging art, nature, and technique. Join us for a journey through the senses.
              </p>
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="Subscribe to newsletter" 
                  className="bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#C4A47C] text-sm w-64 transition-colors"
                />
                <button className="text-[#C4A47C] hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#C4A47C] mb-6">Contact</h4>
              <ul className="space-y-4 text-sm font-light text-white/70">
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> 123 Culinary Ave, Paris</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +33 1 23 45 67 89</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> reservations@etoile.com</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#C4A47C] mb-6">Hours</h4>
              <ul className="space-y-4 text-sm font-light text-white/70">
                <li><span className="block text-white">Wednesday - Saturday</span> Dinner: 19:00 - 22:30</li>
                <li><span className="block text-white">Friday & Saturday</span> Lunch: 13:00 - 15:00</li>
                <li className="text-[#C4A47C] mt-4">Closed Sun, Mon, Tue</li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Étoile Restaurant. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Press</a>
            </div>
          </div>
        </footer>
        
      </div>
    </DemoLayout>
  );
}
