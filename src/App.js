import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'd6e069d70787e2a305f6c13af7d2eba1'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(API_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric', // Change to 'imperial' for Fahrenheit
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        setError(' ');
      }
    };

    if (city !== '') {
      fetchData();
    }
  }, [city]);

  const setBackgroundImage = () => {
    if (!weatherData) return '';
    const weatherMain = weatherData.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'clear':
        return 'https://wallpapers.com/images/hd/90s-anime-aesthetic-desktop-42lbaxyy0gcsv2qb.jpg';
       case 'scattered clouds':
        return 'https://static.vecteezy.com/system/resources/previews/002/596/183/non_2x/blue-sky-and-clouds-wallpaper-background-and-sunny-day-free-photo.jpg';
      case 'overcast clouds':
        return 'https://wallpaperset.com/w/full/5/4/a/85967.jpg';
        case 'broken clouds':
          return 'https://wallpaperset.com/w/full/5/4/a/85967.jpg';
        
      case 'rain':
        return 'https://devonwithkids.co.uk/wp-content/uploads/2020/07/Child-with-umbrella.jpg'; // Image for rainy weather
      case 'snow':
        return 'https://wallpaperset.com/w/full/5/4/a/85967.jpg'; // Image for snowy weather
      default:
        return 'https://static.vecteezy.com/system/resources/previews/002/596/183/non_2x/blue-sky-and-clouds-wallpaper-background-and-sunny-day-free-photo.jpg'; // Default image if weather condition not handled
    }
  };

  return (
    <div className='container'>
    <p class="light-effect">Weather App</p>
    <div className="App" style={{ backgroundImage: `url(${setBackgroundImage()})` }}>
      
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ borderBottom: '1px solid #000' }} 
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div className='cont'>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
