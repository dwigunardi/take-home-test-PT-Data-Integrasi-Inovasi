"use client"

import { Patient, usePatientStore } from "@/store/usePatientStore"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "../ui/skeleton"
import { ArrowDown, ArrowUp, ArrowUpDown, FolderX } from "lucide-react"

export function PatientDataTable() {
    const { allPatients, currentPage, limit, search, isLoading, sortConfig, setSort, setIsLoading } = usePatientStore()

    const filteredPatients = allPatients.filter((patient) => {
        const query = search.toLowerCase()
        return (
            patient.nama.toLowerCase().includes(query) || patient.nik.includes(query)
        )
    })

    const handleSort = (key: keyof Patient) => {
        setIsLoading(true)
        setSort(key)
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }

    const sortedData = [...filteredPatients].sort((a, b) => {
        if (!sortConfig.direction || !sortConfig.key) return 0
        const direction = sortConfig.direction === 'asc' ? 1 : -1

        if (sortConfig.key === 'nama') {
            return a.nama.localeCompare(b.nama, 'id', { sensitivity: 'base' }) * direction
        }

        if (sortConfig.key === 'tgl') {
            const dateA = new Date(a.tgl).getTime()
            const dateB = new Date(b.tgl).getTime()

            if (isNaN(dateA) || isNaN(dateB)) return 0

            return (dateA - dateB) * direction
        }

        return 0
    })

    const startIndex = (currentPage - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = sortedData.slice(startIndex, endIndex)

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
        if (sortConfig.key !== columnKey || !sortConfig.direction) {
            return <ArrowUpDown className="ml-2 w-4 h-4 opacity-50" />
        }
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="ml-2 w-4 h-4 text-foreground/50" />
            : <ArrowDown className="ml-2 w-4 h-4 text-foreground/50" />
    }

    const tableHeader = [
        {
            key: 'nama',
            label: 'Nama Pasien',
        },
        {
            key: 'nik',
            label: 'NIK',
        },
        {
            key: 'diagnosa',
            label: 'Diagnosa',
        },
        {
            key: 'tgl',
            label: 'Tanggal Masuk',
        },
        {
            key: 'dokter',
            label: 'Dokter Penanggung Jawab',
        },
        {
            key: 'ruangan',
            label: 'Ruangan',
        },
    ]


    return (
        <div className="border border-border rounded-xl bg-card text-card-foreground shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-primary">
                    <TableRow className="hover:bg-transparent border-transparent">
                        {tableHeader.map((header, index) => (
                            <TableHead
                                key={`header-${header.key + index}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (isLoading) return
                                    if (header.key === 'nama' || header.key === 'tgl') {
                                        return handleSort(header.key)
                                    }
                                    return
                                }}
                                className="font-semibold text-primary-foreground text-[15px] py-4">
                                {header.key === 'nama' || header.key === 'tgl' ? (
                                    <div className="flex flex-row items-center gap-2">
                                        {header.label}
                                        <SortIcon columnKey={header.key} />
                                    </div>
                                ) : header.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: limit }).map((_, index) => (
                            <TableRow key={`skeleton-${index}`} className="border-border hover:bg-transparent">
                                <TableCell className="py-5"><Skeleton className="h-5 w-full bg-muted-foreground/20" /></TableCell>
                                <TableCell className="py-5"><Skeleton className="h-5 w-full bg-muted-foreground/20" /></TableCell>
                                <TableCell className="py-5"><Skeleton className="h-5 w-full bg-muted-foreground/20" /></TableCell>
                                <TableCell className="py-5"><Skeleton className="h-5 w-full bg-muted-foreground/20" /></TableCell>
                                <TableCell className="py-5"><Skeleton className="h-5 w-full bg-muted-foreground/20" /></TableCell>
                                <TableCell className="py-5"><Skeleton className="h-7 w-full rounded-md bg-muted-foreground/20" /></TableCell>
                            </TableRow>
                        ))
                    ) : paginatedData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                                <div className="flex flex-col justify-center items-center gap-4">
                                    <FolderX className="w-20 h-20 text-primary" />
                                    <p className="text-2xl">Tidak Ada Data Pasien</p>
                                    <p className="text-muted-foreground">Silahkan tambahkan data pasien</p>

                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedData.map((patient) => {
                            return (
                                <TableRow
                                    key={patient.id}
                                    className="even:bg-muted/30 hover:bg-muted/60 transition-colors border-border group"
                                >
                                    <TableCell className="font-medium text-foreground text-[15px] py-4">
                                        {patient.nama}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-[14px] font-mono tracking-tight py-4">
                                        {patient.nik}
                                    </TableCell>
                                    <TableCell className="text-foreground text-[15px] py-4">
                                        {patient.diagnosa}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-[14px] py-4">
                                        {patient.tgl}
                                    </TableCell>
                                    <TableCell className="text-foreground text-[15px] py-4">
                                        {patient.dokter}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-[13px] font-semibold text-primary ring-1 ring-inset ring-primary/20">
                                            {patient.ruangan}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div >
    )
}