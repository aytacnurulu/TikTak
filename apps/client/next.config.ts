import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://api.sarkhanrahimli.dev',
      },
    ]}
};

export default nextConfig;
