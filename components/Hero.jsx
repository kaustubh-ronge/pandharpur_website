

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { 
  Star, PlayCircle, MapPin, Landmark, ArrowDown, Calendar, 
  Users, Heart, Clock, BookOpen, ChevronRight, Flag, Droplets,
  Loader2
} from "lucide-react";

// Timeline data
const timelineData = [
  {
    title: "Flag Off Ceremony",
    date: "June 15, 2025",
    description: "Traditional ceremony marking the beginning of the pilgrimage from Alandi.",
    location: "Alandi",
    distance: "0 km",
    icon: <Flag className="h-6 w-6" />
  },
  {
    title: "First Major Stop",
    date: "June 18, 2025",
    description: "Devotees gather for night-long bhajan sessions and spiritual discourses.",
    location: "Phulewadi",
    distance: "45 km",
    icon: <MapPin className="h-6 w-6" />
  },
  {
    title: "Mid-point Celebration",
    date: "June 22, 2025",
    description: "Special puja and community meals served to all pilgrims.",
    location: "Shirala",
    distance: "120 km",
    icon: <Heart className="h-6 w-6" />
  },
  {
    title: "Final Approach",
    date: "June 28, 2025",
    description: "Pilgrims take holy dip in Chandrabhaga river before darshan.",
    location: "Pandharpur",
    distance: "250 km",
    icon: <Droplets className="h-6 w-6" />
  }
];

// FAQ data
const faqs = {
  general: [
    {
      question: "What is the best time to join the yatra?",
      answer: "The main pilgrimage happens during Ashadhi Ekadashi (usually July), but joining 1-2 weeks before allows you to experience the full journey."
    },
    {
      question: "Is there an age limit for participants?",
      answer: "No age limit, but children under 12 and seniors over 70 should be accompanied by family members."
    },
    {
      question: "What should I bring for the yatra?",
      answer: "Comfortable walking shoes, light cotton clothes, water bottle, basic medicines, and minimal personal items."
    }
  ],
  logistics: [
    {
      question: "How are accommodations arranged?",
      answer: "Basic dormitory-style accommodations are available along the route. You can also bring your own tent."
    },
    {
      question: "Is medical assistance available?",
      answer: "Yes, medical camps with doctors and first aid are set up every 10-15 km along the route."
    },
    {
      question: "How do I transport my luggage?",
      answer: "Volunteer-operated luggage trucks follow the procession. You can also hire porters at major stops."
    }
  ],
  spiritual: [
    {
      question: "What are the daily rituals during the yatra?",
      answer: "Morning prayers, bhajan sessions, spiritual discourses, and evening aartis are conducted daily."
    },
    {
      question: "Can I join for just part of the yatra?",
      answer: "Yes, many devotees join for sections of the journey based on their availability."
    },
    {
      question: "What is the significance of the palkhi?",
      answer: "The palkhi carries the padukas (footwear) of saints, symbolizing their presence on the journey."
    }
  ]
};

