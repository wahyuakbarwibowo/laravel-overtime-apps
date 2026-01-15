import { Head } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { type Overtime } from '@/types/overtime';


interface Props {
    overtimes: Overtime[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lembur Saya',
        href: '/overtime/staff',
    },
];

const statusVariant: Record<
    Overtime['status'],
    'default' | 'secondary' | 'destructive'
> = {
    pending: 'secondary',
    approved: 'default',
    rejected: 'destructive',
};

export default function StaffList({ overtimes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lembur Saya" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div>
                    <h1 className="text-xl font-semibold">Lembur Saya</h1>
                    <p className="text-sm text-muted-foreground">
                        Daftar lembur yang ditugaskan kepada Anda
                    </p>
                </div>

                {/* TABLE */}
                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Jam</TableHead>
                                <TableHead>Alasan</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {overtimes.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        Belum ada data lembur
                                    </TableCell>
                                </TableRow>
                            )}

                            {overtimes.map((o) => (
                                <TableRow key={o.id}>
                                    <TableCell>{o.tanggal}</TableCell>
                                    <TableCell>
                                        {o.jam_mulai} – {o.jam_selesai}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {o.alasan}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[o.status]}>
                                            {o.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
