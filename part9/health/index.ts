import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight,
      height,
      bmi
    });

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.json({error: errorMessage});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const days = parseArguments(dailyExercises);

  try {
    const result = calculateExercises(days, Number(target));
    return res.json(result);

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});