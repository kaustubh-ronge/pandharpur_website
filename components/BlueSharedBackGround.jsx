'use client'

import { motion } from "framer-motion";

/**
 * A shared background component with a blue theme, featuring a subtle gradient 
 * and animated, floating circles. Designed to be used as a decorative background layer.
 */
export function BlueBackground() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none bg-gradient-to-b from-blue-100 via-blue-50 to-white h-full">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`absolute ${
            i === 1 ? 'top-20 right-1/4 w-32 h-32 bg-blue-200' :
            i === 2 ? 'bottom-1/4 left-1/3 w-24 h-24 bg-sky-200' :
            i === 3 ? 'top-1/3 left-10 w-28 h-28 bg-blue-300' :
            'bottom-10 right-10 w-20 h-20 bg-sky-100'
          } rounded-full opacity-${
            i === 1 ? 20 :
            i === 2 ? 30 :
            i === 3 ? 15 :
            25
          }`}
          animate={{
            y: [0, i % 2 === 0 ? 25 : -25, 0],
            x: [0, i % 2 === 0 ? -20 : 20, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: i === 1 ? 7 : i === 2 ? 9 : i === 3 ? 8 : 10,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
