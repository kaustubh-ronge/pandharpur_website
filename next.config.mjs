/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './sanity-image-loader.js',

    // remotePatterns still needed for security validation of <Image> src props
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Fallback placeholder images used in card components when no CMS image exists
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // WhatsApp SVG icon used on hotel/booking detail pages
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;
