
'use client';

import { useState } from 'react';
import { Film } from 'lucide-react';
import VideoCard from '@/components/video-card';
import { Button } from '@/components/ui/button';

const SIMILAR_VIDEOS_PER_PAGE = 12;

const SimilarVideos = ({ videos }) => {
  const [visibleSimilarVideos, setVisibleSimilarVideos] = useState(SIMILAR_VIDEOS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleSimilarVideos(prev => prev + SIMILAR_VIDEOS_PER_PAGE);
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Film className="w-8 h-8 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold font-headline">Similar Videos</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {videos.slice(0, visibleSimilarVideos).map((similarVideo, index) => (
          <VideoCard key={`${similarVideo.id}-${index}`} video={similarVideo} />
        ))}
      </div>
      {visibleSimilarVideos < videos.length && (
        <div className="text-center mt-8">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </>
  );
};

export default SimilarVideos;
