// // // // // 'use client';

// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { v4 as uuidv4 } from 'uuid';
// // // // // import { getOrCreateChatSession, sendMessage } from '@/actions/chatActions';
// // // // // import ChatWindow from './ChatWindow';
// // // // // import ChatIcon from './ChatIcon';

// // // // // export default function Chatbot() {
// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const [session, setSession] = useState(null);
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [input, setInput] = useState('');
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const messagesEndRef = useRef(null);

// // // // //   const scrollToBottom = () => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     scrollToBottom();
// // // // //   }, [messages]);

// // // // //   useEffect(() => {
// // // // //     const initializeChat = async () => {
// // // // //       let guestId = localStorage.getItem('chatGuestId');
// // // // //       if (!guestId) {
// // // // //         guestId = uuidv4();
// // // // //         localStorage.setItem('chatGuestId', guestId);
// // // // //       }
// // // // //       const response = await getOrCreateChatSession(guestId);
// // // // //       if (response.success) {
// // // // //         setSession(response.session);
// // // // //         setMessages(response.messages || []);
// // // // //       } else {
// // // // //         console.error("Failed to initialize chat session:", response.error);
// // // // //       }
// // // // //     };
// // // // //     initializeChat();
// // // // //   }, []);

// // // // //   const handleSendMessage = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!input.trim() || !session || isLoading) return;

// // // // //     const userMessage = { id: `temp-${Date.now()}`, role: 'user', content: input };
// // // // //     setMessages((prev) => [...prev, userMessage]);
// // // // //     const messageToSend = input;
// // // // //     setInput('');
// // // // //     setIsLoading(true);

// // // // //     const response = await sendMessage(session.id, messageToSend);
// // // // //     setIsLoading(false);

// // // // //     if (response.success) {
// // // // //       setMessages((prev) => [...prev.filter(m => m.id !== userMessage.id), response.aiMessage]);
// // // // //     } else {
// // // // //       setMessages((prev) => [...prev, {
// // // // //         id: `err-${Date.now()}`, role: 'model', content: "Sorry, an error occurred."
// // // // //       }]);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed bottom-5 right-5 z-50">
// // // // //       {isOpen ? (
// // // // //         <ChatWindow
// // // // //           messages={messages}
// // // // //           input={input}
// // // // //           isLoading={isLoading}
// // // // //           handleInputChange={(e) => setInput(e.target.value)}
// // // // //           handleSendMessage={handleSendMessage}
// // // // //           messagesEndRef={messagesEndRef}
// // // // //           onClose={() => setIsOpen(false)}
// // // // //         />
// // // // //       ) : (
// // // // //         <ChatIcon onClick={() => setIsOpen(true)} />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { v4 as uuidv4 } from 'uuid';
// // // // import dynamic from 'next/dynamic';
// // // // import { getOrCreateChatSession, sendMessage, createNewChatSession } from '@/actions/chatActions';
// // // // import { motion } from 'framer-motion';

// // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Input } from '@/components/ui/input';
// // // // import { ScrollArea } from '@/components/ui/scroll-area';
// // // // import { Separator } from '@/components/ui/separator';
// // // // import { Send, Bot, User, X, RotateCw } from 'lucide-react';

// // // // import ChatIcon from './ChatIcon';
// // // // import SuggestionList from './SuggestionList';
// // // // import SuggestionCards from './SuggestionCard';


// // // // const MapDisplay = dynamic(() => import('./MapDisplay'), { ssr: false });

// // // // const parseMessageContent = (rawContent) => {
// // // //     const suggestionRegex = /\[SUGGESTIONS\]({.*})\[\/SUGGESTIONS\]/;
// // // //     const mapRegex = /\[MAP\]({.*})\[\/MAP\]/;
    
// // // //     let text = rawContent;
// // // //     let suggestions = null;
// // // //     let mapData = null;

// // // //     const suggestionMatch = text.match(suggestionRegex);
// // // //     if (suggestionMatch && suggestionMatch[1]) {
// // // //         try {
// // // //             suggestions = JSON.parse(suggestionMatch[1]);
// // // //             text = text.replace(suggestionRegex, '').trim();
// // // //         } catch (e) { console.error("Failed to parse suggestions JSON:", e); }
// // // //     }

// // // //     const mapMatch = text.match(mapRegex);
// // // //     if (mapMatch && mapMatch[1]) {
// // // //         try {
// // // //             mapData = JSON.parse(mapMatch[1]);
// // // //             text = text.replace(mapRegex, '').trim();
// // // //         } catch(e) { console.error("Failed to parse map JSON:", e); }
// // // //     }
    
// // // //     return { text, suggestions, mapData };
// // // // };

// // // // export default function Chatbot() {
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [session, setSession] = useState(null);
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [input, setInput] = useState('');
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [activeSuggestions, setActiveSuggestions] = useState(null);
// // // //   const messagesEndRef = useRef(null);

// // // //   const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
// // // //   useEffect(() => { if (isOpen) { setTimeout(scrollToBottom, 100); } }, [messages, isOpen, isLoading]);

// // // //   const welcomeMessage = { id: uuidv4(), role: 'model', content: parseMessageContent("Namaskar! 🙏 Welcome to Pandhari Mitra. How can I assist you? [SUGGESTIONS]{\"type\":\"cards\",\"options\":[{\"title\":\"Plan a Trip\",\"description\":\"Create a custom itinerary.\",\"value\":\"Plan a trip for me\",\"icon\":\"Map\"},{\"title\":\"Darshan Timings\",\"description\":\"Get live temple timings.\",\"value\":\"What are the darshan timings?\",\"icon\":\"Clock\"}]}") };

