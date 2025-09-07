import Chatbot from "@/components/chatbot/Chatbot";
import Footer from "@/components/Footer";
import { Header } from "@/components/HeaderComponents/Header";
import { SharedBackground } from "@/components/SharedBackGround";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const metadata = {
  title: "ppur",
  description: "ppur",
};

export default function MainLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Header />

      <main className="min-h-screen">{children}</main>

      <Chatbot />

      <Footer />

      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
