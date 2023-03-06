import React from 'react'

const PersonData = ({ person, deleteHandler }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deleteHandler(person.id)}>delete</button>
    </div>
  )
}

export default PersonData