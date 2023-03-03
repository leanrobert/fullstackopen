import React from 'react'

const PersonData = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

export default PersonData