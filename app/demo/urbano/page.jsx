"use client";

import { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence, useInView } from "framer-motion";
import { ShoppingBag, Clock, Zap, ArrowUpRight, Mail, Menu, X } from "lucide-react";
import Link from "next/link";

const SIZES = [
  { label: "XS", soldOut: false },
  { label: "S",  soldOut: true  },
  { label: "M",  soldOut: false },
  { label: "L",  soldOut: false },
  { label: "XL", soldOut: true  },
  { label: "XXL",soldOut: false },
];

const COLLECTION = [
  { name: "WRAITH HOODIE",   price: "€185", tag: "NEW DROP",    tagColor: "#FFE500", lock: 2 },
  { name: "BONE CARGO",      price: "€145", tag: "LAST UNITS",  tagColor: "#FF3B3B", lock: 3 },
  { name: "GHOST TEE Vol.3", price: "€65",  tag: "ALMOST GONE", tagColor: "#FF8C00", lock: 4 },
  { name: "DEAD CAP",        price: "€55",  tag: "COLLAB",      tagColor: "#00D4FF", lock: 5 },
];

const DROPS = [
  { name: "IRON CURTAIN JACKET",      date: "Jun 30, 2025 · 12:00 CET", status: "LIVE"     },
  { name: "BONE CARGO Vol.2",         date: "Jul 15, 2025 · 12:00 CET", status: "UPCOMING" },
  { name: "GHOST TEE Vol.4 × COLLAB", date: "Aug 1,  2025 · 12:00 CET", status: "RUMORED"  },
];

const STATUS_STYLES = {
  LIVE:     { bg: "#FFE500", color: "#111" },
  UPCOMING: { bg: "#111",    color: "#F5F0E8" },
  RUMORED:  { bg: "#444",    color: "#F5F0E8" },
};

const MARQUEE_TEXT = "LIMITED · AUTHENTIC · RARE · DEADSTOCK · NO RESTOCK · ";

function getTargetDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function calcTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  const s = Math.floor(diff / 1000);
  return {
    days:    pad(Math.floor(s / 86400)),
    hours:   pad(Math.floor((s % 86400) / 3600)),
    minutes: pad(Math.floor((s % 3600) / 60)),
    seconds: pad(s % 60),
  };
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      if (e.target.closest("a,button,[data-hover]")) setHovered(true);
    };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <m.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovered ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        style={{
          width: 12, height: 12, borderRadius: "50%",
          background: "#FFE500", mixBlendMode: "difference",
        }}
      />
      <m.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovered ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "1.5px solid #FFE500", mixBlendMode: "difference",
        }}
      />
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#111] border-[2px] md:border-[2.5px] border-[#111] text-[#FFE500] py-3 md:py-4 px-2 md:px-4 min-w-[65px] md:min-w-[90px]">
      <div className="font-mono text-3xl md:text-5xl font-black leading-none">{value}</div>
      <div className="text-[9px] md:text-[11px] tracking-[2px] md:tracking-[4px] text-[#888] mt-1 md:mt-2">{label}</div>
    </div>
  );
}

