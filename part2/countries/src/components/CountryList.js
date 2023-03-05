import React from 'react'

const CountryList = ({ countries }) => {
  return (
    <ul>
        {countries.map((country, i) => (
            <li key={i}>{country.name.common}</li>
        ))}
    </ul>
  )
}

export default CountryList