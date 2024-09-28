import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import authService from "../services/authService";
import "../css/bar_chart.css";
import Card from "../images/card.png";
import Student from "../images/student.png";
import Teacher from "../images/teacher.png";

Chart.register(...registerables);

const CombinedDashboard = () => {
  const [topCardChartData, setTopCardChartData] = useState({});
  const [userChartData, setUserChartData] = useState({});
  const [email, setEmail] = useState("");
  const [postCount, setPostCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUserData();
        setEmail(userData.email);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch scores and user summary data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get("http://localhost:9000/scores", {
            params: { email },
          });
          const data = response.data;

          if (data.length > 0) {
            const labels = data.map((user) => user.username);
            const scores = data.map((user) => user.score);

            setUserChartData({
              labels: labels,
              datasets: [
                {
                  label: "Your Scores",
                  backgroundColor: "transparent",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 4,
                  data: scores,
                  fill: true,
                },
              ],
            });
          } else {
            console.error("No data found for the user");
            setUserChartData({});
          }
        }

        const postResponse = await axios.get(
          "http://localhost:9000/posts/count"
        );
        if (postResponse.data.success) {
          setPostCount(postResponse.data.count);
        } else {
          setError("Failed to fetch the count of posts");
        }

        const userResponse = await axios.get(
          "http://localhost:9000/userprofile/summary"
        );
        if (userResponse.data.success) {
          setTotalStudents(userResponse.data.totalStudents);
          setTotalAdmins(userResponse.data.totalAdmins);
        } else {
          setError("Failed to fetch user summary");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  // Fetch top card IDs and their titles
  useEffect(() => {
    const fetchTopCardIds = async () => {
      try {
        const response = await axios.get("http://localhost:9000/top-card-ids");
        const data = response.data;

        const cardIds = data.map((item) => item._id);
        const counts = data.map((item) => item.count);

        const titlePromises = cardIds.map((cardId) =>
          axios.get(`http://localhost:9000/card-title/${cardId}`)
        );

        const titleResponses = await Promise.all(titlePromises);
        const titles = titleResponses.map((res) => res.data.title);

        setTopCardChartData({
          labels: titles,
          datasets: [
            {
              label: "Most Active Quizes",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching top card IDs or titles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCardIds();
  }, []);

  const userChartOptions = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  const topCardOptions = {
    indexAxis: "y", // Makes the chart horizontal
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="charts">
      <div className="top_of_dash">
        <div className="dashbox1">
          <img src={Card} alt="Example" />
          <div className="info">
            <h4>{postCount}</h4>
            <br />
            <p>Total Quizes</p>
          </div>
        </div>

        <div className="dashbox1">
          <img src={Student} alt="Example" />
          <div className="info">
            <h4>{totalStudents}</h4>
            <br />
            <p>Students</p>
          </div>
        </div>

        <div className="dashbox1">
          <img src={Teacher} alt="Example" />
          <div className="info">
            <h4>{totalAdmins}</h4>
            <br />
            <p>Quizes owners</p>
          </div>
        </div>
      </div>
      <div className="tableshow">
        <div className="chart-container">
          <h2 className="chart-title">Your Scores Analytics</h2>
          {userChartData.labels && userChartData.labels.length > 0 ? (
            <Line data={userChartData} options={userChartOptions} />
          ) : (
            <p>Loading charts...</p>
          )}
        </div>{" "}
        <div className="chart-container">
          <h2 className="chart-title">Top 5 Most Active Cards</h2>
          {topCardChartData.labels && topCardChartData.labels.length > 0 ? (
            <Bar data={topCardChartData} options={topCardOptions} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
      <br/>
      <center>
        <div className="add_sence">Google Ads</div>
      </center>
    </div>
  );
};

export default CombinedDashboard;
