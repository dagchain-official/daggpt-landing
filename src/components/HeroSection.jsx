import React from 'react';
import { motion } from 'framer-motion';
import { HexagonBackground } from './ui/hexagon-background';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Premium Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <HexagonBackground 
          hexagonSize={60} 
          hexagonMargin={2}
          className="bg-transparent"
          hexagonProps={{
            className: "before:bg-gray-100 after:bg-white hover:before:bg-purple-200 hover:after:bg-purple-50/50"
          }}
        />
      </div>

      {/* Radial Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_white_80%)]" />

      {/* Content Container */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center px-4 pt-20 pb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">The Future of AI is Here</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight"
        >
          Your Intelligent <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent" style={{ fontFamily: 'Nasalization, sans-serif' }}>
              AI ASSISTANT
            </span>
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            />
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium mb-4"
        >
          Unleash the power of DAGGPT. Generate content, images, and code with the world's most advanced AI models in one unified platform.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-4 text-sm text-gray-400 font-medium"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm`}>
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span>Trusted by 50,000+ creators and developers</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
