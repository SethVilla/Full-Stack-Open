import {Part} from "./Part.jsx";

export const Content = ({content}) =>
    <>
        {content.map((content) => <Part key={content.id} {...content}/>)}
    </>