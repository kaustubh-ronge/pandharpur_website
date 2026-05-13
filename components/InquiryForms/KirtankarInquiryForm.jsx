"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { logKirtankarInquiry } from "@/actions/kirtankarActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Phone, Calendar as CalendarIcon, Send, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } } };

const isMobileDevice = () => {
    if (typeof window === "undefined") return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export function KirtankarInquiryForm({ kirtankar, onFormSubmit }) {
    const { isSignedIn, user } = useUser();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [eventDate, setEventDate] = useState(null);
    const [eventType, setEventType] = useState("");
    const [isCalendarOpen, setCalendarOpen] = useState(false);

    useEffect(() => {
        if (isSignedIn && user) setName(user.fullName || "");
    }, [isSignedIn, user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isSignedIn) return;

        const cleanPhoneNumber = kirtankar.whatsappNumber.replace(/\D/g, '');

        const message = `🙏 *New Kirtan Booking Inquiry via PandharpurDarshan.com*\n\n` +
            `Namaskar, I found *${kirtankar.name}* on the Pandharpur Darshan website and would like to inquire about a booking for a kirtan.\n\n` +
            `👤 *My Details:*\n` +
            `  • *Name:* ${name}\n` +
            `  • *Phone:* ${phone}\n\n` +
            `🗓️ *Event Details:*\n` +
            `  • *Proposed Date:* ${eventDate ? format(eventDate, "PPP") : 'To be discussed'}\n` +
            `  • *Event Type:* ${eventType || 'To be discussed'}\n\n` +
            `Please let me know about your availability and the next steps. Thank you.\n\n` +
            `--- \n_This inquiry was generated from PandharpurDarshan.com_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = isMobileDevice()
            ? `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        logKirtankarInquiry({
            name,
            phone,
            eventDate,
            eventType,
            kirtankarSlug: kirtankar.slug,
        });

        if (onFormSubmit) onFormSubmit();
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isSignedIn) {
        return (
            <div className="text-center space-y-5 py-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="font-semibold text-base text-orange-800">Please sign in to send an inquiry</p>
                </div>
                <SignInButton mode="modal">
                    <Button size="lg" className="w-full h-14 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600">
                        Sign In
                    </Button>
                </SignInButton>
            </div>
        );
    }

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
                <motion.form onSubmit={handleSubmit} className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-slate-700 flex items-center"><User className="mr-2 h-4 w-4 text-orange-500" /> Full Name</Label>
                            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="h-14 text-base" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-bold text-slate-700 flex items-center"><Phone className="mr-2 h-4 w-4 text-orange-500" /> Phone Number</Label>
                            <Input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 9876543210" className="h-14 text-base" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-bold text-slate-700 flex items-center"><CalendarIcon className="mr-2 h-4 w-4 text-orange-500" /> Proposed Event Date</Label>
                            <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("w-full h-14 text-base justify-start text-left font-normal", !eventDate && "text-slate-500")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {eventDate ? format(eventDate, "PPP") : <span>(Optional) Select a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={eventDate} onSelect={(d) => { setEventDate(d); setCalendarOpen(false); }} disabled={(d) => d < today} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="eventType" className="text-sm font-bold text-slate-700 flex items-center"><Flag className="mr-2 h-4 w-4 text-orange-500" /> Event Type</Label>
                            <Input id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="(Optional) Home Kirtan, Public Event, etc." className="h-14 text-base" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Button type="submit" className="w-full group h-14 text-base font-bold rounded-lg text-white bg-gradient-to-r from-orange-500 to-pink-600">
                            Inquire via WhatsApp
                            <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Button>
                    </motion.div>
                </motion.form>
            </CardContent>
        </Card>
    );
}