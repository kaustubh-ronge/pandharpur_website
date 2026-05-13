import { CategoryGrid } from "./_components/CategoryGrid";
import { PageHeader } from "./_components/PageHeader";

export default function InformationPage() {
  return (
    <section className="relative py-20 px-6 md:px-12 mt-15">
      <div className="relative z-10 max-w-6xl mx-auto">
        <PageHeader 
          badge="Pilgrim Information"
          title="Your Guide to Pandharpur"
          subtitle="Find all the information you need for a comfortable spiritual journey."
        />
        
        <CategoryGrid />
      </div>
    </section>
  );
}