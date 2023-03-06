import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_APIKEY}`)
        .then(res => {
          setWeather(res.data)
          console.log(res.data);
        })
  }, [country.latlng])

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

      <h2>Wheather in {country.name.common}</h2>
      <p>temperature {weather?.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather icon" />
      <p>wind {weather?.wind.speed} m/s</p>
    </div>
  )
}

export default CountryDetail