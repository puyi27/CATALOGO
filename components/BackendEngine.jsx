"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

// Mock RAG Knowledge Base based on active context
const ragKnowledgeBase = {
  metal: { color: '#ff4500', name: 'Metalúrgica', system: 'SYS.OP.METAL // RAG_V2.4', responses: ['Entendido. Para mecanizado CNC de alta tolerancia, podemos integrar telemetría.', 'Las cotizaciones industriales requieren planos técnicos. Preparando canal seguro...'] },
  panaderia: { color: '#d4a373', name: 'Panadería', system: 'SYS.OP.OBRADOR // RAG_V2.4', responses: ['Procesos lentos requieren sistemas rápidos. Evaluaremos tu flujo de fermentación.', 'Trazabilidad de masa madre registrada. ¿Qué volumen mensual manejas?'] },
  interiorismo: { color: '#e5e7eb', name: 'Arquitectura', system: 'SYS.OP.ARQ // RAG_V2.4', responses: ['El espacio en blanco es lujo. Estructuraremos tu portfolio en un bento grid interactivo.', 'Cotización de plataforma inmersiva en proceso.'] },
  almazara: { color: '#4E6840', name: 'Almazara', system: 'SYS.OP.AGRO // RAG_V2.4', responses: ['Soberanía de datos para tu oro líquido. Podemos conectar sensores IoT.', 'Exportando arquitectura de trazabilidad D2C.'] },
  clinica: { color: '#008080', name: 'Clínica', system: 'SYS.OP.SALUD // RAG_V2.4', responses: ['Privacidad y alta conversión. Cifraremos los datos de pacientes de extremo a extremo.', 'Automatización de citas confirmada.'] },
  restaurante: { color: '#1a1a1a', name: 'Gastronomía', system: 'SYS.OP.GASTRO // RAG_V2.4', responses: ['Lujo silencioso. Integrando pasarela de reservas invisibles.', 'El menú degustación será revelado con interacciones de baja latencia.'] },
  default: { color: '#ffffff', name: 'WaaS Agency', system: 'SYS.OP.CORE // RAG_V2.4', responses: ['Analizando arquitectura del proyecto...', 'Generando estimación de alto rendimiento...'] }
};

export default function BackendEngine({ context = 'default' }) {
  const nicheData = ragKnowledgeBase[context] || ragKnowledgeBase['default'];
  const accentColor = nicheData.color;

  const [chatLog, setChatLog] = useState([
    { sender: 'system', text: `[CONECTADO AL MOTOR WaaS] Contexto: ${nicheData.name}. ¿Cuál es tu desafío operativo?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  // Lead Capture Payload Formatter
  const handleLeadCapture = (payload) => {
    const formattedPayload = `
[LEAD QUALIFICATION - ${nicheData.name.toUpperCase()}]
Name/ID: ${payload.name || 'Anonymous_User'}
Need: ${payload.need}
Urgency: ${payload.urgency || 'Standard'}
Timestamp: ${new Date().toISOString()}
----------------------------------------
ACTION: Forward to B2B Whatsapp Gateway.
    `.trim();

    console.log('%c [PAYLOAD ENVIADO VÍA WaaS MIDDLEWARE]', 'color: #10b981; font-weight: bold;', formattedPayload);
    
    // Simulating API Latency before forwarding
    setTimeout(() => {
      setChatLog(prev => [...prev, { 
        sender: 'system', 
        text: `PAYLOAD CONFIRMADO. Tus datos están cifrados. Un ingeniero WaaS conectará contigo vía WhatsApp en breve para finalizar el acuerdo.` 
      }]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleQuery = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userText = inputValue.trim();
    setChatLog(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate RAG Context Analysis
    setTimeout(() => {
      const responseText = nicheData.responses[Math.floor(Math.random() * nicheData.responses.length)];
      setChatLog(prev => [...prev, { sender: 'system', text: responseText }]);
      
      // Auto-qualify and initiate lead capture flow if chat continues
      setTimeout(() => {
        setChatLog(prev => [...prev, { 
          sender: 'system', 
          text: `Iniciando captura segura de Lead. Preparando Handshake seguro con el cliente...` 
        }]);
        handleLeadCapture({ name: 'Cliente_Potencial', need: userText, urgency: 'High' });
      }, 1500);

    }, 800);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 bg-[#050505] font-mono border-y border-white/5 relative overflow-hidden" id="backend-engine">
        
        {/* Abstract Hardware Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* System Validation Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 font-sans">
                Inteligencia <br/> Operativa.
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 font-sans font-light">
                Nuestro Middleware RAG cualifica, analiza y cifra los datos de contacto en tiempo real. 
                Soberanía de datos absoluta y latencia cero antes de inyectar el payload vía WhatsApp o Email corporativo.
              </p>
            </div>

            {/* Authority Active Indicator */}
            <div className="flex flex-col gap-4 p-6 bg-white/5 border border-white/10 relative overflow-hidden cursor-default">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-xs text-zinc-500 uppercase">Sistema Operativo</span>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                   <span className="text-xs uppercase font-bold tracking-widest" style={{ color: accentColor }}>Activo // {nicheData.system}</span>
                 </div>
               </div>
               
               <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                 <span className="text-zinc-500 uppercase">Event Loop</span>
                 <span className="text-white">Non-Blocking</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="text-zinc-500 uppercase">I/O Latencia</span>
                 <span className="text-white">12ms</span>
               </div>
               
               {/* Non-reflow animation for processing */}
               {isProcessing && (
                 <m.div 
                   className="absolute bottom-0 left-0 h-1 w-full opacity-50"
                   style={{ backgroundColor: accentColor }}
                   initial={{ scaleX: 0, originX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                 />
               )}
            </div>
          </div>

          {/* RAG Terminal Interface */}
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 flex flex-col h-[500px] shadow-2xl relative">
             
             {/* Dynamic Accent Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-50 blur-sm pointer-events-none" style={{ backgroundColor: accentColor, boxShadow: `0 0 20px 2px ${accentColor}` }} />

             <div className="p-4 border-b border-white/5 flex items-center justify-between text-xs text-zinc-500 uppercase bg-[#080808]">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-zinc-800" />
                 <div className="w-3 h-3 rounded-full bg-zinc-800" />
                 <div className="w-3 h-3 rounded-full bg-zinc-800" />
               </div>
               <span>Terminal de Cualificación</span>
             </div>

             {/* Chat History */}
             <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 text-sm scroll-smooth">
               <AnimatePresence initial={false}>
                 {chatLog.map((msg, i) => (
                   <m.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                   >
                     <span className="text-[10px] text-zinc-600 mb-1 uppercase tracking-widest">
                       {msg.sender === 'user' ? 'CLIENTE_ID' : 'RAG_ENGINE_CORE'}
                     </span>
                     <div 
                       className={`p-4 leading-relaxed ${msg.sender === 'user' ? 'bg-white text-black' : 'bg-white/5 text-zinc-300 border border-white/10'}`}
                     >
                       {msg.text}
                     </div>
                   </m.div>
                 ))}
               </AnimatePresence>
               {isProcessing && (
                 <m.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   className="self-start text-xs flex items-center gap-2 mt-2"
                   style={{ color: accentColor }}
                 >
                   <span className="animate-pulse">_</span>
                   Procesando payload de conocimiento...
                 </m.div>
               )}
             </div>

             {/* Command Input Form */}
             <form onSubmit={handleQuery} className="p-4 border-t border-white/5 bg-[#080808] flex gap-4">
               <span className="text-zinc-600 flex items-center">{">"}</span>
               <input 
                 type="text" 
                 value={inputValue}
                 onChange={e => setInputValue(e.target.value)}
                 disabled={isProcessing}
                 placeholder="Ej: Necesito reducir la latencia de mi pasarela B2B..."
                 className="flex-1 bg-transparent text-white border-b border-transparent focus:border-zinc-700 outline-none px-2 py-2 text-sm disabled:opacity-50 transition-colors"
               />
               <button 
                 type="submit" 
                 disabled={isProcessing || !inputValue.trim()}
                 className="px-6 py-2 bg-white text-black text-xs uppercase tracking-widest font-bold disabled:opacity-30 hover:bg-zinc-200 transition-colors"
               >
                 Transmitir
               </button>
             </form>

          </div>

        </div>
      </section>
    </LazyMotion>
  );
}
