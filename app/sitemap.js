import { client } from "@/sanity/lib/sanity";

/**
 * Helper function to fetch slugs and last modification dates for a given schema type.
 * This keeps the code DRY (Don't Repeat Yourself).
 */
const fetchSanityDocuments = (schemaType) => {
  // We use a simple query to get only what the sitemap needs
  return client.fetch(`*[_type == "${schemaType}" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }`);
};

export default async function sitemap() {
  const baseUrl = 'https://yourdomain.com'; // ⚠️ Replace with your actual domain

  // --- 1. Fetch all dynamic content from Sanity concurrently ---
  const [
    hotels,
    bhaktaniwas,
    temples,
    travels,
    attractions,
    kirtankars,
    restaurants,
  ] = await Promise.all([
    fetchSanityDocuments('hotel'),
    fetchSanityDocuments('bhaktaniwas'),
    fetchSanityDocuments('temple'),
    fetchSanityDocuments('travel'),
    fetchSanityDocuments('otherAttraction'),
    fetchSanityDocuments('kirtankar'),
    fetchSanityDocuments('restaurant'),
  ]);

  // --- 2. Map dynamic content to the sitemap URL format ---
  const hotelUrls = hotels.map(item => ({
    url: `${baseUrl}/hotels/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const bhaktaniwasUrls = bhaktaniwas.map(item => ({
    url: `${baseUrl}/bhaktaniwas/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const templeUrls = temples.map(item => ({
    url: `${baseUrl}/temples/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const travelUrls = travels.map(item => ({
    url: `${baseUrl}/travel/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const attractionUrls = attractions.map(item => ({
    url: `${baseUrl}/pandharpur-attractions/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const kirtankarUrls = kirtankars.map(item => ({
    url: `${baseUrl}/kirtankars/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));

  const restaurantUrls = restaurants.map(item => ({
    url: `${baseUrl}/restaurants/${item.slug}`,
    lastModified: new Date(item._updatedAt),
  }));
  
  // --- 3. Define all your static page URLs ---
  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/emergency`, lastModified: new Date() },
    { url: `${baseUrl}/help`, lastModified: new Date() },
    { url: `${baseUrl}/join-us`, lastModified: new Date() },
    { url: `${baseUrl}/kirtankars`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-attractions`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-bookings`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-darshan-yatra-guide`, lastModified: new Date() },
    { url: `${baseUrl}/pandharpur-festivals`, lastModified: new Date() },
    { url: `${baseUrl}/restaurants`, lastModified: new Date() },
    { url: `${baseUrl}/travel`, lastModified: new Date() },
  ];
  
  // --- 4. Combine and return all URLs ---
  return [
    ...staticUrls,
    ...hotelUrls,
    ...bhaktaniwasUrls,
    ...templeUrls,
    ...travelUrls,
    ...attractionUrls,
    ...kirtankarUrls,
    ...restaurantUrls,
  ];
}