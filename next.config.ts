import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
    ],
    unoptimized: true,
  },
  output: "standalone",
};

export default nextConfig;
