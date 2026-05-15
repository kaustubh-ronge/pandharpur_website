import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://pandharpurdarshan.com'),
    title: {
        default: "Pandharpur Darshan | Your Complete Guide to the Holy Town",
        template: "%s | Pandharpur Darshan"
    },
    description: "Official guide for Pandharpur Darshan. Find information about Lord Vitthal temple timings, festivals, yatra guides, attractions, and local facilities.",
    keywords: ["Pandharpur", "Vitthal", "Darshan", "Yatra", "Ekadashi", "Pandharpur Guide"],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Pandharpur Darshan",
        "url": "https://pandharpurdarshan.com",
        "logo": "https://pandharpurdarshan.com/logo.png",
        "description": "Official guide for Pandharpur Darshan. Find information about Lord Vitthal temple timings, festivals, and yatra guides.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main Road, Near Vitthal Temple",
            "addressLocality": "Pandharpur",
            "addressRegion": "Maharashtra",
            "postalCode": "413304",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7498444684",
            "contactType": "customer service"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Pandharpur Darshan",
        "url": "https://pandharpurdarshan.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://pandharpurdarshan.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
                <head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                    />
                </head>
                <body className="font-poppins antialiased">
                    <main className="min-h-screen">{children}</main>
                    <SpeedInsights />
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}

