import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutDashboard, Clock, CheckSquare, FileText } from 'lucide-react';

interface PageProps extends InertiaPageProps {
    auth: {
        user: {
            role: 'staf' | 'leader' | 'manager' | 'admin';
        };
    };
}

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
import { type NavItem } from '@/types';

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        roles: ['staf', 'leader', 'manager', 'admin'],
    },
    {
        title: 'Lembur Saya',
        href: '/overtime/staff',
        icon: Clock,
        roles: ['staf'],
    },
    {
        title: 'Pengajuan Lembur',
        href: '/overtime/leader',
        icon: Clock,
        roles: ['leader'],
    },
    {
        title: 'Approval Lembur',
        href: '/overtime/approval',
        icon: CheckSquare,
        roles: ['manager'],
    },
    {
        title: 'Report Lembur',
        href: '/report/overtime',
        icon: FileText,
        roles: ['admin'],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
        roles: ['staf', 'leader', 'manager', 'admin'],
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
        roles: ['staf', 'leader', 'manager', 'admin'],
    },
];

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const role = auth.user.role;

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
                <NavMain items={mainNavItems.filter(menu => menu.roles.includes(role))} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
