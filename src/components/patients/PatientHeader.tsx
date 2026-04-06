"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import Link from "next/link"
import { usePatientStore } from "@/store/usePatientStore"
import { useEffect, useState } from "react"

export function PatientHeader() {
    const { search, setSearch, setIsLoading } = usePatientStore()
    const [searchQuery, setSearchQuery] = useState(search)

    useEffect(() => {
        const bounchedValue = setTimeout(() => {
            if (searchQuery !== search) {
                setSearch(searchQuery)
                // simulasi loading
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            }
        }, 500)
        return () => clearTimeout(bounchedValue)
    }, [searchQuery, search, setSearch, setIsLoading])

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Daftar Pasien Aktif</h1>
                <p className="text-base text-muted-foreground mt-1">
                    Kelola data pasien rawat inap rumah sakit.
                </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama atau NIK..."
                    className="w-full md:w-[320px] bg-card text-[15px] py-5"
                />
                <Link href="/tambah-pasien">
                    <Button size="lg" className="text-[15px] font-medium cursor-pointer">
                        + Pasien Baru
                    </Button>
                </Link>
                <ThemeToggle />
            </div>
        </div>
    )
}