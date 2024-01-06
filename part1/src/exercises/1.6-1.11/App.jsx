import { useState } from 'react'
import {Statistics} from "./Statistics.jsx";

export const App = () => {
    // save clicks of each button to its own state
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    })

    const addFeedBack = ({target}) => {
        setFeedback(prevState => ({
            ...prevState,
            [target.name]: ++prevState[target.name]
        }))
    }

    return (
        <>
            <h2>Give Feedback</h2>
            <div style={{display: "flex", gap: "8px"}}>
                <button onClick={(e) => addFeedBack(e)} name="good">good</button>
                <button onClick={(e) => addFeedBack(e)} name="neutral">neutral</button>
                <button onClick={(e) => addFeedBack(e)} name="bad">neutral</button>
            </div>
            <Statistics feedback={feedback}/>
        </>
    )
}