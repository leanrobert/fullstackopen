interface CalculateValues {
  value1: number;
  value2: number;
}

const parseArgs = (args: string[]): CalculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 16.0) {
    console.log('Underweight (Severe thinness)');
  } else if (bmi > 16.0 && bmi < 16.9) {
    console.log('Underweight (Modeate thinness)');
  } else if (bmi > 17.0 && bmi < 18.4) {
    console.log('Underweight (Mid thinness)');
  } else if (bmi > 18.5 && bmi < 24.9) {
    console.log('Normal range');
  } else if (bmi > 25.0 && bmi < 29.9) {
    console.log('Overweight (Pre-obese)');
  } else if (bmi > 30.0 && bmi < 34.9) {
    console.log('Obese (Class I)');
  } else if (bmi > 35.0 && bmi < 39.9) {
    console.log('Obese (Class II)');
  } else {
    console.log('Obese (Class III)');
  }
}

try {
  const { value1, value2 } = parseArgs(process.argv)
  calculateBmi(value1, value2)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage);
}
