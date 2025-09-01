import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Chatbot from "@/components/chatbot/Chatbot";

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
          <Chatbot />
        </body>
      </html>
    </ClerkProvider>
  );
}
