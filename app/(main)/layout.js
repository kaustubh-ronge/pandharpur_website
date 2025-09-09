import Chatbot from "@/components/chatbot/Chatbot";
import Footer from "@/components/Footer";
import { Header } from "@/components/HeaderComponents/Header";
import GoogleTranslateManager from "@/components/LanguageTranslator";
import { SharedBackground } from "@/components/SharedBackGround";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
// --- 1. IMPORT THE GOOGLE TRANSLATE MANAGER ---

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
      {/* --- 2. ADD THE MANAGER COMPONENT HERE --- */}
      {/* It's invisible and can be placed anywhere inside the provider */}
      <GoogleTranslateManager />

      <Header />

      <main className="min-h-screen">{children}</main>

      <Chatbot />

      <Footer />

      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}