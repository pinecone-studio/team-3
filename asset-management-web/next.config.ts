import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "pub-57c81f86eb0847ebabd9ef5de48cc6a2.r2.dev",
    ],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
