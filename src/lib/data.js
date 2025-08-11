

import photosAndGifsData from '@/data/photosAndGifs.json';
import pornstarData from '@/data/pornstars.json';
import popularTagsData from '@/data/popular-tags.json';
import liveCamsData from '@/data/live-cams.json';

export async function getVideos() {
  try {
    const response = await fetch('https://api.panelauthy.xyz/api/v1/admin/excel/data/688de6d71ad74ed8b9b3de00', { next: { revalidate: 1800 } });
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const apiData = await response.json();

    if (!apiData?.data?.rows) {
      console.error("Video data is missing or in an unexpected format:", apiData);
      return [];
    }

    const videos = apiData.data.rows.map(video => {
      const viewsString = String(video.views || '0').replace(/,/g, '');
      const views = parseInt(viewsString, 10);

      return {
        id: video.id,
        meta_title: video.meta_title,
        meta_description: video.meta_description,
        title: video.title || 'Untitled Video',
        slug: video.slug,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        dataAiHint: video.dataAiHint,
        videoSources: [
          { quality: '1080p', url: video.videoSources },
          { quality: '720p', url: video.videoSources },
          { quality: '360p', url: video.videoSources },
        ],
        duration: video.duration || '00:00',
        rating: parseFloat(video.rating) || 0,
        views: !isNaN(views) ? views : 0,
        creator: video.creator || 'Unknown Creator',
        creatorAvatarUrl: `https://i.pravatar.cc/150?u=${video.creator || 'default'}`,
        tags: video.tags ? String(video.tags).split(' | ') : [],
        isFeatured: video.isFeatured === 'true',
        isTrending: video.isTrending === 'true',
        videoUrl: video.videoSources
      }
    });

    return videos;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return []; // Return an empty array on error to prevent crashes
  }
}

export async function getCategories() {
  try {
    const response = await fetch('https://api.panelauthy.xyz/api/v1/admin/excel/data/68945e551ad74ed8b9b4d1f5', { next: { revalidate: 1800 } });
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const apiData = await response.json();

    if (!apiData?.data?.rows) {
      console.error("Category data is missing or in an unexpected format:", apiData);
      return [];
    }

    return apiData.data.rows.map(category => {
      let meta_title = category.Meta__UNDERSCORE__Title;
      let meta_keywords = category.Meta__UNDERSCORE__Keywords;

      if (!meta_keywords) {
        const parts = category.Meta__UNDERSCORE__Title.split("META_KEYWORDS :");
        if (parts.length > 1) {
          meta_title = parts[0].trim();
          meta_keywords = parts[1].trim();
        }
      }

      return {
        id: category.id,
        name: category.Name,
        slug: category.slug,
        description: category.LongDescription,
        thumbnailUrl: category.thumbnailUrl,
        dataAiHint: category.dataAiHint,
        meta_title: meta_title,
        meta_description: category.Meta__UNDERSCORE__Description,
        meta_keywords: meta_keywords,
      };
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}


export async function getVideoBySlug(slug) {
  const videos = await getVideos();
  return videos.find((video) => video.slug === slug);
}

export async function getPhotosAndGifs() {
  // Simulating an API call
  return Promise.resolve(photosAndGifsData);
}

export async function getPhotoOrGifById(id) {
  const data = await getPhotosAndGifs();
  return data.find((item) => item.id === id);
}

export async function getPornstars() {
  // Simulating an API call
  // Combine trending and popular pornstars into one list
  const allPornstars = [...pornstarData.trendingPornstars, ...pornstarData.popularPornstars];
  // Remove duplicates
  const uniquePornstars = allPornstars.filter((pornstar, index, self) =>
    index === self.findIndex((p) => (
      p.id === pornstar.id
    ))
  );
  return Promise.resolve(uniquePornstars);
}

export async function getPornstarByName(name) {
  const pornstars = await getPornstars();
  const formattedName = name.toLowerCase().replace(/-/g, ' ');
  return pornstars.find(p => p.name.toLowerCase() === formattedName);
}

export async function getPopularTags() {
  // Simulating an API call
  return Promise.resolve(popularTagsData);
}

export async function getLiveCamsData() {
  // Simulating an API call
  return Promise.resolve(liveCamsData);
}
