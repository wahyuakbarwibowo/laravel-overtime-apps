
import { Head } from '@inertiajs/react';


import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    title: 'Pengajuan Lembur',
    href: '/overtime',
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

export default function LeaderList({ overtimes }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengajuan Lembur" />

      <div className="flex flex-col gap-6 p-4">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              Pengajuan Lembur
            </h1>
            <p className="text-sm text-muted-foreground">
              Daftar pengajuan lembur yang Anda buat
            </p>
          </div>

          <Button asChild>
            <a href="/overtime/create">+ Buat Pengajuan</a>
          </Button>
        </div>

        {/* TABLE */}
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Staf</TableHead>
                <TableHead>Jam</TableHead>
                <TableHead>Alasan</TableHead>
                <TableHead>Lampiran</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {overtimes.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    Belum ada pengajuan lembur
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
                    {o.jam_mulai} – {o.jam_selesai}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {o.alasan}
                  </TableCell>
                  <TableCell>
                    {o.attachment_path && (
                      <a
                        href={`/storage/${o.attachment_path}`}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Lihat Lampiran
                      </a>
                    )}
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
