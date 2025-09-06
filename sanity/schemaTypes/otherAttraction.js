const otherAttraction = {
  name: "otherAttraction",
  title: "Other Attraction",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Attraction Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Featured Attraction',
      type: 'boolean',
      description: 'Set this to ON to feature this on the main page or at the top of lists.',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'otherAttractionCategory' }],
      description: 'The category this attraction belongs to.',
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
      title: "Detailed Description (for detail page view)",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "phoneNumber",
      title: "Contact Phone Number",
      type: "string",
    },
    {
      name: "website",
      title: "Official Website",
      type: "url",
    },
    {
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "Get the embed URL from Google Maps (Share > Embed a map).",
    },
    {
      name: "timings",
      title: "Timings",
      type: "string",
      description: "e.g., '10:00 AM - 6:00 PM (Closed on Mondays)'"
    },
    {
      name: 'entryFee',
      title: 'Entry Fee',
      type: 'string',
      description: "e.g., 'Free', '₹20 per person', 'Donation-based'"
    },
    {
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
  icon: () => '📍',
};

export default otherAttraction;