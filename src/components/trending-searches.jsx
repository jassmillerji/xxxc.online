
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/data';

const TrendingSearches = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        }
        fetchCategories();
    }, []);

    return (
        <div className="w-full mt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <Flame className="w-7 h-7 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-bold font-headline">Browse Categories</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            asChild
                            variant="secondary"
                            className="bg-card hover:bg-muted rounded-md h-auto py-1.5 px-3 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <Link href={`/categories/${category.slug}`}>
                                {category.name}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingSearches;
