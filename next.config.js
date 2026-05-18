/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // PWA configuration will be added later
  /**
   * On macOS, Watchpack EMFILE (“too many open files”) breaks hot reload/preview stability.
   * Run: `NEXT_WATCH_POLL=1 npm run dev` or use `npm run dev:poll` to enable polling watchers.
   */
  webpack: (config, { dev }) => {
    if (dev && process.env.NEXT_WATCH_POLL === "1") {
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
};

module.exports = nextConfig;

