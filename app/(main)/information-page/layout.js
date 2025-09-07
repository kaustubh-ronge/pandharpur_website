import { AmberBackground } from "@/components/AmberSharedBackground";

// This layout applies the background ONLY to the information-page route.
export default function InformationPageLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <AmberBackground />     
      {/* The content of your information-page/page.jsx will be rendered here */}
      <main>
        {children}
      </main>
 
    </div>
  );
}