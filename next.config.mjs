/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static output — ideal for Vercel's free tier: no serverless
  // invocations, no ISR budget, just CDN-served HTML.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
