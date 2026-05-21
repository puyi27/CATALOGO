'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Clock, ArrowUpRight, ChevronRight, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

/* ─────────────────────────── CONSTANTS ─────────────────────────── */
const PALETTE = {
  ivory:     '#FBF9F6',
  navy:      '#1C2A39',
  gold:      '#C3A370',
  goldLight: '#D4B98A',
  goldDark:  '#A8885C',
  stone:     '#8C8578',
  ink:       '#2D2D2D',
}

const COLLECTIONS = [
  {
    name:  'LEGACY I',
    ref:   'Ref. V-1884-LE',
    desc:  'Calíbre manual de 72h de reserva de marcha. Caja de 38mm en platino 950.',
    price: 'desde €28,400',
    img:   'https://loremflickr.com/600/750/luxury,watch?lock=2',
  },
  {
    name:  'ALTITUDE PRO',
    ref:   'Ref. V-2301-AP',
    desc:  'Tourbillon volant con indicador de altitud. Titanio grado 5. Resistente a 300m.',
    price: 'desde €67,800',
    img:   'https://loremflickr.com/600/750/luxury,watch?lock=3',
  },
  {
    name:  'NOIR ABSOLU',
    ref:   'Ref. V-2024-NA',
    desc:  'DLC negro mat. Cronógrafo de doble pulsador. Únicamente 88 ejemplares en existencia.',
    price: 'desde €145,000',
    img:   'https://loremflickr.com/600/750/luxury,watch?lock=4',
  },
]

const TIMELINE = [
  { year: 1884, event: 'Fundación en Le Brassus, Valle de Jóux, Suiza.' },
  { year: 1932, event: 'Primera complicación de calendario perpetuo con indicador de fase lunar.' },
  { year: 1971, event: 'Introducción del calíbre V-71, el oscilador de cuarzo más preciso de la época.' },
  { year: 2024, event: 'Tourbillon volant magnético. El avance más significativo en 50 años.' },
]

const SAVOIR = [
  {
    title: 'Guilloché Manual',
    desc:  'Cada esfera se trabaja a mano durante 30+ horas con técnicas del siglo XIX.',
    img:   'https://loremflickr.com/480/360/watchmaking,craft?lock=5',
  },
  {
    title: 'Ensamblaje',
    desc:  '212 componentes. Un relojero. Cuatro semanas de trabajo meticuloso.',
    img:   'https://loremflickr.com/480/360/watchmaking,assembly?lock=6',
  },
  {
    title: 'Control de Calidad',
    desc:  '28 días de pruebas en seis posiciones antes de dejar nuestros talleres.',
    img:   'https://loremflickr.com/480/360/precision,quality?lock=7',
  },
  {
    title: 'Caja y Pulido',
    desc:  'Acabados alternados satinados y pulidos ejecutados a mano por artesanos certificados.',
    img:   'https://loremflickr.com/480/360/watchcase,polish?lock=8',
  },
]

/* ─────────────────────────── CUSTOM CURSOR ─────────────────────── */
function CustomCursor() {
  const cursorX = useSpring(0, { stiffness: 500, damping: 40 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 5)
      cursorY.set(e.clientY - 5)
      if (!visible) setVisible(true)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY, visible])

  return (
    <motion.div
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        x:             cursorX,
        y:             cursorY,
        width:         10,
        height:        10,
        borderRadius:  '50%',
        border:        `1px solid ${PALETTE.gold}`,
        background:    'transparent',
        pointerEvents: 'none',
        zIndex:        9999,
        opacity:       visible ? 1 : 0,
        mixBlendMode:  'normal',
      }}
    />
  )
}

/* ─────────────────────────── NAV ────────────────────────────────── */
function Nav() {
  return (
    <nav style={{
      position:       'fixed',
      top:            0,
      left:           0,
      right:          0,
      zIndex:         100,
      background:     PALETTE.ivory,
      borderBottom:   `1px solid ${PALETTE.navy}22`,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '0 48px',
      height:         64,
    }}>
      <span style={{
        fontFamily:    'Georgia, "Times New Roman", serif',
        fontSize:      13,
        letterSpacing: '0.08em',
        color:         PALETTE.navy,
        fontWeight:    400,
      }}>
        VALMONT &amp; CO — HORLOGERIE SUISSE EST. 1884
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['Colecciones', 'Patrimonio', 'Maison'].map((item) => (
          <motion.a
            key={item}
            href="#"
            whileHover={{ color: PALETTE.gold }}
            style={{
              fontFamily:     '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize:       11,
              letterSpacing:  '0.16em',
              textTransform:  'uppercase',
              color:          PALETTE.navy,
              textDecoration: 'none',
              transition:     'color 0.2s',
            }}
          >
            {item}
          </motion.a>
        ))}

        <Link
          href="/"
          style={{
            fontFamily:     '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize:       11,
            letterSpacing:  '0.14em',
            textTransform:  'uppercase',
            color:          PALETTE.gold,
            textDecoration: 'none',
            borderLeft:     `1px solid ${PALETTE.gold}44`,
            paddingLeft:    24,
          }}
        >
          ← Catálogo
        </Link>
      </div>
    </nav>
  )
}

/* ─────────────────────────── HERO ───────────────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section ref={ref} style={{
      display:    'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight:  '100vh',
      paddingTop: 64,
      background: PALETTE.ivory,
    }}>
      {/* LEFT */}
      <motion.div style={{
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        '80px 64px 80px 48px',
        y,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p style={{
            fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize:      10,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color:         PALETTE.gold,
            marginBottom:  32,
          }}>
            Nouvelle Collection 2024
          </p>

          <h1 style={{
            fontFamily:  'Georgia, "Times New Roman", serif',
            fontSize:    'clamp(52px, 6vw, 84px)',
            lineHeight:  1.05,
            color:       PALETTE.navy,
            fontWeight:  400,
            marginBottom: 32,
          }}>
            The Art of<br />
            Measuring<br />
            <em style={{ fontStyle: 'italic', color: PALETTE.gold }}>Time.</em>
          </h1>

          <p style={{
            fontFamily:  'Georgia, "Times New Roman", serif',
            fontSize:    17,
            lineHeight:  1.75,
            color:       PALETTE.stone,
            maxWidth:    400,
            marginBottom: 56,
            fontStyle:   'italic',
          }}>
            Desde 1884, cada pieza que abandona nuestros talleres en Le Brassus
            lleva consigo cuatro generaciones de maestría ininterrumpida.
          </p>

          <motion.a
            href="#collections"
            whileHover={{ gap: 16 }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            10,
              fontFamily:     '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize:       10,
              letterSpacing:  '0.2em',
              textTransform:  'uppercase',
              color:          PALETTE.navy,
              textDecoration: 'none',
              borderBottom:   `1px solid ${PALETTE.navy}`,
              paddingBottom:  4,
              transition:     'gap 0.2s',
            }}
          >
            Explorar Colecciones <ChevronRight size={12} />
          </motion.a>
        </motion.div>

        {/* Stats */}
        <div style={{
          display:      'flex',
          gap:          48,
          marginTop:    72,
          paddingTop:   48,
          borderTop:    `1px solid ${PALETTE.navy}18`,
        }}>
          {[
            { value: 'Desde 1884',        label: 'Manufactura' },
            { value: '47 Premios',         label: 'Géneva Observatory' },
            { value: '12 Patentes',        label: 'Activas' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
            >
              <p style={{
                fontFamily:  'Georgia, "Times New Roman", serif',
                fontSize:    20,
                color:       PALETTE.navy,
                fontWeight:  400,
                marginBottom: 4,
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize:      10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         PALETTE.stone,
              }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT — Watch image with reveal mask */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.img
          src="https://loremflickr.com/900/1100/luxury,watch?lock=1"
          alt="Valmont & Co — Pieza principal"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            display:    'block',
          }}
        />
        {/* Sliding mask reveal */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          style={{
            position:       'absolute',
            inset:          0,
            background:     PALETTE.ivory,
            transformOrigin: 'left center',
          }}
        />
        {/* Subtle gold overlay gradient */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: `linear-gradient(135deg, ${PALETTE.gold}08 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  )
}

/* ─────────────────────────── COLLECTIONS ────────────────────────── */
function Collections() {
  return (
    <section id="collections" style={{
      background: PALETTE.ivory,
      padding:    '120px 0',
    }}>
      <div style={{ padding: '0 48px', marginBottom: 64 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize:      10,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color:         PALETTE.gold,
            marginBottom:  16,
          }}>
            Manufacture 2024
          </p>
          <h2 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize:   'clamp(32px, 4vw, 52px)',
            color:      PALETTE.navy,
            fontWeight: 400,
          }}>
            Nuestras Colecciones
          </h2>
        </motion.div>
      </div>

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 2,
        padding:             '0 48px',
      }}>
        {COLLECTIONS.map((c, i) => (
          <CollectionCard key={c.name} c={c} i={i} />
        ))}
      </div>
    </section>
  )
}

function CollectionCard({ c, i }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5' }}>
        <motion.img
          src={c.img}
          alt={c.name}
          animate={{ filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)', scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width:     '100%',
            height:    '100%',
            objectFit: 'cover',
            display:   'block',
          }}
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position:   'absolute',
            inset:      0,
            background: `linear-gradient(to top, ${PALETTE.navy}CC 0%, transparent 60%)`,
            display:    'flex',
            alignItems: 'flex-end',
            padding:    24,
          }}
        >
          <motion.a
            href="#"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            8,
              fontFamily:     '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize:       10,
              letterSpacing:  '0.18em',
              textTransform:  'uppercase',
              color:          PALETTE.ivory,
              textDecoration: 'none',
            }}
          >
            Solicitar Información <ArrowUpRight size={12} />
          </motion.a>
        </motion.div>

        {/* Ref badge */}
        <div style={{
          position:      'absolute',
          top:           20,
          right:         20,
          background:    `${PALETTE.ivory}E6`,
          padding:       '4px 10px',
          backdropFilter: 'blur(4px)',
        }}>
          <span style={{
            fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize:      9,
            letterSpacing: '0.14em',
            color:         PALETTE.navy,
          }}>
            {c.ref}
          </span>
        </div>
      </div>

      <div style={{
        padding:    '28px 0 40px',
        borderTop:  `1px solid ${PALETTE.navy}18`,
      }}>
        <p style={{
          fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize:      10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         PALETTE.gold,
          marginBottom:  8,
        }}>
          {c.name}
        </p>
        <p style={{
          fontFamily:  'Georgia, "Times New Roman", serif',
          fontSize:    15,
          lineHeight:  1.65,
          color:       PALETTE.stone,
          marginBottom: 16,
          fontStyle:   'italic',
        }}>
          {c.desc}
        </p>
        <p style={{
          fontFamily:  'Georgia, "Times New Roman", serif',
          fontSize:    18,
          color:       PALETTE.navy,
        }}>
          {c.price}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────── PATRIMONIO ────────────────────────── */
function Patrimonio() {
  return (
    <section id="patrimonio" style={{
      background: PALETTE.ivory,
      padding:    '120px 48px',
      borderTop:  `1px solid ${PALETTE.navy}12`,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 80 }}
      >
        <p style={{
          fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize:      10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color:         PALETTE.gold,
          marginBottom:  16,
        }}>
          Depuis 1884
        </p>
        <h2 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize:   'clamp(32px, 4vw, 52px)',
          color:      PALETTE.navy,
          fontWeight: 400,
          maxWidth:   520,
        }}>
          Patrimonio de Excelencia
        </h2>
      </motion.div>

      <div style={{ maxWidth: 760, position: 'relative' }}>
        {/* Vertical line */}
        <div style={{
          position:   'absolute',
          left:       112,
          top:        8,
          bottom:     8,
          width:      1,
          background: `${PALETTE.navy}18`,
        }} />

        {TIMELINE.map((t, i) => (
          <motion.div
            key={t.year}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            style={{
              display:    'flex',
              gap:        40,
              marginBottom: 56,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ width: 72, flexShrink: 0, textAlign: 'right' }}>
              <span style={{
                fontFamily:  'Georgia, "Times New Roman", serif',
                fontSize:    20,
                color:       PALETTE.gold,
                fontWeight:  400,
              }}>
                {t.year}
              </span>
            </div>
            {/* Dot */}
            <div style={{
              width:        10,
              height:       10,
              borderRadius: '50%',
              background:   PALETTE.gold,
              flexShrink:   0,
              marginTop:    6,
              boxShadow:    `0 0 0 4px ${PALETTE.gold}22`,
            }} />
            <p style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize:   17,
              lineHeight: 1.7,
              color:      PALETTE.stone,
              fontStyle:  'italic',
            }}>
              {t.event}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────── SAVOIR-FAIRE ───────────────────────── */
function SavoirFaire() {
  return (
    <section style={{
      background: PALETTE.navy,
      padding:    '120px 48px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 72 }}
      >
        <p style={{
          fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize:      10,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color:         PALETTE.gold,
          marginBottom:  16,
        }}>
          Artisanat Suisse
        </p>
        <h2 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize:   'clamp(32px, 4vw, 52px)',
          color:      PALETTE.ivory,
          fontWeight: 400,
        }}>
          Savoir-Faire
        </h2>
      </motion.div>

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap:                 24,
      }}>
        {SAVOIR.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            style={{
              background: `${PALETTE.ivory}06`,
              border:     `1px solid ${PALETTE.ivory}14`,
              overflow:   'hidden',
              cursor:     'default',
            }}
          >
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <motion.img
                src={s.img}
                alt={s.title}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.82)' }}
              />
            </div>
            <div style={{ padding: '28px 24px 32px' }}>
              <p style={{
                fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize:      10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         PALETTE.gold,
                marginBottom:  12,
              }}>
                {s.title}
              </p>
              <p style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize:   15,
                lineHeight: 1.7,
                color:      `${PALETTE.ivory}99`,
                fontStyle:  'italic',
              }}>
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Clock accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          marginTop:      72,
          gap:            16,
        }}
      >
        <Clock size={16} color={PALETTE.gold} />
        <span style={{
          fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize:      10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         `${PALETTE.ivory}55`,
        }}>
          Le Brassus, Vallée de Joux, Suisse
        </span>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────── PRIVATE CLIENT ─────────────────────── */
function PrivateClient() {
  const [sent, setSent] = useState(false)

  return (
    <section style={{
      background: '#F5F0E8',
      padding:    '120px 48px',
    }}>
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 96,
        maxWidth:            1100,
        margin:              '0 auto',
      }}>
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize:      10,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color:         PALETTE.gold,
            marginBottom:  16,
          }}>
            Service Privé
          </p>
          <h2 style={{
            fontFamily:   'Georgia, "Times New Roman", serif',
            fontSize:     'clamp(28px, 3.5vw, 44px)',
            color:        PALETTE.navy,
            fontWeight:   400,
            marginBottom: 28,
            lineHeight:   1.2,
          }}>
            Consulta<br />Privada
          </h2>
          <p style={{
            fontFamily:  'Georgia, "Times New Roman", serif',
            fontSize:    16,
            lineHeight:  1.75,
            color:       PALETTE.stone,
            fontStyle:   'italic',
            marginBottom: 48,
          }}>
            Nuestro equipo de especialistas le acompañará personalmente en la
            selección de su pieza, con total discreción y dedicación exclusiva.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { Icon: Phone,  text: '+41 21 845 XX XX' },
              { Icon: Mail,   text: 'private@valmontco.ch' },
              { Icon: MapPin, text: 'Le Brassus 1, 1348, Suiza' },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Icon size={14} color={PALETTE.gold} />
                <span style={{
                  fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize:      12,
                  letterSpacing: '0.06em',
                  color:         PALETTE.stone,
                }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  height:         '100%',
                  textAlign:      'center',
                  gap:            16,
                }}
              >
                <Clock size={32} color={PALETTE.gold} />
                <p style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize:   22,
                  color:      PALETTE.navy,
                  fontStyle:  'italic',
                }}>
                  Merci. Le contactaremos pronto.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={(e) => { e.preventDefault(); setSent(true) }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {[
                  { label: 'Nombre', type: 'text',  placeholder: 'Su nombre completo' },
                  { label: 'Correo', type: 'email', placeholder: 'correo@ejemplo.com' },
                  { label: 'Teléfono', type: 'tel', placeholder: '+34 600 000 000' },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{
                      display:       'block',
                      fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontSize:      9,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color:         PALETTE.stone,
                      marginBottom:  6,
                    }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      style={{
                        width:        '100%',
                        padding:      '12px 0',
                        border:       'none',
                        borderBottom: `1px solid ${PALETTE.navy}30`,
                        background:   'transparent',
                        fontFamily:   'Georgia, "Times New Roman", serif',
                        fontSize:     15,
                        color:        PALETTE.navy,
                        outline:      'none',
                        boxSizing:    'border-box',
                      }}
                    />
                  </div>
                ))}

                {/* Select */}
                <div>
                  <label style={{
                    display:       'block',
                    fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize:      9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         PALETTE.stone,
                    marginBottom:  6,
                  }}>
                    Referencia de Interés
                  </label>
                  <select style={{
                    width:        '100%',
                    padding:      '12px 0',
                    border:       'none',
                    borderBottom: `1px solid ${PALETTE.navy}30`,
                    background:   'transparent',
                    fontFamily:   'Georgia, "Times New Roman", serif',
                    fontSize:     15,
                    color:        PALETTE.navy,
                    outline:      'none',
                    appearance:   'none',
                    cursor:       'pointer',
                  }}>
                    {COLLECTIONS.map((c) => (
                      <option key={c.name} value={c.name}>{c.name} — {c.ref}</option>
                    ))}
                  </select>
                </div>

                {/* Textarea */}
                <div>
                  <label style={{
                    display:       'block',
                    fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize:      9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         PALETTE.stone,
                    marginBottom:  6,
                  }}>
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntenos sobre sus preferencias…"
                    style={{
                      width:        '100%',
                      padding:      '12px 0',
                      border:       'none',
                      borderBottom: `1px solid ${PALETTE.navy}30`,
                      background:   'transparent',
                      fontFamily:   'Georgia, "Times New Roman", serif',
                      fontSize:     15,
                      color:        PALETTE.navy,
                      outline:      'none',
                      resize:       'none',
                      boxSizing:    'border-box',
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ background: PALETTE.navy, color: PALETTE.ivory }}
                  style={{
                    marginTop:     8,
                    padding:       '16px 40px',
                    border:        `1px solid ${PALETTE.navy}`,
                    background:    'transparent',
                    fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize:      10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         PALETTE.navy,
                    cursor:        'pointer',
                    transition:    'background 0.3s, color 0.3s',
                    alignSelf:     'flex-start',
                  }}
                >
                  Enviar Consulta
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────── PRESS QUOTE ────────────────────────── */
function PressQuote() {
  return (
    <section style={{
      background: PALETTE.navy,
      padding:    '100px 48px',
      textAlign:  'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div style={{
          width:        40,
          height:       1,
          background:   PALETTE.gold,
          margin:       '0 auto 40px',
        }} />
        <blockquote style={{
          fontFamily:  'Georgia, "Times New Roman", serif',
          fontSize:    'clamp(20px, 3vw, 34px)',
          fontStyle:   'italic',
          color:       PALETTE.ivory,
          lineHeight:  1.55,
          maxWidth:    820,
          margin:      '0 auto',
          fontWeight:  400,
        }}>
          "A monument of Swiss craft. Valmont &amp; Co has done what we thought
          was impossible."
        </blockquote>
        <p style={{
          fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize:      10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         PALETTE.gold,
          marginTop:     32,
        }}>
          — Hodinkee, 2024
        </p>
        <div style={{
          width:        40,
          height:       1,
          background:   PALETTE.gold,
          margin:       '40px auto 0',
        }} />
      </motion.div>
    </section>
  )
}

/* ─────────────────────────── FOOTER ────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background:  PALETTE.ivory,
      borderTop:   `1px solid ${PALETTE.navy}12`,
      padding:     '48px 48px',
    }}>
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        marginBottom:   32,
      }}>
        <span style={{
          fontFamily:    'Georgia, "Times New Roman", serif',
          fontSize:      18,
          color:         PALETTE.navy,
          fontWeight:    400,
          letterSpacing: '0.04em',
        }}>
          VALMONT &amp; CO
        </span>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Privacidad', 'Términos', 'Cookies', 'Contacto'].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily:     '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize:       10,
                letterSpacing:  '0.14em',
                textTransform:  'uppercase',
                color:          PALETTE.stone,
                textDecoration: 'none',
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        paddingTop:     24,
        borderTop:      `1px solid ${PALETTE.navy}10`,
      }}>
        <p style={{
          fontFamily:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize:      10,
          letterSpacing: '0.1em',
          color:         `${PALETTE.stone}88`,
        }}>
          © 2024 Valmont &amp; Co Horlogerie Suisse. Tous droits réservés.
        </p>
        <p style={{
          fontFamily:    'Georgia, "Times New Roman", serif',
          fontSize:      11,
          fontStyle:     'italic',
          color:         PALETTE.gold,
        }}>
          Le Brassus, Vallée de Joux, Suisse
        </p>
      </div>
    </footer>
  )
}

/* ─────────────────────────── PAGE ───────────────────────────────── */
export default function ValmontPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { cursor: none !important; background: ${PALETTE.ivory}; }
        a, button { cursor: none !important; }
        input::placeholder, textarea::placeholder { color: ${PALETTE.stone}66; }
        input:focus, textarea:focus, select:focus { border-bottom-color: ${PALETTE.gold} !important; }
      `}</style>

      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Collections />
        <Patrimonio />
        <SavoirFaire />
        <PrivateClient />
        <PressQuote />
      </main>
      <Footer />
    </>
  )
}
