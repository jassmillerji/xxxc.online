
'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Eye, Star, User, Tag, Play, Pause, Volume2, VolumeX, Maximize, Settings, FastForward, Download, Check, Loader2, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import fileDownload from 'js-file-download';
import { useToast } from '@/hooks/use-toast';

const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const WatchPageClient = ({ video }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { toast } = useToast();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [videoSources, setVideoSources] = useState(video.videoSources || []);
  const [selectedQuality, setSelectedQuality] = useState(videoSources[0]?.quality);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let controlsTimeout = useRef(null);

  const hideControls = () => {
    if (isPlaying) {
      setIsControlsVisible(false);
    }
  };

  const showControls = () => {
    setIsControlsVisible(true);
    if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(hideControls, 3000);
  }

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
        const handleTimeUpdate = () => {
            setCurrentTime(videoElement.currentTime);
            if (videoElement.duration) {
              setProgress((videoElement.currentTime / videoElement.duration) * 100);
            }
        };
        const handleDurationChange = () => {
          if(videoElement.duration && !isNaN(videoElement.duration)) {
             setDuration(videoElement.duration);
          }
        };
        const handleLoadedMetadata = () => {
          if(videoElement.duration && !isNaN(videoElement.duration)) {
             setDuration(videoElement.duration);
          }
        };
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleVolumeChange = () => {
            setIsMuted(videoElement.muted);
            setVolume(videoElement.volume);
        };

        const handleWaiting = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('durationchange', handleDurationChange);
        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);
        videoElement.addEventListener('volumechange', handleVolumeChange);
        videoElement.addEventListener('waiting', handleWaiting);
        videoElement.addEventListener('canplay', handleCanPlay);
        videoElement.addEventListener('playing', handleCanPlay);
        videoElement.addEventListener('loadstart', handleWaiting);


        if(videoElement.readyState > 0 && videoElement.duration && !isNaN(videoElement.duration)) {
            handleLoadedMetadata();
        }
        
        showControls(); // Show controls when video source changes

        return () => {
            if (videoElement) {
              videoElement.removeEventListener('timeupdate', handleTimeUpdate);
              videoElement.removeEventListener('durationchange', handleDurationChange);
              videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
              videoElement.removeEventListener('play', handlePlay);
              videoElement.removeEventListener('pause', handlePause);
              videoElement.removeEventListener('volumechange', handleVolumeChange);
              videoElement.removeEventListener('waiting', handleWaiting);
              videoElement.removeEventListener('canplay', handleCanPlay);
              videoElement.removeEventListener('playing', handleCanPlay);
              videoElement.removeEventListener('loadstart', handleWaiting);
            }
            if(controlsTimeout.current) {
                clearTimeout(controlsTimeout.current);
            }
        };
    }
  }, [selectedQuality, isPlaying]);
  
  const togglePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleSeek = (value) => {
    if (videoRef.current && duration > 0) {
        const newTime = (value / 100) * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress(value);
    }
  };

  const handleVolumeChange = (value) => {
    if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.volume = value / 100;
        setVolume(value / 100);
    }
  };

  const toggleMute = () => {
      if (videoRef.current) {
          const newMutedState = !isMuted;
          videoRef.current.muted = newMutedState;
          setIsMuted(newMutedState);
          if (newMutedState) {
              setVolume(0);
          } else {
              setVolume(videoRef.current.volume || 1);
          }
      }
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  const handlePlaybackRateChange = (rate) => {
    if(videoRef.current) {
        videoRef.current.playbackRate = rate;
        setPlaybackRate(rate);
    }
  };

  const handleQualityChange = (quality) => {
    if (videoRef.current) {
      const currentPlayTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;

      setSelectedQuality(quality);
      
      setTimeout(() => {
        if(videoRef.current) {
          videoRef.current.currentTime = currentPlayTime;
          if(wasPlaying) {
            videoRef.current.play();
          }
        }
      }, 100);
    }
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloaded(false);

    try {
      const response = await fetch(currentVideoUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      fileDownload(blob, `${video.slug}.mp4`);
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: 'Download Failed',
        description: 'Could not download the video. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const currentVideoUrl = videoSources.find(s => s.quality === selectedQuality)?.url || videoSources[0]?.url;

  return (
    <div>
      <div 
        ref={containerRef}
        className="bg-black aspect-video mb-6 rounded-lg overflow-hidden relative group/video"
        onMouseMove={showControls}
        onMouseLeave={hideControls}
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          src={currentVideoUrl}
          className="w-full h-full"
          poster={video.thumbnailUrl}
          onDoubleClick={toggleFullscreen}
          key={selectedQuality}
          preload="metadata"
          autoPlay
          muted
          playsInline
          onLoadedMetadata={(e) => {
            if(e.currentTarget.duration && !isNaN(e.currentTarget.duration)) {
              setDuration(e.currentTarget.duration)
            }
          }}
          onCanPlay={() => {
              if (videoRef.current?.duration && !isNaN(videoRef.current?.duration)) {
                setDuration(videoRef.current.duration)
              }
              setIsLoading(false);
          }}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
        >
          Your browser does not support the video tag.
        </video>
        
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
        )}

        <div 
            className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 pointer-events-none",
                isControlsVisible ? 'opacity-100' : 'opacity-0'
            )}
        >
          <div 
              className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  isPlaying ? 'opacity-0 group-hover/video:opacity-0' : 'opacity-100'
              )}
              style={{ pointerEvents: isPlaying ? 'none' : 'auto' }}
          >
              <button 
                onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform"
              >
                  <Play className="w-10 h-10 text-white ml-2" />
              </button>
          </div>

          <div 
            className="absolute bottom-0 left-0 right-0 p-3 space-y-2 pointer-events-auto" 
            onClick={e => e.stopPropagation()}
            onMouseEnter={() => { if(controlsTimeout.current) clearTimeout(controlsTimeout.current); }}
            onMouseLeave={showControls}
          >
            <Slider
              value={[progress]}
              onValueChange={([value]) => handleSeek(value)}
              max={100}
              step={0.1}
              className="w-full h-2.5 [&_[data-slot=track]]:h-1.5 [&_[data-slot=range]]:bg-primary [&_[data-slot=thumb]]:h-3.5 [&_[data-slot=thumb]]:w-3.5"
            />
            
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <div className="flex items-center gap-2 group/volume">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white" onClick={toggleMute}>
                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                    <Slider
                        value={[isMuted ? 0 : volume * 100]}
                        onValueChange={([value]) => handleVolumeChange(value)}
                        max={100}
                        step={1}
                        className="w-20 h-1 [&_[data-slot=track]]:h-1 [&_[data-slot=range]]:bg-white [&_[data-slot=thumb]]:hidden"
                    />
                </div>
                <div className="text-xs font-mono">
                  <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 ml-auto">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white" onClick={handleDownload} disabled={isDownloading}>
                    {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : (downloaded ? <Check className="w-5 h-5 text-green-500" /> : <Download className="w-5 h-5" />)}
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white">
                            <FastForward className="w-5 h-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-1 bg-black/80 border-stone-700 text-white mb-2">
                        <div className="flex flex-col">
                            {[0.5, 1, 1.5, 2].map(rate => (
                                <Button key={rate} variant="ghost" onClick={() => handlePlaybackRateChange(rate)} className={cn("hover:bg-white/20 w-full justify-start text-xs h-8", playbackRate === rate && 'bg-primary hover:bg-primary/90')}>
                                    {rate}x
                                </Button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                {videoSources && videoSources.length > 1 && (
                  <Popover>
                      <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white">
                              <Settings className="w-5 h-5" />
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-1 bg-black/80 border-stone-700 text-white mb-2">
                          <div className="text-xs text-muted-foreground p-2">Quality</div>
                          <div className="flex flex-col">
                              {videoSources.map(source => (
                                  <Button key={source.quality} variant="ghost" onClick={() => handleQualityChange(source.quality)} className={cn("hover:bg-white/20 w-full justify-start text-xs h-8", selectedQuality === source.quality && 'bg-primary hover:bg-primary/90')}>
                                      {selectedQuality === source.quality && <Check className="w-4 h-4 mr-2" />}
                                      {source.quality}
                                  </Button>
                              ))}
                          </div>
                      </PopoverContent>
                  </Popover>
                )}
                
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 hover:text-white" onClick={toggleFullscreen}>
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">{video.title}</h1>

        <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            <span className="font-medium">{video.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <span className="font-medium">{(video.views / 1000000).toFixed(1)}M views</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{video.creator}</span>
          </div>
        </div>

        <div className="py-4 border-y border-border">
          <p className="text-base md:text-lg">{video.description}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-5 h-5 text-muted-foreground" />
          {video.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPageClient;
