import React from 'react';
import {
  Home, MapPin, CalendarDays, BookOpen, NotebookPen,
  HelpCircle, Phone,
  InfoIcon
} from "lucide-react";

export const navItems = [
  { name: "Pandharpur Darshan", href: "/", icon: <Home className="h-5 w-5" /> },
  { name: "Pandharpur Attractions", href: "/other-attractions", icon: <MapPin className="h-5 w-5" /> },
  { name: "Pandharpur Festivals", href: "/festivals", icon: <CalendarDays className="h-5 w-5" /> },
  { name: "Yatra&Darshan Guide", href: "/guide", icon: <BookOpen className="h-5 w-5" /> },
  { name: "Booking", href: "/information-page", icon: <NotebookPen className="h-5 w-5" /> }
];

export const quickLinks = [
  { name: "Emergency Contacts", href: "/emergency", icon: <Phone className="h-4 w-4 mr-2" /> },
  { name: "Help Center", href: "/help", icon: <InfoIcon className="h-4 w-4 mr-2" /> }
];