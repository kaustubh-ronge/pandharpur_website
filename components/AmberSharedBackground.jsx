'use client'

import { motion } from "framer-motion";

/**
 * A shared background component with an amber theme, featuring a subtle gradient 
 * and animated, floating circles. Designed to be used as a decorative background layer.
 */
export function AmberBackground() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none bg-gradient-to-b from-amber-50 to-white h-full">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`absolute ${
            i === 1 ? 'top-1/4 left-1/4 w-32 h-32 bg-amber-200' :
            i === 2 ? 'bottom-1/3 right-1/3 w-28 h-28 bg-amber-300' :
            i === 3 ? 'top-10 right-10 w-24 h-24 bg-amber-200' :
            'bottom-10 left-10 w-20 h-20 bg-amber-100'
          } rounded-full opacity-${
            i === 1 ? 20 :
            i === 2 ? 15 :
            i === 3 ? 25 :
            30
          }`}
          animate={{
            scale: i <= 2 ? [1, 1.15, 1] : undefined,
            y: i > 2 ? [0, i === 3 ? -20 : 20, 0] : undefined
          }}
          transition={{
            repeat: Infinity,
            duration: i === 1 ? 8 : i === 2 ? 7 : i === 3 ? 6 : 9,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
