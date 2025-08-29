"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, BookOpen } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4 bg-white text-orange-600">
            Limited Availability
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Sacred Journey 2025</h2>
          <p className="text-xl text-orange-100 mb-8">
            Register now to secure your spot in this transformative spiritual experience.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg shadow-xl">
              Register Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-orange-100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Early bird discounts available</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>Free pilgrimage guide</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;