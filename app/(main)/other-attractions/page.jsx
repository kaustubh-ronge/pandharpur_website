
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { getAttractionsByCategoryQuery } from '@/sanity/lib/queries';

export const revalidate = 60;

export default async function OtherAttractionsPage() {
  const categories = await client.fetch(getAttractionsByCategoryQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Other Attractions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover more of what Pandharpur has to offer beyond the main pilgrimage sites.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map(category => (
          category.attractions && category.attractions.length > 0 && (
            <section key={category._id} className="mb-12">
              <div className="flex items-center mb-8">
                <div className="h-0.5 bg-amber-500 flex-grow mr-4"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap">
                  {category.title}
                </h2>
                <div className="h-0.5 bg-amber-500 flex-grow ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.attractions.map(attraction => (
                  <Link 
                    href={`/other-attractions/${attraction.slug}`} 
                    key={attraction._id} 
                    className="block group transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                      <div className="relative h-56 w-full overflow-hidden">
                        {attraction.image ? (
                          <img 
                            src={attraction.image} 
                            alt={attraction.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No Image Available</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                          {attraction.name}
                        </h3>
                        <p className="text-gray-600 mt-2 line-clamp-3 flex-grow">
                          {attraction.description}
                        </p>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <span className="text-amber-600 font-medium inline-flex items-center group-hover:underline">
                            Explore more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>
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