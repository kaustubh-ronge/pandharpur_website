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
  // Only apply Sanity transforms to Sanity CDN URLs
  if (src && src.includes('cdn.sanity.io')) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality || 75));
    url.searchParams.set('fit', 'max');
    url.searchParams.set('auto', 'format');
    return url.toString();
  }

  // For all other image sources (placehold.co, wikimedia, etc.), return as-is
  return src;
}
