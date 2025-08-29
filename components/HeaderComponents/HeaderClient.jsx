'use client'

import { useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Languages, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navItems, quickLinks } from "@/data/HeaderData/headerData"

export function HeaderClient({ user }) {
    const pathname = usePathname()
    const [selectedLang, setSelectedLang] = useState("English")

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm md:pb-1">
            <div className="w-full max-w-screen-2xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo - Always visible */}
                <Link href="/" className="flex-shrink-0">
                    <Image src={'/hero-logo-1.png'} height={200} width={320} className=" lg:w-full ml-[-100px] md:h-[100%] md:ml-[-30px] md:w-full" alt="logo" priority />
                </Link>

                {/* Desktop Navigation - Center, visible only on large screens */}
                <nav className="hidden lg:flex items-center gap-8 mx-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${pathname === item.href
                                    ? "text-orange-600 border-b-2 border-orange-500 pb-1"
                                    : "text-gray-700 hover:text-orange-600"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Desktop-Only Actions - A wrapper for all buttons visible on large screens */}
                    <div className="hidden lg:flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                                    Quick Access <ChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {quickLinks.map((item) => (
                                    <DropdownMenuItem asChild key={item.name}>
                                        <Link href={item.href} className="flex items-center text-sm">{item.icon}{item.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-700 hover:bg-gray-100">
                                    <Languages className="h-4 w-4" />
                                    <span>{selectedLang}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {["English", "हिंदी", "मराठी", "ಕನ್ನಡ"].map((lang) => (
                                    <DropdownMenuItem key={lang} onClick={() => setSelectedLang(lang)}>{lang}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton>
                                <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">Sign In</Button>
                            </SignInButton>
                        </SignedOut>
                    </div>

                    {/* Mobile-Only Menu Trigger - Visible only on small and medium screens */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] bg-white shadow-lg p-6">
                                <div className="flex flex-col gap-y-4">
                                    <div className="pb-4 border-b">
                                        <SignedIn>
                                            <div className="flex items-center gap-4">
                                                <UserButton afterSignOutUrl="/" />
                                                <div className="text-sm">
                                                    <div className="font-semibold text-gray-800">Welcome, {user?.firstName || "User"}!</div>
                                                    <div className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</div>
                                                </div>
                                            </div>
                                        </SignedIn>
                                        <SignedOut>
                                            <SignInButton>
                                                <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">Sign In</Button>
                                            </SignInButton>
                                        </SignedOut>
                                    </div>
                                    <nav className="flex flex-col gap-y-2">
                                        {navItems.map((item) => (
                                            <Link key={item.href} href={item.href} className="flex items-center gap-3 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100">
                                                {item.icon}{item.name}
                                            </Link>
                                        ))}
                                    </nav>
                                    <hr />
                                    <div className="flex flex-col gap-y-2 text-sm">
                                        <h3 className="font-semibold px-3 text-gray-500 text-xs uppercase">Quick Access</h3>
                                        {quickLinks.map((link) => (
                                            <Link key={link.href} href={link.href} className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                                {link.icon}{link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}