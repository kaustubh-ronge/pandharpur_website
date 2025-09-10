
"use client";
import React from "react";
import Image from 'next/image'; // Import the Next.js Image component
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, PlayCircle, MapPin, Landmark, ArrowDown } from "lucide-react";

const HeroBannerSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-t from-orange-100 via-white to-orange-50">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className={`absolute ${i === 1 ? 'top-10 left-10 w-24 h-24 bg-orange-200' : 
                         i === 2 ? 'bottom-20 right-20 w-20 h-20 bg-orange-300' :
                         i === 3 ? 'top-20 left-60 w-32 h-32 bg-orange-400' :
                         i === 4 ? 'bottom-40 left-24 w-28 h-28 bg-orange-500' :
                         'top-40 right-10 w-36 h-36 bg-orange-600'} rounded-full opacity-${i === 1 ? 30 : i === 2 ? 20 : i === 3 ? 25 : i === 4 ? 15 : 10}`}
            animate={{ 
              y: i <= 3 ? [0, i === 1 ? 20 : i === 2 ? -20 : 25, 0] : undefined,
              x: i >= 4 ? [0, i === 4 ? 30 : -30, 0] : undefined
            }}
            transition={{ 
              repeat: Infinity, 
              duration: i === 1 ? 6 : i === 2 ? 5 : i === 3 ? 7 : i === 4 ? 6.5 : 8 
            }}
          />
        ))}
      </div>

      {/* Desktop images using next/image */}
      <div className="hidden md:block absolute top-0 left-0 z-10 p-6">
        <Image 
          src="/vitthal-solo-image.png" 
          alt="Shri Vitthal" 
          width={400}
          height={650}
          // ADDED mt-10 to push Vitthal down, aligning better with Rukmini
          className="mt-5 h-[300px] lg:h-[420px] xl:h-[520px] w-auto" 
        />
      </div>
      <div className="hidden md:block absolute top-0 right-0 z-10 p-6">
        <Image
          src="/rukmini-solo-img.png" 
          alt="Mata Rukmini" 
          width={400}
          height={600}
          // mt-10 was removed previously, ensuring this image starts higher
          className="mt-6 lg:mt-8 md:mt-7 h-[260px] lg:h-[380px] xl:h-[450px] w-auto" 
        />
      </div>

      {/* Main content container */}
      <div className="relative z-20 flex flex-col h-full min-h-screen items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 text-center text-gray-800">
        
        {/* Mobile Layout using next/image - kept as is for now based on last request*/}
        <div className="md:hidden flex justify-center items-center gap-6 w-full"> 
          <Image 
            src="/vitthal-solo-image.png" 
            alt="Shri Vitthal" 
            width={250}
            height={400}
            className="h-[450px] w-auto mt-4" 
          /> 
          <Image 
            src="/rukmini-solo-img.png" 
            alt="Mata Rukmini" 
            width={250}
            height={375}
            className="h-[400px] w-auto" 
          /> 
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <Badge variant="secondary" className="bg-orange-600/90 text-white text-sm px-4 py-2 shadow-lg">
            Sacred Journey 2025
          </Badge>
        </motion.div>

        {/* Text size corrected to prevent overlap on medium screens */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 max-w-4xl"
        >
          Feel the<span className="text-orange-500">Blessings</span> of 
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Pandharpur Darshan
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl text-lg md:text-xl text-gray-700 mb-8"
        >
          Walk the sacred path walked by millions — an unforgettable spiritual journey to Lord Vitthal's abode.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg">
            <PlayCircle className="mr-2 h-5 w-5" /> Start Virtual Tour
          </Button>
          <Button variant="outline" size="lg" className="border-orange-400 text-orange-600 hover:bg-orange-100">
            <MapPin className="mr-2 h-5 w-5" /> Plan Your Visit
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl w-full"
        >
          <Card className="bg-white/80 backdrop-blur-md border border-orange-200 shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <Landmark className="h-8 w-8 text-orange-500" />
              <div>
                <h3 className="text-lg font-semibold">10M+ Pilgrims</h3>
                <p className="text-sm text-gray-600">Experience India's largest spiritual walk.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border border-orange-200 shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <Star className="h-8 w-8 text-orange-500" />
              <div>
                <h3 className="text-lg font-semibold">Rich Heritage</h3>
                <p className="text-sm text-gray-600">A journey through timeless devotion and culture.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-10 pb-10 md:absolute md:bottom-10 flex justify-center w-full"
        >
          <ArrowDown className="h-8 w-8 text-orange-500 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBannerSection;