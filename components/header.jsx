
'use client';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
    ChevronDown,
    FileText,
    GraduationCap,
    LayoutDashboard,
    PenBox,
    StarsIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 pt-2 h-16 flex align-items-center justify-between">
                
                logo here 

                <div className="flex items-center space-x-2 md:space-x-4">
                    <SignedIn>

                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Button className='cursor-pointer' variant='outline'>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'w-10 h-10',
                                    userButtonPopoverCard: 'shadow-xl',
                                    userPreviewMainIdentifier: 'font-semibold',
                                },
                            }}
                            afterSignOutUrl="/"
                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
};

export default Header;


