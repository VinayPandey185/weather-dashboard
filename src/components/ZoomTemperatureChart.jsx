import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  zoomPlugin
);

const ZoomTemperatureChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((item) => item.temperature),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: false, // 🔥 disable pan for mobile scroll
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: false, // 🔥 disable pinch (important)
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="font-bold mb-2">
        Temperature (Zoom & Scroll Enabled)
      </h2>

      {/* WRAPPER */}
      <div
        className="overflow-x-auto"
        style={{ touchAction: "auto" }}
      >
        <div className="min-w-[600px] h-[250px] md:h-[300px] pl-4">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ZoomTemperatureChart;