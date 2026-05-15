import { getOwnerWhatsAppNumberQuery } from "@/sanity/lib/queries";
import JoinUsClientPage from "./_components/JoinUsClientPage";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Join Us Page - Optimized for Performance.
 */

export const metadata = {
  title: 'Join Us | Partner Registration',
  robots: {
    index: false,
    follow: false,
  },
};

const JoinUsPage = async () => {
  // Performance: Using sanityFetch with tag instead of force-dynamic
  const ownerContact = await sanityFetch({
    query: getOwnerWhatsAppNumberQuery,
    tags: ['ownerContact']
  });
  
  const ownerWhatsAppNumber = ownerContact?.whatsappNumber;

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-orange-50 to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-black"></div>
      </div>
      
      <div className="relative z-10">
        <JoinUsClientPage ownerWhatsAppNumber={ownerWhatsAppNumber} />
      </div>
    </div>
  );
};

export default JoinUsPage;