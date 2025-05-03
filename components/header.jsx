
'use client'

import { useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home, MapPin, CalendarDays, BookOpen,
  Languages, Menu, ChevronDown, Search, HelpCircle, Phone,
  Utensils
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
   DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Header() {
  const pathname = usePathname()
  const { user } = useUser()
  const [selectedLang, setSelectedLang] = useState("English")
  const [search, setSearch] = useState("")

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Temples", href: "/temples", icon: <MapPin className="h-5 w-5" /> },
    { name: "Festivals", href: "/festivals", icon: <CalendarDays className="h-5 w-5" /> },
    { name: "Guide", href: "/guide", icon: <BookOpen className="h-5 w-5" /> }
  ]

  const quickLinks = [
    { name: "Report Missing Person", href: "/report", icon: <HelpCircle className="h-4 w-4 mr-2" /> },
    { name: "Emergency Contacts", href: "/emergency", icon: <Phone className="h-4 w-4 mr-2" /> },
    { name: "Help Center", href: "/help", icon: <HelpCircle className="h-4 w-4 mr-2" /> }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm pl-15 pt-3">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Image src={'/hero-logo-1.png'} height={200} width={320} className="h-80 w-full ml-[-120px]" alt="logo"/>
        <Link href="/" className="flex items-center gap-2">

        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-10 mt-3">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                pathname === item.href ? "text-orange-600 border-b-2 border-orange-500 pb-1" : "text-gray-700 hover:text-orange-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search bar */}
        <div className="hidden md:flex items-center gap-2 ml-6 mt-4">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search temples, guides..."
            className="h-8 w-48 text-sm"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4  ml-2 mt-3">
          {/* Quick Access Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                Quick Access <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {quickLinks.map((item) => (
                <DropdownMenuItem asChild key={item.name}>
                  <Link href={item.href} className="flex items-center text-sm">
                    {item.icon}
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-gray-700 hover:bg-gray-100">
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline">{selectedLang}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["English", "हिंदी", "मराठी", "ಕನ್ನಡ"].map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setSelectedLang(lang)}>
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth */}
          <SignedIn>
            <div className="hidden md:block text-sm font-medium text-gray-700">
              Welcome, {user?.firstName || "User"}!
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 rounded-full",
                  userButtonPopoverCard: "shadow-xl rounded-lg",
                  userPreviewMainIdentifier: "font-semibold text-orange-600",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white shadow-lg">
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
                <hr className="my-2" />
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
