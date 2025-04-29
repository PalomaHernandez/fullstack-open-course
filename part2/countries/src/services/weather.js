import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeatherByCity = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  return axios.get(url).then(res => res.data)
}

export default { getWeatherByCity }
