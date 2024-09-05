import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Weather.module.css";
import DailyForecast from "./DailyForecast";
import TodayWeather from "./TodayWeather";
import Details from "./Details";
import Search from "./Search";
import Forecasts from "./Forecasts";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const cities = [
  "London",
  "Tokyo",
  "New York",
  "Paris",
  "Beijing",
  "Los Angeles",
];
const Weather = () => {
  const mediaQuery = useMediaQuery("(max-width: 768px)");
  const [city, setCity] = useState({ name: "" });
  const [options, setOptions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [error, setError] = useState("");
  const [cityForecasts, setCityForecasts] = useState([]);

  const fetchWeatherData = async () => {
    if (!city.name?.trim()) {
      setError("Please enter a city name");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      setWeather(response.data);
      setForecast(filterFiveDayForecast(forecastResponse.data.list));
      determineDayOrNight(response.data);
      setError("");
      // console.log(response.data, forecastResponse.data);
      // console.log(weather, forecast);
    } catch (e) {
      setError("Failed to fetch weather data. Please try again.");
      // console.log(e);
    }
  };

  const filterFiveDayForecast = (list) => {
    const dailyForecast = new Map();
    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!dailyForecast.has(day)) {
        dailyForecast.set(day, item);
      }
    });

    return Array.from(dailyForecast.values()).slice(0, 5);
  };
  const determineDayOrNight = (weather) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const sunriseTime = weather.sys.sunrise;
    const sunsetTime = weather.sys.sunset;

    if (currentTime >= sunriseTime && currentTime < sunsetTime) {
      setIsDay(true);
    } else {
      setIsDay(false);
    }
  };

  const fetchCitySuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      setOptions(
        response.data.list.map((city) => ({
          label: `${city.name}, ${city.sys.country}`,
          name: city.name,
          id: uuidv4(),
        }))
      );
    } catch (e) {
      // console.log("Failed to fetch city suggestions:", e);
    }
  };
  const handleChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setCity({ name: newValue });
    } else if (newValue && newValue.name) {
      setCity(newValue);
    } else {
      setCity({ name: "" });
    }
  };

  const handleInputChange = (e, newInputValue) => {
    setCity({ name: newInputValue });
    if (newInputValue.length > 2) {
      fetchCitySuggestions(newInputValue);
    }
  };

  const handleIconClick = () => {
    if (!city.name?.trim()) {
      setError("Please enter a city name");
      return;
    }
    fetchWeatherData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleIconClick();
  };

  useEffect(() => {
    const fetchMultipleCityForecasts = async () => {
      try {
        const cityForecastsData = await Promise.all(
          cities.map((city) =>
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
            )
          )
        );
        const forecasts = cityForecastsData.map((response) => response.data);
        setCityForecasts(forecasts);
      } catch (e) {
        // console.log("Failed to fetch city forecasts:", e);
      }
    };
    fetchMultipleCityForecasts();
  }, []);
  // console.log(cityForecasts);

  return (
    <Box
      className={`${styles.App} ${
        isDay ? styles.dayGradientBackground : styles.nightGradientBackground
      }`}
    >
      <Box className={styles.SearchContainer}>
        <Search
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
          onHandleInputChange={handleInputChange}
          options={options}
          onHandleIconClick={handleIconClick}
        />
      </Box>
      <Box className={styles.Alert}>
        {error && (
          <Alert variant="filled" severity="warning">
            <Typography>{error}</Typography>
          </Alert>
        )}
      </Box>
      {weather ? (
        <>
          <Box className={styles.AppContent}>
            <Box className={styles.Container}>
              <Box className={styles.WeeklyForecastContainer}>
                {weather && (
                  <TodayWeather
                    name={weather.name}
                    country={weather.sys.country}
                    temp={weather.main.temp}
                    humidity={weather.main.humidity}
                    speed={weather.wind.speed}
                    weatherIcon={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    description={weather.weather[0].description}
                    weatherDate={weather.dt}
                    feelsLike={weather.main.feels_like}
                  />
                )}
                {!mediaQuery && (
                  <Box className={styles.WeeklyContainer}>
                    {forecast?.map((item) => (
                      <DailyForecast
                        key={item.dt}
                        weatherIcon={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        description={item.weather[0].description}
                        temp={item.main.temp}
                        humidity={item.main.humidity}
                        speed={item.wind.speed}
                        weatherDate={item.dt_txt}
                      />
                    ))}
                  </Box>
                )}
              </Box>
              <Details
                dailyForecast={forecast}
                humidity={weather?.main.humidity}
                windSpeed={weather?.wind.speed}
                sunrise={weather?.sys.sunrise}
                sunset={weather?.sys.sunset}
                clouds={weather?.clouds.all}
                highTemp={weather?.main.temp_max}
                lowTemp={weather?.main.temp_min}
                options={options}
              />
            </Box>
          </Box>
        </>
      ) : (
        <Box className={styles.cityForecasts}>
          <Forecasts data={cityForecasts} />
        </Box>
      )}
    </Box>
  );
};

export default Weather;
