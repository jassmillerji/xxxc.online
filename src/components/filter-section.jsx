
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, FilterX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { ScrollArea } from './ui/scroll-area';


const SortByFilter = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full md:w-[180px] bg-card border-none h-12 rounded-full">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="popular">Most Viewed</SelectItem>
      <SelectItem value="top-rated">Top Rated</SelectItem>
      <SelectItem value="newest">Newest</SelectItem>
    </SelectContent>
  </Select>
);

const CategoryFilter = ({ value, onChange, categories }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full md:w-[180px] bg-card border-none h-12 rounded-full">
      <SelectValue placeholder="All Categories" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All Categories</SelectItem>
      {categories.map(cat => (
        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const PornstarFilter = ({ value, onChange, pornstars }) => {
    const [open, setOpen] = useState(false);
    const selectedPornstar = pornstars.find(p => p.name === value)?.name || "All Pornstars";

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full md:w-[200px] justify-between bg-card border-none hover:bg-card h-12 rounded-full hover:text-white"
                >
                    <span className="truncate">{selectedPornstar}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search pornstar..." />
                    <CommandEmpty>No pornstar found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-72">
                            <CommandItem
                                value="All Pornstars"
                                onSelect={() => {
                                    onChange('all');
                                    setOpen(false);
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", value === 'all' ? "opacity-100" : "opacity-0")} />
                                All Pornstars
                            </CommandItem>
                            {pornstars.map((pornstar) => (
                                <CommandItem
                                    key={pornstar.id}
                                    value={pornstar.name}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? 'all' : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn("mr-2 h-4 w-4", value === pornstar.name ? "opacity-100" : "opacity-0")} />
                                    {pornstar.name}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const TagsFilter = ({ value, onChange, tags }) => {
    const [open, setOpen] = useState(false);

    const handleTagToggle = (tag) => {
        const newTags = value.includes(tag)
            ? value.filter(t => t !== tag)
            : [...value, tag];
        onChange(newTags);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full md:w-[200px] justify-between bg-card border-none h-12 rounded-full hover:bg-card hover:text-white"
                >
                    <span className="truncate">{value.length > 0 ? `${value.length} tags selected` : 'Select Tags'}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                 <Command>
                    <CommandInput placeholder="Search tags..." />
                    <CommandEmpty>No tags found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-72">
                             {tags.map((tag) => (
                                <CommandItem
                                    key={tag}
                                    value={tag}
                                    onSelect={() => handleTagToggle(tag)}
                                >
                                    <Check className={cn("mr-2 h-4 w-4", value.includes(tag) ? "opacity-100" : "opacity-0")} />
                                    {tag}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default function FilterSection({ onFilterChange, categories, pornstars, tags, initialFilters }) {
  const [currentFilters, setCurrentFilters] = useState(initialFilters);

  const handleFilter = (filterName, value) => {
    setCurrentFilters(prev => ({ ...prev, [filterName]: value }));
  };

  useEffect(() => {
    onFilterChange(currentFilters);
  }, [currentFilters, onFilterChange]);

  const resetFilters = () => {
    setCurrentFilters({
      sort: 'popular',
      category: 'all',
      pornstar: 'all',
      tags: [],
    });
  }

  const hasActiveFilters = 
    currentFilters.sort !== 'popular' || 
    currentFilters.category !== 'all' || 
    currentFilters.pornstar !== 'all' || 
    currentFilters.tags.length > 0;

  return (
    <div className="mb-8 p-4 bg-card/50 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <SortByFilter value={currentFilters.sort} onChange={(value) => handleFilter('sort', value)} />
                <CategoryFilter value={currentFilters.category} onChange={(value) => handleFilter('category', value)} categories={categories} />
                <PornstarFilter value={currentFilters.pornstar} onChange={(value) => handleFilter('pornstar', value)} pornstars={pornstars} />
                <TagsFilter value={currentFilters.tags} onChange={(value) => handleFilter('tags', value)} tags={tags} />
            </div>
            {hasActiveFilters && (
                <div className="flex justify-end">
                    <Button onClick={resetFilters} variant="ghost" className="h-12 rounded-full text-muted-foreground hover:text-white">
                        <FilterX className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>
            )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {currentFilters.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="px-2 py-1">
                    {tag}
                </Badge>
            ))}
        </div>
    </div>
  );
}
