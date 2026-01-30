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
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Gemini 3 Flash")
  const [selectedImageModel, setSelectedImageModel] = useState("Imagen 4 Standard")
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const imageModels = [
    { name: "Gemini 3 Pro Image", id: "gemini-3-pro-image-preview", tier: "Ultra-Premium" },
    { name: "Gemini 2.5 Flash Image", id: "gemini-2.5-flash-image", tier: "Fast" },
    { name: "Imagen 4 Ultra", id: "imagen-4.0-ultra-generate-001", tier: "Ultra-Premium" },
    { name: "Imagen 4 Standard", id: "imagen-4.0-generate-001", tier: "Standard" },
    { name: "Imagen 4 Fast", id: "imagen-4.0-fast-generate-001", tier: "Fast" }
  ]

  const aiModels = [
    { name: "Gemini 3 Pro", id: "gemini-3-pro-preview", tier: "Ultra-Premium" },
    { name: "Gemini 3 Flash", id: "gemini-2.0-flash-exp", tier: "Standard" },
    { name: "Gemini 2.5 Pro", id: "gemini-2.5-pro", tier: "Production Stable" },
    { name: "Gemini 2.5 Flash", id: "gemini-2.5-flash", tier: "Fast" },
    { name: "Claude Sonnet 4.5", id: "claude-sonnet-4-5", tier: "Ultra-Premium" },
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
    <div className="w-full px-4 relative z-20 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="space-y-12">
          {/* Main Chatbox Container */}
          <div className="relative group">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-black/40 backdrop-blur-[40px] border border-white/10 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Input Area */}
              <div className="p-8 pb-4">
                <div className="flex items-start gap-6">
                  <div className="flex-1 min-h-[160px] relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Imagine something incredible...`}
                      className="w-full h-full bg-transparent text-white text-xl md:text-2xl placeholder:text-white/20 focus:outline-none resize-none leading-relaxed font-light"
                    />
                    
                    {attachedFiles.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {attachedFiles.map((file, index) => (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={index}
                            className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl text-xs text-white/80 border border-white/10 shadow-lg"
                          >
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span className="max-w-[140px] truncate">{file.name}</span>
                            <button onClick={() => setAttachedFiles(f => f.filter((_, i) => i !== index))} className="hover:text-red-400 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Toolbar */}
              <div className="px-6 py-6 bg-white/[0.02] border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Left: Dynamic Controls */}
                  <div className="flex items-center flex-wrap gap-3">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="group p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/60 hover:text-white"
                    >
                      <Paperclip className="w-5 h-5" />
                      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)])} />
                    </button>

                    <div className="relative">
                      <button 
                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/80"
                      >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>{selectedTool === "Image Generation" ? selectedImageModel : selectedModel}</span>
                        <ChevronDown className={`w-4 h-4 opacity-40 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {showModelDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-4 w-72 bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] shadow-[0_16px_48px_rgba(0,0,0,0.8)] z-[100] p-3 backdrop-blur-3xl"
                          >
                            <div className="text-[10px] font-bold text-white/20 px-3 pb-2 uppercase tracking-widest">Select Intelligence</div>
                            {(selectedTool === "Image Generation" ? imageModels : aiModels).map((model) => (
                              <button
                                key={model.id}
                                onClick={() => {
                                  if (selectedTool === "Image Generation") setSelectedImageModel(model.name)
                                  else setSelectedModel(model.name)
                                  setShowModelDropdown(false)
                                }}
                                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-sm flex items-center justify-between transition-all group"
                              >
                                <div className="flex flex-col">
                                  <span className="text-white/80 group-hover:text-white font-medium">{model.name}</span>
                                  <span className="text-[10px] text-white/30">{model.tier}</span>
                                </div>
                                {(selectedTool === "Image Generation" ? selectedImageModel : selectedModel) === model.name && <Check className="w-4 h-4 text-purple-400" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <button 
                      onClick={() => setIsPublic(!isPublic)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium transition-all border ${
                        isPublic 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      <span>{isPublic ? 'Public' : 'Private'}</span>
                    </button>

                    <div className="h-8 w-[1px] bg-white/10 mx-1 hidden md:block" />

                    <VoiceInputButton 
                      onTranscript={(text) => setInputValue(v => v + (v ? ' ' : '') + text)}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all"
                    />

                    <button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className={`relative group flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-black transition-all ${
                        !inputValue.trim() 
                          ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5' 
                          : 'bg-white text-black hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]'
                      }`}
                    >
                      <span>GENERATE</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Dock - Reimagined */}
          <div className="relative">
            <div className="flex items-center justify-center flex-wrap gap-3">
              {aiTools.map((tool) => {
                const isActive = selectedTool === tool.name
                const Icon = tool.icon
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTool(tool.name)}
                    className={`relative flex items-center gap-3 px-7 py-4 rounded-[1.5rem] transition-all duration-500 ${
                      isActive 
                        ? "bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] z-10" 
                        : "bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/5"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-white/40'}`} />
                    <span className="text-sm font-black tracking-tight uppercase">{tool.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeToolGlow"
                        className="absolute -inset-[1px] rounded-[1.5rem] border border-white/50 opacity-50"
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
