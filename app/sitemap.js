import supabase from '@/lib/supabase';
import { eventToSlug } from '@/lib/eventSlug';

/** @returns {Promise<import('next').MetadataRoute.Sitemap>} */
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tckr.nl';
  const routes = ['/', '/markt', '/hoe-het-werkt', '/voorwaarden', '/privacy'];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const { data: events } = await supabase
    .from('events')
    .select('id, name, date')
    .order('date', { ascending: true });

  const seen = new Set();
  const dynamicRoutes = (events ?? [])
    .map((event) => {
      const slug = eventToSlug(event);
      if (!slug || seen.has(slug)) return null;
      seen.add(slug);
      const lastModified = event?.date ? new Date(event.date) : new Date();
      return {
        url: `${baseUrl}/markt/${slug}`,
        lastModified: Number.isNaN(lastModified.getTime()) ? new Date() : lastModified,
      };
    })
    .filter(Boolean);

  return [...staticRoutes, ...dynamicRoutes];
}
