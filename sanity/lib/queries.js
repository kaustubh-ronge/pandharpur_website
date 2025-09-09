// This query now FILTERS OUT the 'none' plan and then sorts the rest.
export const getAllHotelsQuery = `
  *[_type == "hotel" && subscriptionPlan != 'none']{
    ...,
    "slug": slug.current,
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
    "sortOrder": select(
      subscriptionPlan == 'premium' => 1,
      subscriptionPlan == 'standard' => 2,
      subscriptionPlan == 'basic' => 3
    )
  } | order(sortOrder asc, isFeatured desc, _createdAt desc)
`;

// This query remains unchanged.
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
    nearbyAttractions,
    subscriptionPlan
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

// --- NEW OTHER ATTRACTION QUERIES ---

// Fetches all categories and their associated attractions for the list page.
export const getAttractionsByCategoryQuery = `
  *[_type == "otherAttractionCategory"] | order(title asc) {
    _id,
    title,
    description,
    "attractions": *[_type == "otherAttraction" && references(^._id)] | order(isFeatured desc, name asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      isFeatured
    }
  }
`;

// Fetches one specific attraction by its slug for the detail page.
export const getAttractionBySlugQuery = `
  *[_type == "otherAttraction" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "category": category->title,
    isFeatured,
    address,
    website,
    description,
    detailedDescription,
    "image": image.asset->url,
    phoneNumber,
    googleMapsEmbedUrl,
    timings,
    entryFee,
    "gallery": gallery[].asset->url
  }
`;

// Fetches only the slugs for all attractions to generate static pages.
export const getAttractionSlugsQuery = `
*[_type == "otherAttraction" && defined(slug.current)][].slug.current
`;
