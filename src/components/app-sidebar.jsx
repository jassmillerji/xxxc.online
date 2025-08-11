"use client";

import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Home, LayoutGrid, Clapperboard, Star, Flame, Image as ImageIcon, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";

const mainNavLinks = [
    { href: "/", key: 'main_nav_home', icon: Home },
    { href: "/categories", key: 'main_nav_categories', icon: LayoutGrid },
    { href: "/live-cams", key: 'main_nav_live_cams', icon: Clapperboard },
    { href: "/pornstars", key: 'main_nav_pornstars', icon: Star },
    { href: "/fuck-now", key: 'main_nav_fuck_now', icon: Flame },
    { href: "/photos-and-gifs", key: 'main_nav_photos_gifs', icon: ImageIcon },
];

const SidebarNavLink = ({ href, children, icon: Icon, onClick }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <SidebarMenuItem>
            <Link href={href} passHref legacyBehavior>
                <SidebarMenuButton
                    onClick={onClick}
                    isActive={isActive}
                    className={cn(
                        "h-12 rounded-lg text-white font-bold text-base justify-start",
                        isActive && "bg-accent text-accent-foreground"
                    )}
                >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{children}</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    );
};


const AppSidebar = () => {
    const { t } = useLanguage();
    const { setOpenMobile } = useSidebar();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setOpenMobile(false);
        }
    };

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarContent className="p-4 flex flex-col">
                <form onSubmit={handleSearch} className="px-4 mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                            placeholder={t('search_placeholder')} 
                            className="bg-card border-none h-10 rounded-full pl-10 placeholder:text-muted-foreground"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
                <ScrollArea className="flex-1 -mx-4 pt-4">
                    <SidebarMenu className="gap-2 px-4">
                       {mainNavLinks.map((link) => (
                         <SidebarNavLink 
                           key={link.key} 
                           href={link.href}
                           icon={link.icon}
                           onClick={() => setOpenMobile(false)}
                         >
                            {t(link.key)}
                         </SidebarNavLink>
                       ))}
                    </SidebarMenu>
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
