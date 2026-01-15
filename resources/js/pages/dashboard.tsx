import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

interface Stats {
    pending: number;
    approved: number;
    my_overtime: number;
}

interface DashboardProps extends InertiaPageProps {
    role: 'staf' | 'leader' | 'manager' | 'admin';
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
    const { role, stats } = usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">

                {/* ===== SUMMARY CARDS ===== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {role !== 'staf' && (
                        <StatCard
                            title="Pending Approval"
                            value={stats.pending}
                        />
                    )}

                    <StatCard
                        title="Approved Overtime"
                        value={stats.approved}
                    />

                    {role === 'staf' && (
                        <StatCard
                            title="My Overtime"
                            value={stats.my_overtime}
                        />
                    )}
                </div>

                {/* ===== QUICK ACTION ===== */}
                <div className="rounded-xl border p-6 space-y-4">
                    <h2 className="text-lg font-semibold">Quick Action</h2>

                    {role === 'leader' && (
                        <Button asChild>
                            <a href="/overtime/create">Buat Pengajuan Lembur</a>
                        </Button>
                    )}

                    {role === 'manager' && (
                        <Button asChild>
                            <a href="/overtime">Review Pengajuan Lembur</a>
                        </Button>
                    )}

                    {role === 'staf' && (
                        <Button asChild>
                            <a href="/overtime/staff">Lihat Lembur Saya</a>
                        </Button>
                    )}

                    {role === 'admin' && (
                        <Button asChild>
                            <a href="/report/overtime">Lihat Report Lembur</a>
                        </Button>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
