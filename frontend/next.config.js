/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/tools/image-to-url',
        destination: 'https://gunatools.dev/tools/image-to-url',
        permanent: true,
      },
    ]
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.htmlgames.com' },
      { protocol: 'https', hostname: 'www.htmlgames.com' },
    ],
  },
};

module.exports = nextConfig;
