"use client";

import { motion } from "framer-motion";
import { Target, Users, Star, BadgeCheck } from "lucide-react";
import JoinUsInquiryForm from "@/components/InquiryForms/JoinUsInquiryForm";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const benefits = [
  {
    icon: Target,
    title: "Reach a Wider Audience",
    description: "Connect with thousands of devotees and tourists actively looking for services in Pandharpur.",
  },
  {
    icon: Users,
    title: "Increase Your Bookings",
    description: "Drive direct inquiries and bookings to your business through our targeted platform.",
  },
  {
    icon: Star,
    title: "Enhance Your Visibility",
    description: "Get a featured listing and stand out from the competition with a premium placement.",
  },
];

const JoinUsClientPage = ({ ownerWhatsAppNumber }) => {
  return (
    <motion.div
      className="container mx-auto px-4 py-12 sm:py-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- Page Header --- */}
      <motion.div
        variants={itemVariants}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          Grow Your Business in Pandharpur
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300">
          Partner with PandharpurDarshan.com and connect with a dedicated audience.
          We help local businesses thrive by bringing them closer to their customers.
        </p>
      </motion.div>

      {/* --- Benefits Section --- */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-orange-500 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {benefit.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- Inquiry Form Section --- */}
      <motion.div variants={itemVariants}>
        <JoinUsInquiryForm ownerWhatsAppNumber={ownerWhatsAppNumber} />
      </motion.div>
    </motion.div>
  );
};

export default JoinUsClientPage;