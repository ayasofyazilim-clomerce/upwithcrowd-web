/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "geist", "@ayasofyazilim/upwithcrowd-saas", "@ayasofyazilim/core-saas"],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "originui.com"
      }
    ],
  },
};

export default nextConfig;
