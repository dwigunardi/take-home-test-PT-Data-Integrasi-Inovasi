"use client"

import Link from "next/link"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { usePatientStore } from "@/store/usePatientStore"
import { useState } from "react"
import { PostDataSuccess } from "@/components/common/ToastStatus"
import { patientSchema } from "@/schema/patient-schema"
import { cn } from "@/lib/utils"
import { z } from "zod"

export default function TambahPasienForm() {
    const router = useRouter()
    const { addPatient } = usePatientStore()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const result = patientSchema.safeParse(rawData);

        if (!result.success) {
            const fieldErrors = z.flattenError(result.error).fieldErrors
            const formattedErrors: Record<string, string> = {};

            for (const [key, messages] of Object.entries(fieldErrors)) {
                if (messages && messages.length > 0) {
                    formattedErrors[key] = messages[0];
                }
            }

            setErrors(formattedErrors);
            setIsSubmitting(false);
            return;
        }

        const validData = result.data;

        setTimeout(() => {
            addPatient({
                id: Date.now(),
                ...validData,
            });

            PostDataSuccess()
            router.push("/daftar-pasien");
        }, 500);
    };

    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <div className="border border-border rounded-xl bg-card text-card-foreground shadow-sm overflow-hidden">
            <form className="p-6 md:p-8 space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                        <Label htmlFor="nama" className="text-[14px] text-foreground font-medium">
                            Nama Lengkap <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="nama"
                            name="nama"
                            placeholder="Masukkan nama lengkap pasien"
                            className={cn("bg-background text-[15px] py-5", errors.nama && "border-destructive focus-visible:ring-destructive")}
                            onChange={() => clearError("nama")}
                        />
                        {errors.nama && <p className="text-sm text-destructive font-medium">{errors.nama}</p>}
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="nik" className="text-[14px] text-foreground font-medium">
                            Nomor Induk Kependudukan (NIK) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="nik"
                            name="nik"
                            type="text"
                            maxLength={16}
                            placeholder="Masukkan 16 digit NIK"
                            className={cn("bg-background text-[15px] py-5 font-mono tracking-tight", errors.nik && "border-destructive focus-visible:ring-destructive")}
                            onChange={() => clearError("nik")}
                        />
                        {errors.nik ? (
                            <p className="text-sm text-destructive font-medium">{errors.nik}</p>
                        ) : (
                            <p className="text-[12px] text-muted-foreground">Pastikan NIK berjumlah tepat 16 angka.</p>
                        )}
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="tanggal_masuk" className="text-[14px] text-foreground font-medium">
                            Tanggal Masuk <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="tanggal_masuk"
                            name="tgl"
                            type="date"
                            className={cn("bg-background text-[15px] h-10.5 w-full", errors.tgl && "border-destructive focus-visible:ring-destructive")}
                            onChange={() => clearError("tgl")}
                        />
                        {errors.tgl && <p className="text-sm text-destructive font-medium">{errors.tgl}</p>}
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="dokter" className="text-[14px] text-foreground font-medium">
                            Dokter Penanggung Jawab <span className="text-destructive">*</span>
                        </Label>
                        <Select name="dokter" onValueChange={() => clearError("dokter")}>
                            <SelectTrigger id="dokter" className={cn("bg-background text-[15px] h-10.5 w-full py-5", errors.dokter && "border-destructive focus-visible:ring-destructive")}>
                                <SelectValue placeholder="Pilih dokter..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dr. Andi Wijaya, Sp.PD">dr. Andi Wijaya, Sp.PD</SelectItem>
                                <SelectItem value="dr. Shinta Kurnia, Sp.A">dr. Shinta Kurnia, Sp.A</SelectItem>
                                <SelectItem value="dr. Bambang Heru, Sp.B">dr. Bambang Heru, Sp.B</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.dokter && <p className="text-sm text-destructive font-medium">{errors.dokter}</p>}
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="ruangan" className="text-[14px] text-foreground font-medium w-full">
                            Penempatan Ruangan <span className="text-destructive">*</span>
                        </Label>
                        <Select name="ruangan" onValueChange={() => clearError("ruangan")}>
                            <SelectTrigger id="ruangan" className={cn("bg-background text-[15px] py-5 w-full", errors.ruangan && "border-destructive focus-visible:ring-destructive")}>
                                <SelectValue placeholder="Pilih ruangan inap..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Melati 101">Melati 101 (Kelas I)</SelectItem>
                                <SelectItem value="Mawar 202">Mawar 202 (VIP)</SelectItem>
                                <SelectItem value="Anggrek 303">Anggrek 303 (Kelas II)</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.ruangan && <p className="text-sm text-destructive font-medium">{errors.ruangan}</p>}
                    </div>
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="diagnosa" className="text-[14px] text-foreground font-medium">
                        Diagnosa Masuk / Keluhan Utama <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                        id="diagnosa"
                        name="diagnosa"
                        placeholder="Tuliskan diagnosa atau keluhan pasien saat masuk..."
                        className={cn("bg-background text-[15px] min-h-25 resize-y", errors.diagnosa && "border-destructive focus-visible:ring-destructive")}
                        onChange={() => clearError("diagnosa")}
                    />
                    {errors.diagnosa && <p className="text-sm text-destructive font-medium">{errors.diagnosa}</p>}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                    <Link href="/daftar-pasien">
                        <Button variant="outline" type="button" className="text-[15px] font-medium py-5">
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" className="text-[15px] font-medium flex items-center gap-2 py-5" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {isSubmitting ? "Menyimpan..." : "Tambah Pasien"}
                    </Button>
                </div>
            </form>
        </div>
    )
}