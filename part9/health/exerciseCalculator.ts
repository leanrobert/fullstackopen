interface TargetExercise {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const calculateExercises = (days : number[], target: number): TargetExercise => {
  const average = days.reduce((partial, a) => partial + a, 0) / days.length
  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if(average / target < 0.50) {
    rating = 1
    ratingDescription = 'Very bad'
  } else if (average / target < 0.97) {
    rating = 2
    ratingDescription = 'Not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'Excelent work!'
  }

  return {
    periodLength: days.length,
    trainingDays: days.filter(val => val !== 0).length,
    target,
    average,
    success: target === average,
    rating,
    ratingDescription
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