const Hero = () => {
  const [testimonial, setTestimonial] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("testimonials");
  const [fetchedTestimonials, setFetchedTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        
        const querySnapshot = await getDocs(q);
        const testimonialsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().createdAt?.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) || 'Recent'
        }));
        
        setFetchedTestimonials(testimonialsData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast.error("Failed to load testimonials");
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    
    if (!testimonial.name.trim() || !testimonial.message.trim()) {
      toast.error("Please fill in name and message");
      return;
    }

    setIsSubmitting(true);

    try {
      const testimonialData = {
        name: testimonial.name.trim(),
        message: testimonial.message.trim(),
        rating: testimonial.rating,
        approved: false,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      if (testimonial.email.trim()) {
        testimonialData.email = testimonial.email.trim();
      }

      await addDoc(collection(db, "testimonials"), testimonialData);

      toast.success("Thank you for your testimonial! It will be reviewed soon.");
      setTestimonial({ name: "", email: "", message: "", rating: 5 });
      setActiveTab("testimonials");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const RatingSelector = ({ value, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-xl transition-colors ${star <= value ? 'text-orange-500' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] md:h-screen overflow-hidden bg-gradient-to-t from-orange-100 via-white to-orange-50">
        {/* Background floating circles */}
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

        {/* Left and Right Corner Images */}
        <div className="absolute top-0 left-0 z-10 p-6">
          <img src="/vitthal-solo-image.png" alt="Shri Vitthal" className="h-120 pl-10" />
        </div>
        <div className="absolute top-0 right-0 z-10 p-6">
          <img src="/rukmini-solo-img.png" alt="Mata Rukmini" className="h-100 mt-10 pr-12" />
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col h-full items-center justify-center px-6 md:px-12 text-center text-gray-800">
          
          {/* Badge */}
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

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 max-w-4xl"
          >
            Discover the <span className="text-orange-500">Magic</span> of 
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Pandharpur Yatra
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl text-lg md:text-xl text-gray-700 mb-8"
          >
            Walk the sacred path walked by millions — an unforgettable spiritual journey to Lord Vitthal's abode.
          </motion.p>

          {/* Buttons */}
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

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl px-6"
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

          {/* Down arrow for scroll */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-10 flex justify-center w-full"
          >
            <ArrowDown className="h-8 w-8 text-orange-500 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
              The Sacred Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Divine Pilgrimage</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              The Pandharpur Yatra is one of the most significant pilgrimages in Maharashtra, attracting millions of devotees annually.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="text-orange-600" />,
                title: "Historical Significance",
                description: "Dating back to the 13th century, this pilgrimage follows the tradition of saints like Dnyaneshwar and Tukaram."
              },
              {
                icon: <Users className="text-orange-600" />,
                title: "Cultural Experience",
                description: "Witness the vibrant procession of palkhis (palanquins) carrying the padukas (footwear) of saints."
              },
              {
                icon: <Heart className="text-orange-600" />,
                title: "Spiritual Awakening",
                description: "Join the collective devotion as pilgrims chant 'Vitthal Vitthal' along the banks of Chandrabhaga river."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <motion.div 
                      className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.icon}
                    </motion.div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-6 md:px-12 bg-orange-50 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
              Journey Timeline
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Events of the Yatra</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              The pilgrimage follows a traditional schedule with significant events along the route.
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-200 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <motion.div whileHover={{ y: -5 }}>
                      <Card className="p-6 shadow-md border-orange-200 bg-white/90 backdrop-blur-sm">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription className="text-orange-600">{item.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                  <motion.div
                    className="w-16 h-16 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center shadow-lg z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-orange-600">
                      {item.icon}
                    </div>
                  </motion.div>
                  <div className={`flex-1 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                    <h3 className="font-semibold text-gray-900">{item.location}</h3>
                    <p className="text-sm text-gray-500">{item.distance}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Form */}
      <section className="relative py-20 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-orange-400 text-orange-600">
              Devotee Experiences
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Journey</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Hear from fellow pilgrims or share your own spiritual experience
            </p>
          </motion.div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="form">Share Your Story</TabsTrigger>
            </TabsList>

            <TabsContent value="testimonials">
              {loadingTestimonials ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                </div>
              ) : fetchedTestimonials.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No testimonials yet. Be the first to share your experience!
                </div>
              ) : (
                <Carousel className="w-full max-w-4xl mx-auto">
                  <CarouselContent>
                    {fetchedTestimonials.map((item) => (
                      <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2 h-full">
                          <motion.div whileHover={{ y: -5 }} className="h-full">
                            <Card className="h-full bg-white/90 backdrop-blur-sm border border-orange-100 flex flex-col">
                              <CardContent className="flex flex-col p-6 flex-grow">
                                <div className="flex items-center gap-4 mb-4">
                                  <Avatar>
                                    <AvatarImage src={item.avatar} />
                                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.date}</p>
                                  </div>
                                </div>
                                <div className="flex-grow">
                                  <p className="text-gray-600 mb-4 italic line-clamp-4">"{item.message}"</p>
                                </div>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < item.rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              )}
            </TabsContent>

            <TabsContent value="form">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <Card className="w-full max-w-md border border-orange-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Share Your Experience</CardTitle>
                    <CardDescription>Tell us about your spiritual journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={testimonial.name}
                          onChange={(e) => setTestimonial({...testimonial, name: e.target.value})}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={testimonial.email}
                          onChange={(e) => setTestimonial({...testimonial, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Your Rating *</Label>
                        <RatingSelector 
                          value={testimonial.rating} 
                          onChange={(rating) => setTestimonial({...testimonial, rating})} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Your Experience *</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={testimonial.message}
                          onChange={(e) => setTestimonial({...testimonial, message: e.target.value})}
                          placeholder="Share your spiritual journey..."
                          required
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : "Share Your Story"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-r from-orange-500 to-red-500 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4 bg-white text-orange-600">
              Limited Availability
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Sacred Journey 2025</h2>
            <p className="text-xl text-orange-100 mb-8">
              Register now to secure your spot in this transformative spiritual experience.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg shadow-xl">
                Register Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-orange-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Early bird discounts available</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Free pilgrimage guide</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-6 md:px-12 bg-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Find answers to common questions about the Pandharpur Yatra.
            </p>
          </motion.div>

          <Tabs defaultValue="general" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="logistics">Logistics</TabsTrigger>
                <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
              </TabsList>
            </motion.div>
            
            {Object.entries(faqs).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-4">
                  {items.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-white/90 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Hero;