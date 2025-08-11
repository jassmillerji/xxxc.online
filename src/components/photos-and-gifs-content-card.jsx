
import Link from 'next/link';
import Image from 'next/image';

const PhotosAndGifsContentCard = ({ item, type }) => {
  return (
    <Link href="#" className="group relative">
      <div className="aspect-video w-full overflow-hidden rounded bg-stone-900">
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          width={200}
          height={112}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={item.dataAiHint}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-2 left-2 text-white text-sm">
        <p className="font-bold">{item.title}</p>
        {type === 'album' && (
          <div className="flex items-center gap-2 text-xs">
            <span>{item.photoCount} Photos</span>
            {item.rating && <span className="font-bold">{item.rating}%</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PhotosAndGifsContentCard;
