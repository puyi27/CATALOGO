"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Droplet, Sun, Leaf, Wind, MapPin, Phone, Mail, ArrowRight, Check, Play, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import DemoLayout from '@/components/DemoLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const products = [
  { id: 1, name: "Reserva Familiar", type: "Picual Extra Virgin", notes: "Intense, green tomato, artichoke, peppery finish", price: "€28", vol: "500ml", img: "/images/demo/almazara/1.jpg" },
  { id: 2, name: "Cosecha Temprana", type: "Arbequina Extra Virgin", notes: "Smooth, green apple, almond, sweet finish", price: "€24", vol: "500ml", img: "/images/demo/almazara/2.jpg" },
  { id: 3, name: "Eco Blend", type: "Organic Coupage", notes: "Balanced, fresh grass, subtle bitterness", price: "€22", vol: "500ml", img: "/images/demo/almazara/3.jpg" },
];

const processes = [
  { title: "Early Harvest", desc: "We harvest in October when olives are still green, yielding less oil but exceptionally higher polyphenol content and intense flavor profiles.", icon: <Sun className="w-6 h-6" /> },
  { title: "Cold Extraction", desc: "Milled within 2 hours of harvesting at temperatures below 22°C (71°F) to preserve volatile aromatic compounds and antioxidants.", icon: <Droplet className="w-6 h-6" /> },
  { title: "Sustainable Tech", desc: "Our mill runs on solar power, and olive pits are repurposed as biomass for heating, ensuring a zero-waste production cycle.", icon: <Leaf className="w-6 h-6" /> }
];

const faqs = [
  { q: "What does 'Cold Extracted' mean?", a: "Cold extraction means the olive paste is never heated above 27°C (we keep ours under 22°C) during the milling process. Heat increases oil yield but degrades the delicate flavors and health benefits of the oil." },
  { q: "How should I store Extra Virgin Olive Oil?", a: "EVOO has three enemies: light, heat, and oxygen. Store your bottles in a cool, dark cupboard away from the stove. Once opened, consume within 2-3 months for optimal flavor." },
  { q: "Can I use your EVOO for cooking and frying?", a: "Yes! High-quality EVOO with high polyphenol content (like our Picual) has a smoke point of around 210°C (410°F), making it perfectly safe and healthy for sautéing, baking, and even frying." },
  { q: "Do you ship internationally?", a: "We currently ship throughout Europe and North America. Shipping costs are calculated at checkout based on the weight of the order." }
];

