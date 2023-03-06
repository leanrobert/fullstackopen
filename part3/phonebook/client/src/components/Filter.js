import React from 'react'

const Filter = ({ search, onChange }) => {
  return (
    <div>
      <p>filter shown with <input value={search} onChange={onChange} /></p>
    </div>
  )
}

export default Filter