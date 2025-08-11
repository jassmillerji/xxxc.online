
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';

const trendingSearches = [
    "Stepmom", "Indian", "Mom", "Family", "Cheating", "Bhabhi", "Forced", "Sexmex", "Swap", "Brazzers house", "Milf", "Teen", "Drunk", "Incest", "Shemale", "Anal",
    "Japanese shemale", "Creampie", "Mature", "Kitchen sexy", "Massage hottest", "69", "Chinese", "Trans", "Hot dog", "Alison Taylor", "Hentai", "Sophia lee",
    "Pov", "Jmac", "Transangels", "Glory Holes", "Phoenix marie", "Walking booty nuds", "Jimmy Michaels", "Creampie eating",
    "Shy Redheads Want Anal", "foxxx", "Brazilian styles", "Fation walk model Miami", "Violet summers", "cake", "Grinding",
    "Micro bikini big on street", "Walking Miami styles", "Vicki Chase", "Try on haul", "Walking slut model", "Fation model styles"
];

const TrendingSearches = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 mt-8">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Flame className="w-7 h-7 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-bold font-headline">Trending Search Requests</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search, index) => (
                        <Button
                            key={index}
                            asChild
                            variant="secondary"
                            className="bg-card hover:bg-muted rounded-md h-auto py-1.5 px-3 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <Link href={`/search?q=${encodeURIComponent(search)}`}>
                                {search}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingSearches;
