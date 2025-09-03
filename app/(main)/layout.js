import Chatbot from "@/components/chatbot/Chatbot";
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

      <footer className="bg-muted/50 py-12 !mt-10">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <p>Made By TY students</p>
        </div>
      </footer>

      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
