export const calculateBmi = (height: number, weight: number): string => {
  if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi < 16.0) {
      return 'Underweight (Severe thinness)';
    } else if (bmi > 16.0 && bmi < 16.9) {
      return 'Underweight (Modeate thinness)';
    } else if (bmi > 17.0 && bmi < 18.4) {
      return 'Underweight (Mid thinness)';
    } else if (bmi > 18.5 && bmi < 24.9) {
      return 'Normal range';
    } else if (bmi > 25.0 && bmi < 29.9) {
      return 'Overweight (Pre-obese)';
    } else if (bmi > 30.0 && bmi < 34.9) {
      return 'Obese (Class I)';
    } else if (bmi > 35.0 && bmi < 39.9) {
      return 'Obese (Class II)';
    } else {
      return 'Obese (Class III)';
    }
  } else {
    throw new Error('Provided values were not numbers');
  }
};