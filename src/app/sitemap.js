
import { getVideos, getCategories, getPornstars, getPhotosAndGifs } from '@/lib/data'
 
export default async function sitemap() {
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

  const pornstars = await getPornstars();
  const pornstarEntries = pornstars.map((pornstar) => ({
    url: `${siteUrl}/pornstars/${pornstar.name.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  
  const content = await getPhotosAndGifs();
  const contentEntries = content.map((item) => ({
    url: `${siteUrl}/photos/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
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
     {
      url: `${siteUrl}/pornstars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
     {
      url: `${siteUrl}/photos-and-gifs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...videoEntries,
    ...categoryEntries,
    ...pornstarEntries,
    ...contentEntries,
  ]
}