// // // //   useEffect(() => {
// // // //     const initializeChat = async () => {
// // // //       let guestId = localStorage.getItem('chatGuestId');
// // // //       if (!guestId) {
// // // //         guestId = uuidv4();
// // // //         localStorage.setItem('chatGuestId', guestId);
// // // //       }
// // // //       const response = await getOrCreateChatSession(guestId);
// // // //       if (response.success && response.messages.length > 0) {
// // // //         setSession(response.session);
// // // //         const parsedMessages = response.messages.map(msg => ({ ...msg, content: parseMessageContent(msg.content) }));
// // // //         setMessages(parsedMessages);
// // // //         const lastMsg = parsedMessages[parsedMessages.length - 1];
// // // //         if (lastMsg.role === 'model' && lastMsg.content.suggestions) {
// // // //           setActiveSuggestions(lastMsg.content.suggestions);
// // // //         }
// // // //       } else if(response.success) {
// // // //         setSession(response.session);
// // // //         setMessages([welcomeMessage]);
// // // //         setActiveSuggestions(welcomeMessage.content.suggestions);
// // // //       }
// // // //     };
// // // //     initializeChat();
// // // //   }, []);

// // // //   const handleSendMessage = async (messageContent) => {
// // // //     if (!messageContent.trim() || !session || isLoading) return;

// // // //     setActiveSuggestions(null);
// // // //     const userMessage = { id: uuidv4(), role: 'user', content: { text: messageContent }, createdAt: new Date() };
// // // //     setMessages(currentMessages => [...currentMessages, userMessage]);
// // // //     setInput('');
// // // //     setIsLoading(true);

// // // //     const response = await sendMessage(session.id, messageContent);
// // // //     if (response.success) {
// // // //       const parsedContent = parseMessageContent(response.aiMessage.content);
// // // //       const aiMessage = { ...response.aiMessage, content: parsedContent };
// // // //       setMessages(currentMessages => [...currentMessages, aiMessage]);
// // // //       if (parsedContent.suggestions) {
// // // //         setActiveSuggestions(parsedContent.suggestions);
// // // //       }
// // // //     } else {
// // // //         const errorMessage = { id: uuidv4(), role: 'model', content: { text: "My apologies, I seem to be having some trouble. Please try again." }};
// // // //         setMessages(currentMessages => [...currentMessages, errorMessage]);
// // // //     }
// // // //     setIsLoading(false);
// // // //   };

// // // //   const handleFormSubmit = (e) => { e.preventDefault(); handleSendMessage(input); };
// // // //   const handleSuggestionClick = (value) => { handleSendMessage(value); };

// // // //   const handleNewChat = async () => {
// // // //     setIsLoading(true);
// // // //     setActiveSuggestions(null);
// // // //     let guestId = localStorage.getItem('chatGuestId');
// // // //     const response = await createNewChatSession(guestId);
// // // //     if (response.success) {
// // // //       setSession(response.session);
// // // //       setMessages([welcomeMessage]);
// // // //       setActiveSuggestions(welcomeMessage.content.suggestions);
// // // //     } else {
// // // //       console.error("Failed to create new chat session");
// // // //     }
// // // //     setIsLoading(false);
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <div className="fixed bottom-5 right-5 z-50">
// // // //         <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(true)} />
// // // //       </div>
// // // //       <Dialog open={isOpen} onOpenChange={setIsOpen}>
// // // //         <DialogContent className="sm:max-w-md flex flex-col h-[700px] max-h-[90vh] p-0 overflow-hidden animated-gradient-background">
// // // //           <DialogHeader className="p-4 border-b bg-white/80 backdrop-blur-sm">
// // // //             <div className="flex items-center justify-between">
// // // //                 <div className="flex items-center gap-3">
// // // //                 <div className="p-2 bg-orange-100 rounded-full"><Bot className="h-6 w-6 text-orange-700" /></div>
// // // //                 <div>
// // // //                     <DialogTitle className="text-lg font-bold text-orange-900">Pandhari Mitra 🙏</DialogTitle>
// // // //                     <p className="text-xs text-orange-800">Your divine guide to Pandharpur</p>
// // // //                 </div>
// // // //                 </div>
// // // //                 <div className="flex items-center">
// // // //                     <Button variant="ghost" size="icon" onClick={handleNewChat} disabled={isLoading} aria-label="New Chat"><RotateCw className="h-5 w-5" /></Button>
// // // //                     <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></Button>
// // // //                 </div>
// // // //             </div>
// // // //           </DialogHeader>
// // // //           <ScrollArea className="flex-1 p-4">
// // // //             <div className="flex flex-col gap-4">
// // // //               {messages.map((msg) => (
// // // //                 <div key={msg.id} className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// // // //                   {msg.role === 'model' && <Bot className="h-6 w-6 text-orange-700 flex-shrink-0 mt-1" />}
// // // //                   <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
// // // //                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
// // // //                           className={`p-3 rounded-lg text-sm leading-relaxed shadow-md ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-none border border-gray-200'}`}>
// // // //                           {msg.content.text}
// // // //                           {msg.content.mapData && (<MapDisplay center={msg.content.mapData.center} zoom={msg.content.mapData.zoom} locations={msg.content.mapData.locations} />)}
// // // //                       </motion.div>
// // // //                       {msg.id === messages[messages.length - 1].id && msg.role === 'model' && activeSuggestions && (
// // // //                         <div className="mt-2 w-full">
// // // //                           {activeSuggestions.type === 'cards' && <SuggestionCards options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
// // // //                           {activeSuggestions.type === 'list' && <SuggestionList options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
// // // //                         </div>
// // // //                       )}
// // // //                   </div>
// // // //                   {msg.role === 'user' && <User className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />}
// // // //                 </div>
// // // //               ))}
// // // //               {isLoading && (
// // // //                  <div className="flex justify-start gap-3 items-center">
// // // //                   <Bot className="h-6 w-6 text-orange-700 flex-shrink-0" />
// // // //                   <motion.div className="max-w-[75%] p-3 rounded-lg text-sm bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200 shadow-sm">
// // // //                     <div className="flex items-center justify-center gap-1">
// // // //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
// // // //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
// // // //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
// // // //                     </div>
// // // //                   </motion.div>
// // // //                 </div>
// // // //               )}
// // // //               <div ref={messagesEndRef} />
// // // //             </div>
// // // //           </ScrollArea>
// // // //           <Separator />
// // // //           <DialogFooter className="p-3 bg-white/80 backdrop-blur-sm">
// // // //             <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
// // // //               <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading}/>
// // // //               <Button type="submit" size="icon" disabled={isLoading}><Send className="h-5 w-5" /></Button>
// // // //             </form>
// // // //           </DialogFooter>
// // // //         </DialogContent>
// // // //       </Dialog>
// // // //     </>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { v4 as uuidv4 } from 'uuid';
// // // import dynamic from 'next/dynamic';
// // // import { getOrCreateChatSession, sendMessage, createNewChatSession } from '@/actions/chatActions';
// // // import { motion } from 'framer-motion';

