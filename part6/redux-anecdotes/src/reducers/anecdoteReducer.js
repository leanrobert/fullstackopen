import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnec(state, action) {
      const id = action.payload.id
      return state.map(note => note.id !== id ? note : action.payload)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { setAnecdotes, appendAnecdote, voteAnec } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content =>  {
  return async dispatch => {
    const note = await anecdoteService.create(content)
    dispatch(appendAnecdote(note))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const anec = await anecdoteService.vote(changedAnecdote)
    console.log(anec);
    dispatch(voteAnec(anec))
  }
}

export default anecdoteSlice.reducer