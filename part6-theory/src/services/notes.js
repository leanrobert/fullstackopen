import axios from 'axios'

const baseUrl = 'http://localhost:3003/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const makeImportant = async id => {
  const note = await axios.get(`${baseUrl}/${id}`)
  const newNote = {
    content: note.data.content,
    id: note.data.id,
    important: !note.data.important
  }
  await axios.put(`${baseUrl}/${id}`, newNote)
}

export default { getAll, createNew, makeImportant }