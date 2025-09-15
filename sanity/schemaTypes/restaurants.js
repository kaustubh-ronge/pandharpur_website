// This is the schema for Restaurants.
const restaurant = {
  name: "restaurant",
  title: "Restaurants",
  type: "document",
  fields: [
    // --- Basic Information ---
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Featured Restaurant',
      type: 'boolean',
      description: 'Feature this restaurant to make it stand out.',
      initialValue: false,
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
      title: "Main Image (Front view, food, or ambiance)",
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
      title: "Detailed Description (for detail page)",
      type: "array",
      of: [{ type: "block" }],
    },

    // --- Cuisine & Menu ---
    {
      name: 'cuisineType',
      title: 'Cuisine Type',
      type: 'string',
      options: {
        list: [
          { title: 'Maharashtrian Thali', value: 'maharashtrian-thali' },
          { title: 'Pure Veg Dining', value: 'pure-veg' },
          { title: 'South Indian', value: 'south-indian' },
          { title: 'Fast Food / Quick Bites', value: 'quick-bites' },
          { title: 'Prasad Bhojanalay', value: 'prasad-bhojanalay' },
        ],
      },
       validation: (Rule) => Rule.required(),
    },
    {
        name: 'specialtyDish',
        title: 'Specialty Dish',
        type: 'string',
        description: 'e.g., Pithla Bhakri, Sabudana Khichdi, Masala Dosa'
    },
    {
        name: 'mealTypes',
        title: 'Serves (Meal Types)',
        type: 'array',
        of: [{type: 'string'}],
        options: {
            list: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
            layout: 'tags'
        }
    },
     {
      name: "priceIndicator",
      title: "Price Indicator",
      type: "string",
      options: {
        list: [
            {title: '₹ (Budget-friendly)', value: 'budget'},
            {title: '₹₹ (Mid-range)', value: 'mid-range'},
            {title: '₹₹₹ (Premium)', value: 'premium'},
        ]
      }
    },

    // --- Location & Contact ---
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phoneNumber",
      title: "Contact Phone Number",
      type: "string",
    },
    {
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
    },

    // --- Media ---
    {
      name: "gallery",
      title: "Photo Gallery (food, interior, etc.)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
  icon: () => '🍽️',
};

export default restaurant;
