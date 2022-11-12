/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true }, // Use the `@/app` directory from Next.js 13.
}

module.exports = nextConfig
