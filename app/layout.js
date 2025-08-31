import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Header } from "@/components/HeaderComponents/Header";

export const metadata = {
  title: "ppur",
  description: "ppur",
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
