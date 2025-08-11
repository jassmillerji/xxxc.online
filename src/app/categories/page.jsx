
import { getCategories } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';


export const metadata = {
  title: 'Categories',
  description: 'Browse all video categories available on xxxc.online. Find content tailored to your tastes.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">Browse Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link href={`/categories/${category.slug}`} key={category.id} className="group">
            <Card className="overflow-hidden relative">
              <Image
                src={category.thumbnailUrl}
                alt={category.name}
                width={400}
                height={225}
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={category.dataAiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <CardContent className="absolute bottom-0 left-0 p-2 md:p-4">
                <h2 className="text-base md:text-xl font-bold text-white font-headline">{category.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
