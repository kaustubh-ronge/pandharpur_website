import { attractionsQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Clock } from "lucide-react"
import { SharedBackground } from '@/components/SharedBackGround'

// Fetch data from Sanity
async function getAttractions() {
  const data = await client.fetch(attractionsQuery, {}, { cache: 'no-cache' })
  return data
}

export default async function AttractionsPage() {
  const categories = await getAttractions()

  return (
    <div className="min-h-screen">
      <SharedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-amber-100 text-amber-800 border-amber-300 px-4 py-1">
            Spiritual Journey
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl font-serif">
            Discover Sacred Pandharpur
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Explore the divine temples, serene landscapes, and rich cultural heritage of the holy city of Pandharpur and its surroundings.
          </p>
        </div>

        {/* Categories and Attractions */}
        <div className="space-y-20">
          {categories.map(category => (
            category.attractions && category.attractions.length > 0 && (
              <section key={category._id} className="relative">
                <div className="flex items-center mb-10">
                  <div className="flex-1 border-t border-amber-200"></div>
                  <h2 className="mx-4 text-3xl font-bold text-gray-800 font-serif flex items-center">
                    <span className="mr-2 text-amber-600">
                      <MapPin size={28} />
                    </span>
                    {category.title}
                  </h2>
                  <div className="flex-1 border-t border-amber-200"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.attractions.map(attraction => (
                    <Card key={attraction._id} className="overflow-hidden group border-amber-100 hover:border-amber-300 transition-all duration-300 h-full flex flex-col">
                      <CardHeader className="p-0 relative">
                        <div className="h-56 relative overflow-hidden">
                          <Image
                            src={attraction.mainImageUrl}
                            alt={attraction.mainImageAlt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-amber-500 hover:bg-amber-600">
                              <Star className="mr-1 h-3 w-3" fill="currentColor" />
                              Must Visit
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 flex-grow">
                        <CardTitle className="text-xl mb-2 font-serif group-hover:text-amber-700 transition-colors">
                          {attraction.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2">
                          {attraction.description?.[0]?.children?.[0]?.text || "A sacred place of spiritual significance in Pandharpur."}
                        </CardDescription>
                        {attraction.distance && (
                          <div className="flex items-center mt-4 text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            About {attraction.distance} from main temple
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-5 pt-0">
                        <Button asChild variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50">
                          <Link href={`/other-attractions/${attraction.slug}`}>
                            Explore Sacred Site
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 py-10">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Plan Your Pilgrimage</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Discover the spiritual essence of Pandharpur through these sacred sites and create a meaningful journey.
              </p>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                View Pilgrimage Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}