"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePatientStore } from "@/store/usePatientStore";
import { generatePagination } from "@/lib/utils";


export function PatientPagination() {
    const { allPatients, search, currentPage, limit, isLoading, setPage, setLimit, setIsLoading } = usePatientStore()
    const countPatient = allPatients.filter((patient) => {
        const query = search.toLowerCase()
        return patient.nama.toLowerCase().includes(query) || patient.nik.includes(query)
    }).length

    const totalPages = Math.ceil(countPatient / limit) || 1
    const from = countPatient === 0 ? 0 : (currentPage - 1) * limit + 1
    const to = currentPage * limit

    const handleChangePage = (callback: () => void) => {
        if (isLoading) return
        setIsLoading(true)
        callback()
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2 pt-6 pb-2">
            <div className="text-sm text-muted-foreground w-full md:w-auto text-center md:text-left">
                Menampilkan <span className="font-semibold text-foreground">{from}</span>
                sampai <span className="font-semibold text-foreground">{to}</span> dari
                <span className="font-semibold text-foreground">{countPatient}</span> data
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-end">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Limit</span>
                    <Select value={limit.toString()} onValueChange={(value) => handleChangePage(() => setLimit(Number(value)))}>
                        <SelectTrigger className="w-16 h-8 text-sm font-medium bg-background border-border">
                            <SelectValue placeholder={limit.toString()} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 border-border text-muted-foreground hover:text-foreground cursor-pointer"
                        disabled={currentPage === 1}
                        onClick={() => handleChangePage(() => setPage(currentPage - 1))}>
                        <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        <span className="sr-only">Sebelumnya</span>
                    </Button>
                    {generatePagination(currentPage, totalPages).map((page, index) => (
                        <Button
                            key={index}
                            variant={page === currentPage ? "default" : "outline"}
                            size="icon"
                            className="w-8 h-8 text-sm font-medium border-border text-muted-foreground hover:text-foreground"
                            onClick={() => page === currentPage ? null : handleChangePage(() => setPage(page as number))}>
                            {page}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 border-border text-muted-foreground hover:text-foreground cursor-pointer"
                        disabled={currentPage === totalPages}
                        onClick={() => handleChangePage(() => setPage(currentPage + 1))} aria-label="Selanjutnya">
                        <ChevronRight className="w-4 h-4" />
                        <span className="sr-only">Selanjutnya</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}