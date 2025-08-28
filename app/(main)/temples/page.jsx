
"use client";

import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";

const sliderImages = [
  "/mandirpandharpur.jpg",
  "/pandharpurmandir2.webp",
  "/pandharpurtemple1.jpg",
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
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    const fetchTemples = async () => {
      const query = `*[_type == "temple"] {
        name,
        "image": image.asset->url,
        description,
        topAttraction,
        timing,
        location,
        reverse
      }`;
      const data = await client.fetch(query);
      setTemples(data);
    };

    fetchTemples();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fetchReviews = async () => {
    return Promise.resolve(testimonials);
  };

  const submitReview = async (data) => {
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
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-8 bg-gradient-to-t from-orange-100 via-white to-orange-50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-30"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
          <motion.div
            className="absolute top-20 left-60 w-32 h-32 bg-orange-400 rounded-full opacity-25"
            animate={{ y: [0, 25, 0] }}
            transition={{ repeat: Infinity, duration: 7 }}
          />
          <motion.div
            className="absolute bottom-40 left-24 w-28 h-28 bg-orange-500 rounded-full opacity-15"
            animate={{ x: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 6.5 }}
          />
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
                  className={`flex flex-col md:flex-row items-center mb-16 bg-gray-100 shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl ${temple.reverse ? 'md:flex-row-reverse' : ''}`}
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