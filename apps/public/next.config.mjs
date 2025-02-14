/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "geist", "@ayasofyazilim/upwithcrowd-saas", "@ayasofyazilim/core-saas"],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
