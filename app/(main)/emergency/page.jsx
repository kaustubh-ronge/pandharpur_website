"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Phone, Mail, MapPin, Clock, AlertCircle, HelpCircle, Shield, Users, MessageSquare, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const HelpCentrePage = () => {
    const [activeTab, setActiveTab] = useState("emergency");
    const [openContactDialog, setOpenContactDialog] = useState(false);

    // Help categories data
    const helpCategories = [
        {
            id: 1,
            title: "Emergency Services",
            icon: <AlertCircle className="h-6 w-6 text-red-500" />,
            items: [
                {
                    title: "Police Emergency",
                    number: "100",
                    description: "For immediate police assistance"
                },
                {
                    title: "Medical Emergency",
                    number: "108",
                    description: "Ambulance and medical emergencies"
                },
                {
                    title: "Women's Helpline",
                    number: "1091",
                    description: "24/7 support for women in distress"
                },
                {
                    title: "Child Helpline",
                    number: "1098",
                    description: "Help for children in need of care and protection"
                }
            ]
        },
        {
            id: 2,
            title: "Local Contacts",
            icon: <MapPin className="h-6 w-6 text-blue-500" />,
            items: [
                {
                    title: "Pandharpur Police Station",
                    number: "02186-222222",
                    description: "Main police station for Pandharpur area"
                },
                {
                    title: "District Hospital",
                    number: "02186-223344",
                    description: "24-hour emergency medical services"
                },
                {
                    title: "Municipal Office",
                    number: "02186-225566",
                    description: "City administration and services"
                },
                {
                    title: "Fire Brigade",
                    number: "101",
                    description: "Fire and rescue services"
                }
            ]
        },
        {
            id: 3,
            title: "Community Support",
            icon: <Users className="h-6 w-6 text-green-500" />,
            items: [
                {
                    title: "Senior Citizen Help",
                    number: "14567",
                    description: "Support for elderly citizens"
                },
                {
                    title: "Mental Health Support",
                    number: "1800-599-0019",
                    description: "24/7 counseling services"
                },
                {
                    title: "Disability Support",
                    number: "1800-233-1255",
                    description: "Assistance for persons with disabilities"
                },
                {
                    title: "Community Volunteers",
                    number: "02186-229900",
                    description: "Local volunteer network"
                }
            ]
        }
    ];

    // FAQ data
    const faqs = [
        {
            question: "How do I report a non-emergency issue?",
            answer: "For non-emergency issues, you can visit your local police station during working hours or call the non-emergency police line at 02186-224488."
        },
        {
            question: "Where is the nearest 24-hour pharmacy?",
            answer: "The Panduranga Medical Store near the district hospital operates 24 hours. Contact: 02186-227788."
        },
        {
            question: "How can I get help for a homeless person?",
            answer: "Contact the Municipal Office at 02186-225566 or approach the Community Volunteers at 02186-229900 for assistance with shelter and support services."
        },
        {
            question: "What should I do if I lose my wallet or important documents?",
            answer: "1. File a report at the local police station. 2. Contact the Municipal Office for document replacement. 3. Notify your bank if cards were lost."
        },
        {
            question: "How can I volunteer to help in the community?",
            answer: "Visit the Community Support Center near Vitthal Temple or call 02186-229900 to register as a volunteer and learn about opportunities."
        }
    ];

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
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Community Support
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Emergency Contact
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Find emergency contacts, support services, and answers to common questions
                    </p>
                </motion.div>

                {/* Tabs */}
                <Tabs defaultValue="emergency" onValueChange={(value) => setActiveTab(value)} className="w-full mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <TabsList className="grid w-full grid-cols-3 relative">
                            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
                            <TabsTrigger value="faqs">FAQs</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                        </TabsList>
                    </motion.div>

                    {/* Emergency Contacts Tab */}
                    <TabsContent value="emergency">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <div className="grid md:grid-cols-3 gap-6">
                                {helpCategories.map((category) => (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: category.id * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="h-full border border-blue-200 bg-white/90 backdrop-blur-sm hover:shadow-md">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-3">
                                                    {category.icon}
                                                    <span>{category.title}</span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    {category.items.map((item, index) => (
                                                        <div key={index} className="space-y-1">
                                                            <h4 className="font-medium text-gray-700">{item.title}</h4>
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4 text-blue-500" />
                                                                <p className="text-gray-600">{item.number}</p>
                                                            </div>
                                                            <p className="text-sm text-gray-500">{item.description}</p>
                                                            {index < category.items.length - 1 && <Separator />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* FAQs Tab */}
                    <TabsContent value="faqs">
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
                                        <HelpCircle className="h-6 w-6 text-blue-600" />
                                        <span>Frequently Asked Questions</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Common questions and answers about community services
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {faqs.map((faq, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-gray-700">{faq.question}</h4>
                                                    <p className="text-gray-600">{faq.answer}</p>
                                                </div>
                                                {index < faqs.length - 1 && <Separator />}
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
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
                                                <Shield className="h-6 w-6 text-blue-600" />
                                                <span>Safety Resources</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-2">Personal Safety Tips</h4>
                                                    <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                                        <li>Always be aware of your surroundings</li>
                                                        <li>Keep emergency numbers saved in your phone</li>
                                                        <li>Avoid walking alone at night in poorly lit areas</li>
                                                        <li>Trust your instincts - if something feels wrong, leave</li>
                                                    </ul>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-2">Home Safety</h4>
                                                    <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                                        <li>Install proper locks on doors and windows</li>
                                                        <li>Get to know your neighbors</li>
                                                        <li>Keep emergency exits clear</li>
                                                        <li>Consider a neighborhood watch program</li>
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
                                                <MessageSquare className="h-6 w-6 text-blue-600" />
                                                <span>Community Support</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-2">Support Groups</h4>
                                                    <div className="space-y-3 text-gray-600">
                                                        <div>
                                                            <p className="font-medium">Senior Citizens Group</p>
                                                            <p className="text-sm">Meets every Tuesday at Community Center</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Women's Support Network</p>
                                                            <p className="text-sm">Weekly meetings, call 02186-228899 for details</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Youth Counseling</p>
                                                            <p className="text-sm">Free sessions available at District Hospital</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <h4 className="font-medium text-gray-700 mb-2">Community Services</h4>
                                                    <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                                        <li>Free medical camps first Sunday of every month</li>
                                                        <li>Legal aid clinic at Municipal Office every Friday</li>
                                                        <li>Disaster preparedness training available</li>
                                                    </ul>
                                                </div>
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
                            onClick={() => setOpenContactDialog(true)}
                        >
                            Contact Support <Phone className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                            Visit Community Center <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Our team is available 24/7 to assist with any questions or concerns
                    </p>
                </motion.div>
            </div>

            {/* Contact Dialog */}
            <Dialog open={openContactDialog} onOpenChange={setOpenContactDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Contact Support</DialogTitle>
                        <DialogDescription>
                            Choose how you'd like to contact our help center
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full h-16" onClick={() => {
                                window.location.href = "tel:02186228899";
                                setOpenContactDialog(false);
                            }}>
                                <div className="flex items-center gap-4 w-full">
                                    <Phone className="h-6 w-6 text-blue-500" />
                                    <div className="text-left">
                                        <p className="font-medium">Call Support</p>
                                        <p className="text-sm text-gray-500">02186-228899 (24/7)</p>
                                    </div>
                                </div>
                            </Button>
                            
                            <Button variant="outline" className="w-full h-16" onClick={() => {
                                window.location.href = "mailto:help@pandharpurcommunity.com";
                                setOpenContactDialog(false);
                            }}>
                                <div className="flex items-center gap-4 w-full">
                                    <Mail className="h-6 w-6 text-blue-500" />
                                    <div className="text-left">
                                        <p className="font-medium">Email Support</p>
                                        <p className="text-sm text-gray-500">help@pandharpurcommunity.com</p>
                                    </div>
                                </div>
                            </Button>
                            
                            <Button variant="outline" className="w-full h-16">
                                <div className="flex items-center gap-4 w-full">
                                    <MapPin className="h-6 w-6 text-blue-500" />
                                    <div className="text-left">
                                        <p className="font-medium">Visit In Person</p>
                                        <p className="text-sm text-gray-500">Community Center, Near Vitthal Temple</p>
                                    </div>
                                </div>
                            </Button>
                            
                            <Button variant="outline" className="w-full h-16">
                                <div className="flex items-center gap-4 w-full">
                                    <Clock className="h-6 w-6 text-blue-500" />
                                    <div className="text-left">
                                        <p className="font-medium">Operating Hours</p>
                                        <p className="text-sm text-gray-500">24/7 for emergencies, 8AM-8PM for general inquiries</p>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default HelpCentrePage;