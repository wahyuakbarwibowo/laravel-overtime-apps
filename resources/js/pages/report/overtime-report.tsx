import { Head, router } from '@inertiajs/react';

import { Button } from "@/components/ui/button";
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import overtime from "@/routes/overtime";
import { type Overtime, type BreadcrumbItem, OvertimeReportItem } from '@/types';



const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
  {
    title: 'Overtime',
    href: overtime.index.url(),
  }
];

interface Props {
  overtimes: OvertimeReportItem[]
}

export default function Index({ overtimes }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <table className="w-full border">
          <thead>
            <tr>
              <th>Staff</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {overtimes.map(o => (
              <tr key={o.id}>
                <td>{o.staff?.name}</td>
                <td>{o.tanggal}</td>
                <td>{o.jam_mulai} - {o.jam_selesai}</td>
                <td>{o.status}</td>
                <td className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => router.post(`/overtime/${o.id}/approve`)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => router.post(`/overtime/${o.id}/reject`)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
