import { useEffect, useState } from "react";
import { useLocation } from "../hooks/useLocation";
import { fetchWeather } from "../services/weatherApi";
import ZoomTemperatureChart from "../components/ZoomTemperatureChart";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

    const Dashboard = () => {
        const coords = useLocation();
        const [data, setData] = useState(null);
        const [unit, setUnit] = useState("C");
        const currentHour = new Date().getHours();


  useEffect(() => {
  if (!coords) return;

  const loadData = async () => {
    try {
      const res = await fetchWeather(coords.lat, coords.lon);
      setData(res);
    } catch (err) {
      console.error("Failed to load weather data");
    }
  };

  loadData();
}, [coords]);

  if (!data) {
  return <p className="text-center text-gray-500">Fetching weather data...</p>;
}
  // Data
  const tempData = data.hourly.time.map((time, i) => ({
    time: new Date(time).toLocaleTimeString([], { hour: "2-digit" }),
    temperature: data.hourly.temperature_2m[i],
  }));

  const humidityData = data.hourly.time.map((time, i) => ({
    time: new Date(time).toLocaleTimeString([], { hour: "2-digit" }),
    humidity: data.hourly.relativehumidity_2m[i],
  }));

  const precipitationData = data.hourly.time.map((time, i) => ({
  time: new Date(time).toLocaleTimeString([], { hour: "2-digit" }),
  precipitation: data.hourly.precipitation?.[i] ?? 0,
}));

  const windData = data.hourly.time.map((time, i) => ({
    time: new Date(time).toLocaleTimeString([], { hour: "2-digit" }),
    wind: data.hourly.windspeed_10m[i],
  }));

  const airData =
  data.air?.hourly?.time?.map((time, i) => ({
    time: new Date(time).toLocaleTimeString([], { hour: "2-digit" }),
    pm10: data.air?.hourly?.pm10?.[i] ?? 0,
    pm25: data.air?.hourly?.pm2_5?.[i] ?? 0,
    no2: data.air?.hourly?.nitrogen_dioxide?.[i] ?? 0,
    so2: data.air?.hourly?.sulphur_dioxide?.[i] ?? 0,
    co: data.air?.hourly?.carbon_monoxide?.[i] ?? 0,
  })) || [];
const convertTemp = (temp) => {
  if (temp === undefined || temp === null) return "--";
  return unit === "C" ? temp : (temp * 9) / 5 + 32;
};
  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold text-blue-800">
    Weather Dashboard
  </h1>

  <button
  onClick={() => setUnit(unit === "C" ? "F" : "C")}
  className="bg-gray-200 px-4 py-1 rounded-full shadow hover:bg-gray-300 hover:scale-105 transition-transform duration-200 font-semibold"
>
  °{unit}
</button>
</div>

      {/* CARDS (Balanced + Colored) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-blue-500 text-white p-4 rounded shadow hover:scale-105 transition">
          <p>Temperature</p>
          <h2 className="font-bold text-lg">
            {convertTemp(data.current_weather?.temperature)?.toFixed(1)}°{unit}
          </h2>
        </div>

        <div className="bg-green-500 text-white p-4 rounded shadow hover:scale-105 transition">
          <p>Wind Speed</p>
          <h2 className="font-bold text-lg">
            {data.current_weather.windspeed} km/h
          </h2>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded shadow hover:scale-105 transition">
  <p>Time</p>
  <h2 className="font-bold text-lg">
    {data.current_weather?.time
      ? new Date(data.current_weather.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--"}
  </h2>
</div>

      <div className="bg-yellow-500 text-white p-4 rounded shadow hover:scale-105 transition"> 
         <p>Max Temp</p>
         <h2 className="font-bold text-lg">
          {convertTemp(data.daily?.temperature_2m_max?.[0]) !== "--"
            ? convertTemp(data.daily?.temperature_2m_max?.[0]).toFixed(1)
            : "--"}°{unit}
          </h2>
      </div>

    <div className="bg-orange-500 text-white p-4 rounded shadow hover:scale-105 transition">
        <p>Min Temp</p>
        <h2 className="font-bold text-lg">
        {convertTemp(data.daily?.temperature_2m_min?.[0]) !== "--"
          ? convertTemp(data.daily?.temperature_2m_min?.[0]).toFixed(1)
          : "--"}°{unit}
        </h2>
    </div>

        <div className="bg-teal-500 text-white p-4 rounded shadow hover:scale-105 transition">
          <p>Humidity</p>
          <h2 className="font-bold text-lg">
            {data.hourly.relativehumidity_2m[0]}%
          </h2>
        </div>

        <div className="bg-cyan-500 text-white p-4 rounded shadow hover:scale-105 transition">
          <p>Precipitation</p>
          <h2 className="font-bold text-lg">
           {data.daily?.precipitation_sum?.[0] ?? "--"} mm
          </h2>
        </div>

        <div className="bg-indigo-500 text-white p-4 rounded shadow hover:scale-105 transition">
  <p>Sunrise</p>
  <h2 className="font-bold text-lg">
    {data.daily?.sunrise?.[0]
      ? new Date(data.daily.sunrise[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      : "--"}
  </h2>
</div>

<div className="bg-pink-500 text-white p-4 rounded shadow hover:scale-105 transition">
  <p>Sunset</p>
  <h2 className="font-bold text-lg">
  {data.daily?.sunset?.[0]
    ? new Date(data.daily.sunset[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--"}
</h2>
</div>
        <div className="bg-red-500 text-white p-4 rounded shadow hover:scale-105 transition">
            <p>UV Index</p>
            <h2>
                {data.hourly?.uv_index?.[currentHour] ?? "--"}
            </h2>
        </div>

<div className="bg-gray-500 text-white p-4 rounded shadow hover:scale-105 transition">
  <p>Visibility</p>
  <h2>{data.hourly.visibility?.[0] ?? "--"} m</h2>
</div>

<div className="bg-blue-700 text-white p-4 rounded shadow hover:scale-105 transition">
  <p>Rain Probability</p>
  <h2>{data.hourly.precipitation_probability?.[0] ?? "--"}%</h2>
</div>

  
      </div>

      {/* MAIN CHART */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
  <div className="min-w-[600px] md:min-w-full h-[250px] md:h-[300px] pl-2">
    <ZoomTemperatureChart data={tempData} />
  </div>
</div>

      {/* OTHER CHARTS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Humidity */}

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Humidity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={humidityData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Precipitation */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Precipitation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={precipitationData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="precipitation" stroke="#06b6d4" name="Precipitation (mm)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Wind */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Wind Speed</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={windData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="wind" stroke="#22c55e" name="Wind Speed (km/h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Air Quality */}
<div className="bg-white p-4 rounded shadow">
  <h2 className="font-bold mb-2">
    Air Quality (PM10 & PM2.5)
  </h2>

  {/* Explanation */}
  <p className="text-sm text-gray-500 mb-1">
    PM10 (orange), PM2.5 (red)
  </p>

  <p className="text-xs text-gray-400 mb-3">
    Safe levels: PM2.5 &lt; 15 | PM10 &lt; 45
  </p>

  <ResponsiveContainer width="100%" height={300}>
  <LineChart data={airData}>
    <XAxis dataKey="time" />
    <YAxis domain={[0, 'dataMax + 10']} />
    <Tooltip />

    {/* PM10 */}
    <Line
      type="monotone"
      dataKey="pm10"
      stroke="#f97316"
      strokeWidth={3}
      dot={{ r: 2 }}
      name="PM10"
    />

    {/* PM2.5 */}
    <Line
      type="monotone"
      dataKey="pm25"
      stroke="#ef4444"
      strokeWidth={3}
      dot={{ r: 2 }}
      name="PM2.5"
    />

    {/* ADD THESE BELOW */}

    <Line
      type="monotone"
      dataKey="no2"
      stroke="#8b5cf6"
      strokeWidth={2}
      name="NO2"
    />

    <Line
      type="monotone"
      dataKey="so2"
      stroke="#22c55e"
      strokeWidth={2}
      name="SO2"
    />

    <Line
      type="monotone"
      dataKey="co"
      stroke="#000000"
      strokeWidth={2}
      name="CO"
    />

  </LineChart>
</ResponsiveContainer>
</div>

      </div>
    </div>
  );
};

export default Dashboard;