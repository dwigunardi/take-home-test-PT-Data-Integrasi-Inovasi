import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <main className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
            <div className="flex flex-col items-center text-center max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 ring-8 ring-primary/5">
                    <FileQuestion className="w-12 h-12" />
                </div>
                <h1 className="text-6xl font-bold tracking-tight text-foreground">404</h1>
                <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-[15px] text-muted-foreground pt-2 pb-6 leading-relaxed">
                    Maaf, Bro halaman yang Anda cari tidak dapat ditemukan.
                </p>
                <Link href="/daftar-pasien">
                    <Button size="lg" className="text-[15px] font-medium shadow-sm">
                        Kembali ke Daftar Pasien
                    </Button>
                </Link>
            </div>
        </main>
    )
}