
// // FILE: components/InquiryModal.jsx
// "use client";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
// import { HotelInquiryForm } from "./HotelInquiryForm";

// export function InquiryDrawer({ type, data, children }) {
//   const [open, setOpen] = useState(false);
//   const closeModal = () => setOpen(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader className="text-center pb-2">
//           <DialogTitle className="text-2xl font-bold text-gray-800">Inquiry for {data.name}</DialogTitle>
//           <DialogDescription className="text-gray-600 mt-2 text-base">
//             Your details will be sent directly to the owner via WhatsApp.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="px-1 pb-6 pt-4">
//           {type === 'hotel' && <HotelInquiryForm hotel={data} onFormSubmit={closeModal} />}
//           {/* Add other types like 'bhaktaniwas' here in the future */}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// FILE: components/InquiryModal.jsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { HotelInquiryForm } from "./HotelInquiryForm";

export function InquiryDrawer({ type, data, children }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-2xl font-bold text-gray-800">Inquiry for {data.name}</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2 text-base">
            Your details will be sent directly to the owner via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="px-1 pb-6 pt-4">
          {type === 'hotel' && <HotelInquiryForm hotel={data} onFormSubmit={closeModal} />}
          {/* Add other types like 'bhaktaniwas' here in the future */}
        </div>
      </DialogContent>
    </Dialog>
  );
}