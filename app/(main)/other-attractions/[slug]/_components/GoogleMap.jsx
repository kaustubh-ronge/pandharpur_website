"use client";

import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

/**
 * A dedicated component for embedding the Google Map.
 */
export default function GoogleMap({ url, title }) {
  if (!url) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
        <MapPin className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-gray-500">Map not available.</p>
      </div>
    );
  }

  // Create a URL that opens Google Maps with a search for the attraction's title.
  const directionUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}`;

  return (
    <div className="relative h-full w-full">
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
        title={`${title} Google Map`}
      ></iframe>
      <div className="absolute bottom-4 right-4">
        <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 shadow-md">
          <a
            href={directionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </a>
        </Button>
      </div>
    </div>
  );
}