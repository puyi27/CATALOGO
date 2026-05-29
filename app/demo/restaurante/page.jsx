"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Clock, MapPin, Phone, Star, Utensils, Heart, Users, Quote, ChevronLeft, ChevronRight, Menu as MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import DemoLayout from '@/components/DemoLayout';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const menuItems = [
  { category: "Starters", items: [
    { name: "Crispy Calamari", desc: "Served with house-made tartar sauce and lemon wedge.", price: "$14", img: "/images/demo/restaurante/1.jpg" },
    { name: "Rustic Bruschetta", desc: "Toasted artisanal bread, heirloom tomatoes, fresh basil, balsamic glaze.", price: "$12", img: "/images/demo/restaurante/2.jpg" },
    { name: "Stuffed Mushrooms", desc: "Button mushrooms filled with herb cream cheese and garlic butter.", price: "$11", img: "/images/demo/restaurante/3.jpg" }
  ]},
  { category: "Main Courses", items: [
    { name: "Grandma's Lasagna", desc: "Layers of fresh pasta, rich meat ragu, bechamel, and mozzarella.", price: "$22", img: "/images/demo/restaurante/4.jpg" },
    { name: "Braised Short Ribs", desc: "Slow-cooked for 8 hours, served with garlic mashed potatoes and seasonal veggies.", price: "$34", img: "/images/demo/restaurante/5.jpg" },
    { name: "Wood-Fired Roast Chicken", desc: "Half chicken marinated in herbs, served with roasted root vegetables.", price: "$26", img: "/images/demo/restaurante/6.jpg" }
  ]}
];

const reviews = [
  { text: "The best traditional food I've had in years. It feels just like eating at my grandmother's house, but with impeccable service.", author: "Maria D.", rating: 5 },
  { text: "A hidden gem! The atmosphere is incredibly warm and the braised ribs melt in your mouth. We will definitely be coming back.", author: "James T.", rating: 5 },
  { text: "Lovely rustic interior and generous portions. The staff makes you feel like part of the family from the moment you walk in.", author: "Sarah L.", rating: 4 }
];

const faqs = [
  { q: "Do you take reservations for large groups?", a: "Yes, we gladly accept reservations for groups of up to 20 people. For larger private events, please contact us directly." },
  { q: "Are you kid-friendly?", a: "Absolutely! We are a family restaurant and have a dedicated children's menu, as well as high chairs available upon request." },
  { q: "Do you have gluten-free options?", a: "We offer several gluten-free dishes, including gluten-free pasta. Please let your server know about any allergies when ordering." }
];

