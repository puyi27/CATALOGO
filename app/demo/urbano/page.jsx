"use client";

import { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence, useInView } from "framer-motion";
import { ShoppingBag, Clock, Zap, ArrowUpRight, Mail } from "lucide-react";
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
    <>
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
    </>
  );
}

function TimeBox({ value, label }) {
  return (
    <div style={{
      border: "2.5px solid #111", background: "#111", color: "#FFE500",
      minWidth: 80, padding: "12px 18px", textAlign: "center",
    }}>
      <div style={{ fontFamily: "monospace", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 10, letterSpacing: 3, color: "#888", marginTop: 4 }}>{label}</div>
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

  return (
    <LazyMotion features={domAnimation}>
      <div style={{ background: "#F5F0E8", color: "#111", fontFamily: "'Arial Black', Arial, sans-serif", cursor: "none", overflowX: "hidden" }}>
        <Cursor />

        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: "#F5F0E8", borderBottom: "2.5px solid #111",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 2rem", height: 60,
        }}>
          <Link href="/" style={{
            fontFamily: "monospace", fontSize: 12, fontWeight: 700,
            color: "#111", textDecoration: "none", letterSpacing: 2,
            display: "flex", alignItems: "center", gap: 6,
            borderRight: "2px solid #111", paddingRight: "1.5rem",
          }}>
            ← Catálogo
          </Link>

          <div style={{ fontFamily: "monospace", fontSize: "clamp(1rem,2.5vw,1.4rem)", fontWeight: 900, letterSpacing: -1 }}>
            DEAD//STOCK
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, borderLeft: "2px solid #111", paddingLeft: "1.5rem" }}>
            <ShoppingBag size={20} strokeWidth={2.5} />
            <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 900, background: "#FFE500", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #111" }}>
              {cartCount}
            </span>
          </div>
        </nav>

        <section ref={heroRef} style={{
          minHeight: "100vh", paddingTop: 60, display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", textAlign: "center",
          borderBottom: "2.5px solid #111", position: "relative",
          background: "#F5F0E8",
        }}>
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#FFE500", border: "2px solid #111",
              padding: "6px 18px", marginBottom: 24, fontFamily: "monospace",
              fontSize: 12, fontWeight: 900, letterSpacing: 3,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3B3B", display: "inline-block", animation: "pulse 1s infinite" }} />
            DROP IS ACTIVE — WHILE STOCK LASTS
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: "clamp(3rem, 12vw, 11rem)",
              fontWeight: 900, lineHeight: 0.88,
              letterSpacing: -4, textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            THE DROP<br />
            <span style={{ color: "#FFE500", WebkitTextStroke: "3px #111" }}>IS LIVE</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: 3, color: "#555", marginBottom: 40 }}
          >
            IRON CURTAIN JACKET SS25 — LIMITED TO 100 UNITS
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            style={{ display: "flex", gap: 4, marginBottom: 60 }}
          >
            <TimeBox value={timeLeft.days}    label="DAYS"    />
            <TimeBox value={timeLeft.hours}   label="HRS"     />
            <TimeBox value={timeLeft.minutes} label="MIN"     />
            <TimeBox value={timeLeft.seconds} label="SEC"     />
          </m.div>
        </section>

        <div style={{
          background: "#111", borderBottom: "2.5px solid #FFE500",
          overflow: "hidden", padding: "14px 0", whiteSpace: "nowrap",
        }}>
          <m.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 900, letterSpacing: 4, color: "#FFE500", marginRight: 0 }}>
                {MARQUEE_TEXT}
              </span>
            ))}
          </m.div>
        </div>

        <section style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          borderBottom: "2.5px solid #111",
        }}>
          <m.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ borderRight: "2.5px solid #111", overflow: "hidden", minHeight: 600 }}
          >
            <m.img
              src="https://loremflickr.com/900/900/streetwear,urban,jacket?lock=1"
              alt="IRON CURTAIN JACKET SS25"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ padding: "3rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}
          >
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 4, color: "#888", marginBottom: 8 }}>
                SS25 COLLECTION · OUTERWEAR
              </div>
              <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 900, lineHeight: 1, margin: 0 }}>
                IRON CURTAIN<br />JACKET SS25
              </h2>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, background: "#111", height: 6, borderRadius: 0 }}>
                <div style={{ width: "23%", background: "#FFE500", height: "100%" }} />
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 900, whiteSpace: "nowrap" }}>
                23 / 100 REMAINING
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900 }}>€320</span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#888", letterSpacing: 2 }}>INCL. TAX</span>
            </div>

            <div>
              <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 12, color: "#555" }}>SELECT SIZE</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {SIZES.map((sz) => (
                  <button
                    key={sz.label}
                    onClick={() => !sz.soldOut && setSelectedSize(sz.label)}
                    disabled={sz.soldOut}
                    style={{
                      border: `2px solid ${selectedSize === sz.label ? "#FFE500" : "#111"}`,
                      background: selectedSize === sz.label ? "#111" : "transparent",
                      color: sz.soldOut ? "#bbb" : selectedSize === sz.label ? "#FFE500" : "#111",
                      fontFamily: "monospace", fontWeight: 900, fontSize: 13, letterSpacing: 2,
                      padding: "10px 0", cursor: sz.soldOut ? "not-allowed" : "pointer",
                      textDecoration: sz.soldOut ? "line-through" : "none",
                      position: "relative", transition: "all 0.15s",
                      boxShadow: selectedSize === sz.label ? "3px 3px 0 #FFE500" : "none",
                    }}
                  >
                    {sz.label}
                    {sz.soldOut && (
                      <span style={{ fontFamily: "monospace", fontSize: 8, position: "absolute", bottom: 2, right: 4, letterSpacing: 1, color: "#bbb" }}>S/O</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <AnimatePresence mode="wait">
                {cartAdded ? (
                  <m.div
                    key="added"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      background: "#FFE500", border: "2.5px solid #111",
                      padding: "16px 28px", fontFamily: "monospace",
                      fontWeight: 900, fontSize: 14, letterSpacing: 3,
                      textAlign: "center", boxShadow: "4px 4px 0 #111",
                    }}
                  >
                    ✓ ADDED TO BAG
                  </m.div>
                ) : (
                  <m.button
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ x: -3, y: -3, boxShadow: "6px 6px 0 #FFE500" }}
                    whileTap={{ x: 0, y: 0, boxShadow: "2px 2px 0 #FFE500" }}
                    onClick={handleAddToCart}
                    style={{
                      background: "#111", color: "#FFE500",
                      border: "2.5px solid #111", padding: "16px 28px",
                      fontFamily: "monospace", fontWeight: 900, fontSize: 14,
                      letterSpacing: 3, cursor: selectedSize ? "pointer" : "not-allowed",
                      boxShadow: "4px 4px 0 #FFE500", opacity: selectedSize ? 1 : 0.5,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    }}
                  >
                    <ShoppingBag size={18} />
                    {selectedSize ? "ADD TO BAG" : "SELECT A SIZE"}
                  </m.button>
                )}
              </AnimatePresence>
              <p style={{ fontFamily: "monospace", fontSize: 10, color: "#888", letterSpacing: 2, textAlign: "center" }}>
                NO RESTOCK · FINAL SALE · WORLDWIDE SHIPPING
              </p>
            </div>
          </m.div>
        </section>

        <section style={{ borderBottom: "2.5px solid #111" }}>
          <div style={{
            borderBottom: "2px solid #111", padding: "24px 2rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <h2 style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 4, margin: 0 }}>SS25 COLLECTION</h2>
            <button style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 3, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              VIEW ALL <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
          }}>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                gridColumn: "1 / 2", gridRow: "1 / 3",
                borderRight: "2.5px solid #111", position: "relative", overflow: "hidden",
              }}
            >
              <m.img
                src={`https://loremflickr.com/700/900/streetwear,hoodie,urban?lock=${COLLECTION[0].lock}`}
                alt={COLLECTION[0].name}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 520, display: "block" }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)",
                padding: "2rem 1.5rem",
              }}>
                <span style={{
                  display: "inline-block", background: COLLECTION[0].tagColor,
                  color: "#111", fontFamily: "monospace", fontSize: 10,
                  fontWeight: 900, letterSpacing: 2, padding: "3px 10px",
                  marginBottom: 8,
                }}>{COLLECTION[0].tag}</span>
                <div style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.2rem,2vw,1.8rem)", fontWeight: 900, color: "#fff" }}>
                  {COLLECTION[0].name}
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 14, color: "#FFE500", marginTop: 4 }}>{COLLECTION[0].price}</div>
              </div>
            </m.div>

            {COLLECTION.slice(1).map((item, i) => (
              <m.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  borderBottom: i < 2 ? "2.5px solid #111" : "none",
                  borderRight: i % 2 === 0 ? "2.5px solid #111" : "none",
                  position: "relative", overflow: "hidden",
                }}
                data-hover
              >
                <m.img
                  src={`https://loremflickr.com/500/400/streetwear,urban,fashion?lock=${item.lock}`}
                  alt={item.name}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.45 }}
                  style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "1rem 1.2rem", background: "#F5F0E8", borderTop: "2px solid #111" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: 14, fontWeight: 900, lineHeight: 1.2 }}>{item.name}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 900, marginTop: 4 }}>{item.price}</div>
                    </div>
                    <span style={{
                      background: item.tagColor, color: ["#FFE500", "#00D4FF"].includes(item.tagColor) ? "#111" : "#fff",
                      fontFamily: "monospace", fontSize: 9, fontWeight: 900, letterSpacing: 2,
                      padding: "3px 8px", whiteSpace: "nowrap",
                    }}>{item.tag}</span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </section>

        <section style={{ borderBottom: "2.5px solid #111" }}>
          <div style={{ borderBottom: "2px solid #111", padding: "24px 2rem", display: "flex", alignItems: "center", gap: 12 }}>
            <Clock size={16} />
            <h2 style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 4, margin: 0 }}>DROP SCHEDULE</h2>
          </div>

          {DROPS.map((drop, i) => {
            const st = STATUS_STYLES[drop.status];
            return (
              <m.div
                key={drop.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ paddingLeft: "3rem", background: drop.status === "LIVE" ? "#FFE500" : "#f0ebe0" }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "1.6rem 2rem", borderBottom: "1.5px solid #222",
                  transition: "all 0.2s", cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  {drop.status === "LIVE" && <Zap size={18} color="#FFE500" fill="#FFE500" style={{ background: "#111", padding: 2 }} />}
                  <div>
                    <div style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(0.9rem,2vw,1.2rem)", fontWeight: 900 }}>
                      {drop.name}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "#666", letterSpacing: 2, marginTop: 4 }}>
                      {drop.date}
                    </div>
                  </div>
                </div>
                <span style={{
                  background: st.bg, color: st.color,
                  fontFamily: "monospace", fontSize: 10, fontWeight: 900,
                  letterSpacing: 3, padding: "5px 14px", border: "1.5px solid #111",
                }}>
                  {drop.status}
                </span>
              </m.div>
            );
          })}
        </section>

        <section style={{
          background: "#111", color: "#F5F0E8",
          padding: "8rem 2rem", borderBottom: "2.5px solid #FFE500",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <m.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 4, color: "#666", marginBottom: 24 }}>
                ABOUT THE BRAND
              </div>
              <h2 style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontSize: "clamp(2.5rem,8vw,7rem)", fontWeight: 900,
                lineHeight: 0.9, letterSpacing: -3, margin: "0 0 3rem",
              }}>
                We don't<br />
                <span style={{ color: "#FFE500" }}>restock.</span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
                <p style={{ fontFamily: "monospace", fontSize: 15, lineHeight: 1.9, color: "#bbb", margin: 0 }}>
                  DEADSTOCK was born from the idea that scarcity isn't a gimmick — it's a principle.
                  Every piece we put out into the world is a deliberate, unrepeatable moment. Once it's gone,
                  it's gone. No reruns. No second chances. That's the deal.
                </p>
                <p style={{ fontFamily: "monospace", fontSize: 15, lineHeight: 1.9, color: "#bbb", margin: 0 }}>
                  We obsess over materials, silhouettes, and construction. Not to justify a price tag,
                  but because we believe what you wear should outlast the hype. Built for the real ones.
                  Worn by people who know. If you're reading this, you already get it.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: "5rem", borderTop: "1.5px solid #333" }}>
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
                    style={{
                      padding: "2.5rem 0", borderRight: i < 2 ? "1px solid #333" : "none",
                      paddingLeft: i > 0 ? "2rem" : 0,
                    }}
                  >
                    <div style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 900, color: "#FFE500", lineHeight: 1 }}>
                      {s.n}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, color: "#666", marginTop: 8 }}>
                      {s.label}
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        <section style={{ borderBottom: "2.5px solid #111", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Mail size={32} style={{ marginBottom: 20, stroke: "#111" }} />
              <h2 style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontSize: "clamp(1.8rem,5vw,4rem)", fontWeight: 900,
                lineHeight: 1, letterSpacing: -2, margin: "0 0 1rem",
              }}>
                Get notified<br />before the drop.
              </h2>
              <p style={{ fontFamily: "monospace", fontSize: 13, color: "#666", letterSpacing: 2, marginBottom: 36 }}>
                DROP ALERTS · EARLY ACCESS · INSIDER INFO
              </p>

              <AnimatePresence mode="wait">
                {subscribed ? (
                  <m.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: "#FFE500", border: "2.5px solid #111",
                      padding: "20px 36px", fontFamily: "monospace",
                      fontWeight: 900, fontSize: 14, letterSpacing: 3,
                      boxShadow: "5px 5px 0 #111",
                    }}
                  >
                    ✓ YOU'RE ON THE LIST. STAY READY.
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                    style={{ display: "flex", gap: 0, maxWidth: 560, margin: "0 auto" }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOUR EMAIL ADDRESS"
                      required
                      style={{
                        flex: 1, border: "2.5px solid #111", borderRight: "none",
                        background: "transparent", padding: "14px 18px",
                        fontFamily: "monospace", fontSize: 12, letterSpacing: 2,
                        outline: "none", color: "#111",
                      }}
                    />
                    <m.button
                      type="submit"
                      whileHover={{ x: -2, y: -2, boxShadow: "5px 5px 0 #FFE500" }}
                      whileTap={{ x: 0, y: 0 }}
                      style={{
                        background: "#111", color: "#FFE500",
                        border: "2.5px solid #111", padding: "14px 24px",
                        fontFamily: "monospace", fontWeight: 900, fontSize: 12,
                        letterSpacing: 3, cursor: "pointer",
                        boxShadow: "4px 4px 0 #FFE500",
                      }}
                    >
                      NOTIFY ME
                    </m.button>
                  </m.form>
                )}
              </AnimatePresence>

              <p style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", letterSpacing: 2, marginTop: 20 }}>
                NO SPAM · UNSUBSCRIBE ANYTIME · DROPS ONLY
              </p>
            </m.div>
          </div>
        </section>

        <footer style={{ background: "#111", color: "#F5F0E8", padding: "3rem 2rem" }}>
          <div style={{
            display: "flex", flexDirection: "column", gap: 28,
            maxWidth: 1200, margin: "0 auto",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              borderBottom: "1px solid #333", paddingBottom: "2rem",
              flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 900, letterSpacing: -1, marginBottom: 8 }}>
                  DEAD//STOCK
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "#666", letterSpacing: 2, lineHeight: 1.7 }}>
                  STREETWEAR · SS25<br />
                  DROPS EVERY SEASON<br />
                  NO RESTOCK. EVER.
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 4, color: "#555" }}>FOLLOW THE DROP</div>
                <div style={{ display: "flex", gap: 24 }}>
                  {["INSTAGRAM", "TW/X", "DISCORD"].map((s) => (
                    <m.a
                      key={s}
                      href="#"
                      whileHover={{ color: "#FFE500", letterSpacing: 4 }}
                      style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 900, letterSpacing: 3, color: "#F5F0E8", textDecoration: "none", transition: "color 0.2s" }}
                    >
                      {s}
                    </m.a>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "#555", letterSpacing: 2 }}>
                © 2025 DEADSTOCK. ALL RIGHTS RESERVED. ALL DROPS FINAL.
              </span>
              <div style={{ display: "flex", gap: 20 }}>
                {["PRIVACY", "TERMS", "SHIPPING", "RETURNS"].map((l) => (
                  <a key={l} href="#" style={{ fontFamily: "monospace", fontSize: 10, color: "#555", textDecoration: "none", letterSpacing: 2 }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <style>{`
          * { box-sizing: border-box; }
          body { cursor: none !important; }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @media (max-width: 768px) {
            section[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </LazyMotion>
  );
}