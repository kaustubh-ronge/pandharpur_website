import React from 'react';
import {
  Home, MapPin, CalendarDays, BookOpen, NotebookPen,
  HelpCircle, Phone
} from "lucide-react";

export const navItems = [
  { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
  { name: "Attractions", href: "/other-attractions", icon: <MapPin className="h-5 w-5" /> },
  { name: "Festivals", href: "/festivals", icon: <CalendarDays className="h-5 w-5" /> },
  { name: "Guide", href: "/guide", icon: <BookOpen className="h-5 w-5" /> },
  { name: "Booking", href: "/information-page", icon: <NotebookPen className="h-5 w-5" /> }
];

export const quickLinks = [
  { name: "Emergency Contacts", href: "/emergency", icon: <Phone className="h-4 w-4 mr-2" /> },
  { name: "Help Center", href: "/help", icon: <HelpCircle className="h-4 w-4 mr-2" /> }
];