"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, MapPin, Clock, Calendar, AlertCircle, Phone, Mail, ChevronRight, ChevronLeft, Share2, Download, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { saveAs } from 'file-saver';

const MissingPersonsSection = () => {
    const [activeTab, setActiveTab] = useState("recent");
    const [sharedItem, setSharedItem] = useState(null);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [currentPersonIndex, setCurrentPersonIndex] = useState(0);

    // Missing persons data array
    const missingPersons = [
        {
            id: 1,
            name: "Rahul Sharma",
            age: 12,
            gender: "Male",
            lastSeen: "Pandharpur Bus Stand",
            lastSeenDate: "2023-11-15",
            image: "/missing-child1.jpg",
            description: "Last seen wearing blue school uniform with white stripes. Carrying a red backpack.",
            contact: "9823456710 (Father - Mr. Sanjay Sharma)",
            status: "Missing since 15 Nov 2023",
            details: {
                height: "4'5\"",
                distinguishingFeatures: "Mole on left cheek, scar on right knee",
                additionalInfo: "Was returning from school when last seen. May be disoriented as he has mild autism."
            }
        },
        {
            id: 2,
            name: "Priya Patel",
            age: 65,
            gender: "Female",
            lastSeen: "Near Vitthal Temple",
            lastSeenDate: "2023-12-05",
            image: "/missing-elderly.jpg",
            description: "Elderly woman last seen wearing green sari with yellow border. May appear confused.",
            contact: "Police Control Room: 100 or Family: 9876543210",
            status: "Missing since 5 Dec 2023",
            details: {
                height: "5'2\"",
                distinguishingFeatures: "Wears thick glasses, walks with slight limp",
                additionalInfo: "Has early stage dementia. May be trying to find her way to her ancestral home in Solapur."
            }
        },
        {
            id: 3,
            name: "Vijay Kulkarni",
            age: 32,
            gender: "Male",
            lastSeen: "Pandharpur Railway Station",
            lastSeenDate: "2023-12-20",
            image: "/missing-adult.jpg",
            description: "Last seen wearing black jeans and blue checked shirt. Carrying a black duffle bag.",
            contact: "Family: 9765432109 or Local Police: 02186-222222",
            status: "Missing since 20 Dec 2023",
            details: {
                height: "5'8\"",
                distinguishingFeatures: "Tattoo of OM symbol on right forearm",
                additionalInfo: "Was traveling to Mumbai but never arrived. Family concerned as he was depressed recently."
            }
        }
    ];

    const currentPerson = missingPersons[currentPersonIndex];

    const nextPerson = () => {
        setCurrentPersonIndex((prevIndex) => 
            prevIndex === missingPersons.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevPerson = () => {
        setCurrentPersonIndex((prevIndex) => 
            prevIndex === 0 ? missingPersons.length - 1 : prevIndex - 1
        );
    };

    // Handle share action
    const handleShare = (person) => {
        setSharedItem(person);
        setIsShareDialogOpen(true);

        if (navigator.share) {
            navigator.share({
                title: `Missing: ${person.name}`,
                text: `Help find ${person.name}, missing since ${person.lastSeenDate}. Last seen at ${person.lastSeen}`,
                url: window.location.href,
            }).catch(() => setIsShareDialogOpen(true));
        }
    };

    // Open details dialog
    const openDetails = (person) => {
        setSelectedPerson(person);
        setIsDetailsDialogOpen(true);
    };

    // Download missing person poster
    const downloadPoster = () => {
        const blob = new Blob([generatePosterContent()], { type: 'application/pdf' });
        saveAs(blob, `missing-${currentPerson.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        toast.success("Missing person poster downloaded");
    };

    // Generate poster content
    const generatePosterContent = () => {
        let content = `MISSING PERSON ALERT\n\n`;
        content += `Name: ${currentPerson.name}\n`;
        content += `Age: ${currentPerson.age}\n`;
        content += `Last Seen: ${currentPerson.lastSeen} on ${currentPerson.lastSeenDate}\n`;
        content += `Description: ${currentPerson.description}\n`;
        content += `Contact: ${currentPerson.contact}\n`;
        content += `Distinguishing Features: ${currentPerson.details.distinguishingFeatures}\n\n`;
        content += `If found, please contact local authorities immediately.`;
        return content;
    };

    // Report a missing person
    const reportMissingPerson = () => {
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => resolve({}), 1500);
            }),
            {
                loading: 'Connecting you to missing persons helpline...',
                success: 'Your report has been received! An officer will contact you shortly.',
                error: 'Failed to connect. Please try again or visit nearest police station.'
            }
        );
    };

    return (
        <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-15"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                />
                <motion.div
                    className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-25"
                    animate={{ y: [0, 25, 0] }}
                    transition={{ repeat: Infinity, duration: 7 }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge variant="outline" className="mb-4 border-blue-400 text-blue-600 px-4 py-1.5">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Community Alert
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Missing Persons
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Help reunite missing individuals with their families by sharing information
                    </p>
                </motion.div>

                {/* Missing Person Slider */}
                <div className="relative mb-12">
                    {/* Person Image Hero */}
                    <motion.div
                        key={currentPerson.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg"
                    >
                        <Image
                            src={currentPerson.image}
                            alt={currentPerson.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                            <div>
                                <h3 className="text-white text-2xl font-bold">{currentPerson.name}</h3>
                                <p className="text-blue-200">{currentPerson.status}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Arrows */}
                    {missingPersons.length > 1 && (
                        <>
                            <button 
                                onClick={prevPerson}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Previous person"
                            >
                                <ChevronLeft className="h-6 w-6 text-blue-600" />
                            </button>
                            <button 
                                onClick={nextPerson}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
                                aria-label="Next person"
                            >
                                <ChevronRight className="h-6 w-6 text-blue-600" />
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {missingPersons.length > 1 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            {missingPersons.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPersonIndex(index)}
                                    className={`w-3 h-3 rounded-full ${currentPersonIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    aria-label={`Go to person ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <Tabs defaultValue="recent" onValueChange={(value) => setActiveTab(value)} className="w-full mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <TabsList className="grid w-full grid-cols-2 relative">
                            <TabsTrigger value="recent">Recent Cases</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                        </TabsList>
                    </motion.div>

                    {/* Recent Cases Tab */}
                    <TabsContent value="recent">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <Card className="border border-blue-200 bg-white/90 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <User className="h-6 w-6 text-blue-600" />
                                        <span>Missing Person Details</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-gray-700">Last Seen Location</h4>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <MapPin className="h-5 w-5 text-blue-500" />
                                                    <p>{currentPerson.lastSeen}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-gray-700">Last Seen Date</h4>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="h-5 w-5 text-blue-500" />
                                                    <p>{currentPerson.lastSeenDate}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-gray-700">Contact Information</h4>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Phone className="h-5 w-5 text-blue-500" />
                                                    <p>{currentPerson.contact}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                                                <p className="text-gray-600">{currentPerson.description}</p>
                                            </div>
                                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                                <h4 className="font-medium text-blue-700 mb-2">Distinguishing Features</h4>
                                                <p className="text-gray-600 text-sm">{currentPerson.details.distinguishingFeatures}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-blue-50/50 border-t border-blue-100 justify-between">
                                    <Button
                                        variant="outline"
                                        className="border-blue-300 text-blue-600"
                                        onClick={downloadPoster}
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Poster
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="text-blue-600"
                                        onClick={() => openDetails(currentPerson)}
                                    >
                                        More Details <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* Resources Tab */}
                    <TabsContent value="resources">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Resource Card 1 */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="h-full border border-blue-200 bg-white/90 backdrop-blur-sm hover:shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <Phone className="h-6 w-6 text-blue-600" />
                                                <span>Emergency Contacts</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-2">Police & Authorities</h4>
                                                    <ul className="space-y-2 text-gray-600">
                                                        <li className="flex items-start gap-2">
                                                            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
                                                            <span>Police Emergency: <strong>100</strong></span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
                                                            <span>Women's Helpline: <strong>1091</strong></span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
                                                            <span>Child Helpline: <strong>1098</strong></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-2">Local Contacts</h4>
                                                    <ul className="space-y-2 text-gray-600">
                                                        <li className="flex items-start gap-2">
                                                            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
                                                            <span>Pandharpur Police Station: <strong>02186-222222</strong></span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
                                                            <span>District Missing Persons Unit: <strong>02186-223344</strong></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Resource Card 2 */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="h-full border border-blue-200 bg-white/90 backdrop-blur-sm hover:shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <Info className="h-6 w-6 text-blue-600" />
                                                <span>What To Do If Someone Goes Missing</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <ol className="space-y-3 text-gray-600 list-decimal list-inside">
                                                    <li>
                                                        <span className="font-medium">File a police report immediately</span> - Don't wait 24 hours
                                                    </li>
                                                    <li>
                                                        <span className="font-medium">Gather recent photos</span> - Clear, high-quality images
                                                    </li>
                                                    <li>
                                                        <span className="font-medium">Note last seen details</span> - Clothing, location, time
                                                    </li>
                                                    <li>
                                                        <span className="font-medium">Contact local hospitals</span> - Check emergency rooms
                                                    </li>
                                                    <li>
                                                        <span className="font-medium">Alert community networks</span> - Share on social media
                                                    </li>
                                                </ol>
                                                <Separator />
                                                <p className="text-sm text-gray-600">
                                                    Time is critical in missing person cases. The first 48 hours are most important for recovery.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                            onClick={reportMissingPerson}
                        >
                            Report a Missing Person <AlertCircle className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleShare(currentPerson)}
                        >
                            Share This Case <Share2 className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Your information could help reunite a family. All tips are confidential.
                    </p>
                </motion.div>
            </div>

            {/* Details Dialog */}
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    {selectedPerson && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Missing: {selectedPerson.name}</DialogTitle>
                                <DialogDescription>
                                    Last seen {selectedPerson.lastSeenDate} at {selectedPerson.lastSeen}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="relative h-64 rounded-lg overflow-hidden">
                                    <Image
                                        src={selectedPerson.image}
                                        alt={selectedPerson.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium mb-2">Physical Description</h4>
                                        <div className="space-y-2 text-gray-600">
                                            <p><span className="font-medium">Age:</span> {selectedPerson.age} years</p>
                                            <p><span className="font-medium">Gender:</span> {selectedPerson.gender}</p>
                                            <p><span className="font-medium">Height:</span> {selectedPerson.details.height}</p>
                                            <p><span className="font-medium">Features:</span> {selectedPerson.details.distinguishingFeatures}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Last Seen Information</h4>
                                        <div className="space-y-2 text-gray-600">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <p>{selectedPerson.lastSeen}</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Calendar className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <p>{selectedPerson.lastSeenDate}</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <p>Approximately {selectedPerson.details.lastSeenTime || "afternoon"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <h4 className="font-medium mb-2">Additional Information</h4>
                                    <p className="text-gray-600">{selectedPerson.details.additionalInfo}</p>
                                </div>
                                <Separator />
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-blue-700 mb-2">Contact Information</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-medium text-gray-700">Family Contact</p>
                                            <p className="text-gray-600">{selectedPerson.contact}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">Police Contact</p>
                                            <p className="text-gray-600">Pandharpur Police: 02186-222222 or Emergency: 100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Share Dialog */}
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share Missing Person Alert</DialogTitle>
                        <DialogDescription>
                            Help spread awareness about {sharedItem?.name || 'this case'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex justify-center gap-4">
                            <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link copied to clipboard!");
                                    setIsShareDialogOpen(false);
                                }}
                            >
                                <span>Copy Link</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    window.open(`https://twitter.com/intent/tweet?text=Help find ${sharedItem?.name}, missing since ${sharedItem?.lastSeenDate}. Last seen at ${sharedItem?.lastSeen}&url=${window.location.href}`, '_blank');
                                    setIsShareDialogOpen(false);
                                }}
                            >
                                <span>Twitter</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=Help find ${sharedItem?.name}, missing since ${sharedItem?.lastSeenDate}`, '_blank');
                                    setIsShareDialogOpen(false);
                                }}
                            >
                                <span>Facebook</span>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default MissingPersonsSection;