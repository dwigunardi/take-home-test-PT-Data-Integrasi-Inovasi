import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import TambahPasienForm from "@/components/patients/AddPatientForm"

export default function TambahPasien() {
    return (
        <main className="w-full min-h-screen bg-background p-6 md:p-10 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex flex-col gap-4 border-b border-border pb-6">
                    <Link
                        href="/daftar-pasien"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors w-fit"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Kembali ke Daftar Pasien
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tambah Pasien Baru</h1>
                        <p className="text-base text-muted-foreground mt-1">
                            Masukkan data rekam medis pasien rawat inap yang baru.
                        </p>
                    </div>
                </div>
                <TambahPasienForm />
            </div>
        </main>
    )
}