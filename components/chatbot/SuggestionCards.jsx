'use client';

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Map, Clock, Users, Zap, HelpCircle } from 'lucide-react';

const iconComponents = { Map, Clock, Users, Zap, HelpCircle };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SuggestionCards({ options, onSelect }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 mt-2"
    >
      {options.map((option, index) => {
        const IconComponent = iconComponents[option.icon] || HelpCircle;
        return (
          <motion.div key={index} variants={cardVariants}>
            <Card onClick={() => onSelect(option.value)} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardHeader className="p-3 flex flex-row items-center gap-3">
                <IconComponent className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <CardTitle className="text-sm font-semibold">{option.title}</CardTitle>
                  <CardDescription className="text-xs">{option.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}