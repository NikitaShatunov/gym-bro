import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export function ChartComponent({ propsValue, propsLabels }: any) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels: propsLabels,
    datasets: [
      {
        label: "Вес",
        data: propsValue,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "0 10px",
        height: "160px",
        borderRadius: "4px",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
}
