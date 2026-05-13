"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { HotelInquiryForm } from "./HotelInquiryForm";
import { BhaktaniwasInquiryForm } from "./BhaktaniwasInquiryForm";
import { TravelsInquiryForm } from "./TravelsInquiryForm";
import { KirtankarInquiryForm } from "./KirtankarInquiryForm";
import JoinUsInquiryForm from "./JoinUsInquiryForm";

// ✅ Add ownerWhatsAppNumber to props
export function InquiryDrawer({ type, data, children, ownerWhatsAppNumber }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  // ✅ Make title and description dynamic based on type
  const title = type === 'join-us' ? "Partner with Us" : `Inquiry for ${data?.name}`;
  const description = type === 'join-us'
    ? "Fill out the form below to get in touch. Your details will be sent to us via WhatsApp."
    : "Your details will be sent directly to the owner via WhatsApp.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 text-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
          <DialogTitle className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {title}
          </DialogTitle>
          <DialogDescription className="pt-1 text-slate-600 dark:text-slate-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-8 bg-white dark:bg-slate-950">
          {type === 'hotel' && <HotelInquiryForm hotel={data} onFormSubmit={closeModal} />}
          {type === 'bhaktaniwas' && <BhaktaniwasInquiryForm bhaktaniwas={data} onFormSubmit={closeModal} />}
          {type === 'travel' && <TravelsInquiryForm travel={data} onFormSubmit={closeModal} />}
          {type === 'join-us' && <JoinUsInquiryForm ownerWhatsAppNumber={ownerWhatsAppNumber} onFormSubmit={closeModal} />}
          {type === 'kirtankar' && <KirtankarInquiryForm kirtankar={data} onFormSubmit={closeModal} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}