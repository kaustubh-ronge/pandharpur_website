import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { getAttractionsByCategoryQuery } from '@/sanity/lib/queries';

export const revalidate = 60; // Revalidate data at most once a minute

export default async function OtherAttractionsPage() {
  const categories = await client.fetch(getAttractionsByCategoryQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Other Attractions</h1>
        <p className="text-lg text-gray-600 mt-2">Discover more of what Pandharpur has to offer.</p>
      </div>

      <div className="space-y-12">
        {categories.map(category => (
          category.attractions && category.attractions.length > 0 && (
            <section key={category._id}>
              <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.attractions.map(attraction => (
                  <Link href={`/other-attractions/${attraction.slug}`} key={attraction._id} className="block group">
                    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-56 w-full">
                        {attraction.image ? (
                          <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold">{attraction.name}</h3>
                        <p className="text-gray-700 mt-2 line-clamp-3">{attraction.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </div>
  );
}