
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

const ContentCard = ({ item, type }) => {
  const href = `/photos/${item.id}`;

  return (
    <Link href={href} className="group flex flex-col h-full">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-stone-900 relative">
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={item.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        
        {type === 'album' && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-black/60 text-white text-xs">{item.photoCount} Photos</Badge>
        )}
        
        <div className="absolute bottom-0 left-0 p-2 sm:p-3 text-white w-full">
          <h3 className="font-bold text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-accent transition-colors">{item.title}</h3>
          {type === 'album' && item.rating && (
            <p className="text-xs font-semibold text-white/80 mt-1">{item.rating}% Rating</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
