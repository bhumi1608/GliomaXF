import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroScreen } from './screens/HeroScreen';
import { ArchitectureScreen } from './screens/ArchitectureScreen';
import { MetricsScreen } from './screens/MetricsScreen';
import { ConsortiumScreen } from './screens/ConsortiumScreen';
import { AnalysisScreen } from './screens/AnalysisScreen';
import { ChatBot } from './components/ChatBot';
import { Microscope, Menu,BrainCircuit , X, ChevronRight } from 'lucide-react';

type Screen = 'hero' | 'architecture' | 'metrics' | 'consortium' | 'analysis';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Screen; label: string }[] = [
    { id: 'hero', label: 'Overview' },
    { id: 'analysis', label: 'Diagnosis' },
    { id: 'architecture', label: 'Technology' },
    { id: 'metrics', label: 'Validation' },
    { id: 'consortium', label: 'Team' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 px-6 py-4 ${
        isScrolled ? 'pt-2' : 'pt-6'
      }`}>
        <div className={`mx-auto max-w-7xl glass-panel rounded-sm flex items-center justify-between px-8 py-4 border-slate-200/50 transition-all ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}>
          <div 
            className="flex items-center gap-3 text-slate-900 cursor-pointer group"
            onClick={() => setActiveScreen('hero')}
          >
            <div className="size-6 text-slate-900 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <BrainCircuit size={24} />
            </div>
            <h2 className="font-heading font-bold text-xl tracking-tighter uppercase">GLIOMAX</h2>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                  activeScreen === item.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {item.label}
                {activeScreen === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-surgical-blue rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveScreen('consortium')}
              className="hidden sm:flex items-center justify-center rounded-sm bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest h-10 px-6 transition-all shadow-md shadow-slate-200"
            >
              Contact Research Group
            </button>
            <button 
              className="md:hidden text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[80] bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveScreen(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-3xl font-heading font-bold text-left flex items-center justify-between ${
                    activeScreen === item.id ? 'text-surgical-blue' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                  <ChevronRight size={24} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative pt-28 md:pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activeScreen === 'hero' && <HeroScreen onNavigate={setActiveScreen} />}
            {activeScreen === 'analysis' && <AnalysisScreen />}
            {activeScreen === 'architecture' && <ArchitectureScreen />}
            {activeScreen === 'metrics' && <MetricsScreen />}
            {activeScreen === 'consortium' && <ConsortiumScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
}
