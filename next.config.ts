import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  compiler: {
    styledComponents: true,
    // removeConsole: true,
  },
  cleanDistDir: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
