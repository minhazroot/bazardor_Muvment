import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Do not export a static SPA: App Router keeps deep links working on refresh.
  serverExternalPackages: ["better-sqlite3", "pg"],
};
export default nextConfig;