export default function DeadstockPage() {
  const TARGET = useRef(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(TARGET.current));
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [cartCount] = useState(2);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (carouselRef.current && isMobile) {
      setSliderWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [isMobile]);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(TARGET.current)), 1000);
    return () => clearInterval(id);
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const MENU_LINKS = ["LATEST DROP", "ARCHIVE", "LOOKBOOK", "ABOUT"];

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-[#F5F0E8] text-[#111] font-sans overflow-x-hidden md:cursor-none w-full min-h-screen relative">
        <Cursor />

        <AnimatePresence>
          {menuOpen && (
            <m.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[1001] bg-[#111] text-[#F5F0E8] flex flex-col pt-24 px-6 md:px-12"
            >
              <div className="flex flex-col gap-6 md:gap-8 mt-10">
                {MENU_LINKS.map((link, i) => (
                  <m.div
                    key={link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-[#FFE500] active:scale-95 transition-all inline-block"
                    >
                      {link}
                    </Link>
                  </m.div>
                ))}
              </div>
              <div className="mt-auto pb-10 flex justify-between items-center border-t border-[#333] pt-6">
                <span className="font-mono text-[10px] tracking-widest text-[#888]">NO RESTOCK. EVER.</span>
                <div className="flex gap-4">
                  {["IG", "TW", "DC"].map((s) => (
                    <a key={s} href="#" className="font-mono text-[10px] tracking-widest hover:text-[#FFE500]">{s}</a>
                  ))}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <nav className="fixed top-0 left-0 right-0 z-[1002] bg-[#F5F0E8] border-b-[2.5px] border-[#111] h-14 md:h-16 flex items-center justify-between px-3 md:px-8">
          <div className="flex items-center h-full">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="h-full flex items-center justify-center pr-4 md:pr-6 border-r-[2.5px] border-[#111] hover:bg-[#FFE500] active:bg-[#FFE500] transition-colors bg-transparent cursor-pointer outline-none"
            >
              {menuOpen ? <X size={24} color={menuOpen ? "#FFE500" : "#111"} className="mix-blend-difference" /> : <Menu size={24} color="#111" />}
            </button>
            <Link href="/" className="hidden md:flex items-center gap-2 font-mono text-[11px] font-black tracking-[2px] px-6 border-r-[2.5px] border-[#111] h-full hover:bg-[#FFE500] transition-colors">
              ← BACK
            </Link>
          </div>

          <div className="font-mono text-lg md:text-2xl font-black tracking-tighter absolute left-1/2 -translate-x-1/2 mix-blend-difference text-white pointer-events-none">
            DEADSTOCK
          </div>

          <div className="flex items-center h-full pl-4 md:pl-6 border-l-[2.5px] border-[#111] hover:bg-[#FFE500] cursor-pointer transition-colors active:scale-95">
            <ShoppingBag size={20} strokeWidth={2.5} className={menuOpen ? "text-[#F5F0E8] mix-blend-difference" : "text-[#111]"} />
            <span className="font-mono text-[10px] md:text-xs font-black bg-[#FFE500] text-[#111] rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border-[1.5px] border-[#111] ml-2">
              {cartCount}
            </span>
          </div>
        </nav>

        <section ref={heroRef} className="min-h-[100svh] pt-14 md:pt-16 flex flex-col justify-center items-center text-center border-b-[2.5px] border-[#111] relative px-4">
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-[#FFE500] border-2 border-[#111] px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8 font-mono text-[9px] md:text-xs font-black tracking-widest mt-6 md:mt-0"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3B3B] inline-block animate-pulse" />
            DROP IS ACTIVE
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black text-[clamp(3.5rem,15vw,11rem)] leading-[0.85] tracking-tighter uppercase m-0"
          >
            THE DROP<br />
            <span className="text-[#FFE500] style-stroke">IS LIVE</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-mono text-[10px] md:text-sm tracking-[2px] md:tracking-[4px] text-[#555] my-8 px-2 leading-relaxed"
          >
            IRON CURTAIN JACKET SS25 — LIMITED TO 100 UNITS
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex gap-1 md:gap-2 w-full max-w-[340px] md:max-w-2xl px-1"
          >
            <TimeBox value={timeLeft.days} label="DAYS" />
            <TimeBox value={timeLeft.hours} label="HRS" />
            <TimeBox value={timeLeft.minutes} label="MIN" />
            <TimeBox value={timeLeft.seconds} label="SEC" />
          </m.div>
        </section>

        <div className="bg-[#111] border-b-[2.5px] border-[#FFE500] overflow-hidden py-3 whitespace-nowrap">
          <m.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="font-mono text-[11px] md:text-sm font-black tracking-widest text-[#FFE500] mr-2">
                {MARQUEE_TEXT}
              </span>
            ))}
          </m.div>
        </div>

        <section className="flex flex-col lg:grid lg:grid-cols-2 border-b-[2.5px] border-[#111]">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-[#111] overflow-hidden h-[55vh] lg:h-auto min-h-[400px] lg:min-h-[700px] relative"
          >
            <m.img
              src="https://loremflickr.com/900/900/streetwear,urban,jacket?lock=1"
              alt="IRON CURTAIN JACKET SS25"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover block absolute inset-0"
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-12 lg:p-16 flex flex-col justify-center gap-8 md:gap-10"
          >
            <div>
              <div className="font-mono text-[10px] md:text-[11px] tracking-[3px] text-[#888] mb-3">
                SS25 COLLECTION · OUTERWEAR
              </div>
              <h2 className="font-black text-[clamp(2.2rem,6vw,4rem)] leading-[0.9] m-0 tracking-tighter uppercase">
                IRON CURTAIN<br />JACKET SS25
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 bg-[#111] h-2">
                <div className="w-[23%] bg-[#FFE500] h-full" />
              </div>
              <span className="font-mono text-[10px] md:text-xs font-black whitespace-nowrap">
                23 / 100 REMAINING
              </span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-black text-4xl md:text-5xl lg:text-6xl">€320</span>
              <span className="font-mono text-[10px] md:text-[11px] text-[#888] tracking-widest">INCL. TAX</span>
            </div>

            <div>
              <div className="font-mono text-[10px] md:text-[11px] tracking-[3px] mb-4 text-[#555]">SELECT SIZE</div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {SIZES.map((sz) => (
                  <button
                    key={sz.label}
                    onClick={() => !sz.soldOut && setSelectedSize(sz.label)}
                    disabled={sz.soldOut}
                    className={`
                      relative py-3 md:py-4 font-mono font-black text-xs md:text-sm tracking-widest transition-all active:scale-95 outline-none
                      ${sz.soldOut ? "cursor-not-allowed text-[#bbb] line-through border-2 border-[#ccc]" : "cursor-pointer"}
                      ${!sz.soldOut && selectedSize === sz.label ? "bg-[#111] text-[#FFE500] border-2 border-[#111] shadow-[3px_3px_0_#FFE500]" : ""}
                      ${!sz.soldOut && selectedSize !== sz.label ? "bg-transparent text-[#111] border-2 border-[#111] hover:bg-[#EAE4D8]" : ""}
                    `}
                  >
                    {sz.label}
                    {sz.soldOut && (
                      <span className="font-mono text-[8px] absolute bottom-1 right-1.5 tracking-wider text-[#bbb]">S/O</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-4 mt-2">
              <AnimatePresence mode="wait">
                {cartAdded ? (
                  <m.div
                    key="added"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-[#FFE500] border-[2.5px] border-[#111] p-4 md:p-5 font-mono font-black text-xs md:text-sm tracking-widest text-center shadow-[4px_4px_0_#111]"
                  >
                    ✓ ADDED TO BAG
                  </m.div>
                ) : (
                  <m.button
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={!isMobile && selectedSize ? { x: -3, y: -3, boxShadow: "6px 6px 0 #FFE500" } : {}}
                    whileTap={selectedSize ? { x: 0, y: 0, boxShadow: "0px 0px 0 #FFE500", scale: 0.98 } : {}}
                    onClick={handleAddToCart}
                    className={`
                      flex items-center justify-center gap-3 bg-[#111] text-[#FFE500] border-[2.5px] border-[#111]
                      p-4 md:p-5 font-mono font-black text-[11px] md:text-sm tracking-widest transition-all outline-none
                      ${selectedSize ? "cursor-pointer shadow-[4px_4px_0_#FFE500] opacity-100" : "cursor-not-allowed opacity-50"}
                    `}
                  >
                    <ShoppingBag size={18} />
                    {selectedSize ? "ADD TO BAG" : "SELECT A SIZE"}
                  </m.button>
                )}
              </AnimatePresence>
              <p className="font-mono text-[9px] md:text-[10px] text-[#888] tracking-widest text-center mt-2">
                NO RESTOCK · FINAL SALE · WORLDWIDE SHIPPING
              </p>
            </div>
          </m.div>
        </section>

        <section className="border-b-[2.5px] border-[#111] overflow-hidden">
          <div className="border-b-[2.5px] border-[#111] p-4 md:p-6 px-4 md:px-8 flex justify-between items-center">
            <h2 className="font-mono text-[10px] md:text-[11px] tracking-[4px] m-0 font-bold">SS25 COLLECTION</h2>
            <button className="font-mono text-[9px] md:text-[11px] tracking-[3px] bg-transparent border-none cursor-pointer flex items-center gap-2 hover:text-[#FFE500] active:scale-95 transition-all font-bold outline-none">
              VIEW ALL <ArrowUpRight size={14} />
            </button>
          </div>

          {isMobile ? (
            <div className="w-full relative py-6 bg-[#EAE4D8]">
              <m.div
                ref={carouselRef}
                className="flex cursor-grab active:cursor-grabbing px-4 gap-4"
                drag="x"
                dragConstraints={{ right: 0, left: -sliderWidth }}
                dragElastic={0.15}
              >
                {COLLECTION.map((item, i) => (
                  <m.div
                    key={item.name}
                    className="min-w-[80vw] border-[2.5px] border-[#111] relative bg-[#F5F0E8] flex-shrink-0 shadow-[4px_4px_0_#111]"
                  >
                    <div className="h-[350px] border-b-[2.5px] border-[#111] overflow-hidden relative">
                      <img
                        src={`https://loremflickr.com/600/800/streetwear,urban,fashion?lock=${item.lock}`}
                        alt={item.name}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[9px] font-black tracking-widest px-2 py-1 border-[1.5px] border-[#111]" style={{ background: item.tagColor, color: ["#FFE500", "#00D4FF"].includes(item.tagColor) ? "#111" : "#fff" }}>
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <div className="font-black text-lg tracking-tight leading-none mb-2">{item.name}</div>
                        <div className="font-mono text-xs font-black">{item.price}</div>
                      </div>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>
          ) : (
            <div className="grid grid-cols-3 grid-rows-[auto_auto]">
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="col-start-1 col-end-2 row-start-1 row-end-3 border-r-[2.5px] border-[#111] relative overflow-hidden group"
              >
                <m.img
                  src={`https://loremflickr.com/700/900/streetwear,hoodie,urban?lock=${COLLECTION[0].lock}`}
                  alt={COLLECTION[0].name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover min-h-[600px] block"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-24 pointer-events-none">
                  <span className="inline-block text-[#111] font-mono text-[9px] font-black tracking-widest px-2 py-1 mb-3" style={{ background: COLLECTION[0].tagColor }}>
                    {COLLECTION[0].tag}
                  </span>
                  <div className="font-black text-3xl xl:text-4xl text-white tracking-tighter leading-none mb-2">
                    {COLLECTION[0].name}
                  </div>
                  <div className="font-mono text-base text-[#FFE500] font-bold">{COLLECTION[0].price}</div>
                </div>
              </m.div>

              {COLLECTION.slice(1).map((item, i) => (
                <m.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden group flex flex-col"
                  style={{
                    borderBottom: i < 2 ? "2.5px solid #111" : "none",
                    borderRight: i % 2 === 0 ? "2.5px solid #111" : "none",
                  }}
                  data-hover
                >
                  <div className="overflow-hidden flex-1 relative">
                    <m.img
                      src={`https://loremflickr.com/500/400/streetwear,urban,fashion?lock=${item.lock}`}
                      alt={item.name}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-[300px] object-cover block"
                    />
                  </div>
                  <div className="p-4 bg-[#F5F0E8] border-t-[2.5px] border-[#111]">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-black text-base xl:text-lg tracking-tight leading-none mb-2">{item.name}</div>
                        <div className="font-mono text-xs font-black">{item.price}</div>
                      </div>
                      <span className="font-mono text-[8px] font-black tracking-widest px-2 py-1 whitespace-nowrap" style={{ background: item.tagColor, color: ["#FFE500", "#00D4FF"].includes(item.tagColor) ? "#111" : "#fff" }}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          )}
        </section>

        <section className="border-b-[2.5px] border-[#111]">
          <div className="border-b-[2.5px] border-[#111] p-4 md:p-6 px-4 md:px-8 flex items-center gap-3 bg-[#EAE4D8] md:bg-transparent">
            <Clock size={16} />
            <h2 className="font-mono text-[10px] md:text-[11px] tracking-[4px] m-0 font-bold">DROP SCHEDULE</h2>
          </div>

          {DROPS.map((drop, i) => {
            const st = STATUS_STYLES[drop.status];
            return (
              <m.div
                key={drop.name}
                initial={{ opacity: 0, x: isMobile ? -10 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={!isMobile ? { paddingLeft: "3rem", backgroundColor: drop.status === "LIVE" ? "#FFE500" : "#EAE4D8" } : {}}
                whileTap={isMobile ? { scale: 0.98, backgroundColor: drop.status === "LIVE" ? "#FFE500" : "#EAE4D8" } : {}}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 px-4 md:px-8 border-b-[2.5px] border-[#111] cursor-pointer transition-all gap-4 md:gap-0"
              >
                <div className="flex items-start md:items-center gap-4 md:gap-5">
                  {drop.status === "LIVE" ? (
                    <Zap size={20} color="#FFE500" fill="#FFE500" className="bg-[#111] p-1 flex-shrink-0 mt-0.5 md:mt-0" />
                  ) : (
                    <div className="w-5" />
                  )}
                  <div>
                    <div className="font-black text-[clamp(1rem,3vw,1.4rem)] tracking-tighter uppercase leading-none mb-2">
                      {drop.name}
                    </div>
                    <div className="font-mono text-[9px] md:text-[10px] text-[#666] tracking-[2px]">
                      {drop.date}
                    </div>
                  </div>
                </div>
                <div className="self-start md:self-auto ml-9 md:ml-0">
                  <span className="font-mono text-[8px] md:text-[9px] font-black tracking-[2px] px-3 py-1.5 border-[1.5px] border-[#111]" style={{ background: st.bg, color: st.color }}>
                    {drop.status}
                  </span>
                </div>
              </m.div>
            );
          })}
        </section>

        <section className="bg-[#111] text-[#F5F0E8] py-16 md:py-24 px-4 md:px-8 border-b-[2.5px] border-[#FFE500]">
          <div className="max-w-[900px] mx-auto">
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="font-mono text-[9px] md:text-[11px] tracking-[4px] text-[#666] mb-6">
                ABOUT THE BRAND
              </div>
              <h2 className="font-black text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-tighter mb-8 md:mb-12 uppercase">
                We don't<br />
                <span className="text-[#FFE500]">restock.</span>
              </h2>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
                <p className="font-mono text-xs md:text-sm leading-[1.8] text-[#bbb] m-0 pr-4">
                  DEADSTOCK was born from the idea that scarcity isn't a gimmick — it's a principle.
                  Every piece we put out into the world is a deliberate, unrepeatable moment. Once it's gone,
                  it's gone. No reruns. No second chances. That's the deal.
                </p>
                <p className="font-mono text-xs md:text-sm leading-[1.8] text-[#bbb] m-0 pr-4">
                  We obsess over materials, silhouettes, and construction. Not to justify a price tag,
                  but because we believe what you wear should outlast the hype. Built for the real ones.
                  Worn by people who know. If you're reading this, you already get it.
                </p>
              </div>

              <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-0 mt-16 md:mt-20 border-t-[1.5px] border-[#333] pt-10">
                {[
                  { n: "100", label: "UNITS PER DROP" },
                  { n: "0%",  label: "RESTOCK RATE" },
                  { n: "SS25", label: "CURRENT SEASON" },
                ].map((s, i) => (
                  <m.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`md:py-8 ${i < 2 ? "md:border-r border-[#333]" : ""} ${i > 0 ? "md:pl-8 lg:pl-10" : ""}`}
                  >
                    <div className="font-black text-5xl md:text-6xl lg:text-7xl text-[#FFE500] leading-none mb-3">
                      {s.n}
                    </div>
                    <div className="font-mono text-[9px] tracking-[3px] text-[#666]">
                      {s.label}
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        <section className="border-b-[2.5px] border-[#111] py-16 md:py-24 px-4 md:px-8 bg-[#EAE4D8]">
          <div className="max-w-[650px] mx-auto text-center">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Mail size={32} strokeWidth={1.5} className="mb-6 md:mb-8 mx-auto text-[#111]" />
              <h2 className="font-black text-[clamp(2rem,6vw,4rem)] leading-[0.9] tracking-tighter uppercase m-0 mb-4 md:mb-5">
                Get notified<br />before the drop.
              </h2>
              <p className="font-mono text-[9px] md:text-[11px] text-[#666] tracking-[2px] md:tracking-[3px] mb-8 md:mb-10">
                DROP ALERTS · EARLY ACCESS · INSIDER INFO
              </p>

              <AnimatePresence mode="wait">
                {subscribed ? (
                  <m.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#FFE500] border-[2.5px] border-[#111] p-5 font-mono font-black text-[10px] md:text-xs tracking-widest shadow-[5px_5px_0_#111] mx-4 md:mx-0"
                  >
                    ✓ YOU'RE ON THE LIST. STAY READY.
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                    className="flex flex-col md:flex-row gap-4 md:gap-0 max-w-[500px] mx-auto px-4 md:px-0"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOUR EMAIL ADDRESS"
                      required
                      className="flex-1 border-[2.5px] border-[#111] md:border-r-0 bg-[#F5F0E8] p-4 font-mono text-[10px] tracking-widest outline-none text-[#111] placeholder:text-[#888] focus:bg-[#fff] transition-colors rounded-none"
                    />
                    <m.button
                      type="submit"
                      whileHover={!isMobile ? { x: -2, y: -2, boxShadow: "5px 5px 0 #FFE500" } : {}}
                      whileTap={{ x: 0, y: 0, scale: 0.98, boxShadow: "0px 0px 0 #FFE500" }}
                      className="bg-[#111] text-[#FFE500] border-[2.5px] border-[#111] p-4 font-mono font-black text-[10px] tracking-widest cursor-pointer shadow-[4px_4px_0_#FFE500] active:shadow-none transition-all outline-none"
                    >
                      NOTIFY ME
                    </m.button>
                  </m.form>
                )}
              </AnimatePresence>

              <p className="font-mono text-[8px] md:text-[9px] text-[#aaa] tracking-[2px] mt-8">
                NO SPAM · UNSUBSCRIBE ANYTIME · DROPS ONLY
              </p>
            </m.div>
          </div>
        </section>

        <footer className="bg-[#111] text-[#F5F0E8] py-12 md:py-16 px-4 md:px-8">
          <div className="flex flex-col gap-10 md:gap-12 max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start border-b border-[#333] pb-10 md:pb-12 gap-8 lg:gap-0">
              <div>
                <div className="font-mono text-[clamp(1.4rem,3vw,2rem)] font-black tracking-tighter mb-3 md:mb-4">
                  DEADSTOCK
                </div>
                <div className="font-mono text-[9px] md:text-[10px] text-[#666] tracking-[2px] leading-[1.8]">
                  STREETWEAR · SS25<br />
                  DROPS EVERY SEASON<br />
                  NO RESTOCK. EVER.
                </div>
              </div>

              <div className="flex flex-col gap-4 md:gap-5 w-full lg:w-auto">
                <div className="font-mono text-[8px] md:text-[9px] tracking-[4px] text-[#555]">FOLLOW THE DROP</div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  {["INSTAGRAM", "TW/X", "DISCORD"].map((s) => (
                    <m.a
                      key={s}
                      href="#"
                      whileHover={!isMobile ? { color: "#FFE500", letterSpacing: "4px" } : {}}
                      whileTap={{ scale: 0.95 }}
                      className="font-mono text-[10px] md:text-[11px] font-black tracking-widest text-[#F5F0E8] transition-all border-b border-[#333] md:border-none pb-2 md:pb-0 block w-full md:w-auto hover:text-[#FFE500]"
                    >
                      {s}
                    </m.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
              <span className="font-mono text-[8px] md:text-[9px] text-[#555] tracking-[2px] order-2 md:order-1 leading-[1.8]">
                © 2025 DEADSTOCK. ALL RIGHTS RESERVED. ALL DROPS FINAL.
              </span>
              <div className="flex flex-wrap gap-4 md:gap-6 order-1 md:order-2">
                {["PRIVACY", "TERMS", "SHIPPING", "RETURNS"].map((l) => (
                  <a key={l} href="#" className="font-mono text-[8px] md:text-[9px] text-[#555] tracking-[2px] hover:text-[#F5F0E8] transition-colors">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <style>{`
          .style-stroke {
            -webkit-text-stroke: 1.5px #111;
          }
          @media (min-width: 768px) {
            .style-stroke {
              -webkit-text-stroke: 3px #111;
            }
          }
        `}</style>
      </div>
    </LazyMotion>
  );
}