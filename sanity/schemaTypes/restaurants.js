// // This is the schema for Restaurants.
// const restaurant = {
//   name: "restaurant",
//   title: "Restaurants",
//   type: "document",
//   fields: [
//     // --- Basic Information ---
//     {
//       name: "name",
//       title: "Restaurant Name",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: 'isFeatured',
//       title: 'Featured Restaurant',
//       type: 'boolean',
//       description: 'Feature this restaurant to make it stand out.',
//       initialValue: false,
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
//       title: "Main Image (Front view, food, or ambiance)",
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
//     {
//       name: "detailedDescription",
//       title: "Detailed Description (for detail page)",
//       type: "array",
//       of: [{ type: "block" }],
//     },

//     // --- Cuisine & Menu ---
//     {
//       name: 'cuisineType',
//       title: 'Cuisine Type',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Maharashtrian Thali', value: 'maharashtrian-thali' },
//           { title: 'Pure Veg Dining', value: 'pure-veg' },
//           { title: 'South Indian', value: 'south-indian' },
//           { title: 'Fast Food / Quick Bites', value: 'quick-bites' },
//           { title: 'Prasad Bhojanalay', value: 'prasad-bhojanalay' },
//         ],
//       },
//        validation: (Rule) => Rule.required(),
//     },
//     {
//         name: 'specialtyDish',
//         title: 'Specialty Dish',
//         type: 'string',
//         description: 'e.g., Pithla Bhakri, Sabudana Khichdi, Masala Dosa'
//     },
//     {
//         name: 'mealTypes',
//         title: 'Serves (Meal Types)',
//         type: 'array',
//         of: [{type: 'string'}],
//         options: {
//             list: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
//             layout: 'tags'
//         }
//     },
//      {
//       name: "priceIndicator",
//       title: "Price Indicator",
//       type: "string",
//       options: {
//         list: [
//             {title: '₹ (Budget-friendly)', value: 'budget'},
//             {title: '₹₹ (Mid-range)', value: 'mid-range'},
//             {title: '₹₹₹ (Premium)', value: 'premium'},
//         ]
//       }
//     },

//     // --- Location & Contact ---
//     {
//       name: "address",
//       title: "Address",
//       type: "string",
//       validation: (Rule) => Rule.required(),
//     },
//     {
//       name: "phoneNumber",
//       title: "Contact Phone Number",
//       type: "string",
//     },
//     {
//       name: "googleMapsEmbedUrl",
//       title: "Google Maps Embed URL",
//       type: "url",
//     },

//     // --- Media ---
//     {
//       name: "gallery",
//       title: "Photo Gallery (food, interior, etc.)",
//       type: "array",
//       of: [{ type: "image", options: { hotspot: true } }],
//     },
//   ],
//   icon: () => '🍽️',
// };

// export default restaurant;

// This is the schema for Restaurants.
const restaurant = {
  name: "restaurant",
  title: "Restaurants",
  type: "document",
  // Groups to organize fields into tabs in the Sanity Studio
  groups: [
    { name: "basic", title: "Basic Information", default: true },
    { name: "menu", title: "Cuisine & Menu" },
    { name: "location", title: "Location & Contact" },
    { name: "media", title: "Media" },
  ],
  fields: [
    // --- Basic Information ---
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "basic",
    },
    {
      name: "isFeatured",
      title: "Featured Restaurant",
      type: "boolean",
      description: "Feature this restaurant to make it stand out.",
      initialValue: false,
      group: "basic",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "basic",
    },
    {
      name: "image",
      title: "Main Image (Front view, food, or ambiance)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      group: "media",
    },
    {
      name: "description",
      title: "Short Description (for list view)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
      group: "basic",
    },
    {
      name: "detailedDescription",
      title: "Detailed Description (for detail page)",
      type: "array",
      of: [{ type: "block" }],
      group: "basic",
    }, // --- Cuisine & Menu ---

    {
      name: "cuisineType",
      title: "Cuisine Type",
      type: "string",
      options: {
        list: [
          { title: "Maharashtrian Thali", value: "maharashtrian-thali" },
          { title: "Pure Veg Dining", value: "pure-veg" },
          { title: "South Indian", value: "south-indian" },
          { title: "Fast Food / Quick Bites", value: "quick-bites" },
          { title: "Prasad Bhojanalay", value: "prasad-bhojanalay" },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: "menu",
    },
    {
      name: "specialtyDish",
      title: "Specialty Dish",
      type: "string",
      description: "e.g., Pithla Bhakri, Sabudana Khichdi, Masala Dosa",
      group: "menu",
    },
    {
      name: "mealTypes",
      title: "Serves (Meal Types)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["Breakfast", "Lunch", "Dinner", "Snacks"],
        layout: "tags",
      },
      group: "menu",
    },
    {
      name: "priceIndicator",
      title: "Price Indicator",
      type: "string",
      options: {
        list: [
          { title: "₹ (Budget-friendly)", value: "budget" },
          { title: "₹₹ (Mid-range)", value: "mid-range" },
          { title: "₹₹₹ (Premium)", value: "premium" },
        ],
      },
      group: "menu",
    },
    // --- NEW: OPTIONAL MENU FIELDS ---
    {
      name: "menuImages",
      title: "Menu Card Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload clear photos of your menu pages.",
      group: "menu",
    },
    {
      name: "menuPdf",
      title: "Downloadable Menu (PDF)",
      type: "file",
      options: {
        accept: ".pdf", // Ensures only PDF files can be uploaded
      },
      description: "Upload a single PDF file of your complete menu.",
      group: "menu",
    }, // --- Location & Contact ---

    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "location",
    },
    {
      name: "phoneNumber",
      title: "Contact Phone Number",
      type: "string",
      group: "location",
    },
    {
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      group: "location",
    }, // --- Media ---

    {
      name: "gallery",
      title: "Photo Gallery (food, interior, etc.)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "media",
    },
  ],
  icon: () => "🍽️",
};

export default restaurant;
