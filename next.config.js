/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  typescript: {
    // Show TypeScript errors during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Show ESLint errors during build
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig; 