/**
 * Sanity Schema for Individual Attractions
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
      validation: (rule) => rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      validation: (rule) => rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
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
        },
        {
          name: "googleMapsUrl",
          title: "Google Maps Embed URL",
          type: "url",
        },
      ],
    },
    {
      name: "distance",
      title: "Distance from Main Temple",
      type: "string",
    },
    // ⬇️ THE MISSING FIELDS THAT MUST BE ADDED ⬇️
    {
      name: "bestTimeToVisit",
      title: "Best Time to Visit",
      type: "string",
      description: 'e.g., "October to February"',
    },
    {
      name: "visitDuration",
      title: "Recommended Visit Duration",
      type: "string",
      description: 'e.g., "1-2 hours"',
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
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
