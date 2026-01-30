import React from 'react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative w-full min-h-[45vh] flex flex-col items-center justify-center overflow-hidden bg-transparent pt-32 pb-12">
      {/* Content Container */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
          className="text-7xl md:text-9xl lg:text-[11rem] font-black text-slate-900 mb-8 leading-[0.85] tracking-tighter"
          style={{ fontFamily: 'Nasalization, sans-serif' }}
        >
          FUTURE OF <br />
          <span className="relative inline-block mt-4">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CREATIVITY
            </span>
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal mb-12"
        >
          Experience the most advanced AI ecosystem. Build, create, and innovate with tools designed for the next generation of digital excellence.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-11 h-11 rounded-full border-4 border-white bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm overflow-hidden"
              >
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="w-11 h-11 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-800 shadow-sm">
              +50k
            </div>
          </div>
          <p className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">
            Trusted by the world's most innovative teams
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
