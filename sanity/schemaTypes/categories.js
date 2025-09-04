/**
 * Sanity Schema for Attraction Categories
 *
 * Defines the structure for categories used to group attractions,
 * such as "Natural & Scenic Spots" or "Historical Sites & Forts".
 */
import {MdFolder} from 'react-icons/md'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: MdFolder,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the category (e.g., "Natural & Scenic Spots").',
      validation: rule => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description of what this category is about.',
    },
  ],
}