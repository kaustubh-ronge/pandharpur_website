import { client } from "@/sanity/lib/client";
import { getBhaktaniwasBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { MapPin, Phone, CheckCircle, Clock, Users, Globe } from "lucide-react";

// --- UI Components ---

function RichTextContent({ content }) {
  if (!content) return null;
  return (
    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
      <PortableText value={content} />
    </div>
  );
}

function Gallery({ mainImage, galleryImages = [], name }) {
    const images = [mainImage, ...galleryImages].filter(Boolean);
    if (images.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
            <div className="col-span-2 row-span-2 relative min-h-[300px] md:min-h-[450px] rounded-xl overflow-hidden shadow-lg">
                <Image src={images[0]} alt={`Main image of ${name}`} fill style={{ objectFit: 'cover' }} priority />
            </div>
            {images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="relative h-40 md:h-full rounded-xl overflow-hidden shadow-lg">
                    <Image src={img} alt={`Gallery image ${idx + 1} of ${name}`} fill style={{ objectFit: 'cover' }} />
                </div>
            ))}
        </div>
    );
}

function BookingInfo({ type, website }) {
    let info = {
        'online': { text: 'Online Booking Available', color: 'bg-green-100 text-green-800' },
        'offline': { text: 'Offline / On-site Booking Only', color: 'bg-amber-100 text-amber-800' },
        'walk-in': { text: 'First-Come, First-Served', color: 'bg-blue-100 text-blue-800' },
    }[type];

    if (!info) return null;

    return (
        <div className="mt-6 space-y-4">
            <div className={`text-center p-3 rounded-lg font-semibold ${info.color}`}>
                {info.text}
            </div>
            {type === 'online' && website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-3 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                    <Globe className="inline-block mr-2 h-5 w-5" />
                    Visit Booking Website
                </a>
            )}
        </div>
    );
}


// --- Main Page Component ---

export async function generateMetadata({ params }) {
    const item = await client.fetch(getBhaktaniwasBySlugQuery, { slug: params.slug });
    if (!item) return { title: "Bhaktaniwas Not Found" };
    return {
      title: `${item.name} | Pandharpur Bhaktaniwas`,
      description: item.description,
    };
}

export default async function SingleBhaktaniwasPage({ params }) {
  const item = await client.fetch(getBhaktaniwasBySlugQuery, { slug: params.slug });

  if (!item) {
    notFound();
  }

  const googleMapsUrl = item.googleMapsEmbedUrl;

  return (
    <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="mb-8">
                {item.managedBy && <p className="text-lg font-semibold text-orange-600 uppercase tracking-wider mb-1">{item.managedBy}</p>}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{item.name}</h1>
                <p className="mt-3 text-gray-600 flex items-center gap-2"><MapPin className="h-4 w-4" /> {item.address}</p>
            </div>

            <Gallery mainImage={item.image} galleryImages={item.gallery} name={item.name} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">About this Bhaktaniwas</h2>
                    <RichTextContent content={item.detailedDescription} />

                    {item.facilities?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Facilities Provided</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                {item.facilities.map(facility => (
                                    <div key={facility} className="flex items-center gap-2 text-gray-700">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /> <span>{facility}</span>
                                    </div>
                                ))}
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
                            {item.capacity && <p className="flex items-start gap-3"><Users className="h-5 w-5 mt-1 text-gray-400"/> <span><strong>Capacity:</strong> {item.capacity}</span></p>}
                            {item.phoneNumber && <p className="flex items-start gap-3"><Phone className="h-5 w-5 mt-1 text-gray-400"/> {item.phoneNumber}</p>}
                            <p className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-1 text-gray-400"/>{item.address}</p>
                        </div>
                        <BookingInfo type={item.bookingType} website={item.website} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}