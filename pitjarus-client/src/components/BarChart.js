import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { useSelector } from "react-redux";

Chart.register(ArcElement);

export const BarChart = () => {
  const [dataChart, setDataChart] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Nilai",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  });

  const { products, productsFilter } = useSelector((state) => state.products);

  useEffect(() => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "Nilai",
          data: [],
          borderWidth: 1,
        },
      ],
    };

    if (productsFilter.length) {
      productsFilter.forEach((el) => {
        data.labels.push(el.area_name);
        data.datasets[0].data.push(el.nilai);
      });
    } else {
      products.forEach((el) => {
        data.labels.push(el.area_name);
        data.datasets[0].data.push(el.nilai);
      });
    }
    setDataChart(data);
  }, [productsFilter, products]);
  return (
    <>
      <div
        className="chart-container"
        style={{ width: "800px", alignSelf: "center" }}
      >
        <h2 style={{ textAlign: "center" }}>Area store Chart</h2>
        <Bar
          data={dataChart}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </>
  );
};
