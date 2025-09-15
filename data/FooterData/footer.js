import {
  MapPin, Phone, Mail, Twitter, Facebook, Youtube, Linkedin
} from 'lucide-react';

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
]

export const contactDetails = {
  address: "Pandharpur, Maharashtra, India",
  phone: "+91 12345 67890",
  email: "info@pandharpurdarshan.in",
  icons: {
    address: <MapPin className="mr-3 h-5 w-5 flex-shrink-0" />,
    phone: <Phone className="mr-3 h-5 w-5 flex-shrink-0" />,
    email: <Mail className="mr-3 h-5 w-5 flex-shrink-0" />,
  }
};

export const socialLinks = [
  { href: "#", icon: <Twitter size={20} /> },
  { href: "#", icon: <Facebook size={20} /> },
  { href: "#", icon: <Youtube size={20} /> },
  { href: "#", icon: <Linkedin size={20} /> },
];

// Placeholder images for the gallery
export const galleryImages = [
  '/images/gallery/vitthal-rukmini.jpg',
  '/images/gallery/chandrabhaga-ghat.jpg',
  '/images/gallery/pundalik-temple.jpg',
  '/images/gallery/wari-dindi.jpg',
  '/images/gallery/gopalpur.jpg',
  '/images/gallery/vishnupad-temple.jpg',
];

export const footerBottomLinks = [
  { name: "Home", href: "/" },
  { name: "Cookies", href: "/cookies-policy" },
  { name: "Help", href: "/about" },
  { name: "FAQs", href: "/faqs" },
];