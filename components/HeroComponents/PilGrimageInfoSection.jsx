"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Heart } from "lucide-react";
import { AmberBackground } from "../AmberSharedBackground";

const PilgrimageInfoSection = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden">
      <AmberBackground />
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
  );
};

export default PilgrimageInfoSection;