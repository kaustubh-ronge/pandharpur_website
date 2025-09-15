
"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { logInquiryLead } from "@/actions/leadActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Phone, Calendar as CalendarIcon, Users, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// This helper function checks if the code is running on a mobile device
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export function HotelInquiryForm({ hotel, onFormSubmit }) {
  const { isSignedIn, user } = useUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState("");
  const [checkInCalendarOpen, setCheckInCalendarOpen] = useState(false);
  const [checkOutCalendarOpen, setCheckOutCalendarOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      setName(user.fullName || "");
    }
  }, [isSignedIn, user]);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (!isSignedIn) return;

    const cleanPhoneNumber = hotel.whatsappNumber.replace(/\D/g, '');
    
    const message = `🛎️ *New Hotel and Lodge Booking Inquiry via PandharpurDarshan.com*\n\n` +
                    `Hello, I saw the details for *${hotel.name}* on the Pandharpur Darshan website (pandharpurdarshan.com) and would like to inquire about the following:\n\n` +
                    `👤 *Guest Details:*\n` +
                    `  • *Name:* ${name}\n` +
                    `  • *Phone:* ${phone}\n\n` +
                    `🗓️ *Booking Details:*\n` +
                    `  • *Check-in:* ${checkIn ? format(checkIn, "PPP") : 'Not specified'}\n` +
                    `  • *Check-out:* ${checkOut ? format(checkOut, "PPP") : 'Not specified'}\n` +
                    `  • *Guests:* ${guests || 'Not specified'}\n\n` +
                    `Please confirm availability and the next steps. Thank you.\n\n` +
                    `--- \n_This lead was generated from PandharpurDarshan.com_`;

    const encodedMessage = encodeURIComponent(message);
    
    let whatsappUrl;

    if (isMobileDevice()) {
      // --- MOBILE LOGIC ---
      // Use the standard wa.me link that works best with the mobile app.
      whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    } else {
      // --- DESKTOP LOGIC ---
      // Use the web-specific URL to force open a browser tab.
      // No copy-to-clipboard or toast notifications are included.
      whatsappUrl = `https://web.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
    }
    
    // This part runs for both mobile and desktop
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    logInquiryLead({
      name,
      phone,
      hotelSlug: hotel.slug,
      entityType: 'hotel'
    }).then(result => {
      if (!result.success) {
        console.error("Failed to log inquiry in the background:", result.error);
      }
    });

    if (onFormSubmit) onFormSubmit();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!isSignedIn) {
    return (
      <div className="text-center space-y-5 py-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="font-semibold text-base text-orange-800 dark:text-orange-200">Please sign in to continue</p>
        </div>
        <SignInButton mode="modal">
          <Button size="lg" className="w-full h-14 text-base font-bold text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/20">
            Sign In
          </Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><User className="mr-2 h-4 w-4 text-orange-500" /> Full Name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="h-14 text-base rounded-lg placeholder:text-slate-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><Phone className="mr-2 h-4 w-4 text-orange-500" /> Phone Number</Label>
              <Input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 9876543210" className="h-14 text-base rounded-lg placeholder:text-slate-500" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="checkin" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><CalendarIcon className="mr-2 h-4 w-4 text-orange-500" /> Check-in Date</Label>
              <Popover open={checkInCalendarOpen} onOpenChange={setCheckInCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full h-14 text-base justify-start text-left font-normal rounded-lg", !checkIn && "text-slate-500")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkIn} onSelect={(d) => { setCheckIn(d); setCheckInCalendarOpen(false); if(checkOut && d > checkOut) setCheckOut(null); }} disabled={(d) => d < today} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><CalendarIcon className="mr-2 h-4 w-4 text-orange-500" /> Check-out Date</Label>
              <Popover open={checkOutCalendarOpen} onOpenChange={setCheckOutCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} disabled={!checkIn} className={cn("w-full h-14 text-base justify-start text-left font-normal rounded-lg", !checkOut && "text-slate-500")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkOut} onSelect={(d) => { setCheckOut(d); setCheckOutCalendarOpen(false); }} disabled={(d) => d < checkIn} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="guests" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><Users className="mr-2 h-4 w-4 text-orange-500" /> Number of Guests</Label>
            <Input id="guests" type="number" min="1" placeholder="e.g., 2" value={guests} onChange={(e) => setGuests(e.target.value)} className="h-14 text-base rounded-lg placeholder:text-slate-500" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full group h-14 text-base font-bold rounded-lg text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/20">
              Inquire via WhatsApp
              <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </motion.div>
        </motion.form>
      </CardContent>
    </Card>
  );
}