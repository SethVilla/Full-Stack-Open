import {createAnecdote} from "../../reducers/anecdoteReducer.js";
import {useDispatch} from 'react-redux';

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const onCreateNote = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(createAnecdote({content}))
    }


    return <><h2>create new</h2>
    <form onSubmit={onCreateNote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
    </form></>
}