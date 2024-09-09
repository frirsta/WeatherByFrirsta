# Weather app

This is a simple Weather App built using **React** and the **OpenWeather API**. The app allows users to search for weather forecasts in any city, displaying current weather conditions and a 5-day forecast. It also features a list of preselected cities with their forecast displayed in a grid format.

## Features

- 🌐 **Search for a city**: Type the name of any city to get its current weather and 5-day forecast.
- 🏙️ **Predefined Cities**: The app automatically fetches weather data for cities like London, Tokyo, New York, and more.
- ☀️ **Day/Night Mode**: The background adapts to the current time in the city you're viewing.
- 🌍 **Responsive Design**: Works across all devices, with an optimized mobile and desktop experience using Material UI.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Axios**: For making API requests to the OpenWeather API.
- **Material UI**: UI components to create a clean, responsive layout.
- **OpenWeather API**: Provides real-time weather data for any city.
- **CSS Modules**: Modular and scoped styling for individual components.

## Installation

1. Clone the repository:

```
git clone https://github.com/frirsta/refactored-winner.git
cd refactored-winner
```

2. Install dependencies:
   `npm install`

3. Add your OpenWeather API key:

- Create a .env file in the root directory.

- Add your OpenWeather API key to the .env file:

`REACT_APP_API_KEY=your_openweather_api_key`

4. Start the development server:
   `npm start`

The app will be available at http://localhost:3000.

## Key Components:

**Weather.jsx**: Main logic component responsible for handling API requests and rendering weather data.
<br />
**Search.jsx**: Handles the search functionality, allowing users to search for a city's weather.
<br />
**TodayWeather.jsx**: Displays the current weather for a selected city.
<br />
**DailyForecast.jsx**: Renders individual daily forecasts within the 5-day forecast.
<br />
**Forecasts.jsx**: Displays weather data for predefined cities like London, Tokyo, and New York.
<br />
**Details.jsx**: Displays detailed weather information such as sunrise/sunset times, wind speed, and humidity.

## CSS Modules

Custom styling is applied through CSS modules. Some key style modules are:

**Weather.module.css**: Controls the overall app layout, including the dynamic day/night backgrounds.
<br />

**TodayWeather.module.css**: Handles layout and styling of the current weather display.
<br />

**DailyForecast.module.css**: Styles the individual daily weather forecast cards.
<br />

**Details.module.css**: Styles for the detailed weather data display.
<br />

**Forecasts.module.css**: Controls the grid layout and styling of predefined city forecasts.

### App and Global Styling

**App.js**: Main entry point that renders the Weather component.
<br />

**App.css**: Contains global styles, including font settings and body styling.

## Sources

**Favicon** <a href="https://www.freepik.com/icon/storm_728136#fromView=search&page=1&position=36&uuid=0428acb4-f620-4f8a-ac23-9788686879c0">Icon by Pixel perfect</a>
