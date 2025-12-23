import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// export const metadata = {
//   title: "Pandharpur Darshan",
//   description: "Pandharpur Darshan",
//   content:"Plan your Pandharpur Darshan – find details about the yatra, temple timings, festivals, accommodation, travel guide, and booking options."
// };


export const metadata = {
  title: "Pandharpur Darshan",
  description: "Pandharpur Darshan",
  content:
    "Plan your Pandharpur Darshan – find details about the yatra, temple timings, festivals, accommodation, travel guide, and booking options.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="font-poppins antialiased">
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
