/**
 * Sanity Schema for Individual Attractions
 *
 * This schema defines the data structure for each tourist attraction.
 * It includes fields for title, slug, images, location, and a detailed description.
 */
import { MdPlace } from "react-icons/md";

export default {
  name: "attraction",
  title: "Attraction",
  type: "document",
  icon: MdPlace,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: 'The name of the attraction (e.g., "Naldurg Fort").',
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      description:
        'The unique URL path for this attraction. Click "Generate" to create it from the title.',
      validation: (rule) => rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      description:
        'The category this attraction belongs to (e.g., "Historical Sites & Forts").',
      validation: (rule) => rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Allows for better image cropping
      },
      description: "The primary image used in listings and as the header.",
      validation: (rule) => rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
          validation: (rule) => rule.required(),
        },
      ],
    },
    {
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (rule) => rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      description: "Upload additional images for a gallery display.",
    },
    {
      name: "location",
      title: "Location Details",
      type: "object",
      fields: [
        {
          name: "address",
          title: "Address or General Location",
          type: "string",
          description:
            'A short address or general area (e.g., "Near Solapur City").',
        },
        {
          name: "googleMapsUrl",
          title: "Google Maps Embed URL",
          type: "url",
          description:
            "Paste the SRC URL from the Google Maps embed code here.",
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
      description:
        "A detailed description of the attraction. You can add paragraphs, bullet points, and bold/italic text.",
      validation: (rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, category, media } = selection;
      return {
        title: title,
        subtitle: category ? `Category: ${category}` : "No category set",
        media: media,
      };
    },
  },
};
