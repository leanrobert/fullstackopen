import React from 'react'
import PersonData from './PersonData'

const PersonsList = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        <PersonData key={person.id} person={person} />
      ))}
    </div>
  )
}

export default PersonsList