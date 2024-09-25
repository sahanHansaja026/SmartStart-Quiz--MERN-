// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        label: 'Votes',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', 
          'rgba(54, 162, 235, 0.6)', 
          'rgba(255, 206, 86, 0.6)', 
          'rgba(75, 192, 192, 0.6)',
        ],
        data: [12, 19, 3, 5],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
