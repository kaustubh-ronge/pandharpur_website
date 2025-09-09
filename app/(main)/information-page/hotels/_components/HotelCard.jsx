
import Link from "next/link";
import Image from "next/image";
import { Star, Award, MapPin, ExternalLink, ArrowRight, ShieldCheck, Gem } from "lucide-react";

const SubscriptionBadge = ({ plan }) => {
  if (plan === 'premium') {
    return (
      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-yellow-500/30">
        <Gem className="h-4 w-4" />
        <span>PREMIUM</span>
      </div>
    );
  }
  if (plan === 'standard') {
    return (
      <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md shadow-blue-500/20">
        <ShieldCheck className="h-4 w-4" />
        <span>STANDARD</span>
      </div>
    );
  }
  if (plan === 'basic') {
    return (
      <div className="absolute top-4 right-4 bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded-full">
        <span>BASIC</span>
      </div>
    );
  }
  return null;
};

export function HotelCard({ hotel }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-300/30 overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-slate-400/30 hover:-translate-y-2">

      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={hotel.image || 'https://placehold.co/600x400/orange/white?text=Hotel'}
          alt={`Image of ${hotel.name}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {hotel.isFeatured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Award className="h-4 w-4" />
            <span>FEATURED STAY</span>
          </div>
        )}

        {/* This is the line that adds the badge */}
        <SubscriptionBadge plan={hotel.subscriptionPlan} />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">{hotel.category || 'Hotel'}</p>
            {hotel.rating && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300/70 text-sm font-bold">
                <span>{hotel.rating}</span>
                <Star className="h-4 w-4 text-amber-500 fill-current" />
              </div>
            )}
          </div>

          <h3 className=" text-2xl font-bold text-slate-800 mb-2">{hotel.name}</h3>

          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{hotel.address}</span>
          </div>

          <p className="text-slate-600 text-base leading-relaxed line-clamp-3">{hotel.description}</p>
        </div>

        <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
          <Link href={`/information-page/hotels/${hotel.slug}`} className="col-span-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white transition-colors">
              Details <ArrowRight className="h-4 w-4" />
            </button>
          </Link>

          {hotel.website ? (
            <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="col-span-1">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                Book Now <ExternalLink className="h-4 w-4" />
              </button>
            </a>
          ) : (
            <div className="col-span-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}