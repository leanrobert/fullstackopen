import React from 'react'

const Total = ({ sum }) => {
  const total = sum.map(part => part.exercises).reduce((acc, val) => acc + val);

  return(
    <p><b>Number of exercises {total}</b></p>
  )
}

export default Total