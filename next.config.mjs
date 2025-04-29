/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // Add this setting to tell Next.js where to look for the app directory
  pageExtensions: ["jsx", "js"], // Ensure Next.js recognizes .jsx files
};

export default nextConfig;
