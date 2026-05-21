"use client";
import React, { useState } from 'react';

export default function AIConcierge() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Has sobrevivido al experimento. Ahora es tu turno.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Hmm... analizando datos. Te garantizo que podemos inyectarle nitro a tu negocio. Datos encriptados y enviados a nuestro núcleo Express. Un humano de nuestro equipo táctico te contactará.' 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-[#050505] py-24 flex items-center justify-center relative px-4">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-12 shadow-2xl relative z-10">
         <div className="flex justify-center mb-12">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 blur-sm flex items-center justify-center transition-all duration-300 ${isTyping ? 'scale-110 animate-pulse' : 'scale-100'}`}>
               <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                  <span className="text-white/50 text-xs font-mono">AI</span>
               </div>
            </div>
         </div>

         <div className="space-y-6 mb-8 h-48 overflow-y-auto pr-2 custom-scrollbar">
            {messages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm ${msg.role === 'user' ? 'bg-white text-black font-medium' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                     {msg.text}
                  </div>
               </div>
            ))}
            {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 flex gap-1">
                     <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-100"></span>
                     <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-200"></span>
                  </div>
               </div>
            )}
         </div>

         <form onSubmit={handleSubmit} className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm pointer-events-none">
               {">"}
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe la URL de tu negocio..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-white/20 transition-colors font-mono text-sm"
            />
         </form>
      </div>
    </section>
  );
}
