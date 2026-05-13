'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export default function LanguageSelection({ onSelect }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center h-full text-center p-4">
      <motion.h2 variants={itemVariants} className="text-lg font-semibold text-gray-800">
        Welcome to Pandhari Mitra
      </motion.h2>
      <motion.p variants={itemVariants} className="mt-2 text-sm text-gray-600">
        Please select your preferred language.
      </motion.p>
      <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3 w-full max-w-xs">
        <Button onClick={() => onSelect('english')} className="w-full" variant="outline">English</Button>
        <Button onClick={() => onSelect('marathi')} className="w-full" variant="outline">मराठी</Button>
        <Button onClick={() => onSelect('hindi')} className="w-full" variant="outline">हिंदी</Button>
      </motion.div>
    </motion.div>
  );
}