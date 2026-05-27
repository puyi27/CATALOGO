"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { Cpu, Layers, Monitor, Smartphone, Sparkles, ArrowUpRight, ChevronRight, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import DemoLayout from "@/components/DemoLayout";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function ScrambleText({ text, trigger = true, className = "", delay = 0 }) {
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    if (done) return;
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, idx) => {
            if (char === "\n") return "\n";
            if (idx < iteration) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setDisplay(text);
        setDone(true);
      }
      iteration += 0.4;
    }, 30);
  }, [text, done]);

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(scramble, delay);
    return () => {
      clearTimeout(t);
      clearInterval(intervalRef.current);
    };
  }, [trigger, scramble, delay]);

  return (
    <span className={className} style={{ whiteSpace: "pre-line" }}>
      {display}
    </span>
  );
}

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6 ? "#00d4ff" : Math.random() > 0.5 ? "#7c3aed" : "#ffffff",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = "#00d4ff";
            ctx.globalAlpha = (1 - dist / 100) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) setHovered(true);
      else setHovered(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
      animate={{ scale: hovered ? 2.5 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#00d4ff",
        }}
      />
    </motion.div>
  );
}

const SERVICES = [
  {
    title: "Product Design",
    desc: "UX investigación profunda, prototipado y sistemas de diseño. De la idea al pixel en semanas, no meses.",
    icon: Layers,
    num: "01",
  },
  {
    title: "Web Applications",
    desc: "Experiencias web de alto rendimiento. Animaciones fluidas, diseño responsivo y carga instantánea.",
    icon: Monitor,
    num: "02",
  },
  {
    title: "Mobile Apps",
    desc: "Apps nativas e híbridas con experiencias que rivalizan con las de grandes empresas tecnológicas.",
    icon: Smartphone,
    num: "03",
  },
  {
    title: "Brand Identity",
    desc: "Identidad visual, sistemas de diseño y branding interactivo para marcas digitales.",
    icon: Sparkles,
    num: "04",
  },
];

const PROJECTS = [
  {
    name: "KORA Finance",
    cat: "Fintech · Product Design",
    year: "2024",
    img: "https://loremflickr.com/800/600/technology,circuit?lock=1",
    color: "#00d4ff",
  },
  {
    name: "ATLAS Maps",
    cat: "SaaS · Web App",
    year: "2024",
    img: "https://loremflickr.com/800/600/map,data?lock=2",
    color: "#7c3aed",
  },
  {
    name: "LUMEN Health",
    cat: "Health · Mobile App",
    year: "2023",
    img: "https://loremflickr.com/800/600/health,technology?lock=3",
    color: "#00d4ff",
  },
];

const TEAM = [
  { name: "Marcos A.", role: "Founder · Creative Director", img: "https://loremflickr.com/400/400/man,portrait?lock=4" },
  { name: "Linh T.", role: "Head of Product", img: "https://loremflickr.com/400/400/woman,portrait?lock=5" },
  { name: "Diogo R.", role: "Lead Developer", img: "https://loremflickr.com/400/400/man,face?lock=6" },
  { name: "Aisha K.", role: "UX Researcher", img: "https://loremflickr.com/400/400/woman,face?lock=7" },
];

const STEPS = [
  { num: "01", label: "Descubrimiento" },
  { num: "02", label: "Estrategia" },
  { num: "03", label: "Diseño" },
  { num: "04", label: "Build" },
  { num: "05", label: "Launch" },
];

const STATS = [
  { val: 47, suffix: "", label: "Proyectos" },
  { val: 12, suffix: "", label: "Industrias" },
  { val: 98, suffix: "%", label: "Satisfacción" },
  { val: 3, suffix: "", label: "Años" },
];

