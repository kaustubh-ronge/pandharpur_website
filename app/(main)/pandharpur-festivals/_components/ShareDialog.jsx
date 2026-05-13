"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ShareDialog({ isOpen, onOpenChange, festival, copyShareLink }) {
    const festivalName = festival?.name || festival?.title || 'this festival';

    const handleTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?text=Check out ${festivalName} in Pandharpur&url=${window.location.href}`, '_blank');
        onOpenChange(false);
    };

    const handleFacebookShare = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share {festivalName}</DialogTitle>
                    <DialogDescription>Spread the word about this sacred celebration.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" className="flex-1" onClick={copyShareLink}>Copy Link</Button>
                        <Button variant="outline" className="flex-1" onClick={handleTwitterShare}>Twitter</Button>
                        <Button variant="outline" className="flex-1" onClick={handleFacebookShare}>Facebook</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}