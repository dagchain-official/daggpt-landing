import React, { useState, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  Sparkles
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
    { name: "Gemini 3 Pro", id: "gemini-3-pro-preview", tier: "Ultra-Premium" },
    { name: "Gemini 3 Flash", id: "gemini-2.0-flash-exp", tier: "Standard" },
    { name: "Gemini 2.5 Pro", id: "gemini-2.5-pro", tier: "Production Stable" },
    { name: "Gemini 2.5 Flash", id: "gemini-2.5-flash", tier: "Fast" },
    { name: "Claude Sonnet 4.5", id: "claude-sonnet-4-5", tier: "Ultra-Premium" },
    { name: "Llama 3.3 (70B)", id: "llama-3.3-70b-instruct-maas", tier: "Open Model" },
    { name: "DeepSeek V3.2", id: "deepseek-v3.2-maas", tier: "Specialist" },
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    const userMessage = inputValue.trim()
    if (selectedTool === "Image Generation") {
      navigate('/image-generation', { state: { initialPrompt: userMessage, selectedModel: selectedImageModel, aspectRatio: selectedAspectRatio } })
    } else {
      navigate('/chat', { state: { initialMessage: userMessage, selectedModel: selectedModel } })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="w-full px-4 relative z-20 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="space-y-8">
          {/* Main Chatbox Container with Glassmorphism */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Input Area */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-h-[120px] relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message ${selectedTool}...`}
                      className="w-full h-full bg-transparent text-gray-900 text-lg md:text-xl placeholder:text-gray-400 focus:outline-none resize-none leading-relaxed"
                    />
                    
                    {attachedFiles.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {attachedFiles.map((file, index) => (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100/50 backdrop-blur-sm rounded-lg text-xs text-gray-700 border border-gray-200 shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="max-w-[120px] truncate">{file.name}</span>
                            <button onClick={() => setAttachedFiles(f => f.filter((_, i) => i !== index))} className="hover:text-red-600">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="bg-gray-50/50 backdrop-blur-md border-t border-gray-100 p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Left: Dynamic Controls */}
                  <div className="flex items-center flex-wrap gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all text-gray-600"
                    >
                      <Paperclip className="w-4 h-4" />
                      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)])} />
                    </button>

                    {/* Model Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all text-gray-700"
                      >
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>{selectedTool === "Image Generation" ? selectedImageModel : selectedModel}</span>
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      </button>
                      
                      <AnimatePresence>
                        {showModelDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] p-2"
                          >
                            {(selectedTool === "Image Generation" ? imageModels : aiModels).map((model) => (
                              <button
                                key={model.id}
                                onClick={() => {
                                  if (selectedTool === "Image Generation") setSelectedImageModel(model.name)
                                  else setSelectedModel(model.name)
                                  setShowModelDropdown(false)
                                }}
                                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm flex items-center justify-between transition-colors"
                              >
                                <span>{model.name}</span>
                                {(selectedTool === "Image Generation" ? selectedImageModel : selectedModel) === model.name && <Check className="w-4 h-4 text-purple-600" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Aspect Ratio (Only for Image/Video) */}
                    {(selectedTool === "Image Generation" || selectedTool === "Video Generation") && (
                      <div className="relative">
                        <button 
                          onClick={() => setShowAspectRatioDropdown(!showAspectRatioDropdown)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-700"
                        >
                          <Images className="w-4 h-4" />
                          <span>{selectedAspectRatio}</span>
                          <ChevronDown className="w-4 h-4 opacity-50" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => setIsPublic(!isPublic)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isPublic ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}
                    >
                      {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      <span>{isPublic ? 'Public' : 'Private'}</span>
                    </button>

                    <VoiceInputButton 
                      onTranscript={(text) => setInputValue(v => v + (v ? ' ' : '') + text)}
                      className="p-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-600"
                    />

                    <button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${
                        !inputValue.trim() ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-purple-200'
                      }`}
                    >
                      <span>Send</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Dock */}
          <div className="relative pt-4">
            <div className="flex items-center justify-center flex-wrap gap-2">
              {aiTools.map((tool) => {
                const isActive = selectedTool === tool.name
                const Icon = tool.icon
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTool(tool.name)}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? "bg-white border-white shadow-xl text-purple-600 scale-105 z-10" 
                        : "bg-white/40 hover:bg-white/60 border-transparent text-gray-500 hover:text-gray-900"
                    } border`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-bold">{tool.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeTool"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
