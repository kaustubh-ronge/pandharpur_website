
"use client";

import Image from "next/image";
import Link from "next/link"; // ADDED: Link component for navigation
import { MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { getAllTemplesQuery } from "@/sanity/lib/queries"; // CORRECT: Importing the query

// Static data from the old UI, as requested
const sliderImages = [
    "/mandirpandharpur.jpg",
    "/pandharpurmandir2.webp",
    "/pandharpurtemple1.jpg",
];

const faqs = [
    {
        question: "What are the most prominent temples to visit in Pandharpur?",
        answer: "The main temple is Shri Vitthal Rukmini Mandir. Other significant sites include Pundalik Mandir, ISKCON Pandharpur, Shri Gajanan Maharaj Math, and Vishnupad Temple.",
    },
    {
        question: "What are the typical visiting hours for these temples?",
        answer: "Most temples are open from early morning (around 5:00 AM) to late evening (around 9:00 PM), but timings can vary, especially on festival days. It's always best to check locally for the most accurate times.",
    },
    {
        question: "What are the most important festivals in Pandharpur?",
        answer: "Ashadhi Ekadashi (usually in July) and Kartiki Ekadashi (usually in November) are the most celebrated festivals. Millions of devotees, called Varkaris, undertake a pilgrimage on foot (the Wari) to Pandharpur during these times.",
    },
    {
        question: "Is there an entry fee to visit the temples?",
        answer: "No, entry into the main temples is free of charge for all devotees. However, donations are welcome and help with the temple's upkeep.",
    },
    {
        question: "How do I reach Pandharpur?",
        answer: "Pandharpur is well-connected by road to major cities in Maharashtra like Pune, Mumbai, and Solapur. The town also has a railway station. The nearest major city with better rail and air connectivity is Solapur, about 75 km away.",
    },
];

// The main component, now fetching dynamic temple data
export default function TemplePage() {
    const [openIndex, setOpenIndex] = useState(null);
    const [temples, setTemples] = useState([]);

    useEffect(() => {
        const fetchTemples = async () => {
            // CORRECT: Using the imported query from queries.js
            const data = await client.fetch(getAllTemplesQuery);
            setTemples(data);
        };

        fetchTemples();
    }, []);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white">
            {/* Hero Section (Static Content from Old UI) */}
            <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-8 bg-gradient-to-t from-orange-100 via-white to-orange-50">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div className="absolute top-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-30" animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
                    <motion.div className="absolute bottom-20 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-20" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 5 }} />
                    <motion.div className="absolute top-20 left-60 w-32 h-32 bg-orange-400 rounded-full opacity-25" animate={{ y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 7 }} />
                </div>
                <div className="md:w-1/2 text-left z-10">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Shri Vitthal Rukmini Mandir</h1>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
                        <h2 className="text-lg text-orange-600 font-semibold mb-3">
                            The heart of Pandharpur's spiritual life.
                        </h2>
                        <div className="text-gray-700 mb-4">
                            The Vitthal-Rukmini Temple, located in Pandharpur, Maharashtra, is a prominent Hindu pilgrimage site dedicated to Lord Vitthal (a form of Lord Krishna) and his consort Rukmini.
                        </div>
                    </motion.div>
                </div>
                <div className="md:w-1/2 z-10">
                    <Carousel className="w-full max-w-lg mx-auto" opts={{ loop: true }}>
                        <CarouselContent>
                            {sliderImages.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card className="overflow-hidden">
                                            <CardContent className="flex aspect-video items-center justify-center p-0">
                                                <Image
                                                    src={image}
                                                    alt={`Temple image ${index + 1}`}
                                                    width={600}
                                                    height={500}
                                                    className="object-cover w-full h-full"
                                                    priority={index === 0}
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
                    </Carousel>
                </div>
            </section>

            {/* Dynamic Temple List Section */}
            <section className="py-16 text-center px-6 md:px-16 bg-white overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-3xl text-orange-600 font-bold mb-2 text-center">Temples in Pandharpur</h2>
                        <div className="text-gray-600 mb-10 text-center">
                            Discover more iconic temples and spiritual landmarks across Pandharpur in a meaningful and immersive way.
                        </div>
                    </motion.div>
                    <div className="space-y-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
                            {temples.map((temple, idx) => (
                                // WRAPPED: The entire card is now a clickable Link
                                <Link href={`/information-page/temples/${temple.slug}`} key={temple._id} className="block group">
                                    <div
                                        className={`flex flex-col md:flex-row items-center mb-16 bg-gray-50 shadow-lg rounded-xl overflow-hidden transition duration-300 group-hover:shadow-2xl cursor-pointer ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        <div className="md:w-1/3 w-full">
                                            <Image
                                                src={temple.image}
                                                alt={temple.name}
                                                width={400}
                                                height={300}
                                                className="w-full h-64 md:h-full object-cover"
                                            />
                                        </div>
                                        <div className="md:w-2/3 w-full p-6 md:p-8 text-left">
                                            <h2 className="text-2xl font-bold text-orange-600">{temple.name}</h2>
                                            <p className="font-semibold text-gray-700 mt-1 mb-3">Main Deity: {temple.presidingDeity}</p>
                                            <div className="text-gray-700 leading-relaxed mb-4">{temple.description}</div>

                                            <div className="flex items-center text-gray-700">
                                                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                                                {/* Note: The approved query does not fetch 'address'. Add it to getAllTemplesQuery if you need dynamic addresses here. */}
                                                <span>Pandharpur, Maharashtra</span>
                                            </div>

                                            {/* ADDED: A "View Details" button for a clear call to action */}
                                            <div className="mt-5">
                                                <div className="inline-flex items-center gap-2 font-semibold text-orange-600 transition-all duration-300 group-hover:text-orange-700">
                                                    View Details
                                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Static FAQ Section */}
            <section className="relative md:px-12 bg-orange-50 px-6 py-20 overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
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
                                    <div className="px-6 pb-4 text-gray-700 bg-white border-t border-gray-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