export default function AxiomStudioPage() {
  const [heroReady, setHeroReady] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", type: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <DemoLayout title="Estudio de Tecnología">
    <div
      style={{
        color: "#e2e8f0",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <CustomCursor />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #00d4ff33; color: #00d4ff; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }
        .mesh-bg {
          background-image:
            radial-gradient(circle, #00d4ff08 1px, transparent 1px),
            radial-gradient(circle, #7c3aed05 1px, transparent 1px);
          background-size: 40px 40px, 80px 80px;
        }
        .glow-border {
          box-shadow: 0 0 0 1px #00d4ff44, 0 0 20px #00d4ff22;
        }
        .glow-border:hover {
          box-shadow: 0 0 0 1px #00d4ffaa, 0 0 30px #00d4ff44;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px #00d4ff15;
        }
        input, select, textarea {
          font-family: inherit;
          outline: none;
        }
        input::placeholder, textarea::placeholder {
          color: #475569;
        }
        .custom-cursor { display: none; }
        @media (pointer: fine) {
          .custom-cursor { display: block; }
        }
        .projects-scroll {
          display: flex;
          overflow-x: auto;
          gap: 1rem;
          scroll-snap-type: x mandatory;
          padding-bottom: 2rem;
          -webkit-overflow-scrolling: touch;
        }
        .project-card-wrap {
          flex: 0 0 85%;
          scroll-snap-align: center;
        }
        .project-card-inner {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 3/4;
          border: 1px solid #0f172a;
        }
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%) brightness(0.6);
          transition: all 0.6s ease;
        }
        .project-hover-overlay {
          position: absolute;
          inset: 0;
          opacity: 1;
          border-radius: 16px;
          transition: opacity 0.3s ease;
        }
        .project-details {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          transform: translateY(0);
          transition: transform 0.3s ease;
        }
        .project-link {
          margin-top: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        @media (min-width: 768px) {
          .projects-scroll {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            overflow-x: visible;
            padding-bottom: 0;
          }
          .project-card-wrap {
            flex: unset;
          }
          .project-img {
            filter: grayscale(60%) brightness(0.5);
          }
          .project-hover-overlay {
            opacity: 0;
          }
          .project-details {
            transform: translateY(10px);
          }
          .project-link {
            opacity: 0;
          }
          .project-card-inner:hover .project-img {
            filter: grayscale(0%) brightness(0.7);
          }
          .project-card-inner:hover .project-hover-overlay {
            opacity: 1;
          }
          .project-card-inner:hover .project-details {
            transform: translateY(-6px);
          }
          .project-card-inner:hover .project-link {
            opacity: 1;
          }
        }
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.98);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .hero-title {
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #f1f5f9 30%, #00d4ff 70%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .mobile-hidden { display: none; }
        .desktop-hidden { display: flex; }
        @media (min-width: 768px) {
          .mobile-hidden { display: flex; }
          .desktop-hidden { display: none; }
        }
      `}</style>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          height: 72,
          background: "rgba(2, 6, 23, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #ffffff08",
        }}
      >
        <Link
          href="/"
          className="mobile-hidden"
          style={{
            color: "#64748b",
            textDecoration: "none",
            fontSize: "0.8rem",
            letterSpacing: "0.05em",
            fontWeight: 500,
            alignItems: "center",
            gap: "0.4rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          ← Catálogo
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cpu size={16} color="#fff" />
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "0.95rem",
              letterSpacing: "0.12em",
              color: "#f1f5f9",
            }}
          >
            AXIOM.STUDIO
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="glow-border mobile-hidden"
          style={{
            background: "transparent",
            border: "1px solid #00d4ff55",
            color: "#00d4ff",
            padding: "0.45rem 1.1rem",
            borderRadius: 6,
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            cursor: "pointer",
            alignItems: "center",
            gap: "0.35rem",
            transition: "all 0.3s",
          }}
        >
          Iniciar Proyecto <ArrowUpRight size={13} />
        </motion.button>

        <button
          className="desktop-hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#e2e8f0",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
        {["Servicios", "Portfolio", "Equipo", "Contacto"].map((item, i) => (
          <a
            key={item}
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#f1f5f9",
              textDecoration: "none",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.4s ease ${i * 0.1}s`,
            }}
          >
            {item}
          </a>
        ))}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMenuOpen(false)}
          style={{
            background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
            color: "#020617",
            border: "none",
            padding: "1rem 2.5rem",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.04em",
            marginTop: "2rem",
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: menuOpen ? 1 : 0,
            transition: "all 0.4s ease 0.4s",
          }}
        >
          Iniciar Proyecto
        </motion.button>
      </div>

      <section
        className="mesh-bg"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "140px 1.5rem 4rem",
          overflow: "hidden",
        }}
      >
        <ParticleField />

        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "40vh",
            background: "radial-gradient(ellipse, #7c3aed15 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "20%",
            width: "40vw",
            height: "40vw",
            background: "radial-gradient(ellipse, #00d4ff10 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ position: "relative", zIndex: 2, maxWidth: 900, width: "100%" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#00d4ff0f",
              border: "1px solid #00d4ff22",
              borderRadius: 20,
              padding: "0.3rem 0.9rem",
              marginBottom: "2rem",
              fontSize: "0.72rem",
              color: "#00d4ff",
              fontWeight: 600,
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00d4ff",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }`}</style>
            DIGITAL PRODUCT STUDIO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hero-title text-6xl md:text-9xl tracking-tighter"
          >
            <ScrambleText text={"DIGITAL PRODUCTS\nTHAT MATTER."} trigger={heroReady} delay={200} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{
              fontSize: "clamp(1rem, 4vw, 1.2rem)",
              color: "#64748b",
              maxWidth: 580,
              margin: "0 auto 3rem",
              lineHeight: 1.6,
              padding: "0 1rem",
            }}
          >
            Diseñamos y construimos herramientas digitales que transforman industrias. Desde apps SaaS hasta plataformas interactivas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexDirection: "column", alignItems: "center" }}
          >
            <div style={{ display: "flex", gap: "1rem", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px #00d4ff44" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
                  color: "#020617",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  maxWidth: 280,
                }}
              >
                Ver Portfolio <ArrowUpRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "transparent",
                  color: "#e2e8f0",
                  border: "1px solid #334155",
                  padding: "1rem 2rem",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  maxWidth: 280,
                }}
              >
                Hablar con el equipo <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "#334155",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
          }}
        >
          SCROLL
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 1, height: 30, background: "linear-gradient(to bottom, #00d4ff, transparent)" }}
          />
        </motion.div>
      </section>

      <section style={{ padding: "5rem 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: "3rem" }}>
            <p style={{ color: "#00d4ff", fontSize: "1rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.8rem" }}>
              SERVICIOS
            </p>
            <h2 className="text-6xl md:text-8xl tracking-tighter" style={{ fontWeight: 800, lineHeight: 1.1 }}>
              Lo que construimos
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.num}
                  variants={fadeUp}
                  data-cursor
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "#0a0f1e",
                    border: "1px solid #0f172a",
                    borderRadius: 16,
                    padding: "2rem",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                  }}
                  whileHover={{
                    borderColor: "#00d4ff44",
                    backgroundColor: "#060d1f",
                    y: -4,
                    boxShadow: "0 20px 60px #00d4ff10, inset 0 0 60px #00d4ff05",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: "linear-gradient(90deg, transparent, #00d4ff33, transparent)",
                    }}
                  />

                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "#00d4ff10",
                      border: "1px solid #00d4ff22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <Icon size={20} color="#00d4ff" />
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.8rem", color: "#f1f5f9" }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }}>{svc.desc}</p>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1.5rem",
                      fontSize: "2.5rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {svc.num}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section
        style={{
          padding: "5rem 0 5rem 1.5rem",
          background: "#040a14",
          borderTop: "1px solid #0f172a",
          borderBottom: "1px solid #0f172a",
          overflow: "hidden"
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingRight: "1.5rem" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ color: "#7c3aed", fontSize: "1rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.8rem" }}>
                  PORTFOLIO
                </p>
                <h2 className="text-6xl md:text-8xl tracking-tighter" style={{ fontWeight: 800 }}>
                  Casos de estudio
                </h2>
              </div>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#00d4ff",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  letterSpacing: "0.04em",
                }}
              >
                Ver todos <ArrowUpRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="projects-scroll">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.name}
                data-cursor
                whileTap={{ scale: 0.98 }}
                className="project-card-wrap"
              >
                <div className="project-card-inner">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="project-img"
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, #020617ee 0%, transparent 50%)",
                    }}
                  />

                  <div
                    className="project-hover-overlay"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}22, transparent)`,
                      border: `1px solid ${p.color}44`,
                    }}
                  />

                  <div className="project-details">
                    <p style={{ color: p.color, fontSize: "0.65rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.4rem" }}>
                      {p.cat} · {p.year}
                    </p>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f1f5f9" }}>{p.name}</h3>
                    <div
                      className="project-link"
                      style={{ color: p.color }}
                    >
                      Ver caso <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={processRef}
        className="mesh-bg"
        style={{ padding: "6rem 1.5rem", maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: "4rem", textAlign: "center" }}>
            <p style={{ color: "#00d4ff", fontSize: "1rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.8rem" }}>
              PROCESO
            </p>
            <h2 className="text-6xl md:text-8xl tracking-tighter" style={{ fontWeight: 800 }}>
              Cómo trabajamos
            </h2>
          </motion.div>

          <div style={{ position: "relative", overflowX: "auto", paddingBottom: "1rem", WebkitOverflowScrolling: "touch" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 0,
                minWidth: 800,
                padding: "0 1rem",
              }}
            >
              {STEPS.map((step, i) => (
                <div key={step.num} style={{ flex: 1, position: "relative" }}>
                  {i < STEPS.length - 1 && (
                    <div style={{ position: "absolute", top: 20, left: "50%", right: "-50%", height: 1, zIndex: 0 }}>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={processInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                        style={{
                          transformOrigin: "left",
                          height: "100%",
                          background: "linear-gradient(90deg, #00d4ff44, #7c3aed44)",
                        }}
                      />
                    </div>
                  )}

                  <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={processInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ type: "spring", delay: i * 0.15, stiffness: 200 }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "#fff",
                        boxShadow: "0 0 20px #00d4ff44",
                      }}
                    >
                      {step.num}
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={processInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}
                    >
                      {step.label}
                    </motion.h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section
        style={{
          padding: "5rem 1.5rem",
          background: "#040a14",
          borderTop: "1px solid #0f172a",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "3rem", textAlign: "center" }}>
              <p style={{ color: "#7c3aed", fontSize: "1rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.8rem" }}>
                EQUIPO
              </p>
              <h2 className="text-6xl md:text-8xl tracking-tighter" style={{ fontWeight: 800 }}>
                Las personas detrás
              </h2>
              <p style={{ color: "#64748b", marginTop: "1rem", fontSize: "1rem" }}>
                Un equipo pequeño, comprometido y con criterio.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {TEAM.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  data-cursor
                  whileTap={{ scale: 0.98 }}
                  className="card-hover"
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "#0a0f1e",
                    border: "1px solid #0f172a",
                    cursor: "pointer",
                  }}
                  whileHover={{ borderColor: "#7c3aed44" }}
                >
                  <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1/1" }}>
                    <motion.img
                      src={member.img}
                      alt={member.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      initial={{ filter: "grayscale(100%) brightness(0.7)" }}
                      whileHover={{ filter: "grayscale(0%) brightness(0.9)" }}
                      transition={{ duration: 0.4 }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, #040a14 0%, transparent 60%)",
                      }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9", marginBottom: "0.3rem" }}>
                      {member.name}
                    </h3>
                    <p style={{ color: "#64748b", fontSize: "0.85rem", letterSpacing: "0.02em" }}>{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        style={{
          padding: "5rem 1.5rem",
          borderTop: "1px solid #0f172a",
          borderBottom: "1px solid #0f172a",
          background: "linear-gradient(135deg, #020617, #080d1c)",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2.5rem 1.5rem",
              textAlign: "center",
            }}
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <div
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <p style={{ color: "#475569", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.06em" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="mesh-bg"
        style={{ padding: "6rem 1.5rem" }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} style={{ color: "#00d4ff", fontSize: "1rem", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "1rem" }}>
              CONTACTO
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-6xl md:text-8xl tracking-tighter"
              style={{
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: "1.5rem",
                background: "linear-gradient(135deg, #f1f5f9, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Construyamos algo brutal.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: "#64748b", marginBottom: "3rem", fontSize: "1rem", lineHeight: 1.6 }}>
              Cuéntanos tu idea y te respondemos en menos de 24h con una propuesta inicial.
            </motion.p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.2rem", textAlign: "left" }}
                >
                  {[
                    { key: "name", label: "Nombre", placeholder: "Tu nombre completo", type: "text" },
                    { key: "company", label: "Empresa", placeholder: "Nombre de tu empresa o proyecto", type: "text" },
                  ].map((field) => (
                    <motion.div key={field.key} variants={fadeUp}>
                      <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                        {field.label.toUpperCase()}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        required
                        style={{
                          width: "100%",
                          background: "#0a0f1e",
                          border: "1px solid #1e293b",
                          borderRadius: 12,
                          padding: "1rem 1.2rem",
                          color: "#e2e8f0",
                          fontSize: "1rem",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#00d4ff44")}
                        onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
                      />
                    </motion.div>
                  ))}

                  <motion.div variants={fadeUp}>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                      TIPO DE PROYECTO
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                      required
                      style={{
                        width: "100%",
                        background: "#0a0f1e",
                        border: "1px solid #1e293b",
                        borderRadius: 12,
                        padding: "1rem 1.2rem",
                        color: formData.type ? "#e2e8f0" : "#475569",
                        fontSize: "1rem",
                        cursor: "pointer",
                        WebkitAppearance: "none",
                      }}
                    >
                      <option value="" disabled>Selecciona una opción...</option>
                      <option value="product-design">Product Design</option>
                      <option value="web-app">Web Application</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="brand">Brand Identity</option>
                      <option value="other">Otro</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                      PRESUPUESTO ESTIMADO
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                      required
                      style={{
                        width: "100%",
                        background: "#0a0f1e",
                        border: "1px solid #1e293b",
                        borderRadius: 12,
                        padding: "1rem 1.2rem",
                        color: formData.budget ? "#e2e8f0" : "#475569",
                        fontSize: "1rem",
                        cursor: "pointer",
                        WebkitAppearance: "none",
                      }}
                    >
                      <option value="" disabled>Selecciona un rango...</option>
                      <option value="5-15k">€5.000 – €15.000</option>
                      <option value="15-40k">€15.000 – €40.000</option>
                      <option value="40-100k">€40.000 – €100.000</option>
                      <option value="100k+">€100.000+</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeUp} style={{ paddingTop: "1rem" }}>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: "0 0 40px #00d4ff44" }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
                        color: "#020617",
                        border: "none",
                        padding: "1.2rem",
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: "1rem",
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Enviar propuesta <ArrowUpRight size={18} />
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: "3rem 1.5rem",
                    background: "#00d4ff08",
                    border: "1px solid #00d4ff22",
                    borderRadius: 16,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                      fontSize: "1.8rem",
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.8rem" }}>¡Recibido!</h3>
                  <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.6 }}>
                    Te contactamos en menos de 24h. Mientras tanto, echa un vistazo a nuestros casos de estudio.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid #0f172a",
          padding: "3rem 1.5rem",
          background: "#020617",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cpu size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "0.12em", color: "#334155" }}>
                AXIOM.STUDIO
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
              {["Servicios", "Portfolio", "Equipo", "Contacto"].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: "#334155",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    letterSpacing: "0.04em",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
                >
                  {item}
                </a>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <a
                href="mailto:hola@axiom.studio"
                style={{
                  color: "#334155",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
              >
                <Mail size={16} />
                hola@axiom.studio
              </a>
            </div>
          </div>

          <div
            style={{
              paddingTop: "2rem",
              borderTop: "1px solid #0f172a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.8rem",
              textAlign: "center"
            }}
          >
            <p style={{ color: "#1e293b", fontSize: "0.75rem", letterSpacing: "0.06em" }}>
              © 2024 AXIOM.STUDIO · Todos los derechos reservados
            </p>
            <p style={{ color: "#1e293b", fontSize: "0.75rem", letterSpacing: "0.06em" }}>
              Madrid · Lisboa · Berlín
            </p>
          </div>
        </div>
      </footer>
    </div>
    </DemoLayout>
  );
}
