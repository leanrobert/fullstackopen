import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = e => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addNote}>
      <div><input name='note' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm