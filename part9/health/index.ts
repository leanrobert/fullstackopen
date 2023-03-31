import express = require('express');
import { calculateBmi } from './bmiCalculator';
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  try {
    const bmi = calculateBmi(Number(height), Number(weight))
    res.send({
      weight,
      height,
      bmi
    });

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.json({error: errorMessage});
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})