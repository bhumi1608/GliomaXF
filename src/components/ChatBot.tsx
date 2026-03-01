import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, MapPin, Key, AlertCircle } from 'lucide-react';
import { chatWithGemini, findNearbyResearchCenters } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  content: string;
  places?: any[];
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Welcome to Gliomax Clinical Support. How can I assist you with neuro-oncology diagnostics today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        setHasKey(true); // Fallback for local dev if needed
      }
    };
    checkKey();
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!hasKey) {
      handleOpenKeySelector();
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Map history to Gemini format
      const history = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await chatWithGemini(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', content: response || 'I apologize, I encountered an error.' }]);
    } catch (error: any) {
      console.error(error);
      let errorMsg = 'Error connecting to clinical database.';
      if (error.message?.includes('entity was not found')) {
        setHasKey(false);
        errorMsg = 'API Key session expired. Please re-select your API key.';
      }
      setMessages(prev => [...prev, { role: 'model', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindCenters = async () => {
    if (!hasKey) {
      handleOpenKeySelector();
      return;
    }
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: 'Find nearby research centers' }]);
    
    try {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const result = await findNearbyResearchCenters(latitude, longitude);
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: result.text || 'Here are some research centers near you:',
          places: result.places
        }]);
        setIsLoading(false);
      }, () => {
        setMessages(prev => [...prev, { role: 'model', content: 'Location access denied. Please enable geolocation to find nearby centers.' }]);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel mb-4 w-[400px] h-[550px] rounded-2xl flex flex-col overflow-hidden shadow-2xl border-slate-200"
          >
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="font-heading font-semibold text-sm">Gliomax Clinical Support</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                <X size={18} />
              </button>
            </div>

            {!hasKey && (
              <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-medium">
                  <AlertCircle size={14} />
                  <span>API Key selection required for Pro models.</span>
                </div>
                <button 
                  onClick={handleOpenKeySelector}
                  className="bg-amber-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-amber-700 transition-colors flex items-center gap-1"
                >
                  <Key size={10} /> Select Key
                </button>
              </div>
            )}

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-surgical-blue text-white shadow-md' 
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}>
                    <div className="markdown-body prose prose-sm prose-slate max-w-none">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    {msg.places && msg.places.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.places.map((p: any, idx: number) => (
                          <a 
                            key={idx} 
                            href={p.maps?.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200 hover:border-surgical-blue transition-colors text-xs text-surgical-blue font-medium"
                          >
                            <MapPin size={12} />
                            {p.maps?.title || 'View on Maps'}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                    <Loader2 className="animate-spin text-slate-400" size={18} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white/50">
              <div className="flex gap-2 mb-2">
                <button 
                  onClick={handleFindCenters}
                  className="text-[10px] font-mono uppercase tracking-wider bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border border-slate-200 transition-colors flex items-center gap-1"
                >
                  <MapPin size={10} /> Find Centers
                </button>
                <button 
                  onClick={() => setMessages([{ role: 'model', content: 'Chat reset. How can I help?' }])}
                  className="text-[10px] font-mono uppercase tracking-wider bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border border-slate-200 transition-colors"
                >
                  Clear Chat
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={hasKey ? "Ask about diagnostics..." : "Select API key to start..."}
                  disabled={!hasKey && hasKey !== null}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-surgical-blue/20 transition-all disabled:opacity-50"
                />
                <button 
                  onClick={handleSend}
                  disabled={!hasKey && hasKey !== null}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-surgical-blue hover:text-blue-700 transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-800 transition-colors relative"
      >
        {isOpen ? <X /> : <MessageSquare />}
        {!hasKey && !isOpen && hasKey !== null && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};
