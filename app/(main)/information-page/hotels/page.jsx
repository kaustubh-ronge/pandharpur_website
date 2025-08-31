import { client } from "@/sanity/lib/client";
import { getAllHotelsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Star, Award } from "lucide-react";

// --- UI Components (Defined in this file as requested) ---

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}

function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-52">
        <Image
          src={hotel.image || 'https://placehold.co/600x400/orange/white?text=Hotel'}
          alt={`Image of ${hotel.name}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {hotel.isFeatured && (
          <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Award className="h-4 w-4" />
            <span>FEATURED</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div>
            <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-1">{hotel.category || 'Hotel'}</p>
                {hotel.rating && (
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-gray-700">{hotel.rating}</span>
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                    </div>
                )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
            <p className="text-gray-500 text-sm mb-3">{hotel.address}</p>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{hotel.description}</p>
        </div>
        <div className="mt-auto pt-4 grid grid-cols-2 gap-3">
          <Link href={`/information-page/hotels/${hotel.slug}`} className="col-span-2 sm:col-span-1">
            <button className="w-full text-center px-4 py-2 rounded-lg font-semibold text-sm bg-gray-800 text-white hover:bg-gray-900 transition-colors">
              View Details
            </button>
          </Link>

          {hotel.website ? (
            <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="col-span-2 sm:col-span-1">
              <button className="w-full text-center px-4 py-2 rounded-lg font-semibold text-sm bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                Book Now
              </button>
            </a>
          ) : (
             <div className="col-span-2 sm:col-span-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}


// --- Main Page Component ---

export default async function HotelsPage() {
  const hotels = await client.fetch(getAllHotelsQuery);

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <PageHeader
                title="Accommodations in Pandharpur"
                subtitle="Find the perfect place to stay, from deluxe hotels to budget-friendly lodges, for a comfortable and blessed pilgrimage."
            />
            
            {hotels && hotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-10">No hotels found at the moment. Please check back later.</p>
            )}
        </div>
    </div>
  );
}