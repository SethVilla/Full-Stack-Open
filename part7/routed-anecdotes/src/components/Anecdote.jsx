import {
    useParams
} from 'react-router-dom'
import {useAnecdotes} from "../contexts/anecdotes.jsx";
export const Anecdote = () => {
    const anecdotes = useAnecdotes()
    const id = useParams().id
    const {author, content, info, votes} = anecdotes.find(a => a.id === Number(id))
    return <>
        <h2>{content}</h2>
        <p>{author}</p>
        <p>{info}</p>
        <p>{votes}</p>
    </>
}