// // // // Shadcn UI Components & Icons
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { ScrollArea } from '@/components/ui/scroll-area';
// // // import { Separator } from '@/components/ui/separator';
// // // import { Send, Bot, User, X, RotateCw } from 'lucide-react';

// // // // Custom Chatbot Components
// // // import ChatIcon from './ChatIcon';
// // // import SuggestionCards from './SuggestionCard';
// // // import SuggestionList from './SuggestionList';


// // // // Dynamically import the MapDisplay to avoid SSR issues
// // // const MapDisplay = dynamic(() => import('./MapDisplay'), { ssr: false });

// // // const parseMessageContent = (rawContent) => {
// // //     const suggestionRegex = /\[SUGGESTIONS\]({.*})\[\/SUGGESTIONS\]/;
// // //     const mapRegex = /\[MAP\]({.*})\[\/MAP\]/;
    
// // //     let text = rawContent || ""; // Ensure rawContent is not null/undefined
// // //     let suggestions = null;
// // //     let mapData = null;

// // //     const suggestionMatch = text.match(suggestionRegex);
// // //     if (suggestionMatch && suggestionMatch[1]) {
// // //         try {
// // //             suggestions = JSON.parse(suggestionMatch[1]);
// // //             text = text.replace(suggestionRegex, '').trim();
// // //         } catch (e) { console.error("Failed to parse suggestions JSON:", e); }
// // //     }

// // //     const mapMatch = text.match(mapRegex);
// // //     if (mapMatch && mapMatch[1]) {
// // //         try {
// // //             mapData = JSON.parse(mapMatch[1]);
// // //             text = text.replace(mapRegex, '').trim();
// // //         } catch(e) { console.error("Failed to parse map JSON:", e); }
// // //     }
    
// // //     return { text, suggestions, mapData };
// // // };


// // // export default function Chatbot() {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [session, setSession] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [activeSuggestions, setActiveSuggestions] = useState(null);
// // //   const messagesEndRef = useRef(null);

// // //   const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
// // //   useEffect(() => { if (isOpen) { setTimeout(scrollToBottom, 100); } }, [messages, isOpen, isLoading]);

// // //   const welcomeMessage = { id: uuidv4(), role: 'model', content: parseMessageContent("Namaskar! 🙏 Welcome to Pandhari Mitra. How can I assist you? [SUGGESTIONS]{\"type\":\"cards\",\"options\":[{\"title\":\"Plan a Trip\",\"description\":\"Create a custom itinerary.\",\"value\":\"Plan a trip for me\",\"icon\":\"Map\"},{\"title\":\"Darshan Timings\",\"description\":\"Get live temple timings.\",\"value\":\"What are the darshan timings?\",\"icon\":\"Clock\"}]}") };

// // //   useEffect(() => {
// // //     const initializeChat = async () => {
// // //       setIsLoading(true);
// // //       let guestId = localStorage.getItem('chatGuestId');
// // //       if (!guestId) {
// // //         guestId = uuidv4();
// // //         localStorage.setItem('chatGuestId', guestId);
// // //       }
// // //       const response = await getOrCreateChatSession(guestId);
// // //       if (response.success && response.messages.length > 0) {
// // //         setSession(response.session);
// // //         const parsedMessages = response.messages.map(msg => ({ ...msg, content: parseMessageContent(msg.content) }));
// // //         setMessages(parsedMessages);
// // //         const lastMsg = parsedMessages[parsedMessages.length - 1];
// // //         if (lastMsg.role === 'model' && lastMsg.content.suggestions) {
// // //           setActiveSuggestions(lastMsg.content.suggestions);
// // //         }
// // //       } else if(response.success) {
// // //         setSession(response.session);
// // //         setMessages([welcomeMessage]);
// // //         setActiveSuggestions(welcomeMessage.content.suggestions);
// // //       }
// // //       setIsLoading(false);
// // //     };
// // //     initializeChat();
// // //   }, []);

// // //   const handleSendMessage = async (messageContent) => {
// // //     if (!messageContent.trim() || !session || isLoading) return;

// // //     setActiveSuggestions(null);
// // //     const userMessage = { id: uuidv4(), role: 'user', content: { text: messageContent }, createdAt: new Date() };
// // //     setMessages(currentMessages => [...currentMessages, userMessage]);
// // //     setInput('');
// // //     setIsLoading(true);

