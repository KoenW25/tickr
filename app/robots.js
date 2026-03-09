/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tckr.nl';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
