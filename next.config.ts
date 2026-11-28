import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/AtlierFashion2" : "");

const nextConfig: NextConfig = {
  // Static hosting keeps local text search; server mode enables the vision API.
  output: process.env.NEXT_OUTPUT_MODE === "server" ? undefined : "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
