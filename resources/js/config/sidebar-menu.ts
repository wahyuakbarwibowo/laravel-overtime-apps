import { LucideIcon, LayoutDashboard, Clock, CheckSquare, FileText } from 'lucide-react';

export type UserRole = 'staf' | 'leader' | 'manager' | 'admin';

export interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
    roles: UserRole[];
}

export const SIDEBAR_MENU: SidebarItem[] = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        roles: ['staf', 'leader', 'manager', 'admin'],
    },
    {
        label: 'Lembur Saya',
        href: '/overtime/staff',
        icon: Clock,
        roles: ['staf'],
    },
    {
        label: 'Pengajuan Lembur',
        href: '/overtime',
        icon: Clock,
        roles: ['leader'],
    },
    {
        label: 'Approval Lembur',
        href: '/overtime/approval',
        icon: CheckSquare,
        roles: ['manager'],
    },
    {
        label: 'Report Lembur',
        href: '/report/overtime',
        icon: FileText,
        roles: ['admin'],
    },
];
