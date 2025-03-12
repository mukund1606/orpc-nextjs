import type { NextConfig } from "next";

import "~/env";

const nextConfig: NextConfig = {
  experimental: {
    // nodeMiddleware: true,
    reactCompiler: true,
  },
};

export default nextConfig;
