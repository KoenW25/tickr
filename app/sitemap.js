/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tckr.nl';
  const routes = ['/', '/markt', '/hoe-het-werkt', '/login', '/voorwaarden', '/privacy'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
