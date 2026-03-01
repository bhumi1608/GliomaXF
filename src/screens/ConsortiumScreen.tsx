import React from 'react';
import { motion } from 'motion/react';
import { Microscope, Cpu, ClipboardList, Box } from 'lucide-react';

const researchers = [
  {
    name: "Anshuman Shukla",
    institution: "PIET",
    role: "Leader",
    icon: <Cpu size={24} />,
  },
  {
    name: "Sarah Chen, PhD",
    institution: "MIT CSAIL",
    role: "Lead: Computer Vision",
    icon: <Cpu size={24} />,
  },
  {
    name: "Dr. James Void",
    institution: "Charité Berlin",
    role: "Clinical Validation",
    icon: <ClipboardList size={24} />,
  },
  {
    name: "Mark Stryker",
    institution: "Stanford Health",
    role: "System Architecture",
    icon: <Box size={24} />,
  },
];

const partners = [
  "https://picsum.photos/seed/jh/200/80?grayscale",
  "https://picsum.photos/seed/mit/200/80?grayscale",
  "https://picsum.photos/seed/charite/200/80?grayscale",
  "https://picsum.photos/seed/stanford/200/80?grayscale",
  "https://picsum.photos/seed/siemens/200/80?grayscale",
];

export const ConsortiumScreen: React.FC = () => {
  return (
    <div className="relative min-h-screen py-32 px-6 lg:px-24 overflow-hidden flex flex-col">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10 flex-grow">
        <div className="text-center mb-24">
          <span className="inline-block py-1 px-4 rounded-full bg-slate-100 text-slate-500 text-[10px] font-heading font-bold tracking-[0.2em] uppercase border border-slate-200 mb-6">
            Consortium
          </span>
          <h2 className="text-slate-400 font-heading font-semibold text-sm tracking-[0.3em] uppercase mb-4">Developed in Partnership With</h2>
          <div className="h-px w-24 bg-slate-300 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {researchers.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-xl p-8 border-slate-200 flex flex-col justify-between h-[320px] group transition-all duration-300"
            >
              <div>
                <div className="w-14 h-14 mb-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-400 group-hover:text-surgical-blue group-hover:bg-blue-50 transition-colors">
                  {person.icon}
                </div>
                <h3 className="text-slate-900 font-heading font-bold text-xl mb-1">{person.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{person.institution}</p>
              </div>
              
              <div className="pt-6 border-t border-slate-100">
                <span className="text-slate-400 font-mono text-[9px] uppercase tracking-widest block mb-2">Role</span>
                <span className="text-slate-700 font-mono text-[10px] bg-slate-100 px-3 py-1.5 rounded border border-slate-200 inline-block font-bold">
                  {person.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-20 pb-12">
          <p className="text-center text-slate-400 text-[10px] font-mono mb-12 uppercase tracking-[0.4em] font-bold">Trust & Verification Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {partners.map((url, i) => (
              <img 
                key={i} 
                src={url} 
                alt="Partner Logo" 
                className="h-10 object-contain"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-12 border-t border-slate-200/60">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-[10px] font-mono uppercase tracking-widest font-bold">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Microscope size={16} />
              <span>GLIOMAX</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-slate-200" />
            <p>© 2024 Gliomax Precision Glass. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-12">
            <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GitHub (Private)</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
