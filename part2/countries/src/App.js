import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  const filterCountries = search === '' 
      ? countries 
      : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  
  return (
    <div>
      <p>find countries <input value={search} onChange={e => setSearch(e.target.value)} /></p>
      {filterCountries.length <= 10 && filterCountries.length > 1 ? (
        <CountryList countries={filterCountries} />
      ) : (
        filterCountries.length === 1 ? (
          <CountryDetail country={filterCountries[0]} />
        ) : (
          <p>Too many matches, specify another filter</p>
        )
      )}
    </div>
  )
}

export default App