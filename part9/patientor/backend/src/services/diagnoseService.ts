import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnoses = () => {
	return diagnoses;
};

const getSingleDiagnose = (code: string) => {
	return diagnoses.find(diagnose => diagnose.code === code);
};

export default {
	getDiagnoses,
	getSingleDiagnose
};