import { useState, useEffect } from 'react'

import { getAll, createPerson, updatePerson, deletePerson } from './services/phonebook'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getAll().then(data => setPersons(data))
  }, [])


  const handleSubmit = e => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.filter(person => person.name === newPerson.name).length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, update phone?`)) {
        const person = persons.find(p => p.name === newPerson.name)
        updatePerson(person.id, newPerson)
          .then(returnedPerson => setPersons(persons.map(per => per.id !== person.id ? per : returnedPerson )))
          .catch(error => {
            setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
            setSuccess(false)
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000)
          })
      }

    } else {
      createPerson(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setErrorMessage(`Added ${newPerson.name}`);
          setSuccess(true)
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000)
        })
        .catch(error => {
          console.log(error);
          setErrorMessage(`${error.response.data.error}`)
          setSuccess(false)
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = id => {
    deletePerson(id).then(data => getAll().then(data => setPersons(data)))
  }

  const filteredPersons = search === '' ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} success={success} />
      <Filter search={search} onChange={(e) => setSearch(e.target.value)} />

      <h2>add a new</h2>
      <PersonForm
        submitHandler={handleSubmit}
        nameValue={newName}
        numberValue={newNumber}
        nameChange={(e) => setNewName(e.target.value)}
        numberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <PersonsList filteredPersons={filteredPersons} deleteHandler={handleDelete} />
    </div>
  )
}

export default App