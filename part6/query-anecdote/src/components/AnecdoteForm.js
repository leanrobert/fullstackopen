import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationConext'
import { createAnecdote } from '../request'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({ type: 'NOTIFY', payload: `anecdote ${newAnecdote.content} created!` })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 3000)
    },
    onError: (error) => {
      dispatch({ type: 'NOTIFY', payload: `too short anecdote, must have length 5 or more` })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 3000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, vote: 0})
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
