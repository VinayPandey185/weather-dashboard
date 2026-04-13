import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useLocation } from "../hooks/useLocation";
import { fetchAnalytics } from "../services/weatherApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const coords = useLocation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!coords) return;

    const diffDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 730) {
      setError("Date range should not exceed 2 years (max 730 days).");
      setChartData([]);
      return;
    } else {
      setError("");
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchAnalytics(
          coords.lat,
          coords.lon,
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );

        const formatted = res.data.daily.time.map((date, i) => ({
          date: new Date(date).toLocaleDateString("en-GB"),

          max: res.data.daily.temperature_2m_max[i],
          min: res.data.daily.temperature_2m_min[i],
          rain: res.data.daily.precipitation_sum[i],

          // WIND
          wind: res.data.daily.windspeed_10m_max?.[i] ?? 0,

          // AIR QUALITY
          pm10: res.data.daily.pm10?.[i] ?? 0,
          pm25: res.data.daily.pm2_5?.[i] ?? 0,

          // SUN TIMES
          sunrise: res.data.daily.sunrise?.[i],
          sunset: res.data.daily.sunset?.[i],
        }));

        setChartData(formatted);
      } catch (err) {
        console.error("Analytics Error:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, coords]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* ERROR */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* DATE PICKER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <p className="text-sm mb-1">Start Date</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div>
          <p className="text-sm mb-1">End Date</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 rounded"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* TEMPERATURE */}
      <Chart title="Temperature Trends" loading={loading} data={chartData}>
        <Line dataKey="max" stroke="#ef4444" name="Max Temp" />
        <Line dataKey="min" stroke="#3b82f6" name="Min Temp" />
      </Chart>

      {/* RAIN */}
      <Chart title="Precipitation Trends" loading={loading} data={chartData}>
        <Line dataKey="rain" stroke="#06b6d4" name="Rain (mm)" />
      </Chart>

      {/* WIND */}
      <Chart title="Wind Speed (Max)" loading={loading} data={chartData}>
        <Line dataKey="wind" stroke="#22c55e" name="Wind Speed" />
      </Chart>

    {/* AIR QUALITY */}
<Chart title="Air Quality (PM10 & PM2.5)" loading={loading} data={chartData}>
     <Line
        dataKey="pm10"
        stroke="#f97316"
        name="PM10"
        strokeWidth={2}
      />

      <Line
        dataKey="pm25"
        stroke="#ef4444"
        name="PM2.5"
        strokeWidth={2}
      />
      </Chart>

      {/* SUNRISE & SUNSET */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="font-bold mb-2">Sunrise & Sunset</h2>

        {chartData.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {chartData.slice(0, 10).map((item, i) => (
              <div key={i} className="border p-2 rounded">
                <p>{item.date}</p>

                <p>
                  🌅{" "}
                  {item.sunrise
                    ? new Date(item.sunrise).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : "--"}
                </p>

                <p>
                  🌇{" "}
                  {item.sunset
                    ? new Date(item.sunset).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : "--"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* REUSABLE CHART */
const Chart = ({ title, loading, data, children }) => (
  <div className="bg-white p-4 rounded shadow mt-6">
    <h2 className="font-bold mb-2">{title}</h2>

    {loading ? (
      <p>Loading data...</p>
    ) : data.length <= 1 ? (
      <p className="text-gray-500">
        Please select a wider date range to view trends
      </p>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {children}
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default Analytics;