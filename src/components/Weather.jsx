import axios from "axios";
import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      setWeather(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get weather</button>
      </form>
      {weather && (
        <div>
          <h1>{weather.name}</h1>
          <h2>{weather.weather[0].description}</h2>
          <h2>{weather.main.temp}</h2>
        </div>
      )}
    </div>
  );
};

export default Weather;
