import { Head, router } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from "@/layouts/app-layout";
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
    { title: 'Approval Lembur', href: '/overtime/approval' },
];

const statusVariant: Record<
    Overtime['status'],
    'default' | 'secondary' | 'destructive'
> = {
    pending: 'secondary',
    approved: 'default',
    rejected: 'destructive',
};

export default function Approval({ overtimes }: Props) {
    const approve = (id: number) => {
        if (!confirm('Approve pengajuan lembur ini?')) return;

        router.post(`/overtime/${id}/approve`);
    };

    const reject = (id: number) => {
        if (!confirm('Reject pengajuan lembur ini?')) return;

        router.post(`/overtime/${id}/reject`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Approval Lembur" />

            <div className="flex flex-col gap-6 p-4">
                {/* HEADER */}
                <div>
                    <h1 className="text-xl font-semibold">Approval Lembur</h1>
                    <p className="text-sm text-muted-foreground">
                        Daftar pengajuan lembur yang menunggu persetujuan
                    </p>
                </div>

                {/* TABLE */}
                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Staf</TableHead>
                                <TableHead>Leader</TableHead>
                                <TableHead>Jam</TableHead>
                                <TableHead>Alasan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {overtimes.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground"
                                    >
                                        Tidak ada pengajuan lembur
                                    </TableCell>
                                </TableRow>
                            )}

                            {overtimes.map((o) => (
                                <TableRow key={o.id}>
                                    <TableCell>{o.tanggal}</TableCell>
                                    <TableCell>
                                        {o.staff?.name ?? '-'}
                                    </TableCell>
                                    <TableCell>
                                        {o.leader?.name ?? '-'}
                                    </TableCell>
                                    <TableCell>
                                        {o.jam_mulai} – {o.jam_selesai}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {o.alasan}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                statusVariant[o.status]
                                            }
                                        >
                                            {o.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {o.status === 'pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        approve(o.id)
                                                    }
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        reject(o.id)
                                                    }
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        ) : (
                                            '-'
                                        )}
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
