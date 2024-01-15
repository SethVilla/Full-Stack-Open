import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createNewAnecdote} from "../services/services.js";
import {useNotificationDispatch} from "../contexts/notification.jsx";


const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()
    const newAnecdote = useMutation({ mutationFn: createNewAnecdote,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            notificationDispatch({type: "notify", payload: {message: `added ${data.content}`, type: 'success'}})
            setTimeout(() => notificationDispatch({type: 'reset'}), 5000)
        },
        onError: (err) => {
            console.log(err)
            notificationDispatch({type: "notify", payload: {message: `error ${err.response.data.error}`, type: 'error'}})
            setTimeout(() => notificationDispatch({type: 'reset'}), 5000)
        }
    })


    const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdote.mutate({content},
        )
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
