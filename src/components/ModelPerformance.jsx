import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import leaderboardService from '../services/leaderboardService';

// Company logo components (SVG)
const CompanyLogos = {
  OpenAI: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  ),
  Anthropic: () => (
    <img src="/claude-ai-icon.svg" alt="Anthropic Claude" className="w-6 h-6" />
  ),
  Google: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  ),
  Meta: () => (
    <img src="/meta-icon.svg" alt="Meta" className="w-6 h-6" />
  ),
  Mistral: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F2A73B">
      <rect x="1" y="1" width="5" height="5" rx="0.5"/>
      <rect x="1" y="7" width="5" height="5" rx="0.5"/>
      <rect x="1" y="13" width="5" height="5" rx="0.5"/>
      <rect x="7" y="1" width="5" height="5" rx="0.5"/>
      <rect x="13" y="1" width="5" height="5" rx="0.5"/>
      <rect x="19" y="1" width="4" height="5" rx="0.5"/>
      <rect x="13" y="7" width="5" height="5" rx="0.5"/>
      <rect x="19" y="7" width="4" height="5" rx="0.5"/>
    </svg>
  ),
  'Mistral AI': () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F2A73B">
      <rect x="1" y="1" width="5" height="5" rx="0.5"/>
      <rect x="1" y="7" width="5" height="5" rx="0.5"/>
      <rect x="1" y="13" width="5" height="5" rx="0.5"/>
      <rect x="7" y="1" width="5" height="5" rx="0.5"/>
      <rect x="13" y="1" width="5" height="5" rx="0.5"/>
      <rect x="19" y="1" width="4" height="5" rx="0.5"/>
      <rect x="13" y="7" width="5" height="5" rx="0.5"/>
      <rect x="19" y="7" width="4" height="5" rx="0.5"/>
    </svg>
  ),
  DeepSeek: () => (
    <img src="/deepseek-logo-icon.svg" alt="DeepSeek" className="w-6 h-6" />
  ),
  Alibaba: () => (
    <img src="/qwen-ai-icon.svg" alt="Qwen" className="w-6 h-6" />
  ),
    xAI: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    '01.AI': () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#6366F1">
        <circle cx="12" cy="12" r="10" fill="#6366F1"/>
        <text x="12" y="16" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">01</text>
      </svg>
    ),
    Cohere: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#111827">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    Baidu: () => (
      <img src="/baidu-icon.svg" alt="Baidu" className="w-6 h-6" />
    )
  };

const getCompanyLogo = (organization) => {
  const LogoComponent = CompanyLogos[organization];
  return LogoComponent ? <LogoComponent /> : null;
};

export function ModelPerformance() {
  const [modelData, setModelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const data = await leaderboardService.fetchModelLeaderboard();
      if (data && data.length > 0) {
        setModelData(data);
      } else {
        setModelData(leaderboardService.getFallbackData());
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      setModelData(leaderboardService.getFallbackData());
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-32 px-4 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20 text-center md:text-left">
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#001219] mb-8 tracking-tighter"
          >
            The Intelligence <br />
            <span className="bg-gradient-to-r from-[#132A13] via-[#31572C] to-[#90A955] bg-clip-text text-transparent font-black tracking-tighter">Leaderboard</span>
          </motion.h2>
          
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 max-w-3xl leading-relaxed font-normal mb-10"
            >
              Real-time performance analytics across the world's most capable AI models. 
              Ranked using the <span className="text-slate-900 font-semibold italic">Bradley-Terry Elo system</span> based on millions of head-to-head creative matchups.
            </motion.p>
          </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { label: "Total Models", value: `${modelData.length}+`, icon: TrendingUp, color: "text-[#132A13]" },
                { label: "Avg Latency", value: "0.8s", icon: Zap, color: "text-[#31572C]" },
                { label: "Uptime", value: "99.99%", icon: Clock, color: "text-[#4F772D]" }
              ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 group hover:border-[#E9D8A6] transition-all shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-110 transition-transform">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-[#001219] tracking-tighter">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        {/* Model Performance Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200/50 p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]"
        >
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <h3 className="text-2xl font-black text-[#001219] tracking-tighter">Elo Rating Distribution</h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-[#132A13] rounded-full shadow-[0_0_10px_rgba(19,42,19,0.3)]" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ultra Class</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-[#4F772D] rounded-full shadow-[0_0_10px_rgba(79,119,45,0.3)]" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pro Class</span>
                    </div>
                  </div>
            </div>

          {/* Chart Container */}
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            {loading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-[#31572C] rounded-full animate-spin" />
              </div>
            ) : (
                  <div className="flex items-end justify-start gap-4 min-w-max px-2" style={{ height: '550px' }}>
                  {modelData.map((model, index) => {
                    const minScore = Math.min(...modelData.map(m => m.score));
                    const maxScore = Math.max(...modelData.map(m => m.score));
                    const scoreRange = maxScore - minScore;
                    
                    let heightPercentage;
                      if (scoreRange > 0) {
                        const normalized = (model.score - minScore) / scoreRange;
                        heightPercentage = (normalized * 30) + 60; 
                      } else {
                      heightPercentage = 75;
                    }
                    
                      const greenPalette = ['#132A13', '#31572C', '#4F772D', '#90A955', '#ECF39E'];
                    
                      return (
                          <div 
                            key={`${model.name}-${index}`}
                            className="flex flex-col items-center gap-4 group cursor-pointer min-w-[90px]"
                          >
                            <div className="relative flex items-end justify-center w-12 h-[420px]">
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{ height: `${heightPercentage}%`, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                style={{ backgroundColor: greenPalette[index % greenPalette.length] }}
                                className={`w-full rounded-xl transition-all duration-500 group-hover:scale-x-105 group-hover:brightness-110 relative flex flex-col items-center shadow-lg border border-white/10`}
                              >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                
                                {/* Score at top of bar */}
                                <div className="pt-3 text-[10px] font-black text-white/90 tracking-tighter z-10">
                                  {model.score}
                                </div>

                                {/* Logo in circle at bottom of bar */}
                                <div className="absolute -bottom-6 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform z-20">
                                  <div className="w-6 h-6 flex items-center justify-center filter brightness-100">
                                    {getCompanyLogo(model.organization)}
                                  </div>
                                </div>
                              </motion.div>
                            
                            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                              <div className="px-4 py-2 bg-[#001219] text-white text-[11px] font-black rounded-xl shadow-2xl flex flex-col items-center border border-white/10">
                                <span className="text-[#ECF39E] text-[8px] uppercase tracking-widest mb-1">ELO RATING</span>
                                {model.score}
                              </div>
                            </div>
                          </div>

                        <div className="text-center mt-8">
                          <p className="text-[10px] font-black text-slate-800 tracking-tighter leading-tight uppercase max-w-[80px] line-clamp-2">
                            {model.name}
                          </p>
                        </div>
                      </div>
                    );
                })}
              </div>
            )}
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-2xl">
              * Benchmarks are calculated using an ensemble of human evaluation and automated metrics. 
              Values are refreshed daily at 00:00 UTC to ensure maximum accuracy across model iterations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
