import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavMain({
    items = [],
    label = 'Platform',
}: {
    items: NavItem[];
    label?: string;
}) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link
                                href={item.href}
                                prefetch
                                className="group/nav"
                            >
                                {item.icon && (
                                    <span
                                        className={cn(
                                            'flex size-7 items-center justify-center rounded-lg transition-all duration-300',
                                            'group-hover/nav:scale-110 group-hover/nav:shadow-md',
                                            'group-data-[active=true]/nav:shadow-md group-data-[active=true]/nav:ring-1 group-data-[active=true]/nav:ring-white/20',
                                            item.iconClassName,
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </span>
                                )}
                                <span>{item.title}</span>
                                {item.badge != null && item.badge > 0 && (
                                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                        {item.badge > 99 ? '99+' : item.badge}
                                    </span>
                                )}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
