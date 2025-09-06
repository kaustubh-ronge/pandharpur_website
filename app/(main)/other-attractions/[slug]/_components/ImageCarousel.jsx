"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

/**
 * A dedicated client component for the image carousel.
 * This keeps the logic separate and clean.
 */
export default function ImageCarousel({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No images available.</p>
      </div>
    );
  }

  return (
    <Carousel
      className="w-full h-full"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="border-none rounded-none h-full bg-black">
              <CardContent className="relative flex items-center justify-center p-0 h-full">
                <img
                  src={image.imageUrl}
                  alt={image.alt || 'Attraction image'}
                  className="w-full h-full object-contain" // object-contain is better for galleries
                />
                {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-sm text-center">{image.caption}</p>
                    </div>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 bg-white/80 hover:bg-white" />
      <CarouselNext className="absolute right-2 bg-white/80 hover:bg-white" />
    </Carousel>
  );
}