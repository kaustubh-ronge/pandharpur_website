import { client } from "@/sanity/lib/client";
import { getOwnerWhatsAppNumberQuery } from "@/sanity/lib/queries";
import JoinUsClientPage from "./_components/JoinUsClientPage";

// The page remains a server component to fetch data
const JoinUsPage = async () => {
  // Fetch the data on the server before the page loads
  const ownerContact = await client.fetch(getOwnerWhatsAppNumberQuery);
  const ownerWhatsAppNumber = ownerContact?.whatsappNumber;

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      {/* --- Decorative Background --- */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-orange-50 to-red-100 dark:from-slate-950 dark:via-slate-900 dark:to-black"></div>
      </div>
      
      {/* --- Main Content --- */}
      <div className="relative z-10">
        <JoinUsClientPage ownerWhatsAppNumber={ownerWhatsAppNumber} />
      </div>
    </div>
  );
};

export default JoinUsPage;