/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  redirects: async  () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  }
};
module.exports = nextConfig;
