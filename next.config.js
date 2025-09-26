/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    STORYBLOK_MANAGEMENT_TOKEN: process.env.STORYBLOK_MANAGEMENT_TOKEN,
    STORYBLOK_SPACE_ID: process.env.STORYBLOK_SPACE_ID,
  },
  images: {
    domains: ['a.storyblok.com'],
  },
};

module.exports = nextConfig;
