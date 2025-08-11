import Link from 'next/link';
import ProfileCircleCard from './profile-circle-card';

const TrendingPornstars = ({ pornstars }) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6 px-4 sm:px-0">
        <h1 className="text-xl md:text-2xl font-bold">Top Trending Pornstars</h1>
        <Link href="#" className="text-sm font-semibold hover:text-accent">
          See All
        </Link>
      </div>
      
      <div className="relative w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 no-scrollbar snap-x snap-mandatory">
          {pornstars.map((pornstar) => (
            <div
              key={pornstar.id}
              className="snap-start shrink-0 w-28 sm:w-32 md:w-36 lg:w-40"
            >
              <ProfileCircleCard profile={pornstar} href="#" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPornstars;
