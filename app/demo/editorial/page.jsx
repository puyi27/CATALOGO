'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Camera, BookOpen, ArrowUpRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const ISSUES = [
  { issue: 'MAYO 2025',    theme: 'The Art of Nothing', cover: 5 },
  { issue: 'ABRIL 2025',   theme: 'Power & Silk',       cover: 6 },
  { issue: 'MARZO 2025',   theme: 'Urban Ghosts',       cover: 7 },
  { issue: 'FEBRERO 2025', theme: 'Burning Season',     cover: 8 },
];

const CONTRIBUTORS = [
  { name: 'Elena Vasquez',  role: 'Creative Director',  img: 9  },
  { name: 'Mikael Storm',   role: 'Lead Photographer',  img: 10 },
  { name: 'Chiara Bellini', role: 'Fashion Editor',     img: 11 },
];

const HERO_IMAGES = [1, 2, 3, 4];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function VogueEssencePage() {
  /* Custom cursor */
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* Horizontal scroll hero */
  const heroContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end end'],
  });
  const heroX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', 'calc(-100% + 100vw)']
  );

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #000; color: #fff; font-family: 'Inter', sans-serif; cursor: none; overflow-x: hidden; }
        ::selection { background: #C9A96E; color: #000; }
        ::-webkit-scrollbar { width: 4px; background: #000; }
        ::-webkit-scrollbar-thumb { background: #C9A96E; border-radius: 2px; }
      `}</style>

      {/* ── Custom Cursor ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorHover ? 24 : 8,
          height: cursorHover ? 24 : 8,
          borderRadius: '50%',
          background: '#fff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: cursor.x - (cursorHover ? 12 : 4),
          translateY: cursor.y - (cursorHover ? 12 : 4),
          transition: 'width 0.2s, height 0.2s',
        }}
        animate={{ x: 0, y: 0 }}
      />

      {/* ══════════════════════════════════════
          1. NAV
      ══════════════════════════════════════ */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 3rem',
          mixBlendMode: 'difference',
        }}
      >
        <Link
          href="/"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
        >
          ← Catálogo
        </Link>

        <span
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 900,
            fontSize: '1.25rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          VOGUE ESSENCE
        </span>

        <button
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          style={{
            background: 'transparent',
            border: '1px solid #fff',
            color: '#fff',
            padding: '0.5rem 1.5rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'none',
          }}
        >
          Subscribe
        </button>
      </nav>

      {/* ══════════════════════════════════════
          2. HERO — Sticky Horizontal Scroll
      ══════════════════════════════════════ */}
      <div
        ref={heroContainerRef}
        style={{ height: '500vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Huge outlined title */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 900,
                fontSize: 'clamp(5rem, 14vw, 18rem)',
                lineHeight: 0.85,
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.85)',
                textAlign: 'center',
                whiteSpace: 'pre-line',
                mixBlendMode: 'difference',
                userSelect: 'none',
              }}
            >
              {'VOGUE\nESSENCE.'}
            </motion.h1>
          </div>

          {/* Horizontal strip */}
          <motion.div
            style={{
              display: 'flex',
              x: heroX,
              gap: '2px',
              willChange: 'transform',
            }}
          >
            {HERO_IMAGES.map((lock, i) => (
              <div
                key={lock}
                style={{
                  flexShrink: 0,
                  width: '70vw',
                  height: '100vh',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.img
                  src={`https://loremflickr.com/1400/900/fashion,editorial?lock=${lock}`}
                  alt={`Editorial ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%) contrast(1.1)',
                    display: 'block',
                  }}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: i * 0.1 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  No. {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 20,
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              style={{
                width: 1,
                height: 48,
                background:
                  'linear-gradient(to bottom, transparent, #C9A96E)',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Scroll
            </span>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          3. FEATURED STORY
      ══════════════════════════════════════ */}
      <section
        style={{
          background: '#fff',
          color: '#000',
          padding: '8rem 6rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
        >
          <img
            src="https://loremflickr.com/900/1100/fashion,editorial?lock=21"
            alt="The New Silence"
            style={{
              width: '100%',
              aspectRatio: '9/11',
              objectFit: 'cover',
              display: 'block',
              filter: 'grayscale(15%) contrast(1.05)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              background: '#000',
              color: '#fff',
              padding: '0.3rem 0.8rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Cover Story
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}
          >
            Mayo 2025 · Fashion Editorial
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1,
              color: '#000',
            }}
          >
            The New Silence
          </h2>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.15rem',
              lineHeight: 1.75,
              color: '#333',
              fontWeight: 300,
            }}
          >
            In an era of relentless noise, fashion has found its most radical
            statement in the act of saying nothing at all. The new minimalism
            is not absence—it is precision. It is the deliberate choice of one
            perfect form over a thousand imperfect ones.
          </p>

          {/* Pull quote */}
          <blockquote
            style={{
              borderLeft: '2px solid #C9A96E',
              paddingLeft: '1.5rem',
              margin: '1rem 0',
            }}
          >
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
                lineHeight: 1.3,
                color: '#000',
                fontWeight: 400,
              }}
            >
              "Silence is the only luxury left in a world that sells everything."
            </p>
            <cite
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#999',
                display: 'block',
                marginTop: '0.75rem',
                fontStyle: 'normal',
              }}
            >
              — Elena Vasquez, Creative Director
            </cite>
          </blockquote>

          <motion.button
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#000',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'none',
              padding: 0,
            }}
          >
            Read Full Story <ArrowUpRight size={14} />
          </motion.button>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          4. LATEST ISSUES
      ══════════════════════════════════════ */}
      <section
        style={{ background: '#000', padding: '8rem 4rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: '1rem',
              }}
            >
              <BookOpen size={10} style={{ display: 'inline', marginRight: 6 }} />
              Latest Issues
            </p>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              The Archive
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'none',
            }}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            All Issues <ChevronRight size={12} />
          </motion.button>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {ISSUES.map((item, i) => (
            <motion.div
              key={item.issue}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'none' }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={`https://loremflickr.com/600/800/fashion,magazine?lock=${item.cover}`}
                  alt={item.theme}
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(30%) contrast(1.1)',
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Golden hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(201,169,110,0.65) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1.5rem',
                  }}
                >
                  <motion.span
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#000',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    Read Issue <ArrowUpRight size={10} />
                  </motion.span>
                </motion.div>
              </div>

              <div style={{ padding: '1.25rem 0.25rem' }}>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.issue}
                </p>
                <p
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                    color: '#fff',
                  }}
                >
                  {item.theme}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. CONTRIBUTORS
      ══════════════════════════════════════ */}
      <section
        style={{
          background: '#0a0a0a',
          padding: '8rem 6rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: '1rem',
            }}
          >
            <Camera size={10} style={{ display: 'inline', marginRight: 6 }} />
            Behind the Vision
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#fff',
            }}
          >
            Our Contributors
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {CONTRIBUTORS.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{ textAlign: 'center', cursor: 'none' }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: '1.25rem',
                }}
              >
                <img
                  src={`https://loremflickr.com/400/500/portrait,fashion?lock=${person.img}`}
                  alt={person.name}
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(100%) contrast(1.08)',
                    transition: 'filter 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) contrast(1.05)';
                    e.currentTarget.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) contrast(1.08)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#fff',
                  marginBottom: '0.35rem',
                }}
              >
                {person.name}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                }}
              >
                {person.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. PRESS QUOTE
      ══════════════════════════════════════ */}
      <section
        style={{
          background: '#080808',
          padding: '10rem 8rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(201,169,110,0.15)',
          borderBottom: '1px solid rgba(201,169,110,0.15)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: '3rem',
            }}
          >
            Press
          </p>
          <blockquote
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.2,
              color: '#fff',
              maxWidth: '900px',
              margin: '0 auto 2.5rem',
            }}
          >
            "The most daring fashion publication in Europe."
          </blockquote>
          <cite
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              fontStyle: 'normal',
            }}
          >
            — The Guardian
          </cite>
        </motion.div>

        {/* Decorative gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '80px',
            height: '1px',
            background: '#C9A96E',
            margin: '4rem auto 0',
            transformOrigin: 'center',
          }}
        />
      </section>

      {/* ══════════════════════════════════════
          7. SUBSCRIBE CTA
      ══════════════════════════════════════ */}
      <section
        style={{
          background: '#fff',
          color: '#000',
          padding: '9rem 6rem',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: '1.5rem',
            }}
          >
            Membership
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              lineHeight: 0.9,
              color: '#000',
              marginBottom: '2rem',
            }}
          >
            Read the<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Silence.</span>
          </h2>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.2rem',
              color: '#555',
              maxWidth: '480px',
              margin: '0 auto 4rem',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Join a community that values depth over speed, craft over content,
            and beauty over algorithm.
          </p>

          {/* Plan cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            {/* Digital */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              style={{
                border: '1px solid #e0e0e0',
                padding: '2.5rem 2rem',
                textAlign: 'left',
                cursor: 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#999',
                  marginBottom: '1rem',
                }}
              >
                Digital
              </p>
              <p
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#000',
                  marginBottom: '0.25rem',
                }}
              >
                €9.99
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  color: '#999',
                  marginBottom: '2rem',
                  letterSpacing: '0.05em',
                }}
              >
                per month
              </p>
              {['Full digital archive', 'Monthly PDF edition', 'Exclusive digital content', 'Cancel anytime'].map((f) => (
                <div
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <span style={{ color: '#C9A96E', fontSize: '0.8rem' }}>—</span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: '#444',
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
              <button
                style={{
                  marginTop: '2rem',
                  width: '100%',
                  padding: '0.8rem',
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'none',
                }}
              >
                Subscribe
              </button>
            </motion.div>

            {/* Print + Digital */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              style={{
                border: '1px solid #000',
                padding: '2.5rem 2rem',
                textAlign: 'left',
                cursor: 'none',
                position: 'relative',
                background: '#000',
                color: '#fff',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '1.5rem',
                  background: '#C9A96E',
                  color: '#000',
                  padding: '0.2rem 0.6rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Most Popular
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: '1rem',
                }}
              >
                Print + Digital
              </p>
              <p
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.25rem',
                }}
              >
                €24.99
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '2rem',
                  letterSpacing: '0.05em',
                }}
              >
                per month
              </p>
              {['Everything in Digital', 'Monthly print edition', 'Collector covers', 'Free worldwide shipping', 'Subscriber events access'].map((f) => (
                <div
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <span style={{ color: '#C9A96E', fontSize: '0.8rem' }}>—</span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
              <button
                style={{
                  marginTop: '2rem',
                  width: '100%',
                  padding: '0.8rem',
                  background: '#C9A96E',
                  color: '#000',
                  border: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'none',
                  fontWeight: 500,
                }}
              >
                Subscribe
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          8. FOOTER
      ══════════════════════════════════════ */}
      <footer
        style={{
          background: '#000',
          borderTop: '1px solid rgba(201,169,110,0.18)',
          padding: '4rem 6rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <div>
          {['Editorial', 'Fashion', 'Culture', 'Photography', 'Archive'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginRight: '1.5rem',
                cursor: 'none',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900,
              fontSize: '1rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: '0.5rem',
            }}
          >
            VOGUE ESSENCE
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            © {new Date().getFullYear()} Vogue Essence. All rights reserved.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            Crafted with intention.
          </p>
          <div
            style={{
              marginTop: '0.75rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
            }}
          >
            {['IG', 'TW', 'PT'].map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.25)',
                  cursor: 'none',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
