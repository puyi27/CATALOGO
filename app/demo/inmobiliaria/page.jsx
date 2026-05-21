"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronDown, MapPin, Bed, Bath, Square, Instagram, Twitter, Linkedin } from "lucide-react";

const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const mouseMove = (e) => {
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
                className="w-full py-6 flex justify-between items-center text-left"
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
                        <div className="pb-6 text-white/60 font-light leading-relaxed">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function VantageRealEstate() {
    const [openAccordion, setOpenAccordion] = useState(0);
    const carouselRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(0);

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

    const properties = [
        { id: 1, title: "Villa Nova", price: "€4.5M", location: "Marbella, Spain", img: "https://loremflickr.com/1200/1600/mansion,luxury?random=1" },
        { id: 2, title: "The Penthouse", price: "€2.1M", location: "Dubai, UAE", img: "https://loremflickr.com/1200/1600/mansion,luxury?random=2" },
        { id: 3, title: "Coastal Estate", price: "€8.9M", location: "Malibu, USA", img: "https://loremflickr.com/1200/1600/mansion,luxury?random=3" },
        { id: 4, title: "Alpine Retreat", price: "€6.2M", location: "St. Moritz, CH", img: "https://loremflickr.com/1200/1600/mansion,luxury?random=4" }
    ];

    const accordionData = [
        { title: "Amenities", content: "State-of-the-art smart home integration, infinity pool with panoramic views, private cinema room, subterranean wine cellar with climate control, and a fully equipped wellness center including sauna and steam room." },
        { title: "Location", content: "Perched atop the exclusive hills of the golden mile, offering absolute privacy while being merely minutes away from world-class dining, luxury boutiques, and the pristine coastline." },
        { title: "Floorplan", content: "Expansive 1,200 sqm of meticulously designed living space spread across three levels. Features include a grand double-height entrance, 6 en-suite bedrooms, staff quarters, and an 8-car gallery garage." }
    ];

    return (
        <div className="bg-[#0A1128] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-[#0A1128] overflow-x-hidden">
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/" className="group flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                        <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                            <ArrowLeft className="w-5 h-5" />
                        </motion.div>
                        <span className="text-sm tracking-widest uppercase font-medium">Catálogo</span>
                    </Link>
                </div>
                <div className="text-2xl md:text-3xl font-serif tracking-widest text-[#D4AF37] uppercase text-center absolute left-1/2 -translate-x-1/2">
                    Vantage
                </div>
                <div className="hidden md:block text-sm tracking-widest uppercase font-medium text-white/80">
                    Est. 2024
                </div>
            </nav>

            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img src="https://loremflickr.com/1920/1080/mansion,luxury?random=hero" alt="Luxury Mansion" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/40 via-transparent to-[#0A1128]"></div>
                </motion.div>
                <div className="relative z-10 flex flex-col items-center text-center px-4 mt-20">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="text-6xl md:text-9xl font-serif text-white tracking-tighter mb-6"
                    >
                        Beyond Living
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                        className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-lg"
                    >
                        Curating the world&apos;s most extraordinary homes
                    </motion.p>
                </div>
            </section>

            <section className="py-32 px-6 md:px-12 bg-[#0A1128]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <h2 className="text-4xl md:text-6xl font-serif text-white max-w-2xl leading-tight">
                        Exclusive <span className="text-[#D4AF37] italic">Properties</span>
                    </h2>
                    <p className="text-white/60 max-w-sm font-light leading-relaxed">
                        Swipe to explore our handpicked selection of exceptional estates designed for the most discerning individuals.
                    </p>
                </div>
                
                <div className="relative w-full overflow-hidden" ref={carouselRef}>
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -carouselWidth }}
                        className="flex gap-8 cursor-grab active:cursor-grabbing w-max pr-[10vw]"
                    >
                        {properties.map((prop, idx) => (
                            <motion.div
                                key={prop.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="relative w-[85vw] md:w-[40vw] h-[60vh] md:h-[70vh] flex-shrink-0 group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[#0A1128]/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    src={prop.img}
                                    alt={prop.title}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                                    draggable={false}
                                />
                                <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-[#0A1128] to-transparent pointer-events-none">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="flex items-center gap-2 text-[#D4AF37] text-sm uppercase tracking-widest mb-2 font-medium">
                                                <MapPin className="w-4 h-4" /> {prop.location}
                                            </p>
                                            <h3 className="text-3xl md:text-4xl font-serif text-white">{prop.title}</h3>
                                        </div>
                                        <p className="text-2xl font-light text-white">{prop.price}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-32 px-6 md:px-12 bg-[#0d1530]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[4/5] w-full"
                    >
                        <img src="https://loremflickr.com/1000/1200/mansion,interior?random=details" alt="Interior" className="w-full h-full object-cover" />
                        <div className="absolute -bottom-10 -right-10 w-48 md:w-64 aspect-square bg-[#D4AF37] p-8 flex flex-col justify-center items-center text-center z-10 hidden md:flex">
                            <span className="text-5xl font-serif text-[#0A1128] mb-2">24/7</span>
                            <span className="text-[#0A1128] text-sm tracking-widest uppercase font-semibold">Concierge</span>
                        </div>
                    </motion.div>
                    
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="text-4xl md:text-6xl font-serif text-white mb-12"
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
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-16 grid grid-cols-3 gap-6 border-t border-[#D4AF37]/20 pt-12"
                        >
                            <div className="flex flex-col gap-2">
                                <Bed className="w-6 h-6 text-[#D4AF37]" />
                                <span className="text-3xl font-light text-white">6</span>
                                <span className="text-xs uppercase tracking-widest text-white/50">Bedrooms</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Bath className="w-6 h-6 text-[#D4AF37]" />
                                <span className="text-3xl font-light text-white">8</span>
                                <span className="text-xs uppercase tracking-widest text-white/50">Bathrooms</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Square className="w-6 h-6 text-[#D4AF37]" />
                                <span className="text-3xl font-light text-white">1.2k</span>
                                <span className="text-xs uppercase tracking-widest text-white/50">Sq. Meters</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-40 px-6 md:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#0A1128]">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,100 M100,0 L0,100" stroke="#D4AF37" strokeWidth="0.5" />
                    </svg>
                </div>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-8xl font-serif text-white mb-10 max-w-4xl"
                >
                    Ready to step into <span className="text-[#D4AF37] italic">extraordinary</span>?
                </motion.h2>
                
                <MagneticButton className="relative group cursor-pointer inline-block mt-8">
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                    <div className="relative px-12 py-6 border border-[#D4AF37] rounded-full flex items-center justify-center gap-4 transition-colors duration-500 group-hover:border-transparent">
                        <span className="text-[#D4AF37] group-hover:text-[#0A1128] uppercase tracking-[0.2em] font-medium text-sm transition-colors duration-500">
                            Contact Private Agent
                        </span>
                    </div>
                </MagneticButton>
            </section>

            <footer className="px-6 md:px-12 py-12 bg-[#050914] text-white/60 text-sm font-light flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="font-serif text-2xl text-white tracking-widest uppercase">
                    Vantage
                </div>
                <div className="flex gap-8 uppercase tracking-widest text-xs">
                    <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy</a>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms</a>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors">Imprint</a>
                </div>
                <div className="flex gap-4">
                    <MagneticButton>
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </MagneticButton>
                </div>
            </footer>
        </div>
    );
}
