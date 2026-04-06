"use client";

import { useEffect } from "react"
import { usePatientStore } from "@/store/usePatientStore"
import { PatientHeader } from "./PatientHeader"
import { PatientDataTable } from "./PatientDataTable"
import { PatientPagination } from "./PatientPagination"
import { GetDataFailed, GetDataSuccess } from "../common/ToastStatus"

export function PatientDashboard() {
    const { allPatients, setInitialData, setIsLoading } = usePatientStore()

    useEffect(() => {
        const abortCotroller: AbortController = new AbortController()

        const fetchPatients = async () => {
            if (allPatients.length === 0) {
                setIsLoading(true)
                try {
                    const response = await fetch('/api/patients', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        signal: abortCotroller.signal
                    })
                    const result = await response.json()
                    setInitialData(result.data)
                    GetDataSuccess()
                    setIsLoading(false)

                } catch (error) {
                    console.log(error)
                    setInitialData([])
                    GetDataFailed()
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
            }
        }

        fetchPatients()

        return () => {
            abortCotroller.abort()
        }

    }, [allPatients.length, setInitialData, setIsLoading])

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <PatientHeader />
            <PatientDataTable />
            <PatientPagination />
        </div>
    )
}