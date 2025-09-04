
import { PortableText } from '@portabletext/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { client } from '@/sanity/lib/sanity'
import { attractionBySlugQuery, attractionPathsQuery } from '@/sanity/lib/queries'
import { MapPin, Clock, Star, ArrowLeft, Navigation, Calendar } from 'lucide-react'
import Link from 'next/link'

// Generate static paths for all attractions for better performance
export async function generateStaticParams() {
  const paths = await client.fetch(attractionPathsQuery)
  return paths
}

// Fetch the data for a single attraction
async function getAttraction(slug) {
  const data = await client.fetch(attractionBySlugQuery, { slug })
  return data
}

export default async function AttractionDetailPage({ params }) {
  const attraction = await getAttraction(params.slug)

  if (!attraction) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Attraction not found</h1>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/other-attractions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Attractions
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Combine main image and gallery for the carousel
  const carouselImages = [
    { imageUrl: attraction.mainImageUrl, alt: attraction.mainImageAlt },
    ...(attraction.gallery || []),
  ]

  // Extract Google Maps URL from Sanity data
  const googleMapsUrl = attraction.location?.googleMapsUrl

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
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 px-4 py-1">
            {attraction.category}
          </Badge>
          <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl font-serif">
            {attraction.title}
          </h1>
          {attraction.shortDescription && (
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              {attraction.shortDescription}
            </p>
          )}
        </div>

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
            {/* Top Right: Image Carousel */}
            <div className="flex-1 h-1/2 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Carousel
                className="w-full h-full"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-none rounded-none h-full">
                        <CardContent className="flex items-center justify-center p-0 h-full">
                          <img
                            src={image.imageUrl}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
              </Carousel>
            </div>

            {/* Bottom Right: Map */}
            <div className="flex-1 h-1/2 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              {googleMapsUrl ? (
                <div className="relative h-full">
                  <iframe
                    src={googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                  <div className="absolute bottom-4 right-4">
                    <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700 shadow-md">
                      <a 
                        href={googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Navigation className="mr-2 h-4 w-4" />
                        Open in Maps
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                  <MapPin className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">Map not available.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {attraction.distance && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-amber-100 p-3 mr-4">
                  <Clock className="h-6 w-6 text-amber-700" />
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
        <div className="mt-10 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-serif flex items-center justify-center">
            <div className="w-8 h-1 bg-amber-500 mr-4"></div>
            About This Sacred Place
            <div className="w-8 h-1 bg-amber-500 ml-4"></div>
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 prose-headings:font-serif prose-headings:text-amber-800 prose-strong:text-amber-700 prose-a:text-amber-600 hover:prose-a:text-amber-700 prose-blockquote:border-amber-300 prose-blockquote:bg-amber-50">
            <PortableText value={attraction.description} />
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-center py-10 mb-12">
          <CardContent>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Plan Your Visit</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Ready to experience this sacred place in person? Here's how to make the most of your visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                <Link href="/other-attractions">
                  Explore More Sites
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}