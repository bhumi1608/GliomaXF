import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle, Activity, Layers, Zap } from 'lucide-react';

export const HeroScreen: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-24 z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surgical-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-surgical-blue"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-surgical-blue uppercase tracking-widest">
              FDA Breakthrough Device Designation
            </span>
          </div>

          <h1 className="font-heading font-bold text-6xl lg:text-7xl text-slate-900 leading-[1.05] tracking-tight mb-8">
            Precision <br />
            <span className="text-slate-400">Neuro-Oncology.</span>
          </h1>

          <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg">
            Hybrid CNN-Transformer architecture for multi-class brain tumor classification (Glioma, Meningioma, Pituitary) with <span className="text-slate-900 font-semibold">99.2% voxel-level accuracy</span>. Visualizing the invisible for surgical confidence.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              View Validation Data
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
              <PlayCircle size={24} />
              Watch Demo
            </button>
          </div>

          <div className="mt-20 flex items-center gap-8">
            <div className="glass-panel px-4 py-2 rounded-sm flex items-center gap-4 text-[10px] font-mono text-slate-500 border-slate-200">
              <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Model: G-Max v4.1</span>
              </div>
              <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                <span>Status: Inference Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} className="text-surgical-blue" />
                <span>Latency: 12ms</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visualizer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative flex items-center justify-center min-h-[400px] lg:min-h-[600px] w-full"
        >
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center scale-75 sm:scale-90 lg:scale-100">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl -z-10" />
            
            {/* HUD Rings */}
            <div className="absolute inset-0 border border-slate-200/30 rounded-full scale-90 animate-pulse" />
            <div className="absolute inset-0 border border-slate-100/50 rounded-full scale-75" />
            
            {/* Technical Labels */}
            <div className="absolute top-10 right-0 text-[10px] font-mono text-slate-400 text-right">
              <div>Z-AXIS: 124.5mm</div>
              <div>VOXEL: 0.5mm³</div>
            </div>
            
            <div className="absolute bottom-10 right-10 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-clinical-red rounded-full animate-pulse" />
                TUMOR DETECTED
              </div>
            </div>

            {/* The Brain (CSS Morphing) */}
            <div className="relative animate-float scale-75 sm:scale-100">
              <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] bg-gradient-to-br from-white/80 via-blue-50/40 to-blue-100/10 rounded-[40%_50%_45%_45%] blur-[2px] shadow-inner border border-white/50 animate-morph relative overflow-hidden">
                {/* Tumor Node */}
                <div className="absolute top-[40%] left-[55%] w-16 h-12 bg-gradient-to-r from-red-500/80 to-red-400/20 rounded-full blur-md animate-pulse-red" />
                
                {/* Scan Line */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent h-1 w-full animate-scan" />
                
                {/* Glossy Highlights */}
                <div className="absolute top-10 left-10 w-20 h-10 bg-white/30 blur-md rounded-full -rotate-45" />
              </div>
            </div>

            {/* Floating Info Panels */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-0 glass-panel p-4 rounded-sm border-slate-200"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Confidence</span>
                <span className="text-2xl font-heading font-bold text-slate-900">99.2%</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-0 glass-panel p-4 rounded-sm border-slate-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-900 border border-slate-200">
                  <Layers size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Architecture</span>
                  <span className="text-sm font-semibold text-slate-900">CNN + ViT</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
