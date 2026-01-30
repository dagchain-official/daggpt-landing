import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  Images,
    Video,
    Music,
    Code2,
    Paperclip,
  Send,
  Globe,
  Lock,
  ChevronDown,
  X,
  FileText,
  Check,
  Sparkles,
  Maximize2
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
  }
]

const modelsByFunction = {
    "AI Chat": [
      { name: "Gemini 3 Pro", id: "gemini-3-pro-preview", tier: "Overall Leader" },
      { name: "Grok 4.1 Thinking", id: "grok-4.1-thinking", tier: "Reasoning King" },
      { name: "Gemini 3 Flash", id: "gemini-3-flash-preview", tier: "Speed & Intelligence" },
      { name: "Claude 4.5 Opus", id: "claude-4-5-opus", tier: "Intelligence King" },
      { name: "Grok 4.1", id: "grok-4.1", tier: "High-Performance" },
      { name: "GPT-5.1 High", id: "gpt-5.1-high", tier: "OpenAI Elite" },
      { name: "Ernie 5.0", id: "ernie-5.0", tier: "Multilingual Power" },
      { name: "Claude 4.5 Sonnet", id: "claude-4-5-sonnet", tier: "Balanced Master" },
      { name: "DeepSeek V4.1", id: "deepseek-v4.1", tier: "Advanced Reasoning" },
      { name: "Llama 5 (405B)", id: "llama-5-405b", tier: "Open-Source Giant" }
    ],
  "Image Generation": [
    { name: "Imagen 4 Ultra", id: "imagen-4.0-ultra-generate-001", tier: "Photorealistic" },
    { name: "Imagen 4 Standard", id: "imagen-4.0-generate-001", tier: "Artistic" },
    { name: "Imagen 4 Fast", id: "imagen-4.0-fast-generate-001", tier: "Rapid" },
    { name: "Gemini 3 Pro Image", id: "gemini-3-pro-image-preview", tier: "Creative" }
  ],
  "Video Generation": [
    { name: "Veo 3.1 Cinematic", id: "veo-3.1-generate-001", tier: "High-End" },
    { name: "Veo 3.1 Fast", id: "veo-3.1-fast-generate-001", tier: "Draft" }
  ],
  "Music Generation": [
    { name: "Lyria 2 High-Fidelity", id: "lyria-002", tier: "Studio Quality" },
    { name: "Lyria 2 Composition", id: "lyria-002", tier: "Arrangement" }
  ],
  "Website Builder": [
    { name: "Gemini 3 Pro", id: "gemini-3-pro-preview", tier: "Code Architect" },
    { name: "Claude 4.5 Sonnet", id: "claude-4-5-sonnet", tier: "UI Designer" }
  ]
}

const aspectRatios = [
  { name: "Square (1:1)", value: "1:1" },
  { name: "Landscape (16:9)", value: "16:9" },
  { name: "Portrait (9:16)", value: "9:16" },
  { name: "Landscape (4:3)", value: "4:3" },
  { name: "Portrait (3:4)", value: "3:4" }
]