export default function AlmazaraDemo() {
  const [activeFaq, setActiveFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <DemoLayout title="Almazara - Olive Oil Estate">
      <div className="bg-[#F7F8F3] text-[#2C3E2D] font-sans selection:bg-[#B5C18E] selection:text-[#1A251B]">
        
        {/* Navigation */}
        <nav className="fixed w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 mix-blend-difference text-[#F7F8F3]">
          <Link href="/" className="font-mono text-sm tracking-widest uppercase hover:text-[#B5C18E] transition-colors">
            ← Catálogo
          </Link>
          <div className="font-serif text-2xl tracking-widest uppercase">
            Finca Olea
          </div>
          <button className="border border-[#F7F8F3] px-6 py-2 uppercase tracking-widest text-xs hover:bg-[#F7F8F3] hover:text-[#2C3E2D] transition-all duration-300">
            Shop Oil
          </button>
        </nav>

        {/* 1. Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1A251B]">
          <motion.div className="absolute inset-0 z-0 opacity-70" style={{ y: yBg }}>
            <img src="/images/demo/almazara/hero.jpg" alt="Olive groves at sunset" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A251B] via-transparent to-transparent" />
          </motion.div>
          <motion.div 
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <span className="font-mono text-[#B5C18E] text-xs uppercase tracking-[0.3em] mb-6 block">Est. 1924 · Andalucía</span>
            <h1 className="text-6xl md:text-9xl font-serif font-light text-[#F7F8F3] mb-6 tracking-tighter">
              Liquid Gold.
            </h1>
            <p className="text-lg md:text-xl font-light text-[#F7F8F3]/80 max-w-2xl mx-auto">
              Single-estate Extra Virgin Olive Oil. Crafted where ancient terroir meets modern precision.
            </p>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#F7F8F3]/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* 2. The Estate / Heritage */}
        <section className="py-24 md:py-32 px-6 md:px-12 relative bg-[#F7F8F3]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-2 md:order-1 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <img src="/images/demo/almazara/4.jpg" alt="Centenary olive tree" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#2C3E2D] text-[#F7F8F3] p-8 max-w-xs hidden md:block">
                <div className="text-4xl font-serif mb-2">100+</div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#B5C18E]">Years of heritage</div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-1 md:order-2 space-y-8">
              <h2 className="text-sm font-mono text-[#4A5D4E] uppercase tracking-[0.3em]">The Estate</h2>
              <h3 className="text-4xl md:text-6xl font-serif leading-tight text-[#1A251B]">
                Rooted in tradition, guided by nature.
              </h3>
              <p className="text-[#4A5D4E] text-lg leading-relaxed font-light">
                Our estate spans 200 hectares of rolling hills, where centenary trees thrive in calcareous soil under the Mediterranean sun. We view ourselves merely as stewards of this land, working organically to foster biodiversity.
              </p>
              <button className="flex items-center gap-2 font-mono uppercase tracking-widest text-sm text-[#2C3E2D] hover:text-[#7A8B78] transition-colors border-b border-current pb-1 pt-4">
                Discover our history <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* 3. The Process / Agrotech */}
        <section className="py-24 bg-[#2C3E2D] text-[#F7F8F3]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono text-[#B5C18E] uppercase tracking-[0.3em] mb-4">Innovation</h2>
              <h3 className="text-4xl md:text-5xl font-serif">From Branch to Bottle</h3>
              <p className="text-[#B5C18E]/80 max-w-2xl mx-auto mt-6 font-light text-lg">Our state-of-the-art eco-mill operates strictly via optical sorting and cold extraction, capturing the pristine essence of the fruit.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {processes.map((proc, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-[#1A251B] p-10 border border-[#B5C18E]/20"
                >
                  <div className="text-[#B5C18E] mb-6">{proc.icon}</div>
                  <h4 className="text-2xl font-serif mb-4">{proc.title}</h4>
                  <p className="font-light text-[#F7F8F3]/70 leading-relaxed">{proc.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Our Oils / Products */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F7F8F3]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-sm font-mono text-[#4A5D4E] uppercase tracking-[0.3em] mb-4">The Collection</h2>
                <h3 className="text-4xl md:text-6xl font-serif text-[#1A251B]">Harvest 2024</h3>
              </div>
              <button className="font-mono uppercase tracking-widest text-sm border border-[#2C3E2D] px-6 py-3 hover:bg-[#2C3E2D] hover:text-[#F7F8F3] transition-colors">
                View All Oils
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((prod, idx) => (
                <motion.div 
                  key={prod.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="group relative"
                >
                  <div className="bg-[#EBECE1] aspect-[3/4] p-8 flex items-center justify-center mb-6 overflow-hidden">
                    <img src={prod.img} alt={prod.name} className="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-2xl font-serif text-[#1A251B]">{prod.name}</h4>
                      <span className="font-mono text-lg">{prod.price}</span>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#4A5D4E] mb-2">{prod.type} · {prod.vol}</p>
                    <p className="text-sm text-[#4A5D4E]/80 font-light italic mb-4">Tasting notes: {prod.notes}</p>
                    <button className="w-full py-3 bg-transparent border border-[#2C3E2D] text-[#2C3E2D] uppercase tracking-widest text-xs font-mono group-hover:bg-[#2C3E2D] group-hover:text-[#F7F8F3] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Tasting Tours Banner */}
        <section className="py-0 flex flex-col lg:flex-row bg-[#1A251B] text-[#F7F8F3]">
          <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            <span className="font-mono text-[#B5C18E] tracking-[0.2em] uppercase text-sm mb-4 block">Oleotourism</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Experience the Grove.</h2>
            <p className="text-[#F7F8F3]/70 text-lg leading-relaxed mb-10 font-light">
              Join our master miller for an immersive walk through the olive groves, followed by a guided tasting session in our 19th-century cellar. Learn to taste oil like a professional.
            </p>
            <button className="self-start bg-[#B5C18E] text-[#1A251B] px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors">
              Book a Tasting
            </button>
          </div>
          <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-0 relative group cursor-pointer overflow-hidden">
            <img src="/images/demo/almazara/5.jpg" alt="Tasting setup" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/20 transition-colors">
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-[#EBECE1]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A251B] mb-4">Oil Education</h2>
            </div>
            
            <div className="border-t border-[#2C3E2D]/20">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-[#2C3E2D]/20">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full py-6 flex justify-between items-center text-left text-[#1A251B] hover:text-[#4A5D4E] transition-colors"
                  >
                    <span className="font-serif text-xl md:text-2xl">{faq.q}</span>
                    <motion.div animate={{ rotate: activeFaq === idx ? 180 : 0 }}>
                      <ChevronDown className="w-6 h-6 text-[#4A5D4E]" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-[#4A5D4E] font-light leading-relaxed text-lg">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Footer */}
        <footer className="bg-[#1A251B] text-[#F7F8F3] pt-24 pb-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-3xl mb-6">Finca Olea</h3>
              <p className="text-[#F7F8F3]/60 font-light max-w-md mb-8 leading-relaxed">
                Be the first to know about our limited early harvest releases and estate news.
              </p>
              <div className="flex border-b border-[#F7F8F3]/30 pb-2 max-w-sm focus-within:border-[#B5C18E] transition-colors">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#F7F8F3]/30"
                />
                <button className="text-[#B5C18E] hover:text-white transition-colors uppercase font-mono text-xs tracking-widest px-4">
                  Join
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#B5C18E] mb-6">The Estate</h4>
              <ul className="space-y-4 text-sm font-light text-[#F7F8F3]/70">
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-[#B5C18E]" /> Camino de los Olivos s/n<br/>23001 Jaén, Spain</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#B5C18E]" /> +34 953 000 000</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#B5C18E]" /> info@fincaolea.es</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#B5C18E] mb-6">Explore</h4>
              <ul className="space-y-4 text-sm font-light text-[#F7F8F3]/70">
                <li><a href="#" className="hover:text-white transition-colors">Shop Oils</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Book a Tour</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wholesale</a></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-[#F7F8F3]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#F7F8F3]/40 uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Finca Olea. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>
        
      </div>
    </DemoLayout>
  );
}
