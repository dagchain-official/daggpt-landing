import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Send, ArrowLeft, Copy, Check, ThumbsUp, ThumbsDown, RefreshCw, MoreVertical } from 'lucide-react';
import vertexAIService from '../services/vertexAIService';
import VoiceInputButton from './VoiceInputButton';

export function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialMessage, selectedModel } = location.state || {};
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Loading stage animation effect with typing animation
  useEffect(() => {
    if (isLoading) {
      setLoadingStage(0);
      setLoadingText('');
      const timer1 = setTimeout(() => setLoadingStage(1), 2000);
      const timer2 = setTimeout(() => setLoadingStage(2), 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setLoadingText('');
    }
  }, [isLoading]);

  // Letter-by-letter typing animation
  useEffect(() => {
    if (!isLoading) return;
    
    const texts = ['Thinking...', 'Processing...', 'Crafting response...'];
    const currentText = texts[loadingStage];
    let currentIndex = 0;
    
    setLoadingText('');
    
    const typingInterval = setInterval(() => {
      if (currentIndex < currentText.length) {
        setLoadingText(currentText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [loadingStage, isLoading]);

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      // Add user message immediately
      const newUserMessage = { role: 'user', content: initialMessage };
      setMessages([newUserMessage]);
      
      // Then send to AI
      sendToAI(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToAI = async (messageText) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await vertexAIService.sendMessage(
        messageText,
        selectedModel || 'Gemini 3 Flash',
        []
      );

      const aiMessage = { role: 'model', content: response.text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = messageText.trim();
    setInputValue('');
    setError(null);
    setIsLoading(true);

    const newUserMessage = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await vertexAIService.sendMessage(
        userMessage,
        selectedModel || 'Gemini 2.5 Flash',
        conversationHistory
      );

      const aiMessage = { role: 'model', content: response.text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to get response from AI');
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyMessageToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageIndex(index);
    setTimeout(() => setCopiedMessageIndex(null), 2000);
  };

  const handleRegenerateResponse = async (index) => {
    if (index === 0 || isLoading) return;
    
    // Get the user message before this AI response
    const userMessage = messages[index - 1];
    if (!userMessage || userMessage.role !== 'user') return;
    
    // Remove messages from this point onwards
    setMessages(prev => prev.slice(0, index));
    
    // Regenerate the response
    setIsLoading(true);
    setError(null);

    try {
      const conversationHistory = messages.slice(0, index - 1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await vertexAIService.sendMessage(
        userMessage.content,
        selectedModel || 'Gemini 2.5 Flash',
        conversationHistory
      );

      const aiMessage = { role: 'model', content: response.text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error regenerating response:', err);
      setError(err.message || 'Failed to regenerate response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Model:</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {selectedModel || 'Gemini 2.5 Flash'}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-6 py-4 ${
                  msg.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white shadow-md border border-gray-200'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                ) : (
                  <>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <div className="relative">
                              <button
                                onClick={() => copyToClipboard(String(children).replace(/\n$/, ''), index)}
                                className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                title="Copy code"
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-300" />
                                )}
                              </button>
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm" {...props}>
                              {children}
                            </code>
                          );
                        },
                        h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>,
                        li: ({ children }) => <li className="ml-4">{children}</li>,
                        a: ({ children, href }) => (
                          <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">
                            {children}
                          </blockquote>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full border border-gray-300">{children}</table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-gray-300 px-4 py-2">{children}</td>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    </div>
                    
                    {/* Action Icons for AI responses */}
                    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => copyMessageToClipboard(msg.content, index)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="Copy response"
                      >
                        {copiedMessageIndex === index ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleRegenerateResponse(index)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="Regenerate response"
                        disabled={isLoading}
                      >
                        <RefreshCw className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      </button>
                      
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="Good response"
                      >
                        <ThumbsUp className="w-4 h-4 text-gray-500 group-hover:text-green-600" />
                      </button>
                      
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="Bad response"
                      >
                        <ThumbsDown className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                      </button>
                      
                      <button
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="More options"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md border border-gray-200 rounded-2xl px-6 py-4">
                <p className="text-xs text-gray-500 italic">
                  {loadingText}
                </p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows="3"
              disabled={isLoading}
            />
            <div className="flex items-center gap-2">
              <VoiceInputButton
                onTranscript={(text) => setInputValue(inputValue + (inputValue ? ' ' : '') + text)}
                className="p-3 rounded-xl bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all border border-gray-300 hover:border-gray-400"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className={`p-3 rounded-xl transition-all ${
                  isLoading || !inputValue.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
