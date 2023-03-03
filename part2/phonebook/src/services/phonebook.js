import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const createPerson = newObj => {
  const request = axios.post(baseUrl, newObj)
  return request.then(res => res.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

export {
  getAll,
  createPerson,
  deletePerson
}