export function ChatboxContainer() {
  const [inputValue, setInputValue] = useState("")
  const [selectedTool, setSelectedTool] = useState("AI Chat")
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("Square (1:1)")
  const [showAspectRatioDropdown, setShowAspectRatioDropdown] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState([])
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Gemini 3 Pro")
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Update selected model when tool changes to a valid model for that tool
    const firstModel = modelsByFunction[selectedTool][0].name
    setSelectedModel(firstModel)
  }, [selectedTool])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    const userMessage = inputValue.trim()
    
    // Redirect to ChatPage for all functions but with different states
    navigate('/chat', { 
      state: { 
        initialMessage: userMessage, 
        selectedModel: selectedModel,
        function: selectedTool,
        aspectRatio: selectedAspectRatio,
        files: attachedFiles.map(f => f.name)
      } 
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)])
    }
  }

  return (
    <div className="w-full px-4 relative z-20 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="flex flex-col gap-6">
          {/* Main Chatbox Container: Floating Glass Island */}
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-white/60 backdrop-blur-[40px] border border-slate-200/50 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500">
              
                {/* Function Tabs Bar */}
                <div className="px-4 md:px-8 pt-4 md:pt-6 pb-2 border-b border-slate-100/50 flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {aiTools.map((tool) => {
                    const isActive = selectedTool === tool.name
                    const Icon = tool.icon
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.name)}
                        className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-2xl transition-all whitespace-nowrap ${
                          isActive 
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 md:w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="text-[10px] md:text-xs font-bold tracking-tight uppercase">{tool.name}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-8 pb-4">
                  <div className="flex flex-col gap-4">
                    <div className="min-h-[100px] md:min-h-[140px] relative">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Describe what you want to create...`}
                        className="w-full h-full bg-transparent text-slate-900 text-lg md:text-2xl placeholder:text-slate-300 focus:outline-none resize-none leading-relaxed font-normal tracking-tight"
                      />
                    
                    <AnimatePresence>
                      {attachedFiles.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex flex-wrap gap-2"
                        >
                          {attachedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 border border-slate-200">
                              <FileText className="w-3 h-3 text-indigo-500" />
                              <span className="max-w-[100px] truncate">{file.name}</span>
                              <button onClick={() => setAttachedFiles(f => f.filter((_, i) => i !== index))} className="hover:text-red-500">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

                {/* Toolbar */}
                <div className="px-4 md:px-6 py-4 md:py-5 bg-slate-50/30 border-t border-slate-100/50">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Left: Selectors */}
                    <div className="flex items-center flex-wrap justify-center md:justify-start gap-2.5">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 md:p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all text-slate-400 hover:text-slate-900"
                      >
                        <Paperclip className="w-4 h-4 md:w-4.5 md:h-4.5" />
                        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
                      </button>

                      {/* Model Dropdown */}
                      <div className="relative">
                        <button 
                          onClick={() => {
                            setShowModelDropdown(!showModelDropdown)
                            setShowAspectRatioDropdown(false)
                          }}
                          className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-3 md:py-3.5 text-[10px] md:text-xs font-bold rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all text-slate-700 uppercase tracking-widest"
                        >
                          <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5 text-indigo-600" />
                          <span>{selectedModel}</span>
                          <ChevronDown className={`w-3 md:w-3.5 h-3 md:h-3.5 opacity-40 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {showModelDropdown && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mb-4 w-64 bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] p-1.5 overflow-hidden"
                            >
                              <div className="text-[10px] font-black text-slate-400 px-4 pt-3 pb-2 uppercase tracking-[0.2em]">Select Model</div>
                              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                {modelsByFunction[selectedTool].map((model) => (
                                  <button
                                    key={model.name}
                                    onClick={() => {
                                      setSelectedModel(model.name)
                                      setShowModelDropdown(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50/50 flex items-center justify-between transition-all ${selectedModel === model.name ? 'bg-slate-50' : ''}`}
                                  >
                                    <div className="flex flex-col text-left">
                                      <span className="text-xs font-black text-slate-900 tracking-tight">{model.name}</span>
                                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{model.tier}</span>
                                    </div>
                                    {selectedModel === model.name && <Check className="w-4 h-4 text-indigo-600" />}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Aspect Ratio Dropdown (Only for Image/Video) */}
                      {(selectedTool === "Image Generation" || selectedTool === "Video Generation") && (
                        <div className="relative">
                          <button 
                            onClick={() => {
                              setShowAspectRatioDropdown(!showAspectRatioDropdown)
                              setShowModelDropdown(false)
                            }}
                            className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-3 md:py-3.5 text-[10px] md:text-xs font-bold rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all text-slate-700 uppercase tracking-widest"
                          >
                            <Maximize2 className="w-3 md:w-3.5 h-3 md:h-3.5 text-indigo-600" />
                            <span>{selectedAspectRatio}</span>
                            <ChevronDown className={`w-3 md:w-3.5 h-3 md:h-3.5 opacity-40 transition-transform ${showAspectRatioDropdown ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {showAspectRatioDropdown && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mb-4 w-56 bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] p-1.5"
                              >
                                <div className="text-[10px] font-black text-slate-400 px-4 pt-3 pb-2 uppercase tracking-[0.2em]">Select Format</div>
                                {aspectRatios.map((ratio) => (
                                  <button
                                    key={ratio.name}
                                    onClick={() => {
                                      setSelectedAspectRatio(ratio.name)
                                      setShowAspectRatioDropdown(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50/50 flex items-center justify-between transition-all ${selectedAspectRatio === ratio.name ? 'bg-slate-50' : ''}`}
                                  >
                                    <span className="text-xs font-black text-slate-900 tracking-tight">{ratio.name}</span>
                                    {selectedAspectRatio === ratio.name && <Check className="w-4 h-4 text-indigo-600" />}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <VoiceInputButton 
                        onTranscript={(text) => setInputValue(v => v + (v ? ' ' : '') + text)}
                        className="p-3 md:p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm flex-1 md:flex-none flex justify-center"
                      />

                      <button 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className={`relative group flex items-center justify-center gap-3 px-6 md:px-10 py-3.5 md:py-4 rounded-2xl text-[10px] md:text-xs font-black transition-all flex-[2] md:flex-none ${
                          !inputValue.trim() 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-slate-200'
                        }`}
                      >
                        <span className="tracking-[0.2em]">GENERATE</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 opacity-40 mt-8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center">Powered by Vertex AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center">Global MaaS Network</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center">Enterprise Secure</span>
              </div>
            </div>
        </div>
      </motion.div>
    </div>
  )
}
