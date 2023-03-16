import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { getAnecdotes, voteAnecdote } from './request'

const App = () => {
  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation(voteAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const finalAnec = anecdotes.map(a => a.id !== newAnecdote.id ? a : newAnecdote)
      queryClient.setQueryData('anecdotes', finalAnec)
    }
  })

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 })

  if(result.isError) {
    return <div>anecdote server not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map(anecdote =>
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
