'use client';

import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = [
  "Namaskar! How can I help?",
  "Plan your Pandharpur trip!",
  "Ask about Darshan timings!",
  "Find local food!",
  "Your Pandharpur guide."
];

export default function ChatIcon({ onClick, isOpen }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {!isOpen && (
        <AnimatePresence>
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="absolute right-full mr-4 bottom-1/2 translate-y-1/2 bg-white text-gray-800 p-2 px-4 rounded-lg shadow-md border border-gray-200 text-sm whitespace-nowrap hidden md:block"
          >
            {messages[currentMessageIndex]}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-gray-200"></div>
          </motion.div>
        </AnimatePresence>
      )}
      <button
        onClick={onClick}
        className="p-3 text-white bg-orange-600 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ease-in-out relative z-10"
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}