


// // const hotel = {
// //   name: "hotel",
// //   title: "Hotels",
// //   type: "document",
// //   fields: [
// //     {
// //       name: "name",
// //       title: "Hotel Name",
// //       type: "string",
// //       validation: (Rule) => Rule.required().min(3).max(100),
// //     },
// //     {
// //       name: "slug",
// //       title: "Slug",
// //       type: "slug",
// //       options: {
// //         source: "name",
// //         maxLength: 96,
// //       },
// //       validation: (Rule) => Rule.required(),
// //     },
// //     {
// //       name: "image",
// //       title: "Hotel Image",
// //       type: "image",
// //       options: {
// //         hotspot: true,
// //       },
// //       validation: (Rule) => Rule.required(),
// //     },
// //     {
// //       name: "address",
// //       title: "Address",
// //       type: "string",
// //       validation: (Rule) => Rule.required().min(10),
// //     },
// //     {
// //       name: "website",
// //       title: "Website URL",
// //       type: "url",
// //       description: "Full URL (e.g., https://hotelabc.com)",
// //       validation: (Rule) =>
// //         Rule.required().uri({ scheme: ["http", "https"] }),
// //     },
// //     {
// //       name: "description",
// //       title: "Short Description",
// //       type: "text",
// //       rows: 3,
// //       validation: (Rule) => Rule.required().min(10).max(300),
// //     },

// //     // ✅ Additional Optional Fields
// //     {
// //       name: "phoneNumber",
// //       title: "Phone Number",
// //       type: "string",
// //     },
// //     {
// //       name: "email",
// //       title: "Email",
// //       type: "string",
// //     },
// //     {
// //       name: "locationMapUrl",
// //       title: "Google Maps Link",
// //       type: "url",
// //     },
// //     {
// //       name: "priceRange",
// //       title: "Price Range",
// //       type: "string",
// //     },
// //     {
// //       name: "facilities",
// //       title: "Facilities",
// //       type: "array",
// //       of: [{ type: "string" }],
// //     },
// //     {
// //       name: "category",
// //       title: "Category",
// //       type: "string",
// //       options: {
// //         list: [
// //           { title: "Budget", value: "budget" },
// //           { title: "Deluxe", value: "deluxe" },
// //           { title: "Dharmashala", value: "dharmashala" },
// //           { title: "Lodge", value: "lodge" },
// //           { title: "Other", value: "other" },
// //         ],
// //       },
// //     },
// //     {
// //       name: "gallery",
// //       title: "Gallery",
// //       type: "array",
// //       of: [{ type: "image", options: { hotspot: true } }],
// //     },
// //     {
// //       name: "rating",
// //       title: "Rating (Static)",
// //       type: "number",
// //     },
// //   ],
// // };

// // export default hotel;



// // This is the updated and more descriptive schema for hotels.
// const hotel = {
//   name: "hotel",
//   title: "Hotels",
//   type: "document",
//   fields: [
//     // --- Basic Information ---
//     {
//       name: "name",
//       title: "Hotel Name",
//       type: "string",
//       validation: (Rule) => Rule.required().min(3).max(100),
//     },
//     {
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: { source: "name", maxLength: 96 },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "image",
//       title: "Main Hotel Image",
//       type: "image",
//       options: { hotspot: true },
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "description",
//       title: "Short Description (for list view)",
//       type: "text",
//       rows: 3,
//       validation: (Rule) => Rule.required().min(10).max(300),
//     },
//     // --- NEW: Detailed Rich Text Description ---
//     {
//       name: "detailedDescription",
//       title: "Detailed Description (for single page view)",
//       type: "array", // This enables rich text editing
//       of: [{ type: "block" }],
//     },

//     // --- Contact & Location ---
//     {
//       name: "address",
//       title: "Address",
//       type: "string",
//       validation: (Rule) => Rule.required().min(10),
//     },
//     {
//       name: "phoneNumber",
//       title: "Phone Number",
//       type: "string",
//     },
//     {
//       name: "email",
//       title: "Email",
//       type: "string",
//     },
//     {
//       name: "website",
//       title: "Website URL (for 'Book Now' button)",
//       type: "url",
//       description: "If you leave this empty, the 'Book Now' button will not appear.",
//     },
//     // --- NEW: Geolocation for Maps ---
//     {
//       name: "geolocation",
//       title: "Location on Map",
//       type: "geopoint", // This gives you a map interface in Sanity Studio!
//     },

//     // --- Details & Amenities ---
//     {
//       name: "category",
//       title: "Category",
//       type: "string",
//       options: {
//         list: [
//           { title: "Budget", value: "budget" },
//           { title: "Deluxe", value: "deluxe" },
//           { title: "Dharmashala", value: "dharmashala" },
//           { title: "Lodge", value: "lodge" },
//           { title: "Other", value: "other" },
//         ],
//       },
//     },
//     {
//       name: "priceRange",
//       title: "Price Range (e.g., ₹800 - ₹2500)",
//       type: "string",
//     },
//     {
//       name: "rating",
//       title: "Star Rating (1-5)",
//       type: "number",
//       options: { list: [1, 2, 3, 4, 5] },
//     },
//     {
//       name: "facilities",
//       title: "Facilities & Amenities",
//       type: "array",
//       of: [{ type: "string" }],
//       options: { layout: 'tags' } // Makes it easier to add items
//     },
//     // --- NEW: Room Types ---
//     {
//         name: 'roomTypes',
//         title: 'Room Types',
//         type: 'array',
//         of: [{
//             type: 'object',
//             fields: [
//                 { name: 'typeName', title: 'Type Name (e.g., AC Deluxe)', type: 'string' },
//                 { name: 'price', title: 'Price per night', type: 'number' },
//                 { name: 'amenities', title: 'Room Amenities', type: 'array', of: [{type: 'string'}], options: { layout: 'tags' } }
//             ]
//         }]
//     },

//     // --- Media ---
//     {
//       name: "gallery",
//       title: "Image Gallery",
//       type: "array",
//       of: [{ type: "image", options: { hotspot: true } }],
//     },
//   ],
// };

// export default hotel;


// This is the updated and more descriptive schema for hotels.
const hotel = {
  name: "hotel",
  title: "Hotels",
  type: "document",
  fields: [
    // --- Basic Information ---
    {
      name: "name",
      title: "Hotel Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Main Hotel Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description (for list view)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
    },
    {
      name: "detailedDescription",
      title: "Detailed Description (for single page view)",
      type: "array",
      of: [{ type: "block" }],
    },

    // --- Contact & Location ---
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required().min(10),
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "website",
      title: "Website URL (for 'Book Now' button)",
      type: "url",
      description: "If you leave this empty, the 'Book Now' button will not appear.",
    },
    // --- NEW: Replaced geopoint with a simple URL field for the map embed ---
    {
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "Go to Google Maps, find the hotel, click Share > Embed a map, and copy ONLY the URL from the src attribute of the iframe code.",
    },

    // --- Details & Amenities ---
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Budget", value: "budget" },
          { title: "Deluxe", value: "deluxe" },
          { title: "Dharmashala", value: "dharmashala" },
          { title: "Lodge", value: "lodge" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "priceRange",
      title: "Price Range (e.g., ₹800 - ₹2500)",
      type: "string",
    },
    {
      name: "rating",
      title: "Star Rating (1-5)",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
    },
    {
      name: "facilities",
      title: "Facilities & Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: 'tags' }
    },
    {
        name: 'roomTypes',
        title: 'Room Types',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                { name: 'typeName', title: 'Type Name (e.g., AC Deluxe)', type: 'string' },
                { name: 'price', title: 'Price per night', type: 'number' },
                { name: 'amenities', title: 'Room Amenities', type: 'array', of: [{type: 'string'}], options: { layout: 'tags' } }
            ]
        }]
    },

    // --- Media ---
    {
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
};

export default hotel;

