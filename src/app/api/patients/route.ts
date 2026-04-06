import { NextResponse } from 'next/server'
import fakeData from '@/constan/pasien_data.json'

const staticPatients = [
    { id: 1, nama: "Budi Santoso", nik: "3201012345670001", diagnosa: "Demam Berdarah", tgl: "2026-03-20", dokter: "dr. Andi Wijaya, Sp.PD", ruangan: "Melati 101" },
    { id: 2, nama: "Siti Aminah", nik: "3201019876540002", diagnosa: "Hipertensi", tgl: "2026-03-21", dokter: "dr. Shinta Kurnia, Sp.A", ruangan: "Mawar 202" },
    { id: 3, nama: "Dwi Gunardi", nik: "3201015544330003", diagnosa: "Gastritis Akut", tgl: "2026-03-22", dokter: "dr. Bambang Heru, Sp.PD", ruangan: "Anggrek 303" },
    { id: 4, nama: "Eko Prasetyo", nik: "3201014455660004", diagnosa: "Typus", tgl: "2026-03-23", dokter: "dr. Andi Wijaya, Sp.PD", ruangan: "Melati 102" },
    { id: 5, nama: "Siti Nurhayati", nik: "3201012233440005", diagnosa: "Diabetes Mellitus", tgl: "2026-03-24", dokter: "dr. Shinta Kurnia, Sp.A", ruangan: "Mawar 203" },
    { id: 6, nama: "Rudi Suhartono", nik: "3201011122330006", diagnosa: "Alergi", tgl: "2026-03-25", dokter: "dr. Bambang Heru, Sp.PD", ruangan: "Anggrek 304" },
    { id: 7, nama: "Siti Nurhayati", nik: "3201012233440005", diagnosa: "Diabetes Mellitus", tgl: "2026-03-24", dokter: "dr. Shinta Kurnia, Sp.A", ruangan: "Mawar 203" },
    { id: 8, nama: "Rudi Suhartono", nik: "3201011122330006", diagnosa: "Alergi", tgl: "2026-03-25", dokter: "dr. Bambang Heru, Sp.PD", ruangan: "Anggrek 304" },
    { id: 9, nama: "Siti Nurhayati", nik: "3201012233440005", diagnosa: "Diabetes Mellitus", tgl: "2026-03-24", dokter: "dr. Shinta Kurnia, Sp.A", ruangan: "Mawar 203" },
]

export async function GET() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return NextResponse.json({
            status: 200,
            message: "Berhasil mengambil daftar pasien",
            data: staticPatients,
            meta: {
                total_data: staticPatients.length,
                current_page: 1,
                total_pages: 1,
                limit: 10
            }
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Terjadi kesalahan internal pada server saat mengambil data.",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}