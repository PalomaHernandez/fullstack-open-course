import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Search = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <h2>Find countries</h2>
      <input value={filter} onChange={handleFilterChange}></input>
    </div>
  )
}

const Country = ({ country }) => {
  const[weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeatherByCity(country.capital)
      .then(weatherData => {
        setWeather(weatherData)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
  }, [country.capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      {weather && (
        <>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </>
      )}
    </div>
  )
}

const CountryList = ({ countries, handleCountryClick }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleCountryClick(country.name.common)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [country, setCountry] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService.getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleCountryClick = (country) => {
    setCountry(country)
    setFilter(country)
  }

  if(filteredCountries.length > 10) {
    return (
      <div>
        <Search filter={filter} handleFilterChange={handleFilterChange} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if(filteredCountries.length === 1) {
    return (
      <div>
        <Search filter={filter} handleFilterChange={handleFilterChange} />
        { filteredCountries.map(country => (
          <Country key={country.name.common} country={country} />
        )) }
      </div>
    )
  }
  return (
    <div>
      <Search filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList countries={filteredCountries} handleCountryClick={handleCountryClick} />
    </div>
  )
}

export default App