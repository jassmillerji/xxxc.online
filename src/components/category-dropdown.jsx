'use client';

import Link from 'next/link';
import { getCategories } from '@/lib/data';
import { useEffect, useState } from 'react';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
        const allCategories = await getCategories();
        setCategories(allCategories);
    }
    loadCategories();
  }, []);
  
  const mainCategories = [
      { title: "Popular", href: "/categories?sort=popular" },
      { title: "Trending", href: "/categories?sort=trending" },
      { title: "Gay", href: "/categories?orientation=gay" },
      { title: "All Categories", href: "/categories" },
  ]

  // Create chunks of categories for layout
  const chunkSize = 8;
  const categoryChunks = [];
  for (let i = 0; i < categories.length; i += chunkSize) {
    categoryChunks.push(categories.slice(i, i + chunkSize));
  }


  return (
    <div className="w-screen max-w-full bg-card text-white">
        <div className="mx-auto w-full max-w-screen-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
                <h3 className="font-bold text-foreground mb-4">New & Trending</h3>
                <ul className="space-y-2">
                    {mainCategories.map(cat => (
                        <li key={cat.title}>
                            <Link href={cat.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">{cat.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            {categoryChunks.map((chunk, index) => (
                <div key={index} className="md:col-span-1">
                    <h3 className="font-bold text-foreground mb-4">Categories</h3>
                    <ul className="space-y-2">
                        {chunk.map(cat => (
                             <li key={cat.id}>
                                <Link href={`/categories/${cat.slug}`} className="text-muted-foreground hover:text-accent transition-colors text-sm">{cat.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;
