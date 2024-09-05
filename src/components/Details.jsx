import React from "react";
import styles from "../styles/Details.module.css";
import DailyForecast from "./DailyForecast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";

const convertUnixToTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
};

const Details = ({
  dailyForecast,
  humidity,
  windSpeed,
  highTemp,
  lowTemp,
  sunrise,
  sunset,
  clouds,
}) => {
  const mediaQuery = useMediaQuery("(max-width: 768px)");
  sunrise = convertUnixToTime(sunrise);
  sunset = convertUnixToTime(sunset);
  return (
    <Box className={styles.Details}>
      <Box className={styles.SunContainer}>
        <Box
          className={styles.sunRiseSet}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography fontWeight={200} className={styles.DetailsDataText}>
            {sunrise}
          </Typography>
          <div className={styles.Sun}></div>
        </Box>
        <Box
          className={styles.sunRiseSet}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography fontWeight={200} className={styles.DetailsDataText}>
            {sunset}
          </Typography>
          <div className={styles.Sun}></div>
        </Box>
      </Box>
      <Divider />
      <Box className={styles.WeatherDetails}>
        <Box className={styles.DetailsContainer}>
          <Box className={styles.DetailsData}>
            <Typography
              variant="h6"
              className={styles.DetailsTitle}
              fontWeight={200}
            >
              Humidity
            </Typography>
            <Typography fontWeight={200} className={styles.DetailsDataText}>
              {humidity} %
            </Typography>
          </Box>
          <Box className={styles.DetailsData}>
            <Typography
              variant="h6"
              className={styles.DetailsTitle}
              fontWeight={200}
            >
              Clouds
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography fontWeight={200} className={styles.DetailsDataText}>
                {clouds} %
              </Typography>
              &nbsp;
            </Box>
          </Box>
        </Box>
        <Box className={styles.DetailsContainer}>
          <Box className={styles.DetailsData}>
            <Typography
              variant="h6"
              className={styles.DetailsTitle}
              fontWeight={200}
            >
              High
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex" }}>
                <Typography fontWeight={200} className={styles.DetailsDataText}>
                  H: {highTemp}°C
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={styles.DetailsData}>
            <Typography
              variant="h6"
              className={styles.DetailsTitle}
              fontWeight={200}
            >
              Low
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex" }}>
                <Typography fontWeight={200} className={styles.DetailsDataText}>
                  L: {lowTemp}°C
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.DetailsContainer}>
          <Box className={styles.DetailsData}>
            <Typography
              variant="h6"
              className={styles.DetailsTitle}
              fontWeight={200}
            >
              Wind Speed
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography fontWeight={200} className={styles.DetailsDataText}>
                {windSpeed} m/s
              </Typography>
            </Box>
          </Box>

          {mediaQuery && (
            <Box className={styles.DailyForecastContainer}>
              {dailyForecast?.map((item) => (
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
      </Box>
    </Box>
  );
};

export default Details;
