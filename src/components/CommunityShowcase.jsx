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
        prompt: 'Build me a Premium Enterprise SaaS',
        category: 'Website',
        items: [
          { id: 1, model: 'GLM 4.7', preview: '/images/website01.jpg' },
          { id: 2, model: 'Grok 4.1 Fast', preview: '/images/website02.jpg' },
          { id: 3, model: 'Claude 4.5 Sonnet', preview: '/images/website03.jpg' },
          { id: 4, model: 'DeepSeek-V3', preview: '/images/website04.jpg' },
          { id: 5, model: 'GPT-4o', preview: '/images/website05.jpg' },
          { id: 6, model: 'Llama 3.1 405B', preview: '/images/website06.jpg' },
          { id: 7, model: 'Gemini 1.5 Pro', preview: '/images/website07.jpg' },
          { id: 8, model: 'Mistral Large 2', preview: '/images/website08.jpg' }
        ]
      },
      {
        prompt: 'Photorealistic architectural visualization',
        category: 'Images',
        items: [
          { id: 9, model: 'DALL-E 3', preview: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop' },
          { id: 10, model: 'Midjourney v6', preview: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=500&fit=crop' },
          { id: 11, model: 'Stable Diffusion XL', preview: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop' },
          { id: 12, model: 'Flux Pro', preview: 'https://images.unsplash.com/photo-1600585154526-990dcea4d4dd?w=800&h=500&fit=crop' },
          { id: 13, model: 'Midjourney v6.1', preview: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=500&fit=crop' },
          { id: 14, model: 'DALL-E 3', preview: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=500&fit=crop' },
          { id: 15, model: 'Stable Diffusion 3', preview: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=500&fit=crop' },
          { id: 16, model: 'Flux.1 Dev', preview: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=500&fit=crop' }
        ]
      },
      {
        prompt: 'Cinematic drone shot of Iceland',
        category: 'Videos',
        items: [
          { id: 17, model: 'Sora', preview: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&h=500&fit=crop' },
          { id: 18, model: 'Kling AI', preview: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800&h=500&fit=crop' },
          { id: 19, model: 'Runway Gen-3', preview: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=500&fit=crop' },
          { id: 20, model: 'Luma Dream Machine', preview: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&h=500&fit=crop' },
          { id: 21, model: 'Pika 1.5', preview: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=500&fit=crop' },
          { id: 22, model: 'Haiper 2.0', preview: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop' },
          { id: 23, model: 'Stable Video', preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop' },
          { id: 24, model: 'Mochi-1', preview: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop' }
        ]
      },
      {
        prompt: 'Lo-fi hip hop beat for studying',
        category: 'Music',
        items: [
          { id: 25, model: 'Suno v3.5', preview: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=500&fit=crop' },
          { id: 26, model: 'Udio 1.5', preview: 'https://images.unsplash.com/photo-1514525253342-b0bb047622ff?w=800&h=500&fit=crop' },
          { id: 27, model: 'MusicLM', preview: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop' },
          { id: 28, model: 'Stable Audio 2', preview: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&h=500&fit=crop' },
          { id: 29, model: 'AIVA', preview: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop' },
          { id: 30, model: 'Amper Music', preview: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800&h=500&fit=crop' },
          { id: 31, model: 'Soundraw', preview: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=500&fit=crop' },
          { id: 32, model: 'Jukedeck', preview: 'https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?w=800&h=500&fit=crop' }
        ]
      }
    ];

    const filteredGroups = selectedCategory === 'All Categories' 
      ? showcaseGroups 
      : showcaseGroups.filter(group => group.category === selectedCategory);

    return (
      <section className="w-full py-32 px-4 bg-transparent relative z-10 overflow-hidden" id="community">
        <div className="max-w-[1400px] mx-auto">
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
                  key={group.category + groupIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ delay: groupIndex * 0.1, duration: 0.8 }}
                >
                  <div className="flex items-end justify-between mb-10 px-4">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-200 flex items-center justify-center shadow-lg">
                        <span className="text-3xl">
                          {group.category === 'Website' ? '🌐' : 
                           group.category === 'Images' ? '🖼️' :
                           group.category === 'Videos' ? '🎥' : '🎵'}
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {group.items.map((item, i) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -12, scale: 1.02 }}
                        className="group relative bg-white backdrop-blur-3xl border border-slate-200/50 rounded-[2rem] overflow-hidden shadow-[0_15px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] transition-all duration-500"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img 
                            src={item.preview} 
                            alt={item.model}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white border border-slate-200 shadow-xl transition-all">
                              <Maximize2 className="w-3.5 h-3.5 text-slate-900" />
                            </button>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-lg border border-white/20">
                              {item.model}
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-900 tracking-tight uppercase">Featured Design</p>
                            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-purple-50 group-hover:border-purple-100">
                              <Sparkles className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-600 transition-colors" />
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
