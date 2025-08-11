
"use client";

import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, LayoutGrid, Clapperboard, Star, Flame, Image as ImageIcon, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

    return (
        <Sidebar>
            <SidebarContent className="p-4 flex flex-col bg-card">
                <ScrollArea className="flex-1 -mx-4">
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
