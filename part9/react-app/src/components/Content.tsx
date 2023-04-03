import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </div>
  )
}

export default Content