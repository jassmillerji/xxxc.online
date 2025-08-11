
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Flame } from 'lucide-react';

const formatViews = (views) => {
  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B`;
  }
  if (views >= 1_000_000) {
    return `${Math.round(views / 1_000_000)}M`;
  }
  if (views >= 1_000) {
    return `${Math.round(views / 1_000)}K`;
  }
  return views;
};

const PornstarCard = ({ pornstar }) => {
  const pornstarLink = `/pornstars/${pornstar.name.toLowerCase().replace(/ /g, '-')}`;
  return (
    <div className="group">
      <Link href={pornstarLink} className="block relative aspect-[3/4] w-full overflow-hidden rounded-lg">
        <Image
          src={pornstar.imageUrl}
          alt={pornstar.name}
          width={300}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={pornstar.dataAiHint}
        />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
          {pornstar.rank}
        </div>
      </Link>
      <div className="mt-2">
        <div className="flex items-center gap-1.5">
          <Link href={pornstarLink} className="text-sm font-bold text-white hover:text-accent truncate">
            {pornstar.name}
          </Link>
          {pornstar.isVerified && (
            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
          )}
          {pornstar.isPremium && (
            <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
          )}
        </div>
        <div className="text-xs text-stone-400 flex items-center gap-2">
          <span>{pornstar.videos} Videos</span>
          <span>{formatViews(pornstar.views)} Views</span>
        </div>
      </div>
    </div>
  );
};

export default PornstarCard;
