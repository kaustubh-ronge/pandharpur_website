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