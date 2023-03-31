interface ArgsFormat {
  days: number[];
  target: number;
}

const parseArguments = (args: string[]): ArgsFormat => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args.splice(0, 2);

  const values = args.map(arg => {
    if (isNaN(Number(arg))) {
      throw new Error('Provided values were not numbers');
    }

    return Number(arg);
  });

  return {
    target: values[-1],
    days: values
  };
};

const calculateExercises = (days : number[], target: number) => {
  const average = days.reduce((partial, a) => partial + a, 0) / days.length;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if(average / target < 0.50) {
    rating = 1;
    ratingDescription = 'Very bad';
  } else if (average / target < 0.97) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'Excelent work!';
  }

  console.log({
    periodLength: days.length,
    trainingDays: days.filter(val => val !== 0).length,
    target,
    average,
    success: target === average,
    rating,
    ratingDescription
  });
};

try {
  const { days, target } = parseArguments(process.argv);
  calculateExercises(days, target);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
