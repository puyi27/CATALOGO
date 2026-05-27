'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Clock, ArrowUpRight, ChevronRight, Mail, Phone, MapPin, Menu, X } from 'lucide-react'
import Link from 'next/link'
import DemoLayout from '@/components/DemoLayout'

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
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-normal"
      style={{
        x: cursorX,
        y: cursorY,
        width: 10,
        height: 10,
        border: `1px solid ${PALETTE.gold}`,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 h-16 bg-[#FBF9F6] border-b border-[#1C2A39]/10">
        <span className="font-serif text-sm md:text-base tracking-[0.08em] text-[#1C2A39]">
          VALMONT &amp; CO
          <span className="hidden md:inline"> — HORLOGERIE SUISSE EST. 1884</span>
        </span>

        <div className="hidden md:flex items-center gap-9">
          {['Colecciones', 'Patrimonio', 'Maison'].map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ color: PALETTE.gold }}
              className="font-sans text-sm tracking-[0.16em] uppercase text-[#1C2A39] transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <Link
            href="/"
            className="font-sans text-sm tracking-[0.14em] uppercase text-[#C3A370] border-l border-[#C3A370]/30 pl-6"
          >
            ← Catálogo
          </Link>
        </div>

        <button 
          className="md:hidden text-[#1C2A39] p-2 -mr-2"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#FBF9F6] flex flex-col justify-center items-center"
          >
            <button 
              className="absolute top-6 right-6 text-[#1C2A39] p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {['Colecciones', 'Patrimonio', 'Maison'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileTap={{ scale: 0.95 }}
                  className="font-serif text-3xl text-[#1C2A39]"
                >
                  {item}
                </motion.a>
              ))}
              <div className="w-12 h-px bg-[#C3A370] my-4" />
              <Link
                href="/"
                className="font-sans text-sm tracking-[0.2em] uppercase text-[#C3A370]"
              >
                ← Volver al Catálogo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section ref={ref} className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-16 bg-[#FBF9F6]">
      <motion.div 
        style={{ y }}
        className="flex flex-col justify-center px-6 md:px-12 py-12 md:py-20 order-2 md:order-1"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-sans text-sm tracking-[0.24em] uppercase text-[#C3A370] mb-6 md:mb-8">
            Nouvelle Collection 2024
          </p>

          <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-[1.05] text-[#1C2A39] mb-6 md:mb-8">
            The Art of<br />
            Measuring<br />
            <em className="italic text-[#C3A370]">Time.</em>
          </h1>

          <p className="font-serif text-lg md:text-xl leading-relaxed text-[#8C8578] max-w-[400px] mb-10 md:mb-14 italic">
            Desde 1884, cada pieza que abandona nuestros talleres en Le Brassus
            lleva consigo cuatro generaciones de maestría ininterrumpida.
          </p>

          <motion.a
            href="#collections"
            whileHover={{ gap: 16 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-[10px] font-sans text-sm tracking-[0.2em] uppercase text-[#1C2A39] border-b border-[#1C2A39] pb-1 transition-all"
          >
            Explorar Colecciones <ChevronRight size={12} />
          </motion.a>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-16 md:mt-24 pt-8 md:pt-12 border-t border-[#1C2A39]/10">
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
              <p className="font-serif text-xl md:text-2xl text-[#1C2A39] mb-1">
                {s.value}
              </p>
              <p className="font-sans text-sm tracking-[0.16em] uppercase text-[#8C8578]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="relative overflow-hidden h-[50vh] md:h-auto order-1 md:order-2">
        <motion.img
          src="https://loremflickr.com/900/1100/luxury,watch?lock=1"
          alt="Valmont & Co"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full object-cover block"
        />
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="absolute inset-0 bg-[#FBF9F6] origin-left"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C3A370]/5 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

function Collections() {
  return (
    <section id="collections" className="bg-[#FBF9F6] py-20 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-sm tracking-[0.24em] uppercase text-[#C3A370] mb-4">
            Manufacture 2024
          </p>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tighter text-[#1C2A39]">
            Nuestras Colecciones
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[2px] px-6 md:px-12">
        {COLLECTIONS.map((c, i) => (
          <CollectionCard key={c.name} c={c} i={i} />
        ))}
      </div>
    </section>
  )
}

function CollectionCard({ c, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.15 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group block"
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={c.img}
          alt={c.name}
          className="w-full h-full object-cover block transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2A39]/80 via-transparent to-transparent flex items-end p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.18em] uppercase text-[#FBF9F6]">
            Solicitar Información <ArrowUpRight size={12} />
          </span>
        </div>

        <div className="absolute top-4 right-4 md:top-5 md:right-5 bg-[#FBF9F6]/90 backdrop-blur-sm px-[10px] py-1">
          <span className="font-sans text-sm tracking-[0.14em] text-[#1C2A39]">
            {c.ref}
          </span>
        </div>
      </div>

      <div className="py-6 md:py-7 border-t border-[#1C2A39]/10">
        <p className="font-sans text-sm tracking-[0.2em] uppercase text-[#C3A370] mb-2">
          {c.name}
        </p>
        <p className="font-serif text-base leading-relaxed text-[#8C8578] mb-4 italic">
          {c.desc}
        </p>
        <p className="font-serif text-lg md:text-xl text-[#1C2A39]">
          {c.price}
        </p>
      </div>
    </motion.div>
  )
}

function Patrimonio() {
  return (
    <section id="patrimonio" className="bg-[#FBF9F6] py-20 md:py-32 px-6 md:px-12 border-t border-[#1C2A39]/10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-20"
      >
        <p className="font-sans text-sm tracking-[0.24em] uppercase text-[#C3A370] mb-4">
          Depuis 1884
        </p>
        <h2 className="font-serif text-5xl md:text-7xl tracking-tighter text-[#1C2A39] max-w-[520px]">
          Patrimonio de Excelencia
        </h2>
      </motion.div>

      <div className="max-w-[760px] relative">
        <div className="absolute left-[31px] md:left-[112px] top-2 bottom-2 w-px bg-[#1C2A39]/10" />

        {TIMELINE.map((t, i) => (
          <motion.div
            key={t.year}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="flex gap-6 md:gap-10 mb-10 md:mb-14 items-start relative z-10"
          >
            <div className="w-[54px] md:w-[72px] shrink-0 text-right">
              <span className="font-serif text-xl md:text-2xl text-[#C3A370]">
                {t.year}
              </span>
            </div>
            <div className="w-[10px] h-[10px] rounded-full bg-[#C3A370] shrink-0 mt-1.5 shadow-[0_0_0_4px_rgba(195,163,112,0.15)]" />
            <p className="font-serif text-lg md:text-xl leading-[1.7] text-[#8C8578] italic">
              {t.event}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SavoirFaire() {
  return (
    <section className="bg-[#1C2A39] py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-20"
      >
        <p className="font-sans text-sm tracking-[0.24em] uppercase text-[#C3A370] mb-4">
          Artisanat Suisse
        </p>
        <h2 className="font-serif text-5xl md:text-7xl tracking-tighter text-[#FBF9F6]">
          Savoir-Faire
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAVOIR.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="bg-[#FBF9F6]/5 border border-[#FBF9F6]/10 overflow-hidden cursor-default"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <motion.img
                src={s.img}
                alt={s.title}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover block brightness-[0.82]"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="font-sans text-sm tracking-[0.2em] uppercase text-[#C3A370] mb-3">
                {s.title}
              </p>
              <p className="font-serif text-base leading-[1.7] text-[#FBF9F6]/60 italic">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex items-center justify-center mt-16 md:mt-20 gap-4"
      >
        <Clock size={16} className="text-[#C3A370]" />
        <span className="font-sans text-sm tracking-[0.22em] uppercase text-[#FBF9F6]/30 text-center">
          Le Brassus, Vallée de Joux, Suisse
        </span>
      </motion.div>
    </section>
  )
}

function PrivateClient() {
  const [sent, setSent] = useState(false)

  return (
    <section className="bg-[#F5F0E8] py-20 md:py-32 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-sm tracking-[0.24em] uppercase text-[#C3A370] mb-4">
            Service Privé
          </p>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tighter text-[#1C2A39] leading-[1.2] mb-6 md:mb-7">
            Consulta<br />Privada
          </h2>
          <p className="font-serif text-lg md:text-xl leading-[1.75] text-[#8C8578] italic mb-10 md:mb-12">
            Nuestro equipo de especialistas le acompañará personalmente en la
            selección de su pieza, con total discreción y dedicación exclusiva.
          </p>

          <div className="flex flex-col gap-5">
            {[
              { Icon: Phone,  text: '+41 21 845 XX XX' },
              { Icon: Mail,   text: 'private@valmontco.ch' },
              { Icon: MapPin, text: 'Le Brassus 1, 1348, Suiza' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <Icon size={14} className="text-[#C3A370]" />
                <span className="font-sans text-sm md:text-base tracking-[0.06em] text-[#8C8578]">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

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
                className="flex flex-col items-center justify-center h-full text-center gap-4 py-20 md:py-0"
              >
                <Clock size={32} className="text-[#C3A370]" />
                <p className="font-serif text-xl md:text-2xl text-[#1C2A39] italic">
                  Merci. Le contactaremos pronto.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={(e) => { e.preventDefault(); setSent(true) }}
                className="flex flex-col gap-6 md:gap-5"
              >
                {[
                  { label: 'Nombre', type: 'text',  placeholder: 'Su nombre completo' },
                  { label: 'Correo', type: 'email', placeholder: 'correo@ejemplo.com' },
                  { label: 'Teléfono', type: 'tel', placeholder: '+34 600 000 000' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block font-sans text-sm tracking-[0.2em] uppercase text-[#8C8578] mb-1.5">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      className="w-full py-3 border-b border-[#1C2A39]/30 bg-transparent font-serif text-lg text-[#1C2A39] outline-none focus:border-[#C3A370] transition-colors rounded-none placeholder:text-[#8C8578]/60"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-sans text-sm tracking-[0.2em] uppercase text-[#8C8578] mb-1.5">
                    Referencia de Interés
                  </label>
                  <select className="w-full py-3 border-b border-[#1C2A39]/30 bg-transparent font-serif text-lg text-[#1C2A39] outline-none appearance-none cursor-pointer focus:border-[#C3A370] transition-colors rounded-none">
                    {COLLECTIONS.map((c) => (
                      <option key={c.name} value={c.name}>{c.name} — {c.ref}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-sm tracking-[0.2em] uppercase text-[#8C8578] mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntenos sobre sus preferencias…"
                    className="w-full py-3 border-b border-[#1C2A39]/30 bg-transparent font-serif text-lg text-[#1C2A39] outline-none resize-none focus:border-[#C3A370] transition-colors rounded-none placeholder:text-[#8C8578]/60"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ backgroundColor: '#1C2A39', color: '#FBF9F6' }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 py-4 px-10 border border-[#1C2A39] bg-transparent font-sans text-sm tracking-[0.2em] uppercase text-[#1C2A39] cursor-pointer transition-colors self-start w-full md:w-auto"
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

function PressQuote() {
  return (
    <section className="bg-[#1C2A39] py-20 md:py-24 px-6 md:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="w-10 h-px bg-[#C3A370] mx-auto mb-8 md:mb-10" />
        <blockquote className="font-serif text-4xl md:text-6xl tracking-tighter italic text-[#FBF9F6] leading-[1.55] max-w-[820px] mx-auto font-normal">
          "A monument of Swiss craft. Valmont &amp; Co has done what we thought
          was impossible."
        </blockquote>
        <p className="font-sans text-sm tracking-[0.2em] uppercase text-[#C3A370] mt-8">
          — Hodinkee, 2024
        </p>
        <div className="w-10 h-px bg-[#C3A370] mx-auto mt-8 md:mt-10" />
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#FBF9F6] border-t border-[#1C2A39]/10 px-6 md:px-12 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 gap-6 text-center md:text-left">
        <span className="font-serif text-lg md:text-xl text-[#1C2A39] tracking-[0.04em]">
          VALMONT &amp; CO
        </span>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {['Privacidad', 'Términos', 'Cookies', 'Contacto'].map((l) => (
            <a
              key={l}
              href="#"
              className="font-sans text-xs md:text-sm tracking-[0.14em] uppercase text-[#8C8578] hover:text-[#1C2A39] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[#1C2A39]/5 gap-4 text-center md:text-left">
        <p className="font-sans text-xs tracking-[0.1em] text-[#8C8578]/80">
          © 2024 Valmont &amp; Co Horlogerie Suisse. Tous droits réservés.
        </p>
        <p className="font-serif text-sm italic text-[#C3A370]">
          Le Brassus, Vallée de Joux, Suisse
        </p>
      </div>
    </footer>
  )
}

export default function ValmontPage() {
  return (
    <DemoLayout title="Valmont & Co">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @media (pointer: fine) {
          a, button { cursor: none !important; }
        }
      `}</style>

      <div className="text-[#1C2A39] md:cursor-none">
        <CustomCursor />
        <Nav />
        <main className="overflow-hidden">
          <Hero />
          <Collections />
          <Patrimonio />
          <SavoirFaire />
          <PrivateClient />
          <PressQuote />
        </main>
        <Footer />
      </div>
    </DemoLayout>
  )
}
