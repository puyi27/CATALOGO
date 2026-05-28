"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronDown, MapPin, Bed, Bath, Square, Instagram, Twitter, Linkedin, Menu, X } from "lucide-react";
import DemoLayout from '@/components/DemoLayout';

const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const mouseMove = (e) => {
        if (window.innerWidth < 768) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const mouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-[#D4AF37]/20 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full py-6 flex justify-between items-center text-left active:opacity-50 md:active:opacity-100 transition-opacity"
            >
                <span className="text-xl md:text-2xl font-light text-white uppercase tracking-widest">{title}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                    <ChevronDown className="text-[#D4AF37]" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="pb-6 text-white/60 font-light leading-relaxed text-sm md:text-base">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileMenu = ({ isOpen, setIsOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-40 bg-[#0A1128] flex flex-col items-center justify-center md:hidden"
                >
                    <div className="flex flex-col items-center gap-8 text-2xl font-serif text-white tracking-widest uppercase">
                        <motion.a whileTap={{ scale: 0.9 }} href="#" onClick={() => setIsOpen(false)} className="active:text-[#D4AF37]">Properties</motion.a>
                        <motion.a whileTap={{ scale: 0.9 }} href="#" onClick={() => setIsOpen(false)} className="active:text-[#D4AF37]">Standards</motion.a>
                        <motion.a whileTap={{ scale: 0.9 }} href="#" onClick={() => setIsOpen(false)} className="active:text-[#D4AF37]">Contact</motion.a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function VantageRealEstate() {
    const [openAccordion, setOpenAccordion] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const carouselRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(0);
    
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        import("animejs").then((module) => {
            const anime = module.default;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: '.anime-stat-item',
                            translateY: [20, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(100),
                            easing: 'easeOutQuad',
                            duration: 800
                        });
                        observer.disconnect();
                    }
                });
            });
            const el = document.querySelector('.anime-stats-container');
            if(el) observer.observe(el);
        });
    }, []);

    const properties = [
        { id: 1, title: "Villa Nova", price: "€4.5M", location: "Marbella, Spain", gradient: "bg-gradient-to-br from-blue-900 to-indigo-900" },
        { id: 2, title: "The Penthouse", price: "€2.1M", location: "Dubai, UAE", gradient: "bg-gradient-to-br from-indigo-900 to-purple-900" },
        { id: 3, title: "Coastal Estate", price: "€8.9M", location: "Malibu, USA", gradient: "bg-gradient-to-br from-slate-800 to-blue-900" },
        { id: 4, title: "Alpine Retreat", price: "€6.2M", location: "St. Moritz, CH", gradient: "bg-gradient-to-br from-zinc-800 to-slate-800" }
    ];

    const accordionData = [
        { title: "Amenities", content: "State-of-the-art smart home integration, infinity pool with panoramic views, private cinema room, subterranean wine cellar with climate control, and a fully equipped wellness center including sauna and steam room." },
        { title: "Location", content: "Perched atop the exclusive hills of the golden mile, offering absolute privacy while being merely minutes away from world-class dining, luxury boutiques, and the pristine coastline." },
        { title: "Floorplan", content: "Expansive 1,200 sqm of meticulously designed living space spread across three levels. Features include a grand double-height entrance, 6 en-suite bedrooms, staff quarters, and an 8-car gallery garage." }
    ];

    return (
        <DemoLayout title="Agencia Inmobiliaria">
        <div className="text-white font-sans selection:bg-[#D4AF37] selection:text-[#0A1128] overflow-x-hidden">
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:py-8 md:px-12 flex justify-between items-center mix-blend-difference">
                <div className="pointer-events-auto flex items-center gap-4">
                    <Link href="/" className="group flex items-center gap-2 text-white/80 md:hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors duration-300">
                        <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                            <ArrowLeft className="w-6 h-6 md:w-5 md:h-5" />
                        </motion.div>
                        <span className="hidden md:block text-sm tracking-widest uppercase font-medium">Catálogo</span>
                    </Link>
                </div>
                <div className="text-xl md:text-3xl font-serif tracking-widest text-[#D4AF37] uppercase text-center absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                    Vantage
                </div>
                <div className="hidden md:block text-sm tracking-widest uppercase font-medium text-white/80 pointer-events-auto">
                    Est. 2024
                </div>
                <div className="md:hidden pointer-events-auto">
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMenuOpen(!menuOpen)} 
                        className="text-white focus:outline-none"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </div>
            </nav>

            <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />

            <section className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    style={{ y: heroY, opacity: heroOpacity }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <div className="w-full h-full bg-gradient-to-br from-[#0A1128] via-indigo-950 to-blue-950 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/60 md:from-[#0A1128]/40 via-transparent to-[#0A1128]"></div>
                </motion.div>
                <div className="relative z-10 flex flex-col items-center text-center px-4 mt-20 w-full">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="text-6xl md:text-9xl leading-[0.9] font-serif text-white tracking-tighter mb-4 md:mb-6"
                    >
                        Beyond Living
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                        className="text-[#D4AF37] tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-lg max-w-[80%] mx-auto leading-relaxed"
                    >
                        Curating the world&apos;s most extraordinary homes
                    </motion.p>
                </div>
            </section>

            <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0A1128]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-serif text-white max-w-2xl leading-tight">
                        Exclusive <span className="text-[#D4AF37] italic">Properties</span>
                    </h2>
                    <p className="text-white/60 max-w-sm font-light leading-relaxed text-sm md:text-base">
                        Swipe to explore our handpicked selection of exceptional estates designed for the most discerning individuals.
                    </p>
                </div>
                
                <div className="relative w-full overflow-hidden" ref={carouselRef}>
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -carouselWidth }}
                        dragElastic={0.1}
                        className="flex gap-4 md:gap-8 cursor-grab active:cursor-grabbing w-max pr-[10vw]"
                    >
                        {properties.map((prop, idx) => (
                            <motion.div
                                key={prop.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative w-[85vw] md:w-[40vw] h-[55vh] md:h-[70vh] flex-shrink-0 group overflow-hidden touch-pan-y"
                            >
                                <div className="absolute inset-0 bg-[#0A1128]/40 md:bg-[#0A1128]/20 md:group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`w-full h-full ${prop.gradient} grayscale-[20%] md:grayscale-[30%] md:group-hover:grayscale-0 transition-all duration-700`}
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/80 to-transparent pointer-events-none">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 md:gap-0">
                                        <div>
                                            <p className="flex items-center gap-2 text-[#D4AF37] text-xs md:text-sm uppercase tracking-widest mb-2 font-medium">
                                                <MapPin className="w-3 h-3 md:w-4 md:h-4" /> {prop.location}
                                            </p>
                                            <h3 className="text-2xl md:text-4xl font-serif text-white">{prop.title}</h3>
                                        </div>
                                        <p className="text-xl md:text-2xl font-light text-white">{prop.price}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0d1530]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[4/5] w-full"
                    >
                        <div className="w-full h-full bg-gradient-to-br from-[#0A1128] to-slate-900" />
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                            className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-32 h-32 md:w-64 md:h-64 bg-[#D4AF37] p-4 md:p-8 flex flex-col justify-center items-center text-center z-10"
                        >
                            <span className="text-3xl md:text-5xl font-serif text-[#0A1128] mb-1 md:mb-2">24/7</span>
                            <span className="text-[#0A1128] text-[0.6rem] md:text-sm tracking-widest uppercase font-semibold">Concierge</span>
                        </motion.div>
                    </motion.div>
                    
                    <div className="mt-8 md:mt-0">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="text-[clamp(2.5rem,5vw,3.75rem)] leading-tight font-serif text-white mb-8 md:mb-12"
                        >
                            The <span className="text-[#D4AF37] italic">Vantage</span> Standard
                        </motion.h2>
                        
                        <div className="flex flex-col gap-2">
                            {accordionData.map((item, i) => (
                                <AccordionItem
                                    key={i}
                                    title={item.title}
                                    content={item.content}
                                    isOpen={openAccordion === i}
                                    onClick={() => setOpenAccordion(openAccordion === i ? -1 : i)}
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-6 border-t border-[#D4AF37]/20 pt-8 md:pt-12 anime-stats-container"
                        >
                            <div className="flex flex-col gap-1 md:gap-2 anime-stat-item opacity-0">
                                <Bed className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                                <span className="text-2xl md:text-3xl font-light text-white">6</span>
                                <span className="text-[0.6rem] md:text-xs uppercase tracking-widest text-white/50">Bedrooms</span>
                            </div>
                            <div className="flex flex-col gap-1 md:gap-2 anime-stat-item opacity-0">
                                <Bath className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                                <span className="text-2xl md:text-3xl font-light text-white">8</span>
                                <span className="text-[0.6rem] md:text-xs uppercase tracking-widest text-white/50">Bathrooms</span>
                            </div>
                            <div className="flex flex-col gap-1 md:gap-2 anime-stat-item opacity-0">
                                <Square className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                                <span className="text-2xl md:text-3xl font-light text-white">1.2k</span>
                                <span className="text-[0.6rem] md:text-xs uppercase tracking-widest text-white/50">Sq. Meters</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-32 md:py-40 px-6 md:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#0A1128]">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,100 M100,0 L0,100" stroke="#D4AF37" strokeWidth="0.5" />
                    </svg>
                </div>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-[clamp(2.5rem,8vw,5rem)] leading-tight font-serif text-white mb-8 md:mb-10 max-w-4xl"
                >
                    Ready to step into <span className="text-[#D4AF37] italic">extraordinary</span>?
                </motion.h2>
                
                <MagneticButton className="relative group cursor-pointer inline-block mt-4 md:mt-8">
                    <motion.div whileTap={{ scale: 0.95 }} className="relative">
                        <div className="absolute inset-0 bg-[#D4AF37] rounded-full scale-0 md:group-hover:scale-100 transition-transform duration-500 ease-out" />
                        <div className="relative px-8 py-5 md:px-12 md:py-6 border border-[#D4AF37] rounded-full flex items-center justify-center gap-4 transition-colors duration-500 md:group-hover:border-transparent active:bg-[#D4AF37]">
                            <span className="text-[#D4AF37] md:group-hover:text-[#0A1128] active:text-[#0A1128] uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium text-xs md:text-sm transition-colors duration-500">
                                Contact Private Agent
                            </span>
                        </div>
                    </motion.div>
                </MagneticButton>
            </section>

            <footer className="px-6 md:px-12 py-10 md:py-12 bg-[#050914] text-white/60 text-xs md:text-sm font-light flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
                <div className="font-serif text-xl md:text-2xl text-white tracking-widest uppercase">
                    Vantage
                </div>
                <div className="flex gap-6 md:gap-8 uppercase tracking-widest">
                    <motion.a whileTap={{ scale: 0.9 }} href="#" className="md:hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors">Privacy</motion.a>
                    <motion.a whileTap={{ scale: 0.9 }} href="#" className="md:hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors">Terms</motion.a>
                    <motion.a whileTap={{ scale: 0.9 }} href="#" className="md:hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors">Imprint</motion.a>
                </div>
                <div className="flex gap-4">
                    <MagneticButton>
                        <motion.a whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center md:hover:border-[#D4AF37] md:hover:text-[#D4AF37] active:border-[#D4AF37] active:text-[#D4AF37] transition-colors">
                            <Instagram className="w-4 h-4" />
                        </motion.a>
                    </MagneticButton>
                    <MagneticButton>
                        <motion.a whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center md:hover:border-[#D4AF37] md:hover:text-[#D4AF37] active:border-[#D4AF37] active:text-[#D4AF37] transition-colors">
                            <Twitter className="w-4 h-4" />
                        </motion.a>
                    </MagneticButton>
                    <MagneticButton>
                        <motion.a whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center md:hover:border-[#D4AF37] md:hover:text-[#D4AF37] active:border-[#D4AF37] active:text-[#D4AF37] transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </motion.a>
                    </MagneticButton>
                </div>
            </footer>
        </div>
        </DemoLayout>
    );
}
