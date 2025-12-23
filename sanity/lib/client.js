import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable the CDN so we always read the freshest published content.
  // This avoids eventual-consistency delays that were causing null/404 responses.
  useCdn: false,
})
