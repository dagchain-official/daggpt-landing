import React, { useState } from 'react';
import { Maximize2, Copy, Sparkles, Filter, Layout, Image as ImageIcon, Video, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommunityShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    { name: 'All Categories', icon: Sparkles, color: 'from-purple-500 to-blue-500' },
    { name: 'Website', icon: Layout, color: 'from-blue-500 to-cyan-500' },
    { name: 'Images', icon: ImageIcon, color: 'from-pink-500 to-rose-500' },
    { name: 'Videos', icon: Video, color: 'from-orange-500 to-amber-500' },
    { name: 'Music', icon: Music, color: 'from-emerald-500 to-teal-500' }
  ];

  const showcaseGroups = [
    {
      prompt: 'Build me a Portfolio website',
      category: 'Website',
      items: [
        { id: 1, model: 'GLM 4.7', rank: '1st', preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop' },
        { id: 2, model: 'Grok 4.1 Fast', rank: '2nd', preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop' },
        { id: 3, model: 'Claude 4.5 Sonnet', rank: '3rd', preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' },
        { id: 4, model: 'DeepSeek-V3-0324', rank: '4th', preview: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop' }
      ]
    },
    {
      prompt: 'Photorealistic sunset over mountains',
      category: 'Images',
      items: [
        { id: 9, model: 'DALL-E 3', rank: '1st', preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop' },
        { id: 10, model: 'Midjourney v6', rank: '2nd', preview: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop' },
        { id: 11, model: 'Stable Diffusion XL', rank: '3rd', preview: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop' },
        { id: 12, model: 'Flux Pro', rank: '4th', preview: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop' }
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
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/40 border border-slate-200 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Community Gallery</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
            Designed by the <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Creative Community</span>
          </h2>
        </motion.div>

        {/* Filter Bar */}
        <div className="mb-20 flex items-center justify-center gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`relative px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 border ${
                selectedCategory === category.name
                  ? 'bg-slate-900 text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-slate-900'
                  : 'bg-white text-slate-500 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <category.icon className={`w-4 h-4 ${selectedCategory === category.name ? 'text-white' : 'text-slate-400'}`} />
                {category.name}
              </div>
              {selectedCategory === category.name && (
                <motion.div layoutId="catGlow" className="absolute -inset-[1px] rounded-2xl border border-white/20 opacity-50" />
              )}
            </button>
          ))}
        </div>

        {/* Showcase Groups */}
        <div className="space-y-32">
          <AnimatePresence mode="wait">
            {filteredGroups.map((group, groupIndex) => (
              <motion.div 
                key={groupIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ delay: groupIndex * 0.1, duration: 0.8 }}
              >
                <div className="flex items-end justify-between mb-10 px-4">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-200 flex items-center justify-center shadow-lg">
                      <span className="text-3xl">
                        {group.category === 'Website' ? '🌐' : '🖼️'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{group.category}</p>
                      <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none italic">"{group.prompt}"</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all shadow-sm">
                      <Copy className="w-4 h-4" />
                      COPY PROMPT
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -12, scale: 1.02 }}
                      className="group relative bg-white backdrop-blur-3xl border border-slate-200/50 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] transition-all duration-500"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img 
                          src={item.preview} 
                          alt={item.model}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="absolute top-6 left-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border ${
                            item.rank === '1st' 
                              ? 'bg-yellow-400 text-slate-900 border-yellow-300' 
                              : 'bg-white/90 text-slate-800 border-slate-200 backdrop-blur-md'
                          }`}>
                            {item.rank}
                          </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <button className="p-3 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white border border-slate-200 shadow-xl transition-all">
                            <Maximize2 className="w-4 h-4 text-slate-900" />
                          </button>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5">Model</p>
                            <p className="text-sm font-black text-slate-900 tracking-tight">{item.model}</p>
                          </div>
                          <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-purple-50 group-hover:border-purple-100">
                            <Sparkles className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
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
