import { client } from "@/sanity/lib/client";
import { getHotelBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Star, MapPin, Phone, Mail, CheckCircle, Clock, FileText, Trees } from "lucide-react";

// --- UI Components (Defined in this file as requested) ---

function RichTextContent({ content }) {
  if (!content) return null;
  return (
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      <PortableText value={content} />
    </div>
  );
}

function Gallery({ mainImage, galleryImages = [], hotelName }) {
    const images = [mainImage, ...galleryImages].filter(Boolean);
    if (images.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
            <div className="col-span-2 row-span-2 relative min-h-[300px] md:min-h-[450px] rounded-xl overflow-hidden shadow-lg">
                <Image src={images[0]} alt={`Main image of ${hotelName}`} fill style={{ objectFit: 'cover' }} priority />
            </div>
            {images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="relative h-40 md:h-full rounded-xl overflow-hidden shadow-lg">
                    <Image src={img} alt={`Gallery image ${idx + 1} of ${hotelName}`} fill style={{ objectFit: 'cover' }} />
                </div>
            ))}
        </div>
    );
}

// --- Main Page Component ---

export async function generateMetadata({ params }) {
    const hotel = await client.fetch(getHotelBySlugQuery, { slug: params.slug });
    if (!hotel) return { title: "Hotel Not Found" };
    return {
      title: `${hotel.name} | Pandharpur Hotels`,
      description: hotel.description,
    };
}

export default async function SingleHotelPage({ params }) {
  const hotel = await client.fetch(getHotelBySlugQuery, { slug: params.slug });

  if (!hotel) {
    notFound();
  }

  const googleMapsUrl = hotel.googleMapsEmbedUrl;

  return (
    <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{hotel.name}</h1>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3">
                    {hotel.rating && (
                        <div className="flex items-center gap-1">
                            {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />)}
                            {[...Array(5 - hotel.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-gray-300" />)}
                        </div>
                    )}
                    <p className="text-gray-600 flex items-center gap-2"><MapPin className="h-4 w-4" /> {hotel.address}</p>
                </div>
            </div>

            <Gallery mainImage={hotel.image} galleryImages={hotel.gallery} hotelName={hotel.name} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">About this Hotel</h2>
                    <RichTextContent content={hotel.detailedDescription} />

                    {hotel.facilities?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                {hotel.facilities.map(facility => (
                                    <div key={facility} className="flex items-center gap-2 text-gray-700">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /> <span>{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {hotel.roomTypes?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Room Options</h3>
                            <div className="space-y-4">
                                {hotel.roomTypes.map((room, i) => (
                                    <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg">{room.typeName}</h4>
                                            {room.price && <p className="text-orange-600 font-semibold text-lg">₹{room.price} / night</p>}
                                        </div>
                                        {room.amenities?.length > 0 && <p className="text-sm text-gray-500 mt-1">Includes: {room.amenities.join(', ')}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {hotel.nearbyAttractions?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Nearby Attractions</h3>
                            <div className="flex flex-wrap gap-3">
                                {hotel.nearbyAttractions.map(attraction => (
                                    <div key={attraction} className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                                        <Trees className="h-4 w-4 text-green-600 flex-shrink-0" /> <span>{attraction}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                     {hotel.hotelPolicies && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Hotel Policies</h3>
                            <div className="p-4 border rounded-lg bg-gray-50">
                                <RichTextContent content={hotel.hotelPolicies} />
                            </div>
                        </div>
                    )}

                    {googleMapsUrl && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Location Map</h3>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border shadow-sm">
                                <iframe
                                    src={googleMapsUrl}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg border sticky top-24 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                        <div className="space-y-4 text-gray-800">
                             {hotel.checkInTime && <p className="flex items-start gap-3"><Clock className="h-5 w-5 mt-1 text-gray-400"/> <span><strong>Check-in:</strong> {hotel.checkInTime}</span></p>}
                             {hotel.checkOutTime && <p className="flex items-start gap-3"><Clock className="h-5 w-5 mt-1 text-gray-400"/> <span><strong>Check-out:</strong> {hotel.checkOutTime}</span></p>}
                            {hotel.phoneNumber && <p className="flex items-start gap-3"><Phone className="h-5 w-5 mt-1 text-gray-400"/> {hotel.phoneNumber}</p>}
                            {hotel.email && <p className="flex items-start gap-3"><Mail className="h-5 w-5 mt-1 text-gray-400"/> {hotel.email}</p>}
                        </div>
                        {hotel.website && (
                             <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="block w-full text-center mt-6 px-4 py-3 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                                Visit Website & Book Now
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}