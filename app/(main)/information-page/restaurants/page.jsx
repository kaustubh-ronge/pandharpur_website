import { client } from "@/sanity/lib/client";
import { getAllRestaurantsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, Award } from "lucide-react";

// --- UI Components ---

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-block bg-green-100 text-green-700 p-3 rounded-full mb-4">
        <UtensilsCrossed className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}

function RestaurantCard({ restaurant }) {
    const priceMap = {
        'budget': '₹',
        'mid-range': '₹₹',
        'premium': '₹₹₹',
    };
  return (
    <Link href={`/information-page/restaurants/${restaurant.slug}`} className="block group">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative w-full h-52">
          <Image
            src={restaurant.image || 'https://placehold.co/600x400/22C55E/FFFFFF?text=Restaurant'}
            alt={`Image of ${restaurant.name}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {restaurant.isFeatured && (
            <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Award className="h-4 w-4" />
              <span>FEATURED</span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div>
            <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">{restaurant.cuisineType?.replace('-', ' ')}</p>
                {restaurant.priceIndicator && <p className="font-bold text-gray-700">{priceMap[restaurant.priceIndicator]}</p>}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{restaurant.description}</p>
          </div>
          <div className="mt-auto pt-4">
              <div className="inline-flex items-center gap-2 font-semibold text-orange-600 group-hover:underline">
                View Menu & Details
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// --- Main Page Component ---

export default async function RestaurantsPage() {
  const restaurants = await client.fetch(getAllRestaurantsQuery);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Dining in Pandharpur"
          subtitle="From traditional Maharashtrian thalis to quick bites, discover pure vegetarian restaurants for a delicious and sattvic meal."
        />
        
        {restaurants && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((item) => (
              <RestaurantCard key={item._id} restaurant={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No restaurant information found. Please check back later.</p>
        )}
      </div>
    </div>
  );
}