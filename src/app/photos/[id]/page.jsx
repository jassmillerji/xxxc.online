
import { getPhotoOrGifById, getPhotosAndGifs } from '@/lib/data';
import { notFound } from 'next/navigation';
import PhotoPageClient from './photo-page-client';
import SimilarContent from './similar-content';

export async function generateMetadata({ params }) {
  const item = await getPhotoOrGifById(params.id);
  if (!item) {
    return {
      title: 'Content Not Found',
    };
  }

  const siteUrl = 'https://xxxc.online';
  const canonicalUrl = `${siteUrl}/photos/${item.id}`;

  return {
    title: `${item.title} on xxxc.online`,
    description: `View the ${item.type} titled "${item.title}" and more on xxxc.online.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${item.title} on xxxc.online`,
      description: `View the ${item.type} titled "${item.title}".`,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: item.thumbnailUrl,
          width: 200,
          height: 112,
          alt: item.title,
        },
      ],
    },
  };
}

export default async function PhotoPage({ params }) {
  const { id } = params;
  const item = await getPhotoOrGifById(id);

  if (!item) {
    notFound();
  }
  
  const allContent = await getPhotosAndGifs();

  // Filter for similar content (same type, different id)
  const similarItems = allContent.filter(
    (content) => content.type === item.type && content.id !== item.id
  ).slice(0, 12); // Get up to 12 similar items

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
            <PhotoPageClient item={item} />
        </div>
        <div className="mt-12">
            <SimilarContent items={similarItems} title={`Similar ${item.type === 'album' ? 'Albums' : 'GIFs'}`} />
        </div>
    </div>
  );
}
