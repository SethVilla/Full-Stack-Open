import {useAnecdotesDispatch} from "../contexts/anecdotes.jsx";
import { useNavigate } from "react-router-dom";
import {useNotificationDispatch} from "../contexts/notification.jsx";
import {useField} from "../hooks/index.js";

export const CreateNew = () => {
    const anecdoteDispatch = useAnecdotesDispatch()
    const notificationDispatch = useNotificationDispatch()
    const navigate = useNavigate()
    const content = useField({id: "content",type: 'text', name: 'content'})
    const author = useField({id: "author",type: 'text', name: 'author'})
    const info = useField({id: "info",type: 'text', name: 'info'})

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        anecdoteDispatch({type: "CREATE_NEW", payload: anecdote})
        notificationDispatch({type: "notify", payload: {message: `added ${anecdote.content}`, type: 'success'}})
        setTimeout(() => notificationDispatch({type: 'reset'}), 5000)
        navigate("/")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
    }

    const handleReset = () => {
        content.onReset()
        author.onReset()
        info.onReset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type="submit">create</button>
                <button type="reset">reset</button>
            </form>
        </div>
    )

}