import { CourseListProps } from "../App"

const Content = ({ courses } : CourseListProps) => {
  return (
    <div>
      {courses.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content