import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Weather = () => {
  const [city, setCity] = useState("");
  const [options, setOptions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      setWeather(response.data);
      setForecast(filterFiveDayForecast(forecastResponse.data.list));
      determineDayOrNight(response.data);
      setError("");
      console.log(response.data, forecastResponse.data);
    } catch (e) {
      setError("Failed to fetch weather data. Please try again.");
      console.log(e);
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
          key: `${city.name}-${city.sys.country}-${city.id}`,
          label: `${city.name}, ${city.sys.country}`,
          name: city.name,
        }))
      );
    } catch (e) {
      console.log("Failed to fetch city suggestions:", e);
    }
  };

  const handleInputChange = (event, value) => {
    if (typeof value === "string" && value.length > 2) {
      fetchCitySuggestions(value);
    } else if (typeof value === "object" && value !== null && value.name) {
      setCity(value.name);
    } else {
      setOptions([]);
    }
  };

  const handleChange = (event, newValue) => {
    setCity(newValue ? newValue.name : "");
  };
  const handleIconClick = () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      return;
    }

    fetchWeatherData();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleIconClick();
  };

  return (
    <Box
      style={{
        backgroundColor: isDay ? "#74aede" : "#342564",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          value={city ? { label: city } : null}
          onInputChange={(event, value) => handleInputChange(event, value)}
          options={options}
          getOptionLabel={(option) => option.label}
          onChange={handleChange}
          renderOption={(props, option) => (
            <li {...props} key={option.key}>
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  borderRadius: "30px",
                  padding: "5px 20px",
                },
                backgroundColor: "#ddeff5",
                borderRadius: "30px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderWidth: "1px",
                    borderColor: "#90E0EF",
                  },
                },
              }}
              slots={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleIconClick}>
                      <SearchOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              variant="outlined"
              type="text"
              placeholder="Enter city name"
              value={city}
            />
          )}
        />
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <Box>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <h1>{weather.name}</h1>
          <h2>{weather.weather[0].description}</h2>
          <h2>{weather.main.temp}°C</h2>
          <p>Humidity: {weather.main.humidity}</p>
          <p>Wind speed: {weather.wind.speed} m/s</p>
        </Box>
      )}
      {forecast && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {forecast.map((item) => (
              <Grid
                size={3}
                sx={{
                  padding: "10px",
                  border: "1px solid #ffffff",
                  borderRadius: "10px",
                  backdropFilter: "blur(5px)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.50)",
                }}
                sm={{ padding: "100px" }}
                key={item.dt}
              >
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                <h3>{item.weather[0].description}</h3>
                <h3>{item.main.temp} °C</h3>
                <p>Humidity: {item.main.humidity}</p>
                <p>Wind speed: {item.wind.speed} m/s</p>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
