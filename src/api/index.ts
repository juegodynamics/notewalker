import {mockPatients} from 'data/patients';
import {Patient, Note} from '../types';
import {mockNotes} from 'data/notes';

export interface FetchPatientsParams {
    ageRange?: [number, number];
    gender?: string;
    nameSearch?: string;
}

export const fetchPatients = async (
    params: FetchPatientsParams
): Promise<Patient[]> => {
    // Replace with actual API call
    let filteredPatients = mockPatients;

    if (params.gender) {
        filteredPatients = filteredPatients.filter(
            (patient) => patient.gender === params.gender
        );
    }

    if (params.nameSearch) {
        const searchLower = params.nameSearch.toLowerCase();
        filteredPatients = filteredPatients.filter((patient) =>
            patient.name.toLowerCase().includes(searchLower)
        );
    }

    if (params.ageRange) {
        const [minAge, maxAge] = params.ageRange;
        const currentYear = new Date().getFullYear();
        filteredPatients = filteredPatients.filter((patient) => {
            const birthYear = new Date(patient.date_of_birth).getFullYear();
            const age = currentYear - birthYear;
            return age >= minAge && age <= maxAge;
        });
    }

    return filteredPatients;
};

export interface FetchNotesParams {
    patientId?: number;
    textSearch?: string;
    page?: number;
    limit?: number;
}

export const fetchNotes = async (params: FetchNotesParams): Promise<Note[]> => {
    const allNotes: Note[] = mockNotes;

    let filteredNotes = allNotes;

    if (params.patientId !== undefined) {
        filteredNotes = filteredNotes.filter(
            (note) => note.patient_id === params.patientId
        );
    }

    if (params.textSearch) {
        const searchLower = params.textSearch.toLowerCase();
        filteredNotes = filteredNotes.filter(
            (note) =>
                note.text.toLowerCase().includes(searchLower) ||
                note.provider_name.toLowerCase().includes(searchLower) ||
                note.hospital_name.toLowerCase().includes(searchLower)
        );
    }

    const start = (params.page ?? 0) * (params.limit ?? 10);
    const end = start + (params.limit ?? 10);

    return filteredNotes.slice(start, end);
};
