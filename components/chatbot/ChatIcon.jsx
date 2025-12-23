

'use client';

import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const messages = [
  "Click to Chat",
  "Click Me for Guidance",
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
    // Wrapper for initial "pop-in" animation with a more pronounced bounce
    <motion.div
      initial={{ scale: 0, y: 100, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 150, // Make it a bit stiffer for more bounce
        damping: 10,  // Reduce damping for more bounce
        delay: 0.8,   // Slightly faster appearance
        duration: 0.6 
      }}
      className="relative"
    >
      {!isOpen && (
        <AnimatePresence>
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bg-white text-gray-800 p-2 px-4 rounded-lg shadow-md border border-gray-200 text-sm whitespace-nowrap bottom-full mb-3 right-1/2 translate-x-1/2 md:right-full md:mr-4 md:bottom-1/2 md:translate-y-1/2 md:translate-x-0 md:mb-0"
          >
            {messages[currentMessageIndex]}
            {/* Arrow for the speech bubble */}
            <div className="absolute w-3 h-3 bg-white rotate-45 border-r border-b border-gray-200 
                           md:left-full md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:border-t md:border-r md:border-b-0 md:border-l-0 
                           top-full -translate-y-1/2 right-1/2 translate-x-1/2 md:right-auto"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Changed <button> to <motion.button> for animations */}
      <motion.button
        onClick={onClick}
        className="p-3 text-white bg-orange-600 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-orange-500 transition-colors duration-300 ease-in-out relative z-10"
        aria-label="Open chat"
        // Continuous pulsing animation - stronger and slightly faster
        animate={{ 
          scale: [1, 1.15, 1], // Increased scale
          boxShadow: ["0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)", "0 8px 10px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.2)", "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"] // Shadow pulse
        }}
        transition={{ 
          duration: 1.8, // Slightly faster duration
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        // Hover animation for a quick shake
        whileHover={{ rotate: [0, 5, -5, 5, -5, 0], scale: 1.18 }} // Shake and slightly larger on hover
        whileTap={{ scale: 0.9 }} // Visual feedback on tap
      >
        {/* Animated Notification Dot - now a vibrant lime green */}
        <span className="absolute top-0 right-0 block h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75"></span> {/* Changed color here */}
          <span className="relative inline-flex h-3 w-3 rounded-full bg-lime-400"></span> {/* Changed color here */}
        </span>
        
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
}