// // //     const response = await sendMessage(session.id, messageContent);
// // //     if (response.success) {
// // //       const parsedContent = parseMessageContent(response.aiMessage.content);
// // //       const aiMessage = { ...response.aiMessage, content: parsedContent };
// // //       setMessages(currentMessages => [...currentMessages, aiMessage]);
// // //       if (parsedContent.suggestions) {
// // //         setActiveSuggestions(parsedContent.suggestions);
// // //       }
// // //     } else {
// // //         const errorMessage = { id: uuidv4(), role: 'model', content: { text: "My apologies, I seem to be having some trouble. Please try again." }};
// // //         setMessages(currentMessages => [...currentMessages, errorMessage]);
// // //     }
// // //     setIsLoading(false);
// // //   };

// // //   const handleFormSubmit = (e) => { e.preventDefault(); handleSendMessage(input); };
  
// // //   const handleSuggestionClick = (value) => {
// // //     handleSendMessage(value);
// // //   };

// // //   const handleNewChat = async () => {
// // //     setIsLoading(true);
// // //     setActiveSuggestions(null);
// // //     let guestId = localStorage.getItem('chatGuestId');
// // //     const response = await createNewChatSession(guestId);
// // //     if (response.success) {
// // //       setSession(response.session);
// // //       setMessages([welcomeMessage]);
// // //       setActiveSuggestions(welcomeMessage.content.suggestions);
// // //     } else {
// // //       console.error("Failed to create new chat session");
// // //     }
// // //     setIsLoading(false);
// // //   };

// // //   return (
// // //     <>
// // //       <div className="fixed bottom-5 right-5 z-50">
// // //         <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(true)} />
// // //       </div>
// // //       {/* FIX: Removed animated-gradient-background class for a clean white UI */}
// // //       <Dialog open={isOpen} onOpenChange={setIsOpen}>
// // //         <DialogContent className="sm:max-w-md flex flex-col h-[700px] max-h-[90vh] p-0 overflow-hidden bg-white">
// // //           <DialogHeader className="p-4 border-b">
// // //             <div className="flex items-center justify-between">
// // //                 <div className="flex items-center gap-3">
// // //                 <div className="p-2 bg-orange-100 rounded-full"><Bot className="h-6 w-6 text-orange-700" /></div>
// // //                 <div>
// // //                     <DialogTitle className="text-lg font-bold text-gray-900">Pandhari Mitra 🙏</DialogTitle>
// // //                     <p className="text-xs text-gray-600">Your divine guide to Pandharpur</p>
// // //                 </div>
// // //                 </div>
// // //                 <div className="flex items-center">
// // //                     {/* FEATURE: "New Chat" button is here and fully functional */}
// // //                     <Button variant="ghost" size="icon" onClick={handleNewChat} disabled={isLoading} aria-label="New Chat">
// // //                         <RotateCw className="h-5 w-5 text-gray-500 hover:text-gray-800" />
// // //                     </Button>
// // //                     <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
// // //                         <X className="h-5 w-5 text-gray-500 hover:text-gray-800" />
// // //                     </Button>
// // //                 </div>
// // //             </div>
// // //           </DialogHeader>

// // //           {/* FIX: Correct flex layout ensures proper scrolling */}
// // //           <ScrollArea className="flex-1 p-4">
// // //             <div className="flex flex-col gap-4">
// // //               {messages.map((msg) => (
// // //                 <div key={msg.id} className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// // //                   {msg.role === 'model' && <Bot className="h-6 w-6 text-orange-700 flex-shrink-0 mt-1" />}
// // //                   <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
// // //                       <motion.div
// // //                           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
// // //                           className={`p-3 rounded-lg text-sm leading-relaxed shadow-md ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none border'}`}
// // //                       >
// // //                           {msg.content.text}
// // //                           {msg.content.mapData && (<MapDisplay center={msg.content.mapData.center} zoom={msg.content.mapData.zoom} locations={msg.content.mapData.locations} />)}
// // //                       </motion.div>
// // //                       {msg.id === messages[messages.length - 1].id && msg.role === 'model' && activeSuggestions && (
// // //                         <div className="mt-2 w-full">
// // //                           {activeSuggestions.type === 'cards' && <SuggestionCards options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
// // //                           {activeSuggestions.type === 'list' && <SuggestionList options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
// // //                         </div>
// // //                       )}
// // //                   </div>
// // //                   {msg.role === 'user' && <User className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />}
// // //                 </div>
// // //               ))}
// // //               {isLoading && (
// // //                  <div className="flex justify-start gap-3 items-center">
// // //                   <Bot className="h-6 w-6 text-orange-700 flex-shrink-0" />
// // //                   <motion.div className="p-3 rounded-lg bg-gray-100 border">
// // //                     <div className="flex items-center justify-center gap-1.5">
// // //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
// // //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
// // //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
// // //                     </div>
// // //                   </motion.div>
// // //                 </div>
// // //               )}
// // //               <div ref={messagesEndRef} />
// // //             </div>
// // //           </ScrollArea>
          
// // //           <Separator />
// // //           <DialogFooter className="p-3 bg-white">
// // //             <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
// // //               <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading}/>
// // //               <Button type="submit" size="icon" disabled={isLoading}><Send className="h-5 w-5" /></Button>
// // //             </form>
// // //           </DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>
// // //     </>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { v4 as uuidv4 } from 'uuid';
// // import dynamic from 'next/dynamic';
// // import { getOrCreateChatSession, sendMessage, createNewChatSession } from '@/actions/chatActions';
// // import { motion } from 'framer-motion';

// // // Shadcn UI Components & Icons
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Separator } from '@/components/ui/separator';
// // import { Send, Bot, User, X, RotateCw } from 'lucide-react';

