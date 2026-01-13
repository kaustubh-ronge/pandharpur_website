"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, MapPin, ExternalLink, ShieldCheck, Gem, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { DialogTrigger } from "@/components/ui/dialog";
import { logKirtankarDetailsView } from "@/actions/kirtankarActions";
import { InquiryDrawer } from "@/components/InquiryForms/InquiryDrawer";

const SubscriptionBadge = ({ plan }) => {
    if (plan === 'premium') {
        return (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
                <Gem className="h-4 w-4" /> <span>PREMIUM</span>
            </div>
        );
    }
    if (plan === 'standard') {
        return (
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
                <ShieldCheck className="h-4 w-4" /> <span>STANDARD</span>
            </div>
        );
    }
    return null;
};

export default function KirtankarCard({ kirtankar }) {
    const handleDetailsClick = async () => {
        try {
            await logKirtankarDetailsView(kirtankar.slug);
        } catch (error) {
            // Error logging details view - silently fail
        }
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative w-full h-56 overflow-hidden">
                <Image
                    src={kirtankar.image || 'https://placehold.co/600x400/orange/white?text=Kirtankar'}
                    alt={`Image of ${kirtankar.name}`}
                    fill style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                {kirtankar.isFeatured && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10">
                        <Award className="h-4 w-4" /> <span>FEATURED</span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">{kirtankar.specialization || 'Kirtankar'}</p>
                    </div>
                    <div className="my-3">
                        <SubscriptionBadge plan={kirtankar.subscriptionPlan} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{kirtankar.name}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                        <MapPin className="h-4 w-4 flex-shrink-0" /> <span>{kirtankar.hometown}</span>
                    </div>
                    <p className="text-slate-600 text-base leading-relaxed line-clamp-3">{kirtankar.description}</p>
                </div>
                <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
                    <Link href={`/pandharpur-bookings/kirtankars/${kirtankar.slug}`} passHref className="flex-1">
                        <Button variant="outline" onClick={handleDetailsClick} className="w-full h-12 flex items-center justify-center gap-2 text-base font-bold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                            <ExternalLink className="h-5 w-5" /> Details
                        </Button>
                    </Link>
                    {kirtankar.whatsappNumber ? (
                        <InquiryDrawer type="kirtankar" data={kirtankar}>
                            <DialogTrigger asChild>
                                <Button className="flex-1 h-12 flex items-center justify-center gap-2 text-base font-bold bg-gradient-to-r from-green-500 to-green-600 text-white">
                                    <FaWhatsapp className="h-5 w-5" /> WhatsApp Inquiry
                                </Button>
                            </DialogTrigger>
                        </InquiryDrawer>
                    ) : (
                        <Button disabled variant="outline" className="flex-1 h-12 text-base font-bold cursor-not-allowed">
                            Inquiry Unavailable
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}