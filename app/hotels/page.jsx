// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { getAllHotelsQuery } from "@/sanity/lib/queries"
// // import { client } from "@/sanity/lib/sanity"

// // import { motion } from "framer-motion"

// // export default async function HotelsPage() {
// //   const hotels = await client.fetch(getAllHotelsQuery)
// //   console.log(hotels)


// //   return (
// //     <div className="max-w-6xl mx-auto px-6 py-16">
// //       <h1 className="text-4xl font-bold mb-10 text-center">Our Partner Hotels</h1>
      
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {hotels.map((hotel, index) => (
// //           <motion.div
// //             key={hotel._id}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: index * 0.1 }}
// //           >
// //             <Card className="hover:shadow-lg transition-all h-full">
// //               <CardHeader className="p-0">
// //                 <img
// //                   src={hotel.image}
// //                   alt={hotel.name}
// //                   className="w-full h-48 object-cover rounded-t-lg"
// //                 />
// //               </CardHeader>
// //               <CardContent className="p-4">
// //                 <CardTitle>{hotel.name}</CardTitle>
// //                 <CardDescription className="text-sm text-muted-foreground">
// //                   {hotel.address}
// //                 </CardDescription>
// //                 <p className="mt-2 text-gray-600 dark:text-gray-300">{hotel.description}</p>
// //                 <Button className="mt-4 w-full" variant="outline" asChild>
// //                   <a href={hotel.website} target="_blank" rel="noopener noreferrer">
// //                     Book Now
// //                   </a>
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }


// 'use client'

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { getAllHotelsQuery } from "@/sanity/lib/queries"
// import { client } from "@/sanity/lib/sanity"
// import { motion } from "framer-motion"
// import { useEffect, useState } from "react"

// export default function HotelsPage() {
//   const [hotels, setHotels] = useState([])

//   useEffect(() => {
//     async function fetchHotels() {
//       const result = await client.fetch(getAllHotelsQuery)
//       setHotels(result)
//     }

//     fetchHotels()
//   }, [])

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16">
//       <h1 className="text-4xl font-bold mb-10 text-center">Our Partner Hotels</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {hotels.map((hotel, index) => (
//           <motion.div
//             key={hotel._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card className="hover:shadow-lg transition-all h-full">
//               <CardHeader className="p-0">
//                 {hotel.image && (
//                   <img
//                     src={hotel.image}
//                     alt={hotel.name}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
//                 )}
//               </CardHeader>
//               <CardContent className="p-4">
//                 <CardTitle>{hotel.name}</CardTitle>
//                 <CardDescription className="text-sm text-muted-foreground">
//                   {hotel.address}
//                 </CardDescription>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">{hotel.description}</p>
//                 <Button className="mt-4 w-full" variant="outline" asChild>
//                   <a href={hotel.website} target="_blank" rel="noopener noreferrer">
//                     Book Now
//                   </a>
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/sanity"
import { getAllHotelsQuery } from "@/sanity/lib/queries"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function HotelsPage() {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    async function fetchHotels() {
      const result = await client.fetch(getAllHotelsQuery)
      setHotels(result)
    }

    fetchHotels()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Partner Hotels in Pandharpur</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              {hotel.image && (
                <CardHeader className="p-0">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
              )}

              <CardContent className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between">
                    <CardTitle>{hotel.name}</CardTitle>
                    {hotel.category && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {hotel.category}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    {hotel.address}
                  </CardDescription>

                  {hotel.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                      {hotel.description}
                    </p>
                  )}

                  <Separator className="my-4" />

                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {hotel.phoneNumber && <p><strong>Phone:</strong> {hotel.phoneNumber}</p>}
                    {hotel.email && <p><strong>Email:</strong> {hotel.email}</p>}
                    {hotel.priceRange && <p><strong>Price:</strong> {hotel.priceRange}</p>}
                    {hotel.rating && <p><strong>Rating:</strong> ⭐ {hotel.rating}/5</p>}
                  </div>

                  {hotel.facilities?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {hotel.facilities.map((item, i) => (
                        <Badge key={i} className="text-xs" variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  {hotel.website ? (
                    <Button className="w-full" asChild variant="default">
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                        Book Now
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full" disabled variant="secondary">
                      No Website Available
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
