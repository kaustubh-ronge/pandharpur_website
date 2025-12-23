import { AmberBackground } from "@/components/AmberSharedBackground";

// This layout applies the background ONLY to the pandharpur-bookings route.
export default function InformationPageLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <AmberBackground />     
      {/* The content of your pandharpur-bookings/page.jsx will be rendered here */}
      <main>
        {children}
      </main>
 
    </div>
  );
}