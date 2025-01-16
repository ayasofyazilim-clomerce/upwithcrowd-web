/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ayasofyazilim/upwithcrowd-saas', "@ayasofyazilim/core-saas"],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{
      protocol: "https",
      port: '',
      hostname: "placehold.co"
    }],
  }
};

export default nextConfig;
