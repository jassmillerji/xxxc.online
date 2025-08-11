
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Eye, Users, Video, Zap, Sun, Moon, BookOpen, Heart, Star, Smile } from 'lucide-react';
import CamModelCard from '@/components/cam-model-card';
import ProfileCircleCard from '@/components/profile-circle-card';
import { cn } from '@/lib/utils';


const iconMap = {
    Users,
    Zap,
    Sun,
    Moon,
    BookOpen,
    Heart,
    Star,
    Smile,
};


const FeaturedModelCard = ({ model }) => (
    <ProfileCircleCard 
        profile={{
            name: model.name,
            imageUrl: model.image,
            dataAiHint: model.dataAiHint
        }} 
        href="#"
    />
);


export default function LiveCamsClient({ camData }) {
    const { featured, sections } = camData;

    return (
        <div className="text-white w-full">
            <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-16">
                {/* Other Sections */}
                {sections.map((section) => (
                    <section key={section.title}>
                        <h2 className="text-2xl font-bold mb-6 font-headline">{section.title}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 gap-y-8">
                            {section.models.map((model) => (
                                <CamModelCard key={model.name} model={model} />
                            ))}
                        </div>
                    </section>
                ))}

                {/* Categories Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 font-headline">Top Cam Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                        {camData.categories.map(category => {
                            const Icon = iconMap[category.icon];
                            return (
                                <Link href="#" key={category.name} className="group">
                                <Card className="bg-stone-900 border-stone-800 hover:border-accent transition-colors overflow-hidden">
                                    <div className="p-4 flex items-center gap-4">
                                        {Icon && <Icon className="w-8 h-8 text-accent"/>}
                                        <div>
                                            <h3 className="font-bold text-lg">{category.name}</h3>
                                            <p className="text-sm text-muted-foreground">{category.count} models</p>
                                        </div>
                                    </div>
                                </Card>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
