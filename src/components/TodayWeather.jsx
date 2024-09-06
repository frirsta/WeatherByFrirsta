import React from "react";
import styles from "../styles/TodayWeather.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);

  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const formattedDay = `${day}${getOrdinalSuffix(day)}`;
  const formattedDate = `${formattedDay} ${month} ${year}`;

  return formattedDate;
}

console.log(formatDate("2024-09-02 00:00:00"));
console.log(formatDate("2024-02-04 00:00:00"));

const TodayWeather = ({
  weatherIcon,
  description,
  temp,
  humidity,
  speed,
  weatherDate,
  feelsLike,
}) => {
  const mediaQuery = useMediaQuery("(max-width: 600px)");
  return (
    <Box className={styles.TodayWeather}>
      {!mediaQuery && (
        <Box className={styles.WeatherIcon}>
          <img
            className={styles.WeatherIconImage}
            src={weatherIcon}
            alt={description}
          />
        </Box>
      )}

      <Typography className={styles.Temp} variant="h2" fontWeight={100}>
        {temp}°C
      </Typography>

      <Typography className={styles.Date} variant="h6" fontWeight={100}>
        {formatDate(weatherDate * 1000)}
      </Typography>

      <Box className={styles.Details}>
        <Typography fontWeight={100} className={styles.DetailsText}>
          Wind speed: {speed} m/s &nbsp;| &nbsp;
        </Typography>
        <Typography fontWeight={100} className={styles.DetailsText}>
          Humidity: {humidity} % &nbsp;| &nbsp;
        </Typography>
        <Typography fontWeight={100} className={styles.DetailsText}>
          Feels like: {feelsLike} °C &nbsp;
        </Typography>
      </Box>
    </Box>
  );
};

export default TodayWeather;
