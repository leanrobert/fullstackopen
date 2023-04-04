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

interface SickLeave {
	startDate: string;
	endDate: string;
}

interface Discharge {
	date: string;
	criteria: string;
}

interface BaseEntry {
	id: string,
	description: string,
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
	healthCheckRating?: HealthCheckRating;
	discharge?: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	employerName: string;
	type: "OccupationalHealthcare";
	sickLeave?: SickLeave;
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