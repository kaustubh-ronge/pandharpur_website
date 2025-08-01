'use client'

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Toaster } from 'sonner';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {!isStudioRoute && <Header />}

      <main className="min-h-screen">{children}</main>

      {!isStudioRoute && (
        <footer className="bg-muted/50 py-12 !mt-10">
          <div className="container mx-auto px-4 text-center text-gray-200">
            <p>Made By TY students</p>
          </div>
        </footer>
      )}

      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