// // // Custom Chatbot Components
// // import ChatIcon from './ChatIcon';
// // import SuggestionCards from './SuggestionCard';
// // import SuggestionList from './SuggestionList';


// // // Dynamically import the MapDisplay to avoid SSR issues
// // const MapDisplay = dynamic(() => import('./MapDisplay'), { ssr: false });

// // const parseMessageContent = (rawContent) => {
// //     const suggestionRegex = /\[SUGGESTIONS\]({.*})\[\/SUGGESTIONS\]/;
// //     const mapRegex = /\[MAP\]({.*})\[\/MAP\]/;
    
// //     let text = rawContent || "";
// //     let suggestions = null;
// //     let mapData = null;

// //     const suggestionMatch = text.match(suggestionRegex);
// //     if (suggestionMatch && suggestionMatch[1]) {
// //         try {
// //             suggestions = JSON.parse(suggestionMatch[1]);
// //             text = text.replace(suggestionRegex, '').trim();
// //         } catch (e) { console.error("Failed to parse suggestions JSON:", e); }
// //     }

// //     const mapMatch = text.match(mapRegex);
// //     if (mapMatch && mapMatch[1]) {
// //         try {
// //             mapData = JSON.parse(mapMatch[1]);
// //             text = text.replace(mapRegex, '').trim();
// //         } catch(e) { console.error("Failed to parse map JSON:", e); }
// //     }
    
// //     return { text, suggestions, mapData };
// // };


// // export default function Chatbot() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [session, setSession] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [activeSuggestions, setActiveSuggestions] = useState(null);
// //   const scrollAreaRef = useRef(null);

// //   // Updated useEffect for scrolling
// //   useEffect(() => {
// //     if (scrollAreaRef.current) {
// //       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
// //     }
// //   }, [messages, isLoading]);

// //   const welcomeMessage = { id: uuidv4(), role: 'model', content: parseMessageContent("Namaskar! 🙏 Welcome to Pandhari Mitra. How can I assist you? [SUGGESTIONS]{\"type\":\"cards\",\"options\":[{\"title\":\"Plan a Trip\",\"description\":\"Create a custom itinerary.\",\"value\":\"Plan a trip for me\",\"icon\":\"Map\"},{\"title\":\"Darshan Timings\",\"description\":\"Get live temple timings.\",\"value\":\"What are the darshan timings?\",\"icon\":\"Clock\"}]}") };

// //   useEffect(() => {
// //     const initializeChat = async () => {
// //       setIsLoading(true);
// //       let guestId = localStorage.getItem('chatGuestId');
// //       if (!guestId) {
// //         guestId = uuidv4();
// //         localStorage.setItem('chatGuestId', guestId);
// //       }
// //       const response = await getOrCreateChatSession(guestId);
// //       if (response.success && response.messages.length > 0) {
// //         setSession(response.session);
// //         const parsedMessages = response.messages.map(msg => ({ ...msg, content: parseMessageContent(msg.content) }));
// //         setMessages(parsedMessages);
// //         const lastMsg = parsedMessages[parsedMessages.length - 1];
// //         if (lastMsg.role === 'model' && lastMsg.content.suggestions) {
// //           setActiveSuggestions(lastMsg.content.suggestions);
// //         }
// //       } else if(response.success) {
// //         setSession(response.session);
// //         setMessages([welcomeMessage]);
// //         setActiveSuggestions(welcomeMessage.content.suggestions);
// //       }
// //       setIsLoading(false);
// //     };
// //     initializeChat();
// //   }, []);

// //   const handleSendMessage = async (messageContent) => {
// //     if (!messageContent.trim() || !session || isLoading) return;

// //     setActiveSuggestions(null);
// //     const userMessage = { id: uuidv4(), role: 'user', content: { text: messageContent }, createdAt: new Date() };
// //     setMessages(currentMessages => [...currentMessages, userMessage]);
// //     setInput('');
// //     setIsLoading(true);

// //     const response = await sendMessage(session.id, messageContent);
// //     if (response.success) {
// //       const parsedContent = parseMessageContent(response.aiMessage.content);
// //       const aiMessage = { ...response.aiMessage, content: parsedContent };
// //       setMessages(currentMessages => [...currentMessages, aiMessage]);
// //       if (parsedContent.suggestions) {
// //         setActiveSuggestions(parsedContent.suggestions);
// //       }
// //     } else {
// //         const errorMessage = { id: uuidv4(), role: 'model', content: { text: "My apologies, I seem to be having some trouble. Please try again." }};
// //         setMessages(currentMessages => [...currentMessages, errorMessage]);
// //     }
// //     setIsLoading(false);
// //   };

// //   const handleFormSubmit = (e) => { e.preventDefault(); handleSendMessage(input); };
  
// //   const handleSuggestionClick = (value) => {
// //     handleSendMessage(value);
// //   };

// //   const handleNewChat = async () => {
// //     setIsLoading(true);
// //     setActiveSuggestions(null);
// //     let guestId = localStorage.getItem('chatGuestId');
// //     const response = await createNewChatSession(guestId);
// //     if (response.success) {
// //       setSession(response.session);
// //       setMessages([welcomeMessage]);
// //       setActiveSuggestions(welcomeMessage.content.suggestions);
// //     } else {
// //       console.error("Failed to create new chat session");
// //     }
// //     setIsLoading(false);
// //   };

// //   return (
// //     <>
// //       <div className="fixed bottom-5 right-5 z-50">
// //         <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(true)} />
// //       </div>
// //       <Dialog open={isOpen} onOpenChange={setIsOpen}>
// //         <DialogContent className="sm:max-w-md flex flex-col h-[700px] max-h-[90vh] p-0 overflow-hidden bg-white">
// //           <DialogHeader className="p-4 border-b">
// //             <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                 <div className="p-2 bg-orange-100 rounded-full"><Bot className="h-6 w-6 text-orange-700" /></div>
// //                 <div>
// //                     <DialogTitle className="text-lg font-bold text-gray-900">Pandhari Mitra 🙏</DialogTitle>
// //                     <p className="text-xs text-gray-600">Your divine guide to Pandharpur</p>
// //                 </div>
// //                 </div>
// //                 <div className="flex items-center">
// //                     <Button variant="ghost" size="icon" onClick={handleNewChat} disabled={isLoading} aria-label="New Chat">
// //                         <RotateCw className="h-5 w-5 text-gray-500 hover:text-gray-800" />
// //                     </Button>
// //                     <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
// //                         <X className="h-5 w-5 text-gray-500 hover:text-gray-800" />
// //                     </Button>
// //                 </div>
// //             </div>
// //           </DialogHeader>

// //           {/* FIX 1: This message area is now directly scrollable for reliability. */}
// //           <div ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto">
// //             <div className="flex flex-col gap-4">
// //               {messages.map((msg, index) => (
// //                 <div key={msg.id}>
// //                     <div className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// //                         {msg.role === 'model' && <Bot className="h-6 w-6 text-orange-700 flex-shrink-0 mt-1" />}
// //                         <motion.div
// //                             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
// //                             className={`p-3 rounded-lg text-sm leading-relaxed shadow-md max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none border'}`}
// //                         >
// //                             {msg.content.text}
// //                             {msg.content.mapData && (<MapDisplay center={msg.content.mapData.center} zoom={msg.content.mapData.zoom} locations={msg.content.mapData.locations} />)}
// //                         </motion.div>
// //                         {msg.role === 'user' && <User className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />}
// //                     </div>

// //                     {/* FIX 2: Suggestion rendering is now OUTSIDE and AFTER the message bubble. */}
// //                     {index === messages.length - 1 && msg.role === 'model' && activeSuggestions && (
// //                         <div className="mt-3">
// //                             {activeSuggestions.type === 'cards' && <SuggestionCards options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
// //                             {activeSuggestions.type === 'list' && <SuggestionList options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
// //                         </div>
// //                     )}
// //                 </div>
// //               ))}
// //               {isLoading && (
// //                  <div className="flex justify-start gap-3 items-center">
// //                   <Bot className="h-6 w-6 text-orange-700 flex-shrink-0" />
// //                   <motion.div className="p-3 rounded-lg bg-gray-100 border">
// //                     <div className="flex items-center justify-center gap-1.5">
// //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
// //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
// //                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
// //                     </div>
// //                   </motion.div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
          
// //           <Separator />
// //           <DialogFooter className="p-3 bg-white">
// //             <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
// //               <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading}/>
// //               <Button type="submit" size="icon" disabled={isLoading}><Send className="h-5 w-5" /></Button>
// //             </form>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import dynamic from 'next/dynamic';
// import { getOrCreateChatSession, sendMessage, createNewChatSession } from '@/actions/chatActions';
// import { motion } from 'framer-motion';

// // Shadcn UI Components & Icons
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import { Send, Bot, User, X, RotateCw } from 'lucide-react';

// // Custom Chatbot Components
// import ChatIcon from './ChatIcon';
// import SuggestionCards from './SuggestionCards';
// import SuggestionList from './SuggestionList';

// // Dynamically import the MapDisplay to avoid SSR issues
// const MapDisplay = dynamic(() => import('./MapDisplay'), { ssr: false });

// // This helper function is key. It separates the clean text from the special [SUGGESTIONS] block.
// const parseMessageContent = (rawContent) => {
//     const suggestionRegex = /\[SUGGESTIONS\]({.*})\[\/SUGGESTIONS\]/;
//     const mapRegex = /\[MAP\]({.*})\[\/MAP\]/;
    
//     let text = rawContent || "";
//     let suggestions = null;
//     let mapData = null;

//     const suggestionMatch = text.match(suggestionRegex);
//     if (suggestionMatch && suggestionMatch[1]) {
//         try {
//             suggestions = JSON.parse(suggestionMatch[1]);
//             text = text.replace(suggestionRegex, '').trim();
//         } catch (e) { console.error("Failed to parse suggestions JSON:", e); }
//     }

//     const mapMatch = text.match(mapRegex);
//     if (mapMatch && mapMatch[1]) {
//         try {
//             mapData = JSON.parse(mapMatch[1]);
//             text = text.replace(mapRegex, '').trim();
//         } catch(e) { console.error("Failed to parse map JSON:", e); }
//     }
    
//     return { text, suggestions, mapData };
// };


// export default function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [session, setSession] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeSuggestions, setActiveSuggestions] = useState(null);
//   const scrollAreaRef = useRef(null);

//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
//     }
//   }, [messages, isLoading]);

//   // The welcomeMessage constant is now correctly parsed before being used.
//   const welcomeMessage = { id: uuidv4(), role: 'model', content: parseMessageContent("Namaskar! 🙏 Welcome to Pandhari Mitra. How can I assist you? [SUGGESTIONS]{\"type\":\"cards\",\"options\":[{\"title\":\"Plan a Trip\",\"description\":\"Create a custom itinerary.\",\"value\":\"Plan a trip for me\",\"icon\":\"Map\"},{\"title\":\"Darshan Timings\",\"description\":\"Get live temple timings.\",\"value\":\"What are the darshan timings?\",\"icon\":\"Clock\"}]}") };

//   useEffect(() => {
//     const initializeChat = async () => {
//       setIsLoading(true);
//       let guestId = localStorage.getItem('chatGuestId');
//       if (!guestId) {
//         guestId = uuidv4();
//         localStorage.setItem('chatGuestId', guestId);
//       }
//       const response = await getOrCreateChatSession(guestId);
//       if (response.success && response.messages && response.messages.length > 0) {
//         setSession(response.session);
//         const parsedMessages = response.messages.map(msg => ({ ...msg, content: parseMessageContent(msg.content) }));
//         setMessages(parsedMessages);
//         const lastMsg = parsedMessages[parsedMessages.length - 1];
//         if (lastMsg.role === 'model' && lastMsg.content.suggestions) {
//           setActiveSuggestions(lastMsg.content.suggestions);
//         }
//       } else if(response.success) {
//         setSession(response.session);
//         setMessages([welcomeMessage]);
//         setActiveSuggestions(welcomeMessage.content.suggestions);
//       }
//       setIsLoading(false);
//     };
//     initializeChat();
//   }, []);

//   const handleSendMessage = async (messageContent) => {
//     if (!messageContent.trim() || !session || isLoading) return;

//     setActiveSuggestions(null);
//     const userMessage = { id: uuidv4(), role: 'user', content: { text: messageContent }, createdAt: new Date() };
//     setMessages(currentMessages => [...currentMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     const response = await sendMessage(session.id, messageContent);
//     if (response.success) {
//       const parsedContent = parseMessageContent(response.aiMessage.content);
//       const aiMessage = { ...response.aiMessage, content: parsedContent };
//       setMessages(currentMessages => [...currentMessages, aiMessage]);
//       if (parsedContent.suggestions) {
//         setActiveSuggestions(parsedContent.suggestions);
//       }
//     } else {
//         const errorMessage = { id: uuidv4(), role: 'model', content: { text: "My apologies, I seem to be having some trouble. Please try again." }};
//         setMessages(currentMessages => [...currentMessages, errorMessage]);
//     }
//     setIsLoading(false);
//   };

//   const handleFormSubmit = (e) => { e.preventDefault(); handleSendMessage(input); };
  
//   const handleSuggestionClick = (value) => {
//     handleSendMessage(value);
//   };

//   const handleNewChat = async () => {
//     setIsLoading(true);
//     setActiveSuggestions(null);
//     let guestId = localStorage.getItem('chatGuestId');
//     const response = await createNewChatSession(guestId);
//     if (response.success) {
//       setSession(response.session);
//       setMessages([welcomeMessage]);
//       setActiveSuggestions(welcomeMessage.content.suggestions);
//     } else {
//       console.error("Failed to create new chat session");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <>
//       <div className="fixed bottom-5 right-5 z-50">
//         <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(true)} />
//       </div>
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="sm:max-w-md flex flex-col h-[700px] max-h-[90vh] p-0 overflow-hidden bg-white">
//           <DialogHeader className="p-4 border-b">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                 <div className="p-2 bg-orange-100 rounded-full"><Bot className="h-6 w-6 text-orange-700" /></div>
//                 <div>
//                     <DialogTitle className="text-lg font-bold text-gray-900">Pandhari Mitra 🙏</DialogTitle>
//                     <p className="text-xs text-gray-600">Your divine guide to Pandharpur</p>
//                 </div>
//                 </div>
//                 <div className="flex items-center">
//                     <Button variant="ghost" size="icon" onClick={handleNewChat} disabled={isLoading} aria-label="New Chat">
//                         <RotateCw className="h-5 w-5 text-gray-500 hover:text-gray-800" />
//                     </Button>
//                     <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
//                         <X className="h-5 w-5 text-gray-500 hover:text-gray-800" />
//                     </Button>
//                 </div>
//             </div>
//           </DialogHeader>

//           <div ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto">
//             <div className="flex flex-col gap-4">
//               {messages.map((msg, index) => (
//                 <div key={msg.id}>
//                     <div className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                         {msg.role === 'model' && <Bot className="h-6 w-6 text-orange-700 flex-shrink-0 mt-1" />}
//                         <motion.div
//                             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
//                             className={`p-3 rounded-lg text-sm leading-relaxed shadow-md max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none border'}`}
//                         >
//                             {/* This now only displays the clean text, as intended */}
//                             {msg.content.text} 
//                             {msg.content.mapData && (<MapDisplay center={msg.content.mapData.center} zoom={msg.content.mapData.zoom} locations={msg.content.mapData.locations} />)}
//                         </motion.div>
//                         {msg.role === 'user' && <User className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />}
//                     </div>

//                     {index === messages.length - 1 && msg.role === 'model' && activeSuggestions && (
//                         <div className="mt-3">
//                             {activeSuggestions.type === 'cards' && <SuggestionCards options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
//                             {activeSuggestions.type === 'list' && <SuggestionList options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
//                         </div>
//                     )}
//                 </div>
//               ))}
//               {isLoading && (
//                  <div className="flex justify-start gap-3 items-center">
//                   <Bot className="h-6 w-6 text-orange-700 flex-shrink-0" />
//                   <motion.div className="p-3 rounded-lg bg-gray-100 border">
//                     <div className="flex items-center justify-center gap-1.5">
//                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
//                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
//                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
//                     </div>
//                   </motion.div>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <Separator />
//           <DialogFooter className="p-3 bg-white">
//             <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
//               <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading}/>
//               <Button type="submit" size="icon" disabled={isLoading}><Send className="h-5 w-5" /></Button>
//             </form>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
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
import SuggestionCards from './SuggestionCards';
import SuggestionList from './SuggestionList';

// Dynamically import the MapDisplay to avoid SSR issues
const MapDisplay = dynamic(() => import('./MapDisplay'), { ssr: false });

