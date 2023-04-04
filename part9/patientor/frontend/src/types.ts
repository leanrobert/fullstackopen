export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface SickLeave {
	startDate: string;
	endDate: string;
}

interface Discharge {
	date: string;
	criteria: string;
}

export interface Diagnose {
	code: string,
	name: string,
	latin?: string
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

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;