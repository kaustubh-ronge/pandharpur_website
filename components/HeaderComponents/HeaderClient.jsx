
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
import {
    Sheet, SheetContent, SheetTrigger, SheetClose,
    SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet"
import { navItems, quickLinks } from "@/data/HeaderData/headerData"

// Define the languages and their codes for the translator
const supportedLanguages = [
    { name: "English", code: "en" },
    { name: "हिंदी", code: "hi" },
    { name: "मराठी", code: "mr" },
    { name: "ಕನ್ನಡ", code: "kn" }
];

export function HeaderClient({ user }) {
    const pathname = usePathname()
    const [selectedLang, setSelectedLang] = useState("English")

    // This function calls the global function from our GoogleTranslateManager
    const handleLanguageChange = (langName, langCode) => {
        setSelectedLang(langName);
        if (window.changeGoogleTranslateLanguage) {
            window.changeGoogleTranslateLanguage(langCode);
        } else {
            console.error("Google Translate function not available.");
        }
    };

    return (
        <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm md:pb-1">
            <div className="w-full max-w-screen-2xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex-shrink-0">
                    <Image src={'/hero-logo-1.png'} height={200} width={320} className=" lg:w-full ml-[-100px] md:h-[100%] md:ml-[-30px] md:w-full" alt="logo" priority />
                </Link>

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

                <div className="flex items-center gap-4">
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
                                <DropdownMenuItem asChild>
                                    <Link href="/join-us" className="flex items-center text-sm">
                                        <span className="mr-2">🤝</span>Join Us
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* This dropdown now correctly controls the Google Translator */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-700 hover:bg-gray-100">
                                    <Languages className="h-4 w-4" />
                                    <span>{selectedLang}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {supportedLanguages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.name, lang.code)}
                                    >
                                        {lang.name}
                                    </DropdownMenuItem>
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

                    {/* --- MOBILE MENU --- */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] bg-white shadow-lg px-4">
                                <SheetHeader>
                                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                    <SheetDescription className="sr-only">
                                        A list of navigation links and quick access options.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-y-4 mt-4">
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
                                            <SheetClose asChild key={item.href}>
                                                <Link href={item.href} className="flex items-center gap-3 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100">
                                                    {item.icon}{item.name}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                    <hr />
                                    <div className="flex flex-col gap-y-2 text-sm">
                                        <h3 className="font-semibold px-3 text-gray-500 text-xs uppercase">Quick Access</h3>
                                        {quickLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <Link href={link.href} className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                                    {link.icon}{link.name}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                        <SheetClose asChild>
                                            <Link href="/join-us" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                                <span className="mr-2">🤝</span>Join Us
                                            </Link>
                                        </SheetClose>
                                    </div>
                                    <hr />
                                    {/* --- LANGUAGE DROPDOWN FOR MOBILE MENU --- */}
                                    <div className="flex flex-col gap-y-2 text-sm">
                                        <h3 className="font-semibold px-3 text-gray-500 text-xs uppercase">Language</h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-between items-center px-3 py-2 text-gray-600 hover:bg-gray-100"
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <Languages className="h-4 w-4" />
                                                        {selectedLang}
                                                    </span>
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[260px]">
                                                {supportedLanguages.map((lang) => (
                                                    <DropdownMenuItem
                                                        key={lang.code}
                                                        onClick={() => handleLanguageChange(lang.name, lang.code)}
                                                    >
                                                        {lang.name}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <SheetClose asChild>
                                    <Button variant="outline" className="mt-4 w-full">
                                        Close
                                    </Button>
                                </SheetClose>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
