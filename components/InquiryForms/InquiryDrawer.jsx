
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { HotelInquiryForm } from "./HotelInquiryForm";
import { BhaktaniwasInquiryForm } from "./BhaktaniwasInquiryForm";
import { TravelsInquiryForm } from "./TravelsInquiryForm";

export function InquiryDrawer({ type, data, children }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 text-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
          <DialogTitle className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            Inquiry for {data.name}
          </DialogTitle>
          <DialogDescription className="pt-1 text-slate-600 dark:text-slate-400">
            Your details will be sent directly to the owner via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-8 bg-white dark:bg-slate-950">
          {type === 'hotel' && <HotelInquiryForm hotel={data} onFormSubmit={closeModal} />}
          {type === 'bhaktaniwas' && <BhaktaniwasInquiryForm bhaktaniwas={data} onFormSubmit={closeModal} />}
          {type === 'travel' && <TravelsInquiryForm travel={data} onFormSubmit={closeModal} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}