import { SharedBackground } from "@/components/SharedBackGround";

// This layout applies the background ONLY to the information-page route.
export default function InformationPageLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <SharedBackground />     
      {/* The content of your information-page/page.jsx will be rendered here */}
      <main>
        {children}
      </main>
 
    </div>
  );
}