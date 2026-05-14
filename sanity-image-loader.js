/**
 * Custom Next.js Image Loader for Sanity CDN images.
 *
 * WHY THIS EXISTS:
 * Next.js image optimization proxies images through /_next/image by making a
 * server-side HTTP request to the upstream URL. In some dev and production network
 * environments, cdn.sanity.io resolves to an IPv4-mapped IPv6 address
 * (e.g. 64:ff9b::...) which Next.js classifies as a private/internal IP and blocks
 * with an SSRF protection error: "upstream image resolved to private ip".
 *
 * HOW IT WORKS:
 * For Sanity CDN URLs, this loader appends Sanity's native image transformation
 * parameters (w, q, auto, fit) directly to the CDN URL. The browser then fetches
 * the optimized image DIRECTLY from cdn.sanity.io — bypassing Next.js's proxy
 * entirely and eliminating the private IP resolution error.
 *
 * For non-Sanity URLs (placehold.co, etc.), the original src is returned unchanged.
 *
 * PRODUCTION BEHAVIOR:
 * Sanity CDN already serves WebP, resized, and quality-optimized images natively.
 * Using their own transform API is equivalent quality to Next.js optimization.
 */
export default function sanityImageLoader({ src, width, quality }) {
  if (!src) return '';

  // 1. Handle Sanity CDN Images (Primary Use Case)
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality || 75));
    url.searchParams.set('fit', 'max');
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // 2. Handle Local Static Images (/_next/static/media or /public)
  // For local images, we just return the path. 
  // We check for startsWith('/') to identify local assets.
  if (src.startsWith('/') && !src.startsWith('//')) {
    return src;
  }

  // 3. Handle Other External URLs (placehold.co, wikimedia, etc.)
  // Just return the original src as we don't want to optimize external non-CDN images here.
  return src;
}
