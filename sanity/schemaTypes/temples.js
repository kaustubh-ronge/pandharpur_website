// This is the schema for Temples.
const temple = {
  name: "temple",
  title: "Temples",
  type: "document",
  fields: [
    // --- Basic Information ---
    {
      name: "name",
      title: "Temple Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Featured Temple',
      type: 'boolean',
      description: 'Feature this temple on lists to make it stand out.',
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
      name: 'presidingDeity',
      title: 'Presiding Deity',
      type: 'string',
      description: 'e.g., Lord Vitthal and Rukmini, Pundalik, Vishnu',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Main Image of the Temple",
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
      name: "historyAndSignificance",
      title: "History and Significance",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed information about the temple's history, architecture, and spiritual importance."
    },

    // --- Timings & Rituals ---
    {
        name: 'darshanTimings',
        title: 'Darshan Timings',
        type: 'array',
        of: [{type: 'block'}],
        description: "Provide detailed timings. Use bullet points for clarity (e.g., Morning: 6 AM - 1 PM, Evening: 4 PM - 9 PM)."
    },
    {
        name: 'majorFestivals',
        title: 'Major Festivals Celebrated',
        type: 'array',
        of: [{type: 'string'}],
        options: { layout: 'tags' },
        description: 'e.g., Ashadhi Ekadashi, Kartiki Ekadashi, Diwali'
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
      title: "Temple Office Phone Number",
      type: "string",
    },
    {
      name: "website",
      title: "Official Website (if any)",
      type: "url",
    },
    {
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
    },

    // --- Media ---
    {
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
  icon: () => '🕉️', // Using an Om symbol for the icon
};

export default temple;
