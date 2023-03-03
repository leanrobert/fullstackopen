import React from 'react'

const PersonForm = ({ submitHandler, nameValue, numberValue, nameChange, numberChange }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>name: <input value={nameValue} onChange={nameChange} /></div>
      <div>number: <input value={numberValue} onChange={numberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm