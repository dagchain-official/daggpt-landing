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
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-white/60 backdrop-blur-[40px] border border-slate-200/50 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)]">
              {/* Input Area */}
              <div className="p-8 pb-4">
                <div className="flex items-start gap-6">
                  <div className="flex-1 min-h-[160px] relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`What's on your mind today?`}
                      className="w-full h-full bg-transparent text-slate-900 text-xl md:text-2xl placeholder:text-slate-300 focus:outline-none resize-none leading-relaxed font-normal"
                    />
                    
                    {attachedFiles.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {attachedFiles.map((file, index) => (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={index}
                            className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-100/80 backdrop-blur-md rounded-xl text-xs text-slate-700 border border-slate-200 shadow-sm"
                          >
                            <FileText className="w-4 h-4 text-purple-600" />
                            <span className="max-w-[140px] truncate font-medium">{file.name}</span>
                            <button onClick={() => setAttachedFiles(f => f.filter((_, i) => i !== index))} className="hover:text-red-600 transition-colors ml-1">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Toolbar */}
              <div className="px-6 py-6 bg-slate-50/50 border-t border-slate-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Left: Dynamic Controls */}
                  <div className="flex items-center flex-wrap gap-3">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="group p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all text-slate-500 hover:text-slate-900"
                    >
                      <Paperclip className="w-5 h-5" />
                      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)])} />
                    </button>

                    <div className="relative">
                      <button 
                        onClick={() => setShowModelDropdown(!showModelDropdown)}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-semibold rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all text-slate-700"
                      >
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>{selectedTool === "Image Generation" ? selectedImageModel : selectedModel}</span>
                        <ChevronDown className={`w-4 h-4 opacity-40 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {showModelDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-4 w-72 bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] p-2 backdrop-blur-3xl"
                          >
                            <div className="text-[10px] font-bold text-slate-400 px-4 pt-3 pb-2 uppercase tracking-widest">Select Intelligence</div>
                            {(selectedTool === "Image Generation" ? imageModels : aiModels).map((model) => (
                              <button
                                key={model.id}
                                onClick={() => {
                                  if (selectedTool === "Image Generation") setSelectedImageModel(model.name)
                                  else setSelectedModel(model.name)
                                  setShowModelDropdown(false)
                                }}
                                className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-sm flex items-center justify-between transition-all group"
                              >
                                <div className="flex flex-col text-left items-start">
                                  <span className="text-slate-700 group-hover:text-slate-900 font-bold">{model.name}</span>
                                  <span className="text-[10px] text-slate-400 font-medium">{model.tier}</span>
                                </div>
                                {(selectedTool === "Image Generation" ? selectedImageModel : selectedModel) === model.name && <Check className="w-4 h-4 text-purple-600" />}
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
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all border shadow-sm ${
                        isPublic 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'
                      }`}
                    >
                      {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      <span className="uppercase tracking-widest">{isPublic ? 'Public' : 'Private'}</span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block" />

                    <VoiceInputButton 
                      onTranscript={(text) => setInputValue(v => v + (v ? ' ' : '') + text)}
                      className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all shadow-sm"
                    />

                    <button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className={`relative group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all ${
                        !inputValue.trim() 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 opacity-50' 
                          : 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_25px_rgba(0,0,0,0.15)]'
                      }`}
                    >
                      <span className="tracking-widest">GENERATE</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Dock - Reimagined */}
          <div className="relative">
            <div className="flex items-center justify-center flex-wrap gap-4">
              {aiTools.map((tool) => {
                const isActive = selectedTool === tool.name
                const Icon = tool.icon
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTool(tool.name)}
                    className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 border ${
                      isActive 
                        ? "bg-white text-slate-900 border-slate-300 shadow-[0_15px_30px_rgba(0,0,0,0.08)] z-10" 
                        : "bg-white/40 hover:bg-white/80 text-slate-500 hover:text-slate-800 border-slate-200/50 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-slate-100' : 'bg-transparent'}`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-sm font-bold tracking-tight">{tool.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeToolIndicator"
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-purple-600 rounded-full"
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
