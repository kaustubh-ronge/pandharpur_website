import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Youtube,
  Facebook, // Added Instagram and Facebook
} from "lucide-react";

// Combining your header navItems with other company links
export const companyLinks = [
  { name: "Home", href: "/" },
  { name: "Attractions", href: "/pandharpur-attractions" },
  { name: "Festivals", href: "/pandharpur-festivals" },
  { name: "Guide", href: "/pandharpur-darshan-yatra-guide" },
  { name: "Booking", href: "/pandharpur-bookings" },
  { name: "About Us", href: "/about" },
];

export const legalLinks = [
  { name: "FAQs & Help", href: "/about" },
  { name: "Emergency Contacts", href: "/emergency" },
];

export const contactDetails = {
  address: "Pandharpur, Maharashtra, India",
  phone: "+91 12345 67890",
  email: "info@pandharpurdarshan.in",
  icons: {
    address: <MapPin className="mr-3 h-5 w-5 flex-shrink-0" />,
    phone: <Phone className="mr-3 h-5 w-5 flex-shrink-0" />,
    email: <Mail className="mr-3 h-5 w-5 flex-shrink-0" />,
  },
};

export const socialLinks = [
  { href: "#", icon: <Linkedin size={20} /> },
  { href: "#", icon: <Instagram size={20} /> },
  { href: "#", icon: <Youtube size={20} /> },
  { href: "#", icon: <Facebook size={20} /> }, // Changed from Twitter to Facebook
];

// Placeholder images for the gallery
export const galleryImages = [
  "/footerimages/vitthal-image.jpg",
  "/footerimages/rukmini-image.jpg",
  "/footerimages/ppur-temple.jpg",
  "/footerimages/ppur-temple-2.jpg",
  "/footerimages/temple-5.jpeg",
  "/footerimages/ppur-temple-4.jpg",
];

export const footerBottomLinks = [
  { name: "Home", href: "/" },
  { name: "Cookies", href: "/cookies-policy" },
  { name: "Help", href: "/about" },
  { name: "FAQs", href: "/faqs" },
];
