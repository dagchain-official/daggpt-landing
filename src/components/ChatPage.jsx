import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { 
  Send, 
  ArrowLeft, 
  Copy, 
  Sparkles, 
  History, 
  Plus, 
  User, 
  Music as MusicIcon,
  Download,
  ExternalLink
} from 'lucide-react';
import vertexAIService from '../services/vertexAIService';
import VoiceInputButton from './VoiceInputButton';

export function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialMessage, selectedModel, function: selectedFunction, aspectRatio, files } = location.state || {};
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState(null);
  const [history] = useState([
    { id: 1, title: initialMessage?.substring(0, 30) + '...' || 'New Chat', active: true },
    { id: 2, title: 'Previous Concept Design', active: false },
    { id: 3, title: 'AI Ethics Discussion', active: false },
  ]);
  
    const messagesEndRef = useRef(null);
  
    const getAspectRatioClass = (ratio) => {
      if (ratio?.includes('16:9')) return 'aspect-video';
      if (ratio?.includes('9:16')) return 'aspect-[9/16]';
      if (ratio?.includes('4:3')) return 'aspect-[4/3]';
      if (ratio?.includes('3:4')) return 'aspect-[3/4]';
      if (ratio?.includes('1:1')) return 'aspect-square';
      return 'aspect-video';
    };

    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pollVideoStatus = useCallback(async (opName) => {
    console.log(`Starting polling for operation: ${opName}`);
    let done = false;
    let attempts = 0;
    while (!done && attempts < 60) { // Max 15 mins (increased)
      attempts++;
      try {
          console.log(`Polling attempt ${attempts} for ${opName}...`);
          const status = await vertexAIService.checkOperationStatus(opName);
          console.log(`Operation status:`, status);
          if (status.done) {
            done = true;
            if (status.error) throw new Error(status.error.message);
            
            // Veo 3.1 returns generatedVideos array
            const videoData = status.response.generatedVideos?.[0] || status.response.videos?.[0];
            if (!videoData) throw new Error('No video data in response');

            setMessages(prev => [...prev, { 
              role: 'model', 
              type: 'video',
              content: 'Your cinematic video has been generated.',
              videoUrl: videoData.video?.bytesBase64Encoded || videoData.bytesBase64Encoded || videoData.gcsUri,
              mimeType: videoData.video?.mimeType || videoData.mimeType || 'video/mp4'
            }]);
          } else {
          setLoadingText(`Generating video... (${attempts * 2}%)`);
          await new Promise(r => setTimeout(r, 15000)); // Poll every 15s
        }
      } catch (err) {
        setError('Video generation failed: ' + err.message);
        break;
      }
    }
  }, [setLoadingText, setError, setMessages]);

  const handleGeneration = useCallback(async (prompt, type, model, ratio) => {
    console.log(`handleGeneration started: type=${type}, model=${model}, ratio=${ratio}`);
    setIsLoading(true);
    setLoadingText('Initializing intelligence...');
    setError(null);

    try {
      let result;
      if (type === "Image Generation") {
        setLoadingText('Dreaming up your visual...');
        result = await vertexAIService.generateImage(prompt, model, ratio);
        setMessages(prev => [...prev, { 
          role: 'model', 
          type: 'image',
          content: 'Here is your generated image.',
          imageData: result.imageData,
          mimeType: result.mimeType
        }]);
      } else if (type === "Video Generation") {
        setLoadingText('Director AI is composing...');
        const op = await vertexAIService.generateVideo(prompt, model, ratio);
        // Polling logic for video - Await here to keep loading state active
        await pollVideoStatus(op.operationName);
      } else if (type === "Music Generation") {
        setLoadingText('Composing your symphony...');
        result = await vertexAIService.generateMusic(prompt, model);
        setMessages(prev => [...prev, { 
          role: 'model', 
          type: 'music',
          content: 'Your AI composition is ready.',
          audioData: result.audioData,
          mimeType: result.mimeType
        }]);
      } else if (type === "Website Builder") {
        setLoadingText('Architecting your web space...');
        result = await vertexAIService.generateWebsite(prompt);
        setMessages(prev => [...prev, { 
          role: 'model', 
          type: 'website',
          content: 'I have built your website. You can preview the code below.',
          code: result.code
        }]);
      } else {
        setLoadingText('Thinking...');
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        result = await vertexAIService.sendMessage(prompt, model, history);
        setMessages(prev => [...prev, { 
          role: 'model', 
          type: 'text',
          content: result.text,
          modelUsed: result.modelUsed
        }]);
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Something went wrong with the generation.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, pollVideoStatus]);

  const hasHandledInitial = useRef(false);

  useEffect(() => {
    if (initialMessage && messages.length === 0 && !hasHandledInitial.current) {
      hasHandledInitial.current = true;
      const newUserMessage = { 
        role: 'user', 
        content: initialMessage,
        type: selectedFunction || 'AI Chat',
        model: selectedModel,
        aspectRatio: aspectRatio,
        files: files
      };
      setMessages([newUserMessage]);
      handleGeneration(initialMessage, selectedFunction, selectedModel, aspectRatio);
    }
  }, [initialMessage, messages.length, selectedFunction, selectedModel, aspectRatio, files, handleGeneration]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const msg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    handleGeneration(msg, 'AI Chat', selectedModel);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      
      {/* Sidebar (10%) */}
      <aside className="w-[10%] h-full bg-slate-50/50 border-r border-slate-200/50 flex flex-col z-20 overflow-hidden">
        <div className="p-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-2 py-3 bg-white border border-slate-200 rounded-2xl w-full text-[9px] font-black uppercase tracking-tighter hover:bg-slate-50 transition-all shadow-sm mb-8"
          >
            <Plus className="w-3.5 h-3.5" />
            New
          </button>

          <div className="space-y-1">
            <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-2 mb-4 flex items-center gap-2">
              <History className="w-3 h-3" />
              Recent
            </div>
            {history.map(item => (
              <button 
                key={item.id}
                className={`w-full text-left px-3 py-3 rounded-xl text-[10px] font-bold transition-all truncate flex items-center justify-between group ${
                  item.active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-white hover:text-slate-900'
                }`}
              >
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-slate-200/50">
          <div className="flex items-center justify-center p-2 bg-white rounded-xl border border-slate-200/50 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[9px] font-black uppercase">
              JD
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content (80%) */}
      <main className="flex-1 h-full flex flex-col relative bg-white overflow-hidden">
        
        {/* Workspace Header */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-slate-100/50 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/')} className="p-2.5 hover:bg-slate-50 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                {selectedFunction} Workspace <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedModel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-slate-200">
               <Download className="w-3.5 h-3.5" /> Export
             </button>
          </div>
        </header>

        {/* Conversation Stage */}
        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-12 space-y-12 no-scrollbar">
          
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                        {/* Avatar */}
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                          {msg.role === 'user' ? (
                            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                              <User className="w-5 h-5 text-slate-400" />
                            </div>
                          ) : (
                            <img src="/DAGGPT-01.jpg" className="w-10 h-10 object-contain bg-transparent" alt="DAG GPT" />
                          )}
                        </div>


                {/* Bubble Container */}
                <div className={`flex flex-col gap-3 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Message Bubble */}
                    <div className={`relative px-8 py-6 rounded-[2rem] shadow-sm border ${
                      msg.role === 'user' 
                        ? 'bg-slate-50 border-slate-100 text-slate-900' 
                        : 'bg-white border-slate-200/50 text-slate-800'
                    }`}>
                      {/* User Prompt Header Style (for initial message) */}
                      {index === 0 && msg.role === 'user' && (
                        <div className="mb-4 flex items-center gap-2 opacity-40">
                          <Sparkles className="w-3 h-3" />
                          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Initial Directives</span>
                        </div>
                      )}

                      {/* Rendering Content based on Type */}
                      {msg.type === 'image' ? (
                        <div className="space-y-6">
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square md:aspect-video flex items-center justify-center">
                            <img 
                              src={`data:${msg.mimeType};base64,${msg.imageData}`} 
                              alt="AI Generated" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-slate-500 italic">{msg.content}</p>
                        </div>
                      ) : msg.type === 'video' ? (
                        <div className="space-y-6">
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center">
                            <video 
                              src={msg.videoUrl.startsWith('gs://') ? null : `data:${msg.mimeType};base64,${msg.videoUrl}`}
                              controls
                              autoPlay
                              className="w-full h-full object-contain"
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <p className="text-sm font-medium text-slate-500 italic">{msg.content}</p>
                        </div>
                      ) : msg.type === 'music' ? (
                      <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                               <MusicIcon className="w-6 h-6" />
                            </div>
                            <div>
                               <div className="text-xs font-black text-slate-900">AI Composition.wav</div>
                               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">48kHz • High Fidelity</div>
                            </div>
                         </div>
                         <audio controls className="w-full">
                            <source src={`data:${msg.mimeType};base64,${msg.audioData}`} type={msg.mimeType} />
                         </audio>
                      </div>
                    ) : msg.type === 'website' ? (
                      <div className="space-y-6">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Constructed Code</span>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                               <ExternalLink className="w-3 h-3" /> Live Preview
                            </button>
                         </div>
                         <div className="rounded-xl overflow-hidden border border-slate-200">
                           <SyntaxHighlighter language="html" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem', fontSize: '12px' }}>
                             {msg.code}
                           </SyntaxHighlighter>
                         </div>
                      </div>
                    ) : (
                      <div className="prose prose-slate prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 px-4">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.role === 'model' && (
                      <button className="text-[9px] font-black text-slate-300 hover:text-indigo-500 uppercase tracking-widest flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

              {/* Loading State */}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-6"
                >
                  {/* Loading Avatar */}
                  <div className="w-10 h-10 flex items-center justify-center animate-pulse">
                    <img src="/DAGGPT-01.jpg" className="w-10 h-10 object-contain bg-transparent" alt="DAG GPT" />
                  </div>
                    <div className="flex flex-col gap-3 w-full max-w-[80%]">
                      {selectedFunction === "Video Generation" && (
                         <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`w-full ${getAspectRatioClass(aspectRatio)} rounded-[3rem] bg-slate-50 border border-slate-200/50 overflow-hidden relative group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] mb-6`}
                         >
                            {/* Dynamic Cinematic Background - Light Theme */}
                            <motion.div 
                              animate={{ 
                                background: [
                                  "radial-gradient(circle at 20% 20%, #f8fafc 0%, #eff6ff 100%)",
                                  "radial-gradient(circle at 80% 80%, #f8fafc 0%, #eff6ff 100%)",
                                  "radial-gradient(circle at 20% 20%, #f8fafc 0%, #eff6ff 100%)"
                                ]
                              }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0"
                            />
                            
                            {/* Subtle Shimmer Layers */}
                            <motion.div 
                              animate={{ 
                                x: ['-100%', '100%'],
                                opacity: [0, 0.5, 0]
                              }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"
                            />
    
                            {/* Scanner Effect - Sophisticated Light Version */}
                            <motion.div 
                              animate={{ top: ["-10%", "110%"] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent z-10 pointer-events-none"
                            />
    
                            {/* Centered Creative Suite UI */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                               <div className="flex flex-col items-center gap-8">
                                     {/* Synthetic Lens / AI Core - Premium Animation */}
                                     <div className="relative w-40 h-40 flex items-center justify-center">
                                        {/* Background Glow */}
                                        <motion.div 
                                          animate={{ 
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.6, 0.3]
                                          }}
                                          transition={{ duration: 4, repeat: Infinity }}
                                          className="absolute w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"
                                        />

                                        {/* Multi-layered Rotating Rings */}
                                        {[...Array(3)].map((_, i) => (
                                          <motion.div 
                                            key={i}
                                            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                                            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                                            className="absolute border border-indigo-500/20 rounded-full"
                                            style={{ 
                                              inset: `${i * 12}px`,
                                              borderStyle: i === 1 ? 'dashed' : 'solid',
                                              borderWidth: i === 0 ? '1px' : '2px'
                                            }}
                                          />
                                        ))}

                                        {/* Orbiting Particles */}
                                        {[...Array(6)].map((_, i) => (
                                          <motion.div
                                            key={i}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0"
                                          >
                                            <motion.div 
                                              animate={{ scale: [1, 1.5, 1] }}
                                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                              className="absolute w-1.5 h-1.5 bg-indigo-500/40 rounded-full"
                                              style={{ 
                                                top: '0', 
                                                left: '50%', 
                                                transform: 'translateX(-50%)' 
                                              }}
                                            />
                                          </motion.div>
                                        ))}

                                        {/* The Core Lens */}
                                        <motion.div 
                                          animate={{ 
                                             scale: [1, 1.05, 1],
                                             boxShadow: [
                                               "0 0 20px rgba(99, 102, 241, 0.1)",
                                               "0 0 40px rgba(99, 102, 241, 0.2)",
                                               "0 0 20px rgba(99, 102, 241, 0.1)"
                                             ]
                                          }}
                                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                          className="w-20 h-20 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] flex items-center justify-center shadow-2xl z-10"
                                        >
                                           <div className="relative w-12 h-12 flex items-center justify-center">
                                              <motion.div 
                                                 animate={{ rotate: 360 }}
                                                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                 className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 rounded-full"
                                              />
                                              <Sparkles className="w-10 h-10 text-indigo-500 relative z-10" />
                                           </div>
                                        </motion.div>
                                     </div>
    
                                  <div className="flex flex-col items-center gap-4 text-center px-6">
                                     <div className="space-y-1.5">
                                        <motion.h3 
                                           initial={{ opacity: 0 }}
                                           animate={{ opacity: 1 }}
                                           className="text-slate-900 text-lg font-black tracking-[0.2em] uppercase"
                                        >
                                           Cinematic Synthesis
                                        </motion.h3>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                                           Veo 3.1 Fast Rendering Pipeline
                                        </p>
                                     </div>
    
                                     {/* Animated Progress Bar */}
                                     <div className="w-48 h-[3px] bg-slate-100 rounded-full overflow-hidden relative">
                                        <motion.div 
                                          animate={{ left: ["-100%", "100%"] }}
                                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
                                        />
                                     </div>
                                  </div>
                               </div>
                            </div>
    
                            {/* Glass Overlay for Depth */}
                            <div className="absolute inset-0 backdrop-blur-[1px]"></div>
                            <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/5 rounded-[3rem]"></div>
                         </motion.div>
                      )}

                  
                  <div className="px-10 py-7 rounded-[2.5rem] bg-white border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex items-center gap-6 w-fit">
                     <div className="relative flex items-center justify-center">
                        <motion.div 
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                           className="w-5 h-5 border-2 border-indigo-500/10 border-t-indigo-500 rounded-full"
                        />
                     </div>
                     <span className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">{loadingText}</span>
                  </div>
                </div>
            </motion.div>
          )}

          {error && (
            <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-bold text-rose-600 uppercase tracking-widest">
              Critical Error: {error}
            </div>
          )}

          <div ref={messagesEndRef} className="h-20" />
        </div>

        {/* Input Dock */}
        <div className="px-8 md:px-12 py-8 bg-gradient-to-t from-white via-white to-transparent sticky bottom-0 z-10">
           <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-100/50 overflow-hidden flex items-end">
                 <textarea 
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                   placeholder="Send a follow-up message..."
                   className="flex-1 max-h-40 min-h-[56px] px-6 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none no-scrollbar resize-none"
                   rows="1"
                 />
                 <div className="px-4 py-2 flex items-center gap-2">
                    <VoiceInputButton 
                      onTranscript={(t) => setInputValue(v => v + t)} 
                      className="p-2.5 text-slate-400 hover:text-slate-900 transition-all"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className={`p-3 rounded-xl transition-all ${
                        !inputValue.trim() || isLoading ? 'text-slate-200' : 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Aesthetic Parallax Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}
