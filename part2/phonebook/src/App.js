import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with <input value={search} onChange={(e) => setSearch(e.target.value)} /></p>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App