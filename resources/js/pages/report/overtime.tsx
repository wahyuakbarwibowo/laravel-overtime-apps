import { Head, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { OvertimeReport } from '@/types/overtime-report';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Props {
    reports: OvertimeReport[];
    filters: {
        from?: string;
        to?: string;
        status?: string;
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Report Lembur', href: '/report/overtime' },
];

export default function OvertimeReportPage({ reports, filters }: Props) {
    const applyFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        router.get('/report/overtime', Object.fromEntries(data), {
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Report Lembur" />

            <div className="flex flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">Report Lembur</h1>

                {/* FILTER */}
                <form
                    onSubmit={applyFilter}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4"
                >
                    <Input
                        type="date"
                        name="from"
                        defaultValue={filters.from}
                    />
                    <Input
                        type="date"
                        name="to"
                        defaultValue={filters.to}
                    />

                    <Select name="status" defaultValue={filters.status}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        name="search"
                        placeholder="Nama staf"
                        defaultValue={filters.search}
                    />

                    <Button type="submit">Filter</Button>
                </form>

                {/* TABLE */}
                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Staf</TableHead>
                                <TableHead>Total Jam Lembur</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {reports.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={2}
                                        className="text-center text-muted-foreground"
                                    >
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}

                            {reports.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.name}</TableCell>
                                    <TableCell>{r.total_jam} jam</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
