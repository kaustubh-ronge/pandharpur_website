'use client'

import { motion } from "framer-motion";

export function SharedBackground() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none bg-gradient-to-t from-orange-100 via-white to-orange-50">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className={`absolute ${i === 1 ? 'top-10 left-10 w-24 h-24 bg-orange-200' :
            i === 2 ? 'bottom-20 right-20 w-20 h-20 bg-orange-300' :
            i === 3 ? 'top-20 left-60 w-32 h-32 bg-orange-400' :
            i === 4 ? 'bottom-40 left-24 w-28 h-28 bg-orange-500' :
            'top-40 right-10 w-36 h-36 bg-orange-600'} rounded-full opacity-${i === 1 ? 30 : i === 2 ? 20 : i === 3 ? 25 : i === 4 ? 15 : 10}`}
          animate={{
            y: i <= 3 ? [0, i === 1 ? 20 : i === 2 ? -20 : 25, 0] : undefined,
            x: i >= 4 ? [0, i === 4 ? 30 : -30, 0] : undefined
          }}
          transition={{
            repeat: Infinity,
            duration: i === 1 ? 6 : i === 2 ? 5 : i === 3 ? 7 : i === 4 ? 6.5 : 8
          }}
        />
      ))}
    </div>
  );
}