import { z } from "zod";

export const patientSchema = z.object({
    nama: z.string().min(3, "Nama pasien wajib diisi minimal 3 karakter"),
    nik: z.string().length(16, "NIK harus tepat 16 digit").regex(/^\d+$/, "NIK hanya boleh berisi angka"),
    diagnosa: z.string().min(5, "Diagnosa awal wajib diisi minimal 5 karakter"),
    tgl: z.string().min(1, "Tanggal masuk wajib dipilih"),
    dokter: z.string().min(1, "Dokter wajib dipilih"),
    ruangan: z.string().min(1, "Ruangan wajib diisi"),
});

export type PatientFormData = z.infer<typeof patientSchema>;