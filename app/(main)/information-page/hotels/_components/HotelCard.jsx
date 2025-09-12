
"use client";

import Image from "next/image";
import { Star, Award, MapPin, ExternalLink, ShieldCheck, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa"; 
import { DialogTrigger } from "@/components/ui/dialog";
import { InquiryDrawer } from "@/components/InquiryDrawer";
import { useRouter } from "next/navigation";
import { logDetailsView } from "@/actions/leadActions"; // <-- Add this

// SubscriptionBadge component
const SubscriptionBadge = ({ plan }) => {
  if (plan === "premium") {
    return (
      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-yellow-500/30 w-fit">
        <Gem className="h-4 w-4" />
        <span>PREMIUM</span>
      </div>
    );
  }
  if (plan === "standard") {
    return (
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md shadow-blue-500/20 w-fit">
        <ShieldCheck className="h-4 w-4" />
        <span>STANDARD</span>
      </div>
    );
  }
  if (plan === "basic") {
    return (
      <div className="bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
        <span>BASIC</span>
      </div>
    );
  }
  return null;
};

// HotelCard component
export default function HotelCard({ hotel }) {
  const router = useRouter();

  const handleDetailsClick = async () => {
    try {
      await logDetailsView(hotel.slug); // ✅ log to DB
    } catch (err) {
      console.error("Failed to log details view:", err);
    }
    router.push(`/information-page/hotels/${hotel.slug}`); // ✅ then navigate
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-300/30 overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-slate-400/30 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={hotel.image || "https://placehold.co/600x400/orange/white?text=Hotel"}
          alt={`Image of ${hotel.name}`}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {hotel.isFeatured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
            <Award className="h-4 w-4" />
            <span>FEATURED STAY</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
              {hotel.category || "Hotel"}
            </p>
            {hotel.rating && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300/70 text-sm font-bold flex-shrink-0">
                <span>{hotel.rating}</span>
                <Star className="h-4 w-4 text-amber-500 fill-current" />
              </div>
            )}
          </div>

          {/* Subscription Badge */}
          <div className="my-3">
            <SubscriptionBadge plan={hotel.subscriptionPlan} />
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">{hotel.name}</h3>

          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{hotel.address}</span>
          </div>

          <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
            {hotel.description}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
          {/* ✅ Fixed Details Button */}
          <Button
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-2 text-base font-semibold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={handleDetailsClick}
          >
            <ExternalLink className="h-4 w-4" />
            Details
          </Button>

          {/* WhatsApp Button or Booking Unavailable */}
          {hotel.whatsappNumber ? (
            <InquiryDrawer type="hotel" data={hotel}>
              <DialogTrigger asChild>
                <Button className="w-full h-12 flex items-center justify-center gap-2 text-base font-semibold bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-lg shadow-green-500/30">
                  <FaWhatsapp className="h-5 w-5" />
                  Inquire
                </Button>
              </DialogTrigger>
            </InquiryDrawer>
          ) : (
            <Button
              disabled
              variant="outline"
              className="w-full h-12 flex items-center justify-center gap-2 text-base font-semibold border-gray-300 text-gray-500 cursor-not-allowed transition-all duration-300 bg-gray-100"
            >
              Booking Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
