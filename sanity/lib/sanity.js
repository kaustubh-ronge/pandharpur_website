// sanity/lib/sanity.js
// urlFor helper for image URL building.
// Uses the single authoritative client (useCdn: false) from client.js
// to avoid the dual-client stale-content inconsistency.
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
