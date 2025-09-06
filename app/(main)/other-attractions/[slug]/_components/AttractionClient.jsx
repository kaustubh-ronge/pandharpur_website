"use client";

import { PortableText } from '@portabletext/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, ArrowLeft, Navigation, Calendar } from 'lucide-react';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import GoogleMap from './GoogleMap';

/**
 * This is the main Client Component.
 * It receives the attraction data as a prop from the server component
 * and handles rendering all the UI and interactive elements.
 */
export default function AttractionClient({ attraction }) {
  // Combine the main image and the gallery images for the carousel
  // We use "|| []" to prevent errors if the gallery is empty
  const carouselImages = [
    { imageUrl: attraction.mainImageUrl, alt: attraction.mainImageAlt, caption: "Main View" },
    ...(attraction.gallery || []).map(img => ({
        imageUrl: img.imageUrl,
        alt: img.alt,
        caption: img.caption,
    })),
  ];

  // Safely get the Google Maps URL
  const googleMapsUrl = attraction.location?.googleMapsUrl;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-amber-700 hover:text-amber-800 hover:bg-amber-100">
            <Link href="/other-attractions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Attractions
            </Link>
          </Button>
        </div>

        {/* --- HEADER --- */}
        <header className="text-center mb-12">
          {attraction.category && (
            <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 px-4 py-1">
              {attraction.category}
            </Badge>
          )}
          <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl font-serif">
            {attraction.title}
          </h1>
        </header>

        {/* --- MAIN LAYOUT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* --- LEFT COLUMN: MAIN IMAGE --- */}
          <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={attraction.mainImageUrl}
              alt={attraction.mainImageAlt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* --- RIGHT COLUMN: SLIDER & MAP --- */}
          <div className="flex flex-col gap-8 h-[600px]">
             <div className="flex-1 h-1/2 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageCarousel images={carouselImages} />
             </div>
             <div className="flex-1 h-1/2 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <GoogleMap url={googleMapsUrl} title={attraction.title} />
             </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {attraction.distance && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-amber-100 p-3 mr-4">
                  <MapPin className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-amber-600">Distance from Temple</p>
                  <p className="text-lg font-semibold text-amber-800">{attraction.distance}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {attraction.bestTimeToVisit && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Calendar className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Best Time to Visit</p>
                  <p className="text-lg font-semibold text-blue-800">{attraction.bestTimeToVisit}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {attraction.visitDuration && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <Clock className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Recommended Duration</p>
                  <p className="text-lg font-semibold text-green-800">{attraction.visitDuration}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="my-8 bg-amber-200" />

        {/* --- DESCRIPTION SECTION --- */}
        {attraction.description && (
          <div className="mt-10 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-serif">
              About This Sacred Place
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 prose-headings:font-serif prose-headings:text-amber-800 prose-strong:text-amber-700 prose-a:text-amber-600 hover:prose-a:text-amber-700 prose-blockquote:border-amber-300 prose-blockquote:bg-amber-50">
              <PortableText value={attraction.description} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
