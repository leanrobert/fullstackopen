export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export interface Diagnose {
	code: string,
	name: string,
	latin?: string
}

interface BaseEntry {
	id: string,
	descriptiion: string,
	date: string,
	specialist: string,
	diagnosisCodes?: Array<Diagnose['code']>
}

export enum HealthCheckRating {
	"Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	healthCheckRating: HealthCheckRating;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export interface Patient {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: Gender,
	occupation: string,
	entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;