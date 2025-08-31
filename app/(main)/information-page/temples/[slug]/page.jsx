import { client } from "@/sanity/lib/client";
import { getTempleBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { MapPin, Phone, Clock, CalendarDays, Globe } from "lucide-react";

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

// --- Main Page Component ---

export async function generateMetadata({ params }) {
    const temple = await client.fetch(getTempleBySlugQuery, { slug: params.slug });
    if (!temple) return { title: "Temple Not Found" };
    return {
      title: `${temple.name} | Pandharpur Temples`,
      description: temple.description,
    };
}

export default async function SingleTemplePage({ params }) {
  const temple = await client.fetch(getTempleBySlugQuery, { slug: params.slug });

  if (!temple) {
    notFound();
  }

  const googleMapsUrl = temple.googleMapsEmbedUrl;

  return (
    <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="mb-8">
                <p className="text-lg font-semibold text-red-600 uppercase tracking-wider mb-1">Presiding Deity: {temple.presidingDeity}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{temple.name}</h1>
                <p className="mt-3 text-gray-600 flex items-center gap-2"><MapPin className="h-4 w-4" /> {temple.address}</p>
            </div>

            <Gallery mainImage={temple.image} galleryImages={temple.gallery} name={temple.name} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">History & Significance</h2>
                    <RichTextContent content={temple.historyAndSignificance} />

                    {temple.majorFestivals?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Major Festivals</h3>
                            <div className="flex flex-wrap gap-3">
                                {temple.majorFestivals.map(festival => (
                                    <div key={festival} className="flex items-center gap-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-full font-medium">
                                        <CalendarDays className="h-5 w-5 text-red-500 flex-shrink-0" /> <span>{festival}</span>
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
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock className="h-6 w-6 text-orange-500" /> Darshan Timings</h3>
                        <div className="prose prose-sm text-gray-800">
                             <PortableText value={temple.darshanTimings} />
                        </div>
                        <hr className="my-6"/>
                        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            {temple.phoneNumber && <p className="flex items-start gap-3"><Phone className="h-5 w-5 mt-1 text-gray-400"/> {temple.phoneNumber}</p>}
                            {temple.website && <a href={temple.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-blue-600 hover:underline"><Globe className="h-5 w-5 mt-1 text-gray-400"/> Official Website</a>}
                            <p className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-1 text-gray-400"/>{temple.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}