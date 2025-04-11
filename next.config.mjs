/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["d3rkivwx3269q7.cloudfront.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "www.google.com"
      }
    ]
  }
};

export default nextConfig;
