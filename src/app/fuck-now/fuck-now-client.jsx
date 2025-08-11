
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share, User, Music, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BottomNavBar from '@/components/bottom-nav-bar';

const Reel = ({ video, isVisible }) => {
    const videoRef = useRef(null);
    const { toast } = useToast();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/watch/${video.slug}`;
        if (navigator.share) {
          navigator.share({
            title: video.title,
            text: `Check out this reel on xxxc.online!`,
            url: shareUrl,
          }).catch(error => console.error('Error sharing:', error));
        } else {
          navigator.clipboard.writeText(shareUrl);
          toast({
            title: 'Link Copied!',
            description: 'The link to the reel has been copied to your clipboard.',
          });
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };
    
    const playVideo = useCallback(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const videoDuration = videoElement.duration;
        if (videoDuration > 15) {
            // Calculate the start time for the middle 15-second clip
            const middlePoint = videoDuration / 2;
            let startTime = middlePoint - 7.5; // 15 seconds / 2
            // Ensure startTime is not negative
            startTime = Math.max(0, startTime);
            videoElement.currentTime = startTime;
        } else {
            // If the video is 15 seconds or shorter, start from the beginning
            videoElement.currentTime = 0;
        }
        
        videoElement.play().catch(e => {
            console.error("Autoplay failed", e);
            setIsLoading(false); // If play fails, hide loader
        });
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (isVisible && videoElement) {
           playVideo();
        } else if (!isVisible && videoElement) {
            videoElement.pause();
        }
    }, [isVisible, playVideo]);

    // Loop the 15-second segment
    useEffect(() => {
        const videoElement = videoRef.current;
        if(!videoElement) return;

        let startTime = -1;
        
        const handlePlay = () => {
           setIsPlaying(true);
           if(startTime < 0) {
               startTime = videoElement.currentTime;
           }
        }
        const handlePause = () => setIsPlaying(false);

        const handleTimeUpdate = () => {
            if (startTime >= 0 && videoElement.currentTime >= startTime + 15) {
                videoElement.currentTime = startTime;
                videoElement.play();
            }
        };

        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('play', handlePlay);
                videoElement.removeEventListener('pause', handlePause);
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        }
    }, [isPlaying]);

    return (
        <div className="h-full w-full relative snap-start" onClick={togglePlay}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
                </div>
            )}
            <video
                ref={videoRef}
                src={video.videoUrl}
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className={cn("w-full h-full object-cover", isLoading && 'opacity-0')}
                onCanPlay={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-28 left-0 p-4 text-white w-full flex justify-between items-end pointer-events-none">
                <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                        <Link href="#" className="pointer-events-auto">
                            <Avatar className="w-10 h-10 border-2 border-white">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${video.creator}`} />
                                <AvatarFallback>{video.creator.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <Link href="#" className="font-bold hover:underline pointer-events-auto">{video.creator}</Link>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{video.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Music className="w-4 h-4" />
                        <p className="text-sm">Original Audio - {video.creator}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                     <Button 
                        variant="ghost" 
                        className="flex flex-col items-center h-auto p-0 text-white pointer-events-auto hover:bg-transparent hover:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsLiked(!isLiked);
                        }}
                     >
                        <Heart className={cn("w-8 h-8", isLiked && "fill-red-500 text-red-500")} />
                        <span className="text-xs font-bold">1.2M</span>
                    </Button>
                     <Button variant="ghost" className="flex flex-col items-center h-auto p-0 text-white pointer-events-auto hover:bg-transparent hover:text-white" onClick={(e) => {e.stopPropagation(); handleShare();}}>
                        <Share className="w-8 h-8" />
                        <span className="text-xs font-bold">Share</span>
                    </Button>
                </div>
            </div>
             <button onClick={(e) => {e.stopPropagation(); setIsMuted(!isMuted)}} className="absolute top-4 right-4 text-white bg-black/30 p-2 rounded-full pointer-events-auto">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
             </button>
        </div>
    );
};

const ReelWrapper = ({ video }) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    return (
        <div ref={ref} className="h-full w-full">
           <Reel video={video} isVisible={inView} />
        </div>
    );
}

export default function FuckNowClient({ videos }) {
    const [visibleVideos, setVisibleVideos] = useState(videos.slice(0, 3));
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef(null);

    const loadMoreVideos = useCallback(() => {
        if(isLoadingMore) return;
        setIsLoadingMore(true);

        setTimeout(() => {
            const currentLength = visibleVideos.length;
            if (currentLength < videos.length) {
                const newVideos = videos.slice(currentLength, currentLength + 2);
                setVisibleVideos(prev => [...prev, ...newVideos]);
            }
            setIsLoadingMore(false);
        }, 500); // Simulate network latency
    }, [visibleVideos.length, videos, isLoadingMore]);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore) {
                    loadMoreVideos();
                }
            },
            { threshold: 1.0, rootMargin: '200px' }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loadMoreVideos, isLoadingMore]);

    return (
        <>
            <div className="flex-grow bg-black snap-y snap-mandatory overflow-y-scroll no-scrollbar">
                {visibleVideos.map((video, index) => (
                    <div key={`${video.id}-${index}`} className="h-full w-full snap-start">
                        <ReelWrapper video={video} />
                    </div>
                ))}
                <div ref={observerRef} className="h-20 flex items-center justify-center">
                    {visibleVideos.length < videos.length && <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />}
                </div>
            </div>
            <BottomNavBar />
        </>
    );
}
