/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // skip eslint
  },
  typescript: {
    ignoreBuildErrors: true, // skip type errors
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://finance-dashboard-3qko.vercel.app/api/:path*", // backend
      },
    ];
  },
};

export default nextConfig;
