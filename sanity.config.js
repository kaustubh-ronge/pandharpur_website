/**
 * Sanity Studio configuration for the embedded /studio route.
 * This is a server-side configuration — do NOT add 'use client' here.
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { deskTool } from 'sanity/desk'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({ structure }), // ✅ Use custom structure here
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
