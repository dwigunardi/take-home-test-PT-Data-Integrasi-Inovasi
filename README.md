# Sistem Manajemen Pasien Rawat Inap (Modul Pasien Masuk)

Aplikasi dasbor manajemen pasien berbasis web yang dibangun secara eksklusif sebagai bagian dari *Take Home Test* / Studi Kasus untuk **PT. Data Integrasi Inovasi**. Aplikasi ini berfokus pada performa, validasi data yang ketat, dan pengalaman pengguna (UX) yang mulus untuk skenario Pendaftaran Pasien Masuk.

## 🚀 Teknologi yang Digunakan

* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **Data Validation:** [Zod](https://zod.dev/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## ✨ Fitur Utama & Highlight Arsitektur

* **Simulasi Mock API:** Menggunakan Next.js Route Handlers (`/api/patients`) dengan simulasi *network delay* 500ms untuk meniru lingkungan nyata.
* **Smart Hydration & State Management:** Menggunakan Zustand sebagai *Single Source of Truth*. Data hanya di-*fetch* dari API saat pertama kali dimuat, mencegah re-render dan re-fetch yang tidak perlu saat navigasi antar halaman.
* **Debounced Search:** Pencarian difilter menggunakan sistem penundaan (debounce) 500ms untuk mencegah *UI stuttering* dan meminimalisir beban proses.
* **Dynamic Pagination & Sorting:** Logika *slicing* halaman dilakukan di sisi *client* secara responsif dengan pengurutan data khusus (*localeCompare* untuk string dan penguraian *Timestamp* untuk tanggal).
* **Enterprise-Level Form Validation:** Validasi form menggunakan **Native FormData dikombinasikan dengan Zod schema**. Tidak menggunakan *controlled inputs* (`useState` per field), sehingga form sangat ringan namun tetap memiliki pesan error interaktif.

## 💻 Cara Menjalankan Proyek

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di sistem Anda.

**1. Clone dan Install Dependencies**
\`\`\`bash
npm install
\`\`\`

**2. Rekomendasi Eksekusi (Production Mode)**
Untuk merasakan performa asli aplikasi, transisi *Skeleton Loading* yang mulus, dan *routing* yang optimal, **sangat disarankan** untuk menjalankan aplikasi di mode *production*:
\`\`\`bash
npm run build
npm run start
\`\`\`
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🧪 Panduan Pengujian Khusus (Testing Guide)

Aplikasi ini telah dilengkapi dengan penanganan status antarmuka (UI States) yang komprehensif. Berikut adalah cara untuk menguji skenario tertentu:

**1. Menguji Loading State (Skeleton)**
Aplikasi ini sudah dikonfigurasi dengan *delay* buatan selama 500ms pada setiap interaksi (Pencarian, Paginasi, Urutkan Kolom, dan Simpan Data). Anda cukup melakukan interaksi pada antarmuka untuk melihat animasi *Skeleton Loader* beraksi.

**2. Menguji Empty State (Kondisi Tidak Ada Data)**
Untuk melihat bagaimana aplikasi menangani tampilan ketika tidak ada pasien yang terdaftar di sistem, Anda dapat memanipulasi *Mock API* dengan langkah berikut:
1. Buka file `app/api/patients/route.ts`.
2. Temukan return json `return NextResponse.json({
            status: 200,
            message: "Berhasil mengambil daftar pasien",
            data: staticPatients, // Ubah ini
            meta: {
                total_data: staticPatients.length, // Ubah ini
                current_page: 1,
                total_pages: 1,
                limit: 10
            }
        }, { status: 200 })` di bagian atas.
3. Kosongkan isi *array* tersebut menjadi:
   \`\`\`typescript
   data: []
   total_data: 0
   \`\`\`
4. Simpan file, lalu *refresh* halaman di browser. Tabel akan menampilkan *Empty State UI* yang sudah didesain khusus.

---
*Dikembangkan dengan semangat tinggi oleh Dwi Gunardi Meinaki untuk PT. Data Integrasi Inovasi.*