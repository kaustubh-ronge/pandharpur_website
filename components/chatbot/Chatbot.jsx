'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage, createNewChatSession, getUserSessions, getSpecificSession, deleteChatSession, updateChatSessionTitle } from '@/actions/chatActions';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Plus, ChevronLeft, Trash2, Pencil, Check, X, Loader2 } from 'lucide-react'; 
import ChatIcon from './ChatIcon';
import ChatWindow from './ChatWindow'; 

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      initializeChat();
      // Use the safe windowWidth state instead of window.innerWidth
      if (windowWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    }
  }, [isOpen]); // dependency on isOpen is sufficient here as windowWidth updates will trigger re-renders

  const initializeChat = async () => {
    setIsInitializing(true);

    let guestId = localStorage.getItem('chatGuestId');
    if (!guestId) {
       guestId = uuidv4();
       localStorage.setItem('chatGuestId', guestId);
    }

    await fetchSessionHistory(guestId);
    await handleNewChat(guestId);
    
    setIsInitializing(false);
  };

  const fetchSessionHistory = async (guestIdOverride = null) => {
    const guestId = guestIdOverride || localStorage.getItem('chatGuestId');
    const res = await getUserSessions(guestId);
    if (res.success) setSessionList(res.sessions);
  };

  const handleNewChat = async (guestIdOverride = null) => {
    setMessages([]);
    setLanguage(null);
    setSession(null);
    if (windowWidth < 768) setIsSidebarOpen(false);

    let guestId = guestIdOverride || localStorage.getItem('chatGuestId');
    if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem('chatGuestId', guestId);
    }

    const res = await createNewChatSession(guestId);
    if (res.success) setSession(res.session);
  };

  const loadOldSession = async (sessionId) => {
    setIsLoading(true);
    if (windowWidth < 768) setIsSidebarOpen(false); 

    const res = await getSpecificSession(sessionId);
    if (res.success) {
      setSession(res.session);
      setMessages(res.messages);
      setLanguage('restored'); 
    }
    setIsLoading(false);
  };

  // --- ACTIONS: RENAME & DELETE ---

  const startEditing = (e, session) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitleInput(session.title);
  };

  const cancelEditing = (e) => {
    e.stopPropagation();
    setEditingSessionId(null);
  };

  const saveTitle = async (e, sessionId) => {
    e.stopPropagation();
    if (!editTitleInput.trim()) return;

    setSessionList(prev => prev.map(s => s.id === sessionId ? { ...s, title: editTitleInput } : s));
    setEditingSessionId(null);
    await updateChatSessionTitle(sessionId, editTitleInput);
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation();
    if (!confirm("Delete this chat?")) return;
    
    setIsDeleting(sessionId);
    const res = await deleteChatSession(sessionId);
    
    if (res.success) {
      setSessionList(prev => prev.filter(s => s.id !== sessionId));
      if (session?.id === sessionId) handleNewChat();
    }
    setIsDeleting(null);
  };

  // --- MESSAGING ---

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    const welcomeMessages = {
      marathi: "नमस्कार! मी 'पंढरी मित्र' आहे. आज मी तुम्हाला कशी मदत करू?",
      hindi: "नमस्ते! मैं 'पंढरी मित्र' हूँ। आज मैं आपकी कैसे सहायता कर सकती हूँ?",
      english: "Hello! I am 'Pandhari Mitra'. How can I assist you today?"
    };
    setMessages([{ id: uuidv4(), role: 'model', content: welcomeMessages[lang] || welcomeMessages.english, createdAt: new Date() }]);
  };

  const handleSendMessage = async (e, textOverride = null) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const textToSend = textOverride || input;
    if (!textToSend || !textToSend.trim() || !session || isLoading) return;

    setMessages(prev => [...prev, { id: uuidv4(), role: 'user', content: textToSend, createdAt: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      const langToSend = language === 'restored' ? 'english' : language;
      const res = await sendMessage(session.id, textToSend, langToSend);
      if (res.success) {
        setMessages(prev => [...prev, res.aiMessage]);
        fetchSessionHistory(); 
      }
    } catch {
      setMessages(prev => [...prev, { id: uuidv4(), role: 'model', content: "Connection error.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(true)} />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl flex flex-row h-[600px] w-[95vw] p-0 gap-0 overflow-hidden bg-white border-none shadow-2xl rounded-xl">
          
          {/* ✅ FIX: DialogContent requires a DialogTitle for accessibility */}
          {/* We use 'sr-only' to hide it visually but keep it for screen readers */}
          <DialogTitle className="sr-only">Pandhari Mitra Chatbot</DialogTitle>

          {/* --- LEFT SIDEBAR (History) --- */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              // ✅ FIX: Use windowWidth state instead of window.innerWidth directly
              width: isSidebarOpen ? (windowWidth < 640 ? '100%' : 280) : 0, 
              opacity: isSidebarOpen ? 1 : 0 
            }}
            className="bg-gray-50 border-r border-gray-100 flex-shrink-0 flex flex-col overflow-hidden absolute md:relative z-20 h-full shadow-lg md:shadow-none"
          >
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-100 h-[60px]">
                <span className="font-semibold text-gray-700 text-sm">Chat History</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSidebarOpen(false)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 text-orange-600 mb-2 bg-white border-orange-200 hover:bg-orange-50" 
                    onClick={() => handleNewChat()}
                >
                   <Plus className="h-4 w-4" /> New Chat
                </Button>
                
                {sessionList.length === 0 && <p className="text-xs text-center text-gray-400 mt-4">No history yet</p>}

                {sessionList.map((s) => (
                  <div 
                    key={s.id} 
                    onClick={() => loadOldSession(s.id)}
                    className={`group w-full text-left p-3 rounded-lg text-xs flex items-center justify-between gap-2 cursor-pointer transition-all border ${
                       session?.id === s.id ? 'bg-white border-orange-200 shadow-sm' : 'border-transparent hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {editingSessionId === s.id ? (
                      // EDIT MODE
                      <div className="flex items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                        <Input 
                          value={editTitleInput} 
                          onChange={(e) => setEditTitleInput(e.target.value)}
                          className="h-7 text-xs px-2 bg-white"
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && saveTitle(e, s.id)}
                        />
                        <button onClick={(e) => saveTitle(e, s.id)} className="p-1 text-green-600 hover:bg-green-100 rounded"><Check className="h-3 w-3"/></button>
                        <button onClick={cancelEditing} className="p-1 text-red-500 hover:bg-red-100 rounded"><X className="h-3 w-3"/></button>
                      </div>
                    ) : (
                      // DISPLAY MODE
                      <>
                        <div className="flex items-start gap-2 overflow-hidden flex-1">
                           <MessageSquare className="h-3 w-3 mt-0.5 text-gray-400 flex-shrink-0" />
                           <div className="truncate flex-1">
                             <span className="block font-medium text-gray-700 truncate">{s.title}</span>
                             <span className="text-[10px] text-gray-400">{new Date(s.date).toLocaleDateString()}</span>
                           </div>
                        </div>
                        
                        {/* Actions (Rename/Delete) */}
                        <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button 
                             onClick={(e) => startEditing(e, s)}
                             className="p-1.5 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-500"
                          >
                             <Pencil className="h-3 w-3" />
                          </button>
                          <button 
                             onClick={(e) => handleDeleteSession(e, s.id)}
                             className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                             disabled={isDeleting === s.id}
                          >
                             {isDeleting === s.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
             </div>
          </motion.div>

          {/* --- RIGHT CHAT WINDOW --- */}
          <ChatWindow 
            messages={messages}
            input={input}
            setInput={setInput}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            isInitializing={isInitializing}
            language={language}
            onLanguageSelect={handleLanguageSelect}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            onNewChat={() => handleNewChat()}
            onClose={() => setIsOpen(false)}
          />

        </DialogContent>
      </Dialog>
    </>
  );
}