
"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { logInquiryLead } from "@/actions/leadActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Phone, Calendar as CalendarIcon, MapPin, Send, Users } from "lucide-react";
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

export function TravelsInquiryForm({ travel, onFormSubmit }) {
  const { isSignedIn, user } = useUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState(null);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [passengers, setPassengers] = useState("");
  const [travelCalendarOpen, setTravelCalendarOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      setName(user.fullName || "");
    }
  }, [isSignedIn, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSignedIn) return;

    const cleanPhoneNumber = travel.whatsappNumber.replace(/\D/g, '');

    let message = `🚌 *New Travel Inquiry via PandharpurDarshan.com*\n\n`;
    message += `Hello, I saw the details for *${travel.name}* on the Pandharpur Darshan website (pandharpurdarshan.com) and would like to inquire about the following:\n\n`;
    message += `👤 *Passenger Details:*\n`;
    message += `  • *Name:* ${name}\n`;
    message += `  • *Phone:* ${phone}\n\n`;
    message += `🚌 *Travel Details:*\n`;
    message += `  • *Travel Date:* ${travelDate ? format(travelDate, "PPP") : 'Not specified'}\n`;
    message += `  • *From:* ${fromLocation || 'Not specified'}\n`;
    message += `  • *To:* ${toLocation || 'Not specified'}\n`;
    message += `  • *Passengers:* ${passengers || 'Not specified'}\n\n`;
    message += `Please confirm availability and the next steps. Thank you.\n\n`;
    message += `--- \n_This lead was generated from PandharpurDarshan.com_`;

    const encodedMessage = encodeURIComponent(message);
    
    let whatsappUrl;

    if (isMobileDevice()) {
      // --- MOBILE LOGIC ---
      whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    } else {
      // --- DESKTOP LOGIC ---
      whatsappUrl = `https://web.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
    }

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
      travelSlug: travel.slug,
      entityType: 'travel'
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

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="travelDate" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><CalendarIcon className="mr-2 h-4 w-4 text-orange-500" /> Travel Date</Label>
            <Popover open={travelCalendarOpen} onOpenChange={setTravelCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full h-14 text-base justify-start text-left font-normal rounded-lg", !travelDate && "text-slate-500")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {travelDate ? format(travelDate, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={travelDate} onSelect={(d) => { setTravelDate(d); setTravelCalendarOpen(false); }} disabled={(d) => d < today} initialFocus />
              </PopoverContent>
            </Popover>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="fromLocation" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><MapPin className="mr-2 h-4 w-4 text-orange-500" /> From Location</Label>
              <Input id="fromLocation" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} placeholder="e.g., Pune" className="h-14 text-base rounded-lg placeholder:text-slate-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toLocation" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><MapPin className="mr-2 h-4 w-4 text-orange-500" /> To Location</Label>
              <Input id="toLocation" value={toLocation} onChange={(e) => setToLocation(e.target.value)} placeholder="e.g., Pandharpur" className="h-14 text-base rounded-lg placeholder:text-slate-500" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="passengers" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center"><Users className="mr-2 h-4 w-4 text-orange-500" /> Number of Passengers</Label>
            <Input id="passengers" type="number" min="1" placeholder="e.g., 4" value={passengers} onChange={(e) => setPassengers(e.target.value)} className="h-14 text-base rounded-lg placeholder:text-slate-500" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full group h-14 text-base font-bold rounded-lg text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/20">
              Inquire via WhatsApp
              <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </motion.div>
        </motion.form>
      </CardContent>
    {/*  */}
    </Card>
  );
}