import { toast } from "sonner"

export const GetDataSuccess = () => toast.success("Data pasien berhasil dimuat", {
    description: "Daftar pasien rawat inap terbaru sudah tersinkronisasi.",
    duration: 3000,
    closeButton: true
})

export const GetDataFailed = () => toast.error("Gagal Memuat Data", {
    description: "Silakan periksa koneksi internet Anda atau coba lagi nanti.",
    duration: 5000,
    closeButton: true
})

export const GetDataFailedWithMessage = (message: string) => toast.error("Gagal Memuat Data", {
    description: message,
    duration: 5000,
    closeButton: true
})

export const PostDataSuccess = () => toast.success("Pasien berhasil ditambahkan", {
    description: "Data pasien sudah ditambahkan dan tersinkronisasi.",
    duration: 3000,
    closeButton: true
})

export const PostDataFailed = () => toast.error("Gagal Menambahkan Pasien", {
    description: "Silakan periksa koneksi internet Anda atau coba lagi nanti.",
    duration: 5000,
    closeButton: true
})

export const PostDataFailedWithMessage = (message: string) => toast.error("Gagal Menambahkan Pasien", {
    description: message,
    duration: 5000,
    closeButton: true
})

export const DeleteDataSuccess = () => toast.success("Pasien berhasil dihapus", {
    description: "Data pasien sudah tersinkronisasi.",
    duration: 3000,
    closeButton: true
})

export const DeleteDataFailed = () => toast.error("Gagal Menghapus Pasien", {
    description: "Silakan periksa koneksi internet Anda atau coba lagi nanti.",
    duration: 5000,
    closeButton: true
})
