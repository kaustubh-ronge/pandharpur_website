import { client } from '@/sanity/lib/sanity';
import { attractionBySlugQuery, attractionPathsQuery } from '@/sanity/lib/queries';
import AttractionClient from './_components/AttractionClient';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// This function runs at build time on the server to generate all static pages
export async function generateStaticParams() {
  try {
    const paths = await client.fetch(attractionPathsQuery);
    return paths;
  } catch (error) {
    console.error("Failed to fetch paths for attractions:", error);
    return []; // Return empty array on error to prevent build failure
  }
}

// This function fetches the data for a single attraction on the server
async function getAttraction(slug) {
  try {
    // We pass the slug parameter to the query
    const data = await client.fetch(attractionBySlugQuery, { slug });
    return data;
  } catch (error) {
    console.error(`Failed to fetch attraction data for slug "${slug}":`, error);
    return null; // Return null on error
  }
}

/**
 * This is the main Server Component for the attraction detail page.
 * Its only jobs are to fetch data and render the client component that handles the UI.
 */
export default async function AttractionDetailPage({ params }) {
  const attraction = await getAttraction(params.slug);

  // If no attraction data is found, we show a "Not Found" page.
  // This is a robust way to handle missing content.
  if (!attraction) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Attraction Not Found</h1>
          <p className="text-gray-600 mb-6">The page you are looking for might have been removed or does not exist.</p>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/other-attractions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Attractions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // If data is found, we pass it to the Client Component to render.
  return <AttractionClient attraction={attraction} />;
}
