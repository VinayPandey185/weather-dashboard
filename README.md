# Weather Dashboard (React + Open-Meteo)

## Overview

A responsive weather dashboard built using React.js that provides real-time and historical weather insights using the Open-Meteo API. The application automatically detects the user's location using browser GPS and displays location-based weather analytics.

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/VinayPandey185/weather-dashboard.git
cd weather-dashboard
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

Visit:

```txt
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Notes

* Allow location access (GPS) in your browser for dynamic weather data.
* Internet connection is required for API requests.
* If location permission is denied, a fallback location may be used.

---

## Features

## Dashboard (Current Weather)

* Automatic GPS-based location detection
* Current weather overview including:

  * Current Temperature
  * Minimum / Maximum Temperature
  * Humidity
  * Wind Speed
  * Precipitation
  * Rain Probability
  * UV Index
  * Visibility
  * Sunrise & Sunset
  * Current Time

---

## Air Quality

* Real-time air quality metrics:

  * PM10
  * PM2.5
  * CO
  * NO2
  * SO2

* Interactive charts for pollutant trends

---

## Hourly Forecast

* Hour-wise weather insights:

  * Temperature
  * Humidity
  * Wind Speed
  * Precipitation
  * PM10 / PM2.5

* Temperature unit toggle (°C ↔ °F)

---

## Analytics (Historical Data)

* Select custom date range (up to 2 years)

* Historical charts for:

  * Temperature Trends (Min / Max)
  * Precipitation Trends
  * Wind Speed Trends
  * Air Quality Trends (PM10 & PM2.5)

* Sunrise & Sunset historical timings

* Handles single-day and wide-range selections

---

## Responsiveness

The application is fully responsive across:

* Mobile
* Tablet
* Desktop

Charts are optimized for smaller screens with scroll and zoom support.

---

## Tech Stack

* React.js
* Recharts
* Chart.js
* Axios
* Tailwind CSS
* Open-Meteo API

---

## Performance

* Optimized API usage
* Efficient React state management
* Fast rendering with reusable components
* Graceful fallback handling for denied location access

---

## Challenges & Learnings

* Integrating multiple APIs (weather + air quality + archive data)
* Managing asynchronous API calls cleanly
* Creating reusable chart components
* Handling timezone/date formatting issues
* Building responsive data visualizations

---

## Future Improvements

* Extend unit conversion across all charts
* Add city search feature
* Improve loading skeleton UI
* Add API caching for faster reloads
* Add downloadable weather reports

---

## Live Demo

[https://weather-dashboard-mu-umber.vercel.app/](https://weather-dashboard-mu-umber.vercel.app/)

---

## GitHub Repository

[https://github.com/VinayPandey185/weather-dashboard](https://github.com/VinayPandey185/weather-dashboard)

```
```
