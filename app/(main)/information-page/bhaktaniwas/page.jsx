import { client } from "@/sanity/lib/client";
import { getAllBhaktaniwasQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Home, Award } from "lucide-react";

// --- UI Components ---

function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-block bg-orange-100 text-orange-700 p-3 rounded-full mb-4">
        <Home className="h-8 w-8" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">{title}</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-500">{subtitle}</p>
    </div>
  );
}

function BhaktaniwasCard({ item }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-52">
        <Image
          src={item.image || 'https://placehold.co/600x400/FB923C/FFFFFF?text=Bhaktaniwas'}
          alt={`Image of ${item.name}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.isFeatured && (
          <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Award className="h-4 w-4" />
            <span>FEATURED</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div>
          {item.managedBy && <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-1">{item.managedBy}</p>}
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{item.description}</p>
        </div>
        <div className="mt-auto pt-4">
          <Link href={`/information-page/bhaktaniwas/${item.slug}`}>
            <button className="w-full text-center px-4 py-2 rounded-lg font-semibold text-sm bg-gray-800 text-white hover:bg-gray-900 transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default async function BhaktaniwasPage() {
  const allBhaktaniwas = await client.fetch(getAllBhaktaniwasQuery);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <PageHeader
          title="Bhaktaniwas in Pandharpur"
          subtitle="Find affordable and convenient accommodations managed by various trusts, offering a peaceful stay for pilgrims."
        />
        
        {allBhaktaniwas && allBhaktaniwas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBhaktaniwas.map((item) => (
              <BhaktaniwasCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No Bhaktaniwas information found. Please check back later.</p>
        )}
      </div>
    </div>
  );
}