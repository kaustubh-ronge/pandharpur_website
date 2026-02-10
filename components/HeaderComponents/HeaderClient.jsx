'use client'

import { useState, useEffect } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Languages, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Sheet, SheetContent, SheetTrigger, SheetClose,
    SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet"
import { navItems, quickLinks } from "@/data/HeaderData/headerData"

// Define the languages and their codes for the translator
const supportedLanguages = [
    { name: "English", code: "en" },
    { name: "हिंदी", code: "hi" },
    { name: "मराठी", code: "mr" },
    { name: "ಕನ್ನಡ", code: "kn" }
];

// COMPREHENSIVE SEO METADATA FOR ALL SERVICES
const PAGE_SEO_METADATA = {
    '/': {
        title: "Pandharpur Darshan - Live Vitthal Temple, Hotel Booking & Travel Planning 2024",
        description: "Book hotels, lodges, restaurants in Pandharpur. Plan your pilgrimage with travel planner, get live darshan, temple timings, and explore all tourist places. Complete Pandharpur Yatra guide.",
        keywords: "Pandharpur hotel booking, Pandharpur lodge booking, Pandharpur restaurant booking, travel planner Pandharpur, Pandharpur pilgrimage planning, Vitthal temple darshan, Pandharpur tourist places"
    },
    '/live-darshan': {
        title: "Live Darshan Pandharpur 24/7 - Watch Vitthal Temple Live Streaming Online",
        description: "Watch live darshan of Lord Vitthal Rukmini Temple Pandharpur. HD quality live streaming from sanctum sanctorum for devotees worldwide.",
        keywords: "Live darshan Pandharpur, Vitthal temple live streaming, online darshan, temple live camera, watch Vitthal live, 24/7 darshan"
    },
    '/booking': {
        title: "Pandharpur Booking - Hotels, Lodges, Restaurants & Kirtankar Booking Online",
        description: "Book hotels, lodges, guest houses, restaurants, and kirtankars in Pandharpur. Best accommodation near Vitthal temple with affordable rates for pilgrims.",
        keywords: "Pandharpur hotel booking online, lodge booking Pandharpur, restaurant reservation Pandharpur, kirtankar booking, accommodation near temple, pilgrimage stay"
    },
    '/travel-planner': {
        title: "Pandharpur Travel Planner - Complete Pilgrimage Itinerary & Guide 2024",
        description: "Plan your Pandharpur Yatra with our travel planner. Custom itineraries, temple visit schedules, transportation, and complete pilgrimage planning tools.",
        keywords: "Pandharpur travel planner, pilgrimage itinerary, yatra planning, temple visit schedule, travel guide Pandharpur, pilgrimage route planning"
    },
    '/temples': {
        title: "All Temples in Pandharpur - Complete Guide with Locations & Timings",
        description: "Explore all temples in Pandharpur besides Vitthal temple. Locations, timings, history, and significance of each temple for complete pilgrimage experience.",
        keywords: "Temples in Pandharpur, Vitthal temple, other Pandharpur temples, temple locations, temple guide, historical temples, spiritual places"
    },
    '/tourist-places': {
        title: "Tourist Places in Pandharpur - Attractions, Sightseeing & Places to Visit",
        description: "Discover top tourist attractions and places to visit in Pandharpur. Historical sites, spiritual centers, and cultural landmarks for complete pilgrimage experience.",
        keywords: "Pandharpur tourist places, places to visit in Pandharpur, sightseeing attractions, historical sites, cultural landmarks, pilgrimage attractions"
    },
    '/temple-timings': {
        title: "Pandharpur Temple Timings 2024 - Daily Schedule, Aarti & Darshan Times",
        description: "Complete schedule of Shri Vitthal Rukmini Temple Pandharpur. Opening hours, darshan timings, aarti schedules, and special festival timings.",
        keywords: "Pandharpur temple timings, Vitthal temple schedule, darshan timings today, aarti time, temple opening hours, festival schedule"
    },
    '/gallery': {
        title: "Pandharpur Temple Gallery - Divine Photos, Videos & Virtual Tour",
        description: "Explore divine images, photos, videos, and virtual tours of Pandharpur temples. Temple architecture, deity images, and pilgrimage moments.",
        keywords: "Pandharpur temple photos, Vitthal images, temple gallery, virtual tour, pilgrimage photos, temple architecture"
    },
    '/about': {
        title: "About Pandharpur Darshan - Complete Pilgrimage Services & Our Mission",
        description: "Learn about our comprehensive Pandharpur pilgrimage services including live darshan, hotel booking, travel planning, and temple information services.",
        keywords: "About Pandharpur Darshan, pilgrimage services, our mission, temple services, booking platform, travel assistance"
    },
    '/contact': {
        title: "Contact Pandharpur Darshan - Hotel Booking Support & Travel Assistance",
        description: "Contact us for hotel booking support, travel planning assistance, pilgrimage queries, and live darshan technical support.",
        keywords: "Contact Pandharpur Darshan, booking support, travel assistance, pilgrimage help, customer support, technical support"
    },
    '/join-us': {
        title: "Join Pandharpur Darshan - Volunteers, Hotels & Service Providers Registration",
        description: "Join our network as hotel/lodge owner, restaurant, kirtankar, travel guide, or volunteer. Register your services for pilgrims.",
        keywords: "Join Pandharpur platform, hotel registration, service provider registration, volunteer registration, partner with us, business listing"
    },
    '/super-admin': {
        title: "Admin Dashboard - Manage Pandharpur Darshan Bookings & Content",
        description: "Administrative dashboard for managing hotel bookings, travel plans, temple information, and website content.",
        keywords: "Admin dashboard, booking management, content management, admin panel, website administration"
    }
};

