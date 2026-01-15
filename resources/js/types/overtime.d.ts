
// status lembur
export type OvertimeStatus = 'pending' | 'approved' | 'rejected';

// payload create overtime (leader)
export interface CreateOvertimePayload {
    staff_id: number | string;
    tanggal: string;        // yyyy-mm-dd
    jam_mulai: string;      // HH:mm
    jam_selesai: string;    // HH:mm
    alasan: string;
}

// user minimal (relasi)
export interface OvertimeUser {
    id: number;
    name: string;
    role?: 'staf' | 'leader' | 'manager' | 'admin';
}

// overtime entity dari backend
export interface Overtime {
    id: number;
    staff_id: number;
    leader_id: number;
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    alasan: string;
    status: OvertimeStatus;
    created_at: string;
    updated_at: string;
    attachment_path?: string | null;

    staff?: OvertimeUser;
    leader?: OvertimeUser;
}