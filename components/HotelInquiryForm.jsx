
// FILE: components/HotelInquiryForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { logInquiryLead } from "@/actions/leadActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Phone, Calendar as CalendarIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

    const result = await logInquiryLead({ name, phone, hotelSlug: hotel.slug });

    if (result.success) {
      const whatsappNumber = hotel.whatsappNumber;
      let message = `🛎️ *New Booking Inquiry via PandharpurDarshan.com*\n\n`;
      message += `Hello, I saw the details for *${hotel.name}* on the Pandharpur Darshan website (pandharpurdarshan.com) and would like to inquire about the following:\n\n`;
      message += `👤 *Guest Details:*\n`;
      message += `  • *Name:* ${name}\n`;
      message += `  • *Phone:* ${phone}\n\n`;
      message += `🗓️ *Booking Details:*\n`;
      message += `  • *Check-in:* ${checkIn ? format(checkIn, "PPP") : 'Not specified'}\n`;
      message += `  • *Check-out:* ${checkOut ? format(checkOut, "PPP") : 'Not specified'}\n`;
      message += `  • *Guests:* ${guests || 'Not specified'}\n\n`;
      message += `Please confirm availability and the next steps. Thank you.\n\n`;
      message += `--- \n_This lead was generated from PandharpurDarshan.com_`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
      if (onFormSubmit) onFormSubmit();
    } else {
      console.error("Failed to log inquiry:", result.error);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!isSignedIn) {
    return (
      <div className="text-center space-y-6 py-6">
        <div className="bg-blue-50 p-5 rounded-xl mb-5 border border-blue-200">
          <p className="font-semibold text-lg text-gray-800">You must be signed in to make an inquiry.</p>
        </div>
        <SignInButton mode="modal">
          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-white font-bold text-lg rounded-xl">
            Sign In to Continue
          </Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3">
              <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 font-semibold text-base">
                <User size={18} className="text-gray-600" /> Full Name
              </Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-lg px-4 w-full"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-semibold text-base">
                <Phone size={18} className="text-gray-600" /> Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your contact number"
                className="h-14 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-lg px-4 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3">
              <Label htmlFor="checkin" className="flex items-center gap-2 text-gray-700 font-semibold text-base">
                <CalendarIcon size={18} className="text-gray-600" /> Check-in Date
              </Label>
              <Popover open={checkInCalendarOpen} onOpenChange={setCheckInCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-14 justify-start text-left font-normal rounded-lg border-gray-300 text-lg px-4",
                      !checkIn && "text-gray-500"
                    )}
                  >
                    {/* CORRECTED: Wrapped the icon and text in a single div */}
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5 text-gray-600" />
                        <span>{checkIn ? format(checkIn, "PPP") : 'Select check-in date'}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-lg" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      setCheckIn(date);
                      setCheckInCalendarOpen(false);
                      if (checkOut && date > checkOut) {
                        setCheckOut(null);
                      }
                    }}
                    disabled={(date) => date < today}
                    initialFocus
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-3">
              <Label htmlFor="checkout" className="flex items-center gap-2 text-gray-700 font-semibold text-base">
                <CalendarIcon size={18} className="text-gray-600" /> Check-out Date
              </Label>
              <Popover open={checkOutCalendarOpen} onOpenChange={setCheckOutCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-14 justify-start text-left font-normal rounded-lg border-gray-300 text-lg px-4",
                      !checkOut && "text-gray-500"
                    )}
                    disabled={!checkIn}
                  >
                    {/* CORRECTED: Wrapped the icon and text in a single div */}
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5 text-gray-600" />
                        <span>{checkOut ? format(checkOut, "PPP") : 'Select check-out date'}</span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-lg" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      setCheckOut(date);
                      setCheckOutCalendarOpen(false);
                    }}
                    disabled={(date) => date < checkIn}
                    initialFocus
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="guests" className="flex items-center gap-2 text-gray-700 font-semibold text-base">
              <Users size={18} className="text-gray-600" /> Number of Guests
            </Label>
            <Input
              id="guests"
              type="number"
              min="1"
              placeholder="e.g., 2"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="h-14 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-lg px-4 w-full"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full mt-6 h-14 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-200"
            size="lg"
          >
            Inquire Now via WhatsApp
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}