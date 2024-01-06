import {Part} from "./Part.jsx";

export const Content = ({content}) =>
    <>
        <Part {...content[0]}/>
        <Part {...content[1]}/>
        <Part {...content[2]}/>
    </>