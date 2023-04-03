import { CourseListProps } from '../App'

const Total = ({ courses } : CourseListProps) => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total