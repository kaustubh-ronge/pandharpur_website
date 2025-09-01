'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SuggestionList({ options, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <Button variant="outline" size="sm" onClick={() => onSelect(option.value)}>
            {option.title}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}