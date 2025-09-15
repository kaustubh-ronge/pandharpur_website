
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Award, MapPin, ExternalLink, ShieldCheck, Gem, Bus, Train, Car, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { DialogTrigger } from "@/components/ui/dialog";
import { logDetailsView } from "@/actions/leadActions";
import { InquiryDrawer } from "@/components/InquiryForms/InquiryDrawer";

// SubscriptionBadge component to show different subscription plans
const SubscriptionBadge = ({ plan }) => {
  if (plan === 'premium') {
    return (
      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-yellow-500/30 w-fit">
        <Gem className="h-4 w-4" />
        <span>PREMIUM</span>
      </div>
    );
  }
  if (plan === 'standard') {
    return (
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md shadow-blue-500/20 w-fit">
        <ShieldCheck className="h-4 w-4" />
        <span>STANDARD</span>
      </div>
    );
  }
  if (plan === 'basic') {
    return (
      <div className="bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
        <span>BASIC</span>
      </div>
    );
  }
  return null;
};

// Travel type icon component
const TravelTypeIcon = ({ travelType }) => {
  // Use a lowercase, trimmed version for matching
  const type = travelType?.toLowerCase().trim();
  switch (type) {
    case 'bus':
      return <Bus className="h-4 w-4" />;
    case 'train':
      return <Train className="h-4 w-4" />;
    case 'taxi':
      return <Car className="h-4 w-4" />;
    case 'auto-rickshaw':
      return <Car className="h-4 w-4" />;
    default:
      return <Bus className="h-4 w-4" />;
  }
};

// TravelsCard component to display travel information and booking options
export default function TravelsCard({ travel }) {
  const handleDetailsClick = async () => {
    try {
      await logDetailsView(travel.slug, "travel");
    } catch (error) {
      console.error("Failed to log details view:", error);
    }
  };

  // FIX: Handle both old string data and new array data
  const travelTypes = Array.isArray(travel.travelType)
    ? travel.travelType
    : (travel.travelType ? [travel.travelType] : []);

  const formattedTravelTypes = travelTypes.map(type => 
    type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
  ).join(' / ') || 'Travel';


  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-300/30 overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-slate-400/30 hover:-translate-y-2">

      {/* Image Section with hover effect */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={travel.image || 'https://placehold.co/600x400/green/white?text=Travel'}
          alt={`Image of ${travel.name}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {travel.isFeatured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
            <Award className="h-4 w-4" />
            <span>FEATURED HUB</span>
          </div>
        )}
      </div>

      {/* Content Section with travel details */}
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wider flex items-center gap-1.5">
              <TravelTypeIcon travelType={travelTypes[0]} />
              <span>{formattedTravelTypes}</span>
            </p>
            {travel.rating && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300/70 text-sm font-bold flex-shrink-0">
                <span>{travel.rating}</span>
                <Star className="h-4 w-4 text-amber-500 fill-current" />
              </div>
            )}
          </div>

          <div className="my-3">
            <SubscriptionBadge plan={travel.subscriptionPlan} />
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">{travel.name}</h3>

          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{travel.address}</span>
          </div>

          {travel.operatingHours && (
            <div className="flex items-center gap-2 text-slate-600 text-sm mb-3">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">Hours:</span> {travel.operatingHours}
            </div>
          )}

          {travel.keyRoutes && travel.keyRoutes.length > 0 && (
            <div className="text-sm text-slate-600 mb-3">
              <span className="font-semibold">Key Routes:</span> {travel.keyRoutes.slice(0, 2).join(', ')}
              {travel.keyRoutes.length > 2 && ` +${travel.keyRoutes.length - 2} more`}
            </div>
          )}

          <p className="text-slate-600 text-base leading-relaxed line-clamp-3">{travel.description}</p>
        </div>

        {/* Buttons Section with conditional rendering */}
        <div className="mt-auto pt-6 flex gap-3">
          {/* Details button */}
          <Link href={`/information-page/travel/${travel.slug}`} passHref className="flex-1">
            <Button
              variant="outline"
              onClick={handleDetailsClick}
              className="w-full h-12 flex items-center justify-center gap-2 text-base font-bold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ExternalLink className="h-5 w-5" />
              Details
            </Button>
          </Link>

          {/* Conditional booking button */}
          {travel.whatsappNumber ? (
            // Render this if a WhatsApp number is available
            <InquiryDrawer type="travel" data={travel}>
              <DialogTrigger asChild>
                <Button
                  className="flex-1 h-12 flex items-center justify-center gap-2 text-base font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 shadow-xl shadow-green-500/40 hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  WhatsApp Inquiry
                </Button>
              </DialogTrigger>
            </InquiryDrawer>
          ) : (
            // Render this if a WhatsApp number is not available
            <Button
              disabled
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center gap-2 text-base font-bold border-gray-300 text-gray-500 cursor-not-allowed transition-all duration-300 bg-gray-100"
            >
              Booking Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}