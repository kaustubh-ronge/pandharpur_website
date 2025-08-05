// // lib/queries.js

// export const getAllHotelsQuery = `
//   *[_type == "hotel"] | order(_createdAt desc) {
//     _id,
//     name,
//     slug,
//     address,
//     website,
//     description,
//     "image": image.asset->url
//   }
// `;


export const getAllHotelsQuery = `
  *[_type == "hotel"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    address,
    website,
    description,
    "image": image.asset->url
  }
`;
