
import { getVideos, getCategories } from '@/lib/data'
 
export default async function sitemap() {
  // In a real scenario, you might get the site URL from an environment variable
  const siteUrl = 'https://xxxc.online';

  const videos = await getVideos();
  const videoEntries = videos.map((video) => ({
    url: `${siteUrl}/watch/${video.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categories = await getCategories();
  const categoryEntries = categories.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
 
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...videoEntries,
    ...categoryEntries,
  ]
}
