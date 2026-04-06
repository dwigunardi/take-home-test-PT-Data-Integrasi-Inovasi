import { create } from 'zustand';

export type Patient = {
    id: number;
    nama: string;
    nik: string;
    diagnosa: string;
    tgl: string;
    dokter: string;
    ruangan: string;
}

export type SortOrder = 'asc' | 'desc' | null;

interface PatientStore {
    allPatients: Patient[];
    search: string;
    currentPage: number;
    limit: number;
    isLoading: boolean;
    setInitialData: (data: Patient[]) => void;
    setSearch: (query: string) => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    sortConfig: { key: keyof Patient; direction: SortOrder };
    setSort: (key: keyof Patient) => void;
    setIsLoading: (status: boolean) => void;
    addPatient: (newPatient: Patient) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
    allPatients: [],
    search: "",
    currentPage: 1,
    limit: 5,
    isLoading: true,
    setInitialData: (data) => set((state) => ({ allPatients: [...state.allPatients, ...data], isLoading: false })),
    setSearch: (query) => set({ search: query, currentPage: 1, isLoading: true }),
    setPage: (page) => set({ currentPage: page, isLoading: true }),
    setLimit: (limit) => set({ limit: limit, currentPage: 1, isLoading: true }),
    sortConfig: { key: 'nama', direction: null },
    setSort: (key) => set((state) => ({
        currentPage: 1,
        isLoading: true,
        sortConfig: {
            key,
            direction: state.sortConfig.key !== key ? 'asc'
                : state.sortConfig.direction === 'asc' ? 'desc'
                    : state.sortConfig.direction === 'desc' ? null
                        : 'asc'
        }
    })),
    setIsLoading: (status) => set({ isLoading: status }),
    addPatient: (newPatient) => set((state) => ({
        allPatients: [newPatient, ...state.allPatients],
        currentPage: 1
    })),
}))