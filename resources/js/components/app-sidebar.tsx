import { Link } from '@inertiajs/react';
import {
    Building2,
    CreditCard,
    Landmark,
    Layers,
    LayoutGrid,
    MapPin,
    Search,
    Store,
    Tag,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
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
        title: 'الرئيسية',
        href: dashboard(),
        icon: LayoutGrid,
        iconClassName: 'bg-sky-500/15 text-sky-300',
    },
];

const cataloguesNav: NavItem[] = [
    {
        title: 'المحافظات',
        href: '/dashboard/governorates',
        icon: MapPin,
        iconClassName: 'bg-emerald-500/15 text-emerald-300',
    },
    {
        title: 'المدن',
        href: '/dashboard/cities',
        icon: Landmark,
        iconClassName: 'bg-lime-500/15 text-lime-300',
    },
    {
        title: 'أنواع المنشآت',
        href: '/dashboard/facility-types',
        icon: Layers,
        iconClassName: 'bg-violet-500/15 text-violet-300',
    },
];

const networkNav: NavItem[] = [
    {
        title: 'المنشآت',
        href: '/dashboard/facilities',
        icon: Building2,
        iconClassName: 'bg-cyan-500/15 text-cyan-300',
    },
    {
        title: 'الفروع',
        href: '/dashboard/facility-branches',
        icon: Store,
        iconClassName: 'bg-teal-500/15 text-teal-300',
    },
    {
        title: 'العروض',
        href: '/dashboard/offers',
        icon: Tag,
        iconClassName: 'bg-amber-500/15 text-amber-300',
    },
];

const membersNav: NavItem[] = [
    {
        title: 'العضويات',
        href: '/dashboard/memberships',
        icon: CreditCard,
        iconClassName: 'bg-rose-500/15 text-rose-300',
    },
];

const seoNav: NavItem[] = [
    {
        title: 'SEO الصفحات',
        href: '/dashboard/page-seos',
        icon: Search,
        iconClassName: 'bg-indigo-500/15 text-indigo-300',
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
                <NavMain items={overviewNav} label="عام" />
                <NavMain items={cataloguesNav} label="الفهارس" />
                <NavMain items={networkNav} label="الشبكة" />
                <NavMain items={membersNav} label="الأعضاء" />
                <NavMain items={seoNav} label="تحسين البحث" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
