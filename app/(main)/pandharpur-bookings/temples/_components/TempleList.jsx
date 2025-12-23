"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

/**
 * Temple List Component
 *
 * A client component that receives a list of temples and renders them.
 * It uses framer-motion for scroll-triggered animations.
 * @param {Array} temples - The array of temple objects fetched from the server.
 */
export default function TempleList({ temples }) {
    return (
        <section className="py-16 text-center px-6 md:px-16 bg-white overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl text-orange-600 font-bold mb-2 text-center">Temples in Pandharpur</h2>
                    <div className="text-gray-600 mb-10 text-center">
                        Discover more iconic temples and spiritual landmarks across Pandharpur in a meaningful and immersive way.
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {/* Map over the temples prop passed from the server component */}
                    {temples.map((temple, idx) => (
                        <Link href={`/pandharpur-bookings/temples/${temple.slug}`} key={temple._id} className="block group mb-16">
                            <div
                                className={`flex flex-col md:flex-row items-center bg-gray-50 shadow-lg rounded-xl overflow-hidden transition duration-300 group-hover:shadow-2xl cursor-pointer ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
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
                                        <span>Pandharpur, Maharashtra</span>
                                    </div>

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
        </section>
    );
}