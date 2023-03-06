import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const createPerson = newObj => {
  const request = axios.post(baseUrl, newObj)
  return request.then(res => res.data)
}

const updatePerson = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request.then(res => res.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

export {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
}