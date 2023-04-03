import { CoursePart } from "../App"

interface PartProps {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part = ({ course }: PartProps) => {
  switch(course.kind) {
    case "basic":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
        </div>
      )
    case "background":
      return(
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
          <p>submit to {course.backgroundMaterial}</p>
        </div>
      )
    case "group":
      return(
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      )
    case "special":
      return(
        <div>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
          <p>required skills: {course.requirements.join(", ")}</p>
        </div>
      )
    default:
      return assertNever(course);
  }
}

export default Part