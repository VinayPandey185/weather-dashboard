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
    } catch {
      airData = null;
    }

    return {
      ...weatherRes.data,
      air: airData,
    };
  } catch (err) {
    console.error("Weather API Error:", err);
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchAnalytics = async (lat, lon, start, end) => {
  try {
    const res = await axios.get(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,sunrise,sunset&timezone=auto`
    );

    return res;
  } catch (err) {
    console.error("Analytics API Error:", err);
    throw new Error("Failed to fetch analytics data");
  }
};