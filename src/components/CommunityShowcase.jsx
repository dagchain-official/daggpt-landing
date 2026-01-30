import React, { useState } from 'react';
import { Maximize2, Copy, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommunityShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    { name: 'All Categories', icon: Sparkles, color: 'from-purple-500 to-blue-500' },
    { name: 'Website', icon: Filter, color: 'from-blue-500 to-cyan-500' },
    { name: 'Images', icon: Filter, color: 'from-pink-500 to-rose-500' },
    { name: 'Videos', icon: Filter, color: 'from-orange-500 to-amber-500' },
    { name: 'Music', icon: Filter, color: 'from-emerald-500 to-teal-500' }
  ];

  const showcaseGroups = [
    {
      prompt: 'Build me a Portfolio website',
      category: 'Website',
      items: [
        { id: 1, model: 'GLM 4.7', rank: '1st', preview: '/images/website01.jpg' },
        { id: 2, model: 'Grok 4.1 Fast', rank: '2nd', preview: '/images/website02.jpg' },
        { id: 3, model: 'Claude 4.5 Sonnet', rank: '3rd', preview: '/images/website03.jpg' },
        { id: 4, model: 'DeepSeek-V3-0324', rank: '4th', preview: '/images/website04.jpg' }
      ]
    },
    {
      prompt: 'generate a photorealistic sunset over mountains',
      category: 'Images',
      items: [
        { id: 9, model: 'DALL-E 3', rank: '1st', preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
        { id: 10, model: 'Midjourney v6', rank: '2nd', preview: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop' },
        { id: 11, model: 'Stable Diffusion XL', rank: '3rd', preview: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop' },
        { id: 12, model: 'Flux Pro', rank: '4th', preview: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop' }
      ]
    }
  ];

  const filteredGroups = selectedCategory === 'All Categories' 
    ? showcaseGroups 
    : showcaseGroups.filter(group => group.category === selectedCategory);

  return (
    <section className="w-full py-32 px-4 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Community Gallery</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Designed by the <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Future Community</span>
          </h2>
        </motion.div>

        {/* Filter Bar */}
        <div className="mb-16 flex items-center justify-center gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`relative px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                selectedCategory === category.name
                  ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)]'
                  : 'bg-white/5 text-white/40 hover:text-white border border-white/5'
              }`}
            >
              {category.name}
              {selectedCategory === category.name && (
                <motion.div layoutId="catGlow" className="absolute -inset-[1px] rounded-2xl border border-white/50 opacity-50" />
              )}
            </button>
          ))}
        </div>

        {/* Showcase Groups */}
        <div className="space-y-24">
          <AnimatePresence mode="wait">
            {filteredGroups.map((group, groupIndex) => (
              <motion.div 
                key={groupIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                <div className="flex items-center justify-between mb-8 px-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-2xl`}>
                      <span className="text-xl">
                        {group.category === 'Website' ? '🌐' : '🖼️'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{group.category}</p>
                      <p className="text-lg font-medium text-white/80 italic">"{group.prompt}"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white/60 hover:text-white transition-all">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -10 }}
                      className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={item.preview} 
                          alt={item.model}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
                        
                        <div className="absolute top-4 left-4">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            item.rank === '1st' ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white/80'
                          }`}>
                            {item.rank} Place
                          </span>
                        </div>

                        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 border border-white/10">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Model</p>
                            <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{item.model}</p>
                          </div>
                          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white/40 group-hover:text-purple-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
