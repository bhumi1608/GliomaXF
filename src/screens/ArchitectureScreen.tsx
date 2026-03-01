import React from 'react';
import { motion } from 'motion/react';
import { Layers, Info, AlertCircle, Search } from 'lucide-react';

export const ArchitectureScreen: React.FC = () => {
  return (
    <div className="relative min-h-screen py-32 px-6 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-surgical-blue font-mono text-xs tracking-widest uppercase font-bold">
              <Layers size={14} />
              Exploded Analysis View
            </div>
            <h2 className="font-heading text-5xl font-bold text-slate-900 tracking-tight mb-6">
              The Architecture
            </h2>
            <p className="text-slate-500 text-xl font-light leading-relaxed">
              Visualizing the hybrid CNN-Transformer pipeline. Decomposing the logic layers from input MRI to attention-based glioma segmentation.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Input Resolution</div>
            <div className="font-mono text-sm font-semibold text-slate-900">256 x 256 x 128</div>
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-4">Processing Latency</div>
            <div className="font-mono text-sm font-semibold text-slate-900">~12ms / Volume</div>
          </div>
        </div>

        <div className="relative h-[800px] flex items-center justify-center">
          {/* Vertical Connectors */}
          <div className="absolute w-[1px] h-[500px] border-l-2 border-dashed border-slate-200 left-1/2 -ml-[200px] top-[150px] opacity-40" />
          <div className="absolute w-[1px] h-[500px] border-l-2 border-dashed border-slate-200 left-1/2 ml-[200px] top-[150px] opacity-40" />

          {/* Layer 1: Input MRI */}
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute top-0 z-30 group"
          >
            <div className="relative w-[450px] h-[300px] [transform:rotateX(55deg)_rotateZ(-45deg)] rounded-lg shadow-2xl overflow-hidden bg-black border border-white/20">
              <img 
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuDfCQyftEzVJM1GziHEesD76r6Gk61sxeaNCsk-L_M5fyr5I2cNmTudfgy1BFnBFauBo8EOePzRBanR8Uu2DuKBi2hMac6aSCX8k92q0_2WVC-6-CnckKSfLxONxNmWbD6xjOilTcoH_h3sL1_y4mS8wJZdYP1d_QELk2_HV1ASkgfi-lgowBTby0WQ_uB6jk5cqx31QtLeiXeGmkLgpsKd2GG-R_cMLEN4WL7BQcPmwxRv8yY3ED5Q8SWB2Dn73FYxKHgv6Fl1o8xN'
                alt="MRI Scan" 
                className="w-full h-full object-cover opacity-90 contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-1 bg-white/30 shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-scan" />
            </div>
            
            <div className="absolute top-10 -left-[300px] w-72 glass-panel p-6 rounded-lg border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Layer 01</span>
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">Input MRI (T1ce)</h3>
              <div className="h-px w-full bg-slate-100 my-3" />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Type: Grayscale</span>
                <span>3.0 Tesla</span>
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Feature Extraction */}
          <motion.div 
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute top-[30%] z-20 group"
          >
            <div className="relative w-[450px] h-[300px] [transform:rotateX(55deg)_rotateZ(-45deg)] rounded-lg shadow-xl overflow-hidden bg-slate-900 border border-surgical-blue/30">
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_40%)]" />
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-surgical-blue rounded-full shadow-[0_0_10px_#3B82F6]" />
              <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-surgical-blue rounded-full shadow-[0_0_15px_#3B82F6]" />
              <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-surgical-blue rounded-full shadow-[0_0_8px_#3B82F6]" />
            </div>
            
            <div className="absolute top-10 -right-[300px] w-72 glass-panel p-6 rounded-lg border-l-4 border-l-surgical-blue border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-surgical-blue uppercase tracking-widest">Layer 02</span>
                <span className="w-2 h-2 rounded-full bg-surgical-blue" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">Feature Extraction</h3>
              <div className="h-px w-full bg-slate-100 my-3" />
              <div className="flex flex-col gap-2 text-[10px] font-mono text-slate-500">
                <div className="flex justify-between"><span>Arch:</span> <span className="text-slate-900 font-bold">ResNet50</span></div>
                <div className="flex justify-between"><span>Features:</span> <span className="text-slate-900 font-bold">2048 dims</span></div>
              </div>
            </div>
          </motion.div>

          {/* Layer 3: Attention Map */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute top-[60%] z-10 group"
          >
            <div className="relative w-[450px] h-[300px] [transform:rotateX(55deg)_rotateZ(-45deg)] rounded-lg shadow-xl overflow-hidden bg-slate-900 border border-clinical-red/40">
              <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_60%_40%,rgba(239,68,68,0.9),rgba(239,68,68,0.4)_20%,transparent_60%)]" />
              <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-clinical-red/50 rounded-full animate-ping" />
            </div>
            
            <div className="absolute top-10 -left-[300px] w-72 glass-panel p-6 rounded-lg border-l-4 border-l-clinical-red border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-clinical-red uppercase tracking-widest">Layer 03</span>
                <span className="w-2 h-2 rounded-full bg-clinical-red animate-pulse" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">Attention Map (ViT)</h3>
              <div className="h-px w-full bg-slate-100 my-3" />
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Transformer self-attention identifies high-grade glioma regions ignored by CNNs.
              </p>
              <div className="inline-flex items-center gap-2 bg-red-50 text-clinical-red px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest">
                <Search size={12} />
                Target Located
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
