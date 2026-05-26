"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Bot, ArrowRight, CheckCircle, Clock, Users, MessageSquare } from 'lucide-react';

const chatMessages = [
  { from: 'bot', text: '¡Hola! Soy el asistente virtual de la agencia. ¿En qué puedo ayudarte?' },
  { from: 'user', text: 'Quiero información sobre precios de páginas web' },
  { from: 'bot', text: 'Claro. ¿Podrías decirme a qué se dedica tu negocio?' },
  { from: 'user', text: 'Taller mecánico en Alcalá' },
  { from: 'bot', text: 'Perfecto. ¿Tienes web actualmente o empiezas de cero?' },
  { from: 'user', text: 'Tengo una pero es muy antigua' },
  { from: 'bot', text: 'Entendido. He registrado tu consulta. Un asesor te llamará en menos de 5 minutos al número que nos has proporcionado. ¡Gracias!' },
];

const stats = [
  { icon: Clock, value: '24/7', label: 'Disponibilidad total' },
  { icon: MessageSquare, value: '45s', label: 'Tiempo medio de cualificación' },
  { icon: Users, value: '3x', label: 'Más leads cualificados' },
  { icon: CheckCircle, value: '92%', label: 'Satisfacción clientes' },
];

export default function OperationalAutomation() {
  const [messages, setMessages] = useState([chatMessages[0]]);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (msgIndex >= chatMessages.length - 1) return;
    intervalRef.current = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMsgIndex((prev) => {
          const next = prev + 1;
          setMessages((prevMsgs) => [...prevMsgs, chatMessages[next]]);
          setIsTyping(false);
          return next;
        });
      }, 600);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [msgIndex]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const resetChat = () => {
    clearInterval(intervalRef.current);
    setMessages([chatMessages[0]]);
    setMsgIndex(0);
    setIsTyping(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-[#050505] text-white overflow-hidden py-24 md:py-32 border-t border-white/5" id="contacto">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-[0.25em]">Automatización Operativa</span>
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] max-w-5xl">
              <span className="block text-white">Tu teléfono suena</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-zinc-500">mientras trabajas.</span>
              <span className="block text-white/80">Nosotros respondemos.</span>
            </h2>
            <p className="mt-6 text-zinc-400 font-mono text-sm md:text-base max-w-2xl leading-relaxed uppercase tracking-widest">
              Asistentes conversacionales con IA que cualifican leads 24/7 y los transfieren limpios a tu WhatsApp.
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-red-400/80">El Problema</span>
                  <p className="text-sm font-bold uppercase tracking-wider text-white/60">El empleado fantasma que nunca descansa</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex gap-3 p-4 rounded-lg border border-red-500/10 bg-red-500/5">
                  <Phone className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                    "Estoy en medio de una soldadura y el teléfono no para de sonar. Pierdo clientes porque no puedo atender."
                  </p>
                </div>
                <div className="flex gap-3 p-4 rounded-lg border border-red-500/10 bg-red-500/5">
                  <MessageCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                    "Gasto 2 horas al día respondiendo las mismas preguntas: precios, horarios, disponibilidad..."
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">La Solución</span>
                  <p className="text-sm font-bold uppercase tracking-wider text-white/60">Un empleado infatigable que trabaja por ti</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 border border-white/10 rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Chatbot con IA + RAG
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 border border-white/10 rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Cualificación automática
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 border border-white/10 rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Integración WhatsApp
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 border border-white/10 rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Leads listos para cerrar
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <m.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-white/10 rounded-lg p-4 text-center"
                  >
                    <stat.icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                    <span className="block text-2xl font-black text-white">{stat.value}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{stat.label}</span>
                  </m.div>
                ))}
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-b from-emerald-500/5 to-transparent">
                <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Asistente IA — Demo en vivo</span>
                  </div>
                  <button
                    onClick={resetChat}
                    className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                  >
                    Reiniciar
                  </button>
                </div>

                <div className="p-6 h-[400px] overflow-y-auto flex flex-col gap-4">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-4 ${
                            msg.from === 'bot'
                              ? 'bg-zinc-800/80 text-zinc-300'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                          }`}
                        >
                          <p className="text-xs md:text-sm font-mono leading-relaxed">{msg.text}</p>
                        </div>
                      </m.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-zinc-800/80 rounded-xl p-4">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                          <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        </div>
                      </div>
                    </m.div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
                  <div className="flex-1 bg-zinc-800/50 rounded-full px-4 py-2">
                    <span className="text-xs font-mono text-zinc-500">Escribe tu mensaje...</span>
                  </div>
                  <button className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-[10px] font-mono text-zinc-600 text-center uppercase tracking-widest">
                Esta demo simula una conversación real con nuestro sistema de cualificación por IA
              </p>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
