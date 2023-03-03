import React from 'react'
import PersonData from './PersonData'

const PersonsList = ({ filteredPersons, deleteHandler }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        <PersonData key={person.id} person={person} deleteHandler={deleteHandler} />
      ))}
    </div>
  )
}

export default PersonsList