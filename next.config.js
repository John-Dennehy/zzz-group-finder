/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "www.netmums.com" },
      { hostname: "i.pinimg.com" },
    ],
  },
};

module.exports = nextConfig;
