/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['image.tmdb.org', 'i.scdn.co'],
    },
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'es', 'fr', 'de'],
    },
};

export default nextConfig;
