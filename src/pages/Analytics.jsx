import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const diffDays =
      (endDate - startDate) / (1000 * 60 * 60 * 24);

    // Validate date range
    if (diffDays > 730) {
      setError("Max range is 2 years");
      setChartData([]);
      return;
    } else {
      setError("");
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://archive-api.open-meteo.com/v1/archive?latitude=18.52&longitude=73.85&start_date=${startDate
            .toISOString()
            .split("T")[0]}&end_date=${endDate
            .toISOString()
            .split("T")[0]}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        );

        const formatted = res.data.daily.time.map((date, i) => ({
          date,
          max: res.data.daily.temperature_2m_max[i],
          min: res.data.daily.temperature_2m_min[i],
          rain: res.data.daily.precipitation_sum[i],
        }));

        setChartData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {/* Date Picker */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <p className="text-sm mb-1">Start Date</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <p className="text-sm mb-1">End Date</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Temperature Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Temperature Trends</h2>

          {chartData.length === 0 ? (
            <p>Loading data...</p>
          ) : chartData.length === 1 ? (
  <p className="text-gray-500">
    Please select a wider date range to view trends
  </p>
          ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="max"
                stroke="#ef4444"
                name="Max Temp"
              />
              <Line
                type="monotone"
                dataKey="min"
                stroke="#3b82f6"
                name="Min Temp"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Precipitation Chart */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="font-bold mb-2">Precipitation</h2>
        {chartData.length === 0 ? (
          <p>Loading data...</p>
        ) : chartData.length === 1 ? (
          <p className="text-gray-500">
          Please select a wider date range to view trends
          </p>
        ) : (
  <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="rain"
                stroke="#06b6d4"
                name="Rain"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Analytics;