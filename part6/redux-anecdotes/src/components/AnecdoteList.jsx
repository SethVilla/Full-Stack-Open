import {useDispatch, useSelector} from "react-redux";
import {sortAnecdotes, voteAnecdote} from "../reducers/anecdoteReducer.js";
import {startNotification} from "../reducers/notificationReducer.js";
import {useMemo} from "react";

export const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {

        if (!filter || !filter.trim()) {
            return anecdotes
        }

        return sortAnecdotes(anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
    })

    const memoizedAnecdotes = useMemo(() => sortAnecdotes(anecdotes), [anecdotes]);

    const dispatch = useDispatch()

    const onVote = ({id, content, votes}) => {
        dispatch(voteAnecdote({id, content, votes: votes + 1}))
        dispatch(startNotification({
            notification: {
                type: 'success',
                message: `you voted for ${content}`
            },
            timer: 5000
        }
        ))
    }

    return <>
    {memoizedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => onVote(anecdote)}>vote</button>
            </div>
        </div>
    )}</>
}