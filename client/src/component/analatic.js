import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2'; // Import both chart types
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import authService from '../services/authService'; // Import your auth service
import "../css/bar_chart.css"; // Import the CSS file for styling

Chart.register(...registerables);

const CombinedChart = () => {
  const [chartData, setChartData] = useState({});
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUserData();
        setEmail(userData.email); // Set the fetched email
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData(); // Call to fetch user data
  }, []); // Only run on mount

  useEffect(() => {
    const fetchScores = async () => {
      if (email) {
        try {
          const response = await axios.get('http://localhost:9000/scores', {
            params: { email }, // Use the user's email to fetch their scores
          });
          const data = response.data;

          if (data.length > 0) {
            const labels = data.map(user => user.username); // Labels as usernames or identifiers
            const scores = data.map(user => user.score); // Data as scores

            setChartData({
              labels: labels,
              datasets: [
                {
                  label: 'User Scores - Area Chart',
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(0, 128, 0, 1)',
                  borderWidth: 4,
                  data: scores,
                  fill: true,
                },
                {
                  label: 'Scores - Bar Chart',
                  backgroundColor: 'rgb(0, 128, 0)',
                  borderColor: 'rgb(0, 128, 0)',
                  borderWidth: 1,
                  data: scores,
                },
              ],
            });
          } else {
            console.error('No data found for the user');
            setChartData({}); // Clear chart data if no scores are found
          }
        } catch (error) {
          console.error('Error fetching scores:', error);
        }
      }
    };

    fetchScores(); // Call to fetch scores whenever email changes
  }, [email]); // Run the effect whenever email changes

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">User Scores for {email}</h2>
      {chartData.labels && chartData.labels.length > 0 ? ( // Check if labels exist and have length
        <>
          <Line data={{
            labels: chartData.labels,
            datasets: [chartData.datasets[0]], // Area chart dataset
          }} options={options} />
          <Bar data={{
            labels: chartData.labels,
            datasets: [chartData.datasets[1]], // Bar chart dataset
          }} options={options} />
        </>
      ) : (
        <p>Loading charts...</p>
      )}
    </div>
  );
};

export default CombinedChart;
