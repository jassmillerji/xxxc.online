'use client';

import Link from 'next/link';

const PhotosAndGifsDropdown = () => {

  const mainLinks = [
    { title: "Porn GIFs", href: "/gifs" },
    { title: "Photo Albums", href: "/albums" },
    { title: "Popular", href: "/photos-and-gifs?sort=popular" },
    { title: "Trending", href: "/photos-and-gifs?sort=trending" },
  ]
  
  const popularTags = [ "Tits", "Ass", "Pussy", "Amateur", "Dick", "Hot" ];
  const moreTags = [ "Teen 18+", "Hentai", "Sex", "Boobs" ];


  return (
    <div className="w-screen max-w-full bg-card text-white">
       <div className="mx-auto w-full max-w-screen-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <h3 className="font-bold text-foreground mb-4">Discover Content</h3>
              <ul className="space-y-2">
                  {mainLinks.map(link => (
                      <li key={link.title}>
                          <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">{link.title}</Link>
                      </li>
                  ))}
              </ul>
            </div>
             <div className="md:col-span-1">
              <h3 className="font-bold text-foreground mb-4">Popular Tags</h3>
              <ul className="space-y-2">
                  {popularTags.map(tag => (
                      <li key={tag}>
                          <Link href={`/photos-and-gifs?tag=${tag}`} className="text-muted-foreground hover:text-accent transition-colors text-sm">{tag}</Link>
                      </li>
                  ))}
              </ul>
            </div>
             <div className="md:col-span-1">
              <h3 className="font-bold text-foreground mb-4 opacity-0 md:opacity-100">More Tags</h3>
              <ul className="space-y-2">
                  {moreTags.map(tag => (
                      <li key={tag}>
                          <Link href={`/photos-and-gifs?tag=${tag}`} className="text-muted-foreground hover:text-accent transition-colors text-sm">{tag}</Link>
                      </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
};

export default PhotosAndGifsDropdown;
