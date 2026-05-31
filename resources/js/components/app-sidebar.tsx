import { Link } from '@inertiajs/react';
import {
    BarChart3,
    Building2,
    Clock,
    CreditCard,
    HeartHandshake,
    HelpCircle,
    ImageDownIcon,
    Landmark,
    Layers,
    LayoutGrid,
    ListChecks,
    Mail,
    MapPin,
    MessageSquareQuote,
    Search,
    Settings,
    Sparkles,
    Stethoscope,
    Store,
    Tag,
    Wallet,
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
    {
        title: 'بطاقات العضوية',
        href: '/dashboard/card-templates',
        icon: ImageDownIcon,
        iconClassName: 'bg-violet-500/15 text-violet-300',
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

const contentNav: NavItem[] = [
    {
        title: 'الأسئلة الشائعة',
        href: '/dashboard/faqs',
        icon: HelpCircle,
        iconClassName: 'bg-teal-500/15 text-teal-300',
    },
    {
        title: 'آراء الأعضاء',
        href: '/dashboard/testimonials',
        icon: MessageSquareQuote,
        iconClassName: 'bg-violet-500/15 text-violet-300',
    },
    {
        title: 'الباقات',
        href: '/dashboard/pricing-plans',
        icon: Wallet,
        iconClassName: 'bg-emerald-500/15 text-emerald-300',
    },
    {
        title: 'خدمات الصفحة الرئيسية',
        href: '/dashboard/home-services',
        icon: Stethoscope,
        iconClassName: 'bg-cyan-500/15 text-cyan-300',
    },
    {
        title: 'كيف نعمل',
        href: '/dashboard/home-steps',
        icon: ListChecks,
        iconClassName: 'bg-amber-500/15 text-amber-300',
    },
    {
        title: 'العروض المميزة',
        href: '/dashboard/home-featured-offers',
        icon: Sparkles,
        iconClassName: 'bg-pink-500/15 text-pink-300',
    },
    {
        title: 'إحصائيات عن الشركة',
        href: '/dashboard/about-stats',
        icon: BarChart3,
        iconClassName: 'bg-orange-500/15 text-orange-300',
    },
    {
        title: 'قيمنا',
        href: '/dashboard/about-values',
        icon: HeartHandshake,
        iconClassName: 'bg-lime-500/15 text-lime-300',
    },
    {
        title: 'الخط الزمني',
        href: '/dashboard/about-timeline',
        icon: Clock,
        iconClassName: 'bg-blue-500/15 text-blue-300',
    },
    {
        title: 'محتوى الصفحات (عام)',
        href: '/dashboard/page-contents',
        icon: Layers,
        iconClassName: 'bg-fuchsia-500/15 text-fuchsia-300',
    },
];

const settingsNav: NavItem[] = [
    {
        title: 'إعدادات الموقع',
        href: '/dashboard/site-settings',
        icon: Settings,
        iconClassName: 'bg-slate-500/15 text-slate-300',
    },
];

const messagesNav: NavItem[] = [
    {
        title: 'رسائل التواصل',
        href: '/dashboard/contact-messages',
        icon: Mail,
        iconClassName: 'bg-fuchsia-500/15 text-fuchsia-300',
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
                <NavMain items={contentNav} label="محتوى الصفحات" />
                <NavMain items={messagesNav} label="الرسائل" />
                <NavMain items={settingsNav} label="الإعدادات" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
