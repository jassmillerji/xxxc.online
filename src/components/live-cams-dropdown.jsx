"use client";

import Link from 'next/link';
import { getLiveCamsData } from '@/lib/data';
import { useEffect, useState } from 'react';

const LiveCamsDropdown = () => {
    const [camData, setCamData] = useState({ sections: [], categories: [] });

    useEffect(() => {
        async function loadData() {
            const data = await getLiveCamsData();
            setCamData(data);
        }
        loadData();
    }, []);

    const mainLinks = [
        { title: "New Models", href: "/live-cams?filter=new" },
        { title: "Couples", href: "/live-cams?filter=couples" },
        { title: "Teens", href: "/live-cams?filter=teens" },
        { title: "All Cams", href: "/live-cams" },
    ];
    
    // Create chunks of categories for layout
    const categoryChunks = [];
    const chunkSize = 8;
    for (let i = 0; i < camData.categories.length; i += chunkSize) {
        categoryChunks.push(camData.categories.slice(i, i + chunkSize));
    }

  return (
    <div className="w-screen max-w-full bg-card text-white">
        <div className="mx-auto w-full max-w-screen-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
             <div className="md:col-span-1">
                <h3 className="font-bold text-foreground mb-4">Discover Cams</h3>
                 <ul className="space-y-2">
                    {mainLinks.map(link => (
                        <li key={link.title}>
                            <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">{link.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            {categoryChunks.map((chunk, index) => (
              <div key={index} className="md:col-span-1">
                  <h3 className="font-bold text-foreground mb-4">Top Categories</h3>
                  <ul className="space-y-2">
                      {chunk.map(cat => (
                           <li key={cat.name}>
                              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">{cat.name}</Link>
                          </li>
                      ))}
                  </ul>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default LiveCamsDropdown;
