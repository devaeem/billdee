import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Enable if you're using experimental features
  // experimental: {
  //   outputFileTracingRoot: undefined, // defaults to process.cwd()
  // },
};

export default nextConfig;
