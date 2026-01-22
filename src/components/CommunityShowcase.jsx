import React, { useState } from 'react';
import { Maximize2, Copy } from 'lucide-react';

export function CommunityShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    { name: 'All Categories', icon: '⭐', color: 'bg-gray-100' },
    { name: 'Website', icon: '🌐', color: 'bg-blue-50' },
    { name: 'Images', icon: '🖼️', color: 'bg-purple-50' },
    { name: 'Videos', icon: '🎬', color: 'bg-pink-50' },
    { name: 'Music', icon: '🎵', color: 'bg-green-50' }
  ];

  const showcaseGroups = [
    // Website Category - Row 1
    {
      prompt: 'Build me a Portfolio website',
      category: 'Website',
      items: [
        {
          id: 1,
          model: 'GLM 4.7',
          modelIcon: '🌟',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: '/images/website01.jpg'
        },
        {
          id: 2,
          model: 'Grok 4.1 Fast',
          modelIcon: '⚡',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: '/images/website02.jpg'
        },
        {
          id: 3,
          model: 'Claude 4.5 Sonnet',
          modelIcon: '🚀',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: '/images/website03.jpg'
        },
        {
          id: 4,
          model: 'DeepSeek-V3-0324',
          modelIcon: '🔍',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: '/images/website04.jpg'
        }
      ]
    },
    // Website Category - Row 2
    {
      prompt: 'Create a Dashboard landing page using Nextjs',
      category: 'Website',
      items: [
        {
          id: 5,
          model: 'Claude Haiku 4.5',
          modelIcon: '🎯',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: '/images/website05.jpg'
        },
        {
          id: 6,
          model: 'GPT-5.1 (High)',
          modelIcon: '⚡',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: '/images/website06.jpg'
        },
        {
          id: 7,
          model: 'MiniMax M2.1',
          modelIcon: '🎨',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: '/images/website07.jpg'
        },
        {
          id: 8,
          model: 'GPT-5.1 (Medium)',
          modelIcon: '✨',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: '/images/website08.jpg'
        }
      ]
    },
    // Images Category - Row 1
    {
      prompt: 'generate a photorealistic sunset over mountains with vibrant colors',
      category: 'Images',
      items: [
        {
          id: 9,
          model: 'DALL-E 3',
          modelIcon: '🎨',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
        },
        {
          id: 10,
          model: 'Midjourney v6',
          modelIcon: '✨',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop'
        },
        {
          id: 11,
          model: 'Stable Diffusion XL',
          modelIcon: '🖼️',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop'
        },
        {
          id: 12,
          model: 'Flux Pro',
          modelIcon: '⚡',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop'
        }
      ]
    },
    // Images Category - Row 2
    {
      prompt: 'create a futuristic cyberpunk city with neon lights and flying cars',
      category: 'Images',
      items: [
        {
          id: 13,
          model: 'DALL-E 3',
          modelIcon: '🎨',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop'
        },
        {
          id: 14,
          model: 'Midjourney v6',
          modelIcon: '✨',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop'
        },
        {
          id: 15,
          model: 'Stable Diffusion XL',
          modelIcon: '🖼️',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop'
        },
        {
          id: 16,
          model: 'Flux Pro',
          modelIcon: '⚡',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop'
        }
      ]
    },
    // Videos Category - Row 1
    {
      prompt: 'create a 30-second product showcase video with smooth transitions',
      category: 'Videos',
      items: [
        {
          id: 17,
          model: 'Runway Gen-3',
          modelIcon: '🎬',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop'
        },
        {
          id: 18,
          model: 'Pika Labs',
          modelIcon: '🎥',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop'
        },
        {
          id: 19,
          model: 'Sora',
          modelIcon: '✨',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop'
        },
        {
          id: 20,
          model: 'Stable Video',
          modelIcon: '🎞️',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop'
        }
      ]
    },
    // Videos Category - Row 2
    {
      prompt: 'generate an animated explainer video about AI technology',
      category: 'Videos',
      items: [
        {
          id: 21,
          model: 'Runway Gen-3',
          modelIcon: '🎬',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop'
        },
        {
          id: 22,
          model: 'Pika Labs',
          modelIcon: '🎥',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=300&fit=crop'
        },
        {
          id: 23,
          model: 'Sora',
          modelIcon: '✨',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop'
        },
        {
          id: 24,
          model: 'Stable Video',
          modelIcon: '🎞️',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop'
        }
      ]
    },
    // Music Category - Row 1
    {
      prompt: 'compose an upbeat electronic dance music track with energetic beats',
      category: 'Music',
      items: [
        {
          id: 25,
          model: 'Suno AI',
          modelIcon: '🎵',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop'
        },
        {
          id: 26,
          model: 'Udio',
          modelIcon: '🎶',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop'
        },
        {
          id: 27,
          model: 'MusicGen',
          modelIcon: '🎼',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=300&fit=crop'
        },
        {
          id: 28,
          model: 'Stable Audio',
          modelIcon: '🎹',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
        }
      ]
    },
    // Music Category - Row 2
    {
      prompt: 'create a relaxing ambient soundtrack for meditation and focus',
      category: 'Music',
      items: [
        {
          id: 29,
          model: 'Suno AI',
          modelIcon: '🎵',
          rank: '1st',
          rankColor: 'bg-yellow-100 text-yellow-800',
          preview: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=400&h=300&fit=crop'
        },
        {
          id: 30,
          model: 'Udio',
          modelIcon: '🎶',
          rank: '2nd',
          rankColor: 'bg-gray-200 text-gray-800',
          preview: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop'
        },
        {
          id: 31,
          model: 'MusicGen',
          modelIcon: '🎼',
          rank: '3rd',
          rankColor: 'bg-orange-100 text-orange-800',
          preview: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=300&fit=crop'
        },
        {
          id: 32,
          model: 'Stable Audio',
          modelIcon: '🎹',
          rank: '4th',
          rankColor: 'bg-blue-100 text-blue-800',
          preview: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop'
        }
      ]
    }
  ];

  const filteredGroups = selectedCategory === 'All Categories' 
    ? showcaseGroups 
    : showcaseGroups.filter(group => group.category === selectedCategory);

  return (
    <section className="w-full py-20 px-4 bg-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Horizontal Scrollable Category Filter */}
        <div className="mb-12 relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {/* Left Arrow */}
            <button className="flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-gray-600">←</span>
            </button>

            {/* Category Pills */}
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-gray-800 text-white shadow-lg'
                    : `${category.color} text-gray-700 hover:shadow-md`
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}

            {/* Right Arrow */}
            <button className="flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-gray-600">→</span>
            </button>
          </div>
        </div>

        {/* Showcase Groups */}
        <div className="space-y-16">
          {filteredGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Prompt Row with Icons */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{group.category === 'Website' ? '🌐' : '🖼️'}</span>
                  </div>
                  <p className="text-gray-700 text-base">{group.prompt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span className="text-white text-sm">⋯</span>
                  </button>
                </div>
              </div>

              {/* 4-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Preview Image */}
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img 
                        src={item.preview} 
                        alt={`${item.model} preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Expand Icon - Top Right */}
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white">
                        <Maximize2 className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Model Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.modelIcon}</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.model}</p>
                          </div>
                        </div>
                        
                        {/* Rank Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.rankColor}`}>
                          {item.rank}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
