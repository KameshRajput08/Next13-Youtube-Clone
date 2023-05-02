/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", 'firebasestorage.googleapis.com', 'images.unsplash.com'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  }
};

module.exports = nextConfig;
