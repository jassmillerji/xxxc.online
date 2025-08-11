
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const PhotoPageClient = ({ item }) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleDownload = async () => {
    try {
      // In a real app, the thumbnailUrl might be a higher resolution version
      const response = await fetch(item.thumbnailUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${item.title.replace(/\s+/g, '-')}.${item.type === 'gif' ? 'gif' : 'jpg'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Download Started',
        description: `${item.title} is being downloaded.`,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: 'Download Failed',
        description: 'Could not download the content. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this ${item.type} on xxxc.online!`,
        url: window.location.href,
      }).catch(error => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast({
        title: 'Link Copied!',
        description: 'The link has been copied to your clipboard.',
      });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="aspect-video w-full bg-black rounded-md overflow-hidden mb-6 flex items-center justify-center">
        <Image
          src={item.thumbnailUrl} // Assuming thumbnailUrl is the main image for now
          alt={item.title}
          width={800}
          height={450}
          className="w-full h-full object-contain"
          data-ai-hint={item.dataAiHint}
          priority
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">{item.title}</h1>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" onClick={handleShare}>
            {isCopied ? <Copy className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
            {isCopied ? 'Copied' : 'Share'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPageClient;