// This helper function is key. It separates the clean text from the special [SUGGESTIONS] block.
const parseMessageContent = (rawContent) => {
    const suggestionRegex = /\[SUGGESTIONS\]({.*})\[\/SUGGESTIONS\]/;
    const mapRegex = /\[MAP\]({.*})\[\/MAP\]/;
    
    let text = rawContent || "";
    let suggestions = null;
    let mapData = null;

    const suggestionMatch = text.match(suggestionRegex);
    if (suggestionMatch && suggestionMatch[1]) {
        try {
            suggestions = JSON.parse(suggestionMatch[1]);
            text = text.replace(suggestionRegex, '').trim();
        } catch (e) { console.error("Failed to parse suggestions JSON:", e); }
    }

    const mapMatch = text.match(mapRegex);
    if (mapMatch && mapMatch[1]) {
        try {
            mapData = JSON.parse(mapMatch[1]);
            text = text.replace(mapRegex, '').trim();
        } catch(e) { console.error("Failed to parse map JSON:", e); }
    }
    
    return { text, suggestions, mapData };
};


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const welcomeMessage = { id: uuidv4(), role: 'model', content: parseMessageContent("Namaskar! 🙏 Welcome to Pandhari Mitra. How can I assist you? [SUGGESTIONS]{\"type\":\"cards\",\"options\":[{\"title\":\"Plan a Trip\",\"description\":\"Create a custom itinerary.\",\"value\":\"Plan a trip for me\",\"icon\":\"Map\"},{\"title\":\"Darshan Timings\",\"description\":\"Get live temple timings.\",\"value\":\"What are the darshan timings?\",\"icon\":\"Clock\"}]}") };

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      let guestId = localStorage.getItem('chatGuestId');
      if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem('chatGuestId', guestId);
      }
      const response = await getOrCreateChatSession(guestId);
      if (response.success && response.messages && response.messages.length > 0) {
        setSession(response.session);
        // Ensure messages from DB are also parsed
        const parsedMessages = response.messages.map(msg => ({ ...msg, content: parseMessageContent(msg.content) }));
        setMessages(parsedMessages);
        const lastMsg = parsedMessages[parsedMessages.length - 1];
        if (lastMsg.role === 'model' && lastMsg.content.suggestions) {
          setActiveSuggestions(lastMsg.content.suggestions);
        }
      } else if(response.success) {
        setSession(response.session);
        setMessages([welcomeMessage]);
        setActiveSuggestions(welcomeMessage.content.suggestions);
      }
      setIsLoading(false);
    };
    initializeChat();
  }, []);

  const handleSendMessage = async (messageContent) => {
    if (!messageContent.trim() || !session || isLoading) return;

    setActiveSuggestions(null);
    const userMessage = { id: uuidv4(), role: 'user', content: { text: messageContent }, createdAt: new Date() };
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessage(session.id, messageContent);
    
    if (response.success) {
      // THIS IS THE CRITICAL FIX: The raw response is parsed here.
      const parsedContent = parseMessageContent(response.aiMessage.content);
      const aiMessage = { ...response.aiMessage, content: parsedContent };
      
      setMessages(currentMessages => [...currentMessages, aiMessage]);
      
      if (parsedContent.suggestions) {
        setActiveSuggestions(parsedContent.suggestions);
      }
    } else {
        const errorMessage = { id: uuidv4(), role: 'model', content: { text: "My apologies, I seem to be having some trouble. Please try again." }};
        setMessages(currentMessages => [...currentMessages, errorMessage]);
    }
    setIsLoading(false);
  };

  const handleFormSubmit = (e) => { e.preventDefault(); handleSendMessage(input); };
  
  const handleSuggestionClick = (value) => {
    handleSendMessage(value);
  };

  const handleNewChat = async () => {
    setIsLoading(true);
    setActiveSuggestions(null);
    let guestId = localStorage.getItem('chatGuestId');
    const response = await createNewChatSession(guestId);
    if (response.success) {
      setSession(response.session);
      setMessages([welcomeMessage]);
      setActiveSuggestions(welcomeMessage.content.suggestions);
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
                    <p className="text-xs text-gray-600">Your divine guide to Pandharpur</p>
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

          <div ref={scrollAreaRef} className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div key={msg.id}>
                    <div className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <Bot className="h-6 w-6 text-orange-700 flex-shrink-0 mt-1" />}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                            className={`p-3 rounded-lg text-sm leading-relaxed shadow-md max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none border'}`}
                        >
                            {/* This now correctly displays ONLY the clean text from the parsed object */}
                            {msg.content.text} 
                            {msg.content.mapData && (<MapDisplay center={msg.content.mapData.center} zoom={msg.content.mapData.zoom} locations={msg.content.mapData.locations} />)}
                        </motion.div>
                        {msg.role === 'user' && <User className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />}
                    </div>

                    {/* This logic correctly renders suggestions AFTER the bubble, but only for the last message */}
                    {index === messages.length - 1 && msg.role === 'model' && activeSuggestions && (
                        <div className="mt-3">
                            {activeSuggestions.type === 'cards' && <SuggestionCards options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
                            {activeSuggestions.type === 'list' && <SuggestionList options={activeSuggestions.options} onSelect={handleSuggestionClick} />}
                        </div>
                    )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start gap-3 items-center">
                  <Bot className="h-6 w-6 text-orange-700 flex-shrink-0" />
                  <motion.div className="p-3 rounded-lg bg-gray-100 border">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          <DialogFooter className="p-3 bg-white">
            <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading}/>
              <Button type="submit" size="icon" disabled={isLoading}><Send className="h-5 w-5" /></Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}