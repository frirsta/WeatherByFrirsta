import React from "react";
import styles from "../styles/Forecasts.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Forecasts = ({ data }) => {
  return (
    <Box className={styles.Forecasts}>
      {data.map((cityData) => (
        <Box className={styles.ForecastsData} key={cityData.id}>
          <Typography className={styles.Title} fontWeight={200}>
            {cityData.name}
          </Typography>
          <img
            className={styles.WeatherIcon}
            src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
            alt={cityData.weather[0].description}
          />
          <Typography fontWeight={200} className={styles.Data}>
            {cityData.main.temp}°C
          </Typography>
          <Typography fontWeight={200} className={styles.Data}>
            {cityData.weather[0].description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Forecasts;
