"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { MapPin, Phone, ChevronRight, ChevronLeft, Gem, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DialogTrigger } from "@/components/ui/dialog";
import { InquiryDrawer } from "@/components/InquiryForms/InquiryDrawer";
import { FaWhatsapp } from "react-icons/fa";

// Reusable components from hotel page can be used here or redefined if customization is needed
function AnimatedSection({ children, className = "" }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className={className}
        >
            {children}
        </motion.section>
    );
}

const SubscriptionBadgeHeader = ({ plan }) => {
    if (plan === 'premium') {
        return (
            <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-none rounded-full">
                <Gem className="h-5 w-5" /> PREMIUM LISTING
            </Badge>
        );
    }
    if (plan === 'standard') {
        return (
            <Badge className="text-base font-bold gap-1.5 py-1.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none rounded-full">
                <ShieldCheck className="h-5 w-5" /> STANDARD LISTING
            </Badge>
        );
    }
    return null;
};

function Breadcrumbs({ kirtankarName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-stone-500 mb-6">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/pandharpur-bookings/kirtankars" className="hover:text-orange-600">Kirtankars</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-stone-700 font-semibold">{kirtankarName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], kirtankarName }) {
    const validImages = images?.filter(Boolean) || [];
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = useCallback((index) => setCurrentSlide(index), []);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    const nextSlide = () => setCurrentSlide((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));

    if (validImages.length === 0) return null;

    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-md">
            <div className="flex h-full transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {validImages.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full relative">
                        <Image src={img} alt={`Gallery image ${idx + 1} of ${kirtankarName}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                ))}
            </div>
            {validImages.length > 1 && (
                <>
                    <button onClick={prevSlide} className="absolute top-1/2 left-3 -translate-y-1/2 z-10 p-2 bg-orange-500/80 text-white rounded-full"><ChevronLeft className="h-6 w-6" /></button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-3 -translate-y-1/2 z-10 p-2 bg-orange-500/80 text-white rounded-full"><ChevronRight className="h-6 w-6" /></button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {validImages.map((_, idx) => <button key={idx} onClick={() => goToSlide(idx)} className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-orange-500' : 'bg-white/80'}`} />)}
                    </div>
                </>
            )}
        </div>
    );
}

export default function KirtankarPageClient({ kirtankar }) {
    if (!kirtankar) return <div>Kirtankar not found.</div>;

    return (
        <div className="min-h-screen mt-[70px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <AnimatedSection>
                    <header>
                        <Breadcrumbs kirtankarName={kirtankar.name} />
                        <div className="mt-4">
                            <h1 className="text-4xl sm:text-6xl font-bold text-stone-900">{kirtankar.name}</h1>
                            <div className="mt-4 flex items-center flex-wrap gap-x-6 gap-y-3 text-stone-600">
                                <SubscriptionBadgeHeader plan={kirtankar.subscriptionPlan} />
                                <Badge variant="outline" className="text-stone-600 border-stone-400 rounded-full">{kirtankar.specialization}</Badge>
                                <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-stone-500" /> {kirtankar.hometown}</p>
                            </div>
                        </div>
                    </header>
                </AnimatedSection>

                {/* Main Image, Gallery, and Map Section */}
                <AnimatedSection className="my-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 h-[300px] md:h-[400px] lg:h-[500px]">
                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
                            <Image src={kirtankar.image} alt={`Main image of ${kirtankar.name}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                        </div>
                        <div className="w-full h-full">
                            <GallerySlider images={kirtankar.gallery} kirtankarName={kirtankar.name} />
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md border border-stone-200">
                        {kirtankar.googleMapsEmbedUrl ? (
                            <iframe src={kirtankar.googleMapsEmbedUrl} width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                        ) : (
                            <div className="bg-stone-100 h-96 w-full flex flex-col items-center justify-center text-stone-400">
                                <MapPin className="h-12 w-12 mb-4 opacity-50" /> <p>Map not available</p>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* Big WhatsApp Inquiry Button */}
                <AnimatedSection className="mt-6 mb-12">
                    {kirtankar.whatsappNumber ? (
                        <InquiryDrawer type="kirtankar" data={kirtankar}>
                            <DialogTrigger asChild>
                                <Button size="lg" className="w-full text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl py-4 h-auto">
                                    <FaWhatsapp className="h-6 w-6 mr-3" /> Inquire Now on WhatsApp
                                </Button>
                            </DialogTrigger>
                        </InquiryDrawer>
                    ) : (
                        <Button disabled size="lg" className="w-full text-lg font-bold cursor-not-allowed">Inquiry Unavailable</Button>
                    )}
                </AnimatedSection>

                {/* Detailed Info Section */}
                <AnimatedSection>
                    <div className="prose prose-stone max-w-none text-lg leading-relaxed bg-white p-8 rounded-xl border border-stone-200 shadow-md">
                        <h2 className="text-3xl font-bold">About {kirtankar.name}</h2>
                        {kirtankar.detailedDescription ? <PortableText value={kirtankar.detailedDescription} /> : <p>No detailed information available.</p>}
                        {(kirtankar.contactNumbers && kirtankar.contactNumbers.length > 0) &&
                            <div className="mt-6 not-prose">
                                <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                                <p className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-orange-500" />
                                    <a href={`tel:${kirtankar.contactNumbers[0]}`} className="font-medium hover:underline">{kirtankar.contactNumbers.join(' / ')}</a>
                                </p>
                            </div>
                        }
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}