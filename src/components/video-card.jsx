
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MoreVertical } from "lucide-react";

const VideoCard = ({ video, layout = "vertical" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = (e) => {
    if (e.currentTarget.duration) {
      const percentage = (e.currentTarget.currentTime / e.currentTarget.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      setTimeout(() => {
        videoRef.current?.play().catch(error => {
          console.error("Video autoplay was prevented:", error);
        });
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const formatViews = (viewCount) => {
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M`;
    }
    if (viewCount >= 1000) {
        return `${(viewCount/1000).toFixed(0)}K`;
    }
    return viewCount;
  };
  
  if (layout === 'horizontal') {
    return (
      <div className="group flex gap-4">
        <Link href={`/watch/${video.slug}`} className="block relative w-40 md:w-48 aspect-video overflow-hidden rounded-lg bg-card flex-shrink-0">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={320}
            height={180}
            className="h-full w-full object-cover"
            data-ai-hint={video.dataAiHint}
          />
          <Badge
            variant="secondary"
            className="absolute bottom-1 right-1 bg-black/75 text-white border-none text-xs"
          >
            {video.duration}
          </Badge>
        </Link>
        <div className="flex-grow">
           <Link href={`/watch/${video.slug}`}>
            <h3 className="font-medium text-sm leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {video.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="hover:text-foreground">{video.creator}</span>
              <CheckCircle className="w-3 h-3 text-primary" />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{formatViews(video.views)} views</span>
          </div>
        </div>
      </div>
    );
  }

  const videoUrl = video.videoSources?.[0]?.url;

  return (
    <div
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/watch/${video.slug}`} className="block relative aspect-video w-full overflow-hidden rounded-lg bg-card">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          width={600}
          height={400}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          data-ai-hint={video.dataAiHint}
        />
        {videoUrl && (
            <video
              ref={videoRef}
              src={videoUrl}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              muted
              loop
              playsInline
              preload="none"
              onTimeUpdate={handleTimeUpdate}
            />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 group-hover:bg-black/50 transition-colors">
            <div 
              className="h-full bg-primary transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
        </div>
        <Badge
          variant="secondary"
          className="absolute bottom-2 right-2 bg-black/75 text-white border-none text-xs px-1.5 py-0.5"
        >
          {video.duration}
        </Badge>
      </Link>
      <div className="flex gap-3 pt-3">
        <div className="flex-grow">
          <Link href={`/watch/${video.slug}`}>
            <h3 className="font-bold text-sm md:text-base leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {video.title}
            </h3>
          </Link>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1.5">
              <span>{video.creator}</span>
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <span>{formatViews(video.views)} views</span>
          </div>
        </div>
        <button className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
            <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
