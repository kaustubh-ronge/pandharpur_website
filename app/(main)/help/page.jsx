
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  HelpCircle,
  MessageSquare,
  Wand2,
  Search,
  Mail,
  Phone,
  Heart,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AmberBackground } from "@/components/AmberSharedBackground";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animated component wrapper
const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function StaticHelpAboutPage() {
  return (
    <main className="min-h-screen mt-10">
      <AmberBackground />
      <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* 1. Page Header with animation */}
        <AnimatedSection className="text-center mb-16">
          <Badge variant="outline" className="mb-4 py-1 px-3 bg-orange-50 text-orange-700 border-orange-200">
            <Sparkles className="h-3 w-3 mr-1" /> Your Guide to Pandharpur
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
            About & Help Center
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Learn about our mission and find answers to your questions about PandharpurDarshan.com.
          </p>
        </AnimatedSection>

        {/* 2. About Us Section with enhanced design */}
        <AnimatedSection className="mb-16">
          <Card className="shadow-lg border-slate-200 bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-1"></div>
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl sm:text-3xl">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                Our Story & Mission
              </CardTitle>
              <CardDescription className="text-base pt-2 text-slate-700">
                We are a passionate team with deep roots in Pandharpur, dedicated to making your pilgrimage experience seamless and memorable. Our platform was born from a desire to solve a real-world problem: the difficulty of finding consolidated and reliable information for planning a trip to this sacred town. Combining our expertise in technology with our love for our culture, we built a comprehensive platform to serve pilgrims and visitors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <Heart className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Passion-Driven</h3>
                    <p className="text-sm text-slate-600">Built with love for our culture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Local Expertise</h3>
                    <p className="text-sm text-slate-600">Deep knowledge of Pandharpur</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <Target className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Visitor-Focused</h3>
                    <p className="text-sm text-slate-600">Designed for pilgrims' needs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <Separator className="my-12" />

        {/* 3. Help Categories Section with enhanced cards */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">How Can We Help?</h2>
            <p className="mt-2 text-md text-slate-600">Explore our main features to find what you're looking for</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <motion.div variants={fadeIn}>
              <Card className="text-center group hover:shadow-lg transition-all duration-300 border-slate-200 h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 group-hover:scale-110 transition-transform duration-300">
                    <Wand2 className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>AI Trip Planner</CardTitle>
                  <CardDescription>Learn how to generate personalized itineraries with our advanced AI technology</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="mt-2 group-hover:bg-orange-50">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="text-center group hover:shadow-lg transition-all duration-300 border-slate-200 h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Bookings & Inquiries</CardTitle>
                  <CardDescription>Understand our direct-to-business WhatsApp booking system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="mt-2 group-hover:bg-blue-50">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="text-center group hover:shadow-lg transition-all duration-300 border-slate-200 h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 group-hover:scale-110 transition-transform duration-300">
                    <Search className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Exploring the Site</CardTitle>
                  <CardDescription>Find comprehensive info on temples, hotels, and attractions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="mt-2 group-hover:bg-green-50">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <Separator className="my-12" />

        {/* 4. Frequently Asked Questions Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-md text-slate-600">Quick answers to common questions</p>
          </div>
          
          <Card className="w-full max-w-3xl mx-auto shadow-md border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-orange-500" />
                Common Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg text-left font-semibold hover:text-orange-600">
                    How does the AI Trip Planner work?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base">
                    Go to the "AI Trip" section, describe your trip, enter your details (days, people, budget), and click "Generate". Our system uses Google's Gemini API to create a detailed, day-by-day plan for your visit.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg text-left font-semibold hover:text-orange-600">
                    What happens when I send a WhatsApp Inquiry?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base">
                    Your inquiry is sent directly to the business owner's WhatsApp number. PandharpurDarshan.com does not act as a middleman. This ensures you get a faster response and we take 0% commission from local businesses.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg text-left font-semibold hover:text-orange-600">
                    Is an account required to use the website?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base">
                    An account is not required to browse the site or make inquiries. You only need to sign in if you wish to save your AI-generated travel plans to your dashboard for future access.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg text-left font-semibold hover:text-orange-600">
                    How accurate is the information on your platform?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base">
                    We regularly update our information and work directly with local businesses to ensure accuracy. However, we always recommend verifying critical details like opening hours and prices directly with the establishments.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </AnimatedSection>

        <Separator className="my-12" />

        {/* 5. Values Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our Values</h2>
            <p className="mt-2 text-md text-slate-600">What drives everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center border-slate-200 group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <Heart className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Cultural Preservation</CardTitle>
                <CardDescription>We honor and promote the rich cultural heritage of Pandharpur while making it accessible to all visitors.</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center border-slate-200 group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Transparency</CardTitle>
                <CardDescription>We believe in direct connections between visitors and businesses with no hidden fees or commissions.</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center border-slate-200 group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>We strive to make information about Pandharpur easily accessible to everyone, regardless of technical proficiency.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </AnimatedSection>

        {/* 6. Contact Information Section */}
        <AnimatedSection>
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Get in Touch</h2>
            <p className="mt-2 text-md text-slate-600">We're here to help with any questions</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Email Us</CardTitle>
                    <CardDescription>For general questions and support</CardDescription>
                    <p className="text-orange-600 font-semibold pt-1 text-sm md:text-md lg:text-md">help@pandharpurdarshan.com</p>
                  </div>
                </CardHeader>
              </Card>
              
              <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Call Us</CardTitle>
                    <CardDescription>For urgent inquiries</CardDescription>
                    <p className="text-blue-600 font-semibold pt-1">+91 12345 67890</p>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}