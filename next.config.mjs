/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "www.google.com"
      },
      {
        protocol: "https",
        hostname: "d3rkivwx3269q7.cloudfront.net"
      }
    ]
  }
};

export default nextConfig;
