import axios from 'axios'

const baseUrl = 'http://localhost:3004/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async content => {
  const anecdote = { content, votes: 0}
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const vote = async anecdote => {
  const newAnec = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return newAnec.data
}

export default { getAll, create, vote }