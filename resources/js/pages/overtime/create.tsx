import { Head, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import { type BreadcrumbItem } from "@/types";

interface Staff {
  id: number;
  name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Create({ staffs }: { staffs: Staff[] }) {
  const { data, setData, post, processing, errors } = useForm({
    staff_id: '',
    tanggal: '',
    jam_mulai: '',
    jam_selesai: '',
    alasan: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post('/overtime');
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Lembur" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <form onSubmit={submit} className="space-y-4 max-w-xl">
          <div>
            <Label>Staff</Label>
            <select
              className="w-full border p-2"
              value={data.staff_id}
              onChange={e => setData('staff_id', e.target.value)}
            >
              <option value="">Pilih Staff</option>
              {staffs.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <InputError message={errors.staff_id} />
          </div>

          <Input type="date" onChange={e => setData('tanggal', e.target.value)} />
          <Input type="time" onChange={e => setData('jam_mulai', e.target.value)} />
          <Input type="time" onChange={e => setData('jam_selesai', e.target.value)} />

          <textarea
            className="w-full border p-2"
            placeholder="Alasan lembur"
            onChange={e => setData('alasan', e.target.value)}
          />

          <InputError message={errors.jam_selesai} />

          <Button disabled={processing}>Submit</Button>
        </form>
      </div>
    </AppLayout>
  );
}