export default function RestauranteDemo() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const nextReview = () => setActiveReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <DemoLayout title="Restaurante - Traditional">
      <div className="bg-[#FAF7F2] text-[#3E2723] font-sans selection:bg-[#D7CCC8] selection:text-[#3E2723]">
        
        {/* Navigation */}
        <nav className="absolute w-full px-6 py-6 flex justify-between items-center z-50">
          <Link href="/" className="font-mono text-sm font-bold tracking-widest uppercase text-white hover:text-[#FFCC80] transition-colors">
            ← Catálogo
          </Link>
          <div className="hidden md:flex gap-8 text-white font-medium">
            <a href="#about" className="hover:text-[#FFCC80] transition-colors">Our Story</a>
            <a href="#menu" className="hover:text-[#FFCC80] transition-colors">Menu</a>
            <a href="#visit" className="hover:text-[#FFCC80] transition-colors">Visit Us</a>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white p-2"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <button className="hidden md:block bg-[#D84315] text-white px-6 py-2.5 rounded hover:bg-[#BF360C] transition-all shadow-lg font-medium">
            Reserve a Table
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[100] bg-[#3E2723] text-[#FAF7F2] flex flex-col p-8"
            >
              <div className="flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl font-serif mt-12">
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
                <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
                <a href="#visit" onClick={() => setMobileMenuOpen(false)}>Visit Us</a>
                <button className="bg-[#D84315] text-white px-6 py-3 rounded mt-8 text-lg font-sans">
                  Reserve a Table
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Hero Section */}
        <header className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <img src="/images/demo/restaurante/hero.jpg" alt="Cozy restaurant interior" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <motion.div 
            className="relative z-10 px-4 max-w-4xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center mb-6">
              <Utensils className="w-12 h-12 text-[#FFCC80]" />
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-lg">Casa<br/>Nostra</h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-10 font-serif italic">
              Authentic recipes passed down through generations.
            </p>
            <button className="bg-[#FFCC80] text-[#3E2723] px-8 py-4 rounded font-bold text-lg hover:bg-[#FFB74D] transition-transform hover:scale-105 shadow-xl">
              View Our Menu
            </button>
          </motion.div>
        </header>

        {/* 2. About Us */}
        <section id="about" className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <img src="/images/demo/restaurante/1.jpg" alt="Cooking with passion" className="rounded-xl shadow-2xl w-full h-[500px] object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center gap-4 mb-4 text-[#D84315] font-bold uppercase tracking-wider text-sm">
                <Heart className="w-5 h-5 fill-current" />
                Since 1985
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#3E2723]">A Family Tradition of Good Food</h2>
              <p className="text-lg text-[#5D4037] leading-relaxed mb-6">
                Casa Nostra began as a small family kitchen in the heart of the old town. For over three decades, we have been serving the same authentic recipes that our grandmother brought with her from the old country. 
              </p>
              <p className="text-lg text-[#5D4037] leading-relaxed mb-8">
                We believe in the magic of a shared meal. Our ingredients are sourced locally, but our flavors will transport you. When you're here, you're family.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#D7CCC8]">
                <div>
                  <div className="text-3xl font-serif font-bold text-[#D84315] mb-1">30+</div>
                  <div className="text-sm font-medium text-[#5D4037]">Years of service</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-[#D84315] mb-1">100%</div>
                  <div className="text-sm font-medium text-[#5D4037]">Scratch Kitchen</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. The Menu */}
        <section id="menu" className="py-24 px-6 md:px-12 bg-[#EFEBE5]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#3E2723] mb-4">Our Classics</h2>
              <p className="text-[#5D4037] max-w-2xl mx-auto">Discover our most beloved dishes, prepared daily with fresh ingredients and a lot of love.</p>
            </div>
            
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {menuItems.map((cat, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`px-6 py-2 rounded-full font-bold transition-colors ${
                    activeCategory === idx ? 'bg-[#3E2723] text-[#FAF7F2]' : 'bg-transparent text-[#3E2723] border border-[#3E2723] hover:bg-[#D7CCC8]'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {menuItems[activeCategory].items.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img src={item.img} alt={item.name} className="w-full h-56 object-cover" />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-serif font-bold text-[#3E2723]">{item.name}</h3>
                        <span className="text-lg font-bold text-[#D84315]">{item.price}</span>
                      </div>
                      <p className="text-[#5D4037] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="text-center mt-12">
              <button className="text-[#D84315] font-bold uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto">
                Download Full Menu <Utensils className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 4. Atmosphere Gallery */}
        <section className="py-24 px-2 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#3E2723] mb-4">The Atmosphere</h2>
              <p className="text-[#5D4037]">Cozy, warm, and ready to welcome you.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[300px]">
              <motion.img initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} src="/images/demo/restaurante/2.jpg" className="w-full h-full object-cover rounded-lg col-span-2 row-span-2" />
              <motion.img initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} src="/images/demo/restaurante/3.jpg" className="w-full h-full object-cover rounded-lg" />
              <motion.img initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} src="/images/demo/restaurante/4.jpg" className="w-full h-full object-cover rounded-lg" />
              <motion.img initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} src="/images/demo/restaurante/5.jpg" className="w-full h-full object-cover rounded-lg col-span-2" />
            </div>
          </div>
        </section>

        {/* 5. Reviews */}
        <section className="py-24 px-6 md:px-12 bg-[#3E2723] text-[#FAF7F2]">
          <div className="max-w-4xl mx-auto text-center relative">
            <Quote className="w-16 h-16 text-[#D84315] opacity-50 mx-auto mb-8" />
            <div className="overflow-hidden min-h-[250px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="text-2xl md:text-4xl font-serif italic mb-8 leading-snug">"{reviews[activeReview].text}"</p>
                  <div className="flex gap-1 text-[#FFCC80] mb-4">
                    {[...Array(reviews[activeReview].rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="font-bold uppercase tracking-widest text-sm">— {reviews[activeReview].author}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prevReview} className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextReview} className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* 6. FAQ & Reservations Info */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-[#3E2723] mb-12 text-center">Good to Know</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-[#D7CCC8] rounded-lg overflow-hidden bg-[#FAF7F2]">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left font-bold text-[#3E2723] hover:bg-[#EFEBE5] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#D84315] text-xl font-light">{openFaq === idx ? '-' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 bg-white"
                      >
                        <p className="py-4 text-[#5D4037]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Footer / Visit Us */}
        <footer id="visit" className="bg-[#1E120F] text-[#D7CCC8] pt-20 pb-10 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <h3 className="text-4xl font-serif text-white mb-6">Casa Nostra</h3>
              <p className="mb-6 max-w-sm text-lg text-white/70">
                Join us for a heartfelt meal that celebrates the rich traditions of home cooking.
              </p>
              <button className="bg-[#D84315] text-white px-8 py-3 rounded hover:bg-[#BF360C] transition-colors font-bold shadow-lg">
                Book a Table
              </button>
            </div>
            
            <div>
              <h4 className="text-[#FFCC80] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Hours
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Mon - Thu</span> <span>11:00 - 22:00</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Fri - Sat</span> <span>11:00 - 23:30</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span>Sunday</span> <span>12:00 - 21:00</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#FFCC80] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Location
              </h4>
              <p className="mb-4 text-white/80">
                142 Tradition St.<br />
                Culinary District, City 90210
              </p>
              <p className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4 text-[#D84315]" /> (555) 123-4567
              </p>
            </div>
            
          </div>
          
          <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} Casa Nostra Traditional Restaurant.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">TripAdvisor</a>
            </div>
          </div>
        </footer>
        
      </div>
    </DemoLayout>
  );
}
