import React, { useState, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import {
  MessageSquare,
  Images,
  Video,
  Music,
  Code2,
  Zap,
  Paperclip,
  Send,
  Globe,
  Lock,
  ChevronDown,
  X,
  FileText,
  Check,
} from "lucide-react"
import VoiceInputButton from './VoiceInputButton'

const aiTools = [
  {
    id: 1,
    name: "AI Chat",
    description: "Intelligent conversations with advanced language models",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Image Generation",
    description: "Create stunning visuals from text descriptions",
    icon: Images,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Video Generation",
    description: "Transform ideas into dynamic video content",
    icon: Video,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    name: "Music Generation",
    description: "Compose original music with AI assistance",
    icon: Music,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    name: "Website Builder",
    description: "Build professional websites in minutes",
    icon: Code2,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    name: "Smart Tools",
    description: "Explore more powerful AI capabilities",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
]

export function ChatboxContainer() {
  const [inputValue, setInputValue] = useState("")
  const [selectedTool, setSelectedTool] = useState("AI Chat")
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("Square (1:1)")
  const [showAspectRatioDropdown, setShowAspectRatioDropdown] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [attachedFiles, setAttachedFiles] = useState([])
  const [showFigmaDropdown, setShowFigmaDropdown] = useState(false)
  const [figmaUrl, setFigmaUrl] = useState("")
  const [useDefaultToken, setUseDefaultToken] = useState(true)
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [showImageModelDropdown, setShowImageModelDropdown] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Gemini 3 Flash")
  const [selectedImageModel, setSelectedImageModel] = useState("Imagen 4 Standard")
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const aspectRatios = [
    { 
      name: "Square (1:1)", 
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0"><rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1"/></svg>
    },
    { 
      name: "Portrait (3:4)", 
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0"><rect x="3.5" y="1.5" width="9" height="13" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1"/></svg>
    },
    { 
      name: "Landscape (4:3)", 
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0"><rect x="1" y="3" width="14" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1"/></svg>
    },
    { 
      name: "Portrait (9:16)", 
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0"><rect x="5" y="0.5" width="6" height="15" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1"/></svg>
    },
    { 
      name: "Landscape (16:9)", 
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0"><rect x="0.5" y="5" width="15" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" rx="1"/></svg>
    }
  ]

  const imageModels = [
    { name: "Gemini 3 Pro Image", id: "gemini-3-pro-image-preview", tier: "Ultra-Premium", description: "Best for accurate text rendering and complex diagrams" },
    { name: "Gemini 2.5 Flash Image", id: "gemini-2.5-flash-image", tier: "Fast", description: "Great for rapid photo restoration and editing" },
    { name: "Imagen 4 Ultra", id: "imagen-4.0-ultra-generate-001", tier: "Ultra-Premium", description: "Highest photorealism and artistic detail" },
    { name: "Imagen 4 Standard", id: "imagen-4.0-generate-001", tier: "Standard", description: "Balances quality and speed" },
    { name: "Imagen 4 Fast", id: "imagen-4.0-fast-generate-001", tier: "Fast", description: "Optimized for near-real-time generation" }
  ]

  const aiModels = [
    // Google Gemini 3 Models (Latest)
    { name: "Gemini 3 Pro", id: "gemini-3-pro-preview", tier: "Ultra-Premium" },
    { name: "Gemini 3 Flash", id: "gemini-2.0-flash-exp", tier: "Standard" },
    
    // Google Gemini 2.5 Models
    { name: "Gemini 2.5 Pro", id: "gemini-2.5-pro", tier: "Production Stable" },
    { name: "Gemini 2.5 Flash", id: "gemini-2.5-flash", tier: "Fast" },
    { name: "Gemini 2.5 Flash-Lite", id: "gemini-2.5-flash-lite", tier: "Budget" },
    
    // Anthropic Claude Models
    { name: "Claude Sonnet 4.5", id: "claude-sonnet-4-5", tier: "Ultra-Premium" },
    
    // Meta Llama Models
    { name: "Llama 3.3 (70B)", id: "llama-3.3-70b-instruct-maas", tier: "Open Model" },
    { name: "Llama 3.1 (405B)", id: "llama-3.1-405b-instruct-maas", tier: "Open Model" },
    { name: "Llama 3.1 (70B)", id: "llama-3.1-70b-instruct-maas", tier: "Open Model" },
    { name: "Llama 3.1 (8B)", id: "llama-3.1-8b-instruct-maas", tier: "Open Model" },
    
    // Mistral Models
    { name: "Mistral Large 2", id: "mistral-large-2407", tier: "Premium" },
    { name: "Mistral Nemo", id: "mistral-nemo-2407", tier: "Standard" },
    
    // DeepSeek Models
    { name: "DeepSeek V3.2", id: "deepseek-v3.2-maas", tier: "Specialist" },
    
    // Qwen Models
    { name: "Qwen 3 (235B)", id: "qwen3-235b-instruct-maas", tier: "Premium" },
    
    // Specialized Models
    { name: "Codestral", id: "codestral@2405", tier: "Code Specialist" }
  ]

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (attachedFiles.length + files.length > 5) {
      alert('Maximum 5 files allowed')
      return
    }
    setAttachedFiles([...attachedFiles, ...files])
  }

  const removeFile = (index) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index))
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    
    // Route based on selected tool
    if (selectedTool === "Image Generation") {
      // Navigate to image generation page
      navigate('/image-generation', {
        state: {
          initialPrompt: userMessage,
          selectedModel: selectedImageModel,
          aspectRatio: selectedAspectRatio
        }
      })
    } else {
      // Navigate to chat page with initial message and selected model
      navigate('/chat', {
        state: {
          initialMessage: userMessage,
          selectedModel: selectedModel
        }
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full px-4 pb-20 pt-8 relative z-10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="space-y-8">

          {/* Main Chatbox Container */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-visible">
            {/* Input Field with Tool Indicator */}
            <div className="p-6 relative">
              {/* Selected Tool Indicator - Top Right - Neumorphic 3D */}
              <div className="absolute top-4 right-4">
                <div 
                  className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full"
                  style={{
                    background: '#ffffff',
                    boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <span className="text-xs font-semibold text-gray-700">{selectedTool}</span>
                </div>
              </div>
              
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me to build a beautiful landing page, generate an image, or create a video..."
                className="w-full h-32 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none resize-none leading-relaxed pr-32"
              />
              
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.csv,.pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {/* Attached Files Display */}
              {attachedFiles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {attachedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-700 border border-gray-200"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="max-w-[150px] truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Control Toolbar - Single Line */}
            <div className="border-t border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center justify-between gap-3">
                {/* Left Side Controls */}
                <div className="flex items-center gap-2">
                  {/* AI Chat Controls */}
                  {selectedTool === "AI Chat" && (
                    <>
                      <button 
                        onClick={handleAttachClick}
                        className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Attach</span>
                        {attachedFiles.length > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 bg-primary text-white rounded-full text-[10px] font-semibold">
                            {attachedFiles.length}
                          </span>
                        )}
                      </button>
                      {/* Model Selection Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowModelDropdown(!showModelDropdown)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300"
                        >
                          <span>{selectedModel}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {showModelDropdown && (
                          <>
                            <div 
                              className="fixed inset-0 z-[99]" 
                              onClick={() => setShowModelDropdown(false)}
                            />
                            <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                              <div className="py-1">
                                <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                                  Select AI Model
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                  {aiModels.map((model) => (
                                    <button
                                      key={model.id}
                                      onClick={() => {
                                        setSelectedModel(model.name)
                                        setShowModelDropdown(false)
                                      }}
                                      className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-50 transition-colors flex items-center justify-between ${
                                        selectedModel === model.name ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-700'
                                      }`}
                                    >
                                      <span>{model.name}</span>
                                      {selectedModel === model.name && (
                                        <Check className="w-3.5 h-3.5 text-purple-600" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  {/* Image Generation Controls */}
                  {selectedTool === "Image Generation" && (
                    <>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Attach</span>
                      </button>
                      
                      {/* Image Model Selection Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowImageModelDropdown(!showImageModelDropdown)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300"
                        >
                          <span>{selectedImageModel}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {showImageModelDropdown && (
                          <>
                            <div 
                              className="fixed inset-0 z-[99]" 
                              onClick={() => setShowImageModelDropdown(false)}
                            />
                            <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                              <div className="py-1">
                                <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                                  Select Image Model
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                  {imageModels.map((model) => (
                                    <button
                                      key={model.id}
                                      onClick={() => {
                                        setSelectedImageModel(model.name)
                                        setShowImageModelDropdown(false)
                                      }}
                                      className={`w-full text-left px-3 py-2 text-[11px] hover:bg-gray-50 transition-colors ${
                                        selectedImageModel === model.name ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-700'
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                          <div className="font-semibold">{model.name}</div>
                                          <div className="text-[10px] text-gray-500 mt-0.5">{model.description}</div>
                                        </div>
                                        {selectedImageModel === model.name && (
                                          <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 mt-0.5" />
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Aspect Ratio Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowAspectRatioDropdown(!showAspectRatioDropdown)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300"
                        >
                          <span>{selectedAspectRatio}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        
                        {showAspectRatioDropdown && (
                          <>
                            <div 
                              className="fixed inset-0 z-[99]" 
                              onClick={() => setShowAspectRatioDropdown(false)}
                            />
                            <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                              <div className="py-1 max-h-72 overflow-y-auto">
                                {aspectRatios.map((ratio) => (
                                  <button
                                    key={ratio.name}
                                    onClick={() => {
                                      setSelectedAspectRatio(ratio.name)
                                      setShowAspectRatioDropdown(false)
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                                      selectedAspectRatio === ratio.name ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                                    }`}
                                  >
                                    <span className="flex-shrink-0">{ratio.icon}</span>
                                    <span>{ratio.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <button title="Prompt Enhancer" className="p-2 rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <Zap className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {/* Video Generation Controls */}
                  {selectedTool === "Video Generation" && (
                    <>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Attach</span>
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <span>Model</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      
                      {/* Aspect Ratio Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowAspectRatioDropdown(!showAspectRatioDropdown)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300"
                        >
                          <span>{selectedAspectRatio}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        
                        {showAspectRatioDropdown && (
                          <>
                            <div 
                              className="fixed inset-0 z-[99]" 
                              onClick={() => setShowAspectRatioDropdown(false)}
                            />
                            <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                              <div className="py-1 max-h-72 overflow-y-auto">
                                {aspectRatios.map((ratio) => (
                                  <button
                                    key={ratio.name}
                                    onClick={() => {
                                      setSelectedAspectRatio(ratio.name)
                                      setShowAspectRatioDropdown(false)
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                                      selectedAspectRatio === ratio.name ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                                    }`}
                                  >
                                    <span className="flex-shrink-0">{ratio.icon}</span>
                                    <span>{ratio.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <button title="Prompt Enhancer" className="p-2 rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <Zap className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {/* Music Generation Controls */}
                  {selectedTool === "Music Generation" && (
                    <>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <span>Simple/Custom</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <span>Style</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <span>Model</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </>
                  )}

                  {/* Website Builder Controls */}
                  {selectedTool === "Website Builder" && (
                    <>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Attach</span>
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <span>Model</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button title="Prompt Enhancer" className="p-2 rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <Zap className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {/* Smart Tools Controls */}
                  {selectedTool === "Smart Tools" && (
                    <>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Attach</span>
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300">
                        <span>Model</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>

                {/* Right Side Controls - Same for All Tools */}
                <div className="flex items-center gap-2">
                  {/* Figma Integration - Only for Website Builder */}
                  {selectedTool === "Website Builder" && (
                    <div className="relative">
                      <button 
                        onClick={() => setShowFigmaDropdown(!showFigmaDropdown)}
                        className="p-2 rounded-lg bg-white hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300"
                        title="Import Figma Design"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 38 57" fill="none">
                          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                        </svg>
                      </button>

                      {/* Figma Dropdown Modal */}
                      {showFigmaDropdown && (
                        <>
                          <div 
                            className="fixed inset-0 z-[100]" 
                            onClick={() => setShowFigmaDropdown(false)}
                          />
                          <div className="absolute right-0 top-12 w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[101]">
                            <div className="p-5">
                              <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                                Import Figma Design
                              </h3>
                              
                              <p className="text-xs text-gray-600 mb-3 leading-snug">
                                In Figma, select any Frame and right-click / Copy/Paste as / <span className="font-semibold">Copy link to selection</span>. Do NOT use Command + L since that will copy the entire Figma file.
                              </p>

                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Figma URL
                                  </label>
                                  <input
                                    type="text"
                                    value={figmaUrl}
                                    onChange={(e) => setFigmaUrl(e.target.value)}
                                    placeholder="https://www.figma.com/design/KEY/NAME"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                  />
                                </div>

                                <div>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-medium text-gray-700">
                                      Figma API Token
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-600">Default token</span>
                                      <button
                                        onClick={() => setUseDefaultToken(!useDefaultToken)}
                                        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                                          useDefaultToken ? 'bg-gray-900' : 'bg-gray-300'
                                        }`}
                                      >
                                        <span
                                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                                            useDefaultToken ? 'translate-x-5.5' : 'translate-x-0.5'
                                          }`}
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    Your personal token may be needed for private files.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 px-5 py-3 bg-gray-50 border-t border-gray-200">
                              <button
                                onClick={() => setShowFigmaDropdown(false)}
                                className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  console.log('Figma URL:', figmaUrl);
                                  console.log('Use Default Token:', useDefaultToken);
                                  setShowFigmaDropdown(false);
                                }}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm"
                              >
                                Import
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Public/Private Toggle */}
                  <button 
                    onClick={() => setIsPublic(!isPublic)}
                    className={`inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-all border ${
                      isPublic 
                        ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' 
                        : 'bg-red-500 hover:bg-red-600 text-white border-red-600'
                    }`}
                  >
                    {isPublic ? (
                      <>
                        <Globe className="w-3.5 h-3.5" />
                        <span>Public</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Private</span>
                      </>
                    )}
                  </button>

                  {/* Microphone - Voice Input */}
                  <VoiceInputButton 
                    onTranscript={(text) => setInputValue(inputValue + (inputValue ? ' ' : '') + text)}
                    className="p-2 rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-200 hover:border-gray-300"
                  />

                  {/* Send Button */}
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    title="Start AI Chat" 
                    className={`p-2.5 rounded-lg transition-all shadow-md hover:shadow-lg ${
                      !inputValue.trim() 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Tools Grid - Below Container - Navbar Style */}
          <div className="mt-12 relative z-[60]">
            <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Explore AI Features
            </h3>
            <div className="flex items-center justify-center gap-3">
              {aiTools.map((tool) => {
                const isActive = selectedTool === tool.name
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      console.log('Clicked tool:', tool.name)
                      setSelectedTool(tool.name)
                    }}
                    style={{ position: 'relative', zIndex: 100 }}
                    className={`group inline-flex items-center bg-background/5 border backdrop-blur-lg py-2.5 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? "border-primary/50 bg-primary/10" 
                        : "border-border hover:bg-primary/5 hover:border-primary/30"
                    }`}
                  >
                    <span className={`text-sm font-semibold transition-colors ${
                      isActive 
                        ? "text-primary" 
                        : "text-foreground/80 group-hover:text-primary"
                    }`}>
                      {tool.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