// Default metadata
const DEFAULT_METADATA = {
    title: "Pandharpur Darshan - Complete Pilgrimage Services with Booking & Travel Planning",
    description: "Complete Pandharpur pilgrimage services: Live temple darshan, hotel/lodge/restaurant booking, travel planning, temple guides, and tourist information.",
    keywords: "Pandharpur pilgrimage, Vitthal temple, hotel booking, travel planning, temple guide, tourist information, Maharashtra pilgrimage, religious tourism"
};

// COMPREHENSIVE KEYWORDS FOR ALL SERVICES
const ALL_SEO_KEYWORDS = `
    Pandharpur hotel booking near temple, budget hotels in Pandharpur, luxury lodges Pandharpur, 
    Pandharpur accommodation booking, online hotel reservation Pandharpur, 
    Pandharpur restaurant booking for pilgrims, vegetarian food Pandharpur, 
    Kirtankar booking for religious ceremonies, bhajan singers Pandharpur, 
    Pandharpur travel planning tool, pilgrimage itinerary planner, 
    Yatra planning Pandharpur, travel route to Pandharpur, 
    Pandharpur temple locations map, all temples list Pandharpur, 
    Pandharpur tourist places guide, places to visit near Pandharpur, 
    Pandharpur sightseeing attractions, historical places Pandharpur, 
    Live Vitthal darshan online, Shri Vitthal Rukmini temple, 
    Pandharpur temple timings today, aarti schedule Vitthal temple, 
    Pandharpur pilgrimage guide 2024, Maharashtra religious tourism, 
    Book pandal accommodation Pandharpur, dormitory booking for pilgrims, 
    Pandharpur guest house booking, family accommodation temple area, 
    Pandharpur food booking for bhandara, catering services pilgrims, 
    Religious guide booking Pandharpur, purohit services Vitthal temple, 
    Pandharpur travel package deals, pilgrimage tour package, 
    Transportation booking Pandharpur, taxi services temple area, 
    Pandharpur bus booking for groups, train travel to Pandharpur, 
    Pandharpur walking tour guide, temple complex map download, 
    Pandharpur festival booking 2024, Ashadhi Ekadashi accommodation, 
    Kartiki Ekadashi hotel booking, Wari Pandharpur stay booking, 
    Pandharpur monsoon pilgrimage, winter travel Pandharpur, 
    Family pilgrimage planning, senior citizen pilgrimage assistance, 
    International devotees Pandharpur, NRI pilgrimage services, 
    Pandharpur temple trust approved services, authorized booking platform, 
    Safe accommodation Pandharpur, verified hotel listings, 
    Pandharpur emergency services, medical facilities for pilgrims, 
    Pandharpur shopping guide, religious item shopping, 
    Prasad booking Vitthal temple, online puja booking, 
    Pandharpur cultural events booking, religious discourse booking, 
    Sant Dnyaneshwar temple visit, Sant Tukaram samadhi, 
    Pandharpur river Chandrabhaga ghat, holy bath booking, 
    Pandharpur library and archives, religious study center, 
    Group booking for pilgrims, temple tour package, 
    Pandharpur photography guide, videography permission temple, 
    Pandharpur mobile app services, online booking app, 
    Real-time darshan queue status, temple crowd information, 
    Pandharpur weather forecast pilgrimage, best time visit, 
    Pandharpur accessibility services, disabled pilgrim facilities, 
    Language guide services, multilingual pilgrimage assistance, 
    Pandharpur history and culture, spiritual significance guide, 
    Varkari tradition information, Pandharpur religious customs, 
    Online donation Vitthal temple, digital seva booking, 
    Pandharpur volunteer registration, community service opportunities, 
    Emergency contact Pandharpur, police assistance pilgrims, 
    Lost and found Pandharpur, pilgrimage safety tips, 
    Pandharpur local transport, auto rickshaw booking, 
    Parking facilities Pandharpur, vehicle parking booking, 
    Pandharpur SIM card for tourists, local connectivity, 
    Money exchange Pandharpur, ATM locations temple area, 
    Pandharpur post office services, courier services, 
    Laundry services pilgrims, luggage storage facilities, 
    Pandharpur pharmacy locations, medical store near temple, 
    Pandharpur book stores, religious literature shops, 
    Music instrument rental, kirtan equipment booking, 
    Pandharpur tent accommodation, temporary stay booking, 
    Pilgrimage insurance services, travel insurance Pandharpur, 
    Pandharpur tour operator listing, certified travel agents, 
    Online review platform, pilgrim feedback system, 
    Pandharpur event calendar, festival dates 2024-25
`;

export function HeaderClient({ user }) {
    const pathname = usePathname()
    const [selectedLang, setSelectedLang] = useState("English")
    
    // Get SEO metadata for current page
    const currentPageMetadata = PAGE_SEO_METADATA[pathname] || DEFAULT_METADATA

    // Update page metadata dynamically (client-side)
    useEffect(() => {
        // Update page title
        if (currentPageMetadata.title) {
            document.title = currentPageMetadata.title
        }
        
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.name = "description"
            document.head.appendChild(metaDesc)
        }
        metaDesc.content = currentPageMetadata.description
        
        // Update meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]')
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta')
            metaKeywords.name = "keywords"
            document.head.appendChild(metaKeywords)
        }
        metaKeywords.content = currentPageMetadata.keywords
        
        // Add canonical link
        let linkCanonical = document.querySelector('link[rel="canonical"]')
        if (!linkCanonical) {
            linkCanonical = document.createElement('link')
            linkCanonical.rel = "canonical"
            document.head.appendChild(linkCanonical)
        }
        linkCanonical.href = `https://pandharpurdarshan.com${pathname}`
        
        // Add viewport meta for mobile
        let metaViewport = document.querySelector('meta[name="viewport"]')
        if (!metaViewport) {
            metaViewport = document.createElement('meta')
            metaViewport.name = "viewport"
            metaViewport.content = "width=device-width, initial-scale=1"
            document.head.appendChild(metaViewport)
        }
        
        // Cleanup
        return () => {
            // No cleanup needed for essential meta tags
        }
    }, [pathname, currentPageMetadata])

    // This function calls the global function from our GoogleTranslateManager
    const handleLanguageChange = (langName, langCode) => {
        setSelectedLang(langName);
        if (window.changeGoogleTranslateLanguage) {
            window.changeGoogleTranslateLanguage(langCode);
        }
    };

    return (
        <>
            {/* Hidden SEO elements for search engines */}
            <div className="sr-only" aria-hidden="true">
                {/* Schema.org structured data for Local Business/Travel Agency */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": ["TravelAgency", "LocalBusiness"],
                        "name": "Pandharpur Darshan - Complete Pilgrimage Services",
                        "description": "Complete Pandharpur pilgrimage services including live temple darshan, hotel/lodge/restaurant booking, travel planning, and temple guides.",
                        "url": "https://pandharpurdarshan.com",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Pandharpur",
                            "addressRegion": "Maharashtra",
                            "addressCountry": "India"
                        },
                        "telephone": "+91-XXXXXXXXXX",
                        "email": "contact@pandharpurdarshan.com",
                        "openingHours": "24/7",
                        "image": "https://pandharpurdarshan.com/hero-logo-1.png",
                        "priceRange": "₹₹",
                        "servesCuisine": "Vegetarian Indian Food",
                        "makesOffer": [
                            "Hotel Booking Services",
                            "Travel Planning Services",
                            "Temple Guide Services",
                            "Restaurant Reservation",
                            "Kirtankar Booking",
                            "Live Darshan Streaming"
                        ],
                        "areaServed": {
                            "@type": "GeoCircle",
                            "geoMidpoint": {
                                "@type": "GeoCoordinates",
                                "latitude": 17.6792,
                                "longitude": 75.3304
                            },
                            "geoRadius": "50 km"
                        }
                    })}
                </script>
                
                {/* Schema for Hotel/Lodging Services */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hotel",
                        "name": "Pandharpur Accommodation Booking",
                        "description": "Book hotels, lodges, guest houses, and dharamshalas in Pandharpur near Vitthal Temple",
                        "url": "https://pandharpurdarshan.com/booking",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Pandharpur",
                            "addressRegion": "Maharashtra"
                        },
                        "priceRange": "₹500 - ₹5000",
                        "amenityFeature": [
                            "WiFi",
                            "Air Conditioning",
                            "Vegetarian Food",
                            "Temple Proximity",
                            "Parking",
                            "24/7 Reception"
                        ]
                    })}
                </script>
                
                {/* Schema for Travel Agency Services */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TouristAttraction",
                        "name": "Pandharpur Pilgrimage Planning",
                        "description": "Complete travel planning for Pandharpur Yatra including itinerary, transportation, and temple visits",
                        "url": "https://pandharpurdarshan.com/travel-planner",
                        "address": "Pandharpur, Maharashtra, India",
                        "touristType": ["Pilgrimage Tourism", "Religious Tourism", "Cultural Tourism"]
                    })}
                </script>
                
                {/* Breadcrumb structured data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://pandharpurdarshan.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": currentPageMetadata.title.split('-')[0]?.trim() || "Service",
                                "item": `https://pandharpurdarshan.com${pathname}`
                            }
                        ]
                    })}
                </script>
                
                {/* Hidden comprehensive keywords for SEO */}
                <div className="hidden">
                    {ALL_SEO_KEYWORDS}
                </div>
                
                {/* Hidden H1 for SEO (invisible to users) */}
                <h1>Pandharpur Darshan - Complete Pilgrimage Services: Live Temple Viewing, Hotel Booking, Travel Planning</h1>
                <p>Your complete solution for Pandharpur pilgrimage including live Vitthal temple darshan, hotel/lodge/restaurant booking services, travel planning tools, temple guides, and tourist information for Maharashtra's spiritual capital.</p>
            </div>

            {/* ORIGINAL HEADER UI - NO VISUAL CHANGES */}
            <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm md:pb-1">
                <div className="w-full max-w-screen-2xl mx-auto flex h-20 items-center justify-between px-3 sm:px-5 lg:px-8">
                    <Link href="/" className="flex-shrink-0">
                        <Image 
                            src={'/hero-logo-1.png'} 
                            height={200} 
                            width={320} 
                            className="lg:w-full ml-[-100px] md:h-[100%] md:ml-[-30px] md:w-full" 
                            alt="Pandharpur Darshan - Live Temple Viewing, Hotel Booking & Travel Planning Services"
                            title="Pandharpur Complete Pilgrimage Services"
                            priority 
                        />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6 mx-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${pathname === item.href
                                    ? "text-orange-600 border-b-2 border-orange-500 pb-1"
                                    : "text-gray-700 hover:text-orange-600"
                                    }`}
                                title={getNavItemTitle(item.name)}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                                        Quick Access <ChevronDown className="h-4 w-4 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {quickLinks.map((item) => (
                                        <DropdownMenuItem asChild key={item.name}>
                                            <Link 
                                                href={item.href} 
                                                className="flex items-center text-sm"
                                                title={getQuickLinkTitle(item.name)}
                                            >
                                                {item.icon}{item.name}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuItem asChild>
                                        <Link 
                                            href="/join-us" 
                                            className="flex items-center text-sm"
                                            title="Register Your Hotel, Restaurant or Services with Pandharpur Darshan"
                                        >
                                            <span className="mr-2">🤝</span>Join Us
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Language Selector */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-1 text-gray-700 hover:bg-gray-100">
                                        <Languages className="h-4 w-4" />
                                        <span>{selectedLang}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {supportedLanguages.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.name, lang.code)}
                                        >
                                            {lang.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Super Admin link */}
                            <Link href="/super-admin">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-dashed border-slate-300 text-slate-700 hover:border-orange-400 hover:text-orange-600 px-3"
                                >
                                    Super Admin
                                </Button>
                            </Link>

                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton>
                                    <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">Sign In</Button>
                                </SignInButton>
                            </SignedOut>
                        </div>

                        {/* --- MOBILE MENU --- */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] bg-white shadow-lg px-4">
                                    <SheetHeader>
                                        <SheetTitle className="sr-only">Pandharpur Darshan Services Menu</SheetTitle>
                                        <SheetDescription className="sr-only">
                                            Access live darshan, hotel booking, travel planning, temple guides, and pilgrimage services
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-y-4 mt-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                                        <div className="pb-4 border-b">
                                            <SignedIn>
                                                <div className="flex items-center gap-4">
                                                    <UserButton afterSignOutUrl="/" />
                                                    <div className="text-sm">
                                                        <div className="font-semibold text-gray-800">Welcome, {user?.firstName || "User"}!</div>
                                                        <div className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</div>
                                                    </div>
                                                </div>
                                            </SignedIn>
                                            <SignedOut>
                                                <SignInButton>
                                                    <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">Sign In</Button>
                                                </SignInButton>
                                            </SignedOut>
                                        </div>
                                        <nav className="flex flex-col gap-y-2">
                                            {navItems.map((item) => (
                                                <SheetClose asChild key={item.href}>
                                                    <Link 
                                                        href={item.href} 
                                                        className="flex items-center gap-3 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100"
                                                        title={getNavItemTitle(item.name)}
                                                    >
                                                        {item.icon}{item.name}
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </nav>
                                        {/* Super Admin link in mobile menu */}
                                        <SheetClose asChild>
                                            <Link
                                                href="/super-admin"
                                                className="flex items-center gap-3 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100"
                                                title="Admin Dashboard for Booking Management"
                                            >
                                                <span className="font-medium">Super Admin</span>
                                            </Link>
                                        </SheetClose>
                                        <hr />
                                        <div className="flex flex-col gap-y-2 text-sm">
                                            <h3 className="font-semibold px-3 text-gray-500 text-xs uppercase">Quick Access</h3>
                                            {quickLinks.map((link) => (
                                                <SheetClose asChild key={link.href}>
                                                    <Link 
                                                        href={link.href} 
                                                        className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                                        title={getQuickLinkTitle(link.name)}
                                                    >
                                                        {link.icon}{link.name}
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                            <SheetClose asChild>
                                                <Link 
                                                    href="/join-us" 
                                                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                                    title="Register Your Business with Pandharpur Darshan"
                                                >
                                                    <span className="mr-2">🤝</span>Join Us
                                                </Link>
                                            </SheetClose>
                                        </div>
                                        <hr />
                                        {/* --- LANGUAGE DROPDOWN FOR MOBILE MENU --- */}
                                        <div className="flex flex-col gap-y-2 text-sm">
                                            <h3 className="font-semibold px-3 text-gray-500 text-xs uppercase">Language</h3>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full justify-between items-center px-3 py-2 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        <span className="flex items-center gap-3">
                                                            <Languages className="h-4 w-4" />
                                                            {selectedLang}
                                                        </span>
                                                        <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[260px]">
                                                    {supportedLanguages.map((lang) => (
                                                        <DropdownMenuItem
                                                            key={lang.code}
                                                            onClick={() => handleLanguageChange(lang.name, lang.code)}
                                                        >
                                                            {lang.name}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <SheetClose asChild>
                                        <Button variant="outline" className="mt-4 w-full">
                                            Close
                                        </Button>
                                    </SheetClose>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

// Helper functions for title attributes
function getNavItemTitle(navName) {
    const titles = {
        'Home': 'Pandharpur Darshan Home - Live Temple, Booking & Travel Services',
        'Live Darshan': 'Watch Live Vitthal Temple Darshan 24/7 Streaming',
        'Booking': 'Book Hotels, Lodges, Restaurants & Kirtankars in Pandharpur',
        'Travel Planner': 'Plan Your Pandharpur Pilgrimage Itinerary',
        'Temples': 'Explore All Temples in Pandharpur with Locations',
        'Tourist Places': 'Discover Tourist Attractions & Places to Visit',
        'Gallery': 'View Temple Photos, Videos & Virtual Tours',
        'About': 'About Our Complete Pandharpur Pilgrimage Services',
        'Contact': 'Contact for Booking Support & Travel Assistance'
    };
    return titles[navName] || `${navName} - Pandharpur Darshan Services`;
}

function getQuickLinkTitle(linkName) {
    const titles = {
        'Temple Timings': 'Check Vitthal Temple Daily Schedule & Aarti Times',
        'Festival Calendar': 'View Pandharpur Festival Dates & Special Events',
        'Pilgrim Guide': 'Complete Pilgrimage Guide for Pandharpur Yatra',
        'Emergency Contacts': 'Important Emergency Numbers in Pandharpur',
        'Transportation': 'Transport Options & Travel to Pandharpur'
    };
    return titles[linkName] || linkName;
}

// Export SEO helper
export const headerSEO = {
    siteName: "Pandharpur Darshan - Complete Pilgrimage Services",
    baseUrl: "https://pandharpurdarshan.com",
    getMetadataForPage: (path) => {
        return PAGE_SEO_METADATA[path] || DEFAULT_METADATA;
    },
    getAllKeywords: () => ALL_SEO_KEYWORDS
};