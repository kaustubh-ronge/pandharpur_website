import { Header } from "@/components/HeaderComponents/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "ppur",
  description: "ppur",
};

export default function MainLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Header />

        <main className="min-h-screen">{children}</main>

        <footer className="bg-muted/50 py-12 !mt-10">
          <div className="container mx-auto px-4 text-center text-gray-200">
            <p>Made By TY students</p>
          </div>
        </footer>

        {/* <Toaster position="top-center" richColors /> */}
      </ThemeProvider>
    </ClerkProvider>
  );
}
