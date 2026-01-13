"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createJoinUsInquiry } from "@/actions/joinUsActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Phone, Building, MessageCircle, Send } from "lucide-react"; // <-- Import icons

// Animation Variants can be shared between forms
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

const JoinUsInquiryForm = ({ ownerWhatsAppNumber }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [entityType, setEntityType] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // --- Phone validation logic from previous step ---
        if (!name || !phone || !entityType || !message) {
            toast.error("Please fill in all the required fields.");
            return;
        }
        let number = phone.replace(/\D/g, '');
        if (number.length === 11 && number.startsWith('0')) number = number.substring(1);
        else if (number.length === 12 && number.startsWith('91')) number = number.substring(2);

        if (number.length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }
        const cleanUserPhone = `91${number}`;
        // --- End of validation logic ---

        if (!ownerWhatsAppNumber) {
            toast.error("Cannot send message: Owner contact is unavailable.");
            return;
        }

        setIsSubmitting(true);

        try {
            const cleanOwnerPhone = ownerWhatsAppNumber.replace(/\D/g, "");
            const inquiryMessage = `🤝 *New Partnership Inquiry via PandharpurDarshan.com*\n\n` +
                `Hello, I found you through the "Partner with Us" section on PandharpurDarshan.com and I'm interested in joining the network.\n\n` +
                `*My Details:*\n` +
                `  • *Name:* ${name}\n` +
                `  • *Phone:* ${phone}\n` + // Send the original number user typed
                `  • *Business Type:* ${entityType}\n\n` +
                `*Message:*\n` +
                `_"${message}"_\n\n` +
                `Please let me know the next steps. Thank you.\n\n` +
                `--- \n_This lead was generated from PandharpurDarshan.com_`;
            const encodedMessage = encodeURIComponent(inquiryMessage);

            let whatsappUrl;
            if (isMobileDevice()) {
                whatsappUrl = `https://wa.me/${cleanOwnerPhone}?text=${encodedMessage}`;
            } else {
                whatsappUrl = `https://web.whatsapp.com/send?phone=${cleanOwnerPhone}&text=${encodedMessage}`;
            }

            window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            createJoinUsInquiry({ name, phone, entityType, message }).then(result => {
                if (result.success) {
                    toast.success("Your inquiry has been recorded!");
                }
            });

            setName("");
            setPhone("");
            setEntityType("");
            setMessage("");

        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // The outer card now uses standard shadcn styling, which respects light/dark mode
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">
                    Partner with Us
                </CardTitle>
                <CardDescription>
                    Join our network of local businesses and services.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* The motion.form now contains the styled fields */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Grid layout for Name and Phone, just like the other form */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                                <User className="mr-2 h-4 w-4 text-orange-500" /> Full Name
                            </Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="h-14 text-base rounded-lg placeholder:text-slate-500" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-orange-500" /> Phone Number
                            </Label>
                            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="e.g., 9876543210" className="h-14 text-base rounded-lg placeholder:text-slate-500" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="entityType" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                            <Building className="mr-2 h-4 w-4 text-orange-500" /> You are a
                        </Label>
                        <Select name="entityType" value={entityType} onValueChange={setEntityType} required>
                            <SelectTrigger className="w-full h-14 text-base rounded-lg text-slate-800 dark:text-slate-200">
                                <SelectValue placeholder="Select your business type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hotel">Hotel</SelectItem>
                                <SelectItem value="bhaktaniwas">Bhaktaniwas</SelectItem>
                                <SelectItem value="travels">Travels</SelectItem>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="temple">Temple</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
                            <MessageCircle className="mr-2 h-4 w-4 text-orange-500" /> Message
                        </Label>
                        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tell us about your business..." className="min-h-[120px] text-base rounded-lg placeholder:text-slate-500" />
                    </motion.div>

                    {/* Styled submit button */}
                    <motion.div variants={itemVariants}>
                        <Button type="submit" disabled={isSubmitting} className="w-full group h-14 text-base font-bold rounded-lg text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/20">
                            {isSubmitting ? "Submitting..." : "Send via WhatsApp"}
                            <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Button>
                    </motion.div>
                </motion.form>
            </CardContent>
        </Card>
    );
};

export default JoinUsInquiryForm;