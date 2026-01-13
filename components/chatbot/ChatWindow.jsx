'use client';

import { Send, Bot, User, X, RotateCw, PanelLeftOpen, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import LanguageSelection from './LanguageSelection';
import { useRef, useEffect } from 'react';

/**
 * Formats text with markdown-style bold formatting
 * @param {string} text - Text to format
 * @returns {JSX.Element} Formatted text component
 */
const FormattedText = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className="whitespace-pre-wrap leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-orange-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

const SUGGESTIONS = {
  english: ["Darshan Timings", "Best Hotels", "History of Pandharpur", "How to reach?"],
  marathi: ["दर्शन वेळा", "उत्तम हॉटेल्स", "पंढरपूरचा इतिहास", "कसे पोहोचायचे?"],
  hindi: ["दर्शन का समय", "अच्छे होटल", "पंढरपुर का इतिहास", "कैसे पहुंचें?"]
};

export default function ChatWindow({
  messages,
  input,
  setInput,
  onSendMessage,
  isLoading,
  isInitializing,
  language,
  onLanguageSelect,
  isSidebarOpen,
  setIsSidebarOpen,
  onNewChat,
  onClose
}) {
  const scrollAreaRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading, isInitializing]);

  const handleSuggestionClick = (text) => {
    onSendMessage(null, text); 
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full relative bg-white">
      
      {/* --- HEADER --- */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:bg-gray-100" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Toggle Sidebar"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm leading-tight">Pandhari Mitra</h3>
              <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={onNewChat} title="New Chat">
            <RotateCw className="h-4 w-4 text-gray-400 hover:text-orange-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} title="Close">
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </Button>
        </div>
      </div>

      {/* --- CHAT AREA --- */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
        {isInitializing ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
            <p className="text-xs">Starting new conversation...</p>
          </div>
        ) : !language ? (
          <LanguageSelection onSelect={onLanguageSelect} />
        ) : (
          <div className="flex flex-col gap-6 pb-2">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-5 w-5 text-orange-600" />
                  </div>
                )}
                <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                  }`}>
                    {msg.isError ? <span className="text-red-500">{msg.content}</span> : <FormattedText text={msg.content} />}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </motion.div>
            ))}

            {messages.length === 1 && !isLoading && SUGGESTIONS[language] && (
               <div className="ml-11 mt-2 animate-in fade-in duration-500">
                  <p className="text-xs text-gray-400 mb-2 pl-1 font-medium">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS[language].map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="flex items-center gap-1.5 text-xs font-medium text-orange-700 bg-orange-50 border border-orange-100 hover:bg-orange-100 hover:border-orange-200 hover:scale-105 active:scale-95 transition-all px-3 py-2 rounded-full shadow-sm"
                      >
                        <Sparkles className="h-3 w-3 text-orange-500" />
                        {s}
                      </button>
                    ))}
                  </div>
               </div>
            )}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                  <Bot className="h-5 w-5 text-orange-600" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- INPUT AREA --- */}
      {language && (
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={onSendMessage} className="flex gap-2 relative items-center">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="pr-12 bg-gray-50 border-gray-200 focus-visible:ring-orange-500 rounded-full h-11 shadow-sm"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full bg-orange-600 hover:bg-orange-700 text-white absolute right-1.5 h-8 w-8 shadow-md"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}