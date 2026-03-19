import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "pub-57c81f86eb0847ebabd9ef5de48cc6a2.r2.dev", // existing
      "8341d4b31e574cb9873ce1bb80671685.r2.cloudflarestorage.com", // add this
    ],
  },
};

export default nextConfig;