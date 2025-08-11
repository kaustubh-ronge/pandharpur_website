

export const getAllHotelsQuery = `
  *[_type == "hotel"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    address,
    website,
    description,
    "image": image.asset->url,
    phoneNumber,
    email,
    locationMapUrl,
    priceRange,
    facilities,
    category,
    "gallery": gallery[].asset->url,
    rating
  }
`;

export const templesQuery = `*[_type == "temple"] {
  name,
  "image": image.asset->url,
  description,
  topAttraction,
  timing,
  location
}`;


export const majorFestivalsQuery = `
  *[_type == "festival" && type == "major"] | order(date asc) {
    _id,
    name,
    date,
    description,
    "imageUrl": image.asset->url,
    highlights,
    schedule[] {
      time,
      event
    },
    attendance
  }
`;

export const monthlyEventsQuery = `
  *[_type == "festival" && type == "monthly"] | order(date asc) {
    _id,
    name,
    date,
    description,
    "imageUrl": image.asset->url,
    highlights,
    frequency
  }
`;

export const dailyRitualsQuery = `
  *[_type == "festival" && type == "daily"] | order(date asc) {
    _id,
    name,
    date,
    description,
    highlights
  }
`;

export const festivalHighlightsQuery = `
  *[_type == "festival" && defined(image)] | order(date desc) [0..5] {
    _id,
    name,
    date,
    description,
    "imageUrl": image.asset->url,
    type
  }
`;