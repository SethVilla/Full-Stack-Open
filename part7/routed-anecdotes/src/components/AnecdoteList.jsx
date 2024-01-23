import {useAnecdotes} from "../contexts/anecdotes.jsx";
import {Link} from 'react-router-dom'
export const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes?.map(anecdote =>
                    <li key={anecdote.id} >
                        <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
                    </li>)}
            </ul>
        </div>
    )
}