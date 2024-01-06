import {Header} from "./Header.jsx";
import {Content} from "./Content.jsx";
import {Total} from "./Total.jsx";

export const Course = ({course}) => {
    const total = course.parts.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.exercises
    }, 0)
    return <div>
        <Header course={course.name}/>
        <Content content={course.parts}/>
        <Total total={total}/>
    </div>
}