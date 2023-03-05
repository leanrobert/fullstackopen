import React from 'react'

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <p style={{ fontWeight: 'bold' }}>languages:</p>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.name.common} width={200} height={200} />
    </div>
  )
}

export default CountryDetail