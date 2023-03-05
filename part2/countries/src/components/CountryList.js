import React from 'react'

const CountryList = ({ countries, handleShow }) => {
  return (
    <ul>
        {countries.map((country, i) => (
            <li key={i}>{country.name.common} <button onClick={() => handleShow(country.name.common)}>show</button></li>
        ))}
    </ul>
  )
}

export default CountryList