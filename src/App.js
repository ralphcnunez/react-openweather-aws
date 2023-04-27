import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from "react"; 
// require('dotenv').config();
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL } from './api';
import { API_KEY, AWS_ACCESS_KEY, AWS_SECRET_KEY} from './api';
import Forecast from './components/forecast/forecast';
import { Buffer } from 'buffer';
import BackendSave from './components/backend/backend';
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
      const [lat, lon] = searchData.value.split(" ")
   

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
  const s3 = new AWS.S3();

  console.log(AWS_ACCESS_KEY)
  console.log(AWS_SECRET_KEY)

  AWS.config.update({
    maxRetries: 3,
    httpOptions: {timeout: 30000, connectTimeout: 5000},
    region: 'us-east-1',
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  });
//   s3.putObject({
//     Body: forecast,
//     Bucket: "ruby-api-s3-test",
//     Key: "my-file.txt"
//  })

 Promise.all([])
 .then(async () => {
  let data1 = JSON.stringify(forecast)
  let data2 = JSON.stringify(data1)
  console.log(s3)
  s3.putObject({
    Body: data1,
    Bucket: "ruby-api-s3-test",
    Key: "my-file.txt"
 }).promise();
}).catch((err) => console.log(err));

//  let data1 = JSON.stringify(forecast)
//  let data2 = JSON.stringify(data1)
//  console.log(data1)

  return (
    <div className="container">
    <Search onSearchChange={handleOnSearchChange} />
    {currentWeather && <CurrentWeather data={currentWeather} />}
    {forecast && <Forecast data={forecast} />}
    {/* <BackendSave  weatherData={forecast}/>  */}
  </div>
  );

}

export default App;
