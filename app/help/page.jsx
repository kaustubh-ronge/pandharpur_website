'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  HelpCircle, Phone, Mail, MessageSquare, MapPin, Clock, 
  ChevronRight, CheckCircle, XCircle, AlertCircle, 
  LifeBuoy, User, Calendar, Smartphone, Globe, MailCheck,
  BookOpen, Search, Download, AlertTriangle, Map,
  Ambulance
} from "lucide-react"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import dynamic from 'next/dynamic'

// Dynamically import 3D components to avoid SSR issues
const FloatingTemple = dynamic(() => import('@/components/floating-temple'), { 
  ssr: false,
  loading: () => <div className="w-64 h-64 bg-orange-100 rounded-full opacity-20" />
})

export default function HelpCenter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const faqs = [
    {
      question: "How do I report a missing person during the pilgrimage?",
      answer: "Visit our 'Report Missing Person' page and fill out the form with details. Our team will immediately alert volunteers along the route."
    },
    {
      question: "What emergency services are available during the yatra?",
      answer: "We provide 24/7 medical assistance, lost & found services, and police coordination at every major stop."
    },
    {
      question: "How can I locate medical facilities along the route?",
      answer: "Medical camps are marked on our interactive map (available in the mobile app) every 5km with emergency contact numbers."
    },
    {
      question: "What should I do if I lose my belongings?",
      answer: "Approach any volunteer station or visit the nearest 'Lost & Found' center. We recommend labeling your belongings with your contact info."
    }
  ]

  const supportChannels = [
    {
      icon: <Phone className="h-6 w-6 text-blue-500" />,
      title: "Emergency Hotline",
      description: "24/7 support for urgent assistance",
      contact: "+91 98765 43210",
      responseTime: "Immediate",
      badge: "Critical"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      title: "WhatsApp Support",
      description: "Text support with media sharing",
      contact: "+91 98765 43211",
      responseTime: "Within 15 minutes",
      badge: "Fast"
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-500" />,
      title: "Email Support",
      description: "Detailed inquiries and documentation",
      contact: "help@pandharpuryatra.org",
      responseTime: "Within 24 hours",
      badge: "Standard"
    },
    {
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      title: "Physical Centers",
      description: "In-person assistance along the route",
      contact: "12 locations along yatra path",
      responseTime: "During operating hours",
      badge: "Location"
    }
  ]

  const knowledgeBase = [
    {
      category: "Safety & Emergencies",
      icon: <Ambulance className="h-5 w-5" />,
      articles: [
        { title: "Emergency protocols during the yatra", views: 1245 },
        { title: "First aid stations locations", views: 892 },
        { title: "Dealing with heat exhaustion", views: 756 }
      ]
    },
    {
      category: "Logistics",
      icon: <Map className="h-5 w-5" />,
      articles: [
        { title: "Luggage transportation options", views: 1023 },
        { title: "Route maps and timelines", views: 1567 },
        { title: "Accommodation guide", views: 689 }
      ]
    },
    {
      category: "Spiritual Guidance",
      icon: <BookOpen className="h-5 w-5" />,
      articles: [
        { title: "Daily rituals schedule", views: 1789 },
        { title: "Important temples along the route", views: 1345 },
        { title: "Bhajan and kirtan timings", views: 967 }
      ]
    }
  ]

  const teamMembers = [
    {
      name: "Rajesh Patil",
      role: "Head of Pilgrim Support",
      expertise: "Emergency Response",
      avatar: "/team-1.jpg",
      years: 8
    },
    {
      name: "Priya Deshmukh",
      role: "Medical Coordinator",
      expertise: "First Aid & Health",
      avatar: "/team-2.jpg",
      years: 5
    },
    {
      name: "Vikram Joshi",
      role: "Logistics Manager",
      expertise: "Route Planning",
      avatar: "/team-3.jpg",
      years: 10
    },
    {
      name: "Ananya Kulkarni",
      role: "Volunteer Coordinator",
      expertise: "Community Support",
      avatar: "/team-4.jpg",
      years: 4
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 relative overflow-hidden" ref={containerRef}>
      {/* 3D Background Element */}
      <motion.div 
        className="absolute top-1/4 -right-20 w-64 h-64 z-0"
        style={{ y, opacity }}
      >
        <FloatingTemple />
      </motion.div>

      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-100/30 via-transparent to-transparent" />
        
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'bg-orange-200' : 'bg-amber-100'} rounded-full`}
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.2,
              filter: 'blur(40px)'
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
              rotate: [0, Math.random() * 180]
            }}
            transition={{
              duration: 30 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Badge variant="outline" className="mb-4 bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200">
                <LifeBuoy className="h-4 w-4 mr-2" /> Support Center
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              How can we help you today?
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Find answers, contact support, or explore our resources for the Pandharpur Yatra pilgrimage.
            </motion.p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="relative group">
              <Input
                placeholder="Search help articles, FAQs, or type your question..."
                className="h-14 text-lg pl-14 pr-6 shadow-lg border-2 border-orange-200 focus:border-orange-400 group-hover:shadow-xl transition-all duration-300"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
              <Button 
                size="lg" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 shadow-md group-hover:shadow-lg transition-all"
              >
                Search
              </Button>
            </div>
          </motion.div>

          {/* Main content tabs */}
          <Tabs defaultValue="faq" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 bg-orange-50 p-2 h-auto mb-12 rounded-xl border border-orange-200">
                <TabsTrigger 
                  value="faq" 
                  className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  <HelpCircle className="h-5 w-5 mr-2" /> FAQs
                </TabsTrigger>
                <TabsTrigger 
                  value="contact" 
                  className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  <Phone className="h-5 w-5 mr-2" /> Contact
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  <BookOpen className="h-5 w-5 mr-2" /> Resources
                </TabsTrigger>
                <TabsTrigger 
                  value="team" 
                  className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  <User className="h-5 w-5 mr-2" /> Our Team
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow group">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <AlertTriangle className="h-6 w-6 text-orange-500 group-hover:rotate-12 transition-transform" />
                      Emergency FAQs
                    </CardTitle>
                    <CardDescription>
                      Critical information for urgent situations during the pilgrimage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-orange-100">
                          <AccordionTrigger className="text-left hover:no-underline py-3 hover:text-orange-600 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="bg-orange-100 p-1 rounded-full group-hover:bg-orange-200 transition-colors">
                                <HelpCircle className="h-4 w-4 text-orange-600" />
                              </div>
                              {item.question}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-10 text-gray-600">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-orange-500" />
                        Preparation Guide
                      </CardTitle>
                      <CardDescription>
                        Essential information before you start your journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">What to pack</h4>
                            <p className="text-sm text-gray-600">
                              Comfortable walking shoes, light cotton clothes, water bottle, basic medicines.
                            </p>
                          </div>
                        </div>
                        <Separator className="bg-orange-100" />
                        <div className="flex items-start gap-4">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Registration</h4>
                            <p className="text-sm text-gray-600">
                              All pilgrims must register online or at designated centers before joining.
                            </p>
                          </div>
                        </div>
                        <Separator className="bg-orange-100" />
                        <div className="flex items-start gap-4">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">Prohibited items</h4>
                            <p className="text-sm text-gray-600">
                              Alcohol, non-vegetarian food, plastic bottles (use reusable containers).
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Smartphone className="h-6 w-6 text-orange-500" />
                        Mobile App Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <motion.div 
                          className="bg-orange-100 p-4 rounded-xl shadow-inner"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="bg-white p-2 rounded-lg shadow-inner">
                            <div className="bg-gray-100 w-32 h-56 rounded border border-gray-200 flex flex-col">
                              <div className="bg-orange-500 h-8 rounded-t flex items-center justify-center">
                                <span className="text-white text-xs font-medium">Pandharpur Yatra</span>
                              </div>
                              <div className="p-2 flex-grow space-y-2">
                                <div className="bg-orange-100 rounded h-4"></div>
                                <div className="bg-orange-100 rounded h-4 w-3/4"></div>
                                <div className="bg-orange-100 rounded h-4 w-1/2"></div>
                                <div className="bg-gray-200 rounded-full h-8 w-8 mx-auto mt-4"></div>
                                <div className="bg-gray-200 rounded h-3 w-full mt-6"></div>
                                <div className="bg-gray-200 rounded h-3 w-2/3 mx-auto"></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        <div className="flex-grow">
                          <h3 className="font-medium mb-2">Key Features:</h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Real-time route tracking
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Emergency alert system
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Offline maps and guides
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Medical facility locator
                            </li>
                          </ul>
                          <Button className="mt-4 bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transition-all">
                            Download App <Download className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Contact Support Tab */}
            <TabsContent value="contact">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="space-y-6">
                  <Card className="border-orange-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl">Contact Channels</CardTitle>
                      <CardDescription>
                        Choose the best way to reach our support team
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {supportChannels.map((channel, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card className="border-gray-200 hover:border-orange-300 transition-colors cursor-pointer group">
                            <CardContent className="p-4 flex items-start gap-4">
                              <div className="bg-orange-50 p-2 rounded-full group-hover:bg-orange-100 transition-colors">
                                {channel.icon}
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium group-hover:text-orange-600 transition-colors">
                                    {channel.title}
                                  </h3>
                                  <Badge variant="outline" className={
                                    channel.badge === "Critical" ? "border-red-200 bg-red-50 text-red-600" :
                                    channel.badge === "Fast" ? "border-green-200 bg-green-50 text-green-600" :
                                    "border-blue-200 bg-blue-50 text-blue-600"
                                  }>
                                    {channel.badge}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{channel.description}</p>
                                <div className="mt-2 flex items-center gap-2">
                                  <span className="text-sm font-medium">Contact:</span>
                                  <span className="text-sm text-orange-600">{channel.contact}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-gray-500" />
                                  <span className="text-xs text-gray-500">Response time: {channel.responseTime}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl">Support Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Emergency Hotline</span>
                            <span className="text-xs text-green-600">24/7</span>
                          </div>
                          <Progress 
                            value={100} 
                            className="h-2 bg-green-100" 
                            indicatorClassName={cn(
                              "bg-green-500",
                              "data-[state=indeterminate]:animate-pulse"
                            )}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">WhatsApp Support</span>
                            <span className="text-xs text-blue-600">6AM - 11PM</span>
                          </div>
                          <Progress 
                            value={70} 
                            className="h-2 bg-blue-100" 
                            indicatorClassName={cn(
                              "bg-blue-500",
                              "data-[state=indeterminate]:animate-pulse"
                            )}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Physical Centers</span>
                            <span className="text-xs text-orange-600">7AM - 9PM</span>
                          </div>
                          <Progress 
                            value={58} 
                            className="h-2 bg-orange-100" 
                            indicatorClassName={cn(
                              "bg-orange-500",
                              "data-[state=indeterminate]:animate-pulse"
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-orange-200 shadow-lg sticky top-6 h-fit">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      We'll respond to your inquiry as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="What's this about?" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your issue or question..."
                          className="min-h-[150px]"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transition-all"
                      >
                        Send Message <MailCheck className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <Card className="border-orange-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Knowledge Base</CardTitle>
                    <CardDescription>
                      Browse our collection of guides and articles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {knowledgeBase.map((category, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="border-gray-200 hover:border-orange-300 transition-colors">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                                  {category.icon}
                                </div>
                                {category.category}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {category.articles.map((article, idx) => (
                                <div key={idx} className="group">
                                  <div className="flex items-center justify-between py-2">
                                    <span className="text-sm font-medium group-hover:text-orange-600 transition-colors">
                                      {article.title}
                                    </span>
                                    <span className="text-xs text-gray-500">{article.views} views</span>
                                  </div>
                                  {idx < category.articles.length - 1 && <Separator className="bg-orange-100" />}
                                </div>
                              ))}
                            </CardContent>
                            <CardFooter>
                              <Button variant="link" className="text-orange-600 p-0 h-auto">
                                View all {category.category.toLowerCase()} articles <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Downloadable Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: "Route Map PDF", type: "PDF", size: "2.4 MB", icon: <MapPin className="h-5 w-5" /> },
                        { title: "Packing Checklist", type: "PDF", size: "1.1 MB", icon: <BookOpen className="h-5 w-5" /> },
                        { title: "Emergency Contacts", type: "PDF", size: "0.8 MB", icon: <Phone className="h-5 w-5" /> },
                        { title: "Mobile App Guide", type: "Video", size: "15.2 MB", icon: <Smartphone className="h-5 w-5" /> }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                            <CardContent className="p-4 flex items-start gap-4">
                              <div className="bg-orange-100 p-3 rounded-lg text-orange-600 group-hover:bg-orange-200 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h3 className="font-medium group-hover:text-orange-600 transition-colors">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {item.type} • {item.size}
                                </p>
                                <Button variant="link" size="sm" className="text-orange-600 p-0 h-auto mt-2">
                                  Download <Download className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Interactive Map</CardTitle>
                    <CardDescription>
                      Explore the pilgrimage route with key points of interest
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-orange-50 rounded-xl p-4 h-64 flex items-center justify-center border border-orange-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/map-pattern.svg')] opacity-10" />
                      <div className="text-center z-10">
                        <Globe className="h-10 w-10 text-orange-400 mx-auto mb-3" />
                        <h3 className="font-medium text-gray-700">Interactive Route Map</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-3">
                          Available in our mobile app with real-time tracking
                        </p>
                        <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                          View Web Version
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <Card className="border-orange-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Meet Our Support Team</CardTitle>
                    <CardDescription>
                      Dedicated professionals ensuring your pilgrimage is safe and memorable
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {teamMembers.map((member, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="border-gray-200 hover:shadow-md transition-all overflow-hidden group">
                            <div className="relative h-48 bg-gradient-to-b from-orange-100 to-orange-50 flex items-center justify-center">
                              <Avatar className="h-24 w-24 border-4 border-white shadow-md group-hover:scale-105 transition-transform">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                                <h3 className="font-medium text-white">{member.name}</h3>
                                <p className="text-xs text-orange-200">{member.role}</p>
                              </div>
                            </div>
                            <CardContent className="p-4 mt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{member.expertise}</span>
                                <Badge variant="outline" className="border-orange-200 text-orange-600">
                                  {member.years} yrs
                                </Badge>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-4 border-orange-200 text-orange-600 hover:bg-orange-50 group-hover:border-orange-300 group-hover:text-orange-700 transition-colors"
                              >
                                Contact
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Volunteer With Us</CardTitle>
                    <CardDescription>
                      Join our team of dedicated volunteers supporting the pilgrimage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium text-lg mb-4">Volunteer Roles Available:</h3>
                        <ul className="space-y-3">
                          {[
                            "Medical Support Volunteers",
                            "Route Guidance Assistants",
                            "Language Interpreters",
                            "Food Distribution Coordinators",
                            "Lost & Found Helpers",
                            "Emergency Response Team"
                          ].map((role, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Card className="border-orange-200">
                        <CardHeader>
                          <CardTitle>Volunteer Application</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="v-name">Full Name</Label>
                              <Input id="v-name" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="v-email">Email</Label>
                              <Input id="v-email" type="email" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="v-phone">Phone Number</Label>
                              <Input id="v-phone" placeholder="+91 " />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="v-role">Preferred Role</Label>
                              <Input id="v-role" placeholder="Which role interests you?" />
                            </div>
                            <Button 
                              type="submit" 
                              className="w-full bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transition-all"
                            >
                              Apply to Volunteer
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
                {/* Footer Section */}
        <motion.footer 
          className="mt-24 py-12 border-t border-orange-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pandharpur Yatra</h3>
                <p className="text-sm text-gray-600">
                  Supporting pilgrims with care and devotion since 1985.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Home</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Route Map</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Registration</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Safety Guidelines</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Subscribe to our newsletter for updates
                  </p>
                  <div className="mt-2 flex">
                    <Input 
                      type="email" 
                      placeholder="Your email" 
                      className="rounded-r-none border-r-0 focus:ring-0 focus:border-orange-300"
                    />
                    <Button className="rounded-l-none bg-orange-600 hover:bg-orange-700">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-orange-100">
              <p className="text-xs text-gray-500 text-center">
                &copy; {new Date().getFullYear()} Pandharpur Yatra Support Services. All rights reserved.
              </p>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Floating Help Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          size="lg" 
          className="rounded-full h-16 w-16 shadow-xl bg-orange-600 hover:bg-orange-700 text-white"
        >
          <LifeBuoy className="h-6 w-6" />
          <span className="sr-only">Help</span>
        </Button>
      </motion.div>

      {/* 3D hover effect styles */}
      <style jsx global>{`
        .perspective-container {
          perspective: 1000px;
        }
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .card-3d:hover {
          transform: rotateY(10deg) rotateX(5deg) translateZ(20px);
        }
      `}</style>
    </div>
  )
}