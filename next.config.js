/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["bcrypt"],
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  swcMinify: true,
  swcLoaderOptions: {
    exclude: /middleware\?.*/,
  }
};

module.exports = nextConfig;
