'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getOrCreateChatSession, sendMessage, createNewChatSession } from '@/actions/chatActions';
import { motion } from 'framer-motion';

// Shadcn UI Components & Icons
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Send, Bot, User, X, RotateCw } from 'lucide-react';

// Custom Chatbot Components
import ChatIcon from './ChatIcon';
import LanguageSelection from './LanguageSelection';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(null);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return; 
    
    const initializeChat = async () => {
      setIsLoading(true);
      let guestId = localStorage.getItem('chatGuestId');
      if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem('chatGuestId', guestId);
      }
      const response = await getOrCreateChatSession(guestId);
      if (response.success) {
        setSession(response.session);
        if (response.messages && response.messages.length > 0) {
          setMessages(response.messages);
          setIsLanguageSelected(true);
          setLanguage('english');
        } else {
          setMessages([]);
          setIsLanguageSelected(false);
        }
      }
      setIsLoading(false);
    };
    initializeChat();
  }, [isOpen]);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setIsLanguageSelected(true);
    let welcomeText = '';
    if (lang === 'marathi') {
        welcomeText = "नमस्कार! मी तुमची कशी मदत करू शकते?";
    } else if (lang === 'hindi') {
        welcomeText = "नमस्ते! मैं आपकी कैसे मदद कर सकती हूँ?";
    } else {
        welcomeText = "Hello! How can I assist you today?";
    }
    setMessages([{ id: uuidv4(), role: 'model', content: welcomeText, createdAt: new Date() }]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !session || isLoading || !isLanguageSelected) return;

    const userMessageContent = input;
    const userMessage = { id: uuidv4(), role: 'user', content: userMessageContent, createdAt: new Date() };
    
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessage(session.id, userMessageContent, language);
    
    if (response.success) {
      setMessages(currentMessages => [...currentMessages, response.aiMessage]);
    } else {
      const errorMessage = { id: uuidv4(), role: 'model', content: "My apologies, I had trouble connecting. Please try again.", createdAt: new Date() };
      setMessages(currentMessages => [...currentMessages, errorMessage]);
    }
    setIsLoading(false);
  };

  const handleNewChat = async () => {
    setIsLoading(true);
    setMessages([]);
    setIsLanguageSelected(false);
    setLanguage(null);

    let guestId = localStorage.getItem('chatGuestId');
    const response = await createNewChatSession(guestId);
    if (response.success) {
      setSession(response.session);
    } else {
      console.error("Failed to create new chat session");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(true)} />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md flex flex-col h-[700px] max-h-[90vh] p-0 overflow-hidden bg-white">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full"><Bot className="h-6 w-6 text-orange-700" /></div>
                <div>
                  <DialogTitle className="text-lg font-bold text-gray-900">Pandhari Mitra 🙏</DialogTitle>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={handleNewChat} disabled={isLoading} aria-label="New Chat">
                    <RotateCw className="h-5 w-5 text-gray-500 hover:text-gray-800" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5 text-gray-500 hover:text-gray-800" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto bg-gray-50/50">
            {/* STYLE: Increased main gap between messages to `gap-6` */}
            <div className="flex flex-col gap-6">
              {isLanguageSelected ? (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && <Bot className="h-6 w-6 text-orange-600 flex-shrink-0 mt-2" />}
                    
                    <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                        // STYLE: Increased padding to `p-4` and refined colors
                        className={`p-4 rounded-lg text-sm leading-relaxed shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-orange-50 text-gray-800 rounded-bl-none border border-orange-100'
                        }`}
                      >
                        {msg.content}
                      </motion.div>
                      {/* NEW: Added a formatted timestamp below each message */}
                      <p className="text-xs text-gray-400 mt-1.5 px-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {msg.role === 'user' && <User className="h-6 w-6 text-gray-500 flex-shrink-0 mt-2" />}
                  </div>
                ))
              ) : (
                <LanguageSelection onSelect={handleLanguageSelect} />
              )}
              {isLoading && !isLanguageSelected && ( <p className="text-center text-gray-400">Loading...</p> )}
              {isLoading && isLanguageSelected && (
                 <div className="flex justify-start gap-3 items-center">
                  <Bot className="h-6 w-6 text-orange-600 flex-shrink-0" />
                  <div className="p-3 rounded-lg bg-gray-100 border">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {isLanguageSelected && (
            <>
              <Separator />
              <DialogFooter className="p-3 bg-white">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Pandharpur..." disabled={isLoading}/>
                  <Button type="submit" size="icon" disabled={isLoading}><Send className="h-5 w-5" /></Button>
                </form>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}