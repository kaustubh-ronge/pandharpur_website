
"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { getHotelBySlugQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Star, MapPin, Phone, Mail, CheckCircle, ExternalLink, ChevronRight, Home, BedDouble, Sparkles, LayoutGrid, List, Wallet } from "lucide-react";

// --- UI Sub-Components ---

function Breadcrumbs({ hotelName }) {
    return (
        <nav className="flex items-center text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <Link href="/information-page/hotels" className="hover:text-orange-600">Hotels</Link>
            <ChevronRight className="h-4 w-4 mx-1.5" />
            <span className="text-slate-700">{hotelName}</span>
        </nav>
    );
}

function GallerySlider({ images = [], hotelName }) {
    // Filter out any empty or invalid image URLs
    const validImages = images?.filter(img => img && typeof img === 'string' && img.trim() !== '') || [];

    if (validImages.length === 0) return <div className="bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 h-full">No gallery images</div>;

    return (
        <div className="relative h-full w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full rounded-2xl">
                {validImages.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full snap-center relative">
                        <Image
                            src={img}
                            alt={`Gallery image ${idx + 1} of ${hotelName}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="50vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ## MODIFIED SECTION IMPLEMENTING YOUR IDEA ##
function HotelOverviewSection({ hotel }) {
    return (
        <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* --- Left Side: Scrollable Description --- */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 h-[28rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">About this Stay</h3>
                    <div className="prose prose-slate max-w-none text-base leading-relaxed">
                        {hotel.detailedDescription ? <PortableText value={hotel.detailedDescription} /> : <p>{hotel.description}</p>}
                    </div>
                </div>

                {/* --- Right Side: THREE Info Cards (Same total height as left side) --- */}
                <div className="h-[28rem] flex flex-col gap-4">
                    {/* Card 1: Top Amenities */}
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles className="h-5 w-5 text-orange-500" /> Top Amenities</h3>
                        <div className="space-y-2">
                            {hotel.facilities?.slice(0, 2).map(facility => ( // Show first 2 amenities
                                <div key={facility} className="flex items-center gap-3 text-slate-700 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" /> <span>{facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Card 2: Accommodation */}
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><BedDouble className="h-5 w-5 text-orange-500" /> Accommodation</h3>
                        <div className="space-y-2">
                            {hotel.roomTypes?.length > 0 && (
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" /> <span>{hotel.roomTypes.length} Room Type(s)</span>
                                </div>
                            )}
                            {hotel.priceRange && (
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <Wallet className="h-4 w-4 text-green-500" /> <span>Starts from {hotel.priceRange.split('-')[0].trim()}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Card 3: Quick Contact */}
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col">
                        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Phone className="h-5 w-5 text-orange-500" /> Quick Contact</h3>
                        <div className="space-y-2">
                            {hotel.phoneNumber && (
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <Phone className="h-4 w-4 text-slate-500" /> <a href={`tel:${hotel.phoneNumber}`} className="hover:text-orange-600">{hotel.phoneNumber}</a>
                                </div>
                            )}
                            {hotel.email && (
                                <div className="flex items-center gap-3 text-slate-700 text-sm">
                                    <Mail className="h-4 w-4 text-slate-500" /> <a href={`mailto:${hotel.email}`} className="hover:text-orange-600 truncate">{hotel.email}</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function HotelInfoTabs({ hotel }) {
    const [activeTab, setActiveTab] = useState('about');
    return (
        <div>
            <div className="border-b border-slate-200">
                <div className="flex items-center gap-8" role="tablist">
                    <button onClick={() => setActiveTab('about')} role="tab" className={`py-3 font-semibold transition-colors ${activeTab === 'about' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-500 hover:text-slate-800'}`}>About</button>
                    {hotel.roomTypes?.length > 0 && <button onClick={() => setActiveTab('rooms')} role="tab" className={`py-3 font-semibold transition-colors ${activeTab === 'rooms' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-500 hover:text-slate-800'}`}>Rooms</button>}
                    {hotel.facilities?.length > 0 && <button onClick={() => setActiveTab('amenities')} role="tab" className={`py-3 font-semibold transition-colors ${activeTab === 'amenities' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-500 hover:text-slate-800'}`}>Amenities</button>}
                </div>
            </div>
            <div className="py-8 min-h-[200px]">
                {activeTab === 'about' && <div className="prose prose-slate max-w-none text-lg leading-relaxed"><PortableText value={hotel.detailedDescription} /></div>}
                {activeTab === 'rooms' && (
                    <div className="space-y-4">
                        {hotel.roomTypes.map((room, i) => (
                            <div key={i} className="p-4 border rounded-xl bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">{room.typeName}</h3>
                                    {room.amenities?.length > 0 && <p className="text-sm text-slate-500 mt-1">{room.amenities.join(' • ')}</p>}
                                </div>
                                {room.price && <p className="text-xl font-bold text-slate-800 mt-2 sm:mt-0">₹{room.price}<span className="text-sm font-medium text-slate-500"> / night</span></p>}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'amenities' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {hotel.facilities.map(facility => (
                            <div key={facility} className="flex items-center gap-3 text-base font-medium">
                                <CheckCircle className="h-5 w-5 text-green-500" /> <span>{facility}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function HotelInfoTable({ hotel }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="border-b-2 border-slate-200 p-4 text-sm font-bold text-slate-800">Feature</th>
                        <th className="border-b-2 border-slate-200 p-4 text-sm font-bold text-slate-800">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {hotel.priceRange && (<tr className="border-b border-slate-100">
                        <td className="p-4 font-semibold text-slate-700">Price Range</td>
                        <td className="p-4 text-slate-600">{hotel.priceRange}</td>
                    </tr>)}
                    {hotel.facilities?.length > 0 && (<tr className="border-b border-slate-100">
                        <td className="p-4 font-semibold text-slate-700">Amenities</td>
                        <td className="p-4 text-slate-600">{hotel.facilities.join(', ')}</td>
                    </tr>)}
                    {hotel.roomTypes?.length > 0 && (<tr className="border-b border-slate-100">
                        <td className="p-4 font-semibold text-slate-700 align-top">Room Types</td>
                        <td className="p-4 text-slate-600">
                            <ul className="list-disc pl-5 space-y-2">
                                {hotel.roomTypes.map((room, i) => <li key={i}><strong>{room.typeName}</strong>{room.price && ` - ₹${room.price}/night`}</li>)}
                            </ul>
                        </td>
                    </tr>)}
                    {hotel.phoneNumber && (<tr className="border-b border-slate-100">
                        <td className="p-4 font-semibold text-slate-700">Phone</td>
                        <td className="p-4 text-slate-600"><a href={`tel:${hotel.phoneNumber}`} className="text-orange-600 hover:underline">{hotel.phoneNumber}</a></td>
                    </tr>)}
                    {hotel.email && (<tr className="border-b border-slate-100">
                        <td className="p-4 font-semibold text-slate-700">Email</td>
                        <td className="p-4 text-slate-600"><a href={`mailto:${hotel.email}`} className="text-orange-600 hover:underline">{hotel.email}</a></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

// --- Main Page Component ---
export default function SingleHotelPage({ params }) {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('tabs');
    const [slug, setSlug] = useState(null);

    // Handle Next.js 15 params as Promise
    useEffect(() => {
        if (params) {
            params.then(resolvedParams => {
                setSlug(resolvedParams.slug);
            }).catch(error => {
                console.error("Failed to resolve params:", error);
                setLoading(false);
            });
        }
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        const fetchHotelData = async () => {
            try {
                const data = await client.fetch(getHotelBySlugQuery, { slug });
                setHotel(data);
            } catch (error) {
                console.error("Failed to fetch hotel data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotelData();
    }, [slug]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!hotel) {
        return <div className="flex items-center justify-center min-h-screen">Hotel not found.</div>
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <header className="mb-10">
                    <Breadcrumbs hotelName={hotel.name} />
                    <div className="mt-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">{hotel.name}</h1>
                        <div className="mt-4 flex items-center flex-wrap gap-x-5 gap-y-2 text-slate-600">
                            {hotel.rating && (
                                <div className="flex items-center gap-1.5 bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full">
                                    <Star className="h-5 w-5 text-amber-500 fill-current" />
                                    <span>{hotel.rating}.0</span>
                                </div>
                            )}
                            <p className="flex items-center gap-2 font-medium"><MapPin className="h-5 w-5 text-slate-400" /> {hotel.address}</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg">
                        <Image src={hotel.image} alt={`Main image of ${hotel.name}`} fill style={{ objectFit: 'cover' }} priority />
                    </div>
                    <div className="h-full w-full flex flex-col gap-6">
                        <div className="flex-1 rounded-2xl overflow-hidden shadow-lg">
                            <GallerySlider images={hotel.gallery} hotelName={hotel.name} />
                        </div>
                        <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                            {hotel.googleMapsEmbedUrl ? (
                                <iframe src={hotel.googleMapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            ) : (
                                <div className="bg-slate-100 h-full w-full flex items-center justify-center text-slate-400">Map not available</div>
                            )}
                        </div>
                    </div>
                </div>

                <HotelOverviewSection hotel={hotel} />

                <div className="mt-16">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                        <h2 className="text-3xl font-bold text-slate-800">Full Details</h2>
                        <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
                            <button onClick={() => setViewMode('tabs')} title="Tab View" className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === 'tabs' ? 'bg-white text-orange-500 shadow' : 'text-slate-500 hover:text-slate-800'}`}>
                                <List className="h-5 w-5" />
                            </button>
                            <button onClick={() => setViewMode('table')} title="Table View" className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === 'table' ? 'bg-white text-orange-500 shadow' : 'text-slate-500 hover:text-slate-800'}`}>
                                <LayoutGrid className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        {viewMode === 'tabs' ? <HotelInfoTabs hotel={hotel} /> : <HotelInfoTable hotel={hotel} />}
                    </div>
                </div>
            </div>
        </div>
    );
}