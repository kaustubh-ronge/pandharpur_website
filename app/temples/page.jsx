// "use client";
// import Image from "next/image";
// import { MapPin } from "lucide-react"; 
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";

// const sliderImages = [
//   "/mandirpandharpur.jpg",
//   "/pandharpurmandir2.webp",
//   "/pandharpurtemple1.jpg",
  
// ];

// const TempleList = [
//   {
//     title: "Shri Gajanan Maharaj Mandir",
//     description: "Serene spiritual center dedicated to the revered saint Shri Gajanan Maharaj, attracting devotees seeking peace, blessings, and inner guidance.",
//     image: "/pandharpurtemple11.jpeg",
//     location: "Bhakti Marg,Sangola Naka, Pandharpur.",
//   },
//   {
//     title: "Vishnupad Temple",
//     description: "The temple is distinguished by the sacred footprints of Lord Vishnu (also associated with Lord Krishna) etched into basalt rock, symbolizing his divine presence.",
//     image: "/images/ganapathi.jpg",
//     location: "Gopalpur Road, Pandharpur",
//   },
//   {
//     title: "Yogiraj Tukarambaba Khedlekar Ashram, Pandharpur",
//     description: "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace.",
//     image: "/images/durga.jpg",
//     location: "Gursale Road,near Vitthal Petrol Pump,Pandharpur.",
//   },
//   {
//     title: "Sant Kaikadi Maharaj Math",
//     description: "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace.",
//     image: "/images/durga.jpg",
//     location: "16 pachimidwar,near vitthal mandir,Pandharpur",
//   },
//   {
//     title: "Pundalik Temple",
//     description: "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace.",
//     image: "/images/durga.jpg",
//     location: "M8HQ+6Q4, Chandrabhaga River,Pandharpur",
//   },
//   {
//     title: "Sri Sri Radha Pandharinath Mandir Pandharpur",
//     description: "The temple is dedicated to Lord Krishna and Goddess Radha. This temple is very beautiful and situated on the bank of the holy river Chandra Bhaga.",
//     image: "/images/durga.jpg",
//     location: "H74, Shegaon Dumala, Maharashtra",
//   },
//   {
//     title: "Kaikadi Maharaj Mandir Pandharpur",
//     description: "This is a great place to worship and doubles up as a museum. Kaikadi Maharaj Mandir in Pandharpur is a serene and spiritual place dedicated to the revered saint Kaikadi Maharaj.",
//     image: "/images/durga.jpg",
//     location: "June Pat,Pandharpur,Maharashtra",
//   },
//   {
//     title: "Shri Sant Gajanan Maharaj Mandir Pandharpur",
//     description: "The temple is dedicated to Gajanan Maharaj. He is one of the well-known saints of India. Devotees of Gajanan Maharaj believe that Gajanan Maharaj is an avatar of Lord Ganesha.",
//     image: "/images/durga.jpg",
//     location: "Shivaji Chowk, Pandharpur,Maharashtra.",
//   },
// ];

// export default function TemplePage() {
//   return (
//     <div className="bg-white">
//       {/* Shri Vitthal Rukmini Mandir Hero Section */}
//       <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-8 bg-gradient-to-t from-orange-100 via-white to-orange-50">
//         <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//           {/* Circle 1 */}
//           <motion.div 
//             className="absolute top-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-30" 
//             animate={{ y: [0, 20, 0] }} 
//             transition={{ repeat: Infinity, duration: 6 }}
//           />
//           {/* Circle 2 */}
//           <motion.div 
//             className="absolute bottom-20 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-20" 
//             animate={{ y: [0, -20, 0] }} 
//             transition={{ repeat: Infinity, duration: 5 }}
//           />
//           {/* Additional Circle 3 */}
//           <motion.div
//             className="absolute top-20 left-60 w-32 h-32 bg-orange-400 rounded-full opacity-25"
//             animate={{ y: [0, 25, 0] }}
//             transition={{ repeat: Infinity, duration: 7 }}
//           />
//           {/* Additional Circle 4 */}
//           <motion.div
//             className="absolute bottom-40 left-24 w-28 h-28 bg-orange-500 rounded-full opacity-15"
//             animate={{ x: [0, 30, 0] }}
//             transition={{ repeat: Infinity, duration: 6.5 }}
//           />
//           {/* Additional Circle 5 */}
//           <motion.div
//             className="absolute top-40 right-10 w-36 h-36 bg-orange-600 rounded-full opacity-10"
//             animate={{ x: [0, -30, 0] }}
//             transition={{ repeat: Infinity, duration: 8 }}
//           />
//         </div>
        
//         <div className="md:w-1/2 text-left z-10">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Shri Vitthal Rukmini Mandir</h1>
//           <h2 className="text-lg text-orange-600 font-semibold mb-3">
//             Lord Vitthal appeared in Pandharpur to bless Pundalik.
//           </h2>
//           <p className="text-gray-700 mb-4">
//             The Vitthal-Rukmini Temple, located in Pandharpur, Maharashtra, is a prominent Hindu pilgrimage site dedicated to Lord Vitthal (a form of Lord Krishna) and his consort Rukmini.
//           </p>
//           <p className="text-gray-700 mb-4">
//             Believed to have been established in the 12th century by the Hoysala king Vishnuvardhana, the temple holds deep historical and spiritual significance.
//           </p>
//           <button className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition duration-200">
//             Discover More
//           </button>
//         </div>
        
//         <div className="md:w-1/2 z-10">
//           <Carousel className="w-full max-w-lg mx-auto">
//             <CarouselContent>
//               {sliderImages.map((image, index) => (
//                 <CarouselItem key={index}>
//                   <div className="p-1">
//                     <Card className="overflow-hidden">
//                       <CardContent className="flex aspect-video items-center justify-center p-0">
//                         <Image
//                           src={image}
//                           alt={`Temple image ${index + 1}`}
//                           width={600}
//                           height={400}
//                           className="object-cover w-full h-full"
//                           priority={index === 0}
//                         />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
//             <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
//           </Carousel>
//         </div>
//       </section>

//       {/* Temple List Section */}
//       <section className="py-12 px-6 text-center">
//         <h2 className="text-3xl font-bold text-orange-600 mb-2">Temples in Pandharpur</h2>
//         <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//           Discover more iconic temples and spiritual landmarks across Pandharpur in a meaningful and immersive way.
//         </p>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
//           {TempleList.map((temple, idx) => (
//             <motion.div
//               key={idx}
//               className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//               whileHover={{ y: -5 }}
//             >
//               <div className="h-48 relative">
//                 <Image
//                   src={temple.image}
//                   alt={temple.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg mb-2 text-gray-800">{temple.title}</h3>
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-3">{temple.description}</p>
//                 <div className="text-sm text-blue-600 font-medium flex items-center justify-center">
//                   <MapPin className="w-4 h-4 mr-1" />
//                   <span className="truncate">{temple.location}</span>
//                 </div>
//                 <button className="mt-4 bg-orange-600 text-white px-4 py-2 text-sm rounded hover:bg-orange-700 transition">
//                   View More
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { MapPin, Clock, Calendar, Star, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sliderImages = [
  "/mandirpandharpur.jpg",
  "/pandharpurmandir2.webp",
  "/pandharpurtemple1.jpg",
];

const TempleList = [
  {
    title: "Shri Gajanan Maharaj Mandir",
    description: "Serene spiritual center dedicated to the revered saint Shri Gajanan Maharaj, attracting devotees seeking peace, blessings, and inner guidance.",
    image: "/pandharpurtemple1.jpg",
    location: "Bhakti Marg, Sangola Naka, Pandharpur",
    rating: 4.8,
    timings: "5:00 AM - 9:00 PM",
    featured: true,
    distance: "1.2 km from main temple"
  },
  {
    title: "Vishnupad Temple",
    description: "The temple is distinguished by the sacred footprints of Lord Vishnu (also associated with Lord Krishna) etched into basalt rock, symbolizing his divine presence.",
    image: "/images/ganapathi.jpg",
    location: "Gopalpur Road, Pandharpur",
    rating: 4.5,
    timings: "6:00 AM - 8:30 PM",
    featured: false,
    distance: "0.8 km from main temple"
  },
  {
    title: "Yogiraj Tukarambaba Khedlekar Ashram",
    description: "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace.",
    image: "/images/durga.jpg",
    location: "Gursale Road, near Vitthal Petrol Pump, Pandharpur",
    rating: 4.7,
    timings: "5:30 AM - 9:00 PM",
    featured: true,
    distance: "2.1 km from main temple"
  },
  {
    title: "Sant Kaikadi Maharaj Math",
    description: "The ashram is renowned for its majestic statue of Lord Vitthal, which stands as a symbol of devotion and peace.",
    image: "/images/durga.jpg",
    location: "16 Pachimidwar, near Vitthal Mandir, Pandharpur",
    rating: 4.3,
    timings: "6:00 AM - 8:00 PM",
    featured: false,
    distance: "1.5 km from main temple"
  },
  {
    title: "Pundalik Temple",
    description: "Ancient temple dedicated to Pundalik who brought Lord Vitthal to Pandharpur. A must-visit for spiritual seekers.",
    image: "/images/durga.jpg",
    location: "M8HQ+6Q4, Chandrabhaga River, Pandharpur",
    rating: 4.6,
    timings: "5:00 AM - 9:00 PM",
    featured: true,
    distance: "0.5 km from main temple"
  },
  {
    title: "Sri Sri Radha Pandharinath Mandir",
    description: "The temple is dedicated to Lord Krishna and Goddess Radha. This temple is very beautiful and situated on the bank of the holy river Chandra Bhaga.",
    image: "/images/durga.jpg",
    location: "H74, Shegaon Dumala, Maharashtra",
    rating: 4.4,
    timings: "5:30 AM - 8:30 PM",
    featured: false,
    distance: "3.2 km from main temple"
  },
  {
    title: "Kaikadi Maharaj Mandir",
    description: "This is a great place to worship and doubles up as a museum. Kaikadi Maharaj Mandir in Pandharpur is a serene and spiritual place.",
    image: "/images/durga.jpg",
    location: "June Pat, Pandharpur, Maharashtra",
    rating: 4.2,
    timings: "6:00 AM - 8:00 PM",
    featured: false,
    distance: "1.8 km from main temple"
  },
  {
    title: "Shri Sant Gajanan Maharaj Mandir",
    description: "The temple is dedicated to Gajanan Maharaj. He is one of the well-known saints of India. Devotees believe he is an avatar of Lord Ganesha.",
    image: "/images/durga.jpg",
    location: "Shivaji Chowk, Pandharpur, Maharashtra",
    rating: 4.9,
    timings: "4:30 AM - 10:00 PM",
    featured: true,
    distance: "0.7 km from main temple"
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    avatar: "/avatars/1.jpg",
    comment: "The divine energy at Vitthal Mandir is unparalleled. I visit every year and each time it feels like coming home.",
    rating: 5
  },
  {
    name: "Priya Patel",
    avatar: "/avatars/2.jpg",
    comment: "Pandharpur's temples offer such peace and tranquility. The architecture and spiritual atmosphere is breathtaking.",
    rating: 4
  },
  {
    name: "Amit Deshpande",
    avatar: "/avatars/3.jpg",
    comment: "The aarti at Vitthal Mandir during sunrise is an experience that stays with you forever. Highly recommended!",
    rating: 5
  },
  {
    name: "Sneha Joshi",
    avatar: "/avatars/4.jpg",
    comment: "The temple management has improved facilities significantly in recent years. Clean surroundings and well-organized darshan.",
    rating: 4
  }
];

const events = [
  {
    title: "Ashadhi Ekadashi",
    date: "July 17, 2024",
    description: "The most famous festival when lakhs of devotees walk to Pandharpur in the traditional Wari pilgrimage.",
    image: "/events/ashadhi.jpg"
  },
  {
    title: "Kartiki Ekadashi",
    date: "November 12, 2024",
    description: "Another important Ekadashi celebration with special rituals and large gatherings of devotees.",
    image: "/events/kartiki.jpg"
  },
  {
    title: "Rama Navami",
    date: "April 6, 2024",
    description: "Celebration of Lord Rama's birthday with special pujas and cultural programs at the temple.",
    image: "/events/ramanavami.jpg"
  },
  {
    title: "Gudi Padwa",
    date: "April 9, 2024",
    description: "Maharashtrian New Year celebrated with traditional decorations and special darshan arrangements.",
    image: "/events/gudipadwa.jpg"
  }
];

export default function TemplePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-8 bg-gradient-to-t from-orange-100 via-white to-orange-50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              className={`absolute ${i%2 ? 'bg-orange-200' : 'bg-orange-300'} rounded-full opacity-20`}
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ 
                y: [0, (Math.random() * 40 - 20)],
                x: [0, (Math.random() * 40 - 20)]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: Math.random() * 10 + 5,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        <div className="md:w-1/2 text-left z-10 space-y-4">
          <Badge variant="secondary" className="text-orange-600 mb-2">
            Sacred Pilgrimage Site
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Shri Vitthal Rukmini Mandir
          </h1>
          <h2 className="text-lg text-orange-600 font-semibold">
            Lord Vitthal appeared in Pandharpur to bless Pundalik
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">4.9 (12K reviews)</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5" />
              <span className="ml-1">Pandharpur, Maharashtra</span>
            </div>
          </div>
          
          <p className="text-gray-700">
            The Vitthal-Rukmini Temple, located in Pandharpur, Maharashtra, is a prominent Hindu pilgrimage site dedicated to Lord Vitthal (a form of Lord Krishna) and his consort Rukmini.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <Clock className="w-6 h-6 text-orange-500 mb-1" />
              <h4 className="font-medium text-sm">Darshan Timings</h4>
              <p className="text-xs text-gray-600">4:30 AM - 10:00 PM</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border">
              <Calendar className="w-6 h-6 text-orange-500 mb-1" />
              <h4 className="font-medium text-sm">Best Time to Visit</h4>
              <p className="text-xs text-gray-600">June - December</p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Plan Your Visit
            </Button>
            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              Virtual Tour
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 z-10">
          <Carousel className="w-full max-w-lg mx-auto">
            <CarouselContent>
              {sliderImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="overflow-hidden border-none shadow-lg">
                      <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                        <Image
                          src={image}
                          alt={`Temple image ${index + 1}`}
                          fill
                          className="object-cover w-full h-full rounded-xl"
                          priority={index === 0}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h3 className="text-white font-medium">
                            {index === 0 ? "Main Temple Entrance" : 
                             index === 1 ? "Evening Aarti View" : "Chandrabhaga River View"}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md" />
          </Carousel>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-12 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            About <span className="text-orange-600">Vitthal Mandir</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-orange-50 p-6 rounded-xl border border-orange-100"
              whileHover={{ y: -5 }}
            >
              <div className="text-orange-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 15.5v.01"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M11 17v.01"></path>
                  <path d="M7 14v.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Historical Significance</h3>
              <p className="text-gray-600">
                Believed to have been established in the 12th century by the Hoysala king Vishnuvardhana, the temple holds deep historical and spiritual significance.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-orange-50 p-6 rounded-xl border border-orange-100"
              whileHover={{ y: -5 }}
            >
              <div className="text-orange-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Architectural Marvel</h3>
              <p className="text-gray-600">
                The temple showcases exquisite Hemadpanthi architecture with intricate carvings and a grand entrance that reflects the Vijayanagara style of construction.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-orange-50 p-6 rounded-xl border border-orange-100"
              whileHover={{ y: -5 }}
            >
              <div className="text-orange-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Rituals</h3>
              <p className="text-gray-600">
                The temple follows a strict schedule of rituals including Kakad Aarti (morning), Madhyan Aarti (noon), and Shej Aarti (night) that devotees can participate in.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Temple List Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Temples in <span className="text-orange-600">Pandharpur</span>
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Discover more iconic temples and spiritual landmarks across Pandharpur in a meaningful and immersive way.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 border-orange-600 text-orange-600 hover:bg-orange-50">
              View All Temples <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="all">All Temples</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {TempleList.map((temple, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full flex flex-col">
                      <div className="relative h-48">
                        <Image
                          src={temple.image}
                          alt={temple.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        {temple.featured && (
                          <Badge className="absolute top-2 left-2 bg-orange-600 hover:bg-orange-700">
                            Featured
                          </Badge>
                        )}
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full w-8 h-8"
                        >
                          <Heart className="w-4 h-4 text-gray-700" />
                        </Button>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{temple.title}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{temple.rating}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {temple.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="truncate">{temple.distance}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <Button variant="link" className="text-orange-600 p-0 h-auto">
                          View Details
                        </Button>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {temple.timings}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="featured" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TempleList.filter(temple => temple.featured).map((temple, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full flex flex-col border-orange-200">
                      <div className="relative h-48">
                        <Image
                          src={temple.image}
                          alt={temple.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-orange-600 hover:bg-orange-700">
                          Featured
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{temple.title}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{temple.rating}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                          {temple.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" className="text-orange-600 p-0 h-auto">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nearby" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...TempleList]
                  .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                  .slice(0, 4)
                  .map((temple, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full flex flex-col">
                        <div className="relative h-48">
                          <Image
                            src={temple.image}
                            alt={temple.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{temple.title}</CardTitle>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{temple.rating}</span>
                            </div>
                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                              {temple.distance}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button variant="link" className="text-orange-600 p-0 h-auto">
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

     

      
      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common queries about visiting Pandharpur temples
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are the temple timings?</AccordionTrigger>
              <AccordionContent>
                The main Vitthal-Rukmini temple is open from 4:30 AM to 10:00 PM daily. Special aarti timings are at 5:00 AM (Kakad Aarti), 12:00 PM (Madhyan Aarti), and 7:00 PM (Shej Aarti). Other temples may have slightly different timings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there any dress code for temple visit?</AccordionTrigger>
              <AccordionContent>
                While there's no strict dress code, modest clothing is recommended. Traditional Indian attire is preferred. Avoid shorts, sleeveless tops, and revealing clothing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How to reach Pandharpur?</AccordionTrigger>
              <AccordionContent>
                Pandharpur is well-connected by road. The nearest railway station is Pandharpur Railway Station (3 km). The nearest airport is Solapur Airport (70 km). Regular buses ply from major Maharashtra cities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Where can I stay during my visit?</AccordionTrigger>
              <AccordionContent>
                There are various accommodation options ranging from temple-run guest houses (Dharmashalas) to private hotels. The Pandharpur Temple Trust provides affordable lodging for pilgrims.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What is the best time to visit?</AccordionTrigger>
              <AccordionContent>
                The ideal time is between June to December, especially during Ekadashi days. Avoid peak summer (April-May) as temperatures can be very high.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 md:px-20 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-orange-100 rounded-full p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Stay Updated on Temple Events
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest information on festivals, rituals, and special darshan arrangements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white border-gray-300 flex-grow"
            />
            <Button className="bg-orange-600 hover:bg-orange-700">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}