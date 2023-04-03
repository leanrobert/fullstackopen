import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = () => {
	return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const getSinglePatient = (id: string): Patient | undefined => {
	return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const id: string = uuid();

	const newPatientEntry = {
		id,
		...entry
	};
	patients.push(newPatientEntry);

	return newPatientEntry;
};

export default {
	getPatients,
	getNonSensitiveEntries,
	addPatient,
	getSinglePatient
};