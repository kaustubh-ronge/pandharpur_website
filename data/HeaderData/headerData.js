import React from 'react';
import {
  Home, MapPin, CalendarDays, BookOpen, NotebookPen,
  HelpCircle, Phone,
  InfoIcon,
  Landmark
} from "lucide-react";

export const navItems = [
  { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
  { name: "Attractions", href: "/pandharpur-attractions", icon: <MapPin className="h-5 w-5" /> },
  { name: "Pandharpur Festivals", href: "/pandharpur-festivals", icon: <CalendarDays className="h-5 w-5" /> },
  { name: "Temples", href: "/pandharpur-bookings/temples", icon: <Landmark className="h-5 w-5" /> },
  { name: "Yatra&Darshan Guide", href: "/pandharpur-darshan-yatra-guide", icon: <BookOpen className="h-5 w-5" /> },
  { name: "Bookings", href: "/pandharpur-bookings", icon: <NotebookPen className="h-5 w-5" /> },
];

export const quickLinks = [
  { name: "Emergency Contacts", href: "/emergency", icon: <Phone className="h-4 w-4 mr-2" /> },
  { name: "Help Center", href: "/about", icon: <InfoIcon className="h-4 w-4 mr-2" /> }
];