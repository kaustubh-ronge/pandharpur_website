
import { client } from "@/sanity/lib/client";
import { getAllHotelsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Star, Award, MapPin, ExternalLink, ArrowRight, BedDouble } from "lucide-react";

// --- NEW UI Components (Redesigned from scratch within this file) ---

function PageHeader({ title, subtitle }) {
  // Redesigned Header: More spacing, elegant serif font for the title, and a decorative element.
  return (
    <div className="text-center mb-16 md:mb-20">
      <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 tracking-tight text-slate-800">
        {title}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-slate-500">
        {subtitle}
      </p>
      {/* Decorative line to add a touch of class */}
      <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full" />
    </div>
  );
}

function HotelCard({ hotel }) {
  // Redesigned Hotel Card: Modern aesthetics, better spacing, clear hierarchy, and aligned buttons.
  // We use the "group" utility from Tailwind for the image hover effect.
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-300/30 overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-slate-400/30 hover:-translate-y-2">
      
      {/* --- Image Section --- */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={hotel.image || 'https://placehold.co/600x400/orange/white?text=Hotel'}
          alt={`Image of ${hotel.name}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* A subtle gradient overlay to make the badge pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {hotel.isFeatured && (
          // Redesigned "Featured" Badge: Looks more premium.
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Award className="h-4 w-4" />
            <span>FEATURED STAY</span>
          </div>
        )}
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">{hotel.category || 'Hotel'}</p>
            {hotel.rating && (
              // Redesigned Rating Badge: Cleaner look.
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300/70 text-sm font-bold">
                <span>{hotel.rating}</span>
                <Star className="h-4 w-4 text-amber-500 fill-current" />
              </div>
            )}
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">{hotel.name}</h3>
          
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{hotel.address}</span>
          </div>
          
          <p className="text-slate-600 text-base leading-relaxed line-clamp-3">{hotel.description}</p>
        </div>

        {/* --- Footer with Aligned Buttons --- */}
        {/* "mt-auto" is key for aligning buttons at the bottom of the card */}
        <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
          {/* Secondary Button Style: Outline */}
          <Link href={`/information-page/hotels/${hotel.slug}`} className="col-span-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white transition-colors">
              Details <ArrowRight className="h-4 w-4" />
            </button>
          </Link>

          {/* Primary Button Style: Solid Color */}
          {hotel.website ? (
            <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="col-span-1">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                Book Now <ExternalLink className="h-4 w-4" />
              </button>
            </a>
          ) : (
             <div className="col-span-1"></div> // Keeps the grid consistent
          )}
        </div>
      </div>
    </div>
  );
}


// --- Main Page Component ---

export default async function HotelsPage() {
  // THIS CORE LOGIC IS UNCHANGED
  const hotels = await client.fetch(getAllHotelsQuery);

  return (
    // New page background: A soft, two-tone gradient instead of a flat color.
    <div className="bg-slate-50 min-h-screen">
       <div className="bg-gradient-to-b from-orange-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <PageHeader
            title="Accommodations in Pandharpur"
            subtitle="Find the perfect place to stay, from deluxe hotels to budget-friendly lodges, for a comfortable and blessed pilgrimage."
          />
          
          {hotels && hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          ) : (
            // Redesigned "No hotels found" state: More informative and visually appealing.
            <div className="text-center mt-16 text-slate-600 bg-white border border-slate-200 rounded-2xl p-12 max-w-lg mx-auto">
              <BedDouble className="mx-auto h-16 w-16 text-slate-400 mb-4" />
              <h3 className="text-2xl font-semibold font-serif text-slate-800">No Accommodations Found</h3>
              <p className="mt-3 text-slate-500">We couldn't find any available places to stay at the moment. Please check back again soon as we are constantly updating our listings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}