// This query fetches all hotels for the list view.
// It's updated to sort featured hotels to the top.
export const getAllHotelsQuery = `
  *[_type == "hotel"] | order(isFeatured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    address,
    website,
    description,
    "image": image.asset->url,
    category,
    rating,
    isFeatured
  }
`;

// This query fetches one specific hotel by its slug for the detail page.
// It's updated to include all the new descriptive fields.
export const getHotelBySlugQuery = `
  *[_type == "hotel" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    isFeatured,
    address,
    website,
    description,
    detailedDescription,
    "image": image.asset->url,
    phoneNumber,
    email,
    googleMapsEmbedUrl,
    priceRange,
    checkInTime,
    checkOutTime,
    policies,
    facilities,
    category,
    "gallery": gallery[].asset->url,
    rating,
    roomTypes,
    nearbyAttractions
  }
`;

// / --- NEW BHAKTANIWAS QUERIES ---

// Fetches all bhaktaniwas for the list view
export const getAllBhaktaniwasQuery = `
  *[_type == "bhaktaniwas"] | order(isFeatured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    managedBy,
    description,
    "image": image.asset->url,
    isFeatured
  }
`;

// Fetches one specific bhaktaniwas by its slug for the detail page
export const getBhaktaniwasBySlugQuery = `
  *[_type == "bhaktaniwas" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    managedBy,
    isFeatured,
    address,
    website,
    description,
    detailedDescription,
    "image": image.asset->url,
    phoneNumber,
    googleMapsEmbedUrl,
    bookingType,
    capacity,
    facilities,
    "gallery": gallery[].asset->url
  }
`;

// --- EXISTING QUERIES ---
// (Keep your hotel and bhaktaniwas queries here)


// --- NEW TEMPLE QUERIES ---

// This query fetches all temples for the list view
export const getAllTemplesQuery = `
  *[_type == "temple"] | order(isFeatured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    presidingDeity,
    description,
    "image": image.asset->url,
    isFeatured
  }
`;

// This query fetches one specific temple by its slug for the detail page
export const getTempleBySlugQuery = `
  *[_type == "temple" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    presidingDeity,
    isFeatured,
    address,
    website,
    description,
    historyAndSignificance,
    darshanTimings,
    majorFestivals,
    "image": image.asset->url,
    phoneNumber,
    googleMapsEmbedUrl,
    "gallery": gallery[].asset->url
  }
`;

// --- EXISTING QUERIES ---
// (It's good practice to keep all queries in one file)


// --- NEW RESTAURANT QUERIES ---

// This query fetches all restaurants for the list view
export const getAllRestaurantsQuery = `
  *[_type == "restaurant"] | order(isFeatured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    cuisineType,
    priceIndicator,
    description,
    "image": image.asset->url,
    isFeatured
  }
`;

// This query fetches one specific restaurant by its slug for the detail page
export const getRestaurantBySlugQuery = `
  *[_type == "restaurant" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    isFeatured,
    address,
    description,
    detailedDescription,
    "image": image.asset->url,
    phoneNumber,
    googleMapsEmbedUrl,
    cuisineType,
    specialtyDish,
    mealTypes,
    priceIndicator,
    "gallery": gallery[].asset->url
  }
`;


// --- EXISTING QUERIES ---
// (It's good practice to keep all your queries in one file)


// --- NEW TRAVEL QUERIES ---

// This query fetches all travel options for the list view
export const getAllTravelsQuery = `
  *[_type == "travel"] | order(isFeatured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    travelType,
    description,
    "image": image.asset->url,
    isFeatured
  }
`;

// This query fetches one specific travel option by its slug for the detail page
export const getTravelBySlugQuery = `
  *[_type == "travel" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    isFeatured,
    address,
    website,
    description,
    detailedDescription,
    "image": image.asset->url,
    phoneNumber,
    googleMapsEmbedUrl,
    travelType,
    operatingHours,
    keyRoutes
  }
`;



/**
 * GROQ (Graph-Relational Object Queries) for Fetching Data from Sanity
 *
 * This file centralizes all the queries used in the application.
 * Using a separate file for queries makes the code more organized and reusable.
 */
// Query to get all attractions, grouped by their category, for the main listing page.
export const attractionsQuery = `
*[_type == "category"] | order(title asc) {
  _id,
  title,
  "attractions": *[_type == "attraction" && references(^._id)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
}
`

// Query to get a single attraction by its unique slug for the detail page.
export const attractionBySlugQuery = `
*[_type == "attraction" && slug.current == $slug][0] {
  _id,
  title,
  "category": category->title,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt,
  gallery[] {
    "imageUrl": asset->url,
    alt,
    caption
  },
  location {
    address,
    googleMapsUrl
  },
  description
}
`

// Query to get all attraction slugs. This is used by Next.js to generate static pages.
export const attractionPathsQuery = `
*[_type == "attraction" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}
`