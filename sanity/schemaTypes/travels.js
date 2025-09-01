// This is the schema for Travel information.
const travel = {
  name: "travel",
  title: "Travel",
  type: "document",
  fields: [
    // --- Basic Information ---
    {
      name: "name",
      title: "Service / Location Name",
      description: "e.g., Pandharpur MSRTC Bus Stand, Local Rickshaw Services",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Featured Travel Hub',
      type: 'boolean',
      description: 'Feature this to make it stand out (e.g., the main bus stand).',
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
      title: "Main Image",
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
      title: "Detailed Description & Tips",
      type: "array",
      of: [{ type: "block" }],
       description: "Explain the service, how to use it, typical fares, and tips for travelers."
    },

    // --- Service Details ---
    {
      name: 'travelType',
      title: 'Type of Travel',
      type: 'string',
      options: {
        list: [
          { title: 'Bus Station', value: 'bus' },
          { title: 'Train Station', value: 'train' },
          { title: 'Taxi Service', value: 'taxi' },
          { title: 'Auto Rickshaw', value: 'auto-rickshaw' },
        ],
      },
       validation: (Rule) => Rule.required(),
    },
    {
        name: 'operatingHours',
        title: 'Operating Hours',
        type: 'string',
        description: 'e.g., 24 Hours, 6:00 AM - 11:00 PM'
    },
     {
        name: 'keyRoutes',
        title: 'Key Routes / Destinations',
        type: 'array',
        of: [{type: 'string'}],
        options: { layout: 'tags' },
        description: 'e.g., Pandharpur to Pune, Local Temple Circuit'
    },

    // --- Location & Contact ---
    {
      name: "address",
      title: "Address or Main Hub Location",
      type: "string",
    },
    {
      name: "phoneNumber",
      title: "Enquiry Phone Number",
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
  ],
  icon: () => '🚌',
};

export default travel;
