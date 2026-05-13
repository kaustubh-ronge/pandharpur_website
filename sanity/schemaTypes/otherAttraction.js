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
    // SEO fields — must match Studio schema and getAttractionBySlugQuery GROQ query
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Optional. Custom title for search engines. Overrides the default attraction name.',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Optional. Custom meta description (150-160 chars). Overrides the default description.',
      group: 'seo',
    },
    {
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'string',
      description: 'Optional. Comma-separated keywords for search engines.',
      group: 'seo',
    },
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO & Metadata',
    },
  ],
  icon: () => '📍',
};

export default otherAttraction;