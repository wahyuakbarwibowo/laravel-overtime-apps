# SOLUSI STUDI KASUS

**Fitur Pengajuan, Approval & Report Lembur**

## 1. Arsitektur Umum

* **Backend**: Laravel 10 (PHP 8.1)
* **Database**: MySQL
* **Auth**: Laravel Auth (Sanctum / Session-based)
* **Frontend**: Blade (sederhana) atau React (nilai plus)
* **Role-based Access Control (RBAC)**: Middleware

---

## 2. Role & Alur Bisnis

### Workflow

```
Leader membuat pengajuan → Manager approve/reject → 
Staf melihat status → Admin/Atasan melihat report
```

### Role

| Role    | Hak Akses Utama              |
| ------- | ---------------------------- |
| Staf    | Melihat lembur miliknya      |
| Leader  | Mengajukan lembur untuk staf |
| Manager | Approve / Reject lembur      |
| Admin   | Laporan & monitoring         |

---

## 3. Desain Database

### 3.1 users

```sql
users
- id
- name
- email
- password
- role (enum: staf, leader, manager, admin)
- division_id (nullable)
- timestamps
```

### 3.2 overtime

```sql
overtime
- id
- staff_id (FK users.id)
- leader_id (FK users.id)
- tanggal
- jam_mulai
- jam_selesai
- alasan
- status (pending, approved, rejected)
- attachment (nullable)
- timestamps
```

### 3.3 divisions (nilai plus)

```sql
divisions
- id
- name
```

---

## 4. Backend (Laravel)

### 4.1 Middleware Role

```php
public function handle($request, Closure $next, ...$roles)
{
    if (!in_array(auth()->user()->role, $roles)) {
        abort(403);
    }
    return $next($request);
}
```

---

### 4.2 API / Route Utama

```php
Route::middleware(['auth'])->group(function () {

    // Leader
    Route::middleware('role:leader')->group(function () {
        Route::post('/overtime', [OvertimeController::class, 'store']);
        Route::get('/overtime/my-request', [OvertimeController::class, 'leaderList']);
    });

    // Manager
    Route::middleware('role:manager')->group(function () {
        Route::get('/overtime', [OvertimeController::class, 'index']);
        Route::post('/overtime/{id}/approve', [OvertimeController::class, 'approve']);
        Route::post('/overtime/{id}/reject', [OvertimeController::class, 'reject']);
    });

    // Staf
    Route::middleware('role:staf')->group(function () {
        Route::get('/overtime/my', [OvertimeController::class, 'staffList']);
    });

    // Report
    Route::middleware('role:admin,manager')->group(function () {
        Route::get('/report/overtime', [ReportController::class, 'overtimeReport']);
    });

});
```

---

### 4.3 Validasi (Minimal Requirement)

```php
$request->validate([
    'tanggal' => 'required|date',
    'jam_mulai' => 'required',
    'jam_selesai' => 'required|after:jam_mulai',
    'staff_id' => 'required|exists:users,id',
]);
```

---

### 4.4 Logic Approve / Reject

```php
public function approve($id)
{
    $overtime = Overtime::findOrFail($id);
    $overtime->status = 'approved';
    $overtime->save();
}
```

---

## 5. Report Lembur

### Query Total Jam Lembur

```sql
SELECT users.name,
SUM(TIMESTAMPDIFF(HOUR, jam_mulai, jam_selesai)) AS total_jam
FROM overtime
JOIN users ON users.id = overtime.staff_id
WHERE tanggal BETWEEN :start AND :end
AND status = 'approved'
GROUP BY users.id;
```

### Filter Report

* Rentang tanggal
* Divisi
* Status
* Search nama staf

---

## 6. Frontend (Contoh)

Jika **Blade**:

* Login page
* Dashboard sesuai role
* Table pengajuan lembur
* Form pengajuan lembur
* Halaman report (datatable + filter)

Jika **React (nilai plus)**:

* React + Axios
* Protected Route berdasarkan role
* Reusable Table & Filter Component

---

## 7. Keamanan & Best Practice

* Policy Laravel untuk akses data
* Enum status
* Soft delete (opsional)
* Pagination
* File upload validation (lampiran)

---

## 8. Nilai Plus (Opsional)

* Export report ke Excel
* Notification (email / database)
* Audit log approval
* Unit test (feature test)

---

## 9. Penutup (Untuk Presentasi)

> *“Solusi ini menerapkan workflow bisnis end-to-end, role-based access, validasi data, serta report agregasi lembur. Struktur dibuat scalable dan clean dengan Laravel best practices.”*