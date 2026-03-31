# Weather Dashboard (React + Open-Meteo)

## Overview

A responsive weather dashboard built using React.js that provides real-time and historical weather insights using the Open-Meteo API. The application automatically detects the user's location via browser GPS.

---
## 🧑‍💻 Getting Started

Follow these steps to run the project locally:

### 1️ - Clone the repository

```bash
git clone https://github.com/VinayPandey185/weather-dashboard
cd weather-dashboard
```

### 2️ - Install dependencies

```bash
npm install
```

### 3 - Run the development server

```bash
npm run dev
```

### 4️ - Open in browser

Visit:

```
http://localhost:5173
```

---

## Build for production

```bash
npm run build
```

---

## Notes

* Make sure to allow **location access (GPS)** in your browser.
* Internet connection is required for API calls.


## Features

### Dashboard (Current Weather)

* Automatic GPS-based location detection
* Current weather details:

  * Temperature (Min, Max, Current)
  * Humidity
  * Wind Speed
  * Precipitation
  * Sunrise & Sunset
  * UV Index
  * Visibility
  * Rain Probability

### Air Quality

* PM10, PM2.5
* CO, NO2, SO2
* Visualized using charts

###  Hourly Forecast

* Temperature (with °C ↔ °F toggle)
* Humidity
* Precipitation
* Wind Speed
* Air Quality (PM10 & PM2.5)

### Analytics (Historical Data)

* Select custom date range (max 2 years)
* Temperature trends (Min, Max)
* Precipitation trends
* Handles edge cases (single-day selection)

---

## Responsiveness

Fully responsive across mobile, tablet, and desktop devices. Charts are scrollable and adapt to smaller screens.

---

## Tech Stack

* React.js
* Recharts
* Axios
* Open-Meteo API

---

## Performance

Optimized API usage and efficient state management to ensure fast data rendering.

---

## Challenges & Learnings

* Handling multiple APIs (weather + air quality)
* Managing async data safely using optional chaining
* Handling null/missing data
* Building responsive charts with dynamic datasets

---

## Future Improvements

* Temperature unit toggle enhancement across all charts
* Better mobile UI refinements
* API caching for improved performance

---

## Live Demo

(Vercel link)

---

## GitHub Repository

https://github.com/VinayPandey185/weather-dashboard