/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // skip eslint
  },
  typescript: {
    ignoreBuildErrors: true, // skip type errors
  },
};

export default nextConfig;
