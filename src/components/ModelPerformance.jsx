import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Zap, Clock, RefreshCw } from 'lucide-react';
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
  Baidu: () => (
    <img src="/baidu-icon.svg" alt="Baidu" className="w-6 h-6" />
  )
};

const getCompanyLogo = (organization) => {
  const LogoComponent = CompanyLogos[organization];
  return LogoComponent ? <LogoComponent /> : null;
};

export function ModelPerformance() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [modelData, setModelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch real leaderboard data on component mount
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const data = await leaderboardService.fetchModelLeaderboard();
      console.log('Leaderboard data received:', data);
      console.log('Number of models:', data?.length);
      if (data && data.length > 0) {
        setModelData(data);
      } else {
        console.warn('No data received, using fallback');
        setModelData(leaderboardService.getFallbackData());
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      const fallbackData = leaderboardService.getFallbackData();
      console.log('Using fallback data:', fallbackData);
      console.log('Fallback data length:', fallbackData?.length);
      setModelData(fallbackData);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All Categories',
    'Website',
    'Game Dev',
    '3D Design',
    'Data Viz',
    'UI Component',
    'Image',
    'Logo',
    'SVG',
    'Video'
  ];

  return (
    <section className="w-full py-20 px-4 bg-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Model Performance</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Top AI Models Ranking
          </h2>
          
          <p className="text-base text-gray-600 max-w-4xl mb-6">
            Each AI model is ranked using the Bradley Terry rating system (denoted as Elo rating), which adjusts based on its performance in head-to-head design matchups. 
            Higher scores indicate more consistent wins against other models. Models with an{' '}
            <span className="font-semibold text-gray-900">*</span> are subject to change.
          </p>

          {/* Refresh Button and Last Updated */}
          <div className="flex items-center gap-4">
            <button
              onClick={fetchLeaderboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            {lastUpdated && (
              <span className="text-sm text-gray-500">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Total Models</p>
                <p className="text-xl font-bold text-gray-900">{modelData.length}+</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Zap className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Avg Response</p>
                <p className="text-xl font-bold text-gray-900">1.2s</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Clock className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Uptime</p>
                <p className="text-xl font-bold text-gray-900">99.9%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Model Performance Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Elo Rating</h3>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Top 25
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                All Models
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Elo Rating
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="overflow-x-auto pb-4">
            {loading ? (
              <div className="flex items-center justify-center" style={{ height: '400px' }}>
                <p className="text-gray-500">Loading benchmark data...</p>
              </div>
            ) : (
              <div className="flex items-end justify-start gap-4 min-w-max" style={{ height: '400px' }}>
                {modelData.length > 0 ? modelData.map((model, index) => {
                // Calculate height based on score - use actual values for better visualization
                const minScore = Math.min(...modelData.map(m => m.score));
                const maxScore = Math.max(...modelData.map(m => m.score));
                const scoreRange = maxScore - minScore;
                
                // Calculate height percentage with better scaling
                let heightPercentage;
                if (scoreRange > 0) {
                  // Normalize score to 0-1 range, then scale to 40-100% for visibility
                  const normalized = (model.score - minScore) / scoreRange;
                  heightPercentage = (normalized * 60) + 40; // 40% to 100% range
                } else {
                  heightPercentage = 70;
                }
                
                // Berry Bliss color palette: blush (#F2D7EE), rosewood (#D3BCC0), grape (#A5688B), purple (#69306D), twilight blue (#0E103D)
                const colors = ['#0E103D', '#69306D', '#A5688B', '#D3BCC0', '#F2D7EE'];
                const colorIndex = Math.floor((index / modelData.length) * colors.length);
                const barColor = colors[Math.min(colorIndex, colors.length - 1)];
                
                // Determine text color based on bar color brightness (dark bars = white text, light bars = dark text)
                const isDarkBar = colorIndex < 3; // First 3 colors are dark
                const textColor = isDarkBar ? '#FFFFFF' : '#1F2937'; // white or gray-800
                
                console.log(`Model: ${model.name}, Score: ${model.score}, Height: ${heightPercentage}%`);
                
                return (
                  <div key={`${model.name}-${index}`} className="flex flex-col items-center gap-2 group cursor-pointer min-w-[70px]">
                    {/* Score Label - Above Bar */}
                    <div className="mb-1">
                      <span className="text-xs font-semibold text-gray-700">
                        {model.score}
                      </span>
                    </div>
                    
                    {/* Bar Container with Rotated Content Inside */}
                    <div className="relative flex items-end justify-center" style={{ height: '300px', width: '60px' }}>
                      <div 
                        className="rounded-t-md transition-all duration-300 group-hover:opacity-90 relative flex items-center justify-center overflow-hidden"
                        style={{ 
                          height: `${heightPercentage}%`,
                          width: '50px',
                          minHeight: '80px',
                          backgroundColor: barColor
                        }}
                      >
                        {/* Rotated Content Inside Bar */}
                        <div 
                          className="flex flex-row items-center gap-2"
                          style={{ 
                            transform: 'rotate(-90deg)',
                            whiteSpace: 'nowrap',
                            transformOrigin: 'center center',
                            color: textColor
                          }}
                        >
                          {/* Company Logo */}
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {getCompanyLogo(model.organization) || (
                              <span className="text-xs font-bold">{model.organization?.charAt(0) || '?'}</span>
                            )}
                          </div>
                          
                          {/* Model Name */}
                          <span className="text-xs font-semibold">
                            {model.name.length > 20 ? model.name.substring(0, 17) + '...' : model.name}
                          </span>
                        </div>
                        
                        {/* Rank on hover - top corner */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-bold text-xs bg-black bg-opacity-30 px-1.5 py-0.5 rounded">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Organization Name - Below Bar */}
                    <div className="text-center pt-2">
                      <span className="text-xs text-gray-500">{model.organization}</span>
                    </div>
                  </div>
                );
              }) : (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-gray-500">Loading model data...</p>
                </div>
              )}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              Performance scores are based on real-world benchmarks and updated regularly. 
              Rankings reflect model capabilities across various tasks including reasoning, coding, and creative generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
