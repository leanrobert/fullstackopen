import { useState, useEffect } from 'react'

import { getAll, createPerson, deletePerson } from './services/phonebook'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAll().then(data => setPersons(data))
  }, [])


  const handleSubmit = e => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if(persons.filter(person => person.name === newPerson.name).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      createPerson(newPerson).then(data => setPersons(persons.concat(data)))
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