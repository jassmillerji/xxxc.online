
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Eye, CheckCircle } from 'lucide-react';

const CamModelCard = ({ model }) => {
  return (
    <div className="group">
      <Link href="#" className="block relative aspect-[3/4] w-full overflow-hidden rounded-lg">
        <Image
          src={model.image}
          alt={model.name}
          width={300}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={model.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
        <div className="absolute top-2 left-2">
            <Badge className="bg-red-600 text-white border-none text-xs px-1.5 py-0.5 font-bold">LIVE</Badge>
        </div>
        <div className="absolute bottom-2 left-2 text-white text-xs font-bold px-2 py-1 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>{model.viewers.toLocaleString()}</span>
        </div>
      </Link>
      <div className="mt-2">
        <div className="flex items-center gap-1.5">
          <Link href="#" className="text-sm font-bold text-white hover:text-accent truncate">
            {model.name}
          </Link>
          {model.verified && (
            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-stone-400 truncate">{model.title}</p>
      </div>
    </div>
  );
};

export default CamModelCard;
