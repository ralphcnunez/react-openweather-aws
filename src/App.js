import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL } from './api';
import { API_KEY } from './api';
import Forecast from './components/forecast/forecast';
// require('dotenv').config()



function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
      const [lat, lon] = searchData.value.split(" ")
      console.log(API_KEY)

      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

      Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          setCurrentWeather({city: searchData.label, ...weatherResponse});
          setForecast({city: searchData.label, ...forecastResponse});
        }).catch((err) => console.log(err));
  }

  console.log(currentWeather)
  return (
    <div className="container">
    <Search onSearchChange={handleOnSearchChange} />
    {currentWeather && <CurrentWeather data={currentWeather} />}
    {forecast && <Forecast data={forecast} />}
  </div>
  );
}

export default App;
