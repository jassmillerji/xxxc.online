
import Image from 'next/image';
import Link from 'next/link';

const ProfileCircleCard = ({ profile, href }) => {
  const profileLink = href || `/pornstars/${profile.name.toLowerCase().replace(/ /g, '-')}`;
  return (
    <div className="group flex-shrink-0 text-center w-28 md:w-32">
      <Link href={profileLink} className="block relative w-full aspect-square overflow-hidden rounded-full border-2 border-transparent group-hover:border-accent transition-colors">
        <Image
          src={profile.imageUrl}
          alt={profile.name}
          width={128}
          height={128}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={profile.dataAiHint}
        />
      </Link>
      <div className="mt-3">
        <Link href={profileLink} className="text-sm font-bold text-white hover:text-accent truncate">
          {profile.name}
        </Link>
      </div>
    </div>
  );
};

export default ProfileCircleCard;
