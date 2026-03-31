import axios from "axios";

export const fetchWeather = async (lat, lon) => {
  try {
    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,visibility,uv_index,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&forecast_days=1&timezone=auto`
    );

    let airData = null;

    try {
      const airRes = await axios.get(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide`
      );
      airData = airRes.data;
    } catch (err) {
      // optional: silent fail (clean UI)
      airData = null;
    }

    return {
      ...weatherRes.data,
      air: airData,
    };
  } catch (err) {
    throw new Error("Failed to fetch weather data");
  }
};