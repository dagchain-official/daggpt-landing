import React from 'react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden bg-transparent pt-32 pb-16">
      {/* Content Container */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants} 
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Powered by Next-Gen Intelligence
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-8 leading-[0.9] tracking-tighter"
        >
          FUTURE OF <br />
          <span className="relative inline-block mt-2">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              CREATIVITY
            </span>
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-12"
        >
          Experience the most advanced AI ecosystem. Build, create, and innovate with tools designed for the next generation of digital excellence.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-10 h-10 rounded-full border-2 border-[#030303] bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xl"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-[#030303] bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
              +50k
            </div>
          </div>
          <p className="text-xs font-medium text-white/40 tracking-wider uppercase">
            Trusted by the world's most innovative teams
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
