/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <-- disables ESLint checks during `next build`
  },
};

module.exports = nextConfig;
