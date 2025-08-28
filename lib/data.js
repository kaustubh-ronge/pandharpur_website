import React from 'react';
import { Flag, BookOpen, MapPin, Droplets, Heart, Landmark } from "lucide-react";

export const pandharpurEvents = [
  {
    id: 1,
    title: "Ashadhi Ekadashi",
    description: "Largest Warkari pilgrimage with Lord Vitthal worship and grand processions.",
    location: "Pandharpur",
    startDate: "06-25",
    endDate: "07-05",
    icon: <Flag className="h-6 w-6" />,
    color: "bg-orange-100"
  },
  {
    id: 2,
    title: "Guru Purnima",
    description: "Devotional rituals honoring spiritual gurus at Vitthal temple.",
    location: "Pandharpur",
    startDate: "07-18",
    endDate: "07-20",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-blue-100"
  },
  {
    id: 3,
    title: "Pandharpur Yatra",
    description: "Annual chariot procession of Lord Vitthal's idol through the city.",
    location: "Pandharpur",
    startDate: "08-12",
    endDate: "08-18",
    icon: <MapPin className="h-6 w-6" />,
    color: "bg-green-100"
  },
  {
    id: 4,
    title: "Kartiki Ekadashi",
    description: "Winter pilgrimage of Warkaris with special night prayers.",
    location: "Pandharpur",
    startDate: "11-15",
    endDate: "11-20",
    icon: <Droplets className="h-6 w-6" />,
    color: "bg-purple-100"
  },
  {
    id: 5,
    title: "Makar Sankranti",
    description: "Holy dip in Chandrabhaga River during the harvest festival.",
    location: "Pandharpur",
    startDate: "01-14",
    endDate: "01-16",
    icon: <Heart className="h-6 w-6" />,
    color: "bg-yellow-100"
  },
  {
    id: 6,
    title: "Shivaji Jayanti",
    description: "Celebrations honoring Chhatrapati Shivaji Maharaj's birth anniversary.",
    location: "Pandharpur",
    startDate: "02-19",
    endDate: "02-21",
    icon: <Landmark className="h-6 w-6" />,
    color: "bg-red-100"
  }
];

export const faqs = {
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