import React from 'react';
import {
  Home, MapPin, CalendarDays, BookOpen, NotebookPen,
  HelpCircle, Phone,
  InfoIcon
} from "lucide-react";

export const navItems = [
  { name: "Pandharpur Darshan", href: "/", icon: <Home className="h-5 w-5" /> },
  { name: "Pandharpur Attractions", href: "/pandharpur-attractions", icon: <MapPin className="h-5 w-5" /> },
  { name: "Pandharpur Festivals", href: "/pandharpur-festivals", icon: <CalendarDays className="h-5 w-5" /> },
  { name: "Yatra&Darshan Guide", href: "/pandharpur-darshan-yatra-guide", icon: <BookOpen className="h-5 w-5" /> },
  { name: "Booking", href: "/pandharpur-bookings", icon: <NotebookPen className="h-5 w-5" /> }
];

export const quickLinks = [
  { name: "Emergency Contacts", href: "/emergency", icon: <Phone className="h-4 w-4 mr-2" /> },
  { name: "Help Center", href: "/about", icon: <InfoIcon className="h-4 w-4 mr-2" /> }
];