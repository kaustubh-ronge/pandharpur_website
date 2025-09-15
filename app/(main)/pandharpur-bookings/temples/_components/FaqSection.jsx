"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import faqs from "@/data/TemplesPageData/templesFaq"; // Assuming this path is correct

/**
 * FAQ Section Component
 *
 * A client component that displays an interactive accordion for frequently asked questions.
 * It uses the `useState` hook to manage which question is currently open.
 */
export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative md:px-12 bg-orange-50 px-6 py-20 overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
                        Need Help?
                    </Badge>
                    <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
                        🙏 Frequently Asked Questions
                    </h2>
                    <div className="max-w-2xl mx-auto text-gray-600">
                        Find answers to common questions about the Pandharpur Temples.
                    </div>
                </motion.div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium hover:bg-gray-100 focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                <ChevronDown className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                            </button>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-4 text-gray-700 bg-white border-t border-gray-200"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}