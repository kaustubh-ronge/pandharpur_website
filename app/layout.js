import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
