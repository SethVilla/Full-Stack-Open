import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {addVoteById, createNewAnecdote, getAll} from "./services/services.js";
import {useNotificationDispatch} from "./contexts/notification.jsx";

const App = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const voteMutation = useMutation({ mutationFn: addVoteById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({type: "notify", payload: {message: `voted for ${data.content}`, type: 'success'}})
      setTimeout(() => notificationDispatch({type: 'reset'}), 5000)
    }
  })

  const {data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () =>  await getAll(),
    refetchOnWindowFocus: false,
    retry: 1
  })
  // console.log(JSON.parse(JSON.stringify(data)))

  if (isLoading ) {
    return <div>loading data...</div>
  }

  if (isError ) {
    return <div>error page</div>
  }



  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
