import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X } from 'lucide-react';
import { askSiri } from '../../services/geminiService';
import { ChatMessage } from '../../types';

interface SiriProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Siri: React.FC<SiriProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'model', text: "What can I help you with?" }]);
      setTimeout(() => inputRef.current?.focus(), 500);
    } else {
      setQuery('');
      setMessages([]);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsThinking(true);

    const responseText = await askSiri(query);
    setIsThinking(false);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-auto">
      {/* Siri Aura Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" onClick={onClose} />
      
      {/* Siri Glowing Border Effect (Simulated via overlay) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500/20 via-blue-500/20 to-transparent pointer-events-none animate-pulse" />

      <div className="relative z-10 p-6 pb-12 w-full flex flex-col items-center justify-end h-full space-y-4">
        
        {/* Chat History */}
        <div className="w-full space-y-4 mb-4 overflow-y-auto max-h-[60vh] scrollbar-hide px-2">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`max-w-[85%] p-4 rounded-3xl text-lg backdrop-blur-xl shadow-lg transform transition-all duration-300 ${
                msg.role === 'user' 
                  ? 'ml-auto bg-white/10 text-white rounded-br-sm' 
                  : 'mr-auto bg-gradient-to-br from-white/20 to-white/5 text-white border border-white/10 rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isThinking && (
             <div className="mr-auto max-w-[85%] p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 flex space-x-2">
               <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}/>
               <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}/>
               <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}/>
             </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to Siri..."
            className="w-full bg-black/40 border border-white/10 text-white placeholder-white/50 rounded-full py-4 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-xl shadow-2xl transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            {query ? <Send size={20} /> : <Mic size={20} />}
          </button>
        </form>

        {/* Siri Orb Graphic */}
        <div 
          className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-red-400 blur-xl opacity-80 animate-pulse cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
             // Visual only trigger
          }}
        ></div>
      </div>
    </div>
  );
};