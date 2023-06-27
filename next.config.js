/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });
    config.resolve.fallback = { fs: false };

    return config;
  },

  env: {
    CONTENTFUL_LINKEDIN_CLIENT_ID: process.env.CONTENTFUL_LINKEDIN_CLIENT_ID,
    CONTENTFUL_LINKEDIN_CLIENT_SECRET:
      process.env.CONTENTFUL_LINKEDIN_CLIENT_SECRET,
    CONTENTFUL_LINKEDIN_AUTHORIZATION_URL:
      process.env.CONTENTFUL_LINKEDIN_AUTHORIZATION_URL,
    CONTENTFUL_LINKEDIN_REDIRECT_URI:
      process.env.CONTENTFUL_LINKEDIN_REDIRECT_URI,
    CONTENTFUL_LINKEDIN_ACCESS_TOKEN_URL:
      process.env.CONTENTFUL_LINKEDIN_ACCESS_TOKEN_URL,
    CONTENTFUL_ACCESS_TOKEN_FILEPATH:
      process.env.CONTENTFUL_ACCESS_TOKEN_FILEPATH,
  },
};

module.exports = nextConfig;
