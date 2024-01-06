export const Statistics = ({feedback}) => {
    const hasFeedback = (feedback.good + feedback.bad + feedback.neutral) !== 0
    const total = feedback.good + feedback.bad + feedback.neutral
    const average = feedback.good - feedback.bad
    return hasFeedback ? <table>
        <tbody>
        <tr>
            <td>Good</td>
            <td>{feedback.good}</td>
        </tr>
        <tr>
            <td>neutral</td>
            <td>{feedback.neutral}</td>
        </tr>
        <tr>
            <td>bad</td>
            <td>{feedback.bad}</td>
        </tr>
        <tr>
            <td>all</td>
            <td>{total}</td>
        </tr>
        <tr>
            <td>average</td>
            <td>{average / total}</td>
        </tr>
        <tr>
            <td>positive</td>
            <td>{feedback.good / total}</td>
        </tr>
        </tbody>
    </table> : <p>No Feedback given</p>
}