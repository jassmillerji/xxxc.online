
'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Logo from "./logo";
import { getCategories } from "@/lib/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    async function loadCategories() {
        const allCategories = await getCategories();
        setCategories(allCategories.slice(0, 5)); // Get first 5 categories
    }
    loadCategories();
  }, []);
  
  const discoverLinks = [
      {title: "Porn Videos", href: "/"},
      {title: "Categories", href: "/categories"},
      {title: "Live Cams", href: "/live-cams"},
      {title: "Pornstars", href: "/pornstars"},
      {title: "Photos & Gifs", href: "/photos-and-gifs"},
      {title: "Reels", href: "/fuck-now"},
  ];

  const legalLinks = [
      { href: '/terms-of-service', name: 'Terms of Service' },
      { href: '/privacy-policy', name: 'Privacy Policy' },
      { href: '/dmca', name: 'DMCA' },
      { href: '/disclaimer', name: 'Disclaimer' }
  ];

  return (
    <footer className="bg-background text-muted-foreground mt-16">
       <div className="container mx-auto rounded-2xl bg-card p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Column 1: Logo and Info */}
            <div className="lg:col-span-5 space-y-6">
              <Logo />
              <p className="text-sm text-muted-foreground max-w-sm">
                The ultimate destination for high-quality adult entertainment. Explore thousands of videos, photos, and live cams from your favorite creators.
              </p>
            </div>

            {/* Link Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Column 2: Discover */}
                <div>
                  <h3 className="font-bold text-foreground text-base mb-4">Discover</h3>
                  <ul className="space-y-3">
                    {discoverLinks.map((link) => (
                      <li key={link.title}>
                        <Link href={link.href} className="hover:text-accent text-sm">{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Categories */}
                <div>
                  <h3 className="font-bold text-foreground text-base mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link href={`/categories/${cat.slug}`} className="hover:text-accent text-sm">{cat.name}</Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/categories" className="hover:text-accent text-sm font-semibold">View All...</Link>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Legal */}
                <div>
                  <h3 className="font-bold text-foreground text-base mb-4">Company</h3>
                  <ul className="space-y-3">
                      {legalLinks.map((link) => (
                        <li key={link.name}>
                          <Link href={link.href} className="hover:text-accent text-sm">{link.name}</Link>
                        </li>
                      ))}
                  </ul>
                </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
            <p className="text-muted-foreground">&copy; {currentYear} xxxc.online. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="hover:text-accent">{link.name}</Link>
                ))}
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
