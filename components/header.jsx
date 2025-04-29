'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Home,
  MapPin,
  CalendarDays,
  BookOpen,
  Languages,
  Menu,
  ChevronDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Temples", href: "/temples", icon: <MapPin className="h-5 w-5" /> },
    { name: "Festivals", href: "/festivals", icon: <CalendarDays className="h-5 w-5" /> },
    { name: "Guide", href: "/guide", icon: <BookOpen className="h-5 w-5" /> }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-md pb-2">
      <div className="container flex h-16 items-center justify-between px-6 md:px-8 mt-2">
        {/* Animated Logo */}
        <Link href="/" className="flex items-center gap-2 pl-5">
         
           
            <span className="text-2xl font-extrabold text-gray-900">
              पंढरपुर
            </span>
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 ml-20">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-orange-600 ${
                pathname === item.href ? "text-orange-600" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white shadow-lg rounded-lg">
            <div className="flex flex-col gap-4 pt-6 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 py-2 px-4 rounded-md text-gray-800 hover:bg-gray-100 ${
                    pathname === item.href ? "bg-orange-100 text-orange-600" : ""
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Right side controls */}
        <div className="flex items-center gap-4 pl-10">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-gray-700 hover:bg-gray-100">
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline">Language</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["English", "हिंदी", "मराठी", "ಕನ್ನಡ"].map((lang) => (
                <DropdownMenuItem key={lang}>
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 rounded-full ",
                  userButtonPopoverCard: "shadow-xl rounded-lg",
                  userPreviewMainIdentifier: "font-semibold text-orange-600",
                }
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}
