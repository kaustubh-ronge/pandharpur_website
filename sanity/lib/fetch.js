import { client } from './client'

/**
 * Standardized fetch utility for Sanity content in Next.js.
 * Supports Next.js App Router caching and tag-based revalidation.
 * 
 * @param {Object} options
 * @param {string} options.query - GROQ query string
 * @param {Object} [options.params] - Query parameters
 * @param {string[]} [options.tags] - Cache tags for revalidation
 */
export async function sanityFetch({ query, params = {}, tags = [] }) {
  return client.fetch(query, params, {
    next: {
      tags,
    },
  })
}
