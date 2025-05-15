
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
import { MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const sliderImages = [
  "/mandirpandharpur.jpg",
  "/pandharpurmandir2.webp",
  "/pandharpurtemple1.jpg",
];

const temples = [
  {
    name: "Shri Gajanan Maharaj Mandir",
    image: "/shrigajnan1.jpeg",
    description: "Shani the son of Sun (Surya) is a famous God in Shingnapur A specialty of Shingnapur is there are no doors to the houses. Shri Shani Dev protects people from thieves. Shani Shingnapur is located at the east on Nagar Mammad Road in Ahilyanagar-Nagar Dist.",
    topAttraction: "The sacred Paduka (footprints) of Shri Gajanan Maharaj and the serene meditation hall.",
    timing: "5:00 AM to 9:00 PM",
    location: "Bhakti Marg,Sangola Naka, Pandharpur",
    reverse: false,
  },
  {
    name: "Vishnupad Temple",
    image: "/pandharpurtemple1.jpg",
    description: "Vishnupad Temple is a revered shrine in Pandharpur believed to mark the footprint of Lord Vishnu. Pilgrims consider it a spiritually powerful site, closely connected to the sacred geography of Pandharpur and its divine energy.",
    topAttraction: "The sacred Paduka (footprints) of Shri Gajanan Maharaj and the serene meditation hall.",
    timing: "5:00 AM to 9:00 PM",
    location: "Gopalpur Road, Pandharpur",
    reverse: true,
  },
  {
    name: "Yogiraj Tukarambaba Khedlekar Ashram, Pandharpur",
    image: "/shrigajnan1.jpeg",
    description: "Yogiraj Tukarambaba Khedlekar Ashram is a spiritually vibrant place established in honor of the saint and yogi Tukarambaba Khedlekar. It is a center for spiritual practice, meditation, and self-realization, attracting seekers from across Maharashtra and India.",
    topAttraction: "Majestic Vitthal Statue, Serene Green Surroundings, Spiritual Atmosphere by Tukaram Baba, Ideal for Family Gatherings and Marriages",
    timing: "Open 24 Hours",
    location: "Gursale Road,near Vitthal Petrol Pump,Pandharpur.",
    reverse: false,
  },
  {
    name: "Sant Kaikadi Maharaj Math",
    image: "/pandharpurtemple1.jpg",
    description: "Sant Kaikadi Maharaj Math is a unique religious site in Pandharpur known for its spiritual teachings and visually captivating representations of Hindu mythology. The math was founded by Sant Kaikadi Maharaj, a respected spiritual leader dedicated to spreading moral and devotional values.",
    topAttraction: "Sant Kaikadi Maharaj Shrine, Meditation Halls, Peaceful Gardens",
    timing: "9:00 am to 6:00 pm",
    location: "16 pachimidwar,near vitthal mandir,Pandharpur",
    reverse: true,
  },
  {
    name: "Pundalik Temple",
    image: "/shrigajnan1.jpeg",
    description: "Pundalik Temple, right in the middle of Pandharpur, is like a special place that tells the story of Pundalik, a saint who loved Vithoba a lot. Pundalik is the one who brought Vithoba to Pandharpur, and you can feel his devotion in the temple. Vithoba, like Vishnu and Krishna, has a big home in the main part of the temple. Pundalik wasn't just a saint; he was also good at Kundalini Yoga, so people called him Kundalik",
    topAttraction: "Vithoba's Main Shrine, Depiction of Kundalini Energy, Symbolic Muladhara Chakra Brick, Spiritual Representation of Hands and Body",
    timing: "4:00 am to 7:00 pm",
    location: "M8HQ+6Q4, Chandrabhaga River,Pandharpur",
    reverse: false,
  },
  {
    name: "Sri Sri Radha Pandharinath Mandir Pandharpur",
    image: "/pandharpurtemple1.jpg",
    description: "The Sri Sri Radha Pandharinath Mandir is part of the ISKCON (International Society for Krishna Consciousness) movement. It is dedicated to Lord Krishna (Pandharinath) and Radha, and it merges the bhakti traditions of both Vaishnavism and the local Vithoba (Vitthal) devotion of Pandharpur.",
    topAttraction: "Divine Deities of Sri Sri Radha Pandhiranath, Ekadasi Festival Celebrations, Sharing Srila Prabhupada's Marathi Bhagavad-gita, Riverside Location",
    timing: "4:00 am to 1:00 pm and 2:00 am to 8:00 pm",
    location: "ISKCON Temple Road, Shegaon Dumala, Pandharpur, Maharashtra 413304",
    reverse: true,
  },
  {
    name: "Kaikadi Maharaj Mandir Pandharpur",
    image: "/shrigajnan1.jpeg",
    description: "Kaikadi Maharaj Mandir is a unique and spiritual temple in Pandharpur that stands out for its artistic representation of various mythological events and teachings from Hindu scriptures. It is run by the Kaikadi community and offers a journey-like walkthrough experience inside.",
    topAttraction: "Life-size statues depicting Ramayana and Mahabharata scenes,Mythological caves and dioramas,Spiritual teachings and quotes by Kaikadi Maharaj,Peaceful meditation environment inside the cave setup",
    timing: "6:00 AM to 8:00 PM",
    location: "June Pat,Pandharpur,Maharashtra",
    reverse: false,
  },
  {
    name: "Shri Gajanan Maharaj Sansthan",
    image: "/pandharpurtemple1.jpg",
    description: "top tourist attraction in Pandharpur blessed by Shree Gajanan Maharaj in 1908. Gajanan Maharaj specified the date and place of his samadhi, and his prophetic words, 'Ya jaagi raaheel' (Will stay here), echoed through the ages.",
    topAttraction: "Majestic Marble Temple, Grand Mahadwar Entrance, Sacred PranPratishtha Ceremony, Intricately Carved Architecture",
    timing: "5:00 am to 9:30 pm",
    location: "Shivaji Chowk, Pandharpur,Maharashtra.",
    reverse: true,
  },
  {
    name: "Tanpure Maharaj Math",
    image: "/shrigajnan1.jpeg",
    description: "Remember to visit the Tanpure Maharaj Math and find a special place called Samadhi Sthal. Inside, there are 12 Jyotirlingas. This place is unique and special because these models look real and are different from each other. This place is not just about the Jyotirlingas; you'll also see models of 4 Dhams here. It's a great spot to visit if you come to Pandharpur, giving you a special feeling of the divine.",
    topAttraction: "Divine Samadhi Sthal, Lifelike Models of 12 Jyotirlingas, Presence of 4 Dhams, Spiritual Enrichment Experience",
    timing: "6:00 am to 9:00 pm",
    location: "Bhakti Marg,Sangola Naka, Pandharpur",
    reverse: false,
  },
  {
    name: "Shri Gopalkrishna Temple",
    image: "/pandharpurtemple1.jpg",
    description: "Perched atop the Govardhan Parvat, Shri Gopalkrishna Temple is dedicated to Lord Krishna. The temple resembles that of a fort and has underground chambers. The temple premises has a kitchen and a grinding place, both of which are believed to be used by Shri Krishna. It is such an important spot that a pilgrim's journey is said to be incomplete if they have not stopped by Shri Gopalkrishna Temple. It is one of the sacred places to visit near Pandharpur.",
    topAttraction: "Idols of Shri Gopalkrishna and Radha in traditional attire,Intricate carvings and paintings depicting Krishna Leela,Quiet prayer hall ideal for meditation",
    timing: "Open daily from 5:30 AM to 12:00 PM and 4:00 PM to 9:00 PM",
    location: "M87W+GVH, Gopalpur, Maharashtra 413304",
    reverse: true,
  },
];

const testimonials = [
  {
    name: "Aarti Sharma",
    review: "Visiting Shani Shingnapur was a deeply spiritual experience. The energy of the place is amazing!",
  },
  {
    name: "Ravi Kulkarni",
    review: "Muktidham's white marble and serene atmosphere make it a must-visit in Nashik.",
  },
];

const faqs = [
  {
    question: "What are the most prominent temples to visit in Pandharpur?",
    answer: "Some of the main temples include Shri Vitthal Rukmini Mandir, Pundalik Mandir, ISKCON Mandir, Shri Gajanan Maharaj Mandir, and Vishnupad Temple.",
  },
  {
    question: "What are the typical visiting hours for these temples?",
    answer: "Most temples are open from 5:00 AM to 9:00 PM, but timings may vary slightly. It's best to check individually.",
  },
  {
    question: "Are there any special festivals celebrated at these temples?",
    answer: "Yes, Ashadhi Ekadashi and Kartik Ekadashi are the most celebrated festivals, attracting lakhs of devotees.",
  },
  {
    question: "Is there an entry fee to visit these temples?",
    answer: "No, visiting is free. However, donations are appreciated by temple authorities.",
  },
  {
    question: "Are there facilities for senior citizens or differently-abled visitors?",
    answer: "Yes, most temples have wheelchairs, special queues, and volunteers to help such visitors.",
  },
  {
    question: "Can we take photographs inside the temples?",
    answer: "Some temples allow photography in outer areas but not in sanctum sanctorum. Always follow local rules.",
  },
  {
    question: "How do I reach Pandharpur?",
    answer: "Pandharpur is connected by road and rail. The nearest major city is Solapur, about 70 km away.",
  },
];

export default function TemplePage() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', comment: '', rating: 5 });
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fetchReviews = async () => {
    // Simulate API call
    return Promise.resolve(testimonials);
  };

  const submitReview = async (data) => {
    // Simulate API call
    const newReview = {
      ...data,
      date: new Date().toISOString()
    };
    return Promise.resolve(newReview);
  };

  useEffect(() => {
    fetchReviews().then(setReviews);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = await submitReview(form);
    setReviews([newReview, ...reviews]);
    setForm({ name: '', comment: '', rating: 5 });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-8 bg-gradient-to-t from-orange-100 via-white to-orange-50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Circle 1 */}
          <motion.div
            className="absolute top-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-30"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          {/* Circle 2 */}
          <motion.div
            className="absolute bottom-20 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
          {/* Additional Circle 3 */}
          <motion.div
            className="absolute top-20 left-60 w-32 h-32 bg-orange-400 rounded-full opacity-25"
            animate={{ y: [0, 25, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
          />
          {/* Additional Circle 4 */}
          <motion.div
            className="absolute bottom-40 left-24 w-28 h-28 bg-orange-500 rounded-full opacity-15"
            animate={{ x: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 6.5 }}
          />
          {/* Additional Circle 5 */}
          <motion.div
            className="absolute top-40 right-10 w-36 h-36 bg-orange-600 rounded-full opacity-10"
            animate={{ x: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
        </div>
        <div className="md:w-1/2 text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Shri Vitthal Rukmini Mandir</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-lg text-orange-600 font-semibold mb-3">
              Lord Vitthal appeared in Pandharpur to bless Pundalik.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="text-gray-700 mb-4">
              The Vitthal-Rukmini Temple, located in Pandharpur, Maharashtra, is a prominent Hindu pilgrimage site dedicated to Lord Vitthal (a form of Lord Krishna) and his consort Rukmini.
            </div>
            <div className="text-gray-700 mb-4">
              Believed to have been established in the 12th century by the Hoysala king Vishnuvardhana, the temple holds deep historical and spiritual significance.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition duration-200">
              Discover More
            </button>
          </motion.div>
        </div>
        <div className="md:w-1/2 z-10">
          <Carousel className="w-full max-w-lg mx-auto">
            <CarouselContent>
              {sliderImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="flex aspect-video items-center justify-center p-0">
                        <Image
                          src={image}
                          alt={`Temple image ${index + 1}`}
                          width={600}
                          height={500}
                          className="object-cover w-full h-full"
                          priority={index === 0}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </section>

      {/* Temple List Section */}
      <section className="py-12 text-center px-6 md:px-16 bg-white overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl text-orange-600 font-bold mb-2 text-center">Temples in Pandharpur</h2>
            <div className="text-gray-600 mb-10 text-center">
              Discover more iconic temples and spiritual landmarks across Pandharpur in a meaningful and immersive way.
            </div>
          </motion.div>
          <div className="space-y-12 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {temples.map((temple, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center mb-16 bg-gray-100 shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl ${temple.reverse ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  <div className="md:w-1/3 w-full">
                    <Image
                      src={temple.image}
                      alt={temple.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 w-full p-6 text-left">
                    <h2 className="text-2xl font-bold text-orange-600">{temple.name}</h2>
                    <div className="text-gray-700 leading-relaxed">{temple.description}</div>
                    {temple.topAttraction && (
                      <div className="mb-2">
                        <span className="font-semibold text-gray-800">Top Attraction:</span>
                        <div className="text-gray-700 whitespace-normal">
                          {temple.topAttraction}
                        </div>
                      </div>
                    )}
                    {temple.timing && (
                      <div className="mb-2">
                        <span className="font-semibold text-gray-800">Timing:</span>
                        <div className="text-gray-700 whitespace-normal">{temple.timing}</div>
                      </div>
                    )}
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{temple.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative md:px-12 bg-orange-50 px-6 py-20 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
              Need Help?
            </Badge>
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
              🙏 Frequently Asked Questions
            </h2>
            <div className="max-w-2xl mx-auto text-gray-600">
              Find answers to common questions about the Pandharpur Temples.
            </div>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 text-left text-lg font-medium hover:bg-gray-200"
                >
                  {faq.question}
                  <ChevronDown className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 text-gray-700 bg-white">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">What Our Visitors Say</h2>
        </motion.div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <textarea
            placeholder="Your Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
            className="w-full p-2 border rounded mb-2"
          />
          <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Submit Review
          </button>
        </form>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          {reviews.map((r, idx) => (
            <div key={idx} className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded shadow border">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{r.name}</h3>
                <p className="text-yellow-500">⭐ {r.rating}/5</p>
              </div>
              <div className="text-gray-700">{r.comment || r.review}</div>
              <p className="text-xs text-gray-400">{new Date(r.date || Date.now()).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}