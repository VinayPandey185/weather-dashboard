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

const ZoomTemperatureChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((item) => item.temperature),
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },

        zoom: {
          wheel: {
            enabled: false,
          },

          pinch: {
            enabled: true,
          },

          mode: "x",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="font-bold mb-2">
        Temperature (Zoom & Scroll Enabled)
      </h2>

      <div
        className="overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y pinch-zoom",
        }}
      >
        <div className="min-w-[700px] h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ZoomTemperatureChart;