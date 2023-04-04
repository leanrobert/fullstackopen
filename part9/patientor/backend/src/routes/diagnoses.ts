import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(diagnoseService.getDiagnoses());
});

router.get('/:code', (req, res) => {
	const code: string = req.params.code;
	res.send(diagnoseService.getSingleDiagnose(code));
});

export default router;