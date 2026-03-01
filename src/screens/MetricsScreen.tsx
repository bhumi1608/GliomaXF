import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Target, Zap, Info, TrendingUp, CheckCircle } from 'lucide-react';

const data = [
  { name: 'v1.0', score: 82 },
  { name: 'v2.0', score: 88 },
  { name: 'v3.0', score: 95 },
  { name: 'v4.1', score: 99.2 },
];

export const MetricsScreen: React.FC = () => {
  return (
    <div className="relative min-h-screen py-32 px-6 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded mb-6">
            <CheckCircle size={14} className="text-surgical-blue" />
            <span className="font-mono text-[10px] font-bold text-surgical-blue uppercase tracking-widest">Validation Metrics v4.1</span>
          </div>
          <h2 className="font-heading text-5xl font-bold text-slate-900 tracking-tight mb-6">Clinical Performance</h2>
          <p className="text-slate-500 text-xl font-light leading-relaxed">
            Performance benchmarks against standard U-Net architectures showing superior segmentation accuracy in high-grade glioma detection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sensitivity Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-2xl border-slate-200 flex flex-col h-[400px]"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Sensitivity (Dice Score)</span>
              <Activity size={20} className="text-slate-300" />
            </div>
            
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-7xl font-heading font-bold text-slate-900 tracking-tighter">99.2%</span>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100">
                <TrendingUp size={14} />
                +4.2%
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium mb-8">vs. Previous Model (v3.0)</p>

            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Specificity Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-2xl border-slate-200 flex flex-col h-[400px]"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Specificity (vs. GBM)</span>
              <Target size={20} className="text-slate-300" />
            </div>
            
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-7xl font-heading font-bold text-slate-900 tracking-tighter">98.8%</span>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100">
                <TrendingUp size={14} />
                +2.4%
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium mb-12">True Negative Rate</p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase mb-2">
                  <span>Standard U-Net</span>
                  <span className="text-slate-900 font-bold">Gliomax v4.1</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-surgical-blue w-[98.8%] transition-all duration-1000" />
                </div>
              </div>
              
              <div className="flex gap-8">
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase mb-1">False Positives</div>
                  <div className="text-xl font-heading font-bold text-slate-900">0.8%</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase mb-1">Precision</div>
                  <div className="text-xl font-heading font-bold text-slate-900">99.1%</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Latency Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-2xl border-slate-200 flex flex-col h-[400px]"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Inference Latency</span>
              <Zap size={20} className="text-slate-300" />
            </div>
            
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-7xl font-heading font-bold text-slate-900 tracking-tighter">&lt; 4s</span>
            </div>
            <p className="text-xs text-slate-400 font-medium mb-12">Per 256³ Voxel Volume</p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded border border-slate-100 shadow-sm">
                    <Activity size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">GPU Processing</div>
                    <div className="text-sm font-bold text-slate-900">3.2s avg</div>
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-surgical-blue w-[70%]" />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded border border-slate-100 shadow-sm">
                    <Zap size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Data Transfer</div>
                    <div className="text-sm font-bold text-slate-900">0.6s avg</div>
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 w-[25%]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400">
          <div className="flex items-center gap-2">
            <Info size={16} />
            <span className="text-sm">Data validated against BraTS 2023 dataset.</span>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-widest mb-1">Total Scans</span>
              <span className="text-sm font-mono font-bold text-slate-900">12,405</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-widest mb-1">False Negatives</span>
              <span className="text-sm font-mono font-bold text-slate-900">0.4%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-widest mb-1">p-Value</span>
              <span className="text-sm font-mono font-bold text-slate-900">&lt; 0.001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
