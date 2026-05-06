import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Building2,
    CreditCard,
    FolderGit2,
    Layers,
    LayoutGrid,
    MapPin,
    Store,
    Tag,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const overviewNav: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        iconClassName: 'bg-sky-500/15 text-sky-300',
    },
];

const cataloguesNav: NavItem[] = [
    {
        title: 'Governorates',
        href: '/dashboard/governorates',
        icon: MapPin,
        iconClassName: 'bg-emerald-500/15 text-emerald-300',
    },
    {
        title: 'Facility Types',
        href: '/dashboard/facility-types',
        icon: Layers,
        iconClassName: 'bg-violet-500/15 text-violet-300',
    },
];

const networkNav: NavItem[] = [
    {
        title: 'Facilities',
        href: '/dashboard/facilities',
        icon: Building2,
        iconClassName: 'bg-cyan-500/15 text-cyan-300',
    },
    {
        title: 'Branches',
        href: '/dashboard/facility-branches',
        icon: Store,
        iconClassName: 'bg-teal-500/15 text-teal-300',
    },
    {
        title: 'Offers',
        href: '/dashboard/offers',
        icon: Tag,
        iconClassName: 'bg-amber-500/15 text-amber-300',
    },
];

const membersNav: NavItem[] = [
    {
        title: 'Memberships',
        href: '/dashboard/memberships',
        icon: CreditCard,
        iconClassName: 'bg-rose-500/15 text-rose-300',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={overviewNav} label="Overview" />
                <NavMain items={cataloguesNav} label="Catalogues" />
                <NavMain items={networkNav} label="Network" />
                <NavMain items={membersNav} label="Members" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
