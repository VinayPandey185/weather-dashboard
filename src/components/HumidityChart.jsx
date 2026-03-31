import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const HumidityChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="font-bold mb-2">Humidity (Hourly)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="humidity" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityChart;