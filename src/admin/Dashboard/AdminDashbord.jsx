import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import PropTypes from "prop-types"; // Import PropTypes
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${server}/api/stats`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        setStats(data.stats);
      } catch (error) {
        setError("Failed to fetch stats");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="main-content">
        <div className="box">
          <p>Total Courses</p>
          <p>{stats.totalCourses || 0}</p>
        </div>
        <div className="box">
          <p>Total Lectures</p>
          <p>{stats.totalLectures || 0}</p>
        </div>
        <div className="box">
          <p>Total Users</p>
          <p>{stats.totalUsers || 0}</p>
        </div>
      </div>
    </Layout>
  );
};

// Define PropTypes
AdminDashboard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default AdminDashboard;
