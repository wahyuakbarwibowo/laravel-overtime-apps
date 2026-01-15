# 🕒 Overtime Management System

Aplikasi manajemen lembur sederhana dengan fitur **pengajuan, approval, dan report lembur** berbasis **role** dan **division**.

Dibangun sebagai studi kasus **Fullstack Developer** menggunakan **Laravel + Inertia.js + React + TypeScript**.

---

## ✨ Fitur Utama

### 🔐 Authentication & Role

* Login & Register
* Role user:

  * **Staf**
  * **Leader**
  * **Manager**
  * **Admin**
* Authorization berbasis role (middleware)

---

### 👤 Staf

* Melihat daftar lembur yang ditugaskan
* Melihat status: `pending / approved / rejected`
* Read-only (tidak bisa edit)

---

### 👨‍💼 Leader

* Membuat pengajuan lembur untuk staf
* Data lembur:

  * Tanggal
  * Jam mulai & selesai
  * Alasan
  * Staf yang ditugaskan
* Melihat daftar pengajuan yang dibuat beserta statusnya

---

### 🧑‍⚖️ Manager

* Melihat seluruh pengajuan lembur
* Melakukan **approve / reject**
* Aksi hanya tersedia untuk status `pending`

---

### 📊 Admin / Atasan

* Melihat **report total jam lembur per staf**
* Filter laporan:

  * Rentang tanggal
  * Status lembur
  * Division
  * Search nama staf
* Perhitungan total jam dilakukan di database (SQL aggregation)

---

### 🧭 Dashboard

* Dashboard berbeda untuk setiap role
* Menampilkan ringkasan data & quick action
* Sidebar menu **role-based**

---

## 🧱 Teknologi yang Digunakan

### Backend

* **Laravel 12**
* PHP **8.5**
* Authentication: Laravel Fortify
* Authorization: Middleware Role
* Database: MySQL / PostgreSQL

### Frontend

* **Inertia.js**
* **React + TypeScript**
* Bun
* shadcn/ui
* Tailwind CSS

---

## 🗂 Struktur Database (Inti)

### users

| Kolom    | Tipe                                        |
| -------- | ------------------------------------------- |
| id       | bigint                                      |
| name     | string                                      |
| email    | string                                      |
| password | string                                      |
| role     | enum (`staf`, `leader`, `manager`, `admin`) |
| division | string                                      |

---

### overtime

| Kolom       | Tipe                                     |
| ----------- | ---------------------------------------- |
| id          | bigint                                   |
| staff_id    | bigint                                   |
| leader_id   | bigint                                   |
| tanggal     | date                                     |
| jam_mulai   | time                                     |
| jam_selesai | time                                     |
| alasan      | text                                     |
| status      | enum (`pending`, `approved`, `rejected`) |

---

## 🧩 Role & Akses Menu

| Role    | Menu                        |
| ------- | --------------------------- |
| Staf    | Dashboard, Lembur Saya      |
| Leader  | Dashboard, Pengajuan Lembur |
| Manager | Dashboard, Approval Lembur  |
| Admin   | Dashboard, Report Lembur    |

Sidebar ditampilkan **dinamis berdasarkan role user**.

---

## 🧠 Validasi & Business Rule

* `jam_selesai` harus lebih besar dari `jam_mulai`
* Staf tidak bisa mengubah data lembur
* Leader hanya bisa melihat pengajuan miliknya
* Manager hanya bisa approve/reject
* Report hanya bisa diakses Admin / Manager

---

## 🚀 Instalasi & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/wahyuakbarwibowo/laravel-overtime-apps
cd laravel-overtime-apps
```

---

### 2️⃣ Backend Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

---

### 3️⃣ Frontend Setup

```bash
bun install
bun run dev
```

---

### 4️⃣ Jalankan Aplikasi

```bash
php artisan serve
```

---

## 🧪 Dummy Role (Testing)

Saat register, user dapat memilih role:

* staf
* leader
* manager
* admin

> ⚠️ **Catatan:**
> Untuk production, penentuan role admin/manager sebaiknya dibatasi di backend.

---

## 🧠 Arsitektur & Best Practice

* Role-based access control
* Type-safe frontend (TypeScript)
* Centralized sidebar config
* SQL aggregation untuk report (performance-friendly)
* Clean separation antara UI, logic, dan authorization

---

## 🎤 Catatan Presentasi (Interview)

> “Aplikasi ini dirancang untuk mensimulasikan workflow pengajuan lembur dari leader, approval oleh manager, hingga reporting oleh admin, dengan kontrol akses yang jelas di setiap layer.”

---

## 📌 Pengembangan Selanjutnya

* Export report ke Excel
* Chart lembur per staf / division
* Audit log approval
* Pagination & caching report
* Policy-based authorization
