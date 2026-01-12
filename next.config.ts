import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prwidnbibcbdwzqxynhw.supabase.co',
        pathname: '/**',
        port: '',
      },
    ],
  },
};

export default nextConfig;
