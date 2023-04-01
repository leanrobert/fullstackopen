import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnoses = () => {
	return diagnoses;
};

export default {
	getDiagnoses
};