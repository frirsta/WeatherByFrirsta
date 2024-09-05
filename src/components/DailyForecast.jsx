import React from "react";
import styles from "../styles/DailyForecast.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DailyForecast = ({ weatherIcon, description, temp, weatherDate }) => {
  const dateString = weatherDate;
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  const weekday = formatter.format(date);

  // console.log(weekday);

  return (
    <Box className={styles.DailyForecast}>
      <Typography variant="body2" className={styles.DailyText}>
        {temp} °C
      </Typography>
      <img className={styles.WeatherIcon} src={weatherIcon} alt={description} />
      <Typography variant="body2" className={styles.DailyText}>
        {weekday}
      </Typography>
    </Box>
  );
};

export default DailyForecast;
