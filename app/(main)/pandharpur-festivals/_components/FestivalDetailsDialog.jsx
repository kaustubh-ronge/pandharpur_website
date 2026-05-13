"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin } from "lucide-react";

export default function FestivalDetailsDialog({ isOpen, onOpenChange, festival }) {
    if (!festival) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{festival.name}</DialogTitle>
                    <DialogDescription>{festival.date} • {festival.duration}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto">
                    <div className="relative h-64 rounded-lg overflow-hidden">
                        <Image src={festival.image} alt={festival.name} fill className="object-cover" />
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">About this festival</h4>
                        <p className="text-gray-600">{festival.longDescription || festival.description}</p>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="font-medium mb-2">Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                            {festival.highlights.map((highlight, i) => (
                                <Badge key={i} variant="outline" className="text-sm">{highlight}</Badge>
                            ))}
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {festival.schedule && (
                            <div>
                                <h4 className="font-medium mb-2">Schedule</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {festival.schedule.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-orange-500" />
                                            <span>{item.time}: {item.event}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div>
                            <h4 className="font-medium mb-2">Location</h4>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>{festival.location || "Vitthal Temple, Pandharpur